"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4105],{2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),s=r(4414);const i=n.Ay.div`
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
`,o=n.Ay.button`
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
`,a=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,s.jsx)(i,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:i}=e;return(0,s.jsx)(o,{active:t,onClick:r,className:i,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,s.jsx)(a,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),s=r(4492);function i(e){const[t,r]=(0,s.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,a]=(0,n.useState)(i());return[o,(0,n.useCallback)(e=>{a(e),r({tab:e})},[r])]}},4105:(e,t,r)=>{r.r(t),r.d(t,{default:()=>te});var n=r(9950),s=r(4752),i=r(4492),o=r(8409),a=r(2597),l=r(2653),d=r(1367),c=r(1095),h=r(2847),x=r(3245),u=r(158),p=r(3440),g=r(2174),j=r(4915),m=r(7621),v=r(5297),f=r(2528),y=r(294),b=r(3588),F=r(4414);const k=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,w=s.Ay.div`
  position: sticky;
  top: 0;
  z-index: 100;
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
`,E=s.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
  }
`,D=s.Ay.button`
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
`,M=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,$=o.MD,I=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,_=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,z=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,R=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,T=s.Ay.table`
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
`,L=s.Ay.td`
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
`,Z=s.Ay.button`
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
`,ee=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],te=()=>{var e,t;const{user:r}=(0,d.As)(),[s,te]=(0,i.ok)(),[re,ne]=(0,l.M)("ranking"),[se,ie]=(0,n.useState)("week"),[oe,ae]=(0,n.useState)(()=>{const e=new Date,t=new Date(e);return t.setDate(t.getDate()-6),{start:$e(t),end:$e(e)}}),[le,de]=(0,n.useState)(!1),[ce,he]=(0,n.useState)([]),[xe,ue]=(0,n.useState)("all"),[pe,ge]=(0,n.useState)(""),[je,me]=(0,n.useState)(!1),[ve,fe]=(0,n.useState)([]),[ye,be]=(0,n.useState)([]),[Fe,ke]=(0,n.useState)(!0),[we]=(0,n.useState)([]),[Ae,Se]=(0,n.useState)([]),[Ce,Be]=(0,n.useState)([]),[Ee,De]=(0,n.useState)(new Set),[Oe,Me]=(0,n.useState)(new Set);function $e(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[Ie]=(0,n.useState)(()=>s.get("restaurantId")),[_e]=(0,n.useState)(()=>s.get("restaurantName"));(0,n.useEffect)(()=>{te(e=>("all"!==xe?e.set("restaurantId",xe):e.delete("restaurantId"),e),{replace:!0})},[te,xe]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();if(e.success){const t=e.data.map(e=>{var t;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name,status:e.status}});if(he(t),fe(t.slice(0,10)),Ie){const e=t.find(e=>e.id===Ie);e&&(ue(e.id),ge(e.name))}else if(_e){const e=decodeURIComponent(_e),r=t.find(t=>t.name===e);r&&(ue(r.id),ge(r.name))}}}}catch(e){console.error("Error fetching restaurants:",e)}})()},[r,Ie,_e]),(0,n.useEffect)(()=>{(async()=>{if(0!==ce.length){ke(!0);try{const r=localStorage.getItem("auth_token"),n=ce.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==xe&&(s+=`&restaurant_id=${xe}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();let t=e.data||e||[];t=t.filter(e=>{var t;return n.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),be(t)}const o=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${r}`}});if(o.ok){var e,t;const r=await o.json();null!==(e=r.data)&&void 0!==e&&e.items&&Se(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&Be(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{ke(!1)}}else ke(!1)})()},[xe,ce]);const ze=()=>{ue("all"),ge(""),me(!1)},Re=(0,n.useMemo)(()=>{if(!ye||0===ye.length)return[];const e=new Date(oe.start);e.setHours(0,0,0,0);const t=new Date(oe.end);return t.setHours(23,59,59,999),ye.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=t,o="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return i&&o})},[ye,oe.start,oe.end]),Te=(0,n.useMemo)(()=>{if(0===Re.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===se){const r={};return Re.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;r[i]=(r[i]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===se){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const t=new Date(n);t.setDate(t.getDate()-e),s.push(t)}const i={};return Re.forEach(r=>{const n=$e(e(r));i[n]=(i[n]||0)+t(r)}),s.map(e=>{const t=$e(e);return{date:r[e.getDay()],sales:Math.round(i[t]||0)}})}if("month"===se){const r={};return Re.forEach(n=>{const s=e(n).getDate().toString();r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Re.forEach(s=>{const i=r[e(s).getMonth()];n[i]=(n[i]||0)+t(s)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Re,se]),Pe=(0,n.useMemo)(()=>{if(0===Re.length)return[{name:"No Data",value:100,sales:0}];const e={};Ce.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};Ae.forEach(r=>{if(r.id){const n=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=n}});const r={};let n=0;Re.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,o;const a=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=a;const l=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(o=e.product_id)||void 0===o?void 0:o.toString()),d=l&&t[l]||"Other";r[d]=(r[d]||0)+a})});const s=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[Re,Ae,Ce]),Le=(0,n.useMemo)(()=>{var e;if(0===Re.length)return[];const t={};Ce.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};Ae.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};Re.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,s,i;const o=e.menu_name||e.name||"Unknown",a=(null===(t=e.menuItem)||void 0===t||null===(s=t.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),l=a?r[a]||"Other":e.category||"Other";n[o]||(n[o]={category:l,price:parseFloat(e.price||0),orders:0,revenue:0});const d=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[o].orders+=d,n[o].revenue+=c*d})});const s=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[Re,Ae,Ce]),We=(0,n.useMemo)(()=>{if(0===Re.length)return[];const e={};return Re.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[Re]),Ne=(0,n.useMemo)(()=>{if(0===Re.length)return{};const e={};return Re.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),s=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,i=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const o=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=o,e[n].orders+=1,e[n].months[s].revenue+=o,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=o,e[n].months[s].days[i].orders+=1}),e},[Re]),He=(0,n.useMemo)(()=>{if(0===Re.length)return[];const e={};return Re.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(Re.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[Re]),Ue=(0,n.useMemo)(()=>{if(0===ye.length)return{restaurants:[]};const e=new Date(oe.start);e.setHours(0,0,0,0);const t=new Date(oe.end);t.setHours(23,59,59,999);const r=ye.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n);return s>=e&&s<=t&&"completed"===r.status}),n={};r.forEach(e=>{var t;const r=null===(t=e.restaurant_id)||void 0===t?void 0:t.toString();if(!r)return;const s=ce.find(e=>e.id===r),i=(null===s||void 0===s?void 0:s.name)||e.restaurant_name||"Unknown";n[r]||(n[r]={name:i,orders:0,revenue:0}),n[r].orders+=1,n[r].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(e)});return{restaurants:Object.entries(n).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue)}},[ye,ce,oe]),Ye=()=>{const e=new Date(oe.start),t=new Date(oe.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=Ye();if(e<=31){const e=new Set(Object.keys(Ne)),t=new Set;Object.keys(Ne).forEach(e=>{Object.keys(Ne[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),De(e),Me(t)}else e<=365?(De(new Set(Object.keys(Ne))),Me(new Set)):(De(new Set),Me(new Set))},[oe.start,oe.end,Ne]);const Ke=e=>{ie(e),de(!1);const t=new Date;let r=new Date(t);switch(e){case"today":r=new Date(t);break;case"week":r.setDate(r.getDate()-6);break;case"month":r.setDate(r.getDate()-29);break;case"year":r.setFullYear(r.getFullYear()-1),r.setDate(r.getDate()+1);break;case"all":r=new Date(t.getFullYear()-5,0,1)}ae({start:$e(r),end:$e(t)})},Ve=()=>{const e=Te.reduce((e,t)=>e+t.sales,0),t=`Owner Reports\nGenerated: ${(new Date).toISOString()}\nPeriod: ${oe.start} to ${oe.end}\nRestaurant Filter: ${"all"===xe?"All Restaurants":pe}\n\nTotal Revenue: RM ${e.toFixed(2)}\nTotal Orders: ${Re.length}\n`,r=new Blob([t],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=`owner_report_${oe.start}_to_${oe.end}.csv`,n.click()},Je=e=>`RM ${e.toFixed(2)}`,qe=()=>(0,F.jsxs)(B,{children:[(0,F.jsxs)(Y,{children:[(0,F.jsx)(K,{type:"text",placeholder:"All Restaurants",value:pe,onChange:e=>(e=>{if(ge(e),me(!0),e.length<1)return void fe(ce.slice(0,10));const t=ce.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);fe(t)})(e.target.value),onFocus:()=>{me(!0),fe(ce.slice(0,10))},onBlur:()=>setTimeout(()=>me(!1),200)}),"all"!==xe&&pe&&(0,F.jsx)(Z,{onClick:ze,children:"\xd7"}),(0,F.jsxs)(V,{show:je,children:[(0,F.jsxs)(J,{onClick:()=>{ue("all"),ge(""),me(!1)},children:[(0,F.jsx)(q,{children:"All Restaurants"}),(0,F.jsx)(G,{children:"Show all restaurant data"})]}),ve.map(e=>(0,F.jsxs)(J,{onClick:()=>(e=>{ue(e.id),ge(e.name),me(!1)})(e),children:[(0,F.jsx)(q,{children:e.name}),(0,F.jsx)(G,{children:e.status||"active"})]},e.id))]})]}),(0,F.jsxs)(E,{children:[(0,F.jsx)(D,{active:"today"===se&&!le,onClick:()=>Ke("today"),children:"Today"}),(0,F.jsx)(D,{active:"week"===se&&!le,onClick:()=>Ke("week"),children:"Week"}),(0,F.jsx)(D,{active:"month"===se&&!le,onClick:()=>Ke("month"),children:"Month"}),(0,F.jsx)(D,{active:"year"===se&&!le,onClick:()=>Ke("year"),children:"Year"}),(0,F.jsx)(D,{active:"all"===se&&!le,onClick:()=>Ke("all"),children:"All"}),(0,F.jsxs)(C,{children:[(0,F.jsx)(S,{type:"date",value:oe.start,onChange:e=>{ae({...oe,start:e.target.value}),de(!0)}}),(0,F.jsx)("span",{children:"to"}),(0,F.jsx)(S,{type:"date",value:oe.end,onChange:e=>{ae({...oe,end:e.target.value}),de(!0)}})]})]}),(0,F.jsxs)(O,{onClick:Ve,children:[(0,F.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,F.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,F.jsx)(F.Fragment,{children:(0,F.jsxs)(k,{children:[(0,F.jsx)(w,{children:(0,F.jsx)(A,{children:"Reports"})}),(0,F.jsxs)(M,{children:[(0,F.jsxs)(a.tU,{children:[(0,F.jsx)(a.oz,{active:"ranking"===re,onClick:()=>ne("ranking"),children:"Sales Ranking"}),(0,F.jsx)(a.oz,{active:"sales"===re,onClick:()=>ne("sales"),children:"Sales Report"}),(0,F.jsx)(a.oz,{active:"details"===re,onClick:()=>ne("details"),children:"Sales Details"}),(0,F.jsx)(a.oz,{active:"menu"===re,onClick:()=>ne("menu"),children:"Menu Analysis"}),(0,F.jsx)(a.oz,{active:"customers"===re,onClick:()=>ne("customers"),children:"Customer Insights"}),(0,F.jsx)(a.oz,{active:"operations"===re,onClick:()=>ne("operations"),children:"Operations"})]}),(0,F.jsxs)("div",{style:{display:"sales"===re?"block":"none"},children:[(0,F.jsx)(qe,{}),Fe?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Re.length?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,F.jsxs)("div",{children:[(0,F.jsxs)($,{children:[(0,F.jsxs)(o.hI,{color:"#059669",children:[(0,F.jsx)(o.v0,{children:"Total Revenue"}),(0,F.jsx)(o.Os,{children:Je(Te.reduce((e,t)=>e+t.sales,0))}),(0,F.jsxs)(o.d1,{children:[Re.length," orders in selected period"]})]}),(0,F.jsxs)(o.hI,{color:"#2563EB",children:[(0,F.jsx)(o.v0,{children:"Total Orders"}),(0,F.jsx)(o.Os,{children:Re.length.toLocaleString()}),(0,F.jsx)(o.d1,{children:"For selected period"})]}),(0,F.jsxs)(o.hI,{color:"#DC2626",children:[(0,F.jsx)(o.v0,{children:"Average Order Value"}),(0,F.jsx)(o.Os,{children:Je(Re.length>0?Te.reduce((e,t)=>e+t.sales,0)/Re.length:0)}),(0,F.jsx)(o.d1,{children:"Per order"})]}),(0,F.jsxs)(o.hI,{color:"#7C3AED",children:[(0,F.jsx)(o.v0,{children:"Completed Orders"}),(0,F.jsx)(o.Os,{children:Re.filter(e=>"completed"===e.status).length}),(0,F.jsxs)(o.d1,{children:[Math.round(Re.filter(e=>"completed"===e.status).length/Re.length*100||0),"% completion rate"]})]})]}),(0,F.jsxs)(I,{children:[(0,F.jsxs)(_,{children:[(0,F.jsx)(z,{children:"Revenue Trend"}),(0,F.jsx)(c.u,{width:"100%",height:300,children:(0,F.jsxs)(h.b,{data:Te,margin:{top:5,right:20,left:0,bottom:5},children:[(0,F.jsx)(x.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,F.jsx)(u.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,F.jsx)(p.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,F.jsx)(g.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,F.jsx)(j.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,F.jsxs)(_,{children:[(0,F.jsx)(z,{children:"Sales by Category"}),(0,F.jsx)(c.u,{width:"100%",height:300,children:(0,F.jsxs)(m.r,{children:[(0,F.jsx)(v.F,{data:Pe,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Pe.map((e,t)=>(0,F.jsx)(f.f,{fill:ee[t%ee.length]},`cell-${t}`))}),(0,F.jsx)(g.m,{formatter:e=>`${e}%`})]})})]})]}),(0,F.jsxs)(_,{children:[(0,F.jsx)(z,{children:"Hourly Orders Distribution"}),(0,F.jsx)(c.u,{width:"100%",height:250,children:(0,F.jsxs)(y.E,{data:We,margin:{top:5,right:20,left:0,bottom:5},children:[(0,F.jsx)(x.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,F.jsx)(u.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,F.jsx)(p.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,F.jsx)(g.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,F.jsx)(b.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,F.jsxs)("div",{style:{display:"details"===re?"block":"none"},children:[(0,F.jsx)(qe,{}),Fe?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Re.length?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,F.jsxs)("div",{children:[(0,F.jsxs)($,{children:[(0,F.jsxs)(o.hI,{color:"#059669",children:[(0,F.jsx)(o.v0,{children:"Total Revenue"}),(0,F.jsx)(o.Os,{children:Je(Te.reduce((e,t)=>e+t.sales,0))}),(0,F.jsxs)(o.d1,{children:[Re.length," orders in selected period"]})]}),(0,F.jsxs)(o.hI,{color:"#2563EB",children:[(0,F.jsx)(o.v0,{children:"Total Orders"}),(0,F.jsx)(o.Os,{children:Re.length.toLocaleString()}),(0,F.jsxs)(o.d1,{children:[Re.filter(e=>"completed"===e.status).length," completed"]})]}),(0,F.jsxs)(o.hI,{color:"#DC2626",children:[(0,F.jsx)(o.v0,{children:"Average Order Value"}),(0,F.jsx)(o.Os,{children:Je(Re.length>0?Te.reduce((e,t)=>e+t.sales,0)/Re.length:0)}),(0,F.jsx)(o.d1,{children:"Per order average"})]}),(0,F.jsxs)(o.hI,{color:"#7C3AED",children:[(0,F.jsx)(o.v0,{children:"Period"}),(0,F.jsx)(o.Os,{children:Ye()}),(0,F.jsx)(o.d1,{children:"Days"})]})]}),(0,F.jsxs)(R,{children:[(0,F.jsx)(z,{children:"Detailed Sales Breakdown"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(P,{style:{width:"40%"},children:"Period"}),(0,F.jsx)(P,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(P,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(P,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,F.jsx)("tbody",{children:Object.keys(Ne).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=Ne[e],r=Ee.has(e);return(0,F.jsxs)(n.Fragment,{children:[(0,F.jsxs)(N,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(Ee);if(t.has(e)){var r;t.delete(e);const n=new Set(Oe);Object.keys((null===(r=Ne[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),Me(n)}else t.add(e);De(t)})(e),children:[(0,F.jsxs)(H,{level:0,bold:!0,children:[(0,F.jsx)(U,{expanded:r,children:"\u25b6"}),e]}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:Je(t.revenue)}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:Je(t.revenue/t.orders)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],i=`${e}-${r}`,o=Oe.has(i),a=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,F.jsxs)(n.Fragment,{children:[(0,F.jsxs)(N,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(Oe);t.has(e)?t.delete(e):t.add(e),Me(t)})(i),children:[(0,F.jsxs)(H,{level:1,bold:!0,children:[(0,F.jsx)(U,{expanded:o,children:"\u25b6"}),a]}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:Je(s.revenue)}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:s.orders}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:Je(s.revenue/s.orders)})]}),o&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,F.jsxs)(N,{level:2,children:[(0,F.jsx)(H,{level:2,children:r}),(0,F.jsx)(H,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:Je(t.revenue)}),(0,F.jsx)(H,{level:2,style:{textAlign:"right"},children:t.orders}),(0,F.jsx)(H,{level:2,style:{textAlign:"right"},children:Je(t.revenue/t.orders)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,F.jsxs)("div",{style:{display:"menu"===re?"block":"none"},children:[(0,F.jsx)(qe,{}),(0,F.jsxs)($,{children:[(0,F.jsxs)(o.hI,{color:"#F59E0B",children:[(0,F.jsx)(o.v0,{children:"Best Seller"}),(0,F.jsx)(o.Os,{children:(null===(e=Le[0])||void 0===e?void 0:e.name)||"N/A"}),(0,F.jsxs)(o.d1,{children:[(null===(t=Le[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,F.jsxs)(o.hI,{color:"#10B981",children:[(0,F.jsx)(o.v0,{children:"Total Items Analyzed"}),(0,F.jsx)(o.Os,{children:Le.length}),(0,F.jsx)(o.d1,{children:"Complete menu analysis"})]}),(0,F.jsxs)(o.hI,{color:"#3B82F6",children:[(0,F.jsx)(o.v0,{children:"Total Orders"}),(0,F.jsx)(o.Os,{children:Le.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,F.jsx)(o.d1,{children:"For selected period"})]}),(0,F.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,F.jsx)(o.v0,{children:"Total Revenue"}),(0,F.jsx)(o.Os,{children:Je(Le.reduce((e,t)=>e+t.revenue,0))}),(0,F.jsx)(o.d1,{children:"For selected period"})]})]}),(0,F.jsxs)(R,{children:[(0,F.jsx)(z,{children:"Complete Menu Performance Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(P,{children:"Rank"}),(0,F.jsx)(P,{children:"Menu Item"}),(0,F.jsx)(P,{children:"Category"}),(0,F.jsx)(P,{children:"Price"}),(0,F.jsx)(P,{children:"Orders"}),(0,F.jsx)(P,{children:"Revenue"}),(0,F.jsx)(P,{children:"Performance"})]})}),(0,F.jsx)("tbody",{children:Le.map((e,t)=>{var r;const n=(null===(r=Le[0])||void 0===r?void 0:r.orders)||1;return(0,F.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsxs)(L,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1]}),(0,F.jsx)(L,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(L,{children:(0,F.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,F.jsx)(L,{children:Je(e.price)}),(0,F.jsx)(L,{children:e.orders.toLocaleString()}),(0,F.jsx)(L,{children:Je(e.revenue)}),(0,F.jsx)(L,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:e.orders/n*100}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,F.jsxs)("div",{style:{display:"customers"===re?"block":"none"},children:[(0,F.jsx)(qe,{}),(0,F.jsxs)($,{children:[(0,F.jsxs)(o.hI,{color:"#635BFF",children:[(0,F.jsx)(o.v0,{children:"Total Customers"}),(0,F.jsx)(o.Os,{children:we.length.toLocaleString()}),(0,F.jsx)(o.d1,{children:"Across all restaurants"})]}),(0,F.jsxs)(o.hI,{color:"#00D924",children:[(0,F.jsx)(o.v0,{children:"Repeat Customers"}),(0,F.jsx)(o.Os,{children:we.filter(e=>e.total_orders>1).length}),(0,F.jsxs)(o.d1,{children:[we.length>0?Math.round(we.filter(e=>e.total_orders>1).length/we.length*100):0,"% return rate"]})]}),(0,F.jsxs)(o.hI,{color:"#FFB800",children:[(0,F.jsx)(o.v0,{children:"Average Spent"}),(0,F.jsx)(o.Os,{children:Je(we.length>0?we.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/we.length:0)}),(0,F.jsx)(o.d1,{children:"Per customer"})]}),(0,F.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,F.jsx)(o.v0,{children:"Total Points"}),(0,F.jsx)(o.Os,{children:we.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,F.jsx)(o.d1,{children:"Across all customers"})]})]}),(0,F.jsx)(R,{children:(0,F.jsx)(z,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,F.jsxs)("div",{style:{display:"operations"===re?"block":"none"},children:[(0,F.jsx)(qe,{}),(0,F.jsxs)($,{children:[(0,F.jsxs)(o.hI,{color:"#10B981",children:[(0,F.jsx)(o.v0,{children:"Order Fulfillment"}),(0,F.jsxs)(o.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,F.jsx)(o.d1,{children:"On-time completion"})]}),(0,F.jsxs)(o.hI,{color:"#F59E0B",children:[(0,F.jsx)(o.v0,{children:"Avg. Wait Time"}),(0,F.jsxs)(o.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,F.jsx)(o.d1,{children:"Estimated"})]}),(0,F.jsxs)(o.hI,{color:"#EF4444",children:[(0,F.jsx)(o.v0,{children:"Peak Hour"}),(0,F.jsx)(o.Os,{children:"12-1 PM"}),(0,F.jsx)(o.d1,{children:"Busiest time"})]}),(0,F.jsxs)(o.hI,{color:"#6366F1",children:[(0,F.jsx)(o.v0,{children:"Staff Efficiency"}),(0,F.jsxs)(o.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,F.jsx)(o.d1,{children:"Estimated"})]})]}),(0,F.jsxs)(R,{children:[(0,F.jsx)(z,{children:"Peak Hours Performance"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(P,{children:"Time Slot"}),(0,F.jsx)(P,{children:"Orders"}),(0,F.jsx)(P,{children:"Revenue"}),(0,F.jsx)(P,{children:"Efficiency"})]})}),(0,F.jsx)("tbody",{children:He.map((e,t)=>(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{style:{fontWeight:600},children:e.time}),(0,F.jsx)(L,{children:e.orders}),(0,F.jsx)(L,{children:Je(e.revenue)}),(0,F.jsx)(L,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:e.efficiency}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,F.jsxs)("div",{style:{display:"ranking"===re?"block":"none"},children:[(0,F.jsx)(B,{children:(0,F.jsxs)(E,{children:[(0,F.jsx)(D,{active:"today"===se,onClick:()=>Ke("today"),children:"Today"}),(0,F.jsx)(D,{active:"week"===se,onClick:()=>Ke("week"),children:"This Week"}),(0,F.jsx)(D,{active:"month"===se,onClick:()=>Ke("month"),children:"This Month"}),(0,F.jsx)(D,{active:"year"===se,onClick:()=>Ke("year"),children:"This Year"}),(0,F.jsx)(D,{active:"all"===se,onClick:()=>Ke("all"),children:"All Time"}),le&&(0,F.jsxs)(C,{children:[(0,F.jsx)(S,{type:"date",value:oe.start,onChange:e=>ae(t=>({...t,start:e.target.value}))}),(0,F.jsx)("span",{children:"~"}),(0,F.jsx)(S,{type:"date",value:oe.end,onChange:e=>ae(t=>({...t,end:e.target.value}))})]})]})}),(0,F.jsxs)(Q,{children:[(0,F.jsx)(z,{children:"Restaurant Sales Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(P,{style:{width:"60px"},children:"Rank"}),(0,F.jsx)(P,{children:"Restaurant Name"}),(0,F.jsx)(P,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(P,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(P,{style:{width:"150px"},children:"Performance"})]})}),(0,F.jsxs)("tbody",{children:[Ue.restaurants.map((e,t)=>{var r;const n=(null===(r=Ue.restaurants[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,F.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsx)(L,{children:(0,F.jsx)(X,{rank:t+1,children:t+1})}),(0,F.jsx)(L,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(L,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,F.jsx)(L,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:Je(e.revenue)}),(0,F.jsx)(L,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:s}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===Ue.restaurants.length&&(0,F.jsx)("tr",{children:(0,F.jsx)(L,{colSpan:5,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}}}]);