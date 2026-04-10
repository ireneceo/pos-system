"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6843],{6843:(e,t,i)=>{i.r(t),i.d(t,{default:()=>W});var r=i(9950),s=i(4752),n=i(1367),a=i(2488),o=i(4302),d=i(7455),l=i(4185),c=i(8409),p=i(5030),u=i(9955),x=i(4414);const h=s.Ay.div`
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
`,m=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,y=s.Ay.div`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,b=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,f=s.Ay.div`
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
`,k=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=s.Ay.div`
  flex: 1;
`,F=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,T=s.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,A=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,C=e=>{const t=e.toLowerCase();return t.includes("admin")&&!t.includes("restaurant")?{bg:"#F3E8FF",color:"#7C3AED"}:t.includes("brand")||t.includes("foodcourt")?{bg:"#E0F2FE",color:"#0891B2"}:t.includes("restaurant")||"restaurant"===t?{bg:"#FEF3C7",color:"#D97706"}:t.includes("owner")?{bg:"#FFF7ED",color:"#EA580C"}:t.includes("staff")||"staff"===t?{bg:"#ECFDF5",color:"#059669"}:"manager"===t?{bg:"#E0F2FE",color:"#0891B2"}:{bg:"#F3F4F6",color:"#6B7280"}},P=s.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  background: ${e=>C(e.role).bg};
  color: ${e=>C(e.role).color};
`,E=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,B=s.Ay.span`
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
`,N=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,R=s.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=s.Ay.span`
  color: #374151;
`,L=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,$=s.Ay.div`
  margin-bottom: 20px;
`,O=s.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,q=s.Ay.input`
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
`,U=s.Ay.select`
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
`,J=s.Ay.textarea`
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
`,W=()=>{const{t:e}=(0,p.Bd)("admin"),{user:t}=(0,n.As)(),[i,s]=(0,r.useState)([]),[C,W]=(0,r.useState)(""),[Y,H]=(0,r.useState)("all"),[M,Q]=(0,r.useState)("all"),[_,G]=(0,r.useState)("all"),[K,V]=(0,r.useState)(!1),[X,Z]=(0,r.useState)(!1),[ee,te]=(0,r.useState)(null),[ie,re]=(0,r.useState)(""),[se,ne]=(0,r.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ae,oe]=(0,r.useState)([]);(0,r.useEffect)(()=>{const e=async()=>{try{const e=(0,u.c4)(),t=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.data||e;s(i)}}catch(e){}};e();const t=setInterval(e,1e4);return()=>clearInterval(t)},[t]);const de=i.filter(e=>{const t=e.subject.toLowerCase().includes(C.toLowerCase())||e.customerName.toLowerCase().includes(C.toLowerCase())||e.ticketNumber.toLowerCase().includes(C.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(C.toLowerCase()),i="all"===Y||e.status===Y,r="all"===M||e.priority===M,s="all"===_||e.category===_;return t&&i&&r&&s}),le=i.length,ce=i.filter(e=>"open"===e.status).length,pe=i.filter(e=>"in-progress"===e.status).length,ue=i.filter(e=>"resolved"===e.status).length,xe=e=>new Date(e).toLocaleString("en-MY");return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(h,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(j,{children:e("admin:supportTicketsPage.systemInquiry")}),(0,x.jsxs)(y,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>{const e=de.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,e.restaurantName||"N/A",`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Customer Role","Restaurant","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),i=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(i),s=document.createElement("a");s.href=r,s.download=`manager-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)},children:e("admin:supportTicketsPage.export")}),(0,x.jsx)(v,{variant:"primary",onClick:()=>{V(!0)},children:e("admin:supportTicketsPage.createInquiry")})]})]}),(0,x.jsxs)(m,{children:[(0,x.jsxs)(c.MD,{children:[(0,x.jsxs)(c.hI,{color:"#059669",children:[(0,x.jsx)(c.Os,{children:le}),(0,x.jsx)(c.v0,{children:e("admin:supportTicketsPage.totalTickets")})]}),(0,x.jsxs)(c.hI,{color:"#D97706",children:[(0,x.jsx)(c.Os,{children:ce}),(0,x.jsx)(c.v0,{children:e("admin:supportTicketsPage.openTickets")})]}),(0,x.jsxs)(c.hI,{color:"#2563EB",children:[(0,x.jsx)(c.Os,{children:pe}),(0,x.jsx)(c.v0,{children:e("admin:supportTicketsPage.inProgress")})]}),(0,x.jsxs)(c.hI,{color:"#7C3AED",children:[(0,x.jsx)(c.Os,{children:ue}),(0,x.jsx)(c.v0,{children:e("admin:supportTicketsPage.resolved")})]})]}),(0,x.jsxs)(a.Qn,{children:[(0,x.jsxs)(a.Jt,{value:Y,onChange:e=>H(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("admin:supportTicketsPage.allStatus")}),(0,x.jsx)("option",{value:"open",children:e("admin:supportTicketsPage.open")}),(0,x.jsx)("option",{value:"in-progress",children:e("admin:supportTicketsPage.inProgress")}),(0,x.jsx)("option",{value:"resolved",children:e("admin:supportTicketsPage.resolved")}),(0,x.jsx)("option",{value:"closed",children:e("admin:supportTicketsPage.closed")})]}),(0,x.jsxs)(a.Jt,{value:M,onChange:e=>Q(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("admin:supportTicketsPage.allPriority")}),(0,x.jsx)("option",{value:"urgent",children:e("admin:supportTicketsPage.urgent")}),(0,x.jsx)("option",{value:"high",children:e("admin:supportTicketsPage.high")}),(0,x.jsx)("option",{value:"medium",children:e("admin:supportTicketsPage.medium")}),(0,x.jsx)("option",{value:"low",children:e("admin:supportTicketsPage.low")})]}),(0,x.jsxs)(a.Jt,{value:_,onChange:e=>G(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("admin:supportTicketsPage.allCategories")}),(0,x.jsx)("option",{value:"technical",children:e("admin:supportTicketsPage.technical")}),(0,x.jsx)("option",{value:"billing",children:e("admin:supportTicketsPage.billing")}),(0,x.jsx)("option",{value:"feature-request",children:e("admin:supportTicketsPage.featureRequest")}),(0,x.jsx)("option",{value:"bug-report",children:e("admin:supportTicketsPage.bugReport")}),(0,x.jsx)("option",{value:"general",children:e("admin:supportTicketsPage.general")})]}),(0,x.jsx)(a.DO,{type:"text",placeholder:"Search tickets, customers...",value:C,onChange:e=>W(e.target.value)})]}),(0,x.jsx)(b,{children:de.map(t=>(0,x.jsxs)(f,{onClick:()=>(e=>{te(e),re(e.status),Z(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(t),children:[(0,x.jsxs)(k,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(F,{children:t.ticketNumber}),(0,x.jsx)(T,{children:t.subject}),(0,x.jsxs)(A,{children:[(0,x.jsxs)("div",{children:[t.customerName," \u2022 ",t.customerEmail,(0,x.jsx)(P,{role:t.customerRole,children:t.customerRole})]}),t.restaurantName&&(0,x.jsx)("div",{style:{marginTop:"4px",fontWeight:"500"},children:t.restaurantName})]})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(B,{status:t.status,children:t.status}),(0,x.jsx)(z,{priority:t.priority,children:t.priority})]})]}),(0,x.jsx)(S,{children:t.description}),(0,x.jsxs)(D,{children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(R,{children:e("admin:supportTicketsPage.created")}),(0,x.jsx)(I,{children:xe(t.createdAt)})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(R,{children:e("admin:supportTicketsPage.category")}),(0,x.jsx)(I,{style:{textTransform:"capitalize"},children:t.category.replace("-"," ")})]})]})]},t.id))}),K&&(0,x.jsxs)(c.aF,{isOpen:!0,onClose:()=>V(!1),title:"Create System Inquiry",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>V(!1),children:e("admin:supportTicketsPage.cancel")}),(0,x.jsx)(v,{variant:"primary",onClick:async()=>{try{const e={subject:se.subject,description:se.description,status:"open",priority:se.priority,category:se.category,attachments:ae.length>0?ae:void 0},t=(0,u.c4)(),r=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(!r.ok)return;{const e=await r.json(),t=e.data||e;s([t,...i])}}catch(e){return}V(!1),ne({subject:"",description:"",priority:"medium",category:"general"}),oe([])},disabled:!se.subject||!se.description,children:e("admin:supportTicketsPage.createInquiry")})]}),children:[(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:"Subject *"}),(0,x.jsx)(q,{type:"text",value:se.subject,onChange:e=>ne({...se,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:"Description *"}),(0,x.jsx)(J,{value:se.description,onChange:e=>ne({...se,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,x.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.attachments")}),(0,x.jsx)(d.A,{files:ae,onChange:oe,maxFiles:5})]}),(0,x.jsxs)(L,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.priority")}),(0,x.jsxs)(U,{value:se.priority,onChange:e=>ne({...se,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"low",children:e("admin:supportTicketsPage.low")}),(0,x.jsx)("option",{value:"medium",children:e("admin:supportTicketsPage.medium")}),(0,x.jsx)("option",{value:"high",children:e("admin:supportTicketsPage.high")}),(0,x.jsx)("option",{value:"urgent",children:e("admin:supportTicketsPage.urgent")})]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.category")}),(0,x.jsxs)(U,{value:se.category,onChange:e=>ne({...se,category:e.target.value}),children:[(0,x.jsx)("option",{value:"general",children:e("admin:supportTicketsPage.general")}),(0,x.jsx)("option",{value:"technical",children:e("admin:supportTicketsPage.technical")}),(0,x.jsx)("option",{value:"billing",children:e("admin:supportTicketsPage.billing")}),(0,x.jsx)("option",{value:"feature-request",children:e("admin:supportTicketsPage.featureRequest")}),(0,x.jsx)("option",{value:"bug-report",children:e("admin:supportTicketsPage.bugReport")})]})]})]})]}),X&&ee&&(0,x.jsxs)(c.aF,{isOpen:!0,onClose:()=>Z(!1),title:"Inquiry Details",size:"large",footer:(0,x.jsx)(v,{variant:"secondary",onClick:()=>Z(!1),children:e("admin:supportTicketsPage.close")}),children:[(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.ticketNumber")}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ee.ticketNumber})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.status")}),(0,x.jsxs)(U,{value:ie,onChange:e=>(async e=>{if(ee){re(e);try{const t=(0,u.c4)();(await fetch(`/api/support-tickets/${ee.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})})).ok&&(s(t=>t.map(t=>t.id===ee.id?{...t,status:e}:t)),te(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,x.jsx)("option",{value:"open",children:e("admin:supportTicketsPage.open")}),(0,x.jsx)("option",{value:"in-progress",children:e("admin:supportTicketsPage.inProgress")}),(0,x.jsx)("option",{value:"resolved",children:e("admin:supportTicketsPage.resolved")}),(0,x.jsx)("option",{value:"closed",children:e("admin:supportTicketsPage.closed")})]})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.priority")}),(0,x.jsx)("div",{style:{padding:"8px 0"},children:(0,x.jsx)(z,{priority:ee.priority,children:ee.priority})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.category")}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ee.category.replace("-"," ")})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.customerInformation")}),(0,x.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[ee.customerName,(0,x.jsx)(P,{role:ee.customerRole,style:{marginLeft:"8px"},children:ee.customerRole})]}),(0,x.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:ee.customerEmail}),ee.restaurantName&&(0,x.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",marginTop:"4px"},children:ee.restaurantName})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.subject")}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ee.subject})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.description")}),(0,x.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ee.description})]}),(null===ee||void 0===ee?void 0:ee.attachments)&&ee.attachments.length>0&&(0,x.jsx)(l.A,{attachments:ee.attachments}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.createdAt")}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:xe(ee.createdAt)})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(O,{children:e("admin:supportTicketsPage.lastUpdated")}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:xe(ee.updatedAt)})]})]})]}),(0,x.jsx)(o.A,{entityType:"support_ticket",entityId:ee.id,currentUserId:null===t||void 0===t?void 0:t.id})]})]})]})})}}}]);