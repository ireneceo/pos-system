import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Container, Header, Title, Content } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';

interface DirectoryCategory {
  id: number;
  name: string;
  emoji?: string | null;
}

interface DirectoryRow {
  id: number;
  name: string;
  company_name?: string | null;
  logo_url?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  product_count: number;
  category_names?: string[] | null;
  my_contract_status?: 'none' | 'requested' | 'active' | 'rejected' | 'terminated';
}

interface DirectoryResponse {
  success: boolean;
  data: DirectoryRow[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters?: {
    categories?: DirectoryCategory[];
    countries?: string[];
  };
}

const Subtitle = styled.div`
  color: #6B7280;
  font-size: 14px;
  margin-top: 4px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.button`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 18px;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.15s;
  font-family: inherit;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 4px 14px rgba(99, 91, 255, 0.12);
    transform: translateY(-1px);
  }
`;

const LogoBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 10px;
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  color: #6B7280;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  line-height: 1.3;
`;

const CardLine = styled.div`
  font-size: 12px;
  color: #6B7280;
  line-height: 1.4;
`;

const Badge = styled.span<{ variant?: 'success' | 'warning' | 'neutral' | 'danger' }>`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 999px;
  background: ${(p) => {
    switch (p.variant) {
      case 'success': return '#DCFCE7';
      case 'warning': return '#FEF3C7';
      case 'danger': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  }};
  color: ${(p) => {
    switch (p.variant) {
      case 'success': return '#166534';
      case 'warning': return '#92400E';
      case 'danger': return '#991B1B';
      default: return '#374151';
    }
  }};
`;

const CategoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const SmallTag = styled.span`
  font-size: 11px;
  background: #EEF2FF;
  color: #3730A3;
  padding: 2px 8px;
  border-radius: 999px;
`;

const Skeleton = styled.div`
  background: linear-gradient(90deg, #F3F4F6 0%, #E5E7EB 50%, #F3F4F6 100%);
  background-size: 200% 100%;
  border-radius: 8px;
  animation: shimmer 1.4s ease infinite;

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const SkeletonCard = styled(Card)`
  pointer-events: none;
  cursor: default;
  border-color: #E6EBF1;
  &:hover { transform: none; box-shadow: none; border-color: #E6EBF1; }
`;

const EmptyBox = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  color: #6B7280;

  h3 { color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 8px; }
  p { font-size: 14px; margin: 0; }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`;

const PageInfo = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

function statusVariant(s?: string): 'success' | 'warning' | 'neutral' | 'danger' {
  if (s === 'active') return 'success';
  if (s === 'requested') return 'warning';
  if (s === 'rejected' || s === 'terminated') return 'danger';
  return 'neutral';
}

function initialsOf(name: string): string {
  return name.split(/\s+/).slice(0, 2).map(w => w.charAt(0).toUpperCase()).join('') || '?';
}

const SupplierDirectoryPage: React.FC = () => {
  const { t } = useTranslation(['supplierDirectory', 'common']);
  const navigate = useNavigate();

  const [rows, setRows] = useState<DirectoryRow[]>([]);
  const [categories, setCategories] = useState<DirectoryCategory[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchDirectory = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (search.trim()) params.set('search', search.trim());
      if (categoryFilter !== 'all') params.set('category_id', categoryFilter);
      if (countryFilter !== 'all') params.set('country', countryFilter);
      params.set('page', String(page));
      params.set('limit', '24');

      const res = await fetch(`/api/supplier-directory?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data: DirectoryResponse = await res.json();
      if (!res.ok || !data.success) {
        setRows([]);
        setTotalPages(1);
        setTotal(0);
        return;
      }
      setRows(Array.isArray(data.data) ? data.data : []);
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages || 1);
        setTotal(data.pagination.total || 0);
      }
      if (data.filters) {
        if (Array.isArray(data.filters.categories)) setCategories(data.filters.categories);
        if (Array.isArray(data.filters.countries)) setCountries(data.filters.countries);
      }
    } catch (err) {
      console.error('Failed to fetch supplier directory:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter, countryFilter, page]);

  useEffect(() => {
    fetchDirectory();
  }, [fetchDirectory]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, countryFilter]);

  const renderCard = (row: DirectoryRow) => {
    const status = row.my_contract_status || 'none';
    const cats = row.category_names || [];
    const cityState = [row.city, row.state].filter(Boolean).join(', ');

    return (
      <Card
        key={row.id}
        type="button"
        onClick={() => navigate(`/pos/suppliers/directory/${row.id}`)}
      >
        <LogoBox>
          {row.logo_url ? (
            <img src={row.logo_url} alt={row.name} />
          ) : (
            initialsOf(row.name)
          )}
        </LogoBox>
        <CardName>{row.name}</CardName>
        {cats.length > 0 && (
          <CategoryRow>
            {cats.slice(0, 3).map((c, i) => <SmallTag key={i}>{c}</SmallTag>)}
          </CategoryRow>
        )}
        {cityState && <CardLine>{cityState}</CardLine>}
        <CardLine>{t('directory.products', { n: row.product_count || 0 })}</CardLine>
        {status !== 'none' && (
          <div>
            <Badge variant={statusVariant(status)}>
              {t(`status.${status}`)}
            </Badge>
          </div>
        )}
      </Card>
    );
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('directory.title')}</Title>
          <Subtitle>{t('directory.subtitle')}</Subtitle>
        </div>
      </Header>
      <Content>
        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('directory.search') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">{t('directory.allCategories')}</option>
            {categories.map(c => (
              <option key={c.id} value={String(c.id)}>
                {c.emoji ? `${c.emoji} ` : ''}{c.name}
              </option>
            ))}
          </FilterSelect>
          {countries.length > 0 && (
            <FilterSelect
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
            >
              <option value="all">{t('directory.allCountries')}</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </FilterSelect>
          )}
        </FilterBar>

        {loading ? (
          <CardGrid>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} as="div">
                <Skeleton style={{ width: 56, height: 56 }} />
                <Skeleton style={{ height: 16, width: '70%' }} />
                <Skeleton style={{ height: 12, width: '50%' }} />
                <Skeleton style={{ height: 12, width: '40%' }} />
              </SkeletonCard>
            ))}
          </CardGrid>
        ) : rows.length === 0 ? (
          <EmptyBox>
            <h3>{t('directory.noResults')}</h3>
            <p>{t('directory.noResultsHint')}</p>
          </EmptyBox>
        ) : (
          <>
            <CardGrid>
              {rows.map(renderCard)}
            </CardGrid>
            {totalPages > 1 && (
              <Pagination>
                <ThemedButton
                  size="small"
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  ‹
                </ThemedButton>
                <PageInfo>
                  {t('directory.page', { page, total: totalPages })}
                  {total > 0 && ` · ${total}`}
                </PageInfo>
                <ThemedButton
                  size="small"
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  ›
                </ThemedButton>
              </Pagination>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default SupplierDirectoryPage;
