"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2545],{512:(e,t,r)=>{r.d(t,{x:()=>E,A:()=>O});var o=r(9950),n=r(4752),s=r(5030),d=r(4414);const i=["Su","Mo","Tu","We","Th","Fr","Sa"],a=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,r,o]=e.split("-").map(Number);return new Date(t,r-1,o)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),u=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=n.Ay.div`
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
`,C=e=>{let{startDate:t,endDate:r,onRangeSelect:n,onClose:C,isOpen:P}=e;const{t:E}=(0,s.Bd)("common"),D=new Date,[B,$]=(0,o.useState)(D.getMonth()),[M,I]=(0,o.useState)(D.getFullYear()),[O,_]=(0,o.useState)(null),[z,T]=(0,o.useState)(null),[L,W]=(0,o.useState)(null),[Y,N]=(0,o.useState)("start"),H=(0,o.useRef)(null);(0,o.useEffect)(()=>{t&&_(l(t)),r&&T(l(r))},[t,r]),(0,o.useEffect)(()=>{P&&N("start")},[P]),(0,o.useEffect)(()=>{const e=e=>{H.current&&!H.current.contains(e.target)&&C()};return P&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[P,C]);const U=(0,o.useCallback)(()=>{0===B?($(11),I(e=>e-1)):$(e=>e-1)},[B]),K=(0,o.useCallback)(()=>{11===B?($(0),I(e=>e+1)):$(e=>e+1)},[B]),J=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),o=((e,t)=>new Date(e,t,1).getDay())(e,t),s=[];for(let n=0;n<o;n++)s.push(null);for(let n=1;n<=r;n++)s.push(new Date(e,t,n));return(0,d.jsxs)(F,{children:[(0,d.jsx)(b,{children:u(e,t)}),(0,d.jsx)(w,{children:i.map(e=>(0,d.jsx)(k,{children:e},e))}),(0,d.jsx)(S,{children:s.map((e,t)=>{if(!e)return(0,d.jsx)(A,{},`e-${t}`);const{isStart:r,isEnd:o,isInRange:s,isHoverEnd:i}=(e=>{const t=O&&c(e,O),r=z&&c(e,z),o="end"===Y&&L?L:z;let n=!1;if(O&&o){const[t,r]=O<=o?[O,o]:[o,O];n=((e,t,r)=>{const o=e.getTime();return o>t.getTime()&&o<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:n,isHoverEnd:"end"===Y&&L&&c(e,L)}})(e),l=c(e,D);return(0,d.jsx)(R,{$isStart:!!r,$isEnd:!!o,$isInRange:s,$isHoverEnd:!!i,$isToday:l,onClick:()=>(e=>{if("start"===Y)_(e),T(null),N("end");else{let t=O,r=e;r<t&&([t,r]=[r,t]),_(t),T(r),N("start"),n(a(t),a(r)),setTimeout(C,200)}})(e),onMouseEnter:()=>W(e),onMouseLeave:()=>W(null),children:e.getDate()},e.getTime())})})]})},V=11===B?0:B+1,q=11===B?M+1:M,Z=e=>{const t=new Date;let r;const o=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}_(r),T(o),N("start"),n(a(r),a(o)),setTimeout(C,150)};return P?(0,d.jsx)(h,{ref:H,children:(0,d.jsxs)(x,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(g,{onClick:()=>Z("this_week"),children:"This Week"}),(0,d.jsx)(g,{onClick:()=>Z("this_month"),children:"This Month"}),(0,d.jsx)(g,{onClick:()=>Z("this_year"),children:"This Year"})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(j,{onClick:U,"aria-label":"Previous month",children:(0,d.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,d.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,d.jsx)(j,{onClick:K,"aria-label":"Next month",children:(0,d.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,d.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,d.jsxs)(v,{children:[J(M,B),(0,d.jsx)(y,{children:J(q,V)})]})]})]})}):null},P=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,t)=>{const r=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[r,o,n]=t.split("-").map(Number);return new Date(r,o-1,n)}catch{return new Date}})(t);let o=new Date(r);const n=new Date(r);switch(e){case"today":break;case"yesterday":o.setDate(r.getDate()-1),n.setDate(r.getDate()-1);break;case"week":o.setDate(r.getDate()-6);break;case"month":o.setDate(r.getDate()-29);break;case"year":o.setDate(r.getDate()-364);break;case"all":o=new Date(2020,0,1)}return{start:P(o),end:P(n)}},D=n.Ay.div`
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
`,O=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:n,onPeriodChange:i,onCalendarRangeSelect:a,includeToday:l=!1,children:c}=e;const{t:u}=(0,s.Bd)("common"),[h,x]=(0,o.useState)(!1),p=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],g={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,d.jsx)(D,{children:(0,d.jsxs)(B,{children:[p.map(e=>(0,d.jsx)($,{active:t===e&&!n,onClick:()=>i(e),children:g[e]},e)),(0,d.jsxs)(M,{children:[(0,d.jsxs)(I,{active:n,onClick:()=>x(!h),children:[(0,d.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,d.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,d.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,d.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,d.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,d.jsx)(C,{isOpen:h,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{a(e,t),x(!1)},onClose:()=>x(!1)})]}),c]})})}},2545:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ee});var o=r(9950),n=r(4752),s=r(4492),d=r(8409),i=r(2597),a=r(2653),l=r(1367),c=r(6038),u=r(4021),h=r(512),x=r(9955),p=r(1095),g=r(2847),f=r(3245),m=r(158),j=r(3440),v=r(2174),y=r(4915),F=r(7621),b=r(5297),w=r(7766),k=r(294),S=r(3588),A=r(4414);const R=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,C=n.Ay.div`
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
`,P=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,E=n.Ay.div`
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
`,D=n.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,B=d.MD,$=n.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,M=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,I=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,O=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,_=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,z=n.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,T=n.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,L=n.Ay.div`
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
`,W=n.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,Y=n.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,N=n.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,H=n.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,U=n.Ay.input`
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
`,K=n.Ay.div`
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
`,J=n.Ay.div`
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
`,V=n.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,q=n.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,Z=n.Ay.button`
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
`,G=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,Q=n.Ay.span`
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
`,X=["#635BFF","#6FCF97","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],ee=()=>{var e,t;const{t:r}=useTranslation("foodcourt"),{user:n}=(0,l.As)(),[ee,te]=(0,s.ok)(),{defaultCurrency:re}=(0,u.i1)(),[oe,ne]=(0,o.useState)("RM");(0,o.useEffect)(()=>{re&&ne(re)},[re]);const[se,de]=(0,a.M)("ranking"),[ie,ae]=(0,o.useState)("month"),[le,ce]=(0,o.useState)(()=>(0,h.x)("month")),[ue,he]=(0,o.useState)(!1),[xe,pe]=(0,o.useState)([]),[ge]=(0,o.useState)([]),[fe,me]=(0,o.useState)("all"),[je,ve]=(0,o.useState)(""),[ye,Fe]=(0,o.useState)(!1),[be,we]=(0,o.useState)([]),[ke,Se]=(0,o.useState)([]),[Ae,Re]=(0,o.useState)(!0),[Ce]=(0,o.useState)([]),[Pe,Ee]=(0,o.useState)([]),[De,Be]=(0,o.useState)([]),[$e,Me]=(0,o.useState)(new Set),[Ie,Oe]=(0,o.useState)(new Set);function _e(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[ze]=(0,o.useState)(()=>ee.get("restaurantId")),[Te]=(0,o.useState)(()=>ee.get("restaurantName"));(0,o.useEffect)(()=>{const e={tab:se};"all"!==fe&&(e.restaurantId=fe),te(e,{replace:!0})},[fe,te,se]),(0,o.useEffect)(()=>{n&&(async()=>{try{const e=(0,x.c4)(),t=null!==n&&void 0!==n&&n.id?`/api/restaurants/manager/${n.id}`:"/api/restaurants",r=await fetch(t,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=(e.data||e||[]).map(e=>{var t;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name}});if(pe(t),we(t.slice(0,10)),ze){const e=t.find(e=>e.id===ze);e&&(me(e.id),ve(e.name))}else if(Te){const e=decodeURIComponent(Te),r=t.find(t=>t.name===e);r&&(me(r.id),ve(r.name))}}}catch(e){console.error("Error fetching restaurants:",e)}})()},[n,ze,Te]),(0,o.useEffect)(()=>{(async()=>{if(0!==xe.length){Re(!0);try{const r=(0,x.c4)(),o=xe.map(e=>e.id);let n="/api/orders?limit=5000";"all"!==fe&&(n+=`&restaurant_id=${fe}`);const s=await fetch(n,{headers:{Authorization:`Bearer ${r}`}});if(s.ok){const e=await s.json();let t=e.data||e||[];t=t.filter(e=>{var t;return o.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),Se(t)}const d=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${r}`}});if(d.ok){var e,t;const r=await d.json();null!==(e=r.data)&&void 0!==e&&e.items&&Ee(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&Be(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{Re(!1)}}else Re(!1)})()},[fe,xe]);const Le=()=>{me("all"),ve(""),Fe(!1)},We=(0,o.useMemo)(()=>{if(!ke||0===ke.length)return[];const e=new Date(le.start);e.setHours(0,0,0,0);const t=new Date(le.end);return t.setHours(23,59,59,999),ke.filter(r=>{const o=r.order_date||r.createdAt;if(!o)return!1;const n=new Date(o),s=n>=e&&n<=t,d="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return s&&d})},[ke,le.start,le.end]),Ye=(0,o.useMemo)(()=>{if(0===We.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===ie){const r={};return We.forEach(o=>{const n=e(o).getHours(),s=12===n?"12PM":n>12?n-12+"PM":`${n}AM`;r[s]=(r[s]||0)+t(o)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===ie){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],o=new Date,n=[];for(let e=6;e>=0;e--){const t=new Date(o);t.setDate(t.getDate()-e),n.push(t)}const s={};return We.forEach(r=>{const o=_e(e(r));s[o]=(s[o]||0)+t(r)}),n.map(e=>{const t=_e(e);return{date:r[e.getDay()],sales:Math.round(s[t]||0)}})}if("month"===ie){const r={};return We.forEach(o=>{const n=e(o).getDate().toString();r[n]=(r[n]||0)+t(o)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],o={};return We.forEach(n=>{const s=r[e(n).getMonth()];o[s]=(o[s]||0)+t(n)}),r.map(e=>({date:e,sales:Math.round(o[e]||0)}))}},[We,ie]),Ne=(0,o.useMemo)(()=>{if(0===We.length)return[{name:"No Data",value:100,sales:0}];const e={};De.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};Pe.forEach(r=>{if(r.id){const o=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=o}});const r={};let o=0;We.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var n,s,d;const i=parseFloat(e.price||0)*parseInt(e.quantity||1);o+=i;const a=(null===(n=e.menuItem)||void 0===n||null===(s=n.id)||void 0===s?void 0:s.toString())||(null===(d=e.product_id)||void 0===d?void 0:d.toString()),l=a&&t[a]||"Other";r[l]=(r[l]||0)+i})});const n=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:o>0?Math.round(r/o*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return n.length>0?n:[{name:"No Data",value:100,sales:0}]},[We,Pe,De]),He=(0,o.useMemo)(()=>{var e;if(0===We.length)return[];const t={};De.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};Pe.forEach(e=>{if(e.id){const o=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=o}});const o={};We.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,n,s;const d=e.menu_name||e.name||"Unknown",i=(null===(t=e.menuItem)||void 0===t||null===(n=t.id)||void 0===n?void 0:n.toString())||(null===(s=e.product_id)||void 0===s?void 0:s.toString()),a=i?r[i]||"Other":e.category||"Other";o[d]||(o[d]={category:a,price:parseFloat(e.price||0),orders:0,revenue:0});const l=parseInt(e.quantity||1),c=parseFloat(e.price||0);o[d].orders+=l,o[d].revenue+=c*l})});const n=Object.entries(o).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),s=(null===(e=n[0])||void 0===e?void 0:e.orders)||1;return n.forEach(e=>{e.performance=Math.round(e.orders/s*100)}),n},[We,Pe,De]),Ue=(0,o.useMemo)(()=>{if(0===We.length)return[];const e={};return We.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),o=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[o]=(e[o]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[We]),Ke=(0,o.useMemo)(()=>{if(0===We.length)return{};const e={};return We.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),o=r.getFullYear().toString(),n=`${o}-${(r.getMonth()+1).toString().padStart(2,"0")}`,s=r.toISOString().split("T")[0];e[o]||(e[o]={year:o,revenue:0,orders:0,months:{}}),e[o].months[n]||(e[o].months[n]={month:n,revenue:0,orders:0,days:{}}),e[o].months[n].days[s]||(e[o].months[n].days[s]={day:s,revenue:0,orders:0});const d=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[o].revenue+=d,e[o].orders+=1,e[o].months[n].revenue+=d,e[o].months[n].orders+=1,e[o].months[n].days[s].revenue+=d,e[o].months[n].days[s].orders+=1}),e},[We]),Je=(0,o.useMemo)(()=>{if(0===We.length)return[];const e={};return We.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),o=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[o]||(e[o]={orders:0,revenue:0}),e[o].orders+=1,e[o].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(We.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[We]),Ve=(0,o.useMemo)(()=>{if(0===ke.length)return{brands:[],restaurants:[]};const e=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),t=new Date(le.start);t.setHours(0,0,0,0);const r=new Date(le.end);r.setHours(23,59,59,999);const o=ke.filter(e=>{const o=e.order_date||e.createdAt;if(!o)return!1;const n=new Date(o);return n>=t&&n<=r&&"completed"===e.status}),n={};o.forEach(t=>{var r,o;const s=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString();if(!s)return;const d=xe.find(e=>e.id===s),i=(null===d||void 0===d?void 0:d.name)||t.restaurant_name||"Unknown",a=(null===d||void 0===d?void 0:d.brand_name)||(null===(o=ge.find(e=>e.id===(null===d||void 0===d?void 0:d.brand_id)))||void 0===o?void 0:o.name)||"Independent";n[s]||(n[s]={name:i,brandName:a,orders:0,revenue:0}),n[s].orders+=1,n[s].revenue+=e(t)});const s=Object.entries(n).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue),d={},i=new Set(xe.map(e=>{var t;return null===(t=e.brand_id)||void 0===t?void 0:t.toString()}).filter(Boolean));ge.forEach(e=>{i.has(e.id.toString())&&(d[e.id.toString()]={name:e.name,orders:0,revenue:0,restaurantCount:0})}),xe.some(e=>!e.brand_id)&&(d.independent={name:"Independent",orders:0,revenue:0,restaurantCount:0}),xe.forEach(e=>{var t;const r=(null===(t=e.brand_id)||void 0===t?void 0:t.toString())||"independent";d[r]&&(d[r].restaurantCount+=1)}),o.forEach(t=>{var r,o;const n=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString(),s=xe.find(e=>e.id===n),i=(null===s||void 0===s||null===(o=s.brand_id)||void 0===o?void 0:o.toString())||"independent";d[i]&&(d[i].orders+=1,d[i].revenue+=e(t))});return{brands:Object.entries(d).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).filter(e=>e.orders>0||e.restaurantCount>0).sort((e,t)=>t.revenue-e.revenue),restaurants:s}},[ke,xe,ge,le]),qe=()=>{const e=new Date(le.start),t=new Date(le.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,o.useEffect)(()=>{const e=qe();if(e<=31){const e=new Set(Object.keys(Ke)),t=new Set;Object.keys(Ke).forEach(e=>{Object.keys(Ke[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),Me(e),Oe(t)}else e<=365?(Me(new Set(Object.keys(Ke))),Oe(new Set)):(Me(new Set),Oe(new Set))},[le.start,le.end,Ke]);const Ze=e=>{ae(e),he(!1),ce((0,h.x)(e))},Ge=(e,t)=>{he(!0),ae("all"),ce({start:e,end:t})},Qe=()=>(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(E,{children:(0,A.jsxs)(H,{children:[(0,A.jsx)(U,{type:"text",placeholder:"All Restaurants",value:je,onChange:e=>(e=>{ve(e),Fe(!0);const t=xe;if(e.length<1)return void we(t.slice(0,10));const r=t.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);we(r)})(e.target.value),onFocus:()=>{Fe(!0),we(xe.slice(0,10))},onBlur:()=>setTimeout(()=>Fe(!1),200)}),"all"!==fe&&je&&(0,A.jsx)(Z,{onClick:Le,children:"\xd7"}),(0,A.jsxs)(K,{show:ye,children:[(0,A.jsxs)(J,{onClick:()=>{me("all"),ve(""),Fe(!1)},children:[(0,A.jsx)(V,{children:r("foodcourt:foodcourtReportsPage.allRestaurants")}),(0,A.jsx)(q,{children:r("foodcourt:foodcourtReportsPage.showAllRestaurantData")})]}),be.map(e=>(0,A.jsxs)(J,{onClick:()=>(e=>{me(e.id),ve(e.name),Fe(!1)})(e),children:[(0,A.jsx)(V,{children:e.name}),(0,A.jsx)(q,{children:e.brand_name||"Independent"})]},e.id))]})]})}),(0,A.jsx)(h.A,{activePeriod:ie,dateRange:le,isCustomDateRange:ue,onPeriodChange:Ze,onCalendarRangeSelect:Ge})]});return(0,A.jsx)(A.Fragment,{children:(0,A.jsxs)(R,{children:[(0,A.jsx)(C,{children:(0,A.jsx)(P,{children:r("foodcourt:foodcourtReportsPage.foodcourtReports")})}),(0,A.jsxs)(D,{children:[(0,A.jsxs)(i.tU,{children:[(0,A.jsx)(i.oz,{active:"ranking"===se,onClick:()=>de("ranking"),children:r("foodcourt:foodcourtReportsPage.salesRanking")}),(0,A.jsx)(i.oz,{active:"sales"===se,onClick:()=>de("sales"),children:r("foodcourt:foodcourtReportsPage.salesReport")}),(0,A.jsx)(i.oz,{active:"details"===se,onClick:()=>de("details"),children:r("foodcourt:foodcourtReportsPage.salesDetails")}),(0,A.jsx)(i.oz,{active:"menu"===se,onClick:()=>de("menu"),children:r("foodcourt:foodcourtReportsPage.menuAnalysis")}),(0,A.jsx)(i.oz,{active:"customers"===se,onClick:()=>de("customers"),children:r("foodcourt:foodcourtReportsPage.customerInsights")}),(0,A.jsx)(i.oz,{active:"operations"===se,onClick:()=>de("operations"),children:r("foodcourt:foodcourtReportsPage.operations")})]}),(0,A.jsxs)("div",{style:{display:"sales"===se?"block":"none"},children:[(0,A.jsx)(Qe,{}),Ae?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:r("foodcourt:foodcourtReportsPage.loading")}):0===We.length?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:r("foodcourt:foodcourtReportsPage.noOrderDataAvailableForTheSelectedPeriod")}):(0,A.jsxs)("div",{children:[(0,A.jsxs)(B,{children:[(0,A.jsxs)(d.hI,{color:"#059669",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalRevenue")}),(0,A.jsx)(d.Os,{children:(0,c.vv)(Ye.reduce((e,t)=>e+t.sales,0),oe)}),(0,A.jsxs)(d.d1,{children:[We.length," orders in selected period"]})]}),(0,A.jsxs)(d.hI,{color:"#2563EB",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalOrders")}),(0,A.jsx)(d.Os,{children:We.length.toLocaleString()}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.forSelectedPeriod")})]}),(0,A.jsxs)(d.hI,{color:"#DC2626",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.averageOrderValue")}),(0,A.jsx)(d.Os,{children:(0,c.vv)(We.length>0?Ye.reduce((e,t)=>e+t.sales,0)/We.length:0,oe)}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.perOrder")})]}),(0,A.jsxs)(d.hI,{color:"#7C3AED",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.completedOrders")}),(0,A.jsx)(d.Os,{children:We.filter(e=>"completed"===e.status).length}),(0,A.jsxs)(d.d1,{children:[Math.round(We.filter(e=>"completed"===e.status).length/We.length*100||0),"% completion rate"]})]})]}),(0,A.jsxs)($,{children:[(0,A.jsxs)(M,{children:[(0,A.jsx)(I,{children:r("foodcourt:foodcourtReportsPage.revenueTrend")}),(0,A.jsx)(p.u,{width:"100%",height:300,children:(0,A.jsxs)(g.b,{data:Ye,margin:{top:5,right:20,left:0,bottom:5},children:[(0,A.jsx)(f.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,A.jsx)(m.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,A.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,A.jsx)(v.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,A.jsx)(y.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,A.jsxs)(M,{children:[(0,A.jsx)(I,{children:r("foodcourt:foodcourtReportsPage.salesByCategory")}),(0,A.jsx)(p.u,{width:"100%",height:300,children:(0,A.jsxs)(F.r,{children:[(0,A.jsx)(b.F,{data:Ne,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Ne.map((e,t)=>(0,A.jsx)(w.f,{fill:X[t%X.length]},`cell-${t}`))}),(0,A.jsx)(v.m,{formatter:e=>`${e}%`})]})})]})]}),(0,A.jsxs)(M,{children:[(0,A.jsx)(I,{children:r("foodcourt:foodcourtReportsPage.hourlyOrdersDistribution")}),(0,A.jsx)(p.u,{width:"100%",height:250,children:(0,A.jsxs)(k.E,{data:Ue,margin:{top:5,right:20,left:0,bottom:5},children:[(0,A.jsx)(f.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,A.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,A.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,A.jsx)(v.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,A.jsx)(S.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,A.jsxs)("div",{style:{display:"details"===se?"block":"none"},children:[(0,A.jsx)(Qe,{}),Ae?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:r("foodcourt:foodcourtReportsPage.loading")}):0===We.length?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:r("foodcourt:foodcourtReportsPage.noOrderDataAvailableForTheSelectedPeriod")}):(0,A.jsxs)("div",{children:[(0,A.jsxs)(B,{children:[(0,A.jsxs)(d.hI,{color:"#059669",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalRevenue")}),(0,A.jsx)(d.Os,{children:(0,c.vv)(Ye.reduce((e,t)=>e+t.sales,0),oe)}),(0,A.jsxs)(d.d1,{children:[We.length," orders in selected period"]})]}),(0,A.jsxs)(d.hI,{color:"#2563EB",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalOrders")}),(0,A.jsx)(d.Os,{children:We.length.toLocaleString()}),(0,A.jsxs)(d.d1,{children:[We.filter(e=>"completed"===e.status).length," completed"]})]}),(0,A.jsxs)(d.hI,{color:"#DC2626",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.averageOrderValue")}),(0,A.jsx)(d.Os,{children:(0,c.vv)(We.length>0?Ye.reduce((e,t)=>e+t.sales,0)/We.length:0,oe)}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.perOrderAverage")})]}),(0,A.jsxs)(d.hI,{color:"#7C3AED",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.period")}),(0,A.jsx)(d.Os,{children:qe()}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.days")})]})]}),(0,A.jsxs)(O,{children:[(0,A.jsx)(I,{children:r("foodcourt:foodcourtReportsPage.detailedSalesBreakdown")}),(0,A.jsxs)(_,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(z,{style:{width:"40%"},children:r("foodcourt:foodcourtReportsPage.period")}),(0,A.jsx)(z,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.revenue")}),(0,A.jsx)(z,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.orders")}),(0,A.jsx)(z,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.avgOrderValue")})]})}),(0,A.jsx)("tbody",{children:Object.keys(Ke).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=Ke[e],r=$e.has(e);return(0,A.jsxs)(o.Fragment,{children:[(0,A.jsxs)(W,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set($e);if(t.has(e)){var r;t.delete(e);const o=new Set(Ie);Object.keys((null===(r=Ke[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{o.delete(`${e}-${t}`)}),Oe(o)}else t.add(e);Me(t)})(e),children:[(0,A.jsxs)(Y,{level:0,bold:!0,children:[(0,A.jsx)(N,{expanded:r,children:"\u25b6"}),e]}),(0,A.jsx)(Y,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue,oe)}),(0,A.jsx)(Y,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,A.jsx)(Y,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,oe)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const n=t.months[r],s=`${e}-${r}`,d=Ie.has(s),i=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,A.jsxs)(o.Fragment,{children:[(0,A.jsxs)(W,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(Ie);t.has(e)?t.delete(e):t.add(e),Oe(t)})(s),children:[(0,A.jsxs)(Y,{level:1,bold:!0,children:[(0,A.jsx)(N,{expanded:d,children:"\u25b6"}),i]}),(0,A.jsx)(Y,{level:1,style:{textAlign:"right"},children:(0,c.vv)(n.revenue,oe)}),(0,A.jsx)(Y,{level:1,style:{textAlign:"right"},children:n.orders}),(0,A.jsx)(Y,{level:1,style:{textAlign:"right"},children:(0,c.vv)(n.revenue/n.orders,oe)})]}),d&&Object.keys(n.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=n.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,A.jsxs)(W,{level:2,children:[(0,A.jsx)(Y,{level:2,children:r}),(0,A.jsx)(Y,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(t.revenue,oe)}),(0,A.jsx)(Y,{level:2,style:{textAlign:"right"},children:t.orders}),(0,A.jsx)(Y,{level:2,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,oe)})]},e)})]},s)})]},e)})})]})]})]})]}),(0,A.jsxs)("div",{style:{display:"menu"===se?"block":"none"},children:[(0,A.jsx)(Qe,{}),(0,A.jsxs)(B,{children:[(0,A.jsxs)(d.hI,{color:"#F59E0B",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.bestSeller")}),(0,A.jsx)(d.Os,{children:(null===(e=He[0])||void 0===e?void 0:e.name)||"N/A"}),(0,A.jsxs)(d.d1,{children:[(null===(t=He[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,A.jsxs)(d.hI,{color:"#10B981",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalItemsAnalyzed")}),(0,A.jsx)(d.Os,{children:He.length}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.completeMenuAnalysis")})]}),(0,A.jsxs)(d.hI,{color:"#3B82F6",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalOrders")}),(0,A.jsx)(d.Os,{children:He.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.forSelectedPeriod")})]}),(0,A.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalRevenue")}),(0,A.jsx)(d.Os,{children:(0,c.vv)(He.reduce((e,t)=>e+t.revenue,0),oe)}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.forSelectedPeriod")})]})]}),(0,A.jsxs)(O,{children:[(0,A.jsx)(I,{children:r("foodcourt:foodcourtReportsPage.completeMenuPerformanceRanking")}),(0,A.jsxs)(_,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.rank")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.menuItem")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.category")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.price")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.orders")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.revenue")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.performance")})]})}),(0,A.jsx)("tbody",{children:He.map((e,t)=>{var r;const o=(null===(r=He[0])||void 0===r?void 0:r.orders)||1;return(0,A.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,A.jsxs)(T,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#6FCF97":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,A.jsx)(T,{style:{fontWeight:600},children:e.name}),(0,A.jsx)(T,{children:(0,A.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,A.jsx)(T,{children:(0,c.vv)(e.price,oe)}),(0,A.jsx)(T,{children:e.orders.toLocaleString()}),(0,A.jsx)(T,{children:(0,c.vv)(e.revenue,oe)}),(0,A.jsx)(T,{children:(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,A.jsx)(L,{percentage:e.orders/o*100}),(0,A.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/o*100),"%"]})]})})]},t)})})]})]})]}),(0,A.jsxs)("div",{style:{display:"customers"===se?"block":"none"},children:[(0,A.jsx)(Qe,{}),(0,A.jsxs)(B,{children:[(0,A.jsxs)(d.hI,{color:"#635BFF",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalCustomers")}),(0,A.jsx)(d.Os,{children:Ce.length.toLocaleString()}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.acrossAllRestaurants")})]}),(0,A.jsxs)(d.hI,{color:"#6FCF97",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.repeatCustomers")}),(0,A.jsx)(d.Os,{children:Ce.filter(e=>e.total_orders>1).length}),(0,A.jsxs)(d.d1,{children:[Ce.length>0?Math.round(Ce.filter(e=>e.total_orders>1).length/Ce.length*100):0,"% return rate"]})]}),(0,A.jsxs)(d.hI,{color:"#FFB800",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.averageSpent")}),(0,A.jsx)(d.Os,{children:(0,c.vv)(Ce.length>0?Ce.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/Ce.length:0,oe)}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.perCustomer")})]}),(0,A.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.totalPoints")}),(0,A.jsx)(d.Os,{children:Ce.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.acrossAllCustomers")})]})]}),(0,A.jsx)(O,{children:(0,A.jsx)(I,{children:r("foodcourt:foodcourtReportsPage.customerInsightsWillBeAvailableWhenCustomerDataIsLoaded")})})]}),(0,A.jsxs)("div",{style:{display:"operations"===se?"block":"none"},children:[(0,A.jsx)(Qe,{}),(0,A.jsxs)(B,{children:[(0,A.jsxs)(d.hI,{color:"#10B981",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.orderFulfillment")}),(0,A.jsxs)(d.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.ontimeCompletion")})]}),(0,A.jsxs)(d.hI,{color:"#F59E0B",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.avgWaitTime")}),(0,A.jsxs)(d.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.estimated")})]}),(0,A.jsxs)(d.hI,{color:"#EF4444",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.peakHour")}),(0,A.jsx)(d.Os,{children:"12-1 PM"}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.busiestTime")})]}),(0,A.jsxs)(d.hI,{color:"#6366F1",children:[(0,A.jsx)(d.v0,{children:r("foodcourt:foodcourtReportsPage.staffEfficiency")}),(0,A.jsxs)(d.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,A.jsx)(d.d1,{children:r("foodcourt:foodcourtReportsPage.estimated")})]})]}),(0,A.jsxs)(O,{children:[(0,A.jsx)(I,{children:r("foodcourt:foodcourtReportsPage.peakHoursPerformance")}),(0,A.jsxs)(_,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.timeSlot")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.orders")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.revenue")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.efficiency")})]})}),(0,A.jsx)("tbody",{children:Je.map((e,t)=>(0,A.jsxs)("tr",{children:[(0,A.jsx)(T,{style:{fontWeight:600},children:e.time}),(0,A.jsx)(T,{children:e.orders}),(0,A.jsx)(T,{children:(0,c.vv)(e.revenue,oe)}),(0,A.jsx)(T,{children:(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,A.jsx)(L,{percentage:e.efficiency}),(0,A.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,A.jsxs)("div",{style:{display:"ranking"===se?"block":"none"},children:[(0,A.jsx)(h.A,{activePeriod:ie,dateRange:le,isCustomDateRange:ue,onPeriodChange:Ze,onCalendarRangeSelect:Ge}),(0,A.jsxs)(G,{children:[(0,A.jsx)(I,{children:r("foodcourt:foodcourtReportsPage.brandSalesRanking")}),(0,A.jsxs)(_,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(z,{style:{width:"60px"},children:r("foodcourt:foodcourtReportsPage.rank")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.brandName")}),(0,A.jsx)(z,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.restaurants")}),(0,A.jsx)(z,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.orders")}),(0,A.jsx)(z,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.revenue")}),(0,A.jsx)(z,{style:{width:"150px"},children:r("foodcourt:foodcourtReportsPage.performance")})]})}),(0,A.jsxs)("tbody",{children:[Ve.brands.map((e,t)=>{var r;const o=(null===(r=Ve.brands[0])||void 0===r?void 0:r.revenue)||1,n=Math.round(e.revenue/o*100);return(0,A.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,A.jsx)(T,{children:(0,A.jsx)(Q,{rank:t+1,children:t+1})}),(0,A.jsx)(T,{style:{fontWeight:600},children:e.name}),(0,A.jsx)(T,{style:{textAlign:"right"},children:e.restaurantCount}),(0,A.jsx)(T,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,A.jsx)(T,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,c.vv)(e.revenue,oe)}),(0,A.jsx)(T,{children:(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,A.jsx)(L,{percentage:n}),(0,A.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[n,"%"]})]})})]},e.id)}),0===Ve.brands.length&&(0,A.jsx)("tr",{children:(0,A.jsx)(T,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:r("foodcourt:foodcourtReportsPage.noBrandDataAvailable")})})]})]})]}),(0,A.jsxs)(G,{children:[(0,A.jsx)(I,{children:r("foodcourt:foodcourtReportsPage.restaurantSalesRanking")}),(0,A.jsxs)(_,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(z,{style:{width:"60px"},children:r("foodcourt:foodcourtReportsPage.rank")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.restaurantName")}),(0,A.jsx)(z,{children:r("foodcourt:foodcourtReportsPage.brand")}),(0,A.jsx)(z,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.orders")}),(0,A.jsx)(z,{style:{textAlign:"right"},children:r("foodcourt:foodcourtReportsPage.revenue")}),(0,A.jsx)(z,{style:{width:"150px"},children:r("foodcourt:foodcourtReportsPage.performance")})]})}),(0,A.jsxs)("tbody",{children:[Ve.restaurants.slice(0,20).map((e,t)=>{var r;const o=(null===(r=Ve.restaurants[0])||void 0===r?void 0:r.revenue)||1,n=Math.round(e.revenue/o*100);return(0,A.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,A.jsx)(T,{children:(0,A.jsx)(Q,{rank:t+1,children:t+1})}),(0,A.jsx)(T,{style:{fontWeight:600},children:e.name}),(0,A.jsx)(T,{children:(0,A.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",backgroundColor:"Independent"===e.brandName?"#F3F4F6":"#E0E7FF",color:"Independent"===e.brandName?"#6B7280":"#4338CA"},children:e.brandName})}),(0,A.jsx)(T,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,A.jsx)(T,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,c.vv)(e.revenue,oe)}),(0,A.jsx)(T,{children:(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,A.jsx)(L,{percentage:n}),(0,A.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[n,"%"]})]})})]},e.id)}),0===Ve.restaurants.length&&(0,A.jsx)("tr",{children:(0,A.jsx)(T,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:r("foodcourt:foodcourtReportsPage.noRestaurantDataAvailable")})})]})]})]})]})]})]})})}},2653:(e,t,r)=>{r.d(t,{M:()=>s});var o=r(9950),n=r(4492);function s(e){const[t,r]=(0,n.ok)(),s=(0,o.useCallback)(()=>t.get("tab")||e,[t,e]),[d,i]=(0,o.useState)(s());return[d,(0,o.useCallback)(e=>{i(e),r({tab:e})},[r])]}},4021:(e,t,r)=>{r.d(t,{i1:()=>i});var o=r(9950),n=r(1367),s=r(6038),d=r(9955);const i=()=>{const{user:e}=(0,n.As)(),[t,r]=(0,o.useState)("RM"),[i]=(0,o.useState)(Object.keys(s.DL)),[a,l]=(0,o.useState)(!0),[c,u]=(0,o.useState)(null);return(0,o.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),o=t.indexOf("restaurant");let n=o>=0?t[o+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return r("RM"),void l(!1);try{const e=(0,d.c4)(),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),o=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";r(o)}else r("MYR")}catch(i){console.error("Failed to fetch restaurant currency:",i),u("Failed to load currency settings"),r("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:a,error:c}}}}]);