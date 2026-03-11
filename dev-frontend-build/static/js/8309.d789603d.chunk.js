"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8309],{8309:(e,r,n)=>{n.r(r),n.d(r,{default:()=>H});var i=n(9950),t=n(4492),s=n(4752),o=n(8409),a=n(3224),d=n(1367),l=n(4021),c=n(8608),x=n(6038),p=n(4414);const h=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,u=s.Ay.div`
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
`,g=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,y=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,j=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  ${e=>{let{variant:r}=e;switch(r){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
`,f=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,v=s.Ay.div`
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
`,b=s.Ay.div`
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
`,F=s.Ay.div`
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
`,A=s.Ay.div`
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
`,w=s.Ay.div`
  flex: 1;
  min-width: 0;
`,k=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"info":return"#2563EB";default:return"#374151"}}};
`,E=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,B=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,C=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,S=s.Ay.thead`
  background: #F8FAFC;
`,$=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,D=s.Ay.tbody``,I=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,z=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,T=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,N=s.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,_=s.Ay.div`
  line-height: 1.6;
`,O=s.Ay.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`,R=s.Ay.span`
  color: #6B7280;
  margin-right: 8px;
`,M=s.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,q=s.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,L=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,P=s.Ay.div`
  color: ${e=>e.isPending?"#FF6B6B":"#6B7280"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending?"500":"normal"};
`,U=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  ${e=>{switch(e.variant){case"awaiting_payment":return"background: #FEF3C7; color: #F59E0B;";case"pending":return"background: #FEF3C7; color: #92400E;";case"preparing":return"background: #DBEAFE; color: #1E40AF;";case"ready":case"served":return"background: #D1FAE5; color: #065F46;";case"completed":return"background: #E5E7EB; color: #374151;";case"cancelled":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,G=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,X=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,W=s.Ay.div`
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
`,Y=s.Ay.div`
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
`,H=()=>{const e=(0,t.Zp)(),{user:r}=(0,d.As)(),n=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id)||"",[s,H]=(0,i.useState)(null),[K,Q]=(0,i.useState)(!0),[V,Z]=(0,i.useState)("week"),[J,ee]=(0,i.useState)([]),{defaultCurrency:re}=(0,l.i1)(),[ne,ie]=(0,i.useState)("RM"),[te,se]=(0,i.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0}),{items:oe}=(0,c.d)({role:(null===r||void 0===r?void 0:r.role)||"",restaurantId:n});if((0,i.useEffect)(()=>{re&&ie(re)},[re]),(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&se(e.data)}}catch(e){}})()},[]),(0,i.useEffect)(()=>{r&&(async()=>{if(console.log("\ud83d\udd0d Fetching dashboard data from DATABASE for user:",r),console.log("\ud83d\udd0d User ID:",null===r||void 0===r?void 0:r.id),console.log("\ud83d\udd0d Restaurant ID:",null===r||void 0===r?void 0:r.restaurantId),null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found for this user"),void Q(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void Q(!1);const n=await fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 Dashboard API response status:",n.status),!n.ok){const e=await n.text();return console.error("\u274c API error:",n.status,e),void Q(!1)}const i=await n.json();console.log("\u2705 Dashboard data from DB:",i);const t=i.data||i;console.log("\ud83d\udcca Today orders:",t.today.orders),console.log("\ud83d\udcca Today revenue:",t.today.revenue),console.log("\ud83d\udcca Monthly orders:",t.monthly.orders),console.log("\ud83d\udcca Monthly revenue:",t.monthly.revenue),console.log("\ud83d\udcca Recent orders:",t.recentOrders.length),H(t)}catch(e){console.error("\u274c Error fetching dashboard data:",e)}finally{Q(!1)}})()},[r]),(0,i.useEffect)(()=>{r&&(async()=>{const e=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id);if(e)try{const r=localStorage.getItem("auth_token");if(!r)return void console.error("\u274c No auth token found for sales chart");const n=await fetch(`/api/dashboard/restaurant/${e}/sales-chart?period=${V}`,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();ee(e.data||[])}else console.error("\u274c Sales chart API error:",n.status)}catch(n){console.error("\u274c Error fetching sales chart:",n)}})()},[r,V]),K)return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{children:(0,p.jsx)(m,{children:"Restaurant Dashboard"})}),(0,p.jsx)(g,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]})});if(!s)return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{children:(0,p.jsx)(m,{children:"Restaurant Dashboard"})}),(0,p.jsx)(g,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No data available"})})]})});const{restaurant:ae,today:de,monthly:le,yearly:ce,total:xe,billing:pe,recentOrders:he}=s;return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(h,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(m,{children:"Restaurant Dashboard"}),(0,p.jsxs)(y,{children:[(0,p.jsxs)("span",{children:[ae.name," \u2022 ",ae.planType]}),(()=>{const e=ae.subscriptionEnd?new Date(ae.subscriptionEnd):null,r=new Date;if("trial"===ae.status){const n=ae.trialEndDate?new Date(ae.trialEndDate):e;if(n){const e=Math.ceil((n.getTime()-r.getTime())/864e5);return(0,p.jsxs)(j,{variant:"trial",children:["Trial \u2022 ",e>0?`${e} days left`:"Expired"]})}return(0,p.jsx)(j,{variant:"trial",children:"Trial"})}if(e){const n=Math.ceil((e.getTime()-r.getTime())/864e5);return n<=0?(0,p.jsx)(j,{variant:"expired",children:"Subscription expired"}):n<=30?(0,p.jsxs)(j,{variant:"expiring",children:[n," days left"]}):(0,p.jsxs)(j,{variant:"active",children:[n," days left"]})}return null})()]})]}),(0,p.jsxs)(g,{children:[oe.length>0&&(0,p.jsx)(a.eP,{items:oe,entityId:n}),(0,p.jsxs)(o.Ot,{children:[(0,p.jsxs)(o.XS,{color:"#F59E0B",children:[(0,p.jsx)(o.h2,{children:"Today's Sales"}),(0,p.jsx)(o.G$,{children:(0,x.vv)(de.revenue||0,ne)})]}),(0,p.jsxs)(o.XS,{color:"#2563EB",children:[(0,p.jsx)(o.h2,{children:"Today's Orders"}),(0,p.jsx)(o.G$,{children:de.orders||0})]}),(0,p.jsxs)(o.XS,{color:"#10B981",children:[(0,p.jsx)(o.h2,{children:"Monthly Revenue"}),(0,p.jsx)(o.G$,{children:(0,x.vv)(le.revenue||0,ne)})]}),(0,p.jsxs)(o.XS,{color:"#7C3AED",children:[(0,p.jsx)(o.h2,{children:"Monthly Orders"}),(0,p.jsx)(o.G$,{children:le.orders||0})]}),(0,p.jsxs)(o.XS,{color:"#059669",children:[(0,p.jsx)(o.h2,{children:"This Year Revenue"}),(0,p.jsx)(o.G$,{children:(0,x.vv)(ce.revenue||0,ne)})]}),(0,p.jsxs)(o.XS,{color:"#6366F1",children:[(0,p.jsx)(o.h2,{children:"This Year Orders"}),(0,p.jsx)(o.G$,{children:ce.orders||0})]}),(0,p.jsxs)(o.XS,{color:"#8B5CF6",children:[(0,p.jsx)(o.h2,{children:"Total Revenue"}),(0,p.jsx)(o.G$,{children:(0,x.vv)(xe.revenue||0,ne)})]}),(0,p.jsxs)(o.XS,{color:"#EF4444",children:[(0,p.jsx)(o.h2,{children:"Total Orders"}),(0,p.jsx)(o.G$,{children:xe.orders||0})]})]}),(0,p.jsxs)(f,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,p.jsx)("h3",{children:"Sales & Orders Overview"}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,p.jsx)("button",{onClick:()=>Z("week"),style:{padding:"6px 12px",background:"week"===V?"#635BFF":"transparent",color:"week"===V?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,p.jsx)("button",{onClick:()=>Z("month"),style:{padding:"6px 12px",background:"month"===V?"#635BFF":"transparent",color:"month"===V?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,p.jsx)("button",{onClick:()=>Z("year"),style:{padding:"6px 12px",background:"year"===V?"#635BFF":"transparent",color:"year"===V?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),J.length>0?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:J.map((e,r)=>{const n=Math.max(...J.map(e=>e.revenue),1),i=new Date(e.date);return(0,p.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,p.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/n*80)}px`,background:0===e.revenue?"#E5E7EB":"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px",cursor:"pointer",transition:"opacity 0.2s"},title:`${i.toLocaleDateString()}: RM ${e.revenue.toLocaleString()}`,onMouseEnter:e=>e.currentTarget.style.opacity="0.8",onMouseLeave:e=>e.currentTarget.style.opacity="1"}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===V?i.toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===V?`Week ${r+1}`:i.toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,p.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:(0,x.vv)(e.revenue,ne)}),(0,p.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.orders||0," ord"]})]},e.date)})}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===V?"Last 7 days":"month"===V?"Last 12 weeks":"Last 12 months"}),(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=J.find(e=>e.revenue>0),r=J[J.length-1];if(e&&r&&e.revenue>0){const n=(r.revenue-e.revenue)/e.revenue*100;return n>0?`\u2197 +${n.toFixed(1)}%`:n<0?`\u2198 ${n.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,p.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:(0,p.jsxs)("div",{style:{textAlign:"center",paddingTop:"40px",color:"#6B7280"},children:[(0,p.jsxs)("p",{children:["Total Revenue: ",(0,x.vv)(le.revenue,ne)]}),(0,p.jsx)("p",{children:"Loading chart data..."})]})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)("h3",{children:"Notifications"}),(0,p.jsxs)(F,{children:[(de.pendingOrders||0)>0&&(0,p.jsx)(A,{type:"warning",onClick:()=>e(`/restaurant/${n}/live-orders`),children:(0,p.jsxs)(w,{children:[(0,p.jsx)(k,{type:"warning",children:"Pending Orders"}),(0,p.jsxs)(E,{children:[de.pendingOrders," order(s) waiting to be processed"]})]})}),(pe.unpaidInvoices||0)>0&&(0,p.jsx)(A,{type:"warning",onClick:()=>e(`/restaurant/${n}/invoices`),children:(0,p.jsxs)(w,{children:[(0,p.jsx)(k,{type:"warning",children:"Unpaid Invoices"}),(0,p.jsxs)(E,{children:[pe.unpaidInvoices," invoice(s) \u2022 ",(0,x.vv)(pe.totalUnpaidAmount||0,ne)," due"]})]})}),te.notices>0&&(0,p.jsx)(A,{type:"info",onClick:()=>e(`/restaurant/${n}/notices`),children:(0,p.jsxs)(w,{children:[(0,p.jsx)(k,{type:"info",children:"Unread Notices"}),(0,p.jsxs)(E,{children:[te.notices," unread notice(s)"]})]})}),te.systemInquiry>0&&(0,p.jsx)(A,{type:"info",onClick:()=>e(`/restaurant/${n}/support`),children:(0,p.jsxs)(w,{children:[(0,p.jsx)(k,{type:"info",children:"System Inquiry Updates"}),(0,p.jsxs)(E,{children:[te.systemInquiry," inquiry(s) with new replies"]})]})}),te.operationInquiry>0&&(0,p.jsx)(A,{type:"info",onClick:()=>e(`/restaurant/${n}/operation-inquiry`),children:(0,p.jsxs)(w,{children:[(0,p.jsx)(k,{type:"info",children:"Operation Inquiry Updates"}),(0,p.jsxs)(E,{children:[te.operationInquiry," inquiry(s) with responses"]})]})}),0===(de.pendingOrders||0)&&0===(pe.unpaidInvoices||0)&&0===te.notices&&0===te.systemInquiry&&0===te.operationInquiry&&(0,p.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"13px",fontStyle:"italic"},children:"No new notifications"})]})]})]}),(0,p.jsxs)(G,{children:[(0,p.jsx)("h3",{children:"Quick Actions"}),(0,p.jsxs)(X,{children:[(0,p.jsxs)(W,{onClick:()=>window.open(`/restaurant/${n}/pos-terminal`,"_blank"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25a6"}),(0,p.jsx)("div",{className:"title",children:"POS Terminal"}),(0,p.jsx)("div",{className:"description",children:"Process orders"})]}),(0,p.jsxs)(W,{onClick:()=>window.open(`/restaurant/${n}/kitchen`,"_blank"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25d0"}),(0,p.jsx)("div",{className:"title",children:"Kitchen Display"}),(0,p.jsx)("div",{className:"description",children:"View kitchen orders"})]}),(0,p.jsxs)(W,{onClick:()=>e(`/restaurant/${n}/live-orders`),children:[(0,p.jsx)("div",{className:"icon",children:"\u25c9"}),(0,p.jsx)("div",{className:"title",children:"Live Orders"}),(0,p.jsx)("div",{className:"description",children:"Monitor all orders"})]}),(0,p.jsxs)(W,{onClick:()=>e(`/restaurant/${n}/menu`),children:[(0,p.jsx)("div",{className:"icon",children:"\u2261"}),(0,p.jsx)("div",{className:"title",children:"Menu"}),(0,p.jsx)("div",{className:"description",children:"Edit menu items"})]})]})]}),(0,p.jsx)(Y,{children:(0,p.jsx)("h3",{children:"Recent Orders"})}),(0,p.jsx)(B,{children:(0,p.jsxs)(C,{children:[(0,p.jsx)(S,{children:(0,p.jsxs)(I,{children:[(0,p.jsx)($,{children:"Order"}),(0,p.jsx)($,{children:"Items"}),(0,p.jsx)($,{children:"Status"}),(0,p.jsx)($,{children:"Time"}),(0,p.jsx)($,{children:"Amount"})]})}),(0,p.jsx)(D,{children:0===he.length?(0,p.jsx)(I,{children:(0,p.jsx)(z,{colSpan:5,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No recent orders"})}):he.map(e=>(0,p.jsxs)(I,{children:[(0,p.jsxs)(z,{children:[(0,p.jsx)(T,{children:e.order_number}),(0,p.jsxs)(N,{children:[e.customer_name||"Guest",(0,p.jsx)("br",{}),e.customer_phone||"N/A",e.table_number&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("br",{}),"Table: ",e.table_number]})]})]}),(0,p.jsx)(z,{children:(0,p.jsx)(_,{children:(()=>{const r=e.items||e.order_items||[];return Array.isArray(r)&&0!==r.length?r.map((e,r)=>e?(0,p.jsxs)(O,{children:[(0,p.jsxs)("div",{children:[(0,p.jsxs)(R,{children:[e.quantity||1,"x"]}),e.name||e.menu_item_name||"Unknown Item"]}),e.options&&e.options.length>0&&(0,p.jsx)(M,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},r):null):(0,p.jsx)("span",{style:{color:"#6B7280",fontSize:"13px"},children:"No items"})})()})}),(0,p.jsx)(z,{children:(0,p.jsx)(U,{variant:e.status,children:(()=>{switch(e.status){case"awaiting_payment":return"Outstanding";case"pending":return"Pending";case"preparing":return"Preparing";case"ready":return"Ready";case"served":return"Served";case"completed":return"Completed";case"cancelled":return"Cancelled";default:return e.status.charAt(0).toUpperCase()+e.status.slice(1)}})()})}),(0,p.jsx)(z,{children:(0,p.jsx)(q,{children:new Date(e.order_date).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})}),(0,p.jsxs)(z,{children:[(0,p.jsx)(L,{children:(0,x.vv)(parseFloat(e.total_amount||0),ne)}),(0,p.jsx)(P,{isPending:"pending"===e.payment_status,children:"pending"===e.payment_status?"Pending":e.payment_method||"Cash"})]})]},e.id))})]})})]})]})})}}}]);