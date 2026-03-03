"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4963],{4963:(e,t,n)=>{n.r(t),n.d(t,{default:()=>St});var r=n(9950),i=n(4752),o=n(4492),a=n(1367),s=n(7447),d=n(5783),l=n(6038),c=n(4414);const p=i.Ay.div`
  width: 340px;
  min-width: 340px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

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
`,u=i.Ay.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
`,h=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,g=i.Ay.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;

  &:hover { background: #F3F4F6; }
`,b=i.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
  margin-top: 6px;
`,m=i.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #F0F2F5;
`,f=i.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
`,y=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,v=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`,j=i.Ay.span`
  color: #374151;
  font-weight: 500;
`,w=i.Ay.span`
  color: #9CA3AF;
  font-size: 12px;
  margin-left: 4px;
`,A=i.Ay.span`
  color: #0A2540;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 3px 0;
`,C=i.Ay.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
`,$=i.Ay.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5046E5; }";case"success":return"background: #059669; color: white; &:hover { background: #047857; }";case"secondary":return"background: #F3F4F6; color: #374151; border: 1px solid #E6EBF1; &:hover { background: #E5E7EB; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,k=i.Ay.div`
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
`,E={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed"},S=e=>{let{tableNumber:t,statusInfo:n,tableInfo:r,currency:i,onClose:o,onNewOrder:a,onAddItems:d,onStatusChange:S,onPayment:B,onNavigateToPOS:z,onViewOrder:I}=e;const O=n&&"available"!==n.status,T=(null===n||void 0===n?void 0:n.orderStatus)||"",D=(e=>{switch(e){case"pending":return{status:"preparing",label:"Start Preparing"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Mark Served"};case"served":return{status:"completed",label:"Complete Order"};default:return null}})(T),P=O?s.Ez[n.status]:s.Ez.available;return(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsxs)(u,{children:[(0,c.jsxs)("h3",{children:["Table ",t]}),(0,c.jsxs)(h,{children:[null!==n&&void 0!==n&&n.guestCount?(0,c.jsxs)("span",{children:[n.guestCount," guests"]}):r?(0,c.jsxs)("span",{children:[r.seats," seats"]}):null,O&&(0,c.jsxs)("span",{children:[n.elapsedMinutes,"min"]})]}),(0,c.jsx)(b,{$color:P.text,$bg:P.bg,children:O?E[T]||n.status:"Available"})]}),(0,c.jsx)(g,{onClick:o,children:"\xd7"})]}),O?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(m,{children:[(0,c.jsxs)(f,{children:["Order ",n.orderNumber||"",n.customerName&&"Walk-in Customer"!==n.customerName?` \u2014 ${n.customerName}`:""]}),(0,c.jsx)(y,{children:n.orderItems&&n.orderItems.length>0?n.orderItems.map((e,t)=>(0,c.jsxs)(v,{children:[(0,c.jsxs)("span",{children:[(0,c.jsx)(j,{children:e.name}),(0,c.jsxs)(w,{children:["x",e.quantity]})]}),(0,c.jsx)(A,{children:(0,l.vv)(e.price*e.quantity,i)})]},t)):(0,c.jsxs)(v,{children:[(0,c.jsx)(j,{style:{color:"#9CA3AF"},children:"No items"}),(0,c.jsx)("span",{})]})})]}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(F,{children:[(0,c.jsx)("span",{children:"Subtotal"}),(0,c.jsx)("span",{children:(0,l.vv)(n.subtotal||0,i)})]}),(n.discount||0)>0&&(0,c.jsxs)(F,{children:[(0,c.jsx)("span",{children:"Discount"}),(0,c.jsxs)("span",{children:["-",(0,l.vv)(n.discount||0,i)]})]}),(n.tax||0)>0&&(0,c.jsxs)(F,{children:[(0,c.jsx)("span",{children:"Tax"}),(0,c.jsx)("span",{children:(0,l.vv)(n.tax||0,i)})]}),(n.serviceCharge||0)>0&&(0,c.jsxs)(F,{children:[(0,c.jsx)("span",{children:"Service Charge"}),(0,c.jsx)("span",{children:(0,l.vv)(n.serviceCharge||0,i)})]}),(0,c.jsxs)(F,{$bold:!0,children:[(0,c.jsx)("span",{children:"Total"}),(0,c.jsx)("span",{children:(0,l.vv)(n.totalAmount,i)})]})]}),(0,c.jsxs)(C,{children:[(0,c.jsx)($,{$variant:"secondary",onClick:I,children:"View Order Details"}),D&&n.orderId&&(0,c.jsx)($,{$variant:"success",onClick:()=>S(n.orderId,D.status),children:D.label}),(0,c.jsx)($,{$variant:"primary",onClick:d,children:"+ Add Items"}),"pending"===n.paymentStatus&&(0,c.jsxs)($,{$variant:"secondary",onClick:B,children:["Payment ",(0,l.vv)(n.totalAmount,i)]}),(0,c.jsx)($,{$variant:"link",onClick:z,children:"Open in POS Terminal \u2197"})]})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(k,{children:[(0,c.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,c.jsx)("p",{children:"This table is available"})]}),(0,c.jsxs)(C,{children:[(0,c.jsx)($,{$variant:"primary",onClick:a,children:"+ New Order"}),(0,c.jsx)($,{$variant:"link",onClick:z,children:"Open in POS Terminal \u2197"})]})]})]})},B=i.Ay.div`
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
`,z=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,I=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,O=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,T=i.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,D=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,P=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,N=e=>{let{tables:t,tableStatuses:n,currency:r}=e;const i=t.length,o={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,d=0,p=0;t.forEach(e=>{const t=n[e.tableNumber],r=(null===t||void 0===t?void 0:t.status)||"available";o[r]++,"available"!==r&&t&&(a+=t.totalAmount,d+=t.elapsedMinutes,p++)});const x=p>0?Math.round(d/p):0;return(0,c.jsxs)(B,{children:[(0,c.jsx)(z,{children:Object.keys(s.Ez).map(e=>(0,c.jsxs)(I,{children:[(0,c.jsx)(O,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,c.jsx)(T,{}),(0,c.jsxs)(D,{children:[(0,c.jsxs)(P,{children:["Tables: ",(0,c.jsx)("span",{children:i})]}),(0,c.jsxs)(P,{children:["Avail: ",(0,c.jsx)("span",{children:o.available})]}),(0,c.jsxs)(P,{children:["Occupied: ",(0,c.jsx)("span",{children:o.occupied})]}),o.ready>0&&(0,c.jsxs)(P,{children:["Ready: ",(0,c.jsx)("span",{children:o.ready})]}),o["needs-attention"]>0&&(0,c.jsxs)(P,{children:["Attn: ",(0,c.jsx)("span",{children:o["needs-attention"]})]}),(0,c.jsx)(T,{}),(0,c.jsxs)(P,{children:["Today: ",(0,c.jsx)("span",{children:(0,l.vv)(a,r)})]}),x>0&&(0,c.jsxs)(P,{children:["Avg: ",(0,c.jsxs)("span",{children:[x,"min"]})]})]})]})};var _=n(2966),R=n(8930),M=n(9018),H=n(447),q=n(9189);const W=i.Ay.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: ${e=>e.$isOpen?"flex":"none"};
  background: rgba(0, 0, 0, 0.5);
  align-items: stretch;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 0;
  }
`,L=i.Ay.div`
  width: 100%;
  max-width: 1200px;
  background: #FAFBFC;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    border-radius: 0;
    max-width: 100%;
  }
`,U=i.Ay.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,G=i.Ay.div`
  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
  span {
    font-size: 13px;
    color: #6B7C93;
    font-weight: 500;
  }
`,J=i.Ay.button`
  background: none;
  border: none;
  font-size: 22px;
  color: #6B7C93;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.15s;
  &:hover { background: #F3F4F6; color: #0A2540; }
`,V=i.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,Y=i.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`,K=i.Ay.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
`,Z=i.Ay.input`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder { color: #8898AA; }
`,Q=i.Ay.div`
  display: flex;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  padding: 0 24px;
  gap: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar { height: 3px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 3px; }
`,X=i.Ay.button`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  position: relative;
  color: ${e=>e.$active?"#635BFF":"#6B7C93"};

  &:hover { color: #635BFF; }

  ${e=>e.$active&&"\n    &::after {\n      content: '';\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 2px;\n      background: #635BFF;\n    }\n  "}
`,ee=i.Ay.div`
  flex: 1;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  overflow-y: auto;
  align-content: start;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 3px; }
`,te=i.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  cursor: ${e=>e.$soldOut?"not-allowed":"pointer"};
  opacity: ${e=>e.$soldOut?.5:1};
  transition: all 0.15s;
  text-align: center;
  position: relative;

  &:hover {
    ${e=>!e.$soldOut&&"\n      border-color: #C7D2FE;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n      transform: translateY(-2px);\n    "}
  }

  &:active {
    ${e=>!e.$soldOut&&"transform: translateY(0);"}
  }
`,ne=i.Ay.div`
  width: 100%;
  height: 80px;
  background: #F6F9FC;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.$hasImage?"0":"36px"};
  color: #C7D2FE;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,re=i.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`,ie=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,oe=i.Ay.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`,ae=i.Ay.button`
  flex: 1;
  background: linear-gradient(135deg, #F8FAFC 0%, #F0F4FF 100%);
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    background: linear-gradient(135deg, #F0F4FF 0%, #E6F0FF 100%);
    border-color: #635BFF;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.2);
  }

  &:active { transform: translateY(0); }
`,se=i.Ay.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FF6B6B;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
`,de=i.Ay.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
  z-index: 1;
`,le=i.Ay.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9CA3AF;
  font-size: 14px;
`,ce=i.Ay.div`
  width: 400px;
  min-width: 400px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 320px;
    min-width: 320px;
  }
`,pe=i.Ay.div`
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,xe=i.Ay.div`
  font-size: 15px;
  font-weight: 700;
  color: #0A2540;
`,ue=i.Ay.div`
  padding: 12px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,he=i.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`,ge=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 80px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,be=i.Ay.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 2px; }
`,me=i.Ay.div`
  padding: 16px 24px;
`,fe=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,ye=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`,ve=i.Ay.div`
  flex: 1;
`,je=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,we=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,Ae=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Fe=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ce=i.Ay.button`
  width: 24px;
  height: 24px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6B7C93;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }

  &:active { background: #F0F4FF; }
`,$e=i.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,ke=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,Ee=i.Ay.button`
  width: 24px;
  height: 24px;
  border: none;
  background: #FFF4F4;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #FF6B6B;
  transition: all 0.15s;

  &:hover { background: #FFE6E6; }
`,Se=i.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
  padding: 40px;
`,Be=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,ze=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;

  &:last-child { margin-bottom: 0; }
`,Ie=i.Ay.span`
  color: #6B7C93;
`,Oe=i.Ay.span`
  font-weight: 500;
  color: #0A2540;
`,Te=(0,i.Ay)(ze)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;

  ${Ie} { color: #0A2540; }
  ${Oe} { color: #635BFF; }
`,De=i.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,Pe=i.Ay.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>"primary"===e.$variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5243E0;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:active { transform: translateY(0); }\n  ":"\n    background: white;\n    color: #6B7C93;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      border-color: #C7D2FE;\n      color: #635BFF;\n    }\n  "}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,Ne=e=>{let{isOpen:t,onClose:n,tableNumber:i,tableInfo:o,statusInfo:s,mode:d,restaurantId:p,currency:x,onOrderComplete:u}=e;const{categories:h,menuItems:g,getItemsByCategory:b}=(0,R.b)(),{operationSettings:m}=(0,M.Pj)(),{addOrder:f}=(0,H.h)(),{user:y}=(0,a.As)(),[v,j]=(0,r.useState)(null),[w,A]=(0,r.useState)(""),[F,C]=(0,r.useState)([]),[$,k]=(0,r.useState)((null===s||void 0===s?void 0:s.guestCount)||0),[E,S]=(0,r.useState)(!1),[B,z]=(0,r.useState)(!1),[I,O]=(0,r.useState)(null);(0,r.useEffect)(()=>{h.length>0&&!v&&j(h[0].id)},[h,v]),(0,r.useEffect)(()=>{t&&(C([]),A(""),k((null===s||void 0===s?void 0:s.guestCount)||0),S(!1),h.length>0&&j(h[0].id))},[t,s,h]);const T=(0,r.useMemo)(()=>w.trim()?g.filter(e=>e.name.toLowerCase().includes(w.toLowerCase())):v?b(v):g,[w,v,g,b]),D=(0,r.useMemo)(()=>{const e=F.reduce((e,t)=>{const n=(t.selectedOptionsData||[]).reduce((e,t)=>e+t.price,0);return e+(t.menuItem.price+n)*t.quantity},0),t=null!==m&&void 0!==m&&m.taxEnabled&&m.taxRate||0,n=null!==m&&void 0!==m&&m.serviceChargeEnabled&&m.serviceChargeRate||0,r=e*(t/100),i=e*(n/100);return{subtotal:e,tax:r,serviceCharge:i,total:e+r+i,taxRate:t,serviceChargeRate:n}},[F,m]),P=(0,r.useCallback)((e,t,n,r)=>{const i=`${e.id}_${Date.now()}`;C(o=>[...o,{id:i,menuItem:{id:String(e.id),name:e.name,price:e.price,emoji:e.emoji||"",image:e.image,is_set_menu:e.is_set_menu,set_items:e.set_items},quantity:t,options:n,selectedOptionsData:r}])},[]),N=(0,r.useCallback)(e=>{e.soldOut||(e.optionGroups&&e.optionGroups.length>0?(O(e),z(!0)):P(e,1,[]))},[P]),_=(0,r.useCallback)((e,t)=>{C(n=>n.map(n=>{if(n.id===e){const e=n.quantity+t;return e<=0?null:{...n,quantity:e}}return n}).filter(Boolean))},[]),Ne=(0,r.useCallback)(e=>{C(t=>t.filter(t=>t.id!==e))},[]),_e="new"===d?async()=>{if(0!==F.length&&!E){S(!0);try{const e={id:`fp-${Date.now()}`,orderNumber:"",customer:{name:"Walk-in Customer",phone:""},items:F.map(e=>({id:e.id,menuItem:e.menuItem,quantity:e.quantity,options:e.options})),status:"pending",createdAt:(new Date).toISOString(),subtotal:D.subtotal,tax:D.tax,discount:0,total:D.total,paymentMethod:"",paymentStatus:"pending",orderType:"dine-in",orderSource:"pos",tableNumber:i,guest_count:$||null,serviceCharge:D.serviceCharge,serviceChargeRate:D.serviceChargeRate,taxRate:D.taxRate,cashier_id:(null===y||void 0===y?void 0:y.id)||null,cashier_name:(null===y||void 0===y?void 0:y.name)||(null===y||void 0===y?void 0:y.full_name)||null};await f(e,p),u()}catch(e){console.error("Failed to create order:",e)}finally{S(!1)}}}:async()=>{if(0!==F.length&&!E&&null!==s&&void 0!==s&&s.orderId){S(!0);try{const e=localStorage.getItem("auth_token"),t=F.map(e=>({name:e.menuItem.name,quantity:e.quantity,price:e.menuItem.price,options:e.options||[]}));(await fetch(`/api/orders/${s.orderId}/add-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t})})).ok&&u()}catch(e){console.error("Failed to add items:",e)}finally{S(!1)}}},Re=F.reduce((e,t)=>e+t.quantity,0);return t?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(W,{$isOpen:t,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,c.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(U,{children:[(0,c.jsxs)(G,{children:[(0,c.jsxs)("h2",{children:["new"===d?"New Order":"Add Items"," \u2014 Table ",i]}),(0,c.jsxs)("span",{children:[o?`${o.seats} seats`:"","add"===d&&null!==s&&void 0!==s&&s.orderNumber?` \xb7 Order ${s.orderNumber}`:""]})]}),(0,c.jsx)(J,{onClick:n,children:"\xd7"})]}),(0,c.jsxs)(V,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsx)(K,{children:(0,c.jsx)(Z,{placeholder:"Search menu...",value:w,onChange:e=>A(e.target.value)})}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(X,{$active:!v,onClick:()=>{j(null),A("")},children:"All"}),h.map(e=>(0,c.jsxs)(X,{$active:v===e.id,onClick:()=>{j(e.id),A("")},children:[e.emoji," ",e.name]},e.id))]}),(0,c.jsxs)(ee,{children:[T.map(e=>(0,c.jsxs)(te,{$soldOut:e.soldOut,onClick:()=>N(e),children:[e.is_set_menu&&(0,c.jsx)(de,{children:"SET"}),(0,c.jsx)(ne,{$hasImage:!!e.image,children:e.image?(0,c.jsx)("img",{src:e.image,alt:e.name}):e.emoji}),(0,c.jsx)(re,{children:e.name}),(0,c.jsx)(ie,{children:(0,l.vv)(e.price,x)}),(0,c.jsx)(oe,{children:(0,c.jsx)(ae,{onClick:t=>{t.stopPropagation(),N(e)},children:"+ Add"})}),e.soldOut&&(0,c.jsx)(se,{children:"SOLD OUT"})]},e.id)),0===T.length&&(0,c.jsx)(le,{children:"No items found"})]})]}),(0,c.jsxs)(ce,{children:[(0,c.jsxs)(pe,{children:[(0,c.jsxs)(xe,{children:["Table ",i]}),(0,c.jsxs)("span",{style:{fontSize:"13px",color:"#6B7C93"},children:[Re," ",1===Re?"item":"items"]})]}),"new"===d&&(0,c.jsxs)(ue,{children:[(0,c.jsx)(he,{children:"Guests:"}),(0,c.jsxs)(ge,{value:$,onChange:e=>k(Number(e.target.value)),children:[(0,c.jsx)("option",{value:0,children:"-"}),[1,2,3,4,5,6,7,8,9,10,12,15,20].map(e=>(0,c.jsx)("option",{value:e,children:e},e))]})]}),F.length>0?(0,c.jsx)(be,{children:(0,c.jsxs)(me,{children:[(0,c.jsxs)(fe,{children:[Re," ",1===Re?"item":"items"]}),F.map(e=>(0,c.jsxs)(ye,{children:[(0,c.jsxs)(ve,{children:[(0,c.jsx)(je,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,c.jsx)(we,{children:e.options.join(", ")})]}),(0,c.jsxs)(Ae,{children:[(0,c.jsxs)(Fe,{children:[(0,c.jsx)(Ce,{onClick:()=>_(e.id,-1),children:"-"}),(0,c.jsx)($e,{children:e.quantity}),(0,c.jsx)(Ce,{onClick:()=>_(e.id,1),children:"+"})]}),(0,c.jsx)(ke,{children:(0,l.vv)((e.menuItem.price+(e.selectedOptionsData||[]).reduce((e,t)=>e+t.price,0))*e.quantity,x)}),(0,c.jsx)(Ee,{onClick:()=>Ne(e.id),children:"\u2715"})]})]},e.id))]})}):(0,c.jsxs)(Se,{children:[(0,c.jsx)("span",{style:{fontSize:"36px",opacity:.3},children:"\ud83d\udccb"}),(0,c.jsx)("span",{children:"No items in order"}),(0,c.jsx)("span",{style:{fontSize:"12px"},children:"Select menu items to start"})]}),(0,c.jsxs)(Be,{children:[(0,c.jsxs)(ze,{children:[(0,c.jsx)(Ie,{children:"Subtotal"}),(0,c.jsx)(Oe,{children:(0,l.vv)(D.subtotal,x)})]}),D.tax>0&&(0,c.jsxs)(ze,{children:[(0,c.jsxs)(Ie,{children:["Tax (",D.taxRate,"%)"]}),(0,c.jsx)(Oe,{children:(0,l.vv)(D.tax,x)})]}),D.serviceCharge>0&&(0,c.jsxs)(ze,{children:[(0,c.jsxs)(Ie,{children:["Service (",D.serviceChargeRate,"%)"]}),(0,c.jsx)(Oe,{children:(0,l.vv)(D.serviceCharge,x)})]}),(0,c.jsxs)(Te,{children:[(0,c.jsx)(Ie,{children:"Total"}),(0,c.jsx)(Oe,{children:(0,l.vv)(D.total,x)})]})]}),(0,c.jsxs)(De,{children:[(0,c.jsx)(Pe,{$variant:"secondary",onClick:n,children:"Cancel"}),(0,c.jsx)(Pe,{$variant:"primary",onClick:_e,disabled:0===F.length||E,children:E?"Submitting...":"new"===d?"Submit Order":"Add Items"})]})]})]})]})}),B&&I&&(0,c.jsx)(q.A,{isOpen:B,onClose:()=>z(!1),menuItem:{id:String(I.id),name:I.name,price:I.price,emoji:I.emoji||"",image:I.image,optionGroups:I.optionGroups},onConfirm:(e,t,n)=>{P(I,e,t,n),z(!1)}})]}):null},_e={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",completed:"Completed",cancelled:"Cancelled",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding"},Re={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},Me=i.Ay.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`,He=i.Ay.div`
  background: white;
  border-radius: 16px;
  width: 520px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`,qe=i.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`,We=i.Ay.div`
  flex: 1;
`,Le=i.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
`,Ue=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,Ge=i.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
  margin-top: 6px;
  margin-right: 6px;
`,Je=i.Ay.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 6px;
  flex-shrink: 0;
  &:hover { background: #F3F4F6; }
`,Ve=i.Ay.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`,Ye=i.Ay.div`
  padding: 16px 24px;
  border-bottom: 1px solid #F0F2F5;
`,Ke=i.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
`,Ze=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`,Qe=i.Ay.div`
  font-size: 13px;
`,Xe=i.Ay.span`
  color: #9CA3AF;
  font-weight: 500;
`,et=i.Ay.span`
  color: #0A2540;
  font-weight: 600;
  margin-left: 6px;
`,tt=i.Ay.div`
  padding: 6px 0;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$isAdded?"#92400E":"#6B7280"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,nt=i.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #F8FAFC;
  opacity: ${e=>e.$completed?.5:1};

  &:last-child { border-bottom: none; }
`,rt=i.Ay.button`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 2px solid ${e=>e.$checked?"#059669":"#D1D5DB"};
  background: ${e=>e.$checked?"#059669":"white"};
  color: white;
  font-size: 12px;
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
`,it=i.Ay.div`
  flex: 1;
  min-width: 0;
`,ot=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.$completed?"line-through":"none"};
`,at=i.Ay.div`
  font-size: 11px;
  color: #6B7C93;
  margin-top: 2px;
`,st=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  flex-shrink: 0;
`,dt=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,lt=i.Ay.button`
  width: 22px;
  height: 22px;
  border: none;
  background: none;
  color: #D1D5DB;
  font-size: 16px;
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
`,ct=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 3px 0;
`,pt=i.Ay.div`
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex-shrink: 0;
`,xt=i.Ay.button`
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  flex: 1;
  min-width: 0;

  ${e=>{switch(e.$variant){case"success":return"background: #059669; color: white; &:hover { background: #047857; }";case"primary":return"background: #635BFF; color: white; &:hover { background: #5046E5; }";case"secondary":return"background: #F3F4F6; color: #374151; border: 1px solid #E6EBF1; &:hover { background: #E5E7EB; }";case"danger":return"background: white; color: #DC2626; border: 1px solid #FCA5A5; &:hover { background: #FEF2F2; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; &:hover { color: #374151; }"}}}
`,ut=i.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  color: #92400E;
  margin-top: 8px;
`,ht=e=>{let{isOpen:t,onClose:n,tableNumber:i,statusInfo:o,currency:a,onOrderUpdated:d,onAddItems:p,onPayment:x}=e;const[u,h]=(0,r.useState)(!1);if(!t)return null;const g=o.orderStatus||"pending",b=o.paymentStatus||"pending",m=(e=>{switch(e){case"pending":return{status:"preparing",label:"Start Preparing"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Mark Served"};case"served":return{status:"completed",label:"Complete Order"};default:return null}})(g),f=o.orderItems||[],y="completed"!==b&&!["completed","cancelled"].includes(g),v=s.Ez[o.status]||s.Ez.occupied,j=(()=>{switch(b){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),w={};f.forEach((e,t)=>{const n=e.order_group||0;w[n]||(w[n]=[]),w[n].push({...e,_originalIndex:t})});const A=Object.keys(w).map(Number).sort((e,t)=>e-t),F=e=>{if(!e)return"-";const t=new Date(e);return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric"})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})},C=async e=>{if(o.orderId&&!u){h(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${o.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),d(),"completed"!==e&&"cancelled"!==e||n()}catch(t){}h(!1)}};return(0,c.jsx)(Me,{onClick:e=>{e.target===e.currentTarget&&n()},children:(0,c.jsxs)(He,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(qe,{children:[(0,c.jsxs)(We,{children:[(0,c.jsxs)(Le,{children:["Order ",o.orderNumber||""," - Table ",i]}),(0,c.jsxs)(Ue,{children:[o.guestCount?`${o.guestCount} guests`:"",o.cashierName?` | Cashier: ${o.cashierName}`:""]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(Ge,{$color:v.text,$bg:v.bg,children:_e[g]||g}),(0,c.jsx)(Ge,{$color:j.color,$bg:j.bg,children:"payment_verification_pending"===b?"Verification Pending":"completed"===b||"paid"===b?"Paid":"failed"===b?"Failed":"Unpaid"})]})]}),(0,c.jsx)(Je,{onClick:n,children:"\xd7"})]}),(0,c.jsxs)(Ve,{children:[(0,c.jsxs)(Ye,{children:[(0,c.jsx)(Ke,{children:"Customer & Order Information"}),(0,c.jsxs)(Ze,{children:[(0,c.jsxs)(Qe,{children:[(0,c.jsx)(Xe,{children:"Customer"}),(0,c.jsx)(et,{children:o.customerName||"Walk-in"})]}),o.customerPhone&&(0,c.jsxs)(Qe,{children:[(0,c.jsx)(Xe,{children:"Phone"}),(0,c.jsx)(et,{children:o.customerPhone})]}),(0,c.jsxs)(Qe,{children:[(0,c.jsx)(Xe,{children:"Type"}),(0,c.jsx)(et,{children:(o.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,c.jsxs)(Qe,{children:[(0,c.jsx)(Xe,{children:"Source"}),(0,c.jsx)(et,{children:Re[o.orderSource||"pos"]||o.orderSource})]}),(0,c.jsxs)(Qe,{children:[(0,c.jsx)(Xe,{children:"Time"}),(0,c.jsx)(et,{children:F(o.orderCreatedAt)})]}),o.paymentMethod&&(0,c.jsxs)(Qe,{children:[(0,c.jsx)(Xe,{children:"Payment"}),(0,c.jsx)(et,{children:o.paymentMethod})]})]})]}),(0,c.jsxs)(Ye,{children:[(0,c.jsxs)(Ke,{children:["Order Items (",f.length,")",f.length>0&&` - ${f.filter(e=>"completed"===e.status).length}/${f.length} served`]}),A.map(e=>{const t=w[e],n=e>0,r=t[0];return(0,c.jsxs)("div",{children:[(A.length>1||n)&&(0,c.jsxs)(tt,{$isAdded:n,children:[(0,c.jsx)("span",{children:n?`+Added #${e}`:"Original Order"}),n&&(null===r||void 0===r?void 0:r.added_at)&&(0,c.jsx)("span",{style:{fontSize:"10px",fontWeight:400,color:"#9CA3AF"},children:F(r.added_at)})]}),t.map(e=>{const t=e._originalIndex,n="completed"===e.status,r=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,c.jsxs)(nt,{$completed:n,children:[(0,c.jsx)(rt,{$checked:n,onClick:()=>(async e=>{if(!u&&o.orderId){h(!0);try{const t=f.map((t,n)=>n===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${o.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&"preparing"===g&&await fetch(`/api/orders/${o.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:"ready"})}),d())}catch(t){}h(!1)}})(t),disabled:u,title:n?"Mark as not served":"Mark as served",children:n?"\u2713":""}),(0,c.jsxs)(it,{children:[(0,c.jsxs)(ot,{$completed:n,children:[e.name," ",(0,c.jsxs)(dt,{children:["x",e.quantity]})]}),r&&(0,c.jsx)(at,{children:r})]}),(0,c.jsx)(st,{children:(0,l.vv)(e.price*e.quantity,a)}),y&&f.length>1&&(0,c.jsx)(lt,{onClick:()=>(async(e,t)=>{if(o.orderId&&y&&window.confirm(`Delete "${t}" from this order? This action cannot be undone.`))try{const t=localStorage.getItem("auth_token");(await fetch(`/api/orders/${o.orderId}/items/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&d()}catch(n){}})(t,e.name),title:"Delete item",children:"\xd7"})]},t)})]},e)})]}),(0,c.jsxs)(Ye,{style:{borderBottom:"none"},children:[(0,c.jsx)(Ke,{children:"Payment Summary"}),(0,c.jsxs)(ct,{children:[(0,c.jsx)("span",{children:"Subtotal"}),(0,c.jsx)("span",{children:(0,l.vv)(o.subtotal||0,a)})]}),(o.discount||0)>0&&!o.couponDiscount&&!o.discountPolicyAmount&&!o.pointDiscount&&(0,c.jsxs)(ct,{children:[(0,c.jsx)("span",{children:"Discount"}),(0,c.jsxs)("span",{children:["-",(0,l.vv)(o.discount||0,a)]})]}),(o.discountPolicyAmount||0)>0&&(0,c.jsxs)(ct,{children:[(0,c.jsxs)("span",{children:["Discount",o.discountPolicyName?` (${o.discountPolicyName})`:""]}),(0,c.jsxs)("span",{children:["-",(0,l.vv)(o.discountPolicyAmount||0,a)]})]}),(o.couponDiscount||0)>0&&(0,c.jsxs)(ct,{children:[(0,c.jsxs)("span",{children:["Coupon",o.couponCode?` (${o.couponCode})`:""]}),(0,c.jsxs)("span",{children:["-",(0,l.vv)(o.couponDiscount||0,a)]})]}),(o.pointDiscount||0)>0&&(0,c.jsxs)(ct,{children:[(0,c.jsxs)("span",{children:["Points",o.pointsUsed?` (${o.pointsUsed} pts)`:""]}),(0,c.jsxs)("span",{children:["-",(0,l.vv)(o.pointDiscount||0,a)]})]}),(o.serviceCharge||0)>0&&(0,c.jsxs)(ct,{children:[(0,c.jsxs)("span",{children:["Service Charge",o.serviceChargeRate?` (${o.serviceChargeRate}%)`:""]}),(0,c.jsx)("span",{children:(0,l.vv)(o.serviceCharge||0,a)})]}),(o.tax||0)>0&&(0,c.jsxs)(ct,{children:[(0,c.jsxs)("span",{children:["Tax",o.taxRate?` (${o.taxRate}%)`:""]}),(0,c.jsx)("span",{children:(0,l.vv)(o.tax||0,a)})]}),(0,c.jsxs)(ct,{$bold:!0,style:{marginTop:"6px",paddingTop:"8px",borderTop:"1px solid #E6EBF1"},children:[(0,c.jsx)("span",{children:"Total"}),(0,c.jsx)("span",{children:(0,l.vv)(o.totalAmount,a)})]}),o.notes&&(0,c.jsx)(ut,{children:o.notes})]})]}),(0,c.jsxs)(pt,{children:[m&&y&&(0,c.jsx)(xt,{$variant:"success",onClick:()=>C(m.status),disabled:u,children:m.label}),y&&(0,c.jsx)(xt,{$variant:"primary",onClick:p,children:"+ Add Items"}),"pending"===b&&y&&(0,c.jsx)(xt,{$variant:"secondary",onClick:x,children:"Payment"}),y&&"cancelled"!==g&&(0,c.jsx)(xt,{$variant:"danger",onClick:async()=>{o.orderId&&window.confirm("Cancel this order?")&&await C("cancelled")},children:"Cancel"}),(0,c.jsx)(xt,{$variant:"link",onClick:async()=>{if(o.orderId&&window.confirm("Delete this order? This action cannot be undone."))try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${o.orderId}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),d(),n()}catch(e){}},children:"Delete"})]})]})})};var gt=n(3422);const bt=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,mt=i.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,ft=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,yt=i.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,vt=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,jt=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,wt=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,At=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,Ft=i.Ay.button`
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
`,Ct=i.Ay.button`
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
`,$t=i.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,kt=i.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,Et=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,St=()=>{var e;const{restaurantId:t}=(0,o.g)(),n=(0,o.Zp)(),{user:i}=(0,a.As)(),[l,p]=(0,r.useState)(s.He),[x,u]=(0,r.useState)({}),[h,g]=(0,r.useState)(!1),[b,m]=(0,r.useState)(""),[f,y]=(0,r.useState)(!0),[v,j]=(0,r.useState)(""),w=(0,r.useRef)(null),A=(0,r.useRef)(null),[F,C]=(0,r.useState)(null),[$,k]=(0,r.useState)(!1),[E,B]=(0,r.useState)(!1),[z,I]=(0,r.useState)("new"),[O,T]=(0,r.useState)(!1);(0,r.useEffect)(()=>{const e=()=>{const e=new Date;m(e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[]);const D=(0,r.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),P=(0,r.useCallback)(()=>{w.current&&clearTimeout(w.current),w.current=setTimeout(()=>D(),2e3)},[D]);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const r=await n.json(),i=r.data||r;i.floor_plan&&p(i.floor_plan),i.currency&&j(i.currency)}catch(e){console.error("Failed to load floor plan:",e)}finally{y(!1)}})(),D()},[t,D]),(0,r.useEffect)(()=>{if(!t)return;const e=(0,gt.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{g(!0),e.emit("join-restaurant",t),D()}),e.on("disconnect",()=>g(!1)),e.on("order-updated",()=>P()),e.on("order-created",()=>P()),e.on("order-items-added",()=>P()),e.on("new-order",()=>P()),A.current=e,()=>{e.disconnect(),A.current=null}},[t,D,P]),(0,r.useEffect)(()=>{const e=setInterval(()=>D(),3e4);return()=>clearInterval(e)},[D]);const R=()=>{T(!1),I("add"),B(!0)},M=()=>{T(!1),k(!0)},H=F?x[F]:void 0,q=F?l.tables.find(e=>e.tableNumber===F):void 0;return f?(0,c.jsxs)(bt,{children:[(0,c.jsx)(mt,{children:(0,c.jsx)(ft,{children:(0,c.jsx)(yt,{children:"Floor Plan"})})}),(0,c.jsx)(Et,{children:"Loading floor plan..."})]}):(0,c.jsxs)(bt,{children:[(0,c.jsxs)(mt,{children:[(0,c.jsxs)(ft,{children:[(0,c.jsx)(Ct,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,c.jsx)(yt,{children:"Floor Plan"}),(0,c.jsxs)(jt,{children:[(0,c.jsx)(vt,{$connected:h}),h?"Live":"Offline"]})]}),(0,c.jsxs)(wt,{children:[(0,c.jsx)(At,{children:b}),"Restaurant Admin"===(null===i||void 0===i?void 0:i.role)&&(0,c.jsx)(Ft,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,c.jsxs)($t,{children:[(0,c.jsx)(kt,{children:(0,c.jsx)(d.A,{floorPlan:l,tableStatuses:x,onTableClick:e=>{C(t=>t===e?null:e)},selectedTableId:F?null===(e=l.tables.find(e=>e.tableNumber===F))||void 0===e?void 0:e.id:null,currency:v})}),F&&(0,c.jsx)(S,{tableNumber:F,statusInfo:H,tableInfo:q,currency:v,onClose:()=>C(null),onNewOrder:()=>{I("new"),B(!0)},onAddItems:R,onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await D()}catch(n){console.error("Failed to update order status:",n)}},onPayment:M,onNavigateToPOS:()=>{F&&n(`/restaurant/${t}/pos-terminal?table=${F}&from=floor-plan`)},onViewOrder:()=>{T(!0)}})]}),(0,c.jsx)(N,{tables:l.tables,tableStatuses:x,currency:v}),F&&(0,c.jsx)(ht,{isOpen:O,onClose:()=>T(!1),tableNumber:F,statusInfo:H,currency:v,restaurantId:Number(t),onOrderUpdated:()=>{D()},onAddItems:R,onPayment:M}),$&&H&&(0,c.jsx)(_.A,{isOpen:$,onClose:()=>k(!1),total:H.totalAmount||0,subtotal:H.subtotal||0,tax:H.tax||0,serviceCharge:H.serviceCharge||0,discountAmount:H.discount||0,onConfirmPayment:async(e,t,n,r,i)=>{if(!F)return;const o=x[F];if(null!==o&&void 0!==o&&o.orderId)try{const t=localStorage.getItem("auth_token");(await fetch(`/api/orders/${o.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({payment_method:e,payment_status:"completed",kitchen_ready:!0,points_used:r||0,point_discount:i||0})})).ok&&(k(!1),await D())}catch(a){console.error("Failed to process payment:",a)}},restaurantId:Number(t),customerId:H.customerId||void 0}),F&&(0,c.jsx)(Ne,{isOpen:E,onClose:()=>B(!1),tableNumber:F,tableInfo:q,statusInfo:H,mode:z,restaurantId:Number(t),currency:v,onOrderComplete:()=>{B(!1),D(),"add"===z&&T(!0)}})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>v});var r=n(9950),i=n(4752),o=n(7447),a=n(4414);const s=i.Ay.div`
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
`,p=new Set(["kitchen","entrance"]),x={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},u=r.memo(e=>{let{table:t,status:n="available",isSelected:r=!1,isEditing:i=!1,onClick:u,onMouseDown:h,onTouchStart:g,statusInfo:b,currency:m=""}=e;const f=t.tableType||"table",y="table"!==f,v=p.has(f),j=y?x[f]||x.kitchen:i?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:o.Ez[n],w=y?{...v?{background:"transparent",border:r&&i?"1.5px dashed #635BFF":"none",boxShadow:r&&i?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${r?"#635BFF":j.border}`},cursor:i?"grab":"default",opacity:i?1:.85}:void 0;return(0,a.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:v?"square":t.shape,$rotation:t.rotation,$bgColor:v?"transparent":j.bg,$borderColor:v?"transparent":j.border,$textColor:j.text,$isSelected:r&&!v,$isEditing:i,onClick:e=>{i||!u||y||(e.stopPropagation(),u(t.tableNumber))},onMouseDown:e=>{i&&h&&h(e,t.id)},onTouchStart:e=>{i&&g&&g(e,t.id)},style:w,children:[(0,a.jsx)(d,{$textColor:j.text,style:v?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:void 0,children:t.label||t.tableNumber}),!y&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l,{$textColor:j.text,children:!i&&null!==b&&void 0!==b&&b.guestCount?`${b.guestCount} guests`:`${t.seats} seats`}),!i&&b&&"available"!==n&&(0,a.jsx)(c,{$textColor:j.text,children:{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[b.orderStatus||""]||"Occupied"})]})]})});u.displayName="TableNode";const h=u,g=i.Ay.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  position: relative;
`,b=i.Ay.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
`,m=i.Ay.div`
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
`,v=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:i=!1,selectedTableId:o,onTableClick:s,onTableMouseDown:d,onTableTouchStart:l,onCanvasClick:c,currency:p=""}=e;const x=(0,r.useRef)(null),u=(0,r.useRef)(null),[v,j]=(0,r.useState)(1),[w,A]=(0,r.useState)({x:0,y:0}),F=(0,r.useMemo)(()=>{if(i||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,r=-1/0,o=-1/0;for(const i of t.tables){const t=i.width/2,a=i.height/2;e=Math.min(e,i.x-t),n=Math.min(n,i.y-a),r=Math.max(r,i.x+t),o=Math.max(o,i.y+a)}const a=r-e,s=o-n,d=Math.max(.1*a,40),l=Math.max(.1*s,40);return{x:e-d,y:n-l,w:a+2*d,h:s+2*l}},[t,i]),C=(0,r.useCallback)(()=>{if(!u.current)return;const e=u.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=F.w/e.width,n=F.h/e.height,r=Math.max(t,n);j(r);const i=F.w/r,o=F.h/r;A({x:(e.width-i)/2,y:(e.height-o)/2})},[F]);(0,r.useEffect)(()=>{C();const e=new ResizeObserver(()=>C());return x.current&&e.observe(x.current),()=>e.disconnect()},[C]);const $=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"};return(0,a.jsx)(g,{ref:x,children:(0,a.jsxs)(b,{ref:u,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[i&&t.showGrid&&(0,a.jsx)(m,{$gridSize:t.gridSize,$scale:v}),(0,a.jsx)(f,{"data-scaled-layer":!0,style:{transform:`scale(${1/v})`,left:i?0:w.x-F.x/v+"px",top:i?0:w.y-F.y/v+"px",width:i?`${t.canvasWidth}px`:`${F.w}px`,height:i?`${t.canvasHeight}px`:`${F.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(h,{table:e,status:$(e.tableNumber),isSelected:o===e.id,isEditing:i,onClick:s,onMouseDown:d,onTouchStart:l,statusInfo:n[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,a.jsxs)(y,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),i?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>i,Ez:()=>a,He:()=>r,Zt:()=>s,h_:()=>o});const r={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},i=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],o=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],a={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},s={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"}}}]);