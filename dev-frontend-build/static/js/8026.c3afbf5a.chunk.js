"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8026],{4021:(e,t,n)=>{n.d(t,{i1:()=>a});var r=n(9950),s=n(1367),i=n(6038);const a=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("RM"),[a]=(0,r.useState)(Object.keys(i.DL)),[o,d]=(0,r.useState)(!0),[c,l]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let s=r>=0?t[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";n(r)}else n("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),l("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:o,error:c}}},8026:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var r=n(9950),s=n(4492),i=n(4752),a=n(8409),o=n(1367),d=n(4021),c=n(6038),l=n(4414);const h=i.Ay.div`
  min-height: 100vh;
`,p=i.Ay.div`
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
`,x=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,u=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,m=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,y=i.Ay.div`
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
`,f=i.Ay.div`
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
`,j=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,v=i.Ay.div`
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
`,b=i.Ay.div`
  flex: 1;
  min-width: 0;
`,A=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,F=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,w=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,k=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,E=i.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,C=i.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,B=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,S=i.Ay.div`
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
`,N=i.Ay.div`
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
`,R=i.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,T=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,$=i.Ay.thead`
  background: #F8FAFC;
`,z=i.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,D=i.Ay.tbody``,O=i.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  cursor: pointer;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,I=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,_=i.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"active":return"background: #D1FAE5; color: #065F46;";case"trial":return"background: #DBEAFE; color: #1E40AF;";case"expired":return"background: #FEE2E2; color: #991B1B;";case"suspended":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,M=()=>{const e=(0,s.Zp)(),{user:t}=(0,o.As)(),[n,i]=(0,r.useState)([]),[M,q]=(0,r.useState)(!0),[G,X]=(0,r.useState)(""),{defaultCurrency:P}=(0,d.i1)(),[L,W]=(0,r.useState)("RM"),[Y,U]=(0,r.useState)([]);(0,r.useEffect)(()=>{P&&W(P)},[P]),(0,r.useEffect)(()=>{t&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},t=await fetch("/api/foodcourts",{headers:e});if(t.ok){const e=await t.json(),n=Array.isArray(e)?e:e.data||[];n.length>0&&X(n[0].name||"")}const n=await fetch("/api/restaurants",{headers:e});if(n.ok){const t=await n.json(),r=(new Date).toISOString().split("T")[0],[s,a,o]=await Promise.all([fetch("/api/orders",{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/badge-counts",{headers:e})]),d=s.ok?await s.json():[],c=d.data||d||[],l=a.ok?await a.json():{data:[]},h=l.data||l||[],p=h.filter(e=>"overdue"===e.status).length,x=h.filter(e=>"pending_payment"===e.status||"sent"===e.status).length;let u={systemInquiry:0,operationInquiry:0,notices:0,invoices:0};if(o.ok){const e=await o.json();e.success&&(u=e.data)}const g=t.map(e=>{const t=c.filter(t=>{var n,r;return(null===(n=t.restaurant_id)||void 0===n?void 0:n.toString())===(null===(r=e.id)||void 0===r?void 0:r.toString())}),n=t.filter(e=>{var t;return null===(t=e.order_date)||void 0===t?void 0:t.startsWith(r)}),s=n.reduce((e,t)=>e+parseFloat(t.total_amount||0),0),i=new Date;i.setDate(1);const a=i.toISOString().split("T")[0],o=t.filter(e=>e.order_date&&e.order_date>=a).reduce((e,t)=>e+parseFloat(t.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:n.length,todayRevenue:s,monthlyRevenue:o}});i(g);const m=[];p>0&&m.push({type:"warning",title:"Overdue Invoices",message:`${p} invoice(s) need attention`,link:"/pos/foodcourt/invoices"}),x>0&&m.push({type:"info",title:"Pending Invoices",message:`${x} invoice(s) pending payment`,link:"/pos/foodcourt/invoices"});const y=g.filter(e=>0===e.todayOrders);y.length>0&&m.push({type:"info",title:"No Orders Today",message:`${y.length} tenant(s) with no orders today`,link:"/pos/manager/restaurants"}),u.notices>0&&m.push({type:"info",title:"Unread Notices",message:`${u.notices} unread notice(s)`,link:"/pos/foodcourt/notices"}),u.systemInquiry>0&&m.push({type:"info",title:"System Inquiry",message:`${u.systemInquiry} inquiry(s) with new replies`,link:"/pos/foodcourt/system-inquiry"}),0===m.length&&m.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),U(m)}}catch(e){console.error("Error fetching foodcourt manager data:",e)}finally{q(!1)}})()},[t]);const Q=n.length,V=n.filter(e=>"active"===e.status).length,Z=n.reduce((e,t)=>e+t.todayRevenue,0),H=n.reduce((e,t)=>e+t.todayOrders,0),J=n.reduce((e,t)=>e+t.monthlyRevenue,0),K=Q>0?Math.round(V/Q*100):0;return M?(0,l.jsxs)(h,{children:[(0,l.jsx)(p,{children:(0,l.jsx)(u,{children:"Foodcourt Manager Dashboard"})}),(0,l.jsx)(x,{children:(0,l.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]}):(0,l.jsxs)(h,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(u,{children:"Foodcourt Manager Dashboard"}),G&&(0,l.jsx)(g,{children:(0,l.jsx)("span",{children:G})})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(a.Ot,{children:[(0,l.jsxs)(a.XS,{color:"#059669",children:[(0,l.jsx)(a.h2,{children:"Total Tenants"}),(0,l.jsx)(a.G$,{children:Q})]}),(0,l.jsxs)(a.XS,{color:"#10B981",children:[(0,l.jsx)(a.h2,{children:"Active Tenants"}),(0,l.jsx)(a.G$,{children:V})]}),(0,l.jsxs)(a.XS,{color:"#F59E0B",children:[(0,l.jsx)(a.h2,{children:"Today's Revenue"}),(0,l.jsx)(a.G$,{children:(0,c.vv)(Z,L)})]}),(0,l.jsxs)(a.XS,{color:"#2563EB",children:[(0,l.jsx)(a.h2,{children:"Today's Orders"}),(0,l.jsx)(a.G$,{children:H})]}),(0,l.jsxs)(a.XS,{color:"#7C3AED",children:[(0,l.jsx)(a.h2,{children:"Monthly Revenue"}),(0,l.jsx)(a.G$,{children:(0,c.vv)(J,L)})]}),(0,l.jsxs)(a.XS,{color:"#EA580C",children:[(0,l.jsx)(a.h2,{children:"Occupancy Rate"}),(0,l.jsxs)(a.G$,{children:[K,"%"]})]})]}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(y,{children:[(0,l.jsx)("h3",{children:"Foodcourt Summary"}),(0,l.jsxs)(w,{children:[(0,l.jsx)(k,{children:"Monthly Revenue"}),(0,l.jsx)(E,{children:(0,c.vv)(J,L)})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(k,{children:"Occupancy Rate"}),(0,l.jsxs)(E,{children:[K,"%"]})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(k,{children:"Active Tenants"}),(0,l.jsxs)(E,{children:[V," / ",Q]})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(k,{children:"Today's Total Orders"}),(0,l.jsx)(E,{children:H})]})]}),(0,l.jsxs)(f,{children:[(0,l.jsx)("h3",{children:"Notifications"}),(0,l.jsx)(j,{children:Y.map((t,n)=>(0,l.jsx)(v,{type:t.type,onClick:()=>t.link&&e(t.link),children:(0,l.jsxs)(b,{children:[(0,l.jsx)(A,{type:t.type,children:t.title}),(0,l.jsx)(F,{children:t.message})]})},n))})]})]}),(0,l.jsxs)(C,{children:[(0,l.jsx)("h3",{children:"Quick Actions"}),(0,l.jsxs)(B,{children:[(0,l.jsxs)(S,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25d0"}),(0,l.jsx)("div",{className:"title",children:"Restaurants"}),(0,l.jsx)("div",{className:"description",children:"Tenant management"})]}),(0,l.jsxs)(S,{onClick:()=>e("/pos/foodcourt/invoices"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25a6"}),(0,l.jsx)("div",{className:"title",children:"Invoices"}),(0,l.jsx)("div",{className:"description",children:"Invoice management"})]}),(0,l.jsxs)(S,{onClick:()=>e("/pos/foodcourt/general/reports"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25b2"}),(0,l.jsx)("div",{className:"title",children:"Statistics"}),(0,l.jsx)("div",{className:"description",children:"Performance analytics"})]}),(0,l.jsxs)(S,{onClick:()=>e("/pos/manager/admins"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25c6"}),(0,l.jsx)("div",{className:"title",children:"Restaurant Admins"}),(0,l.jsx)("div",{className:"description",children:"Admin management"})]})]})]}),(0,l.jsx)(N,{children:(0,l.jsx)("h3",{children:"Tenant Performance"})}),(0,l.jsx)(R,{children:(0,l.jsxs)(T,{children:[(0,l.jsx)($,{children:(0,l.jsxs)(O,{children:[(0,l.jsx)(z,{children:"Tenant"}),(0,l.jsx)(z,{children:"Admin"}),(0,l.jsx)(z,{children:"Status"}),(0,l.jsx)(z,{children:"Today's Orders"}),(0,l.jsx)(z,{children:"Today's Revenue"}),(0,l.jsx)(z,{children:"Monthly Revenue"})]})}),(0,l.jsx)(D,{children:n.length>0?n.map(t=>(0,l.jsxs)(O,{onClick:()=>e(`/pos/manager/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`),children:[(0,l.jsx)(I,{style:{fontWeight:600,color:"#0A2540"},children:t.name}),(0,l.jsx)(I,{children:t.adminName}),(0,l.jsx)(I,{children:(0,l.jsx)(_,{status:t.status,children:t.status})}),(0,l.jsx)(I,{children:t.todayOrders}),(0,l.jsx)(I,{children:(0,c.vv)(t.todayRevenue,L)}),(0,l.jsx)(I,{style:{fontWeight:600},children:(0,c.vv)(t.monthlyRevenue,L)})]},t.id)):(0,l.jsx)(O,{children:(0,l.jsx)(I,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:'No tenants registered yet. Click "Manage Tenants" to add your first tenant restaurant.'})})})]})})]})]})}}}]);