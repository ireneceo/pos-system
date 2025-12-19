"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[677],{677:(e,r,t)=>{t.r(r),t.d(r,{default:()=>re});var n=t(9950),s=t(4752),i=t(4492),l=t(3310),o=t(7492),a=t(1367),d=t(6038),c=t(1095),h=t(2847),x=t(3245),u=t(158),p=t(3440),g=t(4094),j=t(4915),v=t(7621),m=t(5297),y=t(2528),f=t(294),b=t(3588),F=t(4414);const w=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,k=s.Ay.div`
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
`,S=s.Ay.input`
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
`,C=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,B=s.Ay.div`
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
`,E=s.Ay.button`
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
`,D=s.Ay.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,_=o.MD,R=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,I=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,$=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,z=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,T=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,L=s.Ay.th`
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
`,W=s.Ay.div`
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
`,U=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,Y=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,K=s.Ay.input`
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
`,V=s.Ay.div`
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
`,J=s.Ay.div`
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
`,q=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,G=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,Q=s.Ay.button`
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
`,X=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,Z=s.Ay.span`
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
`,ee=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],re=()=>{var e,r;const{user:t}=(0,a.As)(),[s,re]=(0,i.ok)(),[te,ne]=(0,n.useState)(()=>s.get("tab")||"ranking"),[se,ie]=(0,n.useState)("week"),[le,oe]=(0,n.useState)(()=>{const e=new Date,r=new Date(e);return r.setDate(r.getDate()-6),{start:Ue(r),end:Ue(e)}}),[ae,de]=(0,n.useState)(!1),[ce,he]=(0,n.useState)([]),[xe,ue]=(0,n.useState)([]),[pe,ge]=(0,n.useState)("all"),[je,ve]=(0,n.useState)("all"),[me,ye]=(0,n.useState)(""),[fe,be]=(0,n.useState)(""),[Fe,we]=(0,n.useState)(!1),[ke,Ae]=(0,n.useState)(!1),[Se,Ce]=(0,n.useState)([]),[Be,Me]=(0,n.useState)([]),[Ee,Oe]=(0,n.useState)([]),[De,_e]=(0,n.useState)(!0),[Re,Ie]=(0,n.useState)([]),[$e,ze]=(0,n.useState)([]),[Te,Le]=(0,n.useState)([]),[Pe,We]=(0,n.useState)(new Set),[Ne,He]=(0,n.useState)(new Set);function Ue(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}(0,n.useEffect)(()=>{re({tab:te},{replace:!0})},[te,re]),(0,n.useEffect)(()=>{t&&(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();he(e),Ce(e.slice(0,10))}let n="/api/restaurants";null===t||void 0===t||!t.id||"Brand General"!==t.role&&"Brand Manager"!==t.role||(n=`/api/restaurants/manager/${t.id}`);const s=await fetch(n,{headers:{Authorization:`Bearer ${e}`}});if(s.ok){const e=await s.json(),r=(e.data||e||[]).map(e=>{var r,t;return{id:null===(r=e.id)||void 0===r?void 0:r.toString(),name:e.name,brand_id:e.brand_id,brand_name:e.brand_name||(null===(t=e.brand)||void 0===t?void 0:t.name)}});ue(r),Me(r.slice(0,10))}}catch(e){console.error("Error fetching brands/restaurants:",e)}})()},[t]),(0,n.useEffect)(()=>{(async()=>{if(0!==xe.length){_e(!0);try{const t=localStorage.getItem("auth_token"),n=xe.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==je&&(s+=`&restaurant_id=${je}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();let r=e.data||e||[];if(r=r.filter(e=>{var r;return n.includes(null===(r=e.restaurant_id)||void 0===r?void 0:r.toString())}),"all"!==pe){const e=xe.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===pe}).map(e=>e.id);r=r.filter(r=>{var t;return e.includes(null===(t=r.restaurant_id)||void 0===t?void 0:t.toString())})}Oe(r)}const l=await fetch("/api/menu",{headers:{Authorization:`Bearer ${t}`}});if(l.ok){var e,r;const t=await l.json();null!==(e=t.data)&&void 0!==e&&e.items&&ze(t.data.items),null!==(r=t.data)&&void 0!==r&&r.categories&&Le(t.data.categories)}}catch(t){console.error("Error fetching data:",t)}finally{_e(!1)}}else _e(!1)})()},[pe,je,xe]);const Ye=()=>{ge("all"),ye(""),we(!1)},Ke=()=>{ve("all"),be(""),Ae(!1)},Ve=(0,n.useMemo)(()=>{if(!Ee||0===Ee.length)return[];const e=new Date(le.start);e.setHours(0,0,0,0);const r=new Date(le.end);return r.setHours(23,59,59,999),Ee.filter(t=>{const n=t.order_date||t.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=r,l="completed"===t.payment_status||"completed"===t.status||"pending"===t.status||"preparing"===t.status||"ready"===t.status;return i&&l})},[Ee,le.start,le.end]),Je=(0,n.useMemo)(()=>{if(0===Ve.length)return[];const e=e=>new Date(e.order_date||e.createdAt),r=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===se){const t={};return Ve.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;t[i]=(t[i]||0)+r(n)}),Object.entries(t).map(e=>{let[r,t]=e;return{date:r,sales:Math.round(t)}})}if("week"===se){const t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const r=new Date(n);r.setDate(r.getDate()-e),s.push(r)}const i={};return Ve.forEach(t=>{const n=Ue(e(t));i[n]=(i[n]||0)+r(t)}),s.map(e=>{const r=Ue(e);return{date:t[e.getDay()],sales:Math.round(i[r]||0)}})}if("month"===se){const t={};return Ve.forEach(n=>{const s=e(n).getDate().toString();t[s]=(t[s]||0)+r(n)}),Object.entries(t).map(e=>{let[r,t]=e;return{date:r,sales:Math.round(t)}}).sort((e,r)=>parseInt(e.date)-parseInt(r.date))}{const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Ve.forEach(s=>{const i=t[e(s).getMonth()];n[i]=(n[i]||0)+r(s)}),t.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Ve,se]),qe=(0,n.useMemo)(()=>{if(0===Ve.length)return[{name:"No Data",value:100,sales:0}];const e={};Te.forEach(r=>{r.id&&r.name&&(e[r.id.toString()]=r.name)});const r={};$e.forEach(t=>{if(t.id){const n=t.categoryId?e[t.categoryId.toString()]||t.categoryId:"Other";r[t.id.toString()]=n}});const t={};let n=0;Ve.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,l;const o=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=o;const a=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(l=e.product_id)||void 0===l?void 0:l.toString()),d=a&&r[a]||"Other";t[d]=(t[d]||0)+o})});const s=Object.entries(t).map(e=>{let[r,t]=e;return{name:r,value:n>0?Math.round(t/n*100):0,sales:Math.round(t)}}).sort((e,r)=>r.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[Ve,$e,Te]),Ge=(0,n.useMemo)(()=>{var e;if(0===Ve.length)return[];const r={};Te.forEach(e=>{e.id&&e.name&&(r[e.id.toString()]=e.name)});const t={};$e.forEach(e=>{if(e.id){const n=e.categoryId?r[e.categoryId.toString()]||e.categoryId:"Other";t[e.id.toString()]=n}});const n={};Ve.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var r,s,i;const l=e.menu_name||e.name||"Unknown",o=(null===(r=e.menuItem)||void 0===r||null===(s=r.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),a=o?t[o]||"Other":e.category||"Other";n[l]||(n[l]={category:a,price:parseFloat(e.price||0),orders:0,revenue:0});const d=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[l].orders+=d,n[l].revenue+=c*d})});const s=Object.entries(n).map(e=>{let[r,t]=e;return{name:r,category:t.category,price:t.price,orders:t.orders,revenue:Math.round(t.revenue),performance:0}}).sort((e,r)=>r.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[Ve,$e,Te]),Qe=(0,n.useMemo)(()=>{if(0===Ve.length)return[];const e={};return Ve.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r).getHours(),n=0===t?"12AM":12===t?"12PM":t>12?t-12+"PM":`${t}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[r,t]=e;return{hour:r,orders:t}}).sort((e,r)=>{const t=e=>{const r=parseInt(e),t=e.includes("PM");return t&&12!==r?r+12:12!==r||t?r:0};return t(e.hour)-t(r.hour)})},[Ve]),Xe=(0,n.useMemo)(()=>{if(0===Ve.length)return{};const e={};return Ve.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r),n=t.getFullYear().toString(),s=`${n}-${(t.getMonth()+1).toString().padStart(2,"0")}`,i=t.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const l=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(r);e[n].revenue+=l,e[n].orders+=1,e[n].months[s].revenue+=l,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=l,e[n].months[s].days[i].orders+=1}),e},[Ve]),Ze=(0,n.useMemo)(()=>{if(0===Ve.length)return[];const e={};return Ve.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r).getHours(),n=`${t.toString().padStart(2,"0")}:00-${(t+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(r)}),Object.entries(e).map(e=>{let[r,t]=e;return{time:r,orders:t.orders,revenue:Math.round(t.revenue),efficiency:Math.min(100,Math.round(t.orders/(Ve.length/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[Ve]),er=(0,n.useMemo)(()=>{if(0===Ee.length)return{brands:[],restaurants:[]};const e=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),r=new Date(le.start);r.setHours(0,0,0,0);const t=new Date(le.end);t.setHours(23,59,59,999);const n=Ee.filter(e=>{const n=e.order_date||e.createdAt;if(!n)return!1;const s=new Date(n);return s>=r&&s<=t&&"completed"===e.status}),s={};n.forEach(r=>{var t,n;const i=null===(t=r.restaurant_id)||void 0===t?void 0:t.toString();if(!i)return;const l=xe.find(e=>e.id===i),o=(null===l||void 0===l?void 0:l.name)||r.restaurant_name||"Unknown",a=(null===l||void 0===l?void 0:l.brand_name)||(null===(n=ce.find(e=>e.id===(null===l||void 0===l?void 0:l.brand_id)))||void 0===n?void 0:n.name)||"Independent";s[i]||(s[i]={name:o,brandName:a,orders:0,revenue:0}),s[i].orders+=1,s[i].revenue+=e(r)});const i=Object.entries(s).map(e=>{let[r,t]=e;return{id:r,...t,revenue:Math.round(t.revenue)}}).sort((e,r)=>r.revenue-e.revenue),l={},o=new Set(xe.map(e=>{var r;return null===(r=e.brand_id)||void 0===r?void 0:r.toString()}).filter(Boolean));ce.forEach(e=>{o.has(e.id.toString())&&(l[e.id.toString()]={name:e.name,orders:0,revenue:0,restaurantCount:0})}),xe.some(e=>!e.brand_id)&&(l.independent={name:"Independent",orders:0,revenue:0,restaurantCount:0}),xe.forEach(e=>{var r;const t=(null===(r=e.brand_id)||void 0===r?void 0:r.toString())||"independent";l[t]&&(l[t].restaurantCount+=1)}),n.forEach(r=>{var t,n;const s=null===(t=r.restaurant_id)||void 0===t?void 0:t.toString(),i=xe.find(e=>e.id===s),o=(null===i||void 0===i||null===(n=i.brand_id)||void 0===n?void 0:n.toString())||"independent";l[o]&&(l[o].orders+=1,l[o].revenue+=e(r))});return{brands:Object.entries(l).map(e=>{let[r,t]=e;return{id:r,...t,revenue:Math.round(t.revenue)}}).filter(e=>e.orders>0||e.restaurantCount>0).sort((e,r)=>r.revenue-e.revenue),restaurants:i}},[Ee,xe,ce,le]),rr=()=>{const e=new Date(le.start),r=new Date(le.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=rr();if(e<=31){const e=new Set(Object.keys(Xe)),r=new Set;Object.keys(Xe).forEach(e=>{Object.keys(Xe[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),We(e),He(r)}else e<=365?(We(new Set(Object.keys(Xe))),He(new Set)):(We(new Set),He(new Set))},[le.start,le.end,Xe]);const tr=e=>{ie(e),de(!1);const r=new Date;let t=new Date(r);switch(e){case"today":t=new Date(r);break;case"week":t.setDate(t.getDate()-6);break;case"month":t.setDate(t.getDate()-29);break;case"year":t=new Date(r.getFullYear(),0,1);break;case"all":t=new Date(r.getFullYear()-5,0,1)}oe({start:Ue(t),end:Ue(r)})},nr=()=>{const e=Je.reduce((e,r)=>e+r.sales,0),r=`Brand/Manager Reports\nGenerated: ${(new Date).toISOString()}\nPeriod: ${le.start} to ${le.end}\nBrand Filter: ${"all"===pe?"All Brands":me}\nRestaurant Filter: ${"all"===je?"All Restaurants":fe}\n\nTotal Revenue: RM ${e.toFixed(2)}\nTotal Orders: ${Ve.length}\n`,t=new Blob([r],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`brand_report_${le.start}_to_${le.end}.csv`,n.click()},sr=()=>(0,F.jsxs)(B,{children:[(0,F.jsxs)(Y,{children:[(0,F.jsx)(K,{type:"text",placeholder:"All Brands",value:me,onChange:e=>(e=>{if(ye(e),we(!0),e.length<1)return void Ce(ce.slice(0,10));const r=ce.filter(r=>{const t=e.toLowerCase();return r.name.toLowerCase().includes(t)||r.code.toLowerCase().includes(t)}).slice(0,10);Ce(r)})(e.target.value),onFocus:()=>{we(!0),0===me.length&&Ce(ce.slice(0,10))},onBlur:()=>setTimeout(()=>we(!1),200)}),"all"!==pe&&me&&(0,F.jsx)(Q,{onClick:Ye,children:"\xd7"}),(0,F.jsxs)(V,{show:Fe,children:[(0,F.jsxs)(J,{onClick:()=>{ge("all"),ye(""),we(!1)},children:[(0,F.jsx)(q,{children:"All Brands"}),(0,F.jsx)(G,{children:"Show all brand data"})]}),Se.map(e=>(0,F.jsxs)(J,{onClick:()=>(e=>{ge(e.id.toString()),ye(e.name),we(!1),ve("all"),be("")})(e),children:[(0,F.jsx)(q,{children:e.name}),(0,F.jsxs)(G,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,F.jsxs)(Y,{children:[(0,F.jsx)(K,{type:"text",placeholder:"All Restaurants",value:fe,onChange:e=>(e=>{be(e),Ae(!0);let r=xe;if("all"!==pe&&(r=xe.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===pe})),e.length<1)return void Me(r.slice(0,10));const t=r.filter(r=>{const t=e.toLowerCase();return r.name.toLowerCase().includes(t)}).slice(0,10);Me(t)})(e.target.value),onFocus:()=>{Ae(!0);let e=xe;"all"!==pe&&(e=xe.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===pe})),Me(e.slice(0,10))},onBlur:()=>setTimeout(()=>Ae(!1),200)}),"all"!==je&&fe&&(0,F.jsx)(Q,{onClick:Ke,children:"\xd7"}),(0,F.jsxs)(V,{show:ke,children:[(0,F.jsxs)(J,{onClick:()=>{ve("all"),be(""),Ae(!1)},children:[(0,F.jsx)(q,{children:"All Restaurants"}),(0,F.jsx)(G,{children:"Show all restaurant data"})]}),Be.map(e=>(0,F.jsxs)(J,{onClick:()=>(e=>{ve(e.id),be(e.name),Ae(!1)})(e),children:[(0,F.jsx)(q,{children:e.name}),(0,F.jsx)(G,{children:e.brand_name||"Independent"})]},e.id))]})]}),(0,F.jsxs)(M,{children:[(0,F.jsx)(E,{active:"today"===se&&!ae,onClick:()=>tr("today"),children:"Today"}),(0,F.jsx)(E,{active:"week"===se&&!ae,onClick:()=>tr("week"),children:"Week"}),(0,F.jsx)(E,{active:"month"===se&&!ae,onClick:()=>tr("month"),children:"Month"}),(0,F.jsx)(E,{active:"year"===se&&!ae,onClick:()=>tr("year"),children:"Year"}),(0,F.jsx)(E,{active:"all"===se&&!ae,onClick:()=>tr("all"),children:"All"}),(0,F.jsxs)(C,{children:[(0,F.jsx)(S,{type:"date",value:le.start,onChange:e=>{oe({...le,start:e.target.value}),de(!0)}}),(0,F.jsx)("span",{children:"to"}),(0,F.jsx)(S,{type:"date",value:le.end,onChange:e=>{oe({...le,end:e.target.value}),de(!0)}})]})]}),(0,F.jsxs)(O,{onClick:nr,children:[(0,F.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,F.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,F.jsx)(l.A,{children:(0,F.jsxs)(w,{children:[(0,F.jsx)(k,{children:(0,F.jsx)(A,{children:"Brand Reports"})}),(0,F.jsxs)(D,{children:[(0,F.jsxs)(o.j,{children:[(0,F.jsx)(o.oz,{active:"ranking"===te,onClick:()=>ne("ranking"),children:"Sales Ranking"}),(0,F.jsx)(o.oz,{active:"sales"===te,onClick:()=>ne("sales"),children:"Sales Report"}),(0,F.jsx)(o.oz,{active:"details"===te,onClick:()=>ne("details"),children:"Sales Details"}),(0,F.jsx)(o.oz,{active:"menu"===te,onClick:()=>ne("menu"),children:"Menu Analysis"}),(0,F.jsx)(o.oz,{active:"customers"===te,onClick:()=>ne("customers"),children:"Customer Insights"}),(0,F.jsx)(o.oz,{active:"operations"===te,onClick:()=>ne("operations"),children:"Operations"})]}),(0,F.jsxs)("div",{style:{display:"sales"===te?"block":"none"},children:[(0,F.jsx)(sr,{}),De?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Ve.length?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,F.jsxs)("div",{children:[(0,F.jsxs)(_,{children:[(0,F.jsxs)(o.hI,{color:"#059669",children:[(0,F.jsx)(o.v0,{children:"Total Revenue"}),(0,F.jsx)(o.Os,{children:(0,d.vv)(Je.reduce((e,r)=>e+r.sales,0),"RM")}),(0,F.jsxs)(o.d1,{children:[Ve.length," orders in selected period"]})]}),(0,F.jsxs)(o.hI,{color:"#2563EB",children:[(0,F.jsx)(o.v0,{children:"Total Orders"}),(0,F.jsx)(o.Os,{children:Ve.length.toLocaleString()}),(0,F.jsx)(o.d1,{children:"For selected period"})]}),(0,F.jsxs)(o.hI,{color:"#DC2626",children:[(0,F.jsx)(o.v0,{children:"Average Order Value"}),(0,F.jsx)(o.Os,{children:(0,d.vv)(Ve.length>0?Je.reduce((e,r)=>e+r.sales,0)/Ve.length:0,"RM")}),(0,F.jsx)(o.d1,{children:"Per order"})]}),(0,F.jsxs)(o.hI,{color:"#7C3AED",children:[(0,F.jsx)(o.v0,{children:"Completed Orders"}),(0,F.jsx)(o.Os,{children:Ve.filter(e=>"completed"===e.status).length}),(0,F.jsxs)(o.d1,{children:[Math.round(Ve.filter(e=>"completed"===e.status).length/Ve.length*100||0),"% completion rate"]})]})]}),(0,F.jsxs)(R,{children:[(0,F.jsxs)(I,{children:[(0,F.jsx)($,{children:"Revenue Trend"}),(0,F.jsx)(c.u,{width:"100%",height:300,children:(0,F.jsxs)(h.b,{data:Je,margin:{top:5,right:20,left:0,bottom:5},children:[(0,F.jsx)(x.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,F.jsx)(u.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,F.jsx)(p.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,F.jsx)(g.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,F.jsx)(j.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,F.jsxs)(I,{children:[(0,F.jsx)($,{children:"Sales by Category"}),(0,F.jsx)(c.u,{width:"100%",height:300,children:(0,F.jsxs)(v.r,{children:[(0,F.jsx)(m.F,{data:qe,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:qe.map((e,r)=>(0,F.jsx)(y.f,{fill:ee[r%ee.length]},`cell-${r}`))}),(0,F.jsx)(g.m,{formatter:e=>`${e}%`})]})})]})]}),(0,F.jsxs)(I,{children:[(0,F.jsx)($,{children:"Hourly Orders Distribution"}),(0,F.jsx)(c.u,{width:"100%",height:250,children:(0,F.jsxs)(f.E,{data:Qe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,F.jsx)(x.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,F.jsx)(u.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,F.jsx)(p.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,F.jsx)(g.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,F.jsx)(b.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,F.jsxs)("div",{style:{display:"details"===te?"block":"none"},children:[(0,F.jsx)(sr,{}),De?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Ve.length?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,F.jsxs)("div",{children:[(0,F.jsxs)(_,{children:[(0,F.jsxs)(o.hI,{color:"#059669",children:[(0,F.jsx)(o.v0,{children:"Total Revenue"}),(0,F.jsx)(o.Os,{children:(0,d.vv)(Je.reduce((e,r)=>e+r.sales,0),"RM")}),(0,F.jsxs)(o.d1,{children:[Ve.length," orders in selected period"]})]}),(0,F.jsxs)(o.hI,{color:"#2563EB",children:[(0,F.jsx)(o.v0,{children:"Total Orders"}),(0,F.jsx)(o.Os,{children:Ve.length.toLocaleString()}),(0,F.jsxs)(o.d1,{children:[Ve.filter(e=>"completed"===e.status).length," completed"]})]}),(0,F.jsxs)(o.hI,{color:"#DC2626",children:[(0,F.jsx)(o.v0,{children:"Average Order Value"}),(0,F.jsx)(o.Os,{children:(0,d.vv)(Ve.length>0?Je.reduce((e,r)=>e+r.sales,0)/Ve.length:0,"RM")}),(0,F.jsx)(o.d1,{children:"Per order average"})]}),(0,F.jsxs)(o.hI,{color:"#7C3AED",children:[(0,F.jsx)(o.v0,{children:"Period"}),(0,F.jsx)(o.Os,{children:rr()}),(0,F.jsx)(o.d1,{children:"Days"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)($,{children:"Detailed Sales Breakdown"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{style:{width:"40%"},children:"Period"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,F.jsx)("tbody",{children:Object.keys(Xe).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=Xe[e],t=Pe.has(e);return(0,F.jsxs)(n.Fragment,{children:[(0,F.jsxs)(N,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(Pe);if(r.has(e)){var t;r.delete(e);const n=new Set(Ne);Object.keys((null===(t=Xe[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),He(n)}else r.add(e);We(r)})(e),children:[(0,F.jsxs)(H,{level:0,bold:!0,children:[(0,F.jsx)(U,{expanded:t,children:"\u25b6"}),e]}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:(0,d.vv)(r.revenue,"RM")}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:(0,d.vv)(r.revenue/r.orders,"RM")})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const s=r.months[t],i=`${e}-${t}`,l=Ne.has(i),o=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,F.jsxs)(n.Fragment,{children:[(0,F.jsxs)(N,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(Ne);r.has(e)?r.delete(e):r.add(e),He(r)})(i),children:[(0,F.jsxs)(H,{level:1,bold:!0,children:[(0,F.jsx)(U,{expanded:l,children:"\u25b6"}),o]}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:(0,d.vv)(s.revenue,"RM")}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:s.orders}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:(0,d.vv)(s.revenue/s.orders,"RM")})]}),l&&Object.keys(s.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=s.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,F.jsxs)(N,{level:2,children:[(0,F.jsx)(H,{level:2,children:t}),(0,F.jsx)(H,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,d.vv)(r.revenue,"RM")}),(0,F.jsx)(H,{level:2,style:{textAlign:"right"},children:r.orders}),(0,F.jsx)(H,{level:2,style:{textAlign:"right"},children:(0,d.vv)(r.revenue/r.orders,"RM")})]},e)})]},i)})]},e)})})]})]})]})]}),(0,F.jsxs)("div",{style:{display:"menu"===te?"block":"none"},children:[(0,F.jsx)(sr,{}),(0,F.jsxs)(_,{children:[(0,F.jsxs)(o.hI,{color:"#F59E0B",children:[(0,F.jsx)(o.v0,{children:"Best Seller"}),(0,F.jsx)(o.Os,{children:(null===(e=Ge[0])||void 0===e?void 0:e.name)||"N/A"}),(0,F.jsxs)(o.d1,{children:[(null===(r=Ge[0])||void 0===r?void 0:r.orders)||0," orders"]})]}),(0,F.jsxs)(o.hI,{color:"#10B981",children:[(0,F.jsx)(o.v0,{children:"Total Items Analyzed"}),(0,F.jsx)(o.Os,{children:Ge.length}),(0,F.jsx)(o.d1,{children:"Complete menu analysis"})]}),(0,F.jsxs)(o.hI,{color:"#3B82F6",children:[(0,F.jsx)(o.v0,{children:"Total Orders"}),(0,F.jsx)(o.Os,{children:Ge.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,F.jsx)(o.d1,{children:"For selected period"})]}),(0,F.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,F.jsx)(o.v0,{children:"Total Revenue"}),(0,F.jsx)(o.Os,{children:(0,d.vv)(Ge.reduce((e,r)=>e+r.revenue,0),"RM")}),(0,F.jsx)(o.d1,{children:"For selected period"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)($,{children:"Complete Menu Performance Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{children:"Rank"}),(0,F.jsx)(L,{children:"Menu Item"}),(0,F.jsx)(L,{children:"Category"}),(0,F.jsx)(L,{children:"Price"}),(0,F.jsx)(L,{children:"Orders"}),(0,F.jsx)(L,{children:"Revenue"}),(0,F.jsx)(L,{children:"Performance"})]})}),(0,F.jsx)("tbody",{children:Ge.map((e,r)=>{var t;const n=(null===(t=Ge[0])||void 0===t?void 0:t.orders)||1;return(0,F.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsxs)(P,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{children:(0,F.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,F.jsx)(P,{children:(0,d.vv)(e.price,"RM")}),(0,F.jsx)(P,{children:e.orders.toLocaleString()}),(0,F.jsx)(P,{children:(0,d.vv)(e.revenue,"RM")}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:e.orders/n*100}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,F.jsxs)("div",{style:{display:"customers"===te?"block":"none"},children:[(0,F.jsx)(sr,{}),(0,F.jsxs)(_,{children:[(0,F.jsxs)(o.hI,{color:"#635BFF",children:[(0,F.jsx)(o.v0,{children:"Total Customers"}),(0,F.jsx)(o.Os,{children:Re.length.toLocaleString()}),(0,F.jsx)(o.d1,{children:"Across all restaurants"})]}),(0,F.jsxs)(o.hI,{color:"#00D924",children:[(0,F.jsx)(o.v0,{children:"Repeat Customers"}),(0,F.jsx)(o.Os,{children:Re.filter(e=>e.total_orders>1).length}),(0,F.jsxs)(o.d1,{children:[Re.length>0?Math.round(Re.filter(e=>e.total_orders>1).length/Re.length*100):0,"% return rate"]})]}),(0,F.jsxs)(o.hI,{color:"#FFB800",children:[(0,F.jsx)(o.v0,{children:"Average Spent"}),(0,F.jsx)(o.Os,{children:(0,d.vv)(Re.length>0?Re.reduce((e,r)=>e+parseFloat(r.total_spent||0),0)/Re.length:0,"RM")}),(0,F.jsx)(o.d1,{children:"Per customer"})]}),(0,F.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,F.jsx)(o.v0,{children:"Total Points"}),(0,F.jsx)(o.Os,{children:Re.reduce((e,r)=>e+(r.points||0),0).toLocaleString()}),(0,F.jsx)(o.d1,{children:"Across all customers"})]})]}),(0,F.jsx)(z,{children:(0,F.jsx)($,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,F.jsxs)("div",{style:{display:"operations"===te?"block":"none"},children:[(0,F.jsx)(sr,{}),(0,F.jsxs)(_,{children:[(0,F.jsxs)(o.hI,{color:"#10B981",children:[(0,F.jsx)(o.v0,{children:"Order Fulfillment"}),(0,F.jsxs)(o.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,F.jsx)(o.d1,{children:"On-time completion"})]}),(0,F.jsxs)(o.hI,{color:"#F59E0B",children:[(0,F.jsx)(o.v0,{children:"Avg. Wait Time"}),(0,F.jsxs)(o.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,F.jsx)(o.d1,{children:"Estimated"})]}),(0,F.jsxs)(o.hI,{color:"#EF4444",children:[(0,F.jsx)(o.v0,{children:"Peak Hour"}),(0,F.jsx)(o.Os,{children:"12-1 PM"}),(0,F.jsx)(o.d1,{children:"Busiest time"})]}),(0,F.jsxs)(o.hI,{color:"#6366F1",children:[(0,F.jsx)(o.v0,{children:"Staff Efficiency"}),(0,F.jsxs)(o.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,F.jsx)(o.d1,{children:"Estimated"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)($,{children:"Peak Hours Performance"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{children:"Time Slot"}),(0,F.jsx)(L,{children:"Orders"}),(0,F.jsx)(L,{children:"Revenue"}),(0,F.jsx)(L,{children:"Efficiency"})]})}),(0,F.jsx)("tbody",{children:Ze.map((e,r)=>(0,F.jsxs)("tr",{children:[(0,F.jsx)(P,{style:{fontWeight:600},children:e.time}),(0,F.jsx)(P,{children:e.orders}),(0,F.jsx)(P,{children:(0,d.vv)(e.revenue,"RM")}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:e.efficiency}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},r))})]})]})]}),(0,F.jsxs)("div",{style:{display:"ranking"===te?"block":"none"},children:[(0,F.jsx)(B,{children:(0,F.jsxs)(M,{children:[(0,F.jsx)(E,{active:"today"===se,onClick:()=>tr("today"),children:"Today"}),(0,F.jsx)(E,{active:"week"===se,onClick:()=>tr("week"),children:"This Week"}),(0,F.jsx)(E,{active:"month"===se,onClick:()=>tr("month"),children:"This Month"}),(0,F.jsx)(E,{active:"year"===se,onClick:()=>tr("year"),children:"This Year"}),(0,F.jsx)(E,{active:"all"===se,onClick:()=>tr("all"),children:"All Time"}),ae&&(0,F.jsxs)(C,{children:[(0,F.jsx)(S,{type:"date",value:le.start,onChange:e=>oe(r=>({...r,start:e.target.value}))}),(0,F.jsx)("span",{children:"~"}),(0,F.jsx)(S,{type:"date",value:le.end,onChange:e=>oe(r=>({...r,end:e.target.value}))})]})]})}),(0,F.jsxs)(X,{children:[(0,F.jsx)($,{children:"Brand Sales Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{style:{width:"60px"},children:"Rank"}),(0,F.jsx)(L,{children:"Brand Name"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Restaurants"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(L,{style:{width:"150px"},children:"Performance"})]})}),(0,F.jsxs)("tbody",{children:[er.brands.map((e,r)=>{var t;const n=(null===(t=er.brands[0])||void 0===t?void 0:t.revenue)||1,s=Math.round(e.revenue/n*100);return(0,F.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsx)(P,{children:(0,F.jsx)(Z,{rank:r+1,children:r+1})}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{style:{textAlign:"right"},children:e.restaurantCount}),(0,F.jsx)(P,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,F.jsx)(P,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,d.vv)(e.revenue,"RM")}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:s}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===er.brands.length&&(0,F.jsx)("tr",{children:(0,F.jsx)(P,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No brand data available"})})]})]})]}),(0,F.jsxs)(X,{children:[(0,F.jsx)($,{children:"Restaurant Sales Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{style:{width:"60px"},children:"Rank"}),(0,F.jsx)(L,{children:"Restaurant Name"}),(0,F.jsx)(L,{children:"Brand"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(L,{style:{width:"150px"},children:"Performance"})]})}),(0,F.jsxs)("tbody",{children:[er.restaurants.slice(0,20).map((e,r)=>{var t;const n=(null===(t=er.restaurants[0])||void 0===t?void 0:t.revenue)||1,s=Math.round(e.revenue/n*100);return(0,F.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsx)(P,{children:(0,F.jsx)(Z,{rank:r+1,children:r+1})}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{children:(0,F.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",backgroundColor:"Independent"===e.brandName?"#F3F4F6":"#E0E7FF",color:"Independent"===e.brandName?"#6B7280":"#4338CA"},children:e.brandName})}),(0,F.jsx)(P,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,F.jsx)(P,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,d.vv)(e.revenue,"RM")}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:s}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===er.restaurants.length&&(0,F.jsx)("tr",{children:(0,F.jsx)(P,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}}}]);