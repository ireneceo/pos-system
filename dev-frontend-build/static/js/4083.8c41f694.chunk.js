"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ee});var n=t(9950),i=t(4752),o=t(1367),a=t(4302),s=t(7455),l=t(4185),d=t(4414);const c=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=i.Ay.div`
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
`,x=i.Ay.div`
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
`,u=i.Ay.div`
  display: flex;
  gap: 12px;
`,g=i.Ay.button`
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
`,m=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,y=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,j=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=i.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,v=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,A=i.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=i.Ay.input`
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
`,F=i.Ay.select`
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
`,E=i.Ay.div`
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
`,C=i.Ay.div`
  flex: 1;
`,z=i.Ay.div`
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
`,I=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,D=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,$=i.Ay.span`
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
`,N=i.Ay.div`
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
`,T=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,q=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,O=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,M=i.Ay.span`
  color: #374151;
`,R=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
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
`,P=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,U=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,W=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,J=i.Ay.button`
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
`,G=i.Ay.div`
  padding: 24px;
`,K=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,Y=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,H=i.Ay.div`
  margin-bottom: 20px;
`,X=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,Z=i.Ay.input`
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
`,Q=i.Ay.select`
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
`,V=i.Ay.textarea`
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
`,ee=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,n.useState)([]),[i,ee]=(0,n.useState)([]),[re,te]=(0,n.useState)(""),[ne,ie]=(0,n.useState)("all"),[oe,ae]=(0,n.useState)("all"),[se,le]=(0,n.useState)("all"),[de,ce]=(0,n.useState)(!1),[pe,xe]=(0,n.useState)(""),[he,ue]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"other"}),[ge,fe]=(0,n.useState)(null),[me,ye]=(0,n.useState)([]),[je,be]=(0,n.useState)({}),ve=(null===e||void 0===e?void 0:e.id)||"3",Ae=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",we=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",Fe=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",ke=(null===e||void 0===e?void 0:e.restaurantId)||"1",Ee=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,n.useEffect)(()=>{if(e&&e.restaurantId){Ce(),Be();const e=setInterval(Ce,1e4);return()=>clearInterval(e)}},[e]),(0,n.useEffect)(()=>{1===i.length&&xe(i[0].id.toString())},[i]);const Be=async()=>{try{const e=await fetch(`/api/restaurants/${ke}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?ee(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},Ce=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ve}&userRole=${Fe}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e),ze(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},ze=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),be(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},Se=r.filter(e=>{const r=e.subject.toLowerCase().includes(re.toLowerCase())||e.ticketNumber.toLowerCase().includes(re.toLowerCase())||e.managerName.toLowerCase().includes(re.toLowerCase()),t="all"===ne||e.status===ne,n="all"===oe||e.priority===oe,i="all"===se||e.category===se;return r&&t&&n&&i}),Ie=r.length,De=r.filter(e=>"open"===e.status).length,$e=r.filter(e=>"in-progress"===e.status).length,_e=r.filter(e=>"resolved"===e.status).length,Ne=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY"));return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:"Operation Inquiry"}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{variant:"secondary",onClick:Ce,children:"Refresh"}),(0,d.jsx)(g,{variant:"primary",onClick:()=>{ce(!0)},children:"New Inquiry"})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(f,{children:[(0,d.jsxs)(m,{color:"#635BFF",children:[(0,d.jsx)(y,{children:Ie}),(0,d.jsx)(j,{children:"Total Inquiries"})]}),(0,d.jsxs)(m,{color:"#F59E0B",children:[(0,d.jsx)(y,{children:De}),(0,d.jsx)(j,{children:"Open"})]}),(0,d.jsxs)(m,{color:"#3B82F6",children:[(0,d.jsx)(y,{children:$e}),(0,d.jsx)(j,{children:"In Progress"})]}),(0,d.jsxs)(m,{color:"#10B981",children:[(0,d.jsx)(y,{children:_e}),(0,d.jsx)(j,{children:"Resolved"})]})]}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(A,{children:"Search"}),(0,d.jsx)(w,{placeholder:"Search inquiries...",value:re,onChange:e=>te(e.target.value)})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(A,{children:"Status"}),(0,d.jsxs)(F,{value:ne,onChange:e=>ie(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(A,{children:"Priority"}),(0,d.jsxs)(F,{value:oe,onChange:e=>ae(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Priority"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"low",children:"Low"})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(A,{children:"Category"}),(0,d.jsxs)(F,{value:se,onChange:e=>le(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Categories"}),(0,d.jsx)("option",{value:"schedule",children:"Schedule"}),(0,d.jsx)("option",{value:"inventory",children:"Inventory"}),(0,d.jsx)("option",{value:"staff",children:"Staff"}),(0,d.jsx)("option",{value:"menu",children:"Menu"}),(0,d.jsx)("option",{value:"customer",children:"Customer"}),(0,d.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,d.jsxs)(k,{children:[Se.map(e=>(0,d.jsxs)(E,{onClick:()=>(e=>{fe(e)})(e),style:{cursor:"pointer"},children:[(0,d.jsxs)(B,{children:[(0,d.jsxs)(C,{children:[(0,d.jsx)(z,{children:e.ticketNumber}),(0,d.jsx)(S,{children:e.subject}),(0,d.jsxs)(I,{children:["Manager: ",e.managerName]})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)($,{status:e.status,children:e.status}),(0,d.jsx)(_,{priority:e.priority,children:e.priority})]})]}),(0,d.jsx)(N,{children:e.description}),(0,d.jsxs)(T,{children:[(0,d.jsxs)(q,{children:[(0,d.jsx)(O,{children:"Created"}),(0,d.jsx)(M,{children:Ne(e.createdAt)})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(O,{children:"Category"}),(0,d.jsx)(M,{children:e.category})]}),je[e.id]&&(0,d.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",je[e.id].total_comments,je[e.id].unread_count>0&&(0,d.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[je[e.id].unread_count," new"]})]})]})]},e.id)),0===Se.length&&(0,d.jsxs)(R,{children:[(0,d.jsx)("h3",{children:"No inquiries yet"}),(0,d.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),ge&&(0,d.jsx)(L,{onClick:()=>fe(null),children:(0,d.jsxs)(P,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,d.jsxs)(U,{children:[(0,d.jsx)(W,{children:ge.ticketNumber}),(0,d.jsx)(J,{onClick:()=>fe(null),children:"\xd7"})]}),(0,d.jsxs)(G,{children:[(0,d.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,d.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",marginBottom:"8px",wordBreak:"break-word"},children:ge.subject}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"},children:[(0,d.jsx)($,{status:ge.status,children:ge.status}),(0,d.jsx)(_,{priority:ge.priority,children:ge.priority}),(0,d.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",padding:"4px 12px",background:"#F3F4F6",borderRadius:"6px"},children:ge.category})]}),(0,d.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:["To: ",ge.managerName," \xb7 ",Ne(ge.createdAt)]})]}),(0,d.jsx)(N,{children:ge.description}),(null===ge||void 0===ge?void 0:ge.attachments)&&ge.attachments.length>0&&(0,d.jsx)(l.A,{attachments:ge.attachments}),(0,d.jsx)(a.A,{entityType:"operation_ticket",entityId:String(ge.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>be(e=>{const r={...e},t=String(ge.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})}),de&&(0,d.jsx)(L,{onClick:()=>ce(!1),children:(0,d.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(U,{children:[(0,d.jsx)(W,{children:"Create Operation Inquiry"}),(0,d.jsx)(J,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,d.jsxs)(G,{children:[(0,d.jsxs)(H,{children:[(0,d.jsx)(X,{children:"Inquiry Target *"}),(0,d.jsxs)(Q,{value:pe,onChange:e=>xe(e.target.value),required:!0,disabled:i.length<=1,children:[(0,d.jsx)("option",{value:"",children:0===i.length?"No one connected":"Select Inquiry Target"}),i.map(e=>{return(0,d.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(r=e.role,"Foodcourt General"===r||"Foodcourt Manager"===r?"Foodcourt":"Brand General"===r||"Brand Manager"===r?"Brand":"Restaurant Owner"===r?"Owner":r),")"]},e.id);var r})]}),0===i.length&&(0,d.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(X,{children:"Subject *"}),(0,d.jsx)(Z,{type:"text",value:he.subject,onChange:e=>ue({...he,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(X,{children:"Description *"}),(0,d.jsx)(V,{value:he.description,onChange:e=>ue({...he,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(X,{children:"Attachments"}),(0,d.jsx)(s.A,{files:me,onChange:ye,maxFiles:5})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(H,{children:[(0,d.jsx)(X,{children:"Priority"}),(0,d.jsxs)(Q,{value:he.priority,onChange:e=>ue({...he,priority:e.target.value}),children:[(0,d.jsx)("option",{value:"low",children:"Low"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(X,{children:"Category"}),(0,d.jsxs)(Q,{value:he.category,onChange:e=>ue({...he,category:e.target.value}),children:[(0,d.jsx)("option",{value:"schedule",children:"Schedule"}),(0,d.jsx)("option",{value:"inventory",children:"Inventory"}),(0,d.jsx)("option",{value:"staff",children:"Staff"}),(0,d.jsx)("option",{value:"menu",children:"Menu"}),(0,d.jsx)("option",{value:"customer",children:"Customer"}),(0,d.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,d.jsxs)(K,{children:[(0,d.jsx)(g,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,d.jsx)(g,{variant:"primary",onClick:async()=>{if(!he.subject.trim()||!he.description.trim()||!pe)return;const e=i.find(e=>e.id.toString()===pe);if(!e)return;const r=(e=>{const r=i.find(r=>r.id.toString()===e);if(r)return"Foodcourt General"===r.role||"Foodcourt Manager"===r.role?"foodcourt":"Brand General"===r.role||"Brand Manager"===r.role?"brand":"Restaurant Owner"===r.role?"owner":void 0})(pe);try{const t={requesterId:parseInt(ve),requesterName:Ae,requesterEmail:we,requesterRole:Fe,restaurantId:parseInt(ke),restaurantName:Ee,managerId:parseInt(e.id.toString()),managerName:e.name,subject:he.subject,description:he.description,priority:he.priority,category:he.category,inquiryType:r,attachments:me.length>0?me:void 0},n=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(t)})).ok&&(await Ce(),ue({subject:"",description:"",priority:"medium",category:"other"}),ye([]),xe(1===i.length?i[0].id.toString():""),ce(!1))}catch(t){console.error("Error creating ticket:",t)}},disabled:!he.subject.trim()||!he.description.trim()||!pe,children:"Submit Inquiry"})]})]})})]})]})})}},4185:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var n=t(4752),i=t(4414);const o=n.Ay.div`
  margin-top: 12px;
`,a=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=n.Ay.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  text-decoration: none;
  color: #0A2540;
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }
`,d=n.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=n.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=n.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=n.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),n=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,i.jsx)(x,{children:t.map((e,r)=>(0,i.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},r))}),n.length>0&&(0,i.jsx)(s,{children:n.map((e,r)=>{return(0,i.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(c,{children:e.originalName}),(0,i.jsx)(p,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,n})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>I});var n=t(9950),i=t(4752),o=t(4185),a=t(4414);const s=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,l=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,c=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,p=i.Ay.div`
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
`,x=i.Ay.div`
  flex: 1;
  min-width: 0;
`,h=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,u=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,g=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,m=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,y=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,j=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,v=i.Ay.textarea`
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
`,A=i.Ay.div`
  display: flex;
  gap: 4px;
`,w=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,F=i.Ay.button`
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
`,k=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,E=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,B=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,C=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,S=i.Ay.input`
  display: none;
`,I=e=>{let{entityType:r,entityId:t,currentUserId:i,onMarkRead:I}=e;const[D,$]=(0,n.useState)([]),[_,N]=(0,n.useState)(""),[T,q]=(0,n.useState)([]),[O,M]=(0,n.useState)(!1),[R,L]=(0,n.useState)(!1),P=(0,n.useRef)(null),U=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&$(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&(U(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),I&&I()}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const W=async()=>{const e=_.trim(),n=T.length>0;if((e||n)&&!R){L(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:_.trim(),attachments:n?T:void 0})})).ok&&(N(""),q([]),U())}catch(i){console.error("Error adding comment:",i)}finally{L(!1)}}},J=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),n=Math.floor(t/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const i=Math.floor(n/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",D.length,")"]}),D.length>0?(0,a.jsx)(d,{children:D.map(e=>{var r,t,n;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,a.jsx)(g,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,a.jsx)(f,{children:J(e.createdAt)}),i&&e.author_id===i&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&U()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(m,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(j,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(v,{value:_,onChange:e=>N(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),W())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(A,{children:[(0,a.jsx)(w,{onClick:()=>{var e;return null===(e=P.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(F,{onClick:W,disabled:!_.trim()&&0===T.length||R,children:"Send"})]})]}),(T.length>0||O)&&(0,a.jsxs)(E,{children:[O&&(0,a.jsx)(z,{children:"Uploading..."}),T.map((e,r)=>(0,a.jsxs)(B,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(C,{onClick:()=>(e=>{const r=T[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),q(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(S,{ref:P,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;e.target.value="";const t=5-T.length,n=Array.from(r).slice(0,t);if(0!==n.length){M(!0);try{const e=new FormData;n.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),i=await t.json();i.success&&i.data&&q(e=>[...e,...i.data])}catch(i){console.error("File upload error:",i)}finally{M(!1)}}}})]})}},7455:(e,r,t)=>{t.d(r,{A:()=>b});var n=t(9950),i=t(4752),o=t(4414);const a=i.Ay.div`
  margin-top: 8px;
`,s=i.Ay.div`
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    border-color: ${e=>e.disabled?"#CBD5E1":"#635BFF"};
  }
`,l=i.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,d=i.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,c=i.Ay.input`
  display: none;
`,p=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,x=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,h=i.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,u=i.Ay.div`
  flex: 1;
  min-width: 0;
`,g=i.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,f=i.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
`,m=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,y=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,j=i.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const b=e=>{let{files:r,onChange:t,maxFiles:i=5,maxSizeMB:b=10,disabled:v=!1,compact:A=!1}=e;const[w,F]=(0,n.useState)(!1),[k,E]=(0,n.useState)(!1),B=(0,n.useRef)(null),C=!v&&!k&&r.length<i,z=async e=>{const n=i-r.length,o=Array.from(e).slice(0,n);if(0!==o.length){for(const e of o)e.size;E(!0);try{const e=new FormData;o.forEach(r=>e.append("files",r));const n=localStorage.getItem("auth_token"),i=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${n}`},body:e}),a=await i.json();a.success&&a.data&&t([...r,...a.data])}catch(a){console.error("File upload error:",a)}finally{E(!1)}}};return(0,o.jsxs)(a,{children:[C&&(0,o.jsx)(s,{isDragging:w,disabled:!C,onClick:()=>{var e;return C&&(null===(e=B.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),C&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),C&&e.dataTransfer.files.length>0&&z(e.dataTransfer.files)},children:A?(0,o.jsxs)(l,{children:["Click or drag files to attach (",r.length,"/",i,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{children:w?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",b,"MB each, ",i-r.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:B,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&z(e.target.files),e.target.value=""}}),(r.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(j,{}),"Uploading..."]}),r.map((e,n)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{children:e.originalName}),(0,o.jsx)(f,{children:(i=e.size,i<1024?`${i}B`:i<1048576?`${(i/1024).toFixed(1)}KB`:`${(i/1048576).toFixed(1)}MB`)})]}),!v&&(0,o.jsx)(m,{onClick:()=>(async e=>{const n=r[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:n.url})})}catch(i){}t(r.filter((r,t)=>t!==e))})(n),title:"Remove",children:"\u2715"})]},e.url);var i,a})]})]})}}}]);