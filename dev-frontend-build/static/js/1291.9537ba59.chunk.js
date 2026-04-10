"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1291],{1291:(e,t,i)=>{i.r(t),i.d(t,{default:()=>M});var r=i(9950),n=i(4752),s=i(1367),o=i(4302),a=i(7455),c=i(4185),l=i(2488),d=i(2597),p=i(2653),u=i(8409),x=i(5030),h=i(9955),m=i(4414);const g=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,y=n.Ay.div`
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
`,j=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,v=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,f=n.Ay.div`
  display: flex;
  gap: 12px;
`,b=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,w=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,F=n.Ay.div`
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
`,C=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,q=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,P=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,E=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,B=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,z=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,S=n.Ay.div`
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
`,D=n.Ay.button`
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
`,T=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,$=n.Ay.div`
  margin-bottom: 20px;
`,_=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,O=n.Ay.input`
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
`,N=n.Ay.select`
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
`,L=n.Ay.textarea`
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
`,M=()=>{const{t:e}=(0,x.Bd)("common"),{user:t}=(0,s.As)(),[i,n]=(0,r.useState)([]),[M,R]=(0,p.M)("active"),[J,U]=(0,r.useState)(!1),[Y,W]=(0,r.useState)(!1),[H,Q]=(0,r.useState)(null),[G,K]=(0,r.useState)("open"),[V,X]=(0,r.useState)({subject:"",description:"",priority:"medium",category:"general"}),[Z,ee]=(0,r.useState)([]),[te,ie]=(0,r.useState)({}),[re,ne]=(0,r.useState)(""),[se,oe]=(0,r.useState)("all"),[ae,ce]=(0,r.useState)("all"),le=(null===t||void 0===t?void 0:t.id)||"4";(0,r.useEffect)(()=>{if(t){de();const e=setInterval(de,1e4);return()=>clearInterval(e)}},[t]);const de=async()=>{try{const e=(0,h.c4)(),t=await fetch(`/api/support-tickets?customerId=${le}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.success?e.data:Array.isArray(e)?e:[];n(i),pe(i)}}catch(e){console.error("Error fetching support tickets:",e)}},pe=async e=>{if(0!==e.length)try{const t=(0,h.c4)(),i=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${i}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ie(t)}}}catch(t){console.error("Error fetching unread counts:",t)}},ue=i.filter(e=>{const t=e.subject.toLowerCase().includes(re.toLowerCase())||e.ticketNumber.toLowerCase().includes(re.toLowerCase()),i="active"===M?"open"===e.status||"in-progress"===e.status:"closed"===e.status||"resolved"===e.status,r="all"===se||e.priority===se,n="all"===ae||e.category===ae;return t&&i&&r&&n}),xe=i.length,he=i.filter(e=>"open"===e.status).length,me=i.filter(e=>"in-progress"===e.status).length,ge=i.filter(e=>"resolved"===e.status).length,ye=i.filter(e=>"closed"===e.status).length,je=e=>new Date(e).toLocaleString("en-MY");return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(g,{children:[(0,m.jsxs)(y,{children:[(0,m.jsx)(v,{children:e("common:systemInquiryPage.systemInquiry")}),(0,m.jsx)(f,{children:(0,m.jsx)(b,{variant:"primary",onClick:()=>{U(!0)},children:e("common:systemInquiryPage.newInquiry")})})]}),(0,m.jsxs)(j,{children:[(0,m.jsxs)(u.MD,{children:[(0,m.jsxs)(u.hI,{color:"#635BFF",children:[(0,m.jsx)(u.Os,{children:xe}),(0,m.jsx)(u.v0,{children:e("common:systemInquiryPage.totalTickets")})]}),(0,m.jsxs)(u.hI,{color:"#F59E0B",children:[(0,m.jsx)(u.Os,{children:he}),(0,m.jsx)(u.v0,{children:e("common:systemInquiryPage.openTickets")})]}),(0,m.jsxs)(u.hI,{color:"#3B82F6",children:[(0,m.jsx)(u.Os,{children:me}),(0,m.jsx)(u.v0,{children:e("common:systemInquiryPage.inProgress")})]}),(0,m.jsxs)(u.hI,{color:"#10B981",children:[(0,m.jsx)(u.Os,{children:ge}),(0,m.jsx)(u.v0,{children:e("common:systemInquiryPage.resolved")})]})]}),(0,m.jsxs)(d.tU,{children:[(0,m.jsxs)(d.oz,{active:"active"===M,onClick:()=>R("active"),children:["Active Tickets (",he+me,")"]}),(0,m.jsxs)(d.oz,{active:"closed"===M,onClick:()=>R("closed"),children:["Closed Tickets (",ye+ge,")"]})]}),(0,m.jsxs)(l.Qn,{children:[(0,m.jsx)(l.DO,{placeholder:"Search tickets...",value:re,onChange:e=>ne(e.target.value)}),(0,m.jsxs)(l.Jt,{value:se,onChange:e=>oe(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:e("common:systemInquiryPage.allPriority")}),(0,m.jsx)("option",{value:"urgent",children:e("common:systemInquiryPage.urgent")}),(0,m.jsx)("option",{value:"high",children:e("common:systemInquiryPage.high")}),(0,m.jsx)("option",{value:"medium",children:e("common:systemInquiryPage.medium")}),(0,m.jsx)("option",{value:"low",children:e("common:systemInquiryPage.low")})]}),(0,m.jsxs)(l.Jt,{value:ae,onChange:e=>ce(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:e("common:systemInquiryPage.allCategories")}),(0,m.jsx)("option",{value:"technical",children:e("common:systemInquiryPage.technical")}),(0,m.jsx)("option",{value:"billing",children:e("common:systemInquiryPage.billing")}),(0,m.jsx)("option",{value:"feature-request",children:e("common:systemInquiryPage.featureRequest")}),(0,m.jsx)("option",{value:"bug-report",children:e("common:systemInquiryPage.bugReport")}),(0,m.jsx)("option",{value:"general",children:e("common:systemInquiryPage.general")})]})]}),(0,m.jsxs)(w,{children:[ue.map(e=>(0,m.jsxs)(F,{style:{cursor:"pointer"},onClick:()=>(e=>{Q(e),K(e.status),W(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,m.jsxs)(I,{children:[(0,m.jsxs)(k,{children:[(0,m.jsx)(C,{children:e.ticketNumber}),(0,m.jsx)(q,{children:e.subject}),(0,m.jsx)(A,{children:(0,m.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,m.jsxs)(P,{children:[(0,m.jsx)(E,{status:e.status,children:e.status}),(0,m.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,m.jsx)(z,{children:e.description}),(0,m.jsxs)(S,{children:[(0,m.jsxs)("span",{children:["Created: ",je(e.createdAt)]}),te[e.id]&&(0,m.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",te[e.id].total_comments,te[e.id].unread_count>0&&(0,m.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[te[e.id].unread_count," new"]})]}),"active"===M&&(0,m.jsx)(D,{onClick:t=>{t.stopPropagation(),(async()=>{try{const t=(0,h.c4)();(await fetch(`/api/support-tickets/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"closed"})})).ok&&(n(t=>t.map(t=>t.id===e.id?{...t,status:"closed"}:t)),window.dispatchEvent(new Event("refreshBadgeCounts")))}catch(t){}})()},style:{marginLeft:"auto"},children:"Close"})]})]},e.id)),0===ue.length&&(0,m.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,m.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:e("common:systemInquiryPage.noTicketsYet")}),(0,m.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),J&&(0,m.jsxs)(u.aF,{isOpen:!0,onClose:()=>U(!1),title:"Create System Inquiry",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(b,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,m.jsx)(b,{variant:"primary",onClick:async()=>{if(V.subject.trim()&&V.description.trim())try{const e={subject:V.subject,description:V.description,priority:V.priority,category:V.category,attachments:Z.length>0?Z:void 0},t=(0,h.c4)();(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).ok?(await de(),X({subject:"",description:"",priority:"medium",category:"general"}),ee([]),U(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!V.subject.trim()||!V.description.trim(),children:"Submit Inquiry"})]}),children:[(0,m.jsxs)($,{children:[(0,m.jsx)(_,{children:"Subject *"}),(0,m.jsx)(O,{type:"text",value:V.subject,onChange:e=>X({...V,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,m.jsxs)($,{children:[(0,m.jsx)(_,{children:"Description *"}),(0,m.jsx)(L,{value:V.description,onChange:e=>X({...V,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)(_,{children:e("common:systemInquiryPage.attachments")}),(0,m.jsx)(a.A,{files:Z,onChange:ee,maxFiles:5})]}),(0,m.jsxs)(T,{children:[(0,m.jsxs)($,{children:[(0,m.jsx)(_,{children:e("common:systemInquiryPage.priority")}),(0,m.jsxs)(N,{value:V.priority,onChange:e=>X({...V,priority:e.target.value}),children:[(0,m.jsx)("option",{value:"low",children:e("common:systemInquiryPage.low")}),(0,m.jsx)("option",{value:"medium",children:e("common:systemInquiryPage.medium")}),(0,m.jsx)("option",{value:"high",children:e("common:systemInquiryPage.high")}),(0,m.jsx)("option",{value:"urgent",children:e("common:systemInquiryPage.urgent")})]})]}),(0,m.jsxs)($,{children:[(0,m.jsx)(_,{children:e("common:systemInquiryPage.category")}),(0,m.jsxs)(N,{value:V.category,onChange:e=>X({...V,category:e.target.value}),children:[(0,m.jsx)("option",{value:"technical",children:e("common:systemInquiryPage.technicalIssue")}),(0,m.jsx)("option",{value:"account",children:e("common:systemInquiryPage.accountManagement")}),(0,m.jsx)("option",{value:"billing",children:e("common:systemInquiryPage.billing")}),(0,m.jsx)("option",{value:"feature",children:e("common:systemInquiryPage.featureRequest")}),(0,m.jsx)("option",{value:"other",children:e("common:systemInquiryPage.other")})]})]})]})]}),Y&&H&&(0,m.jsxs)(u.aF,{isOpen:!0,onClose:()=>W(!1),title:"Inquiry Details",footer:(0,m.jsx)(b,{variant:"secondary",onClick:()=>W(!1),children:e("common:systemInquiryPage.close")}),children:[(0,m.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)(_,{children:e("common:systemInquiryPage.ticketNumber")}),(0,m.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:H.ticketNumber})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)(_,{children:e("common:systemInquiryPage.status")}),(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,m.jsxs)(N,{value:G,onChange:e=>K(e.target.value),style:{flex:1},children:[(0,m.jsx)("option",{value:"open",children:e("common:systemInquiryPage.open")}),(0,m.jsx)("option",{value:"in-progress",children:e("common:systemInquiryPage.inProgress")}),(0,m.jsx)("option",{value:"resolved",children:e("common:systemInquiryPage.resolved")}),(0,m.jsx)("option",{value:"closed",children:e("common:systemInquiryPage.closed")})]}),G!==H.status&&(0,m.jsx)(b,{variant:"primary",onClick:async()=>{if(H)try{const e=(0,h.c4)();(await fetch(`/api/support-tickets/${H.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:G})})).ok&&(n(e=>e.map(e=>e.id===H.id?{...e,status:G}:e)),Q(e=>e?{...e,status:G}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:e("common:systemInquiryPage.save")})]})]})]}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)(_,{children:e("common:systemInquiryPage.priority")}),(0,m.jsx)("div",{style:{padding:"8px 0"},children:(0,m.jsx)(B,{priority:H.priority,children:H.priority})})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)(_,{children:e("common:systemInquiryPage.category")}),(0,m.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:H.category.replace("-"," ")})]})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)(_,{children:e("common:systemInquiryPage.subject")}),(0,m.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:H.subject})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)(_,{children:e("common:systemInquiryPage.description")}),(0,m.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:H.description})]}),(null===H||void 0===H?void 0:H.attachments)&&H.attachments.length>0&&(0,m.jsx)(c.A,{attachments:H.attachments}),(0,m.jsxs)("div",{children:[(0,m.jsx)(_,{children:e("common:systemInquiryPage.created")}),(0,m.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:je(H.createdAt)})]})]}),(0,m.jsx)(o.A,{entityType:"support_ticket",entityId:H.id,currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>ie(e=>{const t={...e};return t[H.id]&&(t[H.id]={...t[H.id],unread_count:0}),t})})]})]})]})})}},2653:(e,t,i)=>{i.d(t,{M:()=>s});var r=i(9950),n=i(4492);function s(e){const[t,i]=(0,n.ok)(),s=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[o,a]=(0,r.useState)(s());return[o,(0,r.useCallback)(e=>{a(e),i({tab:e})},[i])]}}}]);