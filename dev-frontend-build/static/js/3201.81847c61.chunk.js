"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3201],{3201:(e,t,r)=>{r.r(t),r.d(t,{default:()=>B});var n=r(9950),s=r(4492),a=r(4752),i=r(3310),o=r(2674),l=r(6038),c=r(9018),d=r(4414);const p=e=>{const t=Object.entries(e).filter(e=>{let[,t]=e;return t>0});return 0===t.length?(0,l.vv)(0,"RM"):t.map(e=>{let[t,r]=e;return(0,l.vv)(r,t)}).join(" / ")},u=a.Ay.div`
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
`,x=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
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
  }
`,y=a.Ay.div`
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
`,j=a.Ay.div`
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
`,f=a.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,w=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,F=a.Ay.thead`
  background: #F8FAFC;
`,b=a.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,k=a.Ay.tbody``,S=a.Ay.tr`
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
`,D=a.Ay.div`
  .name {
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 4px;
  }

  .email {
    font-size: 13px;
    color: #6B7280;
  }
`,C=a.Ay.div`
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
`,R=a.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.variant){case"enterprise":return"background: #EDE9FE; color: #5B21B6;";case"professional":return"background: #DBEAFE; color: #1E40AF;";case"basic":default:return"background: #F3F4F6; color: #6B7280;";case"active":case"low":return"background: #ECFDF5; color: #059669;";case"trial":case"medium":return"background: #FEF3C7; color: #D97706;";case"expired":case"high":return"background: #FEE2E2; color: #DC2626;"}}}
`,B=()=>{const e=(0,s.Zp)(),{operationSettings:t}=(0,c.Pj)(),[r,a]=(0,n.useState)("overview"),[B,E]=(0,n.useState)([]),[M,T]=(0,n.useState)([]),[$,z]=(0,n.useState)([]),[I,Y]=(0,n.useState)("month"),[O,_]=(0,n.useState)({totalManagers:0,activeSubscriptions:0,totalRestaurants:0,monthlyRevenue:{},yearlyRevenue:{},cumulativeRevenue:{},averageRevenuePerUser:0,churnRate:0,growthRate:0,customerLifetimeValue:0,supportTickets:0,systemUptime:99.9,activeUsers:0,totalTransactions:0});return(0,n.useEffect)(()=>{(async()=>{try{const t={"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/users?role=Manager",{headers:t});if(!r.ok)throw new Error("Failed to fetch users");const n=await r.json(),s=n.data||n,a=await fetch("/api/restaurants",{headers:t});if(!a.ok)throw new Error("Failed to fetch restaurants");const i=await a.json(),o=i.data||i;let l=[];o&&o.length>0&&(l=o.map(e=>{let t="active";return"active"===e.status?t="active":"inactive"===e.status&&(t="suspended"),{status:t,restaurantId:e.id,restaurantName:e.name}}));const c=await fetch("/api/invoices",{headers:t});let d=[],p=[],u=0;if(c.ok){const e=await c.json();d=e.data||e,z(d);const t=d.filter(e=>"completed"===e.status||"paid"===e.status),r={};t.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||0),n=e.currency||"MYR";r[n]=(r[n]||0)+t}),u=t.reduce((e,t)=>e+parseFloat(t.total||t.total_amount||t.amount||0),0);const n=new Map,s=new Date;let a=[];if("week"===I)for(let i=6;i>=0;i--){const e=new Date(s);e.setDate(s.getDate()-i),a.push(e.toISOString().split("T")[0])}else if("month"===I)for(let i=11;i>=0;i--){const e=new Date(s);e.setDate(s.getDate()-7*i);const t=new Date(e);t.setDate(e.getDate()-e.getDay()),a.push(`W${Math.floor(i/4)+1}-${t.getMonth()+1}/${t.getDate()}`)}else if("quarter"===I)for(let i=5;i>=0;i--){const e=new Date(s);e.setMonth(s.getMonth()-i),a.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}else for(let i=11;i>=0;i--){const e=new Date(s);e.setMonth(s.getMonth()-i),a.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}a.forEach(e=>{n.set(e,{revenue:0,revenueByCurrency:{},count:0})}),d.forEach(e=>{const t=new Date(e.createdAt||e.created_at||e.issueDate);let r="";if("week"===I)r=t.toISOString().split("T")[0];else if("month"===I){const e=new Date(t);e.setDate(t.getDate()-t.getDay());const n=Math.floor((s.getTime()-e.getTime())/6048e5);n<12&&(r=`W${Math.floor(n/4)+1}-${e.getMonth()+1}/${e.getDate()}`)}else r=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`;if(r&&n.has(r)){const t=parseFloat(e.total_amount||e.amount||e.total||0),s=e.currency||"MYR",a=n.get(r),i={...a.revenueByCurrency};i[s]=(i[s]||0)+t,n.set(r,{revenue:a.revenue+t,revenueByCurrency:i,count:a.count+1})}}),p=Array.from(n.entries()).map(e=>{let[t,r]=e;return{period:t,revenue:r.revenue,revenueByCurrency:r.revenueByCurrency,invoiceCount:r.count}}).sort((e,t)=>"year"===I?parseInt(e.period)-parseInt(t.period):e.period.localeCompare(t.period))}let h=0;try{const e=await fetch("/api/support-tickets",{headers:t});if(e.ok){const t=await e.json();h=(t.data||t||[]).length}}catch(e){console.error("Error fetching support tickets:",e),h=0}T(p);const x=(s||[]).map(e=>{const t=(o||[]).filter(t=>t.managerId===e.id.toString()||t.admin_id===parseInt(e.id)||parseInt(t.managerId)===e.id||t.managerId===e.id),r=t.map(e=>e.id),n=d.filter(e=>r.includes(e.restaurant_id||e.restaurantId)),s=n.filter(e=>"paid"===e.status||"completed"===e.status),a=s.reduce((e,t)=>e+parseFloat(t.total_amount||t.amount||t.total||"0"),0),i={};s.forEach(e=>{const t=parseFloat(e.total_amount||e.amount||e.total||"0"),r=e.currency||"MYR";i[r]=(i[r]||0)+t});const l=t.length>0?"active":"trial",c=n.filter(e=>"overdue"===e.status),p=0===n.length?70:Math.max(0,Math.min(100,Math.round(100-c.length/Math.max(n.length,1)*100))),u=p>=80?"low":p>=60?"medium":"high";return{id:`mgr-${e.id}`,companyName:e.full_name||e.username||"Manager Company",email:e.email,planType:t.length>5?"enterprise":t.length>2?"professional":"basic",subscriptionStatus:l,restaurantCount:t.length,totalRevenue:a,totalRevenueByCurrency:i,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],healthScore:p,riskLevel:u}});E(x);const g=x.length,m=l.filter(e=>"active"===e.status).length,v=(null===o||void 0===o?void 0:o.length)||x.reduce((e,t)=>e+t.restaurantCount,0),y=new Date,j=y.getMonth(),f=y.getFullYear(),w=d.filter(e=>"completed"===e.status||"paid"===e.status),F=w.filter(e=>{const t=new Date(e.issued_at||e.createdAt);return t.getMonth()===j&&t.getFullYear()===f}),b={};F.forEach(e=>{const t=parseFloat(e.paid_amount||e.total_amount||e.amount||e.total||"0"),r=e.currency||"MYR";b[r]=(b[r]||0)+t});const k=w.filter(e=>new Date(e.issued_at||e.createdAt).getFullYear()===f),S={};k.forEach(e=>{const t=parseFloat(e.paid_amount||e.total_amount||e.amount||e.total||"0"),r=e.currency||"MYR";S[r]=(S[r]||0)+t});const A=cumulativeRevenueByCurrency,D=Object.values(b).reduce((e,t)=>e+t,0),C=g>0?D/g:0,R=l.length,B=R>0?l.filter(e=>"cancelled"===e.status).length/R*100:0,M=g>0?100*(v/g-1):0,$=12*C,Y=m,O=(new Date).getMonth(),N=(new Date).getFullYear(),U=x.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===O&&t.getFullYear()===N}).length,L=o.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===O&&t.getFullYear()===N}).length,P=d.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===O&&t.getFullYear()===N}).length;_({totalManagers:g,activeSubscriptions:m,totalRestaurants:v,monthlyRevenue:b,yearlyRevenue:S,cumulativeRevenue:A,averageRevenuePerUser:C,churnRate:B,growthRate:M,customerLifetimeValue:$,supportTickets:h,systemUptime:99.9,activeUsers:Y,totalTransactions:U+L+P})}catch(e){console.error("Error fetching dashboard data:",e)}})()},[I]),(0,d.jsx)(i.A,{children:(0,d.jsxs)(u,{children:[(0,d.jsx)(h,{children:(0,d.jsx)(g,{children:"Admin Dashboard"})}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(o.Ot,{children:[(0,d.jsxs)(o.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"Monthly Revenue"}),(0,d.jsx)(o.G$,{style:{fontSize:Object.keys(O.monthlyRevenue).length>1?"16px":void 0},children:p(O.monthlyRevenue)})]}),(0,d.jsxs)(o.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"This Year Revenue"}),(0,d.jsx)(o.G$,{style:{fontSize:Object.keys(O.yearlyRevenue).length>1?"16px":void 0},children:p(O.yearlyRevenue)})]}),(0,d.jsxs)(o.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"Cumulative Revenue"}),(0,d.jsx)(o.G$,{style:{fontSize:Object.keys(O.cumulativeRevenue).length>1?"16px":void 0},children:p(O.cumulativeRevenue)})]}),(0,d.jsxs)(o.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)(o.h2,{children:"Total Managers"}),(0,d.jsx)(o.G$,{children:O.totalManagers})]}),(0,d.jsxs)(o.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/subscriptions"),children:[(0,d.jsx)(o.h2,{children:"Active Subscriptions"}),(0,d.jsx)(o.G$,{children:O.activeSubscriptions})]}),(0,d.jsxs)(o.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/restaurants"),children:[(0,d.jsx)(o.h2,{children:"Total Restaurants"}),(0,d.jsx)(o.G$,{children:O.totalRestaurants})]}),(0,d.jsxs)(o.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,d.jsx)(o.h2,{children:"Support Tickets"}),(0,d.jsx)(o.G$,{children:O.supportTickets})]}),(0,d.jsxs)(o.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)(o.h2,{children:"Active Users"}),(0,d.jsx)(o.G$,{children:O.activeUsers})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsxs)(v,{children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,d.jsx)("h3",{children:"Revenue & Growth Analytics"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,d.jsx)("button",{onClick:()=>Y("week"),style:{padding:"6px 12px",background:"week"===I?"#635BFF":"transparent",color:"week"===I?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,d.jsx)("button",{onClick:()=>Y("month"),style:{padding:"6px 12px",background:"month"===I?"#635BFF":"transparent",color:"month"===I?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,d.jsx)("button",{onClick:()=>Y("quarter"),style:{padding:"6px 12px",background:"quarter"===I?"#635BFF":"transparent",color:"quarter"===I?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Quarter"}),(0,d.jsx)("button",{onClick:()=>Y("year"),style:{padding:"6px 12px",background:"year"===I?"#635BFF":"transparent",color:"year"===I?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),(0,d.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:M.length>0?(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:M.map(e=>(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,d.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/Math.max(...M.map(e=>e.revenue))*80)}px`,background:"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px"},title:`${e.period}: ${Object.keys(e.revenueByCurrency).length>0?p(e.revenueByCurrency):(0,l.vv)(0,"RM")}`}),(0,d.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===I?new Date(e.period).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===I?e.period.replace("W1-","").replace("W2-","").replace("W3-","").replace("W4-",""):new Date(e.period+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,d.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:e.revenue>0?Object.entries(e.revenueByCurrency).filter(e=>{let[,t]=e;return t>0}).map(e=>{let[t,r]=e;return`${(0,l.vv)(r/1e3,t).replace(/\.\d+/,"")}K`}).join(" / "):(0,l.vv)(0,"RM")}),(0,d.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.invoiceCount||0," inv"]})]},e.period))}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===I?"Last 7 days":"month"===I?"Last 12 weeks":"quarter"===I?"Last 6 months":"Last 12 months"}),(0,d.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=M.find(e=>e.revenue>0),t=M[M.length-1];if(e&&t&&e.revenue>0){const r=(t.revenue-e.revenue)/e.revenue*100;return r>0?`\u2197 +${r.toFixed(1)}%`:r<0?`\u2198 ${r.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,d.jsxs)("div",{style:{textAlign:"center",color:"#6B7280",paddingTop:"40px"},children:[(0,d.jsxs)("p",{children:["Total Revenue: ",p(O.monthlyRevenue)]}),(0,d.jsxs)("p",{children:["Growth Rate: +",O.growthRate.toFixed(1),"% YoY"]}),(0,d.jsx)("p",{children:"Invoice data loading..."})]})})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)("h3",{children:"System Alerts"}),B.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length>0&&(0,d.jsxs)(j,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)("div",{className:"title",children:"New Manager Registration"}),(0,d.jsxs)("div",{className:"description",children:[B.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length," new manager(s) registered today - Click to view"]})]}),O.supportTickets>0&&(0,d.jsxs)(j,{type:"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,d.jsx)("div",{className:"title",children:"Support Tickets Pending"}),(0,d.jsxs)("div",{className:"description",children:[O.supportTickets," open support ticket(s) require attention - Click to view"]})]}),$.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length>0&&(0,d.jsxs)(j,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)("div",{className:"title",children:"New Revenue Generated"}),(0,d.jsxs)("div",{className:"description",children:[(()=>{const e=$.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}),t={};return e.forEach(e=>{const r=parseFloat(e.total_amount||e.amount||0),n=e.currency||"MYR";t[n]=(t[n]||0)+r}),p(t)})()," ","earned today from ",$.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length," transaction(s) - Click to view details"]})]}),0===B.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length&&0===O.supportTickets&&0===$.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length&&(0,d.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"No new activities today. All systems running smoothly."})]})]}),(0,d.jsxs)(o.j,{children:[(0,d.jsx)(o.oz,{active:"overview"===r,onClick:()=>a("overview"),children:"Manager Overview"}),(0,d.jsx)(o.oz,{active:"performance"===r,onClick:()=>a("performance"),children:"Performance Analytics"}),(0,d.jsx)(o.oz,{active:"health"===r,onClick:()=>a("health"),children:"Account Health"}),(0,d.jsx)(o.oz,{active:"system"===r,onClick:()=>a("system"),children:"System Operations"})]}),"overview"===r&&(0,d.jsx)(f,{children:(0,d.jsxs)(w,{children:[(0,d.jsx)(F,{children:(0,d.jsxs)(S,{children:[(0,d.jsx)(b,{children:"Manager Company"}),(0,d.jsx)(b,{children:"Plan"}),(0,d.jsx)(b,{children:"Status"}),(0,d.jsx)(b,{children:"Restaurants"}),(0,d.jsx)(b,{children:"Monthly Revenue"}),(0,d.jsx)(b,{children:"Health Score"}),(0,d.jsx)(b,{children:"Risk Level"})]})}),(0,d.jsx)(k,{children:B.map(e=>(0,d.jsxs)(S,{children:[(0,d.jsx)(A,{children:(0,d.jsxs)(D,{children:[(0,d.jsx)("div",{className:"name",children:e.companyName}),(0,d.jsx)("div",{className:"email",children:e.email})]})}),(0,d.jsx)(A,{children:(0,d.jsx)(R,{variant:e.planType,children:e.planType})}),(0,d.jsx)(A,{children:(0,d.jsx)(R,{variant:e.subscriptionStatus,children:e.subscriptionStatus})}),(0,d.jsx)(A,{children:e.restaurantCount}),(0,d.jsx)(A,{children:p(e.totalRevenueByCurrency)}),(0,d.jsx)(A,{children:(0,d.jsxs)(C,{score:e.healthScore,children:[(0,d.jsxs)("span",{className:"score",children:[e.healthScore,"%"]}),(0,d.jsx)("div",{className:"bar"})]})}),(0,d.jsx)(A,{children:(0,d.jsx)(R,{variant:e.riskLevel,children:e.riskLevel})})]},e.id))})]})}),"performance"===r&&(0,d.jsxs)(f,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Performance Analytics"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#059669",marginBottom:"10px"},children:"Revenue Insights"}),(0,d.jsxs)("p",{children:["\u2022 Monthly revenue: ",p(O.monthlyRevenue)]}),(0,d.jsxs)("p",{children:["\u2022 Yearly revenue: ",p(O.yearlyRevenue)]}),(0,d.jsxs)("p",{children:["\u2022 ARPU: ",(0,l.vv)(O.averageRevenuePerUser,t.currency)]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#2563EB",marginBottom:"10px"},children:"Business Overview"}),(0,d.jsxs)("p",{children:["\u2022 Total managers: ",O.totalManagers]}),(0,d.jsxs)("p",{children:["\u2022 Active subscriptions: ",O.activeSubscriptions]}),(0,d.jsxs)("p",{children:["\u2022 Open support tickets: ",O.supportTickets]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#7C3AED",marginBottom:"10px"},children:"Restaurant Metrics"}),(0,d.jsxs)("p",{children:["\u2022 Total restaurants: ",O.totalRestaurants]}),(0,d.jsxs)("p",{children:["\u2022 This month activities: ",O.totalTransactions]}),(0,d.jsxs)("p",{children:["\u2022 Cumulative revenue: ",p(O.cumulativeRevenue)]})]})]})]}),"health"===r&&(0,d.jsxs)(f,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Account Health Monitoring"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"Health Score Distribution"}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsxs)("p",{children:["\ud83d\udfe2 Healthy (80-100): ",B.filter(e=>e.healthScore>=80).length," accounts"]}),(0,d.jsxs)("p",{children:["\ud83d\udfe1 At Risk (60-79): ",B.filter(e=>e.healthScore>=60&&e.healthScore<80).length," accounts"]}),(0,d.jsxs)("p",{children:["\ud83d\udd34 Critical (<60): ",B.filter(e=>e.healthScore<60).length," accounts"]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"Risk Factors"}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("p",{children:"\u2022 Payment delays: Monitor automated"}),(0,d.jsx)("p",{children:"\u2022 Usage decline: Real-time alerts"}),(0,d.jsx)("p",{children:"\u2022 Support escalations: Tracked"}),(0,d.jsx)("p",{children:"\u2022 Contract renewals: 45-day alerts"})]})]})]})]}),"system"===r&&(0,d.jsxs)(f,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"System Operations"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#059669"},children:"Invoice Summary"}),(0,d.jsxs)("p",{children:["\u2022 Total invoices: ",$.length]}),(0,d.jsxs)("p",{children:["\u2022 Paid: ",$.filter(e=>"paid"===e.status||"completed"===e.status).length]}),(0,d.jsxs)("p",{children:["\u2022 Pending: ",$.filter(e=>"pending_payment"===e.status).length]}),(0,d.jsxs)("p",{children:["\u2022 Overdue: ",$.filter(e=>"overdue"===e.status).length]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#2563EB"},children:"User Activity"}),(0,d.jsxs)("p",{children:["\u2022 Total managers: ",O.totalManagers]}),(0,d.jsxs)("p",{children:["\u2022 Active users: ",O.activeUsers]}),(0,d.jsxs)("p",{children:["\u2022 Total restaurants: ",O.totalRestaurants]}),(0,d.jsxs)("p",{children:["\u2022 Active subscriptions: ",O.activeSubscriptions]})]})]})]})]})]})})}}}]);