"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7576],{3705:(e,r,n)=>{n.d(r,{cc:()=>i});var o=n(4752);const i=o.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,o.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,o.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},7576:(e,r,n)=>{n.r(r),n.d(r,{default:()=>z});var o=n(9950),i=n(4752),a=n(3310),t=n(2674),d=n(3705),s=n(4414);const c=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=i.Ay.div`
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
`,x=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=i.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,u=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #E6EBF1;
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  align-items: end;
`,b=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,f=i.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,j=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,m=i.Ay.div`
  display: flex;
  gap: 12px;
`,v=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,y=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
`,F=i.Ay.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
  font-size: 16px;
`,w=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,A=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,E=i.Ay.th`
  text-align: left;
  padding: 16px 12px;
  border-bottom: 2px solid #E6EBF1;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`,k=i.Ay.tr`
  &:hover {
    background: #F9FAFB;
  }
`,B=i.Ay.td`
  padding: 16px 12px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  color: #374151;
`,C=i.Ay.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.level){case"excellent":return"background: #DCFCE7; color: #166534;";case"good":return"background: #DBEAFE; color: #1E40AF;";case"average":return"background: #FEF3C7; color: #92400E;";case"poor":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #374151;"}}}
`,z=()=>{const[e,r]=(0,o.useState)("month"),[n,i]=(0,o.useState)("all"),[z,D]=(0,o.useState)([]),[R,S]=(0,o.useState)([]);(0,o.useEffect)(()=>{D([]),S([])},[e,n]);const M=e=>{switch(e){case"excellent":return"Excellent";case"good":return"Good";case"average":return"Average";case"poor":return"Needs Improvement";default:return e}};return(0,s.jsx)(a.A,{children:(0,s.jsxs)(c,{children:[(0,s.jsxs)(l,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(p,{children:"Foodcourt Statistics & Analytics"}),(0,s.jsx)(h,{children:"Performance metrics and trend analysis for entire foodcourt network"})]}),(0,s.jsxs)(m,{children:[(0,s.jsx)(d.cc,{variant:"outline",children:"Export Report"}),(0,s.jsx)(d.cc,{variant:"primary",children:"Refresh Data"})]})]}),(0,s.jsxs)(x,{children:[(0,s.jsx)(u,{children:(0,s.jsxs)(g,{children:[(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:"Analysis Period"}),(0,s.jsxs)(j,{value:e,onChange:e=>r(e.target.value),children:[(0,s.jsx)("option",{value:"week",children:"This Week"}),(0,s.jsx)("option",{value:"month",children:"This Month"}),(0,s.jsx)("option",{value:"quarter",children:"Quarter"}),(0,s.jsx)("option",{value:"year",children:"This Year"})]})]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:"Location Selection"}),(0,s.jsxs)(j,{value:n,onChange:e=>i(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Locations"}),(0,s.jsx)("option",{value:"seoul",children:"Seoul"}),(0,s.jsx)("option",{value:"busan",children:"Busan"}),(0,s.jsx)("option",{value:"daegu",children:"Daegu"}),(0,s.jsx)("option",{value:"incheon",children:"Incheon"})]})]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:"\xa0"}),(0,s.jsx)(d.cc,{variant:"primary",children:"Apply Filters"})]})]})}),(0,s.jsx)(t.MD,{children:z.map((e,r)=>(0,s.jsxs)(t.hI,{children:[(0,s.jsx)(t.Os,{children:e.value}),(0,s.jsx)(t.v0,{children:e.label}),(0,s.jsxs)(t.E_,{trend:e.positive?"up":"down",children:[e.positive?"+":"",e.change]})]},r))}),(0,s.jsxs)(v,{children:[(0,s.jsx)(y,{children:"Monthly Revenue and Occupancy Trends"}),(0,s.jsxs)(F,{children:["\ud83d\udcca Revenue and Occupancy Trend Chart (Development Planned)",(0,s.jsx)("br",{}),"Data visualization using Chart.js or Recharts"]})]}),(0,s.jsxs)(w,{children:[(0,s.jsx)(y,{children:"Performance Ranking by Foodcourt"}),(0,s.jsxs)(A,{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)(k,{children:[(0,s.jsx)(E,{children:"Rank"}),(0,s.jsx)(E,{children:"Foodcourt Name"}),(0,s.jsx)(E,{children:"Monthly Revenue"}),(0,s.jsx)(E,{children:"Occupancy Rate"}),(0,s.jsx)(E,{children:"Satisfaction"}),(0,s.jsx)(E,{children:"Performance Grade"})]})}),(0,s.jsx)("tbody",{children:R.map((e,r)=>(0,s.jsxs)(k,{children:[(0,s.jsx)(B,{children:(0,s.jsxs)("strong",{children:["#",r+1]})}),(0,s.jsx)(B,{children:(0,s.jsx)("strong",{children:e.name})}),(0,s.jsxs)(B,{children:["RM ",(e.sales/1e6).toFixed(1),"M"]}),(0,s.jsxs)(B,{children:[e.occupancy,"%"]}),(0,s.jsxs)(B,{children:[e.satisfaction,"/5.0"]}),(0,s.jsx)(B,{children:(0,s.jsx)(C,{level:e.performance,children:M(e.performance)})})]},e.id))})]})]})]})]})})}}}]);