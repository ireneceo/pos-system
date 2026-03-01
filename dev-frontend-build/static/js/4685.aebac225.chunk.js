"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4685],{2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var i=r(4752),n=r(4414);const s=i.Ay.div`
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
`,d=e=>{let{children:t,className:r,style:i,...o}=e;return(0,n.jsx)(s,{className:r,style:i,...o,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(o,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(a,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});r(9950);var i=r(4752),n=r(4414);const s=i.Ay.div`
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
`,o=i.Ay.button`
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
`,d=e=>{let{children:t,className:r,style:i}=e;return(0,n.jsx)(s,{className:r,style:i,children:t})},l=e=>{let{active:t,onClick:r,children:i,className:s}=e;return(0,n.jsx)(o,{active:t,onClick:r,className:s,children:i})},c=e=>{let{count:t,variant:r="default",showZero:i=!1}=e;return 0!==t||i?(0,n.jsx)(a,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>s});var i=r(9950),n=r(4492);function s(e){const[t,r]=(0,n.ok)(),s=(0,i.useCallback)(()=>t.get("tab")||e,[t,e]),[o,a]=(0,i.useState)(s());return[o,(0,i.useCallback)(e=>{a(e),r({tab:e})},[r])]}},4685:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Y});var i=r(9950),n=r(4752),s=r(2488),o=r(6649),a=r(2597),d=r(2653),l=r(1367),c=r(7455),p=r(4185),x=r(4302),u=r(4414);const h=n.Ay.div`
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
`,f=n.Ay.div`
  display: flex;
  gap: 12px;
`,b=n.Ay.button`
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

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
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
`,w=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=n.Ay.div`
  flex: 1;
`,k=n.Ay.div`
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
`,E=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.role){case"manager":return"#E0F2FE";case"restaurant":return"#FEF3C7";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"manager":return"#0891B2";case"restaurant":return"#D97706";case"staff":return"#059669";default:return"#6B7280"}}};
`,B=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,z=n.Ay.span`
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
`,S=n.Ay.div`
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
`,N=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,D=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,$=n.Ay.span`
  color: #374151;
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
`,L=n.Ay.div`
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
`,_=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,M=n.Ay.button`
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
`,P=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,q=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Z=n.Ay.div`
  margin-bottom: 20px;
`,H=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,J=n.Ay.input`
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
`,G=n.Ay.textarea`
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
`,Y=()=>{const{user:e}=(0,l.As)(),[t,r]=(0,i.useState)([]),[n,Y]=(0,i.useState)(""),[Q,K]=(0,d.M)("all"),[V,X]=(0,i.useState)("all"),[ee,te]=(0,i.useState)("all"),[re,ie]=(0,i.useState)("all"),[ne,se]=(0,i.useState)(!1),[oe,ae]=(0,i.useState)(!1),[de,le]=(0,i.useState)(null),[ce,pe]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[xe,ue]=(0,i.useState)([]),[he,ge]=(0,i.useState)({}),me=(null===e||void 0===e?void 0:e.restaurantId)||2,je=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ge(t)}}}catch(t){console.error("Error fetching unread counts:",t)}};(0,i.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json(),i=t.data||t;r(i),je(i)}}catch(e){}})()},[e]);const fe=t.filter(e=>{const t=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase()),r="all"===Q||e.status===Q,i="all"===V||e.priority===V,s="all"===ee||e.category===ee,o="all"===re||e.customerRole===re;return t&&r&&i&&s&&o}),be=t.length,ye=t.filter(e=>"open"===e.status).length,ve=t.filter(e=>"in-progress"===e.status).length,we=t.filter(e=>"resolved"===e.status).length,Fe=e=>new Date(e).toLocaleString("en-MY"),ke=e=>{const t=Math.floor(e/60),r=e%60;return t>0?`${t}h ${r}m`:`${r}m`};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(h,{children:[(0,u.jsxs)(g,{children:[(0,u.jsx)(j,{children:"Support Tickets"}),(0,u.jsxs)(f,{children:[(0,u.jsx)(b,{variant:"secondary",onClick:()=>{const e=fe.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),t=[["Ticket Number","Customer Name","Customer Email","Customer Role","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(r),n=document.createElement("a");n.href=i,n.download=`restaurant-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,u.jsx)(b,{variant:"primary",onClick:()=>{se(!0)},children:"Create Ticket"})]})]}),(0,u.jsxs)(m,{children:[(0,u.jsxs)(o.MD,{children:[(0,u.jsxs)(o.hI,{color:"#635BFF",children:[(0,u.jsx)(o.Os,{children:be}),(0,u.jsx)(o.v0,{children:"Total Tickets"})]}),(0,u.jsxs)(o.hI,{color:"#F59E0B",children:[(0,u.jsx)(o.Os,{children:ye}),(0,u.jsx)(o.v0,{children:"Open Tickets"})]}),(0,u.jsxs)(o.hI,{color:"#3B82F6",children:[(0,u.jsx)(o.Os,{children:ve}),(0,u.jsx)(o.v0,{children:"In Progress"})]}),(0,u.jsxs)(o.hI,{color:"#10B981",children:[(0,u.jsx)(o.Os,{children:we}),(0,u.jsx)(o.v0,{children:"Resolved"})]})]}),(0,u.jsxs)(a.tU,{children:[(0,u.jsxs)(a.oz,{active:"all"===Q,onClick:()=>K("all"),children:["All ",(0,u.jsx)(a.Ex,{count:be,showZero:!0})]}),(0,u.jsxs)(a.oz,{active:"open"===Q,onClick:()=>K("open"),children:["Open ",(0,u.jsx)(a.Ex,{count:ye,showZero:!0})]}),(0,u.jsxs)(a.oz,{active:"in-progress"===Q,onClick:()=>K("in-progress"),children:["In Progress ",(0,u.jsx)(a.Ex,{count:ve,showZero:!0})]}),(0,u.jsxs)(a.oz,{active:"resolved"===Q,onClick:()=>K("resolved"),children:["Resolved ",(0,u.jsx)(a.Ex,{count:we,showZero:!0})]}),(0,u.jsxs)(a.oz,{active:"closed"===Q,onClick:()=>K("closed"),children:["Closed ",(0,u.jsx)(a.Ex,{count:t.filter(e=>"closed"===e.status).length,showZero:!0})]})]}),(0,u.jsxs)(s.Qn,{children:[(0,u.jsx)(s.DO,{placeholder:"Search tickets...",value:n,onChange:e=>Y(e.target.value)}),(0,u.jsxs)(s.Jt,{value:V,onChange:e=>X(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Priority"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"}),(0,u.jsx)("option",{value:"high",children:"High"}),(0,u.jsx)("option",{value:"medium",children:"Medium"}),(0,u.jsx)("option",{value:"low",children:"Low"})]}),(0,u.jsxs)(s.Jt,{value:re,onChange:e=>ie(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Roles"}),(0,u.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,u.jsx)("option",{value:"staff",children:"Staff"})]}),(0,u.jsxs)(s.Jt,{value:ee,onChange:e=>te(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Categories"}),(0,u.jsx)("option",{value:"technical",children:"Technical"}),(0,u.jsx)("option",{value:"billing",children:"Billing"}),(0,u.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,u.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,u.jsx)("option",{value:"general",children:"General"})]})]}),(0,u.jsx)(y,{children:fe.map(e=>(0,u.jsxs)(v,{onClick:()=>(e=>{le(e),ae(!0)})(e),style:{cursor:"pointer"},children:[(0,u.jsxs)(w,{children:[(0,u.jsxs)(F,{children:[(0,u.jsx)(k,{children:e.ticketNumber}),(0,u.jsx)(A,{children:e.subject}),(0,u.jsx)(C,{children:(0,u.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,u.jsx)(E,{role:e.customerRole,children:e.customerRole})]})})]}),(0,u.jsxs)(B,{children:[(0,u.jsx)(z,{status:e.status,children:e.status}),(0,u.jsx)(T,{priority:e.priority,children:e.priority})]})]}),(0,u.jsx)(S,{children:e.description}),e.replyMessage&&(0,u.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,u.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",Fe(e.repliedAt||"")]}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,u.jsxs)(R,{children:[(0,u.jsxs)(N,{children:[(0,u.jsx)(D,{children:"Created"}),(0,u.jsx)($,{children:Fe(e.createdAt)})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)(D,{children:"Category"}),(0,u.jsx)($,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)(D,{children:"Response Time"}),(0,u.jsx)($,{children:ke(e.responseTime)})]}),e.assignedTo&&(0,u.jsxs)(N,{children:[(0,u.jsx)(D,{children:"Assigned To"}),(0,u.jsx)($,{children:e.assignedTo})]}),he[e.id]&&(0,u.jsx)(N,{children:(0,u.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",he[e.id].total_comments,he[e.id].unread_count>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[he[e.id].unread_count," new"]})]})})]})]},e.id))}),ne&&(0,u.jsx)(I,{onClick:()=>se(!1),children:(0,u.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(O,{children:[(0,u.jsx)(_,{children:"Create Support Ticket"}),(0,u.jsx)(M,{onClick:()=>se(!1),children:"\xd7"})]}),(0,u.jsxs)(U,{children:[(0,u.jsxs)(Z,{children:[(0,u.jsx)(H,{children:"Subject *"}),(0,u.jsx)(J,{type:"text",value:ce.subject,onChange:e=>pe({...ce,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,u.jsxs)(Z,{children:[(0,u.jsx)(H,{children:"Description *"}),(0,u.jsx)(G,{value:ce.description,onChange:e=>pe({...ce,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,u.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,u.jsx)(H,{children:"Attachments"}),(0,u.jsx)(c.A,{files:xe,onChange:ue,maxFiles:5})]}),(0,u.jsxs)(q,{children:[(0,u.jsxs)(Z,{children:[(0,u.jsx)(H,{children:"Priority"}),(0,u.jsxs)(W,{value:ce.priority,onChange:e=>pe({...ce,priority:e.target.value}),children:[(0,u.jsx)("option",{value:"low",children:"Low"}),(0,u.jsx)("option",{value:"medium",children:"Medium"}),(0,u.jsx)("option",{value:"high",children:"High"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,u.jsxs)(Z,{children:[(0,u.jsx)(H,{children:"Category"}),(0,u.jsxs)(W,{value:ce.category,onChange:e=>pe({...ce,category:e.target.value}),children:[(0,u.jsx)("option",{value:"general",children:"General"}),(0,u.jsx)("option",{value:"technical",children:"Technical"}),(0,u.jsx)("option",{value:"billing",children:"Billing"}),(0,u.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,u.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,u.jsxs)(P,{children:[(0,u.jsx)(b,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,u.jsx)(b,{variant:"primary",onClick:async()=>{try{const t={customerId:(null===e||void 0===e?void 0:e.id)||"restaurant-user",customerName:(null===e||void 0===e?void 0:e.name)||"Restaurant User",customerEmail:(null===e||void 0===e?void 0:e.email)||"user@restaurant.com",customerRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"].includes((null===e||void 0===e?void 0:e.role)||"")?"manager":"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)?"restaurant":"staff",restaurantId:me,restaurantName:"IOI Mall Food Court",subject:ce.subject,description:ce.description,status:"open",priority:ce.priority,category:ce.category,attachments:xe.length>0?xe:void 0};if(!(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok)return;{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json(),i=t.data||t;r(i),je(i)}se(!1)}}catch(t){return}pe({subject:"",description:"",priority:"medium",category:"general"}),ue([])},disabled:!ce.subject||!ce.description,children:"Create Ticket"})]})]})}),oe&&de&&(0,u.jsx)(I,{onClick:()=>ae(!1),children:(0,u.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(O,{children:[(0,u.jsx)(_,{children:"Ticket Details"}),(0,u.jsx)(M,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,u.jsx)(U,{children:(0,u.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(H,{children:"Ticket Number"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:de.ticketNumber})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(H,{children:"Status"}),(0,u.jsx)("div",{style:{padding:"8px 0"},children:(0,u.jsx)(z,{status:de.status,children:de.status})})]})]}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(H,{children:"Priority"}),(0,u.jsx)("div",{style:{padding:"8px 0"},children:(0,u.jsx)(T,{priority:de.priority,children:de.priority})})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(H,{children:"Category"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:de.category.replace("-"," ")})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(H,{children:"Customer Information"}),(0,u.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,u.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[de.customerName,(0,u.jsx)(E,{role:de.customerRole,style:{marginLeft:"8px"},children:de.customerRole})]}),(0,u.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:de.customerEmail})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(H,{children:"Subject"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:de.subject})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(H,{children:"Description"}),(0,u.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:de.description})]}),(null===de||void 0===de?void 0:de.attachments)&&de.attachments.length>0&&(0,u.jsx)(p.A,{attachments:de.attachments}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(H,{children:"Created At"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:de.createdAt})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(H,{children:"Last Updated"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:de.updatedAt})]})]}),de.assignedTo&&(0,u.jsxs)("div",{children:[(0,u.jsx)(H,{children:"Assigned To"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:de.assignedTo})]}),(0,u.jsx)(x.A,{entityType:"support_ticket",entityId:de.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ge(e=>{const t={...e};return t[de.id]&&(t[de.id]={...t[de.id],unread_count:0}),t})})]})}),(0,u.jsx)(P,{children:(0,u.jsx)(b,{variant:"secondary",onClick:()=>ae(!1),children:"Close"})})]})})]})]})})}}}]);