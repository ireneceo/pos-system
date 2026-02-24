"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1333],{1333:(e,t,i)=>{i.r(t),i.d(t,{default:()=>b});var r=i(9950),n=i(4752),d=i(3310),s=i(1367),o=i(4414);const a=n.Ay.div`
  min-height: 100vh;
`,c=n.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
  }
`,l=n.Ay.h1`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,h=n.Ay.div`
  padding: 24px 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`,x=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`,p=n.Ay.button`
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#F0F0FF":"white"};
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }
`,u=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
`,g=n.Ay.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=n.Ay.td`
  padding: 12px 16px;
  font-size: 13px;
  color: #0A2540;
  border-bottom: 1px solid #F1F5F9;
`,F=n.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #F0F4FF;
  color: #635BFF;
  font-size: 12px;
  font-weight: 600;
`,f=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,j=n.Ay.div`
  height: 20px;
  width: ${e=>e.width}%;
  max-width: 200px;
  background: linear-gradient(135deg, #635BFF 0%, #8B83FF 100%);
  border-radius: 4px;
  min-width: 4px;
`,m=n.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,b=()=>{const{user:e}=(0,s.As)(),[t,i]=(0,r.useState)([]),[n,b]=(0,r.useState)(!0),[w,v]=(0,r.useState)("month");(0,r.useEffect)(()=>{A()},[w]);const A=async()=>{b(!0);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/owner/statistics/compare?period=${w}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&i(e.data)}}catch(e){console.error("Failed to load statistics:",e)}finally{b(!1)}},k=Math.max(...t.map(e=>e.revenue),1),B=(e,t)=>`${t||"RM"} ${Number(e).toFixed(2)}`;return(0,o.jsx)(d.A,{children:(0,o.jsxs)(a,{children:[(0,o.jsx)(c,{children:(0,o.jsx)(l,{children:"Statistics"})}),(0,o.jsxs)(h,{children:[(0,o.jsx)(x,{children:["day","week","month","year"].map(e=>(0,o.jsx)(p,{active:w===e,onClick:()=>v(e),children:"day"===e?"Today":"week"===e?"This Week":"month"===e?"This Month":"This Year"},e))}),n?(0,o.jsx)(m,{children:"Loading..."}):(0,o.jsxs)(u,{children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)(g,{style:{width:"40px"},children:"#"}),(0,o.jsx)(g,{children:"Restaurant"}),(0,o.jsx)(g,{children:"Revenue"}),(0,o.jsx)(g,{style:{width:"250px"},children:"Visual"}),(0,o.jsx)(g,{children:"Orders"}),(0,o.jsx)(g,{children:"Avg. Order"})]})}),(0,o.jsx)("tbody",{children:t.sort((e,t)=>t.revenue-e.revenue).map((e,t)=>(0,o.jsxs)("tr",{children:[(0,o.jsx)(y,{children:(0,o.jsx)(F,{children:t+1})}),(0,o.jsx)(y,{style:{fontWeight:600},children:e.restaurantName}),(0,o.jsx)(y,{style:{fontWeight:600},children:B(e.revenue,e.currency)}),(0,o.jsx)(y,{children:(0,o.jsx)(f,{children:(0,o.jsx)(j,{width:e.revenue/k*100})})}),(0,o.jsx)(y,{children:e.orderCount}),(0,o.jsx)(y,{children:B(e.averageOrderValue,e.currency)})]},e.restaurantId))})]})]})]})})}}}]);