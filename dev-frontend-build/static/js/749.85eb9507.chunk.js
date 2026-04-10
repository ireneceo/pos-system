"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[749],{749:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ne});var n=t(9950),a=t(4492),i=t(4752),s=t(8409),o=t(843),d=t(4021),l=t(8608),c=t(6038),p=t(1367),u=t(1095),h=t(2847),b=t(3245),x=t(158),g=t(3440),f=t(2174),y=t(4915),m=t(7621),v=t(5297),j=t(7766),A=t(5030),k=t(9955),F=t(4414);const w=i.Ay.div`
  min-height: 100vh;
`,C=i.Ay.div`
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
`,D=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,E=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,S=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7C93;
  margin-top: 4px;
`,_=i.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  ${e=>{let{variant:r}=e;switch(r){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
  &:hover { opacity: 0.8; }
`,$=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,B=i.Ay.div`
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
`,G=i.Ay.div`
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
`,I=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,R=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{switch(e.type){case"error":return"#FEF2F2";case"warning":return"#FFFBEB";case"success":return"#ECFDF5";case"info":return"#EFF6FF";default:return"#F8FAFC"}}};
  border: 1px solid ${e=>{switch(e.type){case"error":return"#FECACA";case"warning":return"#FDE68A";case"success":return"#A7F3D0";case"info":return"#BFDBFE";default:return"#E6EBF1"}}};
  flex-shrink: 0;

  &:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); }
`,z=i.Ay.div`
  flex: 1;
  min-width: 0;
`,P=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,N=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,M=i.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,O=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,T=i.Ay.div`
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
`,q=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,L=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,X=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,W=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,K=i.Ay.div`
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
`,U=i.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,Y=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,Q=i.Ay.thead`
  background: #F8FAFC;
`,Z=i.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,H=i.Ay.tbody``,J=i.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,V=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,ee=i.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,re=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`,te=["#DC2626","#EF4444","#F87171","#FCA5A5","#FECACA","#FEE2E2","#FFF5F5"],ne=()=>{const{t:e}=(0,A.Bd)("brand"),r=(0,a.Zp)(),{user:t}=(0,p.As)(),{defaultCurrency:i}=(0,d.i1)(),[ne,ae]=(0,n.useState)("RM"),[ie,se]=(0,n.useState)(!0),[oe,de]=(0,n.useState)(null),[le,ce]=(0,n.useState)("year"),{items:pe}=(0,l.d)({role:(null===t||void 0===t?void 0:t.role)||"",brandId:null===t||void 0===t?void 0:t.brand_id}),[ue,he]=(0,n.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerRestaurant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[be,xe]=(0,n.useState)([]),[ge,fe]=(0,n.useState)([]),[ye,me]=(0,n.useState)({}),[ve,je]=(0,n.useState)([]),[Ae,ke]=(0,n.useState)([]),[Fe,we]=(0,n.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,n.useEffect)(()=>{i&&ae(i)},[i]),(0,n.useEffect)(()=>{Ee(),Ce()},[]);const Ce=async()=>{try{const e=(0,k.c4)();if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&we(e.data)}}catch{}};(0,n.useEffect)(()=>{oe&&Se(oe)},[le,oe]);const De=()=>({Authorization:`Bearer ${(0,k.c4)()}`,"Content-Type":"application/json"}),Ee=async()=>{try{if(!(0,k.c4)())return;se(!0);const e=De(),r=await fetch("/api/brands",{headers:e}),n=await r.json(),a=(n.data||n||[])[0];if(!a)return void se(!1);de(a.id),a.restaurants&&a.restaurants.length>0&&a.restaurants[0].currency&&ae(a.restaurants[0].currency);const i=new Date,s=new Date(i.getFullYear(),i.getMonth(),1).toISOString().split("T")[0],o=i.toISOString().split("T")[0],[d,l,c,p,u,h]=await Promise.all([fetch(`/api/brands/${a.id}/revenue?start_date=${s}&end_date=${o}`,{headers:e}),fetch(`/api/brands/${a.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Brand Manager",{headers:e}),fetch(`/api/brands/${a.id}/subscriptions`,{headers:e}),fetch("/api/restaurants/subscription-status",{headers:e})]),[b,x,g,f,y,m]=await Promise.all([d.json(),l.json(),c.json(),p.json(),u.json(),h.json()]),v=m.data||m;if(v.subscriptionStatus){const r=await fetch(`/api/users/${null===t||void 0===t?void 0:t.id}`,{headers:e}),n=await r.json(),i=n.data||n;me({planType:i.plan_type||a.plan_type,status:v.subscriptionStatus,daysLeft:i.subscription_end?Math.ceil((new Date(i.subscription_end).getTime()-Date.now())/864e5):void 0})}const j=b.data||b,A=parseFloat(j.total_revenue||0),F=j.restaurants||[],w=F.reduce((e,r)=>e+(r.order_count||0),0);fe(F);const C=(x.data||x||[]).filter(e=>!1!==e.is_active).length,D=g.data||g||[],E=D.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,S=D.filter(e=>"overdue"===e.status).length,_=Array.isArray(f)?f:f.data||[],$=y.data||y||[];je($),he({totalRestaurants:F.length,monthlyRevenue:A,monthlyOrders:w,avgRevenuePerRestaurant:F.length>0?A/F.length:0,pendingInvoices:E,overdueInvoices:S,activePlans:C,totalManagers:_.length});const B=[];S>0&&B.push({type:"warning",title:"Overdue Invoices",message:`${S} invoice(s) need attention`,link:"/pos/brand/invoices"}),E>0&&B.push({type:"info",title:"Pending Invoices",message:`${E} invoice(s) pending payment`,link:"/pos/brand/invoices"});const G=F.filter(e=>0===(e.order_count||0));G.length>0&&B.push({type:"info",title:"No Orders",message:`${G.length} restaurant(s) with no orders this month`,link:"/pos/brand/general/management"}),Fe.notices>0&&B.push({type:"info",title:"Unread Notices",message:`${Fe.notices} unread notice(s)`,link:"/pos/brand/notices"}),Fe.systemInquiry>0&&B.push({type:"info",title:"System Inquiry",message:`${Fe.systemInquiry} inquiry(s) with new replies`,link:"/pos/brand/system-inquiry"}),Fe.operationInquiry>0&&B.push({type:"info",title:"Operation Inquiry",message:`${Fe.operationInquiry} open inquiry(s)`,link:"/pos/brand/operation-inquiry"}),0===B.length&&B.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),ke(B),Se(a.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{se(!1)}},Se=async e=>{try{if(!(0,k.c4)())return;const r=De(),t=await fetch(`/api/brands/${e}/sales-trend?period=${le}`,{headers:r}),n=await t.json();xe(n.data||[])}catch(r){console.error("Error fetching trend data:",r)}},_e=ge.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,r)=>r.value-e.value).slice(0,7),$e=[...ve].sort((e,r)=>{var t,n;return((null===(t=r.current_month)||void 0===t?void 0:t.revenue)||0)-((null===(n=e.current_month)||void 0===n?void 0:n.revenue)||0)}).slice(0,5);return ie?(0,F.jsxs)(w,{children:[(0,F.jsx)(C,{children:(0,F.jsx)(E,{children:e("brand:brandGeneralDashboard.brandDashboard")})}),(0,F.jsx)(D,{children:(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:e("brand:brandGeneralDashboard.loadingDashboard")})})]}):(0,F.jsxs)(w,{children:[(0,F.jsxs)(C,{children:[(0,F.jsx)(E,{children:e("brand:brandGeneralDashboard.brandDashboard")}),ye.planType&&(0,F.jsxs)(S,{children:[(0,F.jsx)("span",{children:ye.planType}),(()=>{const t=ye;return"trial"===t.status?(0,F.jsxs)(_,{variant:"trial",onClick:()=>r("/pos/profile?tab=subscription"),children:["Trial",void 0!==t.daysLeft?" \u2022 "+(t.daysLeft>0?t.daysLeft+" days left":"Expired"):""]}):"active"===t.status&&void 0!==t.daysLeft?t.daysLeft<=0?(0,F.jsx)(_,{variant:"expired",onClick:()=>r("/pos/profile?tab=subscription"),children:e("brand:brandGeneralDashboard.expired")}):t.daysLeft<=30?(0,F.jsxs)(_,{variant:"expiring",onClick:()=>r("/pos/profile?tab=subscription"),children:[t.daysLeft," days left"]}):(0,F.jsxs)(_,{variant:"active",onClick:()=>r("/pos/profile?tab=subscription"),children:[t.daysLeft," days left"]}):"expired"===t.status||"suspended"===t.status?(0,F.jsx)(_,{variant:"expired",onClick:()=>r("/pos/profile?tab=subscription"),children:t.status}):(0,F.jsx)(_,{variant:"active",onClick:()=>r("/pos/profile?tab=subscription"),children:e("brand:brandGeneralDashboard.active")})})()]})]}),(0,F.jsxs)(D,{children:[pe.length>0&&(0,F.jsx)(o.eP,{items:pe,entityId:`brand_${null===t||void 0===t?void 0:t.brand_id}`}),(0,F.jsxs)(s.Ot,{children:[(0,F.jsxs)(s.XS,{color:"#DC2626",children:[(0,F.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.franchiseRestaurants")}),(0,F.jsx)(s.G$,{children:ue.totalRestaurants})]}),(0,F.jsxs)(s.XS,{color:"#059669",children:[(0,F.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.monthlyRevenue")}),(0,F.jsx)(s.G$,{children:(0,c.vv)(ue.monthlyRevenue,ne)})]}),(0,F.jsxs)(s.XS,{color:"#2563EB",children:[(0,F.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.monthlyOrders")}),(0,F.jsx)(s.G$,{children:ue.monthlyOrders.toLocaleString()})]}),(0,F.jsxs)(s.XS,{color:"#7C3AED",children:[(0,F.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.avgRevenueRestaurant")}),(0,F.jsx)(s.G$,{children:(0,c.vv)(ue.avgRevenuePerRestaurant,ne)})]}),(0,F.jsxs)(s.XS,{color:"#F59E0B",children:[(0,F.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.pendingInvoices")}),(0,F.jsx)(s.G$,{children:ue.pendingInvoices})]}),(0,F.jsxs)(s.XS,{color:ue.overdueInvoices>0?"#EF4444":"#059669",children:[(0,F.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.overdueInvoices")}),(0,F.jsx)(s.G$,{children:ue.overdueInvoices})]}),(0,F.jsxs)(s.XS,{color:"#10B981",children:[(0,F.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.activePlans")}),(0,F.jsx)(s.G$,{children:ue.activePlans})]}),(0,F.jsxs)(s.XS,{color:"#6366F1",children:[(0,F.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.brandManagers")}),(0,F.jsx)(s.G$,{children:ue.totalManagers})]})]}),(0,F.jsxs)($,{children:[(0,F.jsxs)(B,{children:[(0,F.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,F.jsx)("h3",{style:{margin:0},children:e("brand:brandGeneralDashboard.revenueTrend")}),(0,F.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,F.jsx)("button",{onClick:()=>ce(e),style:{padding:"6px 12px",background:le===e?"#635BFF":"transparent",color:le===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),be.length>0?(0,F.jsx)(u.u,{width:"100%",height:240,children:(0,F.jsxs)(h.b,{data:be,children:[(0,F.jsx)(b.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,F.jsx)(x.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,F.jsx)(g.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,F.jsx)(f.m,{formatter:e=>[(0,c.vv)(e,ne),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,F.jsx)(y.N,{type:"monotone",dataKey:"sales",stroke:"#DC2626",strokeWidth:2,dot:{r:4,fill:"#DC2626"},activeDot:{r:6}})]})}):(0,F.jsx)(re,{children:e("brand:brandGeneralDashboard.noSalesDataForThisPeriod")})]}),(0,F.jsxs)(G,{children:[(0,F.jsx)("h3",{children:e("brand:brandGeneralDashboard.notifications")}),(0,F.jsx)(I,{children:Ae.map((e,t)=>(0,F.jsx)(R,{type:e.type,onClick:()=>e.link&&r(e.link),children:(0,F.jsxs)(z,{children:[(0,F.jsx)(P,{type:e.type,children:e.title}),(0,F.jsx)(N,{children:e.message})]})},t))})]})]}),(0,F.jsxs)(M,{children:[(0,F.jsx)("h3",{children:e("brand:brandGeneralDashboard.quickActions")}),(0,F.jsxs)(O,{children:[(0,F.jsxs)(T,{onClick:()=>r("/pos/brand/general/management"),children:[(0,F.jsx)("div",{className:"icon",children:"\u25ac"}),(0,F.jsx)("div",{className:"title",children:e("brand:brandGeneralDashboard.brands")}),(0,F.jsx)("div",{className:"description",children:e("brand:brandGeneralDashboard.brandManagement")})]}),(0,F.jsxs)(T,{onClick:()=>r("/pos/brand/invoices"),children:[(0,F.jsx)("div",{className:"icon",children:"\u25a6"}),(0,F.jsx)("div",{className:"title",children:e("brand:brandGeneralDashboard.invoices")}),(0,F.jsx)("div",{className:"description",children:e("brand:brandGeneralDashboard.invoiceManagement")})]}),(0,F.jsxs)(T,{onClick:()=>r("/pos/brand/plans"),children:[(0,F.jsx)("div",{className:"icon",children:"\u2630"}),(0,F.jsx)("div",{className:"title",children:e("brand:brandGeneralDashboard.subscriptionPlans")}),(0,F.jsx)("div",{className:"description",children:e("brand:brandGeneralDashboard.planConfiguration")})]}),(0,F.jsxs)(T,{onClick:()=>r("/pos/brand/general/reports"),children:[(0,F.jsx)("div",{className:"icon",children:"\u25c9"}),(0,F.jsx)("div",{className:"title",children:e("brand:brandGeneralDashboard.reports")}),(0,F.jsx)("div",{className:"description",children:e("brand:brandGeneralDashboard.performanceAnalytics")})]})]})]}),(0,F.jsx)(q,{children:(0,F.jsxs)(L,{children:[(0,F.jsx)(X,{children:(0,F.jsx)(W,{children:e("brand:brandGeneralDashboard.revenueDistribution")})}),_e.length>0?(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,F.jsx)(u.u,{width:"50%",height:220,children:(0,F.jsxs)(m.r,{children:[(0,F.jsx)(v.F,{data:_e,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:_e.map((e,r)=>(0,F.jsx)(j.f,{fill:te[r%te.length]},r))}),(0,F.jsx)(f.m,{formatter:e=>(0,c.vv)(e,ne)})]})}),(0,F.jsx)("div",{style:{flex:1},children:_e.map((e,r)=>(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,F.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:te[r%te.length],flexShrink:0}}),(0,F.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,F.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,c.vv)(e.value,ne)})]},r))})]}):(0,F.jsx)(re,{children:e("brand:brandGeneralDashboard.noRevenueDataAvailable")})]})}),(0,F.jsx)(K,{children:(0,F.jsx)("h3",{children:e("brand:brandGeneralDashboard.restaurantPerformance")})}),(0,F.jsx)(U,{children:(0,F.jsxs)(Y,{children:[(0,F.jsx)(Q,{children:(0,F.jsxs)(J,{children:[(0,F.jsx)(Z,{children:e("brand:brandGeneralDashboard.restaurant")}),(0,F.jsx)(Z,{children:e("brand:brandGeneralDashboard.plan")}),(0,F.jsx)(Z,{children:e("brand:brandGeneralDashboard.monthlyRevenue")}),(0,F.jsx)(Z,{children:e("brand:brandGeneralDashboard.orders")}),(0,F.jsx)(Z,{children:e("brand:brandGeneralDashboard.estimatedCharges")}),(0,F.jsx)(Z,{children:e("brand:brandGeneralDashboard.invoiceStatus")})]})}),(0,F.jsx)(H,{children:$e.length>0?$e.map((e,r)=>{var t,n,a,i,s,o;return(0,F.jsxs)(J,{children:[(0,F.jsx)(V,{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant_name||"-"}),(0,F.jsx)(V,{children:(null===(t=e.plan)||void 0===t?void 0:t.name)||"No Plan"}),(0,F.jsx)(V,{children:(0,c.vv)((null===(n=e.current_month)||void 0===n?void 0:n.revenue)||0,ne)}),(0,F.jsx)(V,{children:(null===(a=e.current_month)||void 0===a?void 0:a.order_count)||0}),(0,F.jsx)(V,{children:(0,c.vv)((null===(i=e.current_month)||void 0===i?void 0:i.estimated_charges)||0,ne)}),(0,F.jsx)(V,{children:(0,F.jsx)(ee,{status:(null===(s=e.latest_invoice)||void 0===s?void 0:s.status)||"none",children:((null===(o=e.latest_invoice)||void 0===o?void 0:o.status)||"N/A").replace(/_/g," ")})})]},r)}):(0,F.jsx)(J,{children:(0,F.jsx)(V,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No restaurant data available"})})})]})})]})]})}},4021:(e,r,t)=>{t.d(r,{i1:()=>o});var n=t(9950),a=t(1367),i=t(6038),s=t(9955);const o=()=>{const{user:e}=(0,a.As)(),[r,t]=(0,n.useState)("RM"),[o]=(0,n.useState)(Object.keys(i.DL)),[d,l]=(0,n.useState)(!0),[c,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),n=r.indexOf("restaurant");let a=n>=0?r[n+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void l(!1);try{const e=(0,s.c4)(),r=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var i;const e=await r.json(),n=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";t(n)}else t("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),t("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:o,loading:d,error:c}}},8608:(e,r,t)=>{t.d(r,{d:()=>s});var n=t(9950),a=t(9955);function i(e){if(!e)return!1;const r=e.business_registration||e.registration_no,t=e.tax_id||e.tax_no;return!(!e.address||!e.phone||!r&&!t)}function s(e){const[r,t]=(0,n.useState)([]),[s,o]=(0,n.useState)(!0),{role:d,restaurantId:l,brandId:c,foodcourtId:p}=e;return(0,n.useEffect)(()=>{(async()=>{try{o(!0);const x=function(){const e=(0,a.c4)(),r={"Content-Type":"application/json"};return e&&(r.Authorization=`Bearer ${e}`),r}();if("Restaurant Admin"!==d&&"Staff"!==d||!l)if("Brand General"!==d&&"Brand Manager"!==d||!c)if("Foodcourt General"!==d&&"Foodcourt Manager"!==d||!p)t([]);else{const[e,r]=await Promise.all([fetch("/api/foodcourts/company-info",{headers:x}),fetch(`/api/foodcourts/${p}/restaurants`,{headers:x})]);let n=null,a=!1;if(e.ok){const r=await e.json();n=r.data||r}if(r.ok){const e=(await r.json()).data||[];a=!!Array.isArray(e)&&e.length>0}t([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/foodcourt/company-info",completed:i(n)},{key:"tenant_restaurants",label:"Add Tenant Restaurants",description:"Link restaurants to your foodcourt to manage them together",path:"/pos/foodcourt/general/management",completed:a}])}else{const[e,r,n,a]=await Promise.all([fetch("/api/brands/company-info",{headers:x}),fetch("/api/brand-products?limit=1",{headers:x}),fetch("/api/product-recipes?limit=1",{headers:x}),fetch("/api/product-ingredients?limit=1",{headers:x})]);let s=null,o=!1,d=!1,l=!1;if(e.ok){const r=await e.json();s=r.data||r}if(r.ok){const e=(await r.json()).data||[];o=!!Array.isArray(e)&&e.length>0}if(n.ok){const e=(await n.json()).data||[];d=!!Array.isArray(e)&&e.length>0}if(a.ok){const e=(await a.json()).data||[];l=!!Array.isArray(e)&&e.length>0}t([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/brand/company-info",completed:i(s)},{key:"brand_products",label:"Add Brand Products",description:"Register your brand products to share across restaurant locations",path:"/pos/brand-products",completed:o},{key:"product_recipes",label:"Set up Product Recipes",description:"Define recipes for your brand products to track ingredient usage",path:"/pos/brand-product-recipes",completed:d},{key:"brand_ingredients",label:"Add Brand Ingredients",description:"Add ingredients used in your brand product recipes",path:"/pos/brand-ingredients",completed:l}])}else{var e,r,n,s,u;const[a,o,d,c,p,g]=await Promise.all([fetch(`/api/restaurants/${l}/company-info`,{headers:x}),fetch(`/api/restaurants/${l}`,{headers:x}),fetch(`/api/categories?restaurantId=${l}`,{headers:x}),fetch(`/api/menu?restaurant_id=${l}&excludeImage=true`,{headers:x}),fetch(`/api/kitchen-stations?restaurant_id=${l}`,{headers:x}),fetch("/api/notification-settings/preferences",{headers:x})]);let f=null,y=null,m=0,v=0,j=0,A=!1;if(a.ok){const e=await a.json();f=e.data||e}if(o.ok){const e=await o.json();y=e.data||e}if(d.ok){const e=(await d.json()).data||[];m=Array.isArray(e)?e.length:0}if(c.ok){var h;const e=await c.json(),r=(null===(h=e.data)||void 0===h?void 0:h.items)||e.data||[];v=Array.isArray(r)?r.length:0}if(p.ok){const e=(await p.json()).data||[];j=Array.isArray(e)?e.length:0}if(g.ok){var b;A=!(null===(b=(await g.json()).data)||void 0===b||!b.preferences)}const k=i(f),F=!(null===(e=y)||void 0===e||!e.currency),w=null===(r=y)||void 0===r?void 0:r.operation_settings,C=!(null===w||void 0===w||!w.timeZone),D=F&&C,E=!(null===w||void 0===w||!w.openingTime||null===w||void 0===w||!w.closingTime),S=m>0,_=v>0,$=null===(n=y)||void 0===n?void 0:n.payment_settings;let B=!1;$&&"object"===typeof $&&(B=Object.entries($).some(e=>{let[r,t]=e;return!("_order"===r||!t||"object"!==typeof t)&&(t.enabled&&Array.isArray(t.availableIn)&&t.availableIn.includes("pos"))}));const G=j>0,I=null===(s=y)||void 0===s?void 0:s.floor_plan,R=!!(I&&Array.isArray(I)&&I.length>0)||!(!I||"object"!==typeof I||Array.isArray(I)||!(Array.isArray(I.tables)?I.tables.length>0:Array.isArray(I.elements)&&I.elements.length>0)),z=null===w||void 0===w?void 0:w.orderTypes,P=!(!z||"object"!==typeof z||!Object.values(z).some(e=>!0===e)),N=A,M=null===(u=y)||void 0===u?void 0:u.table_settings,O=!(null===M||void 0===M||!M.qrCodeBaseUrl);t([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:`/restaurant/${l}/company-information`,completed:k},{key:"store_settings",label:"Set Currency & Timezone",description:"Configure your currency and timezone for accurate transactions",path:`/restaurant/${l}/settings?tab=store`,completed:D},{key:"operating_hours",label:"Set Operating Hours",description:"Configure opening/closing times for your restaurant",path:`/restaurant/${l}/settings?tab=operations`,completed:E},{key:"categories",label:"Add Categories",description:"Create menu categories to organize items and route to kitchen stations",path:`/restaurant/${l}/categories`,completed:S},{key:"menu_items",label:"Add Menu Items",description:"Register at least one menu item to start taking orders",path:`/restaurant/${l}/menu`,completed:_},{key:"payment_methods",label:"Configure Payment Methods",description:"Enable at least one payment method for POS transactions",path:`/restaurant/${l}/settings?tab=payment`,completed:B},{key:"kitchen_stations",label:"Set up Kitchen Stations",description:"Configure kitchen stations to route orders to the right preparation area",path:`/restaurant/${l}/settings?tab=kitchenStations`,completed:G},{key:"floor_plan",label:"Configure Floor Plan",description:"Set up your restaurant floor plan with tables for dine-in orders",path:`/restaurant/${l}/floor-plan-editor`,completed:R},{key:"mobile_order",label:"Configure Mobile Order",description:"Enable order types (dine-in, takeaway, delivery) for your restaurant",path:`/restaurant/${l}/settings?tab=mobileOrder`,completed:P},{key:"notifications",label:"Set up Notifications",description:"Configure notification preferences to stay informed about your restaurant",path:`/restaurant/${l}/notification-settings`,completed:N},{key:"qr_codes",label:"Set up QR Codes",description:"Generate QR codes for tables to enable mobile ordering",path:`/restaurant/${l}/settings?tab=operations`,completed:O}])}}catch(x){console.error("useSetupStatus Error:",x),t([])}finally{o(!1)}})()},[d,l,c,p]),{items:r,loading:s}}}}]);