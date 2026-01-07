"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2548],{496:(e,t,n)=>{n.d(t,{A:()=>r});n(9950);var i=n(9610),o=n(4414);const r=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:s,message:a,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.yl,{variant:"secondary",onClick:n,children:d}),(0,o.jsx)(i.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:r,children:l})]});return(0,o.jsx)(i.aF,{isOpen:t,onClose:n,title:s,footer:p,children:(0,o.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,o.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:a})]})})}},2548:(e,t,n)=>{n.r(t),n.d(t,{default:()=>bt});var i=n(9950),o=n(4752),r=n(4492),s=n(2966),a=n(8930),l=n(9610),d=n(2687),c=n(6038),p=n(9018),u=n(4414);const x=e=>{let{isOpen:t,onClose:n,menuItem:o,onConfirm:r}=e;const{optionGroups:s}=(0,a.b)(),{operationSettings:x}=(0,p.Pj)(),[h,m]=(0,i.useState)(1),[g,b]=(0,i.useState)([]),y=o.optionGroups?o.optionGroups.map(e=>s.find(t=>t.id===e)).filter(e=>void 0!==e):[],v=(e,t,n,i)=>{if(n)b(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);else{const n=y.find(e=>e.id===t);if(n){const t=n.options.map(e=>e.id),o=g.includes(e);b(o&&!i?e=>e.filter(e=>!t.includes(e)):n=>[...n.filter(e=>!t.includes(e)),e])}}},f=()=>y.filter(e=>e.required).every(e=>g.some(t=>e.options.some(e=>e.id===t))),j=()=>{m(1),b([]),n()},F=(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(l.yl,{variant:"secondary",onClick:j,children:"Cancel"}),(0,u.jsx)(l.yl,{variant:"primary",onClick:()=>{if(f()){const e=g.map(e=>{const t=y.flatMap(e=>e.options).find(t=>t.id===e);return t?t.name:""}).filter(Boolean),t=g.map(e=>{const t=y.flatMap(e=>e.options).find(t=>t.id===e);return t?{id:t.id,name:t.name,price:t.price}:null}).filter(e=>null!==e);r(h,e,t),m(1),b([])}},disabled:!f(),children:"Add to Order"})]});return(0,u.jsxs)(l.aF,{isOpen:t,onClose:j,title:"Customize Order",footer:F,children:[(0,u.jsxs)(d.kr,{children:[(0,u.jsx)(d.hO,{style:{backgroundImage:o.image?`url(${o.image})`:"none",backgroundSize:"cover",backgroundPosition:"center",fontSize:o.image?"0":"32px"},children:!o.image&&o.emoji}),(0,u.jsxs)(d.iz,{children:[(0,u.jsx)(d.bU,{children:o.name}),(0,u.jsx)(d.NM,{children:(0,c.vv)(o.price,x.currency)})]})]}),y.map(e=>(0,u.jsxs)(d.wn,{children:[(0,u.jsxs)(l.lR,{children:[e.name,e.required&&(0,u.jsx)(d.I1,{children:"*"})]}),e.multiple?(0,u.jsx)(d.$Q,{children:e.options.map(t=>(0,u.jsxs)(d.Sb,{children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,u.jsx)(d.Oc,{type:"checkbox",checked:g.includes(t.id),onChange:()=>v(t.id,e.id,e.multiple,e.required)}),(0,u.jsx)(d.PU,{children:t.name})]}),t.price>0&&(0,u.jsxs)(d.jj,{children:["+",(0,c.vv)(t.price,x.currency)]})]},t.id))}):(0,u.jsx)(d.z6,{children:e.options.map(t=>(0,u.jsxs)(d.a,{selected:g.includes(t.id),onClick:()=>v(t.id,e.id,e.multiple,e.required),style:"spice"===e.id&&g.includes(t.id)?{borderColor:"#F97316",backgroundColor:"rgba(249, 115, 22, 0.1)",color:"#EA580C"}:{},children:[(0,u.jsx)("div",{children:t.name}),t.price>0&&(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:["+",(0,c.vv)(t.price,x.currency)]})]},t.id))})]},e.id)),(0,u.jsxs)(d.wn,{children:[(0,u.jsx)(l.lR,{children:"Quantity"}),(0,u.jsxs)(d.F8,{children:[(0,u.jsx)(d.ey,{onClick:()=>m(Math.max(1,h-1)),disabled:h<=1,children:(0,u.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,u.jsx)("path",{d:"M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),(0,u.jsx)(d.FA,{children:h}),(0,u.jsx)(d.ey,{onClick:()=>m(h+1),children:(0,u.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,u.jsx)("path",{d:"M7 3V11M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]})]}),(0,u.jsxs)(d.i_,{children:[(0,u.jsx)(d.nJ,{children:"Total:"}),(0,u.jsx)(d.aX,{children:(0,c.vv)((()=>{let e=o.price*h;return g.forEach(t=>{const n=y.flatMap(e=>e.options).find(e=>e.id===t);n&&(e+=n.price*h)}),e})(),x.currency)})]})]})};var h=n(5863),m=n(8406);const g=o.DU`
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
`,v=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,f=o.Ay.span`
  color: #6B7280;
`,j=o.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,F=o.Ay.div`
  margin-bottom: 20px;
`,C=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`,w=o.Ay.div`
  flex: 1;
`,k=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,A=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,S=o.Ay.span`
  font-size: 14px;
  color: #6B7280;
  margin-right: 16px;
`,B=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,E=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
`,z=o.Ay.div`
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
`,P=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,O=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,T=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,_=o.Ay.button`
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
`,$=e=>{let{isOpen:t,onClose:n,orderData:o,onPrintBill:r}=e;const{getStoreInfo:s,operationSettings:a}=(0,p.Pj)(),x=s(),$=e=>(0,m.r6)(e,a),D=async()=>{await(0,h.pG)(o,x)&&setTimeout(()=>{r()},100)},R=async()=>{await(0,h.Si)(o,x)},q=(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(l.yl,{variant:"secondary",onClick:D,children:"Print Bill"}),(0,u.jsx)(l.yl,{variant:"secondary",onClick:R,children:"Print Order Ticket"}),(0,u.jsx)(l.yl,{variant:"primary",onClick:n,children:"Close"})]}),M=(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(_,{onClick:D,title:"Print Bill",children:[(0,u.jsx)("span",{children:"\ud83d\udda8\ufe0f"}),(0,u.jsx)("span",{children:"Bill"})]}),(0,u.jsxs)(_,{onClick:R,title:"Print Order Ticket",children:[(0,u.jsx)("span",{children:"\ud83d\udccb"}),(0,u.jsx)("span",{children:"Ticket"})]})]});return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(g,{}),(0,u.jsxs)(l.aF,{isOpen:t,onClose:n,title:"Order Complete!",footer:q,headerActions:M,children:[(0,u.jsxs)("div",{style:{textAlign:"center"},children:[(0,u.jsxs)(b,{children:["Order ",o.orderNumber]}),o.pagerNumber?(0,u.jsxs)("div",{style:{background:"#10B981",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,u.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pager Number"}),(0,u.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:o.pagerNumber})]}):(0,u.jsxs)("div",{style:{background:"#635BFF",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,u.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pickup Number"}),(0,u.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:o.pickupNumber||o.orderNumber.split("-")[1]||"000"})]})]}),(0,u.jsxs)(y,{children:[(0,u.jsxs)(v,{children:[(0,u.jsx)(f,{children:"Date & Time"}),(0,u.jsx)(j,{children:$(o.date)})]}),(0,u.jsxs)(v,{children:[(0,u.jsx)(f,{children:"Payment Method"}),(0,u.jsx)(j,{children:o.paymentMethod})]}),"cash"===o.paymentMethod&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(v,{children:[(0,u.jsx)(f,{children:"Amount Received"}),(0,u.jsx)(j,{children:(0,c.vv)(o.amountReceived,a.currency)})]}),(0,u.jsxs)(v,{children:[(0,u.jsx)(f,{children:"Change"}),(0,u.jsx)(j,{children:(0,c.vv)(o.change,a.currency)})]})]})]}),(0,u.jsxs)(d.wn,{children:[(0,u.jsx)(E,{children:"Order Items"}),(0,u.jsx)(F,{children:o.items.map((e,t)=>(0,u.jsxs)(C,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(k,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,u.jsx)(A,{children:e.options.join(", ")})]}),(0,u.jsxs)(S,{children:[e.quantity,"x"]}),(0,u.jsx)(B,{children:(0,c.vv)(e.menuItem.price*e.quantity,a.currency)})]},t))})]}),(0,u.jsxs)(d.wn,{children:[(0,u.jsxs)(v,{children:[(0,u.jsx)(f,{children:"Subtotal"}),(0,u.jsx)(j,{children:(0,c.vv)(o.subtotal,a.currency)})]}),o.takeawayCharge&&Number(o.takeawayCharge)>0&&(0,u.jsxs)(v,{children:[(0,u.jsx)(f,{children:"Takeaway Charge"}),(0,u.jsx)(j,{children:(0,c.vv)(Number(o.takeawayCharge),a.currency)})]}),o.discount&&Number(o.discount)>0&&(0,u.jsxs)(v,{children:[(0,u.jsx)(f,{children:"Discount"}),(0,u.jsx)(j,{style:{color:"#10B981"},children:(0,c.vv)(-Number(o.discount),a.currency)})]}),o.discountPolicy&&o.discountPolicy.amount&&Number(o.discountPolicy.amount)>0&&(0,u.jsxs)(v,{children:[(0,u.jsxs)(f,{children:["Discount (",o.discountPolicy.name,")"]}),(0,u.jsx)(j,{style:{color:"#10B981"},children:(0,c.vv)(-Number(o.discountPolicy.amount),a.currency)})]}),o.coupon&&o.coupon.discount&&Number(o.coupon.discount)>0&&(0,u.jsxs)(v,{children:[(0,u.jsxs)(f,{children:["Coupon (",o.coupon.code,")"]}),(0,u.jsx)(j,{style:{color:"#10B981"},children:(0,c.vv)(-Number(o.coupon.discount),a.currency)})]}),o.serviceCharge&&Number(o.serviceCharge)>0&&(0,u.jsxs)(v,{children:[(0,u.jsxs)(f,{children:["Service Charge (",o.serviceChargeRate||10,"%)"]}),(0,u.jsx)(j,{children:(0,c.vv)(Number(o.serviceCharge),a.currency)})]}),o.tax&&Number(o.tax)>0&&(0,u.jsxs)(v,{children:[(0,u.jsxs)(f,{children:["Tax (",o.taxRate||6,"%)"]}),(0,u.jsx)(j,{children:(0,c.vv)(Number(o.tax),a.currency)})]})]}),(0,u.jsxs)(d.i_,{style:{marginTop:0},children:[(0,u.jsx)(d.nJ,{children:"Total"}),(0,u.jsx)(d.aX,{children:(0,c.vv)(o.total,a.currency)})]})]}),(0,u.jsxs)(z,{id:"order-complete-bill-print",children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(N,{children:x.name}),(0,u.jsxs)("div",{style:{fontSize:"11px",marginTop:"5px"},children:[x.address,(0,u.jsx)("br",{}),"Tel: ",x.phone,(0,u.jsx)("br",{}),"GST Reg No: ",x.gstRegNo]})]}),(0,u.jsxs)(P,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,u.jsxs)(O,{children:[(0,u.jsx)("strong",{children:"Order No:"}),(0,u.jsx)("span",{children:o.orderNumber})]}),(0,u.jsxs)(O,{children:[(0,u.jsx)("strong",{children:"Date:"}),(0,u.jsx)("span",{children:$(o.date)})]}),(0,u.jsxs)(O,{children:[(0,u.jsx)("strong",{children:"Cashier:"}),(0,u.jsx)("span",{children:"POS Terminal"})]}),(0,u.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",o.pickupNumber||o.orderNumber.split("-")[1]||"000"]}),o.pagerNumber&&(0,u.jsxs)("div",{style:{fontSize:"16px",fontWeight:"bold",textAlign:"center",margin:"5px 0"},children:["PAGER #",o.pagerNumber]})]}),(0,u.jsx)(P,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,u.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,u.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,u.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,u.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,u.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,u.jsx)("tbody",{children:o.items.map((e,t)=>(0,u.jsx)(i.Fragment,{children:(0,u.jsxs)("tr",{children:[(0,u.jsxs)("td",{style:{padding:"5px 0"},children:[e.menuItem.name,e.options&&e.options.length>0&&(0,u.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:e.options.join(", ")})]}),(0,u.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,u.jsx)("td",{style:{textAlign:"right"},children:e.menuItem.price.toFixed(2)}),(0,u.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*e.menuItem.price).toFixed(2)})]})},t))})]})}),(0,u.jsxs)(P,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,u.jsxs)(O,{children:[(0,u.jsx)("span",{children:"Subtotal:"}),(0,u.jsx)("span",{children:(0,c.vv)(o.subtotal,a.currency)})]}),o.takeawayCharge&&Number(o.takeawayCharge)>0&&(0,u.jsxs)(O,{children:[(0,u.jsx)("span",{children:"Takeaway Charge:"}),(0,u.jsx)("span",{children:(0,c.vv)(Number(o.takeawayCharge),a.currency)})]}),o.discount&&Number(o.discount)>0&&(0,u.jsxs)(O,{children:[(0,u.jsx)("span",{children:"Discount:"}),(0,u.jsx)("span",{children:(0,c.vv)(-Number(o.discount),a.currency)})]}),o.discountPolicy&&o.discountPolicy.amount&&Number(o.discountPolicy.amount)>0&&(0,u.jsxs)(O,{children:[(0,u.jsxs)("span",{children:["Discount (",o.discountPolicy.name,"):"]}),(0,u.jsx)("span",{children:(0,c.vv)(-Number(o.discountPolicy.amount),a.currency)})]}),o.coupon&&o.coupon.discount&&Number(o.coupon.discount)>0&&(0,u.jsxs)(O,{children:[(0,u.jsxs)("span",{children:["Coupon (",o.coupon.code,"):"]}),(0,u.jsx)("span",{children:(0,c.vv)(-Number(o.coupon.discount),a.currency)})]}),o.serviceCharge&&Number(o.serviceCharge)>0&&(0,u.jsxs)(O,{children:[(0,u.jsxs)("span",{children:["Service Charge (",o.serviceChargeRate||10,"%):"]}),(0,u.jsx)("span",{children:(0,c.vv)(Number(o.serviceCharge),a.currency)})]}),o.tax&&Number(o.tax)>0&&(0,u.jsxs)(O,{children:[(0,u.jsxs)("span",{children:["Tax (",o.taxRate||6,"%):"]}),(0,u.jsx)("span",{children:(0,c.vv)(Number(o.tax),a.currency)})]}),(0,u.jsxs)(O,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,u.jsx)("span",{children:"TOTAL:"}),(0,u.jsx)("span",{children:(0,c.vv)(o.total,a.currency)})]})]}),(0,u.jsxs)(P,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,u.jsxs)(O,{children:[(0,u.jsx)("span",{children:"Payment Method:"}),(0,u.jsx)("span",{children:o.paymentMethod.toUpperCase()})]}),"cash"===o.paymentMethod&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(O,{children:[(0,u.jsx)("span",{children:"Amount Received:"}),(0,u.jsx)("span",{children:(0,c.vv)(o.amountReceived,a.currency)})]}),(0,u.jsxs)(O,{children:[(0,u.jsx)("span",{children:"Change:"}),(0,u.jsx)("span",{children:(0,c.vv)(o.change,a.currency)})]})]})]}),(0,u.jsxs)(T,{children:[(0,u.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,u.jsx)("div",{children:"Thank you for your purchase!"}),(0,u.jsx)("div",{children:"Please keep this receipt for your records"})]})]})]})};var D=n(496);const R=e=>{let{isOpen:t,onClose:n,title:i,message:o,buttonText:r="OK"}=e;const s=(0,u.jsx)(l.yl,{onClick:n,style:{maxWidth:"200px",margin:"0 auto"},children:r});return(0,u.jsx)(l.aF,{isOpen:t,onClose:n,title:i,footer:s,children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,u.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.5"},children:o})})})};var q=n(3338),M=n(447),L=n(9037),U=n(5781),W=n(1367),G=n(2420);const Y=o.Ay.div`
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
`,V=o.Ay.div`
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
`,K=o.Ay.img`
  max-width: 180px;
  max-height: 40px;
  object-fit: contain;
`,Q=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: #0A2540;
`,J=o.Ay.div`
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
`,ye=o.Ay.div`
  width: 400px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
`,ve=o.Ay.div`
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
`,Se=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Be=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,Ee=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,ze=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ie=o.Ay.button`
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
`,Ne=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,Pe=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,Oe=o.Ay.button`
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
`,_e=o.Ay.div`
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
`,Re=(0,o.Ay)(_e)`
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
`,Me=o.Ay.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          \n          &:hover {\n            background: #5243E0;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          \n          &:active {\n            transform: translateY(0);\n          }\n        ";case"danger":return"\n          background: #FFE6E6;\n          color: #FF6B6B;\n          \n          &:hover {\n            background: #FFD9D9;\n          }\n        ";default:return"\n          background: white;\n          color: #6B7C93;\n          border: 1px solid #E6EBF1;\n          \n          &:hover {\n            border-color: #C7D2FE;\n            color: #635BFF;\n          }\n        "}}}
`,Le=o.Ay.div`
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
`,Ge=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Ye=o.Ay.input`
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
`,Ve=o.Ay.div`
  display: flex;
  gap: 8px;
`,Ke=o.Ay.button`
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
`,Qe=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 6px;
  font-size: 13px;
  color: #635BFF;
`,Je=o.Ay.div`
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
`,()=>{const e=(0,r.Zp)(),{user:t}=(0,W.As)(),n=(()=>{const{restaurantId:e}=(0,r.g)(),{user:t}=(0,W.As)();return e?parseInt(e,10):null!==t&&void 0!==t&&t.restaurantId?"number"===typeof t.restaurantId?t.restaurantId:parseInt(t.restaurantId,10):(console.warn("useRestaurantId: No restaurantId found in URL or user context, using default 1"),1)})(),{addOrder:o}=(0,M.h)(),{getTakeawayCharge:l,operationSettings:d}=(0,p.Pj)(),{categories:c,menuItems:h,getItemsByCategory:m,isLoadingMenu:g}=(0,a.b)(),{updateCustomerOrderStats:b,searchCustomers:y}=(0,L.c)(),{currentStaff:v,isLoggedIn:f,logout:j,updateStaff:F}=(0,U.g)(),[C,w]=(0,i.useState)(null),[k,A]=(0,i.useState)(null),[S,B]=(0,i.useState)(""),[E,z]=(0,i.useState)(!1),[I,N]=(0,i.useState)([]),[P,O]=(0,i.useState)(new Date),[T,_]=(0,i.useState)(!1),[bt,yt]=(0,i.useState)(!1),[vt,ft]=(0,i.useState)(!1),[jt,Ft]=(0,i.useState)(null),[Ct,wt]=(0,i.useState)(null),[kt,At]=(0,i.useState)(0),[St,Bt]=(0,i.useState)(!1),[Et,zt]=(0,i.useState)(""),[It,Nt]=(0,i.useState)(null),[Pt,Ot]=(0,i.useState)(null),[Tt,_t]=(0,i.useState)(!1),[$t,Dt]=(0,i.useState)(!1),[Rt,qt]=(0,i.useState)(!1),[Mt,Lt]=(0,i.useState)("dine-in"),[Ut,Wt]=(0,i.useState)(""),[Gt,Yt]=(0,i.useState)([]),[Ht,Vt]=(0,i.useState)(""),[Kt,Qt]=(0,i.useState)(""),[Jt,Xt]=(0,i.useState)(!1),[Zt,en]=(0,i.useState)(!1),[tn,nn]=(0,i.useState)(!1),[on,rn]=(0,i.useState)(!1),[sn,an]=(0,i.useState)(""),[ln,dn]=(0,i.useState)(null),[cn,pn]=(0,i.useState)(""),[un,xn]=(0,i.useState)(!1),[hn,mn]=(0,i.useState)(null),[gn,bn]=(0,i.useState)("RM"),[yn,vn]=(0,i.useState)(null),[fn,jn]=(0,i.useState)("cash_only"),[Fn,Cn]=(0,i.useState)(null),[wn,kn]=(0,i.useState)(0),[An,Sn]=(0,i.useState)("Bronze"),[Bn,En]=(0,i.useState)(40),zn=(0,i.useRef)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();t.brand_logo?an(t.brand_logo):t.brandLogo?an(t.brandLogo):t.logo&&an(t.logo)}}catch(e){console.error("Failed to load brand logo:",e)}};e();const t=()=>{e()};return window.addEventListener("brandLogoUpdated",t),()=>{window.removeEventListener("brandLogoUpdated",t)}},[]),(0,i.useEffect)(()=>{if(c.length>0&&null===C){const e=c[0].id;w(e)}},[c,C]);(0,i.useEffect)(()=>{var e;c.length>0&&C&&!E&&!c.find(e=>e.id===C)&&w((null===(e=c[0])||void 0===e?void 0:e.id)||null)},[c,C,E]),(0,i.useEffect)(()=>{const e=setInterval(()=>{O(new Date)},1e3);return()=>clearInterval(e)},[]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/restaurants/${t.restaurantId}`,{credentials:"include"});if(e.ok){const t=await e.json(),n=t.data||t;if(n.table_settings){const{enableTableNumbers:e,totalTables:t,tablePrefix:i}=n.table_settings;if(e){const e=[];for(let n=1;n<=t;n++)e.push(`${i}${String(n).padStart(3,"0")}`);Yt(e)}}}}catch(e){console.error("Failed to load table settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/restaurants/${t.restaurantId}`);if(e.ok){const t=await e.json(),n=t.data||t;n.payment_settings&&dn(n.payment_settings),bn(n.currency||"RM"),vn(n.cash_rounding?parseFloat(n.cash_rounding):null),jn(n.rounding_apply_to||"cash_only")}}catch(e){console.error("Failed to load payment settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/membership/settings/${t.restaurantId}`);if(e.ok){const t=await e.json();t.success&&t.data&&(Cn(t.data),console.log("\u2705 Membership settings loaded for POS:",t.data))}}catch(e){console.error("Failed to load membership settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId&&null!==hn&&void 0!==hn&&hn.id)try{const e=await fetch(`/api/membership/customer/${t.restaurantId}/${hn.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&(kn(t.data.points||0),Sn(t.data.loyalty_tier||"Bronze"),console.log("\u2705 Customer points loaded:",t.data.points,"Tier:",t.data.loyalty_tier))}}catch(e){console.error("Failed to load customer points:",e)}else kn(0),Sn("Bronze")})()},[null===t||void 0===t?void 0:t.restaurantId,null===hn||void 0===hn?void 0:hn.id]);const In=(()=>{let e=[];if(E){const t=S.toLowerCase().trim();e=h.filter(e=>e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t))}else C&&(e=m(C));return e})(),Nn=In.length>50;(0,i.useEffect)(()=>{En(40)},[C,S]),(0,i.useEffect)(()=>{if(!Nn)return;const e=zn.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&En(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[Nn,Bn,In.length]);const Pn=(e,t)=>{N(I.map(n=>{if(n.id===e){const e=n.quantity+t;return e>0?{...n,quantity:e}:n}return n}).filter(e=>e.quantity>0))},On=()=>{const e=d.pagerSystem.totalPagers,t=Kt.trim();return t?Array.from({length:e},(e,t)=>t+1).filter(e=>e.toString().startsWith(t)):Array.from({length:e},(e,t)=>t+1)},Tn=()=>{N([]),At(0),Nt(null),Ot(null),zt(""),mn(null),pn(""),Lt("dine-in"),Wt(""),Vt(""),Qt(""),B(""),w("all"),_t(!1),_(!1),yt(!1),ft(!1),Ft(null),wt(null)},_n=e=>{kt===e?(At(0),Ot(null)):At(e)},$n=()=>{const e={SUMMER2025:{discount:"10%",status:"active"},NEWUSER:{discount:`${d.currency} 5`,status:"active"},SAVE10:{discount:"10%",status:"active"},SAVE20:{discount:"20%",status:"active"},WELCOME5:{discount:`${d.currency} 5`,status:"active"},LUNCH15:{discount:"15%",status:"active"}},t=Et.toUpperCase(),n=e[t];if(n&&"active"===n.status){let e=0;if(n.discount.includes("%")){const t=parseFloat(n.discount.replace("%",""));e=Rn*(t/100)}else n.discount.includes(d.currency)&&(e=parseFloat(n.discount.replace(`${d.currency} `,"")));Nt({code:t,discount:e}),zt("")}else Et&&qt(!0)},Dn=e=>{if(Pt&&Pt.name===e)return Ot(null),void At(0);const t={Staff:{discount:"20%",requiresApproval:!1,status:"active"},VIP:{discount:"15%",requiresApproval:!0,status:"active"}}[e];if(t&&"active"===t.status){const n=parseFloat(t.discount.replace("%","")),i=Rn*(n/100);if(t.requiresApproval){if("MANAGER123"!==prompt(`${e} requires manager approval. Enter manager code:`))return void alert("Invalid manager code. Discount not applied.");Ot({name:e,discount:i,requiresApproval:!0}),At(0)}else Ot({name:e,discount:i,requiresApproval:!1}),At(0)}},{subtotal:Rn,tax:qn,total:Mn,discountAmount:Ln,couponDiscount:Un,policyDiscount:Wn,takeawayCharge:Gn,serviceCharge:Yn}=(()=>{const e=I.reduce((e,t)=>{let n=t.menuItem.price*t.quantity;if(t.selectedOptions&&t.selectedOptions.length>0){n+=t.selectedOptions.reduce((e,t)=>e+t.price,0)*t.quantity}return e+n},0);let t=0;if("takeaway"===Mt&&d.takeawayPricing.enabled)if("per-item"===d.takeawayPricing.pricingType){const e=I.reduce((e,t)=>e+t.quantity,0);t=e*d.takeawayPricing.perItemCharge}else I.forEach(e=>{const n=l(e.menuItem.category);t+=n*e.quantity});const n=e+t,i=kt,o=It?It.discount:0,r=Pt?Pt.discount:0,s=Math.max(0,n-i-o-r),a=d.serviceChargeEnabled?s*(d.serviceChargeRate/100):0,c=d.taxEnabled?s*(d.taxRate/100):0,p=s+a+c;let u=p;return"all"===fn&&yn&&(u=Math.round(p/yn)*yn),{subtotal:e,tax:c,total:u,discountAmount:i,couponDiscount:o,policyDiscount:r,takeawayCharge:t,serviceCharge:a}})(),Hn=(()=>{if(!cn.trim())return[];return y(cn).slice(0,10)})();return(0,u.jsxs)(Y,{children:[(0,u.jsxs)(H,{children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[(0,u.jsx)(V,{onClick:Tn,children:sn?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(K,{src:sn,alt:"Brand Logo"}),(0,u.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})]}):(0,u.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})}),(0,u.jsx)("button",{onClick:()=>e("/pos/dashboard"),style:{background:"none",border:"1px solid #E6EBF1",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",color:"#6B7C93",fontSize:"13px",display:"flex",alignItems:"center",gap:"4px"},children:"\u2190 Back"})]}),(0,u.jsxs)(Q,{children:[(0,u.jsxs)(J,{clickable:!1,children:[(0,u.jsx)("span",{style:{fontSize:"16px"},children:"\u25c6"}),(0,u.jsx)("span",{children:f&&v?`Staff: ${v.name} (${v.role})`:(null===t||void 0===t?void 0:t.name)||"Staff"})]}),(0,u.jsx)(X,{children:(Vn=P,Vn.toLocaleString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",month:"short",day:"numeric",year:"numeric"}))})]})]}),(0,u.jsxs)(Z,{children:[(0,u.jsxs)(ee,{children:[(0,u.jsx)(te,{children:(0,u.jsxs)(ne,{children:[(0,u.jsx)(oe,{children:"\ud83d\udd0d"}),(0,u.jsx)(ie,{type:"text",placeholder:"Search menu items...",value:S,onChange:e=>(e=>{if(B(e),e.trim())E||(A(C),z(!0),w(null));else if(E){var t;z(!1);const e=k||(null===(t=c[0])||void 0===t?void 0:t.id)||null;w(e),A(null)}})(e.target.value)}),S&&(0,u.jsx)(re,{onClick:()=>{if(B(""),E){var e;z(!1);const t=k||(null===(e=c[0])||void 0===e?void 0:e.id)||null;w(t),A(null)}},title:"Clear search",children:"\xd7"})]})}),(0,u.jsx)(ae,{children:c.map(e=>(0,u.jsxs)(le,{active:C===e.id&&!E,onClick:()=>{return t=e.id,E&&(z(!1),B("")),void w(t);var t},children:[e.emoji," ",e.name]},e.id))}),E&&(0,u.jsxs)("div",{style:{padding:"8px 16px",background:"#f0f7ff",borderRadius:"8px",marginBottom:"12px",fontSize:"14px",color:"#1a73e8",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("span",{children:"\ud83d\udd0d"}),(0,u.jsxs)("span",{children:['Search results for "',S,'" (',In.length," items)"]})]}),(0,u.jsx)(de,{children:In.length>0?(0,u.jsxs)(u.Fragment,{children:[(Nn?In.slice(0,Bn):In).map(e=>{const t=e.optionGroups&&e.optionGroups.length>0;return(0,u.jsxs)(ce,{soldOut:e.soldOut,onClick:()=>(e=>{if(e.soldOut)return;let t=[];e.is_set_menu&&e.set_items&&e.set_items.length>0&&(t=e.set_items.map(e=>{const t=h.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}));const n=I.find(t=>t.menuItem.id===e.id&&(!t.options||0===t.options.length)&&!e.is_set_menu);n&&!e.is_set_menu?N(I.map(e=>e.id===n.id?{...e,quantity:e.quantity+1}:e)):N([...I,{id:`order-${Date.now()}`,menuItem:e,quantity:1,options:t.length>0?t:void 0}])})(e),children:[e.is_set_menu&&(0,u.jsx)(he,{children:"SET"}),(0,u.jsx)(pe,{hasImage:!!e.image,children:e.image?(0,u.jsx)("img",{src:e.image,alt:e.name,loading:"lazy"}):e.emoji}),(0,u.jsxs)(ue,{children:[e.code?`${e.code} `:"",e.name]}),(0,u.jsxs)(xe,{children:[gn," ",e.price.toFixed(2)]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,u.jsx)(me,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")}),t&&(0,u.jsx)(ge,{children:(0,u.jsx)(be,{onClick:t=>((e,t)=>{t.stopPropagation(),e.soldOut||(wt(e),yt(!0))})(e,t),disabled:e.soldOut,children:"Options"})})]},e.id)}),Nn&&Bn<In.length&&(0,u.jsx)("div",{ref:zn,style:{gridColumn:"1 / -1",height:"20px"}})]}):g?(0,u.jsxs)(se,{children:[(0,u.jsx)("div",{className:"icon",children:"\u23f3"}),(0,u.jsx)("div",{className:"title",children:"Loading..."})]}):(0,u.jsxs)(se,{children:[(0,u.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,u.jsx)("div",{className:"title",children:E?`No results for "${S}"`:"No items in this category"}),(0,u.jsx)("div",{className:"message",children:E?"Try searching with different keywords":"Select a different category to view items"})]})})]}),(0,u.jsxs)(ye,{children:[(0,u.jsxs)(Je,{children:[(0,u.jsx)(Xe,{active:"dine-in"===Mt,onClick:()=>Lt("dine-in"),children:"Dine In"}),(0,u.jsx)(Xe,{active:"takeaway"===Mt,onClick:()=>Lt("takeaway"),children:"Takeaway"})]}),(0,u.jsx)(et,{children:hn?(0,u.jsxs)(lt,{children:[(0,u.jsxs)(dt,{children:[(0,u.jsx)(ct,{children:hn.name}),(0,u.jsxs)(pt,{children:[hn.phone&&`${hn.phone} \u2022 `,hn.id]})]}),(0,u.jsx)(gt,{onClick:()=>{mn(null),pn("")},children:"Clear"})]}):(0,u.jsxs)(tt,{children:[(0,u.jsx)(it,{children:"\ud83d\udd0d"}),(0,u.jsx)(nt,{type:"text",placeholder:"Walk-in Customer",value:cn,onChange:e=>{const t=e.target.value;pn(t),xn(t.trim().length>0)},onFocus:()=>{cn.trim()&&xn(!0)},onBlur:()=>setTimeout(()=>xn(!1),200)}),(0,u.jsx)(ot,{show:un&&Hn.length>0,children:Hn.map(e=>(0,u.jsxs)(rt,{onClick:()=>(e=>{mn(e),pn(""),xn(!1)})(e),children:[(0,u.jsx)(st,{children:e.name}),(0,u.jsxs)(at,{children:[e.phone&&`${e.phone} \u2022 `,e.id]})]},e.id))}),(0,u.jsx)(ot,{show:un&&cn.trim().length>0&&0===Hn.length,children:(0,u.jsx)(rt,{style:{cursor:"default",color:"#6B7C93"},children:"No customers found"})})]})}),"dine-in"===Mt&&Gt.length>0&&(0,u.jsxs)(ve,{children:[(0,u.jsx)(fe,{children:"Table Number:"}),(0,u.jsxs)(je,{value:Ut,onChange:e=>Wt(e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Free Seating"}),Gt.map(e=>(0,u.jsx)("option",{value:e,children:e},e))]})]}),0===I.length?(0,u.jsxs)(Le,{children:[(0,u.jsx)(Ue,{children:"No items in order"}),(0,u.jsx)(Ue,{style:{marginTop:"8px",fontSize:"12px"},children:"Select menu items to start"})]}):(0,u.jsxs)(Fe,{children:[(0,u.jsxs)(Ce,{children:[(0,u.jsxs)(we,{children:[I.length," ",1===I.length?"item":"items"]}),I.map(e=>(0,u.jsxs)(ke,{children:[(0,u.jsxs)(Ae,{children:[(0,u.jsxs)(Se,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),e.options&&e.options.length>0&&(()=>{const t=[],n=[];return e.options.forEach(e=>{/^.+\sx\d+$/.test(e)?t.push(e):n.push(e)}),(0,u.jsxs)(u.Fragment,{children:[t.length>0&&(0,u.jsx)(Be,{style:{fontWeight:600},children:t.join(", ")}),n.length>0&&(0,u.jsxs)(Be,{children:["\u2b50 ",n.join(", ")]})]})})()]}),(0,u.jsxs)(Ee,{children:[(0,u.jsxs)(ze,{children:[(0,u.jsx)(Ie,{onClick:()=>Pn(e.id,-1),children:"-"}),(0,u.jsx)(Ne,{children:e.quantity}),(0,u.jsx)(Ie,{onClick:()=>Pn(e.id,1),children:"+"})]}),(0,u.jsxs)(Pe,{children:[gn," ",(()=>{let t=e.menuItem.price*e.quantity;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)*e.quantity}return t.toFixed(2)})()]}),(0,u.jsx)(Oe,{onClick:()=>{return t=e.id,void N(I.filter(e=>e.id!==t));var t},children:"\xd7"})]})]},e.id))]}),(0,u.jsxs)(Te,{children:[(0,u.jsxs)(_e,{children:[(0,u.jsx)($e,{children:"Subtotal"}),(0,u.jsxs)(De,{children:[gn," ",Rn.toFixed(2)]})]}),Gn>0&&(0,u.jsxs)(_e,{children:[(0,u.jsx)($e,{children:"Takeaway Charge"}),(0,u.jsxs)(De,{children:[gn," ",Gn.toFixed(2)]})]}),Ln>0&&(0,u.jsxs)(_e,{children:[(0,u.jsx)($e,{children:"Discount"}),(0,u.jsxs)(De,{style:{color:"#10B981"},children:["-",gn," ",Ln.toFixed(2)]})]}),It&&(0,u.jsxs)(_e,{children:[(0,u.jsxs)($e,{children:["Coupon (",It.code,")"]}),(0,u.jsxs)(De,{style:{color:"#10B981"},children:["-",gn," ",Un.toFixed(2)]})]}),Pt&&(0,u.jsxs)(_e,{children:[(0,u.jsxs)($e,{children:["Discount (",Pt.name,")"]}),(0,u.jsxs)(De,{style:{color:"#10B981"},children:["-",gn," ",Wn.toFixed(2)]})]}),d.serviceChargeEnabled&&Yn>0&&(0,u.jsxs)(_e,{children:[(0,u.jsxs)($e,{children:["Service Charge (",d.serviceChargeRate,"%)"]}),(0,u.jsxs)(De,{children:[gn," ",Yn.toFixed(2)]})]}),d.taxEnabled&&qn>0&&(0,u.jsxs)(_e,{children:[(0,u.jsxs)($e,{children:["Tax (",d.taxRate,"%)"]}),(0,u.jsxs)(De,{children:[gn," ",qn.toFixed(2)]})]}),(0,u.jsxs)(Re,{children:[(0,u.jsx)($e,{children:"Total"}),(0,u.jsxs)(De,{children:[gn," ",Mn.toFixed(2)]})]})]}),(0,u.jsxs)(We,{children:[(0,u.jsx)(Ge,{children:It?(0,u.jsxs)(Qe,{children:[(0,u.jsxs)("span",{children:["Coupon: ",It.code," (-",gn," ",It.discount.toFixed(2),")"]}),(0,u.jsx)(Ze,{onClick:()=>{Nt(null)},children:"\xd7"})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(Ye,{type:"text",placeholder:"Enter coupon code",value:Et,onChange:e=>zt(e.target.value),onKeyDown:e=>"Enter"===e.key&&$n()}),(0,u.jsx)(He,{onClick:$n,disabled:!Et,children:"Apply Coupon"})]})}),(0,u.jsx)(Ge,{children:(0,u.jsxs)(Ve,{children:[(0,u.jsxs)(Ke,{active:5===kt,onClick:()=>_n(5),children:[d.currency," 5"]}),(0,u.jsxs)(Ke,{active:10===kt,onClick:()=>_n(10),children:[d.currency," 10"]}),(0,u.jsxs)(Ke,{active:15===kt,onClick:()=>_n(15),children:[d.currency," 15"]}),(0,u.jsxs)(Ke,{onClick:()=>en(!0),children:["Custom ",d.currency]})]})}),(0,u.jsx)(Ge,{children:(0,u.jsxs)(Ve,{children:[(0,u.jsx)(Ke,{active:"Staff"===(null===Pt||void 0===Pt?void 0:Pt.name),onClick:()=>Dn("Staff"),children:"20%"}),(0,u.jsx)(Ke,{active:"VIP"===(null===Pt||void 0===Pt?void 0:Pt.name),onClick:()=>Dn("VIP"),children:"15%"}),(0,u.jsx)(Ke,{onClick:()=>nn(!0),children:"Custom %"})]})})]})]}),d.pagerSystem.enabled&&I.length>0&&(0,u.jsxs)(ve,{children:[(0,u.jsx)(fe,{children:"Pager Number:"}),(0,u.jsxs)(ut,{children:[(0,u.jsx)(xt,{type:"text",value:Kt,onChange:e=>{const t=e.target.value;Qt(t),Vt(t),t.trim()?Xt(!0):Xt(!1)},onFocus:()=>{!Kt.trim()&&Ht||Xt(!0)},onBlur:()=>setTimeout(()=>Xt(!1),200),placeholder:Ht?`#${Ht}`:"Type or click..."}),(0,u.jsx)(ht,{show:Jt,children:On().length>0?On().map(e=>(0,u.jsxs)(mt,{onClick:()=>{return Vt((t=e).toString()),Qt(t.toString()),void Xt(!1);var t},children:["Pager #",e]},e)):(0,u.jsx)(mt,{style:{cursor:"default",color:"#6B7C93"},children:"No matching pagers"})})]})]}),(0,u.jsxs)(qe,{children:[(0,u.jsx)(Me,{variant:"danger",onClick:()=>{I.length>0&&_t(!0)},children:"Clear"}),(0,u.jsx)(Me,{variant:"secondary",onClick:async()=>{if(console.log("\ud83d\udd35 handleAddOrder called"),0!==I.length)if(St)console.warn("POS - Order already in progress, ignoring duplicate call");else{console.log("\ud83d\udfe2 Starting order creation, setting isProcessingPayment=true"),Bt(!0);try{const t=new Date,i={date:t,items:I,subtotal:Rn,discount:Ln,discountPolicy:Pt?{name:Pt.name,amount:Pt.discount}:void 0,coupon:It?{code:It.code,discount:It.discount}:null,takeawayCharge:Gn,serviceCharge:Yn,serviceChargeRate:d.serviceChargeRate,tax:qn,taxRate:d.taxRate,total:Mn,paymentMethod:"Pending",amountReceived:0,change:0},r={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:hn?hn.name:(e="Walk-in Customer",e&&"Guest Customer"!==e&&"Mobile Guest"!==e?e:"Walk-in Customer"),phone:hn?hn.phone:"POS Terminal",email:hn&&hn.email||"",type:hn?"member":"guest",customerId:null===hn||void 0===hn?void 0:hn.id,loyaltyTier:null===hn||void 0===hn?void 0:hn.loyaltyTier,points:null===hn||void 0===hn?void 0:hn.points},items:I.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:Rn,tax:qn,taxRate:d.taxRate,serviceCharge:Yn,serviceChargeRate:d.serviceChargeRate,discount:Ln,coupon:It?{code:It.code,amount:It.discount}:void 0,discountPolicy:Pt?{name:Pt.name,amount:Pt.discount}:void 0,takeawayCharge:Gn,total:Mn,paymentMethod:"Pending",paymentStatus:"pending",orderType:Mt,orderSource:"pos",tableNumber:"dine-in"===Mt&&Ut?Ut:void 0,pagerNumber:Ht||void 0};console.log("\ud83d\udfe1 Calling addOrder with orderNumber:",r.orderNumber);const s=await o(r,n?Number(n):void 0);console.log("\ud83d\udfe2 addOrder completed, savedOrder:",s),Ft({...i,orderNumber:(null===s||void 0===s?void 0:s.order_number)||(null===s||void 0===s?void 0:s.orderNumber)||r.orderNumber,pickupNumber:(null===s||void 0===s?void 0:s.pickupNumber)||(null!==s&&void 0!==s&&s.order_number?s.order_number.split("-")[1]:r.pickupNumber),pagerNumber:(null===s||void 0===s?void 0:s.pager_number)||Ht||void 0,takeawayCharge:(null===s||void 0===s?void 0:s.takeaway_charge)||(null===s||void 0===s?void 0:s.takeawayCharge)||i.takeawayCharge,subtotal:(null===s||void 0===s?void 0:s.subtotal)||i.subtotal,tax:(null===s||void 0===s?void 0:s.tax)||i.tax,serviceCharge:(null===s||void 0===s?void 0:s.service_charge)||(null===s||void 0===s?void 0:s.serviceCharge)||i.serviceCharge,discount:(null===s||void 0===s?void 0:s.discount)||i.discount,discountPolicy:i.discountPolicy,coupon:i.coupon,total:(null===s||void 0===s?void 0:s.total)||i.total}),ft(!0),N([]),At(0),Nt(null),Ot(null),zt(""),Wt(""),Vt(""),Qt(""),mn(null),pn(""),console.log("POS - Order added without payment:",null===s||void 0===s?void 0:s.orderNumber)}catch(t){console.error("POS - Error adding order:",t),alert("Failed to create order. Please try again.")}finally{Bt(!1)}var e}},children:"Pay Later"}),(0,u.jsx)(Me,{variant:"primary",onClick:()=>{0!==I.length&&_(!0)},style:{flex:2},children:"Pay Now"})]})]})]}),(0,u.jsx)(s.A,{isOpen:T,onClose:()=>_(!1),total:Mn,subtotal:Rn,tax:qn,serviceCharge:Yn,takeawayCharge:Gn,discountAmount:Ln,couponDiscount:Un,onConfirmPayment:async(e,n,i,r,s)=>{if(St)return void console.warn("POS - Payment already in progress, ignoring duplicate call");Bt(!0),console.log("POS - Processing payment for method:",e,"Points used:",r);const a=s?Mn-s:Mn;try{const l=new Date,c={date:l,items:I,subtotal:Rn,discount:Ln,discountPolicy:Pt?{name:Pt.name,amount:Pt.discount}:void 0,coupon:It?{code:It.code,discount:It.discount}:null,takeawayCharge:Gn,serviceCharge:Yn,serviceChargeRate:d.serviceChargeRate,tax:qn,taxRate:d.taxRate,total:a,pointsUsed:r||0,pointDiscount:s||0,paymentMethod:e,amountReceived:n||a,change:i||0},p={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:hn?hn.name:"Walk-in Customer",phone:hn?hn.phone:"POS Terminal",email:hn&&hn.email||"",type:hn?"member":"guest",customerId:null===hn||void 0===hn?void 0:hn.id,loyaltyTier:null===hn||void 0===hn?void 0:hn.loyaltyTier,points:null===hn||void 0===hn?void 0:hn.points},items:I.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:l.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:Rn,tax:qn,taxRate:d.taxRate,serviceCharge:Yn,serviceChargeRate:d.serviceChargeRate,discount:Ln,coupon:It?{code:It.code,amount:It.discount}:void 0,discountPolicy:Pt?{name:Pt.name,amount:Pt.discount}:void 0,takeawayCharge:Gn,total:a,points_used:r||null,point_discount:s||null,paymentMethod:e,paymentStatus:"completed",orderType:Mt,orderSource:"pos",tableNumber:"dine-in"===Mt&&Ut?Ut:void 0,pagerNumber:Ht||void 0},u=await o(p,null!==t&&void 0!==t&&t.restaurantId?Number(t.restaurantId):void 0);if(hn&&b(hn.id,Mn),v){const e={...v.performance,ordersProcessed:v.performance.ordersProcessed+1};F(v.id,{totalSales:v.totalSales+Mn,totalShifts:v.totalShifts,performance:e})}Ft({...c,orderNumber:(null===u||void 0===u?void 0:u.order_number)||(null===u||void 0===u?void 0:u.orderNumber)||"",pickupNumber:(null===u||void 0===u?void 0:u.pickupNumber)||(null!==u&&void 0!==u&&u.order_number?u.order_number.split("-")[1]:""),pagerNumber:(null===u||void 0===u?void 0:u.pager_number)||Ht||void 0,takeawayCharge:(null===u||void 0===u?void 0:u.takeaway_charge)||(null===u||void 0===u?void 0:u.takeawayCharge)||c.takeawayCharge,subtotal:(null===u||void 0===u?void 0:u.subtotal)||c.subtotal,tax:(null===u||void 0===u?void 0:u.tax)||c.tax,serviceCharge:(null===u||void 0===u?void 0:u.service_charge)||(null===u||void 0===u?void 0:u.serviceCharge)||c.serviceCharge,discount:(null===u||void 0===u?void 0:u.discount)||c.discount,discountPolicy:c.discountPolicy,coupon:c.coupon,total:(null===u||void 0===u?void 0:u.total)||c.total}),ft(!0),_(!1),N([]),At(0),Nt(null),Ot(null),zt(""),Wt(""),Vt(""),Qt(""),mn(null),pn(""),console.log("POS - Payment processing completed:",null===u||void 0===u?void 0:u.orderNumber)}catch(l){console.error("POS - Error processing payment:",l),alert("Failed to process payment. Please try again.")}finally{Bt(!1)}},paymentMethods:ln,taxRate:d.taxRate,serviceChargeRate:d.serviceChargeRate,taxEnabled:d.taxEnabled,serviceChargeEnabled:d.serviceChargeEnabled,customerPoints:wn,customerTier:An,membershipSettings:Fn}),Ct&&(0,u.jsx)(x,{isOpen:bt,onClose:()=>{yt(!1),wt(null)},menuItem:Ct,onConfirm:(e,t,n)=>{if(!Ct)return;let i=[...t];if(Ct.is_set_menu&&Ct.set_items&&Ct.set_items.length>0){i=[...Ct.set_items.map(e=>{const t=h.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}),...t]}const o=i.sort().join(","),r=I.find(e=>{var t;return e.menuItem.id===Ct.id&&(null===(t=e.options)||void 0===t?void 0:t.sort().join(","))===o});N(r?I.map(t=>t.id===r.id?{...t,quantity:t.quantity+e}:t):[...I,{id:`order-${Date.now()}`,menuItem:Ct,quantity:e,options:i.length>0?i:void 0,selectedOptions:n}]),yt(!1),wt(null)}}),jt&&(0,u.jsx)($,{isOpen:vt,onClose:()=>{Tn()},orderData:jt,onPrintBill:()=>{}}),(0,u.jsx)(D.A,{isOpen:Tt,onClose:()=>_t(!1),onConfirm:()=>{N([]),At(0),Nt(null),Ot(null),zt(""),mn(null),pn(""),Vt(""),Qt(""),_t(!1)},title:"Clear Order",message:"Are you sure you want to clear all items from the order?",confirmText:"Clear Order",cancelText:"Cancel",variant:"warning"}),(0,u.jsx)(R,{isOpen:$t,onClose:()=>Dt(!1),title:"Coming Soon",message:"This feature is coming soon",variant:"info"}),(0,u.jsx)(R,{isOpen:Rt,onClose:()=>qt(!1),title:"Invalid Coupon",message:"The coupon code you entered is not valid. Please check and try again.",variant:"error"}),(0,u.jsx)(q.A,{isOpen:Zt,onClose:()=>en(!1),onConfirm:e=>{const t=parseFloat(e);!isNaN(t)&&t>=0&&(At(t),Ot(null)),en(!1)},title:"Custom Discount Amount",label:"Enter discount amount:",placeholder:"25",min:0,suffix:" RM",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,u.jsx)(q.A,{isOpen:tn,onClose:()=>nn(!1),onConfirm:e=>{const t=parseFloat(e);if(!isNaN(t)&&t>=0&&t<=100){Ot({name:`${t}%`,discount:Rn*(t/100),requiresApproval:!1}),At(0)}nn(!1)},title:"Custom Discount Percentage",label:"Enter discount percentage:",placeholder:"10",min:0,max:100,suffix:"%",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,u.jsx)(G.A,{}),(0,u.jsx)(D.A,{isOpen:on,onClose:()=>rn(!1),onConfirm:()=>{j(),rn(!1)},title:"Logout Confirmation",message:"Are you sure you want to logout from the POS system?",confirmText:"Logout",cancelText:"Cancel",variant:"warning"})]});var Vn})},3338:(e,t,n)=>{n.d(t,{A:()=>c});var i=n(9950),o=n(9610),r=n(4752),s=n(4414);const a=r.Ay.input`
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
`,c=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:c,label:p,placeholder:u="",min:x=0,max:h,step:m=1,suffix:g="",confirmText:b="Apply",cancelText:y="Cancel"}=e;const[v,f]=(0,i.useState)(""),[j,F]=(0,i.useState)(""),C=()=>{const e=parseFloat(v);!isNaN(e)&&e>=x&&(void 0===h||e<=h)&&(r(v),f(""),F(""),n())},w=()=>{f(""),F(""),n()},k=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.yl,{variant:"secondary",onClick:w,children:y}),(0,s.jsx)(o.yl,{variant:"primary",onClick:C,disabled:!v||!!j||parseFloat(v)<x,children:b})]});return(0,s.jsx)(o.aF,{isOpen:t,onClose:w,title:c,footer:k,children:(0,s.jsxs)("div",{children:[(0,s.jsx)(o.lR,{children:p}),(0,s.jsx)(a,{type:"text",value:v,onChange:e=>{const t=e.target.value;if(""===t)return f(""),void F("");if(!/^\d*\.?\d*$/.test(t))return;const n=parseFloat(t);isNaN(n)||F(n<x?`Minimum value is ${x}${g}`:void 0!==h&&n>h?`Maximum value is ${h}${g}`:""),f(t)},placeholder:u,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!j&&v&&C()}}),j&&(0,s.jsx)(l,{children:j}),!j&&void 0!==h&&(0,s.jsxs)(d,{children:["Enter a value between ",x,g," and ",h,g]})]})})}}}]);