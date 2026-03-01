"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[758],{758:(e,r,t)=>{t.r(r),t.d(r,{default:()=>_});var s=t(9950),n=t(4492),a=t(4752),i=t(7960),d=t(1367),o=t(4021),l=t(6038),c=t(4414);const h=a.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
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
`,p=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,u=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,j=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 4px 0 0;
`,g=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,m=a.Ay.div`
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
`,v=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,f=a.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,y=a.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,b=a.Ay.div`
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
`,w=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,A=a.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,F=a.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#2563EB";case"expired":return"#DC2626";case"suspended":return"#D97706";default:return"#6B7280"}}};
`,k=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,S=a.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
`,R=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,B=a.Ay.div`
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
`,C=a.Ay.div`
  font-size: 28px;
  margin-bottom: 8px;
  color: #635BFF;
`,z=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,T=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,_=()=>{const e=(0,n.Zp)(),{user:r}=(0,d.As)(),[t,a]=(0,s.useState)("overview"),[_,E]=(0,s.useState)([]),[M,O]=(0,s.useState)(!0),[$,D]=(0,s.useState)(""),{defaultCurrency:N}=(0,o.i1)(),[I,G]=(0,s.useState)("RM");(0,s.useEffect)(()=>{N&&G(N)},[N]),(0,s.useEffect)(()=>{r&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/brands",{headers:e});if(r.ok){const e=await r.json();e.length>0&&D(e[0].name||"")}const t=await fetch("/api/restaurants",{headers:e});if(t.ok){const r=await t.json(),s=(new Date).toISOString().split("T")[0],n=await fetch("/api/orders",{headers:e}),a=n.ok?await n.json():[],i=a.data||a||[],d=r.map(e=>{const r=i.filter(r=>{var t,s;return(null===(t=r.restaurant_id)||void 0===t?void 0:t.toString())===(null===(s=e.id)||void 0===s?void 0:s.toString())}),t=r.filter(e=>{var r;return null===(r=e.order_date)||void 0===r?void 0:r.startsWith(s)}),n=t.reduce((e,r)=>e+parseFloat(r.total_amount||0),0),a=new Date;a.setDate(1);const d=a.toISOString().split("T")[0],o=r.filter(e=>e.order_date&&e.order_date>=d).reduce((e,r)=>e+parseFloat(r.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:t.length,todayRevenue:n,monthlyRevenue:o}});E(d)}}catch(e){console.error("Error fetching brand manager data:",e)}finally{O(!1)}})()},[r]);const X=_.length,L=_.filter(e=>"active"===e.status).length,P=_.reduce((e,r)=>e+r.todayRevenue,0),q=_.reduce((e,r)=>e+r.todayOrders,0),U=_.reduce((e,r)=>e+r.monthlyRevenue,0),V=X>0?U/X:0;return M?(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(h,{children:[(0,c.jsx)(x,{children:(0,c.jsx)(u,{children:"Brand Manager Dashboard"})}),(0,c.jsx)(p,{children:(0,c.jsx)(S,{children:"Loading dashboard data..."})})]})}):(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(h,{children:[(0,c.jsx)(x,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)(u,{children:"Brand Manager Dashboard"}),$&&(0,c.jsx)(j,{children:$})]})}),(0,c.jsxs)(p,{children:[(0,c.jsxs)(i.j,{children:[(0,c.jsx)(i.oz,{active:"overview"===t,onClick:()=>a("overview"),children:"Overview"}),(0,c.jsxs)(i.oz,{active:"restaurants"===t,onClick:()=>a("restaurants"),children:["Restaurants (",X,")"]})]}),"overview"===t&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(i.Ot,{children:[(0,c.jsxs)(i.XS,{children:[(0,c.jsx)(i.G$,{children:X}),(0,c.jsx)(i.h2,{children:"Total Restaurants"})]}),(0,c.jsxs)(i.XS,{children:[(0,c.jsx)(i.G$,{children:L}),(0,c.jsx)(i.h2,{children:"Active Restaurants"})]}),(0,c.jsxs)(i.XS,{children:[(0,c.jsx)(i.G$,{children:(0,l.vv)(P,I)}),(0,c.jsx)(i.h2,{children:"Today's Revenue"})]}),(0,c.jsxs)(i.XS,{children:[(0,c.jsx)(i.G$,{children:q}),(0,c.jsx)(i.h2,{children:"Today's Orders"})]})]}),(0,c.jsxs)(R,{children:[(0,c.jsxs)(B,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,c.jsx)(C,{children:"\u2699"}),(0,c.jsx)(z,{children:"Manage Restaurants"}),(0,c.jsx)(T,{children:"Add, edit, view restaurants"})]}),(0,c.jsxs)(B,{onClick:()=>e("/pos/brand/reports"),children:[(0,c.jsx)(C,{children:"\u2630"}),(0,c.jsx)(z,{children:"Reports"}),(0,c.jsx)(T,{children:"Sales and performance reports"})]}),(0,c.jsxs)(B,{onClick:()=>e("/pos/brand/franchise-support"),children:[(0,c.jsx)(C,{children:"\u2709"}),(0,c.jsx)(z,{children:"Support Tickets"}),(0,c.jsx)(T,{children:"Franchise support requests"})]}),(0,c.jsxs)(B,{onClick:()=>e("/pos/manager/subscriptions"),children:[(0,c.jsx)(C,{children:"\u2605"}),(0,c.jsx)(z,{children:"Subscriptions"}),(0,c.jsx)(T,{children:"Manage subscription plans"})]})]}),(0,c.jsxs)(g,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)("h3",{children:"Restaurant Performance"}),0===_.length?(0,c.jsx)(S,{children:"No restaurants registered yet. Add your first restaurant to see performance data."}):_.slice(0,5).map(r=>(0,c.jsxs)(b,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:r.name}),(0,c.jsx)(F,{status:r.status,children:r.status})]}),(0,c.jsxs)(k,{children:[(0,c.jsxs)("span",{children:[r.cuisine," - ",r.adminName]}),(0,c.jsxs)("span",{children:["Today: ",(0,l.vv)(r.todayRevenue,I)," (",r.todayOrders," orders)"]})]})]},r.id))]}),(0,c.jsxs)(m,{children:[(0,c.jsx)("h3",{children:"Brand Summary"}),(0,c.jsxs)(v,{children:[(0,c.jsx)(f,{children:"Monthly Revenue"}),(0,c.jsx)(y,{children:(0,l.vv)(U,I)})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(f,{children:"Avg Revenue / Store"}),(0,c.jsx)(y,{children:(0,l.vv)(V,I)})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(f,{children:"Active Restaurants"}),(0,c.jsxs)(y,{children:[L," / ",X]})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(f,{children:"Today's Total Orders"}),(0,c.jsx)(y,{children:q})]})]})]})]}),"restaurants"===t&&(0,c.jsxs)(m,{children:[(0,c.jsx)("h3",{children:"All Restaurants"}),0===_.length?(0,c.jsx)(S,{children:'No restaurants found. Click "Manage Restaurants" to add your first restaurant.'}):_.map(r=>(0,c.jsxs)(b,{onClick:()=>e(`/pos/brand/reports?restaurantId=${r.id}&restaurantName=${encodeURIComponent(r.name)}`),children:[(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:r.name}),(0,c.jsx)(F,{status:r.status,children:r.status})]}),(0,c.jsxs)(k,{children:[(0,c.jsx)("span",{children:r.address}),(0,c.jsx)("span",{children:r.planType})]}),(0,c.jsxs)(k,{style:{marginTop:"4px"},children:[(0,c.jsxs)("span",{children:["Admin: ",r.adminName," - ",r.cuisine]}),(0,c.jsxs)("span",{children:["Monthly: ",(0,l.vv)(r.monthlyRevenue,I)]})]})]},r.id))]})]})]})})}},4021:(e,r,t)=>{t.d(r,{i1:()=>i});var s=t(9950),n=t(1367),a=t(6038);const i=()=>{const{user:e}=(0,n.As)(),[r,t]=(0,s.useState)("RM"),[i,d]=(0,s.useState)(Object.keys(a.DL)),[o,l]=(0,s.useState)(!0),[c,h]=(0,s.useState)(null);return(0,s.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),s=r.indexOf("restaurant");let n=s>=0?r[s+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var a;const e=await r.json(),s=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(s)}else t("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:i,loading:o,error:c}}}}]);