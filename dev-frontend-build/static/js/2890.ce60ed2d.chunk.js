"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2890],{2488:(e,n,t)=>{t.d(n,{DO:()=>c,Jt:()=>p,Qn:()=>d});var i=t(8819),o=(t(9950),t(4752)),r=t(4414);const s=o.Ay.div`
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
`,l=o.Ay.input`
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
`,a=o.Ay.select`
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
`,d=e=>{let{children:n,className:t,style:i,...o}=e;return(0,r.jsx)(s,{className:t,style:i,...o,children:n})},c=e=>{let{placeholder:n="Search...",...t}=e;return(0,r.jsx)(l,{placeholder:n,...t})},p=e=>{let{children:n,...t}=e;return(0,r.jsx)(a,{...t,children:n})}},2890:(e,n,t)=>{t.r(n),t.d(n,{default:()=>B});var i=t(8819),o=t(9950),r=t(4752),s=t(1367),l=t(6038),a=t(3705),d=t(2488),c=t(2674),p=t(4414);const x=(0,r.Ay)(c.A0)`
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
`,h=(0,r.Ay)(c.Hj)`
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
`,u=r.Ay.div``,v=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,m=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,g=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":case"paid":return"#ECFDF5";case"trial":case"pending_payment":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":case"paid":return"#059669";case"trial":case"pending_payment":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,j=r.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,f=r.Ay.div`
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
`,y=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,_=r.Ay.div`
  text-align: center;
  padding: 60px 40px;
  color: ${i.w.colors.text.placeholder};
`,w=r.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,b=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: ${i.w.colors.text.muted};
  margin-bottom: 8px;
`,S=r.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,A=r.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,B=()=>{var e,n,t,i;const{user:r}=(0,s.As)(),B=localStorage.getItem("auth_token"),C=(null===r||void 0===r?void 0:r.foodcourt_id)||null,F="MYR",[z,$]=(0,o.useState)([]),[k,E]=(0,o.useState)(!0),[D,W]=(0,o.useState)(""),[P,R]=(0,o.useState)("all"),[T,L]=(0,o.useState)([]),[N,M]=(0,o.useState)(!1),[I,O]=(0,o.useState)(null),[U,H]=(0,o.useState)(""),[Q,J]=(0,o.useState)(!1),[X,Y]=(0,o.useState)(null),[Z,K]=(0,o.useState)(!1),[V,q]=(0,o.useState)(null),[G,ee]=(0,o.useState)({discount_type:"none",discount_value:0,discount_reason:""}),[ne,te]=(0,o.useState)(!1),[ie,oe]=(0,o.useState)(null),[re,se]=(0,o.useState)(null),le=(0,o.useCallback)(async()=>{if(C){E(!0);try{const e=B?{Authorization:`Bearer ${B}`}:{},n=await fetch(`/api/foodcourts/${C}/subscriptions`,{headers:e});if(n.ok){const e=await n.json();$(e.success?e.data:Array.isArray(e)?e:[])}}catch(e){console.error("Error fetching subscriptions:",e),$([])}finally{E(!1)}}},[C,B]),ae=(0,o.useCallback)(async()=>{if(C)try{const e=B?{Authorization:`Bearer ${B}`}:{},n=await fetch(`/api/foodcourts/${C}/plans`,{headers:e});if(n.ok){const e=await n.json(),t=e.success?e.data:Array.isArray(e)?e:[];L(t.filter(e=>e.is_active))}}catch(e){console.error("Error fetching foodcourt plans:",e)}},[C,B]);(0,o.useEffect)(()=>{le(),ae()},[le,ae]);const de=z.filter(e=>{var n;const t=e.restaurant_name.toLowerCase().includes(D.toLowerCase())||e.restaurant_email.toLowerCase().includes(D.toLowerCase())||((null===(n=e.plan)||void 0===n?void 0:n.name)||"").toLowerCase().includes(D.toLowerCase());return"all"===P?t:"assigned"===P?t&&null!==e.plan:"unassigned"===P?t&&null===e.plan:"active"===P?t&&"active"===e.restaurant_status:"overdue"===P?t&&"overdue"===e.restaurant_status:t}),ce=z.length,pe=z.filter(e=>null!==e.plan).length,xe=z.filter(e=>null===e.plan).length,he=z.reduce((e,n)=>{var t,i;return e+((null===(t=n.current_month)||void 0===t||null===(i=t.estimated_charges)||void 0===i?void 0:i.totalAmount)||0)},0),ue=e=>{var n,t,i;q(e),ee({discount_type:(null===(n=e.plan)||void 0===n?void 0:n.discount_type)||"none",discount_value:(null===(t=e.plan)||void 0===t?void 0:t.discount_value)||0,discount_reason:(null===(i=e.plan)||void 0===i?void 0:i.discount_reason)||""}),K(!0)};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(c.mc,{children:[(0,p.jsxs)(c.Y9,{children:[(0,p.jsx)(c.hE,{children:"Subscriptions"}),(0,p.jsx)(c.ex,{children:(0,p.jsx)(a.cc,{variant:"outline",onClick:()=>{const e=[["Tenant","Email","Status","Plan","Management Fee","Revenue Share %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];z.forEach(n=>{var t,i,o,r,s,l,a,d,c;e.push([`"${n.restaurant_name}"`,`"${n.restaurant_email}"`,n.restaurant_status,`"${(null===(t=n.plan)||void 0===t?void 0:t.name)||"Not Assigned"}"`,(null===(i=n.plan)||void 0===i?void 0:i.subscription_fee)||"0",(null===(o=n.plan)||void 0===o?void 0:o.revenue_percentage)||"0",(null===(r=n.plan)||void 0===r?void 0:r.billing_cycle)||"-",(null===(s=n.latest_invoice)||void 0===s?void 0:s.invoice_number)||"-",(null===(l=n.latest_invoice)||void 0===l?void 0:l.status)||"-",(null===(a=n.current_month)||void 0===a||null===(d=a.estimated_charges)||void 0===d||null===(c=d.totalAmount)||void 0===c?void 0:c.toString())||"0"].join(","))});const n=new Blob([e.join("\n")],{type:"text/csv"}),t=window.URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download=`foodcourt-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(t),document.body.removeChild(i)},children:"Export"})})]}),(0,p.jsxs)(c.UC,{children:[(0,p.jsxs)(c.MD,{children:[(0,p.jsxs)(c.hI,{color:"#059669",children:[(0,p.jsx)(c.Os,{children:ce}),(0,p.jsx)(c.v0,{children:"Total Tenants"}),(0,p.jsx)(c.d1,{children:"In your foodcourt"})]}),(0,p.jsxs)(c.hI,{color:"#2563EB",children:[(0,p.jsx)(c.Os,{children:pe}),(0,p.jsx)(c.v0,{children:"Plan Assigned"}),(0,p.jsxs)(c.d1,{children:[ce>0?Math.round(pe/ce*100):0,"% covered"]})]}),(0,p.jsxs)(c.hI,{color:"#7C3AED",children:[(0,p.jsx)(c.Os,{children:xe}),(0,p.jsx)(c.v0,{children:"No Plan"}),(0,p.jsx)(c.d1,{children:"Need plan assignment"})]}),(0,p.jsxs)(c.hI,{color:"#D97706",children:[(0,p.jsx)(c.Os,{children:(0,l.vv)(he,F)}),(0,p.jsx)(c.v0,{children:"Est. Monthly Charges"}),(0,p.jsx)(c.d1,{children:"From all tenants"})]})]}),(0,p.jsxs)(d.Qn,{children:[(0,p.jsx)(d.DO,{placeholder:"Search tenants or plans...",value:D,onChange:e=>W(e.target.value)}),(0,p.jsxs)(d.Jt,{value:P,onChange:e=>R(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Tenants"}),(0,p.jsx)("option",{value:"assigned",children:"Plan Assigned"}),(0,p.jsx)("option",{value:"unassigned",children:"No Plan"}),(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"overdue",children:"Overdue"})]})]}),k?(0,p.jsx)(A,{children:"Loading subscription data..."}):0===de.length?(0,p.jsxs)(_,{children:[(0,p.jsx)(w,{children:"\ud83d\udccb"}),(0,p.jsx)(b,{children:0===z.length?"No Tenants":"No Results"}),(0,p.jsx)(S,{children:0===z.length?"No tenants are assigned to this foodcourt yet.":"No tenants match your search criteria."})]}):(0,p.jsxs)(c.XI,{children:[(0,p.jsxs)(x,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,p.jsx)("span",{children:"Tenant"}),(0,p.jsx)("span",{children:"Plan"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Est. Charges"}),(0,p.jsx)("span",{children:"Latest Invoice"}),(0,p.jsx)("span",{children:"Revenue (MTD)"}),(0,p.jsx)("span",{children:"Actions"})]}),de.map(e=>{var n,t,i;return(0,p.jsxs)(h,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,p.jsxs)(c.Np,{children:[(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Tenant"}),(0,p.jsxs)(u,{children:[(0,p.jsx)(v,{children:e.restaurant_name}),(0,p.jsx)(m,{children:e.restaurant_email})]})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Plan"}),e.plan?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:e.plan.name}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[e.plan.discount_type&&"none"!==e.plan.discount_type&&(e.plan.discount_value||0)>0?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("span",{style:{textDecoration:"line-through",color:"#9CA3AF"},children:(0,l.vv)(parseFloat(e.plan.subscription_fee)||0,F)})," ",(0,p.jsxs)("span",{style:{color:"#15803D",fontWeight:600},children:[(0,l.vv)("percentage"===e.plan.discount_type?(parseFloat(e.plan.subscription_fee)||0)*(1-(e.plan.discount_value||0)/100):Math.max(0,(parseFloat(e.plan.subscription_fee)||0)-(e.plan.discount_value||0)),F),"/mo"]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,l.vv)(parseFloat(e.plan.subscription_fee)||0,F),"/mo"]}),parseFloat(e.plan.revenue_percentage)>0&&` + ${e.plan.revenue_percentage}%`]})]}):(0,p.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Status"}),(0,p.jsx)(g,{status:e.restaurant_status,children:e.restaurant_status.charAt(0).toUpperCase()+e.restaurant_status.slice(1)})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Est. Charges"}),null!==(n=e.current_month)&&void 0!==n&&n.estimated_charges?(0,p.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,l.vv)(e.current_month.estimated_charges.totalAmount,F)}):(0,p.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Latest Invoice"}),e.latest_invoice?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:e.latest_invoice.invoice_number}),(0,p.jsx)(g,{status:e.latest_invoice.status,children:e.latest_invoice.status.replace("_"," ")})]}):(0,p.jsx)("span",{style:{color:"#9CA3AF"},children:"No invoice"})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Revenue (MTD)"}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,l.vv)((null===(t=e.current_month)||void 0===t?void 0:t.revenue)||0,F)}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(i=e.current_month)||void 0===i?void 0:i.order_count)||0," orders"]})]})]})]}),(0,p.jsxs)(c.wr,{children:[(0,p.jsx)(c.rA,{onClick:()=>(e=>{Y(e),J(!0)})(e),children:"View"}),(0,p.jsx)(c.rA,{onClick:()=>(e=>{var n;O(e),H((null===(n=e.plan)||void 0===n?void 0:n.id)||""),M(!0)})(e),children:e.plan?"Change":"Assign"}),e.plan&&(0,p.jsx)(c.K0,{onClick:()=>(e=>{oe(e),se("unassign"),te(!0)})(e),title:"Remove plan assignment",children:(0,p.jsx)(j,{children:"\u2715"})})]})]},e.restaurant_id)})]}),N&&I&&(0,p.jsx)(c.mH,{show:N,onClick:()=>M(!1),children:(0,p.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:I.plan?"Change Plan":"Assign Plan"}),(0,p.jsx)(c.Jn,{onClick:()=>M(!1),children:"\xd7"})]}),(0,p.jsx)(c.cw,{children:(0,p.jsxs)(y,{children:[(0,p.jsxs)(c.gE,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(c.lR,{children:"Tenant"}),(0,p.jsx)(c.ZQ,{type:"text",value:I.restaurant_name,disabled:!0})]}),I.plan&&(0,p.jsxs)(c.gE,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(c.lR,{children:"Current Plan"}),(0,p.jsxs)("div",{style:{padding:"12px",background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[I.plan.name," \u2014 ",(0,l.vv)(parseFloat(I.plan.subscription_fee)||0,F),"/mo",parseFloat(I.plan.revenue_percentage)>0&&` + ${I.plan.revenue_percentage}% revenue share`]})]}),(0,p.jsxs)(c.gE,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(c.lR,{children:"Select Plan *"}),(0,p.jsxs)(c.FX,{value:U,onChange:e=>H(e.target.value?parseInt(e.target.value):""),children:[(0,p.jsx)("option",{value:"",children:"Select a plan..."}),T.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.name," \u2014 ",(0,l.vv)(parseFloat(e.subscription_fee)||0,F),"/mo",parseFloat(e.revenue_percentage)>0&&` + ${e.revenue_percentage}%`]},e.id))]}),0===T.length&&(0,p.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),U&&(()=>{const e=T.find(e=>e.id===U);return e?(0,p.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,p.jsx)("strong",{children:"Plan Summary:"})}),(0,p.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e.name}),(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Management Fee: ",(0,l.vv)(parseFloat(e.subscription_fee)||0,F),"/mo",parseFloat(e.revenue_percentage)>0&&` | Revenue Share: ${e.revenue_percentage}%`,"none"!==e.rent_type&&` | Rent: ${e.rent_type}`,` | Billing: ${e.billing_cycle}`]})]}):null})()]})}),(0,p.jsxs)(c.jl,{children:[(0,p.jsx)(a.cc,{variant:"cancel",onClick:()=>M(!1),children:"Cancel"}),(0,p.jsx)(a.cc,{variant:"primary",onClick:async()=>{if(C&&I&&U)try{const e={"Content-Type":"application/json",...B?{Authorization:`Bearer ${B}`}:{}},n=await fetch(`/api/foodcourts/${C}/plans/${U}/restaurants`,{method:"POST",headers:e,body:JSON.stringify({restaurant_ids:[I.restaurant_id]})});if(n.ok)M(!1),O(null),H(""),le();else{const e=await n.json();console.error("Failed to assign plan:",e)}}catch(e){console.error("Error assigning plan:",e)}},disabled:!U||0===T.length,children:I.plan?"Change Plan":"Assign Plan"})]})]})}),Q&&X&&(0,p.jsx)(c.mH,{show:Q,onClick:()=>J(!1),children:(0,p.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:"Subscription Details"}),(0,p.jsx)(c.Jn,{onClick:()=>J(!1),children:"\xd7"})]}),(0,p.jsx)(c.cw,{children:(0,p.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Tenant"}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Name"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:X.restaurant_name})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Email"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:X.restaurant_email})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,p.jsx)(g,{status:X.restaurant_status,children:X.restaurant_status.charAt(0).toUpperCase()+X.restaurant_status.slice(1)})]})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Plan"}),(0,p.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:X.plan?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Name"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:X.plan.name})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Management Fee"}),X.plan.discount_type&&"none"!==X.plan.discount_type&&(X.plan.discount_value||0)>0?(0,p.jsxs)("div",{children:[(0,p.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:[(0,l.vv)(parseFloat(X.plan.subscription_fee)||0,F),"/mo"]}),(0,p.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:[(0,l.vv)("percentage"===X.plan.discount_type?(parseFloat(X.plan.subscription_fee)||0)*(1-(X.plan.discount_value||0)/100):Math.max(0,(parseFloat(X.plan.subscription_fee)||0)-(X.plan.discount_value||0)),F),"/mo",(0,p.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===X.plan.discount_type?`${X.plan.discount_value}%`:(0,l.vv)(X.plan.discount_value||0,F),")"]})]})]}):(0,p.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,l.vv)(parseFloat(X.plan.subscription_fee)||0,F),"/mo"]})]}),parseFloat(X.plan.revenue_percentage)>0&&(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue Share"}),(0,p.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[X.plan.revenue_percentage,"%"]})]}),"none"!==X.plan.rent_type&&(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Rent"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===X.plan.rent_type?(0,l.vv)(parseFloat(X.plan.rent_fixed||"0"),F):"percentage"===X.plan.rent_type?`${X.plan.rent_percentage}%`:`MAX(${(0,l.vv)(parseFloat(X.plan.rent_fixed||"0"),F)}, ${X.plan.rent_percentage}%)`})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:X.plan.billing_cycle})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Activation Date"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(X.plan.activation_date).toLocaleDateString()})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Discount"}),X.plan.discount_type&&"none"!==X.plan.discount_type&&(X.plan.discount_value||0)>0?(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsxs)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:["percentage"===X.plan.discount_type?`${X.plan.discount_value}%`:`${(0,l.vv)(X.plan.discount_value||0,F)}`,X.plan.discount_reason?` (${X.plan.discount_reason})`:""]}),(0,p.jsx)("button",{onClick:()=>ue(X),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"2px 8px",fontSize:"11px",color:"#6B7280",cursor:"pointer"},children:"Edit"})]}):(0,p.jsx)("button",{onClick:()=>ue(X),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"4px 12px",fontSize:"12px",color:"#635BFF",cursor:"pointer",fontWeight:"500"},children:"Set Discount"})]})]}):(0,p.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:"No plan assigned to this tenant."})})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Current Month"}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,l.vv)((null===(e=X.current_month)||void 0===e?void 0:e.revenue)||0,F)})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Orders"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(n=X.current_month)||void 0===n?void 0:n.order_count)||0})]}),(null===(t=X.current_month)||void 0===t?void 0:t.estimated_charges)&&(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Estimated Charges Breakdown"}),X.current_month.estimated_charges.items.map((e,n)=>(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,p.jsx)("span",{style:{color:"#374151"},children:e.description}),(0,p.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,l.vv)(e.total_amount,F)})]},n)),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,p.jsx)("span",{style:{color:"#0A2540"},children:"Total"}),(0,p.jsx)("span",{style:{color:"#0A2540"},children:(0,l.vv)(X.current_month.estimated_charges.totalAmount,F)})]})]})})]})]}),X.latest_invoice&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Latest Invoice"}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Invoice Number"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:X.latest_invoice.invoice_number})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Amount"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,l.vv)(parseFloat(X.latest_invoice.total_amount)||0,F)})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,p.jsx)(g,{status:X.latest_invoice.status,children:X.latest_invoice.status.replace("_"," ")})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Due Date"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(X.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),(0,p.jsx)(c.jl,{children:(0,p.jsx)(a.cc,{variant:"primary",onClick:()=>J(!1),children:"Close"})})]})}),ne&&ie&&(0,p.jsx)(c.mH,{show:ne,onClick:()=>te(!1),children:(0,p.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:"Confirm Action"}),(0,p.jsx)(c.Jn,{onClick:()=>te(!1),children:"\xd7"})]}),(0,p.jsx)(c.cw,{children:(0,p.jsx)("p",{children:"unassign"===re&&`Are you sure you want to remove the plan "${null===(i=ie.plan)||void 0===i?void 0:i.name}" from ${ie.restaurant_name}?`})}),(0,p.jsxs)(c.jl,{children:[(0,p.jsx)(a.cc,{variant:"cancel",onClick:()=>te(!1),children:"Cancel"}),(0,p.jsx)(a.cc,{variant:"danger",onClick:async()=>{if(C&&ie&&re)try{const e={...B?{Authorization:`Bearer ${B}`}:{}};if("unassign"===re&&ie.plan){const n=await fetch(`/api/foodcourts/${C}/plans/${ie.plan.id}/restaurants/${ie.restaurant_id}`,{method:"DELETE",headers:e});if(!n.ok){const e=await n.json();console.error("Failed to unassign:",e)}}te(!1),oe(null),se(null),le()}catch(e){console.error("Action failed:",e)}},children:"Remove Plan"})]})]})}),Z&&V&&(0,p.jsx)(c.mH,{show:Z,onClick:()=>K(!1),children:(0,p.jsxs)(f,{onClick:e=>e.stopPropagation(),style:{maxWidth:"480px"},children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsxs)(c.wt,{children:["Set Discount - ",V.restaurant_name]}),(0,p.jsx)(c.Jn,{onClick:()=>K(!1),children:"\xd7"})]}),(0,p.jsx)(c.cw,{children:(0,p.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Discount Type"}),(0,p.jsxs)(c.FX,{value:G.discount_type,onChange:e=>ee({...G,discount_type:e.target.value,discount_value:"none"===e.target.value?0:G.discount_value}),children:[(0,p.jsx)("option",{value:"none",children:"None"}),(0,p.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,p.jsxs)("option",{value:"fixed",children:["Fixed Amount (",F,")"]})]})]}),"none"!==G.discount_type&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"percentage"===G.discount_type?"Discount Rate (%)":`Discount Amount (${F})`}),(0,p.jsx)(c.ZQ,{type:"number",step:"percentage"===G.discount_type?"1":"0.01",min:"0",max:"percentage"===G.discount_type?"100":void 0,value:G.discount_value,onChange:e=>ee({...G,discount_value:parseFloat(e.target.value)||0}),placeholder:"percentage"===G.discount_type?"e.g. 10":"e.g. 50.00"})]}),"none"!==G.discount_type&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Reason (optional)"}),(0,p.jsx)(c.ZQ,{type:"text",value:G.discount_reason,onChange:e=>ee({...G,discount_reason:e.target.value}),placeholder:"e.g. Opening promotion"})]}),"none"!==G.discount_type&&G.discount_value>0&&V.plan&&(0,p.jsxs)("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:"Preview"}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#15803D"},children:"percentage"===G.discount_type?`${G.discount_value}% off all charges`:`${(0,l.vv)(G.discount_value,F)} off total`})]})]})}),(0,p.jsxs)(c.jl,{children:[(0,p.jsx)(a.cc,{variant:"cancel",onClick:()=>K(!1),children:"Cancel"}),(0,p.jsx)(a.cc,{variant:"primary",onClick:async()=>{if(V&&V.plan&&C)try{const e={"Content-Type":"application/json",...B?{Authorization:`Bearer ${B}`}:{}};(await fetch(`/api/foodcourts/${C}/plans/${V.plan.id}/restaurants/${V.restaurant_id}/discount`,{method:"PUT",headers:e,body:JSON.stringify(G)})).ok&&(K(!1),q(null),le())}catch(e){console.error("Failed to save discount:",e)}},disabled:"none"!==G.discount_type&&!G.discount_value,children:"Save Discount"})]})]})})]})]})})}},3705:(e,n,t)=>{t.d(n,{cc:()=>r.$n});var i=t(8819),o=t(4752),r=t(8829);o.Ay.select`
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
`,o.Ay.input`
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
`,o.Ay.div`
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
`}}]);