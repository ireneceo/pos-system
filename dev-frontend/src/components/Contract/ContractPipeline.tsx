import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Contract {
  id: number;
  applicant_name: string;
  applicant_email?: string;
  applicant_phone?: string;
  applicant_business_type?: string;
  applicant_location?: string;
  contract_type?: string;
  contract_number?: string;
  stage: string;
  start_date?: string;
  end_date?: string;
  restaurant?: { id: number; name: string } | null;
  created_at: string;
  createdAt?: string;
  tasks?: { is_completed: boolean }[];
  unit?: { unit_number: string } | null;
  financial_terms?: any;
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
  gap: 16px;
  min-height: 350px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const Column = styled.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 12px;
  min-height: 250px;
`;

const ColumnHeader = styled.div<{ bg: string; textColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: ${p => p.bg};
  border-radius: 6px;
  margin-bottom: 12px;
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
  padding: 12px 14px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: box-shadow 0.15s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
`;

const CardName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #0A2540;
  margin-bottom: 4px;
`;

const CardSub = styled.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`;

const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
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
  font-size: 12px;
  color: #059669;
  font-weight: 500;
  margin-top: 4px;
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
    return new Date(dateStr).toLocaleDateString('en-CA', { month: '2-digit', day: '2-digit' });
  };

  const getSubtext = (c: Contract) => {
    if (c.stage === 'active' && c.end_date) return `~ ${c.end_date.substring(0, 7)}`;
    if (c.stage === 'setup' && c.tasks) {
      const done = c.tasks.filter(t => t.is_completed).length;
      return `${done}/${c.tasks.length} done`;
    }
    return formatDate(c.createdAt || c.created_at);
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
            {list.slice(0, showMax).map(c => (
              <Card key={c.id} borderColor={theme.border} onClick={() => onCardClick(c.id)}>
                <CardName>{c.applicant_name}</CardName>
                {c.restaurant && <CardRestaurant>{c.restaurant.name}</CardRestaurant>}
                {c.applicant_phone && <CardSub>{c.applicant_phone}</CardSub>}
                {c.applicant_location && <CardSub>{c.applicant_location}</CardSub>}
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
                    <CardTag bg="#ECFDF5" color="#059669">Unit {c.unit.unit_number}</CardTag>
                  )}
                </CardMeta>
                <CardSub style={{ marginTop: '6px' }}>{formatDate(c.createdAt || c.created_at)}</CardSub>
              </Card>
            ))}
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
