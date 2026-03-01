"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6950],{2488:(e,n,t)=>{t.d(n,{DO:()=>c,Jt:()=>p,Qn:()=>d});var i=t(8819),r=(t(9950),t(4752)),o=t(4414);const s=r.Ay.div`
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
`,a=r.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${i.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
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
`,l=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  &:disabled {
    background: ${i.w.colors.surfaceHover};
    color: ${i.w.colors.text.muted};
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
`,d=e=>{let{children:n,className:t,style:i,...r}=e;return(0,o.jsx)(s,{className:t,style:i,...r,children:n})},c=e=>{let{placeholder:n="Search...",...t}=e;return(0,o.jsx)(a,{placeholder:n,...t})},p=e=>{let{children:n,...t}=e;return(0,o.jsx)(l,{...t,children:n})}},3705:(e,n,t)=>{t.d(n,{cc:()=>o.$n});var i=t(8819),r=t(4752),o=t(8829);r.Ay.select`
  padding: ${i.w.components.form.inputPadding};
  border: 1px solid ${i.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${i.w.typography.fontSize.sm};
  background: ${i.w.colors.surface};
  color: ${i.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: ${i.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${i.w.colors.borderHover};
  }
`,r.Ay.input`
  padding: ${i.w.components.form.inputPadding};
  border: 1px solid ${i.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${i.w.typography.fontSize.sm};
  background: ${i.w.colors.surface};
  color: ${i.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: ${i.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${i.w.colors.borderHover};
  }
`,r.Ay.div`
  background: ${i.w.colors.surface};
  border-radius: ${i.w.borderRadius.md};
  border: 1px solid ${i.w.colors.borderLight};
  padding: ${i.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${i.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${i.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${i.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var i=t(9950),r=t(1367),o=t(6038);const s=()=>{const{user:e}=(0,r.As)(),[n,t]=(0,i.useState)("RM"),[s,a]=(0,i.useState)(Object.keys(o.DL)),[l,d]=(0,i.useState)(!0),[c,p]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),i=n.indexOf("restaurant");let r=i>=0?n[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),i=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";t(i)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},6950:(e,n,t)=>{t.r(n),t.d(n,{default:()=>B});var i=t(8819),r=t(9950),o=t(4752),s=t(1367),a=t(6038),l=t(4021),d=t(3705),c=t(2488),p=t(2674),x=t(4414);const h=(0,o.Ay)(p.A0)`
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
`,u=(0,o.Ay)(p.Hj)`
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
`,v=o.Ay.div``,m=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,g=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,j=o.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":case"paid":return"#ECFDF5";case"trial":case"pending_payment":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":case"paid":return"#059669";case"trial":case"pending_payment":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,y=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,f=o.Ay.div`
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
`,_=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,b=o.Ay.div`
  text-align: center;
  padding: 60px 40px;
  color: ${i.w.colors.text.placeholder};
`,w=o.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,S=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: ${i.w.colors.text.muted};
  margin-bottom: 8px;
`,A=o.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,C=o.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,B=()=>{var e,n,t,i;const{user:o}=(0,s.As)(),{defaultCurrency:B}=(0,l.i1)(),F=B||"MYR",z=localStorage.getItem("auth_token"),$=(null===o||void 0===o?void 0:o.brand_id)||null,[k,E]=(0,r.useState)([]),[R,D]=(0,r.useState)(!0),[W,P]=(0,r.useState)(""),[L,T]=(0,r.useState)("all"),[M,N]=(0,r.useState)([]),[I,O]=(0,r.useState)(!1),[U,H]=(0,r.useState)(null),[Q,J]=(0,r.useState)(""),[X,Y]=(0,r.useState)(!1),[Z,K]=(0,r.useState)(null),[V,q]=(0,r.useState)(!1),[G,ee]=(0,r.useState)(null),[ne,te]=(0,r.useState)({discount_type:"none",discount_value:0,discount_reason:""}),[ie,re]=(0,r.useState)(!1),[oe,se]=(0,r.useState)(null),[ae,le]=(0,r.useState)(null),de=(0,r.useCallback)(async()=>{if($){D(!0);try{const e=z?{Authorization:`Bearer ${z}`}:{},n=await fetch(`/api/brands/${$}/subscriptions`,{headers:e});if(n.ok){const e=await n.json();E(e.success?e.data:Array.isArray(e)?e:[])}}catch(e){console.error("Error fetching subscriptions:",e),E([])}finally{D(!1)}}},[$,z]),ce=(0,r.useCallback)(async()=>{if($)try{const e=z?{Authorization:`Bearer ${z}`}:{},n=await fetch(`/api/brands/${$}/plans`,{headers:e});if(n.ok){const e=await n.json(),t=e.success?e.data:Array.isArray(e)?e:[];N(t.filter(e=>e.is_active))}}catch(e){console.error("Error fetching brand plans:",e)}},[$,z]);(0,r.useEffect)(()=>{de(),ce()},[de,ce]);const pe=k.filter(e=>{var n;const t=e.restaurant_name.toLowerCase().includes(W.toLowerCase())||e.restaurant_email.toLowerCase().includes(W.toLowerCase())||((null===(n=e.plan)||void 0===n?void 0:n.name)||"").toLowerCase().includes(W.toLowerCase());return"all"===L?t:"assigned"===L?t&&null!==e.plan:"unassigned"===L?t&&null===e.plan:"active"===L?t&&"active"===e.restaurant_status:"overdue"===L?t&&"overdue"===e.restaurant_status:t}),xe=k.length,he=k.filter(e=>null!==e.plan).length,ue=k.filter(e=>null===e.plan).length,ve=k.reduce((e,n)=>{var t,i;return e+((null===(t=n.current_month)||void 0===t||null===(i=t.estimated_charges)||void 0===i?void 0:i.totalAmount)||0)},0),me=e=>{var n,t,i;ee(e),te({discount_type:(null===(n=e.plan)||void 0===n?void 0:n.discount_type)||"none",discount_value:(null===(t=e.plan)||void 0===t?void 0:t.discount_value)||0,discount_reason:(null===(i=e.plan)||void 0===i?void 0:i.discount_reason)||""}),q(!0)};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(p.mc,{children:[(0,x.jsxs)(p.Y9,{children:[(0,x.jsx)(p.hE,{children:"Subscriptions"}),(0,x.jsx)(p.ex,{children:(0,x.jsx)(d.cc,{variant:"outline",onClick:()=>{const e=[["Restaurant","Email","Status","Plan","Subscription Fee","Revenue %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];k.forEach(n=>{var t,i,r,o,s,a,l,d,c;e.push([`"${n.restaurant_name}"`,`"${n.restaurant_email}"`,n.restaurant_status,`"${(null===(t=n.plan)||void 0===t?void 0:t.name)||"Not Assigned"}"`,(null===(i=n.plan)||void 0===i?void 0:i.subscription_fee)||"0",(null===(r=n.plan)||void 0===r?void 0:r.revenue_percentage)||"0",(null===(o=n.plan)||void 0===o?void 0:o.billing_cycle)||"-",(null===(s=n.latest_invoice)||void 0===s?void 0:s.invoice_number)||"-",(null===(a=n.latest_invoice)||void 0===a?void 0:a.status)||"-",(null===(l=n.current_month)||void 0===l||null===(d=l.estimated_charges)||void 0===d||null===(c=d.totalAmount)||void 0===c?void 0:c.toString())||"0"].join(","))});const n=new Blob([e.join("\n")],{type:"text/csv"}),t=window.URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download=`brand-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(t),document.body.removeChild(i)},children:"Export"})})]}),(0,x.jsxs)(p.UC,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#059669",children:[(0,x.jsx)(p.Os,{children:xe}),(0,x.jsx)(p.v0,{children:"Total Restaurants"}),(0,x.jsx)(p.d1,{children:"In your brand"})]}),(0,x.jsxs)(p.hI,{color:"#2563EB",children:[(0,x.jsx)(p.Os,{children:he}),(0,x.jsx)(p.v0,{children:"Plan Assigned"}),(0,x.jsxs)(p.d1,{children:[xe>0?Math.round(he/xe*100):0,"% covered"]})]}),(0,x.jsxs)(p.hI,{color:"#7C3AED",children:[(0,x.jsx)(p.Os,{children:ue}),(0,x.jsx)(p.v0,{children:"No Plan"}),(0,x.jsx)(p.d1,{children:"Need plan assignment"})]}),(0,x.jsxs)(p.hI,{color:"#D97706",children:[(0,x.jsx)(p.Os,{children:(0,a.vv)(ve,F)}),(0,x.jsx)(p.v0,{children:"Est. Monthly Charges"}),(0,x.jsx)(p.d1,{children:"From all restaurants"})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsx)(c.DO,{placeholder:"Search restaurants or plans...",value:W,onChange:e=>P(e.target.value)}),(0,x.jsxs)(c.Jt,{value:L,onChange:e=>T(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Restaurants"}),(0,x.jsx)("option",{value:"assigned",children:"Plan Assigned"}),(0,x.jsx)("option",{value:"unassigned",children:"No Plan"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"overdue",children:"Overdue"})]})]}),R?(0,x.jsx)(C,{children:"Loading subscription data..."}):0===pe.length?(0,x.jsxs)(b,{children:[(0,x.jsx)(w,{children:"\ud83d\udccb"}),(0,x.jsx)(S,{children:0===k.length?"No Restaurants":"No Results"}),(0,x.jsx)(A,{children:0===k.length?"No restaurants are assigned to this brand yet.":"No restaurants match your search criteria."})]}):(0,x.jsxs)(p.XI,{children:[(0,x.jsxs)(h,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsx)("span",{children:"Restaurant"}),(0,x.jsx)("span",{children:"Plan"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Est. Charges"}),(0,x.jsx)("span",{children:"Latest Invoice"}),(0,x.jsx)("span",{children:"Revenue (MTD)"}),(0,x.jsx)("span",{children:"Actions"})]}),pe.map(e=>{var n,t,i;return(0,x.jsxs)(u,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsxs)(p.Np,{children:[(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Restaurant"}),(0,x.jsxs)(v,{children:[(0,x.jsx)(m,{children:e.restaurant_name}),(0,x.jsx)(g,{children:e.restaurant_email})]})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Plan"}),e.plan?(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:e.plan.name}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[e.plan.discount_type&&"none"!==e.plan.discount_type&&(e.plan.discount_value||0)>0?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("span",{style:{textDecoration:"line-through",color:"#9CA3AF"},children:(0,a.vv)(parseFloat(e.plan.subscription_fee)||0,F)})," ",(0,x.jsxs)("span",{style:{color:"#15803D",fontWeight:600},children:[(0,a.vv)("percentage"===e.plan.discount_type?(parseFloat(e.plan.subscription_fee)||0)*(1-(e.plan.discount_value||0)/100):Math.max(0,(parseFloat(e.plan.subscription_fee)||0)-(e.plan.discount_value||0)),F),"/mo"]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,a.vv)(parseFloat(e.plan.subscription_fee)||0,F),"/mo"]}),parseFloat(e.plan.revenue_percentage)>0&&` + ${e.plan.revenue_percentage}%`]})]}):(0,x.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Status"}),(0,x.jsx)(j,{status:e.restaurant_status,children:e.restaurant_status.charAt(0).toUpperCase()+e.restaurant_status.slice(1)})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Est. Charges"}),null!==(n=e.current_month)&&void 0!==n&&n.estimated_charges?(0,x.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(e.current_month.estimated_charges.totalAmount,F)}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Latest Invoice"}),e.latest_invoice?(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:e.latest_invoice.invoice_number}),(0,x.jsx)(j,{status:e.latest_invoice.status,children:e.latest_invoice.status.replace("_"," ")})]}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"No invoice"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Revenue (MTD)"}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)((null===(t=e.current_month)||void 0===t?void 0:t.revenue)||0,F)}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(i=e.current_month)||void 0===i?void 0:i.order_count)||0," orders"]})]})]})]}),(0,x.jsxs)(p.wr,{children:[(0,x.jsx)(p.rA,{onClick:()=>(e=>{K(e),Y(!0)})(e),children:"View"}),(0,x.jsx)(p.rA,{onClick:()=>(e=>{var n;H(e),J((null===(n=e.plan)||void 0===n?void 0:n.id)||""),O(!0)})(e),children:e.plan?"Change":"Assign"}),e.plan&&(0,x.jsx)(p.K0,{onClick:()=>(e=>{se(e),le("unassign"),re(!0)})(e),title:"Remove plan assignment",children:(0,x.jsx)(y,{children:"\u2715"})})]})]},e.restaurant_id)})]}),I&&U&&(0,x.jsx)(p.mH,{show:I,onClick:()=>O(!1),children:(0,x.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(p.rQ,{children:[(0,x.jsx)(p.wt,{children:U.plan?"Change Plan":"Assign Plan"}),(0,x.jsx)(p.Jn,{onClick:()=>O(!1),children:"\xd7"})]}),(0,x.jsx)(p.cw,{children:(0,x.jsxs)(_,{children:[(0,x.jsxs)(p.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(p.lR,{children:"Restaurant"}),(0,x.jsx)(p.ZQ,{type:"text",value:U.restaurant_name,disabled:!0})]}),U.plan&&(0,x.jsxs)(p.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(p.lR,{children:"Current Plan"}),(0,x.jsxs)("div",{style:{padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[U.plan.name," \u2014 ",(0,a.vv)(parseFloat(U.plan.subscription_fee)||0,F),"/mo",parseFloat(U.plan.revenue_percentage)>0&&` + ${U.plan.revenue_percentage}% revenue`]})]}),(0,x.jsxs)(p.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(p.lR,{children:"Select Plan *"}),(0,x.jsxs)(p.FX,{value:Q,onChange:e=>J(e.target.value?parseInt(e.target.value):""),children:[(0,x.jsx)("option",{value:"",children:"Select a plan..."}),M.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.name," \u2014 ",(0,a.vv)(parseFloat(e.subscription_fee)||0,F),"/mo",parseFloat(e.revenue_percentage)>0&&` + ${e.revenue_percentage}%`]},e.id))]}),0===M.length&&(0,x.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),Q&&(()=>{const e=M.find(e=>e.id===Q);return e?(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,x.jsx)("strong",{children:"Plan Summary:"})}),(0,x.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e.name}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Subscription Fee: ",(0,a.vv)(parseFloat(e.subscription_fee)||0,F),"/mo",parseFloat(e.revenue_percentage)>0&&` | Revenue Share: ${e.revenue_percentage}%`,"none"!==e.rent_type&&` | Rent: ${e.rent_type}`,` | Billing: ${e.billing_cycle}`]})]}):null})()]})}),(0,x.jsxs)(p.jl,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>O(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"primary",onClick:async()=>{if($&&U&&Q)try{const e={"Content-Type":"application/json",...z?{Authorization:`Bearer ${z}`}:{}},n=await fetch(`/api/brands/${$}/plans/${Q}/restaurants`,{method:"POST",headers:e,body:JSON.stringify({restaurant_ids:[U.restaurant_id]})});if(n.ok)O(!1),H(null),J(""),de();else{const e=await n.json();console.error("Failed to assign plan:",e)}}catch(e){console.error("Error assigning plan:",e)}},disabled:!Q||0===M.length,children:U.plan?"Change Plan":"Assign Plan"})]})]})}),X&&Z&&(0,x.jsx)(p.mH,{show:X,onClick:()=>Y(!1),children:(0,x.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(p.rQ,{children:[(0,x.jsx)(p.wt,{children:"Subscription Details"}),(0,x.jsx)(p.Jn,{onClick:()=>Y(!1),children:"\xd7"})]}),(0,x.jsx)(p.cw,{children:(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Name"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.restaurant_name})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Email"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.restaurant_email})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,x.jsx)(j,{status:Z.restaurant_status,children:Z.restaurant_status.charAt(0).toUpperCase()+Z.restaurant_status.slice(1)})]})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Plan"}),(0,x.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:Z.plan?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Name"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.plan.name})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Subscription Fee"}),Z.plan.discount_type&&"none"!==Z.plan.discount_type&&(Z.plan.discount_value||0)>0?(0,x.jsxs)("div",{children:[(0,x.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:[(0,a.vv)(parseFloat(Z.plan.subscription_fee)||0,F),"/mo"]}),(0,x.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:[(0,a.vv)("percentage"===Z.plan.discount_type?(parseFloat(Z.plan.subscription_fee)||0)*(1-(Z.plan.discount_value||0)/100):Math.max(0,(parseFloat(Z.plan.subscription_fee)||0)-(Z.plan.discount_value||0)),F),"/mo",(0,x.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===Z.plan.discount_type?`${Z.plan.discount_value}%`:(0,a.vv)(Z.plan.discount_value||0,F),")"]})]})]}):(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,a.vv)(parseFloat(Z.plan.subscription_fee)||0,F),"/mo"]})]}),parseFloat(Z.plan.revenue_percentage)>0&&(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue Share"}),(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[Z.plan.revenue_percentage,"%"]})]}),"none"!==Z.plan.rent_type&&(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Rent"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===Z.plan.rent_type?(0,a.vv)(parseFloat(Z.plan.rent_fixed||"0"),F):"percentage"===Z.plan.rent_type?`${Z.plan.rent_percentage}%`:`MAX(${(0,a.vv)(parseFloat(Z.plan.rent_fixed||"0"),F)}, ${Z.plan.rent_percentage}%)`})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.plan.billing_cycle})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Activation Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(Z.plan.activation_date).toLocaleDateString()})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Discount"}),Z.plan.discount_type&&"none"!==Z.plan.discount_type&&(Z.plan.discount_value||0)>0?(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsxs)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:["percentage"===Z.plan.discount_type?`${Z.plan.discount_value}%`:`${(0,a.vv)(Z.plan.discount_value||0,F)}`,Z.plan.discount_reason?` (${Z.plan.discount_reason})`:""]}),(0,x.jsx)("button",{onClick:()=>me(Z),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"2px 8px",fontSize:"11px",color:"#6B7280",cursor:"pointer"},children:"Edit"})]}):(0,x.jsx)("button",{onClick:()=>me(Z),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"4px 12px",fontSize:"12px",color:"#635BFF",cursor:"pointer",fontWeight:"500"},children:"Set Discount"})]})]}):(0,x.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:"No plan assigned to this restaurant."})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Current Month"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)((null===(e=Z.current_month)||void 0===e?void 0:e.revenue)||0,F)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Orders"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(n=Z.current_month)||void 0===n?void 0:n.order_count)||0})]}),(null===(t=Z.current_month)||void 0===t?void 0:t.estimated_charges)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Estimated Charges Breakdown"}),Z.current_month.estimated_charges.items.map((e,n)=>(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,x.jsx)("span",{style:{color:"#374151"},children:e.description}),(0,x.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(e.total_amount,F)})]},n)),(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,x.jsx)("span",{style:{color:"#0A2540"},children:"Total"}),(0,x.jsx)("span",{style:{color:"#0A2540"},children:(0,a.vv)(Z.current_month.estimated_charges.totalAmount,F)})]})]})})]})]}),Z.latest_invoice&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Latest Invoice"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Invoice Number"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.latest_invoice.invoice_number})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Amount"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)(parseFloat(Z.latest_invoice.total_amount)||0,F)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,x.jsx)(j,{status:Z.latest_invoice.status,children:Z.latest_invoice.status.replace("_"," ")})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Due Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(Z.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),(0,x.jsx)(p.jl,{children:(0,x.jsx)(d.cc,{variant:"primary",onClick:()=>Y(!1),children:"Close"})})]})}),ie&&oe&&(0,x.jsx)(p.mH,{show:ie,onClick:()=>re(!1),children:(0,x.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(p.rQ,{children:[(0,x.jsx)(p.wt,{children:"Confirm Action"}),(0,x.jsx)(p.Jn,{onClick:()=>re(!1),children:"\xd7"})]}),(0,x.jsx)(p.cw,{children:(0,x.jsx)("p",{children:"unassign"===ae&&`Are you sure you want to remove the plan "${null===(i=oe.plan)||void 0===i?void 0:i.name}" from ${oe.restaurant_name}?`})}),(0,x.jsxs)(p.jl,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>re(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"danger",onClick:async()=>{if($&&oe&&ae)try{const e={...z?{Authorization:`Bearer ${z}`}:{}};if("unassign"===ae&&oe.plan){const n=await fetch(`/api/brands/${$}/plans/${oe.plan.id}/restaurants/${oe.restaurant_id}`,{method:"DELETE",headers:e});if(!n.ok){const e=await n.json();console.error("Failed to unassign:",e)}}re(!1),se(null),le(null),de()}catch(e){console.error("Action failed:",e)}},children:"Remove Plan"})]})]})}),V&&G&&(0,x.jsx)(p.mH,{show:V,onClick:()=>q(!1),children:(0,x.jsxs)(f,{onClick:e=>e.stopPropagation(),style:{maxWidth:"480px"},children:[(0,x.jsxs)(p.rQ,{children:[(0,x.jsxs)(p.wt,{children:["Set Discount - ",G.restaurant_name]}),(0,x.jsx)(p.Jn,{onClick:()=>q(!1),children:"\xd7"})]}),(0,x.jsx)(p.cw,{children:(0,x.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Discount Type"}),(0,x.jsxs)(p.FX,{value:ne.discount_type,onChange:e=>te({...ne,discount_type:e.target.value,discount_value:"none"===e.target.value?0:ne.discount_value}),children:[(0,x.jsx)("option",{value:"none",children:"None"}),(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsxs)("option",{value:"fixed",children:["Fixed Amount (",F,")"]})]})]}),"none"!==ne.discount_type&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"percentage"===ne.discount_type?"Discount Rate (%)":`Discount Amount (${F})`}),(0,x.jsx)(p.ZQ,{type:"number",step:"percentage"===ne.discount_type?"1":"0.01",min:"0",max:"percentage"===ne.discount_type?"100":void 0,value:ne.discount_value,onChange:e=>te({...ne,discount_value:parseFloat(e.target.value)||0}),placeholder:"percentage"===ne.discount_type?"e.g. 10":"e.g. 50.00"})]}),"none"!==ne.discount_type&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Reason (optional)"}),(0,x.jsx)(p.ZQ,{type:"text",value:ne.discount_reason,onChange:e=>te({...ne,discount_reason:e.target.value}),placeholder:"e.g. Opening promotion"})]}),"none"!==ne.discount_type&&ne.discount_value>0&&G.plan&&(0,x.jsxs)("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:"Preview"}),(0,x.jsx)("div",{style:{fontSize:"13px",color:"#15803D"},children:"percentage"===ne.discount_type?`${ne.discount_value}% off all charges`:`${(0,a.vv)(ne.discount_value,F)} off total`})]})]})}),(0,x.jsxs)(p.jl,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>q(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"primary",onClick:async()=>{if(G&&G.plan&&$)try{const e={"Content-Type":"application/json",...z?{Authorization:`Bearer ${z}`}:{}};(await fetch(`/api/brands/${$}/plans/${G.plan.id}/restaurants/${G.restaurant_id}/discount`,{method:"PUT",headers:e,body:JSON.stringify(ne)})).ok&&(q(!1),ee(null),de())}catch(e){console.error("Failed to save discount:",e)}},disabled:"none"!==ne.discount_type&&!ne.discount_value,children:"Save Discount"})]})]})})]})]})})}}}]);