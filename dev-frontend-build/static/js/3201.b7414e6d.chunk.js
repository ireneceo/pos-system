"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3201],{3201:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Y});var n=r(9950),i=r(4492),s=r(4752),a=r(3310),o=r(2674),c=r(6038),l=r(9018),d=r(4414);const p=e=>"MYR"===e||"RM"===e?"RM":e,h=e=>{const t={};return Object.entries(e).forEach(e=>{let[r,n]=e;const i=p(r);t[i]=(t[i]||0)+n}),t},u=e=>{const t=h(e),r=Object.entries(t).filter(e=>{let[,t]=e;return t>0});return 0===r.length?(0,c.vv)(0,"RM"):r.map(e=>{let[t,r]=e;return(0,c.vv)(r,t)}).join(" / ")},x=(e,t)=>h(e)[t]||0,g=(e,t)=>({lines:[{currency:t,amount:h(e)[t]||0}],single:!0}),m=e=>{const t=(new Date).toLocaleDateString("en-CA",{timeZone:e}),[r,n,i]=t.split("-").map(Number);return{year:r,month:n-1,day:i}},y=(e,t)=>{const r=new Date(e);if(isNaN(r.getTime()))return{year:0,month:-1,day:0};const n=r.toLocaleDateString("en-CA",{timeZone:t}),[i,s,a]=n.split("-").map(Number);return{year:i,month:s-1,day:a}},v=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,f=s.Ay.button`
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7C93"};
  font-size: 13px;
  font-weight: ${e=>e.active?"600":"500"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: ${e=>e.active?"white":"#635BFF"};
  }
`,j=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,w=s.Ay.div`
  font-size: ${e=>e.fontSize||"14px"};
  font-weight: 700;
  color: inherit;
  line-height: 1.3;
  white-space: nowrap;
`,F=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,b=s.Ay.div`
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
`,A=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,k=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,S=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,C=s.Ay.div`
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
`,R=s.Ay.div`
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
`,B=s.Ay.div`
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
`,D=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,E=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,M=s.Ay.thead`
  background: #F8FAFC;
`,T=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,$=s.Ay.tbody``,z=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,L=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,I=s.Ay.div`
  .name {
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 4px;
  }

  .email {
    font-size: 13px;
    color: #6B7280;
  }
`,N=s.Ay.div`
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
`,_=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.variant){case"enterprise":return"background: #EDE9FE; color: #5B21B6;";case"professional":return"background: #DBEAFE; color: #1E40AF;";case"basic":default:return"background: #F3F4F6; color: #6B7280;";case"active":case"low":return"background: #ECFDF5; color: #059669;";case"trial":case"medium":return"background: #FEF3C7; color: #D97706;";case"expired":case"high":return"background: #FEE2E2; color: #DC2626;"}}}
`,Y=()=>{const e=(0,i.Zp)(),{operationSettings:t,siteTimezone:r}=(0,l.Pj)(),[s,h]=(0,n.useState)("overview"),[Y,O]=(0,n.useState)([]),[U,P]=(0,n.useState)([]),[G,W]=(0,n.useState)([]),[Z,X]=(0,n.useState)("month"),[q,H]=(0,n.useState)(""),[K,V]=(0,n.useState)([]),Q=(0,n.useMemo)(()=>{try{return(new Date).toLocaleDateString("en-CA",{timeZone:r||"Asia/Kuala_Lumpur"})}catch{return(new Date).toISOString().split("T")[0]}},[r]),[J,ee]=(0,n.useState)({totalManagers:0,activeSubscriptions:0,totalRestaurants:0,monthlyRevenue:{},yearlyRevenue:{},cumulativeRevenue:{},averageRevenuePerUser:0,churnRate:0,growthRate:0,customerLifetimeValue:0,supportTickets:0,systemUptime:99.9,activeUsers:0,totalTransactions:0});return(0,n.useEffect)(()=>{(async()=>{try{const n={"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},i=await fetch("/api/users?role=Manager",{headers:n});if(!i.ok)throw new Error("Failed to fetch users");const s=await i.json(),a=s.data||s,o=await fetch("/api/restaurants",{headers:n});if(!o.ok)throw new Error("Failed to fetch restaurants");const c=await o.json(),l=c.data||c;let d=[];l&&l.length>0&&(d=l.map(e=>{let t="active";return"active"===e.status?t="active":"inactive"===e.status&&(t="suspended"),{status:t,restaurantId:e.id,restaurantName:e.name}}));let h=[];try{const e=await fetch("/api/currencies/supported",{headers:n});if(e.ok){const t=await e.json();h=(t.data||t||[]).map(e=>p("string"===typeof e?e:e.code))}}catch(e){console.error("Error fetching supported currencies:",e)}0===h.length&&(h=["RM"]),h=[...new Set(h)],V(h);const u=await fetch("/api/invoices",{headers:n});let x=[],g=[],v=0;if(u.ok){const e=await u.json();if(x=e.data||e,W(x),!q){const e=((e,t)=>{const r={};e.forEach(e=>{if("completed"===e.status||"paid"===e.status){const t=p(e.currency||"MYR"),n=parseFloat(e.total||e.total_amount||e.amount||"0");r[t]=(r[t]||0)+n}});let n=t[0]||"RM",i=0;return t.forEach(e=>{(r[e]||0)>i&&(i=r[e]||0,n=e)}),n})(x,h);H(e)}const t=x.filter(e=>"completed"===e.status||"paid"===e.status),r={};t.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||0),n=e.currency||"MYR";r[n]=(r[n]||0)+t}),v=t.reduce((e,t)=>e+parseFloat(t.total||t.total_amount||t.amount||0),0);const n=new Map,i=new Date;let s=[];if("week"===Z)for(let a=6;a>=0;a--){const e=new Date(i);e.setDate(i.getDate()-a),s.push(e.toISOString().split("T")[0])}else if("month"===Z)for(let a=11;a>=0;a--){const e=new Date(i);e.setDate(i.getDate()-7*a);const t=new Date(e);t.setDate(e.getDate()-e.getDay()),s.push(`W${Math.floor(a/4)+1}-${t.getMonth()+1}/${t.getDate()}`)}else if("quarter"===Z)for(let a=5;a>=0;a--){const e=new Date(i);e.setMonth(i.getMonth()-a),s.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}else for(let a=11;a>=0;a--){const e=new Date(i);e.setMonth(i.getMonth()-a),s.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}s.forEach(e=>{n.set(e,{revenue:0,revenueByCurrency:{},count:0})}),x.forEach(e=>{const t=new Date(e.issueDate||e.createdAt||e.created_at);let r="";if("week"===Z)r=t.toISOString().split("T")[0];else if("month"===Z){const e=new Date(t);e.setDate(t.getDate()-t.getDay());const n=Math.floor((i.getTime()-e.getTime())/6048e5);n<12&&(r=`W${Math.floor(n/4)+1}-${e.getMonth()+1}/${e.getDate()}`)}else r=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`;if(r&&n.has(r)){const t=parseFloat(e.total_amount||e.amount||e.total||0),i=e.currency||"MYR",s=n.get(r),a={...s.revenueByCurrency};a[i]=(a[i]||0)+t,n.set(r,{revenue:s.revenue+t,revenueByCurrency:a,count:s.count+1})}}),g=Array.from(n.entries()).map(e=>{let[t,r]=e;return{period:t,revenue:r.revenue,revenueByCurrency:r.revenueByCurrency,invoiceCount:r.count}}).sort((e,t)=>"year"===Z?parseInt(e.period)-parseInt(t.period):e.period.localeCompare(t.period))}let f=0;try{const e=await fetch("/api/support-tickets",{headers:n});if(e.ok){const t=await e.json();f=(t.data||t||[]).length}}catch(t){console.error("Error fetching support tickets:",t),f=0}P(g);const j=(a||[]).map(e=>{const t=(l||[]).filter(t=>t.managerId===e.id.toString()||t.admin_id===parseInt(e.id)||parseInt(t.managerId)===e.id||t.managerId===e.id),r=t.map(e=>e.id),n=x.filter(e=>r.includes(e.restaurant_id||e.restaurantId)),i=n.filter(e=>"paid"===e.status||"completed"===e.status),s=i.reduce((e,t)=>e+parseFloat(t.total_amount||t.amount||t.total||"0"),0),a={};i.forEach(e=>{const t=parseFloat(e.total_amount||e.amount||e.total||"0"),r=e.currency||"MYR";a[r]=(a[r]||0)+t});const o=t.length>0?"active":"trial",c=n.filter(e=>"overdue"===e.status),d=0===n.length?70:Math.max(0,Math.min(100,Math.round(100-c.length/Math.max(n.length,1)*100))),p=d>=80?"low":d>=60?"medium":"high";return{id:`mgr-${e.id}`,companyName:e.full_name||e.username||"Manager Company",email:e.email,planType:t.length>5?"enterprise":t.length>2?"professional":"basic",subscriptionStatus:o,restaurantCount:t.length,totalRevenue:s,totalRevenueByCurrency:a,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],healthScore:d,riskLevel:p}});O(j);const w=j.length,F=d.filter(e=>"active"===e.status).length,b=(null===l||void 0===l?void 0:l.length)||j.reduce((e,t)=>e+t.restaurantCount,0),A=r||"Asia/Kuala_Lumpur",{year:k,month:S}=m(A),C=x.filter(e=>"completed"===e.status||"paid"===e.status),R=C.filter(e=>{const t=e.issueDate||e.issued_at||e.createdAt,{year:r,month:n}=y(t,A);return n===S&&r===k}),B={};R.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";B[r]=(B[r]||0)+t});const D=C.filter(e=>{const t=e.issueDate||e.issued_at||e.createdAt,{year:r}=y(t,A);return r===k}),E={};D.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";E[r]=(E[r]||0)+t});const M=cumulativeRevenueByCurrency,T=Object.values(B).reduce((e,t)=>e+t,0),$=w>0?T/w:0,z=d.length,L=z>0?d.filter(e=>"cancelled"===e.status).length/z*100:0,I=w>0?100*(b/w-1):0,N=12*$,_=F,{year:Y,month:U}=m(A),G=j.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=y(e.createdAt,A);return r===U&&t===Y}).length,X=l.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=y(e.createdAt,A);return r===U&&t===Y}).length,K=x.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=y(e.createdAt,A);return r===U&&t===Y}).length;ee({totalManagers:w,activeSubscriptions:F,totalRestaurants:b,monthlyRevenue:B,yearlyRevenue:E,cumulativeRevenue:M,averageRevenuePerUser:$,churnRate:L,growthRate:I,customerLifetimeValue:N,supportTickets:f,systemUptime:99.9,activeUsers:_,totalTransactions:G+X+K})}catch(t){console.error("Error fetching dashboard data:",t)}})()},[Z,r]),(0,d.jsx)(a.A,{children:(0,d.jsxs)(F,{children:[(0,d.jsx)(b,{children:(0,d.jsx)(k,{children:"Admin Dashboard"})}),(0,d.jsxs)(A,{children:[K.length>0&&(0,d.jsxs)(v,{children:[(0,d.jsx)("span",{style:{fontSize:"13px",color:"#6B7C93",fontWeight:500,marginRight:"4px"},children:"Currency:"}),K.map(e=>(0,d.jsx)(f,{active:q===e,onClick:()=>H(e),children:e},e))]}),(0,d.jsxs)(o.Ot,{children:[(0,d.jsxs)(o.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"Monthly Revenue"}),(0,d.jsx)(o.G$,{children:(()=>{const e=g(J.monthlyRevenue,q);return e.single?(0,c.vv)(e.lines[0].amount,e.lines[0].currency):(0,d.jsx)(j,{children:e.lines.map(t=>(0,d.jsx)(w,{fontSize:e.lines.length>2?"14px":"16px",children:(0,c.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,d.jsxs)(o.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"This Year Revenue"}),(0,d.jsx)(o.G$,{children:(()=>{const e=g(J.yearlyRevenue,q);return e.single?(0,c.vv)(e.lines[0].amount,e.lines[0].currency):(0,d.jsx)(j,{children:e.lines.map(t=>(0,d.jsx)(w,{fontSize:e.lines.length>2?"14px":"16px",children:(0,c.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,d.jsxs)(o.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"Cumulative Revenue"}),(0,d.jsx)(o.G$,{children:(()=>{const e=g(J.cumulativeRevenue,q);return e.single?(0,c.vv)(e.lines[0].amount,e.lines[0].currency):(0,d.jsx)(j,{children:e.lines.map(t=>(0,d.jsx)(w,{fontSize:e.lines.length>2?"14px":"16px",children:(0,c.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,d.jsxs)(o.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)(o.h2,{children:"Total Managers"}),(0,d.jsx)(o.G$,{children:J.totalManagers})]}),(0,d.jsxs)(o.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/subscriptions"),children:[(0,d.jsx)(o.h2,{children:"Active Subscriptions"}),(0,d.jsx)(o.G$,{children:J.activeSubscriptions})]}),(0,d.jsxs)(o.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/restaurants"),children:[(0,d.jsx)(o.h2,{children:"Total Restaurants"}),(0,d.jsx)(o.G$,{children:J.totalRestaurants})]}),(0,d.jsxs)(o.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,d.jsx)(o.h2,{children:"Support Tickets"}),(0,d.jsx)(o.G$,{children:J.supportTickets})]}),(0,d.jsxs)(o.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)(o.h2,{children:"Active Users"}),(0,d.jsx)(o.G$,{children:J.activeUsers})]})]}),(0,d.jsxs)(S,{children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,d.jsx)("h3",{children:"Revenue & Growth Analytics"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,d.jsx)("button",{onClick:()=>X("week"),style:{padding:"6px 12px",background:"week"===Z?"#635BFF":"transparent",color:"week"===Z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,d.jsx)("button",{onClick:()=>X("month"),style:{padding:"6px 12px",background:"month"===Z?"#635BFF":"transparent",color:"month"===Z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,d.jsx)("button",{onClick:()=>X("quarter"),style:{padding:"6px 12px",background:"quarter"===Z?"#635BFF":"transparent",color:"quarter"===Z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Quarter"}),(0,d.jsx)("button",{onClick:()=>X("year"),style:{padding:"6px 12px",background:"year"===Z?"#635BFF":"transparent",color:"year"===Z?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),(0,d.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:U.length>0?(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:U.map(e=>{const t=x(e.revenueByCurrency,q),r=Math.max(...U.map(e=>x(e.revenueByCurrency,q)));return(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,d.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${r>0?Math.max(4,t/r*80):4}px`,background:t>0?"#635BFF":"#E5E7EB",borderRadius:"4px 4px 0 0",marginBottom:"8px"},title:`${e.period}: ${(0,c.vv)(t,q)}`}),(0,d.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===Z?new Date(e.period).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===Z?e.period.replace("W1-","").replace("W2-","").replace("W3-","").replace("W4-",""):new Date(e.period+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,d.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:t>0?(0,c.vv)(t,q):"-"}),(0,d.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.invoiceCount||0," inv"]})]},e.period)})}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,d.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["week"===Z?"Last 7 days":"month"===Z?"Last 12 weeks":"quarter"===Z?"Last 6 months":"Last 12 months",(0,d.jsxs)("span",{style:{marginLeft:"8px",color:"#635BFF",fontWeight:600},children:["(",q,")"]})]}),(0,d.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=e=>x(e.revenueByCurrency,q),t=U.find(t=>e(t)>0),r=U[U.length-1];if(t&&r&&e(t)>0){const n=(e(r)-e(t))/e(t)*100;return n>0?`+${n.toFixed(1)}%`:n<0?`${n.toFixed(1)}%`:"0%"}return"No change"})()})]})]}):(0,d.jsxs)("div",{style:{textAlign:"center",color:"#6B7280",paddingTop:"40px"},children:[(0,d.jsxs)("p",{children:["Total Revenue: ",u(J.monthlyRevenue)]}),(0,d.jsxs)("p",{children:["Growth Rate: +",J.growthRate.toFixed(1),"% YoY"]}),(0,d.jsx)("p",{children:"Invoice data loading..."})]})})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)("h3",{children:"System Alerts"}),Y.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===Q}catch{return!1}}).length>0&&(0,d.jsxs)(B,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)("div",{className:"title",children:"New Manager Registration"}),(0,d.jsxs)("div",{className:"description",children:[Y.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===Q}catch{return!1}}).length," new manager(s) registered today - Click to view"]})]}),J.supportTickets>0&&(0,d.jsxs)(B,{type:"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,d.jsx)("div",{className:"title",children:"Support Tickets Pending"}),(0,d.jsxs)("div",{className:"description",children:[J.supportTickets," open support ticket(s) require attention - Click to view"]})]}),G.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===Q}catch{return!1}}).length>0&&(0,d.jsxs)(B,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)("div",{className:"title",children:"New Revenue Generated"}),(0,d.jsxs)("div",{className:"description",children:[(()=>{const e=G.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===Q}catch{return!1}}),t={};return e.forEach(e=>{const r=parseFloat(e.total_amount||e.amount||0),n=e.currency||"MYR";t[n]=(t[n]||0)+r}),u(t)})()," ","earned today from ",G.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===Q}catch{return!1}}).length," transaction(s) - Click to view details"]})]}),0===Y.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===Q}catch{return!1}}).length&&0===J.supportTickets&&0===G.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===Q}catch{return!1}}).length&&(0,d.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"No new activities today. All systems running smoothly."})]})]}),(0,d.jsxs)(o.j,{children:[(0,d.jsx)(o.oz,{active:"overview"===s,onClick:()=>h("overview"),children:"Manager Overview"}),(0,d.jsx)(o.oz,{active:"performance"===s,onClick:()=>h("performance"),children:"Performance Analytics"}),(0,d.jsx)(o.oz,{active:"health"===s,onClick:()=>h("health"),children:"Account Health"}),(0,d.jsx)(o.oz,{active:"system"===s,onClick:()=>h("system"),children:"System Operations"})]}),"overview"===s&&(0,d.jsx)(D,{children:(0,d.jsxs)(E,{children:[(0,d.jsx)(M,{children:(0,d.jsxs)(z,{children:[(0,d.jsx)(T,{children:"Manager Company"}),(0,d.jsx)(T,{children:"Plan"}),(0,d.jsx)(T,{children:"Status"}),(0,d.jsx)(T,{children:"Restaurants"}),(0,d.jsx)(T,{children:"Monthly Revenue"}),(0,d.jsx)(T,{children:"Health Score"}),(0,d.jsx)(T,{children:"Risk Level"})]})}),(0,d.jsx)($,{children:Y.map(e=>(0,d.jsxs)(z,{children:[(0,d.jsx)(L,{children:(0,d.jsxs)(I,{children:[(0,d.jsx)("div",{className:"name",children:e.companyName}),(0,d.jsx)("div",{className:"email",children:e.email})]})}),(0,d.jsx)(L,{children:(0,d.jsx)(_,{variant:e.planType,children:e.planType})}),(0,d.jsx)(L,{children:(0,d.jsx)(_,{variant:e.subscriptionStatus,children:e.subscriptionStatus})}),(0,d.jsx)(L,{children:e.restaurantCount}),(0,d.jsx)(L,{children:u(e.totalRevenueByCurrency)}),(0,d.jsx)(L,{children:(0,d.jsxs)(N,{score:e.healthScore,children:[(0,d.jsxs)("span",{className:"score",children:[e.healthScore,"%"]}),(0,d.jsx)("div",{className:"bar"})]})}),(0,d.jsx)(L,{children:(0,d.jsx)(_,{variant:e.riskLevel,children:e.riskLevel})})]},e.id))})]})}),"performance"===s&&(0,d.jsxs)(D,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Performance Analytics"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsxs)("h4",{style:{color:"#059669",marginBottom:"10px"},children:["Revenue Insights (",q,")"]}),(0,d.jsxs)("p",{children:["\u2022 Monthly revenue: ",(0,c.vv)(x(J.monthlyRevenue,q),q)]}),(0,d.jsxs)("p",{children:["\u2022 Yearly revenue: ",(0,c.vv)(x(J.yearlyRevenue,q),q)]}),(0,d.jsxs)("p",{children:["\u2022 ARPU: ",(0,c.vv)(J.averageRevenuePerUser,t.currency)]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#2563EB",marginBottom:"10px"},children:"Business Overview"}),(0,d.jsxs)("p",{children:["\u2022 Total managers: ",J.totalManagers]}),(0,d.jsxs)("p",{children:["\u2022 Active subscriptions: ",J.activeSubscriptions]}),(0,d.jsxs)("p",{children:["\u2022 Open support tickets: ",J.supportTickets]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#7C3AED",marginBottom:"10px"},children:"Restaurant Metrics"}),(0,d.jsxs)("p",{children:["\u2022 Total restaurants: ",J.totalRestaurants]}),(0,d.jsxs)("p",{children:["\u2022 This month activities: ",J.totalTransactions]}),(0,d.jsxs)("p",{children:["\u2022 Cumulative revenue: ",(0,c.vv)(x(J.cumulativeRevenue,q),q)]})]})]})]}),"health"===s&&(0,d.jsxs)(D,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Account Health Monitoring"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"Health Score Distribution"}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsxs)("p",{children:["\ud83d\udfe2 Healthy (80-100): ",Y.filter(e=>e.healthScore>=80).length," accounts"]}),(0,d.jsxs)("p",{children:["\ud83d\udfe1 At Risk (60-79): ",Y.filter(e=>e.healthScore>=60&&e.healthScore<80).length," accounts"]}),(0,d.jsxs)("p",{children:["\ud83d\udd34 Critical (<60): ",Y.filter(e=>e.healthScore<60).length," accounts"]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"Risk Factors"}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("p",{children:"\u2022 Payment delays: Monitor automated"}),(0,d.jsx)("p",{children:"\u2022 Usage decline: Real-time alerts"}),(0,d.jsx)("p",{children:"\u2022 Support escalations: Tracked"}),(0,d.jsx)("p",{children:"\u2022 Contract renewals: 45-day alerts"})]})]})]})]}),"system"===s&&(0,d.jsxs)(D,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"System Operations"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#059669"},children:"Invoice Summary"}),(0,d.jsxs)("p",{children:["\u2022 Total invoices: ",G.length]}),(0,d.jsxs)("p",{children:["\u2022 Paid: ",G.filter(e=>"paid"===e.status||"completed"===e.status).length]}),(0,d.jsxs)("p",{children:["\u2022 Pending: ",G.filter(e=>"pending_payment"===e.status).length]}),(0,d.jsxs)("p",{children:["\u2022 Overdue: ",G.filter(e=>"overdue"===e.status).length]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#2563EB"},children:"User Activity"}),(0,d.jsxs)("p",{children:["\u2022 Total managers: ",J.totalManagers]}),(0,d.jsxs)("p",{children:["\u2022 Active users: ",J.activeUsers]}),(0,d.jsxs)("p",{children:["\u2022 Total restaurants: ",J.totalRestaurants]}),(0,d.jsxs)("p",{children:["\u2022 Active subscriptions: ",J.activeSubscriptions]})]})]})]})]})]})})}}}]);