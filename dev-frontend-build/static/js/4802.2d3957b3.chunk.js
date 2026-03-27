"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4802],{4802:(e,r,t)=>{t.r(r),t.d(r,{default:()=>X});var i=t(9950),n=t(4752),o=t(2853),a=t(8409),s=t(1367),l=t(4302),d=t(7455),c=t(4185),p=t(4414);const x=n.Ay.div`
  min-height: 100vh;
`,u=n.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
`,h=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,j=n.Ay.div`
  display: flex;
  gap: 12px;
`,m=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; border-color: #CBD5E1; }\n  "}
`,f=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`,b=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,v=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=n.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,F=(n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`),A=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,k=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,C=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
`,E=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,B=n.Ay.div`
  flex: 1;
  min-width: 0;
`,S=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,z=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,I=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,q=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,_=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,N=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,O=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,R=n.Ay.div`
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
`,$=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,D=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,T=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,P=n.Ay.span`
  color: #374151;
`,L=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,M=n.Ay.div`
  margin-bottom: 20px;
`,U=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,Y=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,H=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,J=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,W=n.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,G=n.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,K=n.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,Q=n.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,V=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`,X=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,i.useState)([]),[n,X]=(0,i.useState)([]),[Z,ee]=(0,i.useState)(""),[re,te]=(0,i.useState)("all"),[ie,ne]=(0,i.useState)("all"),[oe,ae]=(0,i.useState)("all"),[se,le]=(0,i.useState)("all"),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(null),[ue,he]=(0,i.useState)("open"),[ge,je]=(0,i.useState)({}),[me,fe]=(0,i.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),[ye,be]=(0,i.useState)([]);(0,i.useEffect)(()=>{e&&ve()},[e]),(0,i.useEffect)(()=>{if(n.length>0){we();const e=setInterval(we,1e4);return()=>clearInterval(e)}},[n]);const ve=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e;X(t.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},we=async()=>{try{const r=localStorage.getItem("auth_token"),i=await fetch(`/api/operation-tickets?userId=${null===e||void 0===e?void 0:e.id}&userRole=Restaurant Owner`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json(),r=Array.isArray(e)?e:[];t(r),Fe(r)}}catch(r){console.error("Error fetching operation tickets:",r)}},Fe=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),je(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},Ae=r.filter(e=>{const r=e.subject.toLowerCase().includes(Z.toLowerCase())||e.ticketNumber.toLowerCase().includes(Z.toLowerCase()),t="all"===re||e.status===re,i="all"===ie||e.priority===ie,n="all"===oe||e.category===oe,o="all"===se||String(e.restaurantId)===se;return r&&t&&i&&n&&o}),ke=r.filter(e=>"open"===e.status).length,Ce=r.filter(e=>"in-progress"===e.status).length,Ee=r.filter(e=>"resolved"===e.status).length,Be=e=>new Date(e).toLocaleString("en-MY");return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:"Operation Inquiry"}),(0,p.jsx)(j,{children:(0,p.jsx)(m,{variant:"primary",onClick:()=>ce(!0),children:"New Inquiry"})})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(f,{children:[(0,p.jsxs)(y,{color:"#635BFF",children:[(0,p.jsx)(b,{children:r.length}),(0,p.jsx)(v,{children:"Total Inquiries"})]}),(0,p.jsxs)(y,{color:"#F59E0B",children:[(0,p.jsx)(b,{children:ke}),(0,p.jsx)(v,{children:"Open"})]}),(0,p.jsxs)(y,{color:"#3B82F6",children:[(0,p.jsx)(b,{children:Ce}),(0,p.jsx)(v,{children:"In Progress"})]}),(0,p.jsxs)(y,{color:"#10B981",children:[(0,p.jsx)(b,{children:Ee}),(0,p.jsx)(v,{children:"Resolved"})]})]}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(A,{value:se,onChange:e=>le(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Restaurants"}),n.map(e=>(0,p.jsx)("option",{value:String(e.id),children:e.name},e.id))]}),(0,p.jsxs)(A,{value:re,onChange:e=>te(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]}),(0,p.jsxs)(A,{value:ie,onChange:e=>ne(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priority"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"low",children:"Low"})]}),(0,p.jsxs)(A,{value:oe,onChange:e=>ae(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Categories"}),(0,p.jsx)("option",{value:"schedule",children:"Schedule"}),(0,p.jsx)("option",{value:"inventory",children:"Inventory"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"menu",children:"Menu"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"other",children:"Other"})]}),(0,p.jsx)(F,{placeholder:"Search inquiries...",value:Z,onChange:e=>ee(e.target.value)})]}),(0,p.jsxs)(k,{children:[Ae.map(e=>(0,p.jsxs)(C,{onClick:()=>(e=>{xe(e),he(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,p.jsxs)(E,{children:[(0,p.jsxs)(B,{children:[(0,p.jsx)(S,{children:e.ticketNumber}),(0,p.jsx)(z,{children:e.subject}),(0,p.jsxs)(I,{children:[(0,p.jsxs)("span",{children:["From: ",e.requesterName," (",e.requesterRole,")"]}),(0,p.jsx)(q,{children:e.restaurantName})]})]}),(0,p.jsxs)(_,{children:[(0,p.jsx)(N,{status:e.status,children:e.status}),(0,p.jsx)(O,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)(R,{children:e.description}),(0,p.jsxs)($,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(T,{children:"Created"}),(0,p.jsx)(P,{children:Be(e.createdAt)})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(T,{children:"Category"}),(0,p.jsx)(P,{style:{textTransform:"capitalize"},children:e.category})]}),ge[String(e.id)]&&(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ge[String(e.id)].total_comments,ge[String(e.id)].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ge[String(e.id)].unread_count," new"]})]})]})]},e.id)),0===Ae.length&&(0,p.jsxs)(o.pp,{children:[(0,p.jsx)("h3",{children:"No operation inquiries"}),(0,p.jsx)("p",{children:"Operation inquiries from your restaurants will appear here. You can also create new inquiries."})]})]}),de&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>ce(!1),title:"Create Operation Inquiry",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(!me.restaurantId||!me.subject.trim()||!me.description.trim())return;const r=n.find(e=>e.id===parseInt(me.restaurantId));try{const t=localStorage.getItem("auth_token"),i={restaurantId:parseInt(me.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:me.subject,description:me.description,priority:me.priority,category:me.category,inquiryType:"owner",managerId:null===e||void 0===e?void 0:e.id,managerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner",attachments:ye.length>0?ye:void 0};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(i)})).ok&&(we(),ce(!1),fe({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),be([]))}catch(t){console.error("Error creating ticket:",t)}},disabled:!me.restaurantId||!me.subject.trim()||!me.description.trim(),children:"Submit Inquiry"})]}),children:[(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:"Restaurant *"}),(0,p.jsxs)(H,{value:me.restaurantId,onChange:e=>fe({...me,restaurantId:e.target.value}),required:!0,children:[(0,p.jsx)("option",{value:"",children:"Select Restaurant"}),n.map(e=>(0,p.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:"Subject *"}),(0,p.jsx)(Y,{type:"text",value:me.subject,onChange:e=>fe({...me,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:"Description *"}),(0,p.jsx)(J,{value:me.description,onChange:e=>fe({...me,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:"Attachments"}),(0,p.jsx)(d.A,{files:ye,onChange:be,maxFiles:5})]}),(0,p.jsxs)(L,{children:[(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:"Priority"}),(0,p.jsxs)(H,{value:me.priority,onChange:e=>fe({...me,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"low",children:"Low"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:"Category"}),(0,p.jsxs)(H,{value:me.category,onChange:e=>fe({...me,category:e.target.value}),children:[(0,p.jsx)("option",{value:"schedule",children:"Schedule"}),(0,p.jsx)("option",{value:"inventory",children:"Inventory"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"menu",children:"Menu"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),pe&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>xe(null),title:pe.ticketNumber,size:"large",footer:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(m,{variant:"secondary",onClick:()=>xe(null),children:"Close"})}),children:[(0,p.jsxs)(W,{children:[(0,p.jsxs)(G,{children:[(0,p.jsx)(K,{children:"Subject:"}),(0,p.jsx)(Q,{children:pe.subject})]}),(0,p.jsxs)(G,{children:[(0,p.jsx)(K,{children:"Restaurant:"}),(0,p.jsx)(Q,{children:pe.restaurantName})]}),(0,p.jsxs)(G,{children:[(0,p.jsx)(K,{children:"From:"}),(0,p.jsxs)(Q,{children:[pe.requesterName," (",pe.requesterRole,")"]})]}),(0,p.jsxs)(G,{children:[(0,p.jsx)(K,{children:"Priority:"}),(0,p.jsx)(Q,{children:(0,p.jsx)(O,{priority:pe.priority,children:pe.priority})})]}),(0,p.jsxs)(G,{children:[(0,p.jsx)(K,{children:"Category:"}),(0,p.jsx)(Q,{style:{textTransform:"capitalize"},children:pe.category})]}),(0,p.jsxs)(G,{children:[(0,p.jsx)(K,{children:"Created:"}),(0,p.jsx)(Q,{children:Be(pe.createdAt)})]})]}),(0,p.jsx)(U,{children:"Description"}),(0,p.jsx)(V,{children:pe.description}),(null===pe||void 0===pe?void 0:pe.attachments)&&pe.attachments.length>0&&(0,p.jsx)(c.A,{attachments:pe.attachments}),(0,p.jsxs)(M,{children:[(0,p.jsx)(U,{children:"Status"}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,p.jsxs)(H,{value:ue,onChange:e=>he(e.target.value),style:{flex:1},children:[(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]}),ue!==pe.status&&(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(pe&&ue!==pe.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${pe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ue})});if(r.ok){const e=await r.json(),i=e.data||e;t(e=>e.map(e=>e.id===pe.id?{...e,...i}:e)),xe(e=>e?{...e,...i}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,p.jsx)(l.A,{entityType:"operation_ticket",entityId:String(pe.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>je(e=>{const r={...e},t=String(pe.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})]})})}}}]);