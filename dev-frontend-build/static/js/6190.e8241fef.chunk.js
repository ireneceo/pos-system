"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6190],{2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var i=t(4752),r=t(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i,...o}=e;return(0,r.jsx)(a,{className:t,style:i,...o,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,r.jsx)(o,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,r.jsx)(s,{...t,children:n})}},2597:(e,n,t)=>{t.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var i=t(4752),r=t(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i}=e;return(0,r.jsx)(a,{className:t,style:i,children:n})},d=e=>{let{active:n,onClick:t,children:i,className:a}=e;return(0,r.jsx)(o,{active:n,onClick:t,className:a,children:i})},c=e=>{let{count:n,variant:t="default",showZero:i=!1}=e;return 0!==n||i?(0,r.jsx)(s,{variant:t,children:n}):null}},7283:(e,n,t)=>{t.r(n),t.d(n,{default:()=>oe});var i=t(9950),r=t(4752),a=t(3154),o=(t(6714),t(2853)),s=t(4492),l=t(6038),d=t(9018),c=t(4728),p=t(7617),x=t(8409),u=t(2488),h=t(2597),g=t(5612),m=t(1052),y=t.n(m),v=t(4414);const j=(0,r.Ay)(c.SC)``,f=r.Ay.div``,b=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,C=r.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,w=(0,r.Ay)(c.Wh)`
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
`,B=r.Ay.button`
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
`,S=r.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,A=r.Ay.div`
  display: grid;
  gap: 12px;
`,E=r.Ay.div`
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
`,D=r.Ay.div`
  flex: 1;
`,T=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,z=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,I=r.Ay.div`
  display: flex;
  gap: 8px;
`,$=r.Ay.span`
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
`,L=r.Ay.div`
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
`,U=r.Ay.div`
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
`,H=r.Ay.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 1000;
  background: #FFFFFF;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  padding: 16px;

  .rdp-root {
    --rdp-accent-color: #635BFF;
    --rdp-accent-background-color: #F0EEFF;
    --rdp-range_middle-background-color: #F0EEFF;
    --rdp-range_middle-color: #635BFF;
    --rdp-range_start-color: #FFFFFF;
    --rdp-range_start-background: #635BFF;
    --rdp-range_end-color: #FFFFFF;
    --rdp-range_end-background: #635BFF;
    --rdp-selected-font: 700 14px/1 system-ui;
    --rdp-day-height: 36px;
    --rdp-day-width: 36px;
    font-size: 14px;
  }

  .rdp-day {
    border-radius: 8px;
  }

  .rdp-month_caption {
    font-weight: 600;
    color: #0A2540;
    font-size: 15px;
  }

  .rdp-weekday {
    color: #9CA3AF;
    font-weight: 500;
    font-size: 12px;
  }

  .rdp-button_next, .rdp-button_previous {
    color: #9CA3AF;
    border: none;
    border-radius: 4px;
    width: 28px;
    height: 28px;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      background: #F3F4F6;
      color: #374151;
    }
  }
`,Y=r.Ay.div`
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
`,V=r.Ay.div`
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
`,ne=r.Ay.input`
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
`,te=r.Ay.textarea`
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
`,oe=()=>{const{operationSettings:e}=(0,d.Pj)(),[n,t]=(0,s.ok)(),[r,c]=(0,i.useState)([]),[m,oe]=(0,i.useState)(""),[se,le]=(0,i.useState)("month"),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(!1),[ue,he]=(0,i.useState)(void 0),ge=(0,i.useRef)("start"),me=(0,i.useRef)(null),[ye,ve]=(0,i.useState)(()=>{const e=new Date,n=new Date(e.getFullYear(),e.getMonth(),1),t=new Date(e.getFullYear(),e.getMonth()+1,0),i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:i(n),end:i(t)}}),[je,fe]=(0,i.useState)(!1),[be,Fe]=(0,i.useState)(!1),[Ce,we]=(0,i.useState)(!1),[ke,Be]=(0,i.useState)(!1),[Se,Ae]=(0,i.useState)(!1),[Ee,Ne]=(0,i.useState)(!1),[De,Te]=(0,i.useState)(!1),[ze,Ie]=(0,i.useState)(!1),[$e,_e]=(0,i.useState)(!1),[Pe,Me]=(0,i.useState)(""),[Le,We]=(0,i.useState)(null),[Re,Ue]=(0,i.useState)(!1),[Oe,He]=(0,i.useState)(""),Ye=n.get("tab")||"invoices",Ve=e=>{t({tab:e})},[qe,Ge]=(0,i.useState)(!1),[Je,Qe]=(0,i.useState)(null),[Ke,Ze]=(0,i.useState)({name:"",code:"",description:""}),[Xe,en]=(0,i.useState)(!1),[nn,tn]=(0,i.useState)(!1),[rn,an]=(0,i.useState)(null),[on,sn]=(0,i.useState)(null),[ln,dn]=(0,i.useState)(null),[cn,pn]=(0,i.useState)(""),[xn,un]=(0,i.useState)(""),[hn,gn]=(0,i.useState)({managers:[],restaurants:[]}),[mn,yn]=(0,i.useState)(!1),[vn,jn]=(0,i.useState)(null),[fn,bn]=(0,i.useState)([]),[Fn,Cn]=(0,i.useState)([]),[wn,kn]=(0,i.useState)({managers:[],restaurants:[]}),[Bn,Sn]=(0,i.useState)(""),[An,En]=(0,i.useState)(!1),[Nn,Dn]=(0,i.useState)(null),[Tn,zn]=(0,i.useState)(null),[,In]=(0,i.useState)({}),[,$n]=(0,i.useState)([]),[_n,Pn]=(0,i.useState)([]),[Mn,Ln]=(0,i.useState)({}),[,Wn]=(0,i.useState)({enabled:!1,rate:0,name:"Tax"}),[Rn,Un]=(0,i.useState)("issueDate"),[On,Hn]=(0,i.useState)("desc"),[Yn,Vn]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""});(0,i.useEffect)(()=>{const e=e=>{me.current&&!me.current.contains(e.target)&&xe(!1)};return pe&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[pe]);const qn=e=>{le(e),ce(!1),xe(!1);const n=new Date;let t=new Date,i=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":break;case"week":t.setDate(n.getDate()-n.getDay());break;case"month":t=new Date(n.getFullYear(),n.getMonth(),1),i=new Date(n.getFullYear(),n.getMonth()+1,0);break;case"year":t=new Date(n.getFullYear(),0,1),i=new Date(n.getFullYear(),11,31);break;case"all":t=new Date(2e3,0,1)}ve({start:r(t),end:r(i)}),he({from:t,to:i})},Gn=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void c([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),c(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),c([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),c([])}},Jn=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&Pn(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Qn=e=>{e?(Qe(e),Ze({name:e.name,code:e.code,description:e.description||""})):(Qe(null),Ze({name:"",code:"",description:""})),Ge(!0)},Kn=()=>{Ge(!1),Qe(null),Ze({name:"",code:"",description:""})};(0,i.useEffect)(()=>{Gn(),nt(),tt(),at(),et(),Jn(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/admin/payment-settings",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();if(e.additionalCharges){Array.isArray(e.additionalCharges)?Ln({}):Ln(e.additionalCharges);const n=(Array.isArray(e.additionalCharges)?e.additionalCharges:Object.values(e.additionalCharges).flat()).find(e=>null===e||void 0===e?void 0:e.enabled);n&&Wn({enabled:n.enabled,rate:parseFloat(n.rate)||0,name:n.name||"Tax"})}}}catch(e){console.error("Error fetching payment settings:",e)}})()},[]);const Zn=e=>{const n=(0,l.Wh)(e);return Mn[n]||Mn[e]||[]},Xn=Zn(Yn.currency),et=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&In(n.currencies)}const n=await fetch("/api/currencies/supported");if(n.ok){const e=await n.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);$n(n)}}}catch(e){console.error("Error fetching currency config:",e)}},nt=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...t]}if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...n]}console.log("Fetched managers (General only):",i.length),bn(i)}catch(e){console.error("Error fetching managers:",e),bn([])}},tt=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"USD"}});Cn(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),Cn([])}catch(e){console.error("Error fetching restaurants:",e),Cn([])}},it=(e,n)=>{if(jn({type:e,data:n}),un("manager"===e?n.fullName:n.name),yn(!1),"manager"===e){const e=n;dn({...ln,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=fn.find(n=>n.id===e.admin_id);dn({...ln,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},rt=async(e,n)=>{Dn({type:e,data:n}),En(!1),Sn("manager"===e?n.fullName:n.name);const t=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=n;try{const n=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var r;const n=await e.json(),t=n.data||n,a=null===(r=t.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=t.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",a,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var a;const n=await e.json(),t=n.data||n,r=null===(a=t.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=t.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",r,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}Vn({...Yn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i})}else{const e=n,r=fn.find(n=>n.id===e.admin_id);try{const n=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){i=(await n.json()).currency||"USD"}}catch(o){console.error("Error fetching restaurant currency:",o)}Vn({...Yn,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:r?r.fullName:"",companyName:e.name,currency:i})}},at=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();zn(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),zn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),zn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},ot=e=>{if(!Tn)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${Tn.companyLogo?`<img src="${Tn.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${Tn.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${Tn.address?`${Tn.address}<br>`:""}\n                    ${[Tn.city,Tn.state,Tn.postalCode].filter(Boolean).join(", ")}${Tn.city||Tn.state||Tn.postalCode?"<br>":""}\n                    ${Tn.country?`${Tn.country}<br>`:""}\n                    ${Tn.phone?`Tel: ${Tn.phone}<br>`:""}\n                    ${Tn.email?`Email: ${Tn.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${Ft(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${Ft(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${Ft(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,l.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,l.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,l.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${(e.additionalCharges||[]).map(n=>`\n                <div class="summary-row tax">\n                    <span>${n.name} (${n.rate}%):</span>\n                    <span>${(0,l.vv)(n.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,l.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${Tn.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${Tn.bankName}<br>\n                <strong>Account Name:</strong> ${Tn.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${Tn.bankAccount||"-"}\n                ${Tn.swiftCode?`<br><strong>SWIFT Code:</strong> ${Tn.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${Tn.taxNumber||Tn.registrationNumber?`\n        <div class="registration-info">\n            ${Tn.registrationNumber?`Reg No: ${Tn.registrationNumber}`:""}\n            ${Tn.registrationNumber&&Tn.taxNumber?" | ":""}\n            ${Tn.taxNumber?`Tax No: ${Tn.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},st=async e=>{if(!Tn)return He("Company settings not loaded. Please try again."),void Ue(!0);try{var n;const t=ot(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(t),r.close(),await new Promise(async e=>{try{var n;null!==(n=r.fonts)&&void 0!==n&&n.ready&&await r.fonts.ready}catch{}const t=r.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const a=await y()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new g.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),He("Failed to generate PDF. Please try again."),Ue(!0)}},lt=e=>{if(!Tn)return He("Company settings not loaded. Please try again."),void Ue(!0);const n=ot(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},dt=async e=>{We(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=Fn.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=fn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=fn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}Me(n),_e(!0)},ct=()=>{Vn({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),Dn(null),Sn(""),En(!1)},pt=e=>{if("pending_payment"!==e.status)return!1;const n=new Date;return new Date(e.dueDate)<n},xt=e=>pt(e)?"overdue":e.status,ut=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},ht=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},gt=r.filter(e=>{const n=m.toLowerCase(),t=ut(e.status).toLowerCase(),i="automatic"===e.type?"auto automatic":"manual",r=(e.planType||"").toLowerCase(),a=(e.categoryDisplayName||"").toLowerCase(),o=(e.customerName||e.restaurantName||"").toLowerCase(),s=ht(e.payerType||"restaurant").toLowerCase(),l=!m||e.companyName.toLowerCase().includes(n)||e.invoiceNumber.toLowerCase().includes(n)||e.managerName.toLowerCase().includes(n)||t.includes(n)||i.includes(n)||r.includes(n)||a.includes(n)||o.includes(n)||s.includes(n)||(e.billingPeriod||"").toLowerCase().includes(n);let d=!0;if(ye.start&&ye.end){const n=new Date(e.issueDate),t=new Date(ye.start),i=new Date(ye.end);t.setHours(0,0,0,0),i.setHours(23,59,59,999),d=n>=t&&n<=i}return l&&d}).sort((e,n)=>{let t=0;switch(Rn){case"invoiceNumber":t=e.invoiceNumber.localeCompare(n.invoiceNumber);break;case"companyName":t=e.companyName.localeCompare(n.companyName);break;case"issueDate":default:t=new Date(e.issueDate).getTime()-new Date(n.issueDate).getTime();break;case"dueDate":t=new Date(e.dueDate).getTime()-new Date(n.dueDate).getTime();break;case"amount":t=e.total-n.total;break;case"status":t=(e.status||"").localeCompare(n.status||"")}return"desc"===On?-t:t}),mt=e=>{Rn===e?Hn("asc"===On?"desc":"asc"):(Un(e),Hn("dueDate"===e||"amount"===e?"desc":"asc"))},yt=e=>Rn!==e?"":"asc"===On?" \u25b2":" \u25bc",vt=r.length,jt=r.filter(e=>"paid"===e.status).length,ft=r.filter(e=>pt(e)).length,bt=r.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),Ft=e=>new Date(e).toLocaleDateString("en-MY"),Ct=e=>{sn(e),Fe(!0)},wt=e=>{var n,t;if(sn(e),dn({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=Fn.find(n=>n.id===e.restaurantId);n&&(jn({type:"restaurant",data:n}),un(n.name))}else if(e.managerId){const n=fn.find(n=>n.id===e.managerId);n&&(jn({type:"manager",data:n}),un(n.fullName))}pn(""),we(!0)},kt=e=>{sn(e),Ie(!0)};return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(x.mc,{children:[(0,v.jsxs)(x.Y9,{children:[(0,v.jsx)(x.hE,{children:"Invoices"}),(0,v.jsx)(x.ex,{})]}),(0,v.jsxs)(x.UC,{children:[(0,v.jsxs)(x.MD,{children:[(0,v.jsxs)(x.hI,{color:"#059669",children:[(0,v.jsx)(x.Os,{children:vt}),(0,v.jsx)(x.v0,{children:"Total Invoices"}),(0,v.jsx)(x.d1,{children:"All invoice records"})]}),(0,v.jsxs)(x.hI,{color:"#2563EB",children:[(0,v.jsx)(x.Os,{children:jt}),(0,v.jsx)(x.v0,{children:"Paid Invoices"}),(0,v.jsxs)(x.d1,{children:[vt>0?Math.round(jt/vt*100):0,"% completed"]})]}),(0,v.jsxs)(x.hI,{color:"#DC2626",children:[(0,v.jsx)(x.Os,{children:ft}),(0,v.jsx)(x.v0,{children:"Overdue Invoices"}),(0,v.jsx)(x.d1,{children:"Requires attention"})]}),(0,v.jsxs)(x.hI,{color:"#7C3AED",children:[(0,v.jsx)(x.Os,{children:(0,l.vv)(bt)}),(0,v.jsx)(x.v0,{children:"Total Revenue"}),(0,v.jsx)(x.d1,{children:"From paid invoices"})]})]}),(0,v.jsxs)(h.tU,{children:[(0,v.jsx)(h.oz,{active:"invoices"===Ye,onClick:()=>Ve("invoices"),children:"Invoices"}),(0,v.jsxs)(h.oz,{active:"payment_submitted"===Ye,onClick:()=>Ve("payment_submitted"),children:["Payment Submitted",(0,v.jsx)(h.Ex,{count:r.filter(e=>"payment_submitted"===e.status).length,variant:"danger"})]}),(0,v.jsx)(h.oz,{active:"categories"===Ye,onClick:()=>Ve("categories"),children:"Invoice Categories"})]}),"invoices"===Ye&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(L,{children:(0,v.jsxs)(W,{children:[(0,v.jsx)(u.DO,{placeholder:"Search invoices... (status, type, customer, etc.)",value:m,onChange:e=>oe(e.target.value),style:{minWidth:"280px",maxWidth:"350px"}}),(0,v.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginLeft:"16px"},children:[(0,v.jsx)(R,{active:"week"===se&&!de,onClick:()=>qn("week"),children:"Week"}),(0,v.jsx)(R,{active:"month"===se&&!de,onClick:()=>qn("month"),children:"Month"}),(0,v.jsx)(R,{active:"year"===se&&!de,onClick:()=>qn("year"),children:"Year"}),(0,v.jsx)(R,{active:"all"===se&&!de,onClick:()=>qn("all"),children:"All"}),(0,v.jsxs)(U,{ref:me,children:[(0,v.jsxs)(O,{active:de,onClick:()=>{xe(!pe),ge.current="start"},children:[(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,v.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,v.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,v.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),ye.start&&ye.end?`${ye.start} ~ ${ye.end}`:"Custom Range"]}),pe&&(0,v.jsx)(H,{children:(0,v.jsx)(a.h,{mode:"range",numberOfMonths:2,selected:ue,onSelect:(e,n)=>{const t=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;if("start"===ge.current)he({from:n,to:void 0}),ge.current="end";else{let e=(null===ue||void 0===ue?void 0:ue.from)||n,i=n;i<e&&([e,i]=[i,e]),he({from:e,to:i}),ce(!0),le("all"),ve({start:t(e),end:t(i)}),ge.current="start",setTimeout(()=>xe(!1),400)}},defaultMonth:(null===ue||void 0===ue?void 0:ue.from)||new Date})})]})]}),(0,v.jsx)("div",{style:{marginLeft:"auto"},children:(0,v.jsx)(j,{variant:"primary",onClick:()=>{ct(),fe(!0)},children:"Create Invoice"})})]})}),(0,v.jsxs)(x.an,{children:[(0,v.jsxs)(x.bQ,{children:[(0,v.jsx)(x.B_,{children:(0,v.jsxs)("tr",{children:[(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>mt("invoiceNumber"),children:["Invoice",yt("invoiceNumber")]}),(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>mt("companyName"),children:["Customer",yt("companyName")]}),(0,v.jsx)(x.gU,{align:"center",children:"Period"}),(0,v.jsx)(x.gU,{align:"center",children:"Issued"}),(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>mt("dueDate"),children:["Due",yt("dueDate")]}),(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>mt("status"),children:["Status",yt("status")]}),(0,v.jsxs)(x.gU,{align:"right",style:{cursor:"pointer"},onClick:()=>mt("amount"),children:["Amount",yt("amount")]}),(0,v.jsx)(x.gU,{align:"right",children:"Total"}),(0,v.jsx)(x.gU,{isActions:!0,children:"Actions"})]})}),(0,v.jsx)("tbody",{children:gt.map(e=>(0,v.jsxs)(x.J2,{children:[(0,v.jsx)(x.Bv,{"data-label":"Invoice",children:(0,v.jsxs)(f,{children:[(0,v.jsxs)(b,{children:[e.invoiceNumber,"automatic"===e.type&&(0,v.jsx)(C,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,v.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,v.jsx)(x.Bv,{"data-label":"Customer",children:(0,v.jsxs)(f,{children:[(0,v.jsx)(b,{children:e.customerName||e.restaurantName||"Unknown"}),(0,v.jsx)(F,{children:ht(e.payerType||"restaurant")})]})}),(0,v.jsx)(x.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,v.jsx)(x.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:Ft(e.issueDate)}),(0,v.jsx)(x.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:Ft(e.dueDate)}),(0,v.jsxs)(x.Bv,{"data-label":"Status",align:"center",children:[(0,v.jsx)(w,{status:xt(e),children:ut(xt(e))}),e.isModified&&(0,v.jsx)("span",{style:{display:"inline-block",marginLeft:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px",verticalAlign:"middle"},children:"Modified"})]}),(0,v.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,v.jsx)(x.DM,{children:(0,l.vv)(e.amount,e.currency||"USD")})}),(0,v.jsx)(x.Bv,{"data-label":"Total",align:"right",children:(0,v.jsx)(x.DM,{highlight:!0,children:0===e.total?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"USD")})}),(0,v.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,v.jsxs)(x.wr,{children:[(0,v.jsx)(k,{variant:"primary",onClick:()=>Ct(e),children:"View"}),"draft"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k,{onClick:()=>wt(e),children:"Edit"}),(0,v.jsx)(k,{variant:"success",onClick:()=>(e=>{sn(e),Ae(!0)})(e),title:"Send Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,v.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,v.jsx)(B,{onClick:()=>kt(e),title:"Delete Invoice",children:(0,v.jsx)(S,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k,{onClick:()=>wt(e),children:"Edit"}),(0,v.jsx)(k,{onClick:()=>st(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(k,{onClick:()=>lt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(k,{variant:"email",onClick:()=>dt(e),title:"Send Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,v.jsx)(B,{onClick:()=>kt(e),title:"Delete Invoice",children:(0,v.jsx)(S,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,v.jsxs)(v.Fragment,{children:[e.hasPaymentInfo&&(0,v.jsx)(k,{variant:"primary",onClick:()=>(e=>{sn(e),Be(!0)})(e),children:"Confirm"}),(0,v.jsx)(k,{onClick:()=>st(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(k,{onClick:()=>lt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(k,{variant:"email",onClick:()=>dt(e),title:"Resend Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k,{onClick:()=>wt(e),children:"Edit"}),(0,v.jsx)(k,{onClick:()=>st(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(k,{onClick:()=>lt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(k,{variant:"email",onClick:()=>dt(e),title:"Resend Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,v.jsx)(B,{onClick:()=>kt(e),title:"Delete Invoice",children:(0,v.jsx)(S,{children:"\xd7"})})]}),"paid"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k,{onClick:()=>st(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(k,{onClick:()=>lt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,v.jsx)(k,{onClick:()=>st(e),title:"Download Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id))})]}),0===gt.length&&(0,v.jsxs)(x.ys,{children:[(0,v.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,v.jsx)("div",{style:{fontSize:"14px"},children:0===r.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"payment_submitted"===Ye&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"Payment Confirmation Required"}),(0,v.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:0},children:"These invoices have payment submitted and are waiting for your confirmation."})]}),(0,v.jsxs)(x.an,{children:[(0,v.jsxs)(x.bQ,{children:[(0,v.jsx)(x.B_,{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)(x.gU,{align:"center",children:"Invoice"}),(0,v.jsx)(x.gU,{align:"center",children:"Customer"}),(0,v.jsx)(x.gU,{align:"center",children:"Payment Method"}),(0,v.jsx)(x.gU,{align:"center",children:"Submitted Date"}),(0,v.jsx)(x.gU,{align:"right",children:"Amount"}),(0,v.jsx)(x.gU,{isActions:!0,children:"Actions"})]})}),(0,v.jsx)("tbody",{children:r.filter(e=>"payment_submitted"===e.status).map(e=>(0,v.jsxs)(x.J2,{children:[(0,v.jsx)(x.Bv,{"data-label":"Invoice",children:(0,v.jsxs)(f,{children:[(0,v.jsx)(b,{children:e.invoiceNumber}),(0,v.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,v.jsx)(x.Bv,{"data-label":"Customer",children:(0,v.jsxs)(f,{children:[(0,v.jsx)(b,{children:e.customerName||e.restaurantName||"Unknown"}),(0,v.jsx)(F,{children:e.companyName})]})}),(0,v.jsx)(x.Bv,{"data-label":"Payment Method",align:"center",children:e.paymentMethod||"-"}),(0,v.jsx)(x.Bv,{"data-label":"Submitted",align:"center",children:e.paidDate?Ft(e.paidDate):"-"}),(0,v.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,v.jsx)(x.DM,{highlight:!0,children:0===e.total?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"USD")})}),(0,v.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,v.jsxs)(x.wr,{children:[(0,v.jsx)(k,{onClick:()=>Ct(e),children:"View"}),(0,v.jsx)(k,{variant:"primary",onClick:()=>{sn(e),Be(!0)},children:"Confirm Payment"})]})})]},e.id))})]}),0===r.filter(e=>"payment_submitted"===e.status).length&&(0,v.jsxs)(x.ys,{children:[(0,v.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",marginBottom:"8px"},children:"No Pending Confirmations"}),(0,v.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"There are no invoices waiting for payment confirmation."})]})]})]}),"categories"===Ye&&(0,v.jsxs)("div",{style:{padding:"24px 0"},children:[(0,v.jsxs)(P,{children:[(0,v.jsxs)("div",{children:[(0,v.jsx)(M,{children:"Invoice Categories"}),(0,v.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,v.jsx)(j,{variant:"primary",onClick:()=>Qn(),children:"Add Category"})]}),0===_n.length?(0,v.jsxs)(o.pp,{children:[(0,v.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,v.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,v.jsx)(j,{variant:"primary",onClick:()=>Qn(),children:"Add Category"})]}):(0,v.jsx)(A,{children:_n.map(e=>(0,v.jsxs)(E,{isActive:e.is_active,children:[(0,v.jsx)(N,{children:e.name.charAt(0).toUpperCase()}),(0,v.jsxs)(D,{children:[(0,v.jsxs)(T,{children:[e.name,(0,v.jsx)($,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,v.jsxs)(z,{children:[(0,v.jsxs)("span",{children:["Code: ",(0,v.jsx)("strong",{children:e.code})]}),e.description&&(0,v.jsx)("span",{children:e.description})]})]}),(0,v.jsxs)(I,{children:[(0,v.jsx)(_,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({is_active:!e.is_active})});(await t.json()).success&&Jn()}catch(n){console.error("Failed to toggle category:",n)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,v.jsx)("circle",{cx:"12",cy:"12",r:"3"})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,v.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})})}),(0,v.jsx)(_,{onClick:()=>Qn(e),title:"Edit Category",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,v.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,v.jsx)(_,{onClick:()=>(e=>{an(e),tn(!0)})(e),title:"Delete Category",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,v.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),qe&&(0,v.jsx)(Y,{onClick:Kn,children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:Je?"Edit Category":"Add Category"}),(0,v.jsx)(J,{onClick:Kn,children:"\xd7"})]}),(0,v.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Ke.name.trim()&&Ke.code.trim())try{en(!0);const e=localStorage.getItem("auth_token"),n=Je?`/api/invoices/categories/${Je.id}`:"/api/invoices/categories",t=Je?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:Ke.name.trim(),code:Ke.code.trim().toLowerCase().replace(/\s+/g,"_"),description:Ke.description.trim()||null})}),r=await i.json();r.success?(Kn(),Jn()):alert(r.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{en(!1)}},children:[(0,v.jsxs)(Q,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Name *"}),(0,v.jsx)(ne,{value:Ke.name,onChange:e=>Ze({...Ke,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Code *"}),(0,v.jsx)(ne,{value:Ke.code,onChange:e=>Ze({...Ke,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Je||void 0===Je?void 0:Je.is_system}),(0,v.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Description"}),(0,v.jsx)(te,{value:Ke.description,onChange:e=>Ze({...Ke,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",type:"button",onClick:Kn,children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",type:"submit",disabled:Xe||!Ke.name||!Ke.code,children:Xe?"Saving...":Je?"Update":"Create"})]})]})]})}),(0,v.jsx)(p.A,{isOpen:nn,onCancel:()=>tn(!1),onConfirm:async()=>{if(rn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${rn.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(tn(!1),an(null),Jn()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===rn||void 0===rn?void 0:rn.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),je&&(0,v.jsx)(Y,{onClick:e=>{e.target===e.currentTarget&&(fe(!1),ct())},children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Create Invoice"}),(0,v.jsx)(J,{onClick:()=>{fe(!1),ct()},children:"\xd7"})]}),(0,v.jsxs)(Q,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Search Manager or Restaurant *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(ne,{type:"text",value:Bn,onChange:e=>(e=>{if(Sn(e),En(!0),e.length<2)return void kn({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",fn),console.log("Available restaurants:",Fn);const n=fn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=Fn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),kn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>En(!0),onBlur:()=>setTimeout(()=>En(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),An&&(wn.managers.length>0||wn.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[wn.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),wn.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>rt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),wn.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),wn.restaurants.map(e=>{const n=fn.find(n=>n.id===e.admin_id);return(0,v.jsxs)("div",{onClick:()=>rt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),Nn&&(0,v.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Nn.type?Nn.data.fullName:Nn.data.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Nn.type?`${Nn.data.companyName} \u2022 Manager`:`${Nn.data.address||"No address"} \u2022 Restaurant`})]}),(0,v.jsx)("button",{onClick:()=>{Dn(null),Sn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,v.jsxs)(Z,{children:[(0,v.jsxs)(X,{children:[(0,v.jsxs)(ee,{children:["Amount",Yn.currency?` (${Yn.currency})`:""," *"]}),(0,v.jsx)(ne,{type:"number",step:Yn.currency&&0===(0,l.e_)(Yn.currency)?"1":"0.01",min:"0",value:Yn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(Yn.discountValue)||0,i="percentage"===Yn.discountType?n*(t/100):"fixed"===Yn.discountType?t:0,r=Math.max(0,n-i),a=Xn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),o=r+a;Vn({...Yn,amount:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},onBlur:e=>{if(e.target.value&&Yn.currency){const n=(0,l.e_)(Yn.currency),t=parseFloat(e.target.value)||0,i=t.toFixed(n),r=parseFloat(Yn.discountValue)||0,a="percentage"===Yn.discountType?t*(r/100):"fixed"===Yn.discountType?r:0,o=Math.max(0,t-a),s=Xn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+o*n.rate/100,0),d=o+s;Vn({...Yn,amount:i,tax:s.toFixed(n),total:d.toFixed(n)})}},placeholder:Yn.currency&&0===(0,l.e_)(Yn.currency)?"0":"0.00",required:!0,disabled:!Nn}),!Nn&&(0,v.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Due Date *"}),(0,v.jsx)(ne,{type:"date",value:Yn.dueDate,onChange:e=>Vn({...Yn,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,v.jsxs)(Z,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Discount"}),(0,v.jsxs)(ie,{value:Yn.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(Yn.amount)||0,i="none"===n?0:parseFloat(Yn.discountValue)||0,r="percentage"===n?t*(i/100):"fixed"===n?i:0,a=Math.max(0,t-r),o=Xn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),s=a+o;Vn({...Yn,discountType:n,discountValue:"none"===n?"":Yn.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,v.jsx)("option",{value:"none",children:"No Discount"}),(0,v.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,v.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Yn.discountType&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"percentage"===Yn.discountType?"Discount (%)":"Discount Amount"}),(0,v.jsx)(ne,{type:"number",step:"0.01",min:"0",max:"percentage"===Yn.discountType?"100":void 0,value:Yn.discountValue,onChange:e=>{const n=parseFloat(Yn.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===Yn.discountType?n*(t/100):t,r=Math.max(0,n-i),a=Xn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),o=r+a;Vn({...Yn,discountValue:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Yn.discountType&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Discount Reason"}),(0,v.jsx)(ne,{type:"text",value:Yn.discountReason,onChange:e=>Vn({...Yn,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Invoice Category"}),(0,v.jsx)(ie,{value:Yn.invoiceCategory||"service",onChange:e=>Vn({...Yn,invoiceCategory:e.target.value}),children:_n.length>0?_n.filter(e=>"subscription"!==e.code).map(e=>(0,v.jsx)("option",{value:e.code,children:e.name},e.id)):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"service",children:"Service"}),(0,v.jsx)("option",{value:"consulting",children:"Consulting"}),(0,v.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Yn.invoiceCategory||"service")&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Item/Description"}),(0,v.jsx)(te,{value:"others"===Yn.invoiceCategory?Yn.customDescription||"":Yn.serviceDescription||"",onChange:e=>{"others"===Yn.invoiceCategory?Vn({...Yn,customDescription:e.target.value}):Vn({...Yn,serviceDescription:e.target.value})},placeholder:`Enter ${Yn.invoiceCategory||"service"} description...`,rows:2})]}),(0,v.jsxs)(re,{children:[(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:Yn.currency?(0,l.vv)(parseFloat(Yn.amount||"0"),Yn.currency):"-"})]}),"none"!==Yn.discountType&&parseFloat(Yn.discountValue||"0")>0&&(()=>{const e=parseFloat(Yn.amount||"0"),n=parseFloat(Yn.discountValue||"0"),t="percentage"===Yn.discountType?e*(n/100):n;return(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Yn.discountType?` (${n}%)`:"",":"]}),(0,v.jsxs)("span",{style:{color:"#15803D"},children:["-",Yn.currency?(0,l.vv)(t,Yn.currency):"-"]})]})})(),Xn.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(Yn.amount||"0"),i=parseFloat(Yn.discountValue||"0"),r="percentage"===Yn.discountType?t*(i/100):"fixed"===Yn.discountType?i:0,a=Math.max(0,t-r)*(e.rate/100);return(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:Yn.currency?(0,l.vv)(a,Yn.currency):"-"})]},n)}),(0,v.jsxs)(ae,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:Yn.currency?(0,l.vv)(parseFloat(Yn.total||"0"),Yn.currency):"-"})})]})]})]}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>{fe(!1),ct()},children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(Nn&&Yn.amount&&Yn.dueDate)try{const e=parseFloat(Yn.amount),n=parseFloat(Yn.discountValue)||0,t="percentage"===Yn.discountType?e*(n/100):"fixed"===Yn.discountType?n:0,i=Math.max(0,e-t),r=Xn.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(i*e.rate/100*100)/100})),a=r.reduce((e,n)=>e+n.amount,0),o=i+a;let s="";s="others"===Yn.invoiceCategory?Yn.customDescription||"":Yn.serviceDescription||"";let l="",d="",c="";if("restaurant"===Nn.type){const e=Nn.data;l=e.name,c=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),d=n.join("\n")}else if("manager"===Nn.type){const e=Nn.data;l=e.fullName,c=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),d=n.join("\n")}let p="restaurant";if("manager"===Nn.type){const e=Nn.data;"Brand General"===e.role||"Brand Manager"===e.role?p="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(p="foodcourt_manager")}const x={restaurant_id:"restaurant"===Nn.type?Nn.data.id:null,payer_type:p,payer_id:"manager"===Nn.type?Nn.data.id:null,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(Yn.dueDate).toISOString(),total_amount:o,subtotal_before_discount:t>0?e:null,discount_type:"none"!==Yn.discountType?Yn.discountType:null,discount_value:t>0?n:null,discount_amount:t>0?t:null,discount_reason:Yn.discountReason||null,currency:Yn.currency||"USD",status:"draft",notes:`${c}\n${l}\n${d}\n\n${s}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:Yn.invoiceCategory||"service",additional_charges:r},u=[{item_type:Yn.invoiceCategory,description:s,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],h=localStorage.getItem("auth_token"),g=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({invoice_data:x,items:u})});if(g.ok)await Gn(),fe(!1),ct();else{const e=await g.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!Nn||!Yn.amount||!Yn.dueDate,children:"Create Invoice"})]})]})}),be&&on&&(0,v.jsx)(Y,{onClick:()=>Fe(!1),children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Invoice Details"}),(0,v.jsx)(J,{onClick:()=>Fe(!1),children:"\xd7"})]}),(0,v.jsxs)(Q,{children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===Tn||void 0===Tn?void 0:Tn.companyLogo)&&(0,v.jsx)("img",{src:Tn.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,v.jsx)("div",{style:{fontSize:null!==Tn&&void 0!==Tn&&Tn.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===Tn||void 0===Tn?void 0:Tn.companyName)||"Company Name"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===Tn||void 0===Tn?void 0:Tn.address)&&(0,v.jsx)("div",{children:Tn.address}),((null===Tn||void 0===Tn?void 0:Tn.city)||(null===Tn||void 0===Tn?void 0:Tn.state)||(null===Tn||void 0===Tn?void 0:Tn.postalCode))&&(0,v.jsx)("div",{children:[null===Tn||void 0===Tn?void 0:Tn.city,null===Tn||void 0===Tn?void 0:Tn.state,null===Tn||void 0===Tn?void 0:Tn.postalCode].filter(Boolean).join(", ")}),(null===Tn||void 0===Tn?void 0:Tn.country)&&(0,v.jsx)("div",{children:Tn.country}),(null===Tn||void 0===Tn?void 0:Tn.phone)&&(0,v.jsxs)("div",{children:["Tel: ",Tn.phone]}),(null===Tn||void 0===Tn?void 0:Tn.email)&&(0,v.jsxs)("div",{children:["Email: ",Tn.email]})]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,v.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:on.invoiceNumber}),(0,v.jsx)(w,{status:on.status,style:{marginTop:"8px"},children:ut(on.status)}),on.isModified&&(0,v.jsx)("span",{style:{display:"inline-block",marginTop:"4px",padding:"2px 8px",fontSize:"11px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px"},children:"Modified"})]})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,v.jsxs)("div",{style:{flex:1},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,v.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:on.customerName}),on.customerAddress&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:on.customerAddress}),"restaurant"===on.payerType&&on.restaurantName&&"Unknown Restaurant"!==on.restaurantName&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",on.restaurantName]}),on.companyName&&on.companyName!==on.customerName&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",on.companyName]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:on.billingPeriod||"-"})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ft(on.issueDate)})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ft(on.dueDate)})]}),on.paidDate&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ft(on.paidDate)})]})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,v.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,v.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,v.jsx)("tbody",{children:on.items.map((e,n)=>(0,v.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.unitPrice,on.currency||"MYR")}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.total,on.currency||"MYR")})]},n))})]})]}),(0,v.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,v.jsx)("div",{style:{width:"280px"},children:(0,v.jsxs)(re,{children:[(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,l.vv)(on.subtotalBeforeDiscount||on.amount,on.currency||"MYR")})]}),on.discountType&&"none"!==on.discountType&&on.discountAmount>0&&(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===on.discountType?` (${on.discountValue}%)`:"",":"]}),(0,v.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,l.vv)(on.discountAmount,on.currency||"MYR")]})]}),(on.additionalCharges||[]).map((e,n)=>(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:(0,l.vv)(e.amount,on.currency||"MYR")})]},n)),(0,v.jsxs)(ae,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(on.total,on.currency||"MYR")})})]})]})})}),(null===Tn||void 0===Tn?void 0:Tn.bankName)&&(0,v.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Bank:"})," ",Tn.bankName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Name:"})," ",Tn.bankAccountName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Number:"})," ",Tn.bankAccount]})]})]}),((null===Tn||void 0===Tn?void 0:Tn.taxNumber)||(null===Tn||void 0===Tn?void 0:Tn.registrationNumber))&&(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===Tn||void 0===Tn?void 0:Tn.registrationNumber)&&(0,v.jsxs)("span",{children:["Reg No: ",Tn.registrationNumber]}),(null===Tn||void 0===Tn?void 0:Tn.registrationNumber)&&(null===Tn||void 0===Tn?void 0:Tn.taxNumber)&&(0,v.jsx)("span",{children:" | "}),(null===Tn||void 0===Tn?void 0:Tn.taxNumber)&&(0,v.jsxs)("span",{children:["Tax No: ",Tn.taxNumber]})]}),on.isModified&&on.modificationHistory&&on.modificationHistory.length>0&&(0,v.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,v.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#92400E",marginBottom:"12px"},children:"Modification History"}),on.modificationHistory.map((e,n)=>(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:n<on.modificationHistory.length-1?"10px":"0",paddingBottom:n<on.modificationHistory.length-1?"10px":"0",borderBottom:n<on.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,v.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,v.jsxs)("div",{style:{marginTop:"3px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,v.jsx)("div",{style:{marginTop:"3px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[n,t]=e;return(0,v.jsxs)("div",{children:[n,": ",String(t.from)," \u2192 ",String(t.to)]},n)})})]},n))]})]})]})}),ke&&on&&(0,v.jsx)(Y,{onClick:()=>Be(!1),children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,v.jsxs)(q,{children:[(0,v.jsxs)(G,{children:["Confirm Payment - ",on.invoiceNumber]}),(0,v.jsx)(J,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,v.jsxs)(Q,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Invoice Summary"}),(0,v.jsxs)(re,{children:[(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Customer:"}),(0,v.jsx)("span",{children:on.customerName||on.managerName})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Company:"}),(0,v.jsx)("span",{children:on.companyName})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Invoice Number:"}),(0,v.jsx)("span",{children:on.invoiceNumber})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Due Date:"}),(0,v.jsx)("span",{children:Ft(on.dueDate)})]}),(0,v.jsxs)(ae,{highlight:!0,children:[(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:"Payment Amount:"})}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(on.total,on.currency||"USD")})})]})]})]}),on.hasPaymentInfo&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Customer's Payment Information"}),(0,v.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,v.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,v.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===on.paymentMethod?"Bank Transfer":"qr_payment"===on.paymentMethod?"QR Payment":"stripe"===on.paymentMethod?"Stripe":"paypal"===on.paymentMethod?"PayPal":on.paymentMethod||"Not specified"]}),on.transactionId&&(0,v.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,v.jsx)("strong",{children:"Transaction ID:"})," ",on.transactionId]})]}),on.receiptUrl&&(0,v.jsxs)("div",{style:{marginTop:"12px"},children:[(0,v.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,v.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,v.jsx)("img",{src:on.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(on.receiptUrl,"_blank")}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,v.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,v.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,v.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,v.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Status Change"}),(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,v.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(on)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${on.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await Gn(),Be(!1),sn(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),Ce&&on&&ln&&(0,v.jsx)(Y,{onClick:()=>we(!1),children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsxs)(G,{children:["Edit Invoice - ",on.invoiceNumber]}),(0,v.jsx)(J,{onClick:()=>we(!1),children:"\xd7"})]}),(0,v.jsxs)(Q,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Search Manager or Restaurant *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(ne,{type:"text",value:xn,onChange:e=>(e=>{if(un(e),yn(!0),e.length<2)return void gn({managers:[],restaurants:[]});const n=fn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=Fn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));gn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>yn(!0),onBlur:()=>setTimeout(()=>yn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),mn&&(hn.managers.length>0||hn.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[hn.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),hn.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>it("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),hn.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),hn.restaurants.map(e=>{const n=fn.find(n=>n.id===e.admin_id);return(0,v.jsxs)("div",{onClick:()=>it("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),vn&&(0,v.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===vn.type?vn.data.fullName:vn.data.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===vn.type?`${vn.data.companyName} \u2022 Manager`:`${vn.data.address||"No address"} \u2022 Restaurant`})]}),(0,v.jsx)("button",{onClick:()=>{jn(null),un("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,v.jsxs)(Z,{children:[(0,v.jsxs)(X,{children:[(0,v.jsxs)(ee,{children:["Amount (",e.currency||"RM",")"]}),(0,v.jsx)(ne,{type:"number",value:ln.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=Zn(ln.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+n*t.rate/100,0),i=n+t;dn({...ln,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Due Date"}),(0,v.jsx)(ne,{type:"date",value:ln.dueDate,onChange:e=>dn({...ln,dueDate:e.target.value})})]})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Status"}),(0,v.jsxs)(ie,{value:ln.status,onChange:e=>dn({...ln,status:e.target.value}),children:[(0,v.jsx)("option",{value:"draft",children:"Draft"}),(0,v.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,v.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,v.jsx)("option",{value:"paid",children:"Paid"}),(0,v.jsx)("option",{value:"overdue",children:"Overdue"}),(0,v.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Invoice Category"}),(0,v.jsx)(ie,{value:ln.invoiceCategory||"service",onChange:e=>dn({...ln,invoiceCategory:e.target.value}),children:_n.length>0?_n.filter(e=>"subscription"!==e.code).map(e=>(0,v.jsx)("option",{value:e.code,children:e.name},e.id)):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"service",children:"Service"}),(0,v.jsx)("option",{value:"consulting",children:"Consulting"}),(0,v.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(ln.invoiceCategory||"service")&&(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Item/Description"}),(0,v.jsx)(te,{value:"others"===ln.invoiceCategory?ln.customDescription||"":ln.serviceDescription||"",onChange:e=>{"others"===ln.invoiceCategory?dn({...ln,customDescription:e.target.value}):dn({...ln,serviceDescription:e.target.value})},placeholder:`Enter ${ln.invoiceCategory||"service"} description...`,rows:2})]}),(0,v.jsxs)(re,{children:[(0,v.jsxs)(ae,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:ln.currency?(0,l.vv)(parseFloat(ln.amount||"0"),ln.currency):"-"})]}),Zn(ln.currency||"").filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(ln.amount||"0")*e.rate/100;return(0,v.jsxs)(ae,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:ln.currency?(0,l.vv)(t,ln.currency):"-"})]},n)}),(0,v.jsxs)(ae,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:ln.currency?(0,l.vv)(parseFloat(ln.total||"0"),ln.currency):"-"})})]})]}),(0,v.jsxs)(X,{style:{marginTop:"16px"},children:[(0,v.jsxs)(ee,{children:["Modification Reason ","automatic"===(null===on||void 0===on?void 0:on.type)&&(0,v.jsx)("span",{style:{color:"#EF4444"},children:"*"})]}),(0,v.jsx)(te,{value:cn,onChange:e=>pn(e.target.value),placeholder:"Enter reason for modification...",rows:2})]}),(null===on||void 0===on?void 0:on.modificationHistory)&&on.modificationHistory.length>0&&(0,v.jsxs)("div",{style:{marginTop:"16px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#92400E",marginBottom:"8px"},children:"Modification History"}),on.modificationHistory.map((e,n)=>(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:n<on.modificationHistory.length-1?"8px":"0",paddingBottom:n<on.modificationHistory.length-1?"8px":"0",borderBottom:n<on.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,v.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,v.jsxs)("div",{style:{marginTop:"2px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,v.jsx)("div",{style:{marginTop:"2px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[n,t]=e;return(0,v.jsxs)("span",{style:{marginRight:"8px"},children:[n,": ",String(t.from)," \u2192 ",String(t.to)]},n)})})]},n))]})]}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(on&&ln){if("automatic"===on.type&&!cn.trim())return He("Please enter a reason for modifying this invoice."),void Ue(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${on.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(ln.amount),tax:parseFloat(ln.tax),total:parseFloat(ln.total),dueDate:ln.dueDate,status:ln.status,payerType:ln.payerType,payerId:ln.payerId,items:ln.items,modificationReason:cn.trim()||void 0})});if(n.ok){const e={...on,amount:parseFloat(ln.amount),tax:parseFloat(ln.tax),total:parseFloat(ln.total),dueDate:ln.dueDate,status:ln.status,payerType:ln.payerType,payerId:ln.payerId,items:ln.items};c(r.map(n=>n.id===on.id?e:n)),we(!1),sn(null),dn(null),He("Invoice updated successfully!"),Ue(!0)}else{const e=await n.json();He(`Failed to update invoice: ${e.error||"Unknown error"}`),Ue(!0)}}catch(e){console.error("Error updating invoice:",e),He("Error updating invoice. Please try again."),Ue(!0)}}},children:"Save Changes"})]})]})}),Se&&on&&(0,v.jsx)(Y,{onClick:()=>Ae(!1),children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Send Invoice"}),(0,v.jsx)(J,{onClick:()=>Ae(!1),children:"\xd7"})]}),(0,v.jsx)(Q,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,v.jsx)("strong",{children:on.invoiceNumber})," to ",(0,v.jsx)("strong",{children:on.managerName||on.customerName}),"?"]}),(0,v.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:on.invoiceNumber})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:on.managerName||on.customerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:on.customerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,v.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,l.vv)(on.total,on.currency||"USD")})]})]})]})}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>Ae(!1),children:"Cancel"}),(0,v.jsx)(j,{variant:"success",onClick:async()=>{if(on)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${on.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await Gn(),Ae(!1),sn(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Confirm"})]})]})}),Ee&&on&&(0,v.jsx)(Y,{onClick:()=>Ne(!1),children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Resend Invoice"}),(0,v.jsx)(J,{onClick:()=>Ne(!1),children:"\xd7"})]}),(0,v.jsx)(Q,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,v.jsx)("strong",{children:on.invoiceNumber})," to ",(0,v.jsx)("strong",{children:on.managerName}),"?"]}),(0,v.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>Ne(!1),children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",onClick:()=>{on&&(Ne(!1),sn(null))},children:"Resend Invoice"})]})]})}),De&&on&&(0,v.jsx)(Y,{onClick:()=>Te(!1),children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Cancel Invoice"}),(0,v.jsx)(J,{onClick:()=>Te(!1),children:"\xd7"})]}),(0,v.jsx)(Q,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,v.jsx)("strong",{children:on.invoiceNumber}),"?"]}),(0,v.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,v.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,v.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,v.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:on.invoiceNumber})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:on.managerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,v.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,l.vv)(on.total,on.currency||"USD")})]})]})]})}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>Te(!1),children:"Keep Invoice"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(on)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${on.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await Gn(),Te(!1),sn(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),ze&&on&&(0,v.jsx)(Y,{onClick:()=>Ie(!1),children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Delete Invoice"}),(0,v.jsx)(J,{onClick:()=>Ie(!1),children:"\xd7"})]}),(0,v.jsx)(Q,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,v.jsxs)("strong",{children:["#",on.invoiceNumber]}),"?",(0,v.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>Ie(!1),children:"Keep Invoice"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(on)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${on.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await Gn(),Ie(!1),sn(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),$e&&Le&&(0,v.jsx)(Y,{onClick:()=>_e(!1),children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Send Invoice via Email"}),(0,v.jsx)(J,{onClick:()=>_e(!1),children:"\xd7"})]}),(0,v.jsxs)(Q,{children:[(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Invoice"}),(0,v.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Le.invoiceNumber}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:Le.customerName}),(0,v.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,l.vv)(Le.total,Le.currency||"MYR")})]})]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(ee,{children:"Recipient Email *"}),(0,v.jsx)(ne,{type:"email",value:Pe,onChange:e=>Me(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,v.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:Pe?(0,v.jsxs)(v.Fragment,{children:["Default email for ","restaurant"===Le.payerType?"Restaurant":"foodcourt_manager"===Le.payerType?"Foodcourt Manager":"brand_manager"===Le.payerType?"Brand Manager":"Customer"]}):(0,v.jsxs)(v.Fragment,{children:["Enter the ","restaurant"===Le.payerType?"restaurant":"foodcourt_manager"===Le.payerType?"foodcourt manager":"brand_manager"===Le.payerType?"brand manager":"customer"," email address"]})})]}),(0,v.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,v.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,v.jsxs)(K,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>{_e(!1),We(null),Me("")},children:"Cancel"}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(!Le||!Pe)return He("Please enter a valid email address."),void Ue(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Le.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:Pe})});if(n.ok)He(`Invoice sent successfully to ${Pe}`),_e(!1),We(null),Me("");else{const e=await n.json();He(e.error||"Failed to send invoice email.")}Ue(!0)}catch(e){console.error("Error sending invoice email:",e),He("Failed to send invoice email. Please try again."),Ue(!0)}},disabled:!Pe||!Pe.includes("@"),children:"Send Email"})]})]})}),Re&&(0,v.jsx)(Y,{onClick:()=>Ue(!1),children:(0,v.jsxs)(V,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(q,{children:[(0,v.jsx)(G,{children:"Success"}),(0,v.jsx)(J,{onClick:()=>Ue(!1),children:"\xd7"})]}),(0,v.jsx)(Q,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,v.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Oe})})}),(0,v.jsx)(K,{children:(0,v.jsx)(j,{variant:"primary",onClick:()=>Ue(!1),children:"OK"})})]})})]})]})})}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var i=t(4752),r=t(9610),a=t(4414);const o=i.Ay.div`
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