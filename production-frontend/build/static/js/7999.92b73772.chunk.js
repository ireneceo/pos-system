"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7999],{1840:(e,t,n)=>{n.d(t,{ff:()=>a});function r(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",r()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const o="";r();async function a(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=`${o}${e}`,r={credentials:"include",headers:{"Content-Type":"application/json",...t.headers},...t},a=await fetch(n,r);if(!a.ok){const e=await a.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${a.status}`)}return a.json()}},3705:(e,t,n)=>{n.d(t,{cc:()=>o});var r=n(4752);const o=r.Ay.button`
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
`},4021:(e,t,n)=>{n.d(t,{i1:()=>i});var r=n(9950),o=n(1367),a=n(6038);const i=()=>{const{user:e}=(0,o.As)(),[t,n]=(0,r.useState)("RM"),[i,s]=(0,r.useState)(Object.keys(a.DL)),[c,l]=(0,r.useState)(!0),[d,u]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let o=r>=0?t[r+1]:null;if(!o&&null!==e&&void 0!==e&&e.restaurant_id&&(o=e.restaurant_id.toString()),!o)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${o}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";n(r)}else n("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),u("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:c,error:d}}},7999:(e,t,n)=>{n.r(t),n.d(t,{default:()=>L});var r=n(9950),o=n(4492),a=n(4752),i=n(3310),s=n(3705),c=n(7492),l=n(1367),d=n(4021),u=n(6038),h=n(1840),p=n(4414);const x=a.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,g=a.Ay.div`
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
`,v=a.Ay.div`
  width: ${e=>e.percentage}%;
  height: 100%;
  background: #635BFF;
  transition: width 0.3s ease;
`,f=a.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
`,b=a.Ay.table`
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
`,k=a.Ay.input`
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
`,m=a.Ay.select`
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,y=a.Ay.td`
  color: ${e=>null===e.variance||0===e.variance?"#0A2540":e.variance>0?"#059669":"#DC2626"};
  font-weight: 600;
`,j=a.Ay.div`
  display: flex;
  gap: 24px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 24px;
`,w=a.Ay.div`
  text-align: center;
`,F=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,A=a.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: ${e=>e.color||"#0A2540"};
`,C=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,E=a.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`,_=a.Ay.h3`
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
`,B=a.Ay.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`,$=a.Ay.h4`
  font-size: 15px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 12px;
`,D=a.Ay.ol`
  margin: 0;
  padding-left: 20px;
  color: #166534;
  font-size: 14px;
  line-height: 1.8;
`,z=a.Ay.li`
  margin-bottom: 4px;
`,T=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`,P=a.Ay.div`
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
`,O=a.Ay.div``,I=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,R=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,M=a.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"completed":return"background: #D1FAE5; color: #059669;";case"cancelled":return"background: #FEE2E2; color: #DC2626;";default:return"background: #FEF3C7; color: #D97706;"}}}
`,U=a.Ay.tr`
  background: #F3F4F6 !important;

  td {
    font-weight: 600;
    color: #374151;
    padding: 10px 16px;
  }
`,L=()=>{const{user:e}=(0,l.As)(),{restaurantId:t}=(0,o.g)(),{defaultCurrency:n}=(0,d.i1)(),[a,L]=(0,r.useState)("RM"),[N,V]=(0,r.useState)(!0),[Y,W]=(0,r.useState)(null),[H,J]=(0,r.useState)([]),[q,G]=(0,r.useState)([]),[K,Q]=(0,r.useState)(!1),X=t?parseInt(t,10):null===e||void 0===e?void 0:e.restaurant_id;(0,r.useEffect)(()=>{n&&L(n)},[n]);const Z=(0,r.useCallback)(async()=>{if(X)try{V(!0);const e=await(0,h.ff)(`/api/restaurants/${X}/stock-takes?limit=20`);if(e.success){const t=e.data;J(t);const n=t.find(e=>"in_progress"===e.status);if(n){const e=await(0,h.ff)(`/api/restaurants/${X}/stock-takes/${n.id}`);e.success&&(W(e.data),G(e.data.items||[]))}else W(null),G([])}}catch(e){console.error("Failed to fetch stock takes:",e)}finally{V(!1)}},[X]);(0,r.useEffect)(()=>{Z()},[Z]);const ee=(e,t,n)=>{G(r=>r.map(r=>{if(r.id===e){const e={...r,[t]:n};if("actual_stock"===t&&null!==n&&""!==n){const t=parseFloat(n);e.actual_stock=t,e.variance=parseFloat(String(r.theoretical_stock))-t,e.variance_value=e.variance*parseFloat(String(r.unit_cost))}return e}return r}))},te=q.filter(e=>null!==e.actual_stock).length,ne=q.length,re=ne>0?te/ne*100:0,oe=q.reduce((e,t)=>e+(parseFloat(String(t.variance_value))||0),0),ae=q.filter(e=>null!==e.variance&&0!==e.variance).length,ie=q.reduce((e,t)=>{var n;const r=(null===(n=t.ingredient)||void 0===n?void 0:n.category)||"Other";return e[r]||(e[r]=[]),e[r].push(t),e},{});return X?N?(0,p.jsx)(i.A,{children:(0,p.jsxs)(c.mc,{children:[(0,p.jsx)(c.Y9,{children:(0,p.jsx)(c.hE,{children:"Stock Take"})}),(0,p.jsx)(E,{children:(0,p.jsx)(S,{children:"Loading..."})})]})}):(0,p.jsx)(i.A,{children:(0,p.jsxs)(c.mc,{children:[(0,p.jsxs)(c.Y9,{children:[(0,p.jsx)(c.hE,{children:"Stock Take"}),(0,p.jsx)(c.ex,{children:(0,p.jsx)(c.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${X}/inventory`,children:"Back to Inventory"})})]}),(0,p.jsx)(c.UC,{children:Y?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(B,{children:[(0,p.jsx)($,{children:"How to Complete Stock Take"}),(0,p.jsxs)(D,{children:[(0,p.jsx)(z,{children:"Physically count each ingredient in your inventory"}),(0,p.jsx)(z,{children:'Enter the actual quantity in the "Actual Stock" column'}),(0,p.jsx)(z,{children:"If there's a variance, select a reason from the dropdown"}),(0,p.jsx)(z,{children:'Click "Save Progress" to save your work and continue later'}),(0,p.jsx)(z,{children:'When all items are counted, click "Complete Stock Take" to finalize'})]})]}),(0,p.jsx)(x,{children:'The "Theoretical Stock" shows what the system expects based on purchases and sales. Any difference between theoretical and actual stock will be recorded as loss/gain.'}),(0,p.jsxs)(f,{children:["Progress: ",te," / ",ne," items counted"]}),(0,p.jsx)(g,{children:(0,p.jsx)(v,{percentage:re})}),(0,p.jsxs)(b,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Ingredient"}),(0,p.jsx)("th",{children:"Unit"}),(0,p.jsx)("th",{children:"Theoretical Stock"}),(0,p.jsx)("th",{children:"Actual Stock"}),(0,p.jsx)("th",{children:"Variance"}),(0,p.jsx)("th",{children:"Reason"})]})}),(0,p.jsx)("tbody",{children:Object.entries(ie).map(e=>{let[t,n]=e;return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(U,{children:(0,p.jsx)("td",{colSpan:6,children:t})}),n.map(e=>{var t,n,r,o;return(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"}),(0,p.jsx)("td",{children:(null===(n=e.ingredient)||void 0===n?void 0:n.unit)||"-"}),(0,p.jsx)("td",{children:e.theoretical_stock}),(0,p.jsx)("td",{children:(0,p.jsx)(k,{type:"number",step:"0.01",value:null!==(r=e.actual_stock)&&void 0!==r?r:"",onChange:t=>ee(e.id,"actual_stock",t.target.value),placeholder:"Enter"})}),(0,p.jsx)(y,{variance:e.variance,children:null!==e.variance?(0,p.jsxs)(p.Fragment,{children:[e.variance>0?"+":"",e.variance.toFixed(2)," ",null===(o=e.ingredient)||void 0===o?void 0:o.unit,null!==e.variance_value&&(0,p.jsxs)("span",{style:{display:"block",fontSize:"12px"},children:["(",(0,u.vv)(Math.abs(e.variance_value),a),")"]})]}):"-"}),(0,p.jsx)("td",{children:null!==e.variance&&0!==e.variance&&(0,p.jsxs)(m,{value:e.variance_reason||"",onChange:t=>ee(e.id,"variance_reason",t.target.value||null),children:[(0,p.jsx)("option",{value:"",children:"Select..."}),(0,p.jsx)("option",{value:"waste",children:"Waste"}),(0,p.jsx)("option",{value:"breakage",children:"Breakage"}),(0,p.jsx)("option",{value:"recipe_variance",children:"Recipe Variance"}),(0,p.jsx)("option",{value:"unrecorded",children:"Unrecorded Use"}),(0,p.jsx)("option",{value:"measurement",children:"Measurement Error"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})})]},e.id)})]},t)})})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Items Counted"}),(0,p.jsxs)(A,{children:[te," / ",ne]})]}),(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Items with Variance"}),(0,p.jsx)(A,{color:"#D97706",children:ae})]}),(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Total Loss Value"}),(0,p.jsx)(A,{color:oe<0?"#DC2626":"#059669",children:(0,u.vv)(Math.abs(oe),a)})]})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(s.cc,{variant:"secondary",onClick:async()=>{if(Y&&X&&window.confirm("Cancel this stock take? All entered data will be lost."))try{(await(0,h.ff)(`/api/restaurants/${X}/stock-takes/${Y.id}/cancel`,{method:"POST"})).success&&Z()}catch(e){console.error("Failed to cancel stock take:",e)}},disabled:K,children:"Cancel"}),(0,p.jsx)(s.cc,{variant:"secondary",onClick:async()=>{if(Y&&X)try{Q(!0);const e=q.filter(e=>null!==e.actual_stock).map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,h.ff)(`/api/restaurants/${X}/stock-takes/${Y.id}/items`,{method:"PUT",body:JSON.stringify({items:e})})}catch(e){console.error("Failed to save progress:",e)}finally{Q(!1)}},disabled:K,children:K?"Saving...":"Save Progress"}),(0,p.jsx)(s.cc,{variant:"primary",onClick:async()=>{if(!Y||!X)return;if(!(q.filter(e=>null===e.actual_stock).length>0)&&window.confirm("Complete this stock take? This will update all stock levels to the counted values."))try{Q(!0);const e=q.map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,h.ff)(`/api/restaurants/${X}/stock-takes/${Y.id}/items`,{method:"PUT",body:JSON.stringify({items:e})});(await(0,h.ff)(`/api/restaurants/${X}/stock-takes/${Y.id}/complete`,{method:"POST"})).success&&Z()}catch(e){console.error("Failed to complete stock take:",e)}finally{Q(!1)}},disabled:K||te<ne,children:K?"Processing...":"Complete Stock Take"})]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(B,{children:[(0,p.jsx)($,{children:"What is Stock Take?"}),(0,p.jsxs)(D,{children:[(0,p.jsx)(z,{children:"Stock Take is a process of physically counting all ingredients in your inventory"}),(0,p.jsx)(z,{children:"It helps identify discrepancies between system records and actual stock"}),(0,p.jsx)(z,{children:"Regular stock takes help reduce loss and improve inventory accuracy"}),(0,p.jsx)(z,{children:"We recommend doing a stock take at least once a week"})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Ready to Start?"}),(0,p.jsx)(S,{children:"Click the button below to begin counting your inventory. You can save your progress and continue later if needed. Once completed, your stock levels will be updated automatically."}),(0,p.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(X)try{V(!0);const e=await(0,h.ff)(`/api/restaurants/${X}/stock-takes`,{method:"POST"});e.success&&(W(e.data),G(e.data.items||[]))}catch(e){console.error("Failed to start stock take:",e)}finally{V(!1)}},children:"Start Stock Take"})]}),H.length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.hE,{style:{fontSize:"18px",marginTop:"48px"},children:"Previous Stock Takes"}),(0,p.jsx)(T,{children:H.filter(e=>"in_progress"!==e.status).map(e=>(0,p.jsxs)(P,{status:e.status,children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(I,{children:new Date(e.stock_take_date).toLocaleDateString()}),(0,p.jsxs)(R,{children:[e.total_items," items |",e.items_with_variance>0&&` ${e.items_with_variance} with variance |`,null!==e.total_variance_value&&` Loss: ${(0,u.vv)(Math.abs(e.total_variance_value),a)}`]})]}),(0,p.jsx)(M,{status:e.status,children:"completed"===e.status?"Completed":"Cancelled"})]},e.id))})]})]})})]})}):(0,p.jsx)(i.A,{children:(0,p.jsx)(c.mc,{children:(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Access Denied"}),(0,p.jsx)(S,{children:"Please log in with a restaurant account."})]})})})}}}]);