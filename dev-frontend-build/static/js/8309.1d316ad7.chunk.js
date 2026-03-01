"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8309],{4021:(e,r,n)=>{n.d(r,{i1:()=>o});var t=n(9950),i=n(1367),s=n(6038);const o=()=>{const{user:e}=(0,i.As)(),[r,n]=(0,t.useState)("RM"),[o,a]=(0,t.useState)(Object.keys(s.DL)),[d,l]=(0,t.useState)(!0),[c,x]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),t=r.indexOf("restaurant");let i=t>=0?r[t+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var s;const e=await r.json(),t=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";n(t)}else n("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),x("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:o,loading:d,error:c}}},8309:(e,r,n)=>{n.r(r),n.d(r,{default:()=>W});var t=n(9950),i=n(4492),s=n(4752),o=n(8409),a=n(1367),d=n(4021),l=n(6038),c=n(4414);const x=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=s.Ay.div`
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
`,h=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,u=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,y=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  ${e=>{let{variant:r}=e;switch(r){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
`,m=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,j=s.Ay.div`
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
`,f=s.Ay.div`
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
`,v=s.Ay.div`
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
`,b=s.Ay.div`
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
`,F=s.Ay.div`
  flex: 1;
  min-width: 0;
`,A=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"info":return"#2563EB";default:return"#374151"}}};
`,w=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,k=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,E=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,B=s.Ay.thead`
  background: #F8FAFC;
`,C=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,S=s.Ay.tbody``,$=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,D=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,I=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,z=s.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,T=s.Ay.div`
  line-height: 1.6;
`,_=s.Ay.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`,N=s.Ay.span`
  color: #6B7280;
  margin-right: 8px;
`,R=s.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,O=s.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,M=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,q=s.Ay.div`
  color: ${e=>e.isPending?"#FF6B6B":"#6B7280"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending?"500":"normal"};
`,L=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  ${e=>{switch(e.variant){case"awaiting_payment":return"background: #FEF3C7; color: #F59E0B;";case"pending":return"background: #FEF3C7; color: #92400E;";case"preparing":return"background: #DBEAFE; color: #1E40AF;";case"ready":case"served":return"background: #D1FAE5; color: #065F46;";case"completed":return"background: #E5E7EB; color: #374151;";case"cancelled":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,P=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,U=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,G=s.Ay.div`
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
`,X=s.Ay.div`
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
`,W=()=>{const e=(0,i.Zp)(),{user:r}=(0,a.As)(),n=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id)||"",[s,W]=(0,t.useState)(null),[Y,H]=(0,t.useState)(!0),[K,Q]=(0,t.useState)("week"),[V,Z]=(0,t.useState)([]),{defaultCurrency:J}=(0,d.i1)(),[ee,re]=(0,t.useState)("RM"),[ne,te]=(0,t.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});if((0,t.useEffect)(()=>{J&&re(J)},[J]),(0,t.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&te(e.data)}}catch(e){}})()},[]),(0,t.useEffect)(()=>{r&&(async()=>{if(console.log("\ud83d\udd0d Fetching dashboard data from DATABASE for user:",r),console.log("\ud83d\udd0d User ID:",null===r||void 0===r?void 0:r.id),console.log("\ud83d\udd0d Restaurant ID:",null===r||void 0===r?void 0:r.restaurantId),null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found for this user"),void H(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void H(!1);const n=await fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 Dashboard API response status:",n.status),!n.ok){const e=await n.text();return console.error("\u274c API error:",n.status,e),void H(!1)}const t=await n.json();console.log("\u2705 Dashboard data from DB:",t);const i=t.data||t;console.log("\ud83d\udcca Today orders:",i.today.orders),console.log("\ud83d\udcca Today revenue:",i.today.revenue),console.log("\ud83d\udcca Monthly orders:",i.monthly.orders),console.log("\ud83d\udcca Monthly revenue:",i.monthly.revenue),console.log("\ud83d\udcca Recent orders:",i.recentOrders.length),W(i)}catch(e){console.error("\u274c Error fetching dashboard data:",e)}finally{H(!1)}})()},[r]),(0,t.useEffect)(()=>{r&&(async()=>{const e=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id);if(e)try{const r=localStorage.getItem("auth_token");if(!r)return void console.error("\u274c No auth token found for sales chart");const n=await fetch(`/api/dashboard/restaurant/${e}/sales-chart?period=${K}`,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();Z(e.data||[])}else console.error("\u274c Sales chart API error:",n.status)}catch(n){console.error("\u274c Error fetching sales chart:",n)}})()},[r,K]),Y)return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(x,{children:[(0,c.jsx)(p,{children:(0,c.jsx)(u,{children:"Restaurant Dashboard"})}),(0,c.jsx)(h,{children:(0,c.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]})});if(!s)return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(x,{children:[(0,c.jsx)(p,{children:(0,c.jsx)(u,{children:"Restaurant Dashboard"})}),(0,c.jsx)(h,{children:(0,c.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No data available"})})]})});const{restaurant:ie,today:se,monthly:oe,yearly:ae,total:de,billing:le,recentOrders:ce}=s;return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(x,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(u,{children:"Restaurant Dashboard"}),(0,c.jsxs)(g,{children:[(0,c.jsxs)("span",{children:[ie.name," \u2022 ",ie.planType]}),(()=>{const e=ie.subscriptionEnd?new Date(ie.subscriptionEnd):null,r=new Date;if("trial"===ie.status){const n=ie.trialEndDate?new Date(ie.trialEndDate):e;if(n){const e=Math.ceil((n.getTime()-r.getTime())/864e5);return(0,c.jsxs)(y,{variant:"trial",children:["Trial \u2022 ",e>0?`${e} days left`:"Expired"]})}return(0,c.jsx)(y,{variant:"trial",children:"Trial"})}if(e){const n=Math.ceil((e.getTime()-r.getTime())/864e5);return n<=0?(0,c.jsx)(y,{variant:"expired",children:"Subscription expired"}):n<=30?(0,c.jsxs)(y,{variant:"expiring",children:[n," days left"]}):(0,c.jsxs)(y,{variant:"active",children:[n," days left"]})}return null})()]})]}),(0,c.jsxs)(h,{children:[(0,c.jsxs)(o.Ot,{children:[(0,c.jsxs)(o.XS,{color:"#F59E0B",children:[(0,c.jsx)(o.h2,{children:"Today's Sales"}),(0,c.jsx)(o.G$,{children:(0,l.vv)(se.revenue||0,ee)})]}),(0,c.jsxs)(o.XS,{color:"#2563EB",children:[(0,c.jsx)(o.h2,{children:"Today's Orders"}),(0,c.jsx)(o.G$,{children:se.orders||0})]}),(0,c.jsxs)(o.XS,{color:"#10B981",children:[(0,c.jsx)(o.h2,{children:"Monthly Revenue"}),(0,c.jsx)(o.G$,{children:(0,l.vv)(oe.revenue||0,ee)})]}),(0,c.jsxs)(o.XS,{color:"#7C3AED",children:[(0,c.jsx)(o.h2,{children:"Monthly Orders"}),(0,c.jsx)(o.G$,{children:oe.orders||0})]}),(0,c.jsxs)(o.XS,{color:"#059669",children:[(0,c.jsx)(o.h2,{children:"This Year Revenue"}),(0,c.jsx)(o.G$,{children:(0,l.vv)(ae.revenue||0,ee)})]}),(0,c.jsxs)(o.XS,{color:"#6366F1",children:[(0,c.jsx)(o.h2,{children:"This Year Orders"}),(0,c.jsx)(o.G$,{children:ae.orders||0})]}),(0,c.jsxs)(o.XS,{color:"#8B5CF6",children:[(0,c.jsx)(o.h2,{children:"Total Revenue"}),(0,c.jsx)(o.G$,{children:(0,l.vv)(de.revenue||0,ee)})]}),(0,c.jsxs)(o.XS,{color:"#EF4444",children:[(0,c.jsx)(o.h2,{children:"Total Orders"}),(0,c.jsx)(o.G$,{children:de.orders||0})]})]}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(j,{children:[(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,c.jsx)("h3",{children:"Sales & Orders Overview"}),(0,c.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,c.jsx)("button",{onClick:()=>Q("week"),style:{padding:"6px 12px",background:"week"===K?"#635BFF":"transparent",color:"week"===K?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,c.jsx)("button",{onClick:()=>Q("month"),style:{padding:"6px 12px",background:"month"===K?"#635BFF":"transparent",color:"month"===K?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,c.jsx)("button",{onClick:()=>Q("year"),style:{padding:"6px 12px",background:"year"===K?"#635BFF":"transparent",color:"year"===K?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),V.length>0?(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:V.map((e,r)=>{const n=Math.max(...V.map(e=>e.revenue),1),t=new Date(e.date);return(0,c.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,c.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/n*80)}px`,background:0===e.revenue?"#E5E7EB":"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px",cursor:"pointer",transition:"opacity 0.2s"},title:`${t.toLocaleDateString()}: RM ${e.revenue.toLocaleString()}`,onMouseEnter:e=>e.currentTarget.style.opacity="0.8",onMouseLeave:e=>e.currentTarget.style.opacity="1"}),(0,c.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===K?t.toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===K?`Week ${r+1}`:t.toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,c.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:(0,l.vv)(e.revenue,ee)}),(0,c.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.orders||0," ord"]})]},e.date)})}),(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,c.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===K?"Last 7 days":"month"===K?"Last 12 weeks":"Last 12 months"}),(0,c.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=V.find(e=>e.revenue>0),r=V[V.length-1];if(e&&r&&e.revenue>0){const n=(r.revenue-e.revenue)/e.revenue*100;return n>0?`\u2197 +${n.toFixed(1)}%`:n<0?`\u2198 ${n.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,c.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:(0,c.jsxs)("div",{style:{textAlign:"center",paddingTop:"40px",color:"#6B7280"},children:[(0,c.jsxs)("p",{children:["Total Revenue: ",(0,l.vv)(oe.revenue,ee)]}),(0,c.jsx)("p",{children:"Loading chart data..."})]})})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)("h3",{children:"Notifications"}),(0,c.jsxs)(v,{children:[(se.pendingOrders||0)>0&&(0,c.jsx)(b,{type:"warning",onClick:()=>e(`/restaurant/${n}/live-orders`),children:(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{type:"warning",children:"Pending Orders"}),(0,c.jsxs)(w,{children:[se.pendingOrders," order(s) waiting to be processed"]})]})}),(le.unpaidInvoices||0)>0&&(0,c.jsx)(b,{type:"warning",onClick:()=>e(`/restaurant/${n}/invoices`),children:(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{type:"warning",children:"Unpaid Invoices"}),(0,c.jsxs)(w,{children:[le.unpaidInvoices," invoice(s) \u2022 ",(0,l.vv)(le.totalUnpaidAmount||0,ee)," due"]})]})}),ne.notices>0&&(0,c.jsx)(b,{type:"info",onClick:()=>e(`/restaurant/${n}/notices`),children:(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{type:"info",children:"Unread Notices"}),(0,c.jsxs)(w,{children:[ne.notices," unread notice(s)"]})]})}),ne.systemInquiry>0&&(0,c.jsx)(b,{type:"info",onClick:()=>e(`/restaurant/${n}/support`),children:(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{type:"info",children:"System Inquiry Updates"}),(0,c.jsxs)(w,{children:[ne.systemInquiry," inquiry(s) with new replies"]})]})}),ne.operationInquiry>0&&(0,c.jsx)(b,{type:"info",onClick:()=>e(`/restaurant/${n}/operation-inquiry`),children:(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{type:"info",children:"Operation Inquiry Updates"}),(0,c.jsxs)(w,{children:[ne.operationInquiry," inquiry(s) with responses"]})]})}),0===(se.pendingOrders||0)&&0===(le.unpaidInvoices||0)&&0===ne.notices&&0===ne.systemInquiry&&0===ne.operationInquiry&&(0,c.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"13px",fontStyle:"italic"},children:"No new notifications"})]})]})]}),(0,c.jsxs)(P,{children:[(0,c.jsx)("h3",{children:"Quick Actions"}),(0,c.jsxs)(U,{children:[(0,c.jsxs)(G,{onClick:()=>window.open(`/restaurant/${n}/pos-terminal`,"_blank"),children:[(0,c.jsx)("div",{className:"icon",children:"\u25a6"}),(0,c.jsx)("div",{className:"title",children:"POS Terminal"}),(0,c.jsx)("div",{className:"description",children:"Process orders"})]}),(0,c.jsxs)(G,{onClick:()=>window.open(`/restaurant/${n}/kitchen`,"_blank"),children:[(0,c.jsx)("div",{className:"icon",children:"\u25d0"}),(0,c.jsx)("div",{className:"title",children:"Kitchen Display"}),(0,c.jsx)("div",{className:"description",children:"View kitchen orders"})]}),(0,c.jsxs)(G,{onClick:()=>e(`/restaurant/${n}/live-orders`),children:[(0,c.jsx)("div",{className:"icon",children:"\u25c9"}),(0,c.jsx)("div",{className:"title",children:"Live Orders"}),(0,c.jsx)("div",{className:"description",children:"Monitor all orders"})]}),(0,c.jsxs)(G,{onClick:()=>e(`/restaurant/${n}/menu`),children:[(0,c.jsx)("div",{className:"icon",children:"\u2261"}),(0,c.jsx)("div",{className:"title",children:"Menu"}),(0,c.jsx)("div",{className:"description",children:"Edit menu items"})]})]})]}),(0,c.jsx)(X,{children:(0,c.jsx)("h3",{children:"Recent Orders"})}),(0,c.jsx)(k,{children:(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:(0,c.jsxs)($,{children:[(0,c.jsx)(C,{children:"Order"}),(0,c.jsx)(C,{children:"Items"}),(0,c.jsx)(C,{children:"Status"}),(0,c.jsx)(C,{children:"Time"}),(0,c.jsx)(C,{children:"Amount"})]})}),(0,c.jsx)(S,{children:0===ce.length?(0,c.jsx)($,{children:(0,c.jsx)(D,{colSpan:5,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No recent orders"})}):ce.map(e=>(0,c.jsxs)($,{children:[(0,c.jsxs)(D,{children:[(0,c.jsx)(I,{children:e.order_number}),(0,c.jsxs)(z,{children:[e.customer_name||"Guest",(0,c.jsx)("br",{}),e.customer_phone||"N/A",e.table_number&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("br",{}),"Table: ",e.table_number]})]})]}),(0,c.jsx)(D,{children:(0,c.jsx)(T,{children:(()=>{const r=e.items||e.order_items||[];return Array.isArray(r)&&0!==r.length?r.map((e,r)=>e?(0,c.jsxs)(_,{children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)(N,{children:[e.quantity||1,"x"]}),e.name||e.menu_item_name||"Unknown Item"]}),e.options&&e.options.length>0&&(0,c.jsx)(R,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},r):null):(0,c.jsx)("span",{style:{color:"#6B7280",fontSize:"13px"},children:"No items"})})()})}),(0,c.jsx)(D,{children:(0,c.jsx)(L,{variant:e.status,children:(()=>{switch(e.status){case"awaiting_payment":return"Outstanding";case"pending":return"Pending";case"preparing":return"Preparing";case"ready":return"Ready";case"served":return"Served";case"completed":return"Completed";case"cancelled":return"Cancelled";default:return e.status.charAt(0).toUpperCase()+e.status.slice(1)}})()})}),(0,c.jsx)(D,{children:(0,c.jsx)(O,{children:new Date(e.order_date).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})}),(0,c.jsxs)(D,{children:[(0,c.jsx)(M,{children:(0,l.vv)(parseFloat(e.total_amount||0),ee)}),(0,c.jsx)(q,{isPending:"pending"===e.payment_status,children:"pending"===e.payment_status?"Pending":e.payment_method||"Cash"})]})]},e.id))})]})})]})]})})}}}]);