"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[441],{441:(e,t,n)=>{n.r(t),n.d(t,{default:()=>V});var r=n(9950),s=n(4492),o=n(4752),i=n(3310),a=n(5665),l=n(4021),d=n(6038),c=n(1095),h=n(2847),u=n(3245),x=n(158),p=n(3440),g=n(4094),v=n(4915),j=n(7621),f=n(5297),m=n(2528),y=n(1367),b=n(4414);const A=o.Ay.div`
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
`,w=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  @media (max-width: 768px) { font-size: 20px; }
`,E=o.Ay.main`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,k=o.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,S=o.Ay.div`
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
`,C=o.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,B=o.Ay.div`
  margin-bottom: 32px;
`,R=o.Ay.div`
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
`,_=o.Ay.div`
  color: #EA580C;
  font-size: 20px;
  margin-bottom: 12px;
`,$=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0A2540;
`,z=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,M=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,O=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,D=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,T=o.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,P=o.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #EA580C; }
`,N=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 32px;
  overflow-x: auto;
`,W=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`,K=o.Ay.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,L=o.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,U=o.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,Y=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,Q=["#EA580C","#F97316","#FB923C","#FDBA74","#FED7AA","#FFF7ED","#FFFBEB"],V=()=>{const e=(0,s.Zp)(),{user:t}=(0,y.As)(),{defaultCurrency:n}=(0,l.i1)(),[o,V]=(0,r.useState)("RM"),[Z,q]=(0,r.useState)(!0),[G,H]=(0,r.useState)(null),[J,X]=(0,r.useState)("month"),[ee,te]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerTenant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[ne,re]=(0,r.useState)([]),[se,oe]=(0,r.useState)([]),[ie,ae]=(0,r.useState)([]),[le,de]=(0,r.useState)([]);(0,r.useEffect)(()=>{n&&V(n)},[n]),(0,r.useEffect)(()=>{he()},[]),(0,r.useEffect)(()=>{G&&ue(G)},[J,G]);const ce=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),he=async()=>{try{q(!0);const e=ce(),t=await fetch("/api/foodcourts",{headers:e}),n=await t.json(),r=(n.data||n||[])[0];if(!r)return void q(!1);H(r.id),r.restaurants&&r.restaurants.length>0&&r.restaurants[0].currency&&V(r.restaurants[0].currency);const s=new Date,o=new Date(s.getFullYear(),s.getMonth(),1).toISOString().split("T")[0],i=s.toISOString().split("T")[0],[a,l,d,c,h]=await Promise.all([fetch(`/api/foodcourts/${r.id}/revenue?start_date=${o}&end_date=${i}`,{headers:e}),fetch(`/api/foodcourts/${r.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Foodcourt Manager",{headers:e}),fetch(`/api/foodcourts/${r.id}/subscriptions`,{headers:e})]),[u,x,p,g,v]=await Promise.all([a.json(),l.json(),d.json(),c.json(),h.json()]),j=u.data||u,f=parseFloat(j.total_revenue||0),m=j.restaurants||[],y=m.reduce((e,t)=>e+(t.order_count||0),0);re(m);const b=(x.data||x||[]).filter(e=>!1!==e.is_active).length,A=p.data||p||[],F=A.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,w=A.filter(e=>"overdue"===e.status).length,E=Array.isArray(g)?g:g.data||[],k=v.data||v||[];ae(k),te({totalRestaurants:m.length,monthlyRevenue:f,monthlyOrders:y,avgRevenuePerTenant:m.length>0?f/m.length:0,pendingInvoices:F,overdueInvoices:w,activePlans:b,totalManagers:E.length});const S=[];w>0&&S.push({type:"warning",message:`${w} overdue invoice${w>1?"s":""} need attention`}),F>0&&S.push({type:"info",message:`${F} invoice${F>1?"s":""} pending payment`});const C=m.filter(e=>0===(e.order_count||0));C.length>0&&S.push({type:"info",message:`${C.length} tenant${C.length>1?"s":""} with no orders this month`}),0===S.length&&S.push({type:"success",message:"All systems running smoothly. No issues detected."}),de(S),ue(r.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{q(!1)}},ue=async e=>{try{const t=ce(),n=await fetch(`/api/foodcourts/${e}/sales-trend?period=${J}`,{headers:t}),r=await n.json();oe(r.data||[])}catch(t){console.error("Error fetching trend data:",t)}},xe=ne.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,t)=>t.value-e.value).slice(0,7),pe=[...ie].sort((e,t)=>{var n,r;return((null===(n=t.current_month)||void 0===n?void 0:n.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return Z?(0,b.jsx)(i.A,{children:(0,b.jsxs)(A,{children:[(0,b.jsx)(F,{children:(0,b.jsx)(w,{children:"Foodcourt Dashboard"})}),(0,b.jsx)(Y,{children:"Loading dashboard data..."})]})}):(0,b.jsx)(i.A,{children:(0,b.jsxs)(A,{children:[(0,b.jsx)(F,{children:(0,b.jsx)(w,{children:"Foodcourt Dashboard"})}),(0,b.jsxs)(E,{children:[(0,b.jsxs)(a.MD,{children:[(0,b.jsxs)(a.hI,{color:"#EA580C",children:[(0,b.jsx)(a.Os,{children:ee.totalRestaurants}),(0,b.jsx)(a.v0,{children:"Tenant Restaurants"})]}),(0,b.jsxs)(a.hI,{color:"#059669",children:[(0,b.jsx)(a.Os,{children:(0,d.vv)(ee.monthlyRevenue,o)}),(0,b.jsx)(a.v0,{children:"Monthly Revenue"})]}),(0,b.jsxs)(a.hI,{color:"#2563EB",children:[(0,b.jsx)(a.Os,{children:ee.monthlyOrders.toLocaleString()}),(0,b.jsx)(a.v0,{children:"Monthly Orders"})]}),(0,b.jsxs)(a.hI,{color:"#7C3AED",children:[(0,b.jsx)(a.Os,{children:(0,d.vv)(ee.avgRevenuePerTenant,o)}),(0,b.jsx)(a.v0,{children:"Avg Revenue / Tenant"})]}),(0,b.jsxs)(a.hI,{color:"#F59E0B",children:[(0,b.jsx)(a.Os,{children:ee.pendingInvoices}),(0,b.jsx)(a.v0,{children:"Pending Invoices"})]}),(0,b.jsxs)(a.hI,{color:ee.overdueInvoices>0?"#EF4444":"#059669",children:[(0,b.jsx)(a.Os,{children:ee.overdueInvoices}),(0,b.jsx)(a.v0,{children:"Overdue Invoices"})]}),(0,b.jsxs)(a.hI,{color:"#10B981",children:[(0,b.jsx)(a.Os,{children:ee.activePlans}),(0,b.jsx)(a.v0,{children:"Active Plans"})]}),(0,b.jsxs)(a.hI,{color:"#6366F1",children:[(0,b.jsx)(a.Os,{children:ee.totalManagers}),(0,b.jsx)(a.v0,{children:"Foodcourt Managers"})]})]}),(0,b.jsxs)(B,{children:[(0,b.jsx)(k,{children:"System Alerts"}),le.map((e,t)=>(0,b.jsxs)(S,{type:e.type,children:[(0,b.jsx)(C,{children:"warning"===e.type?"\u26a0\ufe0f":"success"===e.type?"\u2713":"\u2139"}),e.message]},t))]}),(0,b.jsxs)(B,{children:[(0,b.jsx)(k,{children:"Quick Access"}),(0,b.jsxs)(R,{children:[(0,b.jsxs)(I,{onClick:()=>e("/pos/foodcourt-general/restaurants"),children:[(0,b.jsx)(_,{children:"\u25eb"}),(0,b.jsx)($,{children:"Manage Tenants"}),(0,b.jsx)(z,{children:"Tenant management"})]}),(0,b.jsxs)(I,{onClick:()=>e("/pos/foodcourt-general/invoices"),children:[(0,b.jsx)(_,{children:"\u25e7"}),(0,b.jsx)($,{children:"Invoices"}),(0,b.jsx)(z,{children:"Invoice management"})]}),(0,b.jsxs)(I,{onClick:()=>e("/pos/foodcourt-general/plans"),children:[(0,b.jsx)(_,{children:"\u25e8"}),(0,b.jsx)($,{children:"Subscription Plans"}),(0,b.jsx)(z,{children:"Plan configuration"})]}),(0,b.jsxs)(I,{onClick:()=>e("/pos/foodcourt-general/reports"),children:[(0,b.jsx)(_,{children:"\u25e9"}),(0,b.jsx)($,{children:"Reports"}),(0,b.jsx)(z,{children:"Performance analytics"})]})]})]}),(0,b.jsxs)(M,{children:[(0,b.jsxs)(O,{children:[(0,b.jsxs)(D,{children:[(0,b.jsx)(T,{children:"Revenue Trend"}),(0,b.jsxs)(P,{value:J,onChange:e=>X(e.target.value),children:[(0,b.jsx)("option",{value:"week",children:"This Week"}),(0,b.jsx)("option",{value:"month",children:"This Month"}),(0,b.jsx)("option",{value:"year",children:"This Year"})]})]}),se.length>0?(0,b.jsx)(c.u,{width:"100%",height:300,children:(0,b.jsxs)(h.b,{data:se,children:[(0,b.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,b.jsx)(x.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,b.jsx)(p.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,b.jsx)(g.m,{formatter:e=>[(0,d.vv)(e,o),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,b.jsx)(v.N,{type:"monotone",dataKey:"sales",stroke:"#EA580C",strokeWidth:2,dot:{r:4,fill:"#EA580C"},activeDot:{r:6}})]})}):(0,b.jsx)(Y,{children:"No sales data for this period"})]}),(0,b.jsxs)(O,{children:[(0,b.jsx)(D,{children:(0,b.jsx)(T,{children:"Revenue Distribution"})}),xe.length>0?(0,b.jsx)(c.u,{width:"100%",height:300,children:(0,b.jsxs)(j.r,{children:[(0,b.jsx)(f.F,{data:xe,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:xe.map((e,t)=>(0,b.jsx)(m.f,{fill:Q[t%Q.length]},t))}),(0,b.jsx)(g.m,{formatter:e=>(0,d.vv)(e,o)})]})}):(0,b.jsx)(Y,{children:"No revenue data available"}),(0,b.jsx)("div",{style:{marginTop:8},children:xe.map((e,t)=>(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:"#374151"},children:[(0,b.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:Q[t%Q.length],flexShrink:0}}),(0,b.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name})]},t))})]})]}),(0,b.jsxs)(N,{children:[(0,b.jsxs)(D,{children:[(0,b.jsx)(k,{style:{margin:0},children:"Tenant Performance"}),(0,b.jsx)("span",{style:{fontSize:12,color:"#6B7C93",cursor:"pointer"},onClick:()=>e("/pos/foodcourt-general/restaurants"),children:"View All \u2192"})]}),(0,b.jsxs)(W,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(K,{children:"Tenant"}),(0,b.jsx)(K,{children:"Plan"}),(0,b.jsx)(K,{children:"Monthly Revenue"}),(0,b.jsx)(K,{children:"Orders"}),(0,b.jsx)(K,{children:"Estimated Charges"}),(0,b.jsx)(K,{children:"Invoice Status"})]})}),(0,b.jsx)("tbody",{children:pe.length>0?pe.map((e,t)=>{var n,r,s,i,a,l;return(0,b.jsxs)("tr",{children:[(0,b.jsx)(L,{style:{fontWeight:600},children:e.restaurant_name||"-"}),(0,b.jsx)(L,{children:(null===(n=e.plan)||void 0===n?void 0:n.name)||"No Plan"}),(0,b.jsx)(L,{children:(0,d.vv)((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0,o)}),(0,b.jsx)(L,{children:(null===(s=e.current_month)||void 0===s?void 0:s.order_count)||0}),(0,b.jsx)(L,{children:(0,d.vv)((null===(i=e.current_month)||void 0===i?void 0:i.estimated_charges)||0,o)}),(0,b.jsx)(L,{children:(0,b.jsx)(U,{status:(null===(a=e.latest_invoice)||void 0===a?void 0:a.status)||"none",children:((null===(l=e.latest_invoice)||void 0===l?void 0:l.status)||"N/A").replace(/_/g," ")})})]},t)}):(0,b.jsx)("tr",{children:(0,b.jsx)(L,{colSpan:6,style:{textAlign:"center",color:"#6B7280"},children:"No tenant data available"})})})]})]})]})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>i});var r=n(9950),s=n(1367),o=n(6038);const i=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("RM"),[i,a]=(0,r.useState)(Object.keys(o.DL)),[l,d]=(0,r.useState)(!0),[c,h]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let s=r>=0?t[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";n(r)}else n("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),n("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:l,error:c}}}}]);