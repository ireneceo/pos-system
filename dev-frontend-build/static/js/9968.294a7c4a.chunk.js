"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9968],{2653:(e,n,i)=>{i.d(n,{M:()=>s});var r=i(9950),t=i(4492);function s(e){const[n,i]=(0,t.ok)(),s=(0,r.useCallback)(()=>n.get("tab")||e,[n,e]),[a,o]=(0,r.useState)(s());return[a,(0,r.useCallback)(e=>{o(e),i({tab:e})},[i])]}},5370:(e,n,i)=>{i.d(n,{A:()=>b});var r=i(9950),t=i(4752),s=i(4414);const a=t.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,o=t.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=t.i7`
  to { transform: rotate(360deg); }
`,d=t.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=t.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?t.AH`${o} 0.3s ease forwards`:t.AH`${a} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=t.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,u=t.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,x=t.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,h=t.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=t.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,m=t.Ay.span`
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
`,y=t.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,f=t.Ay.span`
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
`,v=(0,r.forwardRef)((e,n)=>{let{children:i,onSave:t,type:a="input",debounceMs:o=2e3,style:l}=e;const[c,v]=(0,r.useState)("idle"),[b,j]=(0,r.useState)(!1),w=(0,r.useRef)(null),F=(0,r.useRef)(null),A=(0,r.useRef)(null),_=(0,r.useRef)(!0),C=(0,r.useRef)(t);C.current=t;const S=(0,r.useCallback)(()=>{w.current&&clearTimeout(w.current),F.current&&clearTimeout(F.current),A.current&&clearTimeout(A.current)},[]),B=2e3!==o?o:"toggle"===a||"select"===a||"list"===a||"image"===a?300:o,k=(0,r.useCallback)(()=>{S(),j(!1),v("saving"),w.current=setTimeout(async()=>{if(_.current)try{if(await C.current(),!_.current)return;v("saved"),F.current=setTimeout(()=>{_.current&&(j(!0),A.current=setTimeout(()=>{_.current&&(v("idle"),j(!1))},300))},2e3)}catch{if(!_.current)return;v("error"),F.current=setTimeout(()=>{_.current&&(j(!0),A.current=setTimeout(()=>{_.current&&(v("idle"),j(!1))},300))},4e3)}},B)},[B,S]);(0,r.useImperativeHandle)(n,()=>({triggerSave:k}),[k]),(0,r.useEffect)(()=>(_.current=!0,()=>{_.current=!1,S()}),[S]);const E=r.Children.map(i,e=>{if(!r.isValidElement(e))return e;const n=e.props.onChange;return"function"!==typeof n?e:r.cloneElement(e,{onChange:function(){n(...arguments),k()}})}),z="saving"===c?(0,s.jsx)(y,{}):"saved"===c?(0,s.jsx)(m,{children:"\u2713"}):"error"===c?(0,s.jsx)(f,{children:"!"}):null,P="select"===a?u:"toggle"===a?x:"image"===a?h:"list"===a?g:p;return(0,s.jsxs)(d,{$type:a,style:l,children:[E,"idle"!==c&&(0,s.jsx)(P,{$fading:b,children:z})]})});v.displayName="AutoSaveField";const b=v},9968:(e,n,i)=>{i.r(n),i.d(n,{default:()=>je});var r=i(9950),t=i(4752),s=i(5781),a=i(1367),o=i(9610),l=i(2597),d=i(2653),c=i(8666),p=i(8012),u=i(6038),x=i(5030),h=i(9955),g=i(4414);const m=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,y=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`,f=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,v=t.Ay.div`
  font-size: 16px;
  color: #6B7280;
`,b=t.Ay.span`
  font-size: 13px;
  color: #059669;
  font-style: italic;
`,j=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,w=t.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F9FAFB;
  border-radius: 8px;
`,F=t.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,A=t.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,_=t.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#EFF6FF";case"overdue":return"#FEF3C7";case"suspended":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#2563EB";case"overdue":return"#D97706";case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,C=t.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`,S=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`,B=t.Ay.div`
  font-size: 13px;
  color: #78350F;
  line-height: 1.5;
`,k=t.Ay.div`
  background: ${e=>"warning"===e.variant?"#FEF3C7":"#EFF6FF"};
  border: 1px solid ${e=>"warning"===e.variant?"#FDE68A":"#BFDBFE"};
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  font-size: 13px;
  color: ${e=>"warning"===e.variant?"#92400E":"#1E40AF"};
  line-height: 1.5;
`,E=t.Ay.button`
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
`,z=t.Ay.button`
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
`,P=t.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;

  &:hover { color: #5046E5; }
`,T=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
`,D=t.Ay.div`
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
`,$=t.Ay.div`
  position: absolute;
  top: -10px;
  right: 16px;
  background: #635BFF;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
`,I=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,R=t.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 4px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #6B7280;
  }
`,M=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  padding: 3px 0;
`,L=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,U=t.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: ${e=>"upgrade"===e.type?"#059669":"#D97706"};
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`,O=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,N=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`,G=t.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#F8F7FF":"white"};
  color: ${e=>e.disabled?"#D1D5DB":e.active?"#635BFF":"#6B7280"};
  font-size: 14px;
  font-weight: 500;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.5:1};
`,H=t.Ay.div`
  background: #F9FAFB;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 20px;
  margin: 16px 0;
`,W=t.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: ${e=>e.bold?"15px":"14px"};
  font-weight: ${e=>e.bold?"600":"400"};
  color: ${e=>e.highlight?"#059669":"#1F2937"};
`,Y=t.Ay.hr`
  border: none;
  border-top: 1px dashed #D1D5DB;
  margin: 8px 0;
`,q=t.Ay.div`
  font-size: 13px;
  color: #059669;
  padding: 3px 0;
`,J=t.Ay.div`
  font-size: 13px;
  color: #D97706;
  padding: 3px 0;
`,V=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  padding: 3px 0;
  display: flex;
  justify-content: space-between;
`,Z=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`;function K(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"-"}function Q(e){return-1===e?"Unlimited":String(e)}const X=()=>{var e,n,i,t,s,l;const{t:d}=(0,x.Bd)("settings"),{user:c}=(0,a.As)(),[p,X]=(0,r.useState)(null),[ee,ne]=(0,r.useState)(!0),[ie,re]=(0,r.useState)(null),te=()=>{const e=null===c||void 0===c?void 0:c.role,n=(null===c||void 0===c?void 0:c.restaurantId)||(null===c||void 0===c?void 0:c.restaurant_id);return"Restaurant Admin"===e&&n?`/restaurant/${n}/invoices`:"Brand General"===e?"/pos/brand/invoices":"Foodcourt General"===e?"/pos/foodcourt/invoices":"Restaurant Owner"===e?"/pos/owner/invoices":"/pos/profile"},[se,ae]=(0,r.useState)(!1),[oe,le]=(0,r.useState)(null),[de,ce]=(0,r.useState)("monthly"),[pe,ue]=(0,r.useState)(!1),[xe,he]=(0,r.useState)(!1),[ge,me]=(0,r.useState)(!1),[ye,fe]=(0,r.useState)(!1),[ve,be]=(0,r.useState)(null),[je,we]=(0,r.useState)(!1),[Fe,Ae]=(0,r.useState)(null),[_e,Ce]=(0,r.useState)([]),Se=(0,h.c4)(),Be=(0,r.useCallback)(async()=>{try{ne(!0);const e=await fetch("/api/subscriptions/my-plan",{headers:{Authorization:`Bearer ${Se}`}}),n=await e.json();n.success?(X(n),ce(n.current.billing_cycle||"monthly")):re(n.message||"Failed to load subscription data")}catch{re("Failed to load subscription data")}finally{ne(!1)}},[Se]);(0,r.useEffect)(()=>{Be()},[Be]);const ke=async()=>{if(oe&&p){we(!0),Ae(null);try{const e=await fetch("/api/subscriptions/change-plan",{method:"POST",headers:{Authorization:`Bearer ${Se}`,"Content-Type":"application/json"},body:JSON.stringify({new_plan_id:oe.id,new_billing_cycle:de})}),n=await e.json();n.success?(be(n),ue(!1),fe(!0),Be()):(n.exceeded&&Ce(n.exceeded),Ae(n.message||"Failed to change plan"))}catch{Ae("Network error. Please try again.")}finally{we(!1)}}};if(ee)return(0,g.jsx)(Z,{children:d("settings:subscriptionTab.loadingSubscriptionData")});if(ie||!p)return(0,g.jsx)(k,{variant:"warning",children:ie||"Failed to load subscription data."});const{current:Ee,pending_change:ze,available_plans:Pe}=p,Te=(e,n)=>{const i=e.currency_prices[Ee.currency];return i?"annual"===n?i.annual:i.monthly:"annual"===n?e.annual_price:e.monthly_price},De=(e,n)=>{var i,r,t;if(e.is_current&&n===Ee.billing_cycle)return null;if(e.is_current&&n!==Ee.billing_cycle)return"cycle_change";const s=null!==(i=null===(r=Pe.find(e=>e.is_current))||void 0===r?void 0:r.sort_order)&&void 0!==i?i:0;return(null!==(t=e.sort_order)&&void 0!==t?t:0)>s?"upgrade":"downgrade"};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(m,{children:[(0,g.jsxs)(y,{children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(f,{children:Ee.plan_type}),(0,g.jsxs)(v,{children:[(0,u.vv)(Ee.plan_amount,Ee.currency)," / ","annual"===Ee.billing_cycle?"year":"month",Ee.discount_type&&"none"!==Ee.discount_type&&Ee.discount_value&&(0,g.jsxs)(g.Fragment,{children:[" ",(0,g.jsx)(b,{children:"(discount applied by administrator)"})]})]})]}),Ee.can_change&&(0,g.jsx)(E,{onClick:()=>{ae(!0),Ae(null)},children:"Change Plan"})]}),(0,g.jsxs)(j,{children:[(0,g.jsxs)(w,{children:[(0,g.jsx)(F,{children:d("settings:subscriptionTab.status")}),(0,g.jsx)(_,{status:Ee.status,children:"active"===Ee.status?"\u25cf Active":"trial"===Ee.status?"\u25cf Trial":Ee.status.charAt(0).toUpperCase()+Ee.status.slice(1)})]}),(0,g.jsxs)(w,{children:[(0,g.jsx)(F,{children:d("settings:subscriptionTab.billingCycle")}),(0,g.jsx)(A,{children:"annual"===Ee.billing_cycle?"Annual":"Monthly"})]}),(0,g.jsxs)(w,{children:[(0,g.jsx)(F,{children:d("settings:subscriptionTab.currentPeriod")}),(0,g.jsxs)(A,{children:[K(Ee.subscription_start)," \u2013 ",K(Ee.subscription_end)]})]}),(0,g.jsxs)(w,{children:[(0,g.jsx)(F,{children:d("settings:subscriptionTab.nextBilling")}),(0,g.jsx)(A,{children:K(Ee.next_billing_date)})]})]}),ze&&(0,g.jsxs)(C,{children:[(0,g.jsx)(S,{children:"\u23f3 Scheduled Change"}),(0,g.jsxs)(B,{children:[(0,g.jsx)("strong",{children:"New Plan:"})," ",ze.plan_type," (",(0,u.vv)(ze.plan_amount,Ee.currency),"/","annual"===ze.billing_cycle?"year":"month",")",(0,g.jsx)("br",{}),(0,g.jsx)("strong",{children:"Effective:"})," ",K(ze.effective_date)," (next billing date)",(0,g.jsx)("br",{}),(0,g.jsx)("br",{}),"Your current features remain available until the change takes effect."]}),(0,g.jsx)(z,{onClick:()=>he(!0),children:d("settings:subscriptionTab.cancelChange")})]}),!Ee.can_change&&Ee.change_blocked_reason&&(0,g.jsxs)(k,{variant:"overdue"===Ee.status||"suspended"===Ee.status?"warning":"info",children:[Ee.change_blocked_reason,("overdue"===Ee.status||"suspended"===Ee.status)&&(0,g.jsx)("div",{style:{marginTop:"8px"},children:(0,g.jsx)(P,{onClick:()=>window.location.href=te(),children:"Go to Invoices \u2192"})})]})]}),(0,g.jsxs)(o.aF,{isOpen:se,onClose:()=>ae(!1),title:"Change Your Plan",size:"large",footer:(0,g.jsx)(o.yl,{variant:"secondary",onClick:()=>ae(!1),children:d("settings:subscriptionTab.close")}),children:[(0,g.jsxs)(N,{children:[(0,g.jsx)("span",{style:{fontSize:"14px",color:"#6B7280"},children:"Billing:"}),(0,g.jsx)(G,{active:"monthly"===de,disabled:!1,onClick:()=>ce("monthly"),children:"Monthly"}),(0,g.jsx)(G,{active:"annual"===de,disabled:"annual"===Ee.billing_cycle,onClick:()=>{"annual"!==Ee.billing_cycle&&ce("annual")},children:"Annual"}),"annual"===Ee.billing_cycle&&(0,g.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:d("settings:subscriptionTab.monthlyNotAvailableForAnnualPlans")})]}),(0,g.jsx)(T,{children:Pe.map(e=>{const n=Te(e,de),i=De(e,de),r=e.is_current&&de===Ee.billing_cycle;return(0,g.jsxs)(D,{isCurrent:r,onClick:()=>!r&&(e=>{if(e.is_current&&de===(null===p||void 0===p?void 0:p.current.billing_cycle))return;if(le(e),Ae(null),Ce([]),"annual"===(null===p||void 0===p?void 0:p.current.billing_cycle)&&"monthly"===de)return me(!0),void ae(!1);ue(!0),ae(!1)})(e),children:[r&&(0,g.jsx)($,{children:d("settings:subscriptionTab.current")}),(0,g.jsx)(I,{children:e.display_name}),(0,g.jsxs)(R,{children:[(0,u.vv)(n,Ee.currency)," ",(0,g.jsxs)("span",{children:["/ ","annual"===de?"year":"month"]})]}),(0,g.jsxs)("div",{style:{marginTop:"12px"},children:[(0,g.jsxs)(M,{children:[Q(e.limits.orders)," orders/month"]}),(0,g.jsxs)(M,{children:[Q(e.limits.menu_items)," menu items"]}),(0,g.jsxs)(M,{children:[Q(e.limits.staff)," staff"]})]}),(0,g.jsx)(L,{}),!r&&i&&(0,g.jsxs)(U,{type:i,children:["upgrade"===i&&(0,g.jsxs)(g.Fragment,{children:["\u2191 Upgrade ",e.proration_estimate&&"trial"!==Ee.status?(0,g.jsxs)(O,{children:[(0,u.vv)(e.proration_estimate.net_amount,Ee.currency)," due now"]}):null]}),"downgrade"===i&&(0,g.jsx)(g.Fragment,{children:"\u2193 Downgrade \u2014 from next billing"}),"cycle_change"===i&&(0,g.jsx)(g.Fragment,{children:"Billing cycle change \u2014 from next billing"})]})]},e.id)})})]}),oe&&pe&&"upgrade"===De(oe,de)&&(0,g.jsxs)(o.aF,{isOpen:pe,onClose:()=>ue(!1),title:(Ee.status,`Upgrade to ${oe.display_name}`),footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.yl,{variant:"secondary",onClick:()=>{ue(!1),ae(!0)},children:d("settings:subscriptionTab.back")}),(0,g.jsx)(o.yl,{variant:"primary",onClick:ke,disabled:je,children:je?"Processing...":"Confirm Upgrade"})]}),children:["trial"===Ee.status?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("p",{style:{color:"#6B7280",fontSize:"14px"},children:["You're currently on a free trial (",Ee.plan_type,")."]}),(0,g.jsxs)(H,{children:[(0,g.jsxs)(q,{children:["\u2713 ",oe.display_name," features available immediately"]}),(0,g.jsx)(q,{children:"\u2713 No charge during your trial period"}),(0,g.jsxs)(q,{children:["\u2713 First invoice (",(0,u.vv)(Te(oe,de),Ee.currency),"/","annual"===de?"year":"month",") after trial ends on ",K(Ee.subscription_end)]})]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(H,{children:[(0,g.jsxs)(W,{children:[(0,g.jsx)("span",{children:d("settings:subscriptionTab.current")}),(0,g.jsxs)("span",{children:[Ee.plan_type," \u2014 ",(0,u.vv)(Ee.plan_amount,Ee.currency),"/","annual"===Ee.billing_cycle?"yr":"mo"]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)("span",{children:d("settings:subscriptionTab.new")}),(0,g.jsxs)("span",{children:[oe.display_name," \u2014 ",(0,u.vv)(Te(oe,de),Ee.currency),"/","annual"===de?"yr":"mo"]})]}),oe.proration_estimate&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Y,{}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"4px"},children:["Prorated charge for remaining period (",oe.proration_estimate.remaining_days," days)"]}),(0,g.jsxs)(W,{children:[(0,g.jsx)("span",{children:d("settings:subscriptionTab.newPlanCost")}),(0,g.jsx)("span",{children:(0,u.vv)(oe.proration_estimate.charge,Ee.currency)})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)("span",{children:d("settings:subscriptionTab.currentPlanCredit")}),(0,g.jsxs)("span",{children:["-",(0,u.vv)(oe.proration_estimate.credit,Ee.currency)]})]}),(0,g.jsx)(Y,{}),(0,g.jsxs)(W,{bold:!0,children:[(0,g.jsx)("span",{children:d("settings:subscriptionTab.proratedAmount")}),(0,g.jsx)("span",{children:(0,u.vv)(oe.proration_estimate.net_amount,Ee.currency)})]})]})]}),(0,g.jsx)(q,{children:"\u2713 New features available immediately"}),(0,g.jsxs)(q,{children:["\u2713 Invoice due by ",K(Ee.next_billing_date)," (next billing date)"]}),(0,g.jsxs)(q,{children:["\u2713 Next regular billing: ",K(Ee.next_billing_date)," at ",(0,u.vv)(Te(oe,de),Ee.currency),"/","annual"===de?"yr":"mo"]})]}),Fe&&(0,g.jsx)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"13px"},children:Fe})]}),oe&&pe&&("downgrade"===De(oe,de)||"cycle_change"===De(oe,de))&&(0,g.jsxs)(o.aF,{isOpen:pe,onClose:()=>ue(!1),title:"cycle_change"===De(oe,de)?`Change to ${"annual"===de?"Annual":"Monthly"} Billing`:`Downgrade to ${oe.display_name}`,footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.yl,{variant:"secondary",onClick:()=>{ue(!1),ae(!0)},children:d("settings:subscriptionTab.back")}),(0,g.jsx)(o.yl,{variant:"primary",onClick:ke,disabled:je,children:je?"Processing...":"cycle_change"===De(oe,de)?"Confirm Change":"Confirm Downgrade"})]}),children:[(0,g.jsxs)(H,{children:[(0,g.jsxs)(W,{children:[(0,g.jsx)("span",{children:d("settings:subscriptionTab.current")}),(0,g.jsxs)("span",{children:[Ee.plan_type," \u2014 ",(0,u.vv)(Ee.plan_amount,Ee.currency),"/","annual"===Ee.billing_cycle?"yr":"mo"]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)("span",{children:d("settings:subscriptionTab.new")}),(0,g.jsxs)("span",{children:[oe.display_name," \u2014 ",(0,u.vv)(Te(oe,de),Ee.currency),"/","annual"===de?"yr":"mo"]})]})]}),(0,g.jsxs)(J,{children:["\u26a0 Effective from ",K(Ee.next_billing_date)," (next billing date)"]}),"downgrade"===De(oe,de)&&(0,g.jsxs)("div",{style:{marginTop:"12px"},children:[(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:["\u2022 Current features available until ",K(Ee.next_billing_date)]}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:["\u2022 After ",K(Ee.next_billing_date),":"]}),(0,g.jsxs)("div",{style:{paddingLeft:"16px"},children:[(0,g.jsxs)(V,{children:[(0,g.jsx)("span",{children:d("settings:subscriptionTab.orders")}),(0,g.jsxs)("span",{children:[Q(null!==(e=null===p||void 0===p||null===(n=p.available_plans.find(e=>e.is_current))||void 0===n?void 0:n.limits.orders)&&void 0!==e?e:-1)," \u2192 ",Q(oe.limits.orders),"/month"]})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)("span",{children:d("settings:subscriptionTab.menuItems")}),(0,g.jsxs)("span",{children:[Q(null!==(i=null===p||void 0===p||null===(t=p.available_plans.find(e=>e.is_current))||void 0===t?void 0:t.limits.menu_items)&&void 0!==i?i:-1)," \u2192 ",Q(oe.limits.menu_items)]})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)("span",{children:d("settings:subscriptionTab.staff")}),(0,g.jsxs)("span",{children:[Q(null!==(s=null===p||void 0===p||null===(l=p.available_plans.find(e=>e.is_current))||void 0===l?void 0:l.limits.staff)&&void 0!==s?s:-1)," \u2192 ",Q(oe.limits.staff)]})]})]}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:["\u2022 You can cancel this change anytime before ",K(Ee.next_billing_date)]})]}),Fe&&(0,g.jsxs)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"13px"},children:[Fe,_e.length>0&&(0,g.jsx)("ul",{style:{margin:"8px 0 0 0",paddingLeft:"18px"},children:_e.map((e,n)=>(0,g.jsx)("li",{children:e},n))})]})]}),(0,g.jsx)(o.aF,{isOpen:xe,onClose:()=>he(!1),title:"Cancel Scheduled Change?",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.yl,{variant:"secondary",onClick:()=>he(!1),children:d("settings:subscriptionTab.keepScheduledChange")}),(0,g.jsx)(o.yl,{variant:"primary",onClick:async()=>{try{we(!0);const e=await fetch("/api/subscriptions/change-plan",{method:"DELETE",headers:{Authorization:`Bearer ${Se}`}});(await e.json()).success&&(he(!1),Be())}catch{}finally{we(!1)}},disabled:je,children:je?"Cancelling...":"Cancel Change"})]}),children:(0,g.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:["Your current plan (",Ee.plan_type,", ",(0,u.vv)(Ee.plan_amount,Ee.currency),"/","annual"===Ee.billing_cycle?"year":"month",") will continue without changes."]})}),(0,g.jsxs)(o.aF,{isOpen:ge,onClose:()=>me(!1),title:"Annual to Monthly",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.yl,{variant:"secondary",onClick:()=>{me(!1),window.location.href=(()=>{const e=null===c||void 0===c?void 0:c.role,n=(null===c||void 0===c?void 0:c.restaurantId)||(null===c||void 0===c?void 0:c.restaurant_id);return"Restaurant Admin"===e&&n?`/restaurant/${n}/support`:"Brand General"===e?"/pos/brand/general/system-inquiry":"Foodcourt General"===e?"/pos/foodcourt/general/system-inquiry":"Restaurant Owner"===e?"/pos/owner/system-inquiry":"/pos/profile"})()},children:d("settings:subscriptionTab.contactSupport")}),(0,g.jsx)(o.yl,{onClick:()=>me(!1),children:d("settings:subscriptionTab.close")})]}),children:[(0,g.jsx)("p",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.6"},children:"Annual plans cannot be switched to monthly billing directly."}),(0,g.jsx)("p",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.6",marginTop:"12px"},children:"To change to monthly billing:"}),(0,g.jsxs)("ol",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.8",paddingLeft:"20px"},children:[(0,g.jsx)("li",{children:d("settings:subscriptionTab.contactSupportToRequestAFullRefundForTheRemainingAnnualPeriod")}),(0,g.jsx)("li",{children:d("settings:subscriptionTab.onceRefundedSubscribeToAMonthlyPlan")})]})]}),(0,g.jsx)(o.aF,{isOpen:ye,onClose:()=>fe(!1),title:"upgrade"===(null===ve||void 0===ve?void 0:ve.change_type)?"Plan Upgraded":"Change Scheduled",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.yl,{variant:"secondary",onClick:()=>fe(!1),children:d("settings:subscriptionTab.close")}),(null===ve||void 0===ve?void 0:ve.proration_invoice)&&(0,g.jsx)(o.yl,{variant:"primary",onClick:()=>{fe(!1),window.location.href=te()},children:d("settings:subscriptionTab.goToInvoices")})]}),children:"upgrade"===(null===ve||void 0===ve?void 0:ve.change_type)?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(q,{children:["\u2713 Plan upgraded to ",ve.new_plan]}),(0,g.jsx)(q,{children:"\u2713 New features are now available"}),ve.proration_invoice&&(0,g.jsxs)("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"8px",fontSize:"13px",color:"#1E40AF"},children:["A prorated invoice of ",(0,u.vv)(ve.proration_invoice.amount,p.current.currency)," has been created (due by ",K(ve.proration_invoice.due_date),")."]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(q,{children:["\u2713 ",null===ve||void 0===ve?void 0:ve.message]}),(0,g.jsx)("div",{style:{marginTop:"8px",fontSize:"13px",color:"#6B7280"},children:"Your current features remain available until the change takes effect."})]})})]})};var ee=i(5370);const ne=t.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,ie=t.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,re=(t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,t.Ay.div`
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
`),te=t.Ay.div`
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
`,se=t.Ay.div`
  flex: 1;
`,ae=t.Ay.div`
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,oe=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`,le=t.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":case"Brand Manager":return"#FEE2E2";case"Foodcourt General":return"#FED7AA";case"Foodcourt Manager":case"Staff":return"#FEF3C7";case"Restaurant Admin":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,de=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,ce=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,pe=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ue=t.Ay.div`
  margin-bottom: 20px;
`,xe=t.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
`,he=t.Ay.input`
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
`,ge=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,me=t.Ay.button`
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
`,ye=t.Ay.div`
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
`,fe=t.Ay.div`
  padding: 16px 12px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  text-align: center;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.05)":"white"};
  transition: all 0.2s;
`,ve=t.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`,be=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,je=()=>{const{t:e}=(0,x.Bd)("settings"),{currentStaff:n,updateStaff:i,isLoggedIn:t}=(0,s.g)(),{user:u,isAuthenticated:m,updateUser:y,isLoading:f}=(0,a.As)(),[v,b]=(0,d.M)("profile"),[j,w]=(0,r.useState)({name:"",email:"",phone:"",department:"",company_name:""}),[F,A]=(0,r.useState)({currentPassword:"",newPassword:"",confirmPassword:""}),[_,C]=(0,r.useState)(""),[S,B]=(0,r.useState)(!1),[k,E]=(0,r.useState)(!1),[z,P]=(0,r.useState)(!1),[T,D]=(0,r.useState)(!1),$=(e,n)=>{w(i=>({...i,[e]:n})),I||(R(!0),G(!1))},[I,R]=(0,r.useState)(!1),[M,L]=(0,r.useState)(!1),[U,O]=(0,r.useState)(null),[N,G]=(0,r.useState)(!1),[H,W]=(0,r.useState)(!1),[Y,q]=(0,r.useState)(null),[J,V]=(0,r.useState)(!0);(0,r.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd04 Starting user data fetch..."),console.log("\ud83d\udd04 authUser:",u),console.log("\ud83d\udd04 authUser.id:",null===u||void 0===u?void 0:u.id),null!==u&&void 0!==u&&u.id)try{console.log("\ud83d\udd04 Fetching user from API, ID:",u.id);const e=(0,h.c4)(),n=await fetch(`/api/users/${u.id}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)throw new Error("Failed to fetch user");const i=await n.json(),r=i.data||i;console.log(" Fetched user:",r),q(r)}catch(e){console.error("\u274c Failed to load user from database:",e)}else console.log(" No authUser ID available");V(!1)})()},[null===u||void 0===u?void 0:u.id]);const Z=(0,r.useMemo)(()=>{const e=Y||u;return e?{id:e.id,name:(null===Y||void 0===Y?void 0:Y.full_name)||(null===Y||void 0===Y?void 0:Y.name)||(null===u||void 0===u?void 0:u.name)||(null===u||void 0===u?void 0:u.full_name)||"Unknown",email:e.email,phone:e.phone||"",username:(null===Y||void 0===Y?void 0:Y.username)||e.email,role:e.role,department:(null===Y||void 0===Y?void 0:Y.department)||(null===Y||void 0===Y?void 0:Y.position)||("System Admin"===e.role?"System Administration":"Administration"),company_name:(null===Y||void 0===Y?void 0:Y.company_name)||("System Admin"===e.role?"Purple Here Technologies Sdn Bhd":""),joinDate:(null===Y||void 0===Y?void 0:Y.createdAt)||(new Date).toISOString(),lastLogin:(new Date).toISOString(),schedule:{monday:{active:!0,start:"09:00",end:"17:00"},tuesday:{active:!0,start:"09:00",end:"17:00"},wednesday:{active:!0,start:"09:00",end:"17:00"},thursday:{active:!0,start:"09:00",end:"17:00"},friday:{active:!0,start:"09:00",end:"17:00"},saturday:{active:!1,start:"09:00",end:"17:00"},sunday:{active:!1,start:"09:00",end:"17:00"}}}:null},[Y,u]);(0,r.useEffect)(()=>{Y&&(console.log("\ud83d\udc64 Profile Page - DB User Data:",{full_name:Y.full_name,username:Y.username,email:Y.email,role:Y.role,department:Y.department,position:Y.position,createdAt:Y.createdAt,updatedAt:Y.updatedAt}),console.log("\ud83d\udc64 Profile Page - Current User:",Z))},[Y]);const[K,Q]=(0,r.useState)(!1);(0,r.useEffect)(()=>{if(Y&&!K){console.log("\ud83d\udd25 Initializing formData from dbUser:",Y);const e={name:Y.full_name||Y.name||"",email:Y.email||"",phone:Y.phone||"",department:Y.department||Y.position||"",company_name:Y.company_name||""};console.log("\ud83d\udd25 New formData from DB:",e),w(e),R(!1),Q(!0)}else if(Z&&""===j.name&&!Y){console.log("\ud83d\udd25 Initializing formData from authUser (fallback):",Z);const e={name:Z.name||"",email:Z.email||"",phone:Z.phone||"",department:Z.department||"",company_name:Z.company_name||""};w(e),R(!1)}},[Y,Z,K]),(0,r.useEffect)(()=>{if(Z){const e=j.name!==Z.name||j.email!==Z.email||j.phone!==Z.phone||j.department!==(Z.department||"")||j.company_name!==(Z.company_name||"");R(e),e&&N&&G(!1)}},[j,Z,N]);const je=e=>{b(e)},we=async()=>{await(async e=>{if(e.preventDefault(),console.log("\ud83d\udd25 handleSubmit called"),console.log("\ud83d\udd25 currentUser:",Z),console.log("\ud83d\udd25 hasChanges:",I),console.log("\ud83d\udd25 formData:",j),console.log("\ud83d\udd25 dbUser:",Y),console.log("\ud83d\udd25 authUser:",u),Z&&I&&!H)try{if(W(!0),G(!1),Y&&null!==u&&void 0!==u&&u.id){const e=(0,h.c4)(),n=await fetch(`/api/users/${u.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:j.name,email:j.email,phone:j.phone,department:j.department,company_name:j.company_name})});if(!n.ok){const e=await n.json().catch(()=>null);throw new Error((null===e||void 0===e?void 0:e.message)||(null===e||void 0===e?void 0:e.error)||"Failed to update profile")}const i=await fetch(`/api/users/${u.id}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json(),n=e.data||e;q(n),w({name:n.full_name||"",email:n.email||"",phone:n.phone||"",department:n.department||"",company_name:n.company_name||""}),Q(!0)}y({name:j.name,email:j.email}),R(!1),G(!0),setTimeout(()=>G(!1),3e3)}}catch(n){console.error("Failed to update profile:",n),G(!1),w(e=>({...e})),window.alert(n.message||"Failed to save profile")}finally{W(!1)}})({preventDefault:()=>{}})};(0,r.useEffect)(()=>{const e=e=>{if(I)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>window.removeEventListener("beforeunload",e)},[I]);const Fe=(e,n,i)=>{O(r=>({...r,[e]:{...r[e],[n]:i}}))};return f||J?(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(ne,{children:[(0,g.jsx)(p.Ay,{title:"My Profile"}),(0,g.jsx)(ie,{children:(0,g.jsx)(ce,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:(0,g.jsx)("div",{children:e("settings:profilePage.loadingProfile")})})})})]})}):m&&Z?(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(ne,{children:[(0,g.jsx)(p.Ay,{title:"My Profile"}),(0,g.jsxs)(ie,{children:[(0,g.jsxs)(re,{children:[(0,g.jsx)(te,{role:Z.role,children:(e=>{if(!e)return"?";const n=e.trim().split(" ").filter(e=>e.length>0);return 0===n.length?"?":1===n.length?n[0].substring(0,2).toUpperCase():n.slice(0,2).map(e=>e[0]).join("").toUpperCase()})(Z.name)}),(0,g.jsxs)(se,{children:[(0,g.jsxs)(ae,{children:[Z.name," ",Y&&(0,g.jsx)("span",{style:{fontSize:"12px",color:"#10B981",fontWeight:"normal"},children:"\u2713 DB"})]}),(0,g.jsxs)(oe,{children:[(0,g.jsx)(le,{role:Z.role,children:Z.role}),(0,g.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",textTransform:"capitalize"},children:Z.department})]}),(0,g.jsxs)(de,{children:["Member since ",(Ae=Z.joinDate,new Date(Ae).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))," \u2022 Last login ",(e=>{if(!e)return"Never";const n=new Date(e),i=(new Date).getTime()-n.getTime(),r=Math.floor(i/36e5);if(r<1)return"Just now";if(r<24)return`${r}h ago`;return`${Math.floor(r/24)}d ago`})(Z.lastLogin),Y&&(0,g.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"8px"},children:["\u2022 Database ID: ",Y.id]})]})]})]}),(0,g.jsxs)(l.tU,{children:[(0,g.jsx)(l.oz,{active:"profile"===v,onClick:()=>je("profile"),children:"Personal Information"}),["Restaurant Admin","Brand General","Foodcourt General","Restaurant Owner"].includes(Z.role)&&!(null!==Y&&void 0!==Y&&Y.is_demo)&&(0,g.jsx)(l.oz,{active:"subscription"===v,onClick:()=>je("subscription"),children:"Subscription"}),(0,g.jsx)(l.oz,{active:"schedule"===v,onClick:()=>je("schedule"),children:"Work Schedule"}),(0,g.jsx)(l.oz,{active:"security"===v,onClick:()=>je("security"),children:"Change Password"})]}),"profile"===v&&(0,g.jsx)(ce,{children:(0,g.jsx)("div",{children:(0,g.jsxs)(pe,{children:[(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:e("settings:profilePage.fullName")}),(0,g.jsx)(ee.A,{onSave:we,children:(0,g.jsx)(he,{type:"text",value:j.name||"",onChange:e=>{$("name",e.target.value)},placeholder:"Enter full name"})})]}),(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:e("settings:profilePage.role")}),(0,g.jsx)(he,{type:"text",value:Z.role,disabled:!0})]}),(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:e("settings:profilePage.emailAddress")}),(0,g.jsx)(ee.A,{onSave:we,children:(0,g.jsx)(he,{type:"email",value:j.email||"",onChange:e=>$("email",e.target.value),placeholder:"Enter email address"})})]}),(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:e("settings:profilePage.username")}),(0,g.jsx)(he,{type:"text",value:Z.username,disabled:!0})]}),(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:e("settings:profilePage.phoneNumber")}),(0,g.jsx)(ee.A,{onSave:we,children:(0,g.jsx)(c.A,{value:j.phone||"",onChange:e=>$("phone",e)})})]}),"System Admin"===Z.role&&(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:e("settings:profilePage.companyName")}),(0,g.jsx)(ee.A,{onSave:we,children:(0,g.jsx)(he,{type:"text",value:j.company_name||"",onChange:e=>$("company_name",e.target.value),placeholder:"Enter company name"})})]}),(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:e("settings:profilePage.department")}),(0,g.jsx)(ee.A,{onSave:we,children:(0,g.jsx)(he,{type:"text",value:j.department||"",onChange:e=>$("department",e.target.value),placeholder:"Enter department"})})]})]})})}),"subscription"===v&&(0,g.jsx)(X,{}),"schedule"===v&&(0,g.jsxs)(ce,{children:[(0,g.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:"20px"},children:("System Admin"===(null===Z||void 0===Z?void 0:Z.role)||"manager"===(null===Z||void 0===Z?void 0:Z.role))&&(0,g.jsx)(me,{variant:"primary",style:{flex:"none",padding:"10px 16px",fontSize:"14px",minWidth:"120px"},onClick:()=>{Z&&(O({...Z.schedule}),L(!0))},children:"Edit Schedule"})}),"System Admin"!==(null===Z||void 0===Z?void 0:Z.role)&&"manager"!==(null===Z||void 0===Z?void 0:Z.role)&&(0,g.jsx)("div",{style:{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"\u2139\ufe0f Work schedules are managed by administrators and managers. Contact your manager to make changes."}),(0,g.jsx)(ye,{children:Object.entries(Z.schedule).map(e=>{let[n,i]=e;return(0,g.jsxs)(fe,{active:i.active,children:[(0,g.jsx)(ve,{children:n}),(0,g.jsx)(be,{children:i.active?`${i.start} - ${i.end}`:"Off"})]},n)})})]}),"security"===v&&(0,g.jsx)(ce,{children:(0,g.jsxs)("div",{children:[(0,g.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"6px",color:"#0C4A6E",fontSize:"13px",marginBottom:"20px",lineHeight:"1.5"},children:[(0,g.jsx)("strong",{children:"Password Requirements:"}),(0,g.jsxs)("ul",{style:{margin:"6px 0 0 0",paddingLeft:"18px"},children:[(0,g.jsx)("li",{children:e("settings:profilePage.atLeast8Characters")}),(0,g.jsx)("li",{children:e("settings:profilePage.atLeastOneLowercaseLetterAz")}),(0,g.jsx)("li",{children:e("settings:profilePage.atLeastOneUppercaseLetterAz")}),(0,g.jsx)("li",{children:e("settings:profilePage.atLeastOneNumber09")})]})]}),(0,g.jsxs)(pe,{children:[(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:e("settings:profilePage.currentPassword")}),(0,g.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,g.jsx)(he,{type:k?"text":"password",value:F.currentPassword,onChange:e=>A({...F,currentPassword:e.target.value}),placeholder:"Enter current password",style:{paddingRight:"42px"}}),(0,g.jsx)("button",{type:"button",onClick:()=>E(!k),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:k?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,g.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,g.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]}),(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:e("settings:profilePage.newPassword")}),(0,g.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,g.jsx)(he,{type:z?"text":"password",value:F.newPassword,onChange:e=>A({...F,newPassword:e.target.value}),placeholder:"Min 8 chars, uppercase + lowercase + number",style:{paddingRight:"42px"}}),(0,g.jsx)("button",{type:"button",onClick:()=>P(!z),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:z?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,g.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,g.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]}),(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:e("settings:profilePage.confirmNewPassword")}),(0,g.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,g.jsx)(he,{type:T?"text":"password",value:F.confirmPassword,onChange:e=>A({...F,confirmPassword:e.target.value}),placeholder:"Confirm new password",style:{paddingRight:"42px"}}),(0,g.jsx)("button",{type:"button",onClick:()=>D(!T),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:T?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,g.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,g.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]})]}),_&&(0,g.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"14px",marginTop:"20px"},children:_}),S&&(0,g.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#ECFDF5",border:"1px solid #10B981",borderRadius:"6px",color:"#047857",fontSize:"14px",marginTop:"20px"},children:"Password changed successfully!"}),(0,g.jsx)(ge,{children:(0,g.jsx)(me,{variant:"primary",onClick:async()=>{if(C(""),B(!1),F.currentPassword&&F.newPassword&&F.confirmPassword)if(F.newPassword.length<8)C("Password must be at least 8 characters long");else if(/[a-z]/.test(F.newPassword))if(/[A-Z]/.test(F.newPassword))if(/[0-9]/.test(F.newPassword))if(F.newPassword===F.confirmPassword)if(F.currentPassword!==F.newPassword)try{const e=(0,h.c4)(),n=await fetch(`/api/users/${null===Z||void 0===Z?void 0:Z.id}/password`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currentPassword:F.currentPassword,newPassword:F.newPassword})});if(!n.ok){const e=await n.json();return void C(e.error||"Failed to change password")}B(!0),A({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{B(!1)},5e3)}catch(e){console.error("Error changing password:",e),C("An error occurred while changing password")}else C("New password must be different from current password");else C("New passwords do not match");else C("Password must contain at least one number");else C("Password must contain at least one uppercase letter");else C("Password must contain at least one lowercase letter");else C("All fields are required")},children:"Change Password"})})]})})]}),(0,g.jsx)(o.aF,{isOpen:M,onClose:()=>L(!1),title:"Edit Schedule",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.yl,{variant:"secondary",onClick:()=>L(!1),children:"Cancel"}),(0,g.jsx)(o.yl,{onClick:async()=>{Z&&U&&(n&&await i(n.id,{schedule:U}),L(!1),O(null))},children:"Save Schedule"})]}),children:U&&(0,g.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Object.entries(U).map(e=>{let[n,i]=e;return(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #F3F4F6"},children:[(0,g.jsx)("div",{style:{fontWeight:"500",textTransform:"capitalize",fontSize:"14px",color:"#374151"},children:n}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"14px",minWidth:"80px"},children:[(0,g.jsx)("input",{type:"checkbox",checked:i.active,onChange:e=>Fe(n,"active",e.target.checked),style:{cursor:"pointer"}}),(0,g.jsx)("span",{style:{color:i.active?"#059669":"#6B7280"},children:i.active?"Active":"Off"})]}),i.active&&(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,g.jsx)("input",{type:"time",value:i.start,onChange:e=>Fe(n,"start",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}}),(0,g.jsx)("span",{style:{color:"#9CA3AF",fontSize:"14px"},children:"-"}),(0,g.jsx)("input",{type:"time",value:i.end,onChange:e=>Fe(n,"end",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}})]})]})]},n)})})})]})}):(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(ne,{children:[(0,g.jsx)(p.Ay,{title:"My Profile"}),(0,g.jsx)(ie,{children:(0,g.jsx)(ce,{children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:[(0,g.jsx)("div",{style:{fontSize:"18px",marginBottom:"8px"},children:e("settings:profilePage.pleaseLogInToViewYourProfile")}),(0,g.jsx)("div",{style:{fontSize:"14px"},children:e("settings:profilePage.youNeedToBeLoggedInToAccessThisPage")})]})})})]})});var Ae}}}]);