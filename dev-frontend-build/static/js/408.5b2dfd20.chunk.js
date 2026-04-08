"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[408],{408:(e,t,a)=>{a.r(t),a.d(t,{default:()=>ne});var s=a(9950),r=a(4752),n=a(2853),i=a(5781),l=a(447),o=a(9018),d=a(6038),c=a(8285),p=a(8406),x=a(2597),h=a(2653),u=a(5030),g=a(4414);const m=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,v=r.Ay.div`
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
`,y=r.Ay.h1`
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
`,b=r.Ay.button`
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
`,j=r.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,w=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,F=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,S=r.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,A=r.Ay.select`
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
`,P=r.Ay.input`
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
`,$=r.Ay.div`
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
`,C=r.Ay.div`
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
`,M=r.Ay.div`
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
`,z=r.Ay.div`
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
`,T=r.Ay.div`
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
`,V=r.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,Y=r.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"member"===e.type?"#ECFDF5":"#F3F4F6"};
  color: ${e=>"member"===e.type?"#059669":"#6B7280"};
`,L=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,_=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.method){case"cash":return"#FEF3C7";case"card":return"#DBEAFE";case"digital_wallet":return"#ECFDF5";case"points":return"#EDE9FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.method){case"cash":return"#D97706";case"card":return"#1E40AF";case"digital_wallet":return"#059669";case"points":return"#5B21B6";default:return"#6B7280"}}};
`,N=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"completed":return"#E5E7EB";case"refunded":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#374151";case"refunded":return"#DC2626";default:return"#6B7280"}}};
`,U=r.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`,W=r.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,q=r.Ay.div`
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
`,H=r.Ay.span`
  font-size: 14px;
  color: ${e=>e.clickable?"#635BFF":"#6B7280"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  font-weight: 500;
  
  &:hover {
    ${e=>e.clickable&&"\n      color: #5A51E6;\n      text-decoration: underline;\n    "}
  }
`,K=r.Ay.span`
  color: #9CA3AF;
  font-size: 14px;
`,Q=r.Ay.button`
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
`,X=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
  margin-top: 20px;
`,J=r.Ay.div`
  padding: 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
`,ee=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,te=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
`,ae=r.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 20px;
`,se=r.Ay.button`
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
`,re=r.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,ne=()=>{const{t:e}=(0,u.Bd)("reports"),{currentStaff:t,isLoggedIn:a}=(0,i.g)(),{orders:r}=(0,l.h)(),{operationSettings:ne,paymentSettings:ie}=(0,o.Pj)(),[le,oe]=(0,h.M)("transactions"),[de,ce]=(0,s.useState)("today"),[pe,xe]=(0,s.useState)(""),[he,ue]=(0,s.useState)(""),[ge,me]=(0,s.useState)("all"),[ve,ye]=(0,s.useState)("all"),[fe,be]=(0,s.useState)([]),[je,we]=(0,s.useState)(null),[Fe,Se]=(0,s.useState)([]),[Ae,Pe]=(0,s.useState)({type:null,value:""}),[ke,$e]=(0,s.useState)([]),[Ce,De]=(0,s.useState)((new Date).getFullYear().toString()),[Be,Ee]=(0,s.useState)((new Date).getFullYear()+"-"+String((new Date).getMonth()+1).padStart(2,"0")),[Me,ze]=(0,s.useState)(""),[Te,Ie]=(0,s.useState)(50),[Re,Oe]=(0,s.useState)(1);(0,s.useEffect)(()=>{Ve()},[r]),(0,s.useEffect)(()=>{"transactions"!==le&&Ye()},[le,Ce,Be,Me,Re]),(0,s.useEffect)(()=>{qe()},[fe,de,pe,he,ge,ve]),(0,s.useEffect)(()=>{"transactions"!==le&&Ye()},[le,fe,Ae]);const Ve=()=>{const e=r.filter(e=>"ready"===e.status).map(e=>{var t;let a=new Date;if(e.createdAt){const t=new Date(e.createdAt);isNaN(t.getTime())||(a=t)}return{id:e.id,orderNumber:e.orderNumber||`ORD${e.id.slice(-4)}`,date:a.toISOString().split("T")[0],time:a.toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit"}),customer:{type:"guest",name:(null===(t=e.customer)||void 0===t?void 0:t.name)||"Guest",id:void 0},staff:{id:"staff-1",name:"Staff Member"},items:e.items.map(e=>({name:e.menuItem?e.menuItem.name:`Item ${e.id}`,quantity:e.quantity,price:e.menuItem?e.menuItem.price:10,total:e.menuItem?e.menuItem.price*e.quantity:10*e.quantity})),subtotal:e.subtotal||e.total||0,tax:e.tax||0,discount:e.discount||0,total:e.total||0,paymentMethod:e.paymentMethod||"cash",cardType:e.card_type||e.cardType||null,status:"completed"}}).sort((e,t)=>new Date(`${t.date} ${t.time}`).getTime()-new Date(`${e.date} ${e.time}`).getTime());be(e)},Ye=()=>{if(0===fe.length)return;let e=[];const t={};let a=fe;a=Ae.type?_e():Le(fe),a.forEach(e=>{let a="";const s=new Date(e.date);if("year"===Ae.type)a=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}`;else if("month"===Ae.type)a=e.date;else switch(le){case"yearly":a=s.getFullYear().toString();break;case"monthly":a=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}`;break;case"daily":a=e.date}t[a]||(t[a]=[]),t[a].push(e)});const s=Object.keys(t).sort().reverse();e=s.map((e,a)=>{const r=t[e],n=r.reduce((e,t)=>e+t.total,0),i=r.length,l=i>0?n/i:0;let o;if(a<s.length-1){const e=s[a+1],r=t[e].reduce((e,t)=>e+t.total,0);r>0&&(o=(n-r)/r*100)}let d="";if("year"===Ae.type){const[t,a]=e.split("-");d=`${t}-${a.padStart(2,"0")}`}else if("month"===Ae.type)d=new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"});else switch(le){case"yearly":d=`${e}`;break;case"monthly":const[t,a]=e.split("-");d=`${t}-${a.padStart(2,"0")}`;break;case"daily":d=new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}return{period:d,totalSales:n,totalTransactions:i,averageOrderValue:l,growth:o}}),Se(e)},Le=e=>{let t=[...e];if("yearly"===le){"all"!==Ce&&(t=t.filter(e=>e.date.startsWith(Ce)));const e="all"===Ce?(new Date).getFullYear()-4:parseInt(Ce),a="all"===Ce?(new Date).getFullYear():parseInt(Ce);t=t.filter(t=>{const s=parseInt(t.date.split("-")[0]);return s>=e&&s<=a})}else if("monthly"===le){const e=Be.split("-")[0];t=t.filter(t=>t.date.startsWith(e))}else if("daily"===le){const e=Me||Be;t=t.filter(t=>t.date.startsWith(e));const a=(Re-1)*Te,s=t.sort((e,t)=>t.date.localeCompare(e.date));t=s.slice(a,a+Te)}return t},_e=()=>Ae.type&&Ae.value?fe.filter(e=>{const t=new Date(e.date);if("year"===Ae.type)return t.getFullYear().toString()===Ae.value;if("month"===Ae.type){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`===Ae.value}return"day"!==Ae.type||e.date===Ae.value}):fe,Ne=e=>{if("year"===Ae.type){const t=e.period;Pe({type:"month",value:t,parentValue:Ae.value})}else if("month"===Ae.type){const t=fe.filter(t=>{const a=new Date(t.date);return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`===Ae.value&&t.date===Ue(e.period,Ae.value)});$e(t),Pe({type:"day",value:Ue(e.period,Ae.value),parentValue:Ae.value})}else if("yearly"===le){const t=e.period;Pe({type:"year",value:t})}else if("monthly"===le){const t=e.period;Pe({type:"month",value:t})}else if("daily"===le){const t=Ue(e.period);console.log("Daily click - Period:",e.period,"Target Date:",t);const a=fe.filter(e=>(console.log("Checking transaction date:",e.date,"vs target:",t),e.date===t));console.log("Found transactions:",a.length),$e(a),Pe({type:"day",value:t})}},Ue=(e,t)=>{if(e.match(/^[A-Za-z]{3}\s+\d+$/)){const a=(new Date).getFullYear(),s=new Date(e+", "+a);if(t){const[e]=t.split("-");s.setFullYear(parseInt(e))}return s.toISOString().split("T")[0]}if(e.match(/^[A-Za-z]{3}\s+\d+,\s+\d{4}$/)){return new Date(e).toISOString().split("T")[0]}if(e.match(/^\d{4}-\d{2}-\d{2}$/))return e;const a=new Date(e);return isNaN(a.getTime())?"":a.toISOString().split("T")[0]},We=()=>{let e=fe;const t=(null===ne||void 0===ne?void 0:ne.timeZone)||"Asia/Kuala_Lumpur",a=(0,p.oB)(t);switch(de){case"today":e=e.filter(e=>e.date===a);break;case"yesterday":const s=(0,p.Vp)(-1,t);e=e.filter(e=>e.date===s);break;case"this_week":const r=(0,p.Vp)(-6,t);e=e.filter(e=>e.date>=r&&e.date<=a);break;case"this_month":const n=(0,p.Vp)(-29,t);e=e.filter(e=>e.date>=n&&e.date<=a);break;case"custom":pe&&he&&(e=e.filter(e=>e.date>=pe&&e.date<=he))}return"all"!==ge&&(e=e.filter(e=>e.paymentMethod===ge)),"all"!==ve&&(e=e.filter(e=>e.status===ve)),e},qe=()=>{const e=We(),t=e.reduce((e,t)=>e+t.total,0),a=e.length,s=a>0?t/a:0,r=e.reduce((e,t)=>e+t.tax,0),n=e.reduce((e,t)=>e+t.discount,0),i=e.filter(e=>"cash"===e.paymentMethod).reduce((e,t)=>e+t.total,0),l=e.filter(e=>"card"===e.paymentMethod).reduce((e,t)=>e+t.total,0),o=e.filter(e=>"digital_wallet"===e.paymentMethod).reduce((e,t)=>e+t.total,0),d=e.filter(e=>"points"===e.paymentMethod).reduce((e,t)=>e+t.total,0);we({totalSales:t,totalTransactions:a,averageOrderValue:s,totalTax:r,totalDiscount:n,cashSales:i,cardSales:l,digitalWalletSales:o,pointsSales:d})},Ge=(e,t)=>{const a=new Blob([e],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a"),r=URL.createObjectURL(a);s.setAttribute("href",r),s.setAttribute("download",t),s.style.visibility="hidden",document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)},Ze=()=>{const e=We(),t={cash:e.filter(e=>"cash"===e.paymentMethod).reduce((e,t)=>e+t.total,0),card:e.filter(e=>"card"===e.paymentMethod).reduce((e,t)=>e+t.total,0),digital_wallet:e.filter(e=>"digital_wallet"===e.paymentMethod).reduce((e,t)=>e+t.total,0),points:e.filter(e=>"points"===e.paymentMethod).reduce((e,t)=>e+t.total,0)},a={member:e.filter(e=>"member"===e.customer.type).reduce((e,t)=>e+t.total,0),guest:e.filter(e=>"guest"===e.customer.type).reduce((e,t)=>e+t.total,0)},s=e.filter(e=>"completed"===e.status).length,r=(e.filter(e=>"refunded"===e.status).length,e.filter(e=>"cancelled"===e.status).length,Object.entries(e.reduce((e,t)=>(e[t.staff.name]=(e[t.staff.name]||0)+t.total,e),{})).sort((e,t)=>t[1]-e[1]).slice(0,5)),n=e.reduce((e,t)=>e+t.total,0),i=e.length,l=`\n<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Sales Report - ${(new Date).toLocaleDateString()}</title>\n    <style>\n        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }\n        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }\n        .title { font-size: 28px; font-weight: 600; color: #0A2540; margin-bottom: 10px; }\n        .subtitle { font-size: 16px; color: #6B7C93; }\n        .section { margin-bottom: 30px; }\n        .section-title { font-size: 20px; font-weight: 600; color: #0A2540; margin-bottom: 15px; border-bottom: 1px solid #E6EBF1; padding-bottom: 5px; }\n        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }\n        .stat-card { background: #F8FAFC; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; text-align: center; }\n        .stat-value { font-size: 24px; font-weight: 600; color: #0A2540; margin-bottom: 5px; }\n        .stat-label { font-size: 14px; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.5px; }\n        .breakdown { background: white; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; margin-bottom: 20px; }\n        .breakdown-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F6F9FC; }\n        .breakdown-item:last-child { border-bottom: none; }\n        .breakdown-label { font-weight: 500; }\n        .breakdown-value { font-weight: 600; color: #0A2540; }\n        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E6EBF1; padding-top: 20px; }\n    </style>\n</head>\n<body>\n    <div class="header">\n        <div class="title">{t('reports:salesPage.salesReport')}</div>\n        <div class="subtitle">Generated on ${(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>\n        <div class="subtitle">Period: ${"custom"===de&&pe&&he?`${pe} to ${he}`:de.replace("_"," ")}</div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">{t('reports:salesPage.summary')}</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">RM ${n.toFixed(2)}</div>\n                <div class="stat-label">{t('reports:salesPage.totalSales')}</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${i}</div>\n                <div class="stat-label">{t('reports:salesPage.totalTransactions')}</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${(n/i||0).toFixed(2)}</div>\n                <div class="stat-label">{t('reports:salesPage.averageOrderValue')}</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${(s/i*100).toFixed(1)}%</div>\n                <div class="stat-label">{t('reports:salesPage.successRate')}</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">{t('reports:salesPage.paymentMethodBreakdown')}</div>\n        <div class="breakdown">\n            <div class="breakdown-item">\n                <span class="breakdown-label">{t('reports:salesPage.cash')}</span>\n                <span class="breakdown-value">RM ${t.cash.toFixed(2)} (${(t.cash/n*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">{t('reports:salesPage.card')}</span>\n                <span class="breakdown-value">RM ${t.card.toFixed(2)} (${(t.card/n*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">{t('reports:salesPage.digitalWallet')}</span>\n                <span class="breakdown-value">RM ${t.digital_wallet.toFixed(2)} (${(t.digital_wallet/n*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">{t('reports:salesPage.points')}</span>\n                <span class="breakdown-value">RM ${t.points.toFixed(2)} (${(t.points/n*100).toFixed(1)}%)</span>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">{t('reports:salesPage.customerTypeAnalysis')}</div>\n        <div class="breakdown">\n            <div class="breakdown-item">\n                <span class="breakdown-label">{t('reports:salesPage.members')}</span>\n                <span class="breakdown-value">RM ${a.member.toFixed(2)} (${(a.member/n*100).toFixed(1)}%)</span>\n            </div>\n            <div class="breakdown-item">\n                <span class="breakdown-label">{t('reports:salesPage.guests')}</span>\n                <span class="breakdown-value">RM ${a.guest.toFixed(2)} (${(a.guest/n*100).toFixed(1)}%)</span>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">{t('reports:salesPage.topPerformingStaff')}</div>\n        <div class="breakdown">\n            ${r.map(e=>{let[t,a]=e;return`\n                <div class="breakdown-item">\n                    <span class="breakdown-label">${t}</span>\n                    <span class="breakdown-value">RM ${a.toFixed(2)}</span>\n                </div>\n            `}).join("")}\n        </div>\n    </div>\n\n    <div class="footer">\n        <p>{t('reports:salesPage.generatedByPurpleHerePos')}</p>\n        <p>\ud83e\udd16 Generated with Claude Code</p>\n    </div>\n</body>\n</html>`;Ge(l,`sales-report-${(new Date).toISOString().split("T")[0]}.html`)},He=()=>{const e=Fe.reduce((e,t)=>e+t.totalSales,0),t=Fe.reduce((e,t)=>e+t.totalTransactions,0),a=Fe.filter(e=>void 0!==e.growth).reduce((e,t)=>e+(t.growth||0),0)/Fe.filter(e=>void 0!==e.growth).length,s=Fe.reduce((e,t)=>t.totalSales>e.totalSales?t:e,Fe[0]),r=Fe.reduce((e,t)=>t.totalSales<e.totalSales?t:e,Fe[0]),n=`\n<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>${le.charAt(0).toUpperCase()+le.slice(1)} Sales Report - ${(new Date).toLocaleDateString()}</title>\n    <style>\n        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }\n        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }\n        .title { font-size: 28px; font-weight: 600; color: #0A2540; margin-bottom: 10px; }\n        .subtitle { font-size: 16px; color: #6B7C93; }\n        .section { margin-bottom: 30px; }\n        .section-title { font-size: 20px; font-weight: 600; color: #0A2540; margin-bottom: 15px; border-bottom: 1px solid #E6EBF1; padding-bottom: 5px; }\n        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }\n        .stat-card { background: #F8FAFC; border: 1px solid #E6EBF1; border-radius: 8px; padding: 20px; text-align: center; }\n        .stat-value { font-size: 24px; font-weight: 600; color: #0A2540; margin-bottom: 5px; }\n        .stat-label { font-size: 14px; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.5px; }\n        .period-table { width: 100%; border-collapse: collapse; margin: 20px 0; }\n        .period-table th, .period-table td { padding: 12px; text-align: left; border-bottom: 1px solid #E6EBF1; }\n        .period-table th { background: #F8FAFC; font-weight: 600; color: #0A2540; }\n        .growth-positive { color: #059669; font-weight: 600; }\n        .growth-negative { color: #DC2626; font-weight: 600; }\n        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E6EBF1; padding-top: 20px; }\n    </style>\n</head>\n<body>\n    <div class="header">\n        <div class="title">${le.charAt(0).toUpperCase()+le.slice(1)} Sales Report</div>\n        <div class="subtitle">Generated on ${(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">{t('reports:salesPage.overallSummary')}</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">${Fe.length}</div>\n                <div class="stat-label">{t('reports:salesPage.totalPeriods')}</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${e.toFixed(2)}</div>\n                <div class="stat-label">{t('reports:salesPage.totalSales')}</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${t.toLocaleString()}</div>\n                <div class="stat-label">{t('reports:salesPage.totalTransactions')}</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">${a.toFixed(1)}%</div>\n                <div class="stat-label">{t('reports:salesPage.averageGrowth')}</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">{t('reports:salesPage.performanceHighlights')}</div>\n        <div class="stats-grid">\n            <div class="stat-card">\n                <div class="stat-value">RM ${s.totalSales.toFixed(2)}</div>\n                <div class="stat-label">Best Period: ${s.period}</div>\n            </div>\n            <div class="stat-card">\n                <div class="stat-value">RM ${r.totalSales.toFixed(2)}</div>\n                <div class="stat-label">Lowest Period: ${r.period}</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="section">\n        <div class="section-title">{t('reports:salesPage.detailedBreakdown')}</div>\n        <table class="period-table">\n            <thead>\n                <tr>\n                    <th>{t('reports:salesPage.period')}</th>\n                    <th>{t('reports:salesPage.totalSales')}</th>\n                    <th>{t('reports:salesPage.transactions')}</th>\n                    <th>{t('reports:salesPage.avgOrderValue')}</th>\n                    <th>{t('reports:salesPage.growthRate')}</th>\n                </tr>\n            </thead>\n            <tbody>\n                ${Fe.map(e=>`\n                    <tr>\n                        <td>${e.period}</td>\n                        <td>RM ${e.totalSales.toFixed(2)}</td>\n                        <td>${e.totalTransactions.toLocaleString()}</td>\n                        <td>RM ${e.averageOrderValue.toFixed(2)}</td>\n                        <td class="${e.growth&&e.growth>0?"growth-positive":"growth-negative"}">\n                            ${e.growth?(e.growth>0?"+":"")+e.growth.toFixed(1)+"%":"N/A"}\n                        </td>\n                    </tr>\n                `).join("")}\n            </tbody>\n        </table>\n    </div>\n\n    <div class="footer">\n        <p>{t('reports:salesPage.generatedByPurpleHerePos')}</p>\n        <p>\ud83e\udd16 Generated with Claude Code</p>\n    </div>\n</body>\n</html>`;Ge(n,`sales-${"yearly"===le?"yearly":"monthly"===le?"monthly":"daily"}-report-${(new Date).toISOString().split("T")[0]}.html`)},Ke=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});if(!a||!t||!["admin","manager"].includes(t.role))return(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(m,{children:(0,g.jsxs)(n.pp,{children:[(0,g.jsx)(U,{children:"\ud83d\udeab"}),(0,g.jsx)(W,{children:"Access Denied"}),(0,g.jsx)("p",{style:{fontSize:"14px",color:"#9CA3AF"},children:"You need admin or manager privileges to access sales management."})]})})});const Qe=We();return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(m,{children:[(0,g.jsxs)(v,{children:[(0,g.jsx)(y,{children:e("reports:salesPage.salesManagement")}),(0,g.jsxs)(f,{children:[(0,g.jsx)(b,{variant:"secondary",onClick:()=>{if("transactions"===le){const e=["Order Number","Date","Time","Customer Type","Customer Name","Staff","Items","Subtotal","Tax","Discount","Total","Payment Method","Status"],t=We().map(e=>[e.orderNumber,e.date,e.time,e.customer.type,e.customer.name,e.staff.name,e.items.map(e=>`${e.name} (${e.quantity}x)`).join("; "),e.subtotal.toFixed(2),e.tax.toFixed(2),e.discount.toFixed(2),e.total.toFixed(2),e.paymentMethod,e.status]),a=[e,...t].map(e=>e.map(e=>`"${e}"`).join(",")).join("\n");Ge(a,`sales-transactions-${(new Date).toISOString().split("T")[0]}.csv`)}else{const e=[["Period","Total Sales (RM)","Total Transactions","Average Order Value (RM)","Growth Rate (%)"],...Fe.map(e=>[e.period,e.totalSales.toFixed(2),e.totalTransactions,e.averageOrderValue.toFixed(2),e.growth?e.growth.toFixed(2):"N/A"])].map(e=>e.map(e=>`"${e}"`).join(",")).join("\n");Ge(e,`sales-${"yearly"===le?"yearly":"monthly"===le?"monthly":"daily"}-${(new Date).toISOString().split("T")[0]}.csv`)}},children:"Export CSV"}),(0,g.jsx)(b,{variant:"primary",onClick:()=>{"transactions"===le?Ze():He()},children:"Generate Report"})]})]}),(0,g.jsxs)(j,{children:[(0,g.jsxs)(x.tU,{children:[(0,g.jsx)(x.oz,{active:"transactions"===le,onClick:()=>{oe("transactions"),Pe({type:null,value:""}),$e([])},children:"Transactions"}),(0,g.jsx)(x.oz,{active:"yearly"===le,onClick:()=>{oe("yearly"),Pe({type:null,value:""}),$e([])},children:"Yearly Sales"}),(0,g.jsx)(x.oz,{active:"monthly"===le,onClick:()=>{oe("monthly"),Pe({type:null,value:""}),$e([])},children:"Monthly Sales"}),(0,g.jsx)(x.oz,{active:"daily"===le,onClick:()=>{oe("daily"),Pe({type:null,value:""}),$e([])},children:"Daily Sales"})]}),"transactions"===le&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(w,{children:[(0,g.jsxs)(F,{children:[(0,g.jsx)(S,{children:e("reports:salesPage.timePeriod")}),(0,g.jsxs)(A,{value:de,onChange:e=>ce(e.target.value),children:[(0,g.jsx)("option",{value:"today",children:e("reports:salesPage.today")}),(0,g.jsx)("option",{value:"yesterday",children:e("reports:salesPage.yesterday")}),(0,g.jsx)("option",{value:"this_week",children:e("reports:salesPage.thisWeek")}),(0,g.jsx)("option",{value:"this_month",children:e("reports:salesPage.thisMonth")}),(0,g.jsx)("option",{value:"custom",children:e("reports:salesPage.customRange")})]})]}),"custom"===de&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(F,{children:[(0,g.jsx)(S,{children:e("reports:salesPage.startDate")}),(0,g.jsx)(P,{type:"date",value:pe,onChange:e=>xe(e.target.value)})]}),(0,g.jsxs)(F,{children:[(0,g.jsx)(S,{children:e("reports:salesPage.endDate")}),(0,g.jsx)(P,{type:"date",value:he,onChange:e=>ue(e.target.value)})]})]}),(0,g.jsxs)(F,{children:[(0,g.jsx)(S,{children:e("reports:salesPage.paymentMethod")}),(0,g.jsxs)(A,{value:ge,onChange:e=>me(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:e("reports:salesPage.allMethods")}),(0,g.jsx)("option",{value:"cash",children:e("reports:salesPage.cash")}),(0,g.jsx)("option",{value:"card",children:e("reports:salesPage.card")}),(0,g.jsx)("option",{value:"digital_wallet",children:e("reports:salesPage.digitalWallet")}),(0,g.jsx)("option",{value:"points",children:e("reports:salesPage.points")})]})]}),(0,g.jsxs)(F,{children:[(0,g.jsx)(S,{children:e("reports:salesPage.status")}),(0,g.jsxs)(A,{value:ve,onChange:e=>ye(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:e("reports:salesPage.allStatus")}),(0,g.jsx)("option",{value:"completed",children:e("reports:salesPage.completed")}),(0,g.jsx)("option",{value:"refunded",children:e("reports:salesPage.refunded")}),(0,g.jsx)("option",{value:"cancelled",children:e("reports:salesPage.cancelled")})]})]})]}),je&&(0,g.jsxs)(k,{children:[(0,g.jsxs)($,{color:"#059669",children:[(0,g.jsx)(C,{children:e("reports:salesPage.totalSales")}),(0,g.jsx)(D,{children:(0,d.vv)(je.totalSales,ne.currency)}),(0,g.jsxs)(B,{children:[je.totalTransactions," transactions"]})]}),(0,g.jsxs)($,{color:"#2563EB",children:[(0,g.jsx)(C,{children:e("reports:salesPage.averageOrder")}),(0,g.jsx)(D,{children:(0,d.vv)(je.averageOrderValue,ne.currency)}),(0,g.jsx)(B,{children:"+12.5% vs last period"})]}),(0,g.jsxs)($,{color:"#DC2626",children:[(0,g.jsx)(C,{children:e("reports:salesPage.totalTax")}),(0,g.jsx)(D,{children:(0,d.vv)(je.totalTax,ne.currency)}),(0,g.jsx)(B,{children:e("reports:salesPage.gstCollected")})]}),(0,g.jsxs)($,{color:"#7C3AED",children:[(0,g.jsx)(C,{children:e("reports:salesPage.totalDiscounts")}),(0,g.jsx)(D,{children:(0,d.vv)(je.totalDiscount,ne.currency)}),(0,g.jsx)(B,{children:e("reports:salesPage.promotionsApplied")})]})]}),(0,g.jsxs)(E,{children:[(0,g.jsxs)(M,{children:[(0,g.jsx)("span",{children:"Order #"}),(0,g.jsx)("span",{children:e("reports:salesPage.dateTime")}),(0,g.jsx)("span",{children:e("reports:salesPage.customer")}),(0,g.jsx)("span",{children:e("reports:salesPage.staff")}),(0,g.jsx)("span",{children:e("reports:salesPage.subtotal")}),(0,g.jsx)("span",{children:e("reports:salesPage.total")}),(0,g.jsx)("span",{children:e("reports:salesPage.payment")}),(0,g.jsx)("span",{children:e("reports:salesPage.status")})]}),0===Qe.length?(0,g.jsxs)(n.pp,{children:[(0,g.jsx)(W,{children:"No sales transactions found for the selected criteria"}),(0,g.jsx)(b,{variant:"secondary",children:"Clear Filters"})]}):(0,g.jsxs)(g.Fragment,{children:[Qe.map(e=>(0,g.jsxs)(z,{children:[(0,g.jsx)(I,{children:e.orderNumber}),(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:Ke(e.date)}),(0,g.jsx)(R,{children:e.time})]}),(0,g.jsx)(O,{children:(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,g.jsx)(V,{children:e.customer.name}),(0,g.jsx)(Y,{type:e.customer.type,children:e.customer.type})]})}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#1F2937"},children:e.staff.name}),(0,g.jsx)(L,{children:(0,d.vv)(e.subtotal,ne.currency)}),(0,g.jsx)(L,{children:(0,d.vv)(e.total,ne.currency)}),(0,g.jsx)(_,{method:e.paymentMethod,children:(0,c.MA)(e.paymentMethod,e.cardType,ie||void 0)}),(0,g.jsx)(N,{status:e.status,children:e.status})]},e.id)),Qe.map(e=>(0,g.jsxs)(T,{children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(I,{children:e.orderNumber}),(0,g.jsxs)(R,{children:[Ke(e.date)," \u2022 ",e.time]})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,g.jsx)(L,{children:(0,d.vv)(e.total,ne.currency)}),(0,g.jsx)(N,{status:e.status,children:e.status})]})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)(O,{children:[(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,g.jsx)(V,{children:e.customer.name}),(0,g.jsx)(Y,{type:e.customer.type,children:e.customer.type})]}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Staff: ",e.staff.name]})]}),(0,g.jsx)(_,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")})]})]},`mobile-${e.id}`))]})]})]}),"transactions"!==le&&(0,g.jsxs)(g.Fragment,{children:[!Ae.type&&(0,g.jsxs)(w,{children:["yearly"===le&&(0,g.jsxs)(F,{children:[(0,g.jsx)(S,{children:e("reports:salesPage.yearRange")}),(0,g.jsxs)(A,{value:Ce,onChange:e=>De(e.target.value),children:[(0,g.jsx)("option",{value:"2024",children:"2024"}),(0,g.jsx)("option",{value:"2023",children:"2023"}),(0,g.jsx)("option",{value:"2022",children:"2022"}),(0,g.jsx)("option",{value:"2021",children:"2021"}),(0,g.jsx)("option",{value:"all",children:e("reports:salesPage.allYears")})]})]}),"monthly"===le&&(0,g.jsxs)(F,{children:[(0,g.jsx)(S,{children:e("reports:salesPage.selectYear")}),(0,g.jsxs)(A,{value:Be.split("-")[0],onChange:e=>Ee(e.target.value+"-01"),children:[(0,g.jsx)("option",{value:"2024",children:"2024"}),(0,g.jsx)("option",{value:"2023",children:"2023"}),(0,g.jsx)("option",{value:"2022",children:"2022"}),(0,g.jsx)("option",{value:"2021",children:"2021"})]})]}),"daily"===le&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(F,{children:[(0,g.jsx)(S,{children:e("reports:salesPage.selectMonth")}),(0,g.jsx)(P,{type:"month",value:Me||Be,onChange:e=>ze(e.target.value)})]}),(0,g.jsxs)(F,{children:[(0,g.jsx)(S,{children:e("reports:salesPage.pageSize")}),(0,g.jsxs)(A,{value:Te.toString(),onChange:e=>Ie(parseInt(e.target.value)),children:[(0,g.jsx)("option",{value:"25",children:"25 days"}),(0,g.jsx)("option",{value:"50",children:"50 days"}),(0,g.jsx)("option",{value:"100",children:"100 days"})]})]})]})]}),Ae.type&&(0,g.jsx)(Q,{onClick:()=>{"day"===Ae.type?(Ae.parentValue?Pe({type:"month",value:Ae.parentValue}):Pe({type:null,value:""}),$e([])):"month"===Ae.type?Ae.parentValue?Pe({type:"year",value:Ae.parentValue}):Pe({type:null,value:""}):"year"===Ae.type&&Pe({type:null,value:""})},children:"\u2190 Back"}),Ae.type&&(0,g.jsxs)(Z,{children:[(0,g.jsxs)(H,{clickable:!0,onClick:()=>Pe({type:null,value:""}),children:["yearly"===le?"Yearly":"monthly"===le?"Monthly":"Daily"," Sales"]}),"year"===Ae.type&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(K,{children:">"}),(0,g.jsxs)(H,{children:[Ae.value," Monthly Details"]})]}),"month"===Ae.type&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(K,{children:">"}),Ae.parentValue&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(H,{clickable:!0,onClick:()=>Pe({type:"year",value:Ae.parentValue}),children:["Year ",Ae.parentValue]}),(0,g.jsx)(K,{children:">"})]}),(0,g.jsxs)(H,{children:[Ae.value.split("-")[0],"-",Ae.value.split("-")[1]," Daily Details"]})]}),"day"===Ae.type&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(K,{children:">"}),Ae.parentValue&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(H,{clickable:!0,onClick:()=>Pe({type:"month",value:Ae.parentValue}),children:[Ae.parentValue.split("-")[0],"-",Ae.parentValue.split("-")[1]]}),(0,g.jsx)(K,{children:">"})]}),(0,g.jsxs)(H,{children:[new Date(Ae.value).toLocaleDateString("en-US")," Transaction Details"]})]})]}),je&&(0,g.jsxs)(k,{children:[(0,g.jsxs)($,{color:"#635BFF",children:[(0,g.jsxs)(C,{children:["Total ","year"===Ae.type?"Months":"month"===Ae.type?"Days":"yearly"===le?"Years":"monthly"===le?"Months":"Days"]}),(0,g.jsx)(D,{children:Fe.length}),(0,g.jsx)(B,{children:e("reports:salesPage.reportingPeriod")})]}),(0,g.jsxs)($,{color:"#635BFF",children:[(0,g.jsx)(C,{children:e("reports:salesPage.totalSales")}),(0,g.jsx)(D,{children:(0,d.vv)(Fe.reduce((e,t)=>e+t.totalSales,0),ne.currency)}),(0,g.jsx)(B,{children:e("reports:salesPage.cumulativeAmount")})]}),(0,g.jsxs)($,{color:"#635BFF",children:[(0,g.jsx)(C,{children:e("reports:salesPage.averageSales")}),(0,g.jsx)(D,{children:(0,d.vv)(Fe.length>0?Fe.reduce((e,t)=>e+t.totalSales,0)/Fe.length:0,ne.currency)}),(0,g.jsx)(B,{children:e("reports:salesPage.perPeriodAverage")})]}),(0,g.jsxs)($,{color:"#635BFF",children:[(0,g.jsx)(C,{children:e("reports:salesPage.highestSales")}),(0,g.jsx)(D,{children:(0,d.vv)(Fe.length>0?Math.max(...Fe.map(e=>e.totalSales)):0,ne.currency)}),(0,g.jsx)(B,{children:e("reports:salesPage.peakRecord")})]})]}),"day"===Ae.type&&(0,g.jsxs)(X,{children:[(0,g.jsxs)(J,{children:[(0,g.jsxs)(ee,{children:[new Date(Ae.value).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})," Transaction History"]}),(0,g.jsxs)(te,{children:["Total ",ke.length," transactions \u2022 Total sales ",(0,d.vv)(ke.reduce((e,t)=>e+t.total,0),ne.currency)]})]}),(0,g.jsxs)(E,{style:{border:"none",borderRadius:"0"},children:[(0,g.jsxs)(M,{children:[(0,g.jsx)("span",{children:"Order #"}),(0,g.jsx)("span",{children:e("reports:salesPage.time")}),(0,g.jsx)("span",{children:e("reports:salesPage.customer")}),(0,g.jsx)("span",{children:e("reports:salesPage.staff")}),(0,g.jsx)("span",{children:e("reports:salesPage.subtotal")}),(0,g.jsx)("span",{children:e("reports:salesPage.total")}),(0,g.jsx)("span",{children:e("reports:salesPage.payment")}),(0,g.jsx)("span",{children:e("reports:salesPage.status")})]}),0===ke.length?(0,g.jsxs)(n.pp,{children:[(0,g.jsx)(U,{children:"\ud83d\udccb"}),(0,g.jsx)(W,{children:"No transactions found for this date"})]}):(0,g.jsxs)(g.Fragment,{children:[ke.map(e=>(0,g.jsxs)(z,{children:[(0,g.jsx)(I,{children:e.orderNumber}),(0,g.jsx)(R,{children:e.time}),(0,g.jsx)(O,{children:(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,g.jsx)(V,{children:e.customer.name}),(0,g.jsx)(Y,{type:e.customer.type,children:e.customer.type})]})}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#1F2937"},children:e.staff.name}),(0,g.jsx)(L,{children:(0,d.vv)(e.subtotal,ne.currency)}),(0,g.jsx)(L,{children:(0,d.vv)(e.total,ne.currency)}),(0,g.jsx)(_,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")}),(0,g.jsx)(N,{status:e.status,children:e.status})]},e.id)),ke.map(e=>(0,g.jsxs)(T,{children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(I,{children:e.orderNumber}),(0,g.jsx)(R,{children:e.time})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,g.jsx)(L,{children:(0,d.vv)(e.total,ne.currency)}),(0,g.jsx)(N,{status:e.status,children:e.status})]})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)(O,{children:[(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,g.jsx)(V,{children:e.customer.name}),(0,g.jsx)(Y,{type:e.customer.type,children:e.customer.type})]}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Staff: ",e.staff.name]})]}),(0,g.jsx)(_,{method:e.paymentMethod,children:e.paymentMethod.replace("_"," ")})]})]},`mobile-detail-${e.id}`))]})]})]}),"day"!==Ae.type&&(0,g.jsxs)(E,{children:[(0,g.jsxs)(M,{children:[(0,g.jsx)("span",{children:e("reports:salesPage.period")}),(0,g.jsx)("span",{children:e("reports:salesPage.totalSales")}),(0,g.jsx)("span",{children:e("reports:salesPage.transactions")}),(0,g.jsx)("span",{children:e("reports:salesPage.avgOrderValue")}),(0,g.jsx)("span",{children:e("reports:salesPage.growthRate")}),(0,g.jsx)("span",{children:e("reports:salesPage.salesRank")}),(0,g.jsx)("span",{}),(0,g.jsx)("span",{})]}),0===Fe.length?(0,g.jsx)(n.pp,{children:(0,g.jsx)(W,{children:"No data available for aggregation"})}):(0,g.jsxs)(g.Fragment,{children:[Fe.map((t,a)=>(0,g.jsxs)(z,{onClick:()=>Ne(t),children:[(0,g.jsx)(q,{style:{fontSize:"16px",fontWeight:"600"},children:t.period}),(0,g.jsx)(L,{children:(0,d.vv)(t.totalSales,ne.currency)}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:t.totalTransactions.toLocaleString()}),(0,g.jsx)(L,{children:(0,d.vv)(t.averageOrderValue,ne.currency)}),(0,g.jsx)("div",{children:void 0!==t.growth?(0,g.jsxs)(G,{positive:t.growth>0,children:[t.growth>0?"+":"",t.growth.toFixed(1),"%"]}):(0,g.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:e("reports:salesPage.na")})}),(0,g.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF"},children:["#",a+1]}),(0,g.jsx)("div",{}),(0,g.jsx)("div",{})]},t.period)),Fe.map((e,t)=>(0,g.jsxs)(T,{onClick:()=>Ne(e),children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(q,{style:{fontSize:"16px",fontWeight:"600",marginBottom:"4px"},children:e.period}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[e.totalTransactions.toLocaleString()," transactions"]})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,g.jsx)(L,{children:(0,d.vv)(e.totalSales,ne.currency)}),void 0!==e.growth&&(0,g.jsxs)(G,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth.toFixed(1),"%"]})]})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsx)("div",{children:(0,g.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:["Avg Order: ",(0,d.vv)(e.averageOrderValue,ne.currency)]})}),(0,g.jsxs)("div",{style:{padding:"4px 8px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"#EDE9FE",color:"#5B21B6"},children:["#",t+1]})]})]},`mobile-${e.period}`))]})]}),"daily"===le&&!Ae.type&&(0,g.jsxs)(ae,{children:[(0,g.jsx)(se,{disabled:1===Re,onClick:()=>Oe(Re-1),children:"Previous"}),(0,g.jsxs)(re,{children:["Page ",Re," \u2022 Showing ",Te," days"]}),(0,g.jsx)(se,{disabled:Fe.length<Te,onClick:()=>Oe(Re+1),children:"Next"})]})]})]})]})})}},2653:(e,t,a)=>{a.d(t,{M:()=>n});var s=a(9950),r=a(4492);function n(e){const[t,a]=(0,r.ok)(),n=(0,s.useCallback)(()=>t.get("tab")||e,[t,e]),[i,l]=(0,s.useState)(n());return[i,(0,s.useCallback)(e=>{l(e),a({tab:e})},[a])]}},8285:(e,t,a)=>{a.d(t,{MA:()=>g,_M:()=>h});const s="cash",r="card",n="ewallet",i="bank_transfer",l="qr",o="counter",d="online",c="fpx",p="staffMeal",x={[s]:"Cash",[r]:"Credit/Debit Card",[n]:"E-Wallet",[i]:"Bank Transfer",[l]:"QR Payment",[o]:"Pay at Counter",[d]:"Online Payment",[c]:"FPX Online Banking",[p]:"Staff Meal"};function h(e,t){if(t){const a=t[{cash:"cash",card:"card",ewallet:"ewallet",bank_transfer:"bankTransfer",qr:"qr",counter:"payAtCounter",online:"online",fpx:"fpx",staffMeal:"staffMeal",staff_meal:"staffMeal"}[e]||e]||t[e];if(null!==a&&void 0!==a&&a.label)return a.label}return x[e]||e}const u={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function g(e,t,a){if(!e)return"N/A";if("card"===e&&t){return`${h("card",a)}(${u[t]||t})`}return h(e,a)}},8406:(e,t,a)=>{a.d(t,{MQ:()=>o,Vp:()=>l,fU:()=>n,ng:()=>s,oB:()=>i,r6:()=>r});const s=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",r=(e,t,a)=>{if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";const n={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:s(t)};return r.toLocaleString("en-MY",{...n,...a})},n=(e,t)=>r(e,t,{year:void 0,month:void 0,day:void 0}),i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const a=new Date;a.setDate(a.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(a)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},o=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const a=Date.now()-t,s=Math.floor(a/6e4),r=Math.floor(a/36e5),n=Math.floor(a/864e5);return s<1?"just now":1===s?"1 min ago":s<60?`${s} mins ago`:1===r?"1 hour ago":r<24?`${r} hours ago`:1===n?"1 day ago":`${n} days ago`}}}]);