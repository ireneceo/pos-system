"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6843],{2488:(e,r,t)=>{t.d(r,{DO:()=>c,Jt:()=>p,Qn:()=>d});var i=t(8819),n=(t(9950),t(4752)),s=t(4414);const o=n.Ay.div`
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
`,d=e=>{let{children:r,className:t,style:i,...n}=e;return(0,s.jsx)(o,{className:t,style:i,...n,children:r})},c=e=>{let{placeholder:r="Search...",...t}=e;return(0,s.jsx)(a,{placeholder:r,...t})},p=e=>{let{children:r,...t}=e;return(0,s.jsx)(l,{...t,children:r})}},6843:(e,r,t)=>{t.r(r),t.d(r,{default:()=>O});var i=t(8819),n=t(9950),s=t(4752),o=t(1367),a=t(2488),l=t(4302),d=t(7455),c=t(4185),p=t(2674),x=t(4414);const h=s.Ay.div`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":`\n    background: white;\n    color: #6B7280;\n    border: 1px solid ${i.w.colors.border};\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  `}
`,y=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,f=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,w=s.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${i.w.colors.secondary};
  margin-bottom: 4px;
`,b=s.Ay.div`
  font-size: 13px;
  color: ${i.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,C=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,A=s.Ay.div`
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
`,F=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,k=s.Ay.div`
  flex: 1;
`,E=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,R=s.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,B=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,S=s.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.role){case"manager":return"#E0F2FE";case"restaurant":return"#FEF3C7";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"manager":return"#0891B2";case"restaurant":return"#D97706";case"staff":return"#059669";default:return"#6B7280"}}};
`,$=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,N=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,z=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,T=s.Ay.div`
  font-size: 14px;
  color: ${i.w.colors.text.muted};
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
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
`,L=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,I=s.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,q=s.Ay.span`
  color: #374151;
`,O=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,n.useState)([]),[i,s]=(0,n.useState)(""),[O,P]=(0,n.useState)("all"),[U,J]=(0,n.useState)("all"),[H,M]=(0,n.useState)("all"),[Q,W]=(0,n.useState)("all"),[X,Y]=(0,n.useState)(!1),[G,Z]=(0,n.useState)(!1),[_,K]=(0,n.useState)(null),[V,ee]=(0,n.useState)(""),[re,te]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ie,ne]=(0,n.useState)([]);(0,n.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),i=r.data||r;t(i)}}catch(e){}};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[e]);const se=r.filter(e=>{const r=e.subject.toLowerCase().includes(i.toLowerCase())||e.customerName.toLowerCase().includes(i.toLowerCase())||e.ticketNumber.toLowerCase().includes(i.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(i.toLowerCase()),t="all"===O||e.status===O,n="all"===U||e.priority===U,s="all"===H||e.category===H,o="all"===Q||e.customerRole===Q;return r&&t&&n&&s&&o}),oe=r.length,ae=r.filter(e=>"open"===e.status).length,le=r.filter(e=>"in-progress"===e.status).length,de=r.filter(e=>"resolved"===e.status).length,ce=e=>new Date(e).toLocaleString("en-MY");return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(m,{children:"System Inquiry"}),(0,x.jsxs)(j,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>{const e=se.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,e.restaurantName||"N/A",`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Restaurant","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),t=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(t),n=document.createElement("a");n.href=i,n.download=`manager-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,x.jsx)(v,{variant:"primary",onClick:()=>{Y(!0)},children:"Create Inquiry"})]})]}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(y,{children:[(0,x.jsxs)(f,{color:"#059669",children:[(0,x.jsx)(w,{children:oe}),(0,x.jsx)(b,{children:"Total Tickets"})]}),(0,x.jsxs)(f,{color:"#D97706",children:[(0,x.jsx)(w,{children:ae}),(0,x.jsx)(b,{children:"Open Tickets"})]}),(0,x.jsxs)(f,{color:"#2563EB",children:[(0,x.jsx)(w,{children:le}),(0,x.jsx)(b,{children:"In Progress"})]}),(0,x.jsxs)(f,{color:"#7C3AED",children:[(0,x.jsx)(w,{children:de}),(0,x.jsx)(b,{children:"Resolved"})]})]}),(0,x.jsxs)(a.Qn,{children:[(0,x.jsx)(a.DO,{type:"text",placeholder:"Search tickets, customers...",value:i,onChange:e=>s(e.target.value)}),(0,x.jsxs)(a.Jt,{value:O,onChange:e=>P(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"open",children:"Open"}),(0,x.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,x.jsx)("option",{value:"resolved",children:"Resolved"}),(0,x.jsx)("option",{value:"closed",children:"Closed"})]}),(0,x.jsxs)(a.Jt,{value:U,onChange:e=>J(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Priority"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"low",children:"Low"})]}),(0,x.jsxs)(a.Jt,{value:Q,onChange:e=>W(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Roles"}),(0,x.jsx)("option",{value:"manager",children:"Manager"}),(0,x.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,x.jsx)("option",{value:"staff",children:"Staff"})]}),(0,x.jsxs)(a.Jt,{value:H,onChange:e=>M(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Categories"}),(0,x.jsx)("option",{value:"technical",children:"Technical"}),(0,x.jsx)("option",{value:"billing",children:"Billing"}),(0,x.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,x.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,x.jsx)("option",{value:"general",children:"General"})]})]}),(0,x.jsx)(C,{children:se.map(e=>(0,x.jsxs)(A,{onClick:()=>(e=>{K(e),ee(e.status),Z(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(k,{children:[(0,x.jsx)(E,{children:e.ticketNumber}),(0,x.jsx)(R,{children:e.subject}),(0,x.jsxs)(B,{children:[(0,x.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,x.jsx)(S,{role:e.customerRole,children:e.customerRole})]}),e.restaurantName&&(0,x.jsx)("div",{style:{marginTop:"4px",fontWeight:"500"},children:e.restaurantName})]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(N,{status:e.status,children:e.status}),(0,x.jsx)(z,{priority:e.priority,children:e.priority})]})]}),(0,x.jsx)(T,{children:e.description}),(0,x.jsxs)(D,{children:[(0,x.jsxs)(L,{children:[(0,x.jsx)(I,{children:"Created"}),(0,x.jsx)(q,{children:ce(e.createdAt)})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(I,{children:"Category"}),(0,x.jsx)(q,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]})]})]},e.id))}),X&&(0,x.jsx)(p.mH,{onClick:()=>Y(!1),children:(0,x.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(p.rQ,{children:[(0,x.jsx)(p.wt,{children:"Create System Inquiry"}),(0,x.jsx)(p.Jn,{onClick:()=>Y(!1),children:"\xd7"})]}),(0,x.jsxs)(p.cw,{children:[(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Subject *"}),(0,x.jsx)(p.ZQ,{type:"text",value:re.subject,onChange:e=>te({...re,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Description *"}),(0,x.jsx)(p.Lz,{value:re.description,onChange:e=>te({...re,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,x.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,x.jsx)(p.lR,{children:"Attachments"}),(0,x.jsx)(d.A,{files:ie,onChange:ne,maxFiles:5})]}),(0,x.jsxs)(p.fh,{children:[(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Priority"}),(0,x.jsxs)(p.FX,{value:re.priority,onChange:e=>te({...re,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"low",children:"Low"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Category"}),(0,x.jsxs)(p.FX,{value:re.category,onChange:e=>te({...re,category:e.target.value}),children:[(0,x.jsx)("option",{value:"general",children:"General"}),(0,x.jsx)("option",{value:"technical",children:"Technical"}),(0,x.jsx)("option",{value:"billing",children:"Billing"}),(0,x.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,x.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,x.jsxs)(p.jl,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>Y(!1),children:"Cancel"}),(0,x.jsx)(v,{variant:"primary",onClick:async()=>{try{const i={customerId:(null===e||void 0===e?void 0:e.id)||"manager-user",customerName:(null===e||void 0===e?void 0:e.name)||"Manager",customerEmail:(null===e||void 0===e?void 0:e.email)||"manager@company.com",customerRole:"manager",subject:re.subject,description:re.description,status:"open",priority:re.priority,category:re.category,attachments:ie.length>0?ie:void 0},n=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!n.ok)return;{const e=await n.json(),i=e.data||e;t([i,...r])}}catch(i){return}Y(!1),te({subject:"",description:"",priority:"medium",category:"general"}),ne([])},disabled:!re.subject||!re.description,children:"Create Inquiry"})]})]})}),G&&_&&(0,x.jsx)(p.mH,{onClick:()=>Z(!1),children:(0,x.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(p.rQ,{children:[(0,x.jsx)(p.wt,{children:"Inquiry Details"}),(0,x.jsx)(p.Jn,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,x.jsxs)(p.cw,{children:[(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(p.lR,{children:"Ticket Number"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:_.ticketNumber})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(p.lR,{children:"Status"}),(0,x.jsxs)(p.FX,{value:V,onChange:e=>(async e=>{if(_){ee(e);try{(await fetch(`/api/support-tickets/${_.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(t(r=>r.map(r=>r.id===_.id?{...r,status:e}:r)),K(r=>r?{...r,status:e}:null))}catch(r){}}})(e.target.value),children:[(0,x.jsx)("option",{value:"open",children:"Open"}),(0,x.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,x.jsx)("option",{value:"resolved",children:"Resolved"}),(0,x.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(p.lR,{children:"Priority"}),(0,x.jsx)("div",{style:{padding:"8px 0"},children:(0,x.jsx)(z,{priority:_.priority,children:_.priority})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(p.lR,{children:"Category"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:_.category.replace("-"," ")})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(p.lR,{children:"Customer Information"}),(0,x.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[_.customerName,(0,x.jsx)(S,{role:_.customerRole,style:{marginLeft:"8px"},children:_.customerRole})]}),(0,x.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:_.customerEmail}),_.restaurantName&&(0,x.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",marginTop:"4px"},children:_.restaurantName})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(p.lR,{children:"Subject"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:_.subject})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(p.lR,{children:"Description"}),(0,x.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:_.description})]}),(null===_||void 0===_?void 0:_.attachments)&&_.attachments.length>0&&(0,x.jsx)(c.A,{attachments:_.attachments}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(p.lR,{children:"Created At"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ce(_.createdAt)})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(p.lR,{children:"Last Updated"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ce(_.updatedAt)})]})]})]}),(0,x.jsx)(l.A,{entityType:"support_ticket",entityId:_.id,currentUserId:null===e||void 0===e?void 0:e.id})]}),(0,x.jsx)(p.jl,{children:(0,x.jsx)(v,{variant:"secondary",onClick:()=>Z(!1),children:"Close"})})]})})]})]})})}}}]);