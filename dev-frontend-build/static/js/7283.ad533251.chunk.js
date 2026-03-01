"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7283],{2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var i=t(4752),a=t(4414);const r=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i,...o}=e;return(0,a.jsx)(r,{className:t,style:i,...o,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,a.jsx)(o,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,a.jsx)(s,{...t,children:n})}},2597:(e,n,t)=>{t.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var i=t(4752),a=t(4414);const r=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i}=e;return(0,a.jsx)(r,{className:t,style:i,children:n})},d=e=>{let{active:n,onClick:t,children:i,className:r}=e;return(0,a.jsx)(o,{active:n,onClick:t,className:r,children:i})},c=e=>{let{count:n,variant:t="default",showZero:i=!1}=e;return 0!==n||i?(0,a.jsx)(s,{variant:t,children:n}):null}},7283:(e,n,t)=>{t.r(n),t.d(n,{default:()=>ie});var i=t(9950),a=t(4752),r=t(4492),o=t(6038),s=t(9018),l=t(4728),d=t(7617),c=t(7960),p=t(2488),x=t(2597),u=t(5612),h=t(1052),m=t.n(h),g=t(4414);a.Ay.div`
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
`,a.Ay.div`
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
`,a.Ay.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`;const y=(0,a.Ay)(l.SC)``,v=a.Ay.div``,j=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,f=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,b=a.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,w=(0,a.Ay)(l.Wh)`
  white-space: normal;
  line-height: 1.3;
`,C=(a.Ay.div`
  font-weight: ${e=>e.highlight?"700":"500"};
  color: #374151;
`,a.Ay.button`
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
`),k=a.Ay.button`
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
`,F=a.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,B=a.Ay.div`
  display: grid;
  gap: 12px;
`,S=a.Ay.div`
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
`,A=a.Ay.div`
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
`,N=a.Ay.div`
  flex: 1;
`,D=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,E=a.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,I=a.Ay.div`
  display: flex;
  gap: 8px;
`,T=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,z=a.Ay.button`
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
`,$=a.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,_=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,P=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,M=a.Ay.div`
  margin-bottom: 24px;
`,L=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`,W=a.Ay.button`
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
`,R=a.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,U=a.Ay.div`
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
`,O=a.Ay.div`
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
`,H=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,Y=a.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,V=a.Ay.button`
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
`,q=a.Ay.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
`,G=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,J=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Q=a.Ay.div`
  margin-bottom: 20px;
`,K=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,Z=a.Ay.input`
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
`,X=a.Ay.textarea`
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
`,ee=a.Ay.select`
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
`,ne=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,te=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,ie=(a.Ay.div``,a.Ay.div`
  background: white;
  border-radius: 10px;
  border: 1px solid #E6EBF1;
  padding: 14px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }
`,a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`,a.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
`,a.Ay.span`
  font-size: 13px;
  color: #0A2540;
`,a.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #F3F4F6;
`,()=>{const{operationSettings:e}=(0,s.Pj)(),[n,t]=(0,r.ok)(),[a,l]=(0,i.useState)([]),[h,ie]=(0,i.useState)(""),[ae,re]=(0,i.useState)("month"),[oe,se]=(0,i.useState)(!1),[le,de]=(0,i.useState)(()=>{const e=new Date,n=new Date(e.getFullYear(),e.getMonth(),1),t=new Date(e.getFullYear(),e.getMonth()+1,0),i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:i(n),end:i(t)}}),[ce,pe]=(0,i.useState)(!1),[xe,ue]=(0,i.useState)(!1),[he,me]=(0,i.useState)(!1),[ge,ye]=(0,i.useState)(!1),[ve,je]=(0,i.useState)(!1),[fe,be]=(0,i.useState)(!1),[we,Ce]=(0,i.useState)(!1),[ke,Fe]=(0,i.useState)(!1),[Be,Se]=(0,i.useState)(!1),[Ae,Ne]=(0,i.useState)(""),[De,Ee]=(0,i.useState)(null),[Ie,Te]=(0,i.useState)(!1),[ze,$e]=(0,i.useState)(""),_e=n.get("tab")||"invoices",Pe=e=>{t({tab:e})},[Me,Le]=(0,i.useState)(!1),[We,Re]=(0,i.useState)(null),[Ue,Oe]=(0,i.useState)({name:"",code:"",description:""}),[He,Ye]=(0,i.useState)(!1),[Ve,qe]=(0,i.useState)(!1),[Ge,Je]=(0,i.useState)(null),[Qe,Ke]=(0,i.useState)(null),[Ze,Xe]=(0,i.useState)(null),[en,nn]=(0,i.useState)(""),[tn,an]=(0,i.useState)({managers:[],restaurants:[]}),[rn,on]=(0,i.useState)(!1),[sn,ln]=(0,i.useState)(null),[dn,cn]=(0,i.useState)([]),[pn,xn]=(0,i.useState)([]),[un,hn]=(0,i.useState)({managers:[],restaurants:[]}),[mn,gn]=(0,i.useState)(""),[yn,vn]=(0,i.useState)(!1),[jn,fn]=(0,i.useState)(null),[bn,wn]=(0,i.useState)(null),[Cn,kn]=(0,i.useState)({}),[Fn,Bn]=(0,i.useState)([]),[Sn,An]=(0,i.useState)([]),[Nn,Dn]=(0,i.useState)([{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]),[En,In]=(0,i.useState)({enabled:!1,rate:0,name:"Tax"}),[Tn,zn]=(0,i.useState)("issueDate"),[$n,_n]=(0,i.useState)("desc"),[Pn,Mn]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),Ln=e=>{re(e),se(!1);const n=new Date;let t=new Date,i=new Date;const a=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":break;case"week":t.setDate(n.getDate()-n.getDay());break;case"month":t=new Date(n.getFullYear(),n.getMonth(),1),i=new Date(n.getFullYear(),n.getMonth()+1,0);break;case"year":t=new Date(n.getFullYear(),0,1),i=new Date(n.getFullYear(),11,31);break;case"all":t=new Date(2e3,0,1)}de({start:a(t),end:a(i)})},Wn=(e,n)=>{se(!0),de(t=>({...t,[e]:n}))},Rn=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void l([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),l(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),l([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),l([])}},Un=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&An(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),On=e=>{e?(Re(e),Oe({name:e.name,code:e.code,description:e.description||""})):(Re(null),Oe({name:"",code:"",description:""})),Le(!0)},Hn=()=>{Le(!1),Re(null),Oe({name:"",code:"",description:""})};(0,i.useEffect)(()=>{Rn(),Vn(),qn(),Qn(),Yn(),Un(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/admin/payment-settings",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();if(e.additionalCharges&&Array.isArray(e.additionalCharges)){Dn(e.additionalCharges);const n=e.additionalCharges.find(e=>e.enabled);n&&In({enabled:n.enabled,rate:parseFloat(n.rate)||0,name:n.name||"Tax"})}}}catch(e){console.error("Error fetching payment settings:",e)}})()},[]);const Yn=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&kn(n.currencies)}const n=await fetch("/api/currencies/supported");if(n.ok){const e=await n.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);Bn(n)}}}catch(e){console.error("Error fetching currency config:",e)}},Vn=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...t]}if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...n]}console.log("Fetched managers (General only):",i.length),cn(i)}catch(e){console.error("Error fetching managers:",e),cn([])}},qn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"USD"}});xn(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),xn([])}catch(e){console.error("Error fetching restaurants:",e),xn([])}},Gn=(e,n)=>{if(ln({type:e,data:n}),nn("manager"===e?n.fullName:n.name),on(!1),"manager"===e){const e=n;Xe({...Ze,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=dn.find(n=>n.id===e.admin_id);Xe({...Ze,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},Jn=async(e,n)=>{fn({type:e,data:n}),vn(!1),gn("manager"===e?n.fullName:n.name);const t=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=n;try{const n=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var a;const n=await e.json(),t=n.data||n,r=null===(a=t.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=t.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",r,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var r;const n=await e.json(),t=n.data||n,a=null===(r=t.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=t.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",a,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}Mn({...Pn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i})}else{const e=n,a=dn.find(n=>n.id===e.admin_id);try{const n=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){i=(await n.json()).currency||"USD"}}catch(o){console.error("Error fetching restaurant currency:",o)}Mn({...Pn,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:a?a.fullName:"",companyName:e.name,currency:i})}},Qn=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();wn(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),wn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),wn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},Kn=e=>{if(!bn)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${bn.companyLogo?`<img src="${bn.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${bn.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${bn.address?`${bn.address}<br>`:""}\n                    ${[bn.city,bn.state,bn.postalCode].filter(Boolean).join(", ")}${bn.city||bn.state||bn.postalCode?"<br>":""}\n                    ${bn.country?`${bn.country}<br>`:""}\n                    ${bn.phone?`Tel: ${bn.phone}<br>`:""}\n                    ${bn.email?`Email: ${bn.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${ut(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${ut(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${ut(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,o.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,o.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,o.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${(e.additionalCharges||[]).map(n=>`\n                <div class="summary-row tax">\n                    <span>${n.name} (${n.rate}%):</span>\n                    <span>${(0,o.vv)(n.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,o.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${bn.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${bn.bankName}<br>\n                <strong>Account Name:</strong> ${bn.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${bn.bankAccount||"-"}\n                ${bn.swiftCode?`<br><strong>SWIFT Code:</strong> ${bn.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${bn.taxNumber||bn.registrationNumber?`\n        <div class="registration-info">\n            ${bn.registrationNumber?`Reg No: ${bn.registrationNumber}`:""}\n            ${bn.registrationNumber&&bn.taxNumber?" | ":""}\n            ${bn.taxNumber?`Tax No: ${bn.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},Zn=async e=>{if(!bn)return $e("Company settings not loaded. Please try again."),void Te(!0);try{var n;const t=Kn(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const a=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!a)throw document.body.removeChild(i),new Error("Could not access iframe document");a.open(),a.write(t),a.close(),await new Promise(async e=>{try{var n;null!==(n=a.fonts)&&void 0!==n&&n.ready&&await a.fonts.ready}catch{}const t=a.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const r=await m()(a.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=r.toDataURL("image/png"),s=new u.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=r.height*l/r.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),$e("Failed to generate PDF. Please try again."),Te(!0)}},Xn=e=>{if(!bn)return $e("Company settings not loaded. Please try again."),void Te(!0);const n=Kn(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},et=async e=>{Ee(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=pn.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=dn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=dn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}Ne(n),Se(!0)},nt=()=>{Mn({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),fn(null),gn(""),vn(!1)},tt=e=>{if("pending_payment"!==e.status)return!1;const n=new Date;return new Date(e.dueDate)<n},it=e=>tt(e)?"overdue":e.status,at=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},rt=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},ot=a.filter(e=>{const n=h.toLowerCase(),t=at(e.status).toLowerCase(),i="automatic"===e.type?"auto automatic":"manual",a=(e.planType||"").toLowerCase(),r=(e.categoryDisplayName||"").toLowerCase(),o=(e.customerName||e.restaurantName||"").toLowerCase(),s=rt(e.payerType||"restaurant").toLowerCase(),l=!h||e.companyName.toLowerCase().includes(n)||e.invoiceNumber.toLowerCase().includes(n)||e.managerName.toLowerCase().includes(n)||t.includes(n)||i.includes(n)||a.includes(n)||r.includes(n)||o.includes(n)||s.includes(n)||(e.billingPeriod||"").toLowerCase().includes(n);let d=!0;if(le.start&&le.end){const n=new Date(e.issueDate),t=new Date(le.start),i=new Date(le.end);t.setHours(0,0,0,0),i.setHours(23,59,59,999),d=n>=t&&n<=i}return l&&d}).sort((e,n)=>{let t=0;switch(Tn){case"invoiceNumber":t=e.invoiceNumber.localeCompare(n.invoiceNumber);break;case"companyName":t=e.companyName.localeCompare(n.companyName);break;case"issueDate":default:t=new Date(e.issueDate).getTime()-new Date(n.issueDate).getTime();break;case"dueDate":t=new Date(e.dueDate).getTime()-new Date(n.dueDate).getTime();break;case"amount":t=e.total-n.total;break;case"status":t=(e.status||"").localeCompare(n.status||"")}return"desc"===$n?-t:t}),st=e=>{Tn===e?_n("asc"===$n?"desc":"asc"):(zn(e),_n("dueDate"===e||"amount"===e?"desc":"asc"))},lt=e=>Tn!==e?"":"asc"===$n?" \u25b2":" \u25bc",dt=a.length,ct=a.filter(e=>"paid"===e.status).length,pt=a.filter(e=>tt(e)).length,xt=a.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),ut=e=>new Date(e).toLocaleDateString("en-MY"),ht=e=>{Ke(e),ue(!0)},mt=e=>{var n,t;if(Ke(e),Xe({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=pn.find(n=>n.id===e.restaurantId);n&&(ln({type:"restaurant",data:n}),nn(n.name))}else if(e.managerId){const n=dn.find(n=>n.id===e.managerId);n&&(ln({type:"manager",data:n}),nn(n.fullName))}me(!0)},gt=e=>{Ke(e),Fe(!0)};return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(c.mc,{children:[(0,g.jsxs)(c.Y9,{children:[(0,g.jsx)(c.hE,{children:"Invoices"}),(0,g.jsx)(c.ex,{})]}),(0,g.jsxs)(c.UC,{children:[(0,g.jsxs)(c.MD,{children:[(0,g.jsxs)(c.hI,{color:"#059669",children:[(0,g.jsx)(c.Os,{children:dt}),(0,g.jsx)(c.v0,{children:"Total Invoices"}),(0,g.jsx)(c.d1,{children:"All invoice records"})]}),(0,g.jsxs)(c.hI,{color:"#2563EB",children:[(0,g.jsx)(c.Os,{children:ct}),(0,g.jsx)(c.v0,{children:"Paid Invoices"}),(0,g.jsxs)(c.d1,{children:[dt>0?Math.round(ct/dt*100):0,"% completed"]})]}),(0,g.jsxs)(c.hI,{color:"#DC2626",children:[(0,g.jsx)(c.Os,{children:pt}),(0,g.jsx)(c.v0,{children:"Overdue Invoices"}),(0,g.jsx)(c.d1,{children:"Requires attention"})]}),(0,g.jsxs)(c.hI,{color:"#7C3AED",children:[(0,g.jsx)(c.Os,{children:(0,o.vv)(xt)}),(0,g.jsx)(c.v0,{children:"Total Revenue"}),(0,g.jsx)(c.d1,{children:"From paid invoices"})]})]}),(0,g.jsxs)(x.tU,{children:[(0,g.jsx)(x.oz,{active:"invoices"===_e,onClick:()=>Pe("invoices"),children:"Invoices"}),(0,g.jsxs)(x.oz,{active:"payment_submitted"===_e,onClick:()=>Pe("payment_submitted"),children:["Payment Submitted",(0,g.jsx)(x.Ex,{count:a.filter(e=>"payment_submitted"===e.status).length,variant:"danger"})]}),(0,g.jsx)(x.oz,{active:"categories"===_e,onClick:()=>Pe("categories"),children:"Invoice Categories"})]}),"invoices"===_e&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(M,{children:(0,g.jsxs)(L,{children:[(0,g.jsx)(p.DO,{placeholder:"Search invoices... (status, type, customer, etc.)",value:h,onChange:e=>ie(e.target.value),style:{minWidth:"280px",maxWidth:"350px"}}),(0,g.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginLeft:"16px"},children:[(0,g.jsx)(W,{active:"week"===ae&&!oe,onClick:()=>Ln("week"),children:"Week"}),(0,g.jsx)(W,{active:"month"===ae&&!oe,onClick:()=>Ln("month"),children:"Month"}),(0,g.jsx)(W,{active:"year"===ae&&!oe,onClick:()=>Ln("year"),children:"Year"}),(0,g.jsx)(W,{active:"all"===ae&&!oe,onClick:()=>Ln("all"),children:"All"}),(0,g.jsx)(R,{type:"date",value:le.start,onChange:e=>Wn("start",e.target.value)}),(0,g.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,g.jsx)(R,{type:"date",value:le.end,onChange:e=>Wn("end",e.target.value)})]}),(0,g.jsx)("div",{style:{marginLeft:"auto"},children:(0,g.jsx)(y,{variant:"primary",onClick:()=>{nt(),pe(!0)},children:"Create Invoice"})})]})}),(0,g.jsxs)(c.an,{children:[(0,g.jsxs)(c.bQ,{children:[(0,g.jsx)(c.B_,{children:(0,g.jsxs)("tr",{children:[(0,g.jsxs)(c.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>st("invoiceNumber"),children:["Invoice",lt("invoiceNumber")]}),(0,g.jsxs)(c.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>st("companyName"),children:["Customer",lt("companyName")]}),(0,g.jsx)(c.gU,{align:"center",children:"Period"}),(0,g.jsx)(c.gU,{align:"center",children:"Issued"}),(0,g.jsxs)(c.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>st("dueDate"),children:["Due",lt("dueDate")]}),(0,g.jsxs)(c.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>st("status"),children:["Status",lt("status")]}),(0,g.jsxs)(c.gU,{align:"right",style:{cursor:"pointer"},onClick:()=>st("amount"),children:["Amount",lt("amount")]}),(0,g.jsx)(c.gU,{align:"right",children:"Total"}),(0,g.jsx)(c.gU,{isActions:!0,children:"Actions"})]})}),(0,g.jsx)("tbody",{children:ot.map(e=>(0,g.jsxs)(c.J2,{children:[(0,g.jsx)(c.Bv,{"data-label":"Invoice",children:(0,g.jsxs)(v,{children:[(0,g.jsxs)(j,{children:[e.invoiceNumber,"automatic"===e.type&&(0,g.jsx)(b,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,g.jsx)(f,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,g.jsx)(c.Bv,{"data-label":"Customer",children:(0,g.jsxs)(v,{children:[(0,g.jsx)(j,{children:e.customerName||e.restaurantName||"Unknown"}),(0,g.jsx)(f,{children:rt(e.payerType||"restaurant")})]})}),(0,g.jsx)(c.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,g.jsx)(c.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:ut(e.issueDate)}),(0,g.jsx)(c.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:ut(e.dueDate)}),(0,g.jsx)(c.Bv,{"data-label":"Status",align:"center",children:(0,g.jsx)(w,{status:it(e),children:at(it(e))})}),(0,g.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,g.jsx)(c.DM,{children:(0,o.vv)(e.amount,e.currency||"USD")})}),(0,g.jsx)(c.Bv,{"data-label":"Total",align:"right",children:(0,g.jsx)(c.DM,{highlight:!0,children:0===e.total?(0,g.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,o.vv)(e.total,e.currency||"USD")})}),(0,g.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,g.jsxs)(c.wr,{children:[(0,g.jsx)(C,{variant:"primary",onClick:()=>ht(e),children:"View"}),"draft"===e.status&&(0,g.jsxs)(g.Fragment,{children:["automatic"!==e.type&&(0,g.jsx)(C,{onClick:()=>mt(e),children:"Edit"}),(0,g.jsx)(C,{variant:"success",onClick:()=>(e=>{Ke(e),je(!0)})(e),title:"Send Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,g.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,g.jsx)(k,{onClick:()=>gt(e),title:"Delete Invoice",children:(0,g.jsx)(F,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,g.jsxs)(g.Fragment,{children:["automatic"!==e.type&&(0,g.jsx)(C,{onClick:()=>mt(e),children:"Edit"}),(0,g.jsx)(C,{onClick:()=>Zn(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(C,{onClick:()=>Xn(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,g.jsx)(C,{variant:"email",onClick:()=>et(e),title:"Send Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,g.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,g.jsx)(k,{onClick:()=>gt(e),title:"Delete Invoice",children:(0,g.jsx)(F,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,g.jsxs)(g.Fragment,{children:[e.hasPaymentInfo&&(0,g.jsx)(C,{variant:"primary",onClick:()=>(e=>{Ke(e),ye(!0)})(e),children:"Confirm"}),(0,g.jsx)(C,{onClick:()=>Zn(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(C,{onClick:()=>Xn(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,g.jsx)(C,{variant:"email",onClick:()=>et(e),title:"Resend Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,g.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,g.jsxs)(g.Fragment,{children:["automatic"!==e.type&&(0,g.jsx)(C,{onClick:()=>mt(e),children:"Edit"}),(0,g.jsx)(C,{onClick:()=>Zn(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(C,{onClick:()=>Xn(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,g.jsx)(C,{variant:"email",onClick:()=>et(e),title:"Resend Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,g.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,g.jsx)(k,{onClick:()=>gt(e),title:"Delete Invoice",children:(0,g.jsx)(F,{children:"\xd7"})})]}),"paid"===e.status&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(C,{onClick:()=>Zn(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(C,{onClick:()=>Xn(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,g.jsx)(C,{onClick:()=>Zn(e),title:"Download Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id))})]}),0===ot.length&&(0,g.jsxs)(c.ys,{children:[(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,g.jsx)("div",{style:{fontSize:"14px"},children:0===a.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"payment_submitted"===_e&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"Payment Confirmation Required"}),(0,g.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:0},children:"These invoices have payment submitted and are waiting for your confirmation."})]}),(0,g.jsxs)(c.an,{children:[(0,g.jsxs)(c.bQ,{children:[(0,g.jsx)(c.B_,{children:(0,g.jsxs)("tr",{children:[(0,g.jsx)(c.gU,{align:"center",children:"Invoice"}),(0,g.jsx)(c.gU,{align:"center",children:"Customer"}),(0,g.jsx)(c.gU,{align:"center",children:"Payment Method"}),(0,g.jsx)(c.gU,{align:"center",children:"Submitted Date"}),(0,g.jsx)(c.gU,{align:"right",children:"Amount"}),(0,g.jsx)(c.gU,{isActions:!0,children:"Actions"})]})}),(0,g.jsx)("tbody",{children:a.filter(e=>"payment_submitted"===e.status).map(e=>(0,g.jsxs)(c.J2,{children:[(0,g.jsx)(c.Bv,{"data-label":"Invoice",children:(0,g.jsxs)(v,{children:[(0,g.jsx)(j,{children:e.invoiceNumber}),(0,g.jsx)(f,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,g.jsx)(c.Bv,{"data-label":"Customer",children:(0,g.jsxs)(v,{children:[(0,g.jsx)(j,{children:e.customerName||e.restaurantName||"Unknown"}),(0,g.jsx)(f,{children:e.companyName})]})}),(0,g.jsx)(c.Bv,{"data-label":"Payment Method",align:"center",children:e.paymentMethod||"-"}),(0,g.jsx)(c.Bv,{"data-label":"Submitted",align:"center",children:e.paidDate?ut(e.paidDate):"-"}),(0,g.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,g.jsx)(c.DM,{highlight:!0,children:0===e.total?(0,g.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,o.vv)(e.total,e.currency||"USD")})}),(0,g.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,g.jsxs)(c.wr,{children:[(0,g.jsx)(C,{onClick:()=>ht(e),children:"View"}),(0,g.jsx)(C,{variant:"primary",onClick:()=>{Ke(e),ye(!0)},children:"Confirm Payment"})]})})]},e.id))})]}),0===a.filter(e=>"payment_submitted"===e.status).length&&(0,g.jsxs)(c.ys,{children:[(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",marginBottom:"8px"},children:"No Pending Confirmations"}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"There are no invoices waiting for payment confirmation."})]})]})]}),"categories"===_e&&(0,g.jsxs)("div",{style:{padding:"24px 0"},children:[(0,g.jsxs)(_,{children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(P,{children:"Invoice Categories"}),(0,g.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,g.jsx)(y,{variant:"primary",onClick:()=>On(),children:"Add Category"})]}),0===Sn.length?(0,g.jsxs)($,{children:[(0,g.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,g.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,g.jsx)(y,{variant:"primary",onClick:()=>On(),children:"Add Category"})]}):(0,g.jsx)(B,{children:Sn.map(e=>(0,g.jsxs)(S,{isActive:e.is_active,children:[(0,g.jsx)(A,{children:e.name.charAt(0).toUpperCase()}),(0,g.jsxs)(N,{children:[(0,g.jsxs)(D,{children:[e.name,(0,g.jsx)(T,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,g.jsxs)(E,{children:[(0,g.jsxs)("span",{children:["Code: ",(0,g.jsx)("strong",{children:e.code})]}),e.description&&(0,g.jsx)("span",{children:e.description})]})]}),(0,g.jsxs)(I,{children:[(0,g.jsx)(z,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({is_active:!e.is_active})});(await t.json()).success&&Un()}catch(n){console.error("Failed to toggle category:",n)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,g.jsx)("circle",{cx:"12",cy:"12",r:"3"})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,g.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})})}),(0,g.jsx)(z,{onClick:()=>On(e),title:"Edit Category",children:(0,g.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,g.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,g.jsx)(z,{onClick:()=>(e=>{Je(e),qe(!0)})(e),title:"Delete Category",children:(0,g.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,g.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),Me&&(0,g.jsx)(U,{onClick:Hn,children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(Y,{children:We?"Edit Category":"Add Category"}),(0,g.jsx)(V,{onClick:Hn,children:"\xd7"})]}),(0,g.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Ue.name.trim()&&Ue.code.trim())try{Ye(!0);const e=localStorage.getItem("auth_token"),n=We?`/api/invoices/categories/${We.id}`:"/api/invoices/categories",t=We?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:Ue.name.trim(),code:Ue.code.trim().toLowerCase().replace(/\s+/g,"_"),description:Ue.description.trim()||null})}),a=await i.json();a.success?(Hn(),Un()):alert(a.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{Ye(!1)}},children:[(0,g.jsxs)(q,{children:[(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Name *"}),(0,g.jsx)(Z,{value:Ue.name,onChange:e=>Oe({...Ue,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Code *"}),(0,g.jsx)(Z,{value:Ue.code,onChange:e=>Oe({...Ue,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===We||void 0===We?void 0:We.is_system}),(0,g.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Description"}),(0,g.jsx)(X,{value:Ue.description,onChange:e=>Oe({...Ue,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(y,{variant:"secondary",type:"button",onClick:Hn,children:"Cancel"}),(0,g.jsx)(y,{variant:"primary",type:"submit",disabled:He||!Ue.name||!Ue.code,children:He?"Saving...":We?"Update":"Create"})]})]})]})}),(0,g.jsx)(d.A,{isOpen:Ve,onCancel:()=>qe(!1),onConfirm:async()=>{if(Ge)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${Ge.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(qe(!1),Je(null),Un()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===Ge||void 0===Ge?void 0:Ge.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),ce&&(0,g.jsx)(U,{onClick:e=>{e.target===e.currentTarget&&(pe(!1),nt())},children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(Y,{children:"Create Invoice"}),(0,g.jsx)(V,{onClick:()=>{pe(!1),nt()},children:"\xd7"})]}),(0,g.jsxs)(q,{children:[(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Search Manager or Restaurant *"}),(0,g.jsxs)("div",{style:{position:"relative"},children:[(0,g.jsx)(Z,{type:"text",value:mn,onChange:e=>(e=>{if(gn(e),vn(!0),e.length<2)return void hn({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",dn),console.log("Available restaurants:",pn);const n=dn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=pn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),hn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>vn(!0),onBlur:()=>setTimeout(()=>vn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),yn&&(un.managers.length>0||un.restaurants.length>0)&&(0,g.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[un.managers.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),un.managers.map(e=>(0,g.jsxs)("div",{onClick:()=>Jn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),un.restaurants.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),un.restaurants.map(e=>{const n=dn.find(n=>n.id===e.admin_id);return(0,g.jsxs)("div",{onClick:()=>Jn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),jn&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===jn.type?jn.data.fullName:jn.data.name}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===jn.type?`${jn.data.companyName} \u2022 Manager`:`${jn.data.address||"No address"} \u2022 Restaurant`})]}),(0,g.jsx)("button",{onClick:()=>{fn(null),gn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,g.jsxs)(J,{children:[(0,g.jsxs)(Q,{children:[(0,g.jsxs)(K,{children:["Amount",Pn.currency?` (${Pn.currency})`:""," *"]}),(0,g.jsx)(Z,{type:"number",step:Pn.currency&&0===(0,o.e_)(Pn.currency)?"1":"0.01",min:"0",value:Pn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(Pn.discountValue)||0,i="percentage"===Pn.discountType?n*(t/100):"fixed"===Pn.discountType?t:0,a=Math.max(0,n-i),r=Nn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),o=a+r;Mn({...Pn,amount:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})},onBlur:e=>{if(e.target.value&&Pn.currency){const n=(0,o.e_)(Pn.currency),t=parseFloat(e.target.value)||0,i=t.toFixed(n),a=parseFloat(Pn.discountValue)||0,r="percentage"===Pn.discountType?t*(a/100):"fixed"===Pn.discountType?a:0,s=Math.max(0,t-r),l=Nn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+s*n.rate/100,0),d=s+l;Mn({...Pn,amount:i,tax:l.toFixed(n),total:d.toFixed(n)})}},placeholder:Pn.currency&&0===(0,o.e_)(Pn.currency)?"0":"0.00",required:!0,disabled:!jn}),!jn&&(0,g.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Due Date *"}),(0,g.jsx)(Z,{type:"date",value:Pn.dueDate,onChange:e=>Mn({...Pn,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,g.jsxs)(J,{children:[(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Discount"}),(0,g.jsxs)(ee,{value:Pn.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(Pn.amount)||0,i="none"===n?0:parseFloat(Pn.discountValue)||0,a="percentage"===n?t*(i/100):"fixed"===n?i:0,r=Math.max(0,t-a),o=Nn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),s=r+o;Mn({...Pn,discountType:n,discountValue:"none"===n?"":Pn.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,g.jsx)("option",{value:"none",children:"No Discount"}),(0,g.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,g.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Pn.discountType&&(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"percentage"===Pn.discountType?"Discount (%)":"Discount Amount"}),(0,g.jsx)(Z,{type:"number",step:"0.01",min:"0",max:"percentage"===Pn.discountType?"100":void 0,value:Pn.discountValue,onChange:e=>{const n=parseFloat(Pn.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===Pn.discountType?n*(t/100):t,a=Math.max(0,n-i),r=Nn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),o=a+r;Mn({...Pn,discountValue:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Pn.discountType&&(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Discount Reason"}),(0,g.jsx)(Z,{type:"text",value:Pn.discountReason,onChange:e=>Mn({...Pn,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Invoice Category"}),(0,g.jsx)(ee,{value:Pn.invoiceCategory||"service",onChange:e=>Mn({...Pn,invoiceCategory:e.target.value}),children:Sn.length>0?Sn.filter(e=>"subscription"!==e.code).map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.id)):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"service",children:"Service"}),(0,g.jsx)("option",{value:"consulting",children:"Consulting"}),(0,g.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Pn.invoiceCategory||"service")&&(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Item/Description"}),(0,g.jsx)(X,{value:"others"===Pn.invoiceCategory?Pn.customDescription||"":Pn.serviceDescription||"",onChange:e=>{"others"===Pn.invoiceCategory?Mn({...Pn,customDescription:e.target.value}):Mn({...Pn,serviceDescription:e.target.value})},placeholder:`Enter ${Pn.invoiceCategory||"service"} description...`,rows:2})]}),(0,g.jsxs)(ne,{children:[(0,g.jsxs)(te,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:Pn.currency?(0,o.vv)(parseFloat(Pn.amount||"0"),Pn.currency):"-"})]}),"none"!==Pn.discountType&&parseFloat(Pn.discountValue||"0")>0&&(()=>{const e=parseFloat(Pn.amount||"0"),n=parseFloat(Pn.discountValue||"0"),t="percentage"===Pn.discountType?e*(n/100):n;return(0,g.jsxs)(te,{children:[(0,g.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Pn.discountType?` (${n}%)`:"",":"]}),(0,g.jsxs)("span",{style:{color:"#15803D"},children:["-",Pn.currency?(0,o.vv)(t,Pn.currency):"-"]})]})})(),Nn.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(Pn.amount||"0"),i=parseFloat(Pn.discountValue||"0"),a="percentage"===Pn.discountType?t*(i/100):"fixed"===Pn.discountType?i:0,r=Math.max(0,t-a)*(e.rate/100);return(0,g.jsxs)(te,{children:[(0,g.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,g.jsx)("span",{children:Pn.currency?(0,o.vv)(r,Pn.currency):"-"})]},n)}),(0,g.jsxs)(te,{highlight:!0,children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:Pn.currency?(0,o.vv)(parseFloat(Pn.total||"0"),Pn.currency):"-"})})]})]})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(y,{variant:"secondary",onClick:()=>{pe(!1),nt()},children:"Cancel"}),(0,g.jsx)(y,{variant:"primary",onClick:async()=>{if(jn&&Pn.amount&&Pn.dueDate)try{const e=parseFloat(Pn.amount),n=parseFloat(Pn.discountValue)||0,t="percentage"===Pn.discountType?e*(n/100):"fixed"===Pn.discountType?n:0,i=Math.max(0,e-t),a=Nn.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(i*e.rate/100*100)/100})),r=a.reduce((e,n)=>e+n.amount,0),o=i+r;let s="";s="others"===Pn.invoiceCategory?Pn.customDescription||"":Pn.serviceDescription||"";let l="",d="",c="",p="";if("restaurant"===jn.type){const e=jn.data;l=e.name,p=e.name,c=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),d=n.join("\n")}else if("manager"===jn.type){const e=jn.data;l=e.fullName,c=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),d=n.join("\n")}let x="restaurant";if("manager"===jn.type){const e=jn.data;"Brand General"===e.role||"Brand Manager"===e.role?x="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(x="foodcourt_manager")}const u={restaurant_id:"restaurant"===jn.type?jn.data.id:null,payer_type:x,payer_id:"manager"===jn.type?jn.data.id:null,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(Pn.dueDate).toISOString(),total_amount:o,subtotal_before_discount:t>0?e:null,discount_type:"none"!==Pn.discountType?Pn.discountType:null,discount_value:t>0?n:null,discount_amount:t>0?t:null,discount_reason:Pn.discountReason||null,currency:Pn.currency||"USD",status:"draft",notes:`${c}\n${l}\n${d}\n\n${s}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:Pn.invoiceCategory||"service",additional_charges:a},h=[{item_type:Pn.invoiceCategory,description:s,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],m=localStorage.getItem("auth_token"),g=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({invoice_data:u,items:h})});if(g.ok)await Rn(),pe(!1),nt();else{const e=await g.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!jn||!Pn.amount||!Pn.dueDate,children:"Create Invoice"})]})]})}),xe&&Qe&&(0,g.jsx)(U,{onClick:()=>ue(!1),children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(Y,{children:"Invoice Details"}),(0,g.jsx)(V,{onClick:()=>ue(!1),children:"\xd7"})]}),(0,g.jsxs)(q,{children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,g.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===bn||void 0===bn?void 0:bn.companyLogo)&&(0,g.jsx)("img",{src:bn.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,g.jsx)("div",{style:{fontSize:null!==bn&&void 0!==bn&&bn.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===bn||void 0===bn?void 0:bn.companyName)||"Company Name"}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===bn||void 0===bn?void 0:bn.address)&&(0,g.jsx)("div",{children:bn.address}),((null===bn||void 0===bn?void 0:bn.city)||(null===bn||void 0===bn?void 0:bn.state)||(null===bn||void 0===bn?void 0:bn.postalCode))&&(0,g.jsx)("div",{children:[null===bn||void 0===bn?void 0:bn.city,null===bn||void 0===bn?void 0:bn.state,null===bn||void 0===bn?void 0:bn.postalCode].filter(Boolean).join(", ")}),(null===bn||void 0===bn?void 0:bn.country)&&(0,g.jsx)("div",{children:bn.country}),(null===bn||void 0===bn?void 0:bn.phone)&&(0,g.jsxs)("div",{children:["Tel: ",bn.phone]}),(null===bn||void 0===bn?void 0:bn.email)&&(0,g.jsxs)("div",{children:["Email: ",bn.email]})]})]}),(0,g.jsxs)("div",{style:{textAlign:"right"},children:[(0,g.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Qe.invoiceNumber}),(0,g.jsx)(w,{status:Qe.status,style:{marginTop:"8px"},children:at(Qe.status)})]})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,g.jsxs)("div",{style:{flex:1},children:[(0,g.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,g.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:Qe.customerName}),Qe.customerAddress&&(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:Qe.customerAddress}),"restaurant"===Qe.payerType&&Qe.restaurantName&&"Unknown Restaurant"!==Qe.restaurantName&&(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",Qe.restaurantName]}),Qe.companyName&&Qe.companyName!==Qe.customerName&&(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",Qe.companyName]})]}),(0,g.jsxs)("div",{style:{textAlign:"right"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Qe.billingPeriod||"-"})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ut(Qe.issueDate)})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ut(Qe.dueDate)})]}),Qe.paidDate&&(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ut(Qe.paidDate)})]})]})]}),(0,g.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,g.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,g.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,g.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,g.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,g.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,g.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,g.jsx)("tbody",{children:Qe.items.map((e,n)=>(0,g.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,o.vv)(e.unitPrice,Qe.currency||"MYR")}),(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,o.vv)(e.total,Qe.currency||"MYR")})]},n))})]})]}),(0,g.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,g.jsx)("div",{style:{width:"280px"},children:(0,g.jsxs)(ne,{children:[(0,g.jsxs)(te,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:(0,o.vv)(Qe.subtotalBeforeDiscount||Qe.amount,Qe.currency||"MYR")})]}),Qe.discountType&&"none"!==Qe.discountType&&Qe.discountAmount>0&&(0,g.jsxs)(te,{children:[(0,g.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Qe.discountType?` (${Qe.discountValue}%)`:"",":"]}),(0,g.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,o.vv)(Qe.discountAmount,Qe.currency||"MYR")]})]}),(Qe.additionalCharges||[]).map((e,n)=>(0,g.jsxs)(te,{children:[(0,g.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,g.jsx)("span",{children:(0,o.vv)(e.amount,Qe.currency||"MYR")})]},n)),(0,g.jsxs)(te,{highlight:!0,children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:(0,o.vv)(Qe.total,Qe.currency||"MYR")})})]})]})})}),(null===bn||void 0===bn?void 0:bn.bankName)&&(0,g.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:"Bank:"})," ",bn.bankName]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:"Account Name:"})," ",bn.bankAccountName]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:"Account Number:"})," ",bn.bankAccount]})]})]}),((null===bn||void 0===bn?void 0:bn.taxNumber)||(null===bn||void 0===bn?void 0:bn.registrationNumber))&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===bn||void 0===bn?void 0:bn.registrationNumber)&&(0,g.jsxs)("span",{children:["Reg No: ",bn.registrationNumber]}),(null===bn||void 0===bn?void 0:bn.registrationNumber)&&(null===bn||void 0===bn?void 0:bn.taxNumber)&&(0,g.jsx)("span",{children:" | "}),(null===bn||void 0===bn?void 0:bn.taxNumber)&&(0,g.jsxs)("span",{children:["Tax No: ",bn.taxNumber]})]})]})]})}),ge&&Qe&&(0,g.jsx)(U,{onClick:()=>ye(!1),children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,g.jsxs)(H,{children:[(0,g.jsxs)(Y,{children:["Confirm Payment - ",Qe.invoiceNumber]}),(0,g.jsx)(V,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,g.jsxs)(q,{children:[(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Invoice Summary"}),(0,g.jsxs)(ne,{children:[(0,g.jsxs)(te,{children:[(0,g.jsx)("span",{children:"Customer:"}),(0,g.jsx)("span",{children:Qe.customerName||Qe.managerName})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)("span",{children:"Company:"}),(0,g.jsx)("span",{children:Qe.companyName})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)("span",{children:"Invoice Number:"}),(0,g.jsx)("span",{children:Qe.invoiceNumber})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)("span",{children:"Due Date:"}),(0,g.jsx)("span",{children:ut(Qe.dueDate)})]}),(0,g.jsxs)(te,{highlight:!0,children:[(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:"Payment Amount:"})}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:(0,o.vv)(Qe.total,Qe.currency||"USD")})})]})]})]}),Qe.hasPaymentInfo&&(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Customer's Payment Information"}),(0,g.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,g.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,g.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,g.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===Qe.paymentMethod?"Bank Transfer":"qr_payment"===Qe.paymentMethod?"QR Payment":"stripe"===Qe.paymentMethod?"Stripe":"paypal"===Qe.paymentMethod?"PayPal":Qe.paymentMethod||"Not specified"]}),Qe.transactionId&&(0,g.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,g.jsx)("strong",{children:"Transaction ID:"})," ",Qe.transactionId]})]}),Qe.receiptUrl&&(0,g.jsxs)("div",{style:{marginTop:"12px"},children:[(0,g.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,g.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,g.jsx)("img",{src:Qe.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(Qe.receiptUrl,"_blank")}),(0,g.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,g.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,g.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,g.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,g.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Status Change"}),(0,g.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,g.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(y,{variant:"secondary",onClick:()=>ye(!1),children:"Cancel"}),(0,g.jsx)(y,{variant:"primary",onClick:async()=>{if(Qe)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Qe.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await Rn(),ye(!1),Ke(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),he&&Qe&&Ze&&(0,g.jsx)(U,{onClick:()=>me(!1),children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(H,{children:[(0,g.jsxs)(Y,{children:["Edit Invoice - ",Qe.invoiceNumber]}),(0,g.jsx)(V,{onClick:()=>me(!1),children:"\xd7"})]}),(0,g.jsxs)(q,{children:[(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Search Manager or Restaurant *"}),(0,g.jsxs)("div",{style:{position:"relative"},children:[(0,g.jsx)(Z,{type:"text",value:en,onChange:e=>(e=>{if(nn(e),on(!0),e.length<2)return void an({managers:[],restaurants:[]});const n=dn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=pn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));an({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>on(!0),onBlur:()=>setTimeout(()=>on(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),rn&&(tn.managers.length>0||tn.restaurants.length>0)&&(0,g.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[tn.managers.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),tn.managers.map(e=>(0,g.jsxs)("div",{onClick:()=>Gn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),tn.restaurants.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),tn.restaurants.map(e=>{const n=dn.find(n=>n.id===e.admin_id);return(0,g.jsxs)("div",{onClick:()=>Gn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),sn&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===sn.type?sn.data.fullName:sn.data.name}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===sn.type?`${sn.data.companyName} \u2022 Manager`:`${sn.data.address||"No address"} \u2022 Restaurant`})]}),(0,g.jsx)("button",{onClick:()=>{ln(null),nn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,g.jsxs)(J,{children:[(0,g.jsxs)(Q,{children:[(0,g.jsxs)(K,{children:["Amount (",e.currency||"RM",")"]}),(0,g.jsx)(Z,{type:"number",value:Ze.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=Nn.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+n*t.rate/100,0),i=n+t;Xe({...Ze,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Due Date"}),(0,g.jsx)(Z,{type:"date",value:Ze.dueDate,onChange:e=>Xe({...Ze,dueDate:e.target.value})})]})]}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Status"}),(0,g.jsxs)(ee,{value:Ze.status,onChange:e=>Xe({...Ze,status:e.target.value}),children:[(0,g.jsx)("option",{value:"draft",children:"Draft"}),(0,g.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,g.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,g.jsx)("option",{value:"paid",children:"Paid"}),(0,g.jsx)("option",{value:"overdue",children:"Overdue"}),(0,g.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Invoice Category"}),(0,g.jsx)(ee,{value:Ze.invoiceCategory||"service",onChange:e=>Xe({...Ze,invoiceCategory:e.target.value}),children:Sn.length>0?Sn.filter(e=>"subscription"!==e.code).map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.id)):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"service",children:"Service"}),(0,g.jsx)("option",{value:"consulting",children:"Consulting"}),(0,g.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Ze.invoiceCategory||"service")&&(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Item/Description"}),(0,g.jsx)(X,{value:"others"===Ze.invoiceCategory?Ze.customDescription||"":Ze.serviceDescription||"",onChange:e=>{"others"===Ze.invoiceCategory?Xe({...Ze,customDescription:e.target.value}):Xe({...Ze,serviceDescription:e.target.value})},placeholder:`Enter ${Ze.invoiceCategory||"service"} description...`,rows:2})]}),(0,g.jsxs)(ne,{children:[(0,g.jsxs)(te,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:Ze.currency?(0,o.vv)(parseFloat(Ze.amount||"0"),Ze.currency):"-"})]}),Nn.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(Ze.amount||"0")*e.rate/100;return(0,g.jsxs)(te,{children:[(0,g.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,g.jsx)("span",{children:Ze.currency?(0,o.vv)(t,Ze.currency):"-"})]},n)}),(0,g.jsxs)(te,{highlight:!0,children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:Ze.currency?(0,o.vv)(parseFloat(Ze.total||"0"),Ze.currency):"-"})})]})]})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(y,{variant:"secondary",onClick:()=>me(!1),children:"Cancel"}),(0,g.jsx)(y,{variant:"primary",onClick:async()=>{if(Qe&&Ze)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Qe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(Ze.amount),tax:parseFloat(Ze.tax),total:parseFloat(Ze.total),dueDate:Ze.dueDate,status:Ze.status,payerType:Ze.payerType,payerId:Ze.payerId,items:Ze.items})});if(n.ok){const e={...Qe,amount:parseFloat(Ze.amount),tax:parseFloat(Ze.tax),total:parseFloat(Ze.total),dueDate:Ze.dueDate,status:Ze.status,payerType:Ze.payerType,payerId:Ze.payerId,items:Ze.items};l(a.map(n=>n.id===Qe.id?e:n)),me(!1),Ke(null),Xe(null),$e("Invoice updated successfully!"),Te(!0)}else{const e=await n.json();$e(`Failed to update invoice: ${e.error||"Unknown error"}`),Te(!0)}}catch(e){console.error("Error updating invoice:",e),$e("Error updating invoice. Please try again."),Te(!0)}},children:"Save Changes"})]})]})}),ve&&Qe&&(0,g.jsx)(U,{onClick:()=>je(!1),children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(Y,{children:"Send Invoice"}),(0,g.jsx)(V,{onClick:()=>je(!1),children:"\xd7"})]}),(0,g.jsx)(q,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,g.jsx)("strong",{children:Qe.invoiceNumber})," to ",(0,g.jsx)("strong",{children:Qe.managerName||Qe.customerName}),"?"]}),(0,g.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:Qe.invoiceNumber})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:Qe.managerName||Qe.customerName})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:Qe.customerName})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,g.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,o.vv)(Qe.total,Qe.currency||"USD")})]})]})]})}),(0,g.jsxs)(G,{children:[(0,g.jsx)(y,{variant:"secondary",onClick:()=>je(!1),children:"Cancel"}),(0,g.jsx)(y,{variant:"success",onClick:async()=>{if(Qe)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Qe.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await Rn(),je(!1),Ke(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Confirm"})]})]})}),fe&&Qe&&(0,g.jsx)(U,{onClick:()=>be(!1),children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(Y,{children:"Resend Invoice"}),(0,g.jsx)(V,{onClick:()=>be(!1),children:"\xd7"})]}),(0,g.jsx)(q,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,g.jsx)("strong",{children:Qe.invoiceNumber})," to ",(0,g.jsx)("strong",{children:Qe.managerName}),"?"]}),(0,g.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,g.jsxs)(G,{children:[(0,g.jsx)(y,{variant:"secondary",onClick:()=>be(!1),children:"Cancel"}),(0,g.jsx)(y,{variant:"primary",onClick:()=>{Qe&&(be(!1),Ke(null))},children:"Resend Invoice"})]})]})}),we&&Qe&&(0,g.jsx)(U,{onClick:()=>Ce(!1),children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(Y,{children:"Cancel Invoice"}),(0,g.jsx)(V,{onClick:()=>Ce(!1),children:"\xd7"})]}),(0,g.jsx)(q,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,g.jsx)("strong",{children:Qe.invoiceNumber}),"?"]}),(0,g.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,g.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,g.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,g.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,g.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:Qe.invoiceNumber})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:Qe.managerName})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,g.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,o.vv)(Qe.total,Qe.currency||"USD")})]})]})]})}),(0,g.jsxs)(G,{children:[(0,g.jsx)(y,{variant:"secondary",onClick:()=>Ce(!1),children:"Keep Invoice"}),(0,g.jsx)(y,{variant:"primary",onClick:async()=>{if(Qe)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Qe.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await Rn(),Ce(!1),Ke(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),ke&&Qe&&(0,g.jsx)(U,{onClick:()=>Fe(!1),children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(Y,{children:"Delete Invoice"}),(0,g.jsx)(V,{onClick:()=>Fe(!1),children:"\xd7"})]}),(0,g.jsx)(q,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,g.jsxs)("strong",{children:["#",Qe.invoiceNumber]}),"?",(0,g.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,g.jsxs)(G,{children:[(0,g.jsx)(y,{variant:"secondary",onClick:()=>Fe(!1),children:"Keep Invoice"}),(0,g.jsx)(y,{variant:"primary",onClick:async()=>{if(Qe)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Qe.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await Rn(),Fe(!1),Ke(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),Be&&De&&(0,g.jsx)(U,{onClick:()=>Se(!1),children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(Y,{children:"Send Invoice via Email"}),(0,g.jsx)(V,{onClick:()=>Se(!1),children:"\xd7"})]}),(0,g.jsxs)(q,{children:[(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Invoice"}),(0,g.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:De.invoiceNumber}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:De.customerName}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,o.vv)(De.total,De.currency||"MYR")})]})]}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(K,{children:"Recipient Email *"}),(0,g.jsx)(Z,{type:"email",value:Ae,onChange:e=>Ne(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:Ae?(0,g.jsxs)(g.Fragment,{children:["Default email for ","restaurant"===De.payerType?"Restaurant":"foodcourt_manager"===De.payerType?"Foodcourt Manager":"brand_manager"===De.payerType?"Brand Manager":"Customer"]}):(0,g.jsxs)(g.Fragment,{children:["Enter the ","restaurant"===De.payerType?"restaurant":"foodcourt_manager"===De.payerType?"foodcourt manager":"brand_manager"===De.payerType?"brand manager":"customer"," email address"]})})]}),(0,g.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,g.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(y,{variant:"secondary",onClick:()=>{Se(!1),Ee(null),Ne("")},children:"Cancel"}),(0,g.jsx)(y,{variant:"primary",onClick:async()=>{if(!De||!Ae)return $e("Please enter a valid email address."),void Te(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${De.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:Ae})});if(n.ok)$e(`Invoice sent successfully to ${Ae}`),Se(!1),Ee(null),Ne("");else{const e=await n.json();$e(e.error||"Failed to send invoice email.")}Te(!0)}catch(e){console.error("Error sending invoice email:",e),$e("Failed to send invoice email. Please try again."),Te(!0)}},disabled:!Ae||!Ae.includes("@"),children:"Send Email"})]})]})}),Ie&&(0,g.jsx)(U,{onClick:()=>Te(!1),children:(0,g.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(Y,{children:"Success"}),(0,g.jsx)(V,{onClick:()=>Te(!1),children:"\xd7"})]}),(0,g.jsx)(q,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,g.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:ze})})}),(0,g.jsx)(G,{children:(0,g.jsx)(y,{variant:"primary",onClick:()=>Te(!1),children:"OK"})})]})})]})]})})})},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var i=t(4752),a=t(9610),r=t(4414);const o=i.Ay.div`
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
`,x=e=>{let{isOpen:n,title:t,message:i,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return n?(0,r.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,r.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,r.jsxs)(s,{children:[(0,r.jsx)(l,{children:t}),(0,r.jsx)(d,{children:i})]}),(0,r.jsxs)(c,{children:[(0,r.jsx)(p,{variant:"secondary",onClick:u,children:m}),(0,r.jsx)(p,{variant:"primary",type:g,onClick:x,children:h})]})]})}):null}}}]);