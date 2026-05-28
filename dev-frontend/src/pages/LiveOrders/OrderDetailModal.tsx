import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal as CommonModal } from '../../components/UI';
import OrderActionHistory from './OrderActionHistory';
import { formatCurrency } from '../../utils/currency';
import { formatPaymentDisplay } from '../../constants';
import { formatDateTime as formatDateTimeUtil } from '../../utils/timezone';
import { generateHTMLBill, generateHTMLKitchenTicket, tagTicketWithStations, getPrinterSettings } from '../../utils/billPrint';
import { DbOrder } from './types';
import { formatPickupTimeRange, getProofCurrent, getProofHistory } from './helpers';
import {
  OrderDetailSection, SectionTitle, DetailRow, DetailLabel, DetailValue,
  ItemDetail, ItemInfo, ItemName, ItemOptions, ItemPrice,
  Divider, TotalSection, TotalRow, StatusBadge, ActionButton
} from './styles';

interface OrderDetailModalProps {
  selectedOrder: DbOrder;
  isModalOpen: boolean;
  showAddItemsView: boolean;
  showReceiptView: boolean;
  showKitchenTicketView: boolean;
  // Add Items state
  addItemsSearchQuery: string;
  setAddItemsSearchQuery: (q: string) => void;
  menuItems: any[];
  addItemsCart: any[];
  isAddingItems: boolean;
  // Callbacks
  handleCloseModal: () => void;
  setShowReceiptView: (v: boolean) => void;
  setShowKitchenTicketView: (v: boolean) => void;
  setShowAddItemsView: (v: boolean) => void;
  setAddItemsCart: React.Dispatch<React.SetStateAction<any[]>>;
  handleDeleteOrder: (id: number) => void;
  handleCancelOrder: (id: number) => void;
  handleStatusChange: (id: number, status: DbOrder['status'], setKitchenReady?: boolean) => void;
  handlePaymentClick: (order: DbOrder) => void;
  setVerifyOrder: (order: DbOrder | null) => void;
  handlePrintReceipt: () => void;
  handleAddToItemsCart: (item: any, quantity?: number, selectedOptions?: any[]) => void;
  handleRemoveFromItemsCart: (cartId: string) => void;
  handleIncreaseCartItem: (cartId: string) => void;
  handleSubmitAddItems: () => void;
  handleDeleteOrderItem: (index: number, name: string) => void;
  handlePrintGroupTicket: (groupNum: number, groupItems: any[]) => void;
  setShowOptionModal: (v: boolean) => void;
  setSelectedMenuItemForOption: (item: any) => void;
  // Store/settings
  operationSettings: any;
  paymentSettings: any;
  getStoreInfo: () => any;
  user: any;
  formatDateTime: (date?: Date | string) => string;
  isOutstanding: (order: DbOrder) => boolean;
  formatStatusDisplay: (status: string) => string;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  selectedOrder,
  isModalOpen,
  showAddItemsView,
  showReceiptView,
  showKitchenTicketView,
  addItemsSearchQuery,
  setAddItemsSearchQuery,
  menuItems,
  addItemsCart,
  isAddingItems,
  handleCloseModal,
  setShowReceiptView,
  setShowKitchenTicketView,
  setShowAddItemsView,
  setAddItemsCart,
  handleDeleteOrder,
  handleCancelOrder,
  handleStatusChange,
  handlePaymentClick,
  setVerifyOrder,
  handlePrintReceipt,
  handleAddToItemsCart,
  handleRemoveFromItemsCart,
  handleIncreaseCartItem,
  handleSubmitAddItems,
  handleDeleteOrderItem,
  handlePrintGroupTicket,
  setShowOptionModal,
  setSelectedMenuItemForOption,
  operationSettings,
  paymentSettings,
  getStoreInfo,
  user,
  formatDateTime,
  isOutstanding,
  formatStatusDisplay
}) => {
  const { t } = useTranslation('orders');
  // History 는 본문 끝 작은 링크 + popover. 탭 분리 안 함 (공간 차지 회피).
  // cancelled 주문이면 popover 자동 열기 — 취소 시점/단계/사유 즉시 부각.
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    setShowHistory(selectedOrder?.status === 'cancelled');
  }, [selectedOrder?.id, selectedOrder?.status]);

  if (!isModalOpen || !selectedOrder) return null;

  return (
    <CommonModal
      isOpen={true}
      onClose={() => {
        setShowReceiptView(false);
        setShowKitchenTicketView(false);
        setShowAddItemsView(false);
        setAddItemsCart([]);
        handleCloseModal();
      }}
      title={showAddItemsView ? t('orders:liveOrdersPage.addItemsToOrder', 'Add Items to Order')
        : showReceiptView ? t('orders:liveOrdersPage.billPreview', 'Bill Preview')
        : showKitchenTicketView ? t('orders:liveOrdersPage.kitchenTicketPreview', 'Kitchen Order Ticket Preview')
        : `${t('orders:liveOrdersPage.order', 'Order')} ${selectedOrder.order_number}`}
      footer={!showAddItemsView ? (
        showReceiptView ? (
          <ActionButton onClick={() => setShowReceiptView(false)}>{t('orders:liveOrdersPage.backToOrderDetails')}</ActionButton>
        ) : showKitchenTicketView ? (
          <ActionButton onClick={() => setShowKitchenTicketView(false)}>{t('orders:liveOrdersPage.backToOrderDetails')}</ActionButton>
        ) : (
          <>
            {['Restaurant Admin', 'Restaurant Owner', 'System Admin'].includes(user?.role) && (
              <ActionButton variant="secondary" onClick={() => handleDeleteOrder(selectedOrder.id)} style={{ background: '#4B5563', borderColor: '#4B5563', color: 'white' }}>{t('orders:liveOrdersPage.remove')}</ActionButton>
            )}
            {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'completed' && (
              <ActionButton onClick={() => handleCancelOrder(selectedOrder.id)} style={{ background: '#FF6B6B', borderColor: '#FF6B6B', color: 'white' }}>{t('orders:liveOrdersPage.cancelOrder')}</ActionButton>
            )}
            {isOutstanding(selectedOrder) && selectedOrder.status !== 'pending' && (selectedOrder.payment_status as any) !== 'payment_verification_pending' && (selectedOrder.payment_status as any) !== 'rejected' && (
              <ActionButton onClick={() => { handleStatusChange(selectedOrder.id, 'pending'); handleCloseModal(); }} style={{ background: '#F59E0B', borderColor: '#F59E0B', color: 'white' }}>{t('orders:liveOrdersPage.proceedWithoutPayment')}</ActionButton>
            )}
            {selectedOrder.payment_status === 'pending' && (
              <ActionButton onClick={() => handlePaymentClick(selectedOrder)} style={{ background: '#10B981', borderColor: '#10B981', color: 'white' }}>{t('orders:liveOrdersPage.payment')}</ActionButton>
            )}
            {(selectedOrder.payment_status as any) === 'payment_verification_pending' && (
              <ActionButton onClick={() => setVerifyOrder(selectedOrder)} style={{ background: '#10B981', borderColor: '#10B981', color: 'white' }}>{t('orders:liveOrdersPage.confirmPayment')}</ActionButton>
            )}
            {selectedOrder.payment_status === 'pending' && !['served', 'completed', 'cancelled'].includes(selectedOrder.status) && (
              <ActionButton onClick={() => setShowAddItemsView(true)} style={{ background: '#8B5CF6', borderColor: '#8B5CF6', color: 'white' }}>{t('orders:liveOrdersPage.addItems')}</ActionButton>
            )}
            <ActionButton onClick={() => setShowReceiptView(true)} style={{ marginRight: '10px' }}>{t('orders:liveOrdersPage.viewReceipt')}</ActionButton>
            <ActionButton onClick={() => setShowKitchenTicketView(true)} style={{ marginRight: '10px' }}>{t('orders:liveOrdersPage.viewOrderTicket')}</ActionButton>
            <ActionButton onClick={handlePrintReceipt}>{t('orders:liveOrdersPage.printBill')}</ActionButton>
          </>
        )
      ) : undefined}
    >

      {showAddItemsView ? (
        /* Add Items View - Improved UI with options support */
        <>
          <div style={{ padding: '20px', maxHeight: 'calc(70vh - 80px)', overflow: 'auto' }}>
            {/* Search Input - Fixed width */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Search menu items..."
                value={addItemsSearchQuery}
                onChange={(e) => setAddItemsSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #C7CED6',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#635BFF'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#C7CED6'}
                autoFocus
              />
            </div>

            {/* Search Results - Click to add */}
            {addItemsSearchQuery.length > 0 && (
              <div style={{ marginBottom: '20px', maxHeight: '200px', overflowY: 'auto', border: '1px solid #C7CED6', borderRadius: '8px' }}>
                {menuItems
                  .filter((item: any) => {
                    if (!item || !item.name) return false;
                    const searchLower = addItemsSearchQuery.toLowerCase();
                    const nameMatch = item.name.toLowerCase().includes(searchLower);
                    const codeMatch = item.code ? item.code.toLowerCase().includes(searchLower) : false;
                    return nameMatch || codeMatch;
                  })
                  .slice(0, 15)
                  .map((item: any) => {
                    // Check if item has optionGroups (can be ID array or object array)
                    const hasOptions = Array.isArray(item.optionGroups) && item.optionGroups.length > 0;
                    return (
                      <div
                        key={item.id}
                        style={{
                          padding: '12px 16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderBottom: '1px solid #F1F4F8',
                          transition: 'background 0.1s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                      >
                        <div
                          style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}
                          onClick={() => {
                            // Like POS Terminal: Click item area = add directly without options
                            handleAddToItemsCart(item, 1, []);
                            setAddItemsSearchQuery('');
                          }}
                        >
                          <span style={{ fontWeight: 500 }}>{item.code ? `${item.code} ` : ''}{item.name}</span>
                          {item.is_set_menu && <span style={{ marginLeft: '8px', fontSize: '11px', background: '#EDE9FE', color: '#7C3AED', padding: '2px 6px', borderRadius: '4px' }}>{t('orders:liveOrdersPage.set')}</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          <span style={{ color: '#635BFF', fontWeight: 500 }}>
                            {formatCurrency(parseFloat(item.price) || 0, operationSettings.currency)}
                          </span>
                          {hasOptions && (
                            <button type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Set item for OptionModal - optionGroups contains ID array like ["6", "7"]
                                // OptionModal will use MenuContext to get actual option data
                                setSelectedMenuItemForOption(item);
                                setShowOptionModal(true);
                              }}
                              style={{
                                padding: '4px 10px',
                                fontSize: '12px',
                                background: '#FEF3C7',
                                color: '#D97706',
                                border: '1px solid #FCD34D',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 500
                              }}
                            >
                              {t('orders:liveOrdersPage.options', 'Options')}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                {menuItems.filter((item: any) =>
                  item.name.toLowerCase().includes(addItemsSearchQuery.toLowerCase()) ||
                  (item.code && item.code.toLowerCase().includes(addItemsSearchQuery.toLowerCase()))
                ).length === 0 && (
                  <div style={{ padding: '16px', textAlign: 'center', color: '#6B7280' }}>
                    {t('orders:liveOrdersPage.noItemsFound', 'No items found')}
                  </div>
                )}
              </div>
            )}

            {/* Items to Add */}
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontWeight: 600, color: '#0A2540' }}>
                {t('orders:liveOrdersPage.itemsToAdd', 'Items to Add')} ({addItemsCart.reduce((sum: number, item: any) => sum + item.quantity, 0)})
              </h4>
              {addItemsCart.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280', background: '#F9FAFB', borderRadius: '8px' }}>
                  {t('orders:liveOrdersPage.searchAndSelectItems', 'Search and select items to add')}
                </div>
              ) : (
                <div style={{ border: '1px solid #C7CED6', borderRadius: '8px', overflow: 'hidden' }}>
                  {addItemsCart.map((item: any) => (
                    <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #F1F4F8' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                        {item.selectedOptions && item.selectedOptions.length > 0 && (
                          <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>
                            {item.selectedOptions.map((opt: any) => opt.name).join(', ')}
                          </div>
                        )}
                        <div style={{ color: '#4B5563', fontSize: '13px' }}>
                          {formatCurrency(item.unitPrice || parseFloat(item.price), operationSettings.currency)} each
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <button type="button"
                          onClick={() => handleRemoveFromItemsCart(item.cartId)}
                          style={{ width: '32px', height: '32px', border: '1px solid #C7CED6', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '18px', fontWeight: 500 }}
                        >-</button>
                        <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: 600, fontSize: '15px' }}>{item.quantity}</span>
                        <button type="button"
                          onClick={() => handleIncreaseCartItem(item.cartId)}
                          style={{ width: '32px', height: '32px', border: '1px solid #C7CED6', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '18px', fontWeight: 500 }}
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Fixed Footer - Total and Buttons */}
          <div style={{ borderTop: '1px solid #C7CED6', padding: '16px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div style={{ fontWeight: 600 }}>
                Total: {formatCurrency(
                  addItemsCart.reduce((sum: number, item: any) => sum + ((item.unitPrice || parseFloat(item.price)) * item.quantity), 0),
                  operationSettings.currency
                )}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <ActionButton
                  onClick={() => {
                    // Cancel closes the entire modal
                    setShowAddItemsView(false);
                    setAddItemsCart([]);
                    setAddItemsSearchQuery('');
                    handleCloseModal();
                  }}
                  style={{ background: 'white', color: '#4B5563', border: '1px solid #C7CED6' }}
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  onClick={handleSubmitAddItems}
                  disabled={addItemsCart.length === 0 || isAddingItems}
                  style={{
                    background: addItemsCart.length === 0 ? '#C7CED6' : '#635BFF',
                    color: 'white',
                    cursor: addItemsCart.length === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isAddingItems ? 'Adding...' : 'Add to Order'}
                </ActionButton>
              </div>
            </div>
          </div>
        </>
      ) : showKitchenTicketView ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          {(() => {
            const storeInfo = getStoreInfo();
            const orderItems = Array.isArray(selectedOrder.order_items) ? selectedOrder.order_items : [];

            const orderData: any = {
              orderNumber: selectedOrder.order_number,
              pickupNumber: selectedOrder.order_number.split('-')[1],
              date: new Date(selectedOrder.order_date || selectedOrder.createdAt),
              orderType: selectedOrder.order_type,
              orderSource: (selectedOrder as any).order_source || 'pos',
              tableNumber: selectedOrder.table_number || null,
              pagerNumber: selectedOrder.pager_number || null,
              customerName: selectedOrder.customer_name || 'Walk-in Customer',
              scheduledPickupTime: selectedOrder.scheduled_pickup_time || null,
              items: orderItems.map((item: any) => ({
                menuItem: {
                  name: item.menu_item_name || item.name || 'Unknown Item',
                  price: parseFloat(item.price || '0'),
                  is_set_menu: item.is_set_menu || false,
                  set_items: item.set_items || []
                },
                quantity: item.quantity || 1,
                options: item.options || []
              })),
              notes: (selectedOrder as any).notes || '',
              takeawayCharge: parseFloat((selectedOrder as any).takeaway_charge || '0')
            };

            // Match the unified POS-counter print path: same station tagging,
            // same HTML template \u2014 preview = real printed ticket, no second format.
            const tagged = tagTicketWithStations(orderData, 'POS COUNTER', getPrinterSettings());
            const htmlContent = generateHTMLKitchenTicket(tagged, storeInfo);
            return (
              <iframe
                srcDoc={htmlContent}
                title="Kitchen Ticket Preview"
                style={{
                  width: '320px',
                  minHeight: '500px',
                  height: '600px',
                  border: '2px solid #333',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  background: 'white'
                }}
              />
            );
          })()}
        </div>
      ) : showReceiptView ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          {(() => {
            const storeInfo = { ...getStoreInfo(), restaurantId: user?.restaurantId || '' };
            const orderItems = Array.isArray(selectedOrder.order_items) ? selectedOrder.order_items : [];

            const orderData = {
              orderNumber: selectedOrder.order_number,
              pickupNumber: selectedOrder.order_number.split('-')[1],
              pagerNumber: selectedOrder.pager_number || null,
              date: new Date(selectedOrder.order_date || selectedOrder.createdAt),
              orderType: selectedOrder.order_type,
              scheduledPickupTime: selectedOrder.scheduled_pickup_time || null,
              currency: operationSettings.currency || 'MYR',
              tableNumber: selectedOrder.table_number || null,
              cashierName: (selectedOrder as any).cashier_name || null,
              customerName: selectedOrder.customer_name || 'Guest',
              items: orderItems.map((item: any) => ({
                menuItem: {
                  name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
                  price: parseFloat(item.price || (item.menuItem && item.menuItem.price) || '0')
                },
                quantity: item.quantity || 1,
                options: item.options || []
              })),
              subtotal: parseFloat((selectedOrder as any).subtotal || '0'),
              discount: parseFloat((selectedOrder as any).discount || '0'),
              discountPolicy: (selectedOrder as any).discount_policy_name ? {
                name: (selectedOrder as any).discount_policy_name,
                amount: parseFloat((selectedOrder as any).discount_policy_amount || '0')
              } : undefined,
              coupon: (selectedOrder as any).coupon_code ? {
                code: (selectedOrder as any).coupon_code,
                discount: parseFloat((selectedOrder as any).coupon_discount || '0')
              } : null,
              takeawayCharge: parseFloat((selectedOrder as any).takeaway_charge || '0'),
              serviceCharge: parseFloat((selectedOrder as any).service_charge || '0'),
              serviceChargeRate: parseFloat((selectedOrder as any).service_charge_rate || '10'),
              tax: parseFloat((selectedOrder as any).tax || '0'),
              taxRate: parseFloat((selectedOrder as any).tax_rate || '6'),
              total: parseFloat((selectedOrder as any).final_price || selectedOrder.total_amount || '0'),
              paymentMethod: selectedOrder.payment_method || 'cash',
              amountReceived: parseFloat((selectedOrder as any).amount_received || '0'),
              change: parseFloat((selectedOrder as any).change || '0'),
              deliveryInfo: (selectedOrder as any).delivery_info || null,
              deliveryFee: parseFloat((selectedOrder as any).delivery_fee || '0')
            };

            const htmlContent = generateHTMLBill(orderData, storeInfo);
            return (
              <iframe
                srcDoc={htmlContent}
                title="Bill Preview"
                style={{
                  width: '320px',
                  minHeight: '500px',
                  height: '600px',
                  border: '2px solid #333',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  background: 'white'
                }}
              />
            );
          })()}
        </div>
      ) : (
        <div style={{ padding: '24px' }}>
          {/* Customer Information */}
          <OrderDetailSection>
            <SectionTitle>{t('orders:liveOrdersPage.customerInformation')}</SectionTitle>
            <DetailRow>
              <DetailLabel>Name:</DetailLabel>
              <DetailValue>{selectedOrder.customer_name || 'Guest'}</DetailValue>
            </DetailRow>
            {selectedOrder.customer_phone && (
              <DetailRow>
                <DetailLabel>Phone:</DetailLabel>
                <DetailValue>{selectedOrder.customer_phone}</DetailValue>
              </DetailRow>
            )}
            <DetailRow>
              <DetailLabel>Order Type:</DetailLabel>
              <DetailValue>{selectedOrder.order_type?.replace('_', ' ').toUpperCase()}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Source:</DetailLabel>
              <DetailValue>{(selectedOrder as any).source === 'mobile' ? 'Mobile Order' : (selectedOrder as any).source === 'kiosk' ? 'Kiosk' : 'POS Terminal'}</DetailValue>
            </DetailRow>
            {(selectedOrder as any).source === 'mobile' && (
              <DetailRow>
                <DetailLabel>Customer Type:</DetailLabel>
                <DetailValue>{(selectedOrder as any).customer_id ? 'Member' : 'Guest'}</DetailValue>
              </DetailRow>
            )}
            {selectedOrder.table_number && (
              <DetailRow>
                <DetailLabel>Table Number:</DetailLabel>
                <DetailValue>{selectedOrder.table_number}{selectedOrder.guest_count ? ` (${selectedOrder.guest_count} guests)` : ''}</DetailValue>
              </DetailRow>
            )}
            {selectedOrder.order_type === 'pickup' && (
              <DetailRow>
                <DetailLabel>Scheduled Pickup:</DetailLabel>
                <DetailValue style={{ color: '#8B5CF6', fontWeight: 600 }}>
                  {selectedOrder.scheduled_pickup_time ? formatPickupTimeRange(selectedOrder.scheduled_pickup_time) : 'ASAP'}
                </DetailValue>
              </DetailRow>
            )}
          </OrderDetailSection>

          {/* Delivery Information */}
          {selectedOrder.order_type === 'delivery' && (selectedOrder as any).delivery_info && (
            <>
              <Divider />
              <OrderDetailSection>
                <SectionTitle>{t('orders:liveOrdersPage.deliveryInformation')}</SectionTitle>
                <DetailRow>
                  <DetailLabel>Address:</DetailLabel>
                  <DetailValue>{(selectedOrder as any).delivery_info.address}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Phone:</DetailLabel>
                  <DetailValue>{(selectedOrder as any).delivery_info.phone}</DetailValue>
                </DetailRow>
                {(selectedOrder as any).delivery_info.zoneName && (
                  <DetailRow>
                    <DetailLabel>Zone:</DetailLabel>
                    <DetailValue>{(selectedOrder as any).delivery_info.zoneName}</DetailValue>
                  </DetailRow>
                )}
                {(selectedOrder as any).delivery_info.notes && (
                  <DetailRow>
                    <DetailLabel>Notes:</DetailLabel>
                    <DetailValue style={{ fontStyle: 'italic' }}>{(selectedOrder as any).delivery_info.notes}</DetailValue>
                  </DetailRow>
                )}
                {(selectedOrder as any).delivery_fee > 0 && (
                  <DetailRow>
                    <DetailLabel>Delivery Fee:</DetailLabel>
                    <DetailValue>{formatCurrency(parseFloat((selectedOrder as any).delivery_fee || '0'), operationSettings.currency)}</DetailValue>
                  </DetailRow>
                )}
              </OrderDetailSection>
            </>
          )}

          <Divider />

          {/* Order Information */}
          <OrderDetailSection>
            <SectionTitle>{t('orders:liveOrdersPage.orderInformation')}</SectionTitle>
            <DetailRow>
              <DetailLabel>Order Time:</DetailLabel>
              <DetailValue>{formatDateTime(selectedOrder.createdAt)}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Status:</DetailLabel>
              <DetailValue>
                <StatusBadge status={selectedOrder.status}>
                  {formatStatusDisplay(selectedOrder.status)}
                </StatusBadge>
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Payment Method:</DetailLabel>
              <DetailValue>{formatPaymentDisplay(selectedOrder.payment_method, (selectedOrder as any).card_type, paymentSettings || undefined)}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Payment Status:</DetailLabel>
              <DetailValue>
                {(selectedOrder.payment_status as any) === 'payment_verification_pending' ? (
                  <span style={{ color: '#F59E0B', fontWeight: 500 }}>{t('orders:liveOrdersPage.verificationPending')}</span>
                ) : (selectedOrder.payment_status as any) === 'rejected' ? (
                  <span style={{ color: '#DC2626', fontWeight: 500 }}>{t('orders:liveOrdersPage.paymentRejected')}</span>
                ) : selectedOrder.payment_status === 'pending' ? (
                  <span style={{ color: '#FF6B6B', fontWeight: 500 }}>{t('orders:liveOrdersPage.pending')}</span>
                ) : selectedOrder.payment_status === 'paid' || selectedOrder.payment_status === 'completed' ? (
                  <span style={{ color: '#10B981', fontWeight: 500 }}>{t('orders:liveOrdersPage.paid')}</span>
                ) : (
                  selectedOrder.payment_status || 'N/A'
                )}
              </DetailValue>
            </DetailRow>
            {selectedOrder.cashier_name && (
              <DetailRow>
                <DetailLabel>Cashier:</DetailLabel>
                <DetailValue>{selectedOrder.cashier_name}</DetailValue>
              </DetailRow>
            )}
          </OrderDetailSection>

          {/* Payment Proof Section - 모든 상태에서 동일하게 전체 표시 */}
          {(() => {
            const currentProof = getProofCurrent((selectedOrder as any).payment_proof);
            const history = getProofHistory((selectedOrder as any).payment_proof);
            // current가 없으면 (rejected 등) history의 마지막 항목을 표시
            const displayProof = currentProof || (history.length > 0 ? history[history.length - 1] : null);
            if (!displayProof) return null;
            const isFromHistory = !currentProof && !!displayProof;
            return (
              <>
                <Divider />
                <OrderDetailSection>
                  <SectionTitle>
                    Customer Submitted Proof
                    {isFromHistory && (
                      <span style={{ marginLeft: '8px', fontSize: '12px', fontWeight: 600, color: '#DC2626' }}>(Rejected)</span>
                    )}
                  </SectionTitle>
                  {displayProof.reference && (
                    <DetailRow>
                      <DetailLabel>Transaction Reference:</DetailLabel>
                      <DetailValue style={{ fontWeight: 600, fontFamily: 'monospace' }}>
                        {displayProof.reference}
                      </DetailValue>
                    </DetailRow>
                  )}
                  {displayProof.file_name && (
                    <DetailRow>
                      <DetailLabel>Receipt File:</DetailLabel>
                      <DetailValue>{displayProof.file_name}</DetailValue>
                    </DetailRow>
                  )}
                  {displayProof.uploaded_at && (
                    <DetailRow>
                      <DetailLabel>Submitted At:</DetailLabel>
                      <DetailValue>
                        {formatDateTime(displayProof.uploaded_at)}
                      </DetailValue>
                    </DetailRow>
                  )}
                  {displayProof.image && (
                    <div style={{ marginTop: '16px' }}>
                      <DetailLabel style={{ marginBottom: '14px' }}>Receipt Image:</DetailLabel>
                      <div style={{ position: 'relative' }}>
                        <img
                          src={displayProof.image}
                          alt="Payment receipt"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '400px',
                            borderRadius: '8px',
                            border: '1px solid #C7CED6',
                            cursor: 'pointer',
                            display: 'block'
                          }}
                          onClick={() => window.open(displayProof.image, '_blank')}
                        />
                      </div>
                    </div>
                  )}
                </OrderDetailSection>
              </>
            );
          })()}

          <Divider />

          {/* Items - grouped by order_group */}
          <OrderDetailSection>
            <SectionTitle>{t('orders:liveOrdersPage.orderItems')}</SectionTitle>
            {(() => {
              const items = selectedOrder.order_items && Array.isArray(selectedOrder.order_items) ? selectedOrder.order_items : [];
              // Add original index to each item for deletion
              const itemsWithIndex = items.map((item: any, idx: number) => ({ ...item, _originalIndex: idx }));
              // Group items by order_group
              const groupedItems: { [key: number]: any[] } = {};
              itemsWithIndex.forEach((item: any) => {
                const group = item.order_group || 0;
                if (!groupedItems[group]) groupedItems[group] = [];
                groupedItems[group].push(item);
              });
              const groupKeys = Object.keys(groupedItems).map(Number).sort((a, b) => a - b);
              const hasMultipleGroups = groupKeys.length > 1 || (groupKeys.length === 1 && groupKeys[0] > 0);

              return groupKeys.map((groupNum) => (
                <div key={groupNum}>
                  {hasMultipleGroups && (
                    <div style={{
                      background: groupNum === 0 ? '#F1F4F8' : '#FEF3C7',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: groupNum === 0 ? '#4B5563' : '#92400E',
                      marginTop: groupNum > 0 ? '12px' : '0',
                      marginBottom: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{groupNum === 0 ? 'Original Order' : `+Order ${groupNum}`}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {groupNum > 0 && groupedItems[groupNum][0]?.added_at && (
                          <span style={{ fontWeight: 400, fontSize: '11px' }}>
                            {formatDateTimeUtil(groupedItems[groupNum][0].added_at, operationSettings, { year: undefined, month: undefined, day: undefined, hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                        <button type="button"
                          onClick={() => handlePrintGroupTicket(groupNum, groupedItems[groupNum])}
                          style={{
                            background: groupNum === 0 ? '#4B5563' : '#F59E0B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '11px',
                            fontWeight: 500,
                            cursor: 'pointer'
                          }}
                          title="Print kitchen ticket for this group"
                        >
                          Print
                        </button>
                      </div>
                    </div>
                  )}
                  {groupedItems[groupNum].map((item: any, idx: number) => (
                    <ItemDetail key={`${groupNum}-${idx}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <ItemInfo style={{ flex: 1 }}>
                        <ItemName>{item.name || item.menuItem?.name || 'Item'}</ItemName>
                        {item.options && item.options.length > 0 && (
                          <ItemOptions>
                            {Array.isArray(item.options) ? item.options.join(', ') : item.options}
                          </ItemOptions>
                        )}
                        <ItemPrice>
                          <span>{item.quantity} × {formatCurrency(parseFloat(item.price || item.menuItem?.price || 0), operationSettings.currency)}</span>
                          <span>{formatCurrency(item.quantity * parseFloat(item.price || item.menuItem?.price || 0), operationSettings.currency)}</span>
                        </ItemPrice>
                      </ItemInfo>
                      {/* Delete button - only show before payment and if more than 1 item */}
                      {selectedOrder.payment_status !== 'completed' && items.length > 1 && (
                        <button type="button"
                          onClick={() => handleDeleteOrderItem(item._originalIndex, item.name || item.menuItem?.name || 'Item')}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            padding: '4px',
                            marginTop: '2px',
                            fontSize: '16px',
                            lineHeight: 1
                          }}
                          title="Remove item"
                        >
                          ×
                        </button>
                      )}
                    </ItemDetail>
                  ))}
                </div>
              ));
            })()}
          </OrderDetailSection>

          <Divider />

          {/* Payment Summary */}
          <TotalSection>
            <TotalRow>
              <span>{t('orders:liveOrdersPage.subtotal')}</span>
              <span>{formatCurrency(Number((selectedOrder as any).subtotal || selectedOrder.total_amount), operationSettings.currency)}</span>
            </TotalRow>
            {(selectedOrder as any).takeaway_charge && parseFloat((selectedOrder as any).takeaway_charge) > 0 && (
              <TotalRow>
                <span>{t('orders:liveOrdersPage.takeawayCharge')}</span>
                <span>{formatCurrency(parseFloat((selectedOrder as any).takeaway_charge), operationSettings.currency)}</span>
              </TotalRow>
            )}
            {(selectedOrder as any).discount > 0 && (
              <TotalRow>
                <span>{t('orders:liveOrdersPage.discount')}</span>
                <span>{formatCurrency(-Number((selectedOrder as any).discount), operationSettings.currency)}</span>
              </TotalRow>
            )}
            {(selectedOrder as any).discount_policy_amount > 0 && (
              <TotalRow>
                <span>Discount ({(selectedOrder as any).discount_policy_name})</span>
                <span>{formatCurrency(-Number((selectedOrder as any).discount_policy_amount), operationSettings.currency)}</span>
              </TotalRow>
            )}
            {(selectedOrder as any).coupon_discount > 0 && (
              <TotalRow>
                <span>Coupon ({(selectedOrder as any).coupon_code})</span>
                <span>{formatCurrency(-Number((selectedOrder as any).coupon_discount), operationSettings.currency)}</span>
              </TotalRow>
            )}
            {Number((selectedOrder as any).point_discount) > 0 && (
              <TotalRow>
                <span>Points ({Number((selectedOrder as any).points_used || 0).toLocaleString()} pts)</span>
                <span>{formatCurrency(-Number((selectedOrder as any).point_discount), operationSettings.currency)}</span>
              </TotalRow>
            )}
            {(selectedOrder as any).service_charge > 0 && (
              <TotalRow>
                <span>Service Charge ({(selectedOrder as any).service_charge_rate || 10}%)</span>
                <span>{formatCurrency(Number((selectedOrder as any).service_charge), operationSettings.currency)}</span>
              </TotalRow>
            )}
            {(selectedOrder as any).tax > 0 && (
              <TotalRow>
                <span>Tax ({(selectedOrder as any).tax_rate || 6}%)</span>
                <span>{formatCurrency(Number((selectedOrder as any).tax), operationSettings.currency)}</span>
              </TotalRow>
            )}
            <TotalRow isTotal>
              <span>{t('orders:liveOrdersPage.total')}</span>
              <span>{formatCurrency(Number(selectedOrder.total_amount), operationSettings.currency)}</span>
            </TotalRow>
          </TotalSection>

          {/* History — 본문 끝 작은 링크. Floor Plan 우측 패널처럼 심플. */}
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button"
              type="button"
              onClick={() => setShowHistory(true)}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: selectedOrder.status === 'cancelled' ? '#DC2626' : '#4B5563',
                fontSize: 11, fontWeight: 500, padding: '2px 4px',
                display: 'inline-flex', alignItems: 'center', gap: 4
              }}
            >
              {selectedOrder.status === 'cancelled'
                ? t('orders:liveOrdersPage.viewCancellationHistory', 'View cancellation history')
                : t('orders:liveOrdersPage.viewOrderHistory', 'View order history')}
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      )}

      {showHistory && (
        <div
          onClick={() => setShowHistory(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 9100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 12, padding: 24,
              width: 560, maxWidth: 'calc(100vw - 32px)',
              maxHeight: '80vh', overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0A2540' }}>
                {t('history.title', 'Order History')}
              </div>
              <button type="button"
                type="button"
                onClick={() => setShowHistory(false)}
                style={{
                  border: 'none', background: '#C7CED6', color: '#0A2540',
                  borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer'
                }}
              >
                {t('history.close', 'Close')}
              </button>
            </div>
            <OrderActionHistory orderId={selectedOrder.id} timeZone={operationSettings?.timeZone} />
          </div>
        </div>
      )}

    </CommonModal>
  );
};

export default OrderDetailModal;
