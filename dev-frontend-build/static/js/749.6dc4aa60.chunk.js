"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[749],{749:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Q});var r=t(8819),s=t(9950),a=t(4492),i=t(4752),o=t(5665),l=t(4021),d=t(6038),c=t(1095),h=t(2847),u=t(3245),p=t(158),x=t(3440),g=t(2174),v=t(4915),y=t(7621),j=t(5297),m=t(2528),f=t(1367),b=t(4414);const w=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,F=i.Ay.div`
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
`,A=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${r.w.colors.secondary};
  @media (max-width: 768px) { font-size: 20px; }
`,k=i.Ay.main`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,E=i.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,S=i.Ay.div`
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
`,R=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,$=i.Ay.div`
  margin-bottom: 32px;
`,C=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,I=i.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  color: ${r.w.colors.secondary};
  transition: all 0.15s;
  border: 1px solid ${r.w.colors.border};
  cursor: pointer;

  &:hover {
    border-color: #FCA5A5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,B=i.Ay.div`
  color: ${r.w.colors.danger};
  font-size: 20px;
  margin-bottom: 12px;
`,_=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${r.w.colors.secondary};
`,z=i.Ay.div`
  font-size: 12px;
  color: ${r.w.colors.text.secondary};
`,D=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,M=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${r.w.colors.border};
`,O=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,P=i.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${r.w.colors.secondary};
`,T=i.Ay.select`
  padding: 6px 12px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #DC2626; }
`,q=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 32px;
  overflow-x: auto;
`,N=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`,W=i.Ay.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid ${r.w.colors.backgroundAlt};
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,K=i.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,L=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,U=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,Y=["#DC2626","#EF4444","#F87171","#FCA5A5","#FECACA","#FEE2E2","#FFF5F5"],Q=()=>{const e=(0,a.Zp)(),{user:n}=(0,f.As)(),{defaultCurrency:t}=(0,l.i1)(),[r,i]=(0,s.useState)("RM"),[Q,V]=(0,s.useState)(!0),[Z,G]=(0,s.useState)(null),[H,J]=(0,s.useState)("month"),[X,ee]=(0,s.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerRestaurant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[ne,te]=(0,s.useState)([]),[re,se]=(0,s.useState)([]),[ae,ie]=(0,s.useState)([]),[oe,le]=(0,s.useState)([]),[de,ce]=(0,s.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,s.useEffect)(()=>{t&&i(t)},[t]),(0,s.useEffect)(()=>{pe(),he()},[]);const he=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const n=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&ce(e.data)}}catch(e){}};(0,s.useEffect)(()=>{Z&&xe(Z)},[H,Z]);const ue=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),pe=async()=>{try{V(!0);const e=ue(),n=await fetch("/api/brands",{headers:e}),t=await n.json(),r=(t.data||t||[])[0];if(!r)return void V(!1);G(r.id),r.restaurants&&r.restaurants.length>0&&r.restaurants[0].currency&&i(r.restaurants[0].currency);const s=new Date,a=new Date(s.getFullYear(),s.getMonth(),1).toISOString().split("T")[0],o=s.toISOString().split("T")[0],[l,d,c,h,u]=await Promise.all([fetch(`/api/brands/${r.id}/revenue?start_date=${a}&end_date=${o}`,{headers:e}),fetch(`/api/brands/${r.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Brand Manager",{headers:e}),fetch(`/api/brands/${r.id}/subscriptions`,{headers:e})]),[p,x,g,v,y]=await Promise.all([l.json(),d.json(),c.json(),h.json(),u.json()]),j=p.data||p,m=parseFloat(j.total_revenue||0),f=j.restaurants||[],b=f.reduce((e,n)=>e+(n.order_count||0),0);te(f);const w=(x.data||x||[]).filter(e=>!1!==e.is_active).length,F=g.data||g||[],A=F.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,k=F.filter(e=>"overdue"===e.status).length,E=Array.isArray(v)?v:v.data||[],S=y.data||y||[];ie(S),ee({totalRestaurants:f.length,monthlyRevenue:m,monthlyOrders:b,avgRevenuePerRestaurant:f.length>0?m/f.length:0,pendingInvoices:A,overdueInvoices:k,activePlans:w,totalManagers:E.length});const R=[];k>0&&R.push({type:"warning",message:`${k} overdue invoice${k>1?"s":""} need attention`}),A>0&&R.push({type:"info",message:`${A} invoice${A>1?"s":""} pending payment`});const $=f.filter(e=>0===(e.order_count||0));$.length>0&&R.push({type:"info",message:`${$.length} restaurant${$.length>1?"s":""} with no orders this month`}),de.notices>0&&R.push({type:"info",message:`${de.notices} unread notice(s)`}),de.systemInquiry>0&&R.push({type:"info",message:`${de.systemInquiry} system inquiry(s) with new replies`}),de.operationInquiry>0&&R.push({type:"info",message:`${de.operationInquiry} open operation inquiry(s)`}),0===R.length&&R.push({type:"success",message:"All systems running smoothly. No issues detected."}),le(R),xe(r.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{V(!1)}},xe=async e=>{try{const n=ue(),t=await fetch(`/api/brands/${e}/sales-trend?period=${H}`,{headers:n}),r=await t.json();se(r.data||[])}catch(n){console.error("Error fetching trend data:",n)}},ge=ne.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,n)=>n.value-e.value).slice(0,7),ve=[...ae].sort((e,n)=>{var t,r;return((null===(t=n.current_month)||void 0===t?void 0:t.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return Q?(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)(w,{children:[(0,b.jsx)(F,{children:(0,b.jsx)(A,{children:"Brand Dashboard"})}),(0,b.jsx)(U,{children:"Loading dashboard data..."})]})}):(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)(w,{children:[(0,b.jsx)(F,{children:(0,b.jsx)(A,{children:"Brand Dashboard"})}),(0,b.jsxs)(k,{children:[(0,b.jsxs)(o.MD,{children:[(0,b.jsxs)(o.hI,{color:"#DC2626",children:[(0,b.jsx)(o.Os,{children:X.totalRestaurants}),(0,b.jsx)(o.v0,{children:"Franchise Restaurants"})]}),(0,b.jsxs)(o.hI,{color:"#059669",children:[(0,b.jsx)(o.Os,{children:(0,d.vv)(X.monthlyRevenue,r)}),(0,b.jsx)(o.v0,{children:"Monthly Revenue"})]}),(0,b.jsxs)(o.hI,{color:"#2563EB",children:[(0,b.jsx)(o.Os,{children:X.monthlyOrders.toLocaleString()}),(0,b.jsx)(o.v0,{children:"Monthly Orders"})]}),(0,b.jsxs)(o.hI,{color:"#7C3AED",children:[(0,b.jsx)(o.Os,{children:(0,d.vv)(X.avgRevenuePerRestaurant,r)}),(0,b.jsx)(o.v0,{children:"Avg Revenue / Restaurant"})]}),(0,b.jsxs)(o.hI,{color:"#F59E0B",children:[(0,b.jsx)(o.Os,{children:X.pendingInvoices}),(0,b.jsx)(o.v0,{children:"Pending Invoices"})]}),(0,b.jsxs)(o.hI,{color:X.overdueInvoices>0?"#EF4444":"#059669",children:[(0,b.jsx)(o.Os,{children:X.overdueInvoices}),(0,b.jsx)(o.v0,{children:"Overdue Invoices"})]}),(0,b.jsxs)(o.hI,{color:"#10B981",children:[(0,b.jsx)(o.Os,{children:X.activePlans}),(0,b.jsx)(o.v0,{children:"Active Plans"})]}),(0,b.jsxs)(o.hI,{color:"#6366F1",children:[(0,b.jsx)(o.Os,{children:X.totalManagers}),(0,b.jsx)(o.v0,{children:"Brand Managers"})]})]}),(0,b.jsxs)($,{children:[(0,b.jsx)(E,{children:"System Alerts"}),oe.map((e,n)=>(0,b.jsxs)(S,{type:e.type,children:[(0,b.jsx)(R,{children:"warning"===e.type?"\u26a0\ufe0f":"success"===e.type?"\u2713":"\u2139"}),e.message]},n))]}),(0,b.jsxs)($,{children:[(0,b.jsx)(E,{children:"Quick Access"}),(0,b.jsxs)(C,{children:[(0,b.jsxs)(I,{onClick:()=>e("/pos/brand/general/management"),children:[(0,b.jsx)(B,{children:"\u25eb"}),(0,b.jsx)(_,{children:"Manage Restaurants"}),(0,b.jsx)(z,{children:"Franchise management"})]}),(0,b.jsxs)(I,{onClick:()=>e("/pos/brand/invoices"),children:[(0,b.jsx)(B,{children:"\u25e7"}),(0,b.jsx)(_,{children:"Invoices"}),(0,b.jsx)(z,{children:"Invoice management"})]}),(0,b.jsxs)(I,{onClick:()=>e("/pos/brand/plans"),children:[(0,b.jsx)(B,{children:"\u25e8"}),(0,b.jsx)(_,{children:"Subscription Plans"}),(0,b.jsx)(z,{children:"Plan configuration"})]}),(0,b.jsxs)(I,{onClick:()=>e("/pos/brand/general/reports"),children:[(0,b.jsx)(B,{children:"\u25e9"}),(0,b.jsx)(_,{children:"Reports"}),(0,b.jsx)(z,{children:"Performance analytics"})]})]})]}),(0,b.jsxs)(D,{children:[(0,b.jsxs)(M,{children:[(0,b.jsxs)(O,{children:[(0,b.jsx)(P,{children:"Revenue Trend"}),(0,b.jsxs)(T,{value:H,onChange:e=>J(e.target.value),children:[(0,b.jsx)("option",{value:"week",children:"This Week"}),(0,b.jsx)("option",{value:"month",children:"This Month"}),(0,b.jsx)("option",{value:"year",children:"This Year"})]})]}),re.length>0?(0,b.jsx)(c.u,{width:"100%",height:300,children:(0,b.jsxs)(h.b,{data:re,children:[(0,b.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,b.jsx)(p.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,b.jsx)(x.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,b.jsx)(g.m,{formatter:e=>[(0,d.vv)(e,r),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,b.jsx)(v.N,{type:"monotone",dataKey:"sales",stroke:"#DC2626",strokeWidth:2,dot:{r:4,fill:"#DC2626"},activeDot:{r:6}})]})}):(0,b.jsx)(U,{children:"No sales data for this period"})]}),(0,b.jsxs)(M,{children:[(0,b.jsx)(O,{children:(0,b.jsx)(P,{children:"Revenue Distribution"})}),ge.length>0?(0,b.jsx)(c.u,{width:"100%",height:300,children:(0,b.jsxs)(y.r,{children:[(0,b.jsx)(j.F,{data:ge,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:ge.map((e,n)=>(0,b.jsx)(m.f,{fill:Y[n%Y.length]},n))}),(0,b.jsx)(g.m,{formatter:e=>(0,d.vv)(e,r)})]})}):(0,b.jsx)(U,{children:"No revenue data available"}),(0,b.jsx)("div",{style:{marginTop:8},children:ge.map((e,n)=>(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:"#374151"},children:[(0,b.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:Y[n%Y.length],flexShrink:0}}),(0,b.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name})]},n))})]})]}),(0,b.jsxs)(q,{children:[(0,b.jsxs)(O,{children:[(0,b.jsx)(E,{style:{margin:0},children:"Restaurant Performance"}),(0,b.jsx)("span",{style:{fontSize:12,color:"#6B7C93",cursor:"pointer"},onClick:()=>e("/pos/brand-general/restaurants"),children:"View All \u2192"})]}),(0,b.jsxs)(N,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(W,{children:"Restaurant"}),(0,b.jsx)(W,{children:"Plan"}),(0,b.jsx)(W,{children:"Monthly Revenue"}),(0,b.jsx)(W,{children:"Orders"}),(0,b.jsx)(W,{children:"Estimated Charges"}),(0,b.jsx)(W,{children:"Invoice Status"})]})}),(0,b.jsx)("tbody",{children:ve.length>0?ve.map((e,n)=>{var t,s,a,i,o,l;return(0,b.jsxs)("tr",{children:[(0,b.jsx)(K,{style:{fontWeight:600},children:e.restaurant_name||"-"}),(0,b.jsx)(K,{children:(null===(t=e.plan)||void 0===t?void 0:t.name)||"No Plan"}),(0,b.jsx)(K,{children:(0,d.vv)((null===(s=e.current_month)||void 0===s?void 0:s.revenue)||0,r)}),(0,b.jsx)(K,{children:(null===(a=e.current_month)||void 0===a?void 0:a.order_count)||0}),(0,b.jsx)(K,{children:(0,d.vv)((null===(i=e.current_month)||void 0===i?void 0:i.estimated_charges)||0,r)}),(0,b.jsx)(K,{children:(0,b.jsx)(L,{status:(null===(o=e.latest_invoice)||void 0===o?void 0:o.status)||"none",children:((null===(l=e.latest_invoice)||void 0===l?void 0:l.status)||"N/A").replace(/_/g," ")})})]},n)}):(0,b.jsx)("tr",{children:(0,b.jsx)(K,{colSpan:6,style:{textAlign:"center",color:"#6B7280"},children:"No restaurant data available"})})})]})]})]})]})})}},4021:(e,n,t)=>{t.d(n,{i1:()=>i});var r=t(9950),s=t(1367),a=t(6038);const i=()=>{const{user:e}=(0,s.As)(),[n,t]=(0,r.useState)("RM"),[i,o]=(0,r.useState)(Object.keys(a.DL)),[l,d]=(0,r.useState)(!0),[c,h]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let s=r>=0?n[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(r)}else t("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:i,loading:l,error:c}}}}]);