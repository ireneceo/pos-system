"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4685],{2653:(e,t,s)=>{s.d(t,{M:()=>n});var i=s(9950),r=s(4492);function n(e){const[t,s]=(0,r.ok)(),n=(0,i.useCallback)(()=>t.get("tab")||e,[t,e]),[o,a]=(0,i.useState)(n());return[o,(0,i.useCallback)(e=>{a(e),s({tab:e})},[s])]}},4685:(e,t,s)=>{s.r(t),s.d(t,{default:()=>Z});var i=s(9950),r=s(4752),n=s(2488),o=s(8409),a=s(2597),l=s(2653),d=s(1367),c=s(7455),p=s(4185),u=s(4302),x=s(5030),g=s(9955),h=s(4414);const j=r.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,m=r.Ay.div`
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
`,y=r.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,b=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,f=r.Ay.div`
  display: flex;
  gap: 12px;
`,v=r.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,k=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,F=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,T=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=r.Ay.div`
  flex: 1;
`,C=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=r.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,E=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,P=e=>{const t=e.toLowerCase();return t.includes("admin")&&!t.includes("restaurant")?{bg:"#F3E8FF",color:"#7C3AED"}:t.includes("brand")||t.includes("foodcourt")?{bg:"#E0F2FE",color:"#0891B2"}:t.includes("restaurant")||"restaurant"===t?{bg:"#FEF3C7",color:"#D97706"}:t.includes("owner")?{bg:"#FFF7ED",color:"#EA580C"}:t.includes("staff")||"staff"===t?{bg:"#ECFDF5",color:"#059669"}:"manager"===t?{bg:"#E0F2FE",color:"#0891B2"}:{bg:"#F3F4F6",color:"#6B7280"}},B=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  background: ${e=>P(e.role).bg};
  color: ${e=>P(e.role).color};
`,z=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,S=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,R=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,D=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,$=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,_=r.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=r.Ay.span`
  color: #374151;
`,O=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,L=r.Ay.div`
  margin-bottom: 20px;
`,M=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,U=r.Ay.input`
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
`,q=r.Ay.select`
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
`,W=r.Ay.textarea`
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
`,Z=()=>{const{t:e}=(0,x.Bd)("settings"),{user:t}=(0,d.As)(),[s,r]=(0,i.useState)([]),[P,Z]=(0,i.useState)(""),[Y,H]=(0,l.M)("all"),[J,Q]=(0,i.useState)("all"),[G,K]=(0,i.useState)("all"),[V,X]=(0,i.useState)(!1),[ee,te]=(0,i.useState)(!1),[se,ie]=(0,i.useState)(null),[re,ne]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[oe,ae]=(0,i.useState)([]),[le,de]=(0,i.useState)({}),ce=(null===t||void 0===t?void 0:t.restaurantId)||2,pe=async e=>{if(0!==e.length)try{const t=(0,g.c4)(),s=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${s}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),de(t)}}}catch(t){console.error("Error fetching unread counts:",t)}};(0,i.useEffect)(()=>{(async()=>{try{const e=(0,g.c4)(),t=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),s=e.data||e;r(s),pe(s)}}catch(e){}})()},[t]);const ue=s.filter(e=>{const t=e.subject.toLowerCase().includes(P.toLowerCase())||e.customerName.toLowerCase().includes(P.toLowerCase())||e.ticketNumber.toLowerCase().includes(P.toLowerCase()),s="all"===Y||e.status===Y,i="all"===J||e.priority===J,r="all"===G||e.category===G;return t&&s&&i&&r}),xe=s.length,ge=s.filter(e=>"open"===e.status).length,he=s.filter(e=>"in-progress"===e.status).length,je=s.filter(e=>"resolved"===e.status).length,me=e=>new Date(e).toLocaleString("en-MY"),ye=e=>{const t=Math.floor(e/60),s=e%60;return t>0?`${t}h ${s}m`:`${s}m`};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(j,{children:[(0,h.jsxs)(m,{children:[(0,h.jsx)(b,{children:e("settings:supportTicketsPage.supportTickets")}),(0,h.jsxs)(f,{children:[(0,h.jsx)(v,{variant:"secondary",onClick:()=>{const e=ue.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),t=[["Ticket Number","Customer Name","Customer Email","Customer Role","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),s=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(s),r=document.createElement("a");r.href=i,r.download=`restaurant-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)},children:e("settings:supportTicketsPage.export")}),(0,h.jsx)(v,{variant:"primary",onClick:()=>{X(!0)},children:e("settings:supportTicketsPage.createTicket")})]})]}),(0,h.jsxs)(y,{children:[(0,h.jsxs)(o.MD,{children:[(0,h.jsxs)(o.hI,{color:"#635BFF",children:[(0,h.jsx)(o.Os,{children:xe}),(0,h.jsx)(o.v0,{children:e("settings:supportTicketsPage.totalTickets")})]}),(0,h.jsxs)(o.hI,{color:"#F59E0B",children:[(0,h.jsx)(o.Os,{children:ge}),(0,h.jsx)(o.v0,{children:e("settings:supportTicketsPage.openTickets")})]}),(0,h.jsxs)(o.hI,{color:"#3B82F6",children:[(0,h.jsx)(o.Os,{children:he}),(0,h.jsx)(o.v0,{children:e("settings:supportTicketsPage.inProgress")})]}),(0,h.jsxs)(o.hI,{color:"#10B981",children:[(0,h.jsx)(o.Os,{children:je}),(0,h.jsx)(o.v0,{children:e("settings:supportTicketsPage.resolved")})]})]}),(0,h.jsxs)(a.tU,{children:[(0,h.jsxs)(a.oz,{active:"all"===Y,onClick:()=>H("all"),children:["All ",(0,h.jsx)(a.Ex,{count:xe,showZero:!0})]}),(0,h.jsxs)(a.oz,{active:"open"===Y,onClick:()=>H("open"),children:["Open ",(0,h.jsx)(a.Ex,{count:ge,showZero:!0})]}),(0,h.jsxs)(a.oz,{active:"in-progress"===Y,onClick:()=>H("in-progress"),children:["In Progress ",(0,h.jsx)(a.Ex,{count:he,showZero:!0})]}),(0,h.jsxs)(a.oz,{active:"resolved"===Y,onClick:()=>H("resolved"),children:["Resolved ",(0,h.jsx)(a.Ex,{count:je,showZero:!0})]}),(0,h.jsxs)(a.oz,{active:"closed"===Y,onClick:()=>H("closed"),children:["Closed ",(0,h.jsx)(a.Ex,{count:s.filter(e=>"closed"===e.status).length,showZero:!0})]})]}),(0,h.jsxs)(n.Qn,{children:[(0,h.jsx)(n.DO,{placeholder:"Search tickets...",value:P,onChange:e=>Z(e.target.value)}),(0,h.jsxs)(n.Jt,{value:J,onChange:e=>Q(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:e("settings:supportTicketsPage.allPriority")}),(0,h.jsx)("option",{value:"urgent",children:e("settings:supportTicketsPage.urgent")}),(0,h.jsx)("option",{value:"high",children:e("settings:supportTicketsPage.high")}),(0,h.jsx)("option",{value:"medium",children:e("settings:supportTicketsPage.medium")}),(0,h.jsx)("option",{value:"low",children:e("settings:supportTicketsPage.low")})]}),(0,h.jsxs)(n.Jt,{value:G,onChange:e=>K(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:e("settings:supportTicketsPage.allCategories")}),(0,h.jsx)("option",{value:"technical",children:e("settings:supportTicketsPage.technical")}),(0,h.jsx)("option",{value:"billing",children:e("settings:supportTicketsPage.billing")}),(0,h.jsx)("option",{value:"feature-request",children:e("settings:supportTicketsPage.featureRequest")}),(0,h.jsx)("option",{value:"bug-report",children:e("settings:supportTicketsPage.bugReport")}),(0,h.jsx)("option",{value:"general",children:e("settings:supportTicketsPage.general")})]})]}),(0,h.jsxs)(k,{children:[ue.map(t=>{var s,i;return(0,h.jsxs)(F,{onClick:()=>(e=>{ie(e),te(!0)})(t),style:{cursor:"pointer"},children:[(0,h.jsxs)(T,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:t.ticketNumber}),(0,h.jsx)(A,{children:t.subject}),(0,h.jsx)(E,{children:(0,h.jsxs)("div",{children:[t.customerName," \u2022 ",t.customerEmail,(0,h.jsx)(B,{role:t.customerRole,children:t.customerRole})]})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(S,{status:t.status,children:t.status}),(0,h.jsx)(R,{priority:t.priority,children:t.priority}),(null===(s=le[t.id])||void 0===s?void 0:s.unread_count)>0?(0,h.jsx)("span",{style:{background:"#EF4444",color:"white",borderRadius:"6px",padding:"3px 10px",fontSize:"11px",fontWeight:700,animation:"pulse 1.5s infinite"},children:"New Reply"}):(null===(i=le[t.id])||void 0===i?void 0:i.total_comments)>0?(0,h.jsx)("span",{style:{background:"#E0F2FE",color:"#0369A1",borderRadius:"6px",padding:"3px 10px",fontSize:"11px",fontWeight:600},children:"Replied"}):null]})]}),(0,h.jsx)(D,{children:t.description}),t.replyMessage&&(0,h.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,h.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",t.repliedBy," \u2022 ",me(t.repliedAt||"")]}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:t.replyMessage})]}),(0,h.jsxs)($,{children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(_,{children:e("settings:supportTicketsPage.created")}),(0,h.jsx)(I,{children:me(t.createdAt)})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(_,{children:e("settings:supportTicketsPage.category")}),(0,h.jsx)(I,{style:{textTransform:"capitalize"},children:t.category.replace("-"," ")})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(_,{children:e("settings:supportTicketsPage.responseTime")}),(0,h.jsx)(I,{children:ye(t.responseTime)})]}),t.assignedTo&&(0,h.jsxs)(N,{children:[(0,h.jsx)(_,{children:e("settings:supportTicketsPage.assignedTo")}),(0,h.jsx)(I,{children:t.assignedTo})]}),le[t.id]&&(0,h.jsx)(N,{children:(0,h.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",le[t.id].total_comments,le[t.id].unread_count>0&&(0,h.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[le[t.id].unread_count," new"]})]})})]})]},t.id)}),0===ue.length&&(0,h.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,h.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:e("settings:supportTicketsPage.noTicketsYet")}),(0,h.jsx)("p",{children:'Click "Create Ticket" to submit your first support ticket.'})]})]}),V&&(0,h.jsxs)(o.aF,{isOpen:!0,onClose:()=>X(!1),title:"Create Support Ticket",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(v,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,h.jsx)(v,{variant:"primary",onClick:async()=>{try{const e={restaurantId:ce,restaurantName:"IOI Mall Food Court",subject:re.subject,description:re.description,status:"open",priority:re.priority,category:re.category,attachments:oe.length>0?oe:void 0},t=(0,g.c4)();if(!(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).ok)return;{const e=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${t}`}});if(e.ok){const t=await e.json(),s=t.data||t;r(s),pe(s)}X(!1)}}catch(e){return}ne({subject:"",description:"",priority:"medium",category:"general"}),ae([])},disabled:!re.subject||!re.description,children:"Create Ticket"})]}),children:[(0,h.jsxs)(L,{children:[(0,h.jsx)(M,{children:"Subject *"}),(0,h.jsx)(U,{type:"text",value:re.subject,onChange:e=>ne({...re,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,h.jsxs)(L,{children:[(0,h.jsx)(M,{children:"Description *"}),(0,h.jsx)(W,{value:re.description,onChange:e=>ne({...re,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,h.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.attachments")}),(0,h.jsx)(c.A,{files:oe,onChange:ae,maxFiles:5})]}),(0,h.jsxs)(O,{children:[(0,h.jsxs)(L,{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.priority")}),(0,h.jsxs)(q,{value:re.priority,onChange:e=>ne({...re,priority:e.target.value}),children:[(0,h.jsx)("option",{value:"low",children:e("settings:supportTicketsPage.low")}),(0,h.jsx)("option",{value:"medium",children:e("settings:supportTicketsPage.medium")}),(0,h.jsx)("option",{value:"high",children:e("settings:supportTicketsPage.high")}),(0,h.jsx)("option",{value:"urgent",children:e("settings:supportTicketsPage.urgent")})]})]}),(0,h.jsxs)(L,{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.category")}),(0,h.jsxs)(q,{value:re.category,onChange:e=>ne({...re,category:e.target.value}),children:[(0,h.jsx)("option",{value:"general",children:e("settings:supportTicketsPage.general")}),(0,h.jsx)("option",{value:"technical",children:e("settings:supportTicketsPage.technical")}),(0,h.jsx)("option",{value:"billing",children:e("settings:supportTicketsPage.billing")}),(0,h.jsx)("option",{value:"feature-request",children:e("settings:supportTicketsPage.featureRequest")}),(0,h.jsx)("option",{value:"bug-report",children:e("settings:supportTicketsPage.bugReport")})]})]})]})]}),ee&&se&&(0,h.jsx)(o.aF,{isOpen:!0,onClose:()=>te(!1),title:"Ticket Details",size:"large",footer:(0,h.jsx)(v,{variant:"secondary",onClick:()=>te(!1),children:"Close"}),children:(0,h.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.ticketNumber")}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:se.ticketNumber})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.status")}),(0,h.jsx)("div",{style:{padding:"8px 0"},children:(0,h.jsx)(S,{status:se.status,children:se.status})})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.priority")}),(0,h.jsx)("div",{style:{padding:"8px 0"},children:(0,h.jsx)(R,{priority:se.priority,children:se.priority})})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.category")}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:se.category.replace("-"," ")})]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.customerInformation")}),(0,h.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,h.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[se.customerName,(0,h.jsx)(B,{role:se.customerRole,style:{marginLeft:"8px"},children:se.customerRole})]}),(0,h.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:se.customerEmail})]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.subject")}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:se.subject})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.description")}),(0,h.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:se.description})]}),(null===se||void 0===se?void 0:se.attachments)&&se.attachments.length>0&&(0,h.jsx)(p.A,{attachments:se.attachments}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.createdAt")}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:se.createdAt})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.lastUpdated")}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:se.updatedAt})]})]}),se.assignedTo&&(0,h.jsxs)("div",{children:[(0,h.jsx)(M,{children:e("settings:supportTicketsPage.assignedTo")}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:se.assignedTo})]}),(0,h.jsx)(u.A,{entityType:"support_ticket",entityId:se.id,currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>de(e=>{const t={...e};return t[se.id]&&(t[se.id]={...t[se.id],unread_count:0}),t})})]})})]})]})})}}}]);