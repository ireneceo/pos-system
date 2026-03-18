"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6312],{6312:(e,t,r)=>{r.r(t),r.d(t,{default:()=>H});var n=r(9950),i=r(4492),s=r(4752),a=r(8409),o=r(6038),d=r(1095),l=r(294),c=r(3245),p=r(158),h=r(3440),x=r(2174),u=r(3588),g=r(7621),m=r(5297),v=r(2528),y=r(5651),f=r(4414);const j=s.Ay.div`
  min-height: 100vh;
`,w=s.Ay.div`
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
`,F=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,b=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,A=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,k=s.Ay.div`
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
`,E=s.Ay.div`
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
`,B=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,C=s.Ay.div`
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
`,R=s.Ay.div`
  flex: 1;
  min-width: 0;
`,$=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,S=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,z=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,I=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,D=s.Ay.div`
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
`,N=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,O=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,q=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,P=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,G=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,L=s.Ay.div`
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
`,X=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,T=s.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,U=s.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,M=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"inactive":case"overdue":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#92400E";case"inactive":case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,V=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,K=s.Ay.div`
  font-size: 11px;
  color: #8898AA;
  margin-bottom: 2px;
`,W=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,_=s.Ay.h3`
  margin: 0 0 20px 0;
  color: #0A2540;
  font-size: 18px;
  font-weight: 600;
`,Q=s.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`,Y=["#635BFF","#818CF8","#A5B4FC","#C7D2FE","#E0E7FF","#EEF2FF","#F5F3FF"],Z=s.Ay.div`
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
`,H=()=>{const e=(0,i.Zp)(),{paymentStatus:t}=(0,y.e)(),[r,s]=(0,n.useState)(!0),[H,J]=(0,n.useState)("month"),[ee,te]=(0,n.useState)({totalRestaurants:0,todayRevenue:0,monthRevenue:0,monthOrders:0,pendingInvoices:0,avgOrderValue:0,bestRestaurant:"-",activeRestaurants:0}),[re,ne]=(0,n.useState)([]),[ie,se]=(0,n.useState)([]),[ae,oe]=(0,n.useState)([]),[de,le]=(0,n.useState)("RM"),[ce,pe]=(0,n.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,n.useEffect)(()=>{ue(),he()},[]);const he=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&pe(e.data)}}catch{}};(0,n.useEffect)(()=>{ge()},[H]);const xe=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),ue=async()=>{try{s(!0);const e=xe(),[t,r,n]=await Promise.all([fetch("/api/owner/dashboard",{headers:e}),fetch(`/api/owner/statistics/compare?period=${H}`,{headers:e}),fetch("/api/owner/invoices?status=overdue",{headers:e})]),[i,a,o]=await Promise.all([t.json(),r.json(),n.json()]),d=i.data||i,l=d.restaurants||[];ne(l),l.length>0&&l[0].currency&&le(l[0].currency);const c=a.data||a||[];se(c);const p=c.reduce((e,t)=>e+parseFloat(t.revenue||0),0),h=c.reduce((e,t)=>e+(t.orderCount||0),0),x=h>0?p/h:0,u=c.length>0?c.reduce((e,t)=>parseFloat(t.revenue||0)>parseFloat(e.revenue||0)?t:e,c[0]):null,g=o.data||[],m=Array.isArray(g)?g.length:0,v=l.filter(e=>"inactive"!==e.status).length;te({totalRestaurants:d.totalRestaurants||l.length,todayRevenue:d.todayRevenue||0,monthRevenue:d.monthRevenue||0,monthOrders:d.totalOrders||h,pendingInvoices:d.pendingInvoices||0,avgOrderValue:x,bestRestaurant:(null===u||void 0===u?void 0:u.restaurantName)||"-",activeRestaurants:v});const y=[];m>0&&y.push({type:"warning",title:"Overdue Invoices",message:`${m} invoice(s) need attention`,link:"/pos/owner/invoices"}),(d.pendingInvoices||0)>0&&y.push({type:"info",title:"Pending Invoices",message:`${d.pendingInvoices} invoice(s) pending payment`,link:"/pos/owner/invoices"});const f=l.filter(e=>"inactive"===e.status);f.length>0&&y.push({type:"warning",title:"Inactive Restaurants",message:`${f.length} restaurant(s) currently inactive`,link:"/pos/owner/restaurants"});const j=l.filter(e=>0===(e.todayRevenue||0)&&"active"===e.status);j.length>0&&j.length<l.length&&y.push({type:"info",title:"No Orders Today",message:`${j.length} active restaurant(s) with no orders today`,link:"/pos/owner/restaurants"}),ce.notices>0&&y.push({type:"info",title:"Unread Notices",message:`${ce.notices} unread notice(s)`,link:"/pos/owner/notices"}),ce.systemInquiry>0&&y.push({type:"info",title:"System Inquiry",message:`${ce.systemInquiry} inquiry(s) with new replies`,link:"/pos/owner/system-inquiry"}),ce.operationInquiry>0&&y.push({type:"info",title:"Operation Inquiry",message:`${ce.operationInquiry} inquiry(s) with responses`,link:"/pos/owner/operation-inquiry"}),0===y.length&&y.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),oe(y)}catch(e){console.error("Error fetching dashboard:",e)}finally{s(!1)}},ge=async()=>{try{const e=xe(),t=await fetch(`/api/owner/statistics/compare?period=${H}`,{headers:e}),r=await t.json();se(r.data||r||[])}catch(e){console.error("Error fetching compare data:",e)}},me=ie.map(e=>({name:(e.restaurantName||"Unknown").length>12?(e.restaurantName||"Unknown").substring(0,12)+"...":e.restaurantName||"Unknown",revenue:parseFloat(e.revenue||0),orders:e.orderCount||0})),ve=ie.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurantName||"Unknown",value:parseFloat(e.revenue||0)}));return r?(0,f.jsxs)(j,{children:[(0,f.jsx)(w,{children:(0,f.jsx)(b,{children:"Owner Dashboard"})}),(0,f.jsx)(F,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]}):(0,f.jsxs)(j,{children:[(0,f.jsx)(w,{children:(0,f.jsx)(b,{children:"Owner Dashboard"})}),(0,f.jsxs)(F,{children:["trial"===t.subscriptionStatus&&t.trialEndDate&&(0,f.jsxs)(Z,{$type:"trial",children:["Trial period active \u2014 expires ",new Date(t.trialEndDate).toLocaleDateString(),". Please pay your invoice to continue service."]}),"warning"===t.restrictionLevel&&(0,f.jsxs)(Z,{$type:"warning",children:["Payment overdue (",t.overdueDays," days). Please pay ",t.currency?(0,o.vv)(t.overdueAmount,t.currency):`$${t.overdueAmount}`," to avoid service restrictions."]}),("partial"===t.restrictionLevel||"blocked"===t.restrictionLevel)&&(0,f.jsx)(Z,{$type:"danger",children:"blocked"===t.restrictionLevel?"Your subscription is suspended. Pay outstanding invoices to restore access.":`Service partially restricted due to overdue payment (${t.overdueDays} days). Some features are disabled.`}),(0,f.jsxs)(a.Ot,{children:[(0,f.jsxs)(a.XS,{color:"#635BFF",children:[(0,f.jsx)(a.h2,{children:"My Restaurants"}),(0,f.jsx)(a.G$,{children:ee.totalRestaurants})]}),(0,f.jsxs)(a.XS,{color:"#059669",children:[(0,f.jsx)(a.h2,{children:"Today's Revenue"}),(0,f.jsx)(a.G$,{children:(0,o.vv)(ee.todayRevenue,de)})]}),(0,f.jsxs)(a.XS,{color:"#10B981",children:[(0,f.jsx)(a.h2,{children:"Monthly Revenue"}),(0,f.jsx)(a.G$,{children:(0,o.vv)(ee.monthRevenue,de)})]}),(0,f.jsxs)(a.XS,{color:"#2563EB",children:[(0,f.jsx)(a.h2,{children:"Monthly Orders"}),(0,f.jsx)(a.G$,{children:ee.monthOrders.toLocaleString()})]}),(0,f.jsxs)(a.XS,{color:"#F59E0B",children:[(0,f.jsx)(a.h2,{children:"Pending Invoices"}),(0,f.jsx)(a.G$,{children:ee.pendingInvoices})]}),(0,f.jsxs)(a.XS,{color:"#7C3AED",children:[(0,f.jsx)(a.h2,{children:"Avg Order Value"}),(0,f.jsx)(a.G$,{children:(0,o.vv)(ee.avgOrderValue,de)})]}),(0,f.jsxs)(a.XS,{color:"#DC2626",children:[(0,f.jsx)(a.h2,{children:"Best Restaurant"}),(0,f.jsx)(a.G$,{style:{fontSize:ee.bestRestaurant.length>15?"16px":void 0},children:ee.bestRestaurant})]}),(0,f.jsxs)(a.XS,{color:"#059669",children:[(0,f.jsx)(a.h2,{children:"Active Restaurants"}),(0,f.jsx)(a.G$,{children:ee.activeRestaurants})]})]}),(0,f.jsxs)(A,{children:[(0,f.jsxs)(k,{children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,f.jsx)("h3",{style:{margin:0},children:"Revenue Comparison"}),(0,f.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,f.jsx)("button",{onClick:()=>J(e),style:{padding:"6px 12px",background:H===e?"#635BFF":"transparent",color:H===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),me.length>0?(0,f.jsx)(d.u,{width:"100%",height:240,children:(0,f.jsxs)(l.E,{data:me,children:[(0,f.jsx)(c.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,f.jsx)(p.W,{dataKey:"name",tick:{fontSize:12,fill:"#6B7C93"}}),(0,f.jsx)(h.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,f.jsx)(x.m,{formatter:(e,t)=>["revenue"===t?(0,o.vv)(e,de):e,"revenue"===t?"Revenue":"Orders"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,f.jsx)(u.y,{dataKey:"revenue",fill:"#635BFF",radius:[4,4,0,0]})]})}):(0,f.jsx)(Q,{children:"No comparison data available"})]}),(0,f.jsxs)(E,{children:[(0,f.jsx)("h3",{children:"Notifications"}),(0,f.jsx)(B,{children:ae.map((t,r)=>(0,f.jsx)(C,{type:t.type,onClick:()=>t.link&&e(t.link),children:(0,f.jsxs)(R,{children:[(0,f.jsx)($,{type:t.type,children:t.title}),(0,f.jsx)(S,{children:t.message})]})},r))})]})]}),(0,f.jsxs)(z,{children:[(0,f.jsx)("h3",{children:"Quick Actions"}),(0,f.jsxs)(I,{children:[(0,f.jsxs)(D,{onClick:()=>e("/pos/owner/restaurants"),children:[(0,f.jsx)("div",{className:"icon",children:"\u25d0"}),(0,f.jsx)("div",{className:"title",children:"Restaurants"}),(0,f.jsx)("div",{className:"description",children:"Restaurant management"})]}),(0,f.jsxs)(D,{onClick:()=>e("/pos/owner/invoices"),children:[(0,f.jsx)("div",{className:"icon",children:"\u25a6"}),(0,f.jsx)("div",{className:"title",children:"Invoices"}),(0,f.jsx)("div",{className:"description",children:"Invoice management"})]}),(0,f.jsxs)(D,{onClick:()=>e("/pos/owner/performance"),children:[(0,f.jsx)("div",{className:"icon",children:"\u25c8"}),(0,f.jsx)("div",{className:"title",children:"Performance"}),(0,f.jsx)("div",{className:"description",children:"Performance analytics"})]}),(0,f.jsxs)(D,{onClick:()=>e("/pos/owner/reports"),children:[(0,f.jsx)("div",{className:"icon",children:"\u2630"}),(0,f.jsx)("div",{className:"title",children:"Reports"}),(0,f.jsx)("div",{className:"description",children:"Detailed reports"})]})]})]}),(0,f.jsx)(N,{children:(0,f.jsxs)(O,{children:[(0,f.jsx)(q,{children:(0,f.jsx)(P,{children:"Revenue Distribution"})}),ve.length>0?(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,f.jsx)(d.u,{width:"50%",height:220,children:(0,f.jsxs)(g.r,{children:[(0,f.jsx)(m.F,{data:ve,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:ve.map((e,t)=>(0,f.jsx)(v.f,{fill:Y[t%Y.length]},t))}),(0,f.jsx)(x.m,{formatter:e=>(0,o.vv)(e,de)})]})}),(0,f.jsx)("div",{style:{flex:1},children:ve.map((e,t)=>(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,f.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:Y[t%Y.length],flexShrink:0}}),(0,f.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,f.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,o.vv)(e.value,de)})]},t))})]}):(0,f.jsx)(Q,{children:"No revenue data available"})]})}),(0,f.jsx)(_,{children:"Restaurant Performance"}),(0,f.jsx)(G,{children:re.map(t=>(0,f.jsxs)(L,{onClick:()=>e(`/pos/owner/reports?tab=sales&restaurantId=${t.id}`),children:[(0,f.jsxs)(X,{children:[(0,f.jsxs)("div",{children:[(0,f.jsx)(T,{children:t.name}),(0,f.jsx)(U,{children:t.admin_name||"No admin assigned"})]}),(0,f.jsx)(M,{status:t.status,children:t.status})]}),(0,f.jsxs)(V,{children:[(0,f.jsxs)("div",{children:[(0,f.jsx)(K,{children:"Today"}),(0,f.jsx)(W,{children:(0,o.vv)(t.todayRevenue,t.currency||de)})]}),(0,f.jsxs)("div",{children:[(0,f.jsx)(K,{children:"This Month"}),(0,f.jsx)(W,{children:(0,o.vv)(t.monthRevenue,t.currency||de)})]})]})]},t.id))})]})]})}}}]);