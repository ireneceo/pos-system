"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2476],{2476:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Q});var i=t(9950),r=t(4752),a=t(4492),o=t(2597),s=t(2653),l=t(6038),d=t(9018),c=t(1367),p=t(4728),x=t(7617),h=t(8409),u=t(2488),m=t(5612),g=t(1052),y=t.n(g),j=t(4757),v=t(4414);const f=r.Ay.div`
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
`,C=(r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`,r.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#059669":"#FFFFFF"};
  color: ${e=>e.active?"#FFFFFF":"#6B7C93"};
  border: 1px solid ${e=>e.active?"#059669":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#047857":"#F8FAFC"};
    border-color: ${e=>e.active?"#047857":"#CBD5E1"};
  }
`,r.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #059669;
  }
`,(0,r.Ay)(p.SC)``),k=r.Ay.div``,F=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,S=r.Ay.div`
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
`,N=(0,r.Ay)(p.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,B=r.Ay.div`
  font-weight: ${e=>e.highlight?"700":"500"};
  color: #374151;
`,I=r.Ay.button`
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
`,E=r.Ay.button`
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
`,D=r.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,P=r.Ay.div`
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
`,T=r.Ay.div`
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
`,z=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,M=r.Ay.h3`
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
`,R=r.Ay.div`
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
`,U=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,O=r.Ay.input`
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
`,H=r.Ay.textarea`
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
`,Y=r.Ay.select`
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
`,V=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,q=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,J=(0,r.Ay)(h.A0)`
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
`,G=(0,r.Ay)(h.Hj)`
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
`,Q=()=>{const{operationSettings:e}=(0,d.Pj)(),{user:n}=(0,c.As)(),[t,r]=(0,a.ok)(),[g,Q]=(0,i.useState)([]),[K,Z]=(0,i.useState)(""),[X,ee]=(0,i.useState)("all"),[ne,te]=(0,i.useState)("all"),[ie,re]=(0,i.useState)("all"),[ae,oe]=(0,i.useState)(!1),[se,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(!1),[he,ue]=(0,i.useState)(!1),[me,ge]=(0,i.useState)(!1),[ye,je]=(0,i.useState)(!1),[ve,fe]=(0,i.useState)(!1),[be,we]=(0,i.useState)(!1),[Ce,ke]=(0,i.useState)(""),[Fe,Se]=(0,i.useState)(null),[Ae,Ne]=(0,i.useState)(!1),[Be,Ie]=(0,i.useState)(""),[Ee,De]=(0,s.M)("to_pay"),[Pe,Te]=(0,i.useState)([]),[ze,Me]=(0,i.useState)([]),[$e,_e]=(0,i.useState)(""),[Re,We]=(0,i.useState)("all"),[Le,Ue]=(0,i.useState)(!1),[Oe,He]=(0,i.useState)({start:"",end:""}),[Ye,Ve]=(0,i.useState)(!1),[qe,Je]=(0,i.useState)({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),[Ge,Qe]=(0,i.useState)(null),[Ke,Ze]=(0,i.useState)(!1),[Xe,en]=(0,i.useState)([]),[nn,tn]=(0,i.useState)(!1),[rn,an]=(0,i.useState)(!1),[on,sn]=(0,i.useState)(null),[ln,dn]=(0,i.useState)({name:"",code:"",description:""}),[cn,pn]=(0,i.useState)(!1),[xn,hn]=(0,i.useState)(!1),[un,mn]=(0,i.useState)(null),[gn,yn]=(0,i.useState)(null),[jn,vn]=(0,i.useState)(null),[fn,bn]=(0,i.useState)(""),[wn,Cn]=(0,i.useState)({managers:[],restaurants:[]}),[kn,Fn]=(0,i.useState)(!1),[Sn,An]=(0,i.useState)(null),[Nn,Bn]=(0,i.useState)([]),[In,En]=(0,i.useState)([]),[,Dn]=(0,i.useState)([]),[Pn,Tn]=(0,i.useState)({managers:[],restaurants:[]}),[zn,Mn]=(0,i.useState)(""),[$n,_n]=(0,i.useState)(!1),[Rn,Wn]=(0,i.useState)(null),[Ln,Un]=(0,i.useState)(null),[On,Hn]=(0,i.useState)({}),[Yn,Vn]=(0,i.useState)([]),[qn,Jn]=(0,i.useState)({}),[Gn,Qn]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",discountType:"none",discountValue:"",discountReason:""}),Kn=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void Q([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),Q(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),Q([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),Q([])}},Zn=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void Te([]);const n=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();Te(e)}else console.error("Failed to fetch invoices to pay"),Te([])}catch(e){console.error("Error fetching invoices to pay:",e),Te([])}},Xn=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void Me([]);const n=await fetch("/api/invoices/to-pay?status=paid",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();Me(e)}else Me([])}catch(e){console.error("Error fetching paid invoices:",e),Me([])}},et=async e=>{yn(e),Je({paymentMethod:"",transactionId:"",notes:"",receiptImage:""}),Qe(null),await(async(e,n,t)=>{tn(!0);try{let i=`/api/admin/payment-settings/available/${e}`;"brand"===n&&t?i=`/api/brands/${t}/payment-settings/available/${e}`:"foodcourt"===n&&t&&(i=`/api/foodcourts/${t}/payment-settings/available/${e}`);const r=localStorage.getItem("auth_token"),a=await fetch(i,{headers:{Authorization:`Bearer ${r}`}});if(a.ok){const e=await a.json();en(e.methods||[]),e.methods&&e.methods.length>0&&Je(n=>({...n,paymentMethod:e.methods[0].id}))}else en([])}catch(i){console.error("Error fetching payment methods:",i),en([])}finally{tn(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),Ve(!0)},nt=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&Vn(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),tt=()=>{an(!1),sn(null),dn({name:"",code:"",description:""})},it=(0,i.useCallback)(async()=>{if(null!==n&&void 0!==n&&n.foodcourt_id)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/foodcourts/${n.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){var e;const n=await i.json(),t=n.data||n;if(null!==(e=t.payment_settings)&&void 0!==e&&e.additionalCharges){const e=t.payment_settings.additionalCharges;Array.isArray(e)?Jn({}):Jn(e)}}}catch(t){console.error("Error fetching foodcourt payment settings:",t)}},[null===n||void 0===n?void 0:n.foodcourt_id]),rt=e=>{const n=(0,l.Wh)(e);return qn[n]||qn[e]||[]},at=rt(e.currency||"MYR");(0,i.useEffect)(()=>{Kn(),Zn(),Xn(),st(),lt(),dt(),xt(),ot(),nt(),it()},[]);const ot=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&Hn(n.currencies)}}catch(e){console.error("Error fetching currency config:",e)}},st=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t,i]=await Promise.all([fetch("/api/users?role=Manager",{headers:e}),fetch("/api/users?role=Foodcourt_Manager",{headers:e}),fetch("/api/users?role=Brand_Manager",{headers:e})]);let r=[];if(n.ok){const e=(await n.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Restaurant Manager"}));r=[...r,...e]}if(t.ok){const e=(await t.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt Manager"}));r=[...r,...e]}if(i.ok){const e=(await i.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand Manager"}));r=[...r,...e]}Bn(r)}catch(e){console.error("Error fetching managers:",e),Bn([])}},lt=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||""}});En(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),En([])}catch(e){console.error("Error fetching restaurants:",e),En([])}},dt=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/subscriptions",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();Dn(e)}else console.warn("Subscription API not available"),Dn([])}catch(e){console.error("Error fetching subscriptions:",e),Dn([])}},ct=(e,n)=>{if(An({type:e,data:n}),bn("manager"===e?n.fullName:n.name),Fn(!1),"manager"===e){const e=n;vn({...jn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=Nn.find(n=>n.id===e.admin_id);vn({...jn,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},pt=(e,n)=>{if(Wn({type:e,data:n}),_n(!1),Mn("manager"===e?n.fullName:n.name),"manager"===e){const e=n;Qn({...Gn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=Nn.find(n=>n.id===e.admin_id);Qn({...Gn,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:t?t.fullName:"",companyName:e.name})}},xt=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();Un(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),Un({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),Un({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},ht=e=>{if(!Ln)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${Ln.companyLogo?`<img src="${Ln.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${Ln.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${Ln.address?`${Ln.address}<br>`:""}\n                    ${[Ln.city,Ln.state,Ln.postalCode].filter(Boolean).join(", ")}${Ln.city||Ln.state||Ln.postalCode?"<br>":""}\n                    ${Ln.country?`${Ln.country}<br>`:""}\n                    ${Ln.phone?`Tel: ${Ln.phone}<br>`:""}\n                    ${Ln.email?`Email: ${Ln.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${Ft(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${Ft(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${Ft(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,l.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,l.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,l.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row tax">\n                    <span>Tax (6%):</span>\n                    <span>${(0,l.vv)(e.tax,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,l.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${Ln.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${Ln.bankName}<br>\n                <strong>Account Name:</strong> ${Ln.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${Ln.bankAccount||"-"}\n                ${Ln.swiftCode?`<br><strong>SWIFT Code:</strong> ${Ln.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${Ln.taxNumber||Ln.registrationNumber?`\n        <div class="registration-info">\n            ${Ln.registrationNumber?`Reg No: ${Ln.registrationNumber}`:""}\n            ${Ln.registrationNumber&&Ln.taxNumber?" | ":""}\n            ${Ln.taxNumber?`Tax No: ${Ln.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},ut=async e=>{if(!Ln)return Ie("Company settings not loaded. Please try again."),void Ne(!0);try{var n;const t=ht(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(t),r.close(),await new Promise(async e=>{try{var n;null!==(n=r.fonts)&&void 0!==n&&n.ready&&await r.fonts.ready}catch{}const t=r.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const a=await y()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new m.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),Ie("Failed to generate PDF. Please try again."),Ne(!0)}},mt=e=>{if(!Ln)return Ie("Company settings not loaded. Please try again."),void Ne(!0);const n=ht(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},gt=async e=>{Se(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=In.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=Nn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=Nn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}ke(n),we(!0)},yt=()=>{Qn({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",discountType:"none",discountValue:"",discountReason:""}),Wn(null),Mn(""),_n(!1)},jt=g.map(e=>{const n=new Date(e.issueDate);return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}),vt=Array.from(new Set(jt)).sort().reverse(),ft=g.filter(e=>{const n=e.companyName.toLowerCase().includes(K.toLowerCase())||e.invoiceNumber.toLowerCase().includes(K.toLowerCase())||e.managerName.toLowerCase().includes(K.toLowerCase()),t="all"===X||e.status===X||"pending_payment"===X&&(""===e.status||!e.status),i="all"===ne||e.type===ne;let r=!0;if("all"!==ie){const n=new Date(e.issueDate);r=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`===ie}return n&&t&&i&&r}).sort((e,n)=>{const t=new Date(e.issueDate).getTime();return new Date(n.issueDate).getTime()-t}),bt=g.length,wt=g.filter(e=>"paid"===e.status).length,Ct=g.filter(e=>"overdue"===e.status).length,kt=g.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),Ft=e=>new Date(e).toLocaleDateString("en-MY"),St=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},At=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},Nt=e=>{yn(e),le(!0)},Bt=e=>{var n,t;if(yn(e),vn({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=In.find(n=>n.id===e.restaurantId);n&&(An({type:"restaurant",data:n}),bn(n.name))}else if(e.managerId){const n=Nn.find(n=>n.id===e.managerId);n&&(An({type:"manager",data:n}),bn(n.fullName))}ce(!0)},It=e=>{yn(e),fe(!0)};return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(h.mc,{children:[(0,v.jsxs)(h.Y9,{children:[(0,v.jsx)(h.hE,{children:"Invoices"}),(0,v.jsx)(h.ex,{})]}),(0,v.jsxs)(h.UC,{children:[(0,v.jsxs)(o.tU,{children:[(0,v.jsxs)(o.oz,{active:"to_pay"===Ee,onClick:()=>De("to_pay"),children:["Invoices to Pay ",(0,v.jsx)(o.Ex,{count:Pe.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,showZero:!0})]}),(0,v.jsxs)(o.oz,{active:"paid"===Ee,onClick:()=>De("paid"),children:["Paid Invoices ",(0,v.jsx)(o.Ex,{count:ze.length,showZero:!0})]}),(0,v.jsxs)(o.oz,{active:"issued"===Ee,onClick:()=>De("issued"),children:["Issued Invoices ",(0,v.jsx)(o.Ex,{count:g.length,showZero:!0})]})]}),"issued"===Ee&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(h.MD,{children:[(0,v.jsxs)(h.hI,{color:"#059669",children:[(0,v.jsx)(h.Os,{children:bt}),(0,v.jsx)(h.v0,{children:"Total Invoices"}),(0,v.jsx)(h.d1,{children:"All invoice records"})]}),(0,v.jsxs)(h.hI,{color:"#2563EB",children:[(0,v.jsx)(h.Os,{children:wt}),(0,v.jsx)(h.v0,{children:"Paid Invoices"}),(0,v.jsxs)(h.d1,{children:[bt>0?Math.round(wt/bt*100):0,"% completed"]})]}),(0,v.jsxs)(h.hI,{color:"#DC2626",children:[(0,v.jsx)(h.Os,{children:Ct}),(0,v.jsx)(h.v0,{children:"Overdue Invoices"}),(0,v.jsx)(h.d1,{children:"Requires attention"})]}),(0,v.jsxs)(h.hI,{color:"#7C3AED",children:[(0,v.jsx)(h.Os,{children:(0,l.vv)(kt)}),(0,v.jsx)(h.v0,{children:"Total Revenue"}),(0,v.jsx)(h.d1,{children:"From paid invoices"})]})]}),(0,v.jsxs)(f,{children:[(0,v.jsxs)(b,{children:[(0,v.jsx)(u.DO,{placeholder:"Search by invoice #, company, restaurant...",value:K,onChange:e=>Z(e.target.value)}),(0,v.jsxs)(u.Jt,{value:X,onChange:e=>ee(e.target.value),children:[(0,v.jsx)("option",{value:"all",children:"All Status"}),(0,v.jsx)("option",{value:"draft",children:"Draft"}),(0,v.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,v.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,v.jsx)("option",{value:"paid",children:"Paid"}),(0,v.jsx)("option",{value:"overdue",children:"Overdue"}),(0,v.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,v.jsxs)(u.Jt,{value:ne,onChange:e=>te(e.target.value),children:[(0,v.jsx)("option",{value:"all",children:"All Types"}),(0,v.jsx)("option",{value:"automatic",children:"Automatic"}),(0,v.jsx)("option",{value:"manual",children:"Manual"})]}),(0,v.jsxs)(u.Jt,{value:ie,onChange:e=>re(e.target.value),children:[(0,v.jsx)("option",{value:"all",children:"All Months"}),vt.map(e=>{const[n,t]=e.split("-"),i=["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(t)-1];return(0,v.jsxs)("option",{value:e,children:[i," ",n]},e)})]})]}),(0,v.jsx)(w,{children:(0,v.jsx)(C,{variant:"primary",onClick:()=>{yt(),oe(!0)},children:"Create Invoice"})})]}),(0,v.jsxs)(h.XI,{children:[(0,v.jsxs)(J,{columns:"1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)",children:[(0,v.jsx)("span",{className:"col-invoice",children:"Invoice"}),(0,v.jsx)("span",{className:"col-customer",children:"Customer"}),(0,v.jsx)("span",{className:"col-period",children:"Period"}),(0,v.jsx)("span",{className:"col-issued",children:"Issued"}),(0,v.jsx)("span",{className:"col-due",children:"Due"}),(0,v.jsx)("span",{className:"col-status",children:"Status"}),(0,v.jsx)("span",{className:"col-amount",children:"Amount"}),(0,v.jsx)("span",{className:"col-total",children:"Total"}),(0,v.jsx)("span",{className:"col-actions",children:"Actions"})]}),ft.map(e=>(0,v.jsxs)(G,{columns:"1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)",children:[(0,v.jsxs)(h.Np,{children:[(0,v.jsxs)(h.Uj,{className:"col-invoice",children:[(0,v.jsx)(h.PM,{children:"Invoice"}),(0,v.jsxs)(k,{children:[(0,v.jsxs)(F,{children:[e.invoiceNumber,"automatic"===e.type&&(0,v.jsx)(A,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,v.jsx)(S,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,v.jsxs)(h.Uj,{className:"col-customer",children:[(0,v.jsx)(h.PM,{children:"Customer"}),(0,v.jsxs)(k,{children:[(0,v.jsx)(F,{children:e.customerName||e.restaurantName||"Unknown"}),(0,v.jsx)(S,{children:At(e.payerType||"restaurant")})]})]}),(0,v.jsxs)(h.Uj,{className:"col-period",children:[(0,v.jsx)(h.PM,{children:"Period"}),(0,v.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,v.jsxs)(h.Uj,{className:"col-issued",children:[(0,v.jsx)(h.PM,{children:"Issued"}),(0,v.jsx)("div",{style:{fontSize:"13px"},children:Ft(e.issueDate)})]}),(0,v.jsxs)(h.Uj,{className:"col-due",children:[(0,v.jsx)(h.PM,{children:"Due"}),(0,v.jsx)("div",{style:{fontSize:"13px"},children:Ft(e.dueDate)})]}),(0,v.jsxs)(h.Uj,{className:"col-status",children:[(0,v.jsx)(h.PM,{children:"Status"}),(0,v.jsx)("div",{children:(0,v.jsx)(N,{status:e.status,children:St(e.status)})})]}),(0,v.jsxs)(h.Uj,{className:"col-amount",children:[(0,v.jsx)(h.PM,{children:"Amount"}),(0,v.jsx)(B,{children:(0,l.vv)(e.amount,e.currency||"USD")})]}),(0,v.jsxs)(h.Uj,{className:"col-total",children:[(0,v.jsx)(h.PM,{children:"Total"}),(0,v.jsx)(B,{highlight:!0,children:0===e.total?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"USD")})]})]}),(0,v.jsxs)(h.wr,{className:"col-actions",children:[(0,v.jsx)(I,{variant:"primary",onClick:()=>Nt(e),children:"View"}),"draft"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(I,{onClick:()=>Bt(e),children:"Edit"}),(0,v.jsx)(I,{onClick:()=>(e=>{yn(e),ue(!0)})(e),children:"Send"})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(I,{onClick:()=>Bt(e),children:"Edit"}),(0,v.jsx)(I,{onClick:()=>ut(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(I,{onClick:()=>mt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(I,{variant:"email",onClick:()=>gt(e),title:"Send Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,v.jsx)(E,{onClick:()=>It(e),title:"Delete Invoice",children:(0,v.jsx)(D,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,v.jsxs)(v.Fragment,{children:[e.hasPaymentInfo&&(0,v.jsx)(I,{variant:"primary",onClick:()=>(e=>{yn(e),xe(!0)})(e),children:"Confirm"}),(0,v.jsx)(I,{onClick:()=>Bt(e),children:"Edit"}),(0,v.jsx)(I,{onClick:()=>ut(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(I,{onClick:()=>mt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(I,{variant:"email",onClick:()=>gt(e),title:"Resend Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(I,{onClick:()=>Bt(e),children:"Edit"}),(0,v.jsx)(I,{onClick:()=>ut(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(I,{onClick:()=>mt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(I,{variant:"email",onClick:()=>gt(e),title:"Resend Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,v.jsx)(E,{onClick:()=>It(e),title:"Delete Invoice",children:(0,v.jsx)(D,{children:"\xd7"})})]}),"paid"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(I,{onClick:()=>ut(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(I,{onClick:()=>mt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,v.jsx)(I,{onClick:()=>ut(e),title:"Download Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})]},e.id)),0===ft.length&&(0,v.jsxs)(h.pp,{children:[(0,v.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,v.jsx)("div",{style:{fontSize:"14px"},children:0===g.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"to_pay"===Ee&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(h.MD,{children:[(0,v.jsxs)(h.hI,{color:"#D97706",children:[(0,v.jsx)(h.Os,{children:Pe.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length}),(0,v.jsx)(h.v0,{children:"To Pay"}),(0,v.jsx)(h.d1,{children:"Pending payment"})]}),(0,v.jsxs)(h.hI,{color:"#2563EB",children:[(0,v.jsx)(h.Os,{children:Pe.filter(e=>"payment_submitted"===e.status).length}),(0,v.jsx)(h.v0,{children:"Submitted"}),(0,v.jsx)(h.d1,{children:"Awaiting confirmation"})]}),(0,v.jsxs)(h.hI,{color:"#059669",children:[(0,v.jsx)(h.Os,{children:Pe.filter(e=>"paid"===e.status).length}),(0,v.jsx)(h.v0,{children:"Paid"}),(0,v.jsx)(h.d1,{children:"Payment confirmed"})]}),(0,v.jsxs)(h.hI,{color:"#DC2626",children:[(0,v.jsx)(h.Os,{children:(0,l.vv)(Pe.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0))}),(0,v.jsx)(h.v0,{children:"Outstanding"}),(0,v.jsx)(h.d1,{children:"Total unpaid amount"})]})]}),(0,v.jsxs)(h.XI,{children:[(0,v.jsxs)(J,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 160px)",children:[(0,v.jsx)("span",{children:"Invoice"}),(0,v.jsx)("span",{children:"Restaurant"}),(0,v.jsx)("span",{children:"Period"}),(0,v.jsx)("span",{children:"Issued"}),(0,v.jsx)("span",{children:"Due"}),(0,v.jsx)("span",{children:"Status"}),(0,v.jsx)("span",{children:"Amount"}),(0,v.jsx)("span",{children:"Total"}),(0,v.jsx)("span",{children:"Actions"})]}),Pe.length>0?Pe.map(e=>(0,v.jsxs)(G,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 160px)",children:[(0,v.jsxs)(h.Np,{children:[(0,v.jsxs)(h.Uj,{className:"col-invoice",children:[(0,v.jsx)(h.PM,{children:"Invoice"}),(0,v.jsxs)(k,{children:[(0,v.jsxs)(F,{children:[e.invoiceNumber,"automatic"===e.type&&(0,v.jsx)(A,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,v.jsx)(S,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,v.jsxs)(h.Uj,{className:"col-customer",children:[(0,v.jsx)(h.PM,{children:"Restaurant"}),(0,v.jsx)(k,{children:(0,v.jsx)(F,{children:e.restaurantName||e.customerName||"Unknown"})})]}),(0,v.jsxs)(h.Uj,{className:"col-period",children:[(0,v.jsx)(h.PM,{children:"Period"}),(0,v.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,v.jsxs)(h.Uj,{className:"col-issued",children:[(0,v.jsx)(h.PM,{children:"Issued"}),(0,v.jsx)("div",{style:{fontSize:"13px"},children:Ft(e.issueDate)})]}),(0,v.jsxs)(h.Uj,{className:"col-due",children:[(0,v.jsx)(h.PM,{children:"Due"}),(0,v.jsx)("div",{style:{fontSize:"13px"},children:Ft(e.dueDate)})]}),(0,v.jsxs)(h.Uj,{className:"col-status",children:[(0,v.jsx)(h.PM,{children:"Status"}),(0,v.jsx)(N,{status:e.status,children:St(e.status)})]}),(0,v.jsxs)(h.Uj,{className:"col-amount",children:[(0,v.jsx)(h.PM,{children:"Amount"}),(0,v.jsx)(B,{children:(0,l.vv)(e.amount,e.currency||"USD")})]}),(0,v.jsxs)(h.Uj,{className:"col-total",children:[(0,v.jsx)(h.PM,{children:"Total"}),(0,v.jsx)(B,{highlight:!0,children:0===e.total?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"USD")})]})]}),(0,v.jsxs)(h.wr,{className:"col-actions",children:[(0,v.jsx)(I,{variant:"primary",onClick:()=>Nt(e),children:"View"}),("pending_payment"===e.status||"overdue"===e.status)&&e.total>0&&(0,v.jsx)(I,{variant:"primary",onClick:()=>et(e),children:"Pay"}),(0,v.jsx)(I,{onClick:()=>ut(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(I,{onClick:()=>mt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})]},e.id)):(0,v.jsx)(h.pp,{children:"No invoices to pay"})]})]}),"paid"===Ee&&(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(h.XI,{children:[(0,v.jsxs)(J,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 140px)",children:[(0,v.jsx)("span",{children:"Invoice"}),(0,v.jsx)("span",{children:"Restaurant"}),(0,v.jsx)("span",{children:"Period"}),(0,v.jsx)("span",{children:"Paid Date"}),(0,v.jsx)("span",{children:"Status"}),(0,v.jsx)("span",{children:"Amount"}),(0,v.jsx)("span",{children:"Total"}),(0,v.jsx)("span",{children:"Actions"})]}),ze.length>0?ze.sort((e,n)=>new Date(n.paidDate||n.issueDate).getTime()-new Date(e.paidDate||e.issueDate).getTime()).map(e=>(0,v.jsxs)(G,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 140px)",children:[(0,v.jsxs)(h.Np,{children:[(0,v.jsxs)(h.Uj,{className:"col-invoice",children:[(0,v.jsx)(h.PM,{children:"Invoice"}),(0,v.jsxs)(k,{children:[(0,v.jsxs)(F,{children:[e.invoiceNumber,"automatic"===e.type&&(0,v.jsx)(A,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,v.jsx)(S,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,v.jsxs)(h.Uj,{className:"col-customer",children:[(0,v.jsx)(h.PM,{children:"Restaurant"}),(0,v.jsx)(k,{children:(0,v.jsx)(F,{children:e.restaurantName||e.customerName||"Unknown"})})]}),(0,v.jsxs)(h.Uj,{className:"col-period",children:[(0,v.jsx)(h.PM,{children:"Period"}),(0,v.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,v.jsxs)(h.Uj,{className:"col-issued",children:[(0,v.jsx)(h.PM,{children:"Paid Date"}),(0,v.jsx)("div",{style:{fontSize:"13px"},children:e.paidDate?Ft(e.paidDate):Ft(e.issueDate)})]}),(0,v.jsxs)(h.Uj,{className:"col-status",children:[(0,v.jsx)(h.PM,{children:"Status"}),(0,v.jsx)(N,{status:"paid",children:"Paid"})]}),(0,v.jsxs)(h.Uj,{className:"col-amount",children:[(0,v.jsx)(h.PM,{children:"Amount"}),(0,v.jsx)(B,{children:(0,l.vv)(e.amount,e.currency||"USD")})]}),(0,v.jsxs)(h.Uj,{className:"col-total",children:[(0,v.jsx)(h.PM,{children:"Total"}),(0,v.jsx)(B,{highlight:!0,children:0===e.total?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"USD")})]})]}),(0,v.jsxs)(h.wr,{className:"col-actions",children:[(0,v.jsx)(I,{variant:"primary",onClick:()=>Nt(e),children:"View"}),(0,v.jsx)(I,{onClick:()=>ut(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(I,{onClick:()=>mt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})]},e.id)):(0,v.jsx)(h.pp,{children:"No paid invoices yet"})]})}),Ye&&gn&&(0,v.jsx)(P,{onClick:()=>Ve(!1),children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(M,{children:"Submit Payment"}),(0,v.jsx)($,{onClick:()=>Ve(!1),children:"\xd7"})]}),(0,v.jsxs)(_,{children:[(0,v.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,v.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,v.jsx)("strong",{children:gn.invoiceNumber})]}),(0,v.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,l.vv)(gn.total,gn.currency)})]}),nn?(0,v.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"16px 0"},children:"Loading payment methods..."}):0===Xe.length?(0,v.jsxs)("div",{style:{padding:"20px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,v.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#92400E",fontSize:"15px"},children:"Payment Not Available"}),"system_admin"===gn.issuerType?(0,v.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:[(0,v.jsx)("strong",{children:"System Admin"})," has not configured payment methods for ",(0,v.jsx)("strong",{children:gn.currency||"MYR"})," yet. Please contact the system administrator."]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("p",{style:{margin:"0 0 12px 0",color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:["No payment methods configured for ",(0,v.jsx)("strong",{children:gn.currency||"MYR"}),". Please set up your payment settings first."]}),(0,v.jsx)("button",{onClick:()=>{Ve(!1),window.location.href="/pos/foodcourt/payment-settings"},style:{padding:"8px 16px",background:"#EA580C",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"13px",fontWeight:"600"},children:"Go to Payment Settings"})]})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(U,{children:"Payment Method *"}),(0,v.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${Math.min(Xe.length,3)}, 1fr)`,gap:"10px",marginTop:"8px"},children:Xe.map(e=>(0,v.jsxs)("button",{onClick:()=>{Je(n=>({...n,paymentMethod:e.id})),Qe(null)},style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 8px",border:"2px solid "+(qe.paymentMethod===e.id?"#635BFF":"#E5E7EB"),borderRadius:"8px",background:qe.paymentMethod===e.id?"#F5F3FF":"white",cursor:"pointer",transition:"all 0.2s"},children:[(0,v.jsx)("span",{style:{fontSize:"22px",marginBottom:"6px"},children:"stripe"===e.id?"\ud83d\udcb3":"paypal"===e.id?"\ud83c\udd7f\ufe0f":"qr_payment"===e.id?"\ud83d\udcf1":"\ud83c\udfe6"}),(0,v.jsx)("span",{style:{fontSize:"13px",fontWeight:"500",color:"#374151"},children:e.name})]},e.id))})]}),"stripe"===qe.paymentMethod&&gn&&(0,v.jsx)(j.A,{invoiceId:gn.id,onSuccess:()=>{Ve(!1),yn(null),Je({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),Ie("Payment submitted successfully! The system admin will review and confirm your payment."),Ne(!0),Zn(),Xn()},onError:()=>{}}),"bank_transfer"===qe.paymentMethod&&(()=>{const e=Xe.find(e=>"bank_transfer"===e.id);return e?(0,v.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",fontSize:"14px"},children:[(0,v.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#1E40AF"},children:"Bank Transfer Details"}),(0,v.jsxs)("p",{style:{margin:"0 0 4px 0",color:"#374151"},children:["Bank: ",(0,v.jsx)("strong",{children:e.bankName})]}),(0,v.jsxs)("p",{style:{margin:"0 0 4px 0",color:"#374151"},children:["Account: ",(0,v.jsx)("strong",{children:e.accountNumber})]}),(0,v.jsxs)("p",{style:{margin:"0",color:"#374151"},children:["Name: ",(0,v.jsx)("strong",{children:e.accountName})]})]}):null})(),"qr_payment"===qe.paymentMethod&&(()=>{const e=Xe.find(e=>"qr_payment"===e.id);return e&&e.qrImage?(0,v.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",textAlign:"center"},children:[(0,v.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#1E40AF"},children:"Scan QR Code to Pay"}),(0,v.jsx)("img",{src:e.qrImage,alt:"QR Code",style:{maxWidth:"200px",margin:"0 auto"}}),e.qrDescription&&(0,v.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:e.qrDescription})]}):null})(),qe.paymentMethod&&"stripe"!==qe.paymentMethod&&"paypal"!==qe.paymentMethod&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,v.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,v.jsxs)("span",{children:["Please provide either a ",(0,v.jsx)("strong",{children:"Transaction ID / Reference Number"})," or upload a ",(0,v.jsx)("strong",{children:"Payment Receipt Image"})," to submit your payment."]})]}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Transaction ID / Reference Number"}),(0,v.jsx)(O,{type:"text",placeholder:"Enter transaction ID or reference number",value:qe.transactionId,onChange:e=>Je(n=>({...n,transactionId:e.target.value}))})]}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Notes (Optional)"}),(0,v.jsx)(H,{placeholder:"Any additional information about the payment...",value:qe.notes,onChange:e=>Je(n=>({...n,notes:e.target.value}))})]})]})]})]}),(0,v.jsxs)(R,{style:{flexDirection:"column",alignItems:"stretch"},children:[(0,v.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end"},children:[(0,v.jsx)(C,{variant:"secondary",onClick:()=>{Ve(!1),Qe(null)},children:"Cancel"}),"stripe"!==qe.paymentMethod&&"paypal"!==qe.paymentMethod&&(0,v.jsx)(C,{variant:"primary",onClick:async()=>{if(gn){Qe(null),Ze(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${gn.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:qe.paymentMethod,transaction_id:qe.transactionId,notes:qe.notes,receipt_url:qe.receiptImage||null})});if(n.ok)Ve(!1),yn(null),Je({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),Qe(null),Ie("Payment submitted successfully! The system admin will review and confirm your payment."),Ne(!0),await Zn(),await Xn();else{const e=await n.json();Qe(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),Qe("Network error. Please check your connection and try again.")}finally{Ze(!1)}}},disabled:!qe.paymentMethod||Ke||!qe.transactionId&&!qe.receiptImage,children:Ke?"Submitting...":"Submit Payment"})]}),Ge&&(0,v.jsx)(p.Mo,{type:"error",style:{marginTop:"12px",wordBreak:"break-word"},children:Ge})]})]})}),rn&&(0,v.jsx)(P,{onClick:tt,children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(M,{children:on?"Edit Category":"Add Category"}),(0,v.jsx)($,{onClick:tt,children:"\xd7"})]}),(0,v.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),ln.name.trim()&&ln.code.trim())try{pn(!0);const e=localStorage.getItem("auth_token"),n=on?`/api/invoices/categories/${on.id}`:"/api/invoices/categories",t=on?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:ln.name.trim(),code:ln.code.trim().toLowerCase().replace(/\s+/g,"_"),description:ln.description.trim()||null})}),r=await i.json();r.success?(tt(),nt()):alert(r.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{pn(!1)}},children:[(0,v.jsxs)(_,{children:[(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Name *"}),(0,v.jsx)(O,{value:ln.name,onChange:e=>dn({...ln,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Code *"}),(0,v.jsx)(O,{value:ln.code,onChange:e=>dn({...ln,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===on||void 0===on?void 0:on.is_system}),(0,v.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Description"}),(0,v.jsx)(H,{value:ln.description,onChange:e=>dn({...ln,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,v.jsxs)(R,{children:[(0,v.jsx)(C,{variant:"secondary",type:"button",onClick:tt,children:"Cancel"}),(0,v.jsx)(C,{variant:"primary",type:"submit",disabled:cn||!ln.name||!ln.code,children:cn?"Saving...":on?"Update":"Create"})]})]})]})}),(0,v.jsx)(x.A,{isOpen:xn,onCancel:()=>hn(!1),onConfirm:async()=>{if(un)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${un.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(hn(!1),mn(null),nt()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===un||void 0===un?void 0:un.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),ae&&(0,v.jsx)(P,{onClick:e=>{e.target===e.currentTarget&&(oe(!1),yt())},children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(M,{children:"Create Invoice"}),(0,v.jsx)($,{onClick:()=>{oe(!1),yt()},children:"\xd7"})]}),(0,v.jsxs)(_,{children:[(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Search Manager or Restaurant *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(O,{type:"text",value:zn,onChange:e=>(e=>{if(Mn(e),_n(!0),e.length<2)return void Tn({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",Nn),console.log("Available restaurants:",In);const n=Nn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=In.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),Tn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>_n(!0),onBlur:()=>setTimeout(()=>_n(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),$n&&(Pn.managers.length>0||Pn.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[Pn.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),Pn.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>pt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),Pn.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),Pn.restaurants.map(e=>{const n=Nn.find(n=>n.id===e.admin_id);return(0,v.jsxs)("div",{onClick:()=>pt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),Rn&&(0,v.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Rn.type?Rn.data.fullName:Rn.data.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Rn.type?`${Rn.data.companyName} \u2022 Manager`:`${Rn.data.address||"No address"} \u2022 Restaurant`})]}),(0,v.jsx)("button",{onClick:()=>{Wn(null),Mn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,v.jsxs)(W,{children:[(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Amount (RM) *"}),(0,v.jsx)(O,{type:"number",step:"0.01",min:"0",value:Gn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(Gn.discountValue)||0,i="percentage"===Gn.discountType?n*(t/100):"fixed"===Gn.discountType?t:0,r=Math.max(0,n-i),a=at.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),o=r+a;Qn({...Gn,amount:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0.00",required:!0})]}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Due Date *"}),(0,v.jsx)(O,{type:"date",value:Gn.dueDate,onChange:e=>Qn({...Gn,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,v.jsxs)(W,{children:[(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Discount"}),(0,v.jsxs)(Y,{value:Gn.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(Gn.amount)||0,i="none"===n?0:parseFloat(Gn.discountValue)||0,r="percentage"===n?t*(i/100):"fixed"===n?i:0,a=Math.max(0,t-r),o=at.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),s=a+o;Qn({...Gn,discountType:n,discountValue:"none"===n?"":Gn.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,v.jsx)("option",{value:"none",children:"No Discount"}),(0,v.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,v.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Gn.discountType&&(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"percentage"===Gn.discountType?"Discount (%)":"Discount Amount"}),(0,v.jsx)(O,{type:"number",step:"0.01",min:"0",max:"percentage"===Gn.discountType?"100":void 0,value:Gn.discountValue,onChange:e=>{const n=parseFloat(Gn.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===Gn.discountType?n*(t/100):t,r=Math.max(0,n-i),a=at.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),o=r+a;Qn({...Gn,discountValue:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Gn.discountType&&(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Discount Reason"}),(0,v.jsx)(O,{type:"text",value:Gn.discountReason,onChange:e=>Qn({...Gn,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Invoice Category"}),(0,v.jsx)(Y,{value:Gn.invoiceCategory||"service",onChange:e=>Qn({...Gn,invoiceCategory:e.target.value}),children:Yn.length>0?Yn.filter(e=>"subscription"!==e.code).map(e=>(0,v.jsx)("option",{value:e.code,children:e.name},e.id)):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"service",children:"Service"}),(0,v.jsx)("option",{value:"consulting",children:"Consulting"}),(0,v.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===Gn.invoiceCategory&&(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Plan/Item"}),(0,v.jsx)(H,{value:Gn.customDescription||"",onChange:e=>Qn({...Gn,customDescription:e.target.value}),rows:3})]}),("service"===(Gn.invoiceCategory||"service")||"consulting"===Gn.invoiceCategory)&&(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Plan/Item"}),(0,v.jsx)(H,{value:Gn.serviceDescription||"",onChange:e=>Qn({...Gn,serviceDescription:e.target.value}),rows:3})]}),(0,v.jsxs)(V,{children:[(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,l.vv)(parseFloat(Gn.amount||"0"),e.currency)})]}),"none"!==Gn.discountType&&parseFloat(Gn.discountValue||"0")>0&&(()=>{const n=parseFloat(Gn.amount||"0"),t=parseFloat(Gn.discountValue||"0"),i="percentage"===Gn.discountType?n*(t/100):t;return(0,v.jsxs)(q,{children:[(0,v.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Gn.discountType?` (${t}%)`:"",":"]}),(0,v.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,l.vv)(i,e.currency)]})]})})(),at.filter(e=>e.enabled&&e.rate>0).map((n,t)=>{const i=parseFloat(Gn.amount||"0"),r=parseFloat(Gn.discountValue||"0"),a="percentage"===Gn.discountType?i*(r/100):"fixed"===Gn.discountType?r:0,o=Math.max(0,i-a)*(n.rate/100);return(0,v.jsxs)(q,{children:[(0,v.jsxs)("span",{children:[n.name," (",n.rate,"%):"]}),(0,v.jsx)("span",{children:(0,l.vv)(o,e.currency)})]},t)}),0===at.filter(e=>e.enabled&&e.rate>0).length&&(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Additional Charges:"}),(0,v.jsx)("span",{children:(0,l.vv)(0,e.currency)})]}),(0,v.jsxs)(q,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(parseFloat(Gn.total||"0"),e.currency)})})]})]})]}),(0,v.jsxs)(R,{children:[(0,v.jsx)(C,{variant:"secondary",onClick:()=>{oe(!1),yt()},children:"Cancel"}),(0,v.jsx)(C,{variant:"primary",onClick:async()=>{if(Rn&&Gn.amount&&Gn.dueDate)try{const t=parseFloat(Gn.amount),i=parseFloat(Gn.discountValue)||0,r="percentage"===Gn.discountType?t*(i/100):"fixed"===Gn.discountType?i:0,a=Math.max(0,t-r),o=at.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(a*e.rate/100*100)/100})),s=o.reduce((e,n)=>e+n.amount,0),l=a+s,d=new Date;d.setDate(1);const c=new Date;c.setMonth(c.getMonth()+1),c.setDate(0);let p="";p="others"===Gn.invoiceCategory?Gn.customDescription||"":Gn.serviceDescription||"";let x="",h="",u="",m="";if("restaurant"===Rn.type){const e=Rn.data;x=e.name,m=e.name,u=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),h=n.join("\n")}else if("manager"===Rn.type){const e=Rn.data;x=e.fullName,u=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),h=n.join("\n")}const g={restaurant_id:"restaurant"===Rn.type?Rn.data.id:null,manager_id:"manager"===Rn.type?Rn.data.id:null,customer_name:x,customer_address:h,company_name:u,restaurant_name:m,type:"manual",billing_period_start:d.toISOString(),billing_period_end:c.toISOString(),due_date:new Date(Gn.dueDate).toISOString(),total_amount:l,subtotal_before_discount:r>0?t:null,discount_type:"none"!==Gn.discountType?Gn.discountType:null,discount_value:r>0?i:null,discount_amount:r>0?r:null,discount_reason:Gn.discountReason||null,currency:e.currency||"MYR",status:"draft",notes:p,issued_by:(null===n||void 0===n?void 0:n.id)||1,issued_at:(new Date).toISOString(),issuer_type:"foodcourt",issuer_id:(null===n||void 0===n?void 0:n.foodcourt_id)||null,invoice_category:Gn.invoiceCategory||"service",additional_charges:o},y=[{item_type:Gn.invoiceCategory,description:p,calculation_method:"fixed",fixed_amount:t,calculated_amount:t,tax_rate:0,tax_amount:0,total_amount:t}],j=localStorage.getItem("auth_token"),v=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({invoice_data:g,items:y})});if(v.ok)await Kn(),oe(!1),yt();else{const e=await v.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(t){console.error("Error creating invoice:",t),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!Rn||!Gn.amount||!Gn.dueDate,children:"Create Invoice"})]})]})}),se&&gn&&(0,v.jsx)(P,{onClick:()=>le(!1),children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(M,{children:"Invoice Details"}),(0,v.jsx)($,{onClick:()=>le(!1),children:"\xd7"})]}),(0,v.jsxs)(_,{children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===Ln||void 0===Ln?void 0:Ln.companyLogo)&&(0,v.jsx)("img",{src:Ln.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,v.jsx)("div",{style:{fontSize:null!==Ln&&void 0!==Ln&&Ln.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===Ln||void 0===Ln?void 0:Ln.companyName)||"Company Name"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===Ln||void 0===Ln?void 0:Ln.address)&&(0,v.jsx)("div",{children:Ln.address}),((null===Ln||void 0===Ln?void 0:Ln.city)||(null===Ln||void 0===Ln?void 0:Ln.state)||(null===Ln||void 0===Ln?void 0:Ln.postalCode))&&(0,v.jsx)("div",{children:[null===Ln||void 0===Ln?void 0:Ln.city,null===Ln||void 0===Ln?void 0:Ln.state,null===Ln||void 0===Ln?void 0:Ln.postalCode].filter(Boolean).join(", ")}),(null===Ln||void 0===Ln?void 0:Ln.country)&&(0,v.jsx)("div",{children:Ln.country}),(null===Ln||void 0===Ln?void 0:Ln.phone)&&(0,v.jsxs)("div",{children:["Tel: ",Ln.phone]}),(null===Ln||void 0===Ln?void 0:Ln.email)&&(0,v.jsxs)("div",{children:["Email: ",Ln.email]})]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,v.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:gn.invoiceNumber}),(0,v.jsx)(N,{status:gn.status,style:{marginTop:"8px"},children:St(gn.status)})]})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,v.jsxs)("div",{style:{flex:1},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,v.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:gn.customerName}),gn.customerAddress&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:gn.customerAddress}),gn.restaurantName&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",gn.restaurantName]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:gn.billingPeriod||"-"})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ft(gn.issueDate)})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ft(gn.dueDate)})]}),gn.paidDate&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ft(gn.paidDate)})]})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,v.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,v.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,v.jsx)("tbody",{children:gn.items.map((e,n)=>(0,v.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.unitPrice,gn.currency||"MYR")}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.total,gn.currency||"MYR")})]},n))})]})]}),(0,v.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,v.jsx)("div",{style:{width:"280px"},children:(0,v.jsxs)(V,{children:[(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,l.vv)(gn.subtotalBeforeDiscount||gn.amount,gn.currency||"MYR")})]}),gn.discountType&&"none"!==gn.discountType&&gn.discountAmount>0&&(0,v.jsxs)(q,{children:[(0,v.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===gn.discountType?` (${gn.discountValue}%)`:"",":"]}),(0,v.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,l.vv)(gn.discountAmount,gn.currency||"MYR")]})]}),(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Tax (6%):"}),(0,v.jsx)("span",{children:(0,l.vv)(gn.tax,gn.currency||"MYR")})]}),(0,v.jsxs)(q,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(gn.total,gn.currency||"MYR")})})]})]})})}),(null===Ln||void 0===Ln?void 0:Ln.bankName)&&(0,v.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Bank:"})," ",Ln.bankName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Name:"})," ",Ln.bankAccountName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Number:"})," ",Ln.bankAccount]})]})]}),((null===Ln||void 0===Ln?void 0:Ln.taxNumber)||(null===Ln||void 0===Ln?void 0:Ln.registrationNumber))&&(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===Ln||void 0===Ln?void 0:Ln.registrationNumber)&&(0,v.jsxs)("span",{children:["Reg No: ",Ln.registrationNumber]}),(null===Ln||void 0===Ln?void 0:Ln.registrationNumber)&&(null===Ln||void 0===Ln?void 0:Ln.taxNumber)&&(0,v.jsx)("span",{children:" | "}),(null===Ln||void 0===Ln?void 0:Ln.taxNumber)&&(0,v.jsxs)("span",{children:["Tax No: ",Ln.taxNumber]})]})]})]})}),pe&&gn&&(0,v.jsx)(P,{onClick:()=>xe(!1),children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(z,{children:[(0,v.jsxs)(M,{children:["Confirm Payment - ",gn.invoiceNumber]}),(0,v.jsx)($,{onClick:()=>xe(!1),children:"\xd7"})]}),(0,v.jsxs)(_,{children:[(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Payment Confirmation"}),(0,v.jsxs)(V,{children:[(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Manager:"}),(0,v.jsx)("span",{children:gn.managerName})]}),(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Company:"}),(0,v.jsx)("span",{children:gn.companyName})]}),(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Invoice Number:"}),(0,v.jsx)("span",{children:gn.invoiceNumber})]}),(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Due Date:"}),(0,v.jsx)("span",{children:Ft(gn.dueDate)})]}),(0,v.jsxs)(q,{highlight:!0,children:[(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:"Payment Amount:"})}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(gn.total,gn.currency||"USD")})})]})]})]}),(gn.paymentMethod||gn.receiptUrl||gn.transactionId)&&(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Customer's Payment Information"}),(0,v.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[gn.paymentMethod&&(0,v.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,v.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===gn.paymentMethod?"Bank Transfer":"qr_payment"===gn.paymentMethod?"QR Payment":"stripe"===gn.paymentMethod?"Stripe":"paypal"===gn.paymentMethod?"PayPal":gn.paymentMethod]}),gn.transactionId&&(0,v.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,v.jsx)("strong",{children:"Transaction ID:"})," ",gn.transactionId]})]}),gn.receiptUrl&&(0,v.jsxs)("div",{style:{marginTop:"12px"},children:[(0,v.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,v.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,v.jsx)("img",{src:gn.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(gn.receiptUrl,"_blank")}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,v.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,v.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,v.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,v.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Status Change"}),(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,v.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,v.jsxs)(R,{children:[(0,v.jsx)(C,{variant:"secondary",onClick:()=>xe(!1),children:"Cancel"}),(0,v.jsx)(C,{variant:"primary",onClick:async()=>{if(gn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${gn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await Kn(),xe(!1),yn(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),de&&gn&&jn&&(0,v.jsx)(P,{onClick:()=>ce(!1),children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(z,{children:[(0,v.jsxs)(M,{children:["Edit Invoice - ",gn.invoiceNumber]}),(0,v.jsx)($,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,v.jsxs)(_,{children:[(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Search Manager or Restaurant *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(O,{type:"text",value:fn,onChange:e=>(e=>{if(bn(e),Fn(!0),e.length<2)return void Cn({managers:[],restaurants:[]});const n=Nn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=In.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));Cn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>Fn(!0),onBlur:()=>setTimeout(()=>Fn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),kn&&(wn.managers.length>0||wn.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[wn.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),wn.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>ct("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),wn.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),wn.restaurants.map(e=>{const n=Nn.find(n=>n.id===e.admin_id);return(0,v.jsxs)("div",{onClick:()=>ct("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),Sn&&(0,v.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Sn.type?Sn.data.fullName:Sn.data.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Sn.type?`${Sn.data.companyName} \u2022 Manager`:`${Sn.data.address||"No address"} \u2022 Restaurant`})]}),(0,v.jsx)("button",{onClick:()=>{An(null),bn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,v.jsxs)(W,{children:[(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Amount (RM)"}),(0,v.jsx)(O,{type:"number",value:jn.amount,onChange:n=>{const t=parseFloat(n.target.value)||0,i=rt(jn.currency||e.currency||"MYR").filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+t*n.rate/100,0),r=t+i;vn({...jn,amount:n.target.value,tax:i.toFixed(2),total:r.toFixed(2)})}})]}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Due Date"}),(0,v.jsx)(O,{type:"date",value:jn.dueDate,onChange:e=>vn({...jn,dueDate:e.target.value})})]})]}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Status"}),(0,v.jsxs)(Y,{value:jn.status,onChange:e=>vn({...jn,status:e.target.value}),children:[(0,v.jsx)("option",{value:"draft",children:"Draft"}),(0,v.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,v.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,v.jsx)("option",{value:"paid",children:"Paid"}),(0,v.jsx)("option",{value:"overdue",children:"Overdue"}),(0,v.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Invoice Category"}),(0,v.jsx)(Y,{value:jn.invoiceCategory||"service",onChange:e=>vn({...jn,invoiceCategory:e.target.value}),children:Yn.length>0?Yn.filter(e=>"subscription"!==e.code).map(e=>(0,v.jsx)("option",{value:e.code,children:e.name},e.id)):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"service",children:"Service"}),(0,v.jsx)("option",{value:"consulting",children:"Consulting"}),(0,v.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===jn.invoiceCategory&&(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Plan/Item"}),(0,v.jsx)(H,{value:jn.customDescription||"",onChange:e=>vn({...jn,customDescription:e.target.value}),rows:3})]}),("service"===(jn.invoiceCategory||"service")||"consulting"===jn.invoiceCategory)&&(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Plan/Item"}),(0,v.jsx)(H,{value:jn.serviceDescription||"",onChange:e=>vn({...jn,serviceDescription:e.target.value}),rows:3})]}),(0,v.jsxs)(V,{children:[(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,l.vv)(parseFloat(jn.amount||"0"),jn.currency||e.currency)})]}),rt(jn.currency||e.currency||"MYR").filter(e=>e.enabled&&e.rate>0).map((n,t)=>{const i=parseFloat(jn.amount||"0")*(n.rate/100);return(0,v.jsxs)(q,{children:[(0,v.jsxs)("span",{children:[n.name," (",n.rate,"%):"]}),(0,v.jsx)("span",{children:(0,l.vv)(i,jn.currency||e.currency)})]},t)}),(0,v.jsxs)(q,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(parseFloat(jn.total||"0"),jn.currency||e.currency)})})]})]})]}),(0,v.jsxs)(R,{children:[(0,v.jsx)(C,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,v.jsx)(C,{variant:"primary",onClick:async()=>{if(gn&&jn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${gn.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(jn.amount),tax:parseFloat(jn.tax),total:parseFloat(jn.total),dueDate:jn.dueDate,status:jn.status,payerType:jn.payerType,payerId:jn.payerId,items:jn.items})});if(n.ok){const e={...gn,amount:parseFloat(jn.amount),tax:parseFloat(jn.tax),total:parseFloat(jn.total),dueDate:jn.dueDate,status:jn.status,payerType:jn.payerType,payerId:jn.payerId,items:jn.items};Q(g.map(n=>n.id===gn.id?e:n)),ce(!1),yn(null),vn(null),Ie("Invoice updated successfully!"),Ne(!0)}else{const e=await n.json();Ie(`Failed to update invoice: ${e.error||"Unknown error"}`),Ne(!0)}}catch(e){console.error("Error updating invoice:",e),Ie("Error updating invoice. Please try again."),Ne(!0)}},children:"Save Changes"})]})]})}),he&&gn&&(0,v.jsx)(P,{onClick:()=>ue(!1),children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(M,{children:"Send Invoice"}),(0,v.jsx)($,{onClick:()=>ue(!1),children:"\xd7"})]}),(0,v.jsx)(_,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice to Manager"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,v.jsx)("strong",{children:gn.invoiceNumber})," to ",(0,v.jsx)("strong",{children:gn.managerName}),"?"]}),(0,v.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:gn.invoiceNumber})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:gn.managerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:gn.companyName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,v.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,l.vv)(gn.total,gn.currency||"USD")})]})]})]})}),(0,v.jsxs)(R,{children:[(0,v.jsx)(C,{variant:"secondary",onClick:()=>ue(!1),children:"Cancel"}),(0,v.jsx)(C,{variant:"primary",onClick:async()=>{if(gn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${gn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await Kn(),ue(!1),yn(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Send Invoice"})]})]})}),me&&gn&&(0,v.jsx)(P,{onClick:()=>ge(!1),children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(M,{children:"Resend Invoice"}),(0,v.jsx)($,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,v.jsx)(_,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,v.jsx)("strong",{children:gn.invoiceNumber})," to ",(0,v.jsx)("strong",{children:gn.managerName}),"?"]}),(0,v.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,v.jsxs)(R,{children:[(0,v.jsx)(C,{variant:"secondary",onClick:()=>ge(!1),children:"Cancel"}),(0,v.jsx)(C,{variant:"primary",onClick:()=>{gn&&(ge(!1),yn(null))},children:"Resend Invoice"})]})]})}),ye&&gn&&(0,v.jsx)(P,{onClick:()=>je(!1),children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(M,{children:"Cancel Invoice"}),(0,v.jsx)($,{onClick:()=>je(!1),children:"\xd7"})]}),(0,v.jsx)(_,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,v.jsx)("strong",{children:gn.invoiceNumber}),"?"]}),(0,v.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,v.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,v.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,v.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:gn.invoiceNumber})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:gn.managerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,v.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,l.vv)(gn.total,gn.currency||"USD")})]})]})]})}),(0,v.jsxs)(R,{children:[(0,v.jsx)(C,{variant:"secondary",onClick:()=>je(!1),children:"Keep Invoice"}),(0,v.jsx)(C,{variant:"primary",onClick:async()=>{if(gn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${gn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await Kn(),je(!1),yn(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),ve&&gn&&(0,v.jsx)(P,{onClick:()=>fe(!1),children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(M,{children:"Delete Invoice"}),(0,v.jsx)($,{onClick:()=>fe(!1),children:"\xd7"})]}),(0,v.jsx)(_,{children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,v.jsxs)("strong",{children:["#",gn.invoiceNumber]}),"?",(0,v.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,v.jsxs)(R,{children:[(0,v.jsx)(C,{variant:"secondary",onClick:()=>fe(!1),children:"Keep Invoice"}),(0,v.jsx)(C,{variant:"primary",onClick:async()=>{if(gn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${gn.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await Kn(),fe(!1),yn(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),be&&Fe&&(0,v.jsx)(P,{onClick:()=>we(!1),children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(M,{children:"Send Invoice via Email"}),(0,v.jsx)($,{onClick:()=>we(!1),children:"\xd7"})]}),(0,v.jsxs)(_,{children:[(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Invoice"}),(0,v.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Fe.invoiceNumber}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:Fe.customerName}),(0,v.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,l.vv)(Fe.total,Fe.currency||"MYR")})]})]}),(0,v.jsxs)(L,{children:[(0,v.jsx)(U,{children:"Recipient Email *"}),(0,v.jsx)(O,{type:"email",value:Ce,onChange:e=>ke(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,v.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:Ce?(0,v.jsxs)(v.Fragment,{children:["Default email for ","restaurant"===Fe.payerType?"Restaurant":"foodcourt_manager"===Fe.payerType?"Foodcourt Manager":"brand_manager"===Fe.payerType?"Brand Manager":"Customer"]}):(0,v.jsxs)(v.Fragment,{children:["Enter the ","restaurant"===Fe.payerType?"restaurant":"foodcourt_manager"===Fe.payerType?"foodcourt manager":"brand_manager"===Fe.payerType?"brand manager":"customer"," email address"]})})]}),(0,v.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,v.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,v.jsxs)(R,{children:[(0,v.jsx)(C,{variant:"secondary",onClick:()=>{we(!1),Se(null),ke("")},children:"Cancel"}),(0,v.jsx)(C,{variant:"primary",onClick:async()=>{if(!Fe||!Ce)return Ie("Please enter a valid email address."),void Ne(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Fe.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:Ce})});if(n.ok)Ie(`Invoice sent successfully to ${Ce}`),we(!1),Se(null),ke("");else{const e=await n.json();Ie(e.error||"Failed to send invoice email.")}Ne(!0)}catch(e){console.error("Error sending invoice email:",e),Ie("Failed to send invoice email. Please try again."),Ne(!0)}},disabled:!Ce||!Ce.includes("@"),children:"Send Email"})]})]})}),Ae&&(0,v.jsx)(P,{onClick:()=>Ne(!1),children:(0,v.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(M,{children:"Success"}),(0,v.jsx)($,{onClick:()=>Ne(!1),children:"\xd7"})]}),(0,v.jsx)(_,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,v.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Be})})}),(0,v.jsx)(R,{children:(0,v.jsx)(C,{variant:"primary",onClick:()=>Ne(!1),children:"OK"})})]})})]})]})})}},2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var i=t(4752),r=t(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i}=e;return(0,r.jsx)(a,{className:t,style:i,children:n})},d=e=>{let{active:n,onClick:t,children:i,className:a}=e;return(0,r.jsx)(o,{active:n,onClick:t,className:a,children:i})},c=e=>{let{count:n,variant:t="default",showZero:i=!1}=e;return 0!==n||i?(0,r.jsx)(s,{variant:t,children:n}):null}},2653:(e,n,t)=>{t.d(n,{M:()=>a});var i=t(9950),r=t(4492);function a(e){const[n,t]=(0,r.ok)(),a=(0,i.useCallback)(()=>n.get("tab")||e,[n,e]),[o,s]=(0,i.useState)(a());return[o,(0,i.useCallback)(e=>{s(e),t({tab:e})},[t])]}},4757:(e,n,t)=>{t.d(n,{A:()=>m});var i=t(9950),r=t(7202),a=t(1627),o=t(4752),s=t(9246),l=t(4414);const d=e=>{let{onSuccess:n,onError:t}=e;const r=(0,a.t2)(),o=(0,a.HH)(),[s,d]=(0,i.useState)(!1),[h,u]=(0,i.useState)("");return(0,l.jsxs)(c,{onSubmit:async e=>{if(e.preventDefault(),!r||!o)return;d(!0),u("");const{error:i}=await r.confirmPayment({elements:o,confirmParams:{return_url:`${window.location.origin}/pos/invoices`},redirect:"if_required"});i?(u(i.message||"Payment failed"),t(i.message||"Payment failed"),d(!1)):n()},children:[(0,l.jsx)(a.He,{}),(0,l.jsx)(p,{type:"submit",disabled:!r||s,children:s?"Processing...":"Pay Now"}),h&&(0,l.jsx)(x,{children:h})]})},c=o.Ay.form`
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
`,m=e=>{let{invoiceId:n,onSuccess:t,onError:o}=e;const[c,p]=(0,i.useState)(null),[x,m]=(0,i.useState)(""),[g,y]=(0,i.useState)(!0),[j,v]=(0,i.useState)("");return(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=await s.A.post(`/api/invoices/${n}/create-payment-intent`,{},{headers:{Authorization:`Bearer ${e}`}});if(t.data.success){const{clientSecret:e,publishableKey:n}=t.data;if(!n)throw new Error("Stripe publishable key not configured");p((0,r.c)(n)),m(e)}}catch(i){var e,t;const n=(null===(e=i.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.error)||i.message||"Failed to initialize payment";v(n),o(n)}finally{y(!1)}})()},[n]),g?(0,l.jsx)(h,{children:"Initializing payment..."}):j?(0,l.jsx)(u,{children:j}):x&&c?(0,l.jsx)(a.S8,{stripe:c,options:{clientSecret:x,appearance:{theme:"stripe",variables:{colorPrimary:"#635BFF",borderRadius:"8px"}}},children:(0,l.jsx)(d,{onSuccess:t,onError:o})}):(0,l.jsx)(u,{children:"Payment initialization failed. Please try again."})}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var i=t(4752),r=t(9610),a=t(4414);const o=i.Ay.div`
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