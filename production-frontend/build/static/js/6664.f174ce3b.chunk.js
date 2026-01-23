"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6664],{1472:(e,t,n)=>{n.d(t,{A:()=>r});n(9950);var i=n(9610),o=n(4414);const r=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:s,message:a,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.yl,{variant:"secondary",onClick:n,children:d}),(0,o.jsx)(i.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:r,children:l})]});return(0,o.jsx)(i.aF,{isOpen:t,onClose:n,title:s,footer:p,children:(0,o.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,o.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:a})]})})}},2538:(e,t,n)=>{n.d(t,{A:()=>c});var i=n(9950),o=n(9610),r=n(4752),s=n(4414);const a=r.Ay.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.15s;
  text-align: center;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,l=r.Ay.div`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,d=r.Ay.div`
  color: #6B7C93;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,c=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:c,label:p,placeholder:u="",min:x=0,max:h,step:m=1,suffix:g="",confirmText:b="Apply",cancelText:v="Cancel"}=e;const[y,f]=(0,i.useState)(""),[j,F]=(0,i.useState)(""),C=()=>{const e=parseFloat(y);!isNaN(e)&&e>=x&&(void 0===h||e<=h)&&(r(y),f(""),F(""),n())},w=()=>{f(""),F(""),n()},k=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.yl,{variant:"secondary",onClick:w,children:v}),(0,s.jsx)(o.yl,{variant:"primary",onClick:C,disabled:!y||!!j||parseFloat(y)<x,children:b})]});return(0,s.jsx)(o.aF,{isOpen:t,onClose:w,title:c,footer:k,children:(0,s.jsxs)("div",{children:[(0,s.jsx)(o.lR,{children:p}),(0,s.jsx)(a,{type:"text",value:y,onChange:e=>{const t=e.target.value;if(""===t)return f(""),void F("");if(!/^\d*\.?\d*$/.test(t))return;const n=parseFloat(t);isNaN(n)||F(n<x?`Minimum value is ${x}${g}`:void 0!==h&&n>h?`Maximum value is ${h}${g}`:""),f(t)},placeholder:u,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!j&&y&&C()}}),j&&(0,s.jsx)(l,{children:j}),!j&&void 0!==h&&(0,s.jsxs)(d,{children:["Enter a value between ",x,g," and ",h,g]})]})})}},6664:(e,t,n)=>{n.r(t),n.d(t,{default:()=>bt});var i=n(9950),o=n(4752),r=n(4492),s=n(2966),a=n(9189),l=n(9610),d=n(2159),c=n(9018),p=n(5863),u=n(8406),x=n(6038),h=n(4414);const m=o.DU`
  @media print {
    /* Reset body for print */
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }

    /* Hide all elements by default */
    body > * {
      display: none !important;
    }

    /* Show only the print content */
    #order-complete-bill-print {
      display: block !important;
      position: static !important;
      left: 0 !important;
      top: 0 !important;
      visibility: visible !important;
    }

    #order-complete-bill-print * {
      visibility: visible !important;
    }

    /* Ensure proper page settings */
    @page {
      size: 80mm auto;
      margin: 0;
    }
  }
`,g=o.Ay.div`
  font-size: 20px;
  color: #635BFF;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`,b=o.Ay.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,v=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,y=o.Ay.span`
  color: #6B7280;
`,f=o.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,j=o.Ay.div`
  margin-bottom: 20px;
`,F=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`,C=o.Ay.div`
  flex: 1;
`,w=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,k=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,A=o.Ay.span`
  font-size: 14px;
  color: #6B7280;
  margin-right: 16px;
`,B=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,S=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
`,E=o.Ay.div`
  position: fixed;
  top: -9999px;
  left: -9999px;
  width: 80mm;
  background: white;
  padding: 10mm;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  color: #000;
  z-index: -1;

  @media print {
    position: static !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 9999 !important;
  }

  * {
    color: #000 !important;
    background: white !important;
  }
`,I=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,N=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,z=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,_=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,P=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,T=o.Ay.button`
  background: none;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  color: #6B7C93;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s;
  font-weight: 500;

  &:hover {
    background: #F8FAFC;
    color: #0A2540;
    border-color: #CBD5E1;
  }

  &:active {
    transform: scale(0.98);
  }
`,O=e=>{var t,n,o,r;let{isOpen:s,onClose:a,orderData:O,onPrintBill:$}=e;const{getStoreInfo:D,operationSettings:R}=(0,c.Pj)(),q=D(),L=e=>(0,u.r6)(e,R),M=async()=>{await(0,p.pG)(O,q)&&setTimeout(()=>{$()},100)},U=async()=>{await(0,p.Si)(O,q)},W=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:M,children:"Print Bill"}),(0,h.jsx)(l.yl,{variant:"secondary",onClick:U,children:"Print Order Ticket"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:a,children:"Close"})]}),Y=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(T,{onClick:M,title:"Print Bill",children:[(0,h.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,h.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,h.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,h.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),(0,h.jsx)("span",{children:"Bill"})]}),(0,h.jsxs)(T,{onClick:U,title:"Print Order Ticket",children:[(0,h.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,h.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),(0,h.jsx)("span",{children:"Ticket"})]})]});return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(m,{}),(0,h.jsxs)(l.aF,{isOpen:s,onClose:a,title:"Order Complete!",footer:W,headerActions:Y,children:[(0,h.jsxs)("div",{style:{textAlign:"center"},children:[(0,h.jsxs)(g,{children:["Order ",O.orderNumber]}),O.pagerNumber?(0,h.jsxs)("div",{style:{background:"#10B981",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pager Number"}),(0,h.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:O.pagerNumber})]}):(0,h.jsxs)("div",{style:{background:"#635BFF",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pickup Number"}),(0,h.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:O.pickupNumber||(null!==(t=O.orderNumber)&&void 0!==t&&t.includes("-")?O.orderNumber.split("-")[1]:O.orderNumber)||"-"})]})]}),(0,h.jsxs)(b,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Date & Time"}),(0,h.jsx)(f,{children:L(O.date)})]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Payment Method"}),(0,h.jsx)(f,{children:O.paymentMethod})]}),"cash"===O.paymentMethod&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Amount Received"}),(0,h.jsx)(f,{children:(0,x.vv)(O.amountReceived,R.currency)})]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Change"}),(0,h.jsx)(f,{children:(0,x.vv)(O.change,R.currency)})]})]})]}),(0,h.jsxs)(d.wn,{children:[(0,h.jsx)(S,{children:"Order Items"}),(0,h.jsx)(j,{children:O.items.map((e,t)=>(0,h.jsxs)(F,{children:[(0,h.jsxs)(C,{children:[(0,h.jsx)(w,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,h.jsx)(k,{children:e.options.join(", ")})]}),(0,h.jsxs)(A,{children:[e.quantity,"x"]}),(0,h.jsx)(B,{children:(0,x.vv)(e.menuItem.price*e.quantity,R.currency)})]},t))})]}),(0,h.jsxs)(d.wn,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Subtotal"}),(0,h.jsx)(f,{children:(0,x.vv)(O.subtotal,R.currency)})]}),Number(O.takeawayCharge)>0&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Takeaway Charge"}),(0,h.jsx)(f,{children:(0,x.vv)(Number(O.takeawayCharge),R.currency)})]}),Number(O.discount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Discount"}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number(O.discount),R.currency)})]}),O.discountPolicy&&Number(O.discountPolicy.amount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Discount (",O.discountPolicy.name,")"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number(O.discountPolicy.amount),R.currency)})]}),O.coupon&&Number(O.coupon.discount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Coupon (",O.coupon.code,")"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number(O.coupon.discount),R.currency)})]}),Number(O.pointDiscount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Points (",null===(n=O.pointsUsed)||void 0===n?void 0:n.toLocaleString()," pts)"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number(O.pointDiscount),R.currency)})]}),Number(O.serviceCharge)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Service Charge (",O.serviceChargeRate||10,"%)"]}),(0,h.jsx)(f,{children:(0,x.vv)(Number(O.serviceCharge),R.currency)})]}),Number(O.tax)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Tax (",O.taxRate||6,"%)"]}),(0,h.jsx)(f,{children:(0,x.vv)(Number(O.tax),R.currency)})]})]}),(0,h.jsxs)(d.i_,{style:{marginTop:0},children:[(0,h.jsx)(d.nJ,{children:"Total"}),(0,h.jsx)(d.aX,{children:(0,x.vv)(O.total,R.currency)})]})]}),(0,h.jsxs)(E,{id:"order-complete-bill-print",children:[(0,h.jsxs)(I,{children:[(0,h.jsx)(N,{children:q.name}),(0,h.jsxs)("div",{style:{fontSize:"11px",marginTop:"5px"},children:[q.address,(0,h.jsx)("br",{}),"Tel: ",q.phone,(0,h.jsx)("br",{}),"GST Reg No: ",q.gstRegNo]})]}),(0,h.jsxs)(z,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Order No:"}),(0,h.jsx)("span",{children:O.orderNumber})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Date:"}),(0,h.jsx)("span",{children:L(O.date)})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Cashier:"}),(0,h.jsx)("span",{children:"POS Terminal"})]}),(0,h.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",O.pickupNumber||(null!==(o=O.orderNumber)&&void 0!==o&&o.includes("-")?O.orderNumber.split("-")[1]:O.orderNumber)||"-"]}),O.pagerNumber&&(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"bold",textAlign:"center",margin:"5px 0"},children:["PAGER #",O.pagerNumber]})]}),(0,h.jsx)(z,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,h.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,h.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,h.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,h.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,h.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,h.jsx)("tbody",{children:O.items.map((e,t)=>(0,h.jsx)(i.Fragment,{children:(0,h.jsxs)("tr",{children:[(0,h.jsxs)("td",{style:{padding:"5px 0"},children:[e.menuItem.name,e.options&&e.options.length>0&&(0,h.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:e.options.join(", ")})]}),(0,h.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,h.jsx)("td",{style:{textAlign:"right"},children:e.menuItem.price.toFixed(2)}),(0,h.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*e.menuItem.price).toFixed(2)})]})},t))})]})}),(0,h.jsxs)(z,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Subtotal:"}),(0,h.jsx)("span",{children:(0,x.vv)(O.subtotal,R.currency)})]}),Number(O.takeawayCharge)>0&&(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Takeaway Charge:"}),(0,h.jsx)("span",{children:(0,x.vv)(Number(O.takeawayCharge),R.currency)})]}),Number(O.discount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Discount:"}),(0,h.jsx)("span",{children:(0,x.vv)(-Number(O.discount),R.currency)})]}),O.discountPolicy&&Number(O.discountPolicy.amount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Discount (",O.discountPolicy.name,"):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number(O.discountPolicy.amount),R.currency)})]}),O.coupon&&Number(O.coupon.discount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Coupon (",O.coupon.code,"):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number(O.coupon.discount),R.currency)})]}),Number(O.pointDiscount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Points (",null===(r=O.pointsUsed)||void 0===r?void 0:r.toLocaleString()," pts):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number(O.pointDiscount),R.currency)})]}),Number(O.serviceCharge)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Service Charge (",O.serviceChargeRate||10,"%):"]}),(0,h.jsx)("span",{children:(0,x.vv)(Number(O.serviceCharge),R.currency)})]}),Number(O.tax)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Tax (",O.taxRate||6,"%):"]}),(0,h.jsx)("span",{children:(0,x.vv)(Number(O.tax),R.currency)})]}),(0,h.jsxs)(_,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,h.jsx)("span",{children:"TOTAL:"}),(0,h.jsx)("span",{children:(0,x.vv)(O.total,R.currency)})]})]}),(0,h.jsxs)(z,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Payment Method:"}),(0,h.jsx)("span",{children:O.paymentMethod.toUpperCase()})]}),"cash"===O.paymentMethod&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Amount Received:"}),(0,h.jsx)("span",{children:(0,x.vv)(O.amountReceived,R.currency)})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Change:"}),(0,h.jsx)("span",{children:(0,x.vv)(O.change,R.currency)})]})]})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,h.jsx)("div",{children:"Thank you for your purchase!"}),(0,h.jsx)("div",{children:"Please keep this receipt for your records"})]})]})]})};var $=n(1472);const D=e=>{let{isOpen:t,onClose:n,title:i,message:o,buttonText:r="OK"}=e;const s=(0,h.jsx)(l.yl,{onClick:n,style:{maxWidth:"200px",margin:"0 auto"},children:r});return(0,h.jsx)(l.aF,{isOpen:t,onClose:n,title:i,footer:s,children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,h.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.5"},children:o})})})};var R=n(2538),q=n(447),L=n(8930),M=n(9037),U=n(5781),W=n(1367),Y=n(2420);const G=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
`,H=o.Ay.div`
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
`,K=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`,V=o.Ay.img`
  max-width: 180px;
  max-height: 40px;
  object-fit: contain;
`,J=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: #0A2540;
`,Q=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: ${e=>e.clickable?"pointer":"default"};
  padding: ${e=>e.clickable?"8px 12px":"0"};
  border-radius: ${e=>e.clickable?"8px":"0"};
  transition: all 0.2s;
  color: #6B7C93;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"transparent"};
    color: ${e=>e.clickable?"#0A2540":"#6B7C93"};
  }
`,X=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`,Z=o.Ay.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`,ee=o.Ay.div`
  flex: 1;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,te=o.Ay.div`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,ne=o.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,ie=o.Ay.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #8898AA;
  }
`,oe=o.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,re=o.Ay.button`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: #F6F9FC;
  border-radius: 50%;
  color: #6B7C93;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;
  
  &:hover {
    background: #E6EBF1;
    color: #0A2540;
  }
`,se=o.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6B7C93;
  text-align: center;
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .message {
    font-size: 14px;
    opacity: 0.8;
  }
`,ae=o.Ay.div`
  display: flex;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  padding: 0 24px;
  gap: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }

  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 3px;
  }
`,le=o.Ay.button`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  position: relative;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};

  &:hover {
    color: #635BFF;
  }

  ${e=>e.active&&"\n    &::after {\n      content: '';\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 2px;\n      background: #635BFF;\n    }\n  "}
`,de=o.Ay.div`
  flex: 1;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  overflow-y: auto;
  align-content: start;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 3px;
  }
`,ce=o.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  position: relative;
  
  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${e=>e.soldOut&&"\n    opacity: 0.5;\n    cursor: not-allowed;\n    \n    &::after {\n      content: 'SOLD OUT';\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      background: #FF6B6B;\n      color: white;\n      padding: 4px 8px;\n      border-radius: 4px;\n      font-size: 11px;\n      font-weight: 600;\n    }\n  "}
`,pe=o.Ay.div`
  width: 100%;
  height: 80px;
  background: #F6F9FC;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.hasImage?"0":"36px"};
  color: #C7D2FE;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,ue=o.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`,xe=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,he=o.Ay.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
  z-index: 1;
`,me=o.Ay.div`
  font-size: 10px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
  font-weight: 500;
`,ge=o.Ay.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`,be=o.Ay.button`
  flex: 1;
  background: linear-gradient(135deg, #F8FAFC 0%, #F0F4FF 100%);
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  
  &:hover {
    background: linear-gradient(135deg, #F0F4FF 0%, #E6F0FF 100%);
    border-color: #635BFF;
    color: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,ve=o.Ay.div`
  width: 400px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
`,ye=o.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,fe=o.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`,je=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 160px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Fe=o.Ay.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }

  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 2px;
  }
`,Ce=o.Ay.div`
  padding: 16px 24px;
`,we=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,ke=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`,Ae=o.Ay.div`
  flex: 1;
`,Be=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Se=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,Ee=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Ie=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ne=o.Ay.button`
  width: 24px;
  height: 24px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6B7C93;
  transition: all 0.15s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }
  
  &:active {
    background: #F0F4FF;
  }
`,ze=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,_e=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,Pe=o.Ay.button`
  width: 24px;
  height: 24px;
  border: none;
  background: #FFF4F4;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #FF6B6B;
  transition: all 0.15s;
  
  &:hover {
    background: #FFE6E6;
  }
`,Te=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,Oe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,$e=o.Ay.span`
  color: #6B7C93;
`,De=o.Ay.span`
  font-weight: 500;
  color: #0A2540;
`,Re=(0,o.Ay)(Oe)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  
  ${$e} {
    color: #0A2540;
  }
  
  ${De} {
    color: #635BFF;
  }
`,qe=o.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,Le=o.Ay.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          \n          &:hover {\n            background: #5243E0;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          \n          &:active {\n            transform: translateY(0);\n          }\n        ";case"danger":return"\n          background: #FFE6E6;\n          color: #FF6B6B;\n          \n          &:hover {\n            background: #FFD9D9;\n          }\n        ";default:return"\n          background: white;\n          color: #6B7C93;\n          border: 1px solid #E6EBF1;\n          \n          &:hover {\n            border-color: #C7D2FE;\n            color: #635BFF;\n          }\n        "}}}
`,Me=o.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  padding: 40px;
  text-align: center;
`,Ue=o.Ay.div`
  font-size: 14px;
`,We=o.Ay.div`
  padding: 16px 24px;
  background: #FAFBFC;
  border-top: 1px solid #E6EBF1;
`,Ye=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Ge=o.Ay.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
  
  &::placeholder {
    color: #8898AA;
  }
`,He=o.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  
  &:hover {
    background: #5243E0;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Ke=o.Ay.div`
  display: flex;
  gap: 8px;
`,Ve=o.Ay.button`
  padding: 8px 12px;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${e=>e.active?"#635BFF":"#374151"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${e=>e.active?"#635BFF":"#D1D5DB"};
    background: ${e=>e.active?"rgba(99, 91, 255, 0.1)":"#F9FAFB"};
  }
`,Je=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 6px;
  font-size: 13px;
  color: #635BFF;
`,Qe=o.Ay.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,Xe=o.Ay.button`
  flex: 1;
  padding: 12px 16px;
  min-height: 44px;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${e=>e.active?"#635BFF":"#374151"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;

  &:hover {
    border-color: ${e=>e.active?"#635BFF":"#D1D5DB"};
    background: ${e=>e.active?"rgba(99, 91, 255, 0.1)":"#F9FAFB"};
  }

  span {
    font-size: 18px;
  }
`,Ze=o.Ay.button`
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;

  &:hover {
    color: #FF5252;
  }
`,et=o.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,tt=o.Ay.div`
  position: relative;
`,nt=o.Ay.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }

  &::placeholder {
    color: #8898AA;
  }
`,it=o.Ay.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8898AA;
  font-size: 14px;
  pointer-events: none;
`,ot=o.Ay.div`
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
  margin-top: 4px;
`,rt=o.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,st=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 14px;
`,at=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,lt=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  margin-top: 8px;
`,dt=o.Ay.div`
  flex: 1;
`,ct=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 2px;
`,pt=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,ut=o.Ay.div`
  position: relative;
  width: 140px;
`,xt=o.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }

  &::placeholder {
    color: #8898AA;
  }
`,ht=o.Ay.div`
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
  margin-top: 4px;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #F1F3F5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #A0AEC0;
  }
`,mt=o.Ay.div`
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;
  font-size: 14px;
  color: #0A2540;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,gt=o.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.15s;

  &:hover {
    background: #E6F0FF;
  }
`,bt=(o.Ay.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  display: flex;
  gap: 12px;
`,o.Ay.button`
  padding: 12px 20px;
  background: #F6F9FC;
  color: #6B7C93;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #F6F9FC;
    border-color: #635BFF;
    color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.15);
  }
`,()=>{const e=(0,r.Zp)(),{user:t}=(0,W.As)(),n=(()=>{const{restaurantId:e}=(0,r.g)(),{user:t}=(0,W.As)();return e?parseInt(e,10):null!==t&&void 0!==t&&t.restaurantId?"number"===typeof t.restaurantId?t.restaurantId:parseInt(t.restaurantId,10):(console.warn("useRestaurantId: No restaurantId found in URL or user context, using default 1"),1)})(),{addOrder:o}=(0,q.h)(),{getTakeawayCharge:l,operationSettings:d}=(0,c.Pj)(),{categories:p,menuItems:u,getItemsByCategory:m,loadMenuByCategory:g,isLoadingMenu:b}=(0,L.b)(),{updateCustomerOrderStats:v,searchCustomers:y}=(0,M.c)(),{currentStaff:f,isLoggedIn:j,logout:F,updateStaff:C}=(0,U.g)(),[w,k]=(0,i.useState)(null),[A,B]=(0,i.useState)(null),[S,E]=(0,i.useState)(""),[I,N]=(0,i.useState)(!1),[z,_]=(0,i.useState)([]),[P,T]=(0,i.useState)(new Date),[bt,vt]=(0,i.useState)(!1),[yt,ft]=(0,i.useState)(!1),[jt,Ft]=(0,i.useState)(!1),[Ct,wt]=(0,i.useState)(null),[kt,At]=(0,i.useState)(null),[Bt,St]=(0,i.useState)(0),[Et,It]=(0,i.useState)(!1),[Nt,zt]=(0,i.useState)(""),[_t,Pt]=(0,i.useState)(null),[Tt,Ot]=(0,i.useState)(null),[$t,Dt]=(0,i.useState)(!1),[Rt,qt]=(0,i.useState)(!1),[Lt,Mt]=(0,i.useState)(!1),[Ut,Wt]=(0,i.useState)("dine-in"),[Yt,Gt]=(0,i.useState)(""),[Ht,Kt]=(0,i.useState)([]),[Vt,Jt]=(0,i.useState)(""),[Qt,Xt]=(0,i.useState)(""),[Zt,en]=(0,i.useState)(!1),[tn,nn]=(0,i.useState)(!1),[on,rn]=(0,i.useState)(!1),[sn,an]=(0,i.useState)(!1),[ln,dn]=(0,i.useState)(""),[cn,pn]=(0,i.useState)(null),[un,xn]=(0,i.useState)(""),[hn,mn]=(0,i.useState)(!1),[gn,bn]=(0,i.useState)(null),[vn,yn]=(0,i.useState)([]),[fn,jn]=(0,i.useState)(!1),Fn=(0,i.useRef)(null),[Cn,wn]=(0,i.useState)("RM"),[kn,An]=(0,i.useState)(null),[Bn,Sn]=(0,i.useState)("cash_only"),[En,In]=(0,i.useState)(null),[Nn,zn]=(0,i.useState)(0),[_n,Pn]=(0,i.useState)("Bronze"),[Tn,On]=(0,i.useState)(40),$n=(0,i.useRef)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();t.brand_logo?dn(t.brand_logo):t.brandLogo?dn(t.brandLogo):t.logo&&dn(t.logo)}}catch(e){console.error("Failed to load brand logo:",e)}};e();const t=()=>{e()};return window.addEventListener("brandLogoUpdated",t),()=>{window.removeEventListener("brandLogoUpdated",t)}},[]),(0,i.useEffect)(()=>{if(p.length>0&&null===w){const e=p[0].id;k(e),g(e)}},[p,w,g]);(0,i.useEffect)(()=>{var e;p.length>0&&w&&!I&&!p.find(e=>e.id===w)&&k((null===(e=p[0])||void 0===e?void 0:e.id)||null)},[p,w,I]),(0,i.useEffect)(()=>{const e=setInterval(()=>{T(new Date)},1e3);return()=>clearInterval(e)},[]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/restaurants/${t.restaurantId}`,{credentials:"include"});if(e.ok){const t=await e.json(),n=t.data||t;if(n.table_settings){const{enableTableNumbers:e,totalTables:t,tablePrefix:i}=n.table_settings;if(e){const e=[];for(let n=1;n<=t;n++)e.push(`${i}${String(n).padStart(3,"0")}`);Kt(e)}}}}catch(e){console.error("Failed to load table settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/restaurants/${t.restaurantId}`);if(e.ok){const t=await e.json(),n=t.data||t;n.payment_settings&&pn(n.payment_settings),wn(n.currency||"RM"),An(n.cash_rounding?parseFloat(n.cash_rounding):null),Sn(n.rounding_apply_to||"cash_only")}}catch(e){console.error("Failed to load payment settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/membership/settings/${t.restaurantId}`);if(e.ok){const t=await e.json();t.success&&t.data&&(In(t.data),console.log("\u2705 Membership settings loaded for POS:",t.data))}}catch(e){console.error("Failed to load membership settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId&&null!==gn&&void 0!==gn&&gn.id)try{const e=await fetch(`/api/membership/customer/${t.restaurantId}/${gn.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&(zn(t.data.points||0),Pn(t.data.loyalty_tier||"Bronze"),console.log("\u2705 Customer points loaded:",t.data.points,"Tier:",t.data.loyalty_tier))}}catch(e){console.error("Failed to load customer points:",e)}else zn(0),Pn("Bronze")})()},[null===t||void 0===t?void 0:t.restaurantId,null===gn||void 0===gn?void 0:gn.id]);const Dn=(()=>{let e=[];if(I){const t=S.toLowerCase().trim();e=u.filter(e=>e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t))}else w&&(e=m(w));return e})(),Rn=Dn.length>50;(0,i.useEffect)(()=>{On(40)},[w,S]),(0,i.useEffect)(()=>{if(!Rn)return;const e=$n.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&On(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[Rn,Tn,Dn.length]);const qn=(e,t)=>{_(z.map(n=>{if(n.id===e){const e=n.quantity+t;return e>0?{...n,quantity:e}:n}return n}).filter(e=>e.quantity>0))},Ln=()=>{const e=d.pagerSystem.totalPagers,t=Qt.trim();return t?Array.from({length:e},(e,t)=>t+1).filter(e=>e.toString().startsWith(t)):Array.from({length:e},(e,t)=>t+1)},Mn=()=>{_([]),St(0),Pt(null),Ot(null),zt(""),bn(null),xn(""),Wt("dine-in"),Gt(""),Jt(""),Xt(""),E(""),k("all"),Dt(!1),vt(!1),ft(!1),Ft(!1),wt(null),At(null)},Un=e=>{Bt===e?(St(0),Ot(null)):St(e)},Wn=async()=>{if(Nt)try{const e=await fetch("/api/coupons/validate",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({code:Nt.toUpperCase(),restaurant_id:null===t||void 0===t?void 0:t.restaurantId,order_amount:Gn,order_type:Ut})});if(!e.ok)return void Mt(!0);const n=await e.json();n.valid&&n.data?(Pt({code:Nt.toUpperCase(),discount:n.data.discountAmount}),zt("")):Mt(!0)}catch(e){console.error("Coupon validation error:",e),Mt(!0)}},Yn=e=>{if(Tt&&Tt.name===e)return Ot(null),void St(0);const t={Staff:{discount:"20%",requiresApproval:!1,status:"active"},VIP:{discount:"15%",requiresApproval:!0,status:"active"}}[e];if(t&&"active"===t.status){const n=parseFloat(t.discount.replace("%","")),i=Gn*(n/100);if(t.requiresApproval){if("MANAGER123"!==prompt(`${e} requires manager approval. Enter manager code:`))return void alert("Invalid manager code. Discount not applied.");Ot({name:e,discount:i,requiresApproval:!0}),St(0)}else Ot({name:e,discount:i,requiresApproval:!1}),St(0)}},{subtotal:Gn,tax:Hn,total:Kn,discountAmount:Vn,couponDiscount:Jn,policyDiscount:Qn,takeawayCharge:Xn,serviceCharge:Zn}=(()=>{const e=z.reduce((e,t)=>{let n=t.menuItem.price*t.quantity;if(t.selectedOptions&&t.selectedOptions.length>0){n+=t.selectedOptions.reduce((e,t)=>e+t.price,0)*t.quantity}return e+n},0);let t=0;if("takeaway"===Ut&&d.takeawayPricing.enabled)if("per-item"===d.takeawayPricing.pricingType){const e=z.reduce((e,t)=>e+t.quantity,0);t=e*d.takeawayPricing.perItemCharge}else z.forEach(e=>{const n=l(e.menuItem.category);t+=n*e.quantity});const n=e+t,i=Bt,o=_t?_t.discount:0,r=Tt?Tt.discount:0,s=Math.max(0,n-i-o-r),a=d.serviceChargeEnabled?s*(d.serviceChargeRate/100):0,c=d.taxEnabled?s*(d.taxRate/100):0,p=s+a+c;let u=p;return"all"===Bn&&kn&&(u=Math.round(p/kn)*kn),{subtotal:e,tax:c,total:u,discountAmount:i,couponDiscount:o,policyDiscount:r,takeawayCharge:t,serviceCharge:a}})(),ei=(()=>{if(!un.trim())return[];if(vn.length>0)return vn;return y(un).slice(0,10)})();return(0,h.jsxs)(G,{children:[(0,h.jsxs)(H,{children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[(0,h.jsx)(K,{onClick:Mn,children:ln?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(V,{src:ln,alt:"Brand Logo"}),(0,h.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})]}):(0,h.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})}),(0,h.jsx)("button",{onClick:()=>e("/pos/dashboard"),style:{background:"none",border:"1px solid #E6EBF1",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",color:"#6B7C93",fontSize:"13px",display:"flex",alignItems:"center",gap:"4px"},children:"\u2190 Back"})]}),(0,h.jsxs)(J,{children:[(0,h.jsxs)(Q,{clickable:!1,children:[(0,h.jsx)("span",{style:{fontSize:"16px"},children:"\u25c6"}),(0,h.jsx)("span",{children:j&&f?`Staff: ${f.name} (${f.role})`:(null===t||void 0===t?void 0:t.name)||"Staff"})]}),(0,h.jsx)(X,{children:(ti=P,ti.toLocaleString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",month:"short",day:"numeric",year:"numeric"}))})]})]}),(0,h.jsxs)(Z,{children:[(0,h.jsxs)(ee,{children:[(0,h.jsx)(te,{children:(0,h.jsxs)(ne,{children:[(0,h.jsx)(oe,{children:"\ud83d\udd0d"}),(0,h.jsx)(ie,{type:"text",placeholder:"Search menu items...",value:S,onChange:e=>(e=>{if(E(e),e.trim())I||(B(w),N(!0),k(null),g("all"));else if(I){var t;N(!1);const e=A||(null===(t=p[0])||void 0===t?void 0:t.id)||null;k(e),B(null)}})(e.target.value)}),S&&(0,h.jsx)(re,{onClick:()=>{if(E(""),I){var e;N(!1);const t=A||(null===(e=p[0])||void 0===e?void 0:e.id)||null;k(t),B(null)}},title:"Clear search",children:"\xd7"})]})}),(0,h.jsx)(ae,{children:p.map(e=>(0,h.jsxs)(le,{active:w===e.id&&!I,onClick:()=>{return t=e.id,I&&(N(!1),E("")),k(t),void g(t);var t},children:[e.emoji," ",e.name]},e.id))}),I&&(0,h.jsxs)("div",{style:{padding:"8px 16px",background:"#f0f7ff",borderRadius:"8px",marginBottom:"12px",fontSize:"14px",color:"#1a73e8",display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)("span",{children:"\ud83d\udd0d"}),(0,h.jsxs)("span",{children:['Search results for "',S,'" (',Dn.length," items)"]})]}),(0,h.jsx)(de,{children:Dn.length>0?(0,h.jsxs)(h.Fragment,{children:[(Rn?Dn.slice(0,Tn):Dn).map(e=>{const t=e.optionGroups&&e.optionGroups.length>0;return(0,h.jsxs)(ce,{soldOut:e.soldOut,onClick:()=>(e=>{if(e.soldOut)return;let t=[];e.is_set_menu&&e.set_items&&e.set_items.length>0&&(t=e.set_items.map(e=>{const t=u.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}));const n=z.find(t=>t.menuItem.id===e.id&&(!t.options||0===t.options.length)&&!e.is_set_menu);n&&!e.is_set_menu?_(z.map(e=>e.id===n.id?{...e,quantity:e.quantity+1}:e)):_([...z,{id:`order-${Date.now()}`,menuItem:e,quantity:1,options:t.length>0?t:void 0}])})(e),children:[e.is_set_menu&&(0,h.jsx)(he,{children:"SET"}),(0,h.jsx)(pe,{hasImage:!!e.image,children:e.image?(0,h.jsx)("img",{src:e.image,alt:e.name,loading:"lazy"}):e.emoji}),(0,h.jsxs)(ue,{children:[e.code?`${e.code} `:"",e.name]}),(0,h.jsxs)(xe,{children:[Cn," ",e.price.toFixed(2)]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,h.jsx)(me,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")}),t&&(0,h.jsx)(ge,{children:(0,h.jsx)(be,{onClick:t=>((e,t)=>{t.stopPropagation(),e.soldOut||(At(e),ft(!0))})(e,t),disabled:e.soldOut,children:"Options"})})]},e.id)}),Rn&&Tn<Dn.length&&(0,h.jsx)("div",{ref:$n,style:{gridColumn:"1 / -1",height:"20px"}})]}):b?(0,h.jsxs)(se,{children:[(0,h.jsx)("div",{className:"icon",children:"\u23f3"}),(0,h.jsx)("div",{className:"title",children:"Loading..."})]}):(0,h.jsxs)(se,{children:[(0,h.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,h.jsx)("div",{className:"title",children:I?`No results for "${S}"`:"No items in this category"}),(0,h.jsx)("div",{className:"message",children:I?"Try searching with different keywords":"Select a different category to view items"})]})})]}),(0,h.jsxs)(ve,{children:[(0,h.jsxs)(Qe,{children:[(0,h.jsx)(Xe,{active:"dine-in"===Ut,onClick:()=>Wt("dine-in"),children:"Dine In"}),(0,h.jsx)(Xe,{active:"takeaway"===Ut,onClick:()=>Wt("takeaway"),children:"Takeaway"})]}),(0,h.jsx)(et,{children:gn?(0,h.jsxs)(lt,{children:[(0,h.jsxs)(dt,{children:[(0,h.jsx)(ct,{children:gn.name}),(0,h.jsxs)(pt,{children:[gn.phone&&`${gn.phone} \u2022 `,gn.id]})]}),(0,h.jsx)(gt,{onClick:()=>{bn(null),xn(""),yn([])},children:"Clear"})]}):(0,h.jsxs)(tt,{children:[(0,h.jsx)(it,{children:"\ud83d\udd0d"}),(0,h.jsx)(nt,{type:"text",placeholder:"Walk-in Customer",value:un,onChange:e=>{const n=e.target.value;xn(n),mn(n.trim().length>0),Fn.current&&clearTimeout(Fn.current),n.trim().length>=2?Fn.current=setTimeout(()=>{(async e=>{if(e.trim()&&null!==t&&void 0!==t&&t.restaurantId){jn(!0);try{const n=await fetch(`/api/customers/${t.restaurantId}?search=${encodeURIComponent(e)}`);if(n.ok){const e=await n.json();if(e.success&&e.data){const t=e.data.map(e=>{var t,n,i,o,r;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id,name:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Unknown",phone:(null===(i=e.customer)||void 0===i?void 0:i.phone)||"",email:(null===(o=e.customer)||void 0===o?void 0:o.email)||"",type:(null===(r=e.customer)||void 0===r?void 0:r.type)||"member",points:e.points||0,loyaltyTier:e.loyalty_tier||"Bronze",totalOrders:e.total_orders||0,totalSpent:e.total_spent||0}});yn(t.slice(0,10))}}}catch(n){console.error("Customer search error:",n)}finally{jn(!1)}}else yn([])})(n)},300):yn([])},onFocus:()=>{un.trim()&&mn(!0)},onBlur:()=>setTimeout(()=>mn(!1),200)}),(0,h.jsx)(ot,{show:hn&&ei.length>0,children:ei.map(e=>(0,h.jsxs)(rt,{onClick:()=>(e=>{bn(e),xn(""),mn(!1),yn([])})(e),children:[(0,h.jsx)(st,{children:e.name}),(0,h.jsxs)(at,{children:[e.phone&&`${e.phone} \u2022 `,e.id]})]},e.id))}),(0,h.jsx)(ot,{show:hn&&un.trim().length>0&&0===ei.length&&!fn,children:(0,h.jsx)(rt,{style:{cursor:"default",color:"#6B7C93"},children:"No customers found"})}),(0,h.jsx)(ot,{show:hn&&fn,children:(0,h.jsx)(rt,{style:{cursor:"default",color:"#6B7C93"},children:"Searching..."})})]})}),"dine-in"===Ut&&Ht.length>0&&(0,h.jsxs)(ye,{children:[(0,h.jsx)(fe,{children:"Table Number:"}),(0,h.jsxs)(je,{value:Yt,onChange:e=>Gt(e.target.value),children:[(0,h.jsx)("option",{value:"",children:"Free Seating"}),Ht.map(e=>(0,h.jsx)("option",{value:e,children:e},e))]})]}),0===z.length?(0,h.jsxs)(Me,{children:[(0,h.jsx)(Ue,{children:"No items in order"}),(0,h.jsx)(Ue,{style:{marginTop:"8px",fontSize:"12px"},children:"Select menu items to start"})]}):(0,h.jsxs)(Fe,{children:[(0,h.jsxs)(Ce,{children:[(0,h.jsxs)(we,{children:[z.length," ",1===z.length?"item":"items"]}),z.map(e=>(0,h.jsxs)(ke,{children:[(0,h.jsxs)(Ae,{children:[(0,h.jsxs)(Be,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),e.options&&e.options.length>0&&(()=>{const t=[],n=[];return e.options.forEach(e=>{/^.+\sx\d+$/.test(e)?t.push(e):n.push(e)}),(0,h.jsxs)(h.Fragment,{children:[t.length>0&&(0,h.jsx)(Se,{style:{fontWeight:600},children:t.join(", ")}),n.length>0&&(0,h.jsxs)(Se,{children:["\u2b50 ",n.join(", ")]})]})})()]}),(0,h.jsxs)(Ee,{children:[(0,h.jsxs)(Ie,{children:[(0,h.jsx)(Ne,{onClick:()=>qn(e.id,-1),children:"-"}),(0,h.jsx)(ze,{children:e.quantity}),(0,h.jsx)(Ne,{onClick:()=>qn(e.id,1),children:"+"})]}),(0,h.jsxs)(_e,{children:[Cn," ",(()=>{let t=e.menuItem.price*e.quantity;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)*e.quantity}return t.toFixed(2)})()]}),(0,h.jsx)(Pe,{onClick:()=>{return t=e.id,void _(z.filter(e=>e.id!==t));var t},children:"\xd7"})]})]},e.id))]}),(0,h.jsxs)(Te,{children:[(0,h.jsxs)(Oe,{children:[(0,h.jsx)($e,{children:"Subtotal"}),(0,h.jsxs)(De,{children:[Cn," ",Gn.toFixed(2)]})]}),Xn>0&&(0,h.jsxs)(Oe,{children:[(0,h.jsx)($e,{children:"Takeaway Charge"}),(0,h.jsxs)(De,{children:[Cn," ",Xn.toFixed(2)]})]}),Vn>0&&(0,h.jsxs)(Oe,{children:[(0,h.jsx)($e,{children:"Discount"}),(0,h.jsxs)(De,{style:{color:"#10B981"},children:["-",Cn," ",Vn.toFixed(2)]})]}),_t&&(0,h.jsxs)(Oe,{children:[(0,h.jsxs)($e,{children:["Coupon (",_t.code,")"]}),(0,h.jsxs)(De,{style:{color:"#10B981"},children:["-",Cn," ",Jn.toFixed(2)]})]}),Tt&&(0,h.jsxs)(Oe,{children:[(0,h.jsxs)($e,{children:["Discount (",Tt.name,")"]}),(0,h.jsxs)(De,{style:{color:"#10B981"},children:["-",Cn," ",Qn.toFixed(2)]})]}),d.serviceChargeEnabled&&Zn>0&&(0,h.jsxs)(Oe,{children:[(0,h.jsxs)($e,{children:["Service Charge (",d.serviceChargeRate,"%)"]}),(0,h.jsxs)(De,{children:[Cn," ",Zn.toFixed(2)]})]}),d.taxEnabled&&Hn>0&&(0,h.jsxs)(Oe,{children:[(0,h.jsxs)($e,{children:["Tax (",d.taxRate,"%)"]}),(0,h.jsxs)(De,{children:[Cn," ",Hn.toFixed(2)]})]}),(0,h.jsxs)(Re,{children:[(0,h.jsx)($e,{children:"Total"}),(0,h.jsxs)(De,{children:[Cn," ",Kn.toFixed(2)]})]})]}),(0,h.jsxs)(We,{children:[(0,h.jsx)(Ye,{children:_t?(0,h.jsxs)(Je,{children:[(0,h.jsxs)("span",{children:["Coupon: ",_t.code," (-",Cn," ",_t.discount.toFixed(2),")"]}),(0,h.jsx)(Ze,{onClick:()=>{Pt(null)},children:"\xd7"})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Ge,{type:"text",placeholder:"Enter coupon code",value:Nt,onChange:e=>zt(e.target.value.toUpperCase()),onKeyDown:e=>"Enter"===e.key&&Wn()}),(0,h.jsx)(He,{onClick:Wn,disabled:!Nt,children:"Apply Coupon"})]})}),(0,h.jsx)(Ye,{children:(0,h.jsxs)(Ke,{children:[(0,h.jsxs)(Ve,{active:5===Bt,onClick:()=>Un(5),children:[d.currency," 5"]}),(0,h.jsxs)(Ve,{active:10===Bt,onClick:()=>Un(10),children:[d.currency," 10"]}),(0,h.jsxs)(Ve,{active:15===Bt,onClick:()=>Un(15),children:[d.currency," 15"]}),(0,h.jsxs)(Ve,{onClick:()=>nn(!0),children:["Custom ",d.currency]})]})}),(0,h.jsx)(Ye,{children:(0,h.jsxs)(Ke,{children:[(0,h.jsx)(Ve,{active:"Staff"===(null===Tt||void 0===Tt?void 0:Tt.name),onClick:()=>Yn("Staff"),children:"20%"}),(0,h.jsx)(Ve,{active:"VIP"===(null===Tt||void 0===Tt?void 0:Tt.name),onClick:()=>Yn("VIP"),children:"15%"}),(0,h.jsx)(Ve,{onClick:()=>rn(!0),children:"Custom %"})]})})]})]}),d.pagerSystem.enabled&&z.length>0&&(0,h.jsxs)(ye,{children:[(0,h.jsx)(fe,{children:"Pager Number:"}),(0,h.jsxs)(ut,{children:[(0,h.jsx)(xt,{type:"text",value:Qt,onChange:e=>{const t=e.target.value;Xt(t),Jt(t),t.trim()?en(!0):en(!1)},onFocus:()=>{!Qt.trim()&&Vt||en(!0)},onBlur:()=>setTimeout(()=>en(!1),200),placeholder:Vt?`#${Vt}`:"Type or click..."}),(0,h.jsx)(ht,{show:Zt,children:Ln().length>0?Ln().map(e=>(0,h.jsxs)(mt,{onClick:()=>{return Jt((t=e).toString()),Xt(t.toString()),void en(!1);var t},children:["Pager #",e]},e)):(0,h.jsx)(mt,{style:{cursor:"default",color:"#6B7C93"},children:"No matching pagers"})})]})]}),(0,h.jsxs)(qe,{children:[(0,h.jsx)(Le,{variant:"danger",onClick:()=>{z.length>0&&Dt(!0)},children:"Clear"}),(0,h.jsx)(Le,{variant:"secondary",onClick:async()=>{if(console.log("\ud83d\udd35 handleAddOrder called"),0!==z.length)if(Et)console.warn("POS - Order already in progress, ignoring duplicate call");else{console.log("\ud83d\udfe2 Starting order creation, setting isProcessingPayment=true"),It(!0);try{const t=new Date,i={date:t,items:z,subtotal:Gn,discount:Vn,discountPolicy:Tt?{name:Tt.name,amount:Tt.discount}:void 0,coupon:_t?{code:_t.code,discount:_t.discount}:null,takeawayCharge:Xn,serviceCharge:Zn,serviceChargeRate:d.serviceChargeRate,tax:Hn,taxRate:d.taxRate,total:Kn,paymentMethod:"Pending",amountReceived:0,change:0},r={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:gn?gn.name:(e="Walk-in Customer",e&&"Guest Customer"!==e&&"Mobile Guest"!==e?e:"Walk-in Customer"),phone:gn?gn.phone:"POS Terminal",email:gn&&gn.email||"",type:gn?"member":"guest",customerId:null===gn||void 0===gn?void 0:gn.id,loyaltyTier:null===gn||void 0===gn?void 0:gn.loyaltyTier,points:null===gn||void 0===gn?void 0:gn.points},items:z.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:Gn,tax:Hn,taxRate:d.taxRate,serviceCharge:Zn,serviceChargeRate:d.serviceChargeRate,discount:Vn,coupon:_t?{code:_t.code,amount:_t.discount}:void 0,discountPolicy:Tt?{name:Tt.name,amount:Tt.discount}:void 0,takeawayCharge:Xn,total:Kn,paymentMethod:"Pending",paymentStatus:"pending",orderType:Ut,orderSource:"pos",tableNumber:"dine-in"===Ut&&Yt?Yt:void 0,pagerNumber:Vt||void 0};console.log("\ud83d\udfe1 Calling addOrder with orderNumber:",r.orderNumber);const s=await o(r,n?Number(n):void 0);console.log("\ud83d\udfe2 addOrder completed, savedOrder:",s),wt({...i,orderNumber:(null===s||void 0===s?void 0:s.order_number)||(null===s||void 0===s?void 0:s.orderNumber)||r.orderNumber,pickupNumber:(null===s||void 0===s?void 0:s.pickup_number)||(null===s||void 0===s?void 0:s.pickupNumber)||(null!==s&&void 0!==s&&s.order_number?s.order_number.split("-")[1]:r.pickupNumber),pagerNumber:(null===s||void 0===s?void 0:s.pager_number)||Vt||void 0,takeawayCharge:(null===s||void 0===s?void 0:s.takeaway_charge)||(null===s||void 0===s?void 0:s.takeawayCharge)||i.takeawayCharge,subtotal:(null===s||void 0===s?void 0:s.subtotal)||i.subtotal,tax:(null===s||void 0===s?void 0:s.tax)||i.tax,serviceCharge:(null===s||void 0===s?void 0:s.service_charge)||(null===s||void 0===s?void 0:s.serviceCharge)||i.serviceCharge,discount:(null===s||void 0===s?void 0:s.discount)||i.discount,discountPolicy:i.discountPolicy,coupon:i.coupon,pointsUsed:0,pointDiscount:0,total:(null===s||void 0===s?void 0:s.total)||i.total}),Ft(!0),_([]),St(0),Pt(null),Ot(null),zt(""),Gt(""),Jt(""),Xt(""),bn(null),xn(""),console.log("POS - Order added without payment:",null===s||void 0===s?void 0:s.orderNumber)}catch(t){console.error("POS - Error adding order:",t),alert("Failed to create order. Please try again.")}finally{It(!1)}var e}},children:"Pay Later"}),(0,h.jsx)(Le,{variant:"primary",onClick:()=>{0!==z.length&&vt(!0)},style:{flex:2},children:"Pay Now"})]})]})]}),(0,h.jsx)(s.A,{isOpen:bt,onClose:()=>vt(!1),total:Kn,subtotal:Gn,tax:Hn,serviceCharge:Zn,takeawayCharge:Xn,discountAmount:Vn,couponDiscount:Jn,onConfirmPayment:async(e,n,i,r,s)=>{if(Et)return void console.warn("POS - Payment already in progress, ignoring duplicate call");It(!0),console.log("POS - Processing payment for method:",e,"Points used:",r);const a=s?Kn-s:Kn;try{const l=new Date,c={date:l,items:z,subtotal:Gn,discount:Vn,discountPolicy:Tt?{name:Tt.name,amount:Tt.discount}:void 0,coupon:_t?{code:_t.code,discount:_t.discount}:null,takeawayCharge:Xn,serviceCharge:Zn,serviceChargeRate:d.serviceChargeRate,tax:Hn,taxRate:d.taxRate,total:a,pointsUsed:r||0,pointDiscount:s||0,paymentMethod:e,amountReceived:n||a,change:i||0},p={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:gn?gn.name:"Walk-in Customer",phone:gn?gn.phone:"POS Terminal",email:gn&&gn.email||"",type:gn?"member":"guest",customerId:null===gn||void 0===gn?void 0:gn.id,loyaltyTier:null===gn||void 0===gn?void 0:gn.loyaltyTier,points:null===gn||void 0===gn?void 0:gn.points},items:z.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:l.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:Gn,tax:Hn,taxRate:d.taxRate,serviceCharge:Zn,serviceChargeRate:d.serviceChargeRate,discount:Vn,coupon:_t?{code:_t.code,amount:_t.discount}:void 0,discountPolicy:Tt?{name:Tt.name,amount:Tt.discount}:void 0,takeawayCharge:Xn,total:a,points_used:r||null,point_discount:s||null,paymentMethod:e,paymentStatus:"completed",orderType:Ut,orderSource:"pos",tableNumber:"dine-in"===Ut&&Yt?Yt:void 0,pagerNumber:Vt||void 0},u=await o(p,null!==t&&void 0!==t&&t.restaurantId?Number(t.restaurantId):void 0);if(gn&&v(gn.id,Kn),f){const e={...f.performance,ordersProcessed:f.performance.ordersProcessed+1};C(f.id,{totalSales:f.totalSales+Kn,totalShifts:f.totalShifts,performance:e})}wt({...c,orderNumber:(null===u||void 0===u?void 0:u.order_number)||(null===u||void 0===u?void 0:u.orderNumber)||"",pickupNumber:(null===u||void 0===u?void 0:u.pickup_number)||(null===u||void 0===u?void 0:u.pickupNumber)||(null!==u&&void 0!==u&&u.order_number?u.order_number.split("-")[1]:null),tableNumber:(null===u||void 0===u?void 0:u.table_number)||Yt||void 0,pagerNumber:(null===u||void 0===u?void 0:u.pager_number)||Vt||void 0,takeawayCharge:(null===u||void 0===u?void 0:u.takeaway_charge)||(null===u||void 0===u?void 0:u.takeawayCharge)||c.takeawayCharge,subtotal:(null===u||void 0===u?void 0:u.subtotal)||c.subtotal,tax:(null===u||void 0===u?void 0:u.tax)||c.tax,serviceCharge:(null===u||void 0===u?void 0:u.service_charge)||(null===u||void 0===u?void 0:u.serviceCharge)||c.serviceCharge,discount:(null===u||void 0===u?void 0:u.discount)||c.discount,discountPolicy:c.discountPolicy,coupon:c.coupon,pointsUsed:c.pointsUsed||0,pointDiscount:c.pointDiscount||0,total:(null===u||void 0===u?void 0:u.total)||c.total}),Ft(!0),vt(!1),_([]),St(0),Pt(null),Ot(null),zt(""),Gt(""),Jt(""),Xt(""),bn(null),xn(""),console.log("POS - Payment processing completed:",null===u||void 0===u?void 0:u.orderNumber)}catch(l){console.error("POS - Error processing payment:",l),alert("Failed to process payment. Please try again.")}finally{It(!1)}},paymentMethods:cn,taxRate:d.taxRate,serviceChargeRate:d.serviceChargeRate,taxEnabled:d.taxEnabled,serviceChargeEnabled:d.serviceChargeEnabled,customerPoints:Nn,customerTier:_n,membershipSettings:En}),kt&&(0,h.jsx)(a.A,{isOpen:yt,onClose:()=>{ft(!1),At(null)},menuItem:kt,onConfirm:(e,t,n)=>{if(!kt)return;let i=[...t];if(kt.is_set_menu&&kt.set_items&&kt.set_items.length>0){i=[...kt.set_items.map(e=>{const t=u.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}),...t]}const o=i.sort().join(","),r=z.find(e=>{var t;return e.menuItem.id===kt.id&&(null===(t=e.options)||void 0===t?void 0:t.sort().join(","))===o});_(r?z.map(t=>t.id===r.id?{...t,quantity:t.quantity+e}:t):[...z,{id:`order-${Date.now()}`,menuItem:kt,quantity:e,options:i.length>0?i:void 0,selectedOptions:n}]),ft(!1),At(null)}}),Ct&&(0,h.jsx)(O,{isOpen:jt,onClose:()=>{Mn()},orderData:Ct,onPrintBill:()=>{}}),(0,h.jsx)($.A,{isOpen:$t,onClose:()=>Dt(!1),onConfirm:()=>{_([]),St(0),Pt(null),Ot(null),zt(""),bn(null),xn(""),Jt(""),Xt(""),Dt(!1)},title:"Clear Order",message:"Are you sure you want to clear all items from the order?",confirmText:"Clear Order",cancelText:"Cancel",variant:"warning"}),(0,h.jsx)(D,{isOpen:Rt,onClose:()=>qt(!1),title:"Coming Soon",message:"This feature is coming soon",variant:"info"}),(0,h.jsx)(D,{isOpen:Lt,onClose:()=>Mt(!1),title:"Invalid Coupon",message:"The coupon code you entered is not valid. Please check and try again.",variant:"error"}),(0,h.jsx)(R.A,{isOpen:tn,onClose:()=>nn(!1),onConfirm:e=>{const t=parseFloat(e);!isNaN(t)&&t>=0&&(St(t),Ot(null)),nn(!1)},title:"Custom Discount Amount",label:"Enter discount amount:",placeholder:"25",min:0,suffix:` ${(0,x.Qn)(Cn)}`,confirmText:"Apply Discount",cancelText:"Cancel"}),(0,h.jsx)(R.A,{isOpen:on,onClose:()=>rn(!1),onConfirm:e=>{const t=parseFloat(e);if(!isNaN(t)&&t>=0&&t<=100){Ot({name:`${t}%`,discount:Gn*(t/100),requiresApproval:!1}),St(0)}rn(!1)},title:"Custom Discount Percentage",label:"Enter discount percentage:",placeholder:"10",min:0,max:100,suffix:"%",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,h.jsx)(Y.A,{}),(0,h.jsx)($.A,{isOpen:sn,onClose:()=>an(!1),onConfirm:()=>{F(),an(!1)},title:"Logout Confirmation",message:"Are you sure you want to logout from the POS system?",confirmText:"Logout",cancelText:"Cancel",variant:"warning"})]});var ti})}}]);