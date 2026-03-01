"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4105],{4105:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Z});var n=r(9950),s=r(4752),i=r(4492),o=r(7960),l=r(1367),a=r(1095),d=r(2847),c=r(3245),h=r(158),x=r(3440),u=r(2174),p=r(4915),g=r(7621),j=r(5297),m=r(2528),v=r(294),y=r(3588),f=r(4414);const F=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,b=s.Ay.div`
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
`,w=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,k=s.Ay.input`
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
`,A=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,S=s.Ay.div`
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
`,C=s.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
  }
`,B=s.Ay.button`
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
`,E=s.Ay.button`
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

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,O=o.MD,M=s.Ay.div`
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
`,_=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,z=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,R=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,T=s.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,P=s.Ay.div`
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
`,L=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,W=s.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,H=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,N=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,U=s.Ay.input`
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
`,Y=s.Ay.div`
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
`,K=s.Ay.div`
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
`,V=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,J=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,q=s.Ay.button`
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
`,G=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,Q=s.Ay.span`
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
`,X=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],Z=()=>{var e,t;const{user:r}=(0,l.As)(),[s,Z]=(0,i.ok)(),[ee,te]=(0,n.useState)(()=>s.get("tab")||"ranking"),[re,ne]=(0,n.useState)("week"),[se,ie]=(0,n.useState)(()=>{const e=new Date,t=new Date(e);return t.setDate(t.getDate()-6),{start:Me(t),end:Me(e)}}),[oe,le]=(0,n.useState)(!1),[ae,de]=(0,n.useState)([]),[ce,he]=(0,n.useState)("all"),[xe,ue]=(0,n.useState)(""),[pe,ge]=(0,n.useState)(!1),[je,me]=(0,n.useState)([]),[ve,ye]=(0,n.useState)([]),[fe,Fe]=(0,n.useState)(!0),[be,we]=(0,n.useState)([]),[ke,Ae]=(0,n.useState)([]),[Se,Ce]=(0,n.useState)([]),[Be,Ee]=(0,n.useState)(new Set),[De,Oe]=(0,n.useState)(new Set);function Me(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[Ie]=(0,n.useState)(()=>s.get("restaurantId")),[$e]=(0,n.useState)(()=>s.get("restaurantName"));(0,n.useEffect)(()=>{const e={tab:ee};"all"!==ce&&(e.restaurantId=ce),Z(e,{replace:!0})},[ee,Z,ce]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();if(e.success){const t=e.data.map(e=>{var t;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name,status:e.status}});if(de(t),me(t.slice(0,10)),Ie){const e=t.find(e=>e.id===Ie);e&&(he(e.id),ue(e.name))}else if($e){const e=decodeURIComponent($e),r=t.find(t=>t.name===e);r&&(he(r.id),ue(r.name))}}}}catch(e){console.error("Error fetching restaurants:",e)}})()},[r,Ie,$e]),(0,n.useEffect)(()=>{(async()=>{if(0!==ae.length){Fe(!0);try{const r=localStorage.getItem("auth_token"),n=ae.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==ce&&(s+=`&restaurant_id=${ce}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();let t=e.data||e||[];t=t.filter(e=>{var t;return n.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),ye(t)}const o=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${r}`}});if(o.ok){var e,t;const r=await o.json();null!==(e=r.data)&&void 0!==e&&e.items&&Ae(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&Ce(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{Fe(!1)}}else Fe(!1)})()},[ce,ae]);const _e=()=>{he("all"),ue(""),ge(!1)},ze=(0,n.useMemo)(()=>{if(!ve||0===ve.length)return[];const e=new Date(se.start);e.setHours(0,0,0,0);const t=new Date(se.end);return t.setHours(23,59,59,999),ve.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=t,o="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return i&&o})},[ve,se.start,se.end]),Re=(0,n.useMemo)(()=>{if(0===ze.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===re){const r={};return ze.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;r[i]=(r[i]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===re){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const t=new Date(n);t.setDate(t.getDate()-e),s.push(t)}const i={};return ze.forEach(r=>{const n=Me(e(r));i[n]=(i[n]||0)+t(r)}),s.map(e=>{const t=Me(e);return{date:r[e.getDay()],sales:Math.round(i[t]||0)}})}if("month"===re){const r={};return ze.forEach(n=>{const s=e(n).getDate().toString();r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return ze.forEach(s=>{const i=r[e(s).getMonth()];n[i]=(n[i]||0)+t(s)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[ze,re]),Te=(0,n.useMemo)(()=>{if(0===ze.length)return[{name:"No Data",value:100,sales:0}];const e={};Se.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};ke.forEach(r=>{if(r.id){const n=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=n}});const r={};let n=0;ze.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,o;const l=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=l;const a=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(o=e.product_id)||void 0===o?void 0:o.toString()),d=a&&t[a]||"Other";r[d]=(r[d]||0)+l})});const s=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[ze,ke,Se]),Pe=(0,n.useMemo)(()=>{var e;if(0===ze.length)return[];const t={};Se.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};ke.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};ze.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,s,i;const o=e.menu_name||e.name||"Unknown",l=(null===(t=e.menuItem)||void 0===t||null===(s=t.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),a=l?r[l]||"Other":e.category||"Other";n[o]||(n[o]={category:a,price:parseFloat(e.price||0),orders:0,revenue:0});const d=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[o].orders+=d,n[o].revenue+=c*d})});const s=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[ze,ke,Se]),Le=(0,n.useMemo)(()=>{if(0===ze.length)return[];const e={};return ze.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[ze]),We=(0,n.useMemo)(()=>{if(0===ze.length)return{};const e={};return ze.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),s=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,i=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const o=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=o,e[n].orders+=1,e[n].months[s].revenue+=o,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=o,e[n].months[s].days[i].orders+=1}),e},[ze]),He=(0,n.useMemo)(()=>{if(0===ze.length)return[];const e={};return ze.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(ze.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[ze]),Ne=(0,n.useMemo)(()=>{if(0===ve.length)return{restaurants:[]};const e=new Date(se.start);e.setHours(0,0,0,0);const t=new Date(se.end);t.setHours(23,59,59,999);const r=ve.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n);return s>=e&&s<=t&&"completed"===r.status}),n={};r.forEach(e=>{var t;const r=null===(t=e.restaurant_id)||void 0===t?void 0:t.toString();if(!r)return;const s=ae.find(e=>e.id===r),i=(null===s||void 0===s?void 0:s.name)||e.restaurant_name||"Unknown";n[r]||(n[r]={name:i,orders:0,revenue:0}),n[r].orders+=1,n[r].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(e)});return{restaurants:Object.entries(n).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue)}},[ve,ae,se]),Ue=()=>{const e=new Date(se.start),t=new Date(se.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=Ue();if(e<=31){const e=new Set(Object.keys(We)),t=new Set;Object.keys(We).forEach(e=>{Object.keys(We[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),Ee(e),Oe(t)}else e<=365?(Ee(new Set(Object.keys(We))),Oe(new Set)):(Ee(new Set),Oe(new Set))},[se.start,se.end,We]);const Ye=e=>{ne(e),le(!1);const t=new Date;let r=new Date(t);switch(e){case"today":r=new Date(t);break;case"week":r.setDate(r.getDate()-6);break;case"month":r.setDate(r.getDate()-29);break;case"year":r.setFullYear(r.getFullYear()-1),r.setDate(r.getDate()+1);break;case"all":r=new Date(t.getFullYear()-5,0,1)}ie({start:Me(r),end:Me(t)})},Ke=()=>{const e=Re.reduce((e,t)=>e+t.sales,0),t=`Owner Reports\nGenerated: ${(new Date).toISOString()}\nPeriod: ${se.start} to ${se.end}\nRestaurant Filter: ${"all"===ce?"All Restaurants":xe}\n\nTotal Revenue: RM ${e.toFixed(2)}\nTotal Orders: ${ze.length}\n`,r=new Blob([t],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=`owner_report_${se.start}_to_${se.end}.csv`,n.click()},Ve=e=>`RM ${e.toFixed(2)}`,Je=()=>(0,f.jsxs)(S,{children:[(0,f.jsxs)(N,{children:[(0,f.jsx)(U,{type:"text",placeholder:"All Restaurants",value:xe,onChange:e=>(e=>{if(ue(e),ge(!0),e.length<1)return void me(ae.slice(0,10));const t=ae.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);me(t)})(e.target.value),onFocus:()=>{ge(!0),me(ae.slice(0,10))},onBlur:()=>setTimeout(()=>ge(!1),200)}),"all"!==ce&&xe&&(0,f.jsx)(q,{onClick:_e,children:"\xd7"}),(0,f.jsxs)(Y,{show:pe,children:[(0,f.jsxs)(K,{onClick:()=>{he("all"),ue(""),ge(!1)},children:[(0,f.jsx)(V,{children:"All Restaurants"}),(0,f.jsx)(J,{children:"Show all restaurant data"})]}),je.map(e=>(0,f.jsxs)(K,{onClick:()=>(e=>{he(e.id),ue(e.name),ge(!1)})(e),children:[(0,f.jsx)(V,{children:e.name}),(0,f.jsx)(J,{children:e.status||"active"})]},e.id))]})]}),(0,f.jsxs)(C,{children:[(0,f.jsx)(B,{active:"today"===re&&!oe,onClick:()=>Ye("today"),children:"Today"}),(0,f.jsx)(B,{active:"week"===re&&!oe,onClick:()=>Ye("week"),children:"Week"}),(0,f.jsx)(B,{active:"month"===re&&!oe,onClick:()=>Ye("month"),children:"Month"}),(0,f.jsx)(B,{active:"year"===re&&!oe,onClick:()=>Ye("year"),children:"Year"}),(0,f.jsx)(B,{active:"all"===re&&!oe,onClick:()=>Ye("all"),children:"All"}),(0,f.jsxs)(A,{children:[(0,f.jsx)(k,{type:"date",value:se.start,onChange:e=>{ie({...se,start:e.target.value}),le(!0)}}),(0,f.jsx)("span",{children:"to"}),(0,f.jsx)(k,{type:"date",value:se.end,onChange:e=>{ie({...se,end:e.target.value}),le(!0)}})]})]}),(0,f.jsxs)(E,{onClick:Ke,children:[(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,f.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(F,{children:[(0,f.jsx)(b,{children:(0,f.jsx)(w,{children:"Reports"})}),(0,f.jsxs)(D,{children:[(0,f.jsxs)(o.j,{children:[(0,f.jsx)(o.oz,{active:"ranking"===ee,onClick:()=>te("ranking"),children:"Sales Ranking"}),(0,f.jsx)(o.oz,{active:"sales"===ee,onClick:()=>te("sales"),children:"Sales Report"}),(0,f.jsx)(o.oz,{active:"details"===ee,onClick:()=>te("details"),children:"Sales Details"}),(0,f.jsx)(o.oz,{active:"menu"===ee,onClick:()=>te("menu"),children:"Menu Analysis"}),(0,f.jsx)(o.oz,{active:"customers"===ee,onClick:()=>te("customers"),children:"Customer Insights"}),(0,f.jsx)(o.oz,{active:"operations"===ee,onClick:()=>te("operations"),children:"Operations"})]}),(0,f.jsxs)("div",{style:{display:"sales"===ee?"block":"none"},children:[(0,f.jsx)(Je,{}),fe?(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===ze.length?(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,f.jsxs)("div",{children:[(0,f.jsxs)(O,{children:[(0,f.jsxs)(o.hI,{color:"#059669",children:[(0,f.jsx)(o.v0,{children:"Total Revenue"}),(0,f.jsx)(o.Os,{children:Ve(Re.reduce((e,t)=>e+t.sales,0))}),(0,f.jsxs)(o.d1,{children:[ze.length," orders in selected period"]})]}),(0,f.jsxs)(o.hI,{color:"#2563EB",children:[(0,f.jsx)(o.v0,{children:"Total Orders"}),(0,f.jsx)(o.Os,{children:ze.length.toLocaleString()}),(0,f.jsx)(o.d1,{children:"For selected period"})]}),(0,f.jsxs)(o.hI,{color:"#DC2626",children:[(0,f.jsx)(o.v0,{children:"Average Order Value"}),(0,f.jsx)(o.Os,{children:Ve(ze.length>0?Re.reduce((e,t)=>e+t.sales,0)/ze.length:0)}),(0,f.jsx)(o.d1,{children:"Per order"})]}),(0,f.jsxs)(o.hI,{color:"#7C3AED",children:[(0,f.jsx)(o.v0,{children:"Completed Orders"}),(0,f.jsx)(o.Os,{children:ze.filter(e=>"completed"===e.status).length}),(0,f.jsxs)(o.d1,{children:[Math.round(ze.filter(e=>"completed"===e.status).length/ze.length*100||0),"% completion rate"]})]})]}),(0,f.jsxs)(M,{children:[(0,f.jsxs)(I,{children:[(0,f.jsx)($,{children:"Revenue Trend"}),(0,f.jsx)(a.u,{width:"100%",height:300,children:(0,f.jsxs)(d.b,{data:Re,margin:{top:5,right:20,left:0,bottom:5},children:[(0,f.jsx)(c.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,f.jsx)(h.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,f.jsx)(x.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,f.jsx)(u.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,f.jsx)(p.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,f.jsxs)(I,{children:[(0,f.jsx)($,{children:"Sales by Category"}),(0,f.jsx)(a.u,{width:"100%",height:300,children:(0,f.jsxs)(g.r,{children:[(0,f.jsx)(j.F,{data:Te,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Te.map((e,t)=>(0,f.jsx)(m.f,{fill:X[t%X.length]},`cell-${t}`))}),(0,f.jsx)(u.m,{formatter:e=>`${e}%`})]})})]})]}),(0,f.jsxs)(I,{children:[(0,f.jsx)($,{children:"Hourly Orders Distribution"}),(0,f.jsx)(a.u,{width:"100%",height:250,children:(0,f.jsxs)(v.E,{data:Le,margin:{top:5,right:20,left:0,bottom:5},children:[(0,f.jsx)(c.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,f.jsx)(h.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,f.jsx)(x.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,f.jsx)(u.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,f.jsx)(y.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,f.jsxs)("div",{style:{display:"details"===ee?"block":"none"},children:[(0,f.jsx)(Je,{}),fe?(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===ze.length?(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,f.jsxs)("div",{children:[(0,f.jsxs)(O,{children:[(0,f.jsxs)(o.hI,{color:"#059669",children:[(0,f.jsx)(o.v0,{children:"Total Revenue"}),(0,f.jsx)(o.Os,{children:Ve(Re.reduce((e,t)=>e+t.sales,0))}),(0,f.jsxs)(o.d1,{children:[ze.length," orders in selected period"]})]}),(0,f.jsxs)(o.hI,{color:"#2563EB",children:[(0,f.jsx)(o.v0,{children:"Total Orders"}),(0,f.jsx)(o.Os,{children:ze.length.toLocaleString()}),(0,f.jsxs)(o.d1,{children:[ze.filter(e=>"completed"===e.status).length," completed"]})]}),(0,f.jsxs)(o.hI,{color:"#DC2626",children:[(0,f.jsx)(o.v0,{children:"Average Order Value"}),(0,f.jsx)(o.Os,{children:Ve(ze.length>0?Re.reduce((e,t)=>e+t.sales,0)/ze.length:0)}),(0,f.jsx)(o.d1,{children:"Per order average"})]}),(0,f.jsxs)(o.hI,{color:"#7C3AED",children:[(0,f.jsx)(o.v0,{children:"Period"}),(0,f.jsx)(o.Os,{children:Ue()}),(0,f.jsx)(o.d1,{children:"Days"})]})]}),(0,f.jsxs)(_,{children:[(0,f.jsx)($,{children:"Detailed Sales Breakdown"}),(0,f.jsxs)(z,{children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)(R,{style:{width:"40%"},children:"Period"}),(0,f.jsx)(R,{style:{textAlign:"right"},children:"Revenue"}),(0,f.jsx)(R,{style:{textAlign:"right"},children:"Orders"}),(0,f.jsx)(R,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,f.jsx)("tbody",{children:Object.keys(We).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=We[e],r=Be.has(e);return(0,f.jsxs)(n.Fragment,{children:[(0,f.jsxs)(L,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(Be);if(t.has(e)){var r;t.delete(e);const n=new Set(De);Object.keys((null===(r=We[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),Oe(n)}else t.add(e);Ee(t)})(e),children:[(0,f.jsxs)(W,{level:0,bold:!0,children:[(0,f.jsx)(H,{expanded:r,children:"\u25b6"}),e]}),(0,f.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:Ve(t.revenue)}),(0,f.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,f.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:Ve(t.revenue/t.orders)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],i=`${e}-${r}`,o=De.has(i),l=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,f.jsxs)(n.Fragment,{children:[(0,f.jsxs)(L,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(De);t.has(e)?t.delete(e):t.add(e),Oe(t)})(i),children:[(0,f.jsxs)(W,{level:1,bold:!0,children:[(0,f.jsx)(H,{expanded:o,children:"\u25b6"}),l]}),(0,f.jsx)(W,{level:1,style:{textAlign:"right"},children:Ve(s.revenue)}),(0,f.jsx)(W,{level:1,style:{textAlign:"right"},children:s.orders}),(0,f.jsx)(W,{level:1,style:{textAlign:"right"},children:Ve(s.revenue/s.orders)})]}),o&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,f.jsxs)(L,{level:2,children:[(0,f.jsx)(W,{level:2,children:r}),(0,f.jsx)(W,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:Ve(t.revenue)}),(0,f.jsx)(W,{level:2,style:{textAlign:"right"},children:t.orders}),(0,f.jsx)(W,{level:2,style:{textAlign:"right"},children:Ve(t.revenue/t.orders)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,f.jsxs)("div",{style:{display:"menu"===ee?"block":"none"},children:[(0,f.jsx)(Je,{}),(0,f.jsxs)(O,{children:[(0,f.jsxs)(o.hI,{color:"#F59E0B",children:[(0,f.jsx)(o.v0,{children:"Best Seller"}),(0,f.jsx)(o.Os,{children:(null===(e=Pe[0])||void 0===e?void 0:e.name)||"N/A"}),(0,f.jsxs)(o.d1,{children:[(null===(t=Pe[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,f.jsxs)(o.hI,{color:"#10B981",children:[(0,f.jsx)(o.v0,{children:"Total Items Analyzed"}),(0,f.jsx)(o.Os,{children:Pe.length}),(0,f.jsx)(o.d1,{children:"Complete menu analysis"})]}),(0,f.jsxs)(o.hI,{color:"#3B82F6",children:[(0,f.jsx)(o.v0,{children:"Total Orders"}),(0,f.jsx)(o.Os,{children:Pe.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,f.jsx)(o.d1,{children:"For selected period"})]}),(0,f.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,f.jsx)(o.v0,{children:"Total Revenue"}),(0,f.jsx)(o.Os,{children:Ve(Pe.reduce((e,t)=>e+t.revenue,0))}),(0,f.jsx)(o.d1,{children:"For selected period"})]})]}),(0,f.jsxs)(_,{children:[(0,f.jsx)($,{children:"Complete Menu Performance Ranking"}),(0,f.jsxs)(z,{children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)(R,{children:"Rank"}),(0,f.jsx)(R,{children:"Menu Item"}),(0,f.jsx)(R,{children:"Category"}),(0,f.jsx)(R,{children:"Price"}),(0,f.jsx)(R,{children:"Orders"}),(0,f.jsx)(R,{children:"Revenue"}),(0,f.jsx)(R,{children:"Performance"})]})}),(0,f.jsx)("tbody",{children:Pe.map((e,t)=>{var r;const n=(null===(r=Pe[0])||void 0===r?void 0:r.orders)||1;return(0,f.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,f.jsxs)(T,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1]}),(0,f.jsx)(T,{style:{fontWeight:600},children:e.name}),(0,f.jsx)(T,{children:(0,f.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,f.jsx)(T,{children:Ve(e.price)}),(0,f.jsx)(T,{children:e.orders.toLocaleString()}),(0,f.jsx)(T,{children:Ve(e.revenue)}),(0,f.jsx)(T,{children:(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,f.jsx)(P,{percentage:e.orders/n*100}),(0,f.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,f.jsxs)("div",{style:{display:"customers"===ee?"block":"none"},children:[(0,f.jsx)(Je,{}),(0,f.jsxs)(O,{children:[(0,f.jsxs)(o.hI,{color:"#635BFF",children:[(0,f.jsx)(o.v0,{children:"Total Customers"}),(0,f.jsx)(o.Os,{children:be.length.toLocaleString()}),(0,f.jsx)(o.d1,{children:"Across all restaurants"})]}),(0,f.jsxs)(o.hI,{color:"#00D924",children:[(0,f.jsx)(o.v0,{children:"Repeat Customers"}),(0,f.jsx)(o.Os,{children:be.filter(e=>e.total_orders>1).length}),(0,f.jsxs)(o.d1,{children:[be.length>0?Math.round(be.filter(e=>e.total_orders>1).length/be.length*100):0,"% return rate"]})]}),(0,f.jsxs)(o.hI,{color:"#FFB800",children:[(0,f.jsx)(o.v0,{children:"Average Spent"}),(0,f.jsx)(o.Os,{children:Ve(be.length>0?be.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/be.length:0)}),(0,f.jsx)(o.d1,{children:"Per customer"})]}),(0,f.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,f.jsx)(o.v0,{children:"Total Points"}),(0,f.jsx)(o.Os,{children:be.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,f.jsx)(o.d1,{children:"Across all customers"})]})]}),(0,f.jsx)(_,{children:(0,f.jsx)($,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,f.jsxs)("div",{style:{display:"operations"===ee?"block":"none"},children:[(0,f.jsx)(Je,{}),(0,f.jsxs)(O,{children:[(0,f.jsxs)(o.hI,{color:"#10B981",children:[(0,f.jsx)(o.v0,{children:"Order Fulfillment"}),(0,f.jsxs)(o.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,f.jsx)(o.d1,{children:"On-time completion"})]}),(0,f.jsxs)(o.hI,{color:"#F59E0B",children:[(0,f.jsx)(o.v0,{children:"Avg. Wait Time"}),(0,f.jsxs)(o.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,f.jsx)(o.d1,{children:"Estimated"})]}),(0,f.jsxs)(o.hI,{color:"#EF4444",children:[(0,f.jsx)(o.v0,{children:"Peak Hour"}),(0,f.jsx)(o.Os,{children:"12-1 PM"}),(0,f.jsx)(o.d1,{children:"Busiest time"})]}),(0,f.jsxs)(o.hI,{color:"#6366F1",children:[(0,f.jsx)(o.v0,{children:"Staff Efficiency"}),(0,f.jsxs)(o.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,f.jsx)(o.d1,{children:"Estimated"})]})]}),(0,f.jsxs)(_,{children:[(0,f.jsx)($,{children:"Peak Hours Performance"}),(0,f.jsxs)(z,{children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)(R,{children:"Time Slot"}),(0,f.jsx)(R,{children:"Orders"}),(0,f.jsx)(R,{children:"Revenue"}),(0,f.jsx)(R,{children:"Efficiency"})]})}),(0,f.jsx)("tbody",{children:He.map((e,t)=>(0,f.jsxs)("tr",{children:[(0,f.jsx)(T,{style:{fontWeight:600},children:e.time}),(0,f.jsx)(T,{children:e.orders}),(0,f.jsx)(T,{children:Ve(e.revenue)}),(0,f.jsx)(T,{children:(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,f.jsx)(P,{percentage:e.efficiency}),(0,f.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,f.jsxs)("div",{style:{display:"ranking"===ee?"block":"none"},children:[(0,f.jsx)(S,{children:(0,f.jsxs)(C,{children:[(0,f.jsx)(B,{active:"today"===re,onClick:()=>Ye("today"),children:"Today"}),(0,f.jsx)(B,{active:"week"===re,onClick:()=>Ye("week"),children:"This Week"}),(0,f.jsx)(B,{active:"month"===re,onClick:()=>Ye("month"),children:"This Month"}),(0,f.jsx)(B,{active:"year"===re,onClick:()=>Ye("year"),children:"This Year"}),(0,f.jsx)(B,{active:"all"===re,onClick:()=>Ye("all"),children:"All Time"}),oe&&(0,f.jsxs)(A,{children:[(0,f.jsx)(k,{type:"date",value:se.start,onChange:e=>ie(t=>({...t,start:e.target.value}))}),(0,f.jsx)("span",{children:"~"}),(0,f.jsx)(k,{type:"date",value:se.end,onChange:e=>ie(t=>({...t,end:e.target.value}))})]})]})}),(0,f.jsxs)(G,{children:[(0,f.jsx)($,{children:"Restaurant Sales Ranking"}),(0,f.jsxs)(z,{children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)(R,{style:{width:"60px"},children:"Rank"}),(0,f.jsx)(R,{children:"Restaurant Name"}),(0,f.jsx)(R,{style:{textAlign:"right"},children:"Orders"}),(0,f.jsx)(R,{style:{textAlign:"right"},children:"Revenue"}),(0,f.jsx)(R,{style:{width:"150px"},children:"Performance"})]})}),(0,f.jsxs)("tbody",{children:[Ne.restaurants.map((e,t)=>{var r;const n=(null===(r=Ne.restaurants[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,f.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,f.jsx)(T,{children:(0,f.jsx)(Q,{rank:t+1,children:t+1})}),(0,f.jsx)(T,{style:{fontWeight:600},children:e.name}),(0,f.jsx)(T,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,f.jsx)(T,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:Ve(e.revenue)}),(0,f.jsx)(T,{children:(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,f.jsx)(P,{percentage:s}),(0,f.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===Ne.restaurants.length&&(0,f.jsx)("tr",{children:(0,f.jsx)(T,{colSpan:5,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}}}]);