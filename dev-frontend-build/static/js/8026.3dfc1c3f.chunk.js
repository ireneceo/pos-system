"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8026],{4021:(e,t,n)=>{n.d(t,{i1:()=>a});var i=n(9950),r=n(1367),s=n(6038);const a=()=>{const{user:e}=(0,r.As)(),[t,n]=(0,i.useState)("RM"),[a]=(0,i.useState)(Object.keys(s.DL)),[o,d]=(0,i.useState)(!0),[c,l]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant");let r=i>=0?t[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),i=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";n(i)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),l("Failed to load currency settings"),n("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:o,error:c}}},8026:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_});var i=n(9950),r=n(4492),s=n(4752),a=n(8409),o=n(1367),d=n(4021),c=n(6038),l=n(4414);const x=s.Ay.div`
  min-height: 100vh;
`,h=s.Ay.div`
  position: sticky;
  top: 0;
  z-index: 100;
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
`,p=s.Ay.div`
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
`,y=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,v=s.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,A=s.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,b=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,F=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,w=s.Ay.div`
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
`,k=s.Ay.div`
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
`,S=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,E=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,C=s.Ay.thead`
  background: #F8FAFC;
`,B=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,N=s.Ay.tbody``,R=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  cursor: pointer;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,z=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,T=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"active":return"background: #D1FAE5; color: #065F46;";case"trial":return"background: #DBEAFE; color: #1E40AF;";case"expired":return"background: #FEE2E2; color: #991B1B;";case"suspended":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,_=()=>{const e=(0,r.Zp)(),{user:t}=(0,o.As)(),[n,s]=(0,i.useState)([]),[_,M]=(0,i.useState)(!0),[O,$]=(0,i.useState)(""),{defaultCurrency:D}=(0,d.i1)(),[I,G]=(0,i.useState)("RM");(0,i.useEffect)(()=>{D&&G(D)},[D]),(0,i.useEffect)(()=>{t&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},t=await fetch("/api/foodcourts",{headers:e});if(t.ok){const e=await t.json(),n=Array.isArray(e)?e:e.data||[];n.length>0&&$(n[0].name||"")}const n=await fetch("/api/restaurants",{headers:e});if(n.ok){const t=await n.json(),i=(new Date).toISOString().split("T")[0],r=await fetch("/api/orders",{headers:e}),a=r.ok?await r.json():[],o=a.data||a||[],d=t.map(e=>{const t=o.filter(t=>{var n,i;return(null===(n=t.restaurant_id)||void 0===n?void 0:n.toString())===(null===(i=e.id)||void 0===i?void 0:i.toString())}),n=t.filter(e=>{var t;return null===(t=e.order_date)||void 0===t?void 0:t.startsWith(i)}),r=n.reduce((e,t)=>e+parseFloat(t.total_amount||0),0),s=new Date;s.setDate(1);const a=s.toISOString().split("T")[0],d=t.filter(e=>e.order_date&&e.order_date>=a).reduce((e,t)=>e+parseFloat(t.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:n.length,todayRevenue:r,monthlyRevenue:d}});s(d)}}catch(e){console.error("Error fetching foodcourt manager data:",e)}finally{M(!1)}})()},[t]);const X=n.length,L=n.filter(e=>"active"===e.status).length,P=n.reduce((e,t)=>e+t.todayRevenue,0),W=n.reduce((e,t)=>e+t.todayOrders,0),Q=n.reduce((e,t)=>e+t.monthlyRevenue,0),U=X>0?Math.round(L/X*100):0;return _?(0,l.jsxs)(x,{children:[(0,l.jsx)(h,{children:(0,l.jsx)(u,{children:"Foodcourt Manager Dashboard"})}),(0,l.jsx)(p,{children:(0,l.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]}):(0,l.jsxs)(x,{children:[(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{children:"Foodcourt Manager Dashboard"}),O&&(0,l.jsx)(g,{children:(0,l.jsx)("span",{children:O})})]}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(a.Ot,{children:[(0,l.jsxs)(a.XS,{color:"#059669",children:[(0,l.jsx)(a.h2,{children:"Total Tenants"}),(0,l.jsx)(a.G$,{children:X})]}),(0,l.jsxs)(a.XS,{color:"#10B981",children:[(0,l.jsx)(a.h2,{children:"Active Tenants"}),(0,l.jsx)(a.G$,{children:L})]}),(0,l.jsxs)(a.XS,{color:"#F59E0B",children:[(0,l.jsx)(a.h2,{children:"Today's Revenue"}),(0,l.jsx)(a.G$,{children:(0,c.vv)(P,I)})]}),(0,l.jsxs)(a.XS,{color:"#2563EB",children:[(0,l.jsx)(a.h2,{children:"Today's Orders"}),(0,l.jsx)(a.G$,{children:W})]}),(0,l.jsxs)(a.XS,{color:"#7C3AED",children:[(0,l.jsx)(a.h2,{children:"Monthly Revenue"}),(0,l.jsx)(a.G$,{children:(0,c.vv)(Q,I)})]}),(0,l.jsxs)(a.XS,{color:"#EA580C",children:[(0,l.jsx)(a.h2,{children:"Occupancy Rate"}),(0,l.jsxs)(a.G$,{children:[U,"%"]})]})]}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(j,{children:[(0,l.jsx)("h3",{children:"Foodcourt Summary"}),(0,l.jsxs)(y,{children:[(0,l.jsx)(v,{children:"Monthly Revenue"}),(0,l.jsx)(A,{children:(0,c.vv)(Q,I)})]}),(0,l.jsxs)(y,{children:[(0,l.jsx)(v,{children:"Occupancy Rate"}),(0,l.jsxs)(A,{children:[U,"%"]})]}),(0,l.jsxs)(y,{children:[(0,l.jsx)(v,{children:"Active Tenants"}),(0,l.jsxs)(A,{children:[L," / ",X]})]}),(0,l.jsxs)(y,{children:[(0,l.jsx)(v,{children:"Today's Total Orders"}),(0,l.jsx)(A,{children:W})]})]}),(0,l.jsxs)(f,{children:[(0,l.jsx)("h3",{children:"Notifications"}),(0,l.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"13px",fontStyle:"italic"},children:"No new notifications"})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)("h3",{children:"Quick Actions"}),(0,l.jsxs)(F,{children:[(0,l.jsxs)(w,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25d0"}),(0,l.jsx)("div",{className:"title",children:"Restaurants"}),(0,l.jsx)("div",{className:"description",children:"Tenant management"})]}),(0,l.jsxs)(w,{onClick:()=>e("/pos/foodcourt/invoices"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25a6"}),(0,l.jsx)("div",{className:"title",children:"Invoices"}),(0,l.jsx)("div",{className:"description",children:"Invoice management"})]}),(0,l.jsxs)(w,{onClick:()=>e("/pos/foodcourt/general/stats"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25b2"}),(0,l.jsx)("div",{className:"title",children:"Statistics"}),(0,l.jsx)("div",{className:"description",children:"Performance analytics"})]}),(0,l.jsxs)(w,{onClick:()=>e("/pos/manager/staff"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25c6"}),(0,l.jsx)("div",{className:"title",children:"Admin & Staff"}),(0,l.jsx)("div",{className:"description",children:"Staff management"})]})]})]}),(0,l.jsx)(k,{children:(0,l.jsx)("h3",{children:"Tenant Performance"})}),(0,l.jsx)(S,{children:(0,l.jsxs)(E,{children:[(0,l.jsx)(C,{children:(0,l.jsxs)(R,{children:[(0,l.jsx)(B,{children:"Tenant"}),(0,l.jsx)(B,{children:"Admin"}),(0,l.jsx)(B,{children:"Status"}),(0,l.jsx)(B,{children:"Today's Orders"}),(0,l.jsx)(B,{children:"Today's Revenue"}),(0,l.jsx)(B,{children:"Monthly Revenue"})]})}),(0,l.jsx)(N,{children:n.length>0?n.map(t=>(0,l.jsxs)(R,{onClick:()=>e(`/pos/manager/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`),children:[(0,l.jsx)(z,{style:{fontWeight:600,color:"#0A2540"},children:t.name}),(0,l.jsx)(z,{children:t.adminName}),(0,l.jsx)(z,{children:(0,l.jsx)(T,{status:t.status,children:t.status})}),(0,l.jsx)(z,{children:t.todayOrders}),(0,l.jsx)(z,{children:(0,c.vv)(t.todayRevenue,I)}),(0,l.jsx)(z,{style:{fontWeight:600},children:(0,c.vv)(t.monthlyRevenue,I)})]},t.id)):(0,l.jsx)(R,{children:(0,l.jsx)(z,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:'No tenants registered yet. Click "Manage Tenants" to add your first tenant restaurant.'})})})]})})]})]})}}}]);