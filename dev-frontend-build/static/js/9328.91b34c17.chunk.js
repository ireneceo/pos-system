"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9328],{3705:(e,r,o)=>{o.d(r,{cc:()=>a.$n});var n=o(8819),t=o(4752),a=o(8829);t.Ay.select`
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
`,t.Ay.input`
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
`,t.Ay.div`
  background: ${n.w.colors.surface};
  border-radius: ${n.w.borderRadius.md};
  border: 1px solid ${n.w.colors.borderLight};
  padding: ${n.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${n.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${n.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${n.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},7617:(e,r,o)=>{o.d(r,{A:()=>h});var n=o(8819),t=(o(9950),o(4752)),a=o(9610),i=o(4414);const s=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,d=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${n.w.colors.border};
`,c=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,x=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,h=e=>{let{isOpen:r,title:o,message:n,onConfirm:t,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return r?(0,i.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,i.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{children:o}),(0,i.jsx)(l,{children:n})]}),(0,i.jsxs)(x,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,i.jsx)(p,{variant:"primary",type:m,onClick:t,children:u})]})]})}):null}},9328:(e,r,o)=>{o.r(r),o.d(r,{default:()=>F});var n=o(8819),t=o(9950),a=o(4752),i=o(2674),s=o(3705),d=o(7617),c=o(4414);const l=a.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,x=a.Ay.div`
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
`,p=a.Ay.div`
  padding: 32px;
  background: ${n.w.colors.background};
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${n.w.colors.secondary};
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=a.Ay.p`
  font-size: 16px;
  color: ${n.w.colors.text.muted};
  margin: 8px 0 0;
`,g=a.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${n.w.colors.border};
  margin-bottom: 24px;
`,m=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,y=a.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
  margin: 0;
`,v=a.Ay.div`
  display: flex;
  gap: 12px;
`,w=a.Ay.div`
  display: grid;
  gap: 16px;
`,b=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 12px;
  background: white;
  transition: all 0.2s;

  &:hover {
    border-color: ${n.w.colors.primary};
    transform: translateY(-1px);
  }
`,f=a.Ay.div`
  flex: 1;
`,j=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
  margin: 0 0 8px 0;
`,$=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  font-size: 14px;
  color: ${n.w.colors.text.muted};
`,A=a.Ay.div`
  display: flex;
  gap: 8px;
`,k=a.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>{switch(e.variant){case"edit":return"\n          background: #EBF8FF;\n          border-color: #2563EB;\n          color: #2563EB;\n          &:hover { background: #DBEAFE; }\n        ";case"delete":return`\n          background: ${n.w.colors.dangerLight};\n          border-color: ${n.w.colors.danger};\n          color: ${n.w.colors.danger};\n          &:hover { background: #FECACA; }\n        `;default:return`\n          background: ${n.w.colors.surfaceMuted};\n          border-color: ${n.w.colors.text.placeholder};\n          color: ${n.w.colors.text.dark};\n          &:hover { background: ${n.w.colors.borderLight}; }\n        `}}}
`,C=a.Ay.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"active":return"background: #DCFCE7; color: #166534;";case"maintenance":return"background: ${t.colors.status.warningLightAlt}; color: #92400E;";case"closed":return"background: ${t.colors.status.errorLightAlt}; color: #991B1B;";default:return"background: ${t.colors.surfaceMuted}; color: ${t.colors.text.dark};"}}}
`,F=()=>{const[e,r]=(0,t.useState)({totalFoodcourts:0,totalTenants:0,activeManagers:0,monthlyRevenue:0,avgOccupancyRate:0,totalRevenue:0}),[o,n]=(0,t.useState)([]),[a,F]=(0,t.useState)(!1),[E,R]=(0,t.useState)(!1),[z,T]=(0,t.useState)(null),[D,M]=(0,t.useState)(!1),[S,B]=(0,t.useState)({name:"",location:"",manager:""});(0,t.useEffect)(()=>{(async()=>{try{n([]),r({totalFoodcourts:0,totalTenants:0,activeManagers:0,monthlyRevenue:0,avgOccupancyRate:0,totalRevenue:0})}catch(e){console.error("Error fetching foodcourt data:",e)}})()},[]);const O=()=>{M(!1),T(null),B({name:"",location:"",manager:""}),F(!0)},L=e=>{switch(e){case"active":return"Active";case"maintenance":return"Maintenance";case"closed":return"Closed";default:return e}};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(l,{children:[(0,c.jsxs)(x,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(h,{children:"Foodcourt Management"}),(0,c.jsx)(u,{children:"Integrated management and operational optimization for entire foodcourt network"})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(s.cc,{variant:"outline",children:"Export Data"}),(0,c.jsx)(s.cc,{variant:"primary",onClick:O,children:"Add Foodcourt"})]})]}),(0,c.jsxs)(p,{children:[(0,c.jsxs)(i.MD,{children:[(0,c.jsxs)(i.hI,{children:[(0,c.jsx)(i.Os,{children:e.totalFoodcourts}),(0,c.jsx)(i.v0,{children:"Total Foodcourts"}),(0,c.jsx)(i.E_,{trend:"up",children:"+1 this month"})]}),(0,c.jsxs)(i.hI,{children:[(0,c.jsx)(i.Os,{children:e.totalTenants}),(0,c.jsx)(i.v0,{children:"Total Tenants"}),(0,c.jsx)(i.E_,{trend:"up",children:"+5 new tenants"})]}),(0,c.jsxs)(i.hI,{children:[(0,c.jsxs)(i.Os,{children:[e.avgOccupancyRate.toFixed(1),"%"]}),(0,c.jsx)(i.v0,{children:"Average Occupancy"}),(0,c.jsx)(i.E_,{trend:"up",children:"+2.5% vs last month"})]}),(0,c.jsxs)(i.hI,{children:[(0,c.jsxs)(i.Os,{children:["RM ",(e.monthlyRevenue/1e6).toFixed(0),"M"]}),(0,c.jsx)(i.v0,{children:"Total Monthly Revenue"}),(0,c.jsx)(i.E_,{trend:"up",children:"+12% vs last month"})]})]}),(0,c.jsxs)(g,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Foodcourt List"}),(0,c.jsx)(s.cc,{variant:"primary",onClick:O,children:"Add New Foodcourt"})]}),(0,c.jsx)(w,{children:o.map(e=>(0,c.jsxs)(b,{children:[(0,c.jsxs)(f,{children:[(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"},children:[(0,c.jsx)(j,{children:e.name}),(0,c.jsx)(C,{status:e.status,children:L(e.status)})]}),(0,c.jsxs)($,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:"Location:"})," ",e.location]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:"Manager:"})," ",e.manager]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:"Tenants:"})," ",e.tenantCount]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:"Occupancy:"})," ",e.occupancyRate,"%"]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:"Monthly Revenue:"})," RM ",(e.monthlyRevenue/1e6).toFixed(1),"M"]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:"Opening Date:"})," ",e.openDate]})]})]}),(0,c.jsxs)(A,{children:[(0,c.jsx)(k,{variant:"view",children:"View Details"}),(0,c.jsx)(k,{variant:"edit",onClick:()=>(e=>{M(!0),T(e),B({name:e.name,location:e.location,manager:e.manager}),F(!0)})(e),children:"Edit"}),(0,c.jsx)(k,{variant:"delete",onClick:()=>(e=>{T(e),R(!0)})(e),children:"Delete"})]})]},e.id))})]}),(0,c.jsx)(i.zf,{isOpen:a,onClose:()=>F(!1),title:D?"Edit Foodcourt":"Add New Foodcourt",children:(0,c.jsxs)("form",{onSubmit:e=>{if(e.preventDefault(),D&&z)n(e=>e.map(e=>e.id===z.id?{...e,...S}:e));else{const e={id:(o.length+1).toString(),...S,tenantCount:0,occupancyRate:0,monthlyRevenue:0,status:"active",openDate:(new Date).toISOString().split("T")[0]};n(r=>[...r,e])}F(!1)},children:[(0,c.jsxs)(i.gE,{children:[(0,c.jsx)(i.lR,{children:"Foodcourt Name"}),(0,c.jsx)(i.ZQ,{type:"text",value:S.name,onChange:e=>B(r=>({...r,name:e.target.value})),required:!0})]}),(0,c.jsxs)(i.gE,{children:[(0,c.jsx)(i.lR,{children:"Location"}),(0,c.jsx)(i.ZQ,{type:"text",value:S.location,onChange:e=>B(r=>({...r,location:e.target.value})),required:!0})]}),(0,c.jsxs)(i.gE,{children:[(0,c.jsx)(i.lR,{children:"Manager"}),(0,c.jsx)(i.ZQ,{type:"text",value:S.manager,onChange:e=>B(r=>({...r,manager:e.target.value})),required:!0})]}),(0,c.jsxs)("div",{style:{display:"flex",gap:"12px",marginTop:"24px"},children:[(0,c.jsx)(i.$n,{type:"button",variant:"secondary",onClick:()=>F(!1),children:"Cancel"}),(0,c.jsx)(i.$n,{type:"submit",children:D?"Update":"Add"})]})]})}),(0,c.jsx)(d.A,{isOpen:E,title:"Delete Foodcourt",message:`Are you sure you want to delete '${null===z||void 0===z?void 0:z.name}' foodcourt? This action cannot be undone.`,onConfirm:()=>{z&&n(e=>e.filter(e=>e.id!==z.id)),R(!1)},onCancel:()=>R(!1),confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})]})})}}}]);