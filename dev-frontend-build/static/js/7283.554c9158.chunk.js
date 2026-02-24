"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7283],{2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var i=t(4752),r=t(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i}=e;return(0,r.jsx)(a,{className:t,style:i,children:n})},d=e=>{let{active:n,onClick:t,children:i,className:a}=e;return(0,r.jsx)(o,{active:n,onClick:t,className:a,children:i})},c=e=>{let{count:n,variant:t="default",showZero:i=!1}=e;return 0!==n||i?(0,r.jsx)(s,{variant:t,children:n}):null}},7283:(e,n,t)=>{t.r(n),t.d(n,{default:()=>re});var i=t(9950),r=t(4752),a=t(4492),o=t(3310),s=t(6038),l=t(9018),d=t(4728),c=t(7617),p=t(2674),x=t(2488),h=t(2597),u=t(5612),m=t(1052),g=t.n(m),y=t(4414);r.Ay.div`
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
`,ne=r.Ay.select`
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
`,te=r.Ay.div`
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
`,()=>{const{operationSettings:e}=(0,l.Pj)(),[n,t]=(0,a.ok)(),[r,d]=(0,i.useState)([]),[m,re]=(0,i.useState)(""),[ae,oe]=(0,i.useState)("month"),[se,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(()=>{const e=new Date,n=new Date(e.getFullYear(),e.getMonth(),1),t=new Date(e.getFullYear(),e.getMonth()+1,0),i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:i(n),end:i(t)}}),[pe,xe]=(0,i.useState)(!1),[he,ue]=(0,i.useState)(!1),[me,ge]=(0,i.useState)(!1),[ye,ve]=(0,i.useState)(!1),[je,fe]=(0,i.useState)(!1),[be,we]=(0,i.useState)(!1),[Ce,ke]=(0,i.useState)(!1),[Fe,Be]=(0,i.useState)(!1),[Se,Ae]=(0,i.useState)(!1),[Ne,Ee]=(0,i.useState)(""),[De,Ie]=(0,i.useState)(null),[ze,Te]=(0,i.useState)(!1),[$e,Pe]=(0,i.useState)(""),_e=n.get("tab")||"invoices",Le=e=>{t({tab:e})},[Me,We]=(0,i.useState)(!1),[Re,Ue]=(0,i.useState)(null),[Oe,He]=(0,i.useState)({name:"",code:"",description:""}),[Ye,Ve]=(0,i.useState)(!1),[qe,Ge]=(0,i.useState)(!1),[Je,Qe]=(0,i.useState)(null),[Ke,Ze]=(0,i.useState)(null),[Xe,en]=(0,i.useState)(null),[nn,tn]=(0,i.useState)(""),[rn,an]=(0,i.useState)({managers:[],restaurants:[]}),[on,sn]=(0,i.useState)(!1),[ln,dn]=(0,i.useState)(null),[cn,pn]=(0,i.useState)([]),[xn,hn]=(0,i.useState)([]),[un,mn]=(0,i.useState)({managers:[],restaurants:[]}),[gn,yn]=(0,i.useState)(""),[vn,jn]=(0,i.useState)(!1),[fn,bn]=(0,i.useState)(null),[wn,Cn]=(0,i.useState)(null),[kn,Fn]=(0,i.useState)({}),[Bn,Sn]=(0,i.useState)([]),[An,Nn]=(0,i.useState)([]),[En,Dn]=(0,i.useState)([{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]),[In,zn]=(0,i.useState)({enabled:!1,rate:0,name:"Tax"}),[Tn,$n]=(0,i.useState)("issueDate"),[Pn,_n]=(0,i.useState)("desc"),[Ln,Mn]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:""}),Wn=e=>{oe(e),le(!1);const n=new Date;let t=new Date,i=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":break;case"week":t.setDate(n.getDate()-n.getDay());break;case"month":t=new Date(n.getFullYear(),n.getMonth(),1),i=new Date(n.getFullYear(),n.getMonth()+1,0);break;case"year":t=new Date(n.getFullYear(),0,1),i=new Date(n.getFullYear(),11,31);break;case"all":t=new Date(2e3,0,1)}ce({start:r(t),end:r(i)})},Rn=(e,n)=>{le(!0),ce(t=>({...t,[e]:n}))},Un=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void d([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),d(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),d([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),d([])}},On=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&Nn(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Hn=e=>{e?(Ue(e),He({name:e.name,code:e.code,description:e.description||""})):(Ue(null),He({name:"",code:"",description:""})),We(!0)},Yn=()=>{We(!1),Ue(null),He({name:"",code:"",description:""})};(0,i.useEffect)(()=>{Un(),qn(),Gn(),Kn(),Vn(),On(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/admin/payment-settings",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();if(e.additionalCharges&&Array.isArray(e.additionalCharges)){Dn(e.additionalCharges);const n=e.additionalCharges.find(e=>e.enabled);n&&zn({enabled:n.enabled,rate:parseFloat(n.rate)||0,name:n.name||"Tax"})}}}catch(e){console.error("Error fetching payment settings:",e)}})()},[]);const Vn=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&Fn(n.currencies)}const n=await fetch("/api/currencies/supported");if(n.ok){const e=await n.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);Sn(n)}}}catch(e){console.error("Error fetching currency config:",e)}},qn=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...t]}if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...n]}console.log("Fetched managers (General only):",i.length),pn(i)}catch(e){console.error("Error fetching managers:",e),pn([])}},Gn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"USD"}});hn(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),hn([])}catch(e){console.error("Error fetching restaurants:",e),hn([])}},Jn=(e,n)=>{if(dn({type:e,data:n}),tn("manager"===e?n.fullName:n.name),sn(!1),"manager"===e){const e=n;en({...Xe,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=cn.find(n=>n.id===e.admin_id);en({...Xe,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},Qn=async(e,n)=>{bn({type:e,data:n}),jn(!1),yn("manager"===e?n.fullName:n.name);const t=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=n;try{const n=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var r;const n=await e.json(),t=n.data||n,a=null===(r=t.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=t.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",a,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var a;const n=await e.json(),t=n.data||n,r=null===(a=t.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=t.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",r,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}Mn({...Ln,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i})}else{const e=n,r=cn.find(n=>n.id===e.admin_id);try{const n=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){i=(await n.json()).currency||"USD"}}catch(o){console.error("Error fetching restaurant currency:",o)}Mn({...Ln,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:r?r.fullName:"",companyName:e.name,currency:i})}},Kn=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();Cn(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),Cn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),Cn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},Zn=e=>{if(!wn)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${wn.companyLogo?`<img src="${wn.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${wn.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${wn.address?`${wn.address}, `:""}${[wn.city,wn.state,wn.postalCode].filter(Boolean).join(", ")}${wn.address||wn.city||wn.state||wn.postalCode?"<br>":""}\n                    ${wn.country?`${wn.country}<br>`:""}\n                    ${wn.phone?`Tel: ${wn.phone}<br>`:""}\n                    ${wn.email?`Email: ${wn.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${ut(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${ut(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${ut(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,s.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,s.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,s.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${(e.additionalCharges||[]).map(n=>`\n                <div class="summary-row tax">\n                    <span>${n.name} (${n.rate}%):</span>\n                    <span>${(0,s.vv)(n.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,s.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${wn.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${wn.bankName}<br>\n                <strong>Account Name:</strong> ${wn.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${wn.bankAccount||"-"}\n                ${wn.swiftCode?`<br><strong>SWIFT Code:</strong> ${wn.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${wn.taxNumber||wn.registrationNumber?`\n        <div class="registration-info">\n            ${wn.registrationNumber?`Reg No: ${wn.registrationNumber}`:""}\n            ${wn.registrationNumber&&wn.taxNumber?" | ":""}\n            ${wn.taxNumber?`Tax No: ${wn.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},Xn=async e=>{if(!wn)return Pe("Company settings not loaded. Please try again."),void Te(!0);try{var n;const t=Zn(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(t),r.close(),await new Promise(async e=>{try{var n;null!==(n=r.fonts)&&void 0!==n&&n.ready&&await r.fonts.ready}catch{}const t=r.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const a=await g()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new u.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),Pe("Failed to generate PDF. Please try again."),Te(!0)}},et=e=>{if(!wn)return Pe("Company settings not loaded. Please try again."),void Te(!0);const n=Zn(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},nt=async e=>{Ie(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=xn.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=cn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=cn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}Ee(n),Ae(!0)},tt=()=>{Mn({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:""}),bn(null),yn(""),jn(!1)},it=e=>{if("pending_payment"!==e.status)return!1;const n=new Date;return new Date(e.dueDate)<n},rt=e=>it(e)?"overdue":e.status,at=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},ot=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},st=r.filter(e=>{const n=m.toLowerCase(),t=at(e.status).toLowerCase(),i="automatic"===e.type?"auto automatic":"manual",r=(e.planType||"").toLowerCase(),a=(e.categoryDisplayName||"").toLowerCase(),o=(e.customerName||e.restaurantName||"").toLowerCase(),s=ot(e.payerType||"restaurant").toLowerCase(),l=!m||e.companyName.toLowerCase().includes(n)||e.invoiceNumber.toLowerCase().includes(n)||e.managerName.toLowerCase().includes(n)||t.includes(n)||i.includes(n)||r.includes(n)||a.includes(n)||o.includes(n)||s.includes(n)||(e.billingPeriod||"").toLowerCase().includes(n);let d=!0;if(de.start&&de.end){const n=new Date(e.issueDate),t=new Date(de.start),i=new Date(de.end);t.setHours(0,0,0,0),i.setHours(23,59,59,999),d=n>=t&&n<=i}return l&&d}).sort((e,n)=>{let t=0;switch(Tn){case"invoiceNumber":t=e.invoiceNumber.localeCompare(n.invoiceNumber);break;case"companyName":t=e.companyName.localeCompare(n.companyName);break;case"issueDate":default:t=new Date(e.issueDate).getTime()-new Date(n.issueDate).getTime();break;case"dueDate":t=new Date(e.dueDate).getTime()-new Date(n.dueDate).getTime();break;case"amount":t=e.total-n.total;break;case"status":t=(e.status||"").localeCompare(n.status||"")}return"desc"===Pn?-t:t}),lt=e=>{Tn===e?_n("asc"===Pn?"desc":"asc"):($n(e),_n("dueDate"===e||"amount"===e?"desc":"asc"))},dt=e=>Tn!==e?"":"asc"===Pn?" \u25b2":" \u25bc",ct=r.length,pt=r.filter(e=>"paid"===e.status).length,xt=r.filter(e=>it(e)).length,ht=r.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),ut=e=>new Date(e).toLocaleDateString("en-MY"),mt=e=>{Ze(e),ue(!0)},gt=e=>{var n,t;if(Ze(e),en({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=xn.find(n=>n.id===e.restaurantId);n&&(dn({type:"restaurant",data:n}),tn(n.name))}else if(e.managerId){const n=cn.find(n=>n.id===e.managerId);n&&(dn({type:"manager",data:n}),tn(n.fullName))}ge(!0)},yt=e=>{Ze(e),Be(!0)};return(0,y.jsx)(o.A,{children:(0,y.jsxs)(p.mc,{children:[(0,y.jsxs)(p.Y9,{children:[(0,y.jsx)(p.hE,{children:"Invoices"}),(0,y.jsx)(p.ex,{})]}),(0,y.jsxs)(p.UC,{children:[(0,y.jsxs)(p.MD,{children:[(0,y.jsxs)(p.hI,{color:"#059669",children:[(0,y.jsx)(p.Os,{children:ct}),(0,y.jsx)(p.v0,{children:"Total Invoices"}),(0,y.jsx)(p.d1,{children:"All invoice records"})]}),(0,y.jsxs)(p.hI,{color:"#2563EB",children:[(0,y.jsx)(p.Os,{children:pt}),(0,y.jsx)(p.v0,{children:"Paid Invoices"}),(0,y.jsxs)(p.d1,{children:[ct>0?Math.round(pt/ct*100):0,"% completed"]})]}),(0,y.jsxs)(p.hI,{color:"#DC2626",children:[(0,y.jsx)(p.Os,{children:xt}),(0,y.jsx)(p.v0,{children:"Overdue Invoices"}),(0,y.jsx)(p.d1,{children:"Requires attention"})]}),(0,y.jsxs)(p.hI,{color:"#7C3AED",children:[(0,y.jsx)(p.Os,{children:(0,s.vv)(ht)}),(0,y.jsx)(p.v0,{children:"Total Revenue"}),(0,y.jsx)(p.d1,{children:"From paid invoices"})]})]}),(0,y.jsxs)(h.tU,{children:[(0,y.jsx)(h.oz,{active:"invoices"===_e,onClick:()=>Le("invoices"),children:"Invoices"}),(0,y.jsxs)(h.oz,{active:"payment_submitted"===_e,onClick:()=>Le("payment_submitted"),children:["Payment Submitted",(0,y.jsx)(h.Ex,{count:r.filter(e=>"payment_submitted"===e.status).length,variant:"danger"})]}),(0,y.jsx)(h.oz,{active:"categories"===_e,onClick:()=>Le("categories"),children:"Invoice Categories"})]}),"invoices"===_e&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(M,{children:(0,y.jsxs)(W,{children:[(0,y.jsx)(x.DO,{placeholder:"Search invoices... (status, type, customer, etc.)",value:m,onChange:e=>re(e.target.value),style:{minWidth:"280px",maxWidth:"350px"}}),(0,y.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginLeft:"16px"},children:[(0,y.jsx)(R,{active:"week"===ae&&!se,onClick:()=>Wn("week"),children:"Week"}),(0,y.jsx)(R,{active:"month"===ae&&!se,onClick:()=>Wn("month"),children:"Month"}),(0,y.jsx)(R,{active:"year"===ae&&!se,onClick:()=>Wn("year"),children:"Year"}),(0,y.jsx)(R,{active:"all"===ae&&!se,onClick:()=>Wn("all"),children:"All"}),(0,y.jsx)(U,{type:"date",value:de.start,onChange:e=>Rn("start",e.target.value)}),(0,y.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,y.jsx)(U,{type:"date",value:de.end,onChange:e=>Rn("end",e.target.value)})]}),(0,y.jsx)("div",{style:{marginLeft:"auto"},children:(0,y.jsx)(v,{variant:"primary",onClick:()=>{tt(),xe(!0)},children:"Create Invoice"})})]})}),(0,y.jsxs)(p.an,{children:[(0,y.jsxs)(p.bQ,{children:[(0,y.jsx)(p.B_,{children:(0,y.jsxs)("tr",{children:[(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>lt("invoiceNumber"),children:["Invoice",dt("invoiceNumber")]}),(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>lt("companyName"),children:["Customer",dt("companyName")]}),(0,y.jsx)(p.gU,{align:"center",children:"Period"}),(0,y.jsx)(p.gU,{align:"center",children:"Issued"}),(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>lt("dueDate"),children:["Due",dt("dueDate")]}),(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>lt("status"),children:["Status",dt("status")]}),(0,y.jsxs)(p.gU,{align:"right",style:{cursor:"pointer"},onClick:()=>lt("amount"),children:["Amount",dt("amount")]}),(0,y.jsx)(p.gU,{align:"right",children:"Total"}),(0,y.jsx)(p.gU,{isActions:!0,children:"Actions"})]})}),(0,y.jsx)("tbody",{children:st.map(e=>(0,y.jsxs)(p.J2,{children:[(0,y.jsx)(p.Bv,{"data-label":"Invoice",children:(0,y.jsxs)(j,{children:[(0,y.jsxs)(f,{children:[e.invoiceNumber,"automatic"===e.type&&(0,y.jsx)(w,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,y.jsx)(b,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,y.jsx)(p.Bv,{"data-label":"Customer",children:(0,y.jsxs)(j,{children:[(0,y.jsx)(f,{children:e.customerName||e.restaurantName||"Unknown"}),(0,y.jsx)(b,{children:ot(e.payerType||"restaurant")})]})}),(0,y.jsx)(p.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,y.jsx)(p.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:ut(e.issueDate)}),(0,y.jsx)(p.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:ut(e.dueDate)}),(0,y.jsx)(p.Bv,{"data-label":"Status",align:"center",children:(0,y.jsx)(C,{status:rt(e),children:at(rt(e))})}),(0,y.jsx)(p.Bv,{"data-label":"Amount",align:"right",children:(0,y.jsx)(p.DM,{children:(0,s.vv)(e.amount,e.currency||"USD")})}),(0,y.jsx)(p.Bv,{"data-label":"Total",align:"right",children:(0,y.jsx)(p.DM,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"USD")})}),(0,y.jsx)(p.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,y.jsxs)(p.wr,{children:[(0,y.jsx)(k,{variant:"primary",onClick:()=>mt(e),children:"View"}),"draft"===e.status&&(0,y.jsxs)(y.Fragment,{children:["automatic"!==e.type&&(0,y.jsx)(k,{onClick:()=>gt(e),children:"Edit"}),(0,y.jsx)(k,{variant:"success",onClick:()=>(e=>{Ze(e),fe(!0)})(e),title:"Send Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,y.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,y.jsx)(F,{onClick:()=>yt(e),title:"Delete Invoice",children:(0,y.jsx)(B,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,y.jsxs)(y.Fragment,{children:["automatic"!==e.type&&(0,y.jsx)(k,{onClick:()=>gt(e),children:"Edit"}),(0,y.jsx)(k,{onClick:()=>Xn(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>et(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,y.jsx)(k,{variant:"email",onClick:()=>nt(e),title:"Send Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,y.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,y.jsx)(F,{onClick:()=>yt(e),title:"Delete Invoice",children:(0,y.jsx)(B,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,y.jsxs)(y.Fragment,{children:[e.hasPaymentInfo&&(0,y.jsx)(k,{variant:"primary",onClick:()=>(e=>{Ze(e),ve(!0)})(e),children:"Confirm"}),(0,y.jsx)(k,{onClick:()=>Xn(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>et(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,y.jsx)(k,{variant:"email",onClick:()=>nt(e),title:"Resend Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,y.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,y.jsxs)(y.Fragment,{children:["automatic"!==e.type&&(0,y.jsx)(k,{onClick:()=>gt(e),children:"Edit"}),(0,y.jsx)(k,{onClick:()=>Xn(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>et(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,y.jsx)(k,{variant:"email",onClick:()=>nt(e),title:"Resend Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,y.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,y.jsx)(F,{onClick:()=>yt(e),title:"Delete Invoice",children:(0,y.jsx)(B,{children:"\xd7"})})]}),"paid"===e.status&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(k,{onClick:()=>Xn(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>et(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,y.jsx)(k,{onClick:()=>Xn(e),title:"Download Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id))})]}),0===st.length&&(0,y.jsxs)(p.ys,{children:[(0,y.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,y.jsx)("div",{style:{fontSize:"14px"},children:0===r.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"payment_submitted"===_e&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"Payment Confirmation Required"}),(0,y.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:0},children:"These invoices have payment submitted and are waiting for your confirmation."})]}),(0,y.jsxs)(p.an,{children:[(0,y.jsxs)(p.bQ,{children:[(0,y.jsx)(p.B_,{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(p.gU,{align:"center",children:"Invoice"}),(0,y.jsx)(p.gU,{align:"center",children:"Customer"}),(0,y.jsx)(p.gU,{align:"center",children:"Payment Method"}),(0,y.jsx)(p.gU,{align:"center",children:"Submitted Date"}),(0,y.jsx)(p.gU,{align:"right",children:"Amount"}),(0,y.jsx)(p.gU,{isActions:!0,children:"Actions"})]})}),(0,y.jsx)("tbody",{children:r.filter(e=>"payment_submitted"===e.status).map(e=>(0,y.jsxs)(p.J2,{children:[(0,y.jsx)(p.Bv,{"data-label":"Invoice",children:(0,y.jsxs)(j,{children:[(0,y.jsx)(f,{children:e.invoiceNumber}),(0,y.jsx)(b,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,y.jsx)(p.Bv,{"data-label":"Customer",children:(0,y.jsxs)(j,{children:[(0,y.jsx)(f,{children:e.customerName||e.restaurantName||"Unknown"}),(0,y.jsx)(b,{children:e.companyName})]})}),(0,y.jsx)(p.Bv,{"data-label":"Payment Method",align:"center",children:e.paymentMethod||"-"}),(0,y.jsx)(p.Bv,{"data-label":"Submitted",align:"center",children:e.paidDate?ut(e.paidDate):"-"}),(0,y.jsx)(p.Bv,{"data-label":"Amount",align:"right",children:(0,y.jsx)(p.DM,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"USD")})}),(0,y.jsx)(p.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,y.jsxs)(p.wr,{children:[(0,y.jsx)(k,{onClick:()=>mt(e),children:"View"}),(0,y.jsx)(k,{variant:"primary",onClick:()=>{Ze(e),ve(!0)},children:"Confirm Payment"})]})})]},e.id))})]}),0===r.filter(e=>"payment_submitted"===e.status).length&&(0,y.jsxs)(p.ys,{children:[(0,y.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",marginBottom:"8px"},children:"No Pending Confirmations"}),(0,y.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"There are no invoices waiting for payment confirmation."})]})]})]}),"categories"===_e&&(0,y.jsxs)("div",{style:{padding:"24px 0"},children:[(0,y.jsxs)(_,{children:[(0,y.jsxs)("div",{children:[(0,y.jsx)(L,{children:"Invoice Categories"}),(0,y.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,y.jsx)(v,{variant:"primary",onClick:()=>Hn(),children:"Add Category"})]}),0===An.length?(0,y.jsxs)(P,{children:[(0,y.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,y.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,y.jsx)(v,{variant:"primary",onClick:()=>Hn(),children:"Add Category"})]}):(0,y.jsx)(S,{children:An.map(e=>(0,y.jsxs)(A,{isActive:e.is_active,children:[(0,y.jsx)(N,{children:e.name.charAt(0).toUpperCase()}),(0,y.jsxs)(E,{children:[(0,y.jsxs)(D,{children:[e.name,(0,y.jsx)(T,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,y.jsxs)(I,{children:[(0,y.jsxs)("span",{children:["Code: ",(0,y.jsx)("strong",{children:e.code})]}),e.description&&(0,y.jsx)("span",{children:e.description})]})]}),(0,y.jsxs)(z,{children:[(0,y.jsx)($,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({is_active:!e.is_active})});(await t.json()).success&&On()}catch(n){console.error("Failed to toggle category:",n)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,y.jsx)("circle",{cx:"12",cy:"12",r:"3"})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,y.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})})}),(0,y.jsx)($,{onClick:()=>Hn(e),title:"Edit Category",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,y.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,y.jsx)($,{onClick:()=>(e=>{Qe(e),Ge(!0)})(e),title:"Delete Category",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,y.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),Me&&(0,y.jsx)(O,{onClick:Yn,children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:Re?"Edit Category":"Add Category"}),(0,y.jsx)(q,{onClick:Yn,children:"\xd7"})]}),(0,y.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Oe.name.trim()&&Oe.code.trim())try{Ve(!0);const e=localStorage.getItem("auth_token"),n=Re?`/api/invoices/categories/${Re.id}`:"/api/invoices/categories",t=Re?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:Oe.name.trim(),code:Oe.code.trim().toLowerCase().replace(/\s+/g,"_"),description:Oe.description.trim()||null})}),r=await i.json();r.success?(Yn(),On()):alert(r.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{Ve(!1)}},children:[(0,y.jsxs)(G,{children:[(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Name *"}),(0,y.jsx)(X,{value:Oe.name,onChange:e=>He({...Oe,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Code *"}),(0,y.jsx)(X,{value:Oe.code,onChange:e=>He({...Oe,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Re||void 0===Re?void 0:Re.is_system}),(0,y.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Description"}),(0,y.jsx)(ee,{value:Oe.description,onChange:e=>He({...Oe,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",type:"button",onClick:Yn,children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",type:"submit",disabled:Ye||!Oe.name||!Oe.code,children:Ye?"Saving...":Re?"Update":"Create"})]})]})]})}),(0,y.jsx)(c.A,{isOpen:qe,onCancel:()=>Ge(!1),onConfirm:async()=>{if(Je)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${Je.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(Ge(!1),Qe(null),On()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===Je||void 0===Je?void 0:Je.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),pe&&(0,y.jsx)(O,{onClick:e=>{e.target===e.currentTarget&&(xe(!1),tt())},children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Create Invoice"}),(0,y.jsx)(q,{onClick:()=>{xe(!1),tt()},children:"\xd7"})]}),(0,y.jsxs)(G,{children:[(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Search Manager or Restaurant *"}),(0,y.jsxs)("div",{style:{position:"relative"},children:[(0,y.jsx)(X,{type:"text",value:gn,onChange:e=>(e=>{if(yn(e),jn(!0),e.length<2)return void mn({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",cn),console.log("Available restaurants:",xn);const n=cn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=xn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),mn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>jn(!0),onBlur:()=>setTimeout(()=>jn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),vn&&(un.managers.length>0||un.restaurants.length>0)&&(0,y.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[un.managers.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),un.managers.map(e=>(0,y.jsxs)("div",{onClick:()=>Qn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),un.restaurants.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),un.restaurants.map(e=>{const n=cn.find(n=>n.id===e.admin_id);return(0,y.jsxs)("div",{onClick:()=>Qn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),fn&&(0,y.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===fn.type?fn.data.fullName:fn.data.name}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===fn.type?`${fn.data.companyName} \u2022 Manager`:`${fn.data.address||"No address"} \u2022 Restaurant`})]}),(0,y.jsx)("button",{onClick:()=>{bn(null),yn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,y.jsxs)(Q,{children:[(0,y.jsxs)(K,{children:[(0,y.jsxs)(Z,{children:["Amount",Ln.currency?` (${Ln.currency})`:""," *"]}),(0,y.jsx)(X,{type:"number",step:Ln.currency&&0===(0,s.e_)(Ln.currency)?"1":"0.01",min:"0",value:Ln.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=En.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+n*t.rate/100,0),i=n+t;Mn({...Ln,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})},onBlur:e=>{if(e.target.value&&Ln.currency){const n=(0,s.e_)(Ln.currency),t=parseFloat(e.target.value)||0,i=t.toFixed(n),r=En.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+t*n.rate/100,0),a=t+r;Mn({...Ln,amount:i,tax:r.toFixed(n),total:a.toFixed(n)})}},placeholder:Ln.currency&&0===(0,s.e_)(Ln.currency)?"0":"0.00",required:!0,disabled:!fn}),!fn&&(0,y.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Due Date *"}),(0,y.jsx)(X,{type:"date",value:Ln.dueDate,onChange:e=>Mn({...Ln,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Invoice Category"}),(0,y.jsx)(ne,{value:Ln.invoiceCategory||"service",onChange:e=>Mn({...Ln,invoiceCategory:e.target.value}),children:An.length>0?An.filter(e=>"subscription"!==e.code).map(e=>(0,y.jsx)("option",{value:e.code,children:e.name},e.id)):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("option",{value:"service",children:"Service"}),(0,y.jsx)("option",{value:"consulting",children:"Consulting"}),(0,y.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Ln.invoiceCategory||"service")&&(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Item/Description"}),(0,y.jsx)(ee,{value:"others"===Ln.invoiceCategory?Ln.customDescription||"":Ln.serviceDescription||"",onChange:e=>{"others"===Ln.invoiceCategory?Mn({...Ln,customDescription:e.target.value}):Mn({...Ln,serviceDescription:e.target.value})},placeholder:`Enter ${Ln.invoiceCategory||"service"} description...`,rows:2})]}),(0,y.jsxs)(te,{children:[(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:Ln.currency?(0,s.vv)(parseFloat(Ln.amount||"0"),Ln.currency):"-"})]}),En.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(Ln.amount||"0")*e.rate/100;return(0,y.jsxs)(ie,{children:[(0,y.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,y.jsx)("span",{children:Ln.currency?(0,s.vv)(t,Ln.currency):"-"})]},n)}),(0,y.jsxs)(ie,{highlight:!0,children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:Ln.currency?(0,s.vv)(parseFloat(Ln.total||"0"),Ln.currency):"-"})})]})]})]}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>{xe(!1),tt()},children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(fn&&Ln.amount&&Ln.dueDate)try{const e=parseFloat(Ln.amount),n=En.filter(e=>e.enabled&&e.name&&e.rate>0).map(n=>({name:n.name,rate:n.rate,amount:Math.round(e*n.rate/100*100)/100})),t=n.reduce((e,n)=>e+n.amount,0),i=e+t;let r="";r="others"===Ln.invoiceCategory?Ln.customDescription||"":Ln.serviceDescription||"";let a="",o="",s="",l="";if("restaurant"===fn.type){const e=fn.data;a=e.name,l=e.name,s=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),o=n.join("\n")}else if("manager"===fn.type){const e=fn.data;a=e.fullName,s=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),o=n.join("\n")}let d="restaurant";if("manager"===fn.type){const e=fn.data;"Brand General"===e.role||"Brand Manager"===e.role?d="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(d="foodcourt_manager")}const c={restaurant_id:"restaurant"===fn.type?fn.data.id:null,payer_type:d,payer_id:"manager"===fn.type?fn.data.id:null,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(Ln.dueDate).toISOString(),total_amount:i,currency:Ln.currency||"USD",status:"draft",notes:`${s}\n${a}\n${o}\n\n${r}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:Ln.invoiceCategory||"service",additional_charges:n},p=[{item_type:Ln.invoiceCategory,description:r,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],x=localStorage.getItem("auth_token"),h=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x}`},body:JSON.stringify({invoice_data:c,items:p})});if(h.ok)await Un(),xe(!1),tt();else{const e=await h.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!fn||!Ln.amount||!Ln.dueDate,children:"Create Invoice"})]})]})}),he&&Ke&&(0,y.jsx)(O,{onClick:()=>ue(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Invoice Details"}),(0,y.jsx)(q,{onClick:()=>ue(!1),children:"\xd7"})]}),(0,y.jsxs)(G,{children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,y.jsxs)("div",{children:[(null===wn||void 0===wn?void 0:wn.companyLogo)&&(0,y.jsx)("img",{src:wn.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,y.jsx)("div",{style:{fontSize:null!==wn&&void 0!==wn&&wn.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===wn||void 0===wn?void 0:wn.companyName)||"Company Name"}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===wn||void 0===wn?void 0:wn.address)&&(0,y.jsxs)("span",{children:[wn.address,", "]}),((null===wn||void 0===wn?void 0:wn.city)||(null===wn||void 0===wn?void 0:wn.state)||(null===wn||void 0===wn?void 0:wn.postalCode))&&(0,y.jsx)("span",{children:[null===wn||void 0===wn?void 0:wn.city,null===wn||void 0===wn?void 0:wn.state,null===wn||void 0===wn?void 0:wn.postalCode].filter(Boolean).join(", ")}),(null===wn||void 0===wn?void 0:wn.country)&&(0,y.jsx)("div",{children:wn.country}),(null===wn||void 0===wn?void 0:wn.phone)&&(0,y.jsxs)("div",{children:["Tel: ",wn.phone]}),(null===wn||void 0===wn?void 0:wn.email)&&(0,y.jsxs)("div",{children:["Email: ",wn.email]})]})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,y.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Ke.invoiceNumber}),(0,y.jsx)(C,{status:Ke.status,style:{marginTop:"8px"},children:at(Ke.status)})]})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,y.jsxs)("div",{style:{flex:1},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,y.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:Ke.customerName}),Ke.customerAddress&&(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:Ke.customerAddress}),"restaurant"===Ke.payerType&&Ke.restaurantName&&"Unknown Restaurant"!==Ke.restaurantName&&(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",Ke.restaurantName]}),Ke.companyName&&Ke.companyName!==Ke.customerName&&(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",Ke.companyName]})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ke.billingPeriod||"-"})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ut(Ke.issueDate)})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ut(Ke.dueDate)})]}),Ke.paidDate&&(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ut(Ke.paidDate)})]})]})]}),(0,y.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,y.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,y.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,y.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,y.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,y.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,y.jsx)("tbody",{children:Ke.items.map((e,n)=>(0,y.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.unitPrice,Ke.currency||"MYR")}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.total,Ke.currency||"MYR")})]},n))})]})]}),(0,y.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,y.jsx)("div",{style:{width:"280px"},children:(0,y.jsxs)(te,{children:[(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:(0,s.vv)(Ke.amount,Ke.currency||"MYR")})]}),(Ke.additionalCharges||[]).map((e,n)=>(0,y.jsxs)(ie,{children:[(0,y.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,y.jsx)("span",{children:(0,s.vv)(e.amount,Ke.currency||"MYR")})]},n)),(0,y.jsxs)(ie,{highlight:!0,children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:(0,s.vv)(Ke.total,Ke.currency||"MYR")})})]})]})})}),(null===wn||void 0===wn?void 0:wn.bankName)&&(0,y.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Bank:"})," ",wn.bankName]}),(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Account Name:"})," ",wn.bankAccountName]}),(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Account Number:"})," ",wn.bankAccount]})]})]}),((null===wn||void 0===wn?void 0:wn.taxNumber)||(null===wn||void 0===wn?void 0:wn.registrationNumber))&&(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===wn||void 0===wn?void 0:wn.registrationNumber)&&(0,y.jsxs)("span",{children:["Reg No: ",wn.registrationNumber]}),(null===wn||void 0===wn?void 0:wn.registrationNumber)&&(null===wn||void 0===wn?void 0:wn.taxNumber)&&(0,y.jsx)("span",{children:" | "}),(null===wn||void 0===wn?void 0:wn.taxNumber)&&(0,y.jsxs)("span",{children:["Tax No: ",wn.taxNumber]})]})]})]})}),ye&&Ke&&(0,y.jsx)(O,{onClick:()=>ve(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,y.jsxs)(Y,{children:[(0,y.jsxs)(V,{children:["Confirm Payment - ",Ke.invoiceNumber]}),(0,y.jsx)(q,{onClick:()=>ve(!1),children:"\xd7"})]}),(0,y.jsxs)(G,{children:[(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Invoice Summary"}),(0,y.jsxs)(te,{children:[(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Customer:"}),(0,y.jsx)("span",{children:Ke.customerName||Ke.managerName})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Company:"}),(0,y.jsx)("span",{children:Ke.companyName})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Invoice Number:"}),(0,y.jsx)("span",{children:Ke.invoiceNumber})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Due Date:"}),(0,y.jsx)("span",{children:ut(Ke.dueDate)})]}),(0,y.jsxs)(ie,{highlight:!0,children:[(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:"Payment Amount:"})}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:(0,s.vv)(Ke.total,Ke.currency||"USD")})})]})]})]}),Ke.hasPaymentInfo&&(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Customer's Payment Information"}),(0,y.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,y.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,y.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,y.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===Ke.paymentMethod?"Bank Transfer":"qr_payment"===Ke.paymentMethod?"QR Payment":"stripe"===Ke.paymentMethod?"Stripe":"paypal"===Ke.paymentMethod?"PayPal":Ke.paymentMethod||"Not specified"]}),Ke.transactionId&&(0,y.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,y.jsx)("strong",{children:"Transaction ID:"})," ",Ke.transactionId]})]}),Ke.receiptUrl&&(0,y.jsxs)("div",{style:{marginTop:"12px"},children:[(0,y.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,y.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,y.jsx)("img",{src:Ke.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(Ke.receiptUrl,"_blank")}),(0,y.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,y.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,y.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,y.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,y.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Status Change"}),(0,y.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,y.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>ve(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Ke)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ke.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await Un(),ve(!1),Ze(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),me&&Ke&&Xe&&(0,y.jsx)(O,{onClick:()=>ge(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsxs)(V,{children:["Edit Invoice - ",Ke.invoiceNumber]}),(0,y.jsx)(q,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,y.jsxs)(G,{children:[(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Search Manager or Restaurant *"}),(0,y.jsxs)("div",{style:{position:"relative"},children:[(0,y.jsx)(X,{type:"text",value:nn,onChange:e=>(e=>{if(tn(e),sn(!0),e.length<2)return void an({managers:[],restaurants:[]});const n=cn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=xn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));an({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>sn(!0),onBlur:()=>setTimeout(()=>sn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),on&&(rn.managers.length>0||rn.restaurants.length>0)&&(0,y.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[rn.managers.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),rn.managers.map(e=>(0,y.jsxs)("div",{onClick:()=>Jn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),rn.restaurants.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),rn.restaurants.map(e=>{const n=cn.find(n=>n.id===e.admin_id);return(0,y.jsxs)("div",{onClick:()=>Jn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),ln&&(0,y.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===ln.type?ln.data.fullName:ln.data.name}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===ln.type?`${ln.data.companyName} \u2022 Manager`:`${ln.data.address||"No address"} \u2022 Restaurant`})]}),(0,y.jsx)("button",{onClick:()=>{dn(null),tn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,y.jsxs)(Q,{children:[(0,y.jsxs)(K,{children:[(0,y.jsxs)(Z,{children:["Amount (",e.currency||"RM",")"]}),(0,y.jsx)(X,{type:"number",value:Xe.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=En.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+n*t.rate/100,0),i=n+t;en({...Xe,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Due Date"}),(0,y.jsx)(X,{type:"date",value:Xe.dueDate,onChange:e=>en({...Xe,dueDate:e.target.value})})]})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Status"}),(0,y.jsxs)(ne,{value:Xe.status,onChange:e=>en({...Xe,status:e.target.value}),children:[(0,y.jsx)("option",{value:"draft",children:"Draft"}),(0,y.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,y.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,y.jsx)("option",{value:"paid",children:"Paid"}),(0,y.jsx)("option",{value:"overdue",children:"Overdue"}),(0,y.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Invoice Category"}),(0,y.jsx)(ne,{value:Xe.invoiceCategory||"service",onChange:e=>en({...Xe,invoiceCategory:e.target.value}),children:An.length>0?An.filter(e=>"subscription"!==e.code).map(e=>(0,y.jsx)("option",{value:e.code,children:e.name},e.id)):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("option",{value:"service",children:"Service"}),(0,y.jsx)("option",{value:"consulting",children:"Consulting"}),(0,y.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Xe.invoiceCategory||"service")&&(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Item/Description"}),(0,y.jsx)(ee,{value:"others"===Xe.invoiceCategory?Xe.customDescription||"":Xe.serviceDescription||"",onChange:e=>{"others"===Xe.invoiceCategory?en({...Xe,customDescription:e.target.value}):en({...Xe,serviceDescription:e.target.value})},placeholder:`Enter ${Xe.invoiceCategory||"service"} description...`,rows:2})]}),(0,y.jsxs)(te,{children:[(0,y.jsxs)(ie,{children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:Xe.currency?(0,s.vv)(parseFloat(Xe.amount||"0"),Xe.currency):"-"})]}),En.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(Xe.amount||"0")*e.rate/100;return(0,y.jsxs)(ie,{children:[(0,y.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,y.jsx)("span",{children:Xe.currency?(0,s.vv)(t,Xe.currency):"-"})]},n)}),(0,y.jsxs)(ie,{highlight:!0,children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:Xe.currency?(0,s.vv)(parseFloat(Xe.total||"0"),Xe.currency):"-"})})]})]})]}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>ge(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Ke&&Xe)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ke.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(Xe.amount),tax:parseFloat(Xe.tax),total:parseFloat(Xe.total),dueDate:Xe.dueDate,status:Xe.status,payerType:Xe.payerType,payerId:Xe.payerId,items:Xe.items})});if(n.ok){const e={...Ke,amount:parseFloat(Xe.amount),tax:parseFloat(Xe.tax),total:parseFloat(Xe.total),dueDate:Xe.dueDate,status:Xe.status,payerType:Xe.payerType,payerId:Xe.payerId,items:Xe.items};d(r.map(n=>n.id===Ke.id?e:n)),ge(!1),Ze(null),en(null),Pe("Invoice updated successfully!"),Te(!0)}else{const e=await n.json();Pe(`Failed to update invoice: ${e.error||"Unknown error"}`),Te(!0)}}catch(e){console.error("Error updating invoice:",e),Pe("Error updating invoice. Please try again."),Te(!0)}},children:"Save Changes"})]})]})}),je&&Ke&&(0,y.jsx)(O,{onClick:()=>fe(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Send Invoice"}),(0,y.jsx)(q,{onClick:()=>fe(!1),children:"\xd7"})]}),(0,y.jsx)(G,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,y.jsx)("strong",{children:Ke.invoiceNumber})," to ",(0,y.jsx)("strong",{children:Ke.managerName||Ke.customerName}),"?"]}),(0,y.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Ke.invoiceNumber})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Ke.managerName||Ke.customerName})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Ke.customerName})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,y.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,s.vv)(Ke.total,Ke.currency||"USD")})]})]})]})}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>fe(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"success",onClick:async()=>{if(Ke)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ke.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await Un(),fe(!1),Ze(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Confirm"})]})]})}),be&&Ke&&(0,y.jsx)(O,{onClick:()=>we(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Resend Invoice"}),(0,y.jsx)(q,{onClick:()=>we(!1),children:"\xd7"})]}),(0,y.jsx)(G,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,y.jsx)("strong",{children:Ke.invoiceNumber})," to ",(0,y.jsx)("strong",{children:Ke.managerName}),"?"]}),(0,y.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:()=>{Ke&&(we(!1),Ze(null))},children:"Resend Invoice"})]})]})}),Ce&&Ke&&(0,y.jsx)(O,{onClick:()=>ke(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Cancel Invoice"}),(0,y.jsx)(q,{onClick:()=>ke(!1),children:"\xd7"})]}),(0,y.jsx)(G,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,y.jsx)("strong",{children:Ke.invoiceNumber}),"?"]}),(0,y.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,y.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,y.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,y.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,y.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Ke.invoiceNumber})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Ke.managerName})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,y.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,s.vv)(Ke.total,Ke.currency||"USD")})]})]})]})}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>ke(!1),children:"Keep Invoice"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Ke)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ke.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await Un(),ke(!1),Ze(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),Fe&&Ke&&(0,y.jsx)(O,{onClick:()=>Be(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Delete Invoice"}),(0,y.jsx)(q,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,y.jsx)(G,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,y.jsxs)("strong",{children:["#",Ke.invoiceNumber]}),"?",(0,y.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>Be(!1),children:"Keep Invoice"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Ke)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ke.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await Un(),Be(!1),Ze(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),Se&&De&&(0,y.jsx)(O,{onClick:()=>Ae(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Send Invoice via Email"}),(0,y.jsx)(q,{onClick:()=>Ae(!1),children:"\xd7"})]}),(0,y.jsxs)(G,{children:[(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Invoice"}),(0,y.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,y.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:De.invoiceNumber}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:De.customerName}),(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,s.vv)(De.total,De.currency||"MYR")})]})]}),(0,y.jsxs)(K,{children:[(0,y.jsx)(Z,{children:"Recipient Email *"}),(0,y.jsx)(X,{type:"email",value:Ne,onChange:e=>Ee(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:Ne?(0,y.jsxs)(y.Fragment,{children:["Default email for ","restaurant"===De.payerType?"Restaurant":"foodcourt_manager"===De.payerType?"Foodcourt Manager":"brand_manager"===De.payerType?"Brand Manager":"Customer"]}):(0,y.jsxs)(y.Fragment,{children:["Enter the ","restaurant"===De.payerType?"restaurant":"foodcourt_manager"===De.payerType?"foodcourt manager":"brand_manager"===De.payerType?"brand manager":"customer"," email address"]})})]}),(0,y.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,y.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,y.jsxs)(J,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>{Ae(!1),Ie(null),Ee("")},children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(!De||!Ne)return Pe("Please enter a valid email address."),void Te(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${De.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:Ne})});if(n.ok)Pe(`Invoice sent successfully to ${Ne}`),Ae(!1),Ie(null),Ee("");else{const e=await n.json();Pe(e.error||"Failed to send invoice email.")}Te(!0)}catch(e){console.error("Error sending invoice email:",e),Pe("Failed to send invoice email. Please try again."),Te(!0)}},disabled:!Ne||!Ne.includes("@"),children:"Send Email"})]})]})}),ze&&(0,y.jsx)(O,{onClick:()=>Te(!1),children:(0,y.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Y,{children:[(0,y.jsx)(V,{children:"Success"}),(0,y.jsx)(q,{onClick:()=>Te(!1),children:"\xd7"})]}),(0,y.jsx)(G,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,y.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:$e})})}),(0,y.jsx)(J,{children:(0,y.jsx)(v,{variant:"primary",onClick:()=>Te(!1),children:"OK"})})]})})]})]})})})},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var i=t(4752),r=t(9610),a=t(4414);const o=i.Ay.div`
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
`,x=e=>{let{isOpen:n,title:t,message:i,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return n?(0,a.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(l,{children:t}),(0,a.jsx)(d,{children:i})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:h,children:m}),(0,a.jsx)(p,{variant:"primary",type:g,onClick:x,children:u})]})]})}):null}}}]);