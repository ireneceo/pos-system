"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[441],{441:(e,t,o)=>{o.r(t),o.d(t,{default:()=>re});var r=o(9950),n=o(4492),a=o(4752),i=o(8409),s=o(843),d=o(4021),c=o(8608),l=o(6038),u=o(1367),p=o(1095),h=o(2847),f=o(3245),x=o(158),g=o(3440),y=o(2174),m=o(4915),v=o(7621),b=o(5297),j=o(7766),A=o(5030),k=o(9955),F=o(4414);const w=a.Ay.div`
  min-height: 100vh;
`,C=a.Ay.div`
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
`,D=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,E=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,S=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7C93;
  margin-top: 4px;
`,_=a.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  ${e=>{let{variant:t}=e;switch(t){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
  &:hover { opacity: 0.8; }
`,B=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,$=a.Ay.div`
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
`,G=a.Ay.div`
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
`,I=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,R=a.Ay.div`
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
`,z=a.Ay.div`
  flex: 1;
  min-width: 0;
`,P=a.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,N=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,T=a.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,M=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,O=a.Ay.div`
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
`,q=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,L=a.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,X=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,W=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,K=a.Ay.div`
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
`,U=a.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,Y=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,Q=a.Ay.thead`
  background: #F8FAFC;
`,Z=a.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,H=a.Ay.tbody``,J=a.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,V=a.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,ee=a.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,te=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`,oe=["#EA580C","#F97316","#FB923C","#FDBA74","#FED7AA","#FFF7ED","#FFFBEB"],re=()=>{const{t:e}=(0,A.Bd)("foodcourt"),t=(0,n.Zp)(),{user:o}=(0,u.As)(),{defaultCurrency:a}=(0,d.i1)(),[re,ne]=(0,r.useState)("RM"),[ae,ie]=(0,r.useState)(!0),[se,de]=(0,r.useState)(null),[ce,le]=(0,r.useState)("year"),{items:ue}=(0,c.d)({role:(null===o||void 0===o?void 0:o.role)||"",foodcourtId:null===o||void 0===o?void 0:o.foodcourt_id}),[pe,he]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerTenant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[fe,xe]=(0,r.useState)([]),[ge,ye]=(0,r.useState)([]),[me,ve]=(0,r.useState)([]),[be,je]=(0,r.useState)([]),[Ae,ke]=(0,r.useState)({}),[Fe,we]=(0,r.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,r.useEffect)(()=>{a&&ne(a)},[a]),(0,r.useEffect)(()=>{Ee(),Ce()},[]);const Ce=async()=>{try{const e=(0,k.c4)();if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&we(e.data)}}catch{}};(0,r.useEffect)(()=>{se&&Se(se)},[ce,se]);const De=()=>({Authorization:`Bearer ${(0,k.c4)()}`,"Content-Type":"application/json"}),Ee=async()=>{try{if(!(0,k.c4)())return;ie(!0);const t=De(),r=await fetch("/api/foodcourts",{headers:t}),n=await r.json(),a=(n.data||n||[])[0];if(!a)return void ie(!1);de(a.id),a.restaurants&&a.restaurants.length>0&&a.restaurants[0].currency&&ne(a.restaurants[0].currency);const i=new Date,s=new Date(i.getFullYear(),i.getMonth(),1).toISOString().split("T")[0],d=i.toISOString().split("T")[0],[c,l,u,p,h]=await Promise.all([fetch(`/api/foodcourts/${a.id}/revenue?start_date=${s}&end_date=${d}`,{headers:t}),fetch(`/api/foodcourts/${a.id}/plans`,{headers:t}),fetch("/api/invoices",{headers:t}),fetch("/api/users?role=Foodcourt Manager",{headers:t}),fetch(`/api/foodcourts/${a.id}/subscriptions`,{headers:t})]),[f,x,g,y,m]=await Promise.all([c.json(),l.json(),u.json(),p.json(),h.json()]),v=f.data||f,b=parseFloat(v.total_revenue||0),j=v.restaurants||[],A=j.reduce((e,t)=>e+(t.order_count||0),0);xe(j);const F=(x.data||x||[]).filter(e=>!1!==e.is_active).length,w=g.data||g||[],C=w.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,D=w.filter(e=>"overdue"===e.status).length,E=Array.isArray(y)?y:y.data||[],S=m.data||m||[];ve(S),he({totalRestaurants:j.length,monthlyRevenue:b,monthlyOrders:A,avgRevenuePerTenant:j.length>0?b/j.length:0,pendingInvoices:C,overdueInvoices:D,activePlans:F,totalManagers:E.length});const _=[];D>0&&_.push({type:"warning",title:"Overdue Invoices",message:`${D} invoice(s) need attention`,link:"/pos/foodcourt/invoices"}),C>0&&_.push({type:"info",title:"Pending Invoices",message:`${C} invoice(s) pending payment`,link:"/pos/foodcourt/invoices"});const B=j.filter(e=>0===(e.order_count||0));B.length>0&&_.push({type:"info",title:"No Orders",message:`${B.length} tenant(s) with no orders this month`,link:"/pos/foodcourt/general/management"}),Fe.notices>0&&_.push({type:"info",title:"Unread Notices",message:`${Fe.notices} unread notice(s)`,link:"/pos/foodcourt/notices"}),Fe.systemInquiry>0&&_.push({type:"info",title:"System Inquiry",message:`${Fe.systemInquiry} inquiry(s) with new replies`,link:"/pos/foodcourt/system-inquiry"}),Fe.operationInquiry>0&&_.push({type:"info",title:"Operation Inquiry",message:`${Fe.operationInquiry} open inquiry(s)`,link:"/pos/foodcourt/operation-inquiry"}),0===_.length&&_.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),je(_);try{const e=await fetch("/api/restaurants/subscription-status",{headers:t}),r=await e.json(),n=r.data||r,i=await fetch(`/api/users/${null===o||void 0===o?void 0:o.id}`,{headers:t}),s=await i.json(),d=s.data||s;ke({planType:d.plan_type||a.plan_type,status:n.subscriptionStatus,daysLeft:d.subscription_end?Math.ceil((new Date(d.subscription_end).getTime()-Date.now())/864e5):void 0})}catch(e){}Se(a.id)}catch(t){console.error("Error fetching dashboard data:",t)}finally{ie(!1)}},Se=async e=>{try{if(!(0,k.c4)())return;const t=De(),o=await fetch(`/api/foodcourts/${e}/sales-trend?period=${ce}`,{headers:t}),r=await o.json();ye(r.data||[])}catch(t){console.error("Error fetching trend data:",t)}},_e=fe.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,t)=>t.value-e.value).slice(0,7),Be=[...me].sort((e,t)=>{var o,r;return((null===(o=t.current_month)||void 0===o?void 0:o.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return ae?(0,F.jsxs)(w,{children:[(0,F.jsx)(C,{children:(0,F.jsx)(E,{children:e("foodcourt:foodcourtGeneralDashboard.foodcourtDashboard")})}),(0,F.jsx)(D,{children:(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:e("foodcourt:foodcourtGeneralDashboard.loadingDashboard")})})]}):(0,F.jsxs)(w,{children:[(0,F.jsxs)(C,{children:[(0,F.jsx)(E,{children:e("foodcourt:foodcourtGeneralDashboard.foodcourtDashboard")}),Ae.planType&&(0,F.jsxs)(S,{children:[(0,F.jsx)("span",{children:Ae.planType}),(()=>{const o=Ae;return"trial"===o.status?(0,F.jsxs)(_,{variant:"trial",onClick:()=>t("/pos/profile?tab=subscription"),children:["Trial",void 0!==o.daysLeft?" \u2022 "+(o.daysLeft>0?o.daysLeft+" days left":"Expired"):""]}):"active"===o.status&&void 0!==o.daysLeft?o.daysLeft<=0?(0,F.jsx)(_,{variant:"expired",onClick:()=>t("/pos/profile?tab=subscription"),children:e("foodcourt:foodcourtGeneralDashboard.expired")}):o.daysLeft<=30?(0,F.jsxs)(_,{variant:"expiring",onClick:()=>t("/pos/profile?tab=subscription"),children:[o.daysLeft," days left"]}):(0,F.jsxs)(_,{variant:"active",onClick:()=>t("/pos/profile?tab=subscription"),children:[o.daysLeft," days left"]}):"expired"===o.status||"suspended"===o.status?(0,F.jsx)(_,{variant:"expired",onClick:()=>t("/pos/profile?tab=subscription"),children:o.status}):(0,F.jsx)(_,{variant:"active",onClick:()=>t("/pos/profile?tab=subscription"),children:e("foodcourt:foodcourtGeneralDashboard.active")})})()]})]}),(0,F.jsxs)(D,{children:[ue.length>0&&(0,F.jsx)(s.eP,{items:ue,entityId:`foodcourt_${null===o||void 0===o?void 0:o.foodcourt_id}`}),(0,F.jsxs)(i.Ot,{children:[(0,F.jsxs)(i.XS,{color:"#EA580C",children:[(0,F.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.tenantRestaurants")}),(0,F.jsx)(i.G$,{children:pe.totalRestaurants})]}),(0,F.jsxs)(i.XS,{color:"#059669",children:[(0,F.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.monthlyRevenue")}),(0,F.jsx)(i.G$,{children:(0,l.vv)(pe.monthlyRevenue,re)})]}),(0,F.jsxs)(i.XS,{color:"#2563EB",children:[(0,F.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.monthlyOrders")}),(0,F.jsx)(i.G$,{children:pe.monthlyOrders.toLocaleString()})]}),(0,F.jsxs)(i.XS,{color:"#7C3AED",children:[(0,F.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.avgRevenueTenant")}),(0,F.jsx)(i.G$,{children:(0,l.vv)(pe.avgRevenuePerTenant,re)})]}),(0,F.jsxs)(i.XS,{color:"#F59E0B",children:[(0,F.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.pendingInvoices")}),(0,F.jsx)(i.G$,{children:pe.pendingInvoices})]}),(0,F.jsxs)(i.XS,{color:pe.overdueInvoices>0?"#EF4444":"#059669",children:[(0,F.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.overdueInvoices")}),(0,F.jsx)(i.G$,{children:pe.overdueInvoices})]}),(0,F.jsxs)(i.XS,{color:"#10B981",children:[(0,F.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.activePlans")}),(0,F.jsx)(i.G$,{children:pe.activePlans})]}),(0,F.jsxs)(i.XS,{color:"#6366F1",children:[(0,F.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.foodcourtManagers")}),(0,F.jsx)(i.G$,{children:pe.totalManagers})]})]}),(0,F.jsxs)(B,{children:[(0,F.jsxs)($,{children:[(0,F.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,F.jsx)("h3",{style:{margin:0},children:e("foodcourt:foodcourtGeneralDashboard.revenueTrend")}),(0,F.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,F.jsx)("button",{onClick:()=>le(e),style:{padding:"6px 12px",background:ce===e?"#635BFF":"transparent",color:ce===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),ge.length>0?(0,F.jsx)(p.u,{width:"100%",height:240,children:(0,F.jsxs)(h.b,{data:ge,children:[(0,F.jsx)(f.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,F.jsx)(x.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,F.jsx)(g.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,F.jsx)(y.m,{formatter:e=>[(0,l.vv)(e,re),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,F.jsx)(m.N,{type:"monotone",dataKey:"sales",stroke:"#EA580C",strokeWidth:2,dot:{r:4,fill:"#EA580C"},activeDot:{r:6}})]})}):(0,F.jsx)(te,{children:e("foodcourt:foodcourtGeneralDashboard.noSalesDataForThisPeriod")})]}),(0,F.jsxs)(G,{children:[(0,F.jsx)("h3",{children:e("foodcourt:foodcourtGeneralDashboard.notifications")}),(0,F.jsx)(I,{children:be.map((e,o)=>(0,F.jsx)(R,{type:e.type,onClick:()=>e.link&&t(e.link),children:(0,F.jsxs)(z,{children:[(0,F.jsx)(P,{type:e.type,children:e.title}),(0,F.jsx)(N,{children:e.message})]})},o))})]})]}),(0,F.jsxs)(T,{children:[(0,F.jsx)("h3",{children:e("foodcourt:foodcourtGeneralDashboard.quickActions")}),(0,F.jsxs)(M,{children:[(0,F.jsxs)(O,{onClick:()=>t("/pos/foodcourt/general/management"),children:[(0,F.jsx)("div",{className:"icon",children:"\u25c9"}),(0,F.jsx)("div",{className:"title",children:e("foodcourt:foodcourtGeneralDashboard.foodcourts")}),(0,F.jsx)("div",{className:"description",children:e("foodcourt:foodcourtGeneralDashboard.foodcourtManagement")})]}),(0,F.jsxs)(O,{onClick:()=>t("/pos/foodcourt/invoices"),children:[(0,F.jsx)("div",{className:"icon",children:"\u25a6"}),(0,F.jsx)("div",{className:"title",children:e("foodcourt:foodcourtGeneralDashboard.invoices")}),(0,F.jsx)("div",{className:"description",children:e("foodcourt:foodcourtGeneralDashboard.invoiceManagement")})]}),(0,F.jsxs)(O,{onClick:()=>t("/pos/foodcourt/plans"),children:[(0,F.jsx)("div",{className:"icon",children:"\u2630"}),(0,F.jsx)("div",{className:"title",children:e("foodcourt:foodcourtGeneralDashboard.subscriptionPlans")}),(0,F.jsx)("div",{className:"description",children:e("foodcourt:foodcourtGeneralDashboard.planConfiguration")})]}),(0,F.jsxs)(O,{onClick:()=>t("/pos/foodcourt/general/reports"),children:[(0,F.jsx)("div",{className:"icon",children:"\u25b2"}),(0,F.jsx)("div",{className:"title",children:e("foodcourt:foodcourtGeneralDashboard.statistics")}),(0,F.jsx)("div",{className:"description",children:e("foodcourt:foodcourtGeneralDashboard.performanceAnalytics")})]})]})]}),(0,F.jsx)(q,{children:(0,F.jsxs)(L,{children:[(0,F.jsx)(X,{children:(0,F.jsx)(W,{children:e("foodcourt:foodcourtGeneralDashboard.revenueDistribution")})}),_e.length>0?(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,F.jsx)(p.u,{width:"50%",height:220,children:(0,F.jsxs)(v.r,{children:[(0,F.jsx)(b.F,{data:_e,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:_e.map((e,t)=>(0,F.jsx)(j.f,{fill:oe[t%oe.length]},t))}),(0,F.jsx)(y.m,{formatter:e=>(0,l.vv)(e,re)})]})}),(0,F.jsx)("div",{style:{flex:1},children:_e.map((e,t)=>(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,F.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:oe[t%oe.length],flexShrink:0}}),(0,F.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,F.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,l.vv)(e.value,re)})]},t))})]}):(0,F.jsx)(te,{children:e("foodcourt:foodcourtGeneralDashboard.noRevenueDataAvailable")})]})}),(0,F.jsx)(K,{children:(0,F.jsx)("h3",{children:e("foodcourt:foodcourtGeneralDashboard.tenantPerformance")})}),(0,F.jsx)(U,{children:(0,F.jsxs)(Y,{children:[(0,F.jsx)(Q,{children:(0,F.jsxs)(J,{children:[(0,F.jsx)(Z,{children:e("foodcourt:foodcourtGeneralDashboard.tenant")}),(0,F.jsx)(Z,{children:e("foodcourt:foodcourtGeneralDashboard.plan")}),(0,F.jsx)(Z,{children:e("foodcourt:foodcourtGeneralDashboard.monthlyRevenue")}),(0,F.jsx)(Z,{children:e("foodcourt:foodcourtGeneralDashboard.orders")}),(0,F.jsx)(Z,{children:e("foodcourt:foodcourtGeneralDashboard.estimatedCharges")}),(0,F.jsx)(Z,{children:e("foodcourt:foodcourtGeneralDashboard.invoiceStatus")})]})}),(0,F.jsx)(H,{children:Be.length>0?Be.map((e,t)=>{var o,r,n,a,i,s;return(0,F.jsxs)(J,{children:[(0,F.jsx)(V,{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant_name||"-"}),(0,F.jsx)(V,{children:(null===(o=e.plan)||void 0===o?void 0:o.name)||"No Plan"}),(0,F.jsx)(V,{children:(0,l.vv)((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0,re)}),(0,F.jsx)(V,{children:(null===(n=e.current_month)||void 0===n?void 0:n.order_count)||0}),(0,F.jsx)(V,{children:(0,l.vv)((null===(a=e.current_month)||void 0===a?void 0:a.estimated_charges)||0,re)}),(0,F.jsx)(V,{children:(0,F.jsx)(ee,{status:(null===(i=e.latest_invoice)||void 0===i?void 0:i.status)||"none",children:((null===(s=e.latest_invoice)||void 0===s?void 0:s.status)||"N/A").replace(/_/g," ")})})]},t)}):(0,F.jsx)(J,{children:(0,F.jsx)(V,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No tenant data available"})})})]})})]})]})}},4021:(e,t,o)=>{o.d(t,{i1:()=>s});var r=o(9950),n=o(1367),a=o(6038),i=o(9955);const s=()=>{const{user:e}=(0,n.As)(),[t,o]=(0,r.useState)("RM"),[s]=(0,r.useState)(Object.keys(a.DL)),[d,c]=(0,r.useState)(!0),[l,u]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return o("RM"),void c(!1);try{const e=(0,i.c4)(),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";o(r)}else o("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),u("Failed to load currency settings"),o("MYR")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:d,error:l}}},8608:(e,t,o)=>{o.d(t,{d:()=>i});var r=o(9950),n=o(9955);function a(e){if(!e)return!1;const t=e.business_registration||e.registration_no,o=e.tax_id||e.tax_no;return!(!e.address||!e.phone||!t&&!o)}function i(e){const[t,o]=(0,r.useState)([]),[i,s]=(0,r.useState)(!0),{role:d,restaurantId:c,brandId:l,foodcourtId:u}=e;return(0,r.useEffect)(()=>{(async()=>{try{s(!0);const x=function(){const e=(0,n.c4)(),t={"Content-Type":"application/json"};return e&&(t.Authorization=`Bearer ${e}`),t}();if("Restaurant Admin"!==d&&"Staff"!==d||!c)if("Brand General"!==d&&"Brand Manager"!==d||!l)if("Foodcourt General"!==d&&"Foodcourt Manager"!==d||!u)o([]);else{const[e,t]=await Promise.all([fetch("/api/foodcourts/company-info",{headers:x}),fetch(`/api/foodcourts/${u}/restaurants`,{headers:x})]);let r=null,n=!1;if(e.ok){const t=await e.json();r=t.data||t}if(t.ok){const e=(await t.json()).data||[];n=!!Array.isArray(e)&&e.length>0}o([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/foodcourt/company-info",completed:a(r)},{key:"tenant_restaurants",label:"Add Tenant Restaurants",description:"Link restaurants to your foodcourt to manage them together",path:"/pos/foodcourt/general/management",completed:n}])}else{const[e,t,r,n]=await Promise.all([fetch("/api/brands/company-info",{headers:x}),fetch("/api/brand-products?limit=1",{headers:x}),fetch("/api/product-recipes?limit=1",{headers:x}),fetch("/api/product-ingredients?limit=1",{headers:x})]);let i=null,s=!1,d=!1,c=!1;if(e.ok){const t=await e.json();i=t.data||t}if(t.ok){const e=(await t.json()).data||[];s=!!Array.isArray(e)&&e.length>0}if(r.ok){const e=(await r.json()).data||[];d=!!Array.isArray(e)&&e.length>0}if(n.ok){const e=(await n.json()).data||[];c=!!Array.isArray(e)&&e.length>0}o([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/brand/company-info",completed:a(i)},{key:"brand_products",label:"Add Brand Products",description:"Register your brand products to share across restaurant locations",path:"/pos/brand-products",completed:s},{key:"product_recipes",label:"Set up Product Recipes",description:"Define recipes for your brand products to track ingredient usage",path:"/pos/brand-product-recipes",completed:d},{key:"brand_ingredients",label:"Add Brand Ingredients",description:"Add ingredients used in your brand product recipes",path:"/pos/brand-ingredients",completed:c}])}else{var e,t,r,i,p;const[n,s,d,l,u,g]=await Promise.all([fetch(`/api/restaurants/${c}/company-info`,{headers:x}),fetch(`/api/restaurants/${c}`,{headers:x}),fetch(`/api/categories?restaurantId=${c}`,{headers:x}),fetch(`/api/menu?restaurant_id=${c}&excludeImage=true`,{headers:x}),fetch(`/api/kitchen-stations?restaurant_id=${c}`,{headers:x}),fetch("/api/notification-settings/preferences",{headers:x})]);let y=null,m=null,v=0,b=0,j=0,A=!1;if(n.ok){const e=await n.json();y=e.data||e}if(s.ok){const e=await s.json();m=e.data||e}if(d.ok){const e=(await d.json()).data||[];v=Array.isArray(e)?e.length:0}if(l.ok){var h;const e=await l.json(),t=(null===(h=e.data)||void 0===h?void 0:h.items)||e.data||[];b=Array.isArray(t)?t.length:0}if(u.ok){const e=(await u.json()).data||[];j=Array.isArray(e)?e.length:0}if(g.ok){var f;A=!(null===(f=(await g.json()).data)||void 0===f||!f.preferences)}const k=a(y),F=!(null===(e=m)||void 0===e||!e.currency),w=null===(t=m)||void 0===t?void 0:t.operation_settings,C=!(null===w||void 0===w||!w.timeZone),D=F&&C,E=!(null===w||void 0===w||!w.openingTime||null===w||void 0===w||!w.closingTime),S=v>0,_=b>0,B=null===(r=m)||void 0===r?void 0:r.payment_settings;let $=!1;B&&"object"===typeof B&&($=Object.entries(B).some(e=>{let[t,o]=e;return!("_order"===t||!o||"object"!==typeof o)&&(o.enabled&&Array.isArray(o.availableIn)&&o.availableIn.includes("pos"))}));const G=j>0,I=null===(i=m)||void 0===i?void 0:i.floor_plan,R=!!(I&&Array.isArray(I)&&I.length>0)||!(!I||"object"!==typeof I||Array.isArray(I)||!(Array.isArray(I.tables)?I.tables.length>0:Array.isArray(I.elements)&&I.elements.length>0)),z=null===w||void 0===w?void 0:w.orderTypes,P=!(!z||"object"!==typeof z||!Object.values(z).some(e=>!0===e)),N=A,T=null===(p=m)||void 0===p?void 0:p.table_settings,M=!(null===T||void 0===T||!T.qrCodeBaseUrl);o([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:`/restaurant/${c}/company-information`,completed:k},{key:"store_settings",label:"Set Currency & Timezone",description:"Configure your currency and timezone for accurate transactions",path:`/restaurant/${c}/settings?tab=store`,completed:D},{key:"operating_hours",label:"Set Operating Hours",description:"Configure opening/closing times for your restaurant",path:`/restaurant/${c}/settings?tab=operations`,completed:E},{key:"categories",label:"Add Categories",description:"Create menu categories to organize items and route to kitchen stations",path:`/restaurant/${c}/categories`,completed:S},{key:"menu_items",label:"Add Menu Items",description:"Register at least one menu item to start taking orders",path:`/restaurant/${c}/menu`,completed:_},{key:"payment_methods",label:"Configure Payment Methods",description:"Enable at least one payment method for POS transactions",path:`/restaurant/${c}/settings?tab=payment`,completed:$},{key:"kitchen_stations",label:"Set up Kitchen Stations",description:"Configure kitchen stations to route orders to the right preparation area",path:`/restaurant/${c}/settings?tab=kitchenStations`,completed:G},{key:"floor_plan",label:"Configure Floor Plan",description:"Set up your restaurant floor plan with tables for dine-in orders",path:`/restaurant/${c}/floor-plan-editor`,completed:R},{key:"mobile_order",label:"Configure Mobile Order",description:"Enable order types (dine-in, takeaway, delivery) for your restaurant",path:`/restaurant/${c}/settings?tab=mobileOrder`,completed:P},{key:"notifications",label:"Set up Notifications",description:"Configure notification preferences to stay informed about your restaurant",path:`/restaurant/${c}/notification-settings`,completed:N},{key:"qr_codes",label:"Set up QR Codes",description:"Generate QR codes for tables to enable mobile ordering",path:`/restaurant/${c}/settings?tab=operations`,completed:M}])}}catch(x){console.error("useSetupStatus Error:",x),o([])}finally{s(!1)}})()},[d,c,l,u]),{items:t,loading:i}}}}]);