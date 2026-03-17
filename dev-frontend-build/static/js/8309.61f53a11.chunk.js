"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8309],{8285:(e,r,n)=>{n.d(r,{MA:()=>g,_M:()=>h});const t="cash",i="card",s="ewallet",o="bank_transfer",a="qr",d="counter",l="online",c="fpx",x="staffMeal",p={[t]:"Cash",[i]:"Credit/Debit Card",[s]:"E-Wallet",[o]:"Bank Transfer",[a]:"QR Payment",[d]:"Pay at Counter",[l]:"Online Payment",[c]:"FPX Online Banking",[x]:"Staff Meal"};function h(e,r){if(r){const n=r[{cash:"cash",card:"card",ewallet:"ewallet",bank_transfer:"bankTransfer",qr:"qr",counter:"payAtCounter",online:"online",fpx:"fpx",staffMeal:"staffMeal",staff_meal:"staffMeal"}[e]||e]||r[e];if(null!==n&&void 0!==n&&n.label)return n.label}return p[e]||e}const u={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function g(e,r,n){if(!e)return"N/A";if("card"===e&&r){return`${h("card",n)}(${u[r]||r})`}return h(e,n)}},8309:(e,r,n)=>{n.r(r),n.d(r,{default:()=>H});var t=n(9950),i=n(4492),s=n(4752),o=n(8409),a=n(3224),d=n(1367),l=n(9018),c=n(4021),x=n(8608),p=n(6038),h=n(8285),u=n(4414);const g=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,m=s.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,y=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,f=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,j=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,v=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  ${e=>{let{variant:r}=e;switch(r){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
`,b=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,A=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,F=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0 0 16px 0;
    color: #0A2540;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
`,w=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 4px;
  }
`,k=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{switch(e.type){case"error":return"#FEF2F2";case"warning":return"#FFFBEB";case"info":return"#EFF6FF";default:return"#F8FAFC"}}};
  border: 1px solid ${e=>{switch(e.type){case"error":return"#FECACA";case"warning":return"#FDE68A";case"info":return"#BFDBFE";default:return"#E6EBF1"}}};
  flex-shrink: 0;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`,E=s.Ay.div`
  flex: 1;
  min-width: 0;
`,B=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"info":return"#2563EB";default:return"#374151"}}};
`,C=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,S=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,$=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,D=s.Ay.thead`
  background: #F8FAFC;
`,I=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,z=s.Ay.tbody``,T=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,N=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,_=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,M=s.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,O=s.Ay.div`
  line-height: 1.6;
`,R=s.Ay.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`,P=s.Ay.span`
  color: #6B7280;
  margin-right: 8px;
`,q=s.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,L=s.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,U=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,G=s.Ay.div`
  color: ${e=>e.isPending?"#FF6B6B":"#6B7280"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending?"500":"normal"};
`,X=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  ${e=>{switch(e.variant){case"awaiting_payment":return"background: #FEF3C7; color: #F59E0B;";case"pending":return"background: #FEF3C7; color: #92400E;";case"preparing":return"background: #DBEAFE; color: #1E40AF;";case"ready":case"served":return"background: #D1FAE5; color: #065F46;";case"completed":return"background: #E5E7EB; color: #374151;";case"cancelled":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,W=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,Y=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,Q=s.Ay.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F6F9FC;

    .icon {
      color: #0A2540;
    }

    .title {
      color: #0A2540;
    }
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    color: #6B7C93;
    transition: color 0.2s;
    font-family: 'Lucida Console', 'Courier New', monospace;
  }

  .title {
    font-weight: 600;
    font-size: 16px;
    color: #0A2540;
    margin-bottom: 4px;
    transition: color 0.2s;
  }

  .description {
    font-size: 13px;
    color: #6B7280;
  }
`,V=s.Ay.div`
  h3 {
    background: white;
    padding: 20px 24px;
    margin: 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
    border: 1px solid #E6EBF1;
    border-radius: 16px 16px 0 0;
  }
`,H=()=>{const e=(0,i.Zp)(),{user:r}=(0,d.As)(),{paymentSettings:n}=(0,l.Pj)(),s=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id)||"",[H,K]=(0,t.useState)(null),[Z,J]=(0,t.useState)(!0),[ee,re]=(0,t.useState)("week"),[ne,te]=(0,t.useState)([]),{defaultCurrency:ie}=(0,c.i1)(),[se,oe]=(0,t.useState)("RM"),[ae,de]=(0,t.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0}),{items:le}=(0,x.d)({role:(null===r||void 0===r?void 0:r.role)||"",restaurantId:s});if((0,t.useEffect)(()=>{ie&&oe(ie)},[ie]),(0,t.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&de(e.data)}}catch(e){}})()},[]),(0,t.useEffect)(()=>{r&&(async()=>{if(console.log("\ud83d\udd0d Fetching dashboard data from DATABASE for user:",r),console.log("\ud83d\udd0d User ID:",null===r||void 0===r?void 0:r.id),console.log("\ud83d\udd0d Restaurant ID:",null===r||void 0===r?void 0:r.restaurantId),null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found for this user"),void J(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void J(!1);const n=await fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 Dashboard API response status:",n.status),!n.ok){const e=await n.text();return console.error("\u274c API error:",n.status,e),void J(!1)}const t=await n.json();console.log("\u2705 Dashboard data from DB:",t);const i=t.data||t;console.log("\ud83d\udcca Today orders:",i.today.orders),console.log("\ud83d\udcca Today revenue:",i.today.revenue),console.log("\ud83d\udcca Monthly orders:",i.monthly.orders),console.log("\ud83d\udcca Monthly revenue:",i.monthly.revenue),console.log("\ud83d\udcca Recent orders:",i.recentOrders.length),K(i)}catch(e){console.error("\u274c Error fetching dashboard data:",e)}finally{J(!1)}})()},[r]),(0,t.useEffect)(()=>{r&&(async()=>{const e=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id);if(e)try{const r=localStorage.getItem("auth_token");if(!r)return void console.error("\u274c No auth token found for sales chart");const n=await fetch(`/api/dashboard/restaurant/${e}/sales-chart?period=${ee}`,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();te(e.data||[])}else console.error("\u274c Sales chart API error:",n.status)}catch(n){console.error("\u274c Error fetching sales chart:",n)}})()},[r,ee]),Z)return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(g,{children:[(0,u.jsx)(m,{children:(0,u.jsx)(f,{children:"Restaurant Dashboard"})}),(0,u.jsx)(y,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]})});if(!H)return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(g,{children:[(0,u.jsx)(m,{children:(0,u.jsx)(f,{children:"Restaurant Dashboard"})}),(0,u.jsx)(y,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No data available"})})]})});const{restaurant:ce,today:xe,monthly:pe,yearly:he,total:ue,billing:ge,recentOrders:me}=H;return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(g,{children:[(0,u.jsxs)(m,{children:[(0,u.jsx)(f,{children:"Restaurant Dashboard"}),(0,u.jsxs)(j,{children:[(0,u.jsxs)("span",{children:[ce.name," \u2022 ",ce.planType]}),(()=>{const e=ce.subscriptionEnd?new Date(ce.subscriptionEnd):null,r=new Date;if("trial"===ce.status){const n=ce.trialEndDate?new Date(ce.trialEndDate):e;if(n){const e=Math.ceil((n.getTime()-r.getTime())/864e5);return(0,u.jsxs)(v,{variant:"trial",children:["Trial \u2022 ",e>0?`${e} days left`:"Expired"]})}return(0,u.jsx)(v,{variant:"trial",children:"Trial"})}if(e){const n=Math.ceil((e.getTime()-r.getTime())/864e5);return n<=0?(0,u.jsx)(v,{variant:"expired",children:"Subscription expired"}):n<=30?(0,u.jsxs)(v,{variant:"expiring",children:[n," days left"]}):(0,u.jsxs)(v,{variant:"active",children:[n," days left"]})}return null})()]})]}),(0,u.jsxs)(y,{children:[le.length>0&&(0,u.jsx)(a.eP,{items:le,entityId:s}),(0,u.jsxs)(o.Ot,{children:[(0,u.jsxs)(o.XS,{color:"#F59E0B",children:[(0,u.jsx)(o.h2,{children:"Today's Sales"}),(0,u.jsx)(o.G$,{children:(0,p.vv)(xe.revenue||0,se)})]}),(0,u.jsxs)(o.XS,{color:"#2563EB",children:[(0,u.jsx)(o.h2,{children:"Today's Orders"}),(0,u.jsx)(o.G$,{children:xe.orders||0})]}),(0,u.jsxs)(o.XS,{color:"#10B981",children:[(0,u.jsx)(o.h2,{children:"Monthly Revenue"}),(0,u.jsx)(o.G$,{children:(0,p.vv)(pe.revenue||0,se)})]}),(0,u.jsxs)(o.XS,{color:"#7C3AED",children:[(0,u.jsx)(o.h2,{children:"Monthly Orders"}),(0,u.jsx)(o.G$,{children:pe.orders||0})]}),(0,u.jsxs)(o.XS,{color:"#059669",children:[(0,u.jsx)(o.h2,{children:"This Year Revenue"}),(0,u.jsx)(o.G$,{children:(0,p.vv)(he.revenue||0,se)})]}),(0,u.jsxs)(o.XS,{color:"#6366F1",children:[(0,u.jsx)(o.h2,{children:"This Year Orders"}),(0,u.jsx)(o.G$,{children:he.orders||0})]}),(0,u.jsxs)(o.XS,{color:"#8B5CF6",children:[(0,u.jsx)(o.h2,{children:"Total Revenue"}),(0,u.jsx)(o.G$,{children:(0,p.vv)(ue.revenue||0,se)})]}),(0,u.jsxs)(o.XS,{color:"#EF4444",children:[(0,u.jsx)(o.h2,{children:"Total Orders"}),(0,u.jsx)(o.G$,{children:ue.orders||0})]})]}),(0,u.jsxs)(b,{children:[(0,u.jsxs)(A,{children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,u.jsx)("h3",{children:"Sales & Orders Overview"}),(0,u.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,u.jsx)("button",{onClick:()=>re("week"),style:{padding:"6px 12px",background:"week"===ee?"#635BFF":"transparent",color:"week"===ee?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,u.jsx)("button",{onClick:()=>re("month"),style:{padding:"6px 12px",background:"month"===ee?"#635BFF":"transparent",color:"month"===ee?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,u.jsx)("button",{onClick:()=>re("year"),style:{padding:"6px 12px",background:"year"===ee?"#635BFF":"transparent",color:"year"===ee?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),ne.length>0?(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:ne.map((e,r)=>{const n=Math.max(...ne.map(e=>e.revenue),1),t=new Date(e.date);return(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,u.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/n*80)}px`,background:0===e.revenue?"#E5E7EB":"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px",cursor:"pointer",transition:"opacity 0.2s"},title:`${t.toLocaleDateString()}: RM ${e.revenue.toLocaleString()}`,onMouseEnter:e=>e.currentTarget.style.opacity="0.8",onMouseLeave:e=>e.currentTarget.style.opacity="1"}),(0,u.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===ee?t.toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===ee?`Week ${r+1}`:t.toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,u.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:(0,p.vv)(e.revenue,se)}),(0,u.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.orders||0," ord"]})]},e.date)})}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,u.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===ee?"Last 7 days":"month"===ee?"Last 12 weeks":"Last 12 months"}),(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=ne.find(e=>e.revenue>0),r=ne[ne.length-1];if(e&&r&&e.revenue>0){const n=(r.revenue-e.revenue)/e.revenue*100;return n>0?`\u2197 +${n.toFixed(1)}%`:n<0?`\u2198 ${n.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,u.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:(0,u.jsxs)("div",{style:{textAlign:"center",paddingTop:"40px",color:"#6B7280"},children:[(0,u.jsxs)("p",{children:["Total Revenue: ",(0,p.vv)(pe.revenue,se)]}),(0,u.jsx)("p",{children:"Loading chart data..."})]})})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)("h3",{children:"Notifications"}),(0,u.jsxs)(w,{children:[(xe.pendingOrders||0)>0&&(0,u.jsx)(k,{type:"warning",onClick:()=>e(`/restaurant/${s}/live-orders`),children:(0,u.jsxs)(E,{children:[(0,u.jsx)(B,{type:"warning",children:"Pending Orders"}),(0,u.jsxs)(C,{children:[xe.pendingOrders," order(s) waiting to be processed"]})]})}),(ge.unpaidInvoices||0)>0&&(0,u.jsx)(k,{type:"warning",onClick:()=>e(`/restaurant/${s}/invoices`),children:(0,u.jsxs)(E,{children:[(0,u.jsx)(B,{type:"warning",children:"Unpaid Invoices"}),(0,u.jsxs)(C,{children:[ge.unpaidInvoices," invoice(s) \u2022 ",(0,p.vv)(ge.totalUnpaidAmount||0,se)," due"]})]})}),ae.notices>0&&(0,u.jsx)(k,{type:"info",onClick:()=>e(`/restaurant/${s}/notices`),children:(0,u.jsxs)(E,{children:[(0,u.jsx)(B,{type:"info",children:"Unread Notices"}),(0,u.jsxs)(C,{children:[ae.notices," unread notice(s)"]})]})}),ae.systemInquiry>0&&(0,u.jsx)(k,{type:"info",onClick:()=>e(`/restaurant/${s}/support`),children:(0,u.jsxs)(E,{children:[(0,u.jsx)(B,{type:"info",children:"System Inquiry Updates"}),(0,u.jsxs)(C,{children:[ae.systemInquiry," inquiry(s) with new replies"]})]})}),ae.operationInquiry>0&&(0,u.jsx)(k,{type:"info",onClick:()=>e(`/restaurant/${s}/operation-inquiry`),children:(0,u.jsxs)(E,{children:[(0,u.jsx)(B,{type:"info",children:"Operation Inquiry Updates"}),(0,u.jsxs)(C,{children:[ae.operationInquiry," inquiry(s) with responses"]})]})}),0===(xe.pendingOrders||0)&&0===(ge.unpaidInvoices||0)&&0===ae.notices&&0===ae.systemInquiry&&0===ae.operationInquiry&&(0,u.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"13px",fontStyle:"italic"},children:"No new notifications"})]})]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)("h3",{children:"Quick Actions"}),(0,u.jsxs)(Y,{children:[(0,u.jsxs)(Q,{onClick:()=>window.open(`/restaurant/${s}/pos-terminal`,"_blank"),children:[(0,u.jsx)("div",{className:"icon",children:"\u25a6"}),(0,u.jsx)("div",{className:"title",children:"POS Terminal"}),(0,u.jsx)("div",{className:"description",children:"Process orders"})]}),(0,u.jsxs)(Q,{onClick:()=>window.open(`/restaurant/${s}/kitchen`,"_blank"),children:[(0,u.jsx)("div",{className:"icon",children:"\u25d0"}),(0,u.jsx)("div",{className:"title",children:"Kitchen Display"}),(0,u.jsx)("div",{className:"description",children:"View kitchen orders"})]}),(0,u.jsxs)(Q,{onClick:()=>e(`/restaurant/${s}/live-orders`),children:[(0,u.jsx)("div",{className:"icon",children:"\u25c9"}),(0,u.jsx)("div",{className:"title",children:"Live Orders"}),(0,u.jsx)("div",{className:"description",children:"Monitor all orders"})]}),(0,u.jsxs)(Q,{onClick:()=>e(`/restaurant/${s}/menu`),children:[(0,u.jsx)("div",{className:"icon",children:"\u2261"}),(0,u.jsx)("div",{className:"title",children:"Menu"}),(0,u.jsx)("div",{className:"description",children:"Edit menu items"})]})]})]}),(0,u.jsx)(V,{children:(0,u.jsx)("h3",{children:"Recent Orders"})}),(0,u.jsx)(S,{children:(0,u.jsxs)($,{children:[(0,u.jsx)(D,{children:(0,u.jsxs)(T,{children:[(0,u.jsx)(I,{children:"Order"}),(0,u.jsx)(I,{children:"Items"}),(0,u.jsx)(I,{children:"Status"}),(0,u.jsx)(I,{children:"Time"}),(0,u.jsx)(I,{children:"Amount"})]})}),(0,u.jsx)(z,{children:0===me.length?(0,u.jsx)(T,{children:(0,u.jsx)(N,{colSpan:5,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No recent orders"})}):me.map(e=>(0,u.jsxs)(T,{children:[(0,u.jsxs)(N,{children:[(0,u.jsx)(_,{children:e.order_number}),(0,u.jsxs)(M,{children:[e.customer_name||"Guest",(0,u.jsx)("br",{}),e.customer_phone||"N/A",e.table_number&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("br",{}),"Table: ",e.table_number]})]})]}),(0,u.jsx)(N,{children:(0,u.jsx)(O,{children:(()=>{const r=e.items||e.order_items||[];return Array.isArray(r)&&0!==r.length?r.map((e,r)=>e?(0,u.jsxs)(R,{children:[(0,u.jsxs)("div",{children:[(0,u.jsxs)(P,{children:[e.quantity||1,"x"]}),e.name||e.menu_item_name||"Unknown Item"]}),e.options&&e.options.length>0&&(0,u.jsx)(q,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},r):null):(0,u.jsx)("span",{style:{color:"#6B7280",fontSize:"13px"},children:"No items"})})()})}),(0,u.jsx)(N,{children:(0,u.jsx)(X,{variant:e.status,children:(()=>{switch(e.status){case"awaiting_payment":return"Outstanding";case"pending":return"Pending";case"preparing":return"Preparing";case"ready":return"Ready";case"served":return"Served";case"completed":return"Completed";case"cancelled":return"Cancelled";default:return e.status.charAt(0).toUpperCase()+e.status.slice(1)}})()})}),(0,u.jsx)(N,{children:(0,u.jsx)(L,{children:new Date(e.order_date).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})}),(0,u.jsxs)(N,{children:[(0,u.jsx)(U,{children:(0,p.vv)(parseFloat(e.total_amount||0),se)}),(0,u.jsx)(G,{isPending:"pending"===e.payment_status,children:"pending"===e.payment_status?"Pending":(0,h.MA)(e.payment_method,e.card_type,n||void 0)})]})]},e.id))})]})})]})]})})}}}]);