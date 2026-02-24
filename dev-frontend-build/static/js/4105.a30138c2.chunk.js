"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4105],{4105:(e,t,r)=>{r.r(t),r.d(t,{default:()=>F});var i=r(9950),n=r(4752),o=r(3310),s=r(1367),a=r(2674),d=r(4414);const l=n.Ay.div`
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
`,x=n.Ay.h1`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,h=n.Ay.div`
  padding: 24px 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`,p=n.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`,u=n.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,g=n.Ay.button`
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
`,y=n.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 32px 0 16px 0;
`,j=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,f=n.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 20px;
`,m=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,b=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F1F5F9;

  &:last-child {
    border-bottom: none;
  }
`,A=n.Ay.span`
  font-size: 13px;
  color: #6B7C93;
  text-transform: capitalize;
`,w=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,v=n.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,F=()=>{const{user:e}=(0,s.As)(),[t,r]=(0,i.useState)([]),[n,F]=(0,i.useState)(""),[B,k]=(0,i.useState)(null),[S,z]=(0,i.useState)(!1),[E,O]=(0,i.useState)("month");(0,i.useEffect)(()=>{$()},[]),(0,i.useEffect)(()=>{n&&C()},[n,E]);const $=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&e.data.length>0&&(r(e.data),F(e.data[0].id.toString()))}}catch(e){console.error("Failed to load restaurants:",e)}},C=async()=>{if(n){z(!0);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/owner/restaurants/${n}/stats?period=${E}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&k(e.data)}}catch(e){console.error("Failed to load stats:",e)}finally{z(!1)}}};return(0,d.jsx)(o.A,{children:(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{children:(0,d.jsx)(x,{children:"Reports"})}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(u,{value:n,onChange:e=>F(e.target.value),children:t.map(e=>(0,d.jsx)("option",{value:e.id,children:e.name},e.id))}),["day","week","month","year"].map(e=>(0,d.jsx)(g,{active:E===e,onClick:()=>O(e),children:"day"===e?"Today":"week"===e?"Week":"month"===e?"Month":"Year"},e))]}),S?(0,d.jsx)(v,{children:"Loading..."}):B?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(a.Ot,{children:[(0,d.jsxs)(a.XS,{children:[(0,d.jsx)(a.h2,{children:"Total Revenue"}),(0,d.jsxs)(a.G$,{children:["RM ",Number(B.totalRevenue).toFixed(2)]})]}),(0,d.jsxs)(a.XS,{children:[(0,d.jsx)(a.h2,{children:"Total Orders"}),(0,d.jsx)(a.G$,{children:B.totalOrders})]}),(0,d.jsxs)(a.XS,{children:[(0,d.jsx)(a.h2,{children:"Average Order"}),(0,d.jsxs)(a.G$,{children:["RM ",Number(B.averageOrderValue).toFixed(2)]})]})]}),(0,d.jsx)(y,{children:"Breakdown"}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(f,{children:[(0,d.jsx)(m,{children:"By Order Type"}),Object.entries(B.orderByType).length>0?Object.entries(B.orderByType).map(e=>{let[t,r]=e;return(0,d.jsxs)(b,{children:[(0,d.jsx)(A,{children:t}),(0,d.jsx)(w,{children:r})]},t)}):(0,d.jsx)("div",{style:{color:"#8898AA",fontSize:"13px"},children:"No data"})]}),(0,d.jsxs)(f,{children:[(0,d.jsx)(m,{children:"By Payment Method"}),Object.entries(B.orderByPayment).length>0?Object.entries(B.orderByPayment).map(e=>{let[t,r]=e;return(0,d.jsxs)(b,{children:[(0,d.jsx)(A,{children:t}),(0,d.jsx)(w,{children:r})]},t)}):(0,d.jsx)("div",{style:{color:"#8898AA",fontSize:"13px"},children:"No data"})]})]})]}):(0,d.jsx)(v,{children:"Select a restaurant to view reports"})]})]})})}}}]);