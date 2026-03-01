"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9876],{3705:(e,r,o)=>{o.d(r,{cc:()=>s.$n});var i=o(8819),n=o(4752),s=o(8829);n.Ay.select`
  padding: ${i.w.components.form.inputPadding};
  border: 1px solid ${i.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${i.w.typography.fontSize.sm};
  background: ${i.w.colors.surface};
  color: ${i.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: ${i.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${i.w.colors.borderHover};
  }
`,n.Ay.input`
  padding: ${i.w.components.form.inputPadding};
  border: 1px solid ${i.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${i.w.typography.fontSize.sm};
  background: ${i.w.colors.surface};
  color: ${i.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: ${i.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${i.w.colors.borderHover};
  }
`,n.Ay.div`
  background: ${i.w.colors.surface};
  border-radius: ${i.w.borderRadius.md};
  border: 1px solid ${i.w.colors.borderLight};
  padding: ${i.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${i.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${i.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${i.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},9876:(e,r,o)=>{o.r(r),o.d(r,{default:()=>T});var i=o(8819),n=o(9950),s=o(4752),t=o(3705),d=o(4414);const l=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,a=s.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${i.w.colors.border};
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
`,c=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${i.w.colors.secondary};
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=s.Ay.p`
  font-size: 16px;
  color: ${i.w.colors.text.muted};
  margin: 8px 0 0;
`,p=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${i.w.colors.border};
  margin-bottom: 24px;
`,g=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  align-items: end;
`,j=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,m=s.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,f=s.Ay.select`
  padding: 8px 12px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,u=s.Ay.div`
  display: flex;
  gap: 12px;
`,b=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${i.w.colors.border};
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`,w=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,v=s.Ay.div`
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
`,y=s.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${i.w.colors.secondary};
  margin: 0 0 20px 0;
`,A=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,$=s.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,F=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,E=s.Ay.span`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${e=>e.positive?"#DCFCE7":"#FEE2E2"};
`,k=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${i.w.colors.border};
  margin-bottom: 24px;
`,S=s.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
`,z=s.Ay.div`
  height: 300px;
  border: 2px dashed ${i.w.colors.border};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
  font-size: 16px;
`,B=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${i.w.colors.border};
  overflow-x: auto;
`,R=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,C=s.Ay.th`
  text-align: left;
  padding: 16px 12px;
  border-bottom: 2px solid #E6EBF1;
  font-weight: 600;
  color: ${i.w.colors.text.dark};
  font-size: 14px;
  white-space: nowrap;
`,G=s.Ay.tr`
  &:hover {
    background: #F9FAFB;
  }
`,M=s.Ay.td`
  padding: 16px 12px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  color: #374151;
  white-space: nowrap;
`,P=s.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>e.score>=90?"background: #DCFCE7; color: #166534;":e.score>=80?"background: #DBEAFE; color: #1E40AF;":e.score>=70?"background: #FEF3C7; color: #92400E;":"background: #FEE2E2; color: #991B1B;"}
`,L=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,D=s.Ay.div`
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
`,O=s.Ay.div`
  font-size: 36px;
  font-weight: 700;
  color: #635BFF;
  margin-bottom: 8px;
`,H=s.Ay.div`
  font-size: 16px;
  color: #6B7280;
  font-weight: 500;
  margin-bottom: 8px;
`,N=s.Ay.div`
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
`,T=()=>{const[e,r]=(0,n.useState)("month"),[o,i]=(0,n.useState)("all"),[s,T]=(0,n.useState)([]),[Y,J]=(0,n.useState)({totalRevenue:0,totalOrders:0,avgSatisfaction:0,avgPerformance:0,totalStores:0,monthlyGrowth:0});(0,n.useEffect)(()=>{(async()=>{try{T([]),J({totalRevenue:0,totalOrders:0,avgSatisfaction:0,avgPerformance:0,totalStores:0,monthlyGrowth:0})}catch(e){console.error("Error fetching report data:",e)}})()},[e,o]);const q="all"===o?s:s.filter(e=>e.storeName.toLowerCase().includes(o.toLowerCase()));return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(l,{children:[(0,d.jsxs)(a,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(x,{children:"Brand Reports"}),(0,d.jsx)(h,{children:"Brand-specific store performance analysis and comprehensive reports"})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(t.cc,{variant:"outline",children:"Export Report"}),(0,d.jsx)(t.cc,{variant:"primary",children:"Generate Report"})]})]}),(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsxs)(g,{children:[(0,d.jsxs)(j,{children:[(0,d.jsx)(m,{children:"Analysis Period"}),(0,d.jsxs)(f,{value:e,onChange:e=>r(e.target.value),children:[(0,d.jsx)("option",{value:"week",children:"This Week"}),(0,d.jsx)("option",{value:"month",children:"This Month"}),(0,d.jsx)("option",{value:"quarter",children:"Quarter"}),(0,d.jsx)("option",{value:"year",children:"This Year"})]})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(m,{children:"Store Selection"}),(0,d.jsxs)(f,{value:o,onChange:e=>i(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Stores"}),(0,d.jsx)("option",{value:"Gangnam",children:"Gangnam Branch"}),(0,d.jsx)("option",{value:"Hongdae",children:"Hongdae Branch"}),(0,d.jsx)("option",{value:"Myeongdong",children:"Myeongdong Branch"}),(0,d.jsx)("option",{value:"Jamsil",children:"Jamsil Branch"})]})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(m,{children:"\xa0"}),(0,d.jsx)(t.cc,{variant:"primary",children:"View Analysis"})]})]})}),(0,d.jsxs)(b,{children:[(0,d.jsx)(t.cc,{variant:"primary",children:"Download PDF"}),(0,d.jsx)(t.cc,{variant:"outline",children:"Export Excel"}),(0,d.jsx)(t.cc,{variant:"outline",children:"Send Email"}),(0,d.jsx)(t.cc,{variant:"outline",children:"Print Report"})]}),(0,d.jsxs)(L,{children:[(0,d.jsxs)(D,{children:[(0,d.jsxs)(O,{children:["RM ",(Y.totalRevenue/1e6).toFixed(1),"M"]}),(0,d.jsx)(H,{children:"Total Brand Revenue"}),(0,d.jsxs)(N,{positive:Y.monthlyGrowth>0,children:[Y.monthlyGrowth.toFixed(1),"%"]})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(O,{children:Y.totalOrders.toLocaleString()}),(0,d.jsx)(H,{children:"Total Orders"}),(0,d.jsx)(N,{positive:!0,children:"+12.5%"})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(O,{children:Y.avgSatisfaction.toFixed(1)}),(0,d.jsx)(H,{children:"Average Customer Satisfaction"}),(0,d.jsx)(N,{positive:!0,children:"+0.3 points"})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(O,{children:Y.avgPerformance}),(0,d.jsx)(H,{children:"Average Performance Score"}),(0,d.jsx)(N,{positive:!0,children:"+5 points"})]})]}),(0,d.jsxs)(w,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(y,{children:"\ub9e4\ucd9c \ud604\ud669"}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"\uc774\ubc88 \ub2ec \ub9e4\ucd9c"}),(0,d.jsxs)(F,{children:["RM ",(Y.totalRevenue/1e6).toFixed(1),"M",(0,d.jsxs)(E,{positive:Y.monthlyGrowth>0,children:[Y.monthlyGrowth>0?"+":"",Y.monthlyGrowth.toFixed(1),"%"]})]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"\ud3c9\uade0 \uac1d\ub2e8\uac00"}),(0,d.jsxs)(F,{children:["RM ",Math.round(Y.totalRevenue/Y.totalOrders).toLocaleString()]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"\ucd5c\uace0 \ub9e4\ucd9c \ub9e4\uc7a5"}),(0,d.jsx)(F,{children:s.length>0?s[0].storeName:"N/A"})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(y,{children:"\uace0\uac1d \ub9cc\uc871\ub3c4"}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"\uc804\uccb4 \ud3c9\uade0"}),(0,d.jsxs)(F,{children:[Y.avgSatisfaction.toFixed(1),"/5.0",(0,d.jsx)(E,{positive:!0,children:"+0.2"})]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"\ucd1d \ub9ac\ubdf0 \uc218"}),(0,d.jsx)(F,{children:"2,847 items"})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"\uc7ac\ubc29\ubb38\uc728"}),(0,d.jsx)(F,{children:"68.5%"})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(y,{children:"\uc6b4\uc601 \ud6a8\uc728\uc131"}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"Average Performance Score"}),(0,d.jsxs)(F,{children:[Y.avgPerformance," points",(0,d.jsx)(E,{positive:!0,children:"+5 points"})]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"Excellent \ub9e4\uc7a5"}),(0,d.jsxs)(F,{children:[s.filter(e=>e.performance>=90).length," items"]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:" items\uc120 \ud544\uc694 \ub9e4\uc7a5"}),(0,d.jsxs)(F,{children:[s.filter(e=>e.performance<80).length," items"]})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(y,{children:"\uc131\uc7a5 \uc9c0\ud45c"}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"\uc6d4 \uc131\uc7a5\ub960"}),(0,d.jsxs)(F,{children:[Y.monthlyGrowth>0?"+":"",Y.monthlyGrowth.toFixed(1),"%",(0,d.jsx)(E,{positive:Y.monthlyGrowth>0,children:Y.monthlyGrowth>5?"Excellent":"Average"})]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"\uc2e0\uaddc \uace0\uac1d"}),(0,d.jsx)(F,{children:"1,234 customers"})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)($,{children:"\uc2dc\uc7a5  points\uc720\uc728"}),(0,d.jsx)(F,{children:"15.2%"})]})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)(S,{children:"\uc6d4\ubcc4 \ub9e4\ucd9c \ubc0f \uc131\uc7a5\ub960 \ucd94\uc774"}),(0,d.jsxs)(z,{children:["\ud83d\udcca \uc6d4\ubcc4 \ub9e4\ucd9c \ucd94\uc774 \ubc0f \uc131\uc7a5\ub960 \ucc28\ud2b8 ( items\ubc1c \uc608\uc815)",(0,d.jsx)("br",{}),"Chart.js \ub610\ub294 Recharts\ub97c \uc0ac\uc6a9\ud55c \ub370\uc774\ud130 \uc2dc\uac01\ud654"]})]}),(0,d.jsxs)(B,{children:[(0,d.jsx)(S,{children:"\ub9e4\uc7a5\ubcc4 \uc0c1\uc138 \uc131\uacfc \ubd84\uc11d"}),(0,d.jsxs)(R,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)(C,{children:"\uc21c\uc704"}),(0,d.jsx)(C,{children:"\ub9e4\uc7a5 customers"}),(0,d.jsx)(C,{children:"\uc6d4\ub9e4\ucd9c"}),(0,d.jsx)(C,{children:"\uc131\uc7a5\ub960"}),(0,d.jsx)(C,{children:"\uc8fc\ubb38\uc218"}),(0,d.jsx)(C,{children:"\ud3c9\uade0 \uac1d\ub2e8\uac00"}),(0,d.jsx)(C,{children:"\uace0\uac1d\ub9cc\uc871\ub3c4"}),(0,d.jsx)(C,{children:"\uc131\uacfc  points\uc218"})]})}),(0,d.jsx)("tbody",{children:q.sort((e,r)=>r.revenue-e.revenue).map((e,r)=>{return(0,d.jsxs)(G,{children:[(0,d.jsx)(M,{children:(0,d.jsxs)("strong",{children:["#",r+1]})}),(0,d.jsx)(M,{children:(0,d.jsx)("strong",{children:e.storeName})}),(0,d.jsx)(M,{children:(0,d.jsxs)("strong",{children:["RM ",(e.revenue/1e6).toFixed(1),"M"]})}),(0,d.jsx)(M,{children:(0,d.jsxs)(E,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth.toFixed(1),"%"]})}),(0,d.jsxs)(M,{children:[e.orders.toLocaleString()," orders"]}),(0,d.jsxs)(M,{children:["RM ",e.avgOrder.toLocaleString()]}),(0,d.jsxs)(M,{children:[e.satisfaction,"/5.0"]}),(0,d.jsx)(M,{children:(0,d.jsxs)(P,{score:e.performance,children:[e.performance," points (",(o=e.performance,o>=90?"Excellent":o>=80?"Good":o>=70?"Needs Improvement":"Poor"),")"]})})]},e.id);var o})})]})]})]})]})})}}}]);