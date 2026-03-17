"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3577],{3577:(e,t,n)=>{n.d(t,{A:()=>V});var i=n(9950),r=n(7119),o=n(4752),s=n(1367),d=n(9018),l=n(6038),a=n(8285),c=n(5863),x=n(4414);const p={dine_in:"Dine In","dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pickup",delivery:"Delivery"},h={pos:"POS",mobile:"Mobile Order"},u={visa:"Visa",mastercard:"Mastercard",master:"Mastercard",amex:"Amex",other:"Other",unspecified:"Unspecified"},v=o.Ay.div`
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
`,g=o.Ay.div`
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
`,m=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;

  @media print {
    display: none;
  }
`,y=o.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,j=o.Ay.button`
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
`,f=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  flex-wrap: wrap;

  @media print {
    display: none;
  }
`,b=o.Ay.button`
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
`,w=o.Ay.input`
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
`,S=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;

  @media print {
    display: none;
  }
`,A=o.Ay.button`
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
`,E=o.Ay.div`
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
`,C=o.Ay.div`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 2px solid #1F2937;
`,T=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 4px;

  @media print {
    font-size: 14px;
  }
`,D=o.Ay.div`
  font-size: 11px;
  color: #4B5563;
  line-height: 1.4;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,F=o.Ay.div`
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
`,$=o.Ay.div`
  margin-bottom: 12px;
`,O=o.Ay.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 11px;
  }
`,k=o.Ay.div`
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
`,M=o.Ay.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
`,L=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`,N=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  min-width: 36px;
  color: #6B7280;

  @media print {
    color: #1F2937;
  }
`,z=o.Ay.div`
  border-bottom: ${e=>"double"===e.style_type?"3px double #1F2937":"solid"===e.style_type?"1px solid #9CA3AF":"1px dashed #9CA3AF"};
  margin: 8px 0;
`,R=o.Ay.div`
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
`,B=o.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,P=o.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,q=e=>(new Date).toLocaleDateString("en-CA",{timeZone:e}),I=e=>{const[t,n,i]=e.split("-");return`${parseInt(i)} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(n)-1]} ${t}`},V=e=>{var t,n;let{isOpen:o,onClose:V}=e;const{user:Y}=(0,s.As)(),{storeSettings:_,operationSettings:G,paymentSettings:U}=(0,d.Pj)(),H=G.timeZone||"Asia/Kuala_Lumpur",Z=G.currency,[J,K]=(0,i.useState)(q(H)),[Q,W]=(0,i.useState)(null),[X,ee]=(0,i.useState)(!1),te=(0,i.useCallback)(async e=>{if(null===Y||void 0===Y||!Y.restaurantId)return;const t=localStorage.getItem("auth_token");if(t){ee(!0);try{const n=await fetch(`/api/dashboard/restaurant/${Y.restaurantId}/reports-summary?startDate=${e}&endDate=${e}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&W(e.data)}}catch(n){console.error("Error fetching settlement data:",n)}finally{ee(!1)}}},[null===Y||void 0===Y?void 0:Y.restaurantId]);(0,i.useEffect)(()=>{o&&te(J)},[o,J,te]);const ne=(0,i.useCallback)(()=>{var e,t;if(!Q||!Q.settlement)return"";const n=Q.settlement,i=(null===(e=Q.summary)||void 0===e?void 0:e.totalOrders)||0,r=(null===(t=Q.summary)||void 0===t?void 0:t.averageOrderValue)||0,o=e=>(0,l.vv)(e,Z),s=U||void 0,d=(Q.paymentMethodSales||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,t)=>t.revenue-e.revenue),c=(Q.cardTypeSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),x=(Q.orderTypeSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),v=(Q.sourceSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),g=(Q.categorySales||[]).filter(e=>e.revenue>0).sort((e,t)=>t.revenue-e.revenue),m=(Q.menuSales||[]).filter(e=>e.quantity>0).sort((e,t)=>t.quantity-e.quantity).slice(0,10),y=Q.staffMeal||{revenue:0,orders:0},j=d.reduce((e,t)=>e+t.revenue,0),f=(new Date).toLocaleString("en-GB",{timeZone:H,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}),b=(e,t,n)=>`<div style="${["display:flex","justify-content:space-between","align-items:baseline","padding:"+(null!==n&&void 0!==n&&n.total?"8px 0 4px 0":"2px 0"),"font-weight:"+(null!==n&&void 0!==n&&n.bold||null!==n&&void 0!==n&&n.total?700:600),"font-size:"+(null!==n&&void 0!==n&&n.total?"16px":"14px"),null!==n&&void 0!==n&&n.total?"border-top:2px solid #000; margin-top:8px":"",null!==n&&void 0!==n&&n.indent?"padding-left:16px":"",null!==n&&void 0!==n&&n.negative?"color:#DC2626":""].filter(Boolean).join(";")}"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:8px">${e}</span>${null!==n&&void 0!==n&&n.count?`<span style="text-align:right;white-space:nowrap;min-width:36px;margin:0 4px">${n.count}</span>`:""}<span style="text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums">${t}</span></div>`,w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"dashed";return`<div style="border-bottom:${"double"===e?"3px double #000":"solid"===e?"1px solid #666":"1px dashed #666"};margin:8px 0"></div>`},S=e=>`<div style="font-weight:700;font-size:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px dashed #666">${e}</div>`;let A=`<div style="font-size:18px;font-weight:900;letter-spacing:1px;margin-bottom:4px">${_.name}</div>`;const E=[];_.address&&E.push(_.address),(_.city||_.state)&&E.push([_.city,_.state,_.postalCode].filter(Boolean).join(", ")),_.phone&&E.push(`Tel: ${_.phone}`);const C=[];_.businessRegistration&&C.push(`Reg No: ${_.businessRegistration}`),_.gstRegNo&&C.push(`Tax No: ${_.gstRegNo}`),C.length>0&&E.push(C.join(" | ")),A+=`<div style="font-size:11px;line-height:1.4">${E.join("<br>")}</div>`;let T="";if(T+=`<div style="text-align:center;padding-bottom:12px;margin-bottom:12px;border-bottom:2px solid #000">${A}</div>`,T+='<div style="text-align:center;font-size:16px;font-weight:900;letter-spacing:2px;margin:12px 0;padding:8px 0;border-top:1px dashed #666;border-bottom:1px dashed #666">DAILY SETTLEMENT</div>',T+=b("Date:",I(J)),T+=b("Printed:",f),T+=w("double"),T+=S("SALES SUMMARY"),T+=b("Gross Sales",o(n.grossSales)),n.totalDiscount>0&&(T+=b("(-) Discount",o(n.totalDiscount))),n.totalCouponDiscount>0&&(T+=b("(-) Coupon Discount",o(n.totalCouponDiscount))),n.totalPointDiscount>0&&(T+=b("(-) Point Discount",o(n.totalPointDiscount))),n.totalTakeawayCharge>0&&(T+=b("(+) Takeaway Charge",o(n.totalTakeawayCharge))),n.totalDeliveryFee>0&&(T+=b("(+) Delivery Fee",o(n.totalDeliveryFee))),n.totalServiceCharge>0&&(T+=b("(+) Service Charge",o(n.totalServiceCharge))),n.totalTax>0&&(T+=b("(+) Tax",o(n.totalTax))),T+=b("NET SALES",o(n.netSales),{total:!0}),T+=w("dashed"),T+=b("Total Orders",String(i)),T+=b("Avg Order Value",o(r)),n.cancelledOrders>0&&(T+=w("dashed"),T+=b("Cancelled Orders",o(n.cancelledAmount),{negative:!0,count:String(n.cancelledOrders)})),n.outstandingOrders>0&&(T+=b("Outstanding Orders",o(n.outstandingAmount),{negative:!0,count:String(n.outstandingOrders)})),T+=w("double"),d.length>0&&(T+=S("PAYMENT SETTLEMENT"),d.forEach(e=>{T+=b((0,a._M)(e.method,s),o(e.revenue),{count:`x${e.orders}`}),"card"===e.method&&c.length>0&&c.forEach((e,t)=>{const n=t<c.length-1?"\u251c":"\u2514";T+=b(`${n} ${u[e.type]||e.type}`,o(e.revenue),{indent:!0,count:`x${e.orders}`})})}),T+=b("TOTAL COLLECTED",o(j),{total:!0}),T+=w()),v.length>0&&(T+=S("ORDER SOURCE"),v.forEach(e=>{T+=b(h[e.source]||e.source,o(e.revenue),{count:`x${e.orders}`})}),T+=w()),x.length>0&&(T+=S("ORDER TYPE"),x.forEach(e=>{T+=b(p[e.type]||e.type,o(e.revenue),{count:`x${e.orders}`})}),T+=w()),g.length>0){T+=S("SALES BY CATEGORY"),g.forEach(e=>{T+=b(e.category,o(e.revenue),{count:`${e.quantity}qty`})});const e=g.reduce((e,t)=>e+t.quantity,0),t=g.reduce((e,t)=>e+t.revenue,0);T+=b("Total",o(t),{bold:!0,count:`${e}qty`})}return m.length>0&&(T+=w("dashed"),T+=S("TOP SELLING ITEMS"),m.forEach(e=>{T+=b(e.name,o(e.revenue),{count:`x${e.quantity}`})})),y.orders>0&&(T+=w(),T+=S("STAFF MEALS (NON-REVENUE)"),T+=b("Staff Meal Orders",String(y.orders)),T+=b("Staff Meal Value",o(y.revenue))),T+=`<div style="text-align:center;margin-top:16px;padding-top:12px;border-top:1px dashed #666;font-size:11px;line-height:1.6">\n      <div>--- End of Daily Settlement ---</div>\n      <div>${_.name}</div>\n    </div>`,`<!DOCTYPE html>\n    <html><head><meta charset="UTF-8"><title>Daily Settlement - ${I(J)}</title>\n    <style>\n      @page { size: 80mm auto; margin: 0; }\n      @media print { body { margin: 0; padding: 0; } .no-print { display: none; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }\n      body { font-family: 'Lucida Console', 'Courier New', monospace; font-size: 14px; font-weight: 600; color: #000; width: 80mm; max-width: 80mm; margin: 0 auto; padding: 5mm; box-sizing: border-box; -webkit-font-smoothing: none; letter-spacing: 0.3px; }\n    </style></head><body>${T}</body></html>`},[Q,J,Z,_,U,H]),ie=e=>{K(e)};if(!o)return null;const re=q(H),oe=(e=>{const t=new Date;return t.setDate(t.getDate()-1),t.toLocaleDateString("en-CA",{timeZone:e})})(H),se=null===Q||void 0===Q?void 0:Q.settlement,de=(null===Q||void 0===Q||null===(t=Q.summary)||void 0===t?void 0:t.totalOrders)||0,le=(null===Q||void 0===Q||null===(n=Q.summary)||void 0===n?void 0:n.averageOrderValue)||0,ae=((null===Q||void 0===Q?void 0:Q.paymentMethodSales)||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,t)=>t.revenue-e.revenue),ce=((null===Q||void 0===Q?void 0:Q.cardTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),xe=((null===Q||void 0===Q?void 0:Q.orderTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),pe=((null===Q||void 0===Q?void 0:Q.sourceSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),he=((null===Q||void 0===Q?void 0:Q.categorySales)||[]).filter(e=>e.revenue>0).sort((e,t)=>t.revenue-e.revenue),ue=((null===Q||void 0===Q?void 0:Q.menuSales)||[]).filter(e=>e.quantity>0).sort((e,t)=>t.quantity-e.quantity).slice(0,10),ve=(null===Q||void 0===Q?void 0:Q.staffMeal)||{revenue:0,orders:0},ge=ae.reduce((e,t)=>e+t.revenue,0),me=(new Date).toLocaleString("en-GB",{timeZone:H,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return r.createPortal((0,x.jsx)(v,{onClick:e=>{e.target===e.currentTarget&&V()},children:(0,x.jsxs)(g,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(m,{className:"no-print",children:[(0,x.jsx)(y,{children:"Daily Settlement Report"}),(0,x.jsx)(j,{onClick:V,children:"\xd7"})]}),(0,x.jsxs)(f,{className:"no-print",children:[(0,x.jsx)(b,{active:J===re,onClick:()=>ie(re),children:"Today"}),(0,x.jsx)(b,{active:J===oe,onClick:()=>ie(oe),children:"Yesterday"}),(0,x.jsx)(w,{type:"date",value:J,max:re,onChange:e=>ie(e.target.value)})]}),X?(0,x.jsx)(B,{children:"Loading settlement data..."}):Q&&0!==de?(0,x.jsxs)(E,{children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(T,{children:_.name}),(0,x.jsxs)(D,{children:[_.address&&(0,x.jsx)("div",{children:_.address}),(_.city||_.state)&&(0,x.jsx)("div",{children:[_.city,_.state,_.postalCode].filter(Boolean).join(", ")}),_.phone&&(0,x.jsxs)("div",{children:["Tel: ",_.phone]}),(_.businessRegistration||_.gstRegNo)&&(0,x.jsxs)("div",{children:[_.businessRegistration&&(0,x.jsxs)(x.Fragment,{children:["Reg No: ",_.businessRegistration]}),_.businessRegistration&&_.gstRegNo&&" | ",_.gstRegNo&&(0,x.jsxs)(x.Fragment,{children:["Tax No: ",_.gstRegNo]})]})]})]}),(0,x.jsx)(F,{children:"DAILY SETTLEMENT"}),(0,x.jsxs)($,{children:[(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"Date:"}),(0,x.jsx)(L,{children:I(J)})]}),(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"Printed:"}),(0,x.jsx)(L,{children:me})]})]}),(0,x.jsx)(z,{style_type:"double"}),(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:"SALES SUMMARY"}),(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"Gross Sales"}),(0,x.jsx)(L,{children:(0,l.vv)((null===se||void 0===se?void 0:se.grossSales)||0,Z)})]}),((null===se||void 0===se?void 0:se.totalDiscount)||0)>0&&(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"(-) Discount"}),(0,x.jsx)(L,{children:(0,l.vv)(se.totalDiscount,Z)})]}),((null===se||void 0===se?void 0:se.totalCouponDiscount)||0)>0&&(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"(-) Coupon Discount"}),(0,x.jsx)(L,{children:(0,l.vv)(se.totalCouponDiscount,Z)})]}),((null===se||void 0===se?void 0:se.totalPointDiscount)||0)>0&&(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"(-) Point Discount"}),(0,x.jsx)(L,{children:(0,l.vv)(se.totalPointDiscount,Z)})]}),((null===se||void 0===se?void 0:se.totalTakeawayCharge)||0)>0&&(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"(+) Takeaway Charge"}),(0,x.jsx)(L,{children:(0,l.vv)(se.totalTakeawayCharge,Z)})]}),((null===se||void 0===se?void 0:se.totalDeliveryFee)||0)>0&&(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"(+) Delivery Fee"}),(0,x.jsx)(L,{children:(0,l.vv)(se.totalDeliveryFee,Z)})]}),((null===se||void 0===se?void 0:se.totalServiceCharge)||0)>0&&(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"(+) Service Charge"}),(0,x.jsx)(L,{children:(0,l.vv)(se.totalServiceCharge,Z)})]}),((null===se||void 0===se?void 0:se.totalTax)||0)>0&&(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"(+) Tax"}),(0,x.jsx)(L,{children:(0,l.vv)(se.totalTax,Z)})]}),(0,x.jsxs)(k,{total:!0,children:[(0,x.jsx)(M,{children:"NET SALES"}),(0,x.jsx)(L,{children:(0,l.vv)((null===se||void 0===se?void 0:se.netSales)||0,Z)})]}),(0,x.jsx)(z,{style_type:"dashed"}),(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"Total Orders"}),(0,x.jsx)(L,{children:de})]}),(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"Avg Order Value"}),(0,x.jsx)(L,{children:(0,l.vv)(le,Z)})]}),((null===se||void 0===se?void 0:se.cancelledOrders)||0)>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(z,{style_type:"dashed"}),(0,x.jsxs)(k,{negative:!0,children:[(0,x.jsx)(M,{children:"Cancelled Orders"}),(0,x.jsx)(N,{children:se.cancelledOrders}),(0,x.jsx)(L,{children:(0,l.vv)(se.cancelledAmount,Z)})]})]}),((null===se||void 0===se?void 0:se.outstandingOrders)||0)>0&&(0,x.jsxs)(k,{negative:!0,children:[(0,x.jsx)(M,{children:"Outstanding Orders"}),(0,x.jsx)(N,{children:se.outstandingOrders}),(0,x.jsx)(L,{children:(0,l.vv)(se.outstandingAmount,Z)})]})]}),(0,x.jsx)(z,{style_type:"double"}),ae.length>0&&(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:"PAYMENT SETTLEMENT"}),ae.map(e=>(0,x.jsxs)(i.Fragment,{children:[(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:(0,a._M)(e.method,U||void 0)}),(0,x.jsxs)(N,{children:["x",e.orders]}),(0,x.jsx)(L,{children:(0,l.vv)(e.revenue,Z)})]}),"card"===e.method&&ce.length>0&&ce.map((e,t)=>(0,x.jsxs)(k,{indent:!0,children:[(0,x.jsxs)(M,{children:[t<ce.length-1?"\u251c":"\u2514"," ",u[e.type]||e.type]}),(0,x.jsxs)(N,{children:["x",e.orders]}),(0,x.jsx)(L,{children:(0,l.vv)(e.revenue,Z)})]},e.type))]},e.method)),(0,x.jsxs)(k,{total:!0,children:[(0,x.jsx)(M,{children:"TOTAL COLLECTED"}),(0,x.jsx)(L,{children:(0,l.vv)(ge,Z)})]})]}),(0,x.jsx)(z,{}),pe.length>0&&(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:"ORDER SOURCE"}),pe.map(e=>(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:h[e.source]||e.source}),(0,x.jsxs)(N,{children:["x",e.orders]}),(0,x.jsx)(L,{children:(0,l.vv)(e.revenue,Z)})]},e.source))]}),(0,x.jsx)(z,{}),xe.length>0&&(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:"ORDER TYPE"}),xe.map(e=>(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:p[e.type]||e.type}),(0,x.jsxs)(N,{children:["x",e.orders]}),(0,x.jsx)(L,{children:(0,l.vv)(e.revenue,Z)})]},e.type))]}),(0,x.jsx)(z,{}),he.length>0&&(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:"SALES BY CATEGORY"}),he.map(e=>(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:e.category}),(0,x.jsxs)(N,{children:[e.quantity,"qty"]}),(0,x.jsx)(L,{children:(0,l.vv)(e.revenue,Z)})]},e.category)),(0,x.jsxs)(k,{bold:!0,children:[(0,x.jsx)(M,{children:"Total"}),(0,x.jsxs)(N,{children:[he.reduce((e,t)=>e+t.quantity,0),"qty"]}),(0,x.jsx)(L,{children:(0,l.vv)(he.reduce((e,t)=>e+t.revenue,0),Z)})]})]}),ue.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(z,{style_type:"dashed"}),(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:"TOP SELLING ITEMS"}),ue.map((e,t)=>(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:e.name}),(0,x.jsxs)(N,{children:["x",e.quantity]}),(0,x.jsx)(L,{children:(0,l.vv)(e.revenue,Z)})]},`${e.name}-${t}`))]})]}),ve.orders>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(z,{}),(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:"STAFF MEALS (NON-REVENUE)"}),(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"Staff Meal Orders"}),(0,x.jsx)(L,{children:ve.orders})]}),(0,x.jsxs)(k,{children:[(0,x.jsx)(M,{children:"Staff Meal Value"}),(0,x.jsx)(L,{children:(0,l.vv)(ve.revenue,Z)})]})]})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)("div",{children:"--- End of Daily Settlement ---"}),(0,x.jsx)("div",{children:_.name})]})]}):(0,x.jsxs)(P,{children:["No sales data for ",I(J)]}),!X&&Q&&de>0&&(0,x.jsxs)(S,{className:"no-print",children:[(0,x.jsx)(A,{onClick:V,children:"Close"}),(0,x.jsxs)(A,{primary:!0,onClick:()=>{const e=ne();e&&(0,c.Q_)(e,"Daily Settlement")},children:[(0,x.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Print"]})]})]})}),document.body)}}}]);