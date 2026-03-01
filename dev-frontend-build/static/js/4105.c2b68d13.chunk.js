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
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,s.jsx)(i,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:i}=e;return(0,s.jsx)(o,{active:t,onClick:r,className:i,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,s.jsx)(a,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),s=r(4492);function i(e){const[t,r]=(0,s.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,a]=(0,n.useState)(i());return[o,(0,n.useCallback)(e=>{a(e),r({tab:e})},[r])]}},4105:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ee});var n=r(9950),s=r(4752),i=r(6649),o=r(2597),a=r(2653),l=r(1367),d=r(1095),c=r(2847),h=r(3245),x=r(158),u=r(3440),p=r(2174),g=r(4915),j=r(7621),m=r(5297),v=r(2528),f=r(294),y=r(3588),b=r(4414);const F=s.Ay.div`
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
`,M=i.MD,$=s.Ay.div`
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
`,N=s.Ay.td`
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
`,Z=s.Ay.div`
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
`,X=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],ee=()=>{var e,t;const{user:r}=(0,l.As)(),[s,ee]=(0,a.M)("ranking"),[te,re]=(0,n.useState)("week"),[ne,se]=(0,n.useState)(()=>{const e=new Date,t=new Date(e);return t.setDate(t.getDate()-6),{start:Oe(t),end:Oe(e)}}),[ie,oe]=(0,n.useState)(!1),[ae,le]=(0,n.useState)([]),[de,ce]=(0,n.useState)("all"),[he,xe]=(0,n.useState)(""),[ue,pe]=(0,n.useState)(!1),[ge,je]=(0,n.useState)([]),[me,ve]=(0,n.useState)([]),[fe,ye]=(0,n.useState)(!0),[be,Fe]=(0,n.useState)([]),[we,ke]=(0,n.useState)([]),[Ae,Se]=(0,n.useState)([]),[Ce,Be]=(0,n.useState)(new Set),[Ee,De]=(0,n.useState)(new Set);function Oe(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[Me]=(0,n.useState)(()=>searchParams.get("restaurantId")),[$e]=(0,n.useState)(()=>searchParams.get("restaurantName"));(0,n.useEffect)(()=>{const e={tab:s};"all"!==de&&(e.restaurantId=de),setSearchParams(e,{replace:!0})},[s,setSearchParams,de]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();if(e.success){const t=e.data.map(e=>{var t;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name,status:e.status}});if(le(t),je(t.slice(0,10)),Me){const e=t.find(e=>e.id===Me);e&&(ce(e.id),xe(e.name))}else if($e){const e=decodeURIComponent($e),r=t.find(t=>t.name===e);r&&(ce(r.id),xe(r.name))}}}}catch(e){console.error("Error fetching restaurants:",e)}})()},[r,Me,$e]),(0,n.useEffect)(()=>{(async()=>{if(0!==ae.length){ye(!0);try{const r=localStorage.getItem("auth_token"),n=ae.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==de&&(s+=`&restaurant_id=${de}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();let t=e.data||e||[];t=t.filter(e=>{var t;return n.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),ve(t)}const o=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${r}`}});if(o.ok){var e,t;const r=await o.json();null!==(e=r.data)&&void 0!==e&&e.items&&ke(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&Se(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{ye(!1)}}else ye(!1)})()},[de,ae]);const Ie=()=>{ce("all"),xe(""),pe(!1)},_e=(0,n.useMemo)(()=>{if(!me||0===me.length)return[];const e=new Date(ne.start);e.setHours(0,0,0,0);const t=new Date(ne.end);return t.setHours(23,59,59,999),me.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=t,o="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return i&&o})},[me,ne.start,ne.end]),ze=(0,n.useMemo)(()=>{if(0===_e.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===te){const r={};return _e.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;r[i]=(r[i]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===te){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const t=new Date(n);t.setDate(t.getDate()-e),s.push(t)}const i={};return _e.forEach(r=>{const n=Oe(e(r));i[n]=(i[n]||0)+t(r)}),s.map(e=>{const t=Oe(e);return{date:r[e.getDay()],sales:Math.round(i[t]||0)}})}if("month"===te){const r={};return _e.forEach(n=>{const s=e(n).getDate().toString();r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return _e.forEach(s=>{const i=r[e(s).getMonth()];n[i]=(n[i]||0)+t(s)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[_e,te]),Re=(0,n.useMemo)(()=>{if(0===_e.length)return[{name:"No Data",value:100,sales:0}];const e={};Ae.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};we.forEach(r=>{if(r.id){const n=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=n}});const r={};let n=0;_e.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,o;const a=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=a;const l=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(o=e.product_id)||void 0===o?void 0:o.toString()),d=l&&t[l]||"Other";r[d]=(r[d]||0)+a})});const s=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[_e,we,Ae]),Te=(0,n.useMemo)(()=>{var e;if(0===_e.length)return[];const t={};Ae.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};we.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};_e.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,s,i;const o=e.menu_name||e.name||"Unknown",a=(null===(t=e.menuItem)||void 0===t||null===(s=t.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),l=a?r[a]||"Other":e.category||"Other";n[o]||(n[o]={category:l,price:parseFloat(e.price||0),orders:0,revenue:0});const d=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[o].orders+=d,n[o].revenue+=c*d})});const s=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[_e,we,Ae]),Pe=(0,n.useMemo)(()=>{if(0===_e.length)return[];const e={};return _e.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[_e]),Le=(0,n.useMemo)(()=>{if(0===_e.length)return{};const e={};return _e.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),s=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,i=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const o=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=o,e[n].orders+=1,e[n].months[s].revenue+=o,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=o,e[n].months[s].days[i].orders+=1}),e},[_e]),We=(0,n.useMemo)(()=>{if(0===_e.length)return[];const e={};return _e.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(_e.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[_e]),Ne=(0,n.useMemo)(()=>{if(0===me.length)return{restaurants:[]};const e=new Date(ne.start);e.setHours(0,0,0,0);const t=new Date(ne.end);t.setHours(23,59,59,999);const r=me.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n);return s>=e&&s<=t&&"completed"===r.status}),n={};r.forEach(e=>{var t;const r=null===(t=e.restaurant_id)||void 0===t?void 0:t.toString();if(!r)return;const s=ae.find(e=>e.id===r),i=(null===s||void 0===s?void 0:s.name)||e.restaurant_name||"Unknown";n[r]||(n[r]={name:i,orders:0,revenue:0}),n[r].orders+=1,n[r].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(e)});return{restaurants:Object.entries(n).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue)}},[me,ae,ne]),He=()=>{const e=new Date(ne.start),t=new Date(ne.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=He();if(e<=31){const e=new Set(Object.keys(Le)),t=new Set;Object.keys(Le).forEach(e=>{Object.keys(Le[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),Be(e),De(t)}else e<=365?(Be(new Set(Object.keys(Le))),De(new Set)):(Be(new Set),De(new Set))},[ne.start,ne.end,Le]);const Ue=e=>{re(e),oe(!1);const t=new Date;let r=new Date(t);switch(e){case"today":r=new Date(t);break;case"week":r.setDate(r.getDate()-6);break;case"month":r.setDate(r.getDate()-29);break;case"year":r.setFullYear(r.getFullYear()-1),r.setDate(r.getDate()+1);break;case"all":r=new Date(t.getFullYear()-5,0,1)}se({start:Oe(r),end:Oe(t)})},Ye=()=>{const e=ze.reduce((e,t)=>e+t.sales,0),t=`Owner Reports\nGenerated: ${(new Date).toISOString()}\nPeriod: ${ne.start} to ${ne.end}\nRestaurant Filter: ${"all"===de?"All Restaurants":he}\n\nTotal Revenue: RM ${e.toFixed(2)}\nTotal Orders: ${_e.length}\n`,r=new Blob([t],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=`owner_report_${ne.start}_to_${ne.end}.csv`,n.click()},Ke=e=>`RM ${e.toFixed(2)}`,Ve=()=>(0,b.jsxs)(C,{children:[(0,b.jsxs)(U,{children:[(0,b.jsx)(Y,{type:"text",placeholder:"All Restaurants",value:he,onChange:e=>(e=>{if(xe(e),pe(!0),e.length<1)return void je(ae.slice(0,10));const t=ae.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);je(t)})(e.target.value),onFocus:()=>{pe(!0),je(ae.slice(0,10))},onBlur:()=>setTimeout(()=>pe(!1),200)}),"all"!==de&&he&&(0,b.jsx)(G,{onClick:Ie,children:"\xd7"}),(0,b.jsxs)(K,{show:ue,children:[(0,b.jsxs)(V,{onClick:()=>{ce("all"),xe(""),pe(!1)},children:[(0,b.jsx)(J,{children:"All Restaurants"}),(0,b.jsx)(q,{children:"Show all restaurant data"})]}),ge.map(e=>(0,b.jsxs)(V,{onClick:()=>(e=>{ce(e.id),xe(e.name),pe(!1)})(e),children:[(0,b.jsx)(J,{children:e.name}),(0,b.jsx)(q,{children:e.status||"active"})]},e.id))]})]}),(0,b.jsxs)(B,{children:[(0,b.jsx)(E,{active:"today"===te&&!ie,onClick:()=>Ue("today"),children:"Today"}),(0,b.jsx)(E,{active:"week"===te&&!ie,onClick:()=>Ue("week"),children:"Week"}),(0,b.jsx)(E,{active:"month"===te&&!ie,onClick:()=>Ue("month"),children:"Month"}),(0,b.jsx)(E,{active:"year"===te&&!ie,onClick:()=>Ue("year"),children:"Year"}),(0,b.jsx)(E,{active:"all"===te&&!ie,onClick:()=>Ue("all"),children:"All"}),(0,b.jsxs)(S,{children:[(0,b.jsx)(A,{type:"date",value:ne.start,onChange:e=>{se({...ne,start:e.target.value}),oe(!0)}}),(0,b.jsx)("span",{children:"to"}),(0,b.jsx)(A,{type:"date",value:ne.end,onChange:e=>{se({...ne,end:e.target.value}),oe(!0)}})]})]}),(0,b.jsxs)(D,{onClick:Ye,children:[(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,b.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)(F,{children:[(0,b.jsx)(w,{children:(0,b.jsx)(k,{children:"Reports"})}),(0,b.jsxs)(O,{children:[(0,b.jsxs)(TabContainer,{children:[(0,b.jsx)(o.oz,{active:"ranking"===s,onClick:()=>setActiveTab("ranking"),children:"Sales Ranking"}),(0,b.jsx)(o.oz,{active:"sales"===s,onClick:()=>setActiveTab("sales"),children:"Sales Report"}),(0,b.jsx)(o.oz,{active:"details"===s,onClick:()=>setActiveTab("details"),children:"Sales Details"}),(0,b.jsx)(o.oz,{active:"menu"===s,onClick:()=>setActiveTab("menu"),children:"Menu Analysis"}),(0,b.jsx)(o.oz,{active:"customers"===s,onClick:()=>setActiveTab("customers"),children:"Customer Insights"}),(0,b.jsx)(o.oz,{active:"operations"===s,onClick:()=>setActiveTab("operations"),children:"Operations"})]}),(0,b.jsxs)("div",{style:{display:"sales"===s?"block":"none"},children:[(0,b.jsx)(Ve,{}),fe?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===_e.length?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,b.jsxs)("div",{children:[(0,b.jsxs)(M,{children:[(0,b.jsxs)(i.hI,{color:"#059669",children:[(0,b.jsx)(i.v0,{children:"Total Revenue"}),(0,b.jsx)(i.Os,{children:Ke(ze.reduce((e,t)=>e+t.sales,0))}),(0,b.jsxs)(i.d1,{children:[_e.length," orders in selected period"]})]}),(0,b.jsxs)(i.hI,{color:"#2563EB",children:[(0,b.jsx)(i.v0,{children:"Total Orders"}),(0,b.jsx)(i.Os,{children:_e.length.toLocaleString()}),(0,b.jsx)(i.d1,{children:"For selected period"})]}),(0,b.jsxs)(i.hI,{color:"#DC2626",children:[(0,b.jsx)(i.v0,{children:"Average Order Value"}),(0,b.jsx)(i.Os,{children:Ke(_e.length>0?ze.reduce((e,t)=>e+t.sales,0)/_e.length:0)}),(0,b.jsx)(i.d1,{children:"Per order"})]}),(0,b.jsxs)(i.hI,{color:"#7C3AED",children:[(0,b.jsx)(i.v0,{children:"Completed Orders"}),(0,b.jsx)(i.Os,{children:_e.filter(e=>"completed"===e.status).length}),(0,b.jsxs)(i.d1,{children:[Math.round(_e.filter(e=>"completed"===e.status).length/_e.length*100||0),"% completion rate"]})]})]}),(0,b.jsxs)($,{children:[(0,b.jsxs)(I,{children:[(0,b.jsx)(_,{children:"Revenue Trend"}),(0,b.jsx)(d.u,{width:"100%",height:300,children:(0,b.jsxs)(c.b,{data:ze,margin:{top:5,right:20,left:0,bottom:5},children:[(0,b.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,b.jsx)(x.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,b.jsx)(u.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,b.jsx)(p.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,b.jsx)(g.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,b.jsxs)(I,{children:[(0,b.jsx)(_,{children:"Sales by Category"}),(0,b.jsx)(d.u,{width:"100%",height:300,children:(0,b.jsxs)(j.r,{children:[(0,b.jsx)(m.F,{data:Re,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Re.map((e,t)=>(0,b.jsx)(v.f,{fill:X[t%X.length]},`cell-${t}`))}),(0,b.jsx)(p.m,{formatter:e=>`${e}%`})]})})]})]}),(0,b.jsxs)(I,{children:[(0,b.jsx)(_,{children:"Hourly Orders Distribution"}),(0,b.jsx)(d.u,{width:"100%",height:250,children:(0,b.jsxs)(f.E,{data:Pe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,b.jsx)(h.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,b.jsx)(x.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,b.jsx)(u.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,b.jsx)(p.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,b.jsx)(y.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,b.jsxs)("div",{style:{display:"details"===s?"block":"none"},children:[(0,b.jsx)(Ve,{}),fe?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===_e.length?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,b.jsxs)("div",{children:[(0,b.jsxs)(M,{children:[(0,b.jsxs)(i.hI,{color:"#059669",children:[(0,b.jsx)(i.v0,{children:"Total Revenue"}),(0,b.jsx)(i.Os,{children:Ke(ze.reduce((e,t)=>e+t.sales,0))}),(0,b.jsxs)(i.d1,{children:[_e.length," orders in selected period"]})]}),(0,b.jsxs)(i.hI,{color:"#2563EB",children:[(0,b.jsx)(i.v0,{children:"Total Orders"}),(0,b.jsx)(i.Os,{children:_e.length.toLocaleString()}),(0,b.jsxs)(i.d1,{children:[_e.filter(e=>"completed"===e.status).length," completed"]})]}),(0,b.jsxs)(i.hI,{color:"#DC2626",children:[(0,b.jsx)(i.v0,{children:"Average Order Value"}),(0,b.jsx)(i.Os,{children:Ke(_e.length>0?ze.reduce((e,t)=>e+t.sales,0)/_e.length:0)}),(0,b.jsx)(i.d1,{children:"Per order average"})]}),(0,b.jsxs)(i.hI,{color:"#7C3AED",children:[(0,b.jsx)(i.v0,{children:"Period"}),(0,b.jsx)(i.Os,{children:He()}),(0,b.jsx)(i.d1,{children:"Days"})]})]}),(0,b.jsxs)(z,{children:[(0,b.jsx)(_,{children:"Detailed Sales Breakdown"}),(0,b.jsxs)(R,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(T,{style:{width:"40%"},children:"Period"}),(0,b.jsx)(T,{style:{textAlign:"right"},children:"Revenue"}),(0,b.jsx)(T,{style:{textAlign:"right"},children:"Orders"}),(0,b.jsx)(T,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,b.jsx)("tbody",{children:Object.keys(Le).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=Le[e],r=Ce.has(e);return(0,b.jsxs)(n.Fragment,{children:[(0,b.jsxs)(W,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(Ce);if(t.has(e)){var r;t.delete(e);const n=new Set(Ee);Object.keys((null===(r=Le[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),De(n)}else t.add(e);Be(t)})(e),children:[(0,b.jsxs)(N,{level:0,bold:!0,children:[(0,b.jsx)(H,{expanded:r,children:"\u25b6"}),e]}),(0,b.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:Ke(t.revenue)}),(0,b.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,b.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:Ke(t.revenue/t.orders)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],i=`${e}-${r}`,o=Ee.has(i),a=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,b.jsxs)(n.Fragment,{children:[(0,b.jsxs)(W,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(Ee);t.has(e)?t.delete(e):t.add(e),De(t)})(i),children:[(0,b.jsxs)(N,{level:1,bold:!0,children:[(0,b.jsx)(H,{expanded:o,children:"\u25b6"}),a]}),(0,b.jsx)(N,{level:1,style:{textAlign:"right"},children:Ke(s.revenue)}),(0,b.jsx)(N,{level:1,style:{textAlign:"right"},children:s.orders}),(0,b.jsx)(N,{level:1,style:{textAlign:"right"},children:Ke(s.revenue/s.orders)})]}),o&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,b.jsxs)(W,{level:2,children:[(0,b.jsx)(N,{level:2,children:r}),(0,b.jsx)(N,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:Ke(t.revenue)}),(0,b.jsx)(N,{level:2,style:{textAlign:"right"},children:t.orders}),(0,b.jsx)(N,{level:2,style:{textAlign:"right"},children:Ke(t.revenue/t.orders)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,b.jsxs)("div",{style:{display:"menu"===s?"block":"none"},children:[(0,b.jsx)(Ve,{}),(0,b.jsxs)(M,{children:[(0,b.jsxs)(i.hI,{color:"#F59E0B",children:[(0,b.jsx)(i.v0,{children:"Best Seller"}),(0,b.jsx)(i.Os,{children:(null===(e=Te[0])||void 0===e?void 0:e.name)||"N/A"}),(0,b.jsxs)(i.d1,{children:[(null===(t=Te[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,b.jsxs)(i.hI,{color:"#10B981",children:[(0,b.jsx)(i.v0,{children:"Total Items Analyzed"}),(0,b.jsx)(i.Os,{children:Te.length}),(0,b.jsx)(i.d1,{children:"Complete menu analysis"})]}),(0,b.jsxs)(i.hI,{color:"#3B82F6",children:[(0,b.jsx)(i.v0,{children:"Total Orders"}),(0,b.jsx)(i.Os,{children:Te.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,b.jsx)(i.d1,{children:"For selected period"})]}),(0,b.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,b.jsx)(i.v0,{children:"Total Revenue"}),(0,b.jsx)(i.Os,{children:Ke(Te.reduce((e,t)=>e+t.revenue,0))}),(0,b.jsx)(i.d1,{children:"For selected period"})]})]}),(0,b.jsxs)(z,{children:[(0,b.jsx)(_,{children:"Complete Menu Performance Ranking"}),(0,b.jsxs)(R,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(T,{children:"Rank"}),(0,b.jsx)(T,{children:"Menu Item"}),(0,b.jsx)(T,{children:"Category"}),(0,b.jsx)(T,{children:"Price"}),(0,b.jsx)(T,{children:"Orders"}),(0,b.jsx)(T,{children:"Revenue"}),(0,b.jsx)(T,{children:"Performance"})]})}),(0,b.jsx)("tbody",{children:Te.map((e,t)=>{var r;const n=(null===(r=Te[0])||void 0===r?void 0:r.orders)||1;return(0,b.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,b.jsxs)(P,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1]}),(0,b.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,b.jsx)(P,{children:(0,b.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,b.jsx)(P,{children:Ke(e.price)}),(0,b.jsx)(P,{children:e.orders.toLocaleString()}),(0,b.jsx)(P,{children:Ke(e.revenue)}),(0,b.jsx)(P,{children:(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,b.jsx)(L,{percentage:e.orders/n*100}),(0,b.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,b.jsxs)("div",{style:{display:"customers"===s?"block":"none"},children:[(0,b.jsx)(Ve,{}),(0,b.jsxs)(M,{children:[(0,b.jsxs)(i.hI,{color:"#635BFF",children:[(0,b.jsx)(i.v0,{children:"Total Customers"}),(0,b.jsx)(i.Os,{children:be.length.toLocaleString()}),(0,b.jsx)(i.d1,{children:"Across all restaurants"})]}),(0,b.jsxs)(i.hI,{color:"#00D924",children:[(0,b.jsx)(i.v0,{children:"Repeat Customers"}),(0,b.jsx)(i.Os,{children:be.filter(e=>e.total_orders>1).length}),(0,b.jsxs)(i.d1,{children:[be.length>0?Math.round(be.filter(e=>e.total_orders>1).length/be.length*100):0,"% return rate"]})]}),(0,b.jsxs)(i.hI,{color:"#FFB800",children:[(0,b.jsx)(i.v0,{children:"Average Spent"}),(0,b.jsx)(i.Os,{children:Ke(be.length>0?be.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/be.length:0)}),(0,b.jsx)(i.d1,{children:"Per customer"})]}),(0,b.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,b.jsx)(i.v0,{children:"Total Points"}),(0,b.jsx)(i.Os,{children:be.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,b.jsx)(i.d1,{children:"Across all customers"})]})]}),(0,b.jsx)(z,{children:(0,b.jsx)(_,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,b.jsxs)("div",{style:{display:"operations"===s?"block":"none"},children:[(0,b.jsx)(Ve,{}),(0,b.jsxs)(M,{children:[(0,b.jsxs)(i.hI,{color:"#10B981",children:[(0,b.jsx)(i.v0,{children:"Order Fulfillment"}),(0,b.jsxs)(i.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,b.jsx)(i.d1,{children:"On-time completion"})]}),(0,b.jsxs)(i.hI,{color:"#F59E0B",children:[(0,b.jsx)(i.v0,{children:"Avg. Wait Time"}),(0,b.jsxs)(i.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,b.jsx)(i.d1,{children:"Estimated"})]}),(0,b.jsxs)(i.hI,{color:"#EF4444",children:[(0,b.jsx)(i.v0,{children:"Peak Hour"}),(0,b.jsx)(i.Os,{children:"12-1 PM"}),(0,b.jsx)(i.d1,{children:"Busiest time"})]}),(0,b.jsxs)(i.hI,{color:"#6366F1",children:[(0,b.jsx)(i.v0,{children:"Staff Efficiency"}),(0,b.jsxs)(i.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,b.jsx)(i.d1,{children:"Estimated"})]})]}),(0,b.jsxs)(z,{children:[(0,b.jsx)(_,{children:"Peak Hours Performance"}),(0,b.jsxs)(R,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(T,{children:"Time Slot"}),(0,b.jsx)(T,{children:"Orders"}),(0,b.jsx)(T,{children:"Revenue"}),(0,b.jsx)(T,{children:"Efficiency"})]})}),(0,b.jsx)("tbody",{children:We.map((e,t)=>(0,b.jsxs)("tr",{children:[(0,b.jsx)(P,{style:{fontWeight:600},children:e.time}),(0,b.jsx)(P,{children:e.orders}),(0,b.jsx)(P,{children:Ke(e.revenue)}),(0,b.jsx)(P,{children:(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,b.jsx)(L,{percentage:e.efficiency}),(0,b.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,b.jsxs)("div",{style:{display:"ranking"===s?"block":"none"},children:[(0,b.jsx)(C,{children:(0,b.jsxs)(B,{children:[(0,b.jsx)(E,{active:"today"===te,onClick:()=>Ue("today"),children:"Today"}),(0,b.jsx)(E,{active:"week"===te,onClick:()=>Ue("week"),children:"This Week"}),(0,b.jsx)(E,{active:"month"===te,onClick:()=>Ue("month"),children:"This Month"}),(0,b.jsx)(E,{active:"year"===te,onClick:()=>Ue("year"),children:"This Year"}),(0,b.jsx)(E,{active:"all"===te,onClick:()=>Ue("all"),children:"All Time"}),ie&&(0,b.jsxs)(S,{children:[(0,b.jsx)(A,{type:"date",value:ne.start,onChange:e=>se(t=>({...t,start:e.target.value}))}),(0,b.jsx)("span",{children:"~"}),(0,b.jsx)(A,{type:"date",value:ne.end,onChange:e=>se(t=>({...t,end:e.target.value}))})]})]})}),(0,b.jsxs)(Z,{children:[(0,b.jsx)(_,{children:"Restaurant Sales Ranking"}),(0,b.jsxs)(R,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(T,{style:{width:"60px"},children:"Rank"}),(0,b.jsx)(T,{children:"Restaurant Name"}),(0,b.jsx)(T,{style:{textAlign:"right"},children:"Orders"}),(0,b.jsx)(T,{style:{textAlign:"right"},children:"Revenue"}),(0,b.jsx)(T,{style:{width:"150px"},children:"Performance"})]})}),(0,b.jsxs)("tbody",{children:[Ne.restaurants.map((e,t)=>{var r;const n=(null===(r=Ne.restaurants[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,b.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,b.jsx)(P,{children:(0,b.jsx)(Q,{rank:t+1,children:t+1})}),(0,b.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,b.jsx)(P,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,b.jsx)(P,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:Ke(e.revenue)}),(0,b.jsx)(P,{children:(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,b.jsx)(L,{percentage:s}),(0,b.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===Ne.restaurants.length&&(0,b.jsx)("tr",{children:(0,b.jsx)(P,{colSpan:5,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}}}]);