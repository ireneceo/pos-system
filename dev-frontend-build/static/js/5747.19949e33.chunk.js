"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5747],{5747:(e,t,n)=>{n.r(t),n.d(t,{default:()=>$e});var r=n(9950),i=n(4752),o=n(4492),a=n(1367),s=n(7447),d=n(5783),l=n(6038),c=n(9018),p=n(5863),u=n(4414);const h=i.Ay.div`
  width: 380px;
  min-width: 380px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    position: absolute;
    inset: 0;
    z-index: 20;
  }
`,x=i.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`,g=i.Ay.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
`,m=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,b=i.Ay.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover { background: #F3F4F6; }
`,f=i.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`,y=i.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
`,v=i.Ay.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`,j=i.Ay.div`
  padding: 14px 20px;
  border-bottom: 1px solid #F0F2F5;
`,w=i.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,$=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`,A=i.Ay.div`
  font-size: 12px;
`,C=i.Ay.span`
  color: #9CA3AF;
  font-weight: 500;
`,F=i.Ay.span`
  color: #0A2540;
  font-weight: 600;
  margin-left: 4px;
`,k=i.Ay.div`
  padding: 5px 0;
  font-size: 10px;
  font-weight: 600;
  color: ${e=>e.$isAdded?"#92400E":"#6B7280"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,S=i.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 0;
  border-bottom: 1px solid #F8FAFC;
  opacity: ${e=>e.$completed?.5:1};

  &:last-child { border-bottom: none; }
`,E=i.Ay.button`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${e=>e.$checked?"#059669":"#D1D5DB"};
  background: ${e=>e.$checked?"#059669":"white"};
  color: white;
  font-size: 11px;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  transition: all 0.15s;

  &:hover {
    border-color: ${e=>e.$checked?"#047857":"#9CA3AF"};
  }
`,D=i.Ay.div`
  flex: 1;
  min-width: 0;
`,B=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.$completed?"line-through":"none"};
`,z=i.Ay.div`
  font-size: 10px;
  color: #6B7C93;
  margin-top: 1px;
`,T=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`,N=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,_=i.Ay.button`
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: #D1D5DB;
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;

  &:hover {
    color: #DC2626;
    background: #FEE2E2;
  }
`,I=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 2px 0;
`,O=i.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  color: #92400E;
  margin-top: 6px;
`,P=i.Ay.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
  border-top: 1px solid #E6EBF1;
`,M=i.Ay.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5A51E6; }";case"success":return"background: #10B981; color: white; border: 1px solid #10B981; &:hover { background: #059669; }";case"secondary":return"background: #F6F9FC; color: #6B7C93; border: 1px solid #E6EBF1; &:hover { background: #E6EBF1; }";case"danger":return"background: white; color: #DC2626; border: 1px solid #FCA5A5; &:hover { background: #FEF2F2; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,R=i.Ay.div`
  display: flex;
  gap: 6px;
`,H=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  padding-bottom: 4px;
`,L=i.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,W=i.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,U=i.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #9CA3AF;

  p {
    margin: 8px 0 0;
    font-size: 13px;
  }
`,q={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},J={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},Z=e=>({preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e]||null),K=e=>{let{tableNumber:t,statusInfo:n,tableInfo:i,currency:o,timezone:a,onClose:d,onNewOrder:K,onAddItems:Y,onStatusChange:V,onPayment:G,onNavigateToPOS:Q,onOrderUpdated:X}=e;const[ee,te]=(0,r.useState)(!1),{getStoreInfo:ne}=(0,c.Pj)(),re=n&&"available"!==n.status,ie=(null===n||void 0===n?void 0:n.orderStatus)||"",oe=(null===n||void 0===n?void 0:n.paymentStatus)||"pending",ae=(e=>{switch(e){case"pending":return{status:"preparing",label:"Start Preparing"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Mark Served"};case"served":return{status:"completed",label:"Complete Order"};default:return null}})(ie),se=(null===n||void 0===n?void 0:n.orderItems)||[],de="completed"!==oe&&!["completed","cancelled"].includes(ie),le=["preparing","ready","served"].includes(ie),ce=re&&s.v[ie]?s.v[ie]:{bg:"#F3F4F6",text:"#9CA3AF",border:"#D1D5DB"},pe=(()=>{switch(oe){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),ue={};se.forEach((e,t)=>{const n=e.order_group||0;ue[n]||(ue[n]=[]),ue[n].push({...e,_originalIndex:t})});const he=Object.keys(ue).map(Number).sort((e,t)=>e-t),xe=e=>{if(!e)return"-";const t=new Date(e),n=a?{timeZone:a}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...n})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...n})},ge=(e,r)=>{if(!n)return null;const i=e||se;return{orderNumber:n.orderNumber||"",pickupNumber:(n.orderNumber||"").split("-")[1]||"",date:n.orderCreatedAt?new Date(n.orderCreatedAt):new Date,orderType:n.orderType||"dine_in",orderSource:n.orderSource||"pos",tableNumber:t||null,pagerNumber:null,customerName:n.customerName||"Walk-in Customer",groupLabel:r,items:i.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:n.notes||"",takeawayCharge:0}},me=async()=>{const e=ge();e&&0!==se.length&&await(0,p.Si)(e,ne())},be=Z(ie),fe=se.some(e=>(e.order_group||0)>0);return(0,u.jsxs)(h,{children:[(0,u.jsxs)(x,{children:[(0,u.jsxs)(g,{children:[(0,u.jsxs)("h3",{children:["Table ",t]}),(0,u.jsxs)(m,{children:[null!==n&&void 0!==n&&n.guestCount?(0,u.jsxs)("span",{children:[n.guestCount," guests"]}):i?(0,u.jsxs)("span",{children:[i.seats," seats"]}):null,re&&(0,u.jsxs)("span",{children:[n.elapsedMinutes,"min"]})]}),re&&(0,u.jsxs)(f,{children:[(0,u.jsx)(y,{$color:ce.text,$bg:ce.bg,children:q[ie]||n.status}),(0,u.jsx)(y,{$color:pe.color,$bg:pe.bg,children:"completed"===oe||"paid"===oe?"Paid":"Unpaid"})]}),!re&&(0,u.jsx)(f,{children:(0,u.jsx)(y,{$color:ce.text,$bg:ce.bg,children:"Available"})})]}),(0,u.jsx)(b,{onClick:d,children:"\xd7"})]}),re?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(v,{children:[(0,u.jsxs)(j,{children:[(0,u.jsxs)(w,{children:["Order ",n.orderNumber||"",n.customerName&&"Walk-in Customer"!==n.customerName?` \u2014 ${n.customerName}`:""]}),(0,u.jsxs)($,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(C,{children:"Customer"}),(0,u.jsx)(F,{children:n.customerName||"Walk-in"})]}),n.customerPhone&&(0,u.jsxs)(A,{children:[(0,u.jsx)(C,{children:"Phone"}),(0,u.jsx)(F,{children:n.customerPhone})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(C,{children:"Type"}),(0,u.jsx)(F,{children:(n.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(C,{children:"Source"}),(0,u.jsx)(F,{children:J[n.orderSource||"pos"]||n.orderSource})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(C,{children:"Time"}),(0,u.jsx)(F,{children:xe(n.orderCreatedAt)})]}),n.paymentMethod&&(0,u.jsxs)(A,{children:[(0,u.jsx)(C,{children:"Payment"}),(0,u.jsx)(F,{children:n.paymentMethod})]}),n.cashierName&&(0,u.jsxs)(A,{children:[(0,u.jsx)(C,{children:"Cashier"}),(0,u.jsx)(F,{children:n.cashierName})]})]})]}),(0,u.jsxs)(j,{children:[(0,u.jsxs)(w,{children:["Items (",se.length,")",le&&se.length>0&&` \u2014 ${se.filter(e=>"completed"===e.status).length}/${se.length} served`]}),he.map(e=>{const t=ue[e],r=e>0,i=t[0];return(0,u.jsxs)("div",{children:[(he.length>1||r)&&(0,u.jsxs)(k,{$isAdded:r,children:[(0,u.jsx)("span",{children:r?`+Added #${e}`:"Original Order"}),r&&(null===i||void 0===i?void 0:i.added_at)&&(0,u.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:xe(i.added_at)})]}),t.map(e=>{const t=e._originalIndex,r="completed"===e.status,i=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,u.jsxs)(S,{$completed:r&&le,children:[le&&(0,u.jsx)(E,{$checked:r,onClick:()=>(async e=>{if(!ee&&null!==n&&void 0!==n&&n.orderId){te(!0);try{const t=se.map((t,n)=>n===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),r=localStorage.getItem("auth_token");(await fetch(`/api/orders/${n.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&["preparing","ready"].includes(ie)&&await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:"served"})}),X())}catch(t){}te(!1)}})(t),disabled:ee,title:r?"Mark as not served":"Mark as served",children:r?"\u2713":""}),(0,u.jsxs)(D,{children:[(0,u.jsxs)(B,{$completed:r,children:[e.name," ",(0,u.jsxs)(N,{children:["x",e.quantity]})]}),i&&(0,u.jsx)(z,{children:i})]}),(0,u.jsx)(T,{children:(0,l.vv)(e.price*e.quantity,o)}),de&&se.length>1&&(0,u.jsx)(_,{onClick:()=>(async(e,t)=>{if(null!==n&&void 0!==n&&n.orderId&&de&&window.confirm(`Delete "${t}" from this order?`))try{const t=localStorage.getItem("auth_token");(await fetch(`/api/orders/${n.orderId}/items/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&X()}catch(r){}})(t,e.name),title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===se.length&&(0,u.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,u.jsxs)(j,{style:{borderBottom:"none"},children:[(0,u.jsx)(w,{children:"Summary"}),(0,u.jsxs)(I,{children:[(0,u.jsx)("span",{children:"Subtotal"}),(0,u.jsx)("span",{children:(0,l.vv)(n.subtotal||0,o)})]}),(n.discountPolicyAmount||0)>0&&(0,u.jsxs)(I,{children:[(0,u.jsxs)("span",{children:["Discount",n.discountPolicyName?` (${n.discountPolicyName})`:""]}),(0,u.jsxs)("span",{children:["-",(0,l.vv)(n.discountPolicyAmount||0,o)]})]}),(n.couponDiscount||0)>0&&(0,u.jsxs)(I,{children:[(0,u.jsxs)("span",{children:["Coupon",n.couponCode?` (${n.couponCode})`:""]}),(0,u.jsxs)("span",{children:["-",(0,l.vv)(n.couponDiscount||0,o)]})]}),(n.pointDiscount||0)>0&&(0,u.jsxs)(I,{children:[(0,u.jsxs)("span",{children:["Points",n.pointsUsed?` (${n.pointsUsed} pts)`:""]}),(0,u.jsxs)("span",{children:["-",(0,l.vv)(n.pointDiscount||0,o)]})]}),(n.discount||0)>0&&!n.couponDiscount&&!n.discountPolicyAmount&&!n.pointDiscount&&(0,u.jsxs)(I,{children:[(0,u.jsx)("span",{children:"Discount"}),(0,u.jsxs)("span",{children:["-",(0,l.vv)(n.discount||0,o)]})]}),(n.serviceCharge||0)>0&&(0,u.jsxs)(I,{children:[(0,u.jsxs)("span",{children:["Svc Charge",n.serviceChargeRate?` (${n.serviceChargeRate}%)`:""]}),(0,u.jsx)("span",{children:(0,l.vv)(n.serviceCharge||0,o)})]}),(n.tax||0)>0&&(0,u.jsxs)(I,{children:[(0,u.jsxs)("span",{children:["Tax",n.taxRate?` (${n.taxRate}%)`:""]}),(0,u.jsx)("span",{children:(0,l.vv)(n.tax||0,o)})]}),(0,u.jsxs)(I,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,u.jsx)("span",{children:"Total"}),(0,u.jsx)("span",{children:(0,l.vv)(n.totalAmount,o)})]}),n.notes&&(0,u.jsx)(O,{children:n.notes})]})]}),(0,u.jsxs)(P,{children:[(0,u.jsxs)(H,{children:[(0,u.jsx)(L,{onClick:async()=>{const e=n?{orderNumber:n.orderNumber||"",pickupNumber:(n.orderNumber||"").split("-")[1]||"",tableNumber:t||null,pagerNumber:null,date:n.orderCreatedAt?new Date(n.orderCreatedAt):new Date,items:se.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),subtotal:parseFloat(String(n.subtotal||0)),discount:parseFloat(String(n.discount||0)),coupon:n.couponCode?{code:n.couponCode,discount:parseFloat(String(n.couponDiscount||0))}:null,serviceCharge:parseFloat(String(n.serviceCharge||0)),serviceChargeRate:parseFloat(String(n.serviceChargeRate||10)),tax:parseFloat(String(n.tax||0)),taxRate:parseFloat(String(n.taxRate||6)),total:parseFloat(String(n.totalAmount||0)),paymentMethod:n.paymentMethod||"cash",amountReceived:0,change:0,cashierName:n.cashierName||null}:null;e&&0!==se.length&&await(0,p.pG)(e,ne())},title:"Print Bill",children:(0,u.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,u.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,u.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,u.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,u.jsx)(L,{onClick:me,title:"Print Order Ticket",children:(0,u.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,u.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),fe&&(0,u.jsx)(L,{onClick:async()=>{if(0===se.length)return;const e=se.map(e=>e.order_group||0),t=Math.max(...e);if(0===t)return void me();const n=se.filter(e=>(e.order_group||0)===t),r=ge(n,`+Order ${t}`);r&&await(0,p.Si)(r,ne())},title:"Print +Order Ticket",style:{background:"#FEF3C7",color:"#92400E"},children:(0,u.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,u.jsx)("path",{d:"M12 4v16m8-8H4"})})}),be&&(0,u.jsx)(L,{onClick:async()=>{if(null===n||void 0===n||!n.orderId||ee)return;const e=Z(ie);if(e){te(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),X()}catch(t){}te(!1)}},title:`Revert to ${q[be]||be}`,children:(0,u.jsx)(W,{children:"\u21ba"})})]}),ae&&n.orderId&&de&&(0,u.jsx)(M,{$variant:"ready"===ie?"success":"primary",onClick:()=>V(n.orderId,ae.status),disabled:ee,children:ae.label}),"payment_verification_pending"===oe&&(0,u.jsx)(M,{$variant:"success",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId){te(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"completed"})}),X()}catch(e){}te(!1)}},disabled:ee,children:"Confirm Payment"}),(0,u.jsxs)(R,{children:[de&&(0,u.jsx)(M,{$variant:"primary",onClick:Y,children:"+ Add Items"}),"pending"===oe&&de&&(0,u.jsx)(M,{$variant:"served"===ie?"success":"secondary",onClick:G,children:"Payment"})]}),de&&"cancelled"!==ie&&(0,u.jsx)(M,{$variant:"danger",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId&&window.confirm("Cancel this order?")){te(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),X()}catch(e){}te(!1)}},disabled:ee,children:"Cancel Order"}),(0,u.jsx)(M,{$variant:"link",onClick:Q,children:"Open in POS Terminal \u2197"})]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(U,{children:[(0,u.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,u.jsx)("p",{children:"This table is available"})]}),(0,u.jsxs)(P,{children:[(0,u.jsx)(M,{$variant:"primary",onClick:K,children:"+ New Order"}),(0,u.jsx)(M,{$variant:"link",onClick:Q,children:"Open in POS Terminal \u2197"})]})]})]})},Y=i.Ay.div`
  background: white;
  padding: 10px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 8px 12px;
    gap: 12px;
  }
`,V=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,G=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,Q=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,X=i.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,ee=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,te=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,ne=e=>{let{tables:t,tableStatuses:n,currency:r}=e;const i=t.length,o={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,d=0,c=0;t.forEach(e=>{const t=n[e.tableNumber],r=(null===t||void 0===t?void 0:t.status)||"available";o[r]++,"available"!==r&&t&&(a+=t.totalAmount,d+=t.elapsedMinutes,c++)});const p=c>0?Math.round(d/c):0;return(0,u.jsxs)(Y,{children:[(0,u.jsx)(V,{children:Object.keys(s.Ez).map(e=>(0,u.jsxs)(G,{children:[(0,u.jsx)(Q,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,u.jsx)(X,{}),(0,u.jsxs)(ee,{children:[(0,u.jsxs)(te,{children:["Tables: ",(0,u.jsx)("span",{children:i})]}),(0,u.jsxs)(te,{children:["Avail: ",(0,u.jsx)("span",{children:o.available})]}),(0,u.jsxs)(te,{children:["Occupied: ",(0,u.jsx)("span",{children:o.occupied})]}),o.ready>0&&(0,u.jsxs)(te,{children:["Ready: ",(0,u.jsx)("span",{children:o.ready})]}),o["needs-attention"]>0&&(0,u.jsxs)(te,{children:["Attn: ",(0,u.jsx)("span",{children:o["needs-attention"]})]}),(0,u.jsx)(X,{}),(0,u.jsxs)(te,{children:["Today: ",(0,u.jsx)("span",{children:(0,l.vv)(a,r)})]}),p>0&&(0,u.jsxs)(te,{children:["Avg: ",(0,u.jsxs)("span",{children:[p,"min"]})]})]})]})};var re=n(8406),ie=n(3422);const oe=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,ae=i.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,se=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,de=i.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,le=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,ce=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,pe=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ue=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,he=i.Ay.button`
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  background: white;
  color: #374151;

  &:hover {
    background: #F3F4F6;
    border-color: #D1D9E0;
  }
`,xe=i.Ay.button`
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  background: white;
  color: #374151;

  &:hover {
    background: #F3F4F6;
  }
`,ge=i.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,me=i.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,be=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,fe=i.Ay.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: white;
  flex-direction: column;
`,ye=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #0A2540;
  flex-shrink: 0;
`,ve=i.Ay.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
`,je=i.Ay.button`
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { background: rgba(255,255,255,0.25); }
`,we=i.Ay.iframe`
  flex: 1;
  width: 100%;
  border: none;
`,$e=()=>{var e;const{restaurantId:t}=(0,o.g)(),n=(0,o.Zp)(),{user:i}=(0,a.As)(),[l,c]=(0,r.useState)(s.He),[p,h]=(0,r.useState)({}),[x,g]=(0,r.useState)(!1),[m,b]=(0,r.useState)(""),[f,y]=(0,r.useState)(!0),[v,j]=(0,r.useState)(""),[w,$]=(0,r.useState)("Asia/Kuala_Lumpur"),A=(0,r.useRef)(null),C=(0,r.useRef)(null),[F,k]=(0,r.useState)(null),[S,E]=(0,r.useState)(!1),[D,B]=(0,r.useState)(""),z=(0,r.useRef)(null);(0,r.useEffect)(()=>{const e=()=>{const e=new Date;b(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:w}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[w]);const T=(0,r.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();h(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),N=(0,r.useCallback)(()=>{A.current&&clearTimeout(A.current),A.current=setTimeout(()=>T(),2e3)},[T]);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const r=await n.json(),i=r.data||r;if(i.floor_plan&&c(i.floor_plan),i.currency&&j(i.currency),i.operation_settings){const e="string"===typeof i.operation_settings?JSON.parse(i.operation_settings):i.operation_settings;$((0,re.ng)(e))}}catch(e){console.error("Failed to load floor plan:",e)}finally{y(!1)}})(),T()},[t,T]),(0,r.useEffect)(()=>{if(!t)return;const e=(0,ie.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{g(!0),e.emit("join-restaurant",t),T()}),e.on("disconnect",()=>g(!1)),e.on("order-updated",()=>N()),e.on("order-created",()=>N()),e.on("order-items-added",()=>N()),e.on("new-order",()=>N()),C.current=e,()=>{e.disconnect(),C.current=null}},[t,T,N]),(0,r.useEffect)(()=>{const e=setInterval(()=>T(),3e4);return()=>clearInterval(e)},[T]),(0,r.useEffect)(()=>{const e=e=>{var t,n;"pos-order-complete"!==(null===(t=e.data)||void 0===t?void 0:t.type)&&"pos-close"!==(null===(n=e.data)||void 0===n?void 0:n.type)||(E(!1),B(""),T())};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[T]);const _=(e,n)=>{const r=new URLSearchParams;r.set("table",e),r.set("from","floor-plan-overlay"),n&&r.set("mode",n),B(`/restaurant/${t}/pos-terminal?${r.toString()}`),E(!0)},I=F?p[F]:void 0,O=F?l.tables.find(e=>e.tableNumber===F):void 0;return f?(0,u.jsxs)(oe,{children:[(0,u.jsx)(ae,{children:(0,u.jsx)(se,{children:(0,u.jsx)(de,{children:"Floor Plan"})})}),(0,u.jsx)(be,{children:"Loading floor plan..."})]}):(0,u.jsxs)(oe,{children:[(0,u.jsxs)(ae,{children:[(0,u.jsxs)(se,{children:[(0,u.jsx)(xe,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,u.jsx)(de,{children:"Floor Plan"}),(0,u.jsxs)(ce,{children:[(0,u.jsx)(le,{$connected:x}),x?"Live":"Offline"]})]}),(0,u.jsxs)(pe,{children:[(0,u.jsx)(ue,{children:m}),"Restaurant Admin"===(null===i||void 0===i?void 0:i.role)&&(0,u.jsx)(he,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,u.jsxs)(ge,{children:[(0,u.jsx)(me,{children:(0,u.jsx)(d.A,{floorPlan:l,tableStatuses:p,onTableClick:e=>{k(t=>t===e?null:e)},selectedTableId:F?null===(e=l.tables.find(e=>e.tableNumber===F))||void 0===e?void 0:e.id:null,currency:v})}),F&&(0,u.jsx)(K,{tableNumber:F,statusInfo:I,tableInfo:O,currency:v,timezone:w,onClose:()=>k(null),onNewOrder:()=>{F&&_(F)},onAddItems:()=>{F&&_(F,"add")},onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await T()}catch(n){console.error("Failed to update order status:",n)}},onPayment:()=>{F&&_(F,"payment")},onNavigateToPOS:()=>{F&&n(`/restaurant/${t}/pos-terminal?table=${F}&from=floor-plan`)},onOrderUpdated:T})]}),(0,u.jsx)(ne,{tables:l.tables,tableStatuses:p,currency:v}),(0,u.jsxs)(fe,{$isOpen:S,children:[(0,u.jsxs)(ye,{children:[(0,u.jsxs)(ve,{children:["POS Terminal \u2014 Table ",F]}),(0,u.jsx)(je,{onClick:()=>{E(!1),B(""),T()},children:"\xd7 Close"})]}),S&&D&&(0,u.jsx)(we,{ref:z,src:D,title:"POS Terminal"})]})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>v});var r=n(9950),i=n(4752),o=n(7447),a=n(4414);const s=i.Ay.div`
  position: absolute;
  left: ${e=>e.$x-e.$w/2}px;
  top: ${e=>e.$y-e.$h/2}px;
  width: ${e=>e.$w}px;
  height: ${e=>e.$h}px;
  background: ${e=>e.$bgColor};
  border: 2.5px solid ${e=>e.$isSelected?"#635BFF":e.$borderColor};
  border-radius: ${e=>"round"===e.$shape?"50%":"8px"};
  transform: rotate(${e=>e.$rotation}deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${e=>e.$isEditing?"grab":"pointer"};
  transition: ${e=>e.$isEditing?"none":"box-shadow 0.15s, transform 0.15s"};
  user-select: none;
  -webkit-user-select: none;
  box-shadow: ${e=>e.$isSelected?"0 0 0 3px rgba(99, 91, 255, 0.3)":"0 1px 3px rgba(0, 0, 0, 0.08)"};
  z-index: ${e=>e.$isSelected?10:1};

  &:hover {
    box-shadow: ${e=>e.$isEditing?e.$isSelected?"0 0 0 3px rgba(99, 91, 255, 0.3)":"0 2px 8px rgba(0, 0, 0, 0.12)":"0 4px 12px rgba(0, 0, 0, 0.15)"};
    ${e=>!e.$isEditing&&"transform: scale(1.03);"}
  }

  &:active {
    ${e=>e.$isEditing&&"cursor: grabbing;"}
  }
`,d=i.Ay.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.$textColor};
  line-height: 1;
`,l=i.Ay.div`
  font-size: 10px;
  font-weight: 500;
  color: ${e=>e.$textColor};
  opacity: 0.7;
  margin-top: 2px;
`,c=i.Ay.div`
  font-size: 9px;
  font-weight: 600;
  color: ${e=>e.$textColor};
  margin-top: 3px;
`,p=new Set(["kitchen","entrance"]),u={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},h=r.memo(e=>{let{table:t,status:n="available",isSelected:r=!1,isEditing:i=!1,onClick:h,onMouseDown:x,onTouchStart:g,statusInfo:m,currency:b=""}=e;const f=t.tableType||"table",y="table"!==f,v=p.has(f),j=y?u[f]||u.kitchen:i?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:!i&&null!==m&&void 0!==m&&m.orderStatus&&o.v[m.orderStatus]?o.v[m.orderStatus]:o.Ez[n],w=y?{...v?{background:"transparent",border:r&&i?"1.5px dashed #635BFF":"none",boxShadow:r&&i?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${r?"#635BFF":j.border}`},cursor:i?"grab":"default",opacity:i?1:.85}:void 0;return(0,a.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:v?"square":t.shape,$rotation:t.rotation,$bgColor:v?"transparent":j.bg,$borderColor:v?"transparent":j.border,$textColor:j.text,$isSelected:r&&!v,$isEditing:i,onClick:e=>{i||!h||y||(e.stopPropagation(),h(t.tableNumber))},onMouseDown:e=>{i&&x&&x(e,t.id)},onTouchStart:e=>{i&&g&&g(e,t.id)},style:w,children:[(0,a.jsx)(d,{$textColor:j.text,style:v?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:void 0,children:t.label||t.tableNumber}),!y&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l,{$textColor:j.text,children:!i&&null!==m&&void 0!==m&&m.guestCount?`${m.guestCount} guests`:`${t.seats} seats`}),!i&&m&&"available"!==n&&(0,a.jsx)(c,{$textColor:j.text,children:{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[m.orderStatus||""]||"Occupied"})]})]})});h.displayName="TableNode";const x=h,g=i.Ay.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  position: relative;
`,m=i.Ay.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
`,b=i.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scale}px ${e=>e.$gridSize/e.$scale}px;
  opacity: 0.5;
`,f=i.Ay.div`
  position: absolute;
  transform-origin: 0 0;
`,y=i.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,v=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:i=!1,selectedTableId:o,onTableClick:s,onTableMouseDown:d,onTableTouchStart:l,onCanvasClick:c,currency:p=""}=e;const u=(0,r.useRef)(null),h=(0,r.useRef)(null),[v,j]=(0,r.useState)(1),[w,$]=(0,r.useState)({x:0,y:0}),A=(0,r.useMemo)(()=>{if(i||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,r=-1/0,o=-1/0;for(const i of t.tables){const t=i.width/2,a=i.height/2;e=Math.min(e,i.x-t),n=Math.min(n,i.y-a),r=Math.max(r,i.x+t),o=Math.max(o,i.y+a)}const a=r-e,s=o-n,d=Math.max(.1*a,40),l=Math.max(.1*s,40);return{x:e-d,y:n-l,w:a+2*d,h:s+2*l}},[t,i]),C=(0,r.useCallback)(()=>{if(!h.current)return;const e=h.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=A.w/e.width,n=A.h/e.height,r=Math.max(t,n);j(r);const i=A.w/r,o=A.h/r;$({x:(e.width-i)/2,y:(e.height-o)/2})},[A]);(0,r.useEffect)(()=>{C();const e=new ResizeObserver(()=>C());return u.current&&e.observe(u.current),()=>e.disconnect()},[C]);const F=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"};return(0,a.jsx)(g,{ref:u,children:(0,a.jsxs)(m,{ref:h,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[i&&t.showGrid&&(0,a.jsx)(b,{$gridSize:t.gridSize,$scale:v}),(0,a.jsx)(f,{"data-scaled-layer":!0,style:{transform:`scale(${1/v})`,left:i?0:w.x-A.x/v+"px",top:i?0:w.y-A.y/v+"px",width:i?`${t.canvasWidth}px`:`${A.w}px`,height:i?`${t.canvasHeight}px`:`${A.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(x,{table:e,status:F(e.tableNumber),isSelected:o===e.id,isEditing:i,onClick:s,onMouseDown:d,onTouchStart:l,statusInfo:n[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,a.jsxs)(y,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),i?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>i,Ez:()=>a,He:()=>r,Zt:()=>s,h_:()=>o,v:()=>d});const r={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},i=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],o=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],a={available:{bg:"#F3F4F6",border:"#D1D5DB",text:"#9CA3AF"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},s={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"},d={outstanding:{bg:"#FEF3C7",text:"#F59E0B",border:"#F59E0B"},pending:{bg:"#FEF3C7",text:"#92400E",border:"#D97706"},preparing:{bg:"#DBEAFE",text:"#1E40AF",border:"#3B82F6"},ready:{bg:"#D1FAE5",text:"#065F46",border:"#10B981"},served:{bg:"#D1FAE5",text:"#065F46",border:"#10B981"},completed:{bg:"#E5E7EB",text:"#374151",border:"#9CA3AF"},cancelled:{bg:"#FEE2E2",text:"#991B1B",border:"#DC2626"},awaiting_payment:{bg:"#FEF3C7",text:"#92400E",border:"#D97706"}}},8406:(e,t,n)=>{n.d(t,{MQ:()=>d,Vp:()=>s,fU:()=>o,ng:()=>r,oB:()=>a,r6:()=>i});const r=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",i=(e,t,n)=>{if(!e)return"";const i=new Date(e);if(isNaN(i.getTime()))return"";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:r(t)};return i.toLocaleString("en-MY",{...o,...n})},o=(e,t)=>i(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const n=new Date;n.setDate(n.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(n)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const n=Date.now()-t,r=Math.floor(n/6e4),i=Math.floor(n/36e5),o=Math.floor(n/864e5);return r<1?"just now":1===r?"1 min ago":r<60?`${r} mins ago`:1===i?"1 hour ago":i<24?`${i} hours ago`:1===o?"1 day ago":`${o} days ago`}}}]);