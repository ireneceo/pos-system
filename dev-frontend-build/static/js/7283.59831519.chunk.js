"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7283],{2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>p,Qn:()=>c});var i=t(8819),r=(t(9950),t(4752)),a=t(4414);const o=r.Ay.div`
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
`,s=r.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${i.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
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
`,l=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  &:disabled {
    background: ${i.w.colors.surfaceHover};
    color: ${i.w.colors.text.muted};
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
`,c=e=>{let{children:n,className:t,style:i,...r}=e;return(0,a.jsx)(o,{className:t,style:i,...r,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,a.jsx)(s,{placeholder:n,...t})},p=e=>{let{children:n,...t}=e;return(0,a.jsx)(l,{...t,children:n})}},2597:(e,n,t)=>{t.d(n,{Ex:()=>d,oz:()=>c,tU:()=>l});t(9950);var i=t(4752),r=t(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i}=e;return(0,r.jsx)(a,{className:t,style:i,children:n})},c=e=>{let{active:n,onClick:t,children:i,className:a}=e;return(0,r.jsx)(o,{active:n,onClick:t,className:a,children:i})},d=e=>{let{count:n,variant:t="default",showZero:i=!1}=e;return 0!==n||i?(0,r.jsx)(s,{variant:t,children:n}):null}},7283:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Y});var i=t(8819),r=t(9950),a=t(4752),o=t(4492),s=t(6038),l=t(9018),c=t(4728),d=t(7617),p=t(2674),x=t(2488),u=t(2597),h=t(5612),m=t(1052),g=t.n(m),y=t(4414);a.Ay.div`
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
`;const v=(0,a.Ay)(c.SC)``,j=a.Ay.div``,f=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,b=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,w=a.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,C=(0,a.Ay)(c.Wh)`
  white-space: normal;
  line-height: 1.3;
`,k=(a.Ay.div`
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

  ${e=>"primary"===e.variant?`\n    background: ${i.w.colors.primary};\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  `:"success"===e.variant?`\n    background: ${i.w.colors.status.successAlt2};\n    color: white;\n    border-color: #10B981;\n\n    &:hover {\n      background: #059669;\n    }\n  `:"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"email"===e.variant?`\n    background: #F3F4F6;\n    color: #6B7280;\n    border-color: ${i.w.colors.borderLight};\n    padding: 5px;\n\n    &:hover {\n      background: #E5E7EB;\n      color: #374151;\n    }\n  `:"cancel"===e.variant?`\n    background: ${i.w.colors.backgroundAlt};\n    color: #6B7C93;\n    border-color: ${i.w.colors.border};\n\n    &:hover {\n      background: ${i.w.colors.border};\n      transform: translateY(-1px);\n    }\n  `:`\n    background: transparent;\n    color: #6B7280;\n    border-color: ${i.w.colors.border};\n\n    &:hover {\n      border-color: ${i.w.colors.primary};\n      color: #635BFF;\n      background: #F4F3FF;\n    }\n  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    pointer-events: none;
  }
`),F=a.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid ${i.w.colors.border};
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
`,S=a.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,A=a.Ay.div`
  display: grid;
  gap: 12px;
`,B=a.Ay.div`
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
`,N=a.Ay.div`
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
`,D=a.Ay.div`
  flex: 1;
`,E=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,$=a.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,T=a.Ay.div`
  display: flex;
  gap: 8px;
`,I=a.Ay.span`
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
    border-color: ${i.w.colors.primary};
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
`,_=a.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,P=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,R=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,L=a.Ay.div`
  margin-bottom: 24px;
`,M=a.Ay.div`
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
`,U=a.Ay.input`
  padding: 8px 12px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,H=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,O=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,Y=(a.Ay.div``,a.Ay.div`
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
`,()=>{const{operationSettings:e}=(0,l.Pj)(),[n,t]=(0,o.ok)(),[a,c]=(0,r.useState)([]),[m,Y]=(0,r.useState)(""),[V,Q]=(0,r.useState)("month"),[J,q]=(0,r.useState)(!1),[G,Z]=(0,r.useState)(()=>{const e=new Date,n=new Date(e.getFullYear(),e.getMonth(),1),t=new Date(e.getFullYear(),e.getMonth()+1,0),i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:i(n),end:i(t)}}),[X,K]=(0,r.useState)(!1),[ee,ne]=(0,r.useState)(!1),[te,ie]=(0,r.useState)(!1),[re,ae]=(0,r.useState)(!1),[oe,se]=(0,r.useState)(!1),[le,ce]=(0,r.useState)(!1),[de,pe]=(0,r.useState)(!1),[xe,ue]=(0,r.useState)(!1),[he,me]=(0,r.useState)(!1),[ge,ye]=(0,r.useState)(""),[ve,je]=(0,r.useState)(null),[fe,be]=(0,r.useState)(!1),[we,Ce]=(0,r.useState)(""),ke=n.get("tab")||"invoices",Fe=e=>{t({tab:e})},[Se,Ae]=(0,r.useState)(!1),[Be,Ne]=(0,r.useState)(null),[De,Ee]=(0,r.useState)({name:"",code:"",description:""}),[$e,Te]=(0,r.useState)(!1),[Ie,ze]=(0,r.useState)(!1),[_e,Pe]=(0,r.useState)(null),[Re,Le]=(0,r.useState)(null),[Me,We]=(0,r.useState)(null),[Ue,He]=(0,r.useState)(""),[Oe,Ye]=(0,r.useState)({managers:[],restaurants:[]}),[Ve,Qe]=(0,r.useState)(!1),[Je,qe]=(0,r.useState)(null),[Ge,Ze]=(0,r.useState)([]),[Xe,Ke]=(0,r.useState)([]),[en,nn]=(0,r.useState)({managers:[],restaurants:[]}),[tn,rn]=(0,r.useState)(""),[an,on]=(0,r.useState)(!1),[sn,ln]=(0,r.useState)(null),[cn,dn]=(0,r.useState)(null),[pn,xn]=(0,r.useState)({}),[un,hn]=(0,r.useState)([]),[mn,gn]=(0,r.useState)([]),[yn,vn]=(0,r.useState)([{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]),[jn,fn]=(0,r.useState)({enabled:!1,rate:0,name:"Tax"}),[bn,wn]=(0,r.useState)("issueDate"),[Cn,kn]=(0,r.useState)("desc"),[Fn,Sn]=(0,r.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),An=e=>{Q(e),q(!1);const n=new Date;let t=new Date,i=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":break;case"week":t.setDate(n.getDate()-n.getDay());break;case"month":t=new Date(n.getFullYear(),n.getMonth(),1),i=new Date(n.getFullYear(),n.getMonth()+1,0);break;case"year":t=new Date(n.getFullYear(),0,1),i=new Date(n.getFullYear(),11,31);break;case"all":t=new Date(2e3,0,1)}Z({start:r(t),end:r(i)})},Bn=(e,n)=>{q(!0),Z(t=>({...t,[e]:n}))},Nn=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void c([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),c(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),c([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),c([])}},Dn=(0,r.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&gn(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),En=e=>{e?(Ne(e),Ee({name:e.name,code:e.code,description:e.description||""})):(Ne(null),Ee({name:"",code:"",description:""})),Ae(!0)},$n=()=>{Ae(!1),Ne(null),Ee({name:"",code:"",description:""})};(0,r.useEffect)(()=>{Nn(),In(),zn(),Rn(),Tn(),Dn(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/admin/payment-settings",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();if(e.additionalCharges&&Array.isArray(e.additionalCharges)){vn(e.additionalCharges);const n=e.additionalCharges.find(e=>e.enabled);n&&fn({enabled:n.enabled,rate:parseFloat(n.rate)||0,name:n.name||"Tax"})}}}catch(e){console.error("Error fetching payment settings:",e)}})()},[]);const Tn=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&xn(n.currencies)}const n=await fetch("/api/currencies/supported");if(n.ok){const e=await n.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);hn(n)}}}catch(e){console.error("Error fetching currency config:",e)}},In=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...t]}if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...n]}console.log("Fetched managers (General only):",i.length),Ze(i)}catch(e){console.error("Error fetching managers:",e),Ze([])}},zn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"USD"}});Ke(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),Ke([])}catch(e){console.error("Error fetching restaurants:",e),Ke([])}},_n=(e,n)=>{if(qe({type:e,data:n}),He("manager"===e?n.fullName:n.name),Qe(!1),"manager"===e){const e=n;We({...Me,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=Ge.find(n=>n.id===e.admin_id);We({...Me,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},Pn=async(e,n)=>{ln({type:e,data:n}),on(!1),rn("manager"===e?n.fullName:n.name);const t=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=n;try{const n=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var r;const n=await e.json(),t=n.data||n,a=null===(r=t.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=t.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",a,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var a;const n=await e.json(),t=n.data||n,r=null===(a=t.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=t.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",r,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}Sn({...Fn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i})}else{const e=n,r=Ge.find(n=>n.id===e.admin_id);try{const n=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){i=(await n.json()).currency||"USD"}}catch(o){console.error("Error fetching restaurant currency:",o)}Sn({...Fn,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:r?r.fullName:"",companyName:e.name,currency:i})}},Rn=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();dn(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),dn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),dn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},Ln=e=>{if(!cn)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid ${i.w.colors.borderLight}; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: ${i.w.colors.secondary}; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: ${i.w.colors.text.muted}; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: ${i.w.colors.secondary}; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: ${i.w.colors.text.muted}; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: ${i.w.colors.text.muted}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: ${i.w.colors.secondary}; }\n        .customer-details { font-size: 13px; color: ${i.w.colors.text.muted}; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: ${i.w.colors.text.muted}; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: ${i.w.colors.text.muted}; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: ${i.w.colors.text.muted}; }\n        .summary-row.tax { color: ${i.w.colors.text.muted}; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${cn.companyLogo?`<img src="${cn.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${cn.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${cn.address?`${cn.address}<br>`:""}\n                    ${[cn.city,cn.state,cn.postalCode].filter(Boolean).join(", ")}${cn.city||cn.state||cn.postalCode?"<br>":""}\n                    ${cn.country?`${cn.country}<br>`:""}\n                    ${cn.phone?`Tel: ${cn.phone}<br>`:""}\n                    ${cn.email?`Email: ${cn.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${nt(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${nt(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${nt(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,s.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,s.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,s.vv)(e.subtotalBeforeDiscount||e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${e.discountType&&"none"!==e.discountType&&e.discountAmount>0?`\n                <div class="summary-row tax" style="color: #15803D;">\n                    <span>Discount${"percentage"===e.discountType?` (${e.discountValue}%)`:""}:</span>\n                    <span>-${(0,s.vv)(e.discountAmount,e.currency||"MYR")}</span>\n                </div>\n                `:""}\n                ${(e.additionalCharges||[]).map(n=>`\n                <div class="summary-row tax">\n                    <span>${n.name} (${n.rate}%):</span>\n                    <span>${(0,s.vv)(n.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,s.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${cn.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${cn.bankName}<br>\n                <strong>Account Name:</strong> ${cn.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${cn.bankAccount||"-"}\n                ${cn.swiftCode?`<br><strong>SWIFT Code:</strong> ${cn.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${cn.taxNumber||cn.registrationNumber?`\n        <div class="registration-info">\n            ${cn.registrationNumber?`Reg No: ${cn.registrationNumber}`:""}\n            ${cn.registrationNumber&&cn.taxNumber?" | ":""}\n            ${cn.taxNumber?`Tax No: ${cn.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},Mn=async e=>{if(!cn)return Ce("Company settings not loaded. Please try again."),void be(!0);try{var n;const t=Ln(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(t),r.close(),await new Promise(async e=>{try{var n;null!==(n=r.fonts)&&void 0!==n&&n.ready&&await r.fonts.ready}catch{}const t=r.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const a=await g()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new h.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,c=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,c),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),Ce("Failed to generate PDF. Please try again."),be(!0)}},Wn=e=>{if(!cn)return Ce("Company settings not loaded. Please try again."),void be(!0);const n=Ln(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},Un=async e=>{je(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=Xe.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=Ge.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=Ge.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}ye(n),me(!0)},Hn=()=>{Sn({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),ln(null),rn(""),on(!1)},On=e=>{if("pending_payment"!==e.status)return!1;const n=new Date;return new Date(e.dueDate)<n},Yn=e=>On(e)?"overdue":e.status,Vn=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},Qn=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},Jn=a.filter(e=>{const n=m.toLowerCase(),t=Vn(e.status).toLowerCase(),i="automatic"===e.type?"auto automatic":"manual",r=(e.planType||"").toLowerCase(),a=(e.categoryDisplayName||"").toLowerCase(),o=(e.customerName||e.restaurantName||"").toLowerCase(),s=Qn(e.payerType||"restaurant").toLowerCase(),l=!m||e.companyName.toLowerCase().includes(n)||e.invoiceNumber.toLowerCase().includes(n)||e.managerName.toLowerCase().includes(n)||t.includes(n)||i.includes(n)||r.includes(n)||a.includes(n)||o.includes(n)||s.includes(n)||(e.billingPeriod||"").toLowerCase().includes(n);let c=!0;if(G.start&&G.end){const n=new Date(e.issueDate),t=new Date(G.start),i=new Date(G.end);t.setHours(0,0,0,0),i.setHours(23,59,59,999),c=n>=t&&n<=i}return l&&c}).sort((e,n)=>{let t=0;switch(bn){case"invoiceNumber":t=e.invoiceNumber.localeCompare(n.invoiceNumber);break;case"companyName":t=e.companyName.localeCompare(n.companyName);break;case"issueDate":default:t=new Date(e.issueDate).getTime()-new Date(n.issueDate).getTime();break;case"dueDate":t=new Date(e.dueDate).getTime()-new Date(n.dueDate).getTime();break;case"amount":t=e.total-n.total;break;case"status":t=(e.status||"").localeCompare(n.status||"")}return"desc"===Cn?-t:t}),qn=e=>{bn===e?kn("asc"===Cn?"desc":"asc"):(wn(e),kn("dueDate"===e||"amount"===e?"desc":"asc"))},Gn=e=>bn!==e?"":"asc"===Cn?" \u25b2":" \u25bc",Zn=a.length,Xn=a.filter(e=>"paid"===e.status).length,Kn=a.filter(e=>On(e)).length,et=a.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),nt=e=>new Date(e).toLocaleDateString("en-MY"),tt=e=>{Le(e),ne(!0)},it=e=>{var n,t;if(Le(e),We({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=Xe.find(n=>n.id===e.restaurantId);n&&(qe({type:"restaurant",data:n}),He(n.name))}else if(e.managerId){const n=Ge.find(n=>n.id===e.managerId);n&&(qe({type:"manager",data:n}),He(n.fullName))}ie(!0)},rt=e=>{Le(e),ue(!0)};return(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(p.mc,{children:[(0,y.jsxs)(p.Y9,{children:[(0,y.jsx)(p.hE,{children:"Invoices"}),(0,y.jsx)(p.ex,{})]}),(0,y.jsxs)(p.UC,{children:[(0,y.jsxs)(p.MD,{children:[(0,y.jsxs)(p.hI,{color:"#059669",children:[(0,y.jsx)(p.Os,{children:Zn}),(0,y.jsx)(p.v0,{children:"Total Invoices"}),(0,y.jsx)(p.d1,{children:"All invoice records"})]}),(0,y.jsxs)(p.hI,{color:"#2563EB",children:[(0,y.jsx)(p.Os,{children:Xn}),(0,y.jsx)(p.v0,{children:"Paid Invoices"}),(0,y.jsxs)(p.d1,{children:[Zn>0?Math.round(Xn/Zn*100):0,"% completed"]})]}),(0,y.jsxs)(p.hI,{color:"#DC2626",children:[(0,y.jsx)(p.Os,{children:Kn}),(0,y.jsx)(p.v0,{children:"Overdue Invoices"}),(0,y.jsx)(p.d1,{children:"Requires attention"})]}),(0,y.jsxs)(p.hI,{color:"#7C3AED",children:[(0,y.jsx)(p.Os,{children:(0,s.vv)(et)}),(0,y.jsx)(p.v0,{children:"Total Revenue"}),(0,y.jsx)(p.d1,{children:"From paid invoices"})]})]}),(0,y.jsxs)(u.tU,{children:[(0,y.jsx)(u.oz,{active:"invoices"===ke,onClick:()=>Fe("invoices"),children:"Invoices"}),(0,y.jsxs)(u.oz,{active:"payment_submitted"===ke,onClick:()=>Fe("payment_submitted"),children:["Payment Submitted",(0,y.jsx)(u.Ex,{count:a.filter(e=>"payment_submitted"===e.status).length,variant:"danger"})]}),(0,y.jsx)(u.oz,{active:"categories"===ke,onClick:()=>Fe("categories"),children:"Invoice Categories"})]}),"invoices"===ke&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(L,{children:(0,y.jsxs)(M,{children:[(0,y.jsx)(x.DO,{placeholder:"Search invoices... (status, type, customer, etc.)",value:m,onChange:e=>Y(e.target.value),style:{minWidth:"280px",maxWidth:"350px"}}),(0,y.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginLeft:"16px"},children:[(0,y.jsx)(W,{active:"week"===V&&!J,onClick:()=>An("week"),children:"Week"}),(0,y.jsx)(W,{active:"month"===V&&!J,onClick:()=>An("month"),children:"Month"}),(0,y.jsx)(W,{active:"year"===V&&!J,onClick:()=>An("year"),children:"Year"}),(0,y.jsx)(W,{active:"all"===V&&!J,onClick:()=>An("all"),children:"All"}),(0,y.jsx)(U,{type:"date",value:G.start,onChange:e=>Bn("start",e.target.value)}),(0,y.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,y.jsx)(U,{type:"date",value:G.end,onChange:e=>Bn("end",e.target.value)})]}),(0,y.jsx)("div",{style:{marginLeft:"auto"},children:(0,y.jsx)(v,{variant:"primary",onClick:()=>{Hn(),K(!0)},children:"Create Invoice"})})]})}),(0,y.jsxs)(p.an,{children:[(0,y.jsxs)(p.bQ,{children:[(0,y.jsx)(p.B_,{children:(0,y.jsxs)("tr",{children:[(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>qn("invoiceNumber"),children:["Invoice",Gn("invoiceNumber")]}),(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>qn("companyName"),children:["Customer",Gn("companyName")]}),(0,y.jsx)(p.gU,{align:"center",children:"Period"}),(0,y.jsx)(p.gU,{align:"center",children:"Issued"}),(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>qn("dueDate"),children:["Due",Gn("dueDate")]}),(0,y.jsxs)(p.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>qn("status"),children:["Status",Gn("status")]}),(0,y.jsxs)(p.gU,{align:"right",style:{cursor:"pointer"},onClick:()=>qn("amount"),children:["Amount",Gn("amount")]}),(0,y.jsx)(p.gU,{align:"right",children:"Total"}),(0,y.jsx)(p.gU,{isActions:!0,children:"Actions"})]})}),(0,y.jsx)("tbody",{children:Jn.map(e=>(0,y.jsxs)(p.J2,{children:[(0,y.jsx)(p.Bv,{"data-label":"Invoice",children:(0,y.jsxs)(j,{children:[(0,y.jsxs)(f,{children:[e.invoiceNumber,"automatic"===e.type&&(0,y.jsx)(w,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,y.jsx)(b,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,y.jsx)(p.Bv,{"data-label":"Customer",children:(0,y.jsxs)(j,{children:[(0,y.jsx)(f,{children:e.customerName||e.restaurantName||"Unknown"}),(0,y.jsx)(b,{children:Qn(e.payerType||"restaurant")})]})}),(0,y.jsx)(p.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,y.jsx)(p.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:nt(e.issueDate)}),(0,y.jsx)(p.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:nt(e.dueDate)}),(0,y.jsx)(p.Bv,{"data-label":"Status",align:"center",children:(0,y.jsx)(C,{status:Yn(e),children:Vn(Yn(e))})}),(0,y.jsx)(p.Bv,{"data-label":"Amount",align:"right",children:(0,y.jsx)(p.DM,{children:(0,s.vv)(e.amount,e.currency||"USD")})}),(0,y.jsx)(p.Bv,{"data-label":"Total",align:"right",children:(0,y.jsx)(p.DM,{highlight:!0,children:0===e.total?(0,y.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,s.vv)(e.total,e.currency||"USD")})}),(0,y.jsx)(p.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,y.jsxs)(p.wr,{children:[(0,y.jsx)(k,{variant:"primary",onClick:()=>tt(e),children:"View"}),"draft"===e.status&&(0,y.jsxs)(y.Fragment,{children:["automatic"!==e.type&&(0,y.jsx)(k,{onClick:()=>it(e),children:"Edit"}),(0,y.jsx)(k,{variant:"success",onClick:()=>(e=>{Le(e),se(!0)})(e),title:"Send Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,y.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,y.jsx)(F,{onClick:()=>rt(e),title:"Delete Invoice",children:(0,y.jsx)(S,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,y.jsxs)(y.Fragment,{children:["automatic"!==e.type&&(0,y.jsx)(k,{onClick:()=>it(e),children:"Edit"}),(0,y.jsx)(k,{onClick:()=>Mn(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>Wn(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,y.jsx)(k,{variant:"email",onClick:()=>Un(e),title:"Send Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,y.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,y.jsx)(F,{onClick:()=>rt(e),title:"Delete Invoice",children:(0,y.jsx)(S,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,y.jsxs)(y.Fragment,{children:[e.hasPaymentInfo&&(0,y.jsx)(k,{variant:"primary",onClick:()=>(e=>{Le(e),ae(!0)})(e),children:"Confirm"}),(0,y.jsx)(k,{onClick:()=>Mn(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>Wn(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,y.jsx)(k,{variant:"email",onClick:()=>Un(e),title:"Resend Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,y.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,y.jsxs)(y.Fragment,{children:["automatic"!==e.type&&(0,y.jsx)(k,{onClick:()=>it(e),children:"Edit"}),(0,y.jsx)(k,{onClick:()=>Mn(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>Wn(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,y.jsx)(k,{variant:"email",onClick:()=>Un(e),title:"Resend Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,y.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,y.jsx)(F,{onClick:()=>rt(e),title:"Delete Invoice",children:(0,y.jsx)(S,{children:"\xd7"})})]}),"paid"===e.status&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(k,{onClick:()=>Mn(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(k,{onClick:()=>Wn(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,y.jsx)(k,{onClick:()=>Mn(e),title:"Download Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id))})]}),0===Jn.length&&(0,y.jsxs)(p.ys,{children:[(0,y.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,y.jsx)("div",{style:{fontSize:"14px"},children:0===a.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"payment_submitted"===ke&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"Payment Confirmation Required"}),(0,y.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:0},children:"These invoices have payment submitted and are waiting for your confirmation."})]}),(0,y.jsxs)(p.an,{children:[(0,y.jsxs)(p.bQ,{children:[(0,y.jsx)(p.B_,{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(p.gU,{align:"center",children:"Invoice"}),(0,y.jsx)(p.gU,{align:"center",children:"Customer"}),(0,y.jsx)(p.gU,{align:"center",children:"Payment Method"}),(0,y.jsx)(p.gU,{align:"center",children:"Submitted Date"}),(0,y.jsx)(p.gU,{align:"right",children:"Amount"}),(0,y.jsx)(p.gU,{isActions:!0,children:"Actions"})]})}),(0,y.jsx)("tbody",{children:a.filter(e=>"payment_submitted"===e.status).map(e=>(0,y.jsxs)(p.J2,{children:[(0,y.jsx)(p.Bv,{"data-label":"Invoice",children:(0,y.jsxs)(j,{children:[(0,y.jsx)(f,{children:e.invoiceNumber}),(0,y.jsx)(b,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,y.jsx)(p.Bv,{"data-label":"Customer",children:(0,y.jsxs)(j,{children:[(0,y.jsx)(f,{children:e.customerName||e.restaurantName||"Unknown"}),(0,y.jsx)(b,{children:e.companyName})]})}),(0,y.jsx)(p.Bv,{"data-label":"Payment Method",align:"center",children:e.paymentMethod||"-"}),(0,y.jsx)(p.Bv,{"data-label":"Submitted",align:"center",children:e.paidDate?nt(e.paidDate):"-"}),(0,y.jsx)(p.Bv,{"data-label":"Amount",align:"right",children:(0,y.jsx)(p.DM,{highlight:!0,children:0===e.total?(0,y.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,s.vv)(e.total,e.currency||"USD")})}),(0,y.jsx)(p.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,y.jsxs)(p.wr,{children:[(0,y.jsx)(k,{onClick:()=>tt(e),children:"View"}),(0,y.jsx)(k,{variant:"primary",onClick:()=>{Le(e),ae(!0)},children:"Confirm Payment"})]})})]},e.id))})]}),0===a.filter(e=>"payment_submitted"===e.status).length&&(0,y.jsxs)(p.ys,{children:[(0,y.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",marginBottom:"8px"},children:"No Pending Confirmations"}),(0,y.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"There are no invoices waiting for payment confirmation."})]})]})]}),"categories"===ke&&(0,y.jsxs)("div",{style:{padding:"24px 0"},children:[(0,y.jsxs)(P,{children:[(0,y.jsxs)("div",{children:[(0,y.jsx)(R,{children:"Invoice Categories"}),(0,y.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,y.jsx)(v,{variant:"primary",onClick:()=>En(),children:"Add Category"})]}),0===mn.length?(0,y.jsxs)(_,{children:[(0,y.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,y.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,y.jsx)(v,{variant:"primary",onClick:()=>En(),children:"Add Category"})]}):(0,y.jsx)(A,{children:mn.map(e=>(0,y.jsxs)(B,{isActive:e.is_active,children:[(0,y.jsx)(N,{children:e.name.charAt(0).toUpperCase()}),(0,y.jsxs)(D,{children:[(0,y.jsxs)(E,{children:[e.name,(0,y.jsx)(I,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,y.jsxs)($,{children:[(0,y.jsxs)("span",{children:["Code: ",(0,y.jsx)("strong",{children:e.code})]}),e.description&&(0,y.jsx)("span",{children:e.description})]})]}),(0,y.jsxs)(T,{children:[(0,y.jsx)(z,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({is_active:!e.is_active})});(await t.json()).success&&Dn()}catch(n){console.error("Failed to toggle category:",n)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,y.jsx)("circle",{cx:"12",cy:"12",r:"3"})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,y.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})})}),(0,y.jsx)(z,{onClick:()=>En(e),title:"Edit Category",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,y.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,y.jsx)(z,{onClick:()=>(e=>{Pe(e),ze(!0)})(e),title:"Delete Category",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,y.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),Se&&(0,y.jsx)(p.mH,{onClick:$n,children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsx)(p.wt,{children:Be?"Edit Category":"Add Category"}),(0,y.jsx)(p.Jn,{onClick:$n,children:"\xd7"})]}),(0,y.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),De.name.trim()&&De.code.trim())try{Te(!0);const e=localStorage.getItem("auth_token"),n=Be?`/api/invoices/categories/${Be.id}`:"/api/invoices/categories",t=Be?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:De.name.trim(),code:De.code.trim().toLowerCase().replace(/\s+/g,"_"),description:De.description.trim()||null})}),r=await i.json();r.success?($n(),Dn()):alert(r.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{Te(!1)}},children:[(0,y.jsxs)(p.cw,{children:[(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Name *"}),(0,y.jsx)(p.ZQ,{value:De.name,onChange:e=>Ee({...De,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Code *"}),(0,y.jsx)(p.ZQ,{value:De.code,onChange:e=>Ee({...De,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Be||void 0===Be?void 0:Be.is_system}),(0,y.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Description"}),(0,y.jsx)(p.Lz,{value:De.description,onChange:e=>Ee({...De,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,y.jsxs)(p.jl,{children:[(0,y.jsx)(v,{variant:"secondary",type:"button",onClick:$n,children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",type:"submit",disabled:$e||!De.name||!De.code,children:$e?"Saving...":Be?"Update":"Create"})]})]})]})}),(0,y.jsx)(d.A,{isOpen:Ie,onCancel:()=>ze(!1),onConfirm:async()=>{if(_e)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${_e.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(ze(!1),Pe(null),Dn()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===_e||void 0===_e?void 0:_e.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),X&&(0,y.jsx)(p.mH,{onClick:e=>{e.target===e.currentTarget&&(K(!1),Hn())},children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsx)(p.wt,{children:"Create Invoice"}),(0,y.jsx)(p.Jn,{onClick:()=>{K(!1),Hn()},children:"\xd7"})]}),(0,y.jsxs)(p.cw,{children:[(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Search Manager or Restaurant *"}),(0,y.jsxs)("div",{style:{position:"relative"},children:[(0,y.jsx)(p.ZQ,{type:"text",value:tn,onChange:e=>(e=>{if(rn(e),on(!0),e.length<2)return void nn({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",Ge),console.log("Available restaurants:",Xe);const n=Ge.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=Xe.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),nn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>on(!0),onBlur:()=>setTimeout(()=>on(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),an&&(en.managers.length>0||en.restaurants.length>0)&&(0,y.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[en.managers.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),en.managers.map(e=>(0,y.jsxs)("div",{onClick:()=>Pn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),en.restaurants.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),en.restaurants.map(e=>{const n=Ge.find(n=>n.id===e.admin_id);return(0,y.jsxs)("div",{onClick:()=>Pn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),sn&&(0,y.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===sn.type?sn.data.fullName:sn.data.name}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===sn.type?`${sn.data.companyName} \u2022 Manager`:`${sn.data.address||"No address"} \u2022 Restaurant`})]}),(0,y.jsx)("button",{onClick:()=>{ln(null),rn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,y.jsxs)(p.fh,{children:[(0,y.jsxs)(p.gE,{children:[(0,y.jsxs)(p.lR,{children:["Amount",Fn.currency?` (${Fn.currency})`:""," *"]}),(0,y.jsx)(p.ZQ,{type:"number",step:Fn.currency&&0===(0,s.e_)(Fn.currency)?"1":"0.01",min:"0",value:Fn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(Fn.discountValue)||0,i="percentage"===Fn.discountType?n*(t/100):"fixed"===Fn.discountType?t:0,r=Math.max(0,n-i),a=yn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),o=r+a;Sn({...Fn,amount:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},onBlur:e=>{if(e.target.value&&Fn.currency){const n=(0,s.e_)(Fn.currency),t=parseFloat(e.target.value)||0,i=t.toFixed(n),r=parseFloat(Fn.discountValue)||0,a="percentage"===Fn.discountType?t*(r/100):"fixed"===Fn.discountType?r:0,o=Math.max(0,t-a),l=yn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+o*n.rate/100,0),c=o+l;Sn({...Fn,amount:i,tax:l.toFixed(n),total:c.toFixed(n)})}},placeholder:Fn.currency&&0===(0,s.e_)(Fn.currency)?"0":"0.00",required:!0,disabled:!sn}),!sn&&(0,y.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Due Date *"}),(0,y.jsx)(p.ZQ,{type:"date",value:Fn.dueDate,onChange:e=>Sn({...Fn,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,y.jsxs)(p.fh,{children:[(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Discount"}),(0,y.jsxs)(p.FX,{value:Fn.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(Fn.amount)||0,i="none"===n?0:parseFloat(Fn.discountValue)||0,r="percentage"===n?t*(i/100):"fixed"===n?i:0,a=Math.max(0,t-r),o=yn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),s=a+o;Sn({...Fn,discountType:n,discountValue:"none"===n?"":Fn.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,y.jsx)("option",{value:"none",children:"No Discount"}),(0,y.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,y.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Fn.discountType&&(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"percentage"===Fn.discountType?"Discount (%)":"Discount Amount"}),(0,y.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",max:"percentage"===Fn.discountType?"100":void 0,value:Fn.discountValue,onChange:e=>{const n=parseFloat(Fn.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===Fn.discountType?n*(t/100):t,r=Math.max(0,n-i),a=yn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),o=r+a;Sn({...Fn,discountValue:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Fn.discountType&&(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Discount Reason"}),(0,y.jsx)(p.ZQ,{type:"text",value:Fn.discountReason,onChange:e=>Sn({...Fn,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Invoice Category"}),(0,y.jsx)(p.FX,{value:Fn.invoiceCategory||"service",onChange:e=>Sn({...Fn,invoiceCategory:e.target.value}),children:mn.length>0?mn.filter(e=>"subscription"!==e.code).map(e=>(0,y.jsx)("option",{value:e.code,children:e.name},e.id)):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("option",{value:"service",children:"Service"}),(0,y.jsx)("option",{value:"consulting",children:"Consulting"}),(0,y.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Fn.invoiceCategory||"service")&&(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Item/Description"}),(0,y.jsx)(p.Lz,{value:"others"===Fn.invoiceCategory?Fn.customDescription||"":Fn.serviceDescription||"",onChange:e=>{"others"===Fn.invoiceCategory?Sn({...Fn,customDescription:e.target.value}):Sn({...Fn,serviceDescription:e.target.value})},placeholder:`Enter ${Fn.invoiceCategory||"service"} description...`,rows:2})]}),(0,y.jsxs)(H,{children:[(0,y.jsxs)(O,{children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:Fn.currency?(0,s.vv)(parseFloat(Fn.amount||"0"),Fn.currency):"-"})]}),"none"!==Fn.discountType&&parseFloat(Fn.discountValue||"0")>0&&(()=>{const e=parseFloat(Fn.amount||"0"),n=parseFloat(Fn.discountValue||"0"),t="percentage"===Fn.discountType?e*(n/100):n;return(0,y.jsxs)(O,{children:[(0,y.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Fn.discountType?` (${n}%)`:"",":"]}),(0,y.jsxs)("span",{style:{color:"#15803D"},children:["-",Fn.currency?(0,s.vv)(t,Fn.currency):"-"]})]})})(),yn.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(Fn.amount||"0"),i=parseFloat(Fn.discountValue||"0"),r="percentage"===Fn.discountType?t*(i/100):"fixed"===Fn.discountType?i:0,a=Math.max(0,t-r)*(e.rate/100);return(0,y.jsxs)(O,{children:[(0,y.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,y.jsx)("span",{children:Fn.currency?(0,s.vv)(a,Fn.currency):"-"})]},n)}),(0,y.jsxs)(O,{highlight:!0,children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:Fn.currency?(0,s.vv)(parseFloat(Fn.total||"0"),Fn.currency):"-"})})]})]})]}),(0,y.jsxs)(p.jl,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>{K(!1),Hn()},children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(sn&&Fn.amount&&Fn.dueDate)try{const e=parseFloat(Fn.amount),n=parseFloat(Fn.discountValue)||0,t="percentage"===Fn.discountType?e*(n/100):"fixed"===Fn.discountType?n:0,i=Math.max(0,e-t),r=yn.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(i*e.rate/100*100)/100})),a=r.reduce((e,n)=>e+n.amount,0),o=i+a;let s="";s="others"===Fn.invoiceCategory?Fn.customDescription||"":Fn.serviceDescription||"";let l="",c="",d="",p="";if("restaurant"===sn.type){const e=sn.data;l=e.name,p=e.name,d=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),c=n.join("\n")}else if("manager"===sn.type){const e=sn.data;l=e.fullName,d=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),c=n.join("\n")}let x="restaurant";if("manager"===sn.type){const e=sn.data;"Brand General"===e.role||"Brand Manager"===e.role?x="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(x="foodcourt_manager")}const u={restaurant_id:"restaurant"===sn.type?sn.data.id:null,payer_type:x,payer_id:"manager"===sn.type?sn.data.id:null,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(Fn.dueDate).toISOString(),total_amount:o,subtotal_before_discount:t>0?e:null,discount_type:"none"!==Fn.discountType?Fn.discountType:null,discount_value:t>0?n:null,discount_amount:t>0?t:null,discount_reason:Fn.discountReason||null,currency:Fn.currency||"USD",status:"draft",notes:`${d}\n${l}\n${c}\n\n${s}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:Fn.invoiceCategory||"service",additional_charges:r},h=[{item_type:Fn.invoiceCategory,description:s,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],m=localStorage.getItem("auth_token"),g=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({invoice_data:u,items:h})});if(g.ok)await Nn(),K(!1),Hn();else{const e=await g.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!sn||!Fn.amount||!Fn.dueDate,children:"Create Invoice"})]})]})}),ee&&Re&&(0,y.jsx)(p.mH,{onClick:()=>ne(!1),children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsx)(p.wt,{children:"Invoice Details"}),(0,y.jsx)(p.Jn,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,y.jsxs)(p.cw,{children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,y.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===cn||void 0===cn?void 0:cn.companyLogo)&&(0,y.jsx)("img",{src:cn.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,y.jsx)("div",{style:{fontSize:null!==cn&&void 0!==cn&&cn.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===cn||void 0===cn?void 0:cn.companyName)||"Company Name"}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===cn||void 0===cn?void 0:cn.address)&&(0,y.jsx)("div",{children:cn.address}),((null===cn||void 0===cn?void 0:cn.city)||(null===cn||void 0===cn?void 0:cn.state)||(null===cn||void 0===cn?void 0:cn.postalCode))&&(0,y.jsx)("div",{children:[null===cn||void 0===cn?void 0:cn.city,null===cn||void 0===cn?void 0:cn.state,null===cn||void 0===cn?void 0:cn.postalCode].filter(Boolean).join(", ")}),(null===cn||void 0===cn?void 0:cn.country)&&(0,y.jsx)("div",{children:cn.country}),(null===cn||void 0===cn?void 0:cn.phone)&&(0,y.jsxs)("div",{children:["Tel: ",cn.phone]}),(null===cn||void 0===cn?void 0:cn.email)&&(0,y.jsxs)("div",{children:["Email: ",cn.email]})]})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,y.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Re.invoiceNumber}),(0,y.jsx)(C,{status:Re.status,style:{marginTop:"8px"},children:Vn(Re.status)})]})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,y.jsxs)("div",{style:{flex:1},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,y.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:Re.customerName}),Re.customerAddress&&(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:Re.customerAddress}),"restaurant"===Re.payerType&&Re.restaurantName&&"Unknown Restaurant"!==Re.restaurantName&&(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",Re.restaurantName]}),Re.companyName&&Re.companyName!==Re.customerName&&(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",Re.companyName]})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Re.billingPeriod||"-"})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:nt(Re.issueDate)})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:nt(Re.dueDate)})]}),Re.paidDate&&(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:nt(Re.paidDate)})]})]})]}),(0,y.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,y.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,y.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,y.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,y.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,y.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,y.jsx)("tbody",{children:Re.items.map((e,n)=>(0,y.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.unitPrice,Re.currency||"MYR")}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.total,Re.currency||"MYR")})]},n))})]})]}),(0,y.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,y.jsx)("div",{style:{width:"280px"},children:(0,y.jsxs)(H,{children:[(0,y.jsxs)(O,{children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:(0,s.vv)(Re.subtotalBeforeDiscount||Re.amount,Re.currency||"MYR")})]}),Re.discountType&&"none"!==Re.discountType&&Re.discountAmount>0&&(0,y.jsxs)(O,{children:[(0,y.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Re.discountType?` (${Re.discountValue}%)`:"",":"]}),(0,y.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,s.vv)(Re.discountAmount,Re.currency||"MYR")]})]}),(Re.additionalCharges||[]).map((e,n)=>(0,y.jsxs)(O,{children:[(0,y.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,y.jsx)("span",{children:(0,s.vv)(e.amount,Re.currency||"MYR")})]},n)),(0,y.jsxs)(O,{highlight:!0,children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:(0,s.vv)(Re.total,Re.currency||"MYR")})})]})]})})}),(null===cn||void 0===cn?void 0:cn.bankName)&&(0,y.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Bank:"})," ",cn.bankName]}),(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Account Name:"})," ",cn.bankAccountName]}),(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Account Number:"})," ",cn.bankAccount]})]})]}),((null===cn||void 0===cn?void 0:cn.taxNumber)||(null===cn||void 0===cn?void 0:cn.registrationNumber))&&(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===cn||void 0===cn?void 0:cn.registrationNumber)&&(0,y.jsxs)("span",{children:["Reg No: ",cn.registrationNumber]}),(null===cn||void 0===cn?void 0:cn.registrationNumber)&&(null===cn||void 0===cn?void 0:cn.taxNumber)&&(0,y.jsx)("span",{children:" | "}),(null===cn||void 0===cn?void 0:cn.taxNumber)&&(0,y.jsxs)("span",{children:["Tax No: ",cn.taxNumber]})]})]})]})}),re&&Re&&(0,y.jsx)(p.mH,{onClick:()=>ae(!1),children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsxs)(p.wt,{children:["Confirm Payment - ",Re.invoiceNumber]}),(0,y.jsx)(p.Jn,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,y.jsxs)(p.cw,{children:[(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Invoice Summary"}),(0,y.jsxs)(H,{children:[(0,y.jsxs)(O,{children:[(0,y.jsx)("span",{children:"Customer:"}),(0,y.jsx)("span",{children:Re.customerName||Re.managerName})]}),(0,y.jsxs)(O,{children:[(0,y.jsx)("span",{children:"Company:"}),(0,y.jsx)("span",{children:Re.companyName})]}),(0,y.jsxs)(O,{children:[(0,y.jsx)("span",{children:"Invoice Number:"}),(0,y.jsx)("span",{children:Re.invoiceNumber})]}),(0,y.jsxs)(O,{children:[(0,y.jsx)("span",{children:"Due Date:"}),(0,y.jsx)("span",{children:nt(Re.dueDate)})]}),(0,y.jsxs)(O,{highlight:!0,children:[(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:"Payment Amount:"})}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:(0,s.vv)(Re.total,Re.currency||"USD")})})]})]})]}),Re.hasPaymentInfo&&(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Customer's Payment Information"}),(0,y.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,y.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,y.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,y.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===Re.paymentMethod?"Bank Transfer":"qr_payment"===Re.paymentMethod?"QR Payment":"stripe"===Re.paymentMethod?"Stripe":"paypal"===Re.paymentMethod?"PayPal":Re.paymentMethod||"Not specified"]}),Re.transactionId&&(0,y.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,y.jsx)("strong",{children:"Transaction ID:"})," ",Re.transactionId]})]}),Re.receiptUrl&&(0,y.jsxs)("div",{style:{marginTop:"12px"},children:[(0,y.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,y.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,y.jsx)("img",{src:Re.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(Re.receiptUrl,"_blank")}),(0,y.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,y.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,y.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,y.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,y.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Status Change"}),(0,y.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,y.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,y.jsxs)(p.jl,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Re)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Re.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await Nn(),ae(!1),Le(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),te&&Re&&Me&&(0,y.jsx)(p.mH,{onClick:()=>ie(!1),children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsxs)(p.wt,{children:["Edit Invoice - ",Re.invoiceNumber]}),(0,y.jsx)(p.Jn,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,y.jsxs)(p.cw,{children:[(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Search Manager or Restaurant *"}),(0,y.jsxs)("div",{style:{position:"relative"},children:[(0,y.jsx)(p.ZQ,{type:"text",value:Ue,onChange:e=>(e=>{if(He(e),Qe(!0),e.length<2)return void Ye({managers:[],restaurants:[]});const n=Ge.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=Xe.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));Ye({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>Qe(!0),onBlur:()=>setTimeout(()=>Qe(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),Ve&&(Oe.managers.length>0||Oe.restaurants.length>0)&&(0,y.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[Oe.managers.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),Oe.managers.map(e=>(0,y.jsxs)("div",{onClick:()=>_n("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),Oe.restaurants.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),Oe.restaurants.map(e=>{const n=Ge.find(n=>n.id===e.admin_id);return(0,y.jsxs)("div",{onClick:()=>_n("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),Je&&(0,y.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Je.type?Je.data.fullName:Je.data.name}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Je.type?`${Je.data.companyName} \u2022 Manager`:`${Je.data.address||"No address"} \u2022 Restaurant`})]}),(0,y.jsx)("button",{onClick:()=>{qe(null),He("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,y.jsxs)(p.fh,{children:[(0,y.jsxs)(p.gE,{children:[(0,y.jsxs)(p.lR,{children:["Amount (",e.currency||"RM",")"]}),(0,y.jsx)(p.ZQ,{type:"number",value:Me.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=yn.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+n*t.rate/100,0),i=n+t;We({...Me,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Due Date"}),(0,y.jsx)(p.ZQ,{type:"date",value:Me.dueDate,onChange:e=>We({...Me,dueDate:e.target.value})})]})]}),(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Status"}),(0,y.jsxs)(p.FX,{value:Me.status,onChange:e=>We({...Me,status:e.target.value}),children:[(0,y.jsx)("option",{value:"draft",children:"Draft"}),(0,y.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,y.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,y.jsx)("option",{value:"paid",children:"Paid"}),(0,y.jsx)("option",{value:"overdue",children:"Overdue"}),(0,y.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Invoice Category"}),(0,y.jsx)(p.FX,{value:Me.invoiceCategory||"service",onChange:e=>We({...Me,invoiceCategory:e.target.value}),children:mn.length>0?mn.filter(e=>"subscription"!==e.code).map(e=>(0,y.jsx)("option",{value:e.code,children:e.name},e.id)):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("option",{value:"service",children:"Service"}),(0,y.jsx)("option",{value:"consulting",children:"Consulting"}),(0,y.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Me.invoiceCategory||"service")&&(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Item/Description"}),(0,y.jsx)(p.Lz,{value:"others"===Me.invoiceCategory?Me.customDescription||"":Me.serviceDescription||"",onChange:e=>{"others"===Me.invoiceCategory?We({...Me,customDescription:e.target.value}):We({...Me,serviceDescription:e.target.value})},placeholder:`Enter ${Me.invoiceCategory||"service"} description...`,rows:2})]}),(0,y.jsxs)(H,{children:[(0,y.jsxs)(O,{children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:Me.currency?(0,s.vv)(parseFloat(Me.amount||"0"),Me.currency):"-"})]}),yn.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(Me.amount||"0")*e.rate/100;return(0,y.jsxs)(O,{children:[(0,y.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,y.jsx)("span",{children:Me.currency?(0,s.vv)(t,Me.currency):"-"})]},n)}),(0,y.jsxs)(O,{highlight:!0,children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsx)("span",{children:(0,y.jsx)("strong",{children:Me.currency?(0,s.vv)(parseFloat(Me.total||"0"),Me.currency):"-"})})]})]})]}),(0,y.jsxs)(p.jl,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Re&&Me)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Re.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(Me.amount),tax:parseFloat(Me.tax),total:parseFloat(Me.total),dueDate:Me.dueDate,status:Me.status,payerType:Me.payerType,payerId:Me.payerId,items:Me.items})});if(n.ok){const e={...Re,amount:parseFloat(Me.amount),tax:parseFloat(Me.tax),total:parseFloat(Me.total),dueDate:Me.dueDate,status:Me.status,payerType:Me.payerType,payerId:Me.payerId,items:Me.items};c(a.map(n=>n.id===Re.id?e:n)),ie(!1),Le(null),We(null),Ce("Invoice updated successfully!"),be(!0)}else{const e=await n.json();Ce(`Failed to update invoice: ${e.error||"Unknown error"}`),be(!0)}}catch(e){console.error("Error updating invoice:",e),Ce("Error updating invoice. Please try again."),be(!0)}},disabled:!(null!==Me&&void 0!==Me&&Me.amount)||!(null!==Me&&void 0!==Me&&Me.dueDate),children:"Save Changes"})]})]})}),oe&&Re&&(0,y.jsx)(p.mH,{onClick:()=>se(!1),children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsx)(p.wt,{children:"Send Invoice"}),(0,y.jsx)(p.Jn,{onClick:()=>se(!1),children:"\xd7"})]}),(0,y.jsx)(p.cw,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,y.jsx)("strong",{children:Re.invoiceNumber})," to ",(0,y.jsx)("strong",{children:Re.managerName||Re.customerName}),"?"]}),(0,y.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Re.invoiceNumber})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Re.managerName||Re.customerName})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Re.customerName})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,y.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,s.vv)(Re.total,Re.currency||"USD")})]})]})]})}),(0,y.jsxs)(p.jl,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"success",onClick:async()=>{if(Re)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Re.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await Nn(),se(!1),Le(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Confirm"})]})]})}),le&&Re&&(0,y.jsx)(p.mH,{onClick:()=>ce(!1),children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsx)(p.wt,{children:"Resend Invoice"}),(0,y.jsx)(p.Jn,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,y.jsx)(p.cw,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,y.jsx)("strong",{children:Re.invoiceNumber})," to ",(0,y.jsx)("strong",{children:Re.managerName}),"?"]}),(0,y.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,y.jsxs)(p.jl,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:()=>{Re&&(ce(!1),Le(null))},children:"Resend Invoice"})]})]})}),de&&Re&&(0,y.jsx)(p.mH,{onClick:()=>pe(!1),children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsx)(p.wt,{children:"Cancel Invoice"}),(0,y.jsx)(p.Jn,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,y.jsx)(p.cw,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,y.jsx)("strong",{children:Re.invoiceNumber}),"?"]}),(0,y.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,y.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,y.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,y.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,y.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Re.invoiceNumber})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,y.jsx)("span",{style:{fontWeight:"500"},children:Re.managerName})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,y.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,s.vv)(Re.total,Re.currency||"USD")})]})]})]})}),(0,y.jsxs)(p.jl,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>pe(!1),children:"Keep Invoice"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Re)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Re.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await Nn(),pe(!1),Le(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),xe&&Re&&(0,y.jsx)(p.mH,{onClick:()=>ue(!1),children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsx)(p.wt,{children:"Delete Invoice"}),(0,y.jsx)(p.Jn,{onClick:()=>ue(!1),children:"\xd7"})]}),(0,y.jsx)(p.cw,{children:(0,y.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,y.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,y.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,y.jsxs)("strong",{children:["#",Re.invoiceNumber]}),"?",(0,y.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,y.jsxs)(p.jl,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>ue(!1),children:"Keep Invoice"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(Re)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Re.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await Nn(),ue(!1),Le(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),he&&ve&&(0,y.jsx)(p.mH,{onClick:()=>me(!1),children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsx)(p.wt,{children:"Send Invoice via Email"}),(0,y.jsx)(p.Jn,{onClick:()=>me(!1),children:"\xd7"})]}),(0,y.jsxs)(p.cw,{children:[(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Invoice"}),(0,y.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,y.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:ve.invoiceNumber}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:ve.customerName}),(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,s.vv)(ve.total,ve.currency||"MYR")})]})]}),(0,y.jsxs)(p.gE,{children:[(0,y.jsx)(p.lR,{children:"Recipient Email *"}),(0,y.jsx)(p.ZQ,{type:"email",value:ge,onChange:e=>ye(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:ge?(0,y.jsxs)(y.Fragment,{children:["Default email for ","restaurant"===ve.payerType?"Restaurant":"foodcourt_manager"===ve.payerType?"Foodcourt Manager":"brand_manager"===ve.payerType?"Brand Manager":"Customer"]}):(0,y.jsxs)(y.Fragment,{children:["Enter the ","restaurant"===ve.payerType?"restaurant":"foodcourt_manager"===ve.payerType?"foodcourt manager":"brand_manager"===ve.payerType?"brand manager":"customer"," email address"]})})]}),(0,y.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,y.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,y.jsxs)(p.jl,{children:[(0,y.jsx)(v,{variant:"secondary",onClick:()=>{me(!1),je(null),ye("")},children:"Cancel"}),(0,y.jsx)(v,{variant:"primary",onClick:async()=>{if(!ve||!ge)return Ce("Please enter a valid email address."),void be(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${ve.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:ge})});if(n.ok)Ce(`Invoice sent successfully to ${ge}`),me(!1),je(null),ye("");else{const e=await n.json();Ce(e.error||"Failed to send invoice email.")}be(!0)}catch(e){console.error("Error sending invoice email:",e),Ce("Failed to send invoice email. Please try again."),be(!0)}},disabled:!ge||!ge.includes("@"),children:"Send Email"})]})]})}),fe&&(0,y.jsx)(p.mH,{onClick:()=>be(!1),children:(0,y.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(p.rQ,{children:[(0,y.jsx)(p.wt,{children:"Success"}),(0,y.jsx)(p.Jn,{onClick:()=>be(!1),children:"\xd7"})]}),(0,y.jsx)(p.cw,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,y.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:we})})}),(0,y.jsx)(p.jl,{children:(0,y.jsx)(v,{variant:"primary",onClick:()=>be(!1),children:"OK"})})]})})]})]})})})},7617:(e,n,t)=>{t.d(n,{A:()=>u});var i=t(8819),r=(t(9950),t(4752)),a=t(9610),o=t(4414);const s=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,l=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${i.w.colors.border};
`,c=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,p=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=r.Ay.button`
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
`,u=e=>{let{isOpen:n,title:t,message:i,onConfirm:r,onCancel:u,confirmText:h="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return n?(0,o.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{children:t}),(0,o.jsx)(d,{children:i})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{variant:"secondary",onClick:u,children:m}),(0,o.jsx)(x,{variant:"primary",type:g,onClick:r,children:h})]})]})}):null}}}]);