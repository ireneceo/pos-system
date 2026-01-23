"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7283],{2488:(e,t,n)=>{n.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});n(9950);var i=n(4752),r=n(4414);const a=i.Ay.div`
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
`,s=i.Ay.select`
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
`,l=e=>{let{children:t,className:n,style:i,...o}=e;return(0,r.jsx)(a,{className:n,style:i,...o,children:t})},d=e=>{let{placeholder:t="Search...",...n}=e;return(0,r.jsx)(o,{placeholder:t,...n})},c=e=>{let{children:t,...n}=e;return(0,r.jsx)(s,{...n,children:t})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});n(9950);var i=n(4752),r=n(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:t,className:n,style:i}=e;return(0,r.jsx)(a,{className:n,style:i,children:t})},d=e=>{let{active:t,onClick:n,children:i,className:a}=e;return(0,r.jsx)(o,{active:t,onClick:n,className:a,children:i})},c=e=>{let{count:t,variant:n="default",showZero:i=!1}=e;return 0!==t||i?(0,r.jsx)(s,{variant:n,children:t}):null}},7283:(e,t,n)=>{n.r(t),n.d(t,{default:()=>re});var i=n(9950),r=n(4752),a=n(4492),o=n(3310),s=n(6038),l=n(9018),d=n(4728),c=n(7617),p=n(2674),x=n(2488),h=n(2597),u=n(5612),g=n(1052),m=n.n(g),y=n(4414);r.Ay.div`
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
`,r.Ay.div`
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
`,r.Ay.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`;const v=(0,r.Ay)(d.SC)``,j=r.Ay.div``,f=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,b=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,w=r.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,C=(0,r.Ay)(d.Wh)`
  white-space: normal;
  line-height: 1.3;
`,k=(r.Ay.div`
  font-weight: ${e=>e.highlight?"700":"500"};
  color: #374151;
`,r.Ay.button`
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n    border-color: #10B981;\n\n    &:hover {\n      background: #059669;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"email"===e.variant?"\n    background: #F3F4F6;\n    color: #6B7280;\n    border-color: #E5E7EB;\n    padding: 5px;\n\n    &:hover {\n      background: #E5E7EB;\n      color: #374151;\n    }\n  ":"cancel"===e.variant?"\n    background: #F6F9FC;\n    color: #6B7C93;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #E6EBF1;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      border-color: #635BFF;\n      color: #635BFF;\n      background: #F4F3FF;\n    }\n  "}
`),F=r.Ay.button`
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
`,B=r.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,S=r.Ay.div`
  display: grid;
  gap: 12px;
`,A=r.Ay.div`
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
`,N=r.Ay.div`
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
`,E=r.Ay.div`
  flex: 1;
`,D=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,I=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,z=r.Ay.div`
  display: flex;
  gap: 8px;
`,T=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,$=r.Ay.button`
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
`,P=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,_=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,L=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,M=r.Ay.div`
  margin-bottom: 24px;
`,W=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`,R=r.Ay.button`
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
`,U=r.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,O=r.Ay.div`
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
`,H=r.Ay.div`
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
`,Y=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,V=r.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,q=r.Ay.button`
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
`,G=r.Ay.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
`,J=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,Q=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,K=r.Ay.div`
  margin-bottom: 20px;
`,Z=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,X=r.Ay.input`
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
`,ee=r.Ay.textarea`
  width: 100%;
  max-width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,te=r.Ay.select`
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
`,ne=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,ie=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,re=(r.Ay.div``,r.Ay.div`
  background: white;
  border-radius: 10px;
  border: 1px solid #E6EBF1;
  padding: 14px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }
`,r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`,r.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
`,r.Ay.span`
  font-size: 13px;
  color: #0A2540;
`,r.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #F3F4F6;
`,()=>{const{operationSettings:e}=(0,l.Pj)(),[t,n]=(0,a.ok)(),[r,d]=(0,i.useState)([]),[g,re]=(0,i.useState)(""),[ae,oe]=(0,i.useState)("month"),[se,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(()=>{const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),n=new Date(e.getFullYear(),e.getMonth()+1,0),i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:i(t),end:i(n)}}),[pe,xe]=(0,i.useState)(!1),[he,ue]=(0,i.useState)(!1),[ge,me]=(0,i.useState)(!1),[ye,ve]=(0,i.useState)(!1),[je,fe]=(0,i.useState)(!1),[be,we]=(0,i.useState)(!1),[Ce,ke]=(0,i.useState)(!1),[Fe,Be]=(0,i.useState)(!1),[Se,Ae]=(0,i.useState)(!1),[Ne,Ee]=(0,i.useState)(""),[De,Ie]=(0,i.useState)(null),[ze,Te]=(0,i.useState)(!1),[$e,Pe]=(0,i.useState)(""),_e=t.get("tab")||"invoices",Le=e=>{n({tab:e})},[Me,We]=(0,i.useState)(!1),[Re,Ue]=(0,i.useState)(null),[Oe,He]=(0,i.useState)({name:"",code:"",description:""}),[Ye,Ve]=(0,i.useState)(!1),[qe,Ge]=(0,i.useState)(!1),[Je,Qe]=(0,i.useState)(null),[Ke,Ze]=(0,i.useState)(null),[Xe,et]=(0,i.useState)(null),[tt,nt]=(0,i.useState)(""),[it,rt]=(0,i.useState)({managers:[],restaurants:[]}),[at,ot]=(0,i.useState)(!1),[st,lt]=(0,i.useState)(null),[dt,ct]=(0,i.useState)([]),[pt,xt]=(0,i.useState)([]),[ht,ut]=(0,i.useState)({managers:[],restaurants:[]}),[gt,mt]=(0,i.useState)(""),[yt,vt]=(0,i.useState)(!1),[jt,ft]=(0,i.useState)(null),[bt,wt]=(0,i.useState)(null),[Ct,kt]=(0,i.useState)({}),[Ft,Bt]=(0,i.useState)([]),[St,At]=(0,i.useState)([]),[Nt,Et]=(0,i.useState)({enabled:!1,rate:0,name:"Tax"}),[Dt,It]=(0,i.useState)("dueDate"),[zt,Tt]=(0,i.useState)("desc"),[$t,Pt]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:""}),_t=e=>{oe(e),le(!1);const t=new Date;let n=new Date,i=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":break;case"week":n.setDate(t.getDate()-t.getDay());break;case"month":n=new Date(t.getFullYear(),t.getMonth(),1),i=new Date(t.getFullYear(),t.getMonth()+1,0);break;case"year":n=new Date(t.getFullYear(),0,1),i=new Date(t.getFullYear(),11,31);break;case"all":n=new Date(2e3,0,1)}ce({start:r(n),end:r(i)})},Lt=(e,t)=>{le(!0),ce(n=>({...n,[e]:t}))},Mt=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void d([]);const t=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",t.status),t.ok){const e=await t.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),d(e)}else{const e=await t.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",t.status,e),d([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),d([])}},Wt=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(t.ok){const e=await t.json();e.success&&e.data&&At(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Rt=e=>{e?(Ue(e),He({name:e.name,code:e.code,description:e.description||""})):(Ue(null),He({name:"",code:"",description:""})),We(!0)},Ut=()=>{We(!1),Ue(null),He({name:"",code:"",description:""})};(0,i.useEffect)(()=>{Mt(),Ht(),Yt(),Gt(),Ot(),Wt(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/admin/payment-settings",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.tax&&Et({enabled:e.tax.enabled||!1,rate:parseFloat(e.tax.rate)||0,name:e.tax.name||"Tax"})}}catch(e){console.error("Error fetching payment settings:",e)}})()},[]);const Ot=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const t=await e.json();t.success&&t.currencies&&kt(t.currencies)}const t=await fetch("/api/currencies/supported");if(t.ok){const e=await t.json();if(e.success&&e.data){const t=e.data.map(e=>e.code);Bt(t)}}}catch(e){console.error("Error fetching currency config:",e)}},Ht=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[t,n]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...n]}if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...t]}console.log("Fetched managers (General only):",i.length),ct(i)}catch(e){console.error("Error fetching managers:",e),ct([])}},Yt=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();console.log("Fetched restaurants:",e);const n=e.map(e=>{var t,n;return{id:e.id.toString(),name:e.name,manager_id:(null===(t=e.manager_id)||void 0===t?void 0:t.toString())||(null===(n=e.managerId)||void 0===n?void 0:n.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"USD"}});xt(n),console.log("Transformed restaurants:",n)}else console.error("Failed to fetch restaurants"),xt([])}catch(e){console.error("Error fetching restaurants:",e),xt([])}},Vt=(e,t)=>{if(lt({type:e,data:t}),nt("manager"===e?t.fullName:t.name),ot(!1),"manager"===e){const e=t;et({...Xe,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=t,n=dt.find(t=>t.id===e.manager_id);et({...Xe,managerId:(null===n||void 0===n?void 0:n.id)||"",managerName:(null===n||void 0===n?void 0:n.fullName)||"",companyName:(null===n||void 0===n?void 0:n.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},qt=async(e,t)=>{ft({type:e,data:t}),vt(!1),mt("manager"===e?t.fullName:t.name);const n=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=t;try{const t=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const e=await t.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){var r;const t=await e.json(),n=t.data||t,a=null===(r=n.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=n.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",a,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){var a;const t=await e.json(),n=t.data||t,r=null===(a=n.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=n.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",r,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}Pt({...$t,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i})}else{const e=t,r=dt.find(t=>t.id===e.manager_id);try{const t=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){i=(await t.json()).currency||"USD"}}catch(o){console.error("Error fetching restaurant currency:",o)}Pt({...$t,restaurantId:e.id,restaurantName:e.name,managerId:e.manager_id,managerName:r?r.fullName:"",companyName:e.name,currency:i})}},Gt=async()=>{try{const t=await fetch("/api/admin/settings");if(t.ok){const e=await t.json();wt(e)}else{const t=localStorage.getItem("adminSettings");let n="";if(t)try{const e=JSON.parse(t);n=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),wt({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:n})}}catch(t){console.error("Error fetching company settings:",t);const n=localStorage.getItem("adminSettings");let i="";if(n)try{const e=JSON.parse(n);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),wt({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},Jt=e=>{if(!bt)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${bt.companyLogo?`<img src="${bt.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${bt.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${bt.address?`${bt.address}<br>`:""}\n                    ${[bt.city,bt.state,bt.postalCode].filter(Boolean).join(", ")}${bt.city||bt.state||bt.postalCode?"<br>":""}\n                    ${bt.country?`${bt.country}<br>`:""}\n                    ${bt.phone?`Tel: ${bt.phone}<br>`:""}\n                    ${bt.email?`Email: ${bt.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${cn(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${cn(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${cn(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(t=>`\n                    <tr>\n                        <td>${t.description}</td>\n                        <td class="text-center">${t.quantity}</td>\n                        <td class="text-right">${(0,s.vv)(t.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,s.vv)(t.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,s.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row tax">\n                    <span>Tax (6%):</span>\n                    <span>${(0,s.vv)(e.tax,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,s.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${bt.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${bt.bankName}<br>\n                <strong>Account Name:</strong> ${bt.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${bt.bankAccount||"-"}\n                ${bt.swiftCode?`<br><strong>SWIFT Code:</strong> ${bt.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${bt.taxNumber||bt.registrationNumber?`\n        <div class="registration-info">\n            ${bt.registrationNumber?`Reg No: ${bt.registrationNumber}`:""}\n            ${bt.registrationNumber&&bt.taxNumber?" | ":""}\n            ${bt.taxNumber?`Tax No: ${bt.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},Qt=async e=>{if(!bt)return Pe("Company settings not loaded. Please try again."),void Te(!0);try{var t;const n=Jt(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(t=i.contentWindow)||void 0===t?void 0:t.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(n),r.close(),await new Promise(e=>setTimeout(e,150));const a=await m()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new u.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(n){console.error("Error generating PDF:",n),Pe("Failed to generate PDF. Please try again."),Te(!0)}},Kt=e=>{if(!bt)return Pe("Company settings not loaded. Please try again."),void Te(!0);const t=Jt(e),n=window.open("","_blank","width=800,height=600");n&&(n.document.write(t),n.document.close(),setTimeout(()=>{n.print()},250))},Zt=async e=>{Ie(e);let t="";if("restaurant"===e.payerType&&e.restaurantId){const n=pt.find(t=>t.id===e.restaurantId);null!==n&&void 0!==n&&n.email&&(t=n.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const n=dt.find(t=>t.id===e.managerId);null!==n&&void 0!==n&&n.email&&(t=n.email)}if(!t&&e.managerId){const n=dt.find(t=>t.id===e.managerId);null!==n&&void 0!==n&&n.email&&(t=n.email)}Ee(t),Ae(!0)},Xt=()=>{Pt({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:""}),ft(null),mt(""),vt(!1)},en=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},tn=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},nn=r.filter(e=>{const t=g.toLowerCase(),n=en(e.status).toLowerCase(),i="automatic"===e.type?"auto automatic":"manual",r=(e.planType||"").toLowerCase(),a=(e.categoryDisplayName||"").toLowerCase(),o=(e.customerName||e.restaurantName||"").toLowerCase(),s=tn(e.payerType||"restaurant").toLowerCase(),l=!g||e.companyName.toLowerCase().includes(t)||e.invoiceNumber.toLowerCase().includes(t)||e.managerName.toLowerCase().includes(t)||n.includes(t)||i.includes(t)||r.includes(t)||a.includes(t)||o.includes(t)||s.includes(t)||(e.billingPeriod||"").toLowerCase().includes(t);let d=!0;if(de.start&&de.end){const t=new Date(e.issueDate),n=new Date(de.start),i=new Date(de.end);n.setHours(0,0,0,0),i.setHours(23,59,59,999),d=t>=n&&t<=i}return l&&d}).sort((e,t)=>{let n=0;switch(Dt){case"invoiceNumber":n=e.invoiceNumber.localeCompare(t.invoiceNumber);break;case"companyName":n=e.companyName.localeCompare(t.companyName);break;case"dueDate":default:n=new Date(e.dueDate).getTime()-new Date(t.dueDate).getTime();break;case"amount":n=e.total-t.total;break;case"status":n=(e.status||"").localeCompare(t.status||"")}return"desc"===zt?-n:n}),rn=e=>{Dt===e?Tt("asc"===zt?"desc":"asc"):(It(e),Tt("dueDate"===e||"amount"===e?"desc":"asc"))},an=e=>Dt!==e?"":"asc"===zt?" \u25b2":" \u25bc",on=r.length,sn=r.filter(e=>"paid"===e.status).length,ln=r.filter(e=>"overdue"===e.status).length,dn=r.filter(e=>"paid"===e.status).reduce((e,t)=>e+t.total,0),cn=e=>new Date(e).toLocaleDateString("en-MY"),pn=e=>{Ze(e),ue(!0)},xn=e=>{var t,n;if(Ze(e),et({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(t=e.items)||void 0===t||null===(n=t[0])||void 0===n?void 0:n.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const t=pt.find(t=>t.id===e.restaurantId);t&&(lt({type:"restaurant",data:t}),nt(t.name))}else if(e.managerId){const t=dt.find(t=>t.id===e.managerId);t&&(lt({type:"manager",data:t}),nt(t.fullName))}me(!0)},hn=e=>{Ze(e),Be(!0)};return(0,y.jsx)(o.A,{children:(0,y.jsxs)(p.mc,{children:[(0,y.jsxs)(p.Y9,{children:[(0,y.jsx)(p.hE,{children:"Invoices"}),(0,y.jsx)(p.ex,{})]}),(0,y.jsxs)(p.UC,{children:[(0,y.jsxs)(p.MD,{children:[(0,y.jsxs)(p.hI,{color:"#059669",children:[(0,y.jsx)(p.Os,{children:on}),(0,y.jsx)(p.v0,{children:"Total Invoices"}),(0,y.jsx)(p.d1,{children:"All invoice records"})]}),(0,y.jsxs)(p.hI,{color:"#2563EB",children:[(0,y.jsx)(p.Os,{children:sn}),(0,y.jsx)(p.v0,{children:"Paid Invoices"}),(0,y.jsxs)(p.d1,{children:[on>0?Math.round(sn/on*100):0,"% completed"]})]}),(0,y.jsxs)(p.hI,{color:"#DC2626",children:[(0,y.jsx)(p.Os,{children:ln}),(0,y.jsx)(p.v0,{children:"Overdue Invoices"}),(0,y.jsx)(p.d1,{children:"Requires attention"})]}),(0,y.jsxs)(p.hI,{color:"#7C3AED",children:[(0,y.jsx)(p.Os,{children:(0,s.vv)(dn)}),(0,y.jsx)(p.v0,{children:"Total Revenue"}),(0,y.jsx)(p.d1,{children:"From paid invoices"})]})]}),(0,y.jsxs)(h.tU,{children:[(0,y.jsx)(h.oz,{active:"invoices"===_e,onClick:()=>Le("invoices"),children:"Invoices"}),(0,y.jsxs)(h.oz,{active:"payment_submitted"===_e,onClick:()=>Le("payment_submitted"),children:["Payment Submitted",(0,y.jsx)(h.Ex,{count:r.filter(e=>"payment_submitted"===e.status).length,variant:"danger"})]}),(0,y.jsx)(h.oz,{active:"categories"===_e,onClick:()=>Le("categories"),children:"Invoice Categories"})]}),"invoices"===_e&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(M,{children:(0,y.jsxs)(W,{children:[(0,y.jsx)(x.DO,{placeholder:"Search invoices... (status, type, customer, etc.)",value:g,onChange:e=>re(e.target.value),style:{minWidth:"280px",maxWidth:"350px"}}),(0,y.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginLeft:"16px"},children:[(0,y.jsx)(R,{active:"week"===ae&&!se,onClick:()=>_t("week"),children:"Week"}),(0,y.jsx)(R,{active:"month"===ae&&!se,onClick:()=>_t("month"),children:"Month"}),(0,y.jsx)(R,{active:"year"===ae&&!se,onClick:()=>_t("year"),children:"Year"}),(0,y.jsx)(R,{active:"all"===ae&&!se,onClick:()=>_t("all"),children:"All"}),(0,y.jsx)(U,{type:"date",value:de.start,onChange:e=>Lt("start",e.target.value)}),(0,y.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,y.jsx)(U,{type:"date",value:de.end,onChange:e=>Lt("end",e.target.value)})]}),(0,y.jsx)("div",{style:{marginLeft:"auto"},children:(0,y.jsx)(v,{variant:"primary",onClick:()=>{Xt(),xe(!0)},children:"Create Invoice"})})]})}),(0,y.jsxs)(p.an,{children:[(0,y.jsxs)(p.bQ,{children:[(0,y.jsx)(p.B_,{children:(0,y.jsxs)("tr",{children:[(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>rn("invoiceNumber"),children:["Invoice",an("invoiceNumber")]}),(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>rn("companyName"),children:["Customer",an("companyName")]}),(0,y.jsx)(p.gU,{align:"center",children:"Period"}),(0,y.jsx)(p.gU,{align:"center",children:"Issued"}),(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>rn("dueDate"),children:["Due",an("dueDate")]}),(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>rn("status"),children:["Status",an("status")]}),(0,y.jsxs)(p.gU,{align:"right",style:{cursor:"pointer"},onClick:()=>rn("amount"),children:["Amount",an("amount")]}),(0,y.jsx)(p.gU,{align:"right",children:"Total"}),(0,y.jsx)(p.gU,{isActions:!0,children:"Actions"})]})}),(0,y.jsx)("tbody",{children:nn.map(e=>(0,y.jsxs)(p.J2,{children:[(0,y.jsx)(p.Bv,{"data-label":"Invoice",children:(0,y.jsxs)(j,{children:[(0,y.jsxs)(f,{children:[e.invoiceNumber,"automatic"===e.type&&(0,y.jsx)(w,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,y.jsx)(b,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,y.jsx)(p.Bv,{"data-label":"Customer",children:(0,y.jsxs)(j,{children:[(0,y.jsx)(f,{children:e.customerName||e.restaurantName||"Unknown"}),(0,y.jsx)(b,{children:tn(e.payerType||"restaurant")})]})}),(0,y.jsx)(p.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,y.jsx)(p.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:cn(e.issueDate)}),(0,y.jsx)(p.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:cn(e.dueDate)}),(0,y.jsx)(p.Bv,{"data-label":"Status",align:"center",children:(0,y.jsx)(C,{status:e.status,children:en(e.status)})}),(0,y.jsx)(p.Bv,{"data-label":"Amount",align:"right",children:(0,y.jsx)(p.DM,{children:(0,s.vv)(e.amount,e.currency||"USD")})}),(0,y.jsx)(p.Bv,{"data-label":"Total",align:"right",children:(0,y.jsx)(p.DM,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"USD")})}),(0,y.jsx)(p.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,y.jsxs)(p.wr,{children:[(0,y.jsx)(k,{variant:"primary",onClick:()=>pn(e),children:"View"}),"draft"===e.status&&(0,y.jsxs)(y.Fragment,{children:["automatic"!==e.type&&(0,y.jsx)(k,{onClick:()=>xn(e),children:"Edit"}),(0,y.jsx)(k,{variant:"success",onClick:()=>(e=>{Ze(e),fe(!0)})(e),title:"Send Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,y.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,y.jsx)(F,{onClick:()=>hn(e),title:"Delete Invoice",children:(0,y.jsx)(B,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,y.jsxs)(y.Fragment,{children:["automatic"!==e.type&&(0,y.jsx)(k,{onClick:()=>xn(e),children:"Edit"}),(0,y.jsx)(k,{onClick:()=>Qt(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>Kt(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,y.jsx)(k,{variant:"email",onClick:()=>Zt(e),title:"Send Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,y.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,y.jsx)(F,{onClick:()=>hn(e),title:"Delete Invoice",children:(0,y.jsx)(B,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,y.jsxs)(y.Fragment,{children:[e.hasPaymentInfo&&(0,y.jsx)(k,{variant:"primary",onClick:()=>(e=>{Ze(e),ve(!0)})(e),children:"Confirm"}),(0,y.jsx)(k,{onClick:()=>Qt(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>Kt(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,y.jsx)(k,{variant:"email",onClick:()=>Zt(e),title:"Resend Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,y.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,y.jsxs)(y.Fragment,{children:["automatic"!==e.type&&(0,y.jsx)(k,{onClick:()=>xn(e),children:"Edit"}),(0,y.jsx)(k,{onClick:()=>Qt(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>Kt(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,y.jsx)(k,{variant:"email",onClick:()=>Zt(e),title:"Resend Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,y.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,y.jsx)(F,{onClick:()=>hn(e),title:"Delete Invoice",children:(0,y.jsx)(B,{children:"\xd7"})})]}),"paid"===e.status&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(k,{onClick:()=>Qt(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>Kt(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,y.jsx)(k,{onClick:()=>Qt(e),title:"Download Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id))})]}),0===nn.length&&(0,y.jsxs)(p.ys,{children:[(0,y.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,y.jsx)("div",{style:{fontSize:"14px"},children:0===r.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"payment_submitted"===_e&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"Payment Confirmation Required"}),(0,y.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:0},children:"These invoices have payment submitted and are waiting for your confirmation."})]}),(0,y.jsxs)(p.an,{children:[(0,y.jsxs)(p.bQ,{children:[(0,y.jsx)(p.B_,{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(p.gU,{align:"center",children:"Invoice"}),(0,y.jsx)(p.gU,{align:"center",children:"Customer"}),(0,y.jsx)(p.gU,{align:"center",children:"Payment Method"}),(0,y.jsx)(p.gU,{align:"center",children:"Submitted Date"}),(0,y.jsx)(p.gU,{align:"right",children:"Amount"}),(0,y.jsx)(p.gU,{isActions:!0,children:"Actions"})]})}),(0,y.jsx)("tbody",{children:r.filter(e=>"payment_submitted"===e.status).map(e=>(0,y.jsxs)(p.J2,{children:[(0,y.jsx)(p.Bv,{"data-label":"Invoice",children:(0,y.jsxs)(j,{children:[(0,y.jsx)(f,{children:e.invoiceNumber}),(0,y.jsx)(b,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,y.jsx)(p.Bv,{"data-label":"Customer",children:(0,y.jsxs)(j,{children:[(0,y.jsx)(f,{children:e.customerName||e.restaurantName||"Unknown"}),(0,y.jsx)(b,{children:e.companyName})]})}),(0,y.jsx)(p.Bv,{"data-label":"Payment Method",align:"center",children:e.paymentMethod||"-"}),(0,y.jsx)(p.Bv,{"data-label":"Submitted",align:"center",children:e.paidDate?cn(e.paidDate):"-"}),(0,y.jsx)(p.Bv,{"data-label":"Amount",align:"right",children:(0,y.jsx)(p.DM,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"USD")})}),(0,y.jsx)(p.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,y.jsxs)(p.wr,{children:[(0,y.jsx)(k,{onClick:()=>pn(e),children:"View"}),(0,y.jsx)(k,{variant:"primary",onClick:()=>{Ze(e),ve(!0)},children:"Confirm Payment"})]})})]},e.id))})]}),0===r.filter(e=>"payment_submitted"===e.status).length&&(0,y.jsxs)(p.ys,{children:[(0,y.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",marginBottom:"8px"},children:"No Pending Confirmations"}),(0,y.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"There are no invoices waiting for payment confirmation."})]})]})]}),"categories"===_e&&(0,y.jsxs)("div",{style:{padding:"24px 0"},children:[(0,y.jsxs)(_,{children:[(0,y.jsxs)("div",{children:[(0,y.jsx)(L,{children:"Invoice Categories"}),(0,y.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,y.jsx)(v,{variant:"primary",onClick:()=>Rt(),children:"Add Category"})]}),0===St.length?(0,y.jsxs)(P,{children:[(0,y.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,y.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,y.jsx)(v,{variant:"primary",onClick:()=>Rt(),children:"Add Category"})]}):(0,y.jsx)(S,{children:St.map(e=>(0,y.jsxs)(A,{isActive:e.is_active,children:[(0,y.jsx)(N,{children:e.name.charAt(0).toUpperCase()}),(0,y.jsxs)(E,{children:[(0,y.jsxs)(D,{children:[e.name,(0,y.jsx)(T,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,y.jsxs)(I,{children:[(0,y.jsxs)("span",{children:["Code: ",(0,y.jsx)("strong",{children:e.code})]}),e.description&&(0,y.jsx)("span",{children:e.description})]})]}),(0,y.jsxs)(z,{children:[(0,y.jsx)($,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({is_active:!e.is_active})});(await n.json()).success&&Wt()}catch(t){console.error("Failed to toggle category:",t)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,y.jsx)("circle",{cx:"12",cy:"12",r:"3"})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,y.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})})}),(0,y.jsx)($,{onClick:()=>Rt(e),title:"Edit Category",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,y.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,y.jsx)($,{onClick:()=>(e=>{Qe(e),Ge(!0)})(e),title:"Delete Category",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,y.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),Me&&(0,y.jsx)(O,{onClick:Ut,children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:Re?"Edit Category":"Add Category"}),(0,y.jsx)(q,{onClick:Ut,children:"\xd7"})]}),(0,y.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Oe.name.trim()&&Oe.code.trim())try{Ve(!0);const e=localStorage.getItem("auth_token"),t=Re?`/api/invoices/categories/${Re.id}`:"/api/invoices/categories",n=Re?"PUT":"POST",i=await fetch(t,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:Oe.name.trim(),code:Oe.code.trim().toLowerCase().replace(/\s+/g,"_"),description:Oe.description.trim()||null})}),r=await i.json();r.success?(Ut(),Wt()):alert(r.error||"Failed to save category")}catch(t){console.error("Failed to save category:",t),alert("Failed to save category")}finally{Ve(!1)}},children:[(0,y.jsxs)(G,{children:[(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Name *"}),(0,y.jsx)(X,{value:Oe.name,onChange:e=>He({...Oe,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Code *"}),(0,y.jsx)(X,{value:Oe.code,onChange:e=>He({...Oe,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Re||void 0===Re?void 0:Re.is_system}),(0,y.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Description"}),(0,y.jsx)(ee,{value:Oe.description,onChange:e=>He({...Oe,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",type:"button",onClick:Ut,children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",type:"submit",disabled:Ye||!Oe.name||!Oe.code,children:Ye?"Saving...":Re?"Update":"Create"})]})]})]})}),(0,y.jsx)(c.A,{isOpen:qe,onCancel:()=>Ge(!1),onConfirm:async()=>{if(Je)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${Je.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success?(Ge(!1),Qe(null),Wt()):alert(n.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===Je||void 0===Je?void 0:Je.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),pe&&(0,y.jsx)(O,{onClick:e=>{e.target===e.currentTarget&&(xe(!1),Xt())},children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Create Invoice"}),(0,y.jsx)(q,{onClick:()=>{xe(!1),Xt()},children:"\xd7"})]}),(0,y.jsxs)(G,{children:[(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Search Manager or Restaurant *"}),(0,y.jsxs)("div",{style:{position:"relative"},children:[(0,y.jsx)(X,{type:"text",value:gt,onChange:e=>(e=>{if(mt(e),vt(!0),e.length<2)return void ut({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",dt),console.log("Available restaurants:",pt);const t=dt.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.companyName&&t.companyName.toLowerCase().includes(e.toLowerCase())),n=pt.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",t),console.log("Filtered restaurants:",n),ut({managers:t.slice(0,5),restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>vt(!0),onBlur:()=>setTimeout(()=>vt(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),yt&&(ht.managers.length>0||ht.restaurants.length>0)&&(0,y.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[ht.managers.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),ht.managers.map(e=>(0,y.jsxs)("div",{onClick:()=>qt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),ht.restaurants.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),ht.restaurants.map(e=>{const t=dt.find(t=>t.id===e.manager_id);return(0,y.jsxs)("div",{onClick:()=>qt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===t||void 0===t?void 0:t.fullName)||"Unknown"]})]},e.id)})]})]})]}),jt&&(0,y.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===jt.type?jt.data.fullName:jt.data.name}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===jt.type?`${jt.data.companyName} \u2022 Manager`:`${jt.data.address||"No address"} \u2022 Restaurant`})]}),(0,y.jsx)("button",{onClick:()=>{ft(null),mt("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,y.jsxs)(Q,{children:[(0,y.jsxs)(K,{children:[(0,y.jsxs)(Z,{children:["Amount",$t.currency?` (${$t.currency})`:""," *"]}),(0,y.jsx)(X,{type:"number",step:$t.currency&&0===(0,s.e_)($t.currency)?"1":"0.01",min:"0",value:$t.amount,onChange:e=>{const t=parseFloat(e.target.value)||0,n=t*(Nt.enabled?Nt.rate/100:0),i=t+n;Pt({...$t,amount:e.target.value,tax:n.toFixed(2),total:i.toFixed(2)})},onBlur:e=>{if(e.target.value&&$t.currency){const t=(0,s.e_)($t.currency),n=parseFloat(e.target.value)||0,i=n.toFixed(t),r=n*(Nt.enabled?Nt.rate/100:0),a=n+r;Pt({...$t,amount:i,tax:r.toFixed(t),total:a.toFixed(t)})}},placeholder:$t.currency&&0===(0,s.e_)($t.currency)?"0":"0.00",required:!0,disabled:!jt}),!jt&&(0,y.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Due Date *"}),(0,y.jsx)(X,{type:"date",value:$t.dueDate,onChange:e=>Pt({...$t,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Invoice Category"}),(0,y.jsx)(te,{value:$t.invoiceCategory||"service",onChange:e=>Pt({...$t,invoiceCategory:e.target.value}),children:St.length>0?St.filter(e=>"subscription"!==e.code).map(e=>(0,y.jsx)("option",{value:e.code,children:e.name},e.id)):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("option",{value:"service",children:"Service"}),(0,y.jsx)("option",{value:"consulting",children:"Consulting"}),(0,y.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==($t.invoiceCategory||"service")&&(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Item/Description"}),(0,y.jsx)(ee,{value:"others"===$t.invoiceCategory?$t.customDescription||"":$t.serviceDescription||"",onChange:e=>{"others"===$t.invoiceCategory?Pt({...$t,customDescription:e.target.value}):Pt({...$t,serviceDescription:e.target.value})},placeholder:`Enter ${$t.invoiceCategory||"service"} description...`,rows:2})]}),(0,y.jsxs)(ne,{children:[(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:$t.currency?(0,s.vv)(parseFloat($t.amount||"0"),$t.currency):"-"})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Tax (6%):"}),(0,y.jsx)("span",{children:$t.currency?(0,s.vv)(parseFloat($t.tax||"0"),$t.currency):"-"})]}),(0,y.jsxs)(ie,{highlight:!0,children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:$t.currency?(0,s.vv)(parseFloat($t.total||"0"),$t.currency):"-"})})]})]})]}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>{xe(!1),Xt()},children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(jt&&$t.amount&&$t.dueDate)try{const e=parseFloat($t.amount),t=parseFloat($t.tax),n=parseFloat($t.total),i=new Date;i.setDate(1);const r=new Date;r.setMonth(r.getMonth()+1),r.setDate(0);let a="";a="others"===$t.invoiceCategory?$t.customDescription||"":$t.serviceDescription||"";let o="",s="",l="",d="";if("restaurant"===jt.type){const e=jt.data;o=e.name,d=e.name,l=e.name;const t=[];e.address&&t.push(e.address),e.phone&&t.push(`Phone: ${e.phone}`),e.email&&t.push(`Email: ${e.email}`),s=t.join("\n")}else if("manager"===jt.type){const e=jt.data;o=e.fullName,l=e.companyName||e.fullName;const t=[];e.companyName&&t.push(e.companyName),e.email&&t.push(`Email: ${e.email}`),s=t.join("\n")}let c="restaurant";if("manager"===jt.type){const e=jt.data;"Brand General"===e.role||"Brand Manager"===e.role?c="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(c="foodcourt_manager")}const p={restaurant_id:"restaurant"===jt.type?jt.data.id:null,payer_type:c,payer_id:"manager"===jt.type?jt.data.id:null,type:"manual",billing_period_start:i.toISOString(),billing_period_end:r.toISOString(),due_date:new Date($t.dueDate).toISOString(),total_amount:n,currency:$t.currency||"USD",status:"pending_payment",notes:`${l}\n${o}\n${s}\n\n${a}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:$t.invoiceCategory||"service"},x=[{item_type:$t.invoiceCategory,description:a,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:Nt.enabled?Nt.rate:0,tax_amount:t,total_amount:n}],h=localStorage.getItem("auth_token"),u=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({invoice_data:p,items:x})});if(u.ok)await Mt(),xe(!1),Xt();else{const e=await u.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!jt||!$t.amount||!$t.dueDate,children:"Create Invoice"})]})]})}),he&&Ke&&(0,y.jsx)(O,{onClick:()=>ue(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Invoice Details"}),(0,y.jsx)(q,{onClick:()=>ue(!1),children:"\xd7"})]}),(0,y.jsxs)(G,{children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,y.jsxs)("div",{children:[null!==bt&&void 0!==bt&&bt.companyLogo?(0,y.jsx)("img",{src:bt.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}):(0,y.jsx)("div",{style:{fontSize:"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===bt||void 0===bt?void 0:bt.companyName)||"Company Name"}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===bt||void 0===bt?void 0:bt.address)&&(0,y.jsx)("div",{children:bt.address}),((null===bt||void 0===bt?void 0:bt.city)||(null===bt||void 0===bt?void 0:bt.state)||(null===bt||void 0===bt?void 0:bt.postalCode))&&(0,y.jsx)("div",{children:[null===bt||void 0===bt?void 0:bt.city,null===bt||void 0===bt?void 0:bt.state,null===bt||void 0===bt?void 0:bt.postalCode].filter(Boolean).join(", ")}),(null===bt||void 0===bt?void 0:bt.country)&&(0,y.jsx)("div",{children:bt.country}),(null===bt||void 0===bt?void 0:bt.phone)&&(0,y.jsxs)("div",{children:["Tel: ",bt.phone]}),(null===bt||void 0===bt?void 0:bt.email)&&(0,y.jsxs)("div",{children:["Email: ",bt.email]})]})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,y.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Ke.invoiceNumber}),(0,y.jsx)(C,{status:Ke.status,style:{marginTop:"8px"},children:en(Ke.status)})]})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,y.jsxs)("div",{style:{flex:1},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,y.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:Ke.customerName}),Ke.customerAddress&&(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:Ke.customerAddress}),"restaurant"===Ke.payerType&&Ke.restaurantName&&"Unknown Restaurant"!==Ke.restaurantName&&(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",Ke.restaurantName]}),Ke.companyName&&Ke.companyName!==Ke.customerName&&(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",Ke.companyName]})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ke.billingPeriod||"-"})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:cn(Ke.issueDate)})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:cn(Ke.dueDate)})]}),Ke.paidDate&&(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:cn(Ke.paidDate)})]})]})]}),(0,y.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,y.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,y.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,y.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,y.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,y.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,y.jsx)("tbody",{children:Ke.items.map((e,t)=>(0,y.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.unitPrice,Ke.currency||"MYR")}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.total,Ke.currency||"MYR")})]},t))})]})]}),(0,y.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,y.jsx)("div",{style:{width:"280px"},children:(0,y.jsxs)(ne,{children:[(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:(0,s.vv)(Ke.amount,Ke.currency||"MYR")})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Tax (6%):"}),(0,y.jsx)("span",{children:(0,s.vv)(Ke.tax,Ke.currency||"MYR")})]}),(0,y.jsxs)(ie,{highlight:!0,children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:(0,s.vv)(Ke.total,Ke.currency||"MYR")})})]})]})})}),(null===bt||void 0===bt?void 0:bt.bankName)&&(0,y.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Bank:"})," ",bt.bankName]}),(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Account Name:"})," ",bt.bankAccountName]}),(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Account Number:"})," ",bt.bankAccount]})]})]}),((null===bt||void 0===bt?void 0:bt.taxNumber)||(null===bt||void 0===bt?void 0:bt.registrationNumber))&&(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===bt||void 0===bt?void 0:bt.registrationNumber)&&(0,y.jsxs)("span",{children:["Reg No: ",bt.registrationNumber]}),(null===bt||void 0===bt?void 0:bt.registrationNumber)&&(null===bt||void 0===bt?void 0:bt.taxNumber)&&(0,y.jsx)("span",{children:" | "}),(null===bt||void 0===bt?void 0:bt.taxNumber)&&(0,y.jsxs)("span",{children:["Tax No: ",bt.taxNumber]})]})]})]})}),ye&&Ke&&(0,y.jsx)(O,{onClick:()=>ve(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,y.jsxs)(Y,{children:[(0,y.jsxs)(V,{children:["Confirm Payment - ",Ke.invoiceNumber]}),(0,y.jsx)(q,{onClick:()=>ve(!1),children:"\xd7"})]}),(0,y.jsxs)(G,{children:[(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Invoice Summary"}),(0,y.jsxs)(ne,{children:[(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Customer:"}),(0,y.jsx)("span",{children:Ke.customerName||Ke.managerName})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Company:"}),(0,y.jsx)("span",{children:Ke.companyName})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Invoice Number:"}),(0,y.jsx)("span",{children:Ke.invoiceNumber})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Due Date:"}),(0,y.jsx)("span",{children:cn(Ke.dueDate)})]}),(0,y.jsxs)(ie,{highlight:!0,children:[(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:"Payment Amount:"})}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:(0,s.vv)(Ke.total,Ke.currency||"USD")})})]})]})]}),Ke.hasPaymentInfo&&(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Customer's Payment Information"}),(0,y.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,y.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,y.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,y.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===Ke.paymentMethod?"Bank Transfer":"qr_payment"===Ke.paymentMethod?"QR Payment":"stripe"===Ke.paymentMethod?"Stripe":"paypal"===Ke.paymentMethod?"PayPal":Ke.paymentMethod||"Not specified"]}),Ke.transactionId&&(0,y.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,y.jsx)("strong",{children:"Transaction ID:"})," ",Ke.transactionId]})]}),Ke.receiptUrl&&(0,y.jsxs)("div",{style:{marginTop:"12px"},children:[(0,y.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,y.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,y.jsx)("img",{src:Ke.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(Ke.receiptUrl,"_blank")}),(0,y.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,y.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,y.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,y.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,y.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Status Change"}),(0,y.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,y.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>ve(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Ke)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ke.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(t.ok)await Mt(),ve(!1),Ze(null);else{const e=await t.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),ge&&Ke&&Xe&&(0,y.jsx)(O,{onClick:()=>me(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsxs)(V,{children:["Edit Invoice - ",Ke.invoiceNumber]}),(0,y.jsx)(q,{onClick:()=>me(!1),children:"\xd7"})]}),(0,y.jsxs)(G,{children:[(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Search Manager or Restaurant *"}),(0,y.jsxs)("div",{style:{position:"relative"},children:[(0,y.jsx)(X,{type:"text",value:tt,onChange:e=>(e=>{if(nt(e),ot(!0),e.length<2)return void rt({managers:[],restaurants:[]});const t=dt.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.companyName&&t.companyName.toLowerCase().includes(e.toLowerCase())),n=pt.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase()));rt({managers:t.slice(0,5),restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>ot(!0),onBlur:()=>setTimeout(()=>ot(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),at&&(it.managers.length>0||it.restaurants.length>0)&&(0,y.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[it.managers.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),it.managers.map(e=>(0,y.jsxs)("div",{onClick:()=>Vt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),it.restaurants.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),it.restaurants.map(e=>{const t=dt.find(t=>t.id===e.manager_id);return(0,y.jsxs)("div",{onClick:()=>Vt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[t?`Manager: ${t.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),st&&(0,y.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===st.type?st.data.fullName:st.data.name}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===st.type?`${st.data.companyName} \u2022 Manager`:`${st.data.address||"No address"} \u2022 Restaurant`})]}),(0,y.jsx)("button",{onClick:()=>{lt(null),nt("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,y.jsxs)(Q,{children:[(0,y.jsxs)(K,{children:[(0,y.jsxs)(Z,{children:["Amount (",e.currency||"RM",")"]}),(0,y.jsx)(X,{type:"number",value:Xe.amount,onChange:e=>{const t=parseFloat(e.target.value)||0,n=t*(Nt.enabled?Nt.rate/100:0),i=t+n;et({...Xe,amount:e.target.value,tax:n.toFixed(2),total:i.toFixed(2)})}})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Due Date"}),(0,y.jsx)(X,{type:"date",value:Xe.dueDate,onChange:e=>et({...Xe,dueDate:e.target.value})})]})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Status"}),(0,y.jsxs)(te,{value:Xe.status,onChange:e=>et({...Xe,status:e.target.value}),children:[(0,y.jsx)("option",{value:"draft",children:"Draft"}),(0,y.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,y.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,y.jsx)("option",{value:"paid",children:"Paid"}),(0,y.jsx)("option",{value:"overdue",children:"Overdue"}),(0,y.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Invoice Category"}),(0,y.jsx)(te,{value:Xe.invoiceCategory||"service",onChange:e=>et({...Xe,invoiceCategory:e.target.value}),children:St.length>0?St.filter(e=>"subscription"!==e.code).map(e=>(0,y.jsx)("option",{value:e.code,children:e.name},e.id)):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("option",{value:"service",children:"Service"}),(0,y.jsx)("option",{value:"consulting",children:"Consulting"}),(0,y.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Xe.invoiceCategory||"service")&&(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Item/Description"}),(0,y.jsx)(ee,{value:"others"===Xe.invoiceCategory?Xe.customDescription||"":Xe.serviceDescription||"",onChange:e=>{"others"===Xe.invoiceCategory?et({...Xe,customDescription:e.target.value}):et({...Xe,serviceDescription:e.target.value})},placeholder:`Enter ${Xe.invoiceCategory||"service"} description...`,rows:2})]}),(0,y.jsxs)(ne,{children:[(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:Xe.currency?(0,s.vv)(parseFloat(Xe.amount||"0"),Xe.currency):"-"})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Tax (6%):"}),(0,y.jsx)("span",{children:Xe.currency?(0,s.vv)(parseFloat(Xe.tax||"0"),Xe.currency):"-"})]}),(0,y.jsxs)(ie,{highlight:!0,children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:Xe.currency?(0,s.vv)(parseFloat(Xe.total||"0"),Xe.currency):"-"})})]})]})]}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>me(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Ke&&Xe)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ke.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(Xe.amount),tax:parseFloat(Xe.tax),total:parseFloat(Xe.total),dueDate:Xe.dueDate,status:Xe.status,payerType:Xe.payerType,payerId:Xe.payerId,items:Xe.items})});if(t.ok){const e={...Ke,amount:parseFloat(Xe.amount),tax:parseFloat(Xe.tax),total:parseFloat(Xe.total),dueDate:Xe.dueDate,status:Xe.status,payerType:Xe.payerType,payerId:Xe.payerId,items:Xe.items};d(r.map(t=>t.id===Ke.id?e:t)),me(!1),Ze(null),et(null),Pe("Invoice updated successfully!"),Te(!0)}else{const e=await t.json();Pe(`Failed to update invoice: ${e.error||"Unknown error"}`),Te(!0)}}catch(e){console.error("Error updating invoice:",e),Pe("Error updating invoice. Please try again."),Te(!0)}},children:"Save Changes"})]})]})}),je&&Ke&&(0,y.jsx)(O,{onClick:()=>fe(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Send Invoice"}),(0,y.jsx)(q,{onClick:()=>fe(!1),children:"\xd7"})]}),(0,y.jsx)(G,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,y.jsx)("strong",{children:Ke.invoiceNumber})," to ",(0,y.jsx)("strong",{children:Ke.managerName||Ke.customerName}),"?"]}),(0,y.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Ke.invoiceNumber})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Ke.managerName||Ke.customerName})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Ke.customerName})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,y.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,s.vv)(Ke.total,Ke.currency||"USD")})]})]})]})}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>fe(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"success",onClick:async()=>{if(Ke)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ke.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(t.ok)await Mt(),fe(!1),Ze(null);else{const e=await t.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Confirm"})]})]})}),be&&Ke&&(0,y.jsx)(O,{onClick:()=>we(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Resend Invoice"}),(0,y.jsx)(q,{onClick:()=>we(!1),children:"\xd7"})]}),(0,y.jsx)(G,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,y.jsx)("strong",{children:Ke.invoiceNumber})," to ",(0,y.jsx)("strong",{children:Ke.managerName}),"?"]}),(0,y.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:()=>{Ke&&(we(!1),Ze(null))},children:"Resend Invoice"})]})]})}),Ce&&Ke&&(0,y.jsx)(O,{onClick:()=>ke(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Cancel Invoice"}),(0,y.jsx)(q,{onClick:()=>ke(!1),children:"\xd7"})]}),(0,y.jsx)(G,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,y.jsx)("strong",{children:Ke.invoiceNumber}),"?"]}),(0,y.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,y.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,y.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,y.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,y.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Ke.invoiceNumber})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Ke.managerName})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,y.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,s.vv)(Ke.total,Ke.currency||"USD")})]})]})]})}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>ke(!1),children:"Keep Invoice"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Ke)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ke.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(t.ok)await Mt(),ke(!1),Ze(null);else{const e=await t.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),Fe&&Ke&&(0,y.jsx)(O,{onClick:()=>Be(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Delete Invoice"}),(0,y.jsx)(q,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,y.jsx)(G,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,y.jsxs)("strong",{children:["#",Ke.invoiceNumber]}),"?",(0,y.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>Be(!1),children:"Keep Invoice"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Ke)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ke.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(t.ok)await Mt(),Be(!1),Ze(null);else{const e=await t.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),Se&&De&&(0,y.jsx)(O,{onClick:()=>Ae(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Send Invoice via Email"}),(0,y.jsx)(q,{onClick:()=>Ae(!1),children:"\xd7"})]}),(0,y.jsxs)(G,{children:[(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Invoice"}),(0,y.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,y.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:De.invoiceNumber}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:De.customerName}),(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,s.vv)(De.total,De.currency||"MYR")})]})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Recipient Email *"}),(0,y.jsx)(X,{type:"email",value:Ne,onChange:e=>Ee(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:Ne?(0,y.jsxs)(y.Fragment,{children:["Default email for ","restaurant"===De.payerType?"Restaurant":"foodcourt_manager"===De.payerType?"Foodcourt Manager":"brand_manager"===De.payerType?"Brand Manager":"Customer"]}):(0,y.jsxs)(y.Fragment,{children:["Enter the ","restaurant"===De.payerType?"restaurant":"foodcourt_manager"===De.payerType?"foodcourt manager":"brand_manager"===De.payerType?"brand manager":"customer"," email address"]})})]}),(0,y.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,y.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>{Ae(!1),Ie(null),Ee("")},children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(!De||!Ne)return Pe("Please enter a valid email address."),void Te(!0);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${De.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:Ne})});if(t.ok)Pe(`Invoice sent successfully to ${Ne}`),Ae(!1),Ie(null),Ee("");else{const e=await t.json();Pe(e.error||"Failed to send invoice email.")}Te(!0)}catch(e){console.error("Error sending invoice email:",e),Pe("Failed to send invoice email. Please try again."),Te(!0)}},disabled:!Ne||!Ne.includes("@"),children:"Send Email"})]})]})}),ze&&(0,y.jsx)(O,{onClick:()=>Te(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Success"}),(0,y.jsx)(q,{onClick:()=>Te(!1),children:"\xd7"})]}),(0,y.jsx)(G,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,y.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:$e})})}),(0,y.jsx)(J,{children:(0,y.jsx)(v,{variant:"primary",onClick:()=>Te(!1),children:"OK"})})]})})]})]})})})},7617:(e,t,n)=>{n.d(t,{A:()=>x});n(9950);var i=n(4752),r=n(9610),a=n(4414);const o=i.Ay.div`
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
`,x=e=>{let{isOpen:t,title:n,message:i,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,a.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(l,{children:n}),(0,a.jsx)(d,{children:i})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:u})]})]})}):null}}}]);