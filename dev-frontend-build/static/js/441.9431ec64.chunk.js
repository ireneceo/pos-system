"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[441],{441:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Z});var r=n(9950),i=n(4492),s=n(4752),o=n(8409),a=n(4021),l=n(6038),d=n(1095),c=n(2847),h=n(3245),u=n(158),p=n(3440),x=n(2174),g=n(4915),m=n(7621),v=n(5297),f=n(2528),y=n(4414);const j=s.Ay.div`
  min-height: 100vh;
`,b=s.Ay.div`
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
`,A=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,w=s.Ay.div`
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
`,S=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,B=s.Ay.div`
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
`,C=s.Ay.div`
  flex: 1;
  min-width: 0;
`,I=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,$=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,R=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,_=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,z=s.Ay.div`
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
`,D=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,P=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,M=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,O=s.Ay.div`
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
`,q=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,T=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,G=s.Ay.thead`
  background: #F8FAFC;
`,X=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,W=s.Ay.tbody``,L=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,K=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,U=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,Q=s.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6B7C93;
  font-size: 14px;
`,Y=["#EA580C","#F97316","#FB923C","#FDBA74","#FED7AA","#FFF7ED","#FFFBEB"],Z=()=>{const e=(0,i.Zp)(),{defaultCurrency:t}=(0,a.i1)(),[n,s]=(0,r.useState)("RM"),[Z,H]=(0,r.useState)(!0),[J,V]=(0,r.useState)(null),[ee,te]=(0,r.useState)("year"),[ne,re]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerTenant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[ie,se]=(0,r.useState)([]),[oe,ae]=(0,r.useState)([]),[le,de]=(0,r.useState)([]),[ce,he]=(0,r.useState)([]),[ue,pe]=(0,r.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,r.useEffect)(()=>{t&&s(t)},[t]),(0,r.useEffect)(()=>{me(),xe()},[]);const xe=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&pe(e.data)}}catch{}};(0,r.useEffect)(()=>{J&&ve(J)},[ee,J]);const ge=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),me=async()=>{try{H(!0);const e=ge(),t=await fetch("/api/foodcourts",{headers:e}),n=await t.json(),r=(n.data||n||[])[0];if(!r)return void H(!1);V(r.id),r.restaurants&&r.restaurants.length>0&&r.restaurants[0].currency&&s(r.restaurants[0].currency);const i=new Date,o=new Date(i.getFullYear(),i.getMonth(),1).toISOString().split("T")[0],a=i.toISOString().split("T")[0],[l,d,c,h,u]=await Promise.all([fetch(`/api/foodcourts/${r.id}/revenue?start_date=${o}&end_date=${a}`,{headers:e}),fetch(`/api/foodcourts/${r.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Foodcourt Manager",{headers:e}),fetch(`/api/foodcourts/${r.id}/subscriptions`,{headers:e})]),[p,x,g,m,v]=await Promise.all([l.json(),d.json(),c.json(),h.json(),u.json()]),f=p.data||p,y=parseFloat(f.total_revenue||0),j=f.restaurants||[],b=j.reduce((e,t)=>e+(t.order_count||0),0);se(j);const F=(x.data||x||[]).filter(e=>!1!==e.is_active).length,A=g.data||g||[],w=A.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,k=A.filter(e=>"overdue"===e.status).length,E=Array.isArray(m)?m:m.data||[],S=v.data||v||[];de(S),re({totalRestaurants:j.length,monthlyRevenue:y,monthlyOrders:b,avgRevenuePerTenant:j.length>0?y/j.length:0,pendingInvoices:w,overdueInvoices:k,activePlans:F,totalManagers:E.length});const B=[];k>0&&B.push({type:"warning",title:"Overdue Invoices",message:`${k} invoice(s) need attention`,link:"/pos/foodcourt/invoices"}),w>0&&B.push({type:"info",title:"Pending Invoices",message:`${w} invoice(s) pending payment`,link:"/pos/foodcourt/invoices"});const C=j.filter(e=>0===(e.order_count||0));C.length>0&&B.push({type:"info",title:"No Orders",message:`${C.length} tenant(s) with no orders this month`,link:"/pos/foodcourt/general/management"}),ue.notices>0&&B.push({type:"info",title:"Unread Notices",message:`${ue.notices} unread notice(s)`,link:"/pos/foodcourt/notices"}),ue.systemInquiry>0&&B.push({type:"info",title:"System Inquiry",message:`${ue.systemInquiry} inquiry(s) with new replies`,link:"/pos/foodcourt/system-inquiry"}),ue.operationInquiry>0&&B.push({type:"info",title:"Operation Inquiry",message:`${ue.operationInquiry} open inquiry(s)`,link:"/pos/foodcourt/operation-inquiry"}),0===B.length&&B.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),he(B),ve(r.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{H(!1)}},ve=async e=>{try{const t=ge(),n=await fetch(`/api/foodcourts/${e}/sales-trend?period=${ee}`,{headers:t}),r=await n.json();ae(r.data||[])}catch(t){console.error("Error fetching trend data:",t)}},fe=ie.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,t)=>t.value-e.value).slice(0,7),ye=[...le].sort((e,t)=>{var n,r;return((null===(n=t.current_month)||void 0===n?void 0:n.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return Z?(0,y.jsxs)(j,{children:[(0,y.jsx)(b,{children:(0,y.jsx)(A,{children:"Foodcourt Dashboard"})}),(0,y.jsx)(F,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]}):(0,y.jsxs)(j,{children:[(0,y.jsx)(b,{children:(0,y.jsx)(A,{children:"Foodcourt Dashboard"})}),(0,y.jsxs)(F,{children:[(0,y.jsxs)(o.Ot,{children:[(0,y.jsxs)(o.XS,{color:"#EA580C",children:[(0,y.jsx)(o.h2,{children:"Tenant Restaurants"}),(0,y.jsx)(o.G$,{children:ne.totalRestaurants})]}),(0,y.jsxs)(o.XS,{color:"#059669",children:[(0,y.jsx)(o.h2,{children:"Monthly Revenue"}),(0,y.jsx)(o.G$,{children:(0,l.vv)(ne.monthlyRevenue,n)})]}),(0,y.jsxs)(o.XS,{color:"#2563EB",children:[(0,y.jsx)(o.h2,{children:"Monthly Orders"}),(0,y.jsx)(o.G$,{children:ne.monthlyOrders.toLocaleString()})]}),(0,y.jsxs)(o.XS,{color:"#7C3AED",children:[(0,y.jsx)(o.h2,{children:"Avg Revenue / Tenant"}),(0,y.jsx)(o.G$,{children:(0,l.vv)(ne.avgRevenuePerTenant,n)})]}),(0,y.jsxs)(o.XS,{color:"#F59E0B",children:[(0,y.jsx)(o.h2,{children:"Pending Invoices"}),(0,y.jsx)(o.G$,{children:ne.pendingInvoices})]}),(0,y.jsxs)(o.XS,{color:ne.overdueInvoices>0?"#EF4444":"#059669",children:[(0,y.jsx)(o.h2,{children:"Overdue Invoices"}),(0,y.jsx)(o.G$,{children:ne.overdueInvoices})]}),(0,y.jsxs)(o.XS,{color:"#10B981",children:[(0,y.jsx)(o.h2,{children:"Active Plans"}),(0,y.jsx)(o.G$,{children:ne.activePlans})]}),(0,y.jsxs)(o.XS,{color:"#6366F1",children:[(0,y.jsx)(o.h2,{children:"Foodcourt Managers"}),(0,y.jsx)(o.G$,{children:ne.totalManagers})]})]}),(0,y.jsxs)(w,{children:[(0,y.jsxs)(k,{children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,y.jsx)("h3",{style:{margin:0},children:"Revenue Trend"}),(0,y.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,y.jsx)("button",{onClick:()=>te(e),style:{padding:"6px 12px",background:ee===e?"#635BFF":"transparent",color:ee===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),oe.length>0?(0,y.jsx)(d.u,{width:"100%",height:240,children:(0,y.jsxs)(c.b,{data:oe,children:[(0,y.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,y.jsx)(u.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,y.jsx)(p.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,y.jsx)(x.m,{formatter:e=>[(0,l.vv)(e,n),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,y.jsx)(g.N,{type:"monotone",dataKey:"sales",stroke:"#EA580C",strokeWidth:2,dot:{r:4,fill:"#EA580C"},activeDot:{r:6}})]})}):(0,y.jsx)(Q,{children:"No sales data for this period"})]}),(0,y.jsxs)(E,{children:[(0,y.jsx)("h3",{children:"Notifications"}),(0,y.jsx)(S,{children:ce.map((t,n)=>(0,y.jsx)(B,{type:t.type,onClick:()=>t.link&&e(t.link),children:(0,y.jsxs)(C,{children:[(0,y.jsx)(I,{type:t.type,children:t.title}),(0,y.jsx)($,{children:t.message})]})},n))})]})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)("h3",{children:"Quick Actions"}),(0,y.jsxs)(_,{children:[(0,y.jsxs)(z,{onClick:()=>e("/pos/foodcourt/general/management"),children:[(0,y.jsx)("div",{className:"icon",children:"\u25c9"}),(0,y.jsx)("div",{className:"title",children:"Foodcourts"}),(0,y.jsx)("div",{className:"description",children:"Foodcourt management"})]}),(0,y.jsxs)(z,{onClick:()=>e("/pos/foodcourt/invoices"),children:[(0,y.jsx)("div",{className:"icon",children:"\u25a6"}),(0,y.jsx)("div",{className:"title",children:"Invoices"}),(0,y.jsx)("div",{className:"description",children:"Invoice management"})]}),(0,y.jsxs)(z,{onClick:()=>e("/pos/foodcourt/plans"),children:[(0,y.jsx)("div",{className:"icon",children:"\u2630"}),(0,y.jsx)("div",{className:"title",children:"Subscription Plans"}),(0,y.jsx)("div",{className:"description",children:"Plan configuration"})]}),(0,y.jsxs)(z,{onClick:()=>e("/pos/foodcourt/general/stats"),children:[(0,y.jsx)("div",{className:"icon",children:"\u25b2"}),(0,y.jsx)("div",{className:"title",children:"Statistics"}),(0,y.jsx)("div",{className:"description",children:"Performance analytics"})]})]})]}),(0,y.jsx)(N,{children:(0,y.jsxs)(D,{children:[(0,y.jsx)(P,{children:(0,y.jsx)(M,{children:"Revenue Distribution"})}),fe.length>0?(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,y.jsx)(d.u,{width:"50%",height:220,children:(0,y.jsxs)(m.r,{children:[(0,y.jsx)(v.F,{data:fe,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:fe.map((e,t)=>(0,y.jsx)(f.f,{fill:Y[t%Y.length]},t))}),(0,y.jsx)(x.m,{formatter:e=>(0,l.vv)(e,n)})]})}),(0,y.jsx)("div",{style:{flex:1},children:fe.map((e,t)=>(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,y.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:Y[t%Y.length],flexShrink:0}}),(0,y.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,y.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,l.vv)(e.value,n)})]},t))})]}):(0,y.jsx)(Q,{children:"No revenue data available"})]})}),(0,y.jsx)(O,{children:(0,y.jsx)("h3",{children:"Tenant Performance"})}),(0,y.jsx)(q,{children:(0,y.jsxs)(T,{children:[(0,y.jsx)(G,{children:(0,y.jsxs)(L,{children:[(0,y.jsx)(X,{children:"Tenant"}),(0,y.jsx)(X,{children:"Plan"}),(0,y.jsx)(X,{children:"Monthly Revenue"}),(0,y.jsx)(X,{children:"Orders"}),(0,y.jsx)(X,{children:"Estimated Charges"}),(0,y.jsx)(X,{children:"Invoice Status"})]})}),(0,y.jsx)(W,{children:ye.length>0?ye.map((e,t)=>{var r,i,s,o,a,d;return(0,y.jsxs)(L,{children:[(0,y.jsx)(K,{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant_name||"-"}),(0,y.jsx)(K,{children:(null===(r=e.plan)||void 0===r?void 0:r.name)||"No Plan"}),(0,y.jsx)(K,{children:(0,l.vv)((null===(i=e.current_month)||void 0===i?void 0:i.revenue)||0,n)}),(0,y.jsx)(K,{children:(null===(s=e.current_month)||void 0===s?void 0:s.order_count)||0}),(0,y.jsx)(K,{children:(0,l.vv)((null===(o=e.current_month)||void 0===o?void 0:o.estimated_charges)||0,n)}),(0,y.jsx)(K,{children:(0,y.jsx)(U,{status:(null===(a=e.latest_invoice)||void 0===a?void 0:a.status)||"none",children:((null===(d=e.latest_invoice)||void 0===d?void 0:d.status)||"N/A").replace(/_/g," ")})})]},t)}):(0,y.jsx)(L,{children:(0,y.jsx)(K,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No tenant data available"})})})]})})]})]})}},4021:(e,t,n)=>{n.d(t,{i1:()=>o});var r=n(9950),i=n(1367),s=n(6038);const o=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[o]=(0,r.useState)(Object.keys(s.DL)),[a,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),r=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";n(r)}else n("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:a,error:d}}}}]);