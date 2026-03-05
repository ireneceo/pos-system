"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2890],{2488:(e,n,t)=>{t.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>c});t(9950);var i=t(4752),o=t(4414);const r=i.Ay.div`
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
`,c=e=>{let{children:n,className:t,style:i,...s}=e;return(0,o.jsx)(r,{className:t,style:i,...s,children:n})},p=e=>{let{placeholder:n="Search...",value:t,onChange:i,style:r,...d}=e;return(0,o.jsxs)(a,{style:r,children:[(0,o.jsx)(s,{placeholder:n,value:t,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:t?"36px":"16px"},...d}),t&&(0,o.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,o.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...t}=e;return(0,o.jsx)(d,{...t,children:n})}},2890:(e,n,t)=>{t.r(n),t.d(n,{default:()=>P});var i=t(9950),o=t(4752),r=t(2853),s=t(1367),a=t(6038),l=t(3705),d=t(2488),c=t(8409),p=t(4414);const x=(0,o.Ay)(c.A0)`
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
`,h=(0,o.Ay)(c.Hj)`
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
`,u=o.Ay.div``,v=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,g=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,m=o.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":case"paid":return"#ECFDF5";case"trial":case"pending_payment":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":case"paid":return"#059669";case"trial":case"pending_payment":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,j=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,f=o.Ay.div`
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
`,y=o.Ay.div`
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
`,b=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,_=o.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,w=o.Ay.button`
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
`,F=o.Ay.div`
  padding: 24px;
`,B=o.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,A=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,C=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,S=o.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,k=o.Ay.input`
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
`,z=o.Ay.select`
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
`,E=o.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,D=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,$=o.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,W=o.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,P=()=>{var e,n,t,o;const{user:P}=(0,s.As)(),R=localStorage.getItem("auth_token"),T=(null===P||void 0===P?void 0:P.foodcourt_id)||null,L="MYR",[N,I]=(0,i.useState)([]),[M,O]=(0,i.useState)(!0),[U,Y]=(0,i.useState)(""),[J,Q]=(0,i.useState)("all"),[X,H]=(0,i.useState)([]),[K,V]=(0,i.useState)(!1),[q,G]=(0,i.useState)(null),[Z,ee]=(0,i.useState)(""),[ne,te]=(0,i.useState)(null),[ie,oe]=(0,i.useState)(!1),[re,se]=(0,i.useState)(null),[ae,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(null),[pe,xe]=(0,i.useState)({discount_type:"none",discount_value:0,discount_reason:""}),[he,ue]=(0,i.useState)(!1),[ve,ge]=(0,i.useState)(null),[me,je]=(0,i.useState)(null),fe=(0,i.useCallback)(async()=>{if(T){O(!0);try{const e=R?{Authorization:`Bearer ${R}`}:{},n=await fetch(`/api/foodcourts/${T}/subscriptions`,{headers:e});if(n.ok){const e=await n.json();I(e.success?e.data:Array.isArray(e)?e:[])}}catch(e){console.error("Error fetching subscriptions:",e),I([])}finally{O(!1)}}},[T,R]),ye=(0,i.useCallback)(async()=>{if(T)try{const e=R?{Authorization:`Bearer ${R}`}:{},n=await fetch(`/api/foodcourts/${T}/plans`,{headers:e});if(n.ok){const e=await n.json(),t=e.success?e.data:Array.isArray(e)?e:[];H(t.filter(e=>e.is_active))}}catch(e){console.error("Error fetching foodcourt plans:",e)}},[T,R]);(0,i.useEffect)(()=>{fe(),ye()},[fe,ye]);const be=N.filter(e=>{var n;const t=e.restaurant_name.toLowerCase().includes(U.toLowerCase())||e.restaurant_email.toLowerCase().includes(U.toLowerCase())||((null===(n=e.plan)||void 0===n?void 0:n.name)||"").toLowerCase().includes(U.toLowerCase());return"all"===J?t:"assigned"===J?t&&null!==e.plan:"unassigned"===J?t&&null===e.plan:"active"===J?t&&"active"===e.restaurant_status:"overdue"===J?t&&"overdue"===e.restaurant_status:t}),_e=N.length,we=N.filter(e=>null!==e.plan).length,Fe=N.filter(e=>null===e.plan).length,Be=N.reduce((e,n)=>{var t,i;return e+((null===(t=n.current_month)||void 0===t||null===(i=t.estimated_charges)||void 0===i?void 0:i.totalAmount)||0)},0),Ae=e=>{var n,t,i;ce(e),xe({discount_type:(null===(n=e.plan)||void 0===n?void 0:n.discount_type)||"none",discount_value:(null===(t=e.plan)||void 0===t?void 0:t.discount_value)||0,discount_reason:(null===(i=e.plan)||void 0===i?void 0:i.discount_reason)||""}),le(!0)};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(c.mc,{children:[(0,p.jsxs)(c.Y9,{children:[(0,p.jsx)(c.hE,{children:"Subscriptions"}),(0,p.jsx)(c.ex,{children:(0,p.jsx)(l.cc,{variant:"outline",onClick:()=>{const e=[["Tenant","Email","Status","Plan","Management Fee","Revenue Share %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];N.forEach(n=>{var t,i,o,r,s,a,l,d,c;e.push([`"${n.restaurant_name}"`,`"${n.restaurant_email}"`,n.restaurant_status,`"${(null===(t=n.plan)||void 0===t?void 0:t.name)||"Not Assigned"}"`,(null===(i=n.plan)||void 0===i?void 0:i.subscription_fee)||"0",(null===(o=n.plan)||void 0===o?void 0:o.revenue_percentage)||"0",(null===(r=n.plan)||void 0===r?void 0:r.billing_cycle)||"-",(null===(s=n.latest_invoice)||void 0===s?void 0:s.invoice_number)||"-",(null===(a=n.latest_invoice)||void 0===a?void 0:a.status)||"-",(null===(l=n.current_month)||void 0===l||null===(d=l.estimated_charges)||void 0===d||null===(c=d.totalAmount)||void 0===c?void 0:c.toString())||"0"].join(","))});const n=new Blob([e.join("\n")],{type:"text/csv"}),t=window.URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download=`foodcourt-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(t),document.body.removeChild(i)},children:"Export"})})]}),(0,p.jsxs)(c.UC,{children:[(0,p.jsxs)(c.MD,{children:[(0,p.jsxs)(c.hI,{color:"#059669",children:[(0,p.jsx)(c.Os,{children:_e}),(0,p.jsx)(c.v0,{children:"Total Tenants"}),(0,p.jsx)(c.d1,{children:"In your foodcourt"})]}),(0,p.jsxs)(c.hI,{color:"#2563EB",children:[(0,p.jsx)(c.Os,{children:we}),(0,p.jsx)(c.v0,{children:"Plan Assigned"}),(0,p.jsxs)(c.d1,{children:[_e>0?Math.round(we/_e*100):0,"% covered"]})]}),(0,p.jsxs)(c.hI,{color:"#7C3AED",children:[(0,p.jsx)(c.Os,{children:Fe}),(0,p.jsx)(c.v0,{children:"No Plan"}),(0,p.jsx)(c.d1,{children:"Need plan assignment"})]}),(0,p.jsxs)(c.hI,{color:"#D97706",children:[(0,p.jsx)(c.Os,{children:(0,a.vv)(Be,L)}),(0,p.jsx)(c.v0,{children:"Est. Monthly Charges"}),(0,p.jsx)(c.d1,{children:"From all tenants"})]})]}),(0,p.jsxs)(d.Qn,{children:[(0,p.jsxs)(d.Jt,{value:J,onChange:e=>Q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Tenants"}),(0,p.jsx)("option",{value:"assigned",children:"Plan Assigned"}),(0,p.jsx)("option",{value:"unassigned",children:"No Plan"}),(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"overdue",children:"Overdue"})]}),(0,p.jsx)(d.DO,{placeholder:"Search tenants or plans...",value:U,onChange:e=>Y(e.target.value)})]}),M?(0,p.jsx)(W,{children:"Loading subscription data..."}):0===be.length?(0,p.jsxs)(r.pp,{children:[(0,p.jsx)(E,{children:"\ud83d\udccb"}),(0,p.jsx)(D,{children:0===N.length?"No Tenants":"No Results"}),(0,p.jsx)($,{children:0===N.length?"No tenants are assigned to this foodcourt yet.":"No tenants match your search criteria."})]}):(0,p.jsxs)(p.Fragment,{children:[ne&&(0,p.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,p.jsx)("span",{style:{fontSize:"13px",color:"#92400E"},children:ne}),(0,p.jsx)("button",{onClick:()=>te(null),style:{background:"none",border:"none",color:"#92400E",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"\xd7"})]}),(0,p.jsxs)(c.XI,{children:[(0,p.jsxs)(x,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,p.jsx)("span",{children:"Tenant"}),(0,p.jsx)("span",{children:"Plan"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Est. Charges"}),(0,p.jsx)("span",{children:"Latest Invoice"}),(0,p.jsx)("span",{children:"Revenue (MTD)"}),(0,p.jsx)("span",{children:"Actions"})]}),be.map(e=>{var n,t,i;return(0,p.jsxs)(h,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,p.jsxs)(c.Np,{children:[(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Tenant"}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(v,{children:[e.restaurant_name," ",e.restaurant_currency&&(0,p.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e.restaurant_currency})]}),(0,p.jsx)(g,{children:e.restaurant_email})]})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Plan"}),e.plan?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:e.plan.name}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[e.plan.discount_type&&"none"!==e.plan.discount_type&&(e.plan.discount_value||0)>0?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("span",{style:{textDecoration:"line-through",color:"#9CA3AF"},children:(0,a.vv)(parseFloat(e.plan.subscription_fee)||0,L)})," ",(0,p.jsxs)("span",{style:{color:"#15803D",fontWeight:600},children:[(0,a.vv)("percentage"===e.plan.discount_type?(parseFloat(e.plan.subscription_fee)||0)*(1-(e.plan.discount_value||0)/100):Math.max(0,(parseFloat(e.plan.subscription_fee)||0)-(e.plan.discount_value||0)),L),"/mo"]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,a.vv)(parseFloat(e.plan.subscription_fee)||0,L),"/mo"]}),parseFloat(e.plan.revenue_percentage)>0&&` + ${e.plan.revenue_percentage}%`]})]}):(0,p.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Status"}),(0,p.jsx)(m,{status:e.restaurant_status,children:e.restaurant_status.charAt(0).toUpperCase()+e.restaurant_status.slice(1)})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Est. Charges"}),null!==(n=e.current_month)&&void 0!==n&&n.estimated_charges?(0,p.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(e.current_month.estimated_charges.totalAmount,L)}):(0,p.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Latest Invoice"}),e.latest_invoice?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:e.latest_invoice.invoice_number}),(0,p.jsx)(m,{status:e.latest_invoice.status,children:e.latest_invoice.status.replace("_"," ")})]}):(0,p.jsx)("span",{style:{color:"#9CA3AF"},children:"No invoice"})]}),(0,p.jsxs)(c.Uj,{children:[(0,p.jsx)(c.PM,{children:"Revenue (MTD)"}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)((null===(t=e.current_month)||void 0===t?void 0:t.revenue)||0,L)}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(i=e.current_month)||void 0===i?void 0:i.order_count)||0," orders"]})]})]})]}),(0,p.jsxs)(c.wr,{children:[(0,p.jsx)(c.rA,{onClick:()=>(e=>{se(e),oe(!0)})(e),children:"View"}),(0,p.jsx)(c.rA,{onClick:()=>(e=>{var n;G(e),ee((null===(n=e.plan)||void 0===n?void 0:n.id)||""),V(!0)})(e),children:e.plan?"Change":"Assign"}),e.plan&&(0,p.jsx)(c.K0,{onClick:()=>(e=>{ge(e),je("unassign"),ue(!0)})(e),title:"Remove plan assignment",children:(0,p.jsx)(j,{children:"\u2715"})})]})]},e.restaurant_id)})]})]}),K&&q&&(0,p.jsx)(f,{show:K,onClick:()=>V(!1),children:(0,p.jsxs)(y,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(_,{children:q.plan?"Change Plan":"Assign Plan"}),(0,p.jsx)(w,{onClick:()=>V(!1),children:"\xd7"})]}),(0,p.jsx)(F,{children:(0,p.jsxs)(A,{children:[(0,p.jsxs)(C,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(S,{children:"Tenant"}),(0,p.jsx)(k,{type:"text",value:q.restaurant_name,disabled:!0})]}),q.plan&&(0,p.jsxs)(C,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(S,{children:"Current Plan"}),(0,p.jsxs)("div",{style:{padding:"12px",background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[q.plan.name," \u2014 ",(0,a.vv)(parseFloat(q.plan.subscription_fee)||0,L),"/mo",parseFloat(q.plan.revenue_percentage)>0&&` + ${q.plan.revenue_percentage}% revenue share`]})]}),(0,p.jsxs)(C,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(S,{children:"Select Plan *"}),(0,p.jsxs)(z,{value:Z,onChange:e=>ee(e.target.value?parseInt(e.target.value):""),children:[(0,p.jsx)("option",{value:"",children:"Select a plan..."}),X.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.name," \u2014 ",(0,a.vv)(parseFloat(e.subscription_fee)||0,L),"/mo",parseFloat(e.revenue_percentage)>0&&` + ${e.revenue_percentage}%`]},e.id))]}),0===X.length&&(0,p.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),Z&&(()=>{const e=X.find(e=>e.id===Z);return e?(0,p.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,p.jsx)("strong",{children:"Plan Summary:"})}),(0,p.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e.name}),(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Management Fee: ",(0,a.vv)(parseFloat(e.subscription_fee)||0,L),"/mo",parseFloat(e.revenue_percentage)>0&&` | Revenue Share: ${e.revenue_percentage}%`,"none"!==e.rent_type&&` | Rent: ${e.rent_type}`,` | Billing: ${e.billing_cycle}`]})]}):null})()]})}),(0,p.jsxs)(B,{children:[(0,p.jsx)(l.cc,{variant:"cancel",onClick:()=>V(!1),children:"Cancel"}),(0,p.jsx)(l.cc,{variant:"primary",onClick:async()=>{if(T&&q&&Z)try{const e={"Content-Type":"application/json",...R?{Authorization:`Bearer ${R}`}:{}},n=await fetch(`/api/foodcourts/${T}/plans/${Z}/restaurants`,{method:"POST",headers:e,body:JSON.stringify({restaurant_ids:[q.restaurant_id]})});if(n.ok){const e=await n.json();V(!1),G(null),ee(""),fe(),e.currency_warnings&&e.currency_warnings.length>0&&te(e.currency_warnings[0].message)}else{const e=await n.json();console.error("Failed to assign plan:",e)}}catch(e){console.error("Error assigning plan:",e)}},disabled:!Z||0===X.length,children:q.plan?"Change Plan":"Assign Plan"})]})]})}),ie&&re&&(0,p.jsx)(f,{show:ie,onClick:()=>oe(!1),children:(0,p.jsxs)(y,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(_,{children:"Subscription Details"}),(0,p.jsx)(w,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,p.jsx)(F,{children:(0,p.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Tenant"}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Name"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:re.restaurant_name})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Email"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:re.restaurant_email})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,p.jsx)(m,{status:re.restaurant_status,children:re.restaurant_status.charAt(0).toUpperCase()+re.restaurant_status.slice(1)})]})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Plan"}),(0,p.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:re.plan?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Name"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:re.plan.name})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Management Fee"}),re.plan.discount_type&&"none"!==re.plan.discount_type&&(re.plan.discount_value||0)>0?(0,p.jsxs)("div",{children:[(0,p.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:[(0,a.vv)(parseFloat(re.plan.subscription_fee)||0,L),"/mo"]}),(0,p.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:[(0,a.vv)("percentage"===re.plan.discount_type?(parseFloat(re.plan.subscription_fee)||0)*(1-(re.plan.discount_value||0)/100):Math.max(0,(parseFloat(re.plan.subscription_fee)||0)-(re.plan.discount_value||0)),L),"/mo",(0,p.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===re.plan.discount_type?`${re.plan.discount_value}%`:(0,a.vv)(re.plan.discount_value||0,L),")"]})]})]}):(0,p.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,a.vv)(parseFloat(re.plan.subscription_fee)||0,L),"/mo"]})]}),parseFloat(re.plan.revenue_percentage)>0&&(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue Share"}),(0,p.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[re.plan.revenue_percentage,"%"]})]}),"none"!==re.plan.rent_type&&(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Rent"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===re.plan.rent_type?(0,a.vv)(parseFloat(re.plan.rent_fixed||"0"),L):"percentage"===re.plan.rent_type?`${re.plan.rent_percentage}%`:`MAX(${(0,a.vv)(parseFloat(re.plan.rent_fixed||"0"),L)}, ${re.plan.rent_percentage}%)`})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:re.plan.billing_cycle})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Activation Date"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(re.plan.activation_date).toLocaleDateString()})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Discount"}),re.plan.discount_type&&"none"!==re.plan.discount_type&&(re.plan.discount_value||0)>0?(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsxs)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:["percentage"===re.plan.discount_type?`${re.plan.discount_value}%`:`${(0,a.vv)(re.plan.discount_value||0,L)}`,re.plan.discount_reason?` (${re.plan.discount_reason})`:""]}),(0,p.jsx)("button",{onClick:()=>Ae(re),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"2px 8px",fontSize:"11px",color:"#6B7280",cursor:"pointer"},children:"Edit"})]}):(0,p.jsx)("button",{onClick:()=>Ae(re),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"4px 12px",fontSize:"12px",color:"#635BFF",cursor:"pointer",fontWeight:"500"},children:"Set Discount"})]})]}):(0,p.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:"No plan assigned to this tenant."})})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Current Month"}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Revenue"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)((null===(e=re.current_month)||void 0===e?void 0:e.revenue)||0,L)})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Orders"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(n=re.current_month)||void 0===n?void 0:n.order_count)||0})]}),(null===(t=re.current_month)||void 0===t?void 0:t.estimated_charges)&&(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Estimated Charges Breakdown"}),re.current_month.estimated_charges.items.map((e,n)=>(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,p.jsx)("span",{style:{color:"#374151"},children:e.description}),(0,p.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(e.total_amount,L)})]},n)),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,p.jsx)("span",{style:{color:"#0A2540"},children:"Total"}),(0,p.jsx)("span",{style:{color:"#0A2540"},children:(0,a.vv)(re.current_month.estimated_charges.totalAmount,L)})]})]})})]})]}),re.latest_invoice&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Latest Invoice"}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Invoice Number"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:re.latest_invoice.invoice_number})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Amount"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)(parseFloat(re.latest_invoice.total_amount)||0,L)})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,p.jsx)(m,{status:re.latest_invoice.status,children:re.latest_invoice.status.replace("_"," ")})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Due Date"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(re.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),(0,p.jsx)(B,{children:(0,p.jsx)(l.cc,{variant:"primary",onClick:()=>oe(!1),children:"Close"})})]})}),he&&ve&&(0,p.jsx)(f,{show:he,onClick:()=>ue(!1),children:(0,p.jsxs)(y,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(_,{children:"Confirm Action"}),(0,p.jsx)(w,{onClick:()=>ue(!1),children:"\xd7"})]}),(0,p.jsx)(F,{children:(0,p.jsx)("p",{children:"unassign"===me&&`Are you sure you want to remove the plan "${null===(o=ve.plan)||void 0===o?void 0:o.name}" from ${ve.restaurant_name}?`})}),(0,p.jsxs)(B,{children:[(0,p.jsx)(l.cc,{variant:"cancel",onClick:()=>ue(!1),children:"Cancel"}),(0,p.jsx)(l.cc,{variant:"danger",onClick:async()=>{if(T&&ve&&me)try{const e={...R?{Authorization:`Bearer ${R}`}:{}};if("unassign"===me&&ve.plan){const n=await fetch(`/api/foodcourts/${T}/plans/${ve.plan.id}/restaurants/${ve.restaurant_id}`,{method:"DELETE",headers:e});if(!n.ok){const e=await n.json();console.error("Failed to unassign:",e)}}ue(!1),ge(null),je(null),fe()}catch(e){console.error("Action failed:",e)}},children:"Remove Plan"})]})]})}),ae&&de&&(0,p.jsx)(f,{show:ae,onClick:()=>le(!1),children:(0,p.jsxs)(y,{onClick:e=>e.stopPropagation(),style:{maxWidth:"480px"},children:[(0,p.jsxs)(b,{children:[(0,p.jsxs)(_,{children:["Set Discount - ",de.restaurant_name]}),(0,p.jsx)(w,{onClick:()=>le(!1),children:"\xd7"})]}),(0,p.jsx)(F,{children:(0,p.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Discount Type"}),(0,p.jsxs)(z,{value:pe.discount_type,onChange:e=>xe({...pe,discount_type:e.target.value,discount_value:"none"===e.target.value?0:pe.discount_value}),children:[(0,p.jsx)("option",{value:"none",children:"None"}),(0,p.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,p.jsxs)("option",{value:"fixed",children:["Fixed Amount (",L,")"]})]})]}),"none"!==pe.discount_type&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"percentage"===pe.discount_type?"Discount Rate (%)":`Discount Amount (${L})`}),(0,p.jsx)(k,{type:"number",step:"percentage"===pe.discount_type?"1":"0.01",min:"0",max:"percentage"===pe.discount_type?"100":void 0,value:pe.discount_value,onChange:e=>xe({...pe,discount_value:parseFloat(e.target.value)||0}),placeholder:"percentage"===pe.discount_type?"e.g. 10":"e.g. 50.00"})]}),"none"!==pe.discount_type&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"Reason (optional)"}),(0,p.jsx)(k,{type:"text",value:pe.discount_reason,onChange:e=>xe({...pe,discount_reason:e.target.value}),placeholder:"e.g. Opening promotion"})]}),"none"!==pe.discount_type&&pe.discount_value>0&&de.plan&&(0,p.jsxs)("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:"Preview"}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#15803D"},children:"percentage"===pe.discount_type?`${pe.discount_value}% off all charges`:`${(0,a.vv)(pe.discount_value,L)} off total`})]})]})}),(0,p.jsxs)(B,{children:[(0,p.jsx)(l.cc,{variant:"cancel",onClick:()=>le(!1),children:"Cancel"}),(0,p.jsx)(l.cc,{variant:"primary",onClick:async()=>{if(de&&de.plan&&T)try{const e={"Content-Type":"application/json",...R?{Authorization:`Bearer ${R}`}:{}};(await fetch(`/api/foodcourts/${T}/plans/${de.plan.id}/restaurants/${de.restaurant_id}/discount`,{method:"PUT",headers:e,body:JSON.stringify(pe)})).ok&&(le(!1),ce(null),fe())}catch(e){console.error("Failed to save discount:",e)}},children:"Save Discount"})]})]})})]})]})})}},3705:(e,n,t)=>{t.d(n,{cc:()=>o});var i=t(4752);const o=i.Ay.button`
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
`}}]);