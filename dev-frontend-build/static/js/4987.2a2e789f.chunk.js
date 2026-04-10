"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4987],{512:(e,r,t)=>{t.d(r,{x:()=>E,A:()=>R});var n=t(9950),a=t(4752),o=t(5030),s=t(4414);const i=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[r,t,n]=e.split("-").map(Number);return new Date(r,t-1,n)},c=(e,r)=>e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),x=(e,r)=>new Date(e,r).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=a.Ay.div`
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
`,g=a.Ay.button`
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
`,m=a.Ay.div``,f=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,b=a.Ay.button`
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
`,v=a.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,y=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,j=a.Ay.div`
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
`,F=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,A=a.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,S=a.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,D=a.Ay.div`
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
`,$=e=>{let{startDate:r,endDate:t,onRangeSelect:a,onClose:$,isOpen:C}=e;const{t:E}=(0,o.Bd)("common"),B=new Date,[P,O]=(0,n.useState)(B.getMonth()),[T,M]=(0,n.useState)(B.getFullYear()),[R,z]=(0,n.useState)(null),[I,_]=(0,n.useState)(null),[Y,L]=(0,n.useState)(null),[N,q]=(0,n.useState)("start"),H=(0,n.useRef)(null);(0,n.useEffect)(()=>{r&&z(l(r)),t&&_(l(t))},[r,t]),(0,n.useEffect)(()=>{C&&q("start")},[C]),(0,n.useEffect)(()=>{const e=e=>{H.current&&!H.current.contains(e.target)&&$()};return C&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[C,$]);const W=(0,n.useCallback)(()=>{0===P?(O(11),M(e=>e-1)):O(e=>e-1)},[P]),G=(0,n.useCallback)(()=>{11===P?(O(0),M(e=>e+1)):O(e=>e+1)},[P]),U=(e,r)=>{const t=((e,r)=>new Date(e,r+1,0).getDate())(e,r),n=((e,r)=>new Date(e,r,1).getDay())(e,r),o=[];for(let a=0;a<n;a++)o.push(null);for(let a=1;a<=t;a++)o.push(new Date(e,r,a));return(0,s.jsxs)(j,{children:[(0,s.jsx)(w,{children:x(e,r)}),(0,s.jsx)(F,{children:i.map(e=>(0,s.jsx)(A,{children:e},e))}),(0,s.jsx)(k,{children:o.map((e,r)=>{if(!e)return(0,s.jsx)(S,{},`e-${r}`);const{isStart:t,isEnd:n,isInRange:o,isHoverEnd:i}=(e=>{const r=R&&c(e,R),t=I&&c(e,I),n="end"===N&&Y?Y:I;let a=!1;if(R&&n){const[r,t]=R<=n?[R,n]:[n,R];a=((e,r,t)=>{const n=e.getTime();return n>r.getTime()&&n<t.getTime()})(e,r,t)}return{isStart:r,isEnd:t,isInRange:a,isHoverEnd:"end"===N&&Y&&c(e,Y)}})(e),l=c(e,B);return(0,s.jsx)(D,{$isStart:!!t,$isEnd:!!n,$isInRange:o,$isHoverEnd:!!i,$isToday:l,onClick:()=>(e=>{if("start"===N)z(e),_(null),q("end");else{let r=R,t=e;t<r&&([r,t]=[t,r]),z(r),_(t),q("start"),a(d(r),d(t)),setTimeout($,200)}})(e),onMouseEnter:()=>L(e),onMouseLeave:()=>L(null),children:e.getDate()},e.getTime())})})]})},V=11===P?0:P+1,Q=11===P?T+1:T,Z=e=>{const r=new Date;let t;const n=r;switch(e){case"this_week":t=new Date(r),t.setDate(r.getDate()-r.getDay());break;case"this_month":t=new Date(r.getFullYear(),r.getMonth(),1);break;case"this_year":t=new Date(r.getFullYear(),0,1);break;default:return}z(t),_(n),q("start"),a(d(t),d(n)),setTimeout($,150)};return C?(0,s.jsx)(h,{ref:H,children:(0,s.jsxs)(p,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{onClick:()=>Z("this_week"),children:"This Week"}),(0,s.jsx)(g,{onClick:()=>Z("this_month"),children:"This Month"}),(0,s.jsx)(g,{onClick:()=>Z("this_year"),children:"This Year"})]}),(0,s.jsxs)(m,{children:[(0,s.jsxs)(f,{children:[(0,s.jsx)(b,{onClick:W,"aria-label":"Previous month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,s.jsx)(b,{onClick:G,"aria-label":"Next month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,s.jsxs)(v,{children:[U(T,P),(0,s.jsx)(y,{children:U(Q,V)})]})]})]})}):null},C=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,r)=>{const t=(e=>{if(!e)return new Date;try{const r=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[t,n,a]=r.split("-").map(Number);return new Date(t,n-1,a)}catch{return new Date}})(r);let n=new Date(t);const a=new Date(t);switch(e){case"today":break;case"yesterday":n.setDate(t.getDate()-1),a.setDate(t.getDate()-1);break;case"week":n.setDate(t.getDate()-6);break;case"month":n.setDate(t.getDate()-29);break;case"year":n.setDate(t.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:C(n),end:C(a)}},B=a.Ay.div`
  margin-bottom: 24px;
`,P=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,O=a.Ay.button`
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
`,T=a.Ay.div`
  position: relative;
  display: inline-block;
`,M=a.Ay.button`
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
`,R=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:a,onPeriodChange:i,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:x}=(0,o.Bd)("common"),[h,p]=(0,n.useState)(!1),u=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],g={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,s.jsx)(B,{children:(0,s.jsxs)(P,{children:[u.map(e=>(0,s.jsx)(O,{active:r===e&&!a,onClick:()=>i(e),children:g[e]},e)),(0,s.jsxs)(T,{children:[(0,s.jsxs)(M,{active:a,onClick:()=>p(!h),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,s.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,s.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,s.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,s.jsx)($,{isOpen:h,startDate:t.start,endDate:t.end,onRangeSelect:(e,r)=>{d(e,r),p(!1)},onClose:()=>p(!1)})]}),c]})})}},4021:(e,r,t)=>{t.d(r,{i1:()=>i});var n=t(9950),a=t(1367),o=t(6038),s=t(9955);const i=()=>{const{user:e}=(0,a.As)(),[r,t]=(0,n.useState)("RM"),[i]=(0,n.useState)(Object.keys(o.DL)),[d,l]=(0,n.useState)(!0),[c,x]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),n=r.indexOf("restaurant");let a=n>=0?r[n+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void l(!1);try{const e=(0,s.c4)(),r=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var o;const e=await r.json(),n=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"MYR";t(n)}else t("MYR")}catch(i){console.error("Failed to fetch restaurant currency:",i),x("Failed to load currency settings"),t("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:i,loading:d,error:c}}},4987:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Y});var n=t(9950),a=t(4752),o=t(2853),s=t(8409),i=t(512),d=t(4021),l=t(6038),c=t(5030),x=t(9955),h=t(4414);const p=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`,u=a.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,g=a.Ay.input`
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
`,m=a.Ay.div`
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
`,f=a.Ay.div`
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
`,b=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,v=a.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,y=a.Ay.button`
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
`,j=a.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,w=a.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin-right: 4px;
`,F=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,A=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,k=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,S=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,D=a.Ay.span`
  font-size: 12px;
  color: #6B7280;
  background: #F3F4F6;
  padding: 4px 8px;
  border-radius: 4px;
`,$=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,C=a.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,E=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,B=a.Ay.span`
  font-size: 11px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${e=>e.positive?"#ECFDF5":"#FEE2E2"};
`,P=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,O=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`,T=a.Ay.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,M=a.Ay.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${e=>1===e.rank?"#FFD700":2===e.rank?"#C0C0C0":3===e.rank?"#CD7F32":"#E5E7EB"};
  color: ${e=>e.rank<=3?"white":"#6B7280"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  margin-right: 16px;
  flex-shrink: 0;
`,R=a.Ay.div`
  flex: 1;
  min-width: 0;
`,z=a.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,I=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
`,_=a.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,Y=()=>{const{t:e}=(0,c.Bd)("brand"),[r,t]=(0,n.useState)("month"),[a,Y]=(0,n.useState)(()=>(0,i.x)("month")),[L,N]=(0,n.useState)(!1),[q,H]=(0,n.useState)("all"),[W,G]=(0,n.useState)("all"),[U,V]=(0,n.useState)("sales"),[Q,Z]=(0,n.useState)(""),[J,K]=(0,n.useState)(""),[X,ee]=(0,n.useState)(!1),[re,te]=(0,n.useState)(!1),[ne,ae]=(0,n.useState)([]),[oe,se]=(0,n.useState)([]),{defaultCurrency:ie}=(0,d.i1)(),[de,le]=(0,n.useState)("RM");(0,n.useEffect)(()=>{ie&&le(ie)},[ie]);const[ce,xe]=(0,n.useState)([]),[he,pe]=(0,n.useState)([]),[ue,ge]=(0,n.useState)([]),[me,fe]=(0,n.useState)(!0);(0,n.useEffect)(()=>{be()},[]),(0,n.useEffect)(()=>{he.length>0&&ve()},[he,a.start,a.end]);const be=async()=>{try{fe(!0);const e=(0,x.c4)(),[r,t]=await Promise.all([fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}}),fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}})]);let n=[];r.ok&&(n=await r.json(),xe(n));const a=new Map;if(n.forEach(e=>{a.set(e.id,e)}),t.ok){const e=(await t.json()).map(e=>{const r=e.brand_id?a.get(e.brand_id):null;return{id:e.id,name:e.name,brandId:e.brand_id||0,brandName:(null===r||void 0===r?void 0:r.name)||"No Brand",brandCode:(null===r||void 0===r?void 0:r.code)||"-",currency:(null===r||void 0===r?void 0:r.currency)||e.currency||"MYR"}});pe(e),0===e.length&&fe(!1)}else fe(!1)}catch(e){console.error("Error fetching data:",e),fe(!1)}},ve=async()=>{try{fe(!0);const e=(0,x.c4)();if(0===he.length)return ge([]),void fe(!1);const r=he.map(async r=>{try{const t=await fetch(`/api/orders?restaurant_id=${r.id}&start_date=${a.start}&end_date=${a.end}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();console.log(`[Performance] Restaurant ${r.id} (${r.name}) orders response:`,e);let n=[];return Array.isArray(e)?n=e:e.data&&Array.isArray(e.data)?n=e.data:e.orders&&Array.isArray(e.orders)&&(n=e.orders),console.log(`[Performance] Restaurant ${r.id} parsed orders:`,n.length,"orders"),n}return[]}catch(t){return console.error(`[Performance] Error fetching orders for restaurant ${r.id}:`,t),[]}}),t=(await Promise.all(r)).flat();console.log("[Performance] Total orders fetched:",t.length),console.log("[Performance] Sample orders:",t.slice(0,3)),ge(t)}catch(e){console.error("Error fetching orders:",e)}finally{fe(!1)}},ye=(0,n.useMemo)(()=>{const e=new Date(a.start),r=new Date(a.end),t=Math.ceil((r.getTime()-e.getTime())/864e5),n=new Date(e);n.setDate(n.getDate()-1);const o=new Date(n);o.setDate(o.getDate()-t);const s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:s(o),end:s(n)}},[a.start,a.end]),je=(0,n.useMemo)(()=>{if(0===he.length)return[];const e=new Date(a.start);e.setHours(0,0,0,0);const r=new Date(a.end);r.setHours(23,59,59,999);const t=new Date(ye.start);t.setHours(0,0,0,0);const n=new Date(ye.end);return n.setHours(23,59,59,999),he.map(a=>{const o=ue.filter(e=>Number(e.restaurant_id)===Number(a.id));console.log(`[Performance] Restaurant ${a.id} (${a.name}):`,{totalOrdersInState:ue.length,restaurantOrders:o.length,sampleOrder:o[0]});const s=o.filter(t=>{const n=new Date(t.order_date||t.createdAt);return n>=e&&n<=r});console.log(`[Performance] Restaurant ${a.id} date filter:`,{startDate:e.toISOString(),endDate:r.toISOString(),currentPeriodOrders:s.length});const i=o.filter(e=>{const r=new Date(e.order_date||e.createdAt);return r>=t&&r<=n}),d=s.filter(e=>"completed"===e.status),l=i.filter(e=>"completed"===e.status);console.log(`[Performance] Restaurant ${a.id} completed:`,{completedOrders:d.length,statuses:s.map(e=>e.status).filter((e,r,t)=>t.indexOf(e)===r)});const c=d.reduce((e,r)=>e+parseFloat(r.total_amount||"0"),0),x=l.reduce((e,r)=>e+parseFloat(r.total_amount||"0"),0),h=x>0?(c-x)/x*100:c>0?100:0,p=d.length>0?c/d.length:0,u=d.reduce((e,r)=>{const t=parseFloat(r.total_amount||"0");return t>e?t:e},0),g=new Set(s.filter(e=>e.customer_id).map(e=>e.customer_id)).size,m=d.filter(e=>e.served_at&&e.createdAt),f=m.length>0?m.reduce((e,r)=>{const t=new Date(r.createdAt).getTime(),n=(new Date(r.served_at).getTime()-t)/6e4;return e+(n>0?n:0)},0)/m.length:0;return{id:a.id,name:a.name,brandId:a.brandId,brandName:a.brandName,brandCode:a.brandCode,currency:a.currency,totalOrders:s.length,completedOrders:d.length,sales:Math.round(100*c)/100,previousSales:Math.round(100*x)/100,growth:Math.round(10*h)/10,avgOrder:Math.round(100*p)/100,maxOrder:Math.round(100*u)/100,uniqueCustomers:g,avgServiceTime:Math.round(f)}})},[he,ue,a.start,a.end,ye]),we=(0,n.useMemo)(()=>{let e=je;return"all"!==q&&(e=e.filter(e=>e.brandId.toString()===q)),"all"!==W&&(e=e.filter(e=>e.id.toString()===W)),e},[je,q,W]),Fe=(0,n.useMemo)(()=>[...we].sort((e,r)=>{switch(U){case"sales":default:return r.sales-e.sales;case"growth":return r.growth-e.growth;case"orders":return r.completedOrders-e.completedOrders;case"customers":return r.uniqueCustomers-e.uniqueCustomers}}),[we,U]),Ae=(0,n.useMemo)(()=>{const e=we.reduce((e,r)=>e+r.sales,0),r=we.length,t=we.reduce((e,r)=>e+r.completedOrders,0),n=we.reduce((e,r)=>e+r.previousSales,0),a=we.reduce((e,r)=>e+r.uniqueCustomers,0),o=Math.max(...we.map(e=>e.maxOrder),0),s=t>0?e/t:0,i=we.filter(e=>e.avgServiceTime>0),d=i.length>0?i.reduce((e,r)=>e+r.avgServiceTime,0)/i.length:0,l=n>0?(e-n)/n*100:e>0?100:0;return{totalSales:e,totalRestaurants:r,totalOrders:t,totalCustomers:a,maxOrderValue:o,overallAvgOrder:Math.round(100*s)/100,overallAvgServiceTime:Math.round(d),overallGrowth:Math.round(10*l)/10}},[we]),ke=(e,r)=>{const t=r||de;return(0,l.vv)(e,t)},Se=L?`${a.start} ~ ${a.end}`:{today:"Today",week:"This Week",month:"This Month",year:"This Year",all:"All Time"}[r]||r;return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(s.mc,{children:[(0,h.jsxs)(s.Y9,{children:[(0,h.jsx)("div",{children:(0,h.jsx)(s.hE,{children:e("brand:brandPerformance.performance")})}),(0,h.jsx)(s.ex,{children:(0,h.jsx)(s.$n,{variant:"primary",children:e("brand:brandPerformance.exportReport")})})]}),(0,h.jsxs)(s.UC,{children:[(0,h.jsxs)(p,{children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(g,{type:"text",placeholder:"All Brands",value:Q,onChange:e=>{return r=e.target.value,Z(r),void(0===r.length?ae(ce.slice(0,10)):ae(ce.filter(e=>e.name.toLowerCase().includes(r.toLowerCase())).slice(0,10)));var r},onFocus:()=>{ee(!0),0===Q.length&&ae(ce.slice(0,10))},onBlur:()=>setTimeout(()=>ee(!1),200)}),"all"!==q&&Q&&(0,h.jsx)(y,{onClick:()=>{H("all"),Z(""),G("all"),K("")},children:"\xd7"}),(0,h.jsxs)(m,{show:X,children:[(0,h.jsxs)(f,{onClick:()=>{H("all"),Z(""),ee(!1),G("all"),K("")},children:[(0,h.jsx)(b,{children:e("brand:brandPerformance.allBrands")}),(0,h.jsx)(v,{children:e("brand:brandPerformance.showAllBrandData")})]}),ne.map(e=>(0,h.jsxs)(f,{onClick:()=>(e=>{H(e.id.toString()),Z(e.name),ee(!1),G("all"),K("")})(e),children:[(0,h.jsx)(b,{children:e.name}),(0,h.jsxs)(v,{children:[e.code," ",e.currency?`\u2022 ${(0,l.Qn)(e.currency)}`:""]})]},e.id))]})]}),(0,h.jsxs)(u,{children:[(0,h.jsx)(g,{type:"text",placeholder:"All Restaurants",value:J,onChange:e=>(e=>{K(e);let r=he;"all"!==q&&(r=he.filter(e=>e.brandId.toString()===q)),0===e.length?se(r.slice(0,10)):se(r.filter(r=>r.name.toLowerCase().includes(e.toLowerCase())).slice(0,10))})(e.target.value),onFocus:()=>{te(!0);let e=he;"all"!==q&&(e=he.filter(e=>e.brandId.toString()===q)),se(e.slice(0,10))},onBlur:()=>setTimeout(()=>te(!1),200)}),"all"!==W&&J&&(0,h.jsx)(y,{onClick:()=>{G("all"),K("")},children:"\xd7"}),(0,h.jsxs)(m,{show:re,children:[(0,h.jsxs)(f,{onClick:()=>{G("all"),K(""),te(!1)},children:[(0,h.jsx)(b,{children:e("brand:brandPerformance.allRestaurants")}),(0,h.jsx)(v,{children:e("brand:brandPerformance.showAllRestaurantData")})]}),oe.map(e=>(0,h.jsxs)(f,{onClick:()=>(e=>{G(e.id.toString()),K(e.name),te(!1)})(e),children:[(0,h.jsx)(b,{children:e.name}),(0,h.jsx)(v,{children:e.brandName||"Independent"})]},e.id))]})]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap",marginBottom:"8px"},children:[(0,h.jsx)("div",{style:{flex:1},children:(0,h.jsx)(i.A,{activePeriod:r,dateRange:a,isCustomDateRange:L,onPeriodChange:e=>{t(e),N(!1),Y((0,i.x)(e))},onCalendarRangeSelect:(e,r)=>{N(!0),t("all"),Y({start:e,end:r})}})}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,h.jsx)(w,{children:"Sort by:"}),(0,h.jsxs)(j,{value:U,onChange:e=>V(e.target.value),children:[(0,h.jsx)("option",{value:"sales",children:e("brand:brandPerformance.revenue")}),(0,h.jsx)("option",{value:"growth",children:e("brand:brandPerformance.growth")}),(0,h.jsx)("option",{value:"orders",children:e("brand:brandPerformance.orders")}),(0,h.jsx)("option",{value:"customers",children:e("brand:brandPerformance.customers")})]})]})]}),(0,h.jsxs)(s.MD,{children:[(0,h.jsxs)(s.hI,{color:"#635BFF",children:[(0,h.jsx)(s.Os,{children:ke(Ae.totalSales)}),(0,h.jsx)(s.v0,{children:e("brand:brandPerformance.totalRevenue")}),(0,h.jsx)(s.d1,{children:Se})]}),(0,h.jsxs)(s.hI,{color:"#10B981",children:[(0,h.jsx)(s.Os,{children:Ae.totalOrders.toLocaleString()}),(0,h.jsx)(s.v0,{children:e("brand:brandPerformance.totalOrders")}),(0,h.jsx)(s.d1,{children:e("brand:brandPerformance.completedOrders")})]}),(0,h.jsxs)(s.hI,{color:"#F59E0B",children:[(0,h.jsx)(s.Os,{children:Ae.totalCustomers.toLocaleString()}),(0,h.jsx)(s.v0,{children:e("brand:brandPerformance.customers")}),(0,h.jsx)(s.d1,{children:e("brand:brandPerformance.uniqueCustomers")})]}),(0,h.jsxs)(s.hI,{color:"#8B5CF6",children:[(0,h.jsx)(s.Os,{children:ke(Ae.overallAvgOrder)}),(0,h.jsx)(s.v0,{children:e("brand:brandPerformance.avgOrder")}),(0,h.jsx)(s.d1,{children:e("brand:brandPerformance.perOrderValue")})]})]}),(0,h.jsxs)(s.MD,{style:{marginTop:"-16px"},children:[(0,h.jsxs)(s.hI,{color:"#EC4899",children:[(0,h.jsx)(s.Os,{children:ke(Ae.maxOrderValue)}),(0,h.jsx)(s.v0,{children:e("brand:brandPerformance.maxOrder")}),(0,h.jsx)(s.d1,{children:e("brand:brandPerformance.highestOrderValue")})]}),(0,h.jsxs)(s.hI,{color:"#06B6D4",children:[(0,h.jsx)(s.Os,{children:Ae.overallAvgServiceTime>0?`${Ae.overallAvgServiceTime} min`:"N/A"}),(0,h.jsx)(s.v0,{children:e("brand:brandPerformance.avgFulfillmentTime")}),(0,h.jsx)(s.d1,{children:e("brand:brandPerformance.orderToServed")})]}),(0,h.jsxs)(s.hI,{color:"#F97316",children:[(0,h.jsxs)(s.Os,{children:[Ae.overallGrowth>0?"+":"",Ae.overallGrowth,"%"]}),(0,h.jsx)(s.v0,{children:e("brand:brandPerformance.growth")}),(0,h.jsx)(s.d1,{children:"vs previous period"})]}),(0,h.jsxs)(s.hI,{color:"#14B8A6",children:[(0,h.jsx)(s.Os,{children:Ae.totalRestaurants}),(0,h.jsx)(s.v0,{children:e("brand:brandPerformance.restaurants")}),(0,h.jsx)(s.d1,{children:"all"===q?"All brands":"Selected brand"})]})]}),me?(0,h.jsx)(o.pp,{children:(0,h.jsx)("p",{children:e("brand:brandPerformance.loadingPerformanceData")})}):0===Fe.length?(0,h.jsxs)(o.pp,{children:[(0,h.jsx)("h3",{children:e("brand:brandPerformance.noDataAvailable")}),(0,h.jsx)("p",{children:e("brand:brandPerformance.noPerformanceDataFoundForTheSelectedPeriod")})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(F,{children:Fe.map(r=>(0,h.jsxs)(A,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)(S,{children:r.name}),(0,h.jsx)(D,{children:r.brandCode})]}),(0,h.jsxs)($,{children:[(0,h.jsx)(C,{children:e("brand:brandPerformance.revenue")}),(0,h.jsxs)(E,{children:[ke(r.sales,r.currency),0!==r.growth&&(0,h.jsxs)(B,{positive:r.growth>0,children:[r.growth>0?"+":"",r.growth,"%"]})]})]}),(0,h.jsxs)($,{children:[(0,h.jsx)(C,{children:e("brand:brandPerformance.orders")}),(0,h.jsxs)(E,{children:[r.completedOrders.toLocaleString()," completed"]})]}),(0,h.jsxs)($,{children:[(0,h.jsx)(C,{children:e("brand:brandPerformance.customers")}),(0,h.jsxs)(E,{children:[r.uniqueCustomers.toLocaleString()," unique"]})]}),(0,h.jsxs)($,{children:[(0,h.jsx)(C,{children:e("brand:brandPerformance.avgOrder")}),(0,h.jsx)(E,{children:r.avgOrder>0?ke(r.avgOrder,r.currency):"N/A"})]}),(0,h.jsxs)($,{children:[(0,h.jsx)(C,{children:e("brand:brandPerformance.maxOrder")}),(0,h.jsx)(E,{children:r.maxOrder>0?ke(r.maxOrder,r.currency):"N/A"})]}),(0,h.jsxs)($,{children:[(0,h.jsx)(C,{children:e("brand:brandPerformance.avgFulfillment")}),(0,h.jsx)(E,{children:r.avgServiceTime>0?`${r.avgServiceTime} min`:"N/A"})]})]},r.id))}),(0,h.jsxs)(P,{children:[(0,h.jsxs)(O,{children:["Restaurant Ranking (",Se,")"]}),Fe.slice(0,10).map((e,r)=>(0,h.jsxs)(T,{children:[(0,h.jsx)(M,{rank:r+1,children:r+1}),(0,h.jsxs)(R,{children:[(0,h.jsx)(z,{children:e.name}),(0,h.jsxs)(I,{children:[(0,h.jsxs)(_,{children:["Revenue: ",ke(e.sales,e.currency)]}),(0,h.jsxs)(_,{children:["Orders: ",e.completedOrders]}),(0,h.jsxs)(_,{children:["Customers: ",e.uniqueCustomers]}),(0,h.jsxs)(_,{children:["Growth: ",e.growth>0?"+":"",e.growth,"%"]})]})]})]},e.id))]})]})]})]})})}}}]);