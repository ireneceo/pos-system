"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>X});var n=t(9950),o=t(4752),i=t(1367),a=t(4302),s=t(4414);const d=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=o.Ay.div`
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
`,c=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=o.Ay.div`
  display: flex;
  gap: 12px;
`,u=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,h=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,m=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=o.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,j=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,b=o.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=o.Ay.input`
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
`,w=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,A=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,F=o.Ay.div`
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
`,k=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=o.Ay.div`
  flex: 1;
`,C=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=o.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
`,S=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,z=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,I=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,_=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,$=o.Ay.div`
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
`,q=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,T=o.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,D=o.Ay.span`
  color: #374151;
`,M=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,O=o.Ay.div`
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
`,R=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,L=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,P=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,U=o.Ay.button`
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
`,G=o.Ay.div`
  padding: 24px;
`,J=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,W=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Y=o.Ay.div`
  margin-bottom: 20px;
`,H=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,K=o.Ay.input`
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
`,Q=o.Ay.select`
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
`,V=o.Ay.textarea`
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
`,X=()=>{const{user:e}=(0,i.As)(),[r,t]=(0,n.useState)([]),[o,X]=(0,n.useState)([]),[Z,ee]=(0,n.useState)(""),[re,te]=(0,n.useState)("all"),[ne,oe]=(0,n.useState)("all"),[ie,ae]=(0,n.useState)("all"),[se,de]=(0,n.useState)(!1),[le,ce]=(0,n.useState)(""),[pe,xe]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"other"}),[ue,he]=(0,n.useState)(null),[ge,me]=(0,n.useState)({}),ye=(null===e||void 0===e?void 0:e.id)||"3",fe=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",je=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",be=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",ve=(null===e||void 0===e?void 0:e.restaurantId)||"1",we=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,n.useEffect)(()=>{if(e&&e.restaurantId){Fe(),Ae();const e=setInterval(Fe,1e4);return()=>clearInterval(e)}},[e]),(0,n.useEffect)(()=>{1===o.length&&ce(o[0].id.toString())},[o]);const Ae=async()=>{try{const e=await fetch(`/api/restaurants/${ve}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?X(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},Fe=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ye}&userRole=${be}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e),ke(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},ke=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),me(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},Ee=r.filter(e=>{const r=e.subject.toLowerCase().includes(Z.toLowerCase())||e.ticketNumber.toLowerCase().includes(Z.toLowerCase())||e.managerName.toLowerCase().includes(Z.toLowerCase()),t="all"===re||e.status===re,n="all"===ne||e.priority===ne,o="all"===ie||e.category===ie;return r&&t&&n&&o}),Ce=r.length,Be=r.filter(e=>"open"===e.status).length,Se=r.filter(e=>"in-progress"===e.status).length,ze=r.filter(e=>"resolved"===e.status).length,Ie=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY"));return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(d,{children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsxs)(x,{children:[(0,s.jsx)(u,{variant:"secondary",onClick:Fe,children:"Refresh"}),(0,s.jsx)(u,{variant:"primary",onClick:()=>{de(!0)},children:"New Inquiry"})]})]}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(h,{children:[(0,s.jsxs)(g,{color:"#635BFF",children:[(0,s.jsx)(m,{children:Ce}),(0,s.jsx)(y,{children:"Total Inquiries"})]}),(0,s.jsxs)(g,{color:"#F59E0B",children:[(0,s.jsx)(m,{children:Be}),(0,s.jsx)(y,{children:"Open"})]}),(0,s.jsxs)(g,{color:"#3B82F6",children:[(0,s.jsx)(m,{children:Se}),(0,s.jsx)(y,{children:"In Progress"})]}),(0,s.jsxs)(g,{color:"#10B981",children:[(0,s.jsx)(m,{children:ze}),(0,s.jsx)(y,{children:"Resolved"})]})]}),(0,s.jsxs)(f,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Search"}),(0,s.jsx)(v,{placeholder:"Search inquiries...",value:Z,onChange:e=>ee(e.target.value)})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Status"}),(0,s.jsxs)(w,{value:re,onChange:e=>te(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Priority"}),(0,s.jsxs)(w,{value:ne,onChange:e=>oe(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Priority"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"low",children:"Low"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Category"}),(0,s.jsxs)(w,{value:ie,onChange:e=>ae(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Categories"}),(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,s.jsxs)(A,{children:[Ee.map(e=>(0,s.jsxs)(F,{onClick:()=>(e=>{he(e)})(e),style:{cursor:"pointer"},children:[(0,s.jsxs)(k,{children:[(0,s.jsxs)(E,{children:[(0,s.jsx)(C,{children:e.ticketNumber}),(0,s.jsx)(B,{children:e.subject}),(0,s.jsxs)(S,{children:["Manager: ",e.managerName]})]}),(0,s.jsxs)(z,{children:[(0,s.jsx)(I,{status:e.status,children:e.status}),(0,s.jsx)(_,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)($,{children:e.description}),(0,s.jsxs)(q,{children:[(0,s.jsxs)(N,{children:[(0,s.jsx)(T,{children:"Created"}),(0,s.jsx)(D,{children:Ie(e.createdAt)})]}),(0,s.jsxs)(N,{children:[(0,s.jsx)(T,{children:"Category"}),(0,s.jsx)(D,{children:e.category})]}),ge[e.id]&&(0,s.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ge[e.id].total_comments,ge[e.id].unread_count>0&&(0,s.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ge[e.id].unread_count," new"]})]})]})]},e.id)),0===Ee.length&&(0,s.jsxs)(M,{children:[(0,s.jsx)("h3",{children:"No inquiries yet"}),(0,s.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),ue&&(0,s.jsx)(O,{onClick:()=>he(null),children:(0,s.jsxs)(R,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,s.jsxs)(L,{children:[(0,s.jsx)(P,{children:ue.ticketNumber}),(0,s.jsx)(U,{onClick:()=>he(null),children:"\xd7"})]}),(0,s.jsxs)(G,{children:[(0,s.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,s.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",marginBottom:"8px",wordBreak:"break-word"},children:ue.subject}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"},children:[(0,s.jsx)(I,{status:ue.status,children:ue.status}),(0,s.jsx)(_,{priority:ue.priority,children:ue.priority}),(0,s.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",padding:"4px 12px",background:"#F3F4F6",borderRadius:"6px"},children:ue.category})]}),(0,s.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:["To: ",ue.managerName," \xb7 ",Ie(ue.createdAt)]})]}),(0,s.jsx)($,{children:ue.description}),(0,s.jsx)(a.A,{entityType:"operation_ticket",entityId:String(ue.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>me(e=>{const r={...e},t=String(ue.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})}),se&&(0,s.jsx)(O,{onClick:()=>de(!1),children:(0,s.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(L,{children:[(0,s.jsx)(P,{children:"Create Operation Inquiry"}),(0,s.jsx)(U,{onClick:()=>de(!1),children:"\xd7"})]}),(0,s.jsxs)(G,{children:[(0,s.jsxs)(Y,{children:[(0,s.jsx)(H,{children:"Inquiry Target *"}),(0,s.jsxs)(Q,{value:le,onChange:e=>ce(e.target.value),required:!0,disabled:o.length<=1,children:[(0,s.jsx)("option",{value:"",children:0===o.length?"No one connected":"Select Inquiry Target"}),o.map(e=>{return(0,s.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(r=e.role,"Foodcourt General"===r||"Foodcourt Manager"===r?"Foodcourt":"Brand General"===r||"Brand Manager"===r?"Brand":"Restaurant Owner"===r?"Owner":r),")"]},e.id);var r})]}),0===o.length&&(0,s.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(H,{children:"Subject *"}),(0,s.jsx)(K,{type:"text",value:pe.subject,onChange:e=>xe({...pe,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(H,{children:"Description *"}),(0,s.jsx)(V,{value:pe.description,onChange:e=>xe({...pe,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,s.jsxs)(W,{children:[(0,s.jsxs)(Y,{children:[(0,s.jsx)(H,{children:"Priority"}),(0,s.jsxs)(Q,{value:pe.priority,onChange:e=>xe({...pe,priority:e.target.value}),children:[(0,s.jsx)("option",{value:"low",children:"Low"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(H,{children:"Category"}),(0,s.jsxs)(Q,{value:pe.category,onChange:e=>xe({...pe,category:e.target.value}),children:[(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,s.jsxs)(J,{children:[(0,s.jsx)(u,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,s.jsx)(u,{variant:"primary",onClick:async()=>{if(!pe.subject.trim()||!pe.description.trim()||!le)return;const e=o.find(e=>e.id.toString()===le);if(!e)return;const r=(e=>{const r=o.find(r=>r.id.toString()===e);if(r)return"Foodcourt General"===r.role||"Foodcourt Manager"===r.role?"foodcourt":"Brand General"===r.role||"Brand Manager"===r.role?"brand":"Restaurant Owner"===r.role?"owner":void 0})(le);try{const t={requesterId:parseInt(ye),requesterName:fe,requesterEmail:je,requesterRole:be,restaurantId:parseInt(ve),restaurantName:we,managerId:parseInt(e.id.toString()),managerName:e.name,subject:pe.subject,description:pe.description,priority:pe.priority,category:pe.category,inquiryType:r},n=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(t)})).ok&&(await Fe(),xe({subject:"",description:"",priority:"medium",category:"other"}),ce(1===o.length?o[0].id.toString():""),de(!1))}catch(t){console.error("Error creating ticket:",t)}},disabled:!pe.subject.trim()||!pe.description.trim()||!le,children:"Submit Inquiry"})]})]})})]})]})})}},4302:(e,r,t)=>{t.d(r,{A:()=>w});var n=t(9950),o=t(4752),i=t(4414);const a=o.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,s=o.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,l=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,c=o.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`,p=o.Ay.div`
  flex: 1;
  min-width: 0;
`,x=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,u=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,h=o.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,g=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,m=o.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,y=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,f=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,j=o.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`,b=o.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,v=o.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,w=e=>{let{entityType:r,entityId:t,currentUserId:o,onMarkRead:w}=e;const[A,F]=(0,n.useState)([]),[k,E]=(0,n.useState)(""),[C,B]=(0,n.useState)(!1),S=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&F(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&(S(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),w&&w()}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const z=async()=>{if(k.trim()&&!C){B(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:k.trim()})})).ok&&(E(""),S())}catch(e){console.error("Error adding comment:",e)}finally{B(!1)}}},I=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),n=Math.floor(t/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,i.jsxs)(a,{children:[(0,i.jsxs)(s,{children:["Comments (",A.length,")"]}),A.length>0?(0,i.jsx)(d,{children:A.map(e=>{var r,t,n;return(0,i.jsxs)(l,{children:[(0,i.jsx)(c,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,i.jsxs)(p,{children:[(0,i.jsxs)(x,{children:[(0,i.jsx)(u,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,i.jsx)(h,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,i.jsx)(g,{children:I(e.createdAt)}),o&&e.author_id===o&&(0,i.jsx)(y,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&S()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,i.jsx)(m,{children:e.content})]})]},e.id)})}):(0,i.jsx)(v,{children:"No comments yet"}),(0,i.jsxs)(f,{children:[(0,i.jsx)(j,{value:k,onChange:e=>E(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),z())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,i.jsx)(b,{onClick:z,disabled:!k.trim()||C,children:"Send"})]})]})}}}]);