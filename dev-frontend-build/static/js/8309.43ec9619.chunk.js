"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8309],{4021:(e,t,r)=>{r.d(t,{i1:()=>o});var n=r(9950),a=r(1367),s=r(6038),i=r(9955);const o=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,n.useState)("RM"),[o]=(0,n.useState)(Object.keys(s.DL)),[d,l]=(0,n.useState)(!0),[c,u]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let a=n>=0?t[n+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return r("RM"),void l(!1);try{const e=(0,i.c4)(),t=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),n=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";r(n)}else r("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),u("Failed to load currency settings"),r("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:d,error:c}}},8285:(e,t,r)=>{r.d(t,{MA:()=>g,_M:()=>h});const n="cash",a="card",s="ewallet",i="bank_transfer",o="qr",d="counter",l="online",c="fpx",u="staffMeal",p={[n]:"Cash",[a]:"Credit/Debit Card",[s]:"E-Wallet",[i]:"Bank Transfer",[o]:"QR Payment",[d]:"Pay at Counter",[l]:"Online Payment",[c]:"FPX Online Banking",[u]:"Staff Meal"};function h(e,t){if(t){const r=t[{cash:"cash",card:"card",ewallet:"ewallet",bank_transfer:"bankTransfer",qr:"qr",counter:"payAtCounter",online:"online",fpx:"fpx",staffMeal:"staffMeal",staff_meal:"staffMeal"}[e]||e]||t[e];if(null!==r&&void 0!==r&&r.label)return r.label}return p[e]||e}const x={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function g(e,t,r){if(!e)return"N/A";if("card"===e&&t){return`${h("card",r)}(${x[t]||t})`}return h(e,r)}},8309:(e,t,r)=>{r.r(t),r.d(t,{default:()=>J});var n=r(9950),a=r(4492),s=r(4752),i=r(8409),o=r(843),d=r(1367),l=r(9018),c=r(6925),u=r(4021),p=r(8608),h=r(6038),x=r(8285),g=r(5030),f=r(9955),m=r(4414);const y=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,b=s.Ay.div`
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
`,v=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,A=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,k=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  ${e=>{let{variant:t}=e;switch(t){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
`,w=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,F=s.Ay.div`
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
`,C=s.Ay.div`
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
`,D=s.Ay.div`
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
`,E=s.Ay.div`
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
`,B=s.Ay.div`
  flex: 1;
  min-width: 0;
`,$=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"info":return"#2563EB";default:return"#374151"}}};
`,S=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,_=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,I=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,z=s.Ay.thead`
  background: #F8FAFC;
`,O=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,M=s.Ay.tbody``,R=s.Ay.tr`
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
`,P=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,q=s.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,N=s.Ay.div`
  line-height: 1.6;
`,L=s.Ay.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`,G=s.Ay.span`
  color: #6B7280;
  margin-right: 8px;
`,U=s.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,X=s.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,W=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,Y=s.Ay.div`
  color: ${e=>e.isPending?"#FF6B6B":"#6B7280"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending?"500":"normal"};
`,Q=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  ${e=>{switch(e.variant){case"awaiting_payment":return"background: #FEF3C7; color: #F59E0B;";case"pending":return"background: #FEF3C7; color: #92400E;";case"preparing":return"background: #DBEAFE; color: #1E40AF;";case"ready":case"served":return"background: #D1FAE5; color: #065F46;";case"completed":return"background: #E5E7EB; color: #374151;";case"cancelled":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,H=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,K=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,Z=s.Ay.div`
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
`,J=()=>{const{t:e}=(0,g.Bd)("settings"),t=(0,a.Zp)(),{user:r}=(0,d.As)(),{paymentSettings:s}=(0,l.Pj)(),J=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id)||"",[ee,te]=(0,n.useState)(null),[re,ne]=(0,n.useState)(!0),[ae,se]=(0,n.useState)("week"),[ie,oe]=(0,n.useState)([]),{defaultCurrency:de}=(0,u.i1)(),[le,ce]=(0,n.useState)("RM"),[ue,pe]=(0,n.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0}),{items:he}=(0,p.d)({role:(null===r||void 0===r?void 0:r.role)||"",restaurantId:J}),{isRouteAllowed:xe}=(0,c.W)(null!==r&&void 0!==r&&r.role?{role:r.role,restaurantId:Number(J)||null,brandId:null,foodcourtId:null}:null);if((0,n.useEffect)(()=>{de&&ce(de)},[de]),(0,n.useEffect)(()=>{(async()=>{try{const e=(0,f.c4)();if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&pe(e.data)}}catch(e){}})()},[]),(0,n.useEffect)(()=>{r&&(async()=>{if(console.log("\ud83d\udd0d Fetching dashboard data from DATABASE for user:",r),console.log("\ud83d\udd0d User ID:",null===r||void 0===r?void 0:r.id),console.log("\ud83d\udd0d Restaurant ID:",null===r||void 0===r?void 0:r.restaurantId),null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found for this user"),void ne(!1);try{const e=(0,f.c4)();if(!e)return console.error("\u274c No auth token found"),void ne(!1);const t=await fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 Dashboard API response status:",t.status),!t.ok){const e=await t.text();return console.error("\u274c API error:",t.status,e),void ne(!1)}const n=await t.json();console.log("\u2705 Dashboard data from DB:",n);const a=n.data||n;console.log("\ud83d\udcca Today orders:",a.today.orders),console.log("\ud83d\udcca Today revenue:",a.today.revenue),console.log("\ud83d\udcca Monthly orders:",a.monthly.orders),console.log("\ud83d\udcca Monthly revenue:",a.monthly.revenue),console.log("\ud83d\udcca Recent orders:",a.recentOrders.length),te(a)}catch(e){console.error("\u274c Error fetching dashboard data:",e)}finally{ne(!1)}})()},[r]),(0,n.useEffect)(()=>{r&&(async()=>{const e=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id);if(e)try{const t=(0,f.c4)();if(!t)return void console.error("\u274c No auth token found for sales chart");const r=await fetch(`/api/dashboard/restaurant/${e}/sales-chart?period=${ae}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(r.ok){const e=await r.json();oe(e.data||[])}else console.error("\u274c Sales chart API error:",r.status)}catch(t){console.error("\u274c Error fetching sales chart:",t)}})()},[r,ae]),re)return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(y,{children:[(0,m.jsx)(b,{children:(0,m.jsx)(j,{children:e("settings:restaurantDashboard.restaurantDashboard")})}),(0,m.jsx)(v,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]})});if(!ee)return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(y,{children:[(0,m.jsx)(b,{children:(0,m.jsx)(j,{children:e("settings:restaurantDashboard.restaurantDashboard")})}),(0,m.jsx)(v,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No data available"})})]})});const{restaurant:ge,today:fe,monthly:me,yearly:ye,total:be,billing:ve,recentOrders:je}=ee;return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(y,{children:[(0,m.jsxs)(b,{children:[(0,m.jsx)(j,{children:e("settings:restaurantDashboard.restaurantDashboard")}),(0,m.jsxs)(A,{children:[(0,m.jsxs)("span",{children:[ge.name," \u2022 ",ge.planType]}),(()=>{const t=ge.subscriptionEnd?new Date(ge.subscriptionEnd):null,r=new Date;if("trial"===ge.status){const n=ge.trialEndDate?new Date(ge.trialEndDate):t;if(n){const e=Math.ceil((n.getTime()-r.getTime())/864e5);return(0,m.jsxs)(k,{variant:"trial",children:["Trial \u2022 ",e>0?`${e} days left`:"Expired"]})}return(0,m.jsx)(k,{variant:"trial",children:e("settings:restaurantDashboard.trial")})}if(t){const n=Math.ceil((t.getTime()-r.getTime())/864e5);return n<=0?(0,m.jsx)(k,{variant:"expired",children:e("settings:restaurantDashboard.subscriptionExpired")}):n<=30?(0,m.jsxs)(k,{variant:"expiring",children:[n," days left"]}):(0,m.jsxs)(k,{variant:"active",children:[n," days left"]})}return null})()]})]}),(0,m.jsxs)(v,{children:[he.length>0&&(0,m.jsx)(o.eP,{items:he,entityId:J}),(0,m.jsxs)(i.Ot,{children:[(0,m.jsxs)(i.XS,{color:"#F59E0B",children:[(0,m.jsx)(i.h2,{children:e("settings:restaurantDashboard.todaysSales")}),(0,m.jsx)(i.G$,{children:(0,h.vv)(fe.revenue||0,le)})]}),(0,m.jsxs)(i.XS,{color:"#2563EB",children:[(0,m.jsx)(i.h2,{children:e("settings:restaurantDashboard.todaysOrders")}),(0,m.jsx)(i.G$,{children:fe.orders||0})]}),(0,m.jsxs)(i.XS,{color:"#10B981",children:[(0,m.jsx)(i.h2,{children:e("settings:restaurantDashboard.monthlyRevenue")}),(0,m.jsx)(i.G$,{children:(0,h.vv)(me.revenue||0,le)})]}),(0,m.jsxs)(i.XS,{color:"#7C3AED",children:[(0,m.jsx)(i.h2,{children:e("settings:restaurantDashboard.monthlyOrders")}),(0,m.jsx)(i.G$,{children:me.orders||0})]}),(0,m.jsxs)(i.XS,{color:"#059669",children:[(0,m.jsx)(i.h2,{children:e("settings:restaurantDashboard.thisYearRevenue")}),(0,m.jsx)(i.G$,{children:(0,h.vv)(ye.revenue||0,le)})]}),(0,m.jsxs)(i.XS,{color:"#6366F1",children:[(0,m.jsx)(i.h2,{children:e("settings:restaurantDashboard.thisYearOrders")}),(0,m.jsx)(i.G$,{children:ye.orders||0})]}),(0,m.jsxs)(i.XS,{color:"#8B5CF6",children:[(0,m.jsx)(i.h2,{children:e("settings:restaurantDashboard.totalRevenue")}),(0,m.jsx)(i.G$,{children:(0,h.vv)(be.revenue||0,le)})]}),(0,m.jsxs)(i.XS,{color:"#EF4444",children:[(0,m.jsx)(i.h2,{children:e("settings:restaurantDashboard.totalOrders")}),(0,m.jsx)(i.G$,{children:be.orders||0})]})]}),(0,m.jsxs)(w,{children:[(0,m.jsxs)(F,{children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,m.jsx)("h3",{children:e("settings:restaurantDashboard.salesOrdersOverview")}),(0,m.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,m.jsx)("button",{onClick:()=>se("week"),style:{padding:"6px 12px",background:"week"===ae?"#635BFF":"transparent",color:"week"===ae?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,m.jsx)("button",{onClick:()=>se("month"),style:{padding:"6px 12px",background:"month"===ae?"#635BFF":"transparent",color:"month"===ae?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,m.jsx)("button",{onClick:()=>se("year"),style:{padding:"6px 12px",background:"year"===ae?"#635BFF":"transparent",color:"year"===ae?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),ie.length>0?(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:ie.map((e,t)=>{const r=Math.max(...ie.map(e=>e.revenue),1),n=new Date(e.date);return(0,m.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,m.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/r*80)}px`,background:0===e.revenue?"#E5E7EB":"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px",cursor:"pointer",transition:"opacity 0.2s"},title:`${n.toLocaleDateString()}: RM ${e.revenue.toLocaleString()}`,onMouseEnter:e=>e.currentTarget.style.opacity="0.8",onMouseLeave:e=>e.currentTarget.style.opacity="1"}),(0,m.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===ae?n.toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===ae?`Week ${t+1}`:n.toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,m.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:(0,h.vv)(e.revenue,le)}),(0,m.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.orders||0," ord"]})]},e.date)})}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===ae?"Last 7 days":"month"===ae?"Last 12 weeks":"Last 12 months"}),(0,m.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=ie.find(e=>e.revenue>0),t=ie[ie.length-1];if(e&&t&&e.revenue>0){const r=(t.revenue-e.revenue)/e.revenue*100;return r>0?`\u2197 +${r.toFixed(1)}%`:r<0?`\u2198 ${r.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,m.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:(0,m.jsxs)("div",{style:{textAlign:"center",paddingTop:"40px",color:"#6B7280"},children:[(0,m.jsxs)("p",{children:["Total Revenue: ",(0,h.vv)(me.revenue,le)]}),(0,m.jsx)("p",{children:e("settings:restaurantDashboard.loadingChartData")})]})})]}),(0,m.jsxs)(C,{children:[(0,m.jsx)("h3",{children:e("settings:restaurantDashboard.notifications")}),(0,m.jsxs)(D,{children:[(fe.pendingOrders||0)>0&&(0,m.jsx)(E,{type:"warning",onClick:()=>t(`/restaurant/${J}/live-orders`),children:(0,m.jsxs)(B,{children:[(0,m.jsx)($,{type:"warning",children:e("settings:restaurantDashboard.pendingOrders")}),(0,m.jsxs)(S,{children:[fe.pendingOrders," order(s) waiting to be processed"]})]})}),(ve.unpaidInvoices||0)>0&&(0,m.jsx)(E,{type:"warning",onClick:()=>t(`/restaurant/${J}/invoices`),children:(0,m.jsxs)(B,{children:[(0,m.jsx)($,{type:"warning",children:e("settings:restaurantDashboard.unpaidInvoices")}),(0,m.jsxs)(S,{children:[ve.unpaidInvoices," invoice(s) \u2022 ",(0,h.vv)(ve.totalUnpaidAmount||0,le)," due"]})]})}),ue.notices>0&&(0,m.jsx)(E,{type:"info",onClick:()=>t(`/restaurant/${J}/notices`),children:(0,m.jsxs)(B,{children:[(0,m.jsx)($,{type:"info",children:e("settings:restaurantDashboard.unreadNotices")}),(0,m.jsxs)(S,{children:[ue.notices," unread notice(s)"]})]})}),ue.systemInquiry>0&&(0,m.jsx)(E,{type:"info",onClick:()=>t(`/restaurant/${J}/support`),children:(0,m.jsxs)(B,{children:[(0,m.jsx)($,{type:"info",children:e("settings:restaurantDashboard.systemInquiryUpdates")}),(0,m.jsxs)(S,{children:[ue.systemInquiry," inquiry(s) with new replies"]})]})}),ue.operationInquiry>0&&(0,m.jsx)(E,{type:"info",onClick:()=>t(`/restaurant/${J}/operation-inquiry`),children:(0,m.jsxs)(B,{children:[(0,m.jsx)($,{type:"info",children:e("settings:restaurantDashboard.operationInquiryUpdates")}),(0,m.jsxs)(S,{children:[ue.operationInquiry," inquiry(s) with responses"]})]})}),0===(fe.pendingOrders||0)&&0===(ve.unpaidInvoices||0)&&0===ue.notices&&0===ue.systemInquiry&&0===ue.operationInquiry&&(0,m.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"13px",fontStyle:"italic"},children:"No new notifications"})]})]})]}),(0,m.jsxs)(H,{children:[(0,m.jsx)("h3",{children:e("settings:restaurantDashboard.quickActions")}),(0,m.jsx)(K,{children:(()=>{const r=[];xe(`/restaurant/${J}/pos-terminal`)&&r.push({icon:"\u25a6",title:e("common:nav.posTerminal"),desc:e("settings:restaurantDashboard.processOrders"),onClick:()=>window.open(`/restaurant/${J}/pos-terminal`,"_blank")}),xe(`/restaurant/${J}/floor-plan`)&&r.push({icon:"\u25a6",title:e("common:nav.floorPlan"),desc:e("settings:restaurantDashboard.tableLayout"),onClick:()=>window.open(`/restaurant/${J}/floor-plan`,"_blank")}),xe(`/restaurant/${J}/kitchen`)&&r.push({icon:"\u25d0",title:e("common:nav.kitchenDisplay"),desc:e("settings:restaurantDashboard.viewKitchenOrders"),onClick:()=>window.open(`/restaurant/${J}/kitchen`,"_blank")}),xe(`/restaurant/${J}/display`)&&r.push({icon:"\u25a1",title:e("settings:restaurantDashboard.customerDisplay"),desc:e("settings:restaurantDashboard.pickupNumber"),onClick:()=>window.open(`/restaurant/${J}/display`,"_blank")}),xe("/mobile/:slug/menu")&&r.push({icon:"\u25ef",title:e("common:nav.mobileOrder"),desc:e("settings:restaurantDashboard.customerOrdering"),onClick:async()=>{try{const e=(0,f.c4)(),t=await fetch(`/api/restaurants/${J}`,{headers:e?{Authorization:`Bearer ${e}`}:{}});if(t.ok){const e=await t.json();window.open(`/mobile/${(e.data||e).slug||`restaurant-${J}`}`,"_blank")}else window.open(`/mobile/restaurant-${J}`,"_blank")}catch{window.open(`/mobile/restaurant-${J}`,"_blank")}}});let n=r.length>=5?r.filter(e=>"Customer Display"!==e.title).slice(0,4):[...r];return n.length<4&&n.push({icon:"\u25c9",title:e("common:nav.liveOrders"),desc:e("settings:restaurantDashboard.monitorAllOrders"),onClick:()=>t(`/restaurant/${J}/live-orders`)}),n.length<4&&n.push({icon:"\u2261",title:e("common:nav.menu"),desc:e("settings:restaurantDashboard.editMenuItems"),onClick:()=>t(`/restaurant/${J}/menu`)}),n.slice(0,4).map((e,t)=>(0,m.jsxs)(Z,{onClick:e.onClick,children:[(0,m.jsx)("div",{className:"icon",children:e.icon}),(0,m.jsx)("div",{className:"title",children:e.title}),(0,m.jsx)("div",{className:"description",children:e.desc})]},t))})()})]}),(0,m.jsx)(V,{children:(0,m.jsx)("h3",{children:e("settings:restaurantDashboard.recentOrders")})}),(0,m.jsx)(_,{children:(0,m.jsxs)(I,{children:[(0,m.jsx)(z,{children:(0,m.jsxs)(R,{children:[(0,m.jsx)(O,{children:e("settings:restaurantDashboard.order")}),(0,m.jsx)(O,{children:e("settings:restaurantDashboard.items")}),(0,m.jsx)(O,{children:e("settings:restaurantDashboard.status")}),(0,m.jsx)(O,{children:e("settings:restaurantDashboard.time")}),(0,m.jsx)(O,{children:e("settings:restaurantDashboard.amount")})]})}),(0,m.jsx)(M,{children:0===je.length?(0,m.jsx)(R,{children:(0,m.jsx)(T,{colSpan:5,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No recent orders"})}):je.map(t=>(0,m.jsxs)(R,{children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:t.order_number}),(0,m.jsxs)(q,{children:[t.customer_name||"Guest",(0,m.jsx)("br",{}),t.customer_phone||"N/A",t.table_number&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("br",{}),"Table: ",t.table_number]})]})]}),(0,m.jsx)(T,{children:(0,m.jsx)(N,{children:(()=>{const r=t.items||t.order_items||[];return Array.isArray(r)&&0!==r.length?r.map((e,t)=>e?(0,m.jsxs)(L,{children:[(0,m.jsxs)("div",{children:[(0,m.jsxs)(G,{children:[e.quantity||1,"x"]}),e.name||e.menu_item_name||"Unknown Item"]}),e.options&&e.options.length>0&&(0,m.jsx)(U,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t):null):(0,m.jsx)("span",{style:{color:"#6B7280",fontSize:"13px"},children:e("settings:restaurantDashboard.noItems")})})()})}),(0,m.jsx)(T,{children:(0,m.jsx)(Q,{variant:t.status,children:(()=>{switch(t.status){case"awaiting_payment":return"Outstanding";case"pending":return"Pending";case"preparing":return"Preparing";case"ready":return"Ready";case"served":return"Served";case"completed":return"Completed";case"cancelled":return"Cancelled";default:return t.status.charAt(0).toUpperCase()+t.status.slice(1)}})()})}),(0,m.jsx)(T,{children:(0,m.jsx)(X,{children:new Date(t.order_date).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})}),(0,m.jsxs)(T,{children:[(0,m.jsx)(W,{children:(0,h.vv)(parseFloat(t.total_amount||0),le)}),(0,m.jsx)(Y,{isPending:"pending"===t.payment_status,children:"pending"===t.payment_status?"Pending":(0,x.MA)(t.payment_method,t.card_type,s||void 0)})]})]},t.id))})]})})]})]})})}},8608:(e,t,r)=>{r.d(t,{d:()=>i});var n=r(9950),a=r(9955);function s(e){if(!e)return!1;const t=e.business_registration||e.registration_no,r=e.tax_id||e.tax_no;return!(!e.address||!e.phone||!t&&!r)}function i(e){const[t,r]=(0,n.useState)([]),[i,o]=(0,n.useState)(!0),{role:d,restaurantId:l,brandId:c,foodcourtId:u}=e;return(0,n.useEffect)(()=>{(async()=>{try{o(!0);const g=function(){const e=(0,a.c4)(),t={"Content-Type":"application/json"};return e&&(t.Authorization=`Bearer ${e}`),t}();if("Restaurant Admin"!==d&&"Staff"!==d||!l)if("Brand General"!==d&&"Brand Manager"!==d||!c)if("Foodcourt General"!==d&&"Foodcourt Manager"!==d||!u)r([]);else{const[e,t]=await Promise.all([fetch("/api/foodcourts/company-info",{headers:g}),fetch(`/api/foodcourts/${u}/restaurants`,{headers:g})]);let n=null,a=!1;if(e.ok){const t=await e.json();n=t.data||t}if(t.ok){const e=(await t.json()).data||[];a=!!Array.isArray(e)&&e.length>0}r([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/foodcourt/company-info",completed:s(n)},{key:"tenant_restaurants",label:"Add Tenant Restaurants",description:"Link restaurants to your foodcourt to manage them together",path:"/pos/foodcourt/general/management",completed:a}])}else{const[e,t,n,a]=await Promise.all([fetch("/api/brands/company-info",{headers:g}),fetch("/api/brand-products?limit=1",{headers:g}),fetch("/api/product-recipes?limit=1",{headers:g}),fetch("/api/product-ingredients?limit=1",{headers:g})]);let i=null,o=!1,d=!1,l=!1;if(e.ok){const t=await e.json();i=t.data||t}if(t.ok){const e=(await t.json()).data||[];o=!!Array.isArray(e)&&e.length>0}if(n.ok){const e=(await n.json()).data||[];d=!!Array.isArray(e)&&e.length>0}if(a.ok){const e=(await a.json()).data||[];l=!!Array.isArray(e)&&e.length>0}r([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/brand/company-info",completed:s(i)},{key:"brand_products",label:"Add Brand Products",description:"Register your brand products to share across restaurant locations",path:"/pos/brand-products",completed:o},{key:"product_recipes",label:"Set up Product Recipes",description:"Define recipes for your brand products to track ingredient usage",path:"/pos/brand-product-recipes",completed:d},{key:"brand_ingredients",label:"Add Brand Ingredients",description:"Add ingredients used in your brand product recipes",path:"/pos/brand-ingredients",completed:l}])}else{var e,t,n,i,p;const[a,o,d,c,u,f]=await Promise.all([fetch(`/api/restaurants/${l}/company-info`,{headers:g}),fetch(`/api/restaurants/${l}`,{headers:g}),fetch(`/api/categories?restaurantId=${l}`,{headers:g}),fetch(`/api/menu?restaurant_id=${l}&excludeImage=true`,{headers:g}),fetch(`/api/kitchen-stations?restaurant_id=${l}`,{headers:g}),fetch("/api/notification-settings/preferences",{headers:g})]);let m=null,y=null,b=0,v=0,j=0,A=!1;if(a.ok){const e=await a.json();m=e.data||e}if(o.ok){const e=await o.json();y=e.data||e}if(d.ok){const e=(await d.json()).data||[];b=Array.isArray(e)?e.length:0}if(c.ok){var h;const e=await c.json(),t=(null===(h=e.data)||void 0===h?void 0:h.items)||e.data||[];v=Array.isArray(t)?t.length:0}if(u.ok){const e=(await u.json()).data||[];j=Array.isArray(e)?e.length:0}if(f.ok){var x;A=!(null===(x=(await f.json()).data)||void 0===x||!x.preferences)}const k=s(m),w=!(null===(e=y)||void 0===e||!e.currency),F=null===(t=y)||void 0===t?void 0:t.operation_settings,C=!(null===F||void 0===F||!F.timeZone),D=w&&C,E=!(null===F||void 0===F||!F.openingTime||null===F||void 0===F||!F.closingTime),B=b>0,$=v>0,S=null===(n=y)||void 0===n?void 0:n.payment_settings;let _=!1;S&&"object"===typeof S&&(_=Object.entries(S).some(e=>{let[t,r]=e;return!("_order"===t||!r||"object"!==typeof r)&&(r.enabled&&Array.isArray(r.availableIn)&&r.availableIn.includes("pos"))}));const I=j>0,z=null===(i=y)||void 0===i?void 0:i.floor_plan,O=!!(z&&Array.isArray(z)&&z.length>0)||!(!z||"object"!==typeof z||Array.isArray(z)||!(Array.isArray(z.tables)?z.tables.length>0:Array.isArray(z.elements)&&z.elements.length>0)),M=null===F||void 0===F?void 0:F.orderTypes,R=!(!M||"object"!==typeof M||!Object.values(M).some(e=>!0===e)),T=A,P=null===(p=y)||void 0===p?void 0:p.table_settings,q=!(null===P||void 0===P||!P.qrCodeBaseUrl);r([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:`/restaurant/${l}/company-information`,completed:k},{key:"store_settings",label:"Set Currency & Timezone",description:"Configure your currency and timezone for accurate transactions",path:`/restaurant/${l}/settings?tab=store`,completed:D},{key:"operating_hours",label:"Set Operating Hours",description:"Configure opening/closing times for your restaurant",path:`/restaurant/${l}/settings?tab=operations`,completed:E},{key:"categories",label:"Add Categories",description:"Create menu categories to organize items and route to kitchen stations",path:`/restaurant/${l}/categories`,completed:B},{key:"menu_items",label:"Add Menu Items",description:"Register at least one menu item to start taking orders",path:`/restaurant/${l}/menu`,completed:$},{key:"payment_methods",label:"Configure Payment Methods",description:"Enable at least one payment method for POS transactions",path:`/restaurant/${l}/settings?tab=payment`,completed:_},{key:"kitchen_stations",label:"Set up Kitchen Stations",description:"Configure kitchen stations to route orders to the right preparation area",path:`/restaurant/${l}/settings?tab=kitchenStations`,completed:I},{key:"floor_plan",label:"Configure Floor Plan",description:"Set up your restaurant floor plan with tables for dine-in orders",path:`/restaurant/${l}/floor-plan-editor`,completed:O},{key:"mobile_order",label:"Configure Mobile Order",description:"Enable order types (dine-in, takeaway, delivery) for your restaurant",path:`/restaurant/${l}/settings?tab=mobileOrder`,completed:R},{key:"notifications",label:"Set up Notifications",description:"Configure notification preferences to stay informed about your restaurant",path:`/restaurant/${l}/notification-settings`,completed:T},{key:"qr_codes",label:"Set up QR Codes",description:"Generate QR codes for tables to enable mobile ordering",path:`/restaurant/${l}/settings?tab=operations`,completed:q}])}}catch(g){console.error("useSetupStatus Error:",g),r([])}finally{o(!1)}})()},[d,l,c,u]),{items:t,loading:i}}}}]);