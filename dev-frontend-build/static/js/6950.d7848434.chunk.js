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
`},4021:(n,e,r)=>{r.d(e,{i1:()=>a});var t=r(9950),i=r(1367),s=r(6038);const a=()=>{const{user:n}=(0,i.As)(),[e,r]=(0,t.useState)("RM"),[a]=(0,t.useState)(Object.keys(s.DL)),[o,l]=(0,t.useState)(!0),[d,c]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const e=window.location.pathname.split("/"),t=e.indexOf("restaurant");let i=t>=0?e[t+1]:null;if(!i&&null!==n&&void 0!==n&&n.restaurant_id&&(i=n.restaurant_id.toString()),!i)return r("RM"),void l(!1);try{const n=localStorage.getItem("auth_token"),e=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"}});if(e.ok){var s;const n=await e.json(),t=n.currency||(null===(s=n.operation_settings)||void 0===s?void 0:s.currency)||"MYR";r(t)}else r("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),r("MYR")}finally{l(!1)}})()},[null===n||void 0===n?void 0:n.restaurant_id]),{defaultCurrency:e,supportedCurrencies:a,loading:o,error:d}}},6950:(n,e,r)=>{r.r(e),r.d(e,{default:()=>w});var t=r(9950),i=r(4752),s=r(2853),a=r(1367),o=r(6038),l=r(4021),d=r(3705),c=r(2488),p=r(8409),u=r(4414);const x=(0,i.Ay)(p.A0)`
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
`,h=(0,i.Ay)(p.Hj)`
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
`,g=i.Ay.div``,b=i.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,m=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${n=>{switch(n.status){case"active":case"paid":return"#ECFDF5";case"trial":case"pending_payment":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${n=>{switch(n.status){case"active":case"paid":return"#059669";case"trial":case"pending_payment":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,j=i.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,f=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,y=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,S=i.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,_=i.Ay.input`
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
`,F=i.Ay.select`
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
`,B=i.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,A=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,C=i.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,P=i.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,w=()=>{var n,e,r,i;const{t:w}=useTranslation("brand"),{user:z}=(0,a.As)(),{defaultCurrency:E}=(0,l.i1)(),k=E||"MYR",$=localStorage.getItem("auth_token"),D=(null===z||void 0===z?void 0:z.brand_id)||null,[W,R]=(0,t.useState)([]),[T,M]=(0,t.useState)(!0),[N,O]=(0,t.useState)(""),[I,L]=(0,t.useState)("all"),[U,Y]=(0,t.useState)([]),[J,Q]=(0,t.useState)(!1),[X,H]=(0,t.useState)(null),[K,q]=(0,t.useState)(""),[G,V]=(0,t.useState)(null),[Z,nn]=(0,t.useState)(!1),[en,rn]=(0,t.useState)(null),[tn,sn]=(0,t.useState)(!1),[an,on]=(0,t.useState)(null),[ln,dn]=(0,t.useState)({discount_type:"none",discount_value:0,discount_reason:""}),[cn,pn]=(0,t.useState)(!1),[un,xn]=(0,t.useState)(null),[hn,gn]=(0,t.useState)(null),bn=(0,t.useCallback)(async()=>{if(D){M(!0);try{const n=$?{Authorization:`Bearer ${$}`}:{},e=await fetch(`/api/brands/${D}/subscriptions`,{headers:n});if(e.ok){const n=await e.json();R(n.success?n.data:Array.isArray(n)?n:[])}}catch(n){console.error("Error fetching subscriptions:",n),R([])}finally{M(!1)}}},[D,$]),vn=(0,t.useCallback)(async()=>{if(D)try{const n=$?{Authorization:`Bearer ${$}`}:{},e=await fetch(`/api/brands/${D}/plans`,{headers:n});if(e.ok){const n=await e.json(),r=n.success?n.data:Array.isArray(n)?n:[];Y(r.filter(n=>n.is_active))}}catch(n){console.error("Error fetching brand plans:",n)}},[D,$]);(0,t.useEffect)(()=>{bn(),vn()},[bn,vn]);const mn=W.filter(n=>{var e;const r=n.restaurant_name.toLowerCase().includes(N.toLowerCase())||n.restaurant_email.toLowerCase().includes(N.toLowerCase())||((null===(e=n.plan)||void 0===e?void 0:e.name)||"").toLowerCase().includes(N.toLowerCase());return"all"===I?r:"assigned"===I?r&&null!==n.plan:"unassigned"===I?r&&null===n.plan:"active"===I?r&&"active"===n.restaurant_status:"overdue"===I?r&&"overdue"===n.restaurant_status:r}),jn=W.length,fn=W.filter(n=>null!==n.plan).length,yn=W.filter(n=>null===n.plan).length,Sn=W.reduce((n,e)=>{var r,t;return n+((null===(r=e.current_month)||void 0===r||null===(t=r.estimated_charges)||void 0===t?void 0:t.totalAmount)||0)},0),_n=n=>{var e,r,t;on(n),dn({discount_type:(null===(e=n.plan)||void 0===e?void 0:e.discount_type)||"none",discount_value:(null===(r=n.plan)||void 0===r?void 0:r.discount_value)||0,discount_reason:(null===(t=n.plan)||void 0===t?void 0:t.discount_reason)||""}),sn(!0)};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(p.mc,{children:[(0,u.jsxs)(p.Y9,{children:[(0,u.jsx)(p.hE,{children:w("brand:brandSubscriptionsPage.brandSubscriptions")}),(0,u.jsx)(p.ex,{children:(0,u.jsx)(d.cc,{variant:"outline",onClick:()=>{const n=[["Restaurant","Email","Status","Plan","Subscription Fee","Revenue %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];W.forEach(e=>{var r,t,i,s,a,o,l,d,c;n.push([`"${e.restaurant_name}"`,`"${e.restaurant_email}"`,e.restaurant_status,`"${(null===(r=e.plan)||void 0===r?void 0:r.name)||"Not Assigned"}"`,(null===(t=e.plan)||void 0===t?void 0:t.subscription_fee)||"0",(null===(i=e.plan)||void 0===i?void 0:i.revenue_percentage)||"0",(null===(s=e.plan)||void 0===s?void 0:s.billing_cycle)||"-",(null===(a=e.latest_invoice)||void 0===a?void 0:a.invoice_number)||"-",(null===(o=e.latest_invoice)||void 0===o?void 0:o.status)||"-",(null===(l=e.current_month)||void 0===l||null===(d=l.estimated_charges)||void 0===d||null===(c=d.totalAmount)||void 0===c?void 0:c.toString())||"0"].join(","))});const e=new Blob([n.join("\n")],{type:"text/csv"}),r=window.URL.createObjectURL(e),t=document.createElement("a");t.href=r,t.download=`brand-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),window.URL.revokeObjectURL(r),document.body.removeChild(t)},children:w("brand:brandSubscriptionsPage.export")})})]}),(0,u.jsxs)(p.UC,{children:[(0,u.jsxs)(p.MD,{children:[(0,u.jsxs)(p.hI,{color:"#059669",children:[(0,u.jsx)(p.Os,{children:jn}),(0,u.jsx)(p.v0,{children:w("brand:brandSubscriptionsPage.totalRestaurants")}),(0,u.jsx)(p.d1,{children:w("brand:brandSubscriptionsPage.inYourBrand")})]}),(0,u.jsxs)(p.hI,{color:"#2563EB",children:[(0,u.jsx)(p.Os,{children:fn}),(0,u.jsx)(p.v0,{children:w("brand:brandSubscriptionsPage.planAssigned")}),(0,u.jsxs)(p.d1,{children:[jn>0?Math.round(fn/jn*100):0,"% covered"]})]}),(0,u.jsxs)(p.hI,{color:"#7C3AED",children:[(0,u.jsx)(p.Os,{children:yn}),(0,u.jsx)(p.v0,{children:w("brand:brandSubscriptionsPage.noPlan")}),(0,u.jsx)(p.d1,{children:w("brand:brandSubscriptionsPage.needPlanAssignment")})]}),(0,u.jsxs)(p.hI,{color:"#D97706",children:[(0,u.jsx)(p.Os,{children:(0,o.vv)(Sn,k)}),(0,u.jsx)(p.v0,{children:w("brand:brandSubscriptionsPage.estMonthlyCharges")}),(0,u.jsx)(p.d1,{children:w("brand:brandSubscriptionsPage.fromAllRestaurants")})]})]}),(0,u.jsxs)(c.Qn,{children:[(0,u.jsxs)(c.Jt,{value:I,onChange:n=>L(n.target.value),children:[(0,u.jsx)("option",{value:"all",children:w("brand:brandSubscriptionsPage.allRestaurants")}),(0,u.jsx)("option",{value:"assigned",children:w("brand:brandSubscriptionsPage.planAssigned")}),(0,u.jsx)("option",{value:"unassigned",children:w("brand:brandSubscriptionsPage.noPlan")}),(0,u.jsx)("option",{value:"active",children:w("brand:brandSubscriptionsPage.active")}),(0,u.jsx)("option",{value:"overdue",children:w("brand:brandSubscriptionsPage.overdue")})]}),(0,u.jsx)(c.DO,{placeholder:"Search restaurants or plans...",value:N,onChange:n=>O(n.target.value)})]}),T?(0,u.jsx)(P,{children:w("brand:brandSubscriptionsPage.loadingSubscriptionData")}):0===mn.length?(0,u.jsxs)(s.pp,{children:[(0,u.jsx)(B,{children:"\ud83d\udccb"}),(0,u.jsx)(A,{children:0===W.length?"No Restaurants":"No Results"}),(0,u.jsx)(C,{children:0===W.length?"No restaurants are assigned to this brand yet.":"No restaurants match your search criteria."})]}):(0,u.jsxs)(u.Fragment,{children:[G&&(0,u.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsx)("span",{style:{fontSize:"13px",color:"#92400E"},children:G}),(0,u.jsx)("button",{onClick:()=>V(null),style:{background:"none",border:"none",color:"#92400E",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"\xd7"})]}),(0,u.jsxs)(p.XI,{children:[(0,u.jsxs)(x,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,u.jsx)("span",{className:"col-info",children:w("brand:brandSubscriptionsPage.restaurant")}),(0,u.jsx)("span",{children:w("brand:brandSubscriptionsPage.plan")}),(0,u.jsx)("span",{children:w("brand:brandSubscriptionsPage.status")}),(0,u.jsx)("span",{className:"col-fee",children:w("brand:brandSubscriptionsPage.estCharges")}),(0,u.jsx)("span",{children:w("brand:brandSubscriptionsPage.latestInvoice")}),(0,u.jsx)("span",{className:"col-revenue",children:w("brand:brandSubscriptionsPage.revenueMtd")}),(0,u.jsx)("span",{className:"col-action",children:w("brand:brandSubscriptionsPage.actions")})]}),mn.map(n=>{var e,r,t;return(0,u.jsxs)(h,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,u.jsxs)(p.Np,{children:[(0,u.jsxs)(p.Uj,{className:"col-info",children:[(0,u.jsx)(p.PM,{children:w("brand:brandSubscriptionsPage.restaurant")}),(0,u.jsxs)(g,{children:[(0,u.jsxs)(b,{children:[n.restaurant_name," ",n.restaurant_currency&&(0,u.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:n.restaurant_currency})]}),(0,u.jsx)(v,{children:n.restaurant_email})]})]}),(0,u.jsxs)(p.Uj,{children:[(0,u.jsx)(p.PM,{children:w("brand:brandSubscriptionsPage.plan")}),n.plan?(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:n.plan.name}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[n.plan.discount_type&&"none"!==n.plan.discount_type&&(n.plan.discount_value||0)>0?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("span",{style:{textDecoration:"line-through",color:"#9CA3AF"},children:(0,o.vv)(parseFloat(n.plan.subscription_fee)||0,k)})," ",(0,u.jsxs)("span",{style:{color:"#15803D",fontWeight:600},children:[(0,o.vv)("percentage"===n.plan.discount_type?(parseFloat(n.plan.subscription_fee)||0)*(1-(n.plan.discount_value||0)/100):Math.max(0,(parseFloat(n.plan.subscription_fee)||0)-(n.plan.discount_value||0)),k),"/mo"]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,o.vv)(parseFloat(n.plan.subscription_fee)||0,k),"/mo"]}),parseFloat(n.plan.revenue_percentage)>0&&` + ${n.plan.revenue_percentage}%`]})]}):(0,u.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,u.jsxs)(p.Uj,{children:[(0,u.jsx)(p.PM,{children:w("brand:brandSubscriptionsPage.status")}),(0,u.jsx)(m,{status:n.restaurant_status,children:n.restaurant_status.charAt(0).toUpperCase()+n.restaurant_status.slice(1)})]}),(0,u.jsxs)(p.Uj,{className:"col-fee",children:[(0,u.jsx)(p.PM,{children:w("brand:brandSubscriptionsPage.estCharges")}),null!==(e=n.current_month)&&void 0!==e&&e.estimated_charges?(0,u.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,o.vv)(n.current_month.estimated_charges.totalAmount,k)}):(0,u.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,u.jsxs)(p.Uj,{children:[(0,u.jsx)(p.PM,{children:w("brand:brandSubscriptionsPage.latestInvoice")}),n.latest_invoice?(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:n.latest_invoice.invoice_number}),(0,u.jsx)(m,{status:n.latest_invoice.status,children:n.latest_invoice.status.replace("_"," ")})]}):(0,u.jsx)("span",{style:{color:"#9CA3AF"},children:w("brand:brandSubscriptionsPage.noInvoice")})]}),(0,u.jsxs)(p.Uj,{className:"col-revenue",children:[(0,u.jsx)(p.PM,{children:w("brand:brandSubscriptionsPage.revenueMtd")}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,o.vv)((null===(r=n.current_month)||void 0===r?void 0:r.revenue)||0,k)}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(t=n.current_month)||void 0===t?void 0:t.order_count)||0," orders"]})]})]})]}),(0,u.jsxs)(p.wr,{children:[(0,u.jsx)(p.rA,{onClick:()=>(n=>{rn(n),nn(!0)})(n),children:w("brand:brandSubscriptionsPage.view")}),(0,u.jsx)(p.rA,{onClick:()=>(n=>{var e;H(n),q((null===(e=n.plan)||void 0===e?void 0:e.id)||""),Q(!0)})(n),children:n.plan?"Change":"Assign"}),n.plan&&(0,u.jsx)(p.K0,{onClick:()=>(n=>{xn(n),gn("unassign"),pn(!0)})(n),title:"Remove plan assignment",children:(0,u.jsx)(j,{children:"\u2715"})})]})]},n.restaurant_id)})]})]}),J&&X&&(0,u.jsx)(p.aF,{isOpen:!0,onClose:()=>Q(!1),title:X.plan?"Change Plan":"Assign Plan",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(d.cc,{variant:"cancel",onClick:()=>Q(!1),children:w("brand:brandSubscriptionsPage.cancel")}),(0,u.jsxs)(d.cc,{variant:"primary",onClick:async()=>{if(D&&X&&K)try{const n={"Content-Type":"application/json",...$?{Authorization:`Bearer ${$}`}:{}},e=await fetch(`/api/brands/${D}/plans/${K}/restaurants`,{method:"POST",headers:n,body:JSON.stringify({restaurant_ids:[X.restaurant_id]})});if(e.ok){const n=await e.json();Q(!1),H(null),q(""),bn(),n.currency_warnings&&n.currency_warnings.length>0&&V(n.currency_warnings[0].message)}else{const n=await e.json();console.error("Failed to assign plan:",n)}}catch(n){console.error("Error assigning plan:",n)}},disabled:!K||0===U.length,children:[" ",X.plan?"Change Plan":"Assign Plan"," "]})]}),children:(0,u.jsxs)(f,{children:[(0,u.jsxs)(y,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(S,{children:w("brand:brandSubscriptionsPage.restaurant")}),(0,u.jsx)(_,{type:"text",value:X.restaurant_name,disabled:!0})]}),X.plan&&(0,u.jsxs)(y,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(S,{children:w("brand:brandSubscriptionsPage.currentPlan")}),(0,u.jsxs)("div",{style:{padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[X.plan.name," \u2014 ",(0,o.vv)(parseFloat(X.plan.subscription_fee)||0,k),"/mo",parseFloat(X.plan.revenue_percentage)>0&&` + ${X.plan.revenue_percentage}% revenue`]})]}),(0,u.jsxs)(y,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(S,{children:"Select Plan *"}),(0,u.jsxs)(F,{value:K,onChange:n=>q(n.target.value?parseInt(n.target.value):""),children:[(0,u.jsx)("option",{value:"",children:w("brand:brandSubscriptionsPage.selectAPlan")}),U.map(n=>(0,u.jsxs)("option",{value:n.id,children:[n.name," \u2014 ",(0,o.vv)(parseFloat(n.subscription_fee)||0,k),"/mo",parseFloat(n.revenue_percentage)>0&&` + ${n.revenue_percentage}%`]},n.id))]}),0===U.length&&(0,u.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),K&&(()=>{const n=U.find(n=>n.id===K);return n?(0,u.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,u.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,u.jsx)("strong",{children:"Plan Summary:"})}),(0,u.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:n.name}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Subscription Fee: ",(0,o.vv)(parseFloat(n.subscription_fee)||0,k),"/mo",parseFloat(n.revenue_percentage)>0&&` | Revenue Share: ${n.revenue_percentage}%`,"none"!==n.rent_type&&` | Rent: ${n.rent_type}`,` | Billing: ${n.billing_cycle}`]})]}):null})()]})}),Z&&en&&(0,u.jsx)(p.aF,{isOpen:!0,onClose:()=>nn(!1),title:"Subscription Details",footer:(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(d.cc,{variant:"primary",onClick:()=>nn(!1),children:w("brand:brandSubscriptionsPage.close")})}),children:(0,u.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:w("brand:brandSubscriptionsPage.restaurant")}),(0,u.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.name")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:en.restaurant_name})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.email")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:en.restaurant_email})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.status")}),(0,u.jsx)(m,{status:en.restaurant_status,children:en.restaurant_status.charAt(0).toUpperCase()+en.restaurant_status.slice(1)})]})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:w("brand:brandSubscriptionsPage.plan")}),(0,u.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:en.plan?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.planName")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:en.plan.name})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.subscriptionFee")}),en.plan.discount_type&&"none"!==en.plan.discount_type&&(en.plan.discount_value||0)>0?(0,u.jsxs)("div",{children:[(0,u.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:[(0,o.vv)(parseFloat(en.plan.subscription_fee)||0,k),"/mo"]}),(0,u.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:[(0,o.vv)("percentage"===en.plan.discount_type?(parseFloat(en.plan.subscription_fee)||0)*(1-(en.plan.discount_value||0)/100):Math.max(0,(parseFloat(en.plan.subscription_fee)||0)-(en.plan.discount_value||0)),k),"/mo",(0,u.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===en.plan.discount_type?`${en.plan.discount_value}%`:(0,o.vv)(en.plan.discount_value||0,k),")"]})]})]}):(0,u.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,o.vv)(parseFloat(en.plan.subscription_fee)||0,k),"/mo"]})]}),parseFloat(en.plan.revenue_percentage)>0&&(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.revenueShare")}),(0,u.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[en.plan.revenue_percentage,"%"]})]}),"none"!==en.plan.rent_type&&(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.rent")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===en.plan.rent_type?(0,o.vv)(parseFloat(en.plan.rent_fixed||"0"),k):"percentage"===en.plan.rent_type?`${en.plan.rent_percentage}%`:`MAX(${(0,o.vv)(parseFloat(en.plan.rent_fixed||"0"),k)}, ${en.plan.rent_percentage}%)`})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.billingCycle")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:en.plan.billing_cycle})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.activationDate")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(en.plan.activation_date).toLocaleDateString()})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.discount")}),en.plan.discount_type&&"none"!==en.plan.discount_type&&(en.plan.discount_value||0)>0?(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsxs)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:["percentage"===en.plan.discount_type?`${en.plan.discount_value}%`:`${(0,o.vv)(en.plan.discount_value||0,k)}`,en.plan.discount_reason?` (${en.plan.discount_reason})`:""]}),(0,u.jsx)("button",{onClick:()=>_n(en),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"2px 8px",fontSize:"11px",color:"#6B7280",cursor:"pointer"},children:w("brand:brandSubscriptionsPage.edit")})]}):(0,u.jsx)("button",{onClick:()=>_n(en),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"4px 12px",fontSize:"12px",color:"#635BFF",cursor:"pointer",fontWeight:"500"},children:w("brand:brandSubscriptionsPage.setDiscount")})]})]}):(0,u.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:w("brand:brandSubscriptionsPage.noPlanAssignedToThisRestaurant")})})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:w("brand:brandSubscriptionsPage.currentMonth")}),(0,u.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.revenue")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,o.vv)((null===(n=en.current_month)||void 0===n?void 0:n.revenue)||0,k)})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.orders")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(e=en.current_month)||void 0===e?void 0:e.order_count)||0})]}),(null===(r=en.current_month)||void 0===r?void 0:r.estimated_charges)&&(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:w("brand:brandSubscriptionsPage.estimatedChargesBreakdown")}),en.current_month.estimated_charges.items.map((n,e)=>(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,u.jsx)("span",{style:{color:"#374151"},children:n.description}),(0,u.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,o.vv)(n.total_amount,k)})]},e)),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,u.jsx)("span",{style:{color:"#0A2540"},children:w("brand:brandSubscriptionsPage.total")}),(0,u.jsx)("span",{style:{color:"#0A2540"},children:(0,o.vv)(en.current_month.estimated_charges.totalAmount,k)})]})]})})]})]}),en.latest_invoice&&(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:w("brand:brandSubscriptionsPage.latestInvoice")}),(0,u.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.invoiceNumber")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:en.latest_invoice.invoice_number})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.amount")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,o.vv)(parseFloat(en.latest_invoice.total_amount)||0,k)})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.status")}),(0,u.jsx)(m,{status:en.latest_invoice.status,children:en.latest_invoice.status.replace("_"," ")})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.dueDate")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(en.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),cn&&un&&(0,u.jsx)(p.aF,{isOpen:!0,onClose:()=>pn(!1),title:"Confirm Action",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(d.cc,{variant:"cancel",onClick:()=>pn(!1),children:w("brand:brandSubscriptionsPage.cancel")}),(0,u.jsx)(d.cc,{variant:"danger",onClick:async()=>{if(D&&un&&hn)try{const n={...$?{Authorization:`Bearer ${$}`}:{}};if("unassign"===hn&&un.plan){const e=await fetch(`/api/brands/${D}/plans/${un.plan.id}/restaurants/${un.restaurant_id}`,{method:"DELETE",headers:n});if(!e.ok){const n=await e.json();console.error("Failed to unassign:",n)}}pn(!1),xn(null),gn(null),bn()}catch(n){console.error("Action failed:",n)}},children:w("brand:brandSubscriptionsPage.removePlan")})]}),children:(0,u.jsx)("p",{children:"unassign"===hn&&`Are you sure you want to remove the plan "${null===(i=un.plan)||void 0===i?void 0:i.name}" from ${un.restaurant_name}?`})}),tn&&an&&(0,u.jsx)(p.aF,{isOpen:!0,onClose:()=>sn(!1),title:`Set Discount - ${an.restaurant_name}`,footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(d.cc,{variant:"cancel",onClick:()=>sn(!1),children:w("brand:brandSubscriptionsPage.cancel")}),(0,u.jsx)(d.cc,{variant:"primary",onClick:async()=>{if(an&&an.plan&&D)try{const n={"Content-Type":"application/json",...$?{Authorization:`Bearer ${$}`}:{}};(await fetch(`/api/brands/${D}/plans/${an.plan.id}/restaurants/${an.restaurant_id}/discount`,{method:"PUT",headers:n,body:JSON.stringify(ln)})).ok&&(sn(!1),on(null),bn())}catch(n){console.error("Failed to save discount:",n)}},children:w("brand:brandSubscriptionsPage.saveDiscount")})]}),children:(0,u.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:w("brand:brandSubscriptionsPage.discountType")}),(0,u.jsxs)(F,{value:ln.discount_type,onChange:n=>dn({...ln,discount_type:n.target.value,discount_value:"none"===n.target.value?0:ln.discount_value}),children:[(0,u.jsx)("option",{value:"none",children:w("brand:brandSubscriptionsPage.none")}),(0,u.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,u.jsxs)("option",{value:"fixed",children:["Fixed Amount (",k,")"]})]})]}),"none"!==ln.discount_type&&(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"percentage"===ln.discount_type?"Discount Rate (%)":`Discount Amount (${(0,o.Qn)(k)})`}),(0,u.jsx)(_,{type:"number",step:"percentage"===ln.discount_type?"1":"0.01",min:"0",max:"percentage"===ln.discount_type?"100":void 0,value:ln.discount_value,onChange:n=>dn({...ln,discount_value:parseFloat(n.target.value)||0}),placeholder:"percentage"===ln.discount_type?"e.g. 10":"e.g. 50.00"})]}),"none"!==ln.discount_type&&(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:w("brand:brandSubscriptionsPage.reasonOptional")}),(0,u.jsx)(_,{type:"text",value:ln.discount_reason,onChange:n=>dn({...ln,discount_reason:n.target.value}),placeholder:"e.g. Opening promotion"})]}),"none"!==ln.discount_type&&ln.discount_value>0&&an.plan&&(0,u.jsxs)("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:w("brand:brandSubscriptionsPage.preview")}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#15803D"},children:"percentage"===ln.discount_type?`${ln.discount_value}% off all charges`:`${(0,o.vv)(ln.discount_value,k)} off total`})]})]})})]})]})})}}}]);