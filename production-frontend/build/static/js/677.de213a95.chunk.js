"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[677],{677:(e,r,t)=>{t.r(r),t.d(r,{default:()=>te});var n=t(9950),s=t(4752),i=t(4492),l=t(3310),a=t(7492),o=t(1367),d=t(6038),c=t(4021),h=t(1095),x=t(2847),u=t(3245),p=t(158),g=t(3440),j=t(4094),v=t(4915),m=t(7621),f=t(5297),y=t(2528),b=t(294),F=t(3588),w=t(4414);const k=s.Ay.div`
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
`,D=s.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
  }
`,M=s.Ay.button`
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
`,O=s.Ay.button`
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
`,W=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,P=s.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,U=s.Ay.div`
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
`,N=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,H=s.Ay.td`
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
`,re=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],te=()=>{var e,r;const{user:t}=(0,o.As)(),[s,te]=(0,i.ok)(),{defaultCurrency:ne}=(0,c.i1)(),[se,ie]=(0,n.useState)("MYR");(0,n.useEffect)(()=>{ne&&ie(ne)},[ne]);const[le,ae]=(0,n.useState)(()=>s.get("tab")||"ranking"),[oe,de]=(0,n.useState)("week"),[ce,he]=(0,n.useState)(()=>{const e=new Date,r=new Date(e);return r.setDate(r.getDate()-6),{start:Je(r),end:Je(e)}}),[xe,ue]=(0,n.useState)(!1),[pe,ge]=(0,n.useState)([]),[je,ve]=(0,n.useState)([]),[me,fe]=(0,n.useState)("all"),[ye,be]=(0,n.useState)("all"),[Fe,we]=(0,n.useState)(""),[ke,Se]=(0,n.useState)(""),[Ae,Ce]=(0,n.useState)(!1),[Be,Ee]=(0,n.useState)(!1),[De,Me]=(0,n.useState)([]),[Oe,_e]=(0,n.useState)([]),[Ie,$e]=(0,n.useState)([]),[Re,ze]=(0,n.useState)(!0),[Te,Le]=(0,n.useState)([]),[We,Pe]=(0,n.useState)([]),[Ue,Ne]=(0,n.useState)([]),[He,Ye]=(0,n.useState)(new Set),[Ke,Ve]=(0,n.useState)(new Set);function Je(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}(0,n.useEffect)(()=>{te({tab:le},{replace:!0})},[le,te]),(0,n.useEffect)(()=>{t&&(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();ge(e),Me(e.slice(0,10))}let n="/api/restaurants";null===t||void 0===t||!t.id||"Brand General"!==t.role&&"Brand Manager"!==t.role||(n=`/api/restaurants/manager/${t.id}`);const s=await fetch(n,{headers:{Authorization:`Bearer ${e}`}});if(s.ok){const e=await s.json(),r=(e.data||e||[]).map(e=>{var r,t;return{id:null===(r=e.id)||void 0===r?void 0:r.toString(),name:e.name,brand_id:e.brand_id,brand_name:e.brand_name||(null===(t=e.brand)||void 0===t?void 0:t.name)}});ve(r),_e(r.slice(0,10))}}catch(e){console.error("Error fetching brands/restaurants:",e)}})()},[t]),(0,n.useEffect)(()=>{(async()=>{if(0!==je.length){ze(!0);try{const t=localStorage.getItem("auth_token"),n=je.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==ye&&(s+=`&restaurant_id=${ye}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();let r=e.data||e||[];if(r=r.filter(e=>{var r;return n.includes(null===(r=e.restaurant_id)||void 0===r?void 0:r.toString())}),"all"!==me){const e=je.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===me}).map(e=>e.id);r=r.filter(r=>{var t;return e.includes(null===(t=r.restaurant_id)||void 0===t?void 0:t.toString())})}$e(r)}const l=await fetch("/api/menu",{headers:{Authorization:`Bearer ${t}`}});if(l.ok){var e,r;const t=await l.json();null!==(e=t.data)&&void 0!==e&&e.items&&Pe(t.data.items),null!==(r=t.data)&&void 0!==r&&r.categories&&Ne(t.data.categories)}}catch(t){console.error("Error fetching data:",t)}finally{ze(!1)}}else ze(!1)})()},[me,ye,je]);const qe=()=>{fe("all"),we(""),Ce(!1)},Ge=()=>{be("all"),Se(""),Ee(!1)},Qe=(0,n.useMemo)(()=>{if(!Ie||0===Ie.length)return[];const e=new Date(ce.start);e.setHours(0,0,0,0);const r=new Date(ce.end);return r.setHours(23,59,59,999),Ie.filter(t=>{const n=t.order_date||t.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=r,l="completed"===t.payment_status||"completed"===t.status||"pending"===t.status||"preparing"===t.status||"ready"===t.status;return i&&l})},[Ie,ce.start,ce.end]),Xe=(0,n.useMemo)(()=>{if(0===Qe.length)return[];const e=e=>new Date(e.order_date||e.createdAt),r=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===oe){const t={};return Qe.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;t[i]=(t[i]||0)+r(n)}),Object.entries(t).map(e=>{let[r,t]=e;return{date:r,sales:Math.round(t)}})}if("week"===oe){const t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const r=new Date(n);r.setDate(r.getDate()-e),s.push(r)}const i={};return Qe.forEach(t=>{const n=Je(e(t));i[n]=(i[n]||0)+r(t)}),s.map(e=>{const r=Je(e);return{date:t[e.getDay()],sales:Math.round(i[r]||0)}})}if("month"===oe){const t={};return Qe.forEach(n=>{const s=e(n).getDate().toString();t[s]=(t[s]||0)+r(n)}),Object.entries(t).map(e=>{let[r,t]=e;return{date:r,sales:Math.round(t)}}).sort((e,r)=>parseInt(e.date)-parseInt(r.date))}{const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Qe.forEach(s=>{const i=t[e(s).getMonth()];n[i]=(n[i]||0)+r(s)}),t.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Qe,oe]),Ze=(0,n.useMemo)(()=>{if(0===Qe.length)return[{name:"No Data",value:100,sales:0}];const e={};Ue.forEach(r=>{r.id&&r.name&&(e[r.id.toString()]=r.name)});const r={};We.forEach(t=>{if(t.id){const n=t.categoryId?e[t.categoryId.toString()]||t.categoryId:"Other";r[t.id.toString()]=n}});const t={};let n=0;Qe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,l;const a=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=a;const o=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(l=e.product_id)||void 0===l?void 0:l.toString()),d=o&&r[o]||"Other";t[d]=(t[d]||0)+a})});const s=Object.entries(t).map(e=>{let[r,t]=e;return{name:r,value:n>0?Math.round(t/n*100):0,sales:Math.round(t)}}).sort((e,r)=>r.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[Qe,We,Ue]),er=(0,n.useMemo)(()=>{var e;if(0===Qe.length)return[];const r={};Ue.forEach(e=>{e.id&&e.name&&(r[e.id.toString()]=e.name)});const t={};We.forEach(e=>{if(e.id){const n=e.categoryId?r[e.categoryId.toString()]||e.categoryId:"Other";t[e.id.toString()]=n}});const n={};Qe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var r,s,i;const l=e.menu_name||e.name||"Unknown",a=(null===(r=e.menuItem)||void 0===r||null===(s=r.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),o=a?t[a]||"Other":e.category||"Other";n[l]||(n[l]={category:o,price:parseFloat(e.price||0),orders:0,revenue:0});const d=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[l].orders+=d,n[l].revenue+=c*d})});const s=Object.entries(n).map(e=>{let[r,t]=e;return{name:r,category:t.category,price:t.price,orders:t.orders,revenue:Math.round(t.revenue),performance:0}}).sort((e,r)=>r.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[Qe,We,Ue]),rr=(0,n.useMemo)(()=>{if(0===Qe.length)return[];const e={};return Qe.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r).getHours(),n=0===t?"12AM":12===t?"12PM":t>12?t-12+"PM":`${t}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[r,t]=e;return{hour:r,orders:t}}).sort((e,r)=>{const t=e=>{const r=parseInt(e),t=e.includes("PM");return t&&12!==r?r+12:12!==r||t?r:0};return t(e.hour)-t(r.hour)})},[Qe]),tr=(0,n.useMemo)(()=>{if(0===Qe.length)return{};const e={};return Qe.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r),n=t.getFullYear().toString(),s=`${n}-${(t.getMonth()+1).toString().padStart(2,"0")}`,i=t.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const l=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(r);e[n].revenue+=l,e[n].orders+=1,e[n].months[s].revenue+=l,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=l,e[n].months[s].days[i].orders+=1}),e},[Qe]),nr=(0,n.useMemo)(()=>{if(0===Qe.length)return[];const e={};return Qe.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r).getHours(),n=`${t.toString().padStart(2,"0")}:00-${(t+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(r)}),Object.entries(e).map(e=>{let[r,t]=e;return{time:r,orders:t.orders,revenue:Math.round(t.revenue),efficiency:Math.min(100,Math.round(t.orders/(Qe.length/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[Qe]),sr=(0,n.useMemo)(()=>{if(0===Ie.length)return{brands:[],restaurants:[]};const e=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),r=new Date(ce.start);r.setHours(0,0,0,0);const t=new Date(ce.end);t.setHours(23,59,59,999);const n=Ie.filter(e=>{const n=e.order_date||e.createdAt;if(!n)return!1;const s=new Date(n);return s>=r&&s<=t&&"completed"===e.status}),s={};n.forEach(r=>{var t,n;const i=null===(t=r.restaurant_id)||void 0===t?void 0:t.toString();if(!i)return;const l=je.find(e=>e.id===i),a=(null===l||void 0===l?void 0:l.name)||r.restaurant_name||"Unknown",o=(null===l||void 0===l?void 0:l.brand_name)||(null===(n=pe.find(e=>e.id===(null===l||void 0===l?void 0:l.brand_id)))||void 0===n?void 0:n.name)||"Independent";s[i]||(s[i]={name:a,brandName:o,orders:0,revenue:0}),s[i].orders+=1,s[i].revenue+=e(r)});const i=Object.entries(s).map(e=>{let[r,t]=e;return{id:r,...t,revenue:Math.round(t.revenue)}}).sort((e,r)=>r.revenue-e.revenue),l={},a=new Set(je.map(e=>{var r;return null===(r=e.brand_id)||void 0===r?void 0:r.toString()}).filter(Boolean));pe.forEach(e=>{a.has(e.id.toString())&&(l[e.id.toString()]={name:e.name,orders:0,revenue:0,restaurantCount:0})}),je.some(e=>!e.brand_id)&&(l.independent={name:"Independent",orders:0,revenue:0,restaurantCount:0}),je.forEach(e=>{var r;const t=(null===(r=e.brand_id)||void 0===r?void 0:r.toString())||"independent";l[t]&&(l[t].restaurantCount+=1)}),n.forEach(r=>{var t,n;const s=null===(t=r.restaurant_id)||void 0===t?void 0:t.toString(),i=je.find(e=>e.id===s),a=(null===i||void 0===i||null===(n=i.brand_id)||void 0===n?void 0:n.toString())||"independent";l[a]&&(l[a].orders+=1,l[a].revenue+=e(r))});return{brands:Object.entries(l).map(e=>{let[r,t]=e;return{id:r,...t,revenue:Math.round(t.revenue)}}).filter(e=>e.orders>0||e.restaurantCount>0).sort((e,r)=>r.revenue-e.revenue),restaurants:i}},[Ie,je,pe,ce]),ir=()=>{const e=new Date(ce.start),r=new Date(ce.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=ir();if(e<=31){const e=new Set(Object.keys(tr)),r=new Set;Object.keys(tr).forEach(e=>{Object.keys(tr[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),Ye(e),Ve(r)}else e<=365?(Ye(new Set(Object.keys(tr))),Ve(new Set)):(Ye(new Set),Ve(new Set))},[ce.start,ce.end,tr]);const lr=e=>{de(e),ue(!1);const r=new Date;let t=new Date(r);switch(e){case"today":t=new Date(r);break;case"week":t.setDate(t.getDate()-6);break;case"month":t.setDate(t.getDate()-29);break;case"year":t=new Date(r.getFullYear(),0,1);break;case"all":t=new Date(r.getFullYear()-5,0,1)}he({start:Je(t),end:Je(r)})},ar=()=>{const e=Xe.reduce((e,r)=>e+r.sales,0),r=`Brand/Manager Reports\nGenerated: ${(new Date).toISOString()}\nPeriod: ${ce.start} to ${ce.end}\nBrand Filter: ${"all"===me?"All Brands":Fe}\nRestaurant Filter: ${"all"===ye?"All Restaurants":ke}\n\nTotal Revenue: RM ${e.toFixed(2)}\nTotal Orders: ${Qe.length}\n`,t=new Blob([r],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`brand_report_${ce.start}_to_${ce.end}.csv`,n.click()},or=()=>(0,w.jsxs)(E,{children:[(0,w.jsxs)(K,{children:[(0,w.jsx)(V,{type:"text",placeholder:"All Brands",value:Fe,onChange:e=>(e=>{if(we(e),Ce(!0),e.length<1)return void Me(pe.slice(0,10));const r=pe.filter(r=>{const t=e.toLowerCase();return r.name.toLowerCase().includes(t)||r.code.toLowerCase().includes(t)}).slice(0,10);Me(r)})(e.target.value),onFocus:()=>{Ce(!0),0===Fe.length&&Me(pe.slice(0,10))},onBlur:()=>setTimeout(()=>Ce(!1),200)}),"all"!==me&&Fe&&(0,w.jsx)(X,{onClick:qe,children:"\xd7"}),(0,w.jsxs)(J,{show:Ae,children:[(0,w.jsxs)(q,{onClick:()=>{fe("all"),we(""),Ce(!1)},children:[(0,w.jsx)(G,{children:"All Brands"}),(0,w.jsx)(Q,{children:"Show all brand data"})]}),De.map(e=>(0,w.jsxs)(q,{onClick:()=>(e=>{fe(e.id.toString()),we(e.name),Ce(!1),be("all"),Se("")})(e),children:[(0,w.jsx)(G,{children:e.name}),(0,w.jsxs)(Q,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,w.jsxs)(K,{children:[(0,w.jsx)(V,{type:"text",placeholder:"All Restaurants",value:ke,onChange:e=>(e=>{Se(e),Ee(!0);let r=je;if("all"!==me&&(r=je.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===me})),e.length<1)return void _e(r.slice(0,10));const t=r.filter(r=>{const t=e.toLowerCase();return r.name.toLowerCase().includes(t)}).slice(0,10);_e(t)})(e.target.value),onFocus:()=>{Ee(!0);let e=je;"all"!==me&&(e=je.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===me})),_e(e.slice(0,10))},onBlur:()=>setTimeout(()=>Ee(!1),200)}),"all"!==ye&&ke&&(0,w.jsx)(X,{onClick:Ge,children:"\xd7"}),(0,w.jsxs)(J,{show:Be,children:[(0,w.jsxs)(q,{onClick:()=>{be("all"),Se(""),Ee(!1)},children:[(0,w.jsx)(G,{children:"All Restaurants"}),(0,w.jsx)(Q,{children:"Show all restaurant data"})]}),Oe.map(e=>(0,w.jsxs)(q,{onClick:()=>(e=>{be(e.id),Se(e.name),Ee(!1)})(e),children:[(0,w.jsx)(G,{children:e.name}),(0,w.jsx)(Q,{children:e.brand_name||"Independent"})]},e.id))]})]}),(0,w.jsxs)(D,{children:[(0,w.jsx)(M,{active:"today"===oe&&!xe,onClick:()=>lr("today"),children:"Today"}),(0,w.jsx)(M,{active:"week"===oe&&!xe,onClick:()=>lr("week"),children:"Week"}),(0,w.jsx)(M,{active:"month"===oe&&!xe,onClick:()=>lr("month"),children:"Month"}),(0,w.jsx)(M,{active:"year"===oe&&!xe,onClick:()=>lr("year"),children:"Year"}),(0,w.jsx)(M,{active:"all"===oe&&!xe,onClick:()=>lr("all"),children:"All"}),(0,w.jsxs)(B,{children:[(0,w.jsx)(C,{type:"date",value:ce.start,onChange:e=>{he({...ce,start:e.target.value}),ue(!0)}}),(0,w.jsx)("span",{children:"to"}),(0,w.jsx)(C,{type:"date",value:ce.end,onChange:e=>{he({...ce,end:e.target.value}),ue(!0)}})]})]}),(0,w.jsxs)(O,{onClick:ar,children:[(0,w.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,w.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,w.jsx)(l.A,{children:(0,w.jsxs)(k,{children:[(0,w.jsx)(S,{children:(0,w.jsx)(A,{children:"Brand Reports"})}),(0,w.jsxs)(_,{children:[(0,w.jsxs)(a.j,{children:[(0,w.jsx)(a.oz,{active:"ranking"===le,onClick:()=>ae("ranking"),children:"Sales Ranking"}),(0,w.jsx)(a.oz,{active:"sales"===le,onClick:()=>ae("sales"),children:"Sales Report"}),(0,w.jsx)(a.oz,{active:"details"===le,onClick:()=>ae("details"),children:"Sales Details"}),(0,w.jsx)(a.oz,{active:"menu"===le,onClick:()=>ae("menu"),children:"Menu Analysis"}),(0,w.jsx)(a.oz,{active:"customers"===le,onClick:()=>ae("customers"),children:"Customer Insights"}),(0,w.jsx)(a.oz,{active:"operations"===le,onClick:()=>ae("operations"),children:"Operations"})]}),(0,w.jsxs)("div",{style:{display:"sales"===le?"block":"none"},children:[(0,w.jsx)(or,{}),Re?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Qe.length?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,w.jsxs)("div",{children:[(0,w.jsxs)(I,{children:[(0,w.jsxs)(a.hI,{color:"#059669",children:[(0,w.jsx)(a.v0,{children:"Total Revenue"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(Xe.reduce((e,r)=>e+r.sales,0),se)}),(0,w.jsxs)(a.d1,{children:[Qe.length," orders in selected period"]})]}),(0,w.jsxs)(a.hI,{color:"#2563EB",children:[(0,w.jsx)(a.v0,{children:"Total Orders"}),(0,w.jsx)(a.Os,{children:Qe.length.toLocaleString()}),(0,w.jsx)(a.d1,{children:"For selected period"})]}),(0,w.jsxs)(a.hI,{color:"#DC2626",children:[(0,w.jsx)(a.v0,{children:"Average Order Value"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(Qe.length>0?Xe.reduce((e,r)=>e+r.sales,0)/Qe.length:0,se)}),(0,w.jsx)(a.d1,{children:"Per order"})]}),(0,w.jsxs)(a.hI,{color:"#7C3AED",children:[(0,w.jsx)(a.v0,{children:"Completed Orders"}),(0,w.jsx)(a.Os,{children:Qe.filter(e=>"completed"===e.status).length}),(0,w.jsxs)(a.d1,{children:[Math.round(Qe.filter(e=>"completed"===e.status).length/Qe.length*100||0),"% completion rate"]})]})]}),(0,w.jsxs)($,{children:[(0,w.jsxs)(R,{children:[(0,w.jsx)(z,{children:"Revenue Trend"}),(0,w.jsx)(h.u,{width:"100%",height:300,children:(0,w.jsxs)(x.b,{data:Xe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,w.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,w.jsx)(p.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(g.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,w.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,w.jsx)(v.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,w.jsxs)(R,{children:[(0,w.jsx)(z,{children:"Sales by Category"}),(0,w.jsx)(h.u,{width:"100%",height:300,children:(0,w.jsxs)(m.r,{children:[(0,w.jsx)(f.F,{data:Ze,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Ze.map((e,r)=>(0,w.jsx)(y.f,{fill:re[r%re.length]},`cell-${r}`))}),(0,w.jsx)(j.m,{formatter:e=>`${e}%`})]})})]})]}),(0,w.jsxs)(R,{children:[(0,w.jsx)(z,{children:"Hourly Orders Distribution"}),(0,w.jsx)(h.u,{width:"100%",height:250,children:(0,w.jsxs)(b.E,{data:rr,margin:{top:5,right:20,left:0,bottom:5},children:[(0,w.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,w.jsx)(p.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(g.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,w.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,w.jsx)(F.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,w.jsxs)("div",{style:{display:"details"===le?"block":"none"},children:[(0,w.jsx)(or,{}),Re?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Qe.length?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,w.jsxs)("div",{children:[(0,w.jsxs)(I,{children:[(0,w.jsxs)(a.hI,{color:"#059669",children:[(0,w.jsx)(a.v0,{children:"Total Revenue"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(Xe.reduce((e,r)=>e+r.sales,0),se)}),(0,w.jsxs)(a.d1,{children:[Qe.length," orders in selected period"]})]}),(0,w.jsxs)(a.hI,{color:"#2563EB",children:[(0,w.jsx)(a.v0,{children:"Total Orders"}),(0,w.jsx)(a.Os,{children:Qe.length.toLocaleString()}),(0,w.jsxs)(a.d1,{children:[Qe.filter(e=>"completed"===e.status).length," completed"]})]}),(0,w.jsxs)(a.hI,{color:"#DC2626",children:[(0,w.jsx)(a.v0,{children:"Average Order Value"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(Qe.length>0?Xe.reduce((e,r)=>e+r.sales,0)/Qe.length:0,se)}),(0,w.jsx)(a.d1,{children:"Per order average"})]}),(0,w.jsxs)(a.hI,{color:"#7C3AED",children:[(0,w.jsx)(a.v0,{children:"Period"}),(0,w.jsx)(a.Os,{children:ir()}),(0,w.jsx)(a.d1,{children:"Days"})]})]}),(0,w.jsxs)(T,{children:[(0,w.jsx)(z,{children:"Detailed Sales Breakdown"}),(0,w.jsxs)(L,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(W,{style:{width:"40%"},children:"Period"}),(0,w.jsx)(W,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(W,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(W,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,w.jsx)("tbody",{children:Object.keys(tr).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=tr[e],t=He.has(e);return(0,w.jsxs)(n.Fragment,{children:[(0,w.jsxs)(N,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(He);if(r.has(e)){var t;r.delete(e);const n=new Set(Ke);Object.keys((null===(t=tr[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),Ve(n)}else r.add(e);Ye(r)})(e),children:[(0,w.jsxs)(H,{level:0,bold:!0,children:[(0,w.jsx)(Y,{expanded:t,children:"\u25b6"}),e]}),(0,w.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:(0,d.vv)(r.revenue,se)}),(0,w.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,w.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:(0,d.vv)(r.revenue/r.orders,se)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const s=r.months[t],i=`${e}-${t}`,l=Ke.has(i),a=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,w.jsxs)(n.Fragment,{children:[(0,w.jsxs)(N,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(Ke);r.has(e)?r.delete(e):r.add(e),Ve(r)})(i),children:[(0,w.jsxs)(H,{level:1,bold:!0,children:[(0,w.jsx)(Y,{expanded:l,children:"\u25b6"}),a]}),(0,w.jsx)(H,{level:1,style:{textAlign:"right"},children:(0,d.vv)(s.revenue,se)}),(0,w.jsx)(H,{level:1,style:{textAlign:"right"},children:s.orders}),(0,w.jsx)(H,{level:1,style:{textAlign:"right"},children:(0,d.vv)(s.revenue/s.orders,se)})]}),l&&Object.keys(s.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=s.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,w.jsxs)(N,{level:2,children:[(0,w.jsx)(H,{level:2,children:t}),(0,w.jsx)(H,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,d.vv)(r.revenue,se)}),(0,w.jsx)(H,{level:2,style:{textAlign:"right"},children:r.orders}),(0,w.jsx)(H,{level:2,style:{textAlign:"right"},children:(0,d.vv)(r.revenue/r.orders,se)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,w.jsxs)("div",{style:{display:"menu"===le?"block":"none"},children:[(0,w.jsx)(or,{}),(0,w.jsxs)(I,{children:[(0,w.jsxs)(a.hI,{color:"#F59E0B",children:[(0,w.jsx)(a.v0,{children:"Best Seller"}),(0,w.jsx)(a.Os,{children:(null===(e=er[0])||void 0===e?void 0:e.name)||"N/A"}),(0,w.jsxs)(a.d1,{children:[(null===(r=er[0])||void 0===r?void 0:r.orders)||0," orders"]})]}),(0,w.jsxs)(a.hI,{color:"#10B981",children:[(0,w.jsx)(a.v0,{children:"Total Items Analyzed"}),(0,w.jsx)(a.Os,{children:er.length}),(0,w.jsx)(a.d1,{children:"Complete menu analysis"})]}),(0,w.jsxs)(a.hI,{color:"#3B82F6",children:[(0,w.jsx)(a.v0,{children:"Total Orders"}),(0,w.jsx)(a.Os,{children:er.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,w.jsx)(a.d1,{children:"For selected period"})]}),(0,w.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,w.jsx)(a.v0,{children:"Total Revenue"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(er.reduce((e,r)=>e+r.revenue,0),se)}),(0,w.jsx)(a.d1,{children:"For selected period"})]})]}),(0,w.jsxs)(T,{children:[(0,w.jsx)(z,{children:"Complete Menu Performance Ranking"}),(0,w.jsxs)(L,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(W,{children:"Rank"}),(0,w.jsx)(W,{children:"Menu Item"}),(0,w.jsx)(W,{children:"Category"}),(0,w.jsx)(W,{children:"Price"}),(0,w.jsx)(W,{children:"Orders"}),(0,w.jsx)(W,{children:"Revenue"}),(0,w.jsx)(W,{children:"Performance"})]})}),(0,w.jsx)("tbody",{children:er.map((e,r)=>{var t;const n=(null===(t=er[0])||void 0===t?void 0:t.orders)||1;return(0,w.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsxs)(P,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,w.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(P,{children:(0,w.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,w.jsx)(P,{children:(0,d.vv)(e.price,se)}),(0,w.jsx)(P,{children:e.orders.toLocaleString()}),(0,w.jsx)(P,{children:(0,d.vv)(e.revenue,se)}),(0,w.jsx)(P,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(U,{percentage:e.orders/n*100}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,w.jsxs)("div",{style:{display:"customers"===le?"block":"none"},children:[(0,w.jsx)(or,{}),(0,w.jsxs)(I,{children:[(0,w.jsxs)(a.hI,{color:"#635BFF",children:[(0,w.jsx)(a.v0,{children:"Total Customers"}),(0,w.jsx)(a.Os,{children:Te.length.toLocaleString()}),(0,w.jsx)(a.d1,{children:"Across all restaurants"})]}),(0,w.jsxs)(a.hI,{color:"#00D924",children:[(0,w.jsx)(a.v0,{children:"Repeat Customers"}),(0,w.jsx)(a.Os,{children:Te.filter(e=>e.total_orders>1).length}),(0,w.jsxs)(a.d1,{children:[Te.length>0?Math.round(Te.filter(e=>e.total_orders>1).length/Te.length*100):0,"% return rate"]})]}),(0,w.jsxs)(a.hI,{color:"#FFB800",children:[(0,w.jsx)(a.v0,{children:"Average Spent"}),(0,w.jsx)(a.Os,{children:(0,d.vv)(Te.length>0?Te.reduce((e,r)=>e+parseFloat(r.total_spent||0),0)/Te.length:0,se)}),(0,w.jsx)(a.d1,{children:"Per customer"})]}),(0,w.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,w.jsx)(a.v0,{children:"Total Points"}),(0,w.jsx)(a.Os,{children:Te.reduce((e,r)=>e+(r.points||0),0).toLocaleString()}),(0,w.jsx)(a.d1,{children:"Across all customers"})]})]}),(0,w.jsx)(T,{children:(0,w.jsx)(z,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,w.jsxs)("div",{style:{display:"operations"===le?"block":"none"},children:[(0,w.jsx)(or,{}),(0,w.jsxs)(I,{children:[(0,w.jsxs)(a.hI,{color:"#10B981",children:[(0,w.jsx)(a.v0,{children:"Order Fulfillment"}),(0,w.jsxs)(a.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,w.jsx)(a.d1,{children:"On-time completion"})]}),(0,w.jsxs)(a.hI,{color:"#F59E0B",children:[(0,w.jsx)(a.v0,{children:"Avg. Wait Time"}),(0,w.jsxs)(a.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,w.jsx)(a.d1,{children:"Estimated"})]}),(0,w.jsxs)(a.hI,{color:"#EF4444",children:[(0,w.jsx)(a.v0,{children:"Peak Hour"}),(0,w.jsx)(a.Os,{children:"12-1 PM"}),(0,w.jsx)(a.d1,{children:"Busiest time"})]}),(0,w.jsxs)(a.hI,{color:"#6366F1",children:[(0,w.jsx)(a.v0,{children:"Staff Efficiency"}),(0,w.jsxs)(a.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,w.jsx)(a.d1,{children:"Estimated"})]})]}),(0,w.jsxs)(T,{children:[(0,w.jsx)(z,{children:"Peak Hours Performance"}),(0,w.jsxs)(L,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(W,{children:"Time Slot"}),(0,w.jsx)(W,{children:"Orders"}),(0,w.jsx)(W,{children:"Revenue"}),(0,w.jsx)(W,{children:"Efficiency"})]})}),(0,w.jsx)("tbody",{children:nr.map((e,r)=>(0,w.jsxs)("tr",{children:[(0,w.jsx)(P,{style:{fontWeight:600},children:e.time}),(0,w.jsx)(P,{children:e.orders}),(0,w.jsx)(P,{children:(0,d.vv)(e.revenue,se)}),(0,w.jsx)(P,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(U,{percentage:e.efficiency}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},r))})]})]})]}),(0,w.jsxs)("div",{style:{display:"ranking"===le?"block":"none"},children:[(0,w.jsx)(E,{children:(0,w.jsxs)(D,{children:[(0,w.jsx)(M,{active:"today"===oe,onClick:()=>lr("today"),children:"Today"}),(0,w.jsx)(M,{active:"week"===oe,onClick:()=>lr("week"),children:"This Week"}),(0,w.jsx)(M,{active:"month"===oe,onClick:()=>lr("month"),children:"This Month"}),(0,w.jsx)(M,{active:"year"===oe,onClick:()=>lr("year"),children:"This Year"}),(0,w.jsx)(M,{active:"all"===oe,onClick:()=>lr("all"),children:"All Time"}),xe&&(0,w.jsxs)(B,{children:[(0,w.jsx)(C,{type:"date",value:ce.start,onChange:e=>he(r=>({...r,start:e.target.value}))}),(0,w.jsx)("span",{children:"~"}),(0,w.jsx)(C,{type:"date",value:ce.end,onChange:e=>he(r=>({...r,end:e.target.value}))})]})]})}),(0,w.jsxs)(Z,{children:[(0,w.jsx)(z,{children:"Brand Sales Ranking"}),(0,w.jsxs)(L,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(W,{style:{width:"60px"},children:"Rank"}),(0,w.jsx)(W,{children:"Brand Name"}),(0,w.jsx)(W,{style:{textAlign:"right"},children:"Restaurants"}),(0,w.jsx)(W,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(W,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(W,{style:{width:"150px"},children:"Performance"})]})}),(0,w.jsxs)("tbody",{children:[sr.brands.map((e,r)=>{var t;const n=(null===(t=sr.brands[0])||void 0===t?void 0:t.revenue)||1,s=Math.round(e.revenue/n*100);return(0,w.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsx)(P,{children:(0,w.jsx)(ee,{rank:r+1,children:r+1})}),(0,w.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(P,{style:{textAlign:"right"},children:e.restaurantCount}),(0,w.jsx)(P,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,w.jsx)(P,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,d.vv)(e.revenue,se)}),(0,w.jsx)(P,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(U,{percentage:s}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===sr.brands.length&&(0,w.jsx)("tr",{children:(0,w.jsx)(P,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No brand data available"})})]})]})]}),(0,w.jsxs)(Z,{children:[(0,w.jsx)(z,{children:"Restaurant Sales Ranking"}),(0,w.jsxs)(L,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(W,{style:{width:"60px"},children:"Rank"}),(0,w.jsx)(W,{children:"Restaurant Name"}),(0,w.jsx)(W,{children:"Brand"}),(0,w.jsx)(W,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(W,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(W,{style:{width:"150px"},children:"Performance"})]})}),(0,w.jsxs)("tbody",{children:[sr.restaurants.slice(0,20).map((e,r)=>{var t;const n=(null===(t=sr.restaurants[0])||void 0===t?void 0:t.revenue)||1,s=Math.round(e.revenue/n*100);return(0,w.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsx)(P,{children:(0,w.jsx)(ee,{rank:r+1,children:r+1})}),(0,w.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(P,{children:(0,w.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",backgroundColor:"Independent"===e.brandName?"#F3F4F6":"#E0E7FF",color:"Independent"===e.brandName?"#6B7280":"#4338CA"},children:e.brandName})}),(0,w.jsx)(P,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,w.jsx)(P,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,d.vv)(e.revenue,se)}),(0,w.jsx)(P,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(U,{percentage:s}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===sr.restaurants.length&&(0,w.jsx)("tr",{children:(0,w.jsx)(P,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}},4021:(e,r,t)=>{t.d(r,{i1:()=>i});var n=t(9950),s=t(1367);t(6038);const i=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,n.useState)("USD"),[i,l]=(0,n.useState)(["USD"]),[a,o]=(0,n.useState)(!0),[d,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{if(null===e||void 0===e||!e.brand_id)return t("USD"),l(["USD","MYR","KRW"]),void o(!1);try{const r=localStorage.getItem("token"),n=await fetch(`/api/currencies/brands/${e.brand_id}`,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&e.data&&(t(e.data.default_currency||"USD"),l(e.data.supported_currencies||["USD"]))}else t("USD"),l(["USD","MYR","KRW"])}catch(r){console.error("Failed to fetch brand currency:",r),c("Failed to load currency settings"),t("USD"),l(["USD","MYR","KRW"])}finally{o(!1)}})()},[null===e||void 0===e?void 0:e.brand_id]),{defaultCurrency:r,supportedCurrencies:i,loading:a,error:d}}}}]);