"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8309],{8285:(e,r,n)=>{n.d(r,{MA:()=>g,_M:()=>h});const t="cash",i="card",s="ewallet",o="bank_transfer",a="qr",d="counter",l="online",c="fpx",x="staffMeal",p={[t]:"Cash",[i]:"Credit/Debit Card",[s]:"E-Wallet",[o]:"Bank Transfer",[a]:"QR Payment",[d]:"Pay at Counter",[l]:"Online Payment",[c]:"FPX Online Banking",[x]:"Staff Meal"};function h(e){return p[e]||e}const u={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function g(e,r){return e?"card"===e&&r?`Card(${u[r]||r})`:h(e):"N/A"}},8309:(e,r,n)=>{n.r(r),n.d(r,{default:()=>V});var t=n(9950),i=n(4492),s=n(4752),o=n(8409),a=n(3224),d=n(1367),l=n(4021),c=n(8608),x=n(6038),p=n(8285),h=n(4414);const u=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,g=s.Ay.div`
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
`,m=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,y=s.Ay.h1`
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
`,f=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  ${e=>{let{variant:r}=e;switch(r){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
`,v=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,b=s.Ay.div`
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
`,A=s.Ay.div`
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
`,w=s.Ay.div`
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
`,k=s.Ay.div`
  flex: 1;
  min-width: 0;
`,E=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"info":return"#2563EB";default:return"#374151"}}};
`,B=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,C=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,S=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,$=s.Ay.thead`
  background: #F8FAFC;
`,D=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=s.Ay.tbody``,z=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,T=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,N=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,_=s.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,O=s.Ay.div`
  line-height: 1.6;
`,M=s.Ay.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`,R=s.Ay.span`
  color: #6B7280;
  margin-right: 8px;
`,P=s.Ay.span`
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
`,U=s.Ay.div`
  color: ${e=>e.isPending?"#FF6B6B":"#6B7280"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending?"500":"normal"};
`,G=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  ${e=>{switch(e.variant){case"awaiting_payment":return"background: #FEF3C7; color: #F59E0B;";case"pending":return"background: #FEF3C7; color: #92400E;";case"preparing":return"background: #DBEAFE; color: #1E40AF;";case"ready":case"served":return"background: #D1FAE5; color: #065F46;";case"completed":return"background: #E5E7EB; color: #374151;";case"cancelled":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,X=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,W=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,Y=s.Ay.div`
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
`,Q=s.Ay.div`
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
`,V=()=>{const e=(0,i.Zp)(),{user:r}=(0,d.As)(),n=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id)||"",[s,V]=(0,t.useState)(null),[H,K]=(0,t.useState)(!0),[Z,J]=(0,t.useState)("week"),[ee,re]=(0,t.useState)([]),{defaultCurrency:ne}=(0,l.i1)(),[te,ie]=(0,t.useState)("RM"),[se,oe]=(0,t.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0}),{items:ae}=(0,c.d)({role:(null===r||void 0===r?void 0:r.role)||"",restaurantId:n});if((0,t.useEffect)(()=>{ne&&ie(ne)},[ne]),(0,t.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&oe(e.data)}}catch(e){}})()},[]),(0,t.useEffect)(()=>{r&&(async()=>{if(console.log("\ud83d\udd0d Fetching dashboard data from DATABASE for user:",r),console.log("\ud83d\udd0d User ID:",null===r||void 0===r?void 0:r.id),console.log("\ud83d\udd0d Restaurant ID:",null===r||void 0===r?void 0:r.restaurantId),null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found for this user"),void K(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void K(!1);const n=await fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 Dashboard API response status:",n.status),!n.ok){const e=await n.text();return console.error("\u274c API error:",n.status,e),void K(!1)}const t=await n.json();console.log("\u2705 Dashboard data from DB:",t);const i=t.data||t;console.log("\ud83d\udcca Today orders:",i.today.orders),console.log("\ud83d\udcca Today revenue:",i.today.revenue),console.log("\ud83d\udcca Monthly orders:",i.monthly.orders),console.log("\ud83d\udcca Monthly revenue:",i.monthly.revenue),console.log("\ud83d\udcca Recent orders:",i.recentOrders.length),V(i)}catch(e){console.error("\u274c Error fetching dashboard data:",e)}finally{K(!1)}})()},[r]),(0,t.useEffect)(()=>{r&&(async()=>{const e=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id);if(e)try{const r=localStorage.getItem("auth_token");if(!r)return void console.error("\u274c No auth token found for sales chart");const n=await fetch(`/api/dashboard/restaurant/${e}/sales-chart?period=${Z}`,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();re(e.data||[])}else console.error("\u274c Sales chart API error:",n.status)}catch(n){console.error("\u274c Error fetching sales chart:",n)}})()},[r,Z]),H)return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(u,{children:[(0,h.jsx)(g,{children:(0,h.jsx)(y,{children:"Restaurant Dashboard"})}),(0,h.jsx)(m,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]})});if(!s)return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(u,{children:[(0,h.jsx)(g,{children:(0,h.jsx)(y,{children:"Restaurant Dashboard"})}),(0,h.jsx)(m,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No data available"})})]})});const{restaurant:de,today:le,monthly:ce,yearly:xe,total:pe,billing:he,recentOrders:ue}=s;return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(u,{children:[(0,h.jsxs)(g,{children:[(0,h.jsx)(y,{children:"Restaurant Dashboard"}),(0,h.jsxs)(j,{children:[(0,h.jsxs)("span",{children:[de.name," \u2022 ",de.planType]}),(()=>{const e=de.subscriptionEnd?new Date(de.subscriptionEnd):null,r=new Date;if("trial"===de.status){const n=de.trialEndDate?new Date(de.trialEndDate):e;if(n){const e=Math.ceil((n.getTime()-r.getTime())/864e5);return(0,h.jsxs)(f,{variant:"trial",children:["Trial \u2022 ",e>0?`${e} days left`:"Expired"]})}return(0,h.jsx)(f,{variant:"trial",children:"Trial"})}if(e){const n=Math.ceil((e.getTime()-r.getTime())/864e5);return n<=0?(0,h.jsx)(f,{variant:"expired",children:"Subscription expired"}):n<=30?(0,h.jsxs)(f,{variant:"expiring",children:[n," days left"]}):(0,h.jsxs)(f,{variant:"active",children:[n," days left"]})}return null})()]})]}),(0,h.jsxs)(m,{children:[ae.length>0&&(0,h.jsx)(a.eP,{items:ae,entityId:n}),(0,h.jsxs)(o.Ot,{children:[(0,h.jsxs)(o.XS,{color:"#F59E0B",children:[(0,h.jsx)(o.h2,{children:"Today's Sales"}),(0,h.jsx)(o.G$,{children:(0,x.vv)(le.revenue||0,te)})]}),(0,h.jsxs)(o.XS,{color:"#2563EB",children:[(0,h.jsx)(o.h2,{children:"Today's Orders"}),(0,h.jsx)(o.G$,{children:le.orders||0})]}),(0,h.jsxs)(o.XS,{color:"#10B981",children:[(0,h.jsx)(o.h2,{children:"Monthly Revenue"}),(0,h.jsx)(o.G$,{children:(0,x.vv)(ce.revenue||0,te)})]}),(0,h.jsxs)(o.XS,{color:"#7C3AED",children:[(0,h.jsx)(o.h2,{children:"Monthly Orders"}),(0,h.jsx)(o.G$,{children:ce.orders||0})]}),(0,h.jsxs)(o.XS,{color:"#059669",children:[(0,h.jsx)(o.h2,{children:"This Year Revenue"}),(0,h.jsx)(o.G$,{children:(0,x.vv)(xe.revenue||0,te)})]}),(0,h.jsxs)(o.XS,{color:"#6366F1",children:[(0,h.jsx)(o.h2,{children:"This Year Orders"}),(0,h.jsx)(o.G$,{children:xe.orders||0})]}),(0,h.jsxs)(o.XS,{color:"#8B5CF6",children:[(0,h.jsx)(o.h2,{children:"Total Revenue"}),(0,h.jsx)(o.G$,{children:(0,x.vv)(pe.revenue||0,te)})]}),(0,h.jsxs)(o.XS,{color:"#EF4444",children:[(0,h.jsx)(o.h2,{children:"Total Orders"}),(0,h.jsx)(o.G$,{children:pe.orders||0})]})]}),(0,h.jsxs)(v,{children:[(0,h.jsxs)(b,{children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,h.jsx)("h3",{children:"Sales & Orders Overview"}),(0,h.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,h.jsx)("button",{onClick:()=>J("week"),style:{padding:"6px 12px",background:"week"===Z?"#635BFF":"transparent",color:"week"===Z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,h.jsx)("button",{onClick:()=>J("month"),style:{padding:"6px 12px",background:"month"===Z?"#635BFF":"transparent",color:"month"===Z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,h.jsx)("button",{onClick:()=>J("year"),style:{padding:"6px 12px",background:"year"===Z?"#635BFF":"transparent",color:"year"===Z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),ee.length>0?(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:ee.map((e,r)=>{const n=Math.max(...ee.map(e=>e.revenue),1),t=new Date(e.date);return(0,h.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,h.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/n*80)}px`,background:0===e.revenue?"#E5E7EB":"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px",cursor:"pointer",transition:"opacity 0.2s"},title:`${t.toLocaleDateString()}: RM ${e.revenue.toLocaleString()}`,onMouseEnter:e=>e.currentTarget.style.opacity="0.8",onMouseLeave:e=>e.currentTarget.style.opacity="1"}),(0,h.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===Z?t.toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===Z?`Week ${r+1}`:t.toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,h.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:(0,x.vv)(e.revenue,te)}),(0,h.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.orders||0," ord"]})]},e.date)})}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===Z?"Last 7 days":"month"===Z?"Last 12 weeks":"Last 12 months"}),(0,h.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=ee.find(e=>e.revenue>0),r=ee[ee.length-1];if(e&&r&&e.revenue>0){const n=(r.revenue-e.revenue)/e.revenue*100;return n>0?`\u2197 +${n.toFixed(1)}%`:n<0?`\u2198 ${n.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,h.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:(0,h.jsxs)("div",{style:{textAlign:"center",paddingTop:"40px",color:"#6B7280"},children:[(0,h.jsxs)("p",{children:["Total Revenue: ",(0,x.vv)(ce.revenue,te)]}),(0,h.jsx)("p",{children:"Loading chart data..."})]})})]}),(0,h.jsxs)(A,{children:[(0,h.jsx)("h3",{children:"Notifications"}),(0,h.jsxs)(F,{children:[(le.pendingOrders||0)>0&&(0,h.jsx)(w,{type:"warning",onClick:()=>e(`/restaurant/${n}/live-orders`),children:(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{type:"warning",children:"Pending Orders"}),(0,h.jsxs)(B,{children:[le.pendingOrders," order(s) waiting to be processed"]})]})}),(he.unpaidInvoices||0)>0&&(0,h.jsx)(w,{type:"warning",onClick:()=>e(`/restaurant/${n}/invoices`),children:(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{type:"warning",children:"Unpaid Invoices"}),(0,h.jsxs)(B,{children:[he.unpaidInvoices," invoice(s) \u2022 ",(0,x.vv)(he.totalUnpaidAmount||0,te)," due"]})]})}),se.notices>0&&(0,h.jsx)(w,{type:"info",onClick:()=>e(`/restaurant/${n}/notices`),children:(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{type:"info",children:"Unread Notices"}),(0,h.jsxs)(B,{children:[se.notices," unread notice(s)"]})]})}),se.systemInquiry>0&&(0,h.jsx)(w,{type:"info",onClick:()=>e(`/restaurant/${n}/support`),children:(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{type:"info",children:"System Inquiry Updates"}),(0,h.jsxs)(B,{children:[se.systemInquiry," inquiry(s) with new replies"]})]})}),se.operationInquiry>0&&(0,h.jsx)(w,{type:"info",onClick:()=>e(`/restaurant/${n}/operation-inquiry`),children:(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{type:"info",children:"Operation Inquiry Updates"}),(0,h.jsxs)(B,{children:[se.operationInquiry," inquiry(s) with responses"]})]})}),0===(le.pendingOrders||0)&&0===(he.unpaidInvoices||0)&&0===se.notices&&0===se.systemInquiry&&0===se.operationInquiry&&(0,h.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"13px",fontStyle:"italic"},children:"No new notifications"})]})]})]}),(0,h.jsxs)(X,{children:[(0,h.jsx)("h3",{children:"Quick Actions"}),(0,h.jsxs)(W,{children:[(0,h.jsxs)(Y,{onClick:()=>window.open(`/restaurant/${n}/pos-terminal`,"_blank"),children:[(0,h.jsx)("div",{className:"icon",children:"\u25a6"}),(0,h.jsx)("div",{className:"title",children:"POS Terminal"}),(0,h.jsx)("div",{className:"description",children:"Process orders"})]}),(0,h.jsxs)(Y,{onClick:()=>window.open(`/restaurant/${n}/kitchen`,"_blank"),children:[(0,h.jsx)("div",{className:"icon",children:"\u25d0"}),(0,h.jsx)("div",{className:"title",children:"Kitchen Display"}),(0,h.jsx)("div",{className:"description",children:"View kitchen orders"})]}),(0,h.jsxs)(Y,{onClick:()=>e(`/restaurant/${n}/live-orders`),children:[(0,h.jsx)("div",{className:"icon",children:"\u25c9"}),(0,h.jsx)("div",{className:"title",children:"Live Orders"}),(0,h.jsx)("div",{className:"description",children:"Monitor all orders"})]}),(0,h.jsxs)(Y,{onClick:()=>e(`/restaurant/${n}/menu`),children:[(0,h.jsx)("div",{className:"icon",children:"\u2261"}),(0,h.jsx)("div",{className:"title",children:"Menu"}),(0,h.jsx)("div",{className:"description",children:"Edit menu items"})]})]})]}),(0,h.jsx)(Q,{children:(0,h.jsx)("h3",{children:"Recent Orders"})}),(0,h.jsx)(C,{children:(0,h.jsxs)(S,{children:[(0,h.jsx)($,{children:(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Order"}),(0,h.jsx)(D,{children:"Items"}),(0,h.jsx)(D,{children:"Status"}),(0,h.jsx)(D,{children:"Time"}),(0,h.jsx)(D,{children:"Amount"})]})}),(0,h.jsx)(I,{children:0===ue.length?(0,h.jsx)(z,{children:(0,h.jsx)(T,{colSpan:5,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No recent orders"})}):ue.map(e=>(0,h.jsxs)(z,{children:[(0,h.jsxs)(T,{children:[(0,h.jsx)(N,{children:e.order_number}),(0,h.jsxs)(_,{children:[e.customer_name||"Guest",(0,h.jsx)("br",{}),e.customer_phone||"N/A",e.table_number&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("br",{}),"Table: ",e.table_number]})]})]}),(0,h.jsx)(T,{children:(0,h.jsx)(O,{children:(()=>{const r=e.items||e.order_items||[];return Array.isArray(r)&&0!==r.length?r.map((e,r)=>e?(0,h.jsxs)(M,{children:[(0,h.jsxs)("div",{children:[(0,h.jsxs)(R,{children:[e.quantity||1,"x"]}),e.name||e.menu_item_name||"Unknown Item"]}),e.options&&e.options.length>0&&(0,h.jsx)(P,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},r):null):(0,h.jsx)("span",{style:{color:"#6B7280",fontSize:"13px"},children:"No items"})})()})}),(0,h.jsx)(T,{children:(0,h.jsx)(G,{variant:e.status,children:(()=>{switch(e.status){case"awaiting_payment":return"Outstanding";case"pending":return"Pending";case"preparing":return"Preparing";case"ready":return"Ready";case"served":return"Served";case"completed":return"Completed";case"cancelled":return"Cancelled";default:return e.status.charAt(0).toUpperCase()+e.status.slice(1)}})()})}),(0,h.jsx)(T,{children:(0,h.jsx)(q,{children:new Date(e.order_date).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})}),(0,h.jsxs)(T,{children:[(0,h.jsx)(L,{children:(0,x.vv)(parseFloat(e.total_amount||0),te)}),(0,h.jsx)(U,{isPending:"pending"===e.payment_status,children:"pending"===e.payment_status?"Pending":(0,p.MA)(e.payment_method,e.card_type)})]})]},e.id))})]})})]})]})})}}}]);