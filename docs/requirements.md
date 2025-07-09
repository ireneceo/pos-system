# OrderHere POS System - Requirements Specification

## 1. System Overview

### Business Model
- **Target**: Food Court (Single Location)
- **Subscription**: RM 70 per month
- **Operation**: Prepaid payment + Takeaway/Pickup focused
- **Tables**: None (Pickup number system)

---

## 2. Core Features

### 2.1 Integrated Order System

#### Order Processing (2 Methods)
**A. POS Orders (Staff)**
- Staff order processing via POS terminal
- Cash/Card payment support
- Staff discount privileges
- Large touch button UI

**B. Customer Self-Order**
- QR code scan → Mobile ordering
- Card/Digital payment only
- Automatic discount application
- Mobile-optimized UI

#### Common Order Process
1. **Menu Selection** → Category-based menu display
2. **Option Selection** → Spice level, size, toppings, etc.
3. **Quantity Adjustment** → +/- buttons for quantity
4. **Shopping Cart** → Confirm selected items
5. **Order Confirmation** → Final order review
6. **Payment Processing** → Immediate payment (prepaid)
7. **Pickup Number** → Auto-generated number
8. **Kitchen Transfer** → Real-time kitchen display

#### Order Processing Flow
1. **Order Received** (POS or Mobile)
2. **Payment Completed** → Kitchen transfer + Pickup number issued
3. **Cooking** → Kitchen display shows status
4. **Cooking Complete** → Pickup waiting status
5. **Pickup Complete** → Order closed

#### Pickup Number System
- Auto pickup number generation (001, 002...)
- Large display shows completed numbers
- Pickup confirmation button

### 2.2 Payment System

#### A. Customer Payment System (Food Court Revenue)
**POS Payment**
- **Cash Payment**: Accept cash and calculate change
- **Card Payment**: POS-integrated card terminal
- **Staff Discount**: Special discount privileges

**Customer Self Payment**
- **Card Payment**: Online card payment
- **Digital Payment**: KakaoPay, PayPal, etc.
- **Auto Discount**: Automatic promotion application

**Common Processing**
- **Prepaid System**: Payment required upon ordering
- Automatic receipt generation
- Tax calculation (VAT included)
- Daily sales reconciliation

#### B. Solution Subscription Payment System
**Subscription Management**
- Monthly RM 70 auto-payment
- Service suspension warning on payment failure
- Payment history management
- Automatic tax invoice generation

**Payment Methods**
- Auto credit card payment (Stripe)
- Bank transfer
- PayPal payment

### 2.3 Menu Management

#### Menu Structure
- **Categories**: Korean, Chinese, Japanese, Western, Beverages, etc.
- **Menu Information**: Name, price, image, brief description
- **Options**: Spice level, size, additional toppings

#### Menu Operations
- **Sold Out Management**: Real-time sold out settings
- **Price Management**: Immediate price updates
- **Time-based Menu**: Breakfast/Lunch/Dinner menu separation

### 2.4 Kitchen Management

#### Kitchen Display System (KDS)
- Real-time order list display
- Cooking time display per menu
- Cooking complete button
- Priority display (waiting time order)

#### Cooking Management
- Expected cooking time settings
- Cooking queue management
- Allergy/special requirements display

### 2.5 Inventory Management

#### Basic Inventory Tracking
- Main ingredient inventory status
- Low stock alerts (minimum quantity settings)
- Daily inventory consumption tracking

#### Inventory Management
- Manual stock-in processing
- Automatic inventory deduction on sales
- Inventory adjustment features
- Waste disposal processing

---

## 3. Admin System (Solution Management)

### 3.1 Solution User Management

#### Customer Registration/Management
- **Registration Approval**: New food court registration review
- **Account Management**: Business info, contacts, business registration
- **Profile Approval**: Business logo and info review/approval
- **Service Status**: Active/Suspended/Terminated management
- **Support Requests**: Customer inquiries and support tickets

#### Subscription Management
- **Subscription Status**: Overall customer subscription status
- **Payment Management**: Payment success/failure monitoring
- **Revenue Settlement**: Monthly revenue settlement
- **Refund Processing**: Mid-term cancellation refund management

### 3.2 System Monitoring

#### Performance Management
- **Server Status**: CPU, memory, disk usage
- **Traffic Monitoring**: Concurrent users, response time
- **Error Logs**: System error tracking
- **Backup Status**: Data backup verification

#### Usage Analytics
- **Customer Usage**: Order count, sales amount per customer
- **Feature Usage**: Most used features analysis
- **Performance Issues**: Slow response, error occurrence points

### 3.3 Operations Management

#### System Updates
- **Version Management**: New feature deployment
- **Emergency Patches**: Bug fix deployment
- **Announcements**: Customer notifications

#### Customer Support
- **Support Tickets**: Customer inquiry processing
- **Remote Support**: Screen sharing support
- **Training Materials**: Usage guide provision

---

## 4. Food Court Operations Management

### 4.1 Sales Management

#### Real-time Sales
- Daily sales status
- Hourly sales
- Sales by menu item

#### Daily Settlement
- Daily sales summary
- Cash/Card reconciliation
- Sales report generation

### 4.2 Staff Management

#### Basic Staff Management
- Staff registration/permission settings
- Work hours recording
- Sales performance tracking

### 4.3 Customer Management (Basic)

#### Basic Customer Information
- Phone number-based customer recognition
- Order history storage
- Regular customer management

### 4.4 Food Court Business Profile Management

#### Business Basic Information
- **Business Name**: Food court brand name
- **Business Registration Number**: Business verification
- **Representative Name**: Representative information
- **Business Logo**: Brand logo upload (for receipts, displays)
- **Business Type**: Korean, Chinese, Japanese, Western, Beverages, etc.

#### Contact Information
- **Store Address**: Food court location
- **Phone Number**: Store contact
- **Email**: Manager email
- **Contact Person**: Working contact person

#### Operating Information
- **Operating Hours**: Open/Close time settings
- **Closed Days**: Regular closure days
- **Store Introduction**: Brief store description
- **Special Notes**: Halal, Vegan specialization info

#### System Settings
- **Timezone**: Local timezone setting
- **Currency**: Local currency setting (Ringgit, Won, etc.)
- **Language**: System display language
- **Receipt Settings**: Business info display settings

#### Branding Settings
- **Color Theme**: POS system color customization
- **Font Settings**: Menu display font
- **Background Image**: Standby screen background
- **Music Settings**: Store BGM integration (optional)

---

## 5. System Features

### 5.1 Integrated UI System

#### A. POS Terminal UI (Staff)
- **Business Branding**: Logo, color theme application
- **Large Menu Buttons**: Touch-friendly large buttons (15-inch optimized)
- **Quick Payment**: Cash/Card one-click payment
- **Staff Functions**: Discount, order modification, cancellation privileges
- **Pickup Number**: Large font number display
- **Sold Out Management**: Real-time sold out settings

#### B. Customer Mobile UI
- **Mobile Optimized**: Smartphone touch optimized
- **Intuitive Menu**: High-quality food images
- **Simple Ordering**: 3-step order process
- **Payment Integration**: Card/Digital payment one-click
- **Order Tracking**: Real-time cooking status check
- **Multi-language Support**: Local language support

#### Common Features
- **Real-time Menu**: Sold out/price real-time sync
- **Option Selection**: Same option system
- **Shopping Cart**: Same cart logic
- **Receipt**: Same receipt format

### 5.2 Customer Display

#### Pickup Number Display
- **Business Branding**: Logo, color theme application
- Large monitor pickup completion number display
- Current cooking order number display
- Expected waiting time display
- **Business Advertising**: Business promotion during idle time

### 5.3 Kitchen Display

#### Kitchen Monitor
- Order list real-time updates
- Clear cooking order display
- Special requirements/allergy info emphasis

---

## 6. Data Management

### 6.1 Basic Analytics

#### Sales Analytics
- Daily/Weekly/Monthly sales trends
- Popular menu rankings
- Hourly sales patterns

#### Operations Analytics
- Average order waiting time
- Cooking time per menu
- Inventory turnover rate

---

## Future Development Features

### 7. Extended Features (Phase 2)

#### 7.1 Advanced Customer Ordering
- **Kiosk Integration**: In-store self-service kiosks
- **Voice Ordering**: AI voice recognition ordering
- **Multi-language Expansion**: More language support
- **Accessibility**: Visual/Hearing impaired support

#### 7.2 Advanced Payment
- Digital payment integration (KakaoPay, PayPal, etc.)
- Coupon/Discount system
- Point accumulation

#### 7.3 Marketing Features
- Customer data analytics
- Personalized promotions
- Push notifications

#### 7.4 Multi-location Management
- Food court chain management
- Integrated dashboard
- Location-based performance analysis

#### 7.5 Advanced Analytics
- AI-based demand forecasting
- Automatic ordering system
- Customer behavior analysis

#### 7.6 Integrated Management
- General restaurant mode addition
- Table management system
- Post-payment system

---

## Technical Requirements

### Basic Architecture
- **Web-based**: HTML/CSS/JavaScript + PHP
- **Database**: MySQL
- **Cloud**: Plesk server environment
- **Payment**: Stripe basic integration

### Real-time Processing (Stability Guaranteed)
- **Socket.IO**: Auto-reconnection + fallback support
- **Hybrid Method**: WebSocket priority, HTTP polling on failure
- **Data Sync**: Important data DB storage then real-time transmission
- **Auto Recovery**: Auto-reconnection on network issues (5-second intervals)
- **Polling Backup**: 3-second status check on WebSocket failure

### Security/Performance
- SSL encryption
- Basic permission management
- Local caching
- Data backup

---

## UI/UX Requirements

### POS Terminal
- 15-inch+ touchscreen optimization
- Intuitive icons and large buttons
- Fast response (within 1 second)
- Error prevention confirmation windows

### Customer Display
- 32-inch+ monitor recommended
- Clear number display (72pt+)
- Color distinction (waiting/complete)
- Sound notification options

### Kitchen Display
- 24-inch waterproof monitor
- Clear cooking order display
- Touch buttons (cooking complete)
- Notification sound settings

---

**📋 This document serves as the Single Source of Truth for all development activities.**