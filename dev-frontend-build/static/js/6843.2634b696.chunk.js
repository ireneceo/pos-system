"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6843],{2488:(e,r,t)=>{t.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});t(9950);var i=t(4752),n=t(4414);const o=i.Ay.div`
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
`,d=e=>{let{children:r,className:t,style:i,...s}=e;return(0,n.jsx)(o,{className:t,style:i,...s,children:r})},l=e=>{let{placeholder:r="Search...",...t}=e;return(0,n.jsx)(s,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,n.jsx)(a,{...t,children:r})}},6843:(e,r,t)=>{t.r(r),t.d(r,{default:()=>K});var i=t(9950),n=t(4752),o=t(1367),s=t(2488),a=t(4302),d=t(7455),l=t(4185),c=t(4414);const p=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,x=n.Ay.div`
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
`,h=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,u=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=n.Ay.div`
  display: flex;
  gap: 12px;
`,m=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,j=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,f=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,w=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,A=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=n.Ay.div`
  flex: 1;
`,C=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
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
`,S=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,N=n.Ay.span`
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
  word-break: break-word;
`,T=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,D=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,L=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=n.Ay.span`
  color: #374151;
`,q=n.Ay.div`
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
`,$=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 800px;
  width: 90%;
  flex-shrink: 0;
`,O=n.Ay.div`
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
`,J=n.Ay.div`
  padding: 24px;
`,M=n.Ay.div`
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
`,W=n.Ay.div`
  margin-bottom: 20px;
`,Y=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,G=n.Ay.input`
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
`,_=n.Ay.textarea`
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
`,K=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,i.useState)([]),[n,K]=(0,i.useState)(""),[V,X]=(0,i.useState)("all"),[Z,ee]=(0,i.useState)("all"),[re,te]=(0,i.useState)("all"),[ie,ne]=(0,i.useState)("all"),[oe,se]=(0,i.useState)(!1),[ae,de]=(0,i.useState)(!1),[le,ce]=(0,i.useState)(null),[pe,xe]=(0,i.useState)(""),[he,ue]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ge,me]=(0,i.useState)([]);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),i=r.data||r;t(i)}}catch(e){}};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[e]);const je=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(n.toLowerCase()),t="all"===V||e.status===V,i="all"===Z||e.priority===Z,o="all"===re||e.category===re,s="all"===ie||e.customerRole===ie;return r&&t&&i&&o&&s}),ye=r.length,fe=r.filter(e=>"open"===e.status).length,be=r.filter(e=>"in-progress"===e.status).length,ve=r.filter(e=>"resolved"===e.status).length,we=e=>new Date(e).toLocaleString("en-MY");return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:"System Inquiry"}),(0,c.jsxs)(g,{children:[(0,c.jsx)(m,{variant:"secondary",onClick:()=>{const e=je.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,e.restaurantName||"N/A",`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Restaurant","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),t=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(t),n=document.createElement("a");n.href=i,n.download=`manager-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,c.jsx)(m,{variant:"primary",onClick:()=>{se(!0)},children:"Create Inquiry"})]})]}),(0,c.jsxs)(h,{children:[(0,c.jsxs)(j,{children:[(0,c.jsxs)(y,{color:"#059669",children:[(0,c.jsx)(f,{children:ye}),(0,c.jsx)(b,{children:"Total Tickets"})]}),(0,c.jsxs)(y,{color:"#D97706",children:[(0,c.jsx)(f,{children:fe}),(0,c.jsx)(b,{children:"Open Tickets"})]}),(0,c.jsxs)(y,{color:"#2563EB",children:[(0,c.jsx)(f,{children:be}),(0,c.jsx)(b,{children:"In Progress"})]}),(0,c.jsxs)(y,{color:"#7C3AED",children:[(0,c.jsx)(f,{children:ve}),(0,c.jsx)(b,{children:"Resolved"})]})]}),(0,c.jsxs)(s.Qn,{children:[(0,c.jsx)(s.DO,{type:"text",placeholder:"Search tickets, customers...",value:n,onChange:e=>K(e.target.value)}),(0,c.jsxs)(s.Jt,{value:V,onChange:e=>X(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"resolved",children:"Resolved"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]}),(0,c.jsxs)(s.Jt,{value:Z,onChange:e=>ee(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Priority"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"low",children:"Low"})]}),(0,c.jsxs)(s.Jt,{value:ie,onChange:e=>ne(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Roles"}),(0,c.jsx)("option",{value:"manager",children:"Manager"}),(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,c.jsx)("option",{value:"staff",children:"Staff"})]}),(0,c.jsxs)(s.Jt,{value:re,onChange:e=>te(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"technical",children:"Technical"}),(0,c.jsx)("option",{value:"billing",children:"Billing"}),(0,c.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,c.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,c.jsx)("option",{value:"general",children:"General"})]})]}),(0,c.jsx)(v,{children:je.map(e=>(0,c.jsxs)(w,{onClick:()=>(e=>{ce(e),xe(e.status),de(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,c.jsxs)(A,{children:[(0,c.jsxs)(F,{children:[(0,c.jsx)(C,{children:e.ticketNumber}),(0,c.jsx)(k,{children:e.subject}),(0,c.jsxs)(E,{children:[(0,c.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,c.jsx)(B,{role:e.customerRole,children:e.customerRole})]}),e.restaurantName&&(0,c.jsx)("div",{style:{marginTop:"4px",fontWeight:"500"},children:e.restaurantName})]})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)(S,{status:e.status,children:e.status}),(0,c.jsx)(N,{priority:e.priority,children:e.priority})]})]}),(0,c.jsx)(R,{children:e.description}),(0,c.jsxs)(T,{children:[(0,c.jsxs)(D,{children:[(0,c.jsx)(L,{children:"Created"}),(0,c.jsx)(I,{children:we(e.createdAt)})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)(L,{children:"Category"}),(0,c.jsx)(I,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]})]})]},e.id))}),oe&&(0,c.jsx)(q,{onClick:()=>se(!1),children:(0,c.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(P,{children:"Create System Inquiry"}),(0,c.jsx)(U,{onClick:()=>se(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Subject *"}),(0,c.jsx)(G,{type:"text",value:he.subject,onChange:e=>ue({...he,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Description *"}),(0,c.jsx)(_,{value:he.description,onChange:e=>ue({...he,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,c.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,c.jsx)(Y,{children:"Attachments"}),(0,c.jsx)(d.A,{files:ge,onChange:me,maxFiles:5})]}),(0,c.jsxs)(H,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Priority"}),(0,c.jsxs)(Q,{value:he.priority,onChange:e=>ue({...he,priority:e.target.value}),children:[(0,c.jsx)("option",{value:"low",children:"Low"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Category"}),(0,c.jsxs)(Q,{value:he.category,onChange:e=>ue({...he,category:e.target.value}),children:[(0,c.jsx)("option",{value:"general",children:"General"}),(0,c.jsx)("option",{value:"technical",children:"Technical"}),(0,c.jsx)("option",{value:"billing",children:"Billing"}),(0,c.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,c.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(m,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,c.jsx)(m,{variant:"primary",onClick:async()=>{try{const i={customerId:(null===e||void 0===e?void 0:e.id)||"manager-user",customerName:(null===e||void 0===e?void 0:e.name)||"Manager",customerEmail:(null===e||void 0===e?void 0:e.email)||"manager@company.com",customerRole:"manager",subject:he.subject,description:he.description,status:"open",priority:he.priority,category:he.category,attachments:ge.length>0?ge:void 0},n=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!n.ok)return;{const e=await n.json(),i=e.data||e;t([i,...r])}}catch(i){return}se(!1),ue({subject:"",description:"",priority:"medium",category:"general"}),me([])},disabled:!he.subject||!he.description,children:"Create Inquiry"})]})]})}),ae&&le&&(0,c.jsx)(q,{onClick:()=>de(!1),children:(0,c.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(P,{children:"Inquiry Details"}),(0,c.jsx)(U,{onClick:()=>de(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(Y,{children:"Ticket Number"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:le.ticketNumber})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(Y,{children:"Status"}),(0,c.jsxs)(Q,{value:pe,onChange:e=>(async e=>{if(le){xe(e);try{(await fetch(`/api/support-tickets/${le.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(t(r=>r.map(r=>r.id===le.id?{...r,status:e}:r)),ce(r=>r?{...r,status:e}:null))}catch(r){}}})(e.target.value),children:[(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"resolved",children:"Resolved"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(Y,{children:"Priority"}),(0,c.jsx)("div",{style:{padding:"8px 0"},children:(0,c.jsx)(N,{priority:le.priority,children:le.priority})})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(Y,{children:"Category"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:le.category.replace("-"," ")})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(Y,{children:"Customer Information"}),(0,c.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,c.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[le.customerName,(0,c.jsx)(B,{role:le.customerRole,style:{marginLeft:"8px"},children:le.customerRole})]}),(0,c.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:le.customerEmail}),le.restaurantName&&(0,c.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",marginTop:"4px"},children:le.restaurantName})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(Y,{children:"Subject"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:le.subject})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(Y,{children:"Description"}),(0,c.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:le.description})]}),(null===le||void 0===le?void 0:le.attachments)&&le.attachments.length>0&&(0,c.jsx)(l.A,{attachments:le.attachments}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(Y,{children:"Created At"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:we(le.createdAt)})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(Y,{children:"Last Updated"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:we(le.updatedAt)})]})]})]}),(0,c.jsx)(a.A,{entityType:"support_ticket",entityId:le.id,currentUserId:null===e||void 0===e?void 0:e.id})]}),(0,c.jsx)(M,{children:(0,c.jsx)(m,{variant:"secondary",onClick:()=>de(!1),children:"Close"})})]})})]})]})})}}}]);