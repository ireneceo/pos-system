# Communication System UX Specification
## System Inquiry / Operation Inquiry / Notices - Role-based Rules

Last Updated: 2026-02-28

---

## 1. System Overview

### Communication Channels

| Channel | Purpose | Direction | Target |
|---------|---------|-----------|--------|
| **System Inquiry** | Platform issues (billing, technical, feature) | Any role -> System Admin | System Admin |
| **Operation Inquiry** | Restaurant operation issues | Restaurant -> Brand/Foodcourt/Owner | Brand General, Foodcourt General, Restaurant Owner |
| **Notices** | Announcements (one-to-many) | Upper -> Lower roles | Hierarchical broadcasting |

### Role Hierarchy

```
System Admin (Platform)
  |
  +-- Brand General (Brand-level)
  |     +-- Brand Manager (Same permissions)
  |
  +-- Foodcourt General (Foodcourt-level)
  |     +-- Foodcourt Manager (Same permissions)
  |
  +-- Restaurant Owner (Multi-restaurant ownership)
  |
  +-- Restaurant Admin (Single restaurant)
        +-- Staff (POS operation)
```

---

## 2. System Inquiry (support_tickets)

### Role-based Access Rules

| Role | Create | View Own | View All | Reply | Resolve | Assign |
|------|--------|----------|----------|-------|---------|--------|
| System Admin | - | - | ALL | O | O | O |
| Brand General | O | O | Brand's restaurants | - | - | - |
| Foodcourt General | O | O | Foodcourt's restaurants | - | - | - |
| Restaurant Owner | O | O | Owned restaurants | - | - | - |
| Restaurant Admin | O | O | Own restaurant | - | - | - |
| Staff | O | O | Own restaurant | - | - | - |

### Create Ticket Fields

| Field | Restaurant Admin/Staff | Brand/Foodcourt General | Restaurant Owner |
|-------|----------------------|------------------------|-----------------|
| Restaurant | Auto-filled (user.restaurant_id) | Optional (select from managed) | Required (select from owned) |
| Subject | Required | Required | Required |
| Description | Required | Required | Required |
| Priority | low/medium/high/urgent | low/medium/high/urgent | low/medium/high/urgent |
| Category | general/technical/billing/feature-request/bug-report | Same | Same |

### Display Rules

- **System Admin**: Sees all tickets. Can filter by role, restaurant, status, priority.
- **Brand General**: Sees tickets where `restaurantId` IN brand's restaurants, OR `customerId` = own.
- **Foodcourt General**: Sees tickets where `restaurantId` IN foodcourt's restaurants, OR `customerId` = own.
- **Restaurant Owner**: Sees tickets where `restaurantId` IN owned restaurants, OR `customerId` = own.
- **Restaurant Admin/Staff**: Sees tickets where `customerId` = own.

### Issuer/Recipient Display

| Location | Shows |
|----------|-------|
| Ticket Card | Creator name + role badge + restaurant badge |
| Ticket Detail Modal | Creator info (name, email, role), Restaurant name |
| Reply Section | Replier name + timestamp |
| Comment Section | Comment author + role badge + timestamp |

---

## 3. Operation Inquiry (operation_tickets)

### Role-based Access Rules

| Role | Create | View | Respond | Resolve |
|------|--------|------|---------|---------|
| System Admin | - | ALL | - | - |
| Brand General | - | Brand inquiries (inquiryType='brand') | O | O |
| Foodcourt General | - | Foodcourt inquiries (inquiryType='foodcourt') | O | O |
| Restaurant Owner | O (to restaurants) | Owner inquiries (inquiryType='owner') | O | O |
| Restaurant Admin | O (to Brand/Foodcourt/Owner) | Own tickets | - | - |
| Staff | O (to Brand/Foodcourt/Owner) | Own tickets | - | - |

### Inquiry Target Selection (Create Popup)

When Restaurant Admin/Staff creates an inquiry:

```
Inquiry Target: [Dropdown]
  - Foodcourt General  (shown if restaurant has foodcourt connection)
  - Brand General      (shown if restaurant has brand connection)
  - Restaurant Owner   (shown if restaurant has owner connection)
```

- If only ONE target type connected: auto-select, disable dropdown
- If MULTIPLE target types: user must select
- If NONE connected: show "No one connected" message

### inquiryType Values

| Value | Meaning | Target |
|-------|---------|--------|
| `foodcourt` | Inquiry to Foodcourt General | Foodcourt General/Manager |
| `brand` | Inquiry to Brand General | Brand General/Manager |
| `owner` | Inquiry to Restaurant Owner | Restaurant Owner |

### Restaurant Owner as Both Creator and Receiver

**As Receiver** (from Restaurant Admin/Staff):
- Restaurant Admin creates inquiry with `inquiryType='owner'`
- Owner sees all `inquiryType='owner'` tickets from owned restaurants
- Owner can respond, mark in-progress, resolve

**As Creator** (to own restaurants):
- Owner creates inquiry, selects restaurant
- `inquiryType='owner'`, `managerId=owner.id`
- Shows in that restaurant's operation inquiry list

### Display Rules

- **Brand General/Manager**: Sees tickets where `inquiryType='brand'` AND `restaurantId` IN managed restaurants
- **Foodcourt General/Manager**: Sees tickets where `inquiryType='foodcourt'` AND `restaurantId` IN managed restaurants
- **Restaurant Owner**: Sees all tickets where `restaurantId` IN owned restaurants (any inquiryType)
- **Restaurant Admin/Staff**: Sees tickets where `requesterId` = own user ID
- **System Admin**: Sees all tickets (monitoring only, no action)

---

## 4. Notices

### Target Types

| target_type | Sender | Recipients |
|-------------|--------|-----------|
| `all` | System Admin | All restaurants + Brand Generals + Foodcourt Generals + Restaurant Owners |
| `role` | System Admin | Users of selected roles |
| `brand` | Brand General | All restaurants in the brand |
| `foodcourt` | Foodcourt General | All restaurants in the foodcourt |
| `restaurant` | Any (with access) | Specific selected restaurants |
| `individual` | Any (with access) | Specific selected users |

### Role-based Send/Receive

| Role | Can Send | Can Receive | Target Options |
|------|----------|-------------|---------------|
| System Admin | O | - | All Users, By Role, Select Restaurants |
| Brand General | O | O | By Brand, Select Restaurants (within brand) |
| Foodcourt General | O | O | By Foodcourt, Select Restaurants (within foodcourt) |
| Restaurant Owner | O | O | All Owned, Individual Restaurants |
| Restaurant Admin | - | O | - |
| Staff | - | O | - |

### Recipient Creation Logic

| target_type | Recipients Created |
|-------------|-------------------|
| `all` | 1 recipient per restaurant + 1 per Brand General + 1 per Foodcourt General + 1 per Restaurant Owner |
| `role` | Depends on selected roles. Restaurant Admin/Staff -> by restaurant_id |
| `brand` | 1 recipient per restaurant in the brand |
| `foodcourt` | 1 recipient per restaurant in the foodcourt |
| `restaurant` | 1 per selected restaurant |
| `individual` | 1 per selected user |

---

## 5. Sidebar Badge / Notification Rules

### Badge Display Rules

| Menu Item | Badge Condition | Who Sees |
|-----------|----------------|----------|
| **Live Orders** | `pendingOrders > 0` (status='pending') | Restaurant Admin, Staff |
| **System Inquiry** | Unread replies or new tickets | All roles with access |
| **Operation Inquiry** | Open/unanswered tickets | All roles with access |
| **Notices** | Unread notices (read_at IS NULL) | All roles with access |
| **Invoices** | Unpaid invoices (status='pending'/'overdue') | All roles with access |

### Badge Blinking Rules

| State | Visual | Animation |
|-------|--------|-----------|
| No pending items | No badge | - |
| Has pending items | Red dot | `@keyframes blink { 0%,50% { opacity:1 } 51%,100% { opacity:0 } }` 1s infinite |
| Items resolved | Badge disappears | Immediate |

### What Counts as "Pending"

| Channel | Pending For Creator | Pending For Receiver |
|---------|-------------------|---------------------|
| System Inquiry | Has reply (repliedAt != null, not viewed) | New ticket (status='open') |
| Operation Inquiry | Has response (response != null, not viewed) | New ticket (status='open') |
| Notices | - | read_at IS NULL |
| Invoices | - | status IN ('pending', 'overdue') |
| Live Orders | - | status = 'pending' |

---

## 6. Comment System

### Shared across all channels

- Entity types: `support_ticket`, `operation_ticket`, `notice`
- Any authenticated user can comment
- Only comment author can delete their own comment
- System Admin can delete any comment
- Comments displayed chronologically (ASC)

### Internal Notes (is_internal)

Comments can be marked as "internal note" (`is_internal: true`). Internal notes are only visible to users in the same role group as the author.

| Author Role Group | Visible To |
|-------------------|-----------|
| System Admin | System Admin only (sees ALL internals) |
| Brand General / Brand Manager | Brand General, Brand Manager |
| Foodcourt General / Foodcourt Manager | Foodcourt General, Foodcourt Manager |
| Restaurant Admin / Staff | Restaurant Admin, Staff |
| Restaurant Owner | Restaurant Owner only |

**UI Behavior:**
- Checkbox toggle: "Internal note (visible only to your role group)"
- Internal comments have yellow background (`#FFFBEB`) + dashed amber border
- "Internal" badge displayed next to author role
- Placeholder changes to "Write an internal note..." when toggle is on
- Unread badge counts exclude invisible internal comments

### File Attachments

Comments support file attachments (up to 5 per comment).

| Allowed Types | Max Files |
|--------------|-----------|
| Images (jpg, jpeg, png, gif, webp) | 5 per comment |
| Documents (pdf, doc, docx, xls, xlsx) | 5 per comment |
| Archives (zip) | 5 per comment |

**Upload flow:** Files are uploaded via `POST /api/upload/files` first, then attached URLs are sent with the comment body.

### Reusable Component

`components/Common/CommentSection.tsx` - Used across all inquiry/notice detail modals.

Props: `entityType` ('support_ticket' | 'operation_ticket' | 'notice'), `entityId`, `currentUserId`, `onMarkRead`

---

## 7. File Structure

### Backend

```
routes/
  support-tickets.js    - System Inquiry CRUD
  operationTickets.js   - Operation Inquiry CRUD
  notices.js            - Notices CRUD + recipient management
  comments.js           - Polymorphic comments

models/
  SupportTicket.js      - System Inquiry model
  OperationTicket.js    - Operation Inquiry model (inquiryType ENUM: foodcourt/brand/owner)
  Notice.js             - Notice model (target_type, priority, status)
  NoticeRecipient.js    - Notice-Restaurant/User junction
  Comment.js            - Polymorphic comment (entity_type + entity_id, is_internal, attachments)
  CommentRead.js        - Comment read tracking (user_id + entity_type + entity_id)
```

### Frontend Pages

```
pages/
  Admin/
    SystemInquiryPage.tsx          - All tickets, reply, assign, resolve
    NoticesPage.tsx                - Send notices (all, by role, by restaurant)
  Restaurant/
    SystemInquiryPage.tsx          - Create + view own tickets
    OperationInquiryPage.tsx       - Create to Brand/Foodcourt/Owner
    SupportTicketsPage.tsx         - View support tickets
    NoticesPage.tsx                - Receive notices
  Owner/
    OwnerSystemInquiryPage.tsx     - Create + view owned restaurants' tickets
    OwnerOperationInquiryPage.tsx  - View + respond to owned restaurants' tickets
    NoticesPage.tsx                - Send + receive notices
  Brand/
    SystemInquiryPage.tsx          - View brand-related system inquiries
    OperationInquiryPage.tsx       - View + respond (inquiryType='brand')
    NoticesPage.tsx                - Send + receive notices
  Foodcourt/
    SystemInquiryPage.tsx          - View foodcourt-related system inquiries
    OperationInquiryPage.tsx       - View + respond (inquiryType='foodcourt')
    NoticesPage.tsx                - Send + receive notices
  Manager/
    SupportTicketsPage.tsx         - System Inquiry (Brand/Foodcourt Manager)
    SystemInquiryPage.tsx          - System Inquiry (Manager view)
    OperationInquiryPage.tsx       - Operation Inquiry (Brand/Foodcourt Manager)

components/
  Common/
    CommentSection.tsx             - Reusable comment section with internal notes + file attachments
    AttachmentList.tsx             - File attachment display component
    FileUpload.tsx                 - File upload component
```
