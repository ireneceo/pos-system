"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8248],{512:(e,t,n)=>{n.d(t,{x:()=>B,A:()=>R});var a=n(9950),i=n(4752),r=n(5030),o=n(4414);const s=["Su","Mo","Tu","We","Th","Fr","Sa"],l=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,n,a]=e.split("-").map(Number);return new Date(t,n-1,a)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),p=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=i.Ay.div`
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
`,h=i.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,u=i.Ay.div`
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
`,g=i.Ay.button`
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
`,m=i.Ay.div``,f=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,y=i.Ay.button`
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
`,v=i.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,b=i.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,j=i.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,F=i.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,A=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,w=i.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,C=i.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,S=i.Ay.div`
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
`,_=e=>{let{startDate:t,endDate:n,onRangeSelect:i,onClose:_,isOpen:E}=e;const{t:B}=(0,r.Bd)("common"),$=new Date,[D,z]=(0,a.useState)($.getMonth()),[T,P]=(0,a.useState)($.getFullYear()),[R,I]=(0,a.useState)(null),[N,L]=(0,a.useState)(null),[O,M]=(0,a.useState)(null),[U,W]=(0,a.useState)("start"),Y=(0,a.useRef)(null);(0,a.useEffect)(()=>{t&&I(d(t)),n&&L(d(n))},[t,n]),(0,a.useEffect)(()=>{E&&W("start")},[E]),(0,a.useEffect)(()=>{const e=e=>{Y.current&&!Y.current.contains(e.target)&&_()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,_]);const J=(0,a.useCallback)(()=>{0===D?(z(11),P(e=>e-1)):z(e=>e-1)},[D]),H=(0,a.useCallback)(()=>{11===D?(z(0),P(e=>e+1)):z(e=>e+1)},[D]),K=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),a=((e,t)=>new Date(e,t,1).getDay())(e,t),r=[];for(let i=0;i<a;i++)r.push(null);for(let i=1;i<=n;i++)r.push(new Date(e,t,i));return(0,o.jsxs)(j,{children:[(0,o.jsx)(F,{children:p(e,t)}),(0,o.jsx)(A,{children:s.map(e=>(0,o.jsx)(w,{children:e},e))}),(0,o.jsx)(k,{children:r.map((e,t)=>{if(!e)return(0,o.jsx)(C,{},`e-${t}`);const{isStart:n,isEnd:a,isInRange:r,isHoverEnd:s}=(e=>{const t=R&&c(e,R),n=N&&c(e,N),a="end"===U&&O?O:N;let i=!1;if(R&&a){const[t,n]=R<=a?[R,a]:[a,R];i=((e,t,n)=>{const a=e.getTime();return a>t.getTime()&&a<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:i,isHoverEnd:"end"===U&&O&&c(e,O)}})(e),d=c(e,$);return(0,o.jsx)(S,{$isStart:!!n,$isEnd:!!a,$isInRange:r,$isHoverEnd:!!s,$isToday:d,onClick:()=>(e=>{if("start"===U)I(e),L(null),W("end");else{let t=R,n=e;n<t&&([t,n]=[n,t]),I(t),L(n),W("start"),i(l(t),l(n)),setTimeout(_,200)}})(e),onMouseEnter:()=>M(e),onMouseLeave:()=>M(null),children:e.getDate()},e.getTime())})})]})},G=11===D?0:D+1,V=11===D?T+1:T,q=e=>{const t=new Date;let n;const a=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}I(n),L(a),W("start"),i(l(n),l(a)),setTimeout(_,150)};return E?(0,o.jsx)(x,{ref:Y,children:(0,o.jsxs)(h,{children:[(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{onClick:()=>q("this_week"),children:"This Week"}),(0,o.jsx)(g,{onClick:()=>q("this_month"),children:"This Month"}),(0,o.jsx)(g,{onClick:()=>q("this_year"),children:"This Year"})]}),(0,o.jsxs)(m,{children:[(0,o.jsxs)(f,{children:[(0,o.jsx)(y,{onClick:J,"aria-label":"Previous month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,o.jsx)(y,{onClick:H,"aria-label":"Next month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,o.jsxs)(v,{children:[K(T,D),(0,o.jsx)(b,{children:K(V,G)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,B=(e,t)=>{const n=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[n,a,i]=t.split("-").map(Number);return new Date(n,a-1,i)}catch{return new Date}})(t);let a=new Date(n);const i=new Date(n);switch(e){case"today":break;case"yesterday":a.setDate(n.getDate()-1),i.setDate(n.getDate()-1);break;case"week":a.setDate(n.getDate()-6);break;case"month":a.setDate(n.getDate()-29);break;case"year":a.setDate(n.getDate()-364);break;case"all":a=new Date(2020,0,1)}return{start:E(a),end:E(i)}},$=i.Ay.div`
  margin-bottom: 24px;
`,D=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,z=i.Ay.button`
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
`,T=i.Ay.div`
  position: relative;
  display: inline-block;
`,P=i.Ay.button`
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
`,R=e=>{let{activePeriod:t,dateRange:n,isCustomDateRange:i,onPeriodChange:s,onCalendarRangeSelect:l,includeToday:d=!1,children:c}=e;const{t:p}=(0,r.Bd)("common"),[x,h]=(0,a.useState)(!1),u=d?["today","yesterday","week","month","year","all"]:["week","month","year","all"],g={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,o.jsx)($,{children:(0,o.jsxs)(D,{children:[u.map(e=>(0,o.jsx)(z,{active:t===e&&!i,onClick:()=>s(e),children:g[e]},e)),(0,o.jsxs)(T,{children:[(0,o.jsxs)(P,{active:i,onClick:()=>h(!x),children:[(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,o.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,o.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,o.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),n.start&&n.end?`${n.start} ~ ${n.end}`:"Custom Range"]}),(0,o.jsx)(_,{isOpen:x,startDate:n.start,endDate:n.end,onRangeSelect:(e,t)=>{l(e,t),h(!1)},onClose:()=>h(!1)})]}),c]})})}},4185:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var a=n(4752),i=n(4414);const r=a.Ay.div`
  margin-top: 12px;
`,o=a.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=a.Ay.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  text-decoration: none;
  color: #0A2540;
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }
`,d=a.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=a.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=a.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=a.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const n=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),a=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,i.jsxs)(r,{children:[(0,i.jsxs)(o,{children:["Attachments (",t.length,")"]}),n.length>0&&(0,i.jsx)(x,{children:n.map((e,t)=>(0,i.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},t))}),a.length>0&&(0,i.jsx)(s,{children:a.map((e,t)=>{return(0,i.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(a=e.mimeType,"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(c,{children:e.originalName}),(0,i.jsx)(p,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},t);var n,a})})]})}},4302:(e,t,n)=>{n.d(t,{A:()=>I});var a=n(9950),i=n(4752),r=n(4185),o=n(9061),s=n(5030),l=n(4414);const d=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,c=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,p=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,x=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,h=i.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`,u=i.Ay.div`
  flex: 1;
  min-width: 0;
`,g=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,m=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,f=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,y=i.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,v=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,b=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,j=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,F=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,A=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,w=i.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`,k=i.Ay.div`
  display: flex;
  gap: 4px;
`,C=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,S=i.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,_=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,E=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,B=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,$=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,D=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,z=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,T=i.Ay.input`
  display: none;
`,P=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,R=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7280;
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: #D97706;
    cursor: pointer;
  }
`,I=e=>{let{entityType:t,entityId:n,currentUserId:i,onMarkRead:I}=e;const{t:N}=(0,s.Bd)("common"),[L,O]=(0,a.useState)([]),[M,U]=(0,a.useState)(""),[W,Y]=(0,a.useState)(!1),[J,H]=(0,a.useState)([]),[K,G]=(0,a.useState)(!1),[V,q]=(0,a.useState)(""),[Q,X]=(0,a.useState)(!1),Z=(0,a.useRef)(null),ee=async()=>{try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/comments/${t}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();e.success&&O(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,a.useEffect)(()=>{n&&(ee(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n})}),I&&I(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,n]);const te=async()=>{if(K)return;const e=M.trim(),a=J.length>0;if((e||a)&&!Q){X(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n,content:M.trim(),attachments:a?J:void 0,is_internal:W||void 0})})).ok&&(U(""),H([]),Y(!1),ee())}catch(i){console.error("Error adding comment:",i)}finally{X(!1)}}},ne=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),a=Math.floor(n/6e4);if(a<1)return"Just now";if(a<60)return`${a}m ago`;const i=Math.floor(a/60);if(i<24)return`${i}h ago`;const r=Math.floor(i/24);return r<7?`${r}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:["Comments (",L.length,")"]}),L.length>0?(0,l.jsx)(p,{children:L.map(e=>{var t,n,s;return(0,l.jsxs)(x,{isInternal:e.is_internal,children:[(0,l.jsx)(h,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{children:[(0,l.jsx)(m,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,l.jsx)(f,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,l.jsx)(y,{children:"Internal"}),(0,l.jsx)(v,{children:ne(e.createdAt)}),i&&e.author_id===Number(i)&&(0,l.jsx)(j,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&ee()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(b,{children:e.content.split("\n").map((e,t)=>(0,l.jsxs)(a.Fragment,{children:[t>0&&(0,l.jsx)("br",{}),(0,o.c)(e)]},t))}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(r.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(_,{children:"No comments yet"}),(0,l.jsxs)(F,{children:[(0,l.jsxs)(A,{children:[(0,l.jsx)(w,{value:M,onChange:e=>U(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),te())},placeholder:W?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(k,{children:[(0,l.jsx)(C,{onClick:()=>{var e;return null===(e=Z.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(S,{onClick:te,disabled:!M.trim()&&0===J.length||Q||K,children:"Send"})]})]}),(0,l.jsx)(P,{children:(0,l.jsxs)(R,{children:[(0,l.jsx)("input",{type:"checkbox",checked:W,onChange:e=>Y(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(J.length>0||K||V)&&(0,l.jsxs)(E,{children:[K&&(0,l.jsx)(D,{children:"Uploading..."}),V&&(0,l.jsx)(z,{children:V}),J.map((e,t)=>(0,l.jsxs)(B,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)($,{onClick:()=>(e=>{const t=J[e],n=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),H(t=>t.filter((t,n)=>n!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)(T,{ref:Z,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const n=5-J.length,a=Array.from(t).slice(0,n);if(e.target.value="",0!==a.length){G(!0),q("");try{const e=new FormData;a.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),i=await n.json();i.success&&i.data?H(e=>[...e,...i.data]):q(i.message||"Upload failed")}catch(i){console.error("File upload error:",i),q("File upload failed. Please try again.")}finally{G(!1)}}}})]})}},5370:(e,t,n)=>{n.d(t,{A:()=>b});var a=n(9950),i=n(4752),r=n(4414);const o=i.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,s=i.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=i.i7`
  to { transform: rotate(360deg); }
`,d=i.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=i.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?i.AH`${s} 0.3s ease forwards`:i.AH`${o} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=i.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,x=i.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,h=i.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,u=i.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=i.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,m=i.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 13px;
  font-weight: 700;
`,f=i.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,y=i.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: 700;
`,v=(0,a.forwardRef)((e,t)=>{let{children:n,onSave:i,type:o="input",debounceMs:s=2e3,style:l}=e;const[c,v]=(0,a.useState)("idle"),[b,j]=(0,a.useState)(!1),F=(0,a.useRef)(null),A=(0,a.useRef)(null),w=(0,a.useRef)(null),k=(0,a.useRef)(!0),C=(0,a.useRef)(i);C.current=i;const S=(0,a.useCallback)(()=>{F.current&&clearTimeout(F.current),A.current&&clearTimeout(A.current),w.current&&clearTimeout(w.current)},[]),_=2e3!==s?s:"toggle"===o||"select"===o||"list"===o||"image"===o?300:s,E=(0,a.useCallback)(()=>{S(),j(!1),v("saving"),F.current=setTimeout(async()=>{if(k.current)try{if(await C.current(),!k.current)return;v("saved"),A.current=setTimeout(()=>{k.current&&(j(!0),w.current=setTimeout(()=>{k.current&&(v("idle"),j(!1))},300))},2e3)}catch{if(!k.current)return;v("error"),A.current=setTimeout(()=>{k.current&&(j(!0),w.current=setTimeout(()=>{k.current&&(v("idle"),j(!1))},300))},4e3)}},_)},[_,S]);(0,a.useImperativeHandle)(t,()=>({triggerSave:E}),[E]),(0,a.useEffect)(()=>(k.current=!0,()=>{k.current=!1,S()}),[S]);const B=a.Children.map(n,e=>{if(!a.isValidElement(e))return e;const t=e.props.onChange;return"function"!==typeof t?e:a.cloneElement(e,{onChange:function(){t(...arguments),E()}})}),$="saving"===c?(0,r.jsx)(f,{}):"saved"===c?(0,r.jsx)(m,{children:"\u2713"}):"error"===c?(0,r.jsx)(y,{children:"!"}):null,D="select"===o?x:"toggle"===o?h:"image"===o?u:"list"===o?g:p;return(0,r.jsxs)(d,{$type:o,style:l,children:[B,"idle"!==c&&(0,r.jsx)(D,{$fading:b,children:$})]})});v.displayName="AutoSaveField";const b=v},8248:(e,t,n)=>{n.d(t,{A:()=>ye});var a=n(9950),i=n(4492),r=n(4752),o=n(5030),s=n(1367),l=n(8409),d=n(2488),c=n(512),p=n(4414);const x=["proposal","contracting","setup","active"],h={proposal:{header:"#EEF2FF",headerText:"#4338CA",border:"#C7D2FE"},contracting:{header:"#FFF7ED",headerText:"#C2410C",border:"#FDBA74"},setup:{header:"#F5F3FF",headerText:"#6D28D9",border:"#C4B5FD"},active:{header:"#F0FDF4",headerText:"#15803D",border:"#86EFAC"}},u=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  min-height: 350px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`,g=r.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 12px;
  min-height: 250px;
`,m=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: ${e=>e.bg};
  border-radius: 6px;
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 13px;
  color: ${e=>e.textColor};
`,f=r.Ay.span`
  background: rgba(0,0,0,0.06);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`,y=r.Ay.div`
  background: #fff;
  border: 1px solid ${e=>e.borderColor};
  border-radius: 6px;
  padding: 12px 14px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: box-shadow 0.15s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
`,v=r.Ay.div`
  font-weight: 600;
  font-size: 14px;
  color: #0A2540;
  margin-bottom: 4px;
`,b=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`,j=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,F=r.Ay.span`
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${e=>e.bg||"#F3F4F6"};
  color: ${e=>e.color||"#6B7C93"};
`,A=r.Ay.div`
  font-size: 12px;
  color: #059669;
  font-weight: 500;
  margin-top: 4px;
`,w=r.Ay.div`
  text-align: center;
  padding: 8px;
  font-size: 13px;
  color: #635BFF;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`,k=e=>{let{contracts:t,onCardClick:n,entityType:a}=e;const{t:i}=(0,o.Bd)("contract"),r={proposal:i("stages.proposal","Proposal"),contracting:i("stages.contracting","Contracting"),setup:i("stages.setup","Setup"),active:i("stages.active","Active")},s=x.reduce((e,n)=>(e[n]=t.filter(e=>e.stage===n),e),{}),l=e=>e?new Date(e).toLocaleDateString("en-CA",{month:"2-digit",day:"2-digit"}):"";return(0,p.jsx)(u,{children:x.map(e=>{const t=s[e],o=h[e],d="active"===e?5:10;return(0,p.jsxs)(g,{children:[(0,p.jsxs)(m,{bg:o.header,textColor:o.headerText,children:[(0,p.jsx)("span",{children:r[e]}),(0,p.jsx)(f,{children:t.length})]}),t.slice(0,d).map(e=>(0,p.jsxs)(y,{borderColor:o.border,onClick:()=>n(e.id),children:[(0,p.jsx)(v,{children:e.applicant_name}),e.restaurant&&(0,p.jsx)(A,{children:e.restaurant.name}),e.applicant_phone&&(0,p.jsx)(b,{children:e.applicant_phone}),e.applicant_location&&(0,p.jsx)(b,{children:e.applicant_location}),(0,p.jsxs)(j,{children:[e.contract_type&&(0,p.jsx)(F,{bg:"#EEF2FF",color:"#4338CA",children:e.contract_type}),e.contract_number&&(0,p.jsx)(F,{children:e.contract_number}),e.start_date&&e.end_date&&(0,p.jsxs)(F,{children:[e.start_date.substring(5)," ~ ",e.end_date.substring(5)]}),"setup"===e.stage&&e.tasks&&(0,p.jsxs)(F,{bg:"#F5F3FF",color:"#6D28D9",children:[e.tasks.filter(e=>e.is_completed).length,"/",e.tasks.length," done"]}),"foodcourt"===a&&e.unit&&(0,p.jsxs)(F,{bg:"#ECFDF5",color:"#059669",children:["Unit ",e.unit.unit_number]})]}),(0,p.jsx)(b,{style:{marginTop:"6px"},children:l(e.createdAt||e.created_at)})]},e.id)),t.length>d&&(0,p.jsxs)(w,{children:[i("pipeline.viewAll","View all")," (",t.length,")"]}),0===t.length&&(0,p.jsx)(b,{style:{textAlign:"center",padding:"20px 0"},children:"-"})]},e)})})},C=["proposal","contracting","setup","active"],S=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 0;
`,_=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,E=r.Ay.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  background: ${e=>e.isActive?"#635BFF":e.isPast?"#059669":"#E6EBF1"};
  color: ${e=>e.isActive||e.isPast?"#fff":"#6B7C93"};
`,B=r.Ay.span`
  font-size: 13px;
  font-weight: ${e=>e.isActive?600:400};
  color: ${e=>e.isActive?"#0A2540":e.isPast?"#059669":"#6B7C93"};
`,$=r.Ay.div`
  flex: 1;
  height: 2px;
  background: ${e=>e.isPast?"#059669":"#E6EBF1"};
`,D=e=>{let{currentStage:t}=e;const{t:n}=(0,o.Bd)("contract"),i=C.indexOf(t),r={proposal:n("stages.proposal","Proposal"),contracting:n("stages.contracting","Contracting"),setup:n("stages.setup","Setup"),active:n("stages.active","Active")};return(0,p.jsx)(S,{children:C.map((e,t)=>(0,p.jsxs)(a.Fragment,{children:[(0,p.jsxs)(_,{children:[(0,p.jsx)(E,{isActive:t===i,isPast:t<i,children:t<i?"\u2713":t+1}),(0,p.jsx)(B,{isActive:t===i,isPast:t<i,children:r[e]})]}),t<C.length-1&&(0,p.jsx)($,{isPast:t<i})]},e))})};var z=n(5370),T=n(4302);const P=r.Ay.div`
  width: 100%;
`,R=r.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
  &:hover { text-decoration: underline; }
`,I=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,N=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,L=r.Ay.span`
  padding: 4px 14px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${e=>e.color};
  background: ${e=>e.bg};
`,O=r.Ay.div`
  background: #fff;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,M=r.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #F3F4F6;
`,U=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,W=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Y=r.Ay.label`
  font-size: 12px;
  font-weight: 500;
  color: #6B7C93;
`,J=r.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
  &:disabled { background: #F8FAFC; color: #6B7C93; }
`,H=r.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  outline: none;
  resize: vertical;
  min-height: 60px;
  box-sizing: border-box;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,K=r.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: #635BFF; }
  &:disabled { background: #F8FAFC; }
`,G=r.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
`,V=r.Ay.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.15s;

  background: ${e=>"danger"===e.variant?"#DC2626":"secondary"===e.variant?"#F3F4F6":"#635BFF"};
  color: ${e=>"secondary"===e.variant?"#0A2540":"#fff"};

  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,q=r.Ay.div`
  color: #DC2626;
  font-size: 13px;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: #FEE2E2;
  border-radius: 6px;
`,Q=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`,X=(r.Ay.div`
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`,r.Ay.p`
  font-size: 14px;
  color: #0A2540;
  margin: 0 0 4px 0;
`,r.Ay.span`
  font-size: 12px;
  color: #6B7C93;
`),Z=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`,ee=r.Ay.div`
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`,te=r.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  margin-top: 6px;
  flex-shrink: 0;
`,ne=r.Ay.div`
  font-size: 13px;
  color: #0A2540;
`,ae=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`,ie=r.Ay.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,re=r.Ay.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  max-width: 440px;
  width: 90%;
  box-shadow: 0 20px 25px rgba(0,0,0,0.1);
`,oe={proposal:{bg:"#DBEAFE",color:"#2563EB"},contracting:{bg:"#FEF3C7",color:"#D97706"},setup:{bg:"#FEF3C7",color:"#D97706"},active:{bg:"#ECFDF5",color:"#059669"},terminated:{bg:"#F3F4F6",color:"#6B7280"},renewed:{bg:"#EDE9FE",color:"#7C3AED"}},se=e=>{var t,n,i,r,l,d,c,x,h,u,g,m,f;let{contractId:y,entityType:v,onBack:b}=e;const{t:j}=(0,o.Bd)("contract"),{user:F}=(0,s.As)(),[A,w]=(0,a.useState)(null),[k,C]=(0,a.useState)(!0),[S,_]=(0,a.useState)({}),[E,B]=(0,a.useState)(null),$=a.useRef({}),[se,le]=(0,a.useState)(""),[de,ce]=(0,a.useState)(""),[pe,xe]=(0,a.useState)(!1),[he,ue]=(0,a.useState)(""),[ge,me]=(0,a.useState)(""),[fe,ye]=(0,a.useState)([]),[ve,be]=(0,a.useState)(!1),je=a.useRef(null),Fe=()=>localStorage.getItem("auth_token"),Ae=()=>({"Content-Type":"application/json",Authorization:`Bearer ${Fe()}`}),we=(0,a.useCallback)(async()=>{try{const e=await fetch(`/api/contracts/${y}`,{headers:{Authorization:`Bearer ${Fe()}`}}),t=await e.json();t.success&&(w(t.data),_(t.data),B(null))}catch{B("Failed to load contract")}finally{C(!1)}},[y]);(0,a.useEffect)(()=>{we()},[we]),a.useEffect(()=>{$.current=S},[S]);const ke=async()=>{B(null);const e=await fetch(`/api/contracts/${y}`,{method:"PUT",headers:Ae(),body:JSON.stringify($.current)}),t=await e.json();if(!t.success)throw new Error(t.message||"Save failed")},Ce=async()=>{if(de.trim())try{await fetch(`/api/contracts/${y}/tasks`,{method:"POST",headers:Ae(),body:JSON.stringify({title:de})}),ce(""),await we()}catch{}},Se=(e,t)=>{_(n=>({...n,[e]:t}))},_e=(e,t)=>{_(n=>({...n,financial_terms:{...n.financial_terms,[e]:t}}))};if(k)return(0,p.jsx)(P,{children:(0,p.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7C93"},children:"Loading..."})});if(!A)return(0,p.jsx)(P,{children:(0,p.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7C93"},children:"Contract not found"})});const Ee=oe[A.stage]||{color:"#6B7280",bg:"#F3F4F6"},Be=["proposal","contracting","setup"].includes(A.stage),$e={proposal:"contracting",contracting:"setup",setup:"active"}[A.stage],De={contracting:j("detail.proceedToContracting","Proceed to Contracting"),setup:j("detail.proceedToSetup","Proceed to Setup"),active:j("detail.startOperations","Start Operations")};return(0,p.jsxs)(P,{children:[(0,p.jsxs)(R,{onClick:b,children:["\u2190 ",j("detail.backToList","Back to list")]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(N,{children:(null===(t=A.restaurant)||void 0===t?void 0:t.name)||A.applicant_name}),(0,p.jsx)(L,{bg:Ee.bg,color:Ee.color,children:A.stage})]}),!["terminated","renewed","expired"].includes(A.stage)&&(0,p.jsx)(D,{currentStage:A.stage}),E&&(0,p.jsx)(q,{children:E}),(0,p.jsxs)(O,{children:[(0,p.jsx)(M,{children:j("detail.applicantInfo","Applicant Information")}),(0,p.jsxs)(U,{children:[(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.name","Name")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{value:S.applicant_name||"",onChange:e=>Se("applicant_name",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.email","Email")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{value:S.applicant_email||"",onChange:e=>Se("applicant_email",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.phone","Phone")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{value:S.applicant_phone||"",onChange:e=>Se("applicant_phone",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.businessType","Business Type")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{value:S.applicant_business_type||"",onChange:e=>Se("applicant_business_type",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:"brand"===v?j("detail.location","Location"):j("detail.preferredUnit","Preferred Unit")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{value:S.applicant_location||"",onChange:e=>Se("applicant_location",e.target.value),disabled:!Be})})]})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(M,{children:j("detail.linkRestaurant","Link Restaurant")}),A.restaurant?(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"#F0FDF4",borderRadius:"8px",border:"1px solid #BBF7D0"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"15px"},children:A.restaurant.name}),A.restaurant.address&&(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7C93",marginTop:"2px"},children:A.restaurant.address}),A.restaurant.phone&&(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:A.restaurant.phone})]}),Be&&(0,p.jsx)(V,{variant:"secondary",onClick:async()=>{try{const e=await fetch(`/api/contracts/${y}`,{method:"PUT",headers:Ae(),body:JSON.stringify({restaurant_id:null})});(await e.json()).success&&await we()}catch{}},style:{fontSize:"12px",padding:"6px 12px"},children:j("detail.unlink","Unlink")})]}):(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{position:"relative"},children:[(0,p.jsx)(J,{value:ge,onChange:e=>{return t=e.target.value,me(t),je.current&&clearTimeout(je.current),void(t.length<2?ye([]):(be(!0),je.current=setTimeout(async()=>{try{var e;const n=await fetch(`/api/restaurants?search=${encodeURIComponent(t)}`,{headers:{Authorization:`Bearer ${Fe()}`}}),a=await n.json(),i=Array.isArray(a)?a:(null===(e=a.data)||void 0===e?void 0:e.restaurants)||a.data||[];ye(Array.isArray(i)?i.slice(0,10):[])}catch{ye([])}be(!1)},300)));var t},placeholder:j("detail.searchRestaurant","Search restaurant by name..."),disabled:!Be}),ve&&(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px"},children:"Searching..."}),fe.length>0&&(0,p.jsx)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1px solid #E6EBF1",borderRadius:"8px",marginTop:"4px",maxHeight:"200px",overflowY:"auto",zIndex:10,boxShadow:"0 4px 12px rgba(0,0,0,0.1)"},children:fe.map(e=>(0,p.jsxs)("div",{onClick:()=>(async e=>{try{const t=await fetch(`/api/contracts/${y}`,{method:"PUT",headers:Ae(),body:JSON.stringify({restaurant_id:e})}),n=await t.json();n.success?(me(""),ye([]),await we()):B(n.message||"Failed to link restaurant")}catch{B("Failed to link restaurant")}})(e.id),style:{padding:"10px 14px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",fontSize:"14px"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="#fff",children:[(0,p.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:e.name}),e.address&&(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:e.address})]},e.id))})]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginTop:"6px"},children:j("detail.restaurantHint","Link an existing restaurant or leave empty to connect later. Restaurant is required before Active stage.")})]})]}),["contracting","setup","active","terminated","renewed"].includes(A.stage)&&(0,p.jsxs)(O,{children:[(0,p.jsx)(M,{children:j("detail.contractInfo","Contract Information")}),(0,p.jsxs)(U,{children:[(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.contractNumber","Contract Number")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{value:S.contract_number||"",onChange:e=>Se("contract_number",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.contractType","Contract Type")}),(0,p.jsx)(z.A,{onSave:ke,type:"select",debounceMs:300,children:(0,p.jsxs)(K,{value:S.contract_type||"",onChange:e=>Se("contract_type",e.target.value),disabled:!Be,children:[(0,p.jsx)("option",{value:"",children:j("detail.select","Select...")}),"brand"===v?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("option",{value:"franchise",children:"Franchise"}),(0,p.jsx)("option",{value:"license",children:"License"}),(0,p.jsx)("option",{value:"master",children:"Master"}),(0,p.jsx)("option",{value:"direct",children:"Direct"})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("option",{value:"standard",children:"Standard Lease"}),(0,p.jsx)("option",{value:"revenue_share",children:"Revenue Share"}),(0,p.jsx)("option",{value:"popup",children:"Pop-up"})]})]})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.startDate","Start Date")}),(0,p.jsx)(z.A,{onSave:ke,debounceMs:300,children:(0,p.jsx)(J,{type:"date",value:S.start_date||"",onChange:e=>Se("start_date",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.endDate","End Date")}),(0,p.jsx)(z.A,{onSave:ke,debounceMs:300,children:(0,p.jsx)(J,{type:"date",value:S.end_date||"",onChange:e=>Se("end_date",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.durationMonths","Duration (months)")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{type:"number",value:S.duration_months||"",onChange:e=>Se("duration_months",parseInt(e.target.value)||null),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.signingDate","Signing Date")}),(0,p.jsx)(z.A,{onSave:ke,debounceMs:300,children:(0,p.jsx)(J,{type:"date",value:S.signing_date||"",onChange:e=>Se("signing_date",e.target.value),disabled:!Be})})]})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(M,{children:"brand"===v?j("detail.franchiseTerms","Franchise Terms"):j("detail.tenancyTerms","Tenancy Terms")}),(0,p.jsx)(U,{children:"brand"===v?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.franchiseFee","Franchise Fee")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{type:"number",value:(null===(n=S.financial_terms)||void 0===n?void 0:n.franchise_fee)||"",onChange:e=>_e("franchise_fee",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.royaltyPercent","Royalty (%)")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{type:"number",value:(null===(i=S.financial_terms)||void 0===i?void 0:i.royalty_value)||"",onChange:e=>_e("royalty_value",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.marketingFundPercent","Marketing Fund (%)")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{type:"number",value:(null===(r=S.financial_terms)||void 0===r?void 0:r.marketing_fund_value)||"",onChange:e=>_e("marketing_fund_value",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.securityDeposit","Security Deposit")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{type:"number",value:(null===(l=S.financial_terms)||void 0===l?void 0:l.security_deposit)||"",onChange:e=>_e("security_deposit",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.territory","Territory")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{value:(null===(d=S.financial_terms)||void 0===d?void 0:d.territory)||"",onChange:e=>_e("territory",e.target.value),disabled:!Be})})]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.baseRent","Base Rent (monthly)")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{type:"number",value:(null===(c=S.financial_terms)||void 0===c?void 0:c.base_rent)||"",onChange:e=>_e("base_rent",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.revenueSharePercent","Revenue Share (%)")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{type:"number",value:(null===(x=S.financial_terms)||void 0===x?void 0:x.revenue_share_percent)||"",onChange:e=>_e("revenue_share_percent",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.minGuarantee","Min Guarantee")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{type:"number",value:(null===(h=S.financial_terms)||void 0===h?void 0:h.min_guarantee)||"",onChange:e=>_e("min_guarantee",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.maintenanceFee","Maintenance Fee (monthly)")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{type:"number",value:(null===(u=S.financial_terms)||void 0===u?void 0:u.maintenance_fee)||"",onChange:e=>_e("maintenance_fee",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.securityDeposit","Security Deposit")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{type:"number",value:(null===(g=S.financial_terms)||void 0===g?void 0:g.security_deposit)||"",onChange:e=>_e("security_deposit",e.target.value),disabled:!Be})})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Y,{children:j("detail.operatingHours","Operating Hours")}),(0,p.jsx)(z.A,{onSave:ke,children:(0,p.jsx)(J,{value:(null===(m=S.financial_terms)||void 0===m?void 0:m.operating_hours)||"",onChange:e=>_e("operating_hours",e.target.value),disabled:!Be})})]})]})})]}),["setup","active"].includes(A.stage)&&(0,p.jsxs)(O,{children:[(0,p.jsx)(M,{children:j("detail.setupChecklist","Setup Checklist")}),null===(f=A.tasks)||void 0===f?void 0:f.map(e=>(0,p.jsxs)(Q,{children:[(0,p.jsx)("input",{type:"checkbox",checked:e.is_completed,onChange:()=>(async(e,t)=>{try{await fetch(`/api/contracts/${y}/tasks/${e}`,{method:"PUT",headers:Ae(),body:JSON.stringify({is_completed:!t})}),await we()}catch{}})(e.id,e.is_completed),disabled:"active"===A.stage,style:{width:16,height:16}}),(0,p.jsx)("span",{style:{textDecoration:e.is_completed?"line-through":"none",color:e.is_completed?"#6B7C93":"#0A2540",fontSize:"14px",flex:1},children:e.title}),e.completed_at&&(0,p.jsx)(X,{children:new Date(e.completed_at).toLocaleDateString()})]},e.id)),"setup"===A.stage&&(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",marginTop:"12px"},children:[(0,p.jsx)(J,{value:de,onChange:e=>ce(e.target.value),placeholder:j("detail.addTask","Add task..."),onKeyDown:e=>"Enter"===e.key&&Ce(),style:{flex:1}}),(0,p.jsx)(V,{variant:"secondary",onClick:Ce,style:{padding:"8px 16px"},children:"+"})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(M,{children:j("detail.documents","Documents")}),Be&&(0,p.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,p.jsxs)("label",{style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",fontWeight:500,color:"#374151",cursor:"pointer",transition:"all 0.15s"},children:[(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,p.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,p.jsx)("polyline",{points:"17 8 12 3 7 8"}),(0,p.jsx)("line",{x1:"12",y1:"3",x2:"12",y2:"15"})]}),j("detail.uploadDocument","Upload Document"),(0,p.jsx)("input",{type:"file",style:{display:"none"},accept:".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx",onChange:async e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!n)return;const a=new FormData;a.append("files",n);try{var i,r;const e=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${Fe()}`},body:a}),t=await e.json();t.success&&null!==(i=t.data)&&void 0!==i&&null!==(r=i[0])&&void 0!==r&&r.url?(await fetch(`/api/contracts/${y}/documents`,{method:"POST",headers:Ae(),body:JSON.stringify({file_name:n.name,file_url:t.data[0].url,file_size:n.size,file_type:n.type,document_type:"contract"})}),await we()):B(t.message||"Upload failed")}catch{B("Upload failed")}e.target.value=""}})]}),(0,p.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF",marginLeft:"8px"},children:"PDF, DOC, JPG, PNG, XLS (max 10MB)"})]}),A.documents&&A.documents.length>0?A.documents.map(e=>(0,p.jsxs)(Z,{children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flex:1},children:[(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#6B7C93",strokeWidth:"2",children:[(0,p.jsx)("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),(0,p.jsx)("polyline",{points:"14 2 14 8 20 8"})]}),(0,p.jsx)("a",{href:e.file_url,target:"_blank",rel:"noopener noreferrer",style:{fontSize:"14px",color:"#635BFF",textDecoration:"none",fontWeight:500},children:e.file_name}),(0,p.jsx)(X,{children:e.file_size?`${(e.file_size/1024).toFixed(0)}KB`:""})]}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsx)(X,{children:new Date(e.createdAt||e.created_at).toLocaleDateString()}),Be&&(0,p.jsx)("button",{onClick:async()=>{await fetch(`/api/contracts/${y}/documents/${e.id}`,{method:"DELETE",headers:Ae()}),await we()},style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"14px",padding:"2px 6px"},children:"\u2715"})]})]},e.id)):(0,p.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF",textAlign:"center",padding:"16px"},children:j("detail.noDocuments","No documents uploaded yet")})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(M,{children:j("detail.notesComments","Notes & Comments")}),(0,p.jsx)(T.A,{entityType:"contract",entityId:String(y),currentUserId:null===F||void 0===F?void 0:F.id})]}),A.history&&A.history.length>0&&(0,p.jsxs)(O,{children:[(0,p.jsx)(M,{children:"History"}),A.history.map(e=>{var t,n;return(0,p.jsxs)(ee,{children:[(0,p.jsx)(te,{}),(0,p.jsxs)("div",{children:[(0,p.jsxs)(ne,{children:[(n=e.action,{created:"Created",stage_changed:"Stage changed",terms_updated:"Terms updated",document_uploaded:"Document uploaded",task_completed:"Task completed",restaurant_linked:"Restaurant linked",plan_assigned:"Plan assigned",terminated:"Terminated",renewed:"Renewed"}[n]||n),e.from_value&&e.to_value?`: ${e.from_value} \u2192 ${e.to_value}`:e.to_value?`: ${e.to_value}`:""]}),(0,p.jsxs)(ae,{children:[null===(t=e.changedByUser)||void 0===t?void 0:t.full_name," \xb7 ",new Date(e.createdAt||e.created_at).toLocaleDateString()]})]})]},e.id)})]}),(0,p.jsxs)(G,{children:[$e&&(0,p.jsxs)(V,{variant:"primary",onClick:()=>(async e=>{B(null);try{const t=await fetch(`/api/contracts/${y}/stage`,{method:"PUT",headers:Ae(),body:JSON.stringify({stage:e})}),n=await t.json();n.success?await we():B(n.message||"Stage transition failed")}catch{B("Stage transition failed")}})($e),children:[De[$e]," \u2192"]}),"active"===A.stage&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(V,{variant:"primary",onClick:async()=>{B(null);try{const e=await fetch(`/api/contracts/${y}/renew`,{method:"POST",headers:Ae(),body:JSON.stringify({terms_changed:!1})}),t=await e.json();t.success?await we():B(t.message||"Renewal failed")}catch{B("Renewal failed")}},children:j("detail.renewContract","Renew Contract")}),(0,p.jsx)(V,{variant:"danger",onClick:()=>xe(!0),children:j("detail.terminateContract","Terminate Contract")})]})]}),pe&&(0,p.jsx)(ie,{onClick:()=>{xe(!1),ue("")},children:(0,p.jsxs)(re,{onClick:e=>e.stopPropagation(),children:[(0,p.jsx)(M,{style:{borderBottom:"none",marginBottom:"8px"},children:j("detail.terminateContract","Terminate Contract")}),(0,p.jsx)("p",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"12px"},children:j("detail.terminationReasonPrompt","Enter termination reason:")}),(0,p.jsx)(H,{value:he,onChange:e=>ue(e.target.value),placeholder:"Reason...",style:{width:"100%",marginBottom:"16px"}}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",justifyContent:"flex-end"},children:[(0,p.jsx)(V,{variant:"secondary",onClick:()=>{xe(!1),ue("")},children:"Cancel"}),(0,p.jsx)(V,{variant:"danger",onClick:async()=>{if(he.trim()){B(null);try{const e=await fetch(`/api/contracts/${y}/terminate`,{method:"POST",headers:Ae(),body:JSON.stringify({termination_reason:he})}),t=await e.json();t.success?(xe(!1),ue(""),await we()):B(t.message||"Termination failed")}catch{B("Termination failed")}}},disabled:!he.trim(),children:"Terminate"})]})]})})]})},le=r.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>e.color};
  background: ${e=>e.bg};
`,de={proposal:{bg:"#DBEAFE",color:"#2563EB"},contracting:{bg:"#FEF3C7",color:"#D97706"},setup:{bg:"#F5F3FF",color:"#6D28D9"},active:{bg:"#ECFDF5",color:"#059669"},terminated:{bg:"#F3F4F6",color:"#6B7280"},renewed:{bg:"#EDE9FE",color:"#7C3AED"},expired:{bg:"#F3F4F6",color:"#6B7280"}},ce=(0,r.Ay)(l.J2)`
  cursor: pointer;
  &:hover { background: #F8FAFC; }
`,pe=r.Ay.span`
  color: #D1D5DB;
  font-size: 13px;
`,xe=r.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
  flex-shrink: 0;
`,he=r.Ay.button`
  padding: 5px 14px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>e.active?"white":"transparent"};
  color: ${e=>e.active?"#0A2540":"#6B7C93"};
  box-shadow: ${e=>e.active?"0 1px 2px rgba(0,0,0,0.08)":"none"};
`,ue="#2563EB",ge="#D97706",me="#8B5CF6",fe="#059669",ye=e=>{let{entityType:t,pageTitle:n}=e;const{t:r}=(0,o.Bd)("contract"),{user:x}=(0,s.As)(),[h,u]=(0,i.ok)(),[g,m]=(0,a.useState)([]),[f,y]=(0,a.useState)(""),v=h.get("view")||"pipeline",b=h.get("id")?Number(h.get("id")):null,j=e=>{u(t=>{const n=new URLSearchParams(t);return n.set("view",e),n.delete("id"),n},{replace:!0})},F=e=>{u(t=>{const n=new URLSearchParams(t);return e?n.set("id",String(e)):n.delete("id"),n},{replace:!0})},[A,w]=(0,a.useState)(""),[C,S]=(0,a.useState)(!0),[_,E]=(0,a.useState)(null),[B,$]=(0,a.useState)("all"),[D,z]=(0,a.useState)((0,c.x)("all")),[T,P]=(0,a.useState)(!1),[R,I]=(0,a.useState)(""),N=a.useRef(null);(0,a.useEffect)(()=>(N.current&&clearTimeout(N.current),N.current=setTimeout(()=>I(f),400),()=>{N.current&&clearTimeout(N.current)}),[f]);const L=(0,a.useCallback)(async()=>{try{S(!0);const e=localStorage.getItem("auth_token"),t=new URLSearchParams;A&&t.set("stage",A),R&&t.set("search",R);const n=await fetch(`/api/contracts?${t.toString()}`,{headers:{Authorization:`Bearer ${e}`}}),a=await n.json();a.success?(m(a.data||[]),E(null)):E(a.message||"Failed to load contracts")}catch(e){E("Failed to load contracts")}finally{S(!1)}},[A,R]);(0,a.useEffect)(()=>{L()},[L]);const O=g.filter(e=>{if("all"!==B||T){const t=e.created_at||e.createdAt||"";if(t){const e=t.substring(0,10);if(e<D.start||e>D.end)return!1}}return!0}),M={proposal:O.filter(e=>"proposal"===e.stage).length,contracting:O.filter(e=>"contracting"===e.stage).length,setup:O.filter(e=>"setup"===e.stage).length,active:O.filter(e=>"active"===e.stage).length};return(0,p.jsxs)(l.mc,{children:[(0,p.jsxs)(l.Y9,{children:[(0,p.jsx)(l.hE,{children:n}),!b&&(0,p.jsx)(l.ex,{children:(0,p.jsx)(l.$n,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/contracts",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({applicant_name:r("newProposal.defaultName","New Proposal"),contract_type:"brand"===t?"franchise":"standard"})}),a=await n.json();a.success?F(a.data.id):E(a.message||"Failed to create proposal")}catch{E("Failed to create proposal")}},children:r("newProposal.button","New Proposal")})})]}),(0,p.jsx)(l.UC,{children:b?(0,p.jsx)(se,{contractId:b,entityType:t,onBack:()=>{F(null),L()}}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(l.MD,{children:[(0,p.jsxs)(l.hI,{color:ue,children:[(0,p.jsx)(l.Os,{children:M.proposal}),(0,p.jsx)(l.v0,{children:r("stages.proposal","Proposal")})]}),(0,p.jsxs)(l.hI,{color:ge,children:[(0,p.jsx)(l.Os,{children:M.contracting}),(0,p.jsx)(l.v0,{children:r("stages.contracting","Contracting")})]}),(0,p.jsxs)(l.hI,{color:me,children:[(0,p.jsx)(l.Os,{children:M.setup}),(0,p.jsx)(l.v0,{children:r("stages.setup","Setup")})]}),(0,p.jsxs)(l.hI,{color:fe,children:[(0,p.jsx)(l.Os,{children:M.active}),(0,p.jsx)(l.v0,{children:r("stages.active","Active")})]})]}),(0,p.jsxs)(c.A,{activePeriod:B,dateRange:D,isCustomDateRange:T,onPeriodChange:e=>{$(e),P(!1),z((0,c.x)(e))},onCalendarRangeSelect:(e,t)=>{z({start:e,end:t}),P(!0)},children:[(0,p.jsxs)(d.Jt,{value:A,onChange:e=>w(e.target.value),style:{minWidth:"120px",maxWidth:"150px"},children:[(0,p.jsx)("option",{value:"",children:r("list.allStages","All Stages")}),(0,p.jsx)("option",{value:"proposal",children:r("stages.proposal","Proposal")}),(0,p.jsx)("option",{value:"contracting",children:r("stages.contracting","Contracting")}),(0,p.jsx)("option",{value:"setup",children:r("stages.setup","Setup")}),(0,p.jsx)("option",{value:"active",children:r("stages.active","Active")}),(0,p.jsx)("option",{value:"terminated",children:r("stages.terminated","Terminated")}),(0,p.jsx)("option",{value:"renewed",children:r("stages.renewed","Renewed")})]}),(0,p.jsx)(d.DO,{placeholder:r("list.search","Search..."),value:f,onChange:e=>y(e.target.value),style:{minWidth:"140px",maxWidth:"200px"}}),(0,p.jsx)("div",{style:{marginLeft:"auto"},children:(0,p.jsxs)(xe,{children:[(0,p.jsx)(he,{active:"pipeline"===v,onClick:()=>j("pipeline"),children:r("views.pipeline","Pipeline")}),(0,p.jsx)(he,{active:"list"===v,onClick:()=>j("list"),children:r("views.list","List")})]})})]}),_&&(0,p.jsx)("div",{style:{color:"#DC2626",fontSize:"14px",marginBottom:"16px"},children:_}),C?(0,p.jsx)(l.ys,{children:r("common.loading","Loading...")}):"pipeline"===v?(0,p.jsx)(k,{contracts:O,onCardClick:e=>F(e),entityType:t}):(0,p.jsx)(p.Fragment,{children:0===O.length?(0,p.jsx)(l.ys,{children:r("list.empty","No contracts found")}):(0,p.jsx)(l.an,{children:(0,p.jsxs)(l.bQ,{children:[(0,p.jsxs)(l.B_,{children:[(0,p.jsx)(l.gU,{children:r("list.name","Name")}),(0,p.jsx)(l.gU,{children:r("list.stage","Stage")}),(0,p.jsx)(l.gU,{children:r("list.period","Period")}),(0,p.jsx)(l.gU,{children:r("list.restaurant","Restaurant")})]}),(0,p.jsx)("tbody",{children:O.map(e=>{var t;const n=de[e.stage]||de.expired;return(0,p.jsxs)(ce,{onClick:()=>F(e.id),children:[(0,p.jsx)(l.Bv,{"data-label":r("list.name","Name"),style:{fontWeight:500},children:e.applicant_name||"-"}),(0,p.jsx)(l.Bv,{"data-label":r("list.stage","Stage"),children:(0,p.jsx)(le,{bg:n.bg,color:n.color,children:e.stage})}),(0,p.jsx)(l.Bv,{"data-label":r("list.period","Period"),children:e.start_date&&e.end_date?`${e.start_date.substring(0,7)} ~ ${e.end_date.substring(0,7)}`:"-"}),(0,p.jsx)(l.Bv,{"data-label":r("list.restaurant","Restaurant"),children:(null===(t=e.restaurant)||void 0===t?void 0:t.name)||(0,p.jsx)(pe,{children:"(unlinked)"})})]},e.id)})})]})})})]})})]})}},9061:(e,t,n)=>{n.d(t,{c:()=>o});var a=n(9950),i=n(4414);const r=/(https?:\/\/[^\s<]+)/g;function o(e){const t=e.split(r);return 1===t.length?e:t.map((e,t)=>r.test(e)?(0,i.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},t):(0,i.jsx)(a.Fragment,{children:e},t))}}}]);