"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8682],{2159:(e,r,n)=>{n.d(r,{$Q:()=>a,F8:()=>h,FA:()=>g,I1:()=>t,NM:()=>A,Oc:()=>d,PU:()=>p,Sb:()=>c,a:()=>l,aX:()=>v,bU:()=>F,ey:()=>u,hO:()=>j,i_:()=>y,iz:()=>b,jj:()=>x,kr:()=>f,nJ:()=>m,wn:()=>o,z6:()=>s});var i=n(4752);const t=i.Ay.span`
  color: #EF4444;
  margin-left: 4px;
`,o=i.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,s=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`,l=i.Ay.button`
  padding: 12px 16px;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  background: ${e=>e.selected?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${e=>e.selected?"#635BFF":"#374151"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;

  &:hover {
    border-color: ${e=>e.selected?"#635BFF":"#D1D5DB"};
    background: ${e=>e.selected?"rgba(99, 91, 255, 0.1)":"#F9FAFB"};
  }
`,a=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,c=i.Ay.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  min-height: 44px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
`,d=i.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`,p=i.Ay.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`,x=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,h=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`,u=i.Ay.button`
  width: 40px;
  height: 40px;
  border: 1px solid #D1D5DB;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F9FAFB;
    border-color: #9CA3AF;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: white;
      border-color: #D1D5DB;
    }
  }
`,g=i.Ay.span`
  font-size: 18px;
  font-weight: 600;
  width: 40px;
  text-align: center;
  color: #1F2937;
`,y=i.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding: 16px 0 0 0;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,m=i.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,v=i.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`,f=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`,j=i.Ay.div`
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,b=i.Ay.div``,F=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,A=i.Ay.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`},2966:(e,r,n)=>{n.d(r,{A:()=>$});var i=n(9950),t=n(9610),o=n(2159),s=n(4752),l=n(6038),a=n(9018),c=n(4414);const d=s.Ay.div`
  background: linear-gradient(to bottom, #F8FAFC, #F1F5F9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,p=s.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`,x=s.Ay.span`
  color: #6B7280;
`,h=s.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,u=s.Ay.div`
  margin-bottom: 20px;
`,g=s.Ay.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  text-align: center;
  color: #1F2937;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
    font-weight: 400;
  }
`,y=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
`,m=s.Ay.button`
  padding: 10px;
  border: 1px solid ${e=>e.selected?"#635BFF":"#E5E7EB"};
  background: ${e=>e.selected?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${e=>e.selected?"#635BFF":"#374151"};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: ${e=>e.selected?"#635BFF":"#D1D5DB"};
    background: ${e=>e.selected?"rgba(99, 91, 255, 0.1)":"#F9FAFB"};
  }
`,v=s.Ay.div`
  background: #F0FDF4;
  border: 1px solid #86EFAC;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 16px;
`,f=s.Ay.div`
  font-size: 14px;
  color: #059669;
  margin-bottom: 4px;
`,j=s.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #047857;
`,b=(0,s.Ay)(p)`
  color: #10B981;
`,F=s.Ay.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,A=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 12px;
`,k=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,w=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,_=s.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,B=s.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 12px;

  input {
    width: 18px;
    height: 18px;
    accent-color: #635BFF;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #1F2937;
  }
`,C=s.Ay.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #E5E7EB;
  accent-color: #635BFF;
  cursor: pointer;
`,z=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 12px;
  background: #EFF6FF;
  border-radius: 8px;
`,S=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,E=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,D=s.Ay.div`
  font-weight: 700;
  color: #059669;
  font-size: 16px;
`,M=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const r=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{},...e.headers||{}}}},$=e=>{var r;let{isOpen:n,onClose:s,total:$,subtotal:P,tax:I,serviceCharge:T=0,takeawayCharge:O=0,discountAmount:L=0,couponDiscount:R=0,onConfirmPayment:U,paymentMethods:q,taxRate:G=6,serviceChargeRate:N=10,taxEnabled:J=!0,serviceChargeEnabled:Q=!1,cashierName:W,customerId:X,restaurantId:H,customerPoints:V=0,customerTier:Y="Bronze",membershipSettings:K,onPointsChange:Z}=e;const{operationSettings:ee}=(0,a.Pj)(),[re,ne]=(0,i.useState)(0),[ie,te]=(0,i.useState)("Bronze"),[oe,se]=(0,i.useState)(null),[le,ae]=(0,i.useState)(!1),ce=X?re:V,de=X?ie:Y,pe=X&&!K?oe:K;(0,i.useEffect)(()=>{if(!n||!X||!H)return;(async()=>{ae(!0);try{if(!K){const e=await fetch(`/api/membership/settings/${H}`,M()),r=await e.json();r.success&&r.data&&se(r.data)}const e=await fetch(`/api/membership/customer/${H}/${X}`,M()),r=await e.json();r.success&&r.data&&(ne(r.data.points||0),te(r.data.loyalty_tier||"Bronze"))}catch(e){console.error("PaymentModal: Failed to fetch membership data:",e)}finally{ae(!1)}})()},[n,X,H,K]);const[xe,he]=(0,i.useState)(!1),[ue,ge]=(0,i.useState)(0),[ye,me]=(0,i.useState)(0),ve=i.useMemo(()=>{if(!pe||!pe.is_active||ce<=0)return 0;const e=pe.min_points_to_use||100,r=parseFloat(pe.max_points_per_order_percent)||50,n=parseFloat(pe.points_to_currency)||100,i=r/100*(P-L-R),t=Math.floor(i*n),o=Math.min(ce,t);return ce<e?0:o},[pe,ce,P,L,R]);(0,i.useEffect)(()=>{if(pe&&ue>0){const e=parseFloat(pe.points_to_currency)||100,r=ue/e;me(r),null===Z||void 0===Z||Z(ue,r)}else me(0),null===Z||void 0===Z||Z(0,0)},[ue,pe,Z]),(0,i.useEffect)(()=>{n||(he(!1),ge(0),me(0),ne(0),te("Bronze"),se(null))},[n]);const fe=$-ye,je=(()=>{if(!q)return[{key:"cash",label:"Cash"},{key:"card",label:"Card"},{key:"ewallet",label:"E-Wallet"},{key:"bankTransfer",label:"Bank Transfer"}];const e=q._order,r=e&&Array.isArray(e)?e.filter(e=>"_order"!==e):["cash","card","ewallet","bankTransfer"],n=[];return r.forEach(e=>{const r=q[e];r&&r.enabled&&r.availableIn&&r.availableIn.includes("pos")&&n.push({key:e,label:r.label})}),n})(),[be,Fe]=(0,i.useState)((null===(r=je[0])||void 0===r?void 0:r.key)||"cash"),[Ae,ke]=(0,i.useState)("");(0,i.useEffect)(()=>{je.length>0&&(be&&je.find(e=>e.key===be)||Fe(je[0].key))},[je,be]);const we=()=>{const e=parseFloat(Ae)||0;return Math.max(0,e-fe)},_e=(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.yl,{variant:"secondary",onClick:s,children:"Cancel"}),(0,c.jsx)(t.yl,{variant:"primary",onClick:()=>{if("cash"===be){const e=parseFloat(Ae)||0;e>=fe&&U(be,e,we(),ue,ye)}else U(be,void 0,void 0,ue,ye)},disabled:!(()=>{if("cash"===be){return(parseFloat(Ae)||0)>=fe}return!0})(),children:"Confirm Payment"})]});return(0,c.jsxs)(t.aF,{isOpen:n,onClose:s,title:"Payment",footer:_e,children:[(0,c.jsxs)(d,{children:[W&&(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Cashier"}),(0,c.jsx)(h,{children:W})]}),(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Subtotal"}),(0,c.jsx)(h,{children:(0,l.vv)(P,ee.currency)})]}),O>0&&(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Takeaway Charge"}),(0,c.jsx)(h,{children:(0,l.vv)(O,ee.currency)})]}),L>0&&(0,c.jsxs)(b,{children:[(0,c.jsx)(x,{children:"Discount"}),(0,c.jsx)(h,{children:(0,l.vv)(-L,ee.currency)})]}),R>0&&(0,c.jsxs)(b,{children:[(0,c.jsx)(x,{children:"Coupon Discount"}),(0,c.jsx)(h,{children:(0,l.vv)(-R,ee.currency)})]}),ye>0&&(0,c.jsxs)(b,{children:[(0,c.jsxs)(x,{children:["Points Discount (",ue.toLocaleString()," pts)"]}),(0,c.jsx)(h,{children:(0,l.vv)(-ye,ee.currency)})]}),Q&&T>0&&(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:["Service Charge (",N,"%)"]}),(0,c.jsx)(h,{children:(0,l.vv)(T,ee.currency)})]}),J&&I>0&&(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:["Tax (",G,"%)"]}),(0,c.jsx)(h,{children:(0,l.vv)(I,ee.currency)})]})]}),(0,c.jsxs)(o.i_,{children:[(0,c.jsx)(o.nJ,{children:"Total Amount"}),(0,c.jsx)(o.aX,{children:(0,l.vv)(fe,ee.currency)})]}),le&&X&&(0,c.jsx)(F,{children:(0,c.jsx)(A,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)(k,{children:"Loading Points..."}),(0,c.jsx)(w,{children:"Please wait"})]})})}),!le&&(null===pe||void 0===pe?void 0:pe.is_active)&&ce>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(A,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(k,{children:"Available Points"}),(0,c.jsxs)(w,{children:[de," Member"]})]}),(0,c.jsxs)(_,{children:[ce.toLocaleString()," pts"]})]}),ve>0?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(B,{children:[(0,c.jsx)("input",{type:"checkbox",checked:xe,onChange:e=>{he(e.target.checked),e.target.checked?ge(ve):ge(0)}}),(0,c.jsx)("span",{children:"Use points for this order"})]}),xe&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:[(0,c.jsxs)("span",{children:[(null===pe||void 0===pe?void 0:pe.min_points_to_use)||100," pts"]}),(0,c.jsxs)("span",{children:[ve.toLocaleString()," pts (max)"]})]}),(0,c.jsx)(C,{type:"range",min:(null===pe||void 0===pe?void 0:pe.min_points_to_use)||100,max:ve,value:ue,onChange:e=>ge(Number(e.target.value))}),(0,c.jsxs)(z,{children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)(S,{children:["Using: ",ue.toLocaleString()," pts"]}),(0,c.jsxs)(E,{children:["(",(null===pe||void 0===pe?void 0:pe.points_to_currency)||100," pts = ",(0,l.vv)(1,ee.currency),")"]})]}),(0,c.jsxs)(D,{children:["-",(0,l.vv)(ye,ee.currency)]})]})]})]}):(0,c.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center",padding:"12px"},children:["Minimum ",(null===pe||void 0===pe?void 0:pe.min_points_to_use)||100," points required to use"]}),(null===pe||void 0===pe?void 0:pe.points_per_currency)&&(0,c.jsx)("div",{style:{marginTop:"12px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:(()=>{const e="VIP"===de?parseFloat(pe.vip_bonus_rate):"Gold"===de?parseFloat(pe.gold_bonus_rate):"Silver"===de?parseFloat(pe.silver_bonus_rate):parseFloat(pe.bronze_bonus_rate),r=P-L-R-ye,n=Math.floor(r*parseFloat(pe.points_per_currency)*e),i=n/parseFloat(pe.points_to_currency);return(0,c.jsxs)(c.Fragment,{children:["You will earn approximately ",(0,c.jsx)("strong",{children:n.toLocaleString()})," pts"," ","(",(0,l.vv)(i,ee.currency)," value) from this order","Bronze"!==de&&` (${de} ${e}x bonus)`]})})()})]}),!le&&(null===pe||void 0===pe?void 0:pe.is_active)&&X&&0===ce&&(null===pe||void 0===pe?void 0:pe.points_per_currency)&&(0,c.jsx)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F0FDF4",borderRadius:"8px",fontSize:"13px",color:"#166534",border:"1px solid #BBF7D0"},children:(()=>{const e=P-L-R,r=Math.floor(e*parseFloat(pe.points_per_currency)),n=r/parseFloat(pe.points_to_currency);return(0,c.jsxs)(c.Fragment,{children:["Members earn: ",(0,c.jsx)("strong",{children:r.toLocaleString()})," pts"," ","(",(0,l.vv)(n,ee.currency)," value)"]})})()}),(0,c.jsxs)(o.wn,{children:[(0,c.jsx)(t.lR,{children:"Payment Method"}),(0,c.jsx)(o.z6,{children:je.map(e=>(0,c.jsx)(o.a,{selected:be===e.key,onClick:()=>Fe(e.key),children:(0,c.jsx)("div",{children:e.label})},e.key))})]}),"cash"===be&&(0,c.jsxs)(u,{children:[(0,c.jsx)(t.lR,{children:"Cash Amount"}),(0,c.jsx)(g,{type:"text",placeholder:"Enter amount received",value:Ae,onChange:e=>(e=>{const r=e.replace(/[^0-9.]/g,"");ke(r)})(e.target.value),autoFocus:!0}),(0,c.jsx)(y,{children:[50,100,150,200].map(e=>(0,c.jsx)(m,{selected:Ae===e.toString(),onClick:()=>ke(e.toString()),children:(0,l.vv)(e,ee.currency)},e))}),parseFloat(Ae)>=fe&&(0,c.jsxs)(v,{children:[(0,c.jsx)(f,{children:"Change"}),(0,c.jsx)(j,{children:(0,l.vv)(we(),ee.currency)})]})]})]})}},9189:(e,r,n)=>{n.d(r,{A:()=>d});var i=n(9950),t=n(8930),o=n(9610),s=n(2159),l=n(6038),a=n(9018),c=n(4414);const d=e=>{let{isOpen:r,onClose:n,menuItem:d,onConfirm:p}=e;const{optionGroups:x}=(0,t.b)(),{operationSettings:h}=(0,a.Pj)(),[u,g]=(0,i.useState)(1),[y,m]=(0,i.useState)([]),v=d.optionGroups?d.optionGroups.map(e=>x.find(r=>r.id===e)).filter(e=>void 0!==e):[],f=(e,r,n,i)=>{if(n)m(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e]);else{const n=v.find(e=>e.id===r);if(n){const r=n.options.map(e=>e.id),t=y.includes(e);m(t&&!i?e=>e.filter(e=>!r.includes(e)):n=>[...n.filter(e=>!r.includes(e)),e])}}},j=()=>v.filter(e=>e.required).every(e=>y.some(r=>e.options.some(e=>e.id===r))),b=()=>{g(1),m([]),n()},F=(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o.yl,{variant:"secondary",onClick:b,children:"Cancel"}),(0,c.jsx)(o.yl,{variant:"primary",onClick:()=>{if(j()){const e=y.map(e=>{const r=v.flatMap(e=>e.options).find(r=>r.id===e);return r?r.name:""}).filter(Boolean),r=y.map(e=>{const r=v.flatMap(e=>e.options).find(r=>r.id===e);return r?{id:r.id,name:r.name,price:r.price}:null}).filter(e=>null!==e);p(u,e,r),g(1),m([])}},disabled:!j(),children:"Add to Order"})]});return(0,c.jsxs)(o.aF,{isOpen:r,onClose:b,title:"Customize Order",footer:F,children:[(0,c.jsxs)(s.kr,{children:[(0,c.jsx)(s.hO,{style:{backgroundImage:d.image?`url(${d.image})`:"none",backgroundSize:"cover",backgroundPosition:"center",fontSize:d.image?"0":"32px"},children:!d.image&&d.emoji}),(0,c.jsxs)(s.iz,{children:[(0,c.jsx)(s.bU,{children:d.name}),(0,c.jsx)(s.NM,{children:(0,l.vv)(d.price,h.currency)})]})]}),v.map(e=>(0,c.jsxs)(s.wn,{children:[(0,c.jsxs)(o.lR,{children:[e.name,e.required&&(0,c.jsx)(s.I1,{children:"*"})]}),e.multiple?(0,c.jsx)(s.$Q,{children:e.options.map(r=>(0,c.jsxs)(s.Sb,{children:[(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,c.jsx)(s.Oc,{type:"checkbox",checked:y.includes(r.id),onChange:()=>f(r.id,e.id,e.multiple,e.required)}),(0,c.jsx)(s.PU,{children:r.name})]}),r.price>0&&(0,c.jsxs)(s.jj,{children:["+",(0,l.vv)(r.price,h.currency)]})]},r.id))}):(0,c.jsx)(s.z6,{children:e.options.map(r=>(0,c.jsxs)(s.a,{selected:y.includes(r.id),onClick:()=>f(r.id,e.id,e.multiple,e.required),style:"spice"===e.id&&y.includes(r.id)?{borderColor:"#F97316",backgroundColor:"rgba(249, 115, 22, 0.1)",color:"#EA580C"}:{},children:[(0,c.jsx)("div",{children:r.name}),r.price>0&&(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:["+",(0,l.vv)(r.price,h.currency)]})]},r.id))})]},e.id)),(0,c.jsxs)(s.wn,{children:[(0,c.jsx)(o.lR,{children:"Quantity"}),(0,c.jsxs)(s.F8,{children:[(0,c.jsx)(s.ey,{onClick:()=>g(Math.max(1,u-1)),disabled:u<=1,children:(0,c.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,c.jsx)("path",{d:"M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),(0,c.jsx)(s.FA,{children:u}),(0,c.jsx)(s.ey,{onClick:()=>g(u+1),children:(0,c.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,c.jsx)("path",{d:"M7 3V11M3 7H11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]})]}),(0,c.jsxs)(s.i_,{children:[(0,c.jsx)(s.nJ,{children:"Total:"}),(0,c.jsx)(s.aX,{children:(0,l.vv)((()=>{let e=d.price*u;return y.forEach(r=>{const n=v.flatMap(e=>e.options).find(e=>e.id===r);n&&(e+=n.price*u)}),e})(),h.currency)})]})]})}}}]);