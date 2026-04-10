"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1323],{2966:(e,n,r)=>{r.d(n,{A:()=>P});var t=r(9950),i=r(9610),o=r(2159),s=r(4752),a=r(6038),l=r(9018),d=r(9955),c=r(4414);const p=s.Ay.div`
  background: linear-gradient(to bottom, #F8FAFC, #F1F5F9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,u=s.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`,h=s.Ay.span`
  color: #6B7280;
`,x=s.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,g=s.Ay.div`
  margin-bottom: 20px;
`,m=s.Ay.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  text-align: center;
  color: #1F2937;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
    font-weight: 400;
  }
`,v=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
`,j=s.Ay.button`
  padding: 10px;
  border: 1px solid ${e=>e.selected?"#635BFF":"#E5E7EB"};
  background: ${e=>e.selected?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${e=>e.selected?"#635BFF":"#374151"};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: ${e=>e.selected?"#635BFF":"#D1D5DB"};
    background: ${e=>e.selected?"rgba(99, 91, 255, 0.1)":"#F9FAFB"};
  }
`,y=s.Ay.div`
  background: #F0FDF4;
  border: 1px solid #86EFAC;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 16px;
`,f=s.Ay.div`
  font-size: 14px;
  color: #059669;
  margin-bottom: 4px;
`,b=s.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #047857;
`,F=(0,s.Ay)(u)`
  color: #10B981;
`,w=s.Ay.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,k=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 12px;
`,_=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,C=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,A=s.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,S=s.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 12px;

  input {
    width: 18px;
    height: 18px;
    accent-color: #635BFF;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #1F2937;
  }
`,B=s.Ay.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #E5E7EB;
  accent-color: #635BFF;
  cursor: pointer;
`,z=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 12px;
  background: #EFF6FF;
  border-radius: 8px;
`,M=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,E=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,D=s.Ay.div`
  font-weight: 700;
  color: #059669;
  font-size: 16px;
`,$=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n=(0,d.c4)();return{...e,credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...e.headers||{}}}},P=e=>{var n;let{isOpen:r,onClose:s,total:d,subtotal:P,tax:L,serviceCharge:T=0,takeawayCharge:I=0,discountAmount:O=0,couponDiscount:R=0,onConfirmPayment:N,paymentMethods:q,taxRate:U=6,serviceChargeRate:G=10,taxEnabled:V=!0,serviceChargeEnabled:Y=!1,cashierName:Z,customerId:H,restaurantId:K,customerPoints:Q=0,customerTier:J="Bronze",membershipSettings:W,selectedCustomerId:X,onPointsChange:ee}=e;const{operationSettings:ne}=(0,l.Pj)(),[re,te]=(0,t.useState)(0),[ie,oe]=(0,t.useState)("Bronze"),[se,ae]=(0,t.useState)(null),[le,de]=(0,t.useState)(!1),ce=H?re:Q,pe=H?ie:J,ue=H&&!W?se:W;(0,t.useEffect)(()=>{if(!r||!H||!K)return;(async()=>{de(!0);try{if(!W){const e=await fetch(`/api/membership/settings/${K}`,$()),n=await e.json();n.success&&n.data&&ae(n.data)}const e=await fetch(`/api/membership/customer/${K}/${H}`,$()),n=await e.json();n.success&&n.data&&(te(n.data.points||0),oe(n.data.loyalty_tier||"Bronze"))}catch(e){console.error("PaymentModal: Failed to fetch membership data:",e)}finally{de(!1)}})()},[r,H,K,W]);const[he,xe]=(0,t.useState)(!1),[ge,me]=(0,t.useState)(0),[ve,je]=(0,t.useState)(0),ye=t.useMemo(()=>{if(!ue||!ue.is_active||ce<=0)return 0;const e=ue.min_points_to_use||100,n=parseFloat(ue.max_points_per_order_percent)||50,r=parseFloat(ue.points_to_currency)||100,t=n/100*(P-O-R),i=Math.floor(t*r),o=Math.min(ce,i);return ce<e?0:o},[ue,ce,P,O,R]);(0,t.useEffect)(()=>{if(ue&&ge>0){const e=parseFloat(ue.points_to_currency)||100,n=ge/e;je(n),null===ee||void 0===ee||ee(ge,n)}else je(0),null===ee||void 0===ee||ee(0,0)},[ge,ue,ee]),(0,t.useEffect)(()=>{r||(xe(!1),me(0),je(0),te(0),oe("Bronze"),ae(null))},[r]);const fe=d-ve,be=(()=>{if(!q)return[];const e=q._order,n=Object.keys(q).filter(e=>"_order"!==e),r=e&&Array.isArray(e)?e.filter(e=>"_order"!==e):n,t=n.filter(e=>!r.includes(e)),i=[...r,...t],o=[];return i.forEach(e=>{const n=q[e];n&&n.enabled&&n.availableIn&&n.availableIn.includes("pos")&&o.push({key:e,label:n.label})}),o})(),[Fe,we]=(0,t.useState)((null===(n=be[0])||void 0===n?void 0:n.key)||"cash");(0,t.useEffect)(()=>{be.length>0&&!be.find(e=>e.key===Fe)&&we(be[0].key)},[q]);const[ke,_e]=(0,t.useState)(""),[Ce,Ae]=(0,t.useState)("");(0,t.useEffect)(()=>{be.length>0&&(Fe&&be.find(e=>e.key===Fe)||we(be[0].key))},[be,Fe]);const Se=()=>{const e=parseFloat(ke)||0;return Math.max(0,e-fe)},Be=(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i.yl,{variant:"secondary",onClick:s,children:"Cancel"}),(0,c.jsx)(i.yl,{variant:"primary",onClick:()=>{if("cash"===Fe){const e=parseFloat(ke)||0;e>=fe&&N(Fe,e,Se(),ge,ve)}else"card"===Fe?N(Fe,void 0,void 0,ge,ve,Ce):"staffMeal"===Fe?N(Fe,void 0,void 0,0,0):N(Fe,void 0,void 0,ge,ve)},disabled:!(()=>{if(!q||0===be.length)return!1;if("cash"===Fe){return(parseFloat(ke)||0)>=fe}return!0})(),children:"Confirm Payment"})]});return(0,c.jsxs)(i.aF,{isOpen:r,onClose:s,title:"Payment",footer:Be,children:[(0,c.jsxs)(p,{children:[Z&&(0,c.jsxs)(u,{children:[(0,c.jsx)(h,{children:"Cashier"}),(0,c.jsx)(x,{children:Z})]}),(0,c.jsxs)(u,{children:[(0,c.jsx)(h,{children:"Subtotal"}),(0,c.jsx)(x,{children:(0,a.vv)(P,ne.currency)})]}),I>0&&(0,c.jsxs)(u,{children:[(0,c.jsx)(h,{children:"Takeaway Charge"}),(0,c.jsx)(x,{children:(0,a.vv)(I,ne.currency)})]}),O>0&&(0,c.jsxs)(F,{children:[(0,c.jsx)(h,{children:"Discount"}),(0,c.jsx)(x,{children:(0,a.vv)(-O,ne.currency)})]}),R>0&&(0,c.jsxs)(F,{children:[(0,c.jsx)(h,{children:"Coupon Discount"}),(0,c.jsx)(x,{children:(0,a.vv)(-R,ne.currency)})]}),ve>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(h,{children:["Points Discount (",ge.toLocaleString()," pts)"]}),(0,c.jsx)(x,{children:(0,a.vv)(-ve,ne.currency)})]}),Y&&T>0&&(0,c.jsxs)(u,{children:[(0,c.jsxs)(h,{children:["Service Charge (",G,"%)"]}),(0,c.jsx)(x,{children:(0,a.vv)(T,ne.currency)})]}),V&&L>0&&(0,c.jsxs)(u,{children:[(0,c.jsxs)(h,{children:["Tax (",U,"%)"]}),(0,c.jsx)(x,{children:(0,a.vv)(L,ne.currency)})]})]}),(0,c.jsxs)(o.i_,{children:[(0,c.jsx)(o.nJ,{children:"Total Amount"}),(0,c.jsx)(o.aX,{children:(0,a.vv)(fe,ne.currency)})]}),le&&H&&(0,c.jsx)(w,{children:(0,c.jsx)(k,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)(_,{children:"Loading Points..."}),(0,c.jsx)(C,{children:"Please wait"})]})})}),!le&&(null===ue||void 0===ue?void 0:ue.is_active)&&(ce>0||X||H)&&(0,c.jsxs)(w,{children:[(0,c.jsxs)(k,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(_,{children:"Available Points"}),(0,c.jsxs)(C,{children:[pe," Member"]})]}),(0,c.jsxs)(A,{children:[ce.toLocaleString()," pts"]})]}),ye>0?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)("input",{type:"checkbox",checked:he,onChange:e=>{xe(e.target.checked),e.target.checked?me(ye):me(0)}}),(0,c.jsx)("span",{children:"Use points for this order"})]}),he&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:[(0,c.jsxs)("span",{children:[(null===ue||void 0===ue?void 0:ue.min_points_to_use)||100," pts"]}),(0,c.jsxs)("span",{children:[ye.toLocaleString()," pts (max)"]})]}),(0,c.jsx)(B,{type:"range",min:(null===ue||void 0===ue?void 0:ue.min_points_to_use)||100,max:ye,value:ge,onChange:e=>me(Number(e.target.value))}),(0,c.jsxs)(z,{children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)(M,{children:["Using: ",ge.toLocaleString()," pts"]}),(0,c.jsxs)(E,{children:["(",(null===ue||void 0===ue?void 0:ue.points_to_currency)||100," pts = ",(0,a.vv)(1,ne.currency),")"]})]}),(0,c.jsxs)(D,{children:["-",(0,a.vv)(ve,ne.currency)]})]})]})]}):(0,c.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center",padding:"12px"},children:["Minimum ",(null===ue||void 0===ue?void 0:ue.min_points_to_use)||100," points required to use"]}),(null===ue||void 0===ue?void 0:ue.points_per_currency)&&(0,c.jsx)("div",{style:{marginTop:"12px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:(()=>{const e="VIP"===pe?parseFloat(ue.vip_bonus_rate):"Gold"===pe?parseFloat(ue.gold_bonus_rate):"Silver"===pe?parseFloat(ue.silver_bonus_rate):parseFloat(ue.bronze_bonus_rate),n=P-O-R-ve,r=Math.floor(n*parseFloat(ue.points_per_currency)*e),t=r/parseFloat(ue.points_to_currency);return(0,c.jsxs)(c.Fragment,{children:["You will earn approximately ",(0,c.jsx)("strong",{children:r.toLocaleString()})," pts"," ","(",(0,a.vv)(t,ne.currency)," value) from this order","Bronze"!==pe&&` (${pe} ${e}x bonus)`]})})()})]}),!le&&(null===ue||void 0===ue?void 0:ue.is_active)&&(H||X)&&0===ce&&(null===ue||void 0===ue?void 0:ue.points_per_currency)&&(0,c.jsx)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F0FDF4",borderRadius:"8px",fontSize:"13px",color:"#166534",border:"1px solid #BBF7D0"},children:(()=>{const e=P-O-R,n=Math.floor(e*parseFloat(ue.points_per_currency)),r=n/parseFloat(ue.points_to_currency);return(0,c.jsxs)(c.Fragment,{children:["Members earn: ",(0,c.jsx)("strong",{children:n.toLocaleString()})," pts"," ","(",(0,a.vv)(r,ne.currency)," value)"]})})()}),(0,c.jsxs)(o.wn,{children:[(0,c.jsx)(i.lR,{children:"Payment Method"}),q?0===be.length?(0,c.jsx)("div",{style:{color:"#E25950",fontSize:"14px",padding:"12px 0"},children:"No payment methods enabled for POS. Please configure in Settings \u2192 Payment."}):(0,c.jsx)(o.z6,{children:be.map(e=>(0,c.jsx)(o.a,{selected:Fe===e.key,onClick:()=>{we(e.key),Ae("")},children:(0,c.jsx)("div",{children:e.label})},e.key))}):(0,c.jsx)("div",{style:{color:"#6B7C93",fontSize:"14px",padding:"12px 0"},children:"Loading payment methods..."})]}),"card"===Fe&&(0,c.jsxs)(g,{children:[(0,c.jsx)(i.lR,{children:"Card Type (Optional)"}),(0,c.jsx)(v,{children:["visa","master","amex","other"].map(e=>(0,c.jsx)(j,{selected:Ce===e,onClick:()=>Ae(Ce===e?"":e),children:"visa"===e?"Visa":"master"===e?"Master":"amex"===e?"Amex":"Other"},e))})]}),"staffMeal"===Fe&&(0,c.jsx)("div",{style:{background:"#FFF7ED",border:"1px solid #FDBA74",borderRadius:"8px",padding:"12px 16px",fontSize:"13px",color:"#9A3412",lineHeight:"1.5"},children:"Staff meal is recorded at full price but excluded from revenue reports."}),"cash"===Fe&&(0,c.jsxs)(g,{children:[(0,c.jsx)(i.lR,{children:"Cash Amount"}),(0,c.jsx)(m,{type:"text",placeholder:"Enter amount received",value:ke,onChange:e=>(e=>{const n=e.replace(/[^0-9.]/g,"");_e(n)})(e.target.value),autoFocus:!0}),(0,c.jsx)(v,{children:[50,100,150,200].map(e=>(0,c.jsx)(j,{selected:ke===e.toString(),onClick:()=>_e(e.toString()),children:(0,a.vv)(e,ne.currency)},e))}),parseFloat(ke)>=fe&&(0,c.jsxs)(y,{children:[(0,c.jsx)(f,{children:"Change"}),(0,c.jsx)(b,{children:(0,a.vv)(Se(),ne.currency)})]})]})]})}},8406:(e,n,r)=>{r.d(n,{MQ:()=>l,Vp:()=>a,fU:()=>o,ng:()=>t,oB:()=>s,r6:()=>i});const t=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",i=(e,n,r)=>{if(!e)return"";const i=new Date(e);if(isNaN(i.getTime()))return"";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:t(n)};return i.toLocaleString("en-MY",{...o,...r})},o=(e,n)=>i(e,n,{year:void 0,month:void 0,day:void 0}),s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const n=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(n)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const r=new Date;r.setDate(r.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:n,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const n=new Date;return n.setDate(n.getDate()+e),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}},l=e=>{if(!e)return"just now";const n=new Date(e).getTime();if(isNaN(n))return"just now";const r=Date.now()-n,t=Math.floor(r/6e4),i=Math.floor(r/36e5),o=Math.floor(r/864e5);return t<1?"just now":1===t?"1 min ago":t<60?`${t} mins ago`:1===i?"1 hour ago":i<24?`${i} hours ago`:1===o?"1 day ago":`${o} days ago`}},9189:(e,n,r)=>{r.d(n,{A:()=>c});var t=r(9950),i=r(8930),o=r(9610),s=r(2159),a=r(6038),l=r(9018),d=r(4414);const c=e=>{let{isOpen:n,onClose:r,menuItem:c,onConfirm:p}=e;const{optionGroups:u}=(0,i.b)(),{operationSettings:h}=(0,l.Pj)(),[x,g]=(0,t.useState)(1),[m,v]=(0,t.useState)([]),j=c.optionGroups?c.optionGroups.map(e=>u.find(n=>n.id===e)).filter(e=>void 0!==e):[],y=(e,n,r,t)=>{if(r)v(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e]);else{const r=j.find(e=>e.id===n);if(r){const n=r.options.map(e=>e.id),i=m.includes(e);v(i&&!t?e=>e.filter(e=>!n.includes(e)):r=>[...r.filter(e=>!n.includes(e)),e])}}},f=()=>j.filter(e=>e.required).every(e=>m.some(n=>e.options.some(e=>e.id===n))),b=()=>{g(1),v([]),r()},F=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o.yl,{variant:"secondary",onClick:b,children:"Cancel"}),(0,d.jsx)(o.yl,{variant:"primary",onClick:()=>{if(f()){const e=m.map(e=>{const n=j.flatMap(e=>e.options).find(n=>n.id===e);return n?n.name:""}).filter(Boolean),n=m.map(e=>{const n=j.flatMap(e=>e.options).find(n=>n.id===e);return n?{id:n.id,name:n.name,price:n.price}:null}).filter(e=>null!==e);p(x,e,n),g(1),v([])}},disabled:!f(),children:"Add to Order"})]});return(0,d.jsxs)(o.aF,{isOpen:n,onClose:b,title:"Customize Order",footer:F,children:[(0,d.jsxs)(s.kr,{children:[(0,d.jsx)(s.hO,{style:{backgroundImage:c.image?`url(${c.image})`:"none",backgroundSize:"cover",backgroundPosition:"center",fontSize:c.image?"0":"32px"},children:!c.image&&c.emoji}),(0,d.jsxs)(s.iz,{children:[(0,d.jsx)(s.bU,{children:c.name}),(0,d.jsx)(s.NM,{children:(0,a.vv)(c.price,h.currency)})]})]}),j.map(e=>(0,d.jsxs)(s.wn,{children:[(0,d.jsxs)(o.lR,{children:[e.name,e.required&&(0,d.jsx)(s.I1,{children:"*"})]}),e.multiple?(0,d.jsx)(s.$Q,{children:e.options.map(n=>(0,d.jsxs)(s.Sb,{children:[(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,d.jsx)(s.Oc,{type:"checkbox",checked:m.includes(n.id),onChange:()=>y(n.id,e.id,e.multiple,e.required)}),(0,d.jsx)(s.PU,{children:n.name})]}),n.price>0&&(0,d.jsxs)(s.jj,{children:["+",(0,a.vv)(n.price,h.currency)]})]},n.id))}):(0,d.jsx)(s.z6,{children:e.options.map(n=>(0,d.jsxs)(s.a,{selected:m.includes(n.id),onClick:()=>y(n.id,e.id,e.multiple,e.required),style:"spice"===e.id&&m.includes(n.id)?{borderColor:"#F97316",backgroundColor:"rgba(249, 115, 22, 0.1)",color:"#EA580C"}:{},children:[(0,d.jsx)("div",{children:n.name}),n.price>0&&(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:["+",(0,a.vv)(n.price,h.currency)]})]},n.id))})]},e.id)),(0,d.jsxs)(s.wn,{children:[(0,d.jsx)(o.lR,{children:"Quantity"}),(0,d.jsxs)(s.F8,{children:[(0,d.jsx)(s.ey,{onClick:()=>g(Math.max(1,x-1)),disabled:x<=1,children:(0,d.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("path",{d:"M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),(0,d.jsx)(s.FA,{children:x}),(0,d.jsx)(s.ey,{onClick:()=>g(x+1),children:(0,d.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("path",{d:"M7 3V11M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]})]}),(0,d.jsxs)(s.i_,{children:[(0,d.jsx)(s.nJ,{children:"Total:"}),(0,d.jsx)(s.aX,{children:(0,a.vv)((()=>{let e=c.price*x;return m.forEach(n=>{const r=j.flatMap(e=>e.options).find(e=>e.id===n);r&&(e+=r.price*x)}),e})(),h.currency)})]})]})}}}]);