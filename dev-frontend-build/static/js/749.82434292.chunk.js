"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[749],{749:(e,r,t)=>{t.r(r),t.d(r,{default:()=>te});var a=t(9950),n=t(4492),i=t(4752),s=t(8409),o=t(843),d=t(4021),l=t(8608),c=t(6038),p=t(1367),u=t(1095),h=t(2847),b=t(3245),x=t(158),g=t(3440),f=t(2174),m=t(4915),y=t(7621),v=t(5297),j=t(2528),k=t(5030),A=t(4414);const F=i.Ay.div`
  min-height: 100vh;
`,w=i.Ay.div`
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
`,C=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,D=i.Ay.h1`
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
`,E=i.Ay.span`
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
`,_=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,$=i.Ay.div`
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
`,B=i.Ay.div`
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
`,G=i.Ay.div`
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
`,R=i.Ay.div`
  flex: 1;
  min-width: 0;
`,z=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,P=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,N=i.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,M=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,O=i.Ay.div`
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
`,T=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,q=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,L=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,X=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,W=i.Ay.div`
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
`,K=i.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,U=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,Y=i.Ay.thead`
  background: #F8FAFC;
`,Q=i.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Z=i.Ay.tbody``,H=i.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,J=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,V=i.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,ee=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`,re=["#DC2626","#EF4444","#F87171","#FCA5A5","#FECACA","#FEE2E2","#FFF5F5"],te=()=>{const{t:e}=(0,k.Bd)("brand"),r=(0,n.Zp)(),{user:t}=(0,p.As)(),{defaultCurrency:i}=(0,d.i1)(),[te,ae]=(0,a.useState)("RM"),[ne,ie]=(0,a.useState)(!0),[se,oe]=(0,a.useState)(null),[de,le]=(0,a.useState)("year"),{items:ce}=(0,l.d)({role:(null===t||void 0===t?void 0:t.role)||"",brandId:null===t||void 0===t?void 0:t.brand_id}),[pe,ue]=(0,a.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerRestaurant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[he,be]=(0,a.useState)([]),[xe,ge]=(0,a.useState)([]),[fe,me]=(0,a.useState)({}),[ye,ve]=(0,a.useState)([]),[je,ke]=(0,a.useState)([]),[Ae,Fe]=(0,a.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,a.useEffect)(()=>{i&&ae(i)},[i]),(0,a.useEffect)(()=>{De(),we()},[]);const we=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&Fe(e.data)}}catch{}};(0,a.useEffect)(()=>{se&&Se(se)},[de,se]);const Ce=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),De=async()=>{try{if(!localStorage.getItem("auth_token"))return;ie(!0);const e=Ce(),r=await fetch("/api/brands",{headers:e}),a=await r.json(),n=(a.data||a||[])[0];if(!n)return void ie(!1);oe(n.id),n.restaurants&&n.restaurants.length>0&&n.restaurants[0].currency&&ae(n.restaurants[0].currency);const i=new Date,s=new Date(i.getFullYear(),i.getMonth(),1).toISOString().split("T")[0],o=i.toISOString().split("T")[0],[d,l,c,p,u,h]=await Promise.all([fetch(`/api/brands/${n.id}/revenue?start_date=${s}&end_date=${o}`,{headers:e}),fetch(`/api/brands/${n.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Brand Manager",{headers:e}),fetch(`/api/brands/${n.id}/subscriptions`,{headers:e}),fetch("/api/restaurants/subscription-status",{headers:e})]),[b,x,g,f,m,y]=await Promise.all([d.json(),l.json(),c.json(),p.json(),u.json(),h.json()]),v=y.data||y;if(v.subscriptionStatus){const r=await fetch(`/api/users/${null===t||void 0===t?void 0:t.id}`,{headers:e}),a=await r.json(),i=a.data||a;me({planType:i.plan_type||n.plan_type,status:v.subscriptionStatus,daysLeft:i.subscription_end?Math.ceil((new Date(i.subscription_end).getTime()-Date.now())/864e5):void 0})}const j=b.data||b,k=parseFloat(j.total_revenue||0),A=j.restaurants||[],F=A.reduce((e,r)=>e+(r.order_count||0),0);ge(A);const w=(x.data||x||[]).filter(e=>!1!==e.is_active).length,C=g.data||g||[],D=C.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,S=C.filter(e=>"overdue"===e.status).length,E=Array.isArray(f)?f:f.data||[],_=m.data||m||[];ve(_),ue({totalRestaurants:A.length,monthlyRevenue:k,monthlyOrders:F,avgRevenuePerRestaurant:A.length>0?k/A.length:0,pendingInvoices:D,overdueInvoices:S,activePlans:w,totalManagers:E.length});const $=[];S>0&&$.push({type:"warning",title:"Overdue Invoices",message:`${S} invoice(s) need attention`,link:"/pos/brand/invoices"}),D>0&&$.push({type:"info",title:"Pending Invoices",message:`${D} invoice(s) pending payment`,link:"/pos/brand/invoices"});const B=A.filter(e=>0===(e.order_count||0));B.length>0&&$.push({type:"info",title:"No Orders",message:`${B.length} restaurant(s) with no orders this month`,link:"/pos/brand/general/management"}),Ae.notices>0&&$.push({type:"info",title:"Unread Notices",message:`${Ae.notices} unread notice(s)`,link:"/pos/brand/notices"}),Ae.systemInquiry>0&&$.push({type:"info",title:"System Inquiry",message:`${Ae.systemInquiry} inquiry(s) with new replies`,link:"/pos/brand/system-inquiry"}),Ae.operationInquiry>0&&$.push({type:"info",title:"Operation Inquiry",message:`${Ae.operationInquiry} open inquiry(s)`,link:"/pos/brand/operation-inquiry"}),0===$.length&&$.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),ke($),Se(n.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{ie(!1)}},Se=async e=>{try{if(!localStorage.getItem("auth_token"))return;const r=Ce(),t=await fetch(`/api/brands/${e}/sales-trend?period=${de}`,{headers:r}),a=await t.json();be(a.data||[])}catch(r){console.error("Error fetching trend data:",r)}},Ee=xe.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,r)=>r.value-e.value).slice(0,7),_e=[...ye].sort((e,r)=>{var t,a;return((null===(t=r.current_month)||void 0===t?void 0:t.revenue)||0)-((null===(a=e.current_month)||void 0===a?void 0:a.revenue)||0)}).slice(0,5);return ne?(0,A.jsxs)(F,{children:[(0,A.jsx)(w,{children:(0,A.jsx)(D,{children:e("brand:brandGeneralDashboard.brandDashboard")})}),(0,A.jsx)(C,{children:(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:e("brand:brandGeneralDashboard.loadingDashboard")})})]}):(0,A.jsxs)(F,{children:[(0,A.jsxs)(w,{children:[(0,A.jsx)(D,{children:e("brand:brandGeneralDashboard.brandDashboard")}),fe.planType&&(0,A.jsxs)(S,{children:[(0,A.jsx)("span",{children:fe.planType}),(()=>{const t=fe;return"trial"===t.status?(0,A.jsxs)(E,{variant:"trial",onClick:()=>r("/pos/profile?tab=subscription"),children:["Trial",void 0!==t.daysLeft?" \u2022 "+(t.daysLeft>0?t.daysLeft+" days left":"Expired"):""]}):"active"===t.status&&void 0!==t.daysLeft?t.daysLeft<=0?(0,A.jsx)(E,{variant:"expired",onClick:()=>r("/pos/profile?tab=subscription"),children:e("brand:brandGeneralDashboard.expired")}):t.daysLeft<=30?(0,A.jsxs)(E,{variant:"expiring",onClick:()=>r("/pos/profile?tab=subscription"),children:[t.daysLeft," days left"]}):(0,A.jsxs)(E,{variant:"active",onClick:()=>r("/pos/profile?tab=subscription"),children:[t.daysLeft," days left"]}):"expired"===t.status||"suspended"===t.status?(0,A.jsx)(E,{variant:"expired",onClick:()=>r("/pos/profile?tab=subscription"),children:t.status}):(0,A.jsx)(E,{variant:"active",onClick:()=>r("/pos/profile?tab=subscription"),children:e("brand:brandGeneralDashboard.active")})})()]})]}),(0,A.jsxs)(C,{children:[ce.length>0&&(0,A.jsx)(o.eP,{items:ce,entityId:`brand_${null===t||void 0===t?void 0:t.brand_id}`}),(0,A.jsxs)(s.Ot,{children:[(0,A.jsxs)(s.XS,{color:"#DC2626",children:[(0,A.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.franchiseRestaurants")}),(0,A.jsx)(s.G$,{children:pe.totalRestaurants})]}),(0,A.jsxs)(s.XS,{color:"#059669",children:[(0,A.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.monthlyRevenue")}),(0,A.jsx)(s.G$,{children:(0,c.vv)(pe.monthlyRevenue,te)})]}),(0,A.jsxs)(s.XS,{color:"#2563EB",children:[(0,A.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.monthlyOrders")}),(0,A.jsx)(s.G$,{children:pe.monthlyOrders.toLocaleString()})]}),(0,A.jsxs)(s.XS,{color:"#7C3AED",children:[(0,A.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.avgRevenueRestaurant")}),(0,A.jsx)(s.G$,{children:(0,c.vv)(pe.avgRevenuePerRestaurant,te)})]}),(0,A.jsxs)(s.XS,{color:"#F59E0B",children:[(0,A.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.pendingInvoices")}),(0,A.jsx)(s.G$,{children:pe.pendingInvoices})]}),(0,A.jsxs)(s.XS,{color:pe.overdueInvoices>0?"#EF4444":"#059669",children:[(0,A.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.overdueInvoices")}),(0,A.jsx)(s.G$,{children:pe.overdueInvoices})]}),(0,A.jsxs)(s.XS,{color:"#10B981",children:[(0,A.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.activePlans")}),(0,A.jsx)(s.G$,{children:pe.activePlans})]}),(0,A.jsxs)(s.XS,{color:"#6366F1",children:[(0,A.jsx)(s.h2,{children:e("brand:brandGeneralDashboard.brandManagers")}),(0,A.jsx)(s.G$,{children:pe.totalManagers})]})]}),(0,A.jsxs)(_,{children:[(0,A.jsxs)($,{children:[(0,A.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,A.jsx)("h3",{style:{margin:0},children:e("brand:brandGeneralDashboard.revenueTrend")}),(0,A.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,A.jsx)("button",{onClick:()=>le(e),style:{padding:"6px 12px",background:de===e?"#635BFF":"transparent",color:de===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),he.length>0?(0,A.jsx)(u.u,{width:"100%",height:240,children:(0,A.jsxs)(h.b,{data:he,children:[(0,A.jsx)(b.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,A.jsx)(x.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,A.jsx)(g.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,A.jsx)(f.m,{formatter:e=>[(0,c.vv)(e,te),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,A.jsx)(m.N,{type:"monotone",dataKey:"sales",stroke:"#DC2626",strokeWidth:2,dot:{r:4,fill:"#DC2626"},activeDot:{r:6}})]})}):(0,A.jsx)(ee,{children:e("brand:brandGeneralDashboard.noSalesDataForThisPeriod")})]}),(0,A.jsxs)(B,{children:[(0,A.jsx)("h3",{children:e("brand:brandGeneralDashboard.notifications")}),(0,A.jsx)(I,{children:je.map((e,t)=>(0,A.jsx)(G,{type:e.type,onClick:()=>e.link&&r(e.link),children:(0,A.jsxs)(R,{children:[(0,A.jsx)(z,{type:e.type,children:e.title}),(0,A.jsx)(P,{children:e.message})]})},t))})]})]}),(0,A.jsxs)(N,{children:[(0,A.jsx)("h3",{children:e("brand:brandGeneralDashboard.quickActions")}),(0,A.jsxs)(M,{children:[(0,A.jsxs)(O,{onClick:()=>r("/pos/brand/general/management"),children:[(0,A.jsx)("div",{className:"icon",children:"\u25ac"}),(0,A.jsx)("div",{className:"title",children:e("brand:brandGeneralDashboard.brands")}),(0,A.jsx)("div",{className:"description",children:e("brand:brandGeneralDashboard.brandManagement")})]}),(0,A.jsxs)(O,{onClick:()=>r("/pos/brand/invoices"),children:[(0,A.jsx)("div",{className:"icon",children:"\u25a6"}),(0,A.jsx)("div",{className:"title",children:e("brand:brandGeneralDashboard.invoices")}),(0,A.jsx)("div",{className:"description",children:e("brand:brandGeneralDashboard.invoiceManagement")})]}),(0,A.jsxs)(O,{onClick:()=>r("/pos/brand/plans"),children:[(0,A.jsx)("div",{className:"icon",children:"\u2630"}),(0,A.jsx)("div",{className:"title",children:e("brand:brandGeneralDashboard.subscriptionPlans")}),(0,A.jsx)("div",{className:"description",children:e("brand:brandGeneralDashboard.planConfiguration")})]}),(0,A.jsxs)(O,{onClick:()=>r("/pos/brand/general/reports"),children:[(0,A.jsx)("div",{className:"icon",children:"\u25c9"}),(0,A.jsx)("div",{className:"title",children:e("brand:brandGeneralDashboard.reports")}),(0,A.jsx)("div",{className:"description",children:e("brand:brandGeneralDashboard.performanceAnalytics")})]})]})]}),(0,A.jsx)(T,{children:(0,A.jsxs)(q,{children:[(0,A.jsx)(L,{children:(0,A.jsx)(X,{children:e("brand:brandGeneralDashboard.revenueDistribution")})}),Ee.length>0?(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,A.jsx)(u.u,{width:"50%",height:220,children:(0,A.jsxs)(y.r,{children:[(0,A.jsx)(v.F,{data:Ee,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:Ee.map((e,r)=>(0,A.jsx)(j.f,{fill:re[r%re.length]},r))}),(0,A.jsx)(f.m,{formatter:e=>(0,c.vv)(e,te)})]})}),(0,A.jsx)("div",{style:{flex:1},children:Ee.map((e,r)=>(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,A.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:re[r%re.length],flexShrink:0}}),(0,A.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,A.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,c.vv)(e.value,te)})]},r))})]}):(0,A.jsx)(ee,{children:e("brand:brandGeneralDashboard.noRevenueDataAvailable")})]})}),(0,A.jsx)(W,{children:(0,A.jsx)("h3",{children:e("brand:brandGeneralDashboard.restaurantPerformance")})}),(0,A.jsx)(K,{children:(0,A.jsxs)(U,{children:[(0,A.jsx)(Y,{children:(0,A.jsxs)(H,{children:[(0,A.jsx)(Q,{children:e("brand:brandGeneralDashboard.restaurant")}),(0,A.jsx)(Q,{children:e("brand:brandGeneralDashboard.plan")}),(0,A.jsx)(Q,{children:e("brand:brandGeneralDashboard.monthlyRevenue")}),(0,A.jsx)(Q,{children:e("brand:brandGeneralDashboard.orders")}),(0,A.jsx)(Q,{children:e("brand:brandGeneralDashboard.estimatedCharges")}),(0,A.jsx)(Q,{children:e("brand:brandGeneralDashboard.invoiceStatus")})]})}),(0,A.jsx)(Z,{children:_e.length>0?_e.map((e,r)=>{var t,a,n,i,s,o;return(0,A.jsxs)(H,{children:[(0,A.jsx)(J,{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant_name||"-"}),(0,A.jsx)(J,{children:(null===(t=e.plan)||void 0===t?void 0:t.name)||"No Plan"}),(0,A.jsx)(J,{children:(0,c.vv)((null===(a=e.current_month)||void 0===a?void 0:a.revenue)||0,te)}),(0,A.jsx)(J,{children:(null===(n=e.current_month)||void 0===n?void 0:n.order_count)||0}),(0,A.jsx)(J,{children:(0,c.vv)((null===(i=e.current_month)||void 0===i?void 0:i.estimated_charges)||0,te)}),(0,A.jsx)(J,{children:(0,A.jsx)(V,{status:(null===(s=e.latest_invoice)||void 0===s?void 0:s.status)||"none",children:((null===(o=e.latest_invoice)||void 0===o?void 0:o.status)||"N/A").replace(/_/g," ")})})]},r)}):(0,A.jsx)(H,{children:(0,A.jsx)(J,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No restaurant data available"})})})]})})]})]})}},4021:(e,r,t)=>{t.d(r,{i1:()=>s});var a=t(9950),n=t(1367),i=t(6038);const s=()=>{const{user:e}=(0,n.As)(),[r,t]=(0,a.useState)("RM"),[s]=(0,a.useState)(Object.keys(i.DL)),[o,d]=(0,a.useState)(!0),[l,c]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),a=r.indexOf("restaurant");let n=a>=0?r[a+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var i;const e=await r.json(),a=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";t(a)}else t("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),c("Failed to load currency settings"),t("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:s,loading:o,error:l}}},8608:(e,r,t)=>{t.d(r,{d:()=>i});var a=t(9950);function n(e){if(!e)return!1;const r=e.business_registration||e.registration_no,t=e.tax_id||e.tax_no;return!(!e.address||!e.phone||!r&&!t)}function i(e){const[r,t]=(0,a.useState)([]),[i,s]=(0,a.useState)(!0),{role:o,restaurantId:d,brandId:l,foodcourtId:c}=e;return(0,a.useEffect)(()=>{(async()=>{try{s(!0);const b=function(){const e=localStorage.getItem("auth_token"),r={"Content-Type":"application/json"};return e&&(r.Authorization=`Bearer ${e}`),r}();if("Restaurant Admin"!==o&&"Staff"!==o||!d)if("Brand General"!==o&&"Brand Manager"!==o||!l)if("Foodcourt General"!==o&&"Foodcourt Manager"!==o||!c)t([]);else{const[e,r]=await Promise.all([fetch("/api/foodcourts/company-info",{headers:b}),fetch(`/api/foodcourts/${c}/restaurants`,{headers:b})]);let a=null,i=!1;if(e.ok){const r=await e.json();a=r.data||r}if(r.ok){const e=(await r.json()).data||[];i=!!Array.isArray(e)&&e.length>0}t([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/foodcourt/company-info",completed:n(a)},{key:"tenant_restaurants",label:"Add Tenant Restaurants",description:"Link restaurants to your foodcourt to manage them together",path:"/pos/foodcourt/general/management",completed:i}])}else{const[e,r,a,i]=await Promise.all([fetch("/api/brands/company-info",{headers:b}),fetch("/api/brand-products?limit=1",{headers:b}),fetch("/api/product-recipes?limit=1",{headers:b}),fetch("/api/product-ingredients?limit=1",{headers:b})]);let s=null,o=!1,d=!1,l=!1;if(e.ok){const r=await e.json();s=r.data||r}if(r.ok){const e=(await r.json()).data||[];o=!!Array.isArray(e)&&e.length>0}if(a.ok){const e=(await a.json()).data||[];d=!!Array.isArray(e)&&e.length>0}if(i.ok){const e=(await i.json()).data||[];l=!!Array.isArray(e)&&e.length>0}t([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/brand/company-info",completed:n(s)},{key:"brand_products",label:"Add Brand Products",description:"Register your brand products to share across restaurant locations",path:"/pos/brand-products",completed:o},{key:"product_recipes",label:"Set up Product Recipes",description:"Define recipes for your brand products to track ingredient usage",path:"/pos/brand-product-recipes",completed:d},{key:"brand_ingredients",label:"Add Brand Ingredients",description:"Add ingredients used in your brand product recipes",path:"/pos/brand-ingredients",completed:l}])}else{var e,r,a,i,p;const[s,o,l,c,x,g]=await Promise.all([fetch(`/api/restaurants/${d}/company-info`,{headers:b}),fetch(`/api/restaurants/${d}`,{headers:b}),fetch(`/api/categories?restaurantId=${d}`,{headers:b}),fetch(`/api/menu?restaurant_id=${d}&excludeImage=true`,{headers:b}),fetch(`/api/kitchen-stations?restaurant_id=${d}`,{headers:b}),fetch("/api/notification-settings/preferences",{headers:b})]);let f=null,m=null,y=0,v=0,j=0,k=!1;if(s.ok){const e=await s.json();f=e.data||e}if(o.ok){const e=await o.json();m=e.data||e}if(l.ok){const e=(await l.json()).data||[];y=Array.isArray(e)?e.length:0}if(c.ok){var u;const e=await c.json(),r=(null===(u=e.data)||void 0===u?void 0:u.items)||e.data||[];v=Array.isArray(r)?r.length:0}if(x.ok){const e=(await x.json()).data||[];j=Array.isArray(e)?e.length:0}if(g.ok){var h;k=!(null===(h=(await g.json()).data)||void 0===h||!h.preferences)}const A=n(f),F=!(null===(e=m)||void 0===e||!e.currency),w=null===(r=m)||void 0===r?void 0:r.operation_settings,C=!(null===w||void 0===w||!w.timeZone),D=F&&C,S=!(null===w||void 0===w||!w.openingTime||null===w||void 0===w||!w.closingTime),E=y>0,_=v>0,$=null===(a=m)||void 0===a?void 0:a.payment_settings;let B=!1;$&&"object"===typeof $&&(B=Object.entries($).some(e=>{let[r,t]=e;return!("_order"===r||!t||"object"!==typeof t)&&(t.enabled&&Array.isArray(t.availableIn)&&t.availableIn.includes("pos"))}));const I=j>0,G=null===(i=m)||void 0===i?void 0:i.floor_plan,R=!!(G&&Array.isArray(G)&&G.length>0)||!(!G||"object"!==typeof G||Array.isArray(G)||!(Array.isArray(G.tables)?G.tables.length>0:Array.isArray(G.elements)&&G.elements.length>0)),z=null===w||void 0===w?void 0:w.orderTypes,P=!(!z||"object"!==typeof z||!Object.values(z).some(e=>!0===e)),N=k,M=null===(p=m)||void 0===p?void 0:p.table_settings,O=!(null===M||void 0===M||!M.qrCodeBaseUrl);t([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:`/restaurant/${d}/company-information`,completed:A},{key:"store_settings",label:"Set Currency & Timezone",description:"Configure your currency and timezone for accurate transactions",path:`/restaurant/${d}/settings?tab=store`,completed:D},{key:"operating_hours",label:"Set Operating Hours",description:"Configure opening/closing times for your restaurant",path:`/restaurant/${d}/settings?tab=operations`,completed:S},{key:"categories",label:"Add Categories",description:"Create menu categories to organize items and route to kitchen stations",path:`/restaurant/${d}/categories`,completed:E},{key:"menu_items",label:"Add Menu Items",description:"Register at least one menu item to start taking orders",path:`/restaurant/${d}/menu`,completed:_},{key:"payment_methods",label:"Configure Payment Methods",description:"Enable at least one payment method for POS transactions",path:`/restaurant/${d}/settings?tab=payment`,completed:B},{key:"kitchen_stations",label:"Set up Kitchen Stations",description:"Configure kitchen stations to route orders to the right preparation area",path:`/restaurant/${d}/settings?tab=kitchenStations`,completed:I},{key:"floor_plan",label:"Configure Floor Plan",description:"Set up your restaurant floor plan with tables for dine-in orders",path:`/restaurant/${d}/floor-plan-editor`,completed:R},{key:"mobile_order",label:"Configure Mobile Order",description:"Enable order types (dine-in, takeaway, delivery) for your restaurant",path:`/restaurant/${d}/settings?tab=mobileOrder`,completed:P},{key:"notifications",label:"Set up Notifications",description:"Configure notification preferences to stay informed about your restaurant",path:`/restaurant/${d}/notification-settings`,completed:N},{key:"qr_codes",label:"Set up QR Codes",description:"Generate QR codes for tables to enable mobile ordering",path:`/restaurant/${d}/settings?tab=operations`,completed:O}])}}catch(b){console.error("useSetupStatus Error:",b),t([])}finally{s(!1)}})()},[o,d,l,c]),{items:r,loading:i}}}}]);