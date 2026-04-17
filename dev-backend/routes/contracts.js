const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { Contract, ContractDocument, ContractTask, ContractNote, ContractHistory, ContractPlan,
        FoodcourtUnit, Restaurant, Brand, Foodcourt, User, EntityPlan } = require('../models');
const { Op } = require('sequelize');

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

// Helper: check contract access
const checkContractAccess = async (req, res) => {
  const entity = getUserEntity(req.user);
  if (!entity) {
    res.status(403).json({ success: false, message: 'No access to contracts' });
    return null;
  }
  const contract = await Contract.findByPk(req.params.id);
  if (!contract) {
    res.status(404).json({ success: false, message: 'Contract not found' });
    return null;
  }
  if (entity.entity_type && (contract.entity_type !== entity.entity_type || contract.entity_id !== entity.entity_id)) {
    res.status(403).json({ success: false, message: 'No access to this contract' });
    return null;
  }
  return contract;
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

    const contracts = await Contract.findAll({
      where,
      include: [
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] },
        { model: User, as: 'creator', attributes: ['id', 'full_name'] },
        { model: FoodcourtUnit, as: 'unit', attributes: ['id', 'unit_number', 'size_value', 'size_unit'] }
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
            { model: FoodcourtUnit, as: 'unit', attributes: ['id', 'unit_number', 'size_value', 'size_unit'] }
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

    const contract = await Contract.findOne({
      where,
      include: [
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'branch_name', 'address', 'phone'] },
        { model: User, as: 'creator', attributes: ['id', 'full_name'] },
        { model: User, as: 'updater', attributes: ['id', 'full_name'] },
        { model: FoodcourtUnit, as: 'unit' },
        { model: ContractDocument, as: 'documents', include: [{ model: User, as: 'uploader', attributes: ['id', 'full_name'] }] },
        { model: ContractTask, as: 'tasks', order: [['sort_order', 'ASC']] },
        { model: ContractNote, as: 'contractNotes', include: [{ model: User, as: 'author', attributes: ['id', 'full_name'] }], order: [['created_at', 'DESC']] },
        { model: ContractPlan, as: 'plans', include: [{ model: EntityPlan, as: 'entityPlan' }] },
        { model: ContractHistory, as: 'history', include: [{ model: User, as: 'changedByUser', attributes: ['id', 'full_name'] }], order: [['created_at', 'DESC']] },
        { model: Contract, as: 'renewedFrom', attributes: ['id', 'contract_number', 'stage'] },
        { model: Contract, as: 'renewedTo', attributes: ['id', 'contract_number', 'stage'] }
      ]
    });

    if (!contract) return res.status(404).json({ success: false, message: 'Contract not found' });

    // Attach entity currency for display
    const contractData = contract.toJSON();
    try {
      if (contract.entity_type === 'brand') {
        const Brand = require('../models/Brand');
        const brand = await Brand.findByPk(contract.entity_id, { attributes: ['id', 'name', 'currency'] });
        contractData.entity_currency = brand?.currency || 'MYR';
        contractData.entity = brand;
      } else if (contract.entity_type === 'foodcourt') {
        const Foodcourt = require('../models/Foodcourt');
        const foodcourt = await Foodcourt.findByPk(contract.entity_id, { attributes: ['id', 'name', 'currency'] });
        contractData.entity_currency = foodcourt?.currency || 'MYR';
        contractData.entity = foodcourt;
      } else {
        contractData.entity_currency = 'MYR';
      }
    } catch (err) {
      contractData.entity_currency = 'MYR';
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

    const contract = await Contract.create({
      entity_type: entity.entity_type,
      entity_id: entity.entity_id,
      stage: 'proposal',
      applicant_company_name: req.body.applicant_company_name ?? req.body.applicant_name,
      applicant_contact_person: req.body.applicant_contact_person,
      applicant_email: req.body.applicant_email,
      applicant_phone: req.body.applicant_phone,
      applicant_business_type: req.body.applicant_business_type,
      applicant_location: req.body.applicant_location,
      applicant_notes: req.body.applicant_notes,
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

    const oldTerms = JSON.stringify(contract.financial_terms);
    const updateFields = [
      'applicant_company_name', 'applicant_contact_person',
      'applicant_email', 'applicant_phone',
      'applicant_business_type', 'applicant_location', 'applicant_notes',
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

    await contract.update(updates);

    // Log restaurant link
    if (req.body.restaurant_id && req.body.restaurant_id !== contract.restaurant_id) {
      await logHistory(contract.id, 'restaurant_linked', null, req.body.restaurant_id.toString(), null, req.user.id);
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
      // Proposal terms should be filled — minimal check
      if (!contract.applicant_company_name) {
        return res.status(400).json({ success: false, message: 'Applicant company name is required before proceeding' });
      }
    }

    if (stage === 'setup') {
      if (!contract.contract_number || !contract.start_date || !contract.end_date) {
        return res.status(400).json({ success: false, message: 'Contract number, start date, and end date are required' });
      }
      const docCount = await ContractDocument.count({ where: { contract_id: contract.id } });
      if (docCount < 1) {
        return res.status(400).json({ success: false, message: 'At least 1 document is required' });
      }
    }

    if (stage === 'active') {
      if (!contract.restaurant_id) {
        return res.status(400).json({ success: false, message: 'Restaurant must be linked before going Active' });
      }
      const tasks = await ContractTask.findAll({ where: { contract_id: contract.id } });
      const incomplete = tasks.filter(t => !t.is_completed);
      if (incomplete.length > 0) {
        return res.status(400).json({ success: false, message: `${incomplete.length} setup tasks are incomplete` });
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

    const newContract = await Contract.create({
      entity_type: contract.entity_type,
      entity_id: contract.entity_id,
      restaurant_id: contract.restaurant_id,
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
    });

    await contract.update({
      stage: 'renewed',
      renewed_to_id: newContract.id,
      updated_by: req.user.id
    });

    await logHistory(contract.id, 'renewed', 'active', 'renewed', { new_contract_id: newContract.id }, req.user.id);
    await logHistory(newContract.id, 'created', null, newContract.stage, { renewed_from: contract.id }, req.user.id);

    res.status(201).json({ success: true, data: newContract });
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
      sort_order: (maxOrder || 0) + 1
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

router.post('/:id/plans', authenticateToken, async (req, res, next) => {
  try {
    const contract = await checkContractAccess(req, res);
    if (!contract) return;

    const plan = await ContractPlan.create({
      contract_id: contract.id,
      entity_plan_id: req.body.entity_plan_id,
      assigned_at: new Date()
    });

    await logHistory(contract.id, 'plan_assigned', null, req.body.entity_plan_id.toString(), null, req.user.id);
    res.status(201).json({ success: true, data: plan });
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

module.exports = router;
