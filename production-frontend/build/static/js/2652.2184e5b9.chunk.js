"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2652],{1840:(e,n,t)=>{t.d(n,{ff:()=>r});function s(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",s()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const o="";s();async function r(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${o}${e}`,s=localStorage.getItem("auth_token"),r={credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{},...n.headers},...n},i=await fetch(t,r);if(!i.ok){const e=await i.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${i.status}`)}return i.json()}},2652:(e,n,t)=>{t.r(n),t.d(n,{default:()=>$});var s=t(9950),o=t(4492),r=t(4752),i=t(3310),c=t(7492),l=t(2488),a=t(1367),d=t(9610),u=t(4021),h=t(6038),x=t(1840),p=t(5631),j=t(4414);const g=r.Ay.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,f=r.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,k=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,v=r.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  background: #F3F4F6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,m=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,y=r.Ay.div`
  display: flex;
  flex-direction: column;
`,_=r.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-family: monospace;
`,w=(r.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,r.Ay.button`
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  padding: 6px 12px;
  cursor: pointer;
  color: #6B7280;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;

  &:hover {
    background: #E5E7EB;
    color: #0A2540;
    border-color: #D1D5DB;
  }
`,r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`),b=(r.Ay.div``,r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`),F=(r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,(0,r.Ay)(c.A0)`
  @media (max-width: 1200px) {
    & > span:nth-child(5),
    & > span:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(4) {
      display: none;
    }
  }
`),C=(0,r.Ay)(c.Hj)`
  @media (max-width: 1200px) {
    & > div:nth-child(5),
    & > div:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(4) {
      display: none;
    }
  }
`,S=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s;

  &:hover {
    background: #F3F4F6;
  }
`,A=r.Ay.input`
  width: 80px;
  padding: 4px 8px;
  border: 1px solid #635BFF;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.2);
  }
`,E=r.Ay.button`
  padding: 6px 12px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #E5E7EB;
    color: #0A2540;
    border-color: #D1D5DB;
  }
`,$=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,o.ok)(),{defaultCurrency:r}=(0,u.i1)(),[$,D]=(0,s.useState)("RM"),B=n.get("tab")||"dashboard",z=e=>{t({tab:e})},[N,O]=(0,s.useState)(!0),[U,I]=(0,s.useState)(null),[P,R]=(0,s.useState)([]),[M,L]=(0,s.useState)(""),[T,Q]=(0,s.useState)("all"),[J,W]=(0,s.useState)("all"),[Z,q]=(0,s.useState)(0),[H,V]=(0,s.useState)(!1),[X,K]=(0,s.useState)(!1),[Y,G]=(0,s.useState)(null),[ee,ne]=(0,s.useState)(""),[te,se]=(0,s.useState)(""),[oe,re]=(0,s.useState)(null),[ie,ce]=(0,s.useState)(""),le=null===e||void 0===e?void 0:e.brand_id;(0,s.useEffect)(()=>{r&&D(r)},[r]);const ae=(0,s.useCallback)(async()=>{if(le)try{O(!0);const e=await(0,x.ff)(`/api/brands/${le}/ingredients`);if(e.success){const n=(e.data||[]).map(e=>{const n=parseFloat(e.current_stock)||0,t=parseFloat(e.min_stock)||0;let s="normal";return n<=0?s="out_of_stock":n<=t&&(s="low_stock"),{...e,current_stock:n,min_stock:t,stock_status:s}});R(n);const t=n.filter(e=>"low_stock"===e.stock_status).length,s=n.filter(e=>"out_of_stock"===e.stock_status).length,o=n.reduce((e,n)=>e+(parseFloat(n.current_stock)||0)*(parseFloat(n.unit_cost)||0),0);I({total_items:n.length,low_stock_count:t,out_of_stock_count:s,total_value:o})}}catch(e){console.error("Failed to fetch brand inventory data:",e)}finally{O(!1)}},[le]);(0,s.useEffect)(()=>{ae()},[ae]);const de=[...new Set(P.map(e=>e.category).filter(Boolean))],ue=P.filter(e=>{const n=e.name.toLowerCase().includes(M.toLowerCase())||e.code&&e.code.toLowerCase().includes(M.toLowerCase()),t="all"===T||e.stock_status===T,s="all"===J||e.category===J;return n&&t&&s}),he=e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}},xe=async e=>{if(!le)return;const n=parseFloat(ie);if(isNaN(n)||n<0)re(null);else{try{(await(0,x.ff)(`/api/brands/${le}/ingredients/${e.id}`,{method:"PUT",body:JSON.stringify({current_stock:n})})).success&&R(t=>t.map(t=>t.id===e.id?{...t,current_stock:n,stock_status:n<=0?"out_of_stock":n<=t.min_stock?"low_stock":"normal"}:t))}catch(t){console.error("Failed to update stock:",t)}re(null)}},pe=e=>{G(e),ne(""),se(""),V(!0)};return le?(0,j.jsxs)(i.A,{children:[(0,j.jsxs)(c.mc,{children:[(0,j.jsxs)(c.Y9,{children:[(0,j.jsx)(c.hE,{children:"Inventory Management"}),(0,j.jsx)(c.ex,{children:(0,j.jsx)(c.$n,{variant:"primary",onClick:()=>window.location.href="/pos/ingredients",children:"Manage Ingredients"})})]}),(0,j.jsxs)(c.UC,{children:[(0,j.jsxs)(c.j,{children:[(0,j.jsx)(c.oz,{active:"dashboard"===B,onClick:()=>z("dashboard"),children:"Dashboard"}),(0,j.jsx)(c.oz,{active:"list"===B,onClick:()=>z("list"),children:"Stock List"}),(0,j.jsxs)(c.oz,{active:"categories"===B,onClick:()=>z("categories"),children:["Categories (",Z,")"]})]}),N?(0,j.jsx)(c.pp,{children:"Loading..."}):"dashboard"===B?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(g,{children:"Brand-level inventory management for ingredients used in your recipes. Track stock levels, receive deliveries, and adjust quantities."}),(0,j.jsxs)(c.MD,{children:[(0,j.jsxs)(c.hI,{color:"#635BFF",children:[(0,j.jsx)(c.Os,{children:(null===U||void 0===U?void 0:U.total_items)||0}),(0,j.jsx)(c.v0,{children:"Total Items"}),(0,j.jsx)(c.d1,{children:"ingredients tracked"})]}),(0,j.jsxs)(c.hI,{color:"#059669",children:[(0,j.jsx)(c.Os,{children:(0,h.vv)((null===U||void 0===U?void 0:U.total_value)||0,$)}),(0,j.jsx)(c.v0,{children:"Total Value"}),(0,j.jsx)(c.d1,{children:"inventory worth"})]}),(0,j.jsxs)(c.hI,{color:"#D97706",children:[(0,j.jsx)(c.Os,{children:(null===U||void 0===U?void 0:U.low_stock_count)||0}),(0,j.jsx)(c.v0,{children:"Low Stock"}),(0,j.jsx)(c.d1,{children:"need attention"})]}),(0,j.jsxs)(c.hI,{color:"#DC2626",children:[(0,j.jsx)(c.Os,{children:(null===U||void 0===U?void 0:U.out_of_stock_count)||0}),(0,j.jsx)(c.v0,{children:"Out of Stock"}),(0,j.jsx)(c.d1,{children:"urgent"})]})]}),((null===U||void 0===U?void 0:U.low_stock_count)||0)+((null===U||void 0===U?void 0:U.out_of_stock_count)||0)>0&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(f,{children:"Stock Alerts"}),(0,j.jsxs)(c.XI,{children:[(0,j.jsxs)(F,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,j.jsx)("span",{children:"Ingredient"}),(0,j.jsx)("span",{children:"Status"}),(0,j.jsx)("span",{children:"Current"}),(0,j.jsx)("span",{children:"Min Stock"}),(0,j.jsx)("span",{children:"Actions"})]}),P.filter(e=>"low_stock"===e.stock_status||"out_of_stock"===e.stock_status).slice(0,5).map(e=>(0,j.jsxs)(C,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,j.jsxs)(c.Np,{children:[(0,j.jsx)(c.Uj,{children:(0,j.jsxs)(m,{children:[(0,j.jsx)(v,{children:e.image_url?(0,j.jsx)("img",{src:e.image_url,alt:e.name}):(0,j.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"-"})}),(0,j.jsxs)(y,{children:[(0,j.jsx)(b,{children:e.name}),e.code&&(0,j.jsx)(_,{children:e.code})]})]})}),(0,j.jsxs)(c.Uj,{children:[(0,j.jsx)(c.PM,{children:"Status"}),(0,j.jsx)(k,{status:e.stock_status,children:he(e.stock_status)})]}),(0,j.jsxs)(c.Uj,{children:[(0,j.jsx)(c.PM,{children:"Current"}),(0,j.jsxs)("div",{style:{fontWeight:600,color:"out_of_stock"===e.stock_status?"#DC2626":"#0A2540"},children:[e.current_stock," ",e.unit]})]}),(0,j.jsxs)(c.Uj,{children:[(0,j.jsx)(c.PM,{children:"Min Stock"}),(0,j.jsxs)("div",{children:[e.min_stock," ",e.unit]})]})]}),(0,j.jsx)(c.wr,{children:(0,j.jsx)(c.$n,{variant:"primary",onClick:()=>pe(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"})})]},e.id))]})]})]}):"list"===B?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(l.Qn,{children:[(0,j.jsx)(l.DO,{type:"text",placeholder:"Search ingredients...",value:M,onChange:e=>L(e.target.value)}),(0,j.jsxs)(l.Jt,{value:T,onChange:e=>Q(e.target.value),children:[(0,j.jsx)("option",{value:"all",children:"All Status"}),(0,j.jsx)("option",{value:"normal",children:"Normal"}),(0,j.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,j.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),(0,j.jsxs)(l.Jt,{value:J,onChange:e=>W(e.target.value),children:[(0,j.jsx)("option",{value:"all",children:"All Categories"}),de.map(e=>(0,j.jsx)("option",{value:e,children:e},e))]})]}),0===ue.length?(0,j.jsxs)(c.pp,{children:[(0,j.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No ingredients found"}),(0,j.jsx)("div",{style:{fontSize:"14px"},children:"Add ingredients in the Ingredients page to manage their stock here."})]}):(0,j.jsxs)(c.XI,{children:[(0,j.jsxs)(F,{columns:"2fr 1fr 1fr 1fr 1fr 150px",children:[(0,j.jsx)("span",{children:"Ingredient"}),(0,j.jsx)("span",{children:"Category"}),(0,j.jsx)("span",{children:"Status"}),(0,j.jsx)("span",{children:"Current Stock"}),(0,j.jsx)("span",{children:"Unit Cost"}),(0,j.jsx)("span",{children:"Actions"})]}),ue.map(e=>(0,j.jsxs)(C,{columns:"2fr 1fr 1fr 1fr 1fr 150px",children:[(0,j.jsxs)(c.Np,{children:[(0,j.jsx)(c.Uj,{children:(0,j.jsxs)(m,{children:[(0,j.jsx)(v,{children:e.image_url?(0,j.jsx)("img",{src:e.image_url,alt:e.name}):(0,j.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"-"})}),(0,j.jsxs)(y,{children:[(0,j.jsx)(b,{children:e.name}),e.code&&(0,j.jsx)(_,{children:e.code})]})]})}),(0,j.jsxs)(c.Uj,{children:[(0,j.jsx)(c.PM,{children:"Category"}),(0,j.jsx)("div",{children:e.category||"-"})]}),(0,j.jsxs)(c.Uj,{children:[(0,j.jsx)(c.PM,{children:"Status"}),(0,j.jsx)(k,{status:e.stock_status,children:he(e.stock_status)})]}),(0,j.jsxs)(c.Uj,{children:[(0,j.jsx)(c.PM,{children:"Current Stock"}),oe===e.id?(0,j.jsx)(A,{type:"number",value:ie,onChange:e=>ce(e.target.value),onBlur:()=>xe(e),onKeyDown:n=>((e,n)=>{"Enter"===e.key?xe(n):"Escape"===e.key&&re(null)})(n,e),autoFocus:!0}):(0,j.jsxs)(S,{onClick:()=>(e=>{re(e.id),ce(e.current_stock.toString())})(e),children:[(0,j.jsx)("span",{style:{fontWeight:600,color:"out_of_stock"===e.stock_status?"#DC2626":"#0A2540"},children:e.current_stock}),(0,j.jsx)("span",{style:{color:"#6B7280"},children:e.unit})]})]}),(0,j.jsxs)(c.Uj,{children:[(0,j.jsx)(c.PM,{children:"Unit Cost"}),(0,j.jsx)("div",{children:(0,h.vv)(e.unit_cost||0,$)})]})]}),(0,j.jsxs)(c.wr,{children:[(0,j.jsx)(c.$n,{variant:"primary",onClick:()=>pe(e),style:{padding:"6px 10px",fontSize:"12px"},children:"+"}),(0,j.jsx)(E,{onClick:()=>(e=>{G(e),ne(e.current_stock.toString()),se(""),K(!0)})(e),children:"Adjust"})]})]},e.id))]})]}):"categories"===B?(0,j.jsx)(p.A,{brandId:le,onCategoryCountChange:q}):null]})]}),H&&Y&&(0,j.jsxs)(d.aF,{isOpen:H,onClose:()=>V(!1),title:`Receive Stock - ${Y.name}`,children:[(0,j.jsxs)(d.gE,{children:[(0,j.jsx)(d.lR,{children:"Current Stock"}),(0,j.jsxs)("div",{style:{padding:"10px",background:"#F3F4F6",borderRadius:"6px",fontWeight:600},children:[Y.current_stock," ",Y.unit]})]}),(0,j.jsxs)(d.gE,{children:[(0,j.jsx)(d.lR,{children:"Quantity to Receive *"}),(0,j.jsx)(d.ZQ,{type:"number",value:ee,onChange:e=>ne(e.target.value),placeholder:`Enter quantity in ${Y.unit}`,min:"0",step:"0.01"})]}),(0,j.jsxs)(d.gE,{children:[(0,j.jsx)(d.lR,{children:"Notes"}),(0,j.jsx)(d.ZQ,{type:"text",value:te,onChange:e=>se(e.target.value),placeholder:"Optional notes"})]}),ee&&(0,j.jsxs)("div",{style:{padding:"12px",background:"#F0FDF4",borderRadius:"6px",marginTop:"12px"},children:[(0,j.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"New Stock Level:"}),(0,j.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#059669"},children:[(Y.current_stock+parseFloat(ee||"0")).toFixed(2)," ",Y.unit]})]}),(0,j.jsxs)(w,{children:[(0,j.jsx)(c.$n,{variant:"secondary",onClick:()=>V(!1),children:"Cancel"}),(0,j.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(Y&&ee&&le)try{const e=Y.current_stock+parseFloat(ee);(await(0,x.ff)(`/api/brands/${le}/ingredients/${Y.id}`,{method:"PUT",body:JSON.stringify({current_stock:e})})).success&&(ae(),V(!1))}catch(e){console.error("Failed to receive stock:",e)}},disabled:!ee,children:"Receive Stock"})]})]}),X&&Y&&(0,j.jsxs)(d.aF,{isOpen:X,onClose:()=>K(!1),title:`Adjust Stock - ${Y.name}`,children:[(0,j.jsxs)(d.gE,{children:[(0,j.jsx)(d.lR,{children:"New Stock Level *"}),(0,j.jsx)(d.ZQ,{type:"number",value:ee,onChange:e=>ne(e.target.value),placeholder:`Enter new quantity in ${Y.unit}`,min:"0",step:"0.01"})]}),(0,j.jsxs)(d.gE,{children:[(0,j.jsx)(d.lR,{children:"Reason for Adjustment"}),(0,j.jsx)(d.ZQ,{type:"text",value:te,onChange:e=>se(e.target.value),placeholder:"e.g., Stock count correction, waste, etc."})]}),(0,j.jsxs)(w,{children:[(0,j.jsx)(c.$n,{variant:"secondary",onClick:()=>K(!1),children:"Cancel"}),(0,j.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(Y&&ee&&le)try{(await(0,x.ff)(`/api/brands/${le}/ingredients/${Y.id}`,{method:"PUT",body:JSON.stringify({current_stock:parseFloat(ee)})})).success&&(ae(),K(!1))}catch(e){console.error("Failed to adjust stock:",e)}},disabled:!ee,children:"Save Adjustment"})]})]})]}):(0,j.jsx)(i.A,{children:(0,j.jsx)(c.mc,{children:(0,j.jsx)(c.pp,{children:(0,j.jsx)("p",{children:"Brand not found. Please log in with a brand account."})})})})}}}]);