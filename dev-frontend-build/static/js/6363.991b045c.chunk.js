"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6363],{2488:(e,t,n)=>{n.d(t,{DO:()=>x,Jt:()=>c,Qn:()=>p});n(9950);var i=n(4752),r=n(4414);const a=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,o=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,s=i.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,d=i.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,l=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,p=e=>{let{children:t,className:n,style:i,...o}=e;return(0,r.jsx)(a,{className:n,style:i,...o,children:t})},x=e=>{let{placeholder:t="Search...",value:n,onChange:i,style:a,...l}=e;return(0,r.jsxs)(s,{style:a,children:[(0,r.jsx)(o,{placeholder:t,value:n,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...l}),n&&(0,r.jsx)(d,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},c=e=>{let{children:t,...n}=e;return(0,r.jsx)(l,{...n,children:t})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>p,oz:()=>l,tU:()=>d});n(9950);var i=n(4752),r=n(4414);const a=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,o=i.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,s=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:t,className:n,style:i}=e;return(0,r.jsx)(a,{className:n,style:i,children:t})},l=e=>{let{active:t,onClick:n,children:i,className:a}=e;return(0,r.jsx)(o,{active:t,onClick:n,className:a,children:i})},p=e=>{let{count:t,variant:n="default",showZero:i=!1}=e;return 0!==t||i?(0,r.jsx)(s,{variant:n,children:t}):null}},4757:(e,t,n)=>{n.d(t,{A:()=>g});var i=n(9950),r=n(7202),a=n(1627),o=n(4752),s=n(9246),d=n(4414);const l=e=>{let{onSuccess:t,onError:n}=e;const r=(0,a.t2)(),o=(0,a.HH)(),[s,l]=(0,i.useState)(!1),[h,u]=(0,i.useState)("");return(0,d.jsxs)(p,{onSubmit:async e=>{if(e.preventDefault(),!r||!o)return;l(!0),u("");const{error:i}=await r.confirmPayment({elements:o,confirmParams:{return_url:`${window.location.origin}/pos/invoices`},redirect:"if_required"});i?(u(i.message||"Payment failed"),n(i.message||"Payment failed"),l(!1)):t()},children:[(0,d.jsx)(a.He,{}),(0,d.jsx)(x,{type:"submit",disabled:!r||s,children:s?"Processing...":"Pay Now"}),h&&(0,d.jsx)(c,{children:h})]})},p=o.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,x=o.Ay.button`
  width: 100%;
  padding: 12px;
  background: #635BFF;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #4B45C6;
  }

  &:disabled {
    background: #A5B4FC;
    cursor: not-allowed;
  }
`,c=o.Ay.div`
  color: #DC2626;
  font-size: 14px;
  text-align: center;
`,h=o.Ay.div`
  padding: 24px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,u=o.Ay.div`
  padding: 16px;
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`,g=e=>{let{invoiceId:t,onSuccess:n,onError:o}=e;const[p,x]=(0,i.useState)(null),[c,g]=(0,i.useState)(""),[m,w]=(0,i.useState)(!0),[b,f]=(0,i.useState)("");return(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await s.A.post(`/api/invoices/${t}/create-payment-intent`,{},{headers:{Authorization:`Bearer ${e}`}});if(n.data.success){const{clientSecret:e,publishableKey:t}=n.data;if(!t)throw new Error("Stripe publishable key not configured");x((0,r.c)(t)),g(e)}}catch(i){var e,n;const t=(null===(e=i.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.error)||i.message||"Failed to initialize payment";f(t),o(t)}finally{w(!1)}})()},[t]),m?(0,d.jsx)(h,{children:"Initializing payment..."}):b?(0,d.jsx)(u,{children:b}):c&&p?(0,d.jsx)(a.S8,{stripe:p,options:{clientSecret:c,appearance:{theme:"stripe",variables:{colorPrimary:"#635BFF",borderRadius:"8px"}}},children:(0,d.jsx)(l,{onSuccess:n,onError:o})}):(0,d.jsx)(u,{children:"Payment initialization failed. Please try again."})}},8654:(e,t,n)=>{n.d(t,{A:()=>$});var i=n(9950),r=n(4752),a=n(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),p=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=r.Ay.div`
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
`,c=r.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,h=r.Ay.div`
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
`,u=r.Ay.button`
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
`,g=r.Ay.div``,m=r.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,w=r.Ay.button`
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
`,b=r.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=r.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,y=r.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,F=r.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,v=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,k=r.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,j=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,E=r.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,A=r.Ay.div`
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
`,$=e=>{let{startDate:t,endDate:n,onRangeSelect:r,onClose:$,isOpen:S}=e;const C=new Date,[B,D]=(0,i.useState)(C.getMonth()),[z,T]=(0,i.useState)(C.getFullYear()),[Y,I]=(0,i.useState)(null),[L,P]=(0,i.useState)(null),[R,M]=(0,i.useState)(null),[N,_]=(0,i.useState)("start"),H=(0,i.useRef)(null);(0,i.useEffect)(()=>{t&&I(d(t)),n&&P(d(n))},[t,n]),(0,i.useEffect)(()=>{S&&_("start")},[S]),(0,i.useEffect)(()=>{const e=e=>{H.current&&!H.current.contains(e.target)&&$()};return S&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[S,$]);const W=(0,i.useCallback)(()=>{0===B?(D(11),T(e=>e-1)):D(e=>e-1)},[B]),U=(0,i.useCallback)(()=>{11===B?(D(0),T(e=>e+1)):D(e=>e+1)},[B]),O=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),i=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let r=0;r<i;r++)d.push(null);for(let r=1;r<=n;r++)d.push(new Date(e,t,r));return(0,a.jsxs)(y,{children:[(0,a.jsx)(F,{children:p(e,t)}),(0,a.jsx)(v,{children:o.map(e=>(0,a.jsx)(k,{children:e},e))}),(0,a.jsx)(j,{children:d.map((e,t)=>{if(!e)return(0,a.jsx)(E,{},`e-${t}`);const{isStart:n,isEnd:i,isInRange:o,isHoverEnd:d}=(e=>{const t=Y&&l(e,Y),n=L&&l(e,L),i="end"===N&&R?R:L;let r=!1;if(Y&&i){const[t,n]=Y<=i?[Y,i]:[i,Y];r=((e,t,n)=>{const i=e.getTime();return i>t.getTime()&&i<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:r,isHoverEnd:"end"===N&&R&&l(e,R)}})(e),p=l(e,C);return(0,a.jsx)(A,{$isStart:!!n,$isEnd:!!i,$isInRange:o,$isHoverEnd:!!d,$isToday:p,onClick:()=>(e=>{if("start"===N)I(e),P(null),_("end");else{let t=Y,n=e;n<t&&([t,n]=[n,t]),I(t),P(n),_("start"),r(s(t),s(n)),setTimeout($,200)}})(e),onMouseEnter:()=>M(e),onMouseLeave:()=>M(null),children:e.getDate()},e.getTime())})})]})},q=11===B?0:B+1,J=11===B?z+1:z,K=e=>{const t=new Date;let n;const i=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}I(n),P(i),_("start"),r(s(n),s(i)),setTimeout($,150)};return S?(0,a.jsx)(x,{ref:H,children:(0,a.jsxs)(c,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{onClick:()=>K("this_week"),children:"This Week"}),(0,a.jsx)(u,{onClick:()=>K("this_month"),children:"This Month"}),(0,a.jsx)(u,{onClick:()=>K("this_year"),children:"This Year"})]}),(0,a.jsxs)(g,{children:[(0,a.jsxs)(m,{children:[(0,a.jsx)(w,{onClick:W,"aria-label":"Previous month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,a.jsx)(w,{onClick:U,"aria-label":"Next month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,a.jsxs)(b,{children:[O(z,B),(0,a.jsx)(f,{children:O(J,q)})]})]})]})}):null}}}]);