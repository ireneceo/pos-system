"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4685],{2488:(e,t,i)=>{i.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,s=r.Ay.input`
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
`,a=r.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,d=r.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,l=r.Ay.select`
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
`,c=e=>{let{children:t,className:i,style:r,...s}=e;return(0,n.jsx)(o,{className:i,style:r,...s,children:t})},p=e=>{let{placeholder:t="Search...",value:i,onChange:r,style:o,...l}=e;return(0,n.jsxs)(a,{style:o,children:[(0,n.jsx)(s,{placeholder:t,value:i,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...l}),i&&(0,n.jsx)(d,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...i}=e;return(0,n.jsx)(l,{...i,children:t})}},2597:(e,t,i)=>{i.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,s=r.Ay.button`
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
`,a=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:t,className:i,style:r}=e;return(0,n.jsx)(o,{className:i,style:r,children:t})},l=e=>{let{active:t,onClick:i,children:r,className:o}=e;return(0,n.jsx)(s,{active:t,onClick:i,className:o,children:r})},c=e=>{let{count:t,variant:i="default",showZero:r=!1}=e;return 0!==t||r?(0,n.jsx)(a,{variant:i,children:t}):null}},2653:(e,t,i)=>{i.d(t,{M:()=>o});var r=i(9950),n=i(4492);function o(e){const[t,i]=(0,n.ok)(),o=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[s,a]=(0,r.useState)(o());return[s,(0,r.useCallback)(e=>{a(e),i({tab:e})},[i])]}},4685:(e,t,i)=>{i.r(t),i.d(t,{default:()=>Q});var r=i(9950),n=i(4752),o=i(2488),s=i(8409),a=i(2597),d=i(2653),l=i(1367),c=i(7455),p=i(4185),x=i(4302),h=i(4414);const u=n.Ay.div`
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
`,y=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=n.Ay.div`
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
`,C=n.Ay.div`
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
`,E=e=>{const t=e.toLowerCase();return t.includes("admin")&&!t.includes("restaurant")?{bg:"#F3E8FF",color:"#7C3AED"}:t.includes("brand")||t.includes("foodcourt")?{bg:"#E0F2FE",color:"#0891B2"}:t.includes("restaurant")||"restaurant"===t?{bg:"#FEF3C7",color:"#D97706"}:t.includes("owner")?{bg:"#FFF7ED",color:"#EA580C"}:t.includes("staff")||"staff"===t?{bg:"#ECFDF5",color:"#059669"}:"manager"===t?{bg:"#E0F2FE",color:"#0891B2"}:{bg:"#F3F4F6",color:"#6B7280"}},B=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  background: ${e=>E(e.role).bg};
  color: ${e=>E(e.role).color};
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
`,I=n.Ay.span`
  color: #374151;
`,L=n.Ay.div`
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
`,_=n.Ay.div`
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
`,U=n.Ay.h2`
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
`,P=n.Ay.div`
  padding: 24px;
`,W=n.Ay.div`
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
`,Y=n.Ay.select`
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
`,Q=()=>{const{user:e}=(0,l.As)(),[t,i]=(0,r.useState)([]),[n,E]=(0,r.useState)(""),[Q,K]=(0,d.M)("all"),[V,X]=(0,r.useState)("all"),[ee,te]=(0,r.useState)("all"),[ie,re]=(0,r.useState)(!1),[ne,oe]=(0,r.useState)(!1),[se,ae]=(0,r.useState)(null),[de,le]=(0,r.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ce,pe]=(0,r.useState)([]),[xe,he]=(0,r.useState)({}),ue=(null===e||void 0===e?void 0:e.restaurantId)||2,ge=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),i=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${i}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),he(t)}}}catch(t){console.error("Error fetching unread counts:",t)}};(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e;i(r),ge(r)}}catch(e){}})()},[e]);const me=t.filter(e=>{const t=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase()),i="all"===Q||e.status===Q,r="all"===V||e.priority===V,o="all"===ee||e.category===ee;return t&&i&&r&&o}),je=t.length,be=t.filter(e=>"open"===e.status).length,ye=t.filter(e=>"in-progress"===e.status).length,fe=t.filter(e=>"resolved"===e.status).length,ve=e=>new Date(e).toLocaleString("en-MY"),we=e=>{const t=Math.floor(e/60),i=e%60;return t>0?`${t}h ${i}m`:`${i}m`};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(u,{children:[(0,h.jsxs)(g,{children:[(0,h.jsx)(j,{children:"Support Tickets"}),(0,h.jsxs)(b,{children:[(0,h.jsx)(y,{variant:"secondary",onClick:()=>{const e=me.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),t=[["Ticket Number","Customer Name","Customer Email","Customer Role","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),i=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(i),n=document.createElement("a");n.href=r,n.download=`restaurant-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)},children:"Export"}),(0,h.jsx)(y,{variant:"primary",onClick:()=>{re(!0)},children:"Create Ticket"})]})]}),(0,h.jsxs)(m,{children:[(0,h.jsxs)(s.MD,{children:[(0,h.jsxs)(s.hI,{color:"#635BFF",children:[(0,h.jsx)(s.Os,{children:je}),(0,h.jsx)(s.v0,{children:"Total Tickets"})]}),(0,h.jsxs)(s.hI,{color:"#F59E0B",children:[(0,h.jsx)(s.Os,{children:be}),(0,h.jsx)(s.v0,{children:"Open Tickets"})]}),(0,h.jsxs)(s.hI,{color:"#3B82F6",children:[(0,h.jsx)(s.Os,{children:ye}),(0,h.jsx)(s.v0,{children:"In Progress"})]}),(0,h.jsxs)(s.hI,{color:"#10B981",children:[(0,h.jsx)(s.Os,{children:fe}),(0,h.jsx)(s.v0,{children:"Resolved"})]})]}),(0,h.jsxs)(a.tU,{children:[(0,h.jsxs)(a.oz,{active:"all"===Q,onClick:()=>K("all"),children:["All ",(0,h.jsx)(a.Ex,{count:je,showZero:!0})]}),(0,h.jsxs)(a.oz,{active:"open"===Q,onClick:()=>K("open"),children:["Open ",(0,h.jsx)(a.Ex,{count:be,showZero:!0})]}),(0,h.jsxs)(a.oz,{active:"in-progress"===Q,onClick:()=>K("in-progress"),children:["In Progress ",(0,h.jsx)(a.Ex,{count:ye,showZero:!0})]}),(0,h.jsxs)(a.oz,{active:"resolved"===Q,onClick:()=>K("resolved"),children:["Resolved ",(0,h.jsx)(a.Ex,{count:fe,showZero:!0})]}),(0,h.jsxs)(a.oz,{active:"closed"===Q,onClick:()=>K("closed"),children:["Closed ",(0,h.jsx)(a.Ex,{count:t.filter(e=>"closed"===e.status).length,showZero:!0})]})]}),(0,h.jsxs)(o.Qn,{children:[(0,h.jsx)(o.DO,{placeholder:"Search tickets...",value:n,onChange:e=>E(e.target.value)}),(0,h.jsxs)(o.Jt,{value:V,onChange:e=>X(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Priority"}),(0,h.jsx)("option",{value:"urgent",children:"Urgent"}),(0,h.jsx)("option",{value:"high",children:"High"}),(0,h.jsx)("option",{value:"medium",children:"Medium"}),(0,h.jsx)("option",{value:"low",children:"Low"})]}),(0,h.jsxs)(o.Jt,{value:ee,onChange:e=>te(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),(0,h.jsx)("option",{value:"technical",children:"Technical"}),(0,h.jsx)("option",{value:"billing",children:"Billing"}),(0,h.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,h.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,h.jsx)("option",{value:"general",children:"General"})]})]}),(0,h.jsxs)(f,{children:[me.map(e=>(0,h.jsxs)(v,{onClick:()=>(e=>{ae(e),oe(!0)})(e),style:{cursor:"pointer"},children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)(k,{children:e.ticketNumber}),(0,h.jsx)(C,{children:e.subject}),(0,h.jsx)(A,{children:(0,h.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,h.jsx)(B,{role:e.customerRole,children:e.customerRole})]})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{status:e.status,children:e.status}),(0,h.jsx)(S,{priority:e.priority,children:e.priority})]})]}),(0,h.jsx)(R,{children:e.description}),e.replyMessage&&(0,h.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,h.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",ve(e.repliedAt||"")]}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,h.jsxs)(D,{children:[(0,h.jsxs)(N,{children:[(0,h.jsx)($,{children:"Created"}),(0,h.jsx)(I,{children:ve(e.createdAt)})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)($,{children:"Category"}),(0,h.jsx)(I,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)($,{children:"Response Time"}),(0,h.jsx)(I,{children:we(e.responseTime)})]}),e.assignedTo&&(0,h.jsxs)(N,{children:[(0,h.jsx)($,{children:"Assigned To"}),(0,h.jsx)(I,{children:e.assignedTo})]}),xe[e.id]&&(0,h.jsx)(N,{children:(0,h.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",xe[e.id].total_comments,xe[e.id].unread_count>0&&(0,h.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[xe[e.id].unread_count," new"]})]})})]})]},e.id)),0===me.length&&(0,h.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,h.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,h.jsx)("p",{children:'Click "Create Ticket" to submit your first support ticket.'})]})]}),ie&&(0,h.jsx)(L,{onClick:()=>re(!1),children:(0,h.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(O,{children:[(0,h.jsx)(U,{children:"Create Support Ticket"}),(0,h.jsx)(M,{onClick:()=>re(!1),children:"\xd7"})]}),(0,h.jsxs)(P,{children:[(0,h.jsxs)(Z,{children:[(0,h.jsx)(H,{children:"Subject *"}),(0,h.jsx)(J,{type:"text",value:de.subject,onChange:e=>le({...de,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,h.jsxs)(Z,{children:[(0,h.jsx)(H,{children:"Description *"}),(0,h.jsx)(G,{value:de.description,onChange:e=>le({...de,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,h.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,h.jsx)(H,{children:"Attachments"}),(0,h.jsx)(c.A,{files:ce,onChange:pe,maxFiles:5})]}),(0,h.jsxs)(q,{children:[(0,h.jsxs)(Z,{children:[(0,h.jsx)(H,{children:"Priority"}),(0,h.jsxs)(Y,{value:de.priority,onChange:e=>le({...de,priority:e.target.value}),children:[(0,h.jsx)("option",{value:"low",children:"Low"}),(0,h.jsx)("option",{value:"medium",children:"Medium"}),(0,h.jsx)("option",{value:"high",children:"High"}),(0,h.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,h.jsxs)(Z,{children:[(0,h.jsx)(H,{children:"Category"}),(0,h.jsxs)(Y,{value:de.category,onChange:e=>le({...de,category:e.target.value}),children:[(0,h.jsx)("option",{value:"general",children:"General"}),(0,h.jsx)("option",{value:"technical",children:"Technical"}),(0,h.jsx)("option",{value:"billing",children:"Billing"}),(0,h.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,h.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,h.jsxs)(W,{children:[(0,h.jsx)(y,{variant:"secondary",onClick:()=>re(!1),children:"Cancel"}),(0,h.jsx)(y,{variant:"primary",onClick:async()=>{try{const e={restaurantId:ue,restaurantName:"IOI Mall Food Court",subject:de.subject,description:de.description,status:"open",priority:de.priority,category:de.category,attachments:ce.length>0?ce:void 0},t=localStorage.getItem("auth_token");if(!(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).ok)return;{const e=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${t}`}});if(e.ok){const t=await e.json(),r=t.data||t;i(r),ge(r)}re(!1)}}catch(e){return}le({subject:"",description:"",priority:"medium",category:"general"}),pe([])},disabled:!de.subject||!de.description,children:"Create Ticket"})]})]})}),ne&&se&&(0,h.jsx)(L,{onClick:()=>oe(!1),children:(0,h.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(O,{children:[(0,h.jsx)(U,{children:"Ticket Details"}),(0,h.jsx)(M,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,h.jsx)(P,{children:(0,h.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(H,{children:"Ticket Number"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:se.ticketNumber})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(H,{children:"Status"}),(0,h.jsx)("div",{style:{padding:"8px 0"},children:(0,h.jsx)(T,{status:se.status,children:se.status})})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(H,{children:"Priority"}),(0,h.jsx)("div",{style:{padding:"8px 0"},children:(0,h.jsx)(S,{priority:se.priority,children:se.priority})})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(H,{children:"Category"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:se.category.replace("-"," ")})]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(H,{children:"Customer Information"}),(0,h.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,h.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[se.customerName,(0,h.jsx)(B,{role:se.customerRole,style:{marginLeft:"8px"},children:se.customerRole})]}),(0,h.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:se.customerEmail})]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(H,{children:"Subject"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:se.subject})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(H,{children:"Description"}),(0,h.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:se.description})]}),(null===se||void 0===se?void 0:se.attachments)&&se.attachments.length>0&&(0,h.jsx)(p.A,{attachments:se.attachments}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(H,{children:"Created At"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:se.createdAt})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(H,{children:"Last Updated"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:se.updatedAt})]})]}),se.assignedTo&&(0,h.jsxs)("div",{children:[(0,h.jsx)(H,{children:"Assigned To"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:se.assignedTo})]}),(0,h.jsx)(x.A,{entityType:"support_ticket",entityId:se.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>he(e=>{const t={...e};return t[se.id]&&(t[se.id]={...t[se.id],unread_count:0}),t})})]})}),(0,h.jsx)(W,{children:(0,h.jsx)(y,{variant:"secondary",onClick:()=>oe(!1),children:"Close"})})]})})]})]})})}}}]);