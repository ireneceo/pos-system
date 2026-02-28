"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9485],{9485:(e,i,r)=>{r.r(i),r.d(i,{default:()=>O});var n=r(9950),t=r(4752),o=r(4492),s=r(4414);const a=t.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,d=t.Ay.div`
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
`,l=t.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`,p=t.Ay.button`
  position: absolute;
  left: 32px;
  top: 32px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
    color: #0A2540;
    border-color: #CBD5E1;
  }
`,c=t.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,x=t.Ay.p`
  font-size: 18px;
  color: #6B7280;
  margin: 0;
`,h=t.Ay.div`
  padding: 48px 32px;

  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`,f=t.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
`,u=t.Ay.span`
  font-size: 16px;
  font-weight: ${e=>e.active?"600":"400"};
  color: ${e=>e.active?"#0A2540":"#6B7280"};
  transition: all 0.2s;
`,m=t.Ay.div`
  width: 56px;
  height: 32px;
  background: #635BFF;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
`,g=t.Ay.div`
  width: 26px;
  height: 26px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: ${e=>e.annual?"27px":"3px"};
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,b=t.Ay.span`
  padding: 4px 8px;
  background: #ECFDF5;
  color: #059669;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`,A=t.Ay.div`
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
`,j=t.Ay.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #635BFF;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=t.Ay.div`
  text-align: center;
  margin-bottom: 24px;
`,v=t.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
  text-transform: capitalize;
`,w=t.Ay.div`
  font-size: 36px;
  font-weight: 700;
  color: #0A2540;
  margin: 16px 0;
  
  span {
    font-size: 18px;
    font-weight: 400;
    color: #6B7280;
  }
`,B=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,k=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0;
`,P=t.Ay.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: 14px;
  color: #374151;
`,z=t.Ay.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ECFDF5;
  color: #059669;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: bold;
`,C=t.Ay.button`
  width: 100%;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>e.recommended?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #635BFF;\n    border: 2px solid #635BFF;\n    \n    &:hover {\n      background: #F8F9FF;\n    }\n  "}
`,E=t.Ay.div`
  margin-top: 64px;
`,S=t.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin-bottom: 32px;
`,U=t.Ay.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
`,M=t.Ay.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
`,$=t.Ay.div`
  padding: 16px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  text-align: center;
  text-transform: capitalize;
  
  &:first-child {
    text-align: left;
  }
`,D=t.Ay.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  border-bottom: 1px solid #F3F4F6;
  
  &:hover {
    background: #FAFBFC;
  }
`,G=t.Ay.div`
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
`,I=t.Ay.span`
  color: #059669;
  font-weight: bold;
  font-size: 18px;
`,L=t.Ay.span`
  color: #DC2626;
  font-weight: bold;
  font-size: 18px;
`,O=()=>{const e=(0,o.Zp)(),[i,r]=(0,n.useState)(!1),t=e=>`RM${e}`,O=(e,i)=>{const r=12*e,n=r-i;return Math.round(n/r*100)};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(a,{children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(p,{onClick:()=>e("/pos/manager/subscriptions"),children:"\u2190 Back to Subscriptions"}),(0,s.jsxs)(l,{children:[(0,s.jsx)(c,{children:"Choose the Perfect Plan"}),(0,s.jsx)(x,{children:"Scale your restaurant operations with flexible pricing"})]})]}),(0,s.jsxs)(h,{children:[(0,s.jsxs)(f,{children:[(0,s.jsx)(u,{active:!i,children:"Monthly"}),(0,s.jsx)(m,{onClick:()=>r(!i),children:(0,s.jsx)(g,{annual:i})}),(0,s.jsx)(u,{active:i,children:"Annual"}),i&&(0,s.jsx)(b,{children:"Save up to 17%"})]}),(0,s.jsx)(y,{children:[{id:"basic",name:"Basic",type:"basic",monthlyPrice:29,annualPrice:290,orderLimit:1e3,features:["Up to 1,000 orders/month","Basic analytics dashboard","5 staff accounts","Email support","10GB storage","Standard POS features"]},{id:"professional",name:"Professional",type:"professional",monthlyPrice:99,annualPrice:990,orderLimit:1e4,features:["Up to 10,000 orders/month","Advanced analytics & reports","Unlimited staff accounts","Priority email support","50GB storage","Advanced POS features","Multi-location support","Custom branding"],recommended:!0},{id:"enterprise",name:"Enterprise",type:"enterprise",monthlyPrice:199,annualPrice:2190,orderLimit:-1,features:["Unlimited orders","Custom analytics & AI insights","Unlimited staff accounts","24/7 priority support","Unlimited storage","All POS features","Unlimited locations","White-label solution","API access","Dedicated account manager"]}].map(e=>(0,s.jsxs)(A,{recommended:e.recommended,children:[e.recommended&&(0,s.jsx)(j,{children:"Most Popular"}),(0,s.jsxs)(F,{children:[(0,s.jsx)(v,{children:e.name}),(0,s.jsxs)(w,{children:[t(i?Math.round(e.annualPrice/12):e.monthlyPrice),(0,s.jsxs)("span",{children:["/",i?"month (billed annually)":"month"]})]}),i&&(0,s.jsxs)(B,{children:[t(e.annualPrice)," billed annually",(0,s.jsx)("br",{}),"Save ",O(e.monthlyPrice,e.annualPrice),"%"]})]}),(0,s.jsx)(k,{children:e.features.map((e,i)=>(0,s.jsxs)(P,{children:[(0,s.jsx)(z,{children:"\u2713"}),e]},i))}),(0,s.jsx)(C,{recommended:e.recommended,onClick:()=>{return i=e.id,void alert(`Selected plan: ${i}. This would normally open a subscription form or payment page.`);var i},children:e.recommended?"Get Started":"Select Plan"})]},e.id))}),(0,s.jsxs)(E,{children:[(0,s.jsx)(S,{children:"Detailed Feature Comparison"}),(0,s.jsxs)(U,{children:[(0,s.jsxs)(M,{children:[(0,s.jsx)($,{children:"Features"}),(0,s.jsx)($,{children:"Basic"}),(0,s.jsx)($,{children:"Professional"}),(0,s.jsx)($,{children:"Enterprise"})]}),[{feature:"Monthly Orders",basic:"1,000",professional:"10,000",enterprise:"Unlimited"},{feature:"Staff Accounts",basic:"5",professional:"Unlimited",enterprise:"Unlimited"},{feature:"Storage",basic:"10GB",professional:"50GB",enterprise:"Unlimited"},{feature:"Analytics",basic:"\u2713",professional:"\u2713",enterprise:"\u2713"},{feature:"Advanced Reports",basic:"\u2717",professional:"\u2713",enterprise:"\u2713"},{feature:"AI Insights",basic:"\u2717",professional:"\u2717",enterprise:"\u2713"},{feature:"Multi-location",basic:"\u2717",professional:"\u2713",enterprise:"\u2713"},{feature:"Custom Branding",basic:"\u2717",professional:"\u2713",enterprise:"\u2713"},{feature:"White Label",basic:"\u2717",professional:"\u2717",enterprise:"\u2713"},{feature:"API Access",basic:"\u2717",professional:"\u2717",enterprise:"\u2713"},{feature:"Support",basic:"Email",professional:"Priority",enterprise:"24/7"},{feature:"Account Manager",basic:"\u2717",professional:"\u2717",enterprise:"\u2713"}].map((e,i)=>(0,s.jsxs)(D,{children:[(0,s.jsx)(G,{children:e.feature}),(0,s.jsx)(G,{children:"\u2713"===e.basic?(0,s.jsx)(I,{children:"\u2713"}):"\u2717"===e.basic?(0,s.jsx)(L,{children:"\u2717"}):e.basic}),(0,s.jsx)(G,{children:"\u2713"===e.professional?(0,s.jsx)(I,{children:"\u2713"}):"\u2717"===e.professional?(0,s.jsx)(L,{children:"\u2717"}):e.professional}),(0,s.jsx)(G,{children:"\u2713"===e.enterprise?(0,s.jsx)(I,{children:"\u2713"}):"\u2717"===e.enterprise?(0,s.jsx)(L,{children:"\u2717"}):e.enterprise})]},i))]})]})]})]})})}}}]);