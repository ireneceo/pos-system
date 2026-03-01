"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2790],{2790:(e,n,r)=>{r.r(n),r.d(n,{default:()=>I});var i=r(9950),t=r(4752),o=r(7960),a=r(3705),s=r(4414);const d=t.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,c=t.Ay.div`
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
`,l=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=t.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,h=t.Ay.div`
  background: white;
  border-radius: 16px 16px 0 0;
  border: 1px solid #E6EBF1;
  border-bottom: none;
  margin-bottom: 0;
`,g=t.Ay.div`
  display: flex;
  gap: 0;
  padding: 0 24px;
`,u=t.Ay.button`
  padding: 16px 24px;
  border: none;
  background: ${e=>e.active?"#635BFF":"transparent"};
  color: ${e=>e.active?"white":"#6B7280"};
  border-radius: 12px 12px 0 0;
  font-weight: ${e=>e.active?"600":"500"};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  top: 1px;

  &:hover {
    background: ${e=>e.active?"#635BFF":"#F3F4F6"};
    color: ${e=>e.active?"white":"#374151"};
  }
`,m=t.Ay.div`
  background: white;
  border-radius: 0 16px 16px 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,f=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
`,b=t.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  background: white;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,v=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,j=t.Ay.p`
  color: #6B7280;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 20px 0;
`,y=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;

  li {
    color: #374151;
    font-size: 14px;
    margin-bottom: 8px;
    padding-left: 24px;
    position: relative;
    line-height: 1.5;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #635BFF;
      font-weight: 700;
      font-size: 16px;
    }
  }
`,F=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`,w=t.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,A=t.Ay.h4`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,S=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #F9FAFB;
  font-size: 14px;

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 12px;
  }
`,B=t.Ay.span`
  color: #6B7280;
  font-weight: 500;
`,E=t.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,k=t.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"excellent":return"background: #DCFCE7; color: #166534;";case"good":return"background: #DBEAFE; color: #1E40AF;";case"needs_improvement":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #374151;"}}}
`,C=t.Ay.div`
  padding: 20px 0;
`,z=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`,T=t.Ay.li`
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  color: #6B7280;
  line-height: 1.6;

  &:before {
    content: '•';
    color: #635BFF;
    font-weight: bold;
    font-size: 18px;
    position: absolute;
    left: 8px;
  }
`,O=t.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,M=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,P=t.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    transform: translateY(-1px);
  }
`,I=()=>{const[e,n]=(0,i.useState)("overview"),[r,t]=(0,i.useState)([]),[I,D]=(0,i.useState)({totalFranchises:0,excellentStores:0,needsSupport:0,avgSatisfaction:0,newFranchises:0});(0,i.useEffect)(()=>{(async()=>{try{t([]),D({totalFranchises:0,excellentStores:0,needsSupport:0,avgSatisfaction:0,newFranchises:0})}catch(e){console.error("Error fetching franchise data:",e)}})()},[]);const R=e=>{switch(e){case"excellent":return"Excellent";case"good":return"Good";case"needs_improvement":return"Needs Improvement";default:return e}};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(d,{children:[(0,s.jsxs)(c,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(p,{children:"Franchise Support"}),(0,s.jsx)(x,{children:"Comprehensive support system for successful brand franchise operations"})]}),(0,s.jsx)(a.cc,{variant:"outline",children:"Generate Support Report"})]}),(0,s.jsxs)(l,{children:[(0,s.jsxs)(o.MD,{children:[(0,s.jsxs)(o.hI,{children:[(0,s.jsx)(o.Os,{children:I.totalFranchises}),(0,s.jsx)(o.v0,{children:"Total Franchises"}),(0,s.jsx)(o.E_,{trend:"up",children:"All brand locations"})]}),(0,s.jsxs)(o.hI,{children:[(0,s.jsx)(o.Os,{children:I.excellentStores}),(0,s.jsx)(o.v0,{children:"Excellent Stores"}),(0,s.jsx)(o.E_,{trend:"up",children:"Top performing"})]}),(0,s.jsxs)(o.hI,{children:[(0,s.jsx)(o.Os,{children:I.needsSupport}),(0,s.jsx)(o.v0,{children:"Needs Support"}),(0,s.jsx)(o.E_,{trend:I.needsSupport>0?"down":"up",children:"Improvement required"})]}),(0,s.jsxs)(o.hI,{children:[(0,s.jsx)(o.Os,{children:I.avgSatisfaction.toFixed(1)}),(0,s.jsx)(o.v0,{children:"Average Satisfaction"}),(0,s.jsx)(o.E_,{trend:"up",children:"Out of 5.0"})]}),(0,s.jsxs)(o.hI,{children:[(0,s.jsx)(o.Os,{children:I.newFranchises}),(0,s.jsx)(o.v0,{children:"New Openings"}),(0,s.jsx)(o.E_,{trend:"up",children:"Recent expansion"})]})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"18px",fontWeight:"600"},children:"Quick Actions"}),(0,s.jsxs)(M,{children:[(0,s.jsx)(P,{children:"\ud83d\udccb New Franchise Application"}),(0,s.jsx)(P,{children:"\ud83d\udcca Performance Analysis Report"}),(0,s.jsx)(P,{children:"\ud83c\udf93 Training Schedule Management"}),(0,s.jsx)(P,{children:"\ud83d\udcb0 Settlement & Commission"}),(0,s.jsx)(P,{children:"\ud83d\udcde Emergency Support Request"}),(0,s.jsx)(P,{children:"\ud83d\udcc8 Marketing Campaign"})]})]}),(0,s.jsx)(h,{children:(0,s.jsxs)(g,{children:[(0,s.jsx)(u,{active:"overview"===e,onClick:()=>n("overview"),children:"Support Programs"}),(0,s.jsx)(u,{active:"franchises"===e,onClick:()=>n("franchises"),children:"Franchise Status"}),(0,s.jsx)(u,{active:"training"===e,onClick:()=>n("training"),children:"Training Management"})]})}),"overview"===e&&(0,s.jsx)(m,{children:(0,s.jsx)(f,{children:[{id:1,title:"New Franchise Opening Support",description:"Comprehensive support program for successful opening of new franchises, providing step-by-step consulting from location selection to opening.",features:["Professional location analysis and market research services","Interior design and construction support according to brand guidelines","Systematic initial staff training program operation","Opening marketing and promotional support for successful launch"]},{id:2,title:"Operational Efficiency Improvement Consulting",description:"Provides customized consulting services to increase sales and improve operational efficiency of existing franchises.",features:["Practical improvement solutions through precise sales analysis","Systematic cost reduction strategy development and implementation support","Service quality improvement through continuous staff training","Service improvement solutions for enhanced customer satisfaction"]},{id:3,title:"Marketing and Promotion Support",description:"Establishes and supports the implementation of customized marketing strategies considering the characteristics and regional features of each franchise.",features:["Regional customized marketing strategies reflecting market characteristics","Seasonal and event-specific promotion planning and execution support","Digital marketing utilizing social media and online platforms","Systematic customer management through CRM system implementation"]},{id:4,title:"Quality Management and Training System",description:"Systematic quality management and training program for maintaining brand value and providing consistent service quality.",features:["Brand standard maintenance through regular quality inspections","Systematic staff training for service standardization","Professional cooking methods and service training for new menu launches","Thorough hygiene management system establishment and operational support"]}].map(e=>(0,s.jsxs)(b,{children:[(0,s.jsx)(v,{children:e.title}),(0,s.jsx)(j,{children:e.description}),(0,s.jsx)(y,{children:e.features.map((e,n)=>(0,s.jsx)("li",{children:e},n))}),(0,s.jsx)(a.cc,{variant:"primary",children:"View Details"})]},e.id))})}),"franchises"===e&&(0,s.jsxs)(m,{children:[(0,s.jsx)("h3",{style:{marginBottom:"24px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Franchise Status"}),(0,s.jsx)(F,{children:r.map(e=>(0,s.jsxs)(w,{children:[(0,s.jsx)(A,{children:e.name}),(0,s.jsxs)(S,{children:[(0,s.jsx)(B,{children:"Owner"}),(0,s.jsx)(E,{children:e.owner})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(B,{children:"Location"}),(0,s.jsx)(E,{children:e.location})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(B,{children:"Contact"}),(0,s.jsx)(E,{children:e.phone})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(B,{children:"Opening Date"}),(0,s.jsx)(E,{children:e.openDate})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(B,{children:"Monthly Revenue"}),(0,s.jsxs)(E,{children:["RM ",(e.monthlyRevenue/1e6).toFixed(1),"M"]})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(B,{children:"Satisfaction"}),(0,s.jsxs)(E,{children:[e.satisfaction,"/5.0"]})]}),(0,s.jsx)("div",{style:{marginTop:"12px"},children:(0,s.jsx)(k,{status:e.status,children:R(e.status)})})]},e.id))})]}),"training"===e&&(0,s.jsxs)(m,{children:[(0,s.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Training Management System"}),(0,s.jsxs)(C,{children:[(0,s.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Provides systematic and comprehensive training programs for improving the professionalism of franchise staff and maintaining brand value."}),(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"24px",marginBottom:"32px"},children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h4",{style:{color:"#0A2540",fontSize:"18px",fontWeight:"600",marginBottom:"16px"},children:"\ud83d\udcda Training Programs"}),(0,s.jsxs)(z,{children:[(0,s.jsx)(T,{children:"New Employee Onboarding Training (2-week program)"}),(0,s.jsx)(T,{children:"Customer Service Quality Improvement Training"}),(0,s.jsx)(T,{children:"POS System and Digital Tools Usage"}),(0,s.jsx)(T,{children:"Food Hygiene and Safety Management Training"}),(0,s.jsx)(T,{children:"Brand Guidelines and Standard Service"}),(0,s.jsx)(T,{children:"Store Operation Efficiency Improvement Workshop"})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h4",{style:{color:"#0A2540",fontSize:"18px",fontWeight:"600",marginBottom:"16px"},children:"\ud83c\udfaf Training Methods"}),(0,s.jsxs)(z,{children:[(0,s.jsx)(T,{children:"Online Training Platform (24/7 access available)"}),(0,s.jsx)(T,{children:"Professional Instructor On-site Training"}),(0,s.jsx)(T,{children:"Headquarters Training Center Group Education"}),(0,s.jsx)(T,{children:"Monthly Regular Workshops and Seminars"}),(0,s.jsx)(T,{children:"Individual Guidance through Mentoring System"}),(0,s.jsx)(T,{children:"Practice-focused On-site Training Programs"})]})]})]}),(0,s.jsxs)("div",{style:{background:"#F9FAFB",padding:"20px",borderRadius:"12px",borderLeft:"4px solid #635BFF"},children:[(0,s.jsx)("h4",{style:{color:"#0A2540",fontSize:"16px",fontWeight:"600",marginBottom:"12px"},children:"\ud83d\udcca Training Performance Management"}),(0,s.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"14px",margin:0},children:"All training courses include performance evaluation along with certificate issuance, and continuous improvement is achieved through regular feedback. Training completion status and performance are monitored in real-time to contribute to strengthening each franchise's capabilities."})]})]})]})]})]})})}},3705:(e,n,r)=>{r.d(n,{cc:()=>t});var i=r(4752);const t=i.Ay.button`
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
`;i.Ay.select`
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
`,i.Ay.input`
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
`,i.Ay.div`
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
`}}]);