"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[441],{441:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Y});var r=n(9950),s=n(4492),o=n(4752),i=n(5665),a=n(4021),l=n(6038),d=n(1095),c=n(2847),h=n(3245),u=n(158),p=n(3440),x=n(2174),g=n(4915),v=n(7621),j=n(5297),m=n(2528),y=n(1367),f=n(4414);const F=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,b=o.Ay.div`
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
`,A=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  @media (max-width: 768px) { font-size: 20px; }
`,w=o.Ay.main`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,E=o.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,k=o.Ay.div`
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
`,S=o.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,B=o.Ay.div`
  margin-bottom: 32px;
`,C=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,I=o.Ay.div`
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
`,R=o.Ay.div`
  color: #EA580C;
  font-size: 20px;
  margin-bottom: 12px;
`,_=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0A2540;
`,$=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,z=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,M=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,O=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,D=o.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,T=o.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #EA580C; }
`,P=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 32px;
  overflow-x: auto;
`,q=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`,N=o.Ay.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,W=o.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,K=o.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,L=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,U=["#EA580C","#F97316","#FB923C","#FDBA74","#FED7AA","#FFF7ED","#FFFBEB"],Y=()=>{const e=(0,s.Zp)(),{user:t}=(0,y.As)(),{defaultCurrency:n}=(0,a.i1)(),[o,Y]=(0,r.useState)("RM"),[Q,V]=(0,r.useState)(!0),[Z,G]=(0,r.useState)(null),[H,J]=(0,r.useState)("month"),[X,ee]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerTenant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[te,ne]=(0,r.useState)([]),[re,se]=(0,r.useState)([]),[oe,ie]=(0,r.useState)([]),[ae,le]=(0,r.useState)([]),[de,ce]=(0,r.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,r.useEffect)(()=>{n&&Y(n)},[n]),(0,r.useEffect)(()=>{pe(),he()},[]);const he=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&ce(e.data)}}catch(e){}};(0,r.useEffect)(()=>{Z&&xe(Z)},[H,Z]);const ue=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),pe=async()=>{try{V(!0);const e=ue(),t=await fetch("/api/foodcourts",{headers:e}),n=await t.json(),r=(n.data||n||[])[0];if(!r)return void V(!1);G(r.id),r.restaurants&&r.restaurants.length>0&&r.restaurants[0].currency&&Y(r.restaurants[0].currency);const s=new Date,o=new Date(s.getFullYear(),s.getMonth(),1).toISOString().split("T")[0],i=s.toISOString().split("T")[0],[a,l,d,c,h]=await Promise.all([fetch(`/api/foodcourts/${r.id}/revenue?start_date=${o}&end_date=${i}`,{headers:e}),fetch(`/api/foodcourts/${r.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Foodcourt Manager",{headers:e}),fetch(`/api/foodcourts/${r.id}/subscriptions`,{headers:e})]),[u,p,x,g,v]=await Promise.all([a.json(),l.json(),d.json(),c.json(),h.json()]),j=u.data||u,m=parseFloat(j.total_revenue||0),y=j.restaurants||[],f=y.reduce((e,t)=>e+(t.order_count||0),0);ne(y);const F=(p.data||p||[]).filter(e=>!1!==e.is_active).length,b=x.data||x||[],A=b.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,w=b.filter(e=>"overdue"===e.status).length,E=Array.isArray(g)?g:g.data||[],k=v.data||v||[];ie(k),ee({totalRestaurants:y.length,monthlyRevenue:m,monthlyOrders:f,avgRevenuePerTenant:y.length>0?m/y.length:0,pendingInvoices:A,overdueInvoices:w,activePlans:F,totalManagers:E.length});const S=[];w>0&&S.push({type:"warning",message:`${w} overdue invoice${w>1?"s":""} need attention`}),A>0&&S.push({type:"info",message:`${A} invoice${A>1?"s":""} pending payment`});const B=y.filter(e=>0===(e.order_count||0));B.length>0&&S.push({type:"info",message:`${B.length} tenant${B.length>1?"s":""} with no orders this month`}),de.notices>0&&S.push({type:"info",message:`${de.notices} unread notice(s)`}),de.systemInquiry>0&&S.push({type:"info",message:`${de.systemInquiry} system inquiry(s) with new replies`}),de.operationInquiry>0&&S.push({type:"info",message:`${de.operationInquiry} open operation inquiry(s)`}),0===S.length&&S.push({type:"success",message:"All systems running smoothly. No issues detected."}),le(S),xe(r.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{V(!1)}},xe=async e=>{try{const t=ue(),n=await fetch(`/api/foodcourts/${e}/sales-trend?period=${H}`,{headers:t}),r=await n.json();se(r.data||[])}catch(t){console.error("Error fetching trend data:",t)}},ge=te.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,t)=>t.value-e.value).slice(0,7),ve=[...oe].sort((e,t)=>{var n,r;return((null===(n=t.current_month)||void 0===n?void 0:n.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return Q?(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(F,{children:[(0,f.jsx)(b,{children:(0,f.jsx)(A,{children:"Foodcourt Dashboard"})}),(0,f.jsx)(L,{children:"Loading dashboard data..."})]})}):(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(F,{children:[(0,f.jsx)(b,{children:(0,f.jsx)(A,{children:"Foodcourt Dashboard"})}),(0,f.jsxs)(w,{children:[(0,f.jsxs)(i.MD,{children:[(0,f.jsxs)(i.hI,{color:"#EA580C",children:[(0,f.jsx)(i.Os,{children:X.totalRestaurants}),(0,f.jsx)(i.v0,{children:"Tenant Restaurants"})]}),(0,f.jsxs)(i.hI,{color:"#059669",children:[(0,f.jsx)(i.Os,{children:(0,l.vv)(X.monthlyRevenue,o)}),(0,f.jsx)(i.v0,{children:"Monthly Revenue"})]}),(0,f.jsxs)(i.hI,{color:"#2563EB",children:[(0,f.jsx)(i.Os,{children:X.monthlyOrders.toLocaleString()}),(0,f.jsx)(i.v0,{children:"Monthly Orders"})]}),(0,f.jsxs)(i.hI,{color:"#7C3AED",children:[(0,f.jsx)(i.Os,{children:(0,l.vv)(X.avgRevenuePerTenant,o)}),(0,f.jsx)(i.v0,{children:"Avg Revenue / Tenant"})]}),(0,f.jsxs)(i.hI,{color:"#F59E0B",children:[(0,f.jsx)(i.Os,{children:X.pendingInvoices}),(0,f.jsx)(i.v0,{children:"Pending Invoices"})]}),(0,f.jsxs)(i.hI,{color:X.overdueInvoices>0?"#EF4444":"#059669",children:[(0,f.jsx)(i.Os,{children:X.overdueInvoices}),(0,f.jsx)(i.v0,{children:"Overdue Invoices"})]}),(0,f.jsxs)(i.hI,{color:"#10B981",children:[(0,f.jsx)(i.Os,{children:X.activePlans}),(0,f.jsx)(i.v0,{children:"Active Plans"})]}),(0,f.jsxs)(i.hI,{color:"#6366F1",children:[(0,f.jsx)(i.Os,{children:X.totalManagers}),(0,f.jsx)(i.v0,{children:"Foodcourt Managers"})]})]}),(0,f.jsxs)(B,{children:[(0,f.jsx)(E,{children:"System Alerts"}),ae.map((e,t)=>(0,f.jsxs)(k,{type:e.type,children:[(0,f.jsx)(S,{children:"warning"===e.type?"\u26a0\ufe0f":"success"===e.type?"\u2713":"\u2139"}),e.message]},t))]}),(0,f.jsxs)(B,{children:[(0,f.jsx)(E,{children:"Quick Access"}),(0,f.jsxs)(C,{children:[(0,f.jsxs)(I,{onClick:()=>e("/pos/foodcourt/general/management"),children:[(0,f.jsx)(R,{children:"\u25eb"}),(0,f.jsx)(_,{children:"Manage Tenants"}),(0,f.jsx)($,{children:"Tenant management"})]}),(0,f.jsxs)(I,{onClick:()=>e("/pos/foodcourt/invoices"),children:[(0,f.jsx)(R,{children:"\u25e7"}),(0,f.jsx)(_,{children:"Invoices"}),(0,f.jsx)($,{children:"Invoice management"})]}),(0,f.jsxs)(I,{onClick:()=>e("/pos/foodcourt/plans"),children:[(0,f.jsx)(R,{children:"\u25e8"}),(0,f.jsx)(_,{children:"Subscription Plans"}),(0,f.jsx)($,{children:"Plan configuration"})]}),(0,f.jsxs)(I,{onClick:()=>e("/pos/foodcourt/general/stats"),children:[(0,f.jsx)(R,{children:"\u25e9"}),(0,f.jsx)(_,{children:"Reports"}),(0,f.jsx)($,{children:"Performance analytics"})]})]})]}),(0,f.jsxs)(z,{children:[(0,f.jsxs)(M,{children:[(0,f.jsxs)(O,{children:[(0,f.jsx)(D,{children:"Revenue Trend"}),(0,f.jsxs)(T,{value:H,onChange:e=>J(e.target.value),children:[(0,f.jsx)("option",{value:"week",children:"This Week"}),(0,f.jsx)("option",{value:"month",children:"This Month"}),(0,f.jsx)("option",{value:"year",children:"This Year"})]})]}),re.length>0?(0,f.jsx)(d.u,{width:"100%",height:300,children:(0,f.jsxs)(c.b,{data:re,children:[(0,f.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,f.jsx)(u.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,f.jsx)(p.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,f.jsx)(x.m,{formatter:e=>[(0,l.vv)(e,o),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,f.jsx)(g.N,{type:"monotone",dataKey:"sales",stroke:"#EA580C",strokeWidth:2,dot:{r:4,fill:"#EA580C"},activeDot:{r:6}})]})}):(0,f.jsx)(L,{children:"No sales data for this period"})]}),(0,f.jsxs)(M,{children:[(0,f.jsx)(O,{children:(0,f.jsx)(D,{children:"Revenue Distribution"})}),ge.length>0?(0,f.jsx)(d.u,{width:"100%",height:300,children:(0,f.jsxs)(v.r,{children:[(0,f.jsx)(j.F,{data:ge,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:ge.map((e,t)=>(0,f.jsx)(m.f,{fill:U[t%U.length]},t))}),(0,f.jsx)(x.m,{formatter:e=>(0,l.vv)(e,o)})]})}):(0,f.jsx)(L,{children:"No revenue data available"}),(0,f.jsx)("div",{style:{marginTop:8},children:ge.map((e,t)=>(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:"#374151"},children:[(0,f.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:U[t%U.length],flexShrink:0}}),(0,f.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name})]},t))})]})]}),(0,f.jsxs)(P,{children:[(0,f.jsxs)(O,{children:[(0,f.jsx)(E,{style:{margin:0},children:"Tenant Performance"}),(0,f.jsx)("span",{style:{fontSize:12,color:"#6B7C93",cursor:"pointer"},onClick:()=>e("/pos/foodcourt-general/restaurants"),children:"View All \u2192"})]}),(0,f.jsxs)(q,{children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)(N,{children:"Tenant"}),(0,f.jsx)(N,{children:"Plan"}),(0,f.jsx)(N,{children:"Monthly Revenue"}),(0,f.jsx)(N,{children:"Orders"}),(0,f.jsx)(N,{children:"Estimated Charges"}),(0,f.jsx)(N,{children:"Invoice Status"})]})}),(0,f.jsx)("tbody",{children:ve.length>0?ve.map((e,t)=>{var n,r,s,i,a,d;return(0,f.jsxs)("tr",{children:[(0,f.jsx)(W,{style:{fontWeight:600},children:e.restaurant_name||"-"}),(0,f.jsx)(W,{children:(null===(n=e.plan)||void 0===n?void 0:n.name)||"No Plan"}),(0,f.jsx)(W,{children:(0,l.vv)((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0,o)}),(0,f.jsx)(W,{children:(null===(s=e.current_month)||void 0===s?void 0:s.order_count)||0}),(0,f.jsx)(W,{children:(0,l.vv)((null===(i=e.current_month)||void 0===i?void 0:i.estimated_charges)||0,o)}),(0,f.jsx)(W,{children:(0,f.jsx)(K,{status:(null===(a=e.latest_invoice)||void 0===a?void 0:a.status)||"none",children:((null===(d=e.latest_invoice)||void 0===d?void 0:d.status)||"N/A").replace(/_/g," ")})})]},t)}):(0,f.jsx)("tr",{children:(0,f.jsx)(W,{colSpan:6,style:{textAlign:"center",color:"#6B7280"},children:"No tenant data available"})})})]})]})]})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>i});var r=n(9950),s=n(1367),o=n(6038);const i=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("RM"),[i,a]=(0,r.useState)(Object.keys(o.DL)),[l,d]=(0,r.useState)(!0),[c,h]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let s=r>=0?t[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";n(r)}else n("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),n("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:l,error:c}}}}]);