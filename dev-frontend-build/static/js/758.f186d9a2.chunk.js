"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[758],{758:(e,r,n)=>{n.r(r),n.d(r,{default:()=>M});var t=n(9950),i=n(4492),s=n(4752),a=n(8409),d=n(1367),o=n(4021),l=n(6038),c=n(4414);const h=s.Ay.div`
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
`,v=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,y=s.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,b=s.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,A=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,w=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,F=s.Ay.div`
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
`,R=s.Ay.thead`
  background: #F8FAFC;
`,B=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,C=s.Ay.tbody``,N=s.Ay.tr`
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
`,_=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"active":return"background: #D1FAE5; color: #065F46;";case"trial":return"background: #DBEAFE; color: #1E40AF;";case"expired":return"background: #FEE2E2; color: #991B1B;";case"suspended":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,M=()=>{const e=(0,i.Zp)(),{user:r}=(0,d.As)(),[n,s]=(0,t.useState)([]),[M,T]=(0,t.useState)(!0),[$,O]=(0,t.useState)(""),{defaultCurrency:D}=(0,o.i1)(),[G,I]=(0,t.useState)("RM");(0,t.useEffect)(()=>{D&&I(D)},[D]),(0,t.useEffect)(()=>{r&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/brands",{headers:e});if(r.ok){const e=await r.json();e.length>0&&O(e[0].name||"")}const n=await fetch("/api/restaurants",{headers:e});if(n.ok){const r=await n.json(),t=(new Date).toISOString().split("T")[0],i=await fetch("/api/orders",{headers:e}),a=i.ok?await i.json():[],d=a.data||a||[],o=r.map(e=>{const r=d.filter(r=>{var n,t;return(null===(n=r.restaurant_id)||void 0===n?void 0:n.toString())===(null===(t=e.id)||void 0===t?void 0:t.toString())}),n=r.filter(e=>{var r;return null===(r=e.order_date)||void 0===r?void 0:r.startsWith(t)}),i=n.reduce((e,r)=>e+parseFloat(r.total_amount||0),0),s=new Date;s.setDate(1);const a=s.toISOString().split("T")[0],o=r.filter(e=>e.order_date&&e.order_date>=a).reduce((e,r)=>e+parseFloat(r.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:n.length,todayRevenue:i,monthlyRevenue:o}});s(o)}}catch(e){console.error("Error fetching brand manager data:",e)}finally{T(!1)}})()},[r]);const X=n.length,L=n.filter(e=>"active"===e.status).length,W=n.reduce((e,r)=>e+r.todayRevenue,0),P=n.reduce((e,r)=>e+r.todayOrders,0),Q=n.reduce((e,r)=>e+r.monthlyRevenue,0),U=X>0?Q/X:0;return M?(0,c.jsxs)(h,{children:[(0,c.jsx)(x,{children:(0,c.jsx)(u,{children:"Brand Manager Dashboard"})}),(0,c.jsx)(p,{children:(0,c.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]}):(0,c.jsxs)(h,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:"Brand Manager Dashboard"}),$&&(0,c.jsx)(g,{children:(0,c.jsx)("span",{children:$})})]}),(0,c.jsxs)(p,{children:[(0,c.jsxs)(a.Ot,{children:[(0,c.jsxs)(a.XS,{color:"#DC2626",children:[(0,c.jsx)(a.h2,{children:"Total Restaurants"}),(0,c.jsx)(a.G$,{children:X})]}),(0,c.jsxs)(a.XS,{color:"#059669",children:[(0,c.jsx)(a.h2,{children:"Active Restaurants"}),(0,c.jsx)(a.G$,{children:L})]}),(0,c.jsxs)(a.XS,{color:"#F59E0B",children:[(0,c.jsx)(a.h2,{children:"Today's Revenue"}),(0,c.jsx)(a.G$,{children:(0,l.vv)(W,G)})]}),(0,c.jsxs)(a.XS,{color:"#2563EB",children:[(0,c.jsx)(a.h2,{children:"Today's Orders"}),(0,c.jsx)(a.G$,{children:P})]}),(0,c.jsxs)(a.XS,{color:"#10B981",children:[(0,c.jsx)(a.h2,{children:"Monthly Revenue"}),(0,c.jsx)(a.G$,{children:(0,l.vv)(Q,G)})]}),(0,c.jsxs)(a.XS,{color:"#7C3AED",children:[(0,c.jsx)(a.h2,{children:"Avg Revenue / Store"}),(0,c.jsx)(a.G$,{children:(0,l.vv)(U,G)})]})]}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(j,{children:[(0,c.jsx)("h3",{children:"Brand Summary"}),(0,c.jsxs)(v,{children:[(0,c.jsx)(y,{children:"Monthly Revenue"}),(0,c.jsx)(b,{children:(0,l.vv)(Q,G)})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(y,{children:"Avg Revenue / Store"}),(0,c.jsx)(b,{children:(0,l.vv)(U,G)})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(y,{children:"Active Restaurants"}),(0,c.jsxs)(b,{children:[L," / ",X]})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(y,{children:"Today's Total Orders"}),(0,c.jsx)(b,{children:P})]})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)("h3",{children:"Notifications"}),(0,c.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"13px",fontStyle:"italic"},children:"No new notifications"})]})]}),(0,c.jsxs)(A,{children:[(0,c.jsx)("h3",{children:"Quick Actions"}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(F,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,c.jsx)("div",{className:"icon",children:"\u2699"}),(0,c.jsx)("div",{className:"title",children:"Manage Restaurants"}),(0,c.jsx)("div",{className:"description",children:"Add, edit, view restaurants"})]}),(0,c.jsxs)(F,{onClick:()=>e("/pos/brand/reports"),children:[(0,c.jsx)("div",{className:"icon",children:"\u2630"}),(0,c.jsx)("div",{className:"title",children:"Reports"}),(0,c.jsx)("div",{className:"description",children:"Sales and performance"})]}),(0,c.jsxs)(F,{onClick:()=>e("/pos/brand/franchise-support"),children:[(0,c.jsx)("div",{className:"icon",children:"\u2709"}),(0,c.jsx)("div",{className:"title",children:"Support Tickets"}),(0,c.jsx)("div",{className:"description",children:"Franchise support"})]}),(0,c.jsxs)(F,{onClick:()=>e("/pos/manager/subscriptions"),children:[(0,c.jsx)("div",{className:"icon",children:"\u2605"}),(0,c.jsx)("div",{className:"title",children:"Subscriptions"}),(0,c.jsx)("div",{className:"description",children:"Manage plans"})]})]})]}),(0,c.jsx)(k,{children:(0,c.jsx)("h3",{children:"Restaurant Performance"})}),(0,c.jsx)(S,{children:(0,c.jsxs)(E,{children:[(0,c.jsx)(R,{children:(0,c.jsxs)(N,{children:[(0,c.jsx)(B,{children:"Restaurant"}),(0,c.jsx)(B,{children:"Admin"}),(0,c.jsx)(B,{children:"Status"}),(0,c.jsx)(B,{children:"Today's Orders"}),(0,c.jsx)(B,{children:"Today's Revenue"}),(0,c.jsx)(B,{children:"Monthly Revenue"})]})}),(0,c.jsx)(C,{children:n.length>0?n.map(r=>(0,c.jsxs)(N,{onClick:()=>e(`/pos/brand/reports?restaurantId=${r.id}&restaurantName=${encodeURIComponent(r.name)}`),children:[(0,c.jsx)(z,{style:{fontWeight:600,color:"#0A2540"},children:r.name}),(0,c.jsx)(z,{children:r.adminName}),(0,c.jsx)(z,{children:(0,c.jsx)(_,{status:r.status,children:r.status})}),(0,c.jsx)(z,{children:r.todayOrders}),(0,c.jsx)(z,{children:(0,l.vv)(r.todayRevenue,G)}),(0,c.jsx)(z,{style:{fontWeight:600},children:(0,l.vv)(r.monthlyRevenue,G)})]},r.id)):(0,c.jsx)(N,{children:(0,c.jsx)(z,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No restaurants registered yet"})})})]})})]})]})}},4021:(e,r,n)=>{n.d(r,{i1:()=>a});var t=n(9950),i=n(1367),s=n(6038);const a=()=>{const{user:e}=(0,i.As)(),[r,n]=(0,t.useState)("RM"),[a]=(0,t.useState)(Object.keys(s.DL)),[d,o]=(0,t.useState)(!0),[l,c]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),t=r.indexOf("restaurant");let i=t>=0?r[t+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void o(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var s;const e=await r.json(),t=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";n(t)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),n("RM")}finally{o(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:a,loading:d,error:l}}}}]);