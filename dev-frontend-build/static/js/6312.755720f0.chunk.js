"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6312],{6312:(e,r,n)=>{n.r(r),n.d(r,{default:()=>te});var t=n(9950),s=n(4492),i=n(4752),a=n(8409),o=n(6038),d=n(1095),l=n(294),c=n(3245),p=n(158),h=n(3440),x=n(2174),u=n(3588),g=n(7621),v=n(5297),y=n(7766),m=n(5651),w=n(1367),f=n(5030),b=n(9955),j=n(4414);const F=i.Ay.div`
  min-height: 100vh;
`,A=i.Ay.div`
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
`,k=i.Ay.div`
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
`,E=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7C93;
  margin-top: 4px;
`,C=i.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  ${e=>{let{variant:r}=e;switch(r){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
  &:hover { opacity: 0.8; }
`,B=i.Ay.div`
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
`,P=i.Ay.div`
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
`,R=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,S=i.Ay.div`
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
`,I=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,N=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,L=i.Ay.div`
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
`,q=i.Ay.div`
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
`,G=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,T=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,X=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,U=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,M=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,V=i.Ay.div`
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
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,K=i.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,W=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,Y=i.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"inactive":case"overdue":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#92400E";case"inactive":case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,Z=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,H=i.Ay.div`
  font-size: 11px;
  color: #8898AA;
  margin-bottom: 2px;
`,J=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,Q=i.Ay.h3`
  margin: 0 0 20px 0;
  color: #0A2540;
  font-size: 18px;
  font-weight: 600;
`,ee=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`,re=["#635BFF","#818CF8","#A5B4FC","#C7D2FE","#E0E7FF","#EEF2FF","#F5F3FF"],ne=i.Ay.div`
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
`,te=()=>{const{t:e}=(0,f.Bd)("owner"),r=(0,s.Zp)(),{user:n}=(0,w.As)(),{paymentStatus:i}=(0,m.e)(),[te,se]=(0,t.useState)(!0),[ie,ae]=(0,t.useState)("month"),[oe,de]=(0,t.useState)({totalRestaurants:0,todayRevenue:0,monthRevenue:0,monthOrders:0,pendingInvoices:0,avgOrderValue:0,bestRestaurant:"-",activeRestaurants:0}),[le,ce]=(0,t.useState)([]),[pe,he]=(0,t.useState)([]),[xe,ue]=(0,t.useState)([]),[ge,ve]=(0,t.useState)({}),[ye,me]=(0,t.useState)("RM"),[we,fe]=(0,t.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,t.useEffect)(()=>{Fe(),be()},[]);const be=async()=>{try{const e=(0,b.c4)();if(!e)return;const r=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&fe(e.data)}}catch{}};(0,t.useEffect)(()=>{Ae()},[ie]);const je=()=>({Authorization:`Bearer ${(0,b.c4)()}`,"Content-Type":"application/json"}),Fe=async()=>{try{se(!0);const r=je(),[t,s,i]=await Promise.all([fetch("/api/owner/dashboard",{headers:r}),fetch(`/api/owner/statistics/compare?period=${ie}`,{headers:r}),fetch("/api/owner/invoices?status=overdue",{headers:r})]),[a,o,d]=await Promise.all([t.json(),s.json(),i.json()]),l=a.data||a,c=l.restaurants||[];ce(c),c.length>0&&c[0].currency&&me(c[0].currency);const p=o.data||o||[];he(p);const h=p.reduce((e,r)=>e+parseFloat(r.revenue||0),0),x=p.reduce((e,r)=>e+(r.orderCount||0),0),u=x>0?h/x:0,g=p.length>0?p.reduce((e,r)=>parseFloat(r.revenue||0)>parseFloat(e.revenue||0)?r:e,p[0]):null,v=d.data||[],y=Array.isArray(v)?v.length:0,m=c.filter(e=>"inactive"!==e.status).length;de({totalRestaurants:l.totalRestaurants||c.length,todayRevenue:l.todayRevenue||0,monthRevenue:l.monthRevenue||0,monthOrders:l.totalOrders||x,pendingInvoices:l.pendingInvoices||0,avgOrderValue:u,bestRestaurant:(null===g||void 0===g?void 0:g.restaurantName)||"-",activeRestaurants:m});const w=[];y>0&&w.push({type:"warning",title:"Overdue Invoices",message:`${y} invoice(s) need attention`,link:"/pos/owner/invoices"}),(l.pendingInvoices||0)>0&&w.push({type:"info",title:"Pending Invoices",message:`${l.pendingInvoices} invoice(s) pending payment`,link:"/pos/owner/invoices"});const f=c.filter(e=>"inactive"===e.status);f.length>0&&w.push({type:"warning",title:"Inactive Restaurants",message:`${f.length} restaurant(s) currently inactive`,link:"/pos/owner/restaurants"});const b=c.filter(e=>0===(e.todayRevenue||0)&&"active"===e.status);b.length>0&&b.length<c.length&&w.push({type:"info",title:"No Orders Today",message:`${b.length} active restaurant(s) with no orders today`,link:"/pos/owner/restaurants"}),we.notices>0&&w.push({type:"info",title:"Unread Notices",message:`${we.notices} unread notice(s)`,link:"/pos/owner/notices"}),we.systemInquiry>0&&w.push({type:"info",title:"System Inquiry",message:`${we.systemInquiry} inquiry(s) with new replies`,link:"/pos/owner/system-inquiry"}),we.operationInquiry>0&&w.push({type:"info",title:"Operation Inquiry",message:`${we.operationInquiry} inquiry(s) with responses`,link:"/pos/owner/operation-inquiry"}),0===w.length&&w.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),ue(w);try{const e=await fetch("/api/restaurants/subscription-status",{headers:r}),t=await e.json(),s=t.data||t,i=await fetch(`/api/users/${null===n||void 0===n?void 0:n.id}`,{headers:r}),a=await i.json(),o=a.data||a;ve({planType:o.plan_type,status:s.subscriptionStatus,daysLeft:o.subscription_end?Math.ceil((new Date(o.subscription_end).getTime()-Date.now())/864e5):void 0})}catch(e){}}catch(r){console.error("Error fetching dashboard:",r)}finally{se(!1)}},Ae=async()=>{try{const e=je(),r=await fetch(`/api/owner/statistics/compare?period=${ie}`,{headers:e}),n=await r.json();he(n.data||n||[])}catch(e){console.error("Error fetching compare data:",e)}},ke=pe.map(e=>({name:(e.restaurantName||"Unknown").length>12?(e.restaurantName||"Unknown").substring(0,12)+"...":e.restaurantName||"Unknown",revenue:parseFloat(e.revenue||0),orders:e.orderCount||0})),De=pe.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurantName||"Unknown",value:parseFloat(e.revenue||0)}));return te?(0,j.jsxs)(F,{children:[(0,j.jsx)(A,{children:(0,j.jsx)(D,{children:e("owner:ownerDashboardPage.ownerDashboard")})}),(0,j.jsx)(k,{children:(0,j.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:e("owner:ownerDashboardPage.loadingDashboard")})})]}):(0,j.jsxs)(F,{children:[(0,j.jsxs)(A,{children:[(0,j.jsx)(D,{children:e("owner:ownerDashboardPage.ownerDashboard")}),ge.planType&&(0,j.jsxs)(E,{children:[(0,j.jsx)("span",{children:ge.planType}),(()=>{const n=ge;return"trial"===n.status?(0,j.jsxs)(C,{variant:"trial",onClick:()=>r("/pos/profile?tab=subscription"),children:["Trial",void 0!==n.daysLeft?" \u2022 "+(n.daysLeft>0?n.daysLeft+" days left":"Expired"):""]}):"active"===n.status&&void 0!==n.daysLeft?n.daysLeft<=0?(0,j.jsx)(C,{variant:"expired",onClick:()=>r("/pos/profile?tab=subscription"),children:e("owner:ownerDashboardPage.expired")}):n.daysLeft<=30?(0,j.jsxs)(C,{variant:"expiring",onClick:()=>r("/pos/profile?tab=subscription"),children:[n.daysLeft," days left"]}):(0,j.jsxs)(C,{variant:"active",onClick:()=>r("/pos/profile?tab=subscription"),children:[n.daysLeft," days left"]}):"expired"===n.status||"suspended"===n.status?(0,j.jsx)(C,{variant:"expired",onClick:()=>r("/pos/profile?tab=subscription"),children:n.status}):(0,j.jsx)(C,{variant:"active",onClick:()=>r("/pos/profile?tab=subscription"),children:e("owner:ownerDashboardPage.active")})})()]})]}),(0,j.jsxs)(k,{children:["trial"===i.subscriptionStatus&&i.trialEndDate&&(0,j.jsxs)(ne,{$type:"trial",children:["Trial period active \u2014 expires ",new Date(i.trialEndDate).toLocaleDateString(),". Please pay your invoice to continue service."]}),"warning"===i.restrictionLevel&&(0,j.jsxs)(ne,{$type:"warning",children:["Payment overdue (",i.overdueDays," days). Please pay ",i.currency?(0,o.vv)(i.overdueAmount,i.currency):`$${i.overdueAmount}`," to avoid service restrictions."]}),("partial"===i.restrictionLevel||"blocked"===i.restrictionLevel)&&(0,j.jsx)(ne,{$type:"danger",children:"blocked"===i.restrictionLevel?"Your subscription is suspended. Pay outstanding invoices to restore access.":`Service partially restricted due to overdue payment (${i.overdueDays} days). Some features are disabled.`}),(0,j.jsxs)(a.Ot,{children:[(0,j.jsxs)(a.XS,{color:"#635BFF",children:[(0,j.jsx)(a.h2,{children:e("owner:ownerDashboardPage.myRestaurants")}),(0,j.jsx)(a.G$,{children:oe.totalRestaurants})]}),(0,j.jsxs)(a.XS,{color:"#059669",children:[(0,j.jsx)(a.h2,{children:e("owner:ownerDashboardPage.todaysRevenue")}),(0,j.jsx)(a.G$,{children:(0,o.vv)(oe.todayRevenue,ye)})]}),(0,j.jsxs)(a.XS,{color:"#10B981",children:[(0,j.jsx)(a.h2,{children:e("owner:ownerDashboardPage.monthlyRevenue")}),(0,j.jsx)(a.G$,{children:(0,o.vv)(oe.monthRevenue,ye)})]}),(0,j.jsxs)(a.XS,{color:"#2563EB",children:[(0,j.jsx)(a.h2,{children:e("owner:ownerDashboardPage.monthlyOrders")}),(0,j.jsx)(a.G$,{children:oe.monthOrders.toLocaleString()})]}),(0,j.jsxs)(a.XS,{color:"#F59E0B",children:[(0,j.jsx)(a.h2,{children:e("owner:ownerDashboardPage.pendingInvoices")}),(0,j.jsx)(a.G$,{children:oe.pendingInvoices})]}),(0,j.jsxs)(a.XS,{color:"#7C3AED",children:[(0,j.jsx)(a.h2,{children:e("owner:ownerDashboardPage.avgOrderValue")}),(0,j.jsx)(a.G$,{children:(0,o.vv)(oe.avgOrderValue,ye)})]}),(0,j.jsxs)(a.XS,{color:"#DC2626",children:[(0,j.jsx)(a.h2,{children:e("owner:ownerDashboardPage.bestRestaurant")}),(0,j.jsx)(a.G$,{style:{fontSize:oe.bestRestaurant.length>15?"16px":void 0},children:oe.bestRestaurant})]}),(0,j.jsxs)(a.XS,{color:"#059669",children:[(0,j.jsx)(a.h2,{children:e("owner:ownerDashboardPage.activeRestaurants")}),(0,j.jsx)(a.G$,{children:oe.activeRestaurants})]})]}),(0,j.jsxs)(B,{children:[(0,j.jsxs)($,{children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,j.jsx)("h3",{style:{margin:0},children:e("owner:ownerDashboardPage.revenueComparison")}),(0,j.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,j.jsx)("button",{onClick:()=>ae(e),style:{padding:"6px 12px",background:ie===e?"#635BFF":"transparent",color:ie===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),ke.length>0?(0,j.jsx)(d.u,{width:"100%",height:240,children:(0,j.jsxs)(l.E,{data:ke,children:[(0,j.jsx)(c.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,j.jsx)(p.W,{dataKey:"name",tick:{fontSize:12,fill:"#6B7C93"}}),(0,j.jsx)(h.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,j.jsx)(x.m,{formatter:(e,r)=>["revenue"===r?(0,o.vv)(e,ye):e,"revenue"===r?"Revenue":"Orders"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,j.jsx)(u.y,{dataKey:"revenue",fill:"#635BFF",radius:[4,4,0,0]})]})}):(0,j.jsx)(ee,{children:e("owner:ownerDashboardPage.noComparisonDataAvailable")})]}),(0,j.jsxs)(P,{children:[(0,j.jsx)("h3",{children:e("owner:ownerDashboardPage.notifications")}),(0,j.jsx)(R,{children:xe.map((e,n)=>(0,j.jsx)(S,{type:e.type,onClick:()=>e.link&&r(e.link),children:(0,j.jsxs)(z,{children:[(0,j.jsx)(I,{type:e.type,children:e.title}),(0,j.jsx)(N,{children:e.message})]})},n))})]})]}),(0,j.jsxs)(L,{children:[(0,j.jsx)("h3",{children:e("owner:ownerDashboardPage.quickActions")}),(0,j.jsxs)(O,{children:[(0,j.jsxs)(q,{onClick:()=>r("/pos/owner/restaurants"),children:[(0,j.jsx)("div",{className:"icon",children:"\u25d0"}),(0,j.jsx)("div",{className:"title",children:e("owner:ownerDashboardPage.restaurants")}),(0,j.jsx)("div",{className:"description",children:e("owner:ownerDashboardPage.restaurantManagement")})]}),(0,j.jsxs)(q,{onClick:()=>r("/pos/owner/invoices"),children:[(0,j.jsx)("div",{className:"icon",children:"\u25a6"}),(0,j.jsx)("div",{className:"title",children:e("owner:ownerDashboardPage.invoices")}),(0,j.jsx)("div",{className:"description",children:e("owner:ownerDashboardPage.invoiceManagement")})]}),(0,j.jsxs)(q,{onClick:()=>r("/pos/owner/performance"),children:[(0,j.jsx)("div",{className:"icon",children:"\u25c8"}),(0,j.jsx)("div",{className:"title",children:e("owner:ownerDashboardPage.performance")}),(0,j.jsx)("div",{className:"description",children:e("owner:ownerDashboardPage.performanceAnalytics")})]}),(0,j.jsxs)(q,{onClick:()=>r("/pos/owner/reports"),children:[(0,j.jsx)("div",{className:"icon",children:"\u2630"}),(0,j.jsx)("div",{className:"title",children:e("owner:ownerDashboardPage.reports")}),(0,j.jsx)("div",{className:"description",children:e("owner:ownerDashboardPage.detailedReports")})]})]})]}),(0,j.jsx)(G,{children:(0,j.jsxs)(T,{children:[(0,j.jsx)(X,{children:(0,j.jsx)(U,{children:e("owner:ownerDashboardPage.revenueDistribution")})}),De.length>0?(0,j.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,j.jsx)(d.u,{width:"50%",height:220,children:(0,j.jsxs)(g.r,{children:[(0,j.jsx)(v.F,{data:De,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:De.map((e,r)=>(0,j.jsx)(y.f,{fill:re[r%re.length]},r))}),(0,j.jsx)(x.m,{formatter:e=>(0,o.vv)(e,ye)})]})}),(0,j.jsx)("div",{style:{flex:1},children:De.map((e,r)=>(0,j.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,j.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:re[r%re.length],flexShrink:0}}),(0,j.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,j.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,o.vv)(e.value,ye)})]},r))})]}):(0,j.jsx)(ee,{children:e("owner:ownerDashboardPage.noRevenueDataAvailable")})]})}),(0,j.jsx)(Q,{children:e("owner:ownerDashboardPage.restaurantPerformance")}),(0,j.jsx)(M,{children:le.map(n=>(0,j.jsxs)(V,{onClick:()=>r(`/pos/owner/reports?tab=sales&restaurantId=${n.id}`),children:[(0,j.jsxs)(_,{children:[(0,j.jsxs)("div",{children:[(0,j.jsx)(K,{children:n.name}),(0,j.jsx)(W,{children:n.admin_name||"No admin assigned"})]}),(0,j.jsx)(Y,{status:n.status,children:n.status})]}),(0,j.jsxs)(Z,{children:[(0,j.jsxs)("div",{children:[(0,j.jsx)(H,{children:e("owner:ownerDashboardPage.today")}),(0,j.jsx)(J,{children:(0,o.vv)(n.todayRevenue,n.currency||ye)})]}),(0,j.jsxs)("div",{children:[(0,j.jsx)(H,{children:e("owner:ownerDashboardPage.thisMonth")}),(0,j.jsx)(J,{children:(0,o.vv)(n.monthRevenue,n.currency||ye)})]})]})]},n.id))})]})]})}}}]);