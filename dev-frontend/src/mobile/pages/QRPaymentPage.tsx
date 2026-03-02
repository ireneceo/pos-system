import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { formatCurrency } from '../../utils/currency';
// import QRCode from 'qrcode'; // Temporarily disabled for testing

const Container = styled.div`
  padding: 24px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
`;

const QRSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px 0;
`;

const AmountDisplay = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #635BFF;
  margin: 16px 0;
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 0;
`;

const InstructionBox = styled.div`
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

const InstructionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1E40AF;
  margin-bottom: 8px;
`;

const InstructionText = styled.div`
  font-size: 13px;
  color: #1E40AF;
  line-height: 1.6;
`;

const ProofSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const UploadArea = styled.div`
  border: 2px dashed #E5E7EB;
  border-radius: 12px;
  padding: 32px 16px;
  text-align: center;
  background: #FAFBFC;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 16px;

  &:hover {
    border-color: #635BFF;
    background: rgba(99, 91, 255, 0.02);
  }
`;

const UploadText = styled.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
`;

const UploadHint = styled.div`
  font-size: 12px;
  color: #9CA3AF;
`;

const ImagePreview = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  border: 1px solid #E5E7EB;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const OrDivider = styled.div`
  text-align: center;
  margin: 24px 0;
  color: #9CA3AF;
  font-size: 14px;
  font-weight: 500;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 42%;
    height: 1px;
    background: #E5E7EB;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 16px; /* Prevents iOS/mobile auto-zoom on focus */
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const SubmitButton = styled.button`
  position: fixed;
  bottom: 68px; /* Space for bottom navigation */
  left: 0;
  right: 0;
  background: #635BFF;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 101;

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const DownloadButton = styled.button`
  background: none;
  border: none;
  color: #1F2937;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-top: 8px;
  text-decoration: underline;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const QRPaymentPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentOrder, clearCart, currentStore, currency } = useMobileOrder();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get order data from sessionStorage or location state
  const sessionData = sessionStorage.getItem('pendingOrderData');
  const orderData = sessionData ? JSON.parse(sessionData) : (location.state as any);
  const total = orderData?.total_amount || orderData?.total || 0;
  const orderId = orderData?.id;

  console.log('🔵 QRPaymentPage - orderData:', orderData);
  console.log('🔵 QRPaymentPage - orderId:', orderId);
  console.log('🔵 QRPaymentPage - total:', total);

  const [paymentProofImage, setPaymentProofImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [transferReference, setTransferReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  // Load QR code from restaurant settings
  React.useEffect(() => {
    const loadQRCode = async () => {
      try {
        if (!currentStore?.id) {
          console.warn('⚠️ No currentStore.id available, cannot load QR code');
          return;
        }

        const response = await fetch(`/api/restaurants/${currentStore.id}`);
        if (response.ok) {
          const data = await response.json();
          const restaurant = data.data || data;

          // Get QR code image from payment settings (support both 'qrPayment' and 'qr' keys)
          const qrSettings = restaurant.payment_settings?.qrPayment || restaurant.payment_settings?.qr;
          if (qrSettings?.qrImage) {
            setQrCodeImage(qrSettings.qrImage);
            console.log('✅ QR Code image loaded from settings');
          } else {
            console.log('❌ No QR image found in payment settings');
          }
        }
      } catch (error) {
        console.error('Failed to load QR code:', error);
      }
    };

    loadQRCode();
  }, [currentStore?.id]);

  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentProofImage(reader.result as string);
      setUploadedFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setPaymentProofImage(null);
    setUploadedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadQR = () => {
    if (!qrCodeImage) {
      alert('QR Code image not available');
      return;
    }

    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = `QR-Payment-${total.toFixed(2)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async () => {
    if (!paymentProofImage && !transferReference) {
      alert('Please upload payment receipt or enter transaction reference number');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get pending order data from sessionStorage
      const pendingOrderDataStr = sessionStorage.getItem('pendingOrderData');
      if (!pendingOrderDataStr) {
        alert('Order data not found. Please go back and try again.');
        setIsSubmitting(false);
        return;
      }

      const pendingOrderData = JSON.parse(pendingOrderDataStr);

      // Create order in DATABASE with payment proof
      const dbOrderData = {
        ...pendingOrderData,
        payment_status: 'payment_verification_pending',
        payment_proof: {
          image: paymentProofImage,
          reference: transferReference,
          file_name: uploadedFileName,
          uploaded_at: new Date().toISOString()
        }
      };

      console.log('💾 Creating order with payment proof in DATABASE...');
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbOrderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order in database');
      }

      const result = await response.json();
      const savedOrder = result.data;
      console.log('✅ Order created in DB with ID:', savedOrder.id);

      // Get order number and pickup number from backend response
      const backendOrderNumber = savedOrder.order_number;
      const backendPickupNumber = backendOrderNumber ? backendOrderNumber.split('-')[1] : '001';

      // Save order ID to localStorage for customer order history
      const customerOrderIds = JSON.parse(localStorage.getItem('customerOrderIds') || '[]');
      if (!customerOrderIds.includes(savedOrder.id)) {
        customerOrderIds.push(savedOrder.id);
        localStorage.setItem('customerOrderIds', JSON.stringify(customerOrderIds));
      }

      // Set current order and clear cart
      setCurrentOrder({
        id: savedOrder.id,
        pickupNumber: backendPickupNumber,
        items: pendingOrderData.order_items,
        total: pendingOrderData.total_amount,
        status: 'outstanding',
        createdAt: new Date(),
        estimatedPickupTime: new Date(Date.now() + 30 * 60000),
        paymentStatus: 'pending' as any // payment_verification_pending is backend only
      });
      clearCart();

      // Clear pending order data
      sessionStorage.removeItem('pendingOrderData');

      // Navigate to order tracking
      navigate(`/mobile/${slug}/order/${savedOrder.id}`);
    } catch (error) {
      console.error('Error submitting payment proof:', error);
      alert('Failed to submit payment proof. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileLayout
      title="QR Payment"
      showBack
      onBack={() => navigate(`/mobile/${slug}/payment`)}
    >
      <Container>
        <QRSection>
          <AmountDisplay>{formatCurrency(total, currency)}</AmountDisplay>

          <QRCodeContainer>
            {qrCodeImage ? (
              <>
                <img
                  src={qrCodeImage}
                  alt="QR Code for Payment"
                  style={{
                    width: '280px',
                    height: '280px',
                    borderRadius: '12px',
                    objectFit: 'contain'
                  }}
                />
                <DownloadButton onClick={handleDownloadQR}>
                  Download QR Code
                </DownloadButton>
              </>
            ) : (
              <div style={{
                width: '280px',
                height: '280px',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                color: '#6B7280',
                fontSize: '16px',
                fontWeight: '600',
                textAlign: 'center',
                padding: '20px',
                border: '1px solid #E5E7EB'
              }}>
                QR Code<br/>
                (Loading...)<br/>
                {formatCurrency(total, currency)}
              </div>
            )}
          </QRCodeContainer>
        </QRSection>

        <InstructionBox>
          <InstructionTitle>📱 How to Pay</InstructionTitle>
          <InstructionText>
            1. Open your banking app (Maybank, CIMB, etc.)<br />
            2. Select "Scan & Pay" or "DuitNow QR"<br />
            3. Scan the QR code above<br />
            4. Complete payment in your banking app<br />
            5. Upload payment screenshot or enter reference number below
          </InstructionText>
        </InstructionBox>

        <ProofSection>
          <SectionTitle>Payment Proof</SectionTitle>

          {!paymentProofImage ? (
            <UploadArea
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <UploadText>Upload Payment Screenshot</UploadText>
              <UploadHint>PNG, JPG up to 5MB</UploadHint>
            </UploadArea>
          ) : (
            <ImagePreview>
              <img src={paymentProofImage} alt="Payment receipt" />
              <RemoveImageButton onClick={handleRemoveImage}>×</RemoveImageButton>
            </ImagePreview>
          )}

          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {uploadedFileName && (
            <div style={{
              fontSize: '13px',
              color: '#059669',
              marginBottom: '16px',
              padding: '8px 12px',
              background: '#F0FDF4',
              borderRadius: '6px'
            }}>
              ✓ {uploadedFileName}
            </div>
          )}

          <OrDivider>OR</OrDivider>

          <Input
            type="text"
            placeholder="Enter Transaction Reference Number"
            value={transferReference}
            onChange={(e) => setTransferReference(e.target.value)}
          />
        </ProofSection>
      </Container>

      <SubmitButton
        onClick={handleSubmit}
        disabled={isSubmitting || (!paymentProofImage && !transferReference)}
      >
        {isSubmitting ? 'Submitting...' : 'Confirm Payment'}
      </SubmitButton>
    </MobileLayout>
  );
};

export default QRPaymentPage;
