"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[408],{408:(e,t,a)=>{a.r(t),a.d(t,{default:()=>ne});var n=a(9950),r=a(4752),i=a(2853),s=a(5781),l=a(447),o=a(9018),d=a(6038),c=a(8406),p=a(2597),x=a(2653),h=a(4414);const u=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,m=r.Ay.div`
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
`,g=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,v=r.Ay.div`
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
`,f=r.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,b=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,j=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,w=r.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,F=r.Ay.select`
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
`,S=r.Ay.input`
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
`,A=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,k=r.Ay.div`
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
`,C=r.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,D=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,B=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,E=r.Ay.div`
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
`,T=r.Ay.div`
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
`,M=r.Ay.div`
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
`,z=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,I=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,R=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,O=r.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,P=r.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"member"===e.type?"#ECFDF5":"#F3F4F6"};
  color: ${e=>"member"===e.type?"#059669":"#6B7280"};
`,V=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,N=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.method){case"cash":return"#FEF3C7";case"card":return"#DBEAFE";case"digital_wallet":return"#ECFDF5";case"points":return"#EDE9FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.method){case"cash":return"#D97706";case"card":return"#1E40AF";case"digital_wallet":return"#059669";case"points":return"#5B21B6";default:return"#6B7280"}}};
`,Y=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"completed":return"#E5E7EB";case"refunded":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#374151";case"refunded":return"#DC2626";default:return"#6B7280"}}};
`,L=r.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`,_=r.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,U=r.Ay.div`
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
`,W=r.Ay.div`
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
`,q=r.Ay.span`
  color: #9CA3AF;
  font-size: 14px;
`,H=r.Ay.button`
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
`,K=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
  margin-top: 20px;
`,Q=r.Ay.div`
  padding: 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
`,J=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,X=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
`,ee=r.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 20px;
`,te=r.Ay.button`
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
`,ae=r.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,ne=()=>{const{currentStaff:e,isLoggedIn:t}=(0,s.g)(),{orders:a}=(0,l.h)(),{operationSettings:r}=(0,o.Pj)(),[ne,re]=(0,x.M)("transactions"),[ie,se]=(0,n.useState)("today"),[le,oe]=(0,n.useState)(""),[de,ce]=(0,n.useState)(""),[pe,xe]=(0,n.useState)("all"),[he,ue]=(0,n.useState)("all"),[me,ge]=(0,n.useState)([]),[ve,ye]=(0,n.useState)(null),[fe,be]=(0,n.useState)([]),[je,we]=(0,n.useState)({type:null,value:""}),[Fe,Se]=(0,n.useState)([]),[Ae,ke]=(0,n.useState)((new Date).getFullYear().toString()),[$e,Ce]=(0,n.useState)((new Date).getFullYear()+"-"+String((new Date).getMonth()+1).padStart(2,"0")),[De,Be]=(0,n.useState)(""),[Ee,Te]=(0,n.useState)(50),[Me,ze]=(0,n.useState)(1);(0,n.useEffect)(()=>{Ie()},[a]),(0,n.useEffect)(()=>{"transactions"!==ne&&Re()},[ne,Ae,$e,De,Me]),(0,n.useEffect)(()=>{Le()},[me,ie,le,de,pe,he]),(0,n.useEffect)(()=>{"transactions"!==ne&&Re()},[ne,me,je]);const Ie=()=>{const e=a.filter(e=>"ready"===e.status).map(e=>{var t;let a=new Date;if(e.createdAt){const t=new Date(e.createdAt);isNaN(t.getTime())||(a=t)}return{id:e.id,orderNumber:e.orderNumber||`ORD${e.id.slice(-4)}`,date:a.toISOString().split("T")[0],time:a.toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit"}),customer:{type:"guest",name:(null===(t=e.customer)||void 0===t?void 0:t.name)||"Guest",id:void 0},staff:{id:"staff-1",name:"Staff Member"},items:e.items.map(e=>({name:e.menuItem?e.menuItem.name:`Item ${e.id}`,quantity:e.quantity,price:e.menuItem?e.menuItem.price:10,total:e.menuItem?e.menuItem.price*e.quantity:10*e.quantity})),subtotal:e.subtotal||e.total||0,tax:e.tax||0,discount:e.discount||0,total:e.total||0,paymentMethod:e.paymentMethod||"cash",status:"completed"}}).sort((e,t)=>new Date(`${t.date} ${t.time}`).getTime()-new Date(`${e.date} ${e.time}`).getTime());ge(e)},Re=()=>{if(0===me.length)return;let e=[];const t={};let a=me;a=je.type?Pe():Oe(me),a.forEach(e=>{let a="";const n=new Date(e.date);if("year"===je.type)a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;else if("month"===je.type)a=e.date;else switch(ne){case"yearly":a=n.getFullYear().toString();break;case"monthly":a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;break;case"daily":a=e.date}t[a]||(t[a]=[]),t[a].push(e)});const n=Object.keys(t).sort().reverse();e=n.map((e,a)=>{const r=t[e],i=r.reduce((e,t)=>e+t.total,0),s=r.length,l=s>0?i/s:0;let o;if(a<n.length-1){const e=n[a+1],r=t[e].reduce((e,t)=>e+t.total,0);r>0&&(o=(i-r)/r*100)}let d="";if("year"===je.type){const[t,a]=e.split("-");d=`${t}-${a.padStart(2,"0")}`}else if("month"===je.type)d=new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"});else switch(ne){case"yearly":d=`${e}`;break;case"monthly":const[t,a]=e.split("-");d=`${t}-${a.padStart(2,"0")}`;break;case"daily":d=new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}return{period:d,totalSales:i,totalTransactions:s,averageOrderValue:l,growth:o}}),be(e)},Oe=e=>{let t=[...e];if("yearly"===ne){"all"!==Ae&&(t=t.filter(e=>e.date.startsWith(Ae)));const e="all"===Ae?(new Date).getFullYear()-4:parseInt(Ae),a="all"===Ae?(new Date).getFullYear():parseInt(Ae);t=t.filter(t=>{const n=parseInt(t.date.split("-")[0]);return n>=e&&n<=a})}else if("monthly"===ne){const e=$e.split("-")[0];t=t.filter(t=>t.date.startsWith(e))}else if("daily"===ne){const e=De||$e;t=t.filter(t=>t.date.startsWith(e));const a=(Me-1)*Ee,n=t.sort((e,t)=>t.date.localeCompare(e.date));t=n.slice(a,a+Ee)}return t},Pe=()=>je.type&&je.value?me.filter(e=>{const t=new Date(e.date);if("year"===je.type)return t.getFullYear().toString()===je.value;if("month"===je.type){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`===je.value}return"day"!==je.type||e.date===je.value}):me,Ve=e=>{if("year"===je.type){const t=e.period;we({type:"month",value:t,parentValue:je.value})}else if("month"===je.type){const t=me.filter(t=>{const a=new Date(t.date);return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`===je.value&&t.date===Ne(e.period,je.value)});Se(t),we({type:"day",value:Ne(e.period,je.value),parentValue:je.value})}else if("yearly"===ne){const t=e.period;we({type:"year",value:t})}else if("monthly"===ne){const t=e.period;we({type:"month",value:t})}else if("daily"===ne){const t=Ne(e.period);console.log("Daily click - Period:",e.period,"Target Date:",t);const a=me.filter(e=>(console.log("Checking transaction date:",e.date,"vs target:",t),e.date===t));console.log("Found transactions:",a.length),Se(a),we({type:"day",value:t})}},Ne=(e,t)=>{if(e.match(/^[A-Za-z]{3}\s+\d+$/)){const a=(new Date).getFullYear(),n=new Date(e+", "+a);if(t){const[e]=t.split("-");n.setFullYear(parseInt(e))}return n.toISOString().split("T")[0]}if(e.match(/^[A-Za-z]{3}\s+\d+,\s+\d{4}$/)){return new Date(e).toISOString().split("T")[0]}if(e.match(/^\d{4}-\d{2}-\d{2}$/))return e;const a=new Date(e);return isNaN(a.getTime())?"":a.toISOString().split("T")[0]},Ye=()=>{let e=me;const t=(null===r||void 0===r?void 0:r.timeZone)||"Asia/Kuala_Lumpur",a=(0,c.oB)(t);switch(ie){case"today":e=e.filter(e=>e.date===a);break;case"yesterday":const n=(0,c.Vp)(-1,t);e=e.filter(e=>e.date===n);break;case"this_week":const r=(0,c.Vp)(-6,t);e=e.filter(e=>e.date>=r&&e.date<=a);break;case"this_month":const i=(0,c.Vp)(-29,t);e=e.filter(e=>e.date>=i&&e.date<=a);break;case"custom":le&&de&&(e=e.filter(e=>e.date>=le&&e.date<=de))}return"all"!==pe&&(e=e.filter(e=>e.paymentMethod===pe)),"all"!==he&&(e=e.filter(e=>e.status===he)),e},Le=()=>{const e=Ye(),t=e.reduce((e,t)=>e+t.total,0),a=e.length,n=a>0?t/a:0,r=e.reduce((e,t)=>e+t.tax,0),i=e.reduce((e,t)=>e+t.discount,0),s=e.filter(e=>"cash"===e.paymentMethod).reduce((e,t)=>e+t.total,0),l=e.filter(e=>"card"===e.paymentMethod).reduce((e,t)=>e+t.total,0),o=e.filter(e=>"digital_wallet"===e.paymentMethod).reduce((e,t)=>e+t.total,0),d=e.filter(e=>"points"===e.paymentMethod).reduce((e,t)=>e+t.total,0);ye({totalSales:t,totalTransactions:a,averageOrderValue:n,totalTax:r,totalDiscount:i,cashSales:s,cardSales:l,digitalWalletSales:o,pointsSales:d})},_e=(e,t)=>{const a=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a"),r=URL.createObjectURL(a);n.setAttribute("href",r),n.setAttribute("download",t),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)},Ue=()=>{const e=Ye(),t={cash:e.filter(e=>"cash"===e.paymentMethod).reduce((e,t)=>e+t.total,0),card:e.filter(e=>"card"===e.paymentMethod).reduce((e,t)=>e+t.total,0),digital_wallet:e.filter(e=>"digital_wallet"===e.paymentMethod).reduce((e,t)=>e+t.total,0),points:e.filter(e=>"points"===e.paymentMethod).reduce((e,t)=>e+t.total,0)},a={member:e.filter(e=>"member"===e.customer.type).reduce((e,t)=>e+t.total,0),guest:e.filter(e=>"guest"===e.customer.type).reduce((e,t)=>e+t.total,0)},n=e.filter(e=>"completed"===e.status).length,r=(e.filter(e=>"refunded"===e.status).length,e.filter(e=>"cancelled"===e.status).length,Object.entries(e.reduce((e,t)=>(e[t.staff.name]=(e[t.staff.name]||0)+t.total,e),{})).sort((e,t)=>t[1]-e[1]).slice(0,5)),i=e.reduce((e,t)=>e+t.total,0),s=e.length,l=`\n<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Sales Report - ${(new Date).toLocaleDateString()}</title>\n    <style>\n        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }\n        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }\n        .title { font-size: 28px; font-weight: 600; color: #0A2540; margin-bottom: 10px; }\n        .subtitle { font-size: 16px; color: #6B7C93; }\n        .section { margin-bottom: 30px; }\n        .section-title { font-size: 20px; font-weight: 600; color: #0A2540; margin-bottom: 15px; border-bottom: 1px solid #E6EBF1; padding-bottom: 5px; }\n        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }\n        .stat-card { background: #F8FAFC; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; text-align: center; }\n        .stat-value { font-size: 24px; font-weight: 600; color: #0A2540; margin-bottom: 5px; }\n        .stat-label { font-size: 14px; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.5px; }\n        .breakdown { background: white; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; margin-bottom: 20px; }\n        .breakdown-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F6F9FC; }\n        .breakdown-item:last-child { border-bottom: none; }\n        .breakdown-label { font-weight: 500; }\n        .breakdown-value { font-weight: 600; color: #0A2540; }\n        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E6EBF1; padding-top: 20px; }\n    </style>\n</head>\n<body>\n    <div class="header">\n        <div class="title">Sales Report</div>\n        <div class="subtitle">Generated on ${(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>\n        <div class="subtitle">Period: ${"custom"===ie&&le&&de?`${le} to ${de}`:ie.replace("_"," ")}</div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Summary</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">RM ${i.toFixed(2)}</div>\n                <div class="stat-label">Total Sales</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${s}</div>\n                <div class="stat-label">Total Transactions</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${(i/s||0).toFixed(2)}</div>\n                <div class="stat-label">Average Order Value</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${(n/s*100).toFixed(1)}%</div>\n                <div class="stat-label">Success Rate</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Payment Method Breakdown</div>\n        <div class="breakdown">\n            <div class="breakdown-item">\n                <span class="breakdown-label">Cash</span>\n                <span class="breakdown-value">RM ${t.cash.toFixed(2)} (${(t.cash/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Card</span>\n                <span class="breakdown-value">RM ${t.card.toFixed(2)} (${(t.card/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Digital Wallet</span>\n                <span class="breakdown-value">RM ${t.digital_wallet.toFixed(2)} (${(t.digital_wallet/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Points</span>\n                <span class="breakdown-value">RM ${t.points.toFixed(2)} (${(t.points/i*100).toFixed(1)}%)</span>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Customer Type Analysis</div>\n        <div class="breakdown">\n            <div class="breakdown-item">\n                <span class="breakdown-label">Members</span>\n                <span class="breakdown-value">RM ${a.member.toFixed(2)} (${(a.member/i*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">Guests</span>\n                <span class="breakdown-value">RM ${a.guest.toFixed(2)} (${(a.guest/i*100).toFixed(1)}%)</span>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Top Performing Staff</div>\n        <div class="breakdown">\n            ${r.map(e=>{let[t,a]=e;return`\n                <div class="breakdown-item">\n                    <span class="breakdown-label">${t}</span>\n                    <span class="breakdown-value">RM ${a.toFixed(2)}</span>\n                </div>\n            `}).join("")}\n        </div>\n    </div>\n\n    <div class="footer">\n        <p>Generated by Purple Here POS</p>\n        <p>\ud83e\udd16 Generated with Claude Code</p>\n    </div>\n</body>\n</html>`;_e(l,`sales-report-${(new Date).toISOString().split("T")[0]}.html`)},Ge=()=>{const e=fe.reduce((e,t)=>e+t.totalSales,0),t=fe.reduce((e,t)=>e+t.totalTransactions,0),a=fe.filter(e=>void 0!==e.growth).reduce((e,t)=>e+(t.growth||0),0)/fe.filter(e=>void 0!==e.growth).length,n=fe.reduce((e,t)=>t.totalSales>e.totalSales?t:e,fe[0]),r=fe.reduce((e,t)=>t.totalSales<e.totalSales?t:e,fe[0]),i=`\n<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>${ne.charAt(0).toUpperCase()+ne.slice(1)} Sales Report - ${(new Date).toLocaleDateString()}</title>\n    <style>\n        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }\n        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }\n        .title { font-size: 28px; font-weight: 600; color: #0A2540; margin-bottom: 10px; }\n        .subtitle { font-size: 16px; color: #6B7C93; }\n        .section { margin-bottom: 30px; }\n        .section-title { font-size: 20px; font-weight: 600; color: #0A2540; margin-bottom: 15px; border-bottom: 1px solid #E6EBF1; padding-bottom: 5px; }\n        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }\n        .stat-card { background: #F8FAFC; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; text-align: center; }\n        .stat-value { font-size: 24px; font-weight: 600; color: #0A2540; margin-bottom: 5px; }\n        .stat-label { font-size: 14px; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.5px; }\n        .period-table { width: 100%; border-collapse: collapse; margin: 20px 0; }\n        .period-table th, .period-table td { padding: 12px; text-align: left; border-bottom: 1px solid #E6EBF1; }\n        .period-table th { background: #F8FAFC; font-weight: 600; color: #0A2540; }\n        .growth-positive { color: #059669; font-weight: 600; }\n        .growth-negative { color: #DC2626; font-weight: 600; }\n        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E6EBF1; padding-top: 20px; }\n    </style>\n</head>\n<body>\n    <div class="header">\n        <div class="title">${ne.charAt(0).toUpperCase()+ne.slice(1)} Sales Report</div>\n        <div class="subtitle">Generated on ${(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Overall Summary</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">${fe.length}</div>\n                <div class="stat-label">Total Periods</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${e.toFixed(2)}</div>\n                <div class="stat-label">Total Sales</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${t.toLocaleString()}</div>\n                <div class="stat-label">Total Transactions</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${a.toFixed(1)}%</div>\n                <div class="stat-label">Average Growth</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Performance Highlights</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">RM ${n.totalSales.toFixed(2)}</div>\n                <div class="stat-label">Best Period: ${n.period}</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${r.totalSales.toFixed(2)}</div>\n                <div class="stat-label">Lowest Period: ${r.period}</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">Detailed Breakdown</div>\n        <table class="period-table">\n            <thead>\n                <tr>\n                    <th>Period</th>\n                    <th>Total Sales</th>\n                    <th>Transactions</th>\n                    <th>Avg Order Value</th>\n                    <th>Growth Rate</th>\n                </tr>\n            </thead>\n            <tbody>\n                ${fe.map(e=>`\n                    <tr>\n                        <td>${e.period}</td>\n                        <td>RM ${e.totalSales.toFixed(2)}</td>\n                        <td>${e.totalTransactions.toLocaleString()}</td>\n                        <td>RM ${e.averageOrderValue.toFixed(2)}</td>\n                        <td class="${e.growth&&e.growth>0?"growth-positive":"growth-negative"}">\n                            ${e.growth?(e.growth>0?"+":"")+e.growth.toFixed(1)+"%":"N/A"}\n                        </td>\n                    </tr>\n                `).join("")}\n            </tbody>\n        </table>\n    </div>\n\n    <div class="footer">\n        <p>Generated by Purple Here POS</p>\n        <p>\ud83e\udd16 Generated with Claude Code</p>\n    </div>\n</body>\n</html>`;_e(i,`sales-${"yearly"===ne?"yearly":"monthly"===ne?"monthly":"daily"}-report-${(new Date).toISOString().split("T")[0]}.html`)},We=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});if(!t||!e||!["admin","manager"].includes(e.role))return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(u,{children:(0,h.jsxs)(i.pp,{children:[(0,h.jsx)(L,{children:"\ud83d\udeab"}),(0,h.jsx)(_,{children:"Access Denied"}),(0,h.jsx)("p",{style:{fontSize:"14px",color:"#9CA3AF"},children:"You need admin or manager privileges to access sales management."})]})})});const Ze=Ye();return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(u,{children:[(0,h.jsxs)(m,{children:[(0,h.jsx)(g,{children:"Sales Management"}),(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{variant:"secondary",onClick:()=>{if("transactions"===ne){const e=[["Order Number","Date","Time","Customer Type","Customer Name","Staff","Items","Subtotal","Tax","Discount","Total","Payment Method","Status"],...Ye().map(e=>[e.orderNumber,e.date,e.time,e.customer.type,e.customer.name,e.staff.name,e.items.map(e=>`${e.name} (${e.quantity}x)`).join("; "),e.subtotal.toFixed(2),e.tax.toFixed(2),e.discount.toFixed(2),e.total.toFixed(2),e.paymentMethod,e.status])].map(e=>e.map(e=>`"${e}"`).join(",")).join("\n");_e(e,`sales-transactions-${(new Date).toISOString().split("T")[0]}.csv`)}else{const e=[["Period","Total Sales (RM)","Total Transactions","Average Order Value (RM)","Growth Rate (%)"],...fe.map(e=>[e.period,e.totalSales.toFixed(2),e.totalTransactions,e.averageOrderValue.toFixed(2),e.growth?e.growth.toFixed(2):"N/A"])].map(e=>e.map(e=>`"${e}"`).join(",")).join("\n");_e(e,`sales-${"yearly"===ne?"yearly":"monthly"===ne?"monthly":"daily"}-${(new Date).toISOString().split("T")[0]}.csv`)}},children:"Export CSV"}),(0,h.jsx)(y,{variant:"primary",onClick:()=>{"transactions"===ne?Ue():Ge()},children:"Generate Report"})]})]}),(0,h.jsxs)(f,{children:[(0,h.jsxs)(p.tU,{children:[(0,h.jsx)(p.oz,{active:"transactions"===ne,onClick:()=>{re("transactions"),we({type:null,value:""}),Se([])},children:"Transactions"}),(0,h.jsx)(p.oz,{active:"yearly"===ne,onClick:()=>{re("yearly"),we({type:null,value:""}),Se([])},children:"Yearly Sales"}),(0,h.jsx)(p.oz,{active:"monthly"===ne,onClick:()=>{re("monthly"),we({type:null,value:""}),Se([])},children:"Monthly Sales"}),(0,h.jsx)(p.oz,{active:"daily"===ne,onClick:()=>{re("daily"),we({type:null,value:""}),Se([])},children:"Daily Sales"})]}),"transactions"===ne&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(b,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Time Period"}),(0,h.jsxs)(F,{value:ie,onChange:e=>se(e.target.value),children:[(0,h.jsx)("option",{value:"today",children:"Today"}),(0,h.jsx)("option",{value:"yesterday",children:"Yesterday"}),(0,h.jsx)("option",{value:"this_week",children:"This Week"}),(0,h.jsx)("option",{value:"this_month",children:"This Month"}),(0,h.jsx)("option",{value:"custom",children:"Custom Range"})]})]}),"custom"===ie&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Start Date"}),(0,h.jsx)(S,{type:"date",value:le,onChange:e=>oe(e.target.value)})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"End Date"}),(0,h.jsx)(S,{type:"date",value:de,onChange:e=>ce(e.target.value)})]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Payment Method"}),(0,h.jsxs)(F,{value:pe,onChange:e=>xe(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Methods"}),(0,h.jsx)("option",{value:"cash",children:"Cash"}),(0,h.jsx)("option",{value:"card",children:"Card"}),(0,h.jsx)("option",{value:"digital_wallet",children:"Digital Wallet"}),(0,h.jsx)("option",{value:"points",children:"Points"})]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Status"}),(0,h.jsxs)(F,{value:he,onChange:e=>ue(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"completed",children:"Completed"}),(0,h.jsx)("option",{value:"refunded",children:"Refunded"}),(0,h.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]})]}),ve&&(0,h.jsxs)(A,{children:[(0,h.jsxs)(k,{color:"#059669",children:[(0,h.jsx)($,{children:"Total Sales"}),(0,h.jsx)(C,{children:(0,d.vv)(ve.totalSales,r.currency)}),(0,h.jsxs)(D,{children:[ve.totalTransactions," transactions"]})]}),(0,h.jsxs)(k,{color:"#2563EB",children:[(0,h.jsx)($,{children:"Average Order"}),(0,h.jsx)(C,{children:(0,d.vv)(ve.averageOrderValue,r.currency)}),(0,h.jsx)(D,{children:"+12.5% vs last period"})]}),(0,h.jsxs)(k,{color:"#DC2626",children:[(0,h.jsx)($,{children:"Total Tax"}),(0,h.jsx)(C,{children:(0,d.vv)(ve.totalTax,r.currency)}),(0,h.jsx)(D,{children:"GST collected"})]}),(0,h.jsxs)(k,{color:"#7C3AED",children:[(0,h.jsx)($,{children:"Total Discounts"}),(0,h.jsx)(C,{children:(0,d.vv)(ve.totalDiscount,r.currency)}),(0,h.jsx)(D,{children:"Promotions applied"})]})]}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(E,{children:[(0,h.jsx)("span",{children:"Order #"}),(0,h.jsx)("span",{children:"Date & Time"}),(0,h.jsx)("span",{children:"Customer"}),(0,h.jsx)("span",{children:"Staff"}),(0,h.jsx)("span",{children:"Subtotal"}),(0,h.jsx)("span",{children:"Total"}),(0,h.jsx)("span",{children:"Payment"}),(0,h.jsx)("span",{children:"Status"})]}),0===Ze.length?(0,h.jsxs)(i.pp,{children:[(0,h.jsx)(_,{children:"No sales transactions found for the selected criteria"}),(0,h.jsx)(y,{variant:"secondary",children:"Clear Filters"})]}):(0,h.jsxs)(h.Fragment,{children:[Ze.map(e=>(0,h.jsxs)(T,{children:[(0,h.jsx)(z,{children:e.orderNumber}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:We(e.date)}),(0,h.jsx)(I,{children:e.time})]}),(0,h.jsx)(R,{children:(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)(O,{children:e.customer.name}),(0,h.jsx)(P,{type:e.customer.type,children:e.customer.type})]})}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#1F2937"},children:e.staff.name}),(0,h.jsx)(V,{children:(0,d.vv)(e.subtotal,r.currency)}),(0,h.jsx)(V,{children:(0,d.vv)(e.total,r.currency)}),(0,h.jsx)(N,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")}),(0,h.jsx)(Y,{status:e.status,children:e.status})]},e.id)),Ze.map(e=>(0,h.jsxs)(M,{children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(z,{children:e.orderNumber}),(0,h.jsxs)(I,{children:[We(e.date)," \u2022 ",e.time]})]}),(0,h.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,h.jsx)(V,{children:(0,d.vv)(e.total,r.currency)}),(0,h.jsx)(Y,{status:e.status,children:e.status})]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)(R,{children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,h.jsx)(O,{children:e.customer.name}),(0,h.jsx)(P,{type:e.customer.type,children:e.customer.type})]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Staff: ",e.staff.name]})]}),(0,h.jsx)(N,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")})]})]},`mobile-${e.id}`))]})]})]}),"transactions"!==ne&&(0,h.jsxs)(h.Fragment,{children:[!je.type&&(0,h.jsxs)(b,{children:["yearly"===ne&&(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Year Range"}),(0,h.jsxs)(F,{value:Ae,onChange:e=>ke(e.target.value),children:[(0,h.jsx)("option",{value:"2024",children:"2024"}),(0,h.jsx)("option",{value:"2023",children:"2023"}),(0,h.jsx)("option",{value:"2022",children:"2022"}),(0,h.jsx)("option",{value:"2021",children:"2021"}),(0,h.jsx)("option",{value:"all",children:"All Years"})]})]}),"monthly"===ne&&(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Select Year"}),(0,h.jsxs)(F,{value:$e.split("-")[0],onChange:e=>Ce(e.target.value+"-01"),children:[(0,h.jsx)("option",{value:"2024",children:"2024"}),(0,h.jsx)("option",{value:"2023",children:"2023"}),(0,h.jsx)("option",{value:"2022",children:"2022"}),(0,h.jsx)("option",{value:"2021",children:"2021"})]})]}),"daily"===ne&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Select Month"}),(0,h.jsx)(S,{type:"month",value:De||$e,onChange:e=>Be(e.target.value)})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Page Size"}),(0,h.jsxs)(F,{value:Ee.toString(),onChange:e=>Te(parseInt(e.target.value)),children:[(0,h.jsx)("option",{value:"25",children:"25 days"}),(0,h.jsx)("option",{value:"50",children:"50 days"}),(0,h.jsx)("option",{value:"100",children:"100 days"})]})]})]})]}),je.type&&(0,h.jsx)(H,{onClick:()=>{"day"===je.type?(je.parentValue?we({type:"month",value:je.parentValue}):we({type:null,value:""}),Se([])):"month"===je.type?je.parentValue?we({type:"year",value:je.parentValue}):we({type:null,value:""}):"year"===je.type&&we({type:null,value:""})},children:"\u2190 Back"}),je.type&&(0,h.jsxs)(W,{children:[(0,h.jsxs)(Z,{clickable:!0,onClick:()=>we({type:null,value:""}),children:["yearly"===ne?"Yearly":"monthly"===ne?"Monthly":"Daily"," Sales"]}),"year"===je.type&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(q,{children:">"}),(0,h.jsxs)(Z,{children:[je.value," Monthly Details"]})]}),"month"===je.type&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(q,{children:">"}),je.parentValue&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(Z,{clickable:!0,onClick:()=>we({type:"year",value:je.parentValue}),children:["Year ",je.parentValue]}),(0,h.jsx)(q,{children:">"})]}),(0,h.jsxs)(Z,{children:[je.value.split("-")[0],"-",je.value.split("-")[1]," Daily Details"]})]}),"day"===je.type&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(q,{children:">"}),je.parentValue&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(Z,{clickable:!0,onClick:()=>we({type:"month",value:je.parentValue}),children:[je.parentValue.split("-")[0],"-",je.parentValue.split("-")[1]]}),(0,h.jsx)(q,{children:">"})]}),(0,h.jsxs)(Z,{children:[new Date(je.value).toLocaleDateString("en-US")," Transaction Details"]})]})]}),ve&&(0,h.jsxs)(A,{children:[(0,h.jsxs)(k,{color:"#635BFF",children:[(0,h.jsxs)($,{children:["Total ","year"===je.type?"Months":"month"===je.type?"Days":"yearly"===ne?"Years":"monthly"===ne?"Months":"Days"]}),(0,h.jsx)(C,{children:fe.length}),(0,h.jsx)(D,{children:"Reporting Period"})]}),(0,h.jsxs)(k,{color:"#635BFF",children:[(0,h.jsx)($,{children:"Total Sales"}),(0,h.jsx)(C,{children:(0,d.vv)(fe.reduce((e,t)=>e+t.totalSales,0),r.currency)}),(0,h.jsx)(D,{children:"Cumulative Amount"})]}),(0,h.jsxs)(k,{color:"#635BFF",children:[(0,h.jsx)($,{children:"Average Sales"}),(0,h.jsx)(C,{children:(0,d.vv)(fe.length>0?fe.reduce((e,t)=>e+t.totalSales,0)/fe.length:0,r.currency)}),(0,h.jsx)(D,{children:"Per Period Average"})]}),(0,h.jsxs)(k,{color:"#635BFF",children:[(0,h.jsx)($,{children:"Highest Sales"}),(0,h.jsx)(C,{children:(0,d.vv)(fe.length>0?Math.max(...fe.map(e=>e.totalSales)):0,r.currency)}),(0,h.jsx)(D,{children:"Peak Record"})]})]}),"day"===je.type&&(0,h.jsxs)(K,{children:[(0,h.jsxs)(Q,{children:[(0,h.jsxs)(J,{children:[new Date(je.value).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})," Transaction History"]}),(0,h.jsxs)(X,{children:["Total ",Fe.length," transactions \u2022 Total sales ",(0,d.vv)(Fe.reduce((e,t)=>e+t.total,0),r.currency)]})]}),(0,h.jsxs)(B,{style:{border:"none",borderRadius:"0"},children:[(0,h.jsxs)(E,{children:[(0,h.jsx)("span",{children:"Order #"}),(0,h.jsx)("span",{children:"Time"}),(0,h.jsx)("span",{children:"Customer"}),(0,h.jsx)("span",{children:"Staff"}),(0,h.jsx)("span",{children:"Subtotal"}),(0,h.jsx)("span",{children:"Total"}),(0,h.jsx)("span",{children:"Payment"}),(0,h.jsx)("span",{children:"Status"})]}),0===Fe.length?(0,h.jsxs)(i.pp,{children:[(0,h.jsx)(L,{children:"\ud83d\udccb"}),(0,h.jsx)(_,{children:"No transactions found for this date"})]}):(0,h.jsxs)(h.Fragment,{children:[Fe.map(e=>(0,h.jsxs)(T,{children:[(0,h.jsx)(z,{children:e.orderNumber}),(0,h.jsx)(I,{children:e.time}),(0,h.jsx)(R,{children:(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)(O,{children:e.customer.name}),(0,h.jsx)(P,{type:e.customer.type,children:e.customer.type})]})}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#1F2937"},children:e.staff.name}),(0,h.jsx)(V,{children:(0,d.vv)(e.subtotal,r.currency)}),(0,h.jsx)(V,{children:(0,d.vv)(e.total,r.currency)}),(0,h.jsx)(N,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")}),(0,h.jsx)(Y,{status:e.status,children:e.status})]},e.id)),Fe.map(e=>(0,h.jsxs)(M,{children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(z,{children:e.orderNumber}),(0,h.jsx)(I,{children:e.time})]}),(0,h.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,h.jsx)(V,{children:(0,d.vv)(e.total,r.currency)}),(0,h.jsx)(Y,{status:e.status,children:e.status})]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)(R,{children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,h.jsx)(O,{children:e.customer.name}),(0,h.jsx)(P,{type:e.customer.type,children:e.customer.type})]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Staff: ",e.staff.name]})]}),(0,h.jsx)(N,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")})]})]},`mobile-detail-${e.id}`))]})]})]}),"day"!==je.type&&(0,h.jsxs)(B,{children:[(0,h.jsxs)(E,{children:[(0,h.jsx)("span",{children:"Period"}),(0,h.jsx)("span",{children:"Total Sales"}),(0,h.jsx)("span",{children:"Transactions"}),(0,h.jsx)("span",{children:"Avg Order Value"}),(0,h.jsx)("span",{children:"Growth Rate"}),(0,h.jsx)("span",{children:"Sales Rank"}),(0,h.jsx)("span",{}),(0,h.jsx)("span",{})]}),0===fe.length?(0,h.jsx)(i.pp,{children:(0,h.jsx)(_,{children:"No data available for aggregation"})}):(0,h.jsxs)(h.Fragment,{children:[fe.map((e,t)=>(0,h.jsxs)(T,{onClick:()=>Ve(e),children:[(0,h.jsx)(U,{style:{fontSize:"16px",fontWeight:"600"},children:e.period}),(0,h.jsx)(V,{children:(0,d.vv)(e.totalSales,r.currency)}),(0,h.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:e.totalTransactions.toLocaleString()}),(0,h.jsx)(V,{children:(0,d.vv)(e.averageOrderValue,r.currency)}),(0,h.jsx)("div",{children:void 0!==e.growth?(0,h.jsxs)(G,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth.toFixed(1),"%"]}):(0,h.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:"N/A"})}),(0,h.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF"},children:["#",t+1]}),(0,h.jsx)("div",{}),(0,h.jsx)("div",{})]},e.period)),fe.map((e,t)=>(0,h.jsxs)(M,{onClick:()=>Ve(e),children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(U,{style:{fontSize:"16px",fontWeight:"600",marginBottom:"4px"},children:e.period}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[e.totalTransactions.toLocaleString()," transactions"]})]}),(0,h.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,h.jsx)(V,{children:(0,d.vv)(e.totalSales,r.currency)}),void 0!==e.growth&&(0,h.jsxs)(G,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth.toFixed(1),"%"]})]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsx)("div",{children:(0,h.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:["Avg Order: ",(0,d.vv)(e.averageOrderValue,r.currency)]})}),(0,h.jsxs)("div",{style:{padding:"4px 8px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"#EDE9FE",color:"#5B21B6"},children:["#",t+1]})]})]},`mobile-${e.period}`))]})]}),"daily"===ne&&!je.type&&(0,h.jsxs)(ee,{children:[(0,h.jsx)(te,{disabled:1===Me,onClick:()=>ze(Me-1),children:"Previous"}),(0,h.jsxs)(ae,{children:["Page ",Me," \u2022 Showing ",Ee," days"]}),(0,h.jsx)(te,{disabled:fe.length<Ee,onClick:()=>ze(Me+1),children:"Next"})]})]})]})]})})}},2597:(e,t,a)=>{a.d(t,{Ex:()=>c,oz:()=>d,tU:()=>o});a(9950);var n=a(4752),r=a(4414);const i=n.Ay.div`
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
`,o=e=>{let{children:t,className:a,style:n}=e;return(0,r.jsx)(i,{className:a,style:n,children:t})},d=e=>{let{active:t,onClick:a,children:n,className:i}=e;return(0,r.jsx)(s,{active:t,onClick:a,className:i,children:n})},c=e=>{let{count:t,variant:a="default",showZero:n=!1}=e;return 0!==t||n?(0,r.jsx)(l,{variant:a,children:t}):null}},2653:(e,t,a)=>{a.d(t,{M:()=>i});var n=a(9950),r=a(4492);function i(e){const[t,a]=(0,r.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[s,l]=(0,n.useState)(i());return[s,(0,n.useCallback)(e=>{l(e),a({tab:e})},[a])]}},8406:(e,t,a)=>{a.d(t,{MQ:()=>o,Vp:()=>l,fU:()=>i,ng:()=>n,oB:()=>s,r6:()=>r});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",r=(e,t,a)=>{if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";const i={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return r.toLocaleString("en-MY",{...i,...a})},i=(e,t)=>r(e,t,{year:void 0,month:void 0,day:void 0}),s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const a=new Date;a.setDate(a.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(a)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},o=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const a=Date.now()-t,n=Math.floor(a/6e4),r=Math.floor(a/36e5),i=Math.floor(a/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===r?"1 hour ago":r<24?`${r} hours ago`:1===i?"1 day ago":`${i} days ago`}}}]);