"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4685],{2488:(e,r,t)=>{t.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});t(9950);var i=t(4752),n=t(4414);const o=i.Ay.div`
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
`,s=i.Ay.input`
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
`,a=i.Ay.select`
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
`,d=e=>{let{children:r,className:t,style:i,...s}=e;return(0,n.jsx)(o,{className:t,style:i,...s,children:r})},l=e=>{let{placeholder:r="Search...",...t}=e;return(0,n.jsx)(s,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,n.jsx)(a,{...t,children:r})}},2597:(e,r,t)=>{t.d(r,{Ex:()=>c,oz:()=>l,tU:()=>d});t(9950);var i=t(4752),n=t(4414);const o=i.Ay.div`
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
`,s=i.Ay.button`
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
`,a=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:r,className:t,style:i}=e;return(0,n.jsx)(o,{className:t,style:i,children:r})},l=e=>{let{active:r,onClick:t,children:i,className:o}=e;return(0,n.jsx)(s,{active:r,onClick:t,className:o,children:i})},c=e=>{let{count:r,variant:t="default",showZero:i=!1}=e;return 0!==r||i?(0,n.jsx)(a,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>o});var i=t(9950),n=t(4492);function o(e){const[r,t]=(0,n.ok)(),o=(0,i.useCallback)(()=>r.get("tab")||e,[r,e]),[s,a]=(0,i.useState)(o());return[s,(0,i.useCallback)(e=>{a(e),t({tab:e})},[t])]}},4685:(e,r,t)=>{t.r(r),t.d(r,{default:()=>K});var i=t(9950),n=t(4752),o=t(2488),s=t(6649),a=t(2597),d=t(2653),l=t(1367),c=t(7455),p=t(4185),x=t(4302),u=t(4414);const h=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,g=n.Ay.div`
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
`,m=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,b=n.Ay.div`
  display: flex;
  gap: 12px;
`,f=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,v=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,y=n.Ay.div`
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
`,w=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,F=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,k=n.Ay.div`
  flex: 1;
`,A=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,E=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,B=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.role){case"manager":return"#E0F2FE";case"restaurant":return"#FEF3C7";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"manager":return"#0891B2";case"restaurant":return"#D97706";case"staff":return"#059669";default:return"#6B7280"}}};
`,z=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,T=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,S=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,R=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,D=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,$=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,L=n.Ay.span`
  color: #374151;
`,O=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`,_=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,I=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`,M=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 800px;
  width: 90%;
  flex-shrink: 0;
`,U=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,P=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,q=n.Ay.button`
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
`,Z=n.Ay.div`
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
`,W=n.Ay.div`
  margin-bottom: 20px;
`,G=n.Ay.label`
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
  box-sizing: border-box;

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
  box-sizing: border-box;

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
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,K=()=>{const{user:e}=(0,l.As)(),[r,t]=(0,i.useState)([]),[n,K]=(0,i.useState)(""),[X,ee]=(0,d.M)("all"),[re,te]=(0,i.useState)("all"),[ie,ne]=(0,i.useState)("all"),[oe,se]=(0,i.useState)("all"),[ae,de]=(0,i.useState)(!1),[le,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(null),[ue,he]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ge,me]=(0,i.useState)([]),[je,be]=(0,i.useState)({}),fe=(null===e||void 0===e?void 0:e.restaurantId)||2,ve=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),be(r)}}}catch(r){console.error("Error fetching unread counts:",r)}};(0,i.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),i=r.data||r;t(i),ve(i)}}catch(e){}})()},[e]);const ye=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase()),t="all"===X||e.status===X,i="all"===re||e.priority===re,o="all"===ie||e.category===ie,s="all"===oe||e.customerRole===oe;return r&&t&&i&&o&&s}),we=r.length,Fe=r.filter(e=>"open"===e.status).length,ke=r.filter(e=>"in-progress"===e.status).length,Ae=r.filter(e=>"resolved"===e.status).length,Ce=e=>new Date(e).toLocaleString("en-MY"),Ee=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(h,{children:[(0,u.jsxs)(g,{children:[(0,u.jsx)(j,{children:"Support Tickets"}),(0,u.jsxs)(b,{children:[(0,u.jsx)(f,{variant:"secondary",onClick:()=>{const e=ye.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),t=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(t),n=document.createElement("a");n.href=i,n.download=`restaurant-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,u.jsx)(f,{variant:"primary",onClick:()=>{de(!0)},children:"Create Ticket"})]})]}),(0,u.jsxs)(m,{children:[(0,u.jsxs)(s.MD,{children:[(0,u.jsxs)(y,{borderColor:"#635BFF",children:[(0,u.jsx)(s.Os,{children:we}),(0,u.jsx)(s.v0,{children:"Total Tickets"})]}),(0,u.jsxs)(y,{borderColor:"#F59E0B",children:[(0,u.jsx)(s.Os,{children:Fe}),(0,u.jsx)(s.v0,{children:"Open Tickets"})]}),(0,u.jsxs)(y,{borderColor:"#3B82F6",children:[(0,u.jsx)(s.Os,{children:ke}),(0,u.jsx)(s.v0,{children:"In Progress"})]}),(0,u.jsxs)(y,{borderColor:"#10B981",children:[(0,u.jsx)(s.Os,{children:Ae}),(0,u.jsx)(s.v0,{children:"Resolved"})]})]}),(0,u.jsxs)(a.tU,{children:[(0,u.jsxs)(a.oz,{active:"all"===X,onClick:()=>ee("all"),children:["All ",(0,u.jsx)(a.Ex,{count:we,showZero:!0})]}),(0,u.jsxs)(a.oz,{active:"open"===X,onClick:()=>ee("open"),children:["Open ",(0,u.jsx)(a.Ex,{count:Fe,showZero:!0})]}),(0,u.jsxs)(a.oz,{active:"in-progress"===X,onClick:()=>ee("in-progress"),children:["In Progress ",(0,u.jsx)(a.Ex,{count:ke,showZero:!0})]}),(0,u.jsxs)(a.oz,{active:"resolved"===X,onClick:()=>ee("resolved"),children:["Resolved ",(0,u.jsx)(a.Ex,{count:Ae,showZero:!0})]}),(0,u.jsxs)(a.oz,{active:"closed"===X,onClick:()=>ee("closed"),children:["Closed ",(0,u.jsx)(a.Ex,{count:r.filter(e=>"closed"===e.status).length,showZero:!0})]})]}),(0,u.jsxs)(o.Qn,{children:[(0,u.jsx)(o.DO,{placeholder:"Search tickets...",value:n,onChange:e=>K(e.target.value)}),(0,u.jsxs)(o.Jt,{value:re,onChange:e=>te(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Priority"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"}),(0,u.jsx)("option",{value:"high",children:"High"}),(0,u.jsx)("option",{value:"medium",children:"Medium"}),(0,u.jsx)("option",{value:"low",children:"Low"})]}),(0,u.jsxs)(o.Jt,{value:oe,onChange:e=>se(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Roles"}),(0,u.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,u.jsx)("option",{value:"staff",children:"Staff"})]}),(0,u.jsxs)(o.Jt,{value:ie,onChange:e=>ne(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Categories"}),(0,u.jsx)("option",{value:"technical",children:"Technical"}),(0,u.jsx)("option",{value:"billing",children:"Billing"}),(0,u.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,u.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,u.jsx)("option",{value:"general",children:"General"})]})]}),(0,u.jsx)(v,{children:ye.map(e=>(0,u.jsxs)(w,{children:[(0,u.jsxs)(F,{children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(A,{children:e.ticketNumber}),(0,u.jsx)(C,{children:e.subject}),(0,u.jsx)(E,{children:(0,u.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,u.jsx)(B,{role:e.customerRole,children:e.customerRole})]})})]}),(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{status:e.status,children:e.status}),(0,u.jsx)(S,{priority:e.priority,children:e.priority})]})]}),(0,u.jsx)(R,{children:e.description}),e.replyMessage&&(0,u.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,u.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",Ce(e.repliedAt||"")]}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,u.jsxs)(D,{children:[(0,u.jsxs)(N,{children:[(0,u.jsx)($,{children:"Created"}),(0,u.jsx)(L,{children:Ce(e.createdAt)})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)($,{children:"Category"}),(0,u.jsx)(L,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)($,{children:"Response Time"}),(0,u.jsx)(L,{children:Ee(e.responseTime)})]}),e.assignedTo&&(0,u.jsxs)(N,{children:[(0,u.jsx)($,{children:"Assigned To"}),(0,u.jsx)(L,{children:e.assignedTo})]}),je[e.id]&&(0,u.jsx)(N,{children:(0,u.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",je[e.id].total_comments,je[e.id].unread_count>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[je[e.id].unread_count," new"]})]})})]}),(0,u.jsx)(O,{children:(0,u.jsx)(_,{variant:"primary",onClick:()=>(e=>{xe(e),ce(!0)})(e),children:"View Details"})})]},e.id))}),ae&&(0,u.jsx)(I,{onClick:()=>de(!1),children:(0,u.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(U,{children:[(0,u.jsx)(P,{children:"Create Support Ticket"}),(0,u.jsx)(q,{onClick:()=>de(!1),children:"\xd7"})]}),(0,u.jsxs)(Z,{children:[(0,u.jsxs)(W,{children:[(0,u.jsx)(G,{children:"Subject *"}),(0,u.jsx)(Y,{type:"text",value:ue.subject,onChange:e=>he({...ue,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(G,{children:"Description *"}),(0,u.jsx)(V,{value:ue.description,onChange:e=>he({...ue,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,u.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,u.jsx)(G,{children:"Attachments"}),(0,u.jsx)(c.A,{files:ge,onChange:me,maxFiles:5})]}),(0,u.jsxs)(J,{children:[(0,u.jsxs)(W,{children:[(0,u.jsx)(G,{children:"Priority"}),(0,u.jsxs)(Q,{value:ue.priority,onChange:e=>he({...ue,priority:e.target.value}),children:[(0,u.jsx)("option",{value:"low",children:"Low"}),(0,u.jsx)("option",{value:"medium",children:"Medium"}),(0,u.jsx)("option",{value:"high",children:"High"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(G,{children:"Category"}),(0,u.jsxs)(Q,{value:ue.category,onChange:e=>he({...ue,category:e.target.value}),children:[(0,u.jsx)("option",{value:"general",children:"General"}),(0,u.jsx)("option",{value:"technical",children:"Technical"}),(0,u.jsx)("option",{value:"billing",children:"Billing"}),(0,u.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,u.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,u.jsxs)(H,{children:[(0,u.jsx)(f,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,u.jsx)(f,{variant:"primary",onClick:async()=>{try{const r={customerId:(null===e||void 0===e?void 0:e.id)||"restaurant-user",customerName:(null===e||void 0===e?void 0:e.name)||"Restaurant User",customerEmail:(null===e||void 0===e?void 0:e.email)||"user@restaurant.com",customerRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"].includes((null===e||void 0===e?void 0:e.role)||"")?"manager":"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)?"restaurant":"staff",restaurantId:fe,restaurantName:"IOI Mall Food Court",subject:ue.subject,description:ue.description,status:"open",priority:ue.priority,category:ue.category,attachments:ge.length>0?ge:void 0};if(!(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok)return;{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),i=r.data||r;t(i),ve(i)}de(!1)}}catch(r){return}he({subject:"",description:"",priority:"medium",category:"general"}),me([])},disabled:!ue.subject||!ue.description,children:"Create Ticket"})]})]})}),le&&pe&&(0,u.jsx)(I,{onClick:()=>ce(!1),children:(0,u.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(U,{children:[(0,u.jsx)(P,{children:"Ticket Details"}),(0,u.jsx)(q,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,u.jsx)(Z,{children:(0,u.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(G,{children:"Ticket Number"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:pe.ticketNumber})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(G,{children:"Status"}),(0,u.jsx)("div",{style:{padding:"8px 0"},children:(0,u.jsx)(T,{status:pe.status,children:pe.status})})]})]}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(G,{children:"Priority"}),(0,u.jsx)("div",{style:{padding:"8px 0"},children:(0,u.jsx)(S,{priority:pe.priority,children:pe.priority})})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(G,{children:"Category"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:pe.category.replace("-"," ")})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(G,{children:"Customer Information"}),(0,u.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,u.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[pe.customerName,(0,u.jsx)(B,{role:pe.customerRole,style:{marginLeft:"8px"},children:pe.customerRole})]}),(0,u.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:pe.customerEmail})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(G,{children:"Subject"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:pe.subject})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(G,{children:"Description"}),(0,u.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:pe.description})]}),(null===pe||void 0===pe?void 0:pe.attachments)&&pe.attachments.length>0&&(0,u.jsx)(p.A,{attachments:pe.attachments}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(G,{children:"Created At"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:pe.createdAt})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(G,{children:"Last Updated"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:pe.updatedAt})]})]}),pe.assignedTo&&(0,u.jsxs)("div",{children:[(0,u.jsx)(G,{children:"Assigned To"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:pe.assignedTo})]}),(0,u.jsx)(x.A,{entityType:"support_ticket",entityId:pe.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>be(e=>{const r={...e};return r[pe.id]&&(r[pe.id]={...r[pe.id],unread_count:0}),r})})]})}),(0,u.jsx)(H,{children:(0,u.jsx)(f,{variant:"secondary",onClick:()=>ce(!1),children:"Close"})})]})})]})]})})}}}]);