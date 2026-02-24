"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4105],{4105:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ee});var n=r(9950),s=r(4752),i=r(4492),o=r(3310),l=r(2674),a=r(1367),d=r(1095),c=r(2847),h=r(3245),x=r(158),u=r(3440),p=r(4094),g=r(4915),j=r(7621),m=r(5297),v=r(2528),y=r(294),f=r(3588),F=r(4414);const b=s.Ay.div`
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
`,k=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,A=s.Ay.input`
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
`,S=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,C=s.Ay.div`
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
`,B=s.Ay.div`
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
`,O=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,M=l.MD,I=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,$=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,_=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,z=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,R=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,T=s.Ay.th`
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
`,L=s.Ay.div`
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
`,W=s.Ay.tr`
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
`,N=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,U=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,Y=s.Ay.input`
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
`,K=s.Ay.div`
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
`,V=s.Ay.div`
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
`,J=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,q=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,G=s.Ay.button`
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
`,Q=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,X=s.Ay.span`
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
`,Z=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],ee=()=>{var e,t;const{user:r}=(0,a.As)(),[s,ee]=(0,i.ok)(),[te,re]=(0,n.useState)(()=>s.get("tab")||"ranking"),[ne,se]=(0,n.useState)("week"),[ie,oe]=(0,n.useState)(()=>{const e=new Date,t=new Date(e);return t.setDate(t.getDate()-6),{start:Ie(t),end:Ie(e)}}),[le,ae]=(0,n.useState)(!1),[de,ce]=(0,n.useState)([]),[he,xe]=(0,n.useState)("all"),[ue,pe]=(0,n.useState)(""),[ge,je]=(0,n.useState)(!1),[me,ve]=(0,n.useState)([]),[ye,fe]=(0,n.useState)([]),[Fe,be]=(0,n.useState)(!0),[we,ke]=(0,n.useState)([]),[Ae,Se]=(0,n.useState)([]),[Ce,Be]=(0,n.useState)([]),[Ee,De]=(0,n.useState)(new Set),[Oe,Me]=(0,n.useState)(new Set);function Ie(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[$e]=(0,n.useState)(()=>s.get("restaurantId")),[_e]=(0,n.useState)(()=>s.get("restaurantName"));(0,n.useEffect)(()=>{const e={tab:te};"all"!==he&&(e.restaurantId=he),ee(e,{replace:!0})},[te,ee,he]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();if(e.success){const t=e.data.map(e=>{var t;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name,status:e.status}});if(ce(t),ve(t.slice(0,10)),$e){const e=t.find(e=>e.id===$e);e&&(xe(e.id),pe(e.name))}else if(_e){const e=decodeURIComponent(_e),r=t.find(t=>t.name===e);r&&(xe(r.id),pe(r.name))}}}}catch(e){console.error("Error fetching restaurants:",e)}})()},[r,$e,_e]),(0,n.useEffect)(()=>{(async()=>{if(0!==de.length){be(!0);try{const r=localStorage.getItem("auth_token"),n=de.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==he&&(s+=`&restaurant_id=${he}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();let t=e.data||e||[];t=t.filter(e=>{var t;return n.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),fe(t)}const o=await fetch("/api/menu",{headers:{Authorization:`Bearer ${r}`}});if(o.ok){var e,t;const r=await o.json();null!==(e=r.data)&&void 0!==e&&e.items&&Se(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&Be(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{be(!1)}}else be(!1)})()},[he,de]);const ze=()=>{xe("all"),pe(""),je(!1)},Re=(0,n.useMemo)(()=>{if(!ye||0===ye.length)return[];const e=new Date(ie.start);e.setHours(0,0,0,0);const t=new Date(ie.end);return t.setHours(23,59,59,999),ye.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=t,o="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return i&&o})},[ye,ie.start,ie.end]),Te=(0,n.useMemo)(()=>{if(0===Re.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===ne){const r={};return Re.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;r[i]=(r[i]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===ne){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const t=new Date(n);t.setDate(t.getDate()-e),s.push(t)}const i={};return Re.forEach(r=>{const n=Ie(e(r));i[n]=(i[n]||0)+t(r)}),s.map(e=>{const t=Ie(e);return{date:r[e.getDay()],sales:Math.round(i[t]||0)}})}if("month"===ne){const r={};return Re.forEach(n=>{const s=e(n).getDate().toString();r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Re.forEach(s=>{const i=r[e(s).getMonth()];n[i]=(n[i]||0)+t(s)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Re,ne]),Pe=(0,n.useMemo)(()=>{if(0===Re.length)return[{name:"No Data",value:100,sales:0}];const e={};Ce.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};Ae.forEach(r=>{if(r.id){const n=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=n}});const r={};let n=0;Re.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,o;const l=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=l;const a=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(o=e.product_id)||void 0===o?void 0:o.toString()),d=a&&t[a]||"Other";r[d]=(r[d]||0)+l})});const s=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[Re,Ae,Ce]),Le=(0,n.useMemo)(()=>{var e;if(0===Re.length)return[];const t={};Ce.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};Ae.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};Re.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,s,i;const o=e.menu_name||e.name||"Unknown",l=(null===(t=e.menuItem)||void 0===t||null===(s=t.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),a=l?r[l]||"Other":e.category||"Other";n[o]||(n[o]={category:a,price:parseFloat(e.price||0),orders:0,revenue:0});const d=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[o].orders+=d,n[o].revenue+=c*d})});const s=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[Re,Ae,Ce]),We=(0,n.useMemo)(()=>{if(0===Re.length)return[];const e={};return Re.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[Re]),He=(0,n.useMemo)(()=>{if(0===Re.length)return{};const e={};return Re.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),s=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,i=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const o=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=o,e[n].orders+=1,e[n].months[s].revenue+=o,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=o,e[n].months[s].days[i].orders+=1}),e},[Re]),Ne=(0,n.useMemo)(()=>{if(0===Re.length)return[];const e={};return Re.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(Re.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[Re]),Ue=(0,n.useMemo)(()=>{if(0===ye.length)return{restaurants:[]};const e=new Date(ie.start);e.setHours(0,0,0,0);const t=new Date(ie.end);t.setHours(23,59,59,999);const r=ye.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n);return s>=e&&s<=t&&"completed"===r.status}),n={};r.forEach(e=>{var t;const r=null===(t=e.restaurant_id)||void 0===t?void 0:t.toString();if(!r)return;const s=de.find(e=>e.id===r),i=(null===s||void 0===s?void 0:s.name)||e.restaurant_name||"Unknown";n[r]||(n[r]={name:i,orders:0,revenue:0}),n[r].orders+=1,n[r].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(e)});return{restaurants:Object.entries(n).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue)}},[ye,de,ie]),Ye=()=>{const e=new Date(ie.start),t=new Date(ie.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=Ye();if(e<=31){const e=new Set(Object.keys(He)),t=new Set;Object.keys(He).forEach(e=>{Object.keys(He[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),De(e),Me(t)}else e<=365?(De(new Set(Object.keys(He))),Me(new Set)):(De(new Set),Me(new Set))},[ie.start,ie.end,He]);const Ke=e=>{se(e),ae(!1);const t=new Date;let r=new Date(t);switch(e){case"today":r=new Date(t);break;case"week":r.setDate(r.getDate()-6);break;case"month":r.setDate(r.getDate()-29);break;case"year":r.setFullYear(r.getFullYear()-1),r.setDate(r.getDate()+1);break;case"all":r=new Date(t.getFullYear()-5,0,1)}oe({start:Ie(r),end:Ie(t)})},Ve=()=>{const e=Te.reduce((e,t)=>e+t.sales,0),t=`Owner Reports\nGenerated: ${(new Date).toISOString()}\nPeriod: ${ie.start} to ${ie.end}\nRestaurant Filter: ${"all"===he?"All Restaurants":ue}\n\nTotal Revenue: RM ${e.toFixed(2)}\nTotal Orders: ${Re.length}\n`,r=new Blob([t],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=`owner_report_${ie.start}_to_${ie.end}.csv`,n.click()},Je=e=>`RM ${e.toFixed(2)}`,qe=()=>(0,F.jsxs)(C,{children:[(0,F.jsxs)(U,{children:[(0,F.jsx)(Y,{type:"text",placeholder:"All Restaurants",value:ue,onChange:e=>(e=>{if(pe(e),je(!0),e.length<1)return void ve(de.slice(0,10));const t=de.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);ve(t)})(e.target.value),onFocus:()=>{je(!0),ve(de.slice(0,10))},onBlur:()=>setTimeout(()=>je(!1),200)}),"all"!==he&&ue&&(0,F.jsx)(G,{onClick:ze,children:"\xd7"}),(0,F.jsxs)(K,{show:ge,children:[(0,F.jsxs)(V,{onClick:()=>{xe("all"),pe(""),je(!1)},children:[(0,F.jsx)(J,{children:"All Restaurants"}),(0,F.jsx)(q,{children:"Show all restaurant data"})]}),me.map(e=>(0,F.jsxs)(V,{onClick:()=>(e=>{xe(e.id),pe(e.name),je(!1)})(e),children:[(0,F.jsx)(J,{children:e.name}),(0,F.jsx)(q,{children:e.status||"active"})]},e.id))]})]}),(0,F.jsxs)(B,{children:[(0,F.jsx)(E,{active:"today"===ne&&!le,onClick:()=>Ke("today"),children:"Today"}),(0,F.jsx)(E,{active:"week"===ne&&!le,onClick:()=>Ke("week"),children:"Week"}),(0,F.jsx)(E,{active:"month"===ne&&!le,onClick:()=>Ke("month"),children:"Month"}),(0,F.jsx)(E,{active:"year"===ne&&!le,onClick:()=>Ke("year"),children:"Year"}),(0,F.jsx)(E,{active:"all"===ne&&!le,onClick:()=>Ke("all"),children:"All"}),(0,F.jsxs)(S,{children:[(0,F.jsx)(A,{type:"date",value:ie.start,onChange:e=>{oe({...ie,start:e.target.value}),ae(!0)}}),(0,F.jsx)("span",{children:"to"}),(0,F.jsx)(A,{type:"date",value:ie.end,onChange:e=>{oe({...ie,end:e.target.value}),ae(!0)}})]})]}),(0,F.jsxs)(D,{onClick:Ve,children:[(0,F.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,F.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,F.jsx)(o.A,{children:(0,F.jsxs)(b,{children:[(0,F.jsx)(w,{children:(0,F.jsx)(k,{children:"Reports"})}),(0,F.jsxs)(O,{children:[(0,F.jsxs)(l.j,{children:[(0,F.jsx)(l.oz,{active:"ranking"===te,onClick:()=>re("ranking"),children:"Sales Ranking"}),(0,F.jsx)(l.oz,{active:"sales"===te,onClick:()=>re("sales"),children:"Sales Report"}),(0,F.jsx)(l.oz,{active:"details"===te,onClick:()=>re("details"),children:"Sales Details"}),(0,F.jsx)(l.oz,{active:"menu"===te,onClick:()=>re("menu"),children:"Menu Analysis"}),(0,F.jsx)(l.oz,{active:"customers"===te,onClick:()=>re("customers"),children:"Customer Insights"}),(0,F.jsx)(l.oz,{active:"operations"===te,onClick:()=>re("operations"),children:"Operations"})]}),(0,F.jsxs)("div",{style:{display:"sales"===te?"block":"none"},children:[(0,F.jsx)(qe,{}),Fe?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Re.length?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,F.jsxs)("div",{children:[(0,F.jsxs)(M,{children:[(0,F.jsxs)(l.hI,{color:"#059669",children:[(0,F.jsx)(l.v0,{children:"Total Revenue"}),(0,F.jsx)(l.Os,{children:Je(Te.reduce((e,t)=>e+t.sales,0))}),(0,F.jsxs)(l.d1,{children:[Re.length," orders in selected period"]})]}),(0,F.jsxs)(l.hI,{color:"#2563EB",children:[(0,F.jsx)(l.v0,{children:"Total Orders"}),(0,F.jsx)(l.Os,{children:Re.length.toLocaleString()}),(0,F.jsx)(l.d1,{children:"For selected period"})]}),(0,F.jsxs)(l.hI,{color:"#DC2626",children:[(0,F.jsx)(l.v0,{children:"Average Order Value"}),(0,F.jsx)(l.Os,{children:Je(Re.length>0?Te.reduce((e,t)=>e+t.sales,0)/Re.length:0)}),(0,F.jsx)(l.d1,{children:"Per order"})]}),(0,F.jsxs)(l.hI,{color:"#7C3AED",children:[(0,F.jsx)(l.v0,{children:"Completed Orders"}),(0,F.jsx)(l.Os,{children:Re.filter(e=>"completed"===e.status).length}),(0,F.jsxs)(l.d1,{children:[Math.round(Re.filter(e=>"completed"===e.status).length/Re.length*100||0),"% completion rate"]})]})]}),(0,F.jsxs)(I,{children:[(0,F.jsxs)($,{children:[(0,F.jsx)(_,{children:"Revenue Trend"}),(0,F.jsx)(d.u,{width:"100%",height:300,children:(0,F.jsxs)(c.b,{data:Te,margin:{top:5,right:20,left:0,bottom:5},children:[(0,F.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,F.jsx)(x.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,F.jsx)(u.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,F.jsx)(p.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,F.jsx)(g.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,F.jsxs)($,{children:[(0,F.jsx)(_,{children:"Sales by Category"}),(0,F.jsx)(d.u,{width:"100%",height:300,children:(0,F.jsxs)(j.r,{children:[(0,F.jsx)(m.F,{data:Pe,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Pe.map((e,t)=>(0,F.jsx)(v.f,{fill:Z[t%Z.length]},`cell-${t}`))}),(0,F.jsx)(p.m,{formatter:e=>`${e}%`})]})})]})]}),(0,F.jsxs)($,{children:[(0,F.jsx)(_,{children:"Hourly Orders Distribution"}),(0,F.jsx)(d.u,{width:"100%",height:250,children:(0,F.jsxs)(y.E,{data:We,margin:{top:5,right:20,left:0,bottom:5},children:[(0,F.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,F.jsx)(x.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,F.jsx)(u.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,F.jsx)(p.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,F.jsx)(f.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,F.jsxs)("div",{style:{display:"details"===te?"block":"none"},children:[(0,F.jsx)(qe,{}),Fe?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Re.length?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,F.jsxs)("div",{children:[(0,F.jsxs)(M,{children:[(0,F.jsxs)(l.hI,{color:"#059669",children:[(0,F.jsx)(l.v0,{children:"Total Revenue"}),(0,F.jsx)(l.Os,{children:Je(Te.reduce((e,t)=>e+t.sales,0))}),(0,F.jsxs)(l.d1,{children:[Re.length," orders in selected period"]})]}),(0,F.jsxs)(l.hI,{color:"#2563EB",children:[(0,F.jsx)(l.v0,{children:"Total Orders"}),(0,F.jsx)(l.Os,{children:Re.length.toLocaleString()}),(0,F.jsxs)(l.d1,{children:[Re.filter(e=>"completed"===e.status).length," completed"]})]}),(0,F.jsxs)(l.hI,{color:"#DC2626",children:[(0,F.jsx)(l.v0,{children:"Average Order Value"}),(0,F.jsx)(l.Os,{children:Je(Re.length>0?Te.reduce((e,t)=>e+t.sales,0)/Re.length:0)}),(0,F.jsx)(l.d1,{children:"Per order average"})]}),(0,F.jsxs)(l.hI,{color:"#7C3AED",children:[(0,F.jsx)(l.v0,{children:"Period"}),(0,F.jsx)(l.Os,{children:Ye()}),(0,F.jsx)(l.d1,{children:"Days"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)(_,{children:"Detailed Sales Breakdown"}),(0,F.jsxs)(R,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(T,{style:{width:"40%"},children:"Period"}),(0,F.jsx)(T,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(T,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(T,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,F.jsx)("tbody",{children:Object.keys(He).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=He[e],r=Ee.has(e);return(0,F.jsxs)(n.Fragment,{children:[(0,F.jsxs)(W,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(Ee);if(t.has(e)){var r;t.delete(e);const n=new Set(Oe);Object.keys((null===(r=He[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),Me(n)}else t.add(e);De(t)})(e),children:[(0,F.jsxs)(H,{level:0,bold:!0,children:[(0,F.jsx)(N,{expanded:r,children:"\u25b6"}),e]}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:Je(t.revenue)}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:Je(t.revenue/t.orders)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],i=`${e}-${r}`,o=Oe.has(i),l=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,F.jsxs)(n.Fragment,{children:[(0,F.jsxs)(W,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(Oe);t.has(e)?t.delete(e):t.add(e),Me(t)})(i),children:[(0,F.jsxs)(H,{level:1,bold:!0,children:[(0,F.jsx)(N,{expanded:o,children:"\u25b6"}),l]}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:Je(s.revenue)}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:s.orders}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:Je(s.revenue/s.orders)})]}),o&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,F.jsxs)(W,{level:2,children:[(0,F.jsx)(H,{level:2,children:r}),(0,F.jsx)(H,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:Je(t.revenue)}),(0,F.jsx)(H,{level:2,style:{textAlign:"right"},children:t.orders}),(0,F.jsx)(H,{level:2,style:{textAlign:"right"},children:Je(t.revenue/t.orders)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,F.jsxs)("div",{style:{display:"menu"===te?"block":"none"},children:[(0,F.jsx)(qe,{}),(0,F.jsxs)(M,{children:[(0,F.jsxs)(l.hI,{color:"#F59E0B",children:[(0,F.jsx)(l.v0,{children:"Best Seller"}),(0,F.jsx)(l.Os,{children:(null===(e=Le[0])||void 0===e?void 0:e.name)||"N/A"}),(0,F.jsxs)(l.d1,{children:[(null===(t=Le[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,F.jsxs)(l.hI,{color:"#10B981",children:[(0,F.jsx)(l.v0,{children:"Total Items Analyzed"}),(0,F.jsx)(l.Os,{children:Le.length}),(0,F.jsx)(l.d1,{children:"Complete menu analysis"})]}),(0,F.jsxs)(l.hI,{color:"#3B82F6",children:[(0,F.jsx)(l.v0,{children:"Total Orders"}),(0,F.jsx)(l.Os,{children:Le.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,F.jsx)(l.d1,{children:"For selected period"})]}),(0,F.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,F.jsx)(l.v0,{children:"Total Revenue"}),(0,F.jsx)(l.Os,{children:Je(Le.reduce((e,t)=>e+t.revenue,0))}),(0,F.jsx)(l.d1,{children:"For selected period"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)(_,{children:"Complete Menu Performance Ranking"}),(0,F.jsxs)(R,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(T,{children:"Rank"}),(0,F.jsx)(T,{children:"Menu Item"}),(0,F.jsx)(T,{children:"Category"}),(0,F.jsx)(T,{children:"Price"}),(0,F.jsx)(T,{children:"Orders"}),(0,F.jsx)(T,{children:"Revenue"}),(0,F.jsx)(T,{children:"Performance"})]})}),(0,F.jsx)("tbody",{children:Le.map((e,t)=>{var r;const n=(null===(r=Le[0])||void 0===r?void 0:r.orders)||1;return(0,F.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsxs)(P,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1]}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{children:(0,F.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,F.jsx)(P,{children:Je(e.price)}),(0,F.jsx)(P,{children:e.orders.toLocaleString()}),(0,F.jsx)(P,{children:Je(e.revenue)}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(L,{percentage:e.orders/n*100}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,F.jsxs)("div",{style:{display:"customers"===te?"block":"none"},children:[(0,F.jsx)(qe,{}),(0,F.jsxs)(M,{children:[(0,F.jsxs)(l.hI,{color:"#635BFF",children:[(0,F.jsx)(l.v0,{children:"Total Customers"}),(0,F.jsx)(l.Os,{children:we.length.toLocaleString()}),(0,F.jsx)(l.d1,{children:"Across all restaurants"})]}),(0,F.jsxs)(l.hI,{color:"#00D924",children:[(0,F.jsx)(l.v0,{children:"Repeat Customers"}),(0,F.jsx)(l.Os,{children:we.filter(e=>e.total_orders>1).length}),(0,F.jsxs)(l.d1,{children:[we.length>0?Math.round(we.filter(e=>e.total_orders>1).length/we.length*100):0,"% return rate"]})]}),(0,F.jsxs)(l.hI,{color:"#FFB800",children:[(0,F.jsx)(l.v0,{children:"Average Spent"}),(0,F.jsx)(l.Os,{children:Je(we.length>0?we.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/we.length:0)}),(0,F.jsx)(l.d1,{children:"Per customer"})]}),(0,F.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,F.jsx)(l.v0,{children:"Total Points"}),(0,F.jsx)(l.Os,{children:we.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,F.jsx)(l.d1,{children:"Across all customers"})]})]}),(0,F.jsx)(z,{children:(0,F.jsx)(_,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,F.jsxs)("div",{style:{display:"operations"===te?"block":"none"},children:[(0,F.jsx)(qe,{}),(0,F.jsxs)(M,{children:[(0,F.jsxs)(l.hI,{color:"#10B981",children:[(0,F.jsx)(l.v0,{children:"Order Fulfillment"}),(0,F.jsxs)(l.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,F.jsx)(l.d1,{children:"On-time completion"})]}),(0,F.jsxs)(l.hI,{color:"#F59E0B",children:[(0,F.jsx)(l.v0,{children:"Avg. Wait Time"}),(0,F.jsxs)(l.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,F.jsx)(l.d1,{children:"Estimated"})]}),(0,F.jsxs)(l.hI,{color:"#EF4444",children:[(0,F.jsx)(l.v0,{children:"Peak Hour"}),(0,F.jsx)(l.Os,{children:"12-1 PM"}),(0,F.jsx)(l.d1,{children:"Busiest time"})]}),(0,F.jsxs)(l.hI,{color:"#6366F1",children:[(0,F.jsx)(l.v0,{children:"Staff Efficiency"}),(0,F.jsxs)(l.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,F.jsx)(l.d1,{children:"Estimated"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)(_,{children:"Peak Hours Performance"}),(0,F.jsxs)(R,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(T,{children:"Time Slot"}),(0,F.jsx)(T,{children:"Orders"}),(0,F.jsx)(T,{children:"Revenue"}),(0,F.jsx)(T,{children:"Efficiency"})]})}),(0,F.jsx)("tbody",{children:Ne.map((e,t)=>(0,F.jsxs)("tr",{children:[(0,F.jsx)(P,{style:{fontWeight:600},children:e.time}),(0,F.jsx)(P,{children:e.orders}),(0,F.jsx)(P,{children:Je(e.revenue)}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(L,{percentage:e.efficiency}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,F.jsxs)("div",{style:{display:"ranking"===te?"block":"none"},children:[(0,F.jsx)(C,{children:(0,F.jsxs)(B,{children:[(0,F.jsx)(E,{active:"today"===ne,onClick:()=>Ke("today"),children:"Today"}),(0,F.jsx)(E,{active:"week"===ne,onClick:()=>Ke("week"),children:"This Week"}),(0,F.jsx)(E,{active:"month"===ne,onClick:()=>Ke("month"),children:"This Month"}),(0,F.jsx)(E,{active:"year"===ne,onClick:()=>Ke("year"),children:"This Year"}),(0,F.jsx)(E,{active:"all"===ne,onClick:()=>Ke("all"),children:"All Time"}),le&&(0,F.jsxs)(S,{children:[(0,F.jsx)(A,{type:"date",value:ie.start,onChange:e=>oe(t=>({...t,start:e.target.value}))}),(0,F.jsx)("span",{children:"~"}),(0,F.jsx)(A,{type:"date",value:ie.end,onChange:e=>oe(t=>({...t,end:e.target.value}))})]})]})}),(0,F.jsxs)(Q,{children:[(0,F.jsx)(_,{children:"Restaurant Sales Ranking"}),(0,F.jsxs)(R,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(T,{style:{width:"60px"},children:"Rank"}),(0,F.jsx)(T,{children:"Restaurant Name"}),(0,F.jsx)(T,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(T,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(T,{style:{width:"150px"},children:"Performance"})]})}),(0,F.jsxs)("tbody",{children:[Ue.restaurants.map((e,t)=>{var r;const n=(null===(r=Ue.restaurants[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,F.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsx)(P,{children:(0,F.jsx)(X,{rank:t+1,children:t+1})}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,F.jsx)(P,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:Je(e.revenue)}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(L,{percentage:s}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===Ue.restaurants.length&&(0,F.jsx)("tr",{children:(0,F.jsx)(P,{colSpan:5,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}}}]);