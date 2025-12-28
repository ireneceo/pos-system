"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7999],{1840:(e,t,r)=>{r.d(t,{ff:()=>o});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const a="";n();async function o(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r=`${a}${e}`,n={credentials:"include",headers:{"Content-Type":"application/json",...t.headers},...t},o=await fetch(r,n);if(!o.ok){const e=await o.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${o.status}`)}return o.json()}},3705:(e,t,r)=>{r.d(t,{cc:()=>a});var n=r(4752);const a=n.Ay.button`
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
`},4021:(e,t,r)=>{r.d(t,{i1:()=>s});var n=r(9950),a=r(1367),o=r(6038);const s=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,n.useState)("RM"),[s,i]=(0,n.useState)(Object.keys(o.DL)),[c,l]=(0,n.useState)(!0),[d,u]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let a=n>=0?t[n+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),n=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";r(n)}else r("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),u("Failed to load currency settings"),r("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:c,error:d}}},7999:(e,t,r)=>{r.r(t),r.d(t,{default:()=>L});var n=r(9950),a=r(4492),o=r(4752),s=r(3310),i=r(3705),c=r(7492),l=r(1367),d=r(4021),u=r(6038),h=r(1840),p=r(4414);const x=o.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,g=o.Ay.div`
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
`,v=o.Ay.div`
  width: ${e=>e.percentage}%;
  height: 100%;
  background: #635BFF;
  transition: width 0.3s ease;
`,k=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
`,f=o.Ay.table`
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
`,m=o.Ay.input`
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
`,b=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,y=o.Ay.td`
  color: ${e=>null===e.variance||0===e.variance?"#0A2540":e.variance>0?"#059669":"#DC2626"};
  font-weight: 600;
`,j=o.Ay.div`
  display: flex;
  gap: 24px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 24px;
`,w=o.Ay.div`
  text-align: center;
`,F=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,A=o.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: ${e=>e.color||"#0A2540"};
`,C=o.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,E=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`,_=o.Ay.h3`
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
`,B=o.Ay.div`
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
`,D=o.Ay.ol`
  margin: 0;
  padding-left: 20px;
  color: #166534;
  font-size: 14px;
  line-height: 1.8;
`,z=o.Ay.li`
  margin-bottom: 4px;
`,T=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`,P=o.Ay.div`
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
`,O=o.Ay.div``,I=o.Ay.div`
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
`,U=o.Ay.tr`
  background: #F3F4F6 !important;

  td {
    font-weight: 600;
    color: #374151;
    padding: 10px 16px;
  }
`,L=()=>{const{user:e}=(0,l.As)(),{restaurantId:t}=(0,a.g)(),{defaultCurrency:r}=(0,d.i1)(),[o,L]=(0,n.useState)("RM"),[N,V]=(0,n.useState)(!0),[Y,W]=(0,n.useState)(null),[H,J]=(0,n.useState)([]),[q,G]=(0,n.useState)([]),[K,Q]=(0,n.useState)(!1),X=t?parseInt(t,10):null===e||void 0===e?void 0:e.restaurant_id;(0,n.useEffect)(()=>{r&&L(r)},[r]);const Z=(0,n.useCallback)(async()=>{if(X)try{V(!0);const e=await(0,h.ff)(`/api/restaurants/${X}/stock-takes?limit=20`);if(e.success){const t=e.data;J(t);const r=t.find(e=>"in_progress"===e.status);if(r){const e=await(0,h.ff)(`/api/restaurants/${X}/stock-takes/${r.id}`);e.success&&(W(e.data),G(e.data.items||[]))}else W(null),G([])}}catch(e){console.error("Failed to fetch stock takes:",e)}finally{V(!1)}},[X]);(0,n.useEffect)(()=>{Z()},[Z]);const ee=(e,t,r)=>{G(n=>n.map(n=>{if(n.id===e){const e={...n,[t]:r};if("actual_stock"===t&&null!==r&&""!==r){const t=parseFloat(r);e.actual_stock=t,e.variance=parseFloat(String(n.theoretical_stock))-t,e.variance_value=e.variance*parseFloat(String(n.unit_cost))}return e}return n}))},te=q.filter(e=>null!==e.actual_stock).length,re=q.length,ne=re>0?te/re*100:0,ae=q.reduce((e,t)=>e+(parseFloat(String(t.variance_value))||0),0),oe=q.filter(e=>null!==e.variance&&0!==e.variance).length,se=q.reduce((e,t)=>{var r;const n=(null===(r=t.ingredient)||void 0===r?void 0:r.category)||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{});return X?N?(0,p.jsx)(s.A,{children:(0,p.jsxs)(c.mc,{children:[(0,p.jsx)(c.Y9,{children:(0,p.jsx)(c.hE,{children:"Stock Take"})}),(0,p.jsx)(E,{children:(0,p.jsx)(S,{children:"Loading..."})})]})}):(0,p.jsx)(s.A,{children:(0,p.jsxs)(c.mc,{children:[(0,p.jsxs)(c.Y9,{children:[(0,p.jsx)(c.hE,{children:"Stock Take"}),(0,p.jsx)(c.ex,{children:(0,p.jsx)(c.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${X}/inventory`,children:"Back to Inventory"})})]}),(0,p.jsx)(c.UC,{children:Y?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(B,{children:[(0,p.jsx)($,{children:"How to Complete Stock Take"}),(0,p.jsxs)(D,{children:[(0,p.jsx)(z,{children:"Physically count each ingredient in your inventory"}),(0,p.jsx)(z,{children:'Enter the actual quantity in the "Actual Stock" column'}),(0,p.jsx)(z,{children:"If there's a variance, select a reason from the dropdown"}),(0,p.jsx)(z,{children:'Click "Save Progress" to save your work and continue later'}),(0,p.jsx)(z,{children:'When all items are counted, click "Complete Stock Take" to finalize'})]})]}),(0,p.jsx)(x,{children:'The "Theoretical Stock" shows what the system expects based on purchases and sales. Any difference between theoretical and actual stock will be recorded as loss/gain.'}),(0,p.jsxs)(k,{children:["Progress: ",te," / ",re," items counted"]}),(0,p.jsx)(g,{children:(0,p.jsx)(v,{percentage:ne})}),(0,p.jsxs)(f,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Ingredient"}),(0,p.jsx)("th",{children:"Unit"}),(0,p.jsx)("th",{children:"Theoretical Stock"}),(0,p.jsx)("th",{children:"Actual Stock"}),(0,p.jsx)("th",{children:"Variance"}),(0,p.jsx)("th",{children:"Reason"})]})}),(0,p.jsx)("tbody",{children:Object.entries(se).map(e=>{let[t,r]=e;return(0,p.jsxs)(n.Fragment,{children:[(0,p.jsx)(U,{children:(0,p.jsx)("td",{colSpan:6,children:t})}),r.map(e=>{var t,r,n,a;return(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"}),(0,p.jsx)("td",{children:(null===(r=e.ingredient)||void 0===r?void 0:r.unit)||"-"}),(0,p.jsx)("td",{children:e.theoretical_stock}),(0,p.jsx)("td",{children:(0,p.jsx)(m,{type:"number",step:"0.01",value:null!==(n=e.actual_stock)&&void 0!==n?n:"",onChange:t=>ee(e.id,"actual_stock",t.target.value),placeholder:"Enter"})}),(0,p.jsx)(y,{variance:e.variance,children:null!==e.variance?(0,p.jsxs)(p.Fragment,{children:[e.variance>0?"+":"",e.variance.toFixed(2)," ",null===(a=e.ingredient)||void 0===a?void 0:a.unit,null!==e.variance_value&&(0,p.jsxs)("span",{style:{display:"block",fontSize:"12px"},children:["(",(0,u.vv)(Math.abs(e.variance_value),o),")"]})]}):"-"}),(0,p.jsx)("td",{children:null!==e.variance&&0!==e.variance&&(0,p.jsxs)(b,{value:e.variance_reason||"",onChange:t=>ee(e.id,"variance_reason",t.target.value||null),children:[(0,p.jsx)("option",{value:"",children:"Select..."}),(0,p.jsx)("option",{value:"waste",children:"Waste"}),(0,p.jsx)("option",{value:"breakage",children:"Breakage"}),(0,p.jsx)("option",{value:"recipe_variance",children:"Recipe Variance"}),(0,p.jsx)("option",{value:"unrecorded",children:"Unrecorded Use"}),(0,p.jsx)("option",{value:"measurement",children:"Measurement Error"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})})]},e.id)})]},t)})})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Items Counted"}),(0,p.jsxs)(A,{children:[te," / ",re]})]}),(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Items with Variance"}),(0,p.jsx)(A,{color:"#D97706",children:oe})]}),(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Total Loss Value"}),(0,p.jsx)(A,{color:ae<0?"#DC2626":"#059669",children:(0,u.vv)(Math.abs(ae),o)})]})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(i.cc,{variant:"secondary",onClick:async()=>{if(Y&&X&&window.confirm("Cancel this stock take? All entered data will be lost."))try{const e=await(0,h.ff)(`/api/restaurants/${X}/stock-takes/${Y.id}/cancel`,{method:"POST"});e.success?Z():alert(e.message||"Failed to cancel stock take")}catch(e){console.error("Failed to cancel stock take:",e),alert("Failed to cancel stock take")}},disabled:K,children:"Cancel"}),(0,p.jsx)(i.cc,{variant:"secondary",onClick:async()=>{if(Y&&X)try{Q(!0);const e=q.filter(e=>null!==e.actual_stock).map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes})),t=await(0,h.ff)(`/api/restaurants/${X}/stock-takes/${Y.id}/items`,{method:"PUT",body:JSON.stringify({items:e})});t.success?alert("Progress saved"):alert(t.message||"Failed to save progress")}catch(e){console.error("Failed to save progress:",e),alert("Failed to save progress")}finally{Q(!1)}},disabled:K,children:K?"Saving...":"Save Progress"}),(0,p.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(!Y||!X)return;const e=q.filter(e=>null===e.actual_stock);if(e.length>0)alert(`Please count all items. ${e.length} items remaining.`);else if(window.confirm("Complete this stock take? This will update all stock levels to the counted values."))try{Q(!0);const e=q.map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,h.ff)(`/api/restaurants/${X}/stock-takes/${Y.id}/items`,{method:"PUT",body:JSON.stringify({items:e})});const t=await(0,h.ff)(`/api/restaurants/${X}/stock-takes/${Y.id}/complete`,{method:"POST"});t.success?(alert("Stock take completed successfully"),Z()):alert(t.message||"Failed to complete stock take")}catch(t){console.error("Failed to complete stock take:",t),alert("Failed to complete stock take")}finally{Q(!1)}},disabled:K||te<re,children:K?"Processing...":"Complete Stock Take"})]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(B,{children:[(0,p.jsx)($,{children:"What is Stock Take?"}),(0,p.jsxs)(D,{children:[(0,p.jsx)(z,{children:"Stock Take is a process of physically counting all ingredients in your inventory"}),(0,p.jsx)(z,{children:"It helps identify discrepancies between system records and actual stock"}),(0,p.jsx)(z,{children:"Regular stock takes help reduce loss and improve inventory accuracy"}),(0,p.jsx)(z,{children:"We recommend doing a stock take at least once a week"})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Ready to Start?"}),(0,p.jsx)(S,{children:"Click the button below to begin counting your inventory. You can save your progress and continue later if needed. Once completed, your stock levels will be updated automatically."}),(0,p.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(X)try{V(!0);const e=await(0,h.ff)(`/api/restaurants/${X}/stock-takes`,{method:"POST"});e.success?(W(e.data),G(e.data.items||[])):alert(e.message||"Failed to start stock take")}catch(e){console.error("Failed to start stock take:",e),alert("Failed to start stock take")}finally{V(!1)}},children:"Start Stock Take"})]}),H.length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.hE,{style:{fontSize:"18px",marginTop:"48px"},children:"Previous Stock Takes"}),(0,p.jsx)(T,{children:H.filter(e=>"in_progress"!==e.status).map(e=>(0,p.jsxs)(P,{status:e.status,children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(I,{children:new Date(e.stock_take_date).toLocaleDateString()}),(0,p.jsxs)(R,{children:[e.total_items," items |",e.items_with_variance>0&&` ${e.items_with_variance} with variance |`,null!==e.total_variance_value&&` Loss: ${(0,u.vv)(Math.abs(e.total_variance_value),o)}`]})]}),(0,p.jsx)(M,{status:e.status,children:"completed"===e.status?"Completed":"Cancelled"})]},e.id))})]})]})})]})}):(0,p.jsx)(s.A,{children:(0,p.jsx)(c.mc,{children:(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Access Denied"}),(0,p.jsx)(S,{children:"Please log in with a restaurant account."})]})})})}}}]);