"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[758],{758:(e,r,s)=>{s.r(r),s.d(r,{default:()=>E});var t=s(9950),n=s(4492),a=s(4752),i=s(3310),d=s(2674),o=s(1367),l=s(4021),c=s(6038),h=s(4414);const x=a.Ay.div`
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
`,v=a.Ay.div`
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
`,f=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,y=a.Ay.span`
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
    border-color: #635BFF;
    background: #F4F3FF;
  }

  &:last-child {
    margin-bottom: 0;
  }
`,A=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,F=a.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,k=a.Ay.span`
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
`,R=a.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
`,B=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,C=a.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.15);
  }
`,z=a.Ay.div`
  font-size: 28px;
  margin-bottom: 8px;
  color: #635BFF;
`,T=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,_=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,E=()=>{const e=(0,n.Zp)(),{user:r}=(0,o.As)(),[s,a]=(0,t.useState)("overview"),[E,M]=(0,t.useState)([]),[O,$]=(0,t.useState)(!0),[D,N]=(0,t.useState)(""),{defaultCurrency:I}=(0,l.i1)(),[G,X]=(0,t.useState)("RM");(0,t.useEffect)(()=>{I&&X(I)},[I]),(0,t.useEffect)(()=>{r&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/brands",{headers:e});if(r.ok){const e=await r.json();e.length>0&&N(e[0].name||"")}const s=await fetch("/api/restaurants",{headers:e});if(s.ok){const r=await s.json(),t=(new Date).toISOString().split("T")[0],n=await fetch("/api/orders",{headers:e}),a=n.ok?await n.json():[],i=a.data||a||[],d=r.map(e=>{const r=i.filter(r=>{var s,t;return(null===(s=r.restaurant_id)||void 0===s?void 0:s.toString())===(null===(t=e.id)||void 0===t?void 0:t.toString())}),s=r.filter(e=>{var r;return null===(r=e.order_date)||void 0===r?void 0:r.startsWith(t)}),n=s.reduce((e,r)=>e+parseFloat(r.total_amount||0),0),a=new Date;a.setDate(1);const d=a.toISOString().split("T")[0],o=r.filter(e=>e.order_date&&e.order_date>=d).reduce((e,r)=>e+parseFloat(r.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:s.length,todayRevenue:n,monthlyRevenue:o}});M(d)}}catch(e){console.error("Error fetching brand manager data:",e)}finally{$(!1)}})()},[r]);const L=E.length,P=E.filter(e=>"active"===e.status).length,q=E.reduce((e,r)=>e+r.todayRevenue,0),U=E.reduce((e,r)=>e+r.todayOrders,0),V=E.reduce((e,r)=>e+r.monthlyRevenue,0),W=L>0?V/L:0;return O?(0,h.jsx)(i.A,{children:(0,h.jsxs)(x,{children:[(0,h.jsx)(p,{children:(0,h.jsx)(j,{children:"Brand Manager Dashboard"})}),(0,h.jsx)(u,{children:(0,h.jsx)(R,{children:"Loading dashboard data..."})})]})}):(0,h.jsx)(i.A,{children:(0,h.jsxs)(x,{children:[(0,h.jsx)(p,{children:(0,h.jsxs)("div",{children:[(0,h.jsx)(j,{children:"Brand Manager Dashboard"}),D&&(0,h.jsx)(g,{children:D})]})}),(0,h.jsxs)(u,{children:[(0,h.jsxs)(d.j,{children:[(0,h.jsx)(d.oz,{active:"overview"===s,onClick:()=>a("overview"),children:"Overview"}),(0,h.jsxs)(d.oz,{active:"restaurants"===s,onClick:()=>a("restaurants"),children:["Restaurants (",L,")"]})]}),"overview"===s&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(d.Ot,{children:[(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:L}),(0,h.jsx)(d.h2,{children:"Total Restaurants"})]}),(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:P}),(0,h.jsx)(d.h2,{children:"Active Restaurants"})]}),(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:(0,c.vv)(q,G)}),(0,h.jsx)(d.h2,{children:"Today's Revenue"})]}),(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:U}),(0,h.jsx)(d.h2,{children:"Today's Orders"})]})]}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(C,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,h.jsx)(z,{children:"\u2699"}),(0,h.jsx)(T,{children:"Manage Restaurants"}),(0,h.jsx)(_,{children:"Add, edit, view restaurants"})]}),(0,h.jsxs)(C,{onClick:()=>e("/pos/brand/reports"),children:[(0,h.jsx)(z,{children:"\u2630"}),(0,h.jsx)(T,{children:"Reports"}),(0,h.jsx)(_,{children:"Sales and performance reports"})]}),(0,h.jsxs)(C,{onClick:()=>e("/pos/brand/franchise-support"),children:[(0,h.jsx)(z,{children:"\u2709"}),(0,h.jsx)(T,{children:"Support Tickets"}),(0,h.jsx)(_,{children:"Franchise support requests"})]}),(0,h.jsxs)(C,{onClick:()=>e("/pos/subscriptions"),children:[(0,h.jsx)(z,{children:"\u2605"}),(0,h.jsx)(T,{children:"Subscriptions"}),(0,h.jsx)(_,{children:"Manage subscription plans"})]})]}),(0,h.jsxs)(m,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)("h3",{children:"Restaurant Performance"}),0===E.length?(0,h.jsx)(R,{children:"No restaurants registered yet. Add your first restaurant to see performance data."}):E.slice(0,5).map(r=>(0,h.jsxs)(w,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,h.jsxs)(A,{children:[(0,h.jsx)(F,{children:r.name}),(0,h.jsx)(k,{status:r.status,children:r.status})]}),(0,h.jsxs)(S,{children:[(0,h.jsxs)("span",{children:[r.cuisine," - ",r.adminName]}),(0,h.jsxs)("span",{children:["Today: ",(0,c.vv)(r.todayRevenue,G)," (",r.todayOrders," orders)"]})]})]},r.id))]}),(0,h.jsxs)(v,{children:[(0,h.jsx)("h3",{children:"Brand Summary"}),(0,h.jsxs)(f,{children:[(0,h.jsx)(y,{children:"Monthly Revenue"}),(0,h.jsx)(b,{children:(0,c.vv)(V,G)})]}),(0,h.jsxs)(f,{children:[(0,h.jsx)(y,{children:"Avg Revenue / Store"}),(0,h.jsx)(b,{children:(0,c.vv)(W,G)})]}),(0,h.jsxs)(f,{children:[(0,h.jsx)(y,{children:"Active Restaurants"}),(0,h.jsxs)(b,{children:[P," / ",L]})]}),(0,h.jsxs)(f,{children:[(0,h.jsx)(y,{children:"Today's Total Orders"}),(0,h.jsx)(b,{children:U})]})]})]})]}),"restaurants"===s&&(0,h.jsxs)(v,{children:[(0,h.jsx)("h3",{children:"All Restaurants"}),0===E.length?(0,h.jsx)(R,{children:'No restaurants found. Click "Manage Restaurants" to add your first restaurant.'}):E.map(r=>(0,h.jsxs)(w,{onClick:()=>e(`/pos/brand/reports?restaurantId=${r.id}&restaurantName=${encodeURIComponent(r.name)}`),children:[(0,h.jsxs)(A,{children:[(0,h.jsx)(F,{children:r.name}),(0,h.jsx)(k,{status:r.status,children:r.status})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)("span",{children:r.address}),(0,h.jsx)("span",{children:r.planType})]}),(0,h.jsxs)(S,{style:{marginTop:"4px"},children:[(0,h.jsxs)("span",{children:["Admin: ",r.adminName," - ",r.cuisine]}),(0,h.jsxs)("span",{children:["Monthly: ",(0,c.vv)(r.monthlyRevenue,G)]})]})]},r.id))]})]})]})})}},4021:(e,r,s)=>{s.d(r,{i1:()=>i});var t=s(9950),n=s(1367),a=s(6038);const i=()=>{const{user:e}=(0,n.As)(),[r,s]=(0,t.useState)("RM"),[i,d]=(0,t.useState)(Object.keys(a.DL)),[o,l]=(0,t.useState)(!0),[c,h]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),t=r.indexOf("restaurant");let n=t>=0?r[t+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return s("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var a;const e=await r.json(),t=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";s(t)}else s("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),s("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:i,loading:o,error:c}}}}]);