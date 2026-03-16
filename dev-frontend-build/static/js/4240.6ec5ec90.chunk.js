"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4240],{2488:(e,n,r)=>{r.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>d});r(9950);var i=r(4752),t=r(4414);const a=i.Ay.div`
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
`,s=i.Ay.input`
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
`,o=i.Ay.div`
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
`,c=i.Ay.select`
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
`,d=e=>{let{children:n,className:r,style:i,...s}=e;return(0,t.jsx)(a,{className:r,style:i,...s,children:n})},p=e=>{let{placeholder:n="Search...",value:r,onChange:i,style:a,...c}=e;return(0,t.jsxs)(o,{style:a,children:[(0,t.jsx)(s,{placeholder:n,value:r,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...c}),r&&(0,t.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,t.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...r}=e;return(0,t.jsx)(c,{...r,children:n})}},4240:(e,n,r)=>{r.r(n),r.d(n,{default:()=>V});var i=r(9950),t=r(4752),a=r(8409),s=r(2488),o=r(1367),l=r(6038),c=r(7617),d=r(4414);const p=t.Ay.div`
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
`,_=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,A=t.Ay.div`
  text-align: center;
`,w=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,F=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,C=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,k=t.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,B=t.Ay.span`
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
`,$=t.Ay.div`
  margin-bottom: 20px;
`,z=t.Ay.label`
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
`,O=t.Ay.div`
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
`,M=t.Ay.div`
  margin-bottom: 24px;
  h4 { font-size: 16px; font-weight: 600; color: #0A2540; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E6EBF1; }
`,N=t.Ay.div`
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
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
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
`,K={previous_month:"Previous Month",previous_year:"Previous Year",up_to_billing_day:"Up to Billing Day"},V=()=>{const{user:e}=(0,o.As)(),[n,r]=(0,i.useState)([]),[t,V]=(0,i.useState)(!0),X=(null===e||void 0===e?void 0:e.brand_id)||null,[q,G]=(0,i.useState)(""),[Z,ee]=(0,i.useState)("all"),[ne,re]=(0,i.useState)(""),[ie,te]=(0,i.useState)({}),[ae,se]=(0,i.useState)([]),[oe,le]=(0,i.useState)(!1),[ce,de]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(!1),[he,ue]=(0,i.useState)(!1),[ge,ye]=(0,i.useState)(!1),[ve,me]=(0,i.useState)(null),[je,fe]=(0,i.useState)({}),[be,_e]=(0,i.useState)([]),Ae={name:"",description:"",charge_type:"fixed",percentage_value:"",revenue_base:"previous_month",billing_day:"",auto_generate:!0,currency_prices:{},features:"",is_popular:!1,is_active:!0},[we,Fe]=(0,i.useState)(Ae),[Ce,ke]=(0,i.useState)(Ae),[Be,Ee]=(0,i.useState)(!1),[Se,$e]=(0,i.useState)(null),ze=(0,i.useCallback)(async e=>{try{V(!0);const n=localStorage.getItem("auth_token"),i=await fetch(`/api/brands/${e}/plans`,{headers:{Authorization:`Bearer ${n}`}});if(i.ok){const e=await i.json();r(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching plans:",n)}finally{V(!1)}},[]);(0,i.useEffect)(()=>{X&&ze(X),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();te(n.currencies||n.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const n=((await e.json()).data||[]).map(e=>e.code);se(n),n.length>0&&re(e=>e||n[0])}}catch(e){console.error("Error fetching supported currencies:",e),se(["MYR","KRW"]),re(e=>e||"MYR")}})()},[X,ze]);const Pe=(e,n)=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===ne);if(r)return parseFloat("monthly"===n?r.monthly_price:r.annual_price)||0}return 0},De=e=>{if(e.prices&&e.prices.length>0){const n=e.prices.find(e=>e.currency===ne);return!(!n||!(parseFloat(n.monthly_price)>0||parseFloat(n.annual_price)>0))}return!1},Te=(e,n)=>De(e)?(0,l.vv)(Pe(e,n),ne):"Not Set",Re=e=>{var n;return(null===(n=e.planRestaurants)||void 0===n?void 0:n.filter(e=>e.is_active).length)||0},Oe=e=>{me(e),X&&(async(e,n)=>{try{const t=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${e}/plans/${n}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(a.ok){const e=await a.json(),n=e.success?e.data:Array.isArray(e)?e:[],t={};for(const a of n){var r,i;t[a.currency]={monthly:(null===(r=a.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(i=a.annual_price)||void 0===i?void 0:i.toString())||"0"}}for(const r of ae)t[r]||(t[r]={monthly:"0",annual:"0"});fe(t)}}catch(t){console.error("Error fetching plan prices:",t)}})(X,e.id),ue(!0)},Ie=e=>{me(e),X&&(async e=>{try{const n=localStorage.getItem("auth_token"),r=await fetch(`/api/brands/${e}/restaurants`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();_e(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching brand restaurants:",n)}})(X),ye(!0)},Me=n.filter(e=>{const n=e.name.toLowerCase().includes(q.toLowerCase())||(e.description||"").toLowerCase().includes(q.toLowerCase()),r="all"===Z||"active"===Z&&e.is_active||"inactive"===Z&&!e.is_active;return n&&r}),Ne=n.filter(e=>e.is_active).length,We=n.reduce((e,n)=>e+Re(n),0),Le=n.reduce((e,n)=>"fixed"===n.charge_type?e+Pe(n,"monthly")*Re(n):e,0),Ye=(e,n)=>(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(Y,{children:"Charge Type"}),(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Charge Type *"}),(0,d.jsxs)(D,{value:e.charge_type,onChange:e=>n(n=>({...n,charge_type:e.target.value})),children:[(0,d.jsx)("option",{value:"fixed",children:"Fixed Amount (Currency Pricing)"}),(0,d.jsx)("option",{value:"percentage",children:"% of Revenue"})]})]}),"fixed"===e.charge_type?(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Pricing by Currency"}),(0,d.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[ae.map(r=>{var i,t,a,s;const o=ie[r];return(0,d.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===o||void 0===o?void 0:o.symbol)||r," ",r," - ",(null===o||void 0===o?void 0:o.name)||r]}),(0,d.jsxs)(R,{children:[(0,d.jsxs)($,{style:{marginBottom:0},children:[(0,d.jsx)(z,{style:{fontSize:"12px"},children:"Monthly"}),(0,d.jsx)(P,{type:"number",placeholder:"0",value:(null===(i=e.currency_prices)||void 0===i||null===(t=i[r])||void 0===t?void 0:t.monthly)||"",onChange:e=>n(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[r],monthly:e.target.value}}}})})]}),(0,d.jsxs)($,{style:{marginBottom:0},children:[(0,d.jsx)(z,{style:{fontSize:"12px"},children:"Annual"}),(0,d.jsx)(P,{type:"number",placeholder:"0",value:(null===(a=e.currency_prices)||void 0===a||null===(s=a[r])||void 0===s?void 0:s.annual)||"",onChange:e=>n(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[r],annual:e.target.value}}}})})]})]})]},r)}),0===ae.length&&(0,d.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Revenue Percentage (%)"}),(0,d.jsx)(P,{type:"number",step:"0.01",placeholder:"e.g., 5.00",value:e.percentage_value,onChange:e=>n(n=>({...n,percentage_value:e.target.value}))})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Revenue Base Period"}),(0,d.jsxs)(D,{value:e.revenue_base,onChange:e=>n(n=>({...n,revenue_base:e.target.value})),children:[(0,d.jsx)("option",{value:"previous_month",children:"Previous Month"}),(0,d.jsx)("option",{value:"previous_year",children:"Previous Year"}),(0,d.jsx)("option",{value:"up_to_billing_day",children:"Up to Billing Day"})]})]})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Billing Day (1-28)"}),(0,d.jsx)(P,{type:"number",min:"1",max:"28",placeholder:"e.g., 15 (empty = subscription start date)",value:e.billing_day,onChange:e=>n(n=>({...n,billing_day:e.target.value}))}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to use subscription start date. Invoice auto-generated 14 days before billing day."})]})]});return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(a.mc,{children:[(0,d.jsxs)(a.Y9,{children:[(0,d.jsx)(a.hE,{children:"Subscription Plans"}),(0,d.jsx)(a.ex,{children:(0,d.jsx)(a.$n,{variant:"primary",onClick:()=>{Fe({...Ae,currency_prices:{}}),le(!0)},children:"Create Plan"})})]}),(0,d.jsxs)(a.UC,{children:[(0,d.jsxs)(a.MD,{children:[(0,d.jsxs)(a.hI,{color:"#059669",children:[(0,d.jsx)(a.Os,{children:n.length}),(0,d.jsx)(a.v0,{children:"Total Plans"}),(0,d.jsxs)(a.d1,{children:[Ne," active"]})]}),(0,d.jsxs)(a.hI,{color:"#10B981",children:[(0,d.jsx)(a.Os,{children:Ne}),(0,d.jsx)(a.v0,{children:"Active Plans"}),(0,d.jsxs)(a.d1,{children:[n.length>0?Math.round(Ne/n.length*100):0,"% available"]})]}),(0,d.jsxs)(a.hI,{color:"#F59E0B",children:[(0,d.jsx)(a.Os,{children:We}),(0,d.jsx)(a.v0,{children:"Total Subscriptions"}),(0,d.jsx)(a.d1,{children:"Across all plans"})]}),(0,d.jsxs)(a.hI,{color:"#DC2626",children:[(0,d.jsx)(a.Os,{children:(0,l.vv)(Le,ne)}),(0,d.jsx)(a.v0,{children:"Fixed Monthly Revenue"}),(0,d.jsx)(a.d1,{children:"From fixed-type plans"})]})]}),(0,d.jsxs)(s.Qn,{children:[(0,d.jsx)(s.DO,{type:"text",placeholder:"Search plans...",value:q,onChange:e=>G(e.target.value)}),(0,d.jsxs)(s.Jt,{value:Z,onChange:e=>ee(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,d.jsx)(s.Jt,{value:ne,onChange:e=>re(e.target.value),style:{minWidth:"150px"},children:ae.map(e=>{const n=ie[e];return(0,d.jsxs)("option",{value:e,children:[(null===n||void 0===n?void 0:n.symbol)||e," ",e]},e)})})]}),t?(0,d.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:"Loading plans..."}):0===Me.length?(0,d.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===n.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,d.jsx)(p,{children:Me.map(e=>(0,d.jsxs)(x,{isPopular:e.is_popular,isActive:e.is_active,children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(B,{chargeType:e.charge_type||"fixed",children:"percentage"===e.charge_type?"% Revenue":"Fixed"}),(0,d.jsx)(C,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(u,{children:e.name}),e.description&&(0,d.jsx)(g,{children:e.description}),(0,d.jsx)(y,{children:"percentage"===e.charge_type?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(v,{children:[parseFloat(e.percentage_value||"0"),"%"]}),(0,d.jsxs)(j,{children:["of revenue (",K[e.revenue_base]||e.revenue_base,")"]})]}):De(e)?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(v,{children:[Te(e,"monthly"),(0,d.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Pe(e,"annual")>0&&Pe(e,"monthly")>0&&(0,d.jsxs)(m,{children:[Te(e,"annual"),"/year",12*Pe(e,"monthly")>Pe(e,"annual")&&(0,d.jsxs)("span",{children:[" (Save ",Math.round((12*Pe(e,"monthly")-Pe(e,"annual"))/(12*Pe(e,"monthly"))*100),"%)"]})]}),(0,d.jsx)(j,{children:"Billed monthly or annually"})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(v,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,d.jsxs)(j,{style:{color:"#F59E0B"},children:["Set ",ne,' price in "Prices"']})]})})]}),(0,d.jsxs)(J,{children:[(0,d.jsxs)(U,{children:[(0,d.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:"Billing Day"}),(0,d.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:e.billing_day?`Every ${e.billing_day}${1===e.billing_day?"st":2===e.billing_day?"nd":3===e.billing_day?"rd":"th"}`:"Subscription Start"})]}),e.auto_generate&&(0,d.jsxs)(U,{style:{marginTop:4},children:[(0,d.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:"Auto-invoice"}),(0,d.jsx)("span",{style:{color:"#059669",fontWeight:600},children:"Enabled"})]})]}),Array.isArray(e.features)&&e.features.length>0&&(0,d.jsx)(f,{children:e.features.map((e,n)=>(0,d.jsx)(b,{children:e},n))}),(0,d.jsxs)(_,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(w,{children:Re(e)}),(0,d.jsx)(F,{children:"Subscriptions"})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(w,{children:"fixed"===e.charge_type?(0,l.vv)(Pe(e,"monthly")*Re(e),ne):`${parseFloat(e.percentage_value||"0")}% rev`}),(0,d.jsx)(F,{children:"fixed"===e.charge_type?"Monthly Revenue":"Revenue Based"})]})]}),(0,d.jsxs)(E,{children:[(0,d.jsx)(S,{variant:"primary",onClick:()=>(e=>{var n,r;me(e);let i={};if(e.prices)for(const s of e.prices){var t,a;i[s.currency]={monthly:(null===(t=s.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(a=s.annual_price)||void 0===a?void 0:a.toString())||"0"}}ke({name:e.name,description:e.description||"",charge_type:e.charge_type||"fixed",percentage_value:(null===(n=e.percentage_value)||void 0===n?void 0:n.toString())||"0",revenue_base:e.revenue_base||"previous_month",billing_day:(null===(r=e.billing_day)||void 0===r?void 0:r.toString())||"",auto_generate:!1!==e.auto_generate,currency_prices:i,features:Array.isArray(e.features)?e.features.join("\n"):"",is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),de(!0)})(e),children:"Edit"}),"fixed"===e.charge_type&&(0,d.jsx)(S,{variant:"secondary",onClick:()=>Oe(e),children:"Prices"}),(0,d.jsx)(S,{variant:"secondary",onClick:()=>(e=>{me(e),xe(!0)})(e),children:"View"})]})]},e.id))}),oe&&(0,d.jsxs)(a.aF,{isOpen:!0,onClose:()=>le(!1),title:"Create New Plan",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(X)try{const e=localStorage.getItem("auth_token"),n={name:we.name,description:we.description||null,charge_type:we.charge_type,billing_day:we.billing_day?parseInt(we.billing_day):null,auto_generate:we.auto_generate,currency:"MYR",is_popular:we.is_popular,is_active:we.is_active,features:we.features.split("\n").filter(e=>e.trim())};"percentage"===we.charge_type?(n.percentage_value=parseFloat(we.percentage_value)||0,n.revenue_base=we.revenue_base):n.currency_prices=Object.fromEntries(Object.entries(we.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));const r=await fetch(`/api/brands/${X}/plans`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok)le(!1),Fe({...Ae,currency_prices:{}}),ze(X);else{const e=await r.json();console.error("Failed to create plan:",e)}}catch(e){console.error("Error creating plan:",e)}},children:"Create Plan"})]}),children:[(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Plan Name *"}),(0,d.jsx)(P,{type:"text",placeholder:"e.g., Royalty Fee, Monthly Rent, Management Fee",value:we.name,onChange:e=>Fe(n=>({...n,name:e.target.value}))})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Description"}),(0,d.jsx)(T,{placeholder:"Enter plan description...",rows:3,value:we.description,onChange:e=>Fe(n=>({...n,description:e.target.value}))})]}),Ye(we,Fe),(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Features (one per line)"}),(0,d.jsx)(T,{placeholder:"Enter features, one per line...",rows:4,value:we.features,onChange:e=>Fe(n=>({...n,features:e.target.value}))})]}),(0,d.jsxs)(O,{children:[(0,d.jsxs)(I,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:we.auto_generate,onChange:e=>Fe(n=>({...n,auto_generate:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-auto-generate",children:"Auto-generate invoices"})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-popular",checked:we.is_popular,onChange:e=>Fe(n=>({...n,is_popular:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-popular",children:"Mark as Most Popular"})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-active",checked:we.is_active,onChange:e=>Fe(n=>({...n,is_active:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-active",children:"Set as Active"})]})]})]}),ce&&ve&&(0,d.jsxs)(a.aF,{isOpen:!0,onClose:()=>de(!1),title:`Edit Plan: ${ve.name}`,footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,d.jsx)(a.$n,{variant:"danger",onClick:()=>{return e=ve.id,$e(e),void Ee(!0);var e},children:"Delete"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(X&&ve)try{const e=localStorage.getItem("auth_token"),n={name:Ce.name,description:Ce.description||null,charge_type:Ce.charge_type,billing_day:Ce.billing_day?parseInt(Ce.billing_day):null,auto_generate:Ce.auto_generate,is_popular:Ce.is_popular,is_active:Ce.is_active,features:Ce.features.split("\n").filter(e=>e.trim())};"percentage"===Ce.charge_type&&(n.percentage_value=parseFloat(Ce.percentage_value)||0,n.revenue_base=Ce.revenue_base);const r=await fetch(`/api/brands/${X}/plans/${ve.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok){if("fixed"===Ce.charge_type&&Object.keys(Ce.currency_prices).length>0){const n=Object.fromEntries(Object.entries(Ce.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));await fetch(`/api/brands/${X}/plans/${ve.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})}de(!1),ze(X)}else{const e=await r.json();console.error("Failed to update plan:",e)}}catch(e){console.error("Error updating plan:",e)}},children:"Save Changes"})]}),children:[(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Plan Name *"}),(0,d.jsx)(P,{type:"text",value:Ce.name,onChange:e=>ke(n=>({...n,name:e.target.value}))})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Description"}),(0,d.jsx)(T,{rows:3,value:Ce.description,onChange:e=>ke(n=>({...n,description:e.target.value}))})]}),Ye(Ce,ke),(0,d.jsxs)($,{children:[(0,d.jsx)(z,{children:"Features (one per line)"}),(0,d.jsx)(T,{rows:4,value:Ce.features,onChange:e=>ke(n=>({...n,features:e.target.value}))})]}),(0,d.jsxs)(O,{children:[(0,d.jsxs)(I,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:Ce.auto_generate,onChange:e=>ke(n=>({...n,auto_generate:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-auto-generate",children:"Auto-generate invoices"})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-popular",checked:Ce.is_popular,onChange:e=>ke(n=>({...n,is_popular:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-active",checked:Ce.is_active,onChange:e=>ke(n=>({...n,is_active:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),pe&&ve&&(0,d.jsxs)(a.aF,{isOpen:!0,onClose:()=>xe(!1),title:`Plan Details: ${ve.name}`,footer:(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>xe(!1),children:"Close"})}),children:[(0,d.jsxs)(M,{children:[(0,d.jsx)("h4",{children:"Plan Info"}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Plan ID"}),(0,d.jsx)(L,{children:ve.id})]}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Name"}),(0,d.jsx)(L,{children:ve.name})]}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Status"}),(0,d.jsx)(C,{isActive:ve.is_active,children:ve.is_active?"Active":"Inactive"})]}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Charge Type"}),(0,d.jsx)(B,{chargeType:ve.charge_type||"fixed",children:"percentage"===ve.charge_type?"% Revenue":"Fixed"})]}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Popular Plan"}),(0,d.jsx)(L,{children:ve.is_popular?"Yes":"No"})]})]}),(0,d.jsxs)(M,{children:[(0,d.jsx)("h4",{children:"Billing"}),"percentage"===ve.charge_type?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Revenue Percentage"}),(0,d.jsxs)(L,{children:[parseFloat(ve.percentage_value||"0"),"%"]})]}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Revenue Base"}),(0,d.jsx)(L,{children:K[ve.revenue_base]||ve.revenue_base})]})]}):(0,d.jsx)(d.Fragment,{children:ae.map(e=>{var n,r;const i=null===(n=ve.prices)||void 0===n?void 0:n.find(n=>n.currency===e);if(!i)return null;const t=parseFloat(i.monthly_price)||0,a=parseFloat(i.annual_price)||0;return 0===t&&0===a?null:(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(r=ie[e])||void 0===r?void 0:r.symbol)||e," ",e]}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Monthly"}),(0,d.jsx)(L,{children:(0,l.vv)(t,e)})]}),a>0&&(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Annual"}),(0,d.jsx)(L,{children:(0,l.vv)(a,e)})]})]},e)})}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Billing Day"}),(0,d.jsx)(L,{children:ve.billing_day?`Every ${ve.billing_day}th`:"Subscription Start Date"})]}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Auto-generate Invoices"}),(0,d.jsx)(L,{children:ve.auto_generate?"Yes":"No"})]})]}),(0,d.jsxs)(M,{children:[(0,d.jsx)("h4",{children:"Statistics"}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Current Subscriptions"}),(0,d.jsx)(L,{children:Re(ve)})]}),(0,d.jsxs)(N,{children:[(0,d.jsx)(W,{children:"Created Date"}),(0,d.jsx)(L,{children:new Date(ve.createdAt).toLocaleDateString()})]})]}),Array.isArray(ve.features)&&ve.features.length>0&&(0,d.jsxs)(M,{children:[(0,d.jsx)("h4",{children:"Features"}),(0,d.jsx)(f,{children:ve.features.map((e,n)=>(0,d.jsx)(b,{children:e},n))})]}),(0,d.jsxs)(M,{children:[(0,d.jsxs)("h4",{children:["Assigned Restaurants (",Re(ve),")"]}),ve.planRestaurants&&ve.planRestaurants.length>0?(0,d.jsx)(Q,{children:ve.planRestaurants.map(e=>{var n;return(0,d.jsxs)(H,{isAssigned:!0,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||`Restaurant #${e.restaurant_id}`}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,d.jsx)(C,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,d.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No restaurants assigned to this plan."}),(0,d.jsx)(a.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>Ie(ve),children:"Manage Restaurant Assignments"})]})]}),he&&ve&&(0,d.jsxs)(a.aF,{isOpen:!0,onClose:()=>ue(!1),title:`Set Prices for ${ve.name}`,footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>ue(!1),children:"Cancel"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(X&&ve)try{const e=localStorage.getItem("auth_token"),n=Object.fromEntries(Object.entries(je).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));(await fetch(`/api/brands/${X}/plans/${ve.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})).ok&&(ue(!1),ze(X))}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]}),children:[(0,d.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,d.jsx)("div",{style:{display:"grid",gap:"16px"},children:ae.map(e=>{var n,r;const i=ie[e];return(0,d.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===i||void 0===i?void 0:i.symbol)||e}),(null===i||void 0===i?void 0:i.name)||e," (",e,")"]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,d.jsx)("input",{type:"number",value:(null===(n=je[e])||void 0===n?void 0:n.monthly)||"",onChange:n=>fe({...je,[e]:{...je[e],monthly:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,d.jsx)("input",{type:"number",value:(null===(r=je[e])||void 0===r?void 0:r.annual)||"",onChange:n=>fe({...je,[e]:{...je[e],annual:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},e)})})]}),ge&&ve&&(0,d.jsxs)(a.aF,{isOpen:!0,onClose:()=>ye(!1),title:`Manage Restaurants: ${ve.name}`,footer:(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>ye(!1),children:"Close"})}),children:[(0,d.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove restaurants from this plan."}),(0,d.jsxs)(Q,{children:[be.map(e=>{var n;const r=null===(n=ve.planRestaurants)||void 0===n?void 0:n.some(n=>n.restaurant_id===e.id&&n.is_active);return(0,d.jsxs)(H,{isAssigned:r,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.address||"No address"})]}),r?(0,d.jsx)(a.$n,{variant:"danger-outline",onClick:()=>(async e=>{if(X&&ve)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/brands/${X}/plans/${ve.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok){ze(X);const e=await fetch(`/api/brands/${X}/plans/${ve.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();me(n.success?n.data:n)}}}catch(n){console.error("Error removing restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Remove"}):(0,d.jsx)(a.$n,{variant:"primary",onClick:()=>(async e=>{if(X&&ve)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/brands/${X}/plans/${ve.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({restaurant_ids:[e]})})).ok){ze(X);const e=await fetch(`/api/brands/${X}/plans/${ve.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();me(n.success?n.data:n)}}}catch(n){console.error("Error assigning restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Assign"})]},e.id)}),0===be.length&&(0,d.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:"No restaurants found."})]})]})]})]}),(0,d.jsx)(c.A,{isOpen:Be,title:"Delete Plan",message:"Are you sure you want to delete this plan? This action cannot be undone.",onConfirm:async()=>{if(X&&Se){Ee(!1);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/brands/${X}/plans/${Se}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&(de(!1),ze(X))}catch(e){console.error("Error deleting plan:",e)}$e(null)}},onCancel:()=>{Ee(!1),$e(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var i=r(4752),t=r(9610),a=r(4414);const s=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,o=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,d=i.Ay.div`
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
`,x=e=>{let{isOpen:n,title:r,message:i,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:y="warning"}=e;return n?(0,a.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(o,{children:[(0,a.jsx)(l,{children:r}),(0,a.jsx)(c,{children:i})]}),(0,a.jsxs)(d,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,a.jsx)(p,{variant:"primary",type:y,onClick:x,children:u})]})]})}):null}}}]);