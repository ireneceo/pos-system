"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7693],{2687:(e,t,r)=>{r.d(t,{$Q:()=>s,F8:()=>u,FA:()=>F,I1:()=>o,NM:()=>x,Oc:()=>c,PU:()=>l,Sb:()=>d,a:()=>E,aX:()=>L,bU:()=>g,ey:()=>h,hO:()=>m,i_:()=>D,iz:()=>I,jj:()=>p,kr:()=>_,nJ:()=>N,wn:()=>i,z6:()=>a});var n=r(4752);const o=n.Ay.span`
  color: #EF4444;
  margin-left: 4px;
`,i=n.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,a=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`,E=n.Ay.button`
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
`,s=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,d=n.Ay.label`
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
`,c=n.Ay.input`
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
`,D=n.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding: 16px 0 0 0;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,N=n.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,L=n.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`,_=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`,m=n.Ay.div`
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,I=n.Ay.div``,g=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,x=n.Ay.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`},2966:(e,t,r)=>{r.d(t,{A:()=>g});var n=r(9950),o=r(9610),i=r(2687),a=r(4752),E=r(6038),s=r(9018),d=r(4414);const c=a.Ay.div`
  background: linear-gradient(to bottom, #F8FAFC, #F1F5F9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,l=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`,p=a.Ay.span`
  color: #6B7280;
`,u=a.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,h=a.Ay.div`
  margin-bottom: 20px;
`,F=a.Ay.input`
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
`,D=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
`,N=a.Ay.button`
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
`,L=a.Ay.div`
  background: #F0FDF4;
  border: 1px solid #86EFAC;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 16px;
`,_=a.Ay.div`
  font-size: 14px;
  color: #059669;
  margin-bottom: 4px;
`,m=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #047857;
`,I=(0,a.Ay)(l)`
  color: #10B981;
`,g=e=>{var t;let{isOpen:r,onClose:a,total:g,subtotal:x,tax:y,serviceCharge:T=0,takeawayCharge:b=0,discountAmount:A=0,couponDiscount:O=0,onConfirmPayment:f,paymentMethods:v,taxRate:B=6,serviceChargeRate:R=10,taxEnabled:C=!0,serviceChargeEnabled:k=!1}=e;const{operationSettings:w}=(0,s.Pj)(),P=(()=>{if(!v)return[{key:"cash",label:"Cash"},{key:"card",label:"Card"},{key:"ewallet",label:"E-Wallet"},{key:"bankTransfer",label:"Bank Transfer"}];const e=v._order,t=e&&Array.isArray(e)?e.filter(e=>"_order"!==e):["cash","card","ewallet","bankTransfer"],r=[];return t.forEach(e=>{const t=v[e];t&&t.enabled&&t.availableIn&&t.availableIn.includes("pos")&&r.push({key:e,label:t.label})}),r})(),[j,S]=(0,n.useState)((null===(t=P[0])||void 0===t?void 0:t.key)||"cash"),[M,U]=(0,n.useState)("");(0,n.useEffect)(()=>{P.length>0&&(j&&P.find(e=>e.key===j)||S(P[0].key))},[P,j]);const X=()=>{const e=parseFloat(M)||0;return Math.max(0,e-g)},G=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o.yl,{variant:"secondary",onClick:a,children:"Cancel"}),(0,d.jsx)(o.yl,{variant:"primary",onClick:()=>{if("cash"===j){const e=parseFloat(M)||0;e>=g&&f(j,e,X())}else f(j)},disabled:!(()=>{if("cash"===j){return(parseFloat(M)||0)>=g}return!0})(),children:"Confirm Payment"})]});return(0,d.jsxs)(o.aF,{isOpen:r,onClose:a,title:"Payment",footer:G,children:[(0,d.jsxs)(c,{children:[(0,d.jsxs)(l,{children:[(0,d.jsx)(p,{children:"Subtotal"}),(0,d.jsx)(u,{children:(0,E.vv)(x,w.currency)})]}),b>0&&(0,d.jsxs)(l,{children:[(0,d.jsx)(p,{children:"Takeaway Charge"}),(0,d.jsx)(u,{children:(0,E.vv)(b,w.currency)})]}),A>0&&(0,d.jsxs)(I,{children:[(0,d.jsx)(p,{children:"Discount"}),(0,d.jsx)(u,{children:(0,E.vv)(-A,w.currency)})]}),O>0&&(0,d.jsxs)(I,{children:[(0,d.jsx)(p,{children:"Coupon Discount"}),(0,d.jsx)(u,{children:(0,E.vv)(-O,w.currency)})]}),k&&T>0&&(0,d.jsxs)(l,{children:[(0,d.jsxs)(p,{children:["Service Charge (",R,"%)"]}),(0,d.jsx)(u,{children:(0,E.vv)(T,w.currency)})]}),C&&y>0&&(0,d.jsxs)(l,{children:[(0,d.jsxs)(p,{children:["Tax (",B,"%)"]}),(0,d.jsx)(u,{children:(0,E.vv)(y,w.currency)})]})]}),(0,d.jsxs)(i.i_,{children:[(0,d.jsx)(i.nJ,{children:"Total Amount"}),(0,d.jsx)(i.aX,{children:(0,E.vv)(g,w.currency)})]}),(0,d.jsxs)(i.wn,{children:[(0,d.jsx)(o.lR,{children:"Payment Method"}),(0,d.jsx)(i.z6,{children:P.map(e=>(0,d.jsx)(i.a,{selected:j===e.key,onClick:()=>S(e.key),children:(0,d.jsx)("div",{children:e.label})},e.key))})]}),"cash"===j&&(0,d.jsxs)(h,{children:[(0,d.jsx)(o.lR,{children:"Cash Amount"}),(0,d.jsx)(F,{type:"text",placeholder:"Enter amount received",value:M,onChange:e=>(e=>{const t=e.replace(/[^0-9.]/g,"");U(t)})(e.target.value),autoFocus:!0}),(0,d.jsx)(D,{children:[50,100,150,200].map(e=>(0,d.jsx)(N,{selected:M===e.toString(),onClick:()=>U(e.toString()),children:(0,E.vv)(e,w.currency)},e))}),parseFloat(M)>=g&&(0,d.jsxs)(L,{children:[(0,d.jsx)(_,{children:"Change"}),(0,d.jsx)(m,{children:(0,E.vv)(X(),w.currency)})]})]})]})}},5863:(e,t,r)=>{r.d(t,{KB:()=>d,Si:()=>s,pG:()=>E,qE:()=>a});const n={INIT:"\x1b@",ALIGN_LEFT:"\x1ba\0",ALIGN_CENTER:"\x1ba\x01",ALIGN_RIGHT:"\x1ba\x02",TEXT_NORMAL:"\x1d!\0",TEXT_DOUBLE_HEIGHT:"\x1d!\x01",TEXT_DOUBLE_WIDTH:"\x1d!\x10",TEXT_DOUBLE:"\x1d!\x11",BOLD_ON:"\x1bE\x01",BOLD_OFF:"\x1bE\0",REVERSE_ON:"\x1dB\x01",REVERSE_OFF:"\x1dB\0",LINE_FEED:"\n",DASHED_LINE:"------------------------------------------------",CUT_PARTIAL:"\x1dVA\0"};function o(e){const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},o=n(t),i=n(r);return o.period===i.period?`${o.time} - ${i.time} ${i.period}`:`${o.time} ${o.period} - ${i.time} ${i.period}`}function i(e,t){const r=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:48)-e.length-t.length;return e+" ".repeat(Math.max(r,1))+t}function a(e,t){let r="";r+=n.INIT,"pickup"===e.orderType?(r+=n.ALIGN_CENTER,r+=n.TEXT_DOUBLE,r+=n.BOLD_ON,r+="** PRE-ORDER PICKUP **"+n.LINE_FEED,r+=n.BOLD_OFF,r+=n.TEXT_NORMAL,r+=n.BOLD_ON,r+="Pickup: "+(e.scheduledPickupTime?o(e.scheduledPickupTime):"ASAP")+n.LINE_FEED,r+=n.BOLD_OFF,r+=n.LINE_FEED,r+=n.LINE_FEED):e.takeawayCharge&&e.takeawayCharge>0&&(r+=n.ALIGN_CENTER,r+=n.TEXT_DOUBLE,r+=n.BOLD_ON,r+="** TAKEAWAY **"+n.LINE_FEED,r+=n.BOLD_OFF,r+=n.TEXT_NORMAL,r+=n.LINE_FEED,r+=n.LINE_FEED),r+=n.ALIGN_CENTER,r+=n.TEXT_DOUBLE,r+=n.BOLD_ON,t.name&&(r+=t.name+n.LINE_FEED),r+=n.TEXT_NORMAL,r+=n.BOLD_OFF,r+=n.LINE_FEED,t.address&&(r+=t.address+n.LINE_FEED),t.phone&&(r+="Tel: "+t.phone+n.LINE_FEED),t.gstRegNo&&(r+="Tax No: "+t.gstRegNo+n.LINE_FEED),r+=n.LINE_FEED,r+=n.DASHED_LINE+n.LINE_FEED,r+=n.ALIGN_LEFT,r+=i("Order:",e.orderNumber)+n.LINE_FEED,e.pagerNumber?r+=i("Pager #:",e.pagerNumber)+n.LINE_FEED:e.pickupNumber&&(r+=i("Pickup #:",e.pickupNumber)+n.LINE_FEED);const a=e.date.toLocaleDateString("en-MY"),E=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});if(r+=i("Date:",a)+n.LINE_FEED,r+=i("Time:",E)+n.LINE_FEED,r+=n.DASHED_LINE+n.LINE_FEED,r+=n.LINE_FEED,e.items.forEach(e=>{const t=e.menuItem.name,o=e.quantity,a=e.menuItem.price;r+=i(t,"RM "+(o*a).toFixed(2))+n.LINE_FEED,r+=i("  "+o+" x RM "+a.toFixed(2),"")+n.LINE_FEED,e.options&&e.options.length>0&&e.options.forEach(e=>{r+="  + "+e+n.LINE_FEED})}),r+=n.LINE_FEED,r+=n.DASHED_LINE+n.LINE_FEED,r+=i("Subtotal:","RM "+e.subtotal.toFixed(2))+n.LINE_FEED,e.takeawayCharge&&e.takeawayCharge>0&&(r+=i("Takeaway Charge:","RM "+e.takeawayCharge.toFixed(2))+n.LINE_FEED),e.discount&&e.discount>0&&(r+=i("Discount:","- RM "+e.discount.toFixed(2))+n.LINE_FEED),e.discountPolicy&&e.discountPolicy.amount>0){const t="Discount ("+e.discountPolicy.name+"):";r+=i(t,"- RM "+e.discountPolicy.amount.toFixed(2))+n.LINE_FEED}if(e.coupon&&e.coupon.discount>0){const t="Coupon ("+e.coupon.code+"):";r+=i(t,"- RM "+e.coupon.discount.toFixed(2))+n.LINE_FEED}if(e.serviceCharge&&e.serviceCharge>0){const t="Service Charge ("+(e.serviceChargeRate||10)+"%):";r+=i(t,"RM "+e.serviceCharge.toFixed(2))+n.LINE_FEED}if(e.tax&&e.tax>0){const t="Tax ("+(e.taxRate||6)+"%):";r+=i(t,"RM "+e.tax.toFixed(2))+n.LINE_FEED}r+=n.DASHED_LINE+n.LINE_FEED,r+=n.BOLD_ON,r+=n.TEXT_DOUBLE_HEIGHT,r+=i("TOTAL:","RM "+e.total.toFixed(2))+n.LINE_FEED,r+=n.TEXT_NORMAL,r+=n.BOLD_OFF,r+=n.LINE_FEED,r+=n.DASHED_LINE+n.LINE_FEED;const s=e.paymentMethod?e.paymentMethod.toUpperCase():"CASH";return r+=i("Payment:",s)+n.LINE_FEED,"cash"===e.paymentMethod&&e.amountReceived>0&&(r+=i("Received:","RM "+e.amountReceived.toFixed(2))+n.LINE_FEED,r+=i("Change:","RM "+e.change.toFixed(2))+n.LINE_FEED),r+=n.LINE_FEED,r+=n.ALIGN_CENTER,r+="*** CUSTOMER COPY ***"+n.LINE_FEED,r+="Thank you for your purchase!"+n.LINE_FEED,r+="Please keep this receipt"+n.LINE_FEED,r+="for your records"+n.LINE_FEED,r+=n.LINE_FEED,r+=n.LINE_FEED,r+=n.LINE_FEED,r+=n.CUT_PARTIAL,r}async function E(e,t){try{const r=a(e,t),n=btoa(unescape(encodeURIComponent(r))),o="intent:base64,"+n+"#Intent;scheme=rawbt;"+"package=ru.a402d.rawbtprinter;end;",i=document.createElement("iframe");return i.style.display="none",i.src=o,document.body.appendChild(i),setTimeout(()=>{document.body.removeChild(i)},1e3),!0}catch(r){return console.error("\u274c RawBT print error:",r),alert("Failed to print bill.\n\nPlease ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready\n\nError: "+r.message),!1}}async function s(e,t){try{const t=function(e){let t="";t+=n.INIT,t+=n.ALIGN_LEFT,t+=n.DASHED_LINE+n.LINE_FEED,t+=i("Order:",e.orderNumber)+n.LINE_FEED;const r=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});t+=i("Time:",r)+n.LINE_FEED;const a="mobile"===e.orderSource?"MOBILE ORDER":"POS";if(t+=i("Source:",a)+n.LINE_FEED,e.tableNumber&&(t+=n.BOLD_ON,t+=i("TABLE:",e.tableNumber)+n.LINE_FEED,t+=n.BOLD_OFF),e.customerName&&"Walk-in Customer"!==e.customerName&&(t+=i("Customer:",e.customerName)+n.LINE_FEED),t+=n.DASHED_LINE+n.LINE_FEED,t+=n.LINE_FEED,t+=n.BOLD_ON,t+=n.TEXT_DOUBLE_HEIGHT,t+="ORDER ITEMS:"+n.LINE_FEED,t+=n.TEXT_NORMAL,t+=n.BOLD_OFF,t+=n.LINE_FEED,e.items.forEach((r,o)=>{var i;const a=(null===(i=r.menuItem)||void 0===i?void 0:i.name)||r.name,E=r.quantity;t+=n.BOLD_ON,t+=n.TEXT_DOUBLE,t+=E+" x "+a+n.LINE_FEED,t+=n.TEXT_NORMAL,t+=n.BOLD_OFF,r.options&&r.options.length>0&&r.options.forEach(e=>{t+="  \u2605 "+e+n.LINE_FEED}),o<e.items.length-1&&(t+=n.LINE_FEED)}),t+=n.LINE_FEED,t+=n.DASHED_LINE+n.LINE_FEED,e.notes&&e.notes.trim()&&(t+=n.LINE_FEED,t+=n.BOLD_ON,t+="** SPECIAL NOTES **"+n.LINE_FEED,t+=n.BOLD_OFF,t+=e.notes+n.LINE_FEED,t+=n.LINE_FEED,t+=n.DASHED_LINE+n.LINE_FEED),t+=n.LINE_FEED,e.pagerNumber)t+=n.ALIGN_CENTER,t+=n.TEXT_DOUBLE,t+=n.BOLD_ON,t+="PAGER  "+e.pagerNumber+n.LINE_FEED,t+=n.TEXT_NORMAL,t+=n.BOLD_OFF;else{t+=n.ALIGN_CENTER,t+=n.TEXT_DOUBLE,t+=n.BOLD_ON;const r=e.pickupNumber||(e.orderNumber?e.orderNumber.split("-")[1]:"000");t+="PICKUP  "+r+n.LINE_FEED,t+=n.TEXT_NORMAL,t+=n.BOLD_OFF}return t+=n.LINE_FEED,"pickup"===e.orderType?(t+=n.ALIGN_CENTER,t+=n.TEXT_DOUBLE,t+=n.BOLD_ON,t+="** PRE-ORDER PICKUP **"+n.LINE_FEED,t+=n.BOLD_OFF,t+=n.TEXT_NORMAL,t+=n.ALIGN_CENTER,t+=n.BOLD_ON,t+="Pickup: "+(e.scheduledPickupTime?o(e.scheduledPickupTime):"ASAP")+n.LINE_FEED,t+=n.BOLD_OFF):"takeaway"===e.orderType||e.takeawayCharge>0?(t+=n.ALIGN_CENTER,t+=n.TEXT_DOUBLE,t+=n.BOLD_ON,t+="** TAKEAWAY **"+n.LINE_FEED,t+=n.BOLD_OFF,t+=n.TEXT_NORMAL):"delivery"===e.orderType&&(t+=n.ALIGN_CENTER,t+=n.TEXT_DOUBLE,t+=n.BOLD_ON,t+="** DELIVERY **"+n.LINE_FEED,t+=n.BOLD_OFF,t+=n.TEXT_NORMAL,e.deliveryInfo&&(t+=n.LINE_FEED,t+=n.ALIGN_LEFT,t+=n.DASHED_LINE+n.LINE_FEED,t+=n.BOLD_ON,t+="DELIVERY ADDRESS:"+n.LINE_FEED,t+=n.BOLD_OFF,e.deliveryInfo.address&&(t+=e.deliveryInfo.address+n.LINE_FEED),e.deliveryInfo.phone&&(t+="Phone: "+e.deliveryInfo.phone+n.LINE_FEED),e.deliveryInfo.zoneName&&(t+="Zone: "+e.deliveryInfo.zoneName+n.LINE_FEED),e.deliveryInfo.notes&&(t+="Notes: "+e.deliveryInfo.notes+n.LINE_FEED),t+=n.DASHED_LINE+n.LINE_FEED)),t+=n.LINE_FEED,t+=n.LINE_FEED,t+=n.CUT_PARTIAL,t}(e),r=btoa(unescape(encodeURIComponent(t))),a="intent:base64,"+r+"#Intent;scheme=rawbt;"+"package=ru.a402d.rawbtprinter;end;",E=document.createElement("iframe");return E.style.display="none",E.src=a,document.body.appendChild(E),setTimeout(()=>{document.body.removeChild(E)},1e3),!0}catch(r){return console.error("\u274c Kitchen Ticket print error:",r),alert("Failed to print kitchen order ticket.\n\nPlease ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready\n\nError: "+r.message),!1}}function d(e,t){let r=[];r.push("------------------------------------------------"),r.push("Order:                          "+e.orderNumber);const n=e.date.toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!0});r.push("Time:                                "+n);const i="mobile"===e.orderSource?"MOBILE ORDER":"POS";if(r.push("Source:                              "+i),e.tableNumber&&r.push("TABLE:                               "+e.tableNumber),e.customerName&&"Walk-in Customer"!==e.customerName&&r.push("Customer:                       "+e.customerName),r.push("------------------------------------------------"),r.push(""),r.push("ORDER ITEMS:"),r.push(""),e.items.forEach((t,n)=>{var o;const i=(null===(o=t.menuItem)||void 0===o?void 0:o.name)||t.name,a=t.quantity;r.push(a+" x "+i),t.options&&t.options.length>0&&t.options.forEach(e=>{r.push("  \u2605 "+e)}),n<e.items.length-1&&r.push("")}),r.push(""),r.push("------------------------------------------------"),e.notes&&e.notes.trim()&&(r.push(""),r.push("** SPECIAL NOTES **"),r.push(e.notes),r.push(""),r.push("------------------------------------------------")),r.push(""),e.pagerNumber)r.push("              PAGER  "+e.pagerNumber);else{const t=e.pickupNumber||(e.orderNumber?e.orderNumber.split("-")[1]:"000");r.push("             PICKUP  "+t)}return r.push(""),"pickup"===e.orderType?(r.push("        ** PRE-ORDER PICKUP **"),r.push("        Pickup: "+(e.scheduledPickupTime?o(e.scheduledPickupTime):"ASAP"))):"takeaway"===e.orderType||e.takeawayCharge>0?r.push("           ** TAKEAWAY **"):"delivery"===e.orderType&&r.push("           ** DELIVERY **"),r.join("\n")}},8406:(e,t,r)=>{r.d(t,{MQ:()=>a,fU:()=>i,ng:()=>n,r6:()=>o});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",o=(e,t,r)=>{if(!e)return"";const o=new Date(e);if(isNaN(o.getTime()))return"";const i={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return o.toLocaleString("en-MY",{...i,...r})},i=(e,t)=>o(e,t,{year:void 0,month:void 0,day:void 0}),a=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const r=Date.now()-t,n=Math.floor(r/6e4),o=Math.floor(r/36e5),i=Math.floor(r/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===o?"1 hour ago":o<24?`${o} hours ago`:1===i?"1 day ago":`${i} days ago`}}}]);