"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[749],{749:(e,t,n)=>{n.r(t),n.d(t,{default:()=>U});var r=n(9950),s=n(4492),i=n(4752),a=n(5665),o=n(4021),l=n(6038),d=n(1095),c=n(2847),h=n(3245),u=n(158),p=n(3440),x=n(2174),g=n(4915),v=n(7621),j=n(5297),m=n(2528),y=n(4414);const f=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,b=i.Ay.div`
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
`,F=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  @media (max-width: 768px) { font-size: 20px; }
`,A=i.Ay.main`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,w=i.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,k=i.Ay.div`
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
`,E=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,C=i.Ay.div`
  margin-bottom: 32px;
`,S=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,R=i.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  color: #0A2540;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  cursor: pointer;

  &:hover {
    border-color: #FCA5A5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,I=i.Ay.div`
  color: #DC2626;
  font-size: 20px;
  margin-bottom: 12px;
`,B=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0A2540;
`,_=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,$=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,z=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,D=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,M=i.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,O=i.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #DC2626; }
`,P=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 32px;
  overflow-x: auto;
`,T=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`,q=i.Ay.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,N=i.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,W=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,K=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,L=["#DC2626","#EF4444","#F87171","#FCA5A5","#FECACA","#FEE2E2","#FFF5F5"],U=()=>{const e=(0,s.Zp)(),{defaultCurrency:t}=(0,o.i1)(),[n,i]=(0,r.useState)("RM"),[U,Y]=(0,r.useState)(!0),[Q,V]=(0,r.useState)(null),[Z,G]=(0,r.useState)("month"),[H,J]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerRestaurant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[X,ee]=(0,r.useState)([]),[te,ne]=(0,r.useState)([]),[re,se]=(0,r.useState)([]),[ie,ae]=(0,r.useState)([]),[oe,le]=(0,r.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,r.useEffect)(()=>{t&&i(t)},[t]),(0,r.useEffect)(()=>{he(),de()},[]);const de=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&le(e.data)}}catch(e){}};(0,r.useEffect)(()=>{Q&&ue(Q)},[Z,Q]);const ce=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),he=async()=>{try{Y(!0);const e=ce(),t=await fetch("/api/brands",{headers:e}),n=await t.json(),r=(n.data||n||[])[0];if(!r)return void Y(!1);V(r.id),r.restaurants&&r.restaurants.length>0&&r.restaurants[0].currency&&i(r.restaurants[0].currency);const s=new Date,a=new Date(s.getFullYear(),s.getMonth(),1).toISOString().split("T")[0],o=s.toISOString().split("T")[0],[l,d,c,h,u]=await Promise.all([fetch(`/api/brands/${r.id}/revenue?start_date=${a}&end_date=${o}`,{headers:e}),fetch(`/api/brands/${r.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Brand Manager",{headers:e}),fetch(`/api/brands/${r.id}/subscriptions`,{headers:e})]),[p,x,g,v,j]=await Promise.all([l.json(),d.json(),c.json(),h.json(),u.json()]),m=p.data||p,y=parseFloat(m.total_revenue||0),f=m.restaurants||[],b=f.reduce((e,t)=>e+(t.order_count||0),0);ee(f);const F=(x.data||x||[]).filter(e=>!1!==e.is_active).length,A=g.data||g||[],w=A.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,k=A.filter(e=>"overdue"===e.status).length,E=Array.isArray(v)?v:v.data||[],C=j.data||j||[];se(C),J({totalRestaurants:f.length,monthlyRevenue:y,monthlyOrders:b,avgRevenuePerRestaurant:f.length>0?y/f.length:0,pendingInvoices:w,overdueInvoices:k,activePlans:F,totalManagers:E.length});const S=[];k>0&&S.push({type:"warning",message:`${k} overdue invoice${k>1?"s":""} need attention`}),w>0&&S.push({type:"info",message:`${w} invoice${w>1?"s":""} pending payment`});const R=f.filter(e=>0===(e.order_count||0));R.length>0&&S.push({type:"info",message:`${R.length} restaurant${R.length>1?"s":""} with no orders this month`}),oe.notices>0&&S.push({type:"info",message:`${oe.notices} unread notice(s)`}),oe.systemInquiry>0&&S.push({type:"info",message:`${oe.systemInquiry} system inquiry(s) with new replies`}),oe.operationInquiry>0&&S.push({type:"info",message:`${oe.operationInquiry} open operation inquiry(s)`}),0===S.length&&S.push({type:"success",message:"All systems running smoothly. No issues detected."}),ae(S),ue(r.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{Y(!1)}},ue=async e=>{try{const t=ce(),n=await fetch(`/api/brands/${e}/sales-trend?period=${Z}`,{headers:t}),r=await n.json();ne(r.data||[])}catch(t){console.error("Error fetching trend data:",t)}},pe=X.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,t)=>t.value-e.value).slice(0,7),xe=[...re].sort((e,t)=>{var n,r;return((null===(n=t.current_month)||void 0===n?void 0:n.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return U?(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(f,{children:[(0,y.jsx)(b,{children:(0,y.jsx)(F,{children:"Brand Dashboard"})}),(0,y.jsx)(K,{children:"Loading dashboard data..."})]})}):(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(f,{children:[(0,y.jsx)(b,{children:(0,y.jsx)(F,{children:"Brand Dashboard"})}),(0,y.jsxs)(A,{children:[(0,y.jsxs)(a.MD,{children:[(0,y.jsxs)(a.hI,{color:"#DC2626",children:[(0,y.jsx)(a.Os,{children:H.totalRestaurants}),(0,y.jsx)(a.v0,{children:"Franchise Restaurants"})]}),(0,y.jsxs)(a.hI,{color:"#059669",children:[(0,y.jsx)(a.Os,{children:(0,l.vv)(H.monthlyRevenue,n)}),(0,y.jsx)(a.v0,{children:"Monthly Revenue"})]}),(0,y.jsxs)(a.hI,{color:"#2563EB",children:[(0,y.jsx)(a.Os,{children:H.monthlyOrders.toLocaleString()}),(0,y.jsx)(a.v0,{children:"Monthly Orders"})]}),(0,y.jsxs)(a.hI,{color:"#7C3AED",children:[(0,y.jsx)(a.Os,{children:(0,l.vv)(H.avgRevenuePerRestaurant,n)}),(0,y.jsx)(a.v0,{children:"Avg Revenue / Restaurant"})]}),(0,y.jsxs)(a.hI,{color:"#F59E0B",children:[(0,y.jsx)(a.Os,{children:H.pendingInvoices}),(0,y.jsx)(a.v0,{children:"Pending Invoices"})]}),(0,y.jsxs)(a.hI,{color:H.overdueInvoices>0?"#EF4444":"#059669",children:[(0,y.jsx)(a.Os,{children:H.overdueInvoices}),(0,y.jsx)(a.v0,{children:"Overdue Invoices"})]}),(0,y.jsxs)(a.hI,{color:"#10B981",children:[(0,y.jsx)(a.Os,{children:H.activePlans}),(0,y.jsx)(a.v0,{children:"Active Plans"})]}),(0,y.jsxs)(a.hI,{color:"#6366F1",children:[(0,y.jsx)(a.Os,{children:H.totalManagers}),(0,y.jsx)(a.v0,{children:"Brand Managers"})]})]}),(0,y.jsxs)(C,{children:[(0,y.jsx)(w,{children:"System Alerts"}),ie.map((e,t)=>(0,y.jsxs)(k,{type:e.type,children:[(0,y.jsx)(E,{children:"warning"===e.type?"\u26a0\ufe0f":"success"===e.type?"\u2713":"\u2139"}),e.message]},t))]}),(0,y.jsxs)(C,{children:[(0,y.jsx)(w,{children:"Quick Access"}),(0,y.jsxs)(S,{children:[(0,y.jsxs)(R,{onClick:()=>e("/pos/brand/general/management"),children:[(0,y.jsx)(I,{children:"\u25eb"}),(0,y.jsx)(B,{children:"Manage Restaurants"}),(0,y.jsx)(_,{children:"Franchise management"})]}),(0,y.jsxs)(R,{onClick:()=>e("/pos/brand/invoices"),children:[(0,y.jsx)(I,{children:"\u25e7"}),(0,y.jsx)(B,{children:"Invoices"}),(0,y.jsx)(_,{children:"Invoice management"})]}),(0,y.jsxs)(R,{onClick:()=>e("/pos/brand/plans"),children:[(0,y.jsx)(I,{children:"\u25e8"}),(0,y.jsx)(B,{children:"Subscription Plans"}),(0,y.jsx)(_,{children:"Plan configuration"})]}),(0,y.jsxs)(R,{onClick:()=>e("/pos/brand/general/reports"),children:[(0,y.jsx)(I,{children:"\u25e9"}),(0,y.jsx)(B,{children:"Reports"}),(0,y.jsx)(_,{children:"Performance analytics"})]})]})]}),(0,y.jsxs)($,{children:[(0,y.jsxs)(z,{children:[(0,y.jsxs)(D,{children:[(0,y.jsx)(M,{children:"Revenue Trend"}),(0,y.jsxs)(O,{value:Z,onChange:e=>G(e.target.value),children:[(0,y.jsx)("option",{value:"week",children:"This Week"}),(0,y.jsx)("option",{value:"month",children:"This Month"}),(0,y.jsx)("option",{value:"year",children:"This Year"})]})]}),te.length>0?(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(c.b,{data:te,children:[(0,y.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,y.jsx)(u.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,y.jsx)(p.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,y.jsx)(x.m,{formatter:e=>[(0,l.vv)(e,n),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,y.jsx)(g.N,{type:"monotone",dataKey:"sales",stroke:"#DC2626",strokeWidth:2,dot:{r:4,fill:"#DC2626"},activeDot:{r:6}})]})}):(0,y.jsx)(K,{children:"No sales data for this period"})]}),(0,y.jsxs)(z,{children:[(0,y.jsx)(D,{children:(0,y.jsx)(M,{children:"Revenue Distribution"})}),pe.length>0?(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(v.r,{children:[(0,y.jsx)(j.F,{data:pe,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:pe.map((e,t)=>(0,y.jsx)(m.f,{fill:L[t%L.length]},t))}),(0,y.jsx)(x.m,{formatter:e=>(0,l.vv)(e,n)})]})}):(0,y.jsx)(K,{children:"No revenue data available"}),(0,y.jsx)("div",{style:{marginTop:8},children:pe.map((e,t)=>(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:"#374151"},children:[(0,y.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:L[t%L.length],flexShrink:0}}),(0,y.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name})]},t))})]})]}),(0,y.jsxs)(P,{children:[(0,y.jsxs)(D,{children:[(0,y.jsx)(w,{style:{margin:0},children:"Restaurant Performance"}),(0,y.jsx)("span",{style:{fontSize:12,color:"#6B7C93",cursor:"pointer"},onClick:()=>e("/pos/brand-general/restaurants"),children:"View All \u2192"})]}),(0,y.jsxs)(T,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(q,{children:"Restaurant"}),(0,y.jsx)(q,{children:"Plan"}),(0,y.jsx)(q,{children:"Monthly Revenue"}),(0,y.jsx)(q,{children:"Orders"}),(0,y.jsx)(q,{children:"Estimated Charges"}),(0,y.jsx)(q,{children:"Invoice Status"})]})}),(0,y.jsx)("tbody",{children:xe.length>0?xe.map((e,t)=>{var r,s,i,a,o,d;return(0,y.jsxs)("tr",{children:[(0,y.jsx)(N,{style:{fontWeight:600},children:e.restaurant_name||"-"}),(0,y.jsx)(N,{children:(null===(r=e.plan)||void 0===r?void 0:r.name)||"No Plan"}),(0,y.jsx)(N,{children:(0,l.vv)((null===(s=e.current_month)||void 0===s?void 0:s.revenue)||0,n)}),(0,y.jsx)(N,{children:(null===(i=e.current_month)||void 0===i?void 0:i.order_count)||0}),(0,y.jsx)(N,{children:(0,l.vv)((null===(a=e.current_month)||void 0===a?void 0:a.estimated_charges)||0,n)}),(0,y.jsx)(N,{children:(0,y.jsx)(W,{status:(null===(o=e.latest_invoice)||void 0===o?void 0:o.status)||"none",children:((null===(d=e.latest_invoice)||void 0===d?void 0:d.status)||"N/A").replace(/_/g," ")})})]},t)}):(0,y.jsx)("tr",{children:(0,y.jsx)(N,{colSpan:6,style:{textAlign:"center",color:"#6B7280"},children:"No restaurant data available"})})})]})]})]})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var r=n(9950),s=n(1367),i=n(6038);const a=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("RM"),[a]=(0,r.useState)(Object.keys(i.DL)),[o,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let s=r>=0?t[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";n(r)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:o,error:d}}}}]);