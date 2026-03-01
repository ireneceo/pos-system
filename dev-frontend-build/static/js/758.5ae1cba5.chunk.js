"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[758],{758:(e,r,t)=>{t.r(r),t.d(r,{default:()=>$});var n=t(9950),s=t(4492),a=t(4752),i=t(6649),o=t(2597),d=t(2653),l=t(1367),c=t(4021),h=t(6038),x=t(4414);const p=a.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,u=a.Ay.div`
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
`,g=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=a.Ay.h1`
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
`,v=a.Ay.div`
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
`,b=a.Ay.div`
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
`,w=a.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,F=a.Ay.div`
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
`,k=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,A=a.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,B=a.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#2563EB";case"expired":return"#DC2626";case"suspended":return"#D97706";default:return"#6B7280"}}};
`,C=a.Ay.div`
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
`,E=a.Ay.div`
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
`,M=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,T=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,$=()=>{const e=(0,s.Zp)(),{user:r}=(0,l.As)(),[t,a]=(0,d.M)("overview"),[$,_]=(0,n.useState)([]),[N,O]=(0,n.useState)(!0),[D,I]=(0,n.useState)(""),{defaultCurrency:G}=(0,c.i1)(),[X,U]=(0,n.useState)("RM");(0,n.useEffect)(()=>{G&&U(G)},[G]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/brands",{headers:e});if(r.ok){const e=await r.json();e.length>0&&I(e[0].name||"")}const t=await fetch("/api/restaurants",{headers:e});if(t.ok){const r=await t.json(),n=(new Date).toISOString().split("T")[0],s=await fetch("/api/orders",{headers:e}),a=s.ok?await s.json():[],i=a.data||a||[],o=r.map(e=>{const r=i.filter(r=>{var t,n;return(null===(t=r.restaurant_id)||void 0===t?void 0:t.toString())===(null===(n=e.id)||void 0===n?void 0:n.toString())}),t=r.filter(e=>{var r;return null===(r=e.order_date)||void 0===r?void 0:r.startsWith(n)}),s=t.reduce((e,r)=>e+parseFloat(r.total_amount||0),0),a=new Date;a.setDate(1);const o=a.toISOString().split("T")[0],d=r.filter(e=>e.order_date&&e.order_date>=o).reduce((e,r)=>e+parseFloat(r.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:t.length,todayRevenue:s,monthlyRevenue:d}});_(o)}}catch(e){console.error("Error fetching brand manager data:",e)}finally{O(!1)}})()},[r]);const Z=$.length,L=$.filter(e=>"active"===e.status).length,P=$.reduce((e,r)=>e+r.todayRevenue,0),q=$.reduce((e,r)=>e+r.todayOrders,0),V=$.reduce((e,r)=>e+r.monthlyRevenue,0),W=Z>0?V/Z:0;return N?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(p,{children:[(0,x.jsx)(u,{children:(0,x.jsx)(m,{children:"Brand Manager Dashboard"})}),(0,x.jsx)(g,{children:(0,x.jsx)(S,{children:"Loading dashboard data..."})})]})}):(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(p,{children:[(0,x.jsx)(u,{children:(0,x.jsxs)("div",{children:[(0,x.jsx)(m,{children:"Brand Manager Dashboard"}),D&&(0,x.jsx)(j,{children:D})]})}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(o.tU,{children:[(0,x.jsx)(o.oz,{active:"overview"===t,onClick:()=>a("overview"),children:"Overview"}),(0,x.jsxs)(o.oz,{active:"restaurants"===t,onClick:()=>a("restaurants"),children:["Restaurants ",(0,x.jsx)(o.Ex,{count:Z,showZero:!0})]})]}),"overview"===t&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(i.Ot,{children:[(0,x.jsxs)(i.XS,{children:[(0,x.jsx)(i.G$,{children:Z}),(0,x.jsx)(i.h2,{children:"Total Restaurants"})]}),(0,x.jsxs)(i.XS,{children:[(0,x.jsx)(i.G$,{children:L}),(0,x.jsx)(i.h2,{children:"Active Restaurants"})]}),(0,x.jsxs)(i.XS,{children:[(0,x.jsx)(i.G$,{children:(0,h.vv)(P,X)}),(0,x.jsx)(i.h2,{children:"Today's Revenue"})]}),(0,x.jsxs)(i.XS,{children:[(0,x.jsx)(i.G$,{children:q}),(0,x.jsx)(i.h2,{children:"Today's Orders"})]})]}),(0,x.jsxs)(R,{children:[(0,x.jsxs)(E,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,x.jsx)(z,{children:"\u2699"}),(0,x.jsx)(M,{children:"Manage Restaurants"}),(0,x.jsx)(T,{children:"Add, edit, view restaurants"})]}),(0,x.jsxs)(E,{onClick:()=>e("/pos/brand/reports"),children:[(0,x.jsx)(z,{children:"\u2630"}),(0,x.jsx)(M,{children:"Reports"}),(0,x.jsx)(T,{children:"Sales and performance reports"})]}),(0,x.jsxs)(E,{onClick:()=>e("/pos/brand/franchise-support"),children:[(0,x.jsx)(z,{children:"\u2709"}),(0,x.jsx)(M,{children:"Support Tickets"}),(0,x.jsx)(T,{children:"Franchise support requests"})]}),(0,x.jsxs)(E,{onClick:()=>e("/pos/manager/subscriptions"),children:[(0,x.jsx)(z,{children:"\u2605"}),(0,x.jsx)(M,{children:"Subscriptions"}),(0,x.jsx)(T,{children:"Manage subscription plans"})]})]}),(0,x.jsxs)(v,{children:[(0,x.jsxs)(f,{children:[(0,x.jsx)("h3",{children:"Restaurant Performance"}),0===$.length?(0,x.jsx)(S,{children:"No restaurants registered yet. Add your first restaurant to see performance data."}):$.slice(0,5).map(r=>(0,x.jsxs)(F,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,x.jsxs)(k,{children:[(0,x.jsx)(A,{children:r.name}),(0,x.jsx)(B,{status:r.status,children:r.status})]}),(0,x.jsxs)(C,{children:[(0,x.jsxs)("span",{children:[r.cuisine," - ",r.adminName]}),(0,x.jsxs)("span",{children:["Today: ",(0,h.vv)(r.todayRevenue,X)," (",r.todayOrders," orders)"]})]})]},r.id))]}),(0,x.jsxs)(f,{children:[(0,x.jsx)("h3",{children:"Brand Summary"}),(0,x.jsxs)(b,{children:[(0,x.jsx)(y,{children:"Monthly Revenue"}),(0,x.jsx)(w,{children:(0,h.vv)(V,X)})]}),(0,x.jsxs)(b,{children:[(0,x.jsx)(y,{children:"Avg Revenue / Store"}),(0,x.jsx)(w,{children:(0,h.vv)(W,X)})]}),(0,x.jsxs)(b,{children:[(0,x.jsx)(y,{children:"Active Restaurants"}),(0,x.jsxs)(w,{children:[L," / ",Z]})]}),(0,x.jsxs)(b,{children:[(0,x.jsx)(y,{children:"Today's Total Orders"}),(0,x.jsx)(w,{children:q})]})]})]})]}),"restaurants"===t&&(0,x.jsxs)(f,{children:[(0,x.jsx)("h3",{children:"All Restaurants"}),0===$.length?(0,x.jsx)(S,{children:'No restaurants found. Click "Manage Restaurants" to add your first restaurant.'}):$.map(r=>(0,x.jsxs)(F,{onClick:()=>e(`/pos/brand/reports?restaurantId=${r.id}&restaurantName=${encodeURIComponent(r.name)}`),children:[(0,x.jsxs)(k,{children:[(0,x.jsx)(A,{children:r.name}),(0,x.jsx)(B,{status:r.status,children:r.status})]}),(0,x.jsxs)(C,{children:[(0,x.jsx)("span",{children:r.address}),(0,x.jsx)("span",{children:r.planType})]}),(0,x.jsxs)(C,{style:{marginTop:"4px"},children:[(0,x.jsxs)("span",{children:["Admin: ",r.adminName," - ",r.cuisine]}),(0,x.jsxs)("span",{children:["Monthly: ",(0,h.vv)(r.monthlyRevenue,X)]})]})]},r.id))]})]})]})})}},2597:(e,r,t)=>{t.d(r,{Ex:()=>c,oz:()=>l,tU:()=>d});t(9950);var n=t(4752),s=t(4414);const a=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,i=n.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,o=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:r,className:t,style:n}=e;return(0,s.jsx)(a,{className:t,style:n,children:r})},l=e=>{let{active:r,onClick:t,children:n,className:a}=e;return(0,s.jsx)(i,{active:r,onClick:t,className:a,children:n})},c=e=>{let{count:r,variant:t="default",showZero:n=!1}=e;return 0!==r||n?(0,s.jsx)(o,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>a});var n=t(9950),s=t(4492);function a(e){const[r,t]=(0,s.ok)(),a=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[i,o]=(0,n.useState)(a());return[i,(0,n.useCallback)(e=>{o(e),t({tab:e})},[t])]}},4021:(e,r,t)=>{t.d(r,{i1:()=>i});var n=t(9950),s=t(1367),a=t(6038);const i=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,n.useState)("RM"),[i,o]=(0,n.useState)(Object.keys(a.DL)),[d,l]=(0,n.useState)(!0),[c,h]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),n=r.indexOf("restaurant");let s=n>=0?r[n+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var a;const e=await r.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(n)}else t("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:i,loading:d,error:c}}}}]);