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
`},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var i=t(9950),r=t(1367),o=t(6038);const s=()=>{const{user:e}=(0,r.As)(),[n,t]=(0,i.useState)("RM"),[s]=(0,i.useState)(Object.keys(o.DL)),[a,l]=(0,i.useState)(!0),[d,c]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),i=n.indexOf("restaurant");let r=i>=0?n[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),i=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";t(i)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),c("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:a,error:d}}},6950:(e,n,t)=>{t.r(n),t.d(n,{default:()=>z});var i=t(9950),r=t(4752),o=t(2853),s=t(1367),a=t(6038),l=t(4021),d=t(3705),c=t(2488),p=t(8409),x=t(4414);const u=(0,r.Ay)(p.A0)`
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
`,f=r.Ay.span`
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
`,j=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,b=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,_=r.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,F=r.Ay.input`
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
`,w=r.Ay.select`
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
`,B=r.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,A=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,C=r.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,S=r.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,z=()=>{var e,n,t,r;const{user:z}=(0,s.As)(),{defaultCurrency:k}=(0,l.i1)(),E=k||"MYR",D=localStorage.getItem("auth_token"),$=(null===z||void 0===z?void 0:z.brand_id)||null,[R,W]=(0,i.useState)([]),[N,P]=(0,i.useState)(!0),[T,L]=(0,i.useState)(""),[M,O]=(0,i.useState)("all"),[I,U]=(0,i.useState)([]),[Y,J]=(0,i.useState)(!1),[Q,X]=(0,i.useState)(null),[H,K]=(0,i.useState)(""),[V,q]=(0,i.useState)(null),[G,Z]=(0,i.useState)(!1),[ee,ne]=(0,i.useState)(null),[te,ie]=(0,i.useState)(!1),[re,oe]=(0,i.useState)(null),[se,ae]=(0,i.useState)({discount_type:"none",discount_value:0,discount_reason:""}),[le,de]=(0,i.useState)(!1),[ce,pe]=(0,i.useState)(null),[xe,ue]=(0,i.useState)(null),he=(0,i.useCallback)(async()=>{if($){P(!0);try{const e=D?{Authorization:`Bearer ${D}`}:{},n=await fetch(`/api/brands/${$}/subscriptions`,{headers:e});if(n.ok){const e=await n.json();W(e.success?e.data:Array.isArray(e)?e:[])}}catch(e){console.error("Error fetching subscriptions:",e),W([])}finally{P(!1)}}},[$,D]),ve=(0,i.useCallback)(async()=>{if($)try{const e=D?{Authorization:`Bearer ${D}`}:{},n=await fetch(`/api/brands/${$}/plans`,{headers:e});if(n.ok){const e=await n.json(),t=e.success?e.data:Array.isArray(e)?e:[];U(t.filter(e=>e.is_active))}}catch(e){console.error("Error fetching brand plans:",e)}},[$,D]);(0,i.useEffect)(()=>{he(),ve()},[he,ve]);const ge=R.filter(e=>{var n;const t=e.restaurant_name.toLowerCase().includes(T.toLowerCase())||e.restaurant_email.toLowerCase().includes(T.toLowerCase())||((null===(n=e.plan)||void 0===n?void 0:n.name)||"").toLowerCase().includes(T.toLowerCase());return"all"===M?t:"assigned"===M?t&&null!==e.plan:"unassigned"===M?t&&null===e.plan:"active"===M?t&&"active"===e.restaurant_status:"overdue"===M?t&&"overdue"===e.restaurant_status:t}),me=R.length,fe=R.filter(e=>null!==e.plan).length,ye=R.filter(e=>null===e.plan).length,je=R.reduce((e,n)=>{var t,i;return e+((null===(t=n.current_month)||void 0===t||null===(i=t.estimated_charges)||void 0===i?void 0:i.totalAmount)||0)},0),be=e=>{var n,t,i;oe(e),ae({discount_type:(null===(n=e.plan)||void 0===n?void 0:n.discount_type)||"none",discount_value:(null===(t=e.plan)||void 0===t?void 0:t.discount_value)||0,discount_reason:(null===(i=e.plan)||void 0===i?void 0:i.discount_reason)||""}),ie(!0)};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(p.mc,{children:[(0,x.jsxs)(p.Y9,{children:[(0,x.jsx)(p.hE,{children:"Subscriptions"}),(0,x.jsx)(p.ex,{children:(0,x.jsx)(d.cc,{variant:"outline",onClick:()=>{const e=[["Restaurant","Email","Status","Plan","Subscription Fee","Revenue %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];R.forEach(n=>{var t,i,r,o,s,a,l,d,c;e.push([`"${n.restaurant_name}"`,`"${n.restaurant_email}"`,n.restaurant_status,`"${(null===(t=n.plan)||void 0===t?void 0:t.name)||"Not Assigned"}"`,(null===(i=n.plan)||void 0===i?void 0:i.subscription_fee)||"0",(null===(r=n.plan)||void 0===r?void 0:r.revenue_percentage)||"0",(null===(o=n.plan)||void 0===o?void 0:o.billing_cycle)||"-",(null===(s=n.latest_invoice)||void 0===s?void 0:s.invoice_number)||"-",(null===(a=n.latest_invoice)||void 0===a?void 0:a.status)||"-",(null===(l=n.current_month)||void 0===l||null===(d=l.estimated_charges)||void 0===d||null===(c=d.totalAmount)||void 0===c?void 0:c.toString())||"0"].join(","))});const n=new Blob([e.join("\n")],{type:"text/csv"}),t=window.URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download=`brand-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(t),document.body.removeChild(i)},children:"Export"})})]}),(0,x.jsxs)(p.UC,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#059669",children:[(0,x.jsx)(p.Os,{children:me}),(0,x.jsx)(p.v0,{children:"Total Restaurants"}),(0,x.jsx)(p.d1,{children:"In your brand"})]}),(0,x.jsxs)(p.hI,{color:"#2563EB",children:[(0,x.jsx)(p.Os,{children:fe}),(0,x.jsx)(p.v0,{children:"Plan Assigned"}),(0,x.jsxs)(p.d1,{children:[me>0?Math.round(fe/me*100):0,"% covered"]})]}),(0,x.jsxs)(p.hI,{color:"#7C3AED",children:[(0,x.jsx)(p.Os,{children:ye}),(0,x.jsx)(p.v0,{children:"No Plan"}),(0,x.jsx)(p.d1,{children:"Need plan assignment"})]}),(0,x.jsxs)(p.hI,{color:"#D97706",children:[(0,x.jsx)(p.Os,{children:(0,a.vv)(je,E)}),(0,x.jsx)(p.v0,{children:"Est. Monthly Charges"}),(0,x.jsx)(p.d1,{children:"From all restaurants"})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsxs)(c.Jt,{value:M,onChange:e=>O(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Restaurants"}),(0,x.jsx)("option",{value:"assigned",children:"Plan Assigned"}),(0,x.jsx)("option",{value:"unassigned",children:"No Plan"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"overdue",children:"Overdue"})]}),(0,x.jsx)(c.DO,{placeholder:"Search restaurants or plans...",value:T,onChange:e=>L(e.target.value)})]}),N?(0,x.jsx)(S,{children:"Loading subscription data..."}):0===ge.length?(0,x.jsxs)(o.pp,{children:[(0,x.jsx)(B,{children:"\ud83d\udccb"}),(0,x.jsx)(A,{children:0===R.length?"No Restaurants":"No Results"}),(0,x.jsx)(C,{children:0===R.length?"No restaurants are assigned to this brand yet.":"No restaurants match your search criteria."})]}):(0,x.jsxs)(x.Fragment,{children:[V&&(0,x.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,x.jsx)("span",{style:{fontSize:"13px",color:"#92400E"},children:V}),(0,x.jsx)("button",{onClick:()=>q(null),style:{background:"none",border:"none",color:"#92400E",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"\xd7"})]}),(0,x.jsxs)(p.XI,{children:[(0,x.jsxs)(u,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsx)("span",{className:"col-info",children:"Restaurant"}),(0,x.jsx)("span",{children:"Plan"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{className:"col-fee",children:"Est. Charges"}),(0,x.jsx)("span",{children:"Latest Invoice"}),(0,x.jsx)("span",{className:"col-revenue",children:"Revenue (MTD)"}),(0,x.jsx)("span",{className:"col-action",children:"Actions"})]}),ge.map(e=>{var n,t,i;return(0,x.jsxs)(h,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsxs)(p.Np,{children:[(0,x.jsxs)(p.Uj,{className:"col-info",children:[(0,x.jsx)(p.PM,{children:"Restaurant"}),(0,x.jsxs)(v,{children:[(0,x.jsxs)(g,{children:[e.restaurant_name," ",e.restaurant_currency&&(0,x.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e.restaurant_currency})]}),(0,x.jsx)(m,{children:e.restaurant_email})]})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Plan"}),e.plan?(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:e.plan.name}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[e.plan.discount_type&&"none"!==e.plan.discount_type&&(e.plan.discount_value||0)>0?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("span",{style:{textDecoration:"line-through",color:"#9CA3AF"},children:(0,a.vv)(parseFloat(e.plan.subscription_fee)||0,E)})," ",(0,x.jsxs)("span",{style:{color:"#15803D",fontWeight:600},children:[(0,a.vv)("percentage"===e.plan.discount_type?(parseFloat(e.plan.subscription_fee)||0)*(1-(e.plan.discount_value||0)/100):Math.max(0,(parseFloat(e.plan.subscription_fee)||0)-(e.plan.discount_value||0)),E),"/mo"]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,a.vv)(parseFloat(e.plan.subscription_fee)||0,E),"/mo"]}),parseFloat(e.plan.revenue_percentage)>0&&` + ${e.plan.revenue_percentage}%`]})]}):(0,x.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Status"}),(0,x.jsx)(f,{status:e.restaurant_status,children:e.restaurant_status.charAt(0).toUpperCase()+e.restaurant_status.slice(1)})]}),(0,x.jsxs)(p.Uj,{className:"col-fee",children:[(0,x.jsx)(p.PM,{children:"Est. Charges"}),null!==(n=e.current_month)&&void 0!==n&&n.estimated_charges?(0,x.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(e.current_month.estimated_charges.totalAmount,E)}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Latest Invoice"}),e.latest_invoice?(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:e.latest_invoice.invoice_number}),(0,x.jsx)(f,{status:e.latest_invoice.status,children:e.latest_invoice.status.replace("_"," ")})]}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"No invoice"})]}),(0,x.jsxs)(p.Uj,{className:"col-revenue",children:[(0,x.jsx)(p.PM,{children:"Revenue (MTD)"}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)((null===(t=e.current_month)||void 0===t?void 0:t.revenue)||0,E)}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(i=e.current_month)||void 0===i?void 0:i.order_count)||0," orders"]})]})]})]}),(0,x.jsxs)(p.wr,{children:[(0,x.jsx)(p.rA,{onClick:()=>(e=>{ne(e),Z(!0)})(e),children:"View"}),(0,x.jsx)(p.rA,{onClick:()=>(e=>{var n;X(e),K((null===(n=e.plan)||void 0===n?void 0:n.id)||""),J(!0)})(e),children:e.plan?"Change":"Assign"}),e.plan&&(0,x.jsx)(p.K0,{onClick:()=>(e=>{pe(e),ue("unassign"),de(!0)})(e),title:"Remove plan assignment",children:(0,x.jsx)(y,{children:"\u2715"})})]})]},e.restaurant_id)})]})]}),Y&&Q&&(0,x.jsx)(p.aF,{isOpen:!0,onClose:()=>J(!1),title:Q.plan?"Change Plan":"Assign Plan",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>J(!1),children:"Cancel"}),(0,x.jsxs)(d.cc,{variant:"primary",onClick:async()=>{if($&&Q&&H)try{const e={"Content-Type":"application/json",...D?{Authorization:`Bearer ${D}`}:{}},n=await fetch(`/api/brands/${$}/plans/${H}/restaurants`,{method:"POST",headers:e,body:JSON.stringify({restaurant_ids:[Q.restaurant_id]})});if(n.ok){const e=await n.json();J(!1),X(null),K(""),he(),e.currency_warnings&&e.currency_warnings.length>0&&q(e.currency_warnings[0].message)}else{const e=await n.json();console.error("Failed to assign plan:",e)}}catch(e){console.error("Error assigning plan:",e)}},disabled:!H||0===I.length,children:[" ",Q.plan?"Change Plan":"Assign Plan"," "]})]}),children:(0,x.jsxs)(j,{children:[(0,x.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(_,{children:"Restaurant"}),(0,x.jsx)(F,{type:"text",value:Q.restaurant_name,disabled:!0})]}),Q.plan&&(0,x.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(_,{children:"Current Plan"}),(0,x.jsxs)("div",{style:{padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[Q.plan.name," \u2014 ",(0,a.vv)(parseFloat(Q.plan.subscription_fee)||0,E),"/mo",parseFloat(Q.plan.revenue_percentage)>0&&` + ${Q.plan.revenue_percentage}% revenue`]})]}),(0,x.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(_,{children:"Select Plan *"}),(0,x.jsxs)(w,{value:H,onChange:e=>K(e.target.value?parseInt(e.target.value):""),children:[(0,x.jsx)("option",{value:"",children:"Select a plan..."}),I.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.name," \u2014 ",(0,a.vv)(parseFloat(e.subscription_fee)||0,E),"/mo",parseFloat(e.revenue_percentage)>0&&` + ${e.revenue_percentage}%`]},e.id))]}),0===I.length&&(0,x.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),H&&(()=>{const e=I.find(e=>e.id===H);return e?(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,x.jsx)("strong",{children:"Plan Summary:"})}),(0,x.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e.name}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Subscription Fee: ",(0,a.vv)(parseFloat(e.subscription_fee)||0,E),"/mo",parseFloat(e.revenue_percentage)>0&&` | Revenue Share: ${e.revenue_percentage}%`,"none"!==e.rent_type&&` | Rent: ${e.rent_type}`,` | Billing: ${e.billing_cycle}`]})]}):null})()]})}),G&&ee&&(0,x.jsx)(p.aF,{isOpen:!0,onClose:()=>Z(!1),title:"Subscription Details",footer:(0,x.jsx)(x.Fragment,{children:(0,x.jsx)(d.cc,{variant:"primary",onClick:()=>Z(!1),children:"Close"})}),children:(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Name"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.restaurant_name})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Email"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.restaurant_email})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,x.jsx)(f,{status:ee.restaurant_status,children:ee.restaurant_status.charAt(0).toUpperCase()+ee.restaurant_status.slice(1)})]})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Plan"}),(0,x.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:ee.plan?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Name"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.plan.name})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Subscription Fee"}),ee.plan.discount_type&&"none"!==ee.plan.discount_type&&(ee.plan.discount_value||0)>0?(0,x.jsxs)("div",{children:[(0,x.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:[(0,a.vv)(parseFloat(ee.plan.subscription_fee)||0,E),"/mo"]}),(0,x.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:[(0,a.vv)("percentage"===ee.plan.discount_type?(parseFloat(ee.plan.subscription_fee)||0)*(1-(ee.plan.discount_value||0)/100):Math.max(0,(parseFloat(ee.plan.subscription_fee)||0)-(ee.plan.discount_value||0)),E),"/mo",(0,x.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===ee.plan.discount_type?`${ee.plan.discount_value}%`:(0,a.vv)(ee.plan.discount_value||0,E),")"]})]})]}):(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,a.vv)(parseFloat(ee.plan.subscription_fee)||0,E),"/mo"]})]}),parseFloat(ee.plan.revenue_percentage)>0&&(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue Share"}),(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[ee.plan.revenue_percentage,"%"]})]}),"none"!==ee.plan.rent_type&&(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Rent"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===ee.plan.rent_type?(0,a.vv)(parseFloat(ee.plan.rent_fixed||"0"),E):"percentage"===ee.plan.rent_type?`${ee.plan.rent_percentage}%`:`MAX(${(0,a.vv)(parseFloat(ee.plan.rent_fixed||"0"),E)}, ${ee.plan.rent_percentage}%)`})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.plan.billing_cycle})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Activation Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(ee.plan.activation_date).toLocaleDateString()})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Discount"}),ee.plan.discount_type&&"none"!==ee.plan.discount_type&&(ee.plan.discount_value||0)>0?(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsxs)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:["percentage"===ee.plan.discount_type?`${ee.plan.discount_value}%`:`${(0,a.vv)(ee.plan.discount_value||0,E)}`,ee.plan.discount_reason?` (${ee.plan.discount_reason})`:""]}),(0,x.jsx)("button",{onClick:()=>be(ee),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"2px 8px",fontSize:"11px",color:"#6B7280",cursor:"pointer"},children:"Edit"})]}):(0,x.jsx)("button",{onClick:()=>be(ee),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"4px 12px",fontSize:"12px",color:"#635BFF",cursor:"pointer",fontWeight:"500"},children:"Set Discount"})]})]}):(0,x.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:"No plan assigned to this restaurant."})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Current Month"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)((null===(e=ee.current_month)||void 0===e?void 0:e.revenue)||0,E)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Orders"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(n=ee.current_month)||void 0===n?void 0:n.order_count)||0})]}),(null===(t=ee.current_month)||void 0===t?void 0:t.estimated_charges)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Estimated Charges Breakdown"}),ee.current_month.estimated_charges.items.map((e,n)=>(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,x.jsx)("span",{style:{color:"#374151"},children:e.description}),(0,x.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(e.total_amount,E)})]},n)),(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,x.jsx)("span",{style:{color:"#0A2540"},children:"Total"}),(0,x.jsx)("span",{style:{color:"#0A2540"},children:(0,a.vv)(ee.current_month.estimated_charges.totalAmount,E)})]})]})})]})]}),ee.latest_invoice&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Latest Invoice"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Invoice Number"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.latest_invoice.invoice_number})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Amount"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)(parseFloat(ee.latest_invoice.total_amount)||0,E)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,x.jsx)(f,{status:ee.latest_invoice.status,children:ee.latest_invoice.status.replace("_"," ")})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Due Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(ee.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),le&&ce&&(0,x.jsx)(p.aF,{isOpen:!0,onClose:()=>de(!1),title:"Confirm Action",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>de(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"danger",onClick:async()=>{if($&&ce&&xe)try{const e={...D?{Authorization:`Bearer ${D}`}:{}};if("unassign"===xe&&ce.plan){const n=await fetch(`/api/brands/${$}/plans/${ce.plan.id}/restaurants/${ce.restaurant_id}`,{method:"DELETE",headers:e});if(!n.ok){const e=await n.json();console.error("Failed to unassign:",e)}}de(!1),pe(null),ue(null),he()}catch(e){console.error("Action failed:",e)}},children:"Remove Plan"})]}),children:(0,x.jsx)("p",{children:"unassign"===xe&&`Are you sure you want to remove the plan "${null===(r=ce.plan)||void 0===r?void 0:r.name}" from ${ce.restaurant_name}?`})}),te&&re&&(0,x.jsx)(p.aF,{isOpen:!0,onClose:()=>ie(!1),title:`Set Discount - ${re.restaurant_name}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>ie(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"primary",onClick:async()=>{if(re&&re.plan&&$)try{const e={"Content-Type":"application/json",...D?{Authorization:`Bearer ${D}`}:{}};(await fetch(`/api/brands/${$}/plans/${re.plan.id}/restaurants/${re.restaurant_id}/discount`,{method:"PUT",headers:e,body:JSON.stringify(se)})).ok&&(ie(!1),oe(null),he())}catch(e){console.error("Failed to save discount:",e)}},children:"Save Discount"})]}),children:(0,x.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Discount Type"}),(0,x.jsxs)(w,{value:se.discount_type,onChange:e=>ae({...se,discount_type:e.target.value,discount_value:"none"===e.target.value?0:se.discount_value}),children:[(0,x.jsx)("option",{value:"none",children:"None"}),(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsxs)("option",{value:"fixed",children:["Fixed Amount (",E,")"]})]})]}),"none"!==se.discount_type&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"percentage"===se.discount_type?"Discount Rate (%)":`Discount Amount (${E})`}),(0,x.jsx)(F,{type:"number",step:"percentage"===se.discount_type?"1":"0.01",min:"0",max:"percentage"===se.discount_type?"100":void 0,value:se.discount_value,onChange:e=>ae({...se,discount_value:parseFloat(e.target.value)||0}),placeholder:"percentage"===se.discount_type?"e.g. 10":"e.g. 50.00"})]}),"none"!==se.discount_type&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Reason (optional)"}),(0,x.jsx)(F,{type:"text",value:se.discount_reason,onChange:e=>ae({...se,discount_reason:e.target.value}),placeholder:"e.g. Opening promotion"})]}),"none"!==se.discount_type&&se.discount_value>0&&re.plan&&(0,x.jsxs)("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:"Preview"}),(0,x.jsx)("div",{style:{fontSize:"13px",color:"#15803D"},children:"percentage"===se.discount_type?`${se.discount_value}% off all charges`:`${(0,a.vv)(se.discount_value,E)} off total`})]})]})})]})]})})}}}]);