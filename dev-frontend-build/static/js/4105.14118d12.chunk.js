"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4105],{512:(e,t,r)=>{r.d(t,{x:()=>P,A:()=>O});var n=r(9950),o=r(4752),s=r(5030),a=r(4414);const i=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),h=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=o.Ay.div`
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
`,p=o.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,g=o.Ay.div`
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
`,u=o.Ay.button`
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
`,m=o.Ay.div``,j=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,w=o.Ay.button`
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
`,f=o.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,y=o.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,v=o.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,F=o.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,b=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,k=o.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,S=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,A=o.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,R=o.Ay.div`
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
`,C=e=>{let{startDate:t,endDate:r,onRangeSelect:o,onClose:C,isOpen:E}=e;const{t:P}=(0,s.Bd)("common"),D=new Date,[B,$]=(0,n.useState)(D.getMonth()),[M,I]=(0,n.useState)(D.getFullYear()),[O,_]=(0,n.useState)(null),[z,T]=(0,n.useState)(null),[L,W]=(0,n.useState)(null),[Y,H]=(0,n.useState)("start"),N=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&_(l(t)),r&&T(l(r))},[t,r]),(0,n.useEffect)(()=>{E&&H("start")},[E]),(0,n.useEffect)(()=>{const e=e=>{N.current&&!N.current.contains(e.target)&&C()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,C]);const U=(0,n.useCallback)(()=>{0===B?($(11),I(e=>e-1)):$(e=>e-1)},[B]),K=(0,n.useCallback)(()=>{11===B?($(0),I(e=>e+1)):$(e=>e+1)},[B]),J=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),s=[];for(let o=0;o<n;o++)s.push(null);for(let o=1;o<=r;o++)s.push(new Date(e,t,o));return(0,a.jsxs)(v,{children:[(0,a.jsx)(F,{children:h(e,t)}),(0,a.jsx)(b,{children:i.map(e=>(0,a.jsx)(k,{children:e},e))}),(0,a.jsx)(S,{children:s.map((e,t)=>{if(!e)return(0,a.jsx)(A,{},`e-${t}`);const{isStart:r,isEnd:n,isInRange:s,isHoverEnd:i}=(e=>{const t=O&&c(e,O),r=z&&c(e,z),n="end"===Y&&L?L:z;let o=!1;if(O&&n){const[t,r]=O<=n?[O,n]:[n,O];o=((e,t,r)=>{const n=e.getTime();return n>t.getTime()&&n<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:o,isHoverEnd:"end"===Y&&L&&c(e,L)}})(e),l=c(e,D);return(0,a.jsx)(R,{$isStart:!!r,$isEnd:!!n,$isInRange:s,$isHoverEnd:!!i,$isToday:l,onClick:()=>(e=>{if("start"===Y)_(e),T(null),H("end");else{let t=O,r=e;r<t&&([t,r]=[r,t]),_(t),T(r),H("start"),o(d(t),d(r)),setTimeout(C,200)}})(e),onMouseEnter:()=>W(e),onMouseLeave:()=>W(null),children:e.getDate()},e.getTime())})})]})},V=11===B?0:B+1,q=11===B?M+1:M,Z=e=>{const t=new Date;let r;const n=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}_(r),T(n),H("start"),o(d(r),d(n)),setTimeout(C,150)};return E?(0,a.jsx)(x,{ref:N,children:(0,a.jsxs)(p,{children:[(0,a.jsxs)(g,{children:[(0,a.jsx)(u,{onClick:()=>Z("this_week"),children:"This Week"}),(0,a.jsx)(u,{onClick:()=>Z("this_month"),children:"This Month"}),(0,a.jsx)(u,{onClick:()=>Z("this_year"),children:"This Year"})]}),(0,a.jsxs)(m,{children:[(0,a.jsxs)(j,{children:[(0,a.jsx)(w,{onClick:U,"aria-label":"Previous month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,a.jsx)(w,{onClick:K,"aria-label":"Next month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,a.jsxs)(f,{children:[J(M,B),(0,a.jsx)(y,{children:J(q,V)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,P=(e,t)=>{const r=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[r,n,o]=t.split("-").map(Number);return new Date(r,n-1,o)}catch{return new Date}})(t);let n=new Date(r);const o=new Date(r);switch(e){case"today":break;case"yesterday":n.setDate(r.getDate()-1),o.setDate(r.getDate()-1);break;case"week":n.setDate(r.getDate()-6);break;case"month":n.setDate(r.getDate()-29);break;case"year":n.setDate(r.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:E(n),end:E(o)}},D=o.Ay.div`
  margin-bottom: 24px;
`,B=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,$=o.Ay.button`
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
`,M=o.Ay.div`
  position: relative;
  display: inline-block;
`,I=o.Ay.button`
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
`,O=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:o,onPeriodChange:i,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:h}=(0,s.Bd)("common"),[x,p]=(0,n.useState)(!1),g=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],u={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,a.jsx)(D,{children:(0,a.jsxs)(B,{children:[g.map(e=>(0,a.jsx)($,{active:t===e&&!o,onClick:()=>i(e),children:u[e]},e)),(0,a.jsxs)(M,{children:[(0,a.jsxs)(I,{active:o,onClick:()=>p(!x),children:[(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,a.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,a.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,a.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,a.jsx)(C,{isOpen:x,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{d(e,t),p(!1)},onClose:()=>p(!1)})]}),c]})})}},2653:(e,t,r)=>{r.d(t,{M:()=>s});var n=r(9950),o=r(4492);function s(e){const[t,r]=(0,o.ok)(),s=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,i]=(0,n.useState)(s());return[a,(0,n.useCallback)(e=>{i(e),r({tab:e})},[r])]}},4021:(e,t,r)=>{r.d(t,{i1:()=>a});var n=r(9950),o=r(1367),s=r(6038);const a=()=>{const{user:e}=(0,o.As)(),[t,r]=(0,n.useState)("RM"),[a]=(0,n.useState)(Object.keys(s.DL)),[i,d]=(0,n.useState)(!0),[l,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let o=n>=0?t[n+1]:null;if(!o&&null!==e&&void 0!==e&&e.restaurant_id&&(o=e.restaurant_id.toString()),!o)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${o}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),n=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";r(n)}else r("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),r("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:i,error:l}}},4105:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Q});var n=r(9950),o=r(4752),s=r(4492),a=r(8409),i=r(2597),d=r(2653),l=r(1367),c=r(6038),h=r(4021),x=r(512),p=r(1095),g=r(2847),u=r(3245),m=r(158),j=r(3440),w=r(2174),f=r(4915),y=r(7621),v=r(5297),F=r(2528),b=r(294),k=r(3588),S=r(4414);const A=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,R=o.Ay.div`
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
`,C=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,E=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,P=a.MD,D=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,B=o.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,$=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,M=o.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,I=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,O=o.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,_=o.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,z=o.Ay.div`
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
`,T=o.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,L=o.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,W=o.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,Y=o.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,H=o.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }
`,N=o.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${e=>e.show?"block":"none"};
`,U=o.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,K=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,J=o.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,V=o.Ay.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #6B7280;
  }
`,q=o.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,Z=o.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 12px;
  background: ${e=>1===e.rank?"linear-gradient(135deg, #FFD700, #FFA500)":2===e.rank?"linear-gradient(135deg, #C0C0C0, #A0A0A0)":3===e.rank?"linear-gradient(135deg, #CD7F32, #8B4513)":"#F3F4F6"};
  color: ${e=>e.rank<=3?"white":"#6B7280"};
`,G=["#635BFF","#6FCF97","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],Q=()=>{var e,t;const{t:r}=useTranslation("owner"),{user:o}=(0,l.As)(),[Q,X]=(0,s.ok)(),{defaultCurrency:ee}=(0,h.i1)(),[te,re]=(0,n.useState)("MYR");(0,n.useEffect)(()=>{ee&&re(ee)},[ee]);const[ne,oe]=(0,d.M)("ranking"),[se,ae]=(0,n.useState)("month"),[ie,de]=(0,n.useState)(()=>(0,x.x)("month")),[le,ce]=(0,n.useState)(!1),[he,xe]=(0,n.useState)([]),[pe,ge]=(0,n.useState)("all"),[ue,me]=(0,n.useState)(""),[je,we]=(0,n.useState)(!1),[fe,ye]=(0,n.useState)([]),[ve,Fe]=(0,n.useState)([]),[be,ke]=(0,n.useState)(!0),[Se]=(0,n.useState)([]),[Ae,Re]=(0,n.useState)([]),[Ce,Ee]=(0,n.useState)([]),[Pe,De]=(0,n.useState)(new Set),[Be,$e]=(0,n.useState)(new Set);function Me(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[Ie]=(0,n.useState)(()=>Q.get("restaurantId")),[Oe]=(0,n.useState)(()=>Q.get("restaurantName"));(0,n.useEffect)(()=>{X(e=>("all"!==pe?e.set("restaurantId",pe):e.delete("restaurantId"),e),{replace:!0})},[X,pe]),(0,n.useEffect)(()=>{o&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();if(e.success){const t=e.data.map(e=>{var t;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name,status:e.status}});if(xe(t),ye(t.slice(0,10)),Ie){const e=t.find(e=>e.id===Ie);e&&(ge(e.id),me(e.name))}else if(Oe){const e=decodeURIComponent(Oe),r=t.find(t=>t.name===e);r&&(ge(r.id),me(r.name))}}}}catch(e){console.error("Error fetching restaurants:",e)}})()},[o,Ie,Oe]),(0,n.useEffect)(()=>{(async()=>{if(0!==he.length){ke(!0);try{const r=localStorage.getItem("auth_token"),n=he.map(e=>e.id);let o="/api/orders?limit=5000";"all"!==pe&&(o+=`&restaurant_id=${pe}`);const s=await fetch(o,{headers:{Authorization:`Bearer ${r}`}});if(s.ok){const e=await s.json();let t=e.data||e||[];t=t.filter(e=>{var t;return n.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),Fe(t)}const a=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${r}`}});if(a.ok){var e,t;const r=await a.json();null!==(e=r.data)&&void 0!==e&&e.items&&Re(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&Ee(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{ke(!1)}}else ke(!1)})()},[pe,he]);const _e=()=>{ge("all"),me(""),we(!1)},ze=(0,n.useMemo)(()=>{if(!ve||0===ve.length)return[];const e=new Date(ie.start);e.setHours(0,0,0,0);const t=new Date(ie.end);return t.setHours(23,59,59,999),ve.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const o=new Date(n),s=o>=e&&o<=t,a="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return s&&a})},[ve,ie.start,ie.end]),Te=(0,n.useMemo)(()=>{if(0===ze.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===se){const r={};return ze.forEach(n=>{const o=e(n).getHours(),s=12===o?"12PM":o>12?o-12+"PM":`${o}AM`;r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===se){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,o=[];for(let e=6;e>=0;e--){const t=new Date(n);t.setDate(t.getDate()-e),o.push(t)}const s={};return ze.forEach(r=>{const n=Me(e(r));s[n]=(s[n]||0)+t(r)}),o.map(e=>{const t=Me(e);return{date:r[e.getDay()],sales:Math.round(s[t]||0)}})}if("month"===se){const r={};return ze.forEach(n=>{const o=e(n).getDate().toString();r[o]=(r[o]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return ze.forEach(o=>{const s=r[e(o).getMonth()];n[s]=(n[s]||0)+t(o)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[ze,se]),Le=(0,n.useMemo)(()=>{if(0===ze.length)return[{name:"No Data",value:100,sales:0}];const e={};Ce.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};Ae.forEach(r=>{if(r.id){const n=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=n}});const r={};let n=0;ze.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var o,s,a;const i=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=i;const d=(null===(o=e.menuItem)||void 0===o||null===(s=o.id)||void 0===s?void 0:s.toString())||(null===(a=e.product_id)||void 0===a?void 0:a.toString()),l=d&&t[d]||"Other";r[l]=(r[l]||0)+i})});const o=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return o.length>0?o:[{name:"No Data",value:100,sales:0}]},[ze,Ae,Ce]),We=(0,n.useMemo)(()=>{var e;if(0===ze.length)return[];const t={};Ce.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};Ae.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};ze.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,o,s;const a=e.menu_name||e.name||"Unknown",i=(null===(t=e.menuItem)||void 0===t||null===(o=t.id)||void 0===o?void 0:o.toString())||(null===(s=e.product_id)||void 0===s?void 0:s.toString()),d=i?r[i]||"Other":e.category||"Other";n[a]||(n[a]={category:d,price:parseFloat(e.price||0),orders:0,revenue:0});const l=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[a].orders+=l,n[a].revenue+=c*l})});const o=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),s=(null===(e=o[0])||void 0===e?void 0:e.orders)||1;return o.forEach(e=>{e.performance=Math.round(e.orders/s*100)}),o},[ze,Ae,Ce]),Ye=(0,n.useMemo)(()=>{if(0===ze.length)return[];const e={};return ze.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[ze]),He=(0,n.useMemo)(()=>{if(0===ze.length)return{};const e={};return ze.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),o=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,s=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[o]||(e[n].months[o]={month:o,revenue:0,orders:0,days:{}}),e[n].months[o].days[s]||(e[n].months[o].days[s]={day:s,revenue:0,orders:0});const a=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=a,e[n].orders+=1,e[n].months[o].revenue+=a,e[n].months[o].orders+=1,e[n].months[o].days[s].revenue+=a,e[n].months[o].days[s].orders+=1}),e},[ze]),Ne=(0,n.useMemo)(()=>{if(0===ze.length)return[];const e={};return ze.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(ze.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[ze]),Ue=(0,n.useMemo)(()=>{if(0===ve.length)return{restaurants:[]};const e=new Date(ie.start);e.setHours(0,0,0,0);const t=new Date(ie.end);t.setHours(23,59,59,999);const r=ve.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const o=new Date(n);return o>=e&&o<=t&&"completed"===r.status}),n={};r.forEach(e=>{var t;const r=null===(t=e.restaurant_id)||void 0===t?void 0:t.toString();if(!r)return;const o=he.find(e=>e.id===r),s=(null===o||void 0===o?void 0:o.name)||e.restaurant_name||"Unknown";n[r]||(n[r]={name:s,orders:0,revenue:0}),n[r].orders+=1,n[r].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(e)});return{restaurants:Object.entries(n).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue)}},[ve,he,ie]),Ke=()=>{const e=new Date(ie.start),t=new Date(ie.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=Ke();if(e<=31){const e=new Set(Object.keys(He)),t=new Set;Object.keys(He).forEach(e=>{Object.keys(He[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),De(e),$e(t)}else e<=365?(De(new Set(Object.keys(He))),$e(new Set)):(De(new Set),$e(new Set))},[ie.start,ie.end,He]);const Je=e=>{ae(e),ce(!1),de((0,x.x)(e))},Ve=(e,t)=>{ce(!0),ae("all"),de({start:e,end:t})},qe=e=>(0,c.vv)(e,te),Ze=()=>(0,S.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",gap:"16px",alignItems:"flex-start",padding:"24px 0",marginBottom:"24px"},children:[(0,S.jsxs)(Y,{children:[(0,S.jsx)(H,{type:"text",placeholder:"All Restaurants",value:ue,onChange:e=>(e=>{if(me(e),we(!0),e.length<1)return void ye(he.slice(0,10));const t=he.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);ye(t)})(e.target.value),onFocus:()=>{we(!0),ye(he.slice(0,10))},onBlur:()=>setTimeout(()=>we(!1),200)}),"all"!==pe&&ue&&(0,S.jsx)(V,{onClick:_e,children:"\xd7"}),(0,S.jsxs)(N,{show:je,children:[(0,S.jsxs)(U,{onClick:()=>{ge("all"),me(""),we(!1)},children:[(0,S.jsx)(K,{children:r("owner:ownerReportsPage.allRestaurants")}),(0,S.jsx)(J,{children:r("owner:ownerReportsPage.showAllRestaurantData")})]}),fe.map(e=>(0,S.jsxs)(U,{onClick:()=>(e=>{ge(e.id),me(e.name),we(!1)})(e),children:[(0,S.jsx)(K,{children:e.name}),(0,S.jsx)(J,{children:e.status||"active"})]},e.id))]})]}),(0,S.jsx)("div",{style:{flex:1},children:(0,S.jsx)(x.A,{activePeriod:se,dateRange:ie,isCustomDateRange:le,onPeriodChange:Je,onCalendarRangeSelect:Ve})})]});return(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)(A,{children:[(0,S.jsx)(R,{children:(0,S.jsx)(C,{children:r("owner:ownerReportsPage.reports")})}),(0,S.jsxs)(E,{children:[(0,S.jsxs)(i.tU,{children:[(0,S.jsx)(i.oz,{active:"ranking"===ne,onClick:()=>oe("ranking"),children:r("owner:ownerReportsPage.salesRanking")}),(0,S.jsx)(i.oz,{active:"sales"===ne,onClick:()=>oe("sales"),children:r("owner:ownerReportsPage.salesReport")}),(0,S.jsx)(i.oz,{active:"details"===ne,onClick:()=>oe("details"),children:r("owner:ownerReportsPage.salesDetails")}),(0,S.jsx)(i.oz,{active:"menu"===ne,onClick:()=>oe("menu"),children:r("owner:ownerReportsPage.menuAnalysis")}),(0,S.jsx)(i.oz,{active:"customers"===ne,onClick:()=>oe("customers"),children:r("owner:ownerReportsPage.customerInsights")}),(0,S.jsx)(i.oz,{active:"operations"===ne,onClick:()=>oe("operations"),children:r("owner:ownerReportsPage.operations")})]}),(0,S.jsxs)("div",{style:{display:"sales"===ne?"block":"none"},children:[(0,S.jsx)(Ze,{}),be?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:r("owner:ownerReportsPage.loading")}):0===ze.length?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:r("owner:ownerReportsPage.noOrderDataAvailableForTheSelectedPeriod")}):(0,S.jsxs)("div",{children:[(0,S.jsxs)(P,{children:[(0,S.jsxs)(a.hI,{color:"#059669",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.totalRevenue")}),(0,S.jsx)(a.Os,{children:qe(Te.reduce((e,t)=>e+t.sales,0))}),(0,S.jsxs)(a.d1,{children:[ze.length," orders in selected period"]})]}),(0,S.jsxs)(a.hI,{color:"#2563EB",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.totalOrders")}),(0,S.jsx)(a.Os,{children:ze.length.toLocaleString()}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.forSelectedPeriod")})]}),(0,S.jsxs)(a.hI,{color:"#DC2626",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.averageOrderValue")}),(0,S.jsx)(a.Os,{children:qe(ze.length>0?Te.reduce((e,t)=>e+t.sales,0)/ze.length:0)}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.perOrder")})]}),(0,S.jsxs)(a.hI,{color:"#7C3AED",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.completedOrders")}),(0,S.jsx)(a.Os,{children:ze.filter(e=>"completed"===e.status).length}),(0,S.jsxs)(a.d1,{children:[Math.round(ze.filter(e=>"completed"===e.status).length/ze.length*100||0),"% completion rate"]})]})]}),(0,S.jsxs)(D,{children:[(0,S.jsxs)(B,{children:[(0,S.jsx)($,{children:r("owner:ownerReportsPage.revenueTrend")}),(0,S.jsx)(p.u,{width:"100%",height:300,children:(0,S.jsxs)(g.b,{data:Te,margin:{top:5,right:20,left:0,bottom:5},children:[(0,S.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,S.jsx)(m.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,S.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,S.jsx)(w.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,S.jsx)(f.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,S.jsxs)(B,{children:[(0,S.jsx)($,{children:r("owner:ownerReportsPage.salesByCategory")}),(0,S.jsx)(p.u,{width:"100%",height:300,children:(0,S.jsxs)(y.r,{children:[(0,S.jsx)(v.F,{data:Le,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Le.map((e,t)=>(0,S.jsx)(F.f,{fill:G[t%G.length]},`cell-${t}`))}),(0,S.jsx)(w.m,{formatter:e=>`${e}%`})]})})]})]}),(0,S.jsxs)(B,{children:[(0,S.jsx)($,{children:r("owner:ownerReportsPage.hourlyOrdersDistribution")}),(0,S.jsx)(p.u,{width:"100%",height:250,children:(0,S.jsxs)(b.E,{data:Ye,margin:{top:5,right:20,left:0,bottom:5},children:[(0,S.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,S.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,S.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,S.jsx)(w.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,S.jsx)(k.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,S.jsxs)("div",{style:{display:"details"===ne?"block":"none"},children:[(0,S.jsx)(Ze,{}),be?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:r("owner:ownerReportsPage.loading")}):0===ze.length?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:r("owner:ownerReportsPage.noOrderDataAvailableForTheSelectedPeriod")}):(0,S.jsxs)("div",{children:[(0,S.jsxs)(P,{children:[(0,S.jsxs)(a.hI,{color:"#059669",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.totalRevenue")}),(0,S.jsx)(a.Os,{children:qe(Te.reduce((e,t)=>e+t.sales,0))}),(0,S.jsxs)(a.d1,{children:[ze.length," orders in selected period"]})]}),(0,S.jsxs)(a.hI,{color:"#2563EB",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.totalOrders")}),(0,S.jsx)(a.Os,{children:ze.length.toLocaleString()}),(0,S.jsxs)(a.d1,{children:[ze.filter(e=>"completed"===e.status).length," completed"]})]}),(0,S.jsxs)(a.hI,{color:"#DC2626",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.averageOrderValue")}),(0,S.jsx)(a.Os,{children:qe(ze.length>0?Te.reduce((e,t)=>e+t.sales,0)/ze.length:0)}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.perOrderAverage")})]}),(0,S.jsxs)(a.hI,{color:"#7C3AED",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.period")}),(0,S.jsx)(a.Os,{children:Ke()}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.days")})]})]}),(0,S.jsxs)(M,{children:[(0,S.jsx)($,{children:r("owner:ownerReportsPage.detailedSalesBreakdown")}),(0,S.jsxs)(I,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(O,{style:{width:"40%"},children:r("owner:ownerReportsPage.period")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:r("owner:ownerReportsPage.revenue")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:r("owner:ownerReportsPage.orders")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:r("owner:ownerReportsPage.avgOrderValue")})]})}),(0,S.jsx)("tbody",{children:Object.keys(He).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=He[e],r=Pe.has(e);return(0,S.jsxs)(n.Fragment,{children:[(0,S.jsxs)(T,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(Pe);if(t.has(e)){var r;t.delete(e);const n=new Set(Be);Object.keys((null===(r=He[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),$e(n)}else t.add(e);De(t)})(e),children:[(0,S.jsxs)(L,{level:0,bold:!0,children:[(0,S.jsx)(W,{expanded:r,children:"\u25b6"}),e]}),(0,S.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:qe(t.revenue)}),(0,S.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,S.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:qe(t.revenue/t.orders)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const o=t.months[r],s=`${e}-${r}`,a=Be.has(s),i=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,S.jsxs)(n.Fragment,{children:[(0,S.jsxs)(T,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(Be);t.has(e)?t.delete(e):t.add(e),$e(t)})(s),children:[(0,S.jsxs)(L,{level:1,bold:!0,children:[(0,S.jsx)(W,{expanded:a,children:"\u25b6"}),i]}),(0,S.jsx)(L,{level:1,style:{textAlign:"right"},children:qe(o.revenue)}),(0,S.jsx)(L,{level:1,style:{textAlign:"right"},children:o.orders}),(0,S.jsx)(L,{level:1,style:{textAlign:"right"},children:qe(o.revenue/o.orders)})]}),a&&Object.keys(o.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=o.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,S.jsxs)(T,{level:2,children:[(0,S.jsx)(L,{level:2,children:r}),(0,S.jsx)(L,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:qe(t.revenue)}),(0,S.jsx)(L,{level:2,style:{textAlign:"right"},children:t.orders}),(0,S.jsx)(L,{level:2,style:{textAlign:"right"},children:qe(t.revenue/t.orders)})]},e)})]},s)})]},e)})})]})]})]})]}),(0,S.jsxs)("div",{style:{display:"menu"===ne?"block":"none"},children:[(0,S.jsx)(Ze,{}),(0,S.jsxs)(P,{children:[(0,S.jsxs)(a.hI,{color:"#F59E0B",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.bestSeller")}),(0,S.jsx)(a.Os,{children:(null===(e=We[0])||void 0===e?void 0:e.name)||"N/A"}),(0,S.jsxs)(a.d1,{children:[(null===(t=We[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,S.jsxs)(a.hI,{color:"#10B981",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.totalItemsAnalyzed")}),(0,S.jsx)(a.Os,{children:We.length}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.completeMenuAnalysis")})]}),(0,S.jsxs)(a.hI,{color:"#3B82F6",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.totalOrders")}),(0,S.jsx)(a.Os,{children:We.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.forSelectedPeriod")})]}),(0,S.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.totalRevenue")}),(0,S.jsx)(a.Os,{children:qe(We.reduce((e,t)=>e+t.revenue,0))}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.forSelectedPeriod")})]})]}),(0,S.jsxs)(M,{children:[(0,S.jsx)($,{children:r("owner:ownerReportsPage.completeMenuPerformanceRanking")}),(0,S.jsxs)(I,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(O,{children:r("owner:ownerReportsPage.rank")}),(0,S.jsx)(O,{children:r("owner:ownerReportsPage.menuItem")}),(0,S.jsx)(O,{children:r("owner:ownerReportsPage.category")}),(0,S.jsx)(O,{children:r("owner:ownerReportsPage.price")}),(0,S.jsx)(O,{children:r("owner:ownerReportsPage.orders")}),(0,S.jsx)(O,{children:r("owner:ownerReportsPage.revenue")}),(0,S.jsx)(O,{children:r("owner:ownerReportsPage.performance")})]})}),(0,S.jsx)("tbody",{children:We.map((e,t)=>{var r;const n=(null===(r=We[0])||void 0===r?void 0:r.orders)||1;return(0,S.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsxs)(_,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#6FCF97":"#0A2540"},children:["#",t+1]}),(0,S.jsx)(_,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(_,{children:(0,S.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,S.jsx)(_,{children:qe(e.price)}),(0,S.jsx)(_,{children:e.orders.toLocaleString()}),(0,S.jsx)(_,{children:qe(e.revenue)}),(0,S.jsx)(_,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(z,{percentage:e.orders/n*100}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,S.jsxs)("div",{style:{display:"customers"===ne?"block":"none"},children:[(0,S.jsx)(Ze,{}),(0,S.jsxs)(P,{children:[(0,S.jsxs)(a.hI,{color:"#635BFF",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.totalCustomers")}),(0,S.jsx)(a.Os,{children:Se.length.toLocaleString()}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.acrossAllRestaurants")})]}),(0,S.jsxs)(a.hI,{color:"#6FCF97",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.repeatCustomers")}),(0,S.jsx)(a.Os,{children:Se.filter(e=>e.total_orders>1).length}),(0,S.jsxs)(a.d1,{children:[Se.length>0?Math.round(Se.filter(e=>e.total_orders>1).length/Se.length*100):0,"% return rate"]})]}),(0,S.jsxs)(a.hI,{color:"#FFB800",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.averageSpent")}),(0,S.jsx)(a.Os,{children:qe(Se.length>0?Se.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/Se.length:0)}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.perCustomer")})]}),(0,S.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.totalPoints")}),(0,S.jsx)(a.Os,{children:Se.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.acrossAllCustomers")})]})]}),(0,S.jsx)(M,{children:(0,S.jsx)($,{children:r("owner:ownerReportsPage.customerInsightsWillBeAvailableWhenCustomerDataIsLoaded")})})]}),(0,S.jsxs)("div",{style:{display:"operations"===ne?"block":"none"},children:[(0,S.jsx)(Ze,{}),(0,S.jsxs)(P,{children:[(0,S.jsxs)(a.hI,{color:"#10B981",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.orderFulfillment")}),(0,S.jsxs)(a.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.ontimeCompletion")})]}),(0,S.jsxs)(a.hI,{color:"#F59E0B",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.avgWaitTime")}),(0,S.jsxs)(a.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.estimated")})]}),(0,S.jsxs)(a.hI,{color:"#EF4444",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.peakHour")}),(0,S.jsx)(a.Os,{children:"12-1 PM"}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.busiestTime")})]}),(0,S.jsxs)(a.hI,{color:"#6366F1",children:[(0,S.jsx)(a.v0,{children:r("owner:ownerReportsPage.staffEfficiency")}),(0,S.jsxs)(a.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,S.jsx)(a.d1,{children:r("owner:ownerReportsPage.estimated")})]})]}),(0,S.jsxs)(M,{children:[(0,S.jsx)($,{children:r("owner:ownerReportsPage.peakHoursPerformance")}),(0,S.jsxs)(I,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(O,{children:r("owner:ownerReportsPage.timeSlot")}),(0,S.jsx)(O,{children:r("owner:ownerReportsPage.orders")}),(0,S.jsx)(O,{children:r("owner:ownerReportsPage.revenue")}),(0,S.jsx)(O,{children:r("owner:ownerReportsPage.efficiency")})]})}),(0,S.jsx)("tbody",{children:Ne.map((e,t)=>(0,S.jsxs)("tr",{children:[(0,S.jsx)(_,{style:{fontWeight:600},children:e.time}),(0,S.jsx)(_,{children:e.orders}),(0,S.jsx)(_,{children:qe(e.revenue)}),(0,S.jsx)(_,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(z,{percentage:e.efficiency}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,S.jsxs)("div",{style:{display:"ranking"===ne?"block":"none"},children:[(0,S.jsx)(x.A,{activePeriod:se,dateRange:ie,isCustomDateRange:le,onPeriodChange:Je,onCalendarRangeSelect:Ve}),(0,S.jsxs)(q,{children:[(0,S.jsx)($,{children:r("owner:ownerReportsPage.restaurantSalesRanking")}),(0,S.jsxs)(I,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(O,{style:{width:"60px"},children:r("owner:ownerReportsPage.rank")}),(0,S.jsx)(O,{children:r("owner:ownerReportsPage.restaurantName")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:r("owner:ownerReportsPage.orders")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:r("owner:ownerReportsPage.revenue")}),(0,S.jsx)(O,{style:{width:"150px"},children:r("owner:ownerReportsPage.performance")})]})}),(0,S.jsxs)("tbody",{children:[Ue.restaurants.map((e,t)=>{var r;const n=(null===(r=Ue.restaurants[0])||void 0===r?void 0:r.revenue)||1,o=Math.round(e.revenue/n*100);return(0,S.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsx)(_,{children:(0,S.jsx)(Z,{rank:t+1,children:t+1})}),(0,S.jsx)(_,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(_,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,S.jsx)(_,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:qe(e.revenue)}),(0,S.jsx)(_,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(z,{percentage:o}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[o,"%"]})]})})]},e.id)}),0===Ue.restaurants.length&&(0,S.jsx)("tr",{children:(0,S.jsx)(_,{colSpan:5,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:r("owner:ownerReportsPage.noRestaurantDataAvailable")})})]})]})]})]})]})]})})}}}]);