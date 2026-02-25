"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3201],{3201:(e,t,r)=>{r.r(t),r.d(t,{default:()=>R});var n=r(9950),s=r(4492),a=r(4752),i=r(3310),o=r(2674),l=r(6038),c=r(9018),d=r(4414);const p=a.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=a.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
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
`,u=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,m=a.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,v=a.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`,y=a.Ay.div`
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: ${e=>{switch(e.type){case"error":return"#FEF2F2";case"warning":return"#FFF4E6";case"info":return"#EFF6FF";default:return"#F8FAFC"}}};
  border-left: 4px solid ${e=>{switch(e.type){case"error":return"#EF4444";case"warning":return"#F59E0B";case"info":return"#3B82F6";default:return"#6B7280"}}};

  .title {
    font-weight: 600;
    color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"info":return"#2563EB";default:return"#374151"}}};
    margin-bottom: 4px;
  }

  .description {
    font-size: 14px;
    color: ${e=>{switch(e.type){case"error":return"#991B1B";case"warning":return"#92400E";case"info":return"#1D4ED8";default:return"#6B7280"}}};
  }
`,j=a.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,f=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,w=a.Ay.thead`
  background: #F8FAFC;
`,F=a.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=a.Ay.tbody``,k=a.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,A=a.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,S=a.Ay.div`
  .name {
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 4px;
  }

  .email {
    font-size: 13px;
    color: #6B7280;
  }
`,D=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .score {
    font-weight: 600;
    color: ${e=>e.score>=80?"#059669":e.score>=60?"#D97706":"#DC2626"};
  }

  .bar {
    width: 60px;
    height: 6px;
    background: #F3F4F6;
    border-radius: 3px;
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      width: ${e=>e.score}%;
      height: 100%;
      background: ${e=>e.score>=80?"#059669":e.score>=60?"#D97706":"#DC2626"};
      transition: width 0.3s ease;
    }
  }
`,C=a.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.variant){case"enterprise":return"background: #EDE9FE; color: #5B21B6;";case"professional":return"background: #DBEAFE; color: #1E40AF;";case"basic":default:return"background: #F3F4F6; color: #6B7280;";case"active":case"low":return"background: #ECFDF5; color: #059669;";case"trial":case"medium":return"background: #FEF3C7; color: #D97706;";case"expired":case"high":return"background: #FEE2E2; color: #DC2626;"}}}
`,R=()=>{const e=(0,s.Zp)(),{operationSettings:t}=(0,c.Pj)(),[r,a]=(0,n.useState)("overview"),[R,B]=(0,n.useState)([]),[E,M]=(0,n.useState)([]),[T,$]=(0,n.useState)([]),[z,I]=(0,n.useState)("month"),[N,_]=(0,n.useState)({totalManagers:0,activeSubscriptions:0,totalRestaurants:0,monthlyRevenue:0,yearlyRevenue:0,cumulativeRevenue:0,averageRevenuePerUser:0,churnRate:0,growthRate:0,customerLifetimeValue:0,supportTickets:0,systemUptime:99.9,activeUsers:0,totalTransactions:0});return(0,n.useEffect)(()=>{(async()=>{try{const t={"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/users?role=Manager",{headers:t});if(!r.ok)throw new Error("Failed to fetch users");const n=await r.json(),s=n.data||n,a=await fetch("/api/restaurants",{headers:t});if(!a.ok)throw new Error("Failed to fetch restaurants");const i=await a.json(),o=i.data||i;let l=[];o&&o.length>0&&(l=o.map(e=>{let t="active";return"active"===e.status?t="active":"inactive"===e.status&&(t="suspended"),{status:t,restaurantId:e.id,restaurantName:e.name}}));const c=await fetch("/api/invoices",{headers:t});let d=[],p=[],h=0;if(c.ok){const e=await c.json();d=e.data||e,$(d);h=d.filter(e=>"completed"===e.status||"paid"===e.status).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||t.amount||0),0);const t=new Map,r=new Date;let n=[];if("week"===z)for(let s=6;s>=0;s--){const e=new Date(r);e.setDate(r.getDate()-s),n.push(e.toISOString().split("T")[0])}else if("month"===z)for(let s=11;s>=0;s--){const e=new Date(r);e.setDate(r.getDate()-7*s);const t=new Date(e);t.setDate(e.getDate()-e.getDay()),n.push(`W${Math.floor(s/4)+1}-${t.getMonth()+1}/${t.getDate()}`)}else if("quarter"===z)for(let s=5;s>=0;s--){const e=new Date(r);e.setMonth(r.getMonth()-s),n.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}else for(let s=11;s>=0;s--){const e=new Date(r);e.setMonth(r.getMonth()-s),n.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}n.forEach(e=>{t.set(e,{revenue:0,count:0})}),d.forEach(e=>{const n=new Date(e.createdAt||e.created_at||e.issueDate);let s="";if("week"===z)s=n.toISOString().split("T")[0];else if("month"===z){const e=new Date(n);e.setDate(n.getDate()-n.getDay());const t=Math.floor((r.getTime()-e.getTime())/6048e5);t<12&&(s=`W${Math.floor(t/4)+1}-${e.getMonth()+1}/${e.getDate()}`)}else s=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;if(s&&t.has(s)){const r=parseFloat(e.total_amount||e.amount||e.total||0),n=t.get(s);t.set(s,{revenue:n.revenue+r,count:n.count+1})}}),p=Array.from(t.entries()).map(e=>{let[t,r]=e;return{period:t,revenue:r.revenue,invoiceCount:r.count}}).sort((e,t)=>"year"===z?parseInt(e.period)-parseInt(t.period):e.period.localeCompare(t.period))}let u=0;try{const e=await fetch("/api/support-tickets",{headers:t});if(e.ok){const t=await e.json();u=(t.data||t||[]).length}}catch(e){console.error("Error fetching support tickets:",e),u=0}M(p);const x=(s||[]).map(e=>{const t=(o||[]).filter(t=>t.managerId===e.id.toString()||t.admin_id===parseInt(e.id)||parseInt(t.managerId)===e.id||t.managerId===e.id),r=t.map(e=>e.id),n=d.filter(e=>r.includes(e.restaurant_id||e.restaurantId)),s=n.filter(e=>"paid"===e.status||"completed"===e.status).reduce((e,t)=>e+parseFloat(t.total_amount||t.amount||t.total||"0"),0),a=t.length>0?"active":"trial",i=n.filter(e=>"overdue"===e.status),l=0===n.length?70:Math.max(0,Math.min(100,Math.round(100-i.length/Math.max(n.length,1)*100))),c=l>=80?"low":l>=60?"medium":"high";return{id:`mgr-${e.id}`,companyName:e.full_name||e.username||"Manager Company",email:e.email,planType:t.length>5?"enterprise":t.length>2?"professional":"basic",subscriptionStatus:a,restaurantCount:t.length,totalRevenue:s,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],healthScore:l,riskLevel:c}});B(x);const g=x.length,m=l.filter(e=>"active"===e.status).length,v=(null===o||void 0===o?void 0:o.length)||x.reduce((e,t)=>e+t.restaurantCount,0),y=new Date,j=y.getMonth(),f=y.getFullYear(),w=d.filter(e=>"completed"===e.status||"paid"===e.status),F=w.filter(e=>{const t=new Date(e.issued_at||e.createdAt);return t.getMonth()===j&&t.getFullYear()===f}).reduce((e,t)=>e+parseFloat(t.paid_amount||t.total_amount||t.amount||t.total||"0"),0),b=w.filter(e=>new Date(e.issued_at||e.createdAt).getFullYear()===f).reduce((e,t)=>e+parseFloat(t.paid_amount||t.total_amount||t.amount||t.total||"0"),0),k=h,A=g>0?F/g:0,S=l.length,D=S>0?l.filter(e=>"cancelled"===e.status).length/S*100:0,C=g>0?100*(v/g-1):0,R=12*A,E=m,T=(new Date).getMonth(),I=(new Date).getFullYear(),N=x.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===T&&t.getFullYear()===I}).length,U=o.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===T&&t.getFullYear()===I}).length,Y=d.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===T&&t.getFullYear()===I}).length;_({totalManagers:g,activeSubscriptions:m,totalRestaurants:v,monthlyRevenue:F,yearlyRevenue:b,cumulativeRevenue:k,averageRevenuePerUser:A,churnRate:D,growthRate:C,customerLifetimeValue:R,supportTickets:u,systemUptime:99.9,activeUsers:E,totalTransactions:N+U+Y})}catch(e){console.error("Error fetching dashboard data:",e)}})()},[z]),(0,d.jsx)(i.A,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:(0,d.jsx)(x,{children:"Admin Dashboard"})}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(o.Ot,{children:[(0,d.jsxs)(o.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"Monthly Revenue"}),(0,d.jsx)(o.G$,{children:(0,l.vv)(N.monthlyRevenue,t.currency)})]}),(0,d.jsxs)(o.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"This Year Revenue"}),(0,d.jsx)(o.G$,{children:(0,l.vv)(N.yearlyRevenue,t.currency)})]}),(0,d.jsxs)(o.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"Cumulative Revenue"}),(0,d.jsx)(o.G$,{children:(0,l.vv)(N.cumulativeRevenue,t.currency)})]}),(0,d.jsxs)(o.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)(o.h2,{children:"Total Managers"}),(0,d.jsx)(o.G$,{children:N.totalManagers})]}),(0,d.jsxs)(o.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/subscriptions"),children:[(0,d.jsx)(o.h2,{children:"Active Subscriptions"}),(0,d.jsx)(o.G$,{children:N.activeSubscriptions})]}),(0,d.jsxs)(o.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/restaurants"),children:[(0,d.jsx)(o.h2,{children:"Total Restaurants"}),(0,d.jsx)(o.G$,{children:N.totalRestaurants})]}),(0,d.jsxs)(o.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,d.jsx)(o.h2,{children:"Support Tickets"}),(0,d.jsx)(o.G$,{children:N.supportTickets})]}),(0,d.jsxs)(o.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)(o.h2,{children:"Active Users"}),(0,d.jsx)(o.G$,{children:N.activeUsers})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(m,{children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,d.jsx)("h3",{children:"Revenue & Growth Analytics"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,d.jsx)("button",{onClick:()=>I("week"),style:{padding:"6px 12px",background:"week"===z?"#635BFF":"transparent",color:"week"===z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,d.jsx)("button",{onClick:()=>I("month"),style:{padding:"6px 12px",background:"month"===z?"#635BFF":"transparent",color:"month"===z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,d.jsx)("button",{onClick:()=>I("quarter"),style:{padding:"6px 12px",background:"quarter"===z?"#635BFF":"transparent",color:"quarter"===z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Quarter"}),(0,d.jsx)("button",{onClick:()=>I("year"),style:{padding:"6px 12px",background:"year"===z?"#635BFF":"transparent",color:"year"===z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),(0,d.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:E.length>0?(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:E.map(e=>(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,d.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/Math.max(...E.map(e=>e.revenue))*80)}px`,background:"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px"},title:`${e.period}: ${(0,l.vv)(e.revenue,t.currency)}`}),(0,d.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===z?new Date(e.period).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===z?e.period.replace("W1-","").replace("W2-","").replace("W3-","").replace("W4-",""):new Date(e.period+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,d.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:e.revenue>0?`${(0,l.vv)(e.revenue/1e3,t.currency).replace(/\.\d+/,"")}K`:(0,l.vv)(0,t.currency)}),(0,d.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.invoiceCount||0," inv"]})]},e.period))}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===z?"Last 7 days":"month"===z?"Last 12 weeks":"quarter"===z?"Last 6 months":"Last 12 months"}),(0,d.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=E.find(e=>e.revenue>0),t=E[E.length-1];if(e&&t&&e.revenue>0){const r=(t.revenue-e.revenue)/e.revenue*100;return r>0?`\u2197 +${r.toFixed(1)}%`:r<0?`\u2198 ${r.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,d.jsxs)("div",{style:{textAlign:"center",color:"#6B7280",paddingTop:"40px"},children:[(0,d.jsxs)("p",{children:["Total Revenue: ",(0,l.vv)(N.monthlyRevenue/1e3,t.currency).replace(/\.\d+/,""),"K"]}),(0,d.jsxs)("p",{children:["Growth Rate: +",N.growthRate.toFixed(1),"% YoY"]}),(0,d.jsx)("p",{children:"Invoice data loading..."})]})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)("h3",{children:"System Alerts"}),R.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length>0&&(0,d.jsxs)(y,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)("div",{className:"title",children:"New Manager Registration"}),(0,d.jsxs)("div",{className:"description",children:[R.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length," new manager(s) registered today - Click to view"]})]}),N.supportTickets>0&&(0,d.jsxs)(y,{type:"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,d.jsx)("div",{className:"title",children:"Support Tickets Pending"}),(0,d.jsxs)("div",{className:"description",children:[N.supportTickets," open support ticket(s) require attention - Click to view"]})]}),T.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length>0&&(0,d.jsxs)(y,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)("div",{className:"title",children:"New Revenue Generated"}),(0,d.jsxs)("div",{className:"description",children:[(0,l.vv)(T.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).reduce((e,t)=>e+parseFloat(t.total_amount||t.amount||0),0),t.currency),"earned today from ",T.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length," transaction(s) - Click to view details"]})]}),0===R.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length&&0===N.supportTickets&&0===T.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length&&(0,d.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"No new activities today. All systems running smoothly."})]})]}),(0,d.jsxs)(o.j,{children:[(0,d.jsx)(o.oz,{active:"overview"===r,onClick:()=>a("overview"),children:"Manager Overview"}),(0,d.jsx)(o.oz,{active:"performance"===r,onClick:()=>a("performance"),children:"Performance Analytics"}),(0,d.jsx)(o.oz,{active:"health"===r,onClick:()=>a("health"),children:"Account Health"}),(0,d.jsx)(o.oz,{active:"system"===r,onClick:()=>a("system"),children:"System Operations"})]}),"overview"===r&&(0,d.jsx)(j,{children:(0,d.jsxs)(f,{children:[(0,d.jsx)(w,{children:(0,d.jsxs)(k,{children:[(0,d.jsx)(F,{children:"Manager Company"}),(0,d.jsx)(F,{children:"Plan"}),(0,d.jsx)(F,{children:"Status"}),(0,d.jsx)(F,{children:"Restaurants"}),(0,d.jsx)(F,{children:"Monthly Revenue"}),(0,d.jsx)(F,{children:"Health Score"}),(0,d.jsx)(F,{children:"Risk Level"})]})}),(0,d.jsx)(b,{children:R.map(e=>(0,d.jsxs)(k,{children:[(0,d.jsx)(A,{children:(0,d.jsxs)(S,{children:[(0,d.jsx)("div",{className:"name",children:e.companyName}),(0,d.jsx)("div",{className:"email",children:e.email})]})}),(0,d.jsx)(A,{children:(0,d.jsx)(C,{variant:e.planType,children:e.planType})}),(0,d.jsx)(A,{children:(0,d.jsx)(C,{variant:e.subscriptionStatus,children:e.subscriptionStatus})}),(0,d.jsx)(A,{children:e.restaurantCount}),(0,d.jsx)(A,{children:(0,l.vv)(e.totalRevenue,t.currency)}),(0,d.jsx)(A,{children:(0,d.jsxs)(D,{score:e.healthScore,children:[(0,d.jsxs)("span",{className:"score",children:[e.healthScore,"%"]}),(0,d.jsx)("div",{className:"bar"})]})}),(0,d.jsx)(A,{children:(0,d.jsx)(C,{variant:e.riskLevel,children:e.riskLevel})})]},e.id))})]})}),"performance"===r&&(0,d.jsxs)(j,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Performance Analytics"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#059669",marginBottom:"10px"},children:"Revenue Insights"}),(0,d.jsxs)("p",{children:["\u2022 Monthly revenue: ",(0,l.vv)(N.monthlyRevenue,t.currency)]}),(0,d.jsxs)("p",{children:["\u2022 Yearly revenue: ",(0,l.vv)(N.yearlyRevenue,t.currency)]}),(0,d.jsxs)("p",{children:["\u2022 ARPU: ",(0,l.vv)(N.averageRevenuePerUser,t.currency)]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#2563EB",marginBottom:"10px"},children:"Business Overview"}),(0,d.jsxs)("p",{children:["\u2022 Total managers: ",N.totalManagers]}),(0,d.jsxs)("p",{children:["\u2022 Active subscriptions: ",N.activeSubscriptions]}),(0,d.jsxs)("p",{children:["\u2022 Open support tickets: ",N.supportTickets]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#7C3AED",marginBottom:"10px"},children:"Restaurant Metrics"}),(0,d.jsxs)("p",{children:["\u2022 Total restaurants: ",N.totalRestaurants]}),(0,d.jsxs)("p",{children:["\u2022 This month activities: ",N.totalTransactions]}),(0,d.jsxs)("p",{children:["\u2022 Cumulative revenue: ",(0,l.vv)(N.cumulativeRevenue,t.currency)]})]})]})]}),"health"===r&&(0,d.jsxs)(j,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Account Health Monitoring"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"Health Score Distribution"}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsxs)("p",{children:["\ud83d\udfe2 Healthy (80-100): ",R.filter(e=>e.healthScore>=80).length," accounts"]}),(0,d.jsxs)("p",{children:["\ud83d\udfe1 At Risk (60-79): ",R.filter(e=>e.healthScore>=60&&e.healthScore<80).length," accounts"]}),(0,d.jsxs)("p",{children:["\ud83d\udd34 Critical (<60): ",R.filter(e=>e.healthScore<60).length," accounts"]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"Risk Factors"}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("p",{children:"\u2022 Payment delays: Monitor automated"}),(0,d.jsx)("p",{children:"\u2022 Usage decline: Real-time alerts"}),(0,d.jsx)("p",{children:"\u2022 Support escalations: Tracked"}),(0,d.jsx)("p",{children:"\u2022 Contract renewals: 45-day alerts"})]})]})]})]}),"system"===r&&(0,d.jsxs)(j,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"System Operations"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#059669"},children:"Invoice Summary"}),(0,d.jsxs)("p",{children:["\u2022 Total invoices: ",T.length]}),(0,d.jsxs)("p",{children:["\u2022 Paid: ",T.filter(e=>"paid"===e.status||"completed"===e.status).length]}),(0,d.jsxs)("p",{children:["\u2022 Pending: ",T.filter(e=>"pending_payment"===e.status).length]}),(0,d.jsxs)("p",{children:["\u2022 Overdue: ",T.filter(e=>"overdue"===e.status).length]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#2563EB"},children:"User Activity"}),(0,d.jsxs)("p",{children:["\u2022 Total managers: ",N.totalManagers]}),(0,d.jsxs)("p",{children:["\u2022 Active users: ",N.activeUsers]}),(0,d.jsxs)("p",{children:["\u2022 Total restaurants: ",N.totalRestaurants]}),(0,d.jsxs)("p",{children:["\u2022 Active subscriptions: ",N.activeSubscriptions]})]})]})]})]})]})})}}}]);