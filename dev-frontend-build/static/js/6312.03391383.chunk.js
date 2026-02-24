"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6312],{6312:(e,n,i)=>{i.r(n),i.d(n,{default:()=>R});var r=i(9950),t=i(4752),s=i(3310),a=i(1367),d=i(2674),o=i(4414);const c=t.Ay.div`
  min-height: 100vh;
`,l=t.Ay.div`
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
    min-height: 56px;
  }
`,x=t.Ay.h1`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,h=t.Ay.div`
  padding: 24px 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`,p=t.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 32px 0 16px 0;
`,u=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`,g=t.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.1);
  }
`,j=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,f=t.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,y=t.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,m=t.Ay.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FFF7ED";case"inactive":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#EA580C";case"inactive":return"#DC2626";default:return"#6B7280"}}};
`,v=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,A=t.Ay.div``,b=t.Ay.div`
  font-size: 11px;
  color: #8898AA;
  margin-bottom: 2px;
`,F=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,w=t.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,R=()=>{const{user:e}=(0,a.As)(),[n,i]=(0,r.useState)(null),[t,R]=(0,r.useState)(!0);(0,r.useEffect)(()=>{k()},[]);const k=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/owner/dashboard",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&i(e.data)}}catch(e){console.error("Failed to load dashboard:",e)}finally{R(!1)}},z=(e,n)=>`${n||"RM"} ${Number(e).toFixed(2)}`;return(0,o.jsx)(s.A,{children:(0,o.jsxs)(c,{children:[(0,o.jsx)(l,{children:(0,o.jsx)(x,{children:"Owner Dashboard"})}),(0,o.jsx)(h,{children:t?(0,o.jsx)(w,{children:"Loading..."}):n?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(d.Ot,{children:[(0,o.jsxs)(d.XS,{children:[(0,o.jsx)(d.h2,{children:"My Restaurants"}),(0,o.jsx)(d.G$,{children:n.totalRestaurants})]}),(0,o.jsxs)(d.XS,{children:[(0,o.jsx)(d.h2,{children:"Today's Revenue"}),(0,o.jsx)(d.G$,{children:z(n.todayRevenue)})]}),(0,o.jsxs)(d.XS,{children:[(0,o.jsx)(d.h2,{children:"Monthly Revenue"}),(0,o.jsx)(d.G$,{children:z(n.monthRevenue)})]}),(0,o.jsxs)(d.XS,{children:[(0,o.jsx)(d.h2,{children:"Monthly Orders"}),(0,o.jsx)(d.G$,{children:n.totalOrders})]})]}),n.pendingInvoices>0&&(0,o.jsxs)("div",{style:{background:"#FFF7ED",border:"1px solid #FDBA74",borderRadius:"8px",padding:"12px 16px",marginTop:"16px",fontSize:"13px",color:"#9A3412"},children:["You have ",(0,o.jsx)("strong",{children:n.pendingInvoices})," pending invoice(s) awaiting payment."]}),(0,o.jsx)(p,{children:"Restaurant Performance"}),(0,o.jsx)(u,{children:n.restaurants.map(e=>(0,o.jsxs)(g,{children:[(0,o.jsxs)(j,{children:[(0,o.jsxs)("div",{children:[(0,o.jsx)(f,{children:e.name}),(0,o.jsx)(y,{children:e.admin_name||"No admin assigned"})]}),(0,o.jsx)(m,{status:e.status,children:e.status})]}),(0,o.jsxs)(v,{children:[(0,o.jsxs)(A,{children:[(0,o.jsx)(b,{children:"Today"}),(0,o.jsx)(F,{children:z(e.todayRevenue,e.currency)})]}),(0,o.jsxs)(A,{children:[(0,o.jsx)(b,{children:"This Month"}),(0,o.jsx)(F,{children:z(e.monthRevenue,e.currency)})]})]})]},e.id))})]}):(0,o.jsx)(w,{children:"No data available"})})]})})}}}]);