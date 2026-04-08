"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3913],{512:(e,t,r)=>{r.d(t,{x:()=>D,A:()=>I});var n=r(9950),a=r(4752),i=r(5030),s=r(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),x=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=a.Ay.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 1000;
  background: #FFFFFF;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  padding: 20px 24px;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    padding: 20px 16px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.2s ease-out;

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  }
`,p=a.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,u=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #E6EBF1;
  min-width: 120px;

  @media (max-width: 768px) {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid #E6EBF1;
    padding-right: 0;
    margin-right: 0;
    padding-bottom: 12px;
    margin-bottom: 16px;
    min-width: 0;
    gap: 4px;
  }
`,m=a.Ay.button`
  padding: 8px 12px;
  text-align: left;
  background: transparent;
  color: #374151;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s;
  white-space: nowrap;

  &:hover {
    background: #F3F4F6;
  }

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
    padding: 8px 10px;
    background: #F6F9FC;
    border-radius: 8px;
  }
`,g=a.Ay.div``,y=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,j=a.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #6B7280;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F3F4F6;
  }
`,f=a.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,v=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,F=a.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,b=a.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,w=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,R=a.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,A=a.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,C=a.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.12s, color 0.12s;
  position: relative;
  user-select: none;

  color: ${e=>e.$isStart||e.$isEnd?"#FFFFFF":e.$isInRange?"#635BFF":"#374151"};
  background: ${e=>e.$isStart||e.$isEnd?"#635BFF":e.$isInRange?"#F0EEFF":"transparent"};
  font-weight: ${e=>e.$isStart||e.$isEnd||e.$isToday?700:400};

  ${e=>e.$isToday&&!e.$isStart&&!e.$isEnd&&"\n    &::after {\n      content: '';\n      position: absolute;\n      bottom: 4px;\n      width: 4px;\n      height: 4px;\n      border-radius: 50%;\n      background: #635BFF;\n    }\n  "}

  ${e=>e.$isHoverEnd&&!e.$isStart&&!e.$isEnd&&"\n    background: #E8E5FF;\n    color: #635BFF;\n  "}

  &:hover {
    ${e=>!e.$isStart&&!e.$isEnd&&`\n      background: ${e.$isInRange?"#E8E5FF":"#F3F4F6"};\n    `}
  }
`,S=e=>{let{startDate:t,endDate:r,onRangeSelect:a,onClose:S,isOpen:P}=e;const{t:D}=(0,i.Bd)("common"),$=new Date,[E,B]=(0,n.useState)($.getMonth()),[M,z]=(0,n.useState)($.getFullYear()),[I,O]=(0,n.useState)(null),[T,L]=(0,n.useState)(null),[Y,W]=(0,n.useState)(null),[q,_]=(0,n.useState)("start"),N=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&O(l(t)),r&&L(l(r))},[t,r]),(0,n.useEffect)(()=>{P&&_("start")},[P]),(0,n.useEffect)(()=>{const e=e=>{N.current&&!N.current.contains(e.target)&&S()};return P&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[P,S]);const H=(0,n.useCallback)(()=>{0===E?(B(11),z(e=>e-1)):B(e=>e-1)},[E]),K=(0,n.useCallback)(()=>{11===E?(B(0),z(e=>e+1)):B(e=>e+1)},[E]),U=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),i=[];for(let a=0;a<n;a++)i.push(null);for(let a=1;a<=r;a++)i.push(new Date(e,t,a));return(0,s.jsxs)(F,{children:[(0,s.jsx)(b,{children:x(e,t)}),(0,s.jsx)(w,{children:o.map(e=>(0,s.jsx)(R,{children:e},e))}),(0,s.jsx)(k,{children:i.map((e,t)=>{if(!e)return(0,s.jsx)(A,{},`e-${t}`);const{isStart:r,isEnd:n,isInRange:i,isHoverEnd:o}=(e=>{const t=I&&c(e,I),r=T&&c(e,T),n="end"===q&&Y?Y:T;let a=!1;if(I&&n){const[t,r]=I<=n?[I,n]:[n,I];a=((e,t,r)=>{const n=e.getTime();return n>t.getTime()&&n<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:a,isHoverEnd:"end"===q&&Y&&c(e,Y)}})(e),l=c(e,$);return(0,s.jsx)(C,{$isStart:!!r,$isEnd:!!n,$isInRange:i,$isHoverEnd:!!o,$isToday:l,onClick:()=>(e=>{if("start"===q)O(e),L(null),_("end");else{let t=I,r=e;r<t&&([t,r]=[r,t]),O(t),L(r),_("start"),a(d(t),d(r)),setTimeout(S,200)}})(e),onMouseEnter:()=>W(e),onMouseLeave:()=>W(null),children:e.getDate()},e.getTime())})})]})},V=11===E?0:E+1,G=11===E?M+1:M,J=e=>{const t=new Date;let r;const n=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}O(r),L(n),_("start"),a(d(r),d(n)),setTimeout(S,150)};return P?(0,s.jsx)(h,{ref:N,children:(0,s.jsxs)(p,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(m,{onClick:()=>J("this_week"),children:"This Week"}),(0,s.jsx)(m,{onClick:()=>J("this_month"),children:"This Month"}),(0,s.jsx)(m,{onClick:()=>J("this_year"),children:"This Year"})]}),(0,s.jsxs)(g,{children:[(0,s.jsxs)(y,{children:[(0,s.jsx)(j,{onClick:H,"aria-label":"Previous month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,s.jsx)(j,{onClick:K,"aria-label":"Next month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,s.jsxs)(f,{children:[U(M,E),(0,s.jsx)(v,{children:U(G,V)})]})]})]})}):null},P=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,D=(e,t)=>{const r=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[r,n,a]=t.split("-").map(Number);return new Date(r,n-1,a)}catch{return new Date}})(t);let n=new Date(r);const a=new Date(r);switch(e){case"today":break;case"yesterday":n.setDate(r.getDate()-1),a.setDate(r.getDate()-1);break;case"week":n.setDate(r.getDate()-6);break;case"month":n.setDate(r.getDate()-29);break;case"year":n.setDate(r.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:P(n),end:P(a)}},$=a.Ay.div`
  margin-bottom: 24px;
`,E=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,B=a.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"#FFFFFF"};
  color: ${e=>e.active?"#FFFFFF":"#6B7C93"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5A51E6":"#F8FAFC"};
    border-color: ${e=>e.active?"#5A51E6":"#CBD5E1"};
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`,M=a.Ay.div`
  position: relative;
  display: inline-block;
`,z=a.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${e=>e.active?"#F0EEFF":"#FFFFFF"};
  color: ${e=>e.active?"#635BFF":"#374151"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: #635BFF;
    background: #F8F7FF;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
    gap: 6px;
  }
`,I=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:a,onPeriodChange:o,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:x}=(0,i.Bd)("common"),[h,p]=(0,n.useState)(!1),u=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],m={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,s.jsx)($,{children:(0,s.jsxs)(E,{children:[u.map(e=>(0,s.jsx)(B,{active:t===e&&!a,onClick:()=>o(e),children:m[e]},e)),(0,s.jsxs)(M,{children:[(0,s.jsxs)(z,{active:a,onClick:()=>p(!h),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,s.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,s.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,s.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,s.jsx)(S,{isOpen:h,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{d(e,t),p(!1)},onClose:()=>p(!1)})]}),c]})})}},3913:(e,t,r)=>{r.r(t),r.d(t,{default:()=>S});var n=r(9950),a=r(4752),i=r(1367),s=r(4492),o=r(2488),d=r(8409),l=r(4021),c=r(6038),x=r(512),h=r(5030),p=r(4414);const u=a.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,m=a.Ay.div`
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
`,g=a.Ay.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,y=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,j=a.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,f=a.Ay.div`
  font-size: 12px;
  color: ${e=>"up"===e.trend?"#059669":"down"===e.trend?"#DC2626":"#6B7280"};
  font-weight: 500;
`,v=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,F=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,b=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`,w=a.Ay.div`
  height: 300px;
  background: #F8FAFC;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-size: 14px;
  text-align: center;
`,R=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,k=a.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,A=a.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,C=a.Ay.div`
  width: 100%;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${e=>e.percentage}%;
    background: #635BFF;
    transition: width 0.3s ease;
  }
`,S=()=>{var e;const{t:t}=(0,h.Bd)("admin"),{user:r}=(0,i.As)(),a=(0,s.zy)(),[S,P]=(0,n.useState)("all"),[D,$]=(0,n.useState)("month"),[E,B]=(0,n.useState)(()=>(0,x.x)("month")),[M,z]=(0,n.useState)(!1),{defaultCurrency:I}=(0,l.i1)(),[O,T]=(0,n.useState)("RM");(0,n.useEffect)(()=>{I&&T(I)},[I]);const[L]=(0,n.useState)([{id:"rest-001",name:"Nasi Lemak Corner",location:"KLCC"},{id:"rest-002",name:"Char Kuey Teow King",location:"Pavilion KL"},{id:"rest-003",name:"Roti Canai House",location:"Mid Valley"},{id:"rest-004",name:"Satay House",location:"Level 1, Unit 108"},{id:"rest-005",name:"Japanese Sushi Bar",location:"Level 2, Unit 208"},{id:"rest-006",name:"Laksa Paradise",location:"Level 2, Unit 210"}]);(0,n.useEffect)(()=>{const e=new URLSearchParams(a.search),t=e.get("restaurantId")||e.get("restaurant");t&&P(t)},[a]);const[Y,W]=(0,n.useState)({totalRevenue:13130,totalOrders:222,averageOrderValue:59.14,topItems:[{name:"Nasi Lemak Special",quantity:45,revenue:450},{name:"CKT Special",quantity:38,revenue:570},{name:"Roti Canai",quantity:85,revenue:255},{name:"Rendang Set",quantity:32,revenue:480},{name:"Penang CKT",quantity:29,revenue:435}],customerCount:856,staffPerformance:[{name:"Ahmad Rahman",orders:45,efficiency:92},{name:"Siti Nurhaliza",orders:38,efficiency:88},{name:"Raj Kumar",orders:42,efficiency:90},{name:"Li Wei",orders:35,efficiency:85},{name:"Maria Santos",orders:40,efficiency:87}],hourlyData:[{hour:"11AM",orders:25,revenue:680},{hour:"12PM",orders:45,revenue:1280},{hour:"1PM",orders:38,revenue:940},{hour:"2PM",orders:22,revenue:580},{hour:"3PM",orders:18,revenue:420},{hour:"4PM",orders:15,revenue:380},{hour:"5PM",orders:25,revenue:650},{hour:"6PM",orders:42,revenue:1120},{hour:"7PM",orders:35,revenue:890},{hour:"8PM",orders:20,revenue:520}],customerAnalysis:{newCustomers:284,returningCustomers:572,satisfaction:4.7,totalCustomers:856,vipCustomers:128,averageOrdersPerCustomer:4.2,customerRetentionRate:78.5}});(0,n.useEffect)(()=>{const e="all"===S?1:.33;W(t=>({...t,totalRevenue:Math.round(13130*e*(.8+.4*Math.random())),totalOrders:Math.round(222*e*(.8+.4*Math.random()))}))},[S,E.start,E.end]);return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(u,{children:[(0,p.jsx)(m,{children:(0,p.jsx)(g,{children:(0,p.jsx)(y,{children:"all"===S?"Reports Dashboard":`${(null===(e=L.find(e=>e.id===S))||void 0===e?void 0:e.name)||"Restaurant"} Reports`})})}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(o.Qn,{children:[(0,p.jsx)(x.A,{activePeriod:D,dateRange:E,isCustomDateRange:M,onPeriodChange:e=>{$(e),B((0,x.x)(e)),z(!1)},onCalendarRangeSelect:(e,t)=>{z(!0),$("all"),B({start:e,end:t})}}),(0,p.jsxs)(o.Jt,{value:S,onChange:e=>P(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:t("admin:managerReportsPage.allRestaurants")}),L.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]})]}),(0,p.jsxs)(d.MD,{children:[(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:(0,c.vv)(Y.totalRevenue,O)}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.totalRevenue")}),(0,p.jsx)(f,{trend:"up",children:"+18% vs yesterday"})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:Y.totalOrders}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.totalOrders")}),(0,p.jsx)(f,{trend:"up",children:"+12% vs yesterday"})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:(0,c.vv)(Y.averageOrderValue,O)}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.averageOrderValue")}),(0,p.jsx)(f,{trend:"up",children:"+5.3% vs yesterday"})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:Y.customerCount}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.customerCount")}),(0,p.jsx)(f,{trend:"up",children:"+24% vs yesterday"})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:"all"===S?L.length:1}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.activeRestaurants")}),(0,p.jsx)(f,{children:t("admin:managerReportsPage.allOperational")})]})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:t("admin:managerReportsPage.orderAnalysis")}),(0,p.jsxs)(b,{children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:t("admin:managerReportsPage.revenueTrend")}),(0,p.jsxs)(w,{children:["Revenue trend chart will be displayed here",(0,p.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Line chart showing revenue over time"})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:t("admin:managerReportsPage.orderDistribution")}),(0,p.jsxs)(w,{children:["\ud83c\udf70 Order distribution pie chart",(0,p.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Distribution by restaurant/category"})]})]})]})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:t("admin:managerReportsPage.customerAnalysis")}),(0,p.jsxs)(d.MD,{style:{marginBottom:"24px"},children:[(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:Y.customerAnalysis.totalCustomers}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.totalCustomers")}),(0,p.jsx)(f,{trend:"up",children:t("admin:managerReportsPage.activeAcrossAllRestaurants")})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:Y.customerAnalysis.newCustomers}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.newCustomers")}),(0,p.jsx)(f,{trend:"up",children:"+15% vs last period"})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:Y.customerAnalysis.vipCustomers}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.vipCustomers")}),(0,p.jsxs)(f,{trend:"up",children:[Math.round(Y.customerAnalysis.vipCustomers/Y.customerAnalysis.totalCustomers*100),"% of total"]})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:Y.customerAnalysis.averageOrdersPerCustomer}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.avgOrdersPerCustomer")}),(0,p.jsx)(f,{trend:"up",children:"+0.3 vs last period"})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsxs)(d.Os,{children:[Y.customerAnalysis.customerRetentionRate,"%"]}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.customerRetention")}),(0,p.jsx)(f,{trend:"up",children:"+2.1% vs last period"})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsxs)(d.Os,{children:[Y.customerAnalysis.satisfaction,"/5.0"]}),(0,p.jsx)(d.v0,{children:t("admin:managerReportsPage.satisfactionScore")}),(0,p.jsx)(f,{trend:"up",children:"+0.2 vs last period"})]})]}),(0,p.jsxs)(b,{children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:t("admin:managerReportsPage.customerSegmentation")}),(0,p.jsxs)(w,{children:["Customer tier distribution",(0,p.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Bronze, Silver, Gold, VIP breakdown"})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:t("admin:managerReportsPage.customerGrowth")}),(0,p.jsxs)(w,{children:["Customer acquisition trend",(0,p.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"New vs returning customers over time"})]})]})]})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:t("admin:managerReportsPage.popularItems")}),(0,p.jsxs)(R,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)(k,{children:t("admin:managerReportsPage.rank")}),(0,p.jsx)(k,{children:t("admin:managerReportsPage.itemName")}),(0,p.jsx)(k,{children:t("admin:managerReportsPage.quantitySold")}),(0,p.jsx)(k,{children:t("admin:managerReportsPage.revenue")}),(0,p.jsx)(k,{children:t("admin:managerReportsPage.performance")})]})}),(0,p.jsx)("tbody",{children:Y.topItems.map((e,t)=>{var r;const n=(null===(r=Y.topItems[0])||void 0===r?void 0:r.quantity)||1;return(0,p.jsxs)("tr",{children:[(0,p.jsxs)(A,{style:{fontWeight:"600"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,p.jsx)(A,{style:{fontWeight:"600"},children:e.name}),(0,p.jsx)(A,{children:e.quantity}),(0,p.jsx)(A,{children:(0,c.vv)(e.revenue,O)}),(0,p.jsx)(A,{children:(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsx)(C,{percentage:e.quantity/n*100}),(0,p.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.quantity/n*100),"%"]})]})})]},t)})})]})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:t("admin:managerReportsPage.hourlyAnalysis")}),(0,p.jsx)("div",{style:{marginBottom:"20px"},children:(0,p.jsxs)(w,{style:{height:"250px"},children:["Hourly orders and revenue bar chart",(0,p.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Bar chart showing orders and revenue by hour"})]})}),(0,p.jsxs)(R,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)(k,{children:t("admin:managerReportsPage.timeSlot")}),(0,p.jsx)(k,{children:t("admin:managerReportsPage.orders")}),(0,p.jsx)(k,{children:t("admin:managerReportsPage.revenue")}),(0,p.jsx)(k,{children:t("admin:managerReportsPage.avgOrderValue")})]})}),(0,p.jsx)("tbody",{children:Y.hourlyData.map((e,t)=>(0,p.jsxs)("tr",{children:[(0,p.jsx)(A,{style:{fontWeight:"600"},children:e.hour}),(0,p.jsx)(A,{children:e.orders}),(0,p.jsx)(A,{children:(0,c.vv)(e.revenue,O)}),(0,p.jsx)(A,{children:(0,c.vv)(e.revenue/e.orders,O)})]},t))})]})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:t("admin:managerReportsPage.staffPerformance")}),(0,p.jsxs)(R,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)(k,{children:t("admin:managerReportsPage.staffName")}),(0,p.jsx)(k,{children:t("admin:managerReportsPage.ordersHandled")}),(0,p.jsx)(k,{children:t("admin:managerReportsPage.efficiency")}),(0,p.jsx)(k,{children:t("admin:managerReportsPage.performance")})]})}),(0,p.jsx)("tbody",{children:Y.staffPerformance.map((e,t)=>(0,p.jsxs)("tr",{children:[(0,p.jsx)(A,{style:{fontWeight:"600"},children:e.name}),(0,p.jsx)(A,{children:e.orders}),(0,p.jsxs)(A,{children:[e.efficiency,"%"]}),(0,p.jsx)(A,{children:(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsx)(C,{percentage:e.efficiency}),(0,p.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]})]})})}},4021:(e,t,r)=>{r.d(t,{i1:()=>s});var n=r(9950),a=r(1367),i=r(6038);const s=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,n.useState)("RM"),[s]=(0,n.useState)(Object.keys(i.DL)),[o,d]=(0,n.useState)(!0),[l,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let a=n>=0?t[n+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),n=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";r(n)}else r("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),c("Failed to load currency settings"),r("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:o,error:l}}}}]);