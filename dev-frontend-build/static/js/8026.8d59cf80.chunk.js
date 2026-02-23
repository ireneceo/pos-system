"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8026],{4021:(e,n,t)=>{t.d(n,{i1:()=>i});var r=t(9950),s=t(1367),a=t(6038);const i=()=>{const{user:e}=(0,s.As)(),[n,t]=(0,r.useState)("RM"),[i,d]=(0,r.useState)(Object.keys(a.DL)),[o,c]=(0,r.useState)(!0),[l,h]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let s=r>=0?n[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return t("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(r)}else t("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),t("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:i,loading:o,error:l}}},8026:(e,n,t)=>{t.r(n),t.d(n,{default:()=>M});var r=t(9950),s=t(4492),a=t(4752),i=t(3310),d=t(2674),o=t(1367),c=t(4021),l=t(6038),h=t(4414);const x=a.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=a.Ay.div`
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
`,u=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 4px 0 0;
`,m=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,f=a.Ay.div`
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
`,y=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,v=a.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,b=a.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,w=a.Ay.div`
  padding: 16px;
  border: 1px solid #F3F4F6;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #059669;
    background: #ECFDF5;
  }

  &:last-child {
    margin-bottom: 0;
  }
`,A=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,k=a.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,F=a.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#2563EB";case"expired":return"#DC2626";case"suspended":return"#D97706";default:return"#6B7280"}}};
`,S=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,T=a.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
`,C=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,R=a.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: #059669;
    background: #ECFDF5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15);
  }
`,z=a.Ay.div`
  font-size: 28px;
  margin-bottom: 8px;
  color: #059669;
`,B=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,M=()=>{const e=(0,s.Zp)(),{user:n}=(0,o.As)(),[t,a]=(0,r.useState)("overview"),[M,_]=(0,r.useState)([]),[O,D]=(0,r.useState)(!0),[$,N]=(0,r.useState)(""),{defaultCurrency:I}=(0,c.i1)(),[G,X]=(0,r.useState)("RM");(0,r.useEffect)(()=>{I&&X(I)},[I]),(0,r.useEffect)(()=>{n&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch("/api/foodcourts",{headers:e});if(n.ok){const e=await n.json(),t=Array.isArray(e)?e:e.data||[];t.length>0&&N(t[0].name||"")}const t=await fetch("/api/restaurants",{headers:e});if(t.ok){const n=await t.json(),r=(new Date).toISOString().split("T")[0],s=await fetch("/api/orders",{headers:e}),a=s.ok?await s.json():[],i=a.data||a||[],d=n.map(e=>{const n=i.filter(n=>{var t,r;return(null===(t=n.restaurant_id)||void 0===t?void 0:t.toString())===(null===(r=e.id)||void 0===r?void 0:r.toString())}),t=n.filter(e=>{var n;return null===(n=e.order_date)||void 0===n?void 0:n.startsWith(r)}),s=t.reduce((e,n)=>e+parseFloat(n.total_amount||0),0),a=new Date;a.setDate(1);const d=a.toISOString().split("T")[0],o=n.filter(e=>e.order_date&&e.order_date>=d).reduce((e,n)=>e+parseFloat(n.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:t.length,todayRevenue:s,monthlyRevenue:o}});_(d)}}catch(e){console.error("Error fetching foodcourt manager data:",e)}finally{D(!1)}})()},[n]);const L=M.length,P=M.filter(e=>"active"===e.status).length,q=M.reduce((e,n)=>e+n.todayRevenue,0),U=M.reduce((e,n)=>e+n.todayOrders,0),V=M.reduce((e,n)=>e+n.monthlyRevenue,0),W=L>0?Math.round(P/L*100):0;return O?(0,h.jsx)(i.A,{children:(0,h.jsxs)(x,{children:[(0,h.jsx)(p,{children:(0,h.jsx)(j,{children:"Foodcourt Manager Dashboard"})}),(0,h.jsx)(u,{children:(0,h.jsx)(T,{children:"Loading dashboard data..."})})]})}):(0,h.jsx)(i.A,{children:(0,h.jsxs)(x,{children:[(0,h.jsx)(p,{children:(0,h.jsxs)("div",{children:[(0,h.jsx)(j,{children:"Foodcourt Manager Dashboard"}),$&&(0,h.jsx)(g,{children:$})]})}),(0,h.jsxs)(u,{children:[(0,h.jsxs)(d.j,{children:[(0,h.jsx)(d.oz,{active:"overview"===t,onClick:()=>a("overview"),children:"Overview"}),(0,h.jsxs)(d.oz,{active:"tenants"===t,onClick:()=>a("tenants"),children:["Tenants (",L,")"]})]}),"overview"===t&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(d.Ot,{children:[(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:L}),(0,h.jsx)(d.h2,{children:"Total Tenants"})]}),(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:P}),(0,h.jsx)(d.h2,{children:"Active Tenants"})]}),(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:(0,l.vv)(q,G)}),(0,h.jsx)(d.h2,{children:"Today's Revenue"})]}),(0,h.jsxs)(d.XS,{children:[(0,h.jsxs)(d.G$,{children:[W,"%"]}),(0,h.jsx)(d.h2,{children:"Occupancy Rate"})]})]}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(R,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,h.jsx)(z,{children:"\u2699"}),(0,h.jsx)(B,{children:"Manage Tenants"}),(0,h.jsx)(E,{children:"Add, edit, view tenant restaurants"})]}),(0,h.jsxs)(R,{onClick:()=>e("/pos/foodcourt/rent-management"),children:[(0,h.jsx)(z,{children:"\u2630"}),(0,h.jsx)(B,{children:"Rent Management"}),(0,h.jsx)(E,{children:"Rental billing and tracking"})]}),(0,h.jsxs)(R,{onClick:()=>e("/pos/foodcourt/tenant-support"),children:[(0,h.jsx)(z,{children:"\u2709"}),(0,h.jsx)(B,{children:"Support Tickets"}),(0,h.jsx)(E,{children:"Tenant support requests"})]}),(0,h.jsxs)(R,{onClick:()=>e("/pos/subscriptions"),children:[(0,h.jsx)(z,{children:"\u2605"}),(0,h.jsx)(B,{children:"Subscriptions"}),(0,h.jsx)(E,{children:"Manage subscription plans"})]})]}),(0,h.jsxs)(m,{children:[(0,h.jsxs)(f,{children:[(0,h.jsx)("h3",{children:"Tenant Performance"}),0===M.length?(0,h.jsx)(T,{children:"No tenants registered yet. Add your first tenant restaurant to see performance data."}):M.slice(0,5).map(n=>(0,h.jsxs)(w,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,h.jsxs)(A,{children:[(0,h.jsx)(k,{children:n.name}),(0,h.jsx)(F,{status:n.status,children:n.status})]}),(0,h.jsxs)(S,{children:[(0,h.jsxs)("span",{children:[n.cuisine," - ",n.adminName]}),(0,h.jsxs)("span",{children:["Today: ",(0,l.vv)(n.todayRevenue,G)," (",n.todayOrders," orders)"]})]})]},n.id))]}),(0,h.jsxs)(f,{children:[(0,h.jsx)("h3",{children:"Foodcourt Summary"}),(0,h.jsxs)(y,{children:[(0,h.jsx)(v,{children:"Monthly Revenue"}),(0,h.jsx)(b,{children:(0,l.vv)(V,G)})]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(v,{children:"Occupancy Rate"}),(0,h.jsxs)(b,{children:[W,"%"]})]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(v,{children:"Active Tenants"}),(0,h.jsxs)(b,{children:[P," / ",L]})]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(v,{children:"Today's Total Orders"}),(0,h.jsx)(b,{children:U})]})]})]})]}),"tenants"===t&&(0,h.jsxs)(f,{children:[(0,h.jsx)("h3",{children:"All Tenants"}),0===M.length?(0,h.jsx)(T,{children:'No tenants found. Click "Manage Tenants" to add your first tenant restaurant.'}):M.map(n=>(0,h.jsxs)(w,{onClick:()=>e(`/pos/manager/reports?tab=sales&restaurantId=${n.id}&restaurantName=${encodeURIComponent(n.name)}`),children:[(0,h.jsxs)(A,{children:[(0,h.jsx)(k,{children:n.name}),(0,h.jsx)(F,{status:n.status,children:n.status})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)("span",{children:n.address}),(0,h.jsx)("span",{children:n.planType})]}),(0,h.jsxs)(S,{style:{marginTop:"4px"},children:[(0,h.jsxs)("span",{children:["Admin: ",n.adminName," - ",n.cuisine]}),(0,h.jsxs)("span",{children:["Monthly: ",(0,l.vv)(n.monthlyRevenue,G)]})]})]},n.id))]})]})]})})}}}]);