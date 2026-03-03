"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[441],{441:(e,t,n)=>{n.r(t),n.d(t,{default:()=>U});var r=n(9950),s=n(4492),o=n(4752),i=n(5665),a=n(4021),l=n(6038),d=n(1095),c=n(2847),h=n(3245),u=n(158),p=n(3440),x=n(2174),g=n(4915),v=n(7621),j=n(5297),m=n(2528),y=n(4414);const f=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,F=o.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
`,b=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  @media (max-width: 768px) { font-size: 20px; }
`,A=o.Ay.main`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,w=o.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,E=o.Ay.div`
  background: ${e=>"warning"===e.type?"#FEF2F2":"success"===e.type?"#ECFDF5":"#EFF6FF"};
  border-left: 4px solid ${e=>"warning"===e.type?"#DC2626":"success"===e.type?"#059669":"#2563EB"};
  color: ${e=>"warning"===e.type?"#991B1B":"success"===e.type?"#064E3B":"#1E3A8A"};
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
`,k=o.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,S=o.Ay.div`
  margin-bottom: 32px;
`,B=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,C=o.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  color: #0A2540;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  cursor: pointer;

  &:hover {
    border-color: #FDBA74;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,I=o.Ay.div`
  color: #EA580C;
  font-size: 20px;
  margin-bottom: 12px;
`,R=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0A2540;
`,_=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,$=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,z=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,M=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,O=o.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,D=o.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #EA580C; }
`,T=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 32px;
  overflow-x: auto;
`,P=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`,q=o.Ay.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,N=o.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,W=o.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,K=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,L=["#EA580C","#F97316","#FB923C","#FDBA74","#FED7AA","#FFF7ED","#FFFBEB"],U=()=>{const e=(0,s.Zp)(),{defaultCurrency:t}=(0,a.i1)(),[n,o]=(0,r.useState)("RM"),[U,Y]=(0,r.useState)(!0),[Q,V]=(0,r.useState)(null),[Z,G]=(0,r.useState)("month"),[H,J]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerTenant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[X,ee]=(0,r.useState)([]),[te,ne]=(0,r.useState)([]),[re,se]=(0,r.useState)([]),[oe,ie]=(0,r.useState)([]),[ae,le]=(0,r.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,r.useEffect)(()=>{t&&o(t)},[t]),(0,r.useEffect)(()=>{he(),de()},[]);const de=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&le(e.data)}}catch(e){}};(0,r.useEffect)(()=>{Q&&ue(Q)},[Z,Q]);const ce=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),he=async()=>{try{Y(!0);const e=ce(),t=await fetch("/api/foodcourts",{headers:e}),n=await t.json(),r=(n.data||n||[])[0];if(!r)return void Y(!1);V(r.id),r.restaurants&&r.restaurants.length>0&&r.restaurants[0].currency&&o(r.restaurants[0].currency);const s=new Date,i=new Date(s.getFullYear(),s.getMonth(),1).toISOString().split("T")[0],a=s.toISOString().split("T")[0],[l,d,c,h,u]=await Promise.all([fetch(`/api/foodcourts/${r.id}/revenue?start_date=${i}&end_date=${a}`,{headers:e}),fetch(`/api/foodcourts/${r.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Foodcourt Manager",{headers:e}),fetch(`/api/foodcourts/${r.id}/subscriptions`,{headers:e})]),[p,x,g,v,j]=await Promise.all([l.json(),d.json(),c.json(),h.json(),u.json()]),m=p.data||p,y=parseFloat(m.total_revenue||0),f=m.restaurants||[],F=f.reduce((e,t)=>e+(t.order_count||0),0);ee(f);const b=(x.data||x||[]).filter(e=>!1!==e.is_active).length,A=g.data||g||[],w=A.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,E=A.filter(e=>"overdue"===e.status).length,k=Array.isArray(v)?v:v.data||[],S=j.data||j||[];se(S),J({totalRestaurants:f.length,monthlyRevenue:y,monthlyOrders:F,avgRevenuePerTenant:f.length>0?y/f.length:0,pendingInvoices:w,overdueInvoices:E,activePlans:b,totalManagers:k.length});const B=[];E>0&&B.push({type:"warning",message:`${E} overdue invoice${E>1?"s":""} need attention`}),w>0&&B.push({type:"info",message:`${w} invoice${w>1?"s":""} pending payment`});const C=f.filter(e=>0===(e.order_count||0));C.length>0&&B.push({type:"info",message:`${C.length} tenant${C.length>1?"s":""} with no orders this month`}),ae.notices>0&&B.push({type:"info",message:`${ae.notices} unread notice(s)`}),ae.systemInquiry>0&&B.push({type:"info",message:`${ae.systemInquiry} system inquiry(s) with new replies`}),ae.operationInquiry>0&&B.push({type:"info",message:`${ae.operationInquiry} open operation inquiry(s)`}),0===B.length&&B.push({type:"success",message:"All systems running smoothly. No issues detected."}),ie(B),ue(r.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{Y(!1)}},ue=async e=>{try{const t=ce(),n=await fetch(`/api/foodcourts/${e}/sales-trend?period=${Z}`,{headers:t}),r=await n.json();ne(r.data||[])}catch(t){console.error("Error fetching trend data:",t)}},pe=X.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,t)=>t.value-e.value).slice(0,7),xe=[...re].sort((e,t)=>{var n,r;return((null===(n=t.current_month)||void 0===n?void 0:n.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return U?(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(f,{children:[(0,y.jsx)(F,{children:(0,y.jsx)(b,{children:"Foodcourt Dashboard"})}),(0,y.jsx)(K,{children:"Loading dashboard data..."})]})}):(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(f,{children:[(0,y.jsx)(F,{children:(0,y.jsx)(b,{children:"Foodcourt Dashboard"})}),(0,y.jsxs)(A,{children:[(0,y.jsxs)(i.MD,{children:[(0,y.jsxs)(i.hI,{color:"#EA580C",children:[(0,y.jsx)(i.Os,{children:H.totalRestaurants}),(0,y.jsx)(i.v0,{children:"Tenant Restaurants"})]}),(0,y.jsxs)(i.hI,{color:"#059669",children:[(0,y.jsx)(i.Os,{children:(0,l.vv)(H.monthlyRevenue,n)}),(0,y.jsx)(i.v0,{children:"Monthly Revenue"})]}),(0,y.jsxs)(i.hI,{color:"#2563EB",children:[(0,y.jsx)(i.Os,{children:H.monthlyOrders.toLocaleString()}),(0,y.jsx)(i.v0,{children:"Monthly Orders"})]}),(0,y.jsxs)(i.hI,{color:"#7C3AED",children:[(0,y.jsx)(i.Os,{children:(0,l.vv)(H.avgRevenuePerTenant,n)}),(0,y.jsx)(i.v0,{children:"Avg Revenue / Tenant"})]}),(0,y.jsxs)(i.hI,{color:"#F59E0B",children:[(0,y.jsx)(i.Os,{children:H.pendingInvoices}),(0,y.jsx)(i.v0,{children:"Pending Invoices"})]}),(0,y.jsxs)(i.hI,{color:H.overdueInvoices>0?"#EF4444":"#059669",children:[(0,y.jsx)(i.Os,{children:H.overdueInvoices}),(0,y.jsx)(i.v0,{children:"Overdue Invoices"})]}),(0,y.jsxs)(i.hI,{color:"#10B981",children:[(0,y.jsx)(i.Os,{children:H.activePlans}),(0,y.jsx)(i.v0,{children:"Active Plans"})]}),(0,y.jsxs)(i.hI,{color:"#6366F1",children:[(0,y.jsx)(i.Os,{children:H.totalManagers}),(0,y.jsx)(i.v0,{children:"Foodcourt Managers"})]})]}),(0,y.jsxs)(S,{children:[(0,y.jsx)(w,{children:"System Alerts"}),oe.map((e,t)=>(0,y.jsxs)(E,{type:e.type,children:[(0,y.jsx)(k,{children:"warning"===e.type?"\u26a0\ufe0f":"success"===e.type?"\u2713":"\u2139"}),e.message]},t))]}),(0,y.jsxs)(S,{children:[(0,y.jsx)(w,{children:"Quick Access"}),(0,y.jsxs)(B,{children:[(0,y.jsxs)(C,{onClick:()=>e("/pos/foodcourt/general/management"),children:[(0,y.jsx)(I,{children:"\u25eb"}),(0,y.jsx)(R,{children:"Manage Tenants"}),(0,y.jsx)(_,{children:"Tenant management"})]}),(0,y.jsxs)(C,{onClick:()=>e("/pos/foodcourt/invoices"),children:[(0,y.jsx)(I,{children:"\u25e7"}),(0,y.jsx)(R,{children:"Invoices"}),(0,y.jsx)(_,{children:"Invoice management"})]}),(0,y.jsxs)(C,{onClick:()=>e("/pos/foodcourt/plans"),children:[(0,y.jsx)(I,{children:"\u25e8"}),(0,y.jsx)(R,{children:"Subscription Plans"}),(0,y.jsx)(_,{children:"Plan configuration"})]}),(0,y.jsxs)(C,{onClick:()=>e("/pos/foodcourt/general/stats"),children:[(0,y.jsx)(I,{children:"\u25e9"}),(0,y.jsx)(R,{children:"Reports"}),(0,y.jsx)(_,{children:"Performance analytics"})]})]})]}),(0,y.jsxs)($,{children:[(0,y.jsxs)(z,{children:[(0,y.jsxs)(M,{children:[(0,y.jsx)(O,{children:"Revenue Trend"}),(0,y.jsxs)(D,{value:Z,onChange:e=>G(e.target.value),children:[(0,y.jsx)("option",{value:"week",children:"This Week"}),(0,y.jsx)("option",{value:"month",children:"This Month"}),(0,y.jsx)("option",{value:"year",children:"This Year"})]})]}),te.length>0?(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(c.b,{data:te,children:[(0,y.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,y.jsx)(u.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,y.jsx)(p.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,y.jsx)(x.m,{formatter:e=>[(0,l.vv)(e,n),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,y.jsx)(g.N,{type:"monotone",dataKey:"sales",stroke:"#EA580C",strokeWidth:2,dot:{r:4,fill:"#EA580C"},activeDot:{r:6}})]})}):(0,y.jsx)(K,{children:"No sales data for this period"})]}),(0,y.jsxs)(z,{children:[(0,y.jsx)(M,{children:(0,y.jsx)(O,{children:"Revenue Distribution"})}),pe.length>0?(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(v.r,{children:[(0,y.jsx)(j.F,{data:pe,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:pe.map((e,t)=>(0,y.jsx)(m.f,{fill:L[t%L.length]},t))}),(0,y.jsx)(x.m,{formatter:e=>(0,l.vv)(e,n)})]})}):(0,y.jsx)(K,{children:"No revenue data available"}),(0,y.jsx)("div",{style:{marginTop:8},children:pe.map((e,t)=>(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:"#374151"},children:[(0,y.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:L[t%L.length],flexShrink:0}}),(0,y.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name})]},t))})]})]}),(0,y.jsxs)(T,{children:[(0,y.jsxs)(M,{children:[(0,y.jsx)(w,{style:{margin:0},children:"Tenant Performance"}),(0,y.jsx)("span",{style:{fontSize:12,color:"#6B7C93",cursor:"pointer"},onClick:()=>e("/pos/foodcourt-general/restaurants"),children:"View All \u2192"})]}),(0,y.jsxs)(P,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(q,{children:"Tenant"}),(0,y.jsx)(q,{children:"Plan"}),(0,y.jsx)(q,{children:"Monthly Revenue"}),(0,y.jsx)(q,{children:"Orders"}),(0,y.jsx)(q,{children:"Estimated Charges"}),(0,y.jsx)(q,{children:"Invoice Status"})]})}),(0,y.jsx)("tbody",{children:xe.length>0?xe.map((e,t)=>{var r,s,o,i,a,d;return(0,y.jsxs)("tr",{children:[(0,y.jsx)(N,{style:{fontWeight:600},children:e.restaurant_name||"-"}),(0,y.jsx)(N,{children:(null===(r=e.plan)||void 0===r?void 0:r.name)||"No Plan"}),(0,y.jsx)(N,{children:(0,l.vv)((null===(s=e.current_month)||void 0===s?void 0:s.revenue)||0,n)}),(0,y.jsx)(N,{children:(null===(o=e.current_month)||void 0===o?void 0:o.order_count)||0}),(0,y.jsx)(N,{children:(0,l.vv)((null===(i=e.current_month)||void 0===i?void 0:i.estimated_charges)||0,n)}),(0,y.jsx)(N,{children:(0,y.jsx)(W,{status:(null===(a=e.latest_invoice)||void 0===a?void 0:a.status)||"none",children:((null===(d=e.latest_invoice)||void 0===d?void 0:d.status)||"N/A").replace(/_/g," ")})})]},t)}):(0,y.jsx)("tr",{children:(0,y.jsx)(N,{colSpan:6,style:{textAlign:"center",color:"#6B7280"},children:"No tenant data available"})})})]})]})]})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>i});var r=n(9950),s=n(1367),o=n(6038);const i=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("RM"),[i]=(0,r.useState)(Object.keys(o.DL)),[a,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let s=r>=0?t[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";n(r)}else n("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),c("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:a,error:d}}}}]);