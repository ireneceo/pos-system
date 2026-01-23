"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6401],{2159:(e,t,n)=>{n.d(t,{$Q:()=>d,F8:()=>E,FA:()=>g,I1:()=>r,NM:()=>N,Oc:()=>c,PU:()=>p,Sb:()=>l,a:()=>a,aX:()=>y,bU:()=>F,ey:()=>h,hO:()=>b,i_:()=>m,iz:()=>v,jj:()=>u,kr:()=>f,nJ:()=>x,wn:()=>o,z6:()=>s});var i=n(4752);const r=i.Ay.span`
  color: #EF4444;
  margin-left: 4px;
`,o=i.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,s=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`,a=i.Ay.button`
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
`,d=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,l=i.Ay.label`
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
`,c=i.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`,p=i.Ay.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`,u=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,E=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`,h=i.Ay.button`
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
`,g=i.Ay.span`
  font-size: 18px;
  font-weight: 600;
  width: 40px;
  text-align: center;
  color: #1F2937;
`,m=i.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding: 16px 0 0 0;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,x=i.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,y=i.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`,f=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`,b=i.Ay.div`
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,v=i.Ay.div``,F=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,N=i.Ay.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`},2966:(e,t,n)=>{n.d(t,{A:()=>C});var i=n(9950),r=n(9610),o=n(2159),s=n(4752),a=n(6038),d=n(9018),l=n(4414);const c=s.Ay.div`
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
`,u=s.Ay.span`
  color: #6B7280;
`,E=s.Ay.span`
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
`,x=s.Ay.button`
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
`,v=(0,s.Ay)(p)`
  color: #10B981;
`,F=s.Ay.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,N=s.Ay.div`
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
`,D=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,L=s.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,I=s.Ay.label`
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
`,T=s.Ay.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #E5E7EB;
  accent-color: #635BFF;
  cursor: pointer;
`,w=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 12px;
  background: #EFF6FF;
  border-radius: 8px;
`,A=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,O=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,k=s.Ay.div`
  font-weight: 700;
  color: #059669;
  font-size: 16px;
`,j=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},C=e=>{var t;let{isOpen:n,onClose:s,total:C,subtotal:B,tax:$,serviceCharge:P=0,takeawayCharge:R=0,discountAmount:S=0,couponDiscount:z=0,onConfirmPayment:M,paymentMethods:U,taxRate:X=6,serviceChargeRate:G=10,taxEnabled:H=!0,serviceChargeEnabled:Y=!1,customerId:K,restaurantId:W,customerPoints:q=0,customerTier:V="Bronze",membershipSettings:Z,onPointsChange:J}=e;const{operationSettings:Q}=(0,d.Pj)(),[ee,te]=(0,i.useState)(0),[ne,ie]=(0,i.useState)("Bronze"),[re,oe]=(0,i.useState)(null),[se,ae]=(0,i.useState)(!1),de=K?ee:q,le=K?ne:V,ce=K&&!Z?re:Z;(0,i.useEffect)(()=>{if(!n||!K||!W)return;(async()=>{ae(!0);try{if(!Z){const e=await fetch(`/api/membership/settings/${W}`,j()),t=await e.json();t.success&&t.data&&oe(t.data)}const e=await fetch(`/api/membership/customer/${W}/${K}`,j()),t=await e.json();t.success&&t.data&&(te(t.data.points||0),ie(t.data.loyalty_tier||"Bronze"))}catch(e){console.error("PaymentModal: Failed to fetch membership data:",e)}finally{ae(!1)}})()},[n,K,W,Z]);const[pe,ue]=(0,i.useState)(!1),[Ee,he]=(0,i.useState)(0),[ge,me]=(0,i.useState)(0),xe=i.useMemo(()=>{if(!ce||!ce.is_active||de<=0)return 0;const e=ce.min_points_to_use||100,t=parseFloat(ce.max_points_per_order_percent)||50,n=parseFloat(ce.points_to_currency)||100,i=t/100*(B-S-z),r=Math.floor(i*n),o=Math.min(de,r);return de<e?0:o},[ce,de,B,S,z]);(0,i.useEffect)(()=>{if(ce&&Ee>0){const e=parseFloat(ce.points_to_currency)||100,t=Ee/e;me(t),null===J||void 0===J||J(Ee,t)}else me(0),null===J||void 0===J||J(0,0)},[Ee,ce,J]),(0,i.useEffect)(()=>{n||(ue(!1),he(0),me(0),te(0),ie("Bronze"),oe(null))},[n]);const ye=C-ge,fe=(()=>{if(!U)return[{key:"cash",label:"Cash"},{key:"card",label:"Card"},{key:"ewallet",label:"E-Wallet"},{key:"bankTransfer",label:"Bank Transfer"}];const e=U._order,t=e&&Array.isArray(e)?e.filter(e=>"_order"!==e):["cash","card","ewallet","bankTransfer"],n=[];return t.forEach(e=>{const t=U[e];t&&t.enabled&&t.availableIn&&t.availableIn.includes("pos")&&n.push({key:e,label:t.label})}),n})(),[be,ve]=(0,i.useState)((null===(t=fe[0])||void 0===t?void 0:t.key)||"cash"),[Fe,Ne]=(0,i.useState)("");(0,i.useEffect)(()=>{fe.length>0&&(be&&fe.find(e=>e.key===be)||ve(fe[0].key))},[fe,be]);const _e=()=>{const e=parseFloat(Fe)||0;return Math.max(0,e-ye)},De=(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r.yl,{variant:"secondary",onClick:s,children:"Cancel"}),(0,l.jsx)(r.yl,{variant:"primary",onClick:()=>{if("cash"===be){const e=parseFloat(Fe)||0;e>=ye&&M(be,e,_e(),Ee,ge)}else M(be,void 0,void 0,Ee,ge)},disabled:!(()=>{if("cash"===be){return(parseFloat(Fe)||0)>=ye}return!0})(),children:"Confirm Payment"})]});return(0,l.jsxs)(r.aF,{isOpen:n,onClose:s,title:"Payment",footer:De,children:[(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(u,{children:"Subtotal"}),(0,l.jsx)(E,{children:(0,a.vv)(B,Q.currency)})]}),R>0&&(0,l.jsxs)(p,{children:[(0,l.jsx)(u,{children:"Takeaway Charge"}),(0,l.jsx)(E,{children:(0,a.vv)(R,Q.currency)})]}),S>0&&(0,l.jsxs)(v,{children:[(0,l.jsx)(u,{children:"Discount"}),(0,l.jsx)(E,{children:(0,a.vv)(-S,Q.currency)})]}),z>0&&(0,l.jsxs)(v,{children:[(0,l.jsx)(u,{children:"Coupon Discount"}),(0,l.jsx)(E,{children:(0,a.vv)(-z,Q.currency)})]}),ge>0&&(0,l.jsxs)(v,{children:[(0,l.jsxs)(u,{children:["Points Discount (",Ee.toLocaleString()," pts)"]}),(0,l.jsx)(E,{children:(0,a.vv)(-ge,Q.currency)})]}),Y&&P>0&&(0,l.jsxs)(p,{children:[(0,l.jsxs)(u,{children:["Service Charge (",G,"%)"]}),(0,l.jsx)(E,{children:(0,a.vv)(P,Q.currency)})]}),H&&$>0&&(0,l.jsxs)(p,{children:[(0,l.jsxs)(u,{children:["Tax (",X,"%)"]}),(0,l.jsx)(E,{children:(0,a.vv)($,Q.currency)})]})]}),(0,l.jsxs)(o.i_,{children:[(0,l.jsx)(o.nJ,{children:"Total Amount"}),(0,l.jsx)(o.aX,{children:(0,a.vv)(ye,Q.currency)})]}),se&&K&&(0,l.jsx)(F,{children:(0,l.jsx)(N,{children:(0,l.jsxs)("div",{children:[(0,l.jsx)(_,{children:"Loading Points..."}),(0,l.jsx)(D,{children:"Please wait"})]})})}),!se&&(null===ce||void 0===ce?void 0:ce.is_active)&&de>0&&(0,l.jsxs)(F,{children:[(0,l.jsxs)(N,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(_,{children:"Available Points"}),(0,l.jsxs)(D,{children:[le," Member"]})]}),(0,l.jsxs)(L,{children:[de.toLocaleString()," pts"]})]}),xe>0?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(I,{children:[(0,l.jsx)("input",{type:"checkbox",checked:pe,onChange:e=>{ue(e.target.checked),e.target.checked?he(xe):he(0)}}),(0,l.jsx)("span",{children:"Use points for this order"})]}),pe&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:[(0,l.jsxs)("span",{children:[(null===ce||void 0===ce?void 0:ce.min_points_to_use)||100," pts"]}),(0,l.jsxs)("span",{children:[xe.toLocaleString()," pts (max)"]})]}),(0,l.jsx)(T,{type:"range",min:(null===ce||void 0===ce?void 0:ce.min_points_to_use)||100,max:xe,value:Ee,onChange:e=>he(Number(e.target.value))}),(0,l.jsxs)(w,{children:[(0,l.jsxs)("div",{children:[(0,l.jsxs)(A,{children:["Using: ",Ee.toLocaleString()," pts"]}),(0,l.jsxs)(O,{children:["(",(null===ce||void 0===ce?void 0:ce.points_to_currency)||100," pts = ",(0,a.vv)(1,Q.currency),")"]})]}),(0,l.jsxs)(k,{children:["-",(0,a.vv)(ge,Q.currency)]})]})]})]}):(0,l.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center",padding:"12px"},children:["Minimum ",(null===ce||void 0===ce?void 0:ce.min_points_to_use)||100," points required to use"]}),(null===ce||void 0===ce?void 0:ce.points_per_currency)&&(0,l.jsx)("div",{style:{marginTop:"12px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:(()=>{const e="VIP"===le?parseFloat(ce.vip_bonus_rate):"Gold"===le?parseFloat(ce.gold_bonus_rate):"Silver"===le?parseFloat(ce.silver_bonus_rate):parseFloat(ce.bronze_bonus_rate),t=B-S-z-ge,n=Math.floor(t*parseFloat(ce.points_per_currency)*e),i=n/parseFloat(ce.points_to_currency);return(0,l.jsxs)(l.Fragment,{children:["You will earn approximately ",(0,l.jsx)("strong",{children:n.toLocaleString()})," pts"," ","(",(0,a.vv)(i,Q.currency)," value) from this order","Bronze"!==le&&` (${le} ${e}x bonus)`]})})()})]}),!se&&(null===ce||void 0===ce?void 0:ce.is_active)&&K&&0===de&&(null===ce||void 0===ce?void 0:ce.points_per_currency)&&(0,l.jsx)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F0FDF4",borderRadius:"8px",fontSize:"13px",color:"#166534",border:"1px solid #BBF7D0"},children:(()=>{const e=B-S-z,t=Math.floor(e*parseFloat(ce.points_per_currency)),n=t/parseFloat(ce.points_to_currency);return(0,l.jsxs)(l.Fragment,{children:["Members earn: ",(0,l.jsx)("strong",{children:t.toLocaleString()})," pts"," ","(",(0,a.vv)(n,Q.currency)," value)"]})})()}),(0,l.jsxs)(o.wn,{children:[(0,l.jsx)(r.lR,{children:"Payment Method"}),(0,l.jsx)(o.z6,{children:fe.map(e=>(0,l.jsx)(o.a,{selected:be===e.key,onClick:()=>ve(e.key),children:(0,l.jsx)("div",{children:e.label})},e.key))})]}),"cash"===be&&(0,l.jsxs)(h,{children:[(0,l.jsx)(r.lR,{children:"Cash Amount"}),(0,l.jsx)(g,{type:"text",placeholder:"Enter amount received",value:Fe,onChange:e=>(e=>{const t=e.replace(/[^0-9.]/g,"");Ne(t)})(e.target.value),autoFocus:!0}),(0,l.jsx)(m,{children:[50,100,150,200].map(e=>(0,l.jsx)(x,{selected:Fe===e.toString(),onClick:()=>Ne(e.toString()),children:(0,a.vv)(e,Q.currency)},e))}),parseFloat(Fe)>=ye&&(0,l.jsxs)(y,{children:[(0,l.jsx)(f,{children:"Change"}),(0,l.jsx)(b,{children:(0,a.vv)(_e(),Q.currency)})]})]})]})}},5863:(e,t,n)=>{n.d(t,{KB:()=>h,Si:()=>E,pG:()=>u,qE:()=>l});const i={INIT:"\x1b@",ALIGN_LEFT:"\x1ba\0",ALIGN_CENTER:"\x1ba\x01",ALIGN_RIGHT:"\x1ba\x02",TEXT_NORMAL:"\x1d!\0",TEXT_DOUBLE_HEIGHT:"\x1d!\x01",TEXT_DOUBLE_WIDTH:"\x1d!\x10",TEXT_DOUBLE:"\x1d!\x11",BOLD_ON:"\x1bE\x01",BOLD_OFF:"\x1bE\0",REVERSE_ON:"\x1dB\x01",REVERSE_OFF:"\x1dB\0",LINE_FEED:"\n",DASHED_LINE:"------------------------------------------------",CUT_PARTIAL:"\x1dVA\0"};function r(e){const t=new Date(e),n=new Date(t.getTime()+18e5),i=e=>{const t=e.getHours(),n=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:n}},r=i(t),o=i(n);return r.period===o.period?`${r.time} - ${o.time} ${o.period}`:`${r.time} ${r.period} - ${o.time} ${o.period}`}function o(e,t){const n=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:48)-e.length-t.length;return e+" ".repeat(Math.max(n,1))+t}function s(){const e=navigator.userAgent.toLowerCase(),t=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(e),n=/ipad|android(?!.*mobile)|tablet/i.test(e),i="ontouchstart"in window||navigator.maxTouchPoints>0,r=window.innerWidth<=1024;return t||n||i&&r}const a={MYR:"RM",USD:"$",SGD:"S$",EUR:"\u20ac",GBP:"\xa3",JPY:"\xa5",KRW:"\u20a9",THB:"\u0e3f",VND:"\u20ab",IDR:"Rp",PHP:"\u20b1",INR:"\u20b9",CNY:"\xa5",AUD:"A$",NZD:"NZ$",HKD:"HK$",TWD:"NT$"};function d(e){return a[e]||e||"RM"}function l(e,t){const n=d(e.currency);let s="";s+=i.INIT,"pickup"===e.orderType?(s+=i.ALIGN_CENTER,s+=i.TEXT_DOUBLE,s+=i.BOLD_ON,s+="** PRE-ORDER PICKUP **"+i.LINE_FEED,s+=i.BOLD_OFF,s+=i.TEXT_NORMAL,s+=i.BOLD_ON,s+="Pickup: "+(e.scheduledPickupTime?r(e.scheduledPickupTime):"ASAP")+i.LINE_FEED,s+=i.BOLD_OFF,s+=i.LINE_FEED,s+=i.LINE_FEED):e.takeawayCharge&&e.takeawayCharge>0&&(s+=i.ALIGN_CENTER,s+=i.TEXT_DOUBLE,s+=i.BOLD_ON,s+="** TAKEAWAY **"+i.LINE_FEED,s+=i.BOLD_OFF,s+=i.TEXT_NORMAL,s+=i.LINE_FEED,s+=i.LINE_FEED),s+=i.ALIGN_CENTER,s+=i.TEXT_DOUBLE,s+=i.BOLD_ON,t.name&&(s+=t.name+i.LINE_FEED),s+=i.TEXT_NORMAL,s+=i.BOLD_OFF,s+=i.LINE_FEED,t.address&&(s+=t.address+i.LINE_FEED),t.phone&&(s+="Tel: "+t.phone+i.LINE_FEED),t.gstRegNo&&(s+="Tax No: "+t.gstRegNo+i.LINE_FEED),s+=i.LINE_FEED,s+=i.DASHED_LINE+i.LINE_FEED,s+=i.ALIGN_LEFT,s+=o("Order:",e.orderNumber)+i.LINE_FEED,e.pagerNumber?s+=o("Pager #:",e.pagerNumber)+i.LINE_FEED:e.pickupNumber&&(s+=o("Pickup #:",e.pickupNumber)+i.LINE_FEED);const a=e.date.toLocaleDateString("en-MY"),l=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});if(s+=o("Date:",a)+i.LINE_FEED,s+=o("Time:",l)+i.LINE_FEED,s+=i.DASHED_LINE+i.LINE_FEED,s+=i.LINE_FEED,e.items.forEach(e=>{const t=e.menuItem.name,r=e.quantity,a=e.menuItem.price;s+=o(t,n+" "+(r*a).toFixed(2))+i.LINE_FEED,s+=o("  "+r+" x "+n+" "+a.toFixed(2),"")+i.LINE_FEED,e.options&&e.options.length>0&&e.options.forEach(e=>{s+="  + "+e+i.LINE_FEED})}),s+=i.LINE_FEED,s+=i.DASHED_LINE+i.LINE_FEED,s+=o("Subtotal:",n+" "+e.subtotal.toFixed(2))+i.LINE_FEED,e.takeawayCharge&&e.takeawayCharge>0&&(s+=o("Takeaway Charge:",n+" "+e.takeawayCharge.toFixed(2))+i.LINE_FEED),e.discount&&e.discount>0&&(s+=o("Discount:","- "+n+" "+e.discount.toFixed(2))+i.LINE_FEED),e.discountPolicy&&e.discountPolicy.amount>0){const t="Discount ("+e.discountPolicy.name+"):";s+=o(t,"- "+n+" "+e.discountPolicy.amount.toFixed(2))+i.LINE_FEED}if(e.coupon&&e.coupon.discount>0){const t="Coupon ("+e.coupon.code+"):";s+=o(t,"- "+n+" "+e.coupon.discount.toFixed(2))+i.LINE_FEED}if(e.pointDiscount&&Number(e.pointDiscount)>0){const t="Points ("+(e.pointsUsed||0).toLocaleString()+" pts):";s+=o(t,"- "+n+" "+Number(e.pointDiscount).toFixed(2))+i.LINE_FEED}if(e.serviceCharge&&e.serviceCharge>0){const t="Service Charge ("+(e.serviceChargeRate||10)+"%):";s+=o(t,n+" "+e.serviceCharge.toFixed(2))+i.LINE_FEED}if(e.tax&&e.tax>0){const t="Tax ("+(e.taxRate||6)+"%):";s+=o(t,n+" "+e.tax.toFixed(2))+i.LINE_FEED}return s+=i.DASHED_LINE+i.LINE_FEED,s+=i.BOLD_ON,s+=i.TEXT_DOUBLE_HEIGHT,s+=o("TOTAL:",n+" "+e.total.toFixed(2))+i.LINE_FEED,s+=i.TEXT_NORMAL,s+=i.BOLD_OFF,s+=i.LINE_FEED,s+=i.LINE_FEED,s+=i.ALIGN_CENTER,s+="Thank you for your purchase!"+i.LINE_FEED,s+=i.LINE_FEED,s+=i.LINE_FEED,s+=i.CUT_PARTIAL,s}function c(e,t){const n=window.open("","_blank","width=400,height=600,scrollbars=yes");return!!n&&(n.document.write(e),n.document.close(),n.onload=function(){setTimeout(()=>{n.print(),n.onafterprint=function(){n.close()},setTimeout(()=>{n.closed||n.close()},1e3)},200)},!0)}function p(){try{const e=localStorage.getItem("printerSettings");if(e)return JSON.parse(e)}catch(e){console.error("Failed to load printer settings:",e)}return{billPrinter:{enabled:!0,name:"",autoPrint:!1},kitchenPrinter:{enabled:!0,name:"",autoPrint:!0}}}async function u(e,t,n){try{const i=p();if(!i.billPrinter.enabled)return console.log("Bill printer is disabled in settings"),!0;if(!s()){console.log("\ud83d\udda5\ufe0f PC detected - using browser print dialog");const n=function(e,t){const n=d(e.currency),i=e.date.toLocaleDateString("en-MY"),o=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});let s="";e.items.forEach(e=>{const t=e.menuItem.name,i=e.quantity,r=e.menuItem.price;s+=`\n      <tr>\n        <td style="text-align: left;">${t}</td>\n        <td style="text-align: right;">${n} ${(i*r).toFixed(2)}</td>\n      </tr>\n      <tr>\n        <td style="text-align: left; color: #000; font-size: 12px; font-weight: 600;">&nbsp;&nbsp;${i} x ${n} ${r.toFixed(2)}</td>\n        <td></td>\n      </tr>\n    `,e.options&&e.options.length>0&&e.options.forEach(e=>{s+=`<tr><td style="text-align: left; color: #000; font-size: 12px; font-weight: 600;">&nbsp;&nbsp;+ ${e}</td><td></td></tr>`})});let a=`<tr><td>Subtotal:</td><td style="text-align: right;">${n} ${e.subtotal.toFixed(2)}</td></tr>`;e.takeawayCharge&&e.takeawayCharge>0&&(a+=`<tr><td>Takeaway Charge:</td><td style="text-align: right;">${n} ${e.takeawayCharge.toFixed(2)}</td></tr>`),e.discount&&e.discount>0&&(a+=`<tr><td>Discount:</td><td style="text-align: right;">- ${n} ${e.discount.toFixed(2)}</td></tr>`),e.discountPolicy&&e.discountPolicy.amount>0&&(a+=`<tr><td>Discount (${e.discountPolicy.name}):</td><td style="text-align: right;">- ${n} ${e.discountPolicy.amount.toFixed(2)}</td></tr>`),e.coupon&&e.coupon.discount>0&&(a+=`<tr><td>Coupon (${e.coupon.code}):</td><td style="text-align: right;">- ${n} ${e.coupon.discount.toFixed(2)}</td></tr>`),e.pointDiscount&&Number(e.pointDiscount)>0&&(a+=`<tr><td>Points (${(e.pointsUsed||0).toLocaleString()} pts):</td><td style="text-align: right;">- ${n} ${Number(e.pointDiscount).toFixed(2)}</td></tr>`),e.serviceCharge&&e.serviceCharge>0&&(a+=`<tr><td>Service Charge (${e.serviceChargeRate||10}%):</td><td style="text-align: right;">${n} ${e.serviceCharge.toFixed(2)}</td></tr>`),e.tax&&e.tax>0&&(a+=`<tr><td>Tax (${e.taxRate||6}%):</td><td style="text-align: right;">${n} ${e.tax.toFixed(2)}</td></tr>`);let l="";return"pickup"===e.orderType?l=`<div style="font-size: 16px; font-weight: bold; text-align: center; margin: 10px 0;">** PRE-ORDER PICKUP **</div>\n      <div style="text-align: center; font-weight: bold;">Pickup: ${e.scheduledPickupTime?r(e.scheduledPickupTime):"ASAP"}</div>`:e.takeawayCharge&&e.takeawayCharge>0&&(l='<div style="font-size: 16px; font-weight: bold; text-align: center; margin: 10px 0;">** TAKEAWAY **</div>'),`\n    <!DOCTYPE html>\n    <html>\n    <head>\n      <meta charset="UTF-8">\n      <title>Bill - ${e.orderNumber}</title>\n      <style>\n        @page { size: 80mm auto; margin: 0; }\n        @media print {\n          body { margin: 0; padding: 0; }\n          .no-print { display: none; }\n          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }\n        }\n        body {\n          font-family: 'Lucida Console', 'Courier New', monospace;\n          font-size: 14px;\n          font-weight: 600;\n          color: #000;\n          width: 80mm;\n          max-width: 80mm;\n          margin: 0 auto;\n          padding: 5mm;\n          box-sizing: border-box;\n          -webkit-font-smoothing: none;\n          letter-spacing: 0.5px;\n        }\n        .header { text-align: center; margin-bottom: 10px; }\n        .store-name { font-size: 20px; font-weight: 900; }\n        .divider { border-top: 2px dashed #000; margin: 8px 0; }\n        table { width: 100%; border-collapse: collapse; }\n        td { padding: 3px 0; font-weight: 600; }\n        .total-row { font-size: 18px; font-weight: 900; }\n        .footer { text-align: center; margin-top: 15px; font-size: 12px; font-weight: 600; }\n      </style>\n    </head>\n    <body>\n      ${l}\n      <div class="header">\n        <div class="store-name">${t.name||""}</div>\n        ${t.address?`<div style="font-weight: 600;">${t.address}</div>`:""}\n        ${t.phone?`<div style="font-weight: 600;">Tel: ${t.phone}</div>`:""}\n        ${t.gstRegNo?`<div style="font-weight: 600;">Tax No: ${t.gstRegNo}</div>`:""}\n      </div>\n\n      <div class="divider"></div>\n\n      <table>\n        <tr><td>Order:</td><td style="text-align: right;">${e.orderNumber}</td></tr>\n        ${e.tableNumber?`<tr><td style="font-weight: 900;">Table:</td><td style="text-align: right; font-weight: 900;">${e.tableNumber}</td></tr>`:e.pagerNumber?`<tr><td>Pager #:</td><td style="text-align: right;">${e.pagerNumber}</td></tr>`:e.pickupNumber?`<tr><td>Pickup #:</td><td style="text-align: right;">${e.pickupNumber}</td></tr>`:""}\n        <tr><td>Date:</td><td style="text-align: right;">${i}</td></tr>\n        <tr><td>Time:</td><td style="text-align: right;">${o}</td></tr>\n      </table>\n\n      <div class="divider"></div>\n\n      <table>${s}</table>\n\n      <div class="divider"></div>\n\n      <table>${a}</table>\n\n      <div class="divider"></div>\n\n      <table>\n        <tr class="total-row">\n          <td>TOTAL:</td>\n          <td style="text-align: right;">${n} ${e.total.toFixed(2)}</td>\n        </tr>\n      </table>\n\n      <div class="footer">\n        Thank you for your purchase!\n      </div>\n    </body>\n    </html>\n  `}(e,t);return c(n)}console.log("\ud83d\udcf1 Mobile/Tablet detected - using RawBT");const o=n||i.billPrinter.name,a=l(e,t),u=btoa(unescape(encodeURIComponent(a)));let E="#Intent;scheme=rawbt;";o&&(E+="S.s="+encodeURIComponent(o)+";");const h="intent:base64,"+u+E+"package=ru.a402d.rawbtprinter;end;",g=document.createElement("iframe");return g.style.display="none",g.src=h,document.body.appendChild(g),setTimeout(()=>{document.body.removeChild(g)},1e3),!0}catch(i){console.error("\u274c Print error:",i);const e=!s();return alert("Failed to print bill.\n\n"+(e?"Please check your browser popup settings and try again.":"Please ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready")+"\n\nError: "+i.message),!1}}async function E(e,t,n){try{const t=p();if(!t.kitchenPrinter.enabled)return console.log("Kitchen printer is disabled in settings"),!0;if(!s()){console.log("\ud83d\udda5\ufe0f PC detected - using browser print dialog for kitchen ticket");const t=function(e){const t=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0}),n="mobile"===e.orderSource?"MOBILE ORDER":"POS";let i="";e.items.forEach((e,t)=>{var n;const r=(null===(n=e.menuItem)||void 0===n?void 0:n.name)||e.name,o=e.quantity;i+=`<div style="font-size: 20px; font-weight: 900; margin: 8px 0;">${o} x ${r}</div>`,e.options&&e.options.length>0&&e.options.forEach(e=>{i+=`<div style="margin-left: 15px; color: #000; font-weight: 700;">\u2605 ${e}</div>`})});let o="";e.groupLabel&&(o=`<div style="font-size: 22px; font-weight: 900; text-align: center; margin: 10px 0; background: #000; color: #fff; padding: 5px;">** ${e.groupLabel.toUpperCase()} **</div>`);let s="";"pickup"===e.orderType?s=`<div style="font-size: 18px; font-weight: bold; text-align: center; margin: 10px 0;">** PRE-ORDER PICKUP **</div>\n      <div style="text-align: center; font-weight: bold;">Pickup: ${e.scheduledPickupTime?r(e.scheduledPickupTime):"ASAP"}</div>`:"takeaway"===e.orderType||e.takeawayCharge>0?s='<div style="font-size: 18px; font-weight: bold; text-align: center; margin: 10px 0;">** TAKEAWAY **</div>':"delivery"===e.orderType&&(s='<div style="font-size: 18px; font-weight: bold; text-align: center; margin: 10px 0;">** DELIVERY **</div>',e.deliveryInfo&&(s+=`<div style="margin: 10px 0; padding: 5px; border: 1px dashed #000;">\n        <div style="font-weight: bold;">DELIVERY ADDRESS:</div>\n        ${e.deliveryInfo.address?`<div>${e.deliveryInfo.address}</div>`:""}\n        ${e.deliveryInfo.phone?`<div>Phone: ${e.deliveryInfo.phone}</div>`:""}\n        ${e.deliveryInfo.zoneName?`<div>Zone: ${e.deliveryInfo.zoneName}</div>`:""}\n        ${e.deliveryInfo.notes?`<div>Notes: ${e.deliveryInfo.notes}</div>`:""}\n      </div>`));let a="";a=e.tableNumber?`<div style="font-size: 28px; font-weight: 900; text-align: center; margin: 15px 0;">TABLE ${e.tableNumber}</div>`:e.pagerNumber?`<div style="font-size: 28px; font-weight: 900; text-align: center; margin: 15px 0;">PAGER ${e.pagerNumber}</div>`:`<div style="font-size: 28px; font-weight: 900; text-align: center; margin: 15px 0;">PICKUP ${e.pickupNumber||(e.orderNumber?e.orderNumber.split("-")[1]:"000")}</div>`;return`\n    <!DOCTYPE html>\n    <html>\n    <head>\n      <meta charset="UTF-8">\n      <title>Kitchen Ticket - ${e.orderNumber}</title>\n      <style>\n        @page { size: 80mm auto; margin: 0; }\n        @media print {\n          body { margin: 0; padding: 0; }\n          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }\n        }\n        body {\n          font-family: 'Lucida Console', 'Courier New', monospace;\n          font-size: 14px;\n          font-weight: 600;\n          color: #000;\n          width: 80mm;\n          max-width: 80mm;\n          margin: 0 auto;\n          padding: 5mm;\n          box-sizing: border-box;\n          -webkit-font-smoothing: none;\n          letter-spacing: 0.5px;\n        }\n        .divider { border-top: 2px dashed #000; margin: 8px 0; }\n        table { width: 100%; border-collapse: collapse; }\n        td { padding: 3px 0; font-weight: 600; }\n      </style>\n    </head>\n    <body>\n      ${o}\n\n      <div class="divider"></div>\n\n      <table>\n        <tr><td style="font-weight: 700;">Order:</td><td style="text-align: right; font-weight: 700;">${e.orderNumber}</td></tr>\n        <tr><td style="font-weight: 700;">Time:</td><td style="text-align: right; font-weight: 700;">${t}</td></tr>\n        <tr><td style="font-weight: 700;">Source:</td><td style="text-align: right; font-weight: 700;">${n}</td></tr>\n        ${e.customerName&&"Walk-in Customer"!==e.customerName?`<tr><td style="font-weight: 700;">Customer:</td><td style="text-align: right; font-weight: 700;">${e.customerName}</td></tr>`:""}\n      </table>\n\n      <div class="divider"></div>\n\n      <div style="font-size: 16px; font-weight: 900; margin: 10px 0;">ORDER ITEMS:</div>\n      ${i}\n\n      <div class="divider"></div>\n\n      ${e.notes&&e.notes.trim()?`\n        <div style="font-weight: bold;">** SPECIAL NOTES **</div>\n        <div style="margin: 5px 0;">${e.notes}</div>\n        <div class="divider"></div>\n      `:""}\n\n      ${a}\n      ${s}\n    </body>\n    </html>\n  `}(e);return c(t)}console.log("\ud83d\udcf1 Mobile/Tablet detected - using RawBT for kitchen ticket");const a=n||t.kitchenPrinter.name,d=function(e){let t="";t+=i.INIT,e.groupLabel&&(t+=i.ALIGN_CENTER,t+=i.TEXT_DOUBLE,t+=i.BOLD_ON,t+="** "+e.groupLabel.toUpperCase()+" **"+i.LINE_FEED,t+=i.TEXT_NORMAL,t+=i.BOLD_OFF,t+=i.LINE_FEED),t+=i.ALIGN_LEFT,t+=i.DASHED_LINE+i.LINE_FEED,t+=o("Order:",e.orderNumber)+i.LINE_FEED;const n=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});t+=o("Time:",n)+i.LINE_FEED;const s="mobile"===e.orderSource?"MOBILE ORDER":"POS";if(t+=o("Source:",s)+i.LINE_FEED,e.customerName&&"Walk-in Customer"!==e.customerName&&(t+=o("Customer:",e.customerName)+i.LINE_FEED),t+=i.DASHED_LINE+i.LINE_FEED,t+=i.LINE_FEED,t+=i.BOLD_ON,t+=i.TEXT_DOUBLE_HEIGHT,t+="ORDER ITEMS:"+i.LINE_FEED,t+=i.TEXT_NORMAL,t+=i.BOLD_OFF,t+=i.LINE_FEED,e.items.forEach((n,r)=>{var o;const s=(null===(o=n.menuItem)||void 0===o?void 0:o.name)||n.name,a=n.quantity;t+=i.BOLD_ON,t+=i.TEXT_DOUBLE,t+=a+" x "+s+i.LINE_FEED,t+=i.TEXT_NORMAL,t+=i.BOLD_OFF,n.options&&n.options.length>0&&n.options.forEach(e=>{t+="  \u2605 "+e+i.LINE_FEED}),r<e.items.length-1&&(t+=i.LINE_FEED)}),t+=i.LINE_FEED,t+=i.DASHED_LINE+i.LINE_FEED,e.notes&&e.notes.trim()&&(t+=i.LINE_FEED,t+=i.BOLD_ON,t+="** SPECIAL NOTES **"+i.LINE_FEED,t+=i.BOLD_OFF,t+=e.notes+i.LINE_FEED,t+=i.LINE_FEED,t+=i.DASHED_LINE+i.LINE_FEED),t+=i.LINE_FEED,e.tableNumber)t+=i.ALIGN_CENTER,t+=i.TEXT_DOUBLE,t+=i.BOLD_ON,t+="TABLE  "+e.tableNumber+i.LINE_FEED,t+=i.TEXT_NORMAL,t+=i.BOLD_OFF;else if(e.pagerNumber)t+=i.ALIGN_CENTER,t+=i.TEXT_DOUBLE,t+=i.BOLD_ON,t+="PAGER  "+e.pagerNumber+i.LINE_FEED,t+=i.TEXT_NORMAL,t+=i.BOLD_OFF;else{t+=i.ALIGN_CENTER,t+=i.TEXT_DOUBLE,t+=i.BOLD_ON;const n=e.pickupNumber||(e.orderNumber?e.orderNumber.split("-")[1]:"000");t+="PICKUP  "+n+i.LINE_FEED,t+=i.TEXT_NORMAL,t+=i.BOLD_OFF}return t+=i.LINE_FEED,"pickup"===e.orderType?(t+=i.ALIGN_CENTER,t+=i.TEXT_DOUBLE,t+=i.BOLD_ON,t+="** PRE-ORDER PICKUP **"+i.LINE_FEED,t+=i.BOLD_OFF,t+=i.TEXT_NORMAL,t+=i.ALIGN_CENTER,t+=i.BOLD_ON,t+="Pickup: "+(e.scheduledPickupTime?r(e.scheduledPickupTime):"ASAP")+i.LINE_FEED,t+=i.BOLD_OFF):"takeaway"===e.orderType||e.takeawayCharge>0?(t+=i.ALIGN_CENTER,t+=i.TEXT_DOUBLE,t+=i.BOLD_ON,t+="** TAKEAWAY **"+i.LINE_FEED,t+=i.BOLD_OFF,t+=i.TEXT_NORMAL):"delivery"===e.orderType&&(t+=i.ALIGN_CENTER,t+=i.TEXT_DOUBLE,t+=i.BOLD_ON,t+="** DELIVERY **"+i.LINE_FEED,t+=i.BOLD_OFF,t+=i.TEXT_NORMAL,e.deliveryInfo&&(t+=i.LINE_FEED,t+=i.ALIGN_LEFT,t+=i.DASHED_LINE+i.LINE_FEED,t+=i.BOLD_ON,t+="DELIVERY ADDRESS:"+i.LINE_FEED,t+=i.BOLD_OFF,e.deliveryInfo.address&&(t+=e.deliveryInfo.address+i.LINE_FEED),e.deliveryInfo.phone&&(t+="Phone: "+e.deliveryInfo.phone+i.LINE_FEED),e.deliveryInfo.zoneName&&(t+="Zone: "+e.deliveryInfo.zoneName+i.LINE_FEED),e.deliveryInfo.notes&&(t+="Notes: "+e.deliveryInfo.notes+i.LINE_FEED),t+=i.DASHED_LINE+i.LINE_FEED)),t+=i.LINE_FEED,t+=i.LINE_FEED,t+=i.CUT_PARTIAL,t}(e),l=btoa(unescape(encodeURIComponent(d)));let u="#Intent;scheme=rawbt;";a&&(u+="S.s="+encodeURIComponent(a)+";");const E="intent:base64,"+l+u+"package=ru.a402d.rawbtprinter;end;",h=document.createElement("iframe");return h.style.display="none",h.src=E,document.body.appendChild(h),setTimeout(()=>{document.body.removeChild(h)},1e3),!0}catch(a){console.error("\u274c Kitchen Ticket print error:",a);const e=!s();return alert("Failed to print kitchen order ticket.\n\n"+(e?"Please check your browser popup settings and try again.":"Please ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready")+"\n\nError: "+a.message),!1}}function h(e,t){let n=[];n.push("------------------------------------------------"),n.push("Order:                          "+e.orderNumber);const i=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});n.push("Time:                                "+i);const o="mobile"===e.orderSource?"MOBILE ORDER":"POS";if(n.push("Source:                              "+o),e.customerName&&"Walk-in Customer"!==e.customerName&&n.push("Customer:                       "+e.customerName),n.push("------------------------------------------------"),n.push(""),n.push("ORDER ITEMS:"),n.push(""),e.items.forEach((t,i)=>{var r;const o=(null===(r=t.menuItem)||void 0===r?void 0:r.name)||t.name,s=t.quantity;n.push(s+" x "+o),t.options&&t.options.length>0&&t.options.forEach(e=>{n.push("  \u2605 "+e)}),i<e.items.length-1&&n.push("")}),n.push(""),n.push("------------------------------------------------"),e.notes&&e.notes.trim()&&(n.push(""),n.push("** SPECIAL NOTES **"),n.push(e.notes),n.push(""),n.push("------------------------------------------------")),n.push(""),e.tableNumber)n.push("              TABLE  "+e.tableNumber);else if(e.pagerNumber)n.push("              PAGER  "+e.pagerNumber);else{const t=e.pickupNumber||(e.orderNumber?e.orderNumber.split("-")[1]:"000");n.push("             PICKUP  "+t)}return n.push(""),"pickup"===e.orderType?(n.push("        ** PRE-ORDER PICKUP **"),n.push("        Pickup: "+(e.scheduledPickupTime?r(e.scheduledPickupTime):"ASAP"))):"takeaway"===e.orderType||e.takeawayCharge>0?n.push("           ** TAKEAWAY **"):"delivery"===e.orderType&&n.push("           ** DELIVERY **"),n.join("\n")}},8406:(e,t,n)=>{n.d(t,{MQ:()=>s,fU:()=>o,ng:()=>i,r6:()=>r});const i=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",r=(e,t,n)=>{if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:i(t)};return r.toLocaleString("en-MY",{...o,...n})},o=(e,t)=>r(e,t,{year:void 0,month:void 0,day:void 0}),s=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const n=Date.now()-t,i=Math.floor(n/6e4),r=Math.floor(n/36e5),o=Math.floor(n/864e5);return i<1?"just now":1===i?"1 min ago":i<60?`${i} mins ago`:1===r?"1 hour ago":r<24?`${r} hours ago`:1===o?"1 day ago":`${o} days ago`}},9189:(e,t,n)=>{n.d(t,{A:()=>c});var i=n(9950),r=n(8930),o=n(9610),s=n(2159),a=n(6038),d=n(9018),l=n(4414);const c=e=>{let{isOpen:t,onClose:n,menuItem:c,onConfirm:p}=e;const{optionGroups:u}=(0,r.b)(),{operationSettings:E}=(0,d.Pj)(),[h,g]=(0,i.useState)(1),[m,x]=(0,i.useState)([]),y=c.optionGroups?c.optionGroups.map(e=>u.find(t=>t.id===e)).filter(e=>void 0!==e):[],f=(e,t,n,i)=>{if(n)x(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);else{const n=y.find(e=>e.id===t);if(n){const t=n.options.map(e=>e.id),r=m.includes(e);x(r&&!i?e=>e.filter(e=>!t.includes(e)):n=>[...n.filter(e=>!t.includes(e)),e])}}},b=()=>y.filter(e=>e.required).every(e=>m.some(t=>e.options.some(e=>e.id===t))),v=()=>{g(1),x([]),n()},F=(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(o.yl,{variant:"secondary",onClick:v,children:"Cancel"}),(0,l.jsx)(o.yl,{variant:"primary",onClick:()=>{if(b()){const e=m.map(e=>{const t=y.flatMap(e=>e.options).find(t=>t.id===e);return t?t.name:""}).filter(Boolean),t=m.map(e=>{const t=y.flatMap(e=>e.options).find(t=>t.id===e);return t?{id:t.id,name:t.name,price:t.price}:null}).filter(e=>null!==e);p(h,e,t),g(1),x([])}},disabled:!b(),children:"Add to Order"})]});return(0,l.jsxs)(o.aF,{isOpen:t,onClose:v,title:"Customize Order",footer:F,children:[(0,l.jsxs)(s.kr,{children:[(0,l.jsx)(s.hO,{style:{backgroundImage:c.image?`url(${c.image})`:"none",backgroundSize:"cover",backgroundPosition:"center",fontSize:c.image?"0":"32px"},children:!c.image&&c.emoji}),(0,l.jsxs)(s.iz,{children:[(0,l.jsx)(s.bU,{children:c.name}),(0,l.jsx)(s.NM,{children:(0,a.vv)(c.price,E.currency)})]})]}),y.map(e=>(0,l.jsxs)(s.wn,{children:[(0,l.jsxs)(o.lR,{children:[e.name,e.required&&(0,l.jsx)(s.I1,{children:"*"})]}),e.multiple?(0,l.jsx)(s.$Q,{children:e.options.map(t=>(0,l.jsxs)(s.Sb,{children:[(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,l.jsx)(s.Oc,{type:"checkbox",checked:m.includes(t.id),onChange:()=>f(t.id,e.id,e.multiple,e.required)}),(0,l.jsx)(s.PU,{children:t.name})]}),t.price>0&&(0,l.jsxs)(s.jj,{children:["+",(0,a.vv)(t.price,E.currency)]})]},t.id))}):(0,l.jsx)(s.z6,{children:e.options.map(t=>(0,l.jsxs)(s.a,{selected:m.includes(t.id),onClick:()=>f(t.id,e.id,e.multiple,e.required),style:"spice"===e.id&&m.includes(t.id)?{borderColor:"#F97316",backgroundColor:"rgba(249, 115, 22, 0.1)",color:"#EA580C"}:{},children:[(0,l.jsx)("div",{children:t.name}),t.price>0&&(0,l.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:["+",(0,a.vv)(t.price,E.currency)]})]},t.id))})]},e.id)),(0,l.jsxs)(s.wn,{children:[(0,l.jsx)(o.lR,{children:"Quantity"}),(0,l.jsxs)(s.F8,{children:[(0,l.jsx)(s.ey,{onClick:()=>g(Math.max(1,h-1)),disabled:h<=1,children:(0,l.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,l.jsx)("path",{d:"M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),(0,l.jsx)(s.FA,{children:h}),(0,l.jsx)(s.ey,{onClick:()=>g(h+1),children:(0,l.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,l.jsx)("path",{d:"M7 3V11M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]})]}),(0,l.jsxs)(s.i_,{children:[(0,l.jsx)(s.nJ,{children:"Total:"}),(0,l.jsx)(s.aX,{children:(0,a.vv)((()=>{let e=c.price*h;return m.forEach(t=>{const n=y.flatMap(e=>e.options).find(e=>e.id===t);n&&(e+=n.price*h)}),e})(),E.currency)})]})]})}}}]);