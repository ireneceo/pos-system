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
`,l=e=>{let{children:n,className:t,style:i,...o}=e;return(0,r.jsx)(a,{className:t,style:i,...o,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,r.jsx)(o,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,r.jsx)(s,{...t,children:n})}},7283:(e,n,t)=>{t.r(n),t.d(n,{default:()=>G});var i=t(9950),r=t(4752),a=t(4492),o=t(3310),s=t(6038),l=t(9018),d=t(4728),c=t(7617),p=t(7492),x=t(2488),h=t(5612),u=t(1052),m=t.n(u),g=t(4414);const y=r.Ay.div`
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
`,v=r.Ay.div`
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
`,j=r.Ay.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`,f=(0,r.Ay)(d.SC)``,b=r.Ay.div``,C=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,k=r.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,F=(0,r.Ay)(d.Wh)``,S=r.Ay.div`
  font-weight: ${e=>e.highlight?"700":"500"};
  color: #374151;
`,B=r.Ay.button`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    padding: 6px 12px;\n    min-width: auto;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    padding: 6px 12px;\n    min-width: auto;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"email"===e.variant?"\n    background: #F3F4F6;\n    color: #6B7280;\n    border-color: #E5E7EB;\n\n    &:hover {\n      background: #E5E7EB;\n      color: #374151;\n    }\n  ":"cancel"===e.variant?"\n    background: #F6F9FC;\n    color: #6B7C93;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #E6EBF1;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    padding: 6px 12px;\n    min-width: auto;\n\n    &:hover {\n      border-color: #635BFF;\n      color: #635BFF;\n      background: #F4F3FF;\n    }\n  "}
`,A=r.Ay.button`
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
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
`,I=r.Ay.button`
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${e=>e.active?"#635BFF":"transparent"};
  color: ${e=>e.active?"#635BFF":"#6B7280"};
  font-weight: ${e=>e.active?"600":"500"};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #635BFF;
  }
`,D=r.Ay.div`
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
`,z=r.Ay.div`
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
`,T=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,P=r.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,$=r.Ay.button`
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
`,_=r.Ay.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
`,M=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,W=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,L=r.Ay.div`
  margin-bottom: 20px;
`,R=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,U=r.Ay.input`
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
`,O=r.Ay.textarea`
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
`,H=r.Ay.select`
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
`,Y=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,J=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,V=(0,r.Ay)(p.A0)`
  /* 1400px 이하: Period, Issued 숨김 - 7개 칼럼 */
  @media (max-width: 1400px) {
    grid-template-columns: 1.6fr 1.3fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(140px, 180px) !important;
    & > span.col-period,
    & > span.col-issued {
      display: none;
    }
  }

  /* 1100px 이하: Period, Issued, Amount, Total 숨김 - 5개 칼럼 */
  @media (max-width: 1100px) {
    grid-template-columns: 1.5fr 1.2fr 0.8fr 0.8fr minmax(130px, 160px) !important;
    & > span.col-period,
    & > span.col-issued,
    & > span.col-amount,
    & > span.col-total {
      display: none;
    }
  }

  /* 900px 이하: Period, Issued, Status, Amount, Total 숨김 - 4개 칼럼 */
  @media (max-width: 900px) {
    grid-template-columns: 1.4fr 1.2fr 0.8fr minmax(120px, 150px) !important;
    & > span.col-period,
    & > span.col-issued,
    & > span.col-status,
    & > span.col-amount,
    & > span.col-total {
      display: none;
    }
  }
`,q=(0,r.Ay)(p.Hj)`
  /* 1400px 이하: Period, Issued 숨김 - 7개 칼럼 */
  @media (max-width: 1400px) {
    grid-template-columns: 1.6fr 1.3fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(140px, 180px) !important;
    .col-period,
    .col-issued {
      display: none;
    }
  }

  /* 1100px 이하: Period, Issued, Amount, Total 숨김 - 5개 칼럼 */
  @media (max-width: 1100px) {
    grid-template-columns: 1.5fr 1.2fr 0.8fr 0.8fr minmax(130px, 160px) !important;
    .col-period,
    .col-issued,
    .col-amount,
    .col-total {
      display: none;
    }
  }

  /* 900px 이하: Period, Issued, Status, Amount, Total 숨김 - 4개 칼럼 */
  @media (max-width: 900px) {
    grid-template-columns: 1.4fr 1.2fr 0.8fr minmax(120px, 150px) !important;
    .col-period,
    .col-issued,
    .col-status,
    .col-amount,
    .col-total {
      display: none;
    }
  }
`,G=()=>{const{operationSettings:e}=(0,l.Pj)(),[n,t]=(0,a.ok)(),[r,d]=(0,i.useState)([]),[u,G]=(0,i.useState)(""),[Q,K]=(0,i.useState)("all"),[X,Z]=(0,i.useState)("all"),[ee,ne]=(0,i.useState)("all"),[te,ie]=(0,i.useState)(!1),[re,ae]=(0,i.useState)(!1),[oe,se]=(0,i.useState)(!1),[le,de]=(0,i.useState)(!1),[ce,pe]=(0,i.useState)(!1),[xe,he]=(0,i.useState)(!1),[ue,me]=(0,i.useState)(!1),[ge,ye]=(0,i.useState)(!1),[ve,je]=(0,i.useState)(!1),[fe,be]=(0,i.useState)(""),[Ce,we]=(0,i.useState)(null),[ke,Fe]=(0,i.useState)(!1),[Se,Be]=(0,i.useState)(""),Ae=n.get("tab")||"invoices",Ne=e=>{t({tab:e})},[Ee,Ie]=(0,i.useState)(!1),[De,ze]=(0,i.useState)(null),[Te,Pe]=(0,i.useState)({name:"",code:"",description:""}),[$e,_e]=(0,i.useState)(!1),[Me,We]=(0,i.useState)(!1),[Le,Re]=(0,i.useState)(null),[Ue,Oe]=(0,i.useState)(null),[He,Ye]=(0,i.useState)(null),[Je,Ve]=(0,i.useState)(""),[qe,Ge]=(0,i.useState)({managers:[],restaurants:[]}),[Qe,Ke]=(0,i.useState)(!1),[Xe,Ze]=(0,i.useState)(null),[en,nn]=(0,i.useState)([]),[tn,rn]=(0,i.useState)([]),[,an]=(0,i.useState)([]),[on,sn]=(0,i.useState)({managers:[],restaurants:[]}),[ln,dn]=(0,i.useState)(""),[cn,pn]=(0,i.useState)(!1),[xn,hn]=(0,i.useState)(null),[un,mn]=(0,i.useState)(null),[gn,yn]=(0,i.useState)({}),[vn,jn]=(0,i.useState)([]),[fn,bn]=(0,i.useState)([]),[Cn,wn]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:""}),kn=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void d([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),d(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),d([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),d([])}},Fn=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&bn(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Sn=e=>{e?(ze(e),Pe({name:e.name,code:e.code,description:e.description||""})):(ze(null),Pe({name:"",code:"",description:""})),Ie(!0)},Bn=()=>{Ie(!1),ze(null),Pe({name:"",code:"",description:""})};(0,i.useEffect)(()=>{kn(),Nn(),En(),In(),Tn(),An(),Fn()},[]);const An=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&yn(n.currencies)}const n=await fetch("/api/currencies/supported");if(n.ok){const e=await n.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);jn(n)}}}catch(e){console.error("Error fetching currency config:",e)}},Nn=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...t]}if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...n]}console.log("Fetched managers (General only):",i.length),nn(i)}catch(e){console.error("Error fetching managers:",e),nn([])}},En=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,manager_id:(null===(n=e.manager_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"USD"}});rn(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),rn([])}catch(e){console.error("Error fetching restaurants:",e),rn([])}},In=async()=>{try{const e=await fetch("/api/subscriptions");if(e.ok){const n=await e.json();an(n)}else console.warn("Subscription API not available"),an([])}catch(e){console.error("Error fetching subscriptions:",e),an([])}},Dn=(e,n)=>{if(Ze({type:e,data:n}),Ve("manager"===e?n.fullName:n.name),Ke(!1),"manager"===e){const e=n;Ye({...He,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=en.find(n=>n.id===e.manager_id);Ye({...He,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},zn=async(e,n)=>{hn({type:e,data:n}),pn(!1),dn("manager"===e?n.fullName:n.name);const t=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=n;try{const n=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var r;const n=await e.json(),t=n.data||n,a=null===(r=t.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=t.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",a,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var a;const n=await e.json(),t=n.data||n,r=null===(a=t.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=t.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",r,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}wn({...Cn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i})}else{const e=n,r=en.find(n=>n.id===e.manager_id);try{const n=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){i=(await n.json()).currency||"USD"}}catch(o){console.error("Error fetching restaurant currency:",o)}wn({...Cn,restaurantId:e.id,restaurantName:e.name,managerId:e.manager_id,managerName:r?r.fullName:"",companyName:e.name,currency:i})}},Tn=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();mn(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),mn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),mn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},Pn=e=>{if(!un)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${un.companyLogo?`<img src="${un.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${un.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${un.address?`${un.address}<br>`:""}\n                    ${[un.city,un.state,un.postalCode].filter(Boolean).join(", ")}${un.city||un.state||un.postalCode?"<br>":""}\n                    ${un.country?`${un.country}<br>`:""}\n                    ${un.phone?`Tel: ${un.phone}<br>`:""}\n                    ${un.email?`Email: ${un.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${Vn(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${Vn(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${Vn(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,s.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,s.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,s.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row tax">\n                    <span>Tax (6%):</span>\n                    <span>${(0,s.vv)(e.tax,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,s.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${un.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${un.bankName}<br>\n                <strong>Account Name:</strong> ${un.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${un.bankAccount||"-"}\n                ${un.swiftCode?`<br><strong>SWIFT Code:</strong> ${un.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${un.taxNumber||un.registrationNumber?`\n        <div class="registration-info">\n            ${un.registrationNumber?`Reg No: ${un.registrationNumber}`:""}\n            ${un.registrationNumber&&un.taxNumber?" | ":""}\n            ${un.taxNumber?`Tax No: ${un.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},$n=async e=>{if(!un)return Be("Company settings not loaded. Please try again."),void Fe(!0);try{var n;const t=Pn(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(t),r.close(),await new Promise(e=>setTimeout(e,150));const a=await m()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new h.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),Be("Failed to generate PDF. Please try again."),Fe(!0)}},_n=e=>{if(!un)return Be("Company settings not loaded. Please try again."),void Fe(!0);const n=Pn(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},Mn=async e=>{we(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=tn.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=en.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=en.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}be(n),je(!0)},Wn=()=>{wn({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:""}),hn(null),dn(""),pn(!1)},Ln=r.map(e=>{const n=new Date(e.issueDate);return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}),Rn=Array.from(new Set(Ln)).sort().reverse(),Un=r.filter(e=>{const n=e.companyName.toLowerCase().includes(u.toLowerCase())||e.invoiceNumber.toLowerCase().includes(u.toLowerCase())||e.managerName.toLowerCase().includes(u.toLowerCase()),t="all"===Q||e.status===Q||"pending_payment"===Q&&(""===e.status||!e.status),i="all"===X||e.type===X;let r=!0;if("all"!==ee){const n=new Date(e.issueDate);r=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`===ee}return n&&t&&i&&r}).sort((e,n)=>{const t=new Date(e.dueDate).getTime();return new Date(n.dueDate).getTime()-t}),On=r.length,Hn=r.filter(e=>"paid"===e.status).length,Yn=r.filter(e=>"overdue"===e.status).length,Jn=r.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),Vn=e=>new Date(e).toLocaleDateString("en-MY"),qn=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},Gn=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},Qn=e=>{var n,t;if(Oe(e),Ye({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=tn.find(n=>n.id===e.restaurantId);n&&(Ze({type:"restaurant",data:n}),Ve(n.name))}else if(e.managerId){const n=en.find(n=>n.id===e.managerId);n&&(Ze({type:"manager",data:n}),Ve(n.fullName))}se(!0)},Kn=e=>{Oe(e),ye(!0)};return(0,g.jsx)(o.A,{children:(0,g.jsxs)(p.mc,{children:[(0,g.jsxs)(p.Y9,{children:[(0,g.jsx)(p.hE,{children:"Invoices"}),(0,g.jsx)(p.ex,{})]}),(0,g.jsxs)(p.UC,{children:[(0,g.jsxs)(E,{children:[(0,g.jsx)(I,{active:"invoices"===Ae,onClick:()=>Ne("invoices"),children:"Invoices"}),(0,g.jsx)(I,{active:"categories"===Ae,onClick:()=>Ne("categories"),children:"Invoice Categories"})]}),"invoices"===Ae&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(p.MD,{children:[(0,g.jsxs)(p.hI,{color:"#059669",children:[(0,g.jsx)(p.Os,{children:On}),(0,g.jsx)(p.v0,{children:"Total Invoices"}),(0,g.jsx)(p.d1,{children:"All invoice records"})]}),(0,g.jsxs)(p.hI,{color:"#2563EB",children:[(0,g.jsx)(p.Os,{children:Hn}),(0,g.jsx)(p.v0,{children:"Paid Invoices"}),(0,g.jsxs)(p.d1,{children:[On>0?Math.round(Hn/On*100):0,"% completed"]})]}),(0,g.jsxs)(p.hI,{color:"#DC2626",children:[(0,g.jsx)(p.Os,{children:Yn}),(0,g.jsx)(p.v0,{children:"Overdue Invoices"}),(0,g.jsx)(p.d1,{children:"Requires attention"})]}),(0,g.jsxs)(p.hI,{color:"#7C3AED",children:[(0,g.jsx)(p.Os,{children:(0,s.vv)(Jn)}),(0,g.jsx)(p.v0,{children:"Total Revenue"}),(0,g.jsx)(p.d1,{children:"From paid invoices"})]})]}),(0,g.jsxs)(y,{children:[(0,g.jsxs)(v,{children:[(0,g.jsx)(x.DO,{placeholder:"Search by invoice #, company, restaurant...",value:u,onChange:e=>G(e.target.value)}),(0,g.jsxs)(x.Jt,{value:Q,onChange:e=>K(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"draft",children:"Draft"}),(0,g.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,g.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,g.jsx)("option",{value:"paid",children:"Paid"}),(0,g.jsx)("option",{value:"overdue",children:"Overdue"}),(0,g.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,g.jsxs)(x.Jt,{value:X,onChange:e=>Z(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Types"}),(0,g.jsx)("option",{value:"automatic",children:"Automatic"}),(0,g.jsx)("option",{value:"manual",children:"Manual"})]}),(0,g.jsxs)(x.Jt,{value:ee,onChange:e=>ne(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Months"}),Rn.map(e=>{const[n,t]=e.split("-"),i=["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(t)-1];return(0,g.jsxs)("option",{value:e,children:[i," ",n]},e)})]})]}),(0,g.jsx)(j,{children:(0,g.jsx)(f,{variant:"primary",onClick:()=>{Wn(),ie(!0)},children:"Create Invoice"})})]}),(0,g.jsxs)(p.XI,{children:[(0,g.jsxs)(V,{columns:"1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)",children:[(0,g.jsx)("span",{className:"col-invoice",children:"Invoice"}),(0,g.jsx)("span",{className:"col-customer",children:"Customer"}),(0,g.jsx)("span",{className:"col-period",children:"Period"}),(0,g.jsx)("span",{className:"col-issued",children:"Issued"}),(0,g.jsx)("span",{className:"col-due",children:"Due"}),(0,g.jsx)("span",{className:"col-status",children:"Status"}),(0,g.jsx)("span",{className:"col-amount",children:"Amount"}),(0,g.jsx)("span",{className:"col-total",children:"Total"}),(0,g.jsx)("span",{className:"col-actions",children:"Actions"})]}),Un.map(e=>(0,g.jsxs)(q,{columns:"1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)",children:[(0,g.jsxs)(p.Np,{children:[(0,g.jsxs)(p.Uj,{className:"col-invoice",children:[(0,g.jsx)(p.PM,{children:"Invoice"}),(0,g.jsxs)(b,{children:[(0,g.jsxs)(C,{children:[e.invoiceNumber,"automatic"===e.type&&(0,g.jsx)(k,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,g.jsx)(w,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,g.jsxs)(p.Uj,{className:"col-customer",children:[(0,g.jsx)(p.PM,{children:"Customer"}),(0,g.jsxs)(b,{children:[(0,g.jsx)(C,{children:e.customerName||e.restaurantName||"Unknown"}),(0,g.jsx)(w,{children:Gn(e.payerType||"restaurant")})]})]}),(0,g.jsxs)(p.Uj,{className:"col-period",children:[(0,g.jsx)(p.PM,{children:"Period"}),(0,g.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,g.jsxs)(p.Uj,{className:"col-issued",children:[(0,g.jsx)(p.PM,{children:"Issued"}),(0,g.jsx)("div",{style:{fontSize:"13px"},children:Vn(e.issueDate)})]}),(0,g.jsxs)(p.Uj,{className:"col-due",children:[(0,g.jsx)(p.PM,{children:"Due"}),(0,g.jsx)("div",{style:{fontSize:"13px"},children:Vn(e.dueDate)})]}),(0,g.jsxs)(p.Uj,{className:"col-status",children:[(0,g.jsx)(p.PM,{children:"Status"}),(0,g.jsx)("div",{children:(0,g.jsx)(F,{status:e.status,children:qn(e.status)})})]}),(0,g.jsxs)(p.Uj,{className:"col-amount",children:[(0,g.jsx)(p.PM,{children:"Amount"}),(0,g.jsx)(S,{children:(0,s.vv)(e.amount,e.currency||"USD")})]}),(0,g.jsxs)(p.Uj,{className:"col-total",children:[(0,g.jsx)(p.PM,{children:"Total"}),(0,g.jsx)(S,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"USD")})]})]}),(0,g.jsxs)(p.wr,{className:"col-actions",children:[(0,g.jsx)(B,{variant:"primary",onClick:()=>(e=>{Oe(e),ae(!0)})(e),children:"View"}),"draft"===e.status&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(B,{onClick:()=>Qn(e),children:"Edit"}),(0,g.jsx)(B,{variant:"email",onClick:()=>(e=>{Oe(e),pe(!0)})(e),title:"Send Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,g.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,g.jsx)(A,{onClick:()=>Kn(e),title:"Delete Invoice",children:(0,g.jsx)(N,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(B,{onClick:()=>Qn(e),children:"Edit"}),(0,g.jsx)(B,{onClick:()=>$n(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(B,{onClick:()=>_n(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,g.jsx)(B,{variant:"email",onClick:()=>Mn(e),title:"Send Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,g.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,g.jsx)(A,{onClick:()=>Kn(e),title:"Delete Invoice",children:(0,g.jsx)(N,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,g.jsxs)(g.Fragment,{children:[e.hasPaymentInfo&&(0,g.jsx)(B,{variant:"primary",onClick:()=>(e=>{Oe(e),de(!0)})(e),children:"Confirm"}),(0,g.jsx)(B,{onClick:()=>Qn(e),children:"Edit"}),(0,g.jsx)(B,{onClick:()=>$n(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(B,{onClick:()=>_n(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,g.jsx)(B,{variant:"email",onClick:()=>Mn(e),title:"Resend Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,g.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(B,{onClick:()=>Qn(e),children:"Edit"}),(0,g.jsx)(B,{onClick:()=>$n(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(B,{onClick:()=>_n(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,g.jsx)(B,{variant:"email",onClick:()=>Mn(e),title:"Resend Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,g.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,g.jsx)(A,{onClick:()=>Kn(e),title:"Delete Invoice",children:(0,g.jsx)(N,{children:"\xd7"})})]}),"paid"===e.status&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(B,{onClick:()=>$n(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(B,{onClick:()=>_n(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,g.jsx)(B,{onClick:()=>$n(e),title:"Download Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})]},e.id)),0===Un.length&&(0,g.jsxs)(p.pp,{children:[(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,g.jsx)("div",{style:{fontSize:"14px"},children:0===r.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"categories"===Ae&&(0,g.jsxs)("div",{style:{padding:"24px 0"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,g.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#1F2937"},children:"Invoice Categories"}),(0,g.jsx)(f,{variant:"primary",onClick:()=>Sn(),children:"Add Category"})]}),0===fn.length?(0,g.jsxs)("div",{style:{textAlign:"center",padding:"40px 20px",background:"white",borderRadius:"12px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"},children:[(0,g.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,g.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,g.jsx)(f,{variant:"primary",onClick:()=>Sn(),children:"Add Category"})]}):(0,g.jsx)("div",{style:{display:"grid",gap:"12px"},children:fn.map(e=>(0,g.jsxs)("div",{style:{background:"white",borderRadius:"12px",padding:"16px 20px",display:"flex",alignItems:"center",gap:"16px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",opacity:e.is_active?1:.6},children:[(0,g.jsx)("div",{style:{width:"48px",height:"48px",borderRadius:"8px",background:"#F3F4F6",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",fontWeight:"600",color:"#635BFF",flexShrink:0},children:e.name.charAt(0).toUpperCase()}),(0,g.jsxs)("div",{style:{flex:1},children:[(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"},children:[(0,g.jsx)("span",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937"},children:e.name}),(0,g.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"500",background:e.is_active?"#D1FAE5":"#FEE2E2",color:e.is_active?"#059669":"#DC2626"},children:e.is_active?"Active":"Inactive"})]}),(0,g.jsxs)("div",{style:{display:"flex",gap:"16px",fontSize:"13px",color:"#6B7280"},children:[(0,g.jsxs)("span",{children:["Code: ",(0,g.jsx)("strong",{children:e.code})]}),e.description&&(0,g.jsx)("span",{children:e.description})]})]}),(0,g.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,g.jsx)("button",{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({is_active:!e.is_active})});(await t.json()).success&&Fn()}catch(n){console.error("Failed to toggle category:",n)}})(e),style:{width:"36px",height:"36px",borderRadius:"6px",border:"1px solid #E6EBF1",background:"#F6F9FC",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},title:e.is_active?"Deactivate":"Activate",children:e.is_active?"\ud83d\udc41\ufe0f":"\ud83d\udc41\ufe0f\u200d\ud83d\udde8\ufe0f"}),(0,g.jsx)("button",{onClick:()=>Sn(e),style:{width:"36px",height:"36px",borderRadius:"6px",border:"1px solid #E6EBF1",background:"#F6F9FC",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},title:"Edit",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#6B7280",strokeWidth:"2",children:[(0,g.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,g.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,g.jsx)("button",{onClick:()=>(e=>{Re(e),We(!0)})(e),style:{width:"36px",height:"36px",borderRadius:"6px",border:"1px solid #FEE2E2",background:"#FEF2F2",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},title:"Delete",children:(0,g.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#DC2626",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})})})]})]},e.id))})]}),Ee&&(0,g.jsx)(D,{onClick:Bn,children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(P,{children:De?"Edit Category":"Add Category"}),(0,g.jsx)($,{onClick:Bn,children:"\xd7"})]}),(0,g.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Te.name.trim()&&Te.code.trim())try{_e(!0);const e=localStorage.getItem("auth_token"),n=De?`/api/invoices/categories/${De.id}`:"/api/invoices/categories",t=De?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:Te.name.trim(),code:Te.code.trim().toLowerCase().replace(/\s+/g,"_"),description:Te.description.trim()||null})}),r=await i.json();r.success?(Bn(),Fn()):alert(r.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{_e(!1)}},children:[(0,g.jsxs)(_,{children:[(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Name *"}),(0,g.jsx)(U,{value:Te.name,onChange:e=>Pe({...Te,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Code *"}),(0,g.jsx)(U,{value:Te.code,onChange:e=>Pe({...Te,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===De||void 0===De?void 0:De.is_system}),(0,g.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Description"}),(0,g.jsx)(O,{value:Te.description,onChange:e=>Pe({...Te,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,g.jsxs)(M,{children:[(0,g.jsx)(f,{variant:"secondary",type:"button",onClick:Bn,children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",type:"submit",disabled:$e||!Te.name||!Te.code,children:$e?"Saving...":De?"Update":"Create"})]})]})]})}),(0,g.jsx)(c.A,{isOpen:Me,onCancel:()=>We(!1),onConfirm:async()=>{if(Le)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${Le.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(We(!1),Re(null),Fn()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===Le||void 0===Le?void 0:Le.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),te&&(0,g.jsx)(D,{onClick:e=>{e.target===e.currentTarget&&(ie(!1),Wn())},children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(P,{children:"Create Invoice"}),(0,g.jsx)($,{onClick:()=>{ie(!1),Wn()},children:"\xd7"})]}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Search Manager or Restaurant *"}),(0,g.jsxs)("div",{style:{position:"relative"},children:[(0,g.jsx)(U,{type:"text",value:ln,onChange:e=>(e=>{if(dn(e),pn(!0),e.length<2)return void sn({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",en),console.log("Available restaurants:",tn);const n=en.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=tn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),sn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>pn(!0),onBlur:()=>setTimeout(()=>pn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),cn&&(on.managers.length>0||on.restaurants.length>0)&&(0,g.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[on.managers.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),on.managers.map(e=>(0,g.jsxs)("div",{onClick:()=>zn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),on.restaurants.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),on.restaurants.map(e=>{const n=en.find(n=>n.id===e.manager_id);return(0,g.jsxs)("div",{onClick:()=>zn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),xn&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===xn.type?xn.data.fullName:xn.data.name}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===xn.type?`${xn.data.companyName} \u2022 Manager`:`${xn.data.address||"No address"} \u2022 Restaurant`})]}),(0,g.jsx)("button",{onClick:()=>{hn(null),dn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsxs)(L,{children:[(0,g.jsxs)(R,{children:["Amount",Cn.currency?` (${Cn.currency})`:""," *"]}),(0,g.jsx)(U,{type:"number",step:Cn.currency&&0===(0,s.e_)(Cn.currency)?"1":"0.01",min:"0",value:Cn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,i=n+t;wn({...Cn,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})},onBlur:e=>{if(e.target.value&&Cn.currency){const n=(0,s.e_)(Cn.currency),t=parseFloat(e.target.value)||0,i=t.toFixed(n),r=.06*t,a=t+r;wn({...Cn,amount:i,tax:r.toFixed(n),total:a.toFixed(n)})}},placeholder:Cn.currency&&0===(0,s.e_)(Cn.currency)?"0":"0.00",required:!0,disabled:!xn}),!xn&&(0,g.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Due Date *"}),(0,g.jsx)(U,{type:"date",value:Cn.dueDate,onChange:e=>wn({...Cn,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Invoice Category"}),(0,g.jsx)(H,{value:Cn.invoiceCategory||"service",onChange:e=>wn({...Cn,invoiceCategory:e.target.value}),children:fn.length>0?fn.filter(e=>"subscription"!==e.code).map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.id)):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"service",children:"Service"}),(0,g.jsx)("option",{value:"consulting",children:"Consulting"}),(0,g.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===Cn.invoiceCategory?(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Plan/Item"}),(0,g.jsx)(O,{value:Cn.customDescription||"",onChange:e=>wn({...Cn,customDescription:e.target.value}),placeholder:"Enter custom item description",rows:2})]}):"subscription"!==(Cn.invoiceCategory||"service")&&(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Plan/Item"}),(0,g.jsx)(O,{value:Cn.serviceDescription||"",onChange:e=>wn({...Cn,serviceDescription:e.target.value}),placeholder:"Enter item description",rows:2})]}),(0,g.jsxs)(Y,{children:[(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:Cn.currency?(0,s.vv)(parseFloat(Cn.amount||"0"),Cn.currency):"-"})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Tax (6%):"}),(0,g.jsx)("span",{children:Cn.currency?(0,s.vv)(parseFloat(Cn.tax||"0"),Cn.currency):"-"})]}),(0,g.jsxs)(J,{highlight:!0,children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:Cn.currency?(0,s.vv)(parseFloat(Cn.total||"0"),Cn.currency):"-"})})]})]})]}),(0,g.jsxs)(M,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>{ie(!1),Wn()},children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(xn&&Cn.amount&&Cn.dueDate)try{const e=parseFloat(Cn.amount),n=parseFloat(Cn.tax),t=parseFloat(Cn.total),i=new Date;i.setDate(1);const r=new Date;r.setMonth(r.getMonth()+1),r.setDate(0);let a="";a="others"===Cn.invoiceCategory?Cn.customDescription||"":Cn.serviceDescription||"";let o="",s="",l="",d="";if("restaurant"===xn.type){const e=xn.data;o=e.name,d=e.name,l=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),s=n.join("\n")}else if("manager"===xn.type){const e=xn.data;o=e.fullName,l=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),s=n.join("\n")}let c="restaurant";if("manager"===xn.type){const e=xn.data;"Brand General"===e.role||"Brand Manager"===e.role?c="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(c="foodcourt_manager")}const p={restaurant_id:"restaurant"===xn.type?xn.data.id:null,payer_type:c,payer_id:"manager"===xn.type?xn.data.id:null,type:"manual",billing_period_start:i.toISOString(),billing_period_end:r.toISOString(),due_date:new Date(Cn.dueDate).toISOString(),total_amount:t,currency:Cn.currency||"USD",status:"pending_payment",notes:`${l}\n${o}\n${s}\n\n${a}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:Cn.invoiceCategory||"service"},x=[{item_type:Cn.invoiceCategory,description:a,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:6,tax_amount:n,total_amount:t}],h=localStorage.getItem("auth_token"),u=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({invoice_data:p,items:x})});if(u.ok)await kn(),ie(!1),Wn();else{const e=await u.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!xn||!Cn.amount||!Cn.dueDate,children:"Create Invoice"})]})]})}),re&&Ue&&(0,g.jsx)(D,{onClick:()=>ae(!1),children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(P,{children:"Invoice Details"}),(0,g.jsx)($,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,g.jsxs)(_,{children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,g.jsxs)("div",{children:[null!==un&&void 0!==un&&un.companyLogo?(0,g.jsx)("img",{src:un.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}):(0,g.jsx)("div",{style:{fontSize:"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===un||void 0===un?void 0:un.companyName)||"Company Name"}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===un||void 0===un?void 0:un.address)&&(0,g.jsx)("div",{children:un.address}),((null===un||void 0===un?void 0:un.city)||(null===un||void 0===un?void 0:un.state)||(null===un||void 0===un?void 0:un.postalCode))&&(0,g.jsx)("div",{children:[null===un||void 0===un?void 0:un.city,null===un||void 0===un?void 0:un.state,null===un||void 0===un?void 0:un.postalCode].filter(Boolean).join(", ")}),(null===un||void 0===un?void 0:un.country)&&(0,g.jsx)("div",{children:un.country}),(null===un||void 0===un?void 0:un.phone)&&(0,g.jsxs)("div",{children:["Tel: ",un.phone]}),(null===un||void 0===un?void 0:un.email)&&(0,g.jsxs)("div",{children:["Email: ",un.email]})]})]}),(0,g.jsxs)("div",{style:{textAlign:"right"},children:[(0,g.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Ue.invoiceNumber}),(0,g.jsx)(F,{status:Ue.status,style:{marginTop:"8px"},children:qn(Ue.status)})]})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,g.jsxs)("div",{style:{flex:1},children:[(0,g.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,g.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:Ue.customerName}),Ue.customerAddress&&(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:Ue.customerAddress}),"restaurant"===Ue.payerType&&Ue.restaurantName&&"Unknown Restaurant"!==Ue.restaurantName&&(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",Ue.restaurantName]}),Ue.companyName&&Ue.companyName!==Ue.customerName&&(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",Ue.companyName]})]}),(0,g.jsxs)("div",{style:{textAlign:"right"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ue.billingPeriod||"-"})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Vn(Ue.issueDate)})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Vn(Ue.dueDate)})]}),Ue.paidDate&&(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Vn(Ue.paidDate)})]})]})]}),(0,g.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,g.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,g.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,g.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,g.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,g.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,g.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,g.jsx)("tbody",{children:Ue.items.map((e,n)=>(0,g.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.unitPrice,Ue.currency||"MYR")}),(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.total,Ue.currency||"MYR")})]},n))})]})]}),(0,g.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,g.jsx)("div",{style:{width:"280px"},children:(0,g.jsxs)(Y,{children:[(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:(0,s.vv)(Ue.amount,Ue.currency||"MYR")})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Tax (6%):"}),(0,g.jsx)("span",{children:(0,s.vv)(Ue.tax,Ue.currency||"MYR")})]}),(0,g.jsxs)(J,{highlight:!0,children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:(0,s.vv)(Ue.total,Ue.currency||"MYR")})})]})]})})}),(null===un||void 0===un?void 0:un.bankName)&&(0,g.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:"Bank:"})," ",un.bankName]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:"Account Name:"})," ",un.bankAccountName]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:"Account Number:"})," ",un.bankAccount]})]})]}),((null===un||void 0===un?void 0:un.taxNumber)||(null===un||void 0===un?void 0:un.registrationNumber))&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===un||void 0===un?void 0:un.registrationNumber)&&(0,g.jsxs)("span",{children:["Reg No: ",un.registrationNumber]}),(null===un||void 0===un?void 0:un.registrationNumber)&&(null===un||void 0===un?void 0:un.taxNumber)&&(0,g.jsx)("span",{children:" | "}),(null===un||void 0===un?void 0:un.taxNumber)&&(0,g.jsxs)("span",{children:["Tax No: ",un.taxNumber]})]})]})]})}),le&&Ue&&(0,g.jsx)(D,{onClick:()=>de(!1),children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,g.jsxs)(T,{children:[(0,g.jsxs)(P,{children:["Confirm Payment - ",Ue.invoiceNumber]}),(0,g.jsx)($,{onClick:()=>de(!1),children:"\xd7"})]}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Invoice Summary"}),(0,g.jsxs)(Y,{children:[(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Customer:"}),(0,g.jsx)("span",{children:Ue.customerName||Ue.managerName})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Company:"}),(0,g.jsx)("span",{children:Ue.companyName})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Invoice Number:"}),(0,g.jsx)("span",{children:Ue.invoiceNumber})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Due Date:"}),(0,g.jsx)("span",{children:Vn(Ue.dueDate)})]}),(0,g.jsxs)(J,{highlight:!0,children:[(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:"Payment Amount:"})}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:(0,s.vv)(Ue.total,Ue.currency||"USD")})})]})]})]}),Ue.hasPaymentInfo&&(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Customer's Payment Information"}),(0,g.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,g.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,g.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,g.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===Ue.paymentMethod?"Bank Transfer":"qr_payment"===Ue.paymentMethod?"QR Payment":"stripe"===Ue.paymentMethod?"Stripe":"paypal"===Ue.paymentMethod?"PayPal":Ue.paymentMethod||"Not specified"]}),Ue.transactionId&&(0,g.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,g.jsx)("strong",{children:"Transaction ID:"})," ",Ue.transactionId]})]}),Ue.receiptUrl&&(0,g.jsxs)("div",{style:{marginTop:"12px"},children:[(0,g.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,g.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,g.jsx)("img",{src:Ue.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(Ue.receiptUrl,"_blank")}),(0,g.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,g.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,g.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,g.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,g.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Status Change"}),(0,g.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,g.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,g.jsxs)(M,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(Ue)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ue.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await kn(),de(!1),Oe(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),oe&&Ue&&He&&(0,g.jsx)(D,{onClick:()=>se(!1),children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsxs)(P,{children:["Edit Invoice - ",Ue.invoiceNumber]}),(0,g.jsx)($,{onClick:()=>se(!1),children:"\xd7"})]}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Search Manager or Restaurant *"}),(0,g.jsxs)("div",{style:{position:"relative"},children:[(0,g.jsx)(U,{type:"text",value:Je,onChange:e=>(e=>{if(Ve(e),Ke(!0),e.length<2)return void Ge({managers:[],restaurants:[]});const n=en.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=tn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));Ge({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>Ke(!0),onBlur:()=>setTimeout(()=>Ke(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),Qe&&(qe.managers.length>0||qe.restaurants.length>0)&&(0,g.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[qe.managers.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),qe.managers.map(e=>(0,g.jsxs)("div",{onClick:()=>Dn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),qe.restaurants.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),qe.restaurants.map(e=>{const n=en.find(n=>n.id===e.manager_id);return(0,g.jsxs)("div",{onClick:()=>Dn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),Xe&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Xe.type?Xe.data.fullName:Xe.data.name}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Xe.type?`${Xe.data.companyName} \u2022 Manager`:`${Xe.data.address||"No address"} \u2022 Restaurant`})]}),(0,g.jsx)("button",{onClick:()=>{Ze(null),Ve("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsxs)(L,{children:[(0,g.jsxs)(R,{children:["Amount (",e.currency||"RM",")"]}),(0,g.jsx)(U,{type:"number",value:He.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,i=n+t;Ye({...He,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Due Date"}),(0,g.jsx)(U,{type:"date",value:He.dueDate,onChange:e=>Ye({...He,dueDate:e.target.value})})]})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Status"}),(0,g.jsxs)(H,{value:He.status,onChange:e=>Ye({...He,status:e.target.value}),children:[(0,g.jsx)("option",{value:"draft",children:"Draft"}),(0,g.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,g.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,g.jsx)("option",{value:"paid",children:"Paid"}),(0,g.jsx)("option",{value:"overdue",children:"Overdue"}),(0,g.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Invoice Category"}),(0,g.jsx)(H,{value:He.invoiceCategory||"service",onChange:e=>Ye({...He,invoiceCategory:e.target.value}),children:fn.length>0?fn.filter(e=>"subscription"!==e.code).map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.id)):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"service",children:"Service"}),(0,g.jsx)("option",{value:"consulting",children:"Consulting"}),(0,g.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===He.invoiceCategory?(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Plan/Item"}),(0,g.jsx)(O,{value:He.customDescription||"",onChange:e=>Ye({...He,customDescription:e.target.value}),placeholder:"Enter custom item description",rows:2})]}):"subscription"!==(He.invoiceCategory||"service")&&(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Plan/Item"}),(0,g.jsx)(O,{value:He.serviceDescription||"",onChange:e=>Ye({...He,serviceDescription:e.target.value}),placeholder:"Enter item description",rows:2})]}),(0,g.jsxs)(Y,{children:[(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:(0,s.vv)(parseFloat(He.amount||"0"),He.currency||"USD")})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Tax (6%):"}),(0,g.jsx)("span",{children:(0,s.vv)(parseFloat(He.tax||"0"),He.currency||"USD")})]}),(0,g.jsxs)(J,{highlight:!0,children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:(0,s.vv)(parseFloat(He.total||"0"),He.currency||"USD")})})]})]})]}),(0,g.jsxs)(M,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(Ue&&He)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ue.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(He.amount),tax:parseFloat(He.tax),total:parseFloat(He.total),dueDate:He.dueDate,status:He.status,payerType:He.payerType,payerId:He.payerId,items:He.items})});if(n.ok){const e={...Ue,amount:parseFloat(He.amount),tax:parseFloat(He.tax),total:parseFloat(He.total),dueDate:He.dueDate,status:He.status,payerType:He.payerType,payerId:He.payerId,items:He.items};d(r.map(n=>n.id===Ue.id?e:n)),se(!1),Oe(null),Ye(null),Be("Invoice updated successfully!"),Fe(!0)}else{const e=await n.json();Be(`Failed to update invoice: ${e.error||"Unknown error"}`),Fe(!0)}}catch(e){console.error("Error updating invoice:",e),Be("Error updating invoice. Please try again."),Fe(!0)}},children:"Save Changes"})]})]})}),ce&&Ue&&(0,g.jsx)(D,{onClick:()=>pe(!1),children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(P,{children:"Send Invoice"}),(0,g.jsx)($,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,g.jsx)(_,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice to Manager"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,g.jsx)("strong",{children:Ue.invoiceNumber})," to ",(0,g.jsx)("strong",{children:Ue.managerName}),"?"]}),(0,g.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:Ue.invoiceNumber})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:Ue.managerName})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:Ue.companyName})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,g.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,s.vv)(Ue.total,Ue.currency||"USD")})]})]})]})}),(0,g.jsxs)(M,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(Ue)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ue.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await kn(),pe(!1),Oe(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Send Invoice"})]})]})}),xe&&Ue&&(0,g.jsx)(D,{onClick:()=>he(!1),children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(P,{children:"Resend Invoice"}),(0,g.jsx)($,{onClick:()=>he(!1),children:"\xd7"})]}),(0,g.jsx)(_,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,g.jsx)("strong",{children:Ue.invoiceNumber})," to ",(0,g.jsx)("strong",{children:Ue.managerName}),"?"]}),(0,g.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,g.jsxs)(M,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>he(!1),children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:()=>{Ue&&(he(!1),Oe(null))},children:"Resend Invoice"})]})]})}),ue&&Ue&&(0,g.jsx)(D,{onClick:()=>me(!1),children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(P,{children:"Cancel Invoice"}),(0,g.jsx)($,{onClick:()=>me(!1),children:"\xd7"})]}),(0,g.jsx)(_,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,g.jsx)("strong",{children:Ue.invoiceNumber}),"?"]}),(0,g.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,g.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,g.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,g.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,g.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:Ue.invoiceNumber})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:Ue.managerName})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,g.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,s.vv)(Ue.total,Ue.currency||"USD")})]})]})]})}),(0,g.jsxs)(M,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>me(!1),children:"Keep Invoice"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(Ue)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ue.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await kn(),me(!1),Oe(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),ge&&Ue&&(0,g.jsx)(D,{onClick:()=>ye(!1),children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(P,{children:"Delete Invoice"}),(0,g.jsx)($,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,g.jsx)(_,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,g.jsxs)("strong",{children:["#",Ue.invoiceNumber]}),"?",(0,g.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,g.jsxs)(M,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>ye(!1),children:"Keep Invoice"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(Ue)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ue.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await kn(),ye(!1),Oe(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),ve&&Ce&&(0,g.jsx)(D,{onClick:()=>je(!1),children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(P,{children:"Send Invoice via Email"}),(0,g.jsx)($,{onClick:()=>je(!1),children:"\xd7"})]}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Invoice"}),(0,g.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Ce.invoiceNumber}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:Ce.customerName}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,s.vv)(Ce.total,Ce.currency||"MYR")})]})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:"Recipient Email *"}),(0,g.jsx)(U,{type:"email",value:fe,onChange:e=>be(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:fe?(0,g.jsxs)(g.Fragment,{children:["Default email for ","restaurant"===Ce.payerType?"Restaurant":"foodcourt_manager"===Ce.payerType?"Foodcourt Manager":"brand_manager"===Ce.payerType?"Brand Manager":"Customer"]}):(0,g.jsxs)(g.Fragment,{children:["Enter the ","restaurant"===Ce.payerType?"restaurant":"foodcourt_manager"===Ce.payerType?"foodcourt manager":"brand_manager"===Ce.payerType?"brand manager":"customer"," email address"]})})]}),(0,g.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,g.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,g.jsxs)(M,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>{je(!1),we(null),be("")},children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(!Ce||!fe)return Be("Please enter a valid email address."),void Fe(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ce.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:fe})});if(n.ok)Be(`Invoice sent successfully to ${fe}`),je(!1),we(null),be("");else{const e=await n.json();Be(e.error||"Failed to send invoice email.")}Fe(!0)}catch(e){console.error("Error sending invoice email:",e),Be("Failed to send invoice email. Please try again."),Fe(!0)}},disabled:!fe||!fe.includes("@"),children:"Send Email"})]})]})}),ke&&(0,g.jsx)(D,{onClick:()=>Fe(!1),children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(P,{children:"Success"}),(0,g.jsx)($,{onClick:()=>Fe(!1),children:"\xd7"})]}),(0,g.jsx)(_,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,g.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Se})})}),(0,g.jsx)(M,{children:(0,g.jsx)(f,{variant:"primary",onClick:()=>Fe(!1),children:"OK"})})]})})]})]})})}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var i=t(4752),r=t(9610),a=t(4414);const o=i.Ay.div`
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