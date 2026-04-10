"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8248],{512:(e,t,n)=>{n.d(t,{x:()=>B,A:()=>R});var i=n(9950),a=n(4752),r=n(5030),o=n(4414);const s=["Su","Mo","Tu","We","Th","Fr","Sa"],l=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),p=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=a.Ay.div`
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
`,h=a.Ay.div`
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
`,y=a.Ay.button`
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
`,b=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,j=a.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,F=a.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,A=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,w=a.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,C=a.Ay.div`
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
`,E=e=>{let{startDate:t,endDate:n,onRangeSelect:a,onClose:E,isOpen:_}=e;const{t:B}=(0,r.Bd)("common"),$=new Date,[D,z]=(0,i.useState)($.getMonth()),[T,P]=(0,i.useState)($.getFullYear()),[R,N]=(0,i.useState)(null),[I,L]=(0,i.useState)(null),[O,M]=(0,i.useState)(null),[U,W]=(0,i.useState)("start"),Y=(0,i.useRef)(null);(0,i.useEffect)(()=>{t&&N(d(t)),n&&L(d(n))},[t,n]),(0,i.useEffect)(()=>{_&&W("start")},[_]),(0,i.useEffect)(()=>{const e=e=>{Y.current&&!Y.current.contains(e.target)&&E()};return _&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[_,E]);const J=(0,i.useCallback)(()=>{0===D?(z(11),P(e=>e-1)):z(e=>e-1)},[D]),H=(0,i.useCallback)(()=>{11===D?(z(0),P(e=>e+1)):z(e=>e+1)},[D]),K=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),i=((e,t)=>new Date(e,t,1).getDay())(e,t),r=[];for(let a=0;a<i;a++)r.push(null);for(let a=1;a<=n;a++)r.push(new Date(e,t,a));return(0,o.jsxs)(j,{children:[(0,o.jsx)(F,{children:p(e,t)}),(0,o.jsx)(A,{children:s.map(e=>(0,o.jsx)(w,{children:e},e))}),(0,o.jsx)(k,{children:r.map((e,t)=>{if(!e)return(0,o.jsx)(C,{},`e-${t}`);const{isStart:n,isEnd:i,isInRange:r,isHoverEnd:s}=(e=>{const t=R&&c(e,R),n=I&&c(e,I),i="end"===U&&O?O:I;let a=!1;if(R&&i){const[t,n]=R<=i?[R,i]:[i,R];a=((e,t,n)=>{const i=e.getTime();return i>t.getTime()&&i<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:a,isHoverEnd:"end"===U&&O&&c(e,O)}})(e),d=c(e,$);return(0,o.jsx)(S,{$isStart:!!n,$isEnd:!!i,$isInRange:r,$isHoverEnd:!!s,$isToday:d,onClick:()=>(e=>{if("start"===U)N(e),L(null),W("end");else{let t=R,n=e;n<t&&([t,n]=[n,t]),N(t),L(n),W("start"),a(l(t),l(n)),setTimeout(E,200)}})(e),onMouseEnter:()=>M(e),onMouseLeave:()=>M(null),children:e.getDate()},e.getTime())})})]})},G=11===D?0:D+1,V=11===D?T+1:T,q=e=>{const t=new Date;let n;const i=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}N(n),L(i),W("start"),a(l(n),l(i)),setTimeout(E,150)};return _?(0,o.jsx)(x,{ref:Y,children:(0,o.jsxs)(h,{children:[(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{onClick:()=>q("this_week"),children:"This Week"}),(0,o.jsx)(g,{onClick:()=>q("this_month"),children:"This Month"}),(0,o.jsx)(g,{onClick:()=>q("this_year"),children:"This Year"})]}),(0,o.jsxs)(m,{children:[(0,o.jsxs)(f,{children:[(0,o.jsx)(y,{onClick:J,"aria-label":"Previous month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,o.jsx)(y,{onClick:H,"aria-label":"Next month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,o.jsxs)(v,{children:[K(T,D),(0,o.jsx)(b,{children:K(V,G)})]})]})]})}):null},_=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,B=(e,t)=>{const n=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[n,i,a]=t.split("-").map(Number);return new Date(n,i-1,a)}catch{return new Date}})(t);let i=new Date(n);const a=new Date(n);switch(e){case"today":break;case"yesterday":i.setDate(n.getDate()-1),a.setDate(n.getDate()-1);break;case"week":i.setDate(n.getDate()-6);break;case"month":i.setDate(n.getDate()-29);break;case"year":i.setDate(n.getDate()-364);break;case"all":i=new Date(2020,0,1)}return{start:_(i),end:_(a)}},$=a.Ay.div`
  margin-bottom: 24px;
`,D=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,z=a.Ay.button`
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
`,P=a.Ay.button`
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
`,R=e=>{let{activePeriod:t,dateRange:n,isCustomDateRange:a,onPeriodChange:s,onCalendarRangeSelect:l,includeToday:d=!1,children:c}=e;const{t:p}=(0,r.Bd)("common"),[x,h]=(0,i.useState)(!1),u=d?["today","yesterday","week","month","year","all"]:["week","month","year","all"],g={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,o.jsx)($,{children:(0,o.jsxs)(D,{children:[u.map(e=>(0,o.jsx)(z,{active:t===e&&!a,onClick:()=>s(e),children:g[e]},e)),(0,o.jsxs)(T,{children:[(0,o.jsxs)(P,{active:a,onClick:()=>h(!x),children:[(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,o.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,o.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,o.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),n.start&&n.end?`${n.start} ~ ${n.end}`:"Custom Range"]}),(0,o.jsx)(E,{isOpen:x,startDate:n.start,endDate:n.end,onRangeSelect:(e,t)=>{l(e,t),h(!1)},onClose:()=>h(!1)})]}),c]})})}},4185:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var i=n(4752),a=n(4414);const r=i.Ay.div`
  margin-top: 12px;
`,o=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=i.Ay.a`
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
`,d=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=i.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=i.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=i.Ay.a`
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
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const n=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,a.jsxs)(r,{children:[(0,a.jsxs)(o,{children:["Attachments (",t.length,")"]}),n.length>0&&(0,a.jsx)(x,{children:n.map((e,t)=>(0,a.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,a.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,a.jsx)(s,{children:i.map((e,t)=>{return(0,a.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,a.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,a.jsx)(c,{children:e.originalName}),(0,a.jsx)(p,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},t);var n,i})})]})}},4302:(e,t,n)=>{n.d(t,{A:()=>I});var i=n(9950),a=n(4752),r=n(4185),o=n(9061),s=n(5030),l=n(9955),d=n(4414);const c=a.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,p=a.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,x=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,h=a.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,u=a.Ay.div`
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
`,g=a.Ay.div`
  flex: 1;
  min-width: 0;
`,m=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,f=a.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,y=a.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,v=a.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,b=a.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,j=a.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,F=a.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,A=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,w=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,k=a.Ay.textarea`
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
`,C=a.Ay.div`
  display: flex;
  gap: 4px;
`,S=a.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,E=a.Ay.button`
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
`,_=a.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,B=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,$=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,D=a.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=a.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,T=a.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,P=a.Ay.input`
  display: none;
`,R=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,N=a.Ay.label`
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
`,I=e=>{let{entityType:t,entityId:n,currentUserId:a,onMarkRead:I}=e;const{t:L}=(0,s.Bd)("common"),[O,M]=(0,i.useState)([]),[U,W]=(0,i.useState)(""),[Y,J]=(0,i.useState)(!1),[H,K]=(0,i.useState)([]),[G,V]=(0,i.useState)(!1),[q,Q]=(0,i.useState)(""),[X,Z]=(0,i.useState)(!1),ee=(0,i.useRef)(null),te=async()=>{try{const e=(0,l.c4)(),i=await fetch(`/api/comments/${t}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&M(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{n&&(te(),(async()=>{try{const e=(0,l.c4)();await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n})}),I&&I(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,n]);const ne=async()=>{if(G)return;const e=U.trim(),i=H.length>0;if((e||i)&&!X){Z(!0);try{const e=(0,l.c4)();(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n,content:U.trim(),attachments:i?H:void 0,is_internal:Y||void 0})})).ok&&(W(""),K([]),J(!1),te())}catch(a){console.error("Error adding comment:",a)}finally{Z(!1)}}},ie=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),i=Math.floor(n/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const a=Math.floor(i/60);if(a<24)return`${a}h ago`;const r=Math.floor(a/24);return r<7?`${r}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:["Comments (",O.length,")"]}),O.length>0?(0,d.jsx)(x,{children:O.map(e=>{var t,n,s;return(0,d.jsxs)(h,{isInternal:e.is_internal,children:[(0,d.jsx)(u,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(f,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,d.jsx)(y,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,d.jsx)(v,{children:"Internal"}),(0,d.jsx)(b,{children:ie(e.createdAt)}),a&&e.author_id===Number(a)&&(0,d.jsx)(F,{onClick:()=>(async e=>{try{const t=(0,l.c4)();(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&te()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,d.jsx)(j,{children:e.content.split("\n").map((e,t)=>(0,d.jsxs)(i.Fragment,{children:[t>0&&(0,d.jsx)("br",{}),(0,o.c)(e)]},t))}),e.attachments&&e.attachments.length>0&&(0,d.jsx)(r.A,{attachments:e.attachments})]})]},e.id)})}):(0,d.jsx)(_,{children:"No comments yet"}),(0,d.jsxs)(A,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(k,{value:U,onChange:e=>W(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),ne())},placeholder:Y?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,d.jsxs)(C,{children:[(0,d.jsx)(S,{onClick:()=>{var e;return null===(e=ee.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,d.jsx)(E,{onClick:ne,disabled:!U.trim()&&0===H.length||X||G,children:"Send"})]})]}),(0,d.jsx)(R,{children:(0,d.jsxs)(N,{children:[(0,d.jsx)("input",{type:"checkbox",checked:Y,onChange:e=>J(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(H.length>0||G||q)&&(0,d.jsxs)(B,{children:[G&&(0,d.jsx)(z,{children:"Uploading..."}),q&&(0,d.jsx)(T,{children:q}),H.map((e,t)=>(0,d.jsxs)($,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,d.jsx)(D,{onClick:()=>(e=>{const t=H[e],n=(0,l.c4)();fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),K(t=>t.filter((t,n)=>n!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,d.jsx)(P,{ref:ee,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const n=5-H.length,i=Array.from(t).slice(0,n);if(e.target.value="",0!==i.length){V(!0),Q("");try{const e=new FormData;i.forEach(t=>e.append("files",t));const t=(0,l.c4)(),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),a=await n.json();a.success&&a.data?K(e=>[...e,...a.data]):Q(a.message||"Upload failed")}catch(a){console.error("File upload error:",a),Q("File upload failed. Please try again.")}finally{V(!1)}}}})]})}},5370:(e,t,n)=>{n.d(t,{A:()=>b});var i=n(9950),a=n(4752),r=n(4414);const o=a.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,s=a.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=a.i7`
  to { transform: rotate(360deg); }
`,d=a.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=a.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?a.AH`${s} 0.3s ease forwards`:a.AH`${o} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=a.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,x=a.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,h=a.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,u=a.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=a.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,m=a.Ay.span`
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
`,f=a.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,y=a.Ay.span`
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
`,v=(0,i.forwardRef)((e,t)=>{let{children:n,onSave:a,type:o="input",debounceMs:s=2e3,style:l}=e;const[c,v]=(0,i.useState)("idle"),[b,j]=(0,i.useState)(!1),F=(0,i.useRef)(null),A=(0,i.useRef)(null),w=(0,i.useRef)(null),k=(0,i.useRef)(!0),C=(0,i.useRef)(a);C.current=a;const S=(0,i.useCallback)(()=>{F.current&&clearTimeout(F.current),A.current&&clearTimeout(A.current),w.current&&clearTimeout(w.current)},[]),E=2e3!==s?s:"toggle"===o||"select"===o||"list"===o||"image"===o?300:s,_=(0,i.useCallback)(()=>{S(),j(!1),v("saving"),F.current=setTimeout(async()=>{if(k.current)try{if(await C.current(),!k.current)return;v("saved"),A.current=setTimeout(()=>{k.current&&(j(!0),w.current=setTimeout(()=>{k.current&&(v("idle"),j(!1))},300))},2e3)}catch{if(!k.current)return;v("error"),A.current=setTimeout(()=>{k.current&&(j(!0),w.current=setTimeout(()=>{k.current&&(v("idle"),j(!1))},300))},4e3)}},E)},[E,S]);(0,i.useImperativeHandle)(t,()=>({triggerSave:_}),[_]),(0,i.useEffect)(()=>(k.current=!0,()=>{k.current=!1,S()}),[S]);const B=i.Children.map(n,e=>{if(!i.isValidElement(e))return e;const t=e.props.onChange;return"function"!==typeof t?e:i.cloneElement(e,{onChange:function(){t(...arguments),_()}})}),$="saving"===c?(0,r.jsx)(f,{}):"saved"===c?(0,r.jsx)(m,{children:"\u2713"}):"error"===c?(0,r.jsx)(y,{children:"!"}):null,D="select"===o?x:"toggle"===o?h:"image"===o?u:"list"===o?g:p;return(0,r.jsxs)(d,{$type:o,style:l,children:[B,"idle"!==c&&(0,r.jsx)(D,{$fading:b,children:$})]})});v.displayName="AutoSaveField";const b=v},8248:(e,t,n)=>{n.d(t,{A:()=>ve});var i=n(9950),a=n(4492),r=n(4752),o=n(5030),s=n(1367),l=n(8409),d=n(2488),c=n(512),p=n(4414);const x=["proposal","contracting","setup","active"],h={proposal:{header:"#EEF2FF",headerText:"#4338CA",border:"#C7D2FE"},contracting:{header:"#FFF7ED",headerText:"#C2410C",border:"#FDBA74"},setup:{header:"#F5F3FF",headerText:"#6D28D9",border:"#C4B5FD"},active:{header:"#F0FDF4",headerText:"#15803D",border:"#86EFAC"}},u=r.Ay.div`
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
`,k=e=>{let{contracts:t,onCardClick:n,entityType:i}=e;const{t:a}=(0,o.Bd)("contract"),r={proposal:a("stages.proposal","Proposal"),contracting:a("stages.contracting","Contracting"),setup:a("stages.setup","Setup"),active:a("stages.active","Active")},s=x.reduce((e,n)=>(e[n]=t.filter(e=>e.stage===n),e),{}),l=e=>e?new Date(e).toLocaleDateString("en-CA",{month:"2-digit",day:"2-digit"}):"";return(0,p.jsx)(u,{children:x.map(e=>{const t=s[e],o=h[e],d="active"===e?5:10;return(0,p.jsxs)(g,{children:[(0,p.jsxs)(m,{bg:o.header,textColor:o.headerText,children:[(0,p.jsx)("span",{children:r[e]}),(0,p.jsx)(f,{children:t.length})]}),t.slice(0,d).map(e=>(0,p.jsxs)(y,{borderColor:o.border,onClick:()=>n(e.id),children:[(0,p.jsx)(v,{children:e.applicant_name}),e.restaurant&&(0,p.jsx)(A,{children:e.restaurant.name}),e.applicant_phone&&(0,p.jsx)(b,{children:e.applicant_phone}),e.applicant_location&&(0,p.jsx)(b,{children:e.applicant_location}),(0,p.jsxs)(j,{children:[e.contract_type&&(0,p.jsx)(F,{bg:"#EEF2FF",color:"#4338CA",children:e.contract_type}),e.contract_number&&(0,p.jsx)(F,{children:e.contract_number}),e.start_date&&e.end_date&&(0,p.jsxs)(F,{children:[e.start_date.substring(5)," ~ ",e.end_date.substring(5)]}),"setup"===e.stage&&e.tasks&&(0,p.jsxs)(F,{bg:"#F5F3FF",color:"#6D28D9",children:[e.tasks.filter(e=>e.is_completed).length,"/",e.tasks.length," done"]}),"foodcourt"===i&&e.unit&&(0,p.jsxs)(F,{bg:"#ECFDF5",color:"#059669",children:["Unit ",e.unit.unit_number]})]}),(0,p.jsx)(b,{style:{marginTop:"6px"},children:l(e.createdAt||e.created_at)})]},e.id)),t.length>d&&(0,p.jsxs)(w,{children:[a("pipeline.viewAll","View all")," (",t.length,")"]}),0===t.length&&(0,p.jsx)(b,{style:{textAlign:"center",padding:"20px 0"},children:"-"})]},e)})})},C=["proposal","contracting","setup","active"],S=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 0;
`,E=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,_=r.Ay.div`
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
`,D=e=>{let{currentStage:t}=e;const{t:n}=(0,o.Bd)("contract"),a=C.indexOf(t),r={proposal:n("stages.proposal","Proposal"),contracting:n("stages.contracting","Contracting"),setup:n("stages.setup","Setup"),active:n("stages.active","Active")};return(0,p.jsx)(S,{children:C.map((e,t)=>(0,p.jsxs)(i.Fragment,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{isActive:t===a,isPast:t<a,children:t<a?"\u2713":t+1}),(0,p.jsx)(B,{isActive:t===a,isPast:t<a,children:r[e]})]}),t<C.length-1&&(0,p.jsx)($,{isPast:t<a})]},e))})};var z=n(5370),T=n(4302),P=n(9955);const R=r.Ay.div`
  width: 100%;
`,N=r.Ay.button`
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
`,L=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,O=r.Ay.span`
  padding: 4px 14px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${e=>e.color};
  background: ${e=>e.bg};
`,M=r.Ay.div`
  background: #fff;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,U=r.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #F3F4F6;
`,W=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,Y=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,J=r.Ay.label`
  font-size: 12px;
  font-weight: 500;
  color: #6B7C93;
`,H=r.Ay.input`
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
`,K=r.Ay.textarea`
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
`,G=r.Ay.select`
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
`,V=r.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
`,q=r.Ay.button`
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
`,Q=r.Ay.div`
  color: #DC2626;
  font-size: 13px;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: #FEE2E2;
  border-radius: 6px;
`,X=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`,Z=(r.Ay.div`
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
`),ee=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`,te=r.Ay.div`
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`,ne=r.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  margin-top: 6px;
  flex-shrink: 0;
`,ie=r.Ay.div`
  font-size: 13px;
  color: #0A2540;
`,ae=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`,re=r.Ay.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,oe=r.Ay.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  max-width: 440px;
  width: 90%;
  box-shadow: 0 20px 25px rgba(0,0,0,0.1);
`,se={proposal:{bg:"#DBEAFE",color:"#2563EB"},contracting:{bg:"#FEF3C7",color:"#D97706"},setup:{bg:"#FEF3C7",color:"#D97706"},active:{bg:"#ECFDF5",color:"#059669"},terminated:{bg:"#F3F4F6",color:"#6B7280"},renewed:{bg:"#EDE9FE",color:"#7C3AED"}},le=e=>{var t,n,a,r,l,d,c,x,h,u,g,m,f;let{contractId:y,entityType:v,onBack:b}=e;const{t:j}=(0,o.Bd)("contract"),{user:F}=(0,s.As)(),[A,w]=(0,i.useState)(null),[k,C]=(0,i.useState)(!0),[S,E]=(0,i.useState)({}),[_,B]=(0,i.useState)(null),$=i.useRef({}),[le,de]=(0,i.useState)(""),[ce,pe]=(0,i.useState)(""),[xe,he]=(0,i.useState)(!1),[ue,ge]=(0,i.useState)(""),[me,fe]=(0,i.useState)(""),[ye,ve]=(0,i.useState)([]),[be,je]=(0,i.useState)(!1),Fe=i.useRef(null),Ae=()=>(0,P.c4)(),we=()=>({"Content-Type":"application/json",Authorization:`Bearer ${Ae()}`}),ke=(0,i.useCallback)(async()=>{try{const e=await fetch(`/api/contracts/${y}`,{headers:{Authorization:`Bearer ${Ae()}`}}),t=await e.json();t.success&&(w(t.data),E(t.data),B(null))}catch{B("Failed to load contract")}finally{C(!1)}},[y]);(0,i.useEffect)(()=>{ke()},[ke]),i.useEffect(()=>{$.current=S},[S]);const Ce=async()=>{B(null);const e=await fetch(`/api/contracts/${y}`,{method:"PUT",headers:we(),body:JSON.stringify($.current)}),t=await e.json();if(!t.success)throw new Error(t.message||"Save failed")},Se=async()=>{if(ce.trim())try{await fetch(`/api/contracts/${y}/tasks`,{method:"POST",headers:we(),body:JSON.stringify({title:ce})}),pe(""),await ke()}catch{}},Ee=(e,t)=>{E(n=>({...n,[e]:t}))},_e=(e,t)=>{E(n=>({...n,financial_terms:{...n.financial_terms,[e]:t}}))};if(k)return(0,p.jsx)(R,{children:(0,p.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7C93"},children:"Loading..."})});if(!A)return(0,p.jsx)(R,{children:(0,p.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7C93"},children:"Contract not found"})});const Be=se[A.stage]||{color:"#6B7280",bg:"#F3F4F6"},$e=["proposal","contracting","setup"].includes(A.stage),De={proposal:"contracting",contracting:"setup",setup:"active"}[A.stage],ze={contracting:j("detail.proceedToContracting","Proceed to Contracting"),setup:j("detail.proceedToSetup","Proceed to Setup"),active:j("detail.startOperations","Start Operations")};return(0,p.jsxs)(R,{children:[(0,p.jsxs)(N,{onClick:b,children:["\u2190 ",j("detail.backToList","Back to list")]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(L,{children:(null===(t=A.restaurant)||void 0===t?void 0:t.name)||A.applicant_name}),(0,p.jsx)(O,{bg:Be.bg,color:Be.color,children:A.stage})]}),!["terminated","renewed","expired"].includes(A.stage)&&(0,p.jsx)(D,{currentStage:A.stage}),_&&(0,p.jsx)(Q,{children:_}),(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:j("detail.applicantInfo","Applicant Information")}),(0,p.jsxs)(W,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.name","Name")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{value:S.applicant_name||"",onChange:e=>Ee("applicant_name",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.email","Email")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{value:S.applicant_email||"",onChange:e=>Ee("applicant_email",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.phone","Phone")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{value:S.applicant_phone||"",onChange:e=>Ee("applicant_phone",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.businessType","Business Type")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{value:S.applicant_business_type||"",onChange:e=>Ee("applicant_business_type",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:"brand"===v?j("detail.location","Location"):j("detail.preferredUnit","Preferred Unit")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{value:S.applicant_location||"",onChange:e=>Ee("applicant_location",e.target.value),disabled:!$e})})]})]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:j("detail.linkRestaurant","Link Restaurant")}),A.restaurant?(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"#F0FDF4",borderRadius:"8px",border:"1px solid #BBF7D0"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"15px"},children:A.restaurant.name}),A.restaurant.address&&(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7C93",marginTop:"2px"},children:A.restaurant.address}),A.restaurant.phone&&(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:A.restaurant.phone})]}),$e&&(0,p.jsx)(q,{variant:"secondary",onClick:async()=>{try{const e=await fetch(`/api/contracts/${y}`,{method:"PUT",headers:we(),body:JSON.stringify({restaurant_id:null})});(await e.json()).success&&await ke()}catch{}},style:{fontSize:"12px",padding:"6px 12px"},children:j("detail.unlink","Unlink")})]}):(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{position:"relative"},children:[(0,p.jsx)(H,{value:me,onChange:e=>{return t=e.target.value,fe(t),Fe.current&&clearTimeout(Fe.current),void(t.length<2?ve([]):(je(!0),Fe.current=setTimeout(async()=>{try{var e;const n=await fetch(`/api/restaurants?search=${encodeURIComponent(t)}`,{headers:{Authorization:`Bearer ${Ae()}`}}),i=await n.json(),a=Array.isArray(i)?i:(null===(e=i.data)||void 0===e?void 0:e.restaurants)||i.data||[];ve(Array.isArray(a)?a.slice(0,10):[])}catch{ve([])}je(!1)},300)));var t},placeholder:j("detail.searchRestaurant","Search restaurant by name..."),disabled:!$e}),be&&(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px"},children:"Searching..."}),ye.length>0&&(0,p.jsx)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1px solid #E6EBF1",borderRadius:"8px",marginTop:"4px",maxHeight:"200px",overflowY:"auto",zIndex:10,boxShadow:"0 4px 12px rgba(0,0,0,0.1)"},children:ye.map(e=>(0,p.jsxs)("div",{onClick:()=>(async e=>{try{const t=await fetch(`/api/contracts/${y}`,{method:"PUT",headers:we(),body:JSON.stringify({restaurant_id:e})}),n=await t.json();n.success?(fe(""),ve([]),await ke()):B(n.message||"Failed to link restaurant")}catch{B("Failed to link restaurant")}})(e.id),style:{padding:"10px 14px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",fontSize:"14px"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="#fff",children:[(0,p.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:e.name}),e.address&&(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:e.address})]},e.id))})]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginTop:"6px"},children:j("detail.restaurantHint","Link an existing restaurant or leave empty to connect later. Restaurant is required before Active stage.")})]})]}),["contracting","setup","active","terminated","renewed"].includes(A.stage)&&(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:j("detail.contractInfo","Contract Information")}),(0,p.jsxs)(W,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.contractNumber","Contract Number")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{value:S.contract_number||"",onChange:e=>Ee("contract_number",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.contractType","Contract Type")}),(0,p.jsx)(z.A,{onSave:Ce,type:"select",debounceMs:300,children:(0,p.jsxs)(G,{value:S.contract_type||"",onChange:e=>Ee("contract_type",e.target.value),disabled:!$e,children:[(0,p.jsx)("option",{value:"",children:j("detail.select","Select...")}),"brand"===v?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("option",{value:"franchise",children:"Franchise"}),(0,p.jsx)("option",{value:"license",children:"License"}),(0,p.jsx)("option",{value:"master",children:"Master"}),(0,p.jsx)("option",{value:"direct",children:"Direct"})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("option",{value:"standard",children:"Standard Lease"}),(0,p.jsx)("option",{value:"revenue_share",children:"Revenue Share"}),(0,p.jsx)("option",{value:"popup",children:"Pop-up"})]})]})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.startDate","Start Date")}),(0,p.jsx)(z.A,{onSave:Ce,debounceMs:300,children:(0,p.jsx)(H,{type:"date",value:S.start_date||"",onChange:e=>Ee("start_date",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.endDate","End Date")}),(0,p.jsx)(z.A,{onSave:Ce,debounceMs:300,children:(0,p.jsx)(H,{type:"date",value:S.end_date||"",onChange:e=>Ee("end_date",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.durationMonths","Duration (months)")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{type:"number",value:S.duration_months||"",onChange:e=>Ee("duration_months",parseInt(e.target.value)||null),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.signingDate","Signing Date")}),(0,p.jsx)(z.A,{onSave:Ce,debounceMs:300,children:(0,p.jsx)(H,{type:"date",value:S.signing_date||"",onChange:e=>Ee("signing_date",e.target.value),disabled:!$e})})]})]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:"brand"===v?j("detail.franchiseTerms","Franchise Terms"):j("detail.tenancyTerms","Tenancy Terms")}),(0,p.jsx)(W,{children:"brand"===v?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.franchiseFee","Franchise Fee")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{type:"number",value:(null===(n=S.financial_terms)||void 0===n?void 0:n.franchise_fee)||"",onChange:e=>_e("franchise_fee",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.royaltyPercent","Royalty (%)")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{type:"number",value:(null===(a=S.financial_terms)||void 0===a?void 0:a.royalty_value)||"",onChange:e=>_e("royalty_value",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.marketingFundPercent","Marketing Fund (%)")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{type:"number",value:(null===(r=S.financial_terms)||void 0===r?void 0:r.marketing_fund_value)||"",onChange:e=>_e("marketing_fund_value",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.securityDeposit","Security Deposit")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{type:"number",value:(null===(l=S.financial_terms)||void 0===l?void 0:l.security_deposit)||"",onChange:e=>_e("security_deposit",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.territory","Territory")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{value:(null===(d=S.financial_terms)||void 0===d?void 0:d.territory)||"",onChange:e=>_e("territory",e.target.value),disabled:!$e})})]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.baseRent","Base Rent (monthly)")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{type:"number",value:(null===(c=S.financial_terms)||void 0===c?void 0:c.base_rent)||"",onChange:e=>_e("base_rent",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.revenueSharePercent","Revenue Share (%)")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{type:"number",value:(null===(x=S.financial_terms)||void 0===x?void 0:x.revenue_share_percent)||"",onChange:e=>_e("revenue_share_percent",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.minGuarantee","Min Guarantee")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{type:"number",value:(null===(h=S.financial_terms)||void 0===h?void 0:h.min_guarantee)||"",onChange:e=>_e("min_guarantee",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.maintenanceFee","Maintenance Fee (monthly)")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{type:"number",value:(null===(u=S.financial_terms)||void 0===u?void 0:u.maintenance_fee)||"",onChange:e=>_e("maintenance_fee",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.securityDeposit","Security Deposit")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{type:"number",value:(null===(g=S.financial_terms)||void 0===g?void 0:g.security_deposit)||"",onChange:e=>_e("security_deposit",e.target.value),disabled:!$e})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(J,{children:j("detail.operatingHours","Operating Hours")}),(0,p.jsx)(z.A,{onSave:Ce,children:(0,p.jsx)(H,{value:(null===(m=S.financial_terms)||void 0===m?void 0:m.operating_hours)||"",onChange:e=>_e("operating_hours",e.target.value),disabled:!$e})})]})]})})]}),["setup","active"].includes(A.stage)&&(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:j("detail.setupChecklist","Setup Checklist")}),null===(f=A.tasks)||void 0===f?void 0:f.map(e=>(0,p.jsxs)(X,{children:[(0,p.jsx)("input",{type:"checkbox",checked:e.is_completed,onChange:()=>(async(e,t)=>{try{await fetch(`/api/contracts/${y}/tasks/${e}`,{method:"PUT",headers:we(),body:JSON.stringify({is_completed:!t})}),await ke()}catch{}})(e.id,e.is_completed),disabled:"active"===A.stage,style:{width:16,height:16}}),(0,p.jsx)("span",{style:{textDecoration:e.is_completed?"line-through":"none",color:e.is_completed?"#6B7C93":"#0A2540",fontSize:"14px",flex:1},children:e.title}),e.completed_at&&(0,p.jsx)(Z,{children:new Date(e.completed_at).toLocaleDateString()})]},e.id)),"setup"===A.stage&&(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",marginTop:"12px"},children:[(0,p.jsx)(H,{value:ce,onChange:e=>pe(e.target.value),placeholder:j("detail.addTask","Add task..."),onKeyDown:e=>"Enter"===e.key&&Se(),style:{flex:1}}),(0,p.jsx)(q,{variant:"secondary",onClick:Se,style:{padding:"8px 16px"},children:"+"})]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:j("detail.documents","Documents")}),$e&&(0,p.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,p.jsxs)("label",{style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",fontWeight:500,color:"#374151",cursor:"pointer",transition:"all 0.15s"},children:[(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,p.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,p.jsx)("polyline",{points:"17 8 12 3 7 8"}),(0,p.jsx)("line",{x1:"12",y1:"3",x2:"12",y2:"15"})]}),j("detail.uploadDocument","Upload Document"),(0,p.jsx)("input",{type:"file",style:{display:"none"},accept:".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx",onChange:async e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!n)return;const i=new FormData;i.append("files",n);try{var a,r;const e=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${Ae()}`},body:i}),t=await e.json();t.success&&null!==(a=t.data)&&void 0!==a&&null!==(r=a[0])&&void 0!==r&&r.url?(await fetch(`/api/contracts/${y}/documents`,{method:"POST",headers:we(),body:JSON.stringify({file_name:n.name,file_url:t.data[0].url,file_size:n.size,file_type:n.type,document_type:"contract"})}),await ke()):B(t.message||"Upload failed")}catch{B("Upload failed")}e.target.value=""}})]}),(0,p.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF",marginLeft:"8px"},children:"PDF, DOC, JPG, PNG, XLS (max 10MB)"})]}),A.documents&&A.documents.length>0?A.documents.map(e=>(0,p.jsxs)(ee,{children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flex:1},children:[(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#6B7C93",strokeWidth:"2",children:[(0,p.jsx)("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),(0,p.jsx)("polyline",{points:"14 2 14 8 20 8"})]}),(0,p.jsx)("a",{href:e.file_url,target:"_blank",rel:"noopener noreferrer",style:{fontSize:"14px",color:"#635BFF",textDecoration:"none",fontWeight:500},children:e.file_name}),(0,p.jsx)(Z,{children:e.file_size?`${(e.file_size/1024).toFixed(0)}KB`:""})]}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsx)(Z,{children:new Date(e.createdAt||e.created_at).toLocaleDateString()}),$e&&(0,p.jsx)("button",{onClick:async()=>{await fetch(`/api/contracts/${y}/documents/${e.id}`,{method:"DELETE",headers:we()}),await ke()},style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"14px",padding:"2px 6px"},children:"\u2715"})]})]},e.id)):(0,p.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF",textAlign:"center",padding:"16px"},children:j("detail.noDocuments","No documents uploaded yet")})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:j("detail.notesComments","Notes & Comments")}),(0,p.jsx)(T.A,{entityType:"contract",entityId:String(y),currentUserId:null===F||void 0===F?void 0:F.id})]}),A.history&&A.history.length>0&&(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:"History"}),A.history.map(e=>{var t,n;return(0,p.jsxs)(te,{children:[(0,p.jsx)(ne,{}),(0,p.jsxs)("div",{children:[(0,p.jsxs)(ie,{children:[(n=e.action,{created:"Created",stage_changed:"Stage changed",terms_updated:"Terms updated",document_uploaded:"Document uploaded",task_completed:"Task completed",restaurant_linked:"Restaurant linked",plan_assigned:"Plan assigned",terminated:"Terminated",renewed:"Renewed"}[n]||n),e.from_value&&e.to_value?`: ${e.from_value} \u2192 ${e.to_value}`:e.to_value?`: ${e.to_value}`:""]}),(0,p.jsxs)(ae,{children:[null===(t=e.changedByUser)||void 0===t?void 0:t.full_name," \xb7 ",new Date(e.createdAt||e.created_at).toLocaleDateString()]})]})]},e.id)})]}),(0,p.jsxs)(V,{children:[De&&(0,p.jsxs)(q,{variant:"primary",onClick:()=>(async e=>{B(null);try{const t=await fetch(`/api/contracts/${y}/stage`,{method:"PUT",headers:we(),body:JSON.stringify({stage:e})}),n=await t.json();n.success?await ke():B(n.message||"Stage transition failed")}catch{B("Stage transition failed")}})(De),children:[ze[De]," \u2192"]}),"active"===A.stage&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(q,{variant:"primary",onClick:async()=>{B(null);try{const e=await fetch(`/api/contracts/${y}/renew`,{method:"POST",headers:we(),body:JSON.stringify({terms_changed:!1})}),t=await e.json();t.success?await ke():B(t.message||"Renewal failed")}catch{B("Renewal failed")}},children:j("detail.renewContract","Renew Contract")}),(0,p.jsx)(q,{variant:"danger",onClick:()=>he(!0),children:j("detail.terminateContract","Terminate Contract")})]})]}),xe&&(0,p.jsx)(re,{onClick:()=>{he(!1),ge("")},children:(0,p.jsxs)(oe,{onClick:e=>e.stopPropagation(),children:[(0,p.jsx)(U,{style:{borderBottom:"none",marginBottom:"8px"},children:j("detail.terminateContract","Terminate Contract")}),(0,p.jsx)("p",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"12px"},children:j("detail.terminationReasonPrompt","Enter termination reason:")}),(0,p.jsx)(K,{value:ue,onChange:e=>ge(e.target.value),placeholder:"Reason...",style:{width:"100%",marginBottom:"16px"}}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",justifyContent:"flex-end"},children:[(0,p.jsx)(q,{variant:"secondary",onClick:()=>{he(!1),ge("")},children:"Cancel"}),(0,p.jsx)(q,{variant:"danger",onClick:async()=>{if(ue.trim()){B(null);try{const e=await fetch(`/api/contracts/${y}/terminate`,{method:"POST",headers:we(),body:JSON.stringify({termination_reason:ue})}),t=await e.json();t.success?(he(!1),ge(""),await ke()):B(t.message||"Termination failed")}catch{B("Termination failed")}}},disabled:!ue.trim(),children:"Terminate"})]})]})})]})},de=r.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>e.color};
  background: ${e=>e.bg};
`,ce={proposal:{bg:"#DBEAFE",color:"#2563EB"},contracting:{bg:"#FEF3C7",color:"#D97706"},setup:{bg:"#F5F3FF",color:"#6D28D9"},active:{bg:"#ECFDF5",color:"#059669"},terminated:{bg:"#F3F4F6",color:"#6B7280"},renewed:{bg:"#EDE9FE",color:"#7C3AED"},expired:{bg:"#F3F4F6",color:"#6B7280"}},pe=(0,r.Ay)(l.J2)`
  cursor: pointer;
  &:hover { background: #F8FAFC; }
`,xe=r.Ay.span`
  color: #D1D5DB;
  font-size: 13px;
`,he=r.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
  flex-shrink: 0;
`,ue=r.Ay.button`
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
`,ge="#2563EB",me="#D97706",fe="#8B5CF6",ye="#059669",ve=e=>{let{entityType:t,pageTitle:n}=e;const{t:r}=(0,o.Bd)("contract"),{user:x}=(0,s.As)(),[h,u]=(0,a.ok)(),[g,m]=(0,i.useState)([]),[f,y]=(0,i.useState)(""),v=h.get("view")||"pipeline",b=h.get("id")?Number(h.get("id")):null,j=e=>{u(t=>{const n=new URLSearchParams(t);return n.set("view",e),n.delete("id"),n},{replace:!0})},F=e=>{u(t=>{const n=new URLSearchParams(t);return e?n.set("id",String(e)):n.delete("id"),n},{replace:!0})},[A,w]=(0,i.useState)(""),[C,S]=(0,i.useState)(!0),[E,_]=(0,i.useState)(null),[B,$]=(0,i.useState)("all"),[D,z]=(0,i.useState)((0,c.x)("all")),[T,R]=(0,i.useState)(!1),[N,I]=(0,i.useState)(""),L=i.useRef(null);(0,i.useEffect)(()=>(L.current&&clearTimeout(L.current),L.current=setTimeout(()=>I(f),400),()=>{L.current&&clearTimeout(L.current)}),[f]);const O=(0,i.useCallback)(async()=>{try{S(!0);const e=(0,P.c4)(),t=new URLSearchParams;A&&t.set("stage",A),N&&t.set("search",N);const n=await fetch(`/api/contracts?${t.toString()}`,{headers:{Authorization:`Bearer ${e}`}}),i=await n.json();i.success?(m(i.data||[]),_(null)):_(i.message||"Failed to load contracts")}catch(e){_("Failed to load contracts")}finally{S(!1)}},[A,N]);(0,i.useEffect)(()=>{O()},[O]);const M=g.filter(e=>{if("all"!==B||T){const t=e.created_at||e.createdAt||"";if(t){const e=t.substring(0,10);if(e<D.start||e>D.end)return!1}}return!0}),U={proposal:M.filter(e=>"proposal"===e.stage).length,contracting:M.filter(e=>"contracting"===e.stage).length,setup:M.filter(e=>"setup"===e.stage).length,active:M.filter(e=>"active"===e.stage).length};return(0,p.jsxs)(l.mc,{children:[(0,p.jsxs)(l.Y9,{children:[(0,p.jsx)(l.hE,{children:n}),!b&&(0,p.jsx)(l.ex,{children:(0,p.jsx)(l.$n,{variant:"primary",onClick:async()=>{try{const e=(0,P.c4)(),n=await fetch("/api/contracts",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({applicant_name:r("newProposal.defaultName","New Proposal"),contract_type:"brand"===t?"franchise":"standard"})}),i=await n.json();i.success?F(i.data.id):_(i.message||"Failed to create proposal")}catch{_("Failed to create proposal")}},children:r("newProposal.button","New Proposal")})})]}),(0,p.jsx)(l.UC,{children:b?(0,p.jsx)(le,{contractId:b,entityType:t,onBack:()=>{F(null),O()}}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(l.MD,{children:[(0,p.jsxs)(l.hI,{color:ge,children:[(0,p.jsx)(l.Os,{children:U.proposal}),(0,p.jsx)(l.v0,{children:r("stages.proposal","Proposal")})]}),(0,p.jsxs)(l.hI,{color:me,children:[(0,p.jsx)(l.Os,{children:U.contracting}),(0,p.jsx)(l.v0,{children:r("stages.contracting","Contracting")})]}),(0,p.jsxs)(l.hI,{color:fe,children:[(0,p.jsx)(l.Os,{children:U.setup}),(0,p.jsx)(l.v0,{children:r("stages.setup","Setup")})]}),(0,p.jsxs)(l.hI,{color:ye,children:[(0,p.jsx)(l.Os,{children:U.active}),(0,p.jsx)(l.v0,{children:r("stages.active","Active")})]})]}),(0,p.jsxs)(c.A,{activePeriod:B,dateRange:D,isCustomDateRange:T,onPeriodChange:e=>{$(e),R(!1),z((0,c.x)(e))},onCalendarRangeSelect:(e,t)=>{z({start:e,end:t}),R(!0)},children:[(0,p.jsxs)(d.Jt,{value:A,onChange:e=>w(e.target.value),style:{minWidth:"120px",maxWidth:"150px"},children:[(0,p.jsx)("option",{value:"",children:r("list.allStages","All Stages")}),(0,p.jsx)("option",{value:"proposal",children:r("stages.proposal","Proposal")}),(0,p.jsx)("option",{value:"contracting",children:r("stages.contracting","Contracting")}),(0,p.jsx)("option",{value:"setup",children:r("stages.setup","Setup")}),(0,p.jsx)("option",{value:"active",children:r("stages.active","Active")}),(0,p.jsx)("option",{value:"terminated",children:r("stages.terminated","Terminated")}),(0,p.jsx)("option",{value:"renewed",children:r("stages.renewed","Renewed")})]}),(0,p.jsx)(d.DO,{placeholder:r("list.search","Search..."),value:f,onChange:e=>y(e.target.value),style:{minWidth:"140px",maxWidth:"200px"}}),(0,p.jsx)("div",{style:{marginLeft:"auto"},children:(0,p.jsxs)(he,{children:[(0,p.jsx)(ue,{active:"pipeline"===v,onClick:()=>j("pipeline"),children:r("views.pipeline","Pipeline")}),(0,p.jsx)(ue,{active:"list"===v,onClick:()=>j("list"),children:r("views.list","List")})]})})]}),E&&(0,p.jsx)("div",{style:{color:"#DC2626",fontSize:"14px",marginBottom:"16px"},children:E}),C?(0,p.jsx)(l.ys,{children:r("common.loading","Loading...")}):"pipeline"===v?(0,p.jsx)(k,{contracts:M,onCardClick:e=>F(e),entityType:t}):(0,p.jsx)(p.Fragment,{children:0===M.length?(0,p.jsx)(l.ys,{children:r("list.empty","No contracts found")}):(0,p.jsx)(l.an,{children:(0,p.jsxs)(l.bQ,{children:[(0,p.jsxs)(l.B_,{children:[(0,p.jsx)(l.gU,{children:r("list.name","Name")}),(0,p.jsx)(l.gU,{children:r("list.stage","Stage")}),(0,p.jsx)(l.gU,{children:r("list.period","Period")}),(0,p.jsx)(l.gU,{children:r("list.restaurant","Restaurant")})]}),(0,p.jsx)("tbody",{children:M.map(e=>{var t;const n=ce[e.stage]||ce.expired;return(0,p.jsxs)(pe,{onClick:()=>F(e.id),children:[(0,p.jsx)(l.Bv,{"data-label":r("list.name","Name"),style:{fontWeight:500},children:e.applicant_name||"-"}),(0,p.jsx)(l.Bv,{"data-label":r("list.stage","Stage"),children:(0,p.jsx)(de,{bg:n.bg,color:n.color,children:e.stage})}),(0,p.jsx)(l.Bv,{"data-label":r("list.period","Period"),children:e.start_date&&e.end_date?`${e.start_date.substring(0,7)} ~ ${e.end_date.substring(0,7)}`:"-"}),(0,p.jsx)(l.Bv,{"data-label":r("list.restaurant","Restaurant"),children:(null===(t=e.restaurant)||void 0===t?void 0:t.name)||(0,p.jsx)(xe,{children:"(unlinked)"})})]},e.id)})})]})})})]})})]})}},9061:(e,t,n)=>{n.d(t,{c:()=>o});var i=n(9950),a=n(4414);const r=/(https?:\/\/[^\s<]+)/g;function o(e){const t=e.split(r);return 1===t.length?e:t.map((e,t)=>r.test(e)?(0,a.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},t):(0,a.jsx)(i.Fragment,{children:e},t))}}}]);