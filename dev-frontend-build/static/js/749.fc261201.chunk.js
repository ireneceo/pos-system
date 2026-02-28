"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[749],{749:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Q});var r=t(9950),s=t(4492),a=t(4752),i=t(5665),o=t(4021),l=t(6038),d=t(1095),c=t(2847),h=t(3245),u=t(158),x=t(3440),p=t(2174),g=t(4915),v=t(7621),j=t(5297),m=t(2528),f=t(1367),y=t(4414);const b=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,F=a.Ay.div`
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
`,A=a.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  @media (max-width: 768px) { font-size: 20px; }
`,w=a.Ay.main`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,E=a.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,k=a.Ay.div`
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
`,C=a.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,R=a.Ay.div`
  margin-bottom: 32px;
`,S=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,B=a.Ay.div`
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
`,I=a.Ay.div`
  color: #DC2626;
  font-size: 20px;
  margin-bottom: 12px;
`,_=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0A2540;
`,$=a.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,z=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,D=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,M=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,O=a.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,P=a.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #DC2626; }
`,T=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 32px;
  overflow-x: auto;
`,N=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`,W=a.Ay.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,K=a.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,L=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,U=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,Y=["#DC2626","#EF4444","#F87171","#FCA5A5","#FECACA","#FEE2E2","#FFF5F5"],Q=()=>{const e=(0,s.Zp)(),{user:n}=(0,f.As)(),{defaultCurrency:t}=(0,o.i1)(),[a,Q]=(0,r.useState)("RM"),[V,Z]=(0,r.useState)(!0),[q,G]=(0,r.useState)(null),[H,J]=(0,r.useState)("month"),[X,ee]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerRestaurant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[ne,te]=(0,r.useState)([]),[re,se]=(0,r.useState)([]),[ae,ie]=(0,r.useState)([]),[oe,le]=(0,r.useState)([]);(0,r.useEffect)(()=>{t&&Q(t)},[t]),(0,r.useEffect)(()=>{ce()},[]),(0,r.useEffect)(()=>{q&&he(q)},[H,q]);const de=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),ce=async()=>{try{Z(!0);const e=de(),n=await fetch("/api/brands",{headers:e}),t=await n.json(),r=(t.data||t||[])[0];if(!r)return void Z(!1);G(r.id),r.restaurants&&r.restaurants.length>0&&r.restaurants[0].currency&&Q(r.restaurants[0].currency);const s=new Date,a=new Date(s.getFullYear(),s.getMonth(),1).toISOString().split("T")[0],i=s.toISOString().split("T")[0],[o,l,d,c,h]=await Promise.all([fetch(`/api/brands/${r.id}/revenue?start_date=${a}&end_date=${i}`,{headers:e}),fetch(`/api/brands/${r.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Brand Manager",{headers:e}),fetch(`/api/brands/${r.id}/subscriptions`,{headers:e})]),[u,x,p,g,v]=await Promise.all([o.json(),l.json(),d.json(),c.json(),h.json()]),j=u.data||u,m=parseFloat(j.total_revenue||0),f=j.restaurants||[],y=f.reduce((e,n)=>e+(n.order_count||0),0);te(f);const b=(x.data||x||[]).filter(e=>!1!==e.is_active).length,F=p.data||p||[],A=F.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,w=F.filter(e=>"overdue"===e.status).length,E=Array.isArray(g)?g:g.data||[],k=v.data||v||[];ie(k),ee({totalRestaurants:f.length,monthlyRevenue:m,monthlyOrders:y,avgRevenuePerRestaurant:f.length>0?m/f.length:0,pendingInvoices:A,overdueInvoices:w,activePlans:b,totalManagers:E.length});const C=[];w>0&&C.push({type:"warning",message:`${w} overdue invoice${w>1?"s":""} need attention`}),A>0&&C.push({type:"info",message:`${A} invoice${A>1?"s":""} pending payment`});const R=f.filter(e=>0===(e.order_count||0));R.length>0&&C.push({type:"info",message:`${R.length} restaurant${R.length>1?"s":""} with no orders this month`}),0===C.length&&C.push({type:"success",message:"All systems running smoothly. No issues detected."}),le(C),he(r.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{Z(!1)}},he=async e=>{try{const n=de(),t=await fetch(`/api/brands/${e}/sales-trend?period=${H}`,{headers:n}),r=await t.json();se(r.data||[])}catch(n){console.error("Error fetching trend data:",n)}},ue=ne.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,n)=>n.value-e.value).slice(0,7),xe=[...ae].sort((e,n)=>{var t,r;return((null===(t=n.current_month)||void 0===t?void 0:t.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return V?(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(b,{children:[(0,y.jsx)(F,{children:(0,y.jsx)(A,{children:"Brand Dashboard"})}),(0,y.jsx)(U,{children:"Loading dashboard data..."})]})}):(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(b,{children:[(0,y.jsx)(F,{children:(0,y.jsx)(A,{children:"Brand Dashboard"})}),(0,y.jsxs)(w,{children:[(0,y.jsxs)(i.MD,{children:[(0,y.jsxs)(i.hI,{color:"#DC2626",children:[(0,y.jsx)(i.Os,{children:X.totalRestaurants}),(0,y.jsx)(i.v0,{children:"Franchise Restaurants"})]}),(0,y.jsxs)(i.hI,{color:"#059669",children:[(0,y.jsx)(i.Os,{children:(0,l.vv)(X.monthlyRevenue,a)}),(0,y.jsx)(i.v0,{children:"Monthly Revenue"})]}),(0,y.jsxs)(i.hI,{color:"#2563EB",children:[(0,y.jsx)(i.Os,{children:X.monthlyOrders.toLocaleString()}),(0,y.jsx)(i.v0,{children:"Monthly Orders"})]}),(0,y.jsxs)(i.hI,{color:"#7C3AED",children:[(0,y.jsx)(i.Os,{children:(0,l.vv)(X.avgRevenuePerRestaurant,a)}),(0,y.jsx)(i.v0,{children:"Avg Revenue / Restaurant"})]}),(0,y.jsxs)(i.hI,{color:"#F59E0B",children:[(0,y.jsx)(i.Os,{children:X.pendingInvoices}),(0,y.jsx)(i.v0,{children:"Pending Invoices"})]}),(0,y.jsxs)(i.hI,{color:X.overdueInvoices>0?"#EF4444":"#059669",children:[(0,y.jsx)(i.Os,{children:X.overdueInvoices}),(0,y.jsx)(i.v0,{children:"Overdue Invoices"})]}),(0,y.jsxs)(i.hI,{color:"#10B981",children:[(0,y.jsx)(i.Os,{children:X.activePlans}),(0,y.jsx)(i.v0,{children:"Active Plans"})]}),(0,y.jsxs)(i.hI,{color:"#6366F1",children:[(0,y.jsx)(i.Os,{children:X.totalManagers}),(0,y.jsx)(i.v0,{children:"Brand Managers"})]})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(E,{children:"System Alerts"}),oe.map((e,n)=>(0,y.jsxs)(k,{type:e.type,children:[(0,y.jsx)(C,{children:"warning"===e.type?"\u26a0\ufe0f":"success"===e.type?"\u2713":"\u2139"}),e.message]},n))]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(E,{children:"Quick Access"}),(0,y.jsxs)(S,{children:[(0,y.jsxs)(B,{onClick:()=>e("/pos/brand-general/restaurants"),children:[(0,y.jsx)(I,{children:"\u25eb"}),(0,y.jsx)(_,{children:"Manage Restaurants"}),(0,y.jsx)($,{children:"Franchise management"})]}),(0,y.jsxs)(B,{onClick:()=>e("/pos/brand-general/invoices"),children:[(0,y.jsx)(I,{children:"\u25e7"}),(0,y.jsx)(_,{children:"Invoices"}),(0,y.jsx)($,{children:"Invoice management"})]}),(0,y.jsxs)(B,{onClick:()=>e("/pos/brand-general/plans"),children:[(0,y.jsx)(I,{children:"\u25e8"}),(0,y.jsx)(_,{children:"Subscription Plans"}),(0,y.jsx)($,{children:"Plan configuration"})]}),(0,y.jsxs)(B,{onClick:()=>e("/pos/brand-general/reports"),children:[(0,y.jsx)(I,{children:"\u25e9"}),(0,y.jsx)(_,{children:"Reports"}),(0,y.jsx)($,{children:"Performance analytics"})]})]})]}),(0,y.jsxs)(z,{children:[(0,y.jsxs)(D,{children:[(0,y.jsxs)(M,{children:[(0,y.jsx)(O,{children:"Revenue Trend"}),(0,y.jsxs)(P,{value:H,onChange:e=>J(e.target.value),children:[(0,y.jsx)("option",{value:"week",children:"This Week"}),(0,y.jsx)("option",{value:"month",children:"This Month"}),(0,y.jsx)("option",{value:"year",children:"This Year"})]})]}),re.length>0?(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(c.b,{data:re,children:[(0,y.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,y.jsx)(u.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,y.jsx)(x.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,y.jsx)(p.m,{formatter:e=>[(0,l.vv)(e,a),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,y.jsx)(g.N,{type:"monotone",dataKey:"sales",stroke:"#DC2626",strokeWidth:2,dot:{r:4,fill:"#DC2626"},activeDot:{r:6}})]})}):(0,y.jsx)(U,{children:"No sales data for this period"})]}),(0,y.jsxs)(D,{children:[(0,y.jsx)(M,{children:(0,y.jsx)(O,{children:"Revenue Distribution"})}),ue.length>0?(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(v.r,{children:[(0,y.jsx)(j.F,{data:ue,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:ue.map((e,n)=>(0,y.jsx)(m.f,{fill:Y[n%Y.length]},n))}),(0,y.jsx)(p.m,{formatter:e=>(0,l.vv)(e,a)})]})}):(0,y.jsx)(U,{children:"No revenue data available"}),(0,y.jsx)("div",{style:{marginTop:8},children:ue.map((e,n)=>(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:"#374151"},children:[(0,y.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:Y[n%Y.length],flexShrink:0}}),(0,y.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name})]},n))})]})]}),(0,y.jsxs)(T,{children:[(0,y.jsxs)(M,{children:[(0,y.jsx)(E,{style:{margin:0},children:"Restaurant Performance"}),(0,y.jsx)("span",{style:{fontSize:12,color:"#6B7C93",cursor:"pointer"},onClick:()=>e("/pos/brand-general/restaurants"),children:"View All \u2192"})]}),(0,y.jsxs)(N,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(W,{children:"Restaurant"}),(0,y.jsx)(W,{children:"Plan"}),(0,y.jsx)(W,{children:"Monthly Revenue"}),(0,y.jsx)(W,{children:"Orders"}),(0,y.jsx)(W,{children:"Estimated Charges"}),(0,y.jsx)(W,{children:"Invoice Status"})]})}),(0,y.jsx)("tbody",{children:xe.length>0?xe.map((e,n)=>{var t,r,s,i,o,d;return(0,y.jsxs)("tr",{children:[(0,y.jsx)(K,{style:{fontWeight:600},children:e.restaurant_name||"-"}),(0,y.jsx)(K,{children:(null===(t=e.plan)||void 0===t?void 0:t.name)||"No Plan"}),(0,y.jsx)(K,{children:(0,l.vv)((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0,a)}),(0,y.jsx)(K,{children:(null===(s=e.current_month)||void 0===s?void 0:s.order_count)||0}),(0,y.jsx)(K,{children:(0,l.vv)((null===(i=e.current_month)||void 0===i?void 0:i.estimated_charges)||0,a)}),(0,y.jsx)(K,{children:(0,y.jsx)(L,{status:(null===(o=e.latest_invoice)||void 0===o?void 0:o.status)||"none",children:((null===(d=e.latest_invoice)||void 0===d?void 0:d.status)||"N/A").replace(/_/g," ")})})]},n)}):(0,y.jsx)("tr",{children:(0,y.jsx)(K,{colSpan:6,style:{textAlign:"center",color:"#6B7280"},children:"No restaurant data available"})})})]})]})]})]})})}},4021:(e,n,t)=>{t.d(n,{i1:()=>i});var r=t(9950),s=t(1367),a=t(6038);const i=()=>{const{user:e}=(0,s.As)(),[n,t]=(0,r.useState)("RM"),[i,o]=(0,r.useState)(Object.keys(a.DL)),[l,d]=(0,r.useState)(!0),[c,h]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let s=r>=0?n[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(r)}else t("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:i,loading:l,error:c}}}}]);