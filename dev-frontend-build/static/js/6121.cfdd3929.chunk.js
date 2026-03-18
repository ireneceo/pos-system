"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6121],{512:(e,t,r)=>{r.d(t,{x:()=>C,A:()=>T});var a=r(9950),n=r(4752),i=r(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,r,a]=e.split("-").map(Number);return new Date(t,r-1,a)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=n.Ay.div`
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
`,h=n.Ay.div`
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
`,u=n.Ay.div``,m=n.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,y=n.Ay.button`
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
`,b=n.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=n.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,F=n.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,w=n.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,v=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,j=n.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,S=n.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,A=n.Ay.div`
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
`,E=e=>{let{startDate:t,endDate:r,onRangeSelect:n,onClose:E,isOpen:D}=e;const C=new Date,[$,B]=(0,a.useState)(C.getMonth()),[R,z]=(0,a.useState)(C.getFullYear()),[O,T]=(0,a.useState)(null),[M,I]=(0,a.useState)(null),[Y,L]=(0,a.useState)(null),[W,_]=(0,a.useState)("start"),U=(0,a.useRef)(null);(0,a.useEffect)(()=>{t&&T(d(t)),r&&I(d(r))},[t,r]),(0,a.useEffect)(()=>{D&&_("start")},[D]),(0,a.useEffect)(()=>{const e=e=>{U.current&&!U.current.contains(e.target)&&E()};return D&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[D,E]);const V=(0,a.useCallback)(()=>{0===$?(B(11),z(e=>e-1)):B(e=>e-1)},[$]),H=(0,a.useCallback)(()=>{11===$?(B(0),z(e=>e+1)):B(e=>e+1)},[$]),P=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),a=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let n=0;n<a;n++)d.push(null);for(let n=1;n<=r;n++)d.push(new Date(e,t,n));return(0,i.jsxs)(F,{children:[(0,i.jsx)(w,{children:c(e,t)}),(0,i.jsx)(v,{children:o.map(e=>(0,i.jsx)(j,{children:e},e))}),(0,i.jsx)(k,{children:d.map((e,t)=>{if(!e)return(0,i.jsx)(S,{},`e-${t}`);const{isStart:r,isEnd:a,isInRange:o,isHoverEnd:d}=(e=>{const t=O&&l(e,O),r=M&&l(e,M),a="end"===W&&Y?Y:M;let n=!1;if(O&&a){const[t,r]=O<=a?[O,a]:[a,O];n=((e,t,r)=>{const a=e.getTime();return a>t.getTime()&&a<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:n,isHoverEnd:"end"===W&&Y&&l(e,Y)}})(e),c=l(e,C);return(0,i.jsx)(A,{$isStart:!!r,$isEnd:!!a,$isInRange:o,$isHoverEnd:!!d,$isToday:c,onClick:()=>(e=>{if("start"===W)T(e),I(null),_("end");else{let t=O,r=e;r<t&&([t,r]=[r,t]),T(t),I(r),_("start"),n(s(t),s(r)),setTimeout(E,200)}})(e),onMouseEnter:()=>L(e),onMouseLeave:()=>L(null),children:e.getDate()},e.getTime())})})]})},N=11===$?0:$+1,J=11===$?R+1:R,Z=e=>{const t=new Date;let r;const a=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}T(r),I(a),_("start"),n(s(r),s(a)),setTimeout(E,150)};return D?(0,i.jsx)(p,{ref:U,children:(0,i.jsxs)(x,{children:[(0,i.jsxs)(h,{children:[(0,i.jsx)(g,{onClick:()=>Z("this_week"),children:"This Week"}),(0,i.jsx)(g,{onClick:()=>Z("this_month"),children:"This Month"}),(0,i.jsx)(g,{onClick:()=>Z("this_year"),children:"This Year"})]}),(0,i.jsxs)(u,{children:[(0,i.jsxs)(m,{children:[(0,i.jsx)(y,{onClick:V,"aria-label":"Previous month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,i.jsx)(y,{onClick:H,"aria-label":"Next month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,i.jsxs)(b,{children:[P(R,$),(0,i.jsx)(f,{children:P(J,N)})]})]})]})}):null},D=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,C=(e,t)=>{const r=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[r,a,n]=t.split("-").map(Number);return new Date(r,a-1,n)}catch{return new Date}})(t);let a=new Date(r);const n=new Date(r);switch(e){case"today":break;case"week":a.setDate(r.getDate()-6);break;case"month":a.setDate(r.getDate()-29);break;case"year":a.setDate(r.getDate()-364);break;case"all":a=new Date(2020,0,1)}return{start:D(a),end:D(n)}},$=n.Ay.div`
  margin-bottom: 24px;
`,B=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,R=n.Ay.button`
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
`,z=n.Ay.div`
  position: relative;
  display: inline-block;
`,O=n.Ay.button`
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
`,T=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:n,onPeriodChange:o,onCalendarRangeSelect:s,includeToday:d=!1,children:l}=e;const[c,p]=(0,a.useState)(!1),x=d?["today","week","month","year","all"]:["week","month","year","all"],h={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,i.jsx)($,{children:(0,i.jsxs)(B,{children:[x.map(e=>(0,i.jsx)(R,{active:t===e&&!n,onClick:()=>o(e),children:h[e]},e)),(0,i.jsxs)(z,{children:[(0,i.jsxs)(O,{active:n,onClick:()=>p(!c),children:[(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,i.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,i.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,i.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,i.jsx)(E,{isOpen:c,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{s(e,t),p(!1)},onClose:()=>p(!1)})]}),l]})})}},4021:(e,t,r)=>{r.d(t,{i1:()=>o});var a=r(9950),n=r(1367),i=r(6038);const o=()=>{const{user:e}=(0,n.As)(),[t,r]=(0,a.useState)("RM"),[o]=(0,a.useState)(Object.keys(i.DL)),[s,d]=(0,a.useState)(!0),[l,c]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),a=t.indexOf("restaurant");let n=a>=0?t[a+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),a=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";r(a)}else r("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),r("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:s,error:l}}},6121:(e,t,r)=>{r.r(t),r.d(t,{default:()=>O});var a=r(9950),n=r(4752),i=r(4021),o=r(6038),s=r(512),d=r(4414);const l=n.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,c=n.Ay.div`
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
`,p=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,h=n.Ay.button`
  padding: 12px 20px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #5A51E6;
  }
`,g=n.Ay.div`
  padding: 32px;
`,u=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,y=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=n.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,f=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,F=n.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,w=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,v=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,j=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,k=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,S=n.Ay.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    display: none;
  }

  th {
    padding: 14px 16px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* 정렬 규칙: 숫자/금액은 우측, 액션은 우측 */
  th:nth-child(2), th:nth-child(3), th:nth-child(4), th:nth-child(5), th:nth-child(6) { text-align: right; } /* Sales, Orders, Avg, Week, Month */
  th:nth-child(7) { text-align: right; } /* Action */
`,A=n.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`,E=n.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;

  /* 정렬 규칙: 숫자/금액은 우측, 액션은 우측 */
  &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6) { text-align: right; } /* Sales, Orders, Avg, Week, Month */
  &:nth-child(7) { text-align: right; } /* Action */

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
    padding: 0;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    &:last-child {
      flex: 1 1 100%;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F3F4F6;

      &:before {
        display: none;
      }
    }
  }
`,D=n.Ay.div`
  display: flex;
  flex-direction: column;
`,C=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,$=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,B=n.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,R=n.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,z=n.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`,O=()=>{const[e,t]=(0,a.useState)("all"),[r,n]=(0,a.useState)("today"),[O,T]=(0,a.useState)(()=>(0,s.x)("today")),[M,I]=(0,a.useState)(!1),[Y,L]=(0,a.useState)([]),{defaultCurrency:W}=(0,i.i1)(),[_,U]=(0,a.useState)("RM");(0,a.useEffect)(()=>{W&&U(W)},[W]);(0,a.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/restaurants");if(!e.ok)return void console.error("Failed to fetch restaurants");const t=await e.json(),r=(t.data||t).map(e=>({id:e.id.toString(),name:e.name,location:e.address||"Unknown",todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0,averageOrderValue:0,topItems:[],hourlyData:new Array(12).fill(0)}));L(r)}catch(e){console.error("Error fetching sales data:",e)}})()},[]);const V=Y.reduce((e,t)=>({todaySales:e.todaySales+t.todaySales,yesterdaySales:e.yesterdaySales+t.yesterdaySales,weekSales:e.weekSales+t.weekSales,monthSales:e.monthSales+t.monthSales,todayOrders:e.todayOrders+t.todayOrders}),{todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0}),H=V.todayOrders>0?V.todaySales/V.todayOrders:0,P=V.yesterdaySales>0?(V.todaySales-V.yesterdaySales)/V.yesterdaySales*100:0;return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{children:(0,d.jsx)(p,{children:"Sales"})}),(0,d.jsxs)(g,{children:[(0,d.jsxs)("div",{style:{background:"#FAFBFC",padding:"24px 0",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"24px",alignItems:"center"},children:[(0,d.jsxs)(x,{value:e,onChange:e=>t(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Restaurants"}),Y.map(e=>(0,d.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,d.jsx)(s.A,{activePeriod:r,dateRange:O,isCustomDateRange:M,onPeriodChange:e=>{n(e),I(!1),T((0,s.x)(e))},onCalendarRangeSelect:(e,t)=>{I(!0),n("all"),T({start:e,end:t})},includeToday:!0}),(0,d.jsxs)(h,{onClick:()=>{const e={date:(new Date).toISOString(),dateRange:O,totalSales:V.todaySales,totalOrders:V.todayOrders,averageOrderValue:H,restaurants:Y},t=JSON.stringify(e,null,2),r=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(r),n=document.createElement("a");n.href=a,n.download=`sales-report-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(a)},style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,d.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Report"]})]}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(m,{color:"#059669",children:[(0,d.jsx)(y,{children:"Total Sales"}),(0,d.jsx)(f,{children:(0,o.vv)(V.todaySales,_)}),(0,d.jsxs)(b,{positive:P>0,children:[P>0?"\u2191":"\u2193"," ",Math.abs(P).toFixed(1),"% vs yesterday"]})]}),(0,d.jsxs)(m,{color:"#2563EB",children:[(0,d.jsx)(y,{children:"Total Orders"}),(0,d.jsx)(f,{children:V.todayOrders}),(0,d.jsx)(b,{positive:!0,children:"\u2191 12% vs yesterday"})]}),(0,d.jsxs)(m,{color:"#7C3AED",children:[(0,d.jsx)(y,{children:"Average Order Value"}),(0,d.jsx)(f,{children:(0,o.vv)(H,_)}),(0,d.jsx)(b,{positive:!0,children:"\u2191 5.3% vs yesterday"})]}),(0,d.jsxs)(m,{color:"#DC2626",children:[(0,d.jsx)(y,{children:"Active Restaurants"}),(0,d.jsx)(f,{children:Y.length}),(0,d.jsx)(b,{positive:!0,children:"All operational"})]})]}),(0,d.jsxs)(F,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(v,{children:"Sales Trend - All Restaurants"}),(0,d.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Chart visualization will be implemented"})]}),(0,d.jsxs)(w,{children:[(0,d.jsx)(v,{children:"Sales Distribution"}),(0,d.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"\ud83c\udf70 Distribution chart will be implemented"})]})]}),(0,d.jsxs)(w,{children:[(0,d.jsx)(v,{children:"Daily Comparison"}),(0,d.jsx)("div",{style:{height:"250px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Bar chart comparison will be implemented"})]}),(0,d.jsx)(j,{style:{marginTop:"24px"},children:(0,d.jsxs)(k,{children:[(0,d.jsx)(S,{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"Restaurant"}),(0,d.jsx)("th",{children:"Today's Sales"}),(0,d.jsx)("th",{children:"Orders"}),(0,d.jsx)("th",{children:"Avg Order"}),(0,d.jsx)("th",{children:"Week Total"}),(0,d.jsx)("th",{children:"Month Total"}),(0,d.jsx)("th",{children:"Action"})]})}),(0,d.jsx)("tbody",{children:Y.map(e=>{const t=e.yesterdaySales>0?(e.todaySales-e.yesterdaySales)/e.yesterdaySales*100:0;return(0,d.jsxs)(A,{children:[(0,d.jsx)(E,{"data-label":"Restaurant",children:(0,d.jsxs)(D,{children:[(0,d.jsx)(C,{children:e.name}),(0,d.jsx)($,{children:e.location})]})}),(0,d.jsx)(E,{"data-label":"Today's Sales",children:(0,d.jsxs)(B,{children:[(0,o.vv)(e.todaySales,_),(0,d.jsxs)(R,{positive:t>0,children:[t>0?"\u2191":"\u2193"," ",Math.abs(t).toFixed(1),"%"]})]})}),(0,d.jsx)(E,{"data-label":"Orders",children:(0,d.jsx)(B,{children:e.todayOrders})}),(0,d.jsx)(E,{"data-label":"Avg Order",children:(0,d.jsx)(B,{children:(0,o.vv)(e.averageOrderValue,_)})}),(0,d.jsx)(E,{"data-label":"Week Total",children:(0,d.jsx)(B,{children:(0,o.vv)(e.weekSales,_)})}),(0,d.jsx)(E,{"data-label":"Month Total",children:(0,d.jsx)(B,{children:(0,o.vv)(e.monthSales,_)})}),(0,d.jsx)(E,{"data-label":"",children:(0,d.jsx)(z,{children:"View Details"})})]},e.id)})})]})})]})]})})}}}]);