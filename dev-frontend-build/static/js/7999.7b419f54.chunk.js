"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7999],{1840:(e,n,t)=>{t.d(n,{ff:()=>o});function r(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",r()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const a="";r();async function o(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${a}${e}`,r=localStorage.getItem("auth_token"),o={credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{},...n.headers},...n},i=await fetch(t,o);if(!i.ok){const e=await i.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${i.status}`)}return i.json()}},3705:(e,n,t)=>{t.d(n,{cc:()=>a});var r=t(4752);const a=r.Ay.button`
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
`},4021:(e,n,t)=>{t.d(n,{i1:()=>i});var r=t(9950),a=t(1367),o=t(6038);const i=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,r.useState)("RM"),[i]=(0,r.useState)(Object.keys(o.DL)),[s,c]=(0,r.useState)(!0),[l,d]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let a=r>=0?n[r+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"MYR";t(r)}else t("MYR")}catch(i){console.error("Failed to fetch restaurant currency:",i),d("Failed to load currency settings"),t("MYR")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:i,loading:s,error:l}}},7617:(e,n,t)=>{t.d(n,{A:()=>u});t(9950);var r=t(4752),a=t(9610),o=t(4414);const i=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,s=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,c=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,d=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=r.Ay.button`
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
`,u=e=>{let{isOpen:n,title:t,message:r,onConfirm:u,onCancel:x,confirmText:h="Confirm",cancelText:g="Cancel",type:v="warning"}=e;return n?(0,o.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,o.jsxs)(i,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(s,{children:[(0,o.jsx)(c,{children:t}),(0,o.jsx)(l,{children:r})]}),(0,o.jsxs)(d,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:x,children:g}),(0,o.jsx)(p,{variant:"primary",type:v,onClick:u,children:h})]})]})}):null}},7999:(e,n,t)=>{t.r(n),t.d(n,{default:()=>U});var r=t(9950),a=t(4492),o=t(4752),i=t(2853),s=t(3705),c=t(8409),l=t(1367),d=t(4021),p=t(6038),u=t(1840),x=t(7617),h=t(4414);const g=o.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,v=o.Ay.div`
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
`,f=o.Ay.div`
  width: ${e=>e.percentage}%;
  height: 100%;
  background: #635BFF;
  transition: width 0.3s ease;
`,m=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
`,b=o.Ay.table`
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
`,y=o.Ay.input`
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
`,k=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,j=o.Ay.td`
  color: ${e=>null===e.variance||0===e.variance?"#0A2540":e.variance>0?"#059669":"#DC2626"};
  font-weight: 600;
`,w=o.Ay.div`
  display: flex;
  gap: 24px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 24px;
`,F=o.Ay.div`
  text-align: center;
`,A=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,C=o.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: ${e=>e.color||"#0A2540"};
`,E=o.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,B=o.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 12px;
`,S=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`,_=o.Ay.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`,$=o.Ay.h4`
  font-size: 15px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 12px;
`,T=o.Ay.ol`
  margin: 0;
  padding-left: 20px;
  color: #166534;
  font-size: 14px;
  line-height: 1.8;
`,z=o.Ay.li`
  margin-bottom: 4px;
`,D=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`,O=o.Ay.div`
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
`,P=o.Ay.div``,I=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,R=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,M=o.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"completed":return"background: #D1FAE5; color: #059669;";case"cancelled":return"background: #FEE2E2; color: #DC2626;";default:return"background: #FEF3C7; color: #D97706;"}}}
`,Y=o.Ay.tr`
  background: #F3F4F6 !important;

  td {
    font-weight: 600;
    color: #374151;
    padding: 10px 16px;
  }
`,U=()=>{const{user:e}=(0,l.As)(),{restaurantId:n}=(0,a.g)(),{defaultCurrency:t}=(0,d.i1)(),[o,U]=(0,r.useState)("RM"),[L,N]=(0,r.useState)(!0),[V,H]=(0,r.useState)(null),[W,J]=(0,r.useState)([]),[q,G]=(0,r.useState)([]),[K,Q]=(0,r.useState)(!1),[X,Z]=(0,r.useState)(!1),[ee,ne]=(0,r.useState)(!1),te=n?parseInt(n,10):null===e||void 0===e?void 0:e.restaurant_id;(0,r.useEffect)(()=>{t&&U(t)},[t]);const re=(0,r.useCallback)(async()=>{if(te)try{N(!0);const e=await(0,u.ff)(`/api/restaurants/${te}/stock-takes?limit=20`);if(e.success){const n=e.data;J(n);const t=n.find(e=>"in_progress"===e.status);if(t){const e=await(0,u.ff)(`/api/restaurants/${te}/stock-takes/${t.id}`);e.success&&(H(e.data),G(e.data.items||[]))}else H(null),G([])}}catch(e){console.error("Failed to fetch stock takes:",e)}finally{N(!1)}},[te]);(0,r.useEffect)(()=>{re()},[re]);const ae=(e,n,t)=>{G(r=>r.map(r=>{if(r.id===e){const e={...r,[n]:t};if("actual_stock"===n&&null!==t&&""!==t){const n=parseFloat(t);e.actual_stock=n,e.variance=parseFloat(String(r.theoretical_stock))-n,e.variance_value=e.variance*parseFloat(String(r.unit_cost))}return e}return r}))},oe=q.filter(e=>null!==e.actual_stock).length,ie=q.length,se=ie>0?oe/ie*100:0,ce=q.reduce((e,n)=>e+(parseFloat(String(n.variance_value))||0),0),le=q.filter(e=>null!==e.variance&&0!==e.variance).length,de=q.reduce((e,n)=>{var t;const r=(null===(t=n.ingredient)||void 0===t?void 0:t.category)||"Other";return e[r]||(e[r]=[]),e[r].push(n),e},{});return te?L?(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(c.mc,{children:[(0,h.jsx)(c.Y9,{children:(0,h.jsx)(c.hE,{children:"Stock Take"})}),(0,h.jsx)(i.pp,{children:(0,h.jsx)(S,{children:"Loading..."})})]})}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(c.mc,{children:[(0,h.jsxs)(c.Y9,{children:[(0,h.jsx)(c.hE,{children:"Stock Take"}),(0,h.jsx)(c.ex,{children:(0,h.jsx)(c.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${te}/inventory`,children:"Back to Inventory"})})]}),(0,h.jsx)(c.UC,{children:V?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(_,{children:[(0,h.jsx)($,{children:"How to Complete Stock Take"}),(0,h.jsxs)(T,{children:[(0,h.jsx)(z,{children:"Physically count each ingredient in your inventory"}),(0,h.jsx)(z,{children:'Enter the actual quantity in the "Actual Stock" column'}),(0,h.jsx)(z,{children:"If there's a variance, select a reason from the dropdown"}),(0,h.jsx)(z,{children:'Click "Save Progress" to save your work and continue later'}),(0,h.jsx)(z,{children:'When all items are counted, click "Complete Stock Take" to finalize'})]})]}),(0,h.jsx)(g,{children:'The "Theoretical Stock" shows what the system expects based on purchases and sales. Any difference between theoretical and actual stock will be recorded as loss/gain.'}),(0,h.jsxs)(m,{children:["Progress: ",oe," / ",ie," items counted"]}),(0,h.jsx)(v,{children:(0,h.jsx)(f,{percentage:se})}),(0,h.jsxs)(b,{children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:"Ingredient"}),(0,h.jsx)("th",{children:"Unit"}),(0,h.jsx)("th",{children:"Theoretical Stock"}),(0,h.jsx)("th",{children:"Actual Stock"}),(0,h.jsx)("th",{children:"Variance"}),(0,h.jsx)("th",{children:"Reason"})]})}),(0,h.jsx)("tbody",{children:Object.entries(de).map(e=>{let[n,t]=e;return(0,h.jsxs)(r.Fragment,{children:[(0,h.jsx)(Y,{children:(0,h.jsx)("td",{colSpan:6,children:n})}),t.map(e=>{var n,t,r,a;return(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:(null===(n=e.ingredient)||void 0===n?void 0:n.name)||"-"}),(0,h.jsx)("td",{children:(null===(t=e.ingredient)||void 0===t?void 0:t.unit)||"-"}),(0,h.jsx)("td",{children:e.theoretical_stock}),(0,h.jsx)("td",{children:(0,h.jsx)(y,{type:"number",step:"0.01",value:null!==(r=e.actual_stock)&&void 0!==r?r:"",onChange:n=>ae(e.id,"actual_stock",n.target.value),placeholder:"Enter"})}),(0,h.jsx)(j,{variance:e.variance,children:null!==e.variance?(0,h.jsxs)(h.Fragment,{children:[e.variance>0?"+":"",e.variance.toFixed(2)," ",null===(a=e.ingredient)||void 0===a?void 0:a.unit,null!==e.variance_value&&(0,h.jsxs)("span",{style:{display:"block",fontSize:"12px"},children:["(",(0,p.vv)(Math.abs(e.variance_value),o),")"]})]}):"-"}),(0,h.jsx)("td",{children:null!==e.variance&&0!==e.variance&&(0,h.jsxs)(k,{value:e.variance_reason||"",onChange:n=>ae(e.id,"variance_reason",n.target.value||null),children:[(0,h.jsx)("option",{value:"",children:"Select..."}),(0,h.jsx)("option",{value:"waste",children:"Waste"}),(0,h.jsx)("option",{value:"breakage",children:"Breakage"}),(0,h.jsx)("option",{value:"recipe_variance",children:"Recipe Variance"}),(0,h.jsx)("option",{value:"unrecorded",children:"Unrecorded Use"}),(0,h.jsx)("option",{value:"measurement",children:"Measurement Error"}),(0,h.jsx)("option",{value:"other",children:"Other"})]})})]},e.id)})]},n)})})]}),(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)(A,{children:"Items Counted"}),(0,h.jsxs)(C,{children:[oe," / ",ie]})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(A,{children:"Items with Variance"}),(0,h.jsx)(C,{color:"#D97706",children:le})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(A,{children:"Total Loss Value"}),(0,h.jsx)(C,{color:ce<0?"#DC2626":"#059669",children:(0,p.vv)(Math.abs(ce),o)})]})]}),(0,h.jsxs)(E,{children:[(0,h.jsx)(s.cc,{variant:"secondary",onClick:()=>{V&&te&&ne(!0)},disabled:K,children:"Cancel"}),(0,h.jsx)(s.cc,{variant:"secondary",onClick:async()=>{if(V&&te)try{Q(!0);const e=q.filter(e=>null!==e.actual_stock).map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,u.ff)(`/api/restaurants/${te}/stock-takes/${V.id}/items`,{method:"PUT",body:JSON.stringify({items:e})})}catch(e){console.error("Failed to save progress:",e)}finally{Q(!1)}},disabled:K,children:K?"Saving...":"Save Progress"}),(0,h.jsx)(s.cc,{variant:"primary",onClick:()=>{if(!V||!te)return;q.filter(e=>null===e.actual_stock).length>0||Z(!0)},disabled:K||oe<ie,children:K?"Processing...":"Complete Stock Take"})]})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(_,{children:[(0,h.jsx)($,{children:"What is Stock Take?"}),(0,h.jsxs)(T,{children:[(0,h.jsx)(z,{children:"Stock Take is a process of physically counting all ingredients in your inventory"}),(0,h.jsx)(z,{children:"It helps identify discrepancies between system records and actual stock"}),(0,h.jsx)(z,{children:"Regular stock takes help reduce loss and improve inventory accuracy"}),(0,h.jsx)(z,{children:"We recommend doing a stock take at least once a week"})]})]}),(0,h.jsxs)(i.pp,{children:[(0,h.jsx)(B,{children:"Ready to Start?"}),(0,h.jsx)(S,{children:"Click the button below to begin counting your inventory. You can save your progress and continue later if needed. Once completed, your stock levels will be updated automatically."}),(0,h.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(te)try{N(!0);const e=await(0,u.ff)(`/api/restaurants/${te}/stock-takes`,{method:"POST"});e.success&&(H(e.data),G(e.data.items||[]))}catch(e){console.error("Failed to start stock take:",e)}finally{N(!1)}},children:"Start Stock Take"})]}),W.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.hE,{style:{fontSize:"18px",marginTop:"48px"},children:"Previous Stock Takes"}),(0,h.jsx)(D,{children:W.filter(e=>"in_progress"!==e.status).map(e=>(0,h.jsxs)(O,{status:e.status,children:[(0,h.jsxs)(P,{children:[(0,h.jsx)(I,{children:new Date(e.stock_take_date).toLocaleDateString()}),(0,h.jsxs)(R,{children:[e.total_items," items |",e.items_with_variance>0&&` ${e.items_with_variance} with variance |`,null!==e.total_variance_value&&` Loss: ${(0,p.vv)(Math.abs(e.total_variance_value),o)}`]})]}),(0,h.jsx)(M,{status:e.status,children:"completed"===e.status?"Completed":"Cancelled"})]},e.id))})]})]})})]}),(0,h.jsx)(x.A,{isOpen:X,title:"Complete Stock Take",message:"Complete this stock take? This will update all stock levels to the counted values.",onConfirm:async()=>{if(V&&te){Z(!1);try{Q(!0);const e=q.map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,u.ff)(`/api/restaurants/${te}/stock-takes/${V.id}/items`,{method:"PUT",body:JSON.stringify({items:e})});(await(0,u.ff)(`/api/restaurants/${te}/stock-takes/${V.id}/complete`,{method:"POST"})).success&&re()}catch(e){console.error("Failed to complete stock take:",e)}finally{Q(!1)}}},onCancel:()=>Z(!1),confirmText:"Complete",cancelText:"Cancel",type:"warning"}),(0,h.jsx)(x.A,{isOpen:ee,title:"Cancel Stock Take",message:"Cancel this stock take? All entered data will be lost.",onConfirm:async()=>{if(V&&te){ne(!1);try{(await(0,u.ff)(`/api/restaurants/${te}/stock-takes/${V.id}/cancel`,{method:"POST"})).success&&re()}catch(e){console.error("Failed to cancel stock take:",e)}}},onCancel:()=>ne(!1),confirmText:"Cancel Stock Take",cancelText:"Go Back",type:"danger"})]}):(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(c.mc,{children:(0,h.jsxs)(i.pp,{children:[(0,h.jsx)(B,{children:"Access Denied"}),(0,h.jsx)(S,{children:"Please log in with a restaurant account."})]})})})}}}]);