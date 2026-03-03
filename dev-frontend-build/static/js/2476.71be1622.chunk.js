"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2476],{2476:(e,n,t)=>{t.r(n),t.d(n,{default:()=>G});var i=t(9950),r=t(4752),a=t(2597),o=t(2653),s=t(6038),l=t(9018),d=t(1367),c=t(4728),p=t(7617),x=t(8409),h=t(2488),u=t(5612),m=t(1052),g=t.n(m),y=t(4757),j=t(4414);const v=r.Ay.div`
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
`,f=r.Ay.div`
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
`,b=r.Ay.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`,w=(0,r.Ay)(c.SC)``,C=r.Ay.div``,k=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=r.Ay.div`
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
`,N=(0,r.Ay)(c.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,A=r.Ay.div`
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
`,E=r.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
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
`,P=r.Ay.div`
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
`,z=r.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,M=r.Ay.button`
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
`,$=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,R=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,W=r.Ay.div`
  margin-bottom: 20px;
`,L=r.Ay.label`
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
`,V=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,q=(0,r.Ay)(x.A0)`
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
`,J=(0,r.Ay)(x.Hj)`
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
`,G=()=>{const{operationSettings:e}=(0,l.Pj)(),{user:n}=(0,d.As)(),[t,r]=(0,i.useState)([]),[m,G]=(0,i.useState)(""),[Q,K]=(0,i.useState)("all"),[Z,X]=(0,i.useState)("all"),[ee,ne]=(0,i.useState)("all"),[te,ie]=(0,i.useState)(!1),[re,ae]=(0,i.useState)(!1),[oe,se]=(0,i.useState)(!1),[le,de]=(0,i.useState)(!1),[ce,pe]=(0,i.useState)(!1),[xe,he]=(0,i.useState)(!1),[ue,me]=(0,i.useState)(!1),[ge,ye]=(0,i.useState)(!1),[je,ve]=(0,i.useState)(!1),[fe,be]=(0,i.useState)(""),[we,Ce]=(0,i.useState)(null),[ke,Fe]=(0,i.useState)(!1),[Se,Ne]=(0,i.useState)(""),[Ae,Be]=(0,o.M)("to_pay"),[Ie,Ee]=(0,i.useState)([]),[De,Pe]=(0,i.useState)([]),[Te,ze]=(0,i.useState)(!1),[Me,_e]=(0,i.useState)({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),[$e,Re]=(0,i.useState)(null),[We,Le]=(0,i.useState)(!1),[Ue,Oe]=(0,i.useState)([]),[He,Ye]=(0,i.useState)(!1),[Ve,qe]=(0,i.useState)(!1),[Je,Ge]=(0,i.useState)(null),[Qe,Ke]=(0,i.useState)({name:"",code:"",description:""}),[Ze,Xe]=(0,i.useState)(!1),[en,nn]=(0,i.useState)(!1),[tn,rn]=(0,i.useState)(null),[an,on]=(0,i.useState)(null),[sn,ln]=(0,i.useState)(null),[dn,cn]=(0,i.useState)(""),[pn,xn]=(0,i.useState)({managers:[],restaurants:[]}),[hn,un]=(0,i.useState)(!1),[mn,gn]=(0,i.useState)(null),[yn,jn]=(0,i.useState)([]),[vn,fn]=(0,i.useState)([]),[,bn]=(0,i.useState)([]),[wn,Cn]=(0,i.useState)({managers:[],restaurants:[]}),[kn,Fn]=(0,i.useState)(""),[Sn,Nn]=(0,i.useState)(!1),[An,Bn]=(0,i.useState)(null),[In,En]=(0,i.useState)(null),[,Dn]=(0,i.useState)({}),[Pn,Tn]=(0,i.useState)([]),[zn,Mn]=(0,i.useState)({}),[_n,$n]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",discountType:"none",discountValue:"",discountReason:""}),Rn=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void r([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),r(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),r([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),r([])}},Wn=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void Ee([]);const n=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();Ee(e)}else console.error("Failed to fetch invoices to pay"),Ee([])}catch(e){console.error("Error fetching invoices to pay:",e),Ee([])}},Ln=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void Pe([]);const n=await fetch("/api/invoices/to-pay?status=paid",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();Pe(e)}else Pe([])}catch(e){console.error("Error fetching paid invoices:",e),Pe([])}},Un=async e=>{on(e),_e({paymentMethod:"",transactionId:"",notes:"",receiptImage:""}),Re(null),await(async(e,n,t)=>{Ye(!0);try{let i=`/api/admin/payment-settings/available/${e}`;"brand"===n&&t?i=`/api/brands/${t}/payment-settings/available/${e}`:"foodcourt"===n&&t&&(i=`/api/foodcourts/${t}/payment-settings/available/${e}`);const r=localStorage.getItem("auth_token"),a=await fetch(i,{headers:{Authorization:`Bearer ${r}`}});if(a.ok){const e=await a.json();Oe(e.methods||[]),e.methods&&e.methods.length>0&&_e(n=>({...n,paymentMethod:e.methods[0].id}))}else Oe([])}catch(i){console.error("Error fetching payment methods:",i),Oe([])}finally{Ye(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),ze(!0)},On=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&Tn(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Hn=()=>{qe(!1),Ge(null),Ke({name:"",code:"",description:""})},Yn=(0,i.useCallback)(async()=>{if(null!==n&&void 0!==n&&n.foodcourt_id)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/foodcourts/${n.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){var e;const n=await i.json(),t=n.data||n;if(null!==(e=t.payment_settings)&&void 0!==e&&e.additionalCharges){const e=t.payment_settings.additionalCharges;Array.isArray(e)?Mn({}):Mn(e)}}}catch(t){console.error("Error fetching foodcourt payment settings:",t)}},[null===n||void 0===n?void 0:n.foodcourt_id]),Vn=e=>{const n=(0,s.Wh)(e);return zn[n]||zn[e]||[]},qn=Vn(e.currency||"MYR");(0,i.useEffect)(()=>{Rn(),Wn(),Ln(),Gn(),Qn(),Kn(),et(),Jn(),On(),Yn()},[]);const Jn=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&Dn(n.currencies)}}catch(e){console.error("Error fetching currency config:",e)}},Gn=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t,i]=await Promise.all([fetch("/api/users?role=Manager",{headers:e}),fetch("/api/users?role=Foodcourt_Manager",{headers:e}),fetch("/api/users?role=Brand_Manager",{headers:e})]);let r=[];if(n.ok){const e=(await n.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Restaurant Manager"}));r=[...r,...e]}if(t.ok){const e=(await t.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt Manager"}));r=[...r,...e]}if(i.ok){const e=(await i.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand Manager"}));r=[...r,...e]}jn(r)}catch(e){console.error("Error fetching managers:",e),jn([])}},Qn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||""}});fn(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),fn([])}catch(e){console.error("Error fetching restaurants:",e),fn([])}},Kn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/subscriptions",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();bn(e)}else console.warn("Subscription API not available"),bn([])}catch(e){console.error("Error fetching subscriptions:",e),bn([])}},Zn=(e,n)=>{if(gn({type:e,data:n}),cn("manager"===e?n.fullName:n.name),un(!1),"manager"===e){const e=n;ln({...sn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=yn.find(n=>n.id===e.admin_id);ln({...sn,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},Xn=(e,n)=>{if(Bn({type:e,data:n}),Nn(!1),Fn("manager"===e?n.fullName:n.name),"manager"===e){const e=n;$n({..._n,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=yn.find(n=>n.id===e.admin_id);$n({..._n,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:t?t.fullName:"",companyName:e.name})}},et=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();En(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),En({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),En({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},nt=e=>{if(!In)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${In.companyLogo?`<img src="${In.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${In.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${In.address?`${In.address}<br>`:""}\n                    ${[In.city,In.state,In.postalCode].filter(Boolean).join(", ")}${In.city||In.state||In.postalCode?"<br>":""}\n                    ${In.country?`${In.country}<br>`:""}\n                    ${In.phone?`Tel: ${In.phone}<br>`:""}\n                    ${In.email?`Email: ${In.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${ht(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${ht(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${ht(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,s.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,s.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,s.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row tax">\n                    <span>Tax (6%):</span>\n                    <span>${(0,s.vv)(e.tax,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,s.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${In.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${In.bankName}<br>\n                <strong>Account Name:</strong> ${In.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${In.bankAccount||"-"}\n                ${In.swiftCode?`<br><strong>SWIFT Code:</strong> ${In.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${In.taxNumber||In.registrationNumber?`\n        <div class="registration-info">\n            ${In.registrationNumber?`Reg No: ${In.registrationNumber}`:""}\n            ${In.registrationNumber&&In.taxNumber?" | ":""}\n            ${In.taxNumber?`Tax No: ${In.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},tt=async e=>{if(!In)return Ne("Company settings not loaded. Please try again."),void Fe(!0);try{var n;const t=nt(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(t),r.close(),await new Promise(async e=>{try{var n;null!==(n=r.fonts)&&void 0!==n&&n.ready&&await r.fonts.ready}catch{}const t=r.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const a=await g()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new u.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),Ne("Failed to generate PDF. Please try again."),Fe(!0)}},it=e=>{if(!In)return Ne("Company settings not loaded. Please try again."),void Fe(!0);const n=nt(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},rt=async e=>{Ce(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=vn.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=yn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=yn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}be(n),ve(!0)},at=()=>{$n({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",discountType:"none",discountValue:"",discountReason:""}),Bn(null),Fn(""),Nn(!1)},ot=t.map(e=>{const n=new Date(e.issueDate);return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}),st=Array.from(new Set(ot)).sort().reverse(),lt=t.filter(e=>{const n=e.companyName.toLowerCase().includes(m.toLowerCase())||e.invoiceNumber.toLowerCase().includes(m.toLowerCase())||e.managerName.toLowerCase().includes(m.toLowerCase()),t="all"===Q||e.status===Q||"pending_payment"===Q&&(""===e.status||!e.status),i="all"===Z||e.type===Z;let r=!0;if("all"!==ee){const n=new Date(e.issueDate);r=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`===ee}return n&&t&&i&&r}).sort((e,n)=>{const t=new Date(e.issueDate).getTime();return new Date(n.issueDate).getTime()-t}),dt=t.length,ct=t.filter(e=>"paid"===e.status).length,pt=t.filter(e=>"overdue"===e.status).length,xt=t.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),ht=e=>new Date(e).toLocaleDateString("en-MY"),ut=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},mt=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},gt=e=>{on(e),ae(!0)},yt=e=>{var n,t;if(on(e),ln({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=vn.find(n=>n.id===e.restaurantId);n&&(gn({type:"restaurant",data:n}),cn(n.name))}else if(e.managerId){const n=yn.find(n=>n.id===e.managerId);n&&(gn({type:"manager",data:n}),cn(n.fullName))}se(!0)},jt=e=>{on(e),ye(!0)};return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(x.mc,{children:[(0,j.jsxs)(x.Y9,{children:[(0,j.jsx)(x.hE,{children:"Invoices"}),(0,j.jsx)(x.ex,{})]}),(0,j.jsxs)(x.UC,{children:[(0,j.jsxs)(a.tU,{children:[(0,j.jsxs)(a.oz,{active:"to_pay"===Ae,onClick:()=>Be("to_pay"),children:["Invoices to Pay ",(0,j.jsx)(a.Ex,{count:Ie.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,showZero:!0})]}),(0,j.jsxs)(a.oz,{active:"paid"===Ae,onClick:()=>Be("paid"),children:["Paid Invoices ",(0,j.jsx)(a.Ex,{count:De.length,showZero:!0})]}),(0,j.jsxs)(a.oz,{active:"issued"===Ae,onClick:()=>Be("issued"),children:["Issued Invoices ",(0,j.jsx)(a.Ex,{count:t.length,showZero:!0})]})]}),"issued"===Ae&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(x.MD,{children:[(0,j.jsxs)(x.hI,{color:"#059669",children:[(0,j.jsx)(x.Os,{children:dt}),(0,j.jsx)(x.v0,{children:"Total Invoices"}),(0,j.jsx)(x.d1,{children:"All invoice records"})]}),(0,j.jsxs)(x.hI,{color:"#2563EB",children:[(0,j.jsx)(x.Os,{children:ct}),(0,j.jsx)(x.v0,{children:"Paid Invoices"}),(0,j.jsxs)(x.d1,{children:[dt>0?Math.round(ct/dt*100):0,"% completed"]})]}),(0,j.jsxs)(x.hI,{color:"#DC2626",children:[(0,j.jsx)(x.Os,{children:pt}),(0,j.jsx)(x.v0,{children:"Overdue Invoices"}),(0,j.jsx)(x.d1,{children:"Requires attention"})]}),(0,j.jsxs)(x.hI,{color:"#7C3AED",children:[(0,j.jsx)(x.Os,{children:(0,s.vv)(xt)}),(0,j.jsx)(x.v0,{children:"Total Revenue"}),(0,j.jsx)(x.d1,{children:"From paid invoices"})]})]}),(0,j.jsxs)(v,{children:[(0,j.jsxs)(f,{children:[(0,j.jsx)(h.DO,{placeholder:"Search by invoice #, company, restaurant...",value:m,onChange:e=>G(e.target.value)}),(0,j.jsxs)(h.Jt,{value:Q,onChange:e=>K(e.target.value),children:[(0,j.jsx)("option",{value:"all",children:"All Status"}),(0,j.jsx)("option",{value:"draft",children:"Draft"}),(0,j.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,j.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,j.jsx)("option",{value:"paid",children:"Paid"}),(0,j.jsx)("option",{value:"overdue",children:"Overdue"}),(0,j.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,j.jsxs)(h.Jt,{value:Z,onChange:e=>X(e.target.value),children:[(0,j.jsx)("option",{value:"all",children:"All Types"}),(0,j.jsx)("option",{value:"automatic",children:"Automatic"}),(0,j.jsx)("option",{value:"manual",children:"Manual"})]}),(0,j.jsxs)(h.Jt,{value:ee,onChange:e=>ne(e.target.value),children:[(0,j.jsx)("option",{value:"all",children:"All Months"}),st.map(e=>{const[n,t]=e.split("-"),i=["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(t)-1];return(0,j.jsxs)("option",{value:e,children:[i," ",n]},e)})]})]}),(0,j.jsx)(b,{children:(0,j.jsx)(w,{variant:"primary",onClick:()=>{at(),ie(!0)},children:"Create Invoice"})})]}),(0,j.jsxs)(x.XI,{children:[(0,j.jsxs)(q,{columns:"1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)",children:[(0,j.jsx)("span",{className:"col-invoice",children:"Invoice"}),(0,j.jsx)("span",{className:"col-customer",children:"Customer"}),(0,j.jsx)("span",{className:"col-period",children:"Period"}),(0,j.jsx)("span",{className:"col-issued",children:"Issued"}),(0,j.jsx)("span",{className:"col-due",children:"Due"}),(0,j.jsx)("span",{className:"col-status",children:"Status"}),(0,j.jsx)("span",{className:"col-amount",children:"Amount"}),(0,j.jsx)("span",{className:"col-total",children:"Total"}),(0,j.jsx)("span",{className:"col-actions",children:"Actions"})]}),lt.map(e=>(0,j.jsxs)(J,{columns:"1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)",children:[(0,j.jsxs)(x.Np,{children:[(0,j.jsxs)(x.Uj,{className:"col-invoice",children:[(0,j.jsx)(x.PM,{children:"Invoice"}),(0,j.jsxs)(C,{children:[(0,j.jsxs)(k,{children:[e.invoiceNumber,"automatic"===e.type&&(0,j.jsx)(S,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,j.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,j.jsxs)(x.Uj,{className:"col-customer",children:[(0,j.jsx)(x.PM,{children:"Customer"}),(0,j.jsxs)(C,{children:[(0,j.jsx)(k,{children:e.customerName||e.restaurantName||"Unknown"}),(0,j.jsx)(F,{children:mt(e.payerType||"restaurant")})]})]}),(0,j.jsxs)(x.Uj,{className:"col-period",children:[(0,j.jsx)(x.PM,{children:"Period"}),(0,j.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,j.jsxs)(x.Uj,{className:"col-issued",children:[(0,j.jsx)(x.PM,{children:"Issued"}),(0,j.jsx)("div",{style:{fontSize:"13px"},children:ht(e.issueDate)})]}),(0,j.jsxs)(x.Uj,{className:"col-due",children:[(0,j.jsx)(x.PM,{children:"Due"}),(0,j.jsx)("div",{style:{fontSize:"13px"},children:ht(e.dueDate)})]}),(0,j.jsxs)(x.Uj,{className:"col-status",children:[(0,j.jsx)(x.PM,{children:"Status"}),(0,j.jsx)("div",{children:(0,j.jsx)(N,{status:e.status,children:ut(e.status)})})]}),(0,j.jsxs)(x.Uj,{className:"col-amount",children:[(0,j.jsx)(x.PM,{children:"Amount"}),(0,j.jsx)(A,{children:(0,s.vv)(e.amount,e.currency||"USD")})]}),(0,j.jsxs)(x.Uj,{className:"col-total",children:[(0,j.jsx)(x.PM,{children:"Total"}),(0,j.jsx)(A,{highlight:!0,children:0===e.total?(0,j.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,s.vv)(e.total,e.currency||"USD")})]})]}),(0,j.jsxs)(x.wr,{className:"col-actions",children:[(0,j.jsx)(B,{variant:"primary",onClick:()=>gt(e),children:"View"}),"draft"===e.status&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(B,{onClick:()=>yt(e),children:"Edit"}),(0,j.jsx)(B,{onClick:()=>(e=>{on(e),pe(!0)})(e),children:"Send"})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(B,{onClick:()=>yt(e),children:"Edit"}),(0,j.jsx)(B,{onClick:()=>tt(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(B,{onClick:()=>it(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,j.jsx)(B,{variant:"email",onClick:()=>rt(e),title:"Send Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,j.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,j.jsx)(I,{onClick:()=>jt(e),title:"Delete Invoice",children:(0,j.jsx)(E,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,j.jsxs)(j.Fragment,{children:[e.hasPaymentInfo&&(0,j.jsx)(B,{variant:"primary",onClick:()=>(e=>{on(e),de(!0)})(e),children:"Confirm"}),(0,j.jsx)(B,{onClick:()=>yt(e),children:"Edit"}),(0,j.jsx)(B,{onClick:()=>tt(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(B,{onClick:()=>it(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,j.jsx)(B,{variant:"email",onClick:()=>rt(e),title:"Resend Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,j.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(B,{onClick:()=>yt(e),children:"Edit"}),(0,j.jsx)(B,{onClick:()=>tt(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(B,{onClick:()=>it(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,j.jsx)(B,{variant:"email",onClick:()=>rt(e),title:"Resend Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,j.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,j.jsx)(I,{onClick:()=>jt(e),title:"Delete Invoice",children:(0,j.jsx)(E,{children:"\xd7"})})]}),"paid"===e.status&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(B,{onClick:()=>tt(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(B,{onClick:()=>it(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,j.jsx)(B,{onClick:()=>tt(e),title:"Download Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})]},e.id)),0===lt.length&&(0,j.jsxs)(x.pp,{children:[(0,j.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,j.jsx)("div",{style:{fontSize:"14px"},children:0===t.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"to_pay"===Ae&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(x.MD,{children:[(0,j.jsxs)(x.hI,{color:"#D97706",children:[(0,j.jsx)(x.Os,{children:Ie.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length}),(0,j.jsx)(x.v0,{children:"To Pay"}),(0,j.jsx)(x.d1,{children:"Pending payment"})]}),(0,j.jsxs)(x.hI,{color:"#2563EB",children:[(0,j.jsx)(x.Os,{children:Ie.filter(e=>"payment_submitted"===e.status).length}),(0,j.jsx)(x.v0,{children:"Submitted"}),(0,j.jsx)(x.d1,{children:"Awaiting confirmation"})]}),(0,j.jsxs)(x.hI,{color:"#059669",children:[(0,j.jsx)(x.Os,{children:Ie.filter(e=>"paid"===e.status).length}),(0,j.jsx)(x.v0,{children:"Paid"}),(0,j.jsx)(x.d1,{children:"Payment confirmed"})]}),(0,j.jsxs)(x.hI,{color:"#DC2626",children:[(0,j.jsx)(x.Os,{children:(0,s.vv)(Ie.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0))}),(0,j.jsx)(x.v0,{children:"Outstanding"}),(0,j.jsx)(x.d1,{children:"Total unpaid amount"})]})]}),(0,j.jsxs)(x.XI,{children:[(0,j.jsxs)(q,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 160px)",children:[(0,j.jsx)("span",{children:"Invoice"}),(0,j.jsx)("span",{children:"Restaurant"}),(0,j.jsx)("span",{children:"Period"}),(0,j.jsx)("span",{children:"Issued"}),(0,j.jsx)("span",{children:"Due"}),(0,j.jsx)("span",{children:"Status"}),(0,j.jsx)("span",{children:"Amount"}),(0,j.jsx)("span",{children:"Total"}),(0,j.jsx)("span",{children:"Actions"})]}),Ie.length>0?Ie.map(e=>(0,j.jsxs)(J,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 160px)",children:[(0,j.jsxs)(x.Np,{children:[(0,j.jsxs)(x.Uj,{className:"col-invoice",children:[(0,j.jsx)(x.PM,{children:"Invoice"}),(0,j.jsxs)(C,{children:[(0,j.jsxs)(k,{children:[e.invoiceNumber,"automatic"===e.type&&(0,j.jsx)(S,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,j.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,j.jsxs)(x.Uj,{className:"col-customer",children:[(0,j.jsx)(x.PM,{children:"Restaurant"}),(0,j.jsx)(C,{children:(0,j.jsx)(k,{children:e.restaurantName||e.customerName||"Unknown"})})]}),(0,j.jsxs)(x.Uj,{className:"col-period",children:[(0,j.jsx)(x.PM,{children:"Period"}),(0,j.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,j.jsxs)(x.Uj,{className:"col-issued",children:[(0,j.jsx)(x.PM,{children:"Issued"}),(0,j.jsx)("div",{style:{fontSize:"13px"},children:ht(e.issueDate)})]}),(0,j.jsxs)(x.Uj,{className:"col-due",children:[(0,j.jsx)(x.PM,{children:"Due"}),(0,j.jsx)("div",{style:{fontSize:"13px"},children:ht(e.dueDate)})]}),(0,j.jsxs)(x.Uj,{className:"col-status",children:[(0,j.jsx)(x.PM,{children:"Status"}),(0,j.jsx)(N,{status:e.status,children:ut(e.status)})]}),(0,j.jsxs)(x.Uj,{className:"col-amount",children:[(0,j.jsx)(x.PM,{children:"Amount"}),(0,j.jsx)(A,{children:(0,s.vv)(e.amount,e.currency||"USD")})]}),(0,j.jsxs)(x.Uj,{className:"col-total",children:[(0,j.jsx)(x.PM,{children:"Total"}),(0,j.jsx)(A,{highlight:!0,children:0===e.total?(0,j.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,s.vv)(e.total,e.currency||"USD")})]})]}),(0,j.jsxs)(x.wr,{className:"col-actions",children:[(0,j.jsx)(B,{variant:"primary",onClick:()=>gt(e),children:"View"}),("pending_payment"===e.status||"overdue"===e.status)&&e.total>0&&(0,j.jsx)(B,{variant:"primary",onClick:()=>Un(e),children:"Pay"}),(0,j.jsx)(B,{onClick:()=>tt(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(B,{onClick:()=>it(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})]},e.id)):(0,j.jsx)(x.pp,{children:"No invoices to pay"})]})]}),"paid"===Ae&&(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(x.XI,{children:[(0,j.jsxs)(q,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 140px)",children:[(0,j.jsx)("span",{children:"Invoice"}),(0,j.jsx)("span",{children:"Restaurant"}),(0,j.jsx)("span",{children:"Period"}),(0,j.jsx)("span",{children:"Paid Date"}),(0,j.jsx)("span",{children:"Status"}),(0,j.jsx)("span",{children:"Amount"}),(0,j.jsx)("span",{children:"Total"}),(0,j.jsx)("span",{children:"Actions"})]}),De.length>0?De.sort((e,n)=>new Date(n.paidDate||n.issueDate).getTime()-new Date(e.paidDate||e.issueDate).getTime()).map(e=>(0,j.jsxs)(J,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 140px)",children:[(0,j.jsxs)(x.Np,{children:[(0,j.jsxs)(x.Uj,{className:"col-invoice",children:[(0,j.jsx)(x.PM,{children:"Invoice"}),(0,j.jsxs)(C,{children:[(0,j.jsxs)(k,{children:[e.invoiceNumber,"automatic"===e.type&&(0,j.jsx)(S,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,j.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,j.jsxs)(x.Uj,{className:"col-customer",children:[(0,j.jsx)(x.PM,{children:"Restaurant"}),(0,j.jsx)(C,{children:(0,j.jsx)(k,{children:e.restaurantName||e.customerName||"Unknown"})})]}),(0,j.jsxs)(x.Uj,{className:"col-period",children:[(0,j.jsx)(x.PM,{children:"Period"}),(0,j.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,j.jsxs)(x.Uj,{className:"col-issued",children:[(0,j.jsx)(x.PM,{children:"Paid Date"}),(0,j.jsx)("div",{style:{fontSize:"13px"},children:e.paidDate?ht(e.paidDate):ht(e.issueDate)})]}),(0,j.jsxs)(x.Uj,{className:"col-status",children:[(0,j.jsx)(x.PM,{children:"Status"}),(0,j.jsx)(N,{status:"paid",children:"Paid"})]}),(0,j.jsxs)(x.Uj,{className:"col-amount",children:[(0,j.jsx)(x.PM,{children:"Amount"}),(0,j.jsx)(A,{children:(0,s.vv)(e.amount,e.currency||"USD")})]}),(0,j.jsxs)(x.Uj,{className:"col-total",children:[(0,j.jsx)(x.PM,{children:"Total"}),(0,j.jsx)(A,{highlight:!0,children:0===e.total?(0,j.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,s.vv)(e.total,e.currency||"USD")})]})]}),(0,j.jsxs)(x.wr,{className:"col-actions",children:[(0,j.jsx)(B,{variant:"primary",onClick:()=>gt(e),children:"View"}),(0,j.jsx)(B,{onClick:()=>tt(e),title:"Download PDF",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,j.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,j.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,j.jsx)(B,{onClick:()=>it(e),title:"Print Invoice",children:(0,j.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,j.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,j.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,j.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})]},e.id)):(0,j.jsx)(x.pp,{children:"No paid invoices yet"})]})}),Te&&an&&(0,j.jsx)(D,{onClick:()=>ze(!1),children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,j.jsxs)(T,{children:[(0,j.jsx)(z,{children:"Submit Payment"}),(0,j.jsx)(M,{onClick:()=>ze(!1),children:"\xd7"})]}),(0,j.jsxs)(_,{children:[(0,j.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,j.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,j.jsx)("strong",{children:an.invoiceNumber})]}),(0,j.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,s.vv)(an.total,an.currency)})]}),He?(0,j.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"16px 0"},children:"Loading payment methods..."}):0===Ue.length?(0,j.jsxs)("div",{style:{padding:"20px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,j.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#92400E",fontSize:"15px"},children:"Payment Not Available"}),"system_admin"===an.issuerType?(0,j.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:[(0,j.jsx)("strong",{children:"System Admin"})," has not configured payment methods for ",(0,j.jsx)("strong",{children:an.currency||"MYR"})," yet. Please contact the system administrator."]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("p",{style:{margin:"0 0 12px 0",color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:["No payment methods configured for ",(0,j.jsx)("strong",{children:an.currency||"MYR"}),". Please set up your payment settings first."]}),(0,j.jsx)("button",{onClick:()=>{ze(!1),window.location.href="/pos/foodcourt/payment-settings"},style:{padding:"8px 16px",background:"#EA580C",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"13px",fontWeight:"600"},children:"Go to Payment Settings"})]})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,j.jsx)(L,{children:"Payment Method *"}),(0,j.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${Math.min(Ue.length,3)}, 1fr)`,gap:"10px",marginTop:"8px"},children:Ue.map(e=>(0,j.jsxs)("button",{onClick:()=>{_e(n=>({...n,paymentMethod:e.id})),Re(null)},style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 8px",border:"2px solid "+(Me.paymentMethod===e.id?"#635BFF":"#E5E7EB"),borderRadius:"8px",background:Me.paymentMethod===e.id?"#F5F3FF":"white",cursor:"pointer",transition:"all 0.2s"},children:[(0,j.jsx)("span",{style:{fontSize:"22px",marginBottom:"6px"},children:"stripe"===e.id?"\ud83d\udcb3":"paypal"===e.id?"\ud83c\udd7f\ufe0f":"qr_payment"===e.id?"\ud83d\udcf1":"\ud83c\udfe6"}),(0,j.jsx)("span",{style:{fontSize:"13px",fontWeight:"500",color:"#374151"},children:e.name})]},e.id))})]}),"stripe"===Me.paymentMethod&&an&&(0,j.jsx)(y.A,{invoiceId:an.id,onSuccess:()=>{ze(!1),on(null),_e({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),Ne("Payment submitted successfully! The system admin will review and confirm your payment."),Fe(!0),Wn(),Ln()},onError:()=>{}}),"bank_transfer"===Me.paymentMethod&&(()=>{const e=Ue.find(e=>"bank_transfer"===e.id);return e?(0,j.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",fontSize:"14px"},children:[(0,j.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#1E40AF"},children:"Bank Transfer Details"}),(0,j.jsxs)("p",{style:{margin:"0 0 4px 0",color:"#374151"},children:["Bank: ",(0,j.jsx)("strong",{children:e.bankName})]}),(0,j.jsxs)("p",{style:{margin:"0 0 4px 0",color:"#374151"},children:["Account: ",(0,j.jsx)("strong",{children:e.accountNumber})]}),(0,j.jsxs)("p",{style:{margin:"0",color:"#374151"},children:["Name: ",(0,j.jsx)("strong",{children:e.accountName})]})]}):null})(),"qr_payment"===Me.paymentMethod&&(()=>{const e=Ue.find(e=>"qr_payment"===e.id);return e&&e.qrImage?(0,j.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",textAlign:"center"},children:[(0,j.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#1E40AF"},children:"Scan QR Code to Pay"}),(0,j.jsx)("img",{src:e.qrImage,alt:"QR Code",style:{maxWidth:"200px",margin:"0 auto"}}),e.qrDescription&&(0,j.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:e.qrDescription})]}):null})(),Me.paymentMethod&&"stripe"!==Me.paymentMethod&&"paypal"!==Me.paymentMethod&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,j.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,j.jsxs)("span",{children:["Please provide either a ",(0,j.jsx)("strong",{children:"Transaction ID / Reference Number"})," or upload a ",(0,j.jsx)("strong",{children:"Payment Receipt Image"})," to submit your payment."]})]}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Transaction ID / Reference Number"}),(0,j.jsx)(U,{type:"text",placeholder:"Enter transaction ID or reference number",value:Me.transactionId,onChange:e=>_e(n=>({...n,transactionId:e.target.value}))})]}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Notes (Optional)"}),(0,j.jsx)(O,{placeholder:"Any additional information about the payment...",value:Me.notes,onChange:e=>_e(n=>({...n,notes:e.target.value}))})]})]})]})]}),(0,j.jsxs)($,{style:{flexDirection:"column",alignItems:"stretch"},children:[(0,j.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end"},children:[(0,j.jsx)(w,{variant:"secondary",onClick:()=>{ze(!1),Re(null)},children:"Cancel"}),"stripe"!==Me.paymentMethod&&"paypal"!==Me.paymentMethod&&(0,j.jsx)(w,{variant:"primary",onClick:async()=>{if(an){Re(null),Le(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${an.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:Me.paymentMethod,transaction_id:Me.transactionId,notes:Me.notes,receipt_url:Me.receiptImage||null})});if(n.ok)ze(!1),on(null),_e({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),Re(null),Ne("Payment submitted successfully! The system admin will review and confirm your payment."),Fe(!0),await Wn(),await Ln();else{const e=await n.json();Re(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),Re("Network error. Please check your connection and try again.")}finally{Le(!1)}}},disabled:!Me.paymentMethod||We||!Me.transactionId&&!Me.receiptImage,children:We?"Submitting...":"Submit Payment"})]}),$e&&(0,j.jsx)(c.Mo,{type:"error",style:{marginTop:"12px",wordBreak:"break-word"},children:$e})]})]})}),Ve&&(0,j.jsx)(D,{onClick:Hn,children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,j.jsxs)(T,{children:[(0,j.jsx)(z,{children:Je?"Edit Category":"Add Category"}),(0,j.jsx)(M,{onClick:Hn,children:"\xd7"})]}),(0,j.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Qe.name.trim()&&Qe.code.trim())try{Xe(!0);const e=localStorage.getItem("auth_token"),n=Je?`/api/invoices/categories/${Je.id}`:"/api/invoices/categories",t=Je?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:Qe.name.trim(),code:Qe.code.trim().toLowerCase().replace(/\s+/g,"_"),description:Qe.description.trim()||null})}),r=await i.json();r.success?(Hn(),On()):alert(r.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{Xe(!1)}},children:[(0,j.jsxs)(_,{children:[(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Name *"}),(0,j.jsx)(U,{value:Qe.name,onChange:e=>Ke({...Qe,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Code *"}),(0,j.jsx)(U,{value:Qe.code,onChange:e=>Ke({...Qe,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Je||void 0===Je?void 0:Je.is_system}),(0,j.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Description"}),(0,j.jsx)(O,{value:Qe.description,onChange:e=>Ke({...Qe,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,j.jsxs)($,{children:[(0,j.jsx)(w,{variant:"secondary",type:"button",onClick:Hn,children:"Cancel"}),(0,j.jsx)(w,{variant:"primary",type:"submit",disabled:Ze||!Qe.name||!Qe.code,children:Ze?"Saving...":Je?"Update":"Create"})]})]})]})}),(0,j.jsx)(p.A,{isOpen:en,onCancel:()=>nn(!1),onConfirm:async()=>{if(tn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${tn.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(nn(!1),rn(null),On()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===tn||void 0===tn?void 0:tn.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),te&&(0,j.jsx)(D,{onClick:e=>{e.target===e.currentTarget&&(ie(!1),at())},children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(T,{children:[(0,j.jsx)(z,{children:"Create Invoice"}),(0,j.jsx)(M,{onClick:()=>{ie(!1),at()},children:"\xd7"})]}),(0,j.jsxs)(_,{children:[(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Search Manager or Restaurant *"}),(0,j.jsxs)("div",{style:{position:"relative"},children:[(0,j.jsx)(U,{type:"text",value:kn,onChange:e=>(e=>{if(Fn(e),Nn(!0),e.length<2)return void Cn({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",yn),console.log("Available restaurants:",vn);const n=yn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=vn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),Cn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>Nn(!0),onBlur:()=>setTimeout(()=>Nn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),Sn&&(wn.managers.length>0||wn.restaurants.length>0)&&(0,j.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[wn.managers.length>0&&(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),wn.managers.map(e=>(0,j.jsxs)("div",{onClick:()=>Xn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),wn.restaurants.length>0&&(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),wn.restaurants.map(e=>{const n=yn.find(n=>n.id===e.admin_id);return(0,j.jsxs)("div",{onClick:()=>Xn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,j.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),An&&(0,j.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===An.type?An.data.fullName:An.data.name}),(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===An.type?`${An.data.companyName} \u2022 Manager`:`${An.data.address||"No address"} \u2022 Restaurant`})]}),(0,j.jsx)("button",{onClick:()=>{Bn(null),Fn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,j.jsxs)(R,{children:[(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Amount (RM) *"}),(0,j.jsx)(U,{type:"number",step:"0.01",min:"0",value:_n.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(_n.discountValue)||0,i="percentage"===_n.discountType?n*(t/100):"fixed"===_n.discountType?t:0,r=Math.max(0,n-i),a=qn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),o=r+a;$n({..._n,amount:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0.00",required:!0})]}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Due Date *"}),(0,j.jsx)(U,{type:"date",value:_n.dueDate,onChange:e=>$n({..._n,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,j.jsxs)(R,{children:[(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Discount"}),(0,j.jsxs)(H,{value:_n.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(_n.amount)||0,i="none"===n?0:parseFloat(_n.discountValue)||0,r="percentage"===n?t*(i/100):"fixed"===n?i:0,a=Math.max(0,t-r),o=qn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),s=a+o;$n({..._n,discountType:n,discountValue:"none"===n?"":_n.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,j.jsx)("option",{value:"none",children:"No Discount"}),(0,j.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,j.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==_n.discountType&&(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"percentage"===_n.discountType?"Discount (%)":"Discount Amount"}),(0,j.jsx)(U,{type:"number",step:"0.01",min:"0",max:"percentage"===_n.discountType?"100":void 0,value:_n.discountValue,onChange:e=>{const n=parseFloat(_n.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===_n.discountType?n*(t/100):t,r=Math.max(0,n-i),a=qn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),o=r+a;$n({..._n,discountValue:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==_n.discountType&&(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Discount Reason"}),(0,j.jsx)(U,{type:"text",value:_n.discountReason,onChange:e=>$n({..._n,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Invoice Category"}),(0,j.jsx)(H,{value:_n.invoiceCategory||"service",onChange:e=>$n({..._n,invoiceCategory:e.target.value}),children:Pn.length>0?Pn.filter(e=>"subscription"!==e.code).map(e=>(0,j.jsx)("option",{value:e.code,children:e.name},e.id)):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("option",{value:"service",children:"Service"}),(0,j.jsx)("option",{value:"consulting",children:"Consulting"}),(0,j.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===_n.invoiceCategory&&(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Plan/Item"}),(0,j.jsx)(O,{value:_n.customDescription||"",onChange:e=>$n({..._n,customDescription:e.target.value}),rows:3})]}),("service"===(_n.invoiceCategory||"service")||"consulting"===_n.invoiceCategory)&&(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Plan/Item"}),(0,j.jsx)(O,{value:_n.serviceDescription||"",onChange:e=>$n({..._n,serviceDescription:e.target.value}),rows:3})]}),(0,j.jsxs)(Y,{children:[(0,j.jsxs)(V,{children:[(0,j.jsx)("span",{children:"Subtotal:"}),(0,j.jsx)("span",{children:(0,s.vv)(parseFloat(_n.amount||"0"),e.currency)})]}),"none"!==_n.discountType&&parseFloat(_n.discountValue||"0")>0&&(()=>{const n=parseFloat(_n.amount||"0"),t=parseFloat(_n.discountValue||"0"),i="percentage"===_n.discountType?n*(t/100):t;return(0,j.jsxs)(V,{children:[(0,j.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===_n.discountType?` (${t}%)`:"",":"]}),(0,j.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,s.vv)(i,e.currency)]})]})})(),qn.filter(e=>e.enabled&&e.rate>0).map((n,t)=>{const i=parseFloat(_n.amount||"0"),r=parseFloat(_n.discountValue||"0"),a="percentage"===_n.discountType?i*(r/100):"fixed"===_n.discountType?r:0,o=Math.max(0,i-a)*(n.rate/100);return(0,j.jsxs)(V,{children:[(0,j.jsxs)("span",{children:[n.name," (",n.rate,"%):"]}),(0,j.jsx)("span",{children:(0,s.vv)(o,e.currency)})]},t)}),0===qn.filter(e=>e.enabled&&e.rate>0).length&&(0,j.jsxs)(V,{children:[(0,j.jsx)("span",{children:"Additional Charges:"}),(0,j.jsx)("span",{children:(0,s.vv)(0,e.currency)})]}),(0,j.jsxs)(V,{highlight:!0,children:[(0,j.jsx)("span",{children:"Total:"}),(0,j.jsx)("span",{children:(0,j.jsx)("strong",{children:(0,s.vv)(parseFloat(_n.total||"0"),e.currency)})})]})]})]}),(0,j.jsxs)($,{children:[(0,j.jsx)(w,{variant:"secondary",onClick:()=>{ie(!1),at()},children:"Cancel"}),(0,j.jsx)(w,{variant:"primary",onClick:async()=>{if(An&&_n.amount&&_n.dueDate)try{const t=parseFloat(_n.amount),i=parseFloat(_n.discountValue)||0,r="percentage"===_n.discountType?t*(i/100):"fixed"===_n.discountType?i:0,a=Math.max(0,t-r),o=qn.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(a*e.rate/100*100)/100})),s=o.reduce((e,n)=>e+n.amount,0),l=a+s,d=new Date;d.setDate(1);const c=new Date;c.setMonth(c.getMonth()+1),c.setDate(0);let p="";p="others"===_n.invoiceCategory?_n.customDescription||"":_n.serviceDescription||"";let x="",h="",u="",m="";if("restaurant"===An.type){const e=An.data;x=e.name,m=e.name,u=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),h=n.join("\n")}else if("manager"===An.type){const e=An.data;x=e.fullName,u=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),h=n.join("\n")}const g={restaurant_id:"restaurant"===An.type?An.data.id:null,manager_id:"manager"===An.type?An.data.id:null,customer_name:x,customer_address:h,company_name:u,restaurant_name:m,type:"manual",billing_period_start:d.toISOString(),billing_period_end:c.toISOString(),due_date:new Date(_n.dueDate).toISOString(),total_amount:l,subtotal_before_discount:r>0?t:null,discount_type:"none"!==_n.discountType?_n.discountType:null,discount_value:r>0?i:null,discount_amount:r>0?r:null,discount_reason:_n.discountReason||null,currency:e.currency||"MYR",status:"draft",notes:p,issued_by:(null===n||void 0===n?void 0:n.id)||1,issued_at:(new Date).toISOString(),issuer_type:"foodcourt",issuer_id:(null===n||void 0===n?void 0:n.foodcourt_id)||null,invoice_category:_n.invoiceCategory||"service",additional_charges:o},y=[{item_type:_n.invoiceCategory,description:p,calculation_method:"fixed",fixed_amount:t,calculated_amount:t,tax_rate:0,tax_amount:0,total_amount:t}],j=localStorage.getItem("auth_token"),v=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({invoice_data:g,items:y})});if(v.ok)await Rn(),ie(!1),at();else{const e=await v.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(t){console.error("Error creating invoice:",t),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!An||!_n.amount||!_n.dueDate,children:"Create Invoice"})]})]})}),re&&an&&(0,j.jsx)(D,{onClick:()=>ae(!1),children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,j.jsxs)(T,{children:[(0,j.jsx)(z,{children:"Invoice Details"}),(0,j.jsx)(M,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,j.jsxs)(_,{children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,j.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===In||void 0===In?void 0:In.companyLogo)&&(0,j.jsx)("img",{src:In.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,j.jsx)("div",{style:{fontSize:null!==In&&void 0!==In&&In.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===In||void 0===In?void 0:In.companyName)||"Company Name"}),(0,j.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===In||void 0===In?void 0:In.address)&&(0,j.jsx)("div",{children:In.address}),((null===In||void 0===In?void 0:In.city)||(null===In||void 0===In?void 0:In.state)||(null===In||void 0===In?void 0:In.postalCode))&&(0,j.jsx)("div",{children:[null===In||void 0===In?void 0:In.city,null===In||void 0===In?void 0:In.state,null===In||void 0===In?void 0:In.postalCode].filter(Boolean).join(", ")}),(null===In||void 0===In?void 0:In.country)&&(0,j.jsx)("div",{children:In.country}),(null===In||void 0===In?void 0:In.phone)&&(0,j.jsxs)("div",{children:["Tel: ",In.phone]}),(null===In||void 0===In?void 0:In.email)&&(0,j.jsxs)("div",{children:["Email: ",In.email]})]})]}),(0,j.jsxs)("div",{style:{textAlign:"right"},children:[(0,j.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,j.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:an.invoiceNumber}),(0,j.jsx)(N,{status:an.status,style:{marginTop:"8px"},children:ut(an.status)})]})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,j.jsxs)("div",{style:{flex:1},children:[(0,j.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,j.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:an.customerName}),an.customerAddress&&(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:an.customerAddress}),an.restaurantName&&(0,j.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",an.restaurantName]})]}),(0,j.jsxs)("div",{style:{textAlign:"right"},children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,j.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:an.billingPeriod||"-"})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,j.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ht(an.issueDate)})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,j.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ht(an.dueDate)})]}),an.paidDate&&(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,j.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ht(an.paidDate)})]})]})]}),(0,j.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,j.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,j.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,j.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,j.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,j.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,j.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,j.jsx)("tbody",{children:an.items.map((e,n)=>(0,j.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,j.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,j.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,j.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.unitPrice,an.currency||"MYR")}),(0,j.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.total,an.currency||"MYR")})]},n))})]})]}),(0,j.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,j.jsx)("div",{style:{width:"280px"},children:(0,j.jsxs)(Y,{children:[(0,j.jsxs)(V,{children:[(0,j.jsx)("span",{children:"Subtotal:"}),(0,j.jsx)("span",{children:(0,s.vv)(an.subtotalBeforeDiscount||an.amount,an.currency||"MYR")})]}),an.discountType&&"none"!==an.discountType&&an.discountAmount>0&&(0,j.jsxs)(V,{children:[(0,j.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===an.discountType?` (${an.discountValue}%)`:"",":"]}),(0,j.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,s.vv)(an.discountAmount,an.currency||"MYR")]})]}),(0,j.jsxs)(V,{children:[(0,j.jsx)("span",{children:"Tax (6%):"}),(0,j.jsx)("span",{children:(0,s.vv)(an.tax,an.currency||"MYR")})]}),(0,j.jsxs)(V,{highlight:!0,children:[(0,j.jsx)("span",{children:"Total:"}),(0,j.jsx)("span",{children:(0,j.jsx)("strong",{children:(0,s.vv)(an.total,an.currency||"MYR")})})]})]})})}),(null===In||void 0===In?void 0:In.bankName)&&(0,j.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,j.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,j.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("strong",{children:"Bank:"})," ",In.bankName]}),(0,j.jsxs)("div",{children:[(0,j.jsx)("strong",{children:"Account Name:"})," ",In.bankAccountName]}),(0,j.jsxs)("div",{children:[(0,j.jsx)("strong",{children:"Account Number:"})," ",In.bankAccount]})]})]}),((null===In||void 0===In?void 0:In.taxNumber)||(null===In||void 0===In?void 0:In.registrationNumber))&&(0,j.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===In||void 0===In?void 0:In.registrationNumber)&&(0,j.jsxs)("span",{children:["Reg No: ",In.registrationNumber]}),(null===In||void 0===In?void 0:In.registrationNumber)&&(null===In||void 0===In?void 0:In.taxNumber)&&(0,j.jsx)("span",{children:" | "}),(null===In||void 0===In?void 0:In.taxNumber)&&(0,j.jsxs)("span",{children:["Tax No: ",In.taxNumber]})]})]})]})}),le&&an&&(0,j.jsx)(D,{onClick:()=>de(!1),children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(T,{children:[(0,j.jsxs)(z,{children:["Confirm Payment - ",an.invoiceNumber]}),(0,j.jsx)(M,{onClick:()=>de(!1),children:"\xd7"})]}),(0,j.jsxs)(_,{children:[(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Payment Confirmation"}),(0,j.jsxs)(Y,{children:[(0,j.jsxs)(V,{children:[(0,j.jsx)("span",{children:"Manager:"}),(0,j.jsx)("span",{children:an.managerName})]}),(0,j.jsxs)(V,{children:[(0,j.jsx)("span",{children:"Company:"}),(0,j.jsx)("span",{children:an.companyName})]}),(0,j.jsxs)(V,{children:[(0,j.jsx)("span",{children:"Invoice Number:"}),(0,j.jsx)("span",{children:an.invoiceNumber})]}),(0,j.jsxs)(V,{children:[(0,j.jsx)("span",{children:"Due Date:"}),(0,j.jsx)("span",{children:ht(an.dueDate)})]}),(0,j.jsxs)(V,{highlight:!0,children:[(0,j.jsx)("span",{children:(0,j.jsx)("strong",{children:"Payment Amount:"})}),(0,j.jsx)("span",{children:(0,j.jsx)("strong",{children:(0,s.vv)(an.total,an.currency||"USD")})})]})]})]}),(an.paymentMethod||an.receiptUrl||an.transactionId)&&(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Customer's Payment Information"}),(0,j.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,j.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[an.paymentMethod&&(0,j.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,j.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===an.paymentMethod?"Bank Transfer":"qr_payment"===an.paymentMethod?"QR Payment":"stripe"===an.paymentMethod?"Stripe":"paypal"===an.paymentMethod?"PayPal":an.paymentMethod]}),an.transactionId&&(0,j.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,j.jsx)("strong",{children:"Transaction ID:"})," ",an.transactionId]})]}),an.receiptUrl&&(0,j.jsxs)("div",{style:{marginTop:"12px"},children:[(0,j.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,j.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,j.jsx)("img",{src:an.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(an.receiptUrl,"_blank")}),(0,j.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,j.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,j.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,j.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,j.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Status Change"}),(0,j.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,j.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,j.jsxs)($,{children:[(0,j.jsx)(w,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,j.jsx)(w,{variant:"primary",onClick:async()=>{if(an)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${an.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await Rn(),de(!1),on(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),oe&&an&&sn&&(0,j.jsx)(D,{onClick:()=>se(!1),children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(T,{children:[(0,j.jsxs)(z,{children:["Edit Invoice - ",an.invoiceNumber]}),(0,j.jsx)(M,{onClick:()=>se(!1),children:"\xd7"})]}),(0,j.jsxs)(_,{children:[(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Search Manager or Restaurant *"}),(0,j.jsxs)("div",{style:{position:"relative"},children:[(0,j.jsx)(U,{type:"text",value:dn,onChange:e=>(e=>{if(cn(e),un(!0),e.length<2)return void xn({managers:[],restaurants:[]});const n=yn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=vn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));xn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>un(!0),onBlur:()=>setTimeout(()=>un(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),hn&&(pn.managers.length>0||pn.restaurants.length>0)&&(0,j.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[pn.managers.length>0&&(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),pn.managers.map(e=>(0,j.jsxs)("div",{onClick:()=>Zn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),pn.restaurants.length>0&&(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),pn.restaurants.map(e=>{const n=yn.find(n=>n.id===e.admin_id);return(0,j.jsxs)("div",{onClick:()=>Zn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,j.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),mn&&(0,j.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===mn.type?mn.data.fullName:mn.data.name}),(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===mn.type?`${mn.data.companyName} \u2022 Manager`:`${mn.data.address||"No address"} \u2022 Restaurant`})]}),(0,j.jsx)("button",{onClick:()=>{gn(null),cn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,j.jsxs)(R,{children:[(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Amount (RM)"}),(0,j.jsx)(U,{type:"number",value:sn.amount,onChange:n=>{const t=parseFloat(n.target.value)||0,i=Vn(sn.currency||e.currency||"MYR").filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+t*n.rate/100,0),r=t+i;ln({...sn,amount:n.target.value,tax:i.toFixed(2),total:r.toFixed(2)})}})]}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Due Date"}),(0,j.jsx)(U,{type:"date",value:sn.dueDate,onChange:e=>ln({...sn,dueDate:e.target.value})})]})]}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Status"}),(0,j.jsxs)(H,{value:sn.status,onChange:e=>ln({...sn,status:e.target.value}),children:[(0,j.jsx)("option",{value:"draft",children:"Draft"}),(0,j.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,j.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,j.jsx)("option",{value:"paid",children:"Paid"}),(0,j.jsx)("option",{value:"overdue",children:"Overdue"}),(0,j.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Invoice Category"}),(0,j.jsx)(H,{value:sn.invoiceCategory||"service",onChange:e=>ln({...sn,invoiceCategory:e.target.value}),children:Pn.length>0?Pn.filter(e=>"subscription"!==e.code).map(e=>(0,j.jsx)("option",{value:e.code,children:e.name},e.id)):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("option",{value:"service",children:"Service"}),(0,j.jsx)("option",{value:"consulting",children:"Consulting"}),(0,j.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===sn.invoiceCategory&&(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Plan/Item"}),(0,j.jsx)(O,{value:sn.customDescription||"",onChange:e=>ln({...sn,customDescription:e.target.value}),rows:3})]}),("service"===(sn.invoiceCategory||"service")||"consulting"===sn.invoiceCategory)&&(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Plan/Item"}),(0,j.jsx)(O,{value:sn.serviceDescription||"",onChange:e=>ln({...sn,serviceDescription:e.target.value}),rows:3})]}),(0,j.jsxs)(Y,{children:[(0,j.jsxs)(V,{children:[(0,j.jsx)("span",{children:"Subtotal:"}),(0,j.jsx)("span",{children:(0,s.vv)(parseFloat(sn.amount||"0"),sn.currency||e.currency)})]}),Vn(sn.currency||e.currency||"MYR").filter(e=>e.enabled&&e.rate>0).map((n,t)=>{const i=parseFloat(sn.amount||"0")*(n.rate/100);return(0,j.jsxs)(V,{children:[(0,j.jsxs)("span",{children:[n.name," (",n.rate,"%):"]}),(0,j.jsx)("span",{children:(0,s.vv)(i,sn.currency||e.currency)})]},t)}),(0,j.jsxs)(V,{highlight:!0,children:[(0,j.jsx)("span",{children:"Total:"}),(0,j.jsx)("span",{children:(0,j.jsx)("strong",{children:(0,s.vv)(parseFloat(sn.total||"0"),sn.currency||e.currency)})})]})]})]}),(0,j.jsxs)($,{children:[(0,j.jsx)(w,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,j.jsx)(w,{variant:"primary",onClick:async()=>{if(an&&sn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${an.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(sn.amount),tax:parseFloat(sn.tax),total:parseFloat(sn.total),dueDate:sn.dueDate,status:sn.status,payerType:sn.payerType,payerId:sn.payerId,items:sn.items})});if(n.ok){const e={...an,amount:parseFloat(sn.amount),tax:parseFloat(sn.tax),total:parseFloat(sn.total),dueDate:sn.dueDate,status:sn.status,payerType:sn.payerType,payerId:sn.payerId,items:sn.items};r(t.map(n=>n.id===an.id?e:n)),se(!1),on(null),ln(null),Ne("Invoice updated successfully!"),Fe(!0)}else{const e=await n.json();Ne(`Failed to update invoice: ${e.error||"Unknown error"}`),Fe(!0)}}catch(e){console.error("Error updating invoice:",e),Ne("Error updating invoice. Please try again."),Fe(!0)}},children:"Save Changes"})]})]})}),ce&&an&&(0,j.jsx)(D,{onClick:()=>pe(!1),children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(T,{children:[(0,j.jsx)(z,{children:"Send Invoice"}),(0,j.jsx)(M,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,j.jsx)(_,{children:(0,j.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,j.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice to Manager"}),(0,j.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,j.jsx)("strong",{children:an.invoiceNumber})," to ",(0,j.jsx)("strong",{children:an.managerName}),"?"]}),(0,j.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,j.jsx)("span",{style:{fontWeight:"500"},children:an.invoiceNumber})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,j.jsx)("span",{style:{fontWeight:"500"},children:an.managerName})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,j.jsx)("span",{style:{fontWeight:"500"},children:an.companyName})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,j.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,s.vv)(an.total,an.currency||"USD")})]})]})]})}),(0,j.jsxs)($,{children:[(0,j.jsx)(w,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,j.jsx)(w,{variant:"primary",onClick:async()=>{if(an)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${an.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await Rn(),pe(!1),on(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Send Invoice"})]})]})}),xe&&an&&(0,j.jsx)(D,{onClick:()=>he(!1),children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(T,{children:[(0,j.jsx)(z,{children:"Resend Invoice"}),(0,j.jsx)(M,{onClick:()=>he(!1),children:"\xd7"})]}),(0,j.jsx)(_,{children:(0,j.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,j.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,j.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,j.jsx)("strong",{children:an.invoiceNumber})," to ",(0,j.jsx)("strong",{children:an.managerName}),"?"]}),(0,j.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,j.jsxs)($,{children:[(0,j.jsx)(w,{variant:"secondary",onClick:()=>he(!1),children:"Cancel"}),(0,j.jsx)(w,{variant:"primary",onClick:()=>{an&&(he(!1),on(null))},children:"Resend Invoice"})]})]})}),ue&&an&&(0,j.jsx)(D,{onClick:()=>me(!1),children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(T,{children:[(0,j.jsx)(z,{children:"Cancel Invoice"}),(0,j.jsx)(M,{onClick:()=>me(!1),children:"\xd7"})]}),(0,j.jsx)(_,{children:(0,j.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,j.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,j.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,j.jsx)("strong",{children:an.invoiceNumber}),"?"]}),(0,j.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,j.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,j.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,j.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,j.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,j.jsx)("span",{style:{fontWeight:"500"},children:an.invoiceNumber})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,j.jsx)("span",{style:{fontWeight:"500"},children:an.managerName})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,j.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,j.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,s.vv)(an.total,an.currency||"USD")})]})]})]})}),(0,j.jsxs)($,{children:[(0,j.jsx)(w,{variant:"secondary",onClick:()=>me(!1),children:"Keep Invoice"}),(0,j.jsx)(w,{variant:"primary",onClick:async()=>{if(an)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${an.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await Rn(),me(!1),on(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),ge&&an&&(0,j.jsx)(D,{onClick:()=>ye(!1),children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(T,{children:[(0,j.jsx)(z,{children:"Delete Invoice"}),(0,j.jsx)(M,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,j.jsx)(_,{children:(0,j.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,j.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,j.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,j.jsxs)("strong",{children:["#",an.invoiceNumber]}),"?",(0,j.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,j.jsxs)($,{children:[(0,j.jsx)(w,{variant:"secondary",onClick:()=>ye(!1),children:"Keep Invoice"}),(0,j.jsx)(w,{variant:"primary",onClick:async()=>{if(an)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${an.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await Rn(),ye(!1),on(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),je&&we&&(0,j.jsx)(D,{onClick:()=>ve(!1),children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(T,{children:[(0,j.jsx)(z,{children:"Send Invoice via Email"}),(0,j.jsx)(M,{onClick:()=>ve(!1),children:"\xd7"})]}),(0,j.jsxs)(_,{children:[(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Invoice"}),(0,j.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,j.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:we.invoiceNumber}),(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:we.customerName}),(0,j.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,s.vv)(we.total,we.currency||"MYR")})]})]}),(0,j.jsxs)(W,{children:[(0,j.jsx)(L,{children:"Recipient Email *"}),(0,j.jsx)(U,{type:"email",value:fe,onChange:e=>be(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,j.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:fe?(0,j.jsxs)(j.Fragment,{children:["Default email for ","restaurant"===we.payerType?"Restaurant":"foodcourt_manager"===we.payerType?"Foodcourt Manager":"brand_manager"===we.payerType?"Brand Manager":"Customer"]}):(0,j.jsxs)(j.Fragment,{children:["Enter the ","restaurant"===we.payerType?"restaurant":"foodcourt_manager"===we.payerType?"foodcourt manager":"brand_manager"===we.payerType?"brand manager":"customer"," email address"]})})]}),(0,j.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,j.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,j.jsxs)($,{children:[(0,j.jsx)(w,{variant:"secondary",onClick:()=>{ve(!1),Ce(null),be("")},children:"Cancel"}),(0,j.jsx)(w,{variant:"primary",onClick:async()=>{if(!we||!fe)return Ne("Please enter a valid email address."),void Fe(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${we.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:fe})});if(n.ok)Ne(`Invoice sent successfully to ${fe}`),ve(!1),Ce(null),be("");else{const e=await n.json();Ne(e.error||"Failed to send invoice email.")}Fe(!0)}catch(e){console.error("Error sending invoice email:",e),Ne("Failed to send invoice email. Please try again."),Fe(!0)}},disabled:!fe||!fe.includes("@"),children:"Send Email"})]})]})}),ke&&(0,j.jsx)(D,{onClick:()=>Fe(!1),children:(0,j.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(T,{children:[(0,j.jsx)(z,{children:"Success"}),(0,j.jsx)(M,{onClick:()=>Fe(!1),children:"\xd7"})]}),(0,j.jsx)(_,{children:(0,j.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,j.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Se})})}),(0,j.jsx)($,{children:(0,j.jsx)(w,{variant:"primary",onClick:()=>Fe(!1),children:"OK"})})]})})]})]})})}},2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var i=t(4752),r=t(4414);const a=i.Ay.div`
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