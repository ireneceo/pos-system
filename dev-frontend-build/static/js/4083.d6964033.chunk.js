"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,t,r)=>{r.r(t),r.d(t,{default:()=>J});var n=r(9950),i=r(4752),o=r(2853),a=r(8409),s=r(1367),l=r(4302),d=r(7455),c=r(4185),p=r(5030),u=r(4414);const x=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,g=i.Ay.div`
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
`,y=i.Ay.h1`
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
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,v=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,b=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,w=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=i.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,I=(i.Ay.div`
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
`,q=i.Ay.div`
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
`,B=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=i.Ay.div`
  flex: 1;
`,C=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,P=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
`,S=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,z=i.Ay.div`
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
`,N=i.Ay.span`
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
`,$=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,D=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,T=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,O=i.Ay.span`
  color: #374151;
`,L=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,M=i.Ay.div`
  margin-bottom: 20px;
`,W=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,G=i.Ay.input`
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
`,Y=i.Ay.select`
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
`,J=()=>{const{t:e}=(0,p.Bd)("settings"),{user:t}=(0,s.As)(),[r,i]=(0,n.useState)([]),[J,H]=(0,n.useState)([]),[K,Q]=(0,n.useState)(""),[V,X]=(0,n.useState)("all"),[Z,ee]=(0,n.useState)("all"),[te,re]=(0,n.useState)("all"),[ne,ie]=(0,n.useState)(!1),[oe,ae]=(0,n.useState)(""),[se,le]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"other"}),[de,ce]=(0,n.useState)(null),[pe,ue]=(0,n.useState)([]),[xe,ge]=(0,n.useState)({}),he=(null===t||void 0===t?void 0:t.id)||"3",ye=(null===t||void 0===t?void 0:t.name)||(null===t||void 0===t?void 0:t.email)||"Restaurant User",me=(null===t||void 0===t?void 0:t.email)||"restaurant@example.com",fe=(null===t||void 0===t?void 0:t.role)||"Restaurant Admin",je=(null===t||void 0===t?void 0:t.restaurantId)||"1",ve=(null===t||void 0===t?void 0:t.restaurantName)||"Test Restaurant";(0,n.useEffect)(()=>{if(t&&t.restaurantId){we(),be();const e=setInterval(we,1e4);return()=>clearInterval(e)}},[t]),(0,n.useEffect)(()=>{1===J.length&&ae(J[0].id.toString())},[J]);const be=async()=>{try{const e=await fetch(`/api/restaurants/${je}`);if(e.ok){const t=await e.json();console.log("Restaurant data:",t),t.managers&&t.managers.length>0?H(t.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},we=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/operation-tickets?userId=${he}&userRole=${fe}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();i(e),Fe(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},Fe=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ge(t)}}}catch(t){console.error("Error fetching unread counts:",t)}},Ie=r.filter(e=>{const t=e.subject.toLowerCase().includes(K.toLowerCase())||e.ticketNumber.toLowerCase().includes(K.toLowerCase())||e.managerName.toLowerCase().includes(K.toLowerCase()),r="all"===V||e.status===V,n="all"===Z||e.priority===Z,i="all"===te||e.category===te;return t&&r&&n&&i}),Ae=r.length,qe=r.filter(e=>"open"===e.status).length,ke=r.filter(e=>"in-progress"===e.status).length,Be=r.filter(e=>"resolved"===e.status).length,Ee=e=>new Date(e).toLocaleString("en-MY");return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(x,{children:[(0,u.jsxs)(g,{children:[(0,u.jsx)(y,{children:e("settings:operationInquiryPage.operationInquiry")}),(0,u.jsx)(m,{children:(0,u.jsx)(f,{variant:"primary",onClick:()=>{ie(!0)},children:e("settings:operationInquiryPage.newInquiry")})})]}),(0,u.jsxs)(h,{children:[(0,u.jsxs)(j,{children:[(0,u.jsxs)(v,{color:"#635BFF",children:[(0,u.jsx)(b,{children:Ae}),(0,u.jsx)(w,{children:e("settings:operationInquiryPage.totalInquiries")})]}),(0,u.jsxs)(v,{color:"#F59E0B",children:[(0,u.jsx)(b,{children:qe}),(0,u.jsx)(w,{children:e("settings:operationInquiryPage.open")})]}),(0,u.jsxs)(v,{color:"#3B82F6",children:[(0,u.jsx)(b,{children:ke}),(0,u.jsx)(w,{children:e("settings:operationInquiryPage.inProgress")})]}),(0,u.jsxs)(v,{color:"#10B981",children:[(0,u.jsx)(b,{children:Be}),(0,u.jsx)(w,{children:e("settings:operationInquiryPage.resolved")})]})]}),(0,u.jsxs)(F,{children:[(0,u.jsxs)(A,{value:V,onChange:e=>X(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("settings:operationInquiryPage.allStatus")}),(0,u.jsx)("option",{value:"open",children:e("settings:operationInquiryPage.open")}),(0,u.jsx)("option",{value:"in-progress",children:e("settings:operationInquiryPage.inProgress")}),(0,u.jsx)("option",{value:"resolved",children:e("settings:operationInquiryPage.resolved")}),(0,u.jsx)("option",{value:"closed",children:e("settings:operationInquiryPage.closed")})]}),(0,u.jsxs)(A,{value:Z,onChange:e=>ee(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("settings:operationInquiryPage.allPriority")}),(0,u.jsx)("option",{value:"urgent",children:e("settings:operationInquiryPage.urgent")}),(0,u.jsx)("option",{value:"high",children:e("settings:operationInquiryPage.high")}),(0,u.jsx)("option",{value:"medium",children:e("settings:operationInquiryPage.medium")}),(0,u.jsx)("option",{value:"low",children:e("settings:operationInquiryPage.low")})]}),(0,u.jsxs)(A,{value:te,onChange:e=>re(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("settings:operationInquiryPage.allCategories")}),(0,u.jsx)("option",{value:"schedule",children:e("settings:operationInquiryPage.schedule")}),(0,u.jsx)("option",{value:"inventory",children:e("settings:operationInquiryPage.inventory")}),(0,u.jsx)("option",{value:"staff",children:e("settings:operationInquiryPage.staff")}),(0,u.jsx)("option",{value:"menu",children:e("settings:operationInquiryPage.menu")}),(0,u.jsx)("option",{value:"customer",children:e("settings:operationInquiryPage.customer")}),(0,u.jsx)("option",{value:"other",children:e("settings:operationInquiryPage.other")})]}),(0,u.jsx)(I,{placeholder:"Search inquiries...",value:K,onChange:e=>Q(e.target.value)})]}),(0,u.jsxs)(q,{children:[Ie.map(t=>{var r,n,i;return(0,u.jsxs)(k,{onClick:()=>(e=>{ce(e),window.dispatchEvent(new Event("refreshBadgeCounts"))})(t),style:{cursor:"pointer"},children:[(0,u.jsxs)(B,{children:[(0,u.jsxs)(E,{children:[(0,u.jsx)(C,{children:t.ticketNumber}),(0,u.jsx)(P,{children:t.subject}),(0,u.jsxs)(S,{children:["Manager: ",t.managerName]})]}),(0,u.jsxs)(z,{children:[(0,u.jsx)(_,{status:t.status,children:t.status}),(0,u.jsx)(N,{priority:t.priority,children:t.priority}),(null===(r=xe[t.id])||void 0===r?void 0:r.unread_count)>0?(0,u.jsx)("span",{style:{background:"#EF4444",color:"white",borderRadius:"6px",padding:"3px 10px",fontSize:"11px",fontWeight:700,animation:"pulse 1.5s infinite"},children:"New Reply"}):(null===(n=xe[t.id])||void 0===n?void 0:n.total_comments)>0?(0,u.jsx)("span",{style:{background:"#E0F2FE",color:"#0369A1",borderRadius:"6px",padding:"3px 10px",fontSize:"11px",fontWeight:600},children:"Replied"}):null]})]}),(0,u.jsx)(R,{children:t.description}),(0,u.jsxs)($,{children:[(0,u.jsxs)(D,{children:[(0,u.jsx)(T,{children:e("settings:operationInquiryPage.created")}),(0,u.jsx)(O,{children:Ee(t.createdAt)})]}),(0,u.jsxs)(D,{children:[(0,u.jsx)(T,{children:e("settings:operationInquiryPage.category")}),(0,u.jsx)(O,{children:t.category})]}),(null===(i=xe[t.id])||void 0===i?void 0:i.total_comments)>0&&(0,u.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",xe[t.id].total_comments,xe[t.id].unread_count>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[xe[t.id].unread_count," new"]})]})]})]},t.id)}),0===Ie.length&&(0,u.jsxs)(o.pp,{children:[(0,u.jsx)("h3",{children:e("settings:operationInquiryPage.noInquiriesYet")}),(0,u.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),de&&(0,u.jsxs)(a.aF,{isOpen:!0,onClose:()=>ce(null),title:de.ticketNumber,size:"large",footer:(0,u.jsx)(f,{variant:"secondary",onClick:()=>ce(null),children:"Close"}),children:[(0,u.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,u.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",marginBottom:"8px",wordBreak:"break-word"},children:de.subject}),(0,u.jsxs)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"},children:[(0,u.jsx)(_,{status:de.status,children:de.status}),(0,u.jsx)(N,{priority:de.priority,children:de.priority}),(0,u.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",padding:"4px 12px",background:"#F3F4F6",borderRadius:"6px"},children:de.category})]}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:["To: ",de.managerName," \xb7 ",Ee(de.createdAt)]})]}),(0,u.jsx)(R,{children:de.description}),(null===de||void 0===de?void 0:de.attachments)&&de.attachments.length>0&&(0,u.jsx)(c.A,{attachments:de.attachments}),(0,u.jsx)(l.A,{entityType:"operation_ticket",entityId:String(de.id),currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>ge(e=>{const t={...e},r=String(de.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),ne&&(0,u.jsxs)(a.aF,{isOpen:!0,onClose:()=>ie(!1),title:"Create Operation Inquiry",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(f,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,u.jsx)(f,{variant:"primary",onClick:async()=>{if(!se.subject.trim()||!se.description.trim()||!oe)return;const e=J.find(e=>e.id.toString()===oe);if(!e)return;const t=(e=>{const t=J.find(t=>t.id.toString()===e);if(t)return"Foodcourt General"===t.role||"Foodcourt Manager"===t.role?"foodcourt":"Brand General"===t.role||"Brand Manager"===t.role?"brand":"Restaurant Owner"===t.role?"owner":void 0})(oe);try{const r={requesterId:parseInt(he),requesterName:ye,requesterEmail:me,requesterRole:fe,restaurantId:parseInt(je),restaurantName:ve,managerId:parseInt(e.id.toString()),managerName:e.name,subject:se.subject,description:se.description,priority:se.priority,category:se.category,inquiryType:t,attachments:pe.length>0?pe:void 0},n=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(r)})).ok&&(await we(),le({subject:"",description:"",priority:"medium",category:"other"}),ue([]),ae(1===J.length?J[0].id.toString():""),ie(!1))}catch(r){console.error("Error creating ticket:",r)}},disabled:!se.subject.trim()||!se.description.trim()||!oe,children:"Submit Inquiry"})]}),children:[(0,u.jsxs)(M,{children:[(0,u.jsx)(W,{children:"Inquiry Target *"}),(0,u.jsxs)(Y,{value:oe,onChange:e=>ae(e.target.value),required:!0,disabled:J.length<=1,children:[(0,u.jsx)("option",{value:"",children:0===J.length?"No one connected":"Select Inquiry Target"}),J.map(e=>{return(0,u.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(t=e.role,"Foodcourt General"===t||"Foodcourt Manager"===t?"Foodcourt":"Brand General"===t||"Brand Manager"===t?"Brand":"Restaurant Owner"===t?"Owner":t),")"]},e.id);var t})]}),0===J.length&&(0,u.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,u.jsxs)(M,{children:[(0,u.jsx)(W,{children:"Subject *"}),(0,u.jsx)(G,{type:"text",value:se.subject,onChange:e=>le({...se,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,u.jsxs)(M,{children:[(0,u.jsx)(W,{children:"Description *"}),(0,u.jsx)(U,{value:se.description,onChange:e=>le({...se,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,u.jsxs)(M,{children:[(0,u.jsx)(W,{children:e("settings:operationInquiryPage.attachments")}),(0,u.jsx)(d.A,{files:pe,onChange:ue,maxFiles:5})]}),(0,u.jsxs)(L,{children:[(0,u.jsxs)(M,{children:[(0,u.jsx)(W,{children:e("settings:operationInquiryPage.priority")}),(0,u.jsxs)(Y,{value:se.priority,onChange:e=>le({...se,priority:e.target.value}),children:[(0,u.jsx)("option",{value:"low",children:e("settings:operationInquiryPage.low")}),(0,u.jsx)("option",{value:"medium",children:e("settings:operationInquiryPage.medium")}),(0,u.jsx)("option",{value:"high",children:e("settings:operationInquiryPage.high")}),(0,u.jsx)("option",{value:"urgent",children:e("settings:operationInquiryPage.urgent")})]})]}),(0,u.jsxs)(M,{children:[(0,u.jsx)(W,{children:e("settings:operationInquiryPage.category")}),(0,u.jsxs)(Y,{value:se.category,onChange:e=>le({...se,category:e.target.value}),children:[(0,u.jsx)("option",{value:"schedule",children:e("settings:operationInquiryPage.schedule")}),(0,u.jsx)("option",{value:"inventory",children:e("settings:operationInquiryPage.inventory")}),(0,u.jsx)("option",{value:"staff",children:e("settings:operationInquiryPage.staff")}),(0,u.jsx)("option",{value:"menu",children:e("settings:operationInquiryPage.menu")}),(0,u.jsx)("option",{value:"customer",children:e("settings:operationInquiryPage.customer")}),(0,u.jsx)("option",{value:"other",children:e("settings:operationInquiryPage.other")})]})]})]})]})]})]})})}}}]);