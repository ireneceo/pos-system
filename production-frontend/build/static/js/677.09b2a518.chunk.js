"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[677],{677:(e,r,t)=>{t.r(r),t.d(r,{default:()=>re});var n=t(9950),s=t(4752),i=t(4492),l=t(3310),o=t(7492),d=t(1367),a=t(6038),c=t(1095),h=t(2847),x=t(3245),u=t(158),p=t(3440),g=t(4094),j=t(4915),v=t(7621),m=t(5297),y=t(2528),f=t(294),b=t(3588),F=t(4414);const k=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,w=s.Ay.div`
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
`,R=o.MD,_=s.Ay.div`
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
`,ee=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],re=()=>{var e,r;(0,d.As)();const[t,s]=(0,i.ok)(),[re,te]=(0,n.useState)(()=>t.get("tab")||"ranking"),[ne,se]=(0,n.useState)("week"),[ie,le]=(0,n.useState)(()=>{const e=new Date,r=new Date(e);return r.setDate(r.getDate()-6),{start:He(r),end:He(e)}}),[oe,de]=(0,n.useState)(!1),[ae,ce]=(0,n.useState)([]),[he,xe]=(0,n.useState)([]),[ue,pe]=(0,n.useState)("all"),[ge,je]=(0,n.useState)("all"),[ve,me]=(0,n.useState)(""),[ye,fe]=(0,n.useState)(""),[be,Fe]=(0,n.useState)(!1),[ke,we]=(0,n.useState)(!1),[Ae,Se]=(0,n.useState)([]),[Ce,Be]=(0,n.useState)([]),[Me,Ee]=(0,n.useState)([]),[Oe,De]=(0,n.useState)(!0),[Re,_e]=(0,n.useState)([]),[Ie,$e]=(0,n.useState)([]),[ze,Te]=(0,n.useState)([]),[Le,Pe]=(0,n.useState)(new Set),[We,Ne]=(0,n.useState)(new Set);function He(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}(0,n.useEffect)(()=>{s({tab:re},{replace:!0})},[re,s]),(0,n.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();ce(e),Se(e.slice(0,10))}const t=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=(e.data||e||[]).map(e=>{var r;return{id:null===(r=e.id)||void 0===r?void 0:r.toString(),name:e.name,brand_id:e.brand_id,brand_name:e.brand_name}});xe(r),Be(r.slice(0,10))}}catch(e){console.error("Error fetching brands/restaurants:",e)}})()},[]),(0,n.useEffect)(()=>{(async()=>{De(!0);try{const t=localStorage.getItem("auth_token");let n="/api/orders?limit=5000";"all"!==ge&&(n+=`&restaurant_id=${ge}`);const s=await fetch(n,{headers:{Authorization:`Bearer ${t}`}});if(s.ok){const e=await s.json();let r=e.data||e||[];if("all"!==ue){const e=he.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===ue}).map(e=>e.id);r=r.filter(r=>{var t;return e.includes(null===(t=r.restaurant_id)||void 0===t?void 0:t.toString())})}Ee(r)}const i=await fetch("/api/menu",{headers:{Authorization:`Bearer ${t}`}});if(i.ok){var e,r;const t=await i.json();null!==(e=t.data)&&void 0!==e&&e.items&&$e(t.data.items),null!==(r=t.data)&&void 0!==r&&r.categories&&Te(t.data.categories)}}catch(t){console.error("Error fetching data:",t)}finally{De(!1)}})()},[ue,ge,he]);const Ue=()=>{pe("all"),me(""),Fe(!1)},Ye=()=>{je("all"),fe(""),we(!1)},Ke=(0,n.useMemo)(()=>{if(!Me||0===Me.length)return[];const e=new Date(ie.start);e.setHours(0,0,0,0);const r=new Date(ie.end);return r.setHours(23,59,59,999),Me.filter(t=>{const n=t.order_date||t.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=r,l="completed"===t.payment_status||"completed"===t.status||"pending"===t.status||"preparing"===t.status||"ready"===t.status;return i&&l})},[Me,ie.start,ie.end]),Ve=(0,n.useMemo)(()=>{if(0===Ke.length)return[];const e=e=>new Date(e.order_date||e.createdAt),r=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===ne){const t={};return Ke.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;t[i]=(t[i]||0)+r(n)}),Object.entries(t).map(e=>{let[r,t]=e;return{date:r,sales:Math.round(t)}})}if("week"===ne){const t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const r=new Date(n);r.setDate(r.getDate()-e),s.push(r)}const i={};return Ke.forEach(t=>{const n=He(e(t));i[n]=(i[n]||0)+r(t)}),s.map(e=>{const r=He(e);return{date:t[e.getDay()],sales:Math.round(i[r]||0)}})}if("month"===ne){const t={};return Ke.forEach(n=>{const s=e(n).getDate().toString();t[s]=(t[s]||0)+r(n)}),Object.entries(t).map(e=>{let[r,t]=e;return{date:r,sales:Math.round(t)}}).sort((e,r)=>parseInt(e.date)-parseInt(r.date))}{const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Ke.forEach(s=>{const i=t[e(s).getMonth()];n[i]=(n[i]||0)+r(s)}),t.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Ke,ne]),Je=(0,n.useMemo)(()=>{if(0===Ke.length)return[{name:"No Data",value:100,sales:0}];const e={};ze.forEach(r=>{r.id&&r.name&&(e[r.id.toString()]=r.name)});const r={};Ie.forEach(t=>{if(t.id){const n=t.categoryId?e[t.categoryId.toString()]||t.categoryId:"Other";r[t.id.toString()]=n}});const t={};let n=0;Ke.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,l;const o=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=o;const d=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(l=e.product_id)||void 0===l?void 0:l.toString()),a=d&&r[d]||"Other";t[a]=(t[a]||0)+o})});const s=Object.entries(t).map(e=>{let[r,t]=e;return{name:r,value:n>0?Math.round(t/n*100):0,sales:Math.round(t)}}).sort((e,r)=>r.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[Ke,Ie,ze]),qe=(0,n.useMemo)(()=>{var e;if(0===Ke.length)return[];const r={};ze.forEach(e=>{e.id&&e.name&&(r[e.id.toString()]=e.name)});const t={};Ie.forEach(e=>{if(e.id){const n=e.categoryId?r[e.categoryId.toString()]||e.categoryId:"Other";t[e.id.toString()]=n}});const n={};Ke.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var r,s,i;const l=e.menu_name||e.name||"Unknown",o=(null===(r=e.menuItem)||void 0===r||null===(s=r.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),d=o?t[o]||"Other":e.category||"Other";n[l]||(n[l]={category:d,price:parseFloat(e.price||0),orders:0,revenue:0});const a=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[l].orders+=a,n[l].revenue+=c*a})});const s=Object.entries(n).map(e=>{let[r,t]=e;return{name:r,category:t.category,price:t.price,orders:t.orders,revenue:Math.round(t.revenue),performance:0}}).sort((e,r)=>r.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[Ke,Ie,ze]),Ge=(0,n.useMemo)(()=>{if(0===Ke.length)return[];const e={};return Ke.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r).getHours(),n=0===t?"12AM":12===t?"12PM":t>12?t-12+"PM":`${t}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[r,t]=e;return{hour:r,orders:t}}).sort((e,r)=>{const t=e=>{const r=parseInt(e),t=e.includes("PM");return t&&12!==r?r+12:12!==r||t?r:0};return t(e.hour)-t(r.hour)})},[Ke]),Qe=(0,n.useMemo)(()=>{if(0===Ke.length)return{};const e={};return Ke.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r),n=t.getFullYear().toString(),s=`${n}-${(t.getMonth()+1).toString().padStart(2,"0")}`,i=t.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const l=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(r);e[n].revenue+=l,e[n].orders+=1,e[n].months[s].revenue+=l,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=l,e[n].months[s].days[i].orders+=1}),e},[Ke]),Xe=(0,n.useMemo)(()=>{if(0===Ke.length)return[];const e={};return Ke.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r).getHours(),n=`${t.toString().padStart(2,"0")}:00-${(t+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(r)}),Object.entries(e).map(e=>{let[r,t]=e;return{time:r,orders:t.orders,revenue:Math.round(t.revenue),efficiency:Math.min(100,Math.round(t.orders/(Ke.length/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[Ke]),Ze=(0,n.useMemo)(()=>{if(0===Me.length)return{brands:[],restaurants:[]};const e=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),r=new Date(ie.start);r.setHours(0,0,0,0);const t=new Date(ie.end);t.setHours(23,59,59,999);const n=Me.filter(e=>{const n=e.order_date||e.createdAt;if(!n)return!1;const s=new Date(n);return s>=r&&s<=t&&"completed"===e.status}),s={};n.forEach(r=>{var t,n;const i=null===(t=r.restaurant_id)||void 0===t?void 0:t.toString();if(!i)return;const l=he.find(e=>e.id===i),o=(null===l||void 0===l?void 0:l.name)||r.restaurant_name||"Unknown",d=(null===l||void 0===l?void 0:l.brand_name)||(null===(n=ae.find(e=>e.id===(null===l||void 0===l?void 0:l.brand_id)))||void 0===n?void 0:n.name)||"Independent";s[i]||(s[i]={name:o,brandName:d,orders:0,revenue:0}),s[i].orders+=1,s[i].revenue+=e(r)});const i=Object.entries(s).map(e=>{let[r,t]=e;return{id:r,...t,revenue:Math.round(t.revenue)}}).sort((e,r)=>r.revenue-e.revenue),l={};ae.forEach(e=>{l[e.id.toString()]={name:e.name,orders:0,revenue:0,restaurantCount:0}}),l.independent={name:"Independent",orders:0,revenue:0,restaurantCount:0},he.forEach(e=>{var r;const t=(null===(r=e.brand_id)||void 0===r?void 0:r.toString())||"independent";l[t]&&(l[t].restaurantCount+=1)}),n.forEach(r=>{var t,n;const s=null===(t=r.restaurant_id)||void 0===t?void 0:t.toString(),i=he.find(e=>e.id===s),o=(null===i||void 0===i||null===(n=i.brand_id)||void 0===n?void 0:n.toString())||"independent";l[o]&&(l[o].orders+=1,l[o].revenue+=e(r))});return{brands:Object.entries(l).map(e=>{let[r,t]=e;return{id:r,...t,revenue:Math.round(t.revenue)}}).filter(e=>e.orders>0||e.restaurantCount>0).sort((e,r)=>r.revenue-e.revenue),restaurants:i}},[Me,he,ae,ie]),er=()=>{const e=new Date(ie.start),r=new Date(ie.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=er();if(e<=31){const e=new Set(Object.keys(Qe)),r=new Set;Object.keys(Qe).forEach(e=>{Object.keys(Qe[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),Pe(e),Ne(r)}else e<=365?(Pe(new Set(Object.keys(Qe))),Ne(new Set)):(Pe(new Set),Ne(new Set))},[ie.start,ie.end,Qe]);const rr=e=>{se(e),de(!1);const r=new Date;let t=new Date(r);switch(e){case"today":t=new Date(r);break;case"week":t.setDate(t.getDate()-6);break;case"month":t.setDate(t.getDate()-29);break;case"year":t=new Date(r.getFullYear(),0,1);break;case"all":t=new Date(r.getFullYear()-5,0,1)}le({start:He(t),end:He(r)})},tr=()=>{const e=Ve.reduce((e,r)=>e+r.sales,0),r=`Brand/Manager Reports\nGenerated: ${(new Date).toISOString()}\nPeriod: ${ie.start} to ${ie.end}\nBrand Filter: ${"all"===ue?"All Brands":ve}\nRestaurant Filter: ${"all"===ge?"All Restaurants":ye}\n\nTotal Revenue: RM ${e.toFixed(2)}\nTotal Orders: ${Ke.length}\n`,t=new Blob([r],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`brand_report_${ie.start}_to_${ie.end}.csv`,n.click()},nr=()=>(0,F.jsxs)(B,{children:[(0,F.jsxs)(Y,{children:[(0,F.jsx)(K,{type:"text",placeholder:"All Brands",value:ve,onChange:e=>(e=>{if(me(e),Fe(!0),e.length<1)return void Se(ae.slice(0,10));const r=ae.filter(r=>{const t=e.toLowerCase();return r.name.toLowerCase().includes(t)||r.code.toLowerCase().includes(t)}).slice(0,10);Se(r)})(e.target.value),onFocus:()=>{Fe(!0),0===ve.length&&Se(ae.slice(0,10))},onBlur:()=>setTimeout(()=>Fe(!1),200)}),"all"!==ue&&ve&&(0,F.jsx)(Q,{onClick:Ue,children:"\xd7"}),(0,F.jsxs)(V,{show:be,children:[(0,F.jsxs)(J,{onClick:()=>{pe("all"),me(""),Fe(!1)},children:[(0,F.jsx)(q,{children:"All Brands"}),(0,F.jsx)(G,{children:"Show all brand data"})]}),Ae.map(e=>(0,F.jsxs)(J,{onClick:()=>(e=>{pe(e.id.toString()),me(e.name),Fe(!1),je("all"),fe("")})(e),children:[(0,F.jsx)(q,{children:e.name}),(0,F.jsxs)(G,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,F.jsxs)(Y,{children:[(0,F.jsx)(K,{type:"text",placeholder:"All Restaurants",value:ye,onChange:e=>(e=>{fe(e),we(!0);let r=he;if("all"!==ue&&(r=he.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===ue})),e.length<1)return void Be(r.slice(0,10));const t=r.filter(r=>{const t=e.toLowerCase();return r.name.toLowerCase().includes(t)}).slice(0,10);Be(t)})(e.target.value),onFocus:()=>{we(!0);let e=he;"all"!==ue&&(e=he.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===ue})),Be(e.slice(0,10))},onBlur:()=>setTimeout(()=>we(!1),200)}),"all"!==ge&&ye&&(0,F.jsx)(Q,{onClick:Ye,children:"\xd7"}),(0,F.jsxs)(V,{show:ke,children:[(0,F.jsxs)(J,{onClick:()=>{je("all"),fe(""),we(!1)},children:[(0,F.jsx)(q,{children:"All Restaurants"}),(0,F.jsx)(G,{children:"Show all restaurant data"})]}),Ce.map(e=>(0,F.jsxs)(J,{onClick:()=>(e=>{je(e.id),fe(e.name),we(!1)})(e),children:[(0,F.jsx)(q,{children:e.name}),(0,F.jsx)(G,{children:e.brand_name||"Independent"})]},e.id))]})]}),(0,F.jsxs)(M,{children:[(0,F.jsx)(E,{active:"today"===ne&&!oe,onClick:()=>rr("today"),children:"Today"}),(0,F.jsx)(E,{active:"week"===ne&&!oe,onClick:()=>rr("week"),children:"Week"}),(0,F.jsx)(E,{active:"month"===ne&&!oe,onClick:()=>rr("month"),children:"Month"}),(0,F.jsx)(E,{active:"year"===ne&&!oe,onClick:()=>rr("year"),children:"Year"}),(0,F.jsx)(E,{active:"all"===ne&&!oe,onClick:()=>rr("all"),children:"All"}),(0,F.jsxs)(C,{children:[(0,F.jsx)(S,{type:"date",value:ie.start,onChange:e=>{le({...ie,start:e.target.value}),de(!0)}}),(0,F.jsx)("span",{children:"to"}),(0,F.jsx)(S,{type:"date",value:ie.end,onChange:e=>{le({...ie,end:e.target.value}),de(!0)}})]})]}),(0,F.jsxs)(O,{onClick:tr,children:[(0,F.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,F.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,F.jsx)(l.A,{children:(0,F.jsxs)(k,{children:[(0,F.jsx)(w,{children:(0,F.jsx)(A,{children:"Brand Reports"})}),(0,F.jsxs)(D,{children:[(0,F.jsxs)(o.j,{children:[(0,F.jsx)(o.oz,{active:"ranking"===re,onClick:()=>te("ranking"),children:"Sales Ranking"}),(0,F.jsx)(o.oz,{active:"sales"===re,onClick:()=>te("sales"),children:"Sales Report"}),(0,F.jsx)(o.oz,{active:"details"===re,onClick:()=>te("details"),children:"Sales Details"}),(0,F.jsx)(o.oz,{active:"menu"===re,onClick:()=>te("menu"),children:"Menu Analysis"}),(0,F.jsx)(o.oz,{active:"customers"===re,onClick:()=>te("customers"),children:"Customer Insights"}),(0,F.jsx)(o.oz,{active:"operations"===re,onClick:()=>te("operations"),children:"Operations"})]}),(0,F.jsxs)("div",{style:{display:"sales"===re?"block":"none"},children:[(0,F.jsx)(nr,{}),Oe?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Ke.length?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,F.jsxs)("div",{children:[(0,F.jsxs)(R,{children:[(0,F.jsxs)(o.hI,{color:"#059669",children:[(0,F.jsx)(o.v0,{children:"Total Revenue"}),(0,F.jsx)(o.Os,{children:(0,a.vv)(Ve.reduce((e,r)=>e+r.sales,0),"RM")}),(0,F.jsxs)(o.d1,{children:[Ke.length," orders in selected period"]})]}),(0,F.jsxs)(o.hI,{color:"#2563EB",children:[(0,F.jsx)(o.v0,{children:"Total Orders"}),(0,F.jsx)(o.Os,{children:Ke.length.toLocaleString()}),(0,F.jsx)(o.d1,{children:"For selected period"})]}),(0,F.jsxs)(o.hI,{color:"#DC2626",children:[(0,F.jsx)(o.v0,{children:"Average Order Value"}),(0,F.jsx)(o.Os,{children:(0,a.vv)(Ke.length>0?Ve.reduce((e,r)=>e+r.sales,0)/Ke.length:0,"RM")}),(0,F.jsx)(o.d1,{children:"Per order"})]}),(0,F.jsxs)(o.hI,{color:"#7C3AED",children:[(0,F.jsx)(o.v0,{children:"Completed Orders"}),(0,F.jsx)(o.Os,{children:Ke.filter(e=>"completed"===e.status).length}),(0,F.jsxs)(o.d1,{children:[Math.round(Ke.filter(e=>"completed"===e.status).length/Ke.length*100||0),"% completion rate"]})]})]}),(0,F.jsxs)(_,{children:[(0,F.jsxs)(I,{children:[(0,F.jsx)($,{children:"Revenue Trend"}),(0,F.jsx)(c.u,{width:"100%",height:300,children:(0,F.jsxs)(h.b,{data:Ve,margin:{top:5,right:20,left:0,bottom:5},children:[(0,F.jsx)(x.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,F.jsx)(u.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,F.jsx)(p.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,F.jsx)(g.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,F.jsx)(j.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,F.jsxs)(I,{children:[(0,F.jsx)($,{children:"Sales by Category"}),(0,F.jsx)(c.u,{width:"100%",height:300,children:(0,F.jsxs)(v.r,{children:[(0,F.jsx)(m.F,{data:Je,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Je.map((e,r)=>(0,F.jsx)(y.f,{fill:ee[r%ee.length]},`cell-${r}`))}),(0,F.jsx)(g.m,{formatter:e=>`${e}%`})]})})]})]}),(0,F.jsxs)(I,{children:[(0,F.jsx)($,{children:"Hourly Orders Distribution"}),(0,F.jsx)(c.u,{width:"100%",height:250,children:(0,F.jsxs)(f.E,{data:Ge,margin:{top:5,right:20,left:0,bottom:5},children:[(0,F.jsx)(x.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,F.jsx)(u.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,F.jsx)(p.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,F.jsx)(g.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,F.jsx)(b.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,F.jsxs)("div",{style:{display:"details"===re?"block":"none"},children:[(0,F.jsx)(nr,{}),Oe?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Ke.length?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,F.jsxs)("div",{children:[(0,F.jsxs)(R,{children:[(0,F.jsxs)(o.hI,{color:"#059669",children:[(0,F.jsx)(o.v0,{children:"Total Revenue"}),(0,F.jsx)(o.Os,{children:(0,a.vv)(Ve.reduce((e,r)=>e+r.sales,0),"RM")}),(0,F.jsxs)(o.d1,{children:[Ke.length," orders in selected period"]})]}),(0,F.jsxs)(o.hI,{color:"#2563EB",children:[(0,F.jsx)(o.v0,{children:"Total Orders"}),(0,F.jsx)(o.Os,{children:Ke.length.toLocaleString()}),(0,F.jsxs)(o.d1,{children:[Ke.filter(e=>"completed"===e.status).length," completed"]})]}),(0,F.jsxs)(o.hI,{color:"#DC2626",children:[(0,F.jsx)(o.v0,{children:"Average Order Value"}),(0,F.jsx)(o.Os,{children:(0,a.vv)(Ke.length>0?Ve.reduce((e,r)=>e+r.sales,0)/Ke.length:0,"RM")}),(0,F.jsx)(o.d1,{children:"Per order average"})]}),(0,F.jsxs)(o.hI,{color:"#7C3AED",children:[(0,F.jsx)(o.v0,{children:"Period"}),(0,F.jsx)(o.Os,{children:er()}),(0,F.jsx)(o.d1,{children:"Days"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)($,{children:"Detailed Sales Breakdown"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{style:{width:"40%"},children:"Period"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,F.jsx)("tbody",{children:Object.keys(Qe).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=Qe[e],t=Le.has(e);return(0,F.jsxs)(n.Fragment,{children:[(0,F.jsxs)(N,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(Le);if(r.has(e)){var t;r.delete(e);const n=new Set(We);Object.keys((null===(t=Qe[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),Ne(n)}else r.add(e);Pe(r)})(e),children:[(0,F.jsxs)(H,{level:0,bold:!0,children:[(0,F.jsx)(U,{expanded:t,children:"\u25b6"}),e]}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:(0,a.vv)(r.revenue,"RM")}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:(0,a.vv)(r.revenue/r.orders,"RM")})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const s=r.months[t],i=`${e}-${t}`,l=We.has(i),o=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,F.jsxs)(n.Fragment,{children:[(0,F.jsxs)(N,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(We);r.has(e)?r.delete(e):r.add(e),Ne(r)})(i),children:[(0,F.jsxs)(H,{level:1,bold:!0,children:[(0,F.jsx)(U,{expanded:l,children:"\u25b6"}),o]}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:(0,a.vv)(s.revenue,"RM")}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:s.orders}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:(0,a.vv)(s.revenue/s.orders,"RM")})]}),l&&Object.keys(s.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=s.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,F.jsxs)(N,{level:2,children:[(0,F.jsx)(H,{level:2,children:t}),(0,F.jsx)(H,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,a.vv)(r.revenue,"RM")}),(0,F.jsx)(H,{level:2,style:{textAlign:"right"},children:r.orders}),(0,F.jsx)(H,{level:2,style:{textAlign:"right"},children:(0,a.vv)(r.revenue/r.orders,"RM")})]},e)})]},i)})]},e)})})]})]})]})]}),(0,F.jsxs)("div",{style:{display:"menu"===re?"block":"none"},children:[(0,F.jsx)(nr,{}),(0,F.jsxs)(R,{children:[(0,F.jsxs)(o.hI,{color:"#F59E0B",children:[(0,F.jsx)(o.v0,{children:"Best Seller"}),(0,F.jsx)(o.Os,{children:(null===(e=qe[0])||void 0===e?void 0:e.name)||"N/A"}),(0,F.jsxs)(o.d1,{children:[(null===(r=qe[0])||void 0===r?void 0:r.orders)||0," orders"]})]}),(0,F.jsxs)(o.hI,{color:"#10B981",children:[(0,F.jsx)(o.v0,{children:"Total Items Analyzed"}),(0,F.jsx)(o.Os,{children:qe.length}),(0,F.jsx)(o.d1,{children:"Complete menu analysis"})]}),(0,F.jsxs)(o.hI,{color:"#3B82F6",children:[(0,F.jsx)(o.v0,{children:"Total Orders"}),(0,F.jsx)(o.Os,{children:qe.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,F.jsx)(o.d1,{children:"For selected period"})]}),(0,F.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,F.jsx)(o.v0,{children:"Total Revenue"}),(0,F.jsx)(o.Os,{children:(0,a.vv)(qe.reduce((e,r)=>e+r.revenue,0),"RM")}),(0,F.jsx)(o.d1,{children:"For selected period"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)($,{children:"Complete Menu Performance Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{children:"Rank"}),(0,F.jsx)(L,{children:"Menu Item"}),(0,F.jsx)(L,{children:"Category"}),(0,F.jsx)(L,{children:"Price"}),(0,F.jsx)(L,{children:"Orders"}),(0,F.jsx)(L,{children:"Revenue"}),(0,F.jsx)(L,{children:"Performance"})]})}),(0,F.jsx)("tbody",{children:qe.map((e,r)=>{var t;const n=(null===(t=qe[0])||void 0===t?void 0:t.orders)||1;return(0,F.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsxs)(P,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{children:(0,F.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,F.jsx)(P,{children:(0,a.vv)(e.price,"RM")}),(0,F.jsx)(P,{children:e.orders.toLocaleString()}),(0,F.jsx)(P,{children:(0,a.vv)(e.revenue,"RM")}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:e.orders/n*100}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,F.jsxs)("div",{style:{display:"customers"===re?"block":"none"},children:[(0,F.jsx)(nr,{}),(0,F.jsxs)(R,{children:[(0,F.jsxs)(o.hI,{color:"#635BFF",children:[(0,F.jsx)(o.v0,{children:"Total Customers"}),(0,F.jsx)(o.Os,{children:Re.length.toLocaleString()}),(0,F.jsx)(o.d1,{children:"Across all restaurants"})]}),(0,F.jsxs)(o.hI,{color:"#00D924",children:[(0,F.jsx)(o.v0,{children:"Repeat Customers"}),(0,F.jsx)(o.Os,{children:Re.filter(e=>e.total_orders>1).length}),(0,F.jsxs)(o.d1,{children:[Re.length>0?Math.round(Re.filter(e=>e.total_orders>1).length/Re.length*100):0,"% return rate"]})]}),(0,F.jsxs)(o.hI,{color:"#FFB800",children:[(0,F.jsx)(o.v0,{children:"Average Spent"}),(0,F.jsx)(o.Os,{children:(0,a.vv)(Re.length>0?Re.reduce((e,r)=>e+parseFloat(r.total_spent||0),0)/Re.length:0,"RM")}),(0,F.jsx)(o.d1,{children:"Per customer"})]}),(0,F.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,F.jsx)(o.v0,{children:"Total Points"}),(0,F.jsx)(o.Os,{children:Re.reduce((e,r)=>e+(r.points||0),0).toLocaleString()}),(0,F.jsx)(o.d1,{children:"Across all customers"})]})]}),(0,F.jsx)(z,{children:(0,F.jsx)($,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,F.jsxs)("div",{style:{display:"operations"===re?"block":"none"},children:[(0,F.jsx)(nr,{}),(0,F.jsxs)(R,{children:[(0,F.jsxs)(o.hI,{color:"#10B981",children:[(0,F.jsx)(o.v0,{children:"Order Fulfillment"}),(0,F.jsxs)(o.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,F.jsx)(o.d1,{children:"On-time completion"})]}),(0,F.jsxs)(o.hI,{color:"#F59E0B",children:[(0,F.jsx)(o.v0,{children:"Avg. Wait Time"}),(0,F.jsxs)(o.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,F.jsx)(o.d1,{children:"Estimated"})]}),(0,F.jsxs)(o.hI,{color:"#EF4444",children:[(0,F.jsx)(o.v0,{children:"Peak Hour"}),(0,F.jsx)(o.Os,{children:"12-1 PM"}),(0,F.jsx)(o.d1,{children:"Busiest time"})]}),(0,F.jsxs)(o.hI,{color:"#6366F1",children:[(0,F.jsx)(o.v0,{children:"Staff Efficiency"}),(0,F.jsxs)(o.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,F.jsx)(o.d1,{children:"Estimated"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)($,{children:"Peak Hours Performance"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{children:"Time Slot"}),(0,F.jsx)(L,{children:"Orders"}),(0,F.jsx)(L,{children:"Revenue"}),(0,F.jsx)(L,{children:"Efficiency"})]})}),(0,F.jsx)("tbody",{children:Xe.map((e,r)=>(0,F.jsxs)("tr",{children:[(0,F.jsx)(P,{style:{fontWeight:600},children:e.time}),(0,F.jsx)(P,{children:e.orders}),(0,F.jsx)(P,{children:(0,a.vv)(e.revenue,"RM")}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:e.efficiency}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},r))})]})]})]}),(0,F.jsxs)("div",{style:{display:"ranking"===re?"block":"none"},children:[(0,F.jsx)(B,{children:(0,F.jsxs)(M,{children:[(0,F.jsx)(E,{active:"today"===ne,onClick:()=>rr("today"),children:"Today"}),(0,F.jsx)(E,{active:"week"===ne,onClick:()=>rr("week"),children:"This Week"}),(0,F.jsx)(E,{active:"month"===ne,onClick:()=>rr("month"),children:"This Month"}),(0,F.jsx)(E,{active:"year"===ne,onClick:()=>rr("year"),children:"This Year"}),(0,F.jsx)(E,{active:"all"===ne,onClick:()=>rr("all"),children:"All Time"}),oe&&(0,F.jsxs)(C,{children:[(0,F.jsx)(S,{type:"date",value:ie.start,onChange:e=>le(r=>({...r,start:e.target.value}))}),(0,F.jsx)("span",{children:"~"}),(0,F.jsx)(S,{type:"date",value:ie.end,onChange:e=>le(r=>({...r,end:e.target.value}))})]})]})}),(0,F.jsxs)(X,{children:[(0,F.jsx)($,{children:"Brand Sales Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{style:{width:"60px"},children:"Rank"}),(0,F.jsx)(L,{children:"Brand Name"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Restaurants"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(L,{style:{width:"150px"},children:"Performance"})]})}),(0,F.jsxs)("tbody",{children:[Ze.brands.map((e,r)=>{var t;const n=(null===(t=Ze.brands[0])||void 0===t?void 0:t.revenue)||1,s=Math.round(e.revenue/n*100);return(0,F.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsx)(P,{children:(0,F.jsx)(Z,{rank:r+1,children:r+1})}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{style:{textAlign:"right"},children:e.restaurantCount}),(0,F.jsx)(P,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,F.jsx)(P,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,a.vv)(e.revenue,"RM")}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:s}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===Ze.brands.length&&(0,F.jsx)("tr",{children:(0,F.jsx)(P,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No brand data available"})})]})]})]}),(0,F.jsxs)(X,{children:[(0,F.jsx)($,{children:"Restaurant Sales Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{style:{width:"60px"},children:"Rank"}),(0,F.jsx)(L,{children:"Restaurant Name"}),(0,F.jsx)(L,{children:"Brand"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(L,{style:{width:"150px"},children:"Performance"})]})}),(0,F.jsxs)("tbody",{children:[Ze.restaurants.slice(0,20).map((e,r)=>{var t;const n=(null===(t=Ze.restaurants[0])||void 0===t?void 0:t.revenue)||1,s=Math.round(e.revenue/n*100);return(0,F.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsx)(P,{children:(0,F.jsx)(Z,{rank:r+1,children:r+1})}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{children:(0,F.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",backgroundColor:"Independent"===e.brandName?"#F3F4F6":"#E0E7FF",color:"Independent"===e.brandName?"#6B7280":"#4338CA"},children:e.brandName})}),(0,F.jsx)(P,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,F.jsx)(P,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,a.vv)(e.revenue,"RM")}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:s}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===Ze.restaurants.length&&(0,F.jsx)("tr",{children:(0,F.jsx)(P,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}}}]);