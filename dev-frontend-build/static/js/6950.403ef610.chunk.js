"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6950],{2488:(e,n,t)=>{t.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>c});t(9950);var i=t(4752),r=t(4414);const o=i.Ay.div`
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
`,a=i.Ay.div`
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
`,c=e=>{let{children:n,className:t,style:i,...s}=e;return(0,r.jsx)(o,{className:t,style:i,...s,children:n})},p=e=>{let{placeholder:n="Search...",value:t,onChange:i,style:o,...d}=e;return(0,r.jsxs)(a,{style:o,children:[(0,r.jsx)(s,{placeholder:n,value:t,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:t?"36px":"16px"},...d}),t&&(0,r.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...t}=e;return(0,r.jsx)(d,{...t,children:n})}},3705:(e,n,t)=>{t.d(n,{cc:()=>r});var i=t(4752);const r=i.Ay.button`
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
`;i.Ay.select`
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
`,i.Ay.input`
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
`,i.Ay.div`
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
`},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var i=t(9950),r=t(1367),o=t(6038);const s=()=>{const{user:e}=(0,r.As)(),[n,t]=(0,i.useState)("RM"),[s]=(0,i.useState)(Object.keys(o.DL)),[a,l]=(0,i.useState)(!0),[d,c]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),i=n.indexOf("restaurant");let r=i>=0?n[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),i=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";t(i)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),c("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:a,error:d}}},6950:(e,n,t)=>{t.r(n),t.d(n,{default:()=>P});var i=t(9950),r=t(4752),o=t(2853),s=t(1367),a=t(6038),l=t(4021),d=t(3705),c=t(2488),p=t(8409),x=t(4414);const u=(0,r.Ay)(p.A0)`
  @media (max-width: 1400px) {
    & > span:nth-child(5),
    & > span:nth-child(6),
    & > span:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5),
    & > span:nth-child(6),
    & > span:nth-child(7) {
      display: none;
    }
  }
`,h=(0,r.Ay)(p.Hj)`
  @media (max-width: 1400px) {
    & > div:nth-child(5),
    & > div:nth-child(6),
    & > div:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5),
    & > div:nth-child(6),
    & > div:nth-child(7) {
      display: none;
    }
  }
`,v=r.Ay.div``,g=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,m=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,j=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":case"paid":return"#ECFDF5";case"trial":case"pending_payment":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":case"paid":return"#059669";case"trial":case"pending_payment":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,y=r.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,f=r.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0;
  overflow-y: auto;
  z-index: 10000;
  pointer-events: ${e=>e.show?"auto":"none"};
`,b=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 600px;
  flex-shrink: 0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  margin: auto 0;
`,_=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,w=r.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,F=r.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`,A=r.Ay.div`
  padding: 24px;
`,B=r.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,C=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,S=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,k=r.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,z=r.Ay.input`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

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
`,E=r.Ay.select`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,D=r.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,$=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,R=r.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,W=r.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,P=()=>{var e,n,t,r;const{user:P}=(0,s.As)(),{defaultCurrency:T}=(0,l.i1)(),L=T||"MYR",M=localStorage.getItem("auth_token"),N=(null===P||void 0===P?void 0:P.brand_id)||null,[I,O]=(0,i.useState)([]),[U,Y]=(0,i.useState)(!0),[J,Q]=(0,i.useState)(""),[X,H]=(0,i.useState)("all"),[K,V]=(0,i.useState)([]),[q,G]=(0,i.useState)(!1),[Z,ee]=(0,i.useState)(null),[ne,te]=(0,i.useState)(""),[ie,re]=(0,i.useState)(null),[oe,se]=(0,i.useState)(!1),[ae,le]=(0,i.useState)(null),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(null),[ue,he]=(0,i.useState)({discount_type:"none",discount_value:0,discount_reason:""}),[ve,ge]=(0,i.useState)(!1),[me,je]=(0,i.useState)(null),[ye,fe]=(0,i.useState)(null),be=(0,i.useCallback)(async()=>{if(N){Y(!0);try{const e=M?{Authorization:`Bearer ${M}`}:{},n=await fetch(`/api/brands/${N}/subscriptions`,{headers:e});if(n.ok){const e=await n.json();O(e.success?e.data:Array.isArray(e)?e:[])}}catch(e){console.error("Error fetching subscriptions:",e),O([])}finally{Y(!1)}}},[N,M]),_e=(0,i.useCallback)(async()=>{if(N)try{const e=M?{Authorization:`Bearer ${M}`}:{},n=await fetch(`/api/brands/${N}/plans`,{headers:e});if(n.ok){const e=await n.json(),t=e.success?e.data:Array.isArray(e)?e:[];V(t.filter(e=>e.is_active))}}catch(e){console.error("Error fetching brand plans:",e)}},[N,M]);(0,i.useEffect)(()=>{be(),_e()},[be,_e]);const we=I.filter(e=>{var n;const t=e.restaurant_name.toLowerCase().includes(J.toLowerCase())||e.restaurant_email.toLowerCase().includes(J.toLowerCase())||((null===(n=e.plan)||void 0===n?void 0:n.name)||"").toLowerCase().includes(J.toLowerCase());return"all"===X?t:"assigned"===X?t&&null!==e.plan:"unassigned"===X?t&&null===e.plan:"active"===X?t&&"active"===e.restaurant_status:"overdue"===X?t&&"overdue"===e.restaurant_status:t}),Fe=I.length,Ae=I.filter(e=>null!==e.plan).length,Be=I.filter(e=>null===e.plan).length,Ce=I.reduce((e,n)=>{var t,i;return e+((null===(t=n.current_month)||void 0===t||null===(i=t.estimated_charges)||void 0===i?void 0:i.totalAmount)||0)},0),Se=e=>{var n,t,i;xe(e),he({discount_type:(null===(n=e.plan)||void 0===n?void 0:n.discount_type)||"none",discount_value:(null===(t=e.plan)||void 0===t?void 0:t.discount_value)||0,discount_reason:(null===(i=e.plan)||void 0===i?void 0:i.discount_reason)||""}),ce(!0)};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(p.mc,{children:[(0,x.jsxs)(p.Y9,{children:[(0,x.jsx)(p.hE,{children:"Subscriptions"}),(0,x.jsx)(p.ex,{children:(0,x.jsx)(d.cc,{variant:"outline",onClick:()=>{const e=[["Restaurant","Email","Status","Plan","Subscription Fee","Revenue %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];I.forEach(n=>{var t,i,r,o,s,a,l,d,c;e.push([`"${n.restaurant_name}"`,`"${n.restaurant_email}"`,n.restaurant_status,`"${(null===(t=n.plan)||void 0===t?void 0:t.name)||"Not Assigned"}"`,(null===(i=n.plan)||void 0===i?void 0:i.subscription_fee)||"0",(null===(r=n.plan)||void 0===r?void 0:r.revenue_percentage)||"0",(null===(o=n.plan)||void 0===o?void 0:o.billing_cycle)||"-",(null===(s=n.latest_invoice)||void 0===s?void 0:s.invoice_number)||"-",(null===(a=n.latest_invoice)||void 0===a?void 0:a.status)||"-",(null===(l=n.current_month)||void 0===l||null===(d=l.estimated_charges)||void 0===d||null===(c=d.totalAmount)||void 0===c?void 0:c.toString())||"0"].join(","))});const n=new Blob([e.join("\n")],{type:"text/csv"}),t=window.URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download=`brand-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(t),document.body.removeChild(i)},children:"Export"})})]}),(0,x.jsxs)(p.UC,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#059669",children:[(0,x.jsx)(p.Os,{children:Fe}),(0,x.jsx)(p.v0,{children:"Total Restaurants"}),(0,x.jsx)(p.d1,{children:"In your brand"})]}),(0,x.jsxs)(p.hI,{color:"#2563EB",children:[(0,x.jsx)(p.Os,{children:Ae}),(0,x.jsx)(p.v0,{children:"Plan Assigned"}),(0,x.jsxs)(p.d1,{children:[Fe>0?Math.round(Ae/Fe*100):0,"% covered"]})]}),(0,x.jsxs)(p.hI,{color:"#7C3AED",children:[(0,x.jsx)(p.Os,{children:Be}),(0,x.jsx)(p.v0,{children:"No Plan"}),(0,x.jsx)(p.d1,{children:"Need plan assignment"})]}),(0,x.jsxs)(p.hI,{color:"#D97706",children:[(0,x.jsx)(p.Os,{children:(0,a.vv)(Ce,L)}),(0,x.jsx)(p.v0,{children:"Est. Monthly Charges"}),(0,x.jsx)(p.d1,{children:"From all restaurants"})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsxs)(c.Jt,{value:X,onChange:e=>H(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Restaurants"}),(0,x.jsx)("option",{value:"assigned",children:"Plan Assigned"}),(0,x.jsx)("option",{value:"unassigned",children:"No Plan"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"overdue",children:"Overdue"})]}),(0,x.jsx)(c.DO,{placeholder:"Search restaurants or plans...",value:J,onChange:e=>Q(e.target.value)})]}),U?(0,x.jsx)(W,{children:"Loading subscription data..."}):0===we.length?(0,x.jsxs)(o.pp,{children:[(0,x.jsx)(D,{children:"\ud83d\udccb"}),(0,x.jsx)($,{children:0===I.length?"No Restaurants":"No Results"}),(0,x.jsx)(R,{children:0===I.length?"No restaurants are assigned to this brand yet.":"No restaurants match your search criteria."})]}):(0,x.jsxs)(x.Fragment,{children:[ie&&(0,x.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,x.jsx)("span",{style:{fontSize:"13px",color:"#92400E"},children:ie}),(0,x.jsx)("button",{onClick:()=>re(null),style:{background:"none",border:"none",color:"#92400E",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"\xd7"})]}),(0,x.jsxs)(p.XI,{children:[(0,x.jsxs)(u,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsx)("span",{children:"Restaurant"}),(0,x.jsx)("span",{children:"Plan"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Est. Charges"}),(0,x.jsx)("span",{children:"Latest Invoice"}),(0,x.jsx)("span",{children:"Revenue (MTD)"}),(0,x.jsx)("span",{children:"Actions"})]}),we.map(e=>{var n,t,i;return(0,x.jsxs)(h,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsxs)(p.Np,{children:[(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Restaurant"}),(0,x.jsxs)(v,{children:[(0,x.jsxs)(g,{children:[e.restaurant_name," ",e.restaurant_currency&&(0,x.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e.restaurant_currency})]}),(0,x.jsx)(m,{children:e.restaurant_email})]})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Plan"}),e.plan?(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:e.plan.name}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[e.plan.discount_type&&"none"!==e.plan.discount_type&&(e.plan.discount_value||0)>0?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("span",{style:{textDecoration:"line-through",color:"#9CA3AF"},children:(0,a.vv)(parseFloat(e.plan.subscription_fee)||0,L)})," ",(0,x.jsxs)("span",{style:{color:"#15803D",fontWeight:600},children:[(0,a.vv)("percentage"===e.plan.discount_type?(parseFloat(e.plan.subscription_fee)||0)*(1-(e.plan.discount_value||0)/100):Math.max(0,(parseFloat(e.plan.subscription_fee)||0)-(e.plan.discount_value||0)),L),"/mo"]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,a.vv)(parseFloat(e.plan.subscription_fee)||0,L),"/mo"]}),parseFloat(e.plan.revenue_percentage)>0&&` + ${e.plan.revenue_percentage}%`]})]}):(0,x.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Status"}),(0,x.jsx)(j,{status:e.restaurant_status,children:e.restaurant_status.charAt(0).toUpperCase()+e.restaurant_status.slice(1)})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Est. Charges"}),null!==(n=e.current_month)&&void 0!==n&&n.estimated_charges?(0,x.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(e.current_month.estimated_charges.totalAmount,L)}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Latest Invoice"}),e.latest_invoice?(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:e.latest_invoice.invoice_number}),(0,x.jsx)(j,{status:e.latest_invoice.status,children:e.latest_invoice.status.replace("_"," ")})]}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"No invoice"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Revenue (MTD)"}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)((null===(t=e.current_month)||void 0===t?void 0:t.revenue)||0,L)}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(i=e.current_month)||void 0===i?void 0:i.order_count)||0," orders"]})]})]})]}),(0,x.jsxs)(p.wr,{children:[(0,x.jsx)(p.rA,{onClick:()=>(e=>{le(e),se(!0)})(e),children:"View"}),(0,x.jsx)(p.rA,{onClick:()=>(e=>{var n;ee(e),te((null===(n=e.plan)||void 0===n?void 0:n.id)||""),G(!0)})(e),children:e.plan?"Change":"Assign"}),e.plan&&(0,x.jsx)(p.K0,{onClick:()=>(e=>{je(e),fe("unassign"),ge(!0)})(e),title:"Remove plan assignment",children:(0,x.jsx)(y,{children:"\u2715"})})]})]},e.restaurant_id)})]})]}),q&&Z&&(0,x.jsx)(f,{show:q,onClick:()=>G(!1),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(_,{children:[(0,x.jsx)(w,{children:Z.plan?"Change Plan":"Assign Plan"}),(0,x.jsx)(F,{onClick:()=>G(!1),children:"\xd7"})]}),(0,x.jsx)(A,{children:(0,x.jsxs)(C,{children:[(0,x.jsxs)(S,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(k,{children:"Restaurant"}),(0,x.jsx)(z,{type:"text",value:Z.restaurant_name,disabled:!0})]}),Z.plan&&(0,x.jsxs)(S,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(k,{children:"Current Plan"}),(0,x.jsxs)("div",{style:{padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[Z.plan.name," \u2014 ",(0,a.vv)(parseFloat(Z.plan.subscription_fee)||0,L),"/mo",parseFloat(Z.plan.revenue_percentage)>0&&` + ${Z.plan.revenue_percentage}% revenue`]})]}),(0,x.jsxs)(S,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(k,{children:"Select Plan *"}),(0,x.jsxs)(E,{value:ne,onChange:e=>te(e.target.value?parseInt(e.target.value):""),children:[(0,x.jsx)("option",{value:"",children:"Select a plan..."}),K.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.name," \u2014 ",(0,a.vv)(parseFloat(e.subscription_fee)||0,L),"/mo",parseFloat(e.revenue_percentage)>0&&` + ${e.revenue_percentage}%`]},e.id))]}),0===K.length&&(0,x.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),ne&&(()=>{const e=K.find(e=>e.id===ne);return e?(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,x.jsx)("strong",{children:"Plan Summary:"})}),(0,x.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e.name}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Subscription Fee: ",(0,a.vv)(parseFloat(e.subscription_fee)||0,L),"/mo",parseFloat(e.revenue_percentage)>0&&` | Revenue Share: ${e.revenue_percentage}%`,"none"!==e.rent_type&&` | Rent: ${e.rent_type}`,` | Billing: ${e.billing_cycle}`]})]}):null})()]})}),(0,x.jsxs)(B,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>G(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"primary",onClick:async()=>{if(N&&Z&&ne)try{const e={"Content-Type":"application/json",...M?{Authorization:`Bearer ${M}`}:{}},n=await fetch(`/api/brands/${N}/plans/${ne}/restaurants`,{method:"POST",headers:e,body:JSON.stringify({restaurant_ids:[Z.restaurant_id]})});if(n.ok){const e=await n.json();G(!1),ee(null),te(""),be(),e.currency_warnings&&e.currency_warnings.length>0&&re(e.currency_warnings[0].message)}else{const e=await n.json();console.error("Failed to assign plan:",e)}}catch(e){console.error("Error assigning plan:",e)}},disabled:!ne||0===K.length,children:Z.plan?"Change Plan":"Assign Plan"})]})]})}),oe&&ae&&(0,x.jsx)(f,{show:oe,onClick:()=>se(!1),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(_,{children:[(0,x.jsx)(w,{children:"Subscription Details"}),(0,x.jsx)(F,{onClick:()=>se(!1),children:"\xd7"})]}),(0,x.jsx)(A,{children:(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Name"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ae.restaurant_name})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Email"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ae.restaurant_email})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,x.jsx)(j,{status:ae.restaurant_status,children:ae.restaurant_status.charAt(0).toUpperCase()+ae.restaurant_status.slice(1)})]})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Plan"}),(0,x.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:ae.plan?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Name"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ae.plan.name})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Subscription Fee"}),ae.plan.discount_type&&"none"!==ae.plan.discount_type&&(ae.plan.discount_value||0)>0?(0,x.jsxs)("div",{children:[(0,x.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:[(0,a.vv)(parseFloat(ae.plan.subscription_fee)||0,L),"/mo"]}),(0,x.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:[(0,a.vv)("percentage"===ae.plan.discount_type?(parseFloat(ae.plan.subscription_fee)||0)*(1-(ae.plan.discount_value||0)/100):Math.max(0,(parseFloat(ae.plan.subscription_fee)||0)-(ae.plan.discount_value||0)),L),"/mo",(0,x.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===ae.plan.discount_type?`${ae.plan.discount_value}%`:(0,a.vv)(ae.plan.discount_value||0,L),")"]})]})]}):(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,a.vv)(parseFloat(ae.plan.subscription_fee)||0,L),"/mo"]})]}),parseFloat(ae.plan.revenue_percentage)>0&&(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue Share"}),(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[ae.plan.revenue_percentage,"%"]})]}),"none"!==ae.plan.rent_type&&(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Rent"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===ae.plan.rent_type?(0,a.vv)(parseFloat(ae.plan.rent_fixed||"0"),L):"percentage"===ae.plan.rent_type?`${ae.plan.rent_percentage}%`:`MAX(${(0,a.vv)(parseFloat(ae.plan.rent_fixed||"0"),L)}, ${ae.plan.rent_percentage}%)`})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ae.plan.billing_cycle})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Activation Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(ae.plan.activation_date).toLocaleDateString()})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Discount"}),ae.plan.discount_type&&"none"!==ae.plan.discount_type&&(ae.plan.discount_value||0)>0?(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsxs)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:["percentage"===ae.plan.discount_type?`${ae.plan.discount_value}%`:`${(0,a.vv)(ae.plan.discount_value||0,L)}`,ae.plan.discount_reason?` (${ae.plan.discount_reason})`:""]}),(0,x.jsx)("button",{onClick:()=>Se(ae),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"2px 8px",fontSize:"11px",color:"#6B7280",cursor:"pointer"},children:"Edit"})]}):(0,x.jsx)("button",{onClick:()=>Se(ae),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"4px 12px",fontSize:"12px",color:"#635BFF",cursor:"pointer",fontWeight:"500"},children:"Set Discount"})]})]}):(0,x.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:"No plan assigned to this restaurant."})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Current Month"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)((null===(e=ae.current_month)||void 0===e?void 0:e.revenue)||0,L)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Orders"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(n=ae.current_month)||void 0===n?void 0:n.order_count)||0})]}),(null===(t=ae.current_month)||void 0===t?void 0:t.estimated_charges)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Estimated Charges Breakdown"}),ae.current_month.estimated_charges.items.map((e,n)=>(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,x.jsx)("span",{style:{color:"#374151"},children:e.description}),(0,x.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(e.total_amount,L)})]},n)),(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,x.jsx)("span",{style:{color:"#0A2540"},children:"Total"}),(0,x.jsx)("span",{style:{color:"#0A2540"},children:(0,a.vv)(ae.current_month.estimated_charges.totalAmount,L)})]})]})})]})]}),ae.latest_invoice&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Latest Invoice"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Invoice Number"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ae.latest_invoice.invoice_number})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Amount"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)(parseFloat(ae.latest_invoice.total_amount)||0,L)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,x.jsx)(j,{status:ae.latest_invoice.status,children:ae.latest_invoice.status.replace("_"," ")})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Due Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(ae.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),(0,x.jsx)(B,{children:(0,x.jsx)(d.cc,{variant:"primary",onClick:()=>se(!1),children:"Close"})})]})}),ve&&me&&(0,x.jsx)(f,{show:ve,onClick:()=>ge(!1),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(_,{children:[(0,x.jsx)(w,{children:"Confirm Action"}),(0,x.jsx)(F,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,x.jsx)(A,{children:(0,x.jsx)("p",{children:"unassign"===ye&&`Are you sure you want to remove the plan "${null===(r=me.plan)||void 0===r?void 0:r.name}" from ${me.restaurant_name}?`})}),(0,x.jsxs)(B,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>ge(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"danger",onClick:async()=>{if(N&&me&&ye)try{const e={...M?{Authorization:`Bearer ${M}`}:{}};if("unassign"===ye&&me.plan){const n=await fetch(`/api/brands/${N}/plans/${me.plan.id}/restaurants/${me.restaurant_id}`,{method:"DELETE",headers:e});if(!n.ok){const e=await n.json();console.error("Failed to unassign:",e)}}ge(!1),je(null),fe(null),be()}catch(e){console.error("Action failed:",e)}},children:"Remove Plan"})]})]})}),de&&pe&&(0,x.jsx)(f,{show:de,onClick:()=>ce(!1),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,x.jsxs)(_,{children:[(0,x.jsxs)(w,{children:["Set Discount - ",pe.restaurant_name]}),(0,x.jsx)(F,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,x.jsx)(A,{children:(0,x.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Discount Type"}),(0,x.jsxs)(E,{value:ue.discount_type,onChange:e=>he({...ue,discount_type:e.target.value,discount_value:"none"===e.target.value?0:ue.discount_value}),children:[(0,x.jsx)("option",{value:"none",children:"None"}),(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsxs)("option",{value:"fixed",children:["Fixed Amount (",L,")"]})]})]}),"none"!==ue.discount_type&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"percentage"===ue.discount_type?"Discount Rate (%)":`Discount Amount (${L})`}),(0,x.jsx)(z,{type:"number",step:"percentage"===ue.discount_type?"1":"0.01",min:"0",max:"percentage"===ue.discount_type?"100":void 0,value:ue.discount_value,onChange:e=>he({...ue,discount_value:parseFloat(e.target.value)||0}),placeholder:"percentage"===ue.discount_type?"e.g. 10":"e.g. 50.00"})]}),"none"!==ue.discount_type&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Reason (optional)"}),(0,x.jsx)(z,{type:"text",value:ue.discount_reason,onChange:e=>he({...ue,discount_reason:e.target.value}),placeholder:"e.g. Opening promotion"})]}),"none"!==ue.discount_type&&ue.discount_value>0&&pe.plan&&(0,x.jsxs)("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:"Preview"}),(0,x.jsx)("div",{style:{fontSize:"13px",color:"#15803D"},children:"percentage"===ue.discount_type?`${ue.discount_value}% off all charges`:`${(0,a.vv)(ue.discount_value,L)} off total`})]})]})}),(0,x.jsxs)(B,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>ce(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"primary",onClick:async()=>{if(pe&&pe.plan&&N)try{const e={"Content-Type":"application/json",...M?{Authorization:`Bearer ${M}`}:{}};(await fetch(`/api/brands/${N}/plans/${pe.plan.id}/restaurants/${pe.restaurant_id}/discount`,{method:"PUT",headers:e,body:JSON.stringify(ue)})).ok&&(ce(!1),xe(null),be())}catch(e){console.error("Failed to save discount:",e)}},children:"Save Discount"})]})]})})]})]})})}}}]);