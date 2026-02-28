"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[441],{441:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Q});var r=n(9950),s=n(4492),o=n(4752),i=n(5665),a=n(4021),l=n(6038),d=n(1095),c=n(2847),h=n(3245),u=n(158),x=n(3440),p=n(2174),g=n(4915),v=n(7621),j=n(5297),f=n(2528),m=n(1367),y=n(4414);const F=o.Ay.div`
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
`,C=o.Ay.div`
  margin-bottom: 32px;
`,B=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,R=o.Ay.div`
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
`,N=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`,W=o.Ay.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,K=o.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,L=o.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,U=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,Y=["#EA580C","#F97316","#FB923C","#FDBA74","#FED7AA","#FFF7ED","#FFFBEB"],Q=()=>{const e=(0,s.Zp)(),{user:t}=(0,m.As)(),{defaultCurrency:n}=(0,a.i1)(),[o,Q]=(0,r.useState)("RM"),[V,Z]=(0,r.useState)(!0),[q,G]=(0,r.useState)(null),[H,J]=(0,r.useState)("month"),[X,ee]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerTenant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[te,ne]=(0,r.useState)([]),[re,se]=(0,r.useState)([]),[oe,ie]=(0,r.useState)([]),[ae,le]=(0,r.useState)([]);(0,r.useEffect)(()=>{n&&Q(n)},[n]),(0,r.useEffect)(()=>{ce()},[]),(0,r.useEffect)(()=>{q&&he(q)},[H,q]);const de=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),ce=async()=>{try{Z(!0);const e=de(),t=await fetch("/api/foodcourts",{headers:e}),n=await t.json(),r=(n.data||n||[])[0];if(!r)return void Z(!1);G(r.id),r.restaurants&&r.restaurants.length>0&&r.restaurants[0].currency&&Q(r.restaurants[0].currency);const s=new Date,o=new Date(s.getFullYear(),s.getMonth(),1).toISOString().split("T")[0],i=s.toISOString().split("T")[0],[a,l,d,c,h]=await Promise.all([fetch(`/api/foodcourts/${r.id}/revenue?start_date=${o}&end_date=${i}`,{headers:e}),fetch(`/api/foodcourts/${r.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Foodcourt Manager",{headers:e}),fetch(`/api/foodcourts/${r.id}/subscriptions`,{headers:e})]),[u,x,p,g,v]=await Promise.all([a.json(),l.json(),d.json(),c.json(),h.json()]),j=u.data||u,f=parseFloat(j.total_revenue||0),m=j.restaurants||[],y=m.reduce((e,t)=>e+(t.order_count||0),0);ne(m);const F=(x.data||x||[]).filter(e=>!1!==e.is_active).length,b=p.data||p||[],A=b.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,w=b.filter(e=>"overdue"===e.status).length,E=Array.isArray(g)?g:g.data||[],k=v.data||v||[];ie(k),ee({totalRestaurants:m.length,monthlyRevenue:f,monthlyOrders:y,avgRevenuePerTenant:m.length>0?f/m.length:0,pendingInvoices:A,overdueInvoices:w,activePlans:F,totalManagers:E.length});const S=[];w>0&&S.push({type:"warning",message:`${w} overdue invoice${w>1?"s":""} need attention`}),A>0&&S.push({type:"info",message:`${A} invoice${A>1?"s":""} pending payment`});const C=m.filter(e=>0===(e.order_count||0));C.length>0&&S.push({type:"info",message:`${C.length} tenant${C.length>1?"s":""} with no orders this month`}),0===S.length&&S.push({type:"success",message:"All systems running smoothly. No issues detected."}),le(S),he(r.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{Z(!1)}},he=async e=>{try{const t=de(),n=await fetch(`/api/foodcourts/${e}/sales-trend?period=${H}`,{headers:t}),r=await n.json();se(r.data||[])}catch(t){console.error("Error fetching trend data:",t)}},ue=te.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,t)=>t.value-e.value).slice(0,7),xe=[...oe].sort((e,t)=>{var n,r;return((null===(n=t.current_month)||void 0===n?void 0:n.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return V?(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(F,{children:[(0,y.jsx)(b,{children:(0,y.jsx)(A,{children:"Foodcourt Dashboard"})}),(0,y.jsx)(U,{children:"Loading dashboard data..."})]})}):(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(F,{children:[(0,y.jsx)(b,{children:(0,y.jsx)(A,{children:"Foodcourt Dashboard"})}),(0,y.jsxs)(w,{children:[(0,y.jsxs)(i.MD,{children:[(0,y.jsxs)(i.hI,{color:"#EA580C",children:[(0,y.jsx)(i.Os,{children:X.totalRestaurants}),(0,y.jsx)(i.v0,{children:"Tenant Restaurants"})]}),(0,y.jsxs)(i.hI,{color:"#059669",children:[(0,y.jsx)(i.Os,{children:(0,l.vv)(X.monthlyRevenue,o)}),(0,y.jsx)(i.v0,{children:"Monthly Revenue"})]}),(0,y.jsxs)(i.hI,{color:"#2563EB",children:[(0,y.jsx)(i.Os,{children:X.monthlyOrders.toLocaleString()}),(0,y.jsx)(i.v0,{children:"Monthly Orders"})]}),(0,y.jsxs)(i.hI,{color:"#7C3AED",children:[(0,y.jsx)(i.Os,{children:(0,l.vv)(X.avgRevenuePerTenant,o)}),(0,y.jsx)(i.v0,{children:"Avg Revenue / Tenant"})]}),(0,y.jsxs)(i.hI,{color:"#F59E0B",children:[(0,y.jsx)(i.Os,{children:X.pendingInvoices}),(0,y.jsx)(i.v0,{children:"Pending Invoices"})]}),(0,y.jsxs)(i.hI,{color:X.overdueInvoices>0?"#EF4444":"#059669",children:[(0,y.jsx)(i.Os,{children:X.overdueInvoices}),(0,y.jsx)(i.v0,{children:"Overdue Invoices"})]}),(0,y.jsxs)(i.hI,{color:"#10B981",children:[(0,y.jsx)(i.Os,{children:X.activePlans}),(0,y.jsx)(i.v0,{children:"Active Plans"})]}),(0,y.jsxs)(i.hI,{color:"#6366F1",children:[(0,y.jsx)(i.Os,{children:X.totalManagers}),(0,y.jsx)(i.v0,{children:"Foodcourt Managers"})]})]}),(0,y.jsxs)(C,{children:[(0,y.jsx)(E,{children:"System Alerts"}),ae.map((e,t)=>(0,y.jsxs)(k,{type:e.type,children:[(0,y.jsx)(S,{children:"warning"===e.type?"\u26a0\ufe0f":"success"===e.type?"\u2713":"\u2139"}),e.message]},t))]}),(0,y.jsxs)(C,{children:[(0,y.jsx)(E,{children:"Quick Access"}),(0,y.jsxs)(B,{children:[(0,y.jsxs)(R,{onClick:()=>e("/pos/foodcourt-general/restaurants"),children:[(0,y.jsx)(I,{children:"\u25eb"}),(0,y.jsx)(_,{children:"Manage Tenants"}),(0,y.jsx)($,{children:"Tenant management"})]}),(0,y.jsxs)(R,{onClick:()=>e("/pos/foodcourt-general/invoices"),children:[(0,y.jsx)(I,{children:"\u25e7"}),(0,y.jsx)(_,{children:"Invoices"}),(0,y.jsx)($,{children:"Invoice management"})]}),(0,y.jsxs)(R,{onClick:()=>e("/pos/foodcourt-general/plans"),children:[(0,y.jsx)(I,{children:"\u25e8"}),(0,y.jsx)(_,{children:"Subscription Plans"}),(0,y.jsx)($,{children:"Plan configuration"})]}),(0,y.jsxs)(R,{onClick:()=>e("/pos/foodcourt-general/reports"),children:[(0,y.jsx)(I,{children:"\u25e9"}),(0,y.jsx)(_,{children:"Reports"}),(0,y.jsx)($,{children:"Performance analytics"})]})]})]}),(0,y.jsxs)(z,{children:[(0,y.jsxs)(M,{children:[(0,y.jsxs)(O,{children:[(0,y.jsx)(D,{children:"Revenue Trend"}),(0,y.jsxs)(T,{value:H,onChange:e=>J(e.target.value),children:[(0,y.jsx)("option",{value:"week",children:"This Week"}),(0,y.jsx)("option",{value:"month",children:"This Month"}),(0,y.jsx)("option",{value:"year",children:"This Year"})]})]}),re.length>0?(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(c.b,{data:re,children:[(0,y.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,y.jsx)(u.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,y.jsx)(x.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,y.jsx)(p.m,{formatter:e=>[(0,l.vv)(e,o),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,y.jsx)(g.N,{type:"monotone",dataKey:"sales",stroke:"#EA580C",strokeWidth:2,dot:{r:4,fill:"#EA580C"},activeDot:{r:6}})]})}):(0,y.jsx)(U,{children:"No sales data for this period"})]}),(0,y.jsxs)(M,{children:[(0,y.jsx)(O,{children:(0,y.jsx)(D,{children:"Revenue Distribution"})}),ue.length>0?(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(v.r,{children:[(0,y.jsx)(j.F,{data:ue,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:ue.map((e,t)=>(0,y.jsx)(f.f,{fill:Y[t%Y.length]},t))}),(0,y.jsx)(p.m,{formatter:e=>(0,l.vv)(e,o)})]})}):(0,y.jsx)(U,{children:"No revenue data available"}),(0,y.jsx)("div",{style:{marginTop:8},children:ue.map((e,t)=>(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:"#374151"},children:[(0,y.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:Y[t%Y.length],flexShrink:0}}),(0,y.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name})]},t))})]})]}),(0,y.jsxs)(P,{children:[(0,y.jsxs)(O,{children:[(0,y.jsx)(E,{style:{margin:0},children:"Tenant Performance"}),(0,y.jsx)("span",{style:{fontSize:12,color:"#6B7C93",cursor:"pointer"},onClick:()=>e("/pos/foodcourt-general/restaurants"),children:"View All \u2192"})]}),(0,y.jsxs)(N,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(W,{children:"Tenant"}),(0,y.jsx)(W,{children:"Plan"}),(0,y.jsx)(W,{children:"Monthly Revenue"}),(0,y.jsx)(W,{children:"Orders"}),(0,y.jsx)(W,{children:"Estimated Charges"}),(0,y.jsx)(W,{children:"Invoice Status"})]})}),(0,y.jsx)("tbody",{children:xe.length>0?xe.map((e,t)=>{var n,r,s,i,a,d;return(0,y.jsxs)("tr",{children:[(0,y.jsx)(K,{style:{fontWeight:600},children:e.restaurant_name||"-"}),(0,y.jsx)(K,{children:(null===(n=e.plan)||void 0===n?void 0:n.name)||"No Plan"}),(0,y.jsx)(K,{children:(0,l.vv)((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0,o)}),(0,y.jsx)(K,{children:(null===(s=e.current_month)||void 0===s?void 0:s.order_count)||0}),(0,y.jsx)(K,{children:(0,l.vv)((null===(i=e.current_month)||void 0===i?void 0:i.estimated_charges)||0,o)}),(0,y.jsx)(K,{children:(0,y.jsx)(L,{status:(null===(a=e.latest_invoice)||void 0===a?void 0:a.status)||"none",children:((null===(d=e.latest_invoice)||void 0===d?void 0:d.status)||"N/A").replace(/_/g," ")})})]},t)}):(0,y.jsx)("tr",{children:(0,y.jsx)(K,{colSpan:6,style:{textAlign:"center",color:"#6B7280"},children:"No tenant data available"})})})]})]})]})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>i});var r=n(9950),s=n(1367),o=n(6038);const i=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("RM"),[i,a]=(0,r.useState)(Object.keys(o.DL)),[l,d]=(0,r.useState)(!0),[c,h]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let s=r>=0?t[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";n(r)}else n("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),n("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:l,error:c}}}}]);