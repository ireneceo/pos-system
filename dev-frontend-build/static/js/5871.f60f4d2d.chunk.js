"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2488:(e,i,r)=>{r.d(i,{DO:()=>d,Jt:()=>c,Qn:()=>a});r(9950);var t=r(4752),n=r(4414);const s=t.Ay.div`
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
`,o=t.Ay.input`
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
`,l=t.Ay.select`
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
`,a=e=>{let{children:i,className:r,style:t,...o}=e;return(0,n.jsx)(s,{className:r,style:t,...o,children:i})},d=e=>{let{placeholder:i="Search...",...r}=e;return(0,n.jsx)(o,{placeholder:i,...r})},c=e=>{let{children:i,...r}=e;return(0,n.jsx)(l,{...r,children:i})}},5871:(e,i,r)=>{r.r(i),r.d(i,{default:()=>Q});var t=r(9950),n=r(4752),s=r(2488),o=r(3832),l=r(5665),a=r(4414);const d=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,c=n.Ay.button`
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
`,p=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    gap: 12px;
  }
`,x=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,h=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,u=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,g=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,m=n.Ay.div`
  flex: 1;
`,j=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`,y=n.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
`,v=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,b=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,f=n.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"closed":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"closed":return"#059669";default:return"#6B7280"}}};
`,C=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,k=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,w=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,F=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,A=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,E=n.Ay.span`
  color: #374151;
`,B=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,S=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,T=n.Ay.div`
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
`,D=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,z=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,N=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,$=n.Ay.button`
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
`,R=n.Ay.div`
  padding: 24px;
`,P=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,I=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,O=n.Ay.div`
  margin-bottom: 20px;
`,L=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,M=n.Ay.input`
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
`,W=n.Ay.select`
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
`,H=n.Ay.textarea`
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
`,U=(0,n.Ay)(M)`
  width: 100%;
`,q=n.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`,J=n.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,_=n.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,G=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Y=n.Ay.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 14px;
  color: #059669;

  strong {
    margin-left: 4px;
    color: #047857;
  }
`,Q=()=>{const[e,i]=(0,t.useState)([]),[r,n]=(0,t.useState)("open"),[Q,V]=(0,t.useState)(""),[K,X]=(0,t.useState)("all"),[Z,ee]=(0,t.useState)("all"),[ie,re]=(0,t.useState)("all"),[te,ne]=(0,t.useState)(!1),[se,oe]=(0,t.useState)(!1),[le,ae]=(0,t.useState)(!1),[de,ce]=(0,t.useState)(!1),[pe,xe]=(0,t.useState)(!1),[he,ue]=(0,t.useState)(!1),[ge,me]=(0,t.useState)(null),[je,ye]=(0,t.useState)(""),[ve,be]=(0,t.useState)("in-progress"),[fe,Ce]=(0,t.useState)(""),[ke,we]=(0,t.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[Fe,Ae]=(0,t.useState)([]),[Ee,Be]=(0,t.useState)(""),[Se,Te]=(0,t.useState)([]),[De,ze]=(0,t.useState)(!1),[Ne,$e]=(0,t.useState)(null);(0,t.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),t=r.data||r;i(t)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json(),r=e.data||e;Ae(r)}}catch(e){}})();const r=setInterval(e,1e4);return()=>clearInterval(r)},[]);const Re=e.filter(e=>{const i=e.subject.toLowerCase().includes(Q.toLowerCase())||e.customerName.toLowerCase().includes(Q.toLowerCase())||e.ticketNumber.toLowerCase().includes(Q.toLowerCase()),t="all"===r||e.status===r,n="all"===K||e.status===K,s="all"===Z||e.priority===Z,o="all"===ie||e.category===ie;return i&&t&&n&&s&&o}),Pe=e.length,Ie=e.filter(e=>"open"===e.status).length,Oe=e.filter(e=>"in-progress"===e.status).length,Le=e.filter(e=>"closed"===e.status).length,Me=e.filter(e=>e.responseTime&&e.responseTime>0),We=(Me.length>0&&Math.round(Me.reduce((e,i)=>e+i.responseTime,0)/Me.length),e=>new Date(e).toLocaleString("en-MY")),He=e=>{if(!e||0===e)return"Pending";const i=Math.floor(e/60),r=e%60;return i>0?`${i}h ${r}m`:`${r}m`},Ue=e=>{me(e),ce(!0)},qe=e=>{me(e),ye(e.replyMessage||""),be(e.status),ae(!0)};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(o.mc,{children:[(0,a.jsxs)(o.Y9,{children:[(0,a.jsx)(o.hE,{children:"System Inquiry"}),(0,a.jsxs)(o.ex,{children:[(0,a.jsx)(o.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json();i(r.data||r)}}catch(e){}},children:"Refresh"}),(0,a.jsx)(o.$n,{variant:"secondary",onClick:()=>{const e=Re.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),i=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+i],{type:"text/csv;charset=utf-8"}),t=URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(t)},children:"Export"}),(0,a.jsx)(o.$n,{variant:"primary",onClick:()=>{ne(!0)},children:"Create Ticket"})]})]}),(0,a.jsxs)(o.UC,{children:[(0,a.jsxs)(l.MD,{children:[(0,a.jsxs)(l.hI,{color:"#059669",children:[(0,a.jsx)(l.Os,{children:Pe}),(0,a.jsx)(l.v0,{children:"Total Tickets"}),(0,a.jsx)(l.d1,{children:"All support requests"})]}),(0,a.jsxs)(l.hI,{color:"#D97706",children:[(0,a.jsx)(l.Os,{children:Ie}),(0,a.jsx)(l.v0,{children:"Open Tickets"}),(0,a.jsx)(l.d1,{children:"Awaiting response"})]}),(0,a.jsxs)(l.hI,{color:"#2563EB",children:[(0,a.jsx)(l.Os,{children:Oe}),(0,a.jsx)(l.v0,{children:"In Progress"}),(0,a.jsx)(l.d1,{children:"Currently being handled"})]}),(0,a.jsxs)(l.hI,{color:"#7C3AED",children:[(0,a.jsx)(l.Os,{children:Le}),(0,a.jsx)(l.v0,{children:"Closed"}),(0,a.jsxs)(l.d1,{children:[Pe>0?Math.round(Le/Pe*100):0,"% completion rate"]})]})]}),(0,a.jsxs)(d,{children:[(0,a.jsx)(c,{active:"open"===r,onClick:()=>n("open"),children:"Open"}),(0,a.jsx)(c,{active:"in-progress"===r,onClick:()=>n("in-progress"),children:"In Progress"}),(0,a.jsx)(c,{active:"all"===r,onClick:()=>n("all"),children:"All Tickets"})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{children:(0,a.jsx)(s.DO,{placeholder:"Search tickets...",value:Q,onChange:e=>V(e.target.value)})}),"all"===r&&(0,a.jsx)(x,{children:(0,a.jsxs)(s.Jt,{value:K,onChange:e=>X(e.target.value),style:{maxWidth:"180px"},children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,a.jsx)(x,{children:(0,a.jsxs)(s.Jt,{value:Z,onChange:e=>ee(e.target.value),style:{maxWidth:"180px"},children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]})}),(0,a.jsx)(x,{children:(0,a.jsxs)(s.Jt,{value:ie,onChange:e=>re(e.target.value),style:{maxWidth:"180px"},children:[(0,a.jsx)("option",{value:"all",children:"All Categories"}),(0,a.jsx)("option",{value:"technical",children:"Technical"}),(0,a.jsx)("option",{value:"billing",children:"Billing"}),(0,a.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,a.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,a.jsx)("option",{value:"general",children:"General"})]})})]}),(0,a.jsx)(h,{children:Re.map(e=>(0,a.jsxs)(u,{children:[(0,a.jsxs)(g,{children:[(0,a.jsxs)(m,{children:[(0,a.jsx)(j,{children:e.ticketNumber}),(0,a.jsx)(y,{children:e.subject}),(0,a.jsxs)(v,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,a.jsxs)(b,{children:[(0,a.jsx)(f,{status:e.status,children:e.status}),(0,a.jsx)(C,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(k,{children:e.description}),e.replyMessage&&(0,a.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,a.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",We(e.repliedAt||"")]}),(0,a.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,a.jsxs)(w,{children:[(0,a.jsxs)(F,{children:[(0,a.jsx)(A,{children:"Created"}),(0,a.jsx)(E,{children:We(e.createdAt)})]}),(0,a.jsxs)(F,{children:[(0,a.jsx)(A,{children:"Category"}),(0,a.jsx)(E,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,a.jsxs)(F,{children:[(0,a.jsx)(A,{children:"Response Time"}),(0,a.jsx)(E,{children:e.replyMessage?He(e.responseTime):"Pending"})]})]}),(0,a.jsxs)(B,{children:[(0,a.jsx)(S,{variant:"primary",onClick:()=>(e=>{me(e),oe(!0)})(e),children:"View"}),"closed"!==e.status&&(0,a.jsx)(S,{variant:"primary",onClick:()=>qe(e),children:"Reply"}),(0,a.jsx)(S,{onClick:()=>Ue(e),children:"Add Note"}),e.replyMessage&&"closed"!==e.status&&(0,a.jsx)(S,{onClick:()=>(e=>{me(e),xe(!0)})(e),children:"Close Ticket"}),(0,a.jsx)(S,{variant:"danger",onClick:()=>(e=>{me(e),ue(!0)})(e),children:"Delete"})]})]},e.id))}),te&&(0,a.jsx)(T,{onClick:()=>ne(!1),children:(0,a.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(z,{children:[(0,a.jsx)(N,{children:"Create Support Ticket"}),(0,a.jsx)($,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,a.jsxs)(R,{children:[(0,a.jsxs)(O,{style:{position:"relative"},children:[(0,a.jsx)(L,{children:"Select User *"}),(0,a.jsx)(U,{type:"text",value:Ee,onChange:e=>(e=>{if(Be(e),ze(!0),e.length<1){const e=Fe.slice(0,10);return void Te(e)}const i=Fe.filter(i=>i.full_name&&i.full_name.toLowerCase().includes(e.toLowerCase())||i.username&&i.username.toLowerCase().includes(e.toLowerCase())||i.email&&i.email.toLowerCase().includes(e.toLowerCase()));Te(i.slice(0,10))})(e.target.value),onFocus:()=>{ze(!0),0===Ee.length&&Te(Fe.slice(0,10))},onBlur:()=>setTimeout(()=>ze(!1),200),placeholder:"Search by name, username, or email..."}),De&&Se.length>0&&(0,a.jsx)(q,{children:Se.map(e=>(0,a.jsxs)(J,{onClick:()=>(e=>{$e(e),Be(e.full_name||e.username),ze(!1),we(i=>({...i,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,a.jsx)(_,{children:e.full_name||e.username}),(0,a.jsxs)(G,{children:[e.email," \u2022 ",e.role]})]},e.id))}),Ne&&(0,a.jsxs)(Y,{children:["\u2713 Selected: ",(0,a.jsx)("strong",{children:Ne.full_name||Ne.username})," (",Ne.email,")"]})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(L,{children:"Subject *"}),(0,a.jsx)(M,{type:"text",value:ke.subject,onChange:e=>we({...ke,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(L,{children:"Description *"}),(0,a.jsx)(H,{value:ke.description,onChange:e=>we({...ke,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,a.jsxs)(I,{children:[(0,a.jsxs)(O,{children:[(0,a.jsx)(L,{children:"Priority"}),(0,a.jsxs)(W,{value:ke.priority,onChange:e=>we({...ke,priority:e.target.value}),children:[(0,a.jsx)("option",{value:"low",children:"Low"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(L,{children:"Category"}),(0,a.jsxs)(W,{value:ke.category,onChange:e=>we({...ke,category:e.target.value}),children:[(0,a.jsx)("option",{value:"general",children:"General"}),(0,a.jsx)("option",{value:"technical",children:"Technical"}),(0,a.jsx)("option",{value:"billing",children:"Billing"}),(0,a.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,a.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,a.jsxs)(P,{children:[(0,a.jsx)(o.$n,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,a.jsx)(o.$n,{variant:"primary",onClick:async()=>{if(Ne){try{const r={customerId:ke.customerId,customerName:ke.customerName,customerEmail:ke.customerEmail,customerRole:"System Admin"===Ne.role?"admin":"Restaurant Admin"===Ne.role?"restaurant":["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(Ne.role)?"manager":"staff",subject:ke.subject,description:ke.description,status:"open",priority:ke.priority,category:ke.category},t=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!t.ok)return void alert("Failed to create support ticket. Please try again.");{const r=await t.json(),n=r.data||r;i([n,...e])}}catch(r){return void alert("Error creating support ticket. Please try again.")}ne(!1),we({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),$e(null),Be(""),Te([])}else alert("Please select a user to create ticket for")},disabled:!ke.subject||!ke.description||!Ne,children:"Create Ticket"})]})]})}),se&&ge&&(0,a.jsx)(T,{onClick:()=>oe(!1),children:(0,a.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(z,{children:[(0,a.jsx)(N,{children:"Ticket Details"}),(0,a.jsx)($,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,a.jsx)(R,{children:(0,a.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Ticket Number"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ge.ticketNumber})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Status"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)("span",{style:{padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"open"===ge.status?"#FEF3C7":"in-progress"===ge.status?"#DBEAFE":"#ECFDF5",color:"open"===ge.status?"#D97706":"in-progress"===ge.status?"#1E40AF":"#059669"},children:ge.status})})]})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Priority"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)("span",{style:{padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"urgent"===ge.priority?"#FEE2E2":"high"===ge.priority?"#FEF3C7":"medium"===ge.priority?"#DBEAFE":"#F3F4F6",color:"urgent"===ge.priority?"#DC2626":"high"===ge.priority?"#D97706":"medium"===ge.priority?"#1E40AF":"#6B7280"},children:ge.priority})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Category"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ge.category.replace("-"," ")})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Customer Information"}),(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:ge.customerName}),(0,a.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:ge.customerEmail})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Subject"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ge.subject})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Description"}),(0,a.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ge.description})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Created At"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ge.createdAt})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Last Updated"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ge.updatedAt})]})]}),ge.assignedTo&&(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Assigned To"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:ge.assignedTo})]}),ge.replyMessage&&(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Support Reply"}),(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD",marginTop:"8px"},children:[(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#0369A1",marginBottom:"8px",fontWeight:"600"},children:[ge.repliedBy," \u2022 ",We(ge.repliedAt||"")]}),(0,a.jsx)("div",{style:{color:"#374151",lineHeight:"1.5",whiteSpace:"pre-wrap"},children:ge.replyMessage})]})]}),ge.notes&&ge.notes.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)(L,{children:"Internal Notes (Admin Only)"}),(0,a.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"12px",marginTop:"8px"},children:ge.notes.map(e=>(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#FEF3C7",borderRadius:"8px",border:"1px solid #FCD34D"},children:[(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#92400E",marginBottom:"8px",fontWeight:"600"},children:[e.createdBy," \u2022 ",We(e.createdAt)]}),(0,a.jsx)("div",{style:{color:"#374151",lineHeight:"1.5",whiteSpace:"pre-wrap"},children:e.message})]},e.id))})]})]})}),(0,a.jsxs)(P,{children:[(0,a.jsx)(o.$n,{variant:"secondary",onClick:()=>oe(!1),children:"Close"}),"closed"!==ge.status&&(0,a.jsx)(o.$n,{variant:"primary",onClick:()=>{oe(!1),qe(ge)},children:"Reply"}),(0,a.jsx)(o.$n,{variant:"secondary",onClick:()=>Ue(ge),children:"Add Note"})]})]})}),le&&ge&&(0,a.jsx)(T,{onClick:()=>ae(!1),children:(0,a.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(z,{children:[(0,a.jsxs)(N,{children:["Reply to Ticket ",ge.ticketNumber]}),(0,a.jsx)($,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,a.jsxs)(R,{children:[(0,a.jsx)("div",{style:{marginBottom:"20px"},children:(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:ge.subject}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:["From: ",ge.customerName," (",ge.customerEmail,")"]}),(0,a.jsx)("div",{style:{color:"#374151",lineHeight:"1.5"},children:ge.description})]})}),ge.notes&&ge.notes.length>0&&(0,a.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,a.jsx)(L,{children:"Internal Notes (Admin Only)"}),(0,a.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px",marginTop:"8px"},children:ge.notes.map(e=>(0,a.jsxs)("div",{style:{padding:"10px",backgroundColor:"#FEF3C7",borderRadius:"6px",border:"1px solid #FCD34D"},children:[(0,a.jsxs)("div",{style:{fontSize:"11px",color:"#92400E",marginBottom:"6px",fontWeight:"600"},children:["\ud83d\udcdd ",e.createdBy," \u2022 ",We(e.createdAt)]}),(0,a.jsx)("div",{style:{color:"#374151",fontSize:"13px",lineHeight:"1.4"},children:e.message})]},e.id))})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(L,{children:"Ticket Status"}),(0,a.jsxs)(W,{value:ve,onChange:e=>be(e.target.value),children:[(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(L,{children:"Your Reply"}),(0,a.jsx)(H,{value:je,onChange:e=>ye(e.target.value),placeholder:"Type your reply to the customer...",style:{minHeight:"120px"}})]})]}),(0,a.jsxs)(P,{children:[(0,a.jsx)(o.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,a.jsx)(o.$n,{variant:"primary",onClick:async()=>{if(!je.trim()||!ge)return;const e=new Date(ge.createdAt).getTime(),r=(new Date).getTime(),t=Math.round((r-e)/6e4);try{const e=await fetch(`/api/support-tickets/${ge.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:ve,replyMessage:je,repliedBy:"Support Agent",repliedAt:(new Date).toISOString().replace("T"," ").slice(0,19),responseTime:t>0?t:1,..."closed"===ve&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(!e.ok)return void alert("Failed to send reply. Please try again.");{const r=await e.json(),t=r.data||r;i(e=>e.map(e=>e.id===ge.id?{...e,...t}:e))}}catch(n){return void alert("Error sending reply. Please try again.")}ye(""),ae(!1)},disabled:!je.trim(),children:"Send Reply"})]})]})}),de&&ge&&(0,a.jsx)(T,{onClick:()=>ce(!1),children:(0,a.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(z,{children:[(0,a.jsxs)(N,{children:["Add Note to Ticket ",ge.ticketNumber]}),(0,a.jsx)($,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,a.jsxs)(R,{children:[(0,a.jsx)("div",{style:{marginBottom:"20px"},children:(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:ge.subject}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:["From: ",ge.customerName," (",ge.customerEmail,")"]})]})}),(0,a.jsxs)(O,{children:[(0,a.jsx)(L,{children:"Internal Note (Not visible to customer)"}),(0,a.jsx)(H,{value:fe,onChange:e=>Ce(e.target.value),placeholder:"Add an internal note for your team..."})]})]}),(0,a.jsxs)(P,{children:[(0,a.jsx)(o.$n,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,a.jsx)(o.$n,{variant:"primary",onClick:async()=>{if(!fe.trim()||!ge)return;const e={id:`note-${Date.now()}`,message:fe,createdBy:"System Admin",createdAt:(new Date).toISOString().replace("T"," ").slice(0,19)},r=[...ge.notes||[],e];try{const e=await fetch(`/api/support-tickets/${ge.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({notes:r})});if(!e.ok)return void alert("Failed to add note. Please try again.");{const r=await e.json(),t=r.data||r;i(e=>e.map(e=>e.id===ge.id?{...e,...t}:e))}}catch(t){return void alert("Error adding note. Please try again.")}Ce(""),ce(!1)},disabled:!fe.trim(),children:"Add Note"})]})]})}),pe&&ge&&(0,a.jsx)(T,{onClick:()=>xe(!1),children:(0,a.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(z,{children:[(0,a.jsx)(N,{children:"Close Ticket"}),(0,a.jsx)($,{onClick:()=>xe(!1),children:"\xd7"})]}),(0,a.jsx)(R,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{color:"#0A2540",marginBottom:"12px"},children:"Close This Ticket?"}),(0,a.jsxs)("p",{style:{color:"#6B7280",marginBottom:"20px",lineHeight:"1.5"},children:["This will mark ticket ",(0,a.jsx)("strong",{children:ge.ticketNumber})," as ",(0,a.jsx)("strong",{children:"CLOSED"}),".",(0,a.jsx)("br",{}),"The customer will be notified that their issue has been resolved."]}),(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#ECFDF5",borderRadius:"8px",border:"1px solid #86EFAC",marginBottom:"20px"},children:[(0,a.jsxs)("div",{style:{fontWeight:"600",color:"#065F46",marginBottom:"4px"},children:["Subject: ",ge.subject]}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#047857"},children:["Customer: ",ge.customerName]}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#047857"},children:["Current Status: ",(0,a.jsx)("span",{style:{textTransform:"uppercase",fontWeight:"600"},children:ge.status})]})]})]})}),(0,a.jsxs)(P,{children:[(0,a.jsx)(o.$n,{variant:"secondary",onClick:()=>xe(!1),children:"Cancel"}),(0,a.jsx)(o.$n,{variant:"primary",onClick:()=>{ge&&(i(e=>e.map(e=>e.id===ge.id?{...e,status:"closed",resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}:e)),xe(!1))},children:"Close Ticket"})]})]})}),he&&ge&&(0,a.jsx)(T,{onClick:()=>ue(!1),children:(0,a.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(z,{children:[(0,a.jsx)(N,{children:"Delete Ticket"}),(0,a.jsx)($,{onClick:()=>ue(!1),children:"\xd7"})]}),(0,a.jsx)(R,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{color:"#0A2540",marginBottom:"12px"},children:"Delete This Ticket?"}),(0,a.jsxs)("p",{style:{color:"#6B7280",marginBottom:"20px",lineHeight:"1.5"},children:["This action ",(0,a.jsx)("strong",{children:"cannot be undone"}),". This will permanently delete ticket ",(0,a.jsx)("strong",{children:ge.ticketNumber})," and remove all associated data."]}),(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#FEE2E2",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"20px"},children:[(0,a.jsxs)("div",{style:{fontWeight:"600",color:"#991B1B",marginBottom:"4px"},children:["Subject: ",ge.subject]}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Customer: ",ge.customerName]}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Status: ",(0,a.jsx)("span",{style:{textTransform:"uppercase",fontWeight:"600"},children:ge.status})]})]})]})}),(0,a.jsxs)(P,{children:[(0,a.jsx)(o.$n,{variant:"secondary",onClick:()=>ue(!1),children:"Cancel"}),(0,a.jsx)(o.$n,{variant:"primary",onClick:async()=>{if(ge){try{if(!(await fetch(`/api/support-tickets/${ge.id}`,{method:"DELETE"})).ok)return void alert("Failed to delete support ticket. Please try again.");i(e=>e.filter(e=>e.id!==ge.id))}catch(e){return void alert("Error deleting support ticket. Please try again.")}ue(!1),me(null)}},style:{backgroundColor:"#DC2626",borderColor:"#DC2626"},children:"Delete Permanently"})]})]})})]})]})})}}}]);