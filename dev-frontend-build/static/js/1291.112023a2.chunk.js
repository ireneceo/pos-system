"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1291],{1291:(e,t,r)=>{r.r(t),r.d(t,{default:()=>L});var i=r(9950),n=r(4752),s=r(1367),o=r(4302),a=r(7455),c=r(4185),l=r(2488),d=r(2597),p=r(2653),u=r(8409),x=r(5030),h=r(4414);const m=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,g=n.Ay.div`
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
`,y=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,v=n.Ay.div`
  display: flex;
  gap: 12px;
`,f=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,b=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,w=n.Ay.div`
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
`,I=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,k=n.Ay.div`
  flex: 1;
`,F=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,C=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,q=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,A=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,P=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,E=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,B=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,z=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 8px;
`,S=n.Ay.button`
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: #fff;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: #E5E7EB;
    color: #374151;
  }
`,_=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,D=n.Ay.div`
  margin-bottom: 20px;
`,T=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,$=n.Ay.input`
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
`,O=n.Ay.select`
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
`,N=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,L=()=>{const{t:e}=(0,x.Bd)("common"),{user:t}=(0,s.As)(),[r,n]=(0,i.useState)([]),[L,M]=(0,p.M)("active"),[R,J]=(0,i.useState)(!1),[U,Y]=(0,i.useState)(!1),[W,H]=(0,i.useState)(null),[Q,G]=(0,i.useState)("open"),[K,V]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[X,Z]=(0,i.useState)([]),[ee,te]=(0,i.useState)({}),[re,ie]=(0,i.useState)(""),[ne,se]=(0,i.useState)("all"),[oe,ae]=(0,i.useState)("all"),ce=(null===t||void 0===t?void 0:t.id)||"4";(0,i.useEffect)(()=>{if(t){le();const e=setInterval(le,1e4);return()=>clearInterval(e)}},[t]);const le=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/support-tickets?customerId=${ce}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.success?e.data:Array.isArray(e)?e:[];n(r),de(r)}}catch(e){console.error("Error fetching support tickets:",e)}},de=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),te(t)}}}catch(t){console.error("Error fetching unread counts:",t)}},pe=r.filter(e=>{const t=e.subject.toLowerCase().includes(re.toLowerCase())||e.ticketNumber.toLowerCase().includes(re.toLowerCase()),r="active"===L?"open"===e.status||"in-progress"===e.status:"closed"===e.status||"resolved"===e.status,i="all"===ne||e.priority===ne,n="all"===oe||e.category===oe;return t&&r&&i&&n}),ue=r.length,xe=r.filter(e=>"open"===e.status).length,he=r.filter(e=>"in-progress"===e.status).length,me=r.filter(e=>"resolved"===e.status).length,ge=r.filter(e=>"closed"===e.status).length,ye=e=>new Date(e).toLocaleString("en-MY");return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(m,{children:[(0,h.jsxs)(g,{children:[(0,h.jsx)(j,{children:e("common:systemInquiryPage.systemInquiry")}),(0,h.jsx)(v,{children:(0,h.jsx)(f,{variant:"primary",onClick:()=>{J(!0)},children:e("common:systemInquiryPage.newInquiry")})})]}),(0,h.jsxs)(y,{children:[(0,h.jsxs)(u.MD,{children:[(0,h.jsxs)(u.hI,{color:"#635BFF",children:[(0,h.jsx)(u.Os,{children:ue}),(0,h.jsx)(u.v0,{children:e("common:systemInquiryPage.totalTickets")})]}),(0,h.jsxs)(u.hI,{color:"#F59E0B",children:[(0,h.jsx)(u.Os,{children:xe}),(0,h.jsx)(u.v0,{children:e("common:systemInquiryPage.openTickets")})]}),(0,h.jsxs)(u.hI,{color:"#3B82F6",children:[(0,h.jsx)(u.Os,{children:he}),(0,h.jsx)(u.v0,{children:e("common:systemInquiryPage.inProgress")})]}),(0,h.jsxs)(u.hI,{color:"#10B981",children:[(0,h.jsx)(u.Os,{children:me}),(0,h.jsx)(u.v0,{children:e("common:systemInquiryPage.resolved")})]})]}),(0,h.jsxs)(d.tU,{children:[(0,h.jsxs)(d.oz,{active:"active"===L,onClick:()=>M("active"),children:["Active Tickets (",xe+he,")"]}),(0,h.jsxs)(d.oz,{active:"closed"===L,onClick:()=>M("closed"),children:["Closed Tickets (",ge+me,")"]})]}),(0,h.jsxs)(l.Qn,{children:[(0,h.jsx)(l.DO,{placeholder:"Search tickets...",value:re,onChange:e=>ie(e.target.value)}),(0,h.jsxs)(l.Jt,{value:ne,onChange:e=>se(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:e("common:systemInquiryPage.allPriority")}),(0,h.jsx)("option",{value:"urgent",children:e("common:systemInquiryPage.urgent")}),(0,h.jsx)("option",{value:"high",children:e("common:systemInquiryPage.high")}),(0,h.jsx)("option",{value:"medium",children:e("common:systemInquiryPage.medium")}),(0,h.jsx)("option",{value:"low",children:e("common:systemInquiryPage.low")})]}),(0,h.jsxs)(l.Jt,{value:oe,onChange:e=>ae(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:e("common:systemInquiryPage.allCategories")}),(0,h.jsx)("option",{value:"technical",children:e("common:systemInquiryPage.technical")}),(0,h.jsx)("option",{value:"billing",children:e("common:systemInquiryPage.billing")}),(0,h.jsx)("option",{value:"feature-request",children:e("common:systemInquiryPage.featureRequest")}),(0,h.jsx)("option",{value:"bug-report",children:e("common:systemInquiryPage.bugReport")}),(0,h.jsx)("option",{value:"general",children:e("common:systemInquiryPage.general")})]})]}),(0,h.jsxs)(b,{children:[pe.map(e=>(0,h.jsxs)(w,{style:{cursor:"pointer"},onClick:()=>(e=>{H(e),G(e.status),Y(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,h.jsxs)(I,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)(F,{children:e.ticketNumber}),(0,h.jsx)(C,{children:e.subject}),(0,h.jsx)(q,{children:(0,h.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,h.jsxs)(A,{children:[(0,h.jsx)(P,{status:e.status,children:e.status}),(0,h.jsx)(E,{priority:e.priority,children:e.priority})]})]}),(0,h.jsx)(B,{children:e.description}),(0,h.jsxs)(z,{children:[(0,h.jsxs)("span",{children:["Created: ",ye(e.createdAt)]}),ee[e.id]&&(0,h.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ee[e.id].total_comments,ee[e.id].unread_count>0&&(0,h.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ee[e.id].unread_count," new"]})]}),"active"===L&&(0,h.jsx)(S,{onClick:t=>{t.stopPropagation(),(async()=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"closed"})})).ok&&(n(t=>t.map(t=>t.id===e.id?{...t,status:"closed"}:t)),window.dispatchEvent(new Event("refreshBadgeCounts")))}catch(t){}})()},style:{marginLeft:"auto"},children:"Close"})]})]},e.id)),0===pe.length&&(0,h.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,h.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:e("common:systemInquiryPage.noTicketsYet")}),(0,h.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),R&&(0,h.jsxs)(u.aF,{isOpen:!0,onClose:()=>J(!1),title:"Create System Inquiry",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(f,{variant:"secondary",onClick:()=>J(!1),children:"Cancel"}),(0,h.jsx)(f,{variant:"primary",onClick:async()=>{if(K.subject.trim()&&K.description.trim())try{const e={subject:K.subject,description:K.description,priority:K.priority,category:K.category,attachments:X.length>0?X:void 0},t=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).ok?(await le(),V({subject:"",description:"",priority:"medium",category:"general"}),Z([]),J(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!K.subject.trim()||!K.description.trim(),children:"Submit Inquiry"})]}),children:[(0,h.jsxs)(D,{children:[(0,h.jsx)(T,{children:"Subject *"}),(0,h.jsx)($,{type:"text",value:K.subject,onChange:e=>V({...K,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,h.jsxs)(D,{children:[(0,h.jsx)(T,{children:"Description *"}),(0,h.jsx)(N,{value:K.description,onChange:e=>V({...K,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(T,{children:e("common:systemInquiryPage.attachments")}),(0,h.jsx)(a.A,{files:X,onChange:Z,maxFiles:5})]}),(0,h.jsxs)(_,{children:[(0,h.jsxs)(D,{children:[(0,h.jsx)(T,{children:e("common:systemInquiryPage.priority")}),(0,h.jsxs)(O,{value:K.priority,onChange:e=>V({...K,priority:e.target.value}),children:[(0,h.jsx)("option",{value:"low",children:e("common:systemInquiryPage.low")}),(0,h.jsx)("option",{value:"medium",children:e("common:systemInquiryPage.medium")}),(0,h.jsx)("option",{value:"high",children:e("common:systemInquiryPage.high")}),(0,h.jsx)("option",{value:"urgent",children:e("common:systemInquiryPage.urgent")})]})]}),(0,h.jsxs)(D,{children:[(0,h.jsx)(T,{children:e("common:systemInquiryPage.category")}),(0,h.jsxs)(O,{value:K.category,onChange:e=>V({...K,category:e.target.value}),children:[(0,h.jsx)("option",{value:"technical",children:e("common:systemInquiryPage.technicalIssue")}),(0,h.jsx)("option",{value:"account",children:e("common:systemInquiryPage.accountManagement")}),(0,h.jsx)("option",{value:"billing",children:e("common:systemInquiryPage.billing")}),(0,h.jsx)("option",{value:"feature",children:e("common:systemInquiryPage.featureRequest")}),(0,h.jsx)("option",{value:"other",children:e("common:systemInquiryPage.other")})]})]})]})]}),U&&W&&(0,h.jsxs)(u.aF,{isOpen:!0,onClose:()=>Y(!1),title:"Inquiry Details",footer:(0,h.jsx)(f,{variant:"secondary",onClick:()=>Y(!1),children:e("common:systemInquiryPage.close")}),children:[(0,h.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(T,{children:e("common:systemInquiryPage.ticketNumber")}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:W.ticketNumber})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(T,{children:e("common:systemInquiryPage.status")}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,h.jsxs)(O,{value:Q,onChange:e=>G(e.target.value),style:{flex:1},children:[(0,h.jsx)("option",{value:"open",children:e("common:systemInquiryPage.open")}),(0,h.jsx)("option",{value:"in-progress",children:e("common:systemInquiryPage.inProgress")}),(0,h.jsx)("option",{value:"resolved",children:e("common:systemInquiryPage.resolved")}),(0,h.jsx)("option",{value:"closed",children:e("common:systemInquiryPage.closed")})]}),Q!==W.status&&(0,h.jsx)(f,{variant:"primary",onClick:async()=>{if(W)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${W.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:Q})})).ok&&(n(e=>e.map(e=>e.id===W.id?{...e,status:Q}:e)),H(e=>e?{...e,status:Q}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:e("common:systemInquiryPage.save")})]})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(T,{children:e("common:systemInquiryPage.priority")}),(0,h.jsx)("div",{style:{padding:"8px 0"},children:(0,h.jsx)(E,{priority:W.priority,children:W.priority})})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(T,{children:e("common:systemInquiryPage.category")}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:W.category.replace("-"," ")})]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(T,{children:e("common:systemInquiryPage.subject")}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:W.subject})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(T,{children:e("common:systemInquiryPage.description")}),(0,h.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:W.description})]}),(null===W||void 0===W?void 0:W.attachments)&&W.attachments.length>0&&(0,h.jsx)(c.A,{attachments:W.attachments}),(0,h.jsxs)("div",{children:[(0,h.jsx)(T,{children:e("common:systemInquiryPage.created")}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ye(W.createdAt)})]})]}),(0,h.jsx)(o.A,{entityType:"support_ticket",entityId:W.id,currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>te(e=>{const t={...e};return t[W.id]&&(t[W.id]={...t[W.id],unread_count:0}),t})})]})]})]})})}},2653:(e,t,r)=>{r.d(t,{M:()=>s});var i=r(9950),n=r(4492);function s(e){const[t,r]=(0,n.ok)(),s=(0,i.useCallback)(()=>t.get("tab")||e,[t,e]),[o,a]=(0,i.useState)(s());return[o,(0,i.useCallback)(e=>{a(e),r({tab:e})},[r])]}}}]);