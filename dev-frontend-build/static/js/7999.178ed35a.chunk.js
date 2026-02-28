"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7999],{1840:(e,t,r)=>{r.d(t,{ff:()=>a});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const o="";n();async function a(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r=`${o}${e}`,n=localStorage.getItem("auth_token"),a={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...t.headers},...t},i=await fetch(r,a);if(!i.ok){const e=await i.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${i.status}`)}return i.json()}},3705:(e,t,r)=>{r.d(t,{cc:()=>o});var n=r(4752);const o=n.Ay.button`
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
`},4021:(e,t,r)=>{r.d(t,{i1:()=>i});var n=r(9950),o=r(1367),a=r(6038);const i=()=>{const{user:e}=(0,o.As)(),[t,r]=(0,n.useState)("RM"),[i,s]=(0,n.useState)(Object.keys(a.DL)),[c,l]=(0,n.useState)(!0),[d,u]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let o=n>=0?t[n+1]:null;if(!o&&null!==e&&void 0!==e&&e.restaurant_id&&(o=e.restaurant_id.toString()),!o)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${o}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";r(n)}else r("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),u("Failed to load currency settings"),r("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:c,error:d}}},7999:(e,t,r)=>{r.r(t),r.d(t,{default:()=>U});var n=r(9950),o=r(4492),a=r(4752),i=r(3705),s=r(2674),c=r(1367),l=r(4021),d=r(6038),u=r(1840),h=r(4414);const p=a.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,x=a.Ay.div`
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
`,g=a.Ay.div`
  width: ${e=>e.percentage}%;
  height: 100%;
  background: #635BFF;
  transition: width 0.3s ease;
`,v=a.Ay.div`
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
`,k=a.Ay.td`
  color: ${e=>null===e.variance||0===e.variance?"#0A2540":e.variance>0?"#059669":"#DC2626"};
  font-weight: 600;
`,y=a.Ay.div`
  display: flex;
  gap: 24px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 24px;
`,j=a.Ay.div`
  text-align: center;
`,w=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,F=a.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: ${e=>e.color||"#0A2540"};
`,A=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,_=a.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`,C=a.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 12px;
`,E=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`,S=a.Ay.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`,B=a.Ay.h4`
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
`,T=a.Ay.div`
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
`,P=a.Ay.div``,O=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,I=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,R=a.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"completed":return"background: #D1FAE5; color: #059669;";case"cancelled":return"background: #FEE2E2; color: #DC2626;";default:return"background: #FEF3C7; color: #D97706;"}}}
`,M=a.Ay.tr`
  background: #F3F4F6 !important;

  td {
    font-weight: 600;
    color: #374151;
    padding: 10px 16px;
  }
`,U=()=>{const{user:e}=(0,c.As)(),{restaurantId:t}=(0,o.g)(),{defaultCurrency:r}=(0,l.i1)(),[a,U]=(0,n.useState)("RM"),[L,N]=(0,n.useState)(!0),[V,Y]=(0,n.useState)(null),[W,H]=(0,n.useState)([]),[J,q]=(0,n.useState)([]),[G,K]=(0,n.useState)(!1),Q=t?parseInt(t,10):null===e||void 0===e?void 0:e.restaurant_id;(0,n.useEffect)(()=>{r&&U(r)},[r]);const X=(0,n.useCallback)(async()=>{if(Q)try{N(!0);const e=await(0,u.ff)(`/api/restaurants/${Q}/stock-takes?limit=20`);if(e.success){const t=e.data;H(t);const r=t.find(e=>"in_progress"===e.status);if(r){const e=await(0,u.ff)(`/api/restaurants/${Q}/stock-takes/${r.id}`);e.success&&(Y(e.data),q(e.data.items||[]))}else Y(null),q([])}}catch(e){console.error("Failed to fetch stock takes:",e)}finally{N(!1)}},[Q]);(0,n.useEffect)(()=>{X()},[X]);const Z=(e,t,r)=>{q(n=>n.map(n=>{if(n.id===e){const e={...n,[t]:r};if("actual_stock"===t&&null!==r&&""!==r){const t=parseFloat(r);e.actual_stock=t,e.variance=parseFloat(String(n.theoretical_stock))-t,e.variance_value=e.variance*parseFloat(String(n.unit_cost))}return e}return n}))},ee=J.filter(e=>null!==e.actual_stock).length,te=J.length,re=te>0?ee/te*100:0,ne=J.reduce((e,t)=>e+(parseFloat(String(t.variance_value))||0),0),oe=J.filter(e=>null!==e.variance&&0!==e.variance).length,ae=J.reduce((e,t)=>{var r;const n=(null===(r=t.ingredient)||void 0===r?void 0:r.category)||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{});return Q?L?(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(s.mc,{children:[(0,h.jsx)(s.Y9,{children:(0,h.jsx)(s.hE,{children:"Stock Take"})}),(0,h.jsx)(_,{children:(0,h.jsx)(E,{children:"Loading..."})})]})}):(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(s.mc,{children:[(0,h.jsxs)(s.Y9,{children:[(0,h.jsx)(s.hE,{children:"Stock Take"}),(0,h.jsx)(s.ex,{children:(0,h.jsx)(s.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${Q}/inventory`,children:"Back to Inventory"})})]}),(0,h.jsx)(s.UC,{children:V?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(S,{children:[(0,h.jsx)(B,{children:"How to Complete Stock Take"}),(0,h.jsxs)($,{children:[(0,h.jsx)(z,{children:"Physically count each ingredient in your inventory"}),(0,h.jsx)(z,{children:'Enter the actual quantity in the "Actual Stock" column'}),(0,h.jsx)(z,{children:"If there's a variance, select a reason from the dropdown"}),(0,h.jsx)(z,{children:'Click "Save Progress" to save your work and continue later'}),(0,h.jsx)(z,{children:'When all items are counted, click "Complete Stock Take" to finalize'})]})]}),(0,h.jsx)(p,{children:'The "Theoretical Stock" shows what the system expects based on purchases and sales. Any difference between theoretical and actual stock will be recorded as loss/gain.'}),(0,h.jsxs)(v,{children:["Progress: ",ee," / ",te," items counted"]}),(0,h.jsx)(x,{children:(0,h.jsx)(g,{percentage:re})}),(0,h.jsxs)(f,{children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:"Ingredient"}),(0,h.jsx)("th",{children:"Unit"}),(0,h.jsx)("th",{children:"Theoretical Stock"}),(0,h.jsx)("th",{children:"Actual Stock"}),(0,h.jsx)("th",{children:"Variance"}),(0,h.jsx)("th",{children:"Reason"})]})}),(0,h.jsx)("tbody",{children:Object.entries(ae).map(e=>{let[t,r]=e;return(0,h.jsxs)(n.Fragment,{children:[(0,h.jsx)(M,{children:(0,h.jsx)("td",{colSpan:6,children:t})}),r.map(e=>{var t,r,n,o;return(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"}),(0,h.jsx)("td",{children:(null===(r=e.ingredient)||void 0===r?void 0:r.unit)||"-"}),(0,h.jsx)("td",{children:e.theoretical_stock}),(0,h.jsx)("td",{children:(0,h.jsx)(b,{type:"number",step:"0.01",value:null!==(n=e.actual_stock)&&void 0!==n?n:"",onChange:t=>Z(e.id,"actual_stock",t.target.value),placeholder:"Enter"})}),(0,h.jsx)(k,{variance:e.variance,children:null!==e.variance?(0,h.jsxs)(h.Fragment,{children:[e.variance>0?"+":"",e.variance.toFixed(2)," ",null===(o=e.ingredient)||void 0===o?void 0:o.unit,null!==e.variance_value&&(0,h.jsxs)("span",{style:{display:"block",fontSize:"12px"},children:["(",(0,d.vv)(Math.abs(e.variance_value),a),")"]})]}):"-"}),(0,h.jsx)("td",{children:null!==e.variance&&0!==e.variance&&(0,h.jsxs)(m,{value:e.variance_reason||"",onChange:t=>Z(e.id,"variance_reason",t.target.value||null),children:[(0,h.jsx)("option",{value:"",children:"Select..."}),(0,h.jsx)("option",{value:"waste",children:"Waste"}),(0,h.jsx)("option",{value:"breakage",children:"Breakage"}),(0,h.jsx)("option",{value:"recipe_variance",children:"Recipe Variance"}),(0,h.jsx)("option",{value:"unrecorded",children:"Unrecorded Use"}),(0,h.jsx)("option",{value:"measurement",children:"Measurement Error"}),(0,h.jsx)("option",{value:"other",children:"Other"})]})})]},e.id)})]},t)})})]}),(0,h.jsxs)(y,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Items Counted"}),(0,h.jsxs)(F,{children:[ee," / ",te]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Items with Variance"}),(0,h.jsx)(F,{color:"#D97706",children:oe})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Total Loss Value"}),(0,h.jsx)(F,{color:ne<0?"#DC2626":"#059669",children:(0,d.vv)(Math.abs(ne),a)})]})]}),(0,h.jsxs)(A,{children:[(0,h.jsx)(i.cc,{variant:"secondary",onClick:async()=>{if(V&&Q&&window.confirm("Cancel this stock take? All entered data will be lost."))try{(await(0,u.ff)(`/api/restaurants/${Q}/stock-takes/${V.id}/cancel`,{method:"POST"})).success&&X()}catch(e){console.error("Failed to cancel stock take:",e)}},disabled:G,children:"Cancel"}),(0,h.jsx)(i.cc,{variant:"secondary",onClick:async()=>{if(V&&Q)try{K(!0);const e=J.filter(e=>null!==e.actual_stock).map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,u.ff)(`/api/restaurants/${Q}/stock-takes/${V.id}/items`,{method:"PUT",body:JSON.stringify({items:e})})}catch(e){console.error("Failed to save progress:",e)}finally{K(!1)}},disabled:G,children:G?"Saving...":"Save Progress"}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(!V||!Q)return;if(!(J.filter(e=>null===e.actual_stock).length>0)&&window.confirm("Complete this stock take? This will update all stock levels to the counted values."))try{K(!0);const e=J.map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,u.ff)(`/api/restaurants/${Q}/stock-takes/${V.id}/items`,{method:"PUT",body:JSON.stringify({items:e})});(await(0,u.ff)(`/api/restaurants/${Q}/stock-takes/${V.id}/complete`,{method:"POST"})).success&&X()}catch(e){console.error("Failed to complete stock take:",e)}finally{K(!1)}},disabled:G||ee<te,children:G?"Processing...":"Complete Stock Take"})]})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(S,{children:[(0,h.jsx)(B,{children:"What is Stock Take?"}),(0,h.jsxs)($,{children:[(0,h.jsx)(z,{children:"Stock Take is a process of physically counting all ingredients in your inventory"}),(0,h.jsx)(z,{children:"It helps identify discrepancies between system records and actual stock"}),(0,h.jsx)(z,{children:"Regular stock takes help reduce loss and improve inventory accuracy"}),(0,h.jsx)(z,{children:"We recommend doing a stock take at least once a week"})]})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)(C,{children:"Ready to Start?"}),(0,h.jsx)(E,{children:"Click the button below to begin counting your inventory. You can save your progress and continue later if needed. Once completed, your stock levels will be updated automatically."}),(0,h.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(Q)try{N(!0);const e=await(0,u.ff)(`/api/restaurants/${Q}/stock-takes`,{method:"POST"});e.success&&(Y(e.data),q(e.data.items||[]))}catch(e){console.error("Failed to start stock take:",e)}finally{N(!1)}},children:"Start Stock Take"})]}),W.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.hE,{style:{fontSize:"18px",marginTop:"48px"},children:"Previous Stock Takes"}),(0,h.jsx)(D,{children:W.filter(e=>"in_progress"!==e.status).map(e=>(0,h.jsxs)(T,{status:e.status,children:[(0,h.jsxs)(P,{children:[(0,h.jsx)(O,{children:new Date(e.stock_take_date).toLocaleDateString()}),(0,h.jsxs)(I,{children:[e.total_items," items |",e.items_with_variance>0&&` ${e.items_with_variance} with variance |`,null!==e.total_variance_value&&` Loss: ${(0,d.vv)(Math.abs(e.total_variance_value),a)}`]})]}),(0,h.jsx)(R,{status:e.status,children:"completed"===e.status?"Completed":"Cancelled"})]},e.id))})]})]})})]})}):(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(s.mc,{children:(0,h.jsxs)(_,{children:[(0,h.jsx)(C,{children:"Access Denied"}),(0,h.jsx)(E,{children:"Please log in with a restaurant account."})]})})})}}}]);