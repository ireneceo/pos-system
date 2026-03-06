"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ee});var n=t(9950),i=t(4752),o=t(2853),a=t(1367),s=t(4302),d=t(7455),l=t(4185),c=t(4414);const p=i.Ay.div`
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
`,u=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=i.Ay.div`
  display: flex;
  gap: 12px;
`,m=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,j=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=i.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,w=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,A=i.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=i.Ay.input`
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
`,k=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,C=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,B=i.Ay.div`
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
`,S=i.Ay.div`
  flex: 1;
`,z=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,I=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
`,q=i.Ay.div`
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
`,M=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,O=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,T=i.Ay.span`
  color: #374151;
`,L=i.Ay.div`
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
  margin: auto 0;
`,P=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
  margin: auto 0;
`,G=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,U=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,W=i.Ay.button`
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
`,Y=i.Ay.div`
  padding: 24px;
`,H=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,J=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,K=i.Ay.div`
  margin-bottom: 20px;
`,Q=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,V=i.Ay.input`
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
`,X=i.Ay.select`
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
`,Z=i.Ay.textarea`
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
`,ee=()=>{const{user:e}=(0,a.As)(),[r,t]=(0,n.useState)([]),[i,ee]=(0,n.useState)([]),[re,te]=(0,n.useState)(""),[ne,ie]=(0,n.useState)("all"),[oe,ae]=(0,n.useState)("all"),[se,de]=(0,n.useState)("all"),[le,ce]=(0,n.useState)(!1),[pe,xe]=(0,n.useState)(""),[ue,he]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"other"}),[ge,me]=(0,n.useState)(null),[fe,ye]=(0,n.useState)([]),[je,be]=(0,n.useState)({}),ve=(null===e||void 0===e?void 0:e.id)||"3",we=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",Ae=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",Fe=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",ke=(null===e||void 0===e?void 0:e.restaurantId)||"1",Ce=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,n.useEffect)(()=>{if(e&&e.restaurantId){Ee(),Be();const e=setInterval(Ee,1e4);return()=>clearInterval(e)}},[e]),(0,n.useEffect)(()=>{1===i.length&&xe(i[0].id.toString())},[i]);const Be=async()=>{try{const e=await fetch(`/api/restaurants/${ke}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?ee(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},Ee=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ve}&userRole=${Fe}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e),Se(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},Se=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),be(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},ze=r.filter(e=>{const r=e.subject.toLowerCase().includes(re.toLowerCase())||e.ticketNumber.toLowerCase().includes(re.toLowerCase())||e.managerName.toLowerCase().includes(re.toLowerCase()),t="all"===ne||e.status===ne,n="all"===oe||e.priority===oe,i="all"===se||e.category===se;return r&&t&&n&&i}),Ie=r.length,qe=r.filter(e=>"open"===e.status).length,Ne=r.filter(e=>"in-progress"===e.status).length,_e=r.filter(e=>"resolved"===e.status).length,Re=e=>new Date(e).toLocaleString("en-MY");return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:"Operation Inquiry"}),(0,c.jsx)(g,{children:(0,c.jsx)(m,{variant:"primary",onClick:()=>{ce(!0)},children:"New Inquiry"})})]}),(0,c.jsxs)(u,{children:[(0,c.jsxs)(f,{children:[(0,c.jsxs)(y,{color:"#635BFF",children:[(0,c.jsx)(j,{children:Ie}),(0,c.jsx)(b,{children:"Total Inquiries"})]}),(0,c.jsxs)(y,{color:"#F59E0B",children:[(0,c.jsx)(j,{children:qe}),(0,c.jsx)(b,{children:"Open"})]}),(0,c.jsxs)(y,{color:"#3B82F6",children:[(0,c.jsx)(j,{children:Ne}),(0,c.jsx)(b,{children:"In Progress"})]}),(0,c.jsxs)(y,{color:"#10B981",children:[(0,c.jsx)(j,{children:_e}),(0,c.jsx)(b,{children:"Resolved"})]})]}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Status"}),(0,c.jsxs)(k,{value:ne,onChange:e=>ie(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"resolved",children:"Resolved"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Priority"}),(0,c.jsxs)(k,{value:oe,onChange:e=>ae(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Priority"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"low",children:"Low"})]})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Category"}),(0,c.jsxs)(k,{value:se,onChange:e=>de(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"schedule",children:"Schedule"}),(0,c.jsx)("option",{value:"inventory",children:"Inventory"}),(0,c.jsx)("option",{value:"staff",children:"Staff"}),(0,c.jsx)("option",{value:"menu",children:"Menu"}),(0,c.jsx)("option",{value:"customer",children:"Customer"}),(0,c.jsx)("option",{value:"other",children:"Other"})]})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Search"}),(0,c.jsx)(F,{placeholder:"Search inquiries...",value:re,onChange:e=>te(e.target.value)})]})]}),(0,c.jsxs)(C,{children:[ze.map(e=>(0,c.jsxs)(B,{onClick:()=>(e=>{me(e),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),style:{cursor:"pointer"},children:[(0,c.jsxs)(E,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)(z,{children:e.ticketNumber}),(0,c.jsx)(I,{children:e.subject}),(0,c.jsxs)(q,{children:["Manager: ",e.managerName]})]}),(0,c.jsxs)(N,{children:[(0,c.jsx)(_,{status:e.status,children:e.status}),(0,c.jsx)(R,{priority:e.priority,children:e.priority})]})]}),(0,c.jsx)($,{children:e.description}),(0,c.jsxs)(D,{children:[(0,c.jsxs)(M,{children:[(0,c.jsx)(O,{children:"Created"}),(0,c.jsx)(T,{children:Re(e.createdAt)})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(O,{children:"Category"}),(0,c.jsx)(T,{children:e.category})]}),je[e.id]&&(0,c.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",je[e.id].total_comments,je[e.id].unread_count>0&&(0,c.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[je[e.id].unread_count," new"]})]})]})]},e.id)),0===ze.length&&(0,c.jsxs)(o.pp,{children:[(0,c.jsx)("h3",{children:"No inquiries yet"}),(0,c.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),ge&&(0,c.jsx)(L,{onClick:()=>me(null),children:(0,c.jsxs)(P,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,c.jsxs)(G,{children:[(0,c.jsx)(U,{children:ge.ticketNumber}),(0,c.jsx)(W,{onClick:()=>me(null),children:"\xd7"})]}),(0,c.jsxs)(Y,{children:[(0,c.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,c.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",marginBottom:"8px",wordBreak:"break-word"},children:ge.subject}),(0,c.jsxs)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"},children:[(0,c.jsx)(_,{status:ge.status,children:ge.status}),(0,c.jsx)(R,{priority:ge.priority,children:ge.priority}),(0,c.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",padding:"4px 12px",background:"#F3F4F6",borderRadius:"6px"},children:ge.category})]}),(0,c.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:["To: ",ge.managerName," \xb7 ",Re(ge.createdAt)]})]}),(0,c.jsx)($,{children:ge.description}),(null===ge||void 0===ge?void 0:ge.attachments)&&ge.attachments.length>0&&(0,c.jsx)(l.A,{attachments:ge.attachments}),(0,c.jsx)(s.A,{entityType:"operation_ticket",entityId:String(ge.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>be(e=>{const r={...e},t=String(ge.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})}),le&&(0,c.jsx)(L,{onClick:()=>ce(!1),children:(0,c.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(G,{children:[(0,c.jsx)(U,{children:"Create Operation Inquiry"}),(0,c.jsx)(W,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,c.jsxs)(Y,{children:[(0,c.jsxs)(K,{children:[(0,c.jsx)(Q,{children:"Inquiry Target *"}),(0,c.jsxs)(X,{value:pe,onChange:e=>xe(e.target.value),required:!0,disabled:i.length<=1,children:[(0,c.jsx)("option",{value:"",children:0===i.length?"No one connected":"Select Inquiry Target"}),i.map(e=>{return(0,c.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(r=e.role,"Foodcourt General"===r||"Foodcourt Manager"===r?"Foodcourt":"Brand General"===r||"Brand Manager"===r?"Brand":"Restaurant Owner"===r?"Owner":r),")"]},e.id);var r})]}),0===i.length&&(0,c.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,c.jsxs)(K,{children:[(0,c.jsx)(Q,{children:"Subject *"}),(0,c.jsx)(V,{type:"text",value:ue.subject,onChange:e=>he({...ue,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,c.jsxs)(K,{children:[(0,c.jsx)(Q,{children:"Description *"}),(0,c.jsx)(Z,{value:ue.description,onChange:e=>he({...ue,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,c.jsxs)(K,{children:[(0,c.jsx)(Q,{children:"Attachments"}),(0,c.jsx)(d.A,{files:fe,onChange:ye,maxFiles:5})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(K,{children:[(0,c.jsx)(Q,{children:"Priority"}),(0,c.jsxs)(X,{value:ue.priority,onChange:e=>he({...ue,priority:e.target.value}),children:[(0,c.jsx)("option",{value:"low",children:"Low"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,c.jsxs)(K,{children:[(0,c.jsx)(Q,{children:"Category"}),(0,c.jsxs)(X,{value:ue.category,onChange:e=>he({...ue,category:e.target.value}),children:[(0,c.jsx)("option",{value:"schedule",children:"Schedule"}),(0,c.jsx)("option",{value:"inventory",children:"Inventory"}),(0,c.jsx)("option",{value:"staff",children:"Staff"}),(0,c.jsx)("option",{value:"menu",children:"Menu"}),(0,c.jsx)("option",{value:"customer",children:"Customer"}),(0,c.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(m,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,c.jsx)(m,{variant:"primary",onClick:async()=>{if(!ue.subject.trim()||!ue.description.trim()||!pe)return;const e=i.find(e=>e.id.toString()===pe);if(!e)return;const r=(e=>{const r=i.find(r=>r.id.toString()===e);if(r)return"Foodcourt General"===r.role||"Foodcourt Manager"===r.role?"foodcourt":"Brand General"===r.role||"Brand Manager"===r.role?"brand":"Restaurant Owner"===r.role?"owner":void 0})(pe);try{const t={requesterId:parseInt(ve),requesterName:we,requesterEmail:Ae,requesterRole:Fe,restaurantId:parseInt(ke),restaurantName:Ce,managerId:parseInt(e.id.toString()),managerName:e.name,subject:ue.subject,description:ue.description,priority:ue.priority,category:ue.category,inquiryType:r,attachments:fe.length>0?fe:void 0},n=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(t)})).ok&&(await Ee(),he({subject:"",description:"",priority:"medium",category:"other"}),ye([]),xe(1===i.length?i[0].id.toString():""),ce(!1))}catch(t){console.error("Error creating ticket:",t)}},disabled:!ue.subject.trim()||!ue.description.trim()||!pe,children:"Submit Inquiry"})]})]})})]})]})})}}}]);