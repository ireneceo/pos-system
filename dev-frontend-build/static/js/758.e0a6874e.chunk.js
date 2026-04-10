"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[758],{758:(e,r,n)=>{n.r(r),n.d(r,{default:()=>G});var a=n(9950),s=n(4492),t=n(4752),i=n(8409),o=n(1367),d=n(4021),c=n(6038),l=n(5030),h=n(9955),p=n(4414);const u=t.Ay.div`
  min-height: 100vh;
`,x=t.Ay.div`
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
`,m=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,b=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,y=t.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,f=t.Ay.div`
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
`,v=t.Ay.div`
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
`,j=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,A=t.Ay.div`
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
`,w=t.Ay.div`
  flex: 1;
  min-width: 0;
`,F=t.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,k=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,D=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,M=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,E=t.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,B=t.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,C=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,S=t.Ay.div`
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
`,R=t.Ay.div`
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
`,N=t.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,$=t.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,z=t.Ay.thead`
  background: #F8FAFC;
`,O=t.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,_=t.Ay.tbody``,I=t.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  cursor: pointer;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,q=t.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,T=t.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"active":return"background: #D1FAE5; color: #065F46;";case"trial":return"background: #DBEAFE; color: #1E40AF;";case"expired":return"background: #FEE2E2; color: #991B1B;";case"suspended":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,G=()=>{const{t:e}=(0,l.Bd)("common"),r=(0,s.Zp)(),{user:n}=(0,o.As)(),[t,G]=(0,a.useState)([]),[X,P]=(0,a.useState)(!0),[W,Y]=(0,a.useState)(""),{defaultCurrency:L}=(0,d.i1)(),[U,V]=(0,a.useState)("RM"),[Z,H]=(0,a.useState)([]),[J,K]=(0,a.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0}),[Q,ee]=(0,a.useState)({overdue:0,pending:0}),[re,ne]=(0,a.useState)(0);(0,a.useEffect)(()=>{L&&V(L)},[L]);(0,a.useEffect)(()=>{n&&(async()=>{try{const e=(0,h.c4)();if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&K(e.data)}}catch{}})()},[n]),(0,a.useEffect)(()=>{const e=[];Q.overdue>0&&e.push({type:"warning",title:"Overdue Invoices",message:`${Q.overdue} invoice(s) need attention`,link:"/pos/brand/invoices"}),Q.pending>0&&e.push({type:"info",title:"Pending Invoices",message:`${Q.pending} invoice(s) pending payment`,link:"/pos/brand/invoices"}),re>0&&e.push({type:"info",title:"No Orders Today",message:`${re} restaurant(s) with no orders today`,link:"/pos/manager/restaurants"}),J.notices>0&&e.push({type:"info",title:"Unread Notices",message:`${J.notices} unread notice(s)`,link:"/pos/brand/notices"}),J.systemInquiry>0&&e.push({type:"info",title:"System Inquiry",message:`${J.systemInquiry} inquiry(s) with new replies`,link:"/pos/brand/system-inquiry"}),0!==e.length||X||e.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),e.length>0&&H(e)},[J,Q,re,X]),(0,a.useEffect)(()=>{n&&(async()=>{try{const e={Authorization:`Bearer ${(0,h.c4)()}`},r=await fetch("/api/brands",{headers:e});if(r.ok){const e=await r.json();e.length>0&&Y(e[0].name||"")}const[n,a]=await Promise.all([fetch("/api/restaurants",{headers:e}),fetch("/api/invoices",{headers:e})]),s=a.ok?await a.json():{data:[]},t=s.data||s||[],i=t.filter(e=>"overdue"===e.status).length,o=t.filter(e=>"pending_payment"===e.status||"sent"===e.status).length;if(n.ok){const r=await n.json(),a=(new Date).toISOString().split("T")[0],s=await fetch("/api/orders",{headers:e}),t=s.ok?await s.json():[],d=t.data||t||[],c=r.map(e=>{const r=d.filter(r=>{var n,a;return(null===(n=r.restaurant_id)||void 0===n?void 0:n.toString())===(null===(a=e.id)||void 0===a?void 0:a.toString())}),n=r.filter(e=>{var r;return null===(r=e.order_date)||void 0===r?void 0:r.startsWith(a)}),s=n.reduce((e,r)=>e+parseFloat(r.total_amount||0),0),t=new Date;t.setDate(1);const i=t.toISOString().split("T")[0],o=r.filter(e=>e.order_date&&e.order_date>=i).reduce((e,r)=>e+parseFloat(r.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:n.length,todayRevenue:s,monthlyRevenue:o}});G(c),ee({overdue:i,pending:o}),ne(c.filter(e=>0===e.todayOrders).length)}}catch(e){console.error("Error fetching brand manager data:",e)}finally{P(!1)}})()},[n]);const ae=t.length,se=t.filter(e=>"active"===e.status).length,te=t.reduce((e,r)=>e+r.todayRevenue,0),ie=t.reduce((e,r)=>e+r.todayOrders,0),oe=t.reduce((e,r)=>e+r.monthlyRevenue,0),de=ae>0?oe/ae:0;return X?(0,p.jsxs)(u,{children:[(0,p.jsx)(x,{children:(0,p.jsx)(g,{children:e("common:brandManagerDashboard.brandManagerDashboard")})}),(0,p.jsx)(m,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:e("common:brandManagerDashboard.loadingDashboard")})})]}):(0,p.jsxs)(u,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(g,{children:e("common:brandManagerDashboard.brandManagerDashboard")}),W&&(0,p.jsx)(b,{children:(0,p.jsx)("span",{children:W})})]}),(0,p.jsxs)(m,{children:[(0,p.jsxs)(i.Ot,{children:[(0,p.jsxs)(i.XS,{color:"#DC2626",children:[(0,p.jsx)(i.h2,{children:e("common:brandManagerDashboard.totalRestaurants")}),(0,p.jsx)(i.G$,{children:ae})]}),(0,p.jsxs)(i.XS,{color:"#059669",children:[(0,p.jsx)(i.h2,{children:e("common:brandManagerDashboard.activeRestaurants")}),(0,p.jsx)(i.G$,{children:se})]}),(0,p.jsxs)(i.XS,{color:"#F59E0B",children:[(0,p.jsx)(i.h2,{children:e("common:brandManagerDashboard.todaysRevenue")}),(0,p.jsx)(i.G$,{children:(0,c.vv)(te,U)})]}),(0,p.jsxs)(i.XS,{color:"#2563EB",children:[(0,p.jsx)(i.h2,{children:e("common:brandManagerDashboard.todaysOrders")}),(0,p.jsx)(i.G$,{children:ie})]}),(0,p.jsxs)(i.XS,{color:"#10B981",children:[(0,p.jsx)(i.h2,{children:e("common:brandManagerDashboard.monthlyRevenue")}),(0,p.jsx)(i.G$,{children:(0,c.vv)(oe,U)})]}),(0,p.jsxs)(i.XS,{color:"#7C3AED",children:[(0,p.jsx)(i.h2,{children:e("common:brandManagerDashboard.avgRevenueStore")}),(0,p.jsx)(i.G$,{children:(0,c.vv)(de,U)})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsxs)(f,{children:[(0,p.jsx)("h3",{children:e("common:brandManagerDashboard.brandSummary")}),(0,p.jsxs)(D,{children:[(0,p.jsx)(M,{children:e("common:brandManagerDashboard.monthlyRevenue")}),(0,p.jsx)(E,{children:(0,c.vv)(oe,U)})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(M,{children:e("common:brandManagerDashboard.avgRevenueStore")}),(0,p.jsx)(E,{children:(0,c.vv)(de,U)})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(M,{children:e("common:brandManagerDashboard.activeRestaurants")}),(0,p.jsxs)(E,{children:[se," / ",ae]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(M,{children:e("common:brandManagerDashboard.todaysTotalOrders")}),(0,p.jsx)(E,{children:ie})]})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)("h3",{children:e("common:brandManagerDashboard.notifications")}),(0,p.jsx)(j,{children:Z.map((e,n)=>(0,p.jsx)(A,{type:e.type,onClick:()=>e.link&&r(e.link),children:(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{type:e.type,children:e.title}),(0,p.jsx)(k,{children:e.message})]})},n))})]})]}),(0,p.jsxs)(B,{children:[(0,p.jsx)("h3",{children:e("common:brandManagerDashboard.quickActions")}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(S,{onClick:()=>r("/pos/manager/restaurants"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25d0"}),(0,p.jsx)("div",{className:"title",children:e("common:brandManagerDashboard.restaurants")}),(0,p.jsx)("div",{className:"description",children:e("common:brandManagerDashboard.restaurantManagement")})]}),(0,p.jsxs)(S,{onClick:()=>r("/pos/brand/invoices"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25a6"}),(0,p.jsx)("div",{className:"title",children:e("common:brandManagerDashboard.invoices")}),(0,p.jsx)("div",{className:"description",children:e("common:brandManagerDashboard.invoiceManagement")})]}),(0,p.jsxs)(S,{onClick:()=>r("/pos/brand/general/reports"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25c9"}),(0,p.jsx)("div",{className:"title",children:e("common:brandManagerDashboard.reports")}),(0,p.jsx)("div",{className:"description",children:e("common:brandManagerDashboard.performanceAnalytics")})]}),(0,p.jsxs)(S,{onClick:()=>r("/pos/manager/admins"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25c6"}),(0,p.jsx)("div",{className:"title",children:e("common:brandManagerDashboard.restaurantAdmins")}),(0,p.jsx)("div",{className:"description",children:e("common:brandManagerDashboard.adminManagement")})]})]})]}),(0,p.jsx)(R,{children:(0,p.jsx)("h3",{children:e("common:brandManagerDashboard.restaurantPerformance")})}),(0,p.jsx)(N,{children:(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:(0,p.jsxs)(I,{children:[(0,p.jsx)(O,{children:e("common:brandManagerDashboard.restaurant")}),(0,p.jsx)(O,{children:e("common:brandManagerDashboard.admin")}),(0,p.jsx)(O,{children:e("common:brandManagerDashboard.status")}),(0,p.jsx)(O,{children:e("common:brandManagerDashboard.todaysOrders")}),(0,p.jsx)(O,{children:e("common:brandManagerDashboard.todaysRevenue")}),(0,p.jsx)(O,{children:e("common:brandManagerDashboard.monthlyRevenue")})]})}),(0,p.jsx)(_,{children:t.length>0?t.map(e=>(0,p.jsxs)(I,{onClick:()=>r(`/pos/brand/general/reports?restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`),children:[(0,p.jsx)(q,{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,p.jsx)(q,{children:e.adminName}),(0,p.jsx)(q,{children:(0,p.jsx)(T,{status:e.status,children:e.status})}),(0,p.jsx)(q,{children:e.todayOrders}),(0,p.jsx)(q,{children:(0,c.vv)(e.todayRevenue,U)}),(0,p.jsx)(q,{style:{fontWeight:600},children:(0,c.vv)(e.monthlyRevenue,U)})]},e.id)):(0,p.jsx)(I,{children:(0,p.jsx)(q,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No restaurants registered yet"})})})]})})]})]})}},4021:(e,r,n)=>{n.d(r,{i1:()=>o});var a=n(9950),s=n(1367),t=n(6038),i=n(9955);const o=()=>{const{user:e}=(0,s.As)(),[r,n]=(0,a.useState)("RM"),[o]=(0,a.useState)(Object.keys(t.DL)),[d,c]=(0,a.useState)(!0),[l,h]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),a=r.indexOf("restaurant");let s=a>=0?r[a+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return n("RM"),void c(!1);try{const e=(0,i.c4)(),r=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var t;const e=await r.json(),a=e.currency||(null===(t=e.operation_settings)||void 0===t?void 0:t.currency)||"MYR";n(a)}else n("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),h("Failed to load currency settings"),n("MYR")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:o,loading:d,error:l}}}}]);