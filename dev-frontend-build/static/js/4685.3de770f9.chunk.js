"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4685],{2488:(e,r,t)=>{t.d(r,{DO:()=>c,Jt:()=>p,Qn:()=>d});var i=t(8819),n=(t(9950),t(4752)),s=t(4414);const o=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,a=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${i.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,l=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  &:disabled {
    background: ${i.w.colors.surfaceHover};
    color: ${i.w.colors.text.muted};
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,d=e=>{let{children:r,className:t,style:i,...n}=e;return(0,s.jsx)(o,{className:t,style:i,...n,children:r})},c=e=>{let{placeholder:r="Search...",...t}=e;return(0,s.jsx)(a,{placeholder:r,...t})},p=e=>{let{children:r,...t}=e;return(0,s.jsx)(l,{...t,children:r})}},4685:(e,r,t)=>{t.r(r),t.d(r,{default:()=>M});var i=t(8819),n=t(9950),s=t(4752),o=t(2488),a=t(2674),l=t(1367),d=t(7455),c=t(4185),p=t(4302),x=t(4414);const h=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,u=s.Ay.div`
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
`,g=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,j=s.Ay.div`
  display: flex;
  gap: 12px;
`,v=s.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,y=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,f=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,b=s.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,w=s.Ay.button`
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;

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
`,F=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,C=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,k=s.Ay.div`
  flex: 1;
`,A=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=s.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,B=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,R=s.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.role){case"manager":return"#E0F2FE";case"restaurant":return"#FEF3C7";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"manager":return"#0891B2";case"restaurant":return"#D97706";case"staff":return"#059669";default:return"#6B7280"}}};
`,T=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,S=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,$=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,z=s.Ay.div`
  font-size: 14px;
  color: ${i.w.colors.text.muted};
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,D=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,L=s.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,O=s.Ay.span`
  color: #374151;
`,_=s.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`,I=s.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?`\n    background: ${i.w.colors.primary};\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  `:"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,M=()=>{const{user:e}=(0,l.As)(),[r,t]=(0,n.useState)([]),[i,s]=(0,n.useState)(""),[M,U]=(0,n.useState)("all"),[P,H]=(0,n.useState)("all"),[q,J]=(0,n.useState)("all"),[Q,W]=(0,n.useState)("all"),[G,Y]=(0,n.useState)(!1),[X,V]=(0,n.useState)(!1),[Z,K]=(0,n.useState)(null),[ee,re]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"general"}),[te,ie]=(0,n.useState)([]),[ne,se]=(0,n.useState)({}),oe=(null===e||void 0===e?void 0:e.restaurantId)||2,ae=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),se(r)}}}catch(r){console.error("Error fetching unread counts:",r)}};(0,n.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),i=r.data||r;t(i),ae(i)}}catch(e){}})()},[e]);const le=r.filter(e=>{const r=e.subject.toLowerCase().includes(i.toLowerCase())||e.customerName.toLowerCase().includes(i.toLowerCase())||e.ticketNumber.toLowerCase().includes(i.toLowerCase()),t="all"===M||e.status===M,n="all"===P||e.priority===P,s="all"===q||e.category===q,o="all"===Q||e.customerRole===Q;return r&&t&&n&&s&&o}),de=r.length,ce=r.filter(e=>"open"===e.status).length,pe=r.filter(e=>"in-progress"===e.status).length,xe=r.filter(e=>"resolved"===e.status).length,he=e=>new Date(e).toLocaleString("en-MY"),ue=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(m,{children:"Support Tickets"}),(0,x.jsxs)(j,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>{const e=le.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),t=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(t),n=document.createElement("a");n.href=i,n.download=`restaurant-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,x.jsx)(v,{variant:"primary",onClick:()=>{Y(!0)},children:"Create Ticket"})]})]}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(a.MD,{children:[(0,x.jsxs)(f,{borderColor:"#635BFF",children:[(0,x.jsx)(a.Os,{children:de}),(0,x.jsx)(a.v0,{children:"Total Tickets"})]}),(0,x.jsxs)(f,{borderColor:"#F59E0B",children:[(0,x.jsx)(a.Os,{children:ce}),(0,x.jsx)(a.v0,{children:"Open Tickets"})]}),(0,x.jsxs)(f,{borderColor:"#3B82F6",children:[(0,x.jsx)(a.Os,{children:pe}),(0,x.jsx)(a.v0,{children:"In Progress"})]}),(0,x.jsxs)(f,{borderColor:"#10B981",children:[(0,x.jsx)(a.Os,{children:xe}),(0,x.jsx)(a.v0,{children:"Resolved"})]})]}),(0,x.jsxs)(b,{children:[(0,x.jsxs)(w,{active:"all"===M,onClick:()=>U("all"),children:["All (",de,")"]}),(0,x.jsxs)(w,{active:"open"===M,onClick:()=>U("open"),children:["Open (",ce,")"]}),(0,x.jsxs)(w,{active:"in-progress"===M,onClick:()=>U("in-progress"),children:["In Progress (",pe,")"]}),(0,x.jsxs)(w,{active:"resolved"===M,onClick:()=>U("resolved"),children:["Resolved (",xe,")"]}),(0,x.jsxs)(w,{active:"closed"===M,onClick:()=>U("closed"),children:["Closed (",r.filter(e=>"closed"===e.status).length,")"]})]}),(0,x.jsxs)(o.Qn,{children:[(0,x.jsx)(o.DO,{placeholder:"Search tickets...",value:i,onChange:e=>s(e.target.value)}),(0,x.jsxs)(o.Jt,{value:P,onChange:e=>H(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Priority"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"low",children:"Low"})]}),(0,x.jsxs)(o.Jt,{value:Q,onChange:e=>W(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Roles"}),(0,x.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,x.jsx)("option",{value:"staff",children:"Staff"})]}),(0,x.jsxs)(o.Jt,{value:q,onChange:e=>J(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Categories"}),(0,x.jsx)("option",{value:"technical",children:"Technical"}),(0,x.jsx)("option",{value:"billing",children:"Billing"}),(0,x.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,x.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,x.jsx)("option",{value:"general",children:"General"})]})]}),(0,x.jsx)(y,{children:le.map(e=>(0,x.jsxs)(F,{children:[(0,x.jsxs)(C,{children:[(0,x.jsxs)(k,{children:[(0,x.jsx)(A,{children:e.ticketNumber}),(0,x.jsx)(E,{children:e.subject}),(0,x.jsx)(B,{children:(0,x.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,x.jsx)(R,{role:e.customerRole,children:e.customerRole})]})})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(S,{status:e.status,children:e.status}),(0,x.jsx)($,{priority:e.priority,children:e.priority})]})]}),(0,x.jsx)(z,{children:e.description}),e.replyMessage&&(0,x.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,x.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",he(e.repliedAt||"")]}),(0,x.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,x.jsxs)(D,{children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(L,{children:"Created"}),(0,x.jsx)(O,{children:he(e.createdAt)})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(L,{children:"Category"}),(0,x.jsx)(O,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(L,{children:"Response Time"}),(0,x.jsx)(O,{children:ue(e.responseTime)})]}),e.assignedTo&&(0,x.jsxs)(N,{children:[(0,x.jsx)(L,{children:"Assigned To"}),(0,x.jsx)(O,{children:e.assignedTo})]}),ne[e.id]&&(0,x.jsx)(N,{children:(0,x.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ne[e.id].total_comments,ne[e.id].unread_count>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ne[e.id].unread_count," new"]})]})})]}),(0,x.jsx)(_,{children:(0,x.jsx)(I,{variant:"primary",onClick:()=>(e=>{K(e),V(!0)})(e),children:"View Details"})})]},e.id))}),G&&(0,x.jsx)(a.mH,{onClick:()=>Y(!1),children:(0,x.jsxs)(a.$m,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(a.rQ,{children:[(0,x.jsx)(a.wt,{children:"Create Support Ticket"}),(0,x.jsx)(a.Jn,{onClick:()=>Y(!1),children:"\xd7"})]}),(0,x.jsxs)(a.cw,{children:[(0,x.jsxs)(a.gE,{children:[(0,x.jsx)(a.lR,{children:"Subject *"}),(0,x.jsx)(a.ZQ,{type:"text",value:ee.subject,onChange:e=>re({...ee,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,x.jsxs)(a.gE,{children:[(0,x.jsx)(a.lR,{children:"Description *"}),(0,x.jsx)(a.Lz,{value:ee.description,onChange:e=>re({...ee,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,x.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,x.jsx)(a.lR,{children:"Attachments"}),(0,x.jsx)(d.A,{files:te,onChange:ie,maxFiles:5})]}),(0,x.jsxs)(a.fh,{children:[(0,x.jsxs)(a.gE,{children:[(0,x.jsx)(a.lR,{children:"Priority"}),(0,x.jsxs)(a.FX,{value:ee.priority,onChange:e=>re({...ee,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"low",children:"Low"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(a.gE,{children:[(0,x.jsx)(a.lR,{children:"Category"}),(0,x.jsxs)(a.FX,{value:ee.category,onChange:e=>re({...ee,category:e.target.value}),children:[(0,x.jsx)("option",{value:"general",children:"General"}),(0,x.jsx)("option",{value:"technical",children:"Technical"}),(0,x.jsx)("option",{value:"billing",children:"Billing"}),(0,x.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,x.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,x.jsxs)(a.jl,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>Y(!1),children:"Cancel"}),(0,x.jsx)(v,{variant:"primary",onClick:async()=>{try{const r={customerId:(null===e||void 0===e?void 0:e.id)||"restaurant-user",customerName:(null===e||void 0===e?void 0:e.name)||"Restaurant User",customerEmail:(null===e||void 0===e?void 0:e.email)||"user@restaurant.com",customerRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"].includes((null===e||void 0===e?void 0:e.role)||"")?"manager":"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)?"restaurant":"staff",restaurantId:oe,restaurantName:"IOI Mall Food Court",subject:ee.subject,description:ee.description,status:"open",priority:ee.priority,category:ee.category,attachments:te.length>0?te:void 0};if(!(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok)return;{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),i=r.data||r;t(i),ae(i)}Y(!1)}}catch(r){return}re({subject:"",description:"",priority:"medium",category:"general"}),ie([])},disabled:!ee.subject||!ee.description,children:"Create Ticket"})]})]})}),X&&Z&&(0,x.jsx)(a.mH,{onClick:()=>V(!1),children:(0,x.jsxs)(a.$m,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(a.rQ,{children:[(0,x.jsx)(a.wt,{children:"Ticket Details"}),(0,x.jsx)(a.Jn,{onClick:()=>V(!1),children:"\xd7"})]}),(0,x.jsx)(a.cw,{children:(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(a.lR,{children:"Ticket Number"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:Z.ticketNumber})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(a.lR,{children:"Status"}),(0,x.jsx)("div",{style:{padding:"8px 0"},children:(0,x.jsx)(S,{status:Z.status,children:Z.status})})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(a.lR,{children:"Priority"}),(0,x.jsx)("div",{style:{padding:"8px 0"},children:(0,x.jsx)($,{priority:Z.priority,children:Z.priority})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(a.lR,{children:"Category"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:Z.category.replace("-"," ")})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(a.lR,{children:"Customer Information"}),(0,x.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[Z.customerName,(0,x.jsx)(R,{role:Z.customerRole,style:{marginLeft:"8px"},children:Z.customerRole})]}),(0,x.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:Z.customerEmail})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(a.lR,{children:"Subject"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:Z.subject})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(a.lR,{children:"Description"}),(0,x.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:Z.description})]}),(null===Z||void 0===Z?void 0:Z.attachments)&&Z.attachments.length>0&&(0,x.jsx)(c.A,{attachments:Z.attachments}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(a.lR,{children:"Created At"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Z.createdAt})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(a.lR,{children:"Last Updated"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Z.updatedAt})]})]}),Z.assignedTo&&(0,x.jsxs)("div",{children:[(0,x.jsx)(a.lR,{children:"Assigned To"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:Z.assignedTo})]}),(0,x.jsx)(p.A,{entityType:"support_ticket",entityId:Z.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>se(e=>{const r={...e};return r[Z.id]&&(r[Z.id]={...r[Z.id],unread_count:0}),r})})]})}),(0,x.jsx)(a.jl,{children:(0,x.jsx)(v,{variant:"secondary",onClick:()=>V(!1),children:"Close"})})]})})]})]})})}}}]);