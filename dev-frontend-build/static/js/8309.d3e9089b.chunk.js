"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8309],{8285:(e,r,n)=>{n.d(r,{MA:()=>g,_M:()=>h});const t="cash",i="card",o="ewallet",s="bank_transfer",a="qr",l="counter",d="online",c="fpx",p="staffMeal",x={[t]:"Cash",[i]:"Credit/Debit Card",[o]:"E-Wallet",[s]:"Bank Transfer",[a]:"QR Payment",[l]:"Pay at Counter",[d]:"Online Payment",[c]:"FPX Online Banking",[p]:"Staff Meal"};function h(e,r){if(r){const n=r[{cash:"cash",card:"card",ewallet:"ewallet",bank_transfer:"bankTransfer",qr:"qr",counter:"payAtCounter",online:"online",fpx:"fpx",staffMeal:"staffMeal",staff_meal:"staffMeal"}[e]||e]||r[e];if(null!==n&&void 0!==n&&n.label)return n.label}return x[e]||e}const u={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function g(e,r,n){if(!e)return"N/A";if("card"===e&&r){return`${h("card",n)}(${u[r]||r})`}return h(e,n)}},8309:(e,r,n)=>{n.r(r),n.d(r,{default:()=>K});var t=n(9950),i=n(4492),o=n(4752),s=n(8409),a=n(3224),l=n(1367),d=n(9018),c=n(6925),p=n(4021),x=n(8608),h=n(6038),u=n(8285),g=n(4414);const m=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,y=o.Ay.div`
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
`,f=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,v=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,b=o.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  ${e=>{let{variant:r}=e;switch(r){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
`,w=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,A=o.Ay.div`
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
`,F=o.Ay.div`
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
`,k=o.Ay.div`
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
`,E=o.Ay.div`
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
`,B=o.Ay.div`
  flex: 1;
  min-width: 0;
`,C=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"info":return"#2563EB";default:return"#374151"}}};
`,$=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,S=o.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,I=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,D=o.Ay.thead`
  background: #F8FAFC;
`,z=o.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,_=o.Ay.tbody``,T=o.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,M=o.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,O=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,P=o.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,R=o.Ay.div`
  line-height: 1.6;
`,q=o.Ay.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`,N=o.Ay.span`
  color: #6B7280;
  margin-right: 8px;
`,L=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,U=o.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,G=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,X=o.Ay.div`
  color: ${e=>e.isPending?"#FF6B6B":"#6B7280"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending?"500":"normal"};
`,W=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  ${e=>{switch(e.variant){case"awaiting_payment":return"background: #FEF3C7; color: #F59E0B;";case"pending":return"background: #FEF3C7; color: #92400E;";case"preparing":return"background: #DBEAFE; color: #1E40AF;";case"ready":case"served":return"background: #D1FAE5; color: #065F46;";case"completed":return"background: #E5E7EB; color: #374151;";case"cancelled":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,Y=o.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,Q=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,V=o.Ay.div`
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
`,H=o.Ay.div`
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
`,K=()=>{const e=(0,i.Zp)(),{user:r}=(0,l.As)(),{paymentSettings:n}=(0,d.Pj)(),o=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id)||"",[K,Z]=(0,t.useState)(null),[J,ee]=(0,t.useState)(!0),[re,ne]=(0,t.useState)("week"),[te,ie]=(0,t.useState)([]),{defaultCurrency:oe}=(0,p.i1)(),[se,ae]=(0,t.useState)("RM"),[le,de]=(0,t.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0}),{items:ce}=(0,x.d)({role:(null===r||void 0===r?void 0:r.role)||"",restaurantId:o}),{isRouteAllowed:pe}=(0,c.W)(null!==r&&void 0!==r&&r.role?{role:r.role,restaurantId:Number(o)||null,brandId:null,foodcourtId:null}:null);if((0,t.useEffect)(()=>{oe&&ae(oe)},[oe]),(0,t.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&de(e.data)}}catch(e){}})()},[]),(0,t.useEffect)(()=>{r&&(async()=>{if(console.log("\ud83d\udd0d Fetching dashboard data from DATABASE for user:",r),console.log("\ud83d\udd0d User ID:",null===r||void 0===r?void 0:r.id),console.log("\ud83d\udd0d Restaurant ID:",null===r||void 0===r?void 0:r.restaurantId),null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found for this user"),void ee(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void ee(!1);const n=await fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 Dashboard API response status:",n.status),!n.ok){const e=await n.text();return console.error("\u274c API error:",n.status,e),void ee(!1)}const t=await n.json();console.log("\u2705 Dashboard data from DB:",t);const i=t.data||t;console.log("\ud83d\udcca Today orders:",i.today.orders),console.log("\ud83d\udcca Today revenue:",i.today.revenue),console.log("\ud83d\udcca Monthly orders:",i.monthly.orders),console.log("\ud83d\udcca Monthly revenue:",i.monthly.revenue),console.log("\ud83d\udcca Recent orders:",i.recentOrders.length),Z(i)}catch(e){console.error("\u274c Error fetching dashboard data:",e)}finally{ee(!1)}})()},[r]),(0,t.useEffect)(()=>{r&&(async()=>{const e=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id);if(e)try{const r=localStorage.getItem("auth_token");if(!r)return void console.error("\u274c No auth token found for sales chart");const n=await fetch(`/api/dashboard/restaurant/${e}/sales-chart?period=${re}`,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();ie(e.data||[])}else console.error("\u274c Sales chart API error:",n.status)}catch(n){console.error("\u274c Error fetching sales chart:",n)}})()},[r,re]),J)return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(m,{children:[(0,g.jsx)(y,{children:(0,g.jsx)(j,{children:"Restaurant Dashboard"})}),(0,g.jsx)(f,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]})});if(!K)return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(m,{children:[(0,g.jsx)(y,{children:(0,g.jsx)(j,{children:"Restaurant Dashboard"})}),(0,g.jsx)(f,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No data available"})})]})});const{restaurant:xe,today:he,monthly:ue,yearly:ge,total:me,billing:ye,recentOrders:fe}=K;return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(m,{children:[(0,g.jsxs)(y,{children:[(0,g.jsx)(j,{children:"Restaurant Dashboard"}),(0,g.jsxs)(v,{children:[(0,g.jsxs)("span",{children:[xe.name," \u2022 ",xe.planType]}),(()=>{const e=xe.subscriptionEnd?new Date(xe.subscriptionEnd):null,r=new Date;if("trial"===xe.status){const n=xe.trialEndDate?new Date(xe.trialEndDate):e;if(n){const e=Math.ceil((n.getTime()-r.getTime())/864e5);return(0,g.jsxs)(b,{variant:"trial",children:["Trial \u2022 ",e>0?`${e} days left`:"Expired"]})}return(0,g.jsx)(b,{variant:"trial",children:"Trial"})}if(e){const n=Math.ceil((e.getTime()-r.getTime())/864e5);return n<=0?(0,g.jsx)(b,{variant:"expired",children:"Subscription expired"}):n<=30?(0,g.jsxs)(b,{variant:"expiring",children:[n," days left"]}):(0,g.jsxs)(b,{variant:"active",children:[n," days left"]})}return null})()]})]}),(0,g.jsxs)(f,{children:[ce.length>0&&(0,g.jsx)(a.eP,{items:ce,entityId:o}),(0,g.jsxs)(s.Ot,{children:[(0,g.jsxs)(s.XS,{color:"#F59E0B",children:[(0,g.jsx)(s.h2,{children:"Today's Sales"}),(0,g.jsx)(s.G$,{children:(0,h.vv)(he.revenue||0,se)})]}),(0,g.jsxs)(s.XS,{color:"#2563EB",children:[(0,g.jsx)(s.h2,{children:"Today's Orders"}),(0,g.jsx)(s.G$,{children:he.orders||0})]}),(0,g.jsxs)(s.XS,{color:"#10B981",children:[(0,g.jsx)(s.h2,{children:"Monthly Revenue"}),(0,g.jsx)(s.G$,{children:(0,h.vv)(ue.revenue||0,se)})]}),(0,g.jsxs)(s.XS,{color:"#7C3AED",children:[(0,g.jsx)(s.h2,{children:"Monthly Orders"}),(0,g.jsx)(s.G$,{children:ue.orders||0})]}),(0,g.jsxs)(s.XS,{color:"#059669",children:[(0,g.jsx)(s.h2,{children:"This Year Revenue"}),(0,g.jsx)(s.G$,{children:(0,h.vv)(ge.revenue||0,se)})]}),(0,g.jsxs)(s.XS,{color:"#6366F1",children:[(0,g.jsx)(s.h2,{children:"This Year Orders"}),(0,g.jsx)(s.G$,{children:ge.orders||0})]}),(0,g.jsxs)(s.XS,{color:"#8B5CF6",children:[(0,g.jsx)(s.h2,{children:"Total Revenue"}),(0,g.jsx)(s.G$,{children:(0,h.vv)(me.revenue||0,se)})]}),(0,g.jsxs)(s.XS,{color:"#EF4444",children:[(0,g.jsx)(s.h2,{children:"Total Orders"}),(0,g.jsx)(s.G$,{children:me.orders||0})]})]}),(0,g.jsxs)(w,{children:[(0,g.jsxs)(A,{children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,g.jsx)("h3",{children:"Sales & Orders Overview"}),(0,g.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,g.jsx)("button",{onClick:()=>ne("week"),style:{padding:"6px 12px",background:"week"===re?"#635BFF":"transparent",color:"week"===re?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,g.jsx)("button",{onClick:()=>ne("month"),style:{padding:"6px 12px",background:"month"===re?"#635BFF":"transparent",color:"month"===re?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,g.jsx)("button",{onClick:()=>ne("year"),style:{padding:"6px 12px",background:"year"===re?"#635BFF":"transparent",color:"year"===re?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),te.length>0?(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:te.map((e,r)=>{const n=Math.max(...te.map(e=>e.revenue),1),t=new Date(e.date);return(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,g.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/n*80)}px`,background:0===e.revenue?"#E5E7EB":"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px",cursor:"pointer",transition:"opacity 0.2s"},title:`${t.toLocaleDateString()}: RM ${e.revenue.toLocaleString()}`,onMouseEnter:e=>e.currentTarget.style.opacity="0.8",onMouseLeave:e=>e.currentTarget.style.opacity="1"}),(0,g.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===re?t.toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===re?`Week ${r+1}`:t.toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,g.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:(0,h.vv)(e.revenue,se)}),(0,g.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.orders||0," ord"]})]},e.date)})}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===re?"Last 7 days":"month"===re?"Last 12 weeks":"Last 12 months"}),(0,g.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=te.find(e=>e.revenue>0),r=te[te.length-1];if(e&&r&&e.revenue>0){const n=(r.revenue-e.revenue)/e.revenue*100;return n>0?`\u2197 +${n.toFixed(1)}%`:n<0?`\u2198 ${n.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,g.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:(0,g.jsxs)("div",{style:{textAlign:"center",paddingTop:"40px",color:"#6B7280"},children:[(0,g.jsxs)("p",{children:["Total Revenue: ",(0,h.vv)(ue.revenue,se)]}),(0,g.jsx)("p",{children:"Loading chart data..."})]})})]}),(0,g.jsxs)(F,{children:[(0,g.jsx)("h3",{children:"Notifications"}),(0,g.jsxs)(k,{children:[(he.pendingOrders||0)>0&&(0,g.jsx)(E,{type:"warning",onClick:()=>e(`/restaurant/${o}/live-orders`),children:(0,g.jsxs)(B,{children:[(0,g.jsx)(C,{type:"warning",children:"Pending Orders"}),(0,g.jsxs)($,{children:[he.pendingOrders," order(s) waiting to be processed"]})]})}),(ye.unpaidInvoices||0)>0&&(0,g.jsx)(E,{type:"warning",onClick:()=>e(`/restaurant/${o}/invoices`),children:(0,g.jsxs)(B,{children:[(0,g.jsx)(C,{type:"warning",children:"Unpaid Invoices"}),(0,g.jsxs)($,{children:[ye.unpaidInvoices," invoice(s) \u2022 ",(0,h.vv)(ye.totalUnpaidAmount||0,se)," due"]})]})}),le.notices>0&&(0,g.jsx)(E,{type:"info",onClick:()=>e(`/restaurant/${o}/notices`),children:(0,g.jsxs)(B,{children:[(0,g.jsx)(C,{type:"info",children:"Unread Notices"}),(0,g.jsxs)($,{children:[le.notices," unread notice(s)"]})]})}),le.systemInquiry>0&&(0,g.jsx)(E,{type:"info",onClick:()=>e(`/restaurant/${o}/support`),children:(0,g.jsxs)(B,{children:[(0,g.jsx)(C,{type:"info",children:"System Inquiry Updates"}),(0,g.jsxs)($,{children:[le.systemInquiry," inquiry(s) with new replies"]})]})}),le.operationInquiry>0&&(0,g.jsx)(E,{type:"info",onClick:()=>e(`/restaurant/${o}/operation-inquiry`),children:(0,g.jsxs)(B,{children:[(0,g.jsx)(C,{type:"info",children:"Operation Inquiry Updates"}),(0,g.jsxs)($,{children:[le.operationInquiry," inquiry(s) with responses"]})]})}),0===(he.pendingOrders||0)&&0===(ye.unpaidInvoices||0)&&0===le.notices&&0===le.systemInquiry&&0===le.operationInquiry&&(0,g.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"13px",fontStyle:"italic"},children:"No new notifications"})]})]})]}),(0,g.jsxs)(Y,{children:[(0,g.jsx)("h3",{children:"Quick Actions"}),(0,g.jsx)(Q,{children:(()=>{const r=[];pe(`/restaurant/${o}/pos-terminal`)&&r.push({icon:"\u25a6",title:"POS Terminal",desc:"Process orders",onClick:()=>window.open(`/restaurant/${o}/pos-terminal`,"_blank")}),pe(`/restaurant/${o}/floor-plan`)&&r.push({icon:"\u25a6",title:"Floor Plan",desc:"Table layout",onClick:()=>window.open(`/restaurant/${o}/floor-plan`,"_blank")}),pe(`/restaurant/${o}/kitchen`)&&r.push({icon:"\u25d0",title:"Kitchen Display",desc:"View kitchen orders",onClick:()=>window.open(`/restaurant/${o}/kitchen`,"_blank")}),pe(`/restaurant/${o}/display`)&&r.push({icon:"\u25a1",title:"Customer Display",desc:"Pickup number",onClick:()=>window.open(`/restaurant/${o}/display`,"_blank")}),pe("/mobile/:slug/menu")&&r.push({icon:"\u25ef",title:"Mobile Order",desc:"Customer ordering",onClick:async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${o}`,{headers:e?{Authorization:`Bearer ${e}`}:{}});if(r.ok){const e=await r.json();window.open(`/mobile/${(e.data||e).slug||`restaurant-${o}`}`,"_blank")}else window.open(`/mobile/restaurant-${o}`,"_blank")}catch{window.open(`/mobile/restaurant-${o}`,"_blank")}}});let n=r.length>=5?r.filter(e=>"Customer Display"!==e.title).slice(0,4):[...r];return n.length<4&&n.push({icon:"\u25c9",title:"Live Orders",desc:"Monitor all orders",onClick:()=>e(`/restaurant/${o}/live-orders`)}),n.length<4&&n.push({icon:"\u2261",title:"Menu",desc:"Edit menu items",onClick:()=>e(`/restaurant/${o}/menu`)}),n.slice(0,4).map((e,r)=>(0,g.jsxs)(V,{onClick:e.onClick,children:[(0,g.jsx)("div",{className:"icon",children:e.icon}),(0,g.jsx)("div",{className:"title",children:e.title}),(0,g.jsx)("div",{className:"description",children:e.desc})]},r))})()})]}),(0,g.jsx)(H,{children:(0,g.jsx)("h3",{children:"Recent Orders"})}),(0,g.jsx)(S,{children:(0,g.jsxs)(I,{children:[(0,g.jsx)(D,{children:(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:"Order"}),(0,g.jsx)(z,{children:"Items"}),(0,g.jsx)(z,{children:"Status"}),(0,g.jsx)(z,{children:"Time"}),(0,g.jsx)(z,{children:"Amount"})]})}),(0,g.jsx)(_,{children:0===fe.length?(0,g.jsx)(T,{children:(0,g.jsx)(M,{colSpan:5,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No recent orders"})}):fe.map(e=>(0,g.jsxs)(T,{children:[(0,g.jsxs)(M,{children:[(0,g.jsx)(O,{children:e.order_number}),(0,g.jsxs)(P,{children:[e.customer_name||"Guest",(0,g.jsx)("br",{}),e.customer_phone||"N/A",e.table_number&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("br",{}),"Table: ",e.table_number]})]})]}),(0,g.jsx)(M,{children:(0,g.jsx)(R,{children:(()=>{const r=e.items||e.order_items||[];return Array.isArray(r)&&0!==r.length?r.map((e,r)=>e?(0,g.jsxs)(q,{children:[(0,g.jsxs)("div",{children:[(0,g.jsxs)(N,{children:[e.quantity||1,"x"]}),e.name||e.menu_item_name||"Unknown Item"]}),e.options&&e.options.length>0&&(0,g.jsx)(L,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},r):null):(0,g.jsx)("span",{style:{color:"#6B7280",fontSize:"13px"},children:"No items"})})()})}),(0,g.jsx)(M,{children:(0,g.jsx)(W,{variant:e.status,children:(()=>{switch(e.status){case"awaiting_payment":return"Outstanding";case"pending":return"Pending";case"preparing":return"Preparing";case"ready":return"Ready";case"served":return"Served";case"completed":return"Completed";case"cancelled":return"Cancelled";default:return e.status.charAt(0).toUpperCase()+e.status.slice(1)}})()})}),(0,g.jsx)(M,{children:(0,g.jsx)(U,{children:new Date(e.order_date).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})}),(0,g.jsxs)(M,{children:[(0,g.jsx)(G,{children:(0,h.vv)(parseFloat(e.total_amount||0),se)}),(0,g.jsx)(X,{isPending:"pending"===e.payment_status,children:"pending"===e.payment_status?"Pending":(0,u.MA)(e.payment_method,e.card_type,n||void 0)})]})]},e.id))})]})})]})]})})}}}]);