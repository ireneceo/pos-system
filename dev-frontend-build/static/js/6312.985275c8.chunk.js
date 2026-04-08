"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6312],{6312:(e,r,n)=>{n.r(r),n.d(r,{default:()=>ne});var t=n(9950),s=n(4492),i=n(4752),a=n(8409),o=n(6038),d=n(1095),l=n(294),c=n(3245),p=n(158),h=n(3440),u=n(2174),x=n(3588),g=n(7621),v=n(5297),y=n(2528),m=n(5651),w=n(1367),f=n(5030),b=n(4414);const j=i.Ay.div`
  min-height: 100vh;
`,F=i.Ay.div`
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
`,A=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,k=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,D=i.Ay.div`
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
  ${e=>{let{variant:r}=e;switch(r){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
  &:hover { opacity: 0.8; }
`,C=i.Ay.div`
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
`,$=i.Ay.div`
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
`,P=i.Ay.div`
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
`,S=i.Ay.div`
  flex: 1;
  min-width: 0;
`,z=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,I=i.Ay.div`
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
`,L=i.Ay.div`
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
`,q=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,G=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,T=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,X=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,U=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,_=i.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.1);
  }
`,M=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,V=i.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,K=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,W=i.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"inactive":case"overdue":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#92400E";case"inactive":case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,Y=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,Z=i.Ay.div`
  font-size: 11px;
  color: #8898AA;
  margin-bottom: 2px;
`,H=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,J=i.Ay.h3`
  margin: 0 0 20px 0;
  color: #0A2540;
  font-size: 18px;
  font-weight: 600;
`,Q=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`,ee=["#635BFF","#818CF8","#A5B4FC","#C7D2FE","#E0E7FF","#EEF2FF","#F5F3FF"],re=i.Ay.div`
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  background: ${e=>"danger"===e.$type?"#FEF2F2":"warning"===e.$type?"#FFFBEB":"#EFF6FF"};
  border: 1px solid ${e=>"danger"===e.$type?"#FECACA":"warning"===e.$type?"#FDE68A":"#BFDBFE"};
  color: ${e=>"danger"===e.$type?"#991B1B":"warning"===e.$type?"#92400E":"#1E40AF"};
`,ne=()=>{const{t:e}=(0,f.Bd)("owner"),r=(0,s.Zp)(),{user:n}=(0,w.As)(),{paymentStatus:i}=(0,m.e)(),[ne,te]=(0,t.useState)(!0),[se,ie]=(0,t.useState)("month"),[ae,oe]=(0,t.useState)({totalRestaurants:0,todayRevenue:0,monthRevenue:0,monthOrders:0,pendingInvoices:0,avgOrderValue:0,bestRestaurant:"-",activeRestaurants:0}),[de,le]=(0,t.useState)([]),[ce,pe]=(0,t.useState)([]),[he,ue]=(0,t.useState)([]),[xe,ge]=(0,t.useState)({}),[ve,ye]=(0,t.useState)("RM"),[me,we]=(0,t.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,t.useEffect)(()=>{je(),fe()},[]);const fe=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&we(e.data)}}catch{}};(0,t.useEffect)(()=>{Fe()},[se]);const be=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),je=async()=>{try{te(!0);const r=be(),[t,s,i]=await Promise.all([fetch("/api/owner/dashboard",{headers:r}),fetch(`/api/owner/statistics/compare?period=${se}`,{headers:r}),fetch("/api/owner/invoices?status=overdue",{headers:r})]),[a,o,d]=await Promise.all([t.json(),s.json(),i.json()]),l=a.data||a,c=l.restaurants||[];le(c),c.length>0&&c[0].currency&&ye(c[0].currency);const p=o.data||o||[];pe(p);const h=p.reduce((e,r)=>e+parseFloat(r.revenue||0),0),u=p.reduce((e,r)=>e+(r.orderCount||0),0),x=u>0?h/u:0,g=p.length>0?p.reduce((e,r)=>parseFloat(r.revenue||0)>parseFloat(e.revenue||0)?r:e,p[0]):null,v=d.data||[],y=Array.isArray(v)?v.length:0,m=c.filter(e=>"inactive"!==e.status).length;oe({totalRestaurants:l.totalRestaurants||c.length,todayRevenue:l.todayRevenue||0,monthRevenue:l.monthRevenue||0,monthOrders:l.totalOrders||u,pendingInvoices:l.pendingInvoices||0,avgOrderValue:x,bestRestaurant:(null===g||void 0===g?void 0:g.restaurantName)||"-",activeRestaurants:m});const w=[];y>0&&w.push({type:"warning",title:"Overdue Invoices",message:`${y} invoice(s) need attention`,link:"/pos/owner/invoices"}),(l.pendingInvoices||0)>0&&w.push({type:"info",title:"Pending Invoices",message:`${l.pendingInvoices} invoice(s) pending payment`,link:"/pos/owner/invoices"});const f=c.filter(e=>"inactive"===e.status);f.length>0&&w.push({type:"warning",title:"Inactive Restaurants",message:`${f.length} restaurant(s) currently inactive`,link:"/pos/owner/restaurants"});const b=c.filter(e=>0===(e.todayRevenue||0)&&"active"===e.status);b.length>0&&b.length<c.length&&w.push({type:"info",title:"No Orders Today",message:`${b.length} active restaurant(s) with no orders today`,link:"/pos/owner/restaurants"}),me.notices>0&&w.push({type:"info",title:"Unread Notices",message:`${me.notices} unread notice(s)`,link:"/pos/owner/notices"}),me.systemInquiry>0&&w.push({type:"info",title:"System Inquiry",message:`${me.systemInquiry} inquiry(s) with new replies`,link:"/pos/owner/system-inquiry"}),me.operationInquiry>0&&w.push({type:"info",title:"Operation Inquiry",message:`${me.operationInquiry} inquiry(s) with responses`,link:"/pos/owner/operation-inquiry"}),0===w.length&&w.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),ue(w);try{const e=await fetch("/api/restaurants/subscription-status",{headers:r}),t=await e.json(),s=t.data||t,i=await fetch(`/api/users/${null===n||void 0===n?void 0:n.id}`,{headers:r}),a=await i.json(),o=a.data||a;ge({planType:o.plan_type,status:s.subscriptionStatus,daysLeft:o.subscription_end?Math.ceil((new Date(o.subscription_end).getTime()-Date.now())/864e5):void 0})}catch(e){}}catch(r){console.error("Error fetching dashboard:",r)}finally{te(!1)}},Fe=async()=>{try{const e=be(),r=await fetch(`/api/owner/statistics/compare?period=${se}`,{headers:e}),n=await r.json();pe(n.data||n||[])}catch(e){console.error("Error fetching compare data:",e)}},Ae=ce.map(e=>({name:(e.restaurantName||"Unknown").length>12?(e.restaurantName||"Unknown").substring(0,12)+"...":e.restaurantName||"Unknown",revenue:parseFloat(e.revenue||0),orders:e.orderCount||0})),ke=ce.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurantName||"Unknown",value:parseFloat(e.revenue||0)}));return ne?(0,b.jsxs)(j,{children:[(0,b.jsx)(F,{children:(0,b.jsx)(k,{children:e("owner:ownerDashboardPage.ownerDashboard")})}),(0,b.jsx)(A,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:e("owner:ownerDashboardPage.loadingDashboard")})})]}):(0,b.jsxs)(j,{children:[(0,b.jsxs)(F,{children:[(0,b.jsx)(k,{children:e("owner:ownerDashboardPage.ownerDashboard")}),xe.planType&&(0,b.jsxs)(D,{children:[(0,b.jsx)("span",{children:xe.planType}),(()=>{const n=xe;return"trial"===n.status?(0,b.jsxs)(E,{variant:"trial",onClick:()=>r("/pos/profile?tab=subscription"),children:["Trial",void 0!==n.daysLeft?" \u2022 "+(n.daysLeft>0?n.daysLeft+" days left":"Expired"):""]}):"active"===n.status&&void 0!==n.daysLeft?n.daysLeft<=0?(0,b.jsx)(E,{variant:"expired",onClick:()=>r("/pos/profile?tab=subscription"),children:e("owner:ownerDashboardPage.expired")}):n.daysLeft<=30?(0,b.jsxs)(E,{variant:"expiring",onClick:()=>r("/pos/profile?tab=subscription"),children:[n.daysLeft," days left"]}):(0,b.jsxs)(E,{variant:"active",onClick:()=>r("/pos/profile?tab=subscription"),children:[n.daysLeft," days left"]}):"expired"===n.status||"suspended"===n.status?(0,b.jsx)(E,{variant:"expired",onClick:()=>r("/pos/profile?tab=subscription"),children:n.status}):(0,b.jsx)(E,{variant:"active",onClick:()=>r("/pos/profile?tab=subscription"),children:e("owner:ownerDashboardPage.active")})})()]})]}),(0,b.jsxs)(A,{children:["trial"===i.subscriptionStatus&&i.trialEndDate&&(0,b.jsxs)(re,{$type:"trial",children:["Trial period active \u2014 expires ",new Date(i.trialEndDate).toLocaleDateString(),". Please pay your invoice to continue service."]}),"warning"===i.restrictionLevel&&(0,b.jsxs)(re,{$type:"warning",children:["Payment overdue (",i.overdueDays," days). Please pay ",i.currency?(0,o.vv)(i.overdueAmount,i.currency):`$${i.overdueAmount}`," to avoid service restrictions."]}),("partial"===i.restrictionLevel||"blocked"===i.restrictionLevel)&&(0,b.jsx)(re,{$type:"danger",children:"blocked"===i.restrictionLevel?"Your subscription is suspended. Pay outstanding invoices to restore access.":`Service partially restricted due to overdue payment (${i.overdueDays} days). Some features are disabled.`}),(0,b.jsxs)(a.Ot,{children:[(0,b.jsxs)(a.XS,{color:"#635BFF",children:[(0,b.jsx)(a.h2,{children:e("owner:ownerDashboardPage.myRestaurants")}),(0,b.jsx)(a.G$,{children:ae.totalRestaurants})]}),(0,b.jsxs)(a.XS,{color:"#059669",children:[(0,b.jsx)(a.h2,{children:e("owner:ownerDashboardPage.todaysRevenue")}),(0,b.jsx)(a.G$,{children:(0,o.vv)(ae.todayRevenue,ve)})]}),(0,b.jsxs)(a.XS,{color:"#10B981",children:[(0,b.jsx)(a.h2,{children:e("owner:ownerDashboardPage.monthlyRevenue")}),(0,b.jsx)(a.G$,{children:(0,o.vv)(ae.monthRevenue,ve)})]}),(0,b.jsxs)(a.XS,{color:"#2563EB",children:[(0,b.jsx)(a.h2,{children:e("owner:ownerDashboardPage.monthlyOrders")}),(0,b.jsx)(a.G$,{children:ae.monthOrders.toLocaleString()})]}),(0,b.jsxs)(a.XS,{color:"#F59E0B",children:[(0,b.jsx)(a.h2,{children:e("owner:ownerDashboardPage.pendingInvoices")}),(0,b.jsx)(a.G$,{children:ae.pendingInvoices})]}),(0,b.jsxs)(a.XS,{color:"#7C3AED",children:[(0,b.jsx)(a.h2,{children:e("owner:ownerDashboardPage.avgOrderValue")}),(0,b.jsx)(a.G$,{children:(0,o.vv)(ae.avgOrderValue,ve)})]}),(0,b.jsxs)(a.XS,{color:"#DC2626",children:[(0,b.jsx)(a.h2,{children:e("owner:ownerDashboardPage.bestRestaurant")}),(0,b.jsx)(a.G$,{style:{fontSize:ae.bestRestaurant.length>15?"16px":void 0},children:ae.bestRestaurant})]}),(0,b.jsxs)(a.XS,{color:"#059669",children:[(0,b.jsx)(a.h2,{children:e("owner:ownerDashboardPage.activeRestaurants")}),(0,b.jsx)(a.G$,{children:ae.activeRestaurants})]})]}),(0,b.jsxs)(C,{children:[(0,b.jsxs)(B,{children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,b.jsx)("h3",{style:{margin:0},children:e("owner:ownerDashboardPage.revenueComparison")}),(0,b.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,b.jsx)("button",{onClick:()=>ie(e),style:{padding:"6px 12px",background:se===e?"#635BFF":"transparent",color:se===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),Ae.length>0?(0,b.jsx)(d.u,{width:"100%",height:240,children:(0,b.jsxs)(l.E,{data:Ae,children:[(0,b.jsx)(c.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,b.jsx)(p.W,{dataKey:"name",tick:{fontSize:12,fill:"#6B7C93"}}),(0,b.jsx)(h.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,b.jsx)(u.m,{formatter:(e,r)=>["revenue"===r?(0,o.vv)(e,ve):e,"revenue"===r?"Revenue":"Orders"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,b.jsx)(x.y,{dataKey:"revenue",fill:"#635BFF",radius:[4,4,0,0]})]})}):(0,b.jsx)(Q,{children:e("owner:ownerDashboardPage.noComparisonDataAvailable")})]}),(0,b.jsxs)($,{children:[(0,b.jsx)("h3",{children:e("owner:ownerDashboardPage.notifications")}),(0,b.jsx)(P,{children:he.map((e,n)=>(0,b.jsx)(R,{type:e.type,onClick:()=>e.link&&r(e.link),children:(0,b.jsxs)(S,{children:[(0,b.jsx)(z,{type:e.type,children:e.title}),(0,b.jsx)(I,{children:e.message})]})},n))})]})]}),(0,b.jsxs)(N,{children:[(0,b.jsx)("h3",{children:e("owner:ownerDashboardPage.quickActions")}),(0,b.jsxs)(L,{children:[(0,b.jsxs)(O,{onClick:()=>r("/pos/owner/restaurants"),children:[(0,b.jsx)("div",{className:"icon",children:"\u25d0"}),(0,b.jsx)("div",{className:"title",children:e("owner:ownerDashboardPage.restaurants")}),(0,b.jsx)("div",{className:"description",children:e("owner:ownerDashboardPage.restaurantManagement")})]}),(0,b.jsxs)(O,{onClick:()=>r("/pos/owner/invoices"),children:[(0,b.jsx)("div",{className:"icon",children:"\u25a6"}),(0,b.jsx)("div",{className:"title",children:e("owner:ownerDashboardPage.invoices")}),(0,b.jsx)("div",{className:"description",children:e("owner:ownerDashboardPage.invoiceManagement")})]}),(0,b.jsxs)(O,{onClick:()=>r("/pos/owner/performance"),children:[(0,b.jsx)("div",{className:"icon",children:"\u25c8"}),(0,b.jsx)("div",{className:"title",children:e("owner:ownerDashboardPage.performance")}),(0,b.jsx)("div",{className:"description",children:e("owner:ownerDashboardPage.performanceAnalytics")})]}),(0,b.jsxs)(O,{onClick:()=>r("/pos/owner/reports"),children:[(0,b.jsx)("div",{className:"icon",children:"\u2630"}),(0,b.jsx)("div",{className:"title",children:e("owner:ownerDashboardPage.reports")}),(0,b.jsx)("div",{className:"description",children:e("owner:ownerDashboardPage.detailedReports")})]})]})]}),(0,b.jsx)(q,{children:(0,b.jsxs)(G,{children:[(0,b.jsx)(T,{children:(0,b.jsx)(X,{children:e("owner:ownerDashboardPage.revenueDistribution")})}),ke.length>0?(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,b.jsx)(d.u,{width:"50%",height:220,children:(0,b.jsxs)(g.r,{children:[(0,b.jsx)(v.F,{data:ke,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:ke.map((e,r)=>(0,b.jsx)(y.f,{fill:ee[r%ee.length]},r))}),(0,b.jsx)(u.m,{formatter:e=>(0,o.vv)(e,ve)})]})}),(0,b.jsx)("div",{style:{flex:1},children:ke.map((e,r)=>(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,b.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:ee[r%ee.length],flexShrink:0}}),(0,b.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,b.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,o.vv)(e.value,ve)})]},r))})]}):(0,b.jsx)(Q,{children:e("owner:ownerDashboardPage.noRevenueDataAvailable")})]})}),(0,b.jsx)(J,{children:e("owner:ownerDashboardPage.restaurantPerformance")}),(0,b.jsx)(U,{children:de.map(n=>(0,b.jsxs)(_,{onClick:()=>r(`/pos/owner/reports?tab=sales&restaurantId=${n.id}`),children:[(0,b.jsxs)(M,{children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(V,{children:n.name}),(0,b.jsx)(K,{children:n.admin_name||"No admin assigned"})]}),(0,b.jsx)(W,{status:n.status,children:n.status})]}),(0,b.jsxs)(Y,{children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(Z,{children:e("owner:ownerDashboardPage.today")}),(0,b.jsx)(H,{children:(0,o.vv)(n.todayRevenue,n.currency||ve)})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)(Z,{children:e("owner:ownerDashboardPage.thisMonth")}),(0,b.jsx)(H,{children:(0,o.vv)(n.monthRevenue,n.currency||ve)})]})]})]},n.id))})]})]})}}}]);