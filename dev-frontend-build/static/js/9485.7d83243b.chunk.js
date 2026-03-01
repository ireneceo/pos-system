"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9485],{9485:(e,r,i)=>{i.r(r),i.d(r,{default:()=>R});var t=i(8819),n=i(9950),o=i(4752),s=i(4492),a=i(4414);const l=o.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,d=o.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${t.w.colors.border};
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
`,p=o.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`,c=o.Ay.button`
  position: absolute;
  left: 32px;
  top: 32px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: ${t.w.colors.text.muted};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
    color: ${t.w.colors.secondary};
    border-color: #CBD5E1;
  }
`,x=o.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,h=o.Ay.p`
  font-size: 18px;
  color: #6B7280;
  margin: 0;
`,u=o.Ay.div`
  padding: 48px 32px;

  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`,f=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
`,m=o.Ay.span`
  font-size: 16px;
  font-weight: ${e=>e.active?"600":"400"};
  color: ${e=>e.active?"#0A2540":"#6B7280"};
  transition: all 0.2s;
`,g=o.Ay.div`
  width: 56px;
  height: 32px;
  background: #635BFF;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
`,b=o.Ay.div`
  width: 26px;
  height: 26px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: ${e=>e.annual?"27px":"3px"};
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,y=o.Ay.span`
  padding: 4px 8px;
  background: #ECFDF5;
  color: #059669;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`,w=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: ${e=>e.recommended?"2px solid #635BFF":"1px solid #E6EBF1"};
  position: relative;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }
`,j=o.Ay.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: ${t.w.colors.primary};
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=o.Ay.div`
  text-align: center;
  margin-bottom: 24px;
`,F=o.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${t.w.colors.secondary};
  margin: 0 0 8px 0;
  text-transform: capitalize;
`,k=o.Ay.div`
  font-size: 36px;
  font-weight: 700;
  color: ${t.w.colors.secondary};
  margin: 16px 0;
  
  span {
    font-size: 18px;
    font-weight: 400;
    color: ${t.w.colors.text.muted};
  }
`,P=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,$=o.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0;
`,B=o.Ay.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: 14px;
  color: ${t.w.colors.text.dark};
`,z=o.Ay.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ECFDF5;
  color: ${t.w.colors.status.successAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: bold;
`,C=o.Ay.button`
  width: 100%;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>e.recommended?`\n    background: ${t.w.colors.primary};\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  `:`\n    background: white;\n    color: ${t.w.colors.primary};\n    border: 2px solid #635BFF;\n    \n    &:hover {\n      background: #F8F9FF;\n    }\n  `}
`,S=o.Ay.div`
  margin-top: 64px;
`,E=o.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin-bottom: 32px;
`,U=o.Ay.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${t.w.colors.border};
`,M=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  background: #F8FAFC;
  border-bottom: 1px solid ${t.w.colors.border};
`,D=o.Ay.div`
  padding: 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${t.w.colors.text.dark};
  text-align: center;
  text-transform: capitalize;
  
  &:first-child {
    text-align: left;
  }
`,G=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  border-bottom: 1px solid #F3F4F6;
  
  &:hover {
    background: #FAFBFC;
  }
`,I=o.Ay.div`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:first-child {
    text-align: left;
    justify-content: flex-start;
    font-weight: 500;
  }
`,L=o.Ay.span`
  color: #059669;
  font-weight: bold;
  font-size: 18px;
`,O=o.Ay.span`
  color: #DC2626;
  font-weight: bold;
  font-size: 18px;
`,R=()=>{const e=(0,s.Zp)(),[r,i]=(0,n.useState)(!1),t=e=>`RM${e}`,o=(e,r)=>{const i=12*e,t=i-r;return Math.round(t/i*100)};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(l,{children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(c,{onClick:()=>e("/pos/manager/subscriptions"),children:"\u2190 Back to Subscriptions"}),(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{children:"Choose the Perfect Plan"}),(0,a.jsx)(h,{children:"Scale your restaurant operations with flexible pricing"})]})]}),(0,a.jsxs)(u,{children:[(0,a.jsxs)(f,{children:[(0,a.jsx)(m,{active:!r,children:"Monthly"}),(0,a.jsx)(g,{onClick:()=>i(!r),children:(0,a.jsx)(b,{annual:r})}),(0,a.jsx)(m,{active:r,children:"Annual"}),r&&(0,a.jsx)(y,{children:"Save up to 17%"})]}),(0,a.jsx)(A,{children:[{id:"basic",name:"Basic",type:"basic",monthlyPrice:29,annualPrice:290,orderLimit:1e3,features:["Up to 1,000 orders/month","Basic analytics dashboard","5 staff accounts","Email support","10GB storage","Standard POS features"]},{id:"professional",name:"Professional",type:"professional",monthlyPrice:99,annualPrice:990,orderLimit:1e4,features:["Up to 10,000 orders/month","Advanced analytics & reports","Unlimited staff accounts","Priority email support","50GB storage","Advanced POS features","Multi-location support","Custom branding"],recommended:!0},{id:"enterprise",name:"Enterprise",type:"enterprise",monthlyPrice:199,annualPrice:2190,orderLimit:-1,features:["Unlimited orders","Custom analytics & AI insights","Unlimited staff accounts","24/7 priority support","Unlimited storage","All POS features","Unlimited locations","White-label solution","API access","Dedicated account manager"]}].map(e=>(0,a.jsxs)(w,{recommended:e.recommended,children:[e.recommended&&(0,a.jsx)(j,{children:"Most Popular"}),(0,a.jsxs)(v,{children:[(0,a.jsx)(F,{children:e.name}),(0,a.jsxs)(k,{children:[t(r?Math.round(e.annualPrice/12):e.monthlyPrice),(0,a.jsxs)("span",{children:["/",r?"month (billed annually)":"month"]})]}),r&&(0,a.jsxs)(P,{children:[t(e.annualPrice)," billed annually",(0,a.jsx)("br",{}),"Save ",o(e.monthlyPrice,e.annualPrice),"%"]})]}),(0,a.jsx)($,{children:e.features.map((e,r)=>(0,a.jsxs)(B,{children:[(0,a.jsx)(z,{children:"\u2713"}),e]},r))}),(0,a.jsx)(C,{recommended:e.recommended,onClick:()=>{return r=e.id,void alert(`Selected plan: ${r}. This would normally open a subscription form or payment page.`);var r},children:e.recommended?"Get Started":"Select Plan"})]},e.id))}),(0,a.jsxs)(S,{children:[(0,a.jsx)(E,{children:"Detailed Feature Comparison"}),(0,a.jsxs)(U,{children:[(0,a.jsxs)(M,{children:[(0,a.jsx)(D,{children:"Features"}),(0,a.jsx)(D,{children:"Basic"}),(0,a.jsx)(D,{children:"Professional"}),(0,a.jsx)(D,{children:"Enterprise"})]}),[{feature:"Monthly Orders",basic:"1,000",professional:"10,000",enterprise:"Unlimited"},{feature:"Staff Accounts",basic:"5",professional:"Unlimited",enterprise:"Unlimited"},{feature:"Storage",basic:"10GB",professional:"50GB",enterprise:"Unlimited"},{feature:"Analytics",basic:"\u2713",professional:"\u2713",enterprise:"\u2713"},{feature:"Advanced Reports",basic:"\u2717",professional:"\u2713",enterprise:"\u2713"},{feature:"AI Insights",basic:"\u2717",professional:"\u2717",enterprise:"\u2713"},{feature:"Multi-location",basic:"\u2717",professional:"\u2713",enterprise:"\u2713"},{feature:"Custom Branding",basic:"\u2717",professional:"\u2713",enterprise:"\u2713"},{feature:"White Label",basic:"\u2717",professional:"\u2717",enterprise:"\u2713"},{feature:"API Access",basic:"\u2717",professional:"\u2717",enterprise:"\u2713"},{feature:"Support",basic:"Email",professional:"Priority",enterprise:"24/7"},{feature:"Account Manager",basic:"\u2717",professional:"\u2717",enterprise:"\u2713"}].map((e,r)=>(0,a.jsxs)(G,{children:[(0,a.jsx)(I,{children:e.feature}),(0,a.jsx)(I,{children:"\u2713"===e.basic?(0,a.jsx)(L,{children:"\u2713"}):"\u2717"===e.basic?(0,a.jsx)(O,{children:"\u2717"}):e.basic}),(0,a.jsx)(I,{children:"\u2713"===e.professional?(0,a.jsx)(L,{children:"\u2713"}):"\u2717"===e.professional?(0,a.jsx)(O,{children:"\u2717"}):e.professional}),(0,a.jsx)(I,{children:"\u2713"===e.enterprise?(0,a.jsx)(L,{children:"\u2713"}):"\u2717"===e.enterprise?(0,a.jsx)(O,{children:"\u2717"}):e.enterprise})]},r))]})]})]})]})})}}}]);