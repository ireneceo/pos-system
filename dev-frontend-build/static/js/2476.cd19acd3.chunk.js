"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2476],{2476:(e,n,t)=>{t.r(n),t.d(n,{default:()=>G});var i=t(9950),a=t(4752),r=t(4492),o=t(3310),s=t(6038),l=t(9018),d=t(4728),c=t(7617),p=t(2674),x=t(2488),h=t(5612),u=t(1052),m=t.n(u),g=t(4414);const j=a.Ay.div`
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
`,y=a.Ay.div`
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
`,v=a.Ay.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`,f=(a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`,a.Ay.button`
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
`,a.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #059669;
  }
`,(0,a.Ay)(d.SC)``),b=a.Ay.div``,w=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,k=a.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,F=(0,a.Ay)(d.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,S=a.Ay.div`
  font-weight: ${e=>e.highlight?"700":"500"};
  color: #374151;
`,N=a.Ay.button`
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
`,A=a.Ay.button`
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
`,B=a.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,I=a.Ay.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
`,D=a.Ay.button`
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
`,E=a.Ay.div`
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
`,P=a.Ay.div`
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
`,T=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,z=a.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,$=a.Ay.button`
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
`,M=a.Ay.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
`,_=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,L=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,W=a.Ay.div`
  margin-bottom: 20px;
`,R=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,U=a.Ay.input`
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
`,O=a.Ay.textarea`
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
`,H=a.Ay.select`
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
`,Y=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,J=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,V=(0,a.Ay)(p.A0)`
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
`,q=(0,a.Ay)(p.Hj)`
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
`,G=()=>{const{operationSettings:e}=(0,l.Pj)(),[n,t]=(0,r.ok)(),[a,u]=(0,i.useState)([]),[G,K]=(0,i.useState)(""),[Q,X]=(0,i.useState)("all"),[Z,ee]=(0,i.useState)("all"),[ne,te]=(0,i.useState)("all"),[ie,ae]=(0,i.useState)(!1),[re,oe]=(0,i.useState)(!1),[se,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(!1),[he,ue]=(0,i.useState)(!1),[me,ge]=(0,i.useState)(!1),[je,ye]=(0,i.useState)(!1),[ve,fe]=(0,i.useState)(!1),[be,we]=(0,i.useState)(""),[Ce,ke]=(0,i.useState)(null),[Fe,Se]=(0,i.useState)(!1),[Ne,Ae]=(0,i.useState)(""),Be=n.get("tab")||"to_pay",Ie=e=>{t({tab:e})},[De,Ee]=(0,i.useState)([]),[Pe,Te]=(0,i.useState)([]),[ze,$e]=(0,i.useState)(""),[Me,_e]=(0,i.useState)("all"),[Le,We]=(0,i.useState)(!1),[Re,Ue]=(0,i.useState)({start:"",end:""}),[Oe,He]=(0,i.useState)(!1),[Ye,Je]=(0,i.useState)({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),[Ve,qe]=(0,i.useState)(null),[Ge,Ke]=(0,i.useState)(!1),[Qe,Xe]=(0,i.useState)(!1),[Ze,en]=(0,i.useState)(null),[nn,tn]=(0,i.useState)({name:"",code:"",description:""}),[an,rn]=(0,i.useState)(!1),[on,sn]=(0,i.useState)(!1),[ln,dn]=(0,i.useState)(null),[cn,pn]=(0,i.useState)(null),[xn,hn]=(0,i.useState)(null),[un,mn]=(0,i.useState)(""),[gn,jn]=(0,i.useState)({managers:[],restaurants:[]}),[yn,vn]=(0,i.useState)(!1),[fn,bn]=(0,i.useState)(null),[wn,Cn]=(0,i.useState)([]),[kn,Fn]=(0,i.useState)([]),[,Sn]=(0,i.useState)([]),[Nn,An]=(0,i.useState)({managers:[],restaurants:[]}),[Bn,In]=(0,i.useState)(""),[Dn,En]=(0,i.useState)(!1),[Pn,Tn]=(0,i.useState)(null),[zn,$n]=(0,i.useState)(null),[Mn,_n]=(0,i.useState)({}),[Ln,Wn]=(0,i.useState)([]),[Rn,Un]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:""}),On=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void u([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),u(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),u([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),u([])}},Hn=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void Ee([]);const n=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();Ee(e)}else console.error("Failed to fetch invoices to pay"),Ee([])}catch(e){console.error("Error fetching invoices to pay:",e),Ee([])}},Yn=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void Te([]);const n=await fetch("/api/invoices/to-pay?status=paid",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();Te(e)}else Te([])}catch(e){console.error("Error fetching paid invoices:",e),Te([])}},Jn=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&Wn(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Vn=()=>{Xe(!1),en(null),tn({name:"",code:"",description:""})};(0,i.useEffect)(()=>{On(),Hn(),Yn(),Gn(),Kn(),Qn(),et(),qn(),Jn()},[]);const qn=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&_n(n.currencies)}}catch(e){console.error("Error fetching currency config:",e)}},Gn=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t,i]=await Promise.all([fetch("/api/users?role=Manager",{headers:e}),fetch("/api/users?role=Foodcourt_Manager",{headers:e}),fetch("/api/users?role=Brand_Manager",{headers:e})]);let a=[];if(n.ok){const e=(await n.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Restaurant Manager"}));a=[...a,...e]}if(t.ok){const e=(await t.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt Manager"}));a=[...a,...e]}if(i.ok){const e=(await i.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand Manager"}));a=[...a,...e]}Cn(a)}catch(e){console.error("Error fetching managers:",e),Cn([])}},Kn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||""}});Fn(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),Fn([])}catch(e){console.error("Error fetching restaurants:",e),Fn([])}},Qn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/subscriptions",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();Sn(e)}else console.warn("Subscription API not available"),Sn([])}catch(e){console.error("Error fetching subscriptions:",e),Sn([])}},Xn=(e,n)=>{if(bn({type:e,data:n}),mn("manager"===e?n.fullName:n.name),vn(!1),"manager"===e){const e=n;hn({...xn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=wn.find(n=>n.id===e.admin_id);hn({...xn,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},Zn=(e,n)=>{if(Tn({type:e,data:n}),En(!1),In("manager"===e?n.fullName:n.name),"manager"===e){const e=n;Un({...Rn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=wn.find(n=>n.id===e.admin_id);Un({...Rn,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:t?t.fullName:"",companyName:e.name})}},et=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();$n(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),$n({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),$n({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},nt=e=>{if(!zn)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${zn.companyLogo?`<img src="${zn.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${zn.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${zn.address?`${zn.address}<br>`:""}\n                    ${[zn.city,zn.state,zn.postalCode].filter(Boolean).join(", ")}${zn.city||zn.state||zn.postalCode?"<br>":""}\n                    ${zn.country?`${zn.country}<br>`:""}\n                    ${zn.phone?`Tel: ${zn.phone}<br>`:""}\n                    ${zn.email?`Email: ${zn.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${ht(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${ht(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${ht(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,s.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,s.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,s.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row tax">\n                    <span>Tax (6%):</span>\n                    <span>${(0,s.vv)(e.tax,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,s.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${zn.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${zn.bankName}<br>\n                <strong>Account Name:</strong> ${zn.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${zn.bankAccount||"-"}\n                ${zn.swiftCode?`<br><strong>SWIFT Code:</strong> ${zn.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${zn.taxNumber||zn.registrationNumber?`\n        <div class="registration-info">\n            ${zn.registrationNumber?`Reg No: ${zn.registrationNumber}`:""}\n            ${zn.registrationNumber&&zn.taxNumber?" | ":""}\n            ${zn.taxNumber?`Tax No: ${zn.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},tt=async e=>{if(!zn)return Ae("Company settings not loaded. Please try again."),void Se(!0);try{var n;const t=nt(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const a=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!a)throw document.body.removeChild(i),new Error("Could not access iframe document");a.open(),a.write(t),a.close(),await new Promise(async e=>{try{var n;null!==(n=a.fonts)&&void 0!==n&&n.ready&&await a.fonts.ready}catch{}const t=a.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const r=await m()(a.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=r.toDataURL("image/png"),s=new h.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=r.height*l/r.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),Ae("Failed to generate PDF. Please try again."),Se(!0)}},it=e=>{if(!zn)return Ae("Company settings not loaded. Please try again."),void Se(!0);const n=nt(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},at=async e=>{ke(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=kn.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=wn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=wn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}we(n),fe(!0)},rt=()=>{Un({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:""}),Tn(null),In(""),En(!1)},ot=a.map(e=>{const n=new Date(e.issueDate);return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}),st=Array.from(new Set(ot)).sort().reverse(),lt=a.filter(e=>{const n=e.companyName.toLowerCase().includes(G.toLowerCase())||e.invoiceNumber.toLowerCase().includes(G.toLowerCase())||e.managerName.toLowerCase().includes(G.toLowerCase()),t="all"===Q||e.status===Q||"pending_payment"===Q&&(""===e.status||!e.status),i="all"===Z||e.type===Z;let a=!0;if("all"!==ne){const n=new Date(e.issueDate);a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`===ne}return n&&t&&i&&a}).sort((e,n)=>{const t=new Date(e.issueDate).getTime();return new Date(n.issueDate).getTime()-t}),dt=a.length,ct=a.filter(e=>"paid"===e.status).length,pt=a.filter(e=>"overdue"===e.status).length,xt=a.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),ht=e=>new Date(e).toLocaleDateString("en-MY"),ut=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},mt=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},gt=e=>{pn(e),oe(!0)},jt=e=>{var n,t;if(pn(e),hn({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=kn.find(n=>n.id===e.restaurantId);n&&(bn({type:"restaurant",data:n}),mn(n.name))}else if(e.managerId){const n=wn.find(n=>n.id===e.managerId);n&&(bn({type:"manager",data:n}),mn(n.fullName))}le(!0)},yt=e=>{pn(e),ye(!0)};return(0,g.jsx)(o.A,{children:(0,g.jsxs)(p.mc,{children:[(0,g.jsxs)(p.Y9,{children:[(0,g.jsx)(p.hE,{children:"Invoices"}),(0,g.jsx)(p.ex,{})]}),(0,g.jsxs)(p.UC,{children:[(0,g.jsxs)(I,{children:[(0,g.jsxs)(D,{active:"to_pay"===Be,onClick:()=>Ie("to_pay"),children:["Invoices to Pay (",De.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,")"]}),(0,g.jsxs)(D,{active:"paid"===Be,onClick:()=>Ie("paid"),children:["Paid Invoices (",Pe.length,")"]}),(0,g.jsxs)(D,{active:"issued"===Be,onClick:()=>Ie("issued"),children:["Issued Invoices (",a.length,")"]})]}),"issued"===Be&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(p.MD,{children:[(0,g.jsxs)(p.hI,{color:"#059669",children:[(0,g.jsx)(p.Os,{children:dt}),(0,g.jsx)(p.v0,{children:"Total Invoices"}),(0,g.jsx)(p.d1,{children:"All invoice records"})]}),(0,g.jsxs)(p.hI,{color:"#2563EB",children:[(0,g.jsx)(p.Os,{children:ct}),(0,g.jsx)(p.v0,{children:"Paid Invoices"}),(0,g.jsxs)(p.d1,{children:[dt>0?Math.round(ct/dt*100):0,"% completed"]})]}),(0,g.jsxs)(p.hI,{color:"#DC2626",children:[(0,g.jsx)(p.Os,{children:pt}),(0,g.jsx)(p.v0,{children:"Overdue Invoices"}),(0,g.jsx)(p.d1,{children:"Requires attention"})]}),(0,g.jsxs)(p.hI,{color:"#7C3AED",children:[(0,g.jsx)(p.Os,{children:(0,s.vv)(xt)}),(0,g.jsx)(p.v0,{children:"Total Revenue"}),(0,g.jsx)(p.d1,{children:"From paid invoices"})]})]}),(0,g.jsxs)(j,{children:[(0,g.jsxs)(y,{children:[(0,g.jsx)(x.DO,{placeholder:"Search by invoice #, company, restaurant...",value:G,onChange:e=>K(e.target.value)}),(0,g.jsxs)(x.Jt,{value:Q,onChange:e=>X(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"draft",children:"Draft"}),(0,g.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,g.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,g.jsx)("option",{value:"paid",children:"Paid"}),(0,g.jsx)("option",{value:"overdue",children:"Overdue"}),(0,g.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,g.jsxs)(x.Jt,{value:Z,onChange:e=>ee(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Types"}),(0,g.jsx)("option",{value:"automatic",children:"Automatic"}),(0,g.jsx)("option",{value:"manual",children:"Manual"})]}),(0,g.jsxs)(x.Jt,{value:ne,onChange:e=>te(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Months"}),st.map(e=>{const[n,t]=e.split("-"),i=["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(t)-1];return(0,g.jsxs)("option",{value:e,children:[i," ",n]},e)})]})]}),(0,g.jsx)(v,{children:(0,g.jsx)(f,{variant:"primary",onClick:()=>{rt(),ae(!0)},children:"Create Invoice"})})]}),(0,g.jsxs)(p.XI,{children:[(0,g.jsxs)(V,{columns:"1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)",children:[(0,g.jsx)("span",{className:"col-invoice",children:"Invoice"}),(0,g.jsx)("span",{className:"col-customer",children:"Customer"}),(0,g.jsx)("span",{className:"col-period",children:"Period"}),(0,g.jsx)("span",{className:"col-issued",children:"Issued"}),(0,g.jsx)("span",{className:"col-due",children:"Due"}),(0,g.jsx)("span",{className:"col-status",children:"Status"}),(0,g.jsx)("span",{className:"col-amount",children:"Amount"}),(0,g.jsx)("span",{className:"col-total",children:"Total"}),(0,g.jsx)("span",{className:"col-actions",children:"Actions"})]}),lt.map(e=>(0,g.jsxs)(q,{columns:"1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)",children:[(0,g.jsxs)(p.Np,{children:[(0,g.jsxs)(p.Uj,{className:"col-invoice",children:[(0,g.jsx)(p.PM,{children:"Invoice"}),(0,g.jsxs)(b,{children:[(0,g.jsxs)(w,{children:[e.invoiceNumber,"automatic"===e.type&&(0,g.jsx)(k,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,g.jsx)(C,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,g.jsxs)(p.Uj,{className:"col-customer",children:[(0,g.jsx)(p.PM,{children:"Customer"}),(0,g.jsxs)(b,{children:[(0,g.jsx)(w,{children:e.customerName||e.restaurantName||"Unknown"}),(0,g.jsx)(C,{children:mt(e.payerType||"restaurant")})]})]}),(0,g.jsxs)(p.Uj,{className:"col-period",children:[(0,g.jsx)(p.PM,{children:"Period"}),(0,g.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,g.jsxs)(p.Uj,{className:"col-issued",children:[(0,g.jsx)(p.PM,{children:"Issued"}),(0,g.jsx)("div",{style:{fontSize:"13px"},children:ht(e.issueDate)})]}),(0,g.jsxs)(p.Uj,{className:"col-due",children:[(0,g.jsx)(p.PM,{children:"Due"}),(0,g.jsx)("div",{style:{fontSize:"13px"},children:ht(e.dueDate)})]}),(0,g.jsxs)(p.Uj,{className:"col-status",children:[(0,g.jsx)(p.PM,{children:"Status"}),(0,g.jsx)("div",{children:(0,g.jsx)(F,{status:e.status,children:ut(e.status)})})]}),(0,g.jsxs)(p.Uj,{className:"col-amount",children:[(0,g.jsx)(p.PM,{children:"Amount"}),(0,g.jsx)(S,{children:(0,s.vv)(e.amount,e.currency||"USD")})]}),(0,g.jsxs)(p.Uj,{className:"col-total",children:[(0,g.jsx)(p.PM,{children:"Total"}),(0,g.jsx)(S,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"USD")})]})]}),(0,g.jsxs)(p.wr,{className:"col-actions",children:[(0,g.jsx)(N,{variant:"primary",onClick:()=>gt(e),children:"View"}),"draft"===e.status&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(N,{onClick:()=>jt(e),children:"Edit"}),(0,g.jsx)(N,{onClick:()=>(e=>{pn(e),xe(!0)})(e),children:"Send"})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(N,{onClick:()=>jt(e),children:"Edit"}),(0,g.jsx)(N,{onClick:()=>tt(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(N,{onClick:()=>it(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,g.jsx)(N,{variant:"email",onClick:()=>at(e),title:"Send Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,g.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,g.jsx)(A,{onClick:()=>yt(e),title:"Delete Invoice",children:(0,g.jsx)(B,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,g.jsxs)(g.Fragment,{children:[e.hasPaymentInfo&&(0,g.jsx)(N,{variant:"primary",onClick:()=>(e=>{pn(e),ce(!0)})(e),children:"Confirm"}),(0,g.jsx)(N,{onClick:()=>jt(e),children:"Edit"}),(0,g.jsx)(N,{onClick:()=>tt(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(N,{onClick:()=>it(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,g.jsx)(N,{variant:"email",onClick:()=>at(e),title:"Resend Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,g.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(N,{onClick:()=>jt(e),children:"Edit"}),(0,g.jsx)(N,{onClick:()=>tt(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(N,{onClick:()=>it(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,g.jsx)(N,{variant:"email",onClick:()=>at(e),title:"Resend Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,g.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,g.jsx)(A,{onClick:()=>yt(e),title:"Delete Invoice",children:(0,g.jsx)(B,{children:"\xd7"})})]}),"paid"===e.status&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(N,{onClick:()=>tt(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(N,{onClick:()=>it(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,g.jsx)(N,{onClick:()=>tt(e),title:"Download Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})]},e.id)),0===lt.length&&(0,g.jsxs)(p.pp,{children:[(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,g.jsx)("div",{style:{fontSize:"14px"},children:0===a.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"to_pay"===Be&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(p.MD,{children:[(0,g.jsxs)(p.hI,{color:"#D97706",children:[(0,g.jsx)(p.Os,{children:De.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length}),(0,g.jsx)(p.v0,{children:"To Pay"}),(0,g.jsx)(p.d1,{children:"Pending payment"})]}),(0,g.jsxs)(p.hI,{color:"#2563EB",children:[(0,g.jsx)(p.Os,{children:De.filter(e=>"payment_submitted"===e.status).length}),(0,g.jsx)(p.v0,{children:"Submitted"}),(0,g.jsx)(p.d1,{children:"Awaiting confirmation"})]}),(0,g.jsxs)(p.hI,{color:"#059669",children:[(0,g.jsx)(p.Os,{children:De.filter(e=>"paid"===e.status).length}),(0,g.jsx)(p.v0,{children:"Paid"}),(0,g.jsx)(p.d1,{children:"Payment confirmed"})]}),(0,g.jsxs)(p.hI,{color:"#DC2626",children:[(0,g.jsx)(p.Os,{children:(0,s.vv)(De.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0))}),(0,g.jsx)(p.v0,{children:"Outstanding"}),(0,g.jsx)(p.d1,{children:"Total unpaid amount"})]})]}),(0,g.jsxs)(p.XI,{children:[(0,g.jsxs)(V,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 160px)",children:[(0,g.jsx)("span",{children:"Invoice"}),(0,g.jsx)("span",{children:"Restaurant"}),(0,g.jsx)("span",{children:"Period"}),(0,g.jsx)("span",{children:"Issued"}),(0,g.jsx)("span",{children:"Due"}),(0,g.jsx)("span",{children:"Status"}),(0,g.jsx)("span",{children:"Amount"}),(0,g.jsx)("span",{children:"Total"}),(0,g.jsx)("span",{children:"Actions"})]}),De.length>0?De.map(e=>(0,g.jsxs)(q,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 160px)",children:[(0,g.jsxs)(p.Np,{children:[(0,g.jsxs)(p.Uj,{className:"col-invoice",children:[(0,g.jsx)(p.PM,{children:"Invoice"}),(0,g.jsxs)(b,{children:[(0,g.jsxs)(w,{children:[e.invoiceNumber,"automatic"===e.type&&(0,g.jsx)(k,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,g.jsx)(C,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,g.jsxs)(p.Uj,{className:"col-customer",children:[(0,g.jsx)(p.PM,{children:"Restaurant"}),(0,g.jsx)(b,{children:(0,g.jsx)(w,{children:e.restaurantName||e.customerName||"Unknown"})})]}),(0,g.jsxs)(p.Uj,{className:"col-period",children:[(0,g.jsx)(p.PM,{children:"Period"}),(0,g.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,g.jsxs)(p.Uj,{className:"col-issued",children:[(0,g.jsx)(p.PM,{children:"Issued"}),(0,g.jsx)("div",{style:{fontSize:"13px"},children:ht(e.issueDate)})]}),(0,g.jsxs)(p.Uj,{className:"col-due",children:[(0,g.jsx)(p.PM,{children:"Due"}),(0,g.jsx)("div",{style:{fontSize:"13px"},children:ht(e.dueDate)})]}),(0,g.jsxs)(p.Uj,{className:"col-status",children:[(0,g.jsx)(p.PM,{children:"Status"}),(0,g.jsx)(F,{status:e.status,children:ut(e.status)})]}),(0,g.jsxs)(p.Uj,{className:"col-amount",children:[(0,g.jsx)(p.PM,{children:"Amount"}),(0,g.jsx)(S,{children:(0,s.vv)(e.amount,e.currency||"USD")})]}),(0,g.jsxs)(p.Uj,{className:"col-total",children:[(0,g.jsx)(p.PM,{children:"Total"}),(0,g.jsx)(S,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"USD")})]})]}),(0,g.jsxs)(p.wr,{className:"col-actions",children:[(0,g.jsx)(N,{variant:"primary",onClick:()=>gt(e),children:"View"}),("pending_payment"===e.status||"overdue"===e.status)&&(0,g.jsx)(N,{variant:"primary",onClick:()=>(e=>{pn(e),Je({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),qe(null),He(!0)})(e),children:"Pay"}),(0,g.jsx)(N,{onClick:()=>tt(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(N,{onClick:()=>it(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})]},e.id)):(0,g.jsx)(p.pp,{children:"No invoices to pay"})]})]}),"paid"===Be&&(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(p.XI,{children:[(0,g.jsxs)(V,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 140px)",children:[(0,g.jsx)("span",{children:"Invoice"}),(0,g.jsx)("span",{children:"Restaurant"}),(0,g.jsx)("span",{children:"Period"}),(0,g.jsx)("span",{children:"Paid Date"}),(0,g.jsx)("span",{children:"Status"}),(0,g.jsx)("span",{children:"Amount"}),(0,g.jsx)("span",{children:"Total"}),(0,g.jsx)("span",{children:"Actions"})]}),Pe.length>0?Pe.sort((e,n)=>new Date(n.paidDate||n.issueDate).getTime()-new Date(e.paidDate||e.issueDate).getTime()).map(e=>(0,g.jsxs)(q,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 140px)",children:[(0,g.jsxs)(p.Np,{children:[(0,g.jsxs)(p.Uj,{className:"col-invoice",children:[(0,g.jsx)(p.PM,{children:"Invoice"}),(0,g.jsxs)(b,{children:[(0,g.jsxs)(w,{children:[e.invoiceNumber,"automatic"===e.type&&(0,g.jsx)(k,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,g.jsx)(C,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,g.jsxs)(p.Uj,{className:"col-customer",children:[(0,g.jsx)(p.PM,{children:"Restaurant"}),(0,g.jsx)(b,{children:(0,g.jsx)(w,{children:e.restaurantName||e.customerName||"Unknown"})})]}),(0,g.jsxs)(p.Uj,{className:"col-period",children:[(0,g.jsx)(p.PM,{children:"Period"}),(0,g.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,g.jsxs)(p.Uj,{className:"col-issued",children:[(0,g.jsx)(p.PM,{children:"Paid Date"}),(0,g.jsx)("div",{style:{fontSize:"13px"},children:e.paidDate?ht(e.paidDate):ht(e.issueDate)})]}),(0,g.jsxs)(p.Uj,{className:"col-status",children:[(0,g.jsx)(p.PM,{children:"Status"}),(0,g.jsx)(F,{status:"paid",children:"Paid"})]}),(0,g.jsxs)(p.Uj,{className:"col-amount",children:[(0,g.jsx)(p.PM,{children:"Amount"}),(0,g.jsx)(S,{children:(0,s.vv)(e.amount,e.currency||"USD")})]}),(0,g.jsxs)(p.Uj,{className:"col-total",children:[(0,g.jsx)(p.PM,{children:"Total"}),(0,g.jsx)(S,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"USD")})]})]}),(0,g.jsxs)(p.wr,{className:"col-actions",children:[(0,g.jsx)(N,{variant:"primary",onClick:()=>gt(e),children:"View"}),(0,g.jsx)(N,{onClick:()=>tt(e),title:"Download PDF",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,g.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,g.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,g.jsx)(N,{onClick:()=>it(e),title:"Print Invoice",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})]},e.id)):(0,g.jsx)(p.pp,{children:"No paid invoices yet"})]})}),Oe&&cn&&(0,g.jsx)(E,{onClick:()=>He(!1),children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:"Submit Payment"}),(0,g.jsx)($,{onClick:()=>He(!1),children:"\xd7"})]}),(0,g.jsxs)(M,{children:[(0,g.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,g.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,g.jsx)("strong",{children:cn.invoiceNumber})]}),(0,g.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,s.vv)(cn.total,cn.currency)})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Payment Method *"}),(0,g.jsxs)(H,{value:Ye.paymentMethod,onChange:e=>Je(n=>({...n,paymentMethod:e.target.value})),children:[(0,g.jsx)("option",{value:"bank_transfer",children:"Bank Transfer"}),(0,g.jsx)("option",{value:"credit_card",children:"Credit Card"}),(0,g.jsx)("option",{value:"paypal",children:"PayPal"}),(0,g.jsx)("option",{value:"other",children:"Other"})]})]}),(0,g.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,g.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,g.jsxs)("span",{children:["Please provide either a ",(0,g.jsx)("strong",{children:"Transaction ID / Reference Number"})," or upload a ",(0,g.jsx)("strong",{children:"Payment Receipt Image"})," to submit your payment."]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Transaction ID / Reference Number"}),(0,g.jsx)(U,{type:"text",placeholder:"Enter transaction ID or reference number",value:Ye.transactionId,onChange:e=>Je(n=>({...n,transactionId:e.target.value}))})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Notes (Optional)"}),(0,g.jsx)(O,{placeholder:"Any additional information about the payment...",value:Ye.notes,onChange:e=>Je(n=>({...n,notes:e.target.value}))})]})]}),(0,g.jsxs)(_,{style:{flexDirection:"column",alignItems:"stretch"},children:[(0,g.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end"},children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>{He(!1),qe(null)},children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(cn){qe(null),Ke(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${cn.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:Ye.paymentMethod,transaction_id:Ye.transactionId,notes:Ye.notes,receipt_url:Ye.receiptImage||null})});if(n.ok)He(!1),pn(null),Je({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),qe(null),Ae("Payment submitted successfully! The system admin will review and confirm your payment."),Se(!0),await Hn(),await Yn();else{const e=await n.json();qe(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),qe("Network error. Please check your connection and try again.")}finally{Ke(!1)}}},disabled:!Ye.paymentMethod||Ge||!Ye.transactionId&&!Ye.receiptImage,children:Ge?"Submitting...":"Submit Payment"})]}),Ve&&(0,g.jsx)(d.Mo,{type:"error",style:{marginTop:"12px",wordBreak:"break-word"},children:Ve})]})]})}),Qe&&(0,g.jsx)(E,{onClick:Vn,children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:Ze?"Edit Category":"Add Category"}),(0,g.jsx)($,{onClick:Vn,children:"\xd7"})]}),(0,g.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),nn.name.trim()&&nn.code.trim())try{rn(!0);const e=localStorage.getItem("auth_token"),n=Ze?`/api/invoices/categories/${Ze.id}`:"/api/invoices/categories",t=Ze?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:nn.name.trim(),code:nn.code.trim().toLowerCase().replace(/\s+/g,"_"),description:nn.description.trim()||null})}),a=await i.json();a.success?(Vn(),Jn()):alert(a.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{rn(!1)}},children:[(0,g.jsxs)(M,{children:[(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Name *"}),(0,g.jsx)(U,{value:nn.name,onChange:e=>tn({...nn,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Code *"}),(0,g.jsx)(U,{value:nn.code,onChange:e=>tn({...nn,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Ze||void 0===Ze?void 0:Ze.is_system}),(0,g.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Description"}),(0,g.jsx)(O,{value:nn.description,onChange:e=>tn({...nn,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(f,{variant:"secondary",type:"button",onClick:Vn,children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",type:"submit",disabled:an||!nn.name||!nn.code,children:an?"Saving...":Ze?"Update":"Create"})]})]})]})}),(0,g.jsx)(c.A,{isOpen:on,onCancel:()=>sn(!1),onConfirm:async()=>{if(ln)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${ln.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(sn(!1),dn(null),Jn()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===ln||void 0===ln?void 0:ln.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),ie&&(0,g.jsx)(E,{onClick:e=>{e.target===e.currentTarget&&(ae(!1),rt())},children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:"Create Invoice"}),(0,g.jsx)($,{onClick:()=>{ae(!1),rt()},children:"\xd7"})]}),(0,g.jsxs)(M,{children:[(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Search Manager or Restaurant *"}),(0,g.jsxs)("div",{style:{position:"relative"},children:[(0,g.jsx)(U,{type:"text",value:Bn,onChange:e=>(e=>{if(In(e),En(!0),e.length<2)return void An({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",wn),console.log("Available restaurants:",kn);const n=wn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=kn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),An({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>En(!0),onBlur:()=>setTimeout(()=>En(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),Dn&&(Nn.managers.length>0||Nn.restaurants.length>0)&&(0,g.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[Nn.managers.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),Nn.managers.map(e=>(0,g.jsxs)("div",{onClick:()=>Zn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),Nn.restaurants.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),Nn.restaurants.map(e=>{const n=wn.find(n=>n.id===e.admin_id);return(0,g.jsxs)("div",{onClick:()=>Zn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),Pn&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Pn.type?Pn.data.fullName:Pn.data.name}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Pn.type?`${Pn.data.companyName} \u2022 Manager`:`${Pn.data.address||"No address"} \u2022 Restaurant`})]}),(0,g.jsx)("button",{onClick:()=>{Tn(null),In("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,g.jsxs)(L,{children:[(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Amount (RM) *"}),(0,g.jsx)(U,{type:"number",step:"0.01",min:"0",value:Rn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,i=n+t;Un({...Rn,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})},placeholder:"0.00",required:!0})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Due Date *"}),(0,g.jsx)(U,{type:"date",value:Rn.dueDate,onChange:e=>Un({...Rn,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Invoice Category"}),(0,g.jsx)(H,{value:Rn.invoiceCategory||"service",onChange:e=>Un({...Rn,invoiceCategory:e.target.value}),children:Ln.length>0?Ln.filter(e=>"subscription"!==e.code).map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.id)):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"service",children:"Service"}),(0,g.jsx)("option",{value:"consulting",children:"Consulting"}),(0,g.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===Rn.invoiceCategory&&(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Plan/Item"}),(0,g.jsx)(O,{value:Rn.customDescription||"",onChange:e=>Un({...Rn,customDescription:e.target.value}),rows:3})]}),("service"===(Rn.invoiceCategory||"service")||"consulting"===Rn.invoiceCategory)&&(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Plan/Item"}),(0,g.jsx)(O,{value:Rn.serviceDescription||"",onChange:e=>Un({...Rn,serviceDescription:e.target.value}),rows:3})]}),(0,g.jsxs)(Y,{children:[(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:(0,s.vv)(parseFloat(Rn.amount||"0"),e.currency)})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Tax (6%):"}),(0,g.jsx)("span",{children:(0,s.vv)(parseFloat(Rn.tax||"0"),e.currency)})]}),(0,g.jsxs)(J,{highlight:!0,children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:(0,s.vv)(parseFloat(Rn.total||"0"),e.currency)})})]})]})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>{ae(!1),rt()},children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(Pn&&Rn.amount&&Rn.dueDate)try{const e=parseFloat(Rn.amount),n=parseFloat(Rn.tax),t=parseFloat(Rn.total),i=new Date;i.setDate(1);const a=new Date;a.setMonth(a.getMonth()+1),a.setDate(0);let r="";r="others"===Rn.invoiceCategory?Rn.customDescription||"":Rn.serviceDescription||"";let o="",s="",l="",d="";if("restaurant"===Pn.type){const e=Pn.data;o=e.name,d=e.name,l=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),s=n.join("\n")}else if("manager"===Pn.type){const e=Pn.data;o=e.fullName,l=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),s=n.join("\n")}const c={restaurant_id:"restaurant"===Pn.type?Pn.data.id:null,manager_id:"manager"===Pn.type?Pn.data.id:null,customer_name:o,customer_address:s,company_name:l,restaurant_name:d,type:"manual",billing_period_start:i.toISOString(),billing_period_end:a.toISOString(),due_date:new Date(Rn.dueDate).toISOString(),total_amount:t,status:"draft",notes:r,issued_by:1,issued_at:(new Date).toISOString()},p=[{item_type:Rn.invoiceCategory,description:r,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:6,tax_amount:n,total_amount:t}],x=localStorage.getItem("auth_token"),h=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x}`},body:JSON.stringify({invoice_data:c,items:p})});if(h.ok)await On(),ae(!1),rt();else{const e=await h.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!Pn||!Rn.amount||!Rn.dueDate,children:"Create Invoice"})]})]})}),re&&cn&&(0,g.jsx)(E,{onClick:()=>oe(!1),children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:"Invoice Details"}),(0,g.jsx)($,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,g.jsxs)(M,{children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,g.jsxs)("div",{children:[null!==zn&&void 0!==zn&&zn.companyLogo?(0,g.jsx)("img",{src:zn.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}):(0,g.jsx)("div",{style:{fontSize:"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===zn||void 0===zn?void 0:zn.companyName)||"Company Name"}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===zn||void 0===zn?void 0:zn.address)&&(0,g.jsx)("div",{children:zn.address}),((null===zn||void 0===zn?void 0:zn.city)||(null===zn||void 0===zn?void 0:zn.state)||(null===zn||void 0===zn?void 0:zn.postalCode))&&(0,g.jsx)("div",{children:[null===zn||void 0===zn?void 0:zn.city,null===zn||void 0===zn?void 0:zn.state,null===zn||void 0===zn?void 0:zn.postalCode].filter(Boolean).join(", ")}),(null===zn||void 0===zn?void 0:zn.country)&&(0,g.jsx)("div",{children:zn.country}),(null===zn||void 0===zn?void 0:zn.phone)&&(0,g.jsxs)("div",{children:["Tel: ",zn.phone]}),(null===zn||void 0===zn?void 0:zn.email)&&(0,g.jsxs)("div",{children:["Email: ",zn.email]})]})]}),(0,g.jsxs)("div",{style:{textAlign:"right"},children:[(0,g.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:cn.invoiceNumber}),(0,g.jsx)(F,{status:cn.status,style:{marginTop:"8px"},children:ut(cn.status)})]})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,g.jsxs)("div",{style:{flex:1},children:[(0,g.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,g.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:cn.customerName}),cn.customerAddress&&(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:cn.customerAddress}),cn.restaurantName&&(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",cn.restaurantName]})]}),(0,g.jsxs)("div",{style:{textAlign:"right"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:cn.billingPeriod||"-"})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ht(cn.issueDate)})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ht(cn.dueDate)})]}),cn.paidDate&&(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ht(cn.paidDate)})]})]})]}),(0,g.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,g.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,g.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,g.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,g.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,g.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,g.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,g.jsx)("tbody",{children:cn.items.map((e,n)=>(0,g.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.unitPrice,cn.currency||"MYR")}),(0,g.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,s.vv)(e.total,cn.currency||"MYR")})]},n))})]})]}),(0,g.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,g.jsx)("div",{style:{width:"280px"},children:(0,g.jsxs)(Y,{children:[(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:(0,s.vv)(cn.amount,cn.currency||"MYR")})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Tax (6%):"}),(0,g.jsx)("span",{children:(0,s.vv)(cn.tax,cn.currency||"MYR")})]}),(0,g.jsxs)(J,{highlight:!0,children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:(0,s.vv)(cn.total,cn.currency||"MYR")})})]})]})})}),(null===zn||void 0===zn?void 0:zn.bankName)&&(0,g.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:"Bank:"})," ",zn.bankName]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:"Account Name:"})," ",zn.bankAccountName]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:"Account Number:"})," ",zn.bankAccount]})]})]}),((null===zn||void 0===zn?void 0:zn.taxNumber)||(null===zn||void 0===zn?void 0:zn.registrationNumber))&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===zn||void 0===zn?void 0:zn.registrationNumber)&&(0,g.jsxs)("span",{children:["Reg No: ",zn.registrationNumber]}),(null===zn||void 0===zn?void 0:zn.registrationNumber)&&(null===zn||void 0===zn?void 0:zn.taxNumber)&&(0,g.jsx)("span",{children:" | "}),(null===zn||void 0===zn?void 0:zn.taxNumber)&&(0,g.jsxs)("span",{children:["Tax No: ",zn.taxNumber]})]})]})]})}),de&&cn&&(0,g.jsx)(E,{onClick:()=>ce(!1),children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsxs)(z,{children:["Confirm Payment - ",cn.invoiceNumber]}),(0,g.jsx)($,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,g.jsxs)(M,{children:[(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Payment Confirmation"}),(0,g.jsxs)(Y,{children:[(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Manager:"}),(0,g.jsx)("span",{children:cn.managerName})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Company:"}),(0,g.jsx)("span",{children:cn.companyName})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Invoice Number:"}),(0,g.jsx)("span",{children:cn.invoiceNumber})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Due Date:"}),(0,g.jsx)("span",{children:ht(cn.dueDate)})]}),(0,g.jsxs)(J,{highlight:!0,children:[(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:"Payment Amount:"})}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:(0,s.vv)(cn.total,cn.currency||"USD")})})]})]})]}),(0,g.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,g.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,g.jsx)("strong",{children:"\u26a0\ufe0f Confirm Payment Receipt"}),(0,g.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment from the manager. This action will update the invoice status to "Paid" and cannot be easily undone.']})}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Confirmation Details"}),(0,g.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["\u2022 Payment Date: ",(new Date).toLocaleDateString("en-MY"),(0,g.jsx)("br",{}),"\u2022 Status Change: ",cn.status," \u2192 Paid",(0,g.jsx)("br",{}),"\u2022 This will update the invoice status immediately"]})]})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(cn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${cn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await On(),ce(!1),pn(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),se&&cn&&xn&&(0,g.jsx)(E,{onClick:()=>le(!1),children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsxs)(z,{children:["Edit Invoice - ",cn.invoiceNumber]}),(0,g.jsx)($,{onClick:()=>le(!1),children:"\xd7"})]}),(0,g.jsxs)(M,{children:[(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Search Manager or Restaurant *"}),(0,g.jsxs)("div",{style:{position:"relative"},children:[(0,g.jsx)(U,{type:"text",value:un,onChange:e=>(e=>{if(mn(e),vn(!0),e.length<2)return void jn({managers:[],restaurants:[]});const n=wn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=kn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));jn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>vn(!0),onBlur:()=>setTimeout(()=>vn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),yn&&(gn.managers.length>0||gn.restaurants.length>0)&&(0,g.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[gn.managers.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),gn.managers.map(e=>(0,g.jsxs)("div",{onClick:()=>Xn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),gn.restaurants.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),gn.restaurants.map(e=>{const n=wn.find(n=>n.id===e.admin_id);return(0,g.jsxs)("div",{onClick:()=>Xn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),fn&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===fn.type?fn.data.fullName:fn.data.name}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===fn.type?`${fn.data.companyName} \u2022 Manager`:`${fn.data.address||"No address"} \u2022 Restaurant`})]}),(0,g.jsx)("button",{onClick:()=>{bn(null),mn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,g.jsxs)(L,{children:[(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Amount (RM)"}),(0,g.jsx)(U,{type:"number",value:xn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,i=n+t;hn({...xn,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Due Date"}),(0,g.jsx)(U,{type:"date",value:xn.dueDate,onChange:e=>hn({...xn,dueDate:e.target.value})})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Status"}),(0,g.jsxs)(H,{value:xn.status,onChange:e=>hn({...xn,status:e.target.value}),children:[(0,g.jsx)("option",{value:"draft",children:"Draft"}),(0,g.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,g.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,g.jsx)("option",{value:"paid",children:"Paid"}),(0,g.jsx)("option",{value:"overdue",children:"Overdue"}),(0,g.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Invoice Category"}),(0,g.jsx)(H,{value:xn.invoiceCategory||"service",onChange:e=>hn({...xn,invoiceCategory:e.target.value}),children:Ln.length>0?Ln.filter(e=>"subscription"!==e.code).map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.id)):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"service",children:"Service"}),(0,g.jsx)("option",{value:"consulting",children:"Consulting"}),(0,g.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===xn.invoiceCategory&&(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Plan/Item"}),(0,g.jsx)(O,{value:xn.customDescription||"",onChange:e=>hn({...xn,customDescription:e.target.value}),rows:3})]}),("service"===(xn.invoiceCategory||"service")||"consulting"===xn.invoiceCategory)&&(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Plan/Item"}),(0,g.jsx)(O,{value:xn.serviceDescription||"",onChange:e=>hn({...xn,serviceDescription:e.target.value}),rows:3})]}),(0,g.jsxs)(Y,{children:[(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:(0,s.vv)(parseFloat(xn.amount||"0"),xn.currency||"USD")})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)("span",{children:"Tax (6%):"}),(0,g.jsx)("span",{children:(0,s.vv)(parseFloat(xn.tax||"0"),xn.currency||"USD")})]}),(0,g.jsxs)(J,{highlight:!0,children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsx)("span",{children:(0,g.jsx)("strong",{children:(0,s.vv)(parseFloat(xn.total||"0"),xn.currency||"USD")})})]})]})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(cn&&xn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${cn.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(xn.amount),tax:parseFloat(xn.tax),total:parseFloat(xn.total),dueDate:xn.dueDate,status:xn.status,payerType:xn.payerType,payerId:xn.payerId,items:xn.items})});if(n.ok){const e={...cn,amount:parseFloat(xn.amount),tax:parseFloat(xn.tax),total:parseFloat(xn.total),dueDate:xn.dueDate,status:xn.status,payerType:xn.payerType,payerId:xn.payerId,items:xn.items};u(a.map(n=>n.id===cn.id?e:n)),le(!1),pn(null),hn(null),Ae("Invoice updated successfully!"),Se(!0)}else{const e=await n.json();Ae(`Failed to update invoice: ${e.error||"Unknown error"}`),Se(!0)}}catch(e){console.error("Error updating invoice:",e),Ae("Error updating invoice. Please try again."),Se(!0)}},children:"Save Changes"})]})]})}),pe&&cn&&(0,g.jsx)(E,{onClick:()=>xe(!1),children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:"Send Invoice"}),(0,g.jsx)($,{onClick:()=>xe(!1),children:"\xd7"})]}),(0,g.jsx)(M,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice to Manager"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,g.jsx)("strong",{children:cn.invoiceNumber})," to ",(0,g.jsx)("strong",{children:cn.managerName}),"?"]}),(0,g.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:cn.invoiceNumber})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:cn.managerName})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:cn.companyName})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,g.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,s.vv)(cn.total,cn.currency||"USD")})]})]})]})}),(0,g.jsxs)(_,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>xe(!1),children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(cn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${cn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await On(),xe(!1),pn(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Send Invoice"})]})]})}),he&&cn&&(0,g.jsx)(E,{onClick:()=>ue(!1),children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:"Resend Invoice"}),(0,g.jsx)($,{onClick:()=>ue(!1),children:"\xd7"})]}),(0,g.jsx)(M,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,g.jsx)("strong",{children:cn.invoiceNumber})," to ",(0,g.jsx)("strong",{children:cn.managerName}),"?"]}),(0,g.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,g.jsxs)(_,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>ue(!1),children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:()=>{cn&&(ue(!1),pn(null))},children:"Resend Invoice"})]})]})}),me&&cn&&(0,g.jsx)(E,{onClick:()=>ge(!1),children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:"Cancel Invoice"}),(0,g.jsx)($,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,g.jsx)(M,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,g.jsx)("strong",{children:cn.invoiceNumber}),"?"]}),(0,g.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,g.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,g.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,g.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,g.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:cn.invoiceNumber})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,g.jsx)("span",{style:{fontWeight:"500"},children:cn.managerName})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,g.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,g.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,s.vv)(cn.total,cn.currency||"USD")})]})]})]})}),(0,g.jsxs)(_,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>ge(!1),children:"Keep Invoice"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(cn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${cn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await On(),ge(!1),pn(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),je&&cn&&(0,g.jsx)(E,{onClick:()=>ye(!1),children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:"Delete Invoice"}),(0,g.jsx)($,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,g.jsx)(M,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,g.jsxs)("strong",{children:["#",cn.invoiceNumber]}),"?",(0,g.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,g.jsxs)(_,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>ye(!1),children:"Keep Invoice"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(cn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${cn.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await On(),ye(!1),pn(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),ve&&Ce&&(0,g.jsx)(E,{onClick:()=>fe(!1),children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:"Send Invoice via Email"}),(0,g.jsx)($,{onClick:()=>fe(!1),children:"\xd7"})]}),(0,g.jsxs)(M,{children:[(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Invoice"}),(0,g.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Ce.invoiceNumber}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:Ce.customerName}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,s.vv)(Ce.total,Ce.currency||"MYR")})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(R,{children:"Recipient Email *"}),(0,g.jsx)(U,{type:"email",value:be,onChange:e=>we(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:be?(0,g.jsxs)(g.Fragment,{children:["Default email for ","restaurant"===Ce.payerType?"Restaurant":"foodcourt_manager"===Ce.payerType?"Foodcourt Manager":"brand_manager"===Ce.payerType?"Brand Manager":"Customer"]}):(0,g.jsxs)(g.Fragment,{children:["Enter the ","restaurant"===Ce.payerType?"restaurant":"foodcourt_manager"===Ce.payerType?"foodcourt manager":"brand_manager"===Ce.payerType?"brand manager":"customer"," email address"]})})]}),(0,g.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,g.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>{fe(!1),ke(null),we("")},children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{if(!Ce||!be)return Ae("Please enter a valid email address."),void Se(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ce.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:be})});if(n.ok)Ae(`Invoice sent successfully to ${be}`),fe(!1),ke(null),we("");else{const e=await n.json();Ae(e.error||"Failed to send invoice email.")}Se(!0)}catch(e){console.error("Error sending invoice email:",e),Ae("Failed to send invoice email. Please try again."),Se(!0)}},disabled:!be||!be.includes("@"),children:"Send Email"})]})]})}),Fe&&(0,g.jsx)(E,{onClick:()=>Se(!1),children:(0,g.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(z,{children:"Success"}),(0,g.jsx)($,{onClick:()=>Se(!1),children:"\xd7"})]}),(0,g.jsx)(M,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,g.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Ne})})}),(0,g.jsx)(_,{children:(0,g.jsx)(f,{variant:"primary",onClick:()=>Se(!1),children:"OK"})})]})})]})]})})}},2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var i=t(4752),a=t(4414);const r=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i,...o}=e;return(0,a.jsx)(r,{className:t,style:i,...o,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,a.jsx)(o,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,a.jsx)(s,{...t,children:n})}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var i=t(4752),a=t(9610),r=t(4414);const o=i.Ay.div`
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
`,x=e=>{let{isOpen:n,title:t,message:i,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return n?(0,r.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,r.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,r.jsxs)(s,{children:[(0,r.jsx)(l,{children:t}),(0,r.jsx)(d,{children:i})]}),(0,r.jsxs)(c,{children:[(0,r.jsx)(p,{variant:"secondary",onClick:h,children:m}),(0,r.jsx)(p,{variant:"primary",type:g,onClick:x,children:u})]})]})}):null}}}]);