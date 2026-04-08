"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9968],{2653:(e,n,t)=>{t.d(n,{M:()=>s});var i=t(9950),r=t(4492);function s(e){const[n,t]=(0,r.ok)(),s=(0,i.useCallback)(()=>n.get("tab")||e,[n,e]),[a,o]=(0,i.useState)(s());return[a,(0,i.useCallback)(e=>{o(e),t({tab:e})},[t])]}},5370:(e,n,t)=>{t.d(n,{A:()=>b});var i=t(9950),r=t(4752),s=t(4414);const a=r.i7`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`,o=r.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=r.i7`
  to { transform: rotate(360deg); }
`,d=r.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=r.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?r.AH`${o} 0.3s ease forwards`:r.AH`${a} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=r.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,u=r.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,x=r.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,h=r.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=r.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,m=r.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 13px;
  font-weight: 700;
`,y=r.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,f=r.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: 700;
`,v=(0,i.forwardRef)((e,n)=>{let{children:t,onSave:r,type:a="input",debounceMs:o=2e3,style:l}=e;const[c,v]=(0,i.useState)("idle"),[b,j]=(0,i.useState)(!1),w=(0,i.useRef)(null),F=(0,i.useRef)(null),A=(0,i.useRef)(null),_=(0,i.useRef)(!0),C=(0,i.useRef)(r);C.current=r;const S=(0,i.useCallback)(()=>{w.current&&clearTimeout(w.current),F.current&&clearTimeout(F.current),A.current&&clearTimeout(A.current)},[]),B=2e3!==o?o:"toggle"===a||"select"===a||"list"===a||"image"===a?300:o,k=(0,i.useCallback)(()=>{S(),j(!1),w.current=setTimeout(async()=>{if(_.current){v("saving");try{if(await C.current(),!_.current)return;v("saved"),F.current=setTimeout(()=>{_.current&&(j(!0),A.current=setTimeout(()=>{_.current&&(v("idle"),j(!1))},300))},2e3)}catch{if(!_.current)return;v("error"),F.current=setTimeout(()=>{_.current&&(j(!0),A.current=setTimeout(()=>{_.current&&(v("idle"),j(!1))},300))},4e3)}}},B)},[B,S]);(0,i.useImperativeHandle)(n,()=>({triggerSave:k}),[k]),(0,i.useEffect)(()=>(_.current=!0,()=>{_.current=!1,S()}),[S]);const E=i.Children.map(t,e=>{if(!i.isValidElement(e))return e;const n=e.props.onChange;return"function"!==typeof n?e:i.cloneElement(e,{onChange:function(){n(...arguments),k()}})}),z="saving"===c?(0,s.jsx)(y,{}):"saved"===c?(0,s.jsx)(m,{children:"\u2713"}):"error"===c?(0,s.jsx)(f,{children:"!"}):null,P="select"===a?u:"toggle"===a?x:"image"===a?h:"list"===a?g:p;return(0,s.jsxs)(d,{$type:a,style:l,children:[E,"idle"!==c&&(0,s.jsx)(P,{$fading:b,children:z})]})});v.displayName="AutoSaveField";const b=v},9968:(e,n,t)=>{t.r(n),t.d(n,{default:()=>be});var i=t(9950),r=t(4752),s=t(5781),a=t(1367),o=t(9610),l=t(2597),d=t(2653),c=t(8666),p=t(8012),u=t(6038),x=t(5030),h=t(4414);const g=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,m=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`,y=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,f=r.Ay.div`
  font-size: 16px;
  color: #6B7280;
`,v=r.Ay.span`
  font-size: 13px;
  color: #059669;
  font-style: italic;
`,b=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,j=r.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F9FAFB;
  border-radius: 8px;
`,w=r.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,F=r.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,A=r.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#EFF6FF";case"overdue":return"#FEF3C7";case"suspended":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#2563EB";case"overdue":return"#D97706";case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,_=r.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`,C=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`,S=r.Ay.div`
  font-size: 13px;
  color: #78350F;
  line-height: 1.5;
`,B=r.Ay.div`
  background: ${e=>"warning"===e.variant?"#FEF3C7":"#EFF6FF"};
  border: 1px solid ${e=>"warning"===e.variant?"#FDE68A":"#BFDBFE"};
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  font-size: 13px;
  color: ${e=>"warning"===e.variant?"#92400E":"#1E40AF"};
  line-height: 1.5;
`,k=r.Ay.button`
  padding: 10px 20px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: #5046E5; }
  &:disabled { background: #D1D5DB; cursor: not-allowed; }
`,E=r.Ay.button`
  padding: 6px 14px;
  background: white;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 12px;

  &:hover { background: #FEE2E2; }
`,z=r.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;

  &:hover { color: #5046E5; }
`,P=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
`,T=r.Ay.div`
  border: 2px solid ${e=>e.isCurrent?"#635BFF":e.isSelected?"#10B981":"#E6EBF1"};
  border-radius: 12px;
  padding: 20px;
  position: relative;
  cursor: ${e=>e.isCurrent?"default":"pointer"};
  background: ${e=>e.isCurrent?"#F8F7FF":"white"};
  transition: border-color 0.15s;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${e=>(e.isCurrent,"#635BFF")};
  }
`,D=r.Ay.div`
  position: absolute;
  top: -10px;
  right: 16px;
  background: #635BFF;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
`,$=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,I=r.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 4px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #6B7280;
  }
`,R=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  padding: 3px 0;
`,M=r.Ay.div`
  flex: 1;
  min-height: 12px;
`,L=r.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: ${e=>"upgrade"===e.type?"#059669":"#D97706"};
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`,U=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,O=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`,N=r.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#F8F7FF":"white"};
  color: ${e=>e.disabled?"#D1D5DB":e.active?"#635BFF":"#6B7280"};
  font-size: 14px;
  font-weight: 500;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.5:1};
`,G=r.Ay.div`
  background: #F9FAFB;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 20px;
  margin: 16px 0;
`,H=r.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: ${e=>e.bold?"15px":"14px"};
  font-weight: ${e=>e.bold?"600":"400"};
  color: ${e=>e.highlight?"#059669":"#1F2937"};
`,W=r.Ay.hr`
  border: none;
  border-top: 1px dashed #D1D5DB;
  margin: 8px 0;
`,Y=r.Ay.div`
  font-size: 13px;
  color: #059669;
  padding: 3px 0;
`,q=r.Ay.div`
  font-size: 13px;
  color: #D97706;
  padding: 3px 0;
`,J=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  padding: 3px 0;
  display: flex;
  justify-content: space-between;
`,V=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`;function Z(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"-"}function K(e){return-1===e?"Unlimited":String(e)}const Q=()=>{var e,n,t,r,s,l;const{t:d}=(0,x.Bd)("settings"),{user:c}=(0,a.As)(),[p,Q]=(0,i.useState)(null),[X,ee]=(0,i.useState)(!0),[ne,te]=(0,i.useState)(null),ie=()=>{const e=null===c||void 0===c?void 0:c.role,n=(null===c||void 0===c?void 0:c.restaurantId)||(null===c||void 0===c?void 0:c.restaurant_id);return"Restaurant Admin"===e&&n?`/restaurant/${n}/invoices`:"Brand General"===e?"/pos/brand/invoices":"Foodcourt General"===e?"/pos/foodcourt/invoices":"Restaurant Owner"===e?"/pos/owner/invoices":"/pos/profile"},[re,se]=(0,i.useState)(!1),[ae,oe]=(0,i.useState)(null),[le,de]=(0,i.useState)("monthly"),[ce,pe]=(0,i.useState)(!1),[ue,xe]=(0,i.useState)(!1),[he,ge]=(0,i.useState)(!1),[me,ye]=(0,i.useState)(!1),[fe,ve]=(0,i.useState)(null),[be,je]=(0,i.useState)(!1),[we,Fe]=(0,i.useState)(null),[Ae,_e]=(0,i.useState)([]),Ce=localStorage.getItem("auth_token"),Se=(0,i.useCallback)(async()=>{try{ee(!0);const e=await fetch("/api/subscriptions/my-plan",{headers:{Authorization:`Bearer ${Ce}`}}),n=await e.json();n.success?(Q(n),de(n.current.billing_cycle||"monthly")):te(n.message||"Failed to load subscription data")}catch{te("Failed to load subscription data")}finally{ee(!1)}},[Ce]);(0,i.useEffect)(()=>{Se()},[Se]);const Be=async()=>{if(ae&&p){je(!0),Fe(null);try{const e=await fetch("/api/subscriptions/change-plan",{method:"POST",headers:{Authorization:`Bearer ${Ce}`,"Content-Type":"application/json"},body:JSON.stringify({new_plan_id:ae.id,new_billing_cycle:le})}),n=await e.json();n.success?(ve(n),pe(!1),ye(!0),Se()):(n.exceeded&&_e(n.exceeded),Fe(n.message||"Failed to change plan"))}catch{Fe("Network error. Please try again.")}finally{je(!1)}}};if(X)return(0,h.jsx)(V,{children:d("settings:subscriptionTab.loadingSubscriptionData")});if(ne||!p)return(0,h.jsx)(B,{variant:"warning",children:ne||"Failed to load subscription data."});const{current:ke,pending_change:Ee,available_plans:ze}=p,Pe=(e,n)=>{const t=e.currency_prices[ke.currency];return t?"annual"===n?t.annual:t.monthly:"annual"===n?e.annual_price:e.monthly_price},Te=(e,n)=>{var t,i,r;if(e.is_current&&n===ke.billing_cycle)return null;if(e.is_current&&n!==ke.billing_cycle)return"cycle_change";const s=null!==(t=null===(i=ze.find(e=>e.is_current))||void 0===i?void 0:i.sort_order)&&void 0!==t?t:0;return(null!==(r=e.sort_order)&&void 0!==r?r:0)>s?"upgrade":"downgrade"};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(g,{children:[(0,h.jsxs)(m,{children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(y,{children:ke.plan_type}),(0,h.jsxs)(f,{children:[(0,u.vv)(ke.plan_amount,ke.currency)," / ","annual"===ke.billing_cycle?"year":"month",ke.discount_type&&"none"!==ke.discount_type&&ke.discount_value&&(0,h.jsxs)(h.Fragment,{children:[" ",(0,h.jsx)(v,{children:"(discount applied by administrator)"})]})]})]}),ke.can_change&&(0,h.jsx)(k,{onClick:()=>{se(!0),Fe(null)},children:"Change Plan"})]}),(0,h.jsxs)(b,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:d("settings:subscriptionTab.status")}),(0,h.jsx)(A,{status:ke.status,children:"active"===ke.status?"\u25cf Active":"trial"===ke.status?"\u25cf Trial":ke.status.charAt(0).toUpperCase()+ke.status.slice(1)})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:d("settings:subscriptionTab.billingCycle")}),(0,h.jsx)(F,{children:"annual"===ke.billing_cycle?"Annual":"Monthly"})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:d("settings:subscriptionTab.currentPeriod")}),(0,h.jsxs)(F,{children:[Z(ke.subscription_start)," \u2013 ",Z(ke.subscription_end)]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:d("settings:subscriptionTab.nextBilling")}),(0,h.jsx)(F,{children:Z(ke.next_billing_date)})]})]}),Ee&&(0,h.jsxs)(_,{children:[(0,h.jsx)(C,{children:"\u23f3 Scheduled Change"}),(0,h.jsxs)(S,{children:[(0,h.jsx)("strong",{children:"New Plan:"})," ",Ee.plan_type," (",(0,u.vv)(Ee.plan_amount,ke.currency),"/","annual"===Ee.billing_cycle?"year":"month",")",(0,h.jsx)("br",{}),(0,h.jsx)("strong",{children:"Effective:"})," ",Z(Ee.effective_date)," (next billing date)",(0,h.jsx)("br",{}),(0,h.jsx)("br",{}),"Your current features remain available until the change takes effect."]}),(0,h.jsx)(E,{onClick:()=>xe(!0),children:d("settings:subscriptionTab.cancelChange")})]}),!ke.can_change&&ke.change_blocked_reason&&(0,h.jsxs)(B,{variant:"overdue"===ke.status||"suspended"===ke.status?"warning":"info",children:[ke.change_blocked_reason,("overdue"===ke.status||"suspended"===ke.status)&&(0,h.jsx)("div",{style:{marginTop:"8px"},children:(0,h.jsx)(z,{onClick:()=>window.location.href=ie(),children:"Go to Invoices \u2192"})})]})]}),(0,h.jsxs)(o.aF,{isOpen:re,onClose:()=>se(!1),title:"Change Your Plan",size:"large",footer:(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>se(!1),children:d("settings:subscriptionTab.close")}),children:[(0,h.jsxs)(O,{children:[(0,h.jsx)("span",{style:{fontSize:"14px",color:"#6B7280"},children:"Billing:"}),(0,h.jsx)(N,{active:"monthly"===le,disabled:!1,onClick:()=>de("monthly"),children:"Monthly"}),(0,h.jsx)(N,{active:"annual"===le,disabled:"annual"===ke.billing_cycle,onClick:()=>{"annual"!==ke.billing_cycle&&de("annual")},children:"Annual"}),"annual"===ke.billing_cycle&&(0,h.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:d("settings:subscriptionTab.monthlyNotAvailableForAnnualPlans")})]}),(0,h.jsx)(P,{children:ze.map(e=>{const n=Pe(e,le),t=Te(e,le),i=e.is_current&&le===ke.billing_cycle;return(0,h.jsxs)(T,{isCurrent:i,onClick:()=>!i&&(e=>{if(e.is_current&&le===(null===p||void 0===p?void 0:p.current.billing_cycle))return;if(oe(e),Fe(null),_e([]),"annual"===(null===p||void 0===p?void 0:p.current.billing_cycle)&&"monthly"===le)return ge(!0),void se(!1);pe(!0),se(!1)})(e),children:[i&&(0,h.jsx)(D,{children:d("settings:subscriptionTab.current")}),(0,h.jsx)($,{children:e.display_name}),(0,h.jsxs)(I,{children:[(0,u.vv)(n,ke.currency)," ",(0,h.jsxs)("span",{children:["/ ","annual"===le?"year":"month"]})]}),(0,h.jsxs)("div",{style:{marginTop:"12px"},children:[(0,h.jsxs)(R,{children:[K(e.limits.orders)," orders/month"]}),(0,h.jsxs)(R,{children:[K(e.limits.menu_items)," menu items"]}),(0,h.jsxs)(R,{children:[K(e.limits.staff)," staff"]})]}),(0,h.jsx)(M,{}),!i&&t&&(0,h.jsxs)(L,{type:t,children:["upgrade"===t&&(0,h.jsxs)(h.Fragment,{children:["\u2191 Upgrade ",e.proration_estimate&&"trial"!==ke.status?(0,h.jsxs)(U,{children:[(0,u.vv)(e.proration_estimate.net_amount,ke.currency)," due now"]}):null]}),"downgrade"===t&&(0,h.jsx)(h.Fragment,{children:"\u2193 Downgrade \u2014 from next billing"}),"cycle_change"===t&&(0,h.jsx)(h.Fragment,{children:"Billing cycle change \u2014 from next billing"})]})]},e.id)})})]}),ae&&ce&&"upgrade"===Te(ae,le)&&(0,h.jsxs)(o.aF,{isOpen:ce,onClose:()=>pe(!1),title:(ke.status,`Upgrade to ${ae.display_name}`),footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>{pe(!1),se(!0)},children:d("settings:subscriptionTab.back")}),(0,h.jsx)(o.yl,{variant:"primary",onClick:Be,disabled:be,children:be?"Processing...":"Confirm Upgrade"})]}),children:["trial"===ke.status?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("p",{style:{color:"#6B7280",fontSize:"14px"},children:["You're currently on a free trial (",ke.plan_type,")."]}),(0,h.jsxs)(G,{children:[(0,h.jsxs)(Y,{children:["\u2713 ",ae.display_name," features available immediately"]}),(0,h.jsx)(Y,{children:"\u2713 No charge during your trial period"}),(0,h.jsxs)(Y,{children:["\u2713 First invoice (",(0,u.vv)(Pe(ae,le),ke.currency),"/","annual"===le?"year":"month",") after trial ends on ",Z(ke.subscription_end)]})]})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(G,{children:[(0,h.jsxs)(H,{children:[(0,h.jsx)("span",{children:d("settings:subscriptionTab.current")}),(0,h.jsxs)("span",{children:[ke.plan_type," \u2014 ",(0,u.vv)(ke.plan_amount,ke.currency),"/","annual"===ke.billing_cycle?"yr":"mo"]})]}),(0,h.jsxs)(H,{children:[(0,h.jsx)("span",{children:d("settings:subscriptionTab.new")}),(0,h.jsxs)("span",{children:[ae.display_name," \u2014 ",(0,u.vv)(Pe(ae,le),ke.currency),"/","annual"===le?"yr":"mo"]})]}),ae.proration_estimate&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(W,{}),(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"4px"},children:["Prorated charge for remaining period (",ae.proration_estimate.remaining_days," days)"]}),(0,h.jsxs)(H,{children:[(0,h.jsx)("span",{children:d("settings:subscriptionTab.newPlanCost")}),(0,h.jsx)("span",{children:(0,u.vv)(ae.proration_estimate.charge,ke.currency)})]}),(0,h.jsxs)(H,{children:[(0,h.jsx)("span",{children:d("settings:subscriptionTab.currentPlanCredit")}),(0,h.jsxs)("span",{children:["-",(0,u.vv)(ae.proration_estimate.credit,ke.currency)]})]}),(0,h.jsx)(W,{}),(0,h.jsxs)(H,{bold:!0,children:[(0,h.jsx)("span",{children:d("settings:subscriptionTab.proratedAmount")}),(0,h.jsx)("span",{children:(0,u.vv)(ae.proration_estimate.net_amount,ke.currency)})]})]})]}),(0,h.jsx)(Y,{children:"\u2713 New features available immediately"}),(0,h.jsxs)(Y,{children:["\u2713 Invoice due by ",Z(ke.next_billing_date)," (next billing date)"]}),(0,h.jsxs)(Y,{children:["\u2713 Next regular billing: ",Z(ke.next_billing_date)," at ",(0,u.vv)(Pe(ae,le),ke.currency),"/","annual"===le?"yr":"mo"]})]}),we&&(0,h.jsx)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"13px"},children:we})]}),ae&&ce&&("downgrade"===Te(ae,le)||"cycle_change"===Te(ae,le))&&(0,h.jsxs)(o.aF,{isOpen:ce,onClose:()=>pe(!1),title:"cycle_change"===Te(ae,le)?`Change to ${"annual"===le?"Annual":"Monthly"} Billing`:`Downgrade to ${ae.display_name}`,footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>{pe(!1),se(!0)},children:d("settings:subscriptionTab.back")}),(0,h.jsx)(o.yl,{variant:"primary",onClick:Be,disabled:be,children:be?"Processing...":"cycle_change"===Te(ae,le)?"Confirm Change":"Confirm Downgrade"})]}),children:[(0,h.jsxs)(G,{children:[(0,h.jsxs)(H,{children:[(0,h.jsx)("span",{children:d("settings:subscriptionTab.current")}),(0,h.jsxs)("span",{children:[ke.plan_type," \u2014 ",(0,u.vv)(ke.plan_amount,ke.currency),"/","annual"===ke.billing_cycle?"yr":"mo"]})]}),(0,h.jsxs)(H,{children:[(0,h.jsx)("span",{children:d("settings:subscriptionTab.new")}),(0,h.jsxs)("span",{children:[ae.display_name," \u2014 ",(0,u.vv)(Pe(ae,le),ke.currency),"/","annual"===le?"yr":"mo"]})]})]}),(0,h.jsxs)(q,{children:["\u26a0 Effective from ",Z(ke.next_billing_date)," (next billing date)"]}),"downgrade"===Te(ae,le)&&(0,h.jsxs)("div",{style:{marginTop:"12px"},children:[(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:["\u2022 Current features available until ",Z(ke.next_billing_date)]}),(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:["\u2022 After ",Z(ke.next_billing_date),":"]}),(0,h.jsxs)("div",{style:{paddingLeft:"16px"},children:[(0,h.jsxs)(J,{children:[(0,h.jsx)("span",{children:d("settings:subscriptionTab.orders")}),(0,h.jsxs)("span",{children:[K(null!==(e=null===p||void 0===p||null===(n=p.available_plans.find(e=>e.is_current))||void 0===n?void 0:n.limits.orders)&&void 0!==e?e:-1)," \u2192 ",K(ae.limits.orders),"/month"]})]}),(0,h.jsxs)(J,{children:[(0,h.jsx)("span",{children:d("settings:subscriptionTab.menuItems")}),(0,h.jsxs)("span",{children:[K(null!==(t=null===p||void 0===p||null===(r=p.available_plans.find(e=>e.is_current))||void 0===r?void 0:r.limits.menu_items)&&void 0!==t?t:-1)," \u2192 ",K(ae.limits.menu_items)]})]}),(0,h.jsxs)(J,{children:[(0,h.jsx)("span",{children:d("settings:subscriptionTab.staff")}),(0,h.jsxs)("span",{children:[K(null!==(s=null===p||void 0===p||null===(l=p.available_plans.find(e=>e.is_current))||void 0===l?void 0:l.limits.staff)&&void 0!==s?s:-1)," \u2192 ",K(ae.limits.staff)]})]})]}),(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:["\u2022 You can cancel this change anytime before ",Z(ke.next_billing_date)]})]}),we&&(0,h.jsxs)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"13px"},children:[we,Ae.length>0&&(0,h.jsx)("ul",{style:{margin:"8px 0 0 0",paddingLeft:"18px"},children:Ae.map((e,n)=>(0,h.jsx)("li",{children:e},n))})]})]}),(0,h.jsx)(o.aF,{isOpen:ue,onClose:()=>xe(!1),title:"Cancel Scheduled Change?",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>xe(!1),children:d("settings:subscriptionTab.keepScheduledChange")}),(0,h.jsx)(o.yl,{variant:"primary",onClick:async()=>{try{je(!0);const e=await fetch("/api/subscriptions/change-plan",{method:"DELETE",headers:{Authorization:`Bearer ${Ce}`}});(await e.json()).success&&(xe(!1),Se())}catch{}finally{je(!1)}},disabled:be,children:be?"Cancelling...":"Cancel Change"})]}),children:(0,h.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:["Your current plan (",ke.plan_type,", ",(0,u.vv)(ke.plan_amount,ke.currency),"/","annual"===ke.billing_cycle?"year":"month",") will continue without changes."]})}),(0,h.jsxs)(o.aF,{isOpen:he,onClose:()=>ge(!1),title:"Annual to Monthly",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>{ge(!1),window.location.href=(()=>{const e=null===c||void 0===c?void 0:c.role,n=(null===c||void 0===c?void 0:c.restaurantId)||(null===c||void 0===c?void 0:c.restaurant_id);return"Restaurant Admin"===e&&n?`/restaurant/${n}/support`:"Brand General"===e?"/pos/brand/general/system-inquiry":"Foodcourt General"===e?"/pos/foodcourt/general/system-inquiry":"Restaurant Owner"===e?"/pos/owner/system-inquiry":"/pos/profile"})()},children:d("settings:subscriptionTab.contactSupport")}),(0,h.jsx)(o.yl,{onClick:()=>ge(!1),children:d("settings:subscriptionTab.close")})]}),children:[(0,h.jsx)("p",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.6"},children:"Annual plans cannot be switched to monthly billing directly."}),(0,h.jsx)("p",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.6",marginTop:"12px"},children:"To change to monthly billing:"}),(0,h.jsxs)("ol",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.8",paddingLeft:"20px"},children:[(0,h.jsx)("li",{children:d("settings:subscriptionTab.contactSupportToRequestAFullRefundForTheRemainingAnnualPeriod")}),(0,h.jsx)("li",{children:d("settings:subscriptionTab.onceRefundedSubscribeToAMonthlyPlan")})]})]}),(0,h.jsx)(o.aF,{isOpen:me,onClose:()=>ye(!1),title:"upgrade"===(null===fe||void 0===fe?void 0:fe.change_type)?"Plan Upgraded":"Change Scheduled",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>ye(!1),children:d("settings:subscriptionTab.close")}),(null===fe||void 0===fe?void 0:fe.proration_invoice)&&(0,h.jsx)(o.yl,{variant:"primary",onClick:()=>{ye(!1),window.location.href=ie()},children:d("settings:subscriptionTab.goToInvoices")})]}),children:"upgrade"===(null===fe||void 0===fe?void 0:fe.change_type)?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(Y,{children:["\u2713 Plan upgraded to ",fe.new_plan]}),(0,h.jsx)(Y,{children:"\u2713 New features are now available"}),fe.proration_invoice&&(0,h.jsxs)("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"8px",fontSize:"13px",color:"#1E40AF"},children:["A prorated invoice of ",(0,u.vv)(fe.proration_invoice.amount,p.current.currency)," has been created (due by ",Z(fe.proration_invoice.due_date),")."]})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(Y,{children:["\u2713 ",null===fe||void 0===fe?void 0:fe.message]}),(0,h.jsx)("div",{style:{marginTop:"8px",fontSize:"13px",color:"#6B7280"},children:"Your current features remain available until the change takes effect."})]})})]})};var X=t(5370);const ee=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,ne=r.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,te=(r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }
`),ie=r.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,re=r.Ay.div`
  flex: 1;
`,se=r.Ay.div`
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,ae=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`,oe=r.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":case"Brand Manager":return"#FEE2E2";case"Foodcourt General":return"#FED7AA";case"Foodcourt Manager":case"Staff":return"#FEF3C7";case"Restaurant Admin":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,le=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,de=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,ce=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,pe=r.Ay.div`
  margin-bottom: 20px;
`,ue=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
`,xe=r.Ay.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,he=r.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,ge=r.Ay.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E5E7EB"};
  background: ${e=>"primary"===e.variant?"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7280"};
  
  &:hover {
    background: ${e=>"primary"===e.variant?"#5A51E6":"#F9FAFB"};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,me=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,ye=r.Ay.div`
  padding: 16px 12px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  text-align: center;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.05)":"white"};
  transition: all 0.2s;
`,fe=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`,ve=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,be=()=>{const{t:e}=(0,x.Bd)("settings"),{currentStaff:n,updateStaff:t,isLoggedIn:r}=(0,s.g)(),{user:u,isAuthenticated:g,updateUser:m,isLoading:y}=(0,a.As)(),[f,v]=(0,d.M)("profile"),[b,j]=(0,i.useState)({name:"",email:"",phone:"",department:"",company_name:""}),[w,F]=(0,i.useState)({currentPassword:"",newPassword:"",confirmPassword:""}),[A,_]=(0,i.useState)(""),[C,S]=(0,i.useState)(!1),[B,k]=(0,i.useState)(!1),[E,z]=(0,i.useState)(!1),[P,T]=(0,i.useState)(!1),D=(e,n)=>{j(t=>({...t,[e]:n})),$||(I(!0),N(!1))},[$,I]=(0,i.useState)(!1),[R,M]=(0,i.useState)(!1),[L,U]=(0,i.useState)(null),[O,N]=(0,i.useState)(!1),[G,H]=(0,i.useState)(!1),[W,Y]=(0,i.useState)(null),[q,J]=(0,i.useState)(!0);(0,i.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd04 Starting user data fetch..."),console.log("\ud83d\udd04 authUser:",u),console.log("\ud83d\udd04 authUser.id:",null===u||void 0===u?void 0:u.id),null!==u&&void 0!==u&&u.id)try{console.log("\ud83d\udd04 Fetching user from API, ID:",u.id);const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${u.id}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)throw new Error("Failed to fetch user");const t=await n.json(),i=t.data||t;console.log(" Fetched user:",i),Y(i)}catch(e){console.error("\u274c Failed to load user from database:",e)}else console.log(" No authUser ID available");J(!1)})()},[null===u||void 0===u?void 0:u.id]);const V=(0,i.useMemo)(()=>{const e=W||u;return e?{id:e.id,name:(null===W||void 0===W?void 0:W.full_name)||(null===W||void 0===W?void 0:W.name)||(null===u||void 0===u?void 0:u.name)||(null===u||void 0===u?void 0:u.full_name)||"Unknown",email:e.email,phone:e.phone||"",username:(null===W||void 0===W?void 0:W.username)||e.email,role:e.role,department:(null===W||void 0===W?void 0:W.department)||(null===W||void 0===W?void 0:W.position)||("System Admin"===e.role?"System Administration":"Administration"),company_name:(null===W||void 0===W?void 0:W.company_name)||("System Admin"===e.role?"Purple Here Technologies Sdn Bhd":""),joinDate:(null===W||void 0===W?void 0:W.createdAt)||(new Date).toISOString(),lastLogin:(new Date).toISOString(),schedule:{monday:{active:!0,start:"09:00",end:"17:00"},tuesday:{active:!0,start:"09:00",end:"17:00"},wednesday:{active:!0,start:"09:00",end:"17:00"},thursday:{active:!0,start:"09:00",end:"17:00"},friday:{active:!0,start:"09:00",end:"17:00"},saturday:{active:!1,start:"09:00",end:"17:00"},sunday:{active:!1,start:"09:00",end:"17:00"}}}:null},[W,u]);(0,i.useEffect)(()=>{W&&(console.log("\ud83d\udc64 Profile Page - DB User Data:",{full_name:W.full_name,username:W.username,email:W.email,role:W.role,department:W.department,position:W.position,createdAt:W.createdAt,updatedAt:W.updatedAt}),console.log("\ud83d\udc64 Profile Page - Current User:",V))},[W]);const[Z,K]=(0,i.useState)(!1);(0,i.useEffect)(()=>{if(W&&!Z){console.log("\ud83d\udd25 Initializing formData from dbUser:",W);const e={name:W.full_name||W.name||"",email:W.email||"",phone:W.phone||"",department:W.department||W.position||"",company_name:W.company_name||""};console.log("\ud83d\udd25 New formData from DB:",e),j(e),I(!1),K(!0)}else if(V&&""===b.name&&!W){console.log("\ud83d\udd25 Initializing formData from authUser (fallback):",V);const e={name:V.name||"",email:V.email||"",phone:V.phone||"",department:V.department||"",company_name:V.company_name||""};j(e),I(!1)}},[W,V,Z]),(0,i.useEffect)(()=>{if(V){const e=b.name!==V.name||b.email!==V.email||b.phone!==V.phone||b.department!==(V.department||"")||b.company_name!==(V.company_name||"");I(e),e&&O&&N(!1)}},[b,V,O]);const be=e=>{v(e)},je=async()=>{await(async e=>{if(e.preventDefault(),console.log("\ud83d\udd25 handleSubmit called"),console.log("\ud83d\udd25 currentUser:",V),console.log("\ud83d\udd25 hasChanges:",$),console.log("\ud83d\udd25 formData:",b),console.log("\ud83d\udd25 dbUser:",W),console.log("\ud83d\udd25 authUser:",u),V&&$&&!G)try{if(H(!0),N(!1),W&&null!==u&&void 0!==u&&u.id){const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${u.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:b.name,email:b.email,phone:b.phone,department:b.department,company_name:b.company_name})});if(!n.ok){const e=await n.json().catch(()=>null);throw new Error((null===e||void 0===e?void 0:e.message)||(null===e||void 0===e?void 0:e.error)||"Failed to update profile")}const t=await fetch(`/api/users/${u.id}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),n=e.data||e;Y(n),j({name:n.full_name||"",email:n.email||"",phone:n.phone||"",department:n.department||"",company_name:n.company_name||""}),K(!0)}m({name:b.name,email:b.email}),I(!1),N(!0),setTimeout(()=>N(!1),3e3)}}catch(n){console.error("Failed to update profile:",n),N(!1),j(e=>({...e})),window.alert(n.message||"Failed to save profile")}finally{H(!1)}})({preventDefault:()=>{}})};(0,i.useEffect)(()=>{const e=e=>{if($)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>window.removeEventListener("beforeunload",e)},[$]);const we=(e,n,t)=>{U(i=>({...i,[e]:{...i[e],[n]:t}}))};return y||q?(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(ee,{children:[(0,h.jsx)(p.Ay,{title:"My Profile"}),(0,h.jsx)(ne,{children:(0,h.jsx)(de,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:(0,h.jsx)("div",{children:e("settings:profilePage.loadingProfile")})})})})]})}):g&&V?(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(ee,{children:[(0,h.jsx)(p.Ay,{title:"My Profile"}),(0,h.jsxs)(ne,{children:[(0,h.jsxs)(te,{children:[(0,h.jsx)(ie,{role:V.role,children:(e=>{if(!e)return"?";const n=e.trim().split(" ").filter(e=>e.length>0);return 0===n.length?"?":1===n.length?n[0].substring(0,2).toUpperCase():n.slice(0,2).map(e=>e[0]).join("").toUpperCase()})(V.name)}),(0,h.jsxs)(re,{children:[(0,h.jsxs)(se,{children:[V.name," ",W&&(0,h.jsx)("span",{style:{fontSize:"12px",color:"#10B981",fontWeight:"normal"},children:"\u2713 DB"})]}),(0,h.jsxs)(ae,{children:[(0,h.jsx)(oe,{role:V.role,children:V.role}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",textTransform:"capitalize"},children:V.department})]}),(0,h.jsxs)(le,{children:["Member since ",(Fe=V.joinDate,new Date(Fe).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))," \u2022 Last login ",(e=>{if(!e)return"Never";const n=new Date(e),t=(new Date).getTime()-n.getTime(),i=Math.floor(t/36e5);if(i<1)return"Just now";if(i<24)return`${i}h ago`;return`${Math.floor(i/24)}d ago`})(V.lastLogin),W&&(0,h.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"8px"},children:["\u2022 Database ID: ",W.id]})]})]})]}),(0,h.jsxs)(l.tU,{children:[(0,h.jsx)(l.oz,{active:"profile"===f,onClick:()=>be("profile"),children:"Personal Information"}),["Restaurant Admin","Brand General","Foodcourt General","Restaurant Owner"].includes(V.role)&&!(null!==W&&void 0!==W&&W.is_demo)&&(0,h.jsx)(l.oz,{active:"subscription"===f,onClick:()=>be("subscription"),children:"Subscription"}),(0,h.jsx)(l.oz,{active:"schedule"===f,onClick:()=>be("schedule"),children:"Work Schedule"}),(0,h.jsx)(l.oz,{active:"security"===f,onClick:()=>be("security"),children:"Change Password"})]}),"profile"===f&&(0,h.jsx)(de,{children:(0,h.jsx)("div",{children:(0,h.jsxs)(ce,{children:[(0,h.jsxs)(pe,{children:[(0,h.jsx)(ue,{children:e("settings:profilePage.fullName")}),(0,h.jsx)(X.A,{onSave:je,children:(0,h.jsx)(xe,{type:"text",value:b.name||"",onChange:e=>{D("name",e.target.value)},placeholder:"Enter full name"})})]}),(0,h.jsxs)(pe,{children:[(0,h.jsx)(ue,{children:e("settings:profilePage.role")}),(0,h.jsx)(xe,{type:"text",value:V.role,disabled:!0})]}),(0,h.jsxs)(pe,{children:[(0,h.jsx)(ue,{children:e("settings:profilePage.emailAddress")}),(0,h.jsx)(X.A,{onSave:je,children:(0,h.jsx)(xe,{type:"email",value:b.email||"",onChange:e=>D("email",e.target.value),placeholder:"Enter email address"})})]}),(0,h.jsxs)(pe,{children:[(0,h.jsx)(ue,{children:e("settings:profilePage.username")}),(0,h.jsx)(xe,{type:"text",value:V.username,disabled:!0})]}),(0,h.jsxs)(pe,{children:[(0,h.jsx)(ue,{children:e("settings:profilePage.phoneNumber")}),(0,h.jsx)(X.A,{onSave:je,children:(0,h.jsx)(c.A,{value:b.phone||"",onChange:e=>D("phone",e)})})]}),"System Admin"===V.role&&(0,h.jsxs)(pe,{children:[(0,h.jsx)(ue,{children:e("settings:profilePage.companyName")}),(0,h.jsx)(X.A,{onSave:je,children:(0,h.jsx)(xe,{type:"text",value:b.company_name||"",onChange:e=>D("company_name",e.target.value),placeholder:"Enter company name"})})]}),(0,h.jsxs)(pe,{children:[(0,h.jsx)(ue,{children:e("settings:profilePage.department")}),(0,h.jsx)(X.A,{onSave:je,children:(0,h.jsx)(xe,{type:"text",value:b.department||"",onChange:e=>D("department",e.target.value),placeholder:"Enter department"})})]})]})})}),"subscription"===f&&(0,h.jsx)(Q,{}),"schedule"===f&&(0,h.jsxs)(de,{children:[(0,h.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:"20px"},children:("System Admin"===(null===V||void 0===V?void 0:V.role)||"manager"===(null===V||void 0===V?void 0:V.role))&&(0,h.jsx)(ge,{variant:"primary",style:{flex:"none",padding:"10px 16px",fontSize:"14px",minWidth:"120px"},onClick:()=>{V&&(U({...V.schedule}),M(!0))},children:"Edit Schedule"})}),"System Admin"!==(null===V||void 0===V?void 0:V.role)&&"manager"!==(null===V||void 0===V?void 0:V.role)&&(0,h.jsx)("div",{style:{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"\u2139\ufe0f Work schedules are managed by administrators and managers. Contact your manager to make changes."}),(0,h.jsx)(me,{children:Object.entries(V.schedule).map(e=>{let[n,t]=e;return(0,h.jsxs)(ye,{active:t.active,children:[(0,h.jsx)(fe,{children:n}),(0,h.jsx)(ve,{children:t.active?`${t.start} - ${t.end}`:"Off"})]},n)})})]}),"security"===f&&(0,h.jsx)(de,{children:(0,h.jsxs)("div",{children:[(0,h.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"6px",color:"#0C4A6E",fontSize:"13px",marginBottom:"20px",lineHeight:"1.5"},children:[(0,h.jsx)("strong",{children:"Password Requirements:"}),(0,h.jsxs)("ul",{style:{margin:"6px 0 0 0",paddingLeft:"18px"},children:[(0,h.jsx)("li",{children:e("settings:profilePage.atLeast8Characters")}),(0,h.jsx)("li",{children:e("settings:profilePage.atLeastOneLowercaseLetterAz")}),(0,h.jsx)("li",{children:e("settings:profilePage.atLeastOneUppercaseLetterAz")}),(0,h.jsx)("li",{children:e("settings:profilePage.atLeastOneNumber09")})]})]}),(0,h.jsxs)(ce,{children:[(0,h.jsxs)(pe,{children:[(0,h.jsx)(ue,{children:e("settings:profilePage.currentPassword")}),(0,h.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,h.jsx)(xe,{type:B?"text":"password",value:w.currentPassword,onChange:e=>F({...w,currentPassword:e.target.value}),placeholder:"Enter current password",style:{paddingRight:"42px"}}),(0,h.jsx)("button",{type:"button",onClick:()=>k(!B),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:B?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,h.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,h.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]}),(0,h.jsxs)(pe,{children:[(0,h.jsx)(ue,{children:e("settings:profilePage.newPassword")}),(0,h.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,h.jsx)(xe,{type:E?"text":"password",value:w.newPassword,onChange:e=>F({...w,newPassword:e.target.value}),placeholder:"Min 8 chars, uppercase + lowercase + number",style:{paddingRight:"42px"}}),(0,h.jsx)("button",{type:"button",onClick:()=>z(!E),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:E?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,h.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,h.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]}),(0,h.jsxs)(pe,{children:[(0,h.jsx)(ue,{children:e("settings:profilePage.confirmNewPassword")}),(0,h.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,h.jsx)(xe,{type:P?"text":"password",value:w.confirmPassword,onChange:e=>F({...w,confirmPassword:e.target.value}),placeholder:"Confirm new password",style:{paddingRight:"42px"}}),(0,h.jsx)("button",{type:"button",onClick:()=>T(!P),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:P?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,h.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,h.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]})]}),A&&(0,h.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"14px",marginTop:"20px"},children:A}),C&&(0,h.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#ECFDF5",border:"1px solid #10B981",borderRadius:"6px",color:"#047857",fontSize:"14px",marginTop:"20px"},children:"Password changed successfully!"}),(0,h.jsx)(he,{children:(0,h.jsx)(ge,{variant:"primary",onClick:async()=>{if(_(""),S(!1),w.currentPassword&&w.newPassword&&w.confirmPassword)if(w.newPassword.length<8)_("Password must be at least 8 characters long");else if(/[a-z]/.test(w.newPassword))if(/[A-Z]/.test(w.newPassword))if(/[0-9]/.test(w.newPassword))if(w.newPassword===w.confirmPassword)if(w.currentPassword!==w.newPassword)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${null===V||void 0===V?void 0:V.id}/password`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currentPassword:w.currentPassword,newPassword:w.newPassword})});if(!n.ok){const e=await n.json();return void _(e.error||"Failed to change password")}S(!0),F({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{S(!1)},5e3)}catch(e){console.error("Error changing password:",e),_("An error occurred while changing password")}else _("New password must be different from current password");else _("New passwords do not match");else _("Password must contain at least one number");else _("Password must contain at least one uppercase letter");else _("Password must contain at least one lowercase letter");else _("All fields are required")},children:"Change Password"})})]})})]}),(0,h.jsx)(o.aF,{isOpen:R,onClose:()=>M(!1),title:"Edit Schedule",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>M(!1),children:"Cancel"}),(0,h.jsx)(o.yl,{onClick:async()=>{V&&L&&(n&&await t(n.id,{schedule:L}),M(!1),U(null))},children:"Save Schedule"})]}),children:L&&(0,h.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Object.entries(L).map(e=>{let[n,t]=e;return(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #F3F4F6"},children:[(0,h.jsx)("div",{style:{fontWeight:"500",textTransform:"capitalize",fontSize:"14px",color:"#374151"},children:n}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"14px",minWidth:"80px"},children:[(0,h.jsx)("input",{type:"checkbox",checked:t.active,onChange:e=>we(n,"active",e.target.checked),style:{cursor:"pointer"}}),(0,h.jsx)("span",{style:{color:t.active?"#059669":"#6B7280"},children:t.active?"Active":"Off"})]}),t.active&&(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)("input",{type:"time",value:t.start,onChange:e=>we(n,"start",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}}),(0,h.jsx)("span",{style:{color:"#9CA3AF",fontSize:"14px"},children:"-"}),(0,h.jsx)("input",{type:"time",value:t.end,onChange:e=>we(n,"end",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}})]})]})]},n)})})})]})}):(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(ee,{children:[(0,h.jsx)(p.Ay,{title:"My Profile"}),(0,h.jsx)(ne,{children:(0,h.jsx)(de,{children:(0,h.jsxs)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:[(0,h.jsx)("div",{style:{fontSize:"18px",marginBottom:"8px"},children:e("settings:profilePage.pleaseLogInToViewYourProfile")}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:e("settings:profilePage.youNeedToBeLoggedInToAccessThisPage")})]})})})]})});var Fe}}}]);