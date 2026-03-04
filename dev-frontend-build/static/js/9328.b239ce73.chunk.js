"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9328],{3705:(e,n,r)=>{r.d(n,{cc:()=>o});var t=r(4752);const o=t.Ay.button`
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
`;t.Ay.select`
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
`,t.Ay.input`
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
`,t.Ay.div`
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
`},7617:(e,n,r)=>{r.d(n,{A:()=>p});r(9950);var t=r(4752),o=r(9610),a=r(4414);const i=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,d=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,s=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,l=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=t.Ay.button`
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
`,p=e=>{let{isOpen:n,title:r,message:t,onConfirm:p,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return n?(0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(i,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(s,{children:r}),(0,a.jsx)(c,{children:t})]}),(0,a.jsxs)(l,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:h,children:g}),(0,a.jsx)(x,{variant:"primary",type:m,onClick:p,children:u})]})]})}):null}},9328:(e,n,r)=>{r.r(n),r.d(n,{default:()=>E});var t=r(9950),o=r(4752),a=r(8409),i=r(3705),d=r(7617),s=r(4414);const c=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=o.Ay.div`
  position: sticky;
  top: 0;
  z-index: 100;
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
`,x=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=o.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,u=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,g=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,m=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,b=o.Ay.div`
  display: flex;
  gap: 12px;
`,v=o.Ay.div`
  display: grid;
  gap: 16px;
`,y=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  background: white;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-1px);
  }
`,f=o.Ay.div`
  flex: 1;
`,j=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,F=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  font-size: 14px;
  color: #6B7280;
`,w=o.Ay.div`
  display: flex;
  gap: 8px;
`,A=o.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>{switch(e.variant){case"edit":return"\n          background: #EBF8FF;\n          border-color: #2563EB;\n          color: #2563EB;\n          &:hover { background: #DBEAFE; }\n        ";case"delete":return"\n          background: #FEF2F2;\n          border-color: #DC2626;\n          color: #DC2626;\n          &:hover { background: #FECACA; }\n        ";default:return"\n          background: #F3F4F6;\n          border-color: #9CA3AF;\n          color: #374151;\n          &:hover { background: #E5E7EB; }\n        "}}}
`,C=o.Ay.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"active":return"background: #DCFCE7; color: #166534;";case"maintenance":return"background: #FEF3C7; color: #92400E;";case"closed":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #374151;"}}}
`,E=()=>{const[e,n]=(0,t.useState)({totalFoodcourts:0,totalTenants:0,activeManagers:0,monthlyRevenue:0,avgOccupancyRate:0,totalRevenue:0}),[r,o]=(0,t.useState)([]),[E,k]=(0,t.useState)(!1),[B,D]=(0,t.useState)(!1),[z,R]=(0,t.useState)(null),[T,O]=(0,t.useState)(!1),[$,M]=(0,t.useState)({name:"",location:"",manager:""});(0,t.useEffect)(()=>{(async()=>{try{o([]),n({totalFoodcourts:0,totalTenants:0,activeManagers:0,monthlyRevenue:0,avgOccupancyRate:0,totalRevenue:0})}catch(e){console.error("Error fetching foodcourt data:",e)}})()},[]);const S=()=>{O(!1),R(null),M({name:"",location:"",manager:""}),k(!0)},I=e=>{switch(e){case"active":return"Active";case"maintenance":return"Maintenance";case"closed":return"Closed";default:return e}};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(c,{children:[(0,s.jsxs)(l,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(p,{children:"Foodcourt Management"}),(0,s.jsx)(h,{children:"Integrated management and operational optimization for entire foodcourt network"})]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(i.cc,{variant:"outline",children:"Export Data"}),(0,s.jsx)(i.cc,{variant:"primary",onClick:S,children:"Add Foodcourt"})]})]}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(a.MD,{children:[(0,s.jsxs)(a.hI,{children:[(0,s.jsx)(a.Os,{children:e.totalFoodcourts}),(0,s.jsx)(a.v0,{children:"Total Foodcourts"}),(0,s.jsx)(a.E_,{trend:"up",children:"+1 this month"})]}),(0,s.jsxs)(a.hI,{children:[(0,s.jsx)(a.Os,{children:e.totalTenants}),(0,s.jsx)(a.v0,{children:"Total Tenants"}),(0,s.jsx)(a.E_,{trend:"up",children:"+5 new tenants"})]}),(0,s.jsxs)(a.hI,{children:[(0,s.jsxs)(a.Os,{children:[e.avgOccupancyRate.toFixed(1),"%"]}),(0,s.jsx)(a.v0,{children:"Average Occupancy"}),(0,s.jsx)(a.E_,{trend:"up",children:"+2.5% vs last month"})]}),(0,s.jsxs)(a.hI,{children:[(0,s.jsxs)(a.Os,{children:["RM ",(e.monthlyRevenue/1e6).toFixed(0),"M"]}),(0,s.jsx)(a.v0,{children:"Total Monthly Revenue"}),(0,s.jsx)(a.E_,{trend:"up",children:"+12% vs last month"})]})]}),(0,s.jsxs)(u,{children:[(0,s.jsxs)(g,{children:[(0,s.jsx)(m,{children:"Foodcourt List"}),(0,s.jsx)(i.cc,{variant:"primary",onClick:S,children:"Add New Foodcourt"})]}),(0,s.jsx)(v,{children:r.map(e=>(0,s.jsxs)(y,{children:[(0,s.jsxs)(f,{children:[(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"},children:[(0,s.jsx)(j,{children:e.name}),(0,s.jsx)(C,{status:e.status,children:I(e.status)})]}),(0,s.jsxs)(F,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:"Location:"})," ",e.location]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:"Manager:"})," ",e.manager]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:"Tenants:"})," ",e.tenantCount]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:"Occupancy:"})," ",e.occupancyRate,"%"]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:"Monthly Revenue:"})," RM ",(e.monthlyRevenue/1e6).toFixed(1),"M"]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:"Opening Date:"})," ",e.openDate]})]})]}),(0,s.jsxs)(w,{children:[(0,s.jsx)(A,{variant:"view",children:"View Details"}),(0,s.jsx)(A,{variant:"edit",onClick:()=>(e=>{O(!0),R(e),M({name:e.name,location:e.location,manager:e.manager}),k(!0)})(e),children:"Edit"}),(0,s.jsx)(A,{variant:"delete",onClick:()=>(e=>{R(e),D(!0)})(e),children:"Delete"})]})]},e.id))})]}),(0,s.jsx)(a.zf,{isOpen:E,onClose:()=>k(!1),title:T?"Edit Foodcourt":"Add New Foodcourt",children:(0,s.jsxs)("form",{onSubmit:e=>{if(e.preventDefault(),T&&z)o(e=>e.map(e=>e.id===z.id?{...e,...$}:e));else{const e={id:(r.length+1).toString(),...$,tenantCount:0,occupancyRate:0,monthlyRevenue:0,status:"active",openDate:(new Date).toISOString().split("T")[0]};o(n=>[...n,e])}k(!1)},children:[(0,s.jsxs)(a.gE,{children:[(0,s.jsx)(a.lR,{children:"Foodcourt Name"}),(0,s.jsx)(a.ZQ,{type:"text",value:$.name,onChange:e=>M(n=>({...n,name:e.target.value})),required:!0})]}),(0,s.jsxs)(a.gE,{children:[(0,s.jsx)(a.lR,{children:"Location"}),(0,s.jsx)(a.ZQ,{type:"text",value:$.location,onChange:e=>M(n=>({...n,location:e.target.value})),required:!0})]}),(0,s.jsxs)(a.gE,{children:[(0,s.jsx)(a.lR,{children:"Manager"}),(0,s.jsx)(a.ZQ,{type:"text",value:$.manager,onChange:e=>M(n=>({...n,manager:e.target.value})),required:!0})]}),(0,s.jsxs)("div",{style:{display:"flex",gap:"12px",marginTop:"24px"},children:[(0,s.jsx)(a.$n,{type:"button",variant:"secondary",onClick:()=>k(!1),children:"Cancel"}),(0,s.jsx)(a.$n,{type:"submit",children:T?"Update":"Add"})]})]})}),(0,s.jsx)(d.A,{isOpen:B,title:"Delete Foodcourt",message:`Are you sure you want to delete '${null===z||void 0===z?void 0:z.name}' foodcourt? This action cannot be undone.`,onConfirm:()=>{z&&o(e=>e.filter(e=>e.id!==z.id)),D(!1)},onCancel:()=>D(!1),confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})]})})}}}]);