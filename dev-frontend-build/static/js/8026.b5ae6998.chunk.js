"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8026],{8026:(e,n,t)=>{t.r(n),t.d(n,{default:()=>E});var i=t(9950),r=t(4492),s=t(4752),a=t(3310),o=t(2674),d=t(4414);const c=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=s.Ay.div`
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
`,h=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,p=s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,u=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,g=s.Ay.div`
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
`,j=s.Ay.div`
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
`,m=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,v=s.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,y=s.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,f=s.Ay.div`
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
`,b=s.Ay.div`
  padding: 16px;
  border: 1px solid #F3F4F6;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #2563EB;
    background: #F0F4FF;
  }

  &:last-child {
    margin-bottom: 0;
  }
`,w=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,F=s.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,R=s.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>{switch(e.status){case"active":return"#059669";case"expired":return"#DC2626";case"pending":return"#D97706";default:return"#6B7280"}}};
`,A=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,S=s.Ay.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
`,k=s.Ay.select`
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
`,E=()=>{const e=(0,r.Zp)(),[n,t]=(0,i.useState)("overview"),[s,E]=(0,i.useState)([]),[,B]=(0,i.useState)([]),[C,z]=(0,i.useState)("month"),[M,T]=(0,i.useState)({assignedFoodcourt:"",totalStores:0,monthlyRentRevenue:0,cumulativeRevenue:0,averageRevenuePerStore:0,occupancyRate:0,growthRate:0,maintenanceRequests:0,activeLeases:0,pendingApplications:0,totalTransactions:0});(0,i.useEffect)(()=>{(async()=>{try{E([]),T({assignedFoodcourt:"",totalStores:0,monthlyRentRevenue:0,cumulativeRevenue:0,averageRevenuePerStore:0,occupancyRate:0,growthRate:0,activeLeases:0,pendingApplications:0,maintenanceRequests:0,totalTransactions:0}),B([])}catch(e){console.error("Error fetching foodcourt manager data:",e)}})()},[]);const O=e=>{switch(e){case"active":return"Operating";case"expired":return"Contract Expired";case"pending":return"Pending Contract";default:return e}};return(0,d.jsx)(a.A,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(l,{children:[(0,d.jsx)(x,{children:"Foodcourt Manager Dashboard"}),(0,d.jsxs)(p,{children:[M.assignedFoodcourt," Operations Status"]})]}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(o.j,{children:[(0,d.jsx)(o.oz,{active:"overview"===n,onClick:()=>t("overview"),children:"Overview"}),(0,d.jsxs)(o.oz,{active:"tenants"===n,onClick:()=>t("tenants"),children:["Tenants (",M.totalStores,")"]})]}),"overview"===n&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(o.Ot,{children:[(0,d.jsxs)(o.XS,{children:[(0,d.jsx)(o.G$,{children:M.totalStores}),(0,d.jsx)(o.h2,{children:"Operating Stores"})]}),(0,d.jsxs)(o.XS,{children:[(0,d.jsxs)(o.G$,{children:["RM ",(M.monthlyRentRevenue/1e3).toFixed(1),"K"]}),(0,d.jsx)(o.h2,{children:"Monthly Rental Revenue"})]}),(0,d.jsxs)(o.XS,{children:[(0,d.jsxs)(o.G$,{children:[M.occupancyRate.toFixed(1),"%"]}),(0,d.jsx)(o.h2,{children:"Occupancy Rate"})]}),(0,d.jsxs)(o.XS,{children:[(0,d.jsxs)(o.G$,{children:["RM ",(M.averageRevenuePerStore/1e3).toFixed(1),"K"]}),(0,d.jsx)(o.h2,{children:"Average Rental"})]})]}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(g,{children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,d.jsx)("h3",{children:"Monthly Rental Revenue Trend"}),(0,d.jsxs)(k,{value:C,onChange:e=>z(e.target.value),children:[(0,d.jsx)("option",{value:"week",children:"This Week"}),(0,d.jsx)("option",{value:"month",children:"This Month"}),(0,d.jsx)("option",{value:"quarter",children:"Quarter"}),(0,d.jsx)("option",{value:"year",children:"This Year"})]})]}),(0,d.jsx)(S,{children:"\ud83d\udcca Monthly Rental Revenue Chart (Coming Soon)"})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)("h3",{children:"Operations Status"}),(0,d.jsxs)(m,{children:[(0,d.jsx)(v,{children:"Active Contracts"}),(0,d.jsx)(y,{children:M.activeLeases})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(v,{children:"Pending Contracts"}),(0,d.jsx)(y,{children:M.pendingApplications})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(v,{children:"Maintenance Requests"}),(0,d.jsx)(y,{children:M.maintenanceRequests})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(v,{children:"Growth Rate (vs Last Month)"}),(0,d.jsxs)(y,{children:["+",M.growthRate.toFixed(1),"%"]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(v,{children:"Monthly Transactions"}),(0,d.jsx)(y,{children:M.totalTransactions})]})]})]})]}),"tenants"===n&&(0,d.jsxs)(f,{children:[(0,d.jsx)("h3",{children:"Tenant Status"}),0===s.length?(0,d.jsx)(S,{children:"\ud83c\udfea Loading tenant data..."}):s.map(n=>(0,d.jsxs)(b,{onClick:()=>e(`/foodcourt/tenant/${n.id}`),children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(F,{children:n.name}),(0,d.jsx)(R,{status:n.status,children:O(n.status)})]}),(0,d.jsxs)(A,{children:[(0,d.jsxs)("span",{children:[n.category," \u2022 ",n.storeSize]}),(0,d.jsxs)("span",{children:["RM ",n.monthlyRent.toLocaleString(),"/month"]})]}),(0,d.jsxs)(A,{style:{marginTop:"4px"},children:[(0,d.jsxs)("span",{children:[n.contactPerson," \u2022 ",n.phone]}),(0,d.jsxs)("span",{children:["Contract: ",n.leaseStart," ~ ",n.leaseEnd]})]})]},n.id))]})]})]})})}}}]);