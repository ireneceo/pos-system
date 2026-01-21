"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6401],{2687:(e,t,n)=>{n.d(t,{$Q:()=>c,F8:()=>u,FA:()=>x,I1:()=>i,NM:()=>y,Oc:()=>l,PU:()=>E,Sb:()=>d,a:()=>a,aX:()=>g,bU:()=>N,ey:()=>h,hO:()=>D,i_:()=>m,iz:()=>L,jj:()=>p,kr:()=>_,nJ:()=>F,wn:()=>o,z6:()=>s});var r=n(4752);const i=r.Ay.span`
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
`,c=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,d=r.Ay.label`
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
`,l=r.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`,E=r.Ay.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`,p=r.Ay.span`
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
`,x=r.Ay.span`
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
`,F=r.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,g=r.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`,_=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`,D=r.Ay.div`
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,L=r.Ay.div``,N=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,y=r.Ay.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`},2966:(e,t,n)=>{n.d(t,{A:()=>C});var r=n(9950),i=n(9610),o=n(2687),s=n(4752),a=n(6038),c=n(9018),d=n(4414);const l=s.Ay.div`
  background: linear-gradient(to bottom, #F8FAFC, #F1F5F9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,E=s.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`,p=s.Ay.span`
  color: #6B7280;
`,u=s.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,h=s.Ay.div`
  margin-bottom: 20px;
`,x=s.Ay.input`
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
`,F=s.Ay.button`
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
`,g=s.Ay.div`
  background: #F0FDF4;
  border: 1px solid #86EFAC;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 16px;
`,_=s.Ay.div`
  font-size: 14px;
  color: #059669;
  margin-bottom: 4px;
`,D=s.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #047857;
`,L=(0,s.Ay)(E)`
  color: #10B981;
`,N=s.Ay.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,y=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 12px;
`,b=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,f=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,I=s.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,v=s.Ay.label`
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
`,A=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 12px;
  background: #EFF6FF;
  border-radius: 8px;
`,j=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,O=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,B=s.Ay.div`
  font-weight: 700;
  color: #059669;
  font-size: 16px;
`,k=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},C=e=>{var t;let{isOpen:n,onClose:s,total:C,subtotal:w,tax:R,serviceCharge:S=0,takeawayCharge:P=0,discountAmount:M=0,couponDiscount:z=0,onConfirmPayment:U,paymentMethods:$,taxRate:X=6,serviceChargeRate:G=10,taxEnabled:H=!0,serviceChargeEnabled:Y=!1,customerId:K,restaurantId:W,customerPoints:q=0,customerTier:V="Bronze",membershipSettings:J,onPointsChange:Z}=e;const{operationSettings:Q}=(0,c.Pj)(),[ee,te]=(0,r.useState)(0),[ne,re]=(0,r.useState)("Bronze"),[ie,oe]=(0,r.useState)(null),[se,ae]=(0,r.useState)(!1),ce=K?ee:q,de=K?ne:V,le=K&&!J?ie:J;(0,r.useEffect)(()=>{if(!n||!K||!W)return;(async()=>{ae(!0);try{if(!J){const e=await fetch(`/api/membership/settings/${W}`,k()),t=await e.json();t.success&&t.data&&oe(t.data)}const e=await fetch(`/api/membership/customer/${W}/${K}`,k()),t=await e.json();t.success&&t.data&&(te(t.data.points||0),re(t.data.loyalty_tier||"Bronze"))}catch(e){console.error("PaymentModal: Failed to fetch membership data:",e)}finally{ae(!1)}})()},[n,K,W,J]);const[Ee,pe]=(0,r.useState)(!1),[ue,he]=(0,r.useState)(0),[xe,me]=(0,r.useState)(0),Fe=r.useMemo(()=>{if(!le||!le.is_active||ce<=0)return 0;const e=le.min_points_to_use||100,t=parseFloat(le.max_points_per_order_percent)||50,n=parseFloat(le.points_to_currency)||100,r=t/100*(w-M-z),i=Math.floor(r*n),o=Math.min(ce,i);return ce<e?0:o},[le,ce,w,M,z]);(0,r.useEffect)(()=>{if(le&&ue>0){const e=parseFloat(le.points_to_currency)||100,t=ue/e;me(t),null===Z||void 0===Z||Z(ue,t)}else me(0),null===Z||void 0===Z||Z(0,0)},[ue,le,Z]),(0,r.useEffect)(()=>{n||(pe(!1),he(0),me(0),te(0),re("Bronze"),oe(null))},[n]);const ge=C-xe,_e=(()=>{if(!$)return[{key:"cash",label:"Cash"},{key:"card",label:"Card"},{key:"ewallet",label:"E-Wallet"},{key:"bankTransfer",label:"Bank Transfer"}];const e=$._order,t=e&&Array.isArray(e)?e.filter(e=>"_order"!==e):["cash","card","ewallet","bankTransfer"],n=[];return t.forEach(e=>{const t=$[e];t&&t.enabled&&t.availableIn&&t.availableIn.includes("pos")&&n.push({key:e,label:t.label})}),n})(),[De,Le]=(0,r.useState)((null===(t=_e[0])||void 0===t?void 0:t.key)||"cash"),[Ne,ye]=(0,r.useState)("");(0,r.useEffect)(()=>{_e.length>0&&(De&&_e.find(e=>e.key===De)||Le(_e[0].key))},[_e,De]);const be=()=>{const e=parseFloat(Ne)||0;return Math.max(0,e-ge)},fe=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.yl,{variant:"secondary",onClick:s,children:"Cancel"}),(0,d.jsx)(i.yl,{variant:"primary",onClick:()=>{if("cash"===De){const e=parseFloat(Ne)||0;e>=ge&&U(De,e,be(),ue,xe)}else U(De,void 0,void 0,ue,xe)},disabled:!(()=>{if("cash"===De){return(parseFloat(Ne)||0)>=ge}return!0})(),children:"Confirm Payment"})]});return(0,d.jsxs)(i.aF,{isOpen:n,onClose:s,title:"Payment",footer:fe,children:[(0,d.jsxs)(l,{children:[(0,d.jsxs)(E,{children:[(0,d.jsx)(p,{children:"Subtotal"}),(0,d.jsx)(u,{children:(0,a.vv)(w,Q.currency)})]}),P>0&&(0,d.jsxs)(E,{children:[(0,d.jsx)(p,{children:"Takeaway Charge"}),(0,d.jsx)(u,{children:(0,a.vv)(P,Q.currency)})]}),M>0&&(0,d.jsxs)(L,{children:[(0,d.jsx)(p,{children:"Discount"}),(0,d.jsx)(u,{children:(0,a.vv)(-M,Q.currency)})]}),z>0&&(0,d.jsxs)(L,{children:[(0,d.jsx)(p,{children:"Coupon Discount"}),(0,d.jsx)(u,{children:(0,a.vv)(-z,Q.currency)})]}),xe>0&&(0,d.jsxs)(L,{children:[(0,d.jsxs)(p,{children:["Points Discount (",ue.toLocaleString()," pts)"]}),(0,d.jsx)(u,{children:(0,a.vv)(-xe,Q.currency)})]}),Y&&S>0&&(0,d.jsxs)(E,{children:[(0,d.jsxs)(p,{children:["Service Charge (",G,"%)"]}),(0,d.jsx)(u,{children:(0,a.vv)(S,Q.currency)})]}),H&&R>0&&(0,d.jsxs)(E,{children:[(0,d.jsxs)(p,{children:["Tax (",X,"%)"]}),(0,d.jsx)(u,{children:(0,a.vv)(R,Q.currency)})]})]}),(0,d.jsxs)(o.i_,{children:[(0,d.jsx)(o.nJ,{children:"Total Amount"}),(0,d.jsx)(o.aX,{children:(0,a.vv)(ge,Q.currency)})]}),se&&K&&(0,d.jsx)(N,{children:(0,d.jsx)(y,{children:(0,d.jsxs)("div",{children:[(0,d.jsx)(b,{children:"Loading Points..."}),(0,d.jsx)(f,{children:"Please wait"})]})})}),!se&&(null===le||void 0===le?void 0:le.is_active)&&ce>0&&(0,d.jsxs)(N,{children:[(0,d.jsxs)(y,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(b,{children:"Available Points"}),(0,d.jsxs)(f,{children:[de," Member"]})]}),(0,d.jsxs)(I,{children:[ce.toLocaleString()," pts"]})]}),Fe>0?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)("input",{type:"checkbox",checked:Ee,onChange:e=>{pe(e.target.checked),e.target.checked?he(Fe):he(0)}}),(0,d.jsx)("span",{children:"Use points for this order"})]}),Ee&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:[(0,d.jsxs)("span",{children:[(null===le||void 0===le?void 0:le.min_points_to_use)||100," pts"]}),(0,d.jsxs)("span",{children:[Fe.toLocaleString()," pts (max)"]})]}),(0,d.jsx)(T,{type:"range",min:(null===le||void 0===le?void 0:le.min_points_to_use)||100,max:Fe,value:ue,onChange:e=>he(Number(e.target.value))}),(0,d.jsxs)(A,{children:[(0,d.jsxs)("div",{children:[(0,d.jsxs)(j,{children:["Using: ",ue.toLocaleString()," pts"]}),(0,d.jsxs)(O,{children:["(",(null===le||void 0===le?void 0:le.points_to_currency)||100," pts = ",(0,a.vv)(1,Q.currency),")"]})]}),(0,d.jsxs)(B,{children:["-",(0,a.vv)(xe,Q.currency)]})]})]})]}):(0,d.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center",padding:"12px"},children:["Minimum ",(null===le||void 0===le?void 0:le.min_points_to_use)||100," points required to use"]}),(null===le||void 0===le?void 0:le.points_per_currency)&&(0,d.jsx)("div",{style:{marginTop:"12px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:(()=>{const e="VIP"===de?parseFloat(le.vip_bonus_rate):"Gold"===de?parseFloat(le.gold_bonus_rate):"Silver"===de?parseFloat(le.silver_bonus_rate):parseFloat(le.bronze_bonus_rate),t=w-M-z-xe,n=Math.floor(t*parseFloat(le.points_per_currency)*e),r=n/parseFloat(le.points_to_currency);return(0,d.jsxs)(d.Fragment,{children:["You will earn approximately ",(0,d.jsx)("strong",{children:n.toLocaleString()})," pts"," ","(",(0,a.vv)(r,Q.currency)," value) from this order","Bronze"!==de&&` (${de} ${e}x bonus)`]})})()})]}),!se&&(null===le||void 0===le?void 0:le.is_active)&&K&&0===ce&&(null===le||void 0===le?void 0:le.points_per_currency)&&(0,d.jsx)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F0FDF4",borderRadius:"8px",fontSize:"13px",color:"#166534",border:"1px solid #BBF7D0"},children:(()=>{const e=w-M-z,t=Math.floor(e*parseFloat(le.points_per_currency)),n=t/parseFloat(le.points_to_currency);return(0,d.jsxs)(d.Fragment,{children:["Members earn: ",(0,d.jsx)("strong",{children:t.toLocaleString()})," pts"," ","(",(0,a.vv)(n,Q.currency)," value)"]})})()}),(0,d.jsxs)(o.wn,{children:[(0,d.jsx)(i.lR,{children:"Payment Method"}),(0,d.jsx)(o.z6,{children:_e.map(e=>(0,d.jsx)(o.a,{selected:De===e.key,onClick:()=>Le(e.key),children:(0,d.jsx)("div",{children:e.label})},e.key))})]}),"cash"===De&&(0,d.jsxs)(h,{children:[(0,d.jsx)(i.lR,{children:"Cash Amount"}),(0,d.jsx)(x,{type:"text",placeholder:"Enter amount received",value:Ne,onChange:e=>(e=>{const t=e.replace(/[^0-9.]/g,"");ye(t)})(e.target.value),autoFocus:!0}),(0,d.jsx)(m,{children:[50,100,150,200].map(e=>(0,d.jsx)(F,{selected:Ne===e.toString(),onClick:()=>ye(e.toString()),children:(0,a.vv)(e,Q.currency)},e))}),parseFloat(Ne)>=ge&&(0,d.jsxs)(g,{children:[(0,d.jsx)(_,{children:"Change"}),(0,d.jsx)(D,{children:(0,a.vv)(be(),Q.currency)})]})]})]})}},5863:(e,t,n)=>{n.d(t,{KB:()=>E,Si:()=>l,pG:()=>d,qE:()=>a});const r={INIT:"\x1b@",ALIGN_LEFT:"\x1ba\0",ALIGN_CENTER:"\x1ba\x01",ALIGN_RIGHT:"\x1ba\x02",TEXT_NORMAL:"\x1d!\0",TEXT_DOUBLE_HEIGHT:"\x1d!\x01",TEXT_DOUBLE_WIDTH:"\x1d!\x10",TEXT_DOUBLE:"\x1d!\x11",BOLD_ON:"\x1bE\x01",BOLD_OFF:"\x1bE\0",REVERSE_ON:"\x1dB\x01",REVERSE_OFF:"\x1dB\0",LINE_FEED:"\n",DASHED_LINE:"------------------------------------------------",CUT_PARTIAL:"\x1dVA\0"};function i(e){const t=new Date(e),n=new Date(t.getTime()+18e5),r=e=>{const t=e.getHours(),n=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:n}},i=r(t),o=r(n);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`}function o(e,t){const n=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:48)-e.length-t.length;return e+" ".repeat(Math.max(n,1))+t}const s={MYR:"RM",USD:"$",SGD:"S$",EUR:"\u20ac",GBP:"\xa3",JPY:"\xa5",KRW:"\u20a9",THB:"\u0e3f",VND:"\u20ab",IDR:"Rp",PHP:"\u20b1",INR:"\u20b9",CNY:"\xa5",AUD:"A$",NZD:"NZ$",HKD:"HK$",TWD:"NT$"};function a(e,t){const n=(a=e.currency,s[a]||a||"RM");var a;let c="";c+=r.INIT,"pickup"===e.orderType?(c+=r.ALIGN_CENTER,c+=r.TEXT_DOUBLE,c+=r.BOLD_ON,c+="** PRE-ORDER PICKUP **"+r.LINE_FEED,c+=r.BOLD_OFF,c+=r.TEXT_NORMAL,c+=r.BOLD_ON,c+="Pickup: "+(e.scheduledPickupTime?i(e.scheduledPickupTime):"ASAP")+r.LINE_FEED,c+=r.BOLD_OFF,c+=r.LINE_FEED,c+=r.LINE_FEED):e.takeawayCharge&&e.takeawayCharge>0&&(c+=r.ALIGN_CENTER,c+=r.TEXT_DOUBLE,c+=r.BOLD_ON,c+="** TAKEAWAY **"+r.LINE_FEED,c+=r.BOLD_OFF,c+=r.TEXT_NORMAL,c+=r.LINE_FEED,c+=r.LINE_FEED),c+=r.ALIGN_CENTER,c+=r.TEXT_DOUBLE,c+=r.BOLD_ON,t.name&&(c+=t.name+r.LINE_FEED),c+=r.TEXT_NORMAL,c+=r.BOLD_OFF,c+=r.LINE_FEED,t.address&&(c+=t.address+r.LINE_FEED),t.phone&&(c+="Tel: "+t.phone+r.LINE_FEED),t.gstRegNo&&(c+="Tax No: "+t.gstRegNo+r.LINE_FEED),c+=r.LINE_FEED,c+=r.DASHED_LINE+r.LINE_FEED,c+=r.ALIGN_LEFT,c+=o("Order:",e.orderNumber)+r.LINE_FEED,e.pagerNumber?c+=o("Pager #:",e.pagerNumber)+r.LINE_FEED:e.pickupNumber&&(c+=o("Pickup #:",e.pickupNumber)+r.LINE_FEED);const d=e.date.toLocaleDateString("en-MY"),l=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});if(c+=o("Date:",d)+r.LINE_FEED,c+=o("Time:",l)+r.LINE_FEED,c+=r.DASHED_LINE+r.LINE_FEED,c+=r.LINE_FEED,e.items.forEach(e=>{const t=e.menuItem.name,i=e.quantity,s=e.menuItem.price;c+=o(t,n+" "+(i*s).toFixed(2))+r.LINE_FEED,c+=o("  "+i+" x "+n+" "+s.toFixed(2),"")+r.LINE_FEED,e.options&&e.options.length>0&&e.options.forEach(e=>{c+="  + "+e+r.LINE_FEED})}),c+=r.LINE_FEED,c+=r.DASHED_LINE+r.LINE_FEED,c+=o("Subtotal:",n+" "+e.subtotal.toFixed(2))+r.LINE_FEED,e.takeawayCharge&&e.takeawayCharge>0&&(c+=o("Takeaway Charge:",n+" "+e.takeawayCharge.toFixed(2))+r.LINE_FEED),e.discount&&e.discount>0&&(c+=o("Discount:","- "+n+" "+e.discount.toFixed(2))+r.LINE_FEED),e.discountPolicy&&e.discountPolicy.amount>0){const t="Discount ("+e.discountPolicy.name+"):";c+=o(t,"- "+n+" "+e.discountPolicy.amount.toFixed(2))+r.LINE_FEED}if(e.coupon&&e.coupon.discount>0){const t="Coupon ("+e.coupon.code+"):";c+=o(t,"- "+n+" "+e.coupon.discount.toFixed(2))+r.LINE_FEED}if(e.pointDiscount&&Number(e.pointDiscount)>0){const t="Points ("+(e.pointsUsed||0).toLocaleString()+" pts):";c+=o(t,"- "+n+" "+Number(e.pointDiscount).toFixed(2))+r.LINE_FEED}if(e.serviceCharge&&e.serviceCharge>0){const t="Service Charge ("+(e.serviceChargeRate||10)+"%):";c+=o(t,n+" "+e.serviceCharge.toFixed(2))+r.LINE_FEED}if(e.tax&&e.tax>0){const t="Tax ("+(e.taxRate||6)+"%):";c+=o(t,n+" "+e.tax.toFixed(2))+r.LINE_FEED}c+=r.DASHED_LINE+r.LINE_FEED,c+=r.BOLD_ON,c+=r.TEXT_DOUBLE_HEIGHT,c+=o("TOTAL:",n+" "+e.total.toFixed(2))+r.LINE_FEED,c+=r.TEXT_NORMAL,c+=r.BOLD_OFF,c+=r.LINE_FEED,c+=r.DASHED_LINE+r.LINE_FEED;const E=e.paymentMethod?e.paymentMethod.toUpperCase():"CASH";return c+=o("Payment:",E)+r.LINE_FEED,"cash"===e.paymentMethod&&e.amountReceived>0&&(c+=o("Received:",n+" "+e.amountReceived.toFixed(2))+r.LINE_FEED,c+=o("Change:",n+" "+e.change.toFixed(2))+r.LINE_FEED),c+=r.LINE_FEED,c+=r.ALIGN_CENTER,c+="*** CUSTOMER COPY ***"+r.LINE_FEED,c+="Thank you for your purchase!"+r.LINE_FEED,c+="Please keep this receipt"+r.LINE_FEED,c+="for your records"+r.LINE_FEED,c+=r.LINE_FEED,c+=r.LINE_FEED,c+=r.LINE_FEED,c+=r.CUT_PARTIAL,c}function c(){try{const e=localStorage.getItem("printerSettings");if(e)return JSON.parse(e)}catch(e){console.error("Failed to load printer settings:",e)}return{billPrinter:{enabled:!0,name:"",autoPrint:!1},kitchenPrinter:{enabled:!0,name:"",autoPrint:!0}}}async function d(e,t,n){try{const r=c();if(!r.billPrinter.enabled)return console.log("Bill printer is disabled in settings"),!0;const i=n||r.billPrinter.name,o=a(e,t),s=btoa(unescape(encodeURIComponent(o)));let d="#Intent;scheme=rawbt;";i&&(d+="S.s="+encodeURIComponent(i)+";");const l="intent:base64,"+s+d+"package=ru.a402d.rawbtprinter;end;",E=document.createElement("iframe");return E.style.display="none",E.src=l,document.body.appendChild(E),setTimeout(()=>{document.body.removeChild(E)},1e3),!0}catch(r){return console.error("\u274c RawBT print error:",r),alert("Failed to print bill.\n\nPlease ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready\n\nError: "+r.message),!1}}async function l(e,t,n){try{const t=c();if(!t.kitchenPrinter.enabled)return console.log("Kitchen printer is disabled in settings"),!0;const s=n||t.kitchenPrinter.name,a=function(e){let t="";t+=r.INIT,e.groupLabel&&(t+=r.ALIGN_CENTER,t+=r.TEXT_DOUBLE,t+=r.BOLD_ON,t+="** "+e.groupLabel.toUpperCase()+" **"+r.LINE_FEED,t+=r.TEXT_NORMAL,t+=r.BOLD_OFF,t+=r.LINE_FEED),t+=r.ALIGN_LEFT,t+=r.DASHED_LINE+r.LINE_FEED,t+=o("Order:",e.orderNumber)+r.LINE_FEED;const n=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});t+=o("Time:",n)+r.LINE_FEED;const s="mobile"===e.orderSource?"MOBILE ORDER":"POS";if(t+=o("Source:",s)+r.LINE_FEED,e.tableNumber&&(t+=r.BOLD_ON,t+=o("TABLE:",e.tableNumber)+r.LINE_FEED,t+=r.BOLD_OFF),e.customerName&&"Walk-in Customer"!==e.customerName&&(t+=o("Customer:",e.customerName)+r.LINE_FEED),t+=r.DASHED_LINE+r.LINE_FEED,t+=r.LINE_FEED,t+=r.BOLD_ON,t+=r.TEXT_DOUBLE_HEIGHT,t+="ORDER ITEMS:"+r.LINE_FEED,t+=r.TEXT_NORMAL,t+=r.BOLD_OFF,t+=r.LINE_FEED,e.items.forEach((n,i)=>{var o;const s=(null===(o=n.menuItem)||void 0===o?void 0:o.name)||n.name,a=n.quantity;t+=r.BOLD_ON,t+=r.TEXT_DOUBLE,t+=a+" x "+s+r.LINE_FEED,t+=r.TEXT_NORMAL,t+=r.BOLD_OFF,n.options&&n.options.length>0&&n.options.forEach(e=>{t+="  \u2605 "+e+r.LINE_FEED}),i<e.items.length-1&&(t+=r.LINE_FEED)}),t+=r.LINE_FEED,t+=r.DASHED_LINE+r.LINE_FEED,e.notes&&e.notes.trim()&&(t+=r.LINE_FEED,t+=r.BOLD_ON,t+="** SPECIAL NOTES **"+r.LINE_FEED,t+=r.BOLD_OFF,t+=e.notes+r.LINE_FEED,t+=r.LINE_FEED,t+=r.DASHED_LINE+r.LINE_FEED),t+=r.LINE_FEED,e.pagerNumber)t+=r.ALIGN_CENTER,t+=r.TEXT_DOUBLE,t+=r.BOLD_ON,t+="PAGER  "+e.pagerNumber+r.LINE_FEED,t+=r.TEXT_NORMAL,t+=r.BOLD_OFF;else{t+=r.ALIGN_CENTER,t+=r.TEXT_DOUBLE,t+=r.BOLD_ON;const n=e.pickupNumber||(e.orderNumber?e.orderNumber.split("-")[1]:"000");t+="PICKUP  "+n+r.LINE_FEED,t+=r.TEXT_NORMAL,t+=r.BOLD_OFF}return t+=r.LINE_FEED,"pickup"===e.orderType?(t+=r.ALIGN_CENTER,t+=r.TEXT_DOUBLE,t+=r.BOLD_ON,t+="** PRE-ORDER PICKUP **"+r.LINE_FEED,t+=r.BOLD_OFF,t+=r.TEXT_NORMAL,t+=r.ALIGN_CENTER,t+=r.BOLD_ON,t+="Pickup: "+(e.scheduledPickupTime?i(e.scheduledPickupTime):"ASAP")+r.LINE_FEED,t+=r.BOLD_OFF):"takeaway"===e.orderType||e.takeawayCharge>0?(t+=r.ALIGN_CENTER,t+=r.TEXT_DOUBLE,t+=r.BOLD_ON,t+="** TAKEAWAY **"+r.LINE_FEED,t+=r.BOLD_OFF,t+=r.TEXT_NORMAL):"delivery"===e.orderType&&(t+=r.ALIGN_CENTER,t+=r.TEXT_DOUBLE,t+=r.BOLD_ON,t+="** DELIVERY **"+r.LINE_FEED,t+=r.BOLD_OFF,t+=r.TEXT_NORMAL,e.deliveryInfo&&(t+=r.LINE_FEED,t+=r.ALIGN_LEFT,t+=r.DASHED_LINE+r.LINE_FEED,t+=r.BOLD_ON,t+="DELIVERY ADDRESS:"+r.LINE_FEED,t+=r.BOLD_OFF,e.deliveryInfo.address&&(t+=e.deliveryInfo.address+r.LINE_FEED),e.deliveryInfo.phone&&(t+="Phone: "+e.deliveryInfo.phone+r.LINE_FEED),e.deliveryInfo.zoneName&&(t+="Zone: "+e.deliveryInfo.zoneName+r.LINE_FEED),e.deliveryInfo.notes&&(t+="Notes: "+e.deliveryInfo.notes+r.LINE_FEED),t+=r.DASHED_LINE+r.LINE_FEED)),t+=r.LINE_FEED,t+=r.LINE_FEED,t+=r.CUT_PARTIAL,t}(e),d=btoa(unescape(encodeURIComponent(a)));let l="#Intent;scheme=rawbt;";s&&(l+="S.s="+encodeURIComponent(s)+";");const E="intent:base64,"+d+l+"package=ru.a402d.rawbtprinter;end;",p=document.createElement("iframe");return p.style.display="none",p.src=E,document.body.appendChild(p),setTimeout(()=>{document.body.removeChild(p)},1e3),!0}catch(s){return console.error("\u274c Kitchen Ticket print error:",s),alert("Failed to print kitchen order ticket.\n\nPlease ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready\n\nError: "+s.message),!1}}function E(e,t){let n=[];n.push("------------------------------------------------"),n.push("Order:                          "+e.orderNumber);const r=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});n.push("Time:                                "+r);const o="mobile"===e.orderSource?"MOBILE ORDER":"POS";if(n.push("Source:                              "+o),e.tableNumber&&n.push("TABLE:                               "+e.tableNumber),e.customerName&&"Walk-in Customer"!==e.customerName&&n.push("Customer:                       "+e.customerName),n.push("------------------------------------------------"),n.push(""),n.push("ORDER ITEMS:"),n.push(""),e.items.forEach((t,r)=>{var i;const o=(null===(i=t.menuItem)||void 0===i?void 0:i.name)||t.name,s=t.quantity;n.push(s+" x "+o),t.options&&t.options.length>0&&t.options.forEach(e=>{n.push("  \u2605 "+e)}),r<e.items.length-1&&n.push("")}),n.push(""),n.push("------------------------------------------------"),e.notes&&e.notes.trim()&&(n.push(""),n.push("** SPECIAL NOTES **"),n.push(e.notes),n.push(""),n.push("------------------------------------------------")),n.push(""),e.pagerNumber)n.push("              PAGER  "+e.pagerNumber);else{const t=e.pickupNumber||(e.orderNumber?e.orderNumber.split("-")[1]:"000");n.push("             PICKUP  "+t)}return n.push(""),"pickup"===e.orderType?(n.push("        ** PRE-ORDER PICKUP **"),n.push("        Pickup: "+(e.scheduledPickupTime?i(e.scheduledPickupTime):"ASAP"))):"takeaway"===e.orderType||e.takeawayCharge>0?n.push("           ** TAKEAWAY **"):"delivery"===e.orderType&&n.push("           ** DELIVERY **"),n.join("\n")}},8406:(e,t,n)=>{n.d(t,{MQ:()=>s,fU:()=>o,ng:()=>r,r6:()=>i});const r=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",i=(e,t,n)=>{if(!e)return"";const i=new Date(e);if(isNaN(i.getTime()))return"";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:r(t)};return i.toLocaleString("en-MY",{...o,...n})},o=(e,t)=>i(e,t,{year:void 0,month:void 0,day:void 0}),s=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const n=Date.now()-t,r=Math.floor(n/6e4),i=Math.floor(n/36e5),o=Math.floor(n/864e5);return r<1?"just now":1===r?"1 min ago":r<60?`${r} mins ago`:1===i?"1 hour ago":i<24?`${i} hours ago`:1===o?"1 day ago":`${o} days ago`}},9189:(e,t,n)=>{n.d(t,{A:()=>l});var r=n(9950),i=n(8930),o=n(9610),s=n(2687),a=n(6038),c=n(9018),d=n(4414);const l=e=>{let{isOpen:t,onClose:n,menuItem:l,onConfirm:E}=e;const{optionGroups:p}=(0,i.b)(),{operationSettings:u}=(0,c.Pj)(),[h,x]=(0,r.useState)(1),[m,F]=(0,r.useState)([]),g=l.optionGroups?l.optionGroups.map(e=>p.find(t=>t.id===e)).filter(e=>void 0!==e):[],_=(e,t,n,r)=>{if(n)F(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);else{const n=g.find(e=>e.id===t);if(n){const t=n.options.map(e=>e.id),i=m.includes(e);F(i&&!r?e=>e.filter(e=>!t.includes(e)):n=>[...n.filter(e=>!t.includes(e)),e])}}},D=()=>g.filter(e=>e.required).every(e=>m.some(t=>e.options.some(e=>e.id===t))),L=()=>{x(1),F([]),n()},N=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o.yl,{variant:"secondary",onClick:L,children:"Cancel"}),(0,d.jsx)(o.yl,{variant:"primary",onClick:()=>{if(D()){const e=m.map(e=>{const t=g.flatMap(e=>e.options).find(t=>t.id===e);return t?t.name:""}).filter(Boolean),t=m.map(e=>{const t=g.flatMap(e=>e.options).find(t=>t.id===e);return t?{id:t.id,name:t.name,price:t.price}:null}).filter(e=>null!==e);E(h,e,t),x(1),F([])}},disabled:!D(),children:"Add to Order"})]});return(0,d.jsxs)(o.aF,{isOpen:t,onClose:L,title:"Customize Order",footer:N,children:[(0,d.jsxs)(s.kr,{children:[(0,d.jsx)(s.hO,{style:{backgroundImage:l.image?`url(${l.image})`:"none",backgroundSize:"cover",backgroundPosition:"center",fontSize:l.image?"0":"32px"},children:!l.image&&l.emoji}),(0,d.jsxs)(s.iz,{children:[(0,d.jsx)(s.bU,{children:l.name}),(0,d.jsx)(s.NM,{children:(0,a.vv)(l.price,u.currency)})]})]}),g.map(e=>(0,d.jsxs)(s.wn,{children:[(0,d.jsxs)(o.lR,{children:[e.name,e.required&&(0,d.jsx)(s.I1,{children:"*"})]}),e.multiple?(0,d.jsx)(s.$Q,{children:e.options.map(t=>(0,d.jsxs)(s.Sb,{children:[(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,d.jsx)(s.Oc,{type:"checkbox",checked:m.includes(t.id),onChange:()=>_(t.id,e.id,e.multiple,e.required)}),(0,d.jsx)(s.PU,{children:t.name})]}),t.price>0&&(0,d.jsxs)(s.jj,{children:["+",(0,a.vv)(t.price,u.currency)]})]},t.id))}):(0,d.jsx)(s.z6,{children:e.options.map(t=>(0,d.jsxs)(s.a,{selected:m.includes(t.id),onClick:()=>_(t.id,e.id,e.multiple,e.required),style:"spice"===e.id&&m.includes(t.id)?{borderColor:"#F97316",backgroundColor:"rgba(249, 115, 22, 0.1)",color:"#EA580C"}:{},children:[(0,d.jsx)("div",{children:t.name}),t.price>0&&(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:["+",(0,a.vv)(t.price,u.currency)]})]},t.id))})]},e.id)),(0,d.jsxs)(s.wn,{children:[(0,d.jsx)(o.lR,{children:"Quantity"}),(0,d.jsxs)(s.F8,{children:[(0,d.jsx)(s.ey,{onClick:()=>x(Math.max(1,h-1)),disabled:h<=1,children:(0,d.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("path",{d:"M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),(0,d.jsx)(s.FA,{children:h}),(0,d.jsx)(s.ey,{onClick:()=>x(h+1),children:(0,d.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("path",{d:"M7 3V11M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]})]}),(0,d.jsxs)(s.i_,{children:[(0,d.jsx)(s.nJ,{children:"Total:"}),(0,d.jsx)(s.aX,{children:(0,a.vv)((()=>{let e=l.price*h;return m.forEach(t=>{const n=g.flatMap(e=>e.options).find(e=>e.id===t);n&&(e+=n.price*h)}),e})(),u.currency)})]})]})}}}]);