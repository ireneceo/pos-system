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
`,d=e=>{let{children:r,className:i,style:t,...s}=e;return(0,n.jsx)(o,{className:i,style:t,...s,children:r})},l=e=>{let{placeholder:r="Search...",...i}=e;return(0,n.jsx)(s,{placeholder:r,...i})},c=e=>{let{children:r,...i}=e;return(0,n.jsx)(a,{...i,children:r})}},6843:(e,r,i)=>{i.r(r),i.d(r,{default:()=>K});var t=i(9950),n=i(4752),o=i(3310),s=i(1367),a=i(2488),d=i(4414);const l=n.Ay.div`
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,j=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=n.Ay.div`
  display: grid;
  gap: 20px;
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
`,f=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=n.Ay.div`
  flex: 1;
`,A=n.Ay.div`
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
`,S=n.Ay.div`
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
`,D=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,N=n.Ay.span`
  color: #374151;
`,L=n.Ay.div`
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
`,P=n.Ay.div`
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
`,M=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,I=n.Ay.div`
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
`,q=n.Ay.div`
  padding: 24px;
`,J=n.Ay.div`
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
`,K=()=>{const{user:e}=(0,s.As)(),[r,i]=(0,t.useState)([]),[n,K]=(0,t.useState)(""),[X,Z]=(0,t.useState)("all"),[_,ee]=(0,t.useState)("all"),[re,ie]=(0,t.useState)("all"),[te,ne]=(0,t.useState)("all"),[oe,se]=(0,t.useState)("all"),[ae,de]=(0,t.useState)(!1),[le,ce]=(0,t.useState)(!1),[pe,xe]=(0,t.useState)(null),[he,ue]=(0,t.useState)({subject:"",description:"",priority:"medium",category:"general"});(0,t.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),t=r.data||r;i(t)}}catch(e){}};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[e]);const ge=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(n.toLowerCase()),i="all"===X||e.status===X,t="all"===_||e.priority===_,o="all"===re||e.category===re,s="all"===te||e.customerRole===te,a="all"===oe||e.restaurantId===oe;return r&&i&&t&&o&&s&&a}),me=r.length,je=r.filter(e=>"open"===e.status).length,be=r.filter(e=>"in-progress"===e.status).length,ye=r.filter(e=>"resolved"===e.status).length,ve=Math.round(r.reduce((e,r)=>e+r.responseTime,0)/r.length),fe=e=>new Date(e).toLocaleString("en-MY"),we=e=>{const r=Math.floor(e/60),i=e%60;return r>0?`${r}h ${i}m`:`${i}m`};return(0,d.jsx)(o.A,{children:(0,d.jsxs)(l,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(x,{children:"Support Tickets"}),(0,d.jsxs)(h,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>{const e=ge.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,e.restaurantName||"N/A",`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Restaurant","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),i=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),t=URL.createObjectURL(i),n=document.createElement("a");n.href=t,n.download=`manager-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(t)},children:"Export"}),(0,d.jsx)(u,{variant:"primary",onClick:()=>{de(!0)},children:"Create Ticket"})]})]}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(g,{children:[(0,d.jsxs)(m,{color:"#059669",children:[(0,d.jsx)(j,{children:me}),(0,d.jsx)(b,{children:"Total Tickets"})]}),(0,d.jsxs)(m,{color:"#D97706",children:[(0,d.jsx)(j,{children:je}),(0,d.jsx)(b,{children:"Open Tickets"})]}),(0,d.jsxs)(m,{color:"#2563EB",children:[(0,d.jsx)(j,{children:be}),(0,d.jsx)(b,{children:"In Progress"})]}),(0,d.jsxs)(m,{color:"#7C3AED",children:[(0,d.jsx)(j,{children:ye}),(0,d.jsx)(b,{children:"Resolved"})]}),(0,d.jsxs)(m,{color:"#DC2626",children:[(0,d.jsx)(j,{children:we(ve)}),(0,d.jsx)(b,{children:"Avg Response Time"})]})]}),(0,d.jsxs)(a.Qn,{children:[(0,d.jsx)(a.DO,{type:"text",placeholder:"Search tickets, customers, or restaurants...",value:n,onChange:e=>K(e.target.value)}),(0,d.jsxs)(a.Jt,{value:X,onChange:e=>Z(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]}),(0,d.jsxs)(a.Jt,{value:_,onChange:e=>ee(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Priority"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"low",children:"Low"})]}),(0,d.jsxs)(a.Jt,{value:te,onChange:e=>ne(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Roles"}),(0,d.jsx)("option",{value:"manager",children:"Manager"}),(0,d.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,d.jsx)("option",{value:"staff",children:"Staff"})]}),(0,d.jsxs)(a.Jt,{value:oe,onChange:e=>se(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Restaurants"}),[{id:"rest-001",name:"Sunway Food Court"},{id:"rest-002",name:"IOI Mall Food Court"},{id:"rest-003",name:"Pavilion Food Hub"},{id:"rest-004",name:"Mid Valley Dining"},{id:"rest-005",name:"Single Restaurant"}].map(e=>(0,d.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,d.jsxs)(a.Jt,{value:re,onChange:e=>ie(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Categories"}),(0,d.jsx)("option",{value:"technical",children:"Technical"}),(0,d.jsx)("option",{value:"billing",children:"Billing"}),(0,d.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,d.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,d.jsx)("option",{value:"general",children:"General"})]})]}),(0,d.jsx)(y,{children:ge.map(e=>(0,d.jsxs)(v,{children:[(0,d.jsxs)(f,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{children:e.ticketNumber}),(0,d.jsx)(F,{children:e.subject}),(0,d.jsxs)(C,{children:[(0,d.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,d.jsx)(k,{role:e.customerRole,children:e.customerRole})]}),e.restaurantName&&(0,d.jsx)("div",{style:{marginTop:"4px",fontWeight:"500"},children:e.restaurantName})]})]}),(0,d.jsxs)(E,{children:[(0,d.jsx)(B,{status:e.status,children:e.status}),(0,d.jsx)(T,{priority:e.priority,children:e.priority})]})]}),(0,d.jsx)(z,{children:e.description}),e.replyMessage&&(0,d.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,d.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",fe(e.repliedAt||"")]}),(0,d.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,d.jsxs)(S,{children:[(0,d.jsxs)(R,{children:[(0,d.jsx)(D,{children:"Created"}),(0,d.jsx)(N,{children:fe(e.createdAt)})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(D,{children:"Category"}),(0,d.jsx)(N,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(D,{children:"Response Time"}),(0,d.jsx)(N,{children:we(e.responseTime)})]}),e.assignedTo&&(0,d.jsxs)(R,{children:[(0,d.jsx)(D,{children:"Assigned To"}),(0,d.jsx)(N,{children:e.assignedTo})]})]}),(0,d.jsx)(L,{children:(0,d.jsx)($,{variant:"primary",onClick:()=>(e=>{xe(e),ce(!0)})(e),children:"View Details"})})]},e.id))}),ae&&(0,d.jsx)(P,{onClick:()=>de(!1),children:(0,d.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(I,{children:[(0,d.jsx)(O,{children:"Create Support Ticket"}),(0,d.jsx)(U,{onClick:()=>de(!1),children:"\xd7"})]}),(0,d.jsxs)(q,{children:[(0,d.jsxs)(W,{children:[(0,d.jsx)(Y,{children:"Subject *"}),(0,d.jsx)(G,{type:"text",value:he.subject,onChange:e=>ue({...he,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,d.jsxs)(W,{children:[(0,d.jsx)(Y,{children:"Description *"}),(0,d.jsx)(V,{value:he.description,onChange:e=>ue({...he,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,d.jsxs)(H,{children:[(0,d.jsxs)(W,{children:[(0,d.jsx)(Y,{children:"Priority"}),(0,d.jsxs)(Q,{value:he.priority,onChange:e=>ue({...he,priority:e.target.value}),children:[(0,d.jsx)("option",{value:"low",children:"Low"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,d.jsxs)(W,{children:[(0,d.jsx)(Y,{children:"Category"}),(0,d.jsxs)(Q,{value:he.category,onChange:e=>ue({...he,category:e.target.value}),children:[(0,d.jsx)("option",{value:"general",children:"General"}),(0,d.jsx)("option",{value:"technical",children:"Technical"}),(0,d.jsx)("option",{value:"billing",children:"Billing"}),(0,d.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,d.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,d.jsx)(u,{variant:"primary",onClick:async()=>{try{const t={customerId:(null===e||void 0===e?void 0:e.id)||"manager-user",customerName:(null===e||void 0===e?void 0:e.name)||"Manager",customerEmail:(null===e||void 0===e?void 0:e.email)||"manager@company.com",customerRole:"manager",subject:he.subject,description:he.description,status:"open",priority:he.priority,category:he.category},n=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok)return void alert("Failed to create support ticket. Please try again.");{const e=await n.json(),t=e.data||e;i([t,...r])}}catch(t){return void alert("Error creating support ticket. Please try again.")}de(!1),ue({subject:"",description:"",priority:"medium",category:"general"})},disabled:!he.subject||!he.description,children:"Create Ticket"})]})]})}),le&&pe&&(0,d.jsx)(P,{onClick:()=>ce(!1),children:(0,d.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(I,{children:[(0,d.jsx)(O,{children:"Ticket Details"}),(0,d.jsx)(U,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,d.jsx)(q,{children:(0,d.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(Y,{children:"Ticket Number"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:pe.ticketNumber})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(Y,{children:"Status"}),(0,d.jsx)("div",{style:{padding:"8px 0"},children:(0,d.jsx)(B,{status:pe.status,children:pe.status})})]})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(Y,{children:"Priority"}),(0,d.jsx)("div",{style:{padding:"8px 0"},children:(0,d.jsx)(T,{priority:pe.priority,children:pe.priority})})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(Y,{children:"Category"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:pe.category.replace("-"," ")})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(Y,{children:"Customer Information"}),(0,d.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[pe.customerName,(0,d.jsx)(k,{role:pe.customerRole,style:{marginLeft:"8px"},children:pe.customerRole})]}),(0,d.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:pe.customerEmail}),pe.restaurantName&&(0,d.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",marginTop:"4px"},children:pe.restaurantName})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(Y,{children:"Subject"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:pe.subject})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(Y,{children:"Description"}),(0,d.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:pe.description})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(Y,{children:"Created At"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:pe.createdAt})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(Y,{children:"Last Updated"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:pe.updatedAt})]})]}),pe.assignedTo&&(0,d.jsxs)("div",{children:[(0,d.jsx)(Y,{children:"Assigned To"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:pe.assignedTo})]})]})}),(0,d.jsx)(J,{children:(0,d.jsx)(u,{variant:"secondary",onClick:()=>ce(!1),children:"Close"})})]})})]})]})})}}}]);