"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9641],{1472:(e,t,n)=>{n.d(t,{A:()=>r});n(9950);var i=n(9610),o=n(4414);const r=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:s,message:a,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const u=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.yl,{variant:"secondary",onClick:n,children:d}),(0,o.jsx)(i.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:r,children:l})]});return(0,o.jsx)(i.aF,{isOpen:t,onClose:n,title:s,footer:u,zIndex:1100,children:(0,o.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,o.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:a})]})})}},2538:(e,t,n)=>{n.d(t,{A:()=>c});var i=n(9950),o=n(9610),r=n(4752),s=n(4414);const a=r.Ay.input`
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
`,c=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:c,label:u,placeholder:p="",min:x=0,max:h,step:m=1,suffix:g="",confirmText:v="Apply",cancelText:b="Cancel"}=e;const[y,f]=(0,i.useState)(""),[j,F]=(0,i.useState)(""),C=()=>{const e=parseFloat(y);!isNaN(e)&&e>=x&&(void 0===h||e<=h)&&(r(y),f(""),F(""),n())},w=()=>{f(""),F(""),n()},k=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.yl,{variant:"secondary",onClick:w,children:b}),(0,s.jsx)(o.yl,{variant:"primary",onClick:C,disabled:!y||!!j||parseFloat(y)<x,children:v})]});return(0,s.jsx)(o.aF,{isOpen:t,onClose:w,title:c,footer:k,children:(0,s.jsxs)("div",{children:[(0,s.jsx)(o.lR,{children:u}),(0,s.jsx)(a,{type:"text",value:y,onChange:e=>{const t=e.target.value;if(""===t)return f(""),void F("");if(!/^\d*\.?\d*$/.test(t))return;const n=parseFloat(t);isNaN(n)||F(n<x?`Minimum value is ${x}${g}`:void 0!==h&&n>h?`Maximum value is ${h}${g}`:""),f(t)},placeholder:p,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!j&&y&&C()}}),j&&(0,s.jsx)(l,{children:j}),!j&&void 0!==h&&(0,s.jsxs)(d,{children:["Enter a value between ",x,g," and ",h,g]})]})})}},4334:(e,t,n)=>{n.d(t,{A:()=>r});n(9950);var i=n(9610),o=n(4414);const r=e=>{let{isOpen:t,onClose:n,title:r,message:s,buttonText:a="OK"}=e;const l=(0,o.jsx)(i.yl,{onClick:n,style:{maxWidth:"200px",margin:"0 auto"},children:a});return(0,o.jsx)(i.aF,{isOpen:t,onClose:n,title:r,footer:l,children:(0,o.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.5"},children:s})})})}},9641:(e,t,n)=>{n.r(t),n.d(t,{default:()=>It});var i=n(9950),o=n(4752),r=n(3422),s=n(4492),a=n(2966),l=n(9189),d=n(9610),c=n(2159),u=n(9018),p=n(5863),x=n(8406),h=n(6038),m=n(8285),g=n(4414);const v=o.DU`
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
`,b=o.Ay.div`
  font-size: 20px;
  color: #635BFF;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`,y=o.Ay.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,f=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,j=o.Ay.span`
  color: #6B7280;
`,F=o.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,C=o.Ay.div`
  margin-bottom: 20px;
`,w=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`,k=o.Ay.div`
  flex: 1;
`,A=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,S=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,B=o.Ay.span`
  font-size: 14px;
  color: #6B7280;
  margin-right: 16px;
`,E=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,N=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
`,I=o.Ay.div`
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
`,z=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,_=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,P=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,T=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,O=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,$=o.Ay.button`
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
`,D=e=>{var t,n,o,r;let{isOpen:s,onClose:a,orderData:l,onPrintBill:D}=e;const{getStoreInfo:R,operationSettings:q,paymentSettings:M}=(0,u.Pj)(),L=R(),U=e=>(0,x.r6)(e,q),W=async()=>{await(0,p.pG)(l,L)&&setTimeout(()=>{D()},100)},Y=async()=>{await(0,p.Si)(l,L)},G=(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:W,children:"Print Bill"}),(0,g.jsx)(d.yl,{variant:"secondary",onClick:Y,children:"Print Order Ticket"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:a,children:"Close"})]}),H=(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)($,{onClick:W,title:"Print Bill",children:[(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),(0,g.jsx)("span",{children:"Bill"})]}),(0,g.jsxs)($,{onClick:Y,title:"Print Order Ticket",children:[(0,g.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,g.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),(0,g.jsx)("span",{children:"Ticket"})]})]});return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(v,{}),(0,g.jsxs)(d.aF,{isOpen:s,onClose:a,title:"Order Complete!",footer:G,headerActions:H,children:[(0,g.jsxs)("div",{style:{textAlign:"center"},children:[(0,g.jsxs)(b,{children:["Order ",l.orderNumber]}),l.pagerNumber?(0,g.jsxs)("div",{style:{background:"#10B981",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pager Number"}),(0,g.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:l.pagerNumber})]}):(0,g.jsxs)("div",{style:{background:"#635BFF",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pickup Number"}),(0,g.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:l.pickupNumber||(null!==(t=l.orderNumber)&&void 0!==t&&t.includes("-")?l.orderNumber.split("-")[1]:l.orderNumber)||"-"})]})]}),(0,g.jsxs)(y,{children:[(0,g.jsxs)(f,{children:[(0,g.jsx)(j,{children:"Date & Time"}),(0,g.jsx)(F,{children:U(l.date)})]}),l.cashierName&&(0,g.jsxs)(f,{children:[(0,g.jsx)(j,{children:"Cashier"}),(0,g.jsx)(F,{children:l.cashierName})]}),(0,g.jsxs)(f,{children:[(0,g.jsx)(j,{children:"Payment Method"}),(0,g.jsx)(F,{children:(0,m.MA)(l.paymentMethod,l.cardType,M||void 0)})]}),"cash"===l.paymentMethod&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(f,{children:[(0,g.jsx)(j,{children:"Amount Received"}),(0,g.jsx)(F,{children:(0,h.vv)(l.amountReceived,q.currency)})]}),(0,g.jsxs)(f,{children:[(0,g.jsx)(j,{children:"Change"}),(0,g.jsx)(F,{children:(0,h.vv)(l.change,q.currency)})]})]})]}),(0,g.jsxs)(c.wn,{children:[(0,g.jsx)(N,{children:"Order Items"}),(0,g.jsx)(C,{children:l.items.map((e,t)=>(0,g.jsxs)(w,{children:[(0,g.jsxs)(k,{children:[(0,g.jsx)(A,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,g.jsx)(S,{children:e.options.join(", ")})]}),(0,g.jsxs)(B,{children:[e.quantity,"x"]}),(0,g.jsx)(E,{children:(0,h.vv)(e.menuItem.price*e.quantity,q.currency)})]},t))})]}),(0,g.jsxs)(c.wn,{children:[(0,g.jsxs)(f,{children:[(0,g.jsx)(j,{children:"Subtotal"}),(0,g.jsx)(F,{children:(0,h.vv)(l.subtotal,q.currency)})]}),Number(l.takeawayCharge)>0&&(0,g.jsxs)(f,{children:[(0,g.jsx)(j,{children:"Takeaway Charge"}),(0,g.jsx)(F,{children:(0,h.vv)(Number(l.takeawayCharge),q.currency)})]}),Number(l.discount)>0&&(0,g.jsxs)(f,{children:[(0,g.jsx)(j,{children:"Discount"}),(0,g.jsx)(F,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.discount),q.currency)})]}),l.discountPolicy&&Number(l.discountPolicy.amount)>0&&(0,g.jsxs)(f,{children:[(0,g.jsxs)(j,{children:["Discount (",l.discountPolicy.name,")"]}),(0,g.jsx)(F,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.discountPolicy.amount),q.currency)})]}),l.coupon&&Number(l.coupon.discount)>0&&(0,g.jsxs)(f,{children:[(0,g.jsxs)(j,{children:["Coupon (",l.coupon.code,")"]}),(0,g.jsx)(F,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.coupon.discount),q.currency)})]}),Number(l.pointDiscount)>0&&(0,g.jsxs)(f,{children:[(0,g.jsxs)(j,{children:["Points (",null===(n=l.pointsUsed)||void 0===n?void 0:n.toLocaleString()," pts)"]}),(0,g.jsx)(F,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.pointDiscount),q.currency)})]}),Number(l.serviceCharge)>0&&(0,g.jsxs)(f,{children:[(0,g.jsxs)(j,{children:["Service Charge (",l.serviceChargeRate||10,"%)"]}),(0,g.jsx)(F,{children:(0,h.vv)(Number(l.serviceCharge),q.currency)})]}),Number(l.tax)>0&&(0,g.jsxs)(f,{children:[(0,g.jsxs)(j,{children:["Tax (",l.taxRate||6,"%)"]}),(0,g.jsx)(F,{children:(0,h.vv)(Number(l.tax),q.currency)})]})]}),(0,g.jsxs)(c.i_,{style:{marginTop:0},children:[(0,g.jsx)(c.nJ,{children:"Total"}),(0,g.jsx)(c.aX,{children:(0,h.vv)(l.total,q.currency)})]})]}),(0,g.jsxs)(I,{id:"order-complete-bill-print",children:[(0,g.jsxs)(z,{children:[(0,g.jsx)(_,{children:L.name}),(0,g.jsxs)("div",{style:{fontSize:"11px",marginTop:"5px"},children:[L.address,(0,g.jsx)("br",{}),"Tel: ",L.phone,(L.businessRegistration||L.gstRegNo)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("br",{}),L.businessRegistration&&(0,g.jsxs)(g.Fragment,{children:["Reg No: ",L.businessRegistration]}),L.businessRegistration&&L.gstRegNo&&" | ",L.gstRegNo&&(0,g.jsxs)(g.Fragment,{children:["Tax No: ",L.gstRegNo]})]})]})]}),(0,g.jsxs)(P,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,g.jsxs)(T,{children:[(0,g.jsx)("strong",{children:"Order No:"}),(0,g.jsx)("span",{children:l.orderNumber})]}),(0,g.jsxs)(T,{children:[(0,g.jsx)("strong",{children:"Date:"}),(0,g.jsx)("span",{children:U(l.date)})]}),(0,g.jsxs)(T,{children:[(0,g.jsx)("strong",{children:"Cashier:"}),(0,g.jsx)("span",{children:l.cashierName||"POS Terminal"})]}),(0,g.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",l.pickupNumber||(null!==(o=l.orderNumber)&&void 0!==o&&o.includes("-")?l.orderNumber.split("-")[1]:l.orderNumber)||"-"]}),l.pagerNumber&&(0,g.jsxs)("div",{style:{fontSize:"16px",fontWeight:"bold",textAlign:"center",margin:"5px 0"},children:["PAGER #",l.pagerNumber]})]}),(0,g.jsx)(P,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,g.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,g.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,g.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,g.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,g.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,g.jsx)("tbody",{children:l.items.map((e,t)=>(0,g.jsx)(i.Fragment,{children:(0,g.jsxs)("tr",{children:[(0,g.jsxs)("td",{style:{padding:"5px 0"},children:[e.menuItem.name,e.options&&e.options.length>0&&(0,g.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:e.options.join(", ")})]}),(0,g.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,g.jsx)("td",{style:{textAlign:"right"},children:e.menuItem.price.toFixed(2)}),(0,g.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*e.menuItem.price).toFixed(2)})]})},t))})]})}),(0,g.jsxs)(P,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,g.jsxs)(T,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:(0,h.vv)(l.subtotal,q.currency)})]}),Number(l.takeawayCharge)>0&&(0,g.jsxs)(T,{children:[(0,g.jsx)("span",{children:"Takeaway Charge:"}),(0,g.jsx)("span",{children:(0,h.vv)(Number(l.takeawayCharge),q.currency)})]}),Number(l.discount)>0&&(0,g.jsxs)(T,{children:[(0,g.jsx)("span",{children:"Discount:"}),(0,g.jsx)("span",{children:(0,h.vv)(-Number(l.discount),q.currency)})]}),l.discountPolicy&&Number(l.discountPolicy.amount)>0&&(0,g.jsxs)(T,{children:[(0,g.jsxs)("span",{children:["Discount (",l.discountPolicy.name,"):"]}),(0,g.jsx)("span",{children:(0,h.vv)(-Number(l.discountPolicy.amount),q.currency)})]}),l.coupon&&Number(l.coupon.discount)>0&&(0,g.jsxs)(T,{children:[(0,g.jsxs)("span",{children:["Coupon (",l.coupon.code,"):"]}),(0,g.jsx)("span",{children:(0,h.vv)(-Number(l.coupon.discount),q.currency)})]}),Number(l.pointDiscount)>0&&(0,g.jsxs)(T,{children:[(0,g.jsxs)("span",{children:["Points (",null===(r=l.pointsUsed)||void 0===r?void 0:r.toLocaleString()," pts):"]}),(0,g.jsx)("span",{children:(0,h.vv)(-Number(l.pointDiscount),q.currency)})]}),Number(l.serviceCharge)>0&&(0,g.jsxs)(T,{children:[(0,g.jsxs)("span",{children:["Service Charge (",l.serviceChargeRate||10,"%):"]}),(0,g.jsx)("span",{children:(0,h.vv)(Number(l.serviceCharge),q.currency)})]}),Number(l.tax)>0&&(0,g.jsxs)(T,{children:[(0,g.jsxs)("span",{children:["Tax (",l.taxRate||6,"%):"]}),(0,g.jsx)("span",{children:(0,h.vv)(Number(l.tax),q.currency)})]}),(0,g.jsxs)(T,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,g.jsx)("span",{children:"TOTAL:"}),(0,g.jsx)("span",{children:(0,h.vv)(l.total,q.currency)})]})]}),(0,g.jsxs)(P,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,g.jsxs)(T,{children:[(0,g.jsx)("span",{children:"Payment Method:"}),(0,g.jsx)("span",{children:(0,m.MA)(l.paymentMethod,l.cardType,M||void 0).toUpperCase()})]}),"cash"===l.paymentMethod&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(T,{children:[(0,g.jsx)("span",{children:"Amount Received:"}),(0,g.jsx)("span",{children:(0,h.vv)(l.amountReceived,q.currency)})]}),(0,g.jsxs)(T,{children:[(0,g.jsx)("span",{children:"Change:"}),(0,g.jsx)("span",{children:(0,h.vv)(l.change,q.currency)})]})]})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,g.jsx)("div",{children:"Thank you for your purchase!"}),(0,g.jsx)("div",{children:"Please keep this receipt for your records"})]})]})]})},R=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${e=>e.show?"flex":"none"};
  align-items: center;
  justify-content: center;
  z-index: 2000;
`,q=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 360px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`,M=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin: 0 0 4px;
`,L=o.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  text-align: center;
  margin: 0 0 24px;
`,U=o.Ay.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`,W=o.Ay.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${e=>e.error?"#DC2626":e.filled?"#635BFF":"#E6EBF1"};
  background: ${e=>e.error?"#DC2626":e.filled?"#635BFF":"transparent"};
  transition: all 0.15s;
`,Y=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
`,G=o.Ay.button`
  height: 56px;
  border: 1px solid #E6EBF1;
  border-radius: 10px;
  font-size: ${e=>"action"===e.variant?"14px":"22px"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>"action"===e.variant?"#F8FAFC":"white"};
  color: ${e=>"action"===e.variant?"#6B7C93":"#0A2540"};

  &:hover {
    background: ${e=>"action"===e.variant?"#F0F4FF":"#F8FAFC"};
    border-color: #635BFF;
  }

  &:active {
    transform: scale(0.96);
    background: #F0F4FF;
  }
`,H=o.Ay.div`
  text-align: center;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  min-height: 20px;
`,V=o.Ay.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FEF2F2;
    border-color: #DC2626;
  }
`,K=o.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 20px;
`,J=e=>{let{show:t,onClose:n,onVerified:o,onLogout:r,currentCashierName:s}=e;const[a,l]=(0,i.useState)(""),[d,c]=(0,i.useState)(""),[u,p]=(0,i.useState)(!1);(0,i.useEffect)(()=>{t&&(l(""),c(""))},[t]);const x=(0,i.useCallback)(async e=>{p(!0),c("");try{const t=localStorage.getItem("auth_token"),n=await fetch("/api/staff/verify-pin",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({pin_code:e})}),i=await n.json();i.success&&i.token&&i.user?o({data:i.data,token:i.token,user:i.user}):i.success?o({data:i.data,token:"",user:i.data}):(c("Invalid PIN. Please try again."),l(""))}catch{c("Connection error. Please try again."),l("")}finally{p(!1)}},[o]),h=(0,i.useCallback)(e=>{if(u)return;if("backspace"===e)return l(e=>e.slice(0,-1)),void c("");if(a.length>=4)return;const t=a+e;l(t),c(""),4===t.length&&x(t)},[a,u,x]);return(0,i.useEffect)(()=>{if(!t)return;const e=e=>{e.key>="0"&&e.key<="9"?h(e.key):"Backspace"===e.key?h("backspace"):"Escape"===e.key&&n()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[t,h,n]),t?(0,g.jsx)(R,{show:t,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,g.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(M,{children:"Switch Cashier"}),(0,g.jsx)(L,{children:"Enter 4-digit PIN to switch"}),s&&(0,g.jsxs)(K,{children:["Current: ",s]}),(0,g.jsx)(U,{children:[0,1,2,3].map(e=>(0,g.jsx)(W,{filled:a.length>e,error:!!d},e))}),(0,g.jsx)(H,{children:d}),(0,g.jsxs)(Y,{children:[["1","2","3","4","5","6","7","8","9"].map(e=>(0,g.jsx)(G,{onClick:()=>h(e),children:e},e)),(0,g.jsx)(G,{variant:"action",onClick:()=>h("backspace"),children:"\u232b"}),(0,g.jsx)(G,{onClick:()=>h("0"),children:"0"}),(0,g.jsx)(G,{variant:"action",onClick:n,children:"Close"})]}),r&&(0,g.jsx)(V,{onClick:r,children:"Logout"})]})}):null};var Q=n(1472),X=n(4334),Z=n(2538),ee=n(447),te=n(8930),ne=n(9037),ie=n(5781),oe=n(1367),re=n(2420);const se=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
`,ae=o.Ay.div`
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
`,le=o.Ay.div`
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
`,de=o.Ay.img`
  max-width: 180px;
  max-height: 40px;
  object-fit: contain;
`,ce=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: #0A2540;
`,ue=o.Ay.div`
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
`,pe=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
  font-variant-numeric: tabular-nums;
  min-width: 200px;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 768px) {
    min-width: auto;
    text-align: left;
    font-size: 13px;
  }
`,xe=o.Ay.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`,he=o.Ay.div`
  flex: 1;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,me=o.Ay.div`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,ge=o.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,ve=o.Ay.input`
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
`,be=o.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,ye=o.Ay.button`
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
`,fe=o.Ay.div`
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
`,je=o.Ay.div`
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
`,Fe=o.Ay.button`
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
`,Ce=o.Ay.div`
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
`,we=o.Ay.div`
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
`,ke=o.Ay.div`
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
`,Ae=o.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`,Se=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,Be=o.Ay.div`
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
`,Ee=o.Ay.div`
  font-size: 10px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
  font-weight: 500;
`,Ne=o.Ay.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`,Ie=o.Ay.button`
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
`,ze=o.Ay.div`
  width: 400px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
`,_e=o.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,Pe=o.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`,Te=o.Ay.select`
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
`,Oe=o.Ay.div`
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
`,$e=o.Ay.div`
  padding: 16px 24px;
`,De=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,Re=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`,qe=o.Ay.div`
  flex: 1;
`,Me=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Le=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,Ue=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,We=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ye=o.Ay.button`
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
`,Ge=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,He=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,Ve=o.Ay.button`
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
`,Ke=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,Je=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Qe=o.Ay.span`
  color: #6B7C93;
`,Xe=o.Ay.span`
  font-weight: 500;
  color: #0A2540;
`,Ze=(0,o.Ay)(Je)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  
  ${Qe} {
    color: #0A2540;
  }
  
  ${Xe} {
    color: #635BFF;
  }
`,et=o.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,tt=o.Ay.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          \n          &:hover {\n            background: #5243E0;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          \n          &:active {\n            transform: translateY(0);\n          }\n        ";case"danger":return"\n          background: #FFE6E6;\n          color: #FF6B6B;\n          \n          &:hover {\n            background: #FFD9D9;\n          }\n        ";default:return"\n          background: white;\n          color: #6B7C93;\n          border: 1px solid #E6EBF1;\n          \n          &:hover {\n            border-color: #C7D2FE;\n            color: #635BFF;\n          }\n        "}}}
`,nt=o.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  padding: 40px;
  text-align: center;
`,it=o.Ay.div`
  font-size: 14px;
`,ot=o.Ay.div`
  padding: 16px 24px;
  background: #FAFBFC;
  border-top: 1px solid #E6EBF1;
`,rt=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,st=o.Ay.input`
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
`,at=o.Ay.button`
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
`,lt=o.Ay.div`
  display: flex;
  gap: 8px;
`,dt=o.Ay.button`
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
`,ct=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 6px;
  font-size: 13px;
  color: #635BFF;
`,ut=o.Ay.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,pt=o.Ay.button`
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
`,xt=o.Ay.button`
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;

  &:hover {
    color: #FF5252;
  }
`,ht=o.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,mt=o.Ay.div`
  position: relative;
`,gt=o.Ay.input`
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
`,vt=o.Ay.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8898AA;
  font-size: 14px;
  pointer-events: none;
`,bt=o.Ay.div`
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
`,yt=o.Ay.div`
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
`,ft=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 14px;
`,jt=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Ft=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  margin-top: 8px;
`,Ct=o.Ay.div`
  flex: 1;
`,wt=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 2px;
`,kt=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,At=o.Ay.div`
  position: relative;
  width: 140px;
`,St=o.Ay.input`
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
`,Bt=o.Ay.div`
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
`,Et=o.Ay.div`
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
`,Nt=o.Ay.button`
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
`,It=()=>{const e=(0,s.Zp)(),[t]=(0,s.ok)(),n=t.get("from")||"",o="floor-plan"===n||"floor-plan-overlay"===n,d="floor-plan-overlay"===n,c=t.get("table"),{user:x,switchUser:m,logout:v}=(0,oe.As)(),b=(()=>{const{restaurantId:e}=(0,s.g)(),{user:t}=(0,oe.As)();return e?parseInt(e,10):null!==t&&void 0!==t&&t.restaurantId?"number"===typeof t.restaurantId?t.restaurantId:parseInt(t.restaurantId,10):(console.warn("useRestaurantId: No restaurantId found in URL or user context, using default 1"),1)})(),{addOrder:y}=(0,ee.h)(),{getTakeawayCharge:f,operationSettings:j,getStoreInfo:F}=(0,u.Pj)(),{categories:C,menuItems:w,getItemsByCategory:k,loadMenuByCategory:A,isLoadingMenu:S}=(0,te.b)(),B=C.filter(e=>!1!==e.isActive),{updateCustomerOrderStats:E,searchCustomers:N}=(0,ne.c)(),{currentStaff:I,updateStaff:z}=(0,ie.g)(),[_,P]=(0,i.useState)(null),[T,O]=(0,i.useState)(null),[$,R]=(0,i.useState)(""),[q,M]=(0,i.useState)(!1),[L,U]=(0,i.useState)([]),[W,Y]=(0,i.useState)(new Date),[G,H]=(0,i.useState)(!1),[V,K]=(0,i.useState)(!1),[It,zt]=(0,i.useState)(!1),[_t,Pt]=(0,i.useState)(null),[Tt,Ot]=(0,i.useState)(null),[$t,Dt]=(0,i.useState)(0),[Rt,qt]=(0,i.useState)(!1),[Mt,Lt]=(0,i.useState)(""),[Ut,Wt]=(0,i.useState)(null),[Yt,Gt]=(0,i.useState)(null),[Ht,Vt]=(0,i.useState)(!1),[Kt,Jt]=(0,i.useState)(!1),[Qt,Xt]=(0,i.useState)(!1),[Zt,en]=(0,i.useState)("dine-in"),[tn,nn]=(0,i.useState)(""),[on,rn]=(0,i.useState)(0),[sn,an]=(0,i.useState)([]),[ln,dn]=(0,i.useState)(""),[cn,un]=(0,i.useState)(""),[pn,xn]=(0,i.useState)(!1),[hn,mn]=(0,i.useState)(!1),[gn,vn]=(0,i.useState)(!1),[bn,yn]=(0,i.useState)(!1),[fn,jn]=(0,i.useState)(""),[Fn,Cn]=(0,i.useState)(null),[wn,kn]=(0,i.useState)(""),[An,Sn]=(0,i.useState)(!1),[Bn,En]=(0,i.useState)(null),[Nn,In]=(0,i.useState)([]),[zn,_n]=(0,i.useState)(!1),Pn=(0,i.useRef)(null),[Tn,On]=(0,i.useState)("RM"),[$n,Dn]=(0,i.useState)(null),[Rn,qn]=(0,i.useState)("cash_only"),[Mn,Ln]=(0,i.useState)(null),[Un,Wn]=(0,i.useState)(0),[Yn,Gn]=(0,i.useState)("Bronze"),[Hn,Vn]=(0,i.useState)(40),Kn=(0,i.useRef)(null);(0,i.useEffect)(()=>{jn("/uploads/logos/brand-logo.png");const e=()=>{jn(`/uploads/logos/brand-logo.png?v=${Date.now()}`)};return window.addEventListener("brandLogoUpdated",e),()=>{window.removeEventListener("brandLogoUpdated",e)}},[]),(0,i.useEffect)(()=>{if(B.length>0&&null===_){const e=B[0].id;P(e),A(e)}},[B,_,A]);(0,i.useEffect)(()=>{var e;B.length>0&&_&&!q&&!B.find(e=>e.id===_)&&P((null===(e=B[0])||void 0===e?void 0:e.id)||null)},[B,_,q]),(0,i.useEffect)(()=>{const e=setInterval(()=>{Y(new Date)},1e3);return()=>clearInterval(e)},[]),(0,i.useEffect)(()=>{(async()=>{if(null!==x&&void 0!==x&&x.restaurantId)try{const e=await fetch(`/api/restaurants/${x.restaurantId}`,{credentials:"include"});if(e.ok){const t=await e.json(),n=t.data||t;if(n.table_settings){const{enableTableNumbers:e,totalTables:t,tablePrefix:i}=n.table_settings;if(e){const e=[];for(let n=1;n<=t;n++)e.push(`${i}${String(n).padStart(3,"0")}`);an(e)}}}}catch(e){console.error("Failed to load table settings:",e)}})()},[null===x||void 0===x?void 0:x.restaurantId]),(0,i.useEffect)(()=>{c&&sn.length>0&&sn.includes(c)&&(nn(c),en("dine-in"))},[c,sn]),(0,i.useEffect)(()=>{(async()=>{if(null!==x&&void 0!==x&&x.restaurantId)try{const e=await fetch(`/api/restaurants/${x.restaurantId}`);if(e.ok){const t=await e.json(),n=t.data||t;n.payment_settings&&Cn(n.payment_settings),On(n.currency||"MYR"),Dn(n.cash_rounding?parseFloat(n.cash_rounding):null),qn(n.rounding_apply_to||"cash_only")}}catch(e){console.error("Failed to load payment settings:",e)}})()},[null===x||void 0===x?void 0:x.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==x&&void 0!==x&&x.restaurantId)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/membership/settings/${x.restaurantId}`,{headers:e?{Authorization:`Bearer ${e}`}:{}});if(t.ok){const e=await t.json();e.success&&e.data&&(Ln(e.data),console.log("\u2705 Membership settings loaded for POS:",e.data))}}catch(e){console.error("Failed to load membership settings:",e)}})()},[null===x||void 0===x?void 0:x.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==x&&void 0!==x&&x.restaurantId&&null!==Bn&&void 0!==Bn&&Bn.id)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/membership/customer/${x.restaurantId}/${Bn.id}`,{headers:e?{Authorization:`Bearer ${e}`}:{}});if(t.ok){const e=await t.json();e.success&&e.data&&(Wn(e.data.points||0),Gn(e.data.loyalty_tier||"Bronze"),console.log("\u2705 Customer points loaded:",e.data.points,"Tier:",e.data.loyalty_tier))}}catch(e){console.error("Failed to load customer points:",e)}else Wn(0),Gn("Bronze")})()},[null===x||void 0===x?void 0:x.restaurantId,null===Bn||void 0===Bn?void 0:Bn.id]);const Jn=(()=>{let e=[];if(q){const t=$.toLowerCase().trim();e=w.filter(e=>e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t))}else _&&(e=k(_));return e})(),Qn=Jn.length>50;(0,i.useEffect)(()=>{Vn(40)},[_,$]),(0,i.useEffect)(()=>{if(!Qn)return;const e=Kn.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&Vn(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[Qn,Hn,Jn.length]);const Xn=(e,t)=>{U(L.map(n=>{if(n.id===e){const e=n.quantity+t;return e>0?{...n,quantity:e}:n}return n}).filter(e=>e.quantity>0))},Zn=()=>{const e=j.pagerSystem.totalPagers,t=cn.trim();return t?Array.from({length:e},(e,t)=>t+1).filter(e=>e.toString().startsWith(t)):Array.from({length:e},(e,t)=>t+1)},ei=()=>{U([]),Dt(0),Wt(null),Gt(null),Lt(""),En(null),kn(""),en("dine-in"),nn(""),rn(0),dn(""),un(""),R(""),P("all"),Vt(!1),H(!1),K(!1),zt(!1),Pt(null),Ot(null)},ti=e=>{$t===e?(Dt(0),Gt(null)):Dt(e)},ni=async()=>{if(Mt)try{const e=await fetch("/api/coupons/validate",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({code:Mt.toUpperCase(),restaurant_id:null===x||void 0===x?void 0:x.restaurantId,order_amount:oi,order_type:Zt,customer_id:(null===Bn||void 0===Bn?void 0:Bn.id)||null})});if(!e.ok)return void Xt(!0);const t=await e.json();t.valid&&t.data?(Wt({code:Mt.toUpperCase(),discount:t.data.discountAmount}),Lt("")):Xt(!0)}catch(e){console.error("Coupon validation error:",e),Xt(!0)}},ii=e=>{if(Yt&&Yt.name===e)return Gt(null),void Dt(0);const t={Staff:{discount:"20%",requiresApproval:!1,status:"active"},VIP:{discount:"15%",requiresApproval:!0,status:"active"}}[e];if(t&&"active"===t.status){const n=parseFloat(t.discount.replace("%","")),i=oi*(n/100);if(t.requiresApproval){if("MANAGER123"!==prompt(`${e} requires manager approval. Enter manager code:`))return void alert("Invalid manager code. Discount not applied.");Gt({name:e,discount:i,requiresApproval:!0}),Dt(0)}else Gt({name:e,discount:i,requiresApproval:!1}),Dt(0)}},{subtotal:oi,tax:ri,total:si,discountAmount:ai,couponDiscount:li,policyDiscount:di,takeawayCharge:ci,serviceCharge:ui}=(()=>{const e=L.reduce((e,t)=>{let n=t.menuItem.price*t.quantity;if(t.selectedOptions&&t.selectedOptions.length>0){n+=t.selectedOptions.reduce((e,t)=>e+t.price,0)*t.quantity}return e+n},0);let t=0;if("takeaway"===Zt&&j.takeawayPricing.enabled)if("per-item"===j.takeawayPricing.pricingType){const e=L.reduce((e,t)=>e+t.quantity,0);t=e*j.takeawayPricing.perItemCharge}else L.forEach(e=>{const n=f(e.menuItem.category);t+=n*e.quantity});const n=e+t,i=$t,o=Ut?Ut.discount:0,r=Yt?Yt.discount:0,s=Math.max(0,n-i-o-r),a=j.serviceChargeEnabled?s*(j.serviceChargeRate/100):0,l=j.taxEnabled?s*(j.taxRate/100):0,d=s+a+l;let c=d;return"all"===Rn&&$n&&(c=Math.round(d/$n)*$n),{subtotal:e,tax:l,total:c,discountAmount:i,couponDiscount:o,policyDiscount:r,takeawayCharge:t,serviceCharge:a}})(),pi=(0,i.useRef)(null);(0,i.useEffect)(()=>{if(null===x||void 0===x||!x.restaurantId)return;const e=(0,r.io)("/checkout-display",{transports:["websocket","polling"]});return pi.current=e,e.on("connect",()=>{e.emit("join-restaurant",x.restaurantId)}),e.on("customer-checkin",async e=>{if(e.phone&&null!==x&&void 0!==x&&x.restaurantId){kn(e.phone);try{const s=await fetch(`/api/customers/${x.restaurantId}?search=${encodeURIComponent(e.phone)}`);if(s.ok){const a=await s.json();if(a.success&&a.data&&a.data.length>0){var t,n,i,o,r;const s=a.data[0],l={id:(null===(t=s.customer)||void 0===t?void 0:t.id)||s.customer_id,name:(null===(n=s.customer)||void 0===n?void 0:n.name)||"Unknown",phone:(null===(i=s.customer)||void 0===i?void 0:i.phone)||e.phone,email:(null===(o=s.customer)||void 0===o?void 0:o.email)||"",type:(null===(r=s.customer)||void 0===r?void 0:r.type)||"member",points:s.points||0,loyaltyTier:s.loyalty_tier||"Bronze",totalOrders:s.total_orders||0,totalSpent:s.total_spent||0};En(l),kn(""),Sn(!1)}}}catch{}}}),()=>{e.disconnect()}},[null===x||void 0===x?void 0:x.restaurantId]),(0,i.useEffect)(()=>{if(!pi.current||null===x||void 0===x||!x.restaurantId)return;const e=L.map(e=>{var t,n;return{name:e.menuItem.name,quantity:e.quantity,price:e.menuItem.price+((null===(t=e.selectedOptions)||void 0===t?void 0:t.reduce((e,t)=>e+t.price,0))||0),options:(null===(n=e.selectedOptions)||void 0===n?void 0:n.map(e=>e.name))||[]}});pi.current.emit("cart-update",{restaurantId:x.restaurantId,items:e,subtotal:oi,tax:ri,taxRate:j.taxEnabled?j.taxRate:0,serviceCharge:ui,serviceChargeRate:j.serviceChargeEnabled?j.serviceChargeRate:0,discount:ai+li+di,total:si,currency:j.currency||"MYR"})},[L,oi,ri,si,ai,li,di,ui,null===x||void 0===x?void 0:x.restaurantId,j]);const xi=(()=>{if(!wn.trim())return[];if(Nn.length>0)return Nn;return N(wn).slice(0,10)})();return(0,g.jsxs)(se,{children:[(0,g.jsxs)(ae,{children:[(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[(0,g.jsx)(le,{onClick:ei,children:fn?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(de,{src:fn,alt:"Brand Logo"}),(0,g.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})]}):(0,g.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})}),(0,g.jsx)("button",{onClick:()=>e(`/restaurant/${b}/dashboard`),style:{background:"none",border:"1px solid #E6EBF1",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",color:"#6B7C93",fontSize:"13px",display:"flex",alignItems:"center",gap:"4px"},children:"\u2190 Dashboard"})]}),(0,g.jsxs)(ce,{children:[(0,g.jsxs)(ue,{clickable:!0,onClick:()=>vn(!0),title:"Click to switch cashier",children:[(0,g.jsx)("span",{style:{fontSize:"16px"},children:"\u25c6"}),(0,g.jsxs)("span",{children:["Cashier: ",(null===x||void 0===x?void 0:x.name)||"Staff"]}),(0,g.jsx)("span",{style:{fontSize:"11px",color:"#8898AA",marginLeft:"4px"},children:"\u25bc"})]}),(0,g.jsx)(pe,{children:(e=>{const t=e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return`${e.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})}  ${t}`})(W)}),(0,g.jsx)("button",{onClick:()=>window.open(`/restaurant/${null===x||void 0===x?void 0:x.restaurantId}/checkout-display`,"_blank"),title:"Open Customer Checkout Display",style:{padding:"6px 12px",fontSize:"12px",fontWeight:500,border:"1px solid #E6EBF1",borderRadius:"6px",background:"#F6F9FC",color:"#6B7C93",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",marginLeft:"8px"},children:"Customer Screen"})]})]}),(0,g.jsxs)(xe,{children:[(0,g.jsxs)(he,{children:[(0,g.jsx)(me,{children:(0,g.jsxs)(ge,{children:[(0,g.jsx)(be,{children:"\ud83d\udd0d"}),(0,g.jsx)(ve,{type:"text",placeholder:"Search menu items...",value:$,onChange:e=>(e=>{if(R(e),e.trim())q||(O(_),M(!0),P(null),A("all"));else if(q){var t;M(!1);const e=T||(null===(t=B[0])||void 0===t?void 0:t.id)||null;P(e),O(null)}})(e.target.value)}),$&&(0,g.jsx)(ye,{onClick:()=>{if(R(""),q){var e;M(!1);const t=T||(null===(e=B[0])||void 0===e?void 0:e.id)||null;P(t),O(null)}},title:"Clear search",children:"\xd7"})]})}),(0,g.jsx)(je,{children:B.map(e=>(0,g.jsxs)(Fe,{active:_===e.id&&!q,onClick:()=>{return t=e.id,q&&(M(!1),R("")),P(t),void A(t);var t},children:[e.emoji," ",e.name]},e.id))}),q&&(0,g.jsxs)("div",{style:{padding:"8px 16px",background:"#f0f7ff",borderRadius:"8px",marginBottom:"12px",fontSize:"14px",color:"#1a73e8",display:"flex",alignItems:"center",gap:"8px"},children:[(0,g.jsx)("span",{children:"\ud83d\udd0d"}),(0,g.jsxs)("span",{children:['Search results for "',$,'" (',Jn.length," items)"]})]}),(0,g.jsx)(Ce,{children:Jn.length>0?(0,g.jsxs)(g.Fragment,{children:[(Qn?Jn.slice(0,Hn):Jn).map(e=>{const t=e.optionGroups&&e.optionGroups.length>0;return(0,g.jsxs)(we,{soldOut:e.soldOut,onClick:()=>(e=>{if(e.soldOut)return;let t=[];e.is_set_menu&&e.set_items&&e.set_items.length>0&&(t=e.set_items.map(e=>{const t=w.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}));const n=L.find(t=>t.menuItem.id===e.id&&(!t.options||0===t.options.length)&&!e.is_set_menu);n&&!e.is_set_menu?U(L.map(e=>e.id===n.id?{...e,quantity:e.quantity+1}:e)):U([...L,{id:`order-${Date.now()}`,menuItem:e,quantity:1,options:t.length>0?t:void 0}])})(e),children:[e.is_set_menu&&(0,g.jsx)(Be,{children:"SET"}),(0,g.jsx)(ke,{hasImage:!!e.image,children:e.image?(0,g.jsx)("img",{src:e.image,alt:e.name,loading:"lazy"}):e.emoji}),(0,g.jsxs)(Ae,{children:[e.code?`${e.code} `:"",e.name]}),(0,g.jsxs)(Se,{children:[Tn," ",e.price.toFixed(2)]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,g.jsx)(Ee,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")}),t&&(0,g.jsx)(Ne,{children:(0,g.jsx)(Ie,{onClick:t=>((e,t)=>{t.stopPropagation(),e.soldOut||(Ot(e),K(!0))})(e,t),disabled:e.soldOut,children:"Options"})})]},e.id)}),Qn&&Hn<Jn.length&&(0,g.jsx)("div",{ref:Kn,style:{gridColumn:"1 / -1",height:"20px"}})]}):S?(0,g.jsxs)(fe,{children:[(0,g.jsx)("div",{className:"icon",children:"\u23f3"}),(0,g.jsx)("div",{className:"title",children:"Loading..."})]}):(0,g.jsxs)(fe,{children:[(0,g.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,g.jsx)("div",{className:"title",children:q?`No results for "${$}"`:"No items in this category"}),(0,g.jsx)("div",{className:"message",children:q?"Try searching with different keywords":"Select a different category to view items"})]})})]}),(0,g.jsxs)(ze,{children:[(0,g.jsxs)(ut,{children:[(0,g.jsx)(pt,{active:"dine-in"===Zt,onClick:()=>en("dine-in"),children:"Dine In"}),(0,g.jsx)(pt,{active:"takeaway"===Zt,onClick:()=>en("takeaway"),children:"Takeaway"})]}),(0,g.jsx)(ht,{children:Bn?(0,g.jsxs)(Ft,{children:[(0,g.jsxs)(Ct,{children:[(0,g.jsx)(wt,{children:Bn.name}),(0,g.jsxs)(kt,{children:[Bn.phone&&`${Bn.phone} \u2022 `,Bn.id]})]}),(0,g.jsx)(Nt,{onClick:()=>{En(null),kn(""),In([]),Wt(null),Lt("")},children:"Clear"})]}):(0,g.jsxs)(mt,{children:[(0,g.jsx)(vt,{children:"\ud83d\udd0d"}),(0,g.jsx)(gt,{type:"text",placeholder:"Walk-in Customer",value:wn,onChange:e=>{const t=e.target.value;kn(t),Sn(t.trim().length>0),Pn.current&&clearTimeout(Pn.current),t.trim().length>=2?Pn.current=setTimeout(()=>{(async e=>{if(e.trim()&&null!==x&&void 0!==x&&x.restaurantId){_n(!0);try{const t=await fetch(`/api/customers/${x.restaurantId}?search=${encodeURIComponent(e)}`);if(t.ok){const e=await t.json();if(e.success&&e.data){const t=e.data.map(e=>{var t,n,i,o,r;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id,name:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Unknown",phone:(null===(i=e.customer)||void 0===i?void 0:i.phone)||"",email:(null===(o=e.customer)||void 0===o?void 0:o.email)||"",type:(null===(r=e.customer)||void 0===r?void 0:r.type)||"member",points:e.points||0,loyaltyTier:e.loyalty_tier||"Bronze",totalOrders:e.total_orders||0,totalSpent:e.total_spent||0}});In(t.slice(0,10))}}}catch(t){console.error("Customer search error:",t)}finally{_n(!1)}}else In([])})(t)},300):In([])},onFocus:()=>{wn.trim()&&Sn(!0)},onBlur:()=>setTimeout(()=>Sn(!1),200)}),(0,g.jsx)(bt,{show:An&&xi.length>0,children:xi.map(e=>(0,g.jsxs)(yt,{onClick:()=>(e=>{En(e),kn(""),Sn(!1),In([])})(e),children:[(0,g.jsx)(ft,{children:e.name}),(0,g.jsxs)(jt,{children:[e.phone&&`${e.phone} \u2022 `,e.id]})]},e.id))}),(0,g.jsx)(bt,{show:An&&wn.trim().length>0&&0===xi.length&&!zn,children:(0,g.jsx)(yt,{style:{cursor:"default",color:"#6B7C93"},children:"No customers found"})}),(0,g.jsx)(bt,{show:An&&zn,children:(0,g.jsx)(yt,{style:{cursor:"default",color:"#6B7C93"},children:"Searching..."})})]})}),"dine-in"===Zt&&sn.length>0&&(0,g.jsxs)(_e,{children:[(0,g.jsx)(Pe,{children:"Table Number:"}),(0,g.jsxs)(Te,{value:tn,onChange:e=>nn(e.target.value),children:[(0,g.jsx)("option",{value:"",children:"Free Seating"}),sn.map(e=>(0,g.jsx)("option",{value:e,children:e},e))]}),tn&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Pe,{children:"Guests:"}),(0,g.jsxs)(Te,{value:on,onChange:e=>rn(Number(e.target.value)),style:{width:"80px"},children:[(0,g.jsx)("option",{value:0,children:"-"}),[1,2,3,4,5,6,7,8,9,10,12,15,20].map(e=>(0,g.jsx)("option",{value:e,children:e},e))]})]})]}),0===L.length?(0,g.jsxs)(nt,{children:[(0,g.jsx)(it,{children:"No items in order"}),(0,g.jsx)(it,{style:{marginTop:"8px",fontSize:"12px"},children:"Select menu items to start"})]}):(0,g.jsxs)(Oe,{children:[(0,g.jsxs)($e,{children:[(0,g.jsxs)(De,{children:[L.length," ",1===L.length?"item":"items"]}),L.map(e=>(0,g.jsxs)(Re,{children:[(0,g.jsxs)(qe,{children:[(0,g.jsxs)(Me,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),e.options&&e.options.length>0&&(()=>{const t=[],n=[];return e.options.forEach(e=>{/^.+\sx\d+$/.test(e)?t.push(e):n.push(e)}),(0,g.jsxs)(g.Fragment,{children:[t.length>0&&(0,g.jsx)(Le,{style:{fontWeight:600},children:t.join(", ")}),n.length>0&&(0,g.jsxs)(Le,{children:["\u2b50 ",n.join(", ")]})]})})()]}),(0,g.jsxs)(Ue,{children:[(0,g.jsxs)(We,{children:[(0,g.jsx)(Ye,{onClick:()=>Xn(e.id,-1),children:"-"}),(0,g.jsx)(Ge,{children:e.quantity}),(0,g.jsx)(Ye,{onClick:()=>Xn(e.id,1),children:"+"})]}),(0,g.jsxs)(He,{children:[Tn," ",(()=>{let t=e.menuItem.price*e.quantity;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)*e.quantity}return t.toFixed(2)})()]}),(0,g.jsx)(Ve,{onClick:()=>{return t=e.id,void U(L.filter(e=>e.id!==t));var t},children:"\xd7"})]})]},e.id))]}),(0,g.jsxs)(Ke,{children:[(0,g.jsxs)(Je,{children:[(0,g.jsx)(Qe,{children:"Subtotal"}),(0,g.jsxs)(Xe,{children:[Tn," ",oi.toFixed(2)]})]}),ci>0&&(0,g.jsxs)(Je,{children:[(0,g.jsx)(Qe,{children:"Takeaway Charge"}),(0,g.jsxs)(Xe,{children:[Tn," ",ci.toFixed(2)]})]}),ai>0&&(0,g.jsxs)(Je,{children:[(0,g.jsx)(Qe,{children:"Discount"}),(0,g.jsxs)(Xe,{style:{color:"#10B981"},children:["-",Tn," ",ai.toFixed(2)]})]}),Ut&&(0,g.jsxs)(Je,{children:[(0,g.jsxs)(Qe,{children:["Coupon (",Ut.code,")"]}),(0,g.jsxs)(Xe,{style:{color:"#10B981"},children:["-",Tn," ",li.toFixed(2)]})]}),Yt&&(0,g.jsxs)(Je,{children:[(0,g.jsxs)(Qe,{children:["Discount (",Yt.name,")"]}),(0,g.jsxs)(Xe,{style:{color:"#10B981"},children:["-",Tn," ",di.toFixed(2)]})]}),j.serviceChargeEnabled&&ui>0&&(0,g.jsxs)(Je,{children:[(0,g.jsxs)(Qe,{children:["Service Charge (",j.serviceChargeRate,"%)"]}),(0,g.jsxs)(Xe,{children:[Tn," ",ui.toFixed(2)]})]}),j.taxEnabled&&ri>0&&(0,g.jsxs)(Je,{children:[(0,g.jsxs)(Qe,{children:["Tax (",j.taxRate,"%)"]}),(0,g.jsxs)(Xe,{children:[Tn," ",ri.toFixed(2)]})]}),(0,g.jsxs)(Ze,{children:[(0,g.jsx)(Qe,{children:"Total"}),(0,g.jsxs)(Xe,{children:[Tn," ",si.toFixed(2)]})]})]}),(0,g.jsxs)(ot,{children:[(0,g.jsx)(rt,{children:Ut?(0,g.jsxs)(ct,{children:[(0,g.jsxs)("span",{children:["Coupon: ",Ut.code," (-",Tn," ",Ut.discount.toFixed(2),")"]}),(0,g.jsx)(xt,{onClick:()=>{Wt(null)},children:"\xd7"})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(st,{type:"text",placeholder:"Enter coupon code",value:Mt,onChange:e=>Lt(e.target.value.toUpperCase()),onKeyDown:e=>"Enter"===e.key&&ni()}),(0,g.jsx)(at,{onClick:ni,disabled:!Mt,children:"Apply Coupon"})]})}),(0,g.jsx)(rt,{children:(0,g.jsxs)(lt,{children:[(0,g.jsxs)(dt,{active:5===$t,onClick:()=>ti(5),children:[j.currency," 5"]}),(0,g.jsxs)(dt,{active:10===$t,onClick:()=>ti(10),children:[j.currency," 10"]}),(0,g.jsxs)(dt,{active:15===$t,onClick:()=>ti(15),children:[j.currency," 15"]}),(0,g.jsxs)(dt,{onClick:()=>mn(!0),children:["Custom ",j.currency]})]})}),(0,g.jsx)(rt,{children:(0,g.jsxs)(lt,{children:[(0,g.jsx)(dt,{active:"Staff"===(null===Yt||void 0===Yt?void 0:Yt.name),onClick:()=>ii("Staff"),children:"20%"}),(0,g.jsx)(dt,{active:"VIP"===(null===Yt||void 0===Yt?void 0:Yt.name),onClick:()=>ii("VIP"),children:"15%"}),(0,g.jsx)(dt,{onClick:()=>yn(!0),children:"Custom %"})]})})]})]}),j.pagerSystem.enabled&&L.length>0&&(0,g.jsxs)(_e,{children:[(0,g.jsx)(Pe,{children:"Pager Number:"}),(0,g.jsxs)(At,{children:[(0,g.jsx)(St,{type:"text",value:cn,onChange:e=>{const t=e.target.value;un(t),dn(t),t.trim()?xn(!0):xn(!1)},onFocus:()=>{!cn.trim()&&ln||xn(!0)},onBlur:()=>setTimeout(()=>xn(!1),200),placeholder:ln?`#${ln}`:"Type or click..."}),(0,g.jsx)(Bt,{show:pn,children:Zn().length>0?Zn().map(e=>(0,g.jsxs)(Et,{onClick:()=>{return dn((t=e).toString()),un(t.toString()),void xn(!1);var t},children:["Pager #",e]},e)):(0,g.jsx)(Et,{style:{cursor:"default",color:"#6B7C93"},children:"No matching pagers"})})]})]}),(0,g.jsxs)(et,{children:[(0,g.jsx)(tt,{variant:"danger",onClick:()=>{L.length>0&&Vt(!0)},children:"Clear"}),(0,g.jsx)(tt,{variant:"secondary",onClick:async()=>{if(console.log("\ud83d\udd35 handleAddOrder called"),0!==L.length)if(Rt)console.warn("POS - Order already in progress, ignoring duplicate call");else{console.log("\ud83d\udfe2 Starting order creation, setting isProcessingPayment=true"),qt(!0);try{const t=new Date,n={date:t,items:L,subtotal:oi,discount:ai,discountPolicy:Yt?{name:Yt.name,amount:Yt.discount}:void 0,coupon:Ut?{code:Ut.code,discount:Ut.discount}:null,takeawayCharge:ci,serviceCharge:ui,serviceChargeRate:j.serviceChargeRate,tax:ri,taxRate:j.taxRate,total:si,paymentMethod:"Pending",amountReceived:0,change:0},i={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:Bn?Bn.name:(e="Walk-in Customer",e&&"Guest Customer"!==e&&"Mobile Guest"!==e?e:"Walk-in Customer"),phone:Bn?Bn.phone:"POS Terminal",email:Bn&&Bn.email||"",type:Bn?"member":"guest",customerId:null===Bn||void 0===Bn?void 0:Bn.id,loyaltyTier:null===Bn||void 0===Bn?void 0:Bn.loyaltyTier,points:null===Bn||void 0===Bn?void 0:Bn.points},items:L.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,selectedOptions:e.selectedOptions||[],is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:oi,tax:ri,taxRate:j.taxRate,serviceCharge:ui,serviceChargeRate:j.serviceChargeRate,discount:ai,coupon:Ut?{code:Ut.code,amount:Ut.discount}:void 0,discountPolicy:Yt?{name:Yt.name,amount:Yt.discount}:void 0,takeawayCharge:ci,total:si,paymentMethod:"Pending",paymentStatus:"pending",orderType:Zt,orderSource:"pos",tableNumber:"dine-in"===Zt&&tn?tn:void 0,guest_count:"dine-in"===Zt&&on>0?on:null,pagerNumber:ln||void 0,cashier_id:null!==x&&void 0!==x&&x.id?Number(x.id):null,cashier_name:(null===x||void 0===x?void 0:x.name)||null};console.log("\ud83d\udfe1 Calling addOrder with orderNumber:",i.orderNumber);const o=await y(i,b?Number(b):void 0);console.log("\ud83d\udfe2 addOrder completed, savedOrder:",o),Pt({...n,orderNumber:(null===o||void 0===o?void 0:o.order_number)||(null===o||void 0===o?void 0:o.orderNumber)||i.orderNumber,pickupNumber:(null===o||void 0===o?void 0:o.pickup_number)||(null===o||void 0===o?void 0:o.pickupNumber)||(null!==o&&void 0!==o&&o.order_number?o.order_number.split("-")[1]:i.pickupNumber),pagerNumber:(null===o||void 0===o?void 0:o.pager_number)||ln||void 0,tableNumber:(null===o||void 0===o?void 0:o.table_number)||tn||void 0,takeawayCharge:(null===o||void 0===o?void 0:o.takeaway_charge)||(null===o||void 0===o?void 0:o.takeawayCharge)||n.takeawayCharge,subtotal:(null===o||void 0===o?void 0:o.subtotal)||n.subtotal,tax:(null===o||void 0===o?void 0:o.tax)||n.tax,serviceCharge:(null===o||void 0===o?void 0:o.service_charge)||(null===o||void 0===o?void 0:o.serviceCharge)||n.serviceCharge,discount:(null===o||void 0===o?void 0:o.discount)||n.discount,discountPolicy:n.discountPolicy,coupon:n.coupon,pointsUsed:0,pointDiscount:0,total:(null===o||void 0===o?void 0:o.total)||n.total,cashierName:(null===x||void 0===x?void 0:x.name)||null}),zt(!0),pi.current&&pi.current.emit("checkout-complete",{restaurantId:null===x||void 0===x?void 0:x.restaurantId,orderNumber:(null===_t||void 0===_t?void 0:_t.orderNumber)||"",total:(null===o||void 0===o?void 0:o.total)||n.total||si,currency:j.currency||"MYR"}),U([]),Dt(0),Wt(null),Gt(null),Lt(""),nn(""),rn(0),dn(""),un(""),En(null),kn(""),console.log("POS - Order added without payment:",null===o||void 0===o?void 0:o.orderNumber)}catch(t){console.error("POS - Error adding order:",t),alert("Failed to create order. Please try again.")}finally{qt(!1)}var e}},children:"Pay Later"}),(0,g.jsx)(tt,{variant:"primary",onClick:()=>{0!==L.length&&H(!0)},style:{flex:2},children:"Pay Now"})]})]})]}),(0,g.jsx)(a.A,{isOpen:G,onClose:()=>H(!1),total:si,subtotal:oi,tax:ri,serviceCharge:ui,takeawayCharge:ci,discountAmount:ai,couponDiscount:li,onConfirmPayment:async(e,t,n,i,o,r)=>{if(Rt)return void console.warn("POS - Payment already in progress, ignoring duplicate call");qt(!0),console.log("POS - Processing payment for method:",e,"Points used:",i);const s=o?si-o:si;try{var a,l,d,c;const u=new Date,h={date:u,items:L,subtotal:oi,discount:ai,discountPolicy:Yt?{name:Yt.name,amount:Yt.discount}:void 0,coupon:Ut?{code:Ut.code,discount:Ut.discount}:null,takeawayCharge:ci,serviceCharge:ui,serviceChargeRate:j.serviceChargeRate,tax:ri,taxRate:j.taxRate,total:s,pointsUsed:i||0,pointDiscount:o||0,paymentMethod:e,cardType:"card"===e&&r||null,amountReceived:t||s,change:n||0},m={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:Bn?Bn.name:"Walk-in Customer",phone:Bn?Bn.phone:"POS Terminal",email:Bn&&Bn.email||"",type:Bn?"member":"guest",customerId:null===Bn||void 0===Bn?void 0:Bn.id,loyaltyTier:null===Bn||void 0===Bn?void 0:Bn.loyaltyTier,points:null===Bn||void 0===Bn?void 0:Bn.points},items:L.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,selectedOptions:e.selectedOptions||[],is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:u.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:oi,tax:ri,taxRate:j.taxRate,serviceCharge:ui,serviceChargeRate:j.serviceChargeRate,discount:ai,coupon:Ut?{code:Ut.code,amount:Ut.discount}:void 0,discountPolicy:Yt?{name:Yt.name,amount:Yt.discount}:void 0,takeawayCharge:ci,total:s,points_used:i||null,point_discount:o||null,paymentMethod:e,card_type:"card"===e&&r||null,paymentStatus:"completed",orderType:Zt,orderSource:"pos",tableNumber:"dine-in"===Zt&&tn?tn:void 0,guest_count:"dine-in"===Zt&&on>0?on:null,pagerNumber:ln||void 0,cashier_id:null!==x&&void 0!==x&&x.id?Number(x.id):null,cashier_name:(null===x||void 0===x?void 0:x.name)||null},g=await y(m,null!==x&&void 0!==x&&x.restaurantId?Number(x.restaurantId):void 0);if(Bn&&E(Bn.id,si),I){const e={...I.performance,ordersProcessed:I.performance.ordersProcessed+1};z(I.id,{totalSales:I.totalSales+si,totalShifts:I.totalShifts,performance:e})}Pt({...h,orderNumber:(null===g||void 0===g?void 0:g.order_number)||(null===g||void 0===g?void 0:g.orderNumber)||"",pickupNumber:(null===g||void 0===g?void 0:g.pickup_number)||(null===g||void 0===g?void 0:g.pickupNumber)||(null!==g&&void 0!==g&&g.order_number?g.order_number.split("-")[1]:null),tableNumber:(null===g||void 0===g?void 0:g.table_number)||tn||void 0,pagerNumber:(null===g||void 0===g?void 0:g.pager_number)||ln||void 0,takeawayCharge:(null===g||void 0===g?void 0:g.takeaway_charge)||(null===g||void 0===g?void 0:g.takeawayCharge)||h.takeawayCharge,subtotal:(null===g||void 0===g?void 0:g.subtotal)||h.subtotal,tax:(null===g||void 0===g?void 0:g.tax)||h.tax,serviceCharge:(null===g||void 0===g?void 0:g.service_charge)||(null===g||void 0===g?void 0:g.serviceCharge)||h.serviceCharge,discount:(null===g||void 0===g?void 0:g.discount)||h.discount,discountPolicy:h.discountPolicy,coupon:h.coupon,pointsUsed:h.pointsUsed||0,pointDiscount:h.pointDiscount||0,total:(null===g||void 0===g?void 0:g.total)||h.total,cashierName:(null===x||void 0===x?void 0:x.name)||null}),zt(!0),H(!1),pi.current&&pi.current.emit("checkout-complete",{restaurantId:null===x||void 0===x?void 0:x.restaurantId,orderNumber:(null===_t||void 0===_t?void 0:_t.orderNumber)||"",total:(null===g||void 0===g?void 0:g.total)||h.total||si,currency:j.currency||"MYR"});const v=(0,p.qs)(),b=F(),f={...h,orderNumber:(null===g||void 0===g?void 0:g.order_number)||(null===g||void 0===g?void 0:g.orderNumber)||"",pickupNumber:(null===g||void 0===g?void 0:g.pickup_number)||(null===g||void 0===g?void 0:g.pickupNumber)||(null!==g&&void 0!==g&&g.order_number?g.order_number.split("-")[1]:null),tableNumber:(null===g||void 0===g?void 0:g.table_number)||tn||void 0,pagerNumber:(null===g||void 0===g?void 0:g.pager_number)||ln||void 0,total:(null===g||void 0===g?void 0:g.total)||h.total,cashierName:(null===x||void 0===x?void 0:x.name)||null};null!==(a=v.billPrinter)&&void 0!==a&&a.enabled&&null!==(l=v.billPrinter)&&void 0!==l&&l.autoPrint&&setTimeout(()=>{(0,p.pG)(f,b).catch(e=>console.error("Auto bill print failed:",e))},300);(null===(d=v.kitchenPrinter)||void 0===d?void 0:d.enabled)&&(null===(c=v.kitchenPrinter)||void 0===c?void 0:c.autoPrint)&&setTimeout(()=>{(0,p.Si)(f,b).catch(e=>console.error("Auto kitchen print failed:",e))},800),U([]),Dt(0),Wt(null),Gt(null),Lt(""),nn(""),rn(0),dn(""),un(""),En(null),kn(""),console.log("POS - Payment processing completed:",null===g||void 0===g?void 0:g.orderNumber)}catch(u){console.error("POS - Error processing payment:",u),alert("Failed to process payment. Please try again.")}finally{qt(!1)}},paymentMethods:Fn,taxRate:j.taxRate,serviceChargeRate:j.serviceChargeRate,taxEnabled:j.taxEnabled,serviceChargeEnabled:j.serviceChargeEnabled,cashierName:null===x||void 0===x?void 0:x.name,customerPoints:Un,customerTier:Yn,membershipSettings:Mn}),Tt&&(0,g.jsx)(l.A,{isOpen:V,onClose:()=>{K(!1),Ot(null)},menuItem:Tt,onConfirm:(e,t,n)=>{if(!Tt)return;let i=[...t];if(Tt.is_set_menu&&Tt.set_items&&Tt.set_items.length>0){i=[...Tt.set_items.map(e=>{const t=w.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}),...t]}const o=i.sort().join(","),r=L.find(e=>{var t;return e.menuItem.id===Tt.id&&(null===(t=e.options)||void 0===t?void 0:t.sort().join(","))===o});U(r?L.map(t=>t.id===r.id?{...t,quantity:t.quantity+e}:t):[...L,{id:`order-${Date.now()}`,menuItem:Tt,quantity:e,options:i.length>0?i:void 0,selectedOptions:n}]),K(!1),Ot(null)}}),_t&&(0,g.jsx)(D,{isOpen:It,onClose:()=>{ei(),d&&window.parent!==window?window.parent.postMessage({type:"pos-order-complete"},"*"):o&&e(`/restaurant/${b}/floor-plan`)},orderData:_t,onPrintBill:()=>{}}),(0,g.jsx)(Q.A,{isOpen:Ht,onClose:()=>Vt(!1),onConfirm:()=>{U([]),Dt(0),Wt(null),Gt(null),Lt(""),En(null),kn(""),dn(""),un(""),Vt(!1)},title:"Clear Order",message:"Are you sure you want to clear all items from the order?",confirmText:"Clear Order",cancelText:"Cancel",variant:"warning"}),(0,g.jsx)(X.A,{isOpen:Kt,onClose:()=>Jt(!1),title:"Coming Soon",message:"This feature is coming soon",variant:"info"}),(0,g.jsx)(X.A,{isOpen:Qt,onClose:()=>Xt(!1),title:"Invalid Coupon",message:"The coupon code you entered is not valid. Please check and try again.",variant:"error"}),(0,g.jsx)(Z.A,{isOpen:hn,onClose:()=>mn(!1),onConfirm:e=>{const t=parseFloat(e);!isNaN(t)&&t>=0&&(Dt(t),Gt(null)),mn(!1)},title:"Custom Discount Amount",label:"Enter discount amount:",placeholder:"25",min:0,suffix:` ${(0,h.Qn)(Tn)}`,confirmText:"Apply Discount",cancelText:"Cancel"}),(0,g.jsx)(Z.A,{isOpen:bn,onClose:()=>yn(!1),onConfirm:e=>{const t=parseFloat(e);if(!isNaN(t)&&t>=0&&t<=100){Gt({name:`${t}%`,discount:oi*(t/100),requiresApproval:!1}),Dt(0)}yn(!1)},title:"Custom Discount Percentage",label:"Enter discount percentage:",placeholder:"10",min:0,max:100,suffix:"%",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,g.jsx)(re.A,{}),(0,g.jsx)(J,{show:gn,onClose:()=>vn(!1),onVerified:e=>{e.token&&e.user&&m(e.token,e.user),vn(!1)},onLogout:()=>{v()},currentCashierName:null===x||void 0===x?void 0:x.name})]})}}}]);