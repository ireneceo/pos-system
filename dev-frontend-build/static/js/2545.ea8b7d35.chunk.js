"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2545],{512:(e,t,r)=>{r.d(t,{x:()=>E,A:()=>O});var o=r(9950),n=r(4752),s=r(5030),d=r(4414);const a=["Su","Mo","Tu","We","Th","Fr","Sa"],i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,r,o]=e.split("-").map(Number);return new Date(t,r-1,o)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),u=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=n.Ay.div`
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
`,x=n.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,p=n.Ay.div`
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
`,g=n.Ay.button`
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
`,f=n.Ay.div``,m=n.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,j=n.Ay.button`
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
`,v=n.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,y=n.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,F=n.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,b=n.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,w=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,k=n.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,S=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,A=n.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,R=n.Ay.div`
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
`,C=e=>{let{startDate:t,endDate:r,onRangeSelect:n,onClose:C,isOpen:P}=e;const{t:E}=(0,s.Bd)("common"),D=new Date,[B,$]=(0,o.useState)(D.getMonth()),[M,I]=(0,o.useState)(D.getFullYear()),[O,_]=(0,o.useState)(null),[z,T]=(0,o.useState)(null),[L,W]=(0,o.useState)(null),[Y,N]=(0,o.useState)("start"),H=(0,o.useRef)(null);(0,o.useEffect)(()=>{t&&_(l(t)),r&&T(l(r))},[t,r]),(0,o.useEffect)(()=>{P&&N("start")},[P]),(0,o.useEffect)(()=>{const e=e=>{H.current&&!H.current.contains(e.target)&&C()};return P&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[P,C]);const U=(0,o.useCallback)(()=>{0===B?($(11),I(e=>e-1)):$(e=>e-1)},[B]),K=(0,o.useCallback)(()=>{11===B?($(0),I(e=>e+1)):$(e=>e+1)},[B]),J=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),o=((e,t)=>new Date(e,t,1).getDay())(e,t),s=[];for(let n=0;n<o;n++)s.push(null);for(let n=1;n<=r;n++)s.push(new Date(e,t,n));return(0,d.jsxs)(F,{children:[(0,d.jsx)(b,{children:u(e,t)}),(0,d.jsx)(w,{children:a.map(e=>(0,d.jsx)(k,{children:e},e))}),(0,d.jsx)(S,{children:s.map((e,t)=>{if(!e)return(0,d.jsx)(A,{},`e-${t}`);const{isStart:r,isEnd:o,isInRange:s,isHoverEnd:a}=(e=>{const t=O&&c(e,O),r=z&&c(e,z),o="end"===Y&&L?L:z;let n=!1;if(O&&o){const[t,r]=O<=o?[O,o]:[o,O];n=((e,t,r)=>{const o=e.getTime();return o>t.getTime()&&o<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:n,isHoverEnd:"end"===Y&&L&&c(e,L)}})(e),l=c(e,D);return(0,d.jsx)(R,{$isStart:!!r,$isEnd:!!o,$isInRange:s,$isHoverEnd:!!a,$isToday:l,onClick:()=>(e=>{if("start"===Y)_(e),T(null),N("end");else{let t=O,r=e;r<t&&([t,r]=[r,t]),_(t),T(r),N("start"),n(i(t),i(r)),setTimeout(C,200)}})(e),onMouseEnter:()=>W(e),onMouseLeave:()=>W(null),children:e.getDate()},e.getTime())})})]})},V=11===B?0:B+1,q=11===B?M+1:M,Z=e=>{const t=new Date;let r;const o=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}_(r),T(o),N("start"),n(i(r),i(o)),setTimeout(C,150)};return P?(0,d.jsx)(h,{ref:H,children:(0,d.jsxs)(x,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(g,{onClick:()=>Z("this_week"),children:"This Week"}),(0,d.jsx)(g,{onClick:()=>Z("this_month"),children:"This Month"}),(0,d.jsx)(g,{onClick:()=>Z("this_year"),children:"This Year"})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(j,{onClick:U,"aria-label":"Previous month",children:(0,d.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,d.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,d.jsx)(j,{onClick:K,"aria-label":"Next month",children:(0,d.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,d.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,d.jsxs)(v,{children:[J(M,B),(0,d.jsx)(y,{children:J(q,V)})]})]})]})}):null},P=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,t)=>{const r=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[r,o,n]=t.split("-").map(Number);return new Date(r,o-1,n)}catch{return new Date}})(t);let o=new Date(r);const n=new Date(r);switch(e){case"today":break;case"yesterday":o.setDate(r.getDate()-1),n.setDate(r.getDate()-1);break;case"week":o.setDate(r.getDate()-6);break;case"month":o.setDate(r.getDate()-29);break;case"year":o.setDate(r.getDate()-364);break;case"all":o=new Date(2020,0,1)}return{start:P(o),end:P(n)}},D=n.Ay.div`
  margin-bottom: 24px;
`,B=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,$=n.Ay.button`
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
`,M=n.Ay.div`
  position: relative;
  display: inline-block;
`,I=n.Ay.button`
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
`,O=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:n,onPeriodChange:a,onCalendarRangeSelect:i,includeToday:l=!1,children:c}=e;const{t:u}=(0,s.Bd)("common"),[h,x]=(0,o.useState)(!1),p=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],g={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,d.jsx)(D,{children:(0,d.jsxs)(B,{children:[p.map(e=>(0,d.jsx)($,{active:t===e&&!n,onClick:()=>a(e),children:g[e]},e)),(0,d.jsxs)(M,{children:[(0,d.jsxs)(I,{active:n,onClick:()=>x(!h),children:[(0,d.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,d.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,d.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,d.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,d.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,d.jsx)(C,{isOpen:h,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{i(e,t),x(!1)},onClose:()=>x(!1)})]}),c]})})}},2545:(e,t,r)=>{r.r(t),r.d(t,{default:()=>X});var o=r(9950),n=r(4752),s=r(4492),d=r(8409),a=r(2597),i=r(2653),l=r(1367),c=r(6038),u=r(4021),h=r(512),x=r(1095),p=r(2847),g=r(3245),f=r(158),m=r(3440),j=r(2174),v=r(4915),y=r(7621),F=r(5297),b=r(2528),w=r(294),k=r(3588),S=r(4414);const A=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,R=n.Ay.div`
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
`,C=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,P=n.Ay.div`
  background: #FAFBFC;
  padding: 24px 0;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 16px 0;
  }
`,E=n.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,D=d.MD,B=n.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,$=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,M=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,I=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,O=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,_=n.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,z=n.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,T=n.Ay.div`
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
`,L=n.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,W=n.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,Y=n.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,N=n.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,H=n.Ay.input`
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
`,U=n.Ay.div`
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
`,K=n.Ay.div`
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
`,J=n.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,V=n.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,q=n.Ay.button`
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
`,Z=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,G=n.Ay.span`
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
`,Q=["#635BFF","#6FCF97","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],X=()=>{var e,t;const{t:r}=useTranslation("foodcourt"),{user:n}=(0,l.As)(),[X,ee]=(0,s.ok)(),{defaultCurrency:te}=(0,u.i1)(),[re,oe]=(0,o.useState)("RM");(0,o.useEffect)(()=>{te&&oe(te)},[te]);const[ne,se]=(0,i.M)("ranking"),[de,ae]=(0,o.useState)("month"),[ie,le]=(0,o.useState)(()=>(0,h.x)("month")),[ce,ue]=(0,o.useState)(!1),[he,xe]=(0,o.useState)([]),[pe]=(0,o.useState)([]),[ge,fe]=(0,o.useState)("all"),[me,je]=(0,o.useState)(""),[ve,ye]=(0,o.useState)(!1),[Fe,be]=(0,o.useState)([]),[we,ke]=(0,o.useState)([]),[Se,Ae]=(0,o.useState)(!0),[Re]=(0,o.useState)([]),[Ce,Pe]=(0,o.useState)([]),[Ee,De]=(0,o.useState)([]),[Be,$e]=(0,o.useState)(new Set),[Me,Ie]=(0,o.useState)(new Set);function Oe(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[_e]=(0,o.useState)(()=>X.get("restaurantId")),[ze]=(0,o.useState)(()=>X.get("restaurantName"));(0,o.useEffect)(()=>{const e={tab:ne};"all"!==ge&&(e.restaurantId=ge),ee(e,{replace:!0})},[ge,ee,ne]),(0,o.useEffect)(()=>{n&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=null!==n&&void 0!==n&&n.id?`/api/restaurants/manager/${n.id}`:"/api/restaurants",r=await fetch(t,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=(e.data||e||[]).map(e=>{var t;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name}});if(xe(t),be(t.slice(0,10)),_e){const e=t.find(e=>e.id===_e);e&&(fe(e.id),je(e.name))}else if(ze){const e=decodeURIComponent(ze),r=t.find(t=>t.name===e);r&&(fe(r.id),je(r.name))}}}catch(e){console.error("Error fetching restaurants:",e)}})()},[n,_e,ze]),(0,o.useEffect)(()=>{(async()=>{if(0!==he.length){Ae(!0);try{const r=localStorage.getItem("auth_token"),o=he.map(e=>e.id);let n="/api/orders?limit=5000";"all"!==ge&&(n+=`&restaurant_id=${ge}`);const s=await fetch(n,{headers:{Authorization:`Bearer ${r}`}});if(s.ok){const e=await s.json();let t=e.data||e||[];t=t.filter(e=>{var t;return o.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),ke(t)}const d=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${r}`}});if(d.ok){var e,t;const r=await d.json();null!==(e=r.data)&&void 0!==e&&e.items&&Pe(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&De(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{Ae(!1)}}else Ae(!1)})()},[ge,he]);const Te=()=>{fe("all"),je(""),ye(!1)},Le=(0,o.useMemo)(()=>{if(!we||0===we.length)return[];const e=new Date(ie.start);e.setHours(0,0,0,0);const t=new Date(ie.end);return t.setHours(23,59,59,999),we.filter(r=>{const o=r.order_date||r.createdAt;if(!o)return!1;const n=new Date(o),s=n>=e&&n<=t,d="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return s&&d})},[we,ie.start,ie.end]),We=(0,o.useMemo)(()=>{if(0===Le.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===de){const r={};return Le.forEach(o=>{const n=e(o).getHours(),s=12===n?"12PM":n>12?n-12+"PM":`${n}AM`;r[s]=(r[s]||0)+t(o)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===de){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],o=new Date,n=[];for(let e=6;e>=0;e--){const t=new Date(o);t.setDate(t.getDate()-e),n.push(t)}const s={};return Le.forEach(r=>{const o=Oe(e(r));s[o]=(s[o]||0)+t(r)}),n.map(e=>{const t=Oe(e);return{date:r[e.getDay()],sales:Math.round(s[t]||0)}})}if("month"===de){const r={};return Le.forEach(o=>{const n=e(o).getDate().toString();r[n]=(r[n]||0)+t(o)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],o={};return Le.forEach(n=>{const s=r[e(n).getMonth()];o[s]=(o[s]||0)+t(n)}),r.map(e=>({date:e,sales:Math.round(o[e]||0)}))}},[Le,de]),Ye=(0,o.useMemo)(()=>{if(0===Le.length)return[{name:"No Data",value:100,sales:0}];const e={};Ee.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};Ce.forEach(r=>{if(r.id){const o=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=o}});const r={};let o=0;Le.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var n,s,d;const a=parseFloat(e.price||0)*parseInt(e.quantity||1);o+=a;const i=(null===(n=e.menuItem)||void 0===n||null===(s=n.id)||void 0===s?void 0:s.toString())||(null===(d=e.product_id)||void 0===d?void 0:d.toString()),l=i&&t[i]||"Other";r[l]=(r[l]||0)+a})});const n=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:o>0?Math.round(r/o*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return n.length>0?n:[{name:"No Data",value:100,sales:0}]},[Le,Ce,Ee]),Ne=(0,o.useMemo)(()=>{var e;if(0===Le.length)return[];const t={};Ee.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};Ce.forEach(e=>{if(e.id){const o=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=o}});const o={};Le.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,n,s;const d=e.menu_name||e.name||"Unknown",a=(null===(t=e.menuItem)||void 0===t||null===(n=t.id)||void 0===n?void 0:n.toString())||(null===(s=e.product_id)||void 0===s?void 0:s.toString()),i=a?r[a]||"Other":e.category||"Other";o[d]||(o[d]={category:i,price:parseFloat(e.price||0),orders:0,revenue:0});const l=parseInt(e.quantity||1),c=parseFloat(e.price||0);o[d].orders+=l,o[d].revenue+=c*l})});const n=Object.entries(o).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),s=(null===(e=n[0])||void 0===e?void 0:e.orders)||1;return n.forEach(e=>{e.performance=Math.round(e.orders/s*100)}),n},[Le,Ce,Ee]),He=(0,o.useMemo)(()=>{if(0===Le.length)return[];const e={};return Le.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),o=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[o]=(e[o]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[Le]),Ue=(0,o.useMemo)(()=>{if(0===Le.length)return{};const e={};return Le.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),o=r.getFullYear().toString(),n=`${o}-${(r.getMonth()+1).toString().padStart(2,"0")}`,s=r.toISOString().split("T")[0];e[o]||(e[o]={year:o,revenue:0,orders:0,months:{}}),e[o].months[n]||(e[o].months[n]={month:n,revenue:0,orders:0,days:{}}),e[o].months[n].days[s]||(e[o].months[n].days[s]={day:s,revenue:0,orders:0});const d=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[o].revenue+=d,e[o].orders+=1,e[o].months[n].revenue+=d,e[o].months[n].orders+=1,e[o].months[n].days[s].revenue+=d,e[o].months[n].days[s].orders+=1}),e},[Le]),Ke=(0,o.useMemo)(()=>{if(0===Le.length)return[];const e={};return Le.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),o=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[o]||(e[o]={orders:0,revenue:0}),e[o].orders+=1,e[o].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(Le.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[Le]),Je=(0,o.useMemo)(()=>{if(0===we.length)return{brands:[],restaurants:[]};const e=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),t=new Date(ie.start);t.setHours(0,0,0,0);const r=new Date(ie.end);r.setHours(23,59,59,999);const o=we.filter(e=>{const o=e.order_date||e.createdAt;if(!o)return!1;const n=new Date(o);return n>=t&&n<=r&&"completed"===e.status}),n={};o.forEach(t=>{var r,o;const s=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString();if(!s)return;const d=he.find(e=>e.id===s),a=(null===d||void 0===d?void 0:d.name)||t.restaurant_name||"Unknown",i=(null===d||void 0===d?void 0:d.brand_name)||(null===(o=pe.find(e=>e.id===(null===d||void 0===d?void 0:d.brand_id)))||void 0===o?void 0:o.name)||"Independent";n[s]||(n[s]={name:a,brandName:i,orders:0,revenue:0}),n[s].orders+=1,n[s].revenue+=e(t)});const s=Object.entries(n).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue),d={},a=new Set(he.map(e=>{var t;return null===(t=e.brand_id)||void 0===t?void 0:t.toString()}).filter(Boolean));pe.forEach(e=>{a.has(e.id.toString())&&(d[e.id.toString()]={name:e.name,orders:0,revenue:0,restaurantCount:0})}),he.some(e=>!e.brand_id)&&(d.independent={name:"Independent",orders:0,revenue:0,restaurantCount:0}),he.forEach(e=>{var t;const r=(null===(t=e.brand_id)||void 0===t?void 0:t.toString())||"independent";d[r]&&(d[r].restaurantCount+=1)}),o.forEach(t=>{var r,o;const n=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString(),s=he.find(e=>e.id===n),a=(null===s||void 0===s||null===(o=s.brand_id)||void 0===o?void 0:o.toString())||"independent";d[a]&&(d[a].orders+=1,d[a].revenue+=e(t))});return{brands:Object.entries(d).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).filter(e=>e.orders>0||e.restaurantCount>0).sort((e,t)=>t.revenue-e.revenue),restaurants:s}},[we,he,pe,ie]),Ve=()=>{const e=new Date(ie.start),t=new Date(ie.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,o.useEffect)(()=>{const e=Ve();if(e<=31){const e=new Set(Object.keys(Ue)),t=new Set;Object.keys(Ue).forEach(e=>{Object.keys(Ue[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),$e(e),Ie(t)}else e<=365?($e(new Set(Object.keys(Ue))),Ie(new Set)):($e(new Set),Ie(new Set))},[ie.start,ie.end,Ue]);const qe=e=>{ae(e),ue(!1),le((0,h.x)(e))},Ze=(e,t)=>{ue(!0),ae("all"),le({start:e,end:t})},Ge=()=>(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(P,{children:(0,S.jsxs)(N,{children:[(0,S.jsx)(H,{type:"text",placeholder:"All Restaurants",value:me,onChange:e=>(e=>{je(e),ye(!0);const t=he;if(e.length<1)return void be(t.slice(0,10));const r=t.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);be(r)})(e.target.value),onFocus:()=>{ye(!0),be(he.slice(0,10))},onBlur:()=>setTimeout(()=>ye(!1),200)}),"all"!==ge&&me&&(0,S.jsx)(q,{onClick:Te,children:"\xd7"}),(0,S.jsxs)(U,{show:ve,children:[(0,S.jsxs)(K,{onClick:()=>{fe("all"),je(""),ye(!1)},children:[(0,S.jsx)(J,{children:r("foodcourt:foodcourtReportsPage.allRestaurants")}),(0,S.jsx)(V,{children:r("foodcourt:foodcourtReportsPage.showAllRestaurantData")})]}),Fe.map(e=>(0,S.jsxs)(K,{onClick:()=>(e=>{fe(e.id),je(e.name),ye(!1)})(e),children:[(0,S.jsx)(J,{children:e.name}),(0,S.jsx)(V,{children:e.brand_name||"Independent"})]},e.id))]})]})}),(0,S.jsx)(h.A,{activePeriod:de,dateRange:ie,isCustomDateRange:ce,onPeriodChange:qe,onCalendarRangeSelect:Ze})]});return(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)(A,{children:[(0,S.jsx)(R,{children:(0,S.jsx)(C,{children:r("foodcourt:foodcourtReportsPage.foodcourtReports")})}),(0,S.jsxs)(E,{children:[(0,S.jsxs)(a.tU,{children:[(0,S.jsx)(a.oz,{active:"ranking"===ne,onClick:()=>se("ranking"),children:r("foodcourt:foodcourtReportsPage.salesRanking")}),(0,S.jsx)(a.oz,{active:"sales"===ne,onClick:()=>se("sales"),children:r("foodcourt:foodcourtReportsPage.salesReport")}),(0,S.jsx)(a.oz,{active:"details"===ne,onClick:()=>se("details"),children:r("foodcourt:foodcourtReportsPage.salesDetails")}),(0,S.jsx)(a.oz,{active:"menu"===ne,onClick:()=>se("menu"),children:r("foodcourt:foodcourtReportsPage.menuAnalysis")}),(0,S.jsx)(a.oz,{active:"customers"===ne,onClick:()=>se("customers"),children:r("foodcourt:foodcourtReportsPage.customerInsights")}),(0,S.jsx)(a.oz,{active:"operations"===ne,onClick:()=>se("operations"),children:r("foodcourt:foodcourtReportsPage.operations")})]}),(0,S.jsxs)("div",{style:{display:"sales"===ne?"block":"none"},children:[(0,S.jsx)(Ge,{}),Se?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:r("foodcourt:foodcourtReportsPage.loading")}):0===Le.length?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:r("foodcourt:foodcourtReportsPage.noOrderDataAvailableForTheSelectedPeriod")}):(0,S.jsxs)("div",{children:[(0,S.jsxs)(D,{children:[(0,S.jsxs)(d.hI,{color:"#059669",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalRevenue")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(We.reduce((e,t)=>e+t.sales,0),re)}),(0,S.jsxs)(d.d1,{children:[Le.length," orders in selected period"]})]}),(0,S.jsxs)(d.hI,{color:"#2563EB",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalOrders")}),(0,S.jsx)(d.Os,{children:Le.length.toLocaleString()}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.forSelectedPeriod")})]}),(0,S.jsxs)(d.hI,{color:"#DC2626",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.averageOrderValue")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(Le.length>0?We.reduce((e,t)=>e+t.sales,0)/Le.length:0,re)}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.perOrder")})]}),(0,S.jsxs)(d.hI,{color:"#7C3AED",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.completedOrders")}),(0,S.jsx)(d.Os,{children:Le.filter(e=>"completed"===e.status).length}),(0,S.jsxs)(d.d1,{children:[Math.round(Le.filter(e=>"completed"===e.status).length/Le.length*100||0),"% completion rate"]})]})]}),(0,S.jsxs)(B,{children:[(0,S.jsxs)($,{children:[(0,S.jsx)(M,{children:r("foodcourt:foodcourtReportsPage.revenueTrend")}),(0,S.jsx)(x.u,{width:"100%",height:300,children:(0,S.jsxs)(p.b,{data:We,margin:{top:5,right:20,left:0,bottom:5},children:[(0,S.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,S.jsx)(f.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,S.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,S.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,S.jsx)(v.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,S.jsxs)($,{children:[(0,S.jsx)(M,{children:r("foodcourt:foodcourtReportsPage.salesByCategory")}),(0,S.jsx)(x.u,{width:"100%",height:300,children:(0,S.jsxs)(y.r,{children:[(0,S.jsx)(F.F,{data:Ye,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Ye.map((e,t)=>(0,S.jsx)(b.f,{fill:Q[t%Q.length]},`cell-${t}`))}),(0,S.jsx)(j.m,{formatter:e=>`${e}%`})]})})]})]}),(0,S.jsxs)($,{children:[(0,S.jsx)(M,{children:r("foodcourt:foodcourtReportsPage.hourlyOrdersDistribution")}),(0,S.jsx)(x.u,{width:"100%",height:250,children:(0,S.jsxs)(w.E,{data:He,margin:{top:5,right:20,left:0,bottom:5},children:[(0,S.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,S.jsx)(f.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,S.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,S.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,S.jsx)(k.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,S.jsxs)("div",{style:{display:"details"===ne?"block":"none"},children:[(0,S.jsx)(Ge,{}),Se?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:r("foodcourt:foodcourtReportsPage.loading")}):0===Le.length?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:r("foodcourt:foodcourtReportsPage.noOrderDataAvailableForTheSelectedPeriod")}):(0,S.jsxs)("div",{children:[(0,S.jsxs)(D,{children:[(0,S.jsxs)(d.hI,{color:"#059669",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalRevenue")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(We.reduce((e,t)=>e+t.sales,0),re)}),(0,S.jsxs)(d.d1,{children:[Le.length," orders in selected period"]})]}),(0,S.jsxs)(d.hI,{color:"#2563EB",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalOrders")}),(0,S.jsx)(d.Os,{children:Le.length.toLocaleString()}),(0,S.jsxs)(d.d1,{children:[Le.filter(e=>"completed"===e.status).length," completed"]})]}),(0,S.jsxs)(d.hI,{color:"#DC2626",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.averageOrderValue")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(Le.length>0?We.reduce((e,t)=>e+t.sales,0)/Le.length:0,re)}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.perOrderAverage")})]}),(0,S.jsxs)(d.hI,{color:"#7C3AED",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.period")}),(0,S.jsx)(d.Os,{children:Ve()}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.days")})]})]}),(0,S.jsxs)(I,{children:[(0,S.jsx)(M,{children:r("foodcourt:foodcourtReportsPage.detailedSalesBreakdown")}),(0,S.jsxs)(O,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(_,{style:{width:"40%"},children:r("foodcourt:foodcourtReportsPage.period")}),(0,S.jsx)(_,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.revenue")}),(0,S.jsx)(_,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.orders")}),(0,S.jsx)(_,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.avgOrderValue")})]})}),(0,S.jsx)("tbody",{children:Object.keys(Ue).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=Ue[e],r=Be.has(e);return(0,S.jsxs)(o.Fragment,{children:[(0,S.jsxs)(L,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(Be);if(t.has(e)){var r;t.delete(e);const o=new Set(Me);Object.keys((null===(r=Ue[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{o.delete(`${e}-${t}`)}),Ie(o)}else t.add(e);$e(t)})(e),children:[(0,S.jsxs)(W,{level:0,bold:!0,children:[(0,S.jsx)(Y,{expanded:r,children:"\u25b6"}),e]}),(0,S.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue,re)}),(0,S.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,S.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,re)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const n=t.months[r],s=`${e}-${r}`,d=Me.has(s),a=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,S.jsxs)(o.Fragment,{children:[(0,S.jsxs)(L,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(Me);t.has(e)?t.delete(e):t.add(e),Ie(t)})(s),children:[(0,S.jsxs)(W,{level:1,bold:!0,children:[(0,S.jsx)(Y,{expanded:d,children:"\u25b6"}),a]}),(0,S.jsx)(W,{level:1,style:{textAlign:"right"},children:(0,c.vv)(n.revenue,re)}),(0,S.jsx)(W,{level:1,style:{textAlign:"right"},children:n.orders}),(0,S.jsx)(W,{level:1,style:{textAlign:"right"},children:(0,c.vv)(n.revenue/n.orders,re)})]}),d&&Object.keys(n.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=n.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,S.jsxs)(L,{level:2,children:[(0,S.jsx)(W,{level:2,children:r}),(0,S.jsx)(W,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(t.revenue,re)}),(0,S.jsx)(W,{level:2,style:{textAlign:"right"},children:t.orders}),(0,S.jsx)(W,{level:2,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,re)})]},e)})]},s)})]},e)})})]})]})]})]}),(0,S.jsxs)("div",{style:{display:"menu"===ne?"block":"none"},children:[(0,S.jsx)(Ge,{}),(0,S.jsxs)(D,{children:[(0,S.jsxs)(d.hI,{color:"#F59E0B",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.bestSeller")}),(0,S.jsx)(d.Os,{children:(null===(e=Ne[0])||void 0===e?void 0:e.name)||"N/A"}),(0,S.jsxs)(d.d1,{children:[(null===(t=Ne[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,S.jsxs)(d.hI,{color:"#10B981",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalItemsAnalyzed")}),(0,S.jsx)(d.Os,{children:Ne.length}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.completeMenuAnalysis")})]}),(0,S.jsxs)(d.hI,{color:"#3B82F6",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalOrders")}),(0,S.jsx)(d.Os,{children:Ne.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.forSelectedPeriod")})]}),(0,S.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalRevenue")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(Ne.reduce((e,t)=>e+t.revenue,0),re)}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.forSelectedPeriod")})]})]}),(0,S.jsxs)(I,{children:[(0,S.jsx)(M,{children:r("foodcourt:foodcourtReportsPage.completeMenuPerformanceRanking")}),(0,S.jsxs)(O,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.rank")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.menuItem")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.category")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.price")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.orders")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.revenue")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.performance")})]})}),(0,S.jsx)("tbody",{children:Ne.map((e,t)=>{var r;const o=(null===(r=Ne[0])||void 0===r?void 0:r.orders)||1;return(0,S.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsxs)(z,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#6FCF97":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,S.jsx)(z,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(z,{children:(0,S.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,S.jsx)(z,{children:(0,c.vv)(e.price,re)}),(0,S.jsx)(z,{children:e.orders.toLocaleString()}),(0,S.jsx)(z,{children:(0,c.vv)(e.revenue,re)}),(0,S.jsx)(z,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(T,{percentage:e.orders/o*100}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/o*100),"%"]})]})})]},t)})})]})]})]}),(0,S.jsxs)("div",{style:{display:"customers"===ne?"block":"none"},children:[(0,S.jsx)(Ge,{}),(0,S.jsxs)(D,{children:[(0,S.jsxs)(d.hI,{color:"#635BFF",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalCustomers")}),(0,S.jsx)(d.Os,{children:Re.length.toLocaleString()}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.acrossAllRestaurants")})]}),(0,S.jsxs)(d.hI,{color:"#6FCF97",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.repeatCustomers")}),(0,S.jsx)(d.Os,{children:Re.filter(e=>e.total_orders>1).length}),(0,S.jsxs)(d.d1,{children:[Re.length>0?Math.round(Re.filter(e=>e.total_orders>1).length/Re.length*100):0,"% return rate"]})]}),(0,S.jsxs)(d.hI,{color:"#FFB800",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.averageSpent")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(Re.length>0?Re.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/Re.length:0,re)}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.perCustomer")})]}),(0,S.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalPoints")}),(0,S.jsx)(d.Os,{children:Re.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.acrossAllCustomers")})]})]}),(0,S.jsx)(I,{children:(0,S.jsx)(M,{children:r("foodcourt:foodcourtReportsPage.customerInsightsWillBeAvailableWhenCustomerDataIsLoaded")})})]}),(0,S.jsxs)("div",{style:{display:"operations"===ne?"block":"none"},children:[(0,S.jsx)(Ge,{}),(0,S.jsxs)(D,{children:[(0,S.jsxs)(d.hI,{color:"#10B981",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.orderFulfillment")}),(0,S.jsxs)(d.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.ontimeCompletion")})]}),(0,S.jsxs)(d.hI,{color:"#F59E0B",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.avgWaitTime")}),(0,S.jsxs)(d.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.estimated")})]}),(0,S.jsxs)(d.hI,{color:"#EF4444",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.peakHour")}),(0,S.jsx)(d.Os,{children:"12-1 PM"}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.busiestTime")})]}),(0,S.jsxs)(d.hI,{color:"#6366F1",children:[(0,S.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.staffEfficiency")}),(0,S.jsxs)(d.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,S.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.estimated")})]})]}),(0,S.jsxs)(I,{children:[(0,S.jsx)(M,{children:r("foodcourt:foodcourtReportsPage.peakHoursPerformance")}),(0,S.jsxs)(O,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.timeSlot")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.orders")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.revenue")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.efficiency")})]})}),(0,S.jsx)("tbody",{children:Ke.map((e,t)=>(0,S.jsxs)("tr",{children:[(0,S.jsx)(z,{style:{fontWeight:600},children:e.time}),(0,S.jsx)(z,{children:e.orders}),(0,S.jsx)(z,{children:(0,c.vv)(e.revenue,re)}),(0,S.jsx)(z,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(T,{percentage:e.efficiency}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,S.jsxs)("div",{style:{display:"ranking"===ne?"block":"none"},children:[(0,S.jsx)(h.A,{activePeriod:de,dateRange:ie,isCustomDateRange:ce,onPeriodChange:qe,onCalendarRangeSelect:Ze}),(0,S.jsxs)(Z,{children:[(0,S.jsx)(M,{children:r("foodcourt:foodcourtReportsPage.brandSalesRanking")}),(0,S.jsxs)(O,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(_,{style:{width:"60px"},children:r("foodcourt:foodcourtReportsPage.rank")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.brandName")}),(0,S.jsx)(_,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.restaurants")}),(0,S.jsx)(_,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.orders")}),(0,S.jsx)(_,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.revenue")}),(0,S.jsx)(_,{style:{width:"150px"},children:r("foodcourt:foodcourtReportsPage.performance")})]})}),(0,S.jsxs)("tbody",{children:[Je.brands.map((e,t)=>{var r;const o=(null===(r=Je.brands[0])||void 0===r?void 0:r.revenue)||1,n=Math.round(e.revenue/o*100);return(0,S.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsx)(z,{children:(0,S.jsx)(G,{rank:t+1,children:t+1})}),(0,S.jsx)(z,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(z,{style:{textAlign:"right"},children:e.restaurantCount}),(0,S.jsx)(z,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,S.jsx)(z,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,c.vv)(e.revenue,re)}),(0,S.jsx)(z,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(T,{percentage:n}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[n,"%"]})]})})]},e.id)}),0===Je.brands.length&&(0,S.jsx)("tr",{children:(0,S.jsx)(z,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:r("foodcourt:foodcourtReportsPage.noBrandDataAvailable")})})]})]})]}),(0,S.jsxs)(Z,{children:[(0,S.jsx)(M,{children:r("foodcourt:foodcourtReportsPage.restaurantSalesRanking")}),(0,S.jsxs)(O,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(_,{style:{width:"60px"},children:r("foodcourt:foodcourtReportsPage.rank")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.restaurantName")}),(0,S.jsx)(_,{children:r("foodcourt:foodcourtReportsPage.brand")}),(0,S.jsx)(_,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.orders")}),(0,S.jsx)(_,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.revenue")}),(0,S.jsx)(_,{style:{width:"150px"},children:r("foodcourt:foodcourtReportsPage.performance")})]})}),(0,S.jsxs)("tbody",{children:[Je.restaurants.slice(0,20).map((e,t)=>{var r;const o=(null===(r=Je.restaurants[0])||void 0===r?void 0:r.revenue)||1,n=Math.round(e.revenue/o*100);return(0,S.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsx)(z,{children:(0,S.jsx)(G,{rank:t+1,children:t+1})}),(0,S.jsx)(z,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(z,{children:(0,S.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",backgroundColor:"Independent"===e.brandName?"#F3F4F6":"#E0E7FF",color:"Independent"===e.brandName?"#6B7280":"#4338CA"},children:e.brandName})}),(0,S.jsx)(z,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,S.jsx)(z,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,c.vv)(e.revenue,re)}),(0,S.jsx)(z,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(T,{percentage:n}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[n,"%"]})]})})]},e.id)}),0===Je.restaurants.length&&(0,S.jsx)("tr",{children:(0,S.jsx)(z,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:r("foodcourt:foodcourtReportsPage.noRestaurantDataAvailable")})})]})]})]})]})]})]})})}},2653:(e,t,r)=>{r.d(t,{M:()=>s});var o=r(9950),n=r(4492);function s(e){const[t,r]=(0,n.ok)(),s=(0,o.useCallback)(()=>t.get("tab")||e,[t,e]),[d,a]=(0,o.useState)(s());return[d,(0,o.useCallback)(e=>{a(e),r({tab:e})},[r])]}},4021:(e,t,r)=>{r.d(t,{i1:()=>d});var o=r(9950),n=r(1367),s=r(6038);const d=()=>{const{user:e}=(0,n.As)(),[t,r]=(0,o.useState)("RM"),[d]=(0,o.useState)(Object.keys(s.DL)),[a,i]=(0,o.useState)(!0),[l,c]=(0,o.useState)(null);return(0,o.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),o=t.indexOf("restaurant");let n=o>=0?t[o+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return r("RM"),void i(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),o=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";r(o)}else r("MYR")}catch(d){console.error("Failed to fetch restaurant currency:",d),c("Failed to load currency settings"),r("MYR")}finally{i(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:d,loading:a,error:l}}}}]);