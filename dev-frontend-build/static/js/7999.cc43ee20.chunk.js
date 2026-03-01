"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7999],{1840:(e,t,r)=>{r.d(t,{ff:()=>a});function o(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",o()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const n="";o();async function a(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r=`${n}${e}`,o=localStorage.getItem("auth_token"),a={credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{},...t.headers},...t},i=await fetch(r,a);if(!i.ok){const e=await i.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${i.status}`)}return i.json()}},3705:(e,t,r)=>{r.d(t,{cc:()=>a.$n});var o=r(8819),n=r(4752),a=r(8829);n.Ay.select`
  padding: ${o.w.components.form.inputPadding};
  border: 1px solid ${o.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${o.w.typography.fontSize.sm};
  background: ${o.w.colors.surface};
  color: ${o.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: ${o.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${o.w.colors.borderHover};
  }
`,n.Ay.input`
  padding: ${o.w.components.form.inputPadding};
  border: 1px solid ${o.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${o.w.typography.fontSize.sm};
  background: ${o.w.colors.surface};
  color: ${o.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: ${o.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${o.w.colors.borderHover};
  }
`,n.Ay.div`
  background: ${o.w.colors.surface};
  border-radius: ${o.w.borderRadius.md};
  border: 1px solid ${o.w.colors.borderLight};
  padding: ${o.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${o.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${o.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${o.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,t,r)=>{r.d(t,{i1:()=>i});var o=r(9950),n=r(1367),a=r(6038);const i=()=>{const{user:e}=(0,n.As)(),[t,r]=(0,o.useState)("RM"),[i,s]=(0,o.useState)(Object.keys(a.DL)),[c,l]=(0,o.useState)(!0),[d,u]=(0,o.useState)(null);return(0,o.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),o=t.indexOf("restaurant");let n=o>=0?t[o+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),o=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";r(o)}else r("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),u("Failed to load currency settings"),r("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:c,error:d}}},7999:(e,t,r)=>{r.r(t),r.d(t,{default:()=>U});var o=r(8819),n=r(9950),a=r(4492),i=r(4752),s=r(3705),c=r(2674),l=r(1367),d=r(4021),u=r(6038),h=r(1840),p=r(4414);const x=i.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,g=i.Ay.div`
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
`,m=i.Ay.div`
  width: ${e=>e.percentage}%;
  height: 100%;
  background: ${o.w.colors.primary};
  transition: width 0.3s ease;
`,v=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
`,f=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${o.w.colors.border};

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
`,k=i.Ay.input`
  width: 100px;
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,w=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,y=i.Ay.td`
  color: ${e=>null===e.variance||0===e.variance?"#0A2540":e.variance>0?"#059669":"#DC2626"};
  font-weight: 600;
`,b=i.Ay.div`
  display: flex;
  gap: 24px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 24px;
`,j=i.Ay.div`
  text-align: center;
`,$=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,F=i.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: ${e=>e.color||"#0A2540"};
`,A=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,S=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid ${o.w.colors.border};
`,_=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${o.w.colors.secondary};
  margin-bottom: 12px;
`,C=i.Ay.p`
  font-size: 14px;
  color: ${o.w.colors.text.muted};
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`,E=i.Ay.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`,T=i.Ay.h4`
  font-size: 15px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 12px;
`,z=i.Ay.ol`
  margin: 0;
  padding-left: 20px;
  color: #166534;
  font-size: 14px;
  line-height: 1.8;
`,D=i.Ay.li`
  margin-bottom: 4px;
`,B=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`,P=i.Ay.div`
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
`,O=i.Ay.div``,R=i.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,I=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,L=i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"completed":return"background: #D1FAE5; color: #059669;";case"cancelled":return"background: #FEE2E2; color: #DC2626;";default:return"background: #FEF3C7; color: #D97706;"}}}
`,M=i.Ay.tr`
  background: #F3F4F6 !important;

  td {
    font-weight: 600;
    color: #374151;
    padding: 10px 16px;
  }
`,U=()=>{const{user:e}=(0,l.As)(),{restaurantId:t}=(0,a.g)(),{defaultCurrency:r}=(0,d.i1)(),[o,i]=(0,n.useState)("RM"),[U,H]=(0,n.useState)(!0),[N,V]=(0,n.useState)(null),[W,Y]=(0,n.useState)([]),[J,q]=(0,n.useState)([]),[G,K]=(0,n.useState)(!1),Q=t?parseInt(t,10):null===e||void 0===e?void 0:e.restaurant_id;(0,n.useEffect)(()=>{r&&i(r)},[r]);const X=(0,n.useCallback)(async()=>{if(Q)try{H(!0);const e=await(0,h.ff)(`/api/restaurants/${Q}/stock-takes?limit=20`);if(e.success){const t=e.data;Y(t);const r=t.find(e=>"in_progress"===e.status);if(r){const e=await(0,h.ff)(`/api/restaurants/${Q}/stock-takes/${r.id}`);e.success&&(V(e.data),q(e.data.items||[]))}else V(null),q([])}}catch(e){console.error("Failed to fetch stock takes:",e)}finally{H(!1)}},[Q]);(0,n.useEffect)(()=>{X()},[X]);const Z=(e,t,r)=>{q(o=>o.map(o=>{if(o.id===e){const e={...o,[t]:r};if("actual_stock"===t&&null!==r&&""!==r){const t=parseFloat(r);e.actual_stock=t,e.variance=parseFloat(String(o.theoretical_stock))-t,e.variance_value=e.variance*parseFloat(String(o.unit_cost))}return e}return o}))},ee=J.filter(e=>null!==e.actual_stock).length,te=J.length,re=te>0?ee/te*100:0,oe=J.reduce((e,t)=>e+(parseFloat(String(t.variance_value))||0),0),ne=J.filter(e=>null!==e.variance&&0!==e.variance).length,ae=J.reduce((e,t)=>{var r;const o=(null===(r=t.ingredient)||void 0===r?void 0:r.category)||"Other";return e[o]||(e[o]=[]),e[o].push(t),e},{});return Q?U?(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(c.mc,{children:[(0,p.jsx)(c.Y9,{children:(0,p.jsx)(c.hE,{children:"Stock Take"})}),(0,p.jsx)(S,{children:(0,p.jsx)(C,{children:"Loading..."})})]})}):(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(c.mc,{children:[(0,p.jsxs)(c.Y9,{children:[(0,p.jsx)(c.hE,{children:"Stock Take"}),(0,p.jsx)(c.ex,{children:(0,p.jsx)(c.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${Q}/inventory`,children:"Back to Inventory"})})]}),(0,p.jsx)(c.UC,{children:N?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(T,{children:"How to Complete Stock Take"}),(0,p.jsxs)(z,{children:[(0,p.jsx)(D,{children:"Physically count each ingredient in your inventory"}),(0,p.jsx)(D,{children:'Enter the actual quantity in the "Actual Stock" column'}),(0,p.jsx)(D,{children:"If there's a variance, select a reason from the dropdown"}),(0,p.jsx)(D,{children:'Click "Save Progress" to save your work and continue later'}),(0,p.jsx)(D,{children:'When all items are counted, click "Complete Stock Take" to finalize'})]})]}),(0,p.jsx)(x,{children:'The "Theoretical Stock" shows what the system expects based on purchases and sales. Any difference between theoretical and actual stock will be recorded as loss/gain.'}),(0,p.jsxs)(v,{children:["Progress: ",ee," / ",te," items counted"]}),(0,p.jsx)(g,{children:(0,p.jsx)(m,{percentage:re})}),(0,p.jsxs)(f,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Ingredient"}),(0,p.jsx)("th",{children:"Unit"}),(0,p.jsx)("th",{children:"Theoretical Stock"}),(0,p.jsx)("th",{children:"Actual Stock"}),(0,p.jsx)("th",{children:"Variance"}),(0,p.jsx)("th",{children:"Reason"})]})}),(0,p.jsx)("tbody",{children:Object.entries(ae).map(e=>{let[t,r]=e;return(0,p.jsxs)(n.Fragment,{children:[(0,p.jsx)(M,{children:(0,p.jsx)("td",{colSpan:6,children:t})}),r.map(e=>{var t,r,n,a;return(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"}),(0,p.jsx)("td",{children:(null===(r=e.ingredient)||void 0===r?void 0:r.unit)||"-"}),(0,p.jsx)("td",{children:e.theoretical_stock}),(0,p.jsx)("td",{children:(0,p.jsx)(k,{type:"number",step:"0.01",value:null!==(n=e.actual_stock)&&void 0!==n?n:"",onChange:t=>Z(e.id,"actual_stock",t.target.value),placeholder:"Enter"})}),(0,p.jsx)(y,{variance:e.variance,children:null!==e.variance?(0,p.jsxs)(p.Fragment,{children:[e.variance>0?"+":"",e.variance.toFixed(2)," ",null===(a=e.ingredient)||void 0===a?void 0:a.unit,null!==e.variance_value&&(0,p.jsxs)("span",{style:{display:"block",fontSize:"12px"},children:["(",(0,u.vv)(Math.abs(e.variance_value),o),")"]})]}):"-"}),(0,p.jsx)("td",{children:null!==e.variance&&0!==e.variance&&(0,p.jsxs)(w,{value:e.variance_reason||"",onChange:t=>Z(e.id,"variance_reason",t.target.value||null),children:[(0,p.jsx)("option",{value:"",children:"Select..."}),(0,p.jsx)("option",{value:"waste",children:"Waste"}),(0,p.jsx)("option",{value:"breakage",children:"Breakage"}),(0,p.jsx)("option",{value:"recipe_variance",children:"Recipe Variance"}),(0,p.jsx)("option",{value:"unrecorded",children:"Unrecorded Use"}),(0,p.jsx)("option",{value:"measurement",children:"Measurement Error"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})})]},e.id)})]},t)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsxs)(j,{children:[(0,p.jsx)($,{children:"Items Counted"}),(0,p.jsxs)(F,{children:[ee," / ",te]})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)($,{children:"Items with Variance"}),(0,p.jsx)(F,{color:"#D97706",children:ne})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)($,{children:"Total Loss Value"}),(0,p.jsx)(F,{color:oe<0?"#DC2626":"#059669",children:(0,u.vv)(Math.abs(oe),o)})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(s.cc,{variant:"secondary",onClick:async()=>{if(N&&Q&&window.confirm("Cancel this stock take? All entered data will be lost."))try{(await(0,h.ff)(`/api/restaurants/${Q}/stock-takes/${N.id}/cancel`,{method:"POST"})).success&&X()}catch(e){console.error("Failed to cancel stock take:",e)}},disabled:G,children:"Cancel"}),(0,p.jsx)(s.cc,{variant:"secondary",onClick:async()=>{if(N&&Q)try{K(!0);const e=J.filter(e=>null!==e.actual_stock).map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,h.ff)(`/api/restaurants/${Q}/stock-takes/${N.id}/items`,{method:"PUT",body:JSON.stringify({items:e})})}catch(e){console.error("Failed to save progress:",e)}finally{K(!1)}},disabled:G,children:G?"Saving...":"Save Progress"}),(0,p.jsx)(s.cc,{variant:"primary",onClick:async()=>{if(!N||!Q)return;if(!(J.filter(e=>null===e.actual_stock).length>0)&&window.confirm("Complete this stock take? This will update all stock levels to the counted values."))try{K(!0);const e=J.map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,h.ff)(`/api/restaurants/${Q}/stock-takes/${N.id}/items`,{method:"PUT",body:JSON.stringify({items:e})});(await(0,h.ff)(`/api/restaurants/${Q}/stock-takes/${N.id}/complete`,{method:"POST"})).success&&X()}catch(e){console.error("Failed to complete stock take:",e)}finally{K(!1)}},disabled:G||ee<te,children:G?"Processing...":"Complete Stock Take"})]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(T,{children:"What is Stock Take?"}),(0,p.jsxs)(z,{children:[(0,p.jsx)(D,{children:"Stock Take is a process of physically counting all ingredients in your inventory"}),(0,p.jsx)(D,{children:"It helps identify discrepancies between system records and actual stock"}),(0,p.jsx)(D,{children:"Regular stock takes help reduce loss and improve inventory accuracy"}),(0,p.jsx)(D,{children:"We recommend doing a stock take at least once a week"})]})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(_,{children:"Ready to Start?"}),(0,p.jsx)(C,{children:"Click the button below to begin counting your inventory. You can save your progress and continue later if needed. Once completed, your stock levels will be updated automatically."}),(0,p.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(Q)try{H(!0);const e=await(0,h.ff)(`/api/restaurants/${Q}/stock-takes`,{method:"POST"});e.success&&(V(e.data),q(e.data.items||[]))}catch(e){console.error("Failed to start stock take:",e)}finally{H(!1)}},children:"Start Stock Take"})]}),W.length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.hE,{style:{fontSize:"18px",marginTop:"48px"},children:"Previous Stock Takes"}),(0,p.jsx)(B,{children:W.filter(e=>"in_progress"!==e.status).map(e=>(0,p.jsxs)(P,{status:e.status,children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(R,{children:new Date(e.stock_take_date).toLocaleDateString()}),(0,p.jsxs)(I,{children:[e.total_items," items |",e.items_with_variance>0&&` ${e.items_with_variance} with variance |`,null!==e.total_variance_value&&` Loss: ${(0,u.vv)(Math.abs(e.total_variance_value),o)}`]})]}),(0,p.jsx)(L,{status:e.status,children:"completed"===e.status?"Completed":"Cancelled"})]},e.id))})]})]})})]})}):(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(c.mc,{children:(0,p.jsxs)(S,{children:[(0,p.jsx)(_,{children:"Access Denied"}),(0,p.jsx)(C,{children:"Please log in with a restaurant account."})]})})})}}}]);