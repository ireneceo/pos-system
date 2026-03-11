"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6458],{1472:(e,t,i)=>{i.d(t,{A:()=>r});i(9950);var n=i(9610),o=i(4414);const r=e=>{let{isOpen:t,onClose:i,onConfirm:r,title:a,message:s,confirmText:l="Confirm",cancelText:d="Cancel",variant:p="info"}=e;const c=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.yl,{variant:"secondary",onClick:i,children:d}),(0,o.jsx)(n.yl,{variant:(()=>{switch(p){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:r,children:l})]});return(0,o.jsx)(n.aF,{isOpen:t,onClose:i,title:a,footer:c,children:(0,o.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,o.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(p){case"danger":case"warning":return"!";default:return"i"}})()}),(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:s})]})})}},2159:(e,t,i)=>{i.d(t,{$Q:()=>l,F8:()=>h,FA:()=>g,I1:()=>o,NM:()=>A,Oc:()=>p,PU:()=>c,Sb:()=>d,a:()=>s,aX:()=>b,bU:()=>F,ey:()=>u,hO:()=>w,i_:()=>m,iz:()=>v,jj:()=>x,kr:()=>y,nJ:()=>f,wn:()=>r,z6:()=>a});var n=i(4752);const o=n.Ay.span`
  color: #EF4444;
  margin-left: 4px;
`,r=n.Ay.div`
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
`,l=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,d=n.Ay.label`
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
`,p=n.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`,c=n.Ay.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`,x=n.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,h=n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`,u=n.Ay.button`
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
`,g=n.Ay.span`
  font-size: 18px;
  font-weight: 600;
  width: 40px;
  text-align: center;
  color: #1F2937;
`,m=n.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding: 16px 0 0 0;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,f=n.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,b=n.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`,y=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`,w=n.Ay.div`
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,v=n.Ay.div``,F=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,A=n.Ay.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`},2488:(e,t,i)=>{i.d(t,{DO:()=>c,Jt:()=>x,Qn:()=>p});i(9950);var n=i(4752),o=i(4414);const r=n.Ay.div`
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
`,a=n.Ay.input`
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
`,s=n.Ay.div`
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
`,l=n.Ay.button`
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
`,d=n.Ay.select`
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
`,p=e=>{let{children:t,className:i,style:n,...a}=e;return(0,o.jsx)(r,{className:i,style:n,...a,children:t})},c=e=>{let{placeholder:t="Search...",value:i,onChange:n,style:r,...d}=e;return(0,o.jsxs)(s,{style:r,children:[(0,o.jsx)(a,{placeholder:t,value:i,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...d}),i&&(0,o.jsx)(l,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,o.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...i}=e;return(0,o.jsx)(d,{...i,children:t})}},2538:(e,t,i)=>{i.d(t,{A:()=>p});var n=i(9950),o=i(9610),r=i(4752),a=i(4414);const s=r.Ay.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.15s;
  text-align: center;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,l=r.Ay.div`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,d=r.Ay.div`
  color: #6B7C93;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,p=e=>{let{isOpen:t,onClose:i,onConfirm:r,title:p,label:c,placeholder:x="",min:h=0,max:u,step:g=1,suffix:m="",confirmText:f="Apply",cancelText:b="Cancel"}=e;const[y,w]=(0,n.useState)(""),[v,F]=(0,n.useState)(""),A=()=>{const e=parseFloat(y);!isNaN(e)&&e>=h&&(void 0===u||e<=u)&&(r(y),w(""),F(""),i())},j=()=>{w(""),F(""),i()},k=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.yl,{variant:"secondary",onClick:j,children:b}),(0,a.jsx)(o.yl,{variant:"primary",onClick:A,disabled:!y||!!v||parseFloat(y)<h,children:f})]});return(0,a.jsx)(o.aF,{isOpen:t,onClose:j,title:p,footer:k,children:(0,a.jsxs)("div",{children:[(0,a.jsx)(o.lR,{children:c}),(0,a.jsx)(s,{type:"text",value:y,onChange:e=>{const t=e.target.value;if(""===t)return w(""),void F("");if(!/^\d*\.?\d*$/.test(t))return;const i=parseFloat(t);isNaN(i)||F(i<h?`Minimum value is ${h}${m}`:void 0!==u&&i>u?`Maximum value is ${u}${m}`:""),w(t)},placeholder:x,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!v&&y&&A()}}),v&&(0,a.jsx)(l,{children:v}),!v&&void 0!==u&&(0,a.jsxs)(d,{children:["Enter a value between ",h,m," and ",u,m]})]})})}},2597:(e,t,i)=>{i.d(t,{Ex:()=>p,oz:()=>d,tU:()=>l});i(9950);var n=i(4752),o=i(4414);const r=n.Ay.div`
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
`,a=n.Ay.button`
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
`,s=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:i,style:n}=e;return(0,o.jsx)(r,{className:i,style:n,children:t})},d=e=>{let{active:t,onClick:i,children:n,className:r}=e;return(0,o.jsx)(a,{active:t,onClick:i,className:r,children:n})},p=e=>{let{count:t,variant:i="default",showZero:n=!1}=e;return 0!==t||n?(0,o.jsx)(s,{variant:i,children:t}):null}},3224:(e,t,i)=>{i.d(t,{eP:()=>s});i(2488),i(2597),i(9194),i(1472),i(4334),i(2538),i(4877),i(8666),i(8012);var n=i(9950),o=(i(9610),i(4752)),r=i(4414);o.Ay.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #625CF6;
    box-shadow: 0 0 0 3px rgba(98, 92, 246, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,o.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.15s;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #625CF6;
    box-shadow: 0 0 0 3px rgba(98, 92, 246, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;i(2159);var a=i(4492);const s=e=>{let{items:t,entityId:i}=e;const o=(0,a.Zp)(),s=`setup_guide_dismissed_${i||"default"}`,A=t.filter(e=>e.completed).length,j=A===t.length,[k,B]=n.useState(()=>!!j||"true"===localStorage.getItem(s));if(n.useEffect(()=>{j&&(localStorage.setItem(s,"true"),B(!0))},[j,s]),k)return null;const C=t.filter(e=>!e.completed);return(0,r.jsxs)(l,{children:[(0,r.jsxs)(d,{children:[(0,r.jsxs)(p,{children:[(0,r.jsx)(c,{children:"Complete Your Setup"}),(0,r.jsxs)(x,{children:[A,"/",t.length," completed"]})]}),(0,r.jsx)(h,{onClick:()=>{localStorage.setItem(s,"true"),B(!0)},children:"Dismiss"})]}),(0,r.jsx)(u,{children:(0,r.jsx)(g,{style:{width:A/t.length*100+"%"}})}),(0,r.jsx)(m,{children:C.map(e=>(0,r.jsxs)(f,{onClick:()=>o(e.path),children:[(0,r.jsx)(b,{children:"\u25cb"}),(0,r.jsxs)(y,{children:[(0,r.jsx)(w,{children:e.label}),(0,r.jsx)(v,{children:e.description})]}),(0,r.jsx)(F,{children:"\u2192"})]},e.key))})]})},l=o.Ay.div`
  background: white;
  border: 1px solid #E0E7FF;
  border-left: 4px solid #635BFF;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
`,d=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,p=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,c=o.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,x=o.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,h=o.Ay.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    color: #6B7280;
    background: #F3F4F6;
  }
`,u=o.Ay.div`
  height: 4px;
  background: #E5E7EB;
  border-radius: 2px;
  margin-bottom: 16px;
  overflow: hidden;
`,g=o.Ay.div`
  height: 100%;
  background: #635BFF;
  border-radius: 2px;
  transition: width 0.3s ease;
`,m=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,f=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }
`,b=o.Ay.span`
  font-size: 16px;
  color: #D1D5DB;
  flex-shrink: 0;
`,y=o.Ay.div`
  flex: 1;
  min-width: 0;
`,w=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,v=o.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 1px;
`,F=o.Ay.span`
  font-size: 14px;
  color: #D1D5DB;
  flex-shrink: 0;
`},4021:(e,t,i)=>{i.d(t,{i1:()=>a});var n=i(9950),o=i(1367),r=i(6038);const a=()=>{const{user:e}=(0,o.As)(),[t,i]=(0,n.useState)("RM"),[a]=(0,n.useState)(Object.keys(r.DL)),[s,l]=(0,n.useState)(!0),[d,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let o=n>=0?t[n+1]:null;if(!o&&null!==e&&void 0!==e&&e.restaurant_id&&(o=e.restaurant_id.toString()),!o)return i("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${o}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var r;const e=await t.json(),n=e.currency||(null===(r=e.operation_settings)||void 0===r?void 0:r.currency)||"RM";i(n)}else i("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),i("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:s,error:d}}},4334:(e,t,i)=>{i.d(t,{A:()=>r});i(9950);var n=i(9610),o=i(4414);const r=e=>{let{isOpen:t,onClose:i,title:r,message:a,buttonText:s="OK"}=e;const l=(0,o.jsx)(n.yl,{onClick:i,style:{maxWidth:"200px",margin:"0 auto"},children:s});return(0,o.jsx)(n.aF,{isOpen:t,onClose:i,title:r,footer:l,children:(0,o.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.5"},children:a})})})}},4877:(e,t,i)=>{i.d(t,{A:()=>w});var n=i(9950),o=i(4752),r=i(4414);const a=o.Ay.div`
  margin-bottom: 16px;
`,s=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=o.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,p=o.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: ${e=>e.isUploading?"wait":"pointer"};
  transition: all 0.2s;
  overflow: hidden;
  position: relative;
  opacity: ${e=>e.isUploading?.7:1};

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,c=o.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=o.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,h=o.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,u=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=o.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: ${e=>e.disabled?"wait":"pointer"};
  transition: all 0.2s;
  display: inline-block;
  text-align: center;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    background: ${e=>e.disabled?"transparent":"#635BFF"};
    color: ${e=>e.disabled?"#635BFF":"white"};
  }

  input {
    display: none;
  }
`,m=o.Ay.button`
  padding: 8px 16px;
  border: 1px solid #DC2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,f=o.Ay.input`
  display: none;
`,b=o.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,y=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",w=e=>{let{value:t,onChange:i,label:o="Logo Upload",helpText:w="Upload an image for your logo",maxSize:v=2,previewSize:F=150,showRemoveButton:A=!0,changeButtonText:j="Change Image",removeButtonText:k="Remove Image",imageAltText:B="Uploaded"}=e;const[C,E]=(0,n.useState)(!1),[z,D]=(0,n.useState)(!1),$=(0,n.useRef)(null),S=(0,n.useRef)(null),I=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);D(!0);const t=new FileReader;t.onload=async e=>{var t;const n=new Image;n.onload=async()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return void D(!1);const o=1200;let r=n.width,a=n.height;(r>o||a>o)&&(r>a?(a=a/r*o,r=o):(r=r/a*o,a=o)),e.width=r,e.height=a,t.drawImage(n,0,0,r,a);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const t=localStorage.getItem("auth_token"),i=await fetch(`${y()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),n=await i.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(t){return console.error("Image upload error:",t),null}})(s);D(!1),l?i(l):alert("Failed to upload image. Please try again.")},n.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},O=e=>{if(z)return;const t=e.target.files;t&&t.length>0&&I(t[0]),e.target.value=""};return(0,r.jsxs)(a,{children:[o&&(0,r.jsx)(s,{children:o}),w&&(0,r.jsx)(l,{children:w}),(0,r.jsxs)(d,{children:[(0,r.jsx)(p,{ref:S,isDragging:C,hasImage:!!t,isUploading:z,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),z||E(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===S.current&&E(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),E(!1),z)return;const t=e.dataTransfer.files;t&&t.length>0&&I(t[0])},onClick:()=>{var e;t||z||(null===(e=$.current)||void 0===e||e.click())},children:z?(0,r.jsxs)(c,{children:[(0,r.jsx)(b,{}),(0,r.jsx)(x,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,r.jsx)("img",{src:(_=t,_?_.startsWith("http")?_:_.startsWith("/uploads/")?`${y()}${_}`:_:""),alt:B}):(0,r.jsxs)(c,{children:[(0,r.jsx)(x,{children:C?"Drop image here":"Drag & drop or click to upload"}),(0,r.jsxs)(h,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),t&&!z&&(0,r.jsxs)(u,{children:[(0,r.jsxs)(g,{disabled:z,children:[j,(0,r.jsx)("input",{ref:$,type:"file",accept:"image/*",onChange:O,disabled:z})]}),A&&(0,r.jsx)(m,{onClick:()=>{i("")},disabled:z,children:k})]})]}),!t&&!z&&(0,r.jsx)(f,{ref:$,type:"file",accept:"image/*",onChange:O})]});var _}},8012:(e,t,i)=>{i.d(t,{Ay:()=>l});i(9950);var n=i(4752),o=i(4414);const r=n.Ay.div`
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
`,a=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,s=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:t,children:i}=e;return(0,o.jsxs)(r,{children:[(0,o.jsx)(a,{children:t}),i&&(0,o.jsx)(s,{children:i})]})}},8608:(e,t,i)=>{i.d(t,{d:()=>r});var n=i(9950);function o(e){if(!e)return!1;const t=e.business_registration||e.registration_no,i=e.tax_id||e.tax_no;return!(!e.address||!e.phone||!t&&!i)}function r(e){const[t,i]=(0,n.useState)([]),[r,a]=(0,n.useState)(!0),{role:s,restaurantId:l,brandId:d,foodcourtId:p}=e;return(0,n.useEffect)(()=>{(async()=>{try{a(!0);const n=function(){const e=localStorage.getItem("auth_token"),t={"Content-Type":"application/json"};return e&&(t.Authorization=`Bearer ${e}`),t}();if("Restaurant Admin"!==s&&"Staff"!==s||!l)if("Brand General"!==s&&"Brand Manager"!==s||!d)if("Foodcourt General"!==s&&"Foodcourt Manager"!==s||!p)i([]);else{const e=await fetch("/api/foodcourts/company-info",{headers:n});let t=null;if(e.ok){const i=await e.json();t=i.data||i}i([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/foodcourt/company-info",completed:o(t)}])}else{const e=await fetch("/api/brands/company-info",{headers:n});let t=null;if(e.ok){const i=await e.json();t=i.data||i}i([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/brand/company-info",completed:o(t)}])}else{var e,t;const[r,a]=await Promise.all([fetch(`/api/restaurants/${l}/company-info`,{headers:n}),fetch(`/api/restaurants/${l}`,{headers:n})]);let s=null,d=null;if(r.ok){const e=await r.json();s=e.data||e}if(a.ok){const e=await a.json();d=e.data||e}const p=o(s),c=!(null===(e=d)||void 0===e||!e.currency),x=!(null===(t=d)||void 0===t||!t.operation_settings);i([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:`/restaurant/${l}/company-information`,completed:p},{key:"store_settings",label:"Review Store Settings",description:"Verify your currency, operating hours, and payment preferences",path:`/restaurant/${l}/settings`,completed:c&&x}])}}catch(n){console.error("useSetupStatus Error:",n),i([])}finally{a(!1)}})()},[s,l,d,p]),{items:t,loading:r}}},9194:(e,t,i)=>{i.d(t,{A:()=>m});var n=i(9950),o=i(4752),r=i(4414);const a=o.Ay.div`
  position: relative;
  width: 100%;
`,s=o.Ay.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid ${e=>e.isOpen?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  background: ${e=>e.disabled?"#F9FAFB":"white"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>e.disabled?"#E6EBF1":"#635BFF"};
  }

  ${e=>e.isOpen&&"\n    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);\n  "}
`,l=o.Ay.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: ${e=>e.disabled?"#9CA3AF":"#0A2540"};
  cursor: ${e=>e.disabled?"not-allowed":"text"};

  &::placeholder {
    color: #9CA3AF;
  }
`,d=o.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: #E5E7EB;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.2s;

  &:hover {
    background: #D1D5DB;
  }

  svg {
    width: 12px;
    height: 12px;
    color: #6B7280;
  }
`,p=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  transform: ${e=>e.isOpen?"rotate(180deg)":"rotate(0deg)"};

  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`,c=o.Ay.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 240px;
  overflow-y: auto;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${e=>e.isOpen?"block":"none"};
`,x=o.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,h=o.Ay.div`
  font-size: 14px;
`,u=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,g=o.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,m=e=>{let{options:t,value:i,onChange:o,placeholder:m="Select...",disabled:f=!1,allowClear:b=!0,noOptionsMessage:y="No options found"}=e;const[w,v]=(0,n.useState)(!1),[F,A]=(0,n.useState)(""),[j,k]=(0,n.useState)(-1),B=(0,n.useRef)(null),C=(0,n.useRef)(null),E=t.find(e=>e.value===i),z=t.filter(e=>e.label.toLowerCase().includes(F.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(F.toLowerCase()));(0,n.useEffect)(()=>{const e=e=>{B.current&&!B.current.contains(e.target)&&(v(!1),A(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,n.useEffect)(()=>{w||(A(""),k(-1))},[w]);const D=e=>{o(e.value),v(!1),A("")},$=w?F:(null===E||void 0===E?void 0:E.label)||"";return(0,r.jsxs)(a,{ref:B,children:[(0,r.jsxs)(s,{isOpen:w,disabled:f,onClick:()=>{var e;f||(v(!0),null===(e=C.current)||void 0===e||e.focus())},children:[(0,r.jsx)(l,{ref:C,type:"text",value:$,onChange:e=>{A(e.target.value),k(0),w||v(!0)},onKeyDown:e=>{if(!f)switch(e.key){case"ArrowDown":e.preventDefault(),w?k(e=>e<z.length-1?e+1:e):v(!0);break;case"ArrowUp":e.preventDefault(),k(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),w&&j>=0&&z[j]?D(z[j]):w||v(!0);break;case"Escape":v(!1),A("")}},placeholder:m,disabled:f}),b&&i&&!f&&(0,r.jsx)(d,{onClick:e=>{e.stopPropagation(),o(null),A("")},type:"button",children:(0,r.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,r.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,r.jsx)(p,{isOpen:w,children:(0,r.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,r.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,r.jsx)(c,{isOpen:w,children:z.length>0?z.map((e,t)=>(0,r.jsxs)(x,{isSelected:e.value===i,isHighlighted:t===j,onClick:()=>D(e),onMouseEnter:()=>k(t),children:[(0,r.jsx)(h,{children:e.label}),e.subLabel&&(0,r.jsx)(u,{children:e.subLabel})]},e.value)):(0,r.jsx)(g,{children:y})})]})}}}]);