"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8348],{8348:(e,t,n)=>{n.r(t),n.d(t,{default:()=>y});var r=n(9950),i=n(4752),s=n(3310),a=n(1367),d=n(4414);const o=i.Ay.div`
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
`,x=i.Ay.div`
  padding: 24px 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`,h=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
`,p=i.Ay.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,u=i.Ay.td`
  padding: 12px 16px;
  font-size: 13px;
  color: #0A2540;
  border-bottom: 1px solid #F1F5F9;
`,f=i.Ay.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FFF7ED";case"inactive":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#EA580C";case"inactive":return"#DC2626";default:return"#6B7280"}}};
`,g=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,j=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
  font-size: 14px;
`,y=()=>{const{user:e}=(0,a.As)(),[t,n]=(0,r.useState)([]),[i,y]=(0,r.useState)(!0);(0,r.useEffect)(()=>{m()},[]);const m=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&n(e.data)}}catch(e){console.error("Failed to load restaurants:",e)}finally{y(!1)}};return(0,d.jsx)(s.A,{children:(0,d.jsxs)(o,{children:[(0,d.jsx)(c,{children:(0,d.jsx)(l,{children:"My Restaurants"})}),(0,d.jsx)(x,{children:i?(0,d.jsx)(g,{children:"Loading..."}):0===t.length?(0,d.jsx)(j,{children:"No restaurants linked to your account yet."}):(0,d.jsxs)(h,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)(p,{children:"Restaurant"}),(0,d.jsx)(p,{children:"Admin"}),(0,d.jsx)(p,{children:"Plan"}),(0,d.jsx)(p,{children:"Status"}),(0,d.jsx)(p,{children:"Contact"})]})}),(0,d.jsx)("tbody",{children:t.map(e=>{var t;return(0,d.jsxs)("tr",{children:[(0,d.jsx)(u,{style:{fontWeight:600},children:e.name}),(0,d.jsx)(u,{children:(null===(t=e.admin)||void 0===t?void 0:t.full_name)||e.admin_name||"-"}),(0,d.jsx)(u,{children:e.plan_type}),(0,d.jsx)(u,{children:(0,d.jsx)(f,{status:e.status,children:e.status})}),(0,d.jsx)(u,{children:e.email||e.phone||"-"})]},e.id)})})]})})]})})}}}]);