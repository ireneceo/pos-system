"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8026],{2597:(e,t,n)=>{n.d(t,{Ex:()=>l,oz:()=>c,tU:()=>d});n(9950);var r=n(4752),a=n(4414);const s=r.Ay.div`
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
`,i=r.Ay.button`
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
`,o=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:t,className:n,style:r}=e;return(0,a.jsx)(s,{className:n,style:r,children:t})},c=e=>{let{active:t,onClick:n,children:r,className:s}=e;return(0,a.jsx)(i,{active:t,onClick:n,className:s,children:r})},l=e=>{let{count:t,variant:n="default",showZero:r=!1}=e;return 0!==t||r?(0,a.jsx)(o,{variant:n,children:t}):null}},2653:(e,t,n)=>{n.d(t,{M:()=>s});var r=n(9950),a=n(4492);function s(e){const[t,n]=(0,a.ok)(),s=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[i,o]=(0,r.useState)(s());return[i,(0,r.useCallback)(e=>{o(e),n({tab:e})},[n])]}},4021:(e,t,n)=>{n.d(t,{i1:()=>i});var r=n(9950),a=n(1367),s=n(6038);const i=()=>{const{user:e}=(0,a.As)(),[t,n]=(0,r.useState)("RM"),[i,o]=(0,r.useState)(Object.keys(s.DL)),[d,c]=(0,r.useState)(!0),[l,h]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let a=r>=0?t[r+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return n("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),r=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";n(r)}else n("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),n("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:d,error:l}}},8026:(e,t,n)=>{n.r(t),n.d(t,{default:()=>$});var r=n(9950),a=n(4492),s=n(4752),i=n(6649),o=n(2597),d=n(2653),c=n(1367),l=n(4021),h=n(6038),x=n(4414);const p=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,u=s.Ay.div`
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
`,g=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,j=s.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 4px 0 0;
`,f=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,v=s.Ay.div`
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
`,y=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,b=s.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,w=s.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,k=s.Ay.div`
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
`,A=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,F=s.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,C=s.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#2563EB";case"expired":return"#DC2626";case"suspended":return"#D97706";default:return"#6B7280"}}};
`,S=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,B=s.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
`,E=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,T=s.Ay.div`
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
`,z=s.Ay.div`
  font-size: 28px;
  margin-bottom: 8px;
  color: #059669;
`,R=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,M=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,$=()=>{const e=(0,a.Zp)(),{user:t}=(0,c.As)(),[n,s]=(0,d.M)("overview"),[$,_]=(0,r.useState)([]),[D,N]=(0,r.useState)(!0),[O,I]=(0,r.useState)(""),{defaultCurrency:G}=(0,l.i1)(),[X,U]=(0,r.useState)("RM");(0,r.useEffect)(()=>{G&&U(G)},[G]),(0,r.useEffect)(()=>{t&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},t=await fetch("/api/foodcourts",{headers:e});if(t.ok){const e=await t.json(),n=Array.isArray(e)?e:e.data||[];n.length>0&&I(n[0].name||"")}const n=await fetch("/api/restaurants",{headers:e});if(n.ok){const t=await n.json(),r=(new Date).toISOString().split("T")[0],a=await fetch("/api/orders",{headers:e}),s=a.ok?await a.json():[],i=s.data||s||[],o=t.map(e=>{const t=i.filter(t=>{var n,r;return(null===(n=t.restaurant_id)||void 0===n?void 0:n.toString())===(null===(r=e.id)||void 0===r?void 0:r.toString())}),n=t.filter(e=>{var t;return null===(t=e.order_date)||void 0===t?void 0:t.startsWith(r)}),a=n.reduce((e,t)=>e+parseFloat(t.total_amount||0),0),s=new Date;s.setDate(1);const o=s.toISOString().split("T")[0],d=t.filter(e=>e.order_date&&e.order_date>=o).reduce((e,t)=>e+parseFloat(t.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:n.length,todayRevenue:a,monthlyRevenue:d}});_(o)}}catch(e){console.error("Error fetching foodcourt manager data:",e)}finally{N(!1)}})()},[t]);const Z=$.length,L=$.filter(e=>"active"===e.status).length,P=$.reduce((e,t)=>e+t.todayRevenue,0),q=$.reduce((e,t)=>e+t.todayOrders,0),V=$.reduce((e,t)=>e+t.monthlyRevenue,0),W=Z>0?Math.round(L/Z*100):0;return D?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(p,{children:[(0,x.jsx)(u,{children:(0,x.jsx)(m,{children:"Foodcourt Manager Dashboard"})}),(0,x.jsx)(g,{children:(0,x.jsx)(B,{children:"Loading dashboard data..."})})]})}):(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(p,{children:[(0,x.jsx)(u,{children:(0,x.jsxs)("div",{children:[(0,x.jsx)(m,{children:"Foodcourt Manager Dashboard"}),O&&(0,x.jsx)(j,{children:O})]})}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(o.tU,{children:[(0,x.jsx)(o.oz,{active:"overview"===n,onClick:()=>s("overview"),children:"Overview"}),(0,x.jsxs)(o.oz,{active:"tenants"===n,onClick:()=>s("tenants"),children:["Tenants ",(0,x.jsx)(o.Ex,{count:Z,showZero:!0})]})]}),"overview"===n&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(i.Ot,{children:[(0,x.jsxs)(i.XS,{children:[(0,x.jsx)(i.G$,{children:Z}),(0,x.jsx)(i.h2,{children:"Total Tenants"})]}),(0,x.jsxs)(i.XS,{children:[(0,x.jsx)(i.G$,{children:L}),(0,x.jsx)(i.h2,{children:"Active Tenants"})]}),(0,x.jsxs)(i.XS,{children:[(0,x.jsx)(i.G$,{children:(0,h.vv)(P,X)}),(0,x.jsx)(i.h2,{children:"Today's Revenue"})]}),(0,x.jsxs)(i.XS,{children:[(0,x.jsxs)(i.G$,{children:[W,"%"]}),(0,x.jsx)(i.h2,{children:"Occupancy Rate"})]})]}),(0,x.jsxs)(E,{children:[(0,x.jsxs)(T,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,x.jsx)(z,{children:"\u2699"}),(0,x.jsx)(R,{children:"Manage Tenants"}),(0,x.jsx)(M,{children:"Add, edit, view tenant restaurants"})]}),(0,x.jsxs)(T,{onClick:()=>e("/pos/foodcourt/rent-management"),children:[(0,x.jsx)(z,{children:"\u2630"}),(0,x.jsx)(R,{children:"Rent Management"}),(0,x.jsx)(M,{children:"Rental billing and tracking"})]}),(0,x.jsxs)(T,{onClick:()=>e("/pos/foodcourt/tenant-support"),children:[(0,x.jsx)(z,{children:"\u2709"}),(0,x.jsx)(R,{children:"Support Tickets"}),(0,x.jsx)(M,{children:"Tenant support requests"})]}),(0,x.jsxs)(T,{onClick:()=>e("/pos/manager/subscriptions"),children:[(0,x.jsx)(z,{children:"\u2605"}),(0,x.jsx)(R,{children:"Subscriptions"}),(0,x.jsx)(M,{children:"Manage subscription plans"})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsxs)(v,{children:[(0,x.jsx)("h3",{children:"Tenant Performance"}),0===$.length?(0,x.jsx)(B,{children:"No tenants registered yet. Add your first tenant restaurant to see performance data."}):$.slice(0,5).map(t=>(0,x.jsxs)(k,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,x.jsxs)(A,{children:[(0,x.jsx)(F,{children:t.name}),(0,x.jsx)(C,{status:t.status,children:t.status})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)("span",{children:[t.cuisine," - ",t.adminName]}),(0,x.jsxs)("span",{children:["Today: ",(0,h.vv)(t.todayRevenue,X)," (",t.todayOrders," orders)"]})]})]},t.id))]}),(0,x.jsxs)(v,{children:[(0,x.jsx)("h3",{children:"Foodcourt Summary"}),(0,x.jsxs)(y,{children:[(0,x.jsx)(b,{children:"Monthly Revenue"}),(0,x.jsx)(w,{children:(0,h.vv)(V,X)})]}),(0,x.jsxs)(y,{children:[(0,x.jsx)(b,{children:"Occupancy Rate"}),(0,x.jsxs)(w,{children:[W,"%"]})]}),(0,x.jsxs)(y,{children:[(0,x.jsx)(b,{children:"Active Tenants"}),(0,x.jsxs)(w,{children:[L," / ",Z]})]}),(0,x.jsxs)(y,{children:[(0,x.jsx)(b,{children:"Today's Total Orders"}),(0,x.jsx)(w,{children:q})]})]})]})]}),"tenants"===n&&(0,x.jsxs)(v,{children:[(0,x.jsx)("h3",{children:"All Tenants"}),0===$.length?(0,x.jsx)(B,{children:'No tenants found. Click "Manage Tenants" to add your first tenant restaurant.'}):$.map(t=>(0,x.jsxs)(k,{onClick:()=>e(`/pos/manager/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`),children:[(0,x.jsxs)(A,{children:[(0,x.jsx)(F,{children:t.name}),(0,x.jsx)(C,{status:t.status,children:t.status})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)("span",{children:t.address}),(0,x.jsx)("span",{children:t.planType})]}),(0,x.jsxs)(S,{style:{marginTop:"4px"},children:[(0,x.jsxs)("span",{children:["Admin: ",t.adminName," - ",t.cuisine]}),(0,x.jsxs)("span",{children:["Monthly: ",(0,h.vv)(t.monthlyRevenue,X)]})]})]},t.id))]})]})]})})}}}]);