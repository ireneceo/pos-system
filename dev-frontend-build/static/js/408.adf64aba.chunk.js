"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[408],{408:(e,t,a)=>{a.r(t),a.d(t,{default:()=>re});var n=a(9950),r=a(4752),i=a(2853),s=a(5781),l=a(447),o=a(9018),d=a(6038),c=a(8285),p=a(8406),x=a(2597),h=a(2653),u=a(4414);const m=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,g=r.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,v=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,f=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`,y=r.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};
  
  &:hover {
    background: ${e=>"primary"===e.variant?"#5A51E6":"#F6F9FC"};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,b=r.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,j=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,w=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=r.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,S=r.Ay.select`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,A=r.Ay.input`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,k=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,C=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,$=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,D=r.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,B=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,E=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,T=r.Ay.div`
  display: grid;
  grid-template-columns: 1.5fr 1.2fr 1fr 1fr 1fr 0.8fr 0.5fr 0.5fr;
  gap: 16px;
  padding: 16px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  span {
    text-align: center;
    
    &:first-child {
      text-align: left;
    }
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1.5fr 1fr 0.8fr 1fr 0.8fr 0.6fr 0.3fr 0.3fr;
    gap: 12px;
    padding: 14px 16px;
    font-size: 11px;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 0.6fr 0.5fr;
    
    span:nth-child(7),
    span:nth-child(8) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`,M=r.Ay.div`
  display: grid;
  grid-template-columns: 1.5fr 1.2fr 1fr 1fr 1fr 0.8fr 0.5fr 0.5fr;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #F6F9FC;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
  
  > div, > span {
    text-align: center;
    
    &:first-child {
      text-align: left;
    }
  }
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1.5fr 1fr 0.8fr 1fr 0.8fr 0.6fr 0.3fr 0.3fr;
    gap: 12px;
    padding: 14px 16px;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 0.6fr 0.5fr;
    
    > div:nth-child(7),
    > div:nth-child(8) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`,z=r.Ay.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    background: white;
    border: 1px solid #E6EBF1;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }
`,I=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,R=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,O=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,P=r.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,V=r.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"member"===e.type?"#ECFDF5":"#F3F4F6"};
  color: ${e=>"member"===e.type?"#059669":"#6B7280"};
`,N=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,Y=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.method){case"cash":return"#FEF3C7";case"card":return"#DBEAFE";case"digital_wallet":return"#ECFDF5";case"points":return"#EDE9FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.method){case"cash":return"#D97706";case"card":return"#1E40AF";case"digital_wallet":return"#059669";case"points":return"#5B21B6";default:return"#6B7280"}}};
`,L=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"completed":return"#E5E7EB";case"refunded":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#374151";case"refunded":return"#DC2626";default:return"#6B7280"}}};
`,_=r.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`,U=r.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,W=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,G=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.positive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.positive?"#059669":"#DC2626"};
`,q=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,Z=r.Ay.span`
  font-size: 14px;
  color: ${e=>e.clickable?"#635BFF":"#6B7280"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  font-weight: 500;
  
  &:hover {
    ${e=>e.clickable&&"\n      color: #5A51E6;\n      text-decoration: underline;\n    "}
  }
`,H=r.Ay.span`
  color: #9CA3AF;
  font-size: 14px;
`,K=r.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 16px;
  
  &:hover {
    background: #F1F5F9;
    color: #0A2540;
    border-color: #CBD5E1;
  }
`,Q=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
  margin-top: 20px;
`,X=r.Ay.div`
  padding: 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
`,J=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,ee=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
`,te=r.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 20px;
`,ae=r.Ay.button`
  padding: 8px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  background: ${e=>e.disabled?"#F8FAFC":"white"};
  color: ${e=>e.disabled?"#9CA3AF":"#374151"};
  font-size: 14px;
  font-weight: 500;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #F8FAFC;
    border-color: #635BFF;
  }
`,ne=r.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,re=()=>{const{currentStaff:e,isLoggedIn:t}=(0,s.g)(),{orders:a}=(0,l.h)(),{operationSettings:r,paymentSettings:re}=(0,o.Pj)(),[ie,se]=(0,h.M)("transactions"),[le,oe]=(0,n.useState)("today"),[de,ce]=(0,n.useState)(""),[pe,xe]=(0,n.useState)(""),[he,ue]=(0,n.useState)("all"),[me,ge]=(0,n.useState)("all"),[ve,fe]=(0,n.useState)([]),[ye,be]=(0,n.useState)(null),[je,we]=(0,n.useState)([]),[Fe,Se]=(0,n.useState)({type:null,value:""}),[Ae,ke]=(0,n.useState)([]),[Ce,$e]=(0,n.useState)((new Date).getFullYear().toString()),[De,Be]=(0,n.useState)((new Date).getFullYear()+"-"+String((new Date).getMonth()+1).padStart(2,"0")),[Ee,Te]=(0,n.useState)(""),[Me,ze]=(0,n.useState)(50),[Ie,Re]=(0,n.useState)(1);(0,n.useEffect)(()=>{Oe()},[a]),(0,n.useEffect)(()=>{"transactions"!==ie&&Pe()},[ie,Ce,De,Ee,Ie]),(0,n.useEffect)(()=>{Ue()},[ve,le,de,pe,he,me]),(0,n.useEffect)(()=>{"transactions"!==ie&&Pe()},[ie,ve,Fe]);const Oe=()=>{const e=a.filter(e=>"ready"===e.status).map(e=>{var t;let a=new Date;if(e.createdAt){const t=new Date(e.createdAt);isNaN(t.getTime())||(a=t)}return{id:e.id,orderNumber:e.orderNumber||`ORD${e.id.slice(-4)}`,date:a.toISOString().split("T")[0],time:a.toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit"}),customer:{type:"guest",name:(null===(t=e.customer)||void 0===t?void 0:t.name)||"Guest",id:void 0},staff:{id:"staff-1",name:"Staff Member"},items:e.items.map(e=>({name:e.menuItem?e.menuItem.name:`Item ${e.id}`,quantity:e.quantity,price:e.menuItem?e.menuItem.price:10,total:e.menuItem?e.menuItem.price*e.quantity:10*e.quantity})),subtotal:e.subtotal||e.total||0,tax:e.tax||0,discount:e.discount||0,total:e.total||0,paymentMethod:e.paymentMethod||"cash",cardType:e.card_type||e.cardType||null,status:"completed"}}).sort((e,t)=>new Date(`${t.date} ${t.time}`).getTime()-new Date(`${e.date} ${e.time}`).getTime());fe(e)},Pe=()=>{if(0===ve.length)return;let e=[];const t={};let a=ve;a=Fe.type?Ne():Ve(ve),a.forEach(e=>{let a="";const n=new Date(e.date);if("year"===Fe.type)a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;else if("month"===Fe.type)a=e.date;else switch(ie){case"yearly":a=n.getFullYear().toString();break;case"monthly":a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;break;case"daily":a=e.date}t[a]||(t[a]=[]),t[a].push(e)});const n=Object.keys(t).sort().reverse();e=n.map((e,a)=>{const r=t[e],i=r.reduce((e,t)=>e+t.total,0),s=r.length,l=s>0?i/s:0;let o;if(a<n.length-1){const e=n[a+1],r=t[e].reduce((e,t)=>e+t.total,0);r>0&&(o=(i-r)/r*100)}let d="";if("year"===Fe.type){const[t,a]=e.split("-");d=`${t}-${a.padStart(2,"0")}`}else if("month"===Fe.type)d=new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"});else switch(ie){case"yearly":d=`${e}`;break;case"monthly":const[t,a]=e.split("-");d=`${t}-${a.padStart(2,"0")}`;break;case"daily":d=new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}return{period:d,totalSales:i,totalTransactions:s,averageOrderValue:l,growth:o}}),we(e)},Ve=e=>{let t=[...e];if("yearly"===ie){"all"!==Ce&&(t=t.filter(e=>e.date.startsWith(Ce)));const e="all"===Ce?(new Date).getFullYear()-4:parseInt(Ce),a="all"===Ce?(new Date).getFullYear():parseInt(Ce);t=t.filter(t=>{const n=parseInt(t.date.split("-")[0]);return n>=e&&n<=a})}else if("monthly"===ie){const e=De.split("-")[0];t=t.filter(t=>t.date.startsWith(e))}else if("daily"===ie){const e=Ee||De;t=t.filter(t=>t.date.startsWith(e));const a=(Ie-1)*Me,n=t.sort((e,t)=>t.date.localeCompare(e.date));t=n.slice(a,a+Me)}return t},Ne=()=>Fe.type&&Fe.value?ve.filter(e=>{const t=new Date(e.date);if("year"===Fe.type)return t.getFullYear().toString()===Fe.value;if("month"===Fe.type){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`===Fe.value}return"day"!==Fe.type||e.date===Fe.value}):ve,Ye=e=>{if("year"===Fe.type){const t=e.period;Se({type:"month",value:t,parentValue:Fe.value})}else if("month"===Fe.type){const t=ve.filter(t=>{const a=new Date(t.date);return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`===Fe.value&&t.date===Le(e.period,Fe.value)});ke(t),Se({type:"day",value:Le(e.period,Fe.value),parentValue:Fe.value})}else if("yearly"===ie){const t=e.period;Se({type:"year",value:t})}else if("monthly"===ie){const t=e.period;Se({type:"month",value:t})}else if("daily"===ie){const t=Le(e.period);console.log("Daily click - Period:",e.period,"Target Date:",t);const a=ve.filter(e=>(console.log("Checking transaction date:",e.date,"vs target:",t),e.date===t));console.log("Found transactions:",a.length),ke(a),Se({type:"day",value:t})}},Le=(e,t)=>{if(e.match(/^[A-Za-z]{3}\s+\d+$/)){const a=(new Date).getFullYear(),n=new Date(e+", "+a);if(t){const[e]=t.split("-");n.setFullYear(parseInt(e))}return n.toISOString().split("T")[0]}if(e.match(/^[A-Za-z]{3}\s+\d+,\s+\d{4}$/)){return new Date(e).toISOString().split("T")[0]}if(e.match(/^\d{4}-\d{2}-\d{2}$/))return e;const a=new Date(e);return isNaN(a.getTime())?"":a.toISOString().split("T")[0]},_e=()=>{let e=ve;const t=(null===r||void 0===r?void 0:r.timeZone)||"Asia/Kuala_Lumpur",a=(0,p.oB)(t);switch(le){case"today":e=e.filter(e=>e.date===a);break;case"yesterday":const n=(0,p.Vp)(-1,t);e=e.filter(e=>e.date===n);break;case"this_week":const r=(0,p.Vp)(-6,t);e=e.filter(e=>e.date>=r&&e.date<=a);break;case"this_month":const i=(0,p.Vp)(-29,t);e=e.filter(e=>e.date>=i&&e.date<=a);break;case"custom":de&&pe&&(e=e.filter(e=>e.date>=de&&e.date<=pe))}return"all"!==he&&(e=e.filter(e=>e.paymentMethod===he)),"all"!==me&&(e=e.filter(e=>e.status===me)),e},Ue=()=>{const e=_e(),t=e.reduce((e,t)=>e+t.total,0),a=e.length,n=a>0?t/a:0,r=e.reduce((e,t)=>e+t.tax,0),i=e.reduce((e,t)=>e+t.discount,0),s=e.filter(e=>"cash"===e.paymentMethod).reduce((e,t)=>e+t.total,0),l=e.filter(e=>"card"===e.paymentMethod).reduce((e,t)=>e+t.total,0),o=e.filter(e=>"digital_wallet"===e.paymentMethod).reduce((e,t)=>e+t.total,0),d=e.filter(e=>"points"===e.paymentMethod).reduce((e,t)=>e+t.total,0);be({totalSales:t,totalTransactions:a,averageOrderValue:n,totalTax:r,totalDiscount:i,cashSales:s,cardSales:l,digitalWalletSales:o,pointsSales:d})},We=(e,t)=>{const a=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a"),r=URL.createObjectURL(a);n.setAttribute("href",r),n.setAttribute("download",t),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)},Ge=()=>{const e=_e(),t={cash:e.filter(e=>"cash"===e.paymentMethod).reduce((e,t)=>e+t.total,0),card:e.filter(e=>"card"===e.paymentMethod).reduce((e,t)=>e+t.total,0),digital_wallet:e.filter(e=>"digital_wallet"===e.paymentMethod).reduce((e,t)=>e+t.total,0),points:e.filter(e=>"points"===e.paymentMethod).reduce((e,t)=>e+t.total,0)},a={member:e.filter(e=>"member"===e.customer.type).reduce((e,t)=>e+t.total,0),guest:e.filter(e=>"guest"===e.customer.type).reduce((e,t)=>e+t.total,0)},n=e.filter(e=>"completed"===e.status).length,r=(e.filter(e=>"refunded"===e.status).length,e.filter(e=>"cancelled"===e.status).length,Object.entries(e.reduce((e,t)=>(e[t.staff.name]=(e[t.staff.name]||0)+t.total,e),{})).sort((e,t)=>t[1]-e[1]).slice(0,5)),i=e.reduce((e,t)=>e+t.total,0),s=e.length,l=`\n<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Sales Report - ${(new Date).toLocaleDateString()}</title>\n    <style>\n        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }\n        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }\n        .title { font-size: 28px; font-weight: 600; color: #0A2540; margin-bottom: 10px; }\n        .subtitle { font-size: 16px; color: #6B7C93; }\n        .section { margin-bottom: 30px; }\n        .section-title { font-size: 20px; font-weight: 600; color: #0A2540; margin-bottom: 15px; border-bottom: 1px solid #E6EBF1; padding-bottom: 5px; }\n        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }\n        .stat-card { background: #F8FAFC; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; text-align: center; }\n        .stat-value { font-size: 24px; font-weight: 600; color: #0A2540; margin-bottom: 5px; }\n        .stat-label { font-size: 14px; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.5px; }\n        .breakdown { background: white; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; margin-bottom: 20px; }\n        .breakdown-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F6F9FC; }\n        .breakdown-item:last-child { border-bottom: none; }\n        .breakdown-label { font-weight: 500; }\n        .breakdown-value { font-weight: 600; color: #0A2540; }\n        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E6EBF1; padding-top: 20px; }\n    </style>\n</head>\n<body>\n    <div class="header">\n        <div class="title">Sales Report</div>\n        <div class="subtitle">Generated on ${(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>\n        <div class="subtitle">Period: ${"custom"===le&&de&&pe?`${de} to ${pe}`:le.replace("_"," ")}</div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Summary</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">RM ${i.toFixed(2)}</div>\n                <div class="stat-label">Total Sales</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${s}</div>\n                <div class="stat-label">Total Transactions</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${(i/s||0).toFixed(2)}</div>\n                <div class="stat-label">Average Order Value</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${(n/s*100).toFixed(1)}%</div>\n                <div class="stat-label">Success Rate</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Payment Method Breakdown</div>\n        <div class="breakdown">\n            <div class="breakdown-item">\n                <span class="breakdown-label">Cash</span>\n                <span class="breakdown-value">RM ${t.cash.toFixed(2)} (${(t.cash/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Card</span>\n                <span class="breakdown-value">RM ${t.card.toFixed(2)} (${(t.card/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Digital Wallet</span>\n                <span class="breakdown-value">RM ${t.digital_wallet.toFixed(2)} (${(t.digital_wallet/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Points</span>\n                <span class="breakdown-value">RM ${t.points.toFixed(2)} (${(t.points/i*100).toFixed(1)}%)</span>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Customer Type Analysis</div>\n        <div class="breakdown">\n            <div class="breakdown-item">\n                <span class="breakdown-label">Members</span>\n                <span class="breakdown-value">RM ${a.member.toFixed(2)} (${(a.member/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Guests</span>\n                <span class="breakdown-value">RM ${a.guest.toFixed(2)} (${(a.guest/i*100).toFixed(1)}%)</span>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Top Performing Staff</div>\n        <div class="breakdown">\n            ${r.map(e=>{let[t,a]=e;return`\n                <div class="breakdown-item">\n                    <span class="breakdown-label">${t}</span>\n                    <span class="breakdown-value">RM ${a.toFixed(2)}</span>\n                </div>\n            `}).join("")}\n        </div>\n    </div>\n\n    <div class="footer">\n        <p>Generated by Purple Here POS</p>\n        <p>\ud83e\udd16 Generated with Claude Code</p>\n    </div>\n</body>\n</html>`;We(l,`sales-report-${(new Date).toISOString().split("T")[0]}.html`)},qe=()=>{const e=je.reduce((e,t)=>e+t.totalSales,0),t=je.reduce((e,t)=>e+t.totalTransactions,0),a=je.filter(e=>void 0!==e.growth).reduce((e,t)=>e+(t.growth||0),0)/je.filter(e=>void 0!==e.growth).length,n=je.reduce((e,t)=>t.totalSales>e.totalSales?t:e,je[0]),r=je.reduce((e,t)=>t.totalSales<e.totalSales?t:e,je[0]),i=`\n<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>${ie.charAt(0).toUpperCase()+ie.slice(1)} Sales Report - ${(new Date).toLocaleDateString()}</title>\n    <style>\n        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }\n        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }\n        .title { font-size: 28px; font-weight: 600; color: #0A2540; margin-bottom: 10px; }\n        .subtitle { font-size: 16px; color: #6B7C93; }\n        .section { margin-bottom: 30px; }\n        .section-title { font-size: 20px; font-weight: 600; color: #0A2540; margin-bottom: 15px; border-bottom: 1px solid #E6EBF1; padding-bottom: 5px; }\n        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }\n        .stat-card { background: #F8FAFC; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; text-align: center; }\n        .stat-value { font-size: 24px; font-weight: 600; color: #0A2540; margin-bottom: 5px; }\n        .stat-label { font-size: 14px; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.5px; }\n        .period-table { width: 100%; border-collapse: collapse; margin: 20px 0; }\n        .period-table th, .period-table td { padding: 12px; text-align: left; border-bottom: 1px solid #E6EBF1; }\n        .period-table th { background: #F8FAFC; font-weight: 600; color: #0A2540; }\n        .growth-positive { color: #059669; font-weight: 600; }\n        .growth-negative { color: #DC2626; font-weight: 600; }\n        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E6EBF1; padding-top: 20px; }\n    </style>\n</head>\n<body>\n    <div class="header">\n        <div class="title">${ie.charAt(0).toUpperCase()+ie.slice(1)} Sales Report</div>\n        <div class="subtitle">Generated on ${(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Overall Summary</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">${je.length}</div>\n                <div class="stat-label">Total Periods</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${e.toFixed(2)}</div>\n                <div class="stat-label">Total Sales</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${t.toLocaleString()}</div>\n                <div class="stat-label">Total Transactions</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${a.toFixed(1)}%</div>\n                <div class="stat-label">Average Growth</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Performance Highlights</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">RM ${n.totalSales.toFixed(2)}</div>\n                <div class="stat-label">Best Period: ${n.period}</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${r.totalSales.toFixed(2)}</div>\n                <div class="stat-label">Lowest Period: ${r.period}</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Detailed Breakdown</div>\n        <table class="period-table">\n            <thead>\n                <tr>\n                    <th>Period</th>\n                    <th>Total Sales</th>\n                    <th>Transactions</th>\n                    <th>Avg Order Value</th>\n                    <th>Growth Rate</th>\n                </tr>\n            </thead>\n            <tbody>\n                ${je.map(e=>`\n                    <tr>\n                        <td>${e.period}</td>\n                        <td>RM ${e.totalSales.toFixed(2)}</td>\n                        <td>${e.totalTransactions.toLocaleString()}</td>\n                        <td>RM ${e.averageOrderValue.toFixed(2)}</td>\n                        <td class="${e.growth&&e.growth>0?"growth-positive":"growth-negative"}">\n                            ${e.growth?(e.growth>0?"+":"")+e.growth.toFixed(1)+"%":"N/A"}\n                        </td>\n                    </tr>\n                `).join("")}\n            </tbody>\n        </table>\n    </div>\n\n    <div class="footer">\n        <p>Generated by Purple Here POS</p>\n        <p>\ud83e\udd16 Generated with Claude Code</p>\n    </div>\n</body>\n</html>`;We(i,`sales-${"yearly"===ie?"yearly":"monthly"===ie?"monthly":"daily"}-report-${(new Date).toISOString().split("T")[0]}.html`)},Ze=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});if(!t||!e||!["admin","manager"].includes(e.role))return(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(m,{children:(0,u.jsxs)(i.pp,{children:[(0,u.jsx)(_,{children:"\ud83d\udeab"}),(0,u.jsx)(U,{children:"Access Denied"}),(0,u.jsx)("p",{style:{fontSize:"14px",color:"#9CA3AF"},children:"You need admin or manager privileges to access sales management."})]})})});const He=_e();return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(m,{children:[(0,u.jsxs)(g,{children:[(0,u.jsx)(v,{children:"Sales Management"}),(0,u.jsxs)(f,{children:[(0,u.jsx)(y,{variant:"secondary",onClick:()=>{if("transactions"===ie){const e=[["Order Number","Date","Time","Customer Type","Customer Name","Staff","Items","Subtotal","Tax","Discount","Total","Payment Method","Status"],..._e().map(e=>[e.orderNumber,e.date,e.time,e.customer.type,e.customer.name,e.staff.name,e.items.map(e=>`${e.name} (${e.quantity}x)`).join("; "),e.subtotal.toFixed(2),e.tax.toFixed(2),e.discount.toFixed(2),e.total.toFixed(2),e.paymentMethod,e.status])].map(e=>e.map(e=>`"${e}"`).join(",")).join("\n");We(e,`sales-transactions-${(new Date).toISOString().split("T")[0]}.csv`)}else{const e=[["Period","Total Sales (RM)","Total Transactions","Average Order Value (RM)","Growth Rate (%)"],...je.map(e=>[e.period,e.totalSales.toFixed(2),e.totalTransactions,e.averageOrderValue.toFixed(2),e.growth?e.growth.toFixed(2):"N/A"])].map(e=>e.map(e=>`"${e}"`).join(",")).join("\n");We(e,`sales-${"yearly"===ie?"yearly":"monthly"===ie?"monthly":"daily"}-${(new Date).toISOString().split("T")[0]}.csv`)}},children:"Export CSV"}),(0,u.jsx)(y,{variant:"primary",onClick:()=>{"transactions"===ie?Ge():qe()},children:"Generate Report"})]})]}),(0,u.jsxs)(b,{children:[(0,u.jsxs)(x.tU,{children:[(0,u.jsx)(x.oz,{active:"transactions"===ie,onClick:()=>{se("transactions"),Se({type:null,value:""}),ke([])},children:"Transactions"}),(0,u.jsx)(x.oz,{active:"yearly"===ie,onClick:()=>{se("yearly"),Se({type:null,value:""}),ke([])},children:"Yearly Sales"}),(0,u.jsx)(x.oz,{active:"monthly"===ie,onClick:()=>{se("monthly"),Se({type:null,value:""}),ke([])},children:"Monthly Sales"}),(0,u.jsx)(x.oz,{active:"daily"===ie,onClick:()=>{se("daily"),Se({type:null,value:""}),ke([])},children:"Daily Sales"})]}),"transactions"===ie&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(j,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Time Period"}),(0,u.jsxs)(S,{value:le,onChange:e=>oe(e.target.value),children:[(0,u.jsx)("option",{value:"today",children:"Today"}),(0,u.jsx)("option",{value:"yesterday",children:"Yesterday"}),(0,u.jsx)("option",{value:"this_week",children:"This Week"}),(0,u.jsx)("option",{value:"this_month",children:"This Month"}),(0,u.jsx)("option",{value:"custom",children:"Custom Range"})]})]}),"custom"===le&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Start Date"}),(0,u.jsx)(A,{type:"date",value:de,onChange:e=>ce(e.target.value)})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"End Date"}),(0,u.jsx)(A,{type:"date",value:pe,onChange:e=>xe(e.target.value)})]})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Payment Method"}),(0,u.jsxs)(S,{value:he,onChange:e=>ue(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Methods"}),(0,u.jsx)("option",{value:"cash",children:"Cash"}),(0,u.jsx)("option",{value:"card",children:"Card"}),(0,u.jsx)("option",{value:"digital_wallet",children:"Digital Wallet"}),(0,u.jsx)("option",{value:"points",children:"Points"})]})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Status"}),(0,u.jsxs)(S,{value:me,onChange:e=>ge(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"completed",children:"Completed"}),(0,u.jsx)("option",{value:"refunded",children:"Refunded"}),(0,u.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]})]}),ye&&(0,u.jsxs)(k,{children:[(0,u.jsxs)(C,{color:"#059669",children:[(0,u.jsx)($,{children:"Total Sales"}),(0,u.jsx)(D,{children:(0,d.vv)(ye.totalSales,r.currency)}),(0,u.jsxs)(B,{children:[ye.totalTransactions," transactions"]})]}),(0,u.jsxs)(C,{color:"#2563EB",children:[(0,u.jsx)($,{children:"Average Order"}),(0,u.jsx)(D,{children:(0,d.vv)(ye.averageOrderValue,r.currency)}),(0,u.jsx)(B,{children:"+12.5% vs last period"})]}),(0,u.jsxs)(C,{color:"#DC2626",children:[(0,u.jsx)($,{children:"Total Tax"}),(0,u.jsx)(D,{children:(0,d.vv)(ye.totalTax,r.currency)}),(0,u.jsx)(B,{children:"GST collected"})]}),(0,u.jsxs)(C,{color:"#7C3AED",children:[(0,u.jsx)($,{children:"Total Discounts"}),(0,u.jsx)(D,{children:(0,d.vv)(ye.totalDiscount,r.currency)}),(0,u.jsx)(B,{children:"Promotions applied"})]})]}),(0,u.jsxs)(E,{children:[(0,u.jsxs)(T,{children:[(0,u.jsx)("span",{children:"Order #"}),(0,u.jsx)("span",{children:"Date & Time"}),(0,u.jsx)("span",{children:"Customer"}),(0,u.jsx)("span",{children:"Staff"}),(0,u.jsx)("span",{children:"Subtotal"}),(0,u.jsx)("span",{children:"Total"}),(0,u.jsx)("span",{children:"Payment"}),(0,u.jsx)("span",{children:"Status"})]}),0===He.length?(0,u.jsxs)(i.pp,{children:[(0,u.jsx)(U,{children:"No sales transactions found for the selected criteria"}),(0,u.jsx)(y,{variant:"secondary",children:"Clear Filters"})]}):(0,u.jsxs)(u.Fragment,{children:[He.map(e=>(0,u.jsxs)(M,{children:[(0,u.jsx)(I,{children:e.orderNumber}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:Ze(e.date)}),(0,u.jsx)(R,{children:e.time})]}),(0,u.jsx)(O,{children:(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)(P,{children:e.customer.name}),(0,u.jsx)(V,{type:e.customer.type,children:e.customer.type})]})}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#1F2937"},children:e.staff.name}),(0,u.jsx)(N,{children:(0,d.vv)(e.subtotal,r.currency)}),(0,u.jsx)(N,{children:(0,d.vv)(e.total,r.currency)}),(0,u.jsx)(Y,{method:e.paymentMethod,children:(0,c.MA)(e.paymentMethod,e.cardType,re||void 0)}),(0,u.jsx)(L,{status:e.status,children:e.status})]},e.id)),He.map(e=>(0,u.jsxs)(z,{children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(I,{children:e.orderNumber}),(0,u.jsxs)(R,{children:[Ze(e.date)," \u2022 ",e.time]})]}),(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,u.jsx)(N,{children:(0,d.vv)(e.total,r.currency)}),(0,u.jsx)(L,{status:e.status,children:e.status})]})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,u.jsx)(P,{children:e.customer.name}),(0,u.jsx)(V,{type:e.customer.type,children:e.customer.type})]}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Staff: ",e.staff.name]})]}),(0,u.jsx)(Y,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")})]})]},`mobile-${e.id}`))]})]})]}),"transactions"!==ie&&(0,u.jsxs)(u.Fragment,{children:[!Fe.type&&(0,u.jsxs)(j,{children:["yearly"===ie&&(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Year Range"}),(0,u.jsxs)(S,{value:Ce,onChange:e=>$e(e.target.value),children:[(0,u.jsx)("option",{value:"2024",children:"2024"}),(0,u.jsx)("option",{value:"2023",children:"2023"}),(0,u.jsx)("option",{value:"2022",children:"2022"}),(0,u.jsx)("option",{value:"2021",children:"2021"}),(0,u.jsx)("option",{value:"all",children:"All Years"})]})]}),"monthly"===ie&&(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Select Year"}),(0,u.jsxs)(S,{value:De.split("-")[0],onChange:e=>Be(e.target.value+"-01"),children:[(0,u.jsx)("option",{value:"2024",children:"2024"}),(0,u.jsx)("option",{value:"2023",children:"2023"}),(0,u.jsx)("option",{value:"2022",children:"2022"}),(0,u.jsx)("option",{value:"2021",children:"2021"})]})]}),"daily"===ie&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Select Month"}),(0,u.jsx)(A,{type:"month",value:Ee||De,onChange:e=>Te(e.target.value)})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Page Size"}),(0,u.jsxs)(S,{value:Me.toString(),onChange:e=>ze(parseInt(e.target.value)),children:[(0,u.jsx)("option",{value:"25",children:"25 days"}),(0,u.jsx)("option",{value:"50",children:"50 days"}),(0,u.jsx)("option",{value:"100",children:"100 days"})]})]})]})]}),Fe.type&&(0,u.jsx)(K,{onClick:()=>{"day"===Fe.type?(Fe.parentValue?Se({type:"month",value:Fe.parentValue}):Se({type:null,value:""}),ke([])):"month"===Fe.type?Fe.parentValue?Se({type:"year",value:Fe.parentValue}):Se({type:null,value:""}):"year"===Fe.type&&Se({type:null,value:""})},children:"\u2190 Back"}),Fe.type&&(0,u.jsxs)(q,{children:[(0,u.jsxs)(Z,{clickable:!0,onClick:()=>Se({type:null,value:""}),children:["yearly"===ie?"Yearly":"monthly"===ie?"Monthly":"Daily"," Sales"]}),"year"===Fe.type&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(H,{children:">"}),(0,u.jsxs)(Z,{children:[Fe.value," Monthly Details"]})]}),"month"===Fe.type&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(H,{children:">"}),Fe.parentValue&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(Z,{clickable:!0,onClick:()=>Se({type:"year",value:Fe.parentValue}),children:["Year ",Fe.parentValue]}),(0,u.jsx)(H,{children:">"})]}),(0,u.jsxs)(Z,{children:[Fe.value.split("-")[0],"-",Fe.value.split("-")[1]," Daily Details"]})]}),"day"===Fe.type&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(H,{children:">"}),Fe.parentValue&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(Z,{clickable:!0,onClick:()=>Se({type:"month",value:Fe.parentValue}),children:[Fe.parentValue.split("-")[0],"-",Fe.parentValue.split("-")[1]]}),(0,u.jsx)(H,{children:">"})]}),(0,u.jsxs)(Z,{children:[new Date(Fe.value).toLocaleDateString("en-US")," Transaction Details"]})]})]}),ye&&(0,u.jsxs)(k,{children:[(0,u.jsxs)(C,{color:"#635BFF",children:[(0,u.jsxs)($,{children:["Total ","year"===Fe.type?"Months":"month"===Fe.type?"Days":"yearly"===ie?"Years":"monthly"===ie?"Months":"Days"]}),(0,u.jsx)(D,{children:je.length}),(0,u.jsx)(B,{children:"Reporting Period"})]}),(0,u.jsxs)(C,{color:"#635BFF",children:[(0,u.jsx)($,{children:"Total Sales"}),(0,u.jsx)(D,{children:(0,d.vv)(je.reduce((e,t)=>e+t.totalSales,0),r.currency)}),(0,u.jsx)(B,{children:"Cumulative Amount"})]}),(0,u.jsxs)(C,{color:"#635BFF",children:[(0,u.jsx)($,{children:"Average Sales"}),(0,u.jsx)(D,{children:(0,d.vv)(je.length>0?je.reduce((e,t)=>e+t.totalSales,0)/je.length:0,r.currency)}),(0,u.jsx)(B,{children:"Per Period Average"})]}),(0,u.jsxs)(C,{color:"#635BFF",children:[(0,u.jsx)($,{children:"Highest Sales"}),(0,u.jsx)(D,{children:(0,d.vv)(je.length>0?Math.max(...je.map(e=>e.totalSales)):0,r.currency)}),(0,u.jsx)(B,{children:"Peak Record"})]})]}),"day"===Fe.type&&(0,u.jsxs)(Q,{children:[(0,u.jsxs)(X,{children:[(0,u.jsxs)(J,{children:[new Date(Fe.value).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})," Transaction History"]}),(0,u.jsxs)(ee,{children:["Total ",Ae.length," transactions \u2022 Total sales ",(0,d.vv)(Ae.reduce((e,t)=>e+t.total,0),r.currency)]})]}),(0,u.jsxs)(E,{style:{border:"none",borderRadius:"0"},children:[(0,u.jsxs)(T,{children:[(0,u.jsx)("span",{children:"Order #"}),(0,u.jsx)("span",{children:"Time"}),(0,u.jsx)("span",{children:"Customer"}),(0,u.jsx)("span",{children:"Staff"}),(0,u.jsx)("span",{children:"Subtotal"}),(0,u.jsx)("span",{children:"Total"}),(0,u.jsx)("span",{children:"Payment"}),(0,u.jsx)("span",{children:"Status"})]}),0===Ae.length?(0,u.jsxs)(i.pp,{children:[(0,u.jsx)(_,{children:"\ud83d\udccb"}),(0,u.jsx)(U,{children:"No transactions found for this date"})]}):(0,u.jsxs)(u.Fragment,{children:[Ae.map(e=>(0,u.jsxs)(M,{children:[(0,u.jsx)(I,{children:e.orderNumber}),(0,u.jsx)(R,{children:e.time}),(0,u.jsx)(O,{children:(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)(P,{children:e.customer.name}),(0,u.jsx)(V,{type:e.customer.type,children:e.customer.type})]})}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#1F2937"},children:e.staff.name}),(0,u.jsx)(N,{children:(0,d.vv)(e.subtotal,r.currency)}),(0,u.jsx)(N,{children:(0,d.vv)(e.total,r.currency)}),(0,u.jsx)(Y,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")}),(0,u.jsx)(L,{status:e.status,children:e.status})]},e.id)),Ae.map(e=>(0,u.jsxs)(z,{children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(I,{children:e.orderNumber}),(0,u.jsx)(R,{children:e.time})]}),(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,u.jsx)(N,{children:(0,d.vv)(e.total,r.currency)}),(0,u.jsx)(L,{status:e.status,children:e.status})]})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,u.jsx)(P,{children:e.customer.name}),(0,u.jsx)(V,{type:e.customer.type,children:e.customer.type})]}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Staff: ",e.staff.name]})]}),(0,u.jsx)(Y,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")})]})]},`mobile-detail-${e.id}`))]})]})]}),"day"!==Fe.type&&(0,u.jsxs)(E,{children:[(0,u.jsxs)(T,{children:[(0,u.jsx)("span",{children:"Period"}),(0,u.jsx)("span",{children:"Total Sales"}),(0,u.jsx)("span",{children:"Transactions"}),(0,u.jsx)("span",{children:"Avg Order Value"}),(0,u.jsx)("span",{children:"Growth Rate"}),(0,u.jsx)("span",{children:"Sales Rank"}),(0,u.jsx)("span",{}),(0,u.jsx)("span",{})]}),0===je.length?(0,u.jsx)(i.pp,{children:(0,u.jsx)(U,{children:"No data available for aggregation"})}):(0,u.jsxs)(u.Fragment,{children:[je.map((e,t)=>(0,u.jsxs)(M,{onClick:()=>Ye(e),children:[(0,u.jsx)(W,{style:{fontSize:"16px",fontWeight:"600"},children:e.period}),(0,u.jsx)(N,{children:(0,d.vv)(e.totalSales,r.currency)}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:e.totalTransactions.toLocaleString()}),(0,u.jsx)(N,{children:(0,d.vv)(e.averageOrderValue,r.currency)}),(0,u.jsx)("div",{children:void 0!==e.growth?(0,u.jsxs)(G,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth.toFixed(1),"%"]}):(0,u.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:"N/A"})}),(0,u.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF"},children:["#",t+1]}),(0,u.jsx)("div",{}),(0,u.jsx)("div",{})]},e.period)),je.map((e,t)=>(0,u.jsxs)(z,{onClick:()=>Ye(e),children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(W,{style:{fontSize:"16px",fontWeight:"600",marginBottom:"4px"},children:e.period}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[e.totalTransactions.toLocaleString()," transactions"]})]}),(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,u.jsx)(N,{children:(0,d.vv)(e.totalSales,r.currency)}),void 0!==e.growth&&(0,u.jsxs)(G,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth.toFixed(1),"%"]})]})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsx)("div",{children:(0,u.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:["Avg Order: ",(0,d.vv)(e.averageOrderValue,r.currency)]})}),(0,u.jsxs)("div",{style:{padding:"4px 8px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"#EDE9FE",color:"#5B21B6"},children:["#",t+1]})]})]},`mobile-${e.period}`))]})]}),"daily"===ie&&!Fe.type&&(0,u.jsxs)(te,{children:[(0,u.jsx)(ae,{disabled:1===Ie,onClick:()=>Re(Ie-1),children:"Previous"}),(0,u.jsxs)(ne,{children:["Page ",Ie," \u2022 Showing ",Me," days"]}),(0,u.jsx)(ae,{disabled:je.length<Me,onClick:()=>Re(Ie+1),children:"Next"})]})]})]})]})})}},2597:(e,t,a)=>{a.d(t,{Ex:()=>c,oz:()=>d,tU:()=>o});a(9950);var n=a(4752),r=a(4414);const i=n.Ay.div`
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
`,s=n.Ay.button`
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
`,l=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,o=e=>{let{children:t,className:a,style:n}=e;return(0,r.jsx)(i,{className:a,style:n,children:t})},d=e=>{let{active:t,onClick:a,children:n,className:i}=e;return(0,r.jsx)(s,{active:t,onClick:a,className:i,children:n})},c=e=>{let{count:t,variant:a="default",showZero:n=!1}=e;return 0!==t||n?(0,r.jsx)(l,{variant:a,children:t}):null}},2653:(e,t,a)=>{a.d(t,{M:()=>i});var n=a(9950),r=a(4492);function i(e){const[t,a]=(0,r.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[s,l]=(0,n.useState)(i());return[s,(0,n.useCallback)(e=>{l(e),a({tab:e})},[a])]}},8285:(e,t,a)=>{a.d(t,{MA:()=>m,_M:()=>h});const n="cash",r="card",i="ewallet",s="bank_transfer",l="qr",o="counter",d="online",c="fpx",p="staffMeal",x={[n]:"Cash",[r]:"Credit/Debit Card",[i]:"E-Wallet",[s]:"Bank Transfer",[l]:"QR Payment",[o]:"Pay at Counter",[d]:"Online Payment",[c]:"FPX Online Banking",[p]:"Staff Meal"};function h(e,t){if(t){const a=t[{cash:"cash",card:"card",ewallet:"ewallet",bank_transfer:"bankTransfer",qr:"qr",counter:"payAtCounter",online:"online",fpx:"fpx",staffMeal:"staffMeal",staff_meal:"staffMeal"}[e]||e]||t[e];if(null!==a&&void 0!==a&&a.label)return a.label}return x[e]||e}const u={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function m(e,t,a){if(!e)return"N/A";if("card"===e&&t){return`${h("card",a)}(${u[t]||t})`}return h(e,a)}},8406:(e,t,a)=>{a.d(t,{MQ:()=>o,Vp:()=>l,fU:()=>i,ng:()=>n,oB:()=>s,r6:()=>r});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",r=(e,t,a)=>{if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";const i={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return r.toLocaleString("en-MY",{...i,...a})},i=(e,t)=>r(e,t,{year:void 0,month:void 0,day:void 0}),s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const a=new Date;a.setDate(a.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(a)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},o=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const a=Date.now()-t,n=Math.floor(a/6e4),r=Math.floor(a/36e5),i=Math.floor(a/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===r?"1 hour ago":r<24?`${r} hours ago`:1===i?"1 day ago":`${i} days ago`}}}]);