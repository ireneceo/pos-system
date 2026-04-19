import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { formatDate as formatDateTz } from '../../utils/timezone';
import { getBillableSummary, getRemainingInfo } from '../../utils/contractBillable';

interface Contract {
  id: number;
  entity_type?: 'brand' | 'foodcourt' | string;
  applicant_company_name?: string;
  applicant_contact_person?: string;
  applicant_name?: string; // legacy fallback
  applicant_email?: string;
  applicant_phone?: string;
  applicant_business_type?: string;
  applicant_location?: string;
  contract_type?: string;
  contract_number?: string;
  stage: string;
  start_date?: string;
  end_date?: string;
  restaurant?: { id: number; name: string; branch_name?: string | null } | null;
  created_at: string;
  createdAt?: string;
  tasks?: { is_completed: boolean }[];
  unit?: { unit_number: string; size_value?: number; size_unit?: string; location_description?: string | null; branch?: { id: number; name: string; code: string } | null } | null;
  financial_terms?: any;
  plans?: any[];
}

interface ContractPipelineProps {
  contracts: Contract[];
  onCardClick: (id: number) => void;
  entityType: 'brand' | 'foodcourt';
}

const STAGES = ['proposal', 'contracting', 'setup', 'active'];

const STAGE_THEME: Record<string, { header: string; headerText: string; border: string }> = {
  proposal: { header: '#EEF2FF', headerText: '#4338CA', border: '#C7D2FE' },
  contracting: { header: '#FFF7ED', headerText: '#C2410C', border: '#FDBA74' },
  setup: { header: '#F5F3FF', headerText: '#6D28D9', border: '#C4B5FD' },
  active: { header: '#F0FDF4', headerText: '#15803D', border: '#86EFAC' }
};

const PipelineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  width: 100%;
  margin: 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  background: transparent;
  padding: 0;
  min-width: 0;
`;

const ColumnHeader = styled.div<{ bg: string; textColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: ${p => p.bg};
  border-radius: 6px;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 13px;
  color: ${p => p.textColor};
`;

const Count = styled.span`
  background: rgba(0,0,0,0.06);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`;

const Card = styled.div<{ borderColor: string }>`
  background: #fff;
  border: 1px solid ${p => p.borderColor};
  border-radius: 6px;
  padding: 8px 10px;
  margin-bottom: 6px;
  cursor: pointer;
  transition: box-shadow 0.15s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
`;

const CardName = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #0A2540;
  margin-bottom: 2px;
  line-height: 1.3;
`;

const CardSub = styled.div`
  font-size: 11px;
  color: #6B7C93;
  margin-top: 1px;
  line-height: 1.35;
`;

const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`;

const CardTag = styled.span<{ bg?: string; color?: string }>`
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${p => p.bg || '#F3F4F6'};
  color: ${p => p.color || '#6B7C93'};
`;

const CardRestaurant = styled.div`
  font-size: 11px;
  color: #059669;
  font-weight: 500;
  margin-top: 2px;
`;

const BillableRow = styled.div<{ pending: boolean }>`
  font-size: 11px;
  margin-top: 4px;
  color: ${p => p.pending ? '#94A3B8' : '#0A2540'};
  font-style: ${p => p.pending ? 'italic' : 'normal'};
  line-height: 1.35;
`;

const BillableLabel = styled.span`
  color: #6B7C93;
  font-weight: 500;
`;

const BillableAmount = styled.span`
  font-weight: 600;
  margin-left: 4px;
`;

const BillableHint = styled.span`
  font-size: 11px;
  color: #94A3B8;
  margin-left: 6px;
`;

const LocationRow = styled.div`
  font-size: 11px;
  color: #475569;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LocationIcon = styled.span`
  color: #64748B;
  font-size: 11px;
`;

const RemainingTag = styled(CardTag as any)<{ severity: 'expired' | 'warning' | 'normal' }>`
  ${p => p.severity === 'expired' && `background: #FEE2E2; color: #B91C1C;`}
  ${p => p.severity === 'warning' && `background: #FEF3C7; color: #B45309;`}
  ${p => p.severity === 'normal' && `background: #E0E7FF; color: #3730A3;`}
`;

const ViewAll = styled.div`
  text-align: center;
  padding: 8px;
  font-size: 13px;
  color: #635BFF;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const ContractPipeline: React.FC<ContractPipelineProps> = ({ contracts, onCardClick, entityType }) => {
  const { t } = useTranslation('contract');

  const stageLabels: Record<string, string> = {
    proposal: t('stages.proposal', 'Proposal'),
    contracting: t('stages.contracting', 'Contracting'),
    setup: t('stages.setup', 'Setup'),
    active: t('stages.active', 'Active')
  };

  const grouped = STAGES.reduce((acc, stage) => {
    acc[stage] = contracts.filter(c => c.stage === stage);
    return acc;
  }, {} as Record<string, Contract[]>);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return formatDateTz(dateStr, null);
  };

  return (
    <PipelineGrid>
      {STAGES.map(stage => {
        const list = grouped[stage];
        const theme = STAGE_THEME[stage];
        const showMax = stage === 'active' ? 5 : 10;

        return (
          <Column key={stage}>
            <ColumnHeader bg={theme.header} textColor={theme.headerText}>
              <span>{stageLabels[stage]}</span>
              <Count>{list.length}</Count>
            </ColumnHeader>
            {list.slice(0, showMax).map(c => {
              const billable = getBillableSummary({ ...c, entity_type: c.entity_type || entityType }, 2);
              const remaining = getRemainingInfo(c.end_date);
              const unitLocation = entityType === 'foodcourt' && c.unit?.location_description;
              const unitSize = entityType === 'foodcourt' && c.unit?.size_value ? `${c.unit.size_value} ${c.unit.size_unit || 'sqft'}` : null;

              return (
              <Card key={c.id} borderColor={theme.border} onClick={() => onCardClick(c.id)}>
                <CardName>{c.applicant_company_name || c.applicant_name || '-'}</CardName>
                {c.applicant_contact_person && <CardSub>{c.applicant_contact_person}</CardSub>}
                {c.restaurant && <CardRestaurant>{c.restaurant.name}{c.restaurant.branch_name ? ` (${c.restaurant.branch_name})` : ''}</CardRestaurant>}
                {c.applicant_phone && <CardSub>{c.applicant_phone}</CardSub>}
                {c.applicant_location && <CardSub>{c.applicant_location}</CardSub>}

                {entityType === 'foodcourt' && c.unit && (
                  <LocationRow>
                    <LocationIcon>◆</LocationIcon>
                    <span>
                      {c.unit.branch?.code ? `${c.unit.branch.code}-${c.unit.unit_number}` : `Unit ${c.unit.unit_number}`}
                      {unitSize ? ` · ${unitSize}` : ''}
                      {c.unit.branch?.name ? ` · ${c.unit.branch.name}` : ''}
                    </span>
                  </LocationRow>
                )}
                {unitLocation && <CardSub>{c.unit?.location_description}</CardSub>}

                {billable.items.length > 0 && (
                  <BillableRow pending={billable.source === 'terms'}>
                    {billable.items.map((it, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <span style={{ color: '#CBD5E1' }}> · </span>}
                        <BillableLabel>{it.label}:</BillableLabel>
                        <BillableAmount>{it.amount}</BillableAmount>
                      </React.Fragment>
                    ))}
                    {billable.moreCount > 0 && <BillableHint>+{billable.moreCount} more</BillableHint>}
                    {billable.source === 'terms' && <BillableHint>(pending plan)</BillableHint>}
                  </BillableRow>
                )}

                <CardMeta>
                  {c.contract_type && (
                    <CardTag bg="#EEF2FF" color="#4338CA">{c.contract_type}</CardTag>
                  )}
                  {c.contract_number && (
                    <CardTag>{c.contract_number}</CardTag>
                  )}
                  {c.start_date && c.end_date && (
                    <CardTag>{c.start_date.substring(5)} ~ {c.end_date.substring(5)}</CardTag>
                  )}
                  {c.stage === 'setup' && c.tasks && (
                    <CardTag bg="#F5F3FF" color="#6D28D9">
                      {c.tasks.filter(t => t.is_completed).length}/{c.tasks.length} done
                    </CardTag>
                  )}
                  {entityType === 'foodcourt' && c.unit && (
                    <CardTag bg="#ECFDF5" color="#059669">
                      {c.unit.branch?.code ? `${c.unit.branch.code}-${c.unit.unit_number}` : `Unit ${c.unit.unit_number}`}
                    </CardTag>
                  )}
                  {remaining.severity !== 'none' && (c.stage === 'active' || c.stage === 'setup') && (
                    <RemainingTag severity={remaining.severity === 'expired' ? 'expired' : remaining.severity === 'warning' ? 'warning' : 'normal'}>
                      {remaining.label}
                    </RemainingTag>
                  )}
                </CardMeta>
                <CardSub style={{ marginTop: '4px', fontSize: '10px' }}>{formatDate(c.createdAt || c.created_at)}</CardSub>
              </Card>
            );
          })}
            {list.length > showMax && (
              <ViewAll>{t('pipeline.viewAll', 'View all')} ({list.length})</ViewAll>
            )}
            {list.length === 0 && (
              <CardSub style={{ textAlign: 'center', padding: '20px 0' }}>-</CardSub>
            )}
          </Column>
        );
      })}
    </PipelineGrid>
  );
};

export default ContractPipeline;
