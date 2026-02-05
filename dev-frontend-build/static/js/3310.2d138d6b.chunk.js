"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3310],{755:(e,n,i)=>{i.d(n,{e:()=>l,i:()=>a});var r=i(9950),t=i(4414);const o={primaryColor:"#8B5CF6",secondaryColor:"#A78BFA",accentColor:"#C4B5FD"},s=(0,r.createContext)(void 0),a=e=>{let{children:n}=e;const[i,a]=(0,r.useState)(o),l=e=>{a(e),document.documentElement.style.setProperty("--brand-primary",e.primaryColor),document.documentElement.style.setProperty("--brand-secondary",e.secondaryColor),document.documentElement.style.setProperty("--brand-accent",e.accentColor)},d=i.primaryColor===o.primaryColor;return(0,r.useEffect)(()=>{l(i)},[]),(0,t.jsx)(s.Provider,{value:{theme:i,setTheme:l,resetTheme:()=>{l(o)},isDefaultTheme:d},children:n})},l=()=>{const e=(0,r.useContext)(s);return e||{theme:o,setTheme:()=>{},resetTheme:()=>{},isDefaultTheme:!0}}},3310:(e,n,i)=>{i.d(n,{A:()=>Te});var r=i(9950),t=i(4752),o=i(4492),s=i(5781),a=i(1367),l=i(5651),d=i(447),c=i(755),p=i(7197),x=i(4414);const h=t.Ay.div`
  background: linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%);
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: between;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
`,u=t.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`,g=t.Ay.div`
  font-size: 24px;
  color: #D97706;
`,m=t.Ay.div`
  color: #92400E;
`,j=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`,v=t.Ay.div`
  font-size: 14px;
  line-height: 1.4;
`,f=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,y=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #D97706;\n    color: white;\n    \n    &:hover {\n      background: #B45309;\n    }\n  ":"\n    background: transparent;\n    color: #92400E;\n    border: 1px solid #D97706;\n    \n    &:hover {\n      background: rgba(217, 119, 6, 0.1);\n    }\n  "}
`,b=t.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`,C=t.Ay.div`
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`,k=t.Ay.div`
  padding: 24px 24px 16px 24px;
  background: ${e=>"blocked"===e.type?"linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)":"linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)"};
  border-bottom: 1px solid ${e=>"blocked"===e.type?"#FCA5A5":"#F59E0B"};
  text-align: center;
`,A=t.Ay.div`
  font-size: 48px;
  margin-bottom: 12px;
  color: ${e=>"blocked"===e.type?"#DC2626":"#D97706"};
`,w=t.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${e=>"blocked"===e.type?"#991B1B":"#92400E"};
  margin: 0 0 8px 0;
`,F=t.Ay.p`
  font-size: 16px;
  color: ${e=>"blocked"===e.type?"#B91C1C":"#A16207"};
  margin: 0;
`,S=t.Ay.div`
  padding: 24px;
`,$=t.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  text-align: center;
`,B=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
`,E=t.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #DC2626;
`,D=t.Ay.div`
  margin-bottom: 20px;
`,z=t.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,R=t.Ay.ul`
  margin: 0;
  padding-left: 20px;
  list-style-type: none;
  
  li {
    position: relative;
    font-size: 14px;
    color: #6B7280;
    margin-bottom: 8px;
    padding-left: 8px;
    
    &::before {
      content: '⛔';
      position: absolute;
      left: -16px;
      top: 0;
    }
  }
`,P=t.Ay.div`
  background: #FEF2F2;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,I=t.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #991B1B;
  margin: 0 0 12px 0;
`,M=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #FCA5A5;
  
  &:last-child {
    border-bottom: none;
  }
`,L=t.Ay.div`
  font-size: 14px;
  color: #7F1D1D;
`,T=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #991B1B;
`,O=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
`,q=t.Ay.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #DC2626;\n    color: white;\n    \n    &:hover {\n      background: #B91C1C;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,N=()=>{const{paymentStatus:e,showWarning:n,showPartialRestriction:i,showBlockedModal:r,dismissWarning:t,dismissPartialRestriction:s}=(0,l.e)(),a=(0,o.Zp)(),d=()=>{a("/invoices")};if(n&&"warning"===e.restrictionLevel)return(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(g,{children:"!"}),(0,x.jsxs)(m,{children:[(0,x.jsx)(j,{children:"Payment Reminder"}),(0,x.jsxs)(v,{children:["You have ",(0,p.vv)(e.overdueAmount)," in overdue invoices. Some features may be restricted in ",e.nextRestrictionDate?Math.ceil((new Date(e.nextRestrictionDate).getTime()-(new Date).getTime())/864e5):1," days if not paid."]})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(y,{variant:"primary",onClick:d,children:"Pay Now"}),(0,x.jsx)(y,{onClick:t,children:"Dismiss"})]})]});if(i&&"partial"===e.restrictionLevel){const n=(0,p.vr)("partial");return(0,x.jsx)(b,{children:(0,x.jsxs)(C,{children:[(0,x.jsxs)(k,{type:"partial",children:[(0,x.jsx)(A,{type:"partial",children:"\xd7"}),(0,x.jsx)(w,{type:"partial",children:"Service Restrictions Active"}),(0,x.jsxs)(F,{type:"partial",children:["Payment overdue for ",e.overdueDays," days"]})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(B,{children:"Outstanding Amount"}),(0,x.jsx)(E,{children:(0,p.vv)(e.overdueAmount)})]}),(0,x.jsxs)(D,{children:[(0,x.jsx)(z,{children:"Restricted Features:"}),(0,x.jsx)(R,{children:n.map((e,n)=>(0,x.jsx)("li",{children:e},n))})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(I,{children:"Overdue Invoices:"}),e.overdueInvoices.map(e=>(0,x.jsxs)(M,{children:[(0,x.jsxs)(L,{children:[e.invoiceNumber," (Due: ",e.dueDate,")"]}),(0,x.jsx)(T,{children:(0,p.vv)(e.amount)})]},e.id))]}),(0,x.jsxs)("div",{style:{color:"#DC2626",fontSize:"14px",textAlign:"center",marginBottom:"16px"},children:["\u23f0 Complete access will be blocked in ",e.nextRestrictionDate?Math.ceil((new Date(e.nextRestrictionDate).getTime()-(new Date).getTime())/864e5):1," days"]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(q,{variant:"primary",onClick:d,children:"Pay Outstanding Invoices"}),(0,x.jsx)(q,{variant:"secondary",onClick:s,children:"Continue with Restrictions"})]})]})]})})}if(r&&"blocked"===e.restrictionLevel){const n=(0,p.vr)("blocked");return(0,x.jsx)(b,{children:(0,x.jsxs)(C,{children:[(0,x.jsxs)(k,{type:"blocked",children:[(0,x.jsx)(A,{type:"blocked",children:"-"}),(0,x.jsx)(w,{type:"blocked",children:"Access Blocked"}),(0,x.jsx)(F,{type:"blocked",children:"Account suspended due to overdue payment"})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(B,{children:"Outstanding Amount"}),(0,x.jsx)(E,{children:(0,p.vv)(e.overdueAmount)})]}),(0,x.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",marginBottom:"20px",textAlign:"center"},children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#991B1B",marginBottom:"8px"},children:"Service Suspended"}),(0,x.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Your account has been suspended due to payment overdue for ",e.overdueDays," days. All business operations are currently unavailable."]})]}),(0,x.jsxs)(D,{children:[(0,x.jsx)(z,{children:"Blocked Features:"}),(0,x.jsx)(R,{children:n.map((e,n)=>(0,x.jsx)("li",{children:e},n))})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(I,{children:"Overdue Invoices:"}),e.overdueInvoices.map(e=>(0,x.jsxs)(M,{children:[(0,x.jsxs)(L,{children:[e.invoiceNumber," (Due: ",e.dueDate,")"]}),(0,x.jsx)(T,{children:(0,p.vv)(e.amount)})]},e.id))]}),(0,x.jsx)(O,{children:(0,x.jsx)(q,{variant:"primary",onClick:d,children:"Pay Now to Restore Access"})})]})]})})}return null},_=t.Ay.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 50%, #FCA5A5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,G=t.Ay.div`
  background: white;
  border-radius: 20px;
  padding: 48px 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 2px solid #FCA5A5;
`,W=t.Ay.div`
  font-size: 80px;
  margin-bottom: 24px;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`,H=t.Ay.h1`
  font-size: 32px;
  font-weight: 700;
  color: #991B1B;
  margin-bottom: 16px;
`,U=t.Ay.p`
  font-size: 18px;
  color: #7F1D1D;
  margin-bottom: 32px;
  line-height: 1.6;
`,Y=t.Ay.div`
  background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #FECACA;
`,Z=t.Ay.div`
  font-size: 16px;
  color: #B91C1C;
  margin-bottom: 8px;
  font-weight: 500;
`,V=t.Ay.div`
  font-size: 48px;
  font-weight: 700;
  color: #DC2626;
  margin-bottom: 8px;
`,X=t.Ay.div`
  font-size: 14px;
  color: #991B1B;
`,K=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`,J=t.Ay.button`
  background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`,Q=t.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 20px;
  margin-top: 32px;
  text-align: left;
`,ee=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 12px;
`,ne=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  
  strong {
    color: #0A2540;
    font-weight: 600;
  }
`,ie=t.Ay.button`
  background: transparent;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
    color: #0A2540;
    border-color: #CBD5E1;
  }
`,re=()=>{const{paymentStatus:e}=(0,l.e)(),n=(0,o.Zp)();return(0,x.jsx)(_,{children:(0,x.jsxs)(G,{children:[(0,x.jsx)(W,{children:"-"}),(0,x.jsx)(H,{children:"Access Suspended"}),(0,x.jsx)(U,{children:"Your account has been temporarily suspended due to overdue payment. Please settle your outstanding invoices to restore full access to all services."}),(0,x.jsxs)(Y,{children:[(0,x.jsx)(Z,{children:"Outstanding Amount"}),(0,x.jsx)(V,{children:(0,p.vv)(e.overdueAmount)}),(0,x.jsxs)(X,{children:["Overdue for ",e.overdueDays," days"]})]}),(0,x.jsxs)(K,{children:[(0,x.jsx)(J,{onClick:()=>{n("/invoices")},children:"\ud83e\uddfe View & Pay Invoices"}),(0,x.jsx)(ie,{onClick:()=>{n("/pos")},children:"Switch Account"})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(ee,{children:"Need Help?"}),(0,x.jsxs)(ne,{children:[(0,x.jsx)("strong",{children:"Support Team:"}),(0,x.jsx)("br",{}),"\ud83d\udce7 Email: billing@orderhere.com",(0,x.jsx)("br",{}),"\ud83d\udcde Phone: +60 3-1234-5678",(0,x.jsx)("br",{}),"\ud83d\udd50 Hours: Mon-Fri 9AM-6PM (GMT+8)",(0,x.jsx)("br",{}),(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"Payment Methods:"}),(0,x.jsx)("br",{}),"\u2022 Online Banking Transfer",(0,x.jsx)("br",{}),"\u2022 Credit/Debit Card",(0,x.jsx)("br",{}),"\u2022 FPX Payment Gateway",(0,x.jsx)("br",{}),"\u2022 Cash Deposit (Selected Banks)"]})]})]})})},te=t.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
`,oe=t.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${e=>e.isCollapsed?"0px":"220px"};
  height: 100vh;
  background: #FAFBFC;
  border-right: ${e=>e.isCollapsed?"none":"1px solid #E6EBF1"};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow-x: hidden;

  @media (max-width: 768px) {
    transform: translateX(${e=>e.isOpen?"0":"-100%"});
    transition: transform 0.3s, width 0.3s ease;
  }
`,se=t.Ay.div`
  padding: ${e=>e.isCollapsed?"16px 8px":"16px"};
  border-bottom: 1px solid #E6EBF1;
  flex-shrink: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: ${e=>e.isCollapsed?"center":"space-between"};
`,ae=t.Ay.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: #E6EBF1;
    color: #0A2540;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`,le=t.Ay.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  display: ${e=>e.isCollapsed?"flex":"none"};
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    background: #F0F4FF;
    color: #635BFF;
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.2);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`,de=t.Ay.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`,ce=t.Ay.img`
  max-width: 140px;
  max-height: 60px;
  object-fit: contain;
`,pe=t.Ay.nav`
  padding: 8px 0 24px 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 8px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
    transition: background 0.2s;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }
  
  /* 모바일에서 스무스 스크롤 */
  -webkit-overflow-scrolling: touch;
  
  /* 스크롤 페이드 효과 */
  mask-image: linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 10px), transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 10px), transparent 100%);
  
  @media (max-width: 768px) {
    padding-bottom: 30px;
    mask-image: none;
    -webkit-mask-image: none;
  }
`,xe=t.Ay.div`
  margin-bottom: 0;

  &:last-child {
    margin-bottom: 0;
  }
`,he=t.Ay.div`
  color: #8898AA;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 16px;
  margin-bottom: 6px;
  margin-top: 20px;
`,ue=(0,t.Ay)(o.N_)`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  color: #6B7C93;
  text-decoration: none;
  transition: all 0.15s;
  font-size: 13px;
  font-weight: 500;
  position: relative;
  min-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #F0F4FF;
    color: #635BFF;
  }

  ${e=>e.active&&"\n    background: #F0F4FF;\n    color: #635BFF;\n    border-right: 2px solid #635BFF;\n  "}

  ${e=>e.hasPending&&"\n    &::after {\n      content: '';\n      position: absolute;\n      right: 12px;\n      top: 50%;\n      transform: translateY(-50%);\n      width: 8px;\n      height: 8px;\n      background: #FF6B6B;\n      border-radius: 50%;\n      animation: blink 1s infinite;\n    }\n  "}

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`,ge=t.Ay.span`
  margin-right: 10px;
  font-size: 13px;
  width: 16px;
  text-align: center;
  transition: all 0.3s ease;
  display: inline-block;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  flex-shrink: 0;

  ${e=>e.hasPending&&"\n    animation: pulse 1.5s infinite;\n  "}

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`,me=t.Ay.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  color: #B0BEC5;
  font-size: 13px;
  font-weight: 500;
  min-height: 28px;
  white-space: nowrap;
  cursor: not-allowed;
  user-select: none;
`,je=t.Ay.span`
  margin-right: 10px;
  font-size: 13px;
  width: 16px;
  text-align: center;
  display: inline-block;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #B0BEC5;
  flex-shrink: 0;
`,ve=t.Ay.div`
  margin-left: ${e=>e.isCollapsed?"0px":"220px"};
  min-height: 100vh;
  background: #FAFBFC;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`,fe=t.Ay.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  z-index: 999;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
  }
`,ye=t.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  display: none;
  align-items: center;
  justify-content: center;
  color: #0A2540;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background: #F6F9FC;
    border-radius: 4px;
  }
`,be=t.Ay.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`,Ce=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ke=t.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F5F9;
  }
`,Ae=t.Ay.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 11px;
  color: white;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,we=t.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 480px) {
    display: none;
  }
`,Fe=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1;
`,Se=t.Ay.div`
  font-size: 10px;
  color: #6B7280;
  text-transform: capitalize;
  line-height: 1;
`,$e=t.Ay.div`
  @media (max-width: 768px) {
    padding-top: 56px;
  }
`,Be=t.Ay.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;

  @media (max-width: 768px) {
    display: ${e=>e.isOpen?"block":"none"};
  }
`,Ee=t.Ay.div`
  margin-top: auto;
`,De=t.Ay.div`
  padding: 16px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`,ze=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #F0F4FF;
  }
`,Re=t.Ay.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: white;
  flex-shrink: 0;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,Pe=t.Ay.div`
  flex: 1;
  min-width: 0;
`,Ie=t.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Me=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  font-weight: 500;
`,Le=t.Ay.div`
  font-size: 10px;
  color: #8898AA;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Te=e=>{var n,i;let{children:t}=e;const p=(0,o.zy)(),h=(0,o.Zp)(),[u,g]=(0,r.useState)(!1),[m,j]=(0,r.useState)(!1),[v,f]=(0,r.useState)(""),y=r.useRef(null),b=r.useRef(0),{logout:C,currentStaff:k,isLoggedIn:A}=(0,s.g)(),{user:w,logout:F}=(0,a.As)(),{paymentStatus:S,canAccess:$}=(0,l.e)(),{orders:B}=(0,d.h)(),E=(null===(n=p.pathname.match(/\/restaurant\/(\d+)/))||void 0===n?void 0:n[1])||(null===w||void 0===w?void 0:w.restaurantId)||(null===w||void 0===w||null===(i=w.restaurant_id)||void 0===i?void 0:i.toString())||"1",{isRouteAllowed:D}=(e=>{const[n,i]=(0,r.useState)([]),[t,o]=(0,r.useState)(!0),[s,a]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{if(!e)return i([]),void o(!1);try{o(!0);const n=await fetch(`/api/restaurants/${e}/allowed-routes`);if(!n.ok)throw new Error("Failed to fetch allowed routes");const r=await n.json();i(r.allowed_routes||[]),a(null)}catch(n){console.error("useAllowedRoutes Error:",n),a(n instanceof Error?n.message:"Unknown error"),i([])}finally{o(!1)}})()},[e]),{allowedRoutes:n,loading:t,error:s,isRouteAllowed:i=>{if(0===n.length)return!0;const r=i.replace(/:restaurantId/g,(null===e||void 0===e?void 0:e.toString())||"");return n.some(n=>{const i=n.replace(/:restaurantId/g,(null===e||void 0===e?void 0:e.toString())||"").replace(/:slug/g,"[^/]+");return new RegExp(`^${i}$`).test(r)})}}})("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role)?Number(E):null),z=B&&Array.isArray(B)?B.filter(e=>"pending"===e.status).length:0,R=()=>{C(),F(),h("/pos")},P=e=>p.pathname===e,I=e=>{if(!e)return"?";const n=e.trim().split(" ").filter(e=>e.length>0);return 0===n.length?"?":1===n.length?n[0].substring(0,2).toUpperCase():n.slice(0,2).map(e=>e[0]).join("").toUpperCase()},M=()=>{window.innerWidth<=768&&g(!1)},L=()=>{j(!m)};return(0,r.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const n=await e.json();n.brand_logo?f(n.brand_logo):n.brandLogo?f(n.brandLogo):n.logo?f(n.logo):f("")}}catch(e){console.error("Failed to load brand logo from API:",e),f("")}};e();const n=async()=>{console.log("Brand logo update event received, reloading from API..."),await e()};return window.addEventListener("brandLogoUpdated",n),()=>{window.removeEventListener("brandLogoUpdated",n)}},[]),(0,r.useEffect)(()=>{const e=p.pathname;e.includes("/invoices")||e.includes("/profile")||e.includes("/settings")||"System Admin"!==(null===w||void 0===w?void 0:w.role)&&($(e)||"blocked"!==S.restrictionLevel&&h("/pos/dashboard"))},[p.pathname,S.restrictionLevel,$,h,w]),(0,r.useEffect)(()=>{const e=y.current;if(!e)return;b.current=e.scrollTop;const n=setTimeout(()=>{e&&void 0!==b.current&&(e.scrollTop=b.current)},0);return()=>clearTimeout(n)},[p.pathname]),"Restaurant Admin"!==(null===w||void 0===w?void 0:w.role)&&"Staff"!==(null===w||void 0===w?void 0:w.role)||"inactive"!==(null===w||void 0===w?void 0:w.restaurantStatus)?"blocked"===S.restrictionLevel&&"System Admin"!==(null===w||void 0===w?void 0:w.role)?(0,x.jsx)(re,{}):(0,x.jsxs)(c.i,{children:[(0,x.jsxs)(te,{children:[(0,x.jsx)(N,{}),(0,x.jsxs)(fe,{children:[(0,x.jsx)(ye,{onClick:()=>{g(!u)},children:"\u2630"}),(0,x.jsx)(be,{children:v&&(0,x.jsx)("img",{src:v,alt:"Brand Logo",style:{maxHeight:"32px",objectFit:"contain"}})}),(0,x.jsx)(Ce,{children:A&&k?(0,x.jsxs)(ke,{onClick:()=>window.location.href="/profile",children:[(0,x.jsx)(Ae,{role:k.role,children:I(k.name)}),(0,x.jsxs)(we,{children:[(0,x.jsx)(Fe,{children:k.name}),(0,x.jsx)(Se,{children:k.role})]})]}):(0,x.jsx)(ke,{onClick:()=>window.location.href="/profile",children:(0,x.jsx)(Ae,{role:"default",children:"?"})})})]}),(0,x.jsx)(Be,{isOpen:u,onClick:M}),(0,x.jsxs)(oe,{isOpen:u,isCollapsed:m,children:[(0,x.jsxs)(se,{isCollapsed:m,children:[!m&&(0,x.jsx)(de,{children:v&&(0,x.jsx)(ce,{src:v,alt:"Brand Logo"})}),(0,x.jsx)(ae,{onClick:L,title:m?"Expand Sidebar":"Collapse Sidebar",children:m?(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M9 18l6-6-6-6"})}):(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M15 18l-6-6 6-6"})})})]}),(0,x.jsxs)(pe,{ref:y,children:[(0,x.jsxs)(xe,{children:["System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:"/pos/admin/dashboard",active:P("/pos/admin/dashboard"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25a0"}),"Dashboard"]}),(0,x.jsx)(he,{children:"Management"}),(0,x.jsxs)(ue,{to:"/pos/admin/managers",active:P("/pos/admin/managers"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25ef"}),"Managers"]}),(0,x.jsxs)(ue,{to:"/pos/admin/restaurants",active:P("/pos/admin/restaurants"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(ue,{to:"/pos/admin/staff",active:P("/pos/admin/staff"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c6"}),"Staff"]}),(0,x.jsx)(he,{children:"Billing"}),(0,x.jsxs)(ue,{to:"/pos/admin/subscriptions",active:P("/pos/admin/subscriptions"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(ue,{to:"/pos/admin/invoices",active:P("/pos/admin/invoices"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(ue,{to:"/pos/admin/plans",active:P("/pos/admin/plans"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2261"}),"Subscription Plans"]}),(0,x.jsxs)(ue,{to:"/pos/admin/payment-settings",active:P("/pos/admin/payment-settings"),onClick:M,children:[(0,x.jsx)(ge,{children:"$"}),"Payment Settings"]}),(0,x.jsx)(he,{children:"Analytics"}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Report"]}),(0,x.jsx)(he,{children:"Support"}),(0,x.jsxs)(ue,{to:"/pos/admin/support",active:P("/pos/admin/support"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"Inquiry Management"]}),(0,x.jsxs)(ue,{to:"/pos/admin/contact-inquiries",active:P("/pos/admin/contact-inquiries"),onClick:M,children:[(0,x.jsx)(ge,{children:"@"}),"Contact Inquiries"]})]}),("Brand General"===(null===w||void 0===w?void 0:w.role)||"Brand Manager"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:"/pos/brand/general/dashboard",active:P("/pos/brand/general/dashboard"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25a0"}),"Dashboard"]}),(0,x.jsx)(he,{children:"Management"}),(0,x.jsxs)(ue,{to:"/pos/brand/general/management",active:P("/pos/brand/general/management"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25ac"}),"Brands"]}),(0,x.jsxs)(ue,{to:"/pos/manager/restaurants",active:P("/pos/manager/restaurants"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(ue,{to:"/pos/manager/staff",active:P("/pos/manager/staff"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c6"}),"Staff"]}),(0,x.jsx)(he,{children:"Products"}),(0,x.jsxs)(ue,{to:"/pos/brand-products",active:P("/pos/brand-products"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c7"}),"Products"]}),(0,x.jsxs)(ue,{to:"/pos/recipes",active:P("/pos/recipes"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Recipes"]}),(0,x.jsxs)(ue,{to:"/pos/brand-product-recipes",active:P("/pos/brand-product-recipes"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2295"}),"Product Recipes"]}),(0,x.jsx)(he,{children:"Stock Management"}),(0,x.jsxs)(ue,{to:"/pos/suppliers",active:P("/pos/suppliers"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c7"}),"Suppliers"]}),(0,x.jsxs)(ue,{to:"/pos/brand-inventory",active:P("/pos/brand-inventory"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25a4"}),"Inventory"]}),(0,x.jsx)(he,{children:"Marketing"}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Customers"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Coupons"]}),(0,x.jsx)(he,{children:"Analytics"}),(0,x.jsxs)(ue,{to:"/pos/brand/general/performance",active:P("/pos/brand/general/performance"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Performance"]}),(0,x.jsxs)(ue,{to:"/pos/brand/general/reports",active:P("/pos/brand/general/reports"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c9"}),"Reports"]}),(0,x.jsx)(he,{children:"Billing"}),(0,x.jsxs)(ue,{to:"/pos/brand/invoices",active:P("/pos/brand/invoices"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Subscription Plans"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Subscriptions"]}),(0,x.jsxs)(ue,{to:"/pos/brand/payment-settings",active:P("/pos/brand/payment-settings"),onClick:M,children:[(0,x.jsx)(ge,{children:"$"}),"Payment Settings"]}),(0,x.jsx)(he,{children:"Support"}),(0,x.jsxs)(ue,{to:"/pos/brand/general/system-inquiry",active:P("/pos/brand/general/system-inquiry"),onClick:M,children:[(0,x.jsx)(ge,{children:"?"}),"System Inquiry"]}),(0,x.jsxs)(ue,{to:"/pos/brand/general/operation-inquiry",active:P("/pos/brand/general/operation-inquiry"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"Inquiry Management"]})]}),("Foodcourt General"===(null===w||void 0===w?void 0:w.role)||"Foodcourt Manager"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:"/pos/foodcourt/general/dashboard",active:P("/pos/foodcourt/general/dashboard"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25a0"}),"Dashboard"]}),(0,x.jsx)(he,{children:"Management"}),(0,x.jsxs)(ue,{to:"/pos/foodcourt/general/management",active:P("/pos/foodcourt/general/management"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c9"}),"Foodcourts"]}),(0,x.jsxs)(ue,{to:"/pos/manager/restaurants",active:P("/pos/manager/restaurants"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(ue,{to:"/pos/manager/staff",active:P("/pos/manager/staff"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c6"}),"Staff"]}),(0,x.jsx)(he,{children:"Marketing"}),(0,x.jsxs)(ue,{to:"/pos/manager/customers",active:P("/pos/manager/customers"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25cb"}),"Customers"]}),(0,x.jsxs)(ue,{to:"/pos/manager/coupons",active:P("/pos/manager/coupons"),onClick:M,children:[(0,x.jsx)(ge,{children:"%"}),"Coupons"]}),(0,x.jsx)(he,{children:"Analytics"}),(0,x.jsxs)(ue,{to:"/pos/foodcourt/general/stats",active:P("/pos/foodcourt/general/stats"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Statistics"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Sales"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Reports"]}),(0,x.jsx)(he,{children:"Billing"}),(0,x.jsxs)(ue,{to:"/pos/foodcourt/invoices",active:P("/pos/foodcourt/invoices"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Subscription Plans"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Subscriptions"]}),(0,x.jsxs)(ue,{to:"/pos/foodcourt/payment-settings",active:P("/pos/foodcourt/payment-settings"),onClick:M,children:[(0,x.jsx)(ge,{children:"$"}),"Payment Settings"]}),(0,x.jsx)(he,{children:"Support"}),(0,x.jsxs)(ue,{to:"/pos/foodcourt/general/system-inquiry",active:P("/pos/foodcourt/general/system-inquiry"),onClick:M,children:[(0,x.jsx)(ge,{children:"?"}),"System Inquiry"]}),(0,x.jsxs)(ue,{to:"/pos/foodcourt/general/operation-inquiry",active:P("/pos/foodcourt/general/operation-inquiry"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"Inquiry Management"]})]}),"Supplier Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Dashboard"]}),(0,x.jsx)(he,{children:"Orders"}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Purchase Orders"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Order History"]}),(0,x.jsx)(he,{children:"Products"}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Products"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Price List"]}),(0,x.jsx)(he,{children:"Customers"}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Restaurants"]}),(0,x.jsx)(he,{children:"Analytics"}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Sales Report"]})]}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:`/restaurant/${E}/dashboard`,active:P(`/restaurant/${E}/dashboard`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25a0"}),"Dashboard"]}),(0,x.jsxs)(ue,{to:`/restaurant/${E}/live-orders`,active:P(`/restaurant/${E}/live-orders`),hasPending:z>0,onClick:M,children:[(0,x.jsx)(ge,{hasPending:z>0,children:"\u25c9"}),"Live Orders"]})]})]}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"System Access"}),D(`/restaurant/${E}/pos-terminal`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/pos-terminal`,active:P(`/restaurant/${E}/pos-terminal`),onClick:e=>{e.preventDefault(),M(),window.open(`/restaurant/${E}/pos-terminal`,"_blank")},children:[(0,x.jsx)(ge,{children:"\u25a6"}),"POS Terminal"]}),D(`/restaurant/${E}/kitchen`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/kitchen`,active:P(`/restaurant/${E}/kitchen`),onClick:e=>{e.preventDefault(),M(),window.open(`/restaurant/${E}/kitchen`,"_blank")},children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Kitchen Display"]}),D(`/restaurant/${E}/display`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/display`,active:P(`/restaurant/${E}/display`),onClick:e=>{e.preventDefault(),M(),window.open(`/restaurant/${E}/display`,"_blank")},children:[(0,x.jsx)(ge,{children:"\u25a1"}),"Customer Display"]}),D("/mobile/:slug/menu")&&(0,x.jsxs)(ue,{to:"/mobile",active:P("/mobile"),onClick:async e=>{if(e.preventDefault(),M(),null===w||void 0===w||!w.restaurantId)return console.error("No restaurant ID found for user"),void alert("Unable to open mobile order - no restaurant associated with your account");const n=w.restaurantId;console.log("Fetching restaurant:",n);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${n}`,{credentials:"include",headers:{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}});if(console.log("Response status:",i.status),i.ok){const e=await i.json();console.log("Restaurant result:",e);const r=(e.success?e.data:e).slug||`restaurant-${n}`;console.log("Using slug:",r),window.open(`/mobile/${r}`,"_blank")}else console.error("Failed to fetch restaurant, status:",i.status),window.open(`/mobile/restaurant-${n}`,"_blank")}catch(i){console.error("Error fetching restaurant slug:",i),window.open(`/mobile/restaurant-${n}`,"_blank")}},children:[(0,x.jsx)(ge,{children:"\u25ef"}),"Mobile Order"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Products"}),D(`/restaurant/${E}/menu`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/menu`,active:P(`/restaurant/${E}/menu`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2261"}),"Menu"]}),D(`/restaurant/${E}/categories`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/categories`,active:P(`/restaurant/${E}/categories`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Categories"]}),D(`/restaurant/${E}/options`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/options`,active:P(`/restaurant/${E}/options`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2699"}),"Options"]}),D(`/restaurant/${E}/recipe-management`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/recipe-management`,active:P(`/restaurant/${E}/recipe-management`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25d8"}),"Recipe"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Stock Management"}),D(`/restaurant/${E}/suppliers`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/suppliers`,active:P(`/restaurant/${E}/suppliers`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c7"}),"Suppliers"]}),D(`/restaurant/${E}/inventory`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/inventory`,active:P(`/restaurant/${E}/inventory`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25a4"}),"Inventory"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Purchase Orders"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Team"}),D(`/restaurant/${E}/staff`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/staff`,active:P(`/restaurant/${E}/staff`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c6"}),"Staff"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Marketing"}),D(`/restaurant/${E}/customers`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/customers`,active:P(`/restaurant/${E}/customers`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25ef"}),"Customers"]}),D(`/restaurant/${E}/coupons`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/coupons`,active:P(`/restaurant/${E}/coupons`),onClick:M,children:[(0,x.jsx)(ge,{children:"%"}),"Coupons"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Analytics"}),D(`/restaurant/${E}/reports`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/reports`,active:P(`/restaurant/${E}/reports`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2630"}),"Reports"]}),D(`/restaurant/${E}/history`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/history`,active:P(`/restaurant/${E}/history`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2261"}),"Activity History"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Support"}),D(`/restaurant/${E}/invoices`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/invoices`,active:P(`/restaurant/${E}/invoices`),onClick:M,children:[(0,x.jsx)(ge,{children:"$"}),"Invoices"]}),D(`/restaurant/${E}/support`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/support`,active:P(`/restaurant/${E}/support`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"System Inquiry"]}),D(`/restaurant/${E}/operation-inquiry`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/operation-inquiry`,active:P(`/restaurant/${E}/operation-inquiry`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Operation Inquiry"]})]}),(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Settings"}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role)?(0,x.jsxs)(ue,{to:`/restaurant/${E}/profile`,active:P(`/restaurant/${E}/profile`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25ef"}),"My Profile"]}):"Supplier Admin"===(null===w||void 0===w?void 0:w.role)?(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"My Profile"]}):(0,x.jsxs)(ue,{to:"/pos/profile",active:P("/pos/profile"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25ef"}),"My Profile"]}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:"/pos/admin/settings",active:P("/pos/admin/settings"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2699"}),"Company Info"]}),(0,x.jsxs)(ue,{to:"/pos/admin/site-settings",active:P("/pos/admin/site-settings"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Site Settings"]}),(0,x.jsxs)(ue,{to:"/pos/admin/notification-settings",active:P("/pos/admin/notification-settings"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2709"}),"Notifications"]}),(0,x.jsxs)(ue,{to:"/pos/admin/system-config",active:P("/pos/admin/system-config"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2699"}),"System Config"]}),(0,x.jsxs)(ue,{to:"/pos/admin/content",active:P("/pos/admin/content"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2630"}),"Content"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Security"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Backup & Restore"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"System Logs"]})]}),("Brand General"===(null===w||void 0===w?void 0:w.role)||"Brand Manager"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:"/pos/brand/company-info",active:P("/pos/brand/company-info"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Company Info"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Notifications"]})]}),("Foodcourt General"===(null===w||void 0===w?void 0:w.role)||"Foodcourt Manager"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:"/pos/foodcourt/company-info",active:P("/pos/foodcourt/company-info"),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Company Info"]}),(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Notifications"]})]}),"Supplier Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(me,{title:"Coming Soon",children:[(0,x.jsx)(je,{children:"\u2298"}),"Company Info"]})}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:`/restaurant/${E}/settings`,active:P(`/restaurant/${E}/settings`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2699"}),"Store Settings"]}),(0,x.jsxs)(ue,{to:`/restaurant/${E}/company-information`,active:P(`/restaurant/${E}/company-information`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Company Info"]}),(0,x.jsxs)(ue,{to:`/restaurant/${E}/notification-settings`,active:P(`/restaurant/${E}/notification-settings`),onClick:M,children:[(0,x.jsx)(ge,{children:"\u2709"}),"Notifications"]})]}),(0,x.jsxs)(ue,{to:"#",onClick:e=>{e.preventDefault(),R()},children:[(0,x.jsx)(ge,{children:"\u21a9"}),"Logout"]})]})]}),(0,x.jsx)(Ee,{children:w&&(0,x.jsx)(De,{children:(0,x.jsxs)(ze,{onClick:()=>{"Restaurant Admin"===w.role||"Staff"===w.role?h(`/restaurant/${E}/profile`):h("/pos/profile")},children:[(0,x.jsx)(Re,{role:w.role,children:I(w.full_name||w.name||w.email)}),(0,x.jsxs)(Pe,{children:[(0,x.jsx)(Ie,{children:w.full_name||w.name||"User"}),(0,x.jsx)(Me,{children:w.role}),(0,x.jsx)(Le,{children:w.email})]})]})})})]}),(0,x.jsx)(le,{isCollapsed:m,onClick:L,title:"Open Sidebar",children:(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M9 18l6-6-6-6"})})}),(0,x.jsx)(ve,{isCollapsed:m,children:(0,x.jsx)($e,{children:t})})]}),(0,x.jsx)("style",{children:"\n        @media print {\n          /* Hide EVERYTHING except print content */\n          body > *:not(#bill-print-content):not([data-print-bill]) {\n            display: none !important;\n          }\n\n          body {\n            margin: 0 !important;\n            padding: 0 !important;\n          }\n        }\n      "})]}):(0,x.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#F8FAFC",padding:"20px"},children:(0,x.jsxs)("div",{style:{background:"white",borderRadius:"12px",padding:"48px",maxWidth:"500px",width:"100%",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)",textAlign:"center"},children:[(0,x.jsx)("h2",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540",marginBottom:"16px"},children:"Restaurant Inactive"}),(0,x.jsxs)("p",{style:{fontSize:"16px",color:"#6B7280",marginBottom:"24px",lineHeight:"1.6"},children:[w.restaurantName?`"${w.restaurantName}"`:"Your restaurant"," is currently inactive. All features have been temporarily disabled."]}),(0,x.jsx)("p",{style:{fontSize:"14px",color:"#8898AA",marginBottom:"32px"},children:"Please contact your system administrator to reactivate your account."}),(0,x.jsx)("button",{onClick:R,style:{background:"#635BFF",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#5A51E6",onMouseLeave:e=>e.currentTarget.style.background="#635BFF",children:"Logout"})]})})}}}]);