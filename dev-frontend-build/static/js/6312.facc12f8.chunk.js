"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6312],{6312:(e,t,i)=>{i.r(t),i.d(t,{default:()=>te});var r=i(9950),n=i(4492),s=i(4752),a=i(8409),o=i(6038),d=i(1095),l=i(294),c=i(3245),p=i(158),u=i(3440),x=i(2174),h=i(3588),g=i(7621),v=i(5297),y=i(2528),m=i(5651),f=i(1367),j=i(4414);const b=s.Ay.div`
  min-height: 100vh;
`,F=s.Ay.div`
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
`,w=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,A=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,k=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7C93;
  margin-top: 4px;
`,E=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  ${e=>{let{variant:t}=e;switch(t){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
  &:hover { opacity: 0.8; }
`,C=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,B=s.Ay.div`
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
`,$=s.Ay.div`
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
`,R=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,S=s.Ay.div`
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
`,D=s.Ay.div`
  flex: 1;
  min-width: 0;
`,z=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,I=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,N=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,L=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,O=s.Ay.div`
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
`,q=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,P=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,T=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,G=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,X=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,M=s.Ay.div`
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
`,U=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,_=s.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,V=s.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,K=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"inactive":case"overdue":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#92400E";case"inactive":case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,W=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,Q=s.Ay.div`
  font-size: 11px;
  color: #8898AA;
  margin-bottom: 2px;
`,Y=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,Z=s.Ay.h3`
  margin: 0 0 20px 0;
  color: #0A2540;
  font-size: 18px;
  font-weight: 600;
`,H=s.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`,J=["#635BFF","#818CF8","#A5B4FC","#C7D2FE","#E0E7FF","#EEF2FF","#F5F3FF"],ee=s.Ay.div`
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
`,te=()=>{const e=(0,n.Zp)(),{user:t}=(0,f.As)(),{paymentStatus:i}=(0,m.e)(),[s,te]=(0,r.useState)(!0),[ie,re]=(0,r.useState)("month"),[ne,se]=(0,r.useState)({totalRestaurants:0,todayRevenue:0,monthRevenue:0,monthOrders:0,pendingInvoices:0,avgOrderValue:0,bestRestaurant:"-",activeRestaurants:0}),[ae,oe]=(0,r.useState)([]),[de,le]=(0,r.useState)([]),[ce,pe]=(0,r.useState)([]),[ue,xe]=(0,r.useState)({}),[he,ge]=(0,r.useState)("RM"),[ve,ye]=(0,r.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,r.useEffect)(()=>{je(),me()},[]);const me=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&ye(e.data)}}catch{}};(0,r.useEffect)(()=>{be()},[ie]);const fe=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),je=async()=>{try{te(!0);const i=fe(),[r,n,s]=await Promise.all([fetch("/api/owner/dashboard",{headers:i}),fetch(`/api/owner/statistics/compare?period=${ie}`,{headers:i}),fetch("/api/owner/invoices?status=overdue",{headers:i})]),[a,o,d]=await Promise.all([r.json(),n.json(),s.json()]),l=a.data||a,c=l.restaurants||[];oe(c),c.length>0&&c[0].currency&&ge(c[0].currency);const p=o.data||o||[];le(p);const u=p.reduce((e,t)=>e+parseFloat(t.revenue||0),0),x=p.reduce((e,t)=>e+(t.orderCount||0),0),h=x>0?u/x:0,g=p.length>0?p.reduce((e,t)=>parseFloat(t.revenue||0)>parseFloat(e.revenue||0)?t:e,p[0]):null,v=d.data||[],y=Array.isArray(v)?v.length:0,m=c.filter(e=>"inactive"!==e.status).length;se({totalRestaurants:l.totalRestaurants||c.length,todayRevenue:l.todayRevenue||0,monthRevenue:l.monthRevenue||0,monthOrders:l.totalOrders||x,pendingInvoices:l.pendingInvoices||0,avgOrderValue:h,bestRestaurant:(null===g||void 0===g?void 0:g.restaurantName)||"-",activeRestaurants:m});const f=[];y>0&&f.push({type:"warning",title:"Overdue Invoices",message:`${y} invoice(s) need attention`,link:"/pos/owner/invoices"}),(l.pendingInvoices||0)>0&&f.push({type:"info",title:"Pending Invoices",message:`${l.pendingInvoices} invoice(s) pending payment`,link:"/pos/owner/invoices"});const j=c.filter(e=>"inactive"===e.status);j.length>0&&f.push({type:"warning",title:"Inactive Restaurants",message:`${j.length} restaurant(s) currently inactive`,link:"/pos/owner/restaurants"});const b=c.filter(e=>0===(e.todayRevenue||0)&&"active"===e.status);b.length>0&&b.length<c.length&&f.push({type:"info",title:"No Orders Today",message:`${b.length} active restaurant(s) with no orders today`,link:"/pos/owner/restaurants"}),ve.notices>0&&f.push({type:"info",title:"Unread Notices",message:`${ve.notices} unread notice(s)`,link:"/pos/owner/notices"}),ve.systemInquiry>0&&f.push({type:"info",title:"System Inquiry",message:`${ve.systemInquiry} inquiry(s) with new replies`,link:"/pos/owner/system-inquiry"}),ve.operationInquiry>0&&f.push({type:"info",title:"Operation Inquiry",message:`${ve.operationInquiry} inquiry(s) with responses`,link:"/pos/owner/operation-inquiry"}),0===f.length&&f.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),pe(f);try{const e=await fetch("/api/restaurants/subscription-status",{headers:i}),r=await e.json(),n=r.data||r,s=await fetch(`/api/users/${null===t||void 0===t?void 0:t.id}`,{headers:i}),a=await s.json(),o=a.data||a;xe({planType:o.plan_type,status:n.subscriptionStatus,daysLeft:o.subscription_end?Math.ceil((new Date(o.subscription_end).getTime()-Date.now())/864e5):void 0})}catch(e){}}catch(i){console.error("Error fetching dashboard:",i)}finally{te(!1)}},be=async()=>{try{const e=fe(),t=await fetch(`/api/owner/statistics/compare?period=${ie}`,{headers:e}),i=await t.json();le(i.data||i||[])}catch(e){console.error("Error fetching compare data:",e)}},Fe=de.map(e=>({name:(e.restaurantName||"Unknown").length>12?(e.restaurantName||"Unknown").substring(0,12)+"...":e.restaurantName||"Unknown",revenue:parseFloat(e.revenue||0),orders:e.orderCount||0})),we=de.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurantName||"Unknown",value:parseFloat(e.revenue||0)}));return s?(0,j.jsxs)(b,{children:[(0,j.jsx)(F,{children:(0,j.jsx)(A,{children:"Owner Dashboard"})}),(0,j.jsx)(w,{children:(0,j.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]}):(0,j.jsxs)(b,{children:[(0,j.jsxs)(F,{children:[(0,j.jsx)(A,{children:"Owner Dashboard"}),ue.planType&&(0,j.jsxs)(k,{children:[(0,j.jsx)("span",{children:ue.planType}),(()=>{const t=ue;return"trial"===t.status?(0,j.jsxs)(E,{variant:"trial",onClick:()=>e("/pos/profile?tab=subscription"),children:["Trial",void 0!==t.daysLeft?" \u2022 "+(t.daysLeft>0?t.daysLeft+" days left":"Expired"):""]}):"active"===t.status&&void 0!==t.daysLeft?t.daysLeft<=0?(0,j.jsx)(E,{variant:"expired",onClick:()=>e("/pos/profile?tab=subscription"),children:"Expired"}):t.daysLeft<=30?(0,j.jsxs)(E,{variant:"expiring",onClick:()=>e("/pos/profile?tab=subscription"),children:[t.daysLeft," days left"]}):(0,j.jsxs)(E,{variant:"active",onClick:()=>e("/pos/profile?tab=subscription"),children:[t.daysLeft," days left"]}):"expired"===t.status||"suspended"===t.status?(0,j.jsx)(E,{variant:"expired",onClick:()=>e("/pos/profile?tab=subscription"),children:t.status}):(0,j.jsx)(E,{variant:"active",onClick:()=>e("/pos/profile?tab=subscription"),children:"Active"})})()]})]}),(0,j.jsxs)(w,{children:["trial"===i.subscriptionStatus&&i.trialEndDate&&(0,j.jsxs)(ee,{$type:"trial",children:["Trial period active \u2014 expires ",new Date(i.trialEndDate).toLocaleDateString(),". Please pay your invoice to continue service."]}),"warning"===i.restrictionLevel&&(0,j.jsxs)(ee,{$type:"warning",children:["Payment overdue (",i.overdueDays," days). Please pay ",i.currency?(0,o.vv)(i.overdueAmount,i.currency):`$${i.overdueAmount}`," to avoid service restrictions."]}),("partial"===i.restrictionLevel||"blocked"===i.restrictionLevel)&&(0,j.jsx)(ee,{$type:"danger",children:"blocked"===i.restrictionLevel?"Your subscription is suspended. Pay outstanding invoices to restore access.":`Service partially restricted due to overdue payment (${i.overdueDays} days). Some features are disabled.`}),(0,j.jsxs)(a.Ot,{children:[(0,j.jsxs)(a.XS,{color:"#635BFF",children:[(0,j.jsx)(a.h2,{children:"My Restaurants"}),(0,j.jsx)(a.G$,{children:ne.totalRestaurants})]}),(0,j.jsxs)(a.XS,{color:"#059669",children:[(0,j.jsx)(a.h2,{children:"Today's Revenue"}),(0,j.jsx)(a.G$,{children:(0,o.vv)(ne.todayRevenue,he)})]}),(0,j.jsxs)(a.XS,{color:"#10B981",children:[(0,j.jsx)(a.h2,{children:"Monthly Revenue"}),(0,j.jsx)(a.G$,{children:(0,o.vv)(ne.monthRevenue,he)})]}),(0,j.jsxs)(a.XS,{color:"#2563EB",children:[(0,j.jsx)(a.h2,{children:"Monthly Orders"}),(0,j.jsx)(a.G$,{children:ne.monthOrders.toLocaleString()})]}),(0,j.jsxs)(a.XS,{color:"#F59E0B",children:[(0,j.jsx)(a.h2,{children:"Pending Invoices"}),(0,j.jsx)(a.G$,{children:ne.pendingInvoices})]}),(0,j.jsxs)(a.XS,{color:"#7C3AED",children:[(0,j.jsx)(a.h2,{children:"Avg Order Value"}),(0,j.jsx)(a.G$,{children:(0,o.vv)(ne.avgOrderValue,he)})]}),(0,j.jsxs)(a.XS,{color:"#DC2626",children:[(0,j.jsx)(a.h2,{children:"Best Restaurant"}),(0,j.jsx)(a.G$,{style:{fontSize:ne.bestRestaurant.length>15?"16px":void 0},children:ne.bestRestaurant})]}),(0,j.jsxs)(a.XS,{color:"#059669",children:[(0,j.jsx)(a.h2,{children:"Active Restaurants"}),(0,j.jsx)(a.G$,{children:ne.activeRestaurants})]})]}),(0,j.jsxs)(C,{children:[(0,j.jsxs)(B,{children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,j.jsx)("h3",{style:{margin:0},children:"Revenue Comparison"}),(0,j.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,j.jsx)("button",{onClick:()=>re(e),style:{padding:"6px 12px",background:ie===e?"#635BFF":"transparent",color:ie===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),Fe.length>0?(0,j.jsx)(d.u,{width:"100%",height:240,children:(0,j.jsxs)(l.E,{data:Fe,children:[(0,j.jsx)(c.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,j.jsx)(p.W,{dataKey:"name",tick:{fontSize:12,fill:"#6B7C93"}}),(0,j.jsx)(u.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,j.jsx)(x.m,{formatter:(e,t)=>["revenue"===t?(0,o.vv)(e,he):e,"revenue"===t?"Revenue":"Orders"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,j.jsx)(h.y,{dataKey:"revenue",fill:"#635BFF",radius:[4,4,0,0]})]})}):(0,j.jsx)(H,{children:"No comparison data available"})]}),(0,j.jsxs)($,{children:[(0,j.jsx)("h3",{children:"Notifications"}),(0,j.jsx)(R,{children:ce.map((t,i)=>(0,j.jsx)(S,{type:t.type,onClick:()=>t.link&&e(t.link),children:(0,j.jsxs)(D,{children:[(0,j.jsx)(z,{type:t.type,children:t.title}),(0,j.jsx)(I,{children:t.message})]})},i))})]})]}),(0,j.jsxs)(N,{children:[(0,j.jsx)("h3",{children:"Quick Actions"}),(0,j.jsxs)(L,{children:[(0,j.jsxs)(O,{onClick:()=>e("/pos/owner/restaurants"),children:[(0,j.jsx)("div",{className:"icon",children:"\u25d0"}),(0,j.jsx)("div",{className:"title",children:"Restaurants"}),(0,j.jsx)("div",{className:"description",children:"Restaurant management"})]}),(0,j.jsxs)(O,{onClick:()=>e("/pos/owner/invoices"),children:[(0,j.jsx)("div",{className:"icon",children:"\u25a6"}),(0,j.jsx)("div",{className:"title",children:"Invoices"}),(0,j.jsx)("div",{className:"description",children:"Invoice management"})]}),(0,j.jsxs)(O,{onClick:()=>e("/pos/owner/performance"),children:[(0,j.jsx)("div",{className:"icon",children:"\u25c8"}),(0,j.jsx)("div",{className:"title",children:"Performance"}),(0,j.jsx)("div",{className:"description",children:"Performance analytics"})]}),(0,j.jsxs)(O,{onClick:()=>e("/pos/owner/reports"),children:[(0,j.jsx)("div",{className:"icon",children:"\u2630"}),(0,j.jsx)("div",{className:"title",children:"Reports"}),(0,j.jsx)("div",{className:"description",children:"Detailed reports"})]})]})]}),(0,j.jsx)(q,{children:(0,j.jsxs)(P,{children:[(0,j.jsx)(T,{children:(0,j.jsx)(G,{children:"Revenue Distribution"})}),we.length>0?(0,j.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,j.jsx)(d.u,{width:"50%",height:220,children:(0,j.jsxs)(g.r,{children:[(0,j.jsx)(v.F,{data:we,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:we.map((e,t)=>(0,j.jsx)(y.f,{fill:J[t%J.length]},t))}),(0,j.jsx)(x.m,{formatter:e=>(0,o.vv)(e,he)})]})}),(0,j.jsx)("div",{style:{flex:1},children:we.map((e,t)=>(0,j.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,j.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:J[t%J.length],flexShrink:0}}),(0,j.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,j.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,o.vv)(e.value,he)})]},t))})]}):(0,j.jsx)(H,{children:"No revenue data available"})]})}),(0,j.jsx)(Z,{children:"Restaurant Performance"}),(0,j.jsx)(X,{children:ae.map(t=>(0,j.jsxs)(M,{onClick:()=>e(`/pos/owner/reports?tab=sales&restaurantId=${t.id}`),children:[(0,j.jsxs)(U,{children:[(0,j.jsxs)("div",{children:[(0,j.jsx)(_,{children:t.name}),(0,j.jsx)(V,{children:t.admin_name||"No admin assigned"})]}),(0,j.jsx)(K,{status:t.status,children:t.status})]}),(0,j.jsxs)(W,{children:[(0,j.jsxs)("div",{children:[(0,j.jsx)(Q,{children:"Today"}),(0,j.jsx)(Y,{children:(0,o.vv)(t.todayRevenue,t.currency||he)})]}),(0,j.jsxs)("div",{children:[(0,j.jsx)(Q,{children:"This Month"}),(0,j.jsx)(Y,{children:(0,o.vv)(t.monthRevenue,t.currency||he)})]})]})]},t.id))})]})]})}}}]);