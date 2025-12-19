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
`},4021:(e,t,r)=>{r.d(t,{i1:()=>o});var n=r(9950),a=r(1367);r(6038);const o=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,n.useState)("USD"),[o,s]=(0,n.useState)(["USD"]),[i,c]=(0,n.useState)(!0),[l,d]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{if(null===e||void 0===e||!e.brand_id)return r("USD"),s(["USD","MYR","KRW"]),void c(!1);try{const t=localStorage.getItem("token"),n=await fetch(`/api/currencies/brands/${e.brand_id}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&e.data&&(r(e.data.default_currency||"USD"),s(e.data.supported_currencies||["USD"]))}else r("USD"),s(["USD","MYR","KRW"])}catch(t){console.error("Failed to fetch brand currency:",t),d("Failed to load currency settings"),r("USD"),s(["USD","MYR","KRW"])}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.brand_id]),{defaultCurrency:t,supportedCurrencies:o,loading:i,error:l}}},7999:(e,t,r)=>{r.r(t),r.d(t,{default:()=>P});var n=r(9950),a=r(4752),o=r(3310),s=r(3705),i=r(7492),c=r(1367),l=r(4021),d=r(6038),u=r(1840),p=r(4414);const h=a.Ay.div`
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
`,k=a.Ay.select`
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,m=a.Ay.td`
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
`,S=a.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,_=a.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,E=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,C=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`,B=a.Ay.div`
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
`,D=a.Ay.div``,$=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,z=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,T=a.Ay.span`
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
`,P=()=>{const{user:e}=(0,c.As)(),{defaultCurrency:t}=(0,l.i1)(),[r,a]=(0,n.useState)("MYR"),[P,O]=(0,n.useState)(!0),[R,M]=(0,n.useState)(null),[Y,I]=(0,n.useState)([]),[N,L]=(0,n.useState)([]),[V,W]=(0,n.useState)(!1),K=null===e||void 0===e?void 0:e.restaurant_id;(0,n.useEffect)(()=>{t&&a(t)},[t]);const H=(0,n.useCallback)(async()=>{if(K)try{O(!0);const e=await(0,u.ff)(`/api/restaurants/${K}/stock-takes?limit=20`);if(e.success){const t=e.data;I(t);const r=t.find(e=>"in_progress"===e.status);if(r){const e=await(0,u.ff)(`/api/restaurants/${K}/stock-takes/${r.id}`);e.success&&(M(e.data),L(e.data.items||[]))}else M(null),L([])}}catch(e){console.error("Failed to fetch stock takes:",e)}finally{O(!1)}},[K]);(0,n.useEffect)(()=>{H()},[H]);const J=(e,t,r)=>{L(n=>n.map(n=>{if(n.id===e){const e={...n,[t]:r};if("actual_stock"===t&&null!==r&&""!==r){const t=parseFloat(r);e.actual_stock=t,e.variance=parseFloat(String(n.theoretical_stock))-t,e.variance_value=e.variance*parseFloat(String(n.unit_cost))}return e}return n}))},q=N.filter(e=>null!==e.actual_stock).length,G=N.length,Q=G>0?q/G*100:0,X=N.reduce((e,t)=>e+(parseFloat(String(t.variance_value))||0),0),Z=N.filter(e=>null!==e.variance&&0!==e.variance).length,ee=N.reduce((e,t)=>{var r;const n=(null===(r=t.ingredient)||void 0===r?void 0:r.category)||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{});return K?P?(0,p.jsx)(o.A,{children:(0,p.jsxs)(i.mc,{children:[(0,p.jsx)(i.Y9,{children:(0,p.jsx)(i.hE,{children:"Stock Take"})}),(0,p.jsx)(S,{children:(0,p.jsx)(E,{children:"Loading..."})})]})}):(0,p.jsx)(o.A,{children:(0,p.jsxs)(i.mc,{children:[(0,p.jsxs)(i.Y9,{children:[(0,p.jsx)(i.hE,{children:"Stock Take"}),(0,p.jsx)(i.ex,{children:(0,p.jsx)(s.cc,{variant:"secondary",onClick:()=>window.location.href=`/restaurants/${K}/inventory`,children:"Back to Inventory"})})]}),R?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(h,{children:"Measure and enter the actual quantity of each ingredient. When completed, your stock levels will be updated to match the counted values. Any difference between theoretical and actual stock will be recorded as Loss."}),(0,p.jsxs)(v,{children:["Progress: ",q," / ",G," items counted"]}),(0,p.jsx)(x,{children:(0,p.jsx)(g,{percentage:Q})}),(0,p.jsxs)(f,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Ingredient"}),(0,p.jsx)("th",{children:"Unit"}),(0,p.jsx)("th",{children:"Theoretical Stock"}),(0,p.jsx)("th",{children:"Actual Stock"}),(0,p.jsx)("th",{children:"Variance"}),(0,p.jsx)("th",{children:"Reason"})]})}),(0,p.jsx)("tbody",{children:Object.entries(ee).map(e=>{let[t,a]=e;return(0,p.jsxs)(n.Fragment,{children:[(0,p.jsx)(U,{children:(0,p.jsx)("td",{colSpan:6,children:t})}),a.map(e=>{var t,n,a,o;return(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"}),(0,p.jsx)("td",{children:(null===(n=e.ingredient)||void 0===n?void 0:n.unit)||"-"}),(0,p.jsx)("td",{children:e.theoretical_stock}),(0,p.jsx)("td",{children:(0,p.jsx)(b,{type:"number",step:"0.01",value:null!==(a=e.actual_stock)&&void 0!==a?a:"",onChange:t=>J(e.id,"actual_stock",t.target.value),placeholder:"Enter"})}),(0,p.jsx)(m,{variance:e.variance,children:null!==e.variance?(0,p.jsxs)(p.Fragment,{children:[e.variance>0?"+":"",e.variance.toFixed(2)," ",null===(o=e.ingredient)||void 0===o?void 0:o.unit,null!==e.variance_value&&(0,p.jsxs)("span",{style:{display:"block",fontSize:"12px"},children:["(",(0,d.vv)(Math.abs(e.variance_value),r),")"]})]}):"-"}),(0,p.jsx)("td",{children:null!==e.variance&&0!==e.variance&&(0,p.jsxs)(k,{value:e.variance_reason||"",onChange:t=>J(e.id,"variance_reason",t.target.value||null),children:[(0,p.jsx)("option",{value:"",children:"Select..."}),(0,p.jsx)("option",{value:"waste",children:"Waste"}),(0,p.jsx)("option",{value:"breakage",children:"Breakage"}),(0,p.jsx)("option",{value:"recipe_variance",children:"Recipe Variance"}),(0,p.jsx)("option",{value:"unrecorded",children:"Unrecorded Use"}),(0,p.jsx)("option",{value:"measurement",children:"Measurement Error"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})})]},e.id)})]},t)})})]}),(0,p.jsxs)(y,{children:[(0,p.jsxs)(j,{children:[(0,p.jsx)(w,{children:"Items Counted"}),(0,p.jsxs)(F,{children:[q," / ",G]})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(w,{children:"Items with Variance"}),(0,p.jsx)(F,{color:"#D97706",children:Z})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(w,{children:"Total Loss Value"}),(0,p.jsx)(F,{color:X<0?"#DC2626":"#059669",children:(0,d.vv)(Math.abs(X),r)})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(s.cc,{variant:"secondary",onClick:async()=>{if(R&&K&&window.confirm("Cancel this stock take? All entered data will be lost."))try{const e=await(0,u.ff)(`/api/restaurants/${K}/stock-takes/${R.id}/cancel`,{method:"POST"});e.success?H():alert(e.message||"Failed to cancel stock take")}catch(e){console.error("Failed to cancel stock take:",e),alert("Failed to cancel stock take")}},disabled:V,children:"Cancel"}),(0,p.jsx)(s.cc,{variant:"secondary",onClick:async()=>{if(R&&K)try{W(!0);const e=N.filter(e=>null!==e.actual_stock).map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes})),t=await(0,u.ff)(`/api/restaurants/${K}/stock-takes/${R.id}/items`,{method:"PUT",body:JSON.stringify({items:e})});t.success?alert("Progress saved"):alert(t.message||"Failed to save progress")}catch(e){console.error("Failed to save progress:",e),alert("Failed to save progress")}finally{W(!1)}},disabled:V,children:V?"Saving...":"Save Progress"}),(0,p.jsx)(s.cc,{variant:"primary",onClick:async()=>{if(!R||!K)return;const e=N.filter(e=>null===e.actual_stock);if(e.length>0)alert(`Please count all items. ${e.length} items remaining.`);else if(window.confirm("Complete this stock take? This will update all stock levels to the counted values."))try{W(!0);const e=N.map(e=>({id:e.id,actual_stock:e.actual_stock,variance_reason:e.variance_reason,notes:e.notes}));await(0,u.ff)(`/api/restaurants/${K}/stock-takes/${R.id}/items`,{method:"PUT",body:JSON.stringify({items:e})});const t=await(0,u.ff)(`/api/restaurants/${K}/stock-takes/${R.id}/complete`,{method:"POST"});t.success?(alert("Stock take completed successfully"),H()):alert(t.message||"Failed to complete stock take")}catch(t){console.error("Failed to complete stock take:",t),alert("Failed to complete stock take")}finally{W(!1)}},disabled:V||q<G,children:V?"Processing...":"Complete Stock Take"})]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(S,{children:[(0,p.jsx)(_,{children:"Start a New Stock Take"}),(0,p.jsx)(E,{children:"Count your physical inventory and compare it with the system records. This helps identify loss and keep your stock levels accurate."}),(0,p.jsx)(s.cc,{variant:"primary",onClick:async()=>{if(K)try{O(!0);const e=await(0,u.ff)(`/api/restaurants/${K}/stock-takes`,{method:"POST"});e.success?(M(e.data),L(e.data.items||[])):alert(e.message||"Failed to start stock take")}catch(e){console.error("Failed to start stock take:",e),alert("Failed to start stock take")}finally{O(!1)}},children:"Start Stock Take"})]}),Y.length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i.hE,{style:{fontSize:"18px",marginTop:"48px"},children:"Previous Stock Takes"}),(0,p.jsx)(C,{children:Y.filter(e=>"in_progress"!==e.status).map(e=>(0,p.jsxs)(B,{status:e.status,children:[(0,p.jsxs)(D,{children:[(0,p.jsx)($,{children:new Date(e.stock_take_date).toLocaleDateString()}),(0,p.jsxs)(z,{children:[e.total_items," items |",e.items_with_variance>0&&` ${e.items_with_variance} with variance |`,null!==e.total_variance_value&&` Loss: ${(0,d.vv)(Math.abs(e.total_variance_value),r)}`]})]}),(0,p.jsx)(T,{status:e.status,children:"completed"===e.status?"Completed":"Cancelled"})]},e.id))})]})]})]})}):(0,p.jsx)(o.A,{children:(0,p.jsx)(i.mc,{children:(0,p.jsxs)(S,{children:[(0,p.jsx)(_,{children:"Access Denied"}),(0,p.jsx)(E,{children:"Please log in with a restaurant account."})]})})})}}}]);