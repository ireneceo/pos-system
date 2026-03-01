"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[677],{677:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ne});var n=r(9950),s=r(4752),i=r(4492),a=r(8409),o=r(2597),l=r(2653),d=r(1367),c=r(6038),h=r(4021),x=r(1095),u=r(2847),p=r(3245),g=r(158),j=r(3440),v=r(2174),m=r(4915),f=r(7621),y=r(5297),b=r(2528),F=r(294),k=r(3588),w=r(4414);const S=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,A=s.Ay.div`
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
`,C=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,B=s.Ay.input`
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
`,E=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,M=s.Ay.div`
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
`,_=s.Ay.button`
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
`,I=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,$=a.MD,R=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,z=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,T=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,L=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,P=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,N=s.Ay.th`
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
`,H=s.Ay.div`
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
`,U=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,Y=s.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,K=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,V=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,J=s.Ay.input`
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
`,q=s.Ay.div`
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
`,G=s.Ay.div`
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
`,Z=s.Ay.div`
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
`,ee=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,te=s.Ay.span`
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
`,re=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],ne=()=>{var e,t;const{user:r}=(0,d.As)(),[s,ne]=(0,i.ok)(),{defaultCurrency:se}=(0,h.i1)(),[ie,ae]=(0,n.useState)("RM");(0,n.useEffect)(()=>{se&&ae(se)},[se]);const[oe,le]=(0,l.M)("ranking"),[de,ce]=(0,n.useState)("week"),[he,xe]=(0,n.useState)(()=>{const e=new Date,t=new Date(e);return t.setDate(t.getDate()-6),{start:qe(t),end:qe(e)}}),[ue,pe]=(0,n.useState)(!1),[ge,je]=(0,n.useState)([]),[ve,me]=(0,n.useState)([]),[fe,ye]=(0,n.useState)("all"),[be,Fe]=(0,n.useState)("all"),[ke,we]=(0,n.useState)(""),[Se,Ae]=(0,n.useState)(""),[Ce,Be]=(0,n.useState)(!1),[Ee,Me]=(0,n.useState)(!1),[De,Oe]=(0,n.useState)([]),[_e,Ie]=(0,n.useState)([]),[$e,Re]=(0,n.useState)([]),[ze,Te]=(0,n.useState)(!0),[Le,Pe]=(0,n.useState)([]),[Ne,We]=(0,n.useState)([]),[He,Ue]=(0,n.useState)([]),[Ye,Ke]=(0,n.useState)(new Set),[Ve,Je]=(0,n.useState)(new Set);function qe(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[Ge]=(0,n.useState)(()=>s.get("restaurantId")),[Ze]=(0,n.useState)(()=>s.get("restaurantName"));(0,n.useEffect)(()=>{const e={tab:oe};"all"!==be&&(e.restaurantId=be),ne(e,{replace:!0})},[be,ne,oe]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();je(e),Oe(e.slice(0,10))}let n="/api/restaurants";null===r||void 0===r||!r.id||"Brand General"!==r.role&&"Brand Manager"!==r.role||(n=`/api/restaurants/manager/${r.id}`);const s=await fetch(n,{headers:{Authorization:`Bearer ${e}`}});if(s.ok){const e=await s.json(),t=(e.data||e||[]).map(e=>{var t,r;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name,brand_id:e.brand_id,brand_name:e.brand_name||(null===(r=e.brand)||void 0===r?void 0:r.name)}});if(me(t),Ie(t.slice(0,10)),Ge){const e=t.find(e=>e.id===Ge);e&&(Fe(e.id),Ae(e.name))}else if(Ze){const e=decodeURIComponent(Ze),r=t.find(t=>t.name===e);r&&(Fe(r.id),Ae(r.name))}}}catch(e){console.error("Error fetching brands/restaurants:",e)}})()},[r,Ge,Ze]),(0,n.useEffect)(()=>{(async()=>{if(0!==ve.length){Te(!0);try{const r=localStorage.getItem("auth_token"),n=ve.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==be&&(s+=`&restaurant_id=${be}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();let t=e.data||e||[];if(t=t.filter(e=>{var t;return n.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),"all"!==fe){const e=ve.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===fe}).map(e=>e.id);t=t.filter(t=>{var r;return e.includes(null===(r=t.restaurant_id)||void 0===r?void 0:r.toString())})}Re(t)}const a=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${r}`}});if(a.ok){var e,t;const r=await a.json();null!==(e=r.data)&&void 0!==e&&e.items&&We(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&Ue(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{Te(!1)}}else Te(!1)})()},[fe,be,ve]);const Qe=()=>{ye("all"),we(""),Be(!1)},Xe=()=>{Fe("all"),Ae(""),Me(!1)},et=(0,n.useMemo)(()=>{if(!$e||0===$e.length)return[];const e=new Date(he.start);e.setHours(0,0,0,0);const t=new Date(he.end);return t.setHours(23,59,59,999),$e.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=t,a="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return i&&a})},[$e,he.start,he.end]),tt=(0,n.useMemo)(()=>{if(0===et.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===de){const r={};return et.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;r[i]=(r[i]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===de){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const t=new Date(n);t.setDate(t.getDate()-e),s.push(t)}const i={};return et.forEach(r=>{const n=qe(e(r));i[n]=(i[n]||0)+t(r)}),s.map(e=>{const t=qe(e);return{date:r[e.getDay()],sales:Math.round(i[t]||0)}})}if("month"===de){const r={};return et.forEach(n=>{const s=e(n).getDate().toString();r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return et.forEach(s=>{const i=r[e(s).getMonth()];n[i]=(n[i]||0)+t(s)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[et,de]),rt=(0,n.useMemo)(()=>{if(0===et.length)return[{name:"No Data",value:100,sales:0}];const e={};He.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};Ne.forEach(r=>{if(r.id){const n=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=n}});const r={};let n=0;et.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,a;const o=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=o;const l=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(a=e.product_id)||void 0===a?void 0:a.toString()),d=l&&t[l]||"Other";r[d]=(r[d]||0)+o})});const s=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[et,Ne,He]),nt=(0,n.useMemo)(()=>{var e;if(0===et.length)return[];const t={};He.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};Ne.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};et.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,s,i;const a=e.menu_name||e.name||"Unknown",o=(null===(t=e.menuItem)||void 0===t||null===(s=t.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),l=o?r[o]||"Other":e.category||"Other";n[a]||(n[a]={category:l,price:parseFloat(e.price||0),orders:0,revenue:0});const d=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[a].orders+=d,n[a].revenue+=c*d})});const s=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[et,Ne,He]),st=(0,n.useMemo)(()=>{if(0===et.length)return[];const e={};return et.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[et]),it=(0,n.useMemo)(()=>{if(0===et.length)return{};const e={};return et.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),s=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,i=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const a=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=a,e[n].orders+=1,e[n].months[s].revenue+=a,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=a,e[n].months[s].days[i].orders+=1}),e},[et]),at=(0,n.useMemo)(()=>{if(0===et.length)return[];const e={};return et.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(et.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[et]),ot=(0,n.useMemo)(()=>{if(0===$e.length)return{brands:[],restaurants:[]};const e=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),t=new Date(he.start);t.setHours(0,0,0,0);const r=new Date(he.end);r.setHours(23,59,59,999);const n=$e.filter(e=>{const n=e.order_date||e.createdAt;if(!n)return!1;const s=new Date(n);return s>=t&&s<=r&&"completed"===e.status}),s={};n.forEach(t=>{var r,n;const i=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString();if(!i)return;const a=ve.find(e=>e.id===i),o=(null===a||void 0===a?void 0:a.name)||t.restaurant_name||"Unknown",l=(null===a||void 0===a?void 0:a.brand_name)||(null===(n=ge.find(e=>e.id===(null===a||void 0===a?void 0:a.brand_id)))||void 0===n?void 0:n.name)||"Independent";s[i]||(s[i]={name:o,brandName:l,orders:0,revenue:0}),s[i].orders+=1,s[i].revenue+=e(t)});const i=Object.entries(s).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue),a={},o=new Set(ve.map(e=>{var t;return null===(t=e.brand_id)||void 0===t?void 0:t.toString()}).filter(Boolean));ge.forEach(e=>{o.has(e.id.toString())&&(a[e.id.toString()]={name:e.name,orders:0,revenue:0,restaurantCount:0})}),ve.some(e=>!e.brand_id)&&(a.independent={name:"Independent",orders:0,revenue:0,restaurantCount:0}),ve.forEach(e=>{var t;const r=(null===(t=e.brand_id)||void 0===t?void 0:t.toString())||"independent";a[r]&&(a[r].restaurantCount+=1)}),n.forEach(t=>{var r,n;const s=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString(),i=ve.find(e=>e.id===s),o=(null===i||void 0===i||null===(n=i.brand_id)||void 0===n?void 0:n.toString())||"independent";a[o]&&(a[o].orders+=1,a[o].revenue+=e(t))});return{brands:Object.entries(a).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).filter(e=>e.orders>0||e.restaurantCount>0).sort((e,t)=>t.revenue-e.revenue),restaurants:i}},[$e,ve,ge,he]),lt=()=>{const e=new Date(he.start),t=new Date(he.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=lt();if(e<=31){const e=new Set(Object.keys(it)),t=new Set;Object.keys(it).forEach(e=>{Object.keys(it[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),Ke(e),Je(t)}else e<=365?(Ke(new Set(Object.keys(it))),Je(new Set)):(Ke(new Set),Je(new Set))},[he.start,he.end,it]);const dt=e=>{ce(e),pe(!1);const t=new Date;let r=new Date(t);switch(e){case"today":r=new Date(t);break;case"week":r.setDate(r.getDate()-6);break;case"month":r.setDate(r.getDate()-29);break;case"year":r.setFullYear(r.getFullYear()-1),r.setDate(r.getDate()+1);break;case"all":r=new Date(t.getFullYear()-5,0,1)}xe({start:qe(r),end:qe(t)})},ct=()=>{const e=tt.reduce((e,t)=>e+t.sales,0),t=`Brand/Manager Reports\nGenerated: ${(new Date).toISOString()}\nPeriod: ${he.start} to ${he.end}\nBrand Filter: ${"all"===fe?"All Brands":ke}\nRestaurant Filter: ${"all"===be?"All Restaurants":Se}\n\nTotal Revenue: RM ${e.toFixed(2)}\nTotal Orders: ${et.length}\n`,r=new Blob([t],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=`brand_report_${he.start}_to_${he.end}.csv`,n.click()},ht=()=>(0,w.jsxs)(M,{children:[(0,w.jsxs)(V,{children:[(0,w.jsx)(J,{type:"text",placeholder:"All Brands",value:ke,onChange:e=>(e=>{if(we(e),Be(!0),e.length<1)return void Oe(ge.slice(0,10));const t=ge.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)||t.code.toLowerCase().includes(r)}).slice(0,10);Oe(t)})(e.target.value),onFocus:()=>{Be(!0),0===ke.length&&Oe(ge.slice(0,10))},onBlur:()=>setTimeout(()=>Be(!1),200)}),"all"!==fe&&ke&&(0,w.jsx)(X,{onClick:Qe,children:"\xd7"}),(0,w.jsxs)(q,{show:Ce,children:[(0,w.jsxs)(G,{onClick:()=>{ye("all"),we(""),Be(!1)},children:[(0,w.jsx)(Z,{children:"All Brands"}),(0,w.jsx)(Q,{children:"Show all brand data"})]}),De.map(e=>(0,w.jsxs)(G,{onClick:()=>(e=>{ye(e.id.toString()),we(e.name),Be(!1),Fe("all"),Ae("")})(e),children:[(0,w.jsx)(Z,{children:e.name}),(0,w.jsxs)(Q,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,w.jsxs)(V,{children:[(0,w.jsx)(J,{type:"text",placeholder:"All Restaurants",value:Se,onChange:e=>(e=>{Ae(e),Me(!0);let t=ve;if("all"!==fe&&(t=ve.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===fe})),e.length<1)return void Ie(t.slice(0,10));const r=t.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);Ie(r)})(e.target.value),onFocus:()=>{Me(!0);let e=ve;"all"!==fe&&(e=ve.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===fe})),Ie(e.slice(0,10))},onBlur:()=>setTimeout(()=>Me(!1),200)}),"all"!==be&&Se&&(0,w.jsx)(X,{onClick:Xe,children:"\xd7"}),(0,w.jsxs)(q,{show:Ee,children:[(0,w.jsxs)(G,{onClick:()=>{Fe("all"),Ae(""),Me(!1)},children:[(0,w.jsx)(Z,{children:"All Restaurants"}),(0,w.jsx)(Q,{children:"Show all restaurant data"})]}),_e.map(e=>(0,w.jsxs)(G,{onClick:()=>(e=>{Fe(e.id),Ae(e.name),Me(!1)})(e),children:[(0,w.jsx)(Z,{children:e.name}),(0,w.jsx)(Q,{children:e.brand_name||"Independent"})]},e.id))]})]}),(0,w.jsxs)(D,{children:[(0,w.jsx)(O,{active:"today"===de&&!ue,onClick:()=>dt("today"),children:"Today"}),(0,w.jsx)(O,{active:"week"===de&&!ue,onClick:()=>dt("week"),children:"Week"}),(0,w.jsx)(O,{active:"month"===de&&!ue,onClick:()=>dt("month"),children:"Month"}),(0,w.jsx)(O,{active:"year"===de&&!ue,onClick:()=>dt("year"),children:"Year"}),(0,w.jsx)(O,{active:"all"===de&&!ue,onClick:()=>dt("all"),children:"All"}),(0,w.jsxs)(E,{children:[(0,w.jsx)(B,{type:"date",value:he.start,onChange:e=>{xe({...he,start:e.target.value}),pe(!0)}}),(0,w.jsx)("span",{children:"to"}),(0,w.jsx)(B,{type:"date",value:he.end,onChange:e=>{xe({...he,end:e.target.value}),pe(!0)}})]})]}),(0,w.jsxs)(_,{onClick:ct,children:[(0,w.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,w.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)(S,{children:[(0,w.jsx)(A,{children:(0,w.jsx)(C,{children:"Brand Reports"})}),(0,w.jsxs)(I,{children:[(0,w.jsxs)(o.tU,{children:[(0,w.jsx)(o.oz,{active:"ranking"===oe,onClick:()=>le("ranking"),children:"Sales Ranking"}),(0,w.jsx)(o.oz,{active:"sales"===oe,onClick:()=>le("sales"),children:"Sales Report"}),(0,w.jsx)(o.oz,{active:"details"===oe,onClick:()=>le("details"),children:"Sales Details"}),(0,w.jsx)(o.oz,{active:"menu"===oe,onClick:()=>le("menu"),children:"Menu Analysis"}),(0,w.jsx)(o.oz,{active:"customers"===oe,onClick:()=>le("customers"),children:"Customer Insights"}),(0,w.jsx)(o.oz,{active:"operations"===oe,onClick:()=>le("operations"),children:"Operations"})]}),(0,w.jsxs)("div",{style:{display:"sales"===oe?"block":"none"},children:[(0,w.jsx)(ht,{}),ze?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===et.length?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,w.jsxs)("div",{children:[(0,w.jsxs)($,{children:[(0,w.jsxs)(a.hI,{color:"#059669",children:[(0,w.jsx)(a.v0,{children:"Total Revenue"}),(0,w.jsx)(a.Os,{children:(0,c.vv)(tt.reduce((e,t)=>e+t.sales,0),ie)}),(0,w.jsxs)(a.d1,{children:[et.length," orders in selected period"]})]}),(0,w.jsxs)(a.hI,{color:"#2563EB",children:[(0,w.jsx)(a.v0,{children:"Total Orders"}),(0,w.jsx)(a.Os,{children:et.length.toLocaleString()}),(0,w.jsx)(a.d1,{children:"For selected period"})]}),(0,w.jsxs)(a.hI,{color:"#DC2626",children:[(0,w.jsx)(a.v0,{children:"Average Order Value"}),(0,w.jsx)(a.Os,{children:(0,c.vv)(et.length>0?tt.reduce((e,t)=>e+t.sales,0)/et.length:0,ie)}),(0,w.jsx)(a.d1,{children:"Per order"})]}),(0,w.jsxs)(a.hI,{color:"#7C3AED",children:[(0,w.jsx)(a.v0,{children:"Completed Orders"}),(0,w.jsx)(a.Os,{children:et.filter(e=>"completed"===e.status).length}),(0,w.jsxs)(a.d1,{children:[Math.round(et.filter(e=>"completed"===e.status).length/et.length*100||0),"% completion rate"]})]})]}),(0,w.jsxs)(R,{children:[(0,w.jsxs)(z,{children:[(0,w.jsx)(T,{children:"Revenue Trend"}),(0,w.jsx)(x.u,{width:"100%",height:300,children:(0,w.jsxs)(u.b,{data:tt,margin:{top:5,right:20,left:0,bottom:5},children:[(0,w.jsx)(p.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,w.jsx)(g.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,w.jsx)(v.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,w.jsx)(m.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,w.jsxs)(z,{children:[(0,w.jsx)(T,{children:"Sales by Category"}),(0,w.jsx)(x.u,{width:"100%",height:300,children:(0,w.jsxs)(f.r,{children:[(0,w.jsx)(y.F,{data:rt,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:rt.map((e,t)=>(0,w.jsx)(b.f,{fill:re[t%re.length]},`cell-${t}`))}),(0,w.jsx)(v.m,{formatter:e=>`${e}%`})]})})]})]}),(0,w.jsxs)(z,{children:[(0,w.jsx)(T,{children:"Hourly Orders Distribution"}),(0,w.jsx)(x.u,{width:"100%",height:250,children:(0,w.jsxs)(F.E,{data:st,margin:{top:5,right:20,left:0,bottom:5},children:[(0,w.jsx)(p.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,w.jsx)(g.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,w.jsx)(v.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,w.jsx)(k.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,w.jsxs)("div",{style:{display:"details"===oe?"block":"none"},children:[(0,w.jsx)(ht,{}),ze?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===et.length?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,w.jsxs)("div",{children:[(0,w.jsxs)($,{children:[(0,w.jsxs)(a.hI,{color:"#059669",children:[(0,w.jsx)(a.v0,{children:"Total Revenue"}),(0,w.jsx)(a.Os,{children:(0,c.vv)(tt.reduce((e,t)=>e+t.sales,0),ie)}),(0,w.jsxs)(a.d1,{children:[et.length," orders in selected period"]})]}),(0,w.jsxs)(a.hI,{color:"#2563EB",children:[(0,w.jsx)(a.v0,{children:"Total Orders"}),(0,w.jsx)(a.Os,{children:et.length.toLocaleString()}),(0,w.jsxs)(a.d1,{children:[et.filter(e=>"completed"===e.status).length," completed"]})]}),(0,w.jsxs)(a.hI,{color:"#DC2626",children:[(0,w.jsx)(a.v0,{children:"Average Order Value"}),(0,w.jsx)(a.Os,{children:(0,c.vv)(et.length>0?tt.reduce((e,t)=>e+t.sales,0)/et.length:0,ie)}),(0,w.jsx)(a.d1,{children:"Per order average"})]}),(0,w.jsxs)(a.hI,{color:"#7C3AED",children:[(0,w.jsx)(a.v0,{children:"Period"}),(0,w.jsx)(a.Os,{children:lt()}),(0,w.jsx)(a.d1,{children:"Days"})]})]}),(0,w.jsxs)(L,{children:[(0,w.jsx)(T,{children:"Detailed Sales Breakdown"}),(0,w.jsxs)(P,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(N,{style:{width:"40%"},children:"Period"}),(0,w.jsx)(N,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(N,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(N,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,w.jsx)("tbody",{children:Object.keys(it).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=it[e],r=Ye.has(e);return(0,w.jsxs)(n.Fragment,{children:[(0,w.jsxs)(U,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(Ye);if(t.has(e)){var r;t.delete(e);const n=new Set(Ve);Object.keys((null===(r=it[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),Je(n)}else t.add(e);Ke(t)})(e),children:[(0,w.jsxs)(Y,{level:0,bold:!0,children:[(0,w.jsx)(K,{expanded:r,children:"\u25b6"}),e]}),(0,w.jsx)(Y,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue,ie)}),(0,w.jsx)(Y,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,w.jsx)(Y,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,ie)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],i=`${e}-${r}`,a=Ve.has(i),o=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,w.jsxs)(n.Fragment,{children:[(0,w.jsxs)(U,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(Ve);t.has(e)?t.delete(e):t.add(e),Je(t)})(i),children:[(0,w.jsxs)(Y,{level:1,bold:!0,children:[(0,w.jsx)(K,{expanded:a,children:"\u25b6"}),o]}),(0,w.jsx)(Y,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue,ie)}),(0,w.jsx)(Y,{level:1,style:{textAlign:"right"},children:s.orders}),(0,w.jsx)(Y,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue/s.orders,ie)})]}),a&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,w.jsxs)(U,{level:2,children:[(0,w.jsx)(Y,{level:2,children:r}),(0,w.jsx)(Y,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(t.revenue,ie)}),(0,w.jsx)(Y,{level:2,style:{textAlign:"right"},children:t.orders}),(0,w.jsx)(Y,{level:2,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,ie)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,w.jsxs)("div",{style:{display:"menu"===oe?"block":"none"},children:[(0,w.jsx)(ht,{}),(0,w.jsxs)($,{children:[(0,w.jsxs)(a.hI,{color:"#F59E0B",children:[(0,w.jsx)(a.v0,{children:"Best Seller"}),(0,w.jsx)(a.Os,{children:(null===(e=nt[0])||void 0===e?void 0:e.name)||"N/A"}),(0,w.jsxs)(a.d1,{children:[(null===(t=nt[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,w.jsxs)(a.hI,{color:"#10B981",children:[(0,w.jsx)(a.v0,{children:"Total Items Analyzed"}),(0,w.jsx)(a.Os,{children:nt.length}),(0,w.jsx)(a.d1,{children:"Complete menu analysis"})]}),(0,w.jsxs)(a.hI,{color:"#3B82F6",children:[(0,w.jsx)(a.v0,{children:"Total Orders"}),(0,w.jsx)(a.Os,{children:nt.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,w.jsx)(a.d1,{children:"For selected period"})]}),(0,w.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,w.jsx)(a.v0,{children:"Total Revenue"}),(0,w.jsx)(a.Os,{children:(0,c.vv)(nt.reduce((e,t)=>e+t.revenue,0),ie)}),(0,w.jsx)(a.d1,{children:"For selected period"})]})]}),(0,w.jsxs)(L,{children:[(0,w.jsx)(T,{children:"Complete Menu Performance Ranking"}),(0,w.jsxs)(P,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(N,{children:"Rank"}),(0,w.jsx)(N,{children:"Menu Item"}),(0,w.jsx)(N,{children:"Category"}),(0,w.jsx)(N,{children:"Price"}),(0,w.jsx)(N,{children:"Orders"}),(0,w.jsx)(N,{children:"Revenue"}),(0,w.jsx)(N,{children:"Performance"})]})}),(0,w.jsx)("tbody",{children:nt.map((e,t)=>{var r;const n=(null===(r=nt[0])||void 0===r?void 0:r.orders)||1;return(0,w.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsxs)(W,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,w.jsx)(W,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(W,{children:(0,w.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,w.jsx)(W,{children:(0,c.vv)(e.price,ie)}),(0,w.jsx)(W,{children:e.orders.toLocaleString()}),(0,w.jsx)(W,{children:(0,c.vv)(e.revenue,ie)}),(0,w.jsx)(W,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(H,{percentage:e.orders/n*100}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,w.jsxs)("div",{style:{display:"customers"===oe?"block":"none"},children:[(0,w.jsx)(ht,{}),(0,w.jsxs)($,{children:[(0,w.jsxs)(a.hI,{color:"#635BFF",children:[(0,w.jsx)(a.v0,{children:"Total Customers"}),(0,w.jsx)(a.Os,{children:Le.length.toLocaleString()}),(0,w.jsx)(a.d1,{children:"Across all restaurants"})]}),(0,w.jsxs)(a.hI,{color:"#00D924",children:[(0,w.jsx)(a.v0,{children:"Repeat Customers"}),(0,w.jsx)(a.Os,{children:Le.filter(e=>e.total_orders>1).length}),(0,w.jsxs)(a.d1,{children:[Le.length>0?Math.round(Le.filter(e=>e.total_orders>1).length/Le.length*100):0,"% return rate"]})]}),(0,w.jsxs)(a.hI,{color:"#FFB800",children:[(0,w.jsx)(a.v0,{children:"Average Spent"}),(0,w.jsx)(a.Os,{children:(0,c.vv)(Le.length>0?Le.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/Le.length:0,ie)}),(0,w.jsx)(a.d1,{children:"Per customer"})]}),(0,w.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,w.jsx)(a.v0,{children:"Total Points"}),(0,w.jsx)(a.Os,{children:Le.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,w.jsx)(a.d1,{children:"Across all customers"})]})]}),(0,w.jsx)(L,{children:(0,w.jsx)(T,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,w.jsxs)("div",{style:{display:"operations"===oe?"block":"none"},children:[(0,w.jsx)(ht,{}),(0,w.jsxs)($,{children:[(0,w.jsxs)(a.hI,{color:"#10B981",children:[(0,w.jsx)(a.v0,{children:"Order Fulfillment"}),(0,w.jsxs)(a.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,w.jsx)(a.d1,{children:"On-time completion"})]}),(0,w.jsxs)(a.hI,{color:"#F59E0B",children:[(0,w.jsx)(a.v0,{children:"Avg. Wait Time"}),(0,w.jsxs)(a.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,w.jsx)(a.d1,{children:"Estimated"})]}),(0,w.jsxs)(a.hI,{color:"#EF4444",children:[(0,w.jsx)(a.v0,{children:"Peak Hour"}),(0,w.jsx)(a.Os,{children:"12-1 PM"}),(0,w.jsx)(a.d1,{children:"Busiest time"})]}),(0,w.jsxs)(a.hI,{color:"#6366F1",children:[(0,w.jsx)(a.v0,{children:"Staff Efficiency"}),(0,w.jsxs)(a.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,w.jsx)(a.d1,{children:"Estimated"})]})]}),(0,w.jsxs)(L,{children:[(0,w.jsx)(T,{children:"Peak Hours Performance"}),(0,w.jsxs)(P,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(N,{children:"Time Slot"}),(0,w.jsx)(N,{children:"Orders"}),(0,w.jsx)(N,{children:"Revenue"}),(0,w.jsx)(N,{children:"Efficiency"})]})}),(0,w.jsx)("tbody",{children:at.map((e,t)=>(0,w.jsxs)("tr",{children:[(0,w.jsx)(W,{style:{fontWeight:600},children:e.time}),(0,w.jsx)(W,{children:e.orders}),(0,w.jsx)(W,{children:(0,c.vv)(e.revenue,ie)}),(0,w.jsx)(W,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(H,{percentage:e.efficiency}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,w.jsxs)("div",{style:{display:"ranking"===oe?"block":"none"},children:[(0,w.jsx)(M,{children:(0,w.jsxs)(D,{children:[(0,w.jsx)(O,{active:"today"===de,onClick:()=>dt("today"),children:"Today"}),(0,w.jsx)(O,{active:"week"===de,onClick:()=>dt("week"),children:"This Week"}),(0,w.jsx)(O,{active:"month"===de,onClick:()=>dt("month"),children:"This Month"}),(0,w.jsx)(O,{active:"year"===de,onClick:()=>dt("year"),children:"This Year"}),(0,w.jsx)(O,{active:"all"===de,onClick:()=>dt("all"),children:"All Time"}),ue&&(0,w.jsxs)(E,{children:[(0,w.jsx)(B,{type:"date",value:he.start,onChange:e=>xe(t=>({...t,start:e.target.value}))}),(0,w.jsx)("span",{children:"~"}),(0,w.jsx)(B,{type:"date",value:he.end,onChange:e=>xe(t=>({...t,end:e.target.value}))})]})]})}),(0,w.jsxs)(ee,{children:[(0,w.jsx)(T,{children:"Brand Sales Ranking"}),(0,w.jsxs)(P,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(N,{style:{width:"60px"},children:"Rank"}),(0,w.jsx)(N,{children:"Brand Name"}),(0,w.jsx)(N,{style:{textAlign:"right"},children:"Restaurants"}),(0,w.jsx)(N,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(N,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(N,{style:{width:"150px"},children:"Performance"})]})}),(0,w.jsxs)("tbody",{children:[ot.brands.map((e,t)=>{var r;const n=(null===(r=ot.brands[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,w.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsx)(W,{children:(0,w.jsx)(te,{rank:t+1,children:t+1})}),(0,w.jsx)(W,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(W,{style:{textAlign:"right"},children:e.restaurantCount}),(0,w.jsx)(W,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,w.jsx)(W,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,c.vv)(e.revenue,ie)}),(0,w.jsx)(W,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(H,{percentage:s}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===ot.brands.length&&(0,w.jsx)("tr",{children:(0,w.jsx)(W,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No brand data available"})})]})]})]}),(0,w.jsxs)(ee,{children:[(0,w.jsx)(T,{children:"Restaurant Sales Ranking"}),(0,w.jsxs)(P,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(N,{style:{width:"60px"},children:"Rank"}),(0,w.jsx)(N,{children:"Restaurant Name"}),(0,w.jsx)(N,{children:"Brand"}),(0,w.jsx)(N,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(N,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(N,{style:{width:"150px"},children:"Performance"})]})}),(0,w.jsxs)("tbody",{children:[ot.restaurants.slice(0,20).map((e,t)=>{var r;const n=(null===(r=ot.restaurants[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,w.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsx)(W,{children:(0,w.jsx)(te,{rank:t+1,children:t+1})}),(0,w.jsx)(W,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(W,{children:(0,w.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",backgroundColor:"Independent"===e.brandName?"#F3F4F6":"#E0E7FF",color:"Independent"===e.brandName?"#6B7280":"#4338CA"},children:e.brandName})}),(0,w.jsx)(W,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,w.jsx)(W,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,c.vv)(e.revenue,ie)}),(0,w.jsx)(W,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(H,{percentage:s}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===ot.restaurants.length&&(0,w.jsx)("tr",{children:(0,w.jsx)(W,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),s=r(4414);const i=n.Ay.div`
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
`,a=n.Ay.button`
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
`,o=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,s.jsx)(i,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:i}=e;return(0,s.jsx)(a,{active:t,onClick:r,className:i,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,s.jsx)(o,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),s=r(4492);function i(e){const[t,r]=(0,s.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,o]=(0,n.useState)(i());return[a,(0,n.useCallback)(e=>{o(e),r({tab:e})},[r])]}},4021:(e,t,r)=>{r.d(t,{i1:()=>a});var n=r(9950),s=r(1367),i=r(6038);const a=()=>{const{user:e}=(0,s.As)(),[t,r]=(0,n.useState)("RM"),[a,o]=(0,n.useState)(Object.keys(i.DL)),[l,d]=(0,n.useState)(!0),[c,h]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let s=n>=0?t[n+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),n=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";r(n)}else r("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),h("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:l,error:c}}}}]);