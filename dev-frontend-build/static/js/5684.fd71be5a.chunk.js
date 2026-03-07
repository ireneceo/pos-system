"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5684],{2488:(e,n,r)=>{r.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>c});r(9950);var i=r(4752),t=r(4414);const a=i.Ay.div`
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
`,o=i.Ay.input`
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
`,s=i.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,l=i.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,d=i.Ay.select`
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
`,c=e=>{let{children:n,className:r,style:i,...o}=e;return(0,t.jsx)(a,{className:r,style:i,...o,children:n})},p=e=>{let{placeholder:n="Search...",value:r,onChange:i,style:a,...d}=e;return(0,t.jsxs)(s,{style:a,children:[(0,t.jsx)(o,{placeholder:n,value:r,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...d}),r&&(0,t.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,t.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...r}=e;return(0,t.jsx)(d,{...r,children:n})}},5684:(e,n,r)=>{r.r(n),r.d(n,{default:()=>V});var i=r(9950),t=r(4752),a=r(8409),o=r(2488),s=r(1367),l=r(6038),d=r(7617),c=r(4414);const p=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,x=t.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid ${e=>e.isPopular?"#635BFF":"#E6EBF1"};
  position: relative;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  display: flex;
  flex-direction: column;
  min-height: 450px;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  ${e=>e.isPopular&&"\n    &::before {\n      content: 'Most Popular';\n      position: absolute;\n      top: -12px;\n      left: 50%;\n      transform: translateX(-50%);\n      background: #635BFF;\n      color: white;\n      padding: 6px 16px;\n      border-radius: 20px;\n      font-size: 12px;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n  "}
`,h=t.Ay.div`
  text-align: center;
  margin-bottom: 24px;
  margin-top: 36px;
`,u=t.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,g=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,y=t.Ay.div`
  text-align: center;
`,v=t.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,m=t.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,j=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,f=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,b=t.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,A=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,w=t.Ay.div`
  text-align: center;
`,_=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,F=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,k=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,B=t.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,C=t.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"fixed"===e.chargeType?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"fixed"===e.chargeType?"#1E40AF":"#92400E"};
`,E=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,S=t.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3); }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}
`,z=t.Ay.div`
  margin-bottom: 20px;
`,$=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,P=t.Ay.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,D=t.Ay.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,T=t.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,R=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,M=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,I=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: #635BFF; }
  label { font-size: 14px; color: #0A2540; cursor: pointer; }
`,N=t.Ay.div`
  margin-bottom: 24px;
  h4 { font-size: 16px; font-weight: 600; color: #0A2540; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E6EBF1; }
`,O=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,W=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,L=t.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,Y=t.Ay.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #E6EBF1;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,J=t.Ay.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #EFF6FF;
  border-radius: 8px;
  border: 1px solid #BFDBFE;
`,U=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`,Q=t.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,H=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  background: ${e=>e.isAssigned?"#F0FDF4":"white"};
  &:last-child { border-bottom: none; }
`,K={previous_month:"Previous Month",previous_year:"Previous Year",up_to_billing_day:"Up to Billing Day"},V=()=>{const{user:e}=(0,s.As)(),[n,r]=(0,i.useState)([]),[t,V]=(0,i.useState)(!0),X=(null===e||void 0===e?void 0:e.foodcourt_id)||null,[q,G]=(0,i.useState)(""),[Z,ee]=(0,i.useState)("all"),[ne,re]=(0,i.useState)(""),[ie,te]=(0,i.useState)({}),[ae,oe]=(0,i.useState)([]),[se,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(!1),[he,ue]=(0,i.useState)(!1),[ge,ye]=(0,i.useState)(!1),[ve,me]=(0,i.useState)(null),[je,fe]=(0,i.useState)({}),[be,Ae]=(0,i.useState)([]),we={name:"",description:"",charge_type:"fixed",percentage_value:"",revenue_base:"previous_month",billing_day:"",auto_generate:!0,currency_prices:{},features:"",is_popular:!1,is_active:!0},[_e,Fe]=(0,i.useState)(we),[ke,Be]=(0,i.useState)(we),[Ce,Ee]=(0,i.useState)(!1),[Se,ze]=(0,i.useState)(null),$e=(0,i.useCallback)(async e=>{try{V(!0);const n=localStorage.getItem("auth_token"),i=await fetch(`/api/foodcourts/${e}/plans`,{headers:{Authorization:`Bearer ${n}`}});if(i.ok){const e=await i.json();r(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching plans:",n)}finally{V(!1)}},[]);(0,i.useEffect)(()=>{X&&$e(X),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();te(n.currencies||n.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const n=((await e.json()).data||[]).map(e=>e.code);oe(n),n.length>0&&re(e=>e||n[0])}}catch(e){console.error("Error fetching supported currencies:",e),oe(["MYR","KRW"]),re(e=>e||"MYR")}})()},[X,$e]);const Pe=(e,n)=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===ne);if(r)return parseFloat("monthly"===n?r.monthly_price:r.annual_price)||0}return 0},De=e=>{if(e.prices&&e.prices.length>0){const n=e.prices.find(e=>e.currency===ne);return!(!n||!(parseFloat(n.monthly_price)>0||parseFloat(n.annual_price)>0))}return!1},Te=(e,n)=>De(e)?(0,l.vv)(Pe(e,n),ne):"Not Set",Re=e=>{var n;return(null===(n=e.planRestaurants)||void 0===n?void 0:n.filter(e=>e.is_active).length)||0},Me=e=>{me(e),X&&(async(e,n)=>{try{const t=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${e}/plans/${n}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(a.ok){const e=await a.json(),n=e.success?e.data:Array.isArray(e)?e:[],t={};for(const a of n){var r,i;t[a.currency]={monthly:(null===(r=a.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(i=a.annual_price)||void 0===i?void 0:i.toString())||"0"}}for(const r of ae)t[r]||(t[r]={monthly:"0",annual:"0"});fe(t)}}catch(t){console.error("Error fetching plan prices:",t)}})(X,e.id),ue(!0)},Ie=e=>{me(e),X&&(async e=>{try{const n=localStorage.getItem("auth_token"),r=await fetch(`/api/foodcourts/${e}/restaurants`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();Ae(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching foodcourt restaurants:",n)}})(X),ye(!0)},Ne=n.filter(e=>{const n=e.name.toLowerCase().includes(q.toLowerCase())||(e.description||"").toLowerCase().includes(q.toLowerCase()),r="all"===Z||"active"===Z&&e.is_active||"inactive"===Z&&!e.is_active;return n&&r}),Oe=n.filter(e=>e.is_active).length,We=n.reduce((e,n)=>e+Re(n),0),Le=n.reduce((e,n)=>"fixed"===n.charge_type?e+Pe(n,"monthly")*Re(n):e,0),Ye=(e,n)=>(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(Y,{children:"Charge Type"}),(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Charge Type *"}),(0,c.jsxs)(D,{value:e.charge_type,onChange:e=>n(n=>({...n,charge_type:e.target.value})),children:[(0,c.jsx)("option",{value:"fixed",children:"Fixed Amount (Currency Pricing)"}),(0,c.jsx)("option",{value:"percentage",children:"% of Revenue"})]})]}),"fixed"===e.charge_type?(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[ae.map(r=>{var i,t,a,o;const s=ie[r];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===s||void 0===s?void 0:s.symbol)||r," ",r," - ",(null===s||void 0===s?void 0:s.name)||r]}),(0,c.jsxs)(R,{children:[(0,c.jsxs)(z,{style:{marginBottom:0},children:[(0,c.jsx)($,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(P,{type:"number",placeholder:"0",value:(null===(i=e.currency_prices)||void 0===i||null===(t=i[r])||void 0===t?void 0:t.monthly)||"",onChange:e=>n(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[r],monthly:e.target.value}}}})})]}),(0,c.jsxs)(z,{style:{marginBottom:0},children:[(0,c.jsx)($,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(P,{type:"number",placeholder:"0",value:(null===(a=e.currency_prices)||void 0===a||null===(o=a[r])||void 0===o?void 0:o.annual)||"",onChange:e=>n(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[r],annual:e.target.value}}}})})]})]})]},r)}),0===ae.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Revenue Percentage (%)"}),(0,c.jsx)(P,{type:"number",step:"0.01",placeholder:"e.g., 5.00",value:e.percentage_value,onChange:e=>n(n=>({...n,percentage_value:e.target.value}))})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Revenue Base Period"}),(0,c.jsxs)(D,{value:e.revenue_base,onChange:e=>n(n=>({...n,revenue_base:e.target.value})),children:[(0,c.jsx)("option",{value:"previous_month",children:"Previous Month"}),(0,c.jsx)("option",{value:"previous_year",children:"Previous Year"}),(0,c.jsx)("option",{value:"up_to_billing_day",children:"Up to Billing Day"})]})]})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Billing Day (1-28)"}),(0,c.jsx)(P,{type:"number",min:"1",max:"28",placeholder:"e.g., 15 (empty = subscription start date)",value:e.billing_day,onChange:e=>n(n=>({...n,billing_day:e.target.value}))}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to use subscription start date. Invoice auto-generated 14 days before billing day."})]})]});return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(a.mc,{children:[(0,c.jsxs)(a.Y9,{children:[(0,c.jsx)(a.hE,{children:"Subscription Plans"}),(0,c.jsx)(a.ex,{children:(0,c.jsx)(a.$n,{variant:"primary",onClick:()=>{Fe({...we,currency_prices:{}}),le(!0)},children:"Create Plan"})})]}),(0,c.jsxs)(a.UC,{children:[(0,c.jsxs)(a.MD,{children:[(0,c.jsxs)(a.hI,{color:"#059669",children:[(0,c.jsx)(a.Os,{children:n.length}),(0,c.jsx)(a.v0,{children:"Total Plans"}),(0,c.jsxs)(a.d1,{children:[Oe," active"]})]}),(0,c.jsxs)(a.hI,{color:"#10B981",children:[(0,c.jsx)(a.Os,{children:Oe}),(0,c.jsx)(a.v0,{children:"Active Plans"}),(0,c.jsxs)(a.d1,{children:[n.length>0?Math.round(Oe/n.length*100):0,"% available"]})]}),(0,c.jsxs)(a.hI,{color:"#F59E0B",children:[(0,c.jsx)(a.Os,{children:We}),(0,c.jsx)(a.v0,{children:"Total Tenants"}),(0,c.jsx)(a.d1,{children:"Across all plans"})]}),(0,c.jsxs)(a.hI,{color:"#DC2626",children:[(0,c.jsx)(a.Os,{children:(0,l.vv)(Le,ne)}),(0,c.jsx)(a.v0,{children:"Fixed Monthly Revenue"}),(0,c.jsx)(a.d1,{children:"From fixed-type plans"})]})]}),(0,c.jsxs)(o.Qn,{children:[(0,c.jsx)(o.DO,{type:"text",placeholder:"Search plans...",value:q,onChange:e=>G(e.target.value)}),(0,c.jsxs)(o.Jt,{value:Z,onChange:e=>ee(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,c.jsx)(o.Jt,{value:ne,onChange:e=>re(e.target.value),style:{minWidth:"150px"},children:ae.map(e=>{const n=ie[e];return(0,c.jsxs)("option",{value:e,children:[(null===n||void 0===n?void 0:n.symbol)||e," ",e]},e)})})]}),t?(0,c.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:"Loading plans..."}):0===Ne.length?(0,c.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===n.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,c.jsx)(p,{children:Ne.map(e=>(0,c.jsxs)(x,{isPopular:e.is_popular,isActive:e.is_active,children:[(0,c.jsxs)(B,{children:[(0,c.jsx)(C,{chargeType:e.charge_type||"fixed",children:"percentage"===e.charge_type?"% Revenue":"Fixed"}),(0,c.jsx)(k,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:e.name}),e.description&&(0,c.jsx)(g,{children:e.description}),(0,c.jsx)(y,{children:"percentage"===e.charge_type?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(v,{children:[parseFloat(e.percentage_value||"0"),"%"]}),(0,c.jsxs)(j,{children:["of revenue (",K[e.revenue_base]||e.revenue_base,")"]})]}):De(e)?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(v,{children:[Te(e,"monthly"),(0,c.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Pe(e,"annual")>0&&Pe(e,"monthly")>0&&(0,c.jsxs)(m,{children:[Te(e,"annual"),"/year",12*Pe(e,"monthly")>Pe(e,"annual")&&(0,c.jsxs)("span",{children:[" (Save ",Math.round((12*Pe(e,"monthly")-Pe(e,"annual"))/(12*Pe(e,"monthly"))*100),"%)"]})]}),(0,c.jsx)(j,{children:"Billed monthly or annually"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(v,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,c.jsxs)(j,{style:{color:"#F59E0B"},children:["Set ",ne,' price in "Prices"']})]})})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(U,{children:[(0,c.jsx)("span",{style:{color:"#1E40AF",fontWeight:500},children:"Billing Day"}),(0,c.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:e.billing_day?`Every ${e.billing_day}${1===e.billing_day?"st":2===e.billing_day?"nd":3===e.billing_day?"rd":"th"}`:"Subscription Start"})]}),e.auto_generate&&(0,c.jsxs)(U,{style:{marginTop:4},children:[(0,c.jsx)("span",{style:{color:"#1E40AF",fontWeight:500},children:"Auto-invoice"}),(0,c.jsx)("span",{style:{color:"#059669",fontWeight:600},children:"Enabled"})]})]}),Array.isArray(e.features)&&e.features.length>0&&(0,c.jsx)(f,{children:e.features.map((e,n)=>(0,c.jsx)(b,{children:e},n))}),(0,c.jsxs)(A,{children:[(0,c.jsxs)(w,{children:[(0,c.jsx)(_,{children:Re(e)}),(0,c.jsx)(F,{children:"Tenants"})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(_,{children:"fixed"===e.charge_type?(0,l.vv)(Pe(e,"monthly")*Re(e),ne):`${parseFloat(e.percentage_value||"0")}% rev`}),(0,c.jsx)(F,{children:"fixed"===e.charge_type?"Monthly Revenue":"Revenue Based"})]})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(S,{variant:"primary",onClick:()=>(e=>{var n,r;me(e);let i={};if(e.prices)for(const o of e.prices){var t,a;i[o.currency]={monthly:(null===(t=o.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(a=o.annual_price)||void 0===a?void 0:a.toString())||"0"}}Be({name:e.name,description:e.description||"",charge_type:e.charge_type||"fixed",percentage_value:(null===(n=e.percentage_value)||void 0===n?void 0:n.toString())||"0",revenue_base:e.revenue_base||"previous_month",billing_day:(null===(r=e.billing_day)||void 0===r?void 0:r.toString())||"",auto_generate:!1!==e.auto_generate,currency_prices:i,features:Array.isArray(e.features)?e.features.join("\n"):"",is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),ce(!0)})(e),children:"Edit"}),"fixed"===e.charge_type&&(0,c.jsx)(S,{variant:"secondary",onClick:()=>Me(e),children:"Prices"}),(0,c.jsx)(S,{variant:"secondary",onClick:()=>(e=>{me(e),xe(!0)})(e),children:"View"})]})]},e.id))}),se&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>le(!1),title:"Create New Plan",children:[(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Plan Name *"}),(0,c.jsx)(P,{type:"text",placeholder:"e.g., Monthly Rent, Management Fee, Revenue Share",value:_e.name,onChange:e=>Fe(n=>({...n,name:e.target.value}))})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Description"}),(0,c.jsx)(T,{placeholder:"Enter plan description...",rows:3,value:_e.description,onChange:e=>Fe(n=>({...n,description:e.target.value}))})]}),Ye(_e,Fe),(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Features (one per line)"}),(0,c.jsx)(T,{placeholder:"Enter features, one per line...",rows:4,value:_e.features,onChange:e=>Fe(n=>({...n,features:e.target.value}))})]}),(0,c.jsxs)(M,{children:[(0,c.jsxs)(I,{children:[(0,c.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:_e.auto_generate,onChange:e=>Fe(n=>({...n,auto_generate:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"create-auto-generate",children:"Auto-generate invoices"})]}),(0,c.jsxs)(I,{children:[(0,c.jsx)("input",{type:"checkbox",id:"create-popular",checked:_e.is_popular,onChange:e=>Fe(n=>({...n,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"create-popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(I,{children:[(0,c.jsx)("input",{type:"checkbox",id:"create-active",checked:_e.is_active,onChange:e=>Fe(n=>({...n,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"create-active",children:"Set as Active"})]})]})]}),de&&ve&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>ce(!1),title:"Edit Plan: {selectedPlan.name}",children:[(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Plan Name *"}),(0,c.jsx)(P,{type:"text",value:ke.name,onChange:e=>Be(n=>({...n,name:e.target.value}))})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Description"}),(0,c.jsx)(T,{rows:3,value:ke.description,onChange:e=>Be(n=>({...n,description:e.target.value}))})]}),Ye(ke,Be),(0,c.jsxs)(z,{children:[(0,c.jsx)($,{children:"Features (one per line)"}),(0,c.jsx)(T,{rows:4,value:ke.features,onChange:e=>Be(n=>({...n,features:e.target.value}))})]}),(0,c.jsxs)(M,{children:[(0,c.jsxs)(I,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:ke.auto_generate,onChange:e=>Be(n=>({...n,auto_generate:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-auto-generate",children:"Auto-generate invoices"})]}),(0,c.jsxs)(I,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-popular",checked:ke.is_popular,onChange:e=>Be(n=>({...n,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(I,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-active",checked:ke.is_active,onChange:e=>Be(n=>({...n,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),pe&&ve&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>xe(!1),title:"Plan Details: {selectedPlan.name}",children:[(0,c.jsxs)(N,{children:[(0,c.jsx)("h4",{children:"Plan Info"}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Plan ID"}),(0,c.jsx)(L,{children:ve.id})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Name"}),(0,c.jsx)(L,{children:ve.name})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Status"}),(0,c.jsx)(k,{isActive:ve.is_active,children:ve.is_active?"Active":"Inactive"})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Charge Type"}),(0,c.jsx)(C,{chargeType:ve.charge_type||"fixed",children:"percentage"===ve.charge_type?"% Revenue":"Fixed"})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Popular Plan"}),(0,c.jsx)(L,{children:ve.is_popular?"Yes":"No"})]})]}),(0,c.jsxs)(N,{children:[(0,c.jsx)("h4",{children:"Billing"}),"percentage"===ve.charge_type?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Revenue Percentage"}),(0,c.jsxs)(L,{children:[parseFloat(ve.percentage_value||"0"),"%"]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Revenue Base"}),(0,c.jsx)(L,{children:K[ve.revenue_base]||ve.revenue_base})]})]}):(0,c.jsx)(c.Fragment,{children:ae.map(e=>{var n,r;const i=null===(n=ve.prices)||void 0===n?void 0:n.find(n=>n.currency===e);if(!i)return null;const t=parseFloat(i.monthly_price)||0,a=parseFloat(i.annual_price)||0;return 0===t&&0===a?null:(0,c.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(r=ie[e])||void 0===r?void 0:r.symbol)||e," ",e]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Monthly"}),(0,c.jsx)(L,{children:(0,l.vv)(t,e)})]}),a>0&&(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Annual"}),(0,c.jsx)(L,{children:(0,l.vv)(a,e)})]})]},e)})}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Billing Day"}),(0,c.jsx)(L,{children:ve.billing_day?`Every ${ve.billing_day}th`:"Subscription Start Date"})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Auto-generate Invoices"}),(0,c.jsx)(L,{children:ve.auto_generate?"Yes":"No"})]})]}),(0,c.jsxs)(N,{children:[(0,c.jsx)("h4",{children:"Statistics"}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Current Tenants"}),(0,c.jsx)(L,{children:Re(ve)})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(W,{children:"Created Date"}),(0,c.jsx)(L,{children:new Date(ve.createdAt).toLocaleDateString()})]})]}),Array.isArray(ve.features)&&ve.features.length>0&&(0,c.jsxs)(N,{children:[(0,c.jsx)("h4",{children:"Features"}),(0,c.jsx)(f,{children:ve.features.map((e,n)=>(0,c.jsx)(b,{children:e},n))})]}),(0,c.jsxs)(N,{children:[(0,c.jsxs)("h4",{children:["Assigned Tenants (",Re(ve),")"]}),ve.planRestaurants&&ve.planRestaurants.length>0?(0,c.jsx)(Q,{children:ve.planRestaurants.map(e=>{var n;return(0,c.jsxs)(H,{isAssigned:!0,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||`Restaurant #${e.restaurant_id}`}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,c.jsx)(k,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No tenants assigned to this plan."}),(0,c.jsx)(a.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>Ie(ve),children:"Manage Tenant Assignments"})]})]}),he&&ve&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>ue(!1),title:"Set Prices for {selectedPlan.name}",children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,c.jsx)("div",{style:{display:"grid",gap:"16px"},children:ae.map(e=>{var n,r;const i=ie[e];return(0,c.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,c.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===i||void 0===i?void 0:i.symbol)||e}),(null===i||void 0===i?void 0:i.name)||e," (",e,")"]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,c.jsx)("input",{type:"number",value:(null===(n=je[e])||void 0===n?void 0:n.monthly)||"",onChange:n=>fe({...je,[e]:{...je[e],monthly:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,c.jsx)("input",{type:"number",value:(null===(r=je[e])||void 0===r?void 0:r.annual)||"",onChange:n=>fe({...je,[e]:{...je[e],annual:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},e)})})]}),ge&&ve&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>ye(!1),title:"Manage Tenants: {selectedPlan.name}",children:[(0,c.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove tenants from this plan."}),(0,c.jsxs)(Q,{children:[be.map(e=>{var n;const r=null===(n=ve.planRestaurants)||void 0===n?void 0:n.some(n=>n.restaurant_id===e.id&&n.is_active);return(0,c.jsxs)(H,{isAssigned:r,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.address||"No address"})]}),r?(0,c.jsx)(a.$n,{variant:"danger",onClick:()=>(async e=>{if(X&&ve)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/foodcourts/${X}/plans/${ve.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok){$e(X);const e=await fetch(`/api/foodcourts/${X}/plans/${ve.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();me(n.success?n.data:n)}}}catch(n){console.error("Error removing restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Remove"}):(0,c.jsx)(a.$n,{variant:"primary",onClick:()=>(async e=>{if(X&&ve)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/foodcourts/${X}/plans/${ve.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({restaurant_id:e})})).ok){$e(X);const e=await fetch(`/api/foodcourts/${X}/plans/${ve.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();me(n.success?n.data:n)}}}catch(n){console.error("Error assigning restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Assign"})]},e.id)}),0===be.length&&(0,c.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:"No tenants found in your foodcourt."})]})]})]})]}),(0,c.jsx)(d.A,{isOpen:Ce,title:"Delete Plan",message:"Are you sure you want to delete this plan? This action cannot be undone.",onConfirm:async()=>{if(X&&Se){Ee(!1);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/foodcourts/${X}/plans/${Se}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&(ce(!1),$e(X))}catch(e){console.error("Error deleting plan:",e)}ze(null)}},onCancel:()=>{Ee(!1),ze(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var i=r(4752),t=r(9610),a=r(4414);const o=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,s=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=i.Ay.button`
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
`,x=e=>{let{isOpen:n,title:r,message:i,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:y="warning"}=e;return n?(0,a.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(l,{children:r}),(0,a.jsx)(d,{children:i})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,a.jsx)(p,{variant:"primary",type:y,onClick:x,children:u})]})]})}):null}}}]);