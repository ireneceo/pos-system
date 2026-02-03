"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4685],{2488:(e,r,i)=>{i.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});i(9950);var t=i(4752),n=i(4414);const o=t.Ay.div`
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
`,s=t.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
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
`,a=t.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
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
`,d=e=>{let{children:r,className:i,style:t,...s}=e;return(0,n.jsx)(o,{className:i,style:t,...s,children:r})},l=e=>{let{placeholder:r="Search...",...i}=e;return(0,n.jsx)(s,{placeholder:r,...i})},c=e=>{let{children:r,...i}=e;return(0,n.jsx)(a,{...i,children:r})}},4685:(e,r,i)=>{i.r(r),i.d(r,{default:()=>K});var t=i(9950),n=i(4752),o=i(3310),s=i(2488),a=i(2674),d=i(1367),l=i(4414);const c=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=n.Ay.div`
  display: flex;
  gap: 12px;
`,g=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,m=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,j=n.Ay.div`
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
`,b=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,f=n.Ay.button`
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
`,v=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,y=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=n.Ay.div`
  flex: 1;
`,F=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,C=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,k=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.role){case"manager":return"#E0F2FE";case"restaurant":return"#FEF3C7";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"manager":return"#0891B2";case"restaurant":return"#D97706";case"staff":return"#059669";default:return"#6B7280"}}};
`,E=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,B=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,T=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,z=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,R=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,S=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,D=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,N=n.Ay.span`
  color: #374151;
`,$=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`,L=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,O=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,P=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,M=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,U=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,I=n.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    color: #0A2540;
  }
`,q=n.Ay.div`
  padding: 24px;
`,H=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,J=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,G=n.Ay.div`
  margin-bottom: 20px;
`,W=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,Y=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Q=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,V=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,K=()=>{const{user:e}=(0,d.As)(),[r,i]=(0,t.useState)([]),[n,K]=(0,t.useState)(""),[X,Z]=(0,t.useState)("all"),[_,ee]=(0,t.useState)("all"),[re,ie]=(0,t.useState)("all"),[te,ne]=(0,t.useState)("all"),[oe,se]=(0,t.useState)(!1),[ae,de]=(0,t.useState)(!1),[le,ce]=(0,t.useState)(null),[pe,xe]=(0,t.useState)({subject:"",description:"",priority:"medium",category:"general"}),he=(null===e||void 0===e?void 0:e.restaurantId)||2;(0,t.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),t=r.data||r;i(t)}}catch(e){}})()},[e]);const ue=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase()),i="all"===X||e.status===X,t="all"===_||e.priority===_,o="all"===re||e.category===re,s="all"===te||e.customerRole===te;return r&&i&&t&&o&&s}),ge=r.length,me=r.filter(e=>"open"===e.status).length,je=r.filter(e=>"in-progress"===e.status).length,be=r.filter(e=>"resolved"===e.status).length,fe=e=>new Date(e).toLocaleString("en-MY"),ve=e=>{const r=Math.floor(e/60),i=e%60;return r>0?`${r}h ${i}m`:`${i}m`};return(0,l.jsx)(o.A,{children:(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{children:"Support Tickets"}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{variant:"secondary",onClick:()=>{const e=ue.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),i=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),t=URL.createObjectURL(i),n=document.createElement("a");n.href=t,n.download=`restaurant-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(t)},children:"Export"}),(0,l.jsx)(g,{variant:"primary",onClick:()=>{se(!0)},children:"Create Ticket"})]})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(a.MD,{children:[(0,l.jsxs)(j,{borderColor:"#635BFF",children:[(0,l.jsx)(a.Os,{children:ge}),(0,l.jsx)(a.v0,{children:"Total Tickets"})]}),(0,l.jsxs)(j,{borderColor:"#F59E0B",children:[(0,l.jsx)(a.Os,{children:me}),(0,l.jsx)(a.v0,{children:"Open Tickets"})]}),(0,l.jsxs)(j,{borderColor:"#3B82F6",children:[(0,l.jsx)(a.Os,{children:je}),(0,l.jsx)(a.v0,{children:"In Progress"})]}),(0,l.jsxs)(j,{borderColor:"#10B981",children:[(0,l.jsx)(a.Os,{children:be}),(0,l.jsx)(a.v0,{children:"Resolved"})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(f,{active:"all"===X,onClick:()=>Z("all"),children:["All (",ge,")"]}),(0,l.jsxs)(f,{active:"open"===X,onClick:()=>Z("open"),children:["Open (",me,")"]}),(0,l.jsxs)(f,{active:"in-progress"===X,onClick:()=>Z("in-progress"),children:["In Progress (",je,")"]}),(0,l.jsxs)(f,{active:"resolved"===X,onClick:()=>Z("resolved"),children:["Resolved (",be,")"]}),(0,l.jsxs)(f,{active:"closed"===X,onClick:()=>Z("closed"),children:["Closed (",r.filter(e=>"closed"===e.status).length,")"]})]}),(0,l.jsxs)(s.Qn,{children:[(0,l.jsx)(s.DO,{placeholder:"Search tickets...",value:n,onChange:e=>K(e.target.value)}),(0,l.jsxs)(s.Jt,{value:_,onChange:e=>ee(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Priority"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"}),(0,l.jsx)("option",{value:"high",children:"High"}),(0,l.jsx)("option",{value:"medium",children:"Medium"}),(0,l.jsx)("option",{value:"low",children:"Low"})]}),(0,l.jsxs)(s.Jt,{value:te,onChange:e=>ne(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Roles"}),(0,l.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,l.jsx)("option",{value:"staff",children:"Staff"})]}),(0,l.jsxs)(s.Jt,{value:re,onChange:e=>ie(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Categories"}),(0,l.jsx)("option",{value:"technical",children:"Technical"}),(0,l.jsx)("option",{value:"billing",children:"Billing"}),(0,l.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,l.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,l.jsx)("option",{value:"general",children:"General"})]})]}),(0,l.jsx)(m,{children:ue.map(e=>(0,l.jsxs)(v,{children:[(0,l.jsxs)(y,{children:[(0,l.jsxs)(w,{children:[(0,l.jsx)(F,{children:e.ticketNumber}),(0,l.jsx)(A,{children:e.subject}),(0,l.jsx)(C,{children:(0,l.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,l.jsx)(k,{role:e.customerRole,children:e.customerRole})]})})]}),(0,l.jsxs)(E,{children:[(0,l.jsx)(B,{status:e.status,children:e.status}),(0,l.jsx)(T,{priority:e.priority,children:e.priority})]})]}),(0,l.jsx)(z,{children:e.description}),e.replyMessage&&(0,l.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,l.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",fe(e.repliedAt||"")]}),(0,l.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,l.jsxs)(R,{children:[(0,l.jsxs)(S,{children:[(0,l.jsx)(D,{children:"Created"}),(0,l.jsx)(N,{children:fe(e.createdAt)})]}),(0,l.jsxs)(S,{children:[(0,l.jsx)(D,{children:"Category"}),(0,l.jsx)(N,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,l.jsxs)(S,{children:[(0,l.jsx)(D,{children:"Response Time"}),(0,l.jsx)(N,{children:ve(e.responseTime)})]}),e.assignedTo&&(0,l.jsxs)(S,{children:[(0,l.jsx)(D,{children:"Assigned To"}),(0,l.jsx)(N,{children:e.assignedTo})]})]}),(0,l.jsx)($,{children:(0,l.jsx)(L,{variant:"primary",onClick:()=>(e=>{ce(e),de(!0)})(e),children:"View Details"})})]},e.id))}),oe&&(0,l.jsx)(O,{onClick:()=>se(!1),children:(0,l.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(M,{children:[(0,l.jsx)(U,{children:"Create Support Ticket"}),(0,l.jsx)(I,{onClick:()=>se(!1),children:"\xd7"})]}),(0,l.jsxs)(q,{children:[(0,l.jsxs)(G,{children:[(0,l.jsx)(W,{children:"Subject *"}),(0,l.jsx)(Y,{type:"text",value:pe.subject,onChange:e=>xe({...pe,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,l.jsxs)(G,{children:[(0,l.jsx)(W,{children:"Description *"}),(0,l.jsx)(V,{value:pe.description,onChange:e=>xe({...pe,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,l.jsxs)(J,{children:[(0,l.jsxs)(G,{children:[(0,l.jsx)(W,{children:"Priority"}),(0,l.jsxs)(Q,{value:pe.priority,onChange:e=>xe({...pe,priority:e.target.value}),children:[(0,l.jsx)("option",{value:"low",children:"Low"}),(0,l.jsx)("option",{value:"medium",children:"Medium"}),(0,l.jsx)("option",{value:"high",children:"High"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,l.jsxs)(G,{children:[(0,l.jsx)(W,{children:"Category"}),(0,l.jsxs)(Q,{value:pe.category,onChange:e=>xe({...pe,category:e.target.value}),children:[(0,l.jsx)("option",{value:"general",children:"General"}),(0,l.jsx)("option",{value:"technical",children:"Technical"}),(0,l.jsx)("option",{value:"billing",children:"Billing"}),(0,l.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,l.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,l.jsxs)(H,{children:[(0,l.jsx)(g,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,l.jsx)(g,{variant:"primary",onClick:async()=>{try{const r={customerId:(null===e||void 0===e?void 0:e.id)||"restaurant-user",customerName:(null===e||void 0===e?void 0:e.name)||"Restaurant User",customerEmail:(null===e||void 0===e?void 0:e.email)||"user@restaurant.com",customerRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"].includes((null===e||void 0===e?void 0:e.role)||"")?"manager":"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)?"restaurant":"staff",restaurantId:he,restaurantName:"IOI Mall Food Court",subject:pe.subject,description:pe.description,status:"open",priority:pe.priority,category:pe.category};if((await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok){const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),t=r.data||r;i(t)}se(!1)}else alert("Failed to create support ticket. Please try again.")}catch(r){alert("Error creating support ticket. Please try again.")}xe({subject:"",description:"",priority:"medium",category:"general"})},disabled:!pe.subject||!pe.description,children:"Create Ticket"})]})]})}),ae&&le&&(0,l.jsx)(O,{onClick:()=>de(!1),children:(0,l.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(M,{children:[(0,l.jsx)(U,{children:"Ticket Details"}),(0,l.jsx)(I,{onClick:()=>de(!1),children:"\xd7"})]}),(0,l.jsx)(q,{children:(0,l.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,l.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(W,{children:"Ticket Number"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:le.ticketNumber})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(W,{children:"Status"}),(0,l.jsx)("div",{style:{padding:"8px 0"},children:(0,l.jsx)(B,{status:le.status,children:le.status})})]})]}),(0,l.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(W,{children:"Priority"}),(0,l.jsx)("div",{style:{padding:"8px 0"},children:(0,l.jsx)(T,{priority:le.priority,children:le.priority})})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(W,{children:"Category"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:le.category.replace("-"," ")})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(W,{children:"Customer Information"}),(0,l.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[le.customerName,(0,l.jsx)(k,{role:le.customerRole,style:{marginLeft:"8px"},children:le.customerRole})]}),(0,l.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:le.customerEmail})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(W,{children:"Subject"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:le.subject})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(W,{children:"Description"}),(0,l.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:le.description})]}),(0,l.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(W,{children:"Created At"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:le.createdAt})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(W,{children:"Last Updated"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:le.updatedAt})]})]}),le.assignedTo&&(0,l.jsxs)("div",{children:[(0,l.jsx)(W,{children:"Assigned To"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:le.assignedTo})]})]})}),(0,l.jsx)(H,{children:(0,l.jsx)(g,{variant:"secondary",onClick:()=>de(!1),children:"Close"})})]})})]})]})})}}}]);