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
`},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var r=t(9950),i=t(1367),o=t(6038);const s=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,r.useState)("RM"),[s,a]=(0,r.useState)(Object.keys(o.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let i=r>=0?n[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";t(r)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},6950:(e,n,t)=>{t.r(n),t.d(n,{default:()=>T});var r=t(9950),i=t(4752),o=t(3310),s=t(1367),a=t(6038),l=t(4021),d=t(3705),c=t(2488),p=t(2674),x=t(4414);const h=(0,i.Ay)(p.A0)`
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
`,u=(0,i.Ay)(p.Hj)`
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
`,v=i.Ay.div``,g=i.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,m=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,j=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":case"paid":return"#ECFDF5";case"trial":case"pending_payment":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":case"paid":return"#059669";case"trial":case"pending_payment":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,f=i.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,y=i.Ay.div`
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
`,b=i.Ay.div`
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
`,w=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,A=i.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,B=i.Ay.button`
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
`,_=i.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,C=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,S=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,z=i.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,k=i.Ay.input`
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
`,E=i.Ay.select`
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
`,R=i.Ay.div`
  text-align: center;
  padding: 60px 40px;
  color: #9CA3AF;
`,$=i.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,P=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,D=i.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,W=i.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,T=()=>{var e,n,t,i;const{user:T}=(0,s.As)(),{defaultCurrency:L}=(0,l.i1)(),M=L||"MYR",N=localStorage.getItem("auth_token"),I=(null===T||void 0===T?void 0:T.brand_id)||null,[O,U]=(0,r.useState)([]),[Y,J]=(0,r.useState)(!0),[Q,X]=(0,r.useState)(""),[H,K]=(0,r.useState)("all"),[V,q]=(0,r.useState)([]),[G,Z]=(0,r.useState)(!1),[ee,ne]=(0,r.useState)(null),[te,re]=(0,r.useState)(""),[ie,oe]=(0,r.useState)(!1),[se,ae]=(0,r.useState)(null),[le,de]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)(null),[xe,he]=(0,r.useState)(null),ue=(0,r.useCallback)(async()=>{if(I){J(!0);try{const e=N?{Authorization:`Bearer ${N}`}:{},n=await fetch(`/api/brands/${I}/subscriptions`,{headers:e});if(n.ok){const e=await n.json();U(e.success?e.data:Array.isArray(e)?e:[])}}catch(e){console.error("Error fetching subscriptions:",e),U([])}finally{J(!1)}}},[I,N]),ve=(0,r.useCallback)(async()=>{if(I)try{const e=N?{Authorization:`Bearer ${N}`}:{},n=await fetch(`/api/brands/${I}/plans`,{headers:e});if(n.ok){const e=await n.json(),t=e.success?e.data:Array.isArray(e)?e:[];q(t.filter(e=>e.is_active))}}catch(e){console.error("Error fetching brand plans:",e)}},[I,N]);(0,r.useEffect)(()=>{ue(),ve()},[ue,ve]);const ge=O.filter(e=>{var n;const t=e.restaurant_name.toLowerCase().includes(Q.toLowerCase())||e.restaurant_email.toLowerCase().includes(Q.toLowerCase())||((null===(n=e.plan)||void 0===n?void 0:n.name)||"").toLowerCase().includes(Q.toLowerCase());return"all"===H?t:"assigned"===H?t&&null!==e.plan:"unassigned"===H?t&&null===e.plan:"active"===H?t&&"active"===e.restaurant_status:"overdue"===H?t&&"overdue"===e.restaurant_status:t}),me=O.length,je=O.filter(e=>null!==e.plan).length,fe=O.filter(e=>null===e.plan).length,ye=O.reduce((e,n)=>{var t,r;return e+((null===(t=n.current_month)||void 0===t||null===(r=t.estimated_charges)||void 0===r?void 0:r.totalAmount)||0)},0);return(0,x.jsx)(o.A,{children:(0,x.jsxs)(p.mc,{children:[(0,x.jsxs)(p.Y9,{children:[(0,x.jsx)(p.hE,{children:"Subscriptions"}),(0,x.jsx)(p.ex,{children:(0,x.jsx)(d.cc,{variant:"outline",onClick:()=>{const e=[["Restaurant","Email","Status","Plan","Subscription Fee","Revenue %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];O.forEach(n=>{var t,r,i,o,s,a,l,d,c;e.push([`"${n.restaurant_name}"`,`"${n.restaurant_email}"`,n.restaurant_status,`"${(null===(t=n.plan)||void 0===t?void 0:t.name)||"Not Assigned"}"`,(null===(r=n.plan)||void 0===r?void 0:r.subscription_fee)||"0",(null===(i=n.plan)||void 0===i?void 0:i.revenue_percentage)||"0",(null===(o=n.plan)||void 0===o?void 0:o.billing_cycle)||"-",(null===(s=n.latest_invoice)||void 0===s?void 0:s.invoice_number)||"-",(null===(a=n.latest_invoice)||void 0===a?void 0:a.status)||"-",(null===(l=n.current_month)||void 0===l||null===(d=l.estimated_charges)||void 0===d||null===(c=d.totalAmount)||void 0===c?void 0:c.toString())||"0"].join(","))});const n=new Blob([e.join("\n")],{type:"text/csv"}),t=window.URL.createObjectURL(n),r=document.createElement("a");r.href=t,r.download=`brand-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),window.URL.revokeObjectURL(t),document.body.removeChild(r)},children:"Export"})})]}),(0,x.jsxs)(p.UC,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#059669",children:[(0,x.jsx)(p.Os,{children:me}),(0,x.jsx)(p.v0,{children:"Total Restaurants"}),(0,x.jsx)(p.d1,{children:"In your brand"})]}),(0,x.jsxs)(p.hI,{color:"#2563EB",children:[(0,x.jsx)(p.Os,{children:je}),(0,x.jsx)(p.v0,{children:"Plan Assigned"}),(0,x.jsxs)(p.d1,{children:[me>0?Math.round(je/me*100):0,"% covered"]})]}),(0,x.jsxs)(p.hI,{color:"#7C3AED",children:[(0,x.jsx)(p.Os,{children:fe}),(0,x.jsx)(p.v0,{children:"No Plan"}),(0,x.jsx)(p.d1,{children:"Need plan assignment"})]}),(0,x.jsxs)(p.hI,{color:"#D97706",children:[(0,x.jsx)(p.Os,{children:(0,a.vv)(ye,M)}),(0,x.jsx)(p.v0,{children:"Est. Monthly Charges"}),(0,x.jsx)(p.d1,{children:"From all restaurants"})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsx)(c.DO,{placeholder:"Search restaurants or plans...",value:Q,onChange:e=>X(e.target.value)}),(0,x.jsxs)(c.Jt,{value:H,onChange:e=>K(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Restaurants"}),(0,x.jsx)("option",{value:"assigned",children:"Plan Assigned"}),(0,x.jsx)("option",{value:"unassigned",children:"No Plan"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"overdue",children:"Overdue"})]})]}),Y?(0,x.jsx)(W,{children:"Loading subscription data..."}):0===ge.length?(0,x.jsxs)(R,{children:[(0,x.jsx)($,{children:"\ud83d\udccb"}),(0,x.jsx)(P,{children:0===O.length?"No Restaurants":"No Results"}),(0,x.jsx)(D,{children:0===O.length?"No restaurants are assigned to this brand yet.":"No restaurants match your search criteria."})]}):(0,x.jsxs)(p.XI,{children:[(0,x.jsxs)(h,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsx)("span",{children:"Restaurant"}),(0,x.jsx)("span",{children:"Plan"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Est. Charges"}),(0,x.jsx)("span",{children:"Latest Invoice"}),(0,x.jsx)("span",{children:"Revenue (MTD)"}),(0,x.jsx)("span",{children:"Actions"})]}),ge.map(e=>{var n,t,r;return(0,x.jsxs)(u,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsxs)(p.Np,{children:[(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Restaurant"}),(0,x.jsxs)(v,{children:[(0,x.jsx)(g,{children:e.restaurant_name}),(0,x.jsx)(m,{children:e.restaurant_email})]})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Plan"}),e.plan?(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:e.plan.name}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(0,a.vv)(parseFloat(e.plan.subscription_fee)||0,M),"/mo",parseFloat(e.plan.revenue_percentage)>0&&` + ${e.plan.revenue_percentage}%`]})]}):(0,x.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Status"}),(0,x.jsx)(j,{status:e.restaurant_status,children:e.restaurant_status.charAt(0).toUpperCase()+e.restaurant_status.slice(1)})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Est. Charges"}),null!==(n=e.current_month)&&void 0!==n&&n.estimated_charges?(0,x.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(e.current_month.estimated_charges.totalAmount,M)}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Latest Invoice"}),e.latest_invoice?(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:e.latest_invoice.invoice_number}),(0,x.jsx)(j,{status:e.latest_invoice.status,children:e.latest_invoice.status.replace("_"," ")})]}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"No invoice"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Revenue (MTD)"}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)((null===(t=e.current_month)||void 0===t?void 0:t.revenue)||0,M)}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(r=e.current_month)||void 0===r?void 0:r.order_count)||0," orders"]})]})]})]}),(0,x.jsxs)(p.wr,{children:[(0,x.jsx)(p.rA,{onClick:()=>(e=>{ae(e),oe(!0)})(e),children:"View"}),(0,x.jsx)(p.rA,{onClick:()=>(e=>{var n;ne(e),re((null===(n=e.plan)||void 0===n?void 0:n.id)||""),Z(!0)})(e),children:e.plan?"Change":"Assign"}),e.plan&&(0,x.jsx)(p.K0,{onClick:()=>(e=>{pe(e),he("unassign"),de(!0)})(e),title:"Remove plan assignment",children:(0,x.jsx)(f,{children:"\u2715"})})]})]},e.restaurant_id)})]}),G&&ee&&(0,x.jsx)(y,{show:G,onClick:()=>Z(!1),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:ee.plan?"Change Plan":"Assign Plan"}),(0,x.jsx)(B,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,x.jsx)(F,{children:(0,x.jsxs)(C,{children:[(0,x.jsxs)(S,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(z,{children:"Restaurant"}),(0,x.jsx)(k,{type:"text",value:ee.restaurant_name,disabled:!0})]}),ee.plan&&(0,x.jsxs)(S,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(z,{children:"Current Plan"}),(0,x.jsxs)("div",{style:{padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[ee.plan.name," \u2014 ",(0,a.vv)(parseFloat(ee.plan.subscription_fee)||0,M),"/mo",parseFloat(ee.plan.revenue_percentage)>0&&` + ${ee.plan.revenue_percentage}% revenue`]})]}),(0,x.jsxs)(S,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(z,{children:"Select Plan *"}),(0,x.jsxs)(E,{value:te,onChange:e=>re(e.target.value?parseInt(e.target.value):""),children:[(0,x.jsx)("option",{value:"",children:"Select a plan..."}),V.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.name," \u2014 ",(0,a.vv)(parseFloat(e.subscription_fee)||0,M),"/mo",parseFloat(e.revenue_percentage)>0&&` + ${e.revenue_percentage}%`]},e.id))]}),0===V.length&&(0,x.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),te&&(()=>{const e=V.find(e=>e.id===te);return e?(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,x.jsx)("strong",{children:"Plan Summary:"})}),(0,x.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e.name}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Subscription Fee: ",(0,a.vv)(parseFloat(e.subscription_fee)||0,M),"/mo",parseFloat(e.revenue_percentage)>0&&` | Revenue Share: ${e.revenue_percentage}%`,"none"!==e.rent_type&&` | Rent: ${e.rent_type}`,` | Billing: ${e.billing_cycle}`]})]}):null})()]})}),(0,x.jsxs)(_,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>Z(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"primary",onClick:async()=>{if(I&&ee&&te)try{const e={"Content-Type":"application/json",...N?{Authorization:`Bearer ${N}`}:{}},n=await fetch(`/api/brands/${I}/plans/${te}/restaurants`,{method:"POST",headers:e,body:JSON.stringify({restaurant_id:ee.restaurant_id})});if(n.ok)Z(!1),ne(null),re(""),ue();else{const e=await n.json();console.error("Failed to assign plan:",e)}}catch(e){console.error("Error assigning plan:",e)}},disabled:!te||0===V.length,children:ee.plan?"Change Plan":"Assign Plan"})]})]})}),ie&&se&&(0,x.jsx)(y,{show:ie,onClick:()=>oe(!1),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:"Subscription Details"}),(0,x.jsx)(B,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,x.jsx)(F,{children:(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Name"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:se.restaurant_name})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Email"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:se.restaurant_email})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,x.jsx)(j,{status:se.restaurant_status,children:se.restaurant_status.charAt(0).toUpperCase()+se.restaurant_status.slice(1)})]})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Plan"}),(0,x.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:se.plan?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Name"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:se.plan.name})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Subscription Fee"}),(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,a.vv)(parseFloat(se.plan.subscription_fee)||0,M),"/mo"]})]}),parseFloat(se.plan.revenue_percentage)>0&&(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue Share"}),(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[se.plan.revenue_percentage,"%"]})]}),"none"!==se.plan.rent_type&&(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Rent"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===se.plan.rent_type?(0,a.vv)(parseFloat(se.plan.rent_fixed||"0"),M):"percentage"===se.plan.rent_type?`${se.plan.rent_percentage}%`:`MAX(${(0,a.vv)(parseFloat(se.plan.rent_fixed||"0"),M)}, ${se.plan.rent_percentage}%)`})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:se.plan.billing_cycle})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Activation Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(se.plan.activation_date).toLocaleDateString()})]})]}):(0,x.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:"No plan assigned to this restaurant."})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Current Month"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)((null===(e=se.current_month)||void 0===e?void 0:e.revenue)||0,M)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Orders"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(n=se.current_month)||void 0===n?void 0:n.order_count)||0})]}),(null===(t=se.current_month)||void 0===t?void 0:t.estimated_charges)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Estimated Charges Breakdown"}),se.current_month.estimated_charges.items.map((e,n)=>(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,x.jsx)("span",{style:{color:"#374151"},children:e.description}),(0,x.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(e.total_amount,M)})]},n)),(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,x.jsx)("span",{style:{color:"#0A2540"},children:"Total"}),(0,x.jsx)("span",{style:{color:"#0A2540"},children:(0,a.vv)(se.current_month.estimated_charges.totalAmount,M)})]})]})})]})]}),se.latest_invoice&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Latest Invoice"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Invoice Number"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:se.latest_invoice.invoice_number})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Amount"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)(parseFloat(se.latest_invoice.total_amount)||0,M)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,x.jsx)(j,{status:se.latest_invoice.status,children:se.latest_invoice.status.replace("_"," ")})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Due Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(se.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),(0,x.jsx)(_,{children:(0,x.jsx)(d.cc,{variant:"primary",onClick:()=>oe(!1),children:"Close"})})]})}),le&&ce&&(0,x.jsx)(y,{show:le,onClick:()=>de(!1),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:"Confirm Action"}),(0,x.jsx)(B,{onClick:()=>de(!1),children:"\xd7"})]}),(0,x.jsx)(F,{children:(0,x.jsx)("p",{children:"unassign"===xe&&`Are you sure you want to remove the plan "${null===(i=ce.plan)||void 0===i?void 0:i.name}" from ${ce.restaurant_name}?`})}),(0,x.jsxs)(_,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>de(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"danger",onClick:async()=>{if(I&&ce&&xe)try{const e={...N?{Authorization:`Bearer ${N}`}:{}};if("unassign"===xe&&ce.plan){const n=await fetch(`/api/brands/${I}/plans/${ce.plan.id}/restaurants/${ce.restaurant_id}`,{method:"DELETE",headers:e});if(!n.ok){const e=await n.json();console.error("Failed to unassign:",e)}}de(!1),pe(null),he(null),ue()}catch(e){console.error("Action failed:",e)}},children:"Remove Plan"})]})]})})]})]})})}}}]);