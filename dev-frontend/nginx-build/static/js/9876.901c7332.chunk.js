"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9876],{3705:(e,r,n)=>{n.d(r,{cc:()=>i});var o=n(4752);const i=o.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,o.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,o.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},9876:(e,r,n)=>{n.r(r),n.d(r,{default:()=>Y});var o=n(9950),i=n(4752),s=n(3310),t=n(3705),d=n(4414);const a=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=i.Ay.div`
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
`,c=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,p=i.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,h=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  align-items: end;
`,j=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,u=i.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,m=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,b=i.Ay.div`
  display: flex;
  gap: 12px;
`,f=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,y=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid #635BFF;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,w=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`,A=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,F=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,E=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,B=i.Ay.span`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${e=>e.positive?"#DCFCE7":"#FEE2E2"};
`,k=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,C=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
`,z=i.Ay.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
  font-size: 16px;
`,S=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  overflow-x: auto;
`,R=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,G=i.Ay.th`
  text-align: left;
  padding: 16px 12px;
  border-bottom: 2px solid #E6EBF1;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  white-space: nowrap;
`,M=i.Ay.tr`
  &:hover {
    background: #F9FAFB;
  }
`,D=i.Ay.td`
  padding: 16px 12px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  color: #374151;
  white-space: nowrap;
`,P=i.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>e.score>=90?"background: #DCFCE7; color: #166534;":e.score>=80?"background: #DBEAFE; color: #1E40AF;":e.score>=70?"background: #FEF3C7; color: #92400E;":"background: #FEE2E2; color: #991B1B;"}
`,$=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,L=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,O=i.Ay.div`
  font-size: 36px;
  font-weight: 700;
  color: #635BFF;
  margin-bottom: 8px;
`,N=i.Ay.div`
  font-size: 16px;
  color: #6B7280;
  font-weight: 500;
  margin-bottom: 8px;
`,T=i.Ay.div`
  font-size: 14px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &::before {
    content: ${e=>e.positive?'"\u2197"':'"\u2198"'};
    font-size: 16px;
  }
`,Y=()=>{const[e,r]=(0,o.useState)("month"),[n,i]=(0,o.useState)("all"),[Y,H]=(0,o.useState)([]),[I,J]=(0,o.useState)({totalRevenue:0,totalOrders:0,avgSatisfaction:0,avgPerformance:0,totalStores:0,monthlyGrowth:0});(0,o.useEffect)(()=>{(async()=>{try{H([]),J({totalRevenue:0,totalOrders:0,avgSatisfaction:0,avgPerformance:0,totalStores:0,monthlyGrowth:0})}catch(e){console.error("Error fetching report data:",e)}})()},[e,n]);const q="all"===n?Y:Y.filter(e=>e.storeName.toLowerCase().includes(n.toLowerCase()));return(0,d.jsx)(s.A,{children:(0,d.jsxs)(a,{children:[(0,d.jsxs)(l,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(x,{children:"Brand Reports"}),(0,d.jsx)(p,{children:"Brand-specific store performance analysis and comprehensive reports"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(t.cc,{variant:"outline",children:"Export Report"}),(0,d.jsx)(t.cc,{variant:"primary",children:"Generate Report"})]})]}),(0,d.jsxs)(c,{children:[(0,d.jsx)(h,{children:(0,d.jsxs)(g,{children:[(0,d.jsxs)(j,{children:[(0,d.jsx)(u,{children:"Analysis Period"}),(0,d.jsxs)(m,{value:e,onChange:e=>r(e.target.value),children:[(0,d.jsx)("option",{value:"week",children:"This Week"}),(0,d.jsx)("option",{value:"month",children:"This Month"}),(0,d.jsx)("option",{value:"quarter",children:"Quarter"}),(0,d.jsx)("option",{value:"year",children:"This Year"})]})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(u,{children:"Store Selection"}),(0,d.jsxs)(m,{value:n,onChange:e=>i(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Stores"}),(0,d.jsx)("option",{value:"Gangnam",children:"Gangnam Branch"}),(0,d.jsx)("option",{value:"Hongdae",children:"Hongdae Branch"}),(0,d.jsx)("option",{value:"Myeongdong",children:"Myeongdong Branch"}),(0,d.jsx)("option",{value:"Jamsil",children:"Jamsil Branch"})]})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(u,{children:"\xa0"}),(0,d.jsx)(t.cc,{variant:"primary",children:"View Analysis"})]})]})}),(0,d.jsxs)(f,{children:[(0,d.jsx)(t.cc,{variant:"primary",children:"Download PDF"}),(0,d.jsx)(t.cc,{variant:"outline",children:"Export Excel"}),(0,d.jsx)(t.cc,{variant:"outline",children:"Send Email"}),(0,d.jsx)(t.cc,{variant:"outline",children:"Print Report"})]}),(0,d.jsxs)($,{children:[(0,d.jsxs)(L,{children:[(0,d.jsxs)(O,{children:["RM ",(I.totalRevenue/1e6).toFixed(1),"M"]}),(0,d.jsx)(N,{children:"Total Brand Revenue"}),(0,d.jsxs)(T,{positive:I.monthlyGrowth>0,children:[I.monthlyGrowth.toFixed(1),"%"]})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(O,{children:I.totalOrders.toLocaleString()}),(0,d.jsx)(N,{children:"Total Orders"}),(0,d.jsx)(T,{positive:!0,children:"+12.5%"})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(O,{children:I.avgSatisfaction.toFixed(1)}),(0,d.jsx)(N,{children:"Average Customer Satisfaction"}),(0,d.jsx)(T,{positive:!0,children:"+0.3 points"})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(O,{children:I.avgPerformance}),(0,d.jsx)(N,{children:"Average Performance Score"}),(0,d.jsx)(T,{positive:!0,children:"+5 points"})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(y,{children:[(0,d.jsx)(w,{children:"\ub9e4\ucd9c \ud604\ud669"}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"\uc774\ubc88 \ub2ec \ub9e4\ucd9c"}),(0,d.jsxs)(E,{children:["RM ",(I.totalRevenue/1e6).toFixed(1),"M",(0,d.jsxs)(B,{positive:I.monthlyGrowth>0,children:[I.monthlyGrowth>0?"+":"",I.monthlyGrowth.toFixed(1),"%"]})]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"\ud3c9\uade0 \uac1d\ub2e8\uac00"}),(0,d.jsxs)(E,{children:["RM ",Math.round(I.totalRevenue/I.totalOrders).toLocaleString()]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"\ucd5c\uace0 \ub9e4\ucd9c \ub9e4\uc7a5"}),(0,d.jsx)(E,{children:Y.length>0?Y[0].storeName:"N/A"})]})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(w,{children:"\uace0\uac1d \ub9cc\uc871\ub3c4"}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"\uc804\uccb4 \ud3c9\uade0"}),(0,d.jsxs)(E,{children:[I.avgSatisfaction.toFixed(1),"/5.0",(0,d.jsx)(B,{positive:!0,children:"+0.2"})]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"\ucd1d \ub9ac\ubdf0 \uc218"}),(0,d.jsx)(E,{children:"2,847 items"})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"\uc7ac\ubc29\ubb38\uc728"}),(0,d.jsx)(E,{children:"68.5%"})]})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(w,{children:"\uc6b4\uc601 \ud6a8\uc728\uc131"}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"Average Performance Score"}),(0,d.jsxs)(E,{children:[I.avgPerformance," points",(0,d.jsx)(B,{positive:!0,children:"+5 points"})]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"Excellent \ub9e4\uc7a5"}),(0,d.jsxs)(E,{children:[Y.filter(e=>e.performance>=90).length," items"]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:" items\uc120 \ud544\uc694 \ub9e4\uc7a5"}),(0,d.jsxs)(E,{children:[Y.filter(e=>e.performance<80).length," items"]})]})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(w,{children:"\uc131\uc7a5 \uc9c0\ud45c"}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"\uc6d4 \uc131\uc7a5\ub960"}),(0,d.jsxs)(E,{children:[I.monthlyGrowth>0?"+":"",I.monthlyGrowth.toFixed(1),"%",(0,d.jsx)(B,{positive:I.monthlyGrowth>0,children:I.monthlyGrowth>5?"Excellent":"Average"})]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"\uc2e0\uaddc \uace0\uac1d"}),(0,d.jsx)(E,{children:"1,234 customers"})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"\uc2dc\uc7a5  points\uc720\uc728"}),(0,d.jsx)(E,{children:"15.2%"})]})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)(C,{children:"\uc6d4\ubcc4 \ub9e4\ucd9c \ubc0f \uc131\uc7a5\ub960 \ucd94\uc774"}),(0,d.jsxs)(z,{children:["\ud83d\udcca \uc6d4\ubcc4 \ub9e4\ucd9c \ucd94\uc774 \ubc0f \uc131\uc7a5\ub960 \ucc28\ud2b8 ( items\ubc1c \uc608\uc815)",(0,d.jsx)("br",{}),"Chart.js \ub610\ub294 Recharts\ub97c \uc0ac\uc6a9\ud55c \ub370\uc774\ud130 \uc2dc\uac01\ud654"]})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(C,{children:"\ub9e4\uc7a5\ubcc4 \uc0c1\uc138 \uc131\uacfc \ubd84\uc11d"}),(0,d.jsxs)(R,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)(G,{children:"\uc21c\uc704"}),(0,d.jsx)(G,{children:"\ub9e4\uc7a5 customers"}),(0,d.jsx)(G,{children:"\uc6d4\ub9e4\ucd9c"}),(0,d.jsx)(G,{children:"\uc131\uc7a5\ub960"}),(0,d.jsx)(G,{children:"\uc8fc\ubb38\uc218"}),(0,d.jsx)(G,{children:"\ud3c9\uade0 \uac1d\ub2e8\uac00"}),(0,d.jsx)(G,{children:"\uace0\uac1d\ub9cc\uc871\ub3c4"}),(0,d.jsx)(G,{children:"\uc131\uacfc  points\uc218"})]})}),(0,d.jsx)("tbody",{children:q.sort((e,r)=>r.revenue-e.revenue).map((e,r)=>{return(0,d.jsxs)(M,{children:[(0,d.jsx)(D,{children:(0,d.jsxs)("strong",{children:["#",r+1]})}),(0,d.jsx)(D,{children:(0,d.jsx)("strong",{children:e.storeName})}),(0,d.jsx)(D,{children:(0,d.jsxs)("strong",{children:["RM ",(e.revenue/1e6).toFixed(1),"M"]})}),(0,d.jsx)(D,{children:(0,d.jsxs)(B,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth.toFixed(1),"%"]})}),(0,d.jsxs)(D,{children:[e.orders.toLocaleString()," orders"]}),(0,d.jsxs)(D,{children:["RM ",e.avgOrder.toLocaleString()]}),(0,d.jsxs)(D,{children:[e.satisfaction,"/5.0"]}),(0,d.jsx)(D,{children:(0,d.jsxs)(P,{score:e.performance,children:[e.performance," points (",(n=e.performance,n>=90?"Excellent":n>=80?"Good":n>=70?"Needs Improvement":"Poor"),")"]})})]},e.id);var n})})]})]})]})]})})}}}]);