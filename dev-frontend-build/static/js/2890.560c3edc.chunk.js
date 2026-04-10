"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2890],{509:(o,e,n)=>{n.r(e),n.d(e,{default:()=>z});var t=n(9950),r=n(4752),i=n(2853),s=n(1367),a=n(6038),c=n(3705),l=n(2488),d=n(9955),u=n(8409),p=n(4414);const x=(0,r.Ay)(u.A0)`
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
`,h=(0,r.Ay)(u.Hj)`
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
`,g=r.Ay.div``,f=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,m=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${o=>{switch(o.status){case"active":case"paid":return"#ECFDF5";case"trial":case"pending_payment":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${o=>{switch(o.status){case"active":case"paid":return"#059669";case"trial":case"pending_payment":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,j=r.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,b=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,y=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,S=r.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,_=r.Ay.input`
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
`,F=r.Ay.select`
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
`,P=r.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,z=()=>{var o,e,n,r;const{t:z}=useTranslation("foodcourt"),{user:w}=(0,s.As)(),E=(0,d.c4)(),k=(null===w||void 0===w?void 0:w.foodcourt_id)||null,$="MYR",[D,W]=(0,t.useState)([]),[T,R]=(0,t.useState)(!0),[N,M]=(0,t.useState)(""),[L,O]=(0,t.useState)("all"),[I,U]=(0,t.useState)([]),[Y,J]=(0,t.useState)(!1),[X,H]=(0,t.useState)(null),[K,Q]=(0,t.useState)(""),[q,G]=(0,t.useState)(null),[V,Z]=(0,t.useState)(!1),[oo,eo]=(0,t.useState)(null),[no,to]=(0,t.useState)(!1),[ro,io]=(0,t.useState)(null),[so,ao]=(0,t.useState)({discount_type:"none",discount_value:0,discount_reason:""}),[co,lo]=(0,t.useState)(!1),[uo,po]=(0,t.useState)(null),[xo,ho]=(0,t.useState)(null),go=(0,t.useCallback)(async()=>{if(k){R(!0);try{const o=E?{Authorization:`Bearer ${E}`}:{},e=await fetch(`/api/foodcourts/${k}/subscriptions`,{headers:o});if(e.ok){const o=await e.json();W(o.success?o.data:Array.isArray(o)?o:[])}}catch(o){console.error("Error fetching subscriptions:",o),W([])}finally{R(!1)}}},[k,E]),fo=(0,t.useCallback)(async()=>{if(k)try{const o=E?{Authorization:`Bearer ${E}`}:{},e=await fetch(`/api/foodcourts/${k}/plans`,{headers:o});if(e.ok){const o=await e.json(),n=o.success?o.data:Array.isArray(o)?o:[];U(n.filter(o=>o.is_active))}}catch(o){console.error("Error fetching foodcourt plans:",o)}},[k,E]);(0,t.useEffect)(()=>{go(),fo()},[go,fo]);const vo=D.filter(o=>{var e;const n=o.restaurant_name.toLowerCase().includes(N.toLowerCase())||o.restaurant_email.toLowerCase().includes(N.toLowerCase())||((null===(e=o.plan)||void 0===e?void 0:e.name)||"").toLowerCase().includes(N.toLowerCase());return"all"===L?n:"assigned"===L?n&&null!==o.plan:"unassigned"===L?n&&null===o.plan:"active"===L?n&&"active"===o.restaurant_status:"overdue"===L?n&&"overdue"===o.restaurant_status:n}),mo=D.length,jo=D.filter(o=>null!==o.plan).length,bo=D.filter(o=>null===o.plan).length,yo=D.reduce((o,e)=>{var n,t;return o+((null===(n=e.current_month)||void 0===n||null===(t=n.estimated_charges)||void 0===t?void 0:t.totalAmount)||0)},0),So=o=>{var e,n,t;io(o),ao({discount_type:(null===(e=o.plan)||void 0===e?void 0:e.discount_type)||"none",discount_value:(null===(n=o.plan)||void 0===n?void 0:n.discount_value)||0,discount_reason:(null===(t=o.plan)||void 0===t?void 0:t.discount_reason)||""}),to(!0)};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(u.mc,{children:[(0,p.jsxs)(u.Y9,{children:[(0,p.jsx)(u.hE,{children:z("foodcourt:foodcourtSubscriptionsPage.foodcourtSubscriptions")}),(0,p.jsx)(u.ex,{children:(0,p.jsx)(c.cc,{variant:"outline",onClick:()=>{const o=[["Tenant","Email","Status","Plan","Management Fee","Revenue Share %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];D.forEach(e=>{var n,t,r,i,s,a,c,l,d;o.push([`"${e.restaurant_name}"`,`"${e.restaurant_email}"`,e.restaurant_status,`"${(null===(n=e.plan)||void 0===n?void 0:n.name)||"Not Assigned"}"`,(null===(t=e.plan)||void 0===t?void 0:t.subscription_fee)||"0",(null===(r=e.plan)||void 0===r?void 0:r.revenue_percentage)||"0",(null===(i=e.plan)||void 0===i?void 0:i.billing_cycle)||"-",(null===(s=e.latest_invoice)||void 0===s?void 0:s.invoice_number)||"-",(null===(a=e.latest_invoice)||void 0===a?void 0:a.status)||"-",(null===(c=e.current_month)||void 0===c||null===(l=c.estimated_charges)||void 0===l||null===(d=l.totalAmount)||void 0===d?void 0:d.toString())||"0"].join(","))});const e=new Blob([o.join("\n")],{type:"text/csv"}),n=window.URL.createObjectURL(e),t=document.createElement("a");t.href=n,t.download=`foodcourt-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),window.URL.revokeObjectURL(n),document.body.removeChild(t)},children:z("foodcourt:foodcourtSubscriptionsPage.export")})})]}),(0,p.jsxs)(u.UC,{children:[(0,p.jsxs)(u.MD,{children:[(0,p.jsxs)(u.hI,{color:"#059669",children:[(0,p.jsx)(u.Os,{children:mo}),(0,p.jsx)(u.v0,{children:z("foodcourt:foodcourtSubscriptionsPage.totalTenants")}),(0,p.jsx)(u.d1,{children:z("foodcourt:foodcourtSubscriptionsPage.inYourFoodcourt")})]}),(0,p.jsxs)(u.hI,{color:"#2563EB",children:[(0,p.jsx)(u.Os,{children:jo}),(0,p.jsx)(u.v0,{children:z("foodcourt:foodcourtSubscriptionsPage.planAssigned")}),(0,p.jsxs)(u.d1,{children:[mo>0?Math.round(jo/mo*100):0,"% covered"]})]}),(0,p.jsxs)(u.hI,{color:"#7C3AED",children:[(0,p.jsx)(u.Os,{children:bo}),(0,p.jsx)(u.v0,{children:z("foodcourt:foodcourtSubscriptionsPage.noPlan")}),(0,p.jsx)(u.d1,{children:z("foodcourt:foodcourtSubscriptionsPage.needPlanAssignment")})]}),(0,p.jsxs)(u.hI,{color:"#D97706",children:[(0,p.jsx)(u.Os,{children:(0,a.vv)(yo,$)}),(0,p.jsx)(u.v0,{children:z("foodcourt:foodcourtSubscriptionsPage.estMonthlyCharges")}),(0,p.jsx)(u.d1,{children:z("foodcourt:foodcourtSubscriptionsPage.fromAllTenants")})]})]}),(0,p.jsxs)(l.Qn,{children:[(0,p.jsxs)(l.Jt,{value:L,onChange:o=>O(o.target.value),children:[(0,p.jsx)("option",{value:"all",children:z("foodcourt:foodcourtSubscriptionsPage.allTenants")}),(0,p.jsx)("option",{value:"assigned",children:z("foodcourt:foodcourtSubscriptionsPage.planAssigned")}),(0,p.jsx)("option",{value:"unassigned",children:z("foodcourt:foodcourtSubscriptionsPage.noPlan")}),(0,p.jsx)("option",{value:"active",children:z("foodcourt:foodcourtSubscriptionsPage.active")}),(0,p.jsx)("option",{value:"overdue",children:z("foodcourt:foodcourtSubscriptionsPage.overdue")})]}),(0,p.jsx)(l.DO,{placeholder:"Search tenants or plans...",value:N,onChange:o=>M(o.target.value)})]}),T?(0,p.jsx)(P,{children:z("foodcourt:foodcourtSubscriptionsPage.loadingSubscriptionData")}):0===vo.length?(0,p.jsxs)(i.pp,{children:[(0,p.jsx)(B,{children:"\ud83d\udccb"}),(0,p.jsx)(A,{children:0===D.length?"No Tenants":"No Results"}),(0,p.jsx)(C,{children:0===D.length?"No tenants are assigned to this foodcourt yet.":"No tenants match your search criteria."})]}):(0,p.jsxs)(p.Fragment,{children:[q&&(0,p.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,p.jsx)("span",{style:{fontSize:"13px",color:"#92400E"},children:q}),(0,p.jsx)("button",{onClick:()=>G(null),style:{background:"none",border:"none",color:"#92400E",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"\xd7"})]}),(0,p.jsxs)(u.XI,{children:[(0,p.jsxs)(x,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,p.jsx)("span",{className:"col-info",children:z("foodcourt:foodcourtSubscriptionsPage.tenant")}),(0,p.jsx)("span",{children:z("foodcourt:foodcourtSubscriptionsPage.plan")}),(0,p.jsx)("span",{children:z("foodcourt:foodcourtSubscriptionsPage.status")}),(0,p.jsx)("span",{className:"col-fee",children:z("foodcourt:foodcourtSubscriptionsPage.estCharges")}),(0,p.jsx)("span",{children:z("foodcourt:foodcourtSubscriptionsPage.latestInvoice")}),(0,p.jsx)("span",{className:"col-revenue",children:z("foodcourt:foodcourtSubscriptionsPage.revenueMtd")}),(0,p.jsx)("span",{className:"col-action",children:z("foodcourt:foodcourtSubscriptionsPage.actions")})]}),vo.map(o=>{var e,n,t;return(0,p.jsxs)(h,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,p.jsxs)(u.Np,{children:[(0,p.jsxs)(u.Uj,{className:"col-info",children:[(0,p.jsx)(u.PM,{children:z("foodcourt:foodcourtSubscriptionsPage.tenant")}),(0,p.jsxs)(g,{children:[(0,p.jsxs)(f,{children:[o.restaurant_name," ",o.restaurant_currency&&(0,p.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:o.restaurant_currency})]}),(0,p.jsx)(v,{children:o.restaurant_email})]})]}),(0,p.jsxs)(u.Uj,{children:[(0,p.jsx)(u.PM,{children:z("foodcourt:foodcourtSubscriptionsPage.plan")}),o.plan?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:o.plan.name}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[o.plan.discount_type&&"none"!==o.plan.discount_type&&(o.plan.discount_value||0)>0?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("span",{style:{textDecoration:"line-through",color:"#9CA3AF"},children:(0,a.vv)(parseFloat(o.plan.subscription_fee)||0,$)})," ",(0,p.jsxs)("span",{style:{color:"#15803D",fontWeight:600},children:[(0,a.vv)("percentage"===o.plan.discount_type?(parseFloat(o.plan.subscription_fee)||0)*(1-(o.plan.discount_value||0)/100):Math.max(0,(parseFloat(o.plan.subscription_fee)||0)-(o.plan.discount_value||0)),$),"/mo"]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,a.vv)(parseFloat(o.plan.subscription_fee)||0,$),"/mo"]}),parseFloat(o.plan.revenue_percentage)>0&&` + ${o.plan.revenue_percentage}%`]})]}):(0,p.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,p.jsxs)(u.Uj,{children:[(0,p.jsx)(u.PM,{children:z("foodcourt:foodcourtSubscriptionsPage.status")}),(0,p.jsx)(m,{status:o.restaurant_status,children:o.restaurant_status.charAt(0).toUpperCase()+o.restaurant_status.slice(1)})]}),(0,p.jsxs)(u.Uj,{className:"col-fee",children:[(0,p.jsx)(u.PM,{children:z("foodcourt:foodcourtSubscriptionsPage.estCharges")}),null!==(e=o.current_month)&&void 0!==e&&e.estimated_charges?(0,p.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(o.current_month.estimated_charges.totalAmount,$)}):(0,p.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,p.jsxs)(u.Uj,{children:[(0,p.jsx)(u.PM,{children:z("foodcourt:foodcourtSubscriptionsPage.latestInvoice")}),o.latest_invoice?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:o.latest_invoice.invoice_number}),(0,p.jsx)(m,{status:o.latest_invoice.status,children:o.latest_invoice.status.replace("_"," ")})]}):(0,p.jsx)("span",{style:{color:"#9CA3AF"},children:z("foodcourt:foodcourtSubscriptionsPage.noInvoice")})]}),(0,p.jsxs)(u.Uj,{className:"col-revenue",children:[(0,p.jsx)(u.PM,{children:z("foodcourt:foodcourtSubscriptionsPage.revenueMtd")}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)((null===(n=o.current_month)||void 0===n?void 0:n.revenue)||0,$)}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(t=o.current_month)||void 0===t?void 0:t.order_count)||0," orders"]})]})]})]}),(0,p.jsxs)(u.wr,{children:[(0,p.jsx)(u.rA,{onClick:()=>(o=>{eo(o),Z(!0)})(o),children:z("foodcourt:foodcourtSubscriptionsPage.view")}),(0,p.jsx)(u.rA,{onClick:()=>(o=>{var e;H(o),Q((null===(e=o.plan)||void 0===e?void 0:e.id)||""),J(!0)})(o),children:o.plan?"Change":"Assign"}),o.plan&&(0,p.jsx)(u.K0,{onClick:()=>(o=>{po(o),ho("unassign"),lo(!0)})(o),title:"Remove plan assignment",children:(0,p.jsx)(j,{children:"\u2715"})})]})]},o.restaurant_id)})]})]}),Y&&X&&(0,p.jsx)(u.aF,{isOpen:!0,onClose:()=>J(!1),title:X.plan?"Change Plan":"Assign Plan",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.cc,{variant:"cancel",onClick:()=>J(!1),children:z("foodcourt:foodcourtSubscriptionsPage.cancel")}),(0,p.jsxs)(c.cc,{variant:"primary",onClick:async()=>{if(k&&X&&K)try{const o={"Content-Type":"application/json",...E?{Authorization:`Bearer ${E}`}:{}},e=await fetch(`/api/foodcourts/${k}/plans/${K}/restaurants`,{method:"POST",headers:o,body:JSON.stringify({restaurant_ids:[X.restaurant_id]})});if(e.ok){const o=await e.json();J(!1),H(null),Q(""),go(),o.currency_warnings&&o.currency_warnings.length>0&&G(o.currency_warnings[0].message)}else{const o=await e.json();console.error("Failed to assign plan:",o)}}catch(o){console.error("Error assigning plan:",o)}},disabled:!K||0===I.length,children:[" ",X.plan?"Change Plan":"Assign Plan"," "]})]}),children:(0,p.jsxs)(b,{children:[(0,p.jsxs)(y,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(S,{children:z("foodcourt:foodcourtSubscriptionsPage.tenant")}),(0,p.jsx)(_,{type:"text",value:X.restaurant_name,disabled:!0})]}),X.plan&&(0,p.jsxs)(y,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(S,{children:z("foodcourt:foodcourtSubscriptionsPage.currentPlan")}),(0,p.jsxs)("div",{style:{padding:"12px",background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[X.plan.name," \u2014 ",(0,a.vv)(parseFloat(X.plan.subscription_fee)||0,$),"/mo",parseFloat(X.plan.revenue_percentage)>0&&` + ${X.plan.revenue_percentage}% revenue share`]})]}),(0,p.jsxs)(y,{style:{gridColumn:"1 / -1"},children:[(0,p.jsx)(S,{children:"Select Plan *"}),(0,p.jsxs)(F,{value:K,onChange:o=>Q(o.target.value?parseInt(o.target.value):""),children:[(0,p.jsx)("option",{value:"",children:z("foodcourt:foodcourtSubscriptionsPage.selectAPlan")}),I.map(o=>(0,p.jsxs)("option",{value:o.id,children:[o.name," \u2014 ",(0,a.vv)(parseFloat(o.subscription_fee)||0,$),"/mo",parseFloat(o.revenue_percentage)>0&&` + ${o.revenue_percentage}%`]},o.id))]}),0===I.length&&(0,p.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),K&&(()=>{const o=I.find(o=>o.id===K);return o?(0,p.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,p.jsx)("strong",{children:"Plan Summary:"})}),(0,p.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:o.name}),(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Management Fee: ",(0,a.vv)(parseFloat(o.subscription_fee)||0,$),"/mo",parseFloat(o.revenue_percentage)>0&&` | Revenue Share: ${o.revenue_percentage}%`,"none"!==o.rent_type&&` | Rent: ${o.rent_type}`,` | Billing: ${o.billing_cycle}`]})]}):null})()]})}),V&&oo&&(0,p.jsx)(u.aF,{isOpen:!0,onClose:()=>Z(!1),title:"Subscription Details",footer:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(c.cc,{variant:"primary",onClick:()=>Z(!1),children:z("foodcourt:foodcourtSubscriptionsPage.close")})}),children:(0,p.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:z("foodcourt:foodcourtSubscriptionsPage.tenant")}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.name")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:oo.restaurant_name})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.email")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:oo.restaurant_email})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.status")}),(0,p.jsx)(m,{status:oo.restaurant_status,children:oo.restaurant_status.charAt(0).toUpperCase()+oo.restaurant_status.slice(1)})]})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:z("foodcourt:foodcourtSubscriptionsPage.plan")}),(0,p.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:oo.plan?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.planName")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:oo.plan.name})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.managementFee")}),oo.plan.discount_type&&"none"!==oo.plan.discount_type&&(oo.plan.discount_value||0)>0?(0,p.jsxs)("div",{children:[(0,p.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:[(0,a.vv)(parseFloat(oo.plan.subscription_fee)||0,$),"/mo"]}),(0,p.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:[(0,a.vv)("percentage"===oo.plan.discount_type?(parseFloat(oo.plan.subscription_fee)||0)*(1-(oo.plan.discount_value||0)/100):Math.max(0,(parseFloat(oo.plan.subscription_fee)||0)-(oo.plan.discount_value||0)),$),"/mo",(0,p.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===oo.plan.discount_type?`${oo.plan.discount_value}%`:(0,a.vv)(oo.plan.discount_value||0,$),")"]})]})]}):(0,p.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,a.vv)(parseFloat(oo.plan.subscription_fee)||0,$),"/mo"]})]}),parseFloat(oo.plan.revenue_percentage)>0&&(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.revenueShare")}),(0,p.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[oo.plan.revenue_percentage,"%"]})]}),"none"!==oo.plan.rent_type&&(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.rent")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===oo.plan.rent_type?(0,a.vv)(parseFloat(oo.plan.rent_fixed||"0"),$):"percentage"===oo.plan.rent_type?`${oo.plan.rent_percentage}%`:`MAX(${(0,a.vv)(parseFloat(oo.plan.rent_fixed||"0"),$)}, ${oo.plan.rent_percentage}%)`})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.billingCycle")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:oo.plan.billing_cycle})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.activationDate")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(oo.plan.activation_date).toLocaleDateString()})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.discount")}),oo.plan.discount_type&&"none"!==oo.plan.discount_type&&(oo.plan.discount_value||0)>0?(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsxs)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:["percentage"===oo.plan.discount_type?`${oo.plan.discount_value}%`:`${(0,a.vv)(oo.plan.discount_value||0,$)}`,oo.plan.discount_reason?` (${oo.plan.discount_reason})`:""]}),(0,p.jsx)("button",{onClick:()=>So(oo),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"2px 8px",fontSize:"11px",color:"#6B7280",cursor:"pointer"},children:z("foodcourt:foodcourtSubscriptionsPage.edit")})]}):(0,p.jsx)("button",{onClick:()=>So(oo),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"4px 12px",fontSize:"12px",color:"#635BFF",cursor:"pointer",fontWeight:"500"},children:z("foodcourt:foodcourtSubscriptionsPage.setDiscount")})]})]}):(0,p.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:z("foodcourt:foodcourtSubscriptionsPage.noPlanAssignedToThisTenant")})})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:z("foodcourt:foodcourtSubscriptionsPage.currentMonth")}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.revenue")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)((null===(o=oo.current_month)||void 0===o?void 0:o.revenue)||0,$)})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.orders")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(e=oo.current_month)||void 0===e?void 0:e.order_count)||0})]}),(null===(n=oo.current_month)||void 0===n?void 0:n.estimated_charges)&&(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:z("foodcourt:foodcourtSubscriptionsPage.estimatedChargesBreakdown")}),oo.current_month.estimated_charges.items.map((o,e)=>(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,p.jsx)("span",{style:{color:"#374151"},children:o.description}),(0,p.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(o.total_amount,$)})]},e)),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,p.jsx)("span",{style:{color:"#0A2540"},children:z("foodcourt:foodcourtSubscriptionsPage.total")}),(0,p.jsx)("span",{style:{color:"#0A2540"},children:(0,a.vv)(oo.current_month.estimated_charges.totalAmount,$)})]})]})})]})]}),oo.latest_invoice&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:z("foodcourt:foodcourtSubscriptionsPage.latestInvoice")}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.invoiceNumber")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:oo.latest_invoice.invoice_number})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.amount")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)(parseFloat(oo.latest_invoice.total_amount)||0,$)})]}),(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.status")}),(0,p.jsx)(m,{status:oo.latest_invoice.status,children:oo.latest_invoice.status.replace("_"," ")})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.dueDate")}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(oo.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),co&&uo&&(0,p.jsx)(u.aF,{isOpen:!0,onClose:()=>lo(!1),title:"Confirm Action",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.cc,{variant:"cancel",onClick:()=>lo(!1),children:z("foodcourt:foodcourtSubscriptionsPage.cancel")}),(0,p.jsx)(c.cc,{variant:"danger",onClick:async()=>{if(k&&uo&&xo)try{const o={...E?{Authorization:`Bearer ${E}`}:{}};if("unassign"===xo&&uo.plan){const e=await fetch(`/api/foodcourts/${k}/plans/${uo.plan.id}/restaurants/${uo.restaurant_id}`,{method:"DELETE",headers:o});if(!e.ok){const o=await e.json();console.error("Failed to unassign:",o)}}lo(!1),po(null),ho(null),go()}catch(o){console.error("Action failed:",o)}},children:z("foodcourt:foodcourtSubscriptionsPage.removePlan")})]}),children:(0,p.jsx)("p",{children:"unassign"===xo&&`Are you sure you want to remove the plan "${null===(r=uo.plan)||void 0===r?void 0:r.name}" from ${uo.restaurant_name}?`})}),no&&ro&&(0,p.jsx)(u.aF,{isOpen:!0,onClose:()=>to(!1),title:`Set Discount - ${ro.restaurant_name}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.cc,{variant:"cancel",onClick:()=>to(!1),children:z("foodcourt:foodcourtSubscriptionsPage.cancel")}),(0,p.jsx)(c.cc,{variant:"primary",onClick:async()=>{if(ro&&ro.plan&&k)try{const o={"Content-Type":"application/json",...E?{Authorization:`Bearer ${E}`}:{}};(await fetch(`/api/foodcourts/${k}/plans/${ro.plan.id}/restaurants/${ro.restaurant_id}/discount`,{method:"PUT",headers:o,body:JSON.stringify(so)})).ok&&(to(!1),io(null),go())}catch(o){console.error("Failed to save discount:",o)}},children:z("foodcourt:foodcourtSubscriptionsPage.saveDiscount")})]}),children:(0,p.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:z("foodcourt:foodcourtSubscriptionsPage.discountType")}),(0,p.jsxs)(F,{value:so.discount_type,onChange:o=>ao({...so,discount_type:o.target.value,discount_value:"none"===o.target.value?0:so.discount_value}),children:[(0,p.jsx)("option",{value:"none",children:z("foodcourt:foodcourtSubscriptionsPage.none")}),(0,p.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,p.jsxs)("option",{value:"fixed",children:["Fixed Amount (",$,")"]})]})]}),"none"!==so.discount_type&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"percentage"===so.discount_type?"Discount Rate (%)":`Discount Amount (${$})`}),(0,p.jsx)(_,{type:"number",step:"percentage"===so.discount_type?"1":"0.01",min:"0",max:"percentage"===so.discount_type?"100":void 0,value:so.discount_value,onChange:o=>ao({...so,discount_value:parseFloat(o.target.value)||0}),placeholder:"percentage"===so.discount_type?"e.g. 10":"e.g. 50.00"})]}),"none"!==so.discount_type&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:z("foodcourt:foodcourtSubscriptionsPage.reasonOptional")}),(0,p.jsx)(_,{type:"text",value:so.discount_reason,onChange:o=>ao({...so,discount_reason:o.target.value}),placeholder:"e.g. Opening promotion"})]}),"none"!==so.discount_type&&so.discount_value>0&&ro.plan&&(0,p.jsxs)("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:z("foodcourt:foodcourtSubscriptionsPage.preview")}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#15803D"},children:"percentage"===so.discount_type?`${so.discount_value}% off all charges`:`${(0,a.vv)(so.discount_value,$)} off total`})]})]})})]})]})})}},3705:(o,e,n)=>{n.d(e,{cc:()=>r});var t=n(4752);const r=t.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${o=>{switch(o.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${o=>{switch(o.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${o=>{switch(o.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${o=>{switch(o.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
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

  ${o=>o.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`}}]);