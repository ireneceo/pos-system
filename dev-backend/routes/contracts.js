const express = require('express');
const router = express.Router();
const { authenticateToken, getManagerScope } = require('../middleware/auth');
const { Contract, ContractDocument, ContractTask, ContractNote, ContractHistory, ContractPlan,
        FoodcourtUnit, Restaurant, Brand, Foodcourt, User, EntityPlan, EntityPlanRestaurant } = require('../models');
const { Op } = require('sequelize');
const { getTemplate: getSupportServicesTemplate, findServiceTitle } = require('../utils/contractSupportServices');

// Helper: get entity info from user
const getUserEntity = (user) => {
  if (user.role === 'Brand General' || user.role === 'Brand Manager') {
    return { entity_type: 'brand', entity_id: user.brand_id };
  }
  if (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') {
    return { entity_type: 'foodcourt', entity_id: user.foodcourt_id };
  }
  if (user.role === 'System Admin') {
    return { entity_type: null, entity_id: null }; // Can see all
  }
  return null;
};

// Helper: resolve { currency, supported } for a Brand/Foodcourt entity
// supported_currencies may be JSON string, JSON array, or null — normalize.
async function resolveEntityCurrencyInfo(entityType, entityId) {
  const Model = entityType === 'brand' ? Brand : Foodcourt;
  const row = await Model.findByPk(entityId, { attributes: ['id', 'currency', 'supported_currencies'] });
  if (!row) return { defaultCurrency: 'MYR', supported: ['MYR'] };
  const defaultCurrency = row.currency || 'MYR';
  let supported;
  const raw = row.supported_currencies;
  if (Array.isArray(raw)) supported = raw;
  else if (typeof raw === 'string') {
    try { supported = JSON.parse(raw); } catch { supported = null; }
  }
  if (!Array.isArray(supported) || supported.length === 0) supported = [defaultCurrency];
  // Ensure default is in the supported list
  if (!supported.includes(defaultCurrency)) supported = [defaultCurrency, ...supported];
  return { defaultCurrency, supported };
}

// Helper: validate currency — must be in supported list. Returns resolved code or throws.
async function resolveContractCurrency(entityType, entityId, requested) {
  const info = await resolveEntityCurrencyInfo(entityType, entityId);
  if (!requested) return info.defaultCurrency; // default on creation
  const code = String(requested).toUpperCase();
  if (!info.supported.includes(code)) {
    const err = new Error(`Currency "${code}" not supported by this entity. Supported: ${info.supported.join(', ')}`);
    err.status = 422;
    throw err;
  }
  return code;
}

// Helper: is this contract's currency locked? (active + at least one invoice issued)
async function isCurrencyLocked(contractId) {
  if (!contractId) return false;
  const Invoice = require('../models/Invoice');
  const cnt = await Invoice.count({ where: { contract_id: contractId } });
  return cnt > 0;
}

// Helper: check contract access
const checkContractAccess = async (req, res) => {
  const entity = getUserEntity(req.user);
  if (!entity) {
    res.status(403).json({ success: false, message: 'No access to contracts' });
    return null;
  }
  const contract = await Contract.findByPk(req.params.id, {
    include: [{ model: FoodcourtUnit, as: 'unit', attributes: ['id', 'branch_id'] }]
  });
  if (!contract) {
    res.status(404).json({ success: false, message: 'Contract not found' });
    return null;
  }
  if (entity.entity_type && (contract.entity_type !== entity.entity_type || contract.entity_id !== entity.entity_id)) {
    res.status(403).json({ success: false, message: 'No access to this contract' });
    return null;
  }
  // Foodcourt Manager with branch scope: contract must belong to their branch
  const scope = getManagerScope(req.user);
  if (scope.scoped && scope.branch_id) {
    if (!contract.unit || contract.unit.branch_id !== scope.branch_id) {
      res.status(403).json({ success: false, message: 'No access to this contract' });
      return null;
    }
  }
  return contract;
};

// Helper: build issuer snapshot from Brand/Foodcourt master
const buildIssuerSnapshot = async (entityType, entityId) => {
  if (!entityType || !entityId) return {};
  const model = entityType === 'brand' ? Brand : Foodcourt;
  const master = await model.findByPk(entityId);
  if (!master) return {};
  const m = master.toJSON ? master.toJSON() : master;
  return {
    issuer_company_name: m.company_name || m.name || null,
    issuer_business_registration: m.registration_no || null,
    issuer_website: m.website || null,
    issuer_bank_info: (m.bank_name || m.bank_account || m.bank_account_name) ? {
      bank: m.bank_name || null,
      account: m.bank_account || null,
      holder: m.bank_account_name || null
    } : null
  };
};

// Helper: log history
const logHistory = async (contractId, action, fromValue, toValue, details, userId) => {
  await ContractHistory.create({
    contract_id: contractId,
    action,
    from_value: fromValue,
    to_value: toValue,
    details,
    changed_by: userId
  });
};

// ============================================
// Support Services template (Phase 3)
// ============================================

router.get('/support-services/template', authenticateToken, async (req, res) => {
  const entityType = req.query.entity_type === 'foodcourt' ? 'foodcourt' : 'brand';
  res.json({ success: true, data: getSupportServicesTemplate(entityType) });
});

// ============================================
// Contract CRUD
// ============================================

// List contracts
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const entity = getUserEntity(req.user);
    if (!entity) return res.status(403).json({ success: false, message: 'No access' });

    const where = {};
    if (entity.entity_type) {
      where.entity_type = entity.entity_type;
      where.entity_id = entity.entity_id;
    }
    if (req.query.stage) where.stage = req.query.stage;

    // Foodcourt Manager with branch scope: limit to contracts whose unit belongs to the branch
    const scope = getManagerScope(req.user);
    if (scope.scoped && scope.branch_id) {
      const branchUnits = await FoodcourtUnit.findAll({
        where: { branch_id: scope.branch_id },
        attributes: ['id']
      });
      where.unit_id = { [Op.in]: branchUnits.map(u => u.id) };
    }

    // Search: name, contract_number, restaurant name, location, comments
    const searchTerm = req.query.search;
    if (searchTerm) {
      const like = `%${searchTerm}%`;
      where[Op.or] = [
        { applicant_company_name: { [Op.like]: like } },
        { applicant_contact_person: { [Op.like]: like } },
        { contract_number: { [Op.like]: like } },
        { applicant_email: { [Op.like]: like } },
        { applicant_phone: { [Op.like]: like } },
        { applicant_location: { [Op.like]: like } },
        { '$restaurant.name$': { [Op.like]: like } }
      ];
    }

    const { EntityPlanPrice } = require('../models');
    const contracts = await Contract.findAll({
      where,
      include: [
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] },
        { model: User, as: 'creator', attributes: ['id', 'full_name'] },
        { model: FoodcourtUnit, as: 'unit', attributes: ['id', 'unit_number', 'size_value', 'size_unit', 'location_description'], include: [{ model: require('../models').FoodcourtBranch, as: 'branch', attributes: ['id', 'name', 'code'] }] },
        { model: ContractPlan, as: 'plans', include: [
          { model: EntityPlan, as: 'entityPlan', include: [
            { model: EntityPlanPrice, as: 'prices' }
          ]}
        ]}
      ],
      order: [['created_at', 'DESC']],
      subQuery: false
    });

    // If search term, also check comments (second pass for comment content)
    let result = contracts;
    if (searchTerm) {
      const { Comment } = require('../models');
      const commentMatches = await Comment.findAll({
        where: {
          entity_type: 'contract',
          content: { [Op.like]: `%${searchTerm}%` }
        },
        attributes: ['entity_id'],
        group: ['entity_id']
      });
      const commentContractIds = commentMatches.map(c => parseInt(c.entity_id));
      const existingIds = new Set(contracts.map(c => c.id));
      const missingIds = commentContractIds.filter(id => !existingIds.has(id));
      if (missingIds.length > 0) {
        const additionalWhere = { id: missingIds };
        if (entity.entity_type) {
          additionalWhere.entity_type = entity.entity_type;
          additionalWhere.entity_id = entity.entity_id;
        }
        const additional = await Contract.findAll({
          where: additionalWhere,
          include: [
            { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] },
            { model: User, as: 'creator', attributes: ['id', 'full_name'] },
            { model: FoodcourtUnit, as: 'unit', attributes: ['id', 'unit_number', 'size_value', 'size_unit', 'location_description'], include: [{ model: require('../models').FoodcourtBranch, as: 'branch', attributes: ['id', 'name', 'code'] }] },
            { model: ContractPlan, as: 'plans', include: [
              { model: EntityPlan, as: 'entityPlan', include: [
                { model: EntityPlanPrice, as: 'prices' }
              ]}
            ]}
          ]
        });
        result = [...contracts, ...additional];
      }
    }

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

// Get contract detail
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const entity = getUserEntity(req.user);
    if (!entity) return res.status(403).json({ success: false, message: 'No access' });

    const where = { id: req.params.id };
    if (entity.entity_type) {
      where.entity_type = entity.entity_type;
      where.entity_id = entity.entity_id;
    }

    const scope = getManagerScope(req.user);

    const contract = await Contract.findOne({
      where,
      include: [
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'branch_name', 'address', 'phone'] },
        { model: User, as: 'creator', attributes: ['id', 'full_name'] },
        { model: User, as: 'updater', attributes: ['id', 'full_name'] },
        { model: FoodcourtUnit, as: 'unit', include: [{ model: require('../models').FoodcourtBranch, as: 'branch', attributes: ['id', 'name', 'code'] }] },
        { model: ContractDocument, as: 'documents', include: [{ model: User, as: 'uploader', attributes: ['id', 'full_name'] }] },
        { model: ContractTask, as: 'tasks', order: [['sort_order', 'ASC']] },
        { model: ContractNote, as: 'contractNotes', include: [{ model: User, as: 'author', attributes: ['id', 'full_name'] }], order: [['created_at', 'DESC']] },
        { model: ContractPlan, as: 'plans', include: [{ model: EntityPlan, as: 'entityPlan' }] },
        { model: require('../models').Invoice, as: 'invoices', attributes: ['id', 'invoice_number', 'invoice_category', 'category_display_name', 'total_amount', 'currency', 'status', 'due_date', 'issued_at', 'type'], required: false },
        { model: ContractHistory, as: 'history', include: [{ model: User, as: 'changedByUser', attributes: ['id', 'full_name'] }], order: [['created_at', 'DESC']] },
        { model: Contract, as: 'renewedFrom', attributes: ['id', 'contract_number', 'stage'] },
        { model: Contract, as: 'renewedTo', attributes: ['id', 'contract_number', 'stage'] }
      ]
    });

    if (!contract) return res.status(404).json({ success: false, message: 'Contract not found' });

    // Foodcourt Manager with branch scope: deny access to contracts outside their branch
    if (scope.scoped && scope.branch_id) {
      const unitBranchId = contract.unit ? contract.unit.branch_id : null;
      if (unitBranchId !== scope.branch_id) {
        return res.status(403).json({ success: false, message: 'No access to this contract' });
      }
    }

    // Attach entity currency info (currency + supported_currencies list) for display + dropdown
    const contractData = contract.toJSON();
    try {
      const info = await resolveEntityCurrencyInfo(contract.entity_type, contract.entity_id);
      contractData.entity_currency = info.defaultCurrency;
      contractData.entity_supported_currencies = info.supported;
      // Back-compat: `entity` populated with name/currency as before
      if (contract.entity_type === 'brand') {
        const brand = await Brand.findByPk(contract.entity_id, { attributes: ['id', 'name', 'currency'] });
        contractData.entity = brand;
      } else if (contract.entity_type === 'foodcourt') {
        const foodcourt = await Foodcourt.findByPk(contract.entity_id, { attributes: ['id', 'name', 'currency'] });
        contractData.entity = foodcourt;
      }
    } catch (err) {
      contractData.entity_currency = contractData.currency || 'MYR';
      contractData.entity_supported_currencies = [contractData.currency || 'MYR'];
    }
    // Also check if currency is locked (any invoice issued)
    try {
      contractData.currency_locked = await isCurrencyLocked(contract.id);
    } catch (e) {
      contractData.currency_locked = false;
    }

    res.json({ success: true, data: contractData });
  } catch (error) {
    next(error);
  }
});

// Create contract (Proposal)
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const entity = getUserEntity(req.user);
    if (!entity || !entity.entity_type) {
      return res.status(403).json({ success: false, message: 'Only Brand/Foodcourt General can create contracts' });
    }

    // Branch-scoped Foodcourt Manager: reject units outside their branch
    const scope = getManagerScope(req.user);
    if (scope.scoped && scope.branch_id && req.body.unit_id) {
      const unit = await FoodcourtUnit.findByPk(req.body.unit_id, { attributes: ['id', 'branch_id'] });
      if (!unit || unit.branch_id !== scope.branch_id) {
        return res.status(403).json({ success: false, message: 'Cannot assign a unit from a different branch' });
      }
    }

    const issuerSnapshot = await buildIssuerSnapshot(entity.entity_type, entity.entity_id);

    // Currency: validated against entity.supported_currencies; defaults to entity.currency
    let resolvedCurrency;
    try {
      resolvedCurrency = await resolveContractCurrency(entity.entity_type, entity.entity_id, req.body.currency);
    } catch (e) {
      return res.status(e.status || 400).json({ success: false, message: e.message });
    }

    const contract = await Contract.create({
      entity_type: entity.entity_type,
      entity_id: entity.entity_id,
      currency: resolvedCurrency,
      stage: 'proposal',
      applicant_company_name: req.body.applicant_company_name ?? req.body.applicant_name,
      applicant_contact_person: req.body.applicant_contact_person,
      applicant_email: req.body.applicant_email,
      applicant_phone: req.body.applicant_phone,
      applicant_business_type: req.body.applicant_business_type,
      applicant_location: req.body.applicant_location,
      applicant_notes: req.body.applicant_notes,
      applicant_business_registration: req.body.applicant_business_registration,
      applicant_website: req.body.applicant_website,
      applicant_bank_info: req.body.applicant_bank_info,
      applicant_representatives: req.body.applicant_representatives || [],
      ...issuerSnapshot,
      issuer_sync_with_master: req.body.issuer_sync_with_master !== false,
      contract_type: req.body.contract_type,
      financial_terms: req.body.financial_terms || {},
      renewal_type: req.body.renewal_type || 'manual',
      renewal_alert_months: req.body.renewal_alert_months || 3,
      termination_notice_months: req.body.termination_notice_months,
      early_termination_fee: req.body.early_termination_fee,
      duration_months: req.body.duration_months,
      restaurant_id: req.body.restaurant_id || null,
      unit_id: req.body.unit_id || null,
      notes: req.body.notes,
      created_by: req.user.id,
      updated_by: req.user.id
    });

    await logHistory(contract.id, 'created', null, 'proposal', null, req.user.id);

    res.status(201).json({ success: true, data: contract });
  } catch (error) {
    next(error);
  }
});

// Update contract
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    // Branch-scoped Foodcourt Manager: cannot move unit to another branch
    const scope = getManagerScope(req.user);
    if (scope.scoped && scope.branch_id && req.body.unit_id !== undefined && req.body.unit_id !== null) {
      const unit = await FoodcourtUnit.findByPk(req.body.unit_id, { attributes: ['id', 'branch_id'] });
      if (!unit || unit.branch_id !== scope.branch_id) {
        return res.status(403).json({ success: false, message: 'Cannot assign a unit from a different branch' });
      }
    }

    const oldTerms = JSON.stringify(contract.financial_terms);
    const oldRestaurantId = contract.restaurant_id;
    const updateFields = [
      'applicant_company_name', 'applicant_contact_person',
      'applicant_email', 'applicant_phone',
      'applicant_business_type', 'applicant_location', 'applicant_notes',
      'applicant_business_registration', 'applicant_website',
      'applicant_bank_info', 'applicant_representatives',
      'issuer_company_name', 'issuer_business_registration',
      'issuer_website', 'issuer_bank_info', 'issuer_representatives',
      'issuer_sync_with_master',
      'special_conditions', 'renewal_policy', 'exclusivity_terms',
      'support_services', 'legal_terms',
      'contract_number', 'contract_type', 'start_date', 'end_date',
      'duration_months', 'signing_date', 'financial_terms',
      'renewal_type', 'renewal_alert_months', 'termination_notice_months',
      'early_termination_fee', 'restaurant_id', 'unit_id',
      'target_open_date', 'person_in_charge', 'notes'
    ];

    // Backward compat: accept legacy applicant_name as company_name
    if (req.body.applicant_name !== undefined && req.body.applicant_company_name === undefined) {
      req.body.applicant_company_name = req.body.applicant_name;
    }

    const updates = { updated_by: req.user.id };
    for (const field of updateFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // Currency — changeable until any invoice is issued for this contract
    if (req.body.currency !== undefined && req.body.currency !== contract.currency) {
      if (await isCurrencyLocked(contract.id)) {
        return res.status(422).json({
          success: false,
          message: 'Currency cannot be changed after invoices have been issued for this contract'
        });
      }
      try {
        updates.currency = await resolveContractCurrency(contract.entity_type, contract.entity_id, req.body.currency);
      } catch (e) {
        return res.status(e.status || 400).json({ success: false, message: e.message });
      }
    }

    await contract.update(updates);

    // Log restaurant link
    if (req.body.restaurant_id && req.body.restaurant_id !== contract.restaurant_id) {
      await logHistory(contract.id, 'restaurant_linked', null, req.body.restaurant_id.toString(), null, req.user.id);
    }

    // Phase 2-C: Sync EntityPlanRestaurant when contract's restaurant_id changes.
    // This ensures contract-linked plans become billable once a restaurant is attached,
    // and stop billing the old restaurant if reassigned.
    const newRestaurantId = contract.restaurant_id;
    if (oldRestaurantId !== newRestaurantId) {
      const openLinks = await ContractPlan.findAll({ where: { contract_id: contract.id, end_at: null } });
      for (const link of openLinks) {
        // Deactivate prior restaurant's EPR for this plan (if it existed)
        if (oldRestaurantId) {
          await EntityPlanRestaurant.update(
            { is_active: false },
            { where: { entity_plan_id: link.entity_plan_id, restaurant_id: oldRestaurantId } }
          );
        }
        // Activate (or create) new restaurant's EPR for this plan
        if (newRestaurantId) {
          const [row, created] = await EntityPlanRestaurant.findOrCreate({
            where: { entity_plan_id: link.entity_plan_id, restaurant_id: newRestaurantId },
            defaults: {
              entity_plan_id: link.entity_plan_id,
              restaurant_id: newRestaurantId,
              activation_date: new Date(),
              is_active: true
            }
          });
          if (!created && !row.is_active) {
            await row.update({ is_active: true, activation_date: new Date() });
          }
        }
      }
    }

    // Log terms change
    if (req.body.financial_terms && JSON.stringify(req.body.financial_terms) !== oldTerms) {
      await logHistory(contract.id, 'terms_updated', null, null, { old: JSON.parse(oldTerms), new: req.body.financial_terms }, req.user.id);
    }

    res.json({ success: true, data: contract });
  } catch (error) {
    next(error);
  }
});

// ============================================
// Stage Transition
// ============================================

router.put('/:id/stage', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const { stage } = req.body;
    const currentStage = contract.stage;

    // Validate transition
    const validTransitions = {
      proposal: ['contracting'],
      contracting: ['setup'],
      setup: ['active'],
      active: ['terminated', 'renewed']
    };

    if (!validTransitions[currentStage] || !validTransitions[currentStage].includes(stage)) {
      return res.status(400).json({
        success: false,
        message: `Cannot transition from ${currentStage} to ${stage}`
      });
    }

    // Validate requirements per stage
    if (stage === 'contracting') {
      // Applicant identifier: company_name OR contact_person (P0 #2 — 개인 자영업자 대응)
      if (!contract.applicant_company_name && !contract.applicant_contact_person) {
        return res.status(400).json({
          success: false,
          message: 'Applicant Company Name or Contact Person is required before Contracting',
          missing: ['Applicant Company Name or Contact Person']
        });
      }
    }

    if (stage === 'setup') {
      const missing = [];
      if (!contract.contract_number) missing.push('Contract Number');
      if (!contract.start_date) missing.push('Contract Period (start date)');
      if (!contract.end_date) missing.push('Contract Period (end date)');
      // Foodcourt: unit_id 필수 (P0 #1 — 입점 유닛 지정)
      if (contract.entity_type === 'foodcourt' && !contract.unit_id) {
        missing.push('Unit');
      }
      if (missing.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Required before Setup: ${missing.join(', ')}`,
          missing
        });
      }
      // Documents are encouraged but not required to move to Setup — often
      // stored in external DMS (Dropbox/Google Drive) or uploaded later.

      // Auto-generate tasks from support_services where included=true.
      // Skip services that already have a task (idempotent).
      const services = Array.isArray(contract.support_services) ? contract.support_services : [];
      const includedCodes = services.filter(s => s && s.included && s.code).map(s => s.code);
      if (includedCodes.length > 0) {
        const existing = await ContractTask.findAll({
          where: { contract_id: contract.id, source_type: 'support_service', source_code: includedCodes },
          attributes: ['source_code']
        });
        const existingSet = new Set(existing.map(t => t.source_code));
        const toCreate = includedCodes.filter(code => !existingSet.has(code));
        let maxOrder = (await ContractTask.max('sort_order', { where: { contract_id: contract.id } })) || 0;
        for (const code of toCreate) {
          const svc = services.find(s => s.code === code);
          maxOrder += 1;
          await ContractTask.create({
            contract_id: contract.id,
            title: (svc && svc.title) || findServiceTitle(contract.entity_type, code),
            description: (svc && svc.notes) || null,
            sort_order: maxOrder,
            source_type: 'support_service',
            source_code: code
          });
        }
      }
    }

    if (stage === 'active') {
      if (!contract.restaurant_id) {
        return res.status(400).json({ success: false, message: 'Restaurant must be linked before going Active', missing: ['Linked Restaurant'] });
      }
      // P0 #3 — 필수(is_required) task만 완료 요구. is_required=false 는 자유
      const tasks = await ContractTask.findAll({ where: { contract_id: contract.id } });
      const incompleteRequired = tasks.filter(t => t.is_required && !t.is_completed);
      if (incompleteRequired.length > 0) {
        return res.status(400).json({
          success: false,
          message: `${incompleteRequired.length} required setup task(s) are incomplete`,
          missing: ['Setup Tasks']
        });
      }

      // Update foodcourt unit status
      if (contract.unit_id) {
        await FoodcourtUnit.update(
          { status: 'occupied', current_contract_id: contract.id },
          { where: { id: contract.unit_id } }
        );
      }
    }

    await contract.update({ stage, updated_by: req.user.id });
    await logHistory(contract.id, 'stage_changed', currentStage, stage, null, req.user.id);

    // Close open ContractPlan attachments when the contract exits active lifecycle
    if (['expired', 'terminated', 'renewed'].includes(stage)) {
      // Phase 2-C: deactivate EPR for each closing plan BEFORE we close the link
      // (so we still know which plan→restaurant pairs to touch).
      const closingLinks = await ContractPlan.findAll({
        where: { contract_id: contract.id, end_at: null }
      });
      if (contract.restaurant_id && closingLinks.length > 0) {
        const planIds = closingLinks.map(l => l.entity_plan_id);
        await EntityPlanRestaurant.update(
          { is_active: false },
          { where: { entity_plan_id: planIds, restaurant_id: contract.restaurant_id } }
        );
      }
      await ContractPlan.update(
        { end_at: new Date() },
        { where: { contract_id: contract.id, end_at: null } }
      );
    }

    res.json({ success: true, data: contract });
  } catch (error) {
    next(error);
  }
});

// ============================================
// Terminate
// ============================================

router.post('/:id/terminate', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    if (contract.stage !== 'active') {
      return res.status(400).json({ success: false, message: 'Only active contracts can be terminated' });
    }

    const { termination_reason } = req.body;
    if (!termination_reason) {
      return res.status(400).json({ success: false, message: 'Termination reason is required' });
    }

    await contract.update({
      stage: 'terminated',
      terminated_at: new Date(),
      termination_reason,
      terminated_by: req.user.id,
      updated_by: req.user.id
    });

    // Free up foodcourt unit
    if (contract.unit_id) {
      await FoodcourtUnit.update(
        { status: 'vacant', current_contract_id: null },
        { where: { id: contract.unit_id } }
      );
    }

    await logHistory(contract.id, 'terminated', 'active', 'terminated', { reason: termination_reason }, req.user.id);

    // Phase 2-C: deactivate EPR for each closing plan before we close the ContractPlan link.
    const terminatingLinks = await ContractPlan.findAll({
      where: { contract_id: contract.id, end_at: null }
    });
    if (contract.restaurant_id && terminatingLinks.length > 0) {
      const planIds = terminatingLinks.map(l => l.entity_plan_id);
      await EntityPlanRestaurant.update(
        { is_active: false },
        { where: { entity_plan_id: planIds, restaurant_id: contract.restaurant_id } }
      );
    }
    await ContractPlan.update(
      { end_at: new Date() },
      { where: { contract_id: contract.id, end_at: null } }
    );

    res.json({ success: true, data: contract });
  } catch (error) {
    next(error);
  }
});

// ============================================
// Renew
// ============================================

router.post('/:id/renew', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    if (contract.stage !== 'active') {
      return res.status(400).json({ success: false, message: 'Only active contracts can be renewed' });
    }

    const termsChanged = req.body.terms_changed || false;

    const { sequelize } = require('../config/database');
    const t = await sequelize.transaction();
    let newContract;
    let carriedPlanIds = [];
    try {
      newContract = await Contract.create({
        entity_type: contract.entity_type,
        entity_id: contract.entity_id,
        restaurant_id: contract.restaurant_id,
        currency: contract.currency,
        stage: termsChanged ? 'proposal' : 'active',
        applicant_company_name: contract.applicant_company_name,
        applicant_contact_person: contract.applicant_contact_person,
        applicant_email: contract.applicant_email,
        applicant_phone: contract.applicant_phone,
        applicant_business_type: contract.applicant_business_type,
        applicant_location: contract.applicant_location,
        contract_type: contract.contract_type,
        financial_terms: req.body.financial_terms || contract.financial_terms,
        duration_months: req.body.duration_months || contract.duration_months,
        renewal_type: contract.renewal_type,
        renewal_alert_months: contract.renewal_alert_months,
        termination_notice_months: contract.termination_notice_months,
        early_termination_fee: contract.early_termination_fee,
        unit_id: contract.unit_id,
        renewed_from_id: contract.id,
        created_by: req.user.id,
        updated_by: req.user.id
      }, { transaction: t });

      // Phase 2-D: Plan carry-over / closure on renewal.
      // Goal: close the billing loop so the renewed contract continues (or stops) billing correctly.
      const openLinks = await ContractPlan.findAll({
        where: { contract_id: contract.id, end_at: null },
        transaction: t
      });

      if (!termsChanged && openLinks.length > 0 && newContract.restaurant_id) {
        // Carry plan: close the old ContractPlan link, open a new one on the renewed contract.
        // Same EntityPlan + same restaurant → existing EntityPlanRestaurant row remains (ensure is_active=true).
        for (const link of openLinks) {
          await link.update({ end_at: new Date() }, { transaction: t });
          await ContractPlan.create({
            contract_id: newContract.id,
            entity_plan_id: link.entity_plan_id,
            assigned_at: new Date()
          }, { transaction: t });
          carriedPlanIds.push(link.entity_plan_id);
        }
        if (carriedPlanIds.length > 0) {
          await EntityPlanRestaurant.update(
            { is_active: true, activation_date: new Date() },
            { where: { entity_plan_id: carriedPlanIds, restaurant_id: newContract.restaurant_id }, transaction: t }
          );
        }
      } else if (termsChanged && openLinks.length > 0) {
        // Close old plan cleanly: EPR deactivated, ContractPlan closed.
        // New contract is 'proposal' — billing suspends until user runs the wizard at activation.
        if (contract.restaurant_id) {
          const planIds = openLinks.map(l => l.entity_plan_id);
          await EntityPlanRestaurant.update(
            { is_active: false },
            { where: { entity_plan_id: planIds, restaurant_id: contract.restaurant_id }, transaction: t }
          );
        }
        await ContractPlan.update(
          { end_at: new Date() },
          { where: { contract_id: contract.id, end_at: null }, transaction: t }
        );
      }

      await contract.update({
        stage: 'renewed',
        renewed_to_id: newContract.id,
        updated_by: req.user.id
      }, { transaction: t });

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }

    await logHistory(contract.id, 'renewed', 'active', 'renewed',
      { new_contract_id: newContract.id, plans_carried: carriedPlanIds.length, terms_changed: termsChanged }, req.user.id);
    await logHistory(newContract.id, 'created', null, newContract.stage,
      { renewed_from: contract.id, plans_inherited: carriedPlanIds.length }, req.user.id);

    res.status(201).json({
      success: true,
      data: newContract,
      meta: { plans_carried: carriedPlanIds.length, terms_changed: termsChanged }
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// Documents
// ============================================

router.get('/:id/documents', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const documents = await ContractDocument.findAll({
      where: { contract_id: contract.id },
      include: [{ model: User, as: 'uploader', attributes: ['id', 'full_name'] }],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: documents });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/documents', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const doc = await ContractDocument.create({
      contract_id: contract.id,
      file_name: req.body.file_name,
      file_url: req.body.file_url,
      file_size: req.body.file_size,
      file_type: req.body.file_type,
      document_type: req.body.document_type || 'contract',
      uploaded_by: req.user.id
    });

    await logHistory(contract.id, 'document_uploaded', null, req.body.file_name, null, req.user.id);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/documents/:docId', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const doc = await ContractDocument.findOne({ where: { id: req.params.docId, contract_id: contract.id } });
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });

    await doc.destroy();
    res.json({ success: true, message: 'Document removed' });
  } catch (error) {
    next(error);
  }
});

// ============================================
// Tasks (Setup checklist)
// ============================================

router.get('/:id/tasks', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const tasks = await ContractTask.findAll({
      where: { contract_id: contract.id },
      include: [{ model: User, as: 'completedByUser', attributes: ['id', 'full_name'] }],
      order: [['sort_order', 'ASC']]
    });
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/tasks', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const maxOrder = await ContractTask.max('sort_order', { where: { contract_id: contract.id } });
    const task = await ContractTask.create({
      contract_id: contract.id,
      title: req.body.title,
      description: req.body.description,
      sort_order: (maxOrder || 0) + 1,
      is_required: req.body.is_required !== undefined ? !!req.body.is_required : true
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/tasks/:taskId', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const task = await ContractTask.findOne({ where: { id: req.params.taskId, contract_id: contract.id } });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.is_completed !== undefined) {
      updates.is_completed = req.body.is_completed;
      if (req.body.is_completed) {
        updates.completed_by = req.user.id;
        updates.completed_at = new Date();
        await logHistory(contract.id, 'task_completed', null, req.body.title || task.title, null, req.user.id);
      } else {
        updates.completed_by = null;
        updates.completed_at = null;
      }
    }
    if (req.body.sort_order !== undefined) updates.sort_order = req.body.sort_order;
    if (req.body.is_required !== undefined) updates.is_required = !!req.body.is_required;

    await task.update(updates);
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/tasks/:taskId', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const task = await ContractTask.findOne({ where: { id: req.params.taskId, contract_id: contract.id } });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    await task.destroy();
    res.json({ success: true, message: 'Task removed' });
  } catch (error) {
    next(error);
  }
});

// ============================================
// Notes
// ============================================

router.get('/:id/notes', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const notes = await ContractNote.findAll({
      where: { contract_id: contract.id },
      include: [{ model: User, as: 'author', attributes: ['id', 'full_name'] }],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: notes });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/notes', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const note = await ContractNote.create({
      contract_id: contract.id,
      content: req.body.content,
      created_by: req.user.id
    });
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
});

// ============================================
// History
// ============================================

router.get('/:id/history', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const history = await ContractHistory.findAll({
      where: { contract_id: contract.id },
      include: [{ model: User, as: 'changedByUser', attributes: ['id', 'full_name'] }],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
});

// ============================================
// Plans (reference)
// ============================================

// Link an existing EntityPlan to this contract (replaces any prior open link).
// Same EPR wiring as the wizard (Phase 2-C): if contract has restaurant_id,
// deactivate prior plan's EPR + create/reactivate EPR for the new plan.
router.post('/:id/plans', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const entityPlanId = Number(req.body.entity_plan_id);
    if (!entityPlanId) return res.status(400).json({ success: false, message: 'entity_plan_id required' });

    // Validate plan belongs to the same entity as the contract
    const targetPlan = await EntityPlan.findByPk(entityPlanId);
    if (!targetPlan) return res.status(404).json({ success: false, message: 'Plan not found' });
    if (targetPlan.entity_type !== contract.entity_type || targetPlan.entity_id !== contract.entity_id) {
      return res.status(403).json({ success: false, message: 'Plan does not belong to this contract\'s entity' });
    }

    const { sequelize } = require('../config/database');
    const t = await sequelize.transaction();
    try {
      // Close + deactivate prior open link (same as wizard)
      const priorOpen = await ContractPlan.findAll({
        where: { contract_id: contract.id, end_at: null },
        transaction: t
      });
      if (contract.restaurant_id && priorOpen.length > 0) {
        const priorPlanIds = priorOpen.map(l => l.entity_plan_id);
        await EntityPlanRestaurant.update(
          { is_active: false },
          { where: { entity_plan_id: priorPlanIds, restaurant_id: contract.restaurant_id }, transaction: t }
        );
      }
      await ContractPlan.update(
        { end_at: new Date() },
        { where: { contract_id: contract.id, end_at: null }, transaction: t }
      );

      const link = await ContractPlan.create({
        contract_id: contract.id,
        entity_plan_id: entityPlanId,
        assigned_at: new Date()
      }, { transaction: t });

      // Create/reactivate EPR so the scheduler actually bills this plan
      let epr = null;
      if (contract.restaurant_id) {
        const [row, created] = await EntityPlanRestaurant.findOrCreate({
          where: { entity_plan_id: entityPlanId, restaurant_id: contract.restaurant_id },
          defaults: {
            entity_plan_id: entityPlanId,
            restaurant_id: contract.restaurant_id,
            activation_date: new Date(),
            is_active: true
          },
          transaction: t
        });
        if (!created && !row.is_active) {
          await row.update({ is_active: true, activation_date: new Date() }, { transaction: t });
        }
        epr = row;
      }

      await t.commit();

      await logHistory(contract.id, 'plan_assigned', null, String(entityPlanId), { linked_existing: true, restaurant_linked: !!epr }, req.user.id);
      res.status(201).json({ success: true, data: { link, epr } });
    } catch (e) {
      await t.rollback();
      throw e;
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/plans/:planId', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const plan = await ContractPlan.findOne({ where: { id: req.params.planId, contract_id: contract.id } });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan reference not found' });

    await plan.destroy();
    res.json({ success: true, message: 'Plan reference removed' });
  } catch (error) {
    next(error);
  }
});

// ============================================================================
// Phase 1 Contract ↔ Plan integration endpoints
// ============================================================================

// Create an EntityPlan from this contract's financial_terms, then attach it.
// Used by the "Create plan from contract" wizard on Contract Detail.
// POST /api/contracts/:id/create-plan-from-contract
// Body (all optional — sensible defaults from the contract):
//   { name?, description?, billing_day? }
router.post('/:id/create-plan-from-contract', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    if (!['System Admin', 'Foodcourt General', 'Brand General'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Only Foodcourt/Brand General or System Admin can create plans' });
    }

    const ft = contract.financial_terms || {};
    const baseRent = Number(ft.base_rent);
    const revenueShare = Number(ft.revenue_share_percent);
    const franchiseFee = Number(ft.franchise_fee);
    const royalty = Number(ft.royalty_value);

    // Decide charge_type
    let chargeType = null;
    let percentageValue = 0;
    let fixedAmount = 0;
    const warnings = [];

    if (contract.entity_type === 'foodcourt') {
      const hasRev = !isNaN(revenueShare) && revenueShare > 0;
      const hasBase = !isNaN(baseRent) && baseRent > 0;
      if (hasRev && hasBase) {
        // Combined: min-guarantee pattern — rent = max(base_rent, revenue × %)
        chargeType = 'combined';
        percentageValue = revenueShare;
        fixedAmount = baseRent;
      } else if (hasRev) {
        chargeType = 'percentage';
        percentageValue = revenueShare;
      } else if (hasBase) {
        chargeType = 'fixed';
        fixedAmount = baseRent;
      }
    } else if (contract.entity_type === 'brand') {
      // Brand: royalty % is the typical recurring, franchise_fee is one-time (handled elsewhere)
      if (!isNaN(royalty) && royalty > 0 && (ft.royalty_type === 'percent' || !ft.royalty_type)) {
        chargeType = 'percentage';
        percentageValue = royalty;
      } else if (!isNaN(royalty) && royalty > 0 && ft.royalty_type === 'fixed') {
        chargeType = 'fixed';
        fixedAmount = royalty;
      } else if (!isNaN(franchiseFee) && franchiseFee > 0) {
        chargeType = 'fixed';
        fixedAmount = franchiseFee;
        warnings.push('Only franchise_fee present (typically one-time). Plan created as fixed recurring — verify this is intended.');
      }
    }

    if (!chargeType) {
      return res.status(400).json({
        success: false,
        message: 'Contract has no billable terms yet. Fill base_rent / revenue_share_percent (Foodcourt) or royalty_value / franchise_fee (Brand) before generating a plan.'
      });
    }

    // Resolve billing_day — use start_date day if 1-28, else 1. Override if provided.
    let billingDay = Number(req.body.billing_day) || null;
    if (!billingDay && contract.start_date) {
      const d = new Date(contract.start_date);
      const day = d.getUTCDate();
      billingDay = day >= 1 && day <= 28 ? day : 1;
    }
    if (!billingDay) billingDay = 1;

    // Plan name default
    const entityName = contract.issuer_company_name ||
      (contract.entity_type === 'foodcourt'
        ? (await Foodcourt.findByPk(contract.entity_id))?.name
        : (await Brand.findByPk(contract.entity_id))?.name) || 'Entity';
    const planName = req.body.name || `${contract.contract_number || `#${contract.id}`} — ${entityName} ${contract.entity_type === 'foodcourt' ? 'Tenancy' : 'Franchise'}`;

    const { sequelize } = require('../config/database');
    const t = await sequelize.transaction();
    try {
      const plan = await EntityPlan.create({
        entity_type: contract.entity_type,
        entity_id: contract.entity_id,
        name: planName,
        description: req.body.description || `Auto-generated from contract ${contract.contract_number || '#' + contract.id}`,
        auto_generate: true,
        currency: contract.currency || 'MYR',
        is_active: true,
        category: 'custom',
        charge_type: chargeType,
        percentage_value: percentageValue,
        revenue_base: 'previous_month',
        billing_day: billingDay,
        created_by: req.user.id
      }, { transaction: t });

      // Create EntityPlanPrice row for fixed + combined types (combined uses fixed as min-guarantee)
      if ((chargeType === 'fixed' || chargeType === 'combined') && fixedAmount > 0) {
        const EntityPlanPrice = require('../models/EntityPlanPrice');
        await EntityPlanPrice.create({
          entity_plan_id: plan.id,
          currency: contract.currency || 'MYR',
          monthly_price: fixedAmount,
          annual_price: Math.round(fixedAmount * 12 * 0.9 * 100) / 100, // 10% annual discount default
          is_active: true
        }, { transaction: t });
      }

      // Attach to contract (close any prior still-open attachment)
      // Phase 2-C: also deactivate EPR for the plan being replaced, so the outgoing
      // plan stops billing this restaurant.
      const priorOpen = await ContractPlan.findAll({
        where: { contract_id: contract.id, end_at: null },
        transaction: t
      });
      if (contract.restaurant_id && priorOpen.length > 0) {
        const priorPlanIds = priorOpen.map(l => l.entity_plan_id);
        await EntityPlanRestaurant.update(
          { is_active: false },
          { where: { entity_plan_id: priorPlanIds, restaurant_id: contract.restaurant_id }, transaction: t }
        );
      }
      await ContractPlan.update({ end_at: new Date() }, {
        where: { contract_id: contract.id, end_at: null },
        transaction: t
      });
      const link = await ContractPlan.create({
        contract_id: contract.id,
        entity_plan_id: plan.id,
        assigned_at: new Date()
      }, { transaction: t });

      // Phase 2-C: Also create EntityPlanRestaurant so the scheduler actually bills this plan.
      // If restaurant_id is null, skip — plan created but not billable until a restaurant is attached
      // (editing the contract later will trigger the PUT hook to wire it up).
      let epr = null;
      if (contract.restaurant_id) {
        epr = await EntityPlanRestaurant.findOrCreate({
          where: { entity_plan_id: plan.id, restaurant_id: contract.restaurant_id },
          defaults: {
            entity_plan_id: plan.id,
            restaurant_id: contract.restaurant_id,
            activation_date: new Date(),
            is_active: true
          },
          transaction: t
        }).then(([row, created]) => {
          if (!created && !row.is_active) {
            return row.update({ is_active: true, activation_date: new Date() }, { transaction: t });
          }
          return row;
        });
      } else {
        warnings.push('Plan created but not billable until a restaurant is attached to the contract.');
      }

      await t.commit();

      await logHistory(contract.id, 'plan_assigned', null, plan.id.toString(),
        { auto_generated_from_contract: true, restaurant_linked: !!epr }, req.user.id);

      res.status(201).json({
        success: true,
        data: { plan, link, epr, warnings }
      });
    } catch (e) {
      await t.rollback();
      throw e;
    }
  } catch (error) {
    next(error);
  }
});

// Billing preview — simulate the next invoice for this contract.
// GET /api/contracts/:id/billing-preview
router.get('/:id/billing-preview', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const { sequelize } = require('../config/database');
    const EntityPlanPrice = require('../models/EntityPlanPrice');

    const links = await ContractPlan.findAll({
      where: { contract_id: contract.id, end_at: null },
      include: [{ model: EntityPlan, as: 'entityPlan' }]
    });

    if (links.length === 0) {
      return res.json({
        success: true,
        data: { currency: contract.currency || 'MYR', plans: [], line_items: [], subtotal: 0, has_plan: false }
      });
    }

    // Compute last-30-day revenue if any plan is percentage-based
    let revenue30d = 0;
    if (contract.restaurant_id && links.some(l => l.entityPlan?.charge_type === 'percentage')) {
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const [rows] = await sequelize.query(`
        SELECT COALESCE(SUM(total_amount), 0) AS rev
        FROM orders
        WHERE restaurant_id = :rid
          AND status IN ('completed', 'served')
          AND (is_deleted = false OR is_deleted IS NULL)
          AND order_date >= :since
      `, { replacements: { rid: contract.restaurant_id, since } });
      revenue30d = Number(rows[0].rev) || 0;
    }

    const isManagerRole = ['Foodcourt Manager', 'Brand Manager'].includes(req.user.role);
    const currency = contract.currency || 'MYR';
    const items = [];
    let subtotal = 0;

    // Phase 2-E: preview next billing period using the first plan's billing_day.
    // Compute proration factor against this contract's start/end so the preview matches
    // what the scheduler will actually invoice.
    const invoiceScheduler = require('../services/invoiceScheduler');
    const nextBillingDay = (links[0] && links[0].entityPlan && links[0].entityPlan.billing_day != null)
      ? links[0].entityPlan.billing_day : 1;
    const { periodStart: previewStart, periodEnd: previewEnd } = invoiceScheduler.calculateEntityBillingPeriod(nextBillingDay, new Date());
    const previewFactor = invoiceScheduler.computeProrationFactor(contract, previewStart, previewEnd);

    for (const link of links) {
      const plan = link.entityPlan;
      if (!plan) continue;

      // Look up fixed monthly price for fixed/combined/additive types (all use fixed portion)
      let fullFixed = 0;
      if (plan.charge_type === 'fixed' || plan.charge_type === 'combined' || plan.charge_type === 'additive') {
        const price = await EntityPlanPrice.findOne({
          where: { entity_plan_id: plan.id, currency, is_active: true }
        }) || await EntityPlanPrice.findOne({
          where: { entity_plan_id: plan.id, is_active: true }
        });
        fullFixed = price ? Number(price.monthly_price) : 0;
      }
      const fixedAmount = Math.round(fullFixed * previewFactor * 100) / 100;
      const rate = Number(plan.percentage_value) || 0;
      const pctAmount = rate > 0 ? Math.round(revenue30d * (rate / 100) * 100) / 100 : 0;

      let amount = 0;
      let method = plan.charge_type;
      if (plan.charge_type === 'fixed') {
        amount = fixedAmount;
      } else if (plan.charge_type === 'percentage') {
        amount = pctAmount;
      } else if (plan.charge_type === 'combined') {
        amount = Math.max(fixedAmount, pctAmount);
      } else if (plan.charge_type === 'additive') {
        amount = fixedAmount + pctAmount;
      }

      items.push({
        plan_id: plan.id,
        plan_name: plan.name,
        method,
        rate: plan.charge_type !== 'fixed' ? rate : null,
        base: isManagerRole || plan.charge_type === 'fixed' ? null : revenue30d,
        amount: isManagerRole ? null : amount,
        minimum: plan.charge_type === 'combined' ? (isManagerRole ? null : fixedAmount) : null,
        currency: plan.currency || currency,
        redacted: isManagerRole,
        proration: previewFactor < 1 ? { factor: previewFactor, covers_days: null, full_fixed: isManagerRole ? null : fullFixed } : null
      });
      if (!isManagerRole) subtotal += amount;
    }

    res.json({
      success: true,
      data: {
        currency,
        revenue_base_30d: isManagerRole ? null : revenue30d,
        line_items: items,
        subtotal: isManagerRole ? null : Math.round(subtotal * 100) / 100,
        has_plan: true,
        financial_redacted: isManagerRole,
        proration_factor: previewFactor,
        period: { start: previewStart, end: previewEnd }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Active contracts without any open ContractPlan attachment — used for billing-gap alerts.
// GET /api/foodcourts/:id/unlinked-contracts
// GET /api/brands/:id/unlinked-contracts
// (Both paths mount here; entityType inferred from route prefix.)
router.get('/unlinked/:entityType/:entityId', authenticateToken, async (req, res, next) => {
  try {
    const entityType = req.params.entityType === 'brand' ? 'brand' : 'foodcourt';
    const entityId = Number(req.params.entityId);

    // Access: user must belong to this entity OR be System Admin
    if (req.user.role !== 'System Admin') {
      const myEntity = getUserEntity(req.user);
      if (!myEntity || myEntity.entity_type !== entityType || Number(myEntity.entity_id) !== entityId) {
        return res.status(403).json({ success: false, message: 'No access to this entity' });
      }
    }

    const list = await Contract.findAll({
      where: { entity_type: entityType, entity_id: entityId, stage: 'active' },
      attributes: ['id', 'contract_number', 'stage', 'restaurant_id', 'unit_id', 'start_date', 'end_date', 'currency', 'applicant_company_name'],
      include: [
        { model: ContractPlan, as: 'plans', where: { end_at: null }, required: false },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'branch_name'], required: false }
      ],
      order: [['start_date', 'ASC']]
    });

    const unlinked = list.filter(c => !c.plans || c.plans.length === 0);

    res.json({
      success: true,
      data: {
        count: unlinked.length,
        contracts: unlinked.map(c => ({
          id: c.id,
          contract_number: c.contract_number,
          currency: c.currency,
          restaurant: c.restaurant ? { id: c.restaurant.id, name: c.restaurant.name, branch_name: c.restaurant.branch_name } : null,
          unit_id: c.unit_id,
          applicant_company_name: c.applicant_company_name,
          start_date: c.start_date,
          end_date: c.end_date
        }))
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
