"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3201],{2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),a=r(4492);function i(e){const[t,r]=(0,a.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[s,o]=(0,n.useState)(i());return[s,(0,n.useCallback)(e=>{o(e),r({tab:e})},[r])]}},3201:(e,t,r)=>{r.r(t),r.d(t,{default:()=>H});var n=r(9950),a=r(4492),i=r(4752),s=r(8409),o=r(2597),c=r(2653),l=r(6038),d=r(9018),h=r(5030),p=r(4414);const u=e=>"MYR"===e||"RM"===e?"MYR":e,x=e=>{const t={};return Object.entries(e).forEach(e=>{let[r,n]=e;const a=u(r);t[a]=(t[a]||0)+n}),t},m=e=>{const t=x(e),r=Object.entries(t).filter(e=>{let[,t]=e;return t>0});return 0===r.length?(0,l.vv)(0,"MYR"):r.map(e=>{let[t,r]=e;return(0,l.vv)(r,t)}).join(" / ")},g=(e,t)=>x(e)[t]||0,y=(e,t)=>({lines:[{currency:t,amount:x(e)[t]||0}],single:!0}),v=e=>{const t=(new Date).toLocaleDateString("en-CA",{timeZone:e}),[r,n,a]=t.split("-").map(Number);return{year:r,month:n-1,day:a}},f=(e,t)=>{const r=new Date(e);if(isNaN(r.getTime()))return{year:0,month:-1,day:0};const n=r.toLocaleDateString("en-CA",{timeZone:t}),[a,i,s]=n.split("-").map(Number);return{year:a,month:i-1,day:s}},j=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,b=i.Ay.button`
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
`,w=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,F=i.Ay.div`
  font-size: ${e=>e.fontSize||"14px"};
  font-weight: 700;
  color: inherit;
  line-height: 1.3;
  white-space: nowrap;
`,A=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,C=i.Ay.div`
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
`,k=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,D=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,S=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,B=i.Ay.div`
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
`,E=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0 0 16px 0;
    color: #0A2540;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
`,R=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 4px;
  }
`,M=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{switch(e.type){case"error":return"#FEF2F2";case"warning":return"#FFFBEB";case"success":return"#ECFDF5";case"info":return"#EFF6FF";default:return"#F8FAFC"}}};
  border: 1px solid ${e=>{switch(e.type){case"error":return"#FECACA";case"warning":return"#FDE68A";case"success":return"#A7F3D0";case"info":return"#BFDBFE";default:return"#E6EBF1"}}};
  flex-shrink: 0;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`,$=i.Ay.div`
  flex: 1;
  min-width: 0;
`,T=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,z=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,L=i.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,N=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,_=i.Ay.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F6F9FC;

    .icon {
      color: #0A2540;
    }

    .title {
      color: #0A2540;
    }
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    color: #6B7C93;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    color: #425466;
    margin-bottom: 4px;
  }

  .description {
    font-size: 12px;
    color: #8898AA;
  }
`,I=i.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,Y=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,O=i.Ay.thead`
  background: #F8FAFC;
`,U=i.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,G=i.Ay.tbody``,W=i.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,Z=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,P=i.Ay.div`
  .name {
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 4px;
  }

  .email {
    font-size: 13px;
    color: #6B7280;
  }
`,X=i.Ay.div`
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
`,q=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.variant){case"enterprise":return"background: #EDE9FE; color: #5B21B6;";case"professional":return"background: #DBEAFE; color: #1E40AF;";case"basic":default:return"background: #F3F4F6; color: #6B7280;";case"active":case"low":return"background: #ECFDF5; color: #059669;";case"trial":case"medium":return"background: #FEF3C7; color: #D97706;";case"expired":case"high":return"background: #FEE2E2; color: #DC2626;"}}}
`,H=()=>{const{t:e}=(0,h.Bd)("admin"),t=(0,a.Zp)(),{operationSettings:r,siteTimezone:i}=(0,d.Pj)(),[x,H]=(0,c.M)("overview"),[K,V]=(0,n.useState)([]),[Q,J]=(0,n.useState)([]),[ee,te]=(0,n.useState)([]),[re,ne]=(0,n.useState)("month"),[ae,ie]=(0,n.useState)(""),[se,oe]=(0,n.useState)([]),[ce,le]=(0,n.useState)({criticalCount:0,errorCount:0,total:0}),de=(0,n.useMemo)(()=>{try{return(new Date).toLocaleDateString("en-CA",{timeZone:i||"Asia/Kuala_Lumpur"})}catch{return(new Date).toISOString().split("T")[0]}},[i]),[he,pe]=(0,n.useState)({totalManagers:0,activeSubscriptions:0,totalRestaurants:0,monthlyRevenue:{},yearlyRevenue:{},cumulativeRevenue:{},averageRevenuePerUser:0,churnRate:0,growthRate:0,customerLifetimeValue:0,supportTickets:0,systemUptime:99.9,activeUsers:0,totalTransactions:0});return(0,n.useEffect)(()=>{(async()=>{try{const r={"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch("/api/users?role=Manager",{headers:r});if(!n.ok)throw new Error("Failed to fetch users");const a=await n.json(),s=(a.data||a).filter(e=>!e.is_demo&&!e.is_test),o=await fetch("/api/restaurants",{headers:r});if(!o.ok)throw new Error("Failed to fetch restaurants");const c=await o.json(),l=(c.data||c).filter(e=>!e.is_demo&&!e.is_test);let d=[];l&&l.length>0&&(d=l.map(e=>{let t="active";return"active"===e.status?t="active":"inactive"===e.status&&(t="suspended"),{status:t,restaurantId:e.id,restaurantName:e.name}}));let h=[];try{const e=await fetch("/api/currencies/supported",{headers:r});if(e.ok){const t=await e.json();h=(t.data||t||[]).map(e=>u("string"===typeof e?e:e.code))}}catch(e){console.error("Error fetching supported currencies:",e)}0===h.length&&(h=["RM"]),h=Array.from(new Set(h)),oe(h);try{const e=await fetch("/api/system-logs/alerts-summary",{headers:r});if(e.ok){const t=await e.json();t.success&&le(t.data)}}catch(e){console.error("Error fetching system log alerts:",e)}const p=await fetch("/api/invoices",{headers:r});let x=[],m=[];const g={};if(p.ok){const e=await p.json();if(x=e.data||e,te(x),!ae){const e=((e,t)=>{const r={};e.forEach(e=>{if("draft"!==e.status&&"cancelled"!==e.status){const t=u(e.currency||"MYR");r[t]=(r[t]||0)+1}});let n=t[0]||"MYR",a=0;return t.forEach(e=>{(r[e]||0)>a&&(a=r[e]||0,n=e)}),n})(x,h);ie(e)}x.filter(e=>"completed"===e.status||"paid"===e.status).forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||0),r=e.currency||"MYR";g[r]=(g[r]||0)+t});const t=new Map,r=new Date;let n=[];if("week"===re)for(let a=6;a>=0;a--){const e=new Date(r);e.setDate(r.getDate()-a),n.push(e.toISOString().split("T")[0])}else if("month"===re)for(let a=11;a>=0;a--){const e=new Date(r);e.setDate(r.getDate()-7*a);const t=new Date(e);t.setDate(e.getDate()-e.getDay()),n.push(`W${Math.floor(a/4)+1}-${t.getMonth()+1}/${t.getDate()}`)}else if("quarter"===re)for(let a=5;a>=0;a--){const e=new Date(r);e.setMonth(r.getMonth()-a),n.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}else for(let a=11;a>=0;a--){const e=new Date(r);e.setMonth(r.getMonth()-a),n.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}n.forEach(e=>{t.set(e,{revenue:0,revenueByCurrency:{},count:0})}),x.forEach(e=>{const n=new Date(e.issueDate||e.createdAt||e.created_at);let a="";if("week"===re)a=n.toISOString().split("T")[0];else if("month"===re){const e=new Date(n);e.setDate(n.getDate()-n.getDay());const t=Math.floor((r.getTime()-e.getTime())/6048e5);t<12&&(a=`W${Math.floor(t/4)+1}-${e.getMonth()+1}/${e.getDate()}`)}else a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;if(a&&t.has(a)){const r=parseFloat(e.total_amount||e.amount||e.total||0),n=e.currency||"MYR",i=t.get(a),s={...i.revenueByCurrency};s[n]=(s[n]||0)+r,t.set(a,{revenue:i.revenue+r,revenueByCurrency:s,count:i.count+1})}}),m=Array.from(t.entries()).map(e=>{let[t,r]=e;return{period:t,revenue:r.revenue,revenueByCurrency:r.revenueByCurrency,invoiceCount:r.count}}).sort((e,t)=>"year"===re?parseInt(e.period)-parseInt(t.period):e.period.localeCompare(t.period))}let y=0;try{const e=await fetch("/api/support-tickets",{headers:r});if(e.ok){const t=await e.json();y=(t.data||t||[]).length}}catch(t){console.error("Error fetching support tickets:",t),y=0}J(m);const j=(s||[]).map(e=>{const t=(l||[]).filter(t=>t.managerId===e.id.toString()||t.admin_id===parseInt(e.id)||parseInt(t.managerId)===e.id||t.managerId===e.id),r=t.map(e=>e.id),n=x.filter(e=>r.includes(e.restaurant_id||e.restaurantId)),a=n.filter(e=>"paid"===e.status||"completed"===e.status),i=a.reduce((e,t)=>e+parseFloat(t.total_amount||t.amount||t.total||"0"),0),s={};a.forEach(e=>{const t=parseFloat(e.total_amount||e.amount||e.total||"0"),r=e.currency||"MYR";s[r]=(s[r]||0)+t});const o=t.length>0?"active":"trial",c=n.filter(e=>"overdue"===e.status),d=0===n.length?70:Math.max(0,Math.min(100,Math.round(100-c.length/Math.max(n.length,1)*100))),h=d>=80?"low":d>=60?"medium":"high";return{id:`mgr-${e.id}`,companyName:e.full_name||e.username||"Manager Company",email:e.email,planType:t.length>5?"enterprise":t.length>2?"professional":"basic",subscriptionStatus:o,restaurantCount:t.length,totalRevenue:i,totalRevenueByCurrency:s,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],healthScore:d,riskLevel:h}});V(j);const b=j.length,w=d.filter(e=>"active"===e.status).length,F=(null===l||void 0===l?void 0:l.length)||j.reduce((e,t)=>e+t.restaurantCount,0),A=i||"Asia/Kuala_Lumpur",{year:C,month:k}=v(A),D=x.filter(e=>"completed"===e.status||"paid"===e.status),S=D.filter(e=>{const t=e.issueDate||e.issued_at||e.createdAt,{year:r,month:n}=f(t,A);return n===k&&r===C}),B={};S.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";B[r]=(B[r]||0)+t});const E=D.filter(e=>{const t=e.issueDate||e.issued_at||e.createdAt,{year:r}=f(t,A);return r===C}),R={};E.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";R[r]=(R[r]||0)+t});const M=g,$=Object.values(B).reduce((e,t)=>e+t,0),T=b>0?$/b:0,z=d.length,L=z>0?d.filter(e=>"cancelled"===e.status).length/z*100:0,N=b>0?100*(F/b-1):0,_=12*T,I=w,{year:Y,month:O}=v(A),U=j.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=f(e.createdAt,A);return r===O&&t===Y}).length,G=l.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=f(e.createdAt,A);return r===O&&t===Y}).length,W=x.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=f(e.createdAt,A);return r===O&&t===Y}).length;pe({totalManagers:b,activeSubscriptions:w,totalRestaurants:F,monthlyRevenue:B,yearlyRevenue:R,cumulativeRevenue:M,averageRevenuePerUser:T,churnRate:L,growthRate:N,customerLifetimeValue:_,supportTickets:y,systemUptime:99.9,activeUsers:I,totalTransactions:U+G+W})}catch(t){console.error("Error fetching dashboard data:",t)}})()},[re,i]),(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(A,{children:[(0,p.jsx)(C,{children:(0,p.jsx)(D,{children:e("admin:adminDashboard.adminDashboard")})}),(0,p.jsxs)(k,{children:[se.length>0&&(0,p.jsxs)(j,{children:[(0,p.jsx)("span",{style:{fontSize:"13px",color:"#6B7C93",fontWeight:500,marginRight:"4px"},children:"Currency:"}),se.map(e=>(0,p.jsx)(b,{active:ae===e,onClick:()=>ie(e),children:e},e))]}),(0,p.jsxs)(s.Ot,{children:[(0,p.jsxs)(s.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/report"),children:[(0,p.jsx)(s.h2,{children:e("admin:adminDashboard.monthlyRevenue")}),(0,p.jsx)(s.G$,{children:(()=>{const e=y(he.monthlyRevenue,ae);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,p.jsx)(w,{children:e.lines.map(t=>(0,p.jsx)(F,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,p.jsxs)(s.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/report"),children:[(0,p.jsx)(s.h2,{children:e("admin:adminDashboard.thisYearRevenue")}),(0,p.jsx)(s.G$,{children:(()=>{const e=y(he.yearlyRevenue,ae);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,p.jsx)(w,{children:e.lines.map(t=>(0,p.jsx)(F,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,p.jsxs)(s.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/report"),children:[(0,p.jsx)(s.h2,{children:e("admin:adminDashboard.cumulativeRevenue")}),(0,p.jsx)(s.G$,{children:(()=>{const e=y(he.cumulativeRevenue,ae);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,p.jsx)(w,{children:e.lines.map(t=>(0,p.jsx)(F,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,p.jsxs)(s.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/managers"),children:[(0,p.jsx)(s.h2,{children:e("admin:adminDashboard.totalManagers")}),(0,p.jsx)(s.G$,{children:he.totalManagers})]}),(0,p.jsxs)(s.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/subscriptions"),children:[(0,p.jsx)(s.h2,{children:e("admin:adminDashboard.activeSubscriptions")}),(0,p.jsx)(s.G$,{children:he.activeSubscriptions})]}),(0,p.jsxs)(s.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/restaurants"),children:[(0,p.jsx)(s.h2,{children:e("admin:adminDashboard.totalRestaurants")}),(0,p.jsx)(s.G$,{children:he.totalRestaurants})]}),(0,p.jsxs)(s.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/support"),children:[(0,p.jsx)(s.h2,{children:e("admin:adminDashboard.supportTickets")}),(0,p.jsx)(s.G$,{children:he.supportTickets})]}),(0,p.jsxs)(s.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/managers"),children:[(0,p.jsx)(s.h2,{children:e("admin:adminDashboard.activeUsers")}),(0,p.jsx)(s.G$,{children:he.activeUsers})]})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(B,{children:[(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,p.jsx)("h3",{children:e("admin:adminDashboard.revenueGrowthAnalytics")}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,p.jsx)("button",{onClick:()=>ne("week"),style:{padding:"6px 12px",background:"week"===re?"#635BFF":"transparent",color:"week"===re?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,p.jsx)("button",{onClick:()=>ne("month"),style:{padding:"6px 12px",background:"month"===re?"#635BFF":"transparent",color:"month"===re?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,p.jsx)("button",{onClick:()=>ne("quarter"),style:{padding:"6px 12px",background:"quarter"===re?"#635BFF":"transparent",color:"quarter"===re?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Quarter"}),(0,p.jsx)("button",{onClick:()=>ne("year"),style:{padding:"6px 12px",background:"year"===re?"#635BFF":"transparent",color:"year"===re?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),(0,p.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:Q.length>0?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:Q.map(e=>{const t=g(e.revenueByCurrency,ae),r=Math.max(...Q.map(e=>g(e.revenueByCurrency,ae)));return(0,p.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,p.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${r>0?Math.max(4,t/r*80):4}px`,background:t>0?"#635BFF":"#E5E7EB",borderRadius:"4px 4px 0 0",marginBottom:"8px"},title:`${e.period}: ${(0,l.vv)(t,ae)}`}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===re?new Date(e.period).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===re?e.period.replace("W1-","").replace("W2-","").replace("W3-","").replace("W4-",""):new Date(e.period+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,p.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:t>0?(0,l.vv)(t,ae):"-"}),(0,p.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.invoiceCount||0," inv"]})]},e.period)})}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["week"===re?"Last 7 days":"month"===re?"Last 12 weeks":"quarter"===re?"Last 6 months":"Last 12 months",(0,p.jsxs)("span",{style:{marginLeft:"8px",color:"#635BFF",fontWeight:600},children:["(",ae,")"]})]}),(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=e=>g(e.revenueByCurrency,ae),t=Q.find(t=>e(t)>0),r=Q[Q.length-1];if(t&&r&&e(t)>0){const n=(e(r)-e(t))/e(t)*100;return n>0?`+${n.toFixed(1)}%`:n<0?`${n.toFixed(1)}%`:"0%"}return"No change"})()})]})]}):(0,p.jsxs)("div",{style:{textAlign:"center",color:"#6B7280",paddingTop:"40px"},children:[(0,p.jsxs)("p",{children:["Total Revenue: ",m(he.monthlyRevenue)]}),(0,p.jsxs)("p",{children:["Growth Rate: +",he.growthRate.toFixed(1),"% YoY"]}),(0,p.jsx)("p",{children:e("admin:adminDashboard.invoiceDataLoading")})]})})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)("h3",{children:e("admin:adminDashboard.notifications")}),(0,p.jsxs)(R,{children:[ce.total>0&&(0,p.jsx)(M,{type:ce.criticalCount>0?"error":"warning",onClick:()=>t("/pos/admin/logs"),children:(0,p.jsxs)($,{children:[(0,p.jsx)(T,{type:ce.criticalCount>0?"error":"warning",children:ce.criticalCount>0?"Critical System Alerts":"System Error Alerts"}),(0,p.jsxs)(z,{children:[ce.criticalCount>0&&`${ce.criticalCount} critical`,ce.criticalCount>0&&ce.errorCount>0&&", ",ce.errorCount>0&&`${ce.errorCount} error`," ","log(s) in the last 24 hours - Click to investigate"]})]})}),K.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===de}catch{return!1}}).length>0&&(0,p.jsx)(M,{type:"info",onClick:()=>t("/pos/admin/managers"),children:(0,p.jsxs)($,{children:[(0,p.jsx)(T,{type:"info",children:e("admin:adminDashboard.newManagerRegistration")}),(0,p.jsxs)(z,{children:[K.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===de}catch{return!1}}).length," new manager(s) registered today - Click to view"]})]})}),he.supportTickets>0&&(0,p.jsx)(M,{type:"warning",onClick:()=>t("/pos/admin/support"),children:(0,p.jsxs)($,{children:[(0,p.jsx)(T,{type:"warning",children:e("admin:adminDashboard.supportTicketsPending")}),(0,p.jsxs)(z,{children:[he.supportTickets," open support ticket(s) require attention - Click to view"]})]})}),ee.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===de}catch{return!1}}).length>0&&(0,p.jsx)(M,{type:"info",onClick:()=>t("/pos/admin/report"),children:(0,p.jsxs)($,{children:[(0,p.jsx)(T,{type:"info",children:e("admin:adminDashboard.newRevenueGenerated")}),(0,p.jsxs)(z,{children:[(()=>{const e=ee.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===de}catch{return!1}}),t={};return e.forEach(e=>{const r=parseFloat(e.total_amount||e.amount||0),n=e.currency||"MYR";t[n]=(t[n]||0)+r}),m(t)})()," ","earned today from ",ee.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===de}catch{return!1}}).length," transaction(s) - Click to view details"]})]})}),0===ce.total&&0===K.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===de}catch{return!1}}).length&&0===he.supportTickets&&0===ee.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===de}catch{return!1}}).length&&(0,p.jsx)(M,{type:"success",onClick:()=>{},children:(0,p.jsxs)($,{children:[(0,p.jsx)(T,{type:"success",children:e("admin:adminDashboard.allClear")}),(0,p.jsx)(z,{children:e("admin:adminDashboard.noNewActivitiesAllSystemsRunningSmoothly")})]})})]})]})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)("h3",{children:e("admin:adminDashboard.quickActions")}),(0,p.jsxs)(N,{children:[(0,p.jsxs)(_,{onClick:()=>t("/pos/admin/restaurants"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25d0"}),(0,p.jsx)("div",{className:"title",children:e("admin:adminDashboard.restaurants")}),(0,p.jsx)("div",{className:"description",children:e("admin:adminDashboard.manageAllRestaurants")})]}),(0,p.jsxs)(_,{onClick:()=>t("/pos/admin/invoices"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25a6"}),(0,p.jsx)("div",{className:"title",children:e("admin:adminDashboard.invoices")}),(0,p.jsx)("div",{className:"description",children:e("admin:adminDashboard.invoiceManagement")})]}),(0,p.jsxs)(_,{onClick:()=>t("/pos/admin/notices"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25c8"}),(0,p.jsx)("div",{className:"title",children:e("admin:adminDashboard.notices")}),(0,p.jsx)("div",{className:"description",children:e("admin:adminDashboard.communicationHub")})]}),(0,p.jsxs)(_,{onClick:()=>t("/pos/admin/report"),children:[(0,p.jsx)("div",{className:"icon",children:"\u2630"}),(0,p.jsx)("div",{className:"title",children:e("admin:adminDashboard.report")}),(0,p.jsx)("div",{className:"description",children:e("admin:adminDashboard.platformAnalytics")})]})]})]}),(0,p.jsxs)(o.tU,{children:[(0,p.jsx)(o.oz,{active:"overview"===x,onClick:()=>H("overview"),children:"Manager Overview"}),(0,p.jsx)(o.oz,{active:"performance"===x,onClick:()=>H("performance"),children:"Performance Analytics"}),(0,p.jsx)(o.oz,{active:"health"===x,onClick:()=>H("health"),children:"Account Health"}),(0,p.jsx)(o.oz,{active:"system"===x,onClick:()=>H("system"),children:"System Operations"})]}),"overview"===x&&(0,p.jsx)(I,{children:(0,p.jsxs)(Y,{children:[(0,p.jsx)(O,{children:(0,p.jsxs)(W,{children:[(0,p.jsx)(U,{children:e("admin:adminDashboard.managerCompany")}),(0,p.jsx)(U,{children:e("admin:adminDashboard.plan")}),(0,p.jsx)(U,{children:e("admin:adminDashboard.status")}),(0,p.jsx)(U,{children:e("admin:adminDashboard.restaurants")}),(0,p.jsx)(U,{children:e("admin:adminDashboard.monthlyRevenue")}),(0,p.jsx)(U,{children:e("admin:adminDashboard.healthScore")}),(0,p.jsx)(U,{children:e("admin:adminDashboard.riskLevel")})]})}),(0,p.jsx)(G,{children:K.map(e=>(0,p.jsxs)(W,{children:[(0,p.jsx)(Z,{children:(0,p.jsxs)(P,{children:[(0,p.jsx)("div",{className:"name",children:e.companyName}),(0,p.jsx)("div",{className:"email",children:e.email})]})}),(0,p.jsx)(Z,{children:(0,p.jsx)(q,{variant:e.planType,children:e.planType})}),(0,p.jsx)(Z,{children:(0,p.jsx)(q,{variant:e.subscriptionStatus,children:e.subscriptionStatus})}),(0,p.jsx)(Z,{children:e.restaurantCount}),(0,p.jsx)(Z,{children:m(e.totalRevenueByCurrency)}),(0,p.jsx)(Z,{children:(0,p.jsxs)(X,{score:e.healthScore,children:[(0,p.jsxs)("span",{className:"score",children:[e.healthScore,"%"]}),(0,p.jsx)("div",{className:"bar"})]})}),(0,p.jsx)(Z,{children:(0,p.jsx)(q,{variant:e.riskLevel,children:e.riskLevel})})]},e.id))})]})}),"performance"===x&&(0,p.jsxs)(I,{style:{padding:"32px"},children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:e("admin:adminDashboard.performanceAnalytics")}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsxs)("h4",{style:{color:"#059669",marginBottom:"10px"},children:["Revenue Insights (",ae,")"]}),(0,p.jsxs)("p",{children:["\u2022 Monthly revenue: ",(0,l.vv)(g(he.monthlyRevenue,ae),ae)]}),(0,p.jsxs)("p",{children:["\u2022 Yearly revenue: ",(0,l.vv)(g(he.yearlyRevenue,ae),ae)]}),(0,p.jsxs)("p",{children:["\u2022 ARPU: ",(0,l.vv)(he.averageRevenuePerUser,r.currency)]})]}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#2563EB",marginBottom:"10px"},children:e("admin:adminDashboard.businessOverview")}),(0,p.jsxs)("p",{children:["\u2022 Total managers: ",he.totalManagers]}),(0,p.jsxs)("p",{children:["\u2022 Active subscriptions: ",he.activeSubscriptions]}),(0,p.jsxs)("p",{children:["\u2022 Open support tickets: ",he.supportTickets]})]}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#7C3AED",marginBottom:"10px"},children:e("admin:adminDashboard.restaurantMetrics")}),(0,p.jsxs)("p",{children:["\u2022 Total restaurants: ",he.totalRestaurants]}),(0,p.jsxs)("p",{children:["\u2022 This month activities: ",he.totalTransactions]}),(0,p.jsxs)("p",{children:["\u2022 Cumulative revenue: ",(0,l.vv)(g(he.cumulativeRevenue,ae),ae)]})]})]})]}),"health"===x&&(0,p.jsxs)(I,{style:{padding:"32px"},children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:e("admin:adminDashboard.accountHealthMonitoring")}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{children:e("admin:adminDashboard.healthScoreDistribution")}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsxs)("p",{children:["\ud83d\udfe2 Healthy (80-100): ",K.filter(e=>e.healthScore>=80).length," accounts"]}),(0,p.jsxs)("p",{children:["\ud83d\udfe1 At Risk (60-79): ",K.filter(e=>e.healthScore>=60&&e.healthScore<80).length," accounts"]}),(0,p.jsxs)("p",{children:["\ud83d\udd34 Critical (<60): ",K.filter(e=>e.healthScore<60).length," accounts"]})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{children:e("admin:adminDashboard.riskFactors")}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("p",{children:"\u2022 Payment delays: Monitor automated"}),(0,p.jsx)("p",{children:"\u2022 Usage decline: Real-time alerts"}),(0,p.jsx)("p",{children:"\u2022 Support escalations: Tracked"}),(0,p.jsx)("p",{children:"\u2022 Contract renewals: 45-day alerts"})]})]})]})]}),"system"===x&&(0,p.jsxs)(I,{style:{padding:"32px"},children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:e("admin:adminDashboard.systemOperations")}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},children:[(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#059669"},children:e("admin:adminDashboard.invoiceSummary")}),(0,p.jsxs)("p",{children:["\u2022 Total invoices: ",ee.length]}),(0,p.jsxs)("p",{children:["\u2022 Paid: ",ee.filter(e=>"paid"===e.status||"completed"===e.status).length]}),(0,p.jsxs)("p",{children:["\u2022 Pending: ",ee.filter(e=>"pending_payment"===e.status).length]}),(0,p.jsxs)("p",{children:["\u2022 Overdue: ",ee.filter(e=>"overdue"===e.status).length]})]}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#2563EB"},children:e("admin:adminDashboard.userActivity")}),(0,p.jsxs)("p",{children:["\u2022 Total managers: ",he.totalManagers]}),(0,p.jsxs)("p",{children:["\u2022 Active users: ",he.activeUsers]}),(0,p.jsxs)("p",{children:["\u2022 Total restaurants: ",he.totalRestaurants]}),(0,p.jsxs)("p",{children:["\u2022 Active subscriptions: ",he.activeSubscriptions]})]})]})]})]})]})})}}}]);