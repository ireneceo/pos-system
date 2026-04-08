"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[758],{758:(e,r,n)=>{n.r(r),n.d(r,{default:()=>T});var a=n(9950),t=n(4492),s=n(4752),i=n(8409),o=n(1367),d=n(4021),c=n(6038),l=n(5030),h=n(4414);const p=s.Ay.div`
  min-height: 100vh;
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
`,x=s.Ay.div`
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
`,g=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
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
`,y=s.Ay.div`
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

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,j=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{switch(e.type){case"error":return"#FEF2F2";case"warning":return"#FFFBEB";case"success":return"#ECFDF5";case"info":return"#EFF6FF";default:return"#F8FAFC"}}};
  border: 1px solid ${e=>{switch(e.type){case"error":return"#FECACA";case"warning":return"#FDE68A";case"success":return"#A7F3D0";case"info":return"#BFDBFE";default:return"#E6EBF1"}}};
  flex-shrink: 0;

  &:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); }
`,A=s.Ay.div`
  flex: 1;
  min-width: 0;
`,w=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,F=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,k=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,D=s.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,M=s.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,E=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,B=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,S=s.Ay.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F6F9FC;
    .icon { color: #0A2540; }
    .title { color: #0A2540; }
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
`,C=s.Ay.div`
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
`,R=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,N=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,$=s.Ay.thead`
  background: #F8FAFC;
`,z=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,_=s.Ay.tbody``,I=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  cursor: pointer;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,O=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,q=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"active":return"background: #D1FAE5; color: #065F46;";case"trial":return"background: #DBEAFE; color: #1E40AF;";case"expired":return"background: #FEE2E2; color: #991B1B;";case"suspended":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,T=()=>{const{t:e}=(0,l.Bd)("common"),r=(0,t.Zp)(),{user:n}=(0,o.As)(),[s,T]=(0,a.useState)([]),[G,X]=(0,a.useState)(!0),[P,W]=(0,a.useState)(""),{defaultCurrency:Y}=(0,d.i1)(),[L,U]=(0,a.useState)("RM"),[V,Z]=(0,a.useState)([]),[H,J]=(0,a.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0}),[K,Q]=(0,a.useState)({overdue:0,pending:0}),[ee,re]=(0,a.useState)(0);(0,a.useEffect)(()=>{Y&&U(Y)},[Y]);(0,a.useEffect)(()=>{n&&(async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&J(e.data)}}catch{}})()},[n]),(0,a.useEffect)(()=>{const e=[];K.overdue>0&&e.push({type:"warning",title:"Overdue Invoices",message:`${K.overdue} invoice(s) need attention`,link:"/pos/brand/invoices"}),K.pending>0&&e.push({type:"info",title:"Pending Invoices",message:`${K.pending} invoice(s) pending payment`,link:"/pos/brand/invoices"}),ee>0&&e.push({type:"info",title:"No Orders Today",message:`${ee} restaurant(s) with no orders today`,link:"/pos/manager/restaurants"}),H.notices>0&&e.push({type:"info",title:"Unread Notices",message:`${H.notices} unread notice(s)`,link:"/pos/brand/notices"}),H.systemInquiry>0&&e.push({type:"info",title:"System Inquiry",message:`${H.systemInquiry} inquiry(s) with new replies`,link:"/pos/brand/system-inquiry"}),0!==e.length||G||e.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),e.length>0&&Z(e)},[H,K,ee,G]),(0,a.useEffect)(()=>{n&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/brands",{headers:e});if(r.ok){const e=await r.json();e.length>0&&W(e[0].name||"")}const[n,a]=await Promise.all([fetch("/api/restaurants",{headers:e}),fetch("/api/invoices",{headers:e})]),t=a.ok?await a.json():{data:[]},s=t.data||t||[],i=s.filter(e=>"overdue"===e.status).length,o=s.filter(e=>"pending_payment"===e.status||"sent"===e.status).length;if(n.ok){const r=await n.json(),a=(new Date).toISOString().split("T")[0],t=await fetch("/api/orders",{headers:e}),s=t.ok?await t.json():[],d=s.data||s||[],c=r.map(e=>{const r=d.filter(r=>{var n,a;return(null===(n=r.restaurant_id)||void 0===n?void 0:n.toString())===(null===(a=e.id)||void 0===a?void 0:a.toString())}),n=r.filter(e=>{var r;return null===(r=e.order_date)||void 0===r?void 0:r.startsWith(a)}),t=n.reduce((e,r)=>e+parseFloat(r.total_amount||0),0),s=new Date;s.setDate(1);const i=s.toISOString().split("T")[0],o=r.filter(e=>e.order_date&&e.order_date>=i).reduce((e,r)=>e+parseFloat(r.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:n.length,todayRevenue:t,monthlyRevenue:o}});T(c),Q({overdue:i,pending:o}),re(c.filter(e=>0===e.todayOrders).length)}}catch(e){console.error("Error fetching brand manager data:",e)}finally{X(!1)}})()},[n]);const ne=s.length,ae=s.filter(e=>"active"===e.status).length,te=s.reduce((e,r)=>e+r.todayRevenue,0),se=s.reduce((e,r)=>e+r.todayOrders,0),ie=s.reduce((e,r)=>e+r.monthlyRevenue,0),oe=ne>0?ie/ne:0;return G?(0,h.jsxs)(p,{children:[(0,h.jsx)(u,{children:(0,h.jsx)(m,{children:e("common:brandManagerDashboard.brandManagerDashboard")})}),(0,h.jsx)(x,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:e("common:brandManagerDashboard.loadingDashboard")})})]}):(0,h.jsxs)(p,{children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(m,{children:e("common:brandManagerDashboard.brandManagerDashboard")}),P&&(0,h.jsx)(g,{children:(0,h.jsx)("span",{children:P})})]}),(0,h.jsxs)(x,{children:[(0,h.jsxs)(i.Ot,{children:[(0,h.jsxs)(i.XS,{color:"#DC2626",children:[(0,h.jsx)(i.h2,{children:e("common:brandManagerDashboard.totalRestaurants")}),(0,h.jsx)(i.G$,{children:ne})]}),(0,h.jsxs)(i.XS,{color:"#059669",children:[(0,h.jsx)(i.h2,{children:e("common:brandManagerDashboard.activeRestaurants")}),(0,h.jsx)(i.G$,{children:ae})]}),(0,h.jsxs)(i.XS,{color:"#F59E0B",children:[(0,h.jsx)(i.h2,{children:e("common:brandManagerDashboard.todaysRevenue")}),(0,h.jsx)(i.G$,{children:(0,c.vv)(te,L)})]}),(0,h.jsxs)(i.XS,{color:"#2563EB",children:[(0,h.jsx)(i.h2,{children:e("common:brandManagerDashboard.todaysOrders")}),(0,h.jsx)(i.G$,{children:se})]}),(0,h.jsxs)(i.XS,{color:"#10B981",children:[(0,h.jsx)(i.h2,{children:e("common:brandManagerDashboard.monthlyRevenue")}),(0,h.jsx)(i.G$,{children:(0,c.vv)(ie,L)})]}),(0,h.jsxs)(i.XS,{color:"#7C3AED",children:[(0,h.jsx)(i.h2,{children:e("common:brandManagerDashboard.avgRevenueStore")}),(0,h.jsx)(i.G$,{children:(0,c.vv)(oe,L)})]})]}),(0,h.jsxs)(b,{children:[(0,h.jsxs)(y,{children:[(0,h.jsx)("h3",{children:e("common:brandManagerDashboard.brandSummary")}),(0,h.jsxs)(k,{children:[(0,h.jsx)(D,{children:e("common:brandManagerDashboard.monthlyRevenue")}),(0,h.jsx)(M,{children:(0,c.vv)(ie,L)})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(D,{children:e("common:brandManagerDashboard.avgRevenueStore")}),(0,h.jsx)(M,{children:(0,c.vv)(oe,L)})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(D,{children:e("common:brandManagerDashboard.activeRestaurants")}),(0,h.jsxs)(M,{children:[ae," / ",ne]})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(D,{children:e("common:brandManagerDashboard.todaysTotalOrders")}),(0,h.jsx)(M,{children:se})]})]}),(0,h.jsxs)(f,{children:[(0,h.jsx)("h3",{children:e("common:brandManagerDashboard.notifications")}),(0,h.jsx)(v,{children:V.map((e,n)=>(0,h.jsx)(j,{type:e.type,onClick:()=>e.link&&r(e.link),children:(0,h.jsxs)(A,{children:[(0,h.jsx)(w,{type:e.type,children:e.title}),(0,h.jsx)(F,{children:e.message})]})},n))})]})]}),(0,h.jsxs)(E,{children:[(0,h.jsx)("h3",{children:e("common:brandManagerDashboard.quickActions")}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(S,{onClick:()=>r("/pos/manager/restaurants"),children:[(0,h.jsx)("div",{className:"icon",children:"\u25d0"}),(0,h.jsx)("div",{className:"title",children:e("common:brandManagerDashboard.restaurants")}),(0,h.jsx)("div",{className:"description",children:e("common:brandManagerDashboard.restaurantManagement")})]}),(0,h.jsxs)(S,{onClick:()=>r("/pos/brand/invoices"),children:[(0,h.jsx)("div",{className:"icon",children:"\u25a6"}),(0,h.jsx)("div",{className:"title",children:e("common:brandManagerDashboard.invoices")}),(0,h.jsx)("div",{className:"description",children:e("common:brandManagerDashboard.invoiceManagement")})]}),(0,h.jsxs)(S,{onClick:()=>r("/pos/brand/general/reports"),children:[(0,h.jsx)("div",{className:"icon",children:"\u25c9"}),(0,h.jsx)("div",{className:"title",children:e("common:brandManagerDashboard.reports")}),(0,h.jsx)("div",{className:"description",children:e("common:brandManagerDashboard.performanceAnalytics")})]}),(0,h.jsxs)(S,{onClick:()=>r("/pos/manager/admins"),children:[(0,h.jsx)("div",{className:"icon",children:"\u25c6"}),(0,h.jsx)("div",{className:"title",children:e("common:brandManagerDashboard.restaurantAdmins")}),(0,h.jsx)("div",{className:"description",children:e("common:brandManagerDashboard.adminManagement")})]})]})]}),(0,h.jsx)(C,{children:(0,h.jsx)("h3",{children:e("common:brandManagerDashboard.restaurantPerformance")})}),(0,h.jsx)(R,{children:(0,h.jsxs)(N,{children:[(0,h.jsx)($,{children:(0,h.jsxs)(I,{children:[(0,h.jsx)(z,{children:e("common:brandManagerDashboard.restaurant")}),(0,h.jsx)(z,{children:e("common:brandManagerDashboard.admin")}),(0,h.jsx)(z,{children:e("common:brandManagerDashboard.status")}),(0,h.jsx)(z,{children:e("common:brandManagerDashboard.todaysOrders")}),(0,h.jsx)(z,{children:e("common:brandManagerDashboard.todaysRevenue")}),(0,h.jsx)(z,{children:e("common:brandManagerDashboard.monthlyRevenue")})]})}),(0,h.jsx)(_,{children:s.length>0?s.map(e=>(0,h.jsxs)(I,{onClick:()=>r(`/pos/brand/general/reports?restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`),children:[(0,h.jsx)(O,{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,h.jsx)(O,{children:e.adminName}),(0,h.jsx)(O,{children:(0,h.jsx)(q,{status:e.status,children:e.status})}),(0,h.jsx)(O,{children:e.todayOrders}),(0,h.jsx)(O,{children:(0,c.vv)(e.todayRevenue,L)}),(0,h.jsx)(O,{style:{fontWeight:600},children:(0,c.vv)(e.monthlyRevenue,L)})]},e.id)):(0,h.jsx)(I,{children:(0,h.jsx)(O,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No restaurants registered yet"})})})]})})]})]})}},4021:(e,r,n)=>{n.d(r,{i1:()=>i});var a=n(9950),t=n(1367),s=n(6038);const i=()=>{const{user:e}=(0,t.As)(),[r,n]=(0,a.useState)("RM"),[i]=(0,a.useState)(Object.keys(s.DL)),[o,d]=(0,a.useState)(!0),[c,l]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),a=r.indexOf("restaurant");let t=a>=0?r[a+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var s;const e=await r.json(),a=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";n(a)}else n("MYR")}catch(i){console.error("Failed to fetch restaurant currency:",i),l("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:i,loading:o,error:c}}}}]);