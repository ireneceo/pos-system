"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7693],{2687:(e,t,r)=>{r.d(t,{$Q:()=>E,F8:()=>u,FA:()=>F,I1:()=>o,NM:()=>y,Oc:()=>d,PU:()=>l,Sb:()=>c,a:()=>a,aX:()=>x,bU:()=>g,ey:()=>h,hO:()=>L,i_:()=>m,iz:()=>N,jj:()=>p,kr:()=>D,nJ:()=>_,wn:()=>i,z6:()=>s});var n=r(4752);const o=n.Ay.span`
  color: #EF4444;
  margin-left: 4px;
`,i=n.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,s=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`,a=n.Ay.button`
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
`,E=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,c=n.Ay.label`
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
`,d=n.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`,l=n.Ay.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`,p=n.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,u=n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`,h=n.Ay.button`
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
`,F=n.Ay.span`
  font-size: 18px;
  font-weight: 600;
  width: 40px;
  text-align: center;
  color: #1F2937;
`,m=n.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding: 16px 0 0 0;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,_=n.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,x=n.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`,D=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`,L=n.Ay.div`
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,N=n.Ay.div``,g=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,y=n.Ay.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`},2966:(e,t,r)=>{r.d(t,{A:()=>B});var n=r(9950),o=r(9610),i=r(2687),s=r(4752),a=r(6038),E=r(9018),c=r(4414);const d=s.Ay.div`
  background: linear-gradient(to bottom, #F8FAFC, #F1F5F9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,l=s.Ay.div`
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
`,F=s.Ay.input`
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
`,_=s.Ay.button`
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
`,x=s.Ay.div`
  background: #F0FDF4;
  border: 1px solid #86EFAC;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 16px;
`,D=s.Ay.div`
  font-size: 14px;
  color: #059669;
  margin-bottom: 4px;
`,L=s.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #047857;
`,N=(0,s.Ay)(l)`
  color: #10B981;
`,g=s.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,y=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,I=s.Ay.div`
  font-weight: 600;
  color: #0369A1;
  font-size: 14px;
`,b=s.Ay.div`
  font-weight: 700;
  color: #0EA5E9;
  font-size: 16px;
`,A=s.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 12px;

  input {
    width: 18px;
    height: 18px;
    accent-color: #0EA5E9;
  }

  span {
    font-size: 14px;
    color: #1F2937;
  }
`,T=s.Ay.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #E0E7FF;
  accent-color: #0EA5E9;
  cursor: pointer;
`,f=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 12px;
  background: white;
  border-radius: 6px;
`,v=s.Ay.div`
  font-size: 14px;
  color: #1F2937;

  strong {
    color: #0EA5E9;
  }
`,O=s.Ay.div`
  font-weight: 700;
  color: #059669;
  font-size: 16px;
`,B=e=>{var t;let{isOpen:r,onClose:s,total:B,subtotal:R,tax:C,serviceCharge:k=0,takeawayCharge:j=0,discountAmount:w=0,couponDiscount:S=0,onConfirmPayment:P,paymentMethods:M,taxRate:U=6,serviceChargeRate:z=10,taxEnabled:X=!0,serviceChargeEnabled:G=!1,customerPoints:$=0,customerTier:H="Bronze",membershipSettings:Y,onPointsChange:K}=e;const{operationSettings:W}=(0,E.Pj)(),[V,q]=(0,n.useState)(!1),[Z,J]=(0,n.useState)(0),[Q,ee]=(0,n.useState)(0),te=n.useMemo(()=>{if(!Y||!Y.is_active||$<=0)return 0;const e=Y.min_points_to_use||100,t=parseFloat(Y.max_points_per_order_percent)||50,r=parseFloat(Y.points_to_currency)||100,n=t/100*(R-w-S),o=Math.floor(n*r),i=Math.min($,o);return $<e?0:i},[Y,$,R,w,S]);(0,n.useEffect)(()=>{if(Y&&Z>0){const e=parseFloat(Y.points_to_currency)||100,t=Z/e;ee(t),null===K||void 0===K||K(Z,t)}else ee(0),null===K||void 0===K||K(0,0)},[Z,Y,K]),(0,n.useEffect)(()=>{r||(q(!1),J(0),ee(0))},[r]);const re=B-Q,ne=(()=>{if(!M)return[{key:"cash",label:"Cash"},{key:"card",label:"Card"},{key:"ewallet",label:"E-Wallet"},{key:"bankTransfer",label:"Bank Transfer"}];const e=M._order,t=e&&Array.isArray(e)?e.filter(e=>"_order"!==e):["cash","card","ewallet","bankTransfer"],r=[];return t.forEach(e=>{const t=M[e];t&&t.enabled&&t.availableIn&&t.availableIn.includes("pos")&&r.push({key:e,label:t.label})}),r})(),[oe,ie]=(0,n.useState)((null===(t=ne[0])||void 0===t?void 0:t.key)||"cash"),[se,ae]=(0,n.useState)("");(0,n.useEffect)(()=>{ne.length>0&&(oe&&ne.find(e=>e.key===oe)||ie(ne[0].key))},[ne,oe]);const Ee=()=>{const e=parseFloat(se)||0;return Math.max(0,e-re)},ce=(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o.yl,{variant:"secondary",onClick:s,children:"Cancel"}),(0,c.jsx)(o.yl,{variant:"primary",onClick:()=>{if("cash"===oe){const e=parseFloat(se)||0;e>=re&&P(oe,e,Ee(),Z,Q)}else P(oe,void 0,void 0,Z,Q)},disabled:!(()=>{if("cash"===oe){return(parseFloat(se)||0)>=re}return!0})(),children:"Confirm Payment"})]});return(0,c.jsxs)(o.aF,{isOpen:r,onClose:s,title:"Payment",footer:ce,children:[(0,c.jsxs)(d,{children:[(0,c.jsxs)(l,{children:[(0,c.jsx)(p,{children:"Subtotal"}),(0,c.jsx)(u,{children:(0,a.vv)(R,W.currency)})]}),j>0&&(0,c.jsxs)(l,{children:[(0,c.jsx)(p,{children:"Takeaway Charge"}),(0,c.jsx)(u,{children:(0,a.vv)(j,W.currency)})]}),w>0&&(0,c.jsxs)(N,{children:[(0,c.jsx)(p,{children:"Discount"}),(0,c.jsx)(u,{children:(0,a.vv)(-w,W.currency)})]}),S>0&&(0,c.jsxs)(N,{children:[(0,c.jsx)(p,{children:"Coupon Discount"}),(0,c.jsx)(u,{children:(0,a.vv)(-S,W.currency)})]}),Q>0&&(0,c.jsxs)(N,{children:[(0,c.jsxs)(p,{children:["Points Discount (",Z.toLocaleString()," pts)"]}),(0,c.jsx)(u,{children:(0,a.vv)(-Q,W.currency)})]}),G&&k>0&&(0,c.jsxs)(l,{children:[(0,c.jsxs)(p,{children:["Service Charge (",z,"%)"]}),(0,c.jsx)(u,{children:(0,a.vv)(k,W.currency)})]}),X&&C>0&&(0,c.jsxs)(l,{children:[(0,c.jsxs)(p,{children:["Tax (",U,"%)"]}),(0,c.jsx)(u,{children:(0,a.vv)(C,W.currency)})]})]}),(0,c.jsxs)(i.i_,{children:[(0,c.jsx)(i.nJ,{children:"Total Amount"}),(0,c.jsx)(i.aX,{children:(0,a.vv)(re,W.currency)})]}),(null===Y||void 0===Y?void 0:Y.is_active)&&$>0&&(0,c.jsxs)(g,{children:[(0,c.jsxs)(y,{children:[(0,c.jsxs)(I,{children:["Use Points (",H,")"]}),(0,c.jsxs)(b,{children:[$.toLocaleString()," pts available"]})]}),te>0?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(A,{children:[(0,c.jsx)("input",{type:"checkbox",checked:V,onChange:e=>{q(e.target.checked),e.target.checked?J(te):J(0)}}),(0,c.jsx)("span",{children:"Use points for this order"})]}),V&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"12px",color:"#6B7280",marginBottom:"8px"},children:[(0,c.jsxs)("span",{children:[(null===Y||void 0===Y?void 0:Y.min_points_to_use)||100," pts"]}),(0,c.jsxs)("span",{children:[te.toLocaleString()," pts (max)"]})]}),(0,c.jsx)(T,{type:"range",min:(null===Y||void 0===Y?void 0:Y.min_points_to_use)||100,max:te,value:Z,onChange:e=>J(Number(e.target.value))}),(0,c.jsxs)(f,{children:[(0,c.jsxs)(v,{children:["Using: ",(0,c.jsxs)("strong",{children:[Z.toLocaleString()," pts"]})]}),(0,c.jsxs)(O,{children:["-",(0,a.vv)(Q,W.currency)]})]})]})]}):(0,c.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center"},children:["Minimum ",(null===Y||void 0===Y?void 0:Y.min_points_to_use)||100," points required to use"]})]}),(0,c.jsxs)(i.wn,{children:[(0,c.jsx)(o.lR,{children:"Payment Method"}),(0,c.jsx)(i.z6,{children:ne.map(e=>(0,c.jsx)(i.a,{selected:oe===e.key,onClick:()=>ie(e.key),children:(0,c.jsx)("div",{children:e.label})},e.key))})]}),"cash"===oe&&(0,c.jsxs)(h,{children:[(0,c.jsx)(o.lR,{children:"Cash Amount"}),(0,c.jsx)(F,{type:"text",placeholder:"Enter amount received",value:se,onChange:e=>(e=>{const t=e.replace(/[^0-9.]/g,"");ae(t)})(e.target.value),autoFocus:!0}),(0,c.jsx)(m,{children:[50,100,150,200].map(e=>(0,c.jsx)(_,{selected:se===e.toString(),onClick:()=>ae(e.toString()),children:(0,a.vv)(e,W.currency)},e))}),parseFloat(se)>=re&&(0,c.jsxs)(x,{children:[(0,c.jsx)(D,{children:"Change"}),(0,c.jsx)(L,{children:(0,a.vv)(Ee(),W.currency)})]})]})]})}},5863:(e,t,r)=>{r.d(t,{KB:()=>c,Si:()=>E,pG:()=>a,qE:()=>s});const n={INIT:"\x1b@",ALIGN_LEFT:"\x1ba\0",ALIGN_CENTER:"\x1ba\x01",ALIGN_RIGHT:"\x1ba\x02",TEXT_NORMAL:"\x1d!\0",TEXT_DOUBLE_HEIGHT:"\x1d!\x01",TEXT_DOUBLE_WIDTH:"\x1d!\x10",TEXT_DOUBLE:"\x1d!\x11",BOLD_ON:"\x1bE\x01",BOLD_OFF:"\x1bE\0",REVERSE_ON:"\x1dB\x01",REVERSE_OFF:"\x1dB\0",LINE_FEED:"\n",DASHED_LINE:"------------------------------------------------",CUT_PARTIAL:"\x1dVA\0"};function o(e){const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},o=n(t),i=n(r);return o.period===i.period?`${o.time} - ${i.time} ${i.period}`:`${o.time} ${o.period} - ${i.time} ${i.period}`}function i(e,t){const r=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:48)-e.length-t.length;return e+" ".repeat(Math.max(r,1))+t}function s(e,t){let r="";r+=n.INIT,"pickup"===e.orderType?(r+=n.ALIGN_CENTER,r+=n.TEXT_DOUBLE,r+=n.BOLD_ON,r+="** PRE-ORDER PICKUP **"+n.LINE_FEED,r+=n.BOLD_OFF,r+=n.TEXT_NORMAL,r+=n.BOLD_ON,r+="Pickup: "+(e.scheduledPickupTime?o(e.scheduledPickupTime):"ASAP")+n.LINE_FEED,r+=n.BOLD_OFF,r+=n.LINE_FEED,r+=n.LINE_FEED):e.takeawayCharge&&e.takeawayCharge>0&&(r+=n.ALIGN_CENTER,r+=n.TEXT_DOUBLE,r+=n.BOLD_ON,r+="** TAKEAWAY **"+n.LINE_FEED,r+=n.BOLD_OFF,r+=n.TEXT_NORMAL,r+=n.LINE_FEED,r+=n.LINE_FEED),r+=n.ALIGN_CENTER,r+=n.TEXT_DOUBLE,r+=n.BOLD_ON,t.name&&(r+=t.name+n.LINE_FEED),r+=n.TEXT_NORMAL,r+=n.BOLD_OFF,r+=n.LINE_FEED,t.address&&(r+=t.address+n.LINE_FEED),t.phone&&(r+="Tel: "+t.phone+n.LINE_FEED),t.gstRegNo&&(r+="Tax No: "+t.gstRegNo+n.LINE_FEED),r+=n.LINE_FEED,r+=n.DASHED_LINE+n.LINE_FEED,r+=n.ALIGN_LEFT,r+=i("Order:",e.orderNumber)+n.LINE_FEED,e.pagerNumber?r+=i("Pager #:",e.pagerNumber)+n.LINE_FEED:e.pickupNumber&&(r+=i("Pickup #:",e.pickupNumber)+n.LINE_FEED);const s=e.date.toLocaleDateString("en-MY"),a=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});if(r+=i("Date:",s)+n.LINE_FEED,r+=i("Time:",a)+n.LINE_FEED,r+=n.DASHED_LINE+n.LINE_FEED,r+=n.LINE_FEED,e.items.forEach(e=>{const t=e.menuItem.name,o=e.quantity,s=e.menuItem.price;r+=i(t,"RM "+(o*s).toFixed(2))+n.LINE_FEED,r+=i("  "+o+" x RM "+s.toFixed(2),"")+n.LINE_FEED,e.options&&e.options.length>0&&e.options.forEach(e=>{r+="  + "+e+n.LINE_FEED})}),r+=n.LINE_FEED,r+=n.DASHED_LINE+n.LINE_FEED,r+=i("Subtotal:","RM "+e.subtotal.toFixed(2))+n.LINE_FEED,e.takeawayCharge&&e.takeawayCharge>0&&(r+=i("Takeaway Charge:","RM "+e.takeawayCharge.toFixed(2))+n.LINE_FEED),e.discount&&e.discount>0&&(r+=i("Discount:","- RM "+e.discount.toFixed(2))+n.LINE_FEED),e.discountPolicy&&e.discountPolicy.amount>0){const t="Discount ("+e.discountPolicy.name+"):";r+=i(t,"- RM "+e.discountPolicy.amount.toFixed(2))+n.LINE_FEED}if(e.coupon&&e.coupon.discount>0){const t="Coupon ("+e.coupon.code+"):";r+=i(t,"- RM "+e.coupon.discount.toFixed(2))+n.LINE_FEED}if(e.serviceCharge&&e.serviceCharge>0){const t="Service Charge ("+(e.serviceChargeRate||10)+"%):";r+=i(t,"RM "+e.serviceCharge.toFixed(2))+n.LINE_FEED}if(e.tax&&e.tax>0){const t="Tax ("+(e.taxRate||6)+"%):";r+=i(t,"RM "+e.tax.toFixed(2))+n.LINE_FEED}r+=n.DASHED_LINE+n.LINE_FEED,r+=n.BOLD_ON,r+=n.TEXT_DOUBLE_HEIGHT,r+=i("TOTAL:","RM "+e.total.toFixed(2))+n.LINE_FEED,r+=n.TEXT_NORMAL,r+=n.BOLD_OFF,r+=n.LINE_FEED,r+=n.DASHED_LINE+n.LINE_FEED;const E=e.paymentMethod?e.paymentMethod.toUpperCase():"CASH";return r+=i("Payment:",E)+n.LINE_FEED,"cash"===e.paymentMethod&&e.amountReceived>0&&(r+=i("Received:","RM "+e.amountReceived.toFixed(2))+n.LINE_FEED,r+=i("Change:","RM "+e.change.toFixed(2))+n.LINE_FEED),r+=n.LINE_FEED,r+=n.ALIGN_CENTER,r+="*** CUSTOMER COPY ***"+n.LINE_FEED,r+="Thank you for your purchase!"+n.LINE_FEED,r+="Please keep this receipt"+n.LINE_FEED,r+="for your records"+n.LINE_FEED,r+=n.LINE_FEED,r+=n.LINE_FEED,r+=n.LINE_FEED,r+=n.CUT_PARTIAL,r}async function a(e,t){try{const r=s(e,t),n=btoa(unescape(encodeURIComponent(r))),o="intent:base64,"+n+"#Intent;scheme=rawbt;"+"package=ru.a402d.rawbtprinter;end;",i=document.createElement("iframe");return i.style.display="none",i.src=o,document.body.appendChild(i),setTimeout(()=>{document.body.removeChild(i)},1e3),!0}catch(r){return console.error("\u274c RawBT print error:",r),alert("Failed to print bill.\n\nPlease ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready\n\nError: "+r.message),!1}}async function E(e,t){try{const t=function(e){let t="";t+=n.INIT,t+=n.ALIGN_LEFT,t+=n.DASHED_LINE+n.LINE_FEED,t+=i("Order:",e.orderNumber)+n.LINE_FEED;const r=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});t+=i("Time:",r)+n.LINE_FEED;const s="mobile"===e.orderSource?"MOBILE ORDER":"POS";if(t+=i("Source:",s)+n.LINE_FEED,e.tableNumber&&(t+=n.BOLD_ON,t+=i("TABLE:",e.tableNumber)+n.LINE_FEED,t+=n.BOLD_OFF),e.customerName&&"Walk-in Customer"!==e.customerName&&(t+=i("Customer:",e.customerName)+n.LINE_FEED),t+=n.DASHED_LINE+n.LINE_FEED,t+=n.LINE_FEED,t+=n.BOLD_ON,t+=n.TEXT_DOUBLE_HEIGHT,t+="ORDER ITEMS:"+n.LINE_FEED,t+=n.TEXT_NORMAL,t+=n.BOLD_OFF,t+=n.LINE_FEED,e.items.forEach((r,o)=>{var i;const s=(null===(i=r.menuItem)||void 0===i?void 0:i.name)||r.name,a=r.quantity;t+=n.BOLD_ON,t+=n.TEXT_DOUBLE,t+=a+" x "+s+n.LINE_FEED,t+=n.TEXT_NORMAL,t+=n.BOLD_OFF,r.options&&r.options.length>0&&r.options.forEach(e=>{t+="  \u2605 "+e+n.LINE_FEED}),o<e.items.length-1&&(t+=n.LINE_FEED)}),t+=n.LINE_FEED,t+=n.DASHED_LINE+n.LINE_FEED,e.notes&&e.notes.trim()&&(t+=n.LINE_FEED,t+=n.BOLD_ON,t+="** SPECIAL NOTES **"+n.LINE_FEED,t+=n.BOLD_OFF,t+=e.notes+n.LINE_FEED,t+=n.LINE_FEED,t+=n.DASHED_LINE+n.LINE_FEED),t+=n.LINE_FEED,e.pagerNumber)t+=n.ALIGN_CENTER,t+=n.TEXT_DOUBLE,t+=n.BOLD_ON,t+="PAGER  "+e.pagerNumber+n.LINE_FEED,t+=n.TEXT_NORMAL,t+=n.BOLD_OFF;else{t+=n.ALIGN_CENTER,t+=n.TEXT_DOUBLE,t+=n.BOLD_ON;const r=e.pickupNumber||(e.orderNumber?e.orderNumber.split("-")[1]:"000");t+="PICKUP  "+r+n.LINE_FEED,t+=n.TEXT_NORMAL,t+=n.BOLD_OFF}return t+=n.LINE_FEED,"pickup"===e.orderType?(t+=n.ALIGN_CENTER,t+=n.TEXT_DOUBLE,t+=n.BOLD_ON,t+="** PRE-ORDER PICKUP **"+n.LINE_FEED,t+=n.BOLD_OFF,t+=n.TEXT_NORMAL,t+=n.ALIGN_CENTER,t+=n.BOLD_ON,t+="Pickup: "+(e.scheduledPickupTime?o(e.scheduledPickupTime):"ASAP")+n.LINE_FEED,t+=n.BOLD_OFF):"takeaway"===e.orderType||e.takeawayCharge>0?(t+=n.ALIGN_CENTER,t+=n.TEXT_DOUBLE,t+=n.BOLD_ON,t+="** TAKEAWAY **"+n.LINE_FEED,t+=n.BOLD_OFF,t+=n.TEXT_NORMAL):"delivery"===e.orderType&&(t+=n.ALIGN_CENTER,t+=n.TEXT_DOUBLE,t+=n.BOLD_ON,t+="** DELIVERY **"+n.LINE_FEED,t+=n.BOLD_OFF,t+=n.TEXT_NORMAL,e.deliveryInfo&&(t+=n.LINE_FEED,t+=n.ALIGN_LEFT,t+=n.DASHED_LINE+n.LINE_FEED,t+=n.BOLD_ON,t+="DELIVERY ADDRESS:"+n.LINE_FEED,t+=n.BOLD_OFF,e.deliveryInfo.address&&(t+=e.deliveryInfo.address+n.LINE_FEED),e.deliveryInfo.phone&&(t+="Phone: "+e.deliveryInfo.phone+n.LINE_FEED),e.deliveryInfo.zoneName&&(t+="Zone: "+e.deliveryInfo.zoneName+n.LINE_FEED),e.deliveryInfo.notes&&(t+="Notes: "+e.deliveryInfo.notes+n.LINE_FEED),t+=n.DASHED_LINE+n.LINE_FEED)),t+=n.LINE_FEED,t+=n.LINE_FEED,t+=n.CUT_PARTIAL,t}(e),r=btoa(unescape(encodeURIComponent(t))),s="intent:base64,"+r+"#Intent;scheme=rawbt;"+"package=ru.a402d.rawbtprinter;end;",a=document.createElement("iframe");return a.style.display="none",a.src=s,document.body.appendChild(a),setTimeout(()=>{document.body.removeChild(a)},1e3),!0}catch(r){return console.error("\u274c Kitchen Ticket print error:",r),alert("Failed to print kitchen order ticket.\n\nPlease ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready\n\nError: "+r.message),!1}}function c(e,t){let r=[];r.push("------------------------------------------------"),r.push("Order:                          "+e.orderNumber);const n=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});r.push("Time:                                "+n);const i="mobile"===e.orderSource?"MOBILE ORDER":"POS";if(r.push("Source:                              "+i),e.tableNumber&&r.push("TABLE:                               "+e.tableNumber),e.customerName&&"Walk-in Customer"!==e.customerName&&r.push("Customer:                       "+e.customerName),r.push("------------------------------------------------"),r.push(""),r.push("ORDER ITEMS:"),r.push(""),e.items.forEach((t,n)=>{var o;const i=(null===(o=t.menuItem)||void 0===o?void 0:o.name)||t.name,s=t.quantity;r.push(s+" x "+i),t.options&&t.options.length>0&&t.options.forEach(e=>{r.push("  \u2605 "+e)}),n<e.items.length-1&&r.push("")}),r.push(""),r.push("------------------------------------------------"),e.notes&&e.notes.trim()&&(r.push(""),r.push("** SPECIAL NOTES **"),r.push(e.notes),r.push(""),r.push("------------------------------------------------")),r.push(""),e.pagerNumber)r.push("              PAGER  "+e.pagerNumber);else{const t=e.pickupNumber||(e.orderNumber?e.orderNumber.split("-")[1]:"000");r.push("             PICKUP  "+t)}return r.push(""),"pickup"===e.orderType?(r.push("        ** PRE-ORDER PICKUP **"),r.push("        Pickup: "+(e.scheduledPickupTime?o(e.scheduledPickupTime):"ASAP"))):"takeaway"===e.orderType||e.takeawayCharge>0?r.push("           ** TAKEAWAY **"):"delivery"===e.orderType&&r.push("           ** DELIVERY **"),r.join("\n")}},8406:(e,t,r)=>{r.d(t,{MQ:()=>s,fU:()=>i,ng:()=>n,r6:()=>o});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",o=(e,t,r)=>{if(!e)return"";const o=new Date(e);if(isNaN(o.getTime()))return"";const i={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return o.toLocaleString("en-MY",{...i,...r})},i=(e,t)=>o(e,t,{year:void 0,month:void 0,day:void 0}),s=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const r=Date.now()-t,n=Math.floor(r/6e4),o=Math.floor(r/36e5),i=Math.floor(r/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===o?"1 hour ago":o<24?`${o} hours ago`:1===i?"1 day ago":`${i} days ago`}}}]);