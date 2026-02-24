"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6203],{6203:(e,t,r)=>{r.r(t),r.d(t,{default:()=>w});var a=r(9950),n=r(4752),i=r(3310),s=r(1367),o=r(4414);const d=n.Ay.div`
  min-height: 100vh;
`,l=n.Ay.div`
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
`,c=n.Ay.h1`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,p=n.Ay.div`
  padding: 24px 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`,x=n.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`,h=n.Ay.select`
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
`,f=n.Ay.td`
  padding: 12px 16px;
  font-size: 13px;
  color: #0A2540;
  border-bottom: 1px solid #F1F5F9;
`,j=n.Ay.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"completed":return"#ECFDF5";case"pending":return"#FFF7ED";case"cancelled":case"refunded":return"#FEF2F2";case"preparing":return"#EFF6FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#059669";case"pending":return"#EA580C";case"cancelled":case"refunded":return"#DC2626";case"preparing":return"#2563EB";default:return"#6B7280"}}};
`,m=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 12px 0;
  font-size: 13px;
  color: #6B7C93;
`,F=n.Ay.div`
  display: flex;
  gap: 4px;
`,b=n.Ay.button`
  padding: 4px 10px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 4px;
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7C93"};
  font-size: 12px;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: #635BFF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,y=n.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,w=()=>{const{user:e}=(0,s.As)(),[t,r]=(0,a.useState)([]),[n,w]=(0,a.useState)(""),[A,v]=(0,a.useState)([]),[B,C]=(0,a.useState)({total:0,page:1,limit:20,totalPages:0}),[E,k]=(0,a.useState)(!1),[S,z]=(0,a.useState)("");(0,a.useEffect)(()=>{$()},[]),(0,a.useEffect)(()=>{n&&P(1)},[n,S]);const $=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&e.data.length>0&&(r(e.data),w(e.data[0].id.toString()))}}catch(e){console.error("Failed to load restaurants:",e)}},P=async e=>{if(n){k(!0);try{const t=localStorage.getItem("auth_token"),r=new URLSearchParams({page:e.toString(),limit:"20"});S&&r.append("status",S);const a=await fetch(`/api/owner/restaurants/${n}/orders?${r}`,{headers:{Authorization:`Bearer ${t}`}});if(a.ok){const e=await a.json();e.success&&(v(e.data),C(e.pagination))}}catch(t){console.error("Failed to load orders:",t)}finally{k(!1)}}};return(0,o.jsx)(i.A,{children:(0,o.jsxs)(d,{children:[(0,o.jsx)(l,{children:(0,o.jsx)(c,{children:"Orders"})}),(0,o.jsxs)(p,{children:[(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{value:n,onChange:e=>w(e.target.value),children:t.map(e=>(0,o.jsx)("option",{value:e.id,children:e.name},e.id))}),(0,o.jsxs)(h,{value:S,onChange:e=>z(e.target.value),children:[(0,o.jsx)("option",{value:"",children:"All Status"}),(0,o.jsx)("option",{value:"pending",children:"Pending"}),(0,o.jsx)("option",{value:"preparing",children:"Preparing"}),(0,o.jsx)("option",{value:"completed",children:"Completed"}),(0,o.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),E?(0,o.jsx)(y,{children:"Loading..."}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(u,{children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)(g,{children:"Order #"}),(0,o.jsx)(g,{children:"Amount"}),(0,o.jsx)(g,{children:"Type"}),(0,o.jsx)(g,{children:"Payment"}),(0,o.jsx)(g,{children:"Status"}),(0,o.jsx)(g,{children:"Date"})]})}),(0,o.jsxs)("tbody",{children:[A.map(e=>(0,o.jsxs)("tr",{children:[(0,o.jsx)(f,{style:{fontWeight:600},children:e.order_number||`#${e.id}`}),(0,o.jsxs)(f,{children:["RM ",Number(e.total_amount).toFixed(2)]}),(0,o.jsx)(f,{children:e.order_type||"-"}),(0,o.jsx)(f,{children:e.payment_method||"-"}),(0,o.jsx)(f,{children:(0,o.jsx)(j,{status:e.status,children:e.status})}),(0,o.jsx)(f,{children:new Date(e.createdAt).toLocaleDateString()})]},e.id)),0===A.length&&(0,o.jsx)("tr",{children:(0,o.jsx)(f,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"40px"},children:"No orders found"})})]})]}),B.totalPages>1&&(0,o.jsxs)(m,{children:[(0,o.jsxs)("span",{children:["Showing ",(B.page-1)*B.limit+1,"-",Math.min(B.page*B.limit,B.total)," of ",B.total]}),(0,o.jsxs)(F,{children:[(0,o.jsx)(b,{disabled:B.page<=1,onClick:()=>P(B.page-1),children:"Prev"}),Array.from({length:Math.min(B.totalPages,5)},(e,t)=>t+1).map(e=>(0,o.jsx)(b,{active:e===B.page,onClick:()=>P(e),children:e},e)),(0,o.jsx)(b,{disabled:B.page>=B.totalPages,onClick:()=>P(B.page+1),children:"Next"})]})]})]})]})]})})}}}]);