"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>H});var n=t(9950),i=t(4752),o=t(2853),a=t(8409),s=t(1367),l=t(4302),d=t(7455),c=t(4185),p=t(5030),u=t(9955),x=t(4414);const g=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=i.Ay.div`
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
`,y=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,f=i.Ay.div`
  display: flex;
  gap: 12px;
`,j=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,b=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,w=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,F=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=i.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,A=(i.Ay.div`
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
`),q=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,B=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,k=i.Ay.div`
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
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,C=i.Ay.div`
  flex: 1;
`,P=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,S=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
`,z=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,N=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,_=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,R=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,$=i.Ay.div`
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
`,D=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,T=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,O=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,L=i.Ay.span`
  color: #374151;
`,M=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,W=i.Ay.div`
  margin-bottom: 20px;
`,G=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,Y=i.Ay.input`
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
`,U=i.Ay.select`
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
`,J=i.Ay.textarea`
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
`,H=()=>{const{t:e}=(0,p.Bd)("settings"),{user:r}=(0,s.As)(),[t,i]=(0,n.useState)([]),[H,K]=(0,n.useState)([]),[Q,V]=(0,n.useState)(""),[X,Z]=(0,n.useState)("all"),[ee,re]=(0,n.useState)("all"),[te,ne]=(0,n.useState)("all"),[ie,oe]=(0,n.useState)(!1),[ae,se]=(0,n.useState)(""),[le,de]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"other"}),[ce,pe]=(0,n.useState)(null),[ue,xe]=(0,n.useState)([]),[ge,he]=(0,n.useState)({}),ye=(null===r||void 0===r?void 0:r.id)||"3",me=(null===r||void 0===r?void 0:r.name)||(null===r||void 0===r?void 0:r.email)||"Restaurant User",fe=(null===r||void 0===r?void 0:r.email)||"restaurant@example.com",je=(null===r||void 0===r?void 0:r.role)||"Restaurant Admin",ve=(null===r||void 0===r?void 0:r.restaurantId)||"1",be=(null===r||void 0===r?void 0:r.restaurantName)||"Test Restaurant";(0,n.useEffect)(()=>{if(r&&r.restaurantId){Fe(),we();const e=setInterval(Fe,1e4);return()=>clearInterval(e)}},[r]),(0,n.useEffect)(()=>{1===H.length&&se(H[0].id.toString())},[H]);const we=async()=>{try{const e=await fetch(`/api/restaurants/${ve}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?K(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},Fe=async()=>{try{const e=(0,u.c4)(),r=await fetch(`/api/operation-tickets?userId=${ye}&userRole=${je}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();i(e),Ie(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},Ie=async e=>{if(0!==e.length)try{const r=(0,u.c4)(),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),he(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},Ae=t.filter(e=>{const r=e.subject.toLowerCase().includes(Q.toLowerCase())||e.ticketNumber.toLowerCase().includes(Q.toLowerCase())||e.managerName.toLowerCase().includes(Q.toLowerCase()),t="all"===X||e.status===X,n="all"===ee||e.priority===ee,i="all"===te||e.category===te;return r&&t&&n&&i}),qe=t.length,Be=t.filter(e=>"open"===e.status).length,ke=t.filter(e=>"in-progress"===e.status).length,Ee=t.filter(e=>"resolved"===e.status).length,Ce=e=>new Date(e).toLocaleString("en-MY");return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(g,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(m,{children:e("settings:operationInquiryPage.operationInquiry")}),(0,x.jsx)(f,{children:(0,x.jsx)(j,{variant:"primary",onClick:()=>{oe(!0)},children:e("settings:operationInquiryPage.newInquiry")})})]}),(0,x.jsxs)(y,{children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(b,{color:"#635BFF",children:[(0,x.jsx)(w,{children:qe}),(0,x.jsx)(F,{children:e("settings:operationInquiryPage.totalInquiries")})]}),(0,x.jsxs)(b,{color:"#F59E0B",children:[(0,x.jsx)(w,{children:Be}),(0,x.jsx)(F,{children:e("settings:operationInquiryPage.open")})]}),(0,x.jsxs)(b,{color:"#3B82F6",children:[(0,x.jsx)(w,{children:ke}),(0,x.jsx)(F,{children:e("settings:operationInquiryPage.inProgress")})]}),(0,x.jsxs)(b,{color:"#10B981",children:[(0,x.jsx)(w,{children:Ee}),(0,x.jsx)(F,{children:e("settings:operationInquiryPage.resolved")})]})]}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(q,{value:X,onChange:e=>Z(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("settings:operationInquiryPage.allStatus")}),(0,x.jsx)("option",{value:"open",children:e("settings:operationInquiryPage.open")}),(0,x.jsx)("option",{value:"in-progress",children:e("settings:operationInquiryPage.inProgress")}),(0,x.jsx)("option",{value:"resolved",children:e("settings:operationInquiryPage.resolved")}),(0,x.jsx)("option",{value:"closed",children:e("settings:operationInquiryPage.closed")})]}),(0,x.jsxs)(q,{value:ee,onChange:e=>re(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("settings:operationInquiryPage.allPriority")}),(0,x.jsx)("option",{value:"urgent",children:e("settings:operationInquiryPage.urgent")}),(0,x.jsx)("option",{value:"high",children:e("settings:operationInquiryPage.high")}),(0,x.jsx)("option",{value:"medium",children:e("settings:operationInquiryPage.medium")}),(0,x.jsx)("option",{value:"low",children:e("settings:operationInquiryPage.low")})]}),(0,x.jsxs)(q,{value:te,onChange:e=>ne(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("settings:operationInquiryPage.allCategories")}),(0,x.jsx)("option",{value:"schedule",children:e("settings:operationInquiryPage.schedule")}),(0,x.jsx)("option",{value:"inventory",children:e("settings:operationInquiryPage.inventory")}),(0,x.jsx)("option",{value:"staff",children:e("settings:operationInquiryPage.staff")}),(0,x.jsx)("option",{value:"menu",children:e("settings:operationInquiryPage.menu")}),(0,x.jsx)("option",{value:"customer",children:e("settings:operationInquiryPage.customer")}),(0,x.jsx)("option",{value:"other",children:e("settings:operationInquiryPage.other")})]}),(0,x.jsx)(A,{placeholder:"Search inquiries...",value:Q,onChange:e=>V(e.target.value)})]}),(0,x.jsxs)(B,{children:[Ae.map(r=>{var t,n,i;return(0,x.jsxs)(k,{onClick:()=>(e=>{pe(e),window.dispatchEvent(new Event("refreshBadgeCounts"))})(r),style:{cursor:"pointer"},children:[(0,x.jsxs)(E,{children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(P,{children:r.ticketNumber}),(0,x.jsx)(S,{children:r.subject}),(0,x.jsxs)(z,{children:["Manager: ",r.managerName]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(_,{status:r.status,children:r.status}),(0,x.jsx)(R,{priority:r.priority,children:r.priority}),(null===(t=ge[r.id])||void 0===t?void 0:t.unread_count)>0?(0,x.jsx)("span",{style:{background:"#EF4444",color:"white",borderRadius:"6px",padding:"3px 10px",fontSize:"11px",fontWeight:700,animation:"pulse 1.5s infinite"},children:"New Reply"}):(null===(n=ge[r.id])||void 0===n?void 0:n.total_comments)>0?(0,x.jsx)("span",{style:{background:"#E0F2FE",color:"#0369A1",borderRadius:"6px",padding:"3px 10px",fontSize:"11px",fontWeight:600},children:"Replied"}):null]})]}),(0,x.jsx)($,{children:r.description}),(0,x.jsxs)(D,{children:[(0,x.jsxs)(T,{children:[(0,x.jsx)(O,{children:e("settings:operationInquiryPage.created")}),(0,x.jsx)(L,{children:Ce(r.createdAt)})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(O,{children:e("settings:operationInquiryPage.category")}),(0,x.jsx)(L,{children:r.category})]}),(null===(i=ge[r.id])||void 0===i?void 0:i.total_comments)>0&&(0,x.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ge[r.id].total_comments,ge[r.id].unread_count>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ge[r.id].unread_count," new"]})]})]})]},r.id)}),0===Ae.length&&(0,x.jsxs)(o.pp,{children:[(0,x.jsx)("h3",{children:e("settings:operationInquiryPage.noInquiriesYet")}),(0,x.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),ce&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>pe(null),title:ce.ticketNumber,size:"large",footer:(0,x.jsx)(j,{variant:"secondary",onClick:()=>pe(null),children:"Close"}),children:[(0,x.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,x.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",marginBottom:"8px",wordBreak:"break-word"},children:ce.subject}),(0,x.jsxs)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"},children:[(0,x.jsx)(_,{status:ce.status,children:ce.status}),(0,x.jsx)(R,{priority:ce.priority,children:ce.priority}),(0,x.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",padding:"4px 12px",background:"#F3F4F6",borderRadius:"6px"},children:ce.category})]}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:["To: ",ce.managerName," \xb7 ",Ce(ce.createdAt)]})]}),(0,x.jsx)($,{children:ce.description}),(null===ce||void 0===ce?void 0:ce.attachments)&&ce.attachments.length>0&&(0,x.jsx)(c.A,{attachments:ce.attachments}),(0,x.jsx)(l.A,{entityType:"operation_ticket",entityId:String(ce.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>he(e=>{const r={...e},t=String(ce.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]}),ie&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>oe(!1),title:"Create Operation Inquiry",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>oe(!1),children:"Cancel"}),(0,x.jsx)(j,{variant:"primary",onClick:async()=>{if(!le.subject.trim()||!le.description.trim()||!ae)return;const e=H.find(e=>e.id.toString()===ae);if(!e)return;const r=(e=>{const r=H.find(r=>r.id.toString()===e);if(r)return"Foodcourt General"===r.role||"Foodcourt Manager"===r.role?"foodcourt":"Brand General"===r.role||"Brand Manager"===r.role?"brand":"Restaurant Owner"===r.role?"owner":void 0})(ae);try{const t={requesterId:parseInt(ye),requesterName:me,requesterEmail:fe,requesterRole:je,restaurantId:parseInt(ve),restaurantName:be,managerId:parseInt(e.id.toString()),managerName:e.name,subject:le.subject,description:le.description,priority:le.priority,category:le.category,inquiryType:r,attachments:ue.length>0?ue:void 0},n=(0,u.c4)();(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(t)})).ok&&(await Fe(),de({subject:"",description:"",priority:"medium",category:"other"}),xe([]),se(1===H.length?H[0].id.toString():""),oe(!1))}catch(t){console.error("Error creating ticket:",t)}},disabled:!le.subject.trim()||!le.description.trim()||!ae,children:"Submit Inquiry"})]}),children:[(0,x.jsxs)(W,{children:[(0,x.jsx)(G,{children:"Inquiry Target *"}),(0,x.jsxs)(U,{value:ae,onChange:e=>se(e.target.value),required:!0,disabled:H.length<=1,children:[(0,x.jsx)("option",{value:"",children:0===H.length?"No one connected":"Select Inquiry Target"}),H.map(e=>{return(0,x.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(r=e.role,"Foodcourt General"===r||"Foodcourt Manager"===r?"Foodcourt":"Brand General"===r||"Brand Manager"===r?"Brand":"Restaurant Owner"===r?"Owner":r),")"]},e.id);var r})]}),0===H.length&&(0,x.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,x.jsxs)(W,{children:[(0,x.jsx)(G,{children:"Subject *"}),(0,x.jsx)(Y,{type:"text",value:le.subject,onChange:e=>de({...le,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,x.jsxs)(W,{children:[(0,x.jsx)(G,{children:"Description *"}),(0,x.jsx)(J,{value:le.description,onChange:e=>de({...le,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,x.jsxs)(W,{children:[(0,x.jsx)(G,{children:e("settings:operationInquiryPage.attachments")}),(0,x.jsx)(d.A,{files:ue,onChange:xe,maxFiles:5})]}),(0,x.jsxs)(M,{children:[(0,x.jsxs)(W,{children:[(0,x.jsx)(G,{children:e("settings:operationInquiryPage.priority")}),(0,x.jsxs)(U,{value:le.priority,onChange:e=>de({...le,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"low",children:e("settings:operationInquiryPage.low")}),(0,x.jsx)("option",{value:"medium",children:e("settings:operationInquiryPage.medium")}),(0,x.jsx)("option",{value:"high",children:e("settings:operationInquiryPage.high")}),(0,x.jsx)("option",{value:"urgent",children:e("settings:operationInquiryPage.urgent")})]})]}),(0,x.jsxs)(W,{children:[(0,x.jsx)(G,{children:e("settings:operationInquiryPage.category")}),(0,x.jsxs)(U,{value:le.category,onChange:e=>de({...le,category:e.target.value}),children:[(0,x.jsx)("option",{value:"schedule",children:e("settings:operationInquiryPage.schedule")}),(0,x.jsx)("option",{value:"inventory",children:e("settings:operationInquiryPage.inventory")}),(0,x.jsx)("option",{value:"staff",children:e("settings:operationInquiryPage.staff")}),(0,x.jsx)("option",{value:"menu",children:e("settings:operationInquiryPage.menu")}),(0,x.jsx)("option",{value:"customer",children:e("settings:operationInquiryPage.customer")}),(0,x.jsx)("option",{value:"other",children:e("settings:operationInquiryPage.other")})]})]})]})]})]})]})})}}}]);