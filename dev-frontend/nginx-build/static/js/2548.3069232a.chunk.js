"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2548],{496:(e,t,n)=>{n.d(t,{A:()=>r});n(9950);var i=n(9610),o=n(4414);const r=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:s,message:a,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.yl,{variant:"secondary",onClick:n,children:d}),(0,o.jsx)(i.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:r,children:l})]});return(0,o.jsx)(i.aF,{isOpen:t,onClose:n,title:s,footer:p,children:(0,o.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,o.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:a})]})})}},2548:(e,t,n)=>{n.r(t),n.d(t,{default:()=>vt});var i=n(9950),o=n(4752),r=n(4492),s=n(2966),a=n(8930),l=n(9610),d=n(2687),c=n(6038),p=n(9018),x=n(4414);const u=e=>{let{isOpen:t,onClose:n,menuItem:o,onConfirm:r}=e;const{optionGroups:s}=(0,a.b)(),{operationSettings:u}=(0,p.Pj)(),[h,g]=(0,i.useState)(1),[m,b]=(0,i.useState)([]),y=o.optionGroups?o.optionGroups.map(e=>s.find(t=>t.id===e)).filter(e=>void 0!==e):[],v=(e,t,n,i)=>{if(n)b(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);else{const n=y.find(e=>e.id===t);if(n){const t=n.options.map(e=>e.id),o=m.includes(e);b(o&&!i?e=>e.filter(e=>!t.includes(e)):n=>[...n.filter(e=>!t.includes(e)),e])}}},f=()=>y.filter(e=>e.required).every(e=>m.some(t=>e.options.some(e=>e.id===t))),j=()=>{g(1),b([]),n()},F=(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(l.yl,{variant:"secondary",onClick:j,children:"Cancel"}),(0,x.jsx)(l.yl,{variant:"primary",onClick:()=>{if(f()){const e=m.map(e=>{const t=y.flatMap(e=>e.options).find(t=>t.id===e);return t?t.name:""}).filter(Boolean),t=m.map(e=>{const t=y.flatMap(e=>e.options).find(t=>t.id===e);return t?{id:t.id,name:t.name,price:t.price}:null}).filter(e=>null!==e);r(h,e,t),g(1),b([])}},disabled:!f(),children:"Add to Order"})]});return(0,x.jsxs)(l.aF,{isOpen:t,onClose:j,title:"Customize Order",footer:F,children:[(0,x.jsxs)(d.kr,{children:[(0,x.jsx)(d.hO,{style:{backgroundImage:o.image?`url(${o.image})`:"none",backgroundSize:"cover",backgroundPosition:"center",fontSize:o.image?"0":"32px"},children:!o.image&&o.emoji}),(0,x.jsxs)(d.iz,{children:[(0,x.jsx)(d.bU,{children:o.name}),(0,x.jsx)(d.NM,{children:(0,c.vv)(o.price,u.currency)})]})]}),y.map(e=>(0,x.jsxs)(d.wn,{children:[(0,x.jsxs)(l.lR,{children:[e.name,e.required&&(0,x.jsx)(d.I1,{children:"*"})]}),e.multiple?(0,x.jsx)(d.$Q,{children:e.options.map(t=>(0,x.jsxs)(d.Sb,{children:[(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,x.jsx)(d.Oc,{type:"checkbox",checked:m.includes(t.id),onChange:()=>v(t.id,e.id,e.multiple,e.required)}),(0,x.jsx)(d.PU,{children:t.name})]}),t.price>0&&(0,x.jsxs)(d.jj,{children:["+",(0,c.vv)(t.price,u.currency)]})]},t.id))}):(0,x.jsx)(d.z6,{children:e.options.map(t=>(0,x.jsxs)(d.a,{selected:m.includes(t.id),onClick:()=>v(t.id,e.id,e.multiple,e.required),style:"spice"===e.id&&m.includes(t.id)?{borderColor:"#F97316",backgroundColor:"rgba(249, 115, 22, 0.1)",color:"#EA580C"}:{},children:[(0,x.jsx)("div",{children:t.name}),t.price>0&&(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:["+",(0,c.vv)(t.price,u.currency)]})]},t.id))})]},e.id)),(0,x.jsxs)(d.wn,{children:[(0,x.jsx)(l.lR,{children:"Quantity"}),(0,x.jsxs)(d.F8,{children:[(0,x.jsx)(d.ey,{onClick:()=>g(Math.max(1,h-1)),disabled:h<=1,children:(0,x.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("path",{d:"M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),(0,x.jsx)(d.FA,{children:h}),(0,x.jsx)(d.ey,{onClick:()=>g(h+1),children:(0,x.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("path",{d:"M7 3V11M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]})]}),(0,x.jsxs)(d.i_,{children:[(0,x.jsx)(d.nJ,{children:"Total:"}),(0,x.jsx)(d.aX,{children:(0,c.vv)((()=>{let e=o.price*h;return m.forEach(t=>{const n=y.flatMap(e=>e.options).find(e=>e.id===t);n&&(e+=n.price*h)}),e})(),u.currency)})]})]})};var h=n(5863),g=n(8406);const m=o.DU`
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
`,B=o.Ay.span`
  font-size: 14px;
  color: #6B7280;
  margin-right: 16px;
`,S=o.Ay.span`
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
`,N=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,I=o.Ay.h3`
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
`,D=e=>{let{isOpen:t,onClose:n,orderData:o,onPrintBill:r}=e;const{getStoreInfo:s,operationSettings:a}=(0,p.Pj)(),u=s(),D=e=>(0,g.r6)(e,a),_=async()=>{await(0,h.pG)(o,u)&&setTimeout(()=>{r()},100)},R=async()=>{await(0,h.Si)(o,u)},M=(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(l.yl,{variant:"secondary",onClick:_,children:"Print Bill"}),(0,x.jsx)(l.yl,{variant:"secondary",onClick:R,children:"Print Order Ticket"}),(0,x.jsx)(l.yl,{variant:"primary",onClick:n,children:"Close"})]}),q=(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)($,{onClick:_,title:"Print Bill",children:[(0,x.jsx)("span",{children:"\ud83d\udda8\ufe0f"}),(0,x.jsx)("span",{children:"Bill"})]}),(0,x.jsxs)($,{onClick:R,title:"Print Order Ticket",children:[(0,x.jsx)("span",{children:"\ud83d\udccb"}),(0,x.jsx)("span",{children:"Ticket"})]})]});return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(m,{}),(0,x.jsxs)(l.aF,{isOpen:t,onClose:n,title:"Order Complete!",footer:M,headerActions:q,children:[(0,x.jsxs)("div",{style:{textAlign:"center"},children:[(0,x.jsxs)(b,{children:["Order ",o.orderNumber]}),o.pagerNumber?(0,x.jsxs)("div",{style:{background:"#10B981",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pager Number"}),(0,x.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:o.pagerNumber})]}):(0,x.jsxs)("div",{style:{background:"#635BFF",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pickup Number"}),(0,x.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:o.pickupNumber||o.orderNumber.split("-")[1]||"000"})]})]}),(0,x.jsxs)(y,{children:[(0,x.jsxs)(v,{children:[(0,x.jsx)(f,{children:"Date & Time"}),(0,x.jsx)(j,{children:D(o.date)})]}),(0,x.jsxs)(v,{children:[(0,x.jsx)(f,{children:"Payment Method"}),(0,x.jsx)(j,{children:o.paymentMethod})]}),"cash"===o.paymentMethod&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(v,{children:[(0,x.jsx)(f,{children:"Amount Received"}),(0,x.jsx)(j,{children:(0,c.vv)(o.amountReceived,a.currency)})]}),(0,x.jsxs)(v,{children:[(0,x.jsx)(f,{children:"Change"}),(0,x.jsx)(j,{children:(0,c.vv)(o.change,a.currency)})]})]})]}),(0,x.jsxs)(d.wn,{children:[(0,x.jsx)(E,{children:"Order Items"}),(0,x.jsx)(F,{children:o.items.map((e,t)=>(0,x.jsxs)(C,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,x.jsx)(A,{children:e.options.join(", ")})]}),(0,x.jsxs)(B,{children:[e.quantity,"x"]}),(0,x.jsx)(S,{children:(0,c.vv)(e.menuItem.price*e.quantity,a.currency)})]},t))})]}),(0,x.jsxs)(d.wn,{children:[(0,x.jsxs)(v,{children:[(0,x.jsx)(f,{children:"Subtotal"}),(0,x.jsx)(j,{children:(0,c.vv)(o.subtotal,a.currency)})]}),o.takeawayCharge&&Number(o.takeawayCharge)>0&&(0,x.jsxs)(v,{children:[(0,x.jsx)(f,{children:"Takeaway Charge"}),(0,x.jsx)(j,{children:(0,c.vv)(Number(o.takeawayCharge),a.currency)})]}),o.discount&&Number(o.discount)>0&&(0,x.jsxs)(v,{children:[(0,x.jsx)(f,{children:"Discount"}),(0,x.jsx)(j,{style:{color:"#10B981"},children:(0,c.vv)(-Number(o.discount),a.currency)})]}),o.discountPolicy&&o.discountPolicy.amount&&Number(o.discountPolicy.amount)>0&&(0,x.jsxs)(v,{children:[(0,x.jsxs)(f,{children:["Discount (",o.discountPolicy.name,")"]}),(0,x.jsx)(j,{style:{color:"#10B981"},children:(0,c.vv)(-Number(o.discountPolicy.amount),a.currency)})]}),o.coupon&&o.coupon.discount&&Number(o.coupon.discount)>0&&(0,x.jsxs)(v,{children:[(0,x.jsxs)(f,{children:["Coupon (",o.coupon.code,")"]}),(0,x.jsx)(j,{style:{color:"#10B981"},children:(0,c.vv)(-Number(o.coupon.discount),a.currency)})]}),o.serviceCharge&&Number(o.serviceCharge)>0&&(0,x.jsxs)(v,{children:[(0,x.jsxs)(f,{children:["Service Charge (",o.serviceChargeRate||10,"%)"]}),(0,x.jsx)(j,{children:(0,c.vv)(Number(o.serviceCharge),a.currency)})]}),o.tax&&Number(o.tax)>0&&(0,x.jsxs)(v,{children:[(0,x.jsxs)(f,{children:["Tax (",o.taxRate||6,"%)"]}),(0,x.jsx)(j,{children:(0,c.vv)(Number(o.tax),a.currency)})]})]}),(0,x.jsxs)(d.i_,{style:{marginTop:0},children:[(0,x.jsx)(d.nJ,{children:"Total"}),(0,x.jsx)(d.aX,{children:(0,c.vv)(o.total,a.currency)})]})]}),(0,x.jsxs)(z,{id:"order-complete-bill-print",children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(I,{children:u.name}),(0,x.jsxs)("div",{style:{fontSize:"11px",marginTop:"5px"},children:[u.address,(0,x.jsx)("br",{}),"Tel: ",u.phone,(0,x.jsx)("br",{}),"GST Reg No: ",u.gstRegNo]})]}),(0,x.jsxs)(P,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,x.jsxs)(O,{children:[(0,x.jsx)("strong",{children:"Order No:"}),(0,x.jsx)("span",{children:o.orderNumber})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)("strong",{children:"Date:"}),(0,x.jsx)("span",{children:D(o.date)})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)("strong",{children:"Cashier:"}),(0,x.jsx)("span",{children:"POS Terminal"})]}),(0,x.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",o.pickupNumber||o.orderNumber.split("-")[1]||"000"]}),o.pagerNumber&&(0,x.jsxs)("div",{style:{fontSize:"16px",fontWeight:"bold",textAlign:"center",margin:"5px 0"},children:["PAGER #",o.pagerNumber]})]}),(0,x.jsx)(P,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,x.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,x.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,x.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,x.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,x.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,x.jsx)("tbody",{children:o.items.map((e,t)=>(0,x.jsx)(i.Fragment,{children:(0,x.jsxs)("tr",{children:[(0,x.jsxs)("td",{style:{padding:"5px 0"},children:[e.menuItem.name,e.options&&e.options.length>0&&(0,x.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:e.options.join(", ")})]}),(0,x.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,x.jsx)("td",{style:{textAlign:"right"},children:e.menuItem.price.toFixed(2)}),(0,x.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*e.menuItem.price).toFixed(2)})]})},t))})]})}),(0,x.jsxs)(P,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,x.jsxs)(O,{children:[(0,x.jsx)("span",{children:"Subtotal:"}),(0,x.jsx)("span",{children:(0,c.vv)(o.subtotal,a.currency)})]}),o.takeawayCharge&&Number(o.takeawayCharge)>0&&(0,x.jsxs)(O,{children:[(0,x.jsx)("span",{children:"Takeaway Charge:"}),(0,x.jsx)("span",{children:(0,c.vv)(Number(o.takeawayCharge),a.currency)})]}),o.discount&&Number(o.discount)>0&&(0,x.jsxs)(O,{children:[(0,x.jsx)("span",{children:"Discount:"}),(0,x.jsx)("span",{children:(0,c.vv)(-Number(o.discount),a.currency)})]}),o.discountPolicy&&o.discountPolicy.amount&&Number(o.discountPolicy.amount)>0&&(0,x.jsxs)(O,{children:[(0,x.jsxs)("span",{children:["Discount (",o.discountPolicy.name,"):"]}),(0,x.jsx)("span",{children:(0,c.vv)(-Number(o.discountPolicy.amount),a.currency)})]}),o.coupon&&o.coupon.discount&&Number(o.coupon.discount)>0&&(0,x.jsxs)(O,{children:[(0,x.jsxs)("span",{children:["Coupon (",o.coupon.code,"):"]}),(0,x.jsx)("span",{children:(0,c.vv)(-Number(o.coupon.discount),a.currency)})]}),o.serviceCharge&&Number(o.serviceCharge)>0&&(0,x.jsxs)(O,{children:[(0,x.jsxs)("span",{children:["Service Charge (",o.serviceChargeRate||10,"%):"]}),(0,x.jsx)("span",{children:(0,c.vv)(Number(o.serviceCharge),a.currency)})]}),o.tax&&Number(o.tax)>0&&(0,x.jsxs)(O,{children:[(0,x.jsxs)("span",{children:["Tax (",o.taxRate||6,"%):"]}),(0,x.jsx)("span",{children:(0,c.vv)(Number(o.tax),a.currency)})]}),(0,x.jsxs)(O,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,x.jsx)("span",{children:"TOTAL:"}),(0,x.jsx)("span",{children:(0,c.vv)(o.total,a.currency)})]})]}),(0,x.jsxs)(P,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,x.jsxs)(O,{children:[(0,x.jsx)("span",{children:"Payment Method:"}),(0,x.jsx)("span",{children:o.paymentMethod.toUpperCase()})]}),"cash"===o.paymentMethod&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)("span",{children:"Amount Received:"}),(0,x.jsx)("span",{children:(0,c.vv)(o.amountReceived,a.currency)})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)("span",{children:"Change:"}),(0,x.jsx)("span",{children:(0,c.vv)(o.change,a.currency)})]})]})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,x.jsx)("div",{children:"Thank you for your purchase!"}),(0,x.jsx)("div",{children:"Please keep this receipt for your records"})]})]})]})};var _=n(496);const R=e=>{let{isOpen:t,onClose:n,title:i,message:o,buttonText:r="OK"}=e;const s=(0,x.jsx)(l.yl,{onClick:n,style:{maxWidth:"200px",margin:"0 auto"},children:r});return(0,x.jsx)(l.aF,{isOpen:t,onClose:n,title:i,footer:s,children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,x.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.5"},children:o})})})};var M=n(3338),q=n(447),L=n(9037),U=n(5781),W=n(1367),G=n(2118);const Y=o.Ay.div`
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
`,xe=o.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`,ue=o.Ay.div`
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
`,ge=o.Ay.div`
  font-size: 10px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
  font-weight: 500;
`,me=o.Ay.div`
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
`,ze=o.Ay.div`
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
`,Ie=o.Ay.span`
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
`,$e=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,De=o.Ay.span`
  color: #6B7C93;
`,_e=o.Ay.span`
  font-weight: 500;
  color: #0A2540;
`,Re=(0,o.Ay)($e)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  
  ${De} {
    color: #0A2540;
  }
  
  ${_e} {
    color: #635BFF;
  }
`,Me=o.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,qe=o.Ay.button`
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
`,xt=o.Ay.div`
  position: relative;
  width: 140px;
`,ut=o.Ay.input`
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
`,gt=o.Ay.div`
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
`,mt=o.Ay.button`
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
`,bt=o.Ay.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  display: flex;
  gap: 12px;
`,yt=o.Ay.button`
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
`,vt=()=>{const e=(0,r.Zp)(),{user:t}=(0,W.As)(),n=(()=>{const{restaurantId:e}=(0,r.g)(),{user:t}=(0,W.As)();return e?parseInt(e,10):null!==t&&void 0!==t&&t.restaurantId?"number"===typeof t.restaurantId?t.restaurantId:parseInt(t.restaurantId,10):(console.warn("useRestaurantId: No restaurantId found in URL or user context, using default 1"),1)})(),{addOrder:o}=(0,q.h)(),{getTakeawayCharge:l,operationSettings:d}=(0,p.Pj)(),{categories:c,menuItems:h,getItemsByCategory:g}=(0,a.b)(),{updateCustomerOrderStats:m,searchCustomers:b}=(0,L.c)(),{currentStaff:y,isLoggedIn:v,logout:f,updateStaff:j}=(0,U.g)(),[F,C]=(0,i.useState)("all"),[w,k]=(0,i.useState)(""),[A,B]=(0,i.useState)([]),[S,E]=(0,i.useState)(new Date),[z,N]=(0,i.useState)(!1),[I,P]=(0,i.useState)(!1),[O,T]=(0,i.useState)(!1),[$,vt]=(0,i.useState)(null),[ft,jt]=(0,i.useState)(null),[Ft,Ct]=(0,i.useState)(0),[wt,kt]=(0,i.useState)(!1),[At,Bt]=(0,i.useState)(""),[St,Et]=(0,i.useState)(null),[zt,Nt]=(0,i.useState)(null),[It,Pt]=(0,i.useState)(!1),[Ot,Tt]=(0,i.useState)(!1),[$t,Dt]=(0,i.useState)(!1),[_t,Rt]=(0,i.useState)("dine-in"),[Mt,qt]=(0,i.useState)(""),[Lt,Ut]=(0,i.useState)([]),[Wt,Gt]=(0,i.useState)(""),[Yt,Ht]=(0,i.useState)(""),[Vt,Kt]=(0,i.useState)(!1),[Qt,Jt]=(0,i.useState)(!1),[Xt,Zt]=(0,i.useState)(!1),[en,tn]=(0,i.useState)(!1),[nn,on]=(0,i.useState)(""),[rn,sn]=(0,i.useState)(null),[an,ln]=(0,i.useState)(""),[dn,cn]=(0,i.useState)(!1),[pn,xn]=(0,i.useState)(null),[un,hn]=(0,i.useState)("RM"),[gn,mn]=(0,i.useState)(null),[bn,yn]=(0,i.useState)("cash_only");(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();t.brand_logo?on(t.brand_logo):t.brandLogo?on(t.brandLogo):t.logo&&on(t.logo)}}catch(e){console.error("Failed to load brand logo:",e)}};e();const t=()=>{e()};return window.addEventListener("brandLogoUpdated",t),()=>{window.removeEventListener("brandLogoUpdated",t)}},[]),(0,i.useEffect)(()=>{c.length>0&&"all"!==F&&!c.find(e=>e.id===F)&&C("all")},[c,F]),(0,i.useEffect)(()=>{const e=setInterval(()=>{E(new Date)},1e3);return()=>clearInterval(e)},[]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/restaurants/${t.restaurantId}`,{credentials:"include"});if(e.ok){const t=await e.json(),n=t.data||t;if(n.table_settings){const{enableTableNumbers:e,totalTables:t,tablePrefix:i}=n.table_settings;if(e){const e=[];for(let n=1;n<=t;n++)e.push(`${i}${String(n).padStart(3,"0")}`);Ut(e)}}}}catch(e){console.error("Failed to load table settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/restaurants/${t.restaurantId}`);if(e.ok){const t=await e.json(),n=t.data||t;n.payment_settings&&sn(n.payment_settings),hn(n.currency||"RM"),mn(n.cash_rounding?parseFloat(n.cash_rounding):null),yn(n.rounding_apply_to||"cash_only")}}catch(e){console.error("Failed to load payment settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]);const vn=(()=>{let e="all"===F?h:g(F);if(w.trim()){const t=w.toLowerCase().trim();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t))}const t=e.find(e=>e.code);return t&&console.log("\ud83d\udd0d POS Menu Item with code:",{id:t.id,code:t.code,name:t.name}),e})(),fn=(e,t)=>{B(A.map(n=>{if(n.id===e){const e=n.quantity+t;return e>0?{...n,quantity:e}:n}return n}).filter(e=>e.quantity>0))},jn=()=>{const e=d.pagerSystem.totalPagers,t=Yt.trim();return t?Array.from({length:e},(e,t)=>t+1).filter(e=>e.toString().startsWith(t)):Array.from({length:e},(e,t)=>t+1)},Fn=()=>{B([]),Ct(0),Et(null),Nt(null),Bt(""),xn(null),ln(""),Rt("dine-in"),qt(""),Gt(""),Ht(""),k(""),C("all"),Pt(!1),N(!1),P(!1),T(!1),vt(null),jt(null)},Cn=e=>{Ft===e?(Ct(0),Nt(null)):Ct(e)},wn=()=>{const e={SUMMER2025:{discount:"10%",status:"active"},NEWUSER:{discount:`${d.currency} 5`,status:"active"},SAVE10:{discount:"10%",status:"active"},SAVE20:{discount:"20%",status:"active"},WELCOME5:{discount:`${d.currency} 5`,status:"active"},LUNCH15:{discount:"15%",status:"active"}},t=At.toUpperCase(),n=e[t];if(n&&"active"===n.status){let e=0;if(n.discount.includes("%")){const t=parseFloat(n.discount.replace("%",""));e=An*(t/100)}else n.discount.includes(d.currency)&&(e=parseFloat(n.discount.replace(`${d.currency} `,"")));Et({code:t,discount:e}),Bt("")}else At&&Dt(!0)},kn=e=>{if(zt&&zt.name===e)return Nt(null),void Ct(0);const t={Staff:{discount:"20%",requiresApproval:!1,status:"active"},VIP:{discount:"15%",requiresApproval:!0,status:"active"}}[e];if(t&&"active"===t.status){const n=parseFloat(t.discount.replace("%","")),i=An*(n/100);if(t.requiresApproval){if("MANAGER123"!==prompt(`${e} requires manager approval. Enter manager code:`))return void alert("Invalid manager code. Discount not applied.");Nt({name:e,discount:i,requiresApproval:!0}),Ct(0)}else Nt({name:e,discount:i,requiresApproval:!1}),Ct(0)}},{subtotal:An,tax:Bn,total:Sn,discountAmount:En,couponDiscount:zn,policyDiscount:Nn,takeawayCharge:In,serviceCharge:Pn}=(()=>{const e=A.reduce((e,t)=>{let n=t.menuItem.price*t.quantity;if(t.selectedOptions&&t.selectedOptions.length>0){n+=t.selectedOptions.reduce((e,t)=>e+t.price,0)*t.quantity}return e+n},0);let t=0;if("takeaway"===_t&&d.takeawayPricing.enabled)if("per-item"===d.takeawayPricing.pricingType){const e=A.reduce((e,t)=>e+t.quantity,0);t=e*d.takeawayPricing.perItemCharge}else A.forEach(e=>{const n=l(e.menuItem.category);t+=n*e.quantity});const n=e+t,i=Ft,o=St?St.discount:0,r=zt?zt.discount:0,s=Math.max(0,n-i-o-r),a=d.serviceChargeEnabled?s*(d.serviceChargeRate/100):0,c=d.taxEnabled?s*(d.taxRate/100):0,p=s+a+c;let x=p;return"all"===bn&&gn&&(x=Math.round(p/gn)*gn),{subtotal:e,tax:c,total:x,discountAmount:i,couponDiscount:o,policyDiscount:r,takeawayCharge:t,serviceCharge:a}})(),On=(()=>{if(!an.trim())return[];return b(an).slice(0,10)})();return(0,x.jsxs)(Y,{children:[(0,x.jsxs)(H,{children:[(0,x.jsx)(V,{onClick:Fn,children:nn?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(K,{src:nn,alt:"Brand Logo"}),(0,x.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})]}):(0,x.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})}),(0,x.jsxs)(Q,{children:[(0,x.jsxs)(J,{clickable:!1,children:[(0,x.jsx)("span",{style:{fontSize:"16px"},children:"\u25c6"}),(0,x.jsx)("span",{children:v&&y?`Staff: ${y.name} (${y.role})`:(null===t||void 0===t?void 0:t.name)||"Staff"})]}),(0,x.jsx)(X,{children:(Tn=S,Tn.toLocaleString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",month:"short",day:"numeric",year:"numeric"}))})]})]}),(0,x.jsxs)(Z,{children:[(0,x.jsxs)(ee,{children:[(0,x.jsx)(te,{children:(0,x.jsxs)(ne,{children:[(0,x.jsx)(oe,{children:"\ud83d\udd0d"}),(0,x.jsx)(ie,{type:"text",placeholder:"Search menu items by name or description...",value:w,onChange:e=>k(e.target.value)}),w&&(0,x.jsx)(re,{onClick:()=>k(""),title:"Clear search",children:"\xd7"})]})}),(0,x.jsxs)(ae,{children:[(0,x.jsx)(le,{active:"all"===F,onClick:()=>C("all"),children:"All Items"},"all"),c.map(e=>(0,x.jsxs)(le,{active:F===e.id,onClick:()=>C(e.id),children:[e.emoji," ",e.name]},e.id))]}),(0,x.jsx)(de,{children:vn.length>0?vn.map(e=>{const t=e.optionGroups&&e.optionGroups.length>0;return(0,x.jsxs)(ce,{soldOut:e.soldOut,onClick:()=>(e=>{if(e.soldOut)return;let t=[];e.is_set_menu&&e.set_items&&e.set_items.length>0&&(t=e.set_items.map(e=>{const t=h.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}));const n=A.find(t=>t.menuItem.id===e.id&&(!t.options||0===t.options.length)&&!e.is_set_menu);n&&!e.is_set_menu?B(A.map(e=>e.id===n.id?{...e,quantity:e.quantity+1}:e)):B([...A,{id:`order-${Date.now()}`,menuItem:e,quantity:1,options:t.length>0?t:void 0}])})(e),children:[e.is_set_menu&&(0,x.jsx)(he,{children:"SET"}),(0,x.jsx)(pe,{hasImage:!!e.image,children:e.image?(0,x.jsx)("img",{src:e.image,alt:e.name,loading:"lazy"}):e.emoji}),(0,x.jsxs)(xe,{children:[e.code?`${e.code} `:"",e.name]}),(0,x.jsxs)(ue,{children:[un," ",e.price.toFixed(2)]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,x.jsx)(ge,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")}),t&&(0,x.jsx)(me,{children:(0,x.jsx)(be,{onClick:t=>((e,t)=>{t.stopPropagation(),e.soldOut||(jt(e),P(!0))})(e,t),disabled:e.soldOut,children:"Options"})})]},e.id)}):(0,x.jsxs)(se,{children:[(0,x.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,x.jsx)("div",{className:"title",children:w?`No results for "${w}"`:"No items in this category"}),(0,x.jsx)("div",{className:"message",children:w?"Try searching with different keywords":"Select a different category to view items"})]})})]}),(0,x.jsxs)(ye,{children:[(0,x.jsxs)(Je,{children:[(0,x.jsx)(Xe,{active:"dine-in"===_t,onClick:()=>Rt("dine-in"),children:"Dine In"}),(0,x.jsx)(Xe,{active:"takeaway"===_t,onClick:()=>Rt("takeaway"),children:"Takeaway"})]}),(0,x.jsx)(et,{children:pn?(0,x.jsxs)(lt,{children:[(0,x.jsxs)(dt,{children:[(0,x.jsx)(ct,{children:pn.name}),(0,x.jsxs)(pt,{children:[pn.phone&&`${pn.phone} \u2022 `,pn.id]})]}),(0,x.jsx)(mt,{onClick:()=>{xn(null),ln("")},children:"Clear"})]}):(0,x.jsxs)(tt,{children:[(0,x.jsx)(it,{children:"\ud83d\udd0d"}),(0,x.jsx)(nt,{type:"text",placeholder:"Walk-in Customer",value:an,onChange:e=>{const t=e.target.value;ln(t),cn(t.trim().length>0)},onFocus:()=>{an.trim()&&cn(!0)},onBlur:()=>setTimeout(()=>cn(!1),200)}),(0,x.jsx)(ot,{show:dn&&On.length>0,children:On.map(e=>(0,x.jsxs)(rt,{onClick:()=>(e=>{xn(e),ln(""),cn(!1)})(e),children:[(0,x.jsx)(st,{children:e.name}),(0,x.jsxs)(at,{children:[e.phone&&`${e.phone} \u2022 `,e.id]})]},e.id))}),(0,x.jsx)(ot,{show:dn&&an.trim().length>0&&0===On.length,children:(0,x.jsx)(rt,{style:{cursor:"default",color:"#6B7C93"},children:"No customers found"})})]})}),"dine-in"===_t&&Lt.length>0&&(0,x.jsxs)(ve,{children:[(0,x.jsx)(fe,{children:"Table Number:"}),(0,x.jsxs)(je,{value:Mt,onChange:e=>qt(e.target.value),children:[(0,x.jsx)("option",{value:"",children:"Free Seating"}),Lt.map(e=>(0,x.jsx)("option",{value:e,children:e},e))]})]}),0===A.length?(0,x.jsxs)(Le,{children:[(0,x.jsx)(Ue,{children:"No items in order"}),(0,x.jsx)(Ue,{style:{marginTop:"8px",fontSize:"12px"},children:"Select menu items to start"})]}):(0,x.jsxs)(Fe,{children:[(0,x.jsxs)(Ce,{children:[(0,x.jsxs)(we,{children:[A.length," ",1===A.length?"item":"items"]}),A.map(e=>(0,x.jsxs)(ke,{children:[(0,x.jsxs)(Ae,{children:[(0,x.jsxs)(Be,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),e.options&&e.options.length>0&&(()=>{const t=[],n=[];return e.options.forEach(e=>{/^.+\sx\d+$/.test(e)?t.push(e):n.push(e)}),(0,x.jsxs)(x.Fragment,{children:[t.length>0&&(0,x.jsx)(Se,{style:{fontWeight:600},children:t.join(", ")}),n.length>0&&(0,x.jsxs)(Se,{children:["\u2b50 ",n.join(", ")]})]})})()]}),(0,x.jsxs)(Ee,{children:[(0,x.jsxs)(ze,{children:[(0,x.jsx)(Ne,{onClick:()=>fn(e.id,-1),children:"-"}),(0,x.jsx)(Ie,{children:e.quantity}),(0,x.jsx)(Ne,{onClick:()=>fn(e.id,1),children:"+"})]}),(0,x.jsxs)(Pe,{children:[un," ",(()=>{let t=e.menuItem.price*e.quantity;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)*e.quantity}return t.toFixed(2)})()]}),(0,x.jsx)(Oe,{onClick:()=>{return t=e.id,void B(A.filter(e=>e.id!==t));var t},children:"\xd7"})]})]},e.id))]}),(0,x.jsxs)(Te,{children:[(0,x.jsxs)($e,{children:[(0,x.jsx)(De,{children:"Subtotal"}),(0,x.jsxs)(_e,{children:[un," ",An.toFixed(2)]})]}),In>0&&(0,x.jsxs)($e,{children:[(0,x.jsx)(De,{children:"Takeaway Charge"}),(0,x.jsxs)(_e,{children:[un," ",In.toFixed(2)]})]}),En>0&&(0,x.jsxs)($e,{children:[(0,x.jsx)(De,{children:"Discount"}),(0,x.jsxs)(_e,{style:{color:"#10B981"},children:["-",un," ",En.toFixed(2)]})]}),St&&(0,x.jsxs)($e,{children:[(0,x.jsxs)(De,{children:["Coupon (",St.code,")"]}),(0,x.jsxs)(_e,{style:{color:"#10B981"},children:["-",un," ",zn.toFixed(2)]})]}),zt&&(0,x.jsxs)($e,{children:[(0,x.jsxs)(De,{children:["Discount (",zt.name,")"]}),(0,x.jsxs)(_e,{style:{color:"#10B981"},children:["-",un," ",Nn.toFixed(2)]})]}),d.serviceChargeEnabled&&Pn>0&&(0,x.jsxs)($e,{children:[(0,x.jsxs)(De,{children:["Service Charge (",d.serviceChargeRate,"%)"]}),(0,x.jsxs)(_e,{children:[un," ",Pn.toFixed(2)]})]}),d.taxEnabled&&Bn>0&&(0,x.jsxs)($e,{children:[(0,x.jsxs)(De,{children:["Tax (",d.taxRate,"%)"]}),(0,x.jsxs)(_e,{children:[un," ",Bn.toFixed(2)]})]}),(0,x.jsxs)(Re,{children:[(0,x.jsx)(De,{children:"Total"}),(0,x.jsxs)(_e,{children:[un," ",Sn.toFixed(2)]})]})]}),(0,x.jsxs)(We,{children:[(0,x.jsx)(Ge,{children:St?(0,x.jsxs)(Qe,{children:[(0,x.jsxs)("span",{children:["Coupon: ",St.code," (-",un," ",St.discount.toFixed(2),")"]}),(0,x.jsx)(Ze,{onClick:()=>{Et(null)},children:"\xd7"})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(Ye,{type:"text",placeholder:"Enter coupon code",value:At,onChange:e=>Bt(e.target.value),onKeyDown:e=>"Enter"===e.key&&wn()}),(0,x.jsx)(He,{onClick:wn,disabled:!At,children:"Apply Coupon"})]})}),(0,x.jsx)(Ge,{children:(0,x.jsxs)(Ve,{children:[(0,x.jsxs)(Ke,{active:5===Ft,onClick:()=>Cn(5),children:[d.currency," 5"]}),(0,x.jsxs)(Ke,{active:10===Ft,onClick:()=>Cn(10),children:[d.currency," 10"]}),(0,x.jsxs)(Ke,{active:15===Ft,onClick:()=>Cn(15),children:[d.currency," 15"]}),(0,x.jsxs)(Ke,{onClick:()=>Jt(!0),children:["Custom ",d.currency]})]})}),(0,x.jsx)(Ge,{children:(0,x.jsxs)(Ve,{children:[(0,x.jsx)(Ke,{active:"Staff"===(null===zt||void 0===zt?void 0:zt.name),onClick:()=>kn("Staff"),children:"20%"}),(0,x.jsx)(Ke,{active:"VIP"===(null===zt||void 0===zt?void 0:zt.name),onClick:()=>kn("VIP"),children:"15%"}),(0,x.jsx)(Ke,{onClick:()=>Zt(!0),children:"Custom %"})]})})]})]}),d.pagerSystem.enabled&&A.length>0&&(0,x.jsxs)(ve,{children:[(0,x.jsx)(fe,{children:"Pager Number:"}),(0,x.jsxs)(xt,{children:[(0,x.jsx)(ut,{type:"text",value:Yt,onChange:e=>{const t=e.target.value;Ht(t),Gt(t),t.trim()?Kt(!0):Kt(!1)},onFocus:()=>{!Yt.trim()&&Wt||Kt(!0)},onBlur:()=>setTimeout(()=>Kt(!1),200),placeholder:Wt?`#${Wt}`:"Type or click..."}),(0,x.jsx)(ht,{show:Vt,children:jn().length>0?jn().map(e=>(0,x.jsxs)(gt,{onClick:()=>{return Gt((t=e).toString()),Ht(t.toString()),void Kt(!1);var t},children:["Pager #",e]},e)):(0,x.jsx)(gt,{style:{cursor:"default",color:"#6B7C93"},children:"No matching pagers"})})]})]}),(0,x.jsxs)(Me,{children:[(0,x.jsx)(qe,{variant:"danger",onClick:()=>{A.length>0&&Pt(!0)},children:"Clear"}),(0,x.jsx)(qe,{variant:"secondary",onClick:async()=>{if(console.log("\ud83d\udd35 handleAddOrder called"),0!==A.length)if(wt)console.warn("POS - Order already in progress, ignoring duplicate call");else{console.log("\ud83d\udfe2 Starting order creation, setting isProcessingPayment=true"),kt(!0);try{const t=new Date,i={date:t,items:A,subtotal:An,discount:En,discountPolicy:zt?{name:zt.name,amount:zt.discount}:void 0,coupon:St?{code:St.code,discount:St.discount}:null,takeawayCharge:In,serviceCharge:Pn,serviceChargeRate:d.serviceChargeRate,tax:Bn,taxRate:d.taxRate,total:Sn,paymentMethod:"Pending",amountReceived:0,change:0},r={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:pn?pn.name:(e="Walk-in Customer",e&&"Guest Customer"!==e&&"Mobile Guest"!==e?e:"Walk-in Customer"),phone:pn?pn.phone:"POS Terminal",email:pn&&pn.email||"",type:pn?"member":"guest",customerId:null===pn||void 0===pn?void 0:pn.id,loyaltyTier:null===pn||void 0===pn?void 0:pn.loyaltyTier,points:null===pn||void 0===pn?void 0:pn.points},items:A.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:An,tax:Bn,taxRate:d.taxRate,serviceCharge:Pn,serviceChargeRate:d.serviceChargeRate,discount:En,coupon:St?{code:St.code,amount:St.discount}:void 0,discountPolicy:zt?{name:zt.name,amount:zt.discount}:void 0,takeawayCharge:In,total:Sn,paymentMethod:"Pending",paymentStatus:"pending",orderType:_t,orderSource:"pos",tableNumber:"dine-in"===_t&&Mt?Mt:void 0,pagerNumber:Wt||void 0};console.log("\ud83d\udfe1 Calling addOrder with orderNumber:",r.orderNumber);const s=await o(r,n?Number(n):void 0);console.log("\ud83d\udfe2 addOrder completed, savedOrder:",s),vt({...i,orderNumber:(null===s||void 0===s?void 0:s.order_number)||(null===s||void 0===s?void 0:s.orderNumber)||r.orderNumber,pickupNumber:(null===s||void 0===s?void 0:s.pickupNumber)||(null!==s&&void 0!==s&&s.order_number?s.order_number.split("-")[1]:r.pickupNumber),pagerNumber:(null===s||void 0===s?void 0:s.pager_number)||Wt||void 0,takeawayCharge:(null===s||void 0===s?void 0:s.takeaway_charge)||(null===s||void 0===s?void 0:s.takeawayCharge)||i.takeawayCharge,subtotal:(null===s||void 0===s?void 0:s.subtotal)||i.subtotal,tax:(null===s||void 0===s?void 0:s.tax)||i.tax,serviceCharge:(null===s||void 0===s?void 0:s.service_charge)||(null===s||void 0===s?void 0:s.serviceCharge)||i.serviceCharge,discount:(null===s||void 0===s?void 0:s.discount)||i.discount,discountPolicy:i.discountPolicy,coupon:i.coupon,total:(null===s||void 0===s?void 0:s.total)||i.total}),T(!0),B([]),Ct(0),Et(null),Nt(null),Bt(""),qt(""),Gt(""),Ht(""),xn(null),ln(""),console.log("POS - Order added without payment:",null===s||void 0===s?void 0:s.orderNumber)}catch(t){console.error("POS - Error adding order:",t),alert("Failed to create order. Please try again.")}finally{kt(!1)}var e}},children:"Pay Later"}),(0,x.jsx)(qe,{variant:"primary",onClick:()=>{0!==A.length&&N(!0)},style:{flex:2},children:"Pay Now"})]})]})]}),(0,x.jsx)(bt,{children:(0,x.jsx)(yt,{onClick:()=>e("/pos/dashboard"),children:"\u2190 Back to Dashboard"})}),(0,x.jsx)(s.A,{isOpen:z,onClose:()=>N(!1),total:Sn,subtotal:An,tax:Bn,serviceCharge:Pn,takeawayCharge:In,discountAmount:En,couponDiscount:zn,onConfirmPayment:async(e,n,i)=>{if(wt)console.warn("POS - Payment already in progress, ignoring duplicate call");else{kt(!0),console.log("POS - Processing payment for method:",e);try{const r=new Date,s={date:r,items:A,subtotal:An,discount:En,discountPolicy:zt?{name:zt.name,amount:zt.discount}:void 0,coupon:St?{code:St.code,discount:St.discount}:null,takeawayCharge:In,serviceCharge:Pn,serviceChargeRate:d.serviceChargeRate,tax:Bn,taxRate:d.taxRate,total:Sn,paymentMethod:e,amountReceived:n||Sn,change:i||0},a={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:pn?pn.name:"Walk-in Customer",phone:pn?pn.phone:"POS Terminal",email:pn&&pn.email||"",type:pn?"member":"guest",customerId:null===pn||void 0===pn?void 0:pn.id,loyaltyTier:null===pn||void 0===pn?void 0:pn.loyaltyTier,points:null===pn||void 0===pn?void 0:pn.points},items:A.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:r.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:An,tax:Bn,taxRate:d.taxRate,serviceCharge:Pn,serviceChargeRate:d.serviceChargeRate,discount:En,coupon:St?{code:St.code,amount:St.discount}:void 0,discountPolicy:zt?{name:zt.name,amount:zt.discount}:void 0,takeawayCharge:In,total:Sn,paymentMethod:e,paymentStatus:"completed",orderType:_t,orderSource:"pos",tableNumber:"dine-in"===_t&&Mt?Mt:void 0,pagerNumber:Wt||void 0},l=await o(a,null!==t&&void 0!==t&&t.restaurantId?Number(t.restaurantId):void 0);if(pn&&m(pn.id,Sn),y){const e={...y.performance,ordersProcessed:y.performance.ordersProcessed+1};j(y.id,{totalSales:y.totalSales+Sn,totalShifts:y.totalShifts,performance:e})}vt({...s,orderNumber:(null===l||void 0===l?void 0:l.order_number)||(null===l||void 0===l?void 0:l.orderNumber)||"",pickupNumber:(null===l||void 0===l?void 0:l.pickupNumber)||(null!==l&&void 0!==l&&l.order_number?l.order_number.split("-")[1]:""),pagerNumber:(null===l||void 0===l?void 0:l.pager_number)||Wt||void 0,takeawayCharge:(null===l||void 0===l?void 0:l.takeaway_charge)||(null===l||void 0===l?void 0:l.takeawayCharge)||s.takeawayCharge,subtotal:(null===l||void 0===l?void 0:l.subtotal)||s.subtotal,tax:(null===l||void 0===l?void 0:l.tax)||s.tax,serviceCharge:(null===l||void 0===l?void 0:l.service_charge)||(null===l||void 0===l?void 0:l.serviceCharge)||s.serviceCharge,discount:(null===l||void 0===l?void 0:l.discount)||s.discount,discountPolicy:s.discountPolicy,coupon:s.coupon,total:(null===l||void 0===l?void 0:l.total)||s.total}),T(!0),N(!1),B([]),Ct(0),Et(null),Nt(null),Bt(""),qt(""),Gt(""),Ht(""),xn(null),ln(""),console.log("POS - Payment processing completed:",null===l||void 0===l?void 0:l.orderNumber)}catch(r){console.error("POS - Error processing payment:",r),alert("Failed to process payment. Please try again.")}finally{kt(!1)}}},paymentMethods:rn,taxRate:d.taxRate,serviceChargeRate:d.serviceChargeRate,taxEnabled:d.taxEnabled,serviceChargeEnabled:d.serviceChargeEnabled}),ft&&(0,x.jsx)(u,{isOpen:I,onClose:()=>{P(!1),jt(null)},menuItem:ft,onConfirm:(e,t,n)=>{if(!ft)return;let i=[...t];if(ft.is_set_menu&&ft.set_items&&ft.set_items.length>0){i=[...ft.set_items.map(e=>{const t=h.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}),...t]}const o=i.sort().join(","),r=A.find(e=>{var t;return e.menuItem.id===ft.id&&(null===(t=e.options)||void 0===t?void 0:t.sort().join(","))===o});B(r?A.map(t=>t.id===r.id?{...t,quantity:t.quantity+e}:t):[...A,{id:`order-${Date.now()}`,menuItem:ft,quantity:e,options:i.length>0?i:void 0,selectedOptions:n}]),P(!1),jt(null)}}),$&&(0,x.jsx)(D,{isOpen:O,onClose:()=>{Fn()},orderData:$,onPrintBill:()=>{}}),(0,x.jsx)(_.A,{isOpen:It,onClose:()=>Pt(!1),onConfirm:()=>{B([]),Ct(0),Et(null),Nt(null),Bt(""),xn(null),ln(""),Gt(""),Ht(""),Pt(!1)},title:"Clear Order",message:"Are you sure you want to clear all items from the order?",confirmText:"Clear Order",cancelText:"Cancel",variant:"warning"}),(0,x.jsx)(R,{isOpen:Ot,onClose:()=>Tt(!1),title:"Coming Soon",message:"This feature is coming soon",variant:"info"}),(0,x.jsx)(R,{isOpen:$t,onClose:()=>Dt(!1),title:"Invalid Coupon",message:"The coupon code you entered is not valid. Please check and try again.",variant:"error"}),(0,x.jsx)(M.A,{isOpen:Qt,onClose:()=>Jt(!1),onConfirm:e=>{const t=parseFloat(e);!isNaN(t)&&t>=0&&(Ct(t),Nt(null)),Jt(!1)},title:"Custom Discount Amount",label:"Enter discount amount:",placeholder:"25",min:0,suffix:" RM",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,x.jsx)(M.A,{isOpen:Xt,onClose:()=>Zt(!1),onConfirm:e=>{const t=parseFloat(e);if(!isNaN(t)&&t>=0&&t<=100){Nt({name:`${t}%`,discount:An*(t/100),requiresApproval:!1}),Ct(0)}Zt(!1)},title:"Custom Discount Percentage",label:"Enter discount percentage:",placeholder:"10",min:0,max:100,suffix:"%",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,x.jsx)(G.A,{}),(0,x.jsx)(_.A,{isOpen:en,onClose:()=>tn(!1),onConfirm:()=>{f(),tn(!1)},title:"Logout Confirmation",message:"Are you sure you want to logout from the POS system?",confirmText:"Logout",cancelText:"Cancel",variant:"warning"})]});var Tn}},2687:(e,t,n)=>{n.d(t,{$Q:()=>l,F8:()=>u,FA:()=>g,I1:()=>o,NM:()=>C,Oc:()=>c,PU:()=>p,Sb:()=>d,a:()=>a,aX:()=>y,bU:()=>F,ey:()=>h,hO:()=>f,i_:()=>m,iz:()=>j,jj:()=>x,kr:()=>v,nJ:()=>b,wn:()=>r,z6:()=>s});var i=n(4752);const o=i.Ay.span`
  color: #EF4444;
  margin-left: 4px;
`,r=i.Ay.div`
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
`,l=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,d=i.Ay.label`
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
`,x=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,u=i.Ay.div`
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
`,b=i.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,y=i.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`,v=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`,f=i.Ay.div`
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,j=i.Ay.div``,F=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,C=i.Ay.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`},2966:(e,t,n)=>{n.d(t,{A:()=>F});var i=n(9950),o=n(9610),r=n(2687),s=n(4752),a=n(6038),l=n(9018),d=n(4414);const c=s.Ay.div`
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
`,b=s.Ay.button`
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
`,v=s.Ay.div`
  font-size: 14px;
  color: #059669;
  margin-bottom: 4px;
`,f=s.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #047857;
`,j=(0,s.Ay)(p)`
  color: #10B981;
`,F=e=>{var t;let{isOpen:n,onClose:s,total:F,subtotal:C,tax:w,serviceCharge:k=0,takeawayCharge:A=0,discountAmount:B=0,couponDiscount:S=0,onConfirmPayment:E,paymentMethods:z,taxRate:N=6,serviceChargeRate:I=10,taxEnabled:P=!0,serviceChargeEnabled:O=!1}=e;const{operationSettings:T}=(0,l.Pj)(),$=(()=>{if(!z)return[{key:"cash",label:"Cash"},{key:"card",label:"Card"},{key:"ewallet",label:"E-Wallet"},{key:"bankTransfer",label:"Bank Transfer"}];const e=z._order,t=e&&Array.isArray(e)?e.filter(e=>"_order"!==e):["cash","card","ewallet","bankTransfer"],n=[];return t.forEach(e=>{const t=z[e];t&&t.enabled&&t.availableIn&&t.availableIn.includes("pos")&&n.push({key:e,label:t.label})}),n})(),[D,_]=(0,i.useState)((null===(t=$[0])||void 0===t?void 0:t.key)||"cash"),[R,M]=(0,i.useState)("");(0,i.useEffect)(()=>{$.length>0&&(D&&$.find(e=>e.key===D)||_($[0].key))},[$,D]);const q=()=>{const e=parseFloat(R)||0;return Math.max(0,e-F)},L=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o.yl,{variant:"secondary",onClick:s,children:"Cancel"}),(0,d.jsx)(o.yl,{variant:"primary",onClick:()=>{if("cash"===D){const e=parseFloat(R)||0;e>=F&&E(D,e,q())}else E(D)},disabled:!(()=>{if("cash"===D){return(parseFloat(R)||0)>=F}return!0})(),children:"Confirm Payment"})]});return(0,d.jsxs)(o.aF,{isOpen:n,onClose:s,title:"Payment",footer:L,children:[(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:"Subtotal"}),(0,d.jsx)(u,{children:(0,a.vv)(C,T.currency)})]}),A>0&&(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:"Takeaway Charge"}),(0,d.jsx)(u,{children:(0,a.vv)(A,T.currency)})]}),B>0&&(0,d.jsxs)(j,{children:[(0,d.jsx)(x,{children:"Discount"}),(0,d.jsx)(u,{children:(0,a.vv)(-B,T.currency)})]}),S>0&&(0,d.jsxs)(j,{children:[(0,d.jsx)(x,{children:"Coupon Discount"}),(0,d.jsx)(u,{children:(0,a.vv)(-S,T.currency)})]}),O&&k>0&&(0,d.jsxs)(p,{children:[(0,d.jsxs)(x,{children:["Service Charge (",I,"%)"]}),(0,d.jsx)(u,{children:(0,a.vv)(k,T.currency)})]}),P&&w>0&&(0,d.jsxs)(p,{children:[(0,d.jsxs)(x,{children:["Tax (",N,"%)"]}),(0,d.jsx)(u,{children:(0,a.vv)(w,T.currency)})]})]}),(0,d.jsxs)(r.i_,{children:[(0,d.jsx)(r.nJ,{children:"Total Amount"}),(0,d.jsx)(r.aX,{children:(0,a.vv)(F,T.currency)})]}),(0,d.jsxs)(r.wn,{children:[(0,d.jsx)(o.lR,{children:"Payment Method"}),(0,d.jsx)(r.z6,{children:$.map(e=>(0,d.jsx)(r.a,{selected:D===e.key,onClick:()=>_(e.key),children:(0,d.jsx)("div",{children:e.label})},e.key))})]}),"cash"===D&&(0,d.jsxs)(h,{children:[(0,d.jsx)(o.lR,{children:"Cash Amount"}),(0,d.jsx)(g,{type:"text",placeholder:"Enter amount received",value:R,onChange:e=>(e=>{const t=e.replace(/[^0-9.]/g,"");M(t)})(e.target.value),autoFocus:!0}),(0,d.jsx)(m,{children:[50,100,150,200].map(e=>(0,d.jsx)(b,{selected:R===e.toString(),onClick:()=>M(e.toString()),children:(0,a.vv)(e,T.currency)},e))}),parseFloat(R)>=F&&(0,d.jsxs)(y,{children:[(0,d.jsx)(v,{children:"Change"}),(0,d.jsx)(f,{children:(0,a.vv)(q(),T.currency)})]})]})]})}},3338:(e,t,n)=>{n.d(t,{A:()=>c});var i=n(9950),o=n(9610),r=n(4752),s=n(4414);const a=r.Ay.input`
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
`,c=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:c,label:p,placeholder:x="",min:u=0,max:h,step:g=1,suffix:m="",confirmText:b="Apply",cancelText:y="Cancel"}=e;const[v,f]=(0,i.useState)(""),[j,F]=(0,i.useState)(""),C=()=>{const e=parseFloat(v);!isNaN(e)&&e>=u&&(void 0===h||e<=h)&&(r(v),f(""),F(""),n())},w=()=>{f(""),F(""),n()},k=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.yl,{variant:"secondary",onClick:w,children:y}),(0,s.jsx)(o.yl,{variant:"primary",onClick:C,disabled:!v||!!j||parseFloat(v)<u,children:b})]});return(0,s.jsx)(o.aF,{isOpen:t,onClose:w,title:c,footer:k,children:(0,s.jsxs)("div",{children:[(0,s.jsx)(o.lR,{children:p}),(0,s.jsx)(a,{type:"text",value:v,onChange:e=>{const t=e.target.value;if(""===t)return f(""),void F("");if(!/^\d*\.?\d*$/.test(t))return;const n=parseFloat(t);isNaN(n)||F(n<u?`Minimum value is ${u}${m}`:void 0!==h&&n>h?`Maximum value is ${h}${m}`:""),f(t)},placeholder:x,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!j&&v&&C()}}),j&&(0,s.jsx)(l,{children:j}),!j&&void 0!==h&&(0,s.jsxs)(d,{children:["Enter a value between ",u,m," and ",h,m]})]})})}},8406:(e,t,n)=>{n.d(t,{MQ:()=>s,fU:()=>r,ng:()=>i,r6:()=>o});const i=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",o=(e,t,n)=>{if(!e)return"";const o=new Date(e);if(isNaN(o.getTime()))return"";const r={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:i(t)};return o.toLocaleString("en-MY",{...r,...n})},r=(e,t)=>o(e,t,{year:void 0,month:void 0,day:void 0}),s=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const n=Date.now()-t,i=Math.floor(n/6e4),o=Math.floor(n/36e5),r=Math.floor(n/864e5);return i<1?"just now":1===i?"1 min ago":i<60?`${i} mins ago`:1===o?"1 hour ago":o<24?`${o} hours ago`:1===r?"1 day ago":`${r} days ago`}}}]);