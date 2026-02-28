"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6843],{2488:(e,r,i)=>{i.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});i(9950);var t=i(4752),n=i(4414);const o=t.Ay.div`
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
`,d=e=>{let{children:r,className:i,style:t,...s}=e;return(0,n.jsx)(o,{className:i,style:t,...s,children:r})},l=e=>{let{placeholder:r="Search...",...i}=e;return(0,n.jsx)(s,{placeholder:r,...i})},c=e=>{let{children:r,...i}=e;return(0,n.jsx)(a,{...i,children:r})}},6843:(e,r,i)=>{i.r(r),i.d(r,{default:()=>V});var t=i(9950),n=i(4752),o=i(1367),s=i(2488),a=i(4414);const d=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=n.Ay.div`
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
`,c=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=n.Ay.div`
  display: flex;
  gap: 12px;
`,h=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,u=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,m=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,j=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=n.Ay.div`
  display: grid;
  gap: 20px;
`,y=n.Ay.div`
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
`,f=n.Ay.div`
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
`,S=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,R=n.Ay.span`
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
`,L=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,$=n.Ay.div`
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
`,I=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,O=n.Ay.button`
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
`,U=n.Ay.div`
  padding: 24px;
`,q=n.Ay.div`
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
`,H=n.Ay.div`
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
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,G=n.Ay.select`
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
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,V=()=>{const{user:e}=(0,o.As)(),[r,i]=(0,t.useState)([]),[n,V]=(0,t.useState)(""),[K,X]=(0,t.useState)("all"),[Z,_]=(0,t.useState)("all"),[ee,re]=(0,t.useState)("all"),[ie,te]=(0,t.useState)("all"),[ne,oe]=(0,t.useState)("all"),[se,ae]=(0,t.useState)(!1),[de,le]=(0,t.useState)(!1),[ce,pe]=(0,t.useState)(null),[xe,he]=(0,t.useState)({subject:"",description:"",priority:"medium",category:"general"});(0,t.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),t=r.data||r;i(t)}}catch(e){}};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[e]);const ue=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(n.toLowerCase()),i="all"===K||e.status===K,t="all"===Z||e.priority===Z,o="all"===ee||e.category===ee,s="all"===ie||e.customerRole===ie,a="all"===ne||e.restaurantId===ne;return r&&i&&t&&o&&s&&a}),ge=r.length,me=r.filter(e=>"open"===e.status).length,je=r.filter(e=>"in-progress"===e.status).length,be=r.filter(e=>"resolved"===e.status).length,ye=Math.round(r.reduce((e,r)=>e+r.responseTime,0)/r.length),ve=e=>new Date(e).toLocaleString("en-MY"),fe=e=>{const r=Math.floor(e/60),i=e%60;return r>0?`${r}h ${i}m`:`${i}m`};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(p,{children:"Support Tickets"}),(0,a.jsxs)(x,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:()=>{const e=ue.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,e.restaurantName||"N/A",`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Restaurant","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),i=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),t=URL.createObjectURL(i),n=document.createElement("a");n.href=t,n.download=`manager-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(t)},children:"Export"}),(0,a.jsx)(h,{variant:"primary",onClick:()=>{ae(!0)},children:"Create Ticket"})]})]}),(0,a.jsxs)(c,{children:[(0,a.jsxs)(u,{children:[(0,a.jsxs)(g,{color:"#059669",children:[(0,a.jsx)(m,{children:ge}),(0,a.jsx)(j,{children:"Total Tickets"})]}),(0,a.jsxs)(g,{color:"#D97706",children:[(0,a.jsx)(m,{children:me}),(0,a.jsx)(j,{children:"Open Tickets"})]}),(0,a.jsxs)(g,{color:"#2563EB",children:[(0,a.jsx)(m,{children:je}),(0,a.jsx)(j,{children:"In Progress"})]}),(0,a.jsxs)(g,{color:"#7C3AED",children:[(0,a.jsx)(m,{children:be}),(0,a.jsx)(j,{children:"Resolved"})]}),(0,a.jsxs)(g,{color:"#DC2626",children:[(0,a.jsx)(m,{children:fe(ye)}),(0,a.jsx)(j,{children:"Avg Response Time"})]})]}),(0,a.jsxs)(s.Qn,{children:[(0,a.jsx)(s.DO,{type:"text",placeholder:"Search tickets, customers, or restaurants...",value:n,onChange:e=>V(e.target.value)}),(0,a.jsxs)(s.Jt,{value:K,onChange:e=>X(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]}),(0,a.jsxs)(s.Jt,{value:Z,onChange:e=>_(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]}),(0,a.jsxs)(s.Jt,{value:ie,onChange:e=>te(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Roles"}),(0,a.jsx)("option",{value:"manager",children:"Manager"}),(0,a.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,a.jsx)("option",{value:"staff",children:"Staff"})]}),(0,a.jsxs)(s.Jt,{value:ne,onChange:e=>oe(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Restaurants"}),[{id:"rest-001",name:"Sunway Food Court"},{id:"rest-002",name:"IOI Mall Food Court"},{id:"rest-003",name:"Pavilion Food Hub"},{id:"rest-004",name:"Mid Valley Dining"},{id:"rest-005",name:"Single Restaurant"}].map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,a.jsxs)(s.Jt,{value:ee,onChange:e=>re(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Categories"}),(0,a.jsx)("option",{value:"technical",children:"Technical"}),(0,a.jsx)("option",{value:"billing",children:"Billing"}),(0,a.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,a.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,a.jsx)("option",{value:"general",children:"General"})]})]}),(0,a.jsx)(b,{children:ue.map(e=>(0,a.jsxs)(y,{children:[(0,a.jsxs)(v,{children:[(0,a.jsxs)(f,{children:[(0,a.jsx)(w,{children:e.ticketNumber}),(0,a.jsx)(F,{children:e.subject}),(0,a.jsxs)(A,{children:[(0,a.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,a.jsx)(C,{role:e.customerRole,children:e.customerRole})]}),e.restaurantName&&(0,a.jsx)("div",{style:{marginTop:"4px",fontWeight:"500"},children:e.restaurantName})]})]}),(0,a.jsxs)(k,{children:[(0,a.jsx)(E,{status:e.status,children:e.status}),(0,a.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(T,{children:e.description}),e.replyMessage&&(0,a.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,a.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",ve(e.repliedAt||"")]}),(0,a.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,a.jsxs)(z,{children:[(0,a.jsxs)(S,{children:[(0,a.jsx)(R,{children:"Created"}),(0,a.jsx)(D,{children:ve(e.createdAt)})]}),(0,a.jsxs)(S,{children:[(0,a.jsx)(R,{children:"Category"}),(0,a.jsx)(D,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,a.jsxs)(S,{children:[(0,a.jsx)(R,{children:"Response Time"}),(0,a.jsx)(D,{children:fe(e.responseTime)})]}),e.assignedTo&&(0,a.jsxs)(S,{children:[(0,a.jsx)(R,{children:"Assigned To"}),(0,a.jsx)(D,{children:e.assignedTo})]})]}),(0,a.jsx)(N,{children:(0,a.jsx)(L,{variant:"primary",onClick:()=>(e=>{pe(e),le(!0)})(e),children:"View Details"})})]},e.id))}),se&&(0,a.jsx)($,{onClick:()=>ae(!1),children:(0,a.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(M,{children:[(0,a.jsx)(I,{children:"Create Support Ticket"}),(0,a.jsx)(O,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,a.jsxs)(U,{children:[(0,a.jsxs)(H,{children:[(0,a.jsx)(W,{children:"Subject *"}),(0,a.jsx)(Y,{type:"text",value:xe.subject,onChange:e=>he({...xe,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,a.jsxs)(H,{children:[(0,a.jsx)(W,{children:"Description *"}),(0,a.jsx)(Q,{value:xe.description,onChange:e=>he({...xe,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,a.jsxs)(J,{children:[(0,a.jsxs)(H,{children:[(0,a.jsx)(W,{children:"Priority"}),(0,a.jsxs)(G,{value:xe.priority,onChange:e=>he({...xe,priority:e.target.value}),children:[(0,a.jsx)("option",{value:"low",children:"Low"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(H,{children:[(0,a.jsx)(W,{children:"Category"}),(0,a.jsxs)(G,{value:xe.category,onChange:e=>he({...xe,category:e.target.value}),children:[(0,a.jsx)("option",{value:"general",children:"General"}),(0,a.jsx)("option",{value:"technical",children:"Technical"}),(0,a.jsx)("option",{value:"billing",children:"Billing"}),(0,a.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,a.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,a.jsxs)(q,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,a.jsx)(h,{variant:"primary",onClick:async()=>{try{const t={customerId:(null===e||void 0===e?void 0:e.id)||"manager-user",customerName:(null===e||void 0===e?void 0:e.name)||"Manager",customerEmail:(null===e||void 0===e?void 0:e.email)||"manager@company.com",customerRole:"manager",subject:xe.subject,description:xe.description,status:"open",priority:xe.priority,category:xe.category},n=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok)return void alert("Failed to create support ticket. Please try again.");{const e=await n.json(),t=e.data||e;i([t,...r])}}catch(t){return void alert("Error creating support ticket. Please try again.")}ae(!1),he({subject:"",description:"",priority:"medium",category:"general"})},disabled:!xe.subject||!xe.description,children:"Create Ticket"})]})]})}),de&&ce&&(0,a.jsx)($,{onClick:()=>le(!1),children:(0,a.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(M,{children:[(0,a.jsx)(I,{children:"Ticket Details"}),(0,a.jsx)(O,{onClick:()=>le(!1),children:"\xd7"})]}),(0,a.jsx)(U,{children:(0,a.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(W,{children:"Ticket Number"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ce.ticketNumber})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(W,{children:"Status"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)(E,{status:ce.status,children:ce.status})})]})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(W,{children:"Priority"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)(B,{priority:ce.priority,children:ce.priority})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(W,{children:"Category"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ce.category.replace("-"," ")})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(W,{children:"Customer Information"}),(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[ce.customerName,(0,a.jsx)(C,{role:ce.customerRole,style:{marginLeft:"8px"},children:ce.customerRole})]}),(0,a.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:ce.customerEmail}),ce.restaurantName&&(0,a.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",marginTop:"4px"},children:ce.restaurantName})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(W,{children:"Subject"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ce.subject})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(W,{children:"Description"}),(0,a.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ce.description})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(W,{children:"Created At"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ce.createdAt})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(W,{children:"Last Updated"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ce.updatedAt})]})]}),ce.assignedTo&&(0,a.jsxs)("div",{children:[(0,a.jsx)(W,{children:"Assigned To"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:ce.assignedTo})]})]})}),(0,a.jsx)(q,{children:(0,a.jsx)(h,{variant:"secondary",onClick:()=>le(!1),children:"Close"})})]})})]})]})})}}}]);