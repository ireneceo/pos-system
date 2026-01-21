"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4648],{4648:(e,t,r)=>{r.r(t),r.d(t,{default:()=>$e});var n=r(9950),i=r(7119),o=r(4752),s=r(3422),a=r(3310),d=r(4732),l=r(1367),c=r(2966),p=r(9189),u=r(9018),x=r(6038),m=r(5863),h=r(8406),g=r(4414);const y=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),o=n(r);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`},b=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},f=e=>{let{dateString:t}=e;const[r,i]=n.useState("calculating...");return n.useEffect(()=>{const e=()=>{i((0,h.MQ)(t))};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[t]),(0,g.jsx)("span",{style:{fontSize:"12px"},children:r})},j=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,v=o.Ay.button`
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
`,_=o.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#1F2937"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E5E7EB"};

  &:hover {
    background: ${e=>e.active?"#5A54E5":"#F9FAFB"};
  }
`,w=o.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: #10B981;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: #059669;
  }

  &:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
  }
`,F=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,k=o.Ay.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`,C=o.Ay.div`
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
`,A=o.Ay.button`
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
`,S=o.Ay.input`
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
`,E=o.Ay.button`
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
`,I=o.Ay.span`
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
`,N=o.Ay.span`
  white-space: nowrap;

  strong {
    color: #0A2540;
    font-weight: 600;
    margin-left: 4px;
  }
`,P=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: visible;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
  }
`,O=o.Ay.table`
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
`,$=o.Ay.thead`
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
`,D=o.Ay.th`
  padding: 16px 24px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,R=o.Ay.td`
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
`,W=o.Ay.span`
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
`,q=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  margin-top: 2px;
`,L=o.Ay.div`
  line-height: 1.6;
`,V=o.Ay.div`
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,H=o.Ay.span`
  color: #6B7C93;
  margin-right: 8px;
`,U=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,G=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"awaiting_payment":case"pending":return"#FEF3C7";case"preparing":return"#DBEAFE";case"ready":case"served":return"#D1FAE5";case"completed":return"#E5E7EB";case"cancelled":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"awaiting_payment":return"#F59E0B";case"pending":return"#92400E";case"preparing":return"#1E40AF";case"ready":case"served":return"#065F46";case"completed":return"#374151";case"cancelled":return"#991B1B";default:return"#6B7280"}}};
`,Y=o.Ay.div`
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
`,X=o.Ay.button`
  padding: 6px 12px;
  background: ${e=>"secondary"===e.variant?"#F6F9FC":"#635BFF"};
  color: ${e=>"secondary"===e.variant?"#6B7C93":"white"};
  border: ${e=>"secondary"===e.variant?"1px solid #E6EBF1":"none"};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

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
`,Z=o.Ay.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,ee=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,te=o.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,re=o.Ay.div`
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
`,ne=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,ie=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,oe=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,se=o.Ay.button`
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
`,de=o.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,le=o.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,ce=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`,pe=o.Ay.span`
  color: #6B7C93;
`,ue=o.Ay.span`
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
`,me=o.Ay.div`
  flex: 1;
`,he=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,ge=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-bottom: 4px;
`,ye=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`,be=o.Ay.hr`
  border: 0;
  border-top: 1px solid #E6EBF1;
  margin: 20px 0;
`,fe=o.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 8px;
`,je=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${e=>e.isTotal?"18px":"14px"};
  font-weight: ${e=>e.isTotal?"700":"400"};
  color: ${e=>e.isTotal?"#0A2540":"#6B7C93"};
`,ve=o.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`,_e=o.Ay.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  transform: translateX(${e=>e.isVisible?"0":"120%"});
  opacity: ${e=>e.isVisible?1:0};
  transition: transform 0.3s ease, opacity 0.3s ease;
  background: ${e=>{switch(e.type){case"success":default:return"#10B981";case"error":return"#EF4444";case"info":return"#3B82F6"}}};
  color: white;
  max-width: 400px;
`,we=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`,Fe=o.Ay.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`,ke=o.Ay.div`
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
`,Ce=o.DU`
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
`,Ae=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,Se=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,Be=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,Ee=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,Ie=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,Te=o.Ay.div`
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
`,Ne=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,Pe=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Oe=o.Ay.button`
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
`,$e=()=>{var e,t,r;const{user:o}=(0,l.As)(),{getStoreInfo:$e,operationSettings:ze}=(0,u.Pj)(),[De,Re]=(0,n.useState)([]),[Me,We]=(0,n.useState)([]),[,qe]=(0,n.useState)(null),[Le,Ve]=(0,n.useState)("all"),[He,Ue]=(0,n.useState)(null),[Ge,Ye]=(0,n.useState)(!1),[Je,Ke]=(0,n.useState)(!1),[Xe,Qe]=(0,n.useState)(null),[Ze,et]=(0,n.useState)(!1),[tt,rt]=(0,n.useState)(null),[nt,it]=(0,n.useState)(!1),[ot,st]=(0,n.useState)(null),[,]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[at,dt]=(0,n.useState)(!1),[lt,ct]=(0,n.useState)(!1),[pt,ut]=(0,n.useState)(!0),[xt,mt]=(0,n.useState)(1),[ht,gt]=(0,n.useState)(1),[yt,bt]=(0,n.useState)(0),[ft,jt]=(0,n.useState)(null),[vt,_t]=(0,n.useState)(null),[wt,Ft]=(0,n.useState)(0),[kt,Ct]=(0,n.useState)(!0),[At,St]=(0,n.useState)(null),[Bt,Et]=(0,n.useState)("today"),[It,Tt]=(0,n.useState)(()=>{const e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:t,end:t}}),[Nt,Pt]=(0,n.useState)(!1),[Ot,$t]=(0,n.useState)(""),[zt,Dt]=(0,n.useState)(!1),[Rt,Mt]=(0,n.useState)([]),[Wt,qt]=(0,n.useState)(!1),[Lt,Vt]=(0,n.useState)(!1),[Ht,Ut]=(0,n.useState)(null),[Gt,Yt]=(0,n.useState)(!1),[Jt,Kt]=(0,n.useState)([]),[Xt,Qt]=(0,n.useState)([]),[Zt,er]=(0,n.useState)(null),[tr,rr]=(0,n.useState)([]),[nr,ir]=(0,n.useState)(!1),[or,sr]=(0,n.useState)(""),[ar,dr]=(0,n.useState)(!1),[lr,cr]=(0,n.useState)(null),[pr,ur]=(0,n.useState)({}),[xr,mr]=(0,n.useState)(1),[hr,gr]=(0,n.useState)({message:"",type:"success",isVisible:!1}),[yr,br]=(0,n.useState)(null),[fr,jr]=(0,n.useState)(!1),[vr,_r]=(0,n.useState)(null),wr=(0,n.useCallback)(function(e){gr({message:e,type:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",isVisible:!0}),setTimeout(()=>{gr(e=>({...e,isVisible:!1}))},4e3)},[]),Fr=(0,n.useCallback)(()=>{if(kt)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5),setTimeout(()=>{const t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=1e3,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5)},200)}catch(e){console.error("Failed to play notification sound:",e)}},[kt]);(0,n.useEffect)(()=>{Ft(e=>e+1);const e=setInterval(()=>{Ft(e=>e+1)},1e4);return()=>clearInterval(e)},[]);const kr=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(null!==o&&void 0!==o&&o.restaurantId)try{const t=await fetch(`/api/orders/restaurant/${o.restaurantId}?page=${e}&limit=50&includeCompleted=true`,b()),r=await t.json();r.success&&r.data&&(Re(r.data),r.pagination&&(mt(r.pagination.currentPage),gt(r.pagination.totalPages),bt(r.pagination.totalCount)))}catch(t){console.error("Failed to fetch orders:",t)}finally{ut(!1)}},[null===o||void 0===o?void 0:o.restaurantId]),Cr=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/orders/restaurant/${o.restaurantId}?page=1&limit=10000&includeCompleted=true`,b()),t=await e.json();t.success&&t.data&&We(t.data)}catch(e){console.error("Failed to fetch all orders:",e)}},[null===o||void 0===o?void 0:o.restaurantId]),Ar=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/membership/settings/${o.restaurantId}`,b()),t=await e.json();t.success&&t.data&&St(t.data)}catch(e){console.error("Failed to fetch membership settings:",e)}},[null===o||void 0===o?void 0:o.restaurantId]),Sr=(0,n.useRef)(Fr);(0,n.useEffect)(()=>{Sr.current=Fr},[Fr]),(0,n.useEffect)(()=>{if(null===o||void 0===o||!o.restaurantId)return;const e=(0,s.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{console.log("\u2705 Connected to Socket.IO /orders namespace"),e.emit("join-restaurant",o.restaurantId)}),e.on("connect_error",e=>{console.error("Socket.IO connection error:",e)}),e.on("order-created",e=>{console.log("\ud83d\udce5 Socket: order-created",e.id),Re(t=>[e,...t]),We(t=>[e,...t]),Sr.current()}),e.on("order-updated",e=>{console.log("\ud83d\udce5 Socket: order-updated",e.id,e.status),Re(t=>t.map(t=>t.id===e.id?e:t)),We(t=>t.map(t=>t.id===e.id?e:t))}),e.on("order-deleted",e=>{let{id:t}=e;console.log("\ud83d\udce5 Socket: order-deleted",t),Re(e=>e.filter(e=>e.id!==t)),We(e=>e.filter(e=>e.id!==t))}),e.on("order-items-added",e=>{console.log("\ud83d\udce5 Socket: order-items-added",e.orderId,`+Order ${e.orderGroup}`),Sr.current(),br({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),qe(e),()=>{e.disconnect()}},[null===o||void 0===o?void 0:o.restaurantId]),(0,n.useEffect)(()=>{kr(xt)},[kr,xt]),(0,n.useEffect)(()=>{Cr()},[Cr]),(0,n.useEffect)(()=>{Br("today")},[]),(0,n.useEffect)(()=>{mt(1)},[Le,It.start,It.end,Bt]);const Br=e=>{Et(e),Pt(!1);const t=new Date;let r=new Date;const n=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":r=new Date(t),r.setHours(0,0,0,0);break;case"week":r=new Date(t.getTime()-6048e5);break;case"month":r=new Date(t.getTime()-2592e6);break;case"year":r=new Date(t.getTime()-31536e6);break;case"all":if(Me.length>0){r=Me.reduce((e,t)=>{const r=new Date(t.order_date||t.createdAt);return r<e?r:e},new Date)}else r=new Date(t.getFullYear()-5,0,1)}Tt({start:n(r),end:n(t)})},Er=()=>{if(!It.start||!It.end)return Me;const e=new Date(It.start);e.setHours(0,0,0,0);const t=new Date(It.end);t.setHours(23,59,59,999);let r=Me.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const i=new Date(n);if(isNaN(i.getTime()))return!1;return i>=e&&i<=t});if(Ot.trim()){const e=Ot.toLowerCase().trim();r=r.filter(t=>{var r,n,i,o,s;if(null!==(r=t.order_number)&&void 0!==r&&r.toLowerCase().includes(e))return!0;if(null!==(n=t.customer_name)&&void 0!==n&&n.toLowerCase().includes(e))return!0;if(null!==(i=t.customer_phone)&&void 0!==i&&i.replace(/\D/g,"").includes(e.replace(/\D/g,"")))return!0;if(null!==(o=t.table_number)&&void 0!==o&&o.toString().includes(e))return!0;if(t.order_items&&Array.isArray(t.order_items)){if(t.order_items.some(t=>{var r,n;return(null===(r=t.menu_item_name)||void 0===r?void 0:r.toLowerCase().includes(e))||(null===(n=t.name)||void 0===n?void 0:n.toLowerCase().includes(e))}))return!0}return!(null===(s=t.payment_method)||void 0===s||!s.toLowerCase().includes(e))})}return r},Ir=(e,t)=>{Tt(r=>({...r,[e]:t})),Pt(!0),Et("today")};(0,n.useEffect)(()=>{(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/restaurants/${o.restaurantId}`,b()),t=await e.json();if(t.success||e.ok){const e=t.data||t;jt({companyName:e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postcode:e.postal_code||"",phone:e.phone||"",email:e.email||"",taxNo:e.tax_id||""}),e.payment_settings&&_t(e.payment_settings)}}catch(e){console.error("Failed to load company info:",e)}})(),Ar()},[null===o||void 0===o?void 0:o.restaurantId,Ar]);const Tr=e=>"outstanding"===e.status||"awaiting_payment"===e.status,Nr=e=>Tr(e)?"awaiting_payment":e.status,Pr=e=>"awaiting_payment"===e?"Outstanding":e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),Or=()=>{const e=Er();let t;return t="all"===Le?e:"outstanding"===Le?e.filter(e=>Tr(e)):e.filter(e=>e.status===Le),t.sort((e,t)=>{const r=new Date(e.createdAt||e.order_date).getTime();return new Date(t.createdAt||t.order_date).getTime()-r})},$r=e=>{const t=Er();return"all"===e?t.length:"outstanding"===e?t.filter(e=>Tr(e)).length:t.filter(t=>t.status===e).length},zr=async function(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Ct(!1);const n=(new Date).toISOString();Re(i=>i.map(i=>i.id===e?{...i,status:t,...r&&{kitchen_ready:!0},...("served"===t||"completed"===t)&&!i.served_at&&{served_at:n}}:i));try{const i={status:t};r&&(i.kitchen_ready=!0);const o=De.find(t=>t.id===e);"served"!==t&&"completed"!==t||null!==o&&void 0!==o&&o.served_at||(i.served_at=n);const s=await fetch(`/api/orders/${e}/status`,b({method:"PATCH",body:JSON.stringify(i)}));(await s.json()).success||kr()}catch(i){console.error("Failed to update status:",i),kr()}},Dr=(e,t,r)=>{if("delivery"===r){return{outstanding:"Proceed Without Payment",awaiting_payment:"Proceed Without Payment",pending:"Start Preparing",preparing:"Mark Ready",ready:"Out for Delivery",served:"Mark Delivered",completed:"Completed",cancelled:"Cancelled"}[e]||""}return{outstanding:"Proceed Without Payment",awaiting_payment:"Proceed Without Payment",pending:"Start Cooking",preparing:"Mark Ready",ready:"Served",served:"Complete Order",completed:"Completed",cancelled:"Cancelled"}[e]||""},Rr=()=>{zt&&Mt([]),Dt(!zt)},Mr=e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status),Wr=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");rr(i=>{if(0===r.length){const r=i.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=i.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const o=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),s=parseFloat(e.price)+o;return[...i,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:s,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})};(0,n.useEffect)(()=>{Gt?(async()=>{try{const r=(null===He||void 0===He?void 0:He.restaurant_id)||(null===o||void 0===o?void 0:o.restaurantId);if(!r)return void console.error("No restaurant ID available for fetching menu");const[n,i]=await Promise.all([fetch(`/api/menu/categories?restaurantId=${r}`,b()),fetch(`/api/menu?restaurantId=${r}`,b())]);if(n.ok&&i.ok){var e,t;const r=await n.json(),o=await i.json(),s=(null===(e=r.data)||void 0===e?void 0:e.categories)||r.categories||[],a=(null===(t=o.data)||void 0===t?void 0:t.items)||o.items||[];console.log("\ud83d\udce6 Add Items - Categories loaded:",s.length),console.log("\ud83d\udce6 Add Items - Items loaded:",a.length),Qt(s.filter(e=>!1!==e.is_active));const d=a.map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});Kt(d.filter(e=>!1!==e.is_available)),s.length>0&&er(String(s[0].id))}else console.error("Failed to fetch menu - Categories:",n.status,"Items:",i.status)}catch(r){console.error("Failed to fetch menu:",r)}})():(rr([]),er(null))},[Gt]);const qr=e=>{Ue(e),Ye(!0)},Lr=()=>{Ye(!1),Ue(null),dt(!1),ct(!1),Yt(!1),rr([])},Vr=async e=>{const t=e||He;if(t){const e=$e(),r=Array.isArray(t.order_items)?t.order_items:[];if(0===r.length)return console.error("\u274c No items found in order!"),void wr("Cannot print: Order has no items.","error");const n={orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1],date:new Date(t.order_date||t.createdAt),orderType:t.order_type,orderSource:t.order_source||"pos",tableNumber:t.table_number||null,pagerNumber:t.pager_number||null,customerName:t.customer_name||"Walk-in Customer",items:r.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){console.warn("Failed to parse options:",t),t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:t.notes||"",takeawayCharge:parseFloat(t.takeaway_charge||"0")};await(0,m.Si)(n,e)&&console.log("Kitchen ticket printed successfully via RawBT")}},Hr=e=>{Qe(e),Ke(!0)},Ur=()=>{Qe(null),Ke(!1)},Gr=e=>{rt(e),et(!0)},Yr=()=>{rt(null),et(!1)},Jr=(e,t)=>{t&&t.stopPropagation(),st(e),it(!0)},Kr=e=>(0,h.r6)(e,null===ft||void 0===ft?void 0:ft.operation_settings);return(0,g.jsxs)(a.A,{children:[(0,g.jsx)(Ce,{}),(null===yr||void 0===yr?void 0:yr.isVisible)&&(0,g.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideIn 0.3s ease-out"},children:[(0,g.jsx)("style",{children:"\n            @keyframes slideIn {\n              from { transform: translateX(100%); opacity: 0; }\n              to { transform: translateX(0); opacity: 1; }\n            }\n          "}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,g.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,g.jsx)("button",{onClick:()=>br(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,g.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,g.jsxs)("strong",{children:["Order ",yr.orderNumber]}),yr.tableNumber&&` (Table ${yr.tableNumber})`,(0,g.jsx)("br",{}),(0,g.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",yr.orderGroup]})," ",yr.itemCount," item",yr.itemCount>1?"s":""," added"]}),(0,g.jsx)("button",{onClick:()=>{$t(yr.orderNumber),Ve("all"),br(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Order"})]}),(0,g.jsxs)(j,{className:"no-print",children:[(0,g.jsxs)(d.Ay,{title:"Live Orders",children:[zt&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(w,{onClick:async()=>{if(Rt.length<2)return void wr("Please select at least 2 orders to merge","info");De.filter(e=>Rt.includes(e.id)).filter(e=>"pending"!==e.payment_status||["served","completed","cancelled"].includes(e.status)).length>0?wr("Cannot merge orders that are already paid, served, completed, or cancelled.","error"):Vt(!0)},disabled:Rt.length<2||Wt,children:Wt?"Merging...":`Merge (${Rt.length})`}),(0,g.jsx)(_,{active:!1,onClick:Rr,children:"Cancel"})]}),!zt&&(0,g.jsx)(_,{active:zt,onClick:Rr,children:"Select to Merge"}),(0,g.jsx)(v,{enabled:kt,onClick:()=>Ct(!kt),title:kt?"Stop notification sound":"Play notification sound",children:kt?(0,g.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,g.jsx)("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),(0,g.jsx)("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}):(0,g.jsx)("svg",{viewBox:"0 0 24 24",children:(0,g.jsx)("path",{d:"M8 5v14l11-7z"})})})]}),(0,g.jsxs)(F,{children:[(0,g.jsx)(k,{children:(0,g.jsxs)(C,{children:[(0,g.jsx)(A,{active:"today"===Bt&&!Nt,onClick:()=>Br("today"),children:"Today"}),(0,g.jsx)(A,{active:"week"===Bt&&!Nt,onClick:()=>Br("week"),children:"Week"}),(0,g.jsx)(A,{active:"month"===Bt&&!Nt,onClick:()=>Br("month"),children:"Month"}),(0,g.jsx)(A,{active:"year"===Bt&&!Nt,onClick:()=>Br("year"),children:"Year"}),(0,g.jsx)(A,{active:"all"===Bt&&!Nt,onClick:()=>Br("all"),children:"All"}),(0,g.jsx)(S,{type:"date",value:It.start,onChange:e=>Ir("start",e.target.value)}),(0,g.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,g.jsx)(S,{type:"date",value:It.end,onChange:e=>Ir("end",e.target.value)}),(0,g.jsxs)("div",{style:{position:"relative",width:"250px",marginLeft:"16px"},children:[(0,g.jsx)("span",{style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"16px",pointerEvents:"none",zIndex:1},children:"\ud83d\udd0d"}),(0,g.jsx)("input",{type:"text",placeholder:"Search orders...",value:Ot,onChange:e=>$t(e.target.value),style:{width:"100%",padding:"10px 40px 10px 40px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"all 0.2s",boxSizing:"border-box"}}),Ot&&(0,g.jsx)("button",{onClick:()=>$t(""),title:"Clear search",style:{position:"absolute",right:"8px",top:"50%",transform:"translateY(-50%)",background:"#E5E7EB",border:"none",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"18px",color:"#6B7280",zIndex:2},children:"\xd7"})]}),(0,g.jsx)("button",{onClick:()=>{const e=Er();if(0===e.length)return void wr("No orders to download","info");const t=e.map(e=>{var t;const r=new Date(e.order_date||e.createdAt).toLocaleString("en-MY",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0}),n=(null===(t=e.order_items)||void 0===t?void 0:t.map(e=>`${e.quantity}x ${e.menu_item_name||e.name||"Unknown"}`).join("; "))||"",i=e;return[e.order_number||"",r,e.customer_name||"Guest",e.customer_phone||"",(e.order_type||"").replace("_"," ").toUpperCase(),e.table_number||"",e.status||"",e.payment_method||"",e.payment_status||"completed",(0,x.vv)(i.subtotal||e.total_amount||0,ze.currency),(0,x.vv)(i.service_charge||0,ze.currency),(0,x.vv)(i.tax||0,ze.currency),(0,x.vv)(i.discount||0,ze.currency),(0,x.vv)(e.total_amount||0,ze.currency),n]}),r="\ufeff"+[["Order Number","Date & Time","Customer Name","Phone","Order Type","Table Number","Status","Payment Method","Payment Status","Subtotal","Service Charge","Tax","Discount","Total Amount","Items"].join(","),...t.map(e=>e.map(e=>`"${e}"`).join(","))].join("\n"),n=new Blob([r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),o=URL.createObjectURL(n);i.setAttribute("href",o),i.setAttribute("download",`live_orders_${It.start}_to_${It.end}.csv`),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},title:"Download CSV",style:{padding:"10px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",marginLeft:"8px"},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"18px",height:"18px"},children:(0,g.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]})}),(0,g.jsxs)(B,{children:[(0,g.jsxs)(E,{active:"all"===Le,onClick:()=>Ve("all"),children:["All Orders",(0,g.jsx)(I,{children:$r("all")})]}),(0,g.jsxs)(E,{active:"outstanding"===Le,onClick:()=>Ve("outstanding"),children:["Outstanding",(0,g.jsx)(I,{children:$r("outstanding")})]}),(0,g.jsxs)(E,{active:"pending"===Le,onClick:()=>Ve("pending"),children:["Pending",(0,g.jsx)(I,{children:$r("pending")})]}),(0,g.jsxs)(E,{active:"preparing"===Le,onClick:()=>Ve("preparing"),children:["Preparing",(0,g.jsx)(I,{children:$r("preparing")})]}),(0,g.jsxs)(E,{active:"ready"===Le,onClick:()=>Ve("ready"),children:["Ready",(0,g.jsx)(I,{children:$r("ready")})]}),(0,g.jsxs)(E,{active:"served"===Le,onClick:()=>Ve("served"),children:["Served",(0,g.jsx)(I,{children:$r("served")})]}),(0,g.jsxs)(E,{active:"completed"===Le,onClick:()=>Ve("completed"),children:["Completed",(0,g.jsx)(I,{children:$r("completed")})]}),(0,g.jsxs)(E,{active:"cancelled"===Le,onClick:()=>Ve("cancelled"),children:["Cancelled",(0,g.jsx)(I,{children:$r("cancelled")})]})]}),(0,g.jsx)(T,{children:(()=>{const e=(()=>{const e=Or().filter(e=>"cancelled"!==e.status);if(0===e.length)return{totalSales:0,avgOrderAmount:0,maxOrderAmount:0,ordersAbove20Percent:0,avgServeTime:0,maxServeTime:0,minServeTime:0};const t=e.reduce((e,t)=>e+parseFloat(t.total_amount.toString()),0),r=t/e.length,n=Math.max(...e.map(e=>parseFloat(e.total_amount.toString()))),i=e.filter(e=>parseFloat(e.total_amount.toString())>=20).length/e.length*100,o=e.filter(e=>e.served_at&&e.createdAt);let s=0,a=0,d=0;if(o.length>0){const e=o.map(e=>{const t=new Date(e.createdAt).getTime();return(new Date(e.served_at).getTime()-t)/1e3/60});s=e.reduce((e,t)=>e+t,0)/e.length,a=Math.max(...e),d=Math.min(...e)}return{totalSales:t,avgOrderAmount:r,maxOrderAmount:n,ordersAbove20Percent:i,avgServeTime:s,maxServeTime:a,minServeTime:d}})();return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(N,{children:["Total Sales ",(0,g.jsxs)("strong",{children:["RM",e.totalSales.toFixed(2)]})]}),(0,g.jsxs)(N,{children:["Avg ",(0,g.jsxs)("strong",{children:["RM",e.avgOrderAmount.toFixed(2)]})]}),(0,g.jsxs)(N,{children:["Max ",(0,g.jsxs)("strong",{children:["RM",e.maxOrderAmount.toFixed(2)]})]}),(0,g.jsxs)(N,{children:["\u2265RM20 ",(0,g.jsxs)("strong",{children:[e.ordersAbove20Percent.toFixed(1),"%"]})]}),(0,g.jsxs)(N,{children:["Avg Serve ",(0,g.jsxs)("strong",{children:[e.avgServeTime.toFixed(1),"m"]})]}),(0,g.jsxs)(N,{children:["Max Serve ",(0,g.jsxs)("strong",{children:[e.maxServeTime.toFixed(1),"m"]})]}),(0,g.jsxs)(N,{children:["Min Serve ",(0,g.jsxs)("strong",{children:[e.minServeTime.toFixed(1),"m"]})]})]})})()}),(0,g.jsx)(P,{children:Or().length>0?(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:(0,g.jsxs)("tr",{children:[zt&&(0,g.jsx)(D,{style:{width:"50px",textAlign:"center"},children:(0,g.jsx)("input",{type:"checkbox",checked:Rt.length>0&&Rt.length===Or().slice(50*(xt-1),50*xt).filter(e=>Mr(e)).length,onChange:()=>{const e=Or().slice(50*(xt-1),50*xt).filter(e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status));Rt.length===e.length?Mt([]):Mt(e.map(e=>e.id))},style:{width:"18px",height:"18px",cursor:"pointer"}})}),(0,g.jsx)(D,{children:"Order"}),(0,g.jsx)(D,{children:"Items"}),(0,g.jsx)(D,{children:"Status"}),(0,g.jsx)(D,{children:"Time"}),(0,g.jsx)(D,{children:"Amount"}),(0,g.jsx)(D,{children:"Action"})]})}),(0,g.jsx)("tbody",{children:Or().slice(50*(xt-1),50*xt).map(e=>(0,g.jsxs)(z,{style:zt&&Rt.includes(e.id)?{backgroundColor:"#EEF2FF"}:{},children:[zt&&(0,g.jsx)(R,{style:{width:"50px",textAlign:"center"},children:Mr(e)?(0,g.jsx)("input",{type:"checkbox",checked:Rt.includes(e.id),onChange:()=>{return t=e.id,void Mt(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t]);var t},style:{width:"18px",height:"18px",cursor:"pointer"}}):(0,g.jsx)("span",{style:{color:"#9CA3AF",fontSize:"12px"},children:"-"})}),(0,g.jsxs)(R,{"data-label":"ORDER",children:[(0,g.jsxs)(M,{onClick:()=>qr(e),children:[e.order_number,"takeaway"===e.order_type&&(0,g.jsx)(W,{children:"TAKEAWAY"}),"pickup"===e.order_type&&(0,g.jsx)(W,{style:{background:"#EDE9FE",color:"#7C3AED"},children:"PICKUP"}),"delivery"===e.order_type&&(0,g.jsx)(W,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,g.jsxs)(q,{children:[e.customer_name||"Guest",(0,g.jsx)("br",{}),e.customer_phone||("mobile"===e.source?"Mobile Order":"POS Terminal"),e.table_number&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("br",{}),(0,g.jsxs)("span",{style:{color:"#635BFF",fontWeight:500},children:["Table: ",e.table_number]})]}),e.pager_number&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("br",{}),"Pager: ",e.pager_number]}),"pickup"===e.order_type&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("br",{}),(0,g.jsxs)("span",{style:{color:"#8B5CF6",fontWeight:500},children:["Pickup: ",e.scheduled_pickup_time?y(e.scheduled_pickup_time):"ASAP"]})]})]})]}),(0,g.jsx)(R,{"data-label":"ITEMS",children:(0,g.jsx)(L,{children:e.order_items&&Array.isArray(e.order_items)&&e.order_items.map((e,t)=>{var r;return(0,g.jsxs)(V,{children:[(0,g.jsxs)("div",{children:[(0,g.jsxs)(H,{children:[e.quantity,"x"]}),e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"]}),e.options&&e.options.length>0&&(0,g.jsx)(U,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t)})})}),(0,g.jsx)(R,{"data-label":"STATUS",children:(0,g.jsx)(G,{status:Nr(e),children:Pr(Nr(e))})}),(0,g.jsx)(R,{"data-label":"TIME",children:(0,g.jsxs)(Y,{children:[Kr(e.createdAt||e.order_date),(0,g.jsx)("br",{}),!e.served_at&&(0,g.jsx)(f,{dateString:e.createdAt||e.order_date||""},`time-${e.id}-${wt}`),e.served_at&&(0,g.jsxs)("span",{style:{fontSize:"11px",color:"#0A2540"},children:["Served: ",Kr(e.served_at),(()=>{const t=new Date(e.createdAt||e.order_date).getTime(),r=new Date(e.served_at).getTime();return` (${Math.round((r-t)/1e3/60)}min)`})()]})]})}),(0,g.jsxs)(R,{"data-label":"AMOUNT",children:[(0,g.jsxs)(J,{children:[(0,x.vv)(Number(e.total_amount),ze.currency),Number(e.points_used)>0&&(0,g.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"4px"},children:["(-",Number(e.points_used).toLocaleString(),"P)"]}),Number(e.coupon_discount)>0&&(0,g.jsx)("span",{style:{fontSize:"11px",color:"#F59E0B",marginLeft:"4px"},children:"(Coupon)"})]}),(0,g.jsxs)(K,{isPending:"pending"===e.payment_status,isVerificationPending:"payment_verification_pending"===e.payment_status,children:[e.payment_method||"N/A","pending"===e.payment_status&&" (Pending)","payment_verification_pending"===e.payment_status&&" (Verifying)"]})]}),(0,g.jsx)(R,{"data-label":"ACTION",children:(0,g.jsxs)(Z,{children:["completed"!==e.status&&"cancelled"!==e.status&&"served"!==e.status&&(0,g.jsx)(g.Fragment,{children:Tr(e)?(0,g.jsx)(X,{onClick:t=>{t.stopPropagation(),zr(e.id,"pending")},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}):(0,g.jsx)(X,{onClick:()=>{const t=(r=e.status,{outstanding:"pending",awaiting_payment:"pending",pending:"preparing",preparing:"ready",ready:"completed"===e.payment_status?"completed":"served",served:"completed",completed:null,cancelled:null}[r]||null);var r;t&&zr(e.id,t)},style:"ready"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:void 0,children:Dr(e.status,e.payment_status,e.order_type)})}),"cancelled"!==e.status&&"awaiting_payment"!==e.status&&!Tr(e)&&(0,g.jsx)(X,{variant:"secondary",onClick:()=>{if("pending"===e.status)zr(e.id,"awaiting_payment");else{const t={preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e.status]||null;t&&zr(e.id,t)}},title:"Revert to previous status",children:"\u21ba"}),"pending"===e.payment_status&&(0,g.jsx)(X,{onClick:t=>Jr(e,t),style:"served"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:{background:"#F6F9FC",color:"#6B7C93",border:"1px solid #E6EBF1"},children:"Payment"}),"payment_verification_pending"===e.payment_status&&(0,g.jsx)(X,{onClick:t=>(async(e,t)=>{t.stopPropagation(),Ct(!1);try{const t=De.find(t=>t.id===e);if(!(await fetch(`/api/orders/${e}`,b({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");!t||"awaiting_payment"!==t.status&&"outstanding"!==t.status||await fetch(`/api/orders/${e}/status`,b({method:"PATCH",body:JSON.stringify({status:"pending"})})),kr()}catch(r){console.error("Error in quick confirm:",r)}})(e.id,t),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm"}),"completed"!==e.status&&"cancelled"!==e.status&&"pending"!==e.payment_status&&(0,g.jsx)(Q,{onClick:t=>{t.stopPropagation(),zr(e.id,"completed")},title:"Mark as Completed",children:(0,g.jsx)(ee,{children:"\u2713"})}),(0,g.jsx)(Q,{onClick:t=>{t.stopPropagation(),qr(e)},title:"View Details",children:(0,g.jsx)(ee,{children:"\u25c9"})}),(0,g.jsx)(Q,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||He;if(r){console.log("\ud83d\udd0d Print Bill - Full order object:",r),console.log("\ud83d\udce6 order_items field:",r.order_items),console.log("\ud83d\udce6 order_items type:",typeof r.order_items),console.log("\ud83d\udce6 Is array?:",Array.isArray(r.order_items));const e=$e(),n=Array.isArray(r.order_items)?r.order_items:[];if(console.log("\ud83d\udce6 Processed orderItems:",n),console.log("\ud83d\udce6 orderItems length:",n.length),0===n.length)return console.error("\u274c No items found in order!"),void wr("Cannot print: Order has no items.","error");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],date:new Date(r.order_date||r.createdAt),items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:r}}),subtotal:parseFloat(r.subtotal||"0"),discount:parseFloat(r.discount||"0"),coupon:r.coupon_code?{code:r.coupon_code,discount:parseFloat(r.coupon_discount||"0")}:null,takeawayCharge:parseFloat(r.takeaway_charge||"0"),serviceCharge:parseFloat(r.service_charge||"0"),serviceChargeRate:parseFloat(r.service_charge_rate||"10"),tax:parseFloat(r.tax||"0"),taxRate:parseFloat(r.tax_rate||"6"),total:parseFloat(r.final_price||r.total_amount||"0"),paymentMethod:r.payment_method||"cash",amountReceived:parseFloat(r.amount_received||"0"),change:parseFloat(r.change||"0")};await(0,m.pG)(i,e)&&console.log("Bill printed successfully via RawBT")}})(e)},title:"Print Bill",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,g.jsx)(Q,{onClick:t=>{t.stopPropagation(),Vr(e)},title:"Print Kitchen Ticket",children:(0,g.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(()=>{const t=Array.isArray(e.order_items)?e.order_items:[],r=t.length>0?Math.max(...t.map(e=>e.order_group||0)):0;return r>0?(0,g.jsx)(Q,{onClick:t=>{t.stopPropagation(),(async e=>{var r;const n=$e(),i=Array.isArray(e.order_items)?e.order_items:[];if(0===i.length)return void wr("No items in order","error");const o=i.map(e=>e.order_group||0),s=Math.max(...o);if(0===s)return void Vr(e);const a=i.filter(e=>(e.order_group||0)===s),d={orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1],date:null!==(r=a[0])&&void 0!==r&&r.added_at?new Date(a[0].added_at):new Date(e.order_date||e.createdAt),orderType:e.order_type,orderSource:e.order_source||"pos",tableNumber:e.table_number||null,pagerNumber:e.pager_number||null,customerName:e.customer_name||"Walk-in Customer",groupLabel:`+Order ${s}`,items:a.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:r}}),notes:"",takeawayCharge:0};await(0,m.Si)(d,n)&&wr(`Kitchen ticket for +Order ${s} printed`,"success")})(e)},title:`Print +Order ${r} Ticket`,style:{background:"#FEF3C7",color:"#92400E"},children:(0,g.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M12 4v16m8-8H4"})})}):null})(),(0,g.jsx)(Q,{onClick:t=>{t.stopPropagation(),"cancelled"===e.status?Hr(e.id):Gr(e.id)},title:"cancelled"===e.status?"Remove Order":"Cancel Order",children:(0,g.jsx)(ee,{children:"\u2715"})})]})})]},e.id))})]}):(0,g.jsx)(te,{children:"No orders found in this category"})}),(0,g.jsx)(re,{isOpen:Ge,onClick:Lr,"data-modal":"order-detail",children:(0,g.jsx)(ne,{onClick:e=>e.stopPropagation(),children:He&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(ie,{children:[(0,g.jsx)(oe,{children:Gt?"Add Items to Order":at?"Receipt Preview":lt?"Kitchen Order Ticket Preview":`Order ${He.order_number}`}),(0,g.jsx)(se,{onClick:()=>{dt(!1),ct(!1),Yt(!1),rr([]),Lr()},children:"\xd7"})]}),Gt?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(ae,{style:{padding:"20px",maxHeight:"calc(70vh - 80px)",overflow:"auto"},children:[(0,g.jsx)("div",{style:{marginBottom:"20px"},children:(0,g.jsx)("input",{type:"text",placeholder:"Search menu items...",value:or,onChange:e=>sr(e.target.value),style:{width:"100%",padding:"12px 16px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"15px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>e.currentTarget.style.borderColor="#635BFF",onBlur:e=>e.currentTarget.style.borderColor="#E5E7EB",autoFocus:!0})}),or.length>0&&(0,g.jsxs)("div",{style:{marginBottom:"20px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Jt.filter(e=>{if(!e||!e.name)return!1;const t=or.toLowerCase(),r=e.name.toLowerCase().includes(t),n=!!e.code&&e.code.toLowerCase().includes(t);return r||n}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,g.jsxs)("div",{style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",transition:"background 0.1s"},onMouseEnter:e=>e.currentTarget.style.background="#F9FAFB",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,g.jsxs)("div",{style:{flex:1,minWidth:0,cursor:"pointer"},onClick:()=>{Wr(e,1,[]),sr("")},children:[(0,g.jsxs)("span",{style:{fontWeight:500},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,g.jsx)("span",{style:{marginLeft:"8px",fontSize:"11px",background:"#EDE9FE",color:"#7C3AED",padding:"2px 6px",borderRadius:"4px"},children:"SET"})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,g.jsx)("span",{style:{color:"#635BFF",fontWeight:500},children:(0,x.vv)(parseFloat(e.price)||0,ze.currency)}),t&&(0,g.jsx)("button",{onClick:t=>{t.stopPropagation(),cr(e),dr(!0)},style:{padding:"4px 10px",fontSize:"12px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Jt.filter(e=>e.name.toLowerCase().includes(or.toLowerCase())||e.code&&e.code.toLowerCase().includes(or.toLowerCase())).length&&(0,g.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF"},children:"No items found"})]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)("h4",{style:{margin:"0 0 12px 0",fontWeight:600,color:"#0A2540"},children:["Items to Add (",tr.reduce((e,t)=>e+t.quantity,0),")"]}),0===tr.length?(0,g.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px"},children:"Search and select items to add"}):(0,g.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:tr.map(e=>(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid #F3F4F6"},children:[(0,g.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,g.jsx)("div",{style:{fontWeight:500},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,g.jsxs)("div",{style:{color:"#6B7280",fontSize:"13px"},children:[(0,x.vv)(e.unitPrice||parseFloat(e.price),ze.currency)," each"]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,g.jsx)("button",{onClick:()=>{return t=e.cartId,void rr(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"-"}),(0,g.jsx)("span",{style:{minWidth:"28px",textAlign:"center",fontWeight:600,fontSize:"15px"},children:e.quantity}),(0,g.jsx)("button",{onClick:()=>{return t=e.cartId,void rr(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,g.jsx)(ve,{style:{borderTop:"1px solid #E5E7EB",padding:"16px 20px"},children:(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[(0,g.jsxs)("div",{style:{fontWeight:600},children:["Total: ",(0,x.vv)(tr.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),ze.currency)]}),(0,g.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,g.jsx)(X,{onClick:()=>{Yt(!1),rr([]),sr(""),Lr()},style:{background:"white",color:"#6B7C93",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,g.jsx)(X,{onClick:async()=>{if(null!==He&&void 0!==He&&He.id&&0!==tr.length)try{ir(!0);const e=tr.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),t=await fetch(`/api/orders/${null===He||void 0===He?void 0:He.id}/merge-items`,b({method:"POST",body:JSON.stringify({items:e,source:"live_orders"})}));if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to add items")}wr("Items added successfully","success"),Yt(!1),rr([]),sr(""),Lr(),kr()}catch(e){console.error("Add items error:",e),wr(e.message||"Failed to add items","error")}finally{ir(!1)}},disabled:0===tr.length||nr,style:{background:0===tr.length?"#E5E7EB":"#635BFF",color:"white",cursor:0===tr.length?"not-allowed":"pointer"},children:nr?"Adding...":"Add to Order"})]})]})})]}):lt?(0,g.jsx)(ae,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,g.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=$e(),t=Array.isArray(He.order_items)?He.order_items:[],r={orderNumber:He.order_number,pickupNumber:He.order_number.split("-")[1],date:new Date(He.order_date||He.createdAt),orderType:He.order_type,orderSource:He.order_source||"pos",tableNumber:He.table_number||null,pagerNumber:He.pager_number||null,customerName:He.customer_name||"Walk-in Customer",scheduledPickupTime:He.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:e.options||[]})),notes:He.notes||"",takeawayCharge:parseFloat(He.takeaway_charge||"0")};return(0,m.KB)(r,e).split("\n").map((e,t)=>(0,g.jsx)("div",{children:e||"\xa0"},t))})()})}):at?(0,g.jsx)(ae,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,g.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=$e(),t=Array.isArray(He.order_items)?He.order_items:[],r={orderNumber:He.order_number,pickupNumber:He.order_number.split("-")[1],pagerNumber:He.pager_number||null,date:new Date(He.order_date||He.createdAt),orderType:He.order_type,scheduledPickupTime:He.scheduled_pickup_time||null,currency:ze.currency||"RM",items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:e.options||[]})),subtotal:parseFloat(He.subtotal||"0"),discount:parseFloat(He.discount||"0"),discountPolicy:He.discount_policy_name?{name:He.discount_policy_name,amount:parseFloat(He.discount_policy_amount||"0")}:void 0,coupon:He.coupon_code?{code:He.coupon_code,discount:parseFloat(He.coupon_discount||"0")}:null,takeawayCharge:parseFloat(He.takeaway_charge||"0"),serviceCharge:parseFloat(He.service_charge||"0"),serviceChargeRate:parseFloat(He.service_charge_rate||"10"),tax:parseFloat(He.tax||"0"),taxRate:parseFloat(He.tax_rate||"6"),total:parseFloat(He.final_price||He.total_amount||"0"),paymentMethod:He.payment_method||"cash",amountReceived:parseFloat(He.amount_received||"0"),change:parseFloat(He.change||"0"),deliveryInfo:He.delivery_info||null,deliveryFee:parseFloat(He.delivery_fee||"0")};return(0,m.qE)(r,e).replace(/\x1B[@E][\x00\x01]/g,"").replace(/\x1Ba[\x00-\x02]/g,"").replace(/\x1D![\x00-\x11]/g,"").replace(/\x1DB[\x00\x01]/g,"").replace(/\x1DV\x41\x00/g,"").replace(/[\x1B\x1D]./g,"")})()})}):(0,g.jsxs)(ae,{children:[(0,g.jsxs)(de,{children:[(0,g.jsx)(le,{children:"Customer Information"}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Name:"}),(0,g.jsx)(ue,{children:He.customer_name||"Guest"})]}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Phone:"}),(0,g.jsx)(ue,{children:He.customer_phone||"N/A"})]}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Order Type:"}),(0,g.jsx)(ue,{children:null===(e=He.order_type)||void 0===e?void 0:e.replace("_"," ").toUpperCase()})]}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Source:"}),(0,g.jsx)(ue,{children:"mobile"===He.source?"Mobile Order":"kiosk"===He.source?"Kiosk":"POS Terminal"})]}),He.table_number&&(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Table Number:"}),(0,g.jsx)(ue,{children:He.table_number})]}),"pickup"===He.order_type&&(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Scheduled Pickup:"}),(0,g.jsx)(ue,{style:{color:"#8B5CF6",fontWeight:600},children:He.scheduled_pickup_time?y(He.scheduled_pickup_time):"ASAP"})]})]}),"delivery"===He.order_type&&He.delivery_info&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(be,{}),(0,g.jsxs)(de,{children:[(0,g.jsx)(le,{children:"Delivery Information"}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Address:"}),(0,g.jsx)(ue,{children:He.delivery_info.address})]}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Phone:"}),(0,g.jsx)(ue,{children:He.delivery_info.phone})]}),He.delivery_info.zoneName&&(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Zone:"}),(0,g.jsx)(ue,{children:He.delivery_info.zoneName})]}),He.delivery_info.notes&&(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Notes:"}),(0,g.jsx)(ue,{style:{fontStyle:"italic"},children:He.delivery_info.notes})]}),He.delivery_fee>0&&(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Delivery Fee:"}),(0,g.jsx)(ue,{children:(0,x.vv)(parseFloat(He.delivery_fee||"0"),ze.currency)})]})]})]}),(0,g.jsx)(be,{}),(0,g.jsxs)(de,{children:[(0,g.jsx)(le,{children:"Order Information"}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Order Time:"}),(0,g.jsx)(ue,{children:Kr(He.createdAt)})]}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Status:"}),(0,g.jsx)(ue,{children:(0,g.jsx)(G,{status:He.status,children:Pr(He.status)})})]}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Payment Method:"}),(0,g.jsx)(ue,{children:He.payment_method||"N/A"})]}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Payment Status:"}),(0,g.jsx)(ue,{children:"payment_verification_pending"===He.payment_status?(0,g.jsx)("span",{style:{color:"#F59E0B",fontWeight:500},children:"\u23f3 Verification Pending"}):"pending"===He.payment_status?(0,g.jsx)("span",{style:{color:"#FF6B6B",fontWeight:500},children:"Pending"}):"paid"===He.payment_status?(0,g.jsx)("span",{style:{color:"#10B981",fontWeight:500},children:"\u2713 Paid"}):He.payment_status||"N/A"})]})]}),He.payment_proof&&"payment_verification_pending"===He.payment_status&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(be,{}),(0,g.jsxs)(de,{children:[(0,g.jsx)(le,{style:{color:"#F59E0B"},children:"Payment Proof (Customer Submitted)"}),He.payment_proof.reference&&(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Transaction Reference:"}),(0,g.jsx)(ue,{style:{fontWeight:600,fontFamily:"monospace"},children:He.payment_proof.reference})]}),He.payment_proof.file_name&&(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Receipt File:"}),(0,g.jsx)(ue,{children:He.payment_proof.file_name})]}),He.payment_proof.uploaded_at&&(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{children:"Submitted At:"}),(0,g.jsx)(ue,{children:Kr(He.payment_proof.uploaded_at)})]}),He.payment_proof.image&&(0,g.jsxs)("div",{style:{marginTop:"16px"},children:[(0,g.jsx)(pe,{style:{marginBottom:"8px"},children:"Receipt Image:"}),(0,g.jsx)("div",{style:{position:"relative"},children:(0,g.jsx)("img",{src:He.payment_proof.image,alt:"Payment receipt",style:{maxWidth:"100%",maxHeight:"400px",borderRadius:"8px",border:"1px solid #E5E7EB",cursor:"pointer",display:"block"},onClick:()=>window.open(He.payment_proof.image,"_blank")})})]})]})]}),(0,g.jsx)(be,{}),(0,g.jsxs)(de,{children:[(0,g.jsx)(le,{children:"Order Items"}),(()=>{const e=He.order_items&&Array.isArray(He.order_items)?He.order_items:[],t={};e.forEach(e=>{const r=e.order_group||0;t[r]||(t[r]=[]),t[r].push(e)});const r=Object.keys(t).map(Number).sort((e,t)=>e-t),n=r.length>1||1===r.length&&r[0]>0;return r.map(e=>{var r;return(0,g.jsxs)("div",{children:[n&&(0,g.jsxs)("div",{style:{background:0===e?"#F3F4F6":"#FEF3C7",padding:"6px 12px",borderRadius:"4px",fontSize:"12px",fontWeight:600,color:0===e?"#6B7280":"#92400E",marginTop:e>0?"12px":"0",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsx)("span",{children:0===e?"Original Order":`+Order ${e}`}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e>0&&(null===(r=t[e][0])||void 0===r?void 0:r.added_at)&&(0,g.jsx)("span",{style:{fontWeight:400,fontSize:"11px"},children:new Date(t[e][0].added_at).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}),(0,g.jsx)("button",{onClick:()=>(async(e,t)=>{var r;if(!He)return;const n=$e();if(0===t.length)return void wr("No items in this group","error");const i={orderNumber:He.order_number,pickupNumber:He.order_number.split("-")[1],date:null!==(r=t[0])&&void 0!==r&&r.added_at?new Date(t[0].added_at):new Date(He.order_date||He.createdAt),orderType:He.order_type,orderSource:He.order_source||"pos",tableNumber:He.table_number||null,pagerNumber:He.pager_number||null,customerName:He.customer_name||"Walk-in Customer",groupLabel:0===e?"Original Order":`+Order ${e}`,items:t.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:He.notes||"",takeawayCharge:0};await(0,m.Si)(i,n)&&wr(`Kitchen ticket for ${0===e?"Original Order":`+Order ${e}`} printed`,"success")})(e,t[e]),style:{background:0===e?"#6B7280":"#F59E0B",color:"white",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:500,cursor:"pointer"},title:"Print kitchen ticket for this group",children:"Print"})]})]}),t[e].map((t,r)=>{var n,i,o;return(0,g.jsx)(xe,{children:(0,g.jsxs)(me,{children:[(0,g.jsx)(he,{children:t.name||(null===(n=t.menuItem)||void 0===n?void 0:n.name)||"Item"}),t.options&&t.options.length>0&&(0,g.jsx)(ge,{children:Array.isArray(t.options)?t.options.join(", "):t.options}),(0,g.jsxs)(ye,{children:[(0,g.jsxs)("span",{children:[t.quantity," \xd7 ",(0,x.vv)(parseFloat(t.price||(null===(i=t.menuItem)||void 0===i?void 0:i.price)||0),ze.currency)]}),(0,g.jsx)("span",{children:(0,x.vv)(t.quantity*parseFloat(t.price||(null===(o=t.menuItem)||void 0===o?void 0:o.price)||0),ze.currency)})]})]})},`${e}-${r}`)})]},e)})})()]}),(0,g.jsx)(be,{}),(0,g.jsxs)(fe,{children:[(0,g.jsxs)(je,{children:[(0,g.jsx)("span",{children:"Subtotal"}),(0,g.jsx)("span",{children:(0,x.vv)(Number(He.subtotal||He.total_amount),ze.currency)})]}),He.takeaway_charge&&parseFloat(He.takeaway_charge)>0&&(0,g.jsxs)(je,{children:[(0,g.jsx)("span",{children:"Takeaway Charge"}),(0,g.jsx)("span",{children:(0,x.vv)(parseFloat(He.takeaway_charge),ze.currency)})]}),He.discount>0&&(0,g.jsxs)(je,{children:[(0,g.jsx)("span",{children:"Discount"}),(0,g.jsx)("span",{children:(0,x.vv)(-Number(He.discount),ze.currency)})]}),He.discount_policy_amount>0&&(0,g.jsxs)(je,{children:[(0,g.jsxs)("span",{children:["Discount (",He.discount_policy_name,")"]}),(0,g.jsx)("span",{children:(0,x.vv)(-Number(He.discount_policy_amount),ze.currency)})]}),He.coupon_discount>0&&(0,g.jsxs)(je,{children:[(0,g.jsxs)("span",{children:["Coupon (",He.coupon_code,")"]}),(0,g.jsx)("span",{children:(0,x.vv)(-Number(He.coupon_discount),ze.currency)})]}),Number(He.point_discount)>0&&(0,g.jsxs)(je,{children:[(0,g.jsxs)("span",{children:["Points (",Number(He.points_used||0).toLocaleString()," pts)"]}),(0,g.jsx)("span",{children:(0,x.vv)(-Number(He.point_discount),ze.currency)})]}),He.service_charge>0&&(0,g.jsxs)(je,{children:[(0,g.jsxs)("span",{children:["Service Charge (",He.service_charge_rate||10,"%)"]}),(0,g.jsx)("span",{children:(0,x.vv)(Number(He.service_charge),ze.currency)})]}),He.tax>0&&(0,g.jsxs)(je,{children:[(0,g.jsxs)("span",{children:["Tax (",He.tax_rate||6,"%)"]}),(0,g.jsx)("span",{children:(0,x.vv)(Number(He.tax),ze.currency)})]}),(0,g.jsxs)(je,{isTotal:!0,children:[(0,g.jsx)("span",{children:"Total"}),(0,g.jsx)("span",{children:(0,x.vv)(Number(He.total_amount),ze.currency)})]})]})]}),!Gt&&(0,g.jsx)(ve,{children:at?(0,g.jsx)(X,{onClick:()=>dt(!1),children:"Back to Order Details"}):lt?(0,g.jsx)(X,{onClick:()=>ct(!1),children:"Back to Order Details"}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(X,{variant:"secondary",onClick:()=>Hr(He.id),style:{background:"#6B7280",borderColor:"#6B7280",color:"white"},children:"Remove"}),"cancelled"!==He.status&&"completed"!==He.status&&(0,g.jsx)(X,{onClick:()=>Gr(He.id),style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Cancel Order"}),Tr(He)&&"pending"!==He.status&&(0,g.jsx)(X,{onClick:()=>{zr(He.id,"pending"),Lr()},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),"pending"===He.payment_status&&(0,g.jsx)(X,{onClick:()=>Jr(He),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Payment"}),"payment_verification_pending"===He.payment_status&&(0,g.jsx)(X,{onClick:async()=>{if(He){Ct(!1);try{if(!(await fetch(`/api/orders/${He.id}`,b({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");"awaiting_payment"!==He.status&&"outstanding"!==He.status||await fetch(`/api/orders/${He.id}/status`,b({method:"PATCH",body:JSON.stringify({status:"pending"})})),Lr(),kr()}catch(e){console.error("Error confirming payment:",e)}}},style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),"pending"===He.payment_status&&!["served","completed","cancelled"].includes(He.status)&&(0,g.jsx)(X,{onClick:()=>Yt(!0),style:{background:"#8B5CF6",borderColor:"#8B5CF6",color:"white"},children:"Add Items"}),(0,g.jsx)(X,{onClick:()=>dt(!0),style:{marginRight:"10px"},children:"View Receipt"}),(0,g.jsx)(X,{onClick:()=>ct(!0),style:{marginRight:"10px"},children:"View Order Ticket"}),(0,g.jsx)(X,{onClick:async()=>{if(He){const e=$e(),t={orderNumber:He.order_number,pickupNumber:He.order_number.split("-")[1],date:new Date(He.order_date||He.createdAt),items:He.order_items.map(e=>({menuItem:{name:e.menu_item_name,price:parseFloat(e.price)},quantity:e.quantity,options:e.options||[]})),subtotal:parseFloat(He.subtotal||"0"),discount:parseFloat(He.discount||"0"),coupon:He.coupon_code?{code:He.coupon_code,discount:parseFloat(He.coupon_discount||"0")}:null,serviceCharge:parseFloat(He.service_charge||"0"),serviceChargeRate:parseFloat(He.service_charge_rate||"10"),tax:parseFloat(He.tax||"0"),taxRate:parseFloat(He.tax_rate||"6"),total:parseFloat(He.final_price||He.total_amount||"0"),paymentMethod:He.payment_method||"cash",amountReceived:parseFloat(He.amount_received||"0"),change:parseFloat(He.change||"0")};await(0,m.pG)(t,e)&&console.log("Receipt printed successfully via RawBT")}},children:"Print Bill"})]})})]})})}),He&&i.createPortal((0,g.jsxs)(ke,{id:"bill-print-content",children:[(0,g.jsxs)(Ae,{children:[(0,g.jsx)(Se,{children:(null===ft||void 0===ft?void 0:ft.companyName)||"Restaurant"}),ft&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{style:{fontSize:"11px",marginTop:"5px"},children:ft.address}),(0,g.jsxs)("div",{style:{fontSize:"11px"},children:[ft.city,", ",ft.state," ",ft.postcode]}),(0,g.jsxs)("div",{style:{fontSize:"11px"},children:["Tel: ",ft.phone]}),ft.email&&(0,g.jsxs)("div",{style:{fontSize:"11px"},children:["Email: ",ft.email]}),ft.taxNo&&(0,g.jsxs)("div",{style:{fontSize:"11px",marginTop:"3px"},children:["Tax No: ",ft.taxNo]})]}),(0,g.jsx)("div",{style:{fontSize:"12px",fontWeight:"bold",marginTop:"5px"},children:"ORDER RECEIPT"})]}),(0,g.jsxs)(Be,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,g.jsxs)(Ee,{children:[(0,g.jsx)("strong",{children:"Order No:"}),(0,g.jsx)("span",{children:He.order_number})]}),(0,g.jsxs)(Ee,{children:[(0,g.jsx)("strong",{children:"Date:"}),(0,g.jsx)("span",{children:Kr(He.order_date||He.createdAt)})]}),(0,g.jsxs)(Ee,{children:[(0,g.jsx)("strong",{children:"Customer:"}),(0,g.jsx)("span",{children:He.customer_name||"Guest"})]}),(0,g.jsxs)(Ee,{children:[(0,g.jsx)("strong",{children:"Phone:"}),(0,g.jsx)("span",{children:He.customer_phone||"N/A"})]}),(0,g.jsxs)(Ee,{children:[(0,g.jsx)("strong",{children:"Order Type:"}),(0,g.jsx)("span",{children:"dine_in"===He.order_type?"DINE IN":null===(t=He.order_type)||void 0===t?void 0:t.toUpperCase()})]}),He.table_number&&(0,g.jsxs)(Ee,{children:[(0,g.jsx)("strong",{children:"Table:"}),(0,g.jsx)("span",{children:He.table_number})]}),("takeaway"===He.order_type||"pickup"===He.order_type)&&(0,g.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",He.order_number.split("-")[1]||"000"]}),"pickup"===He.order_type&&(0,g.jsxs)("div",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"center",margin:"5px 0",color:"#8B5CF6"},children:["Pickup: ",He.scheduled_pickup_time?y(He.scheduled_pickup_time):"ASAP"]})]}),(0,g.jsx)(Be,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,g.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,g.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,g.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,g.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,g.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,g.jsx)("tbody",{children:He.order_items&&Array.isArray(He.order_items)&&He.order_items.map((e,t)=>{var r,n,i;return(0,g.jsxs)("tr",{children:[(0,g.jsxs)("td",{style:{padding:"5px 0"},children:[e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",e.options&&e.options.length>0&&(0,g.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:Array.isArray(e.options)?e.options.join(", "):e.options})]}),(0,g.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,g.jsx)("td",{style:{textAlign:"right"},children:parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0).toFixed(2)}),(0,g.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0)).toFixed(2)})]},t)})})]})}),(0,g.jsxs)(Be,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,g.jsxs)(Ee,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:(0,x.vv)(Number(He.subtotal||He.total_amount),ze.currency)})]}),He.discount>0&&(0,g.jsxs)(Ee,{children:[(0,g.jsx)("span",{children:"Discount:"}),(0,g.jsx)("span",{children:(0,x.vv)(-Number(He.discount),ze.currency)})]}),He.coupon_discount>0&&(0,g.jsxs)(Ee,{children:[(0,g.jsxs)("span",{children:["Coupon (",He.coupon_code,"):"]}),(0,g.jsx)("span",{children:(0,x.vv)(-Number(He.coupon_discount),ze.currency)})]}),parseFloat(He.takeaway_charge||0)>0&&(0,g.jsxs)(Ee,{children:[(0,g.jsx)("span",{children:"Takeaway Charge:"}),(0,g.jsx)("span",{children:(0,x.vv)(parseFloat(He.takeaway_charge),ze.currency)})]}),He.service_charge>0&&(0,g.jsxs)(Ee,{children:[(0,g.jsxs)("span",{children:["Service Charge (",He.service_charge_rate||10,"%):"]}),(0,g.jsx)("span",{children:(0,x.vv)(Number(He.service_charge),ze.currency)})]}),He.tax>0&&(0,g.jsxs)(Ee,{children:[(0,g.jsxs)("span",{children:["Tax (",He.tax_rate||6,"%):"]}),(0,g.jsx)("span",{children:(0,x.vv)(Number(He.tax),ze.currency)})]}),(0,g.jsxs)(Ee,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,g.jsx)("span",{children:"TOTAL:"}),(0,g.jsx)("span",{children:(0,x.vv)(Number(He.total_amount),ze.currency)})]})]}),(0,g.jsxs)(Be,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,g.jsxs)(Ee,{children:[(0,g.jsx)("span",{children:"Payment Method:"}),(0,g.jsx)("span",{children:He.payment_method?He.payment_method.toUpperCase():"N/A"})]}),(0,g.jsxs)(Ee,{children:[(0,g.jsx)("span",{children:"Order Status:"}),(0,g.jsx)("span",{children:He.status.toUpperCase()})]})]}),(0,g.jsxs)(Ie,{children:[(0,g.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,g.jsx)("div",{children:"Thank you for your purchase!"}),(0,g.jsx)("div",{children:"Please keep this receipt for your records"})]})]}),document.body),(0,g.jsx)(re,{isOpen:Je,onClick:Ur,"data-modal":"delete-confirm",children:(0,g.jsxs)(ne,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(ie,{children:[(0,g.jsx)(oe,{children:"Delete Order"}),(0,g.jsx)(se,{onClick:Ur,children:"\xd7"})]}),(0,g.jsxs)(ae,{children:[(0,g.jsx)("p",{children:"Are you sure you want to delete this order? This action cannot be undone."}),(0,g.jsxs)("p",{style:{color:"#FF6B6B",fontWeight:500,marginTop:"16px"},children:["Order #",Xe&&(null===(r=De.find(e=>e.id===Xe))||void 0===r?void 0:r.order_number)]})]}),(0,g.jsxs)(ve,{children:[(0,g.jsx)(X,{variant:"secondary",onClick:Ur,children:"Cancel"}),(0,g.jsx)(X,{onClick:async()=>{if(Xe){const t=Xe;Re(e=>e.filter(e=>e.id!==t)),Ke(!1),Qe(null);try{const e=await fetch(`/api/orders/${t}`,b({method:"DELETE"}));(await e.json()).success?console.log("Order deleted successfully"):kr()}catch(e){console.error("Failed to delete order:",e),kr()}}else Ke(!1)},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Delete Order"})]})]})}),(0,g.jsx)(re,{isOpen:Ze,onClick:e=>e.target===e.currentTarget&&Yr(),children:(0,g.jsxs)(ne,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(ie,{children:[(0,g.jsx)(oe,{children:"Cancel Order"}),(0,g.jsx)(se,{onClick:Yr,children:"\xd7"})]}),(0,g.jsx)(ae,{children:(0,g.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:"1.6"},children:"Are you sure you want to cancel this order? The order history will be kept for your records."})}),(0,g.jsxs)(ve,{children:[(0,g.jsx)(X,{variant:"secondary",onClick:Yr,children:"No, Keep Order"}),(0,g.jsx)(X,{onClick:async()=>{if(tt){Re(e=>e.map(e=>e.id===tt?{...e,status:"cancelled"}:e)),et(!1),(null===He||void 0===He?void 0:He.id)===tt&&Lr();try{const e=await fetch(`/api/orders/${tt}/status`,b({method:"PATCH",body:JSON.stringify({status:"cancelled"})}));(await e.json()).success?console.log("Order cancelled successfully"):kr()}catch(e){console.error("Failed to cancel order:",e),kr()}finally{rt(null)}}},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Yes, Cancel Order"})]})]})}),nt&&ot&&(0,g.jsx)(c.A,{isOpen:nt,onClose:()=>{it(!1),setTimeout(()=>{st(null)},100)},total:Number(ot.total_amount),subtotal:Number(ot.subtotal||0),tax:Number(ot.tax||0),serviceCharge:Number(ot.service_charge||0),discountAmount:Number(ot.discount||0),couponDiscount:Number(ot.coupon_discount||0),onConfirmPayment:async(e,t,r,n,i)=>{if(ot){Ct(!1);try{const t={payment_status:"completed",payment_method:e};n&&n>0&&i&&i>0&&(t.points_used=n,t.point_discount=i,t.total_amount=Number(ot.total_amount)-i);if(!(await fetch(`/api/orders/${ot.id}`,b({method:"PATCH",body:JSON.stringify(t)}))).ok)throw new Error("Failed to confirm payment");"awaiting_payment"===ot.status||"outstanding"===ot.status?await fetch(`/api/orders/${ot.id}`,b({method:"PATCH",body:JSON.stringify({status:"pending"})})):"served"===ot.status&&await fetch(`/api/orders/${ot.id}`,b({method:"PATCH",body:JSON.stringify({status:"completed"})})),it(!1),st(null),await kr(),Ge&&(Ye(!1),Ue(null))}catch(o){console.error("\u274c Payment error:",o)}}},paymentMethods:vt,customerId:ot.customer_id||void 0,restaurantId:null!==o&&void 0!==o&&o.restaurantId?Number(o.restaurantId):void 0,membershipSettings:At}),lr&&(0,g.jsx)(p.A,{isOpen:ar,onClose:()=>{dr(!1),cr(null)},menuItem:{id:lr.id,name:lr.name,price:parseFloat(lr.price)||0,emoji:lr.emoji||"\ud83c\udf7d\ufe0f",image:lr.image,optionGroups:lr.optionGroups},onConfirm:(e,t,r)=>{Wr(lr,e,r),dr(!1),cr(null),sr("")}}),(0,g.jsx)(re,{isOpen:Lt,onClick:()=>Vt(!1),"data-modal":"merge-target",children:(0,g.jsxs)(ne,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,g.jsxs)(ie,{children:[(0,g.jsx)(oe,{children:"Select Target Order"}),(0,g.jsx)(se,{onClick:()=>Vt(!1),children:"\xd7"})]}),(0,g.jsxs)(ae,{children:[(0,g.jsx)("p",{style:{marginBottom:"16px",color:"#6B7C93",fontSize:"14px"},children:"Select which order to merge INTO. The selected order's table/pager number will be kept."}),(0,g.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:De.filter(e=>Rt.includes(e.id)).sort((e,t)=>new Date(e.createdAt||e.order_date).getTime()-new Date(t.createdAt||t.order_date).getTime()).map(e=>{var t;return(0,g.jsxs)("div",{onClick:()=>Ut(e.id),style:{padding:"16px",border:"2px solid "+(Ht===e.id?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Ht===e.id?"#F0EEFF":"white",transition:"all 0.15s"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:600,fontSize:"16px",color:"#0A2540"},children:e.order_number}),(0,g.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93",marginTop:"4px"},children:[e.table_number?`Table ${e.table_number}`:"",e.table_number&&e.pager_number?" / ":"",e.pager_number?`Pager ${e.pager_number}`:"",e.table_number||e.pager_number?"":"No Table/Pager"]}),e.customer_name&&"Guest"!==e.customer_name&&"Mobile Guest"!==e.customer_name&&(0,g.jsx)("div",{style:{fontSize:"12px",color:"#635BFF",marginTop:"2px",fontWeight:500},children:e.customer_name})]}),(0,g.jsxs)("div",{style:{textAlign:"right"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:500,color:"#0A2540"},children:(0,x.vv)(e.total_amount,ze.currency)}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:[(null===(t=e.order_items)||void 0===t?void 0:t.length)||0," items"]})]})]}),Ht===e.id&&(0,g.jsx)("div",{style:{marginTop:"8px",fontSize:"12px",color:"#635BFF",fontWeight:500},children:"Other orders will be merged into this order"})]},e.id)})})]}),(0,g.jsxs)(ve,{children:[(0,g.jsx)(X,{onClick:()=>Vt(!1),style:{background:"white",color:"#374151",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,g.jsx)(X,{onClick:()=>Ht&&(async e=>{try{qt(!0),Vt(!1);const t=Rt,r=await fetch("/api/orders/merge",b({method:"POST",body:JSON.stringify({orderIds:t,targetOrderId:e})}));if(!r.ok){let e="Failed to merge orders";try{const t=await r.json();e=t.error||t.message||e}catch{403===r.status?e="Session expired. Please refresh the page and try again.":401===r.status&&(e="Authentication required. Please log in again.")}throw new Error(e)}const n=await r.json();wr(`Successfully merged ${t.length} orders into ${n.data.order_number}`,"success"),Dt(!1),Mt([]),Ut(null),kr()}catch(t){console.error("Merge error:",t),wr(t.message||"Failed to merge orders","error")}finally{qt(!1)}})(Ht),disabled:!Ht||Wt,style:{background:Ht?"#635BFF":"#E5E7EB",color:Ht?"white":"#9CA3AF",cursor:Ht?"pointer":"not-allowed"},children:Wt?"Merging...":"Merge Orders"})]})]})})]}),(()=>{const e=Or().length,t=Math.ceil(e/50);return t>1&&(0,g.jsxs)(Te,{children:[(0,g.jsxs)(Ne,{children:["Showing ",50*(xt-1)+1,"-",Math.min(50*xt,e)," of ",e," orders"]}),(0,g.jsxs)(Pe,{children:[(0,g.jsx)(Oe,{onClick:()=>mt(1),disabled:1===xt,children:"First"}),(0,g.jsx)(Oe,{onClick:()=>mt(e=>Math.max(1,e-1)),disabled:1===xt,children:"Previous"}),[...Array(Math.min(5,t))].map((e,r)=>{let n;return n=t<=5||xt<=3?r+1:xt>=t-2?t-4+r:xt-2+r,(0,g.jsx)(Oe,{active:xt===n,onClick:()=>mt(n),children:n},n)}),(0,g.jsx)(Oe,{onClick:()=>mt(e=>Math.min(t,e+1)),disabled:xt===t,children:"Next"}),(0,g.jsx)(Oe,{onClick:()=>mt(t),disabled:xt===t,children:"Last"})]})]})})()]}),i.createPortal((0,g.jsxs)(_e,{isVisible:hr.isVisible,type:hr.type,children:[(0,g.jsx)(we,{children:hr.message}),(0,g.jsx)(Fe,{onClick:()=>gr(e=>({...e,isVisible:!1})),children:"\xd7"})]}),document.body)]})}},4732:(e,t,r)=>{r.d(t,{Ay:()=>d});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,s=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,a=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,d=e=>{let{title:t,children:r}=e;return(0,i.jsxs)(o,{children:[(0,i.jsx)(s,{children:t}),r&&(0,i.jsx)(a,{children:r})]})}}}]);