"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6843],{2488:(e,r,t)=>{t.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});t(9950);var i=t(4752),n=t(4414);const s=i.Ay.div`
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
`,o=i.Ay.input`
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
`,d=e=>{let{children:r,className:t,style:i,...o}=e;return(0,n.jsx)(s,{className:t,style:i,...o,children:r})},l=e=>{let{placeholder:r="Search...",...t}=e;return(0,n.jsx)(o,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,n.jsx)(a,{...t,children:r})}},6843:(e,r,t)=>{t.r(r),t.d(r,{default:()=>G});var i=t(9950),n=t(4752),s=t(1367),o=t(2488),a=t(4302),d=t(7455),l=t(4185),c=t(6649),p=t(4414);const x=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=n.Ay.div`
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
`,u=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=n.Ay.div`
  display: flex;
  gap: 12px;
`,j=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,y=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,v=n.Ay.div`
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
`,f=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,b=n.Ay.div`
  flex: 1;
`,w=n.Ay.div`
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
  word-break: break-word;
`,C=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,F=n.Ay.span`
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
`,S=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
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
`,N=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,R=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,D=n.Ay.span`
  color: #374151;
`,T=n.Ay.div`
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
`,I=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 800px;
  width: 90%;
  flex-shrink: 0;
`,L=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,O=n.Ay.h2`
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
`,P=n.Ay.div`
  padding: 24px;
`,$=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,U=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,J=n.Ay.div`
  margin-bottom: 20px;
`,M=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,H=n.Ay.input`
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
`,W=n.Ay.select`
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
`,Y=n.Ay.textarea`
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
`,G=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,i.useState)([]),[n,G]=(0,i.useState)(""),[Q,_]=(0,i.useState)("all"),[K,V]=(0,i.useState)("all"),[X,Z]=(0,i.useState)("all"),[ee,re]=(0,i.useState)("all"),[te,ie]=(0,i.useState)(!1),[ne,se]=(0,i.useState)(!1),[oe,ae]=(0,i.useState)(null),[de,le]=(0,i.useState)(""),[ce,pe]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[xe,he]=(0,i.useState)([]);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),i=r.data||r;t(i)}}catch(e){}};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[e]);const ue=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(n.toLowerCase()),t="all"===Q||e.status===Q,i="all"===K||e.priority===K,s="all"===X||e.category===X,o="all"===ee||e.customerRole===ee;return r&&t&&i&&s&&o}),ge=r.length,me=r.filter(e=>"open"===e.status).length,je=r.filter(e=>"in-progress"===e.status).length,ye=r.filter(e=>"resolved"===e.status).length,ve=e=>new Date(e).toLocaleString("en-MY");return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(g,{children:"System Inquiry"}),(0,p.jsxs)(m,{children:[(0,p.jsx)(j,{variant:"secondary",onClick:()=>{const e=ue.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,e.restaurantName||"N/A",`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Restaurant","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),t=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(t),n=document.createElement("a");n.href=i,n.download=`manager-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,p.jsx)(j,{variant:"primary",onClick:()=>{ie(!0)},children:"Create Inquiry"})]})]}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(c.MD,{children:[(0,p.jsxs)(c.hI,{color:"#059669",children:[(0,p.jsx)(c.Os,{children:ge}),(0,p.jsx)(c.v0,{children:"Total Tickets"})]}),(0,p.jsxs)(c.hI,{color:"#D97706",children:[(0,p.jsx)(c.Os,{children:me}),(0,p.jsx)(c.v0,{children:"Open Tickets"})]}),(0,p.jsxs)(c.hI,{color:"#2563EB",children:[(0,p.jsx)(c.Os,{children:je}),(0,p.jsx)(c.v0,{children:"In Progress"})]}),(0,p.jsxs)(c.hI,{color:"#7C3AED",children:[(0,p.jsx)(c.Os,{children:ye}),(0,p.jsx)(c.v0,{children:"Resolved"})]})]}),(0,p.jsxs)(o.Qn,{children:[(0,p.jsx)(o.DO,{type:"text",placeholder:"Search tickets, customers...",value:n,onChange:e=>G(e.target.value)}),(0,p.jsxs)(o.Jt,{value:Q,onChange:e=>_(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]}),(0,p.jsxs)(o.Jt,{value:K,onChange:e=>V(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priority"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"low",children:"Low"})]}),(0,p.jsxs)(o.Jt,{value:ee,onChange:e=>re(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Roles"}),(0,p.jsx)("option",{value:"manager",children:"Manager"}),(0,p.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,p.jsx)("option",{value:"staff",children:"Staff"})]}),(0,p.jsxs)(o.Jt,{value:X,onChange:e=>Z(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Categories"}),(0,p.jsx)("option",{value:"technical",children:"Technical"}),(0,p.jsx)("option",{value:"billing",children:"Billing"}),(0,p.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,p.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,p.jsx)("option",{value:"general",children:"General"})]})]}),(0,p.jsx)(y,{children:ue.map(e=>(0,p.jsxs)(v,{onClick:()=>(e=>{ae(e),le(e.status),se(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,p.jsxs)(f,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(w,{children:e.ticketNumber}),(0,p.jsx)(A,{children:e.subject}),(0,p.jsxs)(C,{children:[(0,p.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,p.jsx)(F,{role:e.customerRole,children:e.customerRole})]}),e.restaurantName&&(0,p.jsx)("div",{style:{marginTop:"4px",fontWeight:"500"},children:e.restaurantName})]})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)(E,{status:e.status,children:e.status}),(0,p.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)(S,{children:e.description}),(0,p.jsxs)(z,{children:[(0,p.jsxs)(N,{children:[(0,p.jsx)(R,{children:"Created"}),(0,p.jsx)(D,{children:ve(e.createdAt)})]}),(0,p.jsxs)(N,{children:[(0,p.jsx)(R,{children:"Category"}),(0,p.jsx)(D,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]})]})]},e.id))}),te&&(0,p.jsx)(T,{onClick:()=>ie(!1),children:(0,p.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(L,{children:[(0,p.jsx)(O,{children:"Create System Inquiry"}),(0,p.jsx)(q,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,p.jsxs)(P,{children:[(0,p.jsxs)(J,{children:[(0,p.jsx)(M,{children:"Subject *"}),(0,p.jsx)(H,{type:"text",value:ce.subject,onChange:e=>pe({...ce,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,p.jsxs)(J,{children:[(0,p.jsx)(M,{children:"Description *"}),(0,p.jsx)(Y,{value:ce.description,onChange:e=>pe({...ce,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,p.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,p.jsx)(M,{children:"Attachments"}),(0,p.jsx)(d.A,{files:xe,onChange:he,maxFiles:5})]}),(0,p.jsxs)(U,{children:[(0,p.jsxs)(J,{children:[(0,p.jsx)(M,{children:"Priority"}),(0,p.jsxs)(W,{value:ce.priority,onChange:e=>pe({...ce,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"low",children:"Low"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(J,{children:[(0,p.jsx)(M,{children:"Category"}),(0,p.jsxs)(W,{value:ce.category,onChange:e=>pe({...ce,category:e.target.value}),children:[(0,p.jsx)("option",{value:"general",children:"General"}),(0,p.jsx)("option",{value:"technical",children:"Technical"}),(0,p.jsx)("option",{value:"billing",children:"Billing"}),(0,p.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,p.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(j,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,p.jsx)(j,{variant:"primary",onClick:async()=>{try{const i={customerId:(null===e||void 0===e?void 0:e.id)||"manager-user",customerName:(null===e||void 0===e?void 0:e.name)||"Manager",customerEmail:(null===e||void 0===e?void 0:e.email)||"manager@company.com",customerRole:"manager",subject:ce.subject,description:ce.description,status:"open",priority:ce.priority,category:ce.category,attachments:xe.length>0?xe:void 0},n=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!n.ok)return;{const e=await n.json(),i=e.data||e;t([i,...r])}}catch(i){return}ie(!1),pe({subject:"",description:"",priority:"medium",category:"general"}),he([])},disabled:!ce.subject||!ce.description,children:"Create Inquiry"})]})]})}),ne&&oe&&(0,p.jsx)(T,{onClick:()=>se(!1),children:(0,p.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(L,{children:[(0,p.jsx)(O,{children:"Inquiry Details"}),(0,p.jsx)(q,{onClick:()=>se(!1),children:"\xd7"})]}),(0,p.jsxs)(P,{children:[(0,p.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(M,{children:"Ticket Number"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:oe.ticketNumber})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(M,{children:"Status"}),(0,p.jsxs)(W,{value:de,onChange:e=>(async e=>{if(oe){le(e);try{(await fetch(`/api/support-tickets/${oe.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(t(r=>r.map(r=>r.id===oe.id?{...r,status:e}:r)),ae(r=>r?{...r,status:e}:null))}catch(r){}}})(e.target.value),children:[(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(M,{children:"Priority"}),(0,p.jsx)("div",{style:{padding:"8px 0"},children:(0,p.jsx)(B,{priority:oe.priority,children:oe.priority})})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(M,{children:"Category"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:oe.category.replace("-"," ")})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(M,{children:"Customer Information"}),(0,p.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[oe.customerName,(0,p.jsx)(F,{role:oe.customerRole,style:{marginLeft:"8px"},children:oe.customerRole})]}),(0,p.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:oe.customerEmail}),oe.restaurantName&&(0,p.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",marginTop:"4px"},children:oe.restaurantName})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(M,{children:"Subject"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:oe.subject})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(M,{children:"Description"}),(0,p.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:oe.description})]}),(null===oe||void 0===oe?void 0:oe.attachments)&&oe.attachments.length>0&&(0,p.jsx)(l.A,{attachments:oe.attachments}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(M,{children:"Created At"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ve(oe.createdAt)})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(M,{children:"Last Updated"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ve(oe.updatedAt)})]})]})]}),(0,p.jsx)(a.A,{entityType:"support_ticket",entityId:oe.id,currentUserId:null===e||void 0===e?void 0:e.id})]}),(0,p.jsx)($,{children:(0,p.jsx)(j,{variant:"secondary",onClick:()=>se(!1),children:"Close"})})]})})]})]})})}}}]);