"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3310],{755:(e,n,r)=>{r.d(n,{e:()=>l,i:()=>a});var o=r(9950),i=r(4414);const t={primaryColor:"#8B5CF6",secondaryColor:"#A78BFA",accentColor:"#C4B5FD"},s=(0,o.createContext)(void 0),a=e=>{let{children:n}=e;const[r,a]=(0,o.useState)(t),l=e=>{a(e),document.documentElement.style.setProperty("--brand-primary",e.primaryColor),document.documentElement.style.setProperty("--brand-secondary",e.secondaryColor),document.documentElement.style.setProperty("--brand-accent",e.accentColor)},d=r.primaryColor===t.primaryColor;return(0,o.useEffect)(()=>{l(r)},[]),(0,i.jsx)(s.Provider,{value:{theme:r,setTheme:l,resetTheme:()=>{l(t)},isDefaultTheme:d},children:n})},l=()=>{const e=(0,o.useContext)(s);return e||{theme:t,setTheme:()=>{},resetTheme:()=>{},isDefaultTheme:!0}}},3310:(e,n,r)=>{r.d(n,{A:()=>Me});var o=r(9950),i=r(4752),t=r(4492),s=r(5781),a=r(1367),l=r(5651),d=r(447),c=r(755),p=r(7197),x=r(4414);const u=i.Ay.div`
  background: linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%);
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: between;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
`,h=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`,g=i.Ay.div`
  font-size: 24px;
  color: #D97706;
`,m=i.Ay.div`
  color: #92400E;
`,v=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`,j=i.Ay.div`
  font-size: 14px;
  line-height: 1.4;
`,f=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,b=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #D97706;\n    color: white;\n    \n    &:hover {\n      background: #B45309;\n    }\n  ":"\n    background: transparent;\n    color: #92400E;\n    border: 1px solid #D97706;\n    \n    &:hover {\n      background: rgba(217, 119, 6, 0.1);\n    }\n  "}
`,y=i.Ay.div`
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
`,k=i.Ay.div`
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`,C=i.Ay.div`
  padding: 24px 24px 16px 24px;
  background: ${e=>"blocked"===e.type?"linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)":"linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)"};
  border-bottom: 1px solid ${e=>"blocked"===e.type?"#FCA5A5":"#F59E0B"};
  text-align: center;
`,A=i.Ay.div`
  font-size: 48px;
  margin-bottom: 12px;
  color: ${e=>"blocked"===e.type?"#DC2626":"#D97706"};
`,w=i.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${e=>"blocked"===e.type?"#991B1B":"#92400E"};
  margin: 0 0 8px 0;
`,F=i.Ay.p`
  font-size: 16px;
  color: ${e=>"blocked"===e.type?"#B91C1C":"#A16207"};
  margin: 0;
`,S=i.Ay.div`
  padding: 24px;
`,B=i.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  text-align: center;
`,$=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
`,E=i.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #DC2626;
`,R=i.Ay.div`
  margin-bottom: 20px;
`,D=i.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,z=i.Ay.ul`
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
`,I=i.Ay.div`
  background: #FEF2F2;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,P=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #991B1B;
  margin: 0 0 12px 0;
`,M=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #FCA5A5;
  
  &:last-child {
    border-bottom: none;
  }
`,L=i.Ay.div`
  font-size: 14px;
  color: #7F1D1D;
`,T=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #991B1B;
`,O=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
`,N=i.Ay.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #DC2626;\n    color: white;\n    \n    &:hover {\n      background: #B91C1C;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,_=()=>{const{paymentStatus:e,showWarning:n,showPartialRestriction:r,showBlockedModal:o,dismissWarning:i,dismissPartialRestriction:s}=(0,l.e)(),a=(0,t.Zp)(),d=()=>{a("/invoices")};if(n&&"warning"===e.restrictionLevel)return(0,x.jsxs)(u,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(g,{children:"!"}),(0,x.jsxs)(m,{children:[(0,x.jsx)(v,{children:"Payment Reminder"}),(0,x.jsxs)(j,{children:["You have ",(0,p.vv)(e.overdueAmount)," in overdue invoices. Some features may be restricted in ",e.nextRestrictionDate?Math.ceil((new Date(e.nextRestrictionDate).getTime()-(new Date).getTime())/864e5):1," days if not paid."]})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(b,{variant:"primary",onClick:d,children:"Pay Now"}),(0,x.jsx)(b,{onClick:i,children:"Dismiss"})]})]});if(r&&"partial"===e.restrictionLevel){const n=(0,p.vr)("partial");return(0,x.jsx)(y,{children:(0,x.jsxs)(k,{children:[(0,x.jsxs)(C,{type:"partial",children:[(0,x.jsx)(A,{type:"partial",children:"\xd7"}),(0,x.jsx)(w,{type:"partial",children:"Service Restrictions Active"}),(0,x.jsxs)(F,{type:"partial",children:["Payment overdue for ",e.overdueDays," days"]})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)(B,{children:[(0,x.jsx)($,{children:"Outstanding Amount"}),(0,x.jsx)(E,{children:(0,p.vv)(e.overdueAmount)})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(D,{children:"Restricted Features:"}),(0,x.jsx)(z,{children:n.map((e,n)=>(0,x.jsx)("li",{children:e},n))})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(P,{children:"Overdue Invoices:"}),e.overdueInvoices.map(e=>(0,x.jsxs)(M,{children:[(0,x.jsxs)(L,{children:[e.invoiceNumber," (Due: ",e.dueDate,")"]}),(0,x.jsx)(T,{children:(0,p.vv)(e.amount)})]},e.id))]}),(0,x.jsxs)("div",{style:{color:"#DC2626",fontSize:"14px",textAlign:"center",marginBottom:"16px"},children:["\u23f0 Complete access will be blocked in ",e.nextRestrictionDate?Math.ceil((new Date(e.nextRestrictionDate).getTime()-(new Date).getTime())/864e5):1," days"]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(N,{variant:"primary",onClick:d,children:"Pay Outstanding Invoices"}),(0,x.jsx)(N,{variant:"secondary",onClick:s,children:"Continue with Restrictions"})]})]})]})})}if(o&&"blocked"===e.restrictionLevel){const n=(0,p.vr)("blocked");return(0,x.jsx)(y,{children:(0,x.jsxs)(k,{children:[(0,x.jsxs)(C,{type:"blocked",children:[(0,x.jsx)(A,{type:"blocked",children:"-"}),(0,x.jsx)(w,{type:"blocked",children:"Access Blocked"}),(0,x.jsx)(F,{type:"blocked",children:"Account suspended due to overdue payment"})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)(B,{children:[(0,x.jsx)($,{children:"Outstanding Amount"}),(0,x.jsx)(E,{children:(0,p.vv)(e.overdueAmount)})]}),(0,x.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",marginBottom:"20px",textAlign:"center"},children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#991B1B",marginBottom:"8px"},children:"Service Suspended"}),(0,x.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Your account has been suspended due to payment overdue for ",e.overdueDays," days. All business operations are currently unavailable."]})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(D,{children:"Blocked Features:"}),(0,x.jsx)(z,{children:n.map((e,n)=>(0,x.jsx)("li",{children:e},n))})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(P,{children:"Overdue Invoices:"}),e.overdueInvoices.map(e=>(0,x.jsxs)(M,{children:[(0,x.jsxs)(L,{children:[e.invoiceNumber," (Due: ",e.dueDate,")"]}),(0,x.jsx)(T,{children:(0,p.vv)(e.amount)})]},e.id))]}),(0,x.jsx)(O,{children:(0,x.jsx)(N,{variant:"primary",onClick:d,children:"Pay Now to Restore Access"})})]})]})})}return null},q=i.Ay.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 50%, #FCA5A5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,U=i.Ay.div`
  background: white;
  border-radius: 20px;
  padding: 48px 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 2px solid #FCA5A5;
`,G=i.Ay.div`
  font-size: 80px;
  margin-bottom: 24px;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`,H=i.Ay.h1`
  font-size: 32px;
  font-weight: 700;
  color: #991B1B;
  margin-bottom: 16px;
`,W=i.Ay.p`
  font-size: 18px;
  color: #7F1D1D;
  margin-bottom: 32px;
  line-height: 1.6;
`,Y=i.Ay.div`
  background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #FECACA;
`,K=i.Ay.div`
  font-size: 16px;
  color: #B91C1C;
  margin-bottom: 8px;
  font-weight: 500;
`,Z=i.Ay.div`
  font-size: 48px;
  font-weight: 700;
  color: #DC2626;
  margin-bottom: 8px;
`,V=i.Ay.div`
  font-size: 14px;
  color: #991B1B;
`,X=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`,J=i.Ay.button`
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
`,Q=i.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 20px;
  margin-top: 32px;
  text-align: left;
`,ee=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 12px;
`,ne=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  
  strong {
    color: #0A2540;
    font-weight: 600;
  }
`,re=i.Ay.button`
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
`,oe=()=>{const{paymentStatus:e}=(0,l.e)(),n=(0,t.Zp)();return(0,x.jsx)(q,{children:(0,x.jsxs)(U,{children:[(0,x.jsx)(G,{children:"-"}),(0,x.jsx)(H,{children:"Access Suspended"}),(0,x.jsx)(W,{children:"Your account has been temporarily suspended due to overdue payment. Please settle your outstanding invoices to restore full access to all services."}),(0,x.jsxs)(Y,{children:[(0,x.jsx)(K,{children:"Outstanding Amount"}),(0,x.jsx)(Z,{children:(0,p.vv)(e.overdueAmount)}),(0,x.jsxs)(V,{children:["Overdue for ",e.overdueDays," days"]})]}),(0,x.jsxs)(X,{children:[(0,x.jsx)(J,{onClick:()=>{n("/invoices")},children:"\ud83e\uddfe View & Pay Invoices"}),(0,x.jsx)(re,{onClick:()=>{n("/pos")},children:"Switch Account"})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(ee,{children:"Need Help?"}),(0,x.jsxs)(ne,{children:[(0,x.jsx)("strong",{children:"Support Team:"}),(0,x.jsx)("br",{}),"\ud83d\udce7 Email: billing@orderhere.com",(0,x.jsx)("br",{}),"\ud83d\udcde Phone: +60 3-1234-5678",(0,x.jsx)("br",{}),"\ud83d\udd50 Hours: Mon-Fri 9AM-6PM (GMT+8)",(0,x.jsx)("br",{}),(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"Payment Methods:"}),(0,x.jsx)("br",{}),"\u2022 Online Banking Transfer",(0,x.jsx)("br",{}),"\u2022 Credit/Debit Card",(0,x.jsx)("br",{}),"\u2022 FPX Payment Gateway",(0,x.jsx)("br",{}),"\u2022 Cash Deposit (Selected Banks)"]})]})]})})},ie=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
`,te=i.Ay.div`
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
`,se=i.Ay.div`
  padding: ${e=>e.isCollapsed?"16px 8px":"16px"};
  border-bottom: 1px solid #E6EBF1;
  flex-shrink: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: ${e=>e.isCollapsed?"center":"space-between"};
`,ae=i.Ay.button`
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
`,le=i.Ay.button`
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
`,de=i.Ay.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`,ce=i.Ay.img`
  max-width: 140px;
  max-height: 60px;
  object-fit: contain;
`,pe=i.Ay.nav`
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
`,xe=i.Ay.div`
  margin-bottom: 0;

  &:last-child {
    margin-bottom: 0;
  }
`,ue=i.Ay.div`
  color: #8898AA;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 16px;
  margin-bottom: 6px;
  margin-top: 20px;
`,he=(0,i.Ay)(t.N_)`
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
`,ge=i.Ay.span`
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
`,me=i.Ay.div`
  margin-left: ${e=>e.isCollapsed?"0px":"220px"};
  min-height: 100vh;
  background: #FAFBFC;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`,ve=i.Ay.div`
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
`,je=i.Ay.button`
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
`,fe=i.Ay.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`,be=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ye=i.Ay.button`
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
`,ke=i.Ay.div`
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
`,Ce=i.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 480px) {
    display: none;
  }
`,Ae=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1;
`,we=i.Ay.div`
  font-size: 10px;
  color: #6B7280;
  text-transform: capitalize;
  line-height: 1;
`,Fe=i.Ay.div`
  @media (max-width: 768px) {
    padding-top: 56px;
  }
`,Se=i.Ay.div`
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
`,Be=i.Ay.div`
  margin-top: auto;
`,$e=i.Ay.div`
  padding: 16px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`,Ee=i.Ay.div`
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
`,Re=i.Ay.div`
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
`,De=i.Ay.div`
  flex: 1;
  min-width: 0;
`,ze=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Ie=i.Ay.div`
  font-size: 11px;
  color: #6B7280;
  font-weight: 500;
`,Pe=i.Ay.div`
  font-size: 10px;
  color: #8898AA;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Me=e=>{var n,r;let{children:i}=e;const p=(0,t.zy)(),u=(0,t.Zp)(),[h,g]=(0,o.useState)(!1),[m,v]=(0,o.useState)(!1),[j,f]=(0,o.useState)(""),b=o.useRef(null),y=o.useRef(0),{logout:k,currentStaff:C,isLoggedIn:A}=(0,s.g)(),{user:w,logout:F}=(0,a.As)(),{paymentStatus:S,canAccess:B}=(0,l.e)(),{orders:$}=(0,d.h)(),E=null===(n=p.pathname.match(/\/restaurant\/(\d+)/))||void 0===n?void 0:n[1],R=E||(null===w||void 0===w?void 0:w.restaurantId)||(null===w||void 0===w||null===(r=w.restaurant_id)||void 0===r?void 0:r.toString())||"1";console.log("=".repeat(80)),console.log("MainLayout Debug - PLEASE CHECK THIS LOG:"),console.log("=".repeat(80)),console.log("User object:",w),console.log("User role:",null===w||void 0===w?void 0:w.role),console.log("URL restaurantId:",E),console.log("Final restaurantId:",R),console.log("user.restaurantId:",null===w||void 0===w?void 0:w.restaurantId),console.log("user.restaurant_id:",null===w||void 0===w?void 0:w.restaurant_id),console.log("pathname:",p.pathname),console.log("=".repeat(80)),w||console.error("\u274c USER IS NULL! Not logged in or auth context failed!"),w&&!w.role&&console.error("\u274c USER HAS NO ROLE!",w);const{isRouteAllowed:D}=(e=>{const[n,r]=(0,o.useState)([]),[i,t]=(0,o.useState)(!0),[s,a]=(0,o.useState)(null);return(0,o.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd0d useAllowedRoutes: restaurantId =",e),!e)return console.log("\u274c useAllowedRoutes: No restaurantId, setting empty array"),r([]),void t(!1);try{t(!0),console.log("\ud83d\udce1 useAllowedRoutes: Fetching from /api/restaurants/"+e+"/allowed-routes");const n=await fetch(`/api/restaurants/${e}/allowed-routes`);if(!n.ok)throw new Error("Failed to fetch allowed routes");const o=await n.json();console.log("\u2705 useAllowedRoutes: Got allowed routes:",o.allowed_routes),r(o.allowed_routes||[]),a(null)}catch(n){console.error("\u274c useAllowedRoutes Error:",n),a(n instanceof Error?n.message:"Unknown error"),r([])}finally{t(!1)}})()},[e]),{allowedRoutes:n,loading:i,error:s,isRouteAllowed:r=>{if(console.log("\ud83d\udd0d isRouteAllowed checking:",r),console.log("\ud83d\udccb Available routes:",n),0===n.length)return console.log("\u26a0\ufe0f No routes loaded, allowing all by default"),!0;const o=r.replace(/:restaurantId/g,(null===e||void 0===e?void 0:e.toString())||"");console.log("\ud83d\udd04 Normalized route:",o);const i=n.some(n=>{const r=n.replace(/:restaurantId/g,(null===e||void 0===e?void 0:e.toString())||"").replace(/:slug/g,"[^/]+"),i=new RegExp(`^${r}$`).test(o);return i&&console.log("\u2705 Route matched:",n,"\u2192",r),i});return console.log(i?"\u2705 Route ALLOWED":"\u274c Route BLOCKED"),i}}})("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role)?Number(R):null),z=$&&Array.isArray($)?$.filter(e=>"pending"===e.status).length:0,I=()=>{k(),F(),u("/pos")},P=e=>p.pathname===e,M=e=>{if(!e)return"?";const n=e.trim().split(" ").filter(e=>e.length>0);return 0===n.length?"?":1===n.length?n[0].substring(0,2).toUpperCase():n.slice(0,2).map(e=>e[0]).join("").toUpperCase()},L=()=>{window.innerWidth<=768&&g(!1)},T=()=>{v(!m)};return(0,o.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const n=await e.json();n.brand_logo?f(n.brand_logo):n.brandLogo?f(n.brandLogo):n.logo?f(n.logo):f("")}}catch(e){console.error("Failed to load brand logo from API:",e),f("")}};e();const n=async()=>{console.log("Brand logo update event received, reloading from API..."),await e()};return window.addEventListener("brandLogoUpdated",n),()=>{window.removeEventListener("brandLogoUpdated",n)}},[]),(0,o.useEffect)(()=>{const e=p.pathname;e.includes("/invoices")||e.includes("/profile")||e.includes("/settings")||"System Admin"!==(null===w||void 0===w?void 0:w.role)&&(B(e)||"blocked"!==S.restrictionLevel&&u("/pos/dashboard"))},[p.pathname,S.restrictionLevel,B,u,w]),(0,o.useEffect)(()=>{const e=b.current;if(!e)return;y.current=e.scrollTop;const n=setTimeout(()=>{e&&void 0!==y.current&&(e.scrollTop=y.current)},0);return()=>clearTimeout(n)},[p.pathname]),"Restaurant Admin"!==(null===w||void 0===w?void 0:w.role)&&"Staff"!==(null===w||void 0===w?void 0:w.role)||"inactive"!==(null===w||void 0===w?void 0:w.restaurantStatus)?"blocked"===S.restrictionLevel&&"System Admin"!==(null===w||void 0===w?void 0:w.role)?(0,x.jsx)(oe,{}):(0,x.jsxs)(c.i,{children:[(0,x.jsxs)(ie,{children:[(0,x.jsx)(_,{}),(0,x.jsxs)(ve,{children:[(0,x.jsx)(je,{onClick:()=>{g(!h)},children:"\u2630"}),(0,x.jsx)(fe,{children:j&&(0,x.jsx)("img",{src:j,alt:"Brand Logo",style:{maxHeight:"32px",objectFit:"contain"}})}),(0,x.jsx)(be,{children:A&&C?(0,x.jsxs)(ye,{onClick:()=>window.location.href="/profile",children:[(0,x.jsx)(ke,{role:C.role,children:M(C.name)}),(0,x.jsxs)(Ce,{children:[(0,x.jsx)(Ae,{children:C.name}),(0,x.jsx)(we,{children:C.role})]})]}):(0,x.jsx)(ye,{onClick:()=>window.location.href="/profile",children:(0,x.jsx)(ke,{role:"default",children:"?"})})})]}),(0,x.jsx)(Se,{isOpen:h,onClick:L}),(0,x.jsxs)(te,{isOpen:h,isCollapsed:m,children:[(0,x.jsxs)(se,{isCollapsed:m,children:[!m&&(0,x.jsx)(de,{children:j&&(0,x.jsx)(ce,{src:j,alt:"Brand Logo"})}),(0,x.jsx)(ae,{onClick:T,title:m?"Expand Sidebar":"Collapse Sidebar",children:m?(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M9 18l6-6-6-6"})}):(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M15 18l-6-6 6-6"})})})]}),(0,x.jsxs)(pe,{ref:b,children:[(0,x.jsxs)(xe,{children:["System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(he,{to:"/pos/admin/dashboard",active:P("/pos/admin/dashboard"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a0"}),"Dashboard"]})}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Management"}),(0,x.jsxs)(he,{to:"/pos/admin/managers",active:P("/pos/admin/managers"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ef"}),"Managers"]}),(0,x.jsxs)(he,{to:"/pos/admin/restaurants",active:P("/pos/admin/restaurants"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(he,{to:"/pos/admin/staff",active:P("/pos/admin/staff"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c6"}),"Staff"]})]}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Billing"}),(0,x.jsxs)(he,{to:"/pos/admin/subscriptions",active:P("/pos/admin/subscriptions"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(he,{to:"/pos/admin/invoices",active:P("/pos/admin/invoices"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a6"}),"Invoices\u27e4"]}),(0,x.jsxs)(he,{to:"/pos/admin/plans",active:P("/pos/admin/plans"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2261"}),"Subscription Plans"]})]}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Analytics"}),(0,x.jsxs)(he,{to:"/pos/admin/report",active:P("/pos/admin/report"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Report\u27e4"]})]}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Support"}),(0,x.jsxs)(he,{to:"/pos/admin/support",active:P("/pos/admin/support"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"System Inquiry\u27e4"]})]}),"Foodcourt General"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(he,{to:"/pos/foodcourt/general/dashboard",active:P("/pos/foodcourt/general/dashboard"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a0"}),"Dashboard"]}),(0,x.jsxs)(he,{to:"/pos/foodcourt/general/management",active:P("/pos/foodcourt/general/management"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c9"}),"Foodcourt Management"]}),(0,x.jsxs)(he,{to:"/pos/foodcourt/general/stats",active:P("/pos/foodcourt/general/stats"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Statistics Analysis"]}),(0,x.jsxs)(he,{to:"/pos/manager/restaurants",active:P("/pos/manager/restaurants"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(he,{to:"/pos/manager/invoices",active:P("/pos/manager/invoices"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(he,{to:"/pos/manager/subscriptions",active:P("/pos/manager/subscriptions"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(he,{to:"/pos/manager/staff",active:P("/pos/manager/staff"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c6"}),"Staff"]}),(0,x.jsxs)(he,{to:"/pos/manager/sales",active:P("/pos/manager/sales"),onClick:L,children:[(0,x.jsx)(ge,{children:"$"}),"Sales"]}),(0,x.jsxs)(he,{to:"/pos/manager/reports",active:P("/pos/manager/reports"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2261"}),"Reports"]}),(0,x.jsxs)(he,{to:"/pos/manager/customers",active:P("/pos/manager/customers"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25cb"}),"Customers"]}),(0,x.jsxs)(he,{to:"/pos/manager/promotions",active:P("/pos/manager/promotions"),onClick:L,children:[(0,x.jsx)(ge,{children:"%"}),"Promotions"]}),(0,x.jsxs)(he,{to:"/pos/manager/plans",active:P("/pos/manager/plans"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u22a1"}),"Plans"]}),(0,x.jsxs)(he,{to:"/pos/manager/support",active:P("/pos/manager/support"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"Support Tickets"]}),(0,x.jsxs)(he,{to:"/pos/manager/operation-inquiry",active:P("/pos/manager/operation-inquiry"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Operation Inquiry"]})]}),"Brand General"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(he,{to:"/pos/brand/general/dashboard",active:P("/pos/brand/general/dashboard"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a0"}),"Dashboard"]})}),"Brand General"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Management"}),(0,x.jsxs)(he,{to:"/pos/brand/general/management",active:P("/pos/brand/general/management"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ac"}),"Brands"]}),(0,x.jsxs)(he,{to:"/pos/manager/restaurants",active:P("/pos/manager/restaurants"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(he,{to:"/pos/brand-products",active:P("/pos/brand-products"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c7"}),"Products"]}),(0,x.jsxs)(he,{to:"/pos/recipes",active:P("/pos/recipes"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Recipes"]}),(0,x.jsxs)(he,{to:"/pos/suppliers",active:P("/pos/suppliers"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c7"}),"Suppliers"]})]}),"Brand General"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Analytics"}),(0,x.jsxs)(he,{to:"/pos/brand/general/performance",active:P("/pos/brand/general/performance"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Performance"]}),(0,x.jsxs)(he,{to:"/pos/brand/general/reports",active:P("/pos/brand/general/reports"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c9"}),"Reports"]})]}),"Brand General"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Administration"}),(0,x.jsxs)(he,{to:"/pos/manager/invoices",active:P("/pos/manager/invoices"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(he,{to:"/pos/manager/subscriptions",active:P("/pos/manager/subscriptions"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(he,{to:"/pos/manager/staff",active:P("/pos/manager/staff"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c6"}),"Staff"]})]}),"Foodcourt Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(he,{to:"/pos/foodcourt/dashboard",active:P("/pos/foodcourt/dashboard"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a0"}),"Dashboard"]}),(0,x.jsxs)(he,{to:"/pos/foodcourt/rent-management",active:P("/pos/foodcourt/rent-management"),onClick:L,children:[(0,x.jsx)(ge,{children:"$"}),"Rent Management"]}),(0,x.jsxs)(he,{to:"/pos/foodcourt/tenant-support",active:P("/pos/foodcourt/tenant-support"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"Tenant Support"]}),(0,x.jsxs)(he,{to:"/pos/manager/restaurants",active:P("/pos/manager/restaurants"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(he,{to:"/pos/manager/invoices",active:P("/pos/manager/invoices"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(he,{to:"/pos/manager/subscriptions",active:P("/pos/manager/subscriptions"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(he,{to:"/pos/manager/staff",active:P("/pos/manager/staff"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c6"}),"Staff"]}),(0,x.jsxs)(he,{to:"/pos/manager/sales",active:P("/pos/manager/sales"),onClick:L,children:[(0,x.jsx)(ge,{children:"$"}),"Sales"]}),(0,x.jsxs)(he,{to:"/pos/manager/reports",active:P("/pos/manager/reports"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2261"}),"Reports"]}),(0,x.jsxs)(he,{to:"/pos/manager/customers",active:P("/pos/manager/customers"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25cb"}),"Customers"]}),(0,x.jsxs)(he,{to:"/pos/manager/promotions",active:P("/pos/manager/promotions"),onClick:L,children:[(0,x.jsx)(ge,{children:"%"}),"Promotions"]}),(0,x.jsxs)(he,{to:"/pos/manager/plans",active:P("/pos/manager/plans"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u22a1"}),"Plans"]}),(0,x.jsxs)(he,{to:"/pos/manager/support",active:P("/pos/manager/support"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"Support Tickets"]}),(0,x.jsxs)(he,{to:"/pos/manager/operation-inquiry",active:P("/pos/manager/operation-inquiry"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Operation Inquiry"]})]}),"Brand Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(he,{to:"/pos/brand/dashboard",active:P("/pos/brand/dashboard"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a0"}),"Dashboard"]})}),"Brand Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Management"}),(0,x.jsxs)(he,{to:"/pos/manager/restaurants",active:P("/pos/manager/restaurants"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(he,{to:"/pos/brand-products",active:P("/pos/brand-products"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c7"}),"Products"]}),(0,x.jsxs)(he,{to:"/pos/recipes",active:P("/pos/recipes"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Recipes"]}),(0,x.jsxs)(he,{to:"/pos/suppliers",active:P("/pos/suppliers"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c7"}),"Suppliers"]}),(0,x.jsxs)(he,{to:"/pos/manager/staff",active:P("/pos/manager/staff"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c6"}),"Staff"]}),(0,x.jsxs)(he,{to:"/pos/manager/customers",active:P("/pos/manager/customers"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25cb"}),"Customers"]}),(0,x.jsxs)(he,{to:"/pos/manager/promotions",active:P("/pos/manager/promotions"),onClick:L,children:[(0,x.jsx)(ge,{children:"%"}),"Promotions"]})]}),"Brand Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Analytics"}),(0,x.jsxs)(he,{to:"/pos/brand/reports",active:P("/pos/brand/reports"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Brand Reports"]}),(0,x.jsxs)(he,{to:"/pos/manager/sales",active:P("/pos/manager/sales"),onClick:L,children:[(0,x.jsx)(ge,{children:"$"}),"Sales"]}),(0,x.jsxs)(he,{to:"/pos/manager/reports",active:P("/pos/manager/reports"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2261"}),"Reports"]})]}),"Brand Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Administration"}),(0,x.jsxs)(he,{to:"/pos/manager/invoices",active:P("/pos/manager/invoices"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(he,{to:"/pos/manager/subscriptions",active:P("/pos/manager/subscriptions"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(he,{to:"/pos/manager/plans",active:P("/pos/manager/plans"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u22a1"}),"Plans"]})]}),"Brand Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(ue,{children:"Support"}),(0,x.jsxs)(he,{to:"/pos/brand/franchise-support",active:P("/pos/brand/franchise-support"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"Franchise Support"]}),(0,x.jsxs)(he,{to:"/pos/manager/support",active:P("/pos/manager/support"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"Support Tickets"]}),(0,x.jsxs)(he,{to:"/pos/manager/operation-inquiry",active:P("/pos/manager/operation-inquiry"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Operation Inquiry"]})]}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(he,{to:`/restaurant/${R}/dashboard`,active:P(`/restaurant/${R}/dashboard`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a0"}),"Dashboard"]})}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(he,{to:`/restaurant/${R}/live-orders`,active:P(`/restaurant/${R}/live-orders`),hasPending:z>0,onClick:L,children:[(0,x.jsx)(ge,{hasPending:z>0,children:"\u25c9"}),"Live Orders"]})})]}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(ue,{children:"System Access"}),(D(`/restaurant/${R}/pos-terminal`),(0,x.jsxs)(he,{to:`/restaurant/${R}/pos-terminal`,active:P(`/restaurant/${R}/pos-terminal`),onClick:e=>{e.preventDefault(),L(),window.open(`/restaurant/${R}/pos-terminal`,"_blank")},children:[(0,x.jsx)(ge,{children:"\u25a6"}),"POS Terminal"]})),D(`/restaurant/${R}/kitchen`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/kitchen`,active:P(`/restaurant/${R}/kitchen`),onClick:e=>{e.preventDefault(),L(),window.open(`/restaurant/${R}/kitchen`,"_blank")},children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Kitchen Display"]}),D(`/restaurant/${R}/display`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/display`,active:P(`/restaurant/${R}/display`),onClick:e=>{e.preventDefault(),L(),window.open(`/restaurant/${R}/display`,"_blank")},children:[(0,x.jsx)(ge,{children:"\u25a1"}),"Customer Display"]}),D("/mobile/:slug/menu")&&(0,x.jsxs)(he,{to:"/mobile",active:P("/mobile"),onClick:async e=>{if(e.preventDefault(),L(),null===w||void 0===w||!w.restaurantId)return console.error("No restaurant ID found for user"),void alert("Unable to open mobile order - no restaurant associated with your account");const n=w.restaurantId;console.log("Fetching restaurant:",n);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${n}`,{credentials:"include",headers:{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}});if(console.log("Response status:",r.status),r.ok){const e=await r.json();console.log("Restaurant result:",e);const o=(e.success?e.data:e).slug||`restaurant-${n}`;console.log("Using slug:",o),window.open(`/mobile/${o}`,"_blank")}else console.error("Failed to fetch restaurant, status:",r.status),window.open(`/mobile/restaurant-${n}`,"_blank")}catch(r){console.error("Error fetching restaurant slug:",r),window.open(`/mobile/restaurant-${n}`,"_blank")}},children:[(0,x.jsx)(ge,{children:"\u25ef"}),"Mobile Order"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(ue,{children:"Products"}),D(`/restaurant/${R}/menu`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/menu`,active:P(`/restaurant/${R}/menu`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2261"}),"Menu"]}),D(`/restaurant/${R}/categories`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/categories`,active:P(`/restaurant/${R}/categories`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Categories"]}),D(`/restaurant/${R}/options`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/options`,active:P(`/restaurant/${R}/options`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2699"}),"Options"]}),D(`/restaurant/${R}/recipe-management`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/recipe-management`,active:P(`/restaurant/${R}/recipe-management`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25d8"}),"Recipe"]}),D(`/restaurant/${R}/suppliers`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/suppliers`,active:P(`/restaurant/${R}/suppliers`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c7"}),"Suppliers"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(ue,{children:"Team"}),D(`/restaurant/${R}/staff`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/staff`,active:P(`/restaurant/${R}/staff`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c6"}),"Staff\u27e4"]}),D(`/restaurant/${R}/customers`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/customers`,active:P(`/restaurant/${R}/customers`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ef"}),"Customers\u27e4"]}),D(`/restaurant/${R}/promotions`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/promotions`,active:P(`/restaurant/${R}/promotions`),onClick:L,children:[(0,x.jsx)(ge,{children:"%"}),"Promotions\u27e4"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(ue,{children:"Analytics"}),D(`/restaurant/${R}/reports`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/reports`,active:P(`/restaurant/${R}/reports`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2630"}),"Reports"]}),D(`/restaurant/${R}/history`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/history`,active:P(`/restaurant/${R}/history`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2261"}),"Activity History\u27e4"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(ue,{children:"Billing & Support"}),D(`/restaurant/${R}/invoices`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/invoices`,active:P(`/restaurant/${R}/invoices`),onClick:L,children:[(0,x.jsx)(ge,{children:"$"}),"Invoices\u27e4"]}),D(`/restaurant/${R}/support`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/support`,active:P(`/restaurant/${R}/support`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"System Inquiry\u27e4"]}),D(`/restaurant/${R}/operation-inquiry`)&&(0,x.jsxs)(he,{to:`/restaurant/${R}/operation-inquiry`,active:P(`/restaurant/${R}/operation-inquiry`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25b2"}),"Operation Inquiry\u27e4"]})]}),(0,x.jsxs)(xe,{children:[(0,x.jsx)(ue,{children:"Settings"}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role)?(0,x.jsxs)(he,{to:`/restaurant/${R}/profile`,active:P(`/restaurant/${R}/profile`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ef"}),"My Profile"]}):(0,x.jsxs)(he,{to:"/pos/profile",active:P("/pos/profile"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ef"}),"My Profile"]}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(he,{to:"/pos/admin/settings",active:P("/pos/admin/settings"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2699"}),"Company Information"]}),(0,x.jsxs)(he,{to:"/pos/admin/site-settings",active:P("/pos/admin/site-settings"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25c8"}),"Site Settings"]}),(0,x.jsxs)(he,{to:"/pos/admin/notification-settings",active:P("/pos/admin/notification-settings"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2709"}),"Notification Settings"]}),(0,x.jsxs)(he,{to:"/pos/admin/system-config",active:P("/pos/admin/system-config"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2699"}),"System Config\u27e4"]}),(0,x.jsxs)(he,{to:"/pos/admin/security",active:P("/pos/admin/security"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25ce"}),"Security\u27e4"]}),(0,x.jsxs)(he,{to:"/pos/admin/backup",active:P("/pos/admin/backup"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25a1"}),"Backup & Restore\u27e4"]}),(0,x.jsxs)(he,{to:"/pos/admin/logs",active:P("/pos/admin/logs"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2630"}),"System Logs\u27e4"]})]}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(he,{to:`/restaurant/${R}/settings`,active:P(`/restaurant/${R}/settings`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2699"}),"Store Settings"]}),(0,x.jsxs)(he,{to:`/restaurant/${R}/company-information`,active:P(`/restaurant/${R}/company-information`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u25d0"}),"Company Information"]}),(0,x.jsxs)(he,{to:`/restaurant/${R}/notification-settings`,active:P(`/restaurant/${R}/notification-settings`),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2709"}),"Notification Settings"]})]}),"System Admin"!==(null===w||void 0===w?void 0:w.role)&&"Restaurant Admin"!==(null===w||void 0===w?void 0:w.role)&&"Staff"!==(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(he,{to:"/pos/settings",active:P("/pos/settings"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2699"}),"Settings"]}),(0,x.jsxs)(he,{to:"/pos/manager/notification-settings",active:P("/pos/manager/notification-settings"),onClick:L,children:[(0,x.jsx)(ge,{children:"\u2709"}),"Notification Settings"]})]}),(0,x.jsxs)(he,{to:"#",onClick:e=>{e.preventDefault(),I()},children:[(0,x.jsx)(ge,{children:"\u21a9"}),"Logout"]})]})]}),(0,x.jsx)(Be,{children:w&&(0,x.jsx)($e,{children:(0,x.jsxs)(Ee,{onClick:()=>{"Restaurant Admin"===w.role||"Staff"===w.role?u(`/restaurant/${R}/profile`):u("/pos/profile")},children:[(0,x.jsx)(Re,{role:w.role,children:M(w.full_name||w.name||w.email)}),(0,x.jsxs)(De,{children:[(0,x.jsx)(ze,{children:w.full_name||w.name||"User"}),(0,x.jsx)(Ie,{children:w.role}),(0,x.jsx)(Pe,{children:w.email})]})]})})})]}),(0,x.jsx)(le,{isCollapsed:m,onClick:T,title:"Open Sidebar",children:(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M9 18l6-6-6-6"})})}),(0,x.jsx)(me,{isCollapsed:m,children:(0,x.jsx)(Fe,{children:i})})]}),(0,x.jsx)("style",{children:"\n        @media print {\n          /* Hide EVERYTHING except print content */\n          body > *:not(#bill-print-content):not([data-print-bill]) {\n            display: none !important;\n          }\n\n          body {\n            margin: 0 !important;\n            padding: 0 !important;\n          }\n        }\n      "})]}):(0,x.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#F8FAFC",padding:"20px"},children:(0,x.jsxs)("div",{style:{background:"white",borderRadius:"12px",padding:"48px",maxWidth:"500px",width:"100%",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)",textAlign:"center"},children:[(0,x.jsx)("h2",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540",marginBottom:"16px"},children:"Restaurant Inactive"}),(0,x.jsxs)("p",{style:{fontSize:"16px",color:"#6B7280",marginBottom:"24px",lineHeight:"1.6"},children:[w.restaurantName?`"${w.restaurantName}"`:"Your restaurant"," is currently inactive. All features have been temporarily disabled."]}),(0,x.jsx)("p",{style:{fontSize:"14px",color:"#8898AA",marginBottom:"32px"},children:"Please contact your system administrator to reactivate your account."}),(0,x.jsx)("button",{onClick:I,style:{background:"#635BFF",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#5A51E6",onMouseLeave:e=>e.currentTarget.style.background="#635BFF",children:"Logout"})]})})}}}]);