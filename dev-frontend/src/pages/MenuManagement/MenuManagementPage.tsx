import React, { useState } from 'react';
// Updated with new UI components
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useMenu, MenuItem as MenuItemType, SetMenuItem } from '../../contexts/MenuContext';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import NumberInputModal from '../../components/common/NumberInputModal';
import ImageUploadDropzone from '../../components/common/ImageUploadDropzone';
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

// Styled Components
const Container = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
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
  max-width: 1400px;
  margin: 0 auto;
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
  border: 1px solid #E6EBF1;
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
  background: #F6F9FC;
  border-radius: 50%;
  color: #6B7C93;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;
  
  &:hover {
    background: #E6EBF1;
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
  color: #6B7C93;
  text-align: center;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  
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

const MenuCard = styled.div<{ soldOut?: boolean }>`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.15s;
  position: relative;
  
  ${props => props.soldOut && `
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
  height: 180px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  position: relative;
  overflow: hidden;
`;


const MenuContent = styled.div`
  padding: 16px;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
`;

const MenuName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const MenuPrice = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
`;

const MenuDescription = styled.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 8px 0;
  line-height: 1.4;
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
`;

const MenuActions = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
`;

const ActionButton = styled.button<{ danger?: boolean }>`
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  
  ${props => props.danger ? `
    background: #FFF4F4;
    color: #FF6B6B;
    border-color: #FFE6E6;
    
    &:hover {
      background: #FFE6E6;
    }
  ` : `
    background: white;
    color: #6B7C93;
    
    &:hover {
      background: #F6F9FC;
      color: #635BFF;
      border-color: #C7D2FE;
    }
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
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`;

const EmojiOption = styled.button<{ selected?: boolean }>`
  width: 48px;
  height: 48px;
  border: 2px solid ${props => props.selected ? '#635BFF' : '#E6EBF1'};
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


const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #0A2540;
  
  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
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

const SetItemsList = styled.div`
  background: #F6F9FC;
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
  border: 1px solid #E6EBF1;

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
  border: 1px solid #E6EBF1;
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
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
`;

const MenuItemOption = styled.div<{ selected?: boolean }>`
  padding: 12px;
  border-bottom: 1px solid #F6F9FC;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.selected ? '#F0F4FF' : 'white'};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F6F9FC;
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
  color: #6B7C93;
`;


const MenuManagementPage: React.FC = () => {
  const { categories, menuItems, optionGroups, updateMenuItem, addMenuItem, removeMenuItem, toggleItemSoldOut } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceEditItem, setPriceEditItem] = useState<MenuItemType | null>(null);

  // Set menu states
  const [showSetMenuModal, setShowSetMenuModal] = useState(false);
  const [setMenuItems, setSetMenuItems] = useState<SetMenuItem[]>([]);
  const [, ] = useState(0);
  const [setMenuSearchQuery, setSetMenuSearchQuery] = useState('');

  // Form state
  const [formData, setFormData] = useState<Partial<MenuItemType>>({
    name: '',
    price: 0,
    category: 'korean',
    emoji: '🍽️',
    description: '',
    image: '',
    optionGroups: [],
    is_set_menu: false,
    set_items: [],
    set_display_order: 0
  });

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

  const filteredItems = getFilteredItems();

  const handleAddItem = () => {
    setFormData({
      name: '',
      price: 0,
      category: 'korean',
      emoji: '🍽️',
      description: '',
      image: '',
      optionGroups: [],
      is_set_menu: false,
      set_items: [],
      set_display_order: 0
    });
    setSelectedOptionGroups([]);
    setSetMenuItems([]);
    setShowAddModal(true);
  };

  const handleAddSetMenu = () => {
    setFormData({
      name: '',
      price: 0,
      category: 'korean',
      emoji: '🍽️',
      description: '',
      image: '',
      optionGroups: [],
      is_set_menu: true,
      set_items: [],
      set_display_order: 0
    });
    setSelectedOptionGroups([]);
    setSetMenuItems([]);
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
      set_items: item.set_items || [],
      set_display_order: item.set_display_order || 0
    });
    setSelectedOptionGroups(item.optionGroups || []);
    setSetMenuItems(item.set_items || []);

    // Open appropriate modal based on item type
    if (item.is_set_menu) {
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

  const handleQuickPriceEdit = (item: MenuItemType) => {
    setPriceEditItem(item);
    setShowPriceModal(true);
  };

  const handlePriceUpdate = (value: string) => {
    if (priceEditItem) {
      const newPrice = parseFloat(value);
      updateMenuItem({ ...priceEditItem, price: newPrice });
      setShowPriceModal(false);
      setPriceEditItem(null);
    }
  };

  const handleSaveNew = () => {
    const newItem: MenuItemType = {
      id: `item-${Date.now()}`,
      code: formData.code || '',
      name: formData.name || '',
      price: formData.price || 0,
      category: formData.category || 'korean',
      emoji: formData.emoji || '🍽️',
      description: formData.description,
      image: formData.image,
      optionGroups: selectedOptionGroups,
      soldOut: false,
      is_set_menu: false,
      set_items: [],
      set_display_order: 0
    };

    addMenuItem(newItem);
    setShowAddModal(false);
  };

  const handleSaveSetMenu = () => {
    if (setMenuItems.length === 0) {
      alert('Set menu must contain at least one menu item.');
      return;
    }

    const newSetMenu: MenuItemType = {
      id: editingItem?.id || `item-${Date.now()}`,
      code: formData.code || '',
      name: formData.name || '',
      price: formData.price || 0,
      category: formData.category || 'korean',
      emoji: formData.emoji || '🍽️',
      description: formData.description,
      image: formData.image,
      optionGroups: selectedOptionGroups,
      soldOut: false,
      is_set_menu: true,
      set_items: setMenuItems,
      set_display_order: formData.set_display_order || 0
    };

    if (editingItem) {
      updateMenuItem(newSetMenu);
    } else {
      addMenuItem(newSetMenu);
    }

    setShowSetMenuModal(false);
    setEditingItem(null);
    setSetMenuItems([]);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      const updatedItem = {
        ...editingItem,  // ← Keep id and other fields from editingItem
        ...formData,     // ← Override with formData (name, price, category, emoji, etc.)
        optionGroups: selectedOptionGroups
      } as MenuItemType;
      updateMenuItem(updatedItem);
      setShowEditModal(false);
      setEditingItem(null);
    }
  };

  // Removed: Using ImageUploadDropzone component instead

  const handleOptionGroupToggle = (groupId: string) => {
    if (selectedOptionGroups.includes(groupId)) {
      setSelectedOptionGroups(selectedOptionGroups.filter(id => id !== groupId));
    } else {
      setSelectedOptionGroups([...selectedOptionGroups, groupId]);
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <HeaderTitle>Menu</HeaderTitle>
          <HeaderActions>
            <UIButton variant="secondary" onClick={handleAddSetMenu}>+ Create Set Menu</UIButton>
            <UIButton variant="primary" onClick={handleAddItem}>+ Add New Item</UIButton>
          </HeaderActions>
        </Header>

        <Content>
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
          </SearchSection>

          {searchQuery && filteredItems.length > 0 && (
            <SearchResultInfo>
              <span>Found {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} matching "{searchQuery}"</span>
              <UIButton variant="secondary" onClick={() => setSearchQuery('')}>Clear Search</UIButton>
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
              {filteredItems.map(item => (
              <MenuCard key={item.id} soldOut={item.soldOut}>
                <MenuImage>
                  {item.is_set_menu && <SetBadge>SET</SetBadge>}
                  {item.image && item.image.trim() !== '' ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = item.emoji || '🍽️';
                          e.currentTarget.parentElement.style.fontSize = '48px';
                          e.currentTarget.parentElement.style.display = 'flex';
                          e.currentTarget.parentElement.style.alignItems = 'center';
                          e.currentTarget.parentElement.style.justifyContent = 'center';
                        }
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: '48px' }}>{item.emoji || '🍽️'}</span>
                  )}
                </MenuImage>
                <MenuContent>
                  <MenuCategory>
                    {categories.find(c => c.id === item.category)?.name}
                  </MenuCategory>
                  <MenuHeader>
                    <MenuName>{item.code ? `${item.code} ` : ''}{item.name}</MenuName>
                    <MenuPrice>RM {item.price.toFixed(2)}</MenuPrice>
                  </MenuHeader>
                  <MenuDescription>
                    {item.description || 'No description available'}
                  </MenuDescription>
                  {item.is_set_menu && item.set_items && item.set_items.length > 0 && (
                    <MenuDescription style={{ fontSize: '11px', color: '#667eea', fontWeight: 500 }}>
                      Set includes: {item.set_items.map(setItem => {
                        const menuItem = menuItems.find(m => m.id === setItem.menuItemId.toString());
                        const itemCode = menuItem?.code;
                        return `${itemCode ? `${itemCode} ` : ''}${setItem.name} x${setItem.quantity}`;
                      }).join(', ')}
                    </MenuDescription>
                  )}
                  {item.optionGroups && item.optionGroups.length > 0 && (
                    <MenuDescription style={{ fontSize: '11px', color: '#8898AA' }}>
                      Option Groups: {item.optionGroups.map(groupId =>
                        optionGroups.find(g => g.id === groupId)?.name
                      ).filter(Boolean).join(', ')}
                    </MenuDescription>
                  )}
                  <MenuActions>
                    <ActionButton onClick={() => handleEditItem(item)}>
                      Edit
                    </ActionButton>
                    <ActionButton onClick={() => handleQuickPriceEdit(item)}>
                      Price
                    </ActionButton>
                    <ActionButton onClick={() => toggleItemSoldOut(item.id)}>
                      {item.soldOut ? 'In Stock' : 'Sold Out'}
                    </ActionButton>
                    <ActionButton danger onClick={() => handleDeleteItem(item.id)}>
                      Delete
                    </ActionButton>
                  </MenuActions>
                </MenuContent>
              </MenuCard>
            ))}
            
            <AddCard onClick={handleAddItem}>
              <AddIcon>+</AddIcon>
              <AddText>Add New Menu Item</AddText>
            </AddCard>
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
              <UIButton variant="primary" onClick={handleSaveNew}>
                Add Item
              </UIButton>
            </>
          }
        >
          <UIFormGroup>
            <FormLabel>Item Code</FormLabel>
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
            <FormLabel>Category *</FormLabel>
            <FormSelect
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </FormSelect>
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Emoji Icon</FormLabel>
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
            <FormLabel>Description</FormLabel>
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
            helpText="Upload an image for this menu item (PNG, JPG, GIF up to 2MB)"
            maxSize={2}
            showRemoveButton={true}
          />

          <UIFormGroup>
            <FormLabel>Option Groups</FormLabel>
            <CheckboxGroup>
              {optionGroups.map(group => (
                <CheckboxLabel key={group.id}>
                  <input
                    type="checkbox"
                    checked={selectedOptionGroups.includes(group.id)}
                    onChange={() => handleOptionGroupToggle(group.id)}
                  />
                  {group.name} ({group.required ? 'Required' : 'Optional'}, {group.multiple ? 'Multi' : 'Single'})
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </UIFormGroup>
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
          <UIFormGroup>
            <FormLabel>Item Code</FormLabel>
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
            <FormLabel>Category *</FormLabel>
            <FormSelect
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </FormSelect>
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Emoji Icon</FormLabel>
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
            <FormLabel>Description</FormLabel>
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
            helpText="Upload an image for this menu item (PNG, JPG, GIF up to 2MB)"
            maxSize={2}
            showRemoveButton={true}
          />

          <UIFormGroup>
            <FormLabel>Option Groups</FormLabel>
            <CheckboxGroup>
              {optionGroups.map(group => (
                <CheckboxLabel key={group.id}>
                  <input
                    type="checkbox"
                    checked={selectedOptionGroups.includes(group.id)}
                    onChange={() => handleOptionGroupToggle(group.id)}
                  />
                  {group.name} ({group.required ? 'Required' : 'Optional'}, {group.multiple ? 'Multi' : 'Single'})
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </UIFormGroup>
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
              <UIButton variant="secondary" onClick={() => {
                setShowSetMenuModal(false);
                setEditingItem(null);
                setSetMenuItems([]);
              }}>
                Cancel
              </UIButton>
              <UIButton variant="primary" onClick={handleSaveSetMenu}>
                {editingItem ? "Save Changes" : "Create Set Menu"}
              </UIButton>
            </>
          }
        >
          <UIFormGroup>
            <FormLabel>Item Code</FormLabel>
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
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </FormSelect>
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Emoji Icon</FormLabel>
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
            <FormLabel>Description</FormLabel>
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
            <FormLabel>Display Order (for sorting set menus)</FormLabel>
            <FormInput
              type="number"
              value={formData.set_display_order || 0}
              onChange={(e) => setFormData({ ...formData, set_display_order: parseInt(e.target.value) || 0 })}
              min="0"
            />
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Set Menu Items * (at least 1 item required)</FormLabel>
            {setMenuItems.length > 0 && (
              <SetItemsList>
                {setMenuItems.map(setItem => {
                  const menuItem = menuItems.find(m => parseInt(m.id) === setItem.menuItemId);
                  const itemCode = menuItem?.code;
                  return (
                    <SetItemRow key={setItem.menuItemId}>
                      <SetItemInfo>
                        <SetItemName>{itemCode ? `${itemCode} ` : ''}{setItem.name}</SetItemName>
                      </SetItemInfo>
                      <SetItemQuantity>
                        <QuantityButton
                          onClick={() => handleUpdateSetMenuItemQuantity(setItem.menuItemId, -1)}
                          disabled={setItem.quantity <= 1}
                        >
                          −
                        </QuantityButton>
                        <QuantityDisplay>{setItem.quantity}</QuantityDisplay>
                        <QuantityButton
                          onClick={() => handleUpdateSetMenuItemQuantity(setItem.menuItemId, 1)}
                        >
                          +
                        </QuantityButton>
                      </SetItemQuantity>
                      <RemoveButton onClick={() => handleRemoveSetMenuItem(setItem.menuItemId)}>
                        Remove
                      </RemoveButton>
                    </SetItemRow>
                  );
                })}
              </SetItemsList>
            )}
            <div style={{ marginTop: '12px' }}>
              <FormLabel>Available Menu Items (select items to add to set)</FormLabel>
              <FormInput
                type="text"
                value={setMenuSearchQuery}
                onChange={(e) => setSetMenuSearchQuery(e.target.value)}
                placeholder="Search by code or name..."
                style={{ marginBottom: '12px' }}
              />
              <MenuItemSelector>
                {menuItems
                  .filter(item => !item.is_set_menu) // Don't show other set menus
                  .filter(item => {
                    if (!setMenuSearchQuery) return true;
                    const query = setMenuSearchQuery.toLowerCase();
                    const matchCode = item.code?.toLowerCase().includes(query);
                    const matchName = item.name.toLowerCase().includes(query);
                    return matchCode || matchName;
                  })
                  .map(item => (
                    <MenuItemOption
                      key={item.id}
                      selected={setMenuItems.some(si => si.menuItemId === parseInt(item.id))}
                      onClick={() => handleAddSetMenuItem(parseInt(item.id))}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          style={{
                            width: '48px',
                            height: '48px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginRight: '12px'
                          }}
                        />
                      ) : (
                        <MenuItemOptionEmoji>{item.emoji || '🍽️'}</MenuItemOptionEmoji>
                      )}
                      <MenuItemOptionInfo>
                        <MenuItemOptionName>{item.code ? `${item.code} ` : ''}{item.name}</MenuItemOptionName>
                        <MenuItemOptionPrice>
                          RM {item.price.toFixed(2)} · {categories.find(c => c.id === item.category)?.name}
                        </MenuItemOptionPrice>
                      </MenuItemOptionInfo>
                    </MenuItemOption>
                  ))}
              </MenuItemSelector>
            </div>
          </UIFormGroup>

          <UIFormGroup>
            <FormLabel>Set Menu Options (options for entire set)</FormLabel>
            <CheckboxGroup>
              {optionGroups.map(group => (
                <CheckboxLabel key={group.id}>
                  <input
                    type="checkbox"
                    checked={selectedOptionGroups.includes(group.id)}
                    onChange={() => handleOptionGroupToggle(group.id)}
                  />
                  {group.name} ({group.required ? 'Required' : 'Optional'}, {group.multiple ? 'Multi' : 'Single'})
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
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
      </Container>
    </MainLayout>
  );
};

export default MenuManagementPage;