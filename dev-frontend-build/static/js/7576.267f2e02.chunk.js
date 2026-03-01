"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7576],{3705:(r,e,o)=>{o.d(e,{cc:()=>i.$n});var n=o(8819),s=o(4752),i=o(8829);s.Ay.select`
  padding: ${n.w.components.form.inputPadding};
  border: 1px solid ${n.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${n.w.typography.fontSize.sm};
  background: ${n.w.colors.surface};
  color: ${n.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: ${n.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${n.w.colors.borderHover};
  }
`,s.Ay.input`
  padding: ${n.w.components.form.inputPadding};
  border: 1px solid ${n.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${n.w.typography.fontSize.sm};
  background: ${n.w.colors.surface};
  color: ${n.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: ${n.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${n.w.colors.borderHover};
  }
`,s.Ay.div`
  background: ${n.w.colors.surface};
  border-radius: ${n.w.borderRadius.md};
  border: 1px solid ${n.w.colors.borderLight};
  padding: ${n.w.spacing.md};
  transition: all 0.2s ease;

  ${r=>r.accent&&`\n    border-color: ${n.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${n.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${n.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},7576:(r,e,o)=>{o.r(e),o.d(e,{default:()=>R});var n=o(8819),s=o(9950),i=o(4752),d=o(2674),t=o(3705),a=o(4414);const c=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${n.w.colors.border};
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
  background: ${n.w.colors.background};
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${n.w.colors.secondary};
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=i.Ay.p`
  font-size: 16px;
  color: ${n.w.colors.text.muted};
  margin: 8px 0 0;
`,u=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid ${n.w.colors.border};
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  align-items: end;
`,b=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,m=i.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: ${n.w.colors.text.dark};
`,w=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }
`,f=i.Ay.div`
  display: flex;
  gap: 12px;
`,j=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${n.w.colors.border};
  margin-bottom: 24px;
`,y=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
  margin: 0 0 24px 0;
`,v=i.Ay.div`
  height: 300px;
  border: 2px dashed ${n.w.colors.border};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${n.w.colors.text.muted};
  font-style: italic;
  font-size: 16px;
`,$=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${n.w.colors.border};
`,A=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,k=i.Ay.th`
  text-align: left;
  padding: 16px 12px;
  border-bottom: 2px solid ${n.w.colors.border};
  font-weight: 600;
  color: ${n.w.colors.text.dark};
  font-size: 14px;
`,z=i.Ay.tr`
  &:hover {
    background: #F9FAFB;
  }
`,F=i.Ay.td`
  padding: 16px 12px;
  border-bottom: 1px solid ${n.w.colors.surfaceMuted};
  font-size: 14px;
  color: ${n.w.colors.text.dark};
`,S=i.Ay.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${r=>{switch(r.level){case"excellent":return"background: #DCFCE7; color: #166534;";case"good":return"background: #DBEAFE; color: #1E40AF;";case"average":return"background: ${t.colors.status.warningLightAlt}; color: #92400E;";case"poor":return"background: ${t.colors.status.errorLightAlt}; color: #991B1B;";default:return"background: ${t.colors.surfaceMuted}; color: ${t.colors.text.dark};"}}}
`,R=()=>{const[r,e]=(0,s.useState)("month"),[o,n]=(0,s.useState)("all"),[i,R]=(0,s.useState)([]),[E,L]=(0,s.useState)([]);(0,s.useEffect)(()=>{R([]),L([])},[r,o]);const C=r=>{switch(r){case"excellent":return"Excellent";case"good":return"Good";case"average":return"Average";case"poor":return"Needs Improvement";default:return r}};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(c,{children:[(0,a.jsxs)(l,{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(p,{children:"Foodcourt Statistics & Analytics"}),(0,a.jsx)(h,{children:"Performance metrics and trend analysis for entire foodcourt network"})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(t.cc,{variant:"outline",children:"Export Report"}),(0,a.jsx)(t.cc,{variant:"primary",children:"Refresh Data"})]})]}),(0,a.jsxs)(x,{children:[(0,a.jsx)(u,{children:(0,a.jsxs)(g,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(m,{children:"Analysis Period"}),(0,a.jsxs)(w,{value:r,onChange:r=>e(r.target.value),children:[(0,a.jsx)("option",{value:"week",children:"This Week"}),(0,a.jsx)("option",{value:"month",children:"This Month"}),(0,a.jsx)("option",{value:"quarter",children:"Quarter"}),(0,a.jsx)("option",{value:"year",children:"This Year"})]})]}),(0,a.jsxs)(b,{children:[(0,a.jsx)(m,{children:"Location Selection"}),(0,a.jsxs)(w,{value:o,onChange:r=>n(r.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Locations"}),(0,a.jsx)("option",{value:"seoul",children:"Seoul"}),(0,a.jsx)("option",{value:"busan",children:"Busan"}),(0,a.jsx)("option",{value:"daegu",children:"Daegu"}),(0,a.jsx)("option",{value:"incheon",children:"Incheon"})]})]}),(0,a.jsxs)(b,{children:[(0,a.jsx)(m,{children:"\xa0"}),(0,a.jsx)(t.cc,{variant:"primary",children:"Apply Filters"})]})]})}),(0,a.jsx)(d.MD,{children:i.map((r,e)=>(0,a.jsxs)(d.hI,{children:[(0,a.jsx)(d.Os,{children:r.value}),(0,a.jsx)(d.v0,{children:r.label}),(0,a.jsxs)(d.E_,{trend:r.positive?"up":"down",children:[r.positive?"+":"",r.change]})]},e))}),(0,a.jsxs)(j,{children:[(0,a.jsx)(y,{children:"Monthly Revenue and Occupancy Trends"}),(0,a.jsxs)(v,{children:["\ud83d\udcca Revenue and Occupancy Trend Chart (Development Planned)",(0,a.jsx)("br",{}),"Data visualization using Chart.js or Recharts"]})]}),(0,a.jsxs)($,{children:[(0,a.jsx)(y,{children:"Performance Ranking by Foodcourt"}),(0,a.jsxs)(A,{children:[(0,a.jsx)("thead",{children:(0,a.jsxs)(z,{children:[(0,a.jsx)(k,{children:"Rank"}),(0,a.jsx)(k,{children:"Foodcourt Name"}),(0,a.jsx)(k,{children:"Monthly Revenue"}),(0,a.jsx)(k,{children:"Occupancy Rate"}),(0,a.jsx)(k,{children:"Satisfaction"}),(0,a.jsx)(k,{children:"Performance Grade"})]})}),(0,a.jsx)("tbody",{children:E.map((r,e)=>(0,a.jsxs)(z,{children:[(0,a.jsx)(F,{children:(0,a.jsxs)("strong",{children:["#",e+1]})}),(0,a.jsx)(F,{children:(0,a.jsx)("strong",{children:r.name})}),(0,a.jsxs)(F,{children:["RM ",(r.sales/1e6).toFixed(1),"M"]}),(0,a.jsxs)(F,{children:[r.occupancy,"%"]}),(0,a.jsxs)(F,{children:[r.satisfaction,"/5.0"]}),(0,a.jsx)(F,{children:(0,a.jsx)(S,{level:r.performance,children:C(r.performance)})})]},r.id))})]})]})]})]})})}}}]);