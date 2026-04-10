"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8026],{4021:(e,o,r)=>{r.d(o,{i1:()=>i});var n=r(9950),t=r(1367),a=r(6038),s=r(9955);const i=()=>{const{user:e}=(0,t.As)(),[o,r]=(0,n.useState)("RM"),[i]=(0,n.useState)(Object.keys(a.DL)),[d,c]=(0,n.useState)(!0),[l,h]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const o=window.location.pathname.split("/"),n=o.indexOf("restaurant");let t=n>=0?o[n+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return r("RM"),void c(!1);try{const e=(0,s.c4)(),o=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(o.ok){var a;const e=await o.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";r(n)}else r("MYR")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),r("MYR")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:o,supportedCurrencies:i,loading:d,error:l}}},8026:(e,o,r)=>{r.r(o),r.d(o,{default:()=>G});var n=r(9950),t=r(4492),a=r(4752),s=r(8409),i=r(1367),d=r(4021),c=r(6038),l=r(5030),h=r(9955),u=r(4414);const p=a.Ay.div`
  min-height: 100vh;
`,x=a.Ay.div`
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
`,m=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,f=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,y=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,j=a.Ay.div`
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
`,b=a.Ay.div`
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
`,v=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,A=a.Ay.div`
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
`,w=a.Ay.div`
  flex: 1;
  min-width: 0;
`,F=a.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,k=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,D=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,M=a.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,E=a.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,B=a.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,C=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,S=a.Ay.div`
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
`,N=a.Ay.div`
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
`,R=a.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,$=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,z=a.Ay.thead`
  background: #F8FAFC;
`,O=a.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,_=a.Ay.tbody``,I=a.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  cursor: pointer;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,T=a.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,q=a.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"active":return"background: #D1FAE5; color: #065F46;";case"trial":return"background: #DBEAFE; color: #1E40AF;";case"expired":return"background: #FEE2E2; color: #991B1B;";case"suspended":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,G=()=>{const{t:e}=(0,l.Bd)("common"),o=(0,t.Zp)(),{user:r}=(0,i.As)(),[a,G]=(0,n.useState)([]),[X,P]=(0,n.useState)(!0),[W,Y]=(0,n.useState)(""),{defaultCurrency:L}=(0,d.i1)(),[U,V]=(0,n.useState)("RM"),[Z,H]=(0,n.useState)([]);(0,n.useEffect)(()=>{L&&V(L)},[L]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e={Authorization:`Bearer ${(0,h.c4)()}`},o=await fetch("/api/foodcourts",{headers:e});if(o.ok){const e=await o.json(),r=Array.isArray(e)?e:e.data||[];r.length>0&&Y(r[0].name||"")}const r=await fetch("/api/restaurants",{headers:e});if(r.ok){const o=await r.json(),n=(new Date).toISOString().split("T")[0],[t,a,s]=await Promise.all([fetch("/api/orders",{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/badge-counts",{headers:e})]),i=t.ok?await t.json():[],d=i.data||i||[],c=a.ok?await a.json():{data:[]},l=c.data||c||[],h=l.filter(e=>"overdue"===e.status).length,u=l.filter(e=>"pending_payment"===e.status||"sent"===e.status).length;let p={systemInquiry:0,operationInquiry:0,notices:0,invoices:0};if(s.ok){const e=await s.json();e.success&&(p=e.data)}const x=o.map(e=>{const o=d.filter(o=>{var r,n;return(null===(r=o.restaurant_id)||void 0===r?void 0:r.toString())===(null===(n=e.id)||void 0===n?void 0:n.toString())}),r=o.filter(e=>{var o;return null===(o=e.order_date)||void 0===o?void 0:o.startsWith(n)}),t=r.reduce((e,o)=>e+parseFloat(o.total_amount||0),0),a=new Date;a.setDate(1);const s=a.toISOString().split("T")[0],i=o.filter(e=>e.order_date&&e.order_date>=s).reduce((e,o)=>e+parseFloat(o.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:r.length,todayRevenue:t,monthlyRevenue:i}});G(x);const m=[];h>0&&m.push({type:"warning",title:"Overdue Invoices",message:`${h} invoice(s) need attention`,link:"/pos/foodcourt/invoices"}),u>0&&m.push({type:"info",title:"Pending Invoices",message:`${u} invoice(s) pending payment`,link:"/pos/foodcourt/invoices"});const g=x.filter(e=>0===e.todayOrders);g.length>0&&m.push({type:"info",title:"No Orders Today",message:`${g.length} tenant(s) with no orders today`,link:"/pos/manager/restaurants"}),p.notices>0&&m.push({type:"info",title:"Unread Notices",message:`${p.notices} unread notice(s)`,link:"/pos/foodcourt/notices"}),p.systemInquiry>0&&m.push({type:"info",title:"System Inquiry",message:`${p.systemInquiry} inquiry(s) with new replies`,link:"/pos/foodcourt/system-inquiry"}),0===m.length&&m.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),H(m)}}catch(e){console.error("Error fetching foodcourt manager data:",e)}finally{P(!1)}})()},[r]);const J=a.length,K=a.filter(e=>"active"===e.status).length,Q=a.reduce((e,o)=>e+o.todayRevenue,0),ee=a.reduce((e,o)=>e+o.todayOrders,0),oe=a.reduce((e,o)=>e+o.monthlyRevenue,0),re=J>0?Math.round(K/J*100):0;return X?(0,u.jsxs)(p,{children:[(0,u.jsx)(x,{children:(0,u.jsx)(g,{children:e("common:foodcourtManagerDashboard.foodcourtManagerDashboard")})}),(0,u.jsx)(m,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:e("common:foodcourtManagerDashboard.loadingDashboard")})})]}):(0,u.jsxs)(p,{children:[(0,u.jsxs)(x,{children:[(0,u.jsx)(g,{children:e("common:foodcourtManagerDashboard.foodcourtManagerDashboard")}),W&&(0,u.jsx)(f,{children:(0,u.jsx)("span",{children:W})})]}),(0,u.jsxs)(m,{children:[(0,u.jsxs)(s.Ot,{children:[(0,u.jsxs)(s.XS,{color:"#059669",children:[(0,u.jsx)(s.h2,{children:e("common:foodcourtManagerDashboard.totalTenants")}),(0,u.jsx)(s.G$,{children:J})]}),(0,u.jsxs)(s.XS,{color:"#10B981",children:[(0,u.jsx)(s.h2,{children:e("common:foodcourtManagerDashboard.activeTenants")}),(0,u.jsx)(s.G$,{children:K})]}),(0,u.jsxs)(s.XS,{color:"#F59E0B",children:[(0,u.jsx)(s.h2,{children:e("common:foodcourtManagerDashboard.todaysRevenue")}),(0,u.jsx)(s.G$,{children:(0,c.vv)(Q,U)})]}),(0,u.jsxs)(s.XS,{color:"#2563EB",children:[(0,u.jsx)(s.h2,{children:e("common:foodcourtManagerDashboard.todaysOrders")}),(0,u.jsx)(s.G$,{children:ee})]}),(0,u.jsxs)(s.XS,{color:"#7C3AED",children:[(0,u.jsx)(s.h2,{children:e("common:foodcourtManagerDashboard.monthlyRevenue")}),(0,u.jsx)(s.G$,{children:(0,c.vv)(oe,U)})]}),(0,u.jsxs)(s.XS,{color:"#EA580C",children:[(0,u.jsx)(s.h2,{children:e("common:foodcourtManagerDashboard.occupancyRate")}),(0,u.jsxs)(s.G$,{children:[re,"%"]})]})]}),(0,u.jsxs)(y,{children:[(0,u.jsxs)(j,{children:[(0,u.jsx)("h3",{children:e("common:foodcourtManagerDashboard.foodcourtSummary")}),(0,u.jsxs)(D,{children:[(0,u.jsx)(M,{children:e("common:foodcourtManagerDashboard.monthlyRevenue")}),(0,u.jsx)(E,{children:(0,c.vv)(oe,U)})]}),(0,u.jsxs)(D,{children:[(0,u.jsx)(M,{children:e("common:foodcourtManagerDashboard.occupancyRate")}),(0,u.jsxs)(E,{children:[re,"%"]})]}),(0,u.jsxs)(D,{children:[(0,u.jsx)(M,{children:e("common:foodcourtManagerDashboard.activeTenants")}),(0,u.jsxs)(E,{children:[K," / ",J]})]}),(0,u.jsxs)(D,{children:[(0,u.jsx)(M,{children:e("common:foodcourtManagerDashboard.todaysTotalOrders")}),(0,u.jsx)(E,{children:ee})]})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)("h3",{children:e("common:foodcourtManagerDashboard.notifications")}),(0,u.jsx)(v,{children:Z.map((e,r)=>(0,u.jsx)(A,{type:e.type,onClick:()=>e.link&&o(e.link),children:(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{type:e.type,children:e.title}),(0,u.jsx)(k,{children:e.message})]})},r))})]})]}),(0,u.jsxs)(B,{children:[(0,u.jsx)("h3",{children:e("common:foodcourtManagerDashboard.quickActions")}),(0,u.jsxs)(C,{children:[(0,u.jsxs)(S,{onClick:()=>o("/pos/manager/restaurants"),children:[(0,u.jsx)("div",{className:"icon",children:"\u25d0"}),(0,u.jsx)("div",{className:"title",children:e("common:foodcourtManagerDashboard.restaurants")}),(0,u.jsx)("div",{className:"description",children:e("common:foodcourtManagerDashboard.tenantManagement")})]}),(0,u.jsxs)(S,{onClick:()=>o("/pos/foodcourt/invoices"),children:[(0,u.jsx)("div",{className:"icon",children:"\u25a6"}),(0,u.jsx)("div",{className:"title",children:e("common:foodcourtManagerDashboard.invoices")}),(0,u.jsx)("div",{className:"description",children:e("common:foodcourtManagerDashboard.invoiceManagement")})]}),(0,u.jsxs)(S,{onClick:()=>o("/pos/foodcourt/general/reports"),children:[(0,u.jsx)("div",{className:"icon",children:"\u25b2"}),(0,u.jsx)("div",{className:"title",children:e("common:foodcourtManagerDashboard.statistics")}),(0,u.jsx)("div",{className:"description",children:e("common:foodcourtManagerDashboard.performanceAnalytics")})]}),(0,u.jsxs)(S,{onClick:()=>o("/pos/manager/admins"),children:[(0,u.jsx)("div",{className:"icon",children:"\u25c6"}),(0,u.jsx)("div",{className:"title",children:e("common:foodcourtManagerDashboard.restaurantAdmins")}),(0,u.jsx)("div",{className:"description",children:e("common:foodcourtManagerDashboard.adminManagement")})]})]})]}),(0,u.jsx)(N,{children:(0,u.jsx)("h3",{children:e("common:foodcourtManagerDashboard.tenantPerformance")})}),(0,u.jsx)(R,{children:(0,u.jsxs)($,{children:[(0,u.jsx)(z,{children:(0,u.jsxs)(I,{children:[(0,u.jsx)(O,{children:e("common:foodcourtManagerDashboard.tenant")}),(0,u.jsx)(O,{children:e("common:foodcourtManagerDashboard.admin")}),(0,u.jsx)(O,{children:e("common:foodcourtManagerDashboard.status")}),(0,u.jsx)(O,{children:e("common:foodcourtManagerDashboard.todaysOrders")}),(0,u.jsx)(O,{children:e("common:foodcourtManagerDashboard.todaysRevenue")}),(0,u.jsx)(O,{children:e("common:foodcourtManagerDashboard.monthlyRevenue")})]})}),(0,u.jsx)(_,{children:a.length>0?a.map(e=>(0,u.jsxs)(I,{onClick:()=>o(`/pos/manager/reports?tab=sales&restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`),children:[(0,u.jsx)(T,{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,u.jsx)(T,{children:e.adminName}),(0,u.jsx)(T,{children:(0,u.jsx)(q,{status:e.status,children:e.status})}),(0,u.jsx)(T,{children:e.todayOrders}),(0,u.jsx)(T,{children:(0,c.vv)(e.todayRevenue,U)}),(0,u.jsx)(T,{style:{fontWeight:600},children:(0,c.vv)(e.monthlyRevenue,U)})]},e.id)):(0,u.jsx)(I,{children:(0,u.jsx)(T,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:'No tenants registered yet. Click "Manage Tenants" to add your first tenant restaurant.'})})})]})})]})]})}}}]);