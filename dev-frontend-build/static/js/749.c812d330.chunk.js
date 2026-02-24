"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[749],{749:(e,n,t)=>{t.r(n),t.d(n,{default:()=>V});var r=t(9950),s=t(4492),a=t(4752),i=t(3310),o=t(5665),l=t(4021),d=t(6038),c=t(1095),h=t(2847),p=t(3245),x=t(158),u=t(3440),g=t(4094),v=t(4915),j=t(7621),m=t(5297),f=t(2528),y=t(1367),b=t(4414);const A=a.Ay.div`
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
`,w=a.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  @media (max-width: 768px) { font-size: 20px; }
`,k=a.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  background: #DC2626;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 12px;
  letter-spacing: 0.5px;
  @media (max-width: 768px) {
    display: block;
    margin-left: 0;
    margin-top: 8px;
    width: fit-content;
  }
`,E=a.Ay.main`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,C=a.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,R=a.Ay.div`
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
`,S=a.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,B=a.Ay.div`
  margin-bottom: 32px;
`,I=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,_=a.Ay.div`
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
`,z=a.Ay.div`
  color: #DC2626;
  font-size: 20px;
  margin-bottom: 12px;
`,D=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0A2540;
`,$=a.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,M=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,O=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,P=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,T=a.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,N=a.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #DC2626; }
`,W=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 32px;
  overflow-x: auto;
`,K=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`,L=a.Ay.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,G=a.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,U=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.status){case"paid":return"background: #D1FAE5; color: #065F46;";case"pending_payment":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";case"sent":return"background: #DBEAFE; color: #1E40AF;";default:return"background: #F3F4F6; color: #374151;"}}}
`,Y=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,Q=["#DC2626","#EF4444","#F87171","#FCA5A5","#FECACA","#FEE2E2","#FFF5F5"],V=()=>{const e=(0,s.Zp)(),{user:n}=(0,y.As)(),{defaultCurrency:t}=(0,l.i1)(),[a,V]=(0,r.useState)("RM"),[Z,q]=(0,r.useState)(!0),[H,J]=(0,r.useState)(null),[X,ee]=(0,r.useState)("month"),[ne,te]=(0,r.useState)({totalRestaurants:0,monthlyRevenue:0,monthlyOrders:0,avgRevenuePerRestaurant:0,pendingInvoices:0,overdueInvoices:0,activePlans:0,totalManagers:0}),[re,se]=(0,r.useState)([]),[ae,ie]=(0,r.useState)([]),[oe,le]=(0,r.useState)([]),[de,ce]=(0,r.useState)([]);(0,r.useEffect)(()=>{t&&V(t)},[t]),(0,r.useEffect)(()=>{pe()},[]),(0,r.useEffect)(()=>{H&&xe(H)},[X,H]);const he=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),pe=async()=>{try{q(!0);const e=he(),n=await fetch("/api/brands",{headers:e}),t=await n.json(),r=(t.data||t||[])[0];if(!r)return void q(!1);J(r.id),r.restaurants&&r.restaurants.length>0&&r.restaurants[0].currency&&V(r.restaurants[0].currency);const s=new Date,a=new Date(s.getFullYear(),s.getMonth(),1).toISOString().split("T")[0],i=s.toISOString().split("T")[0],[o,l,d,c,h]=await Promise.all([fetch(`/api/brands/${r.id}/revenue?start_date=${a}&end_date=${i}`,{headers:e}),fetch(`/api/brands/${r.id}/plans`,{headers:e}),fetch("/api/invoices",{headers:e}),fetch("/api/users?role=Brand Manager",{headers:e}),fetch(`/api/brands/${r.id}/subscriptions`,{headers:e})]),[p,x,u,g,v]=await Promise.all([o.json(),l.json(),d.json(),c.json(),h.json()]),j=p.data||p,m=parseFloat(j.total_revenue||0),f=j.restaurants||[],y=f.reduce((e,n)=>e+(n.order_count||0),0);se(f);const b=(x.data||x||[]).filter(e=>!1!==e.is_active).length,A=u.data||u||[],F=A.filter(e=>"pending_payment"===e.status||"sent"===e.status).length,w=A.filter(e=>"overdue"===e.status).length,k=Array.isArray(g)?g:g.data||[],E=v.data||v||[];le(E),te({totalRestaurants:f.length,monthlyRevenue:m,monthlyOrders:y,avgRevenuePerRestaurant:f.length>0?m/f.length:0,pendingInvoices:F,overdueInvoices:w,activePlans:b,totalManagers:k.length});const C=[];w>0&&C.push({type:"warning",message:`${w} overdue invoice${w>1?"s":""} need attention`}),F>0&&C.push({type:"info",message:`${F} invoice${F>1?"s":""} pending payment`});const R=f.filter(e=>0===(e.order_count||0));R.length>0&&C.push({type:"info",message:`${R.length} restaurant${R.length>1?"s":""} with no orders this month`}),0===C.length&&C.push({type:"success",message:"All systems running smoothly. No issues detected."}),ce(C),xe(r.id)}catch(e){console.error("Error fetching dashboard data:",e)}finally{q(!1)}},xe=async e=>{try{const n=he(),t=await fetch(`/api/brands/${e}/sales-trend?period=${X}`,{headers:n}),r=await t.json();ie(r.data||[])}catch(n){console.error("Error fetching trend data:",n)}},ue=re.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurant_name||e.name||"Unknown",value:parseFloat(e.revenue||0)})).sort((e,n)=>n.value-e.value).slice(0,7),ge=[...oe].sort((e,n)=>{var t,r;return((null===(t=n.current_month)||void 0===t?void 0:t.revenue)||0)-((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0)}).slice(0,5);return Z?(0,b.jsx)(i.A,{children:(0,b.jsxs)(A,{children:[(0,b.jsx)(F,{children:(0,b.jsxs)(w,{children:["Brand Dashboard ",(0,b.jsx)(k,{children:"Brand General"})]})}),(0,b.jsx)(Y,{children:"Loading dashboard data..."})]})}):(0,b.jsx)(i.A,{children:(0,b.jsxs)(A,{children:[(0,b.jsx)(F,{children:(0,b.jsxs)(w,{children:["Brand Dashboard ",(0,b.jsx)(k,{children:"Brand General"})]})}),(0,b.jsxs)(E,{children:[(0,b.jsxs)(o.MD,{children:[(0,b.jsxs)(o.hI,{color:"#DC2626",children:[(0,b.jsx)(o.Os,{children:ne.totalRestaurants}),(0,b.jsx)(o.v0,{children:"Franchise Restaurants"})]}),(0,b.jsxs)(o.hI,{color:"#059669",children:[(0,b.jsx)(o.Os,{children:(0,d.vv)(ne.monthlyRevenue,a)}),(0,b.jsx)(o.v0,{children:"Monthly Revenue"})]}),(0,b.jsxs)(o.hI,{color:"#2563EB",children:[(0,b.jsx)(o.Os,{children:ne.monthlyOrders.toLocaleString()}),(0,b.jsx)(o.v0,{children:"Monthly Orders"})]}),(0,b.jsxs)(o.hI,{color:"#7C3AED",children:[(0,b.jsx)(o.Os,{children:(0,d.vv)(ne.avgRevenuePerRestaurant,a)}),(0,b.jsx)(o.v0,{children:"Avg Revenue / Restaurant"})]}),(0,b.jsxs)(o.hI,{color:"#F59E0B",children:[(0,b.jsx)(o.Os,{children:ne.pendingInvoices}),(0,b.jsx)(o.v0,{children:"Pending Invoices"})]}),(0,b.jsxs)(o.hI,{color:ne.overdueInvoices>0?"#EF4444":"#059669",children:[(0,b.jsx)(o.Os,{children:ne.overdueInvoices}),(0,b.jsx)(o.v0,{children:"Overdue Invoices"})]}),(0,b.jsxs)(o.hI,{color:"#10B981",children:[(0,b.jsx)(o.Os,{children:ne.activePlans}),(0,b.jsx)(o.v0,{children:"Active Plans"})]}),(0,b.jsxs)(o.hI,{color:"#6366F1",children:[(0,b.jsx)(o.Os,{children:ne.totalManagers}),(0,b.jsx)(o.v0,{children:"Brand Managers"})]})]}),(0,b.jsxs)(B,{children:[(0,b.jsx)(C,{children:"System Alerts"}),de.map((e,n)=>(0,b.jsxs)(R,{type:e.type,children:[(0,b.jsx)(S,{children:"warning"===e.type?"\u26a0\ufe0f":"success"===e.type?"\u2713":"\u2139"}),e.message]},n))]}),(0,b.jsxs)(B,{children:[(0,b.jsx)(C,{children:"Quick Access"}),(0,b.jsxs)(I,{children:[(0,b.jsxs)(_,{onClick:()=>e("/pos/brand-general/restaurants"),children:[(0,b.jsx)(z,{children:"\u25eb"}),(0,b.jsx)(D,{children:"Manage Restaurants"}),(0,b.jsx)($,{children:"Franchise management"})]}),(0,b.jsxs)(_,{onClick:()=>e("/pos/brand-general/invoices"),children:[(0,b.jsx)(z,{children:"\u25e7"}),(0,b.jsx)(D,{children:"Invoices"}),(0,b.jsx)($,{children:"Invoice management"})]}),(0,b.jsxs)(_,{onClick:()=>e("/pos/brand-general/plans"),children:[(0,b.jsx)(z,{children:"\u25e8"}),(0,b.jsx)(D,{children:"Subscription Plans"}),(0,b.jsx)($,{children:"Plan configuration"})]}),(0,b.jsxs)(_,{onClick:()=>e("/pos/brand-general/reports"),children:[(0,b.jsx)(z,{children:"\u25e9"}),(0,b.jsx)(D,{children:"Reports"}),(0,b.jsx)($,{children:"Performance analytics"})]})]})]}),(0,b.jsxs)(M,{children:[(0,b.jsxs)(O,{children:[(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Revenue Trend"}),(0,b.jsxs)(N,{value:X,onChange:e=>ee(e.target.value),children:[(0,b.jsx)("option",{value:"week",children:"This Week"}),(0,b.jsx)("option",{value:"month",children:"This Month"}),(0,b.jsx)("option",{value:"year",children:"This Year"})]})]}),ae.length>0?(0,b.jsx)(c.u,{width:"100%",height:300,children:(0,b.jsxs)(h.b,{data:ae,children:[(0,b.jsx)(p.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,b.jsx)(x.W,{dataKey:"date",tick:{fontSize:12,fill:"#6B7C93"}}),(0,b.jsx)(u.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,b.jsx)(g.m,{formatter:e=>[(0,d.vv)(e,a),"Revenue"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,b.jsx)(v.N,{type:"monotone",dataKey:"sales",stroke:"#DC2626",strokeWidth:2,dot:{r:4,fill:"#DC2626"},activeDot:{r:6}})]})}):(0,b.jsx)(Y,{children:"No sales data for this period"})]}),(0,b.jsxs)(O,{children:[(0,b.jsx)(P,{children:(0,b.jsx)(T,{children:"Revenue Distribution"})}),ue.length>0?(0,b.jsx)(c.u,{width:"100%",height:300,children:(0,b.jsxs)(j.r,{children:[(0,b.jsx)(m.F,{data:ue,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:ue.map((e,n)=>(0,b.jsx)(f.f,{fill:Q[n%Q.length]},n))}),(0,b.jsx)(g.m,{formatter:e=>(0,d.vv)(e,a)})]})}):(0,b.jsx)(Y,{children:"No revenue data available"}),(0,b.jsx)("div",{style:{marginTop:8},children:ue.map((e,n)=>(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:"#374151"},children:[(0,b.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:Q[n%Q.length],flexShrink:0}}),(0,b.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name})]},n))})]})]}),(0,b.jsxs)(W,{children:[(0,b.jsxs)(P,{children:[(0,b.jsx)(C,{style:{margin:0},children:"Restaurant Performance"}),(0,b.jsx)("span",{style:{fontSize:12,color:"#6B7C93",cursor:"pointer"},onClick:()=>e("/pos/brand-general/restaurants"),children:"View All \u2192"})]}),(0,b.jsxs)(K,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(L,{children:"Restaurant"}),(0,b.jsx)(L,{children:"Plan"}),(0,b.jsx)(L,{children:"Monthly Revenue"}),(0,b.jsx)(L,{children:"Orders"}),(0,b.jsx)(L,{children:"Estimated Charges"}),(0,b.jsx)(L,{children:"Invoice Status"})]})}),(0,b.jsx)("tbody",{children:ge.length>0?ge.map((e,n)=>{var t,r,s,i,o,l;return(0,b.jsxs)("tr",{children:[(0,b.jsx)(G,{style:{fontWeight:600},children:e.restaurant_name||"-"}),(0,b.jsx)(G,{children:(null===(t=e.active_plan)||void 0===t?void 0:t.name)||"No Plan"}),(0,b.jsx)(G,{children:(0,d.vv)((null===(r=e.current_month)||void 0===r?void 0:r.revenue)||0,a)}),(0,b.jsx)(G,{children:(null===(s=e.current_month)||void 0===s?void 0:s.order_count)||0}),(0,b.jsx)(G,{children:(0,d.vv)((null===(i=e.current_month)||void 0===i?void 0:i.estimated_charges)||0,a)}),(0,b.jsx)(G,{children:(0,b.jsx)(U,{status:(null===(o=e.latest_invoice)||void 0===o?void 0:o.status)||"none",children:((null===(l=e.latest_invoice)||void 0===l?void 0:l.status)||"N/A").replace(/_/g," ")})})]},n)}):(0,b.jsx)("tr",{children:(0,b.jsx)(G,{colSpan:6,style:{textAlign:"center",color:"#6B7280"},children:"No restaurant data available"})})})]})]})]})]})})}},4021:(e,n,t)=>{t.d(n,{i1:()=>i});var r=t(9950),s=t(1367),a=t(6038);const i=()=>{const{user:e}=(0,s.As)(),[n,t]=(0,r.useState)("RM"),[i,o]=(0,r.useState)(Object.keys(a.DL)),[l,d]=(0,r.useState)(!0),[c,h]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let s=r>=0?n[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(r)}else t("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),h("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:i,loading:l,error:c}}}}]);