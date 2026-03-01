"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6312],{6312:(e,s,n)=>{n.r(s),n.d(s,{default:()=>G});var r=n(8819),t=n(9950),i=n(4492),a=n(4752),o=n(5665),d=n(1367),c=n(6038),l=n(1095),h=n(294),p=n(3245),x=n(158),u=n(3440),g=n(2174),m=n(3588),v=n(7621),y=n(5297),j=n(2528),f=n(4414);const w=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,b=a.Ay.div`
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
`,F=a.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${r.w.colors.secondary};
  @media (max-width: 768px) { font-size: 20px; }
`,A=a.Ay.main`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,R=a.Ay.h2`
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
`,$=a.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,E=a.Ay.div`
  margin-bottom: 32px;
`,C=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,I=a.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  color: ${r.w.colors.secondary};
  transition: all 0.15s;
  border: 1px solid ${r.w.colors.border};
  cursor: pointer;

  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,B=a.Ay.div`
  color: ${r.w.colors.primary};
  font-size: 20px;
  margin-bottom: 12px;
`,S=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${r.w.colors.secondary};
`,z=a.Ay.div`
  font-size: 12px;
  color: ${r.w.colors.text.secondary};
`,O=a.Ay.div`
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
  border: 1px solid ${r.w.colors.border};
`,M=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,N=a.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${r.w.colors.secondary};
`,q=a.Ay.select`
  padding: 6px 12px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: ${r.w.colors.primary}; }
`,T=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,P=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.1);
  }
`,U=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,V=a.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,K=a.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,W=a.Ay.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FFF7ED";case"inactive":case"overdue":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#EA580C";case"inactive":case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,_=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,L=a.Ay.div`
  font-size: 11px;
  color: #8898AA;
  margin-bottom: 2px;
`,Q=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,Y=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,Z=["#635BFF","#818CF8","#A5B4FC","#C7D2FE","#E0E7FF","#EEF2FF","#F5F3FF"],G=()=>{const e=(0,i.Zp)(),{user:s}=(0,d.As)(),[n,r]=(0,t.useState)(!0),[a,G]=(0,t.useState)("month"),[H,J]=(0,t.useState)({totalRestaurants:0,todayRevenue:0,monthRevenue:0,monthOrders:0,pendingInvoices:0,avgOrderValue:0,bestRestaurant:"-",activeRestaurants:0}),[X,ee]=(0,t.useState)([]),[se,ne]=(0,t.useState)([]),[re,te]=(0,t.useState)([]),[ie,ae]=(0,t.useState)("RM"),[oe,de]=(0,t.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0});(0,t.useEffect)(()=>{he(),ce()},[]);const ce=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const s=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(s.ok){const e=await s.json();e.success&&de(e.data)}}catch(e){}};(0,t.useEffect)(()=>{pe()},[a]);const le=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),he=async()=>{try{r(!0);const e=le(),[s,n,t]=await Promise.all([fetch("/api/owner/dashboard",{headers:e}),fetch(`/api/owner/statistics/compare?period=${a}`,{headers:e}),fetch("/api/owner/invoices?status=overdue",{headers:e})]),[i,o,d]=await Promise.all([s.json(),n.json(),t.json()]),c=i.data||i,l=c.restaurants||[];ee(l),l.length>0&&l[0].currency&&ae(l[0].currency);const h=o.data||o||[];ne(h);const p=h.reduce((e,s)=>e+parseFloat(s.revenue||0),0),x=h.reduce((e,s)=>e+(s.orderCount||0),0),u=x>0?p/x:0,g=h.length>0?h.reduce((e,s)=>parseFloat(s.revenue||0)>parseFloat(e.revenue||0)?s:e,h[0]):null,m=d.data||[],v=Array.isArray(m)?m.length:0,y=l.filter(e=>"inactive"!==e.status).length;J({totalRestaurants:c.totalRestaurants||l.length,todayRevenue:c.todayRevenue||0,monthRevenue:c.monthRevenue||0,monthOrders:c.totalOrders||x,pendingInvoices:c.pendingInvoices||0,avgOrderValue:u,bestRestaurant:(null===g||void 0===g?void 0:g.restaurantName)||"-",activeRestaurants:y});const j=[];v>0&&j.push({type:"warning",message:`${v} overdue invoice${v>1?"s":""} need attention`}),(c.pendingInvoices||0)>0&&j.push({type:"info",message:`${c.pendingInvoices} invoice${c.pendingInvoices>1?"s":""} pending payment`});const f=l.filter(e=>"inactive"===e.status);f.length>0&&j.push({type:"warning",message:`${f.length} restaurant${f.length>1?"s":""} currently inactive`});const w=l.filter(e=>0===(e.todayRevenue||0)&&"active"===e.status);w.length>0&&w.length<l.length&&j.push({type:"info",message:`${w.length} active restaurant${w.length>1?"s":""} with no orders today`}),oe.notices>0&&j.push({type:"info",message:`${oe.notices} unread notice(s)`}),oe.systemInquiry>0&&j.push({type:"info",message:`${oe.systemInquiry} system inquiry(s) with new replies`}),oe.operationInquiry>0&&j.push({type:"info",message:`${oe.operationInquiry} operation inquiry(s) with responses`}),0===j.length&&j.push({type:"success",message:"All systems running smoothly. No issues detected."}),te(j)}catch(e){console.error("Error fetching dashboard:",e)}finally{r(!1)}},pe=async()=>{try{const e=le(),s=await fetch(`/api/owner/statistics/compare?period=${a}`,{headers:e}),n=await s.json();ne(n.data||n||[])}catch(e){console.error("Error fetching compare data:",e)}},xe=se.map(e=>({name:(e.restaurantName||"Unknown").length>12?(e.restaurantName||"Unknown").substring(0,12)+"...":e.restaurantName||"Unknown",revenue:parseFloat(e.revenue||0),orders:e.orderCount||0})),ue=se.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurantName||"Unknown",value:parseFloat(e.revenue||0)}));return n?(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(w,{children:[(0,f.jsx)(b,{children:(0,f.jsx)(F,{children:"Owner Dashboard"})}),(0,f.jsx)(Y,{children:"Loading dashboard data..."})]})}):(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(w,{children:[(0,f.jsx)(b,{children:(0,f.jsx)(F,{children:"Owner Dashboard"})}),(0,f.jsxs)(A,{children:[(0,f.jsxs)(o.MD,{children:[(0,f.jsxs)(o.hI,{color:"#635BFF",children:[(0,f.jsx)(o.Os,{children:H.totalRestaurants}),(0,f.jsx)(o.v0,{children:"My Restaurants"})]}),(0,f.jsxs)(o.hI,{color:"#059669",children:[(0,f.jsx)(o.Os,{children:(0,c.vv)(H.todayRevenue,ie)}),(0,f.jsx)(o.v0,{children:"Today's Revenue"})]}),(0,f.jsxs)(o.hI,{color:"#10B981",children:[(0,f.jsx)(o.Os,{children:(0,c.vv)(H.monthRevenue,ie)}),(0,f.jsx)(o.v0,{children:"Monthly Revenue"})]}),(0,f.jsxs)(o.hI,{color:"#2563EB",children:[(0,f.jsx)(o.Os,{children:H.monthOrders.toLocaleString()}),(0,f.jsx)(o.v0,{children:"Monthly Orders"})]}),(0,f.jsxs)(o.hI,{color:"#F59E0B",children:[(0,f.jsx)(o.Os,{children:H.pendingInvoices}),(0,f.jsx)(o.v0,{children:"Pending Invoices"})]}),(0,f.jsxs)(o.hI,{color:"#7C3AED",children:[(0,f.jsx)(o.Os,{children:(0,c.vv)(H.avgOrderValue,ie)}),(0,f.jsx)(o.v0,{children:"Avg Order Value"})]}),(0,f.jsxs)(o.hI,{color:"#DC2626",children:[(0,f.jsx)(o.Os,{style:{fontSize:H.bestRestaurant.length>15?"16px":"24px"},children:H.bestRestaurant}),(0,f.jsx)(o.v0,{children:"Best Restaurant"})]}),(0,f.jsxs)(o.hI,{color:"#059669",children:[(0,f.jsx)(o.Os,{children:H.activeRestaurants}),(0,f.jsx)(o.v0,{children:"Active Restaurants"})]})]}),(0,f.jsxs)(E,{children:[(0,f.jsx)(R,{children:"System Alerts"}),re.map((e,s)=>(0,f.jsxs)(k,{type:e.type,children:[(0,f.jsx)($,{children:"warning"===e.type?"\u26a0\ufe0f":"success"===e.type?"\u2713":"\u2139"}),e.message]},s))]}),(0,f.jsxs)(E,{children:[(0,f.jsx)(R,{children:"Quick Access"}),(0,f.jsxs)(C,{children:[(0,f.jsxs)(I,{onClick:()=>e("/pos/owner/restaurants"),children:[(0,f.jsx)(B,{children:"\u25eb"}),(0,f.jsx)(S,{children:"My Restaurants"}),(0,f.jsx)(z,{children:"Restaurant management"})]}),(0,f.jsxs)(I,{onClick:()=>e("/pos/owner/invoices"),children:[(0,f.jsx)(B,{children:"\u25e7"}),(0,f.jsx)(S,{children:"Invoices"}),(0,f.jsx)(z,{children:"View invoices"})]}),(0,f.jsxs)(I,{onClick:()=>e("/pos/owner/reports"),children:[(0,f.jsx)(B,{children:"\u25e9"}),(0,f.jsx)(S,{children:"Reports"}),(0,f.jsx)(z,{children:"Cross-restaurant analytics"})]}),(0,f.jsxs)(I,{onClick:()=>e("/pos/profile"),children:[(0,f.jsx)(B,{children:"\u25c9"}),(0,f.jsx)(S,{children:"Settings"}),(0,f.jsx)(z,{children:"Profile settings"})]})]})]}),(0,f.jsxs)(O,{children:[(0,f.jsxs)(D,{children:[(0,f.jsxs)(M,{children:[(0,f.jsx)(N,{children:"Revenue Comparison"}),(0,f.jsxs)(q,{value:a,onChange:e=>G(e.target.value),children:[(0,f.jsx)("option",{value:"week",children:"This Week"}),(0,f.jsx)("option",{value:"month",children:"This Month"}),(0,f.jsx)("option",{value:"year",children:"This Year"})]})]}),xe.length>0?(0,f.jsx)(l.u,{width:"100%",height:300,children:(0,f.jsxs)(h.E,{data:xe,children:[(0,f.jsx)(p.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,f.jsx)(x.W,{dataKey:"name",tick:{fontSize:12,fill:"#6B7C93"}}),(0,f.jsx)(u.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,f.jsx)(g.m,{formatter:(e,s)=>["revenue"===s?(0,c.vv)(e,ie):e,"revenue"===s?"Revenue":"Orders"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,f.jsx)(m.y,{dataKey:"revenue",fill:"#635BFF",radius:[4,4,0,0]})]})}):(0,f.jsx)(Y,{children:"No comparison data available"})]}),(0,f.jsxs)(D,{children:[(0,f.jsx)(M,{children:(0,f.jsx)(N,{children:"Revenue Distribution"})}),ue.length>0?(0,f.jsx)(l.u,{width:"100%",height:300,children:(0,f.jsxs)(v.r,{children:[(0,f.jsx)(y.F,{data:ue,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:ue.map((e,s)=>(0,f.jsx)(j.f,{fill:Z[s%Z.length]},s))}),(0,f.jsx)(g.m,{formatter:e=>(0,c.vv)(e,ie)})]})}):(0,f.jsx)(Y,{children:"No revenue data available"}),(0,f.jsx)("div",{style:{marginTop:8},children:ue.map((e,s)=>(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:"#374151"},children:[(0,f.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:Z[s%Z.length],flexShrink:0}}),(0,f.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name})]},s))})]})]}),(0,f.jsx)(R,{children:"Restaurant Performance"}),(0,f.jsx)(T,{children:X.map(s=>(0,f.jsxs)(P,{onClick:()=>e(`/pos/owner/reports?tab=sales&restaurantId=${s.id}`),children:[(0,f.jsxs)(U,{children:[(0,f.jsxs)("div",{children:[(0,f.jsx)(V,{children:s.name}),(0,f.jsx)(K,{children:s.admin_name||"No admin assigned"})]}),(0,f.jsx)(W,{status:s.status,children:s.status})]}),(0,f.jsxs)(_,{children:[(0,f.jsxs)("div",{children:[(0,f.jsx)(L,{children:"Today"}),(0,f.jsx)(Q,{children:(0,c.vv)(s.todayRevenue,s.currency||ie)})]}),(0,f.jsxs)("div",{children:[(0,f.jsx)(L,{children:"This Month"}),(0,f.jsx)(Q,{children:(0,c.vv)(s.monthRevenue,s.currency||ie)})]})]})]},s.id))})]})]})})}}}]);