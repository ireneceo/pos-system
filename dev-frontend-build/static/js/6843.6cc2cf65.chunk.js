"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6843],{6843:(e,t,r)=>{r.r(t),r.d(t,{default:()=>J});var i=r(9950),s=r(4752),n=r(1367),a=r(2488),o=r(4302),d=r(7455),l=r(4185),c=r(8409),p=r(5030),u=r(4414);const x=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,g=s.Ay.div`
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
`,h=s.Ay.div`
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
`,y=s.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,v=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,b=s.Ay.div`
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
`,f=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,k=s.Ay.div`
  flex: 1;
`,w=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=s.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,T=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,A=e=>{const t=e.toLowerCase();return t.includes("admin")&&!t.includes("restaurant")?{bg:"#F3E8FF",color:"#7C3AED"}:t.includes("brand")||t.includes("foodcourt")?{bg:"#E0F2FE",color:"#0891B2"}:t.includes("restaurant")||"restaurant"===t?{bg:"#FEF3C7",color:"#D97706"}:t.includes("owner")?{bg:"#FFF7ED",color:"#EA580C"}:t.includes("staff")||"staff"===t?{bg:"#ECFDF5",color:"#059669"}:"manager"===t?{bg:"#E0F2FE",color:"#0891B2"}:{bg:"#F3F4F6",color:"#6B7280"}},C=s.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  background: ${e=>A(e.role).bg};
  color: ${e=>A(e.role).color};
`,P=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,E=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,B=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,S=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
`,z=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,D=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,N=s.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=s.Ay.span`
  color: #374151;
`,R=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,L=s.Ay.div`
  margin-bottom: 20px;
`,$=s.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,O=s.Ay.input`
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
`,q=s.Ay.select`
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
`,U=s.Ay.textarea`
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
`,J=()=>{const{t:e}=(0,p.Bd)("admin"),{user:t}=(0,n.As)(),[r,s]=(0,i.useState)([]),[A,J]=(0,i.useState)(""),[W,_]=(0,i.useState)("all"),[Y,H]=(0,i.useState)("all"),[M,Q]=(0,i.useState)("all"),[G,K]=(0,i.useState)(!1),[V,X]=(0,i.useState)(!1),[Z,ee]=(0,i.useState)(null),[te,re]=(0,i.useState)(""),[ie,se]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ne,ae]=(0,i.useState)([]);(0,i.useEffect)(()=>{const e=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e;s(r)}}catch(e){}};e();const t=setInterval(e,1e4);return()=>clearInterval(t)},[t]);const oe=r.filter(e=>{const t=e.subject.toLowerCase().includes(A.toLowerCase())||e.customerName.toLowerCase().includes(A.toLowerCase())||e.ticketNumber.toLowerCase().includes(A.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(A.toLowerCase()),r="all"===W||e.status===W,i="all"===Y||e.priority===Y,s="all"===M||e.category===M;return t&&r&&i&&s}),de=r.length,le=r.filter(e=>"open"===e.status).length,ce=r.filter(e=>"in-progress"===e.status).length,pe=r.filter(e=>"resolved"===e.status).length,ue=e=>new Date(e).toLocaleString("en-MY");return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(x,{children:[(0,u.jsxs)(g,{children:[(0,u.jsx)(m,{children:e("admin:supportTicketsPage.systemInquiry")}),(0,u.jsxs)(j,{children:[(0,u.jsx)(y,{variant:"secondary",onClick:()=>{const e=oe.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,e.restaurantName||"N/A",`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Customer Role","Restaurant","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(r),s=document.createElement("a");s.href=i,s.download=`manager-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)},children:e("admin:supportTicketsPage.export")}),(0,u.jsx)(y,{variant:"primary",onClick:()=>{K(!0)},children:e("admin:supportTicketsPage.createInquiry")})]})]}),(0,u.jsxs)(h,{children:[(0,u.jsxs)(c.MD,{children:[(0,u.jsxs)(c.hI,{color:"#059669",children:[(0,u.jsx)(c.Os,{children:de}),(0,u.jsx)(c.v0,{children:e("admin:supportTicketsPage.totalTickets")})]}),(0,u.jsxs)(c.hI,{color:"#D97706",children:[(0,u.jsx)(c.Os,{children:le}),(0,u.jsx)(c.v0,{children:e("admin:supportTicketsPage.openTickets")})]}),(0,u.jsxs)(c.hI,{color:"#2563EB",children:[(0,u.jsx)(c.Os,{children:ce}),(0,u.jsx)(c.v0,{children:e("admin:supportTicketsPage.inProgress")})]}),(0,u.jsxs)(c.hI,{color:"#7C3AED",children:[(0,u.jsx)(c.Os,{children:pe}),(0,u.jsx)(c.v0,{children:e("admin:supportTicketsPage.resolved")})]})]}),(0,u.jsxs)(a.Qn,{children:[(0,u.jsxs)(a.Jt,{value:W,onChange:e=>_(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("admin:supportTicketsPage.allStatus")}),(0,u.jsx)("option",{value:"open",children:e("admin:supportTicketsPage.open")}),(0,u.jsx)("option",{value:"in-progress",children:e("admin:supportTicketsPage.inProgress")}),(0,u.jsx)("option",{value:"resolved",children:e("admin:supportTicketsPage.resolved")}),(0,u.jsx)("option",{value:"closed",children:e("admin:supportTicketsPage.closed")})]}),(0,u.jsxs)(a.Jt,{value:Y,onChange:e=>H(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("admin:supportTicketsPage.allPriority")}),(0,u.jsx)("option",{value:"urgent",children:e("admin:supportTicketsPage.urgent")}),(0,u.jsx)("option",{value:"high",children:e("admin:supportTicketsPage.high")}),(0,u.jsx)("option",{value:"medium",children:e("admin:supportTicketsPage.medium")}),(0,u.jsx)("option",{value:"low",children:e("admin:supportTicketsPage.low")})]}),(0,u.jsxs)(a.Jt,{value:M,onChange:e=>Q(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("admin:supportTicketsPage.allCategories")}),(0,u.jsx)("option",{value:"technical",children:e("admin:supportTicketsPage.technical")}),(0,u.jsx)("option",{value:"billing",children:e("admin:supportTicketsPage.billing")}),(0,u.jsx)("option",{value:"feature-request",children:e("admin:supportTicketsPage.featureRequest")}),(0,u.jsx)("option",{value:"bug-report",children:e("admin:supportTicketsPage.bugReport")}),(0,u.jsx)("option",{value:"general",children:e("admin:supportTicketsPage.general")})]}),(0,u.jsx)(a.DO,{type:"text",placeholder:"Search tickets, customers...",value:A,onChange:e=>J(e.target.value)})]}),(0,u.jsx)(v,{children:oe.map(t=>(0,u.jsxs)(b,{onClick:()=>(e=>{ee(e),re(e.status),X(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(t),children:[(0,u.jsxs)(f,{children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(w,{children:t.ticketNumber}),(0,u.jsx)(F,{children:t.subject}),(0,u.jsxs)(T,{children:[(0,u.jsxs)("div",{children:[t.customerName," \u2022 ",t.customerEmail,(0,u.jsx)(C,{role:t.customerRole,children:t.customerRole})]}),t.restaurantName&&(0,u.jsx)("div",{style:{marginTop:"4px",fontWeight:"500"},children:t.restaurantName})]})]}),(0,u.jsxs)(P,{children:[(0,u.jsx)(E,{status:t.status,children:t.status}),(0,u.jsx)(B,{priority:t.priority,children:t.priority})]})]}),(0,u.jsx)(S,{children:t.description}),(0,u.jsxs)(z,{children:[(0,u.jsxs)(D,{children:[(0,u.jsx)(N,{children:e("admin:supportTicketsPage.created")}),(0,u.jsx)(I,{children:ue(t.createdAt)})]}),(0,u.jsxs)(D,{children:[(0,u.jsx)(N,{children:e("admin:supportTicketsPage.category")}),(0,u.jsx)(I,{style:{textTransform:"capitalize"},children:t.category.replace("-"," ")})]})]})]},t.id))}),G&&(0,u.jsxs)(c.aF,{isOpen:!0,onClose:()=>K(!1),title:"Create System Inquiry",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(y,{variant:"secondary",onClick:()=>K(!1),children:e("admin:supportTicketsPage.cancel")}),(0,u.jsx)(y,{variant:"primary",onClick:async()=>{try{const e={subject:ie.subject,description:ie.description,status:"open",priority:ie.priority,category:ie.category,attachments:ne.length>0?ne:void 0},t=localStorage.getItem("auth_token"),i=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(!i.ok)return;{const e=await i.json(),t=e.data||e;s([t,...r])}}catch(e){return}K(!1),se({subject:"",description:"",priority:"medium",category:"general"}),ae([])},disabled:!ie.subject||!ie.description,children:e("admin:supportTicketsPage.createInquiry")})]}),children:[(0,u.jsxs)(L,{children:[(0,u.jsx)($,{children:"Subject *"}),(0,u.jsx)(O,{type:"text",value:ie.subject,onChange:e=>se({...ie,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)($,{children:"Description *"}),(0,u.jsx)(U,{value:ie.description,onChange:e=>se({...ie,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,u.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.attachments")}),(0,u.jsx)(d.A,{files:ne,onChange:ae,maxFiles:5})]}),(0,u.jsxs)(R,{children:[(0,u.jsxs)(L,{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.priority")}),(0,u.jsxs)(q,{value:ie.priority,onChange:e=>se({...ie,priority:e.target.value}),children:[(0,u.jsx)("option",{value:"low",children:e("admin:supportTicketsPage.low")}),(0,u.jsx)("option",{value:"medium",children:e("admin:supportTicketsPage.medium")}),(0,u.jsx)("option",{value:"high",children:e("admin:supportTicketsPage.high")}),(0,u.jsx)("option",{value:"urgent",children:e("admin:supportTicketsPage.urgent")})]})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.category")}),(0,u.jsxs)(q,{value:ie.category,onChange:e=>se({...ie,category:e.target.value}),children:[(0,u.jsx)("option",{value:"general",children:e("admin:supportTicketsPage.general")}),(0,u.jsx)("option",{value:"technical",children:e("admin:supportTicketsPage.technical")}),(0,u.jsx)("option",{value:"billing",children:e("admin:supportTicketsPage.billing")}),(0,u.jsx)("option",{value:"feature-request",children:e("admin:supportTicketsPage.featureRequest")}),(0,u.jsx)("option",{value:"bug-report",children:e("admin:supportTicketsPage.bugReport")})]})]})]})]}),V&&Z&&(0,u.jsxs)(c.aF,{isOpen:!0,onClose:()=>X(!1),title:"Inquiry Details",size:"large",footer:(0,u.jsx)(y,{variant:"secondary",onClick:()=>X(!1),children:e("admin:supportTicketsPage.close")}),children:[(0,u.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.ticketNumber")}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:Z.ticketNumber})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.status")}),(0,u.jsxs)(q,{value:te,onChange:e=>(async e=>{if(Z){re(e);try{const t=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${Z.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})})).ok&&(s(t=>t.map(t=>t.id===Z.id?{...t,status:e}:t)),ee(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,u.jsx)("option",{value:"open",children:e("admin:supportTicketsPage.open")}),(0,u.jsx)("option",{value:"in-progress",children:e("admin:supportTicketsPage.inProgress")}),(0,u.jsx)("option",{value:"resolved",children:e("admin:supportTicketsPage.resolved")}),(0,u.jsx)("option",{value:"closed",children:e("admin:supportTicketsPage.closed")})]})]})]}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.priority")}),(0,u.jsx)("div",{style:{padding:"8px 0"},children:(0,u.jsx)(B,{priority:Z.priority,children:Z.priority})})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.category")}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:Z.category.replace("-"," ")})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.customerInformation")}),(0,u.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,u.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[Z.customerName,(0,u.jsx)(C,{role:Z.customerRole,style:{marginLeft:"8px"},children:Z.customerRole})]}),(0,u.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:Z.customerEmail}),Z.restaurantName&&(0,u.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",marginTop:"4px"},children:Z.restaurantName})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.subject")}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:Z.subject})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.description")}),(0,u.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:Z.description})]}),(null===Z||void 0===Z?void 0:Z.attachments)&&Z.attachments.length>0&&(0,u.jsx)(l.A,{attachments:Z.attachments}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.createdAt")}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ue(Z.createdAt)})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)($,{children:e("admin:supportTicketsPage.lastUpdated")}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ue(Z.updatedAt)})]})]})]}),(0,u.jsx)(o.A,{entityType:"support_ticket",entityId:Z.id,currentUserId:null===t||void 0===t?void 0:t.id})]})]})]})})}}}]);