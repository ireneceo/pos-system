"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9440],{512:(e,t,i)=>{i.d(t,{x:()=>C,A:()=>T});var n=i(9950),a=i(4752),r=i(5030),o=i(4414);const s=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,i,n]=e.split("-").map(Number);return new Date(t,i-1,n)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),p=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=a.Ay.div`
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
`,g=a.Ay.div`
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
`,h=a.Ay.button`
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
`,m=a.Ay.div``,y=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,v=a.Ay.button`
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
`,F=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,b=a.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,w=a.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,j=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,k=a.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,A=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,$=a.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,S=a.Ay.div`
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
`,D=e=>{let{startDate:t,endDate:i,onRangeSelect:a,onClose:D,isOpen:E}=e;const{t:C}=(0,r.Bd)("common"),B=new Date,[P,_]=(0,n.useState)(B.getMonth()),[H,z]=(0,n.useState)(B.getFullYear()),[T,R]=(0,n.useState)(null),[M,L]=(0,n.useState)(null),[Y,I]=(0,n.useState)(null),[U,W]=(0,n.useState)("start"),N=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&R(l(t)),i&&L(l(i))},[t,i]),(0,n.useEffect)(()=>{E&&W("start")},[E]),(0,n.useEffect)(()=>{const e=e=>{N.current&&!N.current.contains(e.target)&&D()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,D]);const J=(0,n.useCallback)(()=>{0===P?(_(11),z(e=>e-1)):_(e=>e-1)},[P]),O=(0,n.useCallback)(()=>{11===P?(_(0),z(e=>e+1)):_(e=>e+1)},[P]),Z=(e,t)=>{const i=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),r=[];for(let a=0;a<n;a++)r.push(null);for(let a=1;a<=i;a++)r.push(new Date(e,t,a));return(0,o.jsxs)(b,{children:[(0,o.jsx)(w,{children:p(e,t)}),(0,o.jsx)(j,{children:s.map(e=>(0,o.jsx)(k,{children:e},e))}),(0,o.jsx)(A,{children:r.map((e,t)=>{if(!e)return(0,o.jsx)($,{},`e-${t}`);const{isStart:i,isEnd:n,isInRange:r,isHoverEnd:s}=(e=>{const t=T&&c(e,T),i=M&&c(e,M),n="end"===U&&Y?Y:M;let a=!1;if(T&&n){const[t,i]=T<=n?[T,n]:[n,T];a=((e,t,i)=>{const n=e.getTime();return n>t.getTime()&&n<i.getTime()})(e,t,i)}return{isStart:t,isEnd:i,isInRange:a,isHoverEnd:"end"===U&&Y&&c(e,Y)}})(e),l=c(e,B);return(0,o.jsx)(S,{$isStart:!!i,$isEnd:!!n,$isInRange:r,$isHoverEnd:!!s,$isToday:l,onClick:()=>(e=>{if("start"===U)R(e),L(null),W("end");else{let t=T,i=e;i<t&&([t,i]=[i,t]),R(t),L(i),W("start"),a(d(t),d(i)),setTimeout(D,200)}})(e),onMouseEnter:()=>I(e),onMouseLeave:()=>I(null),children:e.getDate()},e.getTime())})})]})},q=11===P?0:P+1,G=11===P?H+1:H,K=e=>{const t=new Date;let i;const n=t;switch(e){case"this_week":i=new Date(t),i.setDate(t.getDate()-t.getDay());break;case"this_month":i=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":i=new Date(t.getFullYear(),0,1);break;default:return}R(i),L(n),W("start"),a(d(i),d(n)),setTimeout(D,150)};return E?(0,o.jsx)(x,{ref:N,children:(0,o.jsxs)(g,{children:[(0,o.jsxs)(u,{children:[(0,o.jsx)(h,{onClick:()=>K("this_week"),children:"This Week"}),(0,o.jsx)(h,{onClick:()=>K("this_month"),children:"This Month"}),(0,o.jsx)(h,{onClick:()=>K("this_year"),children:"This Year"})]}),(0,o.jsxs)(m,{children:[(0,o.jsxs)(y,{children:[(0,o.jsx)(v,{onClick:J,"aria-label":"Previous month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,o.jsx)(v,{onClick:O,"aria-label":"Next month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,o.jsxs)(f,{children:[Z(H,P),(0,o.jsx)(F,{children:Z(G,q)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,C=(e,t)=>{const i=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[i,n,a]=t.split("-").map(Number);return new Date(i,n-1,a)}catch{return new Date}})(t);let n=new Date(i);const a=new Date(i);switch(e){case"today":break;case"yesterday":n.setDate(i.getDate()-1),a.setDate(i.getDate()-1);break;case"week":n.setDate(i.getDate()-6);break;case"month":n.setDate(i.getDate()-29);break;case"year":n.setDate(i.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:E(n),end:E(a)}},B=a.Ay.div`
  margin-bottom: 24px;
`,P=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,_=a.Ay.button`
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
`,H=a.Ay.div`
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
`,T=e=>{let{activePeriod:t,dateRange:i,isCustomDateRange:a,onPeriodChange:s,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:p}=(0,r.Bd)("common"),[x,g]=(0,n.useState)(!1),u=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],h={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,o.jsx)(B,{children:(0,o.jsxs)(P,{children:[u.map(e=>(0,o.jsx)(_,{active:t===e&&!a,onClick:()=>s(e),children:h[e]},e)),(0,o.jsxs)(H,{children:[(0,o.jsxs)(z,{active:a,onClick:()=>g(!x),children:[(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,o.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,o.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,o.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),i.start&&i.end?`${i.start} ~ ${i.end}`:"Custom Range"]}),(0,o.jsx)(D,{isOpen:x,startDate:i.start,endDate:i.end,onRangeSelect:(e,t)=>{d(e,t),g(!1)},onClose:()=>g(!1)})]}),c]})})}},9440:(e,t,i)=>{i.r(t),i.d(t,{default:()=>$});var n=i(9950),a=i(4752),r=i(2853),o=i(3832),s=i(4728),d=i(2488),l=i(512),c=i(1367),p=i(5030),x=i(9955),g=i(4414);const u=a.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,h=a.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,m=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`,y=a.Ay.div`
  flex: 1;
`,v=a.Ay.div`
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 4px;
`,f=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=a.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,b=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,w=(0,a.Ay)(s.Wh)`
  font-size: 11px;
  padding: 4px 10px;
`,j=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`,k=a.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 16px;
`,A=a.Ay.div`
  padding: 60px 24px;
  text-align: center;
  color: #8898AA;
  font-size: 14px;
`,$=()=>{const{t:e}=(0,p.Bd)("admin"),{user:t}=(0,c.As)(),[i,a]=(0,n.useState)([]),[$,S]=(0,n.useState)(!0),[D,E]=(0,n.useState)(1),[C,B]=(0,n.useState)(1),[P,_]=(0,n.useState)(0),[H,z]=(0,n.useState)(""),[T,R]=(0,n.useState)(""),[M,L]=(0,n.useState)(""),[Y,I]=(0,n.useState)("all"),[U,W]=(0,n.useState)(()=>(0,l.x)("all")),[N,J]=(0,n.useState)(!1);(0,n.useEffect)(()=>{O()},[D,H,T,M,U.start,U.end]);const O=async()=>{const e=t,i=(null===e||void 0===e?void 0:e.restaurantId)||(null===e||void 0===e?void 0:e.restaurant_id),n=null===e||void 0===e?void 0:e.id;if(i||n){S(!0);try{const e=new URLSearchParams({page:D.toString(),limit:50..toString()});H&&e.append("entity_type",H),T&&e.append("action_type",T),M&&e.append("user_id",M),U.start&&e.append("start_date",U.start),U.end&&e.append("end_date",U.end);const t=(0,x.c4)(),s=i?`/api/activity-logs/restaurant/${i}`:`/api/activity-logs/user/${n}`,d=await fetch(`${s}?${e}`,{headers:{...t?{Authorization:`Bearer ${t}`}:{}}});if(d.ok){var r,o;const e=await d.json(),t=e.data||e;a(t.logs||[]),B((null===(r=t.pagination)||void 0===r?void 0:r.totalPages)||t.totalPages||1),_((null===(o=t.pagination)||void 0===o?void 0:o.total)||t.totalLogs||0)}else console.error("Failed to fetch activity logs"),a([])}catch(s){console.error("Error fetching activity logs:",s),a([])}finally{S(!1)}}},Z=e=>{const t=new Date(e),i=new Date,n=Math.floor((i.getTime()-t.getTime())/1e3);return n<60?"just now":n<3600?`${Math.floor(n/60)} minutes ago`:n<86400?`${Math.floor(n/3600)} hours ago`:n<604800?`${Math.floor(n/86400)} days ago`:t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},q=e=>{switch(e){case"menu_item":case"category":case"table":default:return"info";case"settings":case"invoice":return"warning";case"staff":case"promotion":return"success";case"order_item":return"error"}},G=e=>{switch(e){case"create":return"success";case"update":default:return"info";case"delete":return"error"}},K=e=>e.charAt(0).toUpperCase()+e.slice(1),Q=H||T||M||"all"!==Y||N;return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(o.mc,{children:[(0,g.jsx)(o.Y9,{children:(0,g.jsx)(o.hE,{children:e("admin:activityHistoryPage.activityHistory")})}),(0,g.jsxs)(o.UC,{children:[(0,g.jsxs)(l.A,{activePeriod:Y,dateRange:U,isCustomDateRange:N,onPeriodChange:e=>{I(e),W((0,l.x)(e)),J(!1),E(1)},onCalendarRangeSelect:(e,t)=>{W({start:e,end:t}),J(!0),E(1)},children:[(0,g.jsxs)(d.Jt,{value:H,onChange:e=>{z(e.target.value),E(1)},children:[(0,g.jsx)("option",{value:"",children:e("admin:activityHistoryPage.allTypes")}),(0,g.jsx)("option",{value:"menu_item",children:e("admin:activityHistoryPage.menuItem")}),(0,g.jsx)("option",{value:"category",children:e("admin:activityHistoryPage.category")}),(0,g.jsx)("option",{value:"settings",children:e("admin:activityHistoryPage.settings")}),(0,g.jsx)("option",{value:"staff",children:e("admin:activityHistoryPage.staff")}),(0,g.jsx)("option",{value:"invoice",children:e("admin:activityHistoryPage.invoice")}),(0,g.jsx)("option",{value:"subscription",children:e("admin:activityHistoryPage.subscription")}),(0,g.jsx)("option",{value:"table",children:e("admin:activityHistoryPage.table")}),(0,g.jsx)("option",{value:"promotion",children:e("admin:activityHistoryPage.promotion")}),(0,g.jsx)("option",{value:"order_item",children:e("admin:activityHistoryPage.orderItem")})]}),(0,g.jsxs)(d.Jt,{value:T,onChange:e=>{R(e.target.value),E(1)},children:[(0,g.jsx)("option",{value:"",children:e("admin:activityHistoryPage.allActions")}),(0,g.jsx)("option",{value:"create",children:e("admin:activityHistoryPage.create")}),(0,g.jsx)("option",{value:"update",children:e("admin:activityHistoryPage.update")}),(0,g.jsx)("option",{value:"delete",children:e("admin:activityHistoryPage.delete")})]}),Q&&(0,g.jsx)(s.SC,{variant:"secondary",size:"small",onClick:()=>{z(""),R(""),L(""),I("all"),W((0,l.x)("all")),J(!1),E(1)},children:"Reset Filters"})]}),$?(0,g.jsx)(A,{children:e("admin:activityHistoryPage.loadingActivityLogs")}):0===i.length?(0,g.jsx)(u,{children:(0,g.jsx)(r.pp,{children:e("admin:activityHistoryPage.noActivityLogsFound")})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(u,{children:i.map(e=>{return(0,g.jsx)(h,{children:(0,g.jsxs)(m,{children:[(0,g.jsxs)(y,{children:[(0,g.jsx)(v,{children:Z(e.created_at)}),(0,g.jsx)(f,{children:e.full_name||e.username}),(0,g.jsx)(F,{children:e.description})]}),(0,g.jsxs)(b,{children:[(0,g.jsx)(w,{status:q(e.entity_type),children:(t=e.entity_type,t.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "))}),(0,g.jsx)(w,{status:G(e.action_type),children:K(e.action_type)})]})]})},e.id);var t})}),(0,g.jsxs)(j,{children:[(0,g.jsx)(s.SC,{variant:"secondary",size:"small",onClick:()=>E(e=>Math.max(1,e-1)),disabled:1===D,children:"Previous"}),(0,g.jsxs)(k,{children:["Page ",D," of ",C," (",P," total logs)"]}),(0,g.jsx)(s.SC,{variant:"secondary",size:"small",onClick:()=>E(e=>Math.min(C,e+1)),disabled:D===C,children:"Next"})]})]})]})]})})}}}]);