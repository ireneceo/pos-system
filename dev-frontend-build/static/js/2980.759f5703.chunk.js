"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2980],{1840:(e,t,r)=>{r.d(t,{ff:()=>i});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const s="";n();async function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r=`${s}${e}`,n={credentials:"include",headers:{"Content-Type":"application/json",...t.headers},...t},i=await fetch(r,n);if(!i.ok){const e=await i.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${i.status}`)}return i.json()}},2488:(e,t,r)=>{r.d(t,{DO:()=>c,Jt:()=>l,Qn:()=>d});r(9950);var n=r(4752),s=r(4414);const i=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,a=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,o=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,d=e=>{let{children:t,className:r,style:n,...a}=e;return(0,s.jsx)(i,{className:r,style:n,...a,children:t})},c=e=>{let{placeholder:t="Search...",...r}=e;return(0,s.jsx)(a,{placeholder:t,...r})},l=e=>{let{children:t,...r}=e;return(0,s.jsx)(o,{...r,children:t})}},2980:(e,t,r)=>{r.r(t),r.d(t,{default:()=>q});var n=r(9950),s=r(4752),i=r(3310),a=r(3705),o=r(7492),d=r(2488),c=r(1367),l=r(9610),x=r(4021),h=r(6038),u=r(1840),p=r(4414);const g=s.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,j=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,y=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 16px;
`,m=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #635BFF;
  }
`,f=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,b=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,v=s.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #D1FAE5; color: #059669;"}}}
`,w=s.Ay.div`
  margin: 16px 0;
`,k=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,F=s.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,A=s.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,C=s.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,S=s.Ay.button`
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover { background: #4F46E5; }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover { background: #FCA5A5; }\n        ";default:return"\n          background: #F3F4F6;\n          color: #374151;\n          &:hover { background: #E5E7EB; }\n        "}}}
`,E=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,_=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${e=>"out_of_stock"===e.type?"#FEF2F2":"#FFFBEB"};
  border: 1px solid ${e=>"out_of_stock"===e.type?"#FECACA":"#FED7AA"};
  border-radius: 8px;
`,B=s.Ay.div`
  flex: 1;
`,D=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,$=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,R=s.Ay.div`
  display: flex;
  gap: 8px;
`,z=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E6EBF1;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #E6EBF1;
  }

  th {
    background: #F9FAFB;
    font-weight: 600;
    font-size: 13px;
    color: #374151;
  }

  td {
    font-size: 14px;
    color: #0A2540;
  }

  tr:last-child td {
    border-bottom: none;
  }
`,O=s.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${e=>{switch(e.level){case"critical":return"background: #DC2626; color: white;";case"high":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,I=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,U=s.Ay.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7280;
`,T=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,N=s.Ay.div`
  display: flex;
  gap: 4px;
  background: #F3F4F6;
  padding: 4px;
  border-radius: 8px;
  margin-bottom: 24px;
`,L=s.Ay.button`
  padding: 10px 20px;
  border: none;
  background: ${e=>e.active?"white":"transparent"};
  color: ${e=>e.active?"#635BFF":"#6B7280"};
  font-weight: 600;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${e=>e.active?"0 1px 3px rgba(0,0,0,0.1)":"none"};

  &:hover {
    color: ${e=>e.active?"#635BFF":"#374151"};
  }
`,Q=e=>{let{restaurantId:t,currency:r}=e;const[s,i]=(0,n.useState)([]),[a,o]=(0,n.useState)(!0);(0,n.useEffect)(()=>{(async()=>{try{const e=await(0,u.ff)(`/api/restaurants/${t}/inventory/transactions?limit=50`);e.success&&i(e.data)}catch(e){console.error("Failed to fetch transactions:",e)}finally{o(!1)}})()},[t]);const d=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},c=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return a?(0,p.jsx)(U,{children:"Loading transactions..."}):0===s.length?(0,p.jsx)(U,{children:"No transactions recorded yet."}):(0,p.jsxs)(z,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Date"}),(0,p.jsx)("th",{children:"Ingredient"}),(0,p.jsx)("th",{children:"Type"}),(0,p.jsx)("th",{children:"Change"}),(0,p.jsx)("th",{children:"After"}),(0,p.jsx)("th",{children:"Notes"})]})}),(0,p.jsx)("tbody",{children:s.map(e=>{var t;return(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{children:new Date(e.created_at).toLocaleString()}),(0,p.jsx)("td",{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"}),(0,p.jsx)("td",{children:(0,p.jsx)("span",{style:{color:c(e.transaction_type),fontWeight:600},children:d(e.transaction_type)})}),(0,p.jsxs)("td",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626"},children:[parseFloat(String(e.quantity_change))>=0?"+":"",e.quantity_change," ",e.unit]}),(0,p.jsxs)("td",{children:[e.stock_after," ",e.unit]}),(0,p.jsx)("td",{children:e.notes||"-"})]},e.id)})})]})},q=()=>{const{user:e}=(0,c.As)(),{defaultCurrency:t}=(0,x.i1)(),[r,s]=(0,n.useState)("MYR"),[q,W]=(0,n.useState)("dashboard"),[P,M]=(0,n.useState)(!0),[Z,Y]=(0,n.useState)(null),[J,H]=(0,n.useState)([]),[K,V]=(0,n.useState)([]),[G,X]=(0,n.useState)([]),[ee,te]=(0,n.useState)(""),[re,ne]=(0,n.useState)("all"),[se,ie]=(0,n.useState)(!1),[ae,oe]=(0,n.useState)(!1),[de,ce]=(0,n.useState)(!1),[le,xe]=(0,n.useState)(null),[he,ue]=(0,n.useState)(""),[pe,ge]=(0,n.useState)(""),je=null===e||void 0===e?void 0:e.restaurant_id;(0,n.useEffect)(()=>{t&&s(t)},[t]);const ye=(0,n.useCallback)(async()=>{if(je)try{M(!0);const[e,t,r,n]=await Promise.all([(0,u.ff)(`/api/restaurants/${je}/inventory/summary`),(0,u.ff)(`/api/restaurants/${je}/inventory`),(0,u.ff)(`/api/restaurants/${je}/inventory/alerts?resolved=false`),(0,u.ff)(`/api/restaurants/${je}/inventory/reorder-suggestions`)]);e.success&&Y(e.data),t.success&&H(t.data),r.success&&V(r.data),n.success&&X(n.data)}catch(e){console.error("Failed to fetch inventory data:",e)}finally{M(!1)}},[je]);(0,n.useEffect)(()=>{ye()},[ye]);const me=e=>{xe(e),ue(""),ge(""),ie(!0)},fe=J.filter(e=>{const t=e.name.toLowerCase().includes(ee.toLowerCase()),r="all"===re||e.stock_status===re;return t&&r}),be=e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}};return je?(0,p.jsxs)(i.A,{children:[(0,p.jsxs)(o.mc,{children:[(0,p.jsxs)(o.Y9,{children:[(0,p.jsx)(o.hE,{children:"Inventory"}),(0,p.jsx)(o.ex,{children:(0,p.jsx)(a.cc,{variant:"secondary",onClick:()=>window.location.href=`/restaurants/${je}/stock-take`,children:"Stock Take"})})]}),(0,p.jsxs)(N,{children:[(0,p.jsx)(L,{active:"dashboard"===q,onClick:()=>W("dashboard"),children:"Dashboard"}),(0,p.jsx)(L,{active:"list"===q,onClick:()=>W("list"),children:"Stock List"}),(0,p.jsx)(L,{active:"history"===q,onClick:()=>W("history"),children:"History"})]}),P?(0,p.jsx)(U,{children:"Loading..."}):"dashboard"===q?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(o.MD,{children:[(0,p.jsxs)(o.hI,{children:[(0,p.jsx)(o.v0,{children:"Total Ingredients"}),(0,p.jsx)(o.Os,{children:(null===Z||void 0===Z?void 0:Z.total_items)||0}),(0,p.jsx)(o.d1,{children:"managed items"})]}),(0,p.jsxs)(o.hI,{children:[(0,p.jsx)(o.v0,{children:"Low Stock"}),(0,p.jsx)(o.Os,{style:{color:"#D97706"},children:(null===Z||void 0===Z?void 0:Z.low_stock_count)||0}),(0,p.jsx)(o.d1,{children:"need attention"})]}),(0,p.jsxs)(o.hI,{children:[(0,p.jsx)(o.v0,{children:"Out of Stock"}),(0,p.jsx)(o.Os,{style:{color:"#DC2626"},children:(null===Z||void 0===Z?void 0:Z.out_of_stock_count)||0}),(0,p.jsx)(o.d1,{children:"urgent"})]}),(0,p.jsxs)(o.hI,{children:[(0,p.jsx)(o.v0,{children:"Monthly Loss"}),(0,p.jsx)(o.Os,{children:(0,h.vv)((null===Z||void 0===Z?void 0:Z.monthly_loss)||0,r)}),(0,p.jsx)(o.d1,{children:"this month"})]})]}),K.length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{children:"Stock Alerts"}),(0,p.jsx)(E,{children:K.slice(0,5).map(e=>(0,p.jsxs)(_,{type:e.alert_type,children:[(0,p.jsxs)(B,{children:[(0,p.jsx)(D,{children:e.ingredient.name}),(0,p.jsxs)($,{children:["Current: ",e.current_stock," ",e.ingredient.unit," / Min: ",e.min_stock," ",e.ingredient.unit]})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(S,{variant:"primary",onClick:()=>{const t=J.find(t=>t.id===e.ingredient_id);t&&me(t)},children:"Receive"}),(0,p.jsx)(S,{onClick:()=>(async e=>{try{(await(0,u.ff)(`/api/restaurants/${je}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&ye()}catch(t){console.error("Failed to resolve alert:",t)}})(e.id),children:"Dismiss"})]})]},e.id))})]}),G.length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{children:"Reorder Suggestions"}),(0,p.jsx)(g,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,p.jsxs)(z,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Ingredient"}),(0,p.jsx)("th",{children:"Current Stock"}),(0,p.jsx)("th",{children:"Daily Usage"}),(0,p.jsx)("th",{children:"Suggested Qty"}),(0,p.jsx)("th",{children:"Est. Cost"}),(0,p.jsx)("th",{children:"Urgency"})]})}),(0,p.jsx)("tbody",{children:G.slice(0,10).map(e=>(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{children:e.ingredient.name}),(0,p.jsxs)("td",{children:[e.current_stock," ",e.ingredient.unit]}),(0,p.jsxs)("td",{children:[e.avg_daily_usage.toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,p.jsx)("td",{children:(0,p.jsxs)("strong",{children:[e.suggested_qty," ",e.ingredient.unit]})}),(0,p.jsx)("td",{children:(0,h.vv)(e.estimated_cost,r)}),(0,p.jsx)("td",{children:(0,p.jsx)(O,{level:e.urgency,children:e.urgency.toUpperCase()})})]},e.ingredient.id))})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(a.cc,{variant:"primary",onClick:()=>W("list"),children:"+ Receive Stock"}),(0,p.jsx)(a.cc,{variant:"secondary",onClick:()=>W("list"),children:"+ Record Waste"}),(0,p.jsx)(a.cc,{variant:"secondary",onClick:()=>W("history"),children:"View All Transactions"})]})]}):"list"===q?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(d.Qn,{children:[(0,p.jsx)(d.DO,{type:"text",placeholder:"Search ingredients...",value:ee,onChange:e=>te(e.target.value)}),(0,p.jsxs)(d.Jt,{value:re,onChange:e=>ne(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"normal",children:"Normal"}),(0,p.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,p.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]})]}),0===fe.length?(0,p.jsx)(U,{children:(0,p.jsx)("p",{children:"No ingredients found. Add ingredients in the Ingredients page first."})}):(0,p.jsx)(y,{children:fe.map(e=>{var t,n;return(0,p.jsxs)(m,{status:e.stock_status,children:[(0,p.jsxs)(f,{children:[(0,p.jsx)(b,{children:e.name}),(0,p.jsx)(v,{status:e.stock_status,children:be(e.stock_status)})]}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(k,{children:[(0,p.jsx)(F,{children:"Current Stock"}),(0,p.jsxs)(A,{children:[e.current_stock," ",e.unit]})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)(F,{children:"Min Stock (Safety)"}),(0,p.jsxs)(A,{children:[e.min_stock," ",e.unit]})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)(F,{children:"Unit Cost"}),(0,p.jsx)(A,{children:(0,h.vv)(e.unit_cost,r)})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)(F,{children:"Avg. Daily Usage"}),(0,p.jsxs)(A,{children:[(null===(t=e.avg_daily_usage)||void 0===t?void 0:t.toFixed(2))||"0"," ",e.unit,"/day"]})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)(F,{children:"Last Stock Take"}),(0,p.jsx)(A,{children:(n=e.last_stock_take_at,n?new Date(n).toLocaleDateString():"-")})]})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(S,{variant:"primary",onClick:()=>me(e),children:"Receive"}),(0,p.jsx)(S,{variant:"danger",onClick:()=>(xe(e),ue(""),ge(""),void oe(!0)),children:"Waste"})]})]},e.id)})})]}):(0,p.jsx)(Q,{restaurantId:je,currency:r})]}),(0,p.jsx)(l.aF,{isOpen:se,onClose:()=>ie(!1),title:"Receive Stock",size:"small",children:le&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(g,{children:"Enter the quantity received. This will be added to the current stock."}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Ingredient"}),(0,p.jsx)(l.ZQ,{type:"text",value:le.name,disabled:!0})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Current Stock"}),(0,p.jsx)(l.ZQ,{type:"text",value:`${le.current_stock} ${le.unit}`,disabled:!0})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsxs)(l.lR,{children:["Quantity Received (",le.unit,") *"]}),(0,p.jsx)(l.ZQ,{type:"number",step:"0.01",value:he,onChange:e=>ue(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Notes (Optional)"}),(0,p.jsx)(l.ZQ,{type:"text",value:pe,onChange:e=>ge(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(l.yl,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,p.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(le&&he)try{const e=await(0,u.ff)(`/api/restaurants/${je}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:le.id,quantity:parseFloat(he),notes:pe})});e.success?(alert("Stock received successfully"),ie(!1),xe(null),ue(""),ge(""),ye()):alert(e.message||"Failed to receive stock")}catch(e){console.error("Failed to receive stock:",e),alert("Failed to receive stock")}},children:"Confirm Receive"})]})]})}),(0,p.jsx)(l.aF,{isOpen:ae,onClose:()=>oe(!1),title:"Record Waste",size:"small",children:le&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(g,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Ingredient"}),(0,p.jsx)(l.ZQ,{type:"text",value:le.name,disabled:!0})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Current Stock"}),(0,p.jsx)(l.ZQ,{type:"text",value:`${le.current_stock} ${le.unit}`,disabled:!0})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsxs)(l.lR,{children:["Waste Quantity (",le.unit,") *"]}),(0,p.jsx)(l.ZQ,{type:"number",step:"0.01",value:he,onChange:e=>ue(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Reason (Optional)"}),(0,p.jsx)(l.ZQ,{type:"text",value:pe,onChange:e=>ge(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(l.yl,{variant:"secondary",onClick:()=>oe(!1),children:"Cancel"}),(0,p.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(le&&he)try{const e=await(0,u.ff)(`/api/restaurants/${je}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:le.id,quantity:parseFloat(he),notes:pe})});e.success?(alert("Waste recorded successfully"),oe(!1),xe(null),ue(""),ge(""),ye()):alert(e.message||"Failed to record waste")}catch(e){console.error("Failed to record waste:",e),alert("Failed to record waste")}},children:"Confirm Waste"})]})]})})]}):(0,p.jsx)(i.A,{children:(0,p.jsx)(o.mc,{children:(0,p.jsx)(U,{children:(0,p.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}},3705:(e,t,r)=>{r.d(t,{cc:()=>s});var n=r(4752);const s=n.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,n.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,t,r)=>{r.d(t,{i1:()=>i});var n=r(9950),s=r(1367);r(6038);const i=()=>{const{user:e}=(0,s.As)(),[t,r]=(0,n.useState)("USD"),[i,a]=(0,n.useState)(["USD"]),[o,d]=(0,n.useState)(!0),[c,l]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{if(null===e||void 0===e||!e.brand_id)return r("USD"),a(["USD","MYR","KRW"]),void d(!1);try{const t=localStorage.getItem("token"),n=await fetch(`/api/currencies/brands/${e.brand_id}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&e.data&&(r(e.data.default_currency||"USD"),a(e.data.supported_currencies||["USD"]))}else r("USD"),a(["USD","MYR","KRW"])}catch(t){console.error("Failed to fetch brand currency:",t),l("Failed to load currency settings"),r("USD"),a(["USD","MYR","KRW"])}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.brand_id]),{defaultCurrency:t,supportedCurrencies:i,loading:o,error:c}}}}]);