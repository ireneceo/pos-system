"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[677],{677:(e,t,r)=>{r.r(t),r.d(t,{default:()=>re});var n=r(9950),s=r(4752),i=r(4492),l=r(3310),a=r(7492),o=r(1367),d=r(6038),c=r(4021),h=r(1095),x=r(2847),u=r(3245),p=r(158),g=r(3440),j=r(4094),v=r(4915),m=r(7621),y=r(5297),f=r(2528),b=r(294),F=r(3588),w=r(4414);const k=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,S=s.Ay.div`
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
`,A=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,C=s.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,B=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,E=s.Ay.div`
  background: #FAFBFC;
  padding: 24px 0;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 16px 0;
  }
`,M=s.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
  }
`,O=s.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7280"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5A51E6":"#F8FAFC"};
  }
`,D=s.Ay.button`
  padding: 12px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #5A51E6;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,_=s.Ay.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,I=a.MD,$=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,R=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,z=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,T=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,L=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,P=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,W=s.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,N=s.Ay.div`
  width: 100%;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${e=>e.percentage}%;
    background: #635BFF;
    transition: width 0.3s ease;
  }
`,H=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,U=s.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,Y=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,K=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,V=s.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }
`,J=s.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${e=>e.show?"block":"none"};
`,q=s.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,G=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,Q=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,X=s.Ay.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #6B7280;
  }
`,Z=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,ee=s.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 12px;
  background: ${e=>1===e.rank?"linear-gradient(135deg, #FFD700, #FFA500)":2===e.rank?"linear-gradient(135deg, #C0C0C0, #A0A0A0)":3===e.rank?"linear-gradient(135deg, #CD7F32, #8B4513)":"#F3F4F6"};
  color: ${e=>e.rank<=3?"white":"#6B7280"};
`,te=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],re=()=>{var e,t;const{user:r}=(0,o.As)(),[s,re]=(0,i.ok)(),{defaultCurrency:ne}=(0,c.i1)(),[se,ie]=(0,n.useState)("RM");(0,n.useEffect)(()=>{ne&&ie(ne)},[ne]);const[le,ae]=(0,n.useState)(()=>s.get("tab")||"ranking"),[oe,de]=(0,n.useState)("week"),[ce,he]=(0,n.useState)(()=>{const e=new Date,t=new Date(e);return t.setDate(t.getDate()-6),{start:Je(t),end:Je(e)}}),[xe,ue]=(0,n.useState)(!1),[pe,ge]=(0,n.useState)([]),[je,ve]=(0,n.useState)([]),[me,ye]=(0,n.useState)("all"),[fe,be]=(0,n.useState)("all"),[Fe,we]=(0,n.useState)(""),[ke,Se]=(0,n.useState)(""),[Ae,Ce]=(0,n.useState)(!1),[Be,Ee]=(0,n.useState)(!1),[Me,Oe]=(0,n.useState)([]),[De,_e]=(0,n.useState)([]),[Ie,$e]=(0,n.useState)([]),[Re,ze]=(0,n.useState)(!0),[Te,Le]=(0,n.useState)([]),[Pe,We]=(0,n.useState)([]),[Ne,He]=(0,n.useState)([]),[Ue,Ye]=(0,n.useState)(new Set),[Ke,Ve]=(0,n.useState)(new Set);function Je(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}(0,n.useEffect)(()=>{re({tab:le},{replace:!0})},[le,re]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();ge(e),Oe(e.slice(0,10))}let n="/api/restaurants";null===r||void 0===r||!r.id||"Brand General"!==r.role&&"Brand Manager"!==r.role||(n=`/api/restaurants/manager/${r.id}`);const s=await fetch(n,{headers:{Authorization:`Bearer ${e}`}});if(s.ok){const e=await s.json(),t=(e.data||e||[]).map(e=>{var t,r;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name,brand_id:e.brand_id,brand_name:e.brand_name||(null===(r=e.brand)||void 0===r?void 0:r.name)}});ve(t),_e(t.slice(0,10))}}catch(e){console.error("Error fetching brands/restaurants:",e)}})()},[r]),(0,n.useEffect)(()=>{(async()=>{if(0!==je.length){ze(!0);try{const r=localStorage.getItem("auth_token"),n=je.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==fe&&(s+=`&restaurant_id=${fe}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();let t=e.data||e||[];if(t=t.filter(e=>{var t;return n.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),"all"!==me){const e=je.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===me}).map(e=>e.id);t=t.filter(t=>{var r;return e.includes(null===(r=t.restaurant_id)||void 0===r?void 0:r.toString())})}$e(t)}const l=await fetch("/api/menu",{headers:{Authorization:`Bearer ${r}`}});if(l.ok){var e,t;const r=await l.json();null!==(e=r.data)&&void 0!==e&&e.items&&We(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&He(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{ze(!1)}}else ze(!1)})()},[me,fe,je]);const qe=()=>{ye("all"),we(""),Ce(!1)},Ge=()=>{be("all"),Se(""),Ee(!1)},Qe=(0,n.useMemo)(()=>{if(!Ie||0===Ie.length)return[];const e=new Date(ce.start);e.setHours(0,0,0,0);const t=new Date(ce.end);return t.setHours(23,59,59,999),Ie.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=t,l="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return i&&l})},[Ie,ce.start,ce.end]),Xe=(0,n.useMemo)(()=>{if(0===Qe.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===oe){const r={};return Qe.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;r[i]=(r[i]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===oe){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const t=new Date(n);t.setDate(t.getDate()-e),s.push(t)}const i={};return Qe.forEach(r=>{const n=Je(e(r));i[n]=(i[n]||0)+t(r)}),s.map(e=>{const t=Je(e);return{date:r[e.getDay()],sales:Math.round(i[t]||0)}})}if("month"===oe){const r={};return Qe.forEach(n=>{const s=e(n).getDate().toString();r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Qe.forEach(s=>{const i=r[e(s).getMonth()];n[i]=(n[i]||0)+t(s)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Qe,oe]),Ze=(0,n.useMemo)(()=>{if(0===Qe.length)return[{name:"No Data",value:100,sales:0}];const e={};Ne.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};Pe.forEach(r=>{if(r.id){const n=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=n}});const r={};let n=0;Qe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,l;const a=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=a;const o=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(l=e.product_id)||void 0===l?void 0:l.toString()),d=o&&t[o]||"Other";r[d]=(r[d]||0)+a})});const s=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[Qe,Pe,Ne]),et=(0,n.useMemo)(()=>{var e;if(0===Qe.length)return[];const t={};Ne.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};Pe.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};Qe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,s,i;const l=e.menu_name||e.name||"Unknown",a=(null===(t=e.menuItem)||void 0===t||null===(s=t.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),o=a?r[a]||"Other":e.category||"Other";n[l]||(n[l]={category:o,price:parseFloat(e.price||0),orders:0,revenue:0});const d=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[l].orders+=d,n[l].revenue+=c*d})});const s=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[Qe,Pe,Ne]),tt=(0,n.useMemo)(()=>{if(0===Qe.length)return[];const e={};return Qe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[Qe]),rt=(0,n.useMemo)(()=>{if(0===Qe.length)return{};const e={};return Qe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),s=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,i=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const l=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=l,e[n].orders+=1,e[n].months[s].revenue+=l,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=l,e[n].months[s].days[i].orders+=1}),e},[Qe]),nt=(0,n.useMemo)(()=>{if(0===Qe.length)return[];const e={};return Qe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(Qe.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[Qe]),st=(0,n.useMemo)(()=>{if(0===Ie.length)return{brands:[],restaurants:[]};const e=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),t=new Date(ce.start);t.setHours(0,0,0,0);const r=new Date(ce.end);r.setHours(23,59,59,999);const n=Ie.filter(e=>{const n=e.order_date||e.createdAt;if(!n)return!1;const s=new Date(n);return s>=t&&s<=r&&"completed"===e.status}),s={};n.forEach(t=>{var r,n;const i=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString();if(!i)return;const l=je.find(e=>e.id===i),a=(null===l||void 0===l?void 0:l.name)||t.restaurant_name||"Unknown",o=(null===l||void 0===l?void 0:l.brand_name)||(null===(n=pe.find(e=>e.id===(null===l||void 0===l?void 0:l.brand_id)))||void 0===n?void 0:n.name)||"Independent";s[i]||(s[i]={name:a,brandName:o,orders:0,revenue:0}),s[i].orders+=1,s[i].revenue+=e(t)});const i=Object.entries(s).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue),l={},a=new Set(je.map(e=>{var t;return null===(t=e.brand_id)||void 0===t?void 0:t.toString()}).filter(Boolean));pe.forEach(e=>{a.has(e.id.toString())&&(l[e.id.toString()]={name:e.name,orders:0,revenue:0,restaurantCount:0})}),je.some(e=>!e.brand_id)&&(l.independent={name:"Independent",orders:0,revenue:0,restaurantCount:0}),je.forEach(e=>{var t;const r=(null===(t=e.brand_id)||void 0===t?void 0:t.toString())||"independent";l[r]&&(l[r].restaurantCount+=1)}),n.forEach(t=>{var r,n;const s=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString(),i=je.find(e=>e.id===s),a=(null===i||void 0===i||null===(n=i.brand_id)||void 0===n?void 0:n.toString())||"independent";l[a]&&(l[a].orders+=1,l[a].revenue+=e(t))});return{brands:Object.entries(l).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).filter(e=>e.orders>0||e.restaurantCount>0).sort((e,t)=>t.revenue-e.revenue),restaurants:i}},[Ie,je,pe,ce]),it=()=>{const e=new Date(ce.start),t=new Date(ce.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=it();if(e<=31){const e=new Set(Object.keys(rt)),t=new Set;Object.keys(rt).forEach(e=>{Object.keys(rt[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),Ye(e),Ve(t)}else e<=365?(Ye(new Set(Object.keys(rt))),Ve(new Set)):(Ye(new Set),Ve(new Set))},[ce.start,ce.end,rt]);const lt=e=>{de(e),ue(!1);const t=new Date;let r=new Date(t);switch(e){case"today":r=new Date(t);break;case"week":r.setDate(r.getDate()-6);break;case"month":r.setDate(r.getDate()-29);break;case"year":r=new Date(t.getFullYear(),0,1);break;case"all":r=new Date(t.getFullYear()-5,0,1)}he({start:Je(r),end:Je(t)})},at=()=>{const e=Xe.reduce((e,t)=>e+t.sales,0),t=`Brand/Manager Reports\nGenerated: ${(new Date).toISOString()}\nPeriod: ${ce.start} to ${ce.end}\nBrand Filter: ${"all"===me?"All Brands":Fe}\nRestaurant Filter: ${"all"===fe?"All Restaurants":ke}\n\nTotal Revenue: RM ${e.toFixed(2)}\nTotal Orders: ${Qe.length}\n`,r=new Blob([t],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=`brand_report_${ce.start}_to_${ce.end}.csv`,n.click()},ot=()=>(0,w.jsxs)(E,{children:[(0,w.jsxs)(K,{children:[(0,w.jsx)(V,{type:"text",placeholder:"All Brands",value:Fe,onChange:e=>(e=>{if(we(e),Ce(!0),e.length<1)return void Oe(pe.slice(0,10));const t=pe.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)||t.code.toLowerCase().includes(r)}).slice(0,10);Oe(t)})(e.target.value),onFocus:()=>{Ce(!0),0===Fe.length&&Oe(pe.slice(0,10))},onBlur:()=>setTimeout(()=>Ce(!1),200)}),"all"!==me&&Fe&&(0,w.jsx)(X,{onClick:qe,children:"\xd7"}),(0,w.jsxs)(J,{show:Ae,children:[(0,w.jsxs)(q,{onClick:()=>{ye("all"),we(""),Ce(!1)},children:[(0,w.jsx)(G,{children:"All Brands"}),(0,w.jsx)(Q,{children:"Show all brand data"})]}),Me.map(e=>(0,w.jsxs)(q,{onClick:()=>(e=>{ye(e.id.toString()),we(e.name),Ce(!1),be("all"),Se("")})(e),children:[(0,w.jsx)(G,{children:e.name}),(0,w.jsxs)(Q,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,w.jsxs)(K,{children:[(0,w.jsx)(V,{type:"text",placeholder:"All Restaurants",value:ke,onChange:e=>(e=>{Se(e),Ee(!0);let t=je;if("all"!==me&&(t=je.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===me})),e.length<1)return void _e(t.slice(0,10));const r=t.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);_e(r)})(e.target.value),onFocus:()=>{Ee(!0);let e=je;"all"!==me&&(e=je.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===me})),_e(e.slice(0,10))},onBlur:()=>setTimeout(()=>Ee(!1),200)}),"all"!==fe&&ke&&(0,w.jsx)(X,{onClick:Ge,children:"\xd7"}),(0,w.jsxs)(J,{show:Be,children:[(0,w.jsxs)(q,{onClick:()=>{be("all"),Se(""),Ee(!1)},children:[(0,w.jsx)(G,{children:"All Restaurants"}),(0,w.jsx)(Q,{children:"Show all restaurant data"})]}),De.map(e=>(0,w.jsxs)(q,{onClick:()=>(e=>{be(e.id),Se(e.name),Ee(!1)})(e),children:[(0,w.jsx)(G,{children:e.name}),(0,w.jsx)(Q,{children:e.brand_name||"Independent"})]},e.id))]})]}),(0,w.jsxs)(M,{children:[(0,w.jsx)(O,{active:"today"===oe&&!xe,onClick:()=>lt("today"),children:"Today"}),(0,w.jsx)(O,{active:"week"===oe&&!xe,onClick:()=>lt("week"),children:"Week"}),(0,w.jsx)(O,{active:"month"===oe&&!xe,onClick:()=>lt("month"),children:"Month"}),(0,w.jsx)(O,{active:"year"===oe&&!xe,onClick:()=>lt("year"),children:"Year"}),(0,w.jsx)(O,{active:"all"===oe&&!xe,onClick:()=>lt("all"),children:"All"}),(0,w.jsxs)(B,{children:[(0,w.jsx)(C,{type:"date",value:ce.start,onChange:e=>{he({...ce,start:e.target.value}),ue(!0)}}),(0,w.jsx)("span",{children:"to"}),(0,w.jsx)(C,{type:"date",value:ce.end,onChange:e=>{he({...ce,end:e.target.value}),ue(!0)}})]})]}),(0,w.jsxs)(D,{onClick:at,children:[(0,w.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,w.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,w.jsx)(l.A,{children:(0,w.jsxs)(k,{children:[(0,w.jsx)(S,{children:(0,w.jsx)(A,{children:"Brand Reports"})}),(0,w.jsxs)(_,{children:[(0,w.jsxs)(a.j,{children:[(0,w.jsx)(a.oz,{active:"ranking"===le,onClick:()=>ae("ranking"),children:"Sales Ranking"}),(0,w.jsx)(a.oz,{active:"sales"===le,onClick:()=>ae("sales"),children:"Sales Report"}),(0,w.jsx)(a.oz,{active:"details"===le,onClick:()=>ae("details"),children:"Sales Details"}),(0,w.jsx)(a.oz,{active:"menu"===le,onClick:()=>ae("menu"),children:"Menu Analysis"}),(0,w.jsx)(a.oz,{active:"customers"===le,onClick:()=>ae("customers"),children:"Customer Insights"}),(0,w.jsx)(a.oz,{active:"operations"===le,onClick:()=>ae("operations"),children:"Operations"})]}),(0,w.jsxs)("div",{style:{display:"sales"===le?"block":"none"},children:[(0,w.jsx)(ot,{}),Re?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Qe.length?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,w.jsxs)("div",{children:[(0,w.jsxs)(I,{children:[(0,w.jsxs)(a.hI,{color:"#059669",children:[(0,w.jsx)(a.v0,{children:"Total Revenue"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(Xe.reduce((e,t)=>e+t.sales,0),se)}),(0,w.jsxs)(a.d1,{children:[Qe.length," orders in selected period"]})]}),(0,w.jsxs)(a.hI,{color:"#2563EB",children:[(0,w.jsx)(a.v0,{children:"Total Orders"}),(0,w.jsx)(a.Os,{children:Qe.length.toLocaleString()}),(0,w.jsx)(a.d1,{children:"For selected period"})]}),(0,w.jsxs)(a.hI,{color:"#DC2626",children:[(0,w.jsx)(a.v0,{children:"Average Order Value"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(Qe.length>0?Xe.reduce((e,t)=>e+t.sales,0)/Qe.length:0,se)}),(0,w.jsx)(a.d1,{children:"Per order"})]}),(0,w.jsxs)(a.hI,{color:"#7C3AED",children:[(0,w.jsx)(a.v0,{children:"Completed Orders"}),(0,w.jsx)(a.Os,{children:Qe.filter(e=>"completed"===e.status).length}),(0,w.jsxs)(a.d1,{children:[Math.round(Qe.filter(e=>"completed"===e.status).length/Qe.length*100||0),"% completion rate"]})]})]}),(0,w.jsxs)($,{children:[(0,w.jsxs)(R,{children:[(0,w.jsx)(z,{children:"Revenue Trend"}),(0,w.jsx)(h.u,{width:"100%",height:300,children:(0,w.jsxs)(x.b,{data:Xe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,w.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,w.jsx)(p.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(g.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,w.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,w.jsx)(v.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,w.jsxs)(R,{children:[(0,w.jsx)(z,{children:"Sales by Category"}),(0,w.jsx)(h.u,{width:"100%",height:300,children:(0,w.jsxs)(m.r,{children:[(0,w.jsx)(y.F,{data:Ze,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Ze.map((e,t)=>(0,w.jsx)(f.f,{fill:te[t%te.length]},`cell-${t}`))}),(0,w.jsx)(j.m,{formatter:e=>`${e}%`})]})})]})]}),(0,w.jsxs)(R,{children:[(0,w.jsx)(z,{children:"Hourly Orders Distribution"}),(0,w.jsx)(h.u,{width:"100%",height:250,children:(0,w.jsxs)(b.E,{data:tt,margin:{top:5,right:20,left:0,bottom:5},children:[(0,w.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,w.jsx)(p.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(g.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,w.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,w.jsx)(F.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,w.jsxs)("div",{style:{display:"details"===le?"block":"none"},children:[(0,w.jsx)(ot,{}),Re?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Qe.length?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,w.jsxs)("div",{children:[(0,w.jsxs)(I,{children:[(0,w.jsxs)(a.hI,{color:"#059669",children:[(0,w.jsx)(a.v0,{children:"Total Revenue"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(Xe.reduce((e,t)=>e+t.sales,0),se)}),(0,w.jsxs)(a.d1,{children:[Qe.length," orders in selected period"]})]}),(0,w.jsxs)(a.hI,{color:"#2563EB",children:[(0,w.jsx)(a.v0,{children:"Total Orders"}),(0,w.jsx)(a.Os,{children:Qe.length.toLocaleString()}),(0,w.jsxs)(a.d1,{children:[Qe.filter(e=>"completed"===e.status).length," completed"]})]}),(0,w.jsxs)(a.hI,{color:"#DC2626",children:[(0,w.jsx)(a.v0,{children:"Average Order Value"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(Qe.length>0?Xe.reduce((e,t)=>e+t.sales,0)/Qe.length:0,se)}),(0,w.jsx)(a.d1,{children:"Per order average"})]}),(0,w.jsxs)(a.hI,{color:"#7C3AED",children:[(0,w.jsx)(a.v0,{children:"Period"}),(0,w.jsx)(a.Os,{children:it()}),(0,w.jsx)(a.d1,{children:"Days"})]})]}),(0,w.jsxs)(T,{children:[(0,w.jsx)(z,{children:"Detailed Sales Breakdown"}),(0,w.jsxs)(L,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(P,{style:{width:"40%"},children:"Period"}),(0,w.jsx)(P,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(P,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(P,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,w.jsx)("tbody",{children:Object.keys(rt).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=rt[e],r=Ue.has(e);return(0,w.jsxs)(n.Fragment,{children:[(0,w.jsxs)(H,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(Ue);if(t.has(e)){var r;t.delete(e);const n=new Set(Ke);Object.keys((null===(r=rt[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),Ve(n)}else t.add(e);Ye(t)})(e),children:[(0,w.jsxs)(U,{level:0,bold:!0,children:[(0,w.jsx)(Y,{expanded:r,children:"\u25b6"}),e]}),(0,w.jsx)(U,{level:0,bold:!0,style:{textAlign:"right"},children:(0,d.vv)(t.revenue,se)}),(0,w.jsx)(U,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,w.jsx)(U,{level:0,bold:!0,style:{textAlign:"right"},children:(0,d.vv)(t.revenue/t.orders,se)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],i=`${e}-${r}`,l=Ke.has(i),a=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,w.jsxs)(n.Fragment,{children:[(0,w.jsxs)(H,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(Ke);t.has(e)?t.delete(e):t.add(e),Ve(t)})(i),children:[(0,w.jsxs)(U,{level:1,bold:!0,children:[(0,w.jsx)(Y,{expanded:l,children:"\u25b6"}),a]}),(0,w.jsx)(U,{level:1,style:{textAlign:"right"},children:(0,d.vv)(s.revenue,se)}),(0,w.jsx)(U,{level:1,style:{textAlign:"right"},children:s.orders}),(0,w.jsx)(U,{level:1,style:{textAlign:"right"},children:(0,d.vv)(s.revenue/s.orders,se)})]}),l&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,w.jsxs)(H,{level:2,children:[(0,w.jsx)(U,{level:2,children:r}),(0,w.jsx)(U,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,d.vv)(t.revenue,se)}),(0,w.jsx)(U,{level:2,style:{textAlign:"right"},children:t.orders}),(0,w.jsx)(U,{level:2,style:{textAlign:"right"},children:(0,d.vv)(t.revenue/t.orders,se)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,w.jsxs)("div",{style:{display:"menu"===le?"block":"none"},children:[(0,w.jsx)(ot,{}),(0,w.jsxs)(I,{children:[(0,w.jsxs)(a.hI,{color:"#F59E0B",children:[(0,w.jsx)(a.v0,{children:"Best Seller"}),(0,w.jsx)(a.Os,{children:(null===(e=et[0])||void 0===e?void 0:e.name)||"N/A"}),(0,w.jsxs)(a.d1,{children:[(null===(t=et[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,w.jsxs)(a.hI,{color:"#10B981",children:[(0,w.jsx)(a.v0,{children:"Total Items Analyzed"}),(0,w.jsx)(a.Os,{children:et.length}),(0,w.jsx)(a.d1,{children:"Complete menu analysis"})]}),(0,w.jsxs)(a.hI,{color:"#3B82F6",children:[(0,w.jsx)(a.v0,{children:"Total Orders"}),(0,w.jsx)(a.Os,{children:et.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,w.jsx)(a.d1,{children:"For selected period"})]}),(0,w.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,w.jsx)(a.v0,{children:"Total Revenue"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(et.reduce((e,t)=>e+t.revenue,0),se)}),(0,w.jsx)(a.d1,{children:"For selected period"})]})]}),(0,w.jsxs)(T,{children:[(0,w.jsx)(z,{children:"Complete Menu Performance Ranking"}),(0,w.jsxs)(L,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(P,{children:"Rank"}),(0,w.jsx)(P,{children:"Menu Item"}),(0,w.jsx)(P,{children:"Category"}),(0,w.jsx)(P,{children:"Price"}),(0,w.jsx)(P,{children:"Orders"}),(0,w.jsx)(P,{children:"Revenue"}),(0,w.jsx)(P,{children:"Performance"})]})}),(0,w.jsx)("tbody",{children:et.map((e,t)=>{var r;const n=(null===(r=et[0])||void 0===r?void 0:r.orders)||1;return(0,w.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsxs)(W,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,w.jsx)(W,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(W,{children:(0,w.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,w.jsx)(W,{children:(0,d.vv)(e.price,se)}),(0,w.jsx)(W,{children:e.orders.toLocaleString()}),(0,w.jsx)(W,{children:(0,d.vv)(e.revenue,se)}),(0,w.jsx)(W,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(N,{percentage:e.orders/n*100}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,w.jsxs)("div",{style:{display:"customers"===le?"block":"none"},children:[(0,w.jsx)(ot,{}),(0,w.jsxs)(I,{children:[(0,w.jsxs)(a.hI,{color:"#635BFF",children:[(0,w.jsx)(a.v0,{children:"Total Customers"}),(0,w.jsx)(a.Os,{children:Te.length.toLocaleString()}),(0,w.jsx)(a.d1,{children:"Across all restaurants"})]}),(0,w.jsxs)(a.hI,{color:"#00D924",children:[(0,w.jsx)(a.v0,{children:"Repeat Customers"}),(0,w.jsx)(a.Os,{children:Te.filter(e=>e.total_orders>1).length}),(0,w.jsxs)(a.d1,{children:[Te.length>0?Math.round(Te.filter(e=>e.total_orders>1).length/Te.length*100):0,"% return rate"]})]}),(0,w.jsxs)(a.hI,{color:"#FFB800",children:[(0,w.jsx)(a.v0,{children:"Average Spent"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(Te.length>0?Te.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/Te.length:0,se)}),(0,w.jsx)(a.d1,{children:"Per customer"})]}),(0,w.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,w.jsx)(a.v0,{children:"Total Points"}),(0,w.jsx)(a.Os,{children:Te.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,w.jsx)(a.d1,{children:"Across all customers"})]})]}),(0,w.jsx)(T,{children:(0,w.jsx)(z,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,w.jsxs)("div",{style:{display:"operations"===le?"block":"none"},children:[(0,w.jsx)(ot,{}),(0,w.jsxs)(I,{children:[(0,w.jsxs)(a.hI,{color:"#10B981",children:[(0,w.jsx)(a.v0,{children:"Order Fulfillment"}),(0,w.jsxs)(a.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,w.jsx)(a.d1,{children:"On-time completion"})]}),(0,w.jsxs)(a.hI,{color:"#F59E0B",children:[(0,w.jsx)(a.v0,{children:"Avg. Wait Time"}),(0,w.jsxs)(a.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,w.jsx)(a.d1,{children:"Estimated"})]}),(0,w.jsxs)(a.hI,{color:"#EF4444",children:[(0,w.jsx)(a.v0,{children:"Peak Hour"}),(0,w.jsx)(a.Os,{children:"12-1 PM"}),(0,w.jsx)(a.d1,{children:"Busiest time"})]}),(0,w.jsxs)(a.hI,{color:"#6366F1",children:[(0,w.jsx)(a.v0,{children:"Staff Efficiency"}),(0,w.jsxs)(a.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,w.jsx)(a.d1,{children:"Estimated"})]})]}),(0,w.jsxs)(T,{children:[(0,w.jsx)(z,{children:"Peak Hours Performance"}),(0,w.jsxs)(L,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(P,{children:"Time Slot"}),(0,w.jsx)(P,{children:"Orders"}),(0,w.jsx)(P,{children:"Revenue"}),(0,w.jsx)(P,{children:"Efficiency"})]})}),(0,w.jsx)("tbody",{children:nt.map((e,t)=>(0,w.jsxs)("tr",{children:[(0,w.jsx)(W,{style:{fontWeight:600},children:e.time}),(0,w.jsx)(W,{children:e.orders}),(0,w.jsx)(W,{children:(0,d.vv)(e.revenue,se)}),(0,w.jsx)(W,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(N,{percentage:e.efficiency}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,w.jsxs)("div",{style:{display:"ranking"===le?"block":"none"},children:[(0,w.jsx)(E,{children:(0,w.jsxs)(M,{children:[(0,w.jsx)(O,{active:"today"===oe,onClick:()=>lt("today"),children:"Today"}),(0,w.jsx)(O,{active:"week"===oe,onClick:()=>lt("week"),children:"This Week"}),(0,w.jsx)(O,{active:"month"===oe,onClick:()=>lt("month"),children:"This Month"}),(0,w.jsx)(O,{active:"year"===oe,onClick:()=>lt("year"),children:"This Year"}),(0,w.jsx)(O,{active:"all"===oe,onClick:()=>lt("all"),children:"All Time"}),xe&&(0,w.jsxs)(B,{children:[(0,w.jsx)(C,{type:"date",value:ce.start,onChange:e=>he(t=>({...t,start:e.target.value}))}),(0,w.jsx)("span",{children:"~"}),(0,w.jsx)(C,{type:"date",value:ce.end,onChange:e=>he(t=>({...t,end:e.target.value}))})]})]})}),(0,w.jsxs)(Z,{children:[(0,w.jsx)(z,{children:"Brand Sales Ranking"}),(0,w.jsxs)(L,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(P,{style:{width:"60px"},children:"Rank"}),(0,w.jsx)(P,{children:"Brand Name"}),(0,w.jsx)(P,{style:{textAlign:"right"},children:"Restaurants"}),(0,w.jsx)(P,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(P,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(P,{style:{width:"150px"},children:"Performance"})]})}),(0,w.jsxs)("tbody",{children:[st.brands.map((e,t)=>{var r;const n=(null===(r=st.brands[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,w.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsx)(W,{children:(0,w.jsx)(ee,{rank:t+1,children:t+1})}),(0,w.jsx)(W,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(W,{style:{textAlign:"right"},children:e.restaurantCount}),(0,w.jsx)(W,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,w.jsx)(W,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,d.vv)(e.revenue,se)}),(0,w.jsx)(W,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(N,{percentage:s}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===st.brands.length&&(0,w.jsx)("tr",{children:(0,w.jsx)(W,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No brand data available"})})]})]})]}),(0,w.jsxs)(Z,{children:[(0,w.jsx)(z,{children:"Restaurant Sales Ranking"}),(0,w.jsxs)(L,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(P,{style:{width:"60px"},children:"Rank"}),(0,w.jsx)(P,{children:"Restaurant Name"}),(0,w.jsx)(P,{children:"Brand"}),(0,w.jsx)(P,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(P,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(P,{style:{width:"150px"},children:"Performance"})]})}),(0,w.jsxs)("tbody",{children:[st.restaurants.slice(0,20).map((e,t)=>{var r;const n=(null===(r=st.restaurants[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,w.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsx)(W,{children:(0,w.jsx)(ee,{rank:t+1,children:t+1})}),(0,w.jsx)(W,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(W,{children:(0,w.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",backgroundColor:"Independent"===e.brandName?"#F3F4F6":"#E0E7FF",color:"Independent"===e.brandName?"#6B7280":"#4338CA"},children:e.brandName})}),(0,w.jsx)(W,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,w.jsx)(W,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,d.vv)(e.revenue,se)}),(0,w.jsx)(W,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(N,{percentage:s}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===st.restaurants.length&&(0,w.jsx)("tr",{children:(0,w.jsx)(W,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}},4021:(e,t,r)=>{r.d(t,{i1:()=>l});var n=r(9950),s=r(1367),i=r(6038);const l=()=>{const{user:e}=(0,s.As)(),[t,r]=(0,n.useState)("RM"),[l,a]=(0,n.useState)(Object.keys(i.DL)),[o,d]=(0,n.useState)(!0),[c,h]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let s=n>=0?t[n+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),n=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";r(n)}else r("RM")}catch(l){console.error("Failed to fetch restaurant currency:",l),h("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:l,loading:o,error:c}}}}]);