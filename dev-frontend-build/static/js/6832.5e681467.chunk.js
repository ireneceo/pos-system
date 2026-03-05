"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6832],{2488:(e,n,t)=>{t.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>c});t(9950);var i=t(4752),r=t(4414);const o=i.Ay.div`
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
`,a=i.Ay.input`
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
`,c=e=>{let{children:n,className:t,style:i,...a}=e;return(0,r.jsx)(o,{className:t,style:i,...a,children:n})},p=e=>{let{placeholder:n="Search...",value:t,onChange:i,style:o,...d}=e;return(0,r.jsxs)(s,{style:o,children:[(0,r.jsx)(a,{placeholder:n,value:t,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:t?"36px":"16px"},...d}),t&&(0,r.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...t}=e;return(0,r.jsx)(d,{...t,children:n})}},2597:(e,n,t)=>{t.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var i=t(4752),r=t(4414);const o=i.Ay.div`
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
`,a=i.Ay.button`
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
`,l=e=>{let{children:n,className:t,style:i}=e;return(0,r.jsx)(o,{className:t,style:i,children:n})},d=e=>{let{active:n,onClick:t,children:i,className:o}=e;return(0,r.jsx)(a,{active:n,onClick:t,className:o,children:i})},c=e=>{let{count:n,variant:t="default",showZero:i=!1}=e;return 0!==n||i?(0,r.jsx)(s,{variant:t,children:n}):null}},4757:(e,n,t)=>{t.d(n,{A:()=>g});var i=t(9950),r=t(7202),o=t(1627),a=t(4752),s=t(9246),l=t(4414);const d=e=>{let{onSuccess:n,onError:t}=e;const r=(0,o.t2)(),a=(0,o.HH)(),[s,d]=(0,i.useState)(!1),[h,u]=(0,i.useState)("");return(0,l.jsxs)(c,{onSubmit:async e=>{if(e.preventDefault(),!r||!a)return;d(!0),u("");const{error:i}=await r.confirmPayment({elements:a,confirmParams:{return_url:`${window.location.origin}/pos/invoices`},redirect:"if_required"});i?(u(i.message||"Payment failed"),t(i.message||"Payment failed"),d(!1)):n()},children:[(0,l.jsx)(o.He,{}),(0,l.jsx)(p,{type:"submit",disabled:!r||s,children:s?"Processing...":"Pay Now"}),h&&(0,l.jsx)(x,{children:h})]})},c=a.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,p=a.Ay.button`
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
`,x=a.Ay.div`
  color: #DC2626;
  font-size: 14px;
  text-align: center;
`,h=a.Ay.div`
  padding: 24px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,u=a.Ay.div`
  padding: 16px;
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`,g=e=>{let{invoiceId:n,onSuccess:t,onError:a}=e;const[c,p]=(0,i.useState)(null),[x,g]=(0,i.useState)(""),[m,y]=(0,i.useState)(!0),[v,j]=(0,i.useState)("");return(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=await s.A.post(`/api/invoices/${n}/create-payment-intent`,{},{headers:{Authorization:`Bearer ${e}`}});if(t.data.success){const{clientSecret:e,publishableKey:n}=t.data;if(!n)throw new Error("Stripe publishable key not configured");p((0,r.c)(n)),g(e)}}catch(i){var e,t;const n=(null===(e=i.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.error)||i.message||"Failed to initialize payment";j(n),a(n)}finally{y(!1)}})()},[n]),m?(0,l.jsx)(h,{children:"Initializing payment..."}):v?(0,l.jsx)(u,{children:v}):x&&c?(0,l.jsx)(o.S8,{stripe:c,options:{clientSecret:x,appearance:{theme:"stripe",variables:{colorPrimary:"#635BFF",borderRadius:"8px"}}},children:(0,l.jsx)(d,{onSuccess:t,onError:a})}):(0,l.jsx)(u,{children:"Payment initialization failed. Please try again."})}},6832:(e,n,t)=>{t.r(n),t.d(n,{default:()=>de});var i=t(9950),r=t(4752),o=t(2853),a=t(4492),s=t(8654),l=t(6038),d=t(9018),c=t(1367),p=t(4728),x=t(7617),h=t(8409),u=t(2488),g=t(2597),m=t(5612),y=t(1052),v=t.n(y),j=t(4757),f=t(4414);const b=r.Ay.div`
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
`,w=r.Ay.div`
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
`,k=r.Ay.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`,C=(0,r.Ay)(p.SC)``,F=r.Ay.div``,S=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,A=r.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,D=(0,r.Ay)(p.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,E=r.Ay.button`
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
`,T=r.Ay.div`
  display: grid;
  gap: 12px;
`,z=r.Ay.div`
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
`,$=r.Ay.div`
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
`,_=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,P=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,R=r.Ay.div`
  display: flex;
  gap: 8px;
`,L=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,W=r.Ay.button`
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
`,U=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,H=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,Y=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`,O=r.Ay.button`
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
`,V=r.Ay.div`
  position: relative;
  display: inline-block;
`,q=r.Ay.button`
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
`,J=r.Ay.div`
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
`,G=r.Ay.div`
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
`,Q=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,K=r.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,Z=r.Ay.button`
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
`,X=r.Ay.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
`,ee=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,ne=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,te=r.Ay.div`
  margin-bottom: 20px;
`,ie=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,re=r.Ay.input`
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
`,oe=r.Ay.textarea`
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
`,ae=r.Ay.select`
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
`,se=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,le=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,de=()=>{const{operationSettings:e}=(0,d.Pj)(),{user:n}=(0,c.As)(),[t,r]=(0,a.ok)(),[y,de]=(0,i.useState)([]),[ce,pe]=(0,i.useState)(""),[xe,he]=(0,i.useState)("all"),[ue,ge]=(0,i.useState)(!1),[me,ye]=(0,i.useState)(!1),[ve,je]=(0,i.useState)(()=>{const e=new Date;return{start:"2000-01-01",end:(n=e,`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`)};var n}),[fe,be]=(0,i.useState)(!1),[we,ke]=(0,i.useState)(!1),[Ce,Fe]=(0,i.useState)(!1),[Se,Be]=(0,i.useState)(!1),[Ae,De]=(0,i.useState)(!1),[Ee,Ie]=(0,i.useState)(!1),[Ne,Te]=(0,i.useState)(!1),[ze,$e]=(0,i.useState)(!1),[Me,_e]=(0,i.useState)(!1),[Pe,Re]=(0,i.useState)(""),[Le,We]=(0,i.useState)(null),[Ue,He]=(0,i.useState)(!1),[Ye,Oe]=(0,i.useState)(""),Ve=t.get("tab")||"to_pay",qe=e=>{r({tab:e})},Je=e=>{he(e),ge(!1);const n=new Date;let t=new Date,i=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"week":t=new Date(n.getTime()-5184e5);break;case"month":t=new Date(n.getTime()-25056e5);break;case"year":t=new Date(n.getTime()-314496e5);break;case"all":t=new Date(2020,0,1)}je({start:r(t),end:r(i)})},[Ge,Qe]=(0,i.useState)([]),[Ke,Ze]=(0,i.useState)([]),[Xe,en]=(0,i.useState)(""),[nn,tn]=(0,i.useState)("all"),[rn,on]=(0,i.useState)(!1),[an,sn]=(0,i.useState)(!1),[ln,dn]=(0,i.useState)({start:"",end:""}),cn=e=>{tn(e),on(!1);const n=new Date;let t=new Date,i=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"week":t=new Date(n.getTime()-5184e5);break;case"month":t=new Date(n.getTime()-25056e5);break;case"year":t=new Date(n.getTime()-314496e5);break;case"all":t=new Date(2020,0,1)}dn({start:r(t),end:r(i)})},[pn,xn]=(0,i.useState)(""),[hn,un]=(0,i.useState)("all"),[gn,mn]=(0,i.useState)(!1),[yn,vn]=(0,i.useState)(!1),[jn,fn]=(0,i.useState)({start:"",end:""}),bn=e=>{un(e),mn(!1);const n=new Date;let t=new Date,i=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"week":t=new Date(n.getTime()-5184e5);break;case"month":t=new Date(n.getTime()-25056e5);break;case"year":t=new Date(n.getTime()-314496e5);break;case"all":t=new Date(2020,0,1)}fn({start:r(t),end:r(i)})},[wn,kn]=(0,i.useState)(!1),[Cn,Fn]=(0,i.useState)({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),[Sn,Bn]=(0,i.useState)([]),[An,Dn]=(0,i.useState)(!1),[En,In]=(0,i.useState)(null),[Nn,Tn]=(0,i.useState)(!1),[zn,$n]=(0,i.useState)(!1),[Mn,_n]=(0,i.useState)(null),[Pn,Rn]=(0,i.useState)({name:"",code:"",description:""}),[Ln,Wn]=(0,i.useState)(!1),[Un,Hn]=(0,i.useState)(!1),[Yn,On]=(0,i.useState)(null),[Vn,qn]=(0,i.useState)(null),[Jn,Gn]=(0,i.useState)(null),[Qn,Kn]=(0,i.useState)(""),[Zn,Xn]=(0,i.useState)(""),[et,nt]=(0,i.useState)({managers:[],restaurants:[]}),[tt,it]=(0,i.useState)(!1),[rt,ot]=(0,i.useState)(null),[at,st]=(0,i.useState)([]),[lt,dt]=(0,i.useState)([]),[ct,pt]=(0,i.useState)({managers:[],restaurants:[]}),[xt,ht]=(0,i.useState)(""),[ut,gt]=(0,i.useState)(!1),[mt,yt]=(0,i.useState)(null),[vt,jt]=(0,i.useState)(null),[ft,bt]=(0,i.useState)([]),[wt,kt]=(0,i.useState)({}),[Ct,Ft]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"MYR",discountType:"none",discountValue:"",discountReason:""}),St=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void de([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),de(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),de([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),de([])}},Bt=async()=>{console.log("[BrandInvoices] fetchInvoicesToPay called");try{const e=localStorage.getItem("auth_token");if(!e)return console.log("[BrandInvoices] No token found"),void Qe([]);console.log("[BrandInvoices] Calling /api/invoices/to-pay...");const n=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("[BrandInvoices] Response status:",n.status),n.ok){const e=await n.json();console.log("[BrandInvoices] Received invoices to pay:",e.length,e),Qe(e)}else{const e=await n.text();console.error("[BrandInvoices] Failed to fetch invoices to pay:",n.status,e),Qe([])}}catch(e){console.error("[BrandInvoices] Error fetching invoices to pay:",e),Qe([])}},At=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void Ze([]);const n=await fetch("/api/invoices/to-pay?status=paid",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();Ze(e)}else Ze([])}catch(e){console.error("Error fetching paid invoices:",e),Ze([])}},Dt=async e=>{qn(e),Fn({paymentMethod:"",transactionId:"",notes:"",receiptImage:""}),kn(!0),await(async(e,n,t)=>{Dn(!0);try{let i=`/api/admin/payment-settings/available/${e}`;"brand"===n&&t?i=`/api/brands/${t}/payment-settings/available/${e}`:"foodcourt"===n&&t&&(i=`/api/foodcourts/${t}/payment-settings/available/${e}`);const r=localStorage.getItem("auth_token"),o=await fetch(i,{headers:{Authorization:`Bearer ${r}`}});if(o.ok){const e=await o.json();Bn(e.methods||[]),e.methods&&e.methods.length>0&&Fn(n=>({...n,paymentMethod:e.methods[0].id}))}else Bn([])}catch(i){console.error("Error fetching payment methods:",i),Bn([])}finally{Dn(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId)},Et=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&bt(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),It=(0,i.useCallback)(async()=>{if(null!==n&&void 0!==n&&n.brand_id)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/brands/${n.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){var e;const n=await i.json(),t=n.data||n;if(null!==(e=t.payment_settings)&&void 0!==e&&e.additionalCharges){const e=t.payment_settings.additionalCharges;Array.isArray(e)?kt({}):kt(e)}}}catch(t){console.error("Error fetching brand payment settings:",t)}},[null===n||void 0===n?void 0:n.brand_id]),Nt=()=>{$n(!1),_n(null),Rn({name:"",code:"",description:""})};(0,i.useEffect)(()=>{St(),Bt(),At(),Mt(),_t(),Lt(),$t(),Et(),It()},[]);const Tt=e=>{const n=(0,l.Wh)(e);return wt[n]||wt[e]||[]},zt=Tt(Ct.currency),$t=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&setCurrencyConfig(n.currencies)}}catch(e){console.error("Error fetching currency config:",e)}},Mt=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t,i]=await Promise.all([fetch("/api/users?role=Manager",{headers:e}),fetch("/api/users?role=Foodcourt_Manager",{headers:e}),fetch("/api/users?role=Brand_Manager",{headers:e})]);let r=[];if(n.ok){const e=await n.json(),t=e.success?e.data:Array.isArray(e)?e:[];if(Array.isArray(t)){const e=t.map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Restaurant Manager"}));r=[...r,...e]}}if(t.ok){const e=await t.json(),n=e.success?e.data:Array.isArray(e)?e:[];if(Array.isArray(n)){const e=n.map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt Manager"}));r=[...r,...e]}}if(i.ok){const e=await i.json(),n=e.success?e.data:Array.isArray(e)?e:[];if(Array.isArray(n)){const e=n.map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand Manager"}));r=[...r,...e]}}st(r)}catch(e){console.error("Error fetching managers:",e),st([])}},_t=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||""}});dt(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),dt([])}catch(e){console.error("Error fetching restaurants:",e),dt([])}},Pt=(e,n)=>{if(ot({type:e,data:n}),Xn("manager"===e?n.fullName:n.name),it(!1),"manager"===e){const e=n;Gn({...Jn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=at.find(n=>n.id===e.admin_id);Gn({...Jn,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},Rt=(e,n)=>{if(yt({type:e,data:n}),gt(!1),ht("manager"===e?n.fullName:n.name),"manager"===e){const e=n;Ft({...Ct,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=at.find(n=>n.id===e.admin_id);let i=e.currency||"MYR";"RM"===i&&(i="MYR"),Ft({...Ct,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:t?t.fullName:"",companyName:e.name,currency:i})}},Lt=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands/company-info",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();return void jt({companyName:e.company_name||e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postalCode:e.postal_code||"",country:e.country||"",phone:e.phone||"",email:e.email||"",website:e.website||"",taxNumber:e.tax_no||"",registrationNumber:e.registration_no||"",companyLogo:e.logo_url||"",bankName:e.bank_name||"",bankAccount:e.bank_account||"",bankAccountName:e.bank_account_name||""})}const t=await fetch("/api/admin/settings");if(t.ok){const e=await t.json();jt(e)}else console.warn("Company settings not found"),jt({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:""})}catch(e){console.error("Error fetching company settings:",e),jt({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:""})}},Wt=e=>{var n,t,i,r,o,a,s,d,c,p,x,h,u,g,m;const y=("to_pay"===Ve||"paid"===Ve)&&e.issuerInfo,v=y?{companyName:null===(n=e.issuerInfo)||void 0===n?void 0:n.name,companyLogo:null===(t=e.issuerInfo)||void 0===t?void 0:t.logoUrl,address:null===(i=e.issuerInfo)||void 0===i?void 0:i.address,city:null===(r=e.issuerInfo)||void 0===r?void 0:r.city,state:null===(o=e.issuerInfo)||void 0===o?void 0:o.state,postalCode:null===(a=e.issuerInfo)||void 0===a?void 0:a.postalCode,country:null===(s=e.issuerInfo)||void 0===s?void 0:s.country,phone:null===(d=e.issuerInfo)||void 0===d?void 0:d.phone,email:null===(c=e.issuerInfo)||void 0===c?void 0:c.email,bankName:null===(p=e.issuerInfo)||void 0===p?void 0:p.bankName,bankAccount:null===(x=e.issuerInfo)||void 0===x?void 0:x.bankAccount,bankAccountName:null===(h=e.issuerInfo)||void 0===h?void 0:h.bankAccountName,swiftCode:null===(u=e.issuerInfo)||void 0===u?void 0:u.swiftCode,taxNumber:null===(g=e.issuerInfo)||void 0===g?void 0:g.taxId,registrationNumber:null===(m=e.issuerInfo)||void 0===m?void 0:m.businessRegistration}:vt;if(!v)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${v.companyLogo?`<img src="${v.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name" style="${v.companyLogo?"font-size: 14px;":""}">${v.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${v.address?`${v.address}<br>`:""}\n                    ${[v.city,v.state,v.postalCode].filter(Boolean).join(", ")}${v.city||v.state||v.postalCode?"<br>":""}\n                    ${v.country?`${v.country}<br>`:""}\n                    ${v.phone?`Tel: ${v.phone}<br>`:""}\n                    ${v.email?`Email: ${v.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                ${y?`\n                <div class="customer-name">${(null===vt||void 0===vt?void 0:vt.companyName)||"Your Company"}</div>\n                ${null!==vt&&void 0!==vt&&vt.address?`<div class="customer-details">${vt.address}</div>`:""}\n                ${[null===vt||void 0===vt?void 0:vt.city,null===vt||void 0===vt?void 0:vt.state,null===vt||void 0===vt?void 0:vt.postalCode].filter(Boolean).length>0?`<div class="customer-details">${[null===vt||void 0===vt?void 0:vt.city,null===vt||void 0===vt?void 0:vt.state,null===vt||void 0===vt?void 0:vt.postalCode].filter(Boolean).join(", ")}</div>`:""}\n                ${null!==vt&&void 0!==vt&&vt.country?`<div class="customer-details">${vt.country}</div>`:""}\n                ${null!==vt&&void 0!==vt&&vt.email?`<div class="customer-details">${vt.email}</div>`:""}\n                `:`\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${"restaurant"===e.payerType&&e.restaurantName&&"Unknown"!==e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n                `}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${Vt(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${Vt(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${Vt(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,l.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,l.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,l.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row tax">\n                    <span>Tax (6%):</span>\n                    <span>${(0,l.vv)(e.tax,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,l.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${v.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${v.bankName}<br>\n                <strong>Account Name:</strong> ${v.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${v.bankAccount||"-"}\n                ${v.swiftCode?`<br><strong>SWIFT Code:</strong> ${v.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${v.taxNumber||v.registrationNumber?`\n        <div class="registration-info">\n            ${v.registrationNumber?`Reg No: ${v.registrationNumber}`:""}\n            ${v.registrationNumber&&v.taxNumber?" | ":""}\n            ${v.taxNumber?`Tax No: ${v.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},Ut=async e=>{if(!(("to_pay"===Ve||"paid"===Ve)&&e.issuerInfo||vt))return Oe("Company settings not loaded. Please try again."),void He(!0);try{var n;const t=Wt(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(t),r.close(),await new Promise(async e=>{try{var n;null!==(n=r.fonts)&&void 0!==n&&n.ready&&await r.fonts.ready}catch{}const t=r.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const o=await v()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const a=o.toDataURL("image/png"),s=new m.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=o.height*l/o.width;s.addImage(a,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),Oe("Failed to generate PDF. Please try again."),He(!0)}},Ht=e=>{if(!(("to_pay"===Ve||"paid"===Ve)&&e.issuerInfo||vt))return Oe("Company settings not loaded. Please try again."),void He(!0);const n=Wt(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},Yt=async e=>{We(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=lt.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=at.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=at.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}Re(n),_e(!0)},Ot=()=>{Ft({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"MYR",discountType:"none",discountValue:"",discountReason:""}),yt(null),ht(""),gt(!1)},Vt=e=>new Date(e).toLocaleDateString("en-MY"),qt=e=>{if("pending_payment"!==e.status)return!1;const n=new Date;return new Date(e.dueDate)<n},Jt=e=>qt(e)?"overdue":e.status,Gt=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},Qt=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},Kt=y.filter(e=>{const n=ce.toLowerCase(),t=Gt(e.status).toLowerCase(),i=(e=>{switch(e){case"automatic":return"Automatic";case"manual":return"Manual";default:return e||"Manual"}})(e.type||"").toLowerCase(),r=Qt(e.payerType||"").toLowerCase(),o=!ce||e.companyName.toLowerCase().includes(n)||e.invoiceNumber.toLowerCase().includes(n)||e.managerName.toLowerCase().includes(n)||(e.restaurantName||"").toLowerCase().includes(n)||t.includes(n)||i.includes(n)||r.includes(n)||(e.categoryDisplayName||"").toLowerCase().includes(n)||(e.planType||"").toLowerCase().includes(n);let a=!0;if(ve.start&&ve.end){const n=new Date(e.issueDate),t=new Date(ve.start),i=new Date(ve.end);t.setHours(0,0,0,0),i.setHours(23,59,59,999),a=n>=t&&n<=i}return o&&a}).sort((e,n)=>{const t=new Date(e.issueDate).getTime();return new Date(n.issueDate).getTime()-t}),Zt=[...y,...Ge],Xt=y.length,ei=Ge.length,ni=Zt.filter(e=>qt(e)).length,ti=Zt.filter(e=>"pending_payment"===e.status||"payment_submitted"===e.status).length,ii=Ge.filter(e=>{const n=Xe.toLowerCase(),t=Gt(e.status).toLowerCase(),i=!Xe||e.invoiceNumber.toLowerCase().includes(n)||(e.issuerName||"").toLowerCase().includes(n)||(e.restaurantName||"").toLowerCase().includes(n)||t.includes(n)||(e.categoryDisplayName||"").toLowerCase().includes(n)||(e.planType||"").toLowerCase().includes(n);let r=!0;if(ln.start&&ln.end){const n=new Date(e.issueDate),t=new Date(ln.start),i=new Date(ln.end);t.setHours(0,0,0,0),i.setHours(23,59,59,999),r=n>=t&&n<=i}return i&&r}).sort((e,n)=>{const t=new Date(e.issueDate).getTime();return new Date(n.issueDate).getTime()-t}),ri=Ke.filter(e=>{const n=pn.toLowerCase(),t=!pn||e.invoiceNumber.toLowerCase().includes(n)||(e.issuerName||"").toLowerCase().includes(n)||(e.restaurantName||"").toLowerCase().includes(n)||(e.categoryDisplayName||"").toLowerCase().includes(n)||(e.planType||"").toLowerCase().includes(n);let i=!0;if(jn.start&&jn.end){const n=new Date(e.paidDate||e.issueDate),t=new Date(jn.start),r=new Date(jn.end);t.setHours(0,0,0,0),r.setHours(23,59,59,999),i=n>=t&&n<=r}return t&&i}).sort((e,n)=>{const t=new Date(e.paidDate||e.issueDate).getTime();return new Date(n.paidDate||n.issueDate).getTime()-t}),oi=e=>{qn(e),ke(!0)},ai=e=>{var n,t;qn(e);if(Gn({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:(e=>{if(!e)return"";return new Date(e).toISOString().split("T")[0]})(e.dueDate),status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",invoiceCategory:e.invoiceCategory||"service",customDescription:e.customDescription||"",serviceDescription:e.serviceDescription||"",currency:e.currency||"MYR",items:e.items}),e.restaurantId){const n=lt.find(n=>n.id===e.restaurantId);n&&(ot({type:"restaurant",data:n}),Xn(n.name))}else if(e.managerId){const n=at.find(n=>n.id===e.managerId);n&&(ot({type:"manager",data:n}),Xn(n.fullName))}Kn(""),Fe(!0)},si=e=>{qn(e),$e(!0)};return(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(h.mc,{children:[(0,f.jsxs)(h.Y9,{children:[(0,f.jsx)(h.hE,{children:"Invoices"}),(0,f.jsx)(h.ex,{})]}),(0,f.jsxs)(h.UC,{children:[(0,f.jsxs)(h.MD,{children:[(0,f.jsxs)(h.hI,{color:"#059669",children:[(0,f.jsx)(h.Os,{children:Xt}),(0,f.jsx)(h.v0,{children:"Issued"}),(0,f.jsx)(h.d1,{children:"Invoices you sent"})]}),(0,f.jsxs)(h.hI,{color:"#2563EB",children:[(0,f.jsx)(h.Os,{children:ei}),(0,f.jsx)(h.v0,{children:"To Pay"}),(0,f.jsx)(h.d1,{children:"Invoices received"})]}),(0,f.jsxs)(h.hI,{color:"#F59E0B",children:[(0,f.jsx)(h.Os,{children:ti}),(0,f.jsx)(h.v0,{children:"Pending"}),(0,f.jsx)(h.d1,{children:"Awaiting payment"})]}),(0,f.jsxs)(h.hI,{color:"#DC2626",children:[(0,f.jsx)(h.Os,{children:ni}),(0,f.jsx)(h.v0,{children:"Overdue"}),(0,f.jsx)(h.d1,{children:"Requires attention"})]})]}),(0,f.jsxs)(g.tU,{children:[(0,f.jsxs)(g.oz,{active:"to_pay"===Ve,onClick:()=>qe("to_pay"),children:["Invoices to Pay",(0,f.jsx)(g.Ex,{count:Ge.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,variant:"warning"})]}),(0,f.jsxs)(g.oz,{active:"paid"===Ve,onClick:()=>qe("paid"),children:["Paid Invoices",(0,f.jsx)(g.Ex,{count:Ke.length})]}),(0,f.jsxs)(g.oz,{active:"issued"===Ve,onClick:()=>qe("issued"),children:["Issued Invoices",(0,f.jsx)(g.Ex,{count:y.length})]}),(0,f.jsxs)(g.oz,{active:"categories"===Ve,onClick:()=>qe("categories"),children:["Categories",(0,f.jsx)(g.Ex,{count:ft.length})]})]}),"issued"===Ve&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(b,{children:[(0,f.jsxs)(w,{children:[(0,f.jsxs)(Y,{children:[(0,f.jsx)(O,{active:"week"===xe&&!ue,onClick:()=>Je("week"),children:"Week"}),(0,f.jsx)(O,{active:"month"===xe&&!ue,onClick:()=>Je("month"),children:"Month"}),(0,f.jsx)(O,{active:"year"===xe&&!ue,onClick:()=>Je("year"),children:"Year"}),(0,f.jsx)(O,{active:"all"===xe&&!ue,onClick:()=>Je("all"),children:"All"}),(0,f.jsxs)(V,{children:[(0,f.jsxs)(q,{active:ue,onClick:()=>ye(!me),children:[(0,f.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,f.jsx)("path",{d:"M16 2v4M8 2v4"}),(0,f.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),ue&&ve.start&&ve.end?`${ve.start} ~ ${ve.end}`:"Custom Range"]}),(0,f.jsx)(s.A,{isOpen:me,startDate:ve.start,endDate:ve.end,onRangeSelect:(e,n)=>{ge(!0),je({start:e,end:n}),ye(!1)},onClose:()=>ye(!1)})]})]}),(0,f.jsx)(u.DO,{placeholder:"Search invoice, status, company, type...",value:ce,onChange:e=>pe(e.target.value)})]}),(0,f.jsx)(k,{children:(0,f.jsx)(C,{variant:"primary",onClick:()=>{Ot(),be(!0)},children:"Create Invoice"})})]}),(0,f.jsx)(h.an,{children:(0,f.jsxs)(h.bQ,{children:[(0,f.jsx)(h.B_,{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)(h.gU,{children:"Invoice"}),(0,f.jsx)(h.gU,{children:"Customer"}),(0,f.jsx)(h.gU,{align:"center",children:"Period"}),(0,f.jsx)(h.gU,{align:"center",children:"Issued"}),(0,f.jsx)(h.gU,{align:"center",children:"Due"}),(0,f.jsx)(h.gU,{align:"center",children:"Status"}),(0,f.jsx)(h.gU,{align:"right",children:"Amount"}),(0,f.jsx)(h.gU,{align:"right",children:"Total"}),(0,f.jsx)(h.gU,{align:"center",children:"Actions"})]})}),(0,f.jsxs)("tbody",{children:[Kt.map(e=>(0,f.jsxs)(h.J2,{children:[(0,f.jsx)(h.Bv,{"data-label":"Invoice",children:(0,f.jsxs)(F,{children:[(0,f.jsxs)(S,{children:[e.invoiceNumber,"automatic"===e.type&&(0,f.jsx)(A,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,f.jsx)(B,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,f.jsx)(h.Bv,{"data-label":"Customer",children:(0,f.jsxs)(F,{children:[(0,f.jsx)(S,{children:e.customerName||e.restaurantName||"Unknown"}),(0,f.jsx)(B,{children:Qt(e.payerType||"restaurant")})]})}),(0,f.jsx)(h.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,f.jsx)(h.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:Vt(e.issueDate)}),(0,f.jsx)(h.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:Vt(e.dueDate)}),(0,f.jsxs)(h.Bv,{"data-label":"Status",align:"center",children:[(0,f.jsx)(D,{status:Jt(e),children:Gt(Jt(e))}),e.isModified&&(0,f.jsx)("span",{style:{display:"inline-block",marginLeft:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px",verticalAlign:"middle"},children:"Modified"})]}),(0,f.jsx)(h.Bv,{"data-label":"Amount",align:"right",children:(0,f.jsx)(h.DM,{children:(0,l.vv)(e.amount,e.currency||"MYR")})}),(0,f.jsx)(h.Bv,{"data-label":"Total",align:"right",children:(0,f.jsx)(h.DM,{highlight:!0,children:0===e.total?(0,f.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"MYR")})}),(0,f.jsx)(h.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,f.jsxs)(h.wr,{children:[(0,f.jsx)(E,{variant:"primary",onClick:()=>oi(e),children:"View"}),"draft"===e.status&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(E,{onClick:()=>ai(e),children:"Edit"}),(0,f.jsx)(E,{variant:"success",onClick:()=>(e=>{qn(e),De(!0)})(e),title:"Send Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,f.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,f.jsx)(I,{onClick:()=>si(e),title:"Delete Invoice",children:(0,f.jsx)(N,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(E,{onClick:()=>ai(e),children:"Edit"}),(0,f.jsx)(E,{onClick:()=>Ut(e),title:"Download PDF",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,f.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,f.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,f.jsx)(E,{onClick:()=>Ht(e),title:"Print Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,f.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,f.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,f.jsx)(E,{variant:"email",onClick:()=>Yt(e),title:"Send Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,f.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,f.jsx)(I,{onClick:()=>si(e),title:"Delete Invoice",children:(0,f.jsx)(N,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,f.jsxs)(f.Fragment,{children:[e.hasPaymentInfo&&(0,f.jsx)(E,{variant:"primary",onClick:()=>(e=>{qn(e),Be(!0)})(e),children:"Confirm"}),(0,f.jsx)(E,{onClick:()=>Ut(e),title:"Download PDF",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,f.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,f.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,f.jsx)(E,{onClick:()=>Ht(e),title:"Print Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,f.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,f.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,f.jsx)(E,{variant:"email",onClick:()=>Yt(e),title:"Resend Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,f.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(E,{onClick:()=>ai(e),children:"Edit"}),(0,f.jsx)(E,{onClick:()=>Ut(e),title:"Download PDF",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,f.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,f.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,f.jsx)(E,{onClick:()=>Ht(e),title:"Print Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,f.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,f.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,f.jsx)(E,{variant:"email",onClick:()=>Yt(e),title:"Resend Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,f.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,f.jsx)(I,{onClick:()=>si(e),title:"Delete Invoice",children:(0,f.jsx)(N,{children:"\xd7"})})]}),"paid"===e.status&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(E,{onClick:()=>Ut(e),title:"Download PDF",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,f.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,f.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,f.jsx)(E,{onClick:()=>Ht(e),title:"Print Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,f.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,f.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,f.jsx)(E,{onClick:()=>Ut(e),title:"Download Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,f.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,f.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id)),0===Kt.length&&(0,f.jsx)(h.J2,{children:(0,f.jsx)(h.Bv,{colSpan:9,children:(0,f.jsxs)(h.ys,{children:[(0,f.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,f.jsx)("div",{style:{fontSize:"14px"},children:0===y.length?"Create your first invoice to get started":"Try adjusting your filters"})]})})})]})]})})]}),"to_pay"===Ve&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(b,{children:(0,f.jsxs)(w,{children:[(0,f.jsxs)(Y,{children:[(0,f.jsx)(O,{active:"week"===nn&&!rn,onClick:()=>cn("week"),children:"Week"}),(0,f.jsx)(O,{active:"month"===nn&&!rn,onClick:()=>cn("month"),children:"Month"}),(0,f.jsx)(O,{active:"year"===nn&&!rn,onClick:()=>cn("year"),children:"Year"}),(0,f.jsx)(O,{active:"all"===nn&&!rn,onClick:()=>cn("all"),children:"All"}),(0,f.jsxs)(V,{children:[(0,f.jsxs)(q,{active:rn,onClick:()=>sn(!an),children:[(0,f.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,f.jsx)("path",{d:"M16 2v4M8 2v4"}),(0,f.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),rn&&ln.start&&ln.end?`${ln.start} ~ ${ln.end}`:"Custom Range"]}),(0,f.jsx)(s.A,{isOpen:an,startDate:ln.start,endDate:ln.end,onRangeSelect:(e,n)=>{on(!0),dn({start:e,end:n}),sn(!1)},onClose:()=>sn(!1)})]})]}),(0,f.jsx)(u.DO,{placeholder:"Search invoice, status, issuer...",value:Xe,onChange:e=>en(e.target.value)})]})}),(0,f.jsx)(h.an,{children:(0,f.jsxs)(h.bQ,{children:[(0,f.jsx)(h.B_,{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)(h.gU,{children:"Invoice"}),(0,f.jsx)(h.gU,{children:"Issuer"}),(0,f.jsx)(h.gU,{align:"center",children:"Period"}),(0,f.jsx)(h.gU,{align:"center",children:"Issued"}),(0,f.jsx)(h.gU,{align:"center",children:"Due"}),(0,f.jsx)(h.gU,{align:"center",children:"Status"}),(0,f.jsx)(h.gU,{align:"right",children:"Amount"}),(0,f.jsx)(h.gU,{align:"right",children:"Total"}),(0,f.jsx)(h.gU,{align:"center",children:"Actions"})]})}),(0,f.jsx)("tbody",{children:ii.length>0?ii.map(e=>(0,f.jsxs)(h.J2,{children:[(0,f.jsx)(h.Bv,{"data-label":"Invoice",children:(0,f.jsxs)(F,{children:[(0,f.jsxs)(S,{children:[e.invoiceNumber,"automatic"===e.type&&(0,f.jsx)(A,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,f.jsx)(B,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,f.jsx)(h.Bv,{"data-label":"Issuer",children:(0,f.jsxs)(F,{children:[(0,f.jsx)(S,{children:e.issuerName||("system_admin"===e.issuerType?"System Admin":"brand"===e.issuerType?"Brand":"Foodcourt")}),(0,f.jsx)(B,{children:e.restaurantName&&"Unknown"!==e.restaurantName?`For: ${e.restaurantName}`:""})]})}),(0,f.jsx)(h.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,f.jsx)(h.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:Vt(e.issueDate)}),(0,f.jsx)(h.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:Vt(e.dueDate)}),(0,f.jsxs)(h.Bv,{"data-label":"Status",align:"center",children:[(0,f.jsx)(D,{status:Jt(e),children:Gt(Jt(e))}),e.isModified&&(0,f.jsx)("span",{style:{display:"inline-block",marginLeft:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px",verticalAlign:"middle"},children:"Modified"})]}),(0,f.jsx)(h.Bv,{"data-label":"Amount",align:"right",children:(0,f.jsx)(h.DM,{children:(0,l.vv)(e.amount,e.currency||"MYR")})}),(0,f.jsx)(h.Bv,{"data-label":"Total",align:"right",children:(0,f.jsx)(h.DM,{highlight:!0,children:0===e.total?(0,f.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"MYR")})}),(0,f.jsx)(h.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,f.jsxs)(h.wr,{children:[(0,f.jsx)(E,{variant:"primary",onClick:()=>oi(e),children:"View"}),("pending_payment"===e.status||"overdue"===e.status)&&e.total>0&&(0,f.jsx)(E,{variant:"success",onClick:()=>Dt(e),children:"Pay"}),(0,f.jsx)(E,{onClick:()=>Ut(e),title:"Download PDF",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,f.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,f.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,f.jsx)(E,{onClick:()=>Ht(e),title:"Print Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,f.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,f.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,f.jsx)(E,{variant:"email",onClick:()=>Yt(e),title:"Email Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,f.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]})})]},e.id)):(0,f.jsx)(h.J2,{children:(0,f.jsx)(h.Bv,{colSpan:9,children:(0,f.jsx)(h.ys,{children:"No invoices to pay"})})})})]})})]}),"paid"===Ve&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(b,{children:(0,f.jsxs)(w,{children:[(0,f.jsxs)(Y,{children:[(0,f.jsx)(O,{active:"week"===hn&&!gn,onClick:()=>bn("week"),children:"Week"}),(0,f.jsx)(O,{active:"month"===hn&&!gn,onClick:()=>bn("month"),children:"Month"}),(0,f.jsx)(O,{active:"year"===hn&&!gn,onClick:()=>bn("year"),children:"Year"}),(0,f.jsx)(O,{active:"all"===hn&&!gn,onClick:()=>bn("all"),children:"All"}),(0,f.jsxs)(V,{children:[(0,f.jsxs)(q,{active:gn,onClick:()=>vn(!yn),children:[(0,f.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,f.jsx)("path",{d:"M16 2v4M8 2v4"}),(0,f.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),gn&&jn.start&&jn.end?`${jn.start} ~ ${jn.end}`:"Custom Range"]}),(0,f.jsx)(s.A,{isOpen:yn,startDate:jn.start,endDate:jn.end,onRangeSelect:(e,n)=>{mn(!0),fn({start:e,end:n}),vn(!1)},onClose:()=>vn(!1)})]})]}),(0,f.jsx)(u.DO,{placeholder:"Search invoice, issuer, restaurant...",value:pn,onChange:e=>xn(e.target.value)})]})}),(0,f.jsx)(h.an,{children:(0,f.jsxs)(h.bQ,{children:[(0,f.jsx)(h.B_,{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)(h.gU,{children:"Invoice"}),(0,f.jsx)(h.gU,{children:"Issuer"}),(0,f.jsx)(h.gU,{align:"center",children:"Period"}),(0,f.jsx)(h.gU,{align:"center",children:"Paid Date"}),(0,f.jsx)(h.gU,{align:"center",children:"Status"}),(0,f.jsx)(h.gU,{align:"right",children:"Amount"}),(0,f.jsx)(h.gU,{align:"right",children:"Total"}),(0,f.jsx)(h.gU,{align:"center",children:"Actions"})]})}),(0,f.jsx)("tbody",{children:ri.length>0?ri.map(e=>(0,f.jsxs)(h.J2,{children:[(0,f.jsx)(h.Bv,{"data-label":"Invoice",children:(0,f.jsxs)(F,{children:[(0,f.jsxs)(S,{children:[e.invoiceNumber,"automatic"===e.type&&(0,f.jsx)(A,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,f.jsx)(B,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,f.jsx)(h.Bv,{"data-label":"Issuer",children:(0,f.jsxs)(F,{children:[(0,f.jsx)(S,{children:e.issuerName||("system_admin"===e.issuerType?"System Admin":"brand"===e.issuerType?"Brand":"Foodcourt")}),(0,f.jsx)(B,{children:e.restaurantName&&"Unknown"!==e.restaurantName?`For: ${e.restaurantName}`:""})]})}),(0,f.jsx)(h.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,f.jsx)(h.Bv,{"data-label":"Paid",align:"center",style:{fontSize:"13px"},children:e.paidDate?Vt(e.paidDate):Vt(e.issueDate)}),(0,f.jsx)(h.Bv,{"data-label":"Status",align:"center",children:(0,f.jsx)(D,{status:"paid",children:"Paid"})}),(0,f.jsx)(h.Bv,{"data-label":"Amount",align:"right",children:(0,f.jsx)(h.DM,{children:(0,l.vv)(e.amount,e.currency||"MYR")})}),(0,f.jsx)(h.Bv,{"data-label":"Total",align:"right",children:(0,f.jsx)(h.DM,{highlight:!0,children:0===e.total?(0,f.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"MYR")})}),(0,f.jsx)(h.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,f.jsxs)(h.wr,{children:[(0,f.jsx)(E,{variant:"primary",onClick:()=>oi(e),children:"View"}),(0,f.jsx)(E,{onClick:()=>Ut(e),title:"Download PDF",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,f.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,f.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,f.jsx)(E,{onClick:()=>Ht(e),title:"Print Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,f.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,f.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})})]},e.id)):(0,f.jsx)(h.J2,{children:(0,f.jsx)(h.Bv,{colSpan:8,children:(0,f.jsx)(h.ys,{children:"No paid invoices yet"})})})})]})})]}),"categories"===Ve&&(0,f.jsxs)("div",{style:{padding:"24px 0"},children:[(0,f.jsxs)(U,{children:[(0,f.jsxs)("div",{children:[(0,f.jsx)(H,{children:"Invoice Categories"}),(0,f.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,f.jsx)(C,{variant:"primary",onClick:()=>{_n(null),Rn({name:"",code:"",description:""}),$n(!0)},children:"Add Category"})]}),0===ft.length?(0,f.jsxs)(o.pp,{children:[(0,f.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,f.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to organize charges."}),(0,f.jsx)(C,{variant:"primary",onClick:()=>{_n(null),Rn({name:"",code:"",description:""}),$n(!0)},children:"Add Category"})]}):(0,f.jsx)(T,{children:ft.map(e=>(0,f.jsxs)(z,{isActive:e.is_active,children:[(0,f.jsx)($,{children:e.name.charAt(0).toUpperCase()}),(0,f.jsxs)(M,{children:[(0,f.jsxs)(_,{children:[e.name,(0,f.jsx)(L,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,f.jsxs)(P,{children:[(0,f.jsxs)("span",{children:["Code: ",(0,f.jsx)("strong",{children:e.code})]}),e.description&&(0,f.jsx)("span",{children:e.description})]})]}),(0,f.jsxs)(R,{children:[(0,f.jsx)(W,{onClick:()=>{_n(e),Rn({name:e.name,code:e.code,description:e.description||""}),$n(!0)},title:"Edit Category",children:(0,f.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,f.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,f.jsx)(W,{onClick:()=>{On(e),Hn(!0)},title:"Delete Category",children:(0,f.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,f.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),wn&&Vn&&(0,f.jsx)(J,{onClick:()=>kn(!1),children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)(K,{children:"Submit Payment"}),(0,f.jsx)(Z,{onClick:()=>kn(!1),children:"\xd7"})]}),(0,f.jsxs)(X,{children:[(0,f.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,f.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,f.jsx)("strong",{children:Vn.invoiceNumber})]}),(0,f.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,l.vv)(Vn.total,Vn.currency)})]}),An?(0,f.jsx)("div",{style:{textAlign:"center",padding:"20px",color:"#6B7280"},children:"Loading payment methods..."}):0===Sn.length?(0,f.jsxs)("div",{style:{padding:"20px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,f.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#92400E",fontSize:"15px"},children:"Payment Not Available"}),"system_admin"===Vn.issuerType?(0,f.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:[(0,f.jsx)("strong",{children:"System Admin"})," has not configured payment methods for ",(0,f.jsx)("strong",{children:Vn.currency||"MYR"})," yet. Please contact the system administrator."]}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("p",{style:{margin:"0 0 12px 0",color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:["No payment methods configured for ",(0,f.jsx)("strong",{children:Vn.currency||"MYR"}),". Please set up your payment settings first."]}),(0,f.jsx)("button",{onClick:()=>{kn(!1),window.location.href="/pos/brand/payment-settings"},style:{padding:"8px 16px",background:"#DC2626",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"13px",fontWeight:"600"},children:"Go to Payment Settings"})]})]}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,f.jsx)(ie,{children:"Payment Method *"}),(0,f.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${Math.min(Sn.length,3)}, 1fr)`,gap:"10px",marginTop:"8px"},children:Sn.map(e=>(0,f.jsxs)("button",{onClick:()=>{Fn(n=>({...n,paymentMethod:e.id})),In(null)},style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 8px",border:"2px solid "+(Cn.paymentMethod===e.id?"#635BFF":"#E5E7EB"),borderRadius:"8px",background:Cn.paymentMethod===e.id?"#F5F3FF":"white",cursor:"pointer",transition:"all 0.2s"},children:[(0,f.jsx)("span",{style:{fontSize:"22px",marginBottom:"6px"},children:"stripe"===e.id?"\ud83d\udcb3":"paypal"===e.id?"\ud83c\udd7f\ufe0f":"qr_payment"===e.id?"\ud83d\udcf1":"\ud83c\udfe6"}),(0,f.jsx)("span",{style:{fontSize:"13px",fontWeight:"500",color:"#374151"},children:e.name})]},e.id))})]}),"stripe"===Cn.paymentMethod&&Vn&&(0,f.jsx)(j.A,{invoiceId:Vn.id,onSuccess:()=>{kn(!1),qn(null),Fn({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),Oe("Payment submitted successfully! The issuer will review and confirm your payment."),He(!0),Bt(),At()},onError:()=>{}}),"bank_transfer"===Cn.paymentMethod&&(()=>{const e=Sn.find(e=>"bank_transfer"===e.id);return e?(0,f.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",fontSize:"14px",lineHeight:"1.8"},children:[(0,f.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"Bank Transfer Details"}),(0,f.jsxs)("p",{style:{margin:"0"},children:[(0,f.jsx)("strong",{children:"Bank:"})," ",e.bankName]}),(0,f.jsxs)("p",{style:{margin:"0"},children:[(0,f.jsx)("strong",{children:"Account Number:"})," ",e.accountNumber]}),(0,f.jsxs)("p",{style:{margin:"0"},children:[(0,f.jsx)("strong",{children:"Account Name:"})," ",e.accountName]})]}):null})(),"qr_payment"===Cn.paymentMethod&&(()=>{const e=Sn.find(e=>"qr_payment"===e.id);return e?(0,f.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",textAlign:"center"},children:[(0,f.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"QR Payment"}),e.qrImage&&(0,f.jsx)("img",{src:e.qrImage,alt:"Payment QR Code",style:{maxWidth:"200px",maxHeight:"200px",border:"1px solid #E5E7EB",borderRadius:"8px"}}),e.qrDescription&&(0,f.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:e.qrDescription})]}):null})(),Cn.paymentMethod&&"stripe"!==Cn.paymentMethod&&"paypal"!==Cn.paymentMethod&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,f.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,f.jsxs)("span",{children:["Please provide either a ",(0,f.jsx)("strong",{children:"Transaction ID / Reference Number"})," or upload a ",(0,f.jsx)("strong",{children:"Payment Receipt Image"})," to submit your payment."]})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Transaction ID / Reference Number"}),(0,f.jsx)(re,{type:"text",placeholder:"Enter transaction ID or reference number",value:Cn.transactionId,onChange:e=>Fn(n=>({...n,transactionId:e.target.value}))})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Payment Receipt Image"}),(0,f.jsx)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",background:Cn.receiptImage?"#F0FDF4":"#FAFBFC",cursor:"pointer",position:"relative"},children:Cn.receiptImage?(0,f.jsxs)("div",{children:[(0,f.jsx)("img",{src:Cn.receiptImage,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",marginBottom:"12px"}}),(0,f.jsx)("div",{children:(0,f.jsx)("button",{type:"button",onClick:()=>Fn(e=>({...e,receiptImage:""})),style:{background:"#DC2626",color:"white",border:"none",padding:"8px 16px",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Remove Image"})})]}):(0,f.jsxs)("label",{style:{cursor:"pointer",display:"block"},children:[(0,f.jsx)("input",{type:"file",accept:"image/*",onChange:async e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];if(t)if(t.type.startsWith("image/"))if(t.size>10485760)In("File size must be less than 10MB");else try{In(null);const e=await function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:800,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:800,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.7;return new Promise((r,o)=>{const a=new Image,s=new FileReader;s.onload=e=>{var n;a.src=null===(n=e.target)||void 0===n?void 0:n.result},a.onload=()=>{const e=document.createElement("canvas");let s=a.width,l=a.height;if(s>n||l>t){const e=Math.min(n/s,t/l);s=Math.round(s*e),l=Math.round(l*e)}e.width=s,e.height=l;const d=e.getContext("2d");if(!d)return void o(new Error("Failed to get canvas context"));d.drawImage(a,0,0,s,l);const c=e.toDataURL("image/jpeg",i);r(c)},a.onerror=()=>o(new Error("Failed to load image")),s.onerror=()=>o(new Error("Failed to read file")),s.readAsDataURL(e)})}(t,1024,1024,.8);Fn(n=>({...n,receiptImage:e}))}catch(i){console.error("Error processing image:",i),In("Failed to process image. Please try another file.")}else In("Please upload an image file (JPG, PNG, etc.)")},style:{display:"none"}}),(0,f.jsxs)("div",{style:{color:"#6B7280",fontSize:"14px"},children:[(0,f.jsx)("div",{style:{fontSize:"24px",marginBottom:"8px"},children:"+"}),(0,f.jsx)("div",{children:"Click to upload payment receipt"}),(0,f.jsx)("div",{style:{fontSize:"12px",marginTop:"4px"},children:"Supports JPG, PNG (max 5MB)"})]})]})})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Notes (Optional)"}),(0,f.jsx)(oe,{placeholder:"Any additional information about the payment...",value:Cn.notes,onChange:e=>Fn(n=>({...n,notes:e.target.value}))})]})]})]})]}),(0,f.jsxs)(ee,{style:{flexDirection:"column",alignItems:"stretch"},children:[(0,f.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end"},children:[(0,f.jsx)(C,{variant:"secondary",onClick:()=>{kn(!1),In(null)},children:"Cancel"}),"stripe"!==Cn.paymentMethod&&"paypal"!==Cn.paymentMethod&&(0,f.jsx)(C,{variant:"primary",onClick:async()=>{if(Vn){In(null),Tn(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Vn.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:Cn.paymentMethod,transaction_id:Cn.transactionId,notes:Cn.notes,receipt_url:Cn.receiptImage||null})});if(n.ok)kn(!1),qn(null),Fn({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),In(null),Oe("Payment submitted successfully! The issuer will review and confirm your payment."),He(!0),await Bt(),await At();else{const e=await n.json();In(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),In("Network error. Please check your connection and try again.")}finally{Tn(!1)}}},disabled:!Cn.paymentMethod||An||Nn||!Cn.transactionId&&!Cn.receiptImage,children:Nn?"Submitting...":"Submit Payment"})]}),En&&(0,f.jsx)(p.Mo,{type:"error",style:{marginTop:"12px",wordBreak:"break-word"},children:En})]})]})}),zn&&(0,f.jsx)(J,{onClick:Nt,children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)(K,{children:Mn?"Edit Category":"Add Category"}),(0,f.jsx)(Z,{onClick:Nt,children:"\xd7"})]}),(0,f.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Pn.name.trim()&&Pn.code.trim())try{Wn(!0);const e=localStorage.getItem("auth_token"),n=Mn?`/api/invoices/categories/${Mn.id}`:"/api/invoices/categories",t=Mn?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:Pn.name.trim(),code:Pn.code.trim().toLowerCase().replace(/\s+/g,"_"),description:Pn.description.trim()||null})}),r=await i.json();r.success?(Nt(),Et()):alert(r.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{Wn(!1)}},children:[(0,f.jsxs)(X,{children:[(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Name *"}),(0,f.jsx)(re,{value:Pn.name,onChange:e=>Rn({...Pn,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Code *"}),(0,f.jsx)(re,{value:Pn.code,onChange:e=>Rn({...Pn,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Mn||void 0===Mn?void 0:Mn.is_system}),(0,f.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Description"}),(0,f.jsx)(oe,{value:Pn.description,onChange:e=>Rn({...Pn,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(C,{variant:"secondary",type:"button",onClick:Nt,children:"Cancel"}),(0,f.jsx)(C,{variant:"primary",type:"submit",disabled:Ln||!Pn.name||!Pn.code,children:Ln?"Saving...":Mn?"Update":"Create"})]})]})]})}),(0,f.jsx)(x.A,{isOpen:Un,onCancel:()=>Hn(!1),onConfirm:async()=>{if(Yn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${Yn.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(Hn(!1),On(null),Et()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===Yn||void 0===Yn?void 0:Yn.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),fe&&(0,f.jsx)(J,{onClick:e=>{e.target===e.currentTarget&&(be(!1),Ot())},children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)(K,{children:"Create Invoice"}),(0,f.jsx)(Z,{onClick:()=>{be(!1),Ot()},children:"\xd7"})]}),(0,f.jsxs)(X,{children:[(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Search Restaurant *"}),(0,f.jsxs)("div",{style:{position:"relative"},children:[(0,f.jsx)(re,{type:"text",value:xt,onChange:e=>(e=>{if(ht(e),gt(!0),e.length<2)return void pt({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available restaurants:",lt);const n=lt.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered restaurants:",n),pt({managers:[],restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>gt(!0),onBlur:()=>setTimeout(()=>gt(!1),200),placeholder:"Type to search for restaurants",required:!0}),ut&&(ct.managers.length>0||ct.restaurants.length>0)&&(0,f.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[ct.managers.length>0&&(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),ct.managers.map(e=>(0,f.jsxs)("div",{onClick:()=>Rt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,f.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),ct.restaurants.length>0&&(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),ct.restaurants.map(e=>{const n=at.find(n=>n.id===e.admin_id);return(0,f.jsxs)("div",{onClick:()=>Rt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,f.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),mt&&(0,f.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===mt.type?mt.data.fullName:mt.data.name}),(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===mt.type?`${mt.data.companyName} \u2022 Manager`:`${mt.data.address||"No address"} \u2022 Restaurant`})]}),(0,f.jsx)("button",{onClick:()=>{yt(null),ht("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,f.jsxs)(ne,{children:[(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Amount (RM) *"}),(0,f.jsx)(re,{type:"number",step:"0.01",min:"0",value:Ct.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(Ct.discountValue)||0,i="percentage"===Ct.discountType?n*(t/100):"fixed"===Ct.discountType?t:0,r=Math.max(0,n-i),o=r*(zt.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+n.rate,0)/100),a=r+o;Ft({...Ct,amount:e.target.value,tax:o.toFixed(2),total:a.toFixed(2)})},placeholder:"0.00",required:!0})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Due Date *"}),(0,f.jsx)(re,{type:"date",value:Ct.dueDate,onChange:e=>Ft({...Ct,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,f.jsxs)(ne,{children:[(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Discount"}),(0,f.jsxs)(ae,{value:Ct.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(Ct.amount)||0,i="none"===n?0:parseFloat(Ct.discountValue)||0,r="percentage"===n?t*(i/100):"fixed"===n?i:0,o=Math.max(0,t-r),a=o*(zt.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+n.rate,0)/100),s=o+a;Ft({...Ct,discountType:n,discountValue:"none"===n?"":Ct.discountValue,tax:a.toFixed(2),total:s.toFixed(2)})},children:[(0,f.jsx)("option",{value:"none",children:"No Discount"}),(0,f.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,f.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Ct.discountType&&(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"percentage"===Ct.discountType?"Discount (%)":"Discount Amount"}),(0,f.jsx)(re,{type:"number",step:"0.01",min:"0",max:"percentage"===Ct.discountType?"100":void 0,value:Ct.discountValue,onChange:e=>{const n=parseFloat(Ct.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===Ct.discountType?n*(t/100):t,r=Math.max(0,n-i),o=r*(zt.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+n.rate,0)/100),a=r+o;Ft({...Ct,discountValue:e.target.value,tax:o.toFixed(2),total:a.toFixed(2)})},placeholder:"0"})]}),"none"!==Ct.discountType&&(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Discount Reason"}),(0,f.jsx)(re,{type:"text",value:Ct.discountReason,onChange:e=>Ft({...Ct,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Invoice Category"}),(0,f.jsx)(ae,{value:Ct.invoiceCategory||"service",onChange:e=>Ft({...Ct,invoiceCategory:e.target.value}),children:ft.length>0?ft.filter(e=>"subscription"!==e.code).map(e=>(0,f.jsx)("option",{value:e.code,children:e.name},e.id)):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("option",{value:"service",children:"Service"}),(0,f.jsx)("option",{value:"consulting",children:"Consulting"}),(0,f.jsx)("option",{value:"others",children:"Others"})]})})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Item/Description"}),(0,f.jsx)(oe,{value:"others"===Ct.invoiceCategory?Ct.customDescription||"":Ct.serviceDescription||"",onChange:e=>{"others"===Ct.invoiceCategory?Ft({...Ct,customDescription:e.target.value}):Ft({...Ct,serviceDescription:e.target.value})},placeholder:`Enter ${Ct.invoiceCategory||"service"} description...`,rows:3})]}),(0,f.jsxs)(se,{children:[(0,f.jsxs)(le,{children:[(0,f.jsx)("span",{children:"Subtotal:"}),(0,f.jsx)("span",{children:(0,l.vv)(parseFloat(Ct.amount||"0"),Ct.currency||e.currency)})]}),"none"!==Ct.discountType&&parseFloat(Ct.discountValue||"0")>0&&(()=>{const n=parseFloat(Ct.amount||"0"),t=parseFloat(Ct.discountValue||"0"),i="percentage"===Ct.discountType?n*(t/100):t;return(0,f.jsxs)(le,{children:[(0,f.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Ct.discountType?` (${t}%)`:"",":"]}),(0,f.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,l.vv)(i,Ct.currency||e.currency)]})]})})(),zt.filter(e=>e.enabled&&e.rate>0).map((n,t)=>{const i=parseFloat(Ct.amount||"0"),r=parseFloat(Ct.discountValue||"0"),o="percentage"===Ct.discountType?i*(r/100):"fixed"===Ct.discountType?r:0,a=Math.max(0,i-o)*(n.rate/100);return(0,f.jsxs)(le,{children:[(0,f.jsxs)("span",{children:[n.name," (",n.rate,"%):"]}),(0,f.jsx)("span",{children:(0,l.vv)(a,Ct.currency||e.currency)})]},t)}),0===zt.filter(e=>e.enabled&&e.rate>0).length&&(0,f.jsxs)(le,{children:[(0,f.jsx)("span",{children:"Additional Charges:"}),(0,f.jsx)("span",{children:(0,l.vv)(0,Ct.currency||e.currency)})]}),(0,f.jsxs)(le,{highlight:!0,children:[(0,f.jsx)("span",{children:"Total:"}),(0,f.jsx)("span",{children:(0,f.jsx)("strong",{children:(0,l.vv)(parseFloat(Ct.total||"0"),Ct.currency||e.currency)})})]})]})]}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(C,{variant:"secondary",onClick:()=>{be(!1),Ot()},children:"Cancel"}),(0,f.jsx)(C,{variant:"primary",onClick:async()=>{if(mt&&Ct.amount&&Ct.dueDate)try{const e=parseFloat(Ct.amount),t=parseFloat(Ct.discountValue)||0,i="percentage"===Ct.discountType?e*(t/100):"fixed"===Ct.discountType?t:0,r=Math.max(0,e-i),o=zt.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(r*e.rate/100*100)/100})),a=o.reduce((e,n)=>e+n.amount,0),s=r+a;let l="";l="others"===Ct.invoiceCategory?Ct.customDescription||"":Ct.serviceDescription||"";let d="",c="",p="",x="";if("restaurant"===mt.type){const e=mt.data;d=e.name,x=e.name,p=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),c=n.join("\n")}else if("manager"===mt.type){const e=mt.data;d=e.fullName,p=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),c=n.join("\n")}let h="restaurant",u=null;if("restaurant"===mt.type){const e=mt.data;h="restaurant",u=parseInt(e.id)}const g={restaurant_id:"restaurant"===mt.type?mt.data.id:null,customer_name:d,customer_address:c,company_name:p,restaurant_name:x,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(Ct.dueDate).toISOString(),total_amount:s,subtotal_before_discount:i>0?e:null,discount_type:"none"!==Ct.discountType?Ct.discountType:null,discount_value:i>0?t:null,discount_amount:i>0?i:null,discount_reason:Ct.discountReason||null,currency:Ct.currency||"MYR",status:"draft",notes:l,issued_by:(null===n||void 0===n?void 0:n.id)||1,issued_at:(new Date).toISOString(),issuer_type:"brand",issuer_id:(null===n||void 0===n?void 0:n.brand_id)||null,payer_type:h,payer_id:u,invoice_category:Ct.invoiceCategory||"service",custom_description:"others"===Ct.invoiceCategory?Ct.customDescription:null,service_description:"others"!==Ct.invoiceCategory?Ct.serviceDescription:null,additional_charges:o},m=[{item_type:Ct.invoiceCategory,description:l,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],y=localStorage.getItem("auth_token"),v=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({invoice_data:g,items:m})});if(v.ok)await St(),be(!1),Ot();else{const e=await v.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!mt||!Ct.amount||!Ct.dueDate,children:"Create Invoice"})]})]})}),we&&Vn&&((e,n,t,i,r,o,a,s,d,c,p,x,h,u)=>{const g=("to_pay"===Ve||"paid"===Ve)&&Vn.issuerInfo,m=g?{companyName:null===(e=Vn.issuerInfo)||void 0===e?void 0:e.name,companyLogo:null===(n=Vn.issuerInfo)||void 0===n?void 0:n.logoUrl,address:null===(t=Vn.issuerInfo)||void 0===t?void 0:t.address,city:null===(i=Vn.issuerInfo)||void 0===i?void 0:i.city,state:null===(r=Vn.issuerInfo)||void 0===r?void 0:r.state,postalCode:null===(o=Vn.issuerInfo)||void 0===o?void 0:o.postalCode,country:null===(a=Vn.issuerInfo)||void 0===a?void 0:a.country,phone:null===(s=Vn.issuerInfo)||void 0===s?void 0:s.phone,email:null===(d=Vn.issuerInfo)||void 0===d?void 0:d.email,bankName:null===(c=Vn.issuerInfo)||void 0===c?void 0:c.bankName,bankAccount:null===(p=Vn.issuerInfo)||void 0===p?void 0:p.bankAccount,bankAccountName:null===(x=Vn.issuerInfo)||void 0===x?void 0:x.bankAccountName,taxNumber:null===(h=Vn.issuerInfo)||void 0===h?void 0:h.taxId,registrationNumber:null===(u=Vn.issuerInfo)||void 0===u?void 0:u.businessRegistration}:vt;return(0,f.jsx)(J,{onClick:()=>ke(!1),children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)(K,{children:"Invoice Details"}),(0,f.jsx)(Z,{onClick:()=>ke(!1),children:"\xd7"})]}),(0,f.jsxs)(X,{children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,f.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===m||void 0===m?void 0:m.companyLogo)&&(0,f.jsx)("img",{src:m.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,f.jsx)("div",{style:{fontSize:null!==m&&void 0!==m&&m.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===m||void 0===m?void 0:m.companyName)||"Company Name"}),(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===m||void 0===m?void 0:m.address)&&(0,f.jsx)("div",{children:m.address}),((null===m||void 0===m?void 0:m.city)||(null===m||void 0===m?void 0:m.state)||(null===m||void 0===m?void 0:m.postalCode))&&(0,f.jsx)("div",{children:[null===m||void 0===m?void 0:m.city,null===m||void 0===m?void 0:m.state,null===m||void 0===m?void 0:m.postalCode].filter(Boolean).join(", ")}),(null===m||void 0===m?void 0:m.country)&&(0,f.jsx)("div",{children:m.country}),(null===m||void 0===m?void 0:m.phone)&&(0,f.jsxs)("div",{children:["Tel: ",m.phone]}),(null===m||void 0===m?void 0:m.email)&&(0,f.jsxs)("div",{children:["Email: ",m.email]})]})]}),(0,f.jsxs)("div",{style:{textAlign:"right"},children:[(0,f.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,f.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Vn.invoiceNumber}),(0,f.jsx)(D,{status:Vn.status,style:{marginTop:"8px"},children:Gt(Vn.status)}),Vn.isModified&&(0,f.jsx)("span",{style:{display:"inline-block",marginTop:"4px",padding:"2px 8px",fontSize:"11px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px"},children:"Modified"})]})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,f.jsxs)("div",{style:{flex:1},children:[(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),g?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:(null===vt||void 0===vt?void 0:vt.companyName)||"Your Company"}),(null===vt||void 0===vt?void 0:vt.address)&&(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:vt.address}),((null===vt||void 0===vt?void 0:vt.city)||(null===vt||void 0===vt?void 0:vt.state)||(null===vt||void 0===vt?void 0:vt.postalCode))&&(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:[null===vt||void 0===vt?void 0:vt.city,null===vt||void 0===vt?void 0:vt.state,null===vt||void 0===vt?void 0:vt.postalCode].filter(Boolean).join(", ")}),(null===vt||void 0===vt?void 0:vt.country)&&(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:vt.country}),(null===vt||void 0===vt?void 0:vt.email)&&(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:vt.email})]}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:Vn.customerName}),Vn.customerAddress&&(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:Vn.customerAddress}),"restaurant"===Vn.payerType&&Vn.restaurantName&&"Unknown"!==Vn.restaurantName&&(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",Vn.restaurantName]})]})]}),(0,f.jsxs)("div",{style:{textAlign:"right"},children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,f.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Vn.billingPeriod||"-"})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,f.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Vt(Vn.issueDate)})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,f.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Vt(Vn.dueDate)})]}),Vn.paidDate&&(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,f.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Vt(Vn.paidDate)})]})]})]}),(0,f.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,f.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,f.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,f.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,f.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,f.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,f.jsx)("tbody",{children:Vn.items.map((e,n)=>(0,f.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.unitPrice,Vn.currency||"MYR")}),(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.total,Vn.currency||"MYR")})]},n))})]})]}),(0,f.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,f.jsx)("div",{style:{width:"280px"},children:(0,f.jsxs)(se,{children:[(0,f.jsxs)(le,{children:[(0,f.jsx)("span",{children:"Subtotal:"}),(0,f.jsx)("span",{children:(0,l.vv)(Vn.subtotalBeforeDiscount||Vn.amount,Vn.currency||"MYR")})]}),Vn.discountType&&"none"!==Vn.discountType&&Vn.discountAmount>0&&(0,f.jsxs)(le,{children:[(0,f.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Vn.discountType?` (${Vn.discountValue}%)`:"",":"]}),(0,f.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,l.vv)(Vn.discountAmount,Vn.currency||"MYR")]})]}),(0,f.jsxs)(le,{children:[(0,f.jsx)("span",{children:"Tax (6%):"}),(0,f.jsx)("span",{children:(0,l.vv)(Vn.tax,Vn.currency||"MYR")})]}),(0,f.jsxs)(le,{highlight:!0,children:[(0,f.jsx)("span",{children:"Total:"}),(0,f.jsx)("span",{children:(0,f.jsx)("strong",{children:(0,l.vv)(Vn.total,Vn.currency||"MYR")})})]})]})})}),(null===m||void 0===m?void 0:m.bankName)&&(0,f.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("strong",{children:"Bank:"})," ",m.bankName]}),(0,f.jsxs)("div",{children:[(0,f.jsx)("strong",{children:"Account Name:"})," ",m.bankAccountName]}),(0,f.jsxs)("div",{children:[(0,f.jsx)("strong",{children:"Account Number:"})," ",m.bankAccount]})]})]}),((null===m||void 0===m?void 0:m.taxNumber)||(null===m||void 0===m?void 0:m.registrationNumber))&&(0,f.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===m||void 0===m?void 0:m.registrationNumber)&&(0,f.jsxs)("span",{children:["Reg No: ",m.registrationNumber]}),(null===m||void 0===m?void 0:m.registrationNumber)&&(null===m||void 0===m?void 0:m.taxNumber)&&(0,f.jsx)("span",{children:" | "}),(null===m||void 0===m?void 0:m.taxNumber)&&(0,f.jsxs)("span",{children:["Tax No: ",m.taxNumber]})]}),Vn.isModified&&Vn.modificationHistory&&Vn.modificationHistory.length>0&&(0,f.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,f.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#92400E",marginBottom:"12px"},children:"Modification History"}),Vn.modificationHistory.map((e,n)=>(0,f.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:n<Vn.modificationHistory.length-1?"10px":"0",paddingBottom:n<Vn.modificationHistory.length-1?"10px":"0",borderBottom:n<Vn.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,f.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,f.jsxs)("div",{style:{marginTop:"3px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,f.jsx)("div",{style:{marginTop:"3px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[n,t]=e;return(0,f.jsxs)("div",{children:[n,": ",String(t.from)," \u2192 ",String(t.to)]},n)})})]},n))]})]})]})})})(),Se&&Vn&&(0,f.jsx)(J,{onClick:()=>Be(!1),children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(Q,{children:[(0,f.jsxs)(K,{children:["Confirm Payment - ",Vn.invoiceNumber]}),(0,f.jsx)(Z,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,f.jsxs)(X,{children:[(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Payment Confirmation"}),(0,f.jsxs)(se,{children:[(0,f.jsxs)(le,{children:[(0,f.jsx)("span",{children:"Manager:"}),(0,f.jsx)("span",{children:Vn.managerName})]}),(0,f.jsxs)(le,{children:[(0,f.jsx)("span",{children:"Company:"}),(0,f.jsx)("span",{children:Vn.companyName})]}),(0,f.jsxs)(le,{children:[(0,f.jsx)("span",{children:"Invoice Number:"}),(0,f.jsx)("span",{children:Vn.invoiceNumber})]}),(0,f.jsxs)(le,{children:[(0,f.jsx)("span",{children:"Due Date:"}),(0,f.jsx)("span",{children:Vt(Vn.dueDate)})]}),(0,f.jsxs)(le,{highlight:!0,children:[(0,f.jsx)("span",{children:(0,f.jsx)("strong",{children:"Payment Amount:"})}),(0,f.jsx)("span",{children:(0,f.jsx)("strong",{children:(0,l.vv)(Vn.total,Vn.currency||"USD")})})]})]})]}),(Vn.paymentMethod||Vn.receiptUrl||Vn.transactionId)&&(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Customer's Payment Information"}),(0,f.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,f.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[Vn.paymentMethod&&(0,f.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,f.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===Vn.paymentMethod?"Bank Transfer":"qr_payment"===Vn.paymentMethod?"QR Payment":"stripe"===Vn.paymentMethod?"Stripe":"paypal"===Vn.paymentMethod?"PayPal":Vn.paymentMethod]}),Vn.transactionId&&(0,f.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,f.jsx)("strong",{children:"Transaction ID:"})," ",Vn.transactionId]})]}),Vn.receiptUrl&&(0,f.jsxs)("div",{style:{marginTop:"12px"},children:[(0,f.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,f.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,f.jsx)("img",{src:Vn.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(Vn.receiptUrl,"_blank")}),(0,f.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,f.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,f.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,f.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,f.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Status Change"}),(0,f.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,f.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(C,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,f.jsx)(C,{variant:"primary",onClick:async()=>{if(Vn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Vn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await St(),Be(!1),qn(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),Ce&&Vn&&Jn&&(0,f.jsx)(J,{onClick:()=>Fe(!1),children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(Q,{children:[(0,f.jsxs)(K,{children:["Edit Invoice - ",Vn.invoiceNumber]}),(0,f.jsx)(Z,{onClick:()=>Fe(!1),children:"\xd7"})]}),(0,f.jsxs)(X,{children:[(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Search Restaurant *"}),(0,f.jsxs)("div",{style:{position:"relative"},children:[(0,f.jsx)(re,{type:"text",value:Zn,onChange:e=>(e=>{if(Xn(e),it(!0),e.length<2)return void nt({managers:[],restaurants:[]});const n=lt.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));nt({managers:[],restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>it(!0),onBlur:()=>setTimeout(()=>it(!1),200),placeholder:"Type to search for restaurants",required:!0}),tt&&(et.managers.length>0||et.restaurants.length>0)&&(0,f.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[et.managers.length>0&&(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),et.managers.map(e=>(0,f.jsxs)("div",{onClick:()=>Pt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,f.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),et.restaurants.length>0&&(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),et.restaurants.map(e=>{const n=at.find(n=>n.id===e.admin_id);return(0,f.jsxs)("div",{onClick:()=>Pt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,f.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),rt&&(0,f.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===rt.type?rt.data.fullName:rt.data.name}),(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===rt.type?`${rt.data.companyName} \u2022 Manager`:`${rt.data.address||"No address"} \u2022 Restaurant`})]}),(0,f.jsx)("button",{onClick:()=>{ot(null),Xn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,f.jsxs)(ne,{children:[(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Amount (RM)"}),(0,f.jsx)(re,{type:"number",value:Jn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=n*(Tt(Jn.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+n.rate,0)/100),i=n+t;Gn({...Jn,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Due Date"}),(0,f.jsx)(re,{type:"date",value:Jn.dueDate,onChange:e=>Gn({...Jn,dueDate:e.target.value})})]})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Status"}),(0,f.jsxs)(ae,{value:Jn.status,onChange:e=>Gn({...Jn,status:e.target.value}),children:[(0,f.jsx)("option",{value:"draft",children:"Draft"}),(0,f.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,f.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,f.jsx)("option",{value:"paid",children:"Paid"}),(0,f.jsx)("option",{value:"overdue",children:"Overdue"}),(0,f.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Invoice Category"}),(0,f.jsx)(ae,{value:Jn.invoiceCategory||"service",onChange:e=>Gn({...Jn,invoiceCategory:e.target.value}),children:ft.length>0?ft.filter(e=>"subscription"!==e.code).map(e=>(0,f.jsx)("option",{value:e.code,children:e.name},e.id)):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("option",{value:"service",children:"Service"}),(0,f.jsx)("option",{value:"consulting",children:"Consulting"}),(0,f.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===Jn.invoiceCategory&&(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Plan/Item"}),(0,f.jsx)(oe,{value:Jn.customDescription||"",onChange:e=>Gn({...Jn,customDescription:e.target.value}),rows:3})]}),("service"===(Jn.invoiceCategory||"service")||"consulting"===Jn.invoiceCategory)&&(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Plan/Item"}),(0,f.jsx)(oe,{value:Jn.serviceDescription||"",onChange:e=>Gn({...Jn,serviceDescription:e.target.value}),rows:3})]}),(0,f.jsxs)(se,{children:[(0,f.jsxs)(le,{children:[(0,f.jsx)("span",{children:"Subtotal:"}),(0,f.jsx)("span",{children:(0,l.vv)(parseFloat(Jn.amount||"0"),Jn.currency||"MYR")})]}),Tt(Jn.currency||"").filter(e=>e.enabled&&e.rate>0).map((e,n)=>{const t=parseFloat(Jn.amount||"0")*(e.rate/100);return(0,f.jsxs)(le,{children:[(0,f.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,f.jsx)("span",{children:(0,l.vv)(t,Jn.currency||"MYR")})]},n)}),(0,f.jsxs)(le,{highlight:!0,children:[(0,f.jsx)("span",{children:"Total:"}),(0,f.jsx)("span",{children:(0,f.jsx)("strong",{children:(0,l.vv)(parseFloat(Jn.total||"0"),Jn.currency||"MYR")})})]})]}),(0,f.jsxs)(te,{style:{marginTop:"16px"},children:[(0,f.jsxs)(ie,{children:["Modification Reason ","automatic"===(null===Vn||void 0===Vn?void 0:Vn.type)&&(0,f.jsx)("span",{style:{color:"#EF4444"},children:"*"})]}),(0,f.jsx)(oe,{value:Qn,onChange:e=>Kn(e.target.value),placeholder:"Enter reason for modification...",rows:2})]}),(null===Vn||void 0===Vn?void 0:Vn.modificationHistory)&&Vn.modificationHistory.length>0&&(0,f.jsxs)("div",{style:{marginTop:"16px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#92400E",marginBottom:"8px"},children:"Modification History"}),Vn.modificationHistory.map((e,n)=>(0,f.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:n<Vn.modificationHistory.length-1?"8px":"0",paddingBottom:n<Vn.modificationHistory.length-1?"8px":"0",borderBottom:n<Vn.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,f.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,f.jsxs)("div",{style:{marginTop:"2px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,f.jsx)("div",{style:{marginTop:"2px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[n,t]=e;return(0,f.jsxs)("span",{style:{marginRight:"8px"},children:[n,": ",String(t.from)," \u2192 ",String(t.to)]},n)})})]},n))]})]}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(C,{variant:"secondary",onClick:()=>Fe(!1),children:"Cancel"}),(0,f.jsx)(C,{variant:"primary",onClick:async()=>{if(Vn&&Jn){if("automatic"===Vn.type&&!Qn.trim())return Oe("Please enter a reason for modifying this invoice."),void He(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Vn.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(Jn.amount),tax:parseFloat(Jn.tax),total:parseFloat(Jn.total),dueDate:Jn.dueDate,status:Jn.status,payerType:Jn.payerType,payerId:Jn.payerId,items:Jn.items,modificationReason:Qn.trim()||void 0})});if(n.ok)await St(),Fe(!1),qn(null),Gn(null),Oe("Invoice updated successfully!"),He(!0);else{const e=await n.json();Oe(`Failed to update invoice: ${e.error||"Unknown error"}`),He(!0)}}catch(e){console.error("Error updating invoice:",e),Oe("Error updating invoice. Please try again."),He(!0)}}},children:"Save Changes"})]})]})}),Ae&&Vn&&(0,f.jsx)(J,{onClick:()=>De(!1),children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)(K,{children:"Send Invoice"}),(0,f.jsx)(Z,{onClick:()=>De(!1),children:"\xd7"})]}),(0,f.jsx)(X,{children:(0,f.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,f.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,f.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,f.jsx)("strong",{children:Vn.invoiceNumber})," to ",(0,f.jsx)("strong",{children:Vn.restaurantName||Vn.customerName}),"?"]}),(0,f.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,f.jsx)("span",{style:{fontWeight:"500"},children:Vn.invoiceNumber})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,f.jsx)("span",{style:{fontWeight:"500"},children:Vn.managerName||Vn.restaurantName||Vn.customerName})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,f.jsx)("span",{style:{fontWeight:"500"},children:Vn.customerName||Vn.restaurantName})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,f.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,l.vv)(Vn.total,Vn.currency||"USD")})]})]})]})}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(C,{variant:"secondary",onClick:()=>De(!1),children:"Cancel"}),(0,f.jsx)(C,{variant:"success",onClick:async()=>{if(Vn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Vn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await St(),De(!1),qn(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Confirm"})]})]})}),Ee&&Vn&&(0,f.jsx)(J,{onClick:()=>Ie(!1),children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)(K,{children:"Resend Invoice"}),(0,f.jsx)(Z,{onClick:()=>Ie(!1),children:"\xd7"})]}),(0,f.jsx)(X,{children:(0,f.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,f.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,f.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,f.jsx)("strong",{children:Vn.invoiceNumber})," to ",(0,f.jsx)("strong",{children:Vn.restaurantName||Vn.customerName}),"?"]}),(0,f.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"This will send another copy of the invoice to the restaurant's email."})]})}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(C,{variant:"secondary",onClick:()=>Ie(!1),children:"Cancel"}),(0,f.jsx)(C,{variant:"primary",onClick:()=>{Vn&&(Ie(!1),qn(null))},children:"Resend Invoice"})]})]})}),Ne&&Vn&&(0,f.jsx)(J,{onClick:()=>Te(!1),children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)(K,{children:"Cancel Invoice"}),(0,f.jsx)(Z,{onClick:()=>Te(!1),children:"\xd7"})]}),(0,f.jsx)(X,{children:(0,f.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,f.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,f.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,f.jsx)("strong",{children:Vn.invoiceNumber}),"?"]}),(0,f.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,f.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,f.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,f.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,f.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,f.jsx)("span",{style:{fontWeight:"500"},children:Vn.invoiceNumber})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,f.jsx)("span",{style:{fontWeight:"500"},children:Vn.managerName})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,f.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,l.vv)(Vn.total,Vn.currency||"USD")})]})]})]})}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(C,{variant:"secondary",onClick:()=>Te(!1),children:"Keep Invoice"}),(0,f.jsx)(C,{variant:"primary",onClick:async()=>{if(Vn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Vn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await St(),Te(!1),qn(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),ze&&Vn&&(0,f.jsx)(J,{onClick:()=>$e(!1),children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)(K,{children:"Delete Invoice"}),(0,f.jsx)(Z,{onClick:()=>$e(!1),children:"\xd7"})]}),(0,f.jsx)(X,{children:(0,f.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,f.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,f.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,f.jsxs)("strong",{children:["#",Vn.invoiceNumber]}),"?",(0,f.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(C,{variant:"secondary",onClick:()=>$e(!1),children:"Keep Invoice"}),(0,f.jsx)(C,{variant:"primary",onClick:async()=>{if(Vn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Vn.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await St(),$e(!1),qn(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),Me&&Le&&(0,f.jsx)(J,{onClick:()=>_e(!1),children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)(K,{children:"Send Invoice via Email"}),(0,f.jsx)(Z,{onClick:()=>_e(!1),children:"\xd7"})]}),(0,f.jsxs)(X,{children:[(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Invoice"}),(0,f.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,f.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Le.invoiceNumber}),(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:Le.customerName}),(0,f.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,l.vv)(Le.total,Le.currency||"MYR")})]})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)(ie,{children:"Recipient Email *"}),(0,f.jsx)(re,{type:"email",value:Pe,onChange:e=>Re(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,f.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:Pe?(0,f.jsxs)(f.Fragment,{children:["Default email for ","restaurant"===Le.payerType?"Restaurant":"foodcourt_manager"===Le.payerType?"Foodcourt Manager":"brand_manager"===Le.payerType?"Brand Manager":"Customer"]}):(0,f.jsxs)(f.Fragment,{children:["Enter the ","restaurant"===Le.payerType?"restaurant":"foodcourt_manager"===Le.payerType?"foodcourt manager":"brand_manager"===Le.payerType?"brand manager":"customer"," email address"]})})]}),(0,f.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,f.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(C,{variant:"secondary",onClick:()=>{_e(!1),We(null),Re("")},children:"Cancel"}),(0,f.jsx)(C,{variant:"primary",onClick:async()=>{if(!Le||!Pe)return Oe("Please enter a valid email address."),void He(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Le.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:Pe})});if(n.ok)Oe(`Invoice sent successfully to ${Pe}`),_e(!1),We(null),Re("");else{const e=await n.json();Oe(e.error||"Failed to send invoice email.")}He(!0)}catch(e){console.error("Error sending invoice email:",e),Oe("Failed to send invoice email. Please try again."),He(!0)}},disabled:!Pe||!Pe.includes("@"),children:"Send Email"})]})]})}),Ue&&(0,f.jsx)(J,{onClick:()=>He(!1),children:(0,f.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)(K,{children:"Success"}),(0,f.jsx)(Z,{onClick:()=>He(!1),children:"\xd7"})]}),(0,f.jsx)(X,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,f.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Ye})})}),(0,f.jsx)(ee,{children:(0,f.jsx)(C,{variant:"primary",onClick:()=>He(!1),children:"OK"})})]})})]})]})})}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var i=t(4752),r=t(9610),o=t(4414);const a=i.Ay.div`
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
`,x=e=>{let{isOpen:n,title:t,message:i,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return n?(0,o.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,o.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(s,{children:[(0,o.jsx)(l,{children:t}),(0,o.jsx)(d,{children:i})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,o.jsx)(p,{variant:"primary",type:m,onClick:x,children:u})]})]})}):null}},8654:(e,n,t)=>{t.d(n,{A:()=>B});var i=t(9950),r=t(4752),o=t(4414);const a=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[n,t,i]=e.split("-").map(Number);return new Date(n,t-1,i)},d=(e,n)=>e.getFullYear()===n.getFullYear()&&e.getMonth()===n.getMonth()&&e.getDate()===n.getDate(),c=(e,n)=>new Date(e,n).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=r.Ay.div`
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
`,x=r.Ay.div`
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
`,y=r.Ay.button`
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
`,v=r.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,j=r.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,f=r.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,b=r.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,w=r.Ay.div`
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
`,C=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,F=r.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,S=r.Ay.div`
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
`,B=e=>{let{startDate:n,endDate:t,onRangeSelect:r,onClose:B,isOpen:A}=e;const D=new Date,[E,I]=(0,i.useState)(D.getMonth()),[N,T]=(0,i.useState)(D.getFullYear()),[z,$]=(0,i.useState)(null),[M,_]=(0,i.useState)(null),[P,R]=(0,i.useState)(null),[L,W]=(0,i.useState)("start"),U=(0,i.useRef)(null);(0,i.useEffect)(()=>{n&&$(l(n)),t&&_(l(t))},[n,t]),(0,i.useEffect)(()=>{A&&W("start")},[A]),(0,i.useEffect)(()=>{const e=e=>{U.current&&!U.current.contains(e.target)&&B()};return A&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[A,B]);const H=(0,i.useCallback)(()=>{0===E?(I(11),T(e=>e-1)):I(e=>e-1)},[E]),Y=(0,i.useCallback)(()=>{11===E?(I(0),T(e=>e+1)):I(e=>e+1)},[E]),O=(e,n)=>{const t=((e,n)=>new Date(e,n+1,0).getDate())(e,n),i=((e,n)=>new Date(e,n,1).getDay())(e,n),l=[];for(let r=0;r<i;r++)l.push(null);for(let r=1;r<=t;r++)l.push(new Date(e,n,r));return(0,o.jsxs)(f,{children:[(0,o.jsx)(b,{children:c(e,n)}),(0,o.jsx)(w,{children:a.map(e=>(0,o.jsx)(k,{children:e},e))}),(0,o.jsx)(C,{children:l.map((e,n)=>{if(!e)return(0,o.jsx)(F,{},`e-${n}`);const{isStart:t,isEnd:i,isInRange:a,isHoverEnd:l}=(e=>{const n=z&&d(e,z),t=M&&d(e,M),i="end"===L&&P?P:M;let r=!1;if(z&&i){const[n,t]=z<=i?[z,i]:[i,z];r=((e,n,t)=>{const i=e.getTime();return i>n.getTime()&&i<t.getTime()})(e,n,t)}return{isStart:n,isEnd:t,isInRange:r,isHoverEnd:"end"===L&&P&&d(e,P)}})(e),c=d(e,D);return(0,o.jsx)(S,{$isStart:!!t,$isEnd:!!i,$isInRange:a,$isHoverEnd:!!l,$isToday:c,onClick:()=>(e=>{if("start"===L)$(e),_(null),W("end");else{let n=z,t=e;t<n&&([n,t]=[t,n]),$(n),_(t),W("start"),r(s(n),s(t)),setTimeout(B,200)}})(e),onMouseEnter:()=>R(e),onMouseLeave:()=>R(null),children:e.getDate()},e.getTime())})})]})},V=11===E?0:E+1,q=11===E?N+1:N,J=e=>{const n=new Date;let t;const i=n;switch(e){case"this_week":t=new Date(n),t.setDate(n.getDate()-n.getDay());break;case"this_month":t=new Date(n.getFullYear(),n.getMonth(),1);break;case"this_year":t=new Date(n.getFullYear(),0,1);break;default:return}$(t),_(i),W("start"),r(s(t),s(i)),setTimeout(B,150)};return A?(0,o.jsx)(p,{ref:U,children:(0,o.jsxs)(x,{children:[(0,o.jsxs)(h,{children:[(0,o.jsx)(u,{onClick:()=>J("this_week"),children:"This Week"}),(0,o.jsx)(u,{onClick:()=>J("this_month"),children:"This Month"}),(0,o.jsx)(u,{onClick:()=>J("this_year"),children:"This Year"})]}),(0,o.jsxs)(g,{children:[(0,o.jsxs)(m,{children:[(0,o.jsx)(y,{onClick:H,"aria-label":"Previous month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,o.jsx)(y,{onClick:Y,"aria-label":"Next month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,o.jsxs)(v,{children:[O(N,E),(0,o.jsx)(j,{children:O(q,V)})]})]})]})}):null}}}]);