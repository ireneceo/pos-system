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
`,d=e=>{let{children:r,className:i,style:t,...s}=e;return(0,n.jsx)(o,{className:i,style:t,...s,children:r})},l=e=>{let{placeholder:r="Search...",...i}=e;return(0,n.jsx)(s,{placeholder:r,...i})},c=e=>{let{children:r,...i}=e;return(0,n.jsx)(a,{...i,children:r})}},4685:(e,r,i)=>{i.r(r),i.d(r,{default:()=>V});var t=i(9950),n=i(4752),o=i(2488),s=i(2674),a=i(1367),d=i(4414);const l=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,c=n.Ay.div`
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
`,p=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=n.Ay.div`
  display: flex;
  gap: 12px;
`,u=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,g=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,m=n.Ay.div`
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
`,j=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,b=n.Ay.button`
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
`,f=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,v=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,y=n.Ay.div`
  flex: 1;
`,w=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,A=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,C=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.role){case"manager":return"#E0F2FE";case"restaurant":return"#FEF3C7";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"manager":return"#0891B2";case"restaurant":return"#D97706";case"staff":return"#059669";default:return"#6B7280"}}};
`,k=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,E=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,B=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,T=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,z=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,R=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,S=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,D=n.Ay.span`
  color: #374151;
`,N=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`,$=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,L=n.Ay.div`
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
`,O=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,P=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,M=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,U=n.Ay.button`
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
`,I=n.Ay.div`
  padding: 24px;
`,q=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,H=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,J=n.Ay.div`
  margin-bottom: 20px;
`,G=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,W=n.Ay.input`
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
`,Y=n.Ay.select`
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
`,Q=n.Ay.textarea`
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
`,V=()=>{const{user:e}=(0,a.As)(),[r,i]=(0,t.useState)([]),[n,V]=(0,t.useState)(""),[K,X]=(0,t.useState)("all"),[Z,_]=(0,t.useState)("all"),[ee,re]=(0,t.useState)("all"),[ie,te]=(0,t.useState)("all"),[ne,oe]=(0,t.useState)(!1),[se,ae]=(0,t.useState)(!1),[de,le]=(0,t.useState)(null),[ce,pe]=(0,t.useState)({subject:"",description:"",priority:"medium",category:"general"}),xe=(null===e||void 0===e?void 0:e.restaurantId)||2;(0,t.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),t=r.data||r;i(t)}}catch(e){}})()},[e]);const he=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase()),i="all"===K||e.status===K,t="all"===Z||e.priority===Z,o="all"===ee||e.category===ee,s="all"===ie||e.customerRole===ie;return r&&i&&t&&o&&s}),ue=r.length,ge=r.filter(e=>"open"===e.status).length,me=r.filter(e=>"in-progress"===e.status).length,je=r.filter(e=>"resolved"===e.status).length,be=e=>new Date(e).toLocaleString("en-MY"),fe=e=>{const r=Math.floor(e/60),i=e%60;return r>0?`${r}h ${i}m`:`${i}m`};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(l,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(x,{children:"Support Tickets"}),(0,d.jsxs)(h,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>{const e=he.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),i=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),t=URL.createObjectURL(i),n=document.createElement("a");n.href=t,n.download=`restaurant-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(t)},children:"Export"}),(0,d.jsx)(u,{variant:"primary",onClick:()=>{oe(!0)},children:"Create Ticket"})]})]}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(s.MD,{children:[(0,d.jsxs)(m,{borderColor:"#635BFF",children:[(0,d.jsx)(s.Os,{children:ue}),(0,d.jsx)(s.v0,{children:"Total Tickets"})]}),(0,d.jsxs)(m,{borderColor:"#F59E0B",children:[(0,d.jsx)(s.Os,{children:ge}),(0,d.jsx)(s.v0,{children:"Open Tickets"})]}),(0,d.jsxs)(m,{borderColor:"#3B82F6",children:[(0,d.jsx)(s.Os,{children:me}),(0,d.jsx)(s.v0,{children:"In Progress"})]}),(0,d.jsxs)(m,{borderColor:"#10B981",children:[(0,d.jsx)(s.Os,{children:je}),(0,d.jsx)(s.v0,{children:"Resolved"})]})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(b,{active:"all"===K,onClick:()=>X("all"),children:["All (",ue,")"]}),(0,d.jsxs)(b,{active:"open"===K,onClick:()=>X("open"),children:["Open (",ge,")"]}),(0,d.jsxs)(b,{active:"in-progress"===K,onClick:()=>X("in-progress"),children:["In Progress (",me,")"]}),(0,d.jsxs)(b,{active:"resolved"===K,onClick:()=>X("resolved"),children:["Resolved (",je,")"]}),(0,d.jsxs)(b,{active:"closed"===K,onClick:()=>X("closed"),children:["Closed (",r.filter(e=>"closed"===e.status).length,")"]})]}),(0,d.jsxs)(o.Qn,{children:[(0,d.jsx)(o.DO,{placeholder:"Search tickets...",value:n,onChange:e=>V(e.target.value)}),(0,d.jsxs)(o.Jt,{value:Z,onChange:e=>_(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Priority"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"low",children:"Low"})]}),(0,d.jsxs)(o.Jt,{value:ie,onChange:e=>te(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Roles"}),(0,d.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,d.jsx)("option",{value:"staff",children:"Staff"})]}),(0,d.jsxs)(o.Jt,{value:ee,onChange:e=>re(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Categories"}),(0,d.jsx)("option",{value:"technical",children:"Technical"}),(0,d.jsx)("option",{value:"billing",children:"Billing"}),(0,d.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,d.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,d.jsx)("option",{value:"general",children:"General"})]})]}),(0,d.jsx)(g,{children:he.map(e=>(0,d.jsxs)(f,{children:[(0,d.jsxs)(v,{children:[(0,d.jsxs)(y,{children:[(0,d.jsx)(w,{children:e.ticketNumber}),(0,d.jsx)(F,{children:e.subject}),(0,d.jsx)(A,{children:(0,d.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,d.jsx)(C,{role:e.customerRole,children:e.customerRole})]})})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)(E,{status:e.status,children:e.status}),(0,d.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,d.jsx)(T,{children:e.description}),e.replyMessage&&(0,d.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,d.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",be(e.repliedAt||"")]}),(0,d.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,d.jsxs)(z,{children:[(0,d.jsxs)(R,{children:[(0,d.jsx)(S,{children:"Created"}),(0,d.jsx)(D,{children:be(e.createdAt)})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(S,{children:"Category"}),(0,d.jsx)(D,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(S,{children:"Response Time"}),(0,d.jsx)(D,{children:fe(e.responseTime)})]}),e.assignedTo&&(0,d.jsxs)(R,{children:[(0,d.jsx)(S,{children:"Assigned To"}),(0,d.jsx)(D,{children:e.assignedTo})]})]}),(0,d.jsx)(N,{children:(0,d.jsx)($,{variant:"primary",onClick:()=>(e=>{le(e),ae(!0)})(e),children:"View Details"})})]},e.id))}),ne&&(0,d.jsx)(L,{onClick:()=>oe(!1),children:(0,d.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(P,{children:[(0,d.jsx)(M,{children:"Create Support Ticket"}),(0,d.jsx)(U,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,d.jsxs)(I,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)(G,{children:"Subject *"}),(0,d.jsx)(W,{type:"text",value:ce.subject,onChange:e=>pe({...ce,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(G,{children:"Description *"}),(0,d.jsx)(Q,{value:ce.description,onChange:e=>pe({...ce,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,d.jsxs)(H,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)(G,{children:"Priority"}),(0,d.jsxs)(Y,{value:ce.priority,onChange:e=>pe({...ce,priority:e.target.value}),children:[(0,d.jsx)("option",{value:"low",children:"Low"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(G,{children:"Category"}),(0,d.jsxs)(Y,{value:ce.category,onChange:e=>pe({...ce,category:e.target.value}),children:[(0,d.jsx)("option",{value:"general",children:"General"}),(0,d.jsx)("option",{value:"technical",children:"Technical"}),(0,d.jsx)("option",{value:"billing",children:"Billing"}),(0,d.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,d.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>oe(!1),children:"Cancel"}),(0,d.jsx)(u,{variant:"primary",onClick:async()=>{try{const r={customerId:(null===e||void 0===e?void 0:e.id)||"restaurant-user",customerName:(null===e||void 0===e?void 0:e.name)||"Restaurant User",customerEmail:(null===e||void 0===e?void 0:e.email)||"user@restaurant.com",customerRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"].includes((null===e||void 0===e?void 0:e.role)||"")?"manager":"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)?"restaurant":"staff",restaurantId:xe,restaurantName:"IOI Mall Food Court",subject:ce.subject,description:ce.description,status:"open",priority:ce.priority,category:ce.category};if((await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok){const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),t=r.data||r;i(t)}oe(!1)}else alert("Failed to create support ticket. Please try again.")}catch(r){alert("Error creating support ticket. Please try again.")}pe({subject:"",description:"",priority:"medium",category:"general"})},disabled:!ce.subject||!ce.description,children:"Create Ticket"})]})]})}),se&&de&&(0,d.jsx)(L,{onClick:()=>ae(!1),children:(0,d.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(P,{children:[(0,d.jsx)(M,{children:"Ticket Details"}),(0,d.jsx)(U,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,d.jsx)(I,{children:(0,d.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(G,{children:"Ticket Number"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:de.ticketNumber})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(G,{children:"Status"}),(0,d.jsx)("div",{style:{padding:"8px 0"},children:(0,d.jsx)(E,{status:de.status,children:de.status})})]})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(G,{children:"Priority"}),(0,d.jsx)("div",{style:{padding:"8px 0"},children:(0,d.jsx)(B,{priority:de.priority,children:de.priority})})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(G,{children:"Category"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:de.category.replace("-"," ")})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(G,{children:"Customer Information"}),(0,d.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[de.customerName,(0,d.jsx)(C,{role:de.customerRole,style:{marginLeft:"8px"},children:de.customerRole})]}),(0,d.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:de.customerEmail})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(G,{children:"Subject"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:de.subject})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(G,{children:"Description"}),(0,d.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:de.description})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(G,{children:"Created At"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:de.createdAt})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(G,{children:"Last Updated"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:de.updatedAt})]})]}),de.assignedTo&&(0,d.jsxs)("div",{children:[(0,d.jsx)(G,{children:"Assigned To"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:de.assignedTo})]})]})}),(0,d.jsx)(q,{children:(0,d.jsx)(u,{variant:"secondary",onClick:()=>ae(!1),children:"Close"})})]})})]})]})})}}}]);