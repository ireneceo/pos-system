"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6950],{2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var r=t(4752),i=t(4414);const o=r.Ay.div`
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
`,s=r.Ay.input`
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
`,a=r.Ay.select`
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
`,l=e=>{let{children:n,className:t,style:r,...s}=e;return(0,i.jsx)(o,{className:t,style:r,...s,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,i.jsx)(s,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,i.jsx)(a,{...t,children:n})}},3705:(e,n,t)=>{t.d(n,{cc:()=>i});var r=t(4752);const i=r.Ay.button`
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
`},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var r=t(9950),i=t(1367),o=t(6038);const s=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,r.useState)("RM"),[s,a]=(0,r.useState)(Object.keys(o.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let i=r>=0?n[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";t(r)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},6950:(e,n,t)=>{t.r(n),t.d(n,{default:()=>W});var r=t(9950),i=t(4752),o=t(1367),s=t(6038),a=t(4021),l=t(3705),d=t(2488),c=t(2674),p=t(4414);const x=(0,i.Ay)(c.A0)`
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
`,h=(0,i.Ay)(c.Hj)`
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
`,u=i.Ay.div``,v=i.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,g=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,m=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":case"paid":return"#ECFDF5";case"trial":case"pending_payment":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":case"paid":return"#059669";case"trial":case"pending_payment":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,j=i.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,f=i.Ay.div`
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
`,y=i.Ay.div`
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
`,b=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,w=i.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,A=i.Ay.button`
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
`,F=i.Ay.div`
  padding: 24px;
`,B=i.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,_=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,C=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,S=i.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,z=i.Ay.input`
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
`,k=i.Ay.select`
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
`,E=i.Ay.div`
  text-align: center;
  padding: 60px 40px;
  color: #9CA3AF;
`,R=i.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,$=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,P=i.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,D=i.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,W=()=>{var e,n,t,i;const{user:W}=(0,o.As)(),{defaultCurrency:T}=(0,a.i1)(),L=T||"MYR",M=localStorage.getItem("auth_token"),N=(null===W||void 0===W?void 0:W.brand_id)||null,[I,O]=(0,r.useState)([]),[U,Y]=(0,r.useState)(!0),[J,Q]=(0,r.useState)(""),[X,H]=(0,r.useState)("all"),[K,V]=(0,r.useState)([]),[q,G]=(0,r.useState)(!1),[Z,ee]=(0,r.useState)(null),[ne,te]=(0,r.useState)(""),[re,ie]=(0,r.useState)(!1),[oe,se]=(0,r.useState)(null),[ae,le]=(0,r.useState)(!1),[de,ce]=(0,r.useState)(null),[pe,xe]=(0,r.useState)(null),he=(0,r.useCallback)(async()=>{if(N){Y(!0);try{const e=M?{Authorization:`Bearer ${M}`}:{},n=await fetch(`/api/brands/${N}/subscriptions`,{headers:e});if(n.ok){const e=await n.json();O(e.success?e.data:Array.isArray(e)?e:[])}}catch(e){console.error("Error fetching subscriptions:",e),O([])}finally{Y(!1)}}},[N,M]),ue=(0,r.useCallback)(async()=>{if(N)try{const e=M?{Authorization:`Bearer ${M}`}:{},n=await fetch(`/api/brands/${N}/plans`,{headers:e});if(n.ok){const e=await n.json(),t=e.success?e.data:Array.isArray(e)?e:[];V(t.filter(e=>e.is_active))}}catch(e){console.error("Error fetching brand plans:",e)}},[N,M]);(0,r.useEffect)(()=>{he(),ue()},[he,ue]);const ve=I.filter(e=>{var n;const t=e.restaurant_name.toLowerCase().includes(J.toLowerCase())||e.restaurant_email.toLowerCase().includes(J.toLowerCase())||((null===(n=e.plan)||void 0===n?void 0:n.name)||"").toLowerCase().includes(J.toLowerCase());return"all"===X?t:"assigned"===X?t&&null!==e.plan:"unassigned"===X?t&&null===e.plan:"active"===X?t&&"active"===e.restaurant_status:"overdue"===X?t&&"overdue"===e.restaurant_status:t}),ge=I.length,me=I.filter(e=>null!==e.plan).length,je=I.filter(e=>null===e.plan).length,fe=I.reduce((e,n)=>{var t,r;return e+((null===(t=n.current_month)||void 0===t||null===(r=t.estimated_charges)||void 0===r?void 0:r.totalAmount)||0)},0);return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(c.mc,{children:[(0,p.jsxs)(c.Y9,{children:[(0,p.jsx)(c.hE,{children:"Subscriptions"}),(0,p.jsx)(c.ex,{children:(0,p.jsx)(l.cc,{variant:"outline",onClick:()=>{const e=[["Restaurant","Email","Status","Plan","Subscription Fee","Revenue %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];I.forEach(n=>{var t,r,i,o,s,a,l,d,c;e.push([`"${n.restaurant_name}"`,`"${n.restaurant_email}"`,n.restaurant_status,`"${(null===(t=n.plan)||void 0===t?void 0:t.name)||"Not Assigned"}"`,(null===(r=n.plan)||void 0===r?void 0:r.subscription_fee)||"0",(null===(i=n.plan)||void 0===i?void 0:i.revenue_percentage)||"0",(null===(o=n.plan)||void 0===o?void 0:o.billing_cycle)||"-",(null===(s=n.latest_invoice)||void 0===s?void 0:s.invoice_number)||"-",(null===(a=n.latest_invoice)||void 0===a?void 0:a.status)||"-",(null===(l=n.current_month)||void 0===l||null===(d=l.estimated_charges)||void 0===d||null===(c=d.totalAmount)||void 0===c?void 0:c.toString())||"0"].join(","))});const n=new Blob([e.join("\n")],{type:"text/csv"}),t=window.URL.createObjectURL(n),r=document.createElement("a");r.href=t,r.download=`brand-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),window.URL.revokeObjectURL(t),document.body.removeChild(r)},children:"Export"})})]}),(0,p.jsxs)(c.UC,{children:[(0,p.jsxs)(c.MD,{children:[(0,p.jsxs)(c.hI,{color:"#059669",children:[(0,p.jsx)(c.Os,{children:ge}),(0,p.jsx)(c.v0,{children:"Total Restaurants"}),(0,p.jsx)(c.d1,{children:"In your brand"})]}),(0,p.jsxs)(c.hI,{color:"#2563EB",children:[(0,p.jsx)(c.Os,{children:me}),(0,p.jsx)(c.v0,{children:"Plan Assigned"}),(0,p.jsxs)(c.d1,{children:[ge>0?Math.round(me/ge*100):0,"% covered"]})]}),(0,p.jsxs)(c.hI,{color:"#7C3AED",children:[(0,p.jsx)(c.Os,{children:je}),(0,p.jsx)(c.v0,{children:"No Plan"}),(0,p.jsx)(c.d1,{children:"Need plan assignment"})]}),(0,p.jsxs)(c.hI,{color:"#D97706",children:[(0,p.jsx)(c.Os,{children:(0,s.vv)(fe,L)}),(0,p.jsx)(c.v0,{children:"Est. Monthly Charges"}),(0,p.jsx)(c.d1,{children:"From all restaurants"})]})]}),(0,p.jsxs)(d.Qn,{children:[(0,p.jsx)(d.DO,{placeholder:"Search restaurants or plans...",value:J,onChange:e=>Q(e.target.value)}),(0,p.jsxs)(d.Jt,{value:X,onChange:e=>H(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Restaurants"}),(0,p.jsx)("option",{value:"assigned",children:"Plan Assigned"}),(0,p.jsx)("option",{value:"unassigned",children:"No Plan"}),(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"overdue",children:"Overdue"})]})]}),U?(0,p.jsx)(D,{children:"Loading subscription data..."}):0===ve.length?(0,p.jsxs)(E,{children:[(0,p.jsx)(R,{children:"\ud83d\udccb"}),(0,p.jsx)($,{children:0===I.length?"No Restaurants":"No Results"}),(0,p.jsx)(P,{children:0===I.length?"No restaurants are assigned to this brand yet.":"No restaurants match your search criteria."})]}):(0,p.jsxs)(c.XI,{children:[(0,p.jsxs)(x,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,p.jsx)("span",{children:"Restaurant"}),(0,p.jsx)("span",{children:"Plan"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Est. Charges"}),(0,p.jsx)("span",{children:"Latest Invoice"}),(0,p.jsx)("span",{children:"Revenue (MTD)"}),(0,p.jsx)("span",{children:"Actions"})]}),ve.map(e=>{var n,t,r;return(0,p.jsxs)(h,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,p.jsxs)(c.Np,{children:[(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Restaurant"}),(0,p.jsxs)(u,{children:[(0,p.jsx)(v,{children:e.restaurant_name}),(0,p.jsx)(g,{children:e.restaurant_email})]})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Plan"}),e.plan?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:e.plan.name}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(0,s.vv)(parseFloat(e.plan.subscription_fee)||0,L),"/mo",parseFloat(e.plan.revenue_percentage)>0&&` + ${e.plan.revenue_percentage}%`]})]}):(0,p.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Status"}),(0,p.jsx)(m,{status:e.restaurant_status,children:e.restaurant_status.charAt(0).toUpperCase()+e.restaurant_status.slice(1)})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Est. Charges"}),null!==(n=e.current_month)&&void 0!==n&&n.estimated_charges?(0,p.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,s.vv)(e.current_month.estimated_charges.totalAmount,L)}):(0,p.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Latest Invoice"}),e.latest_invoice?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:e.latest_invoice.invoice_number}),(0,p.jsx)(m,{status:e.latest_invoice.status,children:e.latest_invoice.status.replace("_"," ")})]}):(0,p.jsx)("span",{style:{color:"#9CA3AF"},children:"No invoice"})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Revenue (MTD)"}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,s.vv)((null===(t=e.current_month)||void 0===t?void 0:t.revenue)||0,L)}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(r=e.current_month)||void 0===r?void 0:r.order_count)||0," orders"]})]})]})]}),(0,p.jsxs)(c.wr,{children:[(0,p.jsx)(c.rA,{onClick:()=>(e=>{se(e),ie(!0)})(e),children:"View"}),(0,p.jsx)(c.rA,{onClick:()=>(e=>{var n;ee(e),te((null===(n=e.plan)||void 0===n?void 0:n.id)||""),G(!0)})(e),children:e.plan?"Change":"Assign"}),e.plan&&(0,p.jsx)(c.K0,{onClick:()=>(e=>{ce(e),xe("unassign"),le(!0)})(e),title:"Remove plan assignment",children:(0,p.jsx)(j,{children:"\u2715"})})]})]},e.restaurant_id)})]}),q&&Z&&(0,p.jsx)(f,{show:q,onClick:()=>G(!1),children:(0,p.jsxs)(y,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(w,{children:Z.plan?"Change Plan":"Assign Plan"}),(0,p.jsx)(A,{onClick:()=>G(!1),children:"\xd7"})]}),(0,p.jsx)(F,{children:(0,p.jsxs)(_,{children:[(0,p.jsxs)(C,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(S,{children:"Restaurant"}),(0,p.jsx)(z,{type:"text",value:Z.restaurant_name,disabled:!0})]}),Z.plan&&(0,p.jsxs)(C,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(S,{children:"Current Plan"}),(0,p.jsxs)("div",{style:{padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[Z.plan.name," \u2014 ",(0,s.vv)(parseFloat(Z.plan.subscription_fee)||0,L),"/mo",parseFloat(Z.plan.revenue_percentage)>0&&` + ${Z.plan.revenue_percentage}% revenue`]})]}),(0,p.jsxs)(C,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(S,{children:"Select Plan *"}),(0,p.jsxs)(k,{value:ne,onChange:e=>te(e.target.value?parseInt(e.target.value):""),children:[(0,p.jsx)("option",{value:"",children:"Select a plan..."}),K.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.name," \u2014 ",(0,s.vv)(parseFloat(e.subscription_fee)||0,L),"/mo",parseFloat(e.revenue_percentage)>0&&` + ${e.revenue_percentage}%`]},e.id))]}),0===K.length&&(0,p.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),ne&&(()=>{const e=K.find(e=>e.id===ne);return e?(0,p.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,p.jsx)("strong",{children:"Plan Summary:"})}),(0,p.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e.name}),(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Subscription Fee: ",(0,s.vv)(parseFloat(e.subscription_fee)||0,L),"/mo",parseFloat(e.revenue_percentage)>0&&` | Revenue Share: ${e.revenue_percentage}%`,"none"!==e.rent_type&&` | Rent: ${e.rent_type}`,` | Billing: ${e.billing_cycle}`]})]}):null})()]})}),(0,p.jsxs)(B,{children:[(0,p.jsx)(l.cc,{variant:"cancel",onClick:()=>G(!1),children:"Cancel"}),(0,p.jsx)(l.cc,{variant:"primary",onClick:async()=>{if(N&&Z&&ne)try{const e={"Content-Type":"application/json",...M?{Authorization:`Bearer ${M}`}:{}},n=await fetch(`/api/brands/${N}/plans/${ne}/restaurants`,{method:"POST",headers:e,body:JSON.stringify({restaurant_id:Z.restaurant_id})});if(n.ok)G(!1),ee(null),te(""),he();else{const e=await n.json();console.error("Failed to assign plan:",e)}}catch(e){console.error("Error assigning plan:",e)}},disabled:!ne||0===K.length,children:Z.plan?"Change Plan":"Assign Plan"})]})]})}),re&&oe&&(0,p.jsx)(f,{show:re,onClick:()=>ie(!1),children:(0,p.jsxs)(y,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(w,{children:"Subscription Details"}),(0,p.jsx)(A,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,p.jsx)(F,{children:(0,p.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant"}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Name"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:oe.restaurant_name})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Email"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:oe.restaurant_email})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,p.jsx)(m,{status:oe.restaurant_status,children:oe.restaurant_status.charAt(0).toUpperCase()+oe.restaurant_status.slice(1)})]})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Plan"}),(0,p.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:oe.plan?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Name"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:oe.plan.name})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Subscription Fee"}),(0,p.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,s.vv)(parseFloat(oe.plan.subscription_fee)||0,L),"/mo"]})]}),parseFloat(oe.plan.revenue_percentage)>0&&(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue Share"}),(0,p.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[oe.plan.revenue_percentage,"%"]})]}),"none"!==oe.plan.rent_type&&(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Rent"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===oe.plan.rent_type?(0,s.vv)(parseFloat(oe.plan.rent_fixed||"0"),L):"percentage"===oe.plan.rent_type?`${oe.plan.rent_percentage}%`:`MAX(${(0,s.vv)(parseFloat(oe.plan.rent_fixed||"0"),L)}, ${oe.plan.rent_percentage}%)`})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:oe.plan.billing_cycle})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Activation Date"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(oe.plan.activation_date).toLocaleDateString()})]})]}):(0,p.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:"No plan assigned to this restaurant."})})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Current Month"}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,s.vv)((null===(e=oe.current_month)||void 0===e?void 0:e.revenue)||0,L)})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Orders"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(n=oe.current_month)||void 0===n?void 0:n.order_count)||0})]}),(null===(t=oe.current_month)||void 0===t?void 0:t.estimated_charges)&&(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Estimated Charges Breakdown"}),oe.current_month.estimated_charges.items.map((e,n)=>(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,p.jsx)("span",{style:{color:"#374151"},children:e.description}),(0,p.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,s.vv)(e.total_amount,L)})]},n)),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,p.jsx)("span",{style:{color:"#0A2540"},children:"Total"}),(0,p.jsx)("span",{style:{color:"#0A2540"},children:(0,s.vv)(oe.current_month.estimated_charges.totalAmount,L)})]})]})})]})]}),oe.latest_invoice&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Latest Invoice"}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Invoice Number"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:oe.latest_invoice.invoice_number})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Amount"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,s.vv)(parseFloat(oe.latest_invoice.total_amount)||0,L)})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,p.jsx)(m,{status:oe.latest_invoice.status,children:oe.latest_invoice.status.replace("_"," ")})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Due Date"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(oe.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),(0,p.jsx)(B,{children:(0,p.jsx)(l.cc,{variant:"primary",onClick:()=>ie(!1),children:"Close"})})]})}),ae&&de&&(0,p.jsx)(f,{show:ae,onClick:()=>le(!1),children:(0,p.jsxs)(y,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(w,{children:"Confirm Action"}),(0,p.jsx)(A,{onClick:()=>le(!1),children:"\xd7"})]}),(0,p.jsx)(F,{children:(0,p.jsx)("p",{children:"unassign"===pe&&`Are you sure you want to remove the plan "${null===(i=de.plan)||void 0===i?void 0:i.name}" from ${de.restaurant_name}?`})}),(0,p.jsxs)(B,{children:[(0,p.jsx)(l.cc,{variant:"cancel",onClick:()=>le(!1),children:"Cancel"}),(0,p.jsx)(l.cc,{variant:"danger",onClick:async()=>{if(N&&de&&pe)try{const e={...M?{Authorization:`Bearer ${M}`}:{}};if("unassign"===pe&&de.plan){const n=await fetch(`/api/brands/${N}/plans/${de.plan.id}/restaurants/${de.restaurant_id}`,{method:"DELETE",headers:e});if(!n.ok){const e=await n.json();console.error("Failed to unassign:",e)}}le(!1),ce(null),xe(null),he()}catch(e){console.error("Action failed:",e)}},children:"Remove Plan"})]})]})})]})]})})}}}]);