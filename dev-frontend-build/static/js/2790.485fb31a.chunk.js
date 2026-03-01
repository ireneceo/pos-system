"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2790],{2597:(e,n,r)=>{r.d(n,{Ex:()=>l,oz:()=>d,tU:()=>c});r(9950);var i=r(4752),t=r(4414);const o=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,a=i.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,s=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,c=e=>{let{children:n,className:r,style:i}=e;return(0,t.jsx)(o,{className:r,style:i,children:n})},d=e=>{let{active:n,onClick:r,children:i,className:o}=e;return(0,t.jsx)(a,{active:n,onClick:r,className:o,children:i})},l=e=>{let{count:n,variant:r="default",showZero:i=!1}=e;return 0!==n||i?(0,t.jsx)(s,{variant:r,children:n}):null}},2653:(e,n,r)=>{r.d(n,{M:()=>o});var i=r(9950),t=r(4492);function o(e){const[n,r]=(0,t.ok)(),o=(0,i.useCallback)(()=>n.get("tab")||e,[n,e]),[a,s]=(0,i.useState)(o());return[a,(0,i.useCallback)(e=>{s(e),r({tab:e})},[r])]}},2790:(e,n,r)=>{r.r(n),r.d(n,{default:()=>P});var i=r(9950),t=r(4752),o=r(6649),a=r(3705),s=r(2597),c=r(2653),d=r(4414);const l=t.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=t.Ay.div`
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
`,x=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=t.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,u=t.Ay.div`
  background: white;
  border-radius: 0 16px 16px 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,m=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
`,f=t.Ay.div`
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
`,b=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,v=t.Ay.p`
  color: #6B7280;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 20px 0;
`,j=t.Ay.ul`
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
`,y=t.Ay.div`
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
`,F=t.Ay.h4`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,A=t.Ay.div`
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
`,k=t.Ay.span`
  color: #6B7280;
  font-weight: 500;
`,B=t.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,E=t.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"excellent":return"background: #DCFCE7; color: #166534;";case"good":return"background: #DBEAFE; color: #1E40AF;";case"needs_improvement":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #374151;"}}}
`,S=t.Ay.div`
  padding: 20px 0;
`,C=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`,z=t.Ay.li`
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
`,T=t.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,M=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,O=t.Ay.button`
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
`,P=()=>{const[e,n]=(0,c.M)("overview"),[r,t]=(0,i.useState)([]),[P,D]=(0,i.useState)({totalFranchises:0,excellentStores:0,needsSupport:0,avgSatisfaction:0,newFranchises:0});(0,i.useEffect)(()=>{(async()=>{try{t([]),D({totalFranchises:0,excellentStores:0,needsSupport:0,avgSatisfaction:0,newFranchises:0})}catch(e){console.error("Error fetching franchise data:",e)}})()},[]);const I=e=>{switch(e){case"excellent":return"Excellent";case"good":return"Good";case"needs_improvement":return"Needs Improvement";default:return e}};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(l,{children:[(0,d.jsxs)(p,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(h,{children:"Franchise Support"}),(0,d.jsx)(g,{children:"Comprehensive support system for successful brand franchise operations"})]}),(0,d.jsx)(a.cc,{variant:"outline",children:"Generate Support Report"})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(o.MD,{children:[(0,d.jsxs)(o.hI,{children:[(0,d.jsx)(o.Os,{children:P.totalFranchises}),(0,d.jsx)(o.v0,{children:"Total Franchises"}),(0,d.jsx)(o.E_,{trend:"up",children:"All brand locations"})]}),(0,d.jsxs)(o.hI,{children:[(0,d.jsx)(o.Os,{children:P.excellentStores}),(0,d.jsx)(o.v0,{children:"Excellent Stores"}),(0,d.jsx)(o.E_,{trend:"up",children:"Top performing"})]}),(0,d.jsxs)(o.hI,{children:[(0,d.jsx)(o.Os,{children:P.needsSupport}),(0,d.jsx)(o.v0,{children:"Needs Support"}),(0,d.jsx)(o.E_,{trend:P.needsSupport>0?"down":"up",children:"Improvement required"})]}),(0,d.jsxs)(o.hI,{children:[(0,d.jsx)(o.Os,{children:P.avgSatisfaction.toFixed(1)}),(0,d.jsx)(o.v0,{children:"Average Satisfaction"}),(0,d.jsx)(o.E_,{trend:"up",children:"Out of 5.0"})]}),(0,d.jsxs)(o.hI,{children:[(0,d.jsx)(o.Os,{children:P.newFranchises}),(0,d.jsx)(o.v0,{children:"New Openings"}),(0,d.jsx)(o.E_,{trend:"up",children:"Recent expansion"})]})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"18px",fontWeight:"600"},children:"Quick Actions"}),(0,d.jsxs)(M,{children:[(0,d.jsx)(O,{children:"\ud83d\udccb New Franchise Application"}),(0,d.jsx)(O,{children:"\ud83d\udcca Performance Analysis Report"}),(0,d.jsx)(O,{children:"\ud83c\udf93 Training Schedule Management"}),(0,d.jsx)(O,{children:"\ud83d\udcb0 Settlement & Commission"}),(0,d.jsx)(O,{children:"\ud83d\udcde Emergency Support Request"}),(0,d.jsx)(O,{children:"\ud83d\udcc8 Marketing Campaign"})]})]}),(0,d.jsxs)(s.tU,{children:[(0,d.jsx)(s.oz,{active:"overview"===e,onClick:()=>n("overview"),children:"Support Programs"}),(0,d.jsx)(s.oz,{active:"franchises"===e,onClick:()=>n("franchises"),children:"Franchise Status"}),(0,d.jsx)(s.oz,{active:"training"===e,onClick:()=>n("training"),children:"Training Management"})]}),"overview"===e&&(0,d.jsx)(u,{children:(0,d.jsx)(m,{children:[{id:1,title:"New Franchise Opening Support",description:"Comprehensive support program for successful opening of new franchises, providing step-by-step consulting from location selection to opening.",features:["Professional location analysis and market research services","Interior design and construction support according to brand guidelines","Systematic initial staff training program operation","Opening marketing and promotional support for successful launch"]},{id:2,title:"Operational Efficiency Improvement Consulting",description:"Provides customized consulting services to increase sales and improve operational efficiency of existing franchises.",features:["Practical improvement solutions through precise sales analysis","Systematic cost reduction strategy development and implementation support","Service quality improvement through continuous staff training","Service improvement solutions for enhanced customer satisfaction"]},{id:3,title:"Marketing and Promotion Support",description:"Establishes and supports the implementation of customized marketing strategies considering the characteristics and regional features of each franchise.",features:["Regional customized marketing strategies reflecting market characteristics","Seasonal and event-specific promotion planning and execution support","Digital marketing utilizing social media and online platforms","Systematic customer management through CRM system implementation"]},{id:4,title:"Quality Management and Training System",description:"Systematic quality management and training program for maintaining brand value and providing consistent service quality.",features:["Brand standard maintenance through regular quality inspections","Systematic staff training for service standardization","Professional cooking methods and service training for new menu launches","Thorough hygiene management system establishment and operational support"]}].map(e=>(0,d.jsxs)(f,{children:[(0,d.jsx)(b,{children:e.title}),(0,d.jsx)(v,{children:e.description}),(0,d.jsx)(j,{children:e.features.map((e,n)=>(0,d.jsx)("li",{children:e},n))}),(0,d.jsx)(a.cc,{variant:"primary",children:"View Details"})]},e.id))})}),"franchises"===e&&(0,d.jsxs)(u,{children:[(0,d.jsx)("h3",{style:{marginBottom:"24px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Franchise Status"}),(0,d.jsx)(y,{children:r.map(e=>(0,d.jsxs)(w,{children:[(0,d.jsx)(F,{children:e.name}),(0,d.jsxs)(A,{children:[(0,d.jsx)(k,{children:"Owner"}),(0,d.jsx)(B,{children:e.owner})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(k,{children:"Location"}),(0,d.jsx)(B,{children:e.location})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(k,{children:"Contact"}),(0,d.jsx)(B,{children:e.phone})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(k,{children:"Opening Date"}),(0,d.jsx)(B,{children:e.openDate})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(k,{children:"Monthly Revenue"}),(0,d.jsxs)(B,{children:["RM ",(e.monthlyRevenue/1e6).toFixed(1),"M"]})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(k,{children:"Satisfaction"}),(0,d.jsxs)(B,{children:[e.satisfaction,"/5.0"]})]}),(0,d.jsx)("div",{style:{marginTop:"12px"},children:(0,d.jsx)(E,{status:e.status,children:I(e.status)})})]},e.id))})]}),"training"===e&&(0,d.jsxs)(u,{children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Training Management System"}),(0,d.jsxs)(S,{children:[(0,d.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Provides systematic and comprehensive training programs for improving the professionalism of franchise staff and maintaining brand value."}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"24px",marginBottom:"32px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{style:{color:"#0A2540",fontSize:"18px",fontWeight:"600",marginBottom:"16px"},children:"\ud83d\udcda Training Programs"}),(0,d.jsxs)(C,{children:[(0,d.jsx)(z,{children:"New Employee Onboarding Training (2-week program)"}),(0,d.jsx)(z,{children:"Customer Service Quality Improvement Training"}),(0,d.jsx)(z,{children:"POS System and Digital Tools Usage"}),(0,d.jsx)(z,{children:"Food Hygiene and Safety Management Training"}),(0,d.jsx)(z,{children:"Brand Guidelines and Standard Service"}),(0,d.jsx)(z,{children:"Store Operation Efficiency Improvement Workshop"})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{style:{color:"#0A2540",fontSize:"18px",fontWeight:"600",marginBottom:"16px"},children:"\ud83c\udfaf Training Methods"}),(0,d.jsxs)(C,{children:[(0,d.jsx)(z,{children:"Online Training Platform (24/7 access available)"}),(0,d.jsx)(z,{children:"Professional Instructor On-site Training"}),(0,d.jsx)(z,{children:"Headquarters Training Center Group Education"}),(0,d.jsx)(z,{children:"Monthly Regular Workshops and Seminars"}),(0,d.jsx)(z,{children:"Individual Guidance through Mentoring System"}),(0,d.jsx)(z,{children:"Practice-focused On-site Training Programs"})]})]})]}),(0,d.jsxs)("div",{style:{background:"#F9FAFB",padding:"20px",borderRadius:"12px",borderLeft:"4px solid #635BFF"},children:[(0,d.jsx)("h4",{style:{color:"#0A2540",fontSize:"16px",fontWeight:"600",marginBottom:"12px"},children:"\ud83d\udcca Training Performance Management"}),(0,d.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"14px",margin:0},children:"All training courses include performance evaluation along with certificate issuance, and continuous improvement is achieved through regular feedback. Training completion status and performance are monitored in real-time to contribute to strengthening each franchise's capabilities."})]})]})]})]})]})})}},3705:(e,n,r)=>{r.d(n,{cc:()=>t});var i=r(4752);const t=i.Ay.button`
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