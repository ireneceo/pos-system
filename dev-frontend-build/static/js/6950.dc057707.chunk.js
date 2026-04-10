"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6950],{3705:(n,e,r)=>{r.d(e,{cc:()=>i});var t=r(4752);const i=t.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${n=>{switch(n.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${n=>{switch(n.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${n=>{switch(n.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${n=>{switch(n.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;t.Ay.select`
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
`,t.Ay.input`
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
`,t.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${n=>n.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(n,e,r)=>{r.d(e,{i1:()=>o});var t=r(9950),i=r(1367),s=r(6038),a=r(9955);const o=()=>{const{user:n}=(0,i.As)(),[e,r]=(0,t.useState)("RM"),[o]=(0,t.useState)(Object.keys(s.DL)),[l,d]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const e=window.location.pathname.split("/"),t=e.indexOf("restaurant");let i=t>=0?e[t+1]:null;if(!i&&null!==n&&void 0!==n&&n.restaurant_id&&(i=n.restaurant_id.toString()),!i)return r("RM"),void d(!1);try{const n=(0,a.c4)(),e=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"}});if(e.ok){var s;const n=await e.json(),t=n.currency||(null===(s=n.operation_settings)||void 0===s?void 0:s.currency)||"MYR";r(t)}else r("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),r("MYR")}finally{d(!1)}})()},[null===n||void 0===n?void 0:n.restaurant_id]),{defaultCurrency:e,supportedCurrencies:o,loading:l,error:c}}},6950:(n,e,r)=>{r.r(e),r.d(e,{default:()=>z});var t=r(9950),i=r(4752),s=r(2853),a=r(1367),o=r(6038),l=r(4021),d=r(3705),c=r(2488),p=r(9955),u=r(8409),x=r(4414);const h=(0,i.Ay)(u.A0)`
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
`,g=(0,i.Ay)(u.Hj)`
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
`,b=i.Ay.div``,v=i.Ay.div`
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
  background: ${n=>{switch(n.status){case"active":case"paid":return"#ECFDF5";case"trial":case"pending_payment":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${n=>{switch(n.status){case"active":case"paid":return"#059669";case"trial":case"pending_payment":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,f=i.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,y=i.Ay.div`
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
`,_=i.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,F=i.Ay.input`
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
`,B=i.Ay.select`
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
`,A=i.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,C=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,P=i.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,w=i.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,z=()=>{var n,e,r,i;const{t:z}=useTranslation("brand"),{user:E}=(0,a.As)(),{defaultCurrency:k}=(0,l.i1)(),$=k||"MYR",D=(0,p.c4)(),W=(null===E||void 0===E?void 0:E.brand_id)||null,[R,T]=(0,t.useState)([]),[M,N]=(0,t.useState)(!0),[O,L]=(0,t.useState)(""),[I,U]=(0,t.useState)("all"),[Y,J]=(0,t.useState)([]),[Q,X]=(0,t.useState)(!1),[H,K]=(0,t.useState)(null),[q,G]=(0,t.useState)(""),[V,Z]=(0,t.useState)(null),[nn,en]=(0,t.useState)(!1),[rn,tn]=(0,t.useState)(null),[sn,an]=(0,t.useState)(!1),[on,ln]=(0,t.useState)(null),[dn,cn]=(0,t.useState)({discount_type:"none",discount_value:0,discount_reason:""}),[pn,un]=(0,t.useState)(!1),[xn,hn]=(0,t.useState)(null),[gn,bn]=(0,t.useState)(null),vn=(0,t.useCallback)(async()=>{if(W){N(!0);try{const n=D?{Authorization:`Bearer ${D}`}:{},e=await fetch(`/api/brands/${W}/subscriptions`,{headers:n});if(e.ok){const n=await e.json();T(n.success?n.data:Array.isArray(n)?n:[])}}catch(n){console.error("Error fetching subscriptions:",n),T([])}finally{N(!1)}}},[W,D]),mn=(0,t.useCallback)(async()=>{if(W)try{const n=D?{Authorization:`Bearer ${D}`}:{},e=await fetch(`/api/brands/${W}/plans`,{headers:n});if(e.ok){const n=await e.json(),r=n.success?n.data:Array.isArray(n)?n:[];J(r.filter(n=>n.is_active))}}catch(n){console.error("Error fetching brand plans:",n)}},[W,D]);(0,t.useEffect)(()=>{vn(),mn()},[vn,mn]);const jn=R.filter(n=>{var e;const r=n.restaurant_name.toLowerCase().includes(O.toLowerCase())||n.restaurant_email.toLowerCase().includes(O.toLowerCase())||((null===(e=n.plan)||void 0===e?void 0:e.name)||"").toLowerCase().includes(O.toLowerCase());return"all"===I?r:"assigned"===I?r&&null!==n.plan:"unassigned"===I?r&&null===n.plan:"active"===I?r&&"active"===n.restaurant_status:"overdue"===I?r&&"overdue"===n.restaurant_status:r}),fn=R.length,yn=R.filter(n=>null!==n.plan).length,Sn=R.filter(n=>null===n.plan).length,_n=R.reduce((n,e)=>{var r,t;return n+((null===(r=e.current_month)||void 0===r||null===(t=r.estimated_charges)||void 0===t?void 0:t.totalAmount)||0)},0),Fn=n=>{var e,r,t;ln(n),cn({discount_type:(null===(e=n.plan)||void 0===e?void 0:e.discount_type)||"none",discount_value:(null===(r=n.plan)||void 0===r?void 0:r.discount_value)||0,discount_reason:(null===(t=n.plan)||void 0===t?void 0:t.discount_reason)||""}),an(!0)};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(u.mc,{children:[(0,x.jsxs)(u.Y9,{children:[(0,x.jsx)(u.hE,{children:z("brand:brandSubscriptionsPage.brandSubscriptions")}),(0,x.jsx)(u.ex,{children:(0,x.jsx)(d.cc,{variant:"outline",onClick:()=>{const n=[["Restaurant","Email","Status","Plan","Subscription Fee","Revenue %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];R.forEach(e=>{var r,t,i,s,a,o,l,d,c;n.push([`"${e.restaurant_name}"`,`"${e.restaurant_email}"`,e.restaurant_status,`"${(null===(r=e.plan)||void 0===r?void 0:r.name)||"Not Assigned"}"`,(null===(t=e.plan)||void 0===t?void 0:t.subscription_fee)||"0",(null===(i=e.plan)||void 0===i?void 0:i.revenue_percentage)||"0",(null===(s=e.plan)||void 0===s?void 0:s.billing_cycle)||"-",(null===(a=e.latest_invoice)||void 0===a?void 0:a.invoice_number)||"-",(null===(o=e.latest_invoice)||void 0===o?void 0:o.status)||"-",(null===(l=e.current_month)||void 0===l||null===(d=l.estimated_charges)||void 0===d||null===(c=d.totalAmount)||void 0===c?void 0:c.toString())||"0"].join(","))});const e=new Blob([n.join("\n")],{type:"text/csv"}),r=window.URL.createObjectURL(e),t=document.createElement("a");t.href=r,t.download=`brand-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),window.URL.revokeObjectURL(r),document.body.removeChild(t)},children:z("brand:brandSubscriptionsPage.export")})})]}),(0,x.jsxs)(u.UC,{children:[(0,x.jsxs)(u.MD,{children:[(0,x.jsxs)(u.hI,{color:"#059669",children:[(0,x.jsx)(u.Os,{children:fn}),(0,x.jsx)(u.v0,{children:z("brand:brandSubscriptionsPage.totalRestaurants")}),(0,x.jsx)(u.d1,{children:z("brand:brandSubscriptionsPage.inYourBrand")})]}),(0,x.jsxs)(u.hI,{color:"#2563EB",children:[(0,x.jsx)(u.Os,{children:yn}),(0,x.jsx)(u.v0,{children:z("brand:brandSubscriptionsPage.planAssigned")}),(0,x.jsxs)(u.d1,{children:[fn>0?Math.round(yn/fn*100):0,"% covered"]})]}),(0,x.jsxs)(u.hI,{color:"#7C3AED",children:[(0,x.jsx)(u.Os,{children:Sn}),(0,x.jsx)(u.v0,{children:z("brand:brandSubscriptionsPage.noPlan")}),(0,x.jsx)(u.d1,{children:z("brand:brandSubscriptionsPage.needPlanAssignment")})]}),(0,x.jsxs)(u.hI,{color:"#D97706",children:[(0,x.jsx)(u.Os,{children:(0,o.vv)(_n,$)}),(0,x.jsx)(u.v0,{children:z("brand:brandSubscriptionsPage.estMonthlyCharges")}),(0,x.jsx)(u.d1,{children:z("brand:brandSubscriptionsPage.fromAllRestaurants")})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsxs)(c.Jt,{value:I,onChange:n=>U(n.target.value),children:[(0,x.jsx)("option",{value:"all",children:z("brand:brandSubscriptionsPage.allRestaurants")}),(0,x.jsx)("option",{value:"assigned",children:z("brand:brandSubscriptionsPage.planAssigned")}),(0,x.jsx)("option",{value:"unassigned",children:z("brand:brandSubscriptionsPage.noPlan")}),(0,x.jsx)("option",{value:"active",children:z("brand:brandSubscriptionsPage.active")}),(0,x.jsx)("option",{value:"overdue",children:z("brand:brandSubscriptionsPage.overdue")})]}),(0,x.jsx)(c.DO,{placeholder:"Search restaurants or plans...",value:O,onChange:n=>L(n.target.value)})]}),M?(0,x.jsx)(w,{children:z("brand:brandSubscriptionsPage.loadingSubscriptionData")}):0===jn.length?(0,x.jsxs)(s.pp,{children:[(0,x.jsx)(A,{children:"\ud83d\udccb"}),(0,x.jsx)(C,{children:0===R.length?"No Restaurants":"No Results"}),(0,x.jsx)(P,{children:0===R.length?"No restaurants are assigned to this brand yet.":"No restaurants match your search criteria."})]}):(0,x.jsxs)(x.Fragment,{children:[V&&(0,x.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,x.jsx)("span",{style:{fontSize:"13px",color:"#92400E"},children:V}),(0,x.jsx)("button",{onClick:()=>Z(null),style:{background:"none",border:"none",color:"#92400E",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"\xd7"})]}),(0,x.jsxs)(u.XI,{children:[(0,x.jsxs)(h,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsx)("span",{className:"col-info",children:z("brand:brandSubscriptionsPage.restaurant")}),(0,x.jsx)("span",{children:z("brand:brandSubscriptionsPage.plan")}),(0,x.jsx)("span",{children:z("brand:brandSubscriptionsPage.status")}),(0,x.jsx)("span",{className:"col-fee",children:z("brand:brandSubscriptionsPage.estCharges")}),(0,x.jsx)("span",{children:z("brand:brandSubscriptionsPage.latestInvoice")}),(0,x.jsx)("span",{className:"col-revenue",children:z("brand:brandSubscriptionsPage.revenueMtd")}),(0,x.jsx)("span",{className:"col-action",children:z("brand:brandSubscriptionsPage.actions")})]}),jn.map(n=>{var e,r,t;return(0,x.jsxs)(g,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsxs)(u.Np,{children:[(0,x.jsxs)(u.Uj,{className:"col-info",children:[(0,x.jsx)(u.PM,{children:z("brand:brandSubscriptionsPage.restaurant")}),(0,x.jsxs)(b,{children:[(0,x.jsxs)(v,{children:[n.restaurant_name," ",n.restaurant_currency&&(0,x.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:n.restaurant_currency})]}),(0,x.jsx)(m,{children:n.restaurant_email})]})]}),(0,x.jsxs)(u.Uj,{children:[(0,x.jsx)(u.PM,{children:z("brand:brandSubscriptionsPage.plan")}),n.plan?(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:n.plan.name}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[n.plan.discount_type&&"none"!==n.plan.discount_type&&(n.plan.discount_value||0)>0?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("span",{style:{textDecoration:"line-through",color:"#9CA3AF"},children:(0,o.vv)(parseFloat(n.plan.subscription_fee)||0,$)})," ",(0,x.jsxs)("span",{style:{color:"#15803D",fontWeight:600},children:[(0,o.vv)("percentage"===n.plan.discount_type?(parseFloat(n.plan.subscription_fee)||0)*(1-(n.plan.discount_value||0)/100):Math.max(0,(parseFloat(n.plan.subscription_fee)||0)-(n.plan.discount_value||0)),$),"/mo"]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,o.vv)(parseFloat(n.plan.subscription_fee)||0,$),"/mo"]}),parseFloat(n.plan.revenue_percentage)>0&&` + ${n.plan.revenue_percentage}%`]})]}):(0,x.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,x.jsxs)(u.Uj,{children:[(0,x.jsx)(u.PM,{children:z("brand:brandSubscriptionsPage.status")}),(0,x.jsx)(j,{status:n.restaurant_status,children:n.restaurant_status.charAt(0).toUpperCase()+n.restaurant_status.slice(1)})]}),(0,x.jsxs)(u.Uj,{className:"col-fee",children:[(0,x.jsx)(u.PM,{children:z("brand:brandSubscriptionsPage.estCharges")}),null!==(e=n.current_month)&&void 0!==e&&e.estimated_charges?(0,x.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,o.vv)(n.current_month.estimated_charges.totalAmount,$)}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,x.jsxs)(u.Uj,{children:[(0,x.jsx)(u.PM,{children:z("brand:brandSubscriptionsPage.latestInvoice")}),n.latest_invoice?(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:n.latest_invoice.invoice_number}),(0,x.jsx)(j,{status:n.latest_invoice.status,children:n.latest_invoice.status.replace("_"," ")})]}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:z("brand:brandSubscriptionsPage.noInvoice")})]}),(0,x.jsxs)(u.Uj,{className:"col-revenue",children:[(0,x.jsx)(u.PM,{children:z("brand:brandSubscriptionsPage.revenueMtd")}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,o.vv)((null===(r=n.current_month)||void 0===r?void 0:r.revenue)||0,$)}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(t=n.current_month)||void 0===t?void 0:t.order_count)||0," orders"]})]})]})]}),(0,x.jsxs)(u.wr,{children:[(0,x.jsx)(u.rA,{onClick:()=>(n=>{tn(n),en(!0)})(n),children:z("brand:brandSubscriptionsPage.view")}),(0,x.jsx)(u.rA,{onClick:()=>(n=>{var e;K(n),G((null===(e=n.plan)||void 0===e?void 0:e.id)||""),X(!0)})(n),children:n.plan?"Change":"Assign"}),n.plan&&(0,x.jsx)(u.K0,{onClick:()=>(n=>{hn(n),bn("unassign"),un(!0)})(n),title:"Remove plan assignment",children:(0,x.jsx)(f,{children:"\u2715"})})]})]},n.restaurant_id)})]})]}),Q&&H&&(0,x.jsx)(u.aF,{isOpen:!0,onClose:()=>X(!1),title:H.plan?"Change Plan":"Assign Plan",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>X(!1),children:z("brand:brandSubscriptionsPage.cancel")}),(0,x.jsxs)(d.cc,{variant:"primary",onClick:async()=>{if(W&&H&&q)try{const n={"Content-Type":"application/json",...D?{Authorization:`Bearer ${D}`}:{}},e=await fetch(`/api/brands/${W}/plans/${q}/restaurants`,{method:"POST",headers:n,body:JSON.stringify({restaurant_ids:[H.restaurant_id]})});if(e.ok){const n=await e.json();X(!1),K(null),G(""),vn(),n.currency_warnings&&n.currency_warnings.length>0&&Z(n.currency_warnings[0].message)}else{const n=await e.json();console.error("Failed to assign plan:",n)}}catch(n){console.error("Error assigning plan:",n)}},disabled:!q||0===Y.length,children:[" ",H.plan?"Change Plan":"Assign Plan"," "]})]}),children:(0,x.jsxs)(y,{children:[(0,x.jsxs)(S,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(_,{children:z("brand:brandSubscriptionsPage.restaurant")}),(0,x.jsx)(F,{type:"text",value:H.restaurant_name,disabled:!0})]}),H.plan&&(0,x.jsxs)(S,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(_,{children:z("brand:brandSubscriptionsPage.currentPlan")}),(0,x.jsxs)("div",{style:{padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[H.plan.name," \u2014 ",(0,o.vv)(parseFloat(H.plan.subscription_fee)||0,$),"/mo",parseFloat(H.plan.revenue_percentage)>0&&` + ${H.plan.revenue_percentage}% revenue`]})]}),(0,x.jsxs)(S,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(_,{children:"Select Plan *"}),(0,x.jsxs)(B,{value:q,onChange:n=>G(n.target.value?parseInt(n.target.value):""),children:[(0,x.jsx)("option",{value:"",children:z("brand:brandSubscriptionsPage.selectAPlan")}),Y.map(n=>(0,x.jsxs)("option",{value:n.id,children:[n.name," \u2014 ",(0,o.vv)(parseFloat(n.subscription_fee)||0,$),"/mo",parseFloat(n.revenue_percentage)>0&&` + ${n.revenue_percentage}%`]},n.id))]}),0===Y.length&&(0,x.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),q&&(()=>{const n=Y.find(n=>n.id===q);return n?(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,x.jsx)("strong",{children:"Plan Summary:"})}),(0,x.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:n.name}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Subscription Fee: ",(0,o.vv)(parseFloat(n.subscription_fee)||0,$),"/mo",parseFloat(n.revenue_percentage)>0&&` | Revenue Share: ${n.revenue_percentage}%`,"none"!==n.rent_type&&` | Rent: ${n.rent_type}`,` | Billing: ${n.billing_cycle}`]})]}):null})()]})}),nn&&rn&&(0,x.jsx)(u.aF,{isOpen:!0,onClose:()=>en(!1),title:"Subscription Details",footer:(0,x.jsx)(x.Fragment,{children:(0,x.jsx)(d.cc,{variant:"primary",onClick:()=>en(!1),children:z("brand:brandSubscriptionsPage.close")})}),children:(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:z("brand:brandSubscriptionsPage.restaurant")}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.name")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:rn.restaurant_name})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.email")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:rn.restaurant_email})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.status")}),(0,x.jsx)(j,{status:rn.restaurant_status,children:rn.restaurant_status.charAt(0).toUpperCase()+rn.restaurant_status.slice(1)})]})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:z("brand:brandSubscriptionsPage.plan")}),(0,x.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:rn.plan?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.planName")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:rn.plan.name})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.subscriptionFee")}),rn.plan.discount_type&&"none"!==rn.plan.discount_type&&(rn.plan.discount_value||0)>0?(0,x.jsxs)("div",{children:[(0,x.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:[(0,o.vv)(parseFloat(rn.plan.subscription_fee)||0,$),"/mo"]}),(0,x.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:[(0,o.vv)("percentage"===rn.plan.discount_type?(parseFloat(rn.plan.subscription_fee)||0)*(1-(rn.plan.discount_value||0)/100):Math.max(0,(parseFloat(rn.plan.subscription_fee)||0)-(rn.plan.discount_value||0)),$),"/mo",(0,x.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===rn.plan.discount_type?`${rn.plan.discount_value}%`:(0,o.vv)(rn.plan.discount_value||0,$),")"]})]})]}):(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,o.vv)(parseFloat(rn.plan.subscription_fee)||0,$),"/mo"]})]}),parseFloat(rn.plan.revenue_percentage)>0&&(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.revenueShare")}),(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[rn.plan.revenue_percentage,"%"]})]}),"none"!==rn.plan.rent_type&&(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.rent")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===rn.plan.rent_type?(0,o.vv)(parseFloat(rn.plan.rent_fixed||"0"),$):"percentage"===rn.plan.rent_type?`${rn.plan.rent_percentage}%`:`MAX(${(0,o.vv)(parseFloat(rn.plan.rent_fixed||"0"),$)}, ${rn.plan.rent_percentage}%)`})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.billingCycle")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:rn.plan.billing_cycle})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.activationDate")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(rn.plan.activation_date).toLocaleDateString()})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.discount")}),rn.plan.discount_type&&"none"!==rn.plan.discount_type&&(rn.plan.discount_value||0)>0?(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsxs)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:["percentage"===rn.plan.discount_type?`${rn.plan.discount_value}%`:`${(0,o.vv)(rn.plan.discount_value||0,$)}`,rn.plan.discount_reason?` (${rn.plan.discount_reason})`:""]}),(0,x.jsx)("button",{onClick:()=>Fn(rn),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"2px 8px",fontSize:"11px",color:"#6B7280",cursor:"pointer"},children:z("brand:brandSubscriptionsPage.edit")})]}):(0,x.jsx)("button",{onClick:()=>Fn(rn),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"4px 12px",fontSize:"12px",color:"#635BFF",cursor:"pointer",fontWeight:"500"},children:z("brand:brandSubscriptionsPage.setDiscount")})]})]}):(0,x.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:z("brand:brandSubscriptionsPage.noPlanAssignedToThisRestaurant")})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:z("brand:brandSubscriptionsPage.currentMonth")}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.revenue")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,o.vv)((null===(n=rn.current_month)||void 0===n?void 0:n.revenue)||0,$)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.orders")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(e=rn.current_month)||void 0===e?void 0:e.order_count)||0})]}),(null===(r=rn.current_month)||void 0===r?void 0:r.estimated_charges)&&(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:z("brand:brandSubscriptionsPage.estimatedChargesBreakdown")}),rn.current_month.estimated_charges.items.map((n,e)=>(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,x.jsx)("span",{style:{color:"#374151"},children:n.description}),(0,x.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,o.vv)(n.total_amount,$)})]},e)),(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,x.jsx)("span",{style:{color:"#0A2540"},children:z("brand:brandSubscriptionsPage.total")}),(0,x.jsx)("span",{style:{color:"#0A2540"},children:(0,o.vv)(rn.current_month.estimated_charges.totalAmount,$)})]})]})})]})]}),rn.latest_invoice&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:z("brand:brandSubscriptionsPage.latestInvoice")}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.invoiceNumber")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:rn.latest_invoice.invoice_number})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.amount")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,o.vv)(parseFloat(rn.latest_invoice.total_amount)||0,$)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.status")}),(0,x.jsx)(j,{status:rn.latest_invoice.status,children:rn.latest_invoice.status.replace("_"," ")})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.dueDate")}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(rn.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),pn&&xn&&(0,x.jsx)(u.aF,{isOpen:!0,onClose:()=>un(!1),title:"Confirm Action",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>un(!1),children:z("brand:brandSubscriptionsPage.cancel")}),(0,x.jsx)(d.cc,{variant:"danger",onClick:async()=>{if(W&&xn&&gn)try{const n={...D?{Authorization:`Bearer ${D}`}:{}};if("unassign"===gn&&xn.plan){const e=await fetch(`/api/brands/${W}/plans/${xn.plan.id}/restaurants/${xn.restaurant_id}`,{method:"DELETE",headers:n});if(!e.ok){const n=await e.json();console.error("Failed to unassign:",n)}}un(!1),hn(null),bn(null),vn()}catch(n){console.error("Action failed:",n)}},children:z("brand:brandSubscriptionsPage.removePlan")})]}),children:(0,x.jsx)("p",{children:"unassign"===gn&&`Are you sure you want to remove the plan "${null===(i=xn.plan)||void 0===i?void 0:i.name}" from ${xn.restaurant_name}?`})}),sn&&on&&(0,x.jsx)(u.aF,{isOpen:!0,onClose:()=>an(!1),title:`Set Discount - ${on.restaurant_name}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>an(!1),children:z("brand:brandSubscriptionsPage.cancel")}),(0,x.jsx)(d.cc,{variant:"primary",onClick:async()=>{if(on&&on.plan&&W)try{const n={"Content-Type":"application/json",...D?{Authorization:`Bearer ${D}`}:{}};(await fetch(`/api/brands/${W}/plans/${on.plan.id}/restaurants/${on.restaurant_id}/discount`,{method:"PUT",headers:n,body:JSON.stringify(dn)})).ok&&(an(!1),ln(null),vn())}catch(n){console.error("Failed to save discount:",n)}},children:z("brand:brandSubscriptionsPage.saveDiscount")})]}),children:(0,x.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:z("brand:brandSubscriptionsPage.discountType")}),(0,x.jsxs)(B,{value:dn.discount_type,onChange:n=>cn({...dn,discount_type:n.target.value,discount_value:"none"===n.target.value?0:dn.discount_value}),children:[(0,x.jsx)("option",{value:"none",children:z("brand:brandSubscriptionsPage.none")}),(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsxs)("option",{value:"fixed",children:["Fixed Amount (",$,")"]})]})]}),"none"!==dn.discount_type&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"percentage"===dn.discount_type?"Discount Rate (%)":`Discount Amount (${(0,o.Qn)($)})`}),(0,x.jsx)(F,{type:"number",step:"percentage"===dn.discount_type?"1":"0.01",min:"0",max:"percentage"===dn.discount_type?"100":void 0,value:dn.discount_value,onChange:n=>cn({...dn,discount_value:parseFloat(n.target.value)||0}),placeholder:"percentage"===dn.discount_type?"e.g. 10":"e.g. 50.00"})]}),"none"!==dn.discount_type&&(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:z("brand:brandSubscriptionsPage.reasonOptional")}),(0,x.jsx)(F,{type:"text",value:dn.discount_reason,onChange:n=>cn({...dn,discount_reason:n.target.value}),placeholder:"e.g. Opening promotion"})]}),"none"!==dn.discount_type&&dn.discount_value>0&&on.plan&&(0,x.jsxs)("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:z("brand:brandSubscriptionsPage.preview")}),(0,x.jsx)("div",{style:{fontSize:"13px",color:"#15803D"},children:"percentage"===dn.discount_type?`${dn.discount_value}% off all charges`:`${(0,o.vv)(dn.discount_value,$)} off total`})]})]})})]})]})})}}}]);