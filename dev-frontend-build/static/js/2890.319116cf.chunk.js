"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2890],{2890:(o,e,n)=>{n.r(e),n.d(e,{default:()=>P});var t=n(9950),r=n(4752),i=n(2853),s=n(1367),a=n(6038),c=n(3705),l=n(2488),d=n(8409),u=n(4414);const p=(0,r.Ay)(d.A0)`
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
`,x=(0,r.Ay)(d.Hj)`
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
`,h=r.Ay.div``,g=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,f=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,v=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${o=>{switch(o.status){case"active":case"paid":return"#ECFDF5";case"trial":case"pending_payment":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${o=>{switch(o.status){case"active":case"paid":return"#059669";case"trial":case"pending_payment":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,m=r.Ay.span`
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
`,y=r.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,S=r.Ay.input`
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
`,_=r.Ay.select`
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
`,F=r.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,B=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,A=r.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,C=r.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,P=()=>{var o,e,n,r;const{t:P}=useTranslation("foodcourt"),{user:z}=(0,s.As)(),w=localStorage.getItem("auth_token"),E=(null===z||void 0===z?void 0:z.foodcourt_id)||null,k="MYR",[$,D]=(0,t.useState)([]),[W,T]=(0,t.useState)(!0),[R,N]=(0,t.useState)(""),[M,I]=(0,t.useState)("all"),[L,O]=(0,t.useState)([]),[U,Y]=(0,t.useState)(!1),[J,X]=(0,t.useState)(null),[H,K]=(0,t.useState)(""),[Q,q]=(0,t.useState)(null),[G,V]=(0,t.useState)(!1),[Z,oo]=(0,t.useState)(null),[eo,no]=(0,t.useState)(!1),[to,ro]=(0,t.useState)(null),[io,so]=(0,t.useState)({discount_type:"none",discount_value:0,discount_reason:""}),[ao,co]=(0,t.useState)(!1),[lo,uo]=(0,t.useState)(null),[po,xo]=(0,t.useState)(null),ho=(0,t.useCallback)(async()=>{if(E){T(!0);try{const o=w?{Authorization:`Bearer ${w}`}:{},e=await fetch(`/api/foodcourts/${E}/subscriptions`,{headers:o});if(e.ok){const o=await e.json();D(o.success?o.data:Array.isArray(o)?o:[])}}catch(o){console.error("Error fetching subscriptions:",o),D([])}finally{T(!1)}}},[E,w]),go=(0,t.useCallback)(async()=>{if(E)try{const o=w?{Authorization:`Bearer ${w}`}:{},e=await fetch(`/api/foodcourts/${E}/plans`,{headers:o});if(e.ok){const o=await e.json(),n=o.success?o.data:Array.isArray(o)?o:[];O(n.filter(o=>o.is_active))}}catch(o){console.error("Error fetching foodcourt plans:",o)}},[E,w]);(0,t.useEffect)(()=>{ho(),go()},[ho,go]);const fo=$.filter(o=>{var e;const n=o.restaurant_name.toLowerCase().includes(R.toLowerCase())||o.restaurant_email.toLowerCase().includes(R.toLowerCase())||((null===(e=o.plan)||void 0===e?void 0:e.name)||"").toLowerCase().includes(R.toLowerCase());return"all"===M?n:"assigned"===M?n&&null!==o.plan:"unassigned"===M?n&&null===o.plan:"active"===M?n&&"active"===o.restaurant_status:"overdue"===M?n&&"overdue"===o.restaurant_status:n}),vo=$.length,mo=$.filter(o=>null!==o.plan).length,jo=$.filter(o=>null===o.plan).length,bo=$.reduce((o,e)=>{var n,t;return o+((null===(n=e.current_month)||void 0===n||null===(t=n.estimated_charges)||void 0===t?void 0:t.totalAmount)||0)},0),yo=o=>{var e,n,t;ro(o),so({discount_type:(null===(e=o.plan)||void 0===e?void 0:e.discount_type)||"none",discount_value:(null===(n=o.plan)||void 0===n?void 0:n.discount_value)||0,discount_reason:(null===(t=o.plan)||void 0===t?void 0:t.discount_reason)||""}),no(!0)};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(d.mc,{children:[(0,u.jsxs)(d.Y9,{children:[(0,u.jsx)(d.hE,{children:P("foodcourt:foodcourtSubscriptionsPage.foodcourtSubscriptions")}),(0,u.jsx)(d.ex,{children:(0,u.jsx)(c.cc,{variant:"outline",onClick:()=>{const o=[["Tenant","Email","Status","Plan","Management Fee","Revenue Share %","Billing Cycle","Latest Invoice","Invoice Status","Est. Monthly Charges"].join(",")];$.forEach(e=>{var n,t,r,i,s,a,c,l,d;o.push([`"${e.restaurant_name}"`,`"${e.restaurant_email}"`,e.restaurant_status,`"${(null===(n=e.plan)||void 0===n?void 0:n.name)||"Not Assigned"}"`,(null===(t=e.plan)||void 0===t?void 0:t.subscription_fee)||"0",(null===(r=e.plan)||void 0===r?void 0:r.revenue_percentage)||"0",(null===(i=e.plan)||void 0===i?void 0:i.billing_cycle)||"-",(null===(s=e.latest_invoice)||void 0===s?void 0:s.invoice_number)||"-",(null===(a=e.latest_invoice)||void 0===a?void 0:a.status)||"-",(null===(c=e.current_month)||void 0===c||null===(l=c.estimated_charges)||void 0===l||null===(d=l.totalAmount)||void 0===d?void 0:d.toString())||"0"].join(","))});const e=new Blob([o.join("\n")],{type:"text/csv"}),n=window.URL.createObjectURL(e),t=document.createElement("a");t.href=n,t.download=`foodcourt-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),window.URL.revokeObjectURL(n),document.body.removeChild(t)},children:P("foodcourt:foodcourtSubscriptionsPage.export")})})]}),(0,u.jsxs)(d.UC,{children:[(0,u.jsxs)(d.MD,{children:[(0,u.jsxs)(d.hI,{color:"#059669",children:[(0,u.jsx)(d.Os,{children:vo}),(0,u.jsx)(d.v0,{children:P("foodcourt:foodcourtSubscriptionsPage.totalTenants")}),(0,u.jsx)(d.d1,{children:P("foodcourt:foodcourtSubscriptionsPage.inYourFoodcourt")})]}),(0,u.jsxs)(d.hI,{color:"#2563EB",children:[(0,u.jsx)(d.Os,{children:mo}),(0,u.jsx)(d.v0,{children:P("foodcourt:foodcourtSubscriptionsPage.planAssigned")}),(0,u.jsxs)(d.d1,{children:[vo>0?Math.round(mo/vo*100):0,"% covered"]})]}),(0,u.jsxs)(d.hI,{color:"#7C3AED",children:[(0,u.jsx)(d.Os,{children:jo}),(0,u.jsx)(d.v0,{children:P("foodcourt:foodcourtSubscriptionsPage.noPlan")}),(0,u.jsx)(d.d1,{children:P("foodcourt:foodcourtSubscriptionsPage.needPlanAssignment")})]}),(0,u.jsxs)(d.hI,{color:"#D97706",children:[(0,u.jsx)(d.Os,{children:(0,a.vv)(bo,k)}),(0,u.jsx)(d.v0,{children:P("foodcourt:foodcourtSubscriptionsPage.estMonthlyCharges")}),(0,u.jsx)(d.d1,{children:P("foodcourt:foodcourtSubscriptionsPage.fromAllTenants")})]})]}),(0,u.jsxs)(l.Qn,{children:[(0,u.jsxs)(l.Jt,{value:M,onChange:o=>I(o.target.value),children:[(0,u.jsx)("option",{value:"all",children:P("foodcourt:foodcourtSubscriptionsPage.allTenants")}),(0,u.jsx)("option",{value:"assigned",children:P("foodcourt:foodcourtSubscriptionsPage.planAssigned")}),(0,u.jsx)("option",{value:"unassigned",children:P("foodcourt:foodcourtSubscriptionsPage.noPlan")}),(0,u.jsx)("option",{value:"active",children:P("foodcourt:foodcourtSubscriptionsPage.active")}),(0,u.jsx)("option",{value:"overdue",children:P("foodcourt:foodcourtSubscriptionsPage.overdue")})]}),(0,u.jsx)(l.DO,{placeholder:"Search tenants or plans...",value:R,onChange:o=>N(o.target.value)})]}),W?(0,u.jsx)(C,{children:P("foodcourt:foodcourtSubscriptionsPage.loadingSubscriptionData")}):0===fo.length?(0,u.jsxs)(i.pp,{children:[(0,u.jsx)(F,{children:"\ud83d\udccb"}),(0,u.jsx)(B,{children:0===$.length?"No Tenants":"No Results"}),(0,u.jsx)(A,{children:0===$.length?"No tenants are assigned to this foodcourt yet.":"No tenants match your search criteria."})]}):(0,u.jsxs)(u.Fragment,{children:[Q&&(0,u.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsx)("span",{style:{fontSize:"13px",color:"#92400E"},children:Q}),(0,u.jsx)("button",{onClick:()=>q(null),style:{background:"none",border:"none",color:"#92400E",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"\xd7"})]}),(0,u.jsxs)(d.XI,{children:[(0,u.jsxs)(p,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,u.jsx)("span",{className:"col-info",children:P("foodcourt:foodcourtSubscriptionsPage.tenant")}),(0,u.jsx)("span",{children:P("foodcourt:foodcourtSubscriptionsPage.plan")}),(0,u.jsx)("span",{children:P("foodcourt:foodcourtSubscriptionsPage.status")}),(0,u.jsx)("span",{className:"col-fee",children:P("foodcourt:foodcourtSubscriptionsPage.estCharges")}),(0,u.jsx)("span",{children:P("foodcourt:foodcourtSubscriptionsPage.latestInvoice")}),(0,u.jsx)("span",{className:"col-revenue",children:P("foodcourt:foodcourtSubscriptionsPage.revenueMtd")}),(0,u.jsx)("span",{className:"col-action",children:P("foodcourt:foodcourtSubscriptionsPage.actions")})]}),fo.map(o=>{var e,n,t;return(0,u.jsxs)(x,{columns:"2fr 1.5fr 1fr 1fr 1fr 1fr 180px",children:[(0,u.jsxs)(d.Np,{children:[(0,u.jsxs)(d.Uj,{className:"col-info",children:[(0,u.jsx)(d.PM,{children:P("foodcourt:foodcourtSubscriptionsPage.tenant")}),(0,u.jsxs)(h,{children:[(0,u.jsxs)(g,{children:[o.restaurant_name," ",o.restaurant_currency&&(0,u.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:o.restaurant_currency})]}),(0,u.jsx)(f,{children:o.restaurant_email})]})]}),(0,u.jsxs)(d.Uj,{children:[(0,u.jsx)(d.PM,{children:P("foodcourt:foodcourtSubscriptionsPage.plan")}),o.plan?(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontWeight:600,color:"#0A2540",fontSize:"13px"},children:o.plan.name}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[o.plan.discount_type&&"none"!==o.plan.discount_type&&(o.plan.discount_value||0)>0?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("span",{style:{textDecoration:"line-through",color:"#9CA3AF"},children:(0,a.vv)(parseFloat(o.plan.subscription_fee)||0,k)})," ",(0,u.jsxs)("span",{style:{color:"#15803D",fontWeight:600},children:[(0,a.vv)("percentage"===o.plan.discount_type?(parseFloat(o.plan.subscription_fee)||0)*(1-(o.plan.discount_value||0)/100):Math.max(0,(parseFloat(o.plan.subscription_fee)||0)-(o.plan.discount_value||0)),k),"/mo"]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,a.vv)(parseFloat(o.plan.subscription_fee)||0,k),"/mo"]}),parseFloat(o.plan.revenue_percentage)>0&&` + ${o.plan.revenue_percentage}%`]})]}):(0,u.jsx)("span",{style:{padding:"4px 10px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:600},children:"Not Assigned"})]}),(0,u.jsxs)(d.Uj,{children:[(0,u.jsx)(d.PM,{children:P("foodcourt:foodcourtSubscriptionsPage.status")}),(0,u.jsx)(v,{status:o.restaurant_status,children:o.restaurant_status.charAt(0).toUpperCase()+o.restaurant_status.slice(1)})]}),(0,u.jsxs)(d.Uj,{className:"col-fee",children:[(0,u.jsx)(d.PM,{children:P("foodcourt:foodcourtSubscriptionsPage.estCharges")}),null!==(e=o.current_month)&&void 0!==e&&e.estimated_charges?(0,u.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(o.current_month.estimated_charges.totalAmount,k)}):(0,u.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]}),(0,u.jsxs)(d.Uj,{children:[(0,u.jsx)(d.PM,{children:P("foodcourt:foodcourtSubscriptionsPage.latestInvoice")}),o.latest_invoice?(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:o.latest_invoice.invoice_number}),(0,u.jsx)(v,{status:o.latest_invoice.status,children:o.latest_invoice.status.replace("_"," ")})]}):(0,u.jsx)("span",{style:{color:"#9CA3AF"},children:P("foodcourt:foodcourtSubscriptionsPage.noInvoice")})]}),(0,u.jsxs)(d.Uj,{className:"col-revenue",children:[(0,u.jsx)(d.PM,{children:P("foodcourt:foodcourtSubscriptionsPage.revenueMtd")}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)((null===(n=o.current_month)||void 0===n?void 0:n.revenue)||0,k)}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(null===(t=o.current_month)||void 0===t?void 0:t.order_count)||0," orders"]})]})]})]}),(0,u.jsxs)(d.wr,{children:[(0,u.jsx)(d.rA,{onClick:()=>(o=>{oo(o),V(!0)})(o),children:P("foodcourt:foodcourtSubscriptionsPage.view")}),(0,u.jsx)(d.rA,{onClick:()=>(o=>{var e;X(o),K((null===(e=o.plan)||void 0===e?void 0:e.id)||""),Y(!0)})(o),children:o.plan?"Change":"Assign"}),o.plan&&(0,u.jsx)(d.K0,{onClick:()=>(o=>{uo(o),xo("unassign"),co(!0)})(o),title:"Remove plan assignment",children:(0,u.jsx)(m,{children:"\u2715"})})]})]},o.restaurant_id)})]})]}),U&&J&&(0,u.jsx)(d.aF,{isOpen:!0,onClose:()=>Y(!1),title:J.plan?"Change Plan":"Assign Plan",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(c.cc,{variant:"cancel",onClick:()=>Y(!1),children:P("foodcourt:foodcourtSubscriptionsPage.cancel")}),(0,u.jsxs)(c.cc,{variant:"primary",onClick:async()=>{if(E&&J&&H)try{const o={"Content-Type":"application/json",...w?{Authorization:`Bearer ${w}`}:{}},e=await fetch(`/api/foodcourts/${E}/plans/${H}/restaurants`,{method:"POST",headers:o,body:JSON.stringify({restaurant_ids:[J.restaurant_id]})});if(e.ok){const o=await e.json();Y(!1),X(null),K(""),ho(),o.currency_warnings&&o.currency_warnings.length>0&&q(o.currency_warnings[0].message)}else{const o=await e.json();console.error("Failed to assign plan:",o)}}catch(o){console.error("Error assigning plan:",o)}},disabled:!H||0===L.length,children:[" ",J.plan?"Change Plan":"Assign Plan"," "]})]}),children:(0,u.jsxs)(j,{children:[(0,u.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(y,{children:P("foodcourt:foodcourtSubscriptionsPage.tenant")}),(0,u.jsx)(S,{type:"text",value:J.restaurant_name,disabled:!0})]}),J.plan&&(0,u.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(y,{children:P("foodcourt:foodcourtSubscriptionsPage.currentPlan")}),(0,u.jsxs)("div",{style:{padding:"12px",background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"8px",fontSize:"14px",color:"#0A2540"},children:[J.plan.name," \u2014 ",(0,a.vv)(parseFloat(J.plan.subscription_fee)||0,k),"/mo",parseFloat(J.plan.revenue_percentage)>0&&` + ${J.plan.revenue_percentage}% revenue share`]})]}),(0,u.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(y,{children:"Select Plan *"}),(0,u.jsxs)(_,{value:H,onChange:o=>K(o.target.value?parseInt(o.target.value):""),children:[(0,u.jsx)("option",{value:"",children:P("foodcourt:foodcourtSubscriptionsPage.selectAPlan")}),L.map(o=>(0,u.jsxs)("option",{value:o.id,children:[o.name," \u2014 ",(0,a.vv)(parseFloat(o.subscription_fee)||0,k),"/mo",parseFloat(o.revenue_percentage)>0&&` + ${o.revenue_percentage}%`]},o.id))]}),0===L.length&&(0,u.jsx)("div",{style:{marginTop:"8px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:'No active plans found. Create a plan in the "Plans" page first.'})]}),H&&(()=>{const o=L.find(o=>o.id===H);return o?(0,u.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,u.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,u.jsx)("strong",{children:"Plan Summary:"})}),(0,u.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:o.name}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#374151"},children:["Management Fee: ",(0,a.vv)(parseFloat(o.subscription_fee)||0,k),"/mo",parseFloat(o.revenue_percentage)>0&&` | Revenue Share: ${o.revenue_percentage}%`,"none"!==o.rent_type&&` | Rent: ${o.rent_type}`,` | Billing: ${o.billing_cycle}`]})]}):null})()]})}),G&&Z&&(0,u.jsx)(d.aF,{isOpen:!0,onClose:()=>V(!1),title:"Subscription Details",footer:(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(c.cc,{variant:"primary",onClick:()=>V(!1),children:P("foodcourt:foodcourtSubscriptionsPage.close")})}),children:(0,u.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:P("foodcourt:foodcourtSubscriptionsPage.tenant")}),(0,u.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.name")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.restaurant_name})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.email")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.restaurant_email})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.status")}),(0,u.jsx)(v,{status:Z.restaurant_status,children:Z.restaurant_status.charAt(0).toUpperCase()+Z.restaurant_status.slice(1)})]})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:P("foodcourt:foodcourtSubscriptionsPage.plan")}),(0,u.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:Z.plan?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.planName")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.plan.name})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.managementFee")}),Z.plan.discount_type&&"none"!==Z.plan.discount_type&&(Z.plan.discount_value||0)>0?(0,u.jsxs)("div",{children:[(0,u.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:[(0,a.vv)(parseFloat(Z.plan.subscription_fee)||0,k),"/mo"]}),(0,u.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:[(0,a.vv)("percentage"===Z.plan.discount_type?(parseFloat(Z.plan.subscription_fee)||0)*(1-(Z.plan.discount_value||0)/100):Math.max(0,(parseFloat(Z.plan.subscription_fee)||0)-(Z.plan.discount_value||0)),k),"/mo",(0,u.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===Z.plan.discount_type?`${Z.plan.discount_value}%`:(0,a.vv)(Z.plan.discount_value||0,k),")"]})]})]}):(0,u.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[(0,a.vv)(parseFloat(Z.plan.subscription_fee)||0,k),"/mo"]})]}),parseFloat(Z.plan.revenue_percentage)>0&&(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.revenueShare")}),(0,u.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[Z.plan.revenue_percentage,"%"]})]}),"none"!==Z.plan.rent_type&&(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.rent")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"fixed"===Z.plan.rent_type?(0,a.vv)(parseFloat(Z.plan.rent_fixed||"0"),k):"percentage"===Z.plan.rent_type?`${Z.plan.rent_percentage}%`:`MAX(${(0,a.vv)(parseFloat(Z.plan.rent_fixed||"0"),k)}, ${Z.plan.rent_percentage}%)`})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.billingCycle")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.plan.billing_cycle})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.activationDate")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(Z.plan.activation_date).toLocaleDateString()})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.discount")}),Z.plan.discount_type&&"none"!==Z.plan.discount_type&&(Z.plan.discount_value||0)>0?(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsxs)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:["percentage"===Z.plan.discount_type?`${Z.plan.discount_value}%`:`${(0,a.vv)(Z.plan.discount_value||0,k)}`,Z.plan.discount_reason?` (${Z.plan.discount_reason})`:""]}),(0,u.jsx)("button",{onClick:()=>yo(Z),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"2px 8px",fontSize:"11px",color:"#6B7280",cursor:"pointer"},children:P("foodcourt:foodcourtSubscriptionsPage.edit")})]}):(0,u.jsx)("button",{onClick:()=>yo(Z),style:{background:"none",border:"1px solid #D1D5DB",borderRadius:"4px",padding:"4px 12px",fontSize:"12px",color:"#635BFF",cursor:"pointer",fontWeight:"500"},children:P("foodcourt:foodcourtSubscriptionsPage.setDiscount")})]})]}):(0,u.jsx)("div",{style:{color:"#92400E",fontSize:"14px"},children:P("foodcourt:foodcourtSubscriptionsPage.noPlanAssignedToThisTenant")})})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:P("foodcourt:foodcourtSubscriptionsPage.currentMonth")}),(0,u.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.revenue")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)((null===(o=Z.current_month)||void 0===o?void 0:o.revenue)||0,k)})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.orders")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(null===(e=Z.current_month)||void 0===e?void 0:e.order_count)||0})]}),(null===(n=Z.current_month)||void 0===n?void 0:n.estimated_charges)&&(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"12px",marginTop:"8px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:P("foodcourt:foodcourtSubscriptionsPage.estimatedChargesBreakdown")}),Z.current_month.estimated_charges.items.map((o,e)=>(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"},children:[(0,u.jsx)("span",{style:{color:"#374151"},children:o.description}),(0,u.jsx)("span",{style:{fontWeight:500,color:"#0A2540"},children:(0,a.vv)(o.total_amount,k)})]},e)),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #E6EBF1",fontWeight:600},children:[(0,u.jsx)("span",{style:{color:"#0A2540"},children:P("foodcourt:foodcourtSubscriptionsPage.total")}),(0,u.jsx)("span",{style:{color:"#0A2540"},children:(0,a.vv)(Z.current_month.estimated_charges.totalAmount,k)})]})]})})]})]}),Z.latest_invoice&&(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:P("foodcourt:foodcourtSubscriptionsPage.latestInvoice")}),(0,u.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.invoiceNumber")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.latest_invoice.invoice_number})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.amount")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,a.vv)(parseFloat(Z.latest_invoice.total_amount)||0,k)})]}),(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.status")}),(0,u.jsx)(v,{status:Z.latest_invoice.status,children:Z.latest_invoice.status.replace("_"," ")})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.dueDate")}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:new Date(Z.latest_invoice.due_date).toLocaleDateString()})]})]})]})]})}),ao&&lo&&(0,u.jsx)(d.aF,{isOpen:!0,onClose:()=>co(!1),title:"Confirm Action",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(c.cc,{variant:"cancel",onClick:()=>co(!1),children:P("foodcourt:foodcourtSubscriptionsPage.cancel")}),(0,u.jsx)(c.cc,{variant:"danger",onClick:async()=>{if(E&&lo&&po)try{const o={...w?{Authorization:`Bearer ${w}`}:{}};if("unassign"===po&&lo.plan){const e=await fetch(`/api/foodcourts/${E}/plans/${lo.plan.id}/restaurants/${lo.restaurant_id}`,{method:"DELETE",headers:o});if(!e.ok){const o=await e.json();console.error("Failed to unassign:",o)}}co(!1),uo(null),xo(null),ho()}catch(o){console.error("Action failed:",o)}},children:P("foodcourt:foodcourtSubscriptionsPage.removePlan")})]}),children:(0,u.jsx)("p",{children:"unassign"===po&&`Are you sure you want to remove the plan "${null===(r=lo.plan)||void 0===r?void 0:r.name}" from ${lo.restaurant_name}?`})}),eo&&to&&(0,u.jsx)(d.aF,{isOpen:!0,onClose:()=>no(!1),title:`Set Discount - ${to.restaurant_name}`,footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(c.cc,{variant:"cancel",onClick:()=>no(!1),children:P("foodcourt:foodcourtSubscriptionsPage.cancel")}),(0,u.jsx)(c.cc,{variant:"primary",onClick:async()=>{if(to&&to.plan&&E)try{const o={"Content-Type":"application/json",...w?{Authorization:`Bearer ${w}`}:{}};(await fetch(`/api/foodcourts/${E}/plans/${to.plan.id}/restaurants/${to.restaurant_id}/discount`,{method:"PUT",headers:o,body:JSON.stringify(io)})).ok&&(no(!1),ro(null),ho())}catch(o){console.error("Failed to save discount:",o)}},children:P("foodcourt:foodcourtSubscriptionsPage.saveDiscount")})]}),children:(0,u.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:P("foodcourt:foodcourtSubscriptionsPage.discountType")}),(0,u.jsxs)(_,{value:io.discount_type,onChange:o=>so({...io,discount_type:o.target.value,discount_value:"none"===o.target.value?0:io.discount_value}),children:[(0,u.jsx)("option",{value:"none",children:P("foodcourt:foodcourtSubscriptionsPage.none")}),(0,u.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,u.jsxs)("option",{value:"fixed",children:["Fixed Amount (",k,")"]})]})]}),"none"!==io.discount_type&&(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:"percentage"===io.discount_type?"Discount Rate (%)":`Discount Amount (${k})`}),(0,u.jsx)(S,{type:"number",step:"percentage"===io.discount_type?"1":"0.01",min:"0",max:"percentage"===io.discount_type?"100":void 0,value:io.discount_value,onChange:o=>so({...io,discount_value:parseFloat(o.target.value)||0}),placeholder:"percentage"===io.discount_type?"e.g. 10":"e.g. 50.00"})]}),"none"!==io.discount_type&&(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"},children:P("foodcourt:foodcourtSubscriptionsPage.reasonOptional")}),(0,u.jsx)(S,{type:"text",value:io.discount_reason,onChange:o=>so({...io,discount_reason:o.target.value}),placeholder:"e.g. Opening promotion"})]}),"none"!==io.discount_type&&io.discount_value>0&&to.plan&&(0,u.jsxs)("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,u.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:P("foodcourt:foodcourtSubscriptionsPage.preview")}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#15803D"},children:"percentage"===io.discount_type?`${io.discount_value}% off all charges`:`${(0,a.vv)(io.discount_value,k)} off total`})]})]})})]})]})})}},3705:(o,e,n)=>{n.d(e,{cc:()=>r});var t=n(4752);const r=t.Ay.button`
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