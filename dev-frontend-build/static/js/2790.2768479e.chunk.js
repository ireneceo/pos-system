"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2790],{2790:(e,i,r)=>{r.r(i),r.d(i,{default:()=>I});var n=r(8819),o=r(9950),t=r(4752),s=r(2674),a=r(3705),d=r(4414);const c=t.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=t.Ay.div`
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
`,p=t.Ay.div`
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
`,x=t.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,g=t.Ay.div`
  background: white;
  border-radius: 16px 16px 0 0;
  border: 1px solid #E6EBF1;
  border-bottom: none;
  margin-bottom: 0;
`,m=t.Ay.div`
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
`,f=t.Ay.div`
  background: white;
  border-radius: 0 16px 16px 16px;
  padding: 32px;
  border: 1px solid ${n.w.colors.border};
  margin-bottom: 24px;
`,b=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
`,j=t.Ay.div`
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
`,y=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,v=t.Ay.p`
  color: #6B7280;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 20px 0;
`,w=t.Ay.ul`
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
      color: ${n.w.colors.primary};
      font-weight: 700;
      font-size: 16px;
    }
  }
`,S=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`,F=t.Ay.div`
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
  color: ${n.w.colors.secondary};
  margin: 0 0 12px 0;
`,k=t.Ay.div`
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
`,$=t.Ay.span`
  color: #6B7280;
  font-weight: 500;
`,B=t.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,z=t.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"excellent":return"background: #DCFCE7; color: #166534;";case"good":return"background: #DBEAFE; color: #1E40AF;";case"needs_improvement":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #374151;"}}}
`,E=t.Ay.div`
  padding: 20px 0;
`,T=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`,C=t.Ay.li`
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  color: #6B7280;
  line-height: 1.6;

  &:before {
    content: '•';
    color: ${n.w.colors.primary};
    font-weight: bold;
    font-size: 18px;
    position: absolute;
    left: 8px;
  }
`,O=t.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${n.w.colors.border};
  margin-bottom: 24px;
`,P=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,M=t.Ay.button`
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
    border-color: ${n.w.colors.primary};
    color: #635BFF;
    transform: translateY(-1px);
  }
`,I=()=>{const[e,i]=(0,o.useState)("overview"),[r,n]=(0,o.useState)([]),[t,I]=(0,o.useState)({totalFranchises:0,excellentStores:0,needsSupport:0,avgSatisfaction:0,newFranchises:0});(0,o.useEffect)(()=>{(async()=>{try{n([]),I({totalFranchises:0,excellentStores:0,needsSupport:0,avgSatisfaction:0,newFranchises:0})}catch(e){console.error("Error fetching franchise data:",e)}})()},[]);const R=e=>{switch(e){case"excellent":return"Excellent";case"good":return"Good";case"needs_improvement":return"Needs Improvement";default:return e}};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(l,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(h,{children:"Franchise Support"}),(0,d.jsx)(x,{children:"Comprehensive support system for successful brand franchise operations"})]}),(0,d.jsx)(a.cc,{variant:"outline",children:"Generate Support Report"})]}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(s.MD,{children:[(0,d.jsxs)(s.hI,{children:[(0,d.jsx)(s.Os,{children:t.totalFranchises}),(0,d.jsx)(s.v0,{children:"Total Franchises"}),(0,d.jsx)(s.E_,{trend:"up",children:"All brand locations"})]}),(0,d.jsxs)(s.hI,{children:[(0,d.jsx)(s.Os,{children:t.excellentStores}),(0,d.jsx)(s.v0,{children:"Excellent Stores"}),(0,d.jsx)(s.E_,{trend:"up",children:"Top performing"})]}),(0,d.jsxs)(s.hI,{children:[(0,d.jsx)(s.Os,{children:t.needsSupport}),(0,d.jsx)(s.v0,{children:"Needs Support"}),(0,d.jsx)(s.E_,{trend:t.needsSupport>0?"down":"up",children:"Improvement required"})]}),(0,d.jsxs)(s.hI,{children:[(0,d.jsx)(s.Os,{children:t.avgSatisfaction.toFixed(1)}),(0,d.jsx)(s.v0,{children:"Average Satisfaction"}),(0,d.jsx)(s.E_,{trend:"up",children:"Out of 5.0"})]}),(0,d.jsxs)(s.hI,{children:[(0,d.jsx)(s.Os,{children:t.newFranchises}),(0,d.jsx)(s.v0,{children:"New Openings"}),(0,d.jsx)(s.E_,{trend:"up",children:"Recent expansion"})]})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"18px",fontWeight:"600"},children:"Quick Actions"}),(0,d.jsxs)(P,{children:[(0,d.jsx)(M,{children:"\ud83d\udccb New Franchise Application"}),(0,d.jsx)(M,{children:"\ud83d\udcca Performance Analysis Report"}),(0,d.jsx)(M,{children:"\ud83c\udf93 Training Schedule Management"}),(0,d.jsx)(M,{children:"\ud83d\udcb0 Settlement & Commission"}),(0,d.jsx)(M,{children:"\ud83d\udcde Emergency Support Request"}),(0,d.jsx)(M,{children:"\ud83d\udcc8 Marketing Campaign"})]})]}),(0,d.jsx)(g,{children:(0,d.jsxs)(m,{children:[(0,d.jsx)(u,{active:"overview"===e,onClick:()=>i("overview"),children:"Support Programs"}),(0,d.jsx)(u,{active:"franchises"===e,onClick:()=>i("franchises"),children:"Franchise Status"}),(0,d.jsx)(u,{active:"training"===e,onClick:()=>i("training"),children:"Training Management"})]})}),"overview"===e&&(0,d.jsx)(f,{children:(0,d.jsx)(b,{children:[{id:1,title:"New Franchise Opening Support",description:"Comprehensive support program for successful opening of new franchises, providing step-by-step consulting from location selection to opening.",features:["Professional location analysis and market research services","Interior design and construction support according to brand guidelines","Systematic initial staff training program operation","Opening marketing and promotional support for successful launch"]},{id:2,title:"Operational Efficiency Improvement Consulting",description:"Provides customized consulting services to increase sales and improve operational efficiency of existing franchises.",features:["Practical improvement solutions through precise sales analysis","Systematic cost reduction strategy development and implementation support","Service quality improvement through continuous staff training","Service improvement solutions for enhanced customer satisfaction"]},{id:3,title:"Marketing and Promotion Support",description:"Establishes and supports the implementation of customized marketing strategies considering the characteristics and regional features of each franchise.",features:["Regional customized marketing strategies reflecting market characteristics","Seasonal and event-specific promotion planning and execution support","Digital marketing utilizing social media and online platforms","Systematic customer management through CRM system implementation"]},{id:4,title:"Quality Management and Training System",description:"Systematic quality management and training program for maintaining brand value and providing consistent service quality.",features:["Brand standard maintenance through regular quality inspections","Systematic staff training for service standardization","Professional cooking methods and service training for new menu launches","Thorough hygiene management system establishment and operational support"]}].map(e=>(0,d.jsxs)(j,{children:[(0,d.jsx)(y,{children:e.title}),(0,d.jsx)(v,{children:e.description}),(0,d.jsx)(w,{children:e.features.map((e,i)=>(0,d.jsx)("li",{children:e},i))}),(0,d.jsx)(a.cc,{variant:"primary",children:"View Details"})]},e.id))})}),"franchises"===e&&(0,d.jsxs)(f,{children:[(0,d.jsx)("h3",{style:{marginBottom:"24px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Franchise Status"}),(0,d.jsx)(S,{children:r.map(e=>(0,d.jsxs)(F,{children:[(0,d.jsx)(A,{children:e.name}),(0,d.jsxs)(k,{children:[(0,d.jsx)($,{children:"Owner"}),(0,d.jsx)(B,{children:e.owner})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)($,{children:"Location"}),(0,d.jsx)(B,{children:e.location})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)($,{children:"Contact"}),(0,d.jsx)(B,{children:e.phone})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)($,{children:"Opening Date"}),(0,d.jsx)(B,{children:e.openDate})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)($,{children:"Monthly Revenue"}),(0,d.jsxs)(B,{children:["RM ",(e.monthlyRevenue/1e6).toFixed(1),"M"]})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)($,{children:"Satisfaction"}),(0,d.jsxs)(B,{children:[e.satisfaction,"/5.0"]})]}),(0,d.jsx)("div",{style:{marginTop:"12px"},children:(0,d.jsx)(z,{status:e.status,children:R(e.status)})})]},e.id))})]}),"training"===e&&(0,d.jsxs)(f,{children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Training Management System"}),(0,d.jsxs)(E,{children:[(0,d.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Provides systematic and comprehensive training programs for improving the professionalism of franchise staff and maintaining brand value."}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"24px",marginBottom:"32px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{style:{color:"#0A2540",fontSize:"18px",fontWeight:"600",marginBottom:"16px"},children:"\ud83d\udcda Training Programs"}),(0,d.jsxs)(T,{children:[(0,d.jsx)(C,{children:"New Employee Onboarding Training (2-week program)"}),(0,d.jsx)(C,{children:"Customer Service Quality Improvement Training"}),(0,d.jsx)(C,{children:"POS System and Digital Tools Usage"}),(0,d.jsx)(C,{children:"Food Hygiene and Safety Management Training"}),(0,d.jsx)(C,{children:"Brand Guidelines and Standard Service"}),(0,d.jsx)(C,{children:"Store Operation Efficiency Improvement Workshop"})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{style:{color:"#0A2540",fontSize:"18px",fontWeight:"600",marginBottom:"16px"},children:"\ud83c\udfaf Training Methods"}),(0,d.jsxs)(T,{children:[(0,d.jsx)(C,{children:"Online Training Platform (24/7 access available)"}),(0,d.jsx)(C,{children:"Professional Instructor On-site Training"}),(0,d.jsx)(C,{children:"Headquarters Training Center Group Education"}),(0,d.jsx)(C,{children:"Monthly Regular Workshops and Seminars"}),(0,d.jsx)(C,{children:"Individual Guidance through Mentoring System"}),(0,d.jsx)(C,{children:"Practice-focused On-site Training Programs"})]})]})]}),(0,d.jsxs)("div",{style:{background:"#F9FAFB",padding:"20px",borderRadius:"12px",borderLeft:"4px solid #635BFF"},children:[(0,d.jsx)("h4",{style:{color:"#0A2540",fontSize:"16px",fontWeight:"600",marginBottom:"12px"},children:"\ud83d\udcca Training Performance Management"}),(0,d.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"14px",margin:0},children:"All training courses include performance evaluation along with certificate issuance, and continuous improvement is achieved through regular feedback. Training completion status and performance are monitored in real-time to contribute to strengthening each franchise's capabilities."})]})]})]})]})]})})}},3705:(e,i,r)=>{r.d(i,{cc:()=>t.$n});var n=r(8819),o=r(4752),t=r(8829);o.Ay.select`
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
`,o.Ay.input`
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
`,o.Ay.div`
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
`}}]);