"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6832],{2488:(e,n,t)=>{t.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>c});t(9950);var i=t(4752),r=t(4414);const a=i.Ay.div`
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
`,l=i.Ay.button`
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
`,d=i.Ay.select`
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
`,c=e=>{let{children:n,className:t,style:i,...o}=e;return(0,r.jsx)(a,{className:t,style:i,...o,children:n})},p=e=>{let{placeholder:n="Search...",value:t,onChange:i,style:a,...d}=e;return(0,r.jsxs)(s,{style:a,children:[(0,r.jsx)(o,{placeholder:n,value:t,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:t?"36px":"16px"},...d}),t&&(0,r.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...t}=e;return(0,r.jsx)(d,{...t,children:n})}},2597:(e,n,t)=>{t.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var i=t(4752),r=t(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i}=e;return(0,r.jsx)(a,{className:t,style:i,children:n})},d=e=>{let{active:n,onClick:t,children:i,className:a}=e;return(0,r.jsx)(o,{active:n,onClick:t,className:a,children:i})},c=e=>{let{count:n,variant:t="default",showZero:i=!1}=e;return 0!==n||i?(0,r.jsx)(s,{variant:t,children:n}):null}},4757:(e,n,t)=>{t.d(n,{A:()=>g});var i=t(9950),r=t(7202),a=t(1627),o=t(4752),s=t(9246),l=t(4414);const d=e=>{let{onSuccess:n,onError:t}=e;const r=(0,a.t2)(),o=(0,a.HH)(),[s,d]=(0,i.useState)(!1),[u,h]=(0,i.useState)("");return(0,l.jsxs)(c,{onSubmit:async e=>{if(e.preventDefault(),!r||!o)return;d(!0),h("");const{error:i}=await r.confirmPayment({elements:o,confirmParams:{return_url:`${window.location.origin}/pos/invoices`},redirect:"if_required"});i?(h(i.message||"Payment failed"),t(i.message||"Payment failed"),d(!1)):n()},children:[(0,l.jsx)(a.He,{}),(0,l.jsx)(p,{type:"submit",disabled:!r||s,children:s?"Processing...":"Pay Now"}),u&&(0,l.jsx)(x,{children:u})]})},c=o.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,p=o.Ay.button`
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
`,x=o.Ay.div`
  color: #DC2626;
  font-size: 14px;
  text-align: center;
`,u=o.Ay.div`
  padding: 24px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,h=o.Ay.div`
  padding: 16px;
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`,g=e=>{let{invoiceId:n,onSuccess:t,onError:o}=e;const[c,p]=(0,i.useState)(null),[x,g]=(0,i.useState)(""),[m,y]=(0,i.useState)(!0),[v,j]=(0,i.useState)("");return(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=await s.A.post(`/api/invoices/${n}/create-payment-intent`,{},{headers:{Authorization:`Bearer ${e}`}});if(t.data.success){const{clientSecret:e,publishableKey:n}=t.data;if(!n)throw new Error("Stripe publishable key not configured");p((0,r.c)(n)),g(e)}}catch(i){var e,t;const n=(null===(e=i.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.error)||i.message||"Failed to initialize payment";j(n),o(n)}finally{y(!1)}})()},[n]),m?(0,l.jsx)(u,{children:"Initializing payment..."}):v?(0,l.jsx)(h,{children:v}):x&&c?(0,l.jsx)(a.S8,{stripe:c,options:{clientSecret:x,appearance:{theme:"stripe",variables:{colorPrimary:"#635BFF",borderRadius:"8px"}}},children:(0,l.jsx)(d,{onSuccess:t,onError:o})}):(0,l.jsx)(h,{children:"Payment initialization failed. Please try again."})}},6832:(e,n,t)=>{t.r(n),t.d(n,{default:()=>se});var i=t(9950),r=t(4752),a=t(2853),o=t(4492),s=t(6038),l=t(9018),d=t(1367),c=t(4728),p=t(7617),x=t(8409),u=t(2488),h=t(2597),g=t(5612),m=t(1052),y=t.n(m),v=t(4757),j=t(4414);const f=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`,b=r.Ay.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,w=r.Ay.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`,k=(0,r.Ay)(c.SC)``,C=r.Ay.div``,F=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,S=r.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,A=(0,r.Ay)(c.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,D=r.Ay.button`
  padding: 6px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    padding: 6px 12px;\n    min-width: auto;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n    border-color: #10B981;\n    padding: 6px 12px;\n    min-width: auto;\n\n    &:hover {\n      background: #059669;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    padding: 6px 12px;\n    min-width: auto;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"email"===e.variant?"\n    background: #F3F4F6;\n    color: #6B7280;\n    border-color: #E5E7EB;\n\n    &:hover {\n      background: #E5E7EB;\n      color: #374151;\n    }\n  ":"cancel"===e.variant?"\n    background: #F6F9FC;\n    color: #6B7C93;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #E6EBF1;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    padding: 6px 12px;\n    min-width: auto;\n\n    &:hover {\n      border-color: #635BFF;\n      color: #635BFF;\n      background: #F4F3FF;\n    }\n  "}
`,I=r.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,N=r.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,E=r.Ay.div`
  display: grid;
  gap: 12px;
`,T=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${e=>!1!==e.isActive?1:.6};

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,z=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
  flex-shrink: 0;
`,M=r.Ay.div`
  flex: 1;
`,P=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,_=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,$=r.Ay.div`
  display: flex;
  gap: 8px;
`,R=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,L=r.Ay.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    transform: translateY(-1px);

    svg {
      color: #635BFF;
    }
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
    transition: color 0.15s;
  }
`,W=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,U=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,H=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`,Y=r.Ay.button`
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
`,O=r.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,V=r.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,q=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 640px) {
    width: 95%;
    max-width: none;
  }
`,J=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,G=r.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,Q=r.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`,K=r.Ay.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
`,Z=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,X=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,ee=r.Ay.div`
  margin-bottom: 20px;
`,ne=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,te=r.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,ie=r.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,re=r.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,ae=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,oe=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,se=()=>{const{operationSettings:e}=(0,l.Pj)(),{user:n}=(0,d.As)(),[t,r]=(0,o.ok)(),[m,se]=(0,i.useState)([]),[le,de]=(0,i.useState)(""),[ce,pe]=(0,i.useState)("all"),[xe,ue]=(0,i.useState)(!1),[he,ge]=(0,i.useState)(()=>{const e=new Date;return{start:"2000-01-01",end:(n=e,`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`)};var n}),[me,ye]=(0,i.useState)(!1),[ve,je]=(0,i.useState)(!1),[fe,be]=(0,i.useState)(!1),[we,ke]=(0,i.useState)(!1),[Ce,Fe]=(0,i.useState)(!1),[Be,Se]=(0,i.useState)(!1),[Ae,De]=(0,i.useState)(!1),[Ie,Ne]=(0,i.useState)(!1),[Ee,Te]=(0,i.useState)(!1),[ze,Me]=(0,i.useState)(""),[Pe,_e]=(0,i.useState)(null),[$e,Re]=(0,i.useState)(!1),[Le,We]=(0,i.useState)(""),Ue=t.get("tab")||"to_pay",He=e=>{r({tab:e})},Ye=e=>{pe(e),ue(!1);const n=new Date;let t=new Date,i=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"week":t.setDate(n.getDate()-n.getDay());break;case"month":t=new Date(n.getFullYear(),n.getMonth(),1),i=new Date(n.getFullYear(),n.getMonth()+1,0);break;case"year":t=new Date(n.getFullYear(),0,1),i=new Date(n.getFullYear(),11,31);break;case"all":t=new Date(2e3,0,1)}ge({start:r(t),end:r(i)})},Oe=(e,n)=>{ue(!0),ge(t=>({...t,[e]:n}))},[Ve,qe]=(0,i.useState)([]),[Je,Ge]=(0,i.useState)([]),[Qe,Ke]=(0,i.useState)(""),[Ze,Xe]=(0,i.useState)("all"),[en,nn]=(0,i.useState)(!1),[tn,rn]=(0,i.useState)({start:"",end:""}),an=e=>{Xe(e),nn(!1);const n=new Date;let t=new Date,i=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"week":t.setDate(n.getDate()-n.getDay());break;case"month":t=new Date(n.getFullYear(),n.getMonth(),1),i=new Date(n.getFullYear(),n.getMonth()+1,0);break;case"year":t=new Date(n.getFullYear(),0,1),i=new Date(n.getFullYear(),11,31);break;case"all":t=new Date(2e3,0,1)}rn({start:r(t),end:r(i)})},on=(e,n)=>{nn(!0),rn(t=>({...t,[e]:n}))},[sn,ln]=(0,i.useState)(""),[dn,cn]=(0,i.useState)("all"),[pn,xn]=(0,i.useState)(!1),[un,hn]=(0,i.useState)({start:"",end:""}),gn=e=>{cn(e),xn(!1);const n=new Date;let t=new Date,i=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"week":t.setDate(n.getDate()-n.getDay());break;case"month":t=new Date(n.getFullYear(),n.getMonth(),1),i=new Date(n.getFullYear(),n.getMonth()+1,0);break;case"year":t=new Date(n.getFullYear(),0,1),i=new Date(n.getFullYear(),11,31);break;case"all":t=new Date(2e3,0,1)}hn({start:"all"===e?"":r(t),end:"all"===e?"":r(i)})},mn=(e,n)=>{xn(!0),hn(t=>({...t,[e]:n}))},[yn,vn]=(0,i.useState)(!1),[jn,fn]=(0,i.useState)({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),[bn,wn]=(0,i.useState)([]),[kn,Cn]=(0,i.useState)(!1),[Fn,Bn]=(0,i.useState)(null),[Sn,An]=(0,i.useState)(!1),[Dn,In]=(0,i.useState)(!1),[Nn,En]=(0,i.useState)(null),[Tn,zn]=(0,i.useState)({name:"",code:"",description:""}),[Mn,Pn]=(0,i.useState)(!1),[_n,$n]=(0,i.useState)(!1),[Rn,Ln]=(0,i.useState)(null),[Wn,Un]=(0,i.useState)(null),[Hn,Yn]=(0,i.useState)(null),[On,Vn]=(0,i.useState)(""),[qn,Jn]=(0,i.useState)(""),[Gn,Qn]=(0,i.useState)({managers:[],restaurants:[]}),[Kn,Zn]=(0,i.useState)(!1),[Xn,et]=(0,i.useState)(null),[nt,tt]=(0,i.useState)([]),[it,rt]=(0,i.useState)([]),[at,ot]=(0,i.useState)({managers:[],restaurants:[]}),[st,lt]=(0,i.useState)(""),[dt,ct]=(0,i.useState)(!1),[pt,xt]=(0,i.useState)(null),[ut,ht]=(0,i.useState)(null),[gt,mt]=(0,i.useState)([]),[yt,vt]=(0,i.useState)({}),[jt,ft]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"MYR",discountType:"none",discountValue:"",discountReason:""}),bt=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void se([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),se(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),se([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),se([])}},wt=async()=>{console.log("[BrandInvoices] fetchInvoicesToPay called");try{const e=localStorage.getItem("auth_token");if(!e)return console.log("[BrandInvoices] No token found"),void qe([]);console.log("[BrandInvoices] Calling /api/invoices/to-pay...");const n=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("[BrandInvoices] Response status:",n.status),n.ok){const e=await n.json();console.log("[BrandInvoices] Received invoices to pay:",e.length,e),qe(e)}else{const e=await n.text();console.error("[BrandInvoices] Failed to fetch invoices to pay:",n.status,e),qe([])}}catch(e){console.error("[BrandInvoices] Error fetching invoices to pay:",e),qe([])}},kt=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void Ge([]);const n=await fetch("/api/invoices/to-pay?status=paid",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();Ge(e)}else Ge([])}catch(e){console.error("Error fetching paid invoices:",e),Ge([])}},Ct=async e=>{Un(e),fn({paymentMethod:"",transactionId:"",notes:"",receiptImage:""}),vn(!0),await(async(e,n,t)=>{Cn(!0);try{let i=`/api/admin/payment-settings/available/${e}`;"brand"===n&&t?i=`/api/brands/${t}/payment-settings/available/${e}`:"foodcourt"===n&&t&&(i=`/api/foodcourts/${t}/payment-settings/available/${e}`);const r=localStorage.getItem("auth_token"),a=await fetch(i,{headers:{Authorization:`Bearer ${r}`}});if(a.ok){const e=await a.json();wn(e.methods||[]),e.methods&&e.methods.length>0&&fn(n=>({...n,paymentMethod:e.methods[0].id}))}else wn([])}catch(i){console.error("Error fetching payment methods:",i),wn([])}finally{Cn(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId)},Ft=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&mt(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Bt=(0,i.useCallback)(async()=>{if(null!==n&&void 0!==n&&n.brand_id)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/brands/${n.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){var e;const n=await i.json(),t=n.data||n;if(null!==(e=t.payment_settings)&&void 0!==e&&e.additionalCharges){const e=t.payment_settings.additionalCharges;Array.isArray(e)?vt({}):vt(e)}}}catch(t){console.error("Error fetching brand payment settings:",t)}},[null===n||void 0===n?void 0:n.brand_id]),St=()=>{In(!1),En(null),zn({name:"",code:"",description:""})};(0,i.useEffect)(()=>{bt(),wt(),kt(),Nt(),Et(),Mt(),It(),Ft(),Bt()},[]);const At=e=>{const n=(0,s.Wh)(e);return yt[n]||yt[e]||[]},Dt=At(jt.currency),It=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&setCurrencyConfig(n.currencies)}}catch(e){console.error("Error fetching currency config:",e)}},Nt=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t,i]=await Promise.all([fetch("/api/users?role=Manager",{headers:e}),fetch("/api/users?role=Foodcourt_Manager",{headers:e}),fetch("/api/users?role=Brand_Manager",{headers:e})]);let r=[];if(n.ok){const e=await n.json(),t=e.success?e.data:Array.isArray(e)?e:[];if(Array.isArray(t)){const e=t.map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Restaurant Manager"}));r=[...r,...e]}}if(t.ok){const e=await t.json(),n=e.success?e.data:Array.isArray(e)?e:[];if(Array.isArray(n)){const e=n.map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt Manager"}));r=[...r,...e]}}if(i.ok){const e=await i.json(),n=e.success?e.data:Array.isArray(e)?e:[];if(Array.isArray(n)){const e=n.map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand Manager"}));r=[...r,...e]}}tt(r)}catch(e){console.error("Error fetching managers:",e),tt([])}},Et=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||""}});rt(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),rt([])}catch(e){console.error("Error fetching restaurants:",e),rt([])}},Tt=(e,n)=>{if(et({type:e,data:n}),Jn("manager"===e?n.fullName:n.name),Zn(!1),"manager"===e){const e=n;Yn({...Hn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=nt.find(n=>n.id===e.admin_id);Yn({...Hn,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},zt=(e,n)=>{if(xt({type:e,data:n}),ct(!1),lt("manager"===e?n.fullName:n.name),"manager"===e){const e=n;ft({...jt,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=nt.find(n=>n.id===e.admin_id);let i=e.currency||"MYR";"RM"===i&&(i="MYR"),ft({...jt,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:t?t.fullName:"",companyName:e.name,currency:i})}},Mt=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands/company-info",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();return void ht({companyName:e.company_name||e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postalCode:e.postal_code||"",country:e.country||"",phone:e.phone||"",email:e.email||"",website:e.website||"",taxNumber:e.tax_no||"",registrationNumber:e.registration_no||"",companyLogo:e.logo_url||"",bankName:e.bank_name||"",bankAccount:e.bank_account||"",bankAccountName:e.bank_account_name||""})}const t=await fetch("/api/admin/settings");if(t.ok){const e=await t.json();ht(e)}else console.warn("Company settings not found"),ht({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:""})}catch(e){console.error("Error fetching company settings:",e),ht({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:""})}},Pt=e=>{var n,t,i,r,a,o,l,d,c,p,x,u,h,g,m;const y=("to_pay"===Ue||"paid"===Ue)&&e.issuerInfo,v=y?{companyName:null===(n=e.issuerInfo)||void 0===n?void 0:n.name,companyLogo:null===(t=e.issuerInfo)||void 0===t?void 0:t.logoUrl,address:null===(i=e.issuerInfo)||void 0===i?void 0:i.address,city:null===(r=e.issuerInfo)||void 0===r?void 0:r.city,state:null===(a=e.issuerInfo)||void 0===a?void 0:a.state,postalCode:null===(o=e.issuerInfo)||void 0===o?void 0:o.postalCode,country:null===(l=e.issuerInfo)||void 0===l?void 0:l.country,phone:null===(d=e.issuerInfo)||void 0===d?void 0:d.phone,email:null===(c=e.issuerInfo)||void 0===c?void 0:c.email,bankName:null===(p=e.issuerInfo)||void 0===p?void 0:p.bankName,bankAccount:null===(x=e.issuerInfo)||void 0===x?void 0:x.bankAccount,bankAccountName:null===(u=e.issuerInfo)||void 0===u?void 0:u.bankAccountName,swiftCode:null===(h=e.issuerInfo)||void 0===h?void 0:h.swiftCode,taxNumber:null===(g=e.issuerInfo)||void 0===g?void 0:g.taxId,registrationNumber:null===(m=e.issuerInfo)||void 0===m?void 0:m.businessRegistration}:ut;if(!v)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${v.companyLogo?`<img src="${v.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name" style="${v.companyLogo?"font-size: 14px;":""}">${v.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${v.address?`${v.address}<br>`:""}\n                    ${[v.city,v.state,v.postalCode].filter(Boolean).join(", ")}${v.city||v.state||v.postalCode?"<br>":""}\n                    ${v.country?`${v.country}<br>`:""}\n                    ${v.phone?`Tel: ${v.phone}<br>`:""}\n                    ${v.email?`Email: ${v.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                ${y?`\n                <div class="customer-name">${(null===ut||void 0===ut?void 0:ut.companyName)||"Your Company"}</div>\n                ${null!==ut&&void 0!==ut&&ut.address?`<div class="customer-details">${ut.address}</div>`:""}\n                ${[null===ut||void 0===ut?void 0:ut.city,null===ut||void 0===ut?void 0:ut.state,null===ut||void 0===ut?void 0:ut.postalCode].filter(Boolean).length>0?`<div class="customer-details">${[null===ut||void 0===ut?void 0:ut.city,null===ut||void 0===ut?void 0:ut.state,null===ut||void 0===ut?void 0:ut.postalCode].filter(Boolean).join(", ")}</div>`:""}\n                ${null!==ut&&void 0!==ut&&ut.country?`<div class="customer-details">${ut.country}</div>`:""}\n                ${null!==ut&&void 0!==ut&&ut.email?`<div class="customer-details">${ut.email}</div>`:""}\n                `:`\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${"restaurant"===e.payerType&&e.restaurantName&&"Unknown"!==e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n                `}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${Wt(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${Wt(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${Wt(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,s.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,s.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,s.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row tax">\n                    <span>Tax (6%):</span>\n                    <span>${(0,s.vv)(e.tax,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,s.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${v.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${v.bankName}<br>\n                <strong>Account Name:</strong> ${v.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${v.bankAccount||"-"}\n                ${v.swiftCode?`<br><strong>SWIFT Code:</strong> ${v.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${v.taxNumber||v.registrationNumber?`\n        <div class="registration-info">\n            ${v.registrationNumber?`Reg No: ${v.registrationNumber}`:""}\n            ${v.registrationNumber&&v.taxNumber?" | ":""}\n            ${v.taxNumber?`Tax No: ${v.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},_t=async e=>{if(!(("to_pay"===Ue||"paid"===Ue)&&e.issuerInfo||ut))return We("Company settings not loaded. Please try again."),void Re(!0);try{var n;const t=Pt(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(t),r.close(),await new Promise(async e=>{try{var n;null!==(n=r.fonts)&&void 0!==n&&n.ready&&await r.fonts.ready}catch{}const t=r.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const a=await y()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new g.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),We("Failed to generate PDF. Please try again."),Re(!0)}},$t=e=>{if(!(("to_pay"===Ue||"paid"===Ue)&&e.issuerInfo||ut))return We("Company settings not loaded. Please try again."),void Re(!0);const n=Pt(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},Rt=async e=>{_e(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=it.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=nt.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=nt.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}Me(n),Te(!0)},Lt=()=>{ft({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"MYR",discountType:"none",discountValue:"",discountReason:""}),xt(null),lt(""),ct(!1)},Wt=e=>new Date(e).toLocaleDateString("en-MY"),Ut=e=>{if("pending_payment"!==e.status)return!1;const n=new Date;return new Date(e.dueDate)<n},Ht=e=>Ut(e)?"overdue":e.status,Yt=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},Ot=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},Vt=m.filter(e=>{const n=le.toLowerCase(),t=Yt(e.status).toLowerCase(),i=(e=>{switch(e){case"automatic":return"Automatic";case"manual":return"Manual";default:return e||"Manual"}})(e.type||"").toLowerCase(),r=Ot(e.payerType||"").toLowerCase(),a=!le||e.companyName.toLowerCase().includes(n)||e.invoiceNumber.toLowerCase().includes(n)||e.managerName.toLowerCase().includes(n)||(e.restaurantName||"").toLowerCase().includes(n)||t.includes(n)||i.includes(n)||r.includes(n)||(e.categoryDisplayName||"").toLowerCase().includes(n)||(e.planType||"").toLowerCase().includes(n);let o=!0;if(he.start&&he.end){const n=new Date(e.issueDate),t=new Date(he.start),i=new Date(he.end);t.setHours(0,0,0,0),i.setHours(23,59,59,999),o=n>=t&&n<=i}return a&&o}).sort((e,n)=>{const t=new Date(e.issueDate).getTime();return new Date(n.issueDate).getTime()-t}),qt=[...m,...Ve],Jt=m.length,Gt=Ve.length,Qt=qt.filter(e=>Ut(e)).length,Kt=qt.filter(e=>"pending_payment"===e.status||"payment_submitted"===e.status).length,Zt=Ve.filter(e=>{const n=Qe.toLowerCase(),t=Yt(e.status).toLowerCase(),i=!Qe||e.invoiceNumber.toLowerCase().includes(n)||(e.issuerName||"").toLowerCase().includes(n)||(e.restaurantName||"").toLowerCase().includes(n)||t.includes(n)||(e.categoryDisplayName||"").toLowerCase().includes(n)||(e.planType||"").toLowerCase().includes(n);let r=!0;if(tn.start&&tn.end){const n=new Date(e.issueDate),t=new Date(tn.start),i=new Date(tn.end);t.setHours(0,0,0,0),i.setHours(23,59,59,999),r=n>=t&&n<=i}return i&&r}).sort((e,n)=>{const t=new Date(e.issueDate).getTime();return new Date(n.issueDate).getTime()-t}),Xt=Je.filter(e=>{const n=sn.toLowerCase(),t=!sn||e.invoiceNumber.toLowerCase().includes(n)||(e.issuerName||"").toLowerCase().includes(n)||(e.restaurantName||"").toLowerCase().includes(n)||(e.categoryDisplayName||"").toLowerCase().includes(n)||(e.planType||"").toLowerCase().includes(n);let i=!0;if(un.start&&un.end){const n=new Date(e.paidDate||e.issueDate),t=new Date(un.start),r=new Date(un.end);t.setHours(0,0,0,0),r.setHours(23,59,59,999),i=n>=t&&n<=r}return t&&i}).sort((e,n)=>{const t=new Date(e.paidDate||e.issueDate).getTime();return new Date(n.paidDate||n.issueDate).getTime()-t}),ei=e=>{Un(e),je(!0)},ni=e=>{var n,t;Un(e);if(Yn({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:(e=>{if(!e)return"";return new Date(e).toISOString().split("T")[0]})(e.dueDate),status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",invoiceCategory:e.invoiceCategory||"service",customDescription:e.customDescription||"",serviceDescription:e.serviceDescription||"",currency:e.currency||"MYR",items:e.items}),e.restaurantId){const n=it.find(n=>n.id===e.restaurantId);n&&(et({type:"restaurant",data:n}),Jn(n.name))}else if(e.managerId){const n=nt.find(n=>n.id===e.managerId);n&&(et({type:"manager",data:n}),Jn(n.fullName))}Vn(""),be(!0)},ti=e=>{Un(e),Ne(!0)};return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(x.mc,{children:[(0,j.jsxs)(x.Y9,{children:[(0,j.jsx)(x.hE,{children:"Invoices"}),(0,j.jsx)(x.ex,{})]}),(0,j.jsxs)(x.UC,{children:[(0,j.jsxs)(x.MD,{children:[(0,j.jsxs)(x.hI,{color:"#059669",children:[(0,j.jsx)(x.Os,{children:Jt}),(0,j.jsx)(x.v0,{children:"Issued"}),(0,j.jsx)(x.d1,{children:"Invoices you sent"})]}),(0,j.jsxs)(x.hI,{color:"#2563EB",children:[(0,j.jsx)(x.Os,{children:Gt}),(0,j.jsx)(x.v0,{children:"To Pay"}),(0,j.jsx)(x.d1,{children:"Invoices received"})]}),(0,j.jsxs)(x.hI,{color:"#F59E0B",children:[(0,j.jsx)(x.Os,{children:Kt}),(0,j.jsx)(x.v0,{children:"Pending"}),(0,j.jsx)(x.d1,{children:"Awaiting payment"})]}),(0,j.jsxs)(x.hI,{color:"#DC2626",children:[(0,j.jsx)(x.Os,{children:Qt}),(0,j.jsx)(x.v0,{children:"Overdue"}),(0,j.jsx)(x.d1,{children:"Requires attention"})]})]}),(0,j.jsxs)(h.tU,{children:[(0,j.jsxs)(h.oz,{active:"to_pay"===Ue,onClick:()=>He("to_pay"),children:["Invoices to Pay",(0,j.jsx)(h.Ex,{count:Ve.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,variant:"warning"})]}),(0,j.jsxs)(h.oz,{active:"paid"===Ue,onClick:()=>He("paid"),children:["Paid Invoices",(0,j.jsx)(h.Ex,{count:Je.length})]}),(0,j.jsxs)(h.oz,{active:"issued"===Ue,onClick:()=>He("issued"),children:["Issued Invoices",(0,j.jsx)(h.Ex,{count:m.length})]}),(0,j.jsxs)(h.oz,{active:"categories"===Ue,onClick:()=>He("categories"),children:["Categories",(0,j.jsx)(h.Ex,{count:gt.length})]})]}),"issued"===Ue&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(f,{children:[(0,j.jsxs)(b,{children:[(0,j.jsxs)(H,{children:[(0,j.jsx)(Y,{active:"week"===ce&&!xe,onClick:()=>Ye("week"),children:"Week"}),(0,j.jsx)(Y,{active:"month"===ce&&!xe,onClick:()=>Ye("month"),children:"Month"}),(0,j.jsx)(Y,{active:"year"===ce&&!xe,onClick:()=>Ye("year"),children:"Year"}),(0,j.jsx)(Y,{active:"all"===ce&&!xe,onClick:()=>Ye("all"),children:"All"}),(0,j.jsx)(O,{type:"date",value:he.start,onChange:e=>Oe("start",e.target.value)}),(0,j.jsx)(O,{type:"date",value:he.end,onChange:e=>Oe("end",e.target.value)})]}),(0,j.jsx)(u.DO,{placeholder:"Search invoice, status, company, type...",value:le,onChange:e=>de(e.target.value)})]}),(0,j.jsx)(w,{children:(0,j.jsx)(k,{variant:"primary",onClick:()=>{Lt(),ye(!0)},children:"Create Invoice"})})]}),(0,j.jsx)(x.an,{children:(0,j.jsxs)(x.bQ,{children:[(0,j.jsx)(x.B_,{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)(x.gU,{children:"Invoice"}),(0,j.jsx)(x.gU,{children:"Customer"}),(0,j.jsx)(x.gU,{align:"center",children:"Period"}),(0,j.jsx)(x.gU,{align:"center",children:"Issued"}),(0,j.jsx)(x.gU,{align:"center",children:"Due"}),(0,j.jsx)(x.gU,{align:"center",children:"Status"}),(0,j.jsx)(x.gU,{align:"right",children:"Amount"}),(0,j.jsx)(x.gU,{align:"right",children:"Total"}),(0,j.jsx)(x.gU,{align:"center",children:"Actions"})]})}),(0,j.jsxs)("tbody",{children:[Vt.map(e=>(0,j.jsxs)(x.J2,{children:[(0,j.jsx)(x.Bv,{"data-label":"Invoice",children:(0,j.jsxs)(C,{children:[(0,j.jsxs)(F,{children:[e.invoiceNumber,"automatic"===e.type&&(0,j.jsx)(S,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,j.jsx)(B,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,j.jsx)(x.Bv,{"data-label":"Customer",children:(0,j.jsxs)(C,{children:[(0,j.jsx)(F,{children:e.customerName||e.restaurantName||"Unknown"}),(0,j.jsx)(B,{children:Ot(e.payerType||"restaurant")})]})}),(0,j.jsx)(x.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,j.jsx)(x.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:Wt(e.issueDate)}),(0,j.jsx)(x.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:Wt(e.dueDate)}),(0,j.jsxs)(x.Bv,{"data-label":"Status",align:"center",children:[(0,j.jsx)(A,{status:Ht(e),children:Yt(Ht(e))}),e.isModified&&(0,j.jsx)("span",{style:{display:"inline-block",marginLeft:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px",verticalAlign:"middle"},children:"Modified"})]}),(0,j.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,j.jsx)(x.DM,{children:(0,s.vv)(e.amount,e.currency||"MYR")})}),(0,j.jsx)(x.Bv,{"data-label":"Total",align:"right",children:(0,j.jsx)(x.DM,{highlight:!0,children:0===e.total?(0,j.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,s.vv)(e.total,e.currency||"MYR")})}),(0,j.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,j.jsxs)(x.wr,{children:[(0,j.jsx)(D,{variant:"primary",onClick:()=>ei(e),children:"View"}),"draft"===e.status&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(D,{onClick:()=>ni(e),children:"Edit"}),(0,j.jsx)(D,{variant:"success",onClick:()=>(e=>{Un(e),Fe(!0)})(e),title:"Send Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,j.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,j.jsx)(I,{onClick:()=>ti(e),title:"Delete Invoice",children:(0,j.jsx)(N,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(D,{onClick:()=>ni(e),children:"Edit"}),(0,j.jsx)(D,{onClick:()=>_t(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(D,{onClick:()=>$t(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,j.jsx)(D,{variant:"email",onClick:()=>Rt(e),title:"Send Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,j.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,j.jsx)(I,{onClick:()=>ti(e),title:"Delete Invoice",children:(0,j.jsx)(N,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,j.jsxs)(j.Fragment,{children:[e.hasPaymentInfo&&(0,j.jsx)(D,{variant:"primary",onClick:()=>(e=>{Un(e),ke(!0)})(e),children:"Confirm"}),(0,j.jsx)(D,{onClick:()=>_t(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(D,{onClick:()=>$t(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,j.jsx)(D,{variant:"email",onClick:()=>Rt(e),title:"Resend Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,j.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(D,{onClick:()=>ni(e),children:"Edit"}),(0,j.jsx)(D,{onClick:()=>_t(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(D,{onClick:()=>$t(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,j.jsx)(D,{variant:"email",onClick:()=>Rt(e),title:"Resend Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,j.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,j.jsx)(I,{onClick:()=>ti(e),title:"Delete Invoice",children:(0,j.jsx)(N,{children:"\xd7"})})]}),"paid"===e.status&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(D,{onClick:()=>_t(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(D,{onClick:()=>$t(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,j.jsx)(D,{onClick:()=>_t(e),title:"Download Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id)),0===Vt.length&&(0,j.jsx)(x.J2,{children:(0,j.jsx)(x.Bv,{colSpan:9,children:(0,j.jsxs)(x.ys,{children:[(0,j.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,j.jsx)("div",{style:{fontSize:"14px"},children:0===m.length?"Create your first invoice to get started":"Try adjusting your filters"})]})})})]})]})})]}),"to_pay"===Ue&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(f,{children:(0,j.jsxs)(b,{children:[(0,j.jsxs)(H,{children:[(0,j.jsx)(Y,{active:"week"===Ze&&!en,onClick:()=>an("week"),children:"Week"}),(0,j.jsx)(Y,{active:"month"===Ze&&!en,onClick:()=>an("month"),children:"Month"}),(0,j.jsx)(Y,{active:"year"===Ze&&!en,onClick:()=>an("year"),children:"Year"}),(0,j.jsx)(Y,{active:"all"===Ze&&!en,onClick:()=>an("all"),children:"All"}),(0,j.jsx)(O,{type:"date",value:tn.start,onChange:e=>on("start",e.target.value)}),(0,j.jsx)(O,{type:"date",value:tn.end,onChange:e=>on("end",e.target.value)})]}),(0,j.jsx)(u.DO,{placeholder:"Search invoice, status, issuer...",value:Qe,onChange:e=>Ke(e.target.value)})]})}),(0,j.jsx)(x.an,{children:(0,j.jsxs)(x.bQ,{children:[(0,j.jsx)(x.B_,{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)(x.gU,{children:"Invoice"}),(0,j.jsx)(x.gU,{children:"Issuer"}),(0,j.jsx)(x.gU,{align:"center",children:"Period"}),(0,j.jsx)(x.gU,{align:"center",children:"Issued"}),(0,j.jsx)(x.gU,{align:"center",children:"Due"}),(0,j.jsx)(x.gU,{align:"center",children:"Status"}),(0,j.jsx)(x.gU,{align:"right",children:"Amount"}),(0,j.jsx)(x.gU,{align:"right",children:"Total"}),(0,j.jsx)(x.gU,{align:"center",children:"Actions"})]})}),(0,j.jsx)("tbody",{children:Zt.length>0?Zt.map(e=>(0,j.jsxs)(x.J2,{children:[(0,j.jsx)(x.Bv,{"data-label":"Invoice",children:(0,j.jsxs)(C,{children:[(0,j.jsxs)(F,{children:[e.invoiceNumber,"automatic"===e.type&&(0,j.jsx)(S,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,j.jsx)(B,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,j.jsx)(x.Bv,{"data-label":"Issuer",children:(0,j.jsxs)(C,{children:[(0,j.jsx)(F,{children:e.issuerName||("system_admin"===e.issuerType?"System Admin":"brand"===e.issuerType?"Brand":"Foodcourt")}),(0,j.jsx)(B,{children:e.restaurantName&&"Unknown"!==e.restaurantName?`For: ${e.restaurantName}`:""})]})}),(0,j.jsx)(x.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,j.jsx)(x.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:Wt(e.issueDate)}),(0,j.jsx)(x.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:Wt(e.dueDate)}),(0,j.jsxs)(x.Bv,{"data-label":"Status",align:"center",children:[(0,j.jsx)(A,{status:Ht(e),children:Yt(Ht(e))}),e.isModified&&(0,j.jsx)("span",{style:{display:"inline-block",marginLeft:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px",verticalAlign:"middle"},children:"Modified"})]}),(0,j.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,j.jsx)(x.DM,{children:(0,s.vv)(e.amount,e.currency||"MYR")})}),(0,j.jsx)(x.Bv,{"data-label":"Total",align:"right",children:(0,j.jsx)(x.DM,{highlight:!0,children:0===e.total?(0,j.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,s.vv)(e.total,e.currency||"MYR")})}),(0,j.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,j.jsxs)(x.wr,{children:[(0,j.jsx)(D,{variant:"primary",onClick:()=>ei(e),children:"View"}),("pending_payment"===e.status||"overdue"===e.status)&&e.total>0&&(0,j.jsx)(D,{variant:"success",onClick:()=>Ct(e),children:"Pay"}),(0,j.jsx)(D,{onClick:()=>_t(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(D,{onClick:()=>$t(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,j.jsx)(D,{variant:"email",onClick:()=>Rt(e),title:"Email Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,j.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]})})]},e.id)):(0,j.jsx)(x.J2,{children:(0,j.jsx)(x.Bv,{colSpan:9,children:(0,j.jsx)(x.ys,{children:"No invoices to pay"})})})})]})})]}),"paid"===Ue&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(f,{children:(0,j.jsxs)(b,{children:[(0,j.jsxs)(H,{children:[(0,j.jsx)(Y,{active:"week"===dn&&!pn,onClick:()=>gn("week"),children:"Week"}),(0,j.jsx)(Y,{active:"month"===dn&&!pn,onClick:()=>gn("month"),children:"Month"}),(0,j.jsx)(Y,{active:"year"===dn&&!pn,onClick:()=>gn("year"),children:"Year"}),(0,j.jsx)(Y,{active:"all"===dn&&!pn,onClick:()=>gn("all"),children:"All"}),(0,j.jsx)(O,{type:"date",value:un.start,onChange:e=>mn("start",e.target.value)}),(0,j.jsx)(O,{type:"date",value:un.end,onChange:e=>mn("end",e.target.value)})]}),(0,j.jsx)(u.DO,{placeholder:"Search invoice, issuer, restaurant...",value:sn,onChange:e=>ln(e.target.value)})]})}),(0,j.jsx)(x.an,{children:(0,j.jsxs)(x.bQ,{children:[(0,j.jsx)(x.B_,{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)(x.gU,{children:"Invoice"}),(0,j.jsx)(x.gU,{children:"Issuer"}),(0,j.jsx)(x.gU,{align:"center",children:"Period"}),(0,j.jsx)(x.gU,{align:"center",children:"Paid Date"}),(0,j.jsx)(x.gU,{align:"center",children:"Status"}),(0,j.jsx)(x.gU,{align:"right",children:"Amount"}),(0,j.jsx)(x.gU,{align:"right",children:"Total"}),(0,j.jsx)(x.gU,{align:"center",children:"Actions"})]})}),(0,j.jsx)("tbody",{children:Xt.length>0?Xt.map(e=>(0,j.jsxs)(x.J2,{children:[(0,j.jsx)(x.Bv,{"data-label":"Invoice",children:(0,j.jsxs)(C,{children:[(0,j.jsxs)(F,{children:[e.invoiceNumber,"automatic"===e.type&&(0,j.jsx)(S,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,j.jsx)(B,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,j.jsx)(x.Bv,{"data-label":"Issuer",children:(0,j.jsxs)(C,{children:[(0,j.jsx)(F,{children:e.issuerName||("system_admin"===e.issuerType?"System Admin":"brand"===e.issuerType?"Brand":"Foodcourt")}),(0,j.jsx)(B,{children:e.restaurantName&&"Unknown"!==e.restaurantName?`For: ${e.restaurantName}`:""})]})}),(0,j.jsx)(x.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,j.jsx)(x.Bv,{"data-label":"Paid",align:"center",style:{fontSize:"13px"},children:e.paidDate?Wt(e.paidDate):Wt(e.issueDate)}),(0,j.jsx)(x.Bv,{"data-label":"Status",align:"center",children:(0,j.jsx)(A,{status:"paid",children:"Paid"})}),(0,j.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,j.jsx)(x.DM,{children:(0,s.vv)(e.amount,e.currency||"MYR")})}),(0,j.jsx)(x.Bv,{"data-label":"Total",align:"right",children:(0,j.jsx)(x.DM,{highlight:!0,children:0===e.total?(0,j.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,s.vv)(e.total,e.currency||"MYR")})}),(0,j.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,j.jsxs)(x.wr,{children:[(0,j.jsx)(D,{variant:"primary",onClick:()=>ei(e),children:"View"}),(0,j.jsx)(D,{onClick:()=>_t(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(D,{onClick:()=>$t(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})})]},e.id)):(0,j.jsx)(x.J2,{children:(0,j.jsx)(x.Bv,{colSpan:8,children:(0,j.jsx)(x.ys,{children:"No paid invoices yet"})})})})]})})]}),"categories"===Ue&&(0,j.jsxs)("div",{style:{padding:"24px 0"},children:[(0,j.jsxs)(W,{children:[(0,j.jsxs)("div",{children:[(0,j.jsx)(U,{children:"Invoice Categories"}),(0,j.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,j.jsx)(k,{variant:"primary",onClick:()=>{En(null),zn({name:"",code:"",description:""}),In(!0)},children:"Add Category"})]}),0===gt.length?(0,j.jsxs)(a.pp,{children:[(0,j.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,j.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to organize charges."}),(0,j.jsx)(k,{variant:"primary",onClick:()=>{En(null),zn({name:"",code:"",description:""}),In(!0)},children:"Add Category"})]}):(0,j.jsx)(E,{children:gt.map(e=>(0,j.jsxs)(T,{isActive:e.is_active,children:[(0,j.jsx)(z,{children:e.name.charAt(0).toUpperCase()}),(0,j.jsxs)(M,{children:[(0,j.jsxs)(P,{children:[e.name,(0,j.jsx)(R,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,j.jsxs)(_,{children:[(0,j.jsxs)("span",{children:["Code: ",(0,j.jsx)("strong",{children:e.code})]}),e.description&&(0,j.jsx)("span",{children:e.description})]})]}),(0,j.jsxs)($,{children:[(0,j.jsx)(L,{onClick:()=>{En(e),zn({name:e.name,code:e.code,description:e.description||""}),In(!0)},title:"Edit Category",children:(0,j.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,j.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,j.jsx)(L,{onClick:()=>{Ln(e),$n(!0)},title:"Delete Category",children:(0,j.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,j.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),yn&&Wn&&(0,j.jsx)(V,{onClick:()=>vn(!1),children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,j.jsxs)(J,{children:[(0,j.jsx)(G,{children:"Submit Payment"}),(0,j.jsx)(Q,{onClick:()=>vn(!1),children:"\xd7"})]}),(0,j.jsxs)(K,{children:[(0,j.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,j.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,j.jsx)("strong",{children:Wn.invoiceNumber})]}),(0,j.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,s.vv)(Wn.total,Wn.currency)})]}),kn?(0,j.jsx)("div",{style:{textAlign:"center",padding:"20px",color:"#6B7280"},children:"Loading payment methods..."}):0===bn.length?(0,j.jsxs)("div",{style:{padding:"20px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,j.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#92400E",fontSize:"15px"},children:"Payment Not Available"}),"system_admin"===Wn.issuerType?(0,j.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:[(0,j.jsx)("strong",{children:"System Admin"})," has not configured payment methods for ",(0,j.jsx)("strong",{children:Wn.currency||"MYR"})," yet. Please contact the system administrator."]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("p",{style:{margin:"0 0 12px 0",color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:["No payment methods configured for ",(0,j.jsx)("strong",{children:Wn.currency||"MYR"}),". Please set up your payment settings first."]}),(0,j.jsx)("button",{onClick:()=>{vn(!1),window.location.href="/pos/brand/payment-settings"},style:{padding:"8px 16px",background:"#DC2626",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"13px",fontWeight:"600"},children:"Go to Payment Settings"})]})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,j.jsx)(ne,{children:"Payment Method *"}),(0,j.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${Math.min(bn.length,3)}, 1fr)`,gap:"10px",marginTop:"8px"},children:bn.map(e=>(0,j.jsxs)("button",{onClick:()=>{fn(n=>({...n,paymentMethod:e.id})),Bn(null)},style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 8px",border:"2px solid "+(jn.paymentMethod===e.id?"#635BFF":"#E5E7EB"),borderRadius:"8px",background:jn.paymentMethod===e.id?"#F5F3FF":"white",cursor:"pointer",transition:"all 0.2s"},children:[(0,j.jsx)("span",{style:{fontSize:"22px",marginBottom:"6px"},children:"stripe"===e.id?"\ud83d\udcb3":"paypal"===e.id?"\ud83c\udd7f\ufe0f":"qr_payment"===e.id?"\ud83d\udcf1":"\ud83c\udfe6"}),(0,j.jsx)("span",{style:{fontSize:"13px",fontWeight:"500",color:"#374151"},children:e.name})]},e.id))})]}),"stripe"===jn.paymentMethod&&Wn&&(0,j.jsx)(v.A,{invoiceId:Wn.id,onSuccess:()=>{vn(!1),Un(null),fn({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),We("Payment submitted successfully! The issuer will review and confirm your payment."),Re(!0),wt(),kt()},onError:()=>{}}),"bank_transfer"===jn.paymentMethod&&(()=>{const e=bn.find(e=>"bank_transfer"===e.id);return e?(0,j.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",fontSize:"14px",lineHeight:"1.8"},children:[(0,j.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"Bank Transfer Details"}),(0,j.jsxs)("p",{style:{margin:"0"},children:[(0,j.jsx)("strong",{children:"Bank:"})," ",e.bankName]}),(0,j.jsxs)("p",{style:{margin:"0"},children:[(0,j.jsx)("strong",{children:"Account Number:"})," ",e.accountNumber]}),(0,j.jsxs)("p",{style:{margin:"0"},children:[(0,j.jsx)("strong",{children:"Account Name:"})," ",e.accountName]})]}):null})(),"qr_payment"===jn.paymentMethod&&(()=>{const e=bn.find(e=>"qr_payment"===e.id);return e?(0,j.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",textAlign:"center"},children:[(0,j.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"QR Payment"}),e.qrImage&&(0,j.jsx)("img",{src:e.qrImage,alt:"Payment QR Code",style:{maxWidth:"200px",maxHeight:"200px",border:"1px solid #E5E7EB",borderRadius:"8px"}}),e.qrDescription&&(0,j.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:e.qrDescription})]}):null})(),jn.paymentMethod&&"stripe"!==jn.paymentMethod&&"paypal"!==jn.paymentMethod&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,j.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,j.jsxs)("span",{children:["Please provide either a ",(0,j.jsx)("strong",{children:"Transaction ID / Reference Number"})," or upload a ",(0,j.jsx)("strong",{children:"Payment Receipt Image"})," to submit your payment."]})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Transaction ID / Reference Number"}),(0,j.jsx)(te,{type:"text",placeholder:"Enter transaction ID or reference number",value:jn.transactionId,onChange:e=>fn(n=>({...n,transactionId:e.target.value}))})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Payment Receipt Image"}),(0,j.jsx)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",background:jn.receiptImage?"#F0FDF4":"#FAFBFC",cursor:"pointer",position:"relative"},children:jn.receiptImage?(0,j.jsxs)("div",{children:[(0,j.jsx)("img",{src:jn.receiptImage,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",marginBottom:"12px"}}),(0,j.jsx)("div",{children:(0,j.jsx)("button",{type:"button",onClick:()=>fn(e=>({...e,receiptImage:""})),style:{background:"#DC2626",color:"white",border:"none",padding:"8px 16px",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Remove Image"})})]}):(0,j.jsxs)("label",{style:{cursor:"pointer",display:"block"},children:[(0,j.jsx)("input",{type:"file",accept:"image/*",onChange:async e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];if(t)if(t.type.startsWith("image/"))if(t.size>10485760)Bn("File size must be less than 10MB");else try{Bn(null);const e=await function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:800,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:800,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.7;return new Promise((r,a)=>{const o=new Image,s=new FileReader;s.onload=e=>{var n;o.src=null===(n=e.target)||void 0===n?void 0:n.result},o.onload=()=>{const e=document.createElement("canvas");let s=o.width,l=o.height;if(s>n||l>t){const e=Math.min(n/s,t/l);s=Math.round(s*e),l=Math.round(l*e)}e.width=s,e.height=l;const d=e.getContext("2d");if(!d)return void a(new Error("Failed to get canvas context"));d.drawImage(o,0,0,s,l);const c=e.toDataURL("image/jpeg",i);r(c)},o.onerror=()=>a(new Error("Failed to load image")),s.onerror=()=>a(new Error("Failed to read file")),s.readAsDataURL(e)})}(t,1024,1024,.8);fn(n=>({...n,receiptImage:e}))}catch(i){console.error("Error processing image:",i),Bn("Failed to process image. Please try another file.")}else Bn("Please upload an image file (JPG, PNG, etc.)")},style:{display:"none"}}),(0,j.jsxs)("div",{style:{color:"#6B7280",fontSize:"14px"},children:[(0,j.jsx)("div",{style:{fontSize:"24px",marginBottom:"8px"},children:"+"}),(0,j.jsx)("div",{children:"Click to upload payment receipt"}),(0,j.jsx)("div",{style:{fontSize:"12px",marginTop:"4px"},children:"Supports JPG, PNG (max 5MB)"})]})]})})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Notes (Optional)"}),(0,j.jsx)(ie,{placeholder:"Any additional information about the payment...",value:jn.notes,onChange:e=>fn(n=>({...n,notes:e.target.value}))})]})]})]})]}),(0,j.jsxs)(Z,{style:{flexDirection:"column",alignItems:"stretch"},children:[(0,j.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end"},children:[(0,j.jsx)(k,{variant:"secondary",onClick:()=>{vn(!1),Bn(null)},children:"Cancel"}),"stripe"!==jn.paymentMethod&&"paypal"!==jn.paymentMethod&&(0,j.jsx)(k,{variant:"primary",onClick:async()=>{if(Wn){Bn(null),An(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Wn.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:jn.paymentMethod,transaction_id:jn.transactionId,notes:jn.notes,receipt_url:jn.receiptImage||null})});if(n.ok)vn(!1),Un(null),fn({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),Bn(null),We("Payment submitted successfully! The issuer will review and confirm your payment."),Re(!0),await wt(),await kt();else{const e=await n.json();Bn(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),Bn("Network error. Please check your connection and try again.")}finally{An(!1)}}},disabled:!jn.paymentMethod||kn||Sn||!jn.transactionId&&!jn.receiptImage,children:Sn?"Submitting...":"Submit Payment"})]}),Fn&&(0,j.jsx)(c.Mo,{type:"error",style:{marginTop:"12px",wordBreak:"break-word"},children:Fn})]})]})}),Dn&&(0,j.jsx)(V,{onClick:St,children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,j.jsxs)(J,{children:[(0,j.jsx)(G,{children:Nn?"Edit Category":"Add Category"}),(0,j.jsx)(Q,{onClick:St,children:"\xd7"})]}),(0,j.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Tn.name.trim()&&Tn.code.trim())try{Pn(!0);const e=localStorage.getItem("auth_token"),n=Nn?`/api/invoices/categories/${Nn.id}`:"/api/invoices/categories",t=Nn?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:Tn.name.trim(),code:Tn.code.trim().toLowerCase().replace(/\s+/g,"_"),description:Tn.description.trim()||null})}),r=await i.json();r.success?(St(),Ft()):alert(r.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{Pn(!1)}},children:[(0,j.jsxs)(K,{children:[(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Name *"}),(0,j.jsx)(te,{value:Tn.name,onChange:e=>zn({...Tn,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Code *"}),(0,j.jsx)(te,{value:Tn.code,onChange:e=>zn({...Tn,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Nn||void 0===Nn?void 0:Nn.is_system}),(0,j.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Description"}),(0,j.jsx)(ie,{value:Tn.description,onChange:e=>zn({...Tn,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,j.jsxs)(Z,{children:[(0,j.jsx)(k,{variant:"secondary",type:"button",onClick:St,children:"Cancel"}),(0,j.jsx)(k,{variant:"primary",type:"submit",disabled:Mn||!Tn.name||!Tn.code,children:Mn?"Saving...":Nn?"Update":"Create"})]})]})]})}),(0,j.jsx)(p.A,{isOpen:_n,onCancel:()=>$n(!1),onConfirm:async()=>{if(Rn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${Rn.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?($n(!1),Ln(null),Ft()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===Rn||void 0===Rn?void 0:Rn.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),me&&(0,j.jsx)(V,{onClick:e=>{e.target===e.currentTarget&&(ye(!1),Lt())},children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(J,{children:[(0,j.jsx)(G,{children:"Create Invoice"}),(0,j.jsx)(Q,{onClick:()=>{ye(!1),Lt()},children:"\xd7"})]}),(0,j.jsxs)(K,{children:[(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Search Restaurant *"}),(0,j.jsxs)("div",{style:{position:"relative"},children:[(0,j.jsx)(te,{type:"text",value:st,onChange:e=>(e=>{if(lt(e),ct(!0),e.length<2)return void ot({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available restaurants:",it);const n=it.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered restaurants:",n),ot({managers:[],restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>ct(!0),onBlur:()=>setTimeout(()=>ct(!1),200),placeholder:"Type to search for restaurants",required:!0}),dt&&(at.managers.length>0||at.restaurants.length>0)&&(0,j.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[at.managers.length>0&&(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),at.managers.map(e=>(0,j.jsxs)("div",{onClick:()=>zt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),at.restaurants.length>0&&(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),at.restaurants.map(e=>{const n=nt.find(n=>n.id===e.admin_id);return(0,j.jsxs)("div",{onClick:()=>zt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,j.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),pt&&(0,j.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===pt.type?pt.data.fullName:pt.data.name}),(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===pt.type?`${pt.data.companyName} \u2022 Manager`:`${pt.data.address||"No address"} \u2022 Restaurant`})]}),(0,j.jsx)("button",{onClick:()=>{xt(null),lt("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,j.jsxs)(X,{children:[(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Amount (RM) *"}),(0,j.jsx)(te,{type:"number",step:"0.01",min:"0",value:jt.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(jt.discountValue)||0,i="percentage"===jt.discountType?n*(t/100):"fixed"===jt.discountType?t:0,r=Math.max(0,n-i),a=r*(Dt.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+n.rate,0)/100),o=r+a;ft({...jt,amount:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0.00",required:!0})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Due Date *"}),(0,j.jsx)(te,{type:"date",value:jt.dueDate,onChange:e=>ft({...jt,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,j.jsxs)(X,{children:[(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Discount"}),(0,j.jsxs)(re,{value:jt.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(jt.amount)||0,i="none"===n?0:parseFloat(jt.discountValue)||0,r="percentage"===n?t*(i/100):"fixed"===n?i:0,a=Math.max(0,t-r),o=a*(Dt.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+n.rate,0)/100),s=a+o;ft({...jt,discountType:n,discountValue:"none"===n?"":jt.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,j.jsx)("option",{value:"none",children:"No Discount"}),(0,j.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,j.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==jt.discountType&&(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"percentage"===jt.discountType?"Discount (%)":"Discount Amount"}),(0,j.jsx)(te,{type:"number",step:"0.01",min:"0",max:"percentage"===jt.discountType?"100":void 0,value:jt.discountValue,onChange:e=>{const n=parseFloat(jt.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===jt.discountType?n*(t/100):t,r=Math.max(0,n-i),a=r*(Dt.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+n.rate,0)/100),o=r+a;ft({...jt,discountValue:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==jt.discountType&&(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Discount Reason"}),(0,j.jsx)(te,{type:"text",value:jt.discountReason,onChange:e=>ft({...jt,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Invoice Category"}),(0,j.jsx)(re,{value:jt.invoiceCategory||"service",onChange:e=>ft({...jt,invoiceCategory:e.target.value}),children:gt.length>0?gt.filter(e=>"subscription"!==e.code).map(e=>(0,j.jsx)("option",{value:e.code,children:e.name},e.id)):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("option",{value:"service",children:"Service"}),(0,j.jsx)("option",{value:"consulting",children:"Consulting"}),(0,j.jsx)("option",{value:"others",children:"Others"})]})})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Item/Description"}),(0,j.jsx)(ie,{value:"others"===jt.invoiceCategory?jt.customDescription||"":jt.serviceDescription||"",onChange:e=>{"others"===jt.invoiceCategory?ft({...jt,customDescription:e.target.value}):ft({...jt,serviceDescription:e.target.value})},placeholder:`Enter ${jt.invoiceCategory||"service"} description...`,rows:3})]}),(0,j.jsxs)(ae,{children:[(0,j.jsxs)(oe,{children:[(0,j.jsx)("span",{children:"Subtotal:"}),(0,j.jsx)("span",{children:(0,s.vv)(parseFloat(jt.amount||"0"),jt.currency||e.currency)})]}),"none"!==jt.discountType&&parseFloat(jt.discountValue||"0")>0&&(()=>{const n=parseFloat(jt.amount||"0"),t=parseFloat(jt.discountValue||"0"),i="percentage"===jt.discountType?n*(t/100):t;return(0,j.jsxs)(oe,{children:[(0,j.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===jt.discountType?` (${t}%)`:"",":"]}),(0,j.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,s.vv)(i,jt.currency||e.currency)]})]})})(),Dt.filter(e=>e.enabled&&e.rate>0).map((n,t)=>{const i=parseFloat(jt.amount||"0"),r=parseFloat(jt.discountValue||"0"),a="percentage"===jt.discountType?i*(r/100):"fixed"===jt.discountType?r:0,o=Math.max(0,i-a)*(n.rate/100);return(0,j.jsxs)(oe,{children:[(0,j.jsxs)("span",{children:[n.name," (",n.rate,"%):"]}),(0,j.jsx)("span",{children:(0,s.vv)(o,jt.currency||e.currency)})]},t)}),0===Dt.filter(e=>e.enabled&&e.rate>0).length&&(0,j.jsxs)(oe,{children:[(0,j.jsx)("span",{children:"Additional Charges:"}),(0,j.jsx)("span",{children:(0,s.vv)(0,jt.currency||e.currency)})]}),(0,j.jsxs)(oe,{highlight:!0,children:[(0,j.jsx)("span",{children:"Total:"}),(0,j.jsx)("span",{children:(0,j.jsx)("strong",{children:(0,s.vv)(parseFloat(jt.total||"0"),jt.currency||e.currency)})})]})]})]}),(0,j.jsxs)(Z,{children:[(0,j.jsx)(k,{variant:"secondary",onClick:()=>{ye(!1),Lt()},children:"Cancel"}),(0,j.jsx)(k,{variant:"primary",onClick:async()=>{if(pt&&jt.amount&&jt.dueDate)try{const e=parseFloat(jt.amount),t=parseFloat(jt.discountValue)||0,i="percentage"===jt.discountType?e*(t/100):"fixed"===jt.discountType?t:0,r=Math.max(0,e-i),a=Dt.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(r*e.rate/100*100)/100})),o=a.reduce((e,n)=>e+n.amount,0),s=r+o;let l="";l="others"===jt.invoiceCategory?jt.customDescription||"":jt.serviceDescription||"";let d="",c="",p="",x="";if("restaurant"===pt.type){const e=pt.data;d=e.name,x=e.name,p=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),c=n.join("\n")}else if("manager"===pt.type){const e=pt.data;d=e.fullName,p=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),c=n.join("\n")}let u="restaurant",h=null;if("restaurant"===pt.type){const e=pt.data;u="restaurant",h=parseInt(e.id)}const g={restaurant_id:"restaurant"===pt.type?pt.data.id:null,customer_name:d,customer_address:c,company_name:p,restaurant_name:x,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(jt.dueDate).toISOString(),total_amount:s,subtotal_before_discount:i>0?e:null,discount_type:"none"!==jt.discountType?jt.discountType:null,discount_value:i>0?t:null,discount_amount:i>0?i:null,discount_reason:jt.discountReason||null,currency:jt.currency||"MYR",status:"draft",notes:l,issued_by:(null===n||void 0===n?void 0:n.id)||1,issued_at:(new Date).toISOString(),issuer_type:"brand",issuer_id:(null===n||void 0===n?void 0:n.brand_id)||null,payer_type:u,payer_id:h,invoice_category:jt.invoiceCategory||"service",custom_description:"others"===jt.invoiceCategory?jt.customDescription:null,service_description:"others"!==jt.invoiceCategory?jt.serviceDescription:null,additional_charges:a},m=[{item_type:jt.invoiceCategory,description:l,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],y=localStorage.getItem("auth_token"),v=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({invoice_data:g,items:m})});if(v.ok)await bt(),ye(!1),Lt();else{const e=await v.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!pt||!jt.amount||!jt.dueDate,children:"Create Invoice"})]})]})}),ve&&Wn&&((e,n,t,i,r,a,o,l,d,c,p,x,u,h)=>{const g=("to_pay"===Ue||"paid"===Ue)&&Wn.issuerInfo,m=g?{companyName:null===(e=Wn.issuerInfo)||void 0===e?void 0:e.name,companyLogo:null===(n=Wn.issuerInfo)||void 0===n?void 0:n.logoUrl,address:null===(t=Wn.issuerInfo)||void 0===t?void 0:t.address,city:null===(i=Wn.issuerInfo)||void 0===i?void 0:i.city,state:null===(r=Wn.issuerInfo)||void 0===r?void 0:r.state,postalCode:null===(a=Wn.issuerInfo)||void 0===a?void 0:a.postalCode,country:null===(o=Wn.issuerInfo)||void 0===o?void 0:o.country,phone:null===(l=Wn.issuerInfo)||void 0===l?void 0:l.phone,email:null===(d=Wn.issuerInfo)||void 0===d?void 0:d.email,bankName:null===(c=Wn.issuerInfo)||void 0===c?void 0:c.bankName,bankAccount:null===(p=Wn.issuerInfo)||void 0===p?void 0:p.bankAccount,bankAccountName:null===(x=Wn.issuerInfo)||void 0===x?void 0:x.bankAccountName,taxNumber:null===(u=Wn.issuerInfo)||void 0===u?void 0:u.taxId,registrationNumber:null===(h=Wn.issuerInfo)||void 0===h?void 0:h.businessRegistration}:ut;return(0,j.jsx)(V,{onClick:()=>je(!1),children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,j.jsxs)(J,{children:[(0,j.jsx)(G,{children:"Invoice Details"}),(0,j.jsx)(Q,{onClick:()=>je(!1),children:"\xd7"})]}),(0,j.jsxs)(K,{children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,j.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===m||void 0===m?void 0:m.companyLogo)&&(0,j.jsx)("img",{src:m.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,j.jsx)("div",{style:{fontSize:null!==m&&void 0!==m&&m.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===m||void 0===m?void 0:m.companyName)||"Company Name"}),(0,j.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===m||void 0===m?void 0:m.address)&&(0,j.jsx)("div",{children:m.address}),((null===m||void 0===m?void 0:m.city)||(null===m||void 0===m?void 0:m.state)||(null===m||void 0===m?void 0:m.postalCode))&&(0,j.jsx)("div",{children:[null===m||void 0===m?void 0:m.city,null===m||void 0===m?void 0:m.state,null===m||void 0===m?void 0:m.postalCode].filter(Boolean).join(", ")}),(null===m||void 0===m?void 0:m.country)&&(0,j.jsx)("div",{children:m.country}),(null===m||void 0===m?void 0:m.phone)&&(0,j.jsxs)("div",{children:["Tel: ",m.phone]}),(null===m||void 0===m?void 0:m.email)&&(0,j.jsxs)("div",{children:["Email: ",m.email]})]})]}),(0,j.jsxs)("div",{style:{textAlign:"right"},children:[(0,j.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,j.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Wn.invoiceNumber}),(0,j.jsx)(A,{status:Wn.status,style:{marginTop:"8px"},children:Yt(Wn.status)}),Wn.isModified&&(0,j.jsx)("span",{style:{display:"inline-block",marginTop:"4px",padding:"2px 8px",fontSize:"11px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px"},children:"Modified"})]})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,j.jsxs)("div",{style:{flex:1},children:[(0,j.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),g?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:(null===ut||void 0===ut?void 0:ut.companyName)||"Your Company"}),(null===ut||void 0===ut?void 0:ut.address)&&(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:ut.address}),((null===ut||void 0===ut?void 0:ut.city)||(null===ut||void 0===ut?void 0:ut.state)||(null===ut||void 0===ut?void 0:ut.postalCode))&&(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:[null===ut||void 0===ut?void 0:ut.city,null===ut||void 0===ut?void 0:ut.state,null===ut||void 0===ut?void 0:ut.postalCode].filter(Boolean).join(", ")}),(null===ut||void 0===ut?void 0:ut.country)&&(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:ut.country}),(null===ut||void 0===ut?void 0:ut.email)&&(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:ut.email})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:Wn.customerName}),Wn.customerAddress&&(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:Wn.customerAddress}),"restaurant"===Wn.payerType&&Wn.restaurantName&&"Unknown"!==Wn.restaurantName&&(0,j.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",Wn.restaurantName]})]})]}),(0,j.jsxs)("div",{style:{textAlign:"right"},children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,j.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Wn.billingPeriod||"-"})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,j.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Wt(Wn.issueDate)})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,j.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Wt(Wn.dueDate)})]}),Wn.paidDate&&(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,j.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Wt(Wn.paidDate)})]})]})]}),(0,j.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,j.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,j.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,j.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,j.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,j.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,j.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,j.jsx)("tbody",{children:Wn.items.map((e,n)=>(0,j.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,j.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,j.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,j.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.unitPrice,Wn.currency||"MYR")}),(0,j.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.total,Wn.currency||"MYR")})]},n))})]})]}),(0,j.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,j.jsx)("div",{style:{width:"280px"},children:(0,j.jsxs)(ae,{children:[(0,j.jsxs)(oe,{children:[(0,j.jsx)("span",{children:"Subtotal:"}),(0,j.jsx)("span",{children:(0,s.vv)(Wn.subtotalBeforeDiscount||Wn.amount,Wn.currency||"MYR")})]}),Wn.discountType&&"none"!==Wn.discountType&&Wn.discountAmount>0&&(0,j.jsxs)(oe,{children:[(0,j.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Wn.discountType?` (${Wn.discountValue}%)`:"",":"]}),(0,j.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,s.vv)(Wn.discountAmount,Wn.currency||"MYR")]})]}),(0,j.jsxs)(oe,{children:[(0,j.jsx)("span",{children:"Tax (6%):"}),(0,j.jsx)("span",{children:(0,s.vv)(Wn.tax,Wn.currency||"MYR")})]}),(0,j.jsxs)(oe,{highlight:!0,children:[(0,j.jsx)("span",{children:"Total:"}),(0,j.jsx)("span",{children:(0,j.jsx)("strong",{children:(0,s.vv)(Wn.total,Wn.currency||"MYR")})})]})]})})}),(null===m||void 0===m?void 0:m.bankName)&&(0,j.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,j.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,j.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("strong",{children:"Bank:"})," ",m.bankName]}),(0,j.jsxs)("div",{children:[(0,j.jsx)("strong",{children:"Account Name:"})," ",m.bankAccountName]}),(0,j.jsxs)("div",{children:[(0,j.jsx)("strong",{children:"Account Number:"})," ",m.bankAccount]})]})]}),((null===m||void 0===m?void 0:m.taxNumber)||(null===m||void 0===m?void 0:m.registrationNumber))&&(0,j.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===m||void 0===m?void 0:m.registrationNumber)&&(0,j.jsxs)("span",{children:["Reg No: ",m.registrationNumber]}),(null===m||void 0===m?void 0:m.registrationNumber)&&(null===m||void 0===m?void 0:m.taxNumber)&&(0,j.jsx)("span",{children:" | "}),(null===m||void 0===m?void 0:m.taxNumber)&&(0,j.jsxs)("span",{children:["Tax No: ",m.taxNumber]})]}),Wn.isModified&&Wn.modificationHistory&&Wn.modificationHistory.length>0&&(0,j.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,j.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#92400E",marginBottom:"12px"},children:"Modification History"}),Wn.modificationHistory.map((e,n)=>(0,j.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:n<Wn.modificationHistory.length-1?"10px":"0",paddingBottom:n<Wn.modificationHistory.length-1?"10px":"0",borderBottom:n<Wn.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,j.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,j.jsxs)("div",{style:{marginTop:"3px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,j.jsx)("div",{style:{marginTop:"3px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[n,t]=e;return(0,j.jsxs)("div",{children:[n,": ",String(t.from)," \u2192 ",String(t.to)]},n)})})]},n))]})]})]})})})(),we&&Wn&&(0,j.jsx)(V,{onClick:()=>ke(!1),children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(J,{children:[(0,j.jsxs)(G,{children:["Confirm Payment - ",Wn.invoiceNumber]}),(0,j.jsx)(Q,{onClick:()=>ke(!1),children:"\xd7"})]}),(0,j.jsxs)(K,{children:[(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Payment Confirmation"}),(0,j.jsxs)(ae,{children:[(0,j.jsxs)(oe,{children:[(0,j.jsx)("span",{children:"Manager:"}),(0,j.jsx)("span",{children:Wn.managerName})]}),(0,j.jsxs)(oe,{children:[(0,j.jsx)("span",{children:"Company:"}),(0,j.jsx)("span",{children:Wn.companyName})]}),(0,j.jsxs)(oe,{children:[(0,j.jsx)("span",{children:"Invoice Number:"}),(0,j.jsx)("span",{children:Wn.invoiceNumber})]}),(0,j.jsxs)(oe,{children:[(0,j.jsx)("span",{children:"Due Date:"}),(0,j.jsx)("span",{children:Wt(Wn.dueDate)})]}),(0,j.jsxs)(oe,{highlight:!0,children:[(0,j.jsx)("span",{children:(0,j.jsx)("strong",{children:"Payment Amount:"})}),(0,j.jsx)("span",{children:(0,j.jsx)("strong",{children:(0,s.vv)(Wn.total,Wn.currency||"USD")})})]})]})]}),(Wn.paymentMethod||Wn.receiptUrl||Wn.transactionId)&&(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Customer's Payment Information"}),(0,j.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,j.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[Wn.paymentMethod&&(0,j.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,j.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===Wn.paymentMethod?"Bank Transfer":"qr_payment"===Wn.paymentMethod?"QR Payment":"stripe"===Wn.paymentMethod?"Stripe":"paypal"===Wn.paymentMethod?"PayPal":Wn.paymentMethod]}),Wn.transactionId&&(0,j.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,j.jsx)("strong",{children:"Transaction ID:"})," ",Wn.transactionId]})]}),Wn.receiptUrl&&(0,j.jsxs)("div",{style:{marginTop:"12px"},children:[(0,j.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,j.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,j.jsx)("img",{src:Wn.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(Wn.receiptUrl,"_blank")}),(0,j.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,j.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,j.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,j.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,j.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Status Change"}),(0,j.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,j.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,j.jsxs)(Z,{children:[(0,j.jsx)(k,{variant:"secondary",onClick:()=>ke(!1),children:"Cancel"}),(0,j.jsx)(k,{variant:"primary",onClick:async()=>{if(Wn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Wn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await bt(),ke(!1),Un(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),fe&&Wn&&Hn&&(0,j.jsx)(V,{onClick:()=>be(!1),children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(J,{children:[(0,j.jsxs)(G,{children:["Edit Invoice - ",Wn.invoiceNumber]}),(0,j.jsx)(Q,{onClick:()=>be(!1),children:"\xd7"})]}),(0,j.jsxs)(K,{children:[(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Search Restaurant *"}),(0,j.jsxs)("div",{style:{position:"relative"},children:[(0,j.jsx)(te,{type:"text",value:qn,onChange:e=>(e=>{if(Jn(e),Zn(!0),e.length<2)return void Qn({managers:[],restaurants:[]});const n=it.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));Qn({managers:[],restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>Zn(!0),onBlur:()=>setTimeout(()=>Zn(!1),200),placeholder:"Type to search for restaurants",required:!0}),Kn&&(Gn.managers.length>0||Gn.restaurants.length>0)&&(0,j.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[Gn.managers.length>0&&(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),Gn.managers.map(e=>(0,j.jsxs)("div",{onClick:()=>Tt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),Gn.restaurants.length>0&&(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),Gn.restaurants.map(e=>{const n=nt.find(n=>n.id===e.admin_id);return(0,j.jsxs)("div",{onClick:()=>Tt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,j.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),Xn&&(0,j.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Xn.type?Xn.data.fullName:Xn.data.name}),(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Xn.type?`${Xn.data.companyName} \u2022 Manager`:`${Xn.data.address||"No address"} \u2022 Restaurant`})]}),(0,j.jsx)("button",{onClick:()=>{et(null),Jn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,j.jsxs)(X,{children:[(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Amount (RM)"}),(0,j.jsx)(te,{type:"number",value:Hn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=n*(At(Hn.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+n.rate,0)/100),i=n+t;Yn({...Hn,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Due Date"}),(0,j.jsx)(te,{type:"date",value:Hn.dueDate,onChange:e=>Yn({...Hn,dueDate:e.target.value})})]})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Status"}),(0,j.jsxs)(re,{value:Hn.status,onChange:e=>Yn({...Hn,status:e.target.value}),children:[(0,j.jsx)("option",{value:"draft",children:"Draft"}),(0,j.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,j.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,j.jsx)("option",{value:"paid",children:"Paid"}),(0,j.jsx)("option",{value:"overdue",children:"Overdue"}),(0,j.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Invoice Category"}),(0,j.jsx)(re,{value:Hn.invoiceCategory||"service",onChange:e=>Yn({...Hn,invoiceCategory:e.target.value}),children:gt.length>0?gt.filter(e=>"subscription"!==e.code).map(e=>(0,j.jsx)("option",{value:e.code,children:e.name},e.id)):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("option",{value:"service",children:"Service"}),(0,j.jsx)("option",{value:"consulting",children:"Consulting"}),(0,j.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===Hn.invoiceCategory&&(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Plan/Item"}),(0,j.jsx)(ie,{value:Hn.customDescription||"",onChange:e=>Yn({...Hn,customDescription:e.target.value}),rows:3})]}),("service"===(Hn.invoiceCategory||"service")||"consulting"===Hn.invoiceCategory)&&(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Plan/Item"}),(0,j.jsx)(ie,{value:Hn.serviceDescription||"",onChange:e=>Yn({...Hn,serviceDescription:e.target.value}),rows:3})]}),(0,j.jsxs)(ae,{children:[(0,j.jsxs)(oe,{children:[(0,j.jsx)("span",{children:"Subtotal:"}),(0,j.jsx)("span",{children:(0,s.vv)(parseFloat(Hn.amount||"0"),Hn.currency||"MYR")})]}),At(Hn.currency||"").filter(e=>e.enabled&&e.rate>0).map((e,n)=>{const t=parseFloat(Hn.amount||"0")*(e.rate/100);return(0,j.jsxs)(oe,{children:[(0,j.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,j.jsx)("span",{children:(0,s.vv)(t,Hn.currency||"MYR")})]},n)}),(0,j.jsxs)(oe,{highlight:!0,children:[(0,j.jsx)("span",{children:"Total:"}),(0,j.jsx)("span",{children:(0,j.jsx)("strong",{children:(0,s.vv)(parseFloat(Hn.total||"0"),Hn.currency||"MYR")})})]})]}),(0,j.jsxs)(ee,{style:{marginTop:"16px"},children:[(0,j.jsxs)(ne,{children:["Modification Reason ","automatic"===(null===Wn||void 0===Wn?void 0:Wn.type)&&(0,j.jsx)("span",{style:{color:"#EF4444"},children:"*"})]}),(0,j.jsx)(ie,{value:On,onChange:e=>Vn(e.target.value),placeholder:"Enter reason for modification...",rows:2})]}),(null===Wn||void 0===Wn?void 0:Wn.modificationHistory)&&Wn.modificationHistory.length>0&&(0,j.jsxs)("div",{style:{marginTop:"16px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,j.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#92400E",marginBottom:"8px"},children:"Modification History"}),Wn.modificationHistory.map((e,n)=>(0,j.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:n<Wn.modificationHistory.length-1?"8px":"0",paddingBottom:n<Wn.modificationHistory.length-1?"8px":"0",borderBottom:n<Wn.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,j.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,j.jsxs)("div",{style:{marginTop:"2px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,j.jsx)("div",{style:{marginTop:"2px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[n,t]=e;return(0,j.jsxs)("span",{style:{marginRight:"8px"},children:[n,": ",String(t.from)," \u2192 ",String(t.to)]},n)})})]},n))]})]}),(0,j.jsxs)(Z,{children:[(0,j.jsx)(k,{variant:"secondary",onClick:()=>be(!1),children:"Cancel"}),(0,j.jsx)(k,{variant:"primary",onClick:async()=>{if(Wn&&Hn){if("automatic"===Wn.type&&!On.trim())return We("Please enter a reason for modifying this invoice."),void Re(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Wn.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(Hn.amount),tax:parseFloat(Hn.tax),total:parseFloat(Hn.total),dueDate:Hn.dueDate,status:Hn.status,payerType:Hn.payerType,payerId:Hn.payerId,items:Hn.items,modificationReason:On.trim()||void 0})});if(n.ok)await bt(),be(!1),Un(null),Yn(null),We("Invoice updated successfully!"),Re(!0);else{const e=await n.json();We(`Failed to update invoice: ${e.error||"Unknown error"}`),Re(!0)}}catch(e){console.error("Error updating invoice:",e),We("Error updating invoice. Please try again."),Re(!0)}}},children:"Save Changes"})]})]})}),Ce&&Wn&&(0,j.jsx)(V,{onClick:()=>Fe(!1),children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(J,{children:[(0,j.jsx)(G,{children:"Send Invoice"}),(0,j.jsx)(Q,{onClick:()=>Fe(!1),children:"\xd7"})]}),(0,j.jsx)(K,{children:(0,j.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,j.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,j.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,j.jsx)("strong",{children:Wn.invoiceNumber})," to ",(0,j.jsx)("strong",{children:Wn.restaurantName||Wn.customerName}),"?"]}),(0,j.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,j.jsx)("span",{style:{fontWeight:"500"},children:Wn.invoiceNumber})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,j.jsx)("span",{style:{fontWeight:"500"},children:Wn.managerName||Wn.restaurantName||Wn.customerName})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,j.jsx)("span",{style:{fontWeight:"500"},children:Wn.customerName||Wn.restaurantName})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,j.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,s.vv)(Wn.total,Wn.currency||"USD")})]})]})]})}),(0,j.jsxs)(Z,{children:[(0,j.jsx)(k,{variant:"secondary",onClick:()=>Fe(!1),children:"Cancel"}),(0,j.jsx)(k,{variant:"success",onClick:async()=>{if(Wn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Wn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await bt(),Fe(!1),Un(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Confirm"})]})]})}),Be&&Wn&&(0,j.jsx)(V,{onClick:()=>Se(!1),children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(J,{children:[(0,j.jsx)(G,{children:"Resend Invoice"}),(0,j.jsx)(Q,{onClick:()=>Se(!1),children:"\xd7"})]}),(0,j.jsx)(K,{children:(0,j.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,j.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,j.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,j.jsx)("strong",{children:Wn.invoiceNumber})," to ",(0,j.jsx)("strong",{children:Wn.restaurantName||Wn.customerName}),"?"]}),(0,j.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"This will send another copy of the invoice to the restaurant's email."})]})}),(0,j.jsxs)(Z,{children:[(0,j.jsx)(k,{variant:"secondary",onClick:()=>Se(!1),children:"Cancel"}),(0,j.jsx)(k,{variant:"primary",onClick:()=>{Wn&&(Se(!1),Un(null))},children:"Resend Invoice"})]})]})}),Ae&&Wn&&(0,j.jsx)(V,{onClick:()=>De(!1),children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(J,{children:[(0,j.jsx)(G,{children:"Cancel Invoice"}),(0,j.jsx)(Q,{onClick:()=>De(!1),children:"\xd7"})]}),(0,j.jsx)(K,{children:(0,j.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,j.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,j.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,j.jsx)("strong",{children:Wn.invoiceNumber}),"?"]}),(0,j.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,j.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,j.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,j.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,j.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,j.jsx)("span",{style:{fontWeight:"500"},children:Wn.invoiceNumber})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,j.jsx)("span",{style:{fontWeight:"500"},children:Wn.managerName})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,j.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,s.vv)(Wn.total,Wn.currency||"USD")})]})]})]})}),(0,j.jsxs)(Z,{children:[(0,j.jsx)(k,{variant:"secondary",onClick:()=>De(!1),children:"Keep Invoice"}),(0,j.jsx)(k,{variant:"primary",onClick:async()=>{if(Wn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Wn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await bt(),De(!1),Un(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),Ie&&Wn&&(0,j.jsx)(V,{onClick:()=>Ne(!1),children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(J,{children:[(0,j.jsx)(G,{children:"Delete Invoice"}),(0,j.jsx)(Q,{onClick:()=>Ne(!1),children:"\xd7"})]}),(0,j.jsx)(K,{children:(0,j.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,j.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,j.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,j.jsxs)("strong",{children:["#",Wn.invoiceNumber]}),"?",(0,j.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,j.jsxs)(Z,{children:[(0,j.jsx)(k,{variant:"secondary",onClick:()=>Ne(!1),children:"Keep Invoice"}),(0,j.jsx)(k,{variant:"primary",onClick:async()=>{if(Wn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Wn.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await bt(),Ne(!1),Un(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),Ee&&Pe&&(0,j.jsx)(V,{onClick:()=>Te(!1),children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(J,{children:[(0,j.jsx)(G,{children:"Send Invoice via Email"}),(0,j.jsx)(Q,{onClick:()=>Te(!1),children:"\xd7"})]}),(0,j.jsxs)(K,{children:[(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Invoice"}),(0,j.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,j.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Pe.invoiceNumber}),(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:Pe.customerName}),(0,j.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,s.vv)(Pe.total,Pe.currency||"MYR")})]})]}),(0,j.jsxs)(ee,{children:[(0,j.jsx)(ne,{children:"Recipient Email *"}),(0,j.jsx)(te,{type:"email",value:ze,onChange:e=>Me(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,j.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:ze?(0,j.jsxs)(j.Fragment,{children:["Default email for ","restaurant"===Pe.payerType?"Restaurant":"foodcourt_manager"===Pe.payerType?"Foodcourt Manager":"brand_manager"===Pe.payerType?"Brand Manager":"Customer"]}):(0,j.jsxs)(j.Fragment,{children:["Enter the ","restaurant"===Pe.payerType?"restaurant":"foodcourt_manager"===Pe.payerType?"foodcourt manager":"brand_manager"===Pe.payerType?"brand manager":"customer"," email address"]})})]}),(0,j.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,j.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,j.jsxs)(Z,{children:[(0,j.jsx)(k,{variant:"secondary",onClick:()=>{Te(!1),_e(null),Me("")},children:"Cancel"}),(0,j.jsx)(k,{variant:"primary",onClick:async()=>{if(!Pe||!ze)return We("Please enter a valid email address."),void Re(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Pe.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:ze})});if(n.ok)We(`Invoice sent successfully to ${ze}`),Te(!1),_e(null),Me("");else{const e=await n.json();We(e.error||"Failed to send invoice email.")}Re(!0)}catch(e){console.error("Error sending invoice email:",e),We("Failed to send invoice email. Please try again."),Re(!0)}},disabled:!ze||!ze.includes("@"),children:"Send Email"})]})]})}),$e&&(0,j.jsx)(V,{onClick:()=>Re(!1),children:(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(J,{children:[(0,j.jsx)(G,{children:"Success"}),(0,j.jsx)(Q,{onClick:()=>Re(!1),children:"\xd7"})]}),(0,j.jsx)(K,{children:(0,j.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,j.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Le})})}),(0,j.jsx)(Z,{children:(0,j.jsx)(k,{variant:"primary",onClick:()=>Re(!1),children:"OK"})})]})})]})]})})}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var i=t(4752),r=t(9610),a=t(4414);const o=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,x=e=>{let{isOpen:n,title:t,message:i,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return n?(0,a.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(l,{children:t}),(0,a.jsx)(d,{children:i})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:h})]})]})}):null}}}]);