import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Lock as LockIcon, ArrowRight } from 'lucide-react';
import SortDropdown, { SortKey, sortItems } from '../../components/Common/SortDropdown';
// Updated with new UI components
import styled from 'styled-components';
import { useMenu, MenuItem as MenuItemType, SetMenuItem } from '../../contexts/MenuContext';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import ConfirmModal from '../../components/ConfirmModal';
import NumberInputModal from '../../components/Common/NumberInputModal';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import ItemScheduleEditor from './ItemScheduleEditor';
// Common UI components
import {
  Modal as UIModal,
  FormGroup as UIFormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextArea,
  Button as UIButton,
  TabContainer,
  Tab,
  StatusBadge
} from '../../components/UI';
import SearchableSelect from '../../components/Common/SearchableSelect';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import SetMenuBuilder from '../../components/MenuManagement/SetMenuBuilder';
import { resolveSetGroups, validateSetGroups, SetGroup } from '../../utils/setMenu';
// Styled Components
const BrandMenuHelper = styled.div`
  background: linear-gradient(135deg, #F8F7FF 0%, #FFFFFF 100%);
  border: 1px solid #E6E3FF;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 16px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  @media (max-width: 768px) { padding: 14px; gap: 10px; }
`;

const HelperIco = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #F0EFFF;
  color: #635BFF;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  svg { width: 16px; height: 16px; }
`;

const HelperTtl = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const HelperBody = styled.div`
  font-size: 12.5px;
  color: #374151;
  line-height: 1.6;
  strong { color: #635BFF; font-weight: 600; }
  svg.inline-lock { width: 12px; height: 12px; vertical-align: -2px; color: #635BFF; }
`;

const HelperLnk = styled.button`
  margin-top: 8px;
  background: transparent;
  border: 0;
  color: #635BFF;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  &:hover { text-decoration: underline; }
  svg { width: 12px; height: 12px; }
`;

const Container = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F9FAFB;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;


const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const SearchSection = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchInputContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &::placeholder {
    color: #8898AA;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`;

const ClearSearchBtn = styled.button`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: #F4F6F9;
  border-radius: 50%;
  color: #4B5563;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;
  
  &:hover {
    background: #C7CED6;
    color: #0A2540;
  }
`;

const SearchResultInfo = styled.div`
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #635BFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoResultsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #4B5563;
  text-align: center;
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .message {
    font-size: 14px;
    opacity: 0.8;
  }
`;

// TabContainer and Tab components now imported from ../../components/UI

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const MenuCard = styled.div<{ soldOut?: boolean; inactive?: boolean }>`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.15s;
  position: relative;
  display: flex;
  flex-direction: column;

  ${props => props.inactive && `
    opacity: 0.5;
    background: #F9FAFB;

    &::before {
      content: 'INACTIVE';
      position: absolute;
      top: 10px;
      left: 10px;
      background: #4B5563;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      z-index: 10;
    }
  `}

  ${props => props.soldOut && !props.inactive && `
    opacity: 0.7;

    &::after {
      content: 'SOLD OUT';
      position: absolute;
      top: 20px;
      right: -30px;
      background: #FF6B6B;
      color: white;
      padding: 4px 40px;
      transform: rotate(45deg);
      font-size: 12px;
      font-weight: 600;
    }
  `}

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const MenuImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #F4F6F9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  position: relative;
  overflow: hidden;
`;


const MenuContent = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  min-width: 0;
`;

const MenuName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
  flex: 1;
  min-width: 0;
  word-break: break-word;
  overflow-wrap: anywhere;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const MenuPrice = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
  white-space: nowrap;
  flex-shrink: 0;
`;

const MenuDescription = styled.p`
  font-size: 13px;
  color: #4B5563;
  margin: 8px 0;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RecipeLink = styled.span`
  font-size: 12px;
  color: #635BFF;
  cursor: pointer;
  display: inline-block;
  margin-top: 8px;
  transition: all 0.15s;

  &:hover {
    text-decoration: underline;
  }

  &::before {
    content: '→ ';
    opacity: 0.6;
  }
`;

const MenuCategory = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 12px;
  align-self: flex-start;
  width: fit-content;
`;

const MenuActions = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #F4F6F9;
  margin-top: auto;
`;

const ActionButton = styled.button<{ danger?: boolean }>`
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #C7CED6;

  ${props => props.danger ? `
    background: #FFF4F4;
    color: #FF6B6B;
    border-color: #FFE6E6;

    &:hover {
      background: #FFE6E6;
    }
  ` : `
    background: white;
    color: #4B5563;

    &:hover {
      background: #F4F6F9;
      color: #635BFF;
      border-color: #C7D2FE;
    }
  `}
`;

const IconButton = styled.button<{ danger?: boolean; warning?: boolean; inactive?: boolean }>`
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #C7CED6;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.danger ? `
    background: #FFF4F4;
    color: #FF6B6B;
    border-color: #FFE6E6;
    &:hover { background: #FFE6E6; }
  ` : props.warning ? `
    background: #FFFBEB;
    color: #F59E0B;
    border-color: #FEF3C7;
    &:hover { background: #FEF3C7; }
  ` : props.inactive ? `
    background: #F1F4F8;
    color: #4B5563;
    border-color: #C7CED6;
    &:hover { background: #C7CED6; }
  ` : `
    background: white;
    color: #4B5563;
    &:hover { background: #F4F6F9; color: #635BFF; border-color: #C7D2FE; }
  `}
`;

const AddCard = styled.div`
  background: white;
  border: 2px dashed #C7D2FE;
  border-radius: 12px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: #635BFF;
    background: #F0F4FF;
    transform: translateY(-2px);
  }
`;

const AddIcon = styled.div`
  font-size: 48px;
  color: #635BFF;
  margin-bottom: 12px;
`;

const AddText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
`;

// Modal styles - keeping only non-standard components

const EmojiPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: #F9FAFB;
`;

const EmojiOption = styled.button<{ selected?: boolean }>`
  width: 48px;
  height: 48px;
  border: 2px solid ${props => props.selected ? '#635BFF' : '#C7CED6'};
  border-radius: 8px;
  background: ${props => props.selected ? '#F0F4FF' : 'white'};
  font-size: 24px;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: #635BFF;
    background: #F0F4FF;
  }
`;


// 옵션 그룹 선택 UI - Select + Chip 방식
const OptionGroupSelect = styled.select`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  cursor: pointer;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const SelectedChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  min-height: 36px;
`;

const OptionGroupChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 20px;
  font-size: 13px;
  color: #4338CA;
`;

const ChipOrderBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #635BFF;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 600;
`;

const ChipName = styled.span`
  font-weight: 500;
`;

const ChipBadge = styled.span<{ type: 'required' | 'optional' }>`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  ${props => props.type === 'required'
    ? 'background: #FEE2E2; color: #DC2626;'
    : 'background: #DCFCE7; color: #16A34A;'}
`;

const ChipRemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #4B5563;
  border-radius: 50%;
  padding: 0;
  transition: all 0.15s;

  &:hover {
    background: #E0E7FF;
    color: #4338CA;
  }
`;

const OptionGroupSectionTitle = styled.div`
  margin-top: 24px;
`;



const SetBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  z-index: 1;
`;

const BrandLinkedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: #FFFFFF;
  color: #635BFF;
  border: 1px solid #635BFF;
  padding: 3px 7px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
  z-index: 1;
`;

const PendingDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #F59E0B;
  margin-left: 2px;
`;

const SetItemsList = styled.div`
  background: #F4F6F9;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
`;

const SetItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #C7CED6;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SetItemInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SetItemName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`;

const SetItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid #C7CED6;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #635BFF;
  transition: all 0.15s;

  &:hover {
    background: #F0F4FF;
    border-color: #635BFF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: #0A2540;
`;

const RemoveButton = styled.button`
  padding: 4px 12px;
  background: #FFF4F4;
  color: #FF6B6B;
  border: 1px solid #FFE6E6;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FFE6E6;
  }
`;

const MenuItemSelector = styled.div`
  border: 1px solid #C7CED6;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
`;

const MenuItemOption = styled.div<{ selected?: boolean }>`
  padding: 12px;
  border-bottom: 1px solid #F4F6F9;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.selected ? '#F0F4FF' : 'white'};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F4F6F9;
  }

  display: flex;
  align-items: center;
  gap: 12px;
`;

const MenuItemOptionEmoji = styled.span`
  font-size: 24px;
`;

const MenuItemOptionInfo = styled.div`
  flex: 1;
`;

const MenuItemOptionName = styled.div`
  font-weight: 500;
  color: #0A2540;
  font-size: 14px;
`;

const MenuItemOptionPrice = styled.div`
  font-size: 12px;
  color: #4B5563;
`;


interface Recipe {
  id: number;
  name: string;
  total_ingredient_cost: number;
}

const MenuItemImageWithFallback: React.FC<{ src?: string | null; alt?: string; emoji?: string | null }> = ({ src, alt, emoji }) => {
  const [errored, setErrored] = useState(false);
  const hasSrc = typeof src === 'string' && src.trim() !== '';
  if (!hasSrc || errored) {
    return <span style={{ fontSize: '48px' }}>{emoji || '🍽️'}</span>;
  }
  return (
    <img
      src={src!}
      alt={alt || ''}
      loading="lazy"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      onError={() => setErrored(true)}
    />
  );
};

const MenuManagementPage: React.FC = () => {
  const { t } = useTranslation('menu');
  const { categories, menuItems, optionGroups, updateMenuItem, addMenuItem, removeMenuItem, toggleItemSoldOut, reloadMenu } = useMenu();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [missingFilter, setMissingFilter] = useState<'none' | 'price' | 'cost'>('none');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  // 세트 모달 내부 인라인 에러 (팝업 위 팝업 금지 — 모달 안에서 바로 표시)
  const [setMenuError, setSetMenuError] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceEditItem, setPriceEditItem] = useState<MenuItemType | null>(null);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  // Recipe list for linking
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Set menu states
  const [showSetMenuModal, setShowSetMenuModal] = useState(false);
  const [setMenuItems, setSetMenuItems] = useState<SetMenuItem[]>([]);
  // 세트메뉴 v2 — 슬롯 기반 set_groups (SetMenuBuilder 가 관리). 레거시 setMenuItems 는 폴백/마이그용.
  const [setGroups, setSetGroups] = useState<SetGroup[]>([]);
  const [, ] = useState(0);
  const [setMenuSearchQuery, setSetMenuSearchQuery] = useState('');

  // Progressive rendering state
  const PROGRESSIVE_THRESHOLD = 50;
  const INITIAL_RENDER_COUNT = 40;
  const LOAD_MORE_COUNT = 30;
  const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER_COUNT);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<MenuItemType>>({
    name: '',
    price: 0,
    category: '',
    emoji: '🍽️',
    description: '',
    image: '',
    optionGroups: [],
    is_set_menu: false,
    is_featured: false,
    after_meal: false,
    set_only: false,
    set_items: [],
    set_display_order: 0,
    recipe_id: null,
    ingredient_id: null as number | null,
    current_stock: 0,
    min_stock: 0,
    stock_unit: '',
    takeaway_charge: 0
  });

  const [ingredients, setIngredients] = useState<{id: number; name: string; unit: string; unit_cost: number}[]>([]);

  // Fetch recipes on mount (both restaurant and brand recipes)
  React.useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = getAuthToken();

        // Get restaurantId from URL path (e.g., /restaurant/5/menu)
        const pathParts = window.location.pathname.split('/');
        const restaurantIndex = pathParts.indexOf('restaurant');
        let restaurantId = null;

        if (restaurantIndex >= 0) {
          restaurantId = pathParts[restaurantIndex + 1];
        }

        if (!restaurantId) {
          console.error('No restaurantId found in URL');
          return;
        }

        // Fetch both restaurant recipes and brand recipes
        const [restaurantResponse, brandResponse] = await Promise.all([
          fetch(`/api/restaurants/${restaurantId}/recipes`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`/api/restaurants/${restaurantId}/brand-recipes`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        let allRecipes: Recipe[] = [];

        if (restaurantResponse.ok) {
          const data = await restaurantResponse.json();
          if (data.success) {
            allRecipes = [...allRecipes, ...(data.data || [])];
          }
        }

        if (brandResponse.ok) {
          const brandData = await brandResponse.json();
          if (brandData.success) {
            allRecipes = [...allRecipes, ...(brandData.data || [])];
          }
        }

        setRecipes(allRecipes);

        // Fetch ingredients for direct linking.
        // ⚠ 자기 매장 재료만 받으면 **브랜드가 공유한 재고아이템(거울)을 메뉴에 직접 이을 수 없다.**
        //   실측(2026-09-04 dev): FOODCOURT CENTRAL 자기 4 vs 브랜드공유 10, with MIN Cafe 7 vs 7 —
        //   그 브랜드 재료가 이 폼에서만 통째로 빠져 있었다. 레시피 화면(RecipesTab)은 이미 둘 다 받는다.
        //   같은 절단면으로 맞춘다: 브랜드 공유분을 먼저, 그 다음 매장 자기 재료(RecipesTab 과 동일 순서).
        if (restaurantId) {
          const [ingResponse, brandIngResponse] = await Promise.all([
            fetch(`/api/restaurants/${restaurantId}/ingredients`, {
              headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch(`/api/restaurants/${restaurantId}/brand-ingredients`, {
              headers: { 'Authorization': `Bearer ${token}` }
            })
          ]);
          let own: any[] = [];
          let shared: any[] = [];
          if (ingResponse.ok) {
            const ingData = await ingResponse.json();
            own = (ingData.success ? ingData.data : ingData) || [];
          }
          if (brandIngResponse.ok) {
            const bData = await brandIngResponse.json();
            shared = (bData.success ? bData.data : bData) || [];
          }
          setIngredients([...shared, ...own]);
        }
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  const [selectedOptionGroups, setSelectedOptionGroups] = useState<string[]>([]);
  // #11c 크로스셀 — 함께 추천할 상품. 매장분(origin='restaurant', 편집가능) + 브랜드 잠금분(표시만).
  const [selectedRecommendations, setSelectedRecommendations] = useState<string[]>([]);
  const [lockedRecommendations, setLockedRecommendations] = useState<{ id: number; name: string }[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);

  const emojiOptions = {
    other: [
      // Food
      '🍖', '🍲', '🍚', '🥓', '🍜', '🍗', '🥟', '🥘', '🍣', '🍤', '🍔', '🍟', '🍝', '🥗',
      '🌮', '🌯', '🥙', '🫔', '🥪', '🌭', '🍕', '🍞', '🥐', '🥖', '🥨', '🥯', '🧇', '🥞',
      '🍳', '🥚', '🧈', '🥩', '🍙', '🍘', '🍥', '🍢', '🍠', '🥠', '🧆',
      // Beverages
      '☕', '🍵', '🥤', '🍺', '🍷', '🥛', '🧃', '🧋', '🍹', '🍸', '🍶', '🥃', '🍾', '🧉',
      '🫖', '🍼', '🧊', '🫗',
      // Desserts
      '🍰', '🍨', '🍡', '🍮', '🍩', '🍪', '🧁', '🍫', '🍬', '🥧', '🍭', '🍯', '🥮',
      '🍦', '🍧', '🎂', '🫘', '🥜', '🌰', '🥥',
      // Fruits & Vegetables
      '🍓', '🫐', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑',
      '🍒', '🥝', '🍅', '🫒', '🥑', '🌶️', '🫑', '🥒', '🥬', '🥦', '🧄', '🧅', '🌽', '🥕',
      '🫛', '🥔', '🫚', '🍄',
      // Kitchenware & Utensils
      '🍽️', '🥄', '🍴', '🥢', '🍱', '🥡', '🔪', '🧂',
      // International
      '🫕'
    ]
  };

  const getFilteredItems = () => {
    let items = selectedCategory === 'all' 
      ? menuItems 
      : menuItems.filter(item => item.category === selectedCategory);
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.price.toString().includes(query) ||
        categories.find(c => c.id === item.category)?.name.toLowerCase().includes(query)
      );
    }
    
    return items;
  };

  const filteredItems = sortItems(
    getFilteredItems().map((it: any) => ({ ...it, createdAt: it.createdAt || it.created_at })),
    sortKey
  );

  // 빠진 값만 걸러 보기. 요약 줄의 숫자를 누르면 켜지고, 다시 누르면 꺼진다.
  // 요약의 건수는 **거르기 전 목록** 기준이라, 걸러 본 상태에서도 전체 수가 그대로 보인다.
  const visibleItems = missingFilter === 'price'
    ? filteredItems.filter((i: any) => !i.price || Number(i.price) === 0)
    : missingFilter === 'cost'
      ? filteredItems.filter((i: any) => !i.recipe_id)
      : filteredItems;

  // Progressive rendering - only activate for large lists (50+ items)
  const useProgressive = filteredItems.length > PROGRESSIVE_THRESHOLD;

  // Reset visible count when category or search changes
  useEffect(() => {
    setVisibleCount(INITIAL_RENDER_COUNT);
  }, [selectedCategory, searchQuery]);

  // Intersection Observer for progressive loading - only when needed
  useEffect(() => {
    if (!useProgressive) return;

    const trigger = loadMoreTriggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + LOAD_MORE_COUNT);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [useProgressive, visibleCount, filteredItems.length]);

  const handleAddItem = () => {
    setFormData({
      name: '',
      price: 0,
      category: '',
      emoji: '🍽️',
      description: '',
      image: '',
      optionGroups: [],
      is_set_menu: false,
      set_only: false,
      set_items: [],
      set_display_order: 0,
      recipe_id: null,
      ingredient_id: null,
    current_stock: 0,
    min_stock: 0,
    stock_unit: '',
      takeaway_charge: 0
    });
    setSelectedOptionGroups([]);
    setSelectedRecommendations([]);
    setLockedRecommendations([]);
    setSetMenuItems([]);
    setShowAddModal(true);
  };

  const handleAddSetMenu = () => {
    setFormData({
      name: '',
      price: 0,
      category: '',
      emoji: '🍽️',
      description: '',
      image: '',
      optionGroups: [],
      is_set_menu: true,
      set_only: false,  // 세트 자체는 세트전용 단품 불가
      set_items: [],
      set_display_order: 0,
      recipe_id: null,
      ingredient_id: null,
    current_stock: 0,
    min_stock: 0,
    stock_unit: '',
      takeaway_charge: 0
    });
    setSelectedOptionGroups([]);
    setSelectedRecommendations([]);
    setLockedRecommendations([]);
    setSetMenuItems([]);
    setSetGroups([]);
    setSetMenuError("");
    setShowSetMenuModal(true);
  };

  // #11c 크로스셀 — URL 에서 restaurantId 추출(파일 내 다른 호출과 동일 패턴)
  const getRestaurantIdFromPath = (): string | null => {
    const pathParts = window.location.pathname.split('/');
    const idx = pathParts.indexOf('restaurant');
    return idx >= 0 ? pathParts[idx + 1] : null;
  };

  // #11c 크로스셀 — 상품의 기존 추천 연결 로드(매장분=편집, 브랜드 잠금분=표시만)
  const loadProductRecommendations = async (productId: string | number) => {
    const restaurantId = getRestaurantIdFromPath();
    if (!restaurantId) return;
    setRecommendationsLoading(true);
    setSelectedRecommendations([]);
    setLockedRecommendations([]);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/restaurants/${restaurantId}/products/${productId}/recommendations`, {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
      });
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.data)) {
        const editable: string[] = [];
        const locked: { id: number; name: string }[] = [];
        data.data.forEach((r: any) => {
          if (r.is_locked || r.origin === 'brand') {
            locked.push({ id: r.recommended_product_id, name: r.name });
          } else {
            editable.push(String(r.recommended_product_id));
          }
        });
        setSelectedRecommendations(editable);
        setLockedRecommendations(locked);
      }
    } catch {
      /* 추천 로드 실패는 무시 — 상품 편집 자체는 가능해야 함 */
    } finally {
      setRecommendationsLoading(false);
    }
  };

  const handleEditItem = (item: MenuItemType) => {
    setEditingItem(item);
    loadProductRecommendations(item.id); // #11c — 단품·세트 모두 기존 추천 로드
    setFormData({
      ...item,
      emoji: item.emoji || '🍽️',  // Preserve emoji or use default
      image: item.image || '',      // Preserve image or empty string
      optionGroups: item.optionGroups || [],
      is_set_menu: item.is_set_menu || false,
      set_only: (item as any).set_only || false,
      set_items: item.set_items || [],
      set_display_order: item.set_display_order || 0,
      // 자체 재고 — 수정 폼을 열 때 저장된 값을 그대로 싣는다.
      // (안 실으면 저장 시 0/꺼짐으로 덮어써 재고가 조용히 날아간다.)
      current_stock: Number((item as any).current_stock) || 0,
      min_stock: Number((item as any).min_stock) || 0,
      stock_unit: (item as any).stock_unit || '',
      recipe_id: item.recipe_id || null,
      // 재고아이템 다이렉트 (TRADE_STRUCTURE §2-1) — 레시피와 둘 중 하나만 채워진다.
      ingredient_id: (item as any).ingredient_id || null,
      takeaway_charge: item.takeaway_charge ?? 0
    });
    setSelectedOptionGroups(item.optionGroups || []);
    setSetMenuItems(item.set_items || []);
    // set_groups 우선, 없으면 레거시 set_items 를 fixed 그룹으로 폴백 변환
    setSetGroups(resolveSetGroups(item));

    // 자동 레시피에서 재료를 되읽던 블록 삭제 — 연결은 이제 컬럼 하나다 (TRADE_STRUCTURE §2-1).

    // Open appropriate modal based on item type
    if (item.is_set_menu) {
      setSetMenuError("");
      setShowSetMenuModal(true);
    } else {
      setShowEditModal(true);
    }
  };

  // Set menu item handlers
  const handleAddSetMenuItem = (menuItemId: number) => {
    const menuItem = menuItems.find(item => item.id === menuItemId.toString());
    if (!menuItem || menuItem.is_set_menu) return; // Don't allow adding sets to sets

    const existingItem = setMenuItems.find(item => item.menuItemId === menuItemId);
    if (existingItem) {
      // Increase quantity if already added
      setSetMenuItems(setMenuItems.map(item =>
        item.menuItemId === menuItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Add new item
      setSetMenuItems([...setMenuItems, {
        menuItemId,
        name: menuItem.name,
        quantity: 1
      }]);
    }
  };

  const handleRemoveSetMenuItem = (menuItemId: number) => {
    setSetMenuItems(setMenuItems.filter(item => item.menuItemId !== menuItemId));
  };

  const handleUpdateSetMenuItemQuantity = (menuItemId: number, delta: number) => {
    setSetMenuItems(setMenuItems.map(item => {
      if (item.menuItemId === menuItemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleDeleteItem = (itemId: string) => {
    setItemToDelete(itemId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      removeMenuItem(itemToDelete);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  const handlePriceUpdate = (value: string) => {
    if (priceEditItem) {
      const newPrice = parseFloat(value);
      updateMenuItem({ ...priceEditItem, price: newPrice });
      setShowPriceModal(false);
      setPriceEditItem(null);
    }
  };

  // Copy menu item
  const handleCopyItem = async (item: MenuItemType) => {
    try {
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : '';

      const token = getAuthToken();
      const response = await fetch(`/api/menu/product/${item.id}/copy?restaurantId=${restaurantId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        // Reload menu to get the new item
        window.location.reload();
      } else {
        setInfoModal({ open: true, title: t('menu:menuManagement.copyFailedTitle', 'Copy Failed'), message: data.error || t('menu:menuManagement.copyFailedMessage', 'Failed to copy menu item.') });
      }
    } catch (error) {
      console.error('Error copying menu item:', error);
      setInfoModal({ open: true, title: t('menu:menuManagement.copyFailedTitle', 'Copy Failed'), message: t('menu:menuManagement.copyFailedMessage', 'Failed to copy menu item.') });
    }
  };

  // Toggle menu item active status
  const handleToggleActive = async (item: MenuItemType) => {
    try {
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : '';

      const token = getAuthToken();
      const response = await fetch(`/api/menu/product/${item.id}/toggle-active?restaurantId=${restaurantId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        // Update local state
        updateMenuItem({ ...item, is_active: data.data.is_active });
      } else {
        setInfoModal({ open: true, title: t('menu:menuManagement.toggleFailedTitle', 'Update Failed'), message: data.error || t('menu:menuManagement.toggleFailedMessage', 'Failed to toggle menu item status.') });
      }
    } catch (error) {
      console.error('Error toggling menu item status:', error);
      setInfoModal({ open: true, title: t('menu:menuManagement.toggleFailedTitle', 'Update Failed'), message: t('menu:menuManagement.toggleFailedMessage', 'Failed to toggle menu item status.') });
    }
  };

  // 메뉴 순서 재정렬 (위/아래) — 'custom' 정렬 + 특정 카테고리 + 검색 없음일 때만 노출.
  // 현재 카테고리의 표시 순서를 1..N 으로 저장 → 모바일/POS 메뉴에 반영.
  const reorderInFlight = useRef(false);
  const handleMoveItem = async (item: MenuItemType, dir: 'up' | 'down') => {
    if (reorderInFlight.current) return;
    // 현재 카테고리 아이템을 custom 순서로
    const catItems = sortItems(
      menuItems.filter(m => m.category === selectedCategory)
        .map((it: any) => ({ ...it, createdAt: it.createdAt || it.created_at })),
      'custom'
    );
    const idx = catItems.findIndex(m => m.id === item.id);
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (idx < 0 || swapIdx < 0 || swapIdx >= catItems.length) return;
    const reordered = [...catItems];
    [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];
    const order = reordered.map(m => Number(m.id)).filter(n => !Number.isNaN(n));

    const pathParts = window.location.pathname.split('/');
    const ri = pathParts.indexOf('restaurant');
    const restaurantId = ri >= 0 ? pathParts[ri + 1] : '';
    reorderInFlight.current = true;
    // 낙관적 로컬 반영
    reordered.forEach((m, i) => updateMenuItem({ ...(m as any), display_order: i + 1 }));
    try {
      const token = getAuthToken();
      const res = await fetch('/api/menu/products/reorder', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurant_id: restaurantId, order })
      });
      if (!res.ok) { await reloadMenu(); }
    } catch {
      await reloadMenu();
    } finally {
      reorderInFlight.current = false;
    }
  };

  const handleSaveNew = () => {
    if (!formData.category) return;
    const newItem: MenuItemType = {
      id: `item-${Date.now()}`,
      code: formData.code || '',
      name: formData.name || '',
      price: formData.price || 0,
      current_stock: !formData.recipe_id ? (Number(formData.current_stock) || 0) : 0,
      // 저재고 알림은 min_stock>0 인 품목만 뜬다 — 이 칸이 없어서 메뉴로 만든 프로덕트는
      // 알림을 받을 방법이 아예 없었다(2026-09-02 P3).
      min_stock: !formData.recipe_id ? (Number(formData.min_stock) || 0) : 0,
      stock_unit: formData.stock_unit || null,
      category: formData.category,
      emoji: formData.emoji || '🍽️',
      description: formData.description,
      image: formData.image,
      optionGroups: selectedOptionGroups,
      soldOut: false,
      is_set_menu: false,
      is_featured: formData.is_featured || false,
      after_meal: formData.after_meal || false,
      set_only: formData.set_only || false,
      set_items: [],
      set_display_order: 0,
      recipe_id: formData.recipe_id || null,
      takeaway_charge: formData.takeaway_charge ?? 0,
      availability: formData.availability ?? null,
      // 레시피 또는 재고아이템, 둘 중 하나만 보낸다 (서버가 둘 다 오면 400 LINK_EXCLUSIVE).
      ingredient_id: formData.recipe_id ? null : (formData.ingredient_id || null)
    } as any;

    (async () => {
      const created = await addMenuItem(newItem);
      // #11c 크로스셀 — 신규 상품 생성 직후, 선택한 추천 상품을 그 새 id 로 저장.
      const newId = created && (created as any).id;
      if (newId && selectedRecommendations.length > 0) {
        try {
          const restaurantId = getRestaurantIdFromPath();
          if (restaurantId) {
            const token = getAuthToken();
            await fetch(`/api/restaurants/${restaurantId}/products/${newId}/recommendations`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
              body: JSON.stringify({ recommended_ids: selectedRecommendations.map(Number).filter(n => Number.isFinite(n)) })
            });
          }
        } catch { /* 추천 저장 실패는 상품 등록을 막지 않음 */ }
      }
    })();
    setSelectedRecommendations([]);
    setLockedRecommendations([]);
    setShowAddModal(false);
  };

  const handleSaveSetMenu = () => {
    setSetMenuError('');
    // 슬롯 이름은 선택 — 안 적으면 빈 값으로 저장(주문 화면이 "Choose" + 개수 힌트로 표시).
    // 억지 generic 이름("Choice 1") 금지. 적은 라벨만 trim 해서 유지.
    const cleanGroups = setGroups.map(g => ({ ...g, label: (g.label || '').trim() }));
    // set_groups 검증 (택1 min/max, 활성 단품, 세트 중첩 금지 — 슬롯명은 검증 안 함)
    const validProductIds = new Set(menuItems.filter(m => !m.is_set_menu).map(m => Number(m.id)));
    const { valid, errors } = validateSetGroups(cleanGroups, validProductIds, t);
    if (!valid) {
      setSetMenuError(errors[0]);
      return;
    }

    if (!formData.category) { setSetMenuError(t('menu:menuManagementPage.categoryRequired', { defaultValue: 'Please select a category.' })); return; }
    const newSetMenu: any = {
      id: editingItem?.id || `item-${Date.now()}`,
      code: formData.code || '',
      name: formData.name || '',
      price: formData.price || 0,
      current_stock: !formData.recipe_id ? (Number(formData.current_stock) || 0) : 0,
      // 저재고 알림은 min_stock>0 인 품목만 뜬다 — 이 칸이 없어서 메뉴로 만든 프로덕트는
      // 알림을 받을 방법이 아예 없었다(2026-09-02 P3).
      min_stock: !formData.recipe_id ? (Number(formData.min_stock) || 0) : 0,
      stock_unit: formData.stock_unit || null,
      category: formData.category,
      emoji: formData.emoji || '🍽️',
      description: formData.description,
      image: formData.image,
      optionGroups: selectedOptionGroups,
      soldOut: false,
      is_set_menu: true,
      set_only: false,  // 세트 자체는 세트전용 단품이 될 수 없음
      set_groups: cleanGroups,
      set_items: null,  // v2 로 전환 — set_groups 가 단일 소스
      set_display_order: formData.set_display_order || 0,
      after_meal: formData.after_meal || false,
      takeaway_charge: formData.takeaway_charge ?? 0,
      availability: formData.availability ?? null
    };

    // 저장 결과를 기다리고 실패 시 실제 사유를 표시 — 무음 실패(모달만 닫힘) 방지.
    (async () => {
      try {
        let savedSetId: any = editingItem?.id;
        if (editingItem) {
          await updateMenuItem(newSetMenu);
        } else {
          const created = await addMenuItem(newSetMenu);
          savedSetId = created && (created as any).id;
        }
        // #11c 크로스셀 — 세트메뉴도 "함께 추천할 상품" 저장(신규=생성 id, 편집=기존 id).
        if (savedSetId) {
          try {
            const restaurantId = getRestaurantIdFromPath();
            if (restaurantId) {
              const token = getAuthToken();
              await fetch(`/api/restaurants/${restaurantId}/products/${savedSetId}/recommendations`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
                body: JSON.stringify({ recommended_ids: selectedRecommendations.map(Number).filter(n => Number.isFinite(n)) })
              });
            }
          } catch { /* 추천 저장 실패는 세트 저장을 막지 않음 */ }
        }
        setShowSetMenuModal(false);
        setEditingItem(null);
        setSetMenuItems([]);
        setSetGroups([]);
        setSelectedRecommendations([]);
        setLockedRecommendations([]);
        setSetMenuError('');
      } catch (err: any) {
        // 백엔드가 친절한 문구를 주지만, 혹시 날 메시지가 와도 SQL/FK 흔적은 가린다.
        let msg = err?.message || t('menu:menuManagementPage.saveFailed', { defaultValue: 'Could not save. Please try again.' });
        if (/foreign key|constraint|SQL|Sequelize/i.test(msg)) {
          msg = t('menu:menuManagementPage.saveFailed', { defaultValue: 'Could not save. Please try again.' });
        }
        setSetMenuError(msg);
      }
    })();
  };

  const handleSaveEdit = async () => {
    if (editingItem) {
      const editingId = editingItem.id;
      const updatedItem = {
        ...editingItem,
        ...formData,
        optionGroups: selectedOptionGroups,
        // 레시피 또는 재고아이템, 둘 중 하나만 보낸다 (서버가 둘 다 오면 400 LINK_EXCLUSIVE).
        ingredient_id: formData.recipe_id ? null : (formData.ingredient_id || null)
      } as any;
      // 2026-06-28 (1-4): 저장 실패(예: 브랜드 잠금 필드 변경 시 백엔드 400)를 사용자에게 표시.
      // 이전엔 updateMenuItem 의 throw 가 모달만 멈추고 안내가 없어 "저장이 안 된다"로 보였다.
      try {
        await updateMenuItem(updatedItem);
      } catch (e: any) {
        setInfoModal({
          open: true,
          title: t('menu:menuManagementPage.saveFailedTitle', { defaultValue: 'Could not save' }),
          message: e?.message || t('menu:menuManagementPage.saveFailedMessage', { defaultValue: 'Failed to save menu item.' })
        });
        return;
      }
      // #11c 크로스셀 — 매장분 추천(origin='restaurant')만 교체. 브랜드 잠금분은 백엔드가 보존.
      try {
        const restaurantId = getRestaurantIdFromPath();
        if (restaurantId) {
          const token = getAuthToken();
          await fetch(`/api/restaurants/${restaurantId}/products/${editingId}/recommendations`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
            body: JSON.stringify({ recommended_ids: selectedRecommendations.map(Number).filter(n => Number.isFinite(n)) })
          });
        }
      } catch {
        /* 추천 저장 실패는 상품 저장을 막지 않음 */
      }
        setSelectedRecommendations([]);
      setLockedRecommendations([]);
      setShowEditModal(false);
      setEditingItem(null);
    }
  };

  // Removed: Using ImageUploadDropzone component instead

  const handleOptionGroupToggle = (groupId: string) => {
    if (selectedOptionGroups.includes(groupId)) {
      // 선택 해제 - 배열에서 제거
      setSelectedOptionGroups(selectedOptionGroups.filter(id => id !== groupId));
    } else {
      // 선택 - 배열 끝에 추가 (순서 유지)
      setSelectedOptionGroups([...selectedOptionGroups, groupId]);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>{t('menu:menuManagementPage.menu')}</HeaderTitle>
          <HeaderActions>
            <UIButton variant="secondary" onClick={handleAddSetMenu}>{t('menu:menuManagementPage.createSetMenu')}</UIButton>
            <UIButton variant="primary" onClick={handleAddItem}>{t('menu:menuManagementPage.addNewItem')}</UIButton>
          </HeaderActions>
        </Header>

        <Content>
          {menuItems.some(m => m.brand_menu_id) && (() => {
            const brandPendingCount = menuItems.filter(m => m.brand_menu_id && m.brand_menu_status === 'pending_update').length;
            const restaurantId = window.location.pathname.split('/')[2];
            return (
              <BrandMenuHelper>
                <HelperIco><Info /></HelperIco>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <HelperTtl>{t('menu:menuManagementPage.brandHelperTitle', 'Some menus come from your brand')}</HelperTtl>
                  <HelperBody>
                    {t('menu:menuManagementPage.brandHelperLine1', 'Look for the')} <strong>BRAND</strong> {t('menu:menuManagementPage.brandHelperLine1b', 'tag on a card — those are pushed from your brand. A')} <LockIcon className="inline-lock" /> {t('menu:menuManagementPage.brandHelperLine1c', 'icon shows fields that are locked by the brand and cannot be edited here.')}
                    <br />
                    {t('menu:menuManagementPage.brandHelperLine2', 'You can still freely add your own restaurant-only menus with the')} <strong>{t('menu:menuManagementPage.addNewItem', '+ Add New Item')}</strong> {t('menu:menuManagementPage.brandHelperLine2b', 'button — non-brand menus have no tag and are fully editable.')}
                  </HelperBody>
                  {brandPendingCount > 0 && (
                    <HelperLnk type="button" onClick={() => navigate(`/restaurant/${restaurantId}/brand-menu-updates`)}>
                      {t('menu:menuManagementPage.brandHelperPendingLink', { count: brandPendingCount, defaultValue: `${brandPendingCount} brand updates waiting — review` })} <ArrowRight />
                    </HelperLnk>
                  )}
                </div>
              </BrandMenuHelper>
            );
          })()}
          <SearchSection>
            <SearchInputContainer>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search menu items by name, description, price, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <ClearSearchBtn
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ×
                </ClearSearchBtn>
              )}
            </SearchInputContainer>
            <SortDropdown value={sortKey} onChange={setSortKey} options={['custom', 'newest', 'oldest', 'name_asc', 'name_desc', 'price_asc', 'price_desc', 'category']} />
          </SearchSection>

          {searchQuery && filteredItems.length > 0 && (
            <SearchResultInfo>
              <span>Found {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} matching "{searchQuery}"</span>
              <UIButton variant="secondary" onClick={() => setSearchQuery('')}>{t('menu:menuManagementPage.clearSearch')}</UIButton>
            </SearchResultInfo>
          )}

          <TabContainer>
            <Tab
              active={selectedCategory === 'all'}
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              All Items ({menuItems.length})
            </Tab>
            {categories.map(category => (
              <Tab
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSearchQuery('');
                }}
              >
                {category.emoji} {category.name}
              </Tab>
            ))}
          </TabContainer>

          {/* 빠진 값 요약 — 숫자만 보여주고 누르면 그것만 걸러 본다.
              한 줄이라 목록을 밀어내지 않고, 0 이면 아예 나타나지 않는다. */}
          {(() => {
            const noPrice = filteredItems.filter(i => !i.price || Number(i.price) === 0).length;
            const noCost = filteredItems.filter(i => !i.recipe_id).length;
            if (!noPrice && !noCost) return null;
            return (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
                margin: '0 0 12px', padding: '10px 14px', borderRadius: '8px',
                background: '#F9FAFB', border: '1px solid #E5E7EB', fontSize: '13px', color: '#4B5563'
              }}>
                <span>{t('menu:badges.missingSummary', { defaultValue: 'Missing information' })}</span>
                {noPrice > 0 && (
                  <button
                    type="button"
                    onClick={() => setMissingFilter(missingFilter === 'price' ? 'none' : 'price')}
                    style={{
                      border: missingFilter === 'price' ? '1px solid #DC2626' : '1px solid #E5E7EB',
                      background: missingFilter === 'price' ? '#FEE2E2' : '#FFFFFF',
                      color: '#B91C1C', borderRadius: '999px', padding: '3px 10px',
                      fontSize: '12px', fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    {t('menu:badges.noPrice', { defaultValue: 'No price' })} {noPrice}
                  </button>
                )}
                {noCost > 0 && (
                  <button
                    type="button"
                    onClick={() => setMissingFilter(missingFilter === 'cost' ? 'none' : 'cost')}
                    style={{
                      border: missingFilter === 'cost' ? '1px solid #635BFF' : '1px solid #E5E7EB',
                      background: missingFilter === 'cost' ? '#EEF2FF' : '#FFFFFF',
                      color: '#4B5563', borderRadius: '999px', padding: '3px 10px',
                      fontSize: '12px', fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    {t('menu:badges.noCost', { defaultValue: 'Cost not set' })} {noCost}
                  </button>
                )}
              </div>
            );
          })()}

          {searchQuery && filteredItems.length === 0 ? (
            <NoResultsMessage>
              <div className="icon">🔍</div>
              <div className="title">
                No results for "{searchQuery}"
              </div>
              <div className="message">
                Try searching with different keywords or check the spelling
              </div>
            </NoResultsMessage>
          ) : (
            <MenuGrid>
              {(useProgressive ? visibleItems.slice(0, visibleCount) : visibleItems).map(item => (
              <MenuCard key={item.id} soldOut={item.soldOut} inactive={item.is_active === false}>
                <MenuImage>
                  {item.is_set_menu && <SetBadge>{t('menu:menuManagementPage.set')}</SetBadge>}
                  {(item as any).set_only && <SetBadge style={{ background: '#7C3AED' }}>{t('menu:menuManagementPage.setOnlyBadge', { defaultValue: 'SET ONLY' })}</SetBadge>}
                  {item.is_featured && <SetBadge style={{ background: '#635BFF', left: item.is_set_menu ? '52px' : '8px' }}>{t('menu:menuManagementPage.featured')}</SetBadge>}
                  {item.brand_menu_id && (() => {
                    const locks = item.brand_menu_locks_snapshot || {};
                    const lockCount = Object.values(locks).filter(Boolean).length;
                    const pending = item.brand_menu_status === 'pending_update';
                    return (
                      <BrandLinkedBadge title={pending ? t('menu:menuManagementPage.brandPendingUpdate', 'Brand update available') : t('menu:menuManagementPage.brandLinked', 'Linked to Brand Menu')}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        BRAND{lockCount > 0 ? ` ${lockCount}` : ''}
                        {pending && <PendingDot />}
                      </BrandLinkedBadge>
                    );
                  })()}
                  <MenuItemImageWithFallback src={item.image} alt={item.name} emoji={item.emoji} />
                </MenuImage>
                <MenuContent>
                  <MenuCategory>
                    {categories.find(c => c.id === item.category)?.name}
                  </MenuCategory>
                  <MenuHeader>
                    <MenuName>{item.code ? `${item.code} ` : ''}{item.name}</MenuName>
                    <MenuPrice>{formatCurrency(item.price, selectedCurrency)}</MenuPrice>
                  </MenuHeader>
                  {/* 빠진 값 표시 — 판매가는 빠뜨린 것(빨강), 원가는 아직 안 이은 것(회색).
                      원가를 경고색으로 두면 전 상품이 붉어져 진짜 문제가 묻힌다
                      (운영 실측: 754개 중 원가 근거 있는 것 0개). */}
                  {/* 연결 표시 — 브랜드 프로덕트 목록(BrandProductsTab)과 **같은 UI**여야 한다 (Irene 2026-09-04).
                      규칙: 메뉴 = 재고아이템(direct) 또는 메뉴 = 레시피 = 재고아이템. 둘 중 하나.
                      판정은 컬럼으로 한다 — `ingredient_id` 가 있으면 재고아이템 다이렉트,
                      `recipe_id` 가 있으면 레시피, 둘 다 없으면 미연결(브랜드 쪽과 동일한 판정).
                      미연결은 회색이 아니라 주황 — 팔려도 재고가 안 빠지는 상태라 골라낼 수 있어야 한다. */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {(!item.price || Number(item.price) === 0) && (
                      <StatusBadge status="error" size="small">
                        {t('menu:badges.noPrice', { defaultValue: 'No price' })}
                      </StatusBadge>
                    )}
                    {(item as any).ingredient_id ? (
                      <StatusBadge status="success" size="small">
                        {t('common:link.stockItemDirect', { defaultValue: 'Stock Item (direct)' })}
                        {ingredients.find(i => i.id === (item as any).ingredient_id)?.name
                          ? `: ${ingredients.find(i => i.id === (item as any).ingredient_id)?.name}` : ''}
                      </StatusBadge>
                    ) : item.recipe_id ? (
                      <StatusBadge status="success" size="small">
                        {`${t('common:link.recipe', { defaultValue: 'Recipe' })}: ${recipes.find(r => r.id === item.recipe_id)?.name || item.recipe_id}`}
                      </StatusBadge>
                    ) : (
                      <StatusBadge status="warning" size="small">{t('common:link.notLinked', { defaultValue: 'Not linked' })}</StatusBadge>
                    )}
                  </div>
                  <MenuDescription>
                    {item.description || 'No description available'}
                  </MenuDescription>
                  {item.is_set_menu && (() => {
                    // set_groups(v2) 우선, 레거시 set_items 폴백. product_id 없는 옛 데이터는 이름으로 폴백(크래시 방지).
                    const groups = resolveSetGroups(item);
                    const names = groups.flatMap(g => (g.items || []).map(it => {
                      const mi = menuItems.find(m => String(m.id) === String(it.product_id));
                      return mi ? `${mi.code ? `${mi.code} ` : ''}${mi.name}` : null;
                    })).filter(Boolean) as string[];
                    if (names.length === 0 && Array.isArray(item.set_items)) {
                      item.set_items.forEach((si: any) => { if (si && si.name) names.push(si.name); });
                    }
                    if (names.length === 0) return null;
                    return (
                      <MenuDescription style={{ fontSize: '11px', color: '#667eea', fontWeight: 500 }}>
                        {t('menu:setBuilder.setIncludes', { defaultValue: 'Set includes' })}: {names.join(', ')}
                      </MenuDescription>
                    );
                  })()}
                  {item.optionGroups && item.optionGroups.length > 0 && (
                    <MenuDescription style={{ fontSize: '11px', color: '#8898AA' }}>
                      Option Groups: {item.optionGroups.map(groupId =>
                        optionGroups.find(g => g.id === groupId)?.name
                      ).filter(Boolean).join(', ')}
                    </MenuDescription>
                  )}
                  {/* 위 배지가 연결 상태를 말하므로, 여기는 **레시피로 이동**하는 용도만 남긴다. */}
                  {item.recipe_id && (() => {
                    const linkedRecipe = recipes.find(r => r.id === item.recipe_id);
                    if (linkedRecipe) {
                      return (
                        <RecipeLink
                          onClick={(e) => {
                            e.stopPropagation();
                            const pathParts = window.location.pathname.split('/');
                            const restaurantIndex = pathParts.indexOf('restaurant');
                            const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : '';
                            navigate(`/restaurant/${restaurantId}/recipe-management?search=${encodeURIComponent(linkedRecipe.name)}`);
                          }}
                        >
                          Recipe: {linkedRecipe.name}
                        </RecipeLink>
                      );
                    }
                    return null;
                  })()}
                  {/* 브랜드에서 푸시된 메뉴는 비활성으로 도착 → 활성화해야 모바일 노출됨을 명확히 안내 */}
                  {item.brand_menu_id && item.is_active === false && (
                    <div style={{ marginTop: 8, padding: '8px 10px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11.5px', color: '#9A3412', fontWeight: 500, flex: 1, minWidth: 150 }}>
                        {t('menu:menuManagementPage.brandPushedInactive', { defaultValue: 'Pushed from Brand · inactive — activate to show it on the customer mobile menu.' })}
                      </span>
                      <ActionButton onClick={(e: any) => { e.stopPropagation(); handleToggleActive(item); }} style={{ padding: '6px 12px', fontSize: '12px' }}>
                        {t('menu:menuManagementPage.activate', { defaultValue: 'Activate' })}
                      </ActionButton>
                    </div>
                  )}
                  <MenuActions>
                    {/* 메뉴 순서 재정렬 — 'Menu order(manual)' 정렬 + 특정 카테고리 + 검색 없음일 때만 */}
                    {sortKey === 'custom' && selectedCategory !== 'all' && !searchQuery.trim() && (
                      <>
                        <IconButton onClick={() => handleMoveItem(item, 'up')} title={t('menu:menuManagementPage.moveUp', { defaultValue: 'Move up' })}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                        </IconButton>
                        <IconButton onClick={() => handleMoveItem(item, 'down')} title={t('menu:menuManagementPage.moveDown', { defaultValue: 'Move down' })}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </IconButton>
                      </>
                    )}
                    {(() => {
                      const locks = item.brand_menu_locks_snapshot || {};
                      const lockedKeys = Object.keys(locks).filter(k => locks[k]);
                      // Fully locked = all editable fields are locked. Show "View" so staff
                      // know it's read-only (instead of clicking Edit and finding everything disabled).
                      const fullyLocked = !!item.brand_menu_id && lockedKeys.length >= 4;
                      return (
                        <ActionButton onClick={() => handleEditItem(item)}>
                          {fullyLocked ? (t('common:button.view', 'View') as string) : 'Edit'}
                        </ActionButton>
                      );
                    })()}
                    <IconButton onClick={() => handleCopyItem(item)} title="Copy">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </IconButton>
                    <IconButton
                      onClick={() => handleToggleActive(item)}
                      inactive={item.is_active === false}
                      title={item.is_active === false ? 'Activate' : 'Deactivate'}
                    >
                      {item.is_active === false ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </IconButton>
                    <IconButton
                      onClick={() => toggleItemSoldOut(item.id)}
                      warning={item.soldOut}
                      title={item.soldOut ? 'Mark In Stock' : 'Mark Sold Out'}
                    >
                      {item.soldOut ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                    </IconButton>
                    <IconButton danger onClick={() => handleDeleteItem(item.id)} title="Delete">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </IconButton>
                  </MenuActions>
                </MenuContent>
              </MenuCard>
            ))}

            <AddCard onClick={handleAddItem}>
              <AddIcon>+</AddIcon>
              <AddText>{t('menu:menuManagementPage.addNewMenuItem')}</AddText>
            </AddCard>

            {/* Progressive loading trigger - only show when using progressive rendering */}
            {useProgressive && visibleCount < filteredItems.length && (
              <div ref={loadMoreTriggerRef} style={{ gridColumn: '1 / -1', height: '20px' }} />
            )}
          </MenuGrid>
          )}
        </Content>

        {/* Add Item Modal */}
        <UIModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Menu Item"
          size="medium"
          footer={
            <>
              <UIButton variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </UIButton>
              <UIButton variant="primary" onClick={handleSaveNew} disabled={!formData.name || !formData.category}>
                Add Item
              </UIButton>
            </>
          }
        >
          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.itemCode')}</FormLabel>
            <FormInput
              type="text"
              value={formData.code || ''}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g., A01, B02 (optional)"
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Item Name *</FormLabel>
            <FormInput
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Chicken Rice"
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Price (RM) *</FormLabel>
            <FormInput
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              onFocus={(e) => {
                if (parseFloat(e.target.value) === 0) {
                  e.target.select();
                }
              }}
              step="0.01"
              min="0"
            />
          </UIFormGroup>

          {/* 레시피 없는 상품의 자체 재고 — 캔음료·병맥주·포장재처럼 그대로 파는 물건.
              레시피를 연결하면 재료가 빠지므로 이 칸은 나타나지 않는다(둘 중 하나다).
              2026-09-01(Q5): 켜고 끄는 체크박스를 없앴다 — 스위치가 꺼져 있으면 팔려도
              재고가 안 빠졌고, 그게 결함의 직접 원인이었다. 레시피가 없으면 항상 이 수량이 재고다. */}
          {!formData.recipe_id && (
            <UIFormGroup>
              <FormLabel>{t('menu:menuManagementPage.trackStock', 'Stock for this item')}</FormLabel>
              <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '8px' }}>
                {t('menu:menuManagementPage.trackStockHelp', 'Sold as-is (no recipe) — this item itself is the stock')}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <FormInput
                  type="number"
                  value={formData.current_stock ?? 0}
                  onChange={(e) => setFormData({ ...formData, current_stock: parseFloat(e.target.value) || 0 })}
                  onFocus={(e) => { if (parseFloat(e.target.value) === 0) e.target.select(); }}
                  step="1"
                  min="0"
                  placeholder={t('menu:menuManagementPage.currentStock', 'Current stock') as string}
                />
                <FormInput
                  type="text"
                  value={formData.stock_unit || ''}
                  onChange={(e) => setFormData({ ...formData, stock_unit: e.target.value })}
                  placeholder={t('menu:menuManagementPage.stockUnit', 'Unit (e.g. can, bottle)') as string}
                />
                <FormInput
                  type="number"
                  value={formData.min_stock ?? 0}
                  onChange={(e) => setFormData({ ...formData, min_stock: parseFloat(e.target.value) || 0 })}
                  onFocus={(e) => { if (parseFloat(e.target.value) === 0) e.target.select(); }}
                  step="1"
                  min="0"
                  placeholder={t('menu:menuManagementPage.minStock', 'Low-stock alert at') as string}
                />
              </div>
            </UIFormGroup>
          )}

          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.takeawayPackagingFee', 'Takeaway Packaging Fee (RM)')}</FormLabel>
            <FormInput
              type="number"
              value={formData.takeaway_charge ?? 0}
              onChange={(e) => setFormData({ ...formData, takeaway_charge: parseFloat(e.target.value) || 0 })}
              onFocus={(e) => {
                if (parseFloat(e.target.value) === 0) {
                  e.target.select();
                }
              }}
              step="0.10"
              min="0"
            />
            <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
              {t('menu:menuManagementPage.takeawayPackagingFeeHelp', 'Only applied when takeaway pricing is set to "Per Menu Item (set individually)". Leave at 0 if no packaging fee.')}
            </div>
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Category *</FormLabel>
            <FormSelect
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">-- Select Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </FormSelect>
          </UIFormGroup>

          <UIFormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.is_featured || false}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} />
              <span style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>{t('menu:menuManagementPage.featuredItem')}</span>
              <span style={{ fontSize: '12px', color: '#4B5563' }}>{t('menu:menuManagementPage.showInMobileFeaturedTab')}</span>
            </label>
          </UIFormGroup>

          <UIFormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.after_meal || false}
                onChange={(e) => setFormData({ ...formData, after_meal: e.target.checked })} />
              <span style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>{t('menu:menuManagementPage.afterMeal', { defaultValue: 'After meal' })}</span>
              <span style={{ fontSize: '12px', color: '#4B5563' }}>{t('menu:menuManagementPage.afterMealHint', { defaultValue: 'Serve after the main course (e.g. dessert)' })}</span>
            </label>
          </UIFormGroup>

          {!formData.is_set_menu && (
          <UIFormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={(formData as any).set_only || false}
                onChange={(e) => setFormData({ ...formData, set_only: e.target.checked } as any)} />
              <span style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>{t('menu:menuManagementPage.setOnly', { defaultValue: 'Set menu use only' })}</span>
              <span style={{ fontSize: '12px', color: '#4B5563' }}>{t('menu:menuManagementPage.setOnlyHint', { defaultValue: 'Not sold separately — hidden from POS & mobile ordering, still available inside set menus and kitchen station routing' })}</span>
            </label>
          </UIFormGroup>
          )}

          <UIFormGroup>
            <ItemScheduleEditor
              value={formData.availability as any}
              onChange={(v) => setFormData({ ...formData, availability: v as any })}
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.emojiIcon')}</FormLabel>
            <EmojiPicker>
              {emojiOptions['other'].map((emoji: string) => (
                <EmojiOption
                  key={emoji}
                  selected={formData.emoji === emoji}
                  onClick={() => setFormData({ ...formData, emoji })}
                >
                  {emoji}
                </EmojiOption>
              ))}
            </EmojiPicker>
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.description')}</FormLabel>
            <FormTextArea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the item..."
            />
          </UIFormGroup>

          {/* 2026-06-28 (1-4): 브랜드가 이미지를 잠근 메뉴는 이미지 편집 불가 — 편집 가능한 것처럼
              보이나 저장이 안 되던 혼동 수정. 잠금 시 읽기전용 미리보기 + 안내(name/price/category 와
              동일 정책). 신규 추가 모달은 editingItem 이 없어 항상 업로드(else)로 동작. */}
          {editingItem?.brand_menu_locks_snapshot?.image ? (
            <UIFormGroup>
              <FormLabel>{t('menu:menuManagementPage.menuItemImage', { defaultValue: 'Menu Item Image' })} · {t('menu:menuManagementPage.brandLockedTag', { defaultValue: 'Brand-locked' })}</FormLabel>
              {formData.image ? (
                <img src={formData.image} alt="" style={{ maxHeight: 120, borderRadius: 8, border: '1px solid #E6EBF1', objectFit: 'contain', background: '#F9FAFB' }} />
              ) : (
                <div style={{ fontSize: 13, color: '#6B7C93', padding: '16px', background: '#F9FAFB', borderRadius: 8, textAlign: 'center' }}>—</div>
              )}
              <div style={{ fontSize: '12px', color: '#6B7C93', marginTop: '4px' }}>
                {t('menu:menuManagementPage.brandLockedImageHint', { defaultValue: 'Image is set by the brand and cannot be changed here.' })}
              </div>
            </UIFormGroup>
          ) : (
            <ImageUploadDropzone
              value={formData.image || ''}
              onChange={(base64) => setFormData({ ...formData, image: base64 })}
              label="Menu Item Image"
              helpText="Upload an image for this menu item (PNG, JPG, GIF — phone photos OK, auto-compressed)"
              showRemoveButton={true}
            />
          )}

          <UIFormGroup style={{ marginTop: '24px' }}>
            <FormLabel>{t('menu:menuManagementPage.linkedRecipe')}</FormLabel>
            <SearchableSelect
              options={recipes.map(recipe => ({
                value: recipe.id,
                label: recipe.name,
                subLabel: `Cost: RM ${Number(recipe.total_ingredient_cost || 0).toFixed(2)}`
              }))}
              value={formData.recipe_id || null}
              onChange={(value) => setFormData({ ...formData, recipe_id: value as number | null })}
              placeholder="Search or select recipe..."
              allowClear={true}
              noOptionsMessage="No recipes found"
            />
          </UIFormGroup>

          {/* 재고아이템 다이렉트 — 메뉴 = 재고아이템 (docs/TRADE_STRUCTURE.md §2-1).
              재료 **하나**를 그대로 가리킨다. 수량 칸도, 줄 추가도, 합계도 없다 — "그대로"라서 1:1 이고,
              환산을 넣는 순간 그게 레시피가 된다(Irene 2026-09-04).
              레시피와 상호 배타: 한쪽을 고르면 다른 쪽은 비운다. 브랜드 프로덕트 화면과 같은 UI. */}
          {!formData.recipe_id && (
            <UIFormGroup>
              <FormLabel>{t('common:link.stockItemDirect', { defaultValue: 'Stock Item (direct)' })}</FormLabel>
              <SearchableSelect
                options={ingredients.map(ing => ({
                  value: ing.id,
                  label: ing.name,
                  subLabel: `${ing.unit} / RM ${Number(ing.unit_cost || 0).toFixed(2)}`
                }))}
                value={formData.ingredient_id || null}
                onChange={(value) => setFormData({
                  ...formData,
                  ingredient_id: (value as number) || null,
                  recipe_id: null
                })}
                placeholder="Search or select stock item..."
                allowClear={true}
                noOptionsMessage="No stock items available"
              />
              {formData.ingredient_id && (() => {
                const si = ingredients.find(i => i.id === formData.ingredient_id);
                if (!si) return null;
                return (
                  <div style={{ marginTop: '6px', fontSize: '12.5px', color: '#4B5563' }}>
                    1 {si.unit} · RM {Number(si.unit_cost || 0).toFixed(2)}
                  </div>
                );
              })()}
            </UIFormGroup>
          )}

          <OptionGroupSectionTitle>
            <UIFormGroup>
              <FormLabel>Option Groups {selectedOptionGroups.length > 0 && `(${selectedOptionGroups.length} selected)`}</FormLabel>

              <OptionGroupSelect
                value=""
                onChange={(e) => {
                  if (e.target.value && !selectedOptionGroups.includes(e.target.value)) {
                    setSelectedOptionGroups([...selectedOptionGroups, e.target.value]);
                  }
                }}
              >
                <option value="">{t('menu:menuManagementPage.selectOptionGroupToAdd')}</option>
                {optionGroups
                  .filter(group => !selectedOptionGroups.includes(group.id))
                  .map(group => (
                    <option key={group.id} value={group.id}>
                      {group.name} ({group.required ? 'Required' : 'Optional'}, {group.multiple ? 'Multi' : 'Single'})
                    </option>
                  ))}
              </OptionGroupSelect>

              <SelectedChipsContainer>
                {selectedOptionGroups.map((groupId, index) => {
                  const group = optionGroups.find(g => g.id === groupId);
                  if (!group) return null;
                  return (
                    <OptionGroupChip key={groupId}>
                      <ChipOrderBadge>{index + 1}</ChipOrderBadge>
                      <ChipName>{group.name}</ChipName>
                      <ChipBadge type={group.required ? 'required' : 'optional'}>
                        {group.required ? 'Required' : 'Optional'}
                      </ChipBadge>
                      <ChipRemoveButton
                        onClick={() => setSelectedOptionGroups(selectedOptionGroups.filter(id => id !== groupId))}
                        title="Remove"
                      >
                        ×
                      </ChipRemoveButton>
                    </OptionGroupChip>
                  );
                })}
              </SelectedChipsContainer>
            </UIFormGroup>
          </OptionGroupSectionTitle>

          {/* #11c 크로스셀 — 신규 상품에도 "함께 추천할 상품"(저장 시 새 상품 id 로 연결) */}
          <OptionGroupSectionTitle>
            <UIFormGroup>
              <FormLabel>
                {t('menu:menuManagementPage.crossSell.title', { defaultValue: 'Recommend with this item' })}
                {selectedRecommendations.length > 0 && ` (${selectedRecommendations.length})`}
              </FormLabel>
              <div style={{ fontSize: '12px', color: '#6B7280', margin: '-4px 0 8px' }}>
                {t('menu:menuManagementPage.crossSell.hint', { defaultValue: 'Shown to customers as add-ons right after they add this item to the cart. Leave empty to auto-suggest from dessert/drink categories.' })}
              </div>
              <OptionGroupSelect
                value=""
                onChange={(e) => {
                  if (e.target.value && !selectedRecommendations.includes(e.target.value)) {
                    setSelectedRecommendations([...selectedRecommendations, e.target.value]);
                  }
                }}
              >
                <option value="">{t('menu:menuManagementPage.crossSell.addPlaceholder', { defaultValue: 'Select a product to recommend...' })}</option>
                {menuItems
                  .filter(m => !m.is_set_menu && (m as any).is_active !== false && !selectedRecommendations.includes(String(m.id)))
                  .map(m => (
                    <option key={m.id} value={m.id}>{m.code ? `${m.code} ` : ''}{m.name}</option>
                  ))}
              </OptionGroupSelect>
              <SelectedChipsContainer>
                {selectedRecommendations.map((recId, index) => {
                  const prod = menuItems.find(m => String(m.id) === String(recId));
                  return (
                    <OptionGroupChip key={recId}>
                      <ChipOrderBadge>{index + 1}</ChipOrderBadge>
                      <ChipName>{prod ? prod.name : `#${recId}`}</ChipName>
                      <ChipRemoveButton
                        onClick={() => setSelectedRecommendations(selectedRecommendations.filter(id => id !== recId))}
                        title={t('menu:menuManagementPage.crossSell.remove', { defaultValue: 'Remove' })}
                      >
                        ×
                      </ChipRemoveButton>
                    </OptionGroupChip>
                  );
                })}
              </SelectedChipsContainer>
            </UIFormGroup>
          </OptionGroupSectionTitle>
        </UIModal>

        {/* Edit Item Modal */}
        <UIModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Menu Item"
          size="medium"
          footer={
            <>
              <UIButton variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </UIButton>
              <UIButton variant="primary" onClick={handleSaveEdit}>
                Save Changes
              </UIButton>
            </>
          }
        >
          {editingItem?.brand_menu_id && (() => {
            const locks = editingItem.brand_menu_locks_snapshot || {};
            const lockedList = Object.entries(locks).filter(([, v]) => v).map(([k]) => k);
            return (
              <div style={{ background: '#F4F1FF', border: '1px solid #635BFF', borderRadius: 8, padding: '10px 12px', marginBottom: 12, fontSize: 12, color: '#0A2540', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span><strong>{t('menu:menuManagementPage.brandLinkedTitle', 'Linked to a Brand Menu')}.</strong> {lockedList.length > 0 ? t('menu:menuManagementPage.brandLockedFields', 'Locked fields: {{fields}}', { fields: lockedList.join(', ') }) : t('menu:menuManagementPage.brandNoLocks', 'No fields are locked.')}</span>
              </div>
            );
          })()}
          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.itemCode')}</FormLabel>
            <FormInput
              type="text"
              value={formData.code || ''}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g., A01, B02 (optional)"
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Item Name * {editingItem?.brand_menu_locks_snapshot?.name && <span style={{ color: '#635BFF', fontSize: 11 }}>🔒</span>}</FormLabel>
            <FormInput
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Chicken Rice"
              disabled={!!editingItem?.brand_menu_locks_snapshot?.name}
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Price (RM) * {editingItem?.brand_menu_locks_snapshot?.price && <span style={{ color: '#635BFF', fontSize: 11 }}>🔒</span>}</FormLabel>
            <FormInput
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              onFocus={(e) => {
                if (parseFloat(e.target.value) === 0) {
                  e.target.select();
                }
              }}
              step="0.01"
              min="0"
              disabled={!!editingItem?.brand_menu_locks_snapshot?.price}
            />
          </UIFormGroup>

          {/* 레시피 없는 상품의 자체 재고 — 캔음료·병맥주·포장재처럼 그대로 파는 물건.
              레시피를 연결하면 재료가 빠지므로 이 칸은 나타나지 않는다(둘 중 하나다).
              2026-09-01(Q5): 켜고 끄는 체크박스를 없앴다 — 스위치가 꺼져 있으면 팔려도
              재고가 안 빠졌고, 그게 결함의 직접 원인이었다. 레시피가 없으면 항상 이 수량이 재고다. */}
          {!formData.recipe_id && (
            <UIFormGroup>
              <FormLabel>{t('menu:menuManagementPage.trackStock', 'Stock for this item')}</FormLabel>
              <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '8px' }}>
                {t('menu:menuManagementPage.trackStockHelp', 'Sold as-is (no recipe) — this item itself is the stock')}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <FormInput
                  type="number"
                  value={formData.current_stock ?? 0}
                  onChange={(e) => setFormData({ ...formData, current_stock: parseFloat(e.target.value) || 0 })}
                  onFocus={(e) => { if (parseFloat(e.target.value) === 0) e.target.select(); }}
                  step="1"
                  min="0"
                  placeholder={t('menu:menuManagementPage.currentStock', 'Current stock') as string}
                />
                <FormInput
                  type="text"
                  value={formData.stock_unit || ''}
                  onChange={(e) => setFormData({ ...formData, stock_unit: e.target.value })}
                  placeholder={t('menu:menuManagementPage.stockUnit', 'Unit (e.g. can, bottle)') as string}
                />
                <FormInput
                  type="number"
                  value={formData.min_stock ?? 0}
                  onChange={(e) => setFormData({ ...formData, min_stock: parseFloat(e.target.value) || 0 })}
                  onFocus={(e) => { if (parseFloat(e.target.value) === 0) e.target.select(); }}
                  step="1"
                  min="0"
                  placeholder={t('menu:menuManagementPage.minStock', 'Low-stock alert at') as string}
                />
              </div>
            </UIFormGroup>
          )}

          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.takeawayPackagingFee', 'Takeaway Packaging Fee (RM)')}</FormLabel>
            <FormInput
              type="number"
              value={formData.takeaway_charge ?? 0}
              onChange={(e) => setFormData({ ...formData, takeaway_charge: parseFloat(e.target.value) || 0 })}
              onFocus={(e) => {
                if (parseFloat(e.target.value) === 0) {
                  e.target.select();
                }
              }}
              step="0.10"
              min="0"
            />
            <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
              {t('menu:menuManagementPage.takeawayPackagingFeeHelp', 'Only applied when takeaway pricing is set to "Per Menu Item (set individually)". Leave at 0 if no packaging fee.')}
            </div>
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Category * {editingItem?.brand_menu_locks_snapshot?.category && <span style={{ color: '#635BFF', fontSize: 11 }}>🔒</span>}</FormLabel>
            <FormSelect
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              disabled={!!editingItem?.brand_menu_locks_snapshot?.category}
            >
              <option value="">-- Select Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </FormSelect>
          </UIFormGroup>

          <UIFormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.is_featured || false}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} />
              <span style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>{t('menu:menuManagementPage.featuredItem')}</span>
              <span style={{ fontSize: '12px', color: '#4B5563' }}>{t('menu:menuManagementPage.showInMobileFeaturedTab')}</span>
            </label>
          </UIFormGroup>

          <UIFormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.after_meal || false}
                onChange={(e) => setFormData({ ...formData, after_meal: e.target.checked })} />
              <span style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>{t('menu:menuManagementPage.afterMeal', { defaultValue: 'After meal' })}</span>
              <span style={{ fontSize: '12px', color: '#4B5563' }}>{t('menu:menuManagementPage.afterMealHint', { defaultValue: 'Serve after the main course (e.g. dessert)' })}</span>
            </label>
          </UIFormGroup>

          {!formData.is_set_menu && (
          <UIFormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={(formData as any).set_only || false}
                onChange={(e) => setFormData({ ...formData, set_only: e.target.checked } as any)} />
              <span style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>{t('menu:menuManagementPage.setOnly', { defaultValue: 'Set menu use only' })}</span>
              <span style={{ fontSize: '12px', color: '#4B5563' }}>{t('menu:menuManagementPage.setOnlyHint', { defaultValue: 'Not sold separately — hidden from POS & mobile ordering, still available inside set menus and kitchen station routing' })}</span>
            </label>
          </UIFormGroup>
          )}

          <UIFormGroup>
            <ItemScheduleEditor
              value={formData.availability as any}
              onChange={(v) => setFormData({ ...formData, availability: v as any })}
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.emojiIcon')}</FormLabel>
            <EmojiPicker>
              {emojiOptions['other'].map((emoji: string) => (
                <EmojiOption
                  key={emoji}
                  selected={formData.emoji === emoji}
                  onClick={() => setFormData({ ...formData, emoji })}
                >
                  {emoji}
                </EmojiOption>
              ))}
            </EmojiPicker>
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.description')}</FormLabel>
            <FormTextArea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the item..."
            />
          </UIFormGroup>

          {/* 2026-06-28 (1-4): 브랜드가 이미지를 잠근 메뉴는 이미지 편집 불가 — 편집 가능한 것처럼
              보이나 저장이 안 되던 혼동 수정. 잠금 시 읽기전용 미리보기 + 안내(name/price/category 와
              동일 정책). 신규 추가 모달은 editingItem 이 없어 항상 업로드(else)로 동작. */}
          {editingItem?.brand_menu_locks_snapshot?.image ? (
            <UIFormGroup>
              <FormLabel>{t('menu:menuManagementPage.menuItemImage', { defaultValue: 'Menu Item Image' })} · {t('menu:menuManagementPage.brandLockedTag', { defaultValue: 'Brand-locked' })}</FormLabel>
              {formData.image ? (
                <img src={formData.image} alt="" style={{ maxHeight: 120, borderRadius: 8, border: '1px solid #E6EBF1', objectFit: 'contain', background: '#F9FAFB' }} />
              ) : (
                <div style={{ fontSize: 13, color: '#6B7C93', padding: '16px', background: '#F9FAFB', borderRadius: 8, textAlign: 'center' }}>—</div>
              )}
              <div style={{ fontSize: '12px', color: '#6B7C93', marginTop: '4px' }}>
                {t('menu:menuManagementPage.brandLockedImageHint', { defaultValue: 'Image is set by the brand and cannot be changed here.' })}
              </div>
            </UIFormGroup>
          ) : (
            <ImageUploadDropzone
              value={formData.image || ''}
              onChange={(base64) => setFormData({ ...formData, image: base64 })}
              label="Menu Item Image"
              helpText="Upload an image for this menu item (PNG, JPG, GIF — phone photos OK, auto-compressed)"
              showRemoveButton={true}
            />
          )}

          <UIFormGroup style={{ marginTop: '24px' }}>
            <FormLabel>{t('menu:menuManagementPage.linkedRecipe')}</FormLabel>
            <SearchableSelect
              options={recipes.map(recipe => ({
                value: recipe.id,
                label: recipe.name,
                subLabel: `Cost: RM ${Number(recipe.total_ingredient_cost || 0).toFixed(2)}`
              }))}
              value={formData.recipe_id || null}
              onChange={(value) => setFormData({ ...formData, recipe_id: value as number | null })}
              placeholder="Search or select recipe..."
              allowClear={true}
              noOptionsMessage="No recipes found"
            />
          </UIFormGroup>

          {/* 재고아이템 다이렉트 — 메뉴 = 재고아이템 (docs/TRADE_STRUCTURE.md §2-1).
              재료 **하나**를 그대로 가리킨다. 수량 칸도, 줄 추가도, 합계도 없다 — "그대로"라서 1:1 이고,
              환산을 넣는 순간 그게 레시피가 된다(Irene 2026-09-04).
              레시피와 상호 배타: 한쪽을 고르면 다른 쪽은 비운다. 브랜드 프로덕트 화면과 같은 UI. */}
          {!formData.recipe_id && (
            <UIFormGroup>
              <FormLabel>{t('common:link.stockItemDirect', { defaultValue: 'Stock Item (direct)' })}</FormLabel>
              <SearchableSelect
                options={ingredients.map(ing => ({
                  value: ing.id,
                  label: ing.name,
                  subLabel: `${ing.unit} / RM ${Number(ing.unit_cost || 0).toFixed(2)}`
                }))}
                value={formData.ingredient_id || null}
                onChange={(value) => setFormData({
                  ...formData,
                  ingredient_id: (value as number) || null,
                  recipe_id: null
                })}
                placeholder="Search or select stock item..."
                allowClear={true}
                noOptionsMessage="No stock items available"
              />
              {formData.ingredient_id && (() => {
                const si = ingredients.find(i => i.id === formData.ingredient_id);
                if (!si) return null;
                return (
                  <div style={{ marginTop: '6px', fontSize: '12.5px', color: '#4B5563' }}>
                    1 {si.unit} · RM {Number(si.unit_cost || 0).toFixed(2)}
                  </div>
                );
              })()}
            </UIFormGroup>
          )}

          <OptionGroupSectionTitle>
            <UIFormGroup>
              <FormLabel>Option Groups {selectedOptionGroups.length > 0 && `(${selectedOptionGroups.length} selected)`}</FormLabel>

              <OptionGroupSelect
                value=""
                onChange={(e) => {
                  if (e.target.value && !selectedOptionGroups.includes(e.target.value)) {
                    setSelectedOptionGroups([...selectedOptionGroups, e.target.value]);
                  }
                }}
              >
                <option value="">{t('menu:menuManagementPage.selectOptionGroupToAdd')}</option>
                {optionGroups
                  .filter(group => !selectedOptionGroups.includes(group.id))
                  .map(group => (
                    <option key={group.id} value={group.id}>
                      {group.name} ({group.required ? 'Required' : 'Optional'}, {group.multiple ? 'Multi' : 'Single'})
                    </option>
                  ))}
              </OptionGroupSelect>

              <SelectedChipsContainer>
                {selectedOptionGroups.map((groupId, index) => {
                  const group = optionGroups.find(g => g.id === groupId);
                  if (!group) return null;
                  return (
                    <OptionGroupChip key={groupId}>
                      <ChipOrderBadge>{index + 1}</ChipOrderBadge>
                      <ChipName>{group.name}</ChipName>
                      <ChipBadge type={group.required ? 'required' : 'optional'}>
                        {group.required ? 'Required' : 'Optional'}
                      </ChipBadge>
                      <ChipRemoveButton
                        onClick={() => setSelectedOptionGroups(selectedOptionGroups.filter(id => id !== groupId))}
                        title="Remove"
                      >
                        ×
                      </ChipRemoveButton>
                    </OptionGroupChip>
                  );
                })}
              </SelectedChipsContainer>
            </UIFormGroup>
          </OptionGroupSectionTitle>

          {/* #11c 크로스셀 — 함께 추천할 상품 (손님이 담은 직후 추천) */}
          <OptionGroupSectionTitle>
            <UIFormGroup>
              <FormLabel>
                {t('menu:menuManagementPage.crossSell.title', { defaultValue: 'Recommend with this item' })}
                {selectedRecommendations.length + lockedRecommendations.length > 0 && ` (${selectedRecommendations.length + lockedRecommendations.length})`}
              </FormLabel>
              <div style={{ fontSize: '12px', color: '#6B7280', margin: '-4px 0 8px' }}>
                {t('menu:menuManagementPage.crossSell.hint', { defaultValue: 'Shown to customers as add-ons right after they add this item to the cart. Leave empty to auto-suggest from dessert/drink categories.' })}
              </div>

              <OptionGroupSelect
                value=""
                disabled={recommendationsLoading}
                onChange={(e) => {
                  if (e.target.value && !selectedRecommendations.includes(e.target.value)) {
                    setSelectedRecommendations([...selectedRecommendations, e.target.value]);
                  }
                }}
              >
                <option value="">{t('menu:menuManagementPage.crossSell.addPlaceholder', { defaultValue: 'Select a product to recommend...' })}</option>
                {menuItems
                  .filter(m => String(m.id) !== String(editingItem?.id)
                    && !m.is_set_menu
                    && (m as any).is_active !== false
                    && !selectedRecommendations.includes(String(m.id))
                    && !lockedRecommendations.some(l => String(l.id) === String(m.id)))
                  .map(m => (
                    <option key={m.id} value={m.id}>
                      {m.code ? `${m.code} ` : ''}{m.name}
                    </option>
                  ))}
              </OptionGroupSelect>

              <SelectedChipsContainer>
                {/* 브랜드 잠금분 — 표시만(삭제 불가) */}
                {lockedRecommendations.map((l, index) => (
                  <OptionGroupChip key={`locked-${l.id}`} style={{ opacity: 0.7 }}>
                    <ChipOrderBadge>{index + 1}</ChipOrderBadge>
                    <ChipName>{l.name}</ChipName>
                    <ChipBadge type="required">{t('menu:menuManagementPage.crossSell.brandLocked', { defaultValue: 'Brand' })}</ChipBadge>
                  </OptionGroupChip>
                ))}
                {/* 매장분 — 편집 가능 */}
                {selectedRecommendations.map((recId, index) => {
                  const prod = menuItems.find(m => String(m.id) === String(recId));
                  return (
                    <OptionGroupChip key={recId}>
                      <ChipOrderBadge>{lockedRecommendations.length + index + 1}</ChipOrderBadge>
                      <ChipName>{prod ? prod.name : `#${recId}`}</ChipName>
                      <ChipRemoveButton
                        onClick={() => setSelectedRecommendations(selectedRecommendations.filter(id => id !== recId))}
                        title={t('menu:menuManagementPage.crossSell.remove', { defaultValue: 'Remove' })}
                      >
                        ×
                      </ChipRemoveButton>
                    </OptionGroupChip>
                  );
                })}
              </SelectedChipsContainer>
            </UIFormGroup>
          </OptionGroupSectionTitle>
        </UIModal>

        {/* Set Menu Modal */}
        <UIModal
          isOpen={showSetMenuModal}
          onClose={() => {
            setShowSetMenuModal(false);
            setEditingItem(null);
            setSetMenuItems([]);
          }}
          title={editingItem ? "Edit Set Menu" : "Create Set Menu"}
          size="large"
          footer={
            <>
              {setMenuError && (
                <div style={{
                  flex: '1 1 100%', order: -1, marginBottom: '8px', padding: '10px 14px',
                  background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px',
                  color: '#B91C1C', fontSize: '13px', lineHeight: 1.4
                }}>
                  {setMenuError}
                </div>
              )}
              <UIButton variant="secondary" onClick={() => {
                setShowSetMenuModal(false);
                setEditingItem(null);
                setSetMenuItems([]);
                setSetMenuError('');
              }}>
                Cancel
              </UIButton>
              <UIButton variant="primary" onClick={handleSaveSetMenu} disabled={!formData.name || !formData.category}>
                {editingItem ? "Save Changes" : "Create Set Menu"}
              </UIButton>
            </>
          }
        >
          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.itemCode')}</FormLabel>
            <FormInput
              type="text"
              value={formData.code || ''}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g., S01, S02 (optional)"
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Set Menu Name *</FormLabel>
            <FormInput
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Family Set, Lunch Combo"
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Set Price (RM) *</FormLabel>
            <FormInput
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              onFocus={(e) => {
                if (parseFloat(e.target.value) === 0) {
                  e.target.select();
                }
              }}
              step="0.01"
              min="0"
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Category *</FormLabel>
            <FormSelect
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">-- Select Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </FormSelect>
          </UIFormGroup>

          <UIFormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.is_featured || false}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} />
              <span style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>{t('menu:menuManagementPage.featuredItem')}</span>
              <span style={{ fontSize: '12px', color: '#4B5563' }}>{t('menu:menuManagementPage.showInMobileFeaturedTab')}</span>
            </label>
          </UIFormGroup>

          <UIFormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.after_meal || false}
                onChange={(e) => setFormData({ ...formData, after_meal: e.target.checked })} />
              <span style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>{t('menu:menuManagementPage.afterMeal', { defaultValue: 'After meal' })}</span>
              <span style={{ fontSize: '12px', color: '#4B5563' }}>{t('menu:menuManagementPage.afterMealHint', { defaultValue: 'Serve after the main course (e.g. dessert)' })}</span>
            </label>
          </UIFormGroup>

          {!formData.is_set_menu && (
          <UIFormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={(formData as any).set_only || false}
                onChange={(e) => setFormData({ ...formData, set_only: e.target.checked } as any)} />
              <span style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>{t('menu:menuManagementPage.setOnly', { defaultValue: 'Set menu use only' })}</span>
              <span style={{ fontSize: '12px', color: '#4B5563' }}>{t('menu:menuManagementPage.setOnlyHint', { defaultValue: 'Not sold separately — hidden from POS & mobile ordering, still available inside set menus and kitchen station routing' })}</span>
            </label>
          </UIFormGroup>
          )}

          <UIFormGroup>
            <ItemScheduleEditor
              value={formData.availability as any}
              onChange={(v) => setFormData({ ...formData, availability: v as any })}
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.emojiIcon')}</FormLabel>
            <EmojiPicker>
              {emojiOptions['other'].map((emoji: string) => (
                <EmojiOption
                  key={emoji}
                  selected={formData.emoji === emoji}
                  onClick={() => setFormData({ ...formData, emoji })}
                >
                  {emoji}
                </EmojiOption>
              ))}
            </EmojiPicker>
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.description')}</FormLabel>
            <FormTextArea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this set menu..."
            />
          </UIFormGroup>

          <ImageUploadDropzone
            value={formData.image || ''}
            onChange={(base64) => setFormData({ ...formData, image: base64 })}
            label="Set Menu Image"
          />

          {/* #11c 크로스셀 — 세트메뉴에도 "함께 추천할 상품" */}
          <UIFormGroup>
            <FormLabel>
              {t('menu:menuManagementPage.crossSell.title', { defaultValue: 'Recommend with this item' })}
              {selectedRecommendations.length > 0 && ` (${selectedRecommendations.length})`}
            </FormLabel>
            <div style={{ fontSize: '12px', color: '#6B7280', margin: '-4px 0 8px' }}>
              {t('menu:menuManagementPage.crossSell.hint', { defaultValue: 'Shown to customers as add-ons right after they add this item to the cart.' })}
            </div>
            <OptionGroupSelect
              value=""
              onChange={(e) => { if (e.target.value && !selectedRecommendations.includes(e.target.value)) setSelectedRecommendations([...selectedRecommendations, e.target.value]); }}
            >
              <option value="">{t('menu:menuManagementPage.crossSell.addPlaceholder', { defaultValue: 'Select a product to recommend...' })}</option>
              {menuItems
                .filter(m => String(m.id) !== String(editingItem?.id) && !m.is_set_menu && (m as any).is_active !== false && !selectedRecommendations.includes(String(m.id)))
                .map(m => (<option key={m.id} value={m.id}>{m.code ? `${m.code} ` : ''}{m.name}</option>))}
            </OptionGroupSelect>
            <SelectedChipsContainer>
              {selectedRecommendations.map((recId, index) => {
                const prod = menuItems.find(m => String(m.id) === String(recId));
                return (
                  <OptionGroupChip key={recId}>
                    <ChipOrderBadge>{index + 1}</ChipOrderBadge>
                    <ChipName>{prod ? prod.name : `#${recId}`}</ChipName>
                    <ChipRemoveButton onClick={() => setSelectedRecommendations(selectedRecommendations.filter(id => id !== recId))} title={t('menu:menuManagementPage.crossSell.remove', { defaultValue: 'Remove' })}>×</ChipRemoveButton>
                  </OptionGroupChip>
                );
              })}
            </SelectedChipsContainer>
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.displayOrderForSortingSetMenus')}</FormLabel>
            <FormInput
              type="number"
              value={formData.set_display_order || 0}
              onChange={(e) => setFormData({ ...formData, set_display_order: parseInt(e.target.value) || 0 })}
              min="0"
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('menu:setBuilder.title', { defaultValue: 'Set Composition' })} *</FormLabel>
            <SetMenuBuilder
              value={setGroups}
              onChange={setSetGroups}
              menuItems={menuItems as any}
              optionGroups={optionGroups as any}
              formatCurrency={(v: number) => formatCurrency(v, selectedCurrency)}
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>{t('menu:menuManagementPage.setMenuOptionsOptionsForEntireSet')} {selectedOptionGroups.length > 0 && `(${selectedOptionGroups.length} selected)`}</FormLabel>

            <OptionGroupSelect
              value=""
              onChange={(e) => {
                if (e.target.value && !selectedOptionGroups.includes(e.target.value)) {
                  setSelectedOptionGroups([...selectedOptionGroups, e.target.value]);
                }
              }}
            >
              <option value="">{t('menu:menuManagementPage.selectOptionGroupToAdd')}</option>
              {optionGroups
                .filter(group => !selectedOptionGroups.includes(group.id))
                .map(group => (
                  <option key={group.id} value={group.id}>
                    {group.name} ({group.required ? 'Required' : 'Optional'}, {group.multiple ? 'Multi' : 'Single'})
                  </option>
                ))}
            </OptionGroupSelect>

            <SelectedChipsContainer>
              {selectedOptionGroups.map((groupId, index) => {
                const group = optionGroups.find(g => g.id === groupId);
                if (!group) return null;
                return (
                  <OptionGroupChip key={groupId}>
                    <ChipOrderBadge>{index + 1}</ChipOrderBadge>
                    <ChipName>{group.name}</ChipName>
                    <ChipBadge type={group.required ? 'required' : 'optional'}>
                      {group.required ? 'Required' : 'Optional'}
                    </ChipBadge>
                    <ChipRemoveButton
                      onClick={() => setSelectedOptionGroups(selectedOptionGroups.filter(id => id !== groupId))}
                      title="Remove"
                    >
                      ×
                    </ChipRemoveButton>
                  </OptionGroupChip>
                );
              })}
            </SelectedChipsContainer>
          </UIFormGroup>
        </UIModal>

        {/* Confirm Delete Dialog */}
        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
          title="Delete Menu Item"
          message="Are you sure you want to delete this menu item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />

        {/* Quick Price Edit Modal */}
        <NumberInputModal
          isOpen={showPriceModal}
          onClose={() => setShowPriceModal(false)}
          onConfirm={handlePriceUpdate}
          title="Update Price"
          label={`Enter new price for ${priceEditItem?.name}:`}
          placeholder={priceEditItem?.price.toString()}
          min={0}
          step={0.01}
          suffix=" RM"
          confirmText="Update Price"
          cancelText="Cancel"
        />
        <ConfirmModal
          isOpen={infoModal.open}
          title={infoModal.title}
          message={infoModal.message}
          onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
          onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
          confirmText={t('common:ok', 'OK')}
          type="info"
          singleButton
        />
      </Container>
    </>
  );
};

export default MenuManagementPage;