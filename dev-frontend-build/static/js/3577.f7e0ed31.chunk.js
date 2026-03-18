"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3577],{3577:(e,t,n)=>{n.d(t,{A:()=>Y});var i=n(9950),r=n(7119),o=n(4752),s=n(1367),d=n(9018),l=n(6038),a=n(8285),c=n(5863),p=n(4414);const x={dine_in:"Dine In","dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pickup",delivery:"Delivery"},h={pos:"POS",mobile:"Mobile Order"},u={visa:"Visa",mastercard:"Mastercard",master:"Mastercard",amex:"Amex",other:"Other",unspecified:"Unspecified"},v=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;

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
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

  @media print {
    max-width: none;
    max-height: none;
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
`,f=o.Ay.button`
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
`,j=o.Ay.div`
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
`,A=o.Ay.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;

  @media print {
    overflow: visible;
  }
`,C=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;
  flex-shrink: 0;

  @media print {
    display: none;
  }
`,S=o.Ay.button`
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
`,T=o.Ay.div`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 2px solid #1F2937;
`,D=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 4px;

  @media print {
    font-size: 14px;
  }
`,F=o.Ay.div`
  font-size: 11px;
  color: #4B5563;
  line-height: 1.4;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,$=o.Ay.div`
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
`,O=o.Ay.div`
  margin-bottom: 12px;
`,k=o.Ay.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 11px;
  }
`,L=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.total?"8px 0 4px 0":"2px 0"};
  font-weight: ${e=>e.bold||e.total?700:400};
  font-size: ${e=>e.total?"14px":"12px"};
  border-top: ${e=>e.total?"2px solid #1F2937":"none"};
  margin-top: ${e=>e.total?"8px":"0"};
  padding-left: ${e=>e.indent?"16px":"0"};
  font-weight: ${e=>e.negative?700:void 0};
  color: inherit;

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
`,N=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`,z=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  min-width: 36px;
  color: #6B7280;

  @media print {
    color: #1F2937;
  }
`,R=o.Ay.div`
  border-bottom: ${e=>"double"===e.style_type?"3px double #1F2937":"solid"===e.style_type?"1px solid #9CA3AF":"1px dashed #9CA3AF"};
  margin: 8px 0;
`,B=o.Ay.div`
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
`,P=o.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,V=o.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,I=e=>(new Date).toLocaleDateString("en-CA",{timeZone:e}),q=e=>{const[t,n,i]=e.split("-");return`${parseInt(i)} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(n)-1]} ${t}`},Y=e=>{var t,o;let{isOpen:Y,onClose:_}=e;const{user:G}=(0,s.As)(),{storeSettings:U,operationSettings:H,paymentSettings:Z}=(0,d.Pj)(),J=H.timeZone||"Asia/Kuala_Lumpur",W=H.currency,[K,Q]=(0,i.useState)(I(J)),[X,ee]=(0,i.useState)(null),[te,ne]=(0,i.useState)(!1),ie=(0,i.useCallback)(async e=>{if(null===G||void 0===G||!G.restaurantId)return;const t=localStorage.getItem("auth_token");if(t){ne(!0);try{const n=await fetch(`/api/dashboard/restaurant/${G.restaurantId}/reports-summary?startDate=${e}&endDate=${e}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&ee(e.data)}}catch(n){console.error("Error fetching settlement data:",n)}finally{ne(!1)}}},[null===G||void 0===G?void 0:G.restaurantId]);(0,i.useEffect)(()=>{Y&&ie(K)},[Y,K,ie]);const re=(0,i.useCallback)(()=>{var e,t;if(!X||!X.settlement)return"";const n=X.settlement,i=(null===(e=X.summary)||void 0===e?void 0:e.totalOrders)||0,r=(null===(t=X.summary)||void 0===t?void 0:t.averageOrderValue)||0,o=e=>(0,l.vv)(e,W),s=Z||void 0,d=(X.paymentMethodSales||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,t)=>t.revenue-e.revenue),c=(X.cardTypeSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),p=(X.orderTypeSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),v=(X.sourceSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),g=(X.categorySales||[]).filter(e=>e.revenue>0).sort((e,t)=>t.revenue-e.revenue),m=(X.menuSales||[]).filter(e=>e.quantity>0).sort((e,t)=>t.quantity-e.quantity).slice(0,10),y=X.staffMeal||{revenue:0,orders:0},f=d.reduce((e,t)=>e+t.revenue,0),j=(new Date).toLocaleString("en-GB",{timeZone:J,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}),b=(e,t,n)=>`<div style="${["display:flex","justify-content:space-between","align-items:baseline","padding:"+(null!==n&&void 0!==n&&n.total?"8px 0 4px 0":"2px 0"),"font-weight:"+(null!==n&&void 0!==n&&n.bold||null!==n&&void 0!==n&&n.total?700:600),"font-size:"+(null!==n&&void 0!==n&&n.total?"16px":"14px"),null!==n&&void 0!==n&&n.total?"border-top:2px solid #000; margin-top:8px":"",null!==n&&void 0!==n&&n.indent?"padding-left:16px":"",null!==n&&void 0!==n&&n.negative?"font-weight:700":""].filter(Boolean).join(";")}"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:8px">${e}</span>${null!==n&&void 0!==n&&n.count?`<span style="text-align:right;white-space:nowrap;min-width:36px;margin:0 4px">${n.count}</span>`:""}<span style="text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums">${t}</span></div>`,w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"dashed";return`<div style="border-bottom:${"double"===e?"3px double #000":"solid"===e?"1px solid #666":"1px dashed #666"};margin:8px 0"></div>`},A=e=>`<div style="font-weight:700;font-size:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px dashed #666">${e}</div>`;let C=`<div style="font-size:18px;font-weight:900;letter-spacing:1px;margin-bottom:4px">${U.name}</div>`;const S=[];U.address&&S.push(U.address),(U.city||U.state)&&S.push([U.city,U.state,U.postalCode].filter(Boolean).join(", ")),U.phone&&S.push(`Tel: ${U.phone}`);const E=[];U.businessRegistration&&E.push(`Reg No: ${U.businessRegistration}`),U.gstRegNo&&E.push(`Tax No: ${U.gstRegNo}`),E.length>0&&S.push(E.join(" | ")),C+=`<div style="font-size:11px;line-height:1.4">${S.join("<br>")}</div>`;let T="";if(T+=`<div style="text-align:center;padding-bottom:12px;margin-bottom:12px;border-bottom:2px solid #000">${C}</div>`,T+='<div style="text-align:center;font-size:16px;font-weight:900;letter-spacing:2px;margin:12px 0;padding:8px 0;border-top:1px dashed #666;border-bottom:1px dashed #666">DAILY SETTLEMENT</div>',T+=b("Date:",q(K)),T+=b("Printed:",j),T+=w("double"),T+=A("SALES SUMMARY"),T+=b("Gross Sales",o(n.grossSales)),n.totalDiscount>0&&(T+=b("(-) Discount",o(n.totalDiscount))),n.totalCouponDiscount>0&&(T+=b("(-) Coupon Discount",o(n.totalCouponDiscount))),n.totalPointDiscount>0&&(T+=b("(-) Point Discount",o(n.totalPointDiscount))),n.totalTakeawayCharge>0&&(T+=b("(+) Takeaway Charge",o(n.totalTakeawayCharge))),n.totalDeliveryFee>0&&(T+=b("(+) Delivery Fee",o(n.totalDeliveryFee))),n.totalServiceCharge>0&&(T+=b("(+) Service Charge",o(n.totalServiceCharge))),n.totalTax>0&&(T+=b("(+) Tax",o(n.totalTax))),T+=b("NET SALES",o(n.netSales),{total:!0}),T+=w("dashed"),T+=b("Total Orders",String(i)),T+=b("Avg Order Value",o(r)),n.cancelledOrders>0&&(T+=w("dashed"),T+=b("Cancelled Orders",o(n.cancelledAmount),{negative:!0,count:String(n.cancelledOrders)})),n.outstandingOrders>0&&(T+=b("Outstanding Orders",o(n.outstandingAmount),{negative:!0,count:String(n.outstandingOrders)})),T+=w("double"),d.length>0&&(T+=A("PAYMENT SETTLEMENT"),d.forEach(e=>{T+=b((0,a._M)(e.method,s),o(e.revenue),{count:`x${e.orders}`}),"card"===e.method&&c.length>0&&c.forEach((e,t)=>{const n=t<c.length-1?"\u251c":"\u2514";T+=b(`${n} ${u[e.type]||e.type}`,o(e.revenue),{indent:!0,count:`x${e.orders}`})})}),T+=b("TOTAL COLLECTED",o(f),{total:!0}),T+=w()),v.length>0&&(T+=A("ORDER SOURCE"),v.forEach(e=>{T+=b(h[e.source]||e.source,o(e.revenue),{count:`x${e.orders}`})}),T+=w()),p.length>0&&(T+=A("ORDER TYPE"),p.forEach(e=>{T+=b(x[e.type]||e.type,o(e.revenue),{count:`x${e.orders}`})}),T+=w()),g.length>0){T+=A("SALES BY CATEGORY"),g.forEach(e=>{T+=b(e.category,o(e.revenue),{count:`${e.quantity}qty`})});const e=g.reduce((e,t)=>e+t.quantity,0),t=g.reduce((e,t)=>e+t.revenue,0);T+=b("Total",o(t),{bold:!0,count:`${e}qty`})}return m.length>0&&(T+=w("dashed"),T+=A("TOP SELLING ITEMS"),m.forEach(e=>{T+=b(e.name,o(e.revenue),{count:`x${e.quantity}`})})),y.orders>0&&(T+=w(),T+=A("STAFF MEALS (NON-REVENUE)"),T+=b("Staff Meal Orders",String(y.orders)),T+=b("Staff Meal Value",o(y.revenue))),T+=`<div style="text-align:center;margin-top:16px;padding-top:12px;border-top:1px dashed #666;font-size:11px;line-height:1.6">\n      <div>--- End of Daily Settlement ---</div>\n      <div>${U.name}</div>\n    </div>`,`<!DOCTYPE html>\n    <html><head><meta charset="UTF-8"><title>Daily Settlement - ${q(K)}</title>\n    <style>\n      @page { size: 80mm auto; margin: 0; }\n      @media print { body { margin: 0; padding: 0; } .no-print { display: none; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }\n      body { font-family: 'Lucida Console', 'Courier New', monospace; font-size: 14px; font-weight: 600; color: #000; width: 80mm; max-width: 80mm; margin: 0 auto; padding: 5mm; box-sizing: border-box; -webkit-font-smoothing: none; letter-spacing: 0.3px; }\n    </style></head><body>${T}</body></html>`},[X,K,W,U,Z,J]),oe=e=>{Q(e)};if(!Y)return null;const se=I(J),de=(e=>{const t=new Date;return t.setDate(t.getDate()-1),t.toLocaleDateString("en-CA",{timeZone:e})})(J),le=null===X||void 0===X?void 0:X.settlement,ae=(null===X||void 0===X||null===(t=X.summary)||void 0===t?void 0:t.totalOrders)||0,ce=(null===X||void 0===X||null===(o=X.summary)||void 0===o?void 0:o.averageOrderValue)||0,pe=((null===X||void 0===X?void 0:X.paymentMethodSales)||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,t)=>t.revenue-e.revenue),xe=((null===X||void 0===X?void 0:X.cardTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),he=((null===X||void 0===X?void 0:X.orderTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),ue=((null===X||void 0===X?void 0:X.sourceSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),ve=((null===X||void 0===X?void 0:X.categorySales)||[]).filter(e=>e.revenue>0).sort((e,t)=>t.revenue-e.revenue),ge=((null===X||void 0===X?void 0:X.menuSales)||[]).filter(e=>e.quantity>0).sort((e,t)=>t.quantity-e.quantity).slice(0,10),me=(null===X||void 0===X?void 0:X.staffMeal)||{revenue:0,orders:0},ye=pe.reduce((e,t)=>e+t.revenue,0),fe=(new Date).toLocaleString("en-GB",{timeZone:J,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return r.createPortal((0,p.jsx)(v,{onClick:e=>{e.target===e.currentTarget&&_()},children:(0,p.jsxs)(g,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(m,{className:"no-print",children:[(0,p.jsx)(y,{children:"Daily Settlement Report"}),(0,p.jsx)(f,{onClick:_,children:"\xd7"})]}),(0,p.jsxs)(A,{children:[(0,p.jsxs)(j,{className:"no-print",children:[(0,p.jsx)(b,{active:K===se,onClick:()=>oe(se),children:"Today"}),(0,p.jsx)(b,{active:K===de,onClick:()=>oe(de),children:"Yesterday"}),(0,p.jsx)(w,{type:"date",value:K,max:se,onChange:e=>oe(e.target.value)})]}),te?(0,p.jsx)(P,{children:"Loading settlement data..."}):X&&0!==ae?(0,p.jsxs)(E,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(D,{children:U.name}),(0,p.jsxs)(F,{children:[U.address&&(0,p.jsx)("div",{children:U.address}),(U.city||U.state)&&(0,p.jsx)("div",{children:[U.city,U.state,U.postalCode].filter(Boolean).join(", ")}),U.phone&&(0,p.jsxs)("div",{children:["Tel: ",U.phone]}),(U.businessRegistration||U.gstRegNo)&&(0,p.jsxs)("div",{children:[U.businessRegistration&&(0,p.jsxs)(p.Fragment,{children:["Reg No: ",U.businessRegistration]}),U.businessRegistration&&U.gstRegNo&&" | ",U.gstRegNo&&(0,p.jsxs)(p.Fragment,{children:["Tax No: ",U.gstRegNo]})]})]})]}),(0,p.jsx)($,{children:"DAILY SETTLEMENT"}),(0,p.jsxs)(O,{children:[(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"Date:"}),(0,p.jsx)(N,{children:q(K)})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"Printed:"}),(0,p.jsx)(N,{children:fe})]})]}),(0,p.jsx)(R,{style_type:"double"}),(0,p.jsxs)(O,{children:[(0,p.jsx)(k,{children:"SALES SUMMARY"}),(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"Gross Sales"}),(0,p.jsx)(N,{children:(0,l.vv)((null===le||void 0===le?void 0:le.grossSales)||0,W)})]}),((null===le||void 0===le?void 0:le.totalDiscount)||0)>0&&(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"(-) Discount"}),(0,p.jsx)(N,{children:(0,l.vv)(le.totalDiscount,W)})]}),((null===le||void 0===le?void 0:le.totalCouponDiscount)||0)>0&&(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"(-) Coupon Discount"}),(0,p.jsx)(N,{children:(0,l.vv)(le.totalCouponDiscount,W)})]}),((null===le||void 0===le?void 0:le.totalPointDiscount)||0)>0&&(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"(-) Point Discount"}),(0,p.jsx)(N,{children:(0,l.vv)(le.totalPointDiscount,W)})]}),((null===le||void 0===le?void 0:le.totalTakeawayCharge)||0)>0&&(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"(+) Takeaway Charge"}),(0,p.jsx)(N,{children:(0,l.vv)(le.totalTakeawayCharge,W)})]}),((null===le||void 0===le?void 0:le.totalDeliveryFee)||0)>0&&(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"(+) Delivery Fee"}),(0,p.jsx)(N,{children:(0,l.vv)(le.totalDeliveryFee,W)})]}),((null===le||void 0===le?void 0:le.totalServiceCharge)||0)>0&&(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"(+) Service Charge"}),(0,p.jsx)(N,{children:(0,l.vv)(le.totalServiceCharge,W)})]}),((null===le||void 0===le?void 0:le.totalTax)||0)>0&&(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"(+) Tax"}),(0,p.jsx)(N,{children:(0,l.vv)(le.totalTax,W)})]}),(0,p.jsxs)(L,{total:!0,children:[(0,p.jsx)(M,{children:"NET SALES"}),(0,p.jsx)(N,{children:(0,l.vv)((null===le||void 0===le?void 0:le.netSales)||0,W)})]}),(0,p.jsx)(R,{style_type:"dashed"}),(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"Total Orders"}),(0,p.jsx)(N,{children:ae})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"Avg Order Value"}),(0,p.jsx)(N,{children:(0,l.vv)(ce,W)})]}),((null===le||void 0===le?void 0:le.cancelledOrders)||0)>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(R,{style_type:"dashed"}),(0,p.jsxs)(L,{negative:!0,children:[(0,p.jsx)(M,{children:"Cancelled Orders"}),(0,p.jsx)(z,{children:le.cancelledOrders}),(0,p.jsx)(N,{children:(0,l.vv)(le.cancelledAmount,W)})]})]}),((null===le||void 0===le?void 0:le.outstandingOrders)||0)>0&&(0,p.jsxs)(L,{negative:!0,children:[(0,p.jsx)(M,{children:"Outstanding Orders"}),(0,p.jsx)(z,{children:le.outstandingOrders}),(0,p.jsx)(N,{children:(0,l.vv)(le.outstandingAmount,W)})]})]}),(0,p.jsx)(R,{style_type:"double"}),pe.length>0&&(0,p.jsxs)(O,{children:[(0,p.jsx)(k,{children:"PAYMENT SETTLEMENT"}),pe.map(e=>(0,p.jsxs)(i.Fragment,{children:[(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:(0,a._M)(e.method,Z||void 0)}),(0,p.jsxs)(z,{children:["x",e.orders]}),(0,p.jsx)(N,{children:(0,l.vv)(e.revenue,W)})]}),"card"===e.method&&xe.length>0&&xe.map((e,t)=>(0,p.jsxs)(L,{indent:!0,children:[(0,p.jsxs)(M,{children:[t<xe.length-1?"\u251c":"\u2514"," ",u[e.type]||e.type]}),(0,p.jsxs)(z,{children:["x",e.orders]}),(0,p.jsx)(N,{children:(0,l.vv)(e.revenue,W)})]},e.type))]},e.method)),(0,p.jsxs)(L,{total:!0,children:[(0,p.jsx)(M,{children:"TOTAL COLLECTED"}),(0,p.jsx)(N,{children:(0,l.vv)(ye,W)})]})]}),(0,p.jsx)(R,{}),ue.length>0&&(0,p.jsxs)(O,{children:[(0,p.jsx)(k,{children:"ORDER SOURCE"}),ue.map(e=>(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:h[e.source]||e.source}),(0,p.jsxs)(z,{children:["x",e.orders]}),(0,p.jsx)(N,{children:(0,l.vv)(e.revenue,W)})]},e.source))]}),(0,p.jsx)(R,{}),he.length>0&&(0,p.jsxs)(O,{children:[(0,p.jsx)(k,{children:"ORDER TYPE"}),he.map(e=>(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:x[e.type]||e.type}),(0,p.jsxs)(z,{children:["x",e.orders]}),(0,p.jsx)(N,{children:(0,l.vv)(e.revenue,W)})]},e.type))]}),(0,p.jsx)(R,{}),ve.length>0&&(0,p.jsxs)(O,{children:[(0,p.jsx)(k,{children:"SALES BY CATEGORY"}),ve.map(e=>(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:e.category}),(0,p.jsxs)(z,{children:[e.quantity,"qty"]}),(0,p.jsx)(N,{children:(0,l.vv)(e.revenue,W)})]},e.category)),(0,p.jsxs)(L,{bold:!0,children:[(0,p.jsx)(M,{children:"Total"}),(0,p.jsxs)(z,{children:[ve.reduce((e,t)=>e+t.quantity,0),"qty"]}),(0,p.jsx)(N,{children:(0,l.vv)(ve.reduce((e,t)=>e+t.revenue,0),W)})]})]}),ge.length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(R,{style_type:"dashed"}),(0,p.jsxs)(O,{children:[(0,p.jsx)(k,{children:"TOP SELLING ITEMS"}),ge.map((e,t)=>(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:e.name}),(0,p.jsxs)(z,{children:["x",e.quantity]}),(0,p.jsx)(N,{children:(0,l.vv)(e.revenue,W)})]},`${e.name}-${t}`))]})]}),me.orders>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(R,{}),(0,p.jsxs)(O,{children:[(0,p.jsx)(k,{children:"STAFF MEALS (NON-REVENUE)"}),(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"Staff Meal Orders"}),(0,p.jsx)(N,{children:me.orders})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(M,{children:"Staff Meal Value"}),(0,p.jsx)(N,{children:(0,l.vv)(me.revenue,W)})]})]})]}),(0,p.jsxs)(B,{children:[(0,p.jsx)("div",{children:"--- End of Daily Settlement ---"}),(0,p.jsx)("div",{children:U.name})]})]}):(0,p.jsxs)(V,{children:["No sales data for ",q(K)]})]}),!te&&X&&ae>0&&(0,p.jsxs)(C,{className:"no-print",children:[(0,p.jsx)(S,{onClick:_,children:"Close"}),(0,p.jsxs)(S,{onClick:async()=>{const e=re();if(e)try{const{default:t}=await n.e(5612).then(n.bind(n,5612)),{default:i}=await n.e(1052).then(n.t.bind(n,1052,23)),r=document.createElement("div");r.style.position="absolute",r.style.left="-9999px",r.style.top="0",r.style.width="302px",r.style.background="white",r.innerHTML=e.replace(/<html>|<\/html>|<head>.*?<\/head>|<body>|<\/body>|<!DOCTYPE[^>]*>/gs,""),document.body.appendChild(r);const o=await i(r,{scale:2,width:302,windowWidth:302,backgroundColor:"#ffffff"});document.body.removeChild(r);const s=80,d=o.height*s/o.width,l=new t({orientation:"portrait",unit:"mm",format:[s,d]});l.addImage(o.toDataURL("image/png"),"PNG",0,0,s,d),l.save(`settlement-${K}.pdf`)}catch(t){console.error("PDF download error:",t)}},children:[(0,p.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,p.jsx)("path",{d:"M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"PDF Download"]}),(0,p.jsxs)(S,{primary:!0,onClick:()=>{const e=re();e&&(0,c.v3)(e)},children:[(0,p.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,p.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Print"]})]})]})}),document.body)}}}]);