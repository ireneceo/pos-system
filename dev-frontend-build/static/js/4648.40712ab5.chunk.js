"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4648],{2687:(e,t,r)=>{r.d(t,{$Q:()=>d,F8:()=>u,FA:()=>m,I1:()=>i,NM:()=>F,Oc:()=>c,PU:()=>p,Sb:()=>l,a:()=>s,aX:()=>b,bU:()=>_,ey:()=>h,hO:()=>j,i_:()=>g,iz:()=>v,jj:()=>x,kr:()=>f,nJ:()=>y,wn:()=>o,z6:()=>a});var n=r(4752);const i=n.Ay.span`
  color: #EF4444;
  margin-left: 4px;
`,o=n.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,a=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`,s=n.Ay.button`
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
`,d=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,l=n.Ay.label`
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
`,c=n.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`,p=n.Ay.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`,x=n.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,u=n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`,h=n.Ay.button`
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
`,m=n.Ay.span`
  font-size: 18px;
  font-weight: 600;
  width: 40px;
  text-align: center;
  color: #1F2937;
`,g=n.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding: 16px 0 0 0;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,y=n.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,b=n.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`,f=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`,j=n.Ay.div`
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,v=n.Ay.div``,_=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,F=n.Ay.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`},2966:(e,t,r)=>{r.d(t,{A:()=>_});var n=r(9950),i=r(9610),o=r(2687),a=r(4752),s=r(6038),d=r(9018),l=r(4414);const c=a.Ay.div`
  background: linear-gradient(to bottom, #F8FAFC, #F1F5F9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,p=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`,x=a.Ay.span`
  color: #6B7280;
`,u=a.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,h=a.Ay.div`
  margin-bottom: 20px;
`,m=a.Ay.input`
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
`,g=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
`,y=a.Ay.button`
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
`,b=a.Ay.div`
  background: #F0FDF4;
  border: 1px solid #86EFAC;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 16px;
`,f=a.Ay.div`
  font-size: 14px;
  color: #059669;
  margin-bottom: 4px;
`,j=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #047857;
`,v=(0,a.Ay)(p)`
  color: #10B981;
`,_=e=>{var t;let{isOpen:r,onClose:a,total:_,subtotal:F,tax:w,serviceCharge:A=0,takeawayCharge:k=0,discountAmount:C=0,couponDiscount:B=0,onConfirmPayment:S,paymentMethods:E,taxRate:T=6,serviceChargeRate:P=10,taxEnabled:N=!0,serviceChargeEnabled:D=!1}=e;const{operationSettings:I}=(0,d.Pj)(),z=(()=>{if(!E)return[{key:"cash",label:"Cash"},{key:"card",label:"Card"},{key:"ewallet",label:"E-Wallet"},{key:"bankTransfer",label:"Bank Transfer"}];const e=E._order,t=e&&Array.isArray(e)?e.filter(e=>"_order"!==e):["cash","card","ewallet","bankTransfer"],r=[];return t.forEach(e=>{const t=E[e];t&&t.enabled&&t.availableIn&&t.availableIn.includes("pos")&&r.push({key:e,label:t.label})}),r})(),[$,O]=(0,n.useState)((null===(t=z[0])||void 0===t?void 0:t.key)||"cash"),[M,R]=(0,n.useState)("");(0,n.useEffect)(()=>{z.length>0&&($&&z.find(e=>e.key===$)||O(z[0].key))},[z,$]);const U=()=>{const e=parseFloat(M)||0;return Math.max(0,e-_)},W=(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.yl,{variant:"secondary",onClick:a,children:"Cancel"}),(0,l.jsx)(i.yl,{variant:"primary",onClick:()=>{if("cash"===$){const e=parseFloat(M)||0;e>=_&&S($,e,U())}else S($)},disabled:!(()=>{if("cash"===$){return(parseFloat(M)||0)>=_}return!0})(),children:"Confirm Payment"})]});return(0,l.jsxs)(i.aF,{isOpen:r,onClose:a,title:"Payment",footer:W,children:[(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(x,{children:"Subtotal"}),(0,l.jsx)(u,{children:(0,s.vv)(F,I.currency)})]}),k>0&&(0,l.jsxs)(p,{children:[(0,l.jsx)(x,{children:"Takeaway Charge"}),(0,l.jsx)(u,{children:(0,s.vv)(k,I.currency)})]}),C>0&&(0,l.jsxs)(v,{children:[(0,l.jsx)(x,{children:"Discount"}),(0,l.jsx)(u,{children:(0,s.vv)(-C,I.currency)})]}),B>0&&(0,l.jsxs)(v,{children:[(0,l.jsx)(x,{children:"Coupon Discount"}),(0,l.jsx)(u,{children:(0,s.vv)(-B,I.currency)})]}),D&&A>0&&(0,l.jsxs)(p,{children:[(0,l.jsxs)(x,{children:["Service Charge (",P,"%)"]}),(0,l.jsx)(u,{children:(0,s.vv)(A,I.currency)})]}),N&&w>0&&(0,l.jsxs)(p,{children:[(0,l.jsxs)(x,{children:["Tax (",T,"%)"]}),(0,l.jsx)(u,{children:(0,s.vv)(w,I.currency)})]})]}),(0,l.jsxs)(o.i_,{children:[(0,l.jsx)(o.nJ,{children:"Total Amount"}),(0,l.jsx)(o.aX,{children:(0,s.vv)(_,I.currency)})]}),(0,l.jsxs)(o.wn,{children:[(0,l.jsx)(i.lR,{children:"Payment Method"}),(0,l.jsx)(o.z6,{children:z.map(e=>(0,l.jsx)(o.a,{selected:$===e.key,onClick:()=>O(e.key),children:(0,l.jsx)("div",{children:e.label})},e.key))})]}),"cash"===$&&(0,l.jsxs)(h,{children:[(0,l.jsx)(i.lR,{children:"Cash Amount"}),(0,l.jsx)(m,{type:"text",placeholder:"Enter amount received",value:M,onChange:e=>(e=>{const t=e.replace(/[^0-9.]/g,"");R(t)})(e.target.value),autoFocus:!0}),(0,l.jsx)(g,{children:[50,100,150,200].map(e=>(0,l.jsx)(y,{selected:M===e.toString(),onClick:()=>R(e.toString()),children:(0,s.vv)(e,I.currency)},e))}),parseFloat(M)>=_&&(0,l.jsxs)(b,{children:[(0,l.jsx)(f,{children:"Change"}),(0,l.jsx)(j,{children:(0,s.vv)(U(),I.currency)})]})]})]})}},4648:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Pe});var n=r(9950),i=r(7119),o=r(4752),a=r(3422),s=r(3310),d=r(1367),l=r(2966),c=r(9018),p=r(6038),x=r(5863),u=r(8406),h=r(4414);const m=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),o=n(r);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`},g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},y=e=>{let{dateString:t}=e;const[r,i]=n.useState("calculating...");return n.useEffect(()=>{const e=()=>{i((0,u.MQ)(t))};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[t]),(0,h.jsx)("span",{style:{fontSize:"12px"},children:r})},b=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,f=o.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,j=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,v=o.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,_=o.Ay.button`
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #635BFF;

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  &:hover {
    color: #5A54E5;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`,F=o.Ay.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,w=o.Ay.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`,A=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #E6EBF1;
      border-radius: 4px;
    }
  }
`,k=o.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"#FFFFFF"};
  color: ${e=>e.active?"#FFFFFF":"#6B7C93"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5A51E6":"#F8FAFC"};
    border-color: ${e=>e.active?"#5A51E6":"#CBD5E1"};
  }
`,C=o.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,B=o.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
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

  &::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }
`,S=o.Ay.button`
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
`,E=o.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`,T=o.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 12px 20px;
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 13px;
  color: #6B7280;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    gap: 10px;
    padding: 10px 14px;
    font-size: 11px;
  }
`,P=o.Ay.span`
  white-space: nowrap;

  strong {
    color: #0A2540;
    font-weight: 600;
    margin-left: 4px;
  }
`,N=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: visible;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
  }
`,D=o.Ay.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,I=o.Ay.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    display: none;
  }
`,z=o.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`,$=o.Ay.th`
  padding: 16px 24px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,O=o.Ay.td`
  padding: 20px 24px;
  font-size: 14px;
  color: #0A2540;

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
    padding: 0;
    border-bottom: none;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    &:last-child {
      flex: 1 1 100%;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F3F4F6;

      &:before {
        display: none;
      }
    }
  }
`,M=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #635BFF;
    text-decoration: underline;
  }
`,R=o.Ay.span`
  display: inline-flex;
  align-items: center;
  background: #FEF3C7;
  color: #F59E0B;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  vertical-align: middle;
`,U=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  margin-top: 2px;
`,W=o.Ay.div`
  line-height: 1.6;
`,L=o.Ay.div`
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,H=o.Ay.span`
  color: #6B7C93;
  margin-right: 8px;
`,q=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,Y=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"awaiting_payment":case"pending":return"#FEF3C7";case"preparing":return"#DBEAFE";case"ready":case"served":return"#D1FAE5";case"completed":return"#E5E7EB";case"cancelled":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"awaiting_payment":return"#F59E0B";case"pending":return"#92400E";case"preparing":return"#1E40AF";case"ready":case"served":return"#065F46";case"completed":return"#374151";case"cancelled":return"#991B1B";default:return"#6B7280"}}};
`,V=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  line-height: 1.4;
`,J=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,K=o.Ay.div`
  color: ${e=>e.isVerificationPending?"#F59E0B":e.isPending?"#FF6B6B":"#6B7C93"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending||e.isVerificationPending?"500":"normal"};
`,G=o.Ay.button`
  padding: 6px 12px;
  background: ${e=>"secondary"===e.variant?"#F6F9FC":"#635BFF"};
  color: ${e=>"secondary"===e.variant?"#6B7C93":"white"};
  border: ${e=>"secondary"===e.variant?"1px solid #E6EBF1":"none"};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${e=>"secondary"===e.variant?"#E6EBF1":"#5A51E6"};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 11px;
    flex: 0 0 auto;
  }
`,Q=o.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px;
    min-width: 30px;
    min-height: 30px;
    margin-left: 0;
  }
`,X=o.Ay.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,Z=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,ee=o.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,te=o.Ay.div`
  display: ${e=>e.isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,re=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,ne=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ie=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,oe=o.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    background: #F6F9FC;
    color: #0A2540;
  }
`,ae=o.Ay.div`
  padding: 24px;
`,se=o.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,de=o.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,le=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`,ce=o.Ay.span`
  color: #6B7C93;
`,pe=o.Ay.span`
  font-weight: 500;
`,xe=o.Ay.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,ue=o.Ay.div`
  flex: 1;
`,he=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,me=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-bottom: 4px;
`,ge=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`,ye=o.Ay.hr`
  border: 0;
  border-top: 1px solid #E6EBF1;
  margin: 20px 0;
`,be=o.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 8px;
`,fe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${e=>e.isTotal?"18px":"14px"};
  font-weight: ${e=>e.isTotal?"700":"400"};
  color: ${e=>e.isTotal?"#0A2540":"#6B7C93"};
`,je=o.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,ve=o.Ay.div`
  display: none;
  position: absolute;
  top: 0;
  left: -9999px;
  width: 80mm;
  background: white;
  padding: 10mm;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  color: #000;

  @media print {
    display: block !important;
    position: static !important;
    left: 0 !important;
  }

  * {
    color: #000 !important;
    background: white !important;
  }
`,_e=o.DU`
  @media print {
    @page {
      size: 80mm auto;
      margin: 0mm;
    }

    body {
      margin: 0;
      padding: 0;
      background: white;
    }

    .no-print {
      display: none !important;
    }

    #bill-print-content {
      display: block !important;
      width: 80mm !important;
      max-width: 80mm !important;
      margin: 0 !important;
      padding: 5mm !important;
      background: white !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    #bill-print-content button {
      display: none !important;
    }
  }
`,Fe=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,we=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,Ae=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,ke=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,Ce=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,Be=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: white;
  border-top: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-direction: column;
    gap: 12px;
  }
`,Se=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,Ee=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Te=o.Ay.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7280"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${e=>e.active?"#5A51E6":"#F6F9FC"};
    border-color: ${e=>e.active?"#5A51E6":"#C7D2FE"};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,Pe=()=>{var e,t,r;const{user:o}=(0,d.As)(),{getStoreInfo:Pe,operationSettings:Ne}=(0,c.Pj)(),[De,Ie]=(0,n.useState)([]),[ze,$e]=(0,n.useState)([]),[,Oe]=(0,n.useState)(null),[Me,Re]=(0,n.useState)("all"),[Ue,We]=(0,n.useState)(null),[Le,He]=(0,n.useState)(!1),[qe,Ye]=(0,n.useState)(!1),[Ve,Je]=(0,n.useState)(null),[Ke,Ge]=(0,n.useState)(!1),[Qe,Xe]=(0,n.useState)(null),[Ze,et]=(0,n.useState)(!1),[tt,rt]=(0,n.useState)(null),[,]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[nt,it]=(0,n.useState)(!1),[ot,at]=(0,n.useState)(!1),[st,dt]=(0,n.useState)(!0),[lt,ct]=(0,n.useState)(1),[pt,xt]=(0,n.useState)(1),[ut,ht]=(0,n.useState)(0),[mt,gt]=(0,n.useState)(null),[yt,bt]=(0,n.useState)(null),[ft,jt]=(0,n.useState)(0),[vt,_t]=(0,n.useState)(!0),[Ft,wt]=(0,n.useState)("today"),[At,kt]=(0,n.useState)(()=>{const e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:t,end:t}}),[Ct,Bt]=(0,n.useState)(!1),[St,Et]=(0,n.useState)(""),Tt=(0,n.useCallback)(()=>{if(vt)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5),setTimeout(()=>{const t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=1e3,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5)},200)}catch(e){console.error("Failed to play notification sound:",e)}},[vt]);(0,n.useEffect)(()=>{jt(e=>e+1);const e=setInterval(()=>{jt(e=>e+1)},1e4);return()=>clearInterval(e)},[]);const Pt=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(null!==o&&void 0!==o&&o.restaurantId)try{const t=await fetch(`/api/orders/restaurant/${o.restaurantId}?page=${e}&limit=50&includeCompleted=true`,g()),r=await t.json();r.success&&r.data&&(Ie(r.data),r.pagination&&(ct(r.pagination.currentPage),xt(r.pagination.totalPages),ht(r.pagination.totalCount)))}catch(t){console.error("Failed to fetch orders:",t)}finally{dt(!1)}},[null===o||void 0===o?void 0:o.restaurantId]),Nt=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/orders/restaurant/${o.restaurantId}?page=1&limit=10000&includeCompleted=true`,g()),t=await e.json();t.success&&t.data&&$e(t.data)}catch(e){console.error("Failed to fetch all orders:",e)}},[null===o||void 0===o?void 0:o.restaurantId]);(0,n.useEffect)(()=>{if(null===o||void 0===o||!o.restaurantId)return;const e=(0,a.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{e.emit("join-restaurant",o.restaurantId)}),e.on("connect_error",e=>{console.error("Socket.IO connection error:",e)}),e.on("order-created",e=>{Ie(t=>[e,...t]),$e(t=>[e,...t]),Tt()}),e.on("order-updated",e=>{Ie(t=>t.map(t=>t.id===e.id?e:t)),$e(t=>t.map(t=>t.id===e.id?e:t))}),e.on("order-deleted",e=>{let{id:t}=e;Ie(e=>e.filter(e=>e.id!==t)),$e(e=>e.filter(e=>e.id!==t))}),Oe(e),()=>{e.disconnect()}},[null===o||void 0===o?void 0:o.restaurantId,Tt]),(0,n.useEffect)(()=>{Pt(lt)},[Pt,lt]),(0,n.useEffect)(()=>{Nt()},[Nt]),(0,n.useEffect)(()=>{Dt("today")},[]),(0,n.useEffect)(()=>{ct(1)},[Me,At.start,At.end,Ft]);const Dt=e=>{wt(e),Bt(!1);const t=new Date;let r=new Date;const n=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":r=new Date(t),r.setHours(0,0,0,0);break;case"week":r=new Date(t.getTime()-6048e5);break;case"month":r=new Date(t.getTime()-2592e6);break;case"year":r=new Date(t.getFullYear(),0,1);break;case"all":if(ze.length>0){r=ze.reduce((e,t)=>{const r=new Date(t.order_date||t.createdAt);return r<e?r:e},new Date)}else r=new Date(t.getFullYear()-5,0,1)}kt({start:n(r),end:n(t)})},It=()=>{if(!At.start||!At.end)return ze;const e=new Date(At.start);e.setHours(0,0,0,0);const t=new Date(At.end);t.setHours(23,59,59,999);let r=ze.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const i=new Date(n);if(isNaN(i.getTime()))return!1;return i>=e&&i<=t});if(St.trim()){const e=St.toLowerCase().trim();r=r.filter(t=>{var r,n,i,o;if(null!==(r=t.order_number)&&void 0!==r&&r.toLowerCase().includes(e))return!0;if(null!==(n=t.customer_name)&&void 0!==n&&n.toLowerCase().includes(e))return!0;if(null!==(i=t.table_number)&&void 0!==i&&i.toString().includes(e))return!0;if(t.order_items&&Array.isArray(t.order_items)){if(t.order_items.some(t=>{var r,n;return(null===(r=t.menu_item_name)||void 0===r?void 0:r.toLowerCase().includes(e))||(null===(n=t.name)||void 0===n?void 0:n.toLowerCase().includes(e))}))return!0}return!(null===(o=t.payment_method)||void 0===o||!o.toLowerCase().includes(e))})}return r},zt=(e,t)=>{kt(r=>({...r,[e]:t})),Bt(!0),wt("today")};(0,n.useEffect)(()=>{(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/restaurants/${o.restaurantId}`,g()),t=await e.json();if(t.success||e.ok){const e=t.data||t;gt({companyName:e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postcode:e.postal_code||"",phone:e.phone||"",email:e.email||"",taxNo:e.tax_id||""}),e.payment_settings&&bt(e.payment_settings)}}catch(e){console.error("Failed to load company info:",e)}})()},[null===o||void 0===o?void 0:o.restaurantId]);const $t=e=>"awaiting_payment"===e.status||"payment_verification_pending"===e.payment_status,Ot=e=>$t(e)?"awaiting_payment":e.status,Mt=e=>"awaiting_payment"===e?"Outstanding":e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),Rt=()=>{const e=It();let t;return t="all"===Me?e:"outstanding"===Me?e.filter(e=>$t(e)):e.filter(e=>e.status===Me),t.sort((e,t)=>{const r=new Date(e.createdAt||e.order_date).getTime();return new Date(t.createdAt||t.order_date).getTime()-r})},Ut=e=>{const t=It();return"all"===e?t.length:"outstanding"===e?t.filter(e=>$t(e)).length:t.filter(t=>t.status===e).length},Wt=async function(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];_t(!1);const n=(new Date).toISOString();Ie(i=>i.map(i=>i.id===e?{...i,status:t,...r&&{kitchen_ready:!0},...("served"===t||"completed"===t)&&!i.served_at&&{served_at:n}}:i));try{const i={status:t};r&&(i.kitchen_ready=!0);const o=De.find(t=>t.id===e);"served"!==t&&"completed"!==t||null!==o&&void 0!==o&&o.served_at||(i.served_at=n);const a=await fetch(`/api/orders/${e}/status`,g({method:"PATCH",body:JSON.stringify(i)}));(await a.json()).success||Pt()}catch(i){console.error("Failed to update status:",i),Pt()}},Lt=(e,t,r)=>{if("delivery"===r){return{awaiting_payment:"Proceed Without Payment",pending:"Start Preparing",preparing:"Mark Ready",ready:"Out for Delivery",served:"Mark Delivered",completed:"Completed",cancelled:"Cancelled"}[e]||""}return{awaiting_payment:"Proceed Without Payment",pending:"Start Cooking",preparing:"Mark Ready",ready:"Served",served:"Complete Order",completed:"Completed",cancelled:"Cancelled"}[e]||""},Ht=e=>{We(e),He(!0)},qt=()=>{He(!1),We(null),it(!1),at(!1)},Yt=()=>{Je(null),Ye(!1)},Vt=()=>{Xe(null),Ge(!1)},Jt=(e,t)=>{t&&t.stopPropagation(),rt(e),et(!0)},Kt=e=>(0,u.r6)(e,null===mt||void 0===mt?void 0:mt.operation_settings);return(0,h.jsxs)(s.A,{children:[(0,h.jsx)(_e,{}),(0,h.jsxs)(b,{className:"no-print",children:[(0,h.jsxs)(f,{children:[(0,h.jsx)(j,{children:"Live Orders"}),(0,h.jsx)(v,{children:(0,h.jsx)(_,{enabled:vt,onClick:()=>_t(!vt),title:vt?"Stop notification sound":"Play notification sound",children:vt?(0,h.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,h.jsx)("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),(0,h.jsx)("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}):(0,h.jsx)("svg",{viewBox:"0 0 24 24",children:(0,h.jsx)("path",{d:"M8 5v14l11-7z"})})})})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(w,{children:(0,h.jsxs)(A,{children:[(0,h.jsx)(k,{active:"today"===Ft&&!Ct,onClick:()=>Dt("today"),children:"Today"}),(0,h.jsx)(k,{active:"week"===Ft&&!Ct,onClick:()=>Dt("week"),children:"Week"}),(0,h.jsx)(k,{active:"month"===Ft&&!Ct,onClick:()=>Dt("month"),children:"Month"}),(0,h.jsx)(k,{active:"year"===Ft&&!Ct,onClick:()=>Dt("year"),children:"Year"}),(0,h.jsx)(k,{active:"all"===Ft&&!Ct,onClick:()=>Dt("all"),children:"All"}),(0,h.jsx)(C,{type:"date",value:At.start,onChange:e=>zt("start",e.target.value)}),(0,h.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,h.jsx)(C,{type:"date",value:At.end,onChange:e=>zt("end",e.target.value)}),(0,h.jsxs)("div",{style:{position:"relative",width:"250px",marginLeft:"16px"},children:[(0,h.jsx)("span",{style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"16px",pointerEvents:"none",zIndex:1},children:"\ud83d\udd0d"}),(0,h.jsx)("input",{type:"text",placeholder:"Search orders...",value:St,onChange:e=>Et(e.target.value),style:{width:"100%",padding:"10px 40px 10px 40px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"all 0.2s",boxSizing:"border-box"}}),St&&(0,h.jsx)("button",{onClick:()=>Et(""),title:"Clear search",style:{position:"absolute",right:"8px",top:"50%",transform:"translateY(-50%)",background:"#E5E7EB",border:"none",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"18px",color:"#6B7280",zIndex:2},children:"\xd7"})]}),(0,h.jsx)("button",{onClick:()=>{const e=It();if(0===e.length)return void alert("No orders to download");const t=e.map(e=>{var t;const r=new Date(e.order_date||e.createdAt).toLocaleString("en-MY",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0}),n=(null===(t=e.order_items)||void 0===t?void 0:t.map(e=>`${e.quantity}x ${e.menu_item_name||e.name||"Unknown"}`).join("; "))||"",i=e;return[e.order_number||"",r,e.customer_name||"Guest",e.customer_phone||"",(e.order_type||"").replace("_"," ").toUpperCase(),e.table_number||"",e.status||"",e.payment_method||"",e.payment_status||"completed",(0,p.vv)(i.subtotal||e.total_amount||0,Ne.currency),(0,p.vv)(i.service_charge||0,Ne.currency),(0,p.vv)(i.tax||0,Ne.currency),(0,p.vv)(i.discount||0,Ne.currency),(0,p.vv)(e.total_amount||0,Ne.currency),n]}),r="\ufeff"+[["Order Number","Date & Time","Customer Name","Phone","Order Type","Table Number","Status","Payment Method","Payment Status","Subtotal","Service Charge","Tax","Discount","Total Amount","Items"].join(","),...t.map(e=>e.map(e=>`"${e}"`).join(","))].join("\n"),n=new Blob([r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),o=URL.createObjectURL(n);i.setAttribute("href",o),i.setAttribute("download",`live_orders_${At.start}_to_${At.end}.csv`),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},title:"Download CSV",style:{padding:"10px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",marginLeft:"8px"},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"18px",height:"18px"},children:(0,h.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]})}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(S,{active:"all"===Me,onClick:()=>Re("all"),children:["All Orders",(0,h.jsx)(E,{children:Ut("all")})]}),(0,h.jsxs)(S,{active:"outstanding"===Me,onClick:()=>Re("outstanding"),children:["Outstanding",(0,h.jsx)(E,{children:Ut("outstanding")})]}),(0,h.jsxs)(S,{active:"pending"===Me,onClick:()=>Re("pending"),children:["Pending",(0,h.jsx)(E,{children:Ut("pending")})]}),(0,h.jsxs)(S,{active:"preparing"===Me,onClick:()=>Re("preparing"),children:["Preparing",(0,h.jsx)(E,{children:Ut("preparing")})]}),(0,h.jsxs)(S,{active:"ready"===Me,onClick:()=>Re("ready"),children:["Ready",(0,h.jsx)(E,{children:Ut("ready")})]}),(0,h.jsxs)(S,{active:"served"===Me,onClick:()=>Re("served"),children:["Served",(0,h.jsx)(E,{children:Ut("served")})]}),(0,h.jsxs)(S,{active:"completed"===Me,onClick:()=>Re("completed"),children:["Completed",(0,h.jsx)(E,{children:Ut("completed")})]}),(0,h.jsxs)(S,{active:"cancelled"===Me,onClick:()=>Re("cancelled"),children:["Cancelled",(0,h.jsx)(E,{children:Ut("cancelled")})]})]}),(0,h.jsx)(T,{children:(()=>{const e=(()=>{const e=Rt();if(0===e.length)return{totalSales:0,avgOrderAmount:0,maxOrderAmount:0,ordersAbove20Percent:0,avgServeTime:0,maxServeTime:0,minServeTime:0};const t=e.reduce((e,t)=>e+parseFloat(t.total_amount.toString()),0),r=t/e.length,n=Math.max(...e.map(e=>parseFloat(e.total_amount.toString()))),i=e.filter(e=>parseFloat(e.total_amount.toString())>=20).length/e.length*100,o=e.filter(e=>e.served_at&&e.createdAt);let a=0,s=0,d=0;if(o.length>0){const e=o.map(e=>{const t=new Date(e.createdAt).getTime();return(new Date(e.served_at).getTime()-t)/1e3/60});a=e.reduce((e,t)=>e+t,0)/e.length,s=Math.max(...e),d=Math.min(...e)}return{totalSales:t,avgOrderAmount:r,maxOrderAmount:n,ordersAbove20Percent:i,avgServeTime:a,maxServeTime:s,minServeTime:d}})();return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(P,{children:["Total Sales ",(0,h.jsxs)("strong",{children:["RM",e.totalSales.toFixed(2)]})]}),(0,h.jsxs)(P,{children:["Avg ",(0,h.jsxs)("strong",{children:["RM",e.avgOrderAmount.toFixed(2)]})]}),(0,h.jsxs)(P,{children:["Max ",(0,h.jsxs)("strong",{children:["RM",e.maxOrderAmount.toFixed(2)]})]}),(0,h.jsxs)(P,{children:["\u2265RM20 ",(0,h.jsxs)("strong",{children:[e.ordersAbove20Percent.toFixed(1),"%"]})]}),(0,h.jsxs)(P,{children:["Avg Serve ",(0,h.jsxs)("strong",{children:[e.avgServeTime.toFixed(1),"m"]})]}),(0,h.jsxs)(P,{children:["Max Serve ",(0,h.jsxs)("strong",{children:[e.maxServeTime.toFixed(1),"m"]})]}),(0,h.jsxs)(P,{children:["Min Serve ",(0,h.jsxs)("strong",{children:[e.minServeTime.toFixed(1),"m"]})]})]})})()}),(0,h.jsx)(N,{children:Rt().length>0?(0,h.jsxs)(D,{children:[(0,h.jsx)(I,{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)($,{children:"Order"}),(0,h.jsx)($,{children:"Items"}),(0,h.jsx)($,{children:"Status"}),(0,h.jsx)($,{children:"Time"}),(0,h.jsx)($,{children:"Amount"}),(0,h.jsx)($,{children:"Action"})]})}),(0,h.jsx)("tbody",{children:Rt().slice(50*(lt-1),50*lt).map(e=>(0,h.jsxs)(z,{children:[(0,h.jsxs)(O,{"data-label":"ORDER",children:[(0,h.jsxs)(M,{onClick:()=>Ht(e),children:[e.order_number,"takeaway"===e.order_type&&(0,h.jsx)(R,{children:"TAKEAWAY"}),"pickup"===e.order_type&&(0,h.jsx)(R,{style:{background:"#EDE9FE",color:"#7C3AED"},children:"PICKUP"}),"delivery"===e.order_type&&(0,h.jsx)(R,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,h.jsxs)(U,{children:[e.customer_name||"Guest",(0,h.jsx)("br",{}),e.customer_phone||("mobile"===e.source?"Mobile Order":"POS Terminal"),e.table_number&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("br",{}),(0,h.jsxs)("span",{style:{color:"#635BFF",fontWeight:500},children:["Table: ",e.table_number]})]}),e.pager_number&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("br",{}),"Pager: ",e.pager_number]}),"pickup"===e.order_type&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("br",{}),(0,h.jsxs)("span",{style:{color:"#8B5CF6",fontWeight:500},children:["Pickup: ",e.scheduled_pickup_time?m(e.scheduled_pickup_time):"ASAP"]})]})]})]}),(0,h.jsx)(O,{"data-label":"ITEMS",children:(0,h.jsx)(W,{children:e.order_items&&Array.isArray(e.order_items)&&e.order_items.map((e,t)=>{var r;return(0,h.jsxs)(L,{children:[(0,h.jsxs)("div",{children:[(0,h.jsxs)(H,{children:[e.quantity,"x"]}),e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"]}),e.options&&e.options.length>0&&(0,h.jsx)(q,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t)})})}),(0,h.jsx)(O,{"data-label":"STATUS",children:(0,h.jsx)(Y,{status:Ot(e),children:Mt(Ot(e))})}),(0,h.jsx)(O,{"data-label":"TIME",children:(0,h.jsxs)(V,{children:[Kt(e.createdAt||e.order_date),(0,h.jsx)("br",{}),!e.served_at&&(0,h.jsx)(y,{dateString:e.createdAt||e.order_date||""},`time-${e.id}-${ft}`),e.served_at&&(0,h.jsxs)("span",{style:{fontSize:"11px",color:"#0A2540"},children:["Served: ",Kt(e.served_at),(()=>{const t=new Date(e.createdAt||e.order_date).getTime(),r=new Date(e.served_at).getTime();return` (${Math.round((r-t)/1e3/60)}min)`})()]})]})}),(0,h.jsxs)(O,{"data-label":"AMOUNT",children:[(0,h.jsx)(J,{children:(0,p.vv)(Number(e.total_amount),Ne.currency)}),(0,h.jsx)(K,{isPending:"pending"===e.payment_status,isVerificationPending:"payment_verification_pending"===e.payment_status,children:"pending"===e.payment_status?"Pending":"payment_verification_pending"===e.payment_status?"Verifying":e.payment_method})]}),(0,h.jsx)(O,{"data-label":"ACTION",children:(0,h.jsxs)(X,{children:["completed"!==e.status&&"cancelled"!==e.status&&"served"!==e.status&&(0,h.jsx)(h.Fragment,{children:$t(e)?(0,h.jsx)(G,{onClick:()=>{Wt(e.id,"pending")},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}):(0,h.jsx)(G,{onClick:()=>{const t=(r=e.status,{awaiting_payment:"pending",pending:"preparing",preparing:"ready",ready:"completed"===e.payment_status?"completed":"served",served:"completed",completed:null,cancelled:null}[r]||null);var r;t&&Wt(e.id,t)},style:"ready"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:void 0,children:Lt(e.status,e.payment_status,e.order_type)})}),"cancelled"!==e.status&&"awaiting_payment"!==e.status&&!$t(e)&&(0,h.jsx)(G,{variant:"secondary",onClick:()=>{if("pending"===e.status)Wt(e.id,"awaiting_payment");else{const t={preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e.status]||null;t&&Wt(e.id,t)}},title:"Revert to previous status",children:"\u21ba"}),"pending"===e.payment_status&&(0,h.jsx)(G,{onClick:t=>Jt(e,t),style:"served"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:{background:"#F6F9FC",color:"#6B7C93",border:"1px solid #E6EBF1"},children:"Payment"}),"payment_verification_pending"===e.payment_status&&(0,h.jsx)(G,{onClick:t=>(async(e,t)=>{t.stopPropagation(),_t(!1);try{const t=De.find(t=>t.id===e);if(!(await fetch(`/api/orders/${e}`,g({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");t&&"awaiting_payment"===t.status&&await fetch(`/api/orders/${e}`,g({method:"PATCH",body:JSON.stringify({status:"pending"})})),Pt()}catch(r){console.error("Error in quick confirm:",r),alert("Failed to confirm payment. Please try again.")}})(e.id,t),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm"}),"completed"!==e.status&&"cancelled"!==e.status&&"pending"!==e.payment_status&&(0,h.jsx)(Q,{onClick:t=>{t.stopPropagation(),Wt(e.id,"completed")},title:"Mark as Completed",children:(0,h.jsx)(Z,{children:"\u2713"})}),(0,h.jsx)(Q,{onClick:t=>{t.stopPropagation(),Ht(e)},title:"View Details",children:(0,h.jsx)(Z,{children:"\u25c9"})}),(0,h.jsx)(Q,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||Ue;if(r){console.log("\ud83d\udd0d Print Bill - Full order object:",r),console.log("\ud83d\udce6 order_items field:",r.order_items),console.log("\ud83d\udce6 order_items type:",typeof r.order_items),console.log("\ud83d\udce6 Is array?:",Array.isArray(r.order_items));const e=Pe(),n=Array.isArray(r.order_items)?r.order_items:[];if(console.log("\ud83d\udce6 Processed orderItems:",n),console.log("\ud83d\udce6 orderItems length:",n.length),0===n.length)return console.error("\u274c No items found in order!"),void alert("Cannot print: Order has no items. Check console for details.");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],date:new Date(r.order_date||r.createdAt),items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:r}}),subtotal:parseFloat(r.subtotal||"0"),discount:parseFloat(r.discount||"0"),coupon:r.coupon_code?{code:r.coupon_code,discount:parseFloat(r.coupon_discount||"0")}:null,takeawayCharge:parseFloat(r.takeaway_charge||"0"),serviceCharge:parseFloat(r.service_charge||"0"),serviceChargeRate:parseFloat(r.service_charge_rate||"10"),tax:parseFloat(r.tax||"0"),taxRate:parseFloat(r.tax_rate||"6"),total:parseFloat(r.final_price||r.total_amount||"0"),paymentMethod:r.payment_method||"cash",amountReceived:parseFloat(r.amount_received||"0"),change:parseFloat(r.change||"0")};await(0,x.pG)(i,e)&&console.log("Bill printed successfully via RawBT")}})(e)},title:"Print Bill",children:(0,h.jsx)(Z,{children:"\ud83d\udda8"})}),(0,h.jsx)(Q,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||Ue;if(r){const e=Pe(),n=Array.isArray(r.order_items)?r.order_items:[];if(0===n.length)return console.error("\u274c No items found in order!"),void alert("Cannot print: Order has no items.");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],date:new Date(r.order_date||r.createdAt),orderType:r.order_type,orderSource:r.order_source||"pos",tableNumber:r.table_number||null,pagerNumber:r.pager_number||null,customerName:r.customer_name||"Walk-in Customer",items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:r}}),notes:r.notes||"",takeawayCharge:parseFloat(r.takeaway_charge||"0")};await(0,x.Si)(i,e)&&console.log("Kitchen ticket printed successfully via RawBT")}})(e)},title:"Print Kitchen Ticket",children:(0,h.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(0,h.jsx)(Q,{onClick:t=>{var r;t.stopPropagation(),r=e.id,Je(r),Ye(!0)},title:"Delete Order",children:(0,h.jsx)(Z,{children:"\u2715"})})]})})]},e.id))})]}):(0,h.jsx)(ee,{children:"No orders found in this category"})}),(0,h.jsx)(te,{isOpen:Le,onClick:qt,"data-modal":"order-detail",children:(0,h.jsx)(re,{onClick:e=>e.stopPropagation(),children:Ue&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(ne,{children:[(0,h.jsx)(ie,{children:nt?"Receipt Preview":ot?"Kitchen Order Ticket Preview":`Order ${Ue.order_number}`}),(0,h.jsx)(oe,{onClick:qt,children:"\xd7"})]}),ot?(0,h.jsx)(ae,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,h.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Pe(),t=Array.isArray(Ue.order_items)?Ue.order_items:[],r={orderNumber:Ue.order_number,pickupNumber:Ue.order_number.split("-")[1],date:new Date(Ue.order_date||Ue.createdAt),orderType:Ue.order_type,orderSource:Ue.order_source||"pos",tableNumber:Ue.table_number||null,pagerNumber:Ue.pager_number||null,customerName:Ue.customer_name||"Walk-in Customer",scheduledPickupTime:Ue.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:e.options||[]})),notes:Ue.notes||"",takeawayCharge:parseFloat(Ue.takeaway_charge||"0")};return(0,x.KB)(r,e).split("\n").map((e,t)=>(0,h.jsx)("div",{children:e||"\xa0"},t))})()})}):nt?(0,h.jsx)(ae,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,h.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Pe(),t=Array.isArray(Ue.order_items)?Ue.order_items:[],r={orderNumber:Ue.order_number,pickupNumber:Ue.order_number.split("-")[1],pagerNumber:Ue.pager_number||null,date:new Date(Ue.order_date||Ue.createdAt),orderType:Ue.order_type,scheduledPickupTime:Ue.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:e.options||[]})),subtotal:parseFloat(Ue.subtotal||"0"),discount:parseFloat(Ue.discount||"0"),discountPolicy:Ue.discount_policy_name?{name:Ue.discount_policy_name,amount:parseFloat(Ue.discount_policy_amount||"0")}:void 0,coupon:Ue.coupon_code?{code:Ue.coupon_code,discount:parseFloat(Ue.coupon_discount||"0")}:null,takeawayCharge:parseFloat(Ue.takeaway_charge||"0"),serviceCharge:parseFloat(Ue.service_charge||"0"),serviceChargeRate:parseFloat(Ue.service_charge_rate||"10"),tax:parseFloat(Ue.tax||"0"),taxRate:parseFloat(Ue.tax_rate||"6"),total:parseFloat(Ue.final_price||Ue.total_amount||"0"),paymentMethod:Ue.payment_method||"cash",amountReceived:parseFloat(Ue.amount_received||"0"),change:parseFloat(Ue.change||"0"),deliveryInfo:Ue.delivery_info||null,deliveryFee:parseFloat(Ue.delivery_fee||"0")};return(0,x.qE)(r,e).replace(/\x1B[@E][\x00\x01]/g,"").replace(/\x1Ba[\x00-\x02]/g,"").replace(/\x1D![\x00-\x11]/g,"").replace(/\x1DB[\x00\x01]/g,"").replace(/\x1DV\x41\x00/g,"").replace(/[\x1B\x1D]./g,"")})()})}):(0,h.jsxs)(ae,{children:[(0,h.jsxs)(se,{children:[(0,h.jsx)(de,{children:"Customer Information"}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Name:"}),(0,h.jsx)(pe,{children:Ue.customer_name||"Guest"})]}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Phone:"}),(0,h.jsx)(pe,{children:Ue.customer_phone||"N/A"})]}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Order Type:"}),(0,h.jsx)(pe,{children:null===(e=Ue.order_type)||void 0===e?void 0:e.replace("_"," ").toUpperCase()})]}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Source:"}),(0,h.jsx)(pe,{children:"mobile"===Ue.source?"Mobile Order":"kiosk"===Ue.source?"Kiosk":"POS Terminal"})]}),Ue.table_number&&(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Table Number:"}),(0,h.jsx)(pe,{children:Ue.table_number})]}),"pickup"===Ue.order_type&&(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Scheduled Pickup:"}),(0,h.jsx)(pe,{style:{color:"#8B5CF6",fontWeight:600},children:Ue.scheduled_pickup_time?m(Ue.scheduled_pickup_time):"ASAP"})]})]}),"delivery"===Ue.order_type&&Ue.delivery_info&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(ye,{}),(0,h.jsxs)(se,{children:[(0,h.jsx)(de,{children:"Delivery Information"}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Address:"}),(0,h.jsx)(pe,{children:Ue.delivery_info.address})]}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Phone:"}),(0,h.jsx)(pe,{children:Ue.delivery_info.phone})]}),Ue.delivery_info.zoneName&&(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Zone:"}),(0,h.jsx)(pe,{children:Ue.delivery_info.zoneName})]}),Ue.delivery_info.notes&&(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Notes:"}),(0,h.jsx)(pe,{style:{fontStyle:"italic"},children:Ue.delivery_info.notes})]}),Ue.delivery_fee>0&&(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Delivery Fee:"}),(0,h.jsx)(pe,{children:(0,p.vv)(parseFloat(Ue.delivery_fee||"0"),Ne.currency)})]})]})]}),(0,h.jsx)(ye,{}),(0,h.jsxs)(se,{children:[(0,h.jsx)(de,{children:"Order Information"}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Order Time:"}),(0,h.jsx)(pe,{children:Kt(Ue.createdAt)})]}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Status:"}),(0,h.jsx)(pe,{children:(0,h.jsx)(Y,{status:Ue.status,children:Mt(Ue.status)})})]}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Payment Method:"}),(0,h.jsx)(pe,{children:Ue.payment_method||"N/A"})]}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Payment Status:"}),(0,h.jsx)(pe,{children:"payment_verification_pending"===Ue.payment_status?(0,h.jsx)("span",{style:{color:"#F59E0B",fontWeight:500},children:"\u23f3 Verification Pending"}):"pending"===Ue.payment_status?(0,h.jsx)("span",{style:{color:"#FF6B6B",fontWeight:500},children:"Pending"}):"paid"===Ue.payment_status?(0,h.jsx)("span",{style:{color:"#10B981",fontWeight:500},children:"\u2713 Paid"}):Ue.payment_status||"N/A"})]})]}),Ue.payment_proof&&"payment_verification_pending"===Ue.payment_status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(ye,{}),(0,h.jsxs)(se,{children:[(0,h.jsx)(de,{style:{color:"#F59E0B"},children:"Payment Proof (Customer Submitted)"}),Ue.payment_proof.reference&&(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Transaction Reference:"}),(0,h.jsx)(pe,{style:{fontWeight:600,fontFamily:"monospace"},children:Ue.payment_proof.reference})]}),Ue.payment_proof.file_name&&(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Receipt File:"}),(0,h.jsx)(pe,{children:Ue.payment_proof.file_name})]}),Ue.payment_proof.uploaded_at&&(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{children:"Submitted At:"}),(0,h.jsx)(pe,{children:Kt(Ue.payment_proof.uploaded_at)})]}),Ue.payment_proof.image&&(0,h.jsxs)("div",{style:{marginTop:"16px"},children:[(0,h.jsx)(ce,{style:{marginBottom:"8px"},children:"Receipt Image:"}),(0,h.jsx)("div",{style:{position:"relative"},children:(0,h.jsx)("img",{src:Ue.payment_proof.image,alt:"Payment receipt",style:{maxWidth:"100%",maxHeight:"400px",borderRadius:"8px",border:"1px solid #E5E7EB",cursor:"pointer",display:"block"},onClick:()=>window.open(Ue.payment_proof.image,"_blank")})})]})]})]}),(0,h.jsx)(ye,{}),(0,h.jsxs)(se,{children:[(0,h.jsx)(de,{children:"Order Items"}),Ue.order_items&&Array.isArray(Ue.order_items)&&Ue.order_items.map((e,t)=>{var r,n,i;return(0,h.jsx)(xe,{children:(0,h.jsxs)(ue,{children:[(0,h.jsx)(he,{children:e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"}),e.options&&e.options.length>0&&(0,h.jsx)(me,{children:Array.isArray(e.options)?e.options.join(", "):e.options}),(0,h.jsxs)(ge,{children:[(0,h.jsxs)("span",{children:[e.quantity," \xd7 ",(0,p.vv)(parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0),Ne.currency)]}),(0,h.jsx)("span",{children:(0,p.vv)(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0),Ne.currency)})]})]})},t)})]}),(0,h.jsx)(ye,{}),(0,h.jsxs)(be,{children:[(0,h.jsxs)(fe,{children:[(0,h.jsx)("span",{children:"Subtotal"}),(0,h.jsx)("span",{children:(0,p.vv)(Number(Ue.subtotal||Ue.total_amount),Ne.currency)})]}),Ue.takeaway_charge&&parseFloat(Ue.takeaway_charge)>0&&(0,h.jsxs)(fe,{children:[(0,h.jsx)("span",{children:"Takeaway Charge"}),(0,h.jsx)("span",{children:(0,p.vv)(parseFloat(Ue.takeaway_charge),Ne.currency)})]}),Ue.discount>0&&(0,h.jsxs)(fe,{children:[(0,h.jsx)("span",{children:"Discount"}),(0,h.jsx)("span",{children:(0,p.vv)(-Number(Ue.discount),Ne.currency)})]}),Ue.discount_policy_amount>0&&(0,h.jsxs)(fe,{children:[(0,h.jsxs)("span",{children:["Discount (",Ue.discount_policy_name,")"]}),(0,h.jsx)("span",{children:(0,p.vv)(-Number(Ue.discount_policy_amount),Ne.currency)})]}),Ue.coupon_discount>0&&(0,h.jsxs)(fe,{children:[(0,h.jsxs)("span",{children:["Coupon (",Ue.coupon_code,")"]}),(0,h.jsx)("span",{children:(0,p.vv)(-Number(Ue.coupon_discount),Ne.currency)})]}),Ue.service_charge>0&&(0,h.jsxs)(fe,{children:[(0,h.jsxs)("span",{children:["Service Charge (",Ue.service_charge_rate||10,"%)"]}),(0,h.jsx)("span",{children:(0,p.vv)(Number(Ue.service_charge),Ne.currency)})]}),Ue.tax>0&&(0,h.jsxs)(fe,{children:[(0,h.jsxs)("span",{children:["Tax (",Ue.tax_rate||6,"%)"]}),(0,h.jsx)("span",{children:(0,p.vv)(Number(Ue.tax),Ne.currency)})]}),(0,h.jsxs)(fe,{isTotal:!0,children:[(0,h.jsx)("span",{children:"Total"}),(0,h.jsx)("span",{children:(0,p.vv)(Number(Ue.total_amount),Ne.currency)})]})]})]}),(0,h.jsx)(je,{children:nt?(0,h.jsx)(G,{onClick:()=>it(!1),children:"Back to Order Details"}):ot?(0,h.jsx)(G,{onClick:()=>at(!1),children:"Back to Order Details"}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(G,{variant:"secondary",onClick:qt,children:"Close"}),"cancelled"!==Ue.status&&"completed"!==Ue.status&&(0,h.jsx)(G,{onClick:()=>{return e=Ue.id,Xe(e),void Ge(!0);var e},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Cancel Order"}),"pending"===Ue.payment_status&&(0,h.jsx)(G,{onClick:()=>Jt(Ue),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Payment"}),"payment_verification_pending"===Ue.payment_status&&(0,h.jsx)(G,{onClick:async()=>{if(Ue){_t(!1);try{if(!(await fetch(`/api/orders/${Ue.id}`,g({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");"awaiting_payment"===Ue.status&&await fetch(`/api/orders/${Ue.id}`,g({method:"PATCH",body:JSON.stringify({status:"pending"})})),qt(),Pt()}catch(e){console.error("Error confirming payment:",e),alert("Failed to confirm payment. Please try again.")}}else alert("No order selected")},style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),(0,h.jsx)(G,{onClick:()=>it(!0),style:{marginRight:"10px"},children:"View Receipt"}),(0,h.jsx)(G,{onClick:()=>at(!0),style:{marginRight:"10px"},children:"View Order Ticket"}),(0,h.jsx)(G,{onClick:async()=>{if(Ue){const e=Pe(),t={orderNumber:Ue.order_number,pickupNumber:Ue.order_number.split("-")[1],date:new Date(Ue.order_date||Ue.createdAt),items:Ue.order_items.map(e=>({menuItem:{name:e.menu_item_name,price:parseFloat(e.price)},quantity:e.quantity,options:e.options||[]})),subtotal:parseFloat(Ue.subtotal||"0"),discount:parseFloat(Ue.discount||"0"),coupon:Ue.coupon_code?{code:Ue.coupon_code,discount:parseFloat(Ue.coupon_discount||"0")}:null,serviceCharge:parseFloat(Ue.service_charge||"0"),serviceChargeRate:parseFloat(Ue.service_charge_rate||"10"),tax:parseFloat(Ue.tax||"0"),taxRate:parseFloat(Ue.tax_rate||"6"),total:parseFloat(Ue.final_price||Ue.total_amount||"0"),paymentMethod:Ue.payment_method||"cash",amountReceived:parseFloat(Ue.amount_received||"0"),change:parseFloat(Ue.change||"0")};await(0,x.pG)(t,e)&&console.log("Receipt printed successfully via RawBT")}},children:"Print Bill"})]})})]})})}),Ue&&i.createPortal((0,h.jsxs)(ve,{id:"bill-print-content",children:[(0,h.jsxs)(Fe,{children:[(0,h.jsx)(we,{children:(null===mt||void 0===mt?void 0:mt.companyName)||"Restaurant"}),mt&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{style:{fontSize:"11px",marginTop:"5px"},children:mt.address}),(0,h.jsxs)("div",{style:{fontSize:"11px"},children:[mt.city,", ",mt.state," ",mt.postcode]}),(0,h.jsxs)("div",{style:{fontSize:"11px"},children:["Tel: ",mt.phone]}),mt.email&&(0,h.jsxs)("div",{style:{fontSize:"11px"},children:["Email: ",mt.email]}),mt.taxNo&&(0,h.jsxs)("div",{style:{fontSize:"11px",marginTop:"3px"},children:["Tax No: ",mt.taxNo]})]}),(0,h.jsx)("div",{style:{fontSize:"12px",fontWeight:"bold",marginTop:"5px"},children:"ORDER RECEIPT"})]}),(0,h.jsxs)(Ae,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,h.jsxs)(ke,{children:[(0,h.jsx)("strong",{children:"Order No:"}),(0,h.jsx)("span",{children:Ue.order_number})]}),(0,h.jsxs)(ke,{children:[(0,h.jsx)("strong",{children:"Date:"}),(0,h.jsx)("span",{children:Kt(Ue.order_date||Ue.createdAt)})]}),(0,h.jsxs)(ke,{children:[(0,h.jsx)("strong",{children:"Customer:"}),(0,h.jsx)("span",{children:Ue.customer_name||"Guest"})]}),(0,h.jsxs)(ke,{children:[(0,h.jsx)("strong",{children:"Phone:"}),(0,h.jsx)("span",{children:Ue.customer_phone||"N/A"})]}),(0,h.jsxs)(ke,{children:[(0,h.jsx)("strong",{children:"Order Type:"}),(0,h.jsx)("span",{children:"dine_in"===Ue.order_type?"DINE IN":null===(t=Ue.order_type)||void 0===t?void 0:t.toUpperCase()})]}),Ue.table_number&&(0,h.jsxs)(ke,{children:[(0,h.jsx)("strong",{children:"Table:"}),(0,h.jsx)("span",{children:Ue.table_number})]}),("takeaway"===Ue.order_type||"pickup"===Ue.order_type)&&(0,h.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",Ue.order_number.split("-")[1]||"000"]}),"pickup"===Ue.order_type&&(0,h.jsxs)("div",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"center",margin:"5px 0",color:"#8B5CF6"},children:["Pickup: ",Ue.scheduled_pickup_time?m(Ue.scheduled_pickup_time):"ASAP"]})]}),(0,h.jsx)(Ae,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,h.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,h.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,h.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,h.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,h.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,h.jsx)("tbody",{children:Ue.order_items&&Array.isArray(Ue.order_items)&&Ue.order_items.map((e,t)=>{var r,n,i;return(0,h.jsxs)("tr",{children:[(0,h.jsxs)("td",{style:{padding:"5px 0"},children:[e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",e.options&&e.options.length>0&&(0,h.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:Array.isArray(e.options)?e.options.join(", "):e.options})]}),(0,h.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,h.jsx)("td",{style:{textAlign:"right"},children:parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0).toFixed(2)}),(0,h.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0)).toFixed(2)})]},t)})})]})}),(0,h.jsxs)(Ae,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,h.jsxs)(ke,{children:[(0,h.jsx)("span",{children:"Subtotal:"}),(0,h.jsx)("span",{children:(0,p.vv)(Number(Ue.subtotal||Ue.total_amount),Ne.currency)})]}),Ue.discount>0&&(0,h.jsxs)(ke,{children:[(0,h.jsx)("span",{children:"Discount:"}),(0,h.jsx)("span",{children:(0,p.vv)(-Number(Ue.discount),Ne.currency)})]}),Ue.coupon_discount>0&&(0,h.jsxs)(ke,{children:[(0,h.jsxs)("span",{children:["Coupon (",Ue.coupon_code,"):"]}),(0,h.jsx)("span",{children:(0,p.vv)(-Number(Ue.coupon_discount),Ne.currency)})]}),parseFloat(Ue.takeaway_charge||0)>0&&(0,h.jsxs)(ke,{children:[(0,h.jsx)("span",{children:"Takeaway Charge:"}),(0,h.jsx)("span",{children:(0,p.vv)(parseFloat(Ue.takeaway_charge),Ne.currency)})]}),Ue.service_charge>0&&(0,h.jsxs)(ke,{children:[(0,h.jsxs)("span",{children:["Service Charge (",Ue.service_charge_rate||10,"%):"]}),(0,h.jsx)("span",{children:(0,p.vv)(Number(Ue.service_charge),Ne.currency)})]}),Ue.tax>0&&(0,h.jsxs)(ke,{children:[(0,h.jsxs)("span",{children:["Tax (",Ue.tax_rate||6,"%):"]}),(0,h.jsx)("span",{children:(0,p.vv)(Number(Ue.tax),Ne.currency)})]}),(0,h.jsxs)(ke,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,h.jsx)("span",{children:"TOTAL:"}),(0,h.jsx)("span",{children:(0,p.vv)(Number(Ue.total_amount),Ne.currency)})]})]}),(0,h.jsxs)(Ae,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,h.jsxs)(ke,{children:[(0,h.jsx)("span",{children:"Payment Method:"}),(0,h.jsx)("span",{children:Ue.payment_method?Ue.payment_method.toUpperCase():"N/A"})]}),(0,h.jsxs)(ke,{children:[(0,h.jsx)("span",{children:"Order Status:"}),(0,h.jsx)("span",{children:Ue.status.toUpperCase()})]})]}),(0,h.jsxs)(Ce,{children:[(0,h.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,h.jsx)("div",{children:"Thank you for your purchase!"}),(0,h.jsx)("div",{children:"Please keep this receipt for your records"})]})]}),document.body),(0,h.jsx)(te,{isOpen:qe,onClick:Yt,"data-modal":"delete-confirm",children:(0,h.jsxs)(re,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(ne,{children:[(0,h.jsx)(ie,{children:"Delete Order"}),(0,h.jsx)(oe,{onClick:Yt,children:"\xd7"})]}),(0,h.jsxs)(ae,{children:[(0,h.jsx)("p",{children:"Are you sure you want to delete this order? This action cannot be undone."}),(0,h.jsxs)("p",{style:{color:"#FF6B6B",fontWeight:500,marginTop:"16px"},children:["Order #",Ve&&(null===(r=De.find(e=>e.id===Ve))||void 0===r?void 0:r.order_number)]})]}),(0,h.jsxs)(je,{children:[(0,h.jsx)(G,{variant:"secondary",onClick:Yt,children:"Cancel"}),(0,h.jsx)(G,{onClick:async()=>{if(Ve){const t=Ve;Ie(e=>e.filter(e=>e.id!==t)),Ye(!1),Je(null);try{const e=await fetch(`/api/orders/${t}`,g({method:"DELETE"}));(await e.json()).success?console.log("Order deleted successfully"):Pt()}catch(e){console.error("Failed to delete order:",e),Pt()}}else Ye(!1)},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Delete Order"})]})]})}),(0,h.jsx)(te,{isOpen:Ke,onClick:e=>e.target===e.currentTarget&&Vt(),children:(0,h.jsxs)(re,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(ne,{children:[(0,h.jsx)(ie,{children:"Cancel Order"}),(0,h.jsx)(oe,{onClick:Vt,children:"\xd7"})]}),(0,h.jsx)(ae,{children:(0,h.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:"1.6"},children:"Are you sure you want to cancel this order? The order history will be kept for your records."})}),(0,h.jsxs)(je,{children:[(0,h.jsx)(G,{variant:"secondary",onClick:Vt,children:"No, Keep Order"}),(0,h.jsx)(G,{onClick:async()=>{if(Qe){Ie(e=>e.map(e=>e.id===Qe?{...e,status:"cancelled"}:e)),Ge(!1),(null===Ue||void 0===Ue?void 0:Ue.id)===Qe&&qt();try{const e=await fetch(`/api/orders/${Qe}/status`,g({method:"PATCH",body:JSON.stringify({status:"cancelled"})}));(await e.json()).success?console.log("Order cancelled successfully"):Pt()}catch(e){console.error("Failed to cancel order:",e),Pt()}finally{Xe(null)}}},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Yes, Cancel Order"})]})]})}),Ze&&tt&&(0,h.jsx)(l.A,{isOpen:Ze,onClose:()=>{et(!1),setTimeout(()=>{rt(null)},100)},total:Number(tt.total_amount),subtotal:Number(tt.subtotal||0),tax:Number(tt.tax||0),serviceCharge:Number(tt.service_charge||0),discountAmount:Number(tt.discount||0),couponDiscount:Number(tt.coupon_discount||0),onConfirmPayment:async(e,t,r)=>{if(tt){_t(!1);try{if(!(await fetch(`/api/orders/${tt.id}`,g({method:"PATCH",body:JSON.stringify({payment_status:"completed",payment_method:e})}))).ok)throw new Error("Failed to confirm payment");"awaiting_payment"===tt.status?await fetch(`/api/orders/${tt.id}`,g({method:"PATCH",body:JSON.stringify({status:"pending"})})):"served"===tt.status&&await fetch(`/api/orders/${tt.id}`,g({method:"PATCH",body:JSON.stringify({status:"completed"})})),et(!1),rt(null),await Pt(),Le&&(He(!1),We(null))}catch(n){console.error("\u274c Payment error:",n),alert("Failed to confirm payment. Please try again.")}}},paymentMethods:yt})]}),(()=>{const e=Rt().length,t=Math.ceil(e/50);return t>1&&(0,h.jsxs)(Be,{children:[(0,h.jsxs)(Se,{children:["Showing ",50*(lt-1)+1,"-",Math.min(50*lt,e)," of ",e," orders"]}),(0,h.jsxs)(Ee,{children:[(0,h.jsx)(Te,{onClick:()=>ct(1),disabled:1===lt,children:"First"}),(0,h.jsx)(Te,{onClick:()=>ct(e=>Math.max(1,e-1)),disabled:1===lt,children:"Previous"}),[...Array(Math.min(5,t))].map((e,r)=>{let n;return n=t<=5||lt<=3?r+1:lt>=t-2?t-4+r:lt-2+r,(0,h.jsx)(Te,{active:lt===n,onClick:()=>ct(n),children:n},n)}),(0,h.jsx)(Te,{onClick:()=>ct(e=>Math.min(t,e+1)),disabled:lt===t,children:"Next"}),(0,h.jsx)(Te,{onClick:()=>ct(t),disabled:lt===t,children:"Last"})]})]})})()]})]})}},8406:(e,t,r)=>{r.d(t,{MQ:()=>a,fU:()=>o,ng:()=>n,r6:()=>i});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",i=(e,t,r)=>{if(!e)return"";const i=new Date(e);if(isNaN(i.getTime()))return"";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return i.toLocaleString("en-MY",{...o,...r})},o=(e,t)=>i(e,t,{year:void 0,month:void 0,day:void 0}),a=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const r=Date.now()-t,n=Math.floor(r/6e4),i=Math.floor(r/36e5),o=Math.floor(r/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===i?"1 hour ago":i<24?`${i} hours ago`:1===o?"1 day ago":`${o} days ago`}}}]);