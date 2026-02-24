"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6312],{6312:(e,n,t)=>{t.r(n),t.d(n,{default:()=>H});var s=t(9950),r=t(4492),i=t(4752),a=t(3310),o=t(5665),d=t(1367),l=t(6038),c=t(1095),h=t(294),p=t(3245),x=t(158),u=t(3440),g=t(4094),v=t(3588),m=t(7621),j=t(5297),y=t(2528),f=t(4414);const F=i.Ay.div`
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
`,w=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  @media (max-width: 768px) { font-size: 20px; }
`,A=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  background: #635BFF;
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
`,R=i.Ay.main`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,k=i.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,E=i.Ay.div`
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
`,B=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,C=i.Ay.div`
  margin-bottom: 32px;
`,O=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,z=i.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  color: #0A2540;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  cursor: pointer;

  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,I=i.Ay.div`
  color: #635BFF;
  font-size: 20px;
  margin-bottom: 12px;
`,S=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0A2540;
`,$=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
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
  border: 1px solid #E6EBF1;
`,N=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,T=i.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,P=i.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; }
`,U=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,V=i.Ay.div`
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
`,K=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,W=i.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,L=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,_=i.Ay.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FFF7ED";case"inactive":case"overdue":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#EA580C";case"inactive":case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,Q=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,Y=i.Ay.div`
  font-size: 11px;
  color: #8898AA;
  margin-bottom: 2px;
`,Z=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,q=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,G=["#635BFF","#818CF8","#A5B4FC","#C7D2FE","#E0E7FF","#EEF2FF","#F5F3FF"],H=()=>{const e=(0,r.Zp)(),{user:n}=(0,d.As)(),[t,i]=(0,s.useState)(!0),[H,J]=(0,s.useState)("month"),[X,ee]=(0,s.useState)({totalRestaurants:0,todayRevenue:0,monthRevenue:0,monthOrders:0,pendingInvoices:0,avgOrderValue:0,bestRestaurant:"-",activeRestaurants:0}),[ne,te]=(0,s.useState)([]),[se,re]=(0,s.useState)([]),[ie,ae]=(0,s.useState)([]),[oe,de]=(0,s.useState)("RM");(0,s.useEffect)(()=>{ce()},[]),(0,s.useEffect)(()=>{he()},[H]);const le=()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),ce=async()=>{try{i(!0);const e=le(),[n,t,s]=await Promise.all([fetch("/api/owner/dashboard",{headers:e}),fetch(`/api/owner/statistics/compare?period=${H}`,{headers:e}),fetch("/api/owner/invoices?status=overdue",{headers:e})]),[r,a,o]=await Promise.all([n.json(),t.json(),s.json()]),d=r.data||r,l=d.restaurants||[];te(l),l.length>0&&l[0].currency&&de(l[0].currency);const c=a.data||a||[];re(c);const h=c.reduce((e,n)=>e+parseFloat(n.revenue||0),0),p=c.reduce((e,n)=>e+(n.orderCount||0),0),x=p>0?h/p:0,u=c.length>0?c.reduce((e,n)=>parseFloat(n.revenue||0)>parseFloat(e.revenue||0)?n:e,c[0]):null,g=o.data||[],v=Array.isArray(g)?g.length:0,m=l.filter(e=>"inactive"!==e.status).length;ee({totalRestaurants:d.totalRestaurants||l.length,todayRevenue:d.todayRevenue||0,monthRevenue:d.monthRevenue||0,monthOrders:d.totalOrders||p,pendingInvoices:d.pendingInvoices||0,avgOrderValue:x,bestRestaurant:(null===u||void 0===u?void 0:u.restaurantName)||"-",activeRestaurants:m});const j=[];v>0&&j.push({type:"warning",message:`${v} overdue invoice${v>1?"s":""} need attention`}),(d.pendingInvoices||0)>0&&j.push({type:"info",message:`${d.pendingInvoices} invoice${d.pendingInvoices>1?"s":""} pending payment`});const y=l.filter(e=>"inactive"===e.status);y.length>0&&j.push({type:"warning",message:`${y.length} restaurant${y.length>1?"s":""} currently inactive`});const f=l.filter(e=>0===(e.todayRevenue||0)&&"active"===e.status);f.length>0&&f.length<l.length&&j.push({type:"info",message:`${f.length} active restaurant${f.length>1?"s":""} with no orders today`}),0===j.length&&j.push({type:"success",message:"All systems running smoothly. No issues detected."}),ae(j)}catch(e){console.error("Error fetching dashboard:",e)}finally{i(!1)}},he=async()=>{try{const e=le(),n=await fetch(`/api/owner/statistics/compare?period=${H}`,{headers:e}),t=await n.json();re(t.data||t||[])}catch(e){console.error("Error fetching compare data:",e)}},pe=se.map(e=>({name:(e.restaurantName||"Unknown").length>12?(e.restaurantName||"Unknown").substring(0,12)+"...":e.restaurantName||"Unknown",revenue:parseFloat(e.revenue||0),orders:e.orderCount||0})),xe=se.filter(e=>parseFloat(e.revenue||0)>0).map(e=>({name:e.restaurantName||"Unknown",value:parseFloat(e.revenue||0)}));return t?(0,f.jsx)(a.A,{children:(0,f.jsxs)(F,{children:[(0,f.jsx)(b,{children:(0,f.jsxs)(w,{children:["Owner Dashboard ",(0,f.jsx)(A,{children:"Restaurant Owner"})]})}),(0,f.jsx)(q,{children:"Loading dashboard data..."})]})}):(0,f.jsx)(a.A,{children:(0,f.jsxs)(F,{children:[(0,f.jsx)(b,{children:(0,f.jsxs)(w,{children:["Owner Dashboard ",(0,f.jsx)(A,{children:"Restaurant Owner"})]})}),(0,f.jsxs)(R,{children:[(0,f.jsxs)(o.MD,{children:[(0,f.jsxs)(o.hI,{color:"#635BFF",children:[(0,f.jsx)(o.Os,{children:X.totalRestaurants}),(0,f.jsx)(o.v0,{children:"My Restaurants"})]}),(0,f.jsxs)(o.hI,{color:"#059669",children:[(0,f.jsx)(o.Os,{children:(0,l.vv)(X.todayRevenue,oe)}),(0,f.jsx)(o.v0,{children:"Today's Revenue"})]}),(0,f.jsxs)(o.hI,{color:"#10B981",children:[(0,f.jsx)(o.Os,{children:(0,l.vv)(X.monthRevenue,oe)}),(0,f.jsx)(o.v0,{children:"Monthly Revenue"})]}),(0,f.jsxs)(o.hI,{color:"#2563EB",children:[(0,f.jsx)(o.Os,{children:X.monthOrders.toLocaleString()}),(0,f.jsx)(o.v0,{children:"Monthly Orders"})]}),(0,f.jsxs)(o.hI,{color:"#F59E0B",children:[(0,f.jsx)(o.Os,{children:X.pendingInvoices}),(0,f.jsx)(o.v0,{children:"Pending Invoices"})]}),(0,f.jsxs)(o.hI,{color:"#7C3AED",children:[(0,f.jsx)(o.Os,{children:(0,l.vv)(X.avgOrderValue,oe)}),(0,f.jsx)(o.v0,{children:"Avg Order Value"})]}),(0,f.jsxs)(o.hI,{color:"#DC2626",children:[(0,f.jsx)(o.Os,{style:{fontSize:X.bestRestaurant.length>15?"16px":"24px"},children:X.bestRestaurant}),(0,f.jsx)(o.v0,{children:"Best Restaurant"})]}),(0,f.jsxs)(o.hI,{color:"#059669",children:[(0,f.jsx)(o.Os,{children:X.activeRestaurants}),(0,f.jsx)(o.v0,{children:"Active Restaurants"})]})]}),(0,f.jsxs)(C,{children:[(0,f.jsx)(k,{children:"System Alerts"}),ie.map((e,n)=>(0,f.jsxs)(E,{type:e.type,children:[(0,f.jsx)(B,{children:"warning"===e.type?"\u26a0\ufe0f":"success"===e.type?"\u2713":"\u2139"}),e.message]},n))]}),(0,f.jsxs)(C,{children:[(0,f.jsx)(k,{children:"Quick Access"}),(0,f.jsxs)(O,{children:[(0,f.jsxs)(z,{onClick:()=>e("/pos/owner/restaurants"),children:[(0,f.jsx)(I,{children:"\u25eb"}),(0,f.jsx)(S,{children:"My Restaurants"}),(0,f.jsx)($,{children:"Restaurant management"})]}),(0,f.jsxs)(z,{onClick:()=>e("/pos/owner/invoices"),children:[(0,f.jsx)(I,{children:"\u25e7"}),(0,f.jsx)(S,{children:"Invoices"}),(0,f.jsx)($,{children:"View invoices"})]}),(0,f.jsxs)(z,{onClick:()=>e("/pos/owner/reports"),children:[(0,f.jsx)(I,{children:"\u25e9"}),(0,f.jsx)(S,{children:"Reports"}),(0,f.jsx)($,{children:"Cross-restaurant analytics"})]}),(0,f.jsxs)(z,{onClick:()=>e("/pos/profile"),children:[(0,f.jsx)(I,{children:"\u25c9"}),(0,f.jsx)(S,{children:"Settings"}),(0,f.jsx)($,{children:"Profile settings"})]})]})]}),(0,f.jsxs)(D,{children:[(0,f.jsxs)(M,{children:[(0,f.jsxs)(N,{children:[(0,f.jsx)(T,{children:"Revenue Comparison"}),(0,f.jsxs)(P,{value:H,onChange:e=>J(e.target.value),children:[(0,f.jsx)("option",{value:"week",children:"This Week"}),(0,f.jsx)("option",{value:"month",children:"This Month"}),(0,f.jsx)("option",{value:"year",children:"This Year"})]})]}),pe.length>0?(0,f.jsx)(c.u,{width:"100%",height:300,children:(0,f.jsxs)(h.E,{data:pe,children:[(0,f.jsx)(p.d,{strokeDasharray:"3 3",stroke:"#F3F4F6"}),(0,f.jsx)(x.W,{dataKey:"name",tick:{fontSize:12,fill:"#6B7C93"}}),(0,f.jsx)(u.h,{tick:{fontSize:12,fill:"#6B7C93"},tickFormatter:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e}),(0,f.jsx)(g.m,{formatter:(e,n)=>["revenue"===n?(0,l.vv)(e,oe):e,"revenue"===n?"Revenue":"Orders"],labelStyle:{color:"#0A2540",fontWeight:600},contentStyle:{borderRadius:8,border:"1px solid #E6EBF1"}}),(0,f.jsx)(v.y,{dataKey:"revenue",fill:"#635BFF",radius:[4,4,0,0]})]})}):(0,f.jsx)(q,{children:"No comparison data available"})]}),(0,f.jsxs)(M,{children:[(0,f.jsx)(N,{children:(0,f.jsx)(T,{children:"Revenue Distribution"})}),xe.length>0?(0,f.jsx)(c.u,{width:"100%",height:300,children:(0,f.jsxs)(m.r,{children:[(0,f.jsx)(j.F,{data:xe,cx:"50%",cy:"50%",innerRadius:60,outerRadius:100,paddingAngle:2,dataKey:"value",children:xe.map((e,n)=>(0,f.jsx)(y.f,{fill:G[n%G.length]},n))}),(0,f.jsx)(g.m,{formatter:e=>(0,l.vv)(e,oe)})]})}):(0,f.jsx)(q,{children:"No revenue data available"}),(0,f.jsx)("div",{style:{marginTop:8},children:xe.map((e,n)=>(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4,fontSize:12,color:"#374151"},children:[(0,f.jsx)("div",{style:{width:10,height:10,borderRadius:2,background:G[n%G.length],flexShrink:0}}),(0,f.jsx)("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name})]},n))})]})]}),(0,f.jsx)(k,{children:"Restaurant Performance"}),(0,f.jsx)(U,{children:ne.map(n=>(0,f.jsxs)(V,{onClick:()=>e(`/pos/owner/reports?tab=sales&restaurantId=${n.id}`),children:[(0,f.jsxs)(K,{children:[(0,f.jsxs)("div",{children:[(0,f.jsx)(W,{children:n.name}),(0,f.jsx)(L,{children:n.admin_name||"No admin assigned"})]}),(0,f.jsx)(_,{status:n.status,children:n.status})]}),(0,f.jsxs)(Q,{children:[(0,f.jsxs)("div",{children:[(0,f.jsx)(Y,{children:"Today"}),(0,f.jsx)(Z,{children:(0,l.vv)(n.todayRevenue,n.currency||oe)})]}),(0,f.jsxs)("div",{children:[(0,f.jsx)(Y,{children:"This Month"}),(0,f.jsx)(Z,{children:(0,l.vv)(n.monthRevenue,n.currency||oe)})]})]})]},n.id))})]})]})})}}}]);