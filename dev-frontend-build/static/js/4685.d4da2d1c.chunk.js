"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4685],{2653:(e,t,s)=>{s.d(t,{M:()=>n});var i=s(9950),r=s(4492);function n(e){const[t,s]=(0,r.ok)(),n=(0,i.useCallback)(()=>t.get("tab")||e,[t,e]),[o,a]=(0,i.useState)(n());return[o,(0,i.useCallback)(e=>{a(e),s({tab:e})},[s])]}},4685:(e,t,s)=>{s.r(t),s.d(t,{default:()=>W});var i=s(9950),r=s(4752),n=s(2488),o=s(8409),a=s(2597),l=s(2653),d=s(1367),c=s(7455),p=s(4185),u=s(4302),x=s(5030),g=s(4414);const h=r.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,j=r.Ay.div`
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
`,m=r.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,y=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,b=r.Ay.div`
  display: flex;
  gap: 12px;
`,f=r.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,v=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,k=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,F=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,T=r.Ay.div`
  flex: 1;
`,w=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=r.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,A=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,E=e=>{const t=e.toLowerCase();return t.includes("admin")&&!t.includes("restaurant")?{bg:"#F3E8FF",color:"#7C3AED"}:t.includes("brand")||t.includes("foodcourt")?{bg:"#E0F2FE",color:"#0891B2"}:t.includes("restaurant")||"restaurant"===t?{bg:"#FEF3C7",color:"#D97706"}:t.includes("owner")?{bg:"#FFF7ED",color:"#EA580C"}:t.includes("staff")||"staff"===t?{bg:"#ECFDF5",color:"#059669"}:"manager"===t?{bg:"#E0F2FE",color:"#0891B2"}:{bg:"#F3F4F6",color:"#6B7280"}},P=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  background: ${e=>E(e.role).bg};
  color: ${e=>E(e.role).color};
`,B=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,z=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,S=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,R=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,D=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,$=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,_=r.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=r.Ay.span`
  color: #374151;
`,N=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,O=r.Ay.div`
  margin-bottom: 20px;
`,L=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,M=r.Ay.input`
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
`,U=r.Ay.select`
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
`,q=r.Ay.textarea`
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
`,W=()=>{const{t:e}=(0,x.Bd)("settings"),{user:t}=(0,d.As)(),[s,r]=(0,i.useState)([]),[E,W]=(0,i.useState)(""),[Z,Y]=(0,l.M)("all"),[H,J]=(0,i.useState)("all"),[Q,G]=(0,i.useState)("all"),[K,V]=(0,i.useState)(!1),[X,ee]=(0,i.useState)(!1),[te,se]=(0,i.useState)(null),[ie,re]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ne,oe]=(0,i.useState)([]),[ae,le]=(0,i.useState)({}),de=(null===t||void 0===t?void 0:t.restaurantId)||2,ce=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),s=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${s}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),le(t)}}}catch(t){console.error("Error fetching unread counts:",t)}};(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),s=e.data||e;r(s),ce(s)}}catch(e){}})()},[t]);const pe=s.filter(e=>{const t=e.subject.toLowerCase().includes(E.toLowerCase())||e.customerName.toLowerCase().includes(E.toLowerCase())||e.ticketNumber.toLowerCase().includes(E.toLowerCase()),s="all"===Z||e.status===Z,i="all"===H||e.priority===H,r="all"===Q||e.category===Q;return t&&s&&i&&r}),ue=s.length,xe=s.filter(e=>"open"===e.status).length,ge=s.filter(e=>"in-progress"===e.status).length,he=s.filter(e=>"resolved"===e.status).length,je=e=>new Date(e).toLocaleString("en-MY"),me=e=>{const t=Math.floor(e/60),s=e%60;return t>0?`${t}h ${s}m`:`${s}m`};return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(h,{children:[(0,g.jsxs)(j,{children:[(0,g.jsx)(y,{children:e("settings:supportTicketsPage.supportTickets")}),(0,g.jsxs)(b,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>{const e=pe.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),t=[["Ticket Number","Customer Name","Customer Email","Customer Role","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),s=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(s),r=document.createElement("a");r.href=i,r.download=`restaurant-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)},children:e("settings:supportTicketsPage.export")}),(0,g.jsx)(f,{variant:"primary",onClick:()=>{V(!0)},children:e("settings:supportTicketsPage.createTicket")})]})]}),(0,g.jsxs)(m,{children:[(0,g.jsxs)(o.MD,{children:[(0,g.jsxs)(o.hI,{color:"#635BFF",children:[(0,g.jsx)(o.Os,{children:ue}),(0,g.jsx)(o.v0,{children:e("settings:supportTicketsPage.totalTickets")})]}),(0,g.jsxs)(o.hI,{color:"#F59E0B",children:[(0,g.jsx)(o.Os,{children:xe}),(0,g.jsx)(o.v0,{children:e("settings:supportTicketsPage.openTickets")})]}),(0,g.jsxs)(o.hI,{color:"#3B82F6",children:[(0,g.jsx)(o.Os,{children:ge}),(0,g.jsx)(o.v0,{children:e("settings:supportTicketsPage.inProgress")})]}),(0,g.jsxs)(o.hI,{color:"#10B981",children:[(0,g.jsx)(o.Os,{children:he}),(0,g.jsx)(o.v0,{children:e("settings:supportTicketsPage.resolved")})]})]}),(0,g.jsxs)(a.tU,{children:[(0,g.jsxs)(a.oz,{active:"all"===Z,onClick:()=>Y("all"),children:["All ",(0,g.jsx)(a.Ex,{count:ue,showZero:!0})]}),(0,g.jsxs)(a.oz,{active:"open"===Z,onClick:()=>Y("open"),children:["Open ",(0,g.jsx)(a.Ex,{count:xe,showZero:!0})]}),(0,g.jsxs)(a.oz,{active:"in-progress"===Z,onClick:()=>Y("in-progress"),children:["In Progress ",(0,g.jsx)(a.Ex,{count:ge,showZero:!0})]}),(0,g.jsxs)(a.oz,{active:"resolved"===Z,onClick:()=>Y("resolved"),children:["Resolved ",(0,g.jsx)(a.Ex,{count:he,showZero:!0})]}),(0,g.jsxs)(a.oz,{active:"closed"===Z,onClick:()=>Y("closed"),children:["Closed ",(0,g.jsx)(a.Ex,{count:s.filter(e=>"closed"===e.status).length,showZero:!0})]})]}),(0,g.jsxs)(n.Qn,{children:[(0,g.jsx)(n.DO,{placeholder:"Search tickets...",value:E,onChange:e=>W(e.target.value)}),(0,g.jsxs)(n.Jt,{value:H,onChange:e=>J(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:e("settings:supportTicketsPage.allPriority")}),(0,g.jsx)("option",{value:"urgent",children:e("settings:supportTicketsPage.urgent")}),(0,g.jsx)("option",{value:"high",children:e("settings:supportTicketsPage.high")}),(0,g.jsx)("option",{value:"medium",children:e("settings:supportTicketsPage.medium")}),(0,g.jsx)("option",{value:"low",children:e("settings:supportTicketsPage.low")})]}),(0,g.jsxs)(n.Jt,{value:Q,onChange:e=>G(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:e("settings:supportTicketsPage.allCategories")}),(0,g.jsx)("option",{value:"technical",children:e("settings:supportTicketsPage.technical")}),(0,g.jsx)("option",{value:"billing",children:e("settings:supportTicketsPage.billing")}),(0,g.jsx)("option",{value:"feature-request",children:e("settings:supportTicketsPage.featureRequest")}),(0,g.jsx)("option",{value:"bug-report",children:e("settings:supportTicketsPage.bugReport")}),(0,g.jsx)("option",{value:"general",children:e("settings:supportTicketsPage.general")})]})]}),(0,g.jsxs)(v,{children:[pe.map(t=>{var s,i;return(0,g.jsxs)(k,{onClick:()=>(e=>{se(e),ee(!0)})(t),style:{cursor:"pointer"},children:[(0,g.jsxs)(F,{children:[(0,g.jsxs)(T,{children:[(0,g.jsx)(w,{children:t.ticketNumber}),(0,g.jsx)(C,{children:t.subject}),(0,g.jsx)(A,{children:(0,g.jsxs)("div",{children:[t.customerName," \u2022 ",t.customerEmail,(0,g.jsx)(P,{role:t.customerRole,children:t.customerRole})]})})]}),(0,g.jsxs)(B,{children:[(0,g.jsx)(z,{status:t.status,children:t.status}),(0,g.jsx)(S,{priority:t.priority,children:t.priority}),(null===(s=ae[t.id])||void 0===s?void 0:s.unread_count)>0?(0,g.jsx)("span",{style:{background:"#EF4444",color:"white",borderRadius:"6px",padding:"3px 10px",fontSize:"11px",fontWeight:700,animation:"pulse 1.5s infinite"},children:"New Reply"}):(null===(i=ae[t.id])||void 0===i?void 0:i.total_comments)>0?(0,g.jsx)("span",{style:{background:"#E0F2FE",color:"#0369A1",borderRadius:"6px",padding:"3px 10px",fontSize:"11px",fontWeight:600},children:"Replied"}):null]})]}),(0,g.jsx)(R,{children:t.description}),t.replyMessage&&(0,g.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,g.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",t.repliedBy," \u2022 ",je(t.repliedAt||"")]}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:t.replyMessage})]}),(0,g.jsxs)(D,{children:[(0,g.jsxs)($,{children:[(0,g.jsx)(_,{children:e("settings:supportTicketsPage.created")}),(0,g.jsx)(I,{children:je(t.createdAt)})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(_,{children:e("settings:supportTicketsPage.category")}),(0,g.jsx)(I,{style:{textTransform:"capitalize"},children:t.category.replace("-"," ")})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(_,{children:e("settings:supportTicketsPage.responseTime")}),(0,g.jsx)(I,{children:me(t.responseTime)})]}),t.assignedTo&&(0,g.jsxs)($,{children:[(0,g.jsx)(_,{children:e("settings:supportTicketsPage.assignedTo")}),(0,g.jsx)(I,{children:t.assignedTo})]}),ae[t.id]&&(0,g.jsx)($,{children:(0,g.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ae[t.id].total_comments,ae[t.id].unread_count>0&&(0,g.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ae[t.id].unread_count," new"]})]})})]})]},t.id)}),0===pe.length&&(0,g.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,g.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:e("settings:supportTicketsPage.noTicketsYet")}),(0,g.jsx)("p",{children:'Click "Create Ticket" to submit your first support ticket.'})]})]}),K&&(0,g.jsxs)(o.aF,{isOpen:!0,onClose:()=>V(!1),title:"Create Support Ticket",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>V(!1),children:"Cancel"}),(0,g.jsx)(f,{variant:"primary",onClick:async()=>{try{const e={restaurantId:de,restaurantName:"IOI Mall Food Court",subject:ie.subject,description:ie.description,status:"open",priority:ie.priority,category:ie.category,attachments:ne.length>0?ne:void 0},t=localStorage.getItem("auth_token");if(!(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).ok)return;{const e=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${t}`}});if(e.ok){const t=await e.json(),s=t.data||t;r(s),ce(s)}V(!1)}}catch(e){return}re({subject:"",description:"",priority:"medium",category:"general"}),oe([])},disabled:!ie.subject||!ie.description,children:"Create Ticket"})]}),children:[(0,g.jsxs)(O,{children:[(0,g.jsx)(L,{children:"Subject *"}),(0,g.jsx)(M,{type:"text",value:ie.subject,onChange:e=>re({...ie,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(L,{children:"Description *"}),(0,g.jsx)(q,{value:ie.description,onChange:e=>re({...ie,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,g.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.attachments")}),(0,g.jsx)(c.A,{files:ne,onChange:oe,maxFiles:5})]}),(0,g.jsxs)(N,{children:[(0,g.jsxs)(O,{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.priority")}),(0,g.jsxs)(U,{value:ie.priority,onChange:e=>re({...ie,priority:e.target.value}),children:[(0,g.jsx)("option",{value:"low",children:e("settings:supportTicketsPage.low")}),(0,g.jsx)("option",{value:"medium",children:e("settings:supportTicketsPage.medium")}),(0,g.jsx)("option",{value:"high",children:e("settings:supportTicketsPage.high")}),(0,g.jsx)("option",{value:"urgent",children:e("settings:supportTicketsPage.urgent")})]})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.category")}),(0,g.jsxs)(U,{value:ie.category,onChange:e=>re({...ie,category:e.target.value}),children:[(0,g.jsx)("option",{value:"general",children:e("settings:supportTicketsPage.general")}),(0,g.jsx)("option",{value:"technical",children:e("settings:supportTicketsPage.technical")}),(0,g.jsx)("option",{value:"billing",children:e("settings:supportTicketsPage.billing")}),(0,g.jsx)("option",{value:"feature-request",children:e("settings:supportTicketsPage.featureRequest")}),(0,g.jsx)("option",{value:"bug-report",children:e("settings:supportTicketsPage.bugReport")})]})]})]})]}),X&&te&&(0,g.jsx)(o.aF,{isOpen:!0,onClose:()=>ee(!1),title:"Ticket Details",size:"large",footer:(0,g.jsx)(f,{variant:"secondary",onClick:()=>ee(!1),children:"Close"}),children:(0,g.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.ticketNumber")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:te.ticketNumber})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.status")}),(0,g.jsx)("div",{style:{padding:"8px 0"},children:(0,g.jsx)(z,{status:te.status,children:te.status})})]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.priority")}),(0,g.jsx)("div",{style:{padding:"8px 0"},children:(0,g.jsx)(S,{priority:te.priority,children:te.priority})})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.category")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:te.category.replace("-"," ")})]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.customerInformation")}),(0,g.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,g.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[te.customerName,(0,g.jsx)(P,{role:te.customerRole,style:{marginLeft:"8px"},children:te.customerRole})]}),(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:te.customerEmail})]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.subject")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:te.subject})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.description")}),(0,g.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:te.description})]}),(null===te||void 0===te?void 0:te.attachments)&&te.attachments.length>0&&(0,g.jsx)(p.A,{attachments:te.attachments}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.createdAt")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:te.createdAt})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.lastUpdated")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:te.updatedAt})]})]}),te.assignedTo&&(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:e("settings:supportTicketsPage.assignedTo")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:te.assignedTo})]}),(0,g.jsx)(u.A,{entityType:"support_ticket",entityId:te.id,currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>le(e=>{const t={...e};return t[te.id]&&(t[te.id]={...t[te.id],unread_count:0}),t})})]})})]})]})})}}}]);