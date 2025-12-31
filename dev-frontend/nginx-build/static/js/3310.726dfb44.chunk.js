"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3310],{755:(e,n,r)=>{r.d(n,{e:()=>l,i:()=>a});var i=r(9950),t=r(4414);const o={primaryColor:"#8B5CF6",secondaryColor:"#A78BFA",accentColor:"#C4B5FD"},s=(0,i.createContext)(void 0),a=e=>{let{children:n}=e;const[r,a]=(0,i.useState)(o),l=e=>{a(e),document.documentElement.style.setProperty("--brand-primary",e.primaryColor),document.documentElement.style.setProperty("--brand-secondary",e.secondaryColor),document.documentElement.style.setProperty("--brand-accent",e.accentColor)},d=r.primaryColor===o.primaryColor;return(0,i.useEffect)(()=>{l(r)},[]),(0,t.jsx)(s.Provider,{value:{theme:r,setTheme:l,resetTheme:()=>{l(o)},isDefaultTheme:d},children:n})},l=()=>{const e=(0,i.useContext)(s);return e||{theme:o,setTheme:()=>{},resetTheme:()=>{},isDefaultTheme:!0}}},3310:(e,n,r)=>{r.d(n,{A:()=>Me});var i=r(9950),t=r(4752),o=r(4492),s=r(5781),a=r(1367),l=r(5651),d=r(447),c=r(755),p=r(7197),x=r(4414);const h=t.Ay.div`
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
`,m=t.Ay.div`
  font-size: 24px;
  color: #D97706;
`,g=t.Ay.div`
  color: #92400E;
`,v=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`,j=t.Ay.div`
  font-size: 14px;
  line-height: 1.4;
`,f=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,b=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #D97706;\n    color: white;\n    \n    &:hover {\n      background: #B45309;\n    }\n  ":"\n    background: transparent;\n    color: #92400E;\n    border: 1px solid #D97706;\n    \n    &:hover {\n      background: rgba(217, 119, 6, 0.1);\n    }\n  "}
`,y=t.Ay.div`
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
`,k=t.Ay.div`
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`,C=t.Ay.div`
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
`,$=t.Ay.div`
  padding: 24px;
`,S=t.Ay.div`
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
`,R=t.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,z=t.Ay.ul`
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
`,T=t.Ay.div`
  font-size: 14px;
  color: #7F1D1D;
`,L=t.Ay.div`
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
`,N=()=>{const{paymentStatus:e,showWarning:n,showPartialRestriction:r,showBlockedModal:i,dismissWarning:t,dismissPartialRestriction:s}=(0,l.e)(),a=(0,o.Zp)(),d=()=>{a("/invoices")};if(n&&"warning"===e.restrictionLevel)return(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(m,{children:"!"}),(0,x.jsxs)(g,{children:[(0,x.jsx)(v,{children:"Payment Reminder"}),(0,x.jsxs)(j,{children:["You have ",(0,p.vv)(e.overdueAmount)," in overdue invoices. Some features may be restricted in ",e.nextRestrictionDate?Math.ceil((new Date(e.nextRestrictionDate).getTime()-(new Date).getTime())/864e5):1," days if not paid."]})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(b,{variant:"primary",onClick:d,children:"Pay Now"}),(0,x.jsx)(b,{onClick:t,children:"Dismiss"})]})]});if(r&&"partial"===e.restrictionLevel){const n=(0,p.vr)("partial");return(0,x.jsx)(y,{children:(0,x.jsxs)(k,{children:[(0,x.jsxs)(C,{type:"partial",children:[(0,x.jsx)(A,{type:"partial",children:"\xd7"}),(0,x.jsx)(w,{type:"partial",children:"Service Restrictions Active"}),(0,x.jsxs)(F,{type:"partial",children:["Payment overdue for ",e.overdueDays," days"]})]}),(0,x.jsxs)($,{children:[(0,x.jsxs)(S,{children:[(0,x.jsx)(B,{children:"Outstanding Amount"}),(0,x.jsx)(E,{children:(0,p.vv)(e.overdueAmount)})]}),(0,x.jsxs)(D,{children:[(0,x.jsx)(R,{children:"Restricted Features:"}),(0,x.jsx)(z,{children:n.map((e,n)=>(0,x.jsx)("li",{children:e},n))})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(I,{children:"Overdue Invoices:"}),e.overdueInvoices.map(e=>(0,x.jsxs)(M,{children:[(0,x.jsxs)(T,{children:[e.invoiceNumber," (Due: ",e.dueDate,")"]}),(0,x.jsx)(L,{children:(0,p.vv)(e.amount)})]},e.id))]}),(0,x.jsxs)("div",{style:{color:"#DC2626",fontSize:"14px",textAlign:"center",marginBottom:"16px"},children:["\u23f0 Complete access will be blocked in ",e.nextRestrictionDate?Math.ceil((new Date(e.nextRestrictionDate).getTime()-(new Date).getTime())/864e5):1," days"]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(q,{variant:"primary",onClick:d,children:"Pay Outstanding Invoices"}),(0,x.jsx)(q,{variant:"secondary",onClick:s,children:"Continue with Restrictions"})]})]})]})})}if(i&&"blocked"===e.restrictionLevel){const n=(0,p.vr)("blocked");return(0,x.jsx)(y,{children:(0,x.jsxs)(k,{children:[(0,x.jsxs)(C,{type:"blocked",children:[(0,x.jsx)(A,{type:"blocked",children:"-"}),(0,x.jsx)(w,{type:"blocked",children:"Access Blocked"}),(0,x.jsx)(F,{type:"blocked",children:"Account suspended due to overdue payment"})]}),(0,x.jsxs)($,{children:[(0,x.jsxs)(S,{children:[(0,x.jsx)(B,{children:"Outstanding Amount"}),(0,x.jsx)(E,{children:(0,p.vv)(e.overdueAmount)})]}),(0,x.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",marginBottom:"20px",textAlign:"center"},children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#991B1B",marginBottom:"8px"},children:"Service Suspended"}),(0,x.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Your account has been suspended due to payment overdue for ",e.overdueDays," days. All business operations are currently unavailable."]})]}),(0,x.jsxs)(D,{children:[(0,x.jsx)(R,{children:"Blocked Features:"}),(0,x.jsx)(z,{children:n.map((e,n)=>(0,x.jsx)("li",{children:e},n))})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(I,{children:"Overdue Invoices:"}),e.overdueInvoices.map(e=>(0,x.jsxs)(M,{children:[(0,x.jsxs)(T,{children:[e.invoiceNumber," (Due: ",e.dueDate,")"]}),(0,x.jsx)(L,{children:(0,p.vv)(e.amount)})]},e.id))]}),(0,x.jsx)(O,{children:(0,x.jsx)(q,{variant:"primary",onClick:d,children:"Pay Now to Restore Access"})})]})]})})}return null},_=t.Ay.div`
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
`,U=t.Ay.h1`
  font-size: 32px;
  font-weight: 700;
  color: #991B1B;
  margin-bottom: 16px;
`,Y=t.Ay.p`
  font-size: 18px;
  color: #7F1D1D;
  margin-bottom: 32px;
  line-height: 1.6;
`,H=t.Ay.div`
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
`,re=t.Ay.button`
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
`,ie=()=>{const{paymentStatus:e}=(0,l.e)(),n=(0,o.Zp)();return(0,x.jsx)(_,{children:(0,x.jsxs)(G,{children:[(0,x.jsx)(W,{children:"-"}),(0,x.jsx)(U,{children:"Access Suspended"}),(0,x.jsx)(Y,{children:"Your account has been temporarily suspended due to overdue payment. Please settle your outstanding invoices to restore full access to all services."}),(0,x.jsxs)(H,{children:[(0,x.jsx)(Z,{children:"Outstanding Amount"}),(0,x.jsx)(V,{children:(0,p.vv)(e.overdueAmount)}),(0,x.jsxs)(X,{children:["Overdue for ",e.overdueDays," days"]})]}),(0,x.jsxs)(K,{children:[(0,x.jsx)(J,{onClick:()=>{n("/invoices")},children:"\ud83e\uddfe View & Pay Invoices"}),(0,x.jsx)(re,{onClick:()=>{n("/pos")},children:"Switch Account"})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(ee,{children:"Need Help?"}),(0,x.jsxs)(ne,{children:[(0,x.jsx)("strong",{children:"Support Team:"}),(0,x.jsx)("br",{}),"\ud83d\udce7 Email: billing@orderhere.com",(0,x.jsx)("br",{}),"\ud83d\udcde Phone: +60 3-1234-5678",(0,x.jsx)("br",{}),"\ud83d\udd50 Hours: Mon-Fri 9AM-6PM (GMT+8)",(0,x.jsx)("br",{}),(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"Payment Methods:"}),(0,x.jsx)("br",{}),"\u2022 Online Banking Transfer",(0,x.jsx)("br",{}),"\u2022 Credit/Debit Card",(0,x.jsx)("br",{}),"\u2022 FPX Payment Gateway",(0,x.jsx)("br",{}),"\u2022 Cash Deposit (Selected Banks)"]})]})]})})},te=t.Ay.div`
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
`,me=t.Ay.span`
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
`,ge=t.Ay.div`
  margin-left: ${e=>e.isCollapsed?"0px":"220px"};
  min-height: 100vh;
  background: #FAFBFC;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`,ve=t.Ay.div`
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
`,je=t.Ay.button`
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
`,fe=t.Ay.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`,be=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ye=t.Ay.button`
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
`,ke=t.Ay.div`
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
`,Ce=t.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 480px) {
    display: none;
  }
`,Ae=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1;
`,we=t.Ay.div`
  font-size: 10px;
  color: #6B7280;
  text-transform: capitalize;
  line-height: 1;
`,Fe=t.Ay.div`
  @media (max-width: 768px) {
    padding-top: 56px;
  }
`,$e=t.Ay.div`
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
`,Se=t.Ay.div`
  margin-top: auto;
`,Be=t.Ay.div`
  padding: 16px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`,Ee=t.Ay.div`
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
`,De=t.Ay.div`
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
`,Re=t.Ay.div`
  flex: 1;
  min-width: 0;
`,ze=t.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Pe=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  font-weight: 500;
`,Ie=t.Ay.div`
  font-size: 10px;
  color: #8898AA;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Me=e=>{var n,r;let{children:t}=e;const p=(0,o.zy)(),h=(0,o.Zp)(),[u,m]=(0,i.useState)(!1),[g,v]=(0,i.useState)(!1),[j,f]=(0,i.useState)(""),b=i.useRef(null),y=i.useRef(0),{logout:k,currentStaff:C,isLoggedIn:A}=(0,s.g)(),{user:w,logout:F}=(0,a.As)(),{paymentStatus:$,canAccess:S}=(0,l.e)(),{orders:B}=(0,d.h)(),E=(null===(n=p.pathname.match(/\/restaurant\/(\d+)/))||void 0===n?void 0:n[1])||(null===w||void 0===w?void 0:w.restaurantId)||(null===w||void 0===w||null===(r=w.restaurant_id)||void 0===r?void 0:r.toString())||"1",{isRouteAllowed:D,loading:R}=(e=>{const[n,r]=(0,i.useState)([]),[t,o]=(0,i.useState)(!0),[s,a]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{if(!e)return r([]),void o(!1);try{o(!0);const n=await fetch(`/api/restaurants/${e}/allowed-routes`);if(!n.ok)throw new Error("Failed to fetch allowed routes");const i=await n.json();r(i.allowed_routes||[]),a(null)}catch(n){console.error("useAllowedRoutes Error:",n),a(n instanceof Error?n.message:"Unknown error"),r([])}finally{o(!1)}})()},[e]),{allowedRoutes:n,loading:t,error:s,isRouteAllowed:r=>{if(0===n.length)return!0;const i=r.replace(/:restaurantId/g,(null===e||void 0===e?void 0:e.toString())||"");return n.some(n=>{const r=n.replace(/:restaurantId/g,(null===e||void 0===e?void 0:e.toString())||"").replace(/:slug/g,"[^/]+");return new RegExp(`^${r}$`).test(i)})}}})("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role)?Number(E):null),z=e=>!R&&D(e),P=B&&Array.isArray(B)?B.filter(e=>"pending"===e.status).length:0,I=()=>{k(),F(),h("/pos")},M=e=>p.pathname===e,T=e=>{if(!e)return"?";const n=e.trim().split(" ").filter(e=>e.length>0);return 0===n.length?"?":1===n.length?n[0].substring(0,2).toUpperCase():n.slice(0,2).map(e=>e[0]).join("").toUpperCase()},L=()=>{window.innerWidth<=768&&m(!1)},O=()=>{v(!g)};return(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const n=await e.json();n.brand_logo?f(n.brand_logo):n.brandLogo?f(n.brandLogo):n.logo?f(n.logo):f("")}}catch(e){console.error("Failed to load brand logo from API:",e),f("")}};e();const n=async()=>{console.log("Brand logo update event received, reloading from API..."),await e()};return window.addEventListener("brandLogoUpdated",n),()=>{window.removeEventListener("brandLogoUpdated",n)}},[]),(0,i.useEffect)(()=>{const e=p.pathname;e.includes("/invoices")||e.includes("/profile")||e.includes("/settings")||"System Admin"!==(null===w||void 0===w?void 0:w.role)&&(S(e)||"blocked"!==$.restrictionLevel&&h("/pos/dashboard"))},[p.pathname,$.restrictionLevel,S,h,w]),(0,i.useEffect)(()=>{const e=b.current;if(!e)return;y.current=e.scrollTop;const n=setTimeout(()=>{e&&void 0!==y.current&&(e.scrollTop=y.current)},0);return()=>clearTimeout(n)},[p.pathname]),"Restaurant Admin"!==(null===w||void 0===w?void 0:w.role)&&"Staff"!==(null===w||void 0===w?void 0:w.role)||"inactive"!==(null===w||void 0===w?void 0:w.restaurantStatus)?"blocked"===$.restrictionLevel&&"System Admin"!==(null===w||void 0===w?void 0:w.role)?(0,x.jsx)(ie,{}):(0,x.jsxs)(c.i,{children:[(0,x.jsxs)(te,{children:[(0,x.jsx)(N,{}),(0,x.jsxs)(ve,{children:[(0,x.jsx)(je,{onClick:()=>{m(!u)},children:"\u2630"}),(0,x.jsx)(fe,{children:j&&(0,x.jsx)("img",{src:j,alt:"Brand Logo",style:{maxHeight:"32px",objectFit:"contain"}})}),(0,x.jsx)(be,{children:A&&C?(0,x.jsxs)(ye,{onClick:()=>window.location.href="/profile",children:[(0,x.jsx)(ke,{role:C.role,children:T(C.name)}),(0,x.jsxs)(Ce,{children:[(0,x.jsx)(Ae,{children:C.name}),(0,x.jsx)(we,{children:C.role})]})]}):(0,x.jsx)(ye,{onClick:()=>window.location.href="/profile",children:(0,x.jsx)(ke,{role:"default",children:"?"})})})]}),(0,x.jsx)($e,{isOpen:u,onClick:L}),(0,x.jsxs)(oe,{isOpen:u,isCollapsed:g,children:[(0,x.jsxs)(se,{isCollapsed:g,children:[!g&&(0,x.jsx)(de,{children:j&&(0,x.jsx)(ce,{src:j,alt:"Brand Logo"})}),(0,x.jsx)(ae,{onClick:O,title:g?"Expand Sidebar":"Collapse Sidebar",children:g?(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M9 18l6-6-6-6"})}):(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M15 18l-6-6 6-6"})})})]}),(0,x.jsxs)(pe,{ref:b,children:[(0,x.jsxs)(xe,{children:["System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(ue,{to:"/pos/admin/dashboard",active:M("/pos/admin/dashboard"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a0"}),"Dashboard"]})}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Management"}),(0,x.jsxs)(ue,{to:"/pos/admin/managers",active:M("/pos/admin/managers"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ef"}),"Managers"]}),(0,x.jsxs)(ue,{to:"/pos/admin/restaurants",active:M("/pos/admin/restaurants"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(ue,{to:"/pos/admin/staff",active:M("/pos/admin/staff"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c6"}),"Staff"]})]}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Billing"}),(0,x.jsxs)(ue,{to:"/pos/admin/subscriptions",active:M("/pos/admin/subscriptions"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(ue,{to:"/pos/admin/invoices",active:M("/pos/admin/invoices"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a6"}),"Invoices\u27e4"]}),(0,x.jsxs)(ue,{to:"/pos/admin/plans",active:M("/pos/admin/plans"),onClick:L,children:[(0,x.jsx)(me,{children:"\u2261"}),"Subscription Plans"]})]}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Analytics"}),(0,x.jsxs)(ue,{to:"/pos/admin/report",active:M("/pos/admin/report"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25b2"}),"Report\u27e4"]})]}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Support"}),(0,x.jsxs)(ue,{to:"/pos/admin/support",active:M("/pos/admin/support"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ce"}),"System Inquiry\u27e4"]})]}),"Foodcourt General"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:"/pos/foodcourt/general/dashboard",active:M("/pos/foodcourt/general/dashboard"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a0"}),"Dashboard"]}),(0,x.jsxs)(ue,{to:"/pos/foodcourt/general/management",active:M("/pos/foodcourt/general/management"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c9"}),"Foodcourt Management"]}),(0,x.jsxs)(ue,{to:"/pos/foodcourt/general/stats",active:M("/pos/foodcourt/general/stats"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25b2"}),"Statistics Analysis"]}),(0,x.jsxs)(ue,{to:"/pos/manager/restaurants",active:M("/pos/manager/restaurants"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(ue,{to:"/pos/manager/invoices",active:M("/pos/manager/invoices"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(ue,{to:"/pos/manager/subscriptions",active:M("/pos/manager/subscriptions"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(ue,{to:"/pos/manager/staff",active:M("/pos/manager/staff"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c6"}),"Staff"]}),(0,x.jsxs)(ue,{to:"/pos/manager/sales",active:M("/pos/manager/sales"),onClick:L,children:[(0,x.jsx)(me,{children:"$"}),"Sales"]}),(0,x.jsxs)(ue,{to:"/pos/manager/reports",active:M("/pos/manager/reports"),onClick:L,children:[(0,x.jsx)(me,{children:"\u2261"}),"Reports"]}),(0,x.jsxs)(ue,{to:"/pos/manager/customers",active:M("/pos/manager/customers"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25cb"}),"Customers"]}),(0,x.jsxs)(ue,{to:"/pos/manager/promotions",active:M("/pos/manager/promotions"),onClick:L,children:[(0,x.jsx)(me,{children:"%"}),"Promotions"]}),(0,x.jsxs)(ue,{to:"/pos/manager/plans",active:M("/pos/manager/plans"),onClick:L,children:[(0,x.jsx)(me,{children:"\u22a1"}),"Plans"]}),(0,x.jsxs)(ue,{to:"/pos/manager/support",active:M("/pos/manager/support"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ce"}),"Support Tickets"]}),(0,x.jsxs)(ue,{to:"/pos/manager/operation-inquiry",active:M("/pos/manager/operation-inquiry"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25b2"}),"Operation Inquiry"]})]}),"Brand General"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(ue,{to:"/pos/brand/general/dashboard",active:M("/pos/brand/general/dashboard"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a0"}),"Dashboard"]})}),"Brand General"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Management"}),(0,x.jsxs)(ue,{to:"/pos/brand/general/management",active:M("/pos/brand/general/management"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ac"}),"Brands"]}),(0,x.jsxs)(ue,{to:"/pos/manager/restaurants",active:M("/pos/manager/restaurants"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(ue,{to:"/pos/brand-products",active:M("/pos/brand-products"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c7"}),"Products"]}),(0,x.jsxs)(ue,{to:"/pos/recipes",active:M("/pos/recipes"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c8"}),"Recipes"]}),(0,x.jsxs)(ue,{to:"/pos/suppliers",active:M("/pos/suppliers"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c7"}),"Suppliers"]}),(0,x.jsxs)(ue,{to:"/pos/brand-inventory",active:M("/pos/brand-inventory"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a4"}),"Inventory"]})]}),"Brand General"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Analytics"}),(0,x.jsxs)(ue,{to:"/pos/brand/general/performance",active:M("/pos/brand/general/performance"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25b2"}),"Performance"]}),(0,x.jsxs)(ue,{to:"/pos/brand/general/reports",active:M("/pos/brand/general/reports"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c9"}),"Reports"]})]}),"Brand General"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Administration"}),(0,x.jsxs)(ue,{to:"/pos/manager/invoices",active:M("/pos/manager/invoices"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(ue,{to:"/pos/manager/subscriptions",active:M("/pos/manager/subscriptions"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(ue,{to:"/pos/manager/staff",active:M("/pos/manager/staff"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c6"}),"Staff"]})]}),"Foodcourt Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:"/pos/foodcourt/dashboard",active:M("/pos/foodcourt/dashboard"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a0"}),"Dashboard"]}),(0,x.jsxs)(ue,{to:"/pos/foodcourt/rent-management",active:M("/pos/foodcourt/rent-management"),onClick:L,children:[(0,x.jsx)(me,{children:"$"}),"Rent Management"]}),(0,x.jsxs)(ue,{to:"/pos/foodcourt/tenant-support",active:M("/pos/foodcourt/tenant-support"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ce"}),"Tenant Support"]}),(0,x.jsxs)(ue,{to:"/pos/manager/restaurants",active:M("/pos/manager/restaurants"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(ue,{to:"/pos/manager/invoices",active:M("/pos/manager/invoices"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(ue,{to:"/pos/manager/subscriptions",active:M("/pos/manager/subscriptions"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(ue,{to:"/pos/manager/staff",active:M("/pos/manager/staff"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c6"}),"Staff"]}),(0,x.jsxs)(ue,{to:"/pos/manager/sales",active:M("/pos/manager/sales"),onClick:L,children:[(0,x.jsx)(me,{children:"$"}),"Sales"]}),(0,x.jsxs)(ue,{to:"/pos/manager/reports",active:M("/pos/manager/reports"),onClick:L,children:[(0,x.jsx)(me,{children:"\u2261"}),"Reports"]}),(0,x.jsxs)(ue,{to:"/pos/manager/customers",active:M("/pos/manager/customers"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25cb"}),"Customers"]}),(0,x.jsxs)(ue,{to:"/pos/manager/promotions",active:M("/pos/manager/promotions"),onClick:L,children:[(0,x.jsx)(me,{children:"%"}),"Promotions"]}),(0,x.jsxs)(ue,{to:"/pos/manager/plans",active:M("/pos/manager/plans"),onClick:L,children:[(0,x.jsx)(me,{children:"\u22a1"}),"Plans"]}),(0,x.jsxs)(ue,{to:"/pos/manager/support",active:M("/pos/manager/support"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ce"}),"Support Tickets"]}),(0,x.jsxs)(ue,{to:"/pos/manager/operation-inquiry",active:M("/pos/manager/operation-inquiry"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25b2"}),"Operation Inquiry"]})]}),"Brand Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(ue,{to:"/pos/brand/dashboard",active:M("/pos/brand/dashboard"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a0"}),"Dashboard"]})}),"Brand Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Management"}),(0,x.jsxs)(ue,{to:"/pos/manager/restaurants",active:M("/pos/manager/restaurants"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25d0"}),"Restaurants"]}),(0,x.jsxs)(ue,{to:"/pos/brand-products",active:M("/pos/brand-products"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c7"}),"Products"]}),(0,x.jsxs)(ue,{to:"/pos/recipes",active:M("/pos/recipes"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c8"}),"Recipes"]}),(0,x.jsxs)(ue,{to:"/pos/suppliers",active:M("/pos/suppliers"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c7"}),"Suppliers"]}),(0,x.jsxs)(ue,{to:"/pos/brand-inventory",active:M("/pos/brand-inventory"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a4"}),"Inventory"]}),(0,x.jsxs)(ue,{to:"/pos/manager/staff",active:M("/pos/manager/staff"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c6"}),"Staff"]}),(0,x.jsxs)(ue,{to:"/pos/manager/customers",active:M("/pos/manager/customers"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25cb"}),"Customers"]}),(0,x.jsxs)(ue,{to:"/pos/manager/promotions",active:M("/pos/manager/promotions"),onClick:L,children:[(0,x.jsx)(me,{children:"%"}),"Promotions"]})]}),"Brand Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Analytics"}),(0,x.jsxs)(ue,{to:"/pos/brand/reports",active:M("/pos/brand/reports"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25b2"}),"Brand Reports"]}),(0,x.jsxs)(ue,{to:"/pos/manager/sales",active:M("/pos/manager/sales"),onClick:L,children:[(0,x.jsx)(me,{children:"$"}),"Sales"]}),(0,x.jsxs)(ue,{to:"/pos/manager/reports",active:M("/pos/manager/reports"),onClick:L,children:[(0,x.jsx)(me,{children:"\u2261"}),"Reports"]})]}),"Brand Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Administration"}),(0,x.jsxs)(ue,{to:"/pos/manager/invoices",active:M("/pos/manager/invoices"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a6"}),"Invoices"]}),(0,x.jsxs)(ue,{to:"/pos/manager/subscriptions",active:M("/pos/manager/subscriptions"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c8"}),"Subscriptions"]}),(0,x.jsxs)(ue,{to:"/pos/manager/plans",active:M("/pos/manager/plans"),onClick:L,children:[(0,x.jsx)(me,{children:"\u22a1"}),"Plans"]})]}),"Brand Manager"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(he,{children:"Support"}),(0,x.jsxs)(ue,{to:"/pos/brand/franchise-support",active:M("/pos/brand/franchise-support"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ce"}),"Franchise Support"]}),(0,x.jsxs)(ue,{to:"/pos/manager/support",active:M("/pos/manager/support"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ce"}),"Support Tickets"]}),(0,x.jsxs)(ue,{to:"/pos/manager/operation-inquiry",active:M("/pos/manager/operation-inquiry"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25b2"}),"Operation Inquiry"]})]}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(ue,{to:`/restaurant/${E}/dashboard`,active:M(`/restaurant/${E}/dashboard`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a0"}),"Dashboard"]})}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(ue,{to:`/restaurant/${E}/live-orders`,active:M(`/restaurant/${E}/live-orders`),hasPending:P>0,onClick:L,children:[(0,x.jsx)(me,{hasPending:P>0,children:"\u25c9"}),"Live Orders"]})})]}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"System Access"}),(z(`/restaurant/${E}/pos-terminal`)||!R)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/pos-terminal`,active:M(`/restaurant/${E}/pos-terminal`),onClick:e=>{e.preventDefault(),L(),window.open(`/restaurant/${E}/pos-terminal`,"_blank")},children:[(0,x.jsx)(me,{children:"\u25a6"}),"POS Terminal"]}),z(`/restaurant/${E}/kitchen`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/kitchen`,active:M(`/restaurant/${E}/kitchen`),onClick:e=>{e.preventDefault(),L(),window.open(`/restaurant/${E}/kitchen`,"_blank")},children:[(0,x.jsx)(me,{children:"\u25d0"}),"Kitchen Display"]}),z(`/restaurant/${E}/display`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/display`,active:M(`/restaurant/${E}/display`),onClick:e=>{e.preventDefault(),L(),window.open(`/restaurant/${E}/display`,"_blank")},children:[(0,x.jsx)(me,{children:"\u25a1"}),"Customer Display"]}),z("/mobile/:slug/menu")&&(0,x.jsxs)(ue,{to:"/mobile",active:M("/mobile"),onClick:async e=>{if(e.preventDefault(),L(),null===w||void 0===w||!w.restaurantId)return console.error("No restaurant ID found for user"),void alert("Unable to open mobile order - no restaurant associated with your account");const n=w.restaurantId;console.log("Fetching restaurant:",n);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${n}`,{credentials:"include",headers:{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}});if(console.log("Response status:",r.status),r.ok){const e=await r.json();console.log("Restaurant result:",e);const i=(e.success?e.data:e).slug||`restaurant-${n}`;console.log("Using slug:",i),window.open(`/mobile/${i}`,"_blank")}else console.error("Failed to fetch restaurant, status:",r.status),window.open(`/mobile/restaurant-${n}`,"_blank")}catch(r){console.error("Error fetching restaurant slug:",r),window.open(`/mobile/restaurant-${n}`,"_blank")}},children:[(0,x.jsx)(me,{children:"\u25ef"}),"Mobile Order"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Products"}),z(`/restaurant/${E}/menu`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/menu`,active:M(`/restaurant/${E}/menu`),onClick:L,children:[(0,x.jsx)(me,{children:"\u2261"}),"Menu"]}),z(`/restaurant/${E}/categories`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/categories`,active:M(`/restaurant/${E}/categories`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c8"}),"Categories"]}),z(`/restaurant/${E}/options`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/options`,active:M(`/restaurant/${E}/options`),onClick:L,children:[(0,x.jsx)(me,{children:"\u2699"}),"Options"]}),z(`/restaurant/${E}/recipe-management`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/recipe-management`,active:M(`/restaurant/${E}/recipe-management`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25d8"}),"Recipe"]}),z(`/restaurant/${E}/suppliers`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/suppliers`,active:M(`/restaurant/${E}/suppliers`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c7"}),"Suppliers"]}),z(`/restaurant/${E}/inventory`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/inventory`,active:M(`/restaurant/${E}/inventory`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a4"}),"Inventory"]}),z(`/restaurant/${E}/product-recipes`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/product-recipes`,active:M(`/restaurant/${E}/product-recipes`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a7"}),"Product Recipes"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Team"}),z(`/restaurant/${E}/staff`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/staff`,active:M(`/restaurant/${E}/staff`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c6"}),"Staff\u27e4"]}),z(`/restaurant/${E}/customers`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/customers`,active:M(`/restaurant/${E}/customers`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ef"}),"Customers\u27e4"]}),z(`/restaurant/${E}/promotions`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/promotions`,active:M(`/restaurant/${E}/promotions`),onClick:L,children:[(0,x.jsx)(me,{children:"%"}),"Promotions\u27e4"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Analytics"}),z(`/restaurant/${E}/reports`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/reports`,active:M(`/restaurant/${E}/reports`),onClick:L,children:[(0,x.jsx)(me,{children:"\u2630"}),"Reports"]}),z(`/restaurant/${E}/history`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/history`,active:M(`/restaurant/${E}/history`),onClick:L,children:[(0,x.jsx)(me,{children:"\u2261"}),"Activity History\u27e4"]})]}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Billing & Support"}),z(`/restaurant/${E}/invoices`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/invoices`,active:M(`/restaurant/${E}/invoices`),onClick:L,children:[(0,x.jsx)(me,{children:"$"}),"Invoices\u27e4"]}),z(`/restaurant/${E}/support`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/support`,active:M(`/restaurant/${E}/support`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ce"}),"System Inquiry\u27e4"]}),z(`/restaurant/${E}/operation-inquiry`)&&(0,x.jsxs)(ue,{to:`/restaurant/${E}/operation-inquiry`,active:M(`/restaurant/${E}/operation-inquiry`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25b2"}),"Operation Inquiry\u27e4"]})]}),(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:"Settings"}),"Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role)?(0,x.jsxs)(ue,{to:`/restaurant/${E}/profile`,active:M(`/restaurant/${E}/profile`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ef"}),"My Profile"]}):(0,x.jsxs)(ue,{to:"/pos/profile",active:M("/pos/profile"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ef"}),"My Profile"]}),"System Admin"===(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:"/pos/admin/settings",active:M("/pos/admin/settings"),onClick:L,children:[(0,x.jsx)(me,{children:"\u2699"}),"Company Information"]}),(0,x.jsxs)(ue,{to:"/pos/admin/site-settings",active:M("/pos/admin/site-settings"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25c8"}),"Site Settings"]}),(0,x.jsxs)(ue,{to:"/pos/admin/notification-settings",active:M("/pos/admin/notification-settings"),onClick:L,children:[(0,x.jsx)(me,{children:"\u2709"}),"Notification Settings"]}),(0,x.jsxs)(ue,{to:"/pos/admin/system-config",active:M("/pos/admin/system-config"),onClick:L,children:[(0,x.jsx)(me,{children:"\u2699"}),"System Config\u27e4"]}),(0,x.jsxs)(ue,{to:"/pos/admin/security",active:M("/pos/admin/security"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25ce"}),"Security\u27e4"]}),(0,x.jsxs)(ue,{to:"/pos/admin/backup",active:M("/pos/admin/backup"),onClick:L,children:[(0,x.jsx)(me,{children:"\u25a1"}),"Backup & Restore\u27e4"]}),(0,x.jsxs)(ue,{to:"/pos/admin/logs",active:M("/pos/admin/logs"),onClick:L,children:[(0,x.jsx)(me,{children:"\u2630"}),"System Logs\u27e4"]})]}),("Restaurant Admin"===(null===w||void 0===w?void 0:w.role)||"Staff"===(null===w||void 0===w?void 0:w.role))&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:`/restaurant/${E}/settings`,active:M(`/restaurant/${E}/settings`),onClick:L,children:[(0,x.jsx)(me,{children:"\u2699"}),"Store Settings"]}),(0,x.jsxs)(ue,{to:`/restaurant/${E}/company-information`,active:M(`/restaurant/${E}/company-information`),onClick:L,children:[(0,x.jsx)(me,{children:"\u25d0"}),"Company Information"]}),(0,x.jsxs)(ue,{to:`/restaurant/${E}/notification-settings`,active:M(`/restaurant/${E}/notification-settings`),onClick:L,children:[(0,x.jsx)(me,{children:"\u2709"}),"Notification Settings"]})]}),"System Admin"!==(null===w||void 0===w?void 0:w.role)&&"Restaurant Admin"!==(null===w||void 0===w?void 0:w.role)&&"Staff"!==(null===w||void 0===w?void 0:w.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ue,{to:"/pos/settings",active:M("/pos/settings"),onClick:L,children:[(0,x.jsx)(me,{children:"\u2699"}),"Settings"]}),(0,x.jsxs)(ue,{to:"/pos/manager/notification-settings",active:M("/pos/manager/notification-settings"),onClick:L,children:[(0,x.jsx)(me,{children:"\u2709"}),"Notification Settings"]})]}),(0,x.jsxs)(ue,{to:"#",onClick:e=>{e.preventDefault(),I()},children:[(0,x.jsx)(me,{children:"\u21a9"}),"Logout"]})]})]}),(0,x.jsx)(Se,{children:w&&(0,x.jsx)(Be,{children:(0,x.jsxs)(Ee,{onClick:()=>{"Restaurant Admin"===w.role||"Staff"===w.role?h(`/restaurant/${E}/profile`):h("/pos/profile")},children:[(0,x.jsx)(De,{role:w.role,children:T(w.full_name||w.name||w.email)}),(0,x.jsxs)(Re,{children:[(0,x.jsx)(ze,{children:w.full_name||w.name||"User"}),(0,x.jsx)(Pe,{children:w.role}),(0,x.jsx)(Ie,{children:w.email})]})]})})})]}),(0,x.jsx)(le,{isCollapsed:g,onClick:O,title:"Open Sidebar",children:(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M9 18l6-6-6-6"})})}),(0,x.jsx)(ge,{isCollapsed:g,children:(0,x.jsx)(Fe,{children:t})})]}),(0,x.jsx)("style",{children:"\n        @media print {\n          /* Hide EVERYTHING except print content */\n          body > *:not(#bill-print-content):not([data-print-bill]) {\n            display: none !important;\n          }\n\n          body {\n            margin: 0 !important;\n            padding: 0 !important;\n          }\n        }\n      "})]}):(0,x.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#F8FAFC",padding:"20px"},children:(0,x.jsxs)("div",{style:{background:"white",borderRadius:"12px",padding:"48px",maxWidth:"500px",width:"100%",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)",textAlign:"center"},children:[(0,x.jsx)("h2",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540",marginBottom:"16px"},children:"Restaurant Inactive"}),(0,x.jsxs)("p",{style:{fontSize:"16px",color:"#6B7280",marginBottom:"24px",lineHeight:"1.6"},children:[w.restaurantName?`"${w.restaurantName}"`:"Your restaurant"," is currently inactive. All features have been temporarily disabled."]}),(0,x.jsx)("p",{style:{fontSize:"14px",color:"#8898AA",marginBottom:"32px"},children:"Please contact your system administrator to reactivate your account."}),(0,x.jsx)("button",{onClick:I,style:{background:"#635BFF",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#5A51E6",onMouseLeave:e=>e.currentTarget.style.background="#635BFF",children:"Logout"})]})})}}}]);