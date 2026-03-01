"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[758],{758:(e,r,s)=>{s.r(r),s.d(r,{default:()=>T});var t=s(8819),n=s(9950),a=s(4492),i=s(4752),d=s(2674),o=s(1367),c=s(4021),l=s(6038),h=s(4414);const x=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${t.w.colors.border};
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
`,j=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${t.w.colors.secondary};
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=i.Ay.p`
  font-size: 14px;
  color: ${t.w.colors.text.muted};
  margin: 4px 0 0;
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,v=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: ${t.w.colors.secondary};
    font-size: 18px;
    font-weight: 600;
  }
`,f=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${t.w.colors.surfaceMuted};

  &:last-child {
    border-bottom: none;
  }
`,y=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,b=i.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
`,w=i.Ay.div`
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
`,A=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,k=i.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,F=i.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#2563EB";case"expired":return"#DC2626";case"suspended":return"#D97706";default:return"#6B7280"}}};
`,S=i.Ay.div`
  font-size: 13px;
  color: ${t.w.colors.text.muted};
  display: flex;
  justify-content: space-between;
`,R=i.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: ${t.w.colors.text.muted};
  font-size: 14px;
  border: 2px dashed ${t.w.colors.border};
  border-radius: 8px;
`,$=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,C=i.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: ${t.w.colors.primary};
    background: #F4F3FF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.15);
  }
`,z=i.Ay.div`
  font-size: 28px;
  margin-bottom: 8px;
  color: #635BFF;
`,B=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,M=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,T=()=>{const e=(0,a.Zp)(),{user:r}=(0,o.As)(),[s,t]=(0,n.useState)("overview"),[i,T]=(0,n.useState)([]),[_,O]=(0,n.useState)(!0),[E,D]=(0,n.useState)(""),{defaultCurrency:N}=(0,c.i1)(),[I,G]=(0,n.useState)("RM");(0,n.useEffect)(()=>{N&&G(N)},[N]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/brands",{headers:e});if(r.ok){const e=await r.json();e.length>0&&D(e[0].name||"")}const s=await fetch("/api/restaurants",{headers:e});if(s.ok){const r=await s.json(),t=(new Date).toISOString().split("T")[0],n=await fetch("/api/orders",{headers:e}),a=n.ok?await n.json():[],i=a.data||a||[],d=r.map(e=>{const r=i.filter(r=>{var s,t;return(null===(s=r.restaurant_id)||void 0===s?void 0:s.toString())===(null===(t=e.id)||void 0===t?void 0:t.toString())}),s=r.filter(e=>{var r;return null===(r=e.order_date)||void 0===r?void 0:r.startsWith(t)}),n=s.reduce((e,r)=>e+parseFloat(r.total_amount||0),0),a=new Date;a.setDate(1);const d=a.toISOString().split("T")[0],o=r.filter(e=>e.order_date&&e.order_date>=d).reduce((e,r)=>e+parseFloat(r.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:s.length,todayRevenue:n,monthlyRevenue:o}});T(d)}}catch(e){console.error("Error fetching brand manager data:",e)}finally{O(!1)}})()},[r]);const X=i.length,L=i.filter(e=>"active"===e.status).length,P=i.reduce((e,r)=>e+r.todayRevenue,0),q=i.reduce((e,r)=>e+r.todayOrders,0),U=i.reduce((e,r)=>e+r.monthlyRevenue,0),V=X>0?U/X:0;return _?(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(x,{children:[(0,h.jsx)(p,{children:(0,h.jsx)(j,{children:"Brand Manager Dashboard"})}),(0,h.jsx)(u,{children:(0,h.jsx)(R,{children:"Loading dashboard data..."})})]})}):(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(x,{children:[(0,h.jsx)(p,{children:(0,h.jsxs)("div",{children:[(0,h.jsx)(j,{children:"Brand Manager Dashboard"}),E&&(0,h.jsx)(m,{children:E})]})}),(0,h.jsxs)(u,{children:[(0,h.jsxs)(d.j,{children:[(0,h.jsx)(d.oz,{active:"overview"===s,onClick:()=>t("overview"),children:"Overview"}),(0,h.jsxs)(d.oz,{active:"restaurants"===s,onClick:()=>t("restaurants"),children:["Restaurants (",X,")"]})]}),"overview"===s&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(d.Ot,{children:[(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:X}),(0,h.jsx)(d.h2,{children:"Total Restaurants"})]}),(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:L}),(0,h.jsx)(d.h2,{children:"Active Restaurants"})]}),(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:(0,l.vv)(P,I)}),(0,h.jsx)(d.h2,{children:"Today's Revenue"})]}),(0,h.jsxs)(d.XS,{children:[(0,h.jsx)(d.G$,{children:q}),(0,h.jsx)(d.h2,{children:"Today's Orders"})]})]}),(0,h.jsxs)($,{children:[(0,h.jsxs)(C,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,h.jsx)(z,{children:"\u2699"}),(0,h.jsx)(B,{children:"Manage Restaurants"}),(0,h.jsx)(M,{children:"Add, edit, view restaurants"})]}),(0,h.jsxs)(C,{onClick:()=>e("/pos/brand/reports"),children:[(0,h.jsx)(z,{children:"\u2630"}),(0,h.jsx)(B,{children:"Reports"}),(0,h.jsx)(M,{children:"Sales and performance reports"})]}),(0,h.jsxs)(C,{onClick:()=>e("/pos/brand/franchise-support"),children:[(0,h.jsx)(z,{children:"\u2709"}),(0,h.jsx)(B,{children:"Support Tickets"}),(0,h.jsx)(M,{children:"Franchise support requests"})]}),(0,h.jsxs)(C,{onClick:()=>e("/pos/manager/subscriptions"),children:[(0,h.jsx)(z,{children:"\u2605"}),(0,h.jsx)(B,{children:"Subscriptions"}),(0,h.jsx)(M,{children:"Manage subscription plans"})]})]}),(0,h.jsxs)(g,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)("h3",{children:"Restaurant Performance"}),0===i.length?(0,h.jsx)(R,{children:"No restaurants registered yet. Add your first restaurant to see performance data."}):i.slice(0,5).map(r=>(0,h.jsxs)(w,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,h.jsxs)(A,{children:[(0,h.jsx)(k,{children:r.name}),(0,h.jsx)(F,{status:r.status,children:r.status})]}),(0,h.jsxs)(S,{children:[(0,h.jsxs)("span",{children:[r.cuisine," - ",r.adminName]}),(0,h.jsxs)("span",{children:["Today: ",(0,l.vv)(r.todayRevenue,I)," (",r.todayOrders," orders)"]})]})]},r.id))]}),(0,h.jsxs)(v,{children:[(0,h.jsx)("h3",{children:"Brand Summary"}),(0,h.jsxs)(f,{children:[(0,h.jsx)(y,{children:"Monthly Revenue"}),(0,h.jsx)(b,{children:(0,l.vv)(U,I)})]}),(0,h.jsxs)(f,{children:[(0,h.jsx)(y,{children:"Avg Revenue / Store"}),(0,h.jsx)(b,{children:(0,l.vv)(V,I)})]}),(0,h.jsxs)(f,{children:[(0,h.jsx)(y,{children:"Active Restaurants"}),(0,h.jsxs)(b,{children:[L," / ",X]})]}),(0,h.jsxs)(f,{children:[(0,h.jsx)(y,{children:"Today's Total Orders"}),(0,h.jsx)(b,{children:q})]})]})]})]}),"restaurants"===s&&(0,h.jsxs)(v,{children:[(0,h.jsx)("h3",{children:"All Restaurants"}),0===i.length?(0,h.jsx)(R,{children:'No restaurants found. Click "Manage Restaurants" to add your first restaurant.'}):i.map(r=>(0,h.jsxs)(w,{onClick:()=>e(`/pos/brand/reports?restaurantId=${r.id}&restaurantName=${encodeURIComponent(r.name)}`),children:[(0,h.jsxs)(A,{children:[(0,h.jsx)(k,{children:r.name}),(0,h.jsx)(F,{status:r.status,children:r.status})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)("span",{children:r.address}),(0,h.jsx)("span",{children:r.planType})]}),(0,h.jsxs)(S,{style:{marginTop:"4px"},children:[(0,h.jsxs)("span",{children:["Admin: ",r.adminName," - ",r.cuisine]}),(0,h.jsxs)("span",{children:["Monthly: ",(0,l.vv)(r.monthlyRevenue,I)]})]})]},r.id))]})]})]})})}},4021:(e,r,s)=>{s.d(r,{i1:()=>i});var t=s(9950),n=s(1367),a=s(6038);const i=()=>{const{user:e}=(0,n.As)(),[r,s]=(0,t.useState)("RM"),[i,d]=(0,t.useState)(Object.keys(a.DL)),[o,c]=(0,t.useState)(!0),[l,h]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),t=r.indexOf("restaurant");let n=t>=0?r[t+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return s("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var a;const e=await r.json(),t=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";s(t)}else s("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),s("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:i,loading:o,error:l}}}}]);