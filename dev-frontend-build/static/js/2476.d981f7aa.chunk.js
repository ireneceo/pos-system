"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2476],{2476:(e,n,t)=>{t.r(n),t.d(n,{default:()=>J});var i=t(9950),a=t(4752),r=t(4492),o=t(6038),s=t(9018),l=t(4728),d=t(7617),c=t(2674),p=t(2488),x=t(5612),h=t(1052),u=t.n(h),m=t(4414);const g=a.Ay.div`
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
`,j=a.Ay.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`,v=(a.Ay.div`
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
`,(0,a.Ay)(l.SC)``),f=a.Ay.div``,b=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,C=a.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,k=(0,a.Ay)(l.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,F=a.Ay.div`
  font-weight: ${e=>e.highlight?"700":"500"};
  color: #374151;
`,S=a.Ay.button`
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
`,N=a.Ay.button`
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
`,A=a.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,B=a.Ay.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
`,I=a.Ay.button`
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
`,D=a.Ay.div`
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
`,E=a.Ay.div`
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
`,P=a.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,z=a.Ay.button`
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
`,$=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,_=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,R=a.Ay.div`
  margin-bottom: 20px;
`,L=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,W=a.Ay.input`
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
`,U=a.Ay.textarea`
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
`,O=a.Ay.select`
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
`,H=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,V=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,Y=(0,a.Ay)(c.A0)`
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
`,q=(0,a.Ay)(c.Hj)`
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
`,J=()=>{const{operationSettings:e}=(0,s.Pj)(),[n,t]=(0,r.ok)(),[a,h]=(0,i.useState)([]),[J,G]=(0,i.useState)(""),[Q,K]=(0,i.useState)("all"),[X,Z]=(0,i.useState)("all"),[ee,ne]=(0,i.useState)("all"),[te,ie]=(0,i.useState)(!1),[ae,re]=(0,i.useState)(!1),[oe,se]=(0,i.useState)(!1),[le,de]=(0,i.useState)(!1),[ce,pe]=(0,i.useState)(!1),[xe,he]=(0,i.useState)(!1),[ue,me]=(0,i.useState)(!1),[ge,ye]=(0,i.useState)(!1),[je,ve]=(0,i.useState)(!1),[fe,be]=(0,i.useState)(""),[we,Ce]=(0,i.useState)(null),[ke,Fe]=(0,i.useState)(!1),[Se,Ne]=(0,i.useState)(""),Ae=n.get("tab")||"to_pay",Be=e=>{t({tab:e})},[Ie,De]=(0,i.useState)([]),[Ee,Te]=(0,i.useState)([]),[Pe,ze]=(0,i.useState)(""),[Me,$e]=(0,i.useState)("all"),[_e,Re]=(0,i.useState)(!1),[Le,We]=(0,i.useState)({start:"",end:""}),[Ue,Oe]=(0,i.useState)(!1),[He,Ve]=(0,i.useState)({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),[Ye,qe]=(0,i.useState)(null),[Je,Ge]=(0,i.useState)(!1),[Qe,Ke]=(0,i.useState)([]),[Xe,Ze]=(0,i.useState)(!1),[en,nn]=(0,i.useState)(!1),[tn,an]=(0,i.useState)(null),[rn,on]=(0,i.useState)({name:"",code:"",description:""}),[sn,ln]=(0,i.useState)(!1),[dn,cn]=(0,i.useState)(!1),[pn,xn]=(0,i.useState)(null),[hn,un]=(0,i.useState)(null),[mn,gn]=(0,i.useState)(null),[yn,jn]=(0,i.useState)(""),[vn,fn]=(0,i.useState)({managers:[],restaurants:[]}),[bn,wn]=(0,i.useState)(!1),[Cn,kn]=(0,i.useState)(null),[Fn,Sn]=(0,i.useState)([]),[Nn,An]=(0,i.useState)([]),[,Bn]=(0,i.useState)([]),[In,Dn]=(0,i.useState)({managers:[],restaurants:[]}),[En,Tn]=(0,i.useState)(""),[Pn,zn]=(0,i.useState)(!1),[Mn,$n]=(0,i.useState)(null),[_n,Rn]=(0,i.useState)(null),[Ln,Wn]=(0,i.useState)({}),[Un,On]=(0,i.useState)([]),[Hn,Vn]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",discountType:"none",discountValue:"",discountReason:""}),Yn=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void h([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),h(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),h([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),h([])}},qn=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void De([]);const n=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();De(e)}else console.error("Failed to fetch invoices to pay"),De([])}catch(e){console.error("Error fetching invoices to pay:",e),De([])}},Jn=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void Te([]);const n=await fetch("/api/invoices/to-pay?status=paid",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();Te(e)}else Te([])}catch(e){console.error("Error fetching paid invoices:",e),Te([])}},Gn=async e=>{un(e),Ve({paymentMethod:"",transactionId:"",notes:"",receiptImage:""}),qe(null),await(async(e,n,t)=>{Ze(!0);try{let i=`/api/admin/payment-settings/available/${e}`;"brand"===n&&t?i=`/api/brands/${t}/payment-settings/available/${e}`:"foodcourt"===n&&t&&(i=`/api/foodcourts/${t}/payment-settings/available/${e}`);const a=await fetch(i);if(a.ok){const e=await a.json();Ke(e.methods||[]),e.methods&&e.methods.length>0&&Ve(n=>({...n,paymentMethod:e.methods[0].id}))}else Ke([])}catch(i){console.error("Error fetching payment methods:",i),Ke([])}finally{Ze(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),Oe(!0)},Qn=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&On(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Kn=()=>{nn(!1),an(null),on({name:"",code:"",description:""})};(0,i.useEffect)(()=>{Yn(),qn(),Jn(),Zn(),et(),nt(),at(),Xn(),Qn()},[]);const Xn=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&Wn(n.currencies)}}catch(e){console.error("Error fetching currency config:",e)}},Zn=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t,i]=await Promise.all([fetch("/api/users?role=Manager",{headers:e}),fetch("/api/users?role=Foodcourt_Manager",{headers:e}),fetch("/api/users?role=Brand_Manager",{headers:e})]);let a=[];if(n.ok){const e=(await n.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Restaurant Manager"}));a=[...a,...e]}if(t.ok){const e=(await t.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt Manager"}));a=[...a,...e]}if(i.ok){const e=(await i.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand Manager"}));a=[...a,...e]}Sn(a)}catch(e){console.error("Error fetching managers:",e),Sn([])}},et=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||""}});An(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),An([])}catch(e){console.error("Error fetching restaurants:",e),An([])}},nt=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/subscriptions",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();Bn(e)}else console.warn("Subscription API not available"),Bn([])}catch(e){console.error("Error fetching subscriptions:",e),Bn([])}},tt=(e,n)=>{if(kn({type:e,data:n}),jn("manager"===e?n.fullName:n.name),wn(!1),"manager"===e){const e=n;gn({...mn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=Fn.find(n=>n.id===e.admin_id);gn({...mn,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},it=(e,n)=>{if($n({type:e,data:n}),zn(!1),Tn("manager"===e?n.fullName:n.name),"manager"===e){const e=n;Vn({...Hn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=Fn.find(n=>n.id===e.admin_id);Vn({...Hn,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:t?t.fullName:"",companyName:e.name})}},at=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();Rn(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),Rn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),Rn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},rt=e=>{if(!_n)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${_n.companyLogo?`<img src="${_n.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${_n.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${_n.address?`${_n.address}<br>`:""}\n                    ${[_n.city,_n.state,_n.postalCode].filter(Boolean).join(", ")}${_n.city||_n.state||_n.postalCode?"<br>":""}\n                    ${_n.country?`${_n.country}<br>`:""}\n                    ${_n.phone?`Tel: ${_n.phone}<br>`:""}\n                    ${_n.email?`Email: ${_n.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${yt(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${yt(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${yt(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,o.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,o.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,o.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row tax">\n                    <span>Tax (6%):</span>\n                    <span>${(0,o.vv)(e.tax,e.currency||"MYR")}</span>\n                </div>\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,o.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${_n.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${_n.bankName}<br>\n                <strong>Account Name:</strong> ${_n.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${_n.bankAccount||"-"}\n                ${_n.swiftCode?`<br><strong>SWIFT Code:</strong> ${_n.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${_n.taxNumber||_n.registrationNumber?`\n        <div class="registration-info">\n            ${_n.registrationNumber?`Reg No: ${_n.registrationNumber}`:""}\n            ${_n.registrationNumber&&_n.taxNumber?" | ":""}\n            ${_n.taxNumber?`Tax No: ${_n.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},ot=async e=>{if(!_n)return Ne("Company settings not loaded. Please try again."),void Fe(!0);try{var n;const t=rt(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const a=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!a)throw document.body.removeChild(i),new Error("Could not access iframe document");a.open(),a.write(t),a.close(),await new Promise(async e=>{try{var n;null!==(n=a.fonts)&&void 0!==n&&n.ready&&await a.fonts.ready}catch{}const t=a.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const r=await u()(a.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=r.toDataURL("image/png"),s=new x.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=r.height*l/r.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),Ne("Failed to generate PDF. Please try again."),Fe(!0)}},st=e=>{if(!_n)return Ne("Company settings not loaded. Please try again."),void Fe(!0);const n=rt(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},lt=async e=>{Ce(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=Nn.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=Fn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=Fn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}be(n),ve(!0)},dt=()=>{Vn({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",discountType:"none",discountValue:"",discountReason:""}),$n(null),Tn(""),zn(!1)},ct=a.map(e=>{const n=new Date(e.issueDate);return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}),pt=Array.from(new Set(ct)).sort().reverse(),xt=a.filter(e=>{const n=e.companyName.toLowerCase().includes(J.toLowerCase())||e.invoiceNumber.toLowerCase().includes(J.toLowerCase())||e.managerName.toLowerCase().includes(J.toLowerCase()),t="all"===Q||e.status===Q||"pending_payment"===Q&&(""===e.status||!e.status),i="all"===X||e.type===X;let a=!0;if("all"!==ee){const n=new Date(e.issueDate);a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`===ee}return n&&t&&i&&a}).sort((e,n)=>{const t=new Date(e.issueDate).getTime();return new Date(n.issueDate).getTime()-t}),ht=a.length,ut=a.filter(e=>"paid"===e.status).length,mt=a.filter(e=>"overdue"===e.status).length,gt=a.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),yt=e=>new Date(e).toLocaleDateString("en-MY"),jt=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},vt=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},ft=e=>{un(e),re(!0)},bt=e=>{var n,t;if(un(e),gn({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=Nn.find(n=>n.id===e.restaurantId);n&&(kn({type:"restaurant",data:n}),jn(n.name))}else if(e.managerId){const n=Fn.find(n=>n.id===e.managerId);n&&(kn({type:"manager",data:n}),jn(n.fullName))}se(!0)},wt=e=>{un(e),ye(!0)};return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(c.mc,{children:[(0,m.jsxs)(c.Y9,{children:[(0,m.jsx)(c.hE,{children:"Invoices"}),(0,m.jsx)(c.ex,{})]}),(0,m.jsxs)(c.UC,{children:[(0,m.jsxs)(B,{children:[(0,m.jsxs)(I,{active:"to_pay"===Ae,onClick:()=>Be("to_pay"),children:["Invoices to Pay (",Ie.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,")"]}),(0,m.jsxs)(I,{active:"paid"===Ae,onClick:()=>Be("paid"),children:["Paid Invoices (",Ee.length,")"]}),(0,m.jsxs)(I,{active:"issued"===Ae,onClick:()=>Be("issued"),children:["Issued Invoices (",a.length,")"]})]}),"issued"===Ae&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(c.MD,{children:[(0,m.jsxs)(c.hI,{color:"#059669",children:[(0,m.jsx)(c.Os,{children:ht}),(0,m.jsx)(c.v0,{children:"Total Invoices"}),(0,m.jsx)(c.d1,{children:"All invoice records"})]}),(0,m.jsxs)(c.hI,{color:"#2563EB",children:[(0,m.jsx)(c.Os,{children:ut}),(0,m.jsx)(c.v0,{children:"Paid Invoices"}),(0,m.jsxs)(c.d1,{children:[ht>0?Math.round(ut/ht*100):0,"% completed"]})]}),(0,m.jsxs)(c.hI,{color:"#DC2626",children:[(0,m.jsx)(c.Os,{children:mt}),(0,m.jsx)(c.v0,{children:"Overdue Invoices"}),(0,m.jsx)(c.d1,{children:"Requires attention"})]}),(0,m.jsxs)(c.hI,{color:"#7C3AED",children:[(0,m.jsx)(c.Os,{children:(0,o.vv)(gt)}),(0,m.jsx)(c.v0,{children:"Total Revenue"}),(0,m.jsx)(c.d1,{children:"From paid invoices"})]})]}),(0,m.jsxs)(g,{children:[(0,m.jsxs)(y,{children:[(0,m.jsx)(p.DO,{placeholder:"Search by invoice #, company, restaurant...",value:J,onChange:e=>G(e.target.value)}),(0,m.jsxs)(p.Jt,{value:Q,onChange:e=>K(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Status"}),(0,m.jsx)("option",{value:"draft",children:"Draft"}),(0,m.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,m.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,m.jsx)("option",{value:"paid",children:"Paid"}),(0,m.jsx)("option",{value:"overdue",children:"Overdue"}),(0,m.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,m.jsxs)(p.Jt,{value:X,onChange:e=>Z(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Types"}),(0,m.jsx)("option",{value:"automatic",children:"Automatic"}),(0,m.jsx)("option",{value:"manual",children:"Manual"})]}),(0,m.jsxs)(p.Jt,{value:ee,onChange:e=>ne(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Months"}),pt.map(e=>{const[n,t]=e.split("-"),i=["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(t)-1];return(0,m.jsxs)("option",{value:e,children:[i," ",n]},e)})]})]}),(0,m.jsx)(j,{children:(0,m.jsx)(v,{variant:"primary",onClick:()=>{dt(),ie(!0)},children:"Create Invoice"})})]}),(0,m.jsxs)(c.XI,{children:[(0,m.jsxs)(Y,{columns:"1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)",children:[(0,m.jsx)("span",{className:"col-invoice",children:"Invoice"}),(0,m.jsx)("span",{className:"col-customer",children:"Customer"}),(0,m.jsx)("span",{className:"col-period",children:"Period"}),(0,m.jsx)("span",{className:"col-issued",children:"Issued"}),(0,m.jsx)("span",{className:"col-due",children:"Due"}),(0,m.jsx)("span",{className:"col-status",children:"Status"}),(0,m.jsx)("span",{className:"col-amount",children:"Amount"}),(0,m.jsx)("span",{className:"col-total",children:"Total"}),(0,m.jsx)("span",{className:"col-actions",children:"Actions"})]}),xt.map(e=>(0,m.jsxs)(q,{columns:"1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)",children:[(0,m.jsxs)(c.Np,{children:[(0,m.jsxs)(c.Uj,{className:"col-invoice",children:[(0,m.jsx)(c.PM,{children:"Invoice"}),(0,m.jsxs)(f,{children:[(0,m.jsxs)(b,{children:[e.invoiceNumber,"automatic"===e.type&&(0,m.jsx)(C,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,m.jsx)(w,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,m.jsxs)(c.Uj,{className:"col-customer",children:[(0,m.jsx)(c.PM,{children:"Customer"}),(0,m.jsxs)(f,{children:[(0,m.jsx)(b,{children:e.customerName||e.restaurantName||"Unknown"}),(0,m.jsx)(w,{children:vt(e.payerType||"restaurant")})]})]}),(0,m.jsxs)(c.Uj,{className:"col-period",children:[(0,m.jsx)(c.PM,{children:"Period"}),(0,m.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,m.jsxs)(c.Uj,{className:"col-issued",children:[(0,m.jsx)(c.PM,{children:"Issued"}),(0,m.jsx)("div",{style:{fontSize:"13px"},children:yt(e.issueDate)})]}),(0,m.jsxs)(c.Uj,{className:"col-due",children:[(0,m.jsx)(c.PM,{children:"Due"}),(0,m.jsx)("div",{style:{fontSize:"13px"},children:yt(e.dueDate)})]}),(0,m.jsxs)(c.Uj,{className:"col-status",children:[(0,m.jsx)(c.PM,{children:"Status"}),(0,m.jsx)("div",{children:(0,m.jsx)(k,{status:e.status,children:jt(e.status)})})]}),(0,m.jsxs)(c.Uj,{className:"col-amount",children:[(0,m.jsx)(c.PM,{children:"Amount"}),(0,m.jsx)(F,{children:(0,o.vv)(e.amount,e.currency||"USD")})]}),(0,m.jsxs)(c.Uj,{className:"col-total",children:[(0,m.jsx)(c.PM,{children:"Total"}),(0,m.jsx)(F,{highlight:!0,children:0===e.total?(0,m.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,o.vv)(e.total,e.currency||"USD")})]})]}),(0,m.jsxs)(c.wr,{className:"col-actions",children:[(0,m.jsx)(S,{variant:"primary",onClick:()=>ft(e),children:"View"}),"draft"===e.status&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(S,{onClick:()=>bt(e),children:"Edit"}),(0,m.jsx)(S,{onClick:()=>(e=>{un(e),pe(!0)})(e),children:"Send"})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(S,{onClick:()=>bt(e),children:"Edit"}),(0,m.jsx)(S,{onClick:()=>ot(e),title:"Download PDF",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,m.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,m.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,m.jsx)(S,{onClick:()=>st(e),title:"Print Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,m.jsx)(S,{variant:"email",onClick:()=>lt(e),title:"Send Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,m.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,m.jsx)(N,{onClick:()=>wt(e),title:"Delete Invoice",children:(0,m.jsx)(A,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,m.jsxs)(m.Fragment,{children:[e.hasPaymentInfo&&(0,m.jsx)(S,{variant:"primary",onClick:()=>(e=>{un(e),de(!0)})(e),children:"Confirm"}),(0,m.jsx)(S,{onClick:()=>bt(e),children:"Edit"}),(0,m.jsx)(S,{onClick:()=>ot(e),title:"Download PDF",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,m.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,m.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,m.jsx)(S,{onClick:()=>st(e),title:"Print Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,m.jsx)(S,{variant:"email",onClick:()=>lt(e),title:"Resend Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,m.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(S,{onClick:()=>bt(e),children:"Edit"}),(0,m.jsx)(S,{onClick:()=>ot(e),title:"Download PDF",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,m.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,m.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,m.jsx)(S,{onClick:()=>st(e),title:"Print Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,m.jsx)(S,{variant:"email",onClick:()=>lt(e),title:"Resend Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,m.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,m.jsx)(N,{onClick:()=>wt(e),title:"Delete Invoice",children:(0,m.jsx)(A,{children:"\xd7"})})]}),"paid"===e.status&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(S,{onClick:()=>ot(e),title:"Download PDF",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,m.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,m.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,m.jsx)(S,{onClick:()=>st(e),title:"Print Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,m.jsx)(S,{onClick:()=>ot(e),title:"Download Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,m.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,m.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})]},e.id)),0===xt.length&&(0,m.jsxs)(c.pp,{children:[(0,m.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,m.jsx)("div",{style:{fontSize:"14px"},children:0===a.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"to_pay"===Ae&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(c.MD,{children:[(0,m.jsxs)(c.hI,{color:"#D97706",children:[(0,m.jsx)(c.Os,{children:Ie.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length}),(0,m.jsx)(c.v0,{children:"To Pay"}),(0,m.jsx)(c.d1,{children:"Pending payment"})]}),(0,m.jsxs)(c.hI,{color:"#2563EB",children:[(0,m.jsx)(c.Os,{children:Ie.filter(e=>"payment_submitted"===e.status).length}),(0,m.jsx)(c.v0,{children:"Submitted"}),(0,m.jsx)(c.d1,{children:"Awaiting confirmation"})]}),(0,m.jsxs)(c.hI,{color:"#059669",children:[(0,m.jsx)(c.Os,{children:Ie.filter(e=>"paid"===e.status).length}),(0,m.jsx)(c.v0,{children:"Paid"}),(0,m.jsx)(c.d1,{children:"Payment confirmed"})]}),(0,m.jsxs)(c.hI,{color:"#DC2626",children:[(0,m.jsx)(c.Os,{children:(0,o.vv)(Ie.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0))}),(0,m.jsx)(c.v0,{children:"Outstanding"}),(0,m.jsx)(c.d1,{children:"Total unpaid amount"})]})]}),(0,m.jsxs)(c.XI,{children:[(0,m.jsxs)(Y,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 160px)",children:[(0,m.jsx)("span",{children:"Invoice"}),(0,m.jsx)("span",{children:"Restaurant"}),(0,m.jsx)("span",{children:"Period"}),(0,m.jsx)("span",{children:"Issued"}),(0,m.jsx)("span",{children:"Due"}),(0,m.jsx)("span",{children:"Status"}),(0,m.jsx)("span",{children:"Amount"}),(0,m.jsx)("span",{children:"Total"}),(0,m.jsx)("span",{children:"Actions"})]}),Ie.length>0?Ie.map(e=>(0,m.jsxs)(q,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 160px)",children:[(0,m.jsxs)(c.Np,{children:[(0,m.jsxs)(c.Uj,{className:"col-invoice",children:[(0,m.jsx)(c.PM,{children:"Invoice"}),(0,m.jsxs)(f,{children:[(0,m.jsxs)(b,{children:[e.invoiceNumber,"automatic"===e.type&&(0,m.jsx)(C,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,m.jsx)(w,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,m.jsxs)(c.Uj,{className:"col-customer",children:[(0,m.jsx)(c.PM,{children:"Restaurant"}),(0,m.jsx)(f,{children:(0,m.jsx)(b,{children:e.restaurantName||e.customerName||"Unknown"})})]}),(0,m.jsxs)(c.Uj,{className:"col-period",children:[(0,m.jsx)(c.PM,{children:"Period"}),(0,m.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,m.jsxs)(c.Uj,{className:"col-issued",children:[(0,m.jsx)(c.PM,{children:"Issued"}),(0,m.jsx)("div",{style:{fontSize:"13px"},children:yt(e.issueDate)})]}),(0,m.jsxs)(c.Uj,{className:"col-due",children:[(0,m.jsx)(c.PM,{children:"Due"}),(0,m.jsx)("div",{style:{fontSize:"13px"},children:yt(e.dueDate)})]}),(0,m.jsxs)(c.Uj,{className:"col-status",children:[(0,m.jsx)(c.PM,{children:"Status"}),(0,m.jsx)(k,{status:e.status,children:jt(e.status)})]}),(0,m.jsxs)(c.Uj,{className:"col-amount",children:[(0,m.jsx)(c.PM,{children:"Amount"}),(0,m.jsx)(F,{children:(0,o.vv)(e.amount,e.currency||"USD")})]}),(0,m.jsxs)(c.Uj,{className:"col-total",children:[(0,m.jsx)(c.PM,{children:"Total"}),(0,m.jsx)(F,{highlight:!0,children:0===e.total?(0,m.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,o.vv)(e.total,e.currency||"USD")})]})]}),(0,m.jsxs)(c.wr,{className:"col-actions",children:[(0,m.jsx)(S,{variant:"primary",onClick:()=>ft(e),children:"View"}),("pending_payment"===e.status||"overdue"===e.status)&&e.total>0&&(0,m.jsx)(S,{variant:"primary",onClick:()=>Gn(e),children:"Pay"}),(0,m.jsx)(S,{onClick:()=>ot(e),title:"Download PDF",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,m.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,m.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,m.jsx)(S,{onClick:()=>st(e),title:"Print Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})]},e.id)):(0,m.jsx)(c.pp,{children:"No invoices to pay"})]})]}),"paid"===Ae&&(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(c.XI,{children:[(0,m.jsxs)(Y,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 140px)",children:[(0,m.jsx)("span",{children:"Invoice"}),(0,m.jsx)("span",{children:"Restaurant"}),(0,m.jsx)("span",{children:"Period"}),(0,m.jsx)("span",{children:"Paid Date"}),(0,m.jsx)("span",{children:"Status"}),(0,m.jsx)("span",{children:"Amount"}),(0,m.jsx)("span",{children:"Total"}),(0,m.jsx)("span",{children:"Actions"})]}),Ee.length>0?Ee.sort((e,n)=>new Date(n.paidDate||n.issueDate).getTime()-new Date(e.paidDate||e.issueDate).getTime()).map(e=>(0,m.jsxs)(q,{columns:"1.5fr 1.2fr 1fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 140px)",children:[(0,m.jsxs)(c.Np,{children:[(0,m.jsxs)(c.Uj,{className:"col-invoice",children:[(0,m.jsx)(c.PM,{children:"Invoice"}),(0,m.jsxs)(f,{children:[(0,m.jsxs)(b,{children:[e.invoiceNumber,"automatic"===e.type&&(0,m.jsx)(C,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,m.jsx)(w,{children:e.categoryDisplayName||e.planType||"Service"})]})]}),(0,m.jsxs)(c.Uj,{className:"col-customer",children:[(0,m.jsx)(c.PM,{children:"Restaurant"}),(0,m.jsx)(f,{children:(0,m.jsx)(b,{children:e.restaurantName||e.customerName||"Unknown"})})]}),(0,m.jsxs)(c.Uj,{className:"col-period",children:[(0,m.jsx)(c.PM,{children:"Period"}),(0,m.jsx)("div",{style:{fontSize:"12px"},children:e.billingPeriod||"-"})]}),(0,m.jsxs)(c.Uj,{className:"col-issued",children:[(0,m.jsx)(c.PM,{children:"Paid Date"}),(0,m.jsx)("div",{style:{fontSize:"13px"},children:e.paidDate?yt(e.paidDate):yt(e.issueDate)})]}),(0,m.jsxs)(c.Uj,{className:"col-status",children:[(0,m.jsx)(c.PM,{children:"Status"}),(0,m.jsx)(k,{status:"paid",children:"Paid"})]}),(0,m.jsxs)(c.Uj,{className:"col-amount",children:[(0,m.jsx)(c.PM,{children:"Amount"}),(0,m.jsx)(F,{children:(0,o.vv)(e.amount,e.currency||"USD")})]}),(0,m.jsxs)(c.Uj,{className:"col-total",children:[(0,m.jsx)(c.PM,{children:"Total"}),(0,m.jsx)(F,{highlight:!0,children:0===e.total?(0,m.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,o.vv)(e.total,e.currency||"USD")})]})]}),(0,m.jsxs)(c.wr,{className:"col-actions",children:[(0,m.jsx)(S,{variant:"primary",onClick:()=>ft(e),children:"View"}),(0,m.jsx)(S,{onClick:()=>ot(e),title:"Download PDF",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,m.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,m.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,m.jsx)(S,{onClick:()=>st(e),title:"Print Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})]},e.id)):(0,m.jsx)(c.pp,{children:"No paid invoices yet"})]})}),Ue&&hn&&(0,m.jsx)(D,{onClick:()=>Oe(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Submit Payment"}),(0,m.jsx)(z,{onClick:()=>Oe(!1),children:"\xd7"})]}),(0,m.jsxs)(M,{children:[(0,m.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,m.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,m.jsx)("strong",{children:hn.invoiceNumber})]}),(0,m.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,o.vv)(hn.total,hn.currency)})]}),Xe?(0,m.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"16px 0"},children:"Loading payment methods..."}):0===Qe.length?(0,m.jsxs)("div",{style:{padding:"20px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,m.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#92400E",fontSize:"15px"},children:"Payment Not Available"}),"system_admin"===hn.issuerType?(0,m.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:[(0,m.jsx)("strong",{children:"System Admin"})," has not configured payment methods for ",(0,m.jsx)("strong",{children:hn.currency||"MYR"})," yet. Please contact the system administrator."]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("p",{style:{margin:"0 0 12px 0",color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:["No payment methods configured for ",(0,m.jsx)("strong",{children:hn.currency||"MYR"}),". Please set up your payment settings first."]}),(0,m.jsx)("button",{onClick:()=>{Oe(!1),window.location.href="/pos/foodcourt/payment-settings"},style:{padding:"8px 16px",background:"#EA580C",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"13px",fontWeight:"600"},children:"Go to Payment Settings"})]})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Payment Method *"}),(0,m.jsxs)(O,{value:He.paymentMethod,onChange:e=>Ve(n=>({...n,paymentMethod:e.target.value})),children:[(0,m.jsx)("option",{value:"",children:"Select payment method"}),Qe.map(e=>(0,m.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(()=>{const e=Qe.find(e=>e.id===He.paymentMethod);return e&&"bank_transfer"===e.id?(0,m.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",fontSize:"14px"},children:[(0,m.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#1E40AF"},children:"Bank Transfer Details"}),(0,m.jsxs)("p",{style:{margin:"0 0 4px 0",color:"#374151"},children:["Bank: ",(0,m.jsx)("strong",{children:e.bankName})]}),(0,m.jsxs)("p",{style:{margin:"0 0 4px 0",color:"#374151"},children:["Account: ",(0,m.jsx)("strong",{children:e.accountNumber})]}),(0,m.jsxs)("p",{style:{margin:"0",color:"#374151"},children:["Name: ",(0,m.jsx)("strong",{children:e.accountName})]})]}):e&&"qr_payment"===e.id&&e.qrImage?(0,m.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",textAlign:"center"},children:[(0,m.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#1E40AF"},children:"Scan QR Code to Pay"}),(0,m.jsx)("img",{src:e.qrImage,alt:"QR Code",style:{maxWidth:"200px",margin:"0 auto"}}),e.qrDescription&&(0,m.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:e.qrDescription})]}):null})(),(0,m.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,m.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,m.jsxs)("span",{children:["Please provide either a ",(0,m.jsx)("strong",{children:"Transaction ID / Reference Number"})," or upload a ",(0,m.jsx)("strong",{children:"Payment Receipt Image"})," to submit your payment."]})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Transaction ID / Reference Number"}),(0,m.jsx)(W,{type:"text",placeholder:"Enter transaction ID or reference number",value:He.transactionId,onChange:e=>Ve(n=>({...n,transactionId:e.target.value}))})]})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Notes (Optional)"}),(0,m.jsx)(U,{placeholder:"Any additional information about the payment...",value:He.notes,onChange:e=>Ve(n=>({...n,notes:e.target.value}))})]})]}),(0,m.jsxs)($,{style:{flexDirection:"column",alignItems:"stretch"},children:[(0,m.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end"},children:[(0,m.jsx)(v,{variant:"secondary",onClick:()=>{Oe(!1),qe(null)},children:"Cancel"}),(0,m.jsx)(v,{variant:"primary",onClick:async()=>{if(hn){qe(null),Ge(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${hn.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:He.paymentMethod,transaction_id:He.transactionId,notes:He.notes,receipt_url:He.receiptImage||null})});if(n.ok)Oe(!1),un(null),Ve({paymentMethod:"bank_transfer",transactionId:"",notes:"",receiptImage:""}),qe(null),Ne("Payment submitted successfully! The system admin will review and confirm your payment."),Fe(!0),await qn(),await Jn();else{const e=await n.json();qe(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),qe("Network error. Please check your connection and try again.")}finally{Ge(!1)}}},disabled:!He.paymentMethod||Je||!He.transactionId&&!He.receiptImage,children:Je?"Submitting...":"Submit Payment"})]}),Ye&&(0,m.jsx)(l.Mo,{type:"error",style:{marginTop:"12px",wordBreak:"break-word"},children:Ye})]})]})}),en&&(0,m.jsx)(D,{onClick:Kn,children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:tn?"Edit Category":"Add Category"}),(0,m.jsx)(z,{onClick:Kn,children:"\xd7"})]}),(0,m.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),rn.name.trim()&&rn.code.trim())try{ln(!0);const e=localStorage.getItem("auth_token"),n=tn?`/api/invoices/categories/${tn.id}`:"/api/invoices/categories",t=tn?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:rn.name.trim(),code:rn.code.trim().toLowerCase().replace(/\s+/g,"_"),description:rn.description.trim()||null})}),a=await i.json();a.success?(Kn(),Qn()):alert(a.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{ln(!1)}},children:[(0,m.jsxs)(M,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Name *"}),(0,m.jsx)(W,{value:rn.name,onChange:e=>on({...rn,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Code *"}),(0,m.jsx)(W,{value:rn.code,onChange:e=>on({...rn,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===tn||void 0===tn?void 0:tn.is_system}),(0,m.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Description"}),(0,m.jsx)(U,{value:rn.description,onChange:e=>on({...rn,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,m.jsxs)($,{children:[(0,m.jsx)(v,{variant:"secondary",type:"button",onClick:Kn,children:"Cancel"}),(0,m.jsx)(v,{variant:"primary",type:"submit",disabled:sn||!rn.name||!rn.code,children:sn?"Saving...":tn?"Update":"Create"})]})]})]})}),(0,m.jsx)(d.A,{isOpen:dn,onCancel:()=>cn(!1),onConfirm:async()=>{if(pn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${pn.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(cn(!1),xn(null),Qn()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===pn||void 0===pn?void 0:pn.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),te&&(0,m.jsx)(D,{onClick:e=>{e.target===e.currentTarget&&(ie(!1),dt())},children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Create Invoice"}),(0,m.jsx)(z,{onClick:()=>{ie(!1),dt()},children:"\xd7"})]}),(0,m.jsxs)(M,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Search Manager or Restaurant *"}),(0,m.jsxs)("div",{style:{position:"relative"},children:[(0,m.jsx)(W,{type:"text",value:En,onChange:e=>(e=>{if(Tn(e),zn(!0),e.length<2)return void Dn({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",Fn),console.log("Available restaurants:",Nn);const n=Fn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=Nn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),Dn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>zn(!0),onBlur:()=>setTimeout(()=>zn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),Pn&&(In.managers.length>0||In.restaurants.length>0)&&(0,m.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[In.managers.length>0&&(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),In.managers.map(e=>(0,m.jsxs)("div",{onClick:()=>it("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,m.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),In.restaurants.length>0&&(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),In.restaurants.map(e=>{const n=Fn.find(n=>n.id===e.admin_id);return(0,m.jsxs)("div",{onClick:()=>it("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,m.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,m.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),Mn&&(0,m.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Mn.type?Mn.data.fullName:Mn.data.name}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Mn.type?`${Mn.data.companyName} \u2022 Manager`:`${Mn.data.address||"No address"} \u2022 Restaurant`})]}),(0,m.jsx)("button",{onClick:()=>{$n(null),Tn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,m.jsxs)(_,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Amount (RM) *"}),(0,m.jsx)(W,{type:"number",step:"0.01",min:"0",value:Hn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(Hn.discountValue)||0,i="percentage"===Hn.discountType?n*(t/100):"fixed"===Hn.discountType?t:0,a=Math.max(0,n-i),r=.06*a,o=a+r;Vn({...Hn,amount:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})},placeholder:"0.00",required:!0})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Due Date *"}),(0,m.jsx)(W,{type:"date",value:Hn.dueDate,onChange:e=>Vn({...Hn,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,m.jsxs)(_,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Discount"}),(0,m.jsxs)(O,{value:Hn.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(Hn.amount)||0,i="none"===n?0:parseFloat(Hn.discountValue)||0,a="percentage"===n?t*(i/100):"fixed"===n?i:0,r=Math.max(0,t-a),o=.06*r,s=r+o;Vn({...Hn,discountType:n,discountValue:"none"===n?"":Hn.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,m.jsx)("option",{value:"none",children:"No Discount"}),(0,m.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,m.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Hn.discountType&&(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"percentage"===Hn.discountType?"Discount (%)":"Discount Amount"}),(0,m.jsx)(W,{type:"number",step:"0.01",min:"0",max:"percentage"===Hn.discountType?"100":void 0,value:Hn.discountValue,onChange:e=>{const n=parseFloat(Hn.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===Hn.discountType?n*(t/100):t,a=Math.max(0,n-i),r=.06*a,o=a+r;Vn({...Hn,discountValue:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Hn.discountType&&(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Discount Reason"}),(0,m.jsx)(W,{type:"text",value:Hn.discountReason,onChange:e=>Vn({...Hn,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Invoice Category"}),(0,m.jsx)(O,{value:Hn.invoiceCategory||"service",onChange:e=>Vn({...Hn,invoiceCategory:e.target.value}),children:Un.length>0?Un.filter(e=>"subscription"!==e.code).map(e=>(0,m.jsx)("option",{value:e.code,children:e.name},e.id)):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("option",{value:"service",children:"Service"}),(0,m.jsx)("option",{value:"consulting",children:"Consulting"}),(0,m.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===Hn.invoiceCategory&&(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Plan/Item"}),(0,m.jsx)(U,{value:Hn.customDescription||"",onChange:e=>Vn({...Hn,customDescription:e.target.value}),rows:3})]}),("service"===(Hn.invoiceCategory||"service")||"consulting"===Hn.invoiceCategory)&&(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Plan/Item"}),(0,m.jsx)(U,{value:Hn.serviceDescription||"",onChange:e=>Vn({...Hn,serviceDescription:e.target.value}),rows:3})]}),(0,m.jsxs)(H,{children:[(0,m.jsxs)(V,{children:[(0,m.jsx)("span",{children:"Subtotal:"}),(0,m.jsx)("span",{children:(0,o.vv)(parseFloat(Hn.amount||"0"),e.currency)})]}),"none"!==Hn.discountType&&parseFloat(Hn.discountValue||"0")>0&&(()=>{const n=parseFloat(Hn.amount||"0"),t=parseFloat(Hn.discountValue||"0"),i="percentage"===Hn.discountType?n*(t/100):t;return(0,m.jsxs)(V,{children:[(0,m.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Hn.discountType?` (${t}%)`:"",":"]}),(0,m.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,o.vv)(i,e.currency)]})]})})(),(0,m.jsxs)(V,{children:[(0,m.jsx)("span",{children:"Tax (6%):"}),(0,m.jsx)("span",{children:(0,o.vv)(parseFloat(Hn.tax||"0"),e.currency)})]}),(0,m.jsxs)(V,{highlight:!0,children:[(0,m.jsx)("span",{children:"Total:"}),(0,m.jsx)("span",{children:(0,m.jsx)("strong",{children:(0,o.vv)(parseFloat(Hn.total||"0"),e.currency)})})]})]})]}),(0,m.jsxs)($,{children:[(0,m.jsx)(v,{variant:"secondary",onClick:()=>{ie(!1),dt()},children:"Cancel"}),(0,m.jsx)(v,{variant:"primary",onClick:async()=>{if(Mn&&Hn.amount&&Hn.dueDate)try{const e=parseFloat(Hn.amount),n=parseFloat(Hn.discountValue)||0,t="percentage"===Hn.discountType?e*(n/100):"fixed"===Hn.discountType?n:0,i=Math.max(0,e-t),a=.06*i,r=i+a,o=new Date;o.setDate(1);const s=new Date;s.setMonth(s.getMonth()+1),s.setDate(0);let l="";l="others"===Hn.invoiceCategory?Hn.customDescription||"":Hn.serviceDescription||"";let d="",c="",p="",x="";if("restaurant"===Mn.type){const e=Mn.data;d=e.name,x=e.name,p=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),c=n.join("\n")}else if("manager"===Mn.type){const e=Mn.data;d=e.fullName,p=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),c=n.join("\n")}const h={restaurant_id:"restaurant"===Mn.type?Mn.data.id:null,manager_id:"manager"===Mn.type?Mn.data.id:null,customer_name:d,customer_address:c,company_name:p,restaurant_name:x,type:"manual",billing_period_start:o.toISOString(),billing_period_end:s.toISOString(),due_date:new Date(Hn.dueDate).toISOString(),total_amount:r,subtotal_before_discount:t>0?e:null,discount_type:"none"!==Hn.discountType?Hn.discountType:null,discount_value:t>0?n:null,discount_amount:t>0?t:null,discount_reason:Hn.discountReason||null,status:"draft",notes:l,issued_by:1,issued_at:(new Date).toISOString()},u=[{item_type:Hn.invoiceCategory,description:l,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:6,tax_amount:a,total_amount:r}],m=localStorage.getItem("auth_token"),g=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({invoice_data:h,items:u})});if(g.ok)await Yn(),ie(!1),dt();else{const e=await g.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!Mn||!Hn.amount||!Hn.dueDate,children:"Create Invoice"})]})]})}),ae&&hn&&(0,m.jsx)(D,{onClick:()=>re(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Invoice Details"}),(0,m.jsx)(z,{onClick:()=>re(!1),children:"\xd7"})]}),(0,m.jsxs)(M,{children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,m.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===_n||void 0===_n?void 0:_n.companyLogo)&&(0,m.jsx)("img",{src:_n.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,m.jsx)("div",{style:{fontSize:null!==_n&&void 0!==_n&&_n.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===_n||void 0===_n?void 0:_n.companyName)||"Company Name"}),(0,m.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===_n||void 0===_n?void 0:_n.address)&&(0,m.jsx)("div",{children:_n.address}),((null===_n||void 0===_n?void 0:_n.city)||(null===_n||void 0===_n?void 0:_n.state)||(null===_n||void 0===_n?void 0:_n.postalCode))&&(0,m.jsx)("div",{children:[null===_n||void 0===_n?void 0:_n.city,null===_n||void 0===_n?void 0:_n.state,null===_n||void 0===_n?void 0:_n.postalCode].filter(Boolean).join(", ")}),(null===_n||void 0===_n?void 0:_n.country)&&(0,m.jsx)("div",{children:_n.country}),(null===_n||void 0===_n?void 0:_n.phone)&&(0,m.jsxs)("div",{children:["Tel: ",_n.phone]}),(null===_n||void 0===_n?void 0:_n.email)&&(0,m.jsxs)("div",{children:["Email: ",_n.email]})]})]}),(0,m.jsxs)("div",{style:{textAlign:"right"},children:[(0,m.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:hn.invoiceNumber}),(0,m.jsx)(k,{status:hn.status,style:{marginTop:"8px"},children:jt(hn.status)})]})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,m.jsxs)("div",{style:{flex:1},children:[(0,m.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,m.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:hn.customerName}),hn.customerAddress&&(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:hn.customerAddress}),hn.restaurantName&&(0,m.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",hn.restaurantName]})]}),(0,m.jsxs)("div",{style:{textAlign:"right"},children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,m.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:hn.billingPeriod||"-"})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,m.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:yt(hn.issueDate)})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,m.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:yt(hn.dueDate)})]}),hn.paidDate&&(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,m.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:yt(hn.paidDate)})]})]})]}),(0,m.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,m.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,m.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,m.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,m.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,m.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,m.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,m.jsx)("tbody",{children:hn.items.map((e,n)=>(0,m.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,o.vv)(e.unitPrice,hn.currency||"MYR")}),(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,o.vv)(e.total,hn.currency||"MYR")})]},n))})]})]}),(0,m.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,m.jsx)("div",{style:{width:"280px"},children:(0,m.jsxs)(H,{children:[(0,m.jsxs)(V,{children:[(0,m.jsx)("span",{children:"Subtotal:"}),(0,m.jsx)("span",{children:(0,o.vv)(hn.subtotalBeforeDiscount||hn.amount,hn.currency||"MYR")})]}),hn.discountType&&"none"!==hn.discountType&&hn.discountAmount>0&&(0,m.jsxs)(V,{children:[(0,m.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===hn.discountType?` (${hn.discountValue}%)`:"",":"]}),(0,m.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,o.vv)(hn.discountAmount,hn.currency||"MYR")]})]}),(0,m.jsxs)(V,{children:[(0,m.jsx)("span",{children:"Tax (6%):"}),(0,m.jsx)("span",{children:(0,o.vv)(hn.tax,hn.currency||"MYR")})]}),(0,m.jsxs)(V,{highlight:!0,children:[(0,m.jsx)("span",{children:"Total:"}),(0,m.jsx)("span",{children:(0,m.jsx)("strong",{children:(0,o.vv)(hn.total,hn.currency||"MYR")})})]})]})})}),(null===_n||void 0===_n?void 0:_n.bankName)&&(0,m.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,m.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,m.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("strong",{children:"Bank:"})," ",_n.bankName]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("strong",{children:"Account Name:"})," ",_n.bankAccountName]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("strong",{children:"Account Number:"})," ",_n.bankAccount]})]})]}),((null===_n||void 0===_n?void 0:_n.taxNumber)||(null===_n||void 0===_n?void 0:_n.registrationNumber))&&(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===_n||void 0===_n?void 0:_n.registrationNumber)&&(0,m.jsxs)("span",{children:["Reg No: ",_n.registrationNumber]}),(null===_n||void 0===_n?void 0:_n.registrationNumber)&&(null===_n||void 0===_n?void 0:_n.taxNumber)&&(0,m.jsx)("span",{children:" | "}),(null===_n||void 0===_n?void 0:_n.taxNumber)&&(0,m.jsxs)("span",{children:["Tax No: ",_n.taxNumber]})]})]})]})}),le&&hn&&(0,m.jsx)(D,{onClick:()=>de(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(T,{children:[(0,m.jsxs)(P,{children:["Confirm Payment - ",hn.invoiceNumber]}),(0,m.jsx)(z,{onClick:()=>de(!1),children:"\xd7"})]}),(0,m.jsxs)(M,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Payment Confirmation"}),(0,m.jsxs)(H,{children:[(0,m.jsxs)(V,{children:[(0,m.jsx)("span",{children:"Manager:"}),(0,m.jsx)("span",{children:hn.managerName})]}),(0,m.jsxs)(V,{children:[(0,m.jsx)("span",{children:"Company:"}),(0,m.jsx)("span",{children:hn.companyName})]}),(0,m.jsxs)(V,{children:[(0,m.jsx)("span",{children:"Invoice Number:"}),(0,m.jsx)("span",{children:hn.invoiceNumber})]}),(0,m.jsxs)(V,{children:[(0,m.jsx)("span",{children:"Due Date:"}),(0,m.jsx)("span",{children:yt(hn.dueDate)})]}),(0,m.jsxs)(V,{highlight:!0,children:[(0,m.jsx)("span",{children:(0,m.jsx)("strong",{children:"Payment Amount:"})}),(0,m.jsx)("span",{children:(0,m.jsx)("strong",{children:(0,o.vv)(hn.total,hn.currency||"USD")})})]})]})]}),(hn.paymentMethod||hn.receiptUrl||hn.transactionId)&&(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Customer's Payment Information"}),(0,m.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,m.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[hn.paymentMethod&&(0,m.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,m.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===hn.paymentMethod?"Bank Transfer":"qr_payment"===hn.paymentMethod?"QR Payment":"stripe"===hn.paymentMethod?"Stripe":"paypal"===hn.paymentMethod?"PayPal":hn.paymentMethod]}),hn.transactionId&&(0,m.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,m.jsx)("strong",{children:"Transaction ID:"})," ",hn.transactionId]})]}),hn.receiptUrl&&(0,m.jsxs)("div",{style:{marginTop:"12px"},children:[(0,m.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,m.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,m.jsx)("img",{src:hn.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(hn.receiptUrl,"_blank")}),(0,m.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,m.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,m.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,m.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,m.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Status Change"}),(0,m.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,m.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,m.jsxs)($,{children:[(0,m.jsx)(v,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,m.jsx)(v,{variant:"primary",onClick:async()=>{if(hn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${hn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await Yn(),de(!1),un(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),oe&&hn&&mn&&(0,m.jsx)(D,{onClick:()=>se(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(T,{children:[(0,m.jsxs)(P,{children:["Edit Invoice - ",hn.invoiceNumber]}),(0,m.jsx)(z,{onClick:()=>se(!1),children:"\xd7"})]}),(0,m.jsxs)(M,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Search Manager or Restaurant *"}),(0,m.jsxs)("div",{style:{position:"relative"},children:[(0,m.jsx)(W,{type:"text",value:yn,onChange:e=>(e=>{if(jn(e),wn(!0),e.length<2)return void fn({managers:[],restaurants:[]});const n=Fn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=Nn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));fn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>wn(!0),onBlur:()=>setTimeout(()=>wn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),bn&&(vn.managers.length>0||vn.restaurants.length>0)&&(0,m.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[vn.managers.length>0&&(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),vn.managers.map(e=>(0,m.jsxs)("div",{onClick:()=>tt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,m.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),vn.restaurants.length>0&&(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),vn.restaurants.map(e=>{const n=Fn.find(n=>n.id===e.admin_id);return(0,m.jsxs)("div",{onClick:()=>tt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,m.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,m.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),Cn&&(0,m.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Cn.type?Cn.data.fullName:Cn.data.name}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Cn.type?`${Cn.data.companyName} \u2022 Manager`:`${Cn.data.address||"No address"} \u2022 Restaurant`})]}),(0,m.jsx)("button",{onClick:()=>{kn(null),jn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,m.jsxs)(_,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Amount (RM)"}),(0,m.jsx)(W,{type:"number",value:mn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,i=n+t;gn({...mn,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Due Date"}),(0,m.jsx)(W,{type:"date",value:mn.dueDate,onChange:e=>gn({...mn,dueDate:e.target.value})})]})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Status"}),(0,m.jsxs)(O,{value:mn.status,onChange:e=>gn({...mn,status:e.target.value}),children:[(0,m.jsx)("option",{value:"draft",children:"Draft"}),(0,m.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,m.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,m.jsx)("option",{value:"paid",children:"Paid"}),(0,m.jsx)("option",{value:"overdue",children:"Overdue"}),(0,m.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Invoice Category"}),(0,m.jsx)(O,{value:mn.invoiceCategory||"service",onChange:e=>gn({...mn,invoiceCategory:e.target.value}),children:Un.length>0?Un.filter(e=>"subscription"!==e.code).map(e=>(0,m.jsx)("option",{value:e.code,children:e.name},e.id)):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("option",{value:"service",children:"Service"}),(0,m.jsx)("option",{value:"consulting",children:"Consulting"}),(0,m.jsx)("option",{value:"others",children:"Others"})]})})]}),"others"===mn.invoiceCategory&&(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Plan/Item"}),(0,m.jsx)(U,{value:mn.customDescription||"",onChange:e=>gn({...mn,customDescription:e.target.value}),rows:3})]}),("service"===(mn.invoiceCategory||"service")||"consulting"===mn.invoiceCategory)&&(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Plan/Item"}),(0,m.jsx)(U,{value:mn.serviceDescription||"",onChange:e=>gn({...mn,serviceDescription:e.target.value}),rows:3})]}),(0,m.jsxs)(H,{children:[(0,m.jsxs)(V,{children:[(0,m.jsx)("span",{children:"Subtotal:"}),(0,m.jsx)("span",{children:(0,o.vv)(parseFloat(mn.amount||"0"),mn.currency||"USD")})]}),(0,m.jsxs)(V,{children:[(0,m.jsx)("span",{children:"Tax (6%):"}),(0,m.jsx)("span",{children:(0,o.vv)(parseFloat(mn.tax||"0"),mn.currency||"USD")})]}),(0,m.jsxs)(V,{highlight:!0,children:[(0,m.jsx)("span",{children:"Total:"}),(0,m.jsx)("span",{children:(0,m.jsx)("strong",{children:(0,o.vv)(parseFloat(mn.total||"0"),mn.currency||"USD")})})]})]})]}),(0,m.jsxs)($,{children:[(0,m.jsx)(v,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,m.jsx)(v,{variant:"primary",onClick:async()=>{if(hn&&mn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${hn.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(mn.amount),tax:parseFloat(mn.tax),total:parseFloat(mn.total),dueDate:mn.dueDate,status:mn.status,payerType:mn.payerType,payerId:mn.payerId,items:mn.items})});if(n.ok){const e={...hn,amount:parseFloat(mn.amount),tax:parseFloat(mn.tax),total:parseFloat(mn.total),dueDate:mn.dueDate,status:mn.status,payerType:mn.payerType,payerId:mn.payerId,items:mn.items};h(a.map(n=>n.id===hn.id?e:n)),se(!1),un(null),gn(null),Ne("Invoice updated successfully!"),Fe(!0)}else{const e=await n.json();Ne(`Failed to update invoice: ${e.error||"Unknown error"}`),Fe(!0)}}catch(e){console.error("Error updating invoice:",e),Ne("Error updating invoice. Please try again."),Fe(!0)}},children:"Save Changes"})]})]})}),ce&&hn&&(0,m.jsx)(D,{onClick:()=>pe(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Send Invoice"}),(0,m.jsx)(z,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,m.jsx)(M,{children:(0,m.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,m.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice to Manager"}),(0,m.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,m.jsx)("strong",{children:hn.invoiceNumber})," to ",(0,m.jsx)("strong",{children:hn.managerName}),"?"]}),(0,m.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,m.jsx)("span",{style:{fontWeight:"500"},children:hn.invoiceNumber})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,m.jsx)("span",{style:{fontWeight:"500"},children:hn.managerName})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,m.jsx)("span",{style:{fontWeight:"500"},children:hn.companyName})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,m.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,o.vv)(hn.total,hn.currency||"USD")})]})]})]})}),(0,m.jsxs)($,{children:[(0,m.jsx)(v,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,m.jsx)(v,{variant:"primary",onClick:async()=>{if(hn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${hn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await Yn(),pe(!1),un(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Send Invoice"})]})]})}),xe&&hn&&(0,m.jsx)(D,{onClick:()=>he(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Resend Invoice"}),(0,m.jsx)(z,{onClick:()=>he(!1),children:"\xd7"})]}),(0,m.jsx)(M,{children:(0,m.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,m.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,m.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,m.jsx)("strong",{children:hn.invoiceNumber})," to ",(0,m.jsx)("strong",{children:hn.managerName}),"?"]}),(0,m.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,m.jsxs)($,{children:[(0,m.jsx)(v,{variant:"secondary",onClick:()=>he(!1),children:"Cancel"}),(0,m.jsx)(v,{variant:"primary",onClick:()=>{hn&&(he(!1),un(null))},children:"Resend Invoice"})]})]})}),ue&&hn&&(0,m.jsx)(D,{onClick:()=>me(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Cancel Invoice"}),(0,m.jsx)(z,{onClick:()=>me(!1),children:"\xd7"})]}),(0,m.jsx)(M,{children:(0,m.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,m.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,m.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,m.jsx)("strong",{children:hn.invoiceNumber}),"?"]}),(0,m.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,m.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,m.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,m.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,m.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,m.jsx)("span",{style:{fontWeight:"500"},children:hn.invoiceNumber})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,m.jsx)("span",{style:{fontWeight:"500"},children:hn.managerName})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,m.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,o.vv)(hn.total,hn.currency||"USD")})]})]})]})}),(0,m.jsxs)($,{children:[(0,m.jsx)(v,{variant:"secondary",onClick:()=>me(!1),children:"Keep Invoice"}),(0,m.jsx)(v,{variant:"primary",onClick:async()=>{if(hn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${hn.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await Yn(),me(!1),un(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),ge&&hn&&(0,m.jsx)(D,{onClick:()=>ye(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Delete Invoice"}),(0,m.jsx)(z,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,m.jsx)(M,{children:(0,m.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,m.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,m.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,m.jsxs)("strong",{children:["#",hn.invoiceNumber]}),"?",(0,m.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,m.jsxs)($,{children:[(0,m.jsx)(v,{variant:"secondary",onClick:()=>ye(!1),children:"Keep Invoice"}),(0,m.jsx)(v,{variant:"primary",onClick:async()=>{if(hn)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${hn.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await Yn(),ye(!1),un(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),je&&we&&(0,m.jsx)(D,{onClick:()=>ve(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Send Invoice via Email"}),(0,m.jsx)(z,{onClick:()=>ve(!1),children:"\xd7"})]}),(0,m.jsxs)(M,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Invoice"}),(0,m.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,m.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:we.invoiceNumber}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:we.customerName}),(0,m.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,o.vv)(we.total,we.currency||"MYR")})]})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(L,{children:"Recipient Email *"}),(0,m.jsx)(W,{type:"email",value:fe,onChange:e=>be(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:fe?(0,m.jsxs)(m.Fragment,{children:["Default email for ","restaurant"===we.payerType?"Restaurant":"foodcourt_manager"===we.payerType?"Foodcourt Manager":"brand_manager"===we.payerType?"Brand Manager":"Customer"]}):(0,m.jsxs)(m.Fragment,{children:["Enter the ","restaurant"===we.payerType?"restaurant":"foodcourt_manager"===we.payerType?"foodcourt manager":"brand_manager"===we.payerType?"brand manager":"customer"," email address"]})})]}),(0,m.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,m.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,m.jsxs)($,{children:[(0,m.jsx)(v,{variant:"secondary",onClick:()=>{ve(!1),Ce(null),be("")},children:"Cancel"}),(0,m.jsx)(v,{variant:"primary",onClick:async()=>{if(!we||!fe)return Ne("Please enter a valid email address."),void Fe(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${we.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:fe})});if(n.ok)Ne(`Invoice sent successfully to ${fe}`),ve(!1),Ce(null),be("");else{const e=await n.json();Ne(e.error||"Failed to send invoice email.")}Fe(!0)}catch(e){console.error("Error sending invoice email:",e),Ne("Failed to send invoice email. Please try again."),Fe(!0)}},disabled:!fe||!fe.includes("@"),children:"Send Email"})]})]})}),ke&&(0,m.jsx)(D,{onClick:()=>Fe(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Success"}),(0,m.jsx)(z,{onClick:()=>Fe(!1),children:"\xd7"})]}),(0,m.jsx)(M,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,m.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Se})})}),(0,m.jsx)($,{children:(0,m.jsx)(v,{variant:"primary",onClick:()=>Fe(!1),children:"OK"})})]})})]})]})})}},2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var i=t(4752),a=t(4414);const r=i.Ay.div`
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