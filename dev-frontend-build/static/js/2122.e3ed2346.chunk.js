"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2122],{1472:(e,t,n)=>{n.d(t,{A:()=>r});n(9950);var i=n(9610),o=n(4414);const r=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:s,message:a,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.yl,{variant:"secondary",onClick:n,children:d}),(0,o.jsx)(i.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:r,children:l})]});return(0,o.jsx)(i.aF,{isOpen:t,onClose:n,title:s,footer:p,children:(0,o.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,o.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:a})]})})}},2122:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Et});var i=n(9950),o=n(4752),r=n(4492),s=n(2966),a=n(9189),l=n(9610),d=n(2159),c=n(9018),p=n(5863),u=n(8406),x=n(6038),h=n(4414);const m=o.DU`
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
`,N=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,z=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,I=o.Ay.div`
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
`,$=e=>{var t,n,o,r;let{isOpen:s,onClose:a,orderData:$,onPrintBill:O}=e;const{getStoreInfo:D,operationSettings:R}=(0,c.Pj)(),L=D(),q=e=>(0,u.r6)(e,R),M=async()=>{await(0,p.pG)($,L)&&setTimeout(()=>{O()},100)},U=async()=>{await(0,p.Si)($,L)},W=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:M,children:"Print Bill"}),(0,h.jsx)(l.yl,{variant:"secondary",onClick:U,children:"Print Order Ticket"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:a,children:"Close"})]}),Y=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(T,{onClick:M,title:"Print Bill",children:[(0,h.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,h.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,h.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,h.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),(0,h.jsx)("span",{children:"Bill"})]}),(0,h.jsxs)(T,{onClick:U,title:"Print Order Ticket",children:[(0,h.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,h.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),(0,h.jsx)("span",{children:"Ticket"})]})]});return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(m,{}),(0,h.jsxs)(l.aF,{isOpen:s,onClose:a,title:"Order Complete!",footer:W,headerActions:Y,children:[(0,h.jsxs)("div",{style:{textAlign:"center"},children:[(0,h.jsxs)(g,{children:["Order ",$.orderNumber]}),$.pagerNumber?(0,h.jsxs)("div",{style:{background:"#10B981",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pager Number"}),(0,h.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:$.pagerNumber})]}):(0,h.jsxs)("div",{style:{background:"#635BFF",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pickup Number"}),(0,h.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:$.pickupNumber||(null!==(t=$.orderNumber)&&void 0!==t&&t.includes("-")?$.orderNumber.split("-")[1]:$.orderNumber)||"-"})]})]}),(0,h.jsxs)(b,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Date & Time"}),(0,h.jsx)(f,{children:q($.date)})]}),$.cashierName&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Cashier"}),(0,h.jsx)(f,{children:$.cashierName})]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Payment Method"}),(0,h.jsx)(f,{children:$.paymentMethod})]}),"cash"===$.paymentMethod&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Amount Received"}),(0,h.jsx)(f,{children:(0,x.vv)($.amountReceived,R.currency)})]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Change"}),(0,h.jsx)(f,{children:(0,x.vv)($.change,R.currency)})]})]})]}),(0,h.jsxs)(d.wn,{children:[(0,h.jsx)(S,{children:"Order Items"}),(0,h.jsx)(j,{children:$.items.map((e,t)=>(0,h.jsxs)(F,{children:[(0,h.jsxs)(C,{children:[(0,h.jsx)(w,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,h.jsx)(k,{children:e.options.join(", ")})]}),(0,h.jsxs)(A,{children:[e.quantity,"x"]}),(0,h.jsx)(B,{children:(0,x.vv)(e.menuItem.price*e.quantity,R.currency)})]},t))})]}),(0,h.jsxs)(d.wn,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Subtotal"}),(0,h.jsx)(f,{children:(0,x.vv)($.subtotal,R.currency)})]}),Number($.takeawayCharge)>0&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Takeaway Charge"}),(0,h.jsx)(f,{children:(0,x.vv)(Number($.takeawayCharge),R.currency)})]}),Number($.discount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Discount"}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.discount),R.currency)})]}),$.discountPolicy&&Number($.discountPolicy.amount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Discount (",$.discountPolicy.name,")"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.discountPolicy.amount),R.currency)})]}),$.coupon&&Number($.coupon.discount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Coupon (",$.coupon.code,")"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.coupon.discount),R.currency)})]}),Number($.pointDiscount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Points (",null===(n=$.pointsUsed)||void 0===n?void 0:n.toLocaleString()," pts)"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.pointDiscount),R.currency)})]}),Number($.serviceCharge)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Service Charge (",$.serviceChargeRate||10,"%)"]}),(0,h.jsx)(f,{children:(0,x.vv)(Number($.serviceCharge),R.currency)})]}),Number($.tax)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Tax (",$.taxRate||6,"%)"]}),(0,h.jsx)(f,{children:(0,x.vv)(Number($.tax),R.currency)})]})]}),(0,h.jsxs)(d.i_,{style:{marginTop:0},children:[(0,h.jsx)(d.nJ,{children:"Total"}),(0,h.jsx)(d.aX,{children:(0,x.vv)($.total,R.currency)})]})]}),(0,h.jsxs)(E,{id:"order-complete-bill-print",children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(z,{children:L.name}),(0,h.jsxs)("div",{style:{fontSize:"11px",marginTop:"5px"},children:[L.address,(0,h.jsx)("br",{}),"Tel: ",L.phone,(0,h.jsx)("br",{}),"GST Reg No: ",L.gstRegNo]})]}),(0,h.jsxs)(I,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Order No:"}),(0,h.jsx)("span",{children:$.orderNumber})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Date:"}),(0,h.jsx)("span",{children:q($.date)})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Cashier:"}),(0,h.jsx)("span",{children:$.cashierName||"POS Terminal"})]}),(0,h.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",$.pickupNumber||(null!==(o=$.orderNumber)&&void 0!==o&&o.includes("-")?$.orderNumber.split("-")[1]:$.orderNumber)||"-"]}),$.pagerNumber&&(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"bold",textAlign:"center",margin:"5px 0"},children:["PAGER #",$.pagerNumber]})]}),(0,h.jsx)(I,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,h.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,h.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,h.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,h.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,h.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,h.jsx)("tbody",{children:$.items.map((e,t)=>(0,h.jsx)(i.Fragment,{children:(0,h.jsxs)("tr",{children:[(0,h.jsxs)("td",{style:{padding:"5px 0"},children:[e.menuItem.name,e.options&&e.options.length>0&&(0,h.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:e.options.join(", ")})]}),(0,h.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,h.jsx)("td",{style:{textAlign:"right"},children:e.menuItem.price.toFixed(2)}),(0,h.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*e.menuItem.price).toFixed(2)})]})},t))})]})}),(0,h.jsxs)(I,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Subtotal:"}),(0,h.jsx)("span",{children:(0,x.vv)($.subtotal,R.currency)})]}),Number($.takeawayCharge)>0&&(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Takeaway Charge:"}),(0,h.jsx)("span",{children:(0,x.vv)(Number($.takeawayCharge),R.currency)})]}),Number($.discount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Discount:"}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.discount),R.currency)})]}),$.discountPolicy&&Number($.discountPolicy.amount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Discount (",$.discountPolicy.name,"):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.discountPolicy.amount),R.currency)})]}),$.coupon&&Number($.coupon.discount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Coupon (",$.coupon.code,"):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.coupon.discount),R.currency)})]}),Number($.pointDiscount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Points (",null===(r=$.pointsUsed)||void 0===r?void 0:r.toLocaleString()," pts):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.pointDiscount),R.currency)})]}),Number($.serviceCharge)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Service Charge (",$.serviceChargeRate||10,"%):"]}),(0,h.jsx)("span",{children:(0,x.vv)(Number($.serviceCharge),R.currency)})]}),Number($.tax)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Tax (",$.taxRate||6,"%):"]}),(0,h.jsx)("span",{children:(0,x.vv)(Number($.tax),R.currency)})]}),(0,h.jsxs)(_,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,h.jsx)("span",{children:"TOTAL:"}),(0,h.jsx)("span",{children:(0,x.vv)($.total,R.currency)})]})]}),(0,h.jsxs)(I,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Payment Method:"}),(0,h.jsx)("span",{children:$.paymentMethod.toUpperCase()})]}),"cash"===$.paymentMethod&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Amount Received:"}),(0,h.jsx)("span",{children:(0,x.vv)($.amountReceived,R.currency)})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Change:"}),(0,h.jsx)("span",{children:(0,x.vv)($.change,R.currency)})]})]})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,h.jsx)("div",{children:"Thank you for your purchase!"}),(0,h.jsx)("div",{children:"Please keep this receipt for your records"})]})]})]})},O=o.Ay.div`
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
`,D=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 360px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`,R=o.Ay.h2`
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
`,q=o.Ay.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`,M=o.Ay.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${e=>e.error?"#DC2626":e.filled?"#635BFF":"#E6EBF1"};
  background: ${e=>e.error?"#DC2626":e.filled?"#635BFF":"transparent"};
  transition: all 0.15s;
`,U=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
`,W=o.Ay.button`
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
`,Y=o.Ay.div`
  text-align: center;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  min-height: 20px;
`,G=o.Ay.button`
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
`,H=o.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 20px;
`,V=e=>{let{show:t,onClose:n,onVerified:o,onLogout:r,currentCashierName:s}=e;const[a,l]=(0,i.useState)(""),[d,c]=(0,i.useState)(""),[p,u]=(0,i.useState)(!1);(0,i.useEffect)(()=>{t&&(l(""),c(""))},[t]);const x=(0,i.useCallback)(async e=>{u(!0),c("");try{const t=localStorage.getItem("auth_token"),n=await fetch("/api/staff/verify-pin",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({pin_code:e})}),i=await n.json();i.success&&i.token&&i.user?o({data:i.data,token:i.token,user:i.user}):i.success?o({data:i.data,token:"",user:i.data}):(c("Invalid PIN. Please try again."),l(""))}catch{c("Connection error. Please try again."),l("")}finally{u(!1)}},[o]),m=(0,i.useCallback)(e=>{if(p)return;if("backspace"===e)return l(e=>e.slice(0,-1)),void c("");if(a.length>=4)return;const t=a+e;l(t),c(""),4===t.length&&x(t)},[a,p,x]);return(0,i.useEffect)(()=>{if(!t)return;const e=e=>{e.key>="0"&&e.key<="9"?m(e.key):"Backspace"===e.key?m("backspace"):"Escape"===e.key&&n()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[t,m,n]),t?(0,h.jsx)(O,{show:t,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,h.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,h.jsx)(R,{children:"Switch Cashier"}),(0,h.jsx)(L,{children:"Enter 4-digit PIN to switch"}),s&&(0,h.jsxs)(H,{children:["Current: ",s]}),(0,h.jsx)(q,{children:[0,1,2,3].map(e=>(0,h.jsx)(M,{filled:a.length>e,error:!!d},e))}),(0,h.jsx)(Y,{children:d}),(0,h.jsxs)(U,{children:[["1","2","3","4","5","6","7","8","9"].map(e=>(0,h.jsx)(W,{onClick:()=>m(e),children:e},e)),(0,h.jsx)(W,{variant:"action",onClick:()=>m("backspace"),children:"\u232b"}),(0,h.jsx)(W,{onClick:()=>m("0"),children:"0"}),(0,h.jsx)(W,{variant:"action",onClick:n,children:"Close"})]}),r&&(0,h.jsx)(G,{onClick:r,children:"Logout"})]})}):null};var K=n(1472);const J=e=>{let{isOpen:t,onClose:n,title:i,message:o,buttonText:r="OK"}=e;const s=(0,h.jsx)(l.yl,{onClick:n,style:{maxWidth:"200px",margin:"0 auto"},children:r});return(0,h.jsx)(l.aF,{isOpen:t,onClose:n,title:i,footer:s,children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,h.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.5"},children:o})})})};var Q=n(2538),X=n(447),Z=n(8930),ee=n(9037),te=n(5781),ne=n(1367),ie=n(2420);const oe=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
`,re=o.Ay.div`
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
`,se=o.Ay.div`
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
`,ae=o.Ay.img`
  max-width: 180px;
  max-height: 40px;
  object-fit: contain;
`,le=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: #0A2540;
`,de=o.Ay.div`
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
`,ce=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
  font-variant-numeric: tabular-nums;
  min-width: 200px;
  text-align: right;
  white-space: nowrap;
`,pe=o.Ay.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`,ue=o.Ay.div`
  flex: 1;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,xe=o.Ay.div`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,he=o.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,me=o.Ay.input`
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
`,ge=o.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,be=o.Ay.button`
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
`,ve=o.Ay.div`
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
`,ye=o.Ay.div`
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
`,fe=o.Ay.button`
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
`,je=o.Ay.div`
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
`,Fe=o.Ay.div`
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
`,Ce=o.Ay.div`
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
`,we=o.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`,ke=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,Ae=o.Ay.div`
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
`,Be=o.Ay.div`
  font-size: 10px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
  font-weight: 500;
`,Se=o.Ay.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`,Ee=o.Ay.button`
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
`,Ne=o.Ay.div`
  width: 400px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
`,ze=o.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,Ie=o.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`,_e=o.Ay.select`
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
`,Pe=o.Ay.div`
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
`,Te=o.Ay.div`
  padding: 16px 24px;
`,$e=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,Oe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`,De=o.Ay.div`
  flex: 1;
`,Re=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Le=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,qe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Me=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ue=o.Ay.button`
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
`,We=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,Ye=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,Ge=o.Ay.button`
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
`,He=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,Ve=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Ke=o.Ay.span`
  color: #6B7C93;
`,Je=o.Ay.span`
  font-weight: 500;
  color: #0A2540;
`,Qe=(0,o.Ay)(Ve)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  
  ${Ke} {
    color: #0A2540;
  }
  
  ${Je} {
    color: #635BFF;
  }
`,Xe=o.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,Ze=o.Ay.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          \n          &:hover {\n            background: #5243E0;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          \n          &:active {\n            transform: translateY(0);\n          }\n        ";case"danger":return"\n          background: #FFE6E6;\n          color: #FF6B6B;\n          \n          &:hover {\n            background: #FFD9D9;\n          }\n        ";default:return"\n          background: white;\n          color: #6B7C93;\n          border: 1px solid #E6EBF1;\n          \n          &:hover {\n            border-color: #C7D2FE;\n            color: #635BFF;\n          }\n        "}}}
`,et=o.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  padding: 40px;
  text-align: center;
`,tt=o.Ay.div`
  font-size: 14px;
`,nt=o.Ay.div`
  padding: 16px 24px;
  background: #FAFBFC;
  border-top: 1px solid #E6EBF1;
`,it=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,ot=o.Ay.input`
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
`,rt=o.Ay.button`
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
`,st=o.Ay.div`
  display: flex;
  gap: 8px;
`,at=o.Ay.button`
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
`,lt=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 6px;
  font-size: 13px;
  color: #635BFF;
`,dt=o.Ay.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,ct=o.Ay.button`
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
`,pt=o.Ay.button`
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;

  &:hover {
    color: #FF5252;
  }
`,ut=o.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,xt=o.Ay.div`
  position: relative;
`,ht=o.Ay.input`
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
`,mt=o.Ay.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8898AA;
  font-size: 14px;
  pointer-events: none;
`,gt=o.Ay.div`
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
`,bt=o.Ay.div`
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
`,vt=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 14px;
`,yt=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,ft=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  margin-top: 8px;
`,jt=o.Ay.div`
  flex: 1;
`,Ft=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 2px;
`,Ct=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,wt=o.Ay.div`
  position: relative;
  width: 140px;
`,kt=o.Ay.input`
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
`,At=o.Ay.div`
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
`,Bt=o.Ay.div`
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
`,St=o.Ay.button`
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
`,Et=(o.Ay.div`
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
`,()=>{const e=(0,r.Zp)(),{user:t,switchUser:n,logout:o}=(0,ne.As)(),l=(()=>{const{restaurantId:e}=(0,r.g)(),{user:t}=(0,ne.As)();return e?parseInt(e,10):null!==t&&void 0!==t&&t.restaurantId?"number"===typeof t.restaurantId?t.restaurantId:parseInt(t.restaurantId,10):(console.warn("useRestaurantId: No restaurantId found in URL or user context, using default 1"),1)})(),{addOrder:d}=(0,X.h)(),{getTakeawayCharge:p,operationSettings:u}=(0,c.Pj)(),{categories:m,menuItems:g,getItemsByCategory:b,loadMenuByCategory:v,isLoadingMenu:y}=(0,Z.b)(),f=m.filter(e=>!1!==e.isActive),{updateCustomerOrderStats:j,searchCustomers:F}=(0,ee.c)(),{currentStaff:C,isLoggedIn:w,logout:k,updateStaff:A}=(0,te.g)(),[B,S]=(0,i.useState)(null),[E,N]=(0,i.useState)(null),[z,I]=(0,i.useState)(""),[_,P]=(0,i.useState)(!1),[T,O]=(0,i.useState)([]),[D,R]=(0,i.useState)(new Date),[L,q]=(0,i.useState)(!1),[M,U]=(0,i.useState)(!1),[W,Y]=(0,i.useState)(!1),[G,H]=(0,i.useState)(null),[Et,Nt]=(0,i.useState)(null),[zt,It]=(0,i.useState)(0),[_t,Pt]=(0,i.useState)(!1),[Tt,$t]=(0,i.useState)(""),[Ot,Dt]=(0,i.useState)(null),[Rt,Lt]=(0,i.useState)(null),[qt,Mt]=(0,i.useState)(!1),[Ut,Wt]=(0,i.useState)(!1),[Yt,Gt]=(0,i.useState)(!1),[Ht,Vt]=(0,i.useState)("dine-in"),[Kt,Jt]=(0,i.useState)(""),[Qt,Xt]=(0,i.useState)([]),[Zt,en]=(0,i.useState)(""),[tn,nn]=(0,i.useState)(""),[on,rn]=(0,i.useState)(!1),[sn,an]=(0,i.useState)(!1),[ln,dn]=(0,i.useState)(!1),[cn,pn]=(0,i.useState)(!1),[un,xn]=(0,i.useState)(""),[hn,mn]=(0,i.useState)(null),[gn,bn]=(0,i.useState)(""),[vn,yn]=(0,i.useState)(!1),[fn,jn]=(0,i.useState)(null),[Fn,Cn]=(0,i.useState)([]),[wn,kn]=(0,i.useState)(!1),An=(0,i.useRef)(null),[Bn,Sn]=(0,i.useState)("RM"),[En,Nn]=(0,i.useState)(null),[zn,In]=(0,i.useState)("cash_only"),[_n,Pn]=(0,i.useState)(null),[Tn,$n]=(0,i.useState)(0),[On,Dn]=(0,i.useState)("Bronze"),[Rn,Ln]=(0,i.useState)(40),qn=(0,i.useRef)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();t.brand_logo?xn(t.brand_logo):t.brandLogo?xn(t.brandLogo):t.logo&&xn(t.logo)}}catch(e){console.error("Failed to load brand logo:",e)}};e();const t=()=>{e()};return window.addEventListener("brandLogoUpdated",t),()=>{window.removeEventListener("brandLogoUpdated",t)}},[]),(0,i.useEffect)(()=>{if(f.length>0&&null===B){const e=f[0].id;S(e),v(e)}},[f,B,v]);(0,i.useEffect)(()=>{var e;f.length>0&&B&&!_&&!f.find(e=>e.id===B)&&S((null===(e=f[0])||void 0===e?void 0:e.id)||null)},[f,B,_]),(0,i.useEffect)(()=>{const e=setInterval(()=>{R(new Date)},1e3);return()=>clearInterval(e)},[]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/restaurants/${t.restaurantId}`,{credentials:"include"});if(e.ok){const t=await e.json(),n=t.data||t;if(n.table_settings){const{enableTableNumbers:e,totalTables:t,tablePrefix:i}=n.table_settings;if(e){const e=[];for(let n=1;n<=t;n++)e.push(`${i}${String(n).padStart(3,"0")}`);Xt(e)}}}}catch(e){console.error("Failed to load table settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/restaurants/${t.restaurantId}`);if(e.ok){const t=await e.json(),n=t.data||t;n.payment_settings&&mn(n.payment_settings),Sn(n.currency||"RM"),Nn(n.cash_rounding?parseFloat(n.cash_rounding):null),In(n.rounding_apply_to||"cash_only")}}catch(e){console.error("Failed to load payment settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/membership/settings/${t.restaurantId}`);if(e.ok){const t=await e.json();t.success&&t.data&&(Pn(t.data),console.log("\u2705 Membership settings loaded for POS:",t.data))}}catch(e){console.error("Failed to load membership settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId&&null!==fn&&void 0!==fn&&fn.id)try{const e=await fetch(`/api/membership/customer/${t.restaurantId}/${fn.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&($n(t.data.points||0),Dn(t.data.loyalty_tier||"Bronze"),console.log("\u2705 Customer points loaded:",t.data.points,"Tier:",t.data.loyalty_tier))}}catch(e){console.error("Failed to load customer points:",e)}else $n(0),Dn("Bronze")})()},[null===t||void 0===t?void 0:t.restaurantId,null===fn||void 0===fn?void 0:fn.id]);const Mn=(()=>{let e=[];if(_){const t=z.toLowerCase().trim();e=g.filter(e=>e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t))}else B&&(e=b(B));return e})(),Un=Mn.length>50;(0,i.useEffect)(()=>{Ln(40)},[B,z]),(0,i.useEffect)(()=>{if(!Un)return;const e=qn.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&Ln(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[Un,Rn,Mn.length]);const Wn=(e,t)=>{O(T.map(n=>{if(n.id===e){const e=n.quantity+t;return e>0?{...n,quantity:e}:n}return n}).filter(e=>e.quantity>0))},Yn=()=>{const e=u.pagerSystem.totalPagers,t=tn.trim();return t?Array.from({length:e},(e,t)=>t+1).filter(e=>e.toString().startsWith(t)):Array.from({length:e},(e,t)=>t+1)},Gn=()=>{O([]),It(0),Dt(null),Lt(null),$t(""),jn(null),bn(""),Vt("dine-in"),Jt(""),en(""),nn(""),I(""),S("all"),Mt(!1),q(!1),U(!1),Y(!1),H(null),Nt(null)},Hn=e=>{zt===e?(It(0),Lt(null)):It(e)},Vn=async()=>{if(Tt)try{const e=await fetch("/api/coupons/validate",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({code:Tt.toUpperCase(),restaurant_id:null===t||void 0===t?void 0:t.restaurantId,order_amount:Jn,order_type:Ht})});if(!e.ok)return void Gt(!0);const n=await e.json();n.valid&&n.data?(Dt({code:Tt.toUpperCase(),discount:n.data.discountAmount}),$t("")):Gt(!0)}catch(e){console.error("Coupon validation error:",e),Gt(!0)}},Kn=e=>{if(Rt&&Rt.name===e)return Lt(null),void It(0);const t={Staff:{discount:"20%",requiresApproval:!1,status:"active"},VIP:{discount:"15%",requiresApproval:!0,status:"active"}}[e];if(t&&"active"===t.status){const n=parseFloat(t.discount.replace("%","")),i=Jn*(n/100);if(t.requiresApproval){if("MANAGER123"!==prompt(`${e} requires manager approval. Enter manager code:`))return void alert("Invalid manager code. Discount not applied.");Lt({name:e,discount:i,requiresApproval:!0}),It(0)}else Lt({name:e,discount:i,requiresApproval:!1}),It(0)}},{subtotal:Jn,tax:Qn,total:Xn,discountAmount:Zn,couponDiscount:ei,policyDiscount:ti,takeawayCharge:ni,serviceCharge:ii}=(()=>{const e=T.reduce((e,t)=>{let n=t.menuItem.price*t.quantity;if(t.selectedOptions&&t.selectedOptions.length>0){n+=t.selectedOptions.reduce((e,t)=>e+t.price,0)*t.quantity}return e+n},0);let t=0;if("takeaway"===Ht&&u.takeawayPricing.enabled)if("per-item"===u.takeawayPricing.pricingType){const e=T.reduce((e,t)=>e+t.quantity,0);t=e*u.takeawayPricing.perItemCharge}else T.forEach(e=>{const n=p(e.menuItem.category);t+=n*e.quantity});const n=e+t,i=zt,o=Ot?Ot.discount:0,r=Rt?Rt.discount:0,s=Math.max(0,n-i-o-r),a=u.serviceChargeEnabled?s*(u.serviceChargeRate/100):0,l=u.taxEnabled?s*(u.taxRate/100):0,d=s+a+l;let c=d;return"all"===zn&&En&&(c=Math.round(d/En)*En),{subtotal:e,tax:l,total:c,discountAmount:i,couponDiscount:o,policyDiscount:r,takeawayCharge:t,serviceCharge:a}})(),oi=(()=>{if(!gn.trim())return[];if(Fn.length>0)return Fn;return F(gn).slice(0,10)})();return(0,h.jsxs)(oe,{children:[(0,h.jsxs)(re,{children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[(0,h.jsx)(se,{onClick:Gn,children:un?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(ae,{src:un,alt:"Brand Logo"}),(0,h.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})]}):(0,h.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})}),(0,h.jsx)("button",{onClick:()=>e(`/restaurant/${l}/dashboard`),style:{background:"none",border:"1px solid #E6EBF1",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",color:"#6B7C93",fontSize:"13px",display:"flex",alignItems:"center",gap:"4px"},children:"\u2190 Dashboard"})]}),(0,h.jsxs)(le,{children:[(0,h.jsxs)(de,{clickable:!0,onClick:()=>dn(!0),title:"Click to switch cashier",children:[(0,h.jsx)("span",{style:{fontSize:"16px"},children:"\u25c6"}),(0,h.jsxs)("span",{children:["Cashier: ",(null===t||void 0===t?void 0:t.name)||"Staff"]}),(0,h.jsx)("span",{style:{fontSize:"11px",color:"#8898AA",marginLeft:"4px"},children:"\u25bc"})]}),(0,h.jsx)(ce,{children:(e=>{const t=e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return`${e.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})}  ${t}`})(D)})]})]}),(0,h.jsxs)(pe,{children:[(0,h.jsxs)(ue,{children:[(0,h.jsx)(xe,{children:(0,h.jsxs)(he,{children:[(0,h.jsx)(ge,{children:"\ud83d\udd0d"}),(0,h.jsx)(me,{type:"text",placeholder:"Search menu items...",value:z,onChange:e=>(e=>{if(I(e),e.trim())_||(N(B),P(!0),S(null),v("all"));else if(_){var t;P(!1);const e=E||(null===(t=f[0])||void 0===t?void 0:t.id)||null;S(e),N(null)}})(e.target.value)}),z&&(0,h.jsx)(be,{onClick:()=>{if(I(""),_){var e;P(!1);const t=E||(null===(e=f[0])||void 0===e?void 0:e.id)||null;S(t),N(null)}},title:"Clear search",children:"\xd7"})]})}),(0,h.jsx)(ye,{children:f.map(e=>(0,h.jsxs)(fe,{active:B===e.id&&!_,onClick:()=>{return t=e.id,_&&(P(!1),I("")),S(t),void v(t);var t},children:[e.emoji," ",e.name]},e.id))}),_&&(0,h.jsxs)("div",{style:{padding:"8px 16px",background:"#f0f7ff",borderRadius:"8px",marginBottom:"12px",fontSize:"14px",color:"#1a73e8",display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)("span",{children:"\ud83d\udd0d"}),(0,h.jsxs)("span",{children:['Search results for "',z,'" (',Mn.length," items)"]})]}),(0,h.jsx)(je,{children:Mn.length>0?(0,h.jsxs)(h.Fragment,{children:[(Un?Mn.slice(0,Rn):Mn).map(e=>{const t=e.optionGroups&&e.optionGroups.length>0;return(0,h.jsxs)(Fe,{soldOut:e.soldOut,onClick:()=>(e=>{if(e.soldOut)return;let t=[];e.is_set_menu&&e.set_items&&e.set_items.length>0&&(t=e.set_items.map(e=>{const t=g.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}));const n=T.find(t=>t.menuItem.id===e.id&&(!t.options||0===t.options.length)&&!e.is_set_menu);n&&!e.is_set_menu?O(T.map(e=>e.id===n.id?{...e,quantity:e.quantity+1}:e)):O([...T,{id:`order-${Date.now()}`,menuItem:e,quantity:1,options:t.length>0?t:void 0}])})(e),children:[e.is_set_menu&&(0,h.jsx)(Ae,{children:"SET"}),(0,h.jsx)(Ce,{hasImage:!!e.image,children:e.image?(0,h.jsx)("img",{src:e.image,alt:e.name,loading:"lazy"}):e.emoji}),(0,h.jsxs)(we,{children:[e.code?`${e.code} `:"",e.name]}),(0,h.jsxs)(ke,{children:[Bn," ",e.price.toFixed(2)]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,h.jsx)(Be,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")}),t&&(0,h.jsx)(Se,{children:(0,h.jsx)(Ee,{onClick:t=>((e,t)=>{t.stopPropagation(),e.soldOut||(Nt(e),U(!0))})(e,t),disabled:e.soldOut,children:"Options"})})]},e.id)}),Un&&Rn<Mn.length&&(0,h.jsx)("div",{ref:qn,style:{gridColumn:"1 / -1",height:"20px"}})]}):y?(0,h.jsxs)(ve,{children:[(0,h.jsx)("div",{className:"icon",children:"\u23f3"}),(0,h.jsx)("div",{className:"title",children:"Loading..."})]}):(0,h.jsxs)(ve,{children:[(0,h.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,h.jsx)("div",{className:"title",children:_?`No results for "${z}"`:"No items in this category"}),(0,h.jsx)("div",{className:"message",children:_?"Try searching with different keywords":"Select a different category to view items"})]})})]}),(0,h.jsxs)(Ne,{children:[(0,h.jsxs)(dt,{children:[(0,h.jsx)(ct,{active:"dine-in"===Ht,onClick:()=>Vt("dine-in"),children:"Dine In"}),(0,h.jsx)(ct,{active:"takeaway"===Ht,onClick:()=>Vt("takeaway"),children:"Takeaway"})]}),(0,h.jsx)(ut,{children:fn?(0,h.jsxs)(ft,{children:[(0,h.jsxs)(jt,{children:[(0,h.jsx)(Ft,{children:fn.name}),(0,h.jsxs)(Ct,{children:[fn.phone&&`${fn.phone} \u2022 `,fn.id]})]}),(0,h.jsx)(St,{onClick:()=>{jn(null),bn(""),Cn([])},children:"Clear"})]}):(0,h.jsxs)(xt,{children:[(0,h.jsx)(mt,{children:"\ud83d\udd0d"}),(0,h.jsx)(ht,{type:"text",placeholder:"Walk-in Customer",value:gn,onChange:e=>{const n=e.target.value;bn(n),yn(n.trim().length>0),An.current&&clearTimeout(An.current),n.trim().length>=2?An.current=setTimeout(()=>{(async e=>{if(e.trim()&&null!==t&&void 0!==t&&t.restaurantId){kn(!0);try{const n=await fetch(`/api/customers/${t.restaurantId}?search=${encodeURIComponent(e)}`);if(n.ok){const e=await n.json();if(e.success&&e.data){const t=e.data.map(e=>{var t,n,i,o,r;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id,name:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Unknown",phone:(null===(i=e.customer)||void 0===i?void 0:i.phone)||"",email:(null===(o=e.customer)||void 0===o?void 0:o.email)||"",type:(null===(r=e.customer)||void 0===r?void 0:r.type)||"member",points:e.points||0,loyaltyTier:e.loyalty_tier||"Bronze",totalOrders:e.total_orders||0,totalSpent:e.total_spent||0}});Cn(t.slice(0,10))}}}catch(n){console.error("Customer search error:",n)}finally{kn(!1)}}else Cn([])})(n)},300):Cn([])},onFocus:()=>{gn.trim()&&yn(!0)},onBlur:()=>setTimeout(()=>yn(!1),200)}),(0,h.jsx)(gt,{show:vn&&oi.length>0,children:oi.map(e=>(0,h.jsxs)(bt,{onClick:()=>(e=>{jn(e),bn(""),yn(!1),Cn([])})(e),children:[(0,h.jsx)(vt,{children:e.name}),(0,h.jsxs)(yt,{children:[e.phone&&`${e.phone} \u2022 `,e.id]})]},e.id))}),(0,h.jsx)(gt,{show:vn&&gn.trim().length>0&&0===oi.length&&!wn,children:(0,h.jsx)(bt,{style:{cursor:"default",color:"#6B7C93"},children:"No customers found"})}),(0,h.jsx)(gt,{show:vn&&wn,children:(0,h.jsx)(bt,{style:{cursor:"default",color:"#6B7C93"},children:"Searching..."})})]})}),"dine-in"===Ht&&Qt.length>0&&(0,h.jsxs)(ze,{children:[(0,h.jsx)(Ie,{children:"Table Number:"}),(0,h.jsxs)(_e,{value:Kt,onChange:e=>Jt(e.target.value),children:[(0,h.jsx)("option",{value:"",children:"Free Seating"}),Qt.map(e=>(0,h.jsx)("option",{value:e,children:e},e))]})]}),0===T.length?(0,h.jsxs)(et,{children:[(0,h.jsx)(tt,{children:"No items in order"}),(0,h.jsx)(tt,{style:{marginTop:"8px",fontSize:"12px"},children:"Select menu items to start"})]}):(0,h.jsxs)(Pe,{children:[(0,h.jsxs)(Te,{children:[(0,h.jsxs)($e,{children:[T.length," ",1===T.length?"item":"items"]}),T.map(e=>(0,h.jsxs)(Oe,{children:[(0,h.jsxs)(De,{children:[(0,h.jsxs)(Re,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),e.options&&e.options.length>0&&(()=>{const t=[],n=[];return e.options.forEach(e=>{/^.+\sx\d+$/.test(e)?t.push(e):n.push(e)}),(0,h.jsxs)(h.Fragment,{children:[t.length>0&&(0,h.jsx)(Le,{style:{fontWeight:600},children:t.join(", ")}),n.length>0&&(0,h.jsxs)(Le,{children:["\u2b50 ",n.join(", ")]})]})})()]}),(0,h.jsxs)(qe,{children:[(0,h.jsxs)(Me,{children:[(0,h.jsx)(Ue,{onClick:()=>Wn(e.id,-1),children:"-"}),(0,h.jsx)(We,{children:e.quantity}),(0,h.jsx)(Ue,{onClick:()=>Wn(e.id,1),children:"+"})]}),(0,h.jsxs)(Ye,{children:[Bn," ",(()=>{let t=e.menuItem.price*e.quantity;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)*e.quantity}return t.toFixed(2)})()]}),(0,h.jsx)(Ge,{onClick:()=>{return t=e.id,void O(T.filter(e=>e.id!==t));var t},children:"\xd7"})]})]},e.id))]}),(0,h.jsxs)(He,{children:[(0,h.jsxs)(Ve,{children:[(0,h.jsx)(Ke,{children:"Subtotal"}),(0,h.jsxs)(Je,{children:[Bn," ",Jn.toFixed(2)]})]}),ni>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsx)(Ke,{children:"Takeaway Charge"}),(0,h.jsxs)(Je,{children:[Bn," ",ni.toFixed(2)]})]}),Zn>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsx)(Ke,{children:"Discount"}),(0,h.jsxs)(Je,{style:{color:"#10B981"},children:["-",Bn," ",Zn.toFixed(2)]})]}),Ot&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Coupon (",Ot.code,")"]}),(0,h.jsxs)(Je,{style:{color:"#10B981"},children:["-",Bn," ",ei.toFixed(2)]})]}),Rt&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Discount (",Rt.name,")"]}),(0,h.jsxs)(Je,{style:{color:"#10B981"},children:["-",Bn," ",ti.toFixed(2)]})]}),u.serviceChargeEnabled&&ii>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Service Charge (",u.serviceChargeRate,"%)"]}),(0,h.jsxs)(Je,{children:[Bn," ",ii.toFixed(2)]})]}),u.taxEnabled&&Qn>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Tax (",u.taxRate,"%)"]}),(0,h.jsxs)(Je,{children:[Bn," ",Qn.toFixed(2)]})]}),(0,h.jsxs)(Qe,{children:[(0,h.jsx)(Ke,{children:"Total"}),(0,h.jsxs)(Je,{children:[Bn," ",Xn.toFixed(2)]})]})]}),(0,h.jsxs)(nt,{children:[(0,h.jsx)(it,{children:Ot?(0,h.jsxs)(lt,{children:[(0,h.jsxs)("span",{children:["Coupon: ",Ot.code," (-",Bn," ",Ot.discount.toFixed(2),")"]}),(0,h.jsx)(pt,{onClick:()=>{Dt(null)},children:"\xd7"})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(ot,{type:"text",placeholder:"Enter coupon code",value:Tt,onChange:e=>$t(e.target.value.toUpperCase()),onKeyDown:e=>"Enter"===e.key&&Vn()}),(0,h.jsx)(rt,{onClick:Vn,disabled:!Tt,children:"Apply Coupon"})]})}),(0,h.jsx)(it,{children:(0,h.jsxs)(st,{children:[(0,h.jsxs)(at,{active:5===zt,onClick:()=>Hn(5),children:[u.currency," 5"]}),(0,h.jsxs)(at,{active:10===zt,onClick:()=>Hn(10),children:[u.currency," 10"]}),(0,h.jsxs)(at,{active:15===zt,onClick:()=>Hn(15),children:[u.currency," 15"]}),(0,h.jsxs)(at,{onClick:()=>an(!0),children:["Custom ",u.currency]})]})}),(0,h.jsx)(it,{children:(0,h.jsxs)(st,{children:[(0,h.jsx)(at,{active:"Staff"===(null===Rt||void 0===Rt?void 0:Rt.name),onClick:()=>Kn("Staff"),children:"20%"}),(0,h.jsx)(at,{active:"VIP"===(null===Rt||void 0===Rt?void 0:Rt.name),onClick:()=>Kn("VIP"),children:"15%"}),(0,h.jsx)(at,{onClick:()=>pn(!0),children:"Custom %"})]})})]})]}),u.pagerSystem.enabled&&T.length>0&&(0,h.jsxs)(ze,{children:[(0,h.jsx)(Ie,{children:"Pager Number:"}),(0,h.jsxs)(wt,{children:[(0,h.jsx)(kt,{type:"text",value:tn,onChange:e=>{const t=e.target.value;nn(t),en(t),t.trim()?rn(!0):rn(!1)},onFocus:()=>{!tn.trim()&&Zt||rn(!0)},onBlur:()=>setTimeout(()=>rn(!1),200),placeholder:Zt?`#${Zt}`:"Type or click..."}),(0,h.jsx)(At,{show:on,children:Yn().length>0?Yn().map(e=>(0,h.jsxs)(Bt,{onClick:()=>{return en((t=e).toString()),nn(t.toString()),void rn(!1);var t},children:["Pager #",e]},e)):(0,h.jsx)(Bt,{style:{cursor:"default",color:"#6B7C93"},children:"No matching pagers"})})]})]}),(0,h.jsxs)(Xe,{children:[(0,h.jsx)(Ze,{variant:"danger",onClick:()=>{T.length>0&&Mt(!0)},children:"Clear"}),(0,h.jsx)(Ze,{variant:"secondary",onClick:async()=>{if(console.log("\ud83d\udd35 handleAddOrder called"),0!==T.length)if(_t)console.warn("POS - Order already in progress, ignoring duplicate call");else{console.log("\ud83d\udfe2 Starting order creation, setting isProcessingPayment=true"),Pt(!0);try{const n=new Date,i={date:n,items:T,subtotal:Jn,discount:Zn,discountPolicy:Rt?{name:Rt.name,amount:Rt.discount}:void 0,coupon:Ot?{code:Ot.code,discount:Ot.discount}:null,takeawayCharge:ni,serviceCharge:ii,serviceChargeRate:u.serviceChargeRate,tax:Qn,taxRate:u.taxRate,total:Xn,paymentMethod:"Pending",amountReceived:0,change:0},o={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:fn?fn.name:(e="Walk-in Customer",e&&"Guest Customer"!==e&&"Mobile Guest"!==e?e:"Walk-in Customer"),phone:fn?fn.phone:"POS Terminal",email:fn&&fn.email||"",type:fn?"member":"guest",customerId:null===fn||void 0===fn?void 0:fn.id,loyaltyTier:null===fn||void 0===fn?void 0:fn.loyaltyTier,points:null===fn||void 0===fn?void 0:fn.points},items:T.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:n.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:Jn,tax:Qn,taxRate:u.taxRate,serviceCharge:ii,serviceChargeRate:u.serviceChargeRate,discount:Zn,coupon:Ot?{code:Ot.code,amount:Ot.discount}:void 0,discountPolicy:Rt?{name:Rt.name,amount:Rt.discount}:void 0,takeawayCharge:ni,total:Xn,paymentMethod:"Pending",paymentStatus:"pending",orderType:Ht,orderSource:"pos",tableNumber:"dine-in"===Ht&&Kt?Kt:void 0,pagerNumber:Zt||void 0,cashier_id:null!==t&&void 0!==t&&t.id?Number(t.id):null,cashier_name:(null===t||void 0===t?void 0:t.name)||null};console.log("\ud83d\udfe1 Calling addOrder with orderNumber:",o.orderNumber);const r=await d(o,l?Number(l):void 0);console.log("\ud83d\udfe2 addOrder completed, savedOrder:",r),H({...i,orderNumber:(null===r||void 0===r?void 0:r.order_number)||(null===r||void 0===r?void 0:r.orderNumber)||o.orderNumber,pickupNumber:(null===r||void 0===r?void 0:r.pickup_number)||(null===r||void 0===r?void 0:r.pickupNumber)||(null!==r&&void 0!==r&&r.order_number?r.order_number.split("-")[1]:o.pickupNumber),pagerNumber:(null===r||void 0===r?void 0:r.pager_number)||Zt||void 0,tableNumber:(null===r||void 0===r?void 0:r.table_number)||Kt||void 0,takeawayCharge:(null===r||void 0===r?void 0:r.takeaway_charge)||(null===r||void 0===r?void 0:r.takeawayCharge)||i.takeawayCharge,subtotal:(null===r||void 0===r?void 0:r.subtotal)||i.subtotal,tax:(null===r||void 0===r?void 0:r.tax)||i.tax,serviceCharge:(null===r||void 0===r?void 0:r.service_charge)||(null===r||void 0===r?void 0:r.serviceCharge)||i.serviceCharge,discount:(null===r||void 0===r?void 0:r.discount)||i.discount,discountPolicy:i.discountPolicy,coupon:i.coupon,pointsUsed:0,pointDiscount:0,total:(null===r||void 0===r?void 0:r.total)||i.total,cashierName:(null===t||void 0===t?void 0:t.name)||null}),Y(!0),O([]),It(0),Dt(null),Lt(null),$t(""),Jt(""),en(""),nn(""),jn(null),bn(""),console.log("POS - Order added without payment:",null===r||void 0===r?void 0:r.orderNumber)}catch(n){console.error("POS - Error adding order:",n),alert("Failed to create order. Please try again.")}finally{Pt(!1)}var e}},children:"Pay Later"}),(0,h.jsx)(Ze,{variant:"primary",onClick:()=>{0!==T.length&&q(!0)},style:{flex:2},children:"Pay Now"})]})]})]}),(0,h.jsx)(s.A,{isOpen:L,onClose:()=>q(!1),total:Xn,subtotal:Jn,tax:Qn,serviceCharge:ii,takeawayCharge:ni,discountAmount:Zn,couponDiscount:ei,onConfirmPayment:async(e,n,i,o,r)=>{if(_t)return void console.warn("POS - Payment already in progress, ignoring duplicate call");Pt(!0),console.log("POS - Processing payment for method:",e,"Points used:",o);const s=r?Xn-r:Xn;try{const a=new Date,l={date:a,items:T,subtotal:Jn,discount:Zn,discountPolicy:Rt?{name:Rt.name,amount:Rt.discount}:void 0,coupon:Ot?{code:Ot.code,discount:Ot.discount}:null,takeawayCharge:ni,serviceCharge:ii,serviceChargeRate:u.serviceChargeRate,tax:Qn,taxRate:u.taxRate,total:s,pointsUsed:o||0,pointDiscount:r||0,paymentMethod:e,amountReceived:n||s,change:i||0},c={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:fn?fn.name:"Walk-in Customer",phone:fn?fn.phone:"POS Terminal",email:fn&&fn.email||"",type:fn?"member":"guest",customerId:null===fn||void 0===fn?void 0:fn.id,loyaltyTier:null===fn||void 0===fn?void 0:fn.loyaltyTier,points:null===fn||void 0===fn?void 0:fn.points},items:T.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:a.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:Jn,tax:Qn,taxRate:u.taxRate,serviceCharge:ii,serviceChargeRate:u.serviceChargeRate,discount:Zn,coupon:Ot?{code:Ot.code,amount:Ot.discount}:void 0,discountPolicy:Rt?{name:Rt.name,amount:Rt.discount}:void 0,takeawayCharge:ni,total:s,points_used:o||null,point_discount:r||null,paymentMethod:e,paymentStatus:"completed",orderType:Ht,orderSource:"pos",tableNumber:"dine-in"===Ht&&Kt?Kt:void 0,pagerNumber:Zt||void 0,cashier_id:null!==t&&void 0!==t&&t.id?Number(t.id):null,cashier_name:(null===t||void 0===t?void 0:t.name)||null},p=await d(c,null!==t&&void 0!==t&&t.restaurantId?Number(t.restaurantId):void 0);if(fn&&j(fn.id,Xn),C){const e={...C.performance,ordersProcessed:C.performance.ordersProcessed+1};A(C.id,{totalSales:C.totalSales+Xn,totalShifts:C.totalShifts,performance:e})}H({...l,orderNumber:(null===p||void 0===p?void 0:p.order_number)||(null===p||void 0===p?void 0:p.orderNumber)||"",pickupNumber:(null===p||void 0===p?void 0:p.pickup_number)||(null===p||void 0===p?void 0:p.pickupNumber)||(null!==p&&void 0!==p&&p.order_number?p.order_number.split("-")[1]:null),tableNumber:(null===p||void 0===p?void 0:p.table_number)||Kt||void 0,pagerNumber:(null===p||void 0===p?void 0:p.pager_number)||Zt||void 0,takeawayCharge:(null===p||void 0===p?void 0:p.takeaway_charge)||(null===p||void 0===p?void 0:p.takeawayCharge)||l.takeawayCharge,subtotal:(null===p||void 0===p?void 0:p.subtotal)||l.subtotal,tax:(null===p||void 0===p?void 0:p.tax)||l.tax,serviceCharge:(null===p||void 0===p?void 0:p.service_charge)||(null===p||void 0===p?void 0:p.serviceCharge)||l.serviceCharge,discount:(null===p||void 0===p?void 0:p.discount)||l.discount,discountPolicy:l.discountPolicy,coupon:l.coupon,pointsUsed:l.pointsUsed||0,pointDiscount:l.pointDiscount||0,total:(null===p||void 0===p?void 0:p.total)||l.total,cashierName:(null===t||void 0===t?void 0:t.name)||null}),Y(!0),q(!1),O([]),It(0),Dt(null),Lt(null),$t(""),Jt(""),en(""),nn(""),jn(null),bn(""),console.log("POS - Payment processing completed:",null===p||void 0===p?void 0:p.orderNumber)}catch(a){console.error("POS - Error processing payment:",a),alert("Failed to process payment. Please try again.")}finally{Pt(!1)}},paymentMethods:hn,taxRate:u.taxRate,serviceChargeRate:u.serviceChargeRate,taxEnabled:u.taxEnabled,serviceChargeEnabled:u.serviceChargeEnabled,cashierName:null===t||void 0===t?void 0:t.name,customerPoints:Tn,customerTier:On,membershipSettings:_n}),Et&&(0,h.jsx)(a.A,{isOpen:M,onClose:()=>{U(!1),Nt(null)},menuItem:Et,onConfirm:(e,t,n)=>{if(!Et)return;let i=[...t];if(Et.is_set_menu&&Et.set_items&&Et.set_items.length>0){i=[...Et.set_items.map(e=>{const t=g.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}),...t]}const o=i.sort().join(","),r=T.find(e=>{var t;return e.menuItem.id===Et.id&&(null===(t=e.options)||void 0===t?void 0:t.sort().join(","))===o});O(r?T.map(t=>t.id===r.id?{...t,quantity:t.quantity+e}:t):[...T,{id:`order-${Date.now()}`,menuItem:Et,quantity:e,options:i.length>0?i:void 0,selectedOptions:n}]),U(!1),Nt(null)}}),G&&(0,h.jsx)($,{isOpen:W,onClose:()=>{Gn()},orderData:G,onPrintBill:()=>{}}),(0,h.jsx)(K.A,{isOpen:qt,onClose:()=>Mt(!1),onConfirm:()=>{O([]),It(0),Dt(null),Lt(null),$t(""),jn(null),bn(""),en(""),nn(""),Mt(!1)},title:"Clear Order",message:"Are you sure you want to clear all items from the order?",confirmText:"Clear Order",cancelText:"Cancel",variant:"warning"}),(0,h.jsx)(J,{isOpen:Ut,onClose:()=>Wt(!1),title:"Coming Soon",message:"This feature is coming soon",variant:"info"}),(0,h.jsx)(J,{isOpen:Yt,onClose:()=>Gt(!1),title:"Invalid Coupon",message:"The coupon code you entered is not valid. Please check and try again.",variant:"error"}),(0,h.jsx)(Q.A,{isOpen:sn,onClose:()=>an(!1),onConfirm:e=>{const t=parseFloat(e);!isNaN(t)&&t>=0&&(It(t),Lt(null)),an(!1)},title:"Custom Discount Amount",label:"Enter discount amount:",placeholder:"25",min:0,suffix:` ${(0,x.Qn)(Bn)}`,confirmText:"Apply Discount",cancelText:"Cancel"}),(0,h.jsx)(Q.A,{isOpen:cn,onClose:()=>pn(!1),onConfirm:e=>{const t=parseFloat(e);if(!isNaN(t)&&t>=0&&t<=100){Lt({name:`${t}%`,discount:Jn*(t/100),requiresApproval:!1}),It(0)}pn(!1)},title:"Custom Discount Percentage",label:"Enter discount percentage:",placeholder:"10",min:0,max:100,suffix:"%",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,h.jsx)(ie.A,{}),(0,h.jsx)(V,{show:ln,onClose:()=>dn(!1),onVerified:e=>{e.token&&e.user&&n(e.token,e.user),dn(!1)},onLogout:()=>{o()},currentCashierName:null===t||void 0===t?void 0:t.name})]})})},2538:(e,t,n)=>{n.d(t,{A:()=>c});var i=n(9950),o=n(9610),r=n(4752),s=n(4414);const a=r.Ay.input`
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
`,c=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:c,label:p,placeholder:u="",min:x=0,max:h,step:m=1,suffix:g="",confirmText:b="Apply",cancelText:v="Cancel"}=e;const[y,f]=(0,i.useState)(""),[j,F]=(0,i.useState)(""),C=()=>{const e=parseFloat(y);!isNaN(e)&&e>=x&&(void 0===h||e<=h)&&(r(y),f(""),F(""),n())},w=()=>{f(""),F(""),n()},k=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.yl,{variant:"secondary",onClick:w,children:v}),(0,s.jsx)(o.yl,{variant:"primary",onClick:C,disabled:!y||!!j||parseFloat(y)<x,children:b})]});return(0,s.jsx)(o.aF,{isOpen:t,onClose:w,title:c,footer:k,children:(0,s.jsxs)("div",{children:[(0,s.jsx)(o.lR,{children:p}),(0,s.jsx)(a,{type:"text",value:y,onChange:e=>{const t=e.target.value;if(""===t)return f(""),void F("");if(!/^\d*\.?\d*$/.test(t))return;const n=parseFloat(t);isNaN(n)||F(n<x?`Minimum value is ${x}${g}`:void 0!==h&&n>h?`Maximum value is ${h}${g}`:""),f(t)},placeholder:u,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!j&&y&&C()}}),j&&(0,s.jsx)(l,{children:j}),!j&&void 0!==h&&(0,s.jsxs)(d,{children:["Enter a value between ",x,g," and ",h,g]})]})})}}}]);