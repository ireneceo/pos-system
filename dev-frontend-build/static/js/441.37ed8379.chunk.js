"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[441],{441:(e,t,i)=>{i.r(t),i.d(t,{default:()=>te});var n=i(9950),r=i(4492),s=i(4752),o=i(8409),a=i(3224),d=i(4021),l=i(8608),c=i(6038),p=i(1367),h=i(1095),u=i(2847),x=i(3245),g=i(158),f=i(3440),v=i(2174),m=i(4915),y=i(7621),j=i(5297),b=i(2528),F=i(4414);const A=s.Ay.div`
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
`,k=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,E=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,C=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7C93;
  margin-top: 4px;
`,B=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  ${e=>{let{variant:t}=e;switch(t){case"trial":return"background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;";case"active":return"background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;";case"expiring":return"background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;";case"expired":return"background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;"}}}
  &:hover { opacity: 0.8; }
`,S=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,I=s.Ay.div`
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
`,_=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,D=s.Ay.div`
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
`,z=s.Ay.div`
  flex: 1;
  min-width: 0;
`,N=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,R=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,P=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,T=s.Ay.div`
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
`,L=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,M=s.Ay.div`
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
`,W=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,K=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,U=s.Ay.thead`
  background: #F8FAFC;
`,Q=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Y=s.Ay.tbody``,Z=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,H=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,J=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,V=s.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`,ee=["#EA580C","#F97316","#FB923C","#FDBA74","#FED7AA","#FFF7ED","#FFFBEB"],te=()=>{const e=(0,r.Zp)(),{user:t}=(0,p.As)(),{defaultCurrency:i}=(0,d.i1)(),[s,te]=(0,n.useState)("RM"),[ie,ne]=(0,n.useState)(!0),[re,se]=(0,n.useState)(null),[oe,ae]=(0,n.useState)("year"),{items:de}=(0,l.d)({role:(null===t||void 0===t?void 0:t.role)||"",foodcourtId:null===t||void 0===t?void 0:t.foodcourt_id}),[le,ce]=(0,n.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerTenant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[pe,he]=(0,n.useState)([]),[ue,xe]=(0,n.useState)([]),[ge,fe]=(0,n.useState)([]),[ve,me]=(0,n.useState)([]),[ye,je]=(0,n.useState)({}),[be,Fe]=(0,n.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,n.useEffect)(()=>{i&&te(i)},[i]),(0,n.useEffect)(()=>{ke(),Ae()},[]);const Ae=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&Fe(e.data)}}catch{}};(0,n.useEffect)(()=>{re&&Ee(re)},[oe,re]);const we=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),ke=async()=>{try{if(!localStorage.getItem("auth_token"))return;ne(!0);const i=we(),n=await fetch("/api/foodcourts",{headers:i}),r=await n.json(),s=(r.data||r||[])[0];if(!s)return void ne(!1);se(s.id),s.restaurants&&s.restaurants.length>0&&s.restaurants[0].currency&&te(s.restaurants[0].currency);const o=new Date,a=new Date(o.getFullYear(),o.getMonth(),1).toISOString().split("T")[0],d=o.toISOString().split("T")[0],[l,c,p,h,u]=await Promise.all([fetch(`/api/foodcourts/${s.id}/revenue?start_date=${a}&end_date=${d}`,{headers:i}),fetch(`/api/foodcourts/${s.id}/plans`,{headers:i}),fetch("/api/invoices",{headers:i}),fetch("/api/users?role=Foodcourt Manager",{headers:i}),fetch(`/api/foodcourts/${s.id}/subscriptions`,{headers:i})]),[x,g,f,v,m]=await Promise.all([l.json(),c.json(),p.json(),h.json(),u.json()]),y=x.data||x,j=parseFloat(y.total_revenue||0),b=y.restaurants||[],F=b.reduce((e,t)=>e+(t.order_count||0),0);he(b);const A=(g.data||g||[]).filter(e=>!1!==e.is_active).length,w=f.data||f||[],k=w.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,E=w.filter(e=>"overdue"===e.status).length,C=Array.isArray(v)?v:v.data||[],B=m.data||m||[];fe(B),ce({totalRestaurants:b.length,monthlyRevenue:j,monthlyOrders:F,avgRevenuePerTenant:b.length>0?j/b.length:0,pendingInvoices:k,overdueInvoices:E,activePlans:A,totalManagers:C.length});const S=[];E>0&&S.push({type:"warning",title:"Overdue Invoices",message:`${E} invoice(s) need attention`,link:"/pos/foodcourt/invoices"}),k>0&&S.push({type:"info",title:"Pending Invoices",message:`${k} invoice(s) pending payment`,link:"/pos/foodcourt/invoices"});const I=b.filter(e=>0===(e.order_count||0));I.length>0&&S.push({type:"info",title:"No Orders",message:`${I.length} tenant(s) with no orders this month`,link:"/pos/foodcourt/general/management"}),be.notices>0&&S.push({type:"info",title:"Unread Notices",message:`${be.notices} unread notice(s)`,link:"/pos/foodcourt/notices"}),be.systemInquiry>0&&S.push({type:"info",title:"System Inquiry",message:`${be.systemInquiry} inquiry(s) with new replies`,link:"/pos/foodcourt/system-inquiry"}),be.operationInquiry>0&&S.push({type:"info",title:"Operation Inquiry",message:`${be.operationInquiry} open inquiry(s)`,link:"/pos/foodcourt/operation-inquiry"}),0===S.length&&S.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),me(S);try{const e=await fetch("/api/restaurants/subscription-status",{headers:i}),n=await e.json(),r=n.data||n,o=await fetch(`/api/users/${null===t||void 0===t?void 0:t.id}`,{headers:i}),a=await o.json(),d=a.data||a;je({planType:d.plan_type||s.plan_type,status:r.subscriptionStatus,daysLeft:d.subscription_end?Math.ceil((new Date(d.subscription_end).getTime()-Date.now())/864e5):void 0})}catch(e){}Ee(s.id)}catch(i){console.error("Error fetching dashboard data:",i)}finally{ne(!1)}},Ee=async e=>{try{if(!localStorage.getItem("auth_token"))return;const t=we(),i=await fetch(`/api/foodcourts/${e}/sales-trend?period=${oe}`,{headers:t}),n=await i.json();xe(n.data||[])}catch(t){console.error("Error fetching trend data:",t)}},Ce=pe.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,t)=>t.value-e.value).slice(0,7),Be=[...ge].sort((e,t)=>{var i,n;return((null===(i=t.current_month)||void 0===i?void 0:i.revenue)||0)-((null===(n=e.current_month)||void 0===n?void 0:n.revenue)||0)}).slice(0,5);return ie?(0,F.jsxs)(A,{children:[(0,F.jsx)(w,{children:(0,F.jsx)(E,{children:"Foodcourt Dashboard"})}),(0,F.jsx)(k,{children:(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]}):(0,F.jsxs)(A,{children:[(0,F.jsxs)(w,{children:[(0,F.jsx)(E,{children:"Foodcourt Dashboard"}),ye.planType&&(0,F.jsxs)(C,{children:[(0,F.jsx)("span",{children:ye.planType}),(()=>{const t=ye;return"trial"===t.status?(0,F.jsxs)(B,{variant:"trial",onClick:()=>e("/pos/profile?tab=subscription"),children:["Trial",void 0!==t.daysLeft?" \u2022 "+(t.daysLeft>0?t.daysLeft+" days left":"Expired"):""]}):"active"===t.status&&void 0!==t.daysLeft?t.daysLeft<=0?(0,F.jsx)(B,{variant:"expired",onClick:()=>e("/pos/profile?tab=subscription"),children:"Expired"}):t.daysLeft<=30?(0,F.jsxs)(B,{variant:"expiring",onClick:()=>e("/pos/profile?tab=subscription"),children:[t.daysLeft," days left"]}):(0,F.jsxs)(B,{variant:"active",onClick:()=>e("/pos/profile?tab=subscription"),children:[t.daysLeft," days left"]}):"expired"===t.status||"suspended"===t.status?(0,F.jsx)(B,{variant:"expired",onClick:()=>e("/pos/profile?tab=subscription"),children:t.status}):(0,F.jsx)(B,{variant:"active",onClick:()=>e("/pos/profile?tab=subscription"),children:"Active"})})()]})]}),(0,F.jsxs)(k,{children:[de.length>0&&(0,F.jsx)(a.eP,{items:de,entityId:`foodcourt_${null===t||void 0===t?void 0:t.foodcourt_id}`}),(0,F.jsxs)(o.Ot,{children:[(0,F.jsxs)(o.XS,{color:"#EA580C",children:[(0,F.jsx)(o.h2,{children:"Tenant Restaurants"}),(0,F.jsx)(o.G$,{children:le.totalRestaurants})]}),(0,F.jsxs)(o.XS,{color:"#059669",children:[(0,F.jsx)(o.h2,{children:"Monthly Revenue"}),(0,F.jsx)(o.G$,{children:(0,c.vv)(le.monthlyRevenue,s)})]}),(0,F.jsxs)(o.XS,{color:"#2563EB",children:[(0,F.jsx)(o.h2,{children:"Monthly Orders"}),(0,F.jsx)(o.G$,{children:le.monthlyOrders.toLocaleString()})]}),(0,F.jsxs)(o.XS,{color:"#7C3AED",children:[(0,F.jsx)(o.h2,{children:"Avg Revenue / Tenant"}),(0,F.jsx)(o.G$,{children:(0,c.vv)(le.avgRevenuePerTenant,s)})]}),(0,F.jsxs)(o.XS,{color:"#F59E0B",children:[(0,F.jsx)(o.h2,{children:"Pending Invoices"}),(0,F.jsx)(o.G$,{children:le.pendingInvoices})]}),(0,F.jsxs)(o.XS,{color:le.overdueInvoices>0?"#EF4444":"#059669",children:[(0,F.jsx)(o.h2,{children:"Overdue Invoices"}),(0,F.jsx)(o.G$,{children:le.overdueInvoices})]}),(0,F.jsxs)(o.XS,{color:"#10B981",children:[(0,F.jsx)(o.h2,{children:"Active Plans"}),(0,F.jsx)(o.G$,{children:le.activePlans})]}),(0,F.jsxs)(o.XS,{color:"#6366F1",children:[(0,F.jsx)(o.h2,{children:"Foodcourt Managers"}),(0,F.jsx)(o.G$,{children:le.totalManagers})]})]}),(0,F.jsxs)(S,{children:[(0,F.jsxs)(I,{children:[(0,F.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,F.jsx)("h3",{style:{margin:0},children:"Revenue Trend"}),(0,F.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,F.jsx)("button",{onClick:()=>ae(e),style:{padding:"6px 12px",background:oe===e?"#635BFF":"transparent",color:oe===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),ue.length>0?(0,F.jsx)(h.u,{width:"100%",height:240,children:(0,F.jsxs)(u.b,{data:ue,children:[(0,F.jsx)(x.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,F.jsx)(g.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,F.jsx)(f.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,F.jsx)(v.m,{formatter:e=>[(0,c.vv)(e,s),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,F.jsx)(m.N,{type:"monotone",dataKey:"sales",stroke:"#EA580C",strokeWidth:2,dot:{r:4,fill:"#EA580C"},activeDot:{r:6}})]})}):(0,F.jsx)(V,{children:"No sales data for this period"})]}),(0,F.jsxs)($,{children:[(0,F.jsx)("h3",{children:"Notifications"}),(0,F.jsx)(_,{children:ve.map((t,i)=>(0,F.jsx)(D,{type:t.type,onClick:()=>t.link&&e(t.link),children:(0,F.jsxs)(z,{children:[(0,F.jsx)(N,{type:t.type,children:t.title}),(0,F.jsx)(R,{children:t.message})]})},i))})]})]}),(0,F.jsxs)(P,{children:[(0,F.jsx)("h3",{children:"Quick Actions"}),(0,F.jsxs)(T,{children:[(0,F.jsxs)(O,{onClick:()=>e("/pos/foodcourt/general/management"),children:[(0,F.jsx)("div",{className:"icon",children:"\u25c9"}),(0,F.jsx)("div",{className:"title",children:"Foodcourts"}),(0,F.jsx)("div",{className:"description",children:"Foodcourt management"})]}),(0,F.jsxs)(O,{onClick:()=>e("/pos/foodcourt/invoices"),children:[(0,F.jsx)("div",{className:"icon",children:"\u25a6"}),(0,F.jsx)("div",{className:"title",children:"Invoices"}),(0,F.jsx)("div",{className:"description",children:"Invoice management"})]}),(0,F.jsxs)(O,{onClick:()=>e("/pos/foodcourt/plans"),children:[(0,F.jsx)("div",{className:"icon",children:"\u2630"}),(0,F.jsx)("div",{className:"title",children:"Subscription Plans"}),(0,F.jsx)("div",{className:"description",children:"Plan configuration"})]}),(0,F.jsxs)(O,{onClick:()=>e("/pos/foodcourt/general/reports"),children:[(0,F.jsx)("div",{className:"icon",children:"\u25b2"}),(0,F.jsx)("div",{className:"title",children:"Statistics"}),(0,F.jsx)("div",{className:"description",children:"Performance analytics"})]})]})]}),(0,F.jsx)(q,{children:(0,F.jsxs)(L,{children:[(0,F.jsx)(M,{children:(0,F.jsx)(G,{children:"Revenue Distribution"})}),Ce.length>0?(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,F.jsx)(h.u,{width:"50%",height:220,children:(0,F.jsxs)(y.r,{children:[(0,F.jsx)(j.F,{data:Ce,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:Ce.map((e,t)=>(0,F.jsx)(b.f,{fill:ee[t%ee.length]},t))}),(0,F.jsx)(v.m,{formatter:e=>(0,c.vv)(e,s)})]})}),(0,F.jsx)("div",{style:{flex:1},children:Ce.map((e,t)=>(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,F.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:ee[t%ee.length],flexShrink:0}}),(0,F.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,F.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,c.vv)(e.value,s)})]},t))})]}):(0,F.jsx)(V,{children:"No revenue data available"})]})}),(0,F.jsx)(X,{children:(0,F.jsx)("h3",{children:"Tenant Performance"})}),(0,F.jsx)(W,{children:(0,F.jsxs)(K,{children:[(0,F.jsx)(U,{children:(0,F.jsxs)(Z,{children:[(0,F.jsx)(Q,{children:"Tenant"}),(0,F.jsx)(Q,{children:"Plan"}),(0,F.jsx)(Q,{children:"Monthly Revenue"}),(0,F.jsx)(Q,{children:"Orders"}),(0,F.jsx)(Q,{children:"Estimated Charges"}),(0,F.jsx)(Q,{children:"Invoice Status"})]})}),(0,F.jsx)(Y,{children:Be.length>0?Be.map((e,t)=>{var i,n,r,o,a,d;return(0,F.jsxs)(Z,{children:[(0,F.jsx)(H,{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant_name||"-"}),(0,F.jsx)(H,{children:(null===(i=e.plan)||void 0===i?void 0:i.name)||"No Plan"}),(0,F.jsx)(H,{children:(0,c.vv)((null===(n=e.current_month)||void 0===n?void 0:n.revenue)||0,s)}),(0,F.jsx)(H,{children:(null===(r=e.current_month)||void 0===r?void 0:r.order_count)||0}),(0,F.jsx)(H,{children:(0,c.vv)((null===(o=e.current_month)||void 0===o?void 0:o.estimated_charges)||0,s)}),(0,F.jsx)(H,{children:(0,F.jsx)(J,{status:(null===(a=e.latest_invoice)||void 0===a?void 0:a.status)||"none",children:((null===(d=e.latest_invoice)||void 0===d?void 0:d.status)||"N/A").replace(/_/g," ")})})]},t)}):(0,F.jsx)(Z,{children:(0,F.jsx)(H,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No tenant data available"})})})]})})]})]})}}}]);