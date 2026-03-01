"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8026],{4021:(e,t,n)=>{n.d(t,{i1:()=>i});var r=n(9950),s=n(1367),a=n(6038);const i=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("RM"),[i,o]=(0,r.useState)(Object.keys(a.DL)),[d,c]=(0,r.useState)(!0),[l,h]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let s=r>=0?t[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return n("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";n(r)}else n("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),n("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:d,error:l}}},8026:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_});var r=n(8819),s=n(9950),a=n(4492),i=n(4752),o=n(2674),d=n(1367),c=n(4021),l=n(6038),h=n(4414);const x=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${r.w.colors.border};
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
`,u=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${r.w.colors.secondary};
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=i.Ay.p`
  font-size: 14px;
  color: ${r.w.colors.text.muted};
  margin: 4px 0 0;
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,f=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: ${r.w.colors.secondary};
    font-size: 18px;
    font-weight: 600;
  }
`,y=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${r.w.colors.surfaceMuted};

  &:last-child {
    border-bottom: none;
  }
`,v=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,b=i.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: ${r.w.colors.secondary};
`,w=i.Ay.div`
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
`,A=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,k=i.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,S=i.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#2563EB";case"expired":return"#DC2626";case"suspended":return"#D97706";default:return"#6B7280"}}};
`,F=i.Ay.div`
  font-size: 13px;
  color: ${r.w.colors.text.muted};
  display: flex;
  justify-content: space-between;
`,T=i.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: ${r.w.colors.text.muted};
  font-size: 14px;
  border: 2px dashed ${r.w.colors.border};
  border-radius: 8px;
`,C=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,$=i.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: ${r.w.colors.status.successAlt};
    background: #ECFDF5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15);
  }
`,R=i.Ay.div`
  font-size: 28px;
  margin-bottom: 8px;
  color: #059669;
`,z=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,M=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,_=()=>{const e=(0,a.Zp)(),{user:t}=(0,d.As)(),[n,r]=(0,s.useState)("overview"),[i,_]=(0,s.useState)([]),[O,E]=(0,s.useState)(!0),[B,D]=(0,s.useState)(""),{defaultCurrency:N}=(0,c.i1)(),[I,G]=(0,s.useState)("RM");(0,s.useEffect)(()=>{N&&G(N)},[N]),(0,s.useEffect)(()=>{t&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},t=await fetch("/api/foodcourts",{headers:e});if(t.ok){const e=await t.json(),n=Array.isArray(e)?e:e.data||[];n.length>0&&D(n[0].name||"")}const n=await fetch("/api/restaurants",{headers:e});if(n.ok){const t=await n.json(),r=(new Date).toISOString().split("T")[0],s=await fetch("/api/orders",{headers:e}),a=s.ok?await s.json():[],i=a.data||a||[],o=t.map(e=>{const t=i.filter(t=>{var n,r;return(null===(n=t.restaurant_id)||void 0===n?void 0:n.toString())===(null===(r=e.id)||void 0===r?void 0:r.toString())}),n=t.filter(e=>{var t;return null===(t=e.order_date)||void 0===t?void 0:t.startsWith(r)}),s=n.reduce((e,t)=>e+parseFloat(t.total_amount||0),0),a=new Date;a.setDate(1);const o=a.toISOString().split("T")[0],d=t.filter(e=>e.order_date&&e.order_date>=o).reduce((e,t)=>e+parseFloat(t.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:n.length,todayRevenue:s,monthlyRevenue:d}});_(o)}}catch(e){console.error("Error fetching foodcourt manager data:",e)}finally{E(!1)}})()},[t]);const X=i.length,L=i.filter(e=>"active"===e.status).length,P=i.reduce((e,t)=>e+t.todayRevenue,0),q=i.reduce((e,t)=>e+t.todayOrders,0),U=i.reduce((e,t)=>e+t.monthlyRevenue,0),V=X>0?Math.round(L/X*100):0;return O?(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(x,{children:[(0,h.jsx)(p,{children:(0,h.jsx)(m,{children:"Foodcourt Manager Dashboard"})}),(0,h.jsx)(u,{children:(0,h.jsx)(T,{children:"Loading dashboard data..."})})]})}):(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(x,{children:[(0,h.jsx)(p,{children:(0,h.jsxs)("div",{children:[(0,h.jsx)(m,{children:"Foodcourt Manager Dashboard"}),B&&(0,h.jsx)(g,{children:B})]})}),(0,h.jsxs)(u,{children:[(0,h.jsxs)(o.j,{children:[(0,h.jsx)(o.oz,{active:"overview"===n,onClick:()=>r("overview"),children:"Overview"}),(0,h.jsxs)(o.oz,{active:"tenants"===n,onClick:()=>r("tenants"),children:["Tenants (",X,")"]})]}),"overview"===n&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(o.Ot,{children:[(0,h.jsxs)(o.XS,{children:[(0,h.jsx)(o.G$,{children:X}),(0,h.jsx)(o.h2,{children:"Total Tenants"})]}),(0,h.jsxs)(o.XS,{children:[(0,h.jsx)(o.G$,{children:L}),(0,h.jsx)(o.h2,{children:"Active Tenants"})]}),(0,h.jsxs)(o.XS,{children:[(0,h.jsx)(o.G$,{children:(0,l.vv)(P,I)}),(0,h.jsx)(o.h2,{children:"Today's Revenue"})]}),(0,h.jsxs)(o.XS,{children:[(0,h.jsxs)(o.G$,{children:[V,"%"]}),(0,h.jsx)(o.h2,{children:"Occupancy Rate"})]})]}),(0,h.jsxs)(C,{children:[(0,h.jsxs)($,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,h.jsx)(R,{children:"\u2699"}),(0,h.jsx)(z,{children:"Manage Tenants"}),(0,h.jsx)(M,{children:"Add, edit, view tenant restaurants"})]}),(0,h.jsxs)($,{onClick:()=>e("/pos/foodcourt/rent-management"),children:[(0,h.jsx)(R,{children:"\u2630"}),(0,h.jsx)(z,{children:"Rent Management"}),(0,h.jsx)(M,{children:"Rental billing and tracking"})]}),(0,h.jsxs)($,{onClick:()=>e("/pos/foodcourt/tenant-support"),children:[(0,h.jsx)(R,{children:"\u2709"}),(0,h.jsx)(z,{children:"Support Tickets"}),(0,h.jsx)(M,{children:"Tenant support requests"})]}),(0,h.jsxs)($,{onClick:()=>e("/pos/manager/subscriptions"),children:[(0,h.jsx)(R,{children:"\u2605"}),(0,h.jsx)(z,{children:"Subscriptions"}),(0,h.jsx)(M,{children:"Manage subscription plans"})]})]}),(0,h.jsxs)(j,{children:[(0,h.jsxs)(f,{children:[(0,h.jsx)("h3",{children:"Tenant Performance"}),0===i.length?(0,h.jsx)(T,{children:"No tenants registered yet. Add your first tenant restaurant to see performance data."}):i.slice(0,5).map(t=>(0,h.jsxs)(w,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,h.jsxs)(A,{children:[(0,h.jsx)(k,{children:t.name}),(0,h.jsx)(S,{status:t.status,children:t.status})]}),(0,h.jsxs)(F,{children:[(0,h.jsxs)("span",{children:[t.cuisine," - ",t.adminName]}),(0,h.jsxs)("span",{children:["Today: ",(0,l.vv)(t.todayRevenue,I)," (",t.todayOrders," orders)"]})]})]},t.id))]}),(0,h.jsxs)(f,{children:[(0,h.jsx)("h3",{children:"Foodcourt Summary"}),(0,h.jsxs)(y,{children:[(0,h.jsx)(v,{children:"Monthly Revenue"}),(0,h.jsx)(b,{children:(0,l.vv)(U,I)})]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(v,{children:"Occupancy Rate"}),(0,h.jsxs)(b,{children:[V,"%"]})]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(v,{children:"Active Tenants"}),(0,h.jsxs)(b,{children:[L," / ",X]})]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(v,{children:"Today's Total Orders"}),(0,h.jsx)(b,{children:q})]})]})]})]}),"tenants"===n&&(0,h.jsxs)(f,{children:[(0,h.jsx)("h3",{children:"All Tenants"}),0===i.length?(0,h.jsx)(T,{children:'No tenants found. Click "Manage Tenants" to add your first tenant restaurant.'}):i.map(t=>(0,h.jsxs)(w,{onClick:()=>e(`/pos/manager/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`),children:[(0,h.jsxs)(A,{children:[(0,h.jsx)(k,{children:t.name}),(0,h.jsx)(S,{status:t.status,children:t.status})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)("span",{children:t.address}),(0,h.jsx)("span",{children:t.planType})]}),(0,h.jsxs)(F,{style:{marginTop:"4px"},children:[(0,h.jsxs)("span",{children:["Admin: ",t.adminName," - ",t.cuisine]}),(0,h.jsxs)("span",{children:["Monthly: ",(0,l.vv)(t.monthlyRevenue,I)]})]})]},t.id))]})]})]})})}}}]);