import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useOrders } from '../../contexts/OrderContext';

const PageContainer = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    background: #5A51E6;
  }
`;

const BillContainer = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media print {
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 10mm !important;
    margin: 0 !important;
    width: 80mm !important;
    max-width: 80mm !important;
  }
`;

const BillHeader = styled.div`
  text-align: center;
  border-bottom: 2px solid #E6EBF1;
  padding-bottom: 24px;
  margin-bottom: 24px;
`;

const StoreName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const StoreInfo = styled.div`
  color: #6B7280;
  font-size: 14px;
  line-height: 1.6;
`;

const BillSection = styled.div`
  margin-bottom: 20px;
`;

const BillRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  
  &.total {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #E6EBF1;
    font-size: 18px;
    font-weight: 600;
  }
`;

const Label = styled.span`
  color: #6B7280;
`;

const Value = styled.span`
  color: #1F2937;
  font-weight: 500;
`;

const ItemsTable = styled.table`
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 0;
  border-bottom: 2px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  
  &:last-child {
    text-align: right;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #F3F4F6;
`;

const TableCell = styled.td`
  padding: 12px 0;
  font-size: 14px;
  color: #1F2937;
  
  &:last-child {
    text-align: right;
    font-weight: 500;
  }
`;

const ItemName = styled.div`
  font-weight: 500;
`;

const ItemOptions = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`;

const PrintButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 12px 32px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    background: #5A51E6;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  color: #6B7280;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px dashed #E6EBF1;
  font-size: 12px;
  color: #6B7280;
`;

const BillPrintPage: React.FC = () => {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleSearch = () => {
    const order = orders.find(o => 
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.phone.includes(searchTerm)
    );
    setSelectedOrder(order);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('en-MY', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <MainLayout>
      <PageContainer className="no-print">
        <PageHeader>
          <Title>Bill Print</Title>
        </PageHeader>

        <SearchSection>
          <SearchInput
            type="text"
            placeholder="Search by order number or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton onClick={handleSearch}>
            Search Order
          </SearchButton>
        </SearchSection>

        {selectedOrder && ReactDOM.createPortal(
          <BillContainer data-print-bill>
            <BillHeader>
              <StoreName>FOODCOURT CENTRAL</StoreName>
              <StoreInfo>
                123 Main Street, City Center<br />
                Tel: +60 3-1234-5678<br />
                GST Reg No: 000123456789
              </StoreInfo>
            </BillHeader>

            <BillSection>
              <BillRow>
                <Label>Order No:</Label>
                <Value>{selectedOrder.orderNumber}</Value>
              </BillRow>
              <BillRow>
                <Label>Date:</Label>
                <Value>{formatDateTime(selectedOrder.createdAt)}</Value>
              </BillRow>
              <BillRow>
                <Label>Cashier:</Label>
                <Value>POS Terminal</Value>
              </BillRow>
              <BillRow>
                <Label>Customer:</Label>
                <Value>{selectedOrder.customer.name}</Value>
              </BillRow>
              <BillRow>
                <Label>Phone:</Label>
                <Value>{selectedOrder.customer.phone}</Value>
              </BillRow>
            </BillSection>

            <ItemsTable>
              <thead>
                <tr>
                  <TableHeader style={{ width: '60%' }}>Item</TableHeader>
                  <TableHeader style={{ width: '15%' }}>Qty</TableHeader>
                  <TableHeader style={{ width: '12.5%' }}>Price</TableHeader>
                  <TableHeader style={{ width: '12.5%' }}>Total</TableHeader>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <ItemName>{item.menuItem.name}</ItemName>
                      {item.options && item.options.length > 0 && (
                        <ItemOptions>{item.options.join(', ')}</ItemOptions>
                      )}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>RM {item.menuItem.price.toFixed(2)}</TableCell>
                    <TableCell>RM {(item.quantity * item.menuItem.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </ItemsTable>

            <BillSection>
              <BillRow>
                <Label>Subtotal:</Label>
                <Value>RM {selectedOrder.subtotal.toFixed(2)}</Value>
              </BillRow>
              {selectedOrder.discount > 0 && (
                <BillRow>
                  <Label>Discount:</Label>
                  <Value style={{ color: '#10B981' }}>-RM {selectedOrder.discount.toFixed(2)}</Value>
                </BillRow>
              )}
              {selectedOrder.coupon && (
                <BillRow>
                  <Label>Coupon ({selectedOrder.coupon.code}):</Label>
                  <Value style={{ color: '#10B981' }}>-RM {selectedOrder.coupon.amount.toFixed(2)}</Value>
                </BillRow>
              )}
              {selectedOrder.takeawayCharge > 0 && (
                <BillRow>
                  <Label>Takeaway Charge:</Label>
                  <Value>RM {selectedOrder.takeawayCharge.toFixed(2)}</Value>
                </BillRow>
              )}
              {selectedOrder.tax > 0 && (
                <BillRow>
                  <Label>Tax (6%):</Label>
                  <Value>RM {selectedOrder.tax.toFixed(2)}</Value>
                </BillRow>
              )}
              <BillRow className="total">
                <Label>TOTAL:</Label>
                <Value>RM {selectedOrder.total.toFixed(2)}</Value>
              </BillRow>
            </BillSection>

            <BillSection>
              <BillRow>
                <Label>Payment Method:</Label>
                <Value>{selectedOrder.paymentMethod.toUpperCase()}</Value>
              </BillRow>
              <BillRow>
                <Label>Order Type:</Label>
                <Value>{selectedOrder.orderType === 'dine-in' ? 'DINE IN' : 'TAKEAWAY'}</Value>
              </BillRow>
              {selectedOrder.orderType === 'takeaway' && (
                <BillRow>
                  <Label>Pickup Number:</Label>
                  <Value style={{ fontSize: '20px', fontWeight: '700' }}>
                    {selectedOrder.orderNumber.split('-')[1] || '000'}
                  </Value>
                </BillRow>
              )}
            </BillSection>

            <Footer>
              <div>Thank you for your order!</div>
              <div>Please keep this receipt for your records</div>
            </Footer>

            <PrintButton onClick={handlePrint}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Print Bill
            </PrintButton>
          </BillContainer>,
          document.body
        )}

        {!selectedOrder && searchTerm && (
          <EmptyState>
            <p>No order found with that order number or phone number.</p>
          </EmptyState>
        )}
      </PageContainer>

      {/* Print-only styles */}
      <style>{`
        @media print {
          @page {
            size: 80mm auto;
            margin: 0mm;
          }

          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          .no-print {
            display: none !important;
          }

          [data-print-bill] {
            display: block !important;
            width: 80mm !important;
            max-width: 80mm !important;
            margin: 0 !important;
            padding: 5mm !important;
            background: white !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          [data-print-bill] button {
            display: none !important;
          }
        }
      `}</style>
    </MainLayout>
  );
};

export default BillPrintPage;