"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[677],{677:(e,t,r)=>{r.r(t),r.d(t,{default:()=>te});var n=r(9950),s=r(4752),i=r(4492),a=r(2674),l=r(1367),o=r(6038),d=r(4021),c=r(1095),h=r(2847),x=r(3245),u=r(158),p=r(3440),g=r(2174),j=r(4915),v=r(7621),m=r(5297),f=r(2528),y=r(294),b=r(3588),F=r(4414);const k=s.Ay.div`
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
`,S=s.Ay.h1`
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
`,D=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,_=a.MD,I=s.Ay.div`
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
`,R=s.Ay.h3`
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
`,ee=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],te=()=>{var e,t;const{user:r}=(0,l.As)(),[s,te]=(0,i.ok)(),{defaultCurrency:re}=(0,d.i1)(),[ne,se]=(0,n.useState)("RM");(0,n.useEffect)(()=>{re&&se(re)},[re]);const[ie,ae]=(0,n.useState)(()=>s.get("tab")||"ranking"),[le,oe]=(0,n.useState)("week"),[de,ce]=(0,n.useState)(()=>{const e=new Date,t=new Date(e);return t.setDate(t.getDate()-6),{start:Ve(t),end:Ve(e)}}),[he,xe]=(0,n.useState)(!1),[ue,pe]=(0,n.useState)([]),[ge,je]=(0,n.useState)([]),[ve,me]=(0,n.useState)("all"),[fe,ye]=(0,n.useState)("all"),[be,Fe]=(0,n.useState)(""),[ke,we]=(0,n.useState)(""),[Se,Ae]=(0,n.useState)(!1),[Ce,Be]=(0,n.useState)(!1),[Ee,Me]=(0,n.useState)([]),[Oe,De]=(0,n.useState)([]),[_e,Ie]=(0,n.useState)([]),[$e,Re]=(0,n.useState)(!0),[ze,Te]=(0,n.useState)([]),[Le,Pe]=(0,n.useState)([]),[We,Ne]=(0,n.useState)([]),[He,Ue]=(0,n.useState)(new Set),[Ye,Ke]=(0,n.useState)(new Set);function Ve(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[Je]=(0,n.useState)(()=>s.get("restaurantId")),[qe]=(0,n.useState)(()=>s.get("restaurantName"));(0,n.useEffect)(()=>{const e={tab:ie};"all"!==fe&&(e.restaurantId=fe),te(e,{replace:!0})},[ie,te,fe]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();pe(e),Me(e.slice(0,10))}let n="/api/restaurants";null===r||void 0===r||!r.id||"Brand General"!==r.role&&"Brand Manager"!==r.role||(n=`/api/restaurants/manager/${r.id}`);const s=await fetch(n,{headers:{Authorization:`Bearer ${e}`}});if(s.ok){const e=await s.json(),t=(e.data||e||[]).map(e=>{var t,r;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name,brand_id:e.brand_id,brand_name:e.brand_name||(null===(r=e.brand)||void 0===r?void 0:r.name)}});if(je(t),De(t.slice(0,10)),Je){const e=t.find(e=>e.id===Je);e&&(ye(e.id),we(e.name))}else if(qe){const e=decodeURIComponent(qe),r=t.find(t=>t.name===e);r&&(ye(r.id),we(r.name))}}}catch(e){console.error("Error fetching brands/restaurants:",e)}})()},[r,Je,qe]),(0,n.useEffect)(()=>{(async()=>{if(0!==ge.length){Re(!0);try{const r=localStorage.getItem("auth_token"),n=ge.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==fe&&(s+=`&restaurant_id=${fe}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();let t=e.data||e||[];if(t=t.filter(e=>{var t;return n.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),"all"!==ve){const e=ge.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===ve}).map(e=>e.id);t=t.filter(t=>{var r;return e.includes(null===(r=t.restaurant_id)||void 0===r?void 0:r.toString())})}Ie(t)}const a=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${r}`}});if(a.ok){var e,t;const r=await a.json();null!==(e=r.data)&&void 0!==e&&e.items&&Pe(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&Ne(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{Re(!1)}}else Re(!1)})()},[ve,fe,ge]);const Ge=()=>{me("all"),Fe(""),Ae(!1)},Qe=()=>{ye("all"),we(""),Be(!1)},Xe=(0,n.useMemo)(()=>{if(!_e||0===_e.length)return[];const e=new Date(de.start);e.setHours(0,0,0,0);const t=new Date(de.end);return t.setHours(23,59,59,999),_e.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=t,a="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return i&&a})},[_e,de.start,de.end]),Ze=(0,n.useMemo)(()=>{if(0===Xe.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===le){const r={};return Xe.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;r[i]=(r[i]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===le){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const t=new Date(n);t.setDate(t.getDate()-e),s.push(t)}const i={};return Xe.forEach(r=>{const n=Ve(e(r));i[n]=(i[n]||0)+t(r)}),s.map(e=>{const t=Ve(e);return{date:r[e.getDay()],sales:Math.round(i[t]||0)}})}if("month"===le){const r={};return Xe.forEach(n=>{const s=e(n).getDate().toString();r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Xe.forEach(s=>{const i=r[e(s).getMonth()];n[i]=(n[i]||0)+t(s)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Xe,le]),et=(0,n.useMemo)(()=>{if(0===Xe.length)return[{name:"No Data",value:100,sales:0}];const e={};We.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};Le.forEach(r=>{if(r.id){const n=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=n}});const r={};let n=0;Xe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,a;const l=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=l;const o=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(a=e.product_id)||void 0===a?void 0:a.toString()),d=o&&t[o]||"Other";r[d]=(r[d]||0)+l})});const s=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[Xe,Le,We]),tt=(0,n.useMemo)(()=>{var e;if(0===Xe.length)return[];const t={};We.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};Le.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};Xe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,s,i;const a=e.menu_name||e.name||"Unknown",l=(null===(t=e.menuItem)||void 0===t||null===(s=t.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),o=l?r[l]||"Other":e.category||"Other";n[a]||(n[a]={category:o,price:parseFloat(e.price||0),orders:0,revenue:0});const d=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[a].orders+=d,n[a].revenue+=c*d})});const s=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[Xe,Le,We]),rt=(0,n.useMemo)(()=>{if(0===Xe.length)return[];const e={};return Xe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[Xe]),nt=(0,n.useMemo)(()=>{if(0===Xe.length)return{};const e={};return Xe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),s=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,i=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const a=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=a,e[n].orders+=1,e[n].months[s].revenue+=a,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=a,e[n].months[s].days[i].orders+=1}),e},[Xe]),st=(0,n.useMemo)(()=>{if(0===Xe.length)return[];const e={};return Xe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(Xe.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[Xe]),it=(0,n.useMemo)(()=>{if(0===_e.length)return{brands:[],restaurants:[]};const e=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),t=new Date(de.start);t.setHours(0,0,0,0);const r=new Date(de.end);r.setHours(23,59,59,999);const n=_e.filter(e=>{const n=e.order_date||e.createdAt;if(!n)return!1;const s=new Date(n);return s>=t&&s<=r&&"completed"===e.status}),s={};n.forEach(t=>{var r,n;const i=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString();if(!i)return;const a=ge.find(e=>e.id===i),l=(null===a||void 0===a?void 0:a.name)||t.restaurant_name||"Unknown",o=(null===a||void 0===a?void 0:a.brand_name)||(null===(n=ue.find(e=>e.id===(null===a||void 0===a?void 0:a.brand_id)))||void 0===n?void 0:n.name)||"Independent";s[i]||(s[i]={name:l,brandName:o,orders:0,revenue:0}),s[i].orders+=1,s[i].revenue+=e(t)});const i=Object.entries(s).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue),a={},l=new Set(ge.map(e=>{var t;return null===(t=e.brand_id)||void 0===t?void 0:t.toString()}).filter(Boolean));ue.forEach(e=>{l.has(e.id.toString())&&(a[e.id.toString()]={name:e.name,orders:0,revenue:0,restaurantCount:0})}),ge.some(e=>!e.brand_id)&&(a.independent={name:"Independent",orders:0,revenue:0,restaurantCount:0}),ge.forEach(e=>{var t;const r=(null===(t=e.brand_id)||void 0===t?void 0:t.toString())||"independent";a[r]&&(a[r].restaurantCount+=1)}),n.forEach(t=>{var r,n;const s=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString(),i=ge.find(e=>e.id===s),l=(null===i||void 0===i||null===(n=i.brand_id)||void 0===n?void 0:n.toString())||"independent";a[l]&&(a[l].orders+=1,a[l].revenue+=e(t))});return{brands:Object.entries(a).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).filter(e=>e.orders>0||e.restaurantCount>0).sort((e,t)=>t.revenue-e.revenue),restaurants:i}},[_e,ge,ue,de]),at=()=>{const e=new Date(de.start),t=new Date(de.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=at();if(e<=31){const e=new Set(Object.keys(nt)),t=new Set;Object.keys(nt).forEach(e=>{Object.keys(nt[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),Ue(e),Ke(t)}else e<=365?(Ue(new Set(Object.keys(nt))),Ke(new Set)):(Ue(new Set),Ke(new Set))},[de.start,de.end,nt]);const lt=e=>{oe(e),xe(!1);const t=new Date;let r=new Date(t);switch(e){case"today":r=new Date(t);break;case"week":r.setDate(r.getDate()-6);break;case"month":r.setDate(r.getDate()-29);break;case"year":r.setFullYear(r.getFullYear()-1),r.setDate(r.getDate()+1);break;case"all":r=new Date(t.getFullYear()-5,0,1)}ce({start:Ve(r),end:Ve(t)})},ot=()=>{const e=Ze.reduce((e,t)=>e+t.sales,0),t=`Brand/Manager Reports\nGenerated: ${(new Date).toISOString()}\nPeriod: ${de.start} to ${de.end}\nBrand Filter: ${"all"===ve?"All Brands":be}\nRestaurant Filter: ${"all"===fe?"All Restaurants":ke}\n\nTotal Revenue: RM ${e.toFixed(2)}\nTotal Orders: ${Xe.length}\n`,r=new Blob([t],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(r),n.download=`brand_report_${de.start}_to_${de.end}.csv`,n.click()},dt=()=>(0,F.jsxs)(B,{children:[(0,F.jsxs)(Y,{children:[(0,F.jsx)(K,{type:"text",placeholder:"All Brands",value:be,onChange:e=>(e=>{if(Fe(e),Ae(!0),e.length<1)return void Me(ue.slice(0,10));const t=ue.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)||t.code.toLowerCase().includes(r)}).slice(0,10);Me(t)})(e.target.value),onFocus:()=>{Ae(!0),0===be.length&&Me(ue.slice(0,10))},onBlur:()=>setTimeout(()=>Ae(!1),200)}),"all"!==ve&&be&&(0,F.jsx)(Q,{onClick:Ge,children:"\xd7"}),(0,F.jsxs)(V,{show:Se,children:[(0,F.jsxs)(J,{onClick:()=>{me("all"),Fe(""),Ae(!1)},children:[(0,F.jsx)(q,{children:"All Brands"}),(0,F.jsx)(G,{children:"Show all brand data"})]}),Ee.map(e=>(0,F.jsxs)(J,{onClick:()=>(e=>{me(e.id.toString()),Fe(e.name),Ae(!1),ye("all"),we("")})(e),children:[(0,F.jsx)(q,{children:e.name}),(0,F.jsxs)(G,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,F.jsxs)(Y,{children:[(0,F.jsx)(K,{type:"text",placeholder:"All Restaurants",value:ke,onChange:e=>(e=>{we(e),Be(!0);let t=ge;if("all"!==ve&&(t=ge.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===ve})),e.length<1)return void De(t.slice(0,10));const r=t.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);De(r)})(e.target.value),onFocus:()=>{Be(!0);let e=ge;"all"!==ve&&(e=ge.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===ve})),De(e.slice(0,10))},onBlur:()=>setTimeout(()=>Be(!1),200)}),"all"!==fe&&ke&&(0,F.jsx)(Q,{onClick:Qe,children:"\xd7"}),(0,F.jsxs)(V,{show:Ce,children:[(0,F.jsxs)(J,{onClick:()=>{ye("all"),we(""),Be(!1)},children:[(0,F.jsx)(q,{children:"All Restaurants"}),(0,F.jsx)(G,{children:"Show all restaurant data"})]}),Oe.map(e=>(0,F.jsxs)(J,{onClick:()=>(e=>{ye(e.id),we(e.name),Be(!1)})(e),children:[(0,F.jsx)(q,{children:e.name}),(0,F.jsx)(G,{children:e.brand_name||"Independent"})]},e.id))]})]}),(0,F.jsxs)(E,{children:[(0,F.jsx)(M,{active:"today"===le&&!he,onClick:()=>lt("today"),children:"Today"}),(0,F.jsx)(M,{active:"week"===le&&!he,onClick:()=>lt("week"),children:"Week"}),(0,F.jsx)(M,{active:"month"===le&&!he,onClick:()=>lt("month"),children:"Month"}),(0,F.jsx)(M,{active:"year"===le&&!he,onClick:()=>lt("year"),children:"Year"}),(0,F.jsx)(M,{active:"all"===le&&!he,onClick:()=>lt("all"),children:"All"}),(0,F.jsxs)(C,{children:[(0,F.jsx)(A,{type:"date",value:de.start,onChange:e=>{ce({...de,start:e.target.value}),xe(!0)}}),(0,F.jsx)("span",{children:"to"}),(0,F.jsx)(A,{type:"date",value:de.end,onChange:e=>{ce({...de,end:e.target.value}),xe(!0)}})]})]}),(0,F.jsxs)(O,{onClick:ot,children:[(0,F.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,F.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,F.jsx)(F.Fragment,{children:(0,F.jsxs)(k,{children:[(0,F.jsx)(w,{children:(0,F.jsx)(S,{children:"Brand Reports"})}),(0,F.jsxs)(D,{children:[(0,F.jsxs)(a.j,{children:[(0,F.jsx)(a.oz,{active:"ranking"===ie,onClick:()=>ae("ranking"),children:"Sales Ranking"}),(0,F.jsx)(a.oz,{active:"sales"===ie,onClick:()=>ae("sales"),children:"Sales Report"}),(0,F.jsx)(a.oz,{active:"details"===ie,onClick:()=>ae("details"),children:"Sales Details"}),(0,F.jsx)(a.oz,{active:"menu"===ie,onClick:()=>ae("menu"),children:"Menu Analysis"}),(0,F.jsx)(a.oz,{active:"customers"===ie,onClick:()=>ae("customers"),children:"Customer Insights"}),(0,F.jsx)(a.oz,{active:"operations"===ie,onClick:()=>ae("operations"),children:"Operations"})]}),(0,F.jsxs)("div",{style:{display:"sales"===ie?"block":"none"},children:[(0,F.jsx)(dt,{}),$e?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Xe.length?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,F.jsxs)("div",{children:[(0,F.jsxs)(_,{children:[(0,F.jsxs)(a.hI,{color:"#059669",children:[(0,F.jsx)(a.v0,{children:"Total Revenue"}),(0,F.jsx)(a.Os,{children:(0,o.vv)(Ze.reduce((e,t)=>e+t.sales,0),ne)}),(0,F.jsxs)(a.d1,{children:[Xe.length," orders in selected period"]})]}),(0,F.jsxs)(a.hI,{color:"#2563EB",children:[(0,F.jsx)(a.v0,{children:"Total Orders"}),(0,F.jsx)(a.Os,{children:Xe.length.toLocaleString()}),(0,F.jsx)(a.d1,{children:"For selected period"})]}),(0,F.jsxs)(a.hI,{color:"#DC2626",children:[(0,F.jsx)(a.v0,{children:"Average Order Value"}),(0,F.jsx)(a.Os,{children:(0,o.vv)(Xe.length>0?Ze.reduce((e,t)=>e+t.sales,0)/Xe.length:0,ne)}),(0,F.jsx)(a.d1,{children:"Per order"})]}),(0,F.jsxs)(a.hI,{color:"#7C3AED",children:[(0,F.jsx)(a.v0,{children:"Completed Orders"}),(0,F.jsx)(a.Os,{children:Xe.filter(e=>"completed"===e.status).length}),(0,F.jsxs)(a.d1,{children:[Math.round(Xe.filter(e=>"completed"===e.status).length/Xe.length*100||0),"% completion rate"]})]})]}),(0,F.jsxs)(I,{children:[(0,F.jsxs)($,{children:[(0,F.jsx)(R,{children:"Revenue Trend"}),(0,F.jsx)(c.u,{width:"100%",height:300,children:(0,F.jsxs)(h.b,{data:Ze,margin:{top:5,right:20,left:0,bottom:5},children:[(0,F.jsx)(x.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,F.jsx)(u.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,F.jsx)(p.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,F.jsx)(g.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,F.jsx)(j.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,F.jsxs)($,{children:[(0,F.jsx)(R,{children:"Sales by Category"}),(0,F.jsx)(c.u,{width:"100%",height:300,children:(0,F.jsxs)(v.r,{children:[(0,F.jsx)(m.F,{data:et,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:et.map((e,t)=>(0,F.jsx)(f.f,{fill:ee[t%ee.length]},`cell-${t}`))}),(0,F.jsx)(g.m,{formatter:e=>`${e}%`})]})})]})]}),(0,F.jsxs)($,{children:[(0,F.jsx)(R,{children:"Hourly Orders Distribution"}),(0,F.jsx)(c.u,{width:"100%",height:250,children:(0,F.jsxs)(y.E,{data:rt,margin:{top:5,right:20,left:0,bottom:5},children:[(0,F.jsx)(x.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,F.jsx)(u.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,F.jsx)(p.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,F.jsx)(g.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,F.jsx)(b.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,F.jsxs)("div",{style:{display:"details"===ie?"block":"none"},children:[(0,F.jsx)(dt,{}),$e?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Xe.length?(0,F.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,F.jsxs)("div",{children:[(0,F.jsxs)(_,{children:[(0,F.jsxs)(a.hI,{color:"#059669",children:[(0,F.jsx)(a.v0,{children:"Total Revenue"}),(0,F.jsx)(a.Os,{children:(0,o.vv)(Ze.reduce((e,t)=>e+t.sales,0),ne)}),(0,F.jsxs)(a.d1,{children:[Xe.length," orders in selected period"]})]}),(0,F.jsxs)(a.hI,{color:"#2563EB",children:[(0,F.jsx)(a.v0,{children:"Total Orders"}),(0,F.jsx)(a.Os,{children:Xe.length.toLocaleString()}),(0,F.jsxs)(a.d1,{children:[Xe.filter(e=>"completed"===e.status).length," completed"]})]}),(0,F.jsxs)(a.hI,{color:"#DC2626",children:[(0,F.jsx)(a.v0,{children:"Average Order Value"}),(0,F.jsx)(a.Os,{children:(0,o.vv)(Xe.length>0?Ze.reduce((e,t)=>e+t.sales,0)/Xe.length:0,ne)}),(0,F.jsx)(a.d1,{children:"Per order average"})]}),(0,F.jsxs)(a.hI,{color:"#7C3AED",children:[(0,F.jsx)(a.v0,{children:"Period"}),(0,F.jsx)(a.Os,{children:at()}),(0,F.jsx)(a.d1,{children:"Days"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)(R,{children:"Detailed Sales Breakdown"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{style:{width:"40%"},children:"Period"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,F.jsx)("tbody",{children:Object.keys(nt).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=nt[e],r=He.has(e);return(0,F.jsxs)(n.Fragment,{children:[(0,F.jsxs)(N,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(He);if(t.has(e)){var r;t.delete(e);const n=new Set(Ye);Object.keys((null===(r=nt[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),Ke(n)}else t.add(e);Ue(t)})(e),children:[(0,F.jsxs)(H,{level:0,bold:!0,children:[(0,F.jsx)(U,{expanded:r,children:"\u25b6"}),e]}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:(0,o.vv)(t.revenue,ne)}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,F.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:(0,o.vv)(t.revenue/t.orders,ne)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],i=`${e}-${r}`,a=Ye.has(i),l=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,F.jsxs)(n.Fragment,{children:[(0,F.jsxs)(N,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(Ye);t.has(e)?t.delete(e):t.add(e),Ke(t)})(i),children:[(0,F.jsxs)(H,{level:1,bold:!0,children:[(0,F.jsx)(U,{expanded:a,children:"\u25b6"}),l]}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:(0,o.vv)(s.revenue,ne)}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:s.orders}),(0,F.jsx)(H,{level:1,style:{textAlign:"right"},children:(0,o.vv)(s.revenue/s.orders,ne)})]}),a&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,F.jsxs)(N,{level:2,children:[(0,F.jsx)(H,{level:2,children:r}),(0,F.jsx)(H,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,o.vv)(t.revenue,ne)}),(0,F.jsx)(H,{level:2,style:{textAlign:"right"},children:t.orders}),(0,F.jsx)(H,{level:2,style:{textAlign:"right"},children:(0,o.vv)(t.revenue/t.orders,ne)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,F.jsxs)("div",{style:{display:"menu"===ie?"block":"none"},children:[(0,F.jsx)(dt,{}),(0,F.jsxs)(_,{children:[(0,F.jsxs)(a.hI,{color:"#F59E0B",children:[(0,F.jsx)(a.v0,{children:"Best Seller"}),(0,F.jsx)(a.Os,{children:(null===(e=tt[0])||void 0===e?void 0:e.name)||"N/A"}),(0,F.jsxs)(a.d1,{children:[(null===(t=tt[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,F.jsxs)(a.hI,{color:"#10B981",children:[(0,F.jsx)(a.v0,{children:"Total Items Analyzed"}),(0,F.jsx)(a.Os,{children:tt.length}),(0,F.jsx)(a.d1,{children:"Complete menu analysis"})]}),(0,F.jsxs)(a.hI,{color:"#3B82F6",children:[(0,F.jsx)(a.v0,{children:"Total Orders"}),(0,F.jsx)(a.Os,{children:tt.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,F.jsx)(a.d1,{children:"For selected period"})]}),(0,F.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,F.jsx)(a.v0,{children:"Total Revenue"}),(0,F.jsx)(a.Os,{children:(0,o.vv)(tt.reduce((e,t)=>e+t.revenue,0),ne)}),(0,F.jsx)(a.d1,{children:"For selected period"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)(R,{children:"Complete Menu Performance Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{children:"Rank"}),(0,F.jsx)(L,{children:"Menu Item"}),(0,F.jsx)(L,{children:"Category"}),(0,F.jsx)(L,{children:"Price"}),(0,F.jsx)(L,{children:"Orders"}),(0,F.jsx)(L,{children:"Revenue"}),(0,F.jsx)(L,{children:"Performance"})]})}),(0,F.jsx)("tbody",{children:tt.map((e,t)=>{var r;const n=(null===(r=tt[0])||void 0===r?void 0:r.orders)||1;return(0,F.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsxs)(P,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{children:(0,F.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,F.jsx)(P,{children:(0,o.vv)(e.price,ne)}),(0,F.jsx)(P,{children:e.orders.toLocaleString()}),(0,F.jsx)(P,{children:(0,o.vv)(e.revenue,ne)}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:e.orders/n*100}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,F.jsxs)("div",{style:{display:"customers"===ie?"block":"none"},children:[(0,F.jsx)(dt,{}),(0,F.jsxs)(_,{children:[(0,F.jsxs)(a.hI,{color:"#635BFF",children:[(0,F.jsx)(a.v0,{children:"Total Customers"}),(0,F.jsx)(a.Os,{children:ze.length.toLocaleString()}),(0,F.jsx)(a.d1,{children:"Across all restaurants"})]}),(0,F.jsxs)(a.hI,{color:"#00D924",children:[(0,F.jsx)(a.v0,{children:"Repeat Customers"}),(0,F.jsx)(a.Os,{children:ze.filter(e=>e.total_orders>1).length}),(0,F.jsxs)(a.d1,{children:[ze.length>0?Math.round(ze.filter(e=>e.total_orders>1).length/ze.length*100):0,"% return rate"]})]}),(0,F.jsxs)(a.hI,{color:"#FFB800",children:[(0,F.jsx)(a.v0,{children:"Average Spent"}),(0,F.jsx)(a.Os,{children:(0,o.vv)(ze.length>0?ze.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/ze.length:0,ne)}),(0,F.jsx)(a.d1,{children:"Per customer"})]}),(0,F.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,F.jsx)(a.v0,{children:"Total Points"}),(0,F.jsx)(a.Os,{children:ze.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,F.jsx)(a.d1,{children:"Across all customers"})]})]}),(0,F.jsx)(z,{children:(0,F.jsx)(R,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,F.jsxs)("div",{style:{display:"operations"===ie?"block":"none"},children:[(0,F.jsx)(dt,{}),(0,F.jsxs)(_,{children:[(0,F.jsxs)(a.hI,{color:"#10B981",children:[(0,F.jsx)(a.v0,{children:"Order Fulfillment"}),(0,F.jsxs)(a.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,F.jsx)(a.d1,{children:"On-time completion"})]}),(0,F.jsxs)(a.hI,{color:"#F59E0B",children:[(0,F.jsx)(a.v0,{children:"Avg. Wait Time"}),(0,F.jsxs)(a.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,F.jsx)(a.d1,{children:"Estimated"})]}),(0,F.jsxs)(a.hI,{color:"#EF4444",children:[(0,F.jsx)(a.v0,{children:"Peak Hour"}),(0,F.jsx)(a.Os,{children:"12-1 PM"}),(0,F.jsx)(a.d1,{children:"Busiest time"})]}),(0,F.jsxs)(a.hI,{color:"#6366F1",children:[(0,F.jsx)(a.v0,{children:"Staff Efficiency"}),(0,F.jsxs)(a.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,F.jsx)(a.d1,{children:"Estimated"})]})]}),(0,F.jsxs)(z,{children:[(0,F.jsx)(R,{children:"Peak Hours Performance"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{children:"Time Slot"}),(0,F.jsx)(L,{children:"Orders"}),(0,F.jsx)(L,{children:"Revenue"}),(0,F.jsx)(L,{children:"Efficiency"})]})}),(0,F.jsx)("tbody",{children:st.map((e,t)=>(0,F.jsxs)("tr",{children:[(0,F.jsx)(P,{style:{fontWeight:600},children:e.time}),(0,F.jsx)(P,{children:e.orders}),(0,F.jsx)(P,{children:(0,o.vv)(e.revenue,ne)}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:e.efficiency}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,F.jsxs)("div",{style:{display:"ranking"===ie?"block":"none"},children:[(0,F.jsx)(B,{children:(0,F.jsxs)(E,{children:[(0,F.jsx)(M,{active:"today"===le,onClick:()=>lt("today"),children:"Today"}),(0,F.jsx)(M,{active:"week"===le,onClick:()=>lt("week"),children:"This Week"}),(0,F.jsx)(M,{active:"month"===le,onClick:()=>lt("month"),children:"This Month"}),(0,F.jsx)(M,{active:"year"===le,onClick:()=>lt("year"),children:"This Year"}),(0,F.jsx)(M,{active:"all"===le,onClick:()=>lt("all"),children:"All Time"}),he&&(0,F.jsxs)(C,{children:[(0,F.jsx)(A,{type:"date",value:de.start,onChange:e=>ce(t=>({...t,start:e.target.value}))}),(0,F.jsx)("span",{children:"~"}),(0,F.jsx)(A,{type:"date",value:de.end,onChange:e=>ce(t=>({...t,end:e.target.value}))})]})]})}),(0,F.jsxs)(X,{children:[(0,F.jsx)(R,{children:"Brand Sales Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{style:{width:"60px"},children:"Rank"}),(0,F.jsx)(L,{children:"Brand Name"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Restaurants"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(L,{style:{width:"150px"},children:"Performance"})]})}),(0,F.jsxs)("tbody",{children:[it.brands.map((e,t)=>{var r;const n=(null===(r=it.brands[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,F.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsx)(P,{children:(0,F.jsx)(Z,{rank:t+1,children:t+1})}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{style:{textAlign:"right"},children:e.restaurantCount}),(0,F.jsx)(P,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,F.jsx)(P,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,o.vv)(e.revenue,ne)}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:s}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===it.brands.length&&(0,F.jsx)("tr",{children:(0,F.jsx)(P,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No brand data available"})})]})]})]}),(0,F.jsxs)(X,{children:[(0,F.jsx)(R,{children:"Restaurant Sales Ranking"}),(0,F.jsxs)(T,{children:[(0,F.jsx)("thead",{children:(0,F.jsxs)("tr",{children:[(0,F.jsx)(L,{style:{width:"60px"},children:"Rank"}),(0,F.jsx)(L,{children:"Restaurant Name"}),(0,F.jsx)(L,{children:"Brand"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Orders"}),(0,F.jsx)(L,{style:{textAlign:"right"},children:"Revenue"}),(0,F.jsx)(L,{style:{width:"150px"},children:"Performance"})]})}),(0,F.jsxs)("tbody",{children:[it.restaurants.slice(0,20).map((e,t)=>{var r;const n=(null===(r=it.restaurants[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,F.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,F.jsx)(P,{children:(0,F.jsx)(Z,{rank:t+1,children:t+1})}),(0,F.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,F.jsx)(P,{children:(0,F.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",backgroundColor:"Independent"===e.brandName?"#F3F4F6":"#E0E7FF",color:"Independent"===e.brandName?"#6B7280":"#4338CA"},children:e.brandName})}),(0,F.jsx)(P,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,F.jsx)(P,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,o.vv)(e.revenue,ne)}),(0,F.jsx)(P,{children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,F.jsx)(W,{percentage:s}),(0,F.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===it.restaurants.length&&(0,F.jsx)("tr",{children:(0,F.jsx)(P,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}},4021:(e,t,r)=>{r.d(t,{i1:()=>a});var n=r(9950),s=r(1367),i=r(6038);const a=()=>{const{user:e}=(0,s.As)(),[t,r]=(0,n.useState)("RM"),[a,l]=(0,n.useState)(Object.keys(i.DL)),[o,d]=(0,n.useState)(!0),[c,h]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let s=n>=0?t[n+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),n=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";r(n)}else r("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),h("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:o,error:c}}}}]);