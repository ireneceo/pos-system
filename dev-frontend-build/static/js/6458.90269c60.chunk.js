"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6458],{1472:(e,t,o)=>{o.d(t,{A:()=>i});o(9950);var r=o(9610),n=o(4414);const i=e=>{let{isOpen:t,onClose:o,onConfirm:i,title:a,message:s,confirmText:l="Confirm",cancelText:d="Cancel",variant:p="info"}=e;const c=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.yl,{variant:"secondary",onClick:o,children:d}),(0,n.jsx)(r.yl,{variant:(()=>{switch(p){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:i,children:l})]});return(0,n.jsx)(r.aF,{isOpen:t,onClose:o,title:a,footer:c,zIndex:1100,children:(0,n.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,n.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(p){case"danger":case"warning":return"!";default:return"i"}})()}),(0,n.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:s})]})})}},2159:(e,t,o)=>{o.d(t,{$Q:()=>l,F8:()=>u,FA:()=>g,I1:()=>n,NM:()=>F,Oc:()=>p,PU:()=>c,Sb:()=>d,a:()=>s,aX:()=>b,bU:()=>A,ey:()=>h,hO:()=>v,i_:()=>m,iz:()=>w,jj:()=>x,kr:()=>y,nJ:()=>f,wn:()=>i,z6:()=>a});var r=o(4752);const n=r.Ay.span`
  color: #EF4444;
  margin-left: 4px;
`,i=r.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,a=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`,s=r.Ay.button`
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
`,l=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,d=r.Ay.label`
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
`,p=r.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`,c=r.Ay.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`,x=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,u=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`,h=r.Ay.button`
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
`,g=r.Ay.span`
  font-size: 18px;
  font-weight: 600;
  width: 40px;
  text-align: center;
  color: #1F2937;
`,m=r.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding: 16px 0 0 0;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,f=r.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,b=r.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`,y=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`,v=r.Ay.div`
  width: 48px;
  height: 48px;
  background: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,w=r.Ay.div``,A=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,F=r.Ay.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`},2488:(e,t,o)=>{o.d(t,{DO:()=>c,Jt:()=>x,Qn:()=>p});o(9950);var r=o(4752),n=o(4414);const i=r.Ay.div`
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
`,a=r.Ay.input`
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
`,s=r.Ay.div`
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
`,l=r.Ay.button`
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
`,d=r.Ay.select`
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
`,p=e=>{let{children:t,className:o,style:r,...a}=e;return(0,n.jsx)(i,{className:o,style:r,...a,children:t})},c=e=>{let{placeholder:t="Search...",value:o,onChange:r,style:i,...d}=e;return(0,n.jsxs)(s,{style:i,children:[(0,n.jsx)(a,{placeholder:t,value:o,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:o?"36px":"16px"},...d}),o&&(0,n.jsx)(l,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...o}=e;return(0,n.jsx)(d,{...o,children:t})}},2538:(e,t,o)=>{o.d(t,{A:()=>p});var r=o(9950),n=o(9610),i=o(4752),a=o(4414);const s=i.Ay.input`
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
`,l=i.Ay.div`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,d=i.Ay.div`
  color: #6B7C93;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,p=e=>{let{isOpen:t,onClose:o,onConfirm:i,title:p,label:c,placeholder:x="",min:u=0,max:h,step:g=1,suffix:m="",confirmText:f="Apply",cancelText:b="Cancel"}=e;const[y,v]=(0,r.useState)(""),[w,A]=(0,r.useState)(""),F=()=>{const e=parseFloat(y);!isNaN(e)&&e>=u&&(void 0===h||e<=h)&&(i(y),v(""),A(""),o())},k=()=>{v(""),A(""),o()},j=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.yl,{variant:"secondary",onClick:k,children:b}),(0,a.jsx)(n.yl,{variant:"primary",onClick:F,disabled:!y||!!w||parseFloat(y)<u,children:f})]});return(0,a.jsx)(n.aF,{isOpen:t,onClose:k,title:p,footer:j,children:(0,a.jsxs)("div",{children:[(0,a.jsx)(n.lR,{children:c}),(0,a.jsx)(s,{type:"text",value:y,onChange:e=>{const t=e.target.value;if(""===t)return v(""),void A("");if(!/^\d*\.?\d*$/.test(t))return;const o=parseFloat(t);isNaN(o)||A(o<u?`Minimum value is ${u}${m}`:void 0!==h&&o>h?`Maximum value is ${h}${m}`:""),v(t)},placeholder:x,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!w&&y&&F()}}),w&&(0,a.jsx)(l,{children:w}),!w&&void 0!==h&&(0,a.jsxs)(d,{children:["Enter a value between ",u,m," and ",h,m]})]})})}},2597:(e,t,o)=>{o.d(t,{Ex:()=>p,oz:()=>d,tU:()=>l});o(9950);var r=o(4752),n=o(4414);const i=r.Ay.div`
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
`,a=r.Ay.button`
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
`,s=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:o,style:r}=e;return(0,n.jsx)(i,{className:o,style:r,children:t})},d=e=>{let{active:t,onClick:o,children:r,className:i}=e;return(0,n.jsx)(a,{active:t,onClick:o,className:i,children:r})},p=e=>{let{count:t,variant:o="default",showZero:r=!1}=e;return 0!==t||r?(0,n.jsx)(s,{variant:o,children:t}):null}},3224:(e,t,o)=>{o.d(t,{eP:()=>s});o(2488),o(2597),o(9194),o(1472),o(4334),o(2538),o(4877),o(8666),o(8012);var r=o(9950),n=(o(9610),o(4752)),i=o(4414);n.Ay.input`
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
`,n.Ay.textarea`
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
`;o(2159);var a=o(4492);const s=e=>{let{items:t,entityId:o}=e;const n=(0,a.Zp)(),s=`setup_guide_dismissed_${o||"default"}`,F=t.filter(e=>e.completed).length,k=F===t.length,[j,C]=r.useState(()=>!!k||"true"===localStorage.getItem(s));if(r.useEffect(()=>{k&&(localStorage.setItem(s,"true"),C(!0))},[k,s]),j)return null;const B=t.filter(e=>!e.completed);return(0,i.jsxs)(l,{children:[(0,i.jsxs)(d,{children:[(0,i.jsxs)(p,{children:[(0,i.jsx)(c,{children:"Complete Your Setup"}),(0,i.jsxs)(x,{children:[F,"/",t.length," completed"]})]}),(0,i.jsx)(u,{onClick:()=>{localStorage.setItem(s,"true"),C(!0)},children:"Dismiss"})]}),(0,i.jsx)(h,{children:(0,i.jsx)(g,{style:{width:F/t.length*100+"%"}})}),(0,i.jsx)(m,{children:B.map(e=>(0,i.jsxs)(f,{onClick:()=>n(e.path),children:[(0,i.jsx)(b,{children:"\u25cb"}),(0,i.jsxs)(y,{children:[(0,i.jsx)(v,{children:e.label}),(0,i.jsx)(w,{children:e.description})]}),(0,i.jsx)(A,{children:"\u2192"})]},e.key))})]})},l=n.Ay.div`
  background: white;
  border: 1px solid #E0E7FF;
  border-left: 4px solid #635BFF;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
`,d=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,p=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,c=n.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,x=n.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,u=n.Ay.button`
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
`,h=n.Ay.div`
  height: 4px;
  background: #E5E7EB;
  border-radius: 2px;
  margin-bottom: 16px;
  overflow: hidden;
`,g=n.Ay.div`
  height: 100%;
  background: #635BFF;
  border-radius: 2px;
  transition: width 0.3s ease;
`,m=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,f=n.Ay.div`
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
`,b=n.Ay.span`
  font-size: 16px;
  color: #D1D5DB;
  flex-shrink: 0;
`,y=n.Ay.div`
  flex: 1;
  min-width: 0;
`,v=n.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,w=n.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 1px;
`,A=n.Ay.span`
  font-size: 14px;
  color: #D1D5DB;
  flex-shrink: 0;
`},4021:(e,t,o)=>{o.d(t,{i1:()=>a});var r=o(9950),n=o(1367),i=o(6038);const a=()=>{const{user:e}=(0,n.As)(),[t,o]=(0,r.useState)("RM"),[a]=(0,r.useState)(Object.keys(i.DL)),[s,l]=(0,r.useState)(!0),[d,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return o("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";o(r)}else o("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),o("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:s,error:d}}},4334:(e,t,o)=>{o.d(t,{A:()=>i});o(9950);var r=o(9610),n=o(4414);const i=e=>{let{isOpen:t,onClose:o,title:i,message:a,buttonText:s="OK"}=e;const l=(0,n.jsx)(r.yl,{onClick:o,style:{maxWidth:"200px",margin:"0 auto"},children:s});return(0,n.jsx)(r.aF,{isOpen:t,onClose:o,title:i,footer:l,children:(0,n.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,n.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.5"},children:a})})})}},4877:(e,t,o)=>{o.d(t,{A:()=>v});var r=o(9950),n=o(4752),i=o(4414);const a=n.Ay.div`
  margin-bottom: 16px;
`,s=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=n.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,p=n.Ay.div`
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
`,c=n.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=n.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,u=n.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,h=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=n.Ay.label`
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
`,m=n.Ay.button`
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
`,f=n.Ay.input`
  display: none;
`,b=n.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,y=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:t,onChange:o,label:n="Logo Upload",helpText:v="Upload an image for your logo",maxSize:w=2,previewSize:A=150,showRemoveButton:F=!0,changeButtonText:k="Change Image",removeButtonText:j="Remove Image",imageAltText:C="Uploaded"}=e;const[B,E]=(0,r.useState)(!1),[$,z]=(0,r.useState)(!1),D=(0,r.useRef)(null),S=(0,r.useRef)(null),_=async e=>{try{const t=localStorage.getItem("auth_token"),o=await fetch(`${y()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),r=await o.json();return r.success?r.data.original:(console.error("Image upload failed:",r.message),null)}catch(t){return console.error("Image upload error:",t),null}},I=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*w*1024)return void alert(`Image size should be less than ${w}MB`);if(z(!0),"image/svg+xml"===e.type){const t=new FileReader;return t.onload=async e=>{var t;const r=null===(t=e.target)||void 0===t?void 0:t.result,n=await _(r);z(!1),n?o(n):alert("Failed to upload image. Please try again.")},void t.readAsDataURL(e)}const t=new FileReader;t.onload=async t=>{var r;const n=new Image;n.onload=async()=>{const t=document.createElement("canvas"),r=t.getContext("2d");if(!r)return void z(!1);const i=1200;let a=n.width,s=n.height;(a>i||s>i)&&(a>s?(s=s/a*i,a=i):(a=a/s*i,s=i)),t.width=a,t.height=s,r.drawImage(n,0,0,a,s);const l="image/png"===e.type?t.toDataURL("image/png"):t.toDataURL("image/jpeg",.85),d=await _(l);z(!1),d?o(d):alert("Failed to upload image. Please try again.")},n.src=null===(r=t.target)||void 0===r?void 0:r.result},t.readAsDataURL(e)},O=e=>{if($)return;const t=e.target.files;t&&t.length>0&&I(t[0]),e.target.value=""};return(0,i.jsxs)(a,{children:[n&&(0,i.jsx)(s,{children:n}),v&&(0,i.jsx)(l,{children:v}),(0,i.jsxs)(d,{children:[(0,i.jsx)(p,{ref:S,isDragging:B,hasImage:!!t,isUploading:$,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),$||E(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===S.current&&E(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),E(!1),$)return;const t=e.dataTransfer.files;t&&t.length>0&&I(t[0])},onClick:()=>{var e;t||$||(null===(e=D.current)||void 0===e||e.click())},children:$?(0,i.jsxs)(c,{children:[(0,i.jsx)(b,{}),(0,i.jsx)(x,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,i.jsx)("img",{src:(R=t,R?R.startsWith("http")?R:R.startsWith("/uploads/")?`${y()}${R}`:R:""),alt:C}):(0,i.jsxs)(c,{children:[(0,i.jsx)(x,{children:B?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(u,{children:["PNG, JPG, GIF up to ",w,"MB"]})]})}),t&&!$&&(0,i.jsxs)(h,{children:[(0,i.jsxs)(g,{disabled:$,children:[k,(0,i.jsx)("input",{ref:D,type:"file",accept:"image/*",onChange:O,disabled:$})]}),F&&(0,i.jsx)(m,{onClick:()=>{o("")},disabled:$,children:j})]})]}),!t&&!$&&(0,i.jsx)(f,{ref:D,type:"file",accept:"image/*",onChange:O})]});var R}},8012:(e,t,o)=>{o.d(t,{Ay:()=>l});o(9950);var r=o(4752),n=o(4414);const i=r.Ay.div`
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
`,a=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,s=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:t,children:o}=e;return(0,n.jsxs)(i,{children:[(0,n.jsx)(a,{children:t}),o&&(0,n.jsx)(s,{children:o})]})}},8608:(e,t,o)=>{o.d(t,{d:()=>i});var r=o(9950);function n(e){if(!e)return!1;const t=e.business_registration||e.registration_no,o=e.tax_id||e.tax_no;return!(!e.address||!e.phone||!t&&!o)}function i(e){const[t,o]=(0,r.useState)([]),[i,a]=(0,r.useState)(!0),{role:s,restaurantId:l,brandId:d,foodcourtId:p}=e;return(0,r.useEffect)(()=>{(async()=>{try{a(!0);const h=function(){const e=localStorage.getItem("auth_token"),t={"Content-Type":"application/json"};return e&&(t.Authorization=`Bearer ${e}`),t}();if("Restaurant Admin"!==s&&"Staff"!==s||!l)if("Brand General"!==s&&"Brand Manager"!==s||!d)if("Foodcourt General"!==s&&"Foodcourt Manager"!==s||!p)o([]);else{const[e,t]=await Promise.all([fetch("/api/foodcourts/company-info",{headers:h}),fetch(`/api/foodcourts/${p}/restaurants`,{headers:h})]);let r=null,i=!1;if(e.ok){const t=await e.json();r=t.data||t}if(t.ok){const e=(await t.json()).data||[];i=!!Array.isArray(e)&&e.length>0}o([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/foodcourt/company-info",completed:n(r)},{key:"tenant_restaurants",label:"Add Tenant Restaurants",description:"Link restaurants to your foodcourt to manage them together",path:"/pos/foodcourt/general/management",completed:i}])}else{const[e,t,r,i]=await Promise.all([fetch("/api/brands/company-info",{headers:h}),fetch("/api/brand-products?limit=1",{headers:h}),fetch("/api/product-recipes?limit=1",{headers:h}),fetch("/api/product-ingredients?limit=1",{headers:h})]);let a=null,s=!1,l=!1,d=!1;if(e.ok){const t=await e.json();a=t.data||t}if(t.ok){const e=(await t.json()).data||[];s=!!Array.isArray(e)&&e.length>0}if(r.ok){const e=(await r.json()).data||[];l=!!Array.isArray(e)&&e.length>0}if(i.ok){const e=(await i.json()).data||[];d=!!Array.isArray(e)&&e.length>0}o([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:"/pos/brand/company-info",completed:n(a)},{key:"brand_products",label:"Add Brand Products",description:"Register your brand products to share across restaurant locations",path:"/pos/brand-products",completed:s},{key:"product_recipes",label:"Set up Product Recipes",description:"Define recipes for your brand products to track ingredient usage",path:"/pos/brand-product-recipes",completed:l},{key:"brand_ingredients",label:"Add Brand Ingredients",description:"Add ingredients used in your brand product recipes",path:"/pos/brand-ingredients",completed:d}])}else{var e,t,r,i,c;const[a,s,d,p,g]=await Promise.all([fetch(`/api/restaurants/${l}/company-info`,{headers:h}),fetch(`/api/restaurants/${l}`,{headers:h}),fetch(`/api/menu?restaurant_id=${l}&excludeImage=true`,{headers:h}),fetch(`/api/kitchen-stations?restaurant_id=${l}`,{headers:h}),fetch("/api/notification-settings/preferences",{headers:h})]);let m=null,f=null,b=0,y=0,v=!1;if(a.ok){const e=await a.json();m=e.data||e}if(s.ok){const e=await s.json();f=e.data||e}if(d.ok){var x;const e=await d.json(),t=(null===(x=e.data)||void 0===x?void 0:x.items)||e.data||[];b=Array.isArray(t)?t.length:0}if(p.ok){const e=(await p.json()).data||[];y=Array.isArray(e)?e.length:0}if(g.ok){var u;v=!(null===(u=(await g.json()).data)||void 0===u||!u.preferences)}const w=n(m),A=!(null===(e=f)||void 0===e||!e.currency),F=null===(t=f)||void 0===t?void 0:t.operation_settings,k=!(null===F||void 0===F||!F.timeZone),j=A&&k,C=!(null===F||void 0===F||!F.openingTime||null===F||void 0===F||!F.closingTime),B=b>0,E=null===(r=f)||void 0===r?void 0:r.payment_settings;let $=!1;E&&"object"===typeof E&&($=Object.entries(E).some(e=>{let[t,o]=e;return!("_order"===t||!o||"object"!==typeof o)&&(o.enabled&&Array.isArray(o.availableIn)&&o.availableIn.includes("pos"))}));const z=y>0,D=null===(i=f)||void 0===i?void 0:i.floor_plan,S=!!(D&&Array.isArray(D)&&D.length>0)||!(!D||"object"!==typeof D||Array.isArray(D)||!(Array.isArray(D.tables)?D.tables.length>0:Array.isArray(D.elements)&&D.elements.length>0)),_=null===F||void 0===F?void 0:F.orderTypes,I=!(!_||"object"!==typeof _||!Object.values(_).some(e=>!0===e)),O=v,R=null===(c=f)||void 0===c?void 0:c.table_settings,T=!(null===R||void 0===R||!R.qrCodeBaseUrl);o([{key:"company_info",label:"Complete Company Information",description:"Add business registration, tax ID, and contact details for invoicing",path:`/restaurant/${l}/company-information`,completed:w},{key:"store_settings",label:"Set Currency & Timezone",description:"Configure your currency and timezone for accurate transactions",path:`/restaurant/${l}/settings?tab=store`,completed:j},{key:"operating_hours",label:"Set Operating Hours",description:"Configure opening/closing times for your restaurant",path:`/restaurant/${l}/settings?tab=operations`,completed:C},{key:"menu_items",label:"Add Menu Items",description:"Register at least one menu item to start taking orders",path:`/restaurant/${l}/menu`,completed:B},{key:"payment_methods",label:"Configure Payment Methods",description:"Enable at least one payment method for POS transactions",path:`/restaurant/${l}/settings?tab=payment`,completed:$},{key:"kitchen_stations",label:"Set up Kitchen Stations",description:"Configure kitchen stations to route orders to the right preparation area",path:`/restaurant/${l}/settings?tab=kitchenStations`,completed:z},{key:"floor_plan",label:"Configure Floor Plan",description:"Set up your restaurant floor plan with tables for dine-in orders",path:`/restaurant/${l}/floor-plan-editor`,completed:S},{key:"mobile_order",label:"Configure Mobile Order",description:"Enable order types (dine-in, takeaway, delivery) for your restaurant",path:`/restaurant/${l}/settings?tab=mobileOrder`,completed:I},{key:"notifications",label:"Set up Notifications",description:"Configure notification preferences to stay informed about your restaurant",path:`/restaurant/${l}/notification-settings`,completed:O},{key:"qr_codes",label:"Set up QR Codes",description:"Generate QR codes for tables to enable mobile ordering",path:`/restaurant/${l}/settings?tab=operations`,completed:T}])}}catch(h){console.error("useSetupStatus Error:",h),o([])}finally{a(!1)}})()},[s,l,d,p]),{items:t,loading:i}}},9194:(e,t,o)=>{o.d(t,{A:()=>m});var r=o(9950),n=o(4752),i=o(4414);const a=n.Ay.div`
  position: relative;
  width: 100%;
`,s=n.Ay.div`
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
`,l=n.Ay.input`
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
`,d=n.Ay.button`
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
`,p=n.Ay.div`
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
`,c=n.Ay.div`
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
`,x=n.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,u=n.Ay.div`
  font-size: 14px;
`,h=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,g=n.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,m=e=>{let{options:t,value:o,onChange:n,placeholder:m="Select...",disabled:f=!1,allowClear:b=!0,noOptionsMessage:y="No options found"}=e;const[v,w]=(0,r.useState)(!1),[A,F]=(0,r.useState)(""),[k,j]=(0,r.useState)(-1),C=(0,r.useRef)(null),B=(0,r.useRef)(null),E=t.find(e=>e.value===o),$=t.filter(e=>e.label.toLowerCase().includes(A.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(A.toLowerCase()));(0,r.useEffect)(()=>{const e=e=>{C.current&&!C.current.contains(e.target)&&(w(!1),F(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,r.useEffect)(()=>{v||(F(""),j(-1))},[v]);const z=e=>{n(e.value),w(!1),F("")},D=v?A:(null===E||void 0===E?void 0:E.label)||"";return(0,i.jsxs)(a,{ref:C,children:[(0,i.jsxs)(s,{isOpen:v,disabled:f,onClick:()=>{var e;f||(w(!0),null===(e=B.current)||void 0===e||e.focus())},children:[(0,i.jsx)(l,{ref:B,type:"text",value:D,onChange:e=>{F(e.target.value),j(0),v||w(!0)},onKeyDown:e=>{if(!f)switch(e.key){case"ArrowDown":e.preventDefault(),v?j(e=>e<$.length-1?e+1:e):w(!0);break;case"ArrowUp":e.preventDefault(),j(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),v&&k>=0&&$[k]?z($[k]):v||w(!0);break;case"Escape":w(!1),F("")}},placeholder:m,disabled:f}),b&&o&&!f&&(0,i.jsx)(d,{onClick:e=>{e.stopPropagation(),n(null),F("")},type:"button",children:(0,i.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,i.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,i.jsx)(p,{isOpen:v,children:(0,i.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,i.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,i.jsx)(c,{isOpen:v,children:$.length>0?$.map((e,t)=>(0,i.jsxs)(x,{isSelected:e.value===o,isHighlighted:t===k,onClick:()=>z(e),onMouseEnter:()=>j(t),children:[(0,i.jsx)(u,{children:e.label}),e.subLabel&&(0,i.jsx)(h,{children:e.subLabel})]},e.value)):(0,i.jsx)(g,{children:y})})]})}}}]);