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
  Tab
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
    takeaway_charge: 0
  });

  const [directIngredients, setDirectIngredients] = useState<{ingredient_id: number; name: string; quantity: number; unit: string; unit_cost: number}[]>([]);
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

        // Fetch ingredients for direct linking
        if (restaurantId) {
          const ingResponse = await fetch(`/api/restaurants/${restaurantId}/ingredients`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (ingResponse.ok) {
            const ingData = await ingResponse.json();
            setIngredients((ingData.success ? ingData.data : ingData) || []);
          }
        }
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  const [selectedOptionGroups, setSelectedOptionGroups] = useState<string[]>([]);

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
      takeaway_charge: 0
    });
    setSelectedOptionGroups([]);
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
      takeaway_charge: 0
    });
    setSelectedOptionGroups([]);
    setSetMenuItems([]);
    setSetGroups([]);
    setSetMenuError("");
    setShowSetMenuModal(true);
  };

  const handleEditItem = (item: MenuItemType) => {
    setEditingItem(item);
    setFormData({
      ...item,
      emoji: item.emoji || '🍽️',  // Preserve emoji or use default
      image: item.image || '',      // Preserve image or empty string
      optionGroups: item.optionGroups || [],
      is_set_menu: item.is_set_menu || false,
      set_only: (item as any).set_only || false,
      set_items: item.set_items || [],
      set_display_order: item.set_display_order || 0,
      recipe_id: item.recipe_id || null,
      takeaway_charge: item.takeaway_charge ?? 0
    });
    setSelectedOptionGroups(item.optionGroups || []);
    setSetMenuItems(item.set_items || []);
    // set_groups 우선, 없으면 레거시 set_items 를 fixed 그룹으로 폴백 변환
    setSetGroups(resolveSetGroups(item));

    // Load direct ingredients if recipe is auto-generated
    if (item.recipe_id) {
      const linkedRecipe = recipes.find(r => r.id === item.recipe_id);
      if (linkedRecipe && linkedRecipe.name?.endsWith('(auto)') && linkedRecipe.recipeIngredients) {
        // Auto recipe: load ingredients and clear recipe_id so UI shows ingredient section
        setFormData(prev => ({ ...prev, recipe_id: null }));
        setDirectIngredients(linkedRecipe.recipeIngredients.map((ri: any) => ({
          ingredient_id: ri.ingredient_id,
          name: ri.ingredient?.name || '',
          quantity: parseFloat(ri.quantity),
          unit: ri.unit,
          unit_cost: parseFloat(ri.ingredient?.unit_cost || 0)
        })));
      } else {
        setDirectIngredients([]);
      }
    } else {
      setDirectIngredients([]);
    }

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
      directIngredients: !formData.recipe_id ? directIngredients : undefined
    } as any;

    addMenuItem(newItem);
    setDirectIngredients([]);
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
        if (editingItem) {
          await updateMenuItem(newSetMenu);
        } else {
          await addMenuItem(newSetMenu);
        }
        setShowSetMenuModal(false);
        setEditingItem(null);
        setSetMenuItems([]);
        setSetGroups([]);
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

  const handleSaveEdit = () => {
    if (editingItem) {
      const updatedItem = {
        ...editingItem,
        ...formData,
        optionGroups: selectedOptionGroups,
        directIngredients: !formData.recipe_id ? directIngredients : undefined
      } as any;
      updateMenuItem(updatedItem);
      setDirectIngredients([]);
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
              {(useProgressive ? filteredItems.slice(0, visibleCount) : filteredItems).map(item => (
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

          <ImageUploadDropzone
            value={formData.image || ''}
            onChange={(base64) => setFormData({ ...formData, image: base64 })}
            label="Menu Item Image"
            helpText="Upload an image for this menu item (PNG, JPG, GIF — phone photos OK, auto-compressed)"
            showRemoveButton={true}
          />

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

          {!formData.recipe_id && (
            <UIFormGroup>
              <FormLabel>Ingredients (direct) {directIngredients.length > 0 && <span style={{ fontSize: '11px', color: '#4B5563', fontWeight: 400 }}>Cost: RM {directIngredients.reduce((sum, di) => sum + (di.unit_cost * di.quantity), 0).toFixed(2)}</span>}</FormLabel>
              {directIngredients.map((di, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', fontSize: '13px', background: '#F9FAFB', padding: '8px 12px', borderRadius: '6px' }}>
                  <span style={{ flex: 1 }}>{di.name}</span>
                  <input type="number" value={di.quantity} min="0.01" step="0.01" style={{ width: '60px', textAlign: 'center', border: '1px solid #C7CED6', borderRadius: '4px', padding: '2px 4px', fontSize: '13px' }}
                    onChange={(e) => setDirectIngredients(prev => prev.map((item, i) => i === idx ? { ...item, quantity: parseFloat(e.target.value) || 0 } : item))} />
                  <span style={{ fontSize: '12px', color: '#4B5563', width: '30px' }}>{di.unit}</span>
                  <span style={{ width: '70px', textAlign: 'right', color: '#4B5563', fontSize: '12px' }}>RM {(di.unit_cost * di.quantity).toFixed(2)}</span>
                  <button type="button" onClick={() => setDirectIngredients(prev => prev.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '16px', padding: '0 4px' }}>x</button>
                </div>
              ))}
              <SearchableSelect
                options={ingredients.filter(ing => !directIngredients.some(di => di.ingredient_id === ing.id)).map(ing => ({
                  value: ing.id,
                  label: ing.name,
                  subLabel: `${ing.unit} / RM ${Number(ing.unit_cost || 0).toFixed(2)}`
                }))}
                value={null}
                onChange={(value) => {
                  if (value) {
                    const ing = ingredients.find(i => i.id === value);
                    if (ing) setDirectIngredients(prev => [...prev, { ingredient_id: ing.id, name: ing.name, quantity: 1, unit: ing.unit, unit_cost: Number(ing.unit_cost || 0) }]);
                  }
                }}
                placeholder="Add ingredient..."
                allowClear={false}
                noOptionsMessage="No ingredients available"
              />
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

          <ImageUploadDropzone
            value={formData.image || ''}
            onChange={(base64) => setFormData({ ...formData, image: base64 })}
            label="Menu Item Image"
            helpText="Upload an image for this menu item (PNG, JPG, GIF — phone photos OK, auto-compressed)"
            showRemoveButton={true}
          />

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

          {!formData.recipe_id && (
            <UIFormGroup>
              <FormLabel>Ingredients (direct) {directIngredients.length > 0 && <span style={{ fontSize: '11px', color: '#4B5563', fontWeight: 400 }}>Cost: RM {directIngredients.reduce((sum, di) => sum + (di.unit_cost * di.quantity), 0).toFixed(2)}</span>}</FormLabel>
              {directIngredients.map((di, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', fontSize: '13px', background: '#F9FAFB', padding: '8px 12px', borderRadius: '6px' }}>
                  <span style={{ flex: 1 }}>{di.name}</span>
                  <input type="number" value={di.quantity} min="0.01" step="0.01" style={{ width: '60px', textAlign: 'center', border: '1px solid #C7CED6', borderRadius: '4px', padding: '2px 4px', fontSize: '13px' }}
                    onChange={(e) => setDirectIngredients(prev => prev.map((item, i) => i === idx ? { ...item, quantity: parseFloat(e.target.value) || 0 } : item))} />
                  <span style={{ fontSize: '12px', color: '#4B5563', width: '30px' }}>{di.unit}</span>
                  <span style={{ width: '70px', textAlign: 'right', color: '#4B5563', fontSize: '12px' }}>RM {(di.unit_cost * di.quantity).toFixed(2)}</span>
                  <button type="button" onClick={() => setDirectIngredients(prev => prev.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '16px', padding: '0 4px' }}>x</button>
                </div>
              ))}
              <SearchableSelect
                options={ingredients.filter(ing => !directIngredients.some(di => di.ingredient_id === ing.id)).map(ing => ({
                  value: ing.id,
                  label: ing.name,
                  subLabel: `${ing.unit} / RM ${Number(ing.unit_cost || 0).toFixed(2)}`
                }))}
                value={null}
                onChange={(value) => {
                  if (value) {
                    const ing = ingredients.find(i => i.id === value);
                    if (ing) setDirectIngredients(prev => [...prev, { ingredient_id: ing.id, name: ing.name, quantity: 1, unit: ing.unit, unit_cost: Number(ing.unit_cost || 0) }]);
                  }
                }}
                placeholder="Add ingredient..."
                allowClear={false}
                noOptionsMessage="No ingredients available"
              />
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