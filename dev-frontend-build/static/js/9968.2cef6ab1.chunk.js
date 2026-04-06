"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9968],{2597:(e,n,r)=>{r.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var t=r(4752),i=r(4414);const a=t.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,o=t.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,s=t.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:n,className:r,style:t}=e;return(0,i.jsx)(a,{className:r,style:t,children:n})},d=e=>{let{active:n,onClick:r,children:t,className:a}=e;return(0,i.jsx)(o,{active:n,onClick:r,className:a,children:t})},c=e=>{let{count:n,variant:r="default",showZero:t=!1}=e;return 0!==n||t?(0,i.jsx)(s,{variant:r,children:n}):null}},2653:(e,n,r)=>{r.d(n,{M:()=>a});var t=r(9950),i=r(4492);function a(e){const[n,r]=(0,i.ok)(),a=(0,t.useCallback)(()=>n.get("tab")||e,[n,e]),[o,s]=(0,t.useState)(a());return[o,(0,t.useCallback)(e=>{s(e),r({tab:e})},[r])]}},5370:(e,n,r)=>{r.d(n,{A:()=>j});var t=r(9950),i=r(4752),a=r(4414);const o=i.i7`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`,s=i.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=i.i7`
  to { transform: rotate(360deg); }
`,d=i.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=i.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?i.AH`${s} 0.3s ease forwards`:i.AH`${o} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=i.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,u=i.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,x=i.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,h=i.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=i.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,m=i.Ay.span`
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
`,y=i.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,f=i.Ay.span`
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
`,v=(0,t.forwardRef)((e,n)=>{let{children:r,onSave:i,type:o="input",debounceMs:s=2e3,style:l}=e;const[c,v]=(0,t.useState)("idle"),[j,b]=(0,t.useState)(!1),w=(0,t.useRef)(null),F=(0,t.useRef)(null),A=(0,t.useRef)(null),C=(0,t.useRef)(!0),_=(0,t.useRef)(i);_.current=i;const k=(0,t.useCallback)(()=>{w.current&&clearTimeout(w.current),F.current&&clearTimeout(F.current),A.current&&clearTimeout(A.current)},[]),B=2e3!==s?s:"toggle"===o||"select"===o||"list"===o||"image"===o?300:s,S=(0,t.useCallback)(()=>{k(),b(!1),w.current=setTimeout(async()=>{if(C.current){v("saving");try{if(await _.current(),!C.current)return;v("saved"),F.current=setTimeout(()=>{C.current&&(b(!0),A.current=setTimeout(()=>{C.current&&(v("idle"),b(!1))},300))},2e3)}catch{if(!C.current)return;v("error"),F.current=setTimeout(()=>{C.current&&(b(!0),A.current=setTimeout(()=>{C.current&&(v("idle"),b(!1))},300))},4e3)}}},B)},[B,k]);(0,t.useImperativeHandle)(n,()=>({triggerSave:S}),[S]),(0,t.useEffect)(()=>(C.current=!0,()=>{C.current=!1,k()}),[k]);const E=t.Children.map(r,e=>{if(!t.isValidElement(e))return e;const n=e.props.onChange;return"function"!==typeof n?e:t.cloneElement(e,{onChange:function(){n(...arguments),S()}})}),z="saving"===c?(0,a.jsx)(y,{}):"saved"===c?(0,a.jsx)(m,{children:"\u2713"}):"error"===c?(0,a.jsx)(f,{children:"!"}):null,D="select"===o?u:"toggle"===o?x:"image"===o?h:"list"===o?g:p;return(0,a.jsxs)(d,{$type:o,style:l,children:[E,"idle"!==c&&(0,a.jsx)(D,{$fading:j,children:z})]})});v.displayName="AutoSaveField";const j=v},8012:(e,n,r)=>{r.d(n,{Ay:()=>l});r(9950);var t=r(4752),i=r(4414);const a=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`,o=t.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,s=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:n,children:r}=e;return(0,i.jsxs)(a,{children:[(0,i.jsx)(o,{children:n}),r&&(0,i.jsx)(s,{children:r})]})}},9968:(e,n,r)=>{r.r(n),r.d(n,{default:()=>ve});var t=r(9950),i=r(4752),a=r(5781),o=r(1367),s=r(9610),l=r(2597),d=r(2653),c=r(8666),p=r(8012),u=r(6038),x=r(4414);const h=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,g=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`,m=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,y=i.Ay.div`
  font-size: 16px;
  color: #6B7280;
`,f=i.Ay.span`
  font-size: 13px;
  color: #059669;
  font-style: italic;
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,j=i.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F9FAFB;
  border-radius: 8px;
`,b=i.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,w=i.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,F=i.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#EFF6FF";case"overdue":return"#FEF3C7";case"suspended":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#2563EB";case"overdue":return"#D97706";case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,A=i.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`,C=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`,_=i.Ay.div`
  font-size: 13px;
  color: #78350F;
  line-height: 1.5;
`,k=i.Ay.div`
  background: ${e=>"warning"===e.variant?"#FEF3C7":"#EFF6FF"};
  border: 1px solid ${e=>"warning"===e.variant?"#FDE68A":"#BFDBFE"};
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  font-size: 13px;
  color: ${e=>"warning"===e.variant?"#92400E":"#1E40AF"};
  line-height: 1.5;
`,B=i.Ay.button`
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
`,S=i.Ay.button`
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
`,E=i.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;

  &:hover { color: #5046E5; }
`,z=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
`,D=i.Ay.div`
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
`,$=i.Ay.div`
  position: absolute;
  top: -10px;
  right: 16px;
  background: #635BFF;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
`,P=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,I=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 4px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #6B7280;
  }
`,T=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  padding: 3px 0;
`,M=i.Ay.div`
  flex: 1;
  min-height: 12px;
`,R=i.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: ${e=>"upgrade"===e.type?"#059669":"#D97706"};
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`,N=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,U=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`,L=i.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#F8F7FF":"white"};
  color: ${e=>e.disabled?"#D1D5DB":e.active?"#635BFF":"#6B7280"};
  font-size: 14px;
  font-weight: 500;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.5:1};
`,O=i.Ay.div`
  background: #F9FAFB;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 20px;
  margin: 16px 0;
`,G=i.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: ${e=>e.bold?"15px":"14px"};
  font-weight: ${e=>e.bold?"600":"400"};
  color: ${e=>e.highlight?"#059669":"#1F2937"};
`,H=i.Ay.hr`
  border: none;
  border-top: 1px dashed #D1D5DB;
  margin: 8px 0;
`,W=i.Ay.div`
  font-size: 13px;
  color: #059669;
  padding: 3px 0;
`,Y=i.Ay.div`
  font-size: 13px;
  color: #D97706;
  padding: 3px 0;
`,q=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  padding: 3px 0;
  display: flex;
  justify-content: space-between;
`,J=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`;function Z(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"-"}function V(e){return-1===e?"Unlimited":String(e)}const K=()=>{var e,n,r,i,a,l;const{user:d}=(0,o.As)(),[c,p]=(0,t.useState)(null),[K,Q]=(0,t.useState)(!0),[X,ee]=(0,t.useState)(null),ne=()=>{const e=null===d||void 0===d?void 0:d.role,n=(null===d||void 0===d?void 0:d.restaurantId)||(null===d||void 0===d?void 0:d.restaurant_id);return"Restaurant Admin"===e&&n?`/restaurant/${n}/invoices`:"Brand General"===e?"/pos/brand/invoices":"Foodcourt General"===e?"/pos/foodcourt/invoices":"Restaurant Owner"===e?"/pos/owner/invoices":"/pos/profile"},[re,te]=(0,t.useState)(!1),[ie,ae]=(0,t.useState)(null),[oe,se]=(0,t.useState)("monthly"),[le,de]=(0,t.useState)(!1),[ce,pe]=(0,t.useState)(!1),[ue,xe]=(0,t.useState)(!1),[he,ge]=(0,t.useState)(!1),[me,ye]=(0,t.useState)(null),[fe,ve]=(0,t.useState)(!1),[je,be]=(0,t.useState)(null),[we,Fe]=(0,t.useState)([]),Ae=localStorage.getItem("auth_token"),Ce=(0,t.useCallback)(async()=>{try{Q(!0);const e=await fetch("/api/subscriptions/my-plan",{headers:{Authorization:`Bearer ${Ae}`}}),n=await e.json();n.success?(p(n),se(n.current.billing_cycle||"monthly")):ee(n.message||"Failed to load subscription data")}catch{ee("Failed to load subscription data")}finally{Q(!1)}},[Ae]);(0,t.useEffect)(()=>{Ce()},[Ce]);const _e=async()=>{if(ie&&c){ve(!0),be(null);try{const e=await fetch("/api/subscriptions/change-plan",{method:"POST",headers:{Authorization:`Bearer ${Ae}`,"Content-Type":"application/json"},body:JSON.stringify({new_plan_id:ie.id,new_billing_cycle:oe})}),n=await e.json();n.success?(ye(n),de(!1),ge(!0),Ce()):(n.exceeded&&Fe(n.exceeded),be(n.message||"Failed to change plan"))}catch{be("Network error. Please try again.")}finally{ve(!1)}}};if(K)return(0,x.jsx)(J,{children:"Loading subscription data..."});if(X||!c)return(0,x.jsx)(k,{variant:"warning",children:X||"Failed to load subscription data."});const{current:ke,pending_change:Be,available_plans:Se}=c,Ee=(e,n)=>{const r=e.currency_prices[ke.currency];return r?"annual"===n?r.annual:r.monthly:"annual"===n?e.annual_price:e.monthly_price},ze=(e,n)=>{var r,t,i;if(e.is_current&&n===ke.billing_cycle)return null;if(e.is_current&&n!==ke.billing_cycle)return"cycle_change";const a=null!==(r=null===(t=Se.find(e=>e.is_current))||void 0===t?void 0:t.sort_order)&&void 0!==r?r:0;return(null!==(i=e.sort_order)&&void 0!==i?i:0)>a?"upgrade":"downgrade"};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(g,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(m,{children:ke.plan_type}),(0,x.jsxs)(y,{children:[(0,u.vv)(ke.plan_amount,ke.currency)," / ","annual"===ke.billing_cycle?"year":"month",ke.discount_type&&"none"!==ke.discount_type&&ke.discount_value&&(0,x.jsxs)(x.Fragment,{children:[" ",(0,x.jsx)(f,{children:"(discount applied by administrator)"})]})]})]}),ke.can_change&&(0,x.jsx)(B,{onClick:()=>{te(!0),be(null)},children:"Change Plan"})]}),(0,x.jsxs)(v,{children:[(0,x.jsxs)(j,{children:[(0,x.jsx)(b,{children:"Status"}),(0,x.jsx)(F,{status:ke.status,children:"active"===ke.status?"\u25cf Active":"trial"===ke.status?"\u25cf Trial":ke.status.charAt(0).toUpperCase()+ke.status.slice(1)})]}),(0,x.jsxs)(j,{children:[(0,x.jsx)(b,{children:"Billing Cycle"}),(0,x.jsx)(w,{children:"annual"===ke.billing_cycle?"Annual":"Monthly"})]}),(0,x.jsxs)(j,{children:[(0,x.jsx)(b,{children:"Current Period"}),(0,x.jsxs)(w,{children:[Z(ke.subscription_start)," \u2013 ",Z(ke.subscription_end)]})]}),(0,x.jsxs)(j,{children:[(0,x.jsx)(b,{children:"Next Billing"}),(0,x.jsx)(w,{children:Z(ke.next_billing_date)})]})]}),Be&&(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{children:"\u23f3 Scheduled Change"}),(0,x.jsxs)(_,{children:[(0,x.jsx)("strong",{children:"New Plan:"})," ",Be.plan_type," (",(0,u.vv)(Be.plan_amount,ke.currency),"/","annual"===Be.billing_cycle?"year":"month",")",(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"Effective:"})," ",Z(Be.effective_date)," (next billing date)",(0,x.jsx)("br",{}),(0,x.jsx)("br",{}),"Your current features remain available until the change takes effect."]}),(0,x.jsx)(S,{onClick:()=>pe(!0),children:"Cancel Change"})]}),!ke.can_change&&ke.change_blocked_reason&&(0,x.jsxs)(k,{variant:"overdue"===ke.status||"suspended"===ke.status?"warning":"info",children:[ke.change_blocked_reason,("overdue"===ke.status||"suspended"===ke.status)&&(0,x.jsx)("div",{style:{marginTop:"8px"},children:(0,x.jsx)(E,{onClick:()=>window.location.href=ne(),children:"Go to Invoices \u2192"})})]})]}),(0,x.jsxs)(s.aF,{isOpen:re,onClose:()=>te(!1),title:"Change Your Plan",size:"large",footer:(0,x.jsx)(s.yl,{variant:"secondary",onClick:()=>te(!1),children:"Close"}),children:[(0,x.jsxs)(U,{children:[(0,x.jsx)("span",{style:{fontSize:"14px",color:"#6B7280"},children:"Billing:"}),(0,x.jsx)(L,{active:"monthly"===oe,disabled:!1,onClick:()=>se("monthly"),children:"Monthly"}),(0,x.jsx)(L,{active:"annual"===oe,disabled:"annual"===ke.billing_cycle,onClick:()=>{"annual"!==ke.billing_cycle&&se("annual")},children:"Annual"}),"annual"===ke.billing_cycle&&(0,x.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:"Monthly not available for annual plans"})]}),(0,x.jsx)(z,{children:Se.map(e=>{const n=Ee(e,oe),r=ze(e,oe),t=e.is_current&&oe===ke.billing_cycle;return(0,x.jsxs)(D,{isCurrent:t,onClick:()=>!t&&(e=>{if(e.is_current&&oe===(null===c||void 0===c?void 0:c.current.billing_cycle))return;if(ae(e),be(null),Fe([]),"annual"===(null===c||void 0===c?void 0:c.current.billing_cycle)&&"monthly"===oe)return xe(!0),void te(!1);de(!0),te(!1)})(e),children:[t&&(0,x.jsx)($,{children:"Current"}),(0,x.jsx)(P,{children:e.display_name}),(0,x.jsxs)(I,{children:[(0,u.vv)(n,ke.currency)," ",(0,x.jsxs)("span",{children:["/ ","annual"===oe?"year":"month"]})]}),(0,x.jsxs)("div",{style:{marginTop:"12px"},children:[(0,x.jsxs)(T,{children:[V(e.limits.orders)," orders/month"]}),(0,x.jsxs)(T,{children:[V(e.limits.menu_items)," menu items"]}),(0,x.jsxs)(T,{children:[V(e.limits.staff)," staff"]})]}),(0,x.jsx)(M,{}),!t&&r&&(0,x.jsxs)(R,{type:r,children:["upgrade"===r&&(0,x.jsxs)(x.Fragment,{children:["\u2191 Upgrade ",e.proration_estimate&&"trial"!==ke.status?(0,x.jsxs)(N,{children:[(0,u.vv)(e.proration_estimate.net_amount,ke.currency)," due now"]}):null]}),"downgrade"===r&&(0,x.jsx)(x.Fragment,{children:"\u2193 Downgrade \u2014 from next billing"}),"cycle_change"===r&&(0,x.jsx)(x.Fragment,{children:"Billing cycle change \u2014 from next billing"})]})]},e.id)})})]}),ie&&le&&"upgrade"===ze(ie,oe)&&(0,x.jsxs)(s.aF,{isOpen:le,onClose:()=>de(!1),title:(ke.status,`Upgrade to ${ie.display_name}`),footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.yl,{variant:"secondary",onClick:()=>{de(!1),te(!0)},children:"Back"}),(0,x.jsx)(s.yl,{variant:"primary",onClick:_e,disabled:fe,children:fe?"Processing...":"Confirm Upgrade"})]}),children:["trial"===ke.status?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("p",{style:{color:"#6B7280",fontSize:"14px"},children:["You're currently on a free trial (",ke.plan_type,")."]}),(0,x.jsxs)(O,{children:[(0,x.jsxs)(W,{children:["\u2713 ",ie.display_name," features available immediately"]}),(0,x.jsx)(W,{children:"\u2713 No charge during your trial period"}),(0,x.jsxs)(W,{children:["\u2713 First invoice (",(0,u.vv)(Ee(ie,oe),ke.currency),"/","annual"===oe?"year":"month",") after trial ends on ",Z(ke.subscription_end)]})]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(O,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)("span",{children:"Current"}),(0,x.jsxs)("span",{children:[ke.plan_type," \u2014 ",(0,u.vv)(ke.plan_amount,ke.currency),"/","annual"===ke.billing_cycle?"yr":"mo"]})]}),(0,x.jsxs)(G,{children:[(0,x.jsx)("span",{children:"New"}),(0,x.jsxs)("span",{children:[ie.display_name," \u2014 ",(0,u.vv)(Ee(ie,oe),ke.currency),"/","annual"===oe?"yr":"mo"]})]}),ie.proration_estimate&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(H,{}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"4px"},children:["Prorated charge for remaining period (",ie.proration_estimate.remaining_days," days)"]}),(0,x.jsxs)(G,{children:[(0,x.jsx)("span",{children:"New plan cost"}),(0,x.jsx)("span",{children:(0,u.vv)(ie.proration_estimate.charge,ke.currency)})]}),(0,x.jsxs)(G,{children:[(0,x.jsx)("span",{children:"Current plan credit"}),(0,x.jsxs)("span",{children:["-",(0,u.vv)(ie.proration_estimate.credit,ke.currency)]})]}),(0,x.jsx)(H,{}),(0,x.jsxs)(G,{bold:!0,children:[(0,x.jsx)("span",{children:"Prorated amount"}),(0,x.jsx)("span",{children:(0,u.vv)(ie.proration_estimate.net_amount,ke.currency)})]})]})]}),(0,x.jsx)(W,{children:"\u2713 New features available immediately"}),(0,x.jsxs)(W,{children:["\u2713 Invoice due by ",Z(ke.next_billing_date)," (next billing date)"]}),(0,x.jsxs)(W,{children:["\u2713 Next regular billing: ",Z(ke.next_billing_date)," at ",(0,u.vv)(Ee(ie,oe),ke.currency),"/","annual"===oe?"yr":"mo"]})]}),je&&(0,x.jsx)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"13px"},children:je})]}),ie&&le&&("downgrade"===ze(ie,oe)||"cycle_change"===ze(ie,oe))&&(0,x.jsxs)(s.aF,{isOpen:le,onClose:()=>de(!1),title:"cycle_change"===ze(ie,oe)?`Change to ${"annual"===oe?"Annual":"Monthly"} Billing`:`Downgrade to ${ie.display_name}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.yl,{variant:"secondary",onClick:()=>{de(!1),te(!0)},children:"Back"}),(0,x.jsx)(s.yl,{variant:"primary",onClick:_e,disabled:fe,children:fe?"Processing...":"cycle_change"===ze(ie,oe)?"Confirm Change":"Confirm Downgrade"})]}),children:[(0,x.jsxs)(O,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)("span",{children:"Current"}),(0,x.jsxs)("span",{children:[ke.plan_type," \u2014 ",(0,u.vv)(ke.plan_amount,ke.currency),"/","annual"===ke.billing_cycle?"yr":"mo"]})]}),(0,x.jsxs)(G,{children:[(0,x.jsx)("span",{children:"New"}),(0,x.jsxs)("span",{children:[ie.display_name," \u2014 ",(0,u.vv)(Ee(ie,oe),ke.currency),"/","annual"===oe?"yr":"mo"]})]})]}),(0,x.jsxs)(Y,{children:["\u26a0 Effective from ",Z(ke.next_billing_date)," (next billing date)"]}),"downgrade"===ze(ie,oe)&&(0,x.jsxs)("div",{style:{marginTop:"12px"},children:[(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:["\u2022 Current features available until ",Z(ke.next_billing_date)]}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:["\u2022 After ",Z(ke.next_billing_date),":"]}),(0,x.jsxs)("div",{style:{paddingLeft:"16px"},children:[(0,x.jsxs)(q,{children:[(0,x.jsx)("span",{children:"Orders"}),(0,x.jsxs)("span",{children:[V(null!==(e=null===c||void 0===c||null===(n=c.available_plans.find(e=>e.is_current))||void 0===n?void 0:n.limits.orders)&&void 0!==e?e:-1)," \u2192 ",V(ie.limits.orders),"/month"]})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)("span",{children:"Menu items"}),(0,x.jsxs)("span",{children:[V(null!==(r=null===c||void 0===c||null===(i=c.available_plans.find(e=>e.is_current))||void 0===i?void 0:i.limits.menu_items)&&void 0!==r?r:-1)," \u2192 ",V(ie.limits.menu_items)]})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)("span",{children:"Staff"}),(0,x.jsxs)("span",{children:[V(null!==(a=null===c||void 0===c||null===(l=c.available_plans.find(e=>e.is_current))||void 0===l?void 0:l.limits.staff)&&void 0!==a?a:-1)," \u2192 ",V(ie.limits.staff)]})]})]}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:["\u2022 You can cancel this change anytime before ",Z(ke.next_billing_date)]})]}),je&&(0,x.jsxs)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"13px"},children:[je,we.length>0&&(0,x.jsx)("ul",{style:{margin:"8px 0 0 0",paddingLeft:"18px"},children:we.map((e,n)=>(0,x.jsx)("li",{children:e},n))})]})]}),(0,x.jsx)(s.aF,{isOpen:ce,onClose:()=>pe(!1),title:"Cancel Scheduled Change?",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.yl,{variant:"secondary",onClick:()=>pe(!1),children:"Keep Scheduled Change"}),(0,x.jsx)(s.yl,{variant:"primary",onClick:async()=>{try{ve(!0);const e=await fetch("/api/subscriptions/change-plan",{method:"DELETE",headers:{Authorization:`Bearer ${Ae}`}});(await e.json()).success&&(pe(!1),Ce())}catch{}finally{ve(!1)}},disabled:fe,children:fe?"Cancelling...":"Cancel Change"})]}),children:(0,x.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:["Your current plan (",ke.plan_type,", ",(0,u.vv)(ke.plan_amount,ke.currency),"/","annual"===ke.billing_cycle?"year":"month",") will continue without changes."]})}),(0,x.jsxs)(s.aF,{isOpen:ue,onClose:()=>xe(!1),title:"Annual to Monthly",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.yl,{variant:"secondary",onClick:()=>{xe(!1),window.location.href=(()=>{const e=null===d||void 0===d?void 0:d.role,n=(null===d||void 0===d?void 0:d.restaurantId)||(null===d||void 0===d?void 0:d.restaurant_id);return"Restaurant Admin"===e&&n?`/restaurant/${n}/support`:"Brand General"===e?"/pos/brand/general/system-inquiry":"Foodcourt General"===e?"/pos/foodcourt/general/system-inquiry":"Restaurant Owner"===e?"/pos/owner/system-inquiry":"/pos/profile"})()},children:"Contact Support"}),(0,x.jsx)(s.yl,{onClick:()=>xe(!1),children:"Close"})]}),children:[(0,x.jsx)("p",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.6"},children:"Annual plans cannot be switched to monthly billing directly."}),(0,x.jsx)("p",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.6",marginTop:"12px"},children:"To change to monthly billing:"}),(0,x.jsxs)("ol",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.8",paddingLeft:"20px"},children:[(0,x.jsx)("li",{children:"Contact support to request a full refund for the remaining annual period"}),(0,x.jsx)("li",{children:"Once refunded, subscribe to a monthly plan"})]})]}),(0,x.jsx)(s.aF,{isOpen:he,onClose:()=>ge(!1),title:"upgrade"===(null===me||void 0===me?void 0:me.change_type)?"Plan Upgraded":"Change Scheduled",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.yl,{variant:"secondary",onClick:()=>ge(!1),children:"Close"}),(null===me||void 0===me?void 0:me.proration_invoice)&&(0,x.jsx)(s.yl,{variant:"primary",onClick:()=>{ge(!1),window.location.href=ne()},children:"Go to Invoices"})]}),children:"upgrade"===(null===me||void 0===me?void 0:me.change_type)?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(W,{children:["\u2713 Plan upgraded to ",me.new_plan]}),(0,x.jsx)(W,{children:"\u2713 New features are now available"}),me.proration_invoice&&(0,x.jsxs)("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"8px",fontSize:"13px",color:"#1E40AF"},children:["A prorated invoice of ",(0,u.vv)(me.proration_invoice.amount,c.current.currency)," has been created (due by ",Z(me.proration_invoice.due_date),")."]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(W,{children:["\u2713 ",null===me||void 0===me?void 0:me.message]}),(0,x.jsx)("div",{style:{marginTop:"8px",fontSize:"13px",color:"#6B7280"},children:"Your current features remain available until the change takes effect."})]})})]})};var Q=r(5370);const X=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,ee=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,ne=(i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,i.Ay.div`
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
`),re=i.Ay.div`
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
`,te=i.Ay.div`
  flex: 1;
`,ie=i.Ay.div`
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,ae=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`,oe=i.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":case"Brand Manager":return"#FEE2E2";case"Foodcourt General":return"#FED7AA";case"Foodcourt Manager":case"Staff":return"#FEF3C7";case"Restaurant Admin":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,se=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,le=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,de=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ce=i.Ay.div`
  margin-bottom: 20px;
`,pe=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
`,ue=i.Ay.input`
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
`,xe=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,he=i.Ay.button`
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
`,ge=i.Ay.div`
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
`,me=i.Ay.div`
  padding: 16px 12px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  text-align: center;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.05)":"white"};
  transition: all 0.2s;
`,ye=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`,fe=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,ve=()=>{const{currentStaff:e,updateStaff:n,isLoggedIn:r}=(0,a.g)(),{user:i,isAuthenticated:u,updateUser:h,isLoading:g}=(0,o.As)(),[m,y]=(0,d.M)("profile"),[f,v]=(0,t.useState)({name:"",email:"",phone:"",department:"",company_name:""}),[j,b]=(0,t.useState)({currentPassword:"",newPassword:"",confirmPassword:""}),[w,F]=(0,t.useState)(""),[A,C]=(0,t.useState)(!1),[_,k]=(0,t.useState)(!1),[B,S]=(0,t.useState)(!1),[E,z]=(0,t.useState)(!1),D=(e,n)=>{v(r=>({...r,[e]:n})),$||(P(!0),U(!1))},[$,P]=(0,t.useState)(!1),[I,T]=(0,t.useState)(!1),[M,R]=(0,t.useState)(null),[N,U]=(0,t.useState)(!1),[L,O]=(0,t.useState)(!1),[G,H]=(0,t.useState)(null),[W,Y]=(0,t.useState)(!0);(0,t.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd04 Starting user data fetch..."),console.log("\ud83d\udd04 authUser:",i),console.log("\ud83d\udd04 authUser.id:",null===i||void 0===i?void 0:i.id),null!==i&&void 0!==i&&i.id)try{console.log("\ud83d\udd04 Fetching user from API, ID:",i.id);const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${i.id}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)throw new Error("Failed to fetch user");const r=await n.json(),t=r.data||r;console.log(" Fetched user:",t),H(t)}catch(e){console.error("\u274c Failed to load user from database:",e)}else console.log(" No authUser ID available");Y(!1)})()},[null===i||void 0===i?void 0:i.id]);const q=(0,t.useMemo)(()=>{const e=G||i;return e?{id:e.id,name:(null===G||void 0===G?void 0:G.full_name)||(null===G||void 0===G?void 0:G.name)||(null===i||void 0===i?void 0:i.name)||(null===i||void 0===i?void 0:i.full_name)||"Unknown",email:e.email,phone:e.phone||"",username:(null===G||void 0===G?void 0:G.username)||e.email,role:e.role,department:(null===G||void 0===G?void 0:G.department)||(null===G||void 0===G?void 0:G.position)||("System Admin"===e.role?"System Administration":"Administration"),company_name:(null===G||void 0===G?void 0:G.company_name)||("System Admin"===e.role?"Purple Here Technologies Sdn Bhd":""),joinDate:(null===G||void 0===G?void 0:G.createdAt)||(new Date).toISOString(),lastLogin:(new Date).toISOString(),schedule:{monday:{active:!0,start:"09:00",end:"17:00"},tuesday:{active:!0,start:"09:00",end:"17:00"},wednesday:{active:!0,start:"09:00",end:"17:00"},thursday:{active:!0,start:"09:00",end:"17:00"},friday:{active:!0,start:"09:00",end:"17:00"},saturday:{active:!1,start:"09:00",end:"17:00"},sunday:{active:!1,start:"09:00",end:"17:00"}}}:null},[G,i]);(0,t.useEffect)(()=>{G&&(console.log("\ud83d\udc64 Profile Page - DB User Data:",{full_name:G.full_name,username:G.username,email:G.email,role:G.role,department:G.department,position:G.position,createdAt:G.createdAt,updatedAt:G.updatedAt}),console.log("\ud83d\udc64 Profile Page - Current User:",q))},[G]);const[J,Z]=(0,t.useState)(!1);(0,t.useEffect)(()=>{if(G&&!J){console.log("\ud83d\udd25 Initializing formData from dbUser:",G);const e={name:G.full_name||G.name||"",email:G.email||"",phone:G.phone||"",department:G.department||G.position||"",company_name:G.company_name||""};console.log("\ud83d\udd25 New formData from DB:",e),v(e),P(!1),Z(!0)}else if(q&&""===f.name&&!G){console.log("\ud83d\udd25 Initializing formData from authUser (fallback):",q);const e={name:q.name||"",email:q.email||"",phone:q.phone||"",department:q.department||"",company_name:q.company_name||""};v(e),P(!1)}},[G,q,J]),(0,t.useEffect)(()=>{if(q){const e=f.name!==q.name||f.email!==q.email||f.phone!==q.phone||f.department!==(q.department||"")||f.company_name!==(q.company_name||"");P(e),e&&N&&U(!1)}},[f,q,N]);const V=e=>{y(e)},ve=async()=>{await(async e=>{if(e.preventDefault(),console.log("\ud83d\udd25 handleSubmit called"),console.log("\ud83d\udd25 currentUser:",q),console.log("\ud83d\udd25 hasChanges:",$),console.log("\ud83d\udd25 formData:",f),console.log("\ud83d\udd25 dbUser:",G),console.log("\ud83d\udd25 authUser:",i),q&&$&&!L)try{if(O(!0),U(!1),G&&null!==i&&void 0!==i&&i.id){const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${i.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:f.name,email:f.email,phone:f.phone,department:f.department,company_name:f.company_name})});if(!n.ok){const e=await n.json().catch(()=>null);throw new Error((null===e||void 0===e?void 0:e.message)||(null===e||void 0===e?void 0:e.error)||"Failed to update profile")}const r=await fetch(`/api/users/${i.id}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),n=e.data||e;H(n),v({name:n.full_name||"",email:n.email||"",phone:n.phone||"",department:n.department||"",company_name:n.company_name||""}),Z(!0)}h({name:f.name,email:f.email}),P(!1),U(!0),setTimeout(()=>U(!1),3e3)}}catch(n){console.error("Failed to update profile:",n),U(!1),v(e=>({...e})),window.alert(n.message||"Failed to save profile")}finally{O(!1)}})({preventDefault:()=>{}})};(0,t.useEffect)(()=>{const e=e=>{if($)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>window.removeEventListener("beforeunload",e)},[$]);const je=(e,n,r)=>{R(t=>({...t,[e]:{...t[e],[n]:r}}))};return g||W?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(X,{children:[(0,x.jsx)(p.Ay,{title:"My Profile"}),(0,x.jsx)(ee,{children:(0,x.jsx)(le,{children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:(0,x.jsx)("div",{children:"Loading profile..."})})})})]})}):u&&q?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(X,{children:[(0,x.jsx)(p.Ay,{title:"My Profile"}),(0,x.jsxs)(ee,{children:[(0,x.jsxs)(ne,{children:[(0,x.jsx)(re,{role:q.role,children:(e=>{if(!e)return"?";const n=e.trim().split(" ").filter(e=>e.length>0);return 0===n.length?"?":1===n.length?n[0].substring(0,2).toUpperCase():n.slice(0,2).map(e=>e[0]).join("").toUpperCase()})(q.name)}),(0,x.jsxs)(te,{children:[(0,x.jsxs)(ie,{children:[q.name," ",G&&(0,x.jsx)("span",{style:{fontSize:"12px",color:"#10B981",fontWeight:"normal"},children:"\u2713 DB"})]}),(0,x.jsxs)(ae,{children:[(0,x.jsx)(oe,{role:q.role,children:q.role}),(0,x.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",textTransform:"capitalize"},children:q.department})]}),(0,x.jsxs)(se,{children:["Member since ",(be=q.joinDate,new Date(be).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))," \u2022 Last login ",(e=>{if(!e)return"Never";const n=new Date(e),r=(new Date).getTime()-n.getTime(),t=Math.floor(r/36e5);if(t<1)return"Just now";if(t<24)return`${t}h ago`;return`${Math.floor(t/24)}d ago`})(q.lastLogin),G&&(0,x.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"8px"},children:["\u2022 Database ID: ",G.id]})]})]})]}),(0,x.jsxs)(l.tU,{children:[(0,x.jsx)(l.oz,{active:"profile"===m,onClick:()=>V("profile"),children:"Personal Information"}),["Restaurant Admin","Brand General","Foodcourt General","Restaurant Owner"].includes(q.role)&&!(null!==G&&void 0!==G&&G.is_demo)&&(0,x.jsx)(l.oz,{active:"subscription"===m,onClick:()=>V("subscription"),children:"Subscription"}),(0,x.jsx)(l.oz,{active:"schedule"===m,onClick:()=>V("schedule"),children:"Work Schedule"}),(0,x.jsx)(l.oz,{active:"security"===m,onClick:()=>V("security"),children:"Change Password"})]}),"profile"===m&&(0,x.jsx)(le,{children:(0,x.jsx)("div",{children:(0,x.jsxs)(de,{children:[(0,x.jsxs)(ce,{children:[(0,x.jsx)(pe,{children:"Full Name"}),(0,x.jsx)(Q.A,{onSave:ve,children:(0,x.jsx)(ue,{type:"text",value:f.name||"",onChange:e=>{D("name",e.target.value)},placeholder:"Enter full name"})})]}),(0,x.jsxs)(ce,{children:[(0,x.jsx)(pe,{children:"Role"}),(0,x.jsx)(ue,{type:"text",value:q.role,disabled:!0})]}),(0,x.jsxs)(ce,{children:[(0,x.jsx)(pe,{children:"Email Address"}),(0,x.jsx)(Q.A,{onSave:ve,children:(0,x.jsx)(ue,{type:"email",value:f.email||"",onChange:e=>D("email",e.target.value),placeholder:"Enter email address"})})]}),(0,x.jsxs)(ce,{children:[(0,x.jsx)(pe,{children:"Username"}),(0,x.jsx)(ue,{type:"text",value:q.username,disabled:!0})]}),(0,x.jsxs)(ce,{children:[(0,x.jsx)(pe,{children:"Phone Number"}),(0,x.jsx)(Q.A,{onSave:ve,children:(0,x.jsx)(c.A,{value:f.phone||"",onChange:e=>D("phone",e)})})]}),"System Admin"===q.role&&(0,x.jsxs)(ce,{children:[(0,x.jsx)(pe,{children:"Company Name"}),(0,x.jsx)(Q.A,{onSave:ve,children:(0,x.jsx)(ue,{type:"text",value:f.company_name||"",onChange:e=>D("company_name",e.target.value),placeholder:"Enter company name"})})]}),(0,x.jsxs)(ce,{children:[(0,x.jsx)(pe,{children:"Department"}),(0,x.jsx)(Q.A,{onSave:ve,children:(0,x.jsx)(ue,{type:"text",value:f.department||"",onChange:e=>D("department",e.target.value),placeholder:"Enter department"})})]})]})})}),"subscription"===m&&(0,x.jsx)(K,{}),"schedule"===m&&(0,x.jsxs)(le,{children:[(0,x.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:"20px"},children:("System Admin"===(null===q||void 0===q?void 0:q.role)||"manager"===(null===q||void 0===q?void 0:q.role))&&(0,x.jsx)(he,{variant:"primary",style:{flex:"none",padding:"10px 16px",fontSize:"14px",minWidth:"120px"},onClick:()=>{q&&(R({...q.schedule}),T(!0))},children:"Edit Schedule"})}),"System Admin"!==(null===q||void 0===q?void 0:q.role)&&"manager"!==(null===q||void 0===q?void 0:q.role)&&(0,x.jsx)("div",{style:{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"\u2139\ufe0f Work schedules are managed by administrators and managers. Contact your manager to make changes."}),(0,x.jsx)(ge,{children:Object.entries(q.schedule).map(e=>{let[n,r]=e;return(0,x.jsxs)(me,{active:r.active,children:[(0,x.jsx)(ye,{children:n}),(0,x.jsx)(fe,{children:r.active?`${r.start} - ${r.end}`:"Off"})]},n)})})]}),"security"===m&&(0,x.jsx)(le,{children:(0,x.jsxs)("div",{children:[(0,x.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"6px",color:"#0C4A6E",fontSize:"13px",marginBottom:"20px",lineHeight:"1.5"},children:[(0,x.jsx)("strong",{children:"Password Requirements:"}),(0,x.jsxs)("ul",{style:{margin:"6px 0 0 0",paddingLeft:"18px"},children:[(0,x.jsx)("li",{children:"At least 8 characters"}),(0,x.jsx)("li",{children:"At least one lowercase letter (a-z)"}),(0,x.jsx)("li",{children:"At least one uppercase letter (A-Z)"}),(0,x.jsx)("li",{children:"At least one number (0-9)"})]})]}),(0,x.jsxs)(de,{children:[(0,x.jsxs)(ce,{children:[(0,x.jsx)(pe,{children:"Current Password"}),(0,x.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,x.jsx)(ue,{type:_?"text":"password",value:j.currentPassword,onChange:e=>b({...j,currentPassword:e.target.value}),placeholder:"Enter current password",style:{paddingRight:"42px"}}),(0,x.jsx)("button",{type:"button",onClick:()=>k(!_),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:_?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,x.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,x.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]}),(0,x.jsxs)(ce,{children:[(0,x.jsx)(pe,{children:"New Password"}),(0,x.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,x.jsx)(ue,{type:B?"text":"password",value:j.newPassword,onChange:e=>b({...j,newPassword:e.target.value}),placeholder:"Min 8 chars, uppercase + lowercase + number",style:{paddingRight:"42px"}}),(0,x.jsx)("button",{type:"button",onClick:()=>S(!B),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:B?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,x.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,x.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]}),(0,x.jsxs)(ce,{children:[(0,x.jsx)(pe,{children:"Confirm New Password"}),(0,x.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,x.jsx)(ue,{type:E?"text":"password",value:j.confirmPassword,onChange:e=>b({...j,confirmPassword:e.target.value}),placeholder:"Confirm new password",style:{paddingRight:"42px"}}),(0,x.jsx)("button",{type:"button",onClick:()=>z(!E),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:E?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,x.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,x.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]})]}),w&&(0,x.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"14px",marginTop:"20px"},children:w}),A&&(0,x.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#ECFDF5",border:"1px solid #10B981",borderRadius:"6px",color:"#047857",fontSize:"14px",marginTop:"20px"},children:"Password changed successfully!"}),(0,x.jsx)(xe,{children:(0,x.jsx)(he,{variant:"primary",onClick:async()=>{if(F(""),C(!1),j.currentPassword&&j.newPassword&&j.confirmPassword)if(j.newPassword.length<8)F("Password must be at least 8 characters long");else if(/[a-z]/.test(j.newPassword))if(/[A-Z]/.test(j.newPassword))if(/[0-9]/.test(j.newPassword))if(j.newPassword===j.confirmPassword)if(j.currentPassword!==j.newPassword)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${null===q||void 0===q?void 0:q.id}/password`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currentPassword:j.currentPassword,newPassword:j.newPassword})});if(!n.ok){const e=await n.json();return void F(e.error||"Failed to change password")}C(!0),b({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{C(!1)},5e3)}catch(e){console.error("Error changing password:",e),F("An error occurred while changing password")}else F("New password must be different from current password");else F("New passwords do not match");else F("Password must contain at least one number");else F("Password must contain at least one uppercase letter");else F("Password must contain at least one lowercase letter");else F("All fields are required")},children:"Change Password"})})]})})]}),(0,x.jsx)(s.aF,{isOpen:I,onClose:()=>T(!1),title:"Edit Schedule",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.yl,{variant:"secondary",onClick:()=>T(!1),children:"Cancel"}),(0,x.jsx)(s.yl,{onClick:async()=>{q&&M&&(e&&await n(e.id,{schedule:M}),T(!1),R(null))},children:"Save Schedule"})]}),children:M&&(0,x.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Object.entries(M).map(e=>{let[n,r]=e;return(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #F3F4F6"},children:[(0,x.jsx)("div",{style:{fontWeight:"500",textTransform:"capitalize",fontSize:"14px",color:"#374151"},children:n}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"14px",minWidth:"80px"},children:[(0,x.jsx)("input",{type:"checkbox",checked:r.active,onChange:e=>je(n,"active",e.target.checked),style:{cursor:"pointer"}}),(0,x.jsx)("span",{style:{color:r.active?"#059669":"#6B7280"},children:r.active?"Active":"Off"})]}),r.active&&(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)("input",{type:"time",value:r.start,onChange:e=>je(n,"start",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}}),(0,x.jsx)("span",{style:{color:"#9CA3AF",fontSize:"14px"},children:"-"}),(0,x.jsx)("input",{type:"time",value:r.end,onChange:e=>je(n,"end",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}})]})]})]},n)})})})]})}):(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(X,{children:[(0,x.jsx)(p.Ay,{title:"My Profile"}),(0,x.jsx)(ee,{children:(0,x.jsx)(le,{children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:[(0,x.jsx)("div",{style:{fontSize:"18px",marginBottom:"8px"},children:"Please log in to view your profile"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"You need to be logged in to access this page."})]})})})]})});var be}}}]);