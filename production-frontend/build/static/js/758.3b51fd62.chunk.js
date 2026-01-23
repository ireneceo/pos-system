"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[758],{758:(e,n,i)=>{i.r(n),i.d(n,{default:()=>B});var r=i(9950),s=i(4492),t=i(4752),o=i(3310),a=i(2674),d=i(4414);const c=t.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=t.Ay.div`
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
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,p=t.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,g=t.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,m=t.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,u=t.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,j=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,v=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,f=t.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,y=t.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,b=t.Ay.div`
  padding: 16px;
  border: 1px solid #F3F4F6;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #DC2626;
    background: #FEF2F2;
  }

  &:last-child {
    margin-bottom: 0;
  }
`,F=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,w=t.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,S=t.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>e.score>=90?"#059669":e.score>=75?"#2563EB":e.score>=60?"#D97706":"#DC2626"};
`,A=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,R=t.Ay.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
`,k=t.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`,B=()=>{const e=(0,s.Zp)(),[n,i]=(0,r.useState)("overview"),[t,B]=(0,r.useState)([]),[,E]=(0,r.useState)([]),[z,C]=(0,r.useState)("month"),[M,T]=(0,r.useState)({assignedBrand:"",assignedRegions:[],totalStores:0,monthlyRevenue:0,cumulativeRevenue:0,averageRevenuePerStore:0,customerSatisfaction:0,marketShare:0,growthRate:0,activePromotions:0,newFranchises:0,totalTransactions:0});(0,r.useEffect)(()=>{(async()=>{try{B([]),T({assignedBrand:"",assignedRegions:[],totalStores:0,monthlyRevenue:0,cumulativeRevenue:0,averageRevenuePerStore:0,customerSatisfaction:0,marketShare:0,growthRate:0,activePromotions:0,newFranchises:0,totalTransactions:0}),E([])}catch(e){console.error("Error fetching brand manager data:",e)}})()},[]);const P=e=>{switch(e){case"active":return"Operating";case"underperforming":return"Needs Improvement";case"expanding":return"Expanding";default:return e}};return(0,d.jsx)(o.A,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{children:"Brand Manager Dashboard"}),(0,d.jsxs)(p,{children:[M.assignedBrand," \u2022 ",M.assignedRegions.join(", ")," Region"]})]}),(0,d.jsxs)(l,{children:[(0,d.jsxs)(a.j,{children:[(0,d.jsx)(a.oz,{active:"overview"===n,onClick:()=>i("overview"),children:"Overview"}),(0,d.jsxs)(a.oz,{active:"franchises"===n,onClick:()=>i("franchises"),children:["Franchises (",M.totalStores,")"]})]}),"overview"===n&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(a.Ot,{children:[(0,d.jsxs)(a.XS,{children:[(0,d.jsx)(a.G$,{children:M.totalStores}),(0,d.jsx)(a.h2,{children:"Assigned Stores"})]}),(0,d.jsxs)(a.XS,{children:[(0,d.jsxs)(a.G$,{children:["RM ",(M.monthlyRevenue/1e3).toFixed(0),"K"]}),(0,d.jsx)(a.h2,{children:"Monthly Revenue"})]}),(0,d.jsxs)(a.XS,{children:[(0,d.jsxs)(a.G$,{children:[M.customerSatisfaction.toFixed(1),"/5.0"]}),(0,d.jsx)(a.h2,{children:"Customer Satisfaction"})]}),(0,d.jsxs)(a.XS,{children:[(0,d.jsxs)(a.G$,{children:[M.marketShare.toFixed(1),"%"]}),(0,d.jsx)(a.h2,{children:"Market Share"})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(m,{children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,d.jsx)("h3",{children:"Monthly Franchise Revenue Trend"}),(0,d.jsxs)(k,{value:z,onChange:e=>C(e.target.value),children:[(0,d.jsx)("option",{value:"week",children:"This Week"}),(0,d.jsx)("option",{value:"month",children:"This Month"}),(0,d.jsx)("option",{value:"quarter",children:"Quarter"}),(0,d.jsx)("option",{value:"year",children:"This Year"})]})]}),(0,d.jsx)(R,{children:"\ud83d\udcca Monthly Franchise Revenue Chart (Coming Soon)"})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)("h3",{children:"Brand Status"}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:"Active Promotions"}),(0,d.jsx)(f,{children:M.activePromotions})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:"New Franchises"}),(0,d.jsx)(f,{children:M.newFranchises})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:"Avg Store Revenue"}),(0,d.jsxs)(f,{children:["RM ",(M.averageRevenuePerStore/1e3).toFixed(0),"K"]})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:"Growth Rate (MoM)"}),(0,d.jsxs)(f,{children:["+",M.growthRate.toFixed(1),"%"]})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:"Monthly Transactions"}),(0,d.jsx)(f,{children:M.totalTransactions})]})]})]})]}),"franchises"===n&&(0,d.jsxs)(y,{children:[(0,d.jsx)("h3",{children:"Franchise Status"}),0===t.length?(0,d.jsx)(R,{children:"\ud83c\udfea Loading franchise data..."}):t.map(n=>(0,d.jsxs)(b,{onClick:()=>e(`/brand/franchise/${n.id}`),children:[(0,d.jsxs)(F,{children:[(0,d.jsx)(w,{children:n.name}),(0,d.jsxs)(S,{score:n.performanceScore,children:[n.performanceScore,"pts"]})]}),(0,d.jsxs)(A,{children:[(0,d.jsxs)("span",{children:[n.location," \u2022 ",n.storeSize]}),(0,d.jsxs)("span",{children:["RM ",(n.monthlyRevenue/1e3).toFixed(0),"K/month"]})]}),(0,d.jsxs)(A,{style:{marginTop:"4px"},children:[(0,d.jsxs)("span",{children:[n.manager," \u2022 ",n.phone]}),(0,d.jsxs)("span",{children:["Opened: ",n.openDate," \u2022 ",P(n.status)]})]})]},n.id))]})]})]})})}}}]);