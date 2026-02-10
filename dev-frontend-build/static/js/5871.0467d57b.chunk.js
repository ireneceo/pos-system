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
`,a=e=>{let{children:i,className:r,style:t,...o}=e;return(0,n.jsx)(s,{className:r,style:t,...o,children:i})},d=e=>{let{placeholder:i="Search...",...r}=e;return(0,n.jsx)(o,{placeholder:i,...r})},c=e=>{let{children:i,...r}=e;return(0,n.jsx)(l,{...r,children:i})}},5871:(e,i,r)=>{r.r(i),r.d(i,{default:()=>V});var t=r(9950),n=r(4752),s=r(3310),o=r(2488),l=r(3832),a=r(5665),d=r(4414);const c=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,p=n.Ay.button`
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
`,x=n.Ay.div`
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
`,h=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,u=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,g=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,m=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,j=n.Ay.div`
  flex: 1;
`,y=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`,v=n.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
`,b=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,f=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,C=n.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"closed":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"closed":return"#059669";default:return"#6B7280"}}};
`,k=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,w=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,F=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,A=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,E=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,B=n.Ay.span`
  color: #374151;
`,S=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,T=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,D=n.Ay.div`
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
`,z=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,N=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,R=n.Ay.button`
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
`,I=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,O=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,L=n.Ay.div`
  margin-bottom: 20px;
`,M=n.Ay.label`
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
`,H=n.Ay.select`
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
`,U=n.Ay.textarea`
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
`,q=(0,n.Ay)(W)`
  width: 100%;
`,J=n.Ay.div`
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
`,_=n.Ay.div`
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
`,G=n.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Y=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Q=n.Ay.div`
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
`,V=()=>{const[e,i]=(0,t.useState)([]),[r,n]=(0,t.useState)("open"),[V,K]=(0,t.useState)(""),[X,Z]=(0,t.useState)("all"),[ee,ie]=(0,t.useState)("all"),[re,te]=(0,t.useState)("all"),[ne,se]=(0,t.useState)(!1),[oe,le]=(0,t.useState)(!1),[ae,de]=(0,t.useState)(!1),[ce,pe]=(0,t.useState)(!1),[xe,he]=(0,t.useState)(!1),[ue,ge]=(0,t.useState)(!1),[me,je]=(0,t.useState)(null),[ye,ve]=(0,t.useState)(""),[be,fe]=(0,t.useState)("in-progress"),[Ce,ke]=(0,t.useState)(""),[we,Fe]=(0,t.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[Ae,Ee]=(0,t.useState)([]),[Be,Se]=(0,t.useState)(""),[Te,De]=(0,t.useState)([]),[ze,Ne]=(0,t.useState)(!1),[$e,Re]=(0,t.useState)(null);(0,t.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),t=r.data||r;i(t)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json(),r=e.data||e;Ee(r)}}catch(e){}})();const r=setInterval(e,1e4);return()=>clearInterval(r)},[]);const Pe=e.filter(e=>{const i=e.subject.toLowerCase().includes(V.toLowerCase())||e.customerName.toLowerCase().includes(V.toLowerCase())||e.ticketNumber.toLowerCase().includes(V.toLowerCase()),t="all"===r||e.status===r,n="all"===X||e.status===X,s="all"===ee||e.priority===ee,o="all"===re||e.category===re;return i&&t&&n&&s&&o}),Ie=e.length,Oe=e.filter(e=>"open"===e.status).length,Le=e.filter(e=>"in-progress"===e.status).length,Me=e.filter(e=>"closed"===e.status).length,We=e.filter(e=>e.responseTime&&e.responseTime>0),He=(We.length>0&&Math.round(We.reduce((e,i)=>e+i.responseTime,0)/We.length),e=>new Date(e).toLocaleString("en-MY")),Ue=e=>{if(!e||0===e)return"Pending";const i=Math.floor(e/60),r=e%60;return i>0?`${i}h ${r}m`:`${r}m`},qe=e=>{je(e),pe(!0)},Je=e=>{je(e),ve(e.replyMessage||""),fe(e.status),de(!0)};return(0,d.jsx)(s.A,{children:(0,d.jsxs)(l.mc,{children:[(0,d.jsxs)(l.Y9,{children:[(0,d.jsx)(l.hE,{children:"System Inquiry"}),(0,d.jsxs)(l.ex,{children:[(0,d.jsx)(l.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json();i(r.data||r)}}catch(e){}},children:"Refresh"}),(0,d.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=Pe.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),i=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+i],{type:"text/csv;charset=utf-8"}),t=URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(t)},children:"Export"}),(0,d.jsx)(l.$n,{variant:"primary",onClick:()=>{se(!0)},children:"Create Ticket"})]})]}),(0,d.jsxs)(l.UC,{children:[(0,d.jsxs)(a.MD,{children:[(0,d.jsxs)(a.hI,{color:"#059669",children:[(0,d.jsx)(a.Os,{children:Ie}),(0,d.jsx)(a.v0,{children:"Total Tickets"}),(0,d.jsx)(a.d1,{children:"All support requests"})]}),(0,d.jsxs)(a.hI,{color:"#D97706",children:[(0,d.jsx)(a.Os,{children:Oe}),(0,d.jsx)(a.v0,{children:"Open Tickets"}),(0,d.jsx)(a.d1,{children:"Awaiting response"})]}),(0,d.jsxs)(a.hI,{color:"#2563EB",children:[(0,d.jsx)(a.Os,{children:Le}),(0,d.jsx)(a.v0,{children:"In Progress"}),(0,d.jsx)(a.d1,{children:"Currently being handled"})]}),(0,d.jsxs)(a.hI,{color:"#7C3AED",children:[(0,d.jsx)(a.Os,{children:Me}),(0,d.jsx)(a.v0,{children:"Closed"}),(0,d.jsxs)(a.d1,{children:[Ie>0?Math.round(Me/Ie*100):0,"% completion rate"]})]})]}),(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{active:"open"===r,onClick:()=>n("open"),children:"Open"}),(0,d.jsx)(p,{active:"in-progress"===r,onClick:()=>n("in-progress"),children:"In Progress"}),(0,d.jsx)(p,{active:"all"===r,onClick:()=>n("all"),children:"All Tickets"})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(h,{children:(0,d.jsx)(o.DO,{placeholder:"Search tickets...",value:V,onChange:e=>K(e.target.value)})}),"all"===r&&(0,d.jsx)(h,{children:(0,d.jsxs)(o.Jt,{value:X,onChange:e=>Z(e.target.value),style:{maxWidth:"180px"},children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,d.jsx)(h,{children:(0,d.jsxs)(o.Jt,{value:ee,onChange:e=>ie(e.target.value),style:{maxWidth:"180px"},children:[(0,d.jsx)("option",{value:"all",children:"All Priority"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"low",children:"Low"})]})}),(0,d.jsx)(h,{children:(0,d.jsxs)(o.Jt,{value:re,onChange:e=>te(e.target.value),style:{maxWidth:"180px"},children:[(0,d.jsx)("option",{value:"all",children:"All Categories"}),(0,d.jsx)("option",{value:"technical",children:"Technical"}),(0,d.jsx)("option",{value:"billing",children:"Billing"}),(0,d.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,d.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,d.jsx)("option",{value:"general",children:"General"})]})})]}),(0,d.jsx)(u,{children:Pe.map(e=>(0,d.jsxs)(g,{children:[(0,d.jsxs)(m,{children:[(0,d.jsxs)(j,{children:[(0,d.jsx)(y,{children:e.ticketNumber}),(0,d.jsx)(v,{children:e.subject}),(0,d.jsxs)(b,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,d.jsxs)(f,{children:[(0,d.jsx)(C,{status:e.status,children:e.status}),(0,d.jsx)(k,{priority:e.priority,children:e.priority})]})]}),(0,d.jsx)(w,{children:e.description}),e.replyMessage&&(0,d.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,d.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",He(e.repliedAt||"")]}),(0,d.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,d.jsxs)(F,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(E,{children:"Created"}),(0,d.jsx)(B,{children:He(e.createdAt)})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(E,{children:"Category"}),(0,d.jsx)(B,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(E,{children:"Response Time"}),(0,d.jsx)(B,{children:e.replyMessage?Ue(e.responseTime):"Pending"})]})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(T,{variant:"primary",onClick:()=>(e=>{je(e),le(!0)})(e),children:"View"}),"closed"!==e.status&&(0,d.jsx)(T,{variant:"primary",onClick:()=>Je(e),children:"Reply"}),(0,d.jsx)(T,{onClick:()=>qe(e),children:"Add Note"}),e.replyMessage&&"closed"!==e.status&&(0,d.jsx)(T,{onClick:()=>(e=>{je(e),he(!0)})(e),children:"Close Ticket"}),(0,d.jsx)(T,{variant:"danger",onClick:()=>(e=>{je(e),ge(!0)})(e),children:"Delete"})]})]},e.id))}),ne&&(0,d.jsx)(D,{onClick:()=>se(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(N,{children:[(0,d.jsx)($,{children:"Create Support Ticket"}),(0,d.jsx)(R,{onClick:()=>se(!1),children:"\xd7"})]}),(0,d.jsxs)(P,{children:[(0,d.jsxs)(L,{style:{position:"relative"},children:[(0,d.jsx)(M,{children:"Select User *"}),(0,d.jsx)(q,{type:"text",value:Be,onChange:e=>(e=>{if(Se(e),Ne(!0),e.length<1){const e=Ae.slice(0,10);return void De(e)}const i=Ae.filter(i=>i.full_name&&i.full_name.toLowerCase().includes(e.toLowerCase())||i.username&&i.username.toLowerCase().includes(e.toLowerCase())||i.email&&i.email.toLowerCase().includes(e.toLowerCase()));De(i.slice(0,10))})(e.target.value),onFocus:()=>{Ne(!0),0===Be.length&&De(Ae.slice(0,10))},onBlur:()=>setTimeout(()=>Ne(!1),200),placeholder:"Search by name, username, or email..."}),ze&&Te.length>0&&(0,d.jsx)(J,{children:Te.map(e=>(0,d.jsxs)(_,{onClick:()=>(e=>{Re(e),Se(e.full_name||e.username),Ne(!1),Fe(i=>({...i,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,d.jsx)(G,{children:e.full_name||e.username}),(0,d.jsxs)(Y,{children:[e.email," \u2022 ",e.role]})]},e.id))}),$e&&(0,d.jsxs)(Q,{children:["\u2713 Selected: ",(0,d.jsx)("strong",{children:$e.full_name||$e.username})," (",$e.email,")"]})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(M,{children:"Subject *"}),(0,d.jsx)(W,{type:"text",value:we.subject,onChange:e=>Fe({...we,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(M,{children:"Description *"}),(0,d.jsx)(U,{value:we.description,onChange:e=>Fe({...we,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,d.jsxs)(O,{children:[(0,d.jsxs)(L,{children:[(0,d.jsx)(M,{children:"Priority"}),(0,d.jsxs)(H,{value:we.priority,onChange:e=>Fe({...we,priority:e.target.value}),children:[(0,d.jsx)("option",{value:"low",children:"Low"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(M,{children:"Category"}),(0,d.jsxs)(H,{value:we.category,onChange:e=>Fe({...we,category:e.target.value}),children:[(0,d.jsx)("option",{value:"general",children:"General"}),(0,d.jsx)("option",{value:"technical",children:"Technical"}),(0,d.jsx)("option",{value:"billing",children:"Billing"}),(0,d.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,d.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)(l.$n,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,d.jsx)(l.$n,{variant:"primary",onClick:async()=>{if($e){try{const r={customerId:we.customerId,customerName:we.customerName,customerEmail:we.customerEmail,customerRole:"System Admin"===$e.role?"admin":"Restaurant Admin"===$e.role?"restaurant":["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes($e.role)?"manager":"staff",subject:we.subject,description:we.description,status:"open",priority:we.priority,category:we.category},t=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!t.ok)return void alert("Failed to create support ticket. Please try again.");{const r=await t.json(),n=r.data||r;i([n,...e])}}catch(r){return void alert("Error creating support ticket. Please try again.")}se(!1),Fe({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),Re(null),Se(""),De([])}else alert("Please select a user to create ticket for")},disabled:!we.subject||!we.description||!$e,children:"Create Ticket"})]})]})}),oe&&me&&(0,d.jsx)(D,{onClick:()=>le(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(N,{children:[(0,d.jsx)($,{children:"Ticket Details"}),(0,d.jsx)(R,{onClick:()=>le(!1),children:"\xd7"})]}),(0,d.jsx)(P,{children:(0,d.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Ticket Number"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:me.ticketNumber})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Status"}),(0,d.jsx)("div",{style:{padding:"8px 0"},children:(0,d.jsx)("span",{style:{padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"open"===me.status?"#FEF3C7":"in-progress"===me.status?"#DBEAFE":"#ECFDF5",color:"open"===me.status?"#D97706":"in-progress"===me.status?"#1E40AF":"#059669"},children:me.status})})]})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Priority"}),(0,d.jsx)("div",{style:{padding:"8px 0"},children:(0,d.jsx)("span",{style:{padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"urgent"===me.priority?"#FEE2E2":"high"===me.priority?"#FEF3C7":"medium"===me.priority?"#DBEAFE":"#F3F4F6",color:"urgent"===me.priority?"#DC2626":"high"===me.priority?"#D97706":"medium"===me.priority?"#1E40AF":"#6B7280"},children:me.priority})})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Category"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:me.category.replace("-"," ")})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Customer Information"}),(0,d.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:me.customerName}),(0,d.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:me.customerEmail})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Subject"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:me.subject})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Description"}),(0,d.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:me.description})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Created At"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:me.createdAt})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Last Updated"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:me.updatedAt})]})]}),me.assignedTo&&(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Assigned To"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:me.assignedTo})]}),me.replyMessage&&(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Support Reply"}),(0,d.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD",marginTop:"8px"},children:[(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#0369A1",marginBottom:"8px",fontWeight:"600"},children:[me.repliedBy," \u2022 ",He(me.repliedAt||"")]}),(0,d.jsx)("div",{style:{color:"#374151",lineHeight:"1.5",whiteSpace:"pre-wrap"},children:me.replyMessage})]})]}),me.notes&&me.notes.length>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)(M,{children:"Internal Notes (Admin Only)"}),(0,d.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"12px",marginTop:"8px"},children:me.notes.map(e=>(0,d.jsxs)("div",{style:{padding:"12px",backgroundColor:"#FEF3C7",borderRadius:"8px",border:"1px solid #FCD34D"},children:[(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#92400E",marginBottom:"8px",fontWeight:"600"},children:[e.createdBy," \u2022 ",He(e.createdAt)]}),(0,d.jsx)("div",{style:{color:"#374151",lineHeight:"1.5",whiteSpace:"pre-wrap"},children:e.message})]},e.id))})]})]})}),(0,d.jsxs)(I,{children:[(0,d.jsx)(l.$n,{variant:"secondary",onClick:()=>le(!1),children:"Close"}),"closed"!==me.status&&(0,d.jsx)(l.$n,{variant:"primary",onClick:()=>{le(!1),Je(me)},children:"Reply"}),(0,d.jsx)(l.$n,{variant:"secondary",onClick:()=>qe(me),children:"Add Note"})]})]})}),ae&&me&&(0,d.jsx)(D,{onClick:()=>de(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(N,{children:[(0,d.jsxs)($,{children:["Reply to Ticket ",me.ticketNumber]}),(0,d.jsx)(R,{onClick:()=>de(!1),children:"\xd7"})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)("div",{style:{marginBottom:"20px"},children:(0,d.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:me.subject}),(0,d.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:["From: ",me.customerName," (",me.customerEmail,")"]}),(0,d.jsx)("div",{style:{color:"#374151",lineHeight:"1.5"},children:me.description})]})}),me.notes&&me.notes.length>0&&(0,d.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,d.jsx)(M,{children:"Internal Notes (Admin Only)"}),(0,d.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px",marginTop:"8px"},children:me.notes.map(e=>(0,d.jsxs)("div",{style:{padding:"10px",backgroundColor:"#FEF3C7",borderRadius:"6px",border:"1px solid #FCD34D"},children:[(0,d.jsxs)("div",{style:{fontSize:"11px",color:"#92400E",marginBottom:"6px",fontWeight:"600"},children:["\ud83d\udcdd ",e.createdBy," \u2022 ",He(e.createdAt)]}),(0,d.jsx)("div",{style:{color:"#374151",fontSize:"13px",lineHeight:"1.4"},children:e.message})]},e.id))})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(M,{children:"Ticket Status"}),(0,d.jsxs)(H,{value:be,onChange:e=>fe(e.target.value),children:[(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(M,{children:"Your Reply"}),(0,d.jsx)(U,{value:ye,onChange:e=>ve(e.target.value),placeholder:"Type your reply to the customer...",style:{minHeight:"120px"}})]})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)(l.$n,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,d.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(!ye.trim()||!me)return;const e=new Date(me.createdAt).getTime(),r=(new Date).getTime(),t=Math.round((r-e)/6e4);try{const e=await fetch(`/api/support-tickets/${me.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:be,replyMessage:ye,repliedBy:"Support Agent",repliedAt:(new Date).toISOString().replace("T"," ").slice(0,19),responseTime:t>0?t:1,..."closed"===be&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(!e.ok)return void alert("Failed to send reply. Please try again.");{const r=await e.json(),t=r.data||r;i(e=>e.map(e=>e.id===me.id?{...e,...t}:e))}}catch(n){return void alert("Error sending reply. Please try again.")}ve(""),de(!1)},disabled:!ye.trim(),children:"Send Reply"})]})]})}),ce&&me&&(0,d.jsx)(D,{onClick:()=>pe(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(N,{children:[(0,d.jsxs)($,{children:["Add Note to Ticket ",me.ticketNumber]}),(0,d.jsx)(R,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)("div",{style:{marginBottom:"20px"},children:(0,d.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:me.subject}),(0,d.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:["From: ",me.customerName," (",me.customerEmail,")"]})]})}),(0,d.jsxs)(L,{children:[(0,d.jsx)(M,{children:"Internal Note (Not visible to customer)"}),(0,d.jsx)(U,{value:Ce,onChange:e=>ke(e.target.value),placeholder:"Add an internal note for your team..."})]})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)(l.$n,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,d.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(!Ce.trim()||!me)return;const e={id:`note-${Date.now()}`,message:Ce,createdBy:"System Admin",createdAt:(new Date).toISOString().replace("T"," ").slice(0,19)},r=[...me.notes||[],e];try{const e=await fetch(`/api/support-tickets/${me.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({notes:r})});if(!e.ok)return void alert("Failed to add note. Please try again.");{const r=await e.json(),t=r.data||r;i(e=>e.map(e=>e.id===me.id?{...e,...t}:e))}}catch(t){return void alert("Error adding note. Please try again.")}ke(""),pe(!1)},disabled:!Ce.trim(),children:"Add Note"})]})]})}),xe&&me&&(0,d.jsx)(D,{onClick:()=>he(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(N,{children:[(0,d.jsx)($,{children:"Close Ticket"}),(0,d.jsx)(R,{onClick:()=>he(!1),children:"\xd7"})]}),(0,d.jsx)(P,{children:(0,d.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,d.jsx)("h3",{style:{color:"#0A2540",marginBottom:"12px"},children:"Close This Ticket?"}),(0,d.jsxs)("p",{style:{color:"#6B7280",marginBottom:"20px",lineHeight:"1.5"},children:["This will mark ticket ",(0,d.jsx)("strong",{children:me.ticketNumber})," as ",(0,d.jsx)("strong",{children:"CLOSED"}),".",(0,d.jsx)("br",{}),"The customer will be notified that their issue has been resolved."]}),(0,d.jsxs)("div",{style:{padding:"12px",backgroundColor:"#ECFDF5",borderRadius:"8px",border:"1px solid #86EFAC",marginBottom:"20px"},children:[(0,d.jsxs)("div",{style:{fontWeight:"600",color:"#065F46",marginBottom:"4px"},children:["Subject: ",me.subject]}),(0,d.jsxs)("div",{style:{fontSize:"14px",color:"#047857"},children:["Customer: ",me.customerName]}),(0,d.jsxs)("div",{style:{fontSize:"14px",color:"#047857"},children:["Current Status: ",(0,d.jsx)("span",{style:{textTransform:"uppercase",fontWeight:"600"},children:me.status})]})]})]})}),(0,d.jsxs)(I,{children:[(0,d.jsx)(l.$n,{variant:"secondary",onClick:()=>he(!1),children:"Cancel"}),(0,d.jsx)(l.$n,{variant:"primary",onClick:()=>{me&&(i(e=>e.map(e=>e.id===me.id?{...e,status:"closed",resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}:e)),he(!1))},children:"Close Ticket"})]})]})}),ue&&me&&(0,d.jsx)(D,{onClick:()=>ge(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(N,{children:[(0,d.jsx)($,{children:"Delete Ticket"}),(0,d.jsx)(R,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,d.jsx)(P,{children:(0,d.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,d.jsx)("h3",{style:{color:"#0A2540",marginBottom:"12px"},children:"Delete This Ticket?"}),(0,d.jsxs)("p",{style:{color:"#6B7280",marginBottom:"20px",lineHeight:"1.5"},children:["This action ",(0,d.jsx)("strong",{children:"cannot be undone"}),". This will permanently delete ticket ",(0,d.jsx)("strong",{children:me.ticketNumber})," and remove all associated data."]}),(0,d.jsxs)("div",{style:{padding:"12px",backgroundColor:"#FEE2E2",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"20px"},children:[(0,d.jsxs)("div",{style:{fontWeight:"600",color:"#991B1B",marginBottom:"4px"},children:["Subject: ",me.subject]}),(0,d.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Customer: ",me.customerName]}),(0,d.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Status: ",(0,d.jsx)("span",{style:{textTransform:"uppercase",fontWeight:"600"},children:me.status})]})]})]})}),(0,d.jsxs)(I,{children:[(0,d.jsx)(l.$n,{variant:"secondary",onClick:()=>ge(!1),children:"Cancel"}),(0,d.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(me){try{if(!(await fetch(`/api/support-tickets/${me.id}`,{method:"DELETE"})).ok)return void alert("Failed to delete support ticket. Please try again.");i(e=>e.filter(e=>e.id!==me.id))}catch(e){return void alert("Error deleting support ticket. Please try again.")}ge(!1),je(null)}},style:{backgroundColor:"#DC2626",borderColor:"#DC2626"},children:"Delete Permanently"})]})]})})]})]})})}}}]);