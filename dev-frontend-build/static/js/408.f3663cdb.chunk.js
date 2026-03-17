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
`,y=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`,f=r.Ay.button`
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
`,Z=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,q=r.Ay.span`
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
`,re=()=>{const{currentStaff:e,isLoggedIn:t}=(0,s.g)(),{orders:a}=(0,l.h)(),{operationSettings:r}=(0,o.Pj)(),[re,ie]=(0,h.M)("transactions"),[se,le]=(0,n.useState)("today"),[oe,de]=(0,n.useState)(""),[ce,pe]=(0,n.useState)(""),[xe,he]=(0,n.useState)("all"),[ue,me]=(0,n.useState)("all"),[ge,ve]=(0,n.useState)([]),[ye,fe]=(0,n.useState)(null),[be,je]=(0,n.useState)([]),[we,Fe]=(0,n.useState)({type:null,value:""}),[Se,Ae]=(0,n.useState)([]),[ke,Ce]=(0,n.useState)((new Date).getFullYear().toString()),[$e,De]=(0,n.useState)((new Date).getFullYear()+"-"+String((new Date).getMonth()+1).padStart(2,"0")),[Be,Ee]=(0,n.useState)(""),[Te,Me]=(0,n.useState)(50),[ze,Ie]=(0,n.useState)(1);(0,n.useEffect)(()=>{Re()},[a]),(0,n.useEffect)(()=>{"transactions"!==re&&Oe()},[re,ke,$e,Be,ze]),(0,n.useEffect)(()=>{_e()},[ge,se,oe,ce,xe,ue]),(0,n.useEffect)(()=>{"transactions"!==re&&Oe()},[re,ge,we]);const Re=()=>{const e=a.filter(e=>"ready"===e.status).map(e=>{var t;let a=new Date;if(e.createdAt){const t=new Date(e.createdAt);isNaN(t.getTime())||(a=t)}return{id:e.id,orderNumber:e.orderNumber||`ORD${e.id.slice(-4)}`,date:a.toISOString().split("T")[0],time:a.toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit"}),customer:{type:"guest",name:(null===(t=e.customer)||void 0===t?void 0:t.name)||"Guest",id:void 0},staff:{id:"staff-1",name:"Staff Member"},items:e.items.map(e=>({name:e.menuItem?e.menuItem.name:`Item ${e.id}`,quantity:e.quantity,price:e.menuItem?e.menuItem.price:10,total:e.menuItem?e.menuItem.price*e.quantity:10*e.quantity})),subtotal:e.subtotal||e.total||0,tax:e.tax||0,discount:e.discount||0,total:e.total||0,paymentMethod:e.paymentMethod||"cash",cardType:e.card_type||e.cardType||null,status:"completed"}}).sort((e,t)=>new Date(`${t.date} ${t.time}`).getTime()-new Date(`${e.date} ${e.time}`).getTime());ve(e)},Oe=()=>{if(0===ge.length)return;let e=[];const t={};let a=ge;a=we.type?Ve():Pe(ge),a.forEach(e=>{let a="";const n=new Date(e.date);if("year"===we.type)a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;else if("month"===we.type)a=e.date;else switch(re){case"yearly":a=n.getFullYear().toString();break;case"monthly":a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;break;case"daily":a=e.date}t[a]||(t[a]=[]),t[a].push(e)});const n=Object.keys(t).sort().reverse();e=n.map((e,a)=>{const r=t[e],i=r.reduce((e,t)=>e+t.total,0),s=r.length,l=s>0?i/s:0;let o;if(a<n.length-1){const e=n[a+1],r=t[e].reduce((e,t)=>e+t.total,0);r>0&&(o=(i-r)/r*100)}let d="";if("year"===we.type){const[t,a]=e.split("-");d=`${t}-${a.padStart(2,"0")}`}else if("month"===we.type)d=new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"});else switch(re){case"yearly":d=`${e}`;break;case"monthly":const[t,a]=e.split("-");d=`${t}-${a.padStart(2,"0")}`;break;case"daily":d=new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}return{period:d,totalSales:i,totalTransactions:s,averageOrderValue:l,growth:o}}),je(e)},Pe=e=>{let t=[...e];if("yearly"===re){"all"!==ke&&(t=t.filter(e=>e.date.startsWith(ke)));const e="all"===ke?(new Date).getFullYear()-4:parseInt(ke),a="all"===ke?(new Date).getFullYear():parseInt(ke);t=t.filter(t=>{const n=parseInt(t.date.split("-")[0]);return n>=e&&n<=a})}else if("monthly"===re){const e=$e.split("-")[0];t=t.filter(t=>t.date.startsWith(e))}else if("daily"===re){const e=Be||$e;t=t.filter(t=>t.date.startsWith(e));const a=(ze-1)*Te,n=t.sort((e,t)=>t.date.localeCompare(e.date));t=n.slice(a,a+Te)}return t},Ve=()=>we.type&&we.value?ge.filter(e=>{const t=new Date(e.date);if("year"===we.type)return t.getFullYear().toString()===we.value;if("month"===we.type){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`===we.value}return"day"!==we.type||e.date===we.value}):ge,Ne=e=>{if("year"===we.type){const t=e.period;Fe({type:"month",value:t,parentValue:we.value})}else if("month"===we.type){const t=ge.filter(t=>{const a=new Date(t.date);return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`===we.value&&t.date===Ye(e.period,we.value)});Ae(t),Fe({type:"day",value:Ye(e.period,we.value),parentValue:we.value})}else if("yearly"===re){const t=e.period;Fe({type:"year",value:t})}else if("monthly"===re){const t=e.period;Fe({type:"month",value:t})}else if("daily"===re){const t=Ye(e.period);console.log("Daily click - Period:",e.period,"Target Date:",t);const a=ge.filter(e=>(console.log("Checking transaction date:",e.date,"vs target:",t),e.date===t));console.log("Found transactions:",a.length),Ae(a),Fe({type:"day",value:t})}},Ye=(e,t)=>{if(e.match(/^[A-Za-z]{3}\s+\d+$/)){const a=(new Date).getFullYear(),n=new Date(e+", "+a);if(t){const[e]=t.split("-");n.setFullYear(parseInt(e))}return n.toISOString().split("T")[0]}if(e.match(/^[A-Za-z]{3}\s+\d+,\s+\d{4}$/)){return new Date(e).toISOString().split("T")[0]}if(e.match(/^\d{4}-\d{2}-\d{2}$/))return e;const a=new Date(e);return isNaN(a.getTime())?"":a.toISOString().split("T")[0]},Le=()=>{let e=ge;const t=(null===r||void 0===r?void 0:r.timeZone)||"Asia/Kuala_Lumpur",a=(0,p.oB)(t);switch(se){case"today":e=e.filter(e=>e.date===a);break;case"yesterday":const n=(0,p.Vp)(-1,t);e=e.filter(e=>e.date===n);break;case"this_week":const r=(0,p.Vp)(-6,t);e=e.filter(e=>e.date>=r&&e.date<=a);break;case"this_month":const i=(0,p.Vp)(-29,t);e=e.filter(e=>e.date>=i&&e.date<=a);break;case"custom":oe&&ce&&(e=e.filter(e=>e.date>=oe&&e.date<=ce))}return"all"!==xe&&(e=e.filter(e=>e.paymentMethod===xe)),"all"!==ue&&(e=e.filter(e=>e.status===ue)),e},_e=()=>{const e=Le(),t=e.reduce((e,t)=>e+t.total,0),a=e.length,n=a>0?t/a:0,r=e.reduce((e,t)=>e+t.tax,0),i=e.reduce((e,t)=>e+t.discount,0),s=e.filter(e=>"cash"===e.paymentMethod).reduce((e,t)=>e+t.total,0),l=e.filter(e=>"card"===e.paymentMethod).reduce((e,t)=>e+t.total,0),o=e.filter(e=>"digital_wallet"===e.paymentMethod).reduce((e,t)=>e+t.total,0),d=e.filter(e=>"points"===e.paymentMethod).reduce((e,t)=>e+t.total,0);fe({totalSales:t,totalTransactions:a,averageOrderValue:n,totalTax:r,totalDiscount:i,cashSales:s,cardSales:l,digitalWalletSales:o,pointsSales:d})},Ue=(e,t)=>{const a=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a"),r=URL.createObjectURL(a);n.setAttribute("href",r),n.setAttribute("download",t),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)},We=()=>{const e=Le(),t={cash:e.filter(e=>"cash"===e.paymentMethod).reduce((e,t)=>e+t.total,0),card:e.filter(e=>"card"===e.paymentMethod).reduce((e,t)=>e+t.total,0),digital_wallet:e.filter(e=>"digital_wallet"===e.paymentMethod).reduce((e,t)=>e+t.total,0),points:e.filter(e=>"points"===e.paymentMethod).reduce((e,t)=>e+t.total,0)},a={member:e.filter(e=>"member"===e.customer.type).reduce((e,t)=>e+t.total,0),guest:e.filter(e=>"guest"===e.customer.type).reduce((e,t)=>e+t.total,0)},n=e.filter(e=>"completed"===e.status).length,r=(e.filter(e=>"refunded"===e.status).length,e.filter(e=>"cancelled"===e.status).length,Object.entries(e.reduce((e,t)=>(e[t.staff.name]=(e[t.staff.name]||0)+t.total,e),{})).sort((e,t)=>t[1]-e[1]).slice(0,5)),i=e.reduce((e,t)=>e+t.total,0),s=e.length,l=`\n<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Sales Report - ${(new Date).toLocaleDateString()}</title>\n    <style>\n        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }\n        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }\n        .title { font-size: 28px; font-weight: 600; color: #0A2540; margin-bottom: 10px; }\n        .subtitle { font-size: 16px; color: #6B7C93; }\n        .section { margin-bottom: 30px; }\n        .section-title { font-size: 20px; font-weight: 600; color: #0A2540; margin-bottom: 15px; border-bottom: 1px solid #E6EBF1; padding-bottom: 5px; }\n        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }\n        .stat-card { background: #F8FAFC; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; text-align: center; }\n        .stat-value { font-size: 24px; font-weight: 600; color: #0A2540; margin-bottom: 5px; }\n        .stat-label { font-size: 14px; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.5px; }\n        .breakdown { background: white; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; margin-bottom: 20px; }\n        .breakdown-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F6F9FC; }\n        .breakdown-item:last-child { border-bottom: none; }\n        .breakdown-label { font-weight: 500; }\n        .breakdown-value { font-weight: 600; color: #0A2540; }\n        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E6EBF1; padding-top: 20px; }\n    </style>\n</head>\n<body>\n    <div class="header">\n        <div class="title">Sales Report</div>\n        <div class="subtitle">Generated on ${(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>\n        <div class="subtitle">Period: ${"custom"===se&&oe&&ce?`${oe} to ${ce}`:se.replace("_"," ")}</div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Summary</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">RM ${i.toFixed(2)}</div>\n                <div class="stat-label">Total Sales</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${s}</div>\n                <div class="stat-label">Total Transactions</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${(i/s||0).toFixed(2)}</div>\n                <div class="stat-label">Average Order Value</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${(n/s*100).toFixed(1)}%</div>\n                <div class="stat-label">Success Rate</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Payment Method Breakdown</div>\n        <div class="breakdown">\n            <div class="breakdown-item">\n                <span class="breakdown-label">Cash</span>\n                <span class="breakdown-value">RM ${t.cash.toFixed(2)} (${(t.cash/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Card</span>\n                <span class="breakdown-value">RM ${t.card.toFixed(2)} (${(t.card/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Digital Wallet</span>\n                <span class="breakdown-value">RM ${t.digital_wallet.toFixed(2)} (${(t.digital_wallet/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Points</span>\n                <span class="breakdown-value">RM ${t.points.toFixed(2)} (${(t.points/i*100).toFixed(1)}%)</span>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Customer Type Analysis</div>\n        <div class="breakdown">\n            <div class="breakdown-item">\n                <span class="breakdown-label">Members</span>\n                <span class="breakdown-value">RM ${a.member.toFixed(2)} (${(a.member/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Guests</span>\n                <span class="breakdown-value">RM ${a.guest.toFixed(2)} (${(a.guest/i*100).toFixed(1)}%)</span>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Top Performing Staff</div>\n        <div class="breakdown">\n            ${r.map(e=>{let[t,a]=e;return`\n                <div class="breakdown-item">\n                    <span class="breakdown-label">${t}</span>\n                    <span class="breakdown-value">RM ${a.toFixed(2)}</span>\n                </div>\n            `}).join("")}\n        </div>\n    </div>\n\n    <div class="footer">\n        <p>Generated by Purple Here POS</p>\n        <p>\ud83e\udd16 Generated with Claude Code</p>\n    </div>\n</body>\n</html>`;Ue(l,`sales-report-${(new Date).toISOString().split("T")[0]}.html`)},Ge=()=>{const e=be.reduce((e,t)=>e+t.totalSales,0),t=be.reduce((e,t)=>e+t.totalTransactions,0),a=be.filter(e=>void 0!==e.growth).reduce((e,t)=>e+(t.growth||0),0)/be.filter(e=>void 0!==e.growth).length,n=be.reduce((e,t)=>t.totalSales>e.totalSales?t:e,be[0]),r=be.reduce((e,t)=>t.totalSales<e.totalSales?t:e,be[0]),i=`\n<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>${re.charAt(0).toUpperCase()+re.slice(1)} Sales Report - ${(new Date).toLocaleDateString()}</title>\n    <style>\n        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }\n        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }\n        .title { font-size: 28px; font-weight: 600; color: #0A2540; margin-bottom: 10px; }\n        .subtitle { font-size: 16px; color: #6B7C93; }\n        .section { margin-bottom: 30px; }\n        .section-title { font-size: 20px; font-weight: 600; color: #0A2540; margin-bottom: 15px; border-bottom: 1px solid #E6EBF1; padding-bottom: 5px; }\n        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }\n        .stat-card { background: #F8FAFC; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; text-align: center; }\n        .stat-value { font-size: 24px; font-weight: 600; color: #0A2540; margin-bottom: 5px; }\n        .stat-label { font-size: 14px; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.5px; }\n        .period-table { width: 100%; border-collapse: collapse; margin: 20px 0; }\n        .period-table th, .period-table td { padding: 12px; text-align: left; border-bottom: 1px solid #E6EBF1; }\n        .period-table th { background: #F8FAFC; font-weight: 600; color: #0A2540; }\n        .growth-positive { color: #059669; font-weight: 600; }\n        .growth-negative { color: #DC2626; font-weight: 600; }\n        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E6EBF1; padding-top: 20px; }\n    </style>\n</head>\n<body>\n    <div class="header">\n        <div class="title">${re.charAt(0).toUpperCase()+re.slice(1)} Sales Report</div>\n        <div class="subtitle">Generated on ${(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Overall Summary</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">${be.length}</div>\n                <div class="stat-label">Total Periods</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${e.toFixed(2)}</div>\n                <div class="stat-label">Total Sales</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${t.toLocaleString()}</div>\n                <div class="stat-label">Total Transactions</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${a.toFixed(1)}%</div>\n                <div class="stat-label">Average Growth</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Performance Highlights</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">RM ${n.totalSales.toFixed(2)}</div>\n                <div class="stat-label">Best Period: ${n.period}</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${r.totalSales.toFixed(2)}</div>\n                <div class="stat-label">Lowest Period: ${r.period}</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Detailed Breakdown</div>\n        <table class="period-table">\n            <thead>\n                <tr>\n                    <th>Period</th>\n                    <th>Total Sales</th>\n                    <th>Transactions</th>\n                    <th>Avg Order Value</th>\n                    <th>Growth Rate</th>\n                </tr>\n            </thead>\n            <tbody>\n                ${be.map(e=>`\n                    <tr>\n                        <td>${e.period}</td>\n                        <td>RM ${e.totalSales.toFixed(2)}</td>\n                        <td>${e.totalTransactions.toLocaleString()}</td>\n                        <td>RM ${e.averageOrderValue.toFixed(2)}</td>\n                        <td class="${e.growth&&e.growth>0?"growth-positive":"growth-negative"}">\n                            ${e.growth?(e.growth>0?"+":"")+e.growth.toFixed(1)+"%":"N/A"}\n                        </td>\n                    </tr>\n                `).join("")}\n            </tbody>\n        </table>\n    </div>\n\n    <div class="footer">\n        <p>Generated by Purple Here POS</p>\n        <p>\ud83e\udd16 Generated with Claude Code</p>\n    </div>\n</body>\n</html>`;Ue(i,`sales-${"yearly"===re?"yearly":"monthly"===re?"monthly":"daily"}-report-${(new Date).toISOString().split("T")[0]}.html`)},Ze=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});if(!t||!e||!["admin","manager"].includes(e.role))return(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(m,{children:(0,u.jsxs)(i.pp,{children:[(0,u.jsx)(_,{children:"\ud83d\udeab"}),(0,u.jsx)(U,{children:"Access Denied"}),(0,u.jsx)("p",{style:{fontSize:"14px",color:"#9CA3AF"},children:"You need admin or manager privileges to access sales management."})]})})});const qe=Le();return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(m,{children:[(0,u.jsxs)(g,{children:[(0,u.jsx)(v,{children:"Sales Management"}),(0,u.jsxs)(y,{children:[(0,u.jsx)(f,{variant:"secondary",onClick:()=>{if("transactions"===re){const e=[["Order Number","Date","Time","Customer Type","Customer Name","Staff","Items","Subtotal","Tax","Discount","Total","Payment Method","Status"],...Le().map(e=>[e.orderNumber,e.date,e.time,e.customer.type,e.customer.name,e.staff.name,e.items.map(e=>`${e.name} (${e.quantity}x)`).join("; "),e.subtotal.toFixed(2),e.tax.toFixed(2),e.discount.toFixed(2),e.total.toFixed(2),e.paymentMethod,e.status])].map(e=>e.map(e=>`"${e}"`).join(",")).join("\n");Ue(e,`sales-transactions-${(new Date).toISOString().split("T")[0]}.csv`)}else{const e=[["Period","Total Sales (RM)","Total Transactions","Average Order Value (RM)","Growth Rate (%)"],...be.map(e=>[e.period,e.totalSales.toFixed(2),e.totalTransactions,e.averageOrderValue.toFixed(2),e.growth?e.growth.toFixed(2):"N/A"])].map(e=>e.map(e=>`"${e}"`).join(",")).join("\n");Ue(e,`sales-${"yearly"===re?"yearly":"monthly"===re?"monthly":"daily"}-${(new Date).toISOString().split("T")[0]}.csv`)}},children:"Export CSV"}),(0,u.jsx)(f,{variant:"primary",onClick:()=>{"transactions"===re?We():Ge()},children:"Generate Report"})]})]}),(0,u.jsxs)(b,{children:[(0,u.jsxs)(x.tU,{children:[(0,u.jsx)(x.oz,{active:"transactions"===re,onClick:()=>{ie("transactions"),Fe({type:null,value:""}),Ae([])},children:"Transactions"}),(0,u.jsx)(x.oz,{active:"yearly"===re,onClick:()=>{ie("yearly"),Fe({type:null,value:""}),Ae([])},children:"Yearly Sales"}),(0,u.jsx)(x.oz,{active:"monthly"===re,onClick:()=>{ie("monthly"),Fe({type:null,value:""}),Ae([])},children:"Monthly Sales"}),(0,u.jsx)(x.oz,{active:"daily"===re,onClick:()=>{ie("daily"),Fe({type:null,value:""}),Ae([])},children:"Daily Sales"})]}),"transactions"===re&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(j,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Time Period"}),(0,u.jsxs)(S,{value:se,onChange:e=>le(e.target.value),children:[(0,u.jsx)("option",{value:"today",children:"Today"}),(0,u.jsx)("option",{value:"yesterday",children:"Yesterday"}),(0,u.jsx)("option",{value:"this_week",children:"This Week"}),(0,u.jsx)("option",{value:"this_month",children:"This Month"}),(0,u.jsx)("option",{value:"custom",children:"Custom Range"})]})]}),"custom"===se&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Start Date"}),(0,u.jsx)(A,{type:"date",value:oe,onChange:e=>de(e.target.value)})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"End Date"}),(0,u.jsx)(A,{type:"date",value:ce,onChange:e=>pe(e.target.value)})]})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Payment Method"}),(0,u.jsxs)(S,{value:xe,onChange:e=>he(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Methods"}),(0,u.jsx)("option",{value:"cash",children:"Cash"}),(0,u.jsx)("option",{value:"card",children:"Card"}),(0,u.jsx)("option",{value:"digital_wallet",children:"Digital Wallet"}),(0,u.jsx)("option",{value:"points",children:"Points"})]})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Status"}),(0,u.jsxs)(S,{value:ue,onChange:e=>me(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"completed",children:"Completed"}),(0,u.jsx)("option",{value:"refunded",children:"Refunded"}),(0,u.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]})]}),ye&&(0,u.jsxs)(k,{children:[(0,u.jsxs)(C,{color:"#059669",children:[(0,u.jsx)($,{children:"Total Sales"}),(0,u.jsx)(D,{children:(0,d.vv)(ye.totalSales,r.currency)}),(0,u.jsxs)(B,{children:[ye.totalTransactions," transactions"]})]}),(0,u.jsxs)(C,{color:"#2563EB",children:[(0,u.jsx)($,{children:"Average Order"}),(0,u.jsx)(D,{children:(0,d.vv)(ye.averageOrderValue,r.currency)}),(0,u.jsx)(B,{children:"+12.5% vs last period"})]}),(0,u.jsxs)(C,{color:"#DC2626",children:[(0,u.jsx)($,{children:"Total Tax"}),(0,u.jsx)(D,{children:(0,d.vv)(ye.totalTax,r.currency)}),(0,u.jsx)(B,{children:"GST collected"})]}),(0,u.jsxs)(C,{color:"#7C3AED",children:[(0,u.jsx)($,{children:"Total Discounts"}),(0,u.jsx)(D,{children:(0,d.vv)(ye.totalDiscount,r.currency)}),(0,u.jsx)(B,{children:"Promotions applied"})]})]}),(0,u.jsxs)(E,{children:[(0,u.jsxs)(T,{children:[(0,u.jsx)("span",{children:"Order #"}),(0,u.jsx)("span",{children:"Date & Time"}),(0,u.jsx)("span",{children:"Customer"}),(0,u.jsx)("span",{children:"Staff"}),(0,u.jsx)("span",{children:"Subtotal"}),(0,u.jsx)("span",{children:"Total"}),(0,u.jsx)("span",{children:"Payment"}),(0,u.jsx)("span",{children:"Status"})]}),0===qe.length?(0,u.jsxs)(i.pp,{children:[(0,u.jsx)(U,{children:"No sales transactions found for the selected criteria"}),(0,u.jsx)(f,{variant:"secondary",children:"Clear Filters"})]}):(0,u.jsxs)(u.Fragment,{children:[qe.map(e=>(0,u.jsxs)(M,{children:[(0,u.jsx)(I,{children:e.orderNumber}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:Ze(e.date)}),(0,u.jsx)(R,{children:e.time})]}),(0,u.jsx)(O,{children:(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)(P,{children:e.customer.name}),(0,u.jsx)(V,{type:e.customer.type,children:e.customer.type})]})}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#1F2937"},children:e.staff.name}),(0,u.jsx)(N,{children:(0,d.vv)(e.subtotal,r.currency)}),(0,u.jsx)(N,{children:(0,d.vv)(e.total,r.currency)}),(0,u.jsx)(Y,{method:e.paymentMethod,children:(0,c.MA)(e.paymentMethod,e.cardType)}),(0,u.jsx)(L,{status:e.status,children:e.status})]},e.id)),qe.map(e=>(0,u.jsxs)(z,{children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(I,{children:e.orderNumber}),(0,u.jsxs)(R,{children:[Ze(e.date)," \u2022 ",e.time]})]}),(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,u.jsx)(N,{children:(0,d.vv)(e.total,r.currency)}),(0,u.jsx)(L,{status:e.status,children:e.status})]})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,u.jsx)(P,{children:e.customer.name}),(0,u.jsx)(V,{type:e.customer.type,children:e.customer.type})]}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Staff: ",e.staff.name]})]}),(0,u.jsx)(Y,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")})]})]},`mobile-${e.id}`))]})]})]}),"transactions"!==re&&(0,u.jsxs)(u.Fragment,{children:[!we.type&&(0,u.jsxs)(j,{children:["yearly"===re&&(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Year Range"}),(0,u.jsxs)(S,{value:ke,onChange:e=>Ce(e.target.value),children:[(0,u.jsx)("option",{value:"2024",children:"2024"}),(0,u.jsx)("option",{value:"2023",children:"2023"}),(0,u.jsx)("option",{value:"2022",children:"2022"}),(0,u.jsx)("option",{value:"2021",children:"2021"}),(0,u.jsx)("option",{value:"all",children:"All Years"})]})]}),"monthly"===re&&(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Select Year"}),(0,u.jsxs)(S,{value:$e.split("-")[0],onChange:e=>De(e.target.value+"-01"),children:[(0,u.jsx)("option",{value:"2024",children:"2024"}),(0,u.jsx)("option",{value:"2023",children:"2023"}),(0,u.jsx)("option",{value:"2022",children:"2022"}),(0,u.jsx)("option",{value:"2021",children:"2021"})]})]}),"daily"===re&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Select Month"}),(0,u.jsx)(A,{type:"month",value:Be||$e,onChange:e=>Ee(e.target.value)})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:"Page Size"}),(0,u.jsxs)(S,{value:Te.toString(),onChange:e=>Me(parseInt(e.target.value)),children:[(0,u.jsx)("option",{value:"25",children:"25 days"}),(0,u.jsx)("option",{value:"50",children:"50 days"}),(0,u.jsx)("option",{value:"100",children:"100 days"})]})]})]})]}),we.type&&(0,u.jsx)(K,{onClick:()=>{"day"===we.type?(we.parentValue?Fe({type:"month",value:we.parentValue}):Fe({type:null,value:""}),Ae([])):"month"===we.type?we.parentValue?Fe({type:"year",value:we.parentValue}):Fe({type:null,value:""}):"year"===we.type&&Fe({type:null,value:""})},children:"\u2190 Back"}),we.type&&(0,u.jsxs)(Z,{children:[(0,u.jsxs)(q,{clickable:!0,onClick:()=>Fe({type:null,value:""}),children:["yearly"===re?"Yearly":"monthly"===re?"Monthly":"Daily"," Sales"]}),"year"===we.type&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(H,{children:">"}),(0,u.jsxs)(q,{children:[we.value," Monthly Details"]})]}),"month"===we.type&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(H,{children:">"}),we.parentValue&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(q,{clickable:!0,onClick:()=>Fe({type:"year",value:we.parentValue}),children:["Year ",we.parentValue]}),(0,u.jsx)(H,{children:">"})]}),(0,u.jsxs)(q,{children:[we.value.split("-")[0],"-",we.value.split("-")[1]," Daily Details"]})]}),"day"===we.type&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(H,{children:">"}),we.parentValue&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(q,{clickable:!0,onClick:()=>Fe({type:"month",value:we.parentValue}),children:[we.parentValue.split("-")[0],"-",we.parentValue.split("-")[1]]}),(0,u.jsx)(H,{children:">"})]}),(0,u.jsxs)(q,{children:[new Date(we.value).toLocaleDateString("en-US")," Transaction Details"]})]})]}),ye&&(0,u.jsxs)(k,{children:[(0,u.jsxs)(C,{color:"#635BFF",children:[(0,u.jsxs)($,{children:["Total ","year"===we.type?"Months":"month"===we.type?"Days":"yearly"===re?"Years":"monthly"===re?"Months":"Days"]}),(0,u.jsx)(D,{children:be.length}),(0,u.jsx)(B,{children:"Reporting Period"})]}),(0,u.jsxs)(C,{color:"#635BFF",children:[(0,u.jsx)($,{children:"Total Sales"}),(0,u.jsx)(D,{children:(0,d.vv)(be.reduce((e,t)=>e+t.totalSales,0),r.currency)}),(0,u.jsx)(B,{children:"Cumulative Amount"})]}),(0,u.jsxs)(C,{color:"#635BFF",children:[(0,u.jsx)($,{children:"Average Sales"}),(0,u.jsx)(D,{children:(0,d.vv)(be.length>0?be.reduce((e,t)=>e+t.totalSales,0)/be.length:0,r.currency)}),(0,u.jsx)(B,{children:"Per Period Average"})]}),(0,u.jsxs)(C,{color:"#635BFF",children:[(0,u.jsx)($,{children:"Highest Sales"}),(0,u.jsx)(D,{children:(0,d.vv)(be.length>0?Math.max(...be.map(e=>e.totalSales)):0,r.currency)}),(0,u.jsx)(B,{children:"Peak Record"})]})]}),"day"===we.type&&(0,u.jsxs)(Q,{children:[(0,u.jsxs)(X,{children:[(0,u.jsxs)(J,{children:[new Date(we.value).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})," Transaction History"]}),(0,u.jsxs)(ee,{children:["Total ",Se.length," transactions \u2022 Total sales ",(0,d.vv)(Se.reduce((e,t)=>e+t.total,0),r.currency)]})]}),(0,u.jsxs)(E,{style:{border:"none",borderRadius:"0"},children:[(0,u.jsxs)(T,{children:[(0,u.jsx)("span",{children:"Order #"}),(0,u.jsx)("span",{children:"Time"}),(0,u.jsx)("span",{children:"Customer"}),(0,u.jsx)("span",{children:"Staff"}),(0,u.jsx)("span",{children:"Subtotal"}),(0,u.jsx)("span",{children:"Total"}),(0,u.jsx)("span",{children:"Payment"}),(0,u.jsx)("span",{children:"Status"})]}),0===Se.length?(0,u.jsxs)(i.pp,{children:[(0,u.jsx)(_,{children:"\ud83d\udccb"}),(0,u.jsx)(U,{children:"No transactions found for this date"})]}):(0,u.jsxs)(u.Fragment,{children:[Se.map(e=>(0,u.jsxs)(M,{children:[(0,u.jsx)(I,{children:e.orderNumber}),(0,u.jsx)(R,{children:e.time}),(0,u.jsx)(O,{children:(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)(P,{children:e.customer.name}),(0,u.jsx)(V,{type:e.customer.type,children:e.customer.type})]})}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#1F2937"},children:e.staff.name}),(0,u.jsx)(N,{children:(0,d.vv)(e.subtotal,r.currency)}),(0,u.jsx)(N,{children:(0,d.vv)(e.total,r.currency)}),(0,u.jsx)(Y,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")}),(0,u.jsx)(L,{status:e.status,children:e.status})]},e.id)),Se.map(e=>(0,u.jsxs)(z,{children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(I,{children:e.orderNumber}),(0,u.jsx)(R,{children:e.time})]}),(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,u.jsx)(N,{children:(0,d.vv)(e.total,r.currency)}),(0,u.jsx)(L,{status:e.status,children:e.status})]})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,u.jsx)(P,{children:e.customer.name}),(0,u.jsx)(V,{type:e.customer.type,children:e.customer.type})]}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Staff: ",e.staff.name]})]}),(0,u.jsx)(Y,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")})]})]},`mobile-detail-${e.id}`))]})]})]}),"day"!==we.type&&(0,u.jsxs)(E,{children:[(0,u.jsxs)(T,{children:[(0,u.jsx)("span",{children:"Period"}),(0,u.jsx)("span",{children:"Total Sales"}),(0,u.jsx)("span",{children:"Transactions"}),(0,u.jsx)("span",{children:"Avg Order Value"}),(0,u.jsx)("span",{children:"Growth Rate"}),(0,u.jsx)("span",{children:"Sales Rank"}),(0,u.jsx)("span",{}),(0,u.jsx)("span",{})]}),0===be.length?(0,u.jsx)(i.pp,{children:(0,u.jsx)(U,{children:"No data available for aggregation"})}):(0,u.jsxs)(u.Fragment,{children:[be.map((e,t)=>(0,u.jsxs)(M,{onClick:()=>Ne(e),children:[(0,u.jsx)(W,{style:{fontSize:"16px",fontWeight:"600"},children:e.period}),(0,u.jsx)(N,{children:(0,d.vv)(e.totalSales,r.currency)}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:e.totalTransactions.toLocaleString()}),(0,u.jsx)(N,{children:(0,d.vv)(e.averageOrderValue,r.currency)}),(0,u.jsx)("div",{children:void 0!==e.growth?(0,u.jsxs)(G,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth.toFixed(1),"%"]}):(0,u.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:"N/A"})}),(0,u.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF"},children:["#",t+1]}),(0,u.jsx)("div",{}),(0,u.jsx)("div",{})]},e.period)),be.map((e,t)=>(0,u.jsxs)(z,{onClick:()=>Ne(e),children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(W,{style:{fontSize:"16px",fontWeight:"600",marginBottom:"4px"},children:e.period}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[e.totalTransactions.toLocaleString()," transactions"]})]}),(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,u.jsx)(N,{children:(0,d.vv)(e.totalSales,r.currency)}),void 0!==e.growth&&(0,u.jsxs)(G,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth.toFixed(1),"%"]})]})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsx)("div",{children:(0,u.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:["Avg Order: ",(0,d.vv)(e.averageOrderValue,r.currency)]})}),(0,u.jsxs)("div",{style:{padding:"4px 8px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"#EDE9FE",color:"#5B21B6"},children:["#",t+1]})]})]},`mobile-${e.period}`))]})]}),"daily"===re&&!we.type&&(0,u.jsxs)(te,{children:[(0,u.jsx)(ae,{disabled:1===ze,onClick:()=>Ie(ze-1),children:"Previous"}),(0,u.jsxs)(ne,{children:["Page ",ze," \u2022 Showing ",Te," days"]}),(0,u.jsx)(ae,{disabled:be.length<Te,onClick:()=>Ie(ze+1),children:"Next"})]})]})]})]})})}},2597:(e,t,a)=>{a.d(t,{Ex:()=>c,oz:()=>d,tU:()=>o});a(9950);var n=a(4752),r=a(4414);const i=n.Ay.div`
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
`,o=e=>{let{children:t,className:a,style:n}=e;return(0,r.jsx)(i,{className:a,style:n,children:t})},d=e=>{let{active:t,onClick:a,children:n,className:i}=e;return(0,r.jsx)(s,{active:t,onClick:a,className:i,children:n})},c=e=>{let{count:t,variant:a="default",showZero:n=!1}=e;return 0!==t||n?(0,r.jsx)(l,{variant:a,children:t}):null}},2653:(e,t,a)=>{a.d(t,{M:()=>i});var n=a(9950),r=a(4492);function i(e){const[t,a]=(0,r.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[s,l]=(0,n.useState)(i());return[s,(0,n.useCallback)(e=>{l(e),a({tab:e})},[a])]}},8285:(e,t,a)=>{a.d(t,{MA:()=>m,_M:()=>h});const n="cash",r="card",i="ewallet",s="bank_transfer",l="qr",o="counter",d="online",c="fpx",p="staffMeal",x={[n]:"Cash",[r]:"Credit/Debit Card",[i]:"E-Wallet",[s]:"Bank Transfer",[l]:"QR Payment",[o]:"Pay at Counter",[d]:"Online Payment",[c]:"FPX Online Banking",[p]:"Staff Meal"};function h(e){return x[e]||e}const u={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function m(e,t){return e?"card"===e&&t?`Card(${u[t]||t})`:h(e):"N/A"}},8406:(e,t,a)=>{a.d(t,{MQ:()=>o,Vp:()=>l,fU:()=>i,ng:()=>n,oB:()=>s,r6:()=>r});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",r=(e,t,a)=>{if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";const i={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return r.toLocaleString("en-MY",{...i,...a})},i=(e,t)=>r(e,t,{year:void 0,month:void 0,day:void 0}),s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const a=new Date;a.setDate(a.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(a)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},o=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const a=Date.now()-t,n=Math.floor(a/6e4),r=Math.floor(a/36e5),i=Math.floor(a/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===r?"1 hour ago":r<24?`${r} hours ago`:1===i?"1 day ago":`${i} days ago`}}}]);