"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1323],{2159:(e,t,n)=>{n.d(t,{$Q:()=>l,F8:()=>u,FA:()=>g,I1:()=>i,NM:()=>w,Oc:()=>d,PU:()=>p,Sb:()=>c,a:()=>a,aX:()=>f,bU:()=>F,ey:()=>h,hO:()=>j,i_:()=>m,iz:()=>b,jj:()=>x,kr:()=>v,nJ:()=>y,wn:()=>o,z6:()=>s});var r=n(4752);const i=r.Ay.span`
  color: #EF4444;
  margin-left: 4px;
`,o=r.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,s=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`,a=r.Ay.button`
  padding: 12px 16px;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  background: ${e=>e.selected?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${e=>e.selected?"#635BFF":"#374151"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;

  &:hover {
    border-color: ${e=>e.selected?"#635BFF":"#D1D5DB"};
    background: ${e=>e.selected?"rgba(99, 91, 255, 0.1)":"#F9FAFB"};
  }
`,l=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,c=r.Ay.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  min-height: 44px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
`,d=r.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`,p=r.Ay.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`,x=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,u=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`,h=r.Ay.button`
  width: 40px;
  height: 40px;
  border: 1px solid #D1D5DB;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F9FAFB;
    border-color: #9CA3AF;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: white;
      border-color: #D1D5DB;
    }
  }
`,g=r.Ay.span`
  font-size: 18px;
  font-weight: 600;
  width: 40px;
  text-align: center;
  color: #1F2937;
`,m=r.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding: 16px 0 0 0;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,y=r.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,f=r.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`,v=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`,j=r.Ay.div`
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,b=r.Ay.div``,F=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,w=r.Ay.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`},2966:(e,t,n)=>{n.d(t,{A:()=>$});var r=n(9950),i=n(9610),o=n(2159),s=n(4752),a=n(6038),l=n(9018),c=n(4414);const d=s.Ay.div`
  background: linear-gradient(to bottom, #F8FAFC, #F1F5F9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,p=s.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`,x=s.Ay.span`
  color: #6B7280;
`,u=s.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,h=s.Ay.div`
  margin-bottom: 20px;
`,g=s.Ay.input`
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
`,m=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
`,y=s.Ay.button`
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
`,f=s.Ay.div`
  background: #F0FDF4;
  border: 1px solid #86EFAC;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 16px;
`,v=s.Ay.div`
  font-size: 14px;
  color: #059669;
  margin-bottom: 4px;
`,j=s.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #047857;
`,b=(0,s.Ay)(p)`
  color: #10B981;
`,F=s.Ay.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,w=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 12px;
`,A=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,k=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,_=s.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,B=s.Ay.label`
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
`,C=s.Ay.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #E5E7EB;
  accent-color: #635BFF;
  cursor: pointer;
`,S=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 12px;
  background: #EFF6FF;
  border-radius: 8px;
`,z=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,D=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,E=s.Ay.div`
  font-weight: 700;
  color: #059669;
  font-size: 16px;
`,M=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},$=e=>{var t;let{isOpen:n,onClose:s,total:$,subtotal:P,tax:T,serviceCharge:I=0,takeawayCharge:L=0,discountAmount:O=0,couponDiscount:R=0,onConfirmPayment:N,paymentMethods:U,taxRate:q=6,serviceChargeRate:G=10,taxEnabled:Q=!0,serviceChargeEnabled:Y=!1,customerId:Z,restaurantId:J,customerPoints:K=0,customerTier:V="Bronze",membershipSettings:W,onPointsChange:X}=e;const{operationSettings:H}=(0,l.Pj)(),[ee,te]=(0,r.useState)(0),[ne,re]=(0,r.useState)("Bronze"),[ie,oe]=(0,r.useState)(null),[se,ae]=(0,r.useState)(!1),le=Z?ee:K,ce=Z?ne:V,de=Z&&!W?ie:W;(0,r.useEffect)(()=>{if(!n||!Z||!J)return;(async()=>{ae(!0);try{if(!W){const e=await fetch(`/api/membership/settings/${J}`,M()),t=await e.json();t.success&&t.data&&oe(t.data)}const e=await fetch(`/api/membership/customer/${J}/${Z}`,M()),t=await e.json();t.success&&t.data&&(te(t.data.points||0),re(t.data.loyalty_tier||"Bronze"))}catch(e){console.error("PaymentModal: Failed to fetch membership data:",e)}finally{ae(!1)}})()},[n,Z,J,W]);const[pe,xe]=(0,r.useState)(!1),[ue,he]=(0,r.useState)(0),[ge,me]=(0,r.useState)(0),ye=r.useMemo(()=>{if(!de||!de.is_active||le<=0)return 0;const e=de.min_points_to_use||100,t=parseFloat(de.max_points_per_order_percent)||50,n=parseFloat(de.points_to_currency)||100,r=t/100*(P-O-R),i=Math.floor(r*n),o=Math.min(le,i);return le<e?0:o},[de,le,P,O,R]);(0,r.useEffect)(()=>{if(de&&ue>0){const e=parseFloat(de.points_to_currency)||100,t=ue/e;me(t),null===X||void 0===X||X(ue,t)}else me(0),null===X||void 0===X||X(0,0)},[ue,de,X]),(0,r.useEffect)(()=>{n||(xe(!1),he(0),me(0),te(0),re("Bronze"),oe(null))},[n]);const fe=$-ge,ve=(()=>{if(!U)return[{key:"cash",label:"Cash"},{key:"card",label:"Card"},{key:"ewallet",label:"E-Wallet"},{key:"bankTransfer",label:"Bank Transfer"}];const e=U._order,t=e&&Array.isArray(e)?e.filter(e=>"_order"!==e):["cash","card","ewallet","bankTransfer"],n=[];return t.forEach(e=>{const t=U[e];t&&t.enabled&&t.availableIn&&t.availableIn.includes("pos")&&n.push({key:e,label:t.label})}),n})(),[je,be]=(0,r.useState)((null===(t=ve[0])||void 0===t?void 0:t.key)||"cash"),[Fe,we]=(0,r.useState)("");(0,r.useEffect)(()=>{ve.length>0&&(je&&ve.find(e=>e.key===je)||be(ve[0].key))},[ve,je]);const Ae=()=>{const e=parseFloat(Fe)||0;return Math.max(0,e-fe)},ke=(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i.yl,{variant:"secondary",onClick:s,children:"Cancel"}),(0,c.jsx)(i.yl,{variant:"primary",onClick:()=>{if("cash"===je){const e=parseFloat(Fe)||0;e>=fe&&N(je,e,Ae(),ue,ge)}else N(je,void 0,void 0,ue,ge)},disabled:!(()=>{if("cash"===je){return(parseFloat(Fe)||0)>=fe}return!0})(),children:"Confirm Payment"})]});return(0,c.jsxs)(i.aF,{isOpen:n,onClose:s,title:"Payment",footer:ke,children:[(0,c.jsxs)(d,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Subtotal"}),(0,c.jsx)(u,{children:(0,a.vv)(P,H.currency)})]}),L>0&&(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Takeaway Charge"}),(0,c.jsx)(u,{children:(0,a.vv)(L,H.currency)})]}),O>0&&(0,c.jsxs)(b,{children:[(0,c.jsx)(x,{children:"Discount"}),(0,c.jsx)(u,{children:(0,a.vv)(-O,H.currency)})]}),R>0&&(0,c.jsxs)(b,{children:[(0,c.jsx)(x,{children:"Coupon Discount"}),(0,c.jsx)(u,{children:(0,a.vv)(-R,H.currency)})]}),ge>0&&(0,c.jsxs)(b,{children:[(0,c.jsxs)(x,{children:["Points Discount (",ue.toLocaleString()," pts)"]}),(0,c.jsx)(u,{children:(0,a.vv)(-ge,H.currency)})]}),Y&&I>0&&(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:["Service Charge (",G,"%)"]}),(0,c.jsx)(u,{children:(0,a.vv)(I,H.currency)})]}),Q&&T>0&&(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:["Tax (",q,"%)"]}),(0,c.jsx)(u,{children:(0,a.vv)(T,H.currency)})]})]}),(0,c.jsxs)(o.i_,{children:[(0,c.jsx)(o.nJ,{children:"Total Amount"}),(0,c.jsx)(o.aX,{children:(0,a.vv)(fe,H.currency)})]}),se&&Z&&(0,c.jsx)(F,{children:(0,c.jsx)(w,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)(A,{children:"Loading Points..."}),(0,c.jsx)(k,{children:"Please wait"})]})})}),!se&&(null===de||void 0===de?void 0:de.is_active)&&le>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(w,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(A,{children:"Available Points"}),(0,c.jsxs)(k,{children:[ce," Member"]})]}),(0,c.jsxs)(_,{children:[le.toLocaleString()," pts"]})]}),ye>0?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(B,{children:[(0,c.jsx)("input",{type:"checkbox",checked:pe,onChange:e=>{xe(e.target.checked),e.target.checked?he(ye):he(0)}}),(0,c.jsx)("span",{children:"Use points for this order"})]}),pe&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:[(0,c.jsxs)("span",{children:[(null===de||void 0===de?void 0:de.min_points_to_use)||100," pts"]}),(0,c.jsxs)("span",{children:[ye.toLocaleString()," pts (max)"]})]}),(0,c.jsx)(C,{type:"range",min:(null===de||void 0===de?void 0:de.min_points_to_use)||100,max:ye,value:ue,onChange:e=>he(Number(e.target.value))}),(0,c.jsxs)(S,{children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)(z,{children:["Using: ",ue.toLocaleString()," pts"]}),(0,c.jsxs)(D,{children:["(",(null===de||void 0===de?void 0:de.points_to_currency)||100," pts = ",(0,a.vv)(1,H.currency),")"]})]}),(0,c.jsxs)(E,{children:["-",(0,a.vv)(ge,H.currency)]})]})]})]}):(0,c.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center",padding:"12px"},children:["Minimum ",(null===de||void 0===de?void 0:de.min_points_to_use)||100," points required to use"]}),(null===de||void 0===de?void 0:de.points_per_currency)&&(0,c.jsx)("div",{style:{marginTop:"12px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:(()=>{const e="VIP"===ce?parseFloat(de.vip_bonus_rate):"Gold"===ce?parseFloat(de.gold_bonus_rate):"Silver"===ce?parseFloat(de.silver_bonus_rate):parseFloat(de.bronze_bonus_rate),t=P-O-R-ge,n=Math.floor(t*parseFloat(de.points_per_currency)*e),r=n/parseFloat(de.points_to_currency);return(0,c.jsxs)(c.Fragment,{children:["You will earn approximately ",(0,c.jsx)("strong",{children:n.toLocaleString()})," pts"," ","(",(0,a.vv)(r,H.currency)," value) from this order","Bronze"!==ce&&` (${ce} ${e}x bonus)`]})})()})]}),!se&&(null===de||void 0===de?void 0:de.is_active)&&Z&&0===le&&(null===de||void 0===de?void 0:de.points_per_currency)&&(0,c.jsx)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F0FDF4",borderRadius:"8px",fontSize:"13px",color:"#166534",border:"1px solid #BBF7D0"},children:(()=>{const e=P-O-R,t=Math.floor(e*parseFloat(de.points_per_currency)),n=t/parseFloat(de.points_to_currency);return(0,c.jsxs)(c.Fragment,{children:["Members earn: ",(0,c.jsx)("strong",{children:t.toLocaleString()})," pts"," ","(",(0,a.vv)(n,H.currency)," value)"]})})()}),(0,c.jsxs)(o.wn,{children:[(0,c.jsx)(i.lR,{children:"Payment Method"}),(0,c.jsx)(o.z6,{children:ve.map(e=>(0,c.jsx)(o.a,{selected:je===e.key,onClick:()=>be(e.key),children:(0,c.jsx)("div",{children:e.label})},e.key))})]}),"cash"===je&&(0,c.jsxs)(h,{children:[(0,c.jsx)(i.lR,{children:"Cash Amount"}),(0,c.jsx)(g,{type:"text",placeholder:"Enter amount received",value:Fe,onChange:e=>(e=>{const t=e.replace(/[^0-9.]/g,"");we(t)})(e.target.value),autoFocus:!0}),(0,c.jsx)(m,{children:[50,100,150,200].map(e=>(0,c.jsx)(y,{selected:Fe===e.toString(),onClick:()=>we(e.toString()),children:(0,a.vv)(e,H.currency)},e))}),parseFloat(Fe)>=fe&&(0,c.jsxs)(f,{children:[(0,c.jsx)(v,{children:"Change"}),(0,c.jsx)(j,{children:(0,a.vv)(Ae(),H.currency)})]})]})]})}},8406:(e,t,n)=>{n.d(t,{MQ:()=>l,Vp:()=>a,fU:()=>o,ng:()=>r,oB:()=>s,r6:()=>i});const r=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",i=(e,t,n)=>{if(!e)return"";const i=new Date(e);if(isNaN(i.getTime()))return"";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:r(t)};return i.toLocaleString("en-MY",{...o,...n})},o=(e,t)=>i(e,t,{year:void 0,month:void 0,day:void 0}),s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const n=new Date;n.setDate(n.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(n)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},l=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const n=Date.now()-t,r=Math.floor(n/6e4),i=Math.floor(n/36e5),o=Math.floor(n/864e5);return r<1?"just now":1===r?"1 min ago":r<60?`${r} mins ago`:1===i?"1 hour ago":i<24?`${i} hours ago`:1===o?"1 day ago":`${o} days ago`}},9189:(e,t,n)=>{n.d(t,{A:()=>d});var r=n(9950),i=n(8930),o=n(9610),s=n(2159),a=n(6038),l=n(9018),c=n(4414);const d=e=>{let{isOpen:t,onClose:n,menuItem:d,onConfirm:p}=e;const{optionGroups:x}=(0,i.b)(),{operationSettings:u}=(0,l.Pj)(),[h,g]=(0,r.useState)(1),[m,y]=(0,r.useState)([]),f=d.optionGroups?d.optionGroups.map(e=>x.find(t=>t.id===e)).filter(e=>void 0!==e):[],v=(e,t,n,r)=>{if(n)y(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);else{const n=f.find(e=>e.id===t);if(n){const t=n.options.map(e=>e.id),i=m.includes(e);y(i&&!r?e=>e.filter(e=>!t.includes(e)):n=>[...n.filter(e=>!t.includes(e)),e])}}},j=()=>f.filter(e=>e.required).every(e=>m.some(t=>e.options.some(e=>e.id===t))),b=()=>{g(1),y([]),n()},F=(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o.yl,{variant:"secondary",onClick:b,children:"Cancel"}),(0,c.jsx)(o.yl,{variant:"primary",onClick:()=>{if(j()){const e=m.map(e=>{const t=f.flatMap(e=>e.options).find(t=>t.id===e);return t?t.name:""}).filter(Boolean),t=m.map(e=>{const t=f.flatMap(e=>e.options).find(t=>t.id===e);return t?{id:t.id,name:t.name,price:t.price}:null}).filter(e=>null!==e);p(h,e,t),g(1),y([])}},disabled:!j(),children:"Add to Order"})]});return(0,c.jsxs)(o.aF,{isOpen:t,onClose:b,title:"Customize Order",footer:F,children:[(0,c.jsxs)(s.kr,{children:[(0,c.jsx)(s.hO,{style:{backgroundImage:d.image?`url(${d.image})`:"none",backgroundSize:"cover",backgroundPosition:"center",fontSize:d.image?"0":"32px"},children:!d.image&&d.emoji}),(0,c.jsxs)(s.iz,{children:[(0,c.jsx)(s.bU,{children:d.name}),(0,c.jsx)(s.NM,{children:(0,a.vv)(d.price,u.currency)})]})]}),f.map(e=>(0,c.jsxs)(s.wn,{children:[(0,c.jsxs)(o.lR,{children:[e.name,e.required&&(0,c.jsx)(s.I1,{children:"*"})]}),e.multiple?(0,c.jsx)(s.$Q,{children:e.options.map(t=>(0,c.jsxs)(s.Sb,{children:[(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,c.jsx)(s.Oc,{type:"checkbox",checked:m.includes(t.id),onChange:()=>v(t.id,e.id,e.multiple,e.required)}),(0,c.jsx)(s.PU,{children:t.name})]}),t.price>0&&(0,c.jsxs)(s.jj,{children:["+",(0,a.vv)(t.price,u.currency)]})]},t.id))}):(0,c.jsx)(s.z6,{children:e.options.map(t=>(0,c.jsxs)(s.a,{selected:m.includes(t.id),onClick:()=>v(t.id,e.id,e.multiple,e.required),style:"spice"===e.id&&m.includes(t.id)?{borderColor:"#F97316",backgroundColor:"rgba(249, 115, 22, 0.1)",color:"#EA580C"}:{},children:[(0,c.jsx)("div",{children:t.name}),t.price>0&&(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:["+",(0,a.vv)(t.price,u.currency)]})]},t.id))})]},e.id)),(0,c.jsxs)(s.wn,{children:[(0,c.jsx)(o.lR,{children:"Quantity"}),(0,c.jsxs)(s.F8,{children:[(0,c.jsx)(s.ey,{onClick:()=>g(Math.max(1,h-1)),disabled:h<=1,children:(0,c.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,c.jsx)("path",{d:"M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),(0,c.jsx)(s.FA,{children:h}),(0,c.jsx)(s.ey,{onClick:()=>g(h+1),children:(0,c.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,c.jsx)("path",{d:"M7 3V11M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]})]}),(0,c.jsxs)(s.i_,{children:[(0,c.jsx)(s.nJ,{children:"Total:"}),(0,c.jsx)(s.aX,{children:(0,a.vv)((()=>{let e=d.price*h;return m.forEach(t=>{const n=f.flatMap(e=>e.options).find(e=>e.id===t);n&&(e+=n.price*h)}),e})(),u.currency)})]})]})}}}]);