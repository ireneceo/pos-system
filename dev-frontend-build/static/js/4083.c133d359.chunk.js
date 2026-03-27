"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Y});var n=t(9950),i=t(4752),o=t(2853),a=t(8409),s=t(1367),l=t(4302),d=t(7455),c=t(4185),p=t(4414);const u=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,x=i.Ay.div`
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
`,h=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=i.Ay.div`
  display: flex;
  gap: 12px;
`,f=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,y=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,j=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,v=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=i.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,F=(i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,i.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,i.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`),A=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,k=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,C=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,B=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=i.Ay.div`
  flex: 1;
`,S=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,z=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
`,I=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,q=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,N=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,_=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,R=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
  overflow-wrap: break-word;
`,O=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,$=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,D=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,M=i.Ay.span`
  color: #374151;
`,T=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,L=i.Ay.div`
  margin-bottom: 20px;
`,P=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,W=i.Ay.input`
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
`,G=i.Ay.select`
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
`,U=i.Ay.textarea`
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
`,Y=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,n.useState)([]),[i,Y]=(0,n.useState)([]),[H,J]=(0,n.useState)(""),[K,Q]=(0,n.useState)("all"),[V,X]=(0,n.useState)("all"),[Z,ee]=(0,n.useState)("all"),[re,te]=(0,n.useState)(!1),[ne,ie]=(0,n.useState)(""),[oe,ae]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"other"}),[se,le]=(0,n.useState)(null),[de,ce]=(0,n.useState)([]),[pe,ue]=(0,n.useState)({}),xe=(null===e||void 0===e?void 0:e.id)||"3",he=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",ge=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",me=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",fe=(null===e||void 0===e?void 0:e.restaurantId)||"1",ye=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,n.useEffect)(()=>{if(e&&e.restaurantId){ve(),je();const e=setInterval(ve,1e4);return()=>clearInterval(e)}},[e]),(0,n.useEffect)(()=>{1===i.length&&ie(i[0].id.toString())},[i]);const je=async()=>{try{const e=await fetch(`/api/restaurants/${fe}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?Y(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},ve=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${xe}&userRole=${me}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e),be(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},be=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ue(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},we=r.filter(e=>{const r=e.subject.toLowerCase().includes(H.toLowerCase())||e.ticketNumber.toLowerCase().includes(H.toLowerCase())||e.managerName.toLowerCase().includes(H.toLowerCase()),t="all"===K||e.status===K,n="all"===V||e.priority===V,i="all"===Z||e.category===Z;return r&&t&&n&&i}),Fe=r.length,Ae=r.filter(e=>"open"===e.status).length,ke=r.filter(e=>"in-progress"===e.status).length,Ce=r.filter(e=>"resolved"===e.status).length,Be=e=>new Date(e).toLocaleString("en-MY");return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(u,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(g,{children:"Operation Inquiry"}),(0,p.jsx)(m,{children:(0,p.jsx)(f,{variant:"primary",onClick:()=>{te(!0)},children:"New Inquiry"})})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(y,{children:[(0,p.jsxs)(j,{color:"#635BFF",children:[(0,p.jsx)(v,{children:Fe}),(0,p.jsx)(b,{children:"Total Inquiries"})]}),(0,p.jsxs)(j,{color:"#F59E0B",children:[(0,p.jsx)(v,{children:Ae}),(0,p.jsx)(b,{children:"Open"})]}),(0,p.jsxs)(j,{color:"#3B82F6",children:[(0,p.jsx)(v,{children:ke}),(0,p.jsx)(b,{children:"In Progress"})]}),(0,p.jsxs)(j,{color:"#10B981",children:[(0,p.jsx)(v,{children:Ce}),(0,p.jsx)(b,{children:"Resolved"})]})]}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(A,{value:K,onChange:e=>Q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]}),(0,p.jsxs)(A,{value:V,onChange:e=>X(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priority"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"low",children:"Low"})]}),(0,p.jsxs)(A,{value:Z,onChange:e=>ee(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Categories"}),(0,p.jsx)("option",{value:"schedule",children:"Schedule"}),(0,p.jsx)("option",{value:"inventory",children:"Inventory"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"menu",children:"Menu"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"other",children:"Other"})]}),(0,p.jsx)(F,{placeholder:"Search inquiries...",value:H,onChange:e=>J(e.target.value)})]}),(0,p.jsxs)(k,{children:[we.map(e=>{var r,t,n;return(0,p.jsxs)(C,{onClick:()=>(e=>{le(e),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),style:{cursor:"pointer"},children:[(0,p.jsxs)(B,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(S,{children:e.ticketNumber}),(0,p.jsx)(z,{children:e.subject}),(0,p.jsxs)(I,{children:["Manager: ",e.managerName]})]}),(0,p.jsxs)(q,{children:[(0,p.jsx)(N,{status:e.status,children:e.status}),(0,p.jsx)(_,{priority:e.priority,children:e.priority}),(null===(r=pe[e.id])||void 0===r?void 0:r.unread_count)>0?(0,p.jsx)("span",{style:{background:"#EF4444",color:"white",borderRadius:"6px",padding:"3px 10px",fontSize:"11px",fontWeight:700,animation:"pulse 1.5s infinite"},children:"New Reply"}):(null===(t=pe[e.id])||void 0===t?void 0:t.total_comments)>0?(0,p.jsx)("span",{style:{background:"#E0F2FE",color:"#0369A1",borderRadius:"6px",padding:"3px 10px",fontSize:"11px",fontWeight:600},children:"Replied"}):null]})]}),(0,p.jsx)(R,{children:e.description}),(0,p.jsxs)(O,{children:[(0,p.jsxs)($,{children:[(0,p.jsx)(D,{children:"Created"}),(0,p.jsx)(M,{children:Be(e.createdAt)})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(D,{children:"Category"}),(0,p.jsx)(M,{children:e.category})]}),(null===(n=pe[e.id])||void 0===n?void 0:n.total_comments)>0&&(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",pe[e.id].total_comments,pe[e.id].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[pe[e.id].unread_count," new"]})]})]})]},e.id)}),0===we.length&&(0,p.jsxs)(o.pp,{children:[(0,p.jsx)("h3",{children:"No inquiries yet"}),(0,p.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),se&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>le(null),title:se.ticketNumber,size:"large",footer:(0,p.jsx)(f,{variant:"secondary",onClick:()=>le(null),children:"Close"}),children:[(0,p.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",marginBottom:"8px",wordBreak:"break-word"},children:se.subject}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"},children:[(0,p.jsx)(N,{status:se.status,children:se.status}),(0,p.jsx)(_,{priority:se.priority,children:se.priority}),(0,p.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",padding:"4px 12px",background:"#F3F4F6",borderRadius:"6px"},children:se.category})]}),(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:["To: ",se.managerName," \xb7 ",Be(se.createdAt)]})]}),(0,p.jsx)(R,{children:se.description}),(null===se||void 0===se?void 0:se.attachments)&&se.attachments.length>0&&(0,p.jsx)(c.A,{attachments:se.attachments}),(0,p.jsx)(l.A,{entityType:"operation_ticket",entityId:String(se.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ue(e=>{const r={...e},t=String(se.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]}),re&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>te(!1),title:"Create Operation Inquiry",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(f,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,p.jsx)(f,{variant:"primary",onClick:async()=>{if(!oe.subject.trim()||!oe.description.trim()||!ne)return;const e=i.find(e=>e.id.toString()===ne);if(!e)return;const r=(e=>{const r=i.find(r=>r.id.toString()===e);if(r)return"Foodcourt General"===r.role||"Foodcourt Manager"===r.role?"foodcourt":"Brand General"===r.role||"Brand Manager"===r.role?"brand":"Restaurant Owner"===r.role?"owner":void 0})(ne);try{const t={requesterId:parseInt(xe),requesterName:he,requesterEmail:ge,requesterRole:me,restaurantId:parseInt(fe),restaurantName:ye,managerId:parseInt(e.id.toString()),managerName:e.name,subject:oe.subject,description:oe.description,priority:oe.priority,category:oe.category,inquiryType:r,attachments:de.length>0?de:void 0},n=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(t)})).ok&&(await ve(),ae({subject:"",description:"",priority:"medium",category:"other"}),ce([]),ie(1===i.length?i[0].id.toString():""),te(!1))}catch(t){console.error("Error creating ticket:",t)}},disabled:!oe.subject.trim()||!oe.description.trim()||!ne,children:"Submit Inquiry"})]}),children:[(0,p.jsxs)(L,{children:[(0,p.jsx)(P,{children:"Inquiry Target *"}),(0,p.jsxs)(G,{value:ne,onChange:e=>ie(e.target.value),required:!0,disabled:i.length<=1,children:[(0,p.jsx)("option",{value:"",children:0===i.length?"No one connected":"Select Inquiry Target"}),i.map(e=>{return(0,p.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(r=e.role,"Foodcourt General"===r||"Foodcourt Manager"===r?"Foodcourt":"Brand General"===r||"Brand Manager"===r?"Brand":"Restaurant Owner"===r?"Owner":r),")"]},e.id);var r})]}),0===i.length&&(0,p.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(P,{children:"Subject *"}),(0,p.jsx)(W,{type:"text",value:oe.subject,onChange:e=>ae({...oe,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(P,{children:"Description *"}),(0,p.jsx)(U,{value:oe.description,onChange:e=>ae({...oe,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(P,{children:"Attachments"}),(0,p.jsx)(d.A,{files:de,onChange:ce,maxFiles:5})]}),(0,p.jsxs)(T,{children:[(0,p.jsxs)(L,{children:[(0,p.jsx)(P,{children:"Priority"}),(0,p.jsxs)(G,{value:oe.priority,onChange:e=>ae({...oe,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"low",children:"Low"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(P,{children:"Category"}),(0,p.jsxs)(G,{value:oe.category,onChange:e=>ae({...oe,category:e.target.value}),children:[(0,p.jsx)("option",{value:"schedule",children:"Schedule"}),(0,p.jsx)("option",{value:"inventory",children:"Inventory"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"menu",children:"Menu"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})]})]})]})]})]})})}}}]);