"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[441],{441:(e,t,o)=>{o.r(t),o.d(t,{default:()=>oe});var r=o(9950),n=o(4492),a=o(4752),i=o(8409),s=o(843),d=o(4021),l=o(8608),c=o(6038),u=o(1367),p=o(1095),h=o(2847),f=o(3245),x=o(158),g=o(3440),y=o(2174),m=o(4915),v=o(7621),b=o(5297),j=o(7766),A=o(5030),k=o(4414);const F=a.Ay.div`
  min-height: 100vh;
`,w=a.Ay.div`
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
`,C=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,D=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,E=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7C93;
  margin-top: 4px;
`,S=a.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  ${e=>{let{variant:t}=e;switch(t){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
  &:hover { opacity: 0.8; }
`,_=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,B=a.Ay.div`
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
`,$=a.Ay.div`
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
`,G=a.Ay.div`
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
`,R=a.Ay.div`
  flex: 1;
  min-width: 0;
`,z=a.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,P=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,N=a.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,T=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,M=a.Ay.div`
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
`,O=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,q=a.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,L=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,X=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,W=a.Ay.div`
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
`,K=a.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,U=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,Y=a.Ay.thead`
  background: #F8FAFC;
`,Q=a.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Z=a.Ay.tbody``,H=a.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,J=a.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,V=a.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,ee=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`,te=["#EA580C","#F97316","#FB923C","#FDBA74","#FED7AA","#FFF7ED","#FFFBEB"],oe=()=>{const{t:e}=(0,A.Bd)("foodcourt"),t=(0,n.Zp)(),{user:o}=(0,u.As)(),{defaultCurrency:a}=(0,d.i1)(),[oe,re]=(0,r.useState)("RM"),[ne,ae]=(0,r.useState)(!0),[ie,se]=(0,r.useState)(null),[de,le]=(0,r.useState)("year"),{items:ce}=(0,l.d)({role:(null===o||void 0===o?void 0:o.role)||"",foodcourtId:null===o||void 0===o?void 0:o.foodcourt_id}),[ue,pe]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerTenant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[he,fe]=(0,r.useState)([]),[xe,ge]=(0,r.useState)([]),[ye,me]=(0,r.useState)([]),[ve,be]=(0,r.useState)([]),[je,Ae]=(0,r.useState)({}),[ke,Fe]=(0,r.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,r.useEffect)(()=>{a&&re(a)},[a]),(0,r.useEffect)(()=>{De(),we()},[]);const we=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&Fe(e.data)}}catch{}};(0,r.useEffect)(()=>{ie&&Ee(ie)},[de,ie]);const Ce=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),De=async()=>{try{if(!localStorage.getItem("auth_token"))return;ae(!0);const t=Ce(),r=await fetch("/api/foodcourts",{headers:t}),n=await r.json(),a=(n.data||n||[])[0];if(!a)return void ae(!1);se(a.id),a.restaurants&&a.restaurants.length>0&&a.restaurants[0].currency&&re(a.restaurants[0].currency);const i=new Date,s=new Date(i.getFullYear(),i.getMonth(),1).toISOString().split("T")[0],d=i.toISOString().split("T")[0],[l,c,u,p,h]=await Promise.all([fetch(`/api/foodcourts/${a.id}/revenue?start_date=${s}&end_date=${d}`,{headers:t}),fetch(`/api/foodcourts/${a.id}/plans`,{headers:t}),fetch("/api/invoices",{headers:t}),fetch("/api/users?role=Foodcourt Manager",{headers:t}),fetch(`/api/foodcourts/${a.id}/subscriptions`,{headers:t})]),[f,x,g,y,m]=await Promise.all([l.json(),c.json(),u.json(),p.json(),h.json()]),v=f.data||f,b=parseFloat(v.total_revenue||0),j=v.restaurants||[],A=j.reduce((e,t)=>e+(t.order_count||0),0);fe(j);const k=(x.data||x||[]).filter(e=>!1!==e.is_active).length,F=g.data||g||[],w=F.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,C=F.filter(e=>"overdue"===e.status).length,D=Array.isArray(y)?y:y.data||[],E=m.data||m||[];me(E),pe({totalRestaurants:j.length,monthlyRevenue:b,monthlyOrders:A,avgRevenuePerTenant:j.length>0?b/j.length:0,pendingInvoices:w,overdueInvoices:C,activePlans:k,totalManagers:D.length});const S=[];C>0&&S.push({type:"warning",title:"Overdue Invoices",message:`${C} invoice(s) need attention`,link:"/pos/foodcourt/invoices"}),w>0&&S.push({type:"info",title:"Pending Invoices",message:`${w} invoice(s) pending payment`,link:"/pos/foodcourt/invoices"});const _=j.filter(e=>0===(e.order_count||0));_.length>0&&S.push({type:"info",title:"No Orders",message:`${_.length} tenant(s) with no orders this month`,link:"/pos/foodcourt/general/management"}),ke.notices>0&&S.push({type:"info",title:"Unread Notices",message:`${ke.notices} unread notice(s)`,link:"/pos/foodcourt/notices"}),ke.systemInquiry>0&&S.push({type:"info",title:"System Inquiry",message:`${ke.systemInquiry} inquiry(s) with new replies`,link:"/pos/foodcourt/system-inquiry"}),ke.operationInquiry>0&&S.push({type:"info",title:"Operation Inquiry",message:`${ke.operationInquiry} open inquiry(s)`,link:"/pos/foodcourt/operation-inquiry"}),0===S.length&&S.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),be(S);try{const e=await fetch("/api/restaurants/subscription-status",{headers:t}),r=await e.json(),n=r.data||r,i=await fetch(`/api/users/${null===o||void 0===o?void 0:o.id}`,{headers:t}),s=await i.json(),d=s.data||s;Ae({planType:d.plan_type||a.plan_type,status:n.subscriptionStatus,daysLeft:d.subscription_end?Math.ceil((new Date(d.subscription_end).getTime()-Date.now())/864e5):void 0})}catch(e){}Ee(a.id)}catch(t){console.error("Error fetching dashboard data:",t)}finally{ae(!1)}},Ee=async e=>{try{if(!localStorage.getItem("auth_token"))return;const t=Ce(),o=await fetch(`/api/foodcourts/${e}/sales-trend?period=${de}`,{headers:t}),r=await o.json();ge(r.data||[])}catch(t){console.error("Error fetching trend data:",t)}},Se=he.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,t)=>t.value-e.value).slice(0,7),_e=[...ye].sort((e,t)=>{var o,r;return((null===(o=t.current_month)||void 0===o?void 0:o.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return ne?(0,k.jsxs)(F,{children:[(0,k.jsx)(w,{children:(0,k.jsx)(D,{children:e("foodcourt:foodcourtGeneralDashboard.foodcourtDashboard")})}),(0,k.jsx)(C,{children:(0,k.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:e("foodcourt:foodcourtGeneralDashboard.loadingDashboard")})})]}):(0,k.jsxs)(F,{children:[(0,k.jsxs)(w,{children:[(0,k.jsx)(D,{children:e("foodcourt:foodcourtGeneralDashboard.foodcourtDashboard")}),je.planType&&(0,k.jsxs)(E,{children:[(0,k.jsx)("span",{children:je.planType}),(()=>{const o=je;return"trial"===o.status?(0,k.jsxs)(S,{variant:"trial",onClick:()=>t("/pos/profile?tab=subscription"),children:["Trial",void 0!==o.daysLeft?" \u2022 "+(o.daysLeft>0?o.daysLeft+" days left":"Expired"):""]}):"active"===o.status&&void 0!==o.daysLeft?o.daysLeft<=0?(0,k.jsx)(S,{variant:"expired",onClick:()=>t("/pos/profile?tab=subscription"),children:e("foodcourt:foodcourtGeneralDashboard.expired")}):o.daysLeft<=30?(0,k.jsxs)(S,{variant:"expiring",onClick:()=>t("/pos/profile?tab=subscription"),children:[o.daysLeft," days left"]}):(0,k.jsxs)(S,{variant:"active",onClick:()=>t("/pos/profile?tab=subscription"),children:[o.daysLeft," days left"]}):"expired"===o.status||"suspended"===o.status?(0,k.jsx)(S,{variant:"expired",onClick:()=>t("/pos/profile?tab=subscription"),children:o.status}):(0,k.jsx)(S,{variant:"active",onClick:()=>t("/pos/profile?tab=subscription"),children:e("foodcourt:foodcourtGeneralDashboard.active")})})()]})]}),(0,k.jsxs)(C,{children:[ce.length>0&&(0,k.jsx)(s.eP,{items:ce,entityId:`foodcourt_${null===o||void 0===o?void 0:o.foodcourt_id}`}),(0,k.jsxs)(i.Ot,{children:[(0,k.jsxs)(i.XS,{color:"#EA580C",children:[(0,k.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.tenantRestaurants")}),(0,k.jsx)(i.G$,{children:ue.totalRestaurants})]}),(0,k.jsxs)(i.XS,{color:"#059669",children:[(0,k.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.monthlyRevenue")}),(0,k.jsx)(i.G$,{children:(0,c.vv)(ue.monthlyRevenue,oe)})]}),(0,k.jsxs)(i.XS,{color:"#2563EB",children:[(0,k.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.monthlyOrders")}),(0,k.jsx)(i.G$,{children:ue.monthlyOrders.toLocaleString()})]}),(0,k.jsxs)(i.XS,{color:"#7C3AED",children:[(0,k.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.avgRevenueTenant")}),(0,k.jsx)(i.G$,{children:(0,c.vv)(ue.avgRevenuePerTenant,oe)})]}),(0,k.jsxs)(i.XS,{color:"#F59E0B",children:[(0,k.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.pendingInvoices")}),(0,k.jsx)(i.G$,{children:ue.pendingInvoices})]}),(0,k.jsxs)(i.XS,{color:ue.overdueInvoices>0?"#EF4444":"#059669",children:[(0,k.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.overdueInvoices")}),(0,k.jsx)(i.G$,{children:ue.overdueInvoices})]}),(0,k.jsxs)(i.XS,{color:"#10B981",children:[(0,k.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.activePlans")}),(0,k.jsx)(i.G$,{children:ue.activePlans})]}),(0,k.jsxs)(i.XS,{color:"#6366F1",children:[(0,k.jsx)(i.h2,{children:e("foodcourt:foodcourtGeneralDashboard.foodcourtManagers")}),(0,k.jsx)(i.G$,{children:ue.totalManagers})]})]}),(0,k.jsxs)(_,{children:[(0,k.jsxs)(B,{children:[(0,k.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,k.jsx)("h3",{style:{margin:0},children:e("foodcourt:foodcourtGeneralDashboard.revenueTrend")}),(0,k.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,k.jsx)("button",{onClick:()=>le(e),style:{padding:"6px 12px",background:de===e?"#635BFF":"transparent",color:de===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),xe.length>0?(0,k.jsx)(p.u,{width:"100%",height:240,children:(0,k.jsxs)(h.b,{data:xe,children:[(0,k.jsx)(f.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,k.jsx)(x.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,k.jsx)(g.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,k.jsx)(y.m,{formatter:e=>[(0,c.vv)(e,oe),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,k.jsx)(m.N,{type:"monotone",dataKey:"sales",stroke:"#EA580C",strokeWidth:2,dot:{r:4,fill:"#EA580C"},activeDot:{r:6}})]})}):(0,k.jsx)(ee,{children:e("foodcourt:foodcourtGeneralDashboard.noSalesDataForThisPeriod")})]}),(0,k.jsxs)($,{children:[(0,k.jsx)("h3",{children:e("foodcourt:foodcourtGeneralDashboard.notifications")}),(0,k.jsx)(I,{children:ve.map((e,o)=>(0,k.jsx)(G,{type:e.type,onClick:()=>e.link&&t(e.link),children:(0,k.jsxs)(R,{children:[(0,k.jsx)(z,{type:e.type,children:e.title}),(0,k.jsx)(P,{children:e.message})]})},o))})]})]}),(0,k.jsxs)(N,{children:[(0,k.jsx)("h3",{children:e("foodcourt:foodcourtGeneralDashboard.quickActions")}),(0,k.jsxs)(T,{children:[(0,k.jsxs)(M,{onClick:()=>t("/pos/foodcourt/general/management"),children:[(0,k.jsx)("div",{className:"icon",children:"\u25c9"}),(0,k.jsx)("div",{className:"title",children:e("foodcourt:foodcourtGeneralDashboard.foodcourts")}),(0,k.jsx)("div",{className:"description",children:e("foodcourt:foodcourtGeneralDashboard.foodcourtManagement")})]}),(0,k.jsxs)(M,{onClick:()=>t("/pos/foodcourt/invoices"),children:[(0,k.jsx)("div",{className:"icon",children:"\u25a6"}),(0,k.jsx)("div",{className:"title",children:e("foodcourt:foodcourtGeneralDashboard.invoices")}),(0,k.jsx)("div",{className:"description",children:e("foodcourt:foodcourtGeneralDashboard.invoiceManagement")})]}),(0,k.jsxs)(M,{onClick:()=>t("/pos/foodcourt/plans"),children:[(0,k.jsx)("div",{className:"icon",children:"\u2630"}),(0,k.jsx)("div",{className:"title",children:e("foodcourt:foodcourtGeneralDashboard.subscriptionPlans")}),(0,k.jsx)("div",{className:"description",children:e("foodcourt:foodcourtGeneralDashboard.planConfiguration")})]}),(0,k.jsxs)(M,{onClick:()=>t("/pos/foodcourt/general/reports"),children:[(0,k.jsx)("div",{className:"icon",children:"\u25b2"}),(0,k.jsx)("div",{className:"title",children:e("foodcourt:foodcourtGeneralDashboard.statistics")}),(0,k.jsx)("div",{className:"description",children:e("foodcourt:foodcourtGeneralDashboard.performanceAnalytics")})]})]})]}),(0,k.jsx)(O,{children:(0,k.jsxs)(q,{children:[(0,k.jsx)(L,{children:(0,k.jsx)(X,{children:e("foodcourt:foodcourtGeneralDashboard.revenueDistribution")})}),Se.length>0?(0,k.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,k.jsx)(p.u,{width:"50%",height:220,children:(0,k.jsxs)(v.r,{children:[(0,k.jsx)(b.F,{data:Se,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:Se.map((e,t)=>(0,k.jsx)(j.f,{fill:te[t%te.length]},t))}),(0,k.jsx)(y.m,{formatter:e=>(0,c.vv)(e,oe)})]})}),(0,k.jsx)("div",{style:{flex:1},children:Se.map((e,t)=>(0,k.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,k.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:te[t%te.length],flexShrink:0}}),(0,k.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,k.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,c.vv)(e.value,oe)})]},t))})]}):(0,k.jsx)(ee,{children:e("foodcourt:foodcourtGeneralDashboard.noRevenueDataAvailable")})]})}),(0,k.jsx)(W,{children:(0,k.jsx)("h3",{children:e("foodcourt:foodcourtGeneralDashboard.tenantPerformance")})}),(0,k.jsx)(K,{children:(0,k.jsxs)(U,{children:[(0,k.jsx)(Y,{children:(0,k.jsxs)(H,{children:[(0,k.jsx)(Q,{children:e("foodcourt:foodcourtGeneralDashboard.tenant")}),(0,k.jsx)(Q,{children:e("foodcourt:foodcourtGeneralDashboard.plan")}),(0,k.jsx)(Q,{children:e("foodcourt:foodcourtGeneralDashboard.monthlyRevenue")}),(0,k.jsx)(Q,{children:e("foodcourt:foodcourtGeneralDashboard.orders")}),(0,k.jsx)(Q,{children:e("foodcourt:foodcourtGeneralDashboard.estimatedCharges")}),(0,k.jsx)(Q,{children:e("foodcourt:foodcourtGeneralDashboard.invoiceStatus")})]})}),(0,k.jsx)(Z,{children:_e.length>0?_e.map((e,t)=>{var o,r,n,a,i,s;return(0,k.jsxs)(H,{children:[(0,k.jsx)(J,{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant_name||"-"}),(0,k.jsx)(J,{children:(null===(o=e.plan)||void 0===o?void 0:o.name)||"No Plan"}),(0,k.jsx)(J,{children:(0,c.vv)((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0,oe)}),(0,k.jsx)(J,{children:(null===(n=e.current_month)||void 0===n?void 0:n.order_count)||0}),(0,k.jsx)(J,{children:(0,c.vv)((null===(a=e.current_month)||void 0===a?void 0:a.estimated_charges)||0,oe)}),(0,k.jsx)(J,{children:(0,k.jsx)(V,{status:(null===(i=e.latest_invoice)||void 0===i?void 0:i.status)||"none",children:((null===(s=e.latest_invoice)||void 0===s?void 0:s.status)||"N/A").replace(/_/g," ")})})]},t)}):(0,k.jsx)(H,{children:(0,k.jsx)(J,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No tenant data available"})})})]})})]})]})}},4021:(e,t,o)=>{o.d(t,{i1:()=>i});var r=o(9950),n=o(1367),a=o(6038);const i=()=>{const{user:e}=(0,n.As)(),[t,o]=(0,r.useState)("RM"),[i]=(0,r.useState)(Object.keys(a.DL)),[s,d]=(0,r.useState)(!0),[l,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return o("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";o(r)}else o("MYR")}catch(i){console.error("Failed to fetch restaurant currency:",i),c("Failed to load currency settings"),o("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:s,error:l}}},8608:(e,t,o)=>{o.d(t,{d:()=>a});var r=o(9950);function n(e){if(!e)return!1;const t=e.business_registration||e.registration_no,o=e.tax_id||e.tax_no;return!(!e.address||!e.phone||!t&&!o)}function a(e){const[t,o]=(0,r.useState)([]),[a,i]=(0,r.useState)(!0),{role:s,restaurantId:d,brandId:l,foodcourtId:c}=e;return(0,r.useEffect)(()=>{(async()=>{try{i(!0);const f=function(){const e=localStorage.getItem("auth_token"),t={"Content-Type":"application/json"};return e&&(t.Authorization=`Bearer ${e}`),t}();if("Restaurant Admin"!==s&&"Staff"!==s||!d)if("Brand General"!==s&&"Brand Manager"!==s||!l)if("Foodcourt General"!==s&&"Foodcourt Manager"!==s||!c)o([]);else{const[e,t]=await Promise.all([fetch("/api/foodcourts/company-info",{headers:f}),fetch(`/api/foodcourts/${c}/restaurants`,{headers:f})]);let r=null,a=!1;if(e.ok){const t=await e.json();r=t.data||t}if(t.ok){const e=(await t.json()).data||[];a=!!Array.isArray(e)&&e.length>0}o([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/foodcourt/company-info",completed:n(r)},{key:"tenant_restaurants",label:"Add Tenant Restaurants",description:"Link restaurants to your foodcourt to manage them together",path:"/pos/foodcourt/general/management",completed:a}])}else{const[e,t,r,a]=await Promise.all([fetch("/api/brands/company-info",{headers:f}),fetch("/api/brand-products?limit=1",{headers:f}),fetch("/api/product-recipes?limit=1",{headers:f}),fetch("/api/product-ingredients?limit=1",{headers:f})]);let i=null,s=!1,d=!1,l=!1;if(e.ok){const t=await e.json();i=t.data||t}if(t.ok){const e=(await t.json()).data||[];s=!!Array.isArray(e)&&e.length>0}if(r.ok){const e=(await r.json()).data||[];d=!!Array.isArray(e)&&e.length>0}if(a.ok){const e=(await a.json()).data||[];l=!!Array.isArray(e)&&e.length>0}o([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/brand/company-info",completed:n(i)},{key:"brand_products",label:"Add Brand Products",description:"Register your brand products to share across restaurant locations",path:"/pos/brand-products",completed:s},{key:"product_recipes",label:"Set up Product Recipes",description:"Define recipes for your brand products to track ingredient usage",path:"/pos/brand-product-recipes",completed:d},{key:"brand_ingredients",label:"Add Brand Ingredients",description:"Add ingredients used in your brand product recipes",path:"/pos/brand-ingredients",completed:l}])}else{var e,t,r,a,u;const[i,s,l,c,x,g]=await Promise.all([fetch(`/api/restaurants/${d}/company-info`,{headers:f}),fetch(`/api/restaurants/${d}`,{headers:f}),fetch(`/api/categories?restaurantId=${d}`,{headers:f}),fetch(`/api/menu?restaurant_id=${d}&excludeImage=true`,{headers:f}),fetch(`/api/kitchen-stations?restaurant_id=${d}`,{headers:f}),fetch("/api/notification-settings/preferences",{headers:f})]);let y=null,m=null,v=0,b=0,j=0,A=!1;if(i.ok){const e=await i.json();y=e.data||e}if(s.ok){const e=await s.json();m=e.data||e}if(l.ok){const e=(await l.json()).data||[];v=Array.isArray(e)?e.length:0}if(c.ok){var p;const e=await c.json(),t=(null===(p=e.data)||void 0===p?void 0:p.items)||e.data||[];b=Array.isArray(t)?t.length:0}if(x.ok){const e=(await x.json()).data||[];j=Array.isArray(e)?e.length:0}if(g.ok){var h;A=!(null===(h=(await g.json()).data)||void 0===h||!h.preferences)}const k=n(y),F=!(null===(e=m)||void 0===e||!e.currency),w=null===(t=m)||void 0===t?void 0:t.operation_settings,C=!(null===w||void 0===w||!w.timeZone),D=F&&C,E=!(null===w||void 0===w||!w.openingTime||null===w||void 0===w||!w.closingTime),S=v>0,_=b>0,B=null===(r=m)||void 0===r?void 0:r.payment_settings;let $=!1;B&&"object"===typeof B&&($=Object.entries(B).some(e=>{let[t,o]=e;return!("_order"===t||!o||"object"!==typeof o)&&(o.enabled&&Array.isArray(o.availableIn)&&o.availableIn.includes("pos"))}));const I=j>0,G=null===(a=m)||void 0===a?void 0:a.floor_plan,R=!!(G&&Array.isArray(G)&&G.length>0)||!(!G||"object"!==typeof G||Array.isArray(G)||!(Array.isArray(G.tables)?G.tables.length>0:Array.isArray(G.elements)&&G.elements.length>0)),z=null===w||void 0===w?void 0:w.orderTypes,P=!(!z||"object"!==typeof z||!Object.values(z).some(e=>!0===e)),N=A,T=null===(u=m)||void 0===u?void 0:u.table_settings,M=!(null===T||void 0===T||!T.qrCodeBaseUrl);o([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:`/restaurant/${d}/company-information`,completed:k},{key:"store_settings",label:"Set Currency & Timezone",description:"Configure your currency and timezone for accurate transactions",path:`/restaurant/${d}/settings?tab=store`,completed:D},{key:"operating_hours",label:"Set Operating Hours",description:"Configure opening/closing times for your restaurant",path:`/restaurant/${d}/settings?tab=operations`,completed:E},{key:"categories",label:"Add Categories",description:"Create menu categories to organize items and route to kitchen stations",path:`/restaurant/${d}/categories`,completed:S},{key:"menu_items",label:"Add Menu Items",description:"Register at least one menu item to start taking orders",path:`/restaurant/${d}/menu`,completed:_},{key:"payment_methods",label:"Configure Payment Methods",description:"Enable at least one payment method for POS transactions",path:`/restaurant/${d}/settings?tab=payment`,completed:$},{key:"kitchen_stations",label:"Set up Kitchen Stations",description:"Configure kitchen stations to route orders to the right preparation area",path:`/restaurant/${d}/settings?tab=kitchenStations`,completed:I},{key:"floor_plan",label:"Configure Floor Plan",description:"Set up your restaurant floor plan with tables for dine-in orders",path:`/restaurant/${d}/floor-plan-editor`,completed:R},{key:"mobile_order",label:"Configure Mobile Order",description:"Enable order types (dine-in, takeaway, delivery) for your restaurant",path:`/restaurant/${d}/settings?tab=mobileOrder`,completed:P},{key:"notifications",label:"Set up Notifications",description:"Configure notification preferences to stay informed about your restaurant",path:`/restaurant/${d}/notification-settings`,completed:N},{key:"qr_codes",label:"Set up QR Codes",description:"Generate QR codes for tables to enable mobile ordering",path:`/restaurant/${d}/settings?tab=operations`,completed:M}])}}catch(f){console.error("useSetupStatus Error:",f),o([])}finally{i(!1)}})()},[s,d,l,c]),{items:t,loading:a}}}}]);