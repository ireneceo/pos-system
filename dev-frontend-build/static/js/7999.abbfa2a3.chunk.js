"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7999],{1840:(e,n,t)=>{t.d(n,{ff:()=>a});function r(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",r()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const o="";r();async function a(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${o}${e}`,r=localStorage.getItem("auth_token"),a={credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{},...n.headers},...n},i=await fetch(t,a);if(!i.ok){const e=await i.json().catch(()=>({message:"Network error"}));throw new Error(e.message||e.error||`HTTP error! status: ${i.status}`)}return i.json()}},3705:(e,n,t)=>{t.d(n,{cc:()=>o});var r=t(4752);const o=r.Ay.button`
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

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

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
`;r.Ay.select`
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
`,r.Ay.input`
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
`,r.Ay.div`
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
`},4021:(e,n,t)=>{t.d(n,{i1:()=>i});var r=t(9950),o=t(1367),a=t(6038);const i=()=>{const{user:e}=(0,o.As)(),[n,t]=(0,r.useState)("RM"),[i]=(0,r.useState)(Object.keys(a.DL)),[s,c]=(0,r.useState)(!0),[l,d]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let o=r>=0?n[r+1]:null;if(!o&&null!==e&&void 0!==e&&e.restaurant_id&&(o=e.restaurant_id.toString()),!o)return t("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${o}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";t(r)}else t("MYR")}catch(i){console.error("Failed to fetch restaurant currency:",i),d("Failed to load currency settings"),t("MYR")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:i,loading:s,error:l}}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var r=t(7119),o=t(4752),a=t(9610),i=t(4414);const s=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,c=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=o.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,x=e=>{let{isOpen:n,title:t,message:o,onConfirm:x,onCancel:h,confirmText:g="Confirm",cancelText:k="Cancel",type:v="warning"}=e;return n?r.createPortal((0,i.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,i.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(c,{children:[(0,i.jsx)(l,{children:t}),(0,i.jsx)(d,{children:o})]}),(0,i.jsxs)(p,{children:[(0,i.jsx)(u,{variant:"secondary",onClick:h,children:k}),(0,i.jsx)(u,{variant:"primary",type:v,onClick:x,children:g})]})]})}),document.body):null}},7999:(e,n,t)=>{t.r(n),t.d(n,{default:()=>N});var r=t(9950),o=t(4492),a=t(4752),i=t(2853),s=t(3705),c=t(8409),l=t(1367),d=t(4021),p=t(6038),u=t(1840),x=t(7617),h=t(5030),g=t(4414);const k=a.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,v=a.Ay.div`
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
`,y=a.Ay.div`
  width: ${e=>e.percentage}%;
  height: 100%;
  background: #635BFF;
  transition: width 0.3s ease;
`,m=a.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
`,f=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
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

  tr:hover {
    background: #F9FAFB;
  }
`,b=a.Ay.input`
  width: 100px;
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,j=a.Ay.select`
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,w=a.Ay.td`
  color: ${e=>null===e.variance||0===e.variance?"#0A2540":e.variance>0?"#059669":"#DC2626"};
  font-weight: 600;
`,A=a.Ay.div`
  display: flex;
  gap: 24px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 24px;
`,F=a.Ay.div`
  text-align: center;
`,C=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,T=a.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: ${e=>e.color||"#0A2540"};
`,E=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,B=a.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 12px;
`,S=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`,P=a.Ay.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`,_=a.Ay.h4`
  font-size: 15px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 12px;
`,$=a.Ay.ol`
  margin: 0;
  padding-left: 20px;
  color: #166534;
  font-size: 14px;
  line-height: 1.8;
`,z=a.Ay.li`
  margin-bottom: 4px;
`,D=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`,I=a.Ay.div`
  padding: 16px 20px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #635BFF;
  }
`,O=a.Ay.div``,R=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,Y=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,M=a.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"completed":return"background: #D1FAE5; color: #059669;";case"cancelled":return"background: #FEE2E2; color: #DC2626;";default:return"background: #FEF3C7; color: #D97706;"}}}
`,L=a.Ay.tr`
  background: #F3F4F6 !important;

  td {
    font-weight: 600;
    color: #374151;
    padding: 10px 16px;
  }
`,N=()=>{const{t:e}=(0,h.Bd)("inventory"),{user:n}=(0,l.As)(),{restaurantId:t}=(0,o.g)(),{defaultCurrency:a}=(0,d.i1)(),[N,H]=(0,r.useState)("RM"),[U,V]=(0,r.useState)(!0),[W,J]=(0,r.useState)(null),[q,G]=(0,r.useState)([]),[K,Q]=(0,r.useState)([]),[X,Z]=(0,r.useState)(!1),[ee,ne]=(0,r.useState)(!1),[te,re]=(0,r.useState)(!1),oe=t?parseInt(t,10):null===n||void 0===n?void 0:n.restaurant_id;(0,r.useEffect)(()=>{a&&H(a)},[a]);const ae=(0,r.useCallback)(async()=>{if(oe)try{V(!0);const e=await(0,u.ff)(`/api/restaurants/${oe}/stock-takes?limit=20`);if(e.success){const n=e.data;G(n);const t=n.find(e=>"in_progress"===e.status);if(t){const e=await(0,u.ff)(`/api/restaurants/${oe}/stock-takes/${t.id}`);e.success&&(J(e.data),Q(e.data.items||[]))}else J(null),Q([])}}catch(e){console.error("Failed to fetch stock takes:",e)}finally{V(!1)}},[oe]);(0,r.useEffect)(()=>{ae()},[ae]);const ie=(e,n,t)=>{Q(r=>r.map(r=>{if(r.id===e){const e={...r,[n]:t};if("actual_stock"===n&&null!==t&&""!==t){const n=parseFloat(t);e.actual_stock=n,e.variance=parseFloat(String(r.theoretical_stock))-n,e.variance_value=e.variance*parseFloat(String(r.unit_cost))}return e}return r}))},se=K.filter(e=>null!==e.actual_stock).length,ce=K.length,le=ce>0?se/ce*100:0,de=K.reduce((e,n)=>e+(parseFloat(String(n.variance_value))||0),0),pe=K.filter(e=>null!==e.variance&&0!==e.variance).length,ue=K.reduce((e,n)=>{var t;const r=(null===(t=n.ingredient)||void 0===t?void 0:t.category)||"Other";return e[r]||(e[r]=[]),e[r].push(n),e},{});return oe?U?(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(c.mc,{children:[(0,g.jsx)(c.Y9,{children:(0,g.jsx)(c.hE,{children:e("inventory:stockTakePage.stockTake")})}),(0,g.jsx)(i.pp,{children:(0,g.jsx)(S,{children:e("inventory:stockTakePage.loading")})})]})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(c.mc,{children:[(0,g.jsxs)(c.Y9,{children:[(0,g.jsx)(c.hE,{children:e("inventory:stockTakePage.stockTake")}),(0,g.jsx)(c.ex,{children:(0,g.jsx)(c.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${oe}/inventory`,children:"Back to Inventory"})})]}),(0,g.jsx)(c.UC,{children:W?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(P,{children:[(0,g.jsx)(_,{children:e("inventory:stockTakePage.howToCompleteStockTake")}),(0,g.jsxs)($,{children:[(0,g.jsx)(z,{children:e("inventory:stockTakePage.physicallyCountEachIngredientInYourInventory")}),(0,g.jsx)(z,{children:'Enter the actual quantity in the "Actual Stock" column'}),(0,g.jsx)(z,{children:e("inventory:stockTakePage.ifTheresAVarianceSelectAReasonFromTheDropdown")}),(0,g.jsx)(z,{children:'Click "Save Progress" to save your work and continue later'}),(0,g.jsx)(z,{children:'When all items are counted, click "Complete Stock Take" to finalize'})]})]}),(0,g.jsx)(k,{children:'The "Theoretical Stock" shows what the system expects based on purchases and sales. Any difference between theoretical and actual stock will be recorded as loss/gain.'}),(0,g.jsxs)(m,{children:["Progress: ",se," / ",ce," items counted"]}),(0,g.jsx)(v,{children:(0,g.jsx)(y,{percentage:le})}),(0,g.jsxs)(f,{children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{children:[(0,g.jsx)("th",{children:e("inventory:stockTakePage.ingredient")}),(0,g.jsx)("th",{children:e("inventory:stockTakePage.unit")}),(0,g.jsx)("th",{children:e("inventory:stockTakePage.theoreticalStock")}),(0,g.jsx)("th",{children:e("inventory:stockTakePage.actualStock")}),(0,g.jsx)("th",{children:e("inventory:stockTakePage.variance")}),(0,g.jsx)("th",{children:e("inventory:stockTakePage.reason")})]})}),(0,g.jsx)("tbody",{children:Object.entries(ue).map(n=>{let[t,o]=n;return(0,g.jsxs)(r.Fragment,{children:[(0,g.jsx)(L,{children:(0,g.jsx)("td",{colSpan:6,children:t})}),o.map(n=>{var t,r,o,a;return(0,g.jsxs)("tr",{children:[(0,g.jsx)("td",{children:(null===(t=n.ingredient)||void 0===t?void 0:t.name)||"-"}),(0,g.jsx)("td",{children:(null===(r=n.ingredient)||void 0===r?void 0:r.unit)||"-"}),(0,g.jsx)("td",{children:n.theoretical_stock}),(0,g.jsx)("td",{children:(0,g.jsx)(b,{type:"number",step:"0.01",value:null!==(o=n.actual_stock)&&void 0!==o?o:"",onChange:e=>ie(n.id,"actual_stock",e.target.value),placeholder:"Enter"})}),(0,g.jsx)(w,{variance:n.variance,children:null!==n.variance?(0,g.jsxs)(g.Fragment,{children:[n.variance>0?"+":"",n.variance.toFixed(2)," ",null===(a=n.ingredient)||void 0===a?void 0:a.unit,null!==n.variance_value&&(0,g.jsxs)("span",{style:{display:"block",fontSize:"12px"},children:["(",(0,p.vv)(Math.abs(n.variance_value),N),")"]})]}):"-"}),(0,g.jsx)("td",{children:null!==n.variance&&0!==n.variance&&(0,g.jsxs)(j,{value:n.variance_reason||"",onChange:e=>ie(n.id,"variance_reason",e.target.value||null),children:[(0,g.jsx)("option",{value:"",children:e("inventory:stockTakePage.select")}),(0,g.jsx)("option",{value:"waste",children:e("inventory:stockTakePage.waste")}),(0,g.jsx)("option",{value:"breakage",children:e("inventory:stockTakePage.breakage")}),(0,g.jsx)("option",{value:"recipe_variance",children:e("inventory:stockTakePage.recipeVariance")}),(0,g.jsx)("option",{value:"unrecorded",children:e("inventory:stockTakePage.unrecordedUse")}),(0,g.jsx)("option",{value:"measurement",children:e("inventory:stockTakePage.measurementError")}),(0,g.jsx)("option",{value:"other",children:e("inventory:stockTakePage.other")})]})})]},n.id)})]},t)})})]}),(0,g.jsxs)(A,{children:[(0,g.jsxs)(F,{children:[(0,g.jsx)(C,{children:e("inventory:stockTakePage.itemsCounted")}),(0,g.jsxs)(T,{children:[se," / ",ce]})]}),(0,g.jsxs)(F,{children:[(0,g.jsx)(C,{children:e("inventory:stockTakePage.itemsWithVariance")}),(0,g.jsx)(T,{color:"#D97706",children:pe})]}),(0,g.jsxs)(F,{children:[(0,g.jsx)(C,{children:e("inventory:stockTakePage.totalLossValue")}),(0,g.jsx)(T,{color:de<0?"#DC2626":"#059669",children:(0,p.vv)(Math.abs(de),N)})]})]}),(0,g.jsxs)(E,{children:[(0,g.jsx)(s.cc,{variant:"secondary",onClick:()=>{W&&oe&&re(!0)},disabled:X,children:"Cancel"}),(0,g.jsx)(s.cc,{variant:"secondary",onClick:async()=>{if(W&&oe)try{Z(!0);const e=K.filter(e=>null!==e.actual_stock).map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,u.ff)(`/api/restaurants/${oe}/stock-takes/${W.id}/items`,{method:"PUT",body:JSON.stringify({items:e})})}catch(e){console.error("Failed to save progress:",e)}finally{Z(!1)}},disabled:X,children:X?"Saving...":"Save Progress"}),(0,g.jsx)(s.cc,{variant:"primary",onClick:()=>{if(!W||!oe)return;K.filter(e=>null===e.actual_stock).length>0||ne(!0)},disabled:X||se<ce,children:X?"Processing...":"Complete Stock Take"})]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(P,{children:[(0,g.jsx)(_,{children:e("inventory:stockTakePage.whatIsStockTake")}),(0,g.jsxs)($,{children:[(0,g.jsx)(z,{children:e("inventory:stockTakePage.stockTakeIsAProcessOfPhysicallyCountingAllIngredientsInYourInventory")}),(0,g.jsx)(z,{children:e("inventory:stockTakePage.itHelpsIdentifyDiscrepanciesBetweenSystemRecordsAndActualStock")}),(0,g.jsx)(z,{children:e("inventory:stockTakePage.regularStockTakesHelpReduceLossAndImproveInventoryAccuracy")}),(0,g.jsx)(z,{children:e("inventory:stockTakePage.weRecommendDoingAStockTakeAtLeastOnceAWeek")})]})]}),(0,g.jsxs)(i.pp,{children:[(0,g.jsx)(B,{children:e("inventory:stockTakePage.readyToStart")}),(0,g.jsx)(S,{children:"Click the button below to begin counting your inventory. You can save your progress and continue later if needed. Once completed, your stock levels will be updated automatically."}),(0,g.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(oe)try{V(!0);const e=await(0,u.ff)(`/api/restaurants/${oe}/stock-takes`,{method:"POST"});e.success&&(J(e.data),Q(e.data.items||[]))}catch(e){console.error("Failed to start stock take:",e)}finally{V(!1)}},children:"Start Stock Take"})]}),q.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(c.hE,{style:{fontSize:"18px",marginTop:"48px"},children:e("inventory:stockTakePage.previousStockTakes")}),(0,g.jsx)(D,{children:q.filter(e=>"in_progress"!==e.status).map(e=>(0,g.jsxs)(I,{status:e.status,children:[(0,g.jsxs)(O,{children:[(0,g.jsx)(R,{children:new Date(e.stock_take_date).toLocaleDateString()}),(0,g.jsxs)(Y,{children:[e.total_items," items |",e.items_with_variance>0&&` ${e.items_with_variance} with variance |`,null!==e.total_variance_value&&` Loss: ${(0,p.vv)(Math.abs(e.total_variance_value),N)}`]})]}),(0,g.jsx)(M,{status:e.status,children:"completed"===e.status?"Completed":"Cancelled"})]},e.id))})]})]})})]}),(0,g.jsx)(x.A,{isOpen:ee,title:"Complete Stock Take",message:"Complete this stock take? This will update all stock levels to the counted values.",onConfirm:async()=>{if(W&&oe){ne(!1);try{Z(!0);const e=K.map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,u.ff)(`/api/restaurants/${oe}/stock-takes/${W.id}/items`,{method:"PUT",body:JSON.stringify({items:e})});(await(0,u.ff)(`/api/restaurants/${oe}/stock-takes/${W.id}/complete`,{method:"POST"})).success&&ae()}catch(e){console.error("Failed to complete stock take:",e)}finally{Z(!1)}}},onCancel:()=>ne(!1),confirmText:"Complete",cancelText:"Cancel",type:"warning"}),(0,g.jsx)(x.A,{isOpen:te,title:"Cancel Stock Take",message:"Cancel this stock take? All entered data will be lost.",onConfirm:async()=>{if(W&&oe){re(!1);try{(await(0,u.ff)(`/api/restaurants/${oe}/stock-takes/${W.id}/cancel`,{method:"POST"})).success&&ae()}catch(e){console.error("Failed to cancel stock take:",e)}}},onCancel:()=>re(!1),confirmText:"Cancel Stock Take",cancelText:"Go Back",type:"danger"})]}):(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(c.mc,{children:(0,g.jsxs)(i.pp,{children:[(0,g.jsx)(B,{children:e("inventory:stockTakePage.accessDenied")}),(0,g.jsx)(S,{children:e("inventory:stockTakePage.pleaseLogInWithARestaurantAccount")})]})})})}}}]);