"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[749],{749:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Z});var r=t(9950),i=t(4492),s=t(4752),a=t(8409),o=t(4021),l=t(6038),d=t(1095),c=t(2847),h=t(3245),p=t(158),u=t(3440),x=t(2174),g=t(4915),m=t(7621),v=t(5297),y=t(2528),f=t(4414);const j=s.Ay.div`
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
`,w=s.Ay.h1`
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
`,C=s.Ay.div`
  flex: 1;
  min-width: 0;
`,R=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,I=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,$=s.Ay.div`
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
`,G=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,X=s.Ay.thead`
  background: #F8FAFC;
`,T=s.Ay.th`
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
`,Y=["#DC2626","#EF4444","#F87171","#FCA5A5","#FECACA","#FEE2E2","#FFF5F5"],Z=()=>{const e=(0,i.Zp)(),{defaultCurrency:n}=(0,o.i1)(),[t,s]=(0,r.useState)("RM"),[Z,H]=(0,r.useState)(!0),[J,V]=(0,r.useState)(null),[ee,ne]=(0,r.useState)("year"),[te,re]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerRestaurant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[ie,se]=(0,r.useState)([]),[ae,oe]=(0,r.useState)([]),[le,de]=(0,r.useState)([]),[ce,he]=(0,r.useState)([]),[pe,ue]=(0,r.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,r.useEffect)(()=>{n&&s(n)},[n]),(0,r.useEffect)(()=>{me(),xe()},[]);const xe=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const n=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&ue(e.data)}}catch{}};(0,r.useEffect)(()=>{J&&ve(J)},[ee,J]);const ge=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),me=async()=>{try{H(!0);const e=ge(),n=await fetch("/api/brands",{headers:e}),t=await n.json(),r=(t.data||t||[])[0];if(!r)return void H(!1);V(r.id),r.restaurants&&r.restaurants.length>0&&r.restaurants[0].currency&&s(r.restaurants[0].currency);const i=new Date,a=new Date(i.getFullYear(),i.getMonth(),1).toISOString().split("T")[0],o=i.toISOString().split("T")[0],[l,d,c,h,p]=await Promise.all([fetch(`/api/brands/${r.id}/revenue?start_date=${a}&end_date=${o}`,{headers:e}),fetch(`/api/brands/${r.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Brand Manager",{headers:e}),fetch(`/api/brands/${r.id}/subscriptions`,{headers:e})]),[u,x,g,m,v]=await Promise.all([l.json(),d.json(),c.json(),h.json(),p.json()]),y=u.data||u,f=parseFloat(y.total_revenue||0),j=y.restaurants||[],b=j.reduce((e,n)=>e+(n.order_count||0),0);oe(j);const F=(x.data||x||[]).filter(e=>!1!==e.is_active).length,w=g.data||g||[],A=w.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,k=w.filter(e=>"overdue"===e.status).length,E=Array.isArray(m)?m:m.data||[],B=v.data||v||[];de(B),re({totalRestaurants:j.length,monthlyRevenue:f,monthlyOrders:b,avgRevenuePerRestaurant:j.length>0?f/j.length:0,pendingInvoices:A,overdueInvoices:k,activePlans:F,totalManagers:E.length});const S=[];k>0&&S.push({type:"warning",title:"Overdue Invoices",message:`${k} invoice(s) need attention`,link:"/pos/brand/invoices"}),A>0&&S.push({type:"info",title:"Pending Invoices",message:`${A} invoice(s) pending payment`,link:"/pos/brand/invoices"});const C=j.filter(e=>0===(e.order_count||0));C.length>0&&S.push({type:"info",title:"No Orders",message:`${C.length} restaurant(s) with no orders this month`,link:"/pos/brand/general/management"}),pe.notices>0&&S.push({type:"info",title:"Unread Notices",message:`${pe.notices} unread notice(s)`,link:"/pos/brand/notices"}),pe.systemInquiry>0&&S.push({type:"info",title:"System Inquiry",message:`${pe.systemInquiry} inquiry(s) with new replies`,link:"/pos/brand/system-inquiry"}),pe.operationInquiry>0&&S.push({type:"info",title:"Operation Inquiry",message:`${pe.operationInquiry} open inquiry(s)`,link:"/pos/brand/operation-inquiry"}),0===S.length&&S.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),he(S),ve(r.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{H(!1)}},ve=async e=>{try{const n=ge(),t=await fetch(`/api/brands/${e}/sales-trend?period=${ee}`,{headers:n}),r=await t.json();se(r.data||[])}catch(n){console.error("Error fetching trend data:",n)}},ye=ae.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,n)=>n.value-e.value).slice(0,7),fe=[...le].sort((e,n)=>{var t,r;return((null===(t=n.current_month)||void 0===t?void 0:t.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return Z?(0,f.jsxs)(j,{children:[(0,f.jsx)(b,{children:(0,f.jsx)(w,{children:"Brand Dashboard"})}),(0,f.jsx)(F,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]}):(0,f.jsxs)(j,{children:[(0,f.jsx)(b,{children:(0,f.jsx)(w,{children:"Brand Dashboard"})}),(0,f.jsxs)(F,{children:[(0,f.jsxs)(a.Ot,{children:[(0,f.jsxs)(a.XS,{color:"#DC2626",children:[(0,f.jsx)(a.h2,{children:"Franchise Restaurants"}),(0,f.jsx)(a.G$,{children:te.totalRestaurants})]}),(0,f.jsxs)(a.XS,{color:"#059669",children:[(0,f.jsx)(a.h2,{children:"Monthly Revenue"}),(0,f.jsx)(a.G$,{children:(0,l.vv)(te.monthlyRevenue,t)})]}),(0,f.jsxs)(a.XS,{color:"#2563EB",children:[(0,f.jsx)(a.h2,{children:"Monthly Orders"}),(0,f.jsx)(a.G$,{children:te.monthlyOrders.toLocaleString()})]}),(0,f.jsxs)(a.XS,{color:"#7C3AED",children:[(0,f.jsx)(a.h2,{children:"Avg Revenue / Restaurant"}),(0,f.jsx)(a.G$,{children:(0,l.vv)(te.avgRevenuePerRestaurant,t)})]}),(0,f.jsxs)(a.XS,{color:"#F59E0B",children:[(0,f.jsx)(a.h2,{children:"Pending Invoices"}),(0,f.jsx)(a.G$,{children:te.pendingInvoices})]}),(0,f.jsxs)(a.XS,{color:te.overdueInvoices>0?"#EF4444":"#059669",children:[(0,f.jsx)(a.h2,{children:"Overdue Invoices"}),(0,f.jsx)(a.G$,{children:te.overdueInvoices})]}),(0,f.jsxs)(a.XS,{color:"#10B981",children:[(0,f.jsx)(a.h2,{children:"Active Plans"}),(0,f.jsx)(a.G$,{children:te.activePlans})]}),(0,f.jsxs)(a.XS,{color:"#6366F1",children:[(0,f.jsx)(a.h2,{children:"Brand Managers"}),(0,f.jsx)(a.G$,{children:te.totalManagers})]})]}),(0,f.jsxs)(A,{children:[(0,f.jsxs)(k,{children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,f.jsx)("h3",{style:{margin:0},children:"Revenue Trend"}),(0,f.jsx)("div",{style:{display:"flex",gap:"8px"},children:["week","month","year"].map(e=>(0,f.jsx)("button",{onClick:()=>ne(e),style:{padding:"6px 12px",background:ee===e?"#635BFF":"transparent",color:ee===e?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:e.charAt(0).toUpperCase()+e.slice(1)},e))})]}),ie.length>0?(0,f.jsx)(d.u,{width:"100%",height:240,children:(0,f.jsxs)(c.b,{data:ie,children:[(0,f.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,f.jsx)(p.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,f.jsx)(u.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,f.jsx)(x.m,{formatter:e=>[(0,l.vv)(e,t),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,f.jsx)(g.N,{type:"monotone",dataKey:"sales",stroke:"#DC2626",strokeWidth:2,dot:{r:4,fill:"#DC2626"},activeDot:{r:6}})]})}):(0,f.jsx)(Q,{children:"No sales data for this period"})]}),(0,f.jsxs)(E,{children:[(0,f.jsx)("h3",{children:"Notifications"}),(0,f.jsx)(B,{children:ce.map((n,t)=>(0,f.jsx)(S,{type:n.type,onClick:()=>n.link&&e(n.link),children:(0,f.jsxs)(C,{children:[(0,f.jsx)(R,{type:n.type,children:n.title}),(0,f.jsx)(I,{children:n.message})]})},t))})]})]}),(0,f.jsxs)($,{children:[(0,f.jsx)("h3",{children:"Quick Actions"}),(0,f.jsxs)(_,{children:[(0,f.jsxs)(z,{onClick:()=>e("/pos/brand/general/management"),children:[(0,f.jsx)("div",{className:"icon",children:"\u25ac"}),(0,f.jsx)("div",{className:"title",children:"Brands"}),(0,f.jsx)("div",{className:"description",children:"Brand management"})]}),(0,f.jsxs)(z,{onClick:()=>e("/pos/brand/invoices"),children:[(0,f.jsx)("div",{className:"icon",children:"\u25a6"}),(0,f.jsx)("div",{className:"title",children:"Invoices"}),(0,f.jsx)("div",{className:"description",children:"Invoice management"})]}),(0,f.jsxs)(z,{onClick:()=>e("/pos/brand/plans"),children:[(0,f.jsx)("div",{className:"icon",children:"\u2630"}),(0,f.jsx)("div",{className:"title",children:"Subscription Plans"}),(0,f.jsx)("div",{className:"description",children:"Plan configuration"})]}),(0,f.jsxs)(z,{onClick:()=>e("/pos/brand/general/reports"),children:[(0,f.jsx)("div",{className:"icon",children:"\u25c9"}),(0,f.jsx)("div",{className:"title",children:"Reports"}),(0,f.jsx)("div",{className:"description",children:"Performance analytics"})]})]})]}),(0,f.jsx)(N,{children:(0,f.jsxs)(D,{children:[(0,f.jsx)(P,{children:(0,f.jsx)(M,{children:"Revenue Distribution"})}),ye.length>0?(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"24px"},children:[(0,f.jsx)(d.u,{width:"50%",height:220,children:(0,f.jsxs)(m.r,{children:[(0,f.jsx)(v.F,{data:ye,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:ye.map((e,n)=>(0,f.jsx)(y.f,{fill:Y[n%Y.length]},n))}),(0,f.jsx)(x.m,{formatter:e=>(0,l.vv)(e,t)})]})}),(0,f.jsx)("div",{style:{flex:1},children:ye.map((e,n)=>(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6,fontSize:13,color:"#374151"},children:[(0,f.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:Y[n%Y.length],flexShrink:0}}),(0,f.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1},children:e.name}),(0,f.jsx)("span",{style:{fontWeight:600,flexShrink:0},children:(0,l.vv)(e.value,t)})]},n))})]}):(0,f.jsx)(Q,{children:"No revenue data available"})]})}),(0,f.jsx)(O,{children:(0,f.jsx)("h3",{children:"Restaurant Performance"})}),(0,f.jsx)(q,{children:(0,f.jsxs)(G,{children:[(0,f.jsx)(X,{children:(0,f.jsxs)(L,{children:[(0,f.jsx)(T,{children:"Restaurant"}),(0,f.jsx)(T,{children:"Plan"}),(0,f.jsx)(T,{children:"Monthly Revenue"}),(0,f.jsx)(T,{children:"Orders"}),(0,f.jsx)(T,{children:"Estimated Charges"}),(0,f.jsx)(T,{children:"Invoice Status"})]})}),(0,f.jsx)(W,{children:fe.length>0?fe.map((e,n)=>{var r,i,s,a,o,d;return(0,f.jsxs)(L,{children:[(0,f.jsx)(K,{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant_name||"-"}),(0,f.jsx)(K,{children:(null===(r=e.plan)||void 0===r?void 0:r.name)||"No Plan"}),(0,f.jsx)(K,{children:(0,l.vv)((null===(i=e.current_month)||void 0===i?void 0:i.revenue)||0,t)}),(0,f.jsx)(K,{children:(null===(s=e.current_month)||void 0===s?void 0:s.order_count)||0}),(0,f.jsx)(K,{children:(0,l.vv)((null===(a=e.current_month)||void 0===a?void 0:a.estimated_charges)||0,t)}),(0,f.jsx)(K,{children:(0,f.jsx)(U,{status:(null===(o=e.latest_invoice)||void 0===o?void 0:o.status)||"none",children:((null===(d=e.latest_invoice)||void 0===d?void 0:d.status)||"N/A").replace(/_/g," ")})})]},n)}):(0,f.jsx)(L,{children:(0,f.jsx)(K,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No restaurant data available"})})})]})})]})]})}},4021:(e,n,t)=>{t.d(n,{i1:()=>a});var r=t(9950),i=t(1367),s=t(6038);const a=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,r.useState)("RM"),[a]=(0,r.useState)(Object.keys(s.DL)),[o,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let i=r>=0?n[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var s;const e=await n.json(),r=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";t(r)}else t("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:a,loading:o,error:d}}}}]);