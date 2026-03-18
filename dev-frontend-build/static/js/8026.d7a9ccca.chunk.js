"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8026],{4021:(e,n,t)=>{t.d(n,{i1:()=>a});var r=t(9950),i=t(1367),s=t(6038);const a=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,r.useState)("RM"),[a]=(0,r.useState)(Object.keys(s.DL)),[o,d]=(0,r.useState)(!0),[c,l]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let i=r>=0?n[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var s;const e=await n.json(),r=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";t(r)}else t("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),l("Failed to load currency settings"),t("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:a,loading:o,error:c}}},8026:(e,n,t)=>{t.r(n),t.d(n,{default:()=>_});var r=t(9950),i=t(4492),s=t(4752),a=t(8409),o=t(1367),d=t(4021),c=t(6038),l=t(4414);const h=s.Ay.div`
  min-height: 100vh;
`,x=s.Ay.div`
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
`,E=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,S=s.Ay.table`
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
`,R=s.Ay.tbody``,N=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  cursor: pointer;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,T=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,z=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"active":return"background: #D1FAE5; color: #065F46;";case"trial":return"background: #DBEAFE; color: #1E40AF;";case"expired":return"background: #FEE2E2; color: #991B1B;";case"suspended":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,_=()=>{const e=(0,i.Zp)(),{user:n}=(0,o.As)(),[t,s]=(0,r.useState)([]),[_,M]=(0,r.useState)(!0),[O,$]=(0,r.useState)(""),{defaultCurrency:D}=(0,d.i1)(),[I,G]=(0,r.useState)("RM");(0,r.useEffect)(()=>{D&&G(D)},[D]),(0,r.useEffect)(()=>{n&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch("/api/foodcourts",{headers:e});if(n.ok){const e=await n.json(),t=Array.isArray(e)?e:e.data||[];t.length>0&&$(t[0].name||"")}const t=await fetch("/api/restaurants",{headers:e});if(t.ok){const n=await t.json(),r=(new Date).toISOString().split("T")[0],i=await fetch("/api/orders",{headers:e}),a=i.ok?await i.json():[],o=a.data||a||[],d=n.map(e=>{const n=o.filter(n=>{var t,r;return(null===(t=n.restaurant_id)||void 0===t?void 0:t.toString())===(null===(r=e.id)||void 0===r?void 0:r.toString())}),t=n.filter(e=>{var n;return null===(n=e.order_date)||void 0===n?void 0:n.startsWith(r)}),i=t.reduce((e,n)=>e+parseFloat(n.total_amount||0),0),s=new Date;s.setDate(1);const a=s.toISOString().split("T")[0],d=n.filter(e=>e.order_date&&e.order_date>=a).reduce((e,n)=>e+parseFloat(n.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:t.length,todayRevenue:i,monthlyRevenue:d}});s(d)}}catch(e){console.error("Error fetching foodcourt manager data:",e)}finally{M(!1)}})()},[n]);const X=t.length,L=t.filter(e=>"active"===e.status).length,P=t.reduce((e,n)=>e+n.todayRevenue,0),W=t.reduce((e,n)=>e+n.todayOrders,0),Y=t.reduce((e,n)=>e+n.monthlyRevenue,0),Q=X>0?Math.round(L/X*100):0;return _?(0,l.jsxs)(h,{children:[(0,l.jsx)(x,{children:(0,l.jsx)(u,{children:"Foodcourt Manager Dashboard"})}),(0,l.jsx)(p,{children:(0,l.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]}):(0,l.jsxs)(h,{children:[(0,l.jsxs)(x,{children:[(0,l.jsx)(u,{children:"Foodcourt Manager Dashboard"}),O&&(0,l.jsx)(g,{children:(0,l.jsx)("span",{children:O})})]}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(a.Ot,{children:[(0,l.jsxs)(a.XS,{color:"#059669",children:[(0,l.jsx)(a.h2,{children:"Total Tenants"}),(0,l.jsx)(a.G$,{children:X})]}),(0,l.jsxs)(a.XS,{color:"#10B981",children:[(0,l.jsx)(a.h2,{children:"Active Tenants"}),(0,l.jsx)(a.G$,{children:L})]}),(0,l.jsxs)(a.XS,{color:"#F59E0B",children:[(0,l.jsx)(a.h2,{children:"Today's Revenue"}),(0,l.jsx)(a.G$,{children:(0,c.vv)(P,I)})]}),(0,l.jsxs)(a.XS,{color:"#2563EB",children:[(0,l.jsx)(a.h2,{children:"Today's Orders"}),(0,l.jsx)(a.G$,{children:W})]}),(0,l.jsxs)(a.XS,{color:"#7C3AED",children:[(0,l.jsx)(a.h2,{children:"Monthly Revenue"}),(0,l.jsx)(a.G$,{children:(0,c.vv)(Y,I)})]}),(0,l.jsxs)(a.XS,{color:"#EA580C",children:[(0,l.jsx)(a.h2,{children:"Occupancy Rate"}),(0,l.jsxs)(a.G$,{children:[Q,"%"]})]})]}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(j,{children:[(0,l.jsx)("h3",{children:"Foodcourt Summary"}),(0,l.jsxs)(y,{children:[(0,l.jsx)(v,{children:"Monthly Revenue"}),(0,l.jsx)(A,{children:(0,c.vv)(Y,I)})]}),(0,l.jsxs)(y,{children:[(0,l.jsx)(v,{children:"Occupancy Rate"}),(0,l.jsxs)(A,{children:[Q,"%"]})]}),(0,l.jsxs)(y,{children:[(0,l.jsx)(v,{children:"Active Tenants"}),(0,l.jsxs)(A,{children:[L," / ",X]})]}),(0,l.jsxs)(y,{children:[(0,l.jsx)(v,{children:"Today's Total Orders"}),(0,l.jsx)(A,{children:W})]})]}),(0,l.jsxs)(f,{children:[(0,l.jsx)("h3",{children:"Notifications"}),(0,l.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"13px",fontStyle:"italic"},children:"No new notifications"})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)("h3",{children:"Quick Actions"}),(0,l.jsxs)(F,{children:[(0,l.jsxs)(w,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25d0"}),(0,l.jsx)("div",{className:"title",children:"Restaurants"}),(0,l.jsx)("div",{className:"description",children:"Tenant management"})]}),(0,l.jsxs)(w,{onClick:()=>e("/pos/foodcourt/invoices"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25a6"}),(0,l.jsx)("div",{className:"title",children:"Invoices"}),(0,l.jsx)("div",{className:"description",children:"Invoice management"})]}),(0,l.jsxs)(w,{onClick:()=>e("/pos/foodcourt/general/stats"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25b2"}),(0,l.jsx)("div",{className:"title",children:"Statistics"}),(0,l.jsx)("div",{className:"description",children:"Performance analytics"})]}),(0,l.jsxs)(w,{onClick:()=>e("/pos/manager/admins"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25c6"}),(0,l.jsx)("div",{className:"title",children:"Restaurant Admins"}),(0,l.jsx)("div",{className:"description",children:"Admin management"})]})]})]}),(0,l.jsx)(k,{children:(0,l.jsx)("h3",{children:"Tenant Performance"})}),(0,l.jsx)(E,{children:(0,l.jsxs)(S,{children:[(0,l.jsx)(C,{children:(0,l.jsxs)(N,{children:[(0,l.jsx)(B,{children:"Tenant"}),(0,l.jsx)(B,{children:"Admin"}),(0,l.jsx)(B,{children:"Status"}),(0,l.jsx)(B,{children:"Today's Orders"}),(0,l.jsx)(B,{children:"Today's Revenue"}),(0,l.jsx)(B,{children:"Monthly Revenue"})]})}),(0,l.jsx)(R,{children:t.length>0?t.map(n=>(0,l.jsxs)(N,{onClick:()=>e(`/pos/manager/reports?tab=sales&restaurantId=${n.id}&restaurantName=${encodeURIComponent(n.name)}`),children:[(0,l.jsx)(T,{style:{fontWeight:600,color:"#0A2540"},children:n.name}),(0,l.jsx)(T,{children:n.adminName}),(0,l.jsx)(T,{children:(0,l.jsx)(z,{status:n.status,children:n.status})}),(0,l.jsx)(T,{children:n.todayOrders}),(0,l.jsx)(T,{children:(0,c.vv)(n.todayRevenue,I)}),(0,l.jsx)(T,{style:{fontWeight:600},children:(0,c.vv)(n.monthlyRevenue,I)})]},n.id)):(0,l.jsx)(N,{children:(0,l.jsx)(T,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:'No tenants registered yet. Click "Manage Tenants" to add your first tenant restaurant.'})})})]})})]})]})}}}]);