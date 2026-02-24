"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5940],{5940:(e,t,r)=>{r.r(t),r.d(t,{default:()=>w});var n=r(9950),i=r(4752),a=r(3310),s=r(1367),d=r(4414);const o=i.Ay.div`
  min-height: 100vh;
`,c=i.Ay.div`
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
`,l=i.Ay.h1`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,p=i.Ay.div`
  padding: 24px 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`,x=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,u=i.Ay.button`
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
`,h=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
`,g=i.Ay.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=i.Ay.td`
  padding: 12px 16px;
  font-size: 13px;
  color: #0A2540;
  border-bottom: 1px solid #F1F5F9;
`,m=i.Ay.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"paid":return"#ECFDF5";case"pending_payment":return"#FFF7ED";case"payment_submitted":return"#EFF6FF";case"overdue":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"paid":return"#059669";case"pending_payment":return"#EA580C";case"payment_submitted":return"#2563EB";case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,y=i.Ay.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: ${e=>{switch(e.type){case"system_admin":return"#EFF6FF";case"brand":return"#FFF1F2";case"foodcourt":return"#FFF7ED";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"system_admin":return"#2563EB";case"brand":return"#DC2626";case"foodcourt":return"#EA580C";default:return"#6B7280"}}};
`,f=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 12px 0;
  font-size: 13px;
  color: #6B7C93;
`,b=i.Ay.div`
  display: flex;
  gap: 4px;
`,j=i.Ay.button`
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
`,v=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,w=()=>{const{user:e}=(0,s.As)(),[t,r]=(0,n.useState)([]),[i,w]=(0,n.useState)({total:0,page:1,limit:20,totalPages:0}),[A,B]=(0,n.useState)(!0),[C,k]=(0,n.useState)("");(0,n.useEffect)(()=>{E(1)},[C]);const E=async e=>{B(!0);try{const t=localStorage.getItem("auth_token"),n=new URLSearchParams({page:e.toString(),limit:"20"});C&&n.append("status",C);const i=await fetch(`/api/owner/invoices?${n}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();e.success&&(r(e.data),w(e.pagination))}}catch(t){console.error("Failed to load invoices:",t)}finally{B(!1)}},_=e=>{switch(e){case"system_admin":return"System";case"brand":return"Brand";case"foodcourt":return"Foodcourt";default:return e}};return(0,d.jsx)(a.A,{children:(0,d.jsxs)(o,{children:[(0,d.jsx)(c,{children:(0,d.jsx)(l,{children:"Invoices"})}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(u,{active:""===C,onClick:()=>k(""),children:"All"}),(0,d.jsx)(u,{active:"pending_payment"===C,onClick:()=>k("pending_payment"),children:"Pending"}),(0,d.jsx)(u,{active:"payment_submitted"===C,onClick:()=>k("payment_submitted"),children:"Submitted"}),(0,d.jsx)(u,{active:"paid"===C,onClick:()=>k("paid"),children:"Paid"}),(0,d.jsx)(u,{active:"overdue"===C,onClick:()=>k("overdue"),children:"Overdue"})]}),A?(0,d.jsx)(v,{children:"Loading..."}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)(g,{children:"Invoice #"}),(0,d.jsx)(g,{children:"Restaurant"}),(0,d.jsx)(g,{children:"Category"}),(0,d.jsx)(g,{children:"Issuer"}),(0,d.jsx)(g,{children:"Amount"}),(0,d.jsx)(g,{children:"Status"}),(0,d.jsx)(g,{children:"Due Date"})]})}),(0,d.jsxs)("tbody",{children:[t.map(e=>{var t,r,n;return(0,d.jsxs)("tr",{children:[(0,d.jsx)(F,{style:{fontWeight:600},children:e.invoice_number}),(0,d.jsx)(F,{children:(null===(t=e.restaurant)||void 0===t?void 0:t.name)||"-"}),(0,d.jsx)(F,{children:e.category_display_name||"-"}),(0,d.jsx)(F,{children:(0,d.jsx)(y,{type:e.issuer_type,children:_(e.issuer_type)})}),(0,d.jsxs)(F,{style:{fontWeight:600},children:["RM ",Number(e.total_amount).toFixed(2)]}),(0,d.jsx)(F,{children:(0,d.jsx)(m,{status:e.status,children:(n=e.status,n.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()))})}),(0,d.jsx)(F,{children:(r=e.due_date,new Date(r).toLocaleDateString())})]},e.id)}),0===t.length&&(0,d.jsx)("tr",{children:(0,d.jsx)(F,{colSpan:7,style:{textAlign:"center",color:"#6B7C93",padding:"40px"},children:"No invoices found"})})]})]}),i.totalPages>1&&(0,d.jsxs)(f,{children:[(0,d.jsxs)("span",{children:["Showing ",(i.page-1)*i.limit+1,"-",Math.min(i.page*i.limit,i.total)," of ",i.total]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{disabled:i.page<=1,onClick:()=>E(i.page-1),children:"Prev"}),Array.from({length:Math.min(i.totalPages,5)},(e,t)=>t+1).map(e=>(0,d.jsx)(j,{active:e===i.page,onClick:()=>E(e),children:e},e)),(0,d.jsx)(j,{disabled:i.page>=i.totalPages,onClick:()=>E(i.page+1),children:"Next"})]})]})]})]})]})})}}}]);