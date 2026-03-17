"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3577],{3577:(e,n,i)=>{i.d(n,{A:()=>V});var t=i(9950),r=i(7119),s=i(4752),o=i(1367),d=i(9018),l=i(6038),a=i(8285),c=i(4414);const x={dine_in:"Dine In","dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pickup",delivery:"Delivery"},p={pos:"POS",mobile:"Mobile Order"},h={visa:"Visa",mastercard:"Mastercard",master:"Mastercard",amex:"Amex",other:"Other",unspecified:"Unspecified"},v=s.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 40px 20px;
  overflow-y: auto;

  @media print {
    position: static;
    background: none;
    padding: 0;
    overflow: visible;
  }
`,u=s.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;

  @media print {
    max-width: none;
    border-radius: 0;
    box-shadow: none;
  }
`,j=s.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;

  @media print {
    display: none;
  }
`,g=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,m=s.Ay.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6B7C93;
  font-size: 20px;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`,y=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  flex-wrap: wrap;

  @media print {
    display: none;
  }
`,f=s.Ay.button`
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7C93"};

  &:hover {
    border-color: #635BFF;
    color: ${e=>e.active?"white":"#635BFF"};
  }
`,b=s.Ay.input`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;
  margin-left: auto;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,A=s.Ay.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;

  @media print {
    display: none;
  }
`,w=s.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${e=>e.primary?"#635BFF":"#E6EBF1"};
  background: ${e=>e.primary?"#635BFF":"white"};
  color: ${e=>e.primary?"white":"#0A2540"};

  &:hover {
    background: ${e=>e.primary?"#5A51E6":"#F6F9FC"};
  }
`,C=s.Ay.div`
  padding: 24px;
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #1F2937;
  max-height: 70vh;
  overflow-y: auto;

  @media print {
    max-height: none;
    overflow: visible;
    padding: 5mm;
    width: 80mm;
    max-width: 80mm;
    font-size: 11px;
  }
`,F=s.Ay.div`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 2px solid #1F2937;
`,S=s.Ay.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 4px;

  @media print {
    font-size: 14px;
  }
`,E=s.Ay.div`
  font-size: 11px;
  color: #4B5563;
  line-height: 1.4;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,k=s.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 12px 0;
  padding: 8px 0;
  border-top: 1px dashed #9CA3AF;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 13px;
  }
`,D=s.Ay.div`
  margin-bottom: 12px;
`,T=s.Ay.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 11px;
  }
`,$=s.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.total?"8px 0 4px 0":"2px 0"};
  font-weight: ${e=>e.bold||e.total?700:400};
  font-size: ${e=>e.total?"14px":"12px"};
  border-top: ${e=>e.total?"2px solid #1F2937":"none"};
  margin-top: ${e=>e.total?"8px":"0"};
  padding-left: ${e=>e.indent?"16px":"0"};
  color: ${e=>e.negative?"#DC2626":"inherit"};

  @media print {
    font-size: ${e=>e.total?"13px":"11px"};
    padding-left: ${e=>e.indent?"12px":"0"};
  }
`,B=s.Ay.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
`,O=s.Ay.span`
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`,z=s.Ay.span`
  text-align: right;
  white-space: nowrap;
  min-width: 36px;
  color: #6B7280;

  @media print {
    color: #1F2937;
  }
`,M=s.Ay.div`
  border-bottom: ${e=>"double"===e.style_type?"3px double #1F2937":"solid"===e.style_type?"1px solid #9CA3AF":"1px dashed #9CA3AF"};
  margin: 8px 0;
`,N=s.Ay.div`
  text-align: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed #9CA3AF;
  font-size: 11px;
  color: #6B7280;
  line-height: 1.6;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,L=s.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,R=s.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,I=e=>(new Date).toLocaleDateString("en-CA",{timeZone:e}),P=e=>{const[n,i,t]=e.split("-");return`${parseInt(t)} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(i)-1]} ${n}`},V=e=>{var n,i;let{isOpen:s,onClose:V}=e;const{user:_}=(0,o.As)(),{storeSettings:q,operationSettings:Y,paymentSettings:H}=(0,d.Pj)(),Z=Y.timeZone||"Asia/Kuala_Lumpur",G=Y.currency,[U,J]=(0,t.useState)(I(Z)),[K,W]=(0,t.useState)(null),[Q,X]=(0,t.useState)(!1),ee=(0,t.useCallback)(async e=>{if(null===_||void 0===_||!_.restaurantId)return;const n=localStorage.getItem("auth_token");if(n){X(!0);try{const i=await fetch(`/api/dashboard/restaurant/${_.restaurantId}/reports-summary?startDate=${e}&endDate=${e}`,{headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"}});if(i.ok){const e=await i.json();e.success&&W(e.data)}}catch(i){console.error("Error fetching settlement data:",i)}finally{X(!1)}}},[null===_||void 0===_?void 0:_.restaurantId]);(0,t.useEffect)(()=>{s&&ee(U)},[s,U,ee]);const ne=e=>{J(e)};if(!s)return null;const ie=I(Z),te=(e=>{const n=new Date;return n.setDate(n.getDate()-1),n.toLocaleDateString("en-CA",{timeZone:e})})(Z),re=null===K||void 0===K?void 0:K.settlement,se=(null===K||void 0===K||null===(n=K.summary)||void 0===n?void 0:n.totalOrders)||0,oe=(null===K||void 0===K||null===(i=K.summary)||void 0===i?void 0:i.averageOrderValue)||0,de=((null===K||void 0===K?void 0:K.paymentMethodSales)||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,n)=>n.revenue-e.revenue),le=((null===K||void 0===K?void 0:K.cardTypeSales)||[]).filter(e=>e.orders>0).sort((e,n)=>n.revenue-e.revenue),ae=((null===K||void 0===K?void 0:K.orderTypeSales)||[]).filter(e=>e.orders>0).sort((e,n)=>n.revenue-e.revenue),ce=((null===K||void 0===K?void 0:K.sourceSales)||[]).filter(e=>e.orders>0).sort((e,n)=>n.revenue-e.revenue),xe=((null===K||void 0===K?void 0:K.categorySales)||[]).filter(e=>e.revenue>0).sort((e,n)=>n.revenue-e.revenue),pe=((null===K||void 0===K?void 0:K.menuSales)||[]).filter(e=>e.quantity>0).sort((e,n)=>n.quantity-e.quantity).slice(0,10),he=(null===K||void 0===K?void 0:K.staffMeal)||{revenue:0,orders:0},ve=de.reduce((e,n)=>e+n.revenue,0),ue=(new Date).toLocaleString("en-GB",{timeZone:Z,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return r.createPortal((0,c.jsxs)(v,{onClick:e=>{e.target===e.currentTarget&&V()},children:[(0,c.jsxs)(u,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(j,{className:"no-print",children:[(0,c.jsx)(g,{children:"Daily Settlement Report"}),(0,c.jsx)(m,{onClick:V,children:"\xd7"})]}),(0,c.jsxs)(y,{className:"no-print",children:[(0,c.jsx)(f,{active:U===ie,onClick:()=>ne(ie),children:"Today"}),(0,c.jsx)(f,{active:U===te,onClick:()=>ne(te),children:"Yesterday"}),(0,c.jsx)(b,{type:"date",value:U,max:ie,onChange:e=>ne(e.target.value)})]}),Q?(0,c.jsx)(L,{children:"Loading settlement data..."}):K&&0!==se?(0,c.jsxs)(C,{"data-print-bill":!0,children:[(0,c.jsxs)(F,{children:[(0,c.jsx)(S,{children:q.name}),(0,c.jsxs)(E,{children:[q.address&&(0,c.jsx)("div",{children:q.address}),(q.city||q.state)&&(0,c.jsx)("div",{children:[q.city,q.state,q.postalCode].filter(Boolean).join(", ")}),q.phone&&(0,c.jsxs)("div",{children:["Tel: ",q.phone]}),(q.businessRegistration||q.gstRegNo)&&(0,c.jsxs)("div",{children:[q.businessRegistration&&(0,c.jsxs)(c.Fragment,{children:["Reg No: ",q.businessRegistration]}),q.businessRegistration&&q.gstRegNo&&" | ",q.gstRegNo&&(0,c.jsxs)(c.Fragment,{children:["Tax No: ",q.gstRegNo]})]})]})]}),(0,c.jsx)(k,{children:"DAILY SETTLEMENT"}),(0,c.jsxs)(D,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"Date:"}),(0,c.jsx)(O,{children:P(U)})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"Printed:"}),(0,c.jsx)(O,{children:ue})]})]}),(0,c.jsx)(M,{style_type:"double"}),(0,c.jsxs)(D,{children:[(0,c.jsx)(T,{children:"SALES SUMMARY"}),(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"Gross Sales"}),(0,c.jsx)(O,{children:(0,l.vv)((null===re||void 0===re?void 0:re.grossSales)||0,G)})]}),((null===re||void 0===re?void 0:re.totalDiscount)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"(-) Discount"}),(0,c.jsx)(O,{children:(0,l.vv)(re.totalDiscount,G)})]}),((null===re||void 0===re?void 0:re.totalCouponDiscount)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"(-) Coupon Discount"}),(0,c.jsx)(O,{children:(0,l.vv)(re.totalCouponDiscount,G)})]}),((null===re||void 0===re?void 0:re.totalPointDiscount)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"(-) Point Discount"}),(0,c.jsx)(O,{children:(0,l.vv)(re.totalPointDiscount,G)})]}),((null===re||void 0===re?void 0:re.totalTakeawayCharge)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"(+) Takeaway Charge"}),(0,c.jsx)(O,{children:(0,l.vv)(re.totalTakeawayCharge,G)})]}),((null===re||void 0===re?void 0:re.totalDeliveryFee)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"(+) Delivery Fee"}),(0,c.jsx)(O,{children:(0,l.vv)(re.totalDeliveryFee,G)})]}),((null===re||void 0===re?void 0:re.totalServiceCharge)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"(+) Service Charge"}),(0,c.jsx)(O,{children:(0,l.vv)(re.totalServiceCharge,G)})]}),((null===re||void 0===re?void 0:re.totalTax)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"(+) Tax"}),(0,c.jsx)(O,{children:(0,l.vv)(re.totalTax,G)})]}),(0,c.jsxs)($,{total:!0,children:[(0,c.jsx)(B,{children:"NET SALES"}),(0,c.jsx)(O,{children:(0,l.vv)((null===re||void 0===re?void 0:re.netSales)||0,G)})]}),(0,c.jsx)(M,{style_type:"dashed"}),(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"Total Orders"}),(0,c.jsx)(O,{children:se})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"Avg Order Value"}),(0,c.jsx)(O,{children:(0,l.vv)(oe,G)})]}),((null===re||void 0===re?void 0:re.cancelledOrders)||0)>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(M,{style_type:"dashed"}),(0,c.jsxs)($,{negative:!0,children:[(0,c.jsx)(B,{children:"Cancelled Orders"}),(0,c.jsx)(z,{children:re.cancelledOrders}),(0,c.jsx)(O,{children:(0,l.vv)(re.cancelledAmount,G)})]})]}),((null===re||void 0===re?void 0:re.outstandingOrders)||0)>0&&(0,c.jsxs)($,{negative:!0,children:[(0,c.jsx)(B,{children:"Outstanding Orders"}),(0,c.jsx)(z,{children:re.outstandingOrders}),(0,c.jsx)(O,{children:(0,l.vv)(re.outstandingAmount,G)})]})]}),(0,c.jsx)(M,{style_type:"double"}),de.length>0&&(0,c.jsxs)(D,{children:[(0,c.jsx)(T,{children:"PAYMENT SETTLEMENT"}),de.map(e=>(0,c.jsxs)(t.Fragment,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:(0,a._M)(e.method,H||void 0)}),(0,c.jsxs)(z,{children:["x",e.orders]}),(0,c.jsx)(O,{children:(0,l.vv)(e.revenue,G)})]}),"card"===e.method&&le.length>0&&le.map((e,n)=>(0,c.jsxs)($,{indent:!0,children:[(0,c.jsxs)(B,{children:[n<le.length-1?"\u251c":"\u2514"," ",h[e.type]||e.type]}),(0,c.jsxs)(z,{children:["x",e.orders]}),(0,c.jsx)(O,{children:(0,l.vv)(e.revenue,G)})]},e.type))]},e.method)),(0,c.jsxs)($,{total:!0,children:[(0,c.jsx)(B,{children:"TOTAL COLLECTED"}),(0,c.jsx)(O,{children:(0,l.vv)(ve,G)})]})]}),(0,c.jsx)(M,{}),ce.length>0&&(0,c.jsxs)(D,{children:[(0,c.jsx)(T,{children:"ORDER SOURCE"}),ce.map(e=>(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:p[e.source]||e.source}),(0,c.jsxs)(z,{children:["x",e.orders]}),(0,c.jsx)(O,{children:(0,l.vv)(e.revenue,G)})]},e.source))]}),(0,c.jsx)(M,{}),ae.length>0&&(0,c.jsxs)(D,{children:[(0,c.jsx)(T,{children:"ORDER TYPE"}),ae.map(e=>(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:x[e.type]||e.type}),(0,c.jsxs)(z,{children:["x",e.orders]}),(0,c.jsx)(O,{children:(0,l.vv)(e.revenue,G)})]},e.type))]}),(0,c.jsx)(M,{}),xe.length>0&&(0,c.jsxs)(D,{children:[(0,c.jsx)(T,{children:"SALES BY CATEGORY"}),xe.map(e=>(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:e.category}),(0,c.jsxs)(z,{children:[e.quantity,"qty"]}),(0,c.jsx)(O,{children:(0,l.vv)(e.revenue,G)})]},e.category)),(0,c.jsxs)($,{bold:!0,children:[(0,c.jsx)(B,{children:"Total"}),(0,c.jsxs)(z,{children:[xe.reduce((e,n)=>e+n.quantity,0),"qty"]}),(0,c.jsx)(O,{children:(0,l.vv)(xe.reduce((e,n)=>e+n.revenue,0),G)})]})]}),pe.length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(M,{style_type:"dashed"}),(0,c.jsxs)(D,{children:[(0,c.jsx)(T,{children:"TOP SELLING ITEMS"}),pe.map((e,n)=>(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:e.name}),(0,c.jsxs)(z,{children:["x",e.quantity]}),(0,c.jsx)(O,{children:(0,l.vv)(e.revenue,G)})]},`${e.name}-${n}`))]})]}),he.orders>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(M,{}),(0,c.jsxs)(D,{children:[(0,c.jsx)(T,{children:"STAFF MEALS (NON-REVENUE)"}),(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"Staff Meal Orders"}),(0,c.jsx)(O,{children:he.orders})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(B,{children:"Staff Meal Value"}),(0,c.jsx)(O,{children:(0,l.vv)(he.revenue,G)})]})]})]}),(0,c.jsxs)(N,{children:[(0,c.jsx)("div",{children:"--- End of Daily Settlement ---"}),(0,c.jsx)("div",{children:q.name})]})]}):(0,c.jsxs)(R,{children:["No sales data for ",P(U)]}),!Q&&K&&se>0&&(0,c.jsxs)(A,{className:"no-print",children:[(0,c.jsx)(w,{onClick:V,children:"Close"}),(0,c.jsxs)(w,{primary:!0,onClick:()=>{window.print()},children:[(0,c.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,c.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Print"]})]})]}),(0,c.jsx)("style",{children:"\n        @media print {\n          @page {\n            size: 80mm auto;\n            margin: 0mm;\n          }\n\n          body {\n            margin: 0;\n            padding: 0;\n            background: white;\n          }\n\n          body > *:not([data-print-bill]) {\n            display: none !important;\n          }\n\n          .no-print {\n            display: none !important;\n          }\n\n          [data-print-bill] {\n            display: block !important;\n            width: 80mm !important;\n            max-width: 80mm !important;\n            margin: 0 !important;\n            padding: 5mm !important;\n            background: white !important;\n          }\n\n          [data-print-bill] button {\n            display: none !important;\n          }\n        }\n      "})]}),document.body)}}}]);