"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7283],{2488:(e,t,n)=>{n.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});n(9950);var i=n(4752),r=n(4414);const a=i.Ay.div`
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
`,c=e=>{let{children:t,className:n,style:i,...o}=e;return(0,r.jsx)(a,{className:n,style:i,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:n,onChange:i,style:a,...d}=e;return(0,r.jsxs)(s,{style:a,children:[(0,r.jsx)(o,{placeholder:t,value:n,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...d}),n&&(0,r.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...n}=e;return(0,r.jsx)(d,{...n,children:t})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});n(9950);var i=n(4752),r=n(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:t,className:n,style:i}=e;return(0,r.jsx)(a,{className:n,style:i,children:t})},d=e=>{let{active:t,onClick:n,children:i,className:a}=e;return(0,r.jsx)(o,{active:t,onClick:n,className:a,children:i})},c=e=>{let{count:t,variant:n="default",showZero:i=!1}=e;return 0!==t||i?(0,r.jsx)(s,{variant:n,children:t}):null}},7283:(e,t,n)=>{n.r(t),n.d(t,{default:()=>oe});var i=n(9950),r=n(4752),a=n(8654),o=n(2853),s=n(4492),l=n(6038),d=n(9018),c=n(4728),p=n(7617),x=n(8409),u=n(2488),h=n(2597),g=n(5612),m=n(1052),y=n.n(m),v=n(4414);const j=(0,r.Ay)(c.SC)``,f=r.Ay.div``,b=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=r.Ay.div`
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
`,C=(0,r.Ay)(c.Wh)`
  white-space: normal;
  line-height: 1.3;
`,k=r.Ay.button`
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
`,S=r.Ay.button`
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
`,A=r.Ay.div`
  display: grid;
  gap: 12px;
`,D=r.Ay.div`
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
`,E=r.Ay.div`
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
`,N=r.Ay.div`
  flex: 1;
`,T=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,$=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,z=r.Ay.div`
  display: flex;
  gap: 8px;
`,I=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,_=r.Ay.button`
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,M=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,R=r.Ay.div`
  margin-bottom: 24px;
`,L=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,W=r.Ay.div`
  margin-left: auto;

  @media (max-width: 600px) {
    margin-left: 0;
    width: 100%;
    order: 99;

    button {
      width: 100%;
    }
  }
`,U=r.Ay.button`
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
`,H=r.Ay.div`
  position: relative;
  display: inline-block;
`,O=r.Ay.button`
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
`,Y=r.Ay.div`
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
`,q=r.Ay.div`
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
`,J=r.Ay.button`
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
`,Q=r.Ay.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
`,K=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,Z=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,X=r.Ay.div`
  margin-bottom: 20px;
`,ee=r.Ay.label`
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
`,ne=r.Ay.textarea`
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
`,ie=r.Ay.select`
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
`,re=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,ae=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,oe=()=>{const{operationSettings:e}=(0,d.Pj)(),[t,n]=(0,s.ok)(),[r,c]=(0,i.useState)([]),[m,oe]=(0,i.useState)(""),[se,le]=(0,i.useState)("month"),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(!1),[ue,he]=(0,i.useState)(()=>{const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),n=new Date(e.getFullYear(),e.getMonth()+1,0),i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:i(t),end:i(n)}}),[ge,me]=(0,i.useState)(!1),[ye,ve]=(0,i.useState)(!1),[je,fe]=(0,i.useState)(!1),[be,Fe]=(0,i.useState)(!1),[we,Ce]=(0,i.useState)(!1),[ke,Se]=(0,i.useState)(!1),[Be,Ae]=(0,i.useState)(!1),[De,Ee]=(0,i.useState)(!1),[Ne,Te]=(0,i.useState)(!1),[$e,ze]=(0,i.useState)(""),[Ie,_e]=(0,i.useState)(null),[Pe,Me]=(0,i.useState)(!1),[Re,Le]=(0,i.useState)(""),We=t.get("tab")||"invoices",Ue=e=>{n({tab:e})},[He,Oe]=(0,i.useState)(!1),[Ve,Ye]=(0,i.useState)(null),[qe,Ge]=(0,i.useState)({name:"",code:"",description:""}),[Je,Qe]=(0,i.useState)(!1),[Ke,Ze]=(0,i.useState)(!1),[Xe,et]=(0,i.useState)(null),[tt,nt]=(0,i.useState)(null),[it,rt]=(0,i.useState)(null),[at,ot]=(0,i.useState)(""),[st,lt]=(0,i.useState)(null),[dt,ct]=(0,i.useState)(""),[pt,xt]=(0,i.useState)({managers:[],restaurants:[]}),[ut,ht]=(0,i.useState)(!1),[gt,mt]=(0,i.useState)(null),[yt,vt]=(0,i.useState)([]),[jt,ft]=(0,i.useState)([]),[bt,Ft]=(0,i.useState)({managers:[],restaurants:[]}),[wt,Ct]=(0,i.useState)(""),[kt,St]=(0,i.useState)(!1),[Bt,At]=(0,i.useState)(null),[Dt,Et]=(0,i.useState)(null),[,Nt]=(0,i.useState)({}),[,Tt]=(0,i.useState)([]),[$t,zt]=(0,i.useState)([]),[It,_t]=(0,i.useState)({}),[,Pt]=(0,i.useState)({enabled:!1,rate:0,name:"Tax"}),[Mt,Rt]=(0,i.useState)("issueDate"),[Lt,Wt]=(0,i.useState)("desc"),[Ut,Ht]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),Ot=e=>{le(e),ce(!1),xe(!1);const t=new Date;let n=new Date,i=new Date;const a=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":break;case"week":n.setDate(t.getDate()-6);break;case"month":n.setDate(t.getDate()-29);break;case"year":n.setDate(t.getDate()-364);break;case"all":if(r.length>0){const e=r.reduce((e,t)=>{const n=t.issueDate||t.dueDate;return n<e?n:e},r[0].issueDate||r[0].dueDate);n=new Date(e)}else n=new Date(t.getFullYear(),0,1)}he({start:a(n),end:a(i)})},Vt=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void c([]);const t=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",t.status),t.ok){const e=await t.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),c(e)}else{const e=await t.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",t.status,e),c([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),c([])}},Yt=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(t.ok){const e=await t.json();e.success&&e.data&&zt(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),qt=e=>{e?(Ye(e),Ge({name:e.name,code:e.code,description:e.description||""})):(Ye(null),Ge({name:"",code:"",description:""})),Oe(!0)},Gt=()=>{Oe(!1),Ye(null),Ge({name:"",code:"",description:""})};(0,i.useEffect)(()=>{Vt(),Zt(),Xt(),nn(),Kt(),Yt(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/admin/payment-settings",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();if(e.additionalCharges){Array.isArray(e.additionalCharges)?_t({}):_t(e.additionalCharges);const t=(Array.isArray(e.additionalCharges)?e.additionalCharges:Object.values(e.additionalCharges).flat()).find(e=>null===e||void 0===e?void 0:e.enabled);t&&Pt({enabled:t.enabled,rate:parseFloat(t.rate)||0,name:t.name||"Tax"})}}}catch(e){console.error("Error fetching payment settings:",e)}})()},[]);const Jt=e=>{const t=(0,l.Wh)(e);return It[t]||It[e]||[]},Qt=Jt(Ut.currency),Kt=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const t=await e.json();t.success&&t.currencies&&Nt(t.currencies)}const t=await fetch("/api/currencies/supported");if(t.ok){const e=await t.json();if(e.success&&e.data){const t=e.data.map(e=>e.code);Tt(t)}}}catch(e){console.error("Error fetching currency config:",e)}},Zt=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[t,n]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...n]}if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...t]}console.log("Fetched managers (General only):",i.length),vt(i)}catch(e){console.error("Error fetching managers:",e),vt([])}},Xt=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();console.log("Fetched restaurants:",e);const n=e.map(e=>{var t,n;return{id:e.id.toString(),name:e.name,admin_id:(null===(t=e.admin_id)||void 0===t?void 0:t.toString())||(null===(n=e.managerId)||void 0===n?void 0:n.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"USD"}});ft(n),console.log("Transformed restaurants:",n)}else console.error("Failed to fetch restaurants"),ft([])}catch(e){console.error("Error fetching restaurants:",e),ft([])}},en=(e,t)=>{if(mt({type:e,data:t}),ct("manager"===e?t.fullName:t.name),ht(!1),"manager"===e){const e=t;rt({...it,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=t,n=yt.find(t=>t.id===e.admin_id);rt({...it,managerId:(null===n||void 0===n?void 0:n.id)||"",managerName:(null===n||void 0===n?void 0:n.fullName)||"",companyName:(null===n||void 0===n?void 0:n.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},tn=async(e,t)=>{At({type:e,data:t}),St(!1),Ct("manager"===e?t.fullName:t.name);const n=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=t;try{const t=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const e=await t.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){var r;const t=await e.json(),n=t.data||t,a=null===(r=n.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=n.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",a,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){var a;const t=await e.json(),n=t.data||t,r=null===(a=n.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=n.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",r,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}Ht({...Ut,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i})}else{const e=t,r=yt.find(t=>t.id===e.admin_id);try{const t=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){i=(await t.json()).currency||"USD"}}catch(o){console.error("Error fetching restaurant currency:",o)}Ht({...Ut,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:r?r.fullName:"",companyName:e.name,currency:i})}},nn=async()=>{try{const t=await fetch("/api/admin/settings");if(t.ok){const e=await t.json();Et(e)}else{const t=localStorage.getItem("adminSettings");let n="";if(t)try{const e=JSON.parse(t);n=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),Et({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:n})}}catch(t){console.error("Error fetching company settings:",t);const n=localStorage.getItem("adminSettings");let i="";if(n)try{const e=JSON.parse(n);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),Et({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},rn=e=>{if(!Dt)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${Dt.companyLogo?`<img src="${Dt.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${Dt.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${Dt.address?`${Dt.address}<br>`:""}\n                    ${[Dt.city,Dt.state,Dt.postalCode].filter(Boolean).join(", ")}${Dt.city||Dt.state||Dt.postalCode?"<br>":""}\n                    ${Dt.country?`${Dt.country}<br>`:""}\n                    ${Dt.phone?`Tel: ${Dt.phone}<br>`:""}\n                    ${Dt.email?`Email: ${Dt.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${fn(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${fn(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${fn(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(t=>`\n                    <tr>\n                        <td>${t.description}</td>\n                        <td class="text-center">${t.quantity}</td>\n                        <td class="text-right">${(0,l.vv)(t.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,l.vv)(t.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,l.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${(e.additionalCharges||[]).map(t=>`\n                <div class="summary-row tax">\n                    <span>${t.name} (${t.rate}%):</span>\n                    <span>${(0,l.vv)(t.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,l.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${Dt.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${Dt.bankName}<br>\n                <strong>Account Name:</strong> ${Dt.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${Dt.bankAccount||"-"}\n                ${Dt.swiftCode?`<br><strong>SWIFT Code:</strong> ${Dt.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${Dt.taxNumber||Dt.registrationNumber?`\n        <div class="registration-info">\n            ${Dt.registrationNumber?`Reg No: ${Dt.registrationNumber}`:""}\n            ${Dt.registrationNumber&&Dt.taxNumber?" | ":""}\n            ${Dt.taxNumber?`Tax No: ${Dt.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},an=async e=>{if(!Dt)return Le("Company settings not loaded. Please try again."),void Me(!0);try{var t;const n=rn(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(t=i.contentWindow)||void 0===t?void 0:t.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(n),r.close(),await new Promise(async e=>{try{var t;null!==(t=r.fonts)&&void 0!==t&&t.ready&&await r.fonts.ready}catch{}const n=r.querySelectorAll("img");await Promise.all(Array.from(n).map(e=>e.complete?Promise.resolve():new Promise(t=>{e.onload=t,e.onerror=t}))),setTimeout(e,100)});const a=await y()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new g.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(n){console.error("Error generating PDF:",n),Le("Failed to generate PDF. Please try again."),Me(!0)}},on=e=>{if(!Dt)return Le("Company settings not loaded. Please try again."),void Me(!0);const t=rn(e),n=window.open("","_blank","width=800,height=600");n&&(n.document.write(t),n.document.close(),setTimeout(()=>{n.print()},250))},sn=async e=>{_e(e);let t="";if("restaurant"===e.payerType&&e.restaurantId){const n=jt.find(t=>t.id===e.restaurantId);null!==n&&void 0!==n&&n.email&&(t=n.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const n=yt.find(t=>t.id===e.managerId);null!==n&&void 0!==n&&n.email&&(t=n.email)}if(!t&&e.managerId){const n=yt.find(t=>t.id===e.managerId);null!==n&&void 0!==n&&n.email&&(t=n.email)}ze(t),Te(!0)},ln=()=>{Ht({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),At(null),Ct(""),St(!1)},dn=e=>{if("pending_payment"!==e.status)return!1;const t=new Date;return new Date(e.dueDate)<t},cn=e=>dn(e)?"overdue":e.status,pn=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},xn=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},un=r.filter(e=>{const t=m.toLowerCase(),n=pn(e.status).toLowerCase(),i="automatic"===e.type?"auto automatic":"manual",r=(e.planType||"").toLowerCase(),a=(e.categoryDisplayName||"").toLowerCase(),o=(e.customerName||e.restaurantName||"").toLowerCase(),s=xn(e.payerType||"restaurant").toLowerCase(),l=!m||e.companyName.toLowerCase().includes(t)||e.invoiceNumber.toLowerCase().includes(t)||e.managerName.toLowerCase().includes(t)||n.includes(t)||i.includes(t)||r.includes(t)||a.includes(t)||o.includes(t)||s.includes(t)||(e.billingPeriod||"").toLowerCase().includes(t);let d=!0;if(ue.start&&ue.end){const t=new Date(e.issueDate),n=new Date(ue.start),i=new Date(ue.end);n.setHours(0,0,0,0),i.setHours(23,59,59,999),d=t>=n&&t<=i}return l&&d}).sort((e,t)=>{let n=0;switch(Mt){case"invoiceNumber":n=e.invoiceNumber.localeCompare(t.invoiceNumber);break;case"companyName":n=e.companyName.localeCompare(t.companyName);break;case"issueDate":default:n=new Date(e.issueDate).getTime()-new Date(t.issueDate).getTime();break;case"dueDate":n=new Date(e.dueDate).getTime()-new Date(t.dueDate).getTime();break;case"amount":n=e.total-t.total;break;case"status":n=(e.status||"").localeCompare(t.status||"")}return"desc"===Lt?-n:n}),hn=e=>{Mt===e?Wt("asc"===Lt?"desc":"asc"):(Rt(e),Wt("dueDate"===e||"amount"===e?"desc":"asc"))},gn=e=>Mt!==e?"":"asc"===Lt?" \u25b2":" \u25bc",mn=r.length,yn=r.filter(e=>"paid"===e.status).length,vn=r.filter(e=>dn(e)).length,jn=r.filter(e=>"paid"===e.status).reduce((e,t)=>e+t.total,0),fn=e=>new Date(e).toLocaleDateString("en-MY"),bn=e=>{nt(e),ve(!0)},Fn=t=>{var n,i;if(nt(t),rt({managerId:t.managerId,managerName:t.managerName,companyName:t.companyName||"",restaurantId:t.restaurantId||"",restaurantName:t.restaurantName||"",amount:(t.subtotalBeforeDiscount||t.amount).toString(),tax:t.tax.toString(),total:t.total.toString(),dueDate:t.dueDate?t.dueDate.split("T")[0]:"",status:t.status,planType:t.planType,billingCycle:"monthly",description:(null===(n=t.items)||void 0===n||null===(i=n[0])||void 0===i?void 0:i.description)||"",payerType:t.payerType||"restaurant",payerId:t.payerId||"",items:t.items,currency:t.currency||e.currency||"USD",discountType:t.discountType||"none",discountValue:t.discountValue?t.discountValue.toString():"",discountReason:t.discountReason||"",invoiceCategory:t.invoiceCategory||"service",customDescription:t.customDescription||"",serviceDescription:t.serviceDescription||""}),t.restaurantId){const e=jt.find(e=>e.id===t.restaurantId);e&&(mt({type:"restaurant",data:e}),ct(e.name))}else if(t.managerId){const e=yt.find(e=>e.id===t.managerId);e&&(mt({type:"manager",data:e}),ct(e.fullName))}ot(""),lt(null),fe(!0)},wn=e=>{nt(e),Ee(!0)};return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(x.mc,{children:[(0,v.jsxs)(x.Y9,{children:[(0,v.jsx)(x.hE,{children:"Invoices"}),(0,v.jsx)(x.ex,{})]}),(0,v.jsxs)(x.UC,{children:[(0,v.jsxs)(x.MD,{children:[(0,v.jsxs)(x.hI,{color:"#059669",children:[(0,v.jsx)(x.Os,{children:mn}),(0,v.jsx)(x.v0,{children:"Total Invoices"}),(0,v.jsx)(x.d1,{children:"All invoice records"})]}),(0,v.jsxs)(x.hI,{color:"#2563EB",children:[(0,v.jsx)(x.Os,{children:yn}),(0,v.jsx)(x.v0,{children:"Paid Invoices"}),(0,v.jsxs)(x.d1,{children:[mn>0?Math.round(yn/mn*100):0,"% completed"]})]}),(0,v.jsxs)(x.hI,{color:"#DC2626",children:[(0,v.jsx)(x.Os,{children:vn}),(0,v.jsx)(x.v0,{children:"Overdue Invoices"}),(0,v.jsx)(x.d1,{children:"Requires attention"})]}),(0,v.jsxs)(x.hI,{color:"#7C3AED",children:[(0,v.jsx)(x.Os,{children:(0,l.vv)(jn)}),(0,v.jsx)(x.v0,{children:"Total Revenue"}),(0,v.jsx)(x.d1,{children:"From paid invoices"})]})]}),(0,v.jsxs)(h.tU,{children:[(0,v.jsx)(h.oz,{active:"invoices"===We,onClick:()=>Ue("invoices"),children:"Invoices"}),(0,v.jsxs)(h.oz,{active:"payment_submitted"===We,onClick:()=>Ue("payment_submitted"),children:["Payment Submitted",(0,v.jsx)(h.Ex,{count:r.filter(e=>"payment_submitted"===e.status).length,variant:"danger"})]}),(0,v.jsx)(h.oz,{active:"categories"===We,onClick:()=>Ue("categories"),children:"Invoice Categories"})]}),"invoices"===We&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(R,{children:(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{active:"week"===se&&!de,onClick:()=>Ot("week"),children:"Week"}),(0,v.jsx)(U,{active:"month"===se&&!de,onClick:()=>Ot("month"),children:"Month"}),(0,v.jsx)(U,{active:"year"===se&&!de,onClick:()=>Ot("year"),children:"Year"}),(0,v.jsx)(U,{active:"all"===se&&!de,onClick:()=>Ot("all"),children:"All"}),(0,v.jsxs)(H,{children:[(0,v.jsxs)(O,{active:de,onClick:()=>xe(!pe),children:[(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,v.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,v.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,v.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),ue.start&&ue.end?`${ue.start} ~ ${ue.end}`:"Custom Range"]}),(0,v.jsx)(a.A,{isOpen:pe,startDate:ue.start,endDate:ue.end,onRangeSelect:(e,t)=>{ce(!0),le("all"),he({start:e,end:t})},onClose:()=>xe(!1)})]}),(0,v.jsx)(u.DO,{placeholder:"Search invoices...",value:m,onChange:e=>oe(e.target.value)}),(0,v.jsx)(W,{children:(0,v.jsx)(j,{variant:"primary",onClick:()=>{ln(),me(!0)},children:"Create Invoice"})})]})}),(0,v.jsxs)(x.an,{children:[(0,v.jsxs)(x.bQ,{children:[(0,v.jsx)(x.B_,{children:(0,v.jsxs)("tr",{children:[(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>hn("invoiceNumber"),children:["Invoice",gn("invoiceNumber")]}),(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>hn("companyName"),children:["Customer",gn("companyName")]}),(0,v.jsx)(x.gU,{align:"center",children:"Period"}),(0,v.jsx)(x.gU,{align:"center",children:"Issued"}),(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>hn("dueDate"),children:["Due",gn("dueDate")]}),(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>hn("status"),children:["Status",gn("status")]}),(0,v.jsxs)(x.gU,{align:"right",style:{cursor:"pointer"},onClick:()=>hn("amount"),children:["Amount",gn("amount")]}),(0,v.jsx)(x.gU,{align:"right",children:"Total"}),(0,v.jsx)(x.gU,{isActions:!0,children:"Actions"})]})}),(0,v.jsx)("tbody",{children:un.map(e=>(0,v.jsxs)(x.J2,{children:[(0,v.jsx)(x.Bv,{"data-label":"Invoice",children:(0,v.jsxs)(f,{children:[(0,v.jsxs)(b,{children:[e.invoiceNumber,"automatic"===e.type&&(0,v.jsx)(w,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,v.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,v.jsx)(x.Bv,{"data-label":"Customer",children:(0,v.jsxs)(f,{children:[(0,v.jsx)(b,{children:e.customerName||e.restaurantName||"Unknown"}),(0,v.jsx)(F,{children:xn(e.payerType||"restaurant")})]})}),(0,v.jsx)(x.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,v.jsx)(x.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:fn(e.issueDate)}),(0,v.jsx)(x.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:fn(e.dueDate)}),(0,v.jsxs)(x.Bv,{"data-label":"Status",align:"center",children:[(0,v.jsx)(C,{status:cn(e),children:pn(cn(e))}),e.isModified&&(0,v.jsx)("span",{style:{display:"inline-block",marginLeft:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px",verticalAlign:"middle"},children:"Modified"})]}),(0,v.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,v.jsx)(x.DM,{children:(0,l.vv)(e.amount,e.currency||"USD")})}),(0,v.jsx)(x.Bv,{"data-label":"Total",align:"right",children:(0,v.jsx)(x.DM,{highlight:!0,children:0===e.total?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"USD")})}),(0,v.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,v.jsxs)(x.wr,{children:[(0,v.jsx)(k,{variant:"primary",onClick:()=>bn(e),children:"View"}),"draft"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k,{onClick:()=>Fn(e),children:"Edit"}),(0,v.jsx)(k,{variant:"success",onClick:()=>(e=>{nt(e),Ce(!0)})(e),title:"Send Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,v.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,v.jsx)(S,{onClick:()=>wn(e),title:"Delete Invoice",children:(0,v.jsx)(B,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k,{onClick:()=>Fn(e),children:"Edit"}),(0,v.jsx)(k,{onClick:()=>an(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(k,{onClick:()=>on(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(k,{variant:"email",onClick:()=>sn(e),title:"Send Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,v.jsx)(S,{onClick:()=>wn(e),title:"Delete Invoice",children:(0,v.jsx)(B,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,v.jsxs)(v.Fragment,{children:[e.hasPaymentInfo&&(0,v.jsx)(k,{variant:"primary",onClick:()=>(e=>{nt(e),Fe(!0)})(e),children:"Confirm"}),(0,v.jsx)(k,{onClick:()=>an(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(k,{onClick:()=>on(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(k,{variant:"email",onClick:()=>sn(e),title:"Resend Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k,{onClick:()=>Fn(e),children:"Edit"}),(0,v.jsx)(k,{onClick:()=>an(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(k,{onClick:()=>on(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(k,{variant:"email",onClick:()=>sn(e),title:"Resend Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,v.jsx)(S,{onClick:()=>wn(e),title:"Delete Invoice",children:(0,v.jsx)(B,{children:"\xd7"})})]}),"paid"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k,{onClick:()=>an(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(k,{onClick:()=>on(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,v.jsx)(k,{onClick:()=>an(e),title:"Download Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id))})]}),0===un.length&&(0,v.jsxs)(x.ys,{children:[(0,v.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,v.jsx)("div",{style:{fontSize:"14px"},children:0===r.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"payment_submitted"===We&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"Payment Confirmation Required"}),(0,v.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:0},children:"These invoices have payment submitted and are waiting for your confirmation."})]}),(0,v.jsxs)(x.an,{children:[(0,v.jsxs)(x.bQ,{children:[(0,v.jsx)(x.B_,{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)(x.gU,{align:"center",children:"Invoice"}),(0,v.jsx)(x.gU,{align:"center",children:"Customer"}),(0,v.jsx)(x.gU,{align:"center",children:"Payment Method"}),(0,v.jsx)(x.gU,{align:"center",children:"Submitted Date"}),(0,v.jsx)(x.gU,{align:"right",children:"Amount"}),(0,v.jsx)(x.gU,{isActions:!0,children:"Actions"})]})}),(0,v.jsx)("tbody",{children:r.filter(e=>"payment_submitted"===e.status).map(e=>(0,v.jsxs)(x.J2,{children:[(0,v.jsx)(x.Bv,{"data-label":"Invoice",children:(0,v.jsxs)(f,{children:[(0,v.jsx)(b,{children:e.invoiceNumber}),(0,v.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,v.jsx)(x.Bv,{"data-label":"Customer",children:(0,v.jsxs)(f,{children:[(0,v.jsx)(b,{children:e.customerName||e.restaurantName||"Unknown"}),(0,v.jsx)(F,{children:e.companyName})]})}),(0,v.jsx)(x.Bv,{"data-label":"Payment Method",align:"center",children:e.paymentMethod||"-"}),(0,v.jsx)(x.Bv,{"data-label":"Submitted",align:"center",children:e.paidDate?fn(e.paidDate):"-"}),(0,v.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,v.jsx)(x.DM,{highlight:!0,children:0===e.total?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"USD")})}),(0,v.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,v.jsxs)(x.wr,{children:[(0,v.jsx)(k,{onClick:()=>bn(e),children:"View"}),(0,v.jsx)(k,{variant:"primary",onClick:()=>{nt(e),Fe(!0)},children:"Confirm Payment"})]})})]},e.id))})]}),0===r.filter(e=>"payment_submitted"===e.status).length&&(0,v.jsxs)(x.ys,{children:[(0,v.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",marginBottom:"8px"},children:"No Pending Confirmations"}),(0,v.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"There are no invoices waiting for payment confirmation."})]})]})]}),"categories"===We&&(0,v.jsxs)("div",{style:{padding:"24px 0"},children:[(0,v.jsxs)(P,{children:[(0,v.jsxs)("div",{children:[(0,v.jsx)(M,{children:"Invoice Categories"}),(0,v.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,v.jsx)(j,{variant:"primary",onClick:()=>qt(),children:"Add Category"})]}),0===$t.length?(0,v.jsxs)(o.pp,{children:[(0,v.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,v.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,v.jsx)(j,{variant:"primary",onClick:()=>qt(),children:"Add Category"})]}):(0,v.jsx)(A,{children:$t.map(e=>(0,v.jsxs)(D,{isActive:e.is_active,children:[(0,v.jsx)(E,{children:e.name.charAt(0).toUpperCase()}),(0,v.jsxs)(N,{children:[(0,v.jsxs)(T,{children:[e.name,(0,v.jsx)(I,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,v.jsxs)($,{children:[(0,v.jsxs)("span",{children:["Code: ",(0,v.jsx)("strong",{children:e.code})]}),e.description&&(0,v.jsx)("span",{children:e.description})]})]}),(0,v.jsxs)(z,{children:[(0,v.jsx)(_,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({is_active:!e.is_active})});(await n.json()).success&&Yt()}catch(t){console.error("Failed to toggle category:",t)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,v.jsx)("circle",{cx:"12",cy:"12",r:"3"})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,v.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})})}),(0,v.jsx)(_,{onClick:()=>qt(e),title:"Edit Category",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,v.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,v.jsx)(_,{onClick:()=>(e=>{et(e),Ze(!0)})(e),title:"Delete Category",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,v.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),He&&(0,v.jsx)(V,{onClick:Gt,children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:Ve?"Edit Category":"Add Category"}),(0,v.jsx)(J,{onClick:Gt,children:"\xd7"})]}),(0,v.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),qe.name.trim()&&qe.code.trim())try{Qe(!0);const e=localStorage.getItem("auth_token"),t=Ve?`/api/invoices/categories/${Ve.id}`:"/api/invoices/categories",n=Ve?"PUT":"POST",i=await fetch(t,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:qe.name.trim(),code:qe.code.trim().toLowerCase().replace(/\s+/g,"_"),description:qe.description.trim()||null})}),r=await i.json();r.success?(Gt(),Yt()):alert(r.error||"Failed to save category")}catch(t){console.error("Failed to save category:",t),alert("Failed to save category")}finally{Qe(!1)}},children:[(0,v.jsxs)(Q,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Name *"}),(0,v.jsx)(te,{value:qe.name,onChange:e=>Ge({...qe,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Code *"}),(0,v.jsx)(te,{value:qe.code,onChange:e=>Ge({...qe,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Ve||void 0===Ve?void 0:Ve.is_system}),(0,v.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Description"}),(0,v.jsx)(ne,{value:qe.description,onChange:e=>Ge({...qe,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",type:"button",onClick:Gt,children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",type:"submit",disabled:Je||!qe.name||!qe.code,children:Je?"Saving...":Ve?"Update":"Create"})]})]})]})}),(0,v.jsx)(p.A,{isOpen:Ke,onCancel:()=>Ze(!1),onConfirm:async()=>{if(Xe)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${Xe.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success?(Ze(!1),et(null),Yt()):alert(n.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===Xe||void 0===Xe?void 0:Xe.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),ge&&(0,v.jsx)(V,{onClick:e=>{e.target===e.currentTarget&&(me(!1),ln())},children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Create Invoice"}),(0,v.jsx)(J,{onClick:()=>{me(!1),ln()},children:"\xd7"})]}),(0,v.jsxs)(Q,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Search Manager or Restaurant *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(te,{type:"text",value:wt,onChange:e=>(e=>{if(Ct(e),St(!0),e.length<2)return void Ft({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",yt),console.log("Available restaurants:",jt);const t=yt.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.companyName&&t.companyName.toLowerCase().includes(e.toLowerCase())),n=jt.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",t),console.log("Filtered restaurants:",n),Ft({managers:t.slice(0,5),restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>St(!0),onBlur:()=>setTimeout(()=>St(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),kt&&(bt.managers.length>0||bt.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[bt.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),bt.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>tn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),bt.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),bt.restaurants.map(e=>{const t=yt.find(t=>t.id===e.admin_id);return(0,v.jsxs)("div",{onClick:()=>tn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===t||void 0===t?void 0:t.fullName)||"Unknown"]})]},e.id)})]})]})]}),Bt&&(0,v.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Bt.type?Bt.data.fullName:Bt.data.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Bt.type?`${Bt.data.companyName} \u2022 Manager`:`${Bt.data.address||"No address"} \u2022 Restaurant`})]}),(0,v.jsx)("button",{onClick:()=>{At(null),Ct("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,v.jsxs)(Z,{children:[(0,v.jsxs)(X,{children:[(0,v.jsxs)(ee,{children:["Amount",Ut.currency?` (${Ut.currency})`:""," *"]}),(0,v.jsx)(te,{type:"number",step:Ut.currency&&0===(0,l.e_)(Ut.currency)?"1":"0.01",min:"0",value:Ut.amount,onChange:e=>{const t=parseFloat(e.target.value)||0,n=parseFloat(Ut.discountValue)||0,i="percentage"===Ut.discountType?t*(n/100):"fixed"===Ut.discountType?n:0,r=Math.max(0,t-i),a=Qt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+r*t.rate/100,0),o=r+a;Ht({...Ut,amount:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},onBlur:e=>{if(e.target.value&&Ut.currency){const t=(0,l.e_)(Ut.currency),n=parseFloat(e.target.value)||0,i=n.toFixed(t),r=parseFloat(Ut.discountValue)||0,a="percentage"===Ut.discountType?n*(r/100):"fixed"===Ut.discountType?r:0,o=Math.max(0,n-a),s=Qt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+o*t.rate/100,0),d=o+s;Ht({...Ut,amount:i,tax:s.toFixed(t),total:d.toFixed(t)})}},placeholder:Ut.currency&&0===(0,l.e_)(Ut.currency)?"0":"0.00",required:!0,disabled:!Bt}),!Bt&&(0,v.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Due Date *"}),(0,v.jsx)(te,{type:"date",value:Ut.dueDate,onChange:e=>Ht({...Ut,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,v.jsxs)(Z,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Discount"}),(0,v.jsxs)(ie,{value:Ut.discountType,onChange:e=>{const t=e.target.value,n=parseFloat(Ut.amount)||0,i="none"===t?0:parseFloat(Ut.discountValue)||0,r="percentage"===t?n*(i/100):"fixed"===t?i:0,a=Math.max(0,n-r),o=Qt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+a*t.rate/100,0),s=a+o;Ht({...Ut,discountType:t,discountValue:"none"===t?"":Ut.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,v.jsx)("option",{value:"none",children:"No Discount"}),(0,v.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,v.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Ut.discountType&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"percentage"===Ut.discountType?"Discount (%)":"Discount Amount"}),(0,v.jsx)(te,{type:"number",step:"0.01",min:"0",max:"percentage"===Ut.discountType?"100":void 0,value:Ut.discountValue,onChange:e=>{const t=parseFloat(Ut.amount)||0,n=parseFloat(e.target.value)||0,i="percentage"===Ut.discountType?t*(n/100):n,r=Math.max(0,t-i),a=Qt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+r*t.rate/100,0),o=r+a;Ht({...Ut,discountValue:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Ut.discountType&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Discount Reason"}),(0,v.jsx)(te,{type:"text",value:Ut.discountReason,onChange:e=>Ht({...Ut,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Invoice Category"}),(0,v.jsx)(ie,{value:Ut.invoiceCategory||"service",onChange:e=>Ht({...Ut,invoiceCategory:e.target.value}),children:$t.length>0?$t.filter(e=>"subscription"!==e.code).map(e=>(0,v.jsx)("option",{value:e.code,children:e.name},e.id)):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"service",children:"Service"}),(0,v.jsx)("option",{value:"consulting",children:"Consulting"}),(0,v.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Ut.invoiceCategory||"service")&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Item/Description"}),(0,v.jsx)(ne,{value:"others"===Ut.invoiceCategory?Ut.customDescription||"":Ut.serviceDescription||"",onChange:e=>{"others"===Ut.invoiceCategory?Ht({...Ut,customDescription:e.target.value}):Ht({...Ut,serviceDescription:e.target.value})},placeholder:`Enter ${Ut.invoiceCategory||"service"} description...`,rows:2})]}),(0,v.jsxs)(re,{children:[(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:Ut.currency?(0,l.vv)(parseFloat(Ut.amount||"0"),Ut.currency):"-"})]}),"none"!==Ut.discountType&&parseFloat(Ut.discountValue||"0")>0&&(()=>{const e=parseFloat(Ut.amount||"0"),t=parseFloat(Ut.discountValue||"0"),n="percentage"===Ut.discountType?e*(t/100):t;return(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Ut.discountType?` (${t}%)`:"",":"]}),(0,v.jsxs)("span",{style:{color:"#15803D"},children:["-",Ut.currency?(0,l.vv)(n,Ut.currency):"-"]})]})})(),Qt.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,t)=>{const n=parseFloat(Ut.amount||"0"),i=parseFloat(Ut.discountValue||"0"),r="percentage"===Ut.discountType?n*(i/100):"fixed"===Ut.discountType?i:0,a=Math.max(0,n-r)*(e.rate/100);return(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:Ut.currency?(0,l.vv)(a,Ut.currency):"-"})]},t)}),(0,v.jsxs)(ae,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:Ut.currency?(0,l.vv)(parseFloat(Ut.total||"0"),Ut.currency):"-"})})]})]})]}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>{me(!1),ln()},children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(Bt&&Ut.amount&&Ut.dueDate)try{const e=parseFloat(Ut.amount),t=parseFloat(Ut.discountValue)||0,n="percentage"===Ut.discountType?e*(t/100):"fixed"===Ut.discountType?t:0,i=Math.max(0,e-n),r=Qt.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(i*e.rate/100*100)/100})),a=r.reduce((e,t)=>e+t.amount,0),o=i+a;let s="";s="others"===Ut.invoiceCategory?Ut.customDescription||"":Ut.serviceDescription||"";let l="",d="",c="";if("restaurant"===Bt.type){const e=Bt.data;l=e.name,c=e.name;const t=[];e.address&&t.push(e.address),e.phone&&t.push(`Phone: ${e.phone}`),e.email&&t.push(`Email: ${e.email}`),d=t.join("\n")}else if("manager"===Bt.type){const e=Bt.data;l=e.fullName,c=e.companyName||e.fullName;const t=[];e.companyName&&t.push(e.companyName),e.email&&t.push(`Email: ${e.email}`),d=t.join("\n")}let p="restaurant";if("manager"===Bt.type){const e=Bt.data;"Brand General"===e.role||"Brand Manager"===e.role?p="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(p="foodcourt_manager")}const x={restaurant_id:"restaurant"===Bt.type?Bt.data.id:null,payer_type:p,payer_id:"manager"===Bt.type?Bt.data.id:null,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(Ut.dueDate).toISOString(),total_amount:o,subtotal_before_discount:n>0?e:null,discount_type:"none"!==Ut.discountType?Ut.discountType:null,discount_value:n>0?t:null,discount_amount:n>0?n:null,discount_reason:Ut.discountReason||null,currency:Ut.currency||"USD",status:"draft",notes:`${c}\n${l}\n${d}\n\n${s}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:Ut.invoiceCategory||"service",additional_charges:r},u=[{item_type:Ut.invoiceCategory,description:s,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],h=localStorage.getItem("auth_token"),g=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({invoice_data:x,items:u})});if(g.ok)await Vt(),me(!1),ln();else{const e=await g.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!Bt||!Ut.amount||!Ut.dueDate,children:"Create Invoice"})]})]})}),ye&&tt&&(0,v.jsx)(V,{onClick:()=>ve(!1),children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Invoice Details"}),(0,v.jsx)(J,{onClick:()=>ve(!1),children:"\xd7"})]}),(0,v.jsxs)(Q,{children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===Dt||void 0===Dt?void 0:Dt.companyLogo)&&(0,v.jsx)("img",{src:Dt.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,v.jsx)("div",{style:{fontSize:null!==Dt&&void 0!==Dt&&Dt.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===Dt||void 0===Dt?void 0:Dt.companyName)||"Company Name"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===Dt||void 0===Dt?void 0:Dt.address)&&(0,v.jsx)("div",{children:Dt.address}),((null===Dt||void 0===Dt?void 0:Dt.city)||(null===Dt||void 0===Dt?void 0:Dt.state)||(null===Dt||void 0===Dt?void 0:Dt.postalCode))&&(0,v.jsx)("div",{children:[null===Dt||void 0===Dt?void 0:Dt.city,null===Dt||void 0===Dt?void 0:Dt.state,null===Dt||void 0===Dt?void 0:Dt.postalCode].filter(Boolean).join(", ")}),(null===Dt||void 0===Dt?void 0:Dt.country)&&(0,v.jsx)("div",{children:Dt.country}),(null===Dt||void 0===Dt?void 0:Dt.phone)&&(0,v.jsxs)("div",{children:["Tel: ",Dt.phone]}),(null===Dt||void 0===Dt?void 0:Dt.email)&&(0,v.jsxs)("div",{children:["Email: ",Dt.email]})]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,v.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:tt.invoiceNumber}),(0,v.jsx)(C,{status:tt.status,style:{marginTop:"8px"},children:pn(tt.status)}),tt.isModified&&(0,v.jsx)("span",{style:{display:"inline-block",marginTop:"4px",padding:"2px 8px",fontSize:"11px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px"},children:"Modified"})]})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,v.jsxs)("div",{style:{flex:1},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,v.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:tt.customerName}),tt.customerAddress&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:tt.customerAddress}),"restaurant"===tt.payerType&&tt.restaurantName&&"Unknown Restaurant"!==tt.restaurantName&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",tt.restaurantName]}),tt.companyName&&tt.companyName!==tt.customerName&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",tt.companyName]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:tt.billingPeriod||"-"})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:fn(tt.issueDate)})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:fn(tt.dueDate)})]}),tt.paidDate&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:fn(tt.paidDate)})]})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,v.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,v.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,v.jsx)("tbody",{children:tt.items.map((e,t)=>(0,v.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.unitPrice,tt.currency||"MYR")}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.total,tt.currency||"MYR")})]},t))})]})]}),(0,v.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,v.jsx)("div",{style:{width:"280px"},children:(0,v.jsxs)(re,{children:[(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,l.vv)(tt.subtotalBeforeDiscount||tt.amount,tt.currency||"MYR")})]}),tt.discountType&&"none"!==tt.discountType&&tt.discountAmount>0&&(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===tt.discountType?` (${tt.discountValue}%)`:"",":"]}),(0,v.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,l.vv)(tt.discountAmount,tt.currency||"MYR")]})]}),(tt.additionalCharges||[]).map((e,t)=>(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:(0,l.vv)(e.amount,tt.currency||"MYR")})]},t)),(0,v.jsxs)(ae,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(tt.total,tt.currency||"MYR")})})]})]})})}),(null===Dt||void 0===Dt?void 0:Dt.bankName)&&(0,v.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Bank:"})," ",Dt.bankName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Name:"})," ",Dt.bankAccountName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Number:"})," ",Dt.bankAccount]})]})]}),((null===Dt||void 0===Dt?void 0:Dt.taxNumber)||(null===Dt||void 0===Dt?void 0:Dt.registrationNumber))&&(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===Dt||void 0===Dt?void 0:Dt.registrationNumber)&&(0,v.jsxs)("span",{children:["Reg No: ",Dt.registrationNumber]}),(null===Dt||void 0===Dt?void 0:Dt.registrationNumber)&&(null===Dt||void 0===Dt?void 0:Dt.taxNumber)&&(0,v.jsx)("span",{children:" | "}),(null===Dt||void 0===Dt?void 0:Dt.taxNumber)&&(0,v.jsxs)("span",{children:["Tax No: ",Dt.taxNumber]})]}),tt.isModified&&tt.modificationHistory&&tt.modificationHistory.length>0&&(0,v.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,v.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#92400E",marginBottom:"12px"},children:"Modification History"}),tt.modificationHistory.map((e,t)=>(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:t<tt.modificationHistory.length-1?"10px":"0",paddingBottom:t<tt.modificationHistory.length-1?"10px":"0",borderBottom:t<tt.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,v.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,v.jsxs)("div",{style:{marginTop:"3px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,v.jsx)("div",{style:{marginTop:"3px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[t,n]=e;return(0,v.jsxs)("div",{children:[t,": ",String(n.from)," \u2192 ",String(n.to)]},t)})})]},t))]})]})]})}),be&&tt&&(0,v.jsx)(V,{onClick:()=>Fe(!1),children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,v.jsxs)(q,{children:[(0,v.jsxs)(G,{children:["Confirm Payment - ",tt.invoiceNumber]}),(0,v.jsx)(J,{onClick:()=>Fe(!1),children:"\xd7"})]}),(0,v.jsxs)(Q,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Invoice Summary"}),(0,v.jsxs)(re,{children:[(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Customer:"}),(0,v.jsx)("span",{children:tt.customerName||tt.managerName})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Company:"}),(0,v.jsx)("span",{children:tt.companyName})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Invoice Number:"}),(0,v.jsx)("span",{children:tt.invoiceNumber})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Due Date:"}),(0,v.jsx)("span",{children:fn(tt.dueDate)})]}),(0,v.jsxs)(ae,{highlight:!0,children:[(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:"Payment Amount:"})}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(tt.total,tt.currency||"USD")})})]})]})]}),tt.hasPaymentInfo&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Customer's Payment Information"}),(0,v.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,v.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,v.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===tt.paymentMethod?"Bank Transfer":"qr_payment"===tt.paymentMethod?"QR Payment":"stripe"===tt.paymentMethod?"Stripe":"paypal"===tt.paymentMethod?"PayPal":tt.paymentMethod||"Not specified"]}),tt.transactionId&&(0,v.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,v.jsx)("strong",{children:"Transaction ID:"})," ",tt.transactionId]})]}),tt.receiptUrl&&(0,v.jsxs)("div",{style:{marginTop:"12px"},children:[(0,v.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,v.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,v.jsx)("img",{src:tt.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(tt.receiptUrl,"_blank")}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,v.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,v.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,v.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,v.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Status Change"}),(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,v.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>Fe(!1),children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(tt)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${tt.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(t.ok)await Vt(),Fe(!1),nt(null);else{const e=await t.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),je&&tt&&it&&(0,v.jsx)(V,{onClick:()=>fe(!1),children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsxs)(G,{children:["Edit Invoice - ",tt.invoiceNumber]}),(0,v.jsx)(J,{onClick:()=>fe(!1),children:"\xd7"})]}),(0,v.jsxs)(Q,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Search Manager or Restaurant *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(te,{type:"text",value:dt,onChange:e=>(e=>{if(ct(e),ht(!0),e.length<2)return void xt({managers:[],restaurants:[]});const t=yt.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.companyName&&t.companyName.toLowerCase().includes(e.toLowerCase())),n=jt.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase()));xt({managers:t.slice(0,5),restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>ht(!0),onBlur:()=>setTimeout(()=>ht(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),ut&&(pt.managers.length>0||pt.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[pt.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),pt.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>en("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),pt.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),pt.restaurants.map(e=>{const t=yt.find(t=>t.id===e.admin_id);return(0,v.jsxs)("div",{onClick:()=>en("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[t?`Manager: ${t.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),gt&&(0,v.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===gt.type?gt.data.fullName:gt.data.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===gt.type?`${gt.data.companyName} \u2022 Manager`:`${gt.data.address||"No address"} \u2022 Restaurant`})]}),(0,v.jsx)("button",{onClick:()=>{mt(null),ct("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,v.jsxs)(Z,{children:[(0,v.jsxs)(X,{children:[(0,v.jsxs)(ee,{children:["Amount (",it.currency||e.currency||"RM",")"]}),(0,v.jsx)(te,{type:"number",value:it.amount,onChange:e=>{const t=parseFloat(e.target.value)||0,n=parseFloat(it.discountValue)||0,i="percentage"===it.discountType?t*(n/100):"fixed"===it.discountType?n:0,r=Math.max(0,t-i),a=Jt(it.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+r*t.rate/100,0),o=r+a;rt({...it,amount:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})}})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Due Date"}),(0,v.jsx)(te,{type:"date",value:it.dueDate,onChange:e=>rt({...it,dueDate:e.target.value})})]})]}),(0,v.jsxs)(Z,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Discount"}),(0,v.jsxs)(ie,{value:it.discountType,onChange:e=>{const t=e.target.value,n=parseFloat(it.amount)||0,i="none"===t?0:parseFloat(it.discountValue)||0,r="percentage"===t?n*(i/100):"fixed"===t?i:0,a=Math.max(0,n-r),o=Jt(it.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+a*t.rate/100,0),s=a+o;rt({...it,discountType:t,discountValue:"none"===t?"":it.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,v.jsx)("option",{value:"none",children:"No Discount"}),(0,v.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,v.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==it.discountType&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"percentage"===it.discountType?"Discount (%)":"Discount Amount"}),(0,v.jsx)(te,{type:"number",step:"0.01",min:"0",max:"percentage"===it.discountType?"100":void 0,value:it.discountValue,onChange:e=>{const t=parseFloat(it.amount)||0,n=parseFloat(e.target.value)||0,i="percentage"===it.discountType?t*(n/100):n,r=Math.max(0,t-i),a=Jt(it.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+r*t.rate/100,0),o=r+a;rt({...it,discountValue:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==it.discountType&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Discount Reason"}),(0,v.jsx)(te,{type:"text",value:it.discountReason,onChange:e=>rt({...it,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Invoice Category"}),(0,v.jsx)(ie,{value:it.invoiceCategory||"service",onChange:e=>rt({...it,invoiceCategory:e.target.value}),children:$t.length>0?$t.filter(e=>"subscription"!==e.code).map(e=>(0,v.jsx)("option",{value:e.code,children:e.name},e.id)):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"service",children:"Service"}),(0,v.jsx)("option",{value:"consulting",children:"Consulting"}),(0,v.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(it.invoiceCategory||"service")&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Item/Description"}),(0,v.jsx)(ne,{value:"others"===it.invoiceCategory?it.customDescription||"":it.serviceDescription||"",onChange:e=>{"others"===it.invoiceCategory?rt({...it,customDescription:e.target.value}):rt({...it,serviceDescription:e.target.value})},placeholder:`Enter ${it.invoiceCategory||"service"} description...`,rows:2})]}),(0,v.jsxs)(re,{children:[(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:it.currency?(0,l.vv)(parseFloat(it.amount||"0"),it.currency):"-"})]}),"none"!==it.discountType&&parseFloat(it.discountValue||"0")>0&&(()=>{const e=parseFloat(it.amount||"0"),t=parseFloat(it.discountValue||"0"),n="percentage"===it.discountType?e*(t/100):t;return(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{style:{color:"#DC2626"},children:["Discount (","percentage"===it.discountType?`${t}%`:"Fixed","):"]}),(0,v.jsxs)("span",{style:{color:"#DC2626"},children:["-",it.currency?(0,l.vv)(n,it.currency):n.toFixed(2)]})]})})(),Jt(it.currency||"").filter(e=>e.enabled&&e.name&&e.rate>0).map((e,t)=>{const n=parseFloat(it.amount||"0"),i=parseFloat(it.discountValue||"0"),r="percentage"===it.discountType?n*(i/100):"fixed"===it.discountType?i:0,a=Math.max(0,n-r)*e.rate/100;return(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:it.currency?(0,l.vv)(a,it.currency):"-"})]},t)}),(0,v.jsxs)(ae,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:it.currency?(0,l.vv)(parseFloat(it.total||"0"),it.currency):"-"})})]})]}),(0,v.jsxs)(X,{style:{marginTop:"16px"},children:[(0,v.jsxs)(ee,{children:["Modification Reason ","automatic"===(null===tt||void 0===tt?void 0:tt.type)&&(0,v.jsx)("span",{style:{color:"#EF4444"},children:"*"})]}),(0,v.jsx)(ne,{value:at,onChange:e=>ot(e.target.value),placeholder:"Enter reason for modification...",rows:2})]}),(null===tt||void 0===tt?void 0:tt.modificationHistory)&&tt.modificationHistory.length>0&&(0,v.jsxs)("div",{style:{marginTop:"16px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#92400E",marginBottom:"8px"},children:"Modification History"}),tt.modificationHistory.map((e,t)=>(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:t<tt.modificationHistory.length-1?"8px":"0",paddingBottom:t<tt.modificationHistory.length-1?"8px":"0",borderBottom:t<tt.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,v.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,v.jsxs)("div",{style:{marginTop:"2px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,v.jsx)("div",{style:{marginTop:"2px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[t,n]=e;return(0,v.jsxs)("span",{style:{marginRight:"8px"},children:[t,": ",String(n.from)," \u2192 ",String(n.to)]},t)})})]},t))]})]}),(0,v.jsxs)(K,{style:{flexDirection:"column",gap:"12px"},children:[st&&(0,v.jsx)("div",{style:{width:"100%",padding:"10px 14px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"6px",color:"#DC2626",fontSize:"13px"},children:st}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>fe(!1),children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(tt&&it)if(lt(null),"automatic"!==tt.type||at.trim())try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${tt.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(it.amount),tax:parseFloat(it.tax),total:parseFloat(it.total),dueDate:it.dueDate,payerType:it.payerType,payerId:it.payerId,items:it.items,discountType:"none"!==it.discountType?it.discountType:null,discountValue:"none"!==it.discountType?parseFloat(it.discountValue)||0:null,discountAmount:(()=>{const e=parseFloat(it.amount)||0,t=parseFloat(it.discountValue)||0;return"percentage"===it.discountType?e*(t/100):"fixed"===it.discountType?t:null})(),discountReason:it.discountReason||null,subtotal:"none"!==it.discountType?parseFloat(it.amount)||0:null,invoiceCategory:it.invoiceCategory,customDescription:it.customDescription,serviceDescription:it.serviceDescription,modificationReason:at.trim()||void 0})});if(t.ok){const e={...tt,amount:parseFloat(it.amount),tax:parseFloat(it.tax),total:parseFloat(it.total),dueDate:it.dueDate,status:it.status,payerType:it.payerType,payerId:it.payerId,items:it.items};c(r.map(t=>t.id===tt.id?e:t)),fe(!1),nt(null),rt(null),await Vt()}else{const e=await t.json();lt(e.error||"Failed to update invoice")}}catch(e){console.error("Error updating invoice:",e),lt("Error updating invoice. Please try again.")}else lt("Please enter a reason for modifying this invoice.")},children:"Save Changes"})]})]})]})}),we&&tt&&(0,v.jsx)(V,{onClick:()=>Ce(!1),children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Send Invoice"}),(0,v.jsx)(J,{onClick:()=>Ce(!1),children:"\xd7"})]}),(0,v.jsx)(Q,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,v.jsx)("strong",{children:tt.invoiceNumber})," to ",(0,v.jsx)("strong",{children:tt.managerName||tt.customerName}),"?"]}),(0,v.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:tt.invoiceNumber})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:tt.managerName||tt.customerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:tt.customerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,v.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,l.vv)(tt.total,tt.currency||"USD")})]})]})]})}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>Ce(!1),children:"Cancel"}),(0,v.jsx)(j,{variant:"success",onClick:async()=>{if(tt)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${tt.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(t.ok)await Vt(),Ce(!1),nt(null);else{const e=await t.json();Le(`Failed to send invoice: ${e.error||"Unknown error"}`),Me(!0)}}catch(e){console.error("Error sending invoice:",e),Le("Error sending invoice. Please try again."),Me(!0)}},children:"Confirm"})]})]})}),ke&&tt&&(0,v.jsx)(V,{onClick:()=>Se(!1),children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Resend Invoice"}),(0,v.jsx)(J,{onClick:()=>Se(!1),children:"\xd7"})]}),(0,v.jsx)(Q,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,v.jsx)("strong",{children:tt.invoiceNumber})," to ",(0,v.jsx)("strong",{children:tt.managerName}),"?"]}),(0,v.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>Se(!1),children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",onClick:()=>{tt&&(Se(!1),nt(null))},children:"Resend Invoice"})]})]})}),Be&&tt&&(0,v.jsx)(V,{onClick:()=>Ae(!1),children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Cancel Invoice"}),(0,v.jsx)(J,{onClick:()=>Ae(!1),children:"\xd7"})]}),(0,v.jsx)(Q,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,v.jsx)("strong",{children:tt.invoiceNumber}),"?"]}),(0,v.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,v.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,v.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,v.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:tt.invoiceNumber})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:tt.managerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,v.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,l.vv)(tt.total,tt.currency||"USD")})]})]})]})}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>Ae(!1),children:"Keep Invoice"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(tt)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${tt.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(t.ok)await Vt(),Ae(!1),nt(null);else{const e=await t.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),De&&tt&&(0,v.jsx)(V,{onClick:()=>Ee(!1),children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Delete Invoice"}),(0,v.jsx)(J,{onClick:()=>Ee(!1),children:"\xd7"})]}),(0,v.jsx)(Q,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,v.jsxs)("strong",{children:["#",tt.invoiceNumber]}),"?",(0,v.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>Ee(!1),children:"Keep Invoice"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(tt)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${tt.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(t.ok)await Vt(),Ee(!1),nt(null);else{const e=await t.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),Ne&&Ie&&(0,v.jsx)(V,{onClick:()=>Te(!1),children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Send Invoice via Email"}),(0,v.jsx)(J,{onClick:()=>Te(!1),children:"\xd7"})]}),(0,v.jsxs)(Q,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Invoice"}),(0,v.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Ie.invoiceNumber}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:Ie.customerName}),(0,v.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,l.vv)(Ie.total,Ie.currency||"MYR")})]})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Recipient Email *"}),(0,v.jsx)(te,{type:"email",value:$e,onChange:e=>ze(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,v.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:$e?(0,v.jsxs)(v.Fragment,{children:["Default email for ","restaurant"===Ie.payerType?"Restaurant":"foodcourt_manager"===Ie.payerType?"Foodcourt Manager":"brand_manager"===Ie.payerType?"Brand Manager":"Customer"]}):(0,v.jsxs)(v.Fragment,{children:["Enter the ","restaurant"===Ie.payerType?"restaurant":"foodcourt_manager"===Ie.payerType?"foodcourt manager":"brand_manager"===Ie.payerType?"brand manager":"customer"," email address"]})})]}),(0,v.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,v.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>{Te(!1),_e(null),ze("")},children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(!Ie||!$e)return Le("Please enter a valid email address."),void Me(!0);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ie.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:$e})});if(t.ok)Le(`Invoice sent successfully to ${$e}`),Te(!1),_e(null),ze("");else{const e=await t.json();Le(e.error||"Failed to send invoice email.")}Me(!0)}catch(e){console.error("Error sending invoice email:",e),Le("Failed to send invoice email. Please try again."),Me(!0)}},disabled:!$e||!$e.includes("@"),children:"Send Email"})]})]})}),Pe&&(0,v.jsx)(V,{onClick:()=>Me(!1),children:(0,v.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Success"}),(0,v.jsx)(J,{onClick:()=>Me(!1),children:"\xd7"})]}),(0,v.jsx)(Q,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,v.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Re})})}),(0,v.jsx)(K,{children:(0,v.jsx)(j,{variant:"primary",onClick:()=>Me(!1),children:"OK"})})]})})]})]})})}},7617:(e,t,n)=>{n.d(t,{A:()=>x});n(9950);var i=n(4752),r=n(9610),a=n(4414);const o=i.Ay.div`
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
`,x=e=>{let{isOpen:t,title:n,message:i,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,a.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(l,{children:n}),(0,a.jsx)(d,{children:i})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:h})]})]})}):null}},8654:(e,t,n)=>{n.d(t,{A:()=>B});var i=n(9950),r=n(4752),a=n(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)},d=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=r.Ay.div`
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
`,u=r.Ay.div`
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
`,h=r.Ay.button`
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
`,F=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,w=r.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,C=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,k=r.Ay.div`
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
`,B=e=>{let{startDate:t,endDate:n,onRangeSelect:r,onClose:B,isOpen:A}=e;const D=new Date,[E,N]=(0,i.useState)(D.getMonth()),[T,$]=(0,i.useState)(D.getFullYear()),[z,I]=(0,i.useState)(null),[_,P]=(0,i.useState)(null),[M,R]=(0,i.useState)(null),[L,W]=(0,i.useState)("start"),U=(0,i.useRef)(null);(0,i.useEffect)(()=>{t&&I(l(t)),n&&P(l(n))},[t,n]),(0,i.useEffect)(()=>{A&&W("start")},[A]),(0,i.useEffect)(()=>{const e=e=>{U.current&&!U.current.contains(e.target)&&B()};return A&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[A,B]);const H=(0,i.useCallback)(()=>{0===E?(N(11),$(e=>e-1)):N(e=>e-1)},[E]),O=(0,i.useCallback)(()=>{11===E?(N(0),$(e=>e+1)):N(e=>e+1)},[E]),V=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),i=((e,t)=>new Date(e,t,1).getDay())(e,t),l=[];for(let r=0;r<i;r++)l.push(null);for(let r=1;r<=n;r++)l.push(new Date(e,t,r));return(0,a.jsxs)(f,{children:[(0,a.jsx)(b,{children:c(e,t)}),(0,a.jsx)(F,{children:o.map(e=>(0,a.jsx)(w,{children:e},e))}),(0,a.jsx)(C,{children:l.map((e,t)=>{if(!e)return(0,a.jsx)(k,{},`e-${t}`);const{isStart:n,isEnd:i,isInRange:o,isHoverEnd:l}=(e=>{const t=z&&d(e,z),n=_&&d(e,_),i="end"===L&&M?M:_;let r=!1;if(z&&i){const[t,n]=z<=i?[z,i]:[i,z];r=((e,t,n)=>{const i=e.getTime();return i>t.getTime()&&i<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:r,isHoverEnd:"end"===L&&M&&d(e,M)}})(e),c=d(e,D);return(0,a.jsx)(S,{$isStart:!!n,$isEnd:!!i,$isInRange:o,$isHoverEnd:!!l,$isToday:c,onClick:()=>(e=>{if("start"===L)I(e),P(null),W("end");else{let t=z,n=e;n<t&&([t,n]=[n,t]),I(t),P(n),W("start"),r(s(t),s(n)),setTimeout(B,200)}})(e),onMouseEnter:()=>R(e),onMouseLeave:()=>R(null),children:e.getDate()},e.getTime())})})]})},Y=11===E?0:E+1,q=11===E?T+1:T,G=e=>{const t=new Date;let n;const i=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}I(n),P(i),W("start"),r(s(n),s(i)),setTimeout(B,150)};return A?(0,a.jsx)(p,{ref:U,children:(0,a.jsxs)(x,{children:[(0,a.jsxs)(u,{children:[(0,a.jsx)(h,{onClick:()=>G("this_week"),children:"This Week"}),(0,a.jsx)(h,{onClick:()=>G("this_month"),children:"This Month"}),(0,a.jsx)(h,{onClick:()=>G("this_year"),children:"This Year"})]}),(0,a.jsxs)(g,{children:[(0,a.jsxs)(m,{children:[(0,a.jsx)(y,{onClick:H,"aria-label":"Previous month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,a.jsx)(y,{onClick:O,"aria-label":"Next month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,a.jsxs)(v,{children:[V(T,E),(0,a.jsx)(j,{children:V(q,Y)})]})]})]})}):null}}}]);