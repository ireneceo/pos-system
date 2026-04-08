"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4293],{4293:(e,r,a)=>{a.r(r),a.d(r,{default:()=>g});a(9950);var n=a(4752),t=a(1367),s=a(5030),o=a(4414);const i=n.Ay.div`
  padding: 32px;
  background: #F8FAFC;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,d=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  border: 1px solid #E6EBF1;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`,l=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,c=n.Ay.p`
  font-size: 18px;
  color: #6B7280;
  margin-bottom: 32px;
`,u=n.Ay.div`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  background: ${e=>{switch(e.role){case"System Admin":return"#EDE9FE";case"Manager":return"#DBEAFE";case"Restaurant Admin":return"#ECFDF5";case"Staff":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":return"#5B21B6";case"Manager":return"#1E40AF";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,h=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 32px;
`,p=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid #635BFF;
  transition: all 0.2s;
  text-align: left;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,x=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,m=n.Ay.p`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
`,g=()=>{const{t:e}=(0,s.Bd)("dashboard"),{user:r}=(0,t.As)();return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(i,{children:(0,o.jsxs)(d,{children:[(0,o.jsx)(l,{children:e("dashboard:basicDashboard.welcomeToPurpleHerePos")}),(0,o.jsx)(u,{role:(null===r||void 0===r?void 0:r.role)||"User",children:null===r||void 0===r?void 0:r.role}),(0,o.jsxs)(c,{children:["Hello, ",null===r||void 0===r?void 0:r.name,"!"]}),(0,o.jsxs)(h,{children:[(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{children:e("dashboard:basicDashboard.yourRole")}),(0,o.jsx)(m,{children:(e=>{switch(e){case"System Admin":return"You have full system access and can manage all managers, restaurants, and system settings.";case"Manager":return"You can manage multiple restaurants, view consolidated reports, and oversee operations.";case"Restaurant Admin":return"You can manage your restaurant, staff, menu, and access all POS functions.";case"Staff":return"You have access to POS terminal, kitchen display, and order management functions.";default:return"Welcome to the Purple Here POS System."}})((null===r||void 0===r?void 0:r.role)||"")})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{children:e("dashboard:basicDashboard.systemStatus")}),(0,o.jsx)(m,{children:"All systems operational. You can access your permitted functions through the sidebar menu."})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{children:e("dashboard:basicDashboard.gettingStarted")}),(0,o.jsx)(m,{children:"Use the navigation menu on the left to access available features for your role."})]})]})]})})})}}}]);