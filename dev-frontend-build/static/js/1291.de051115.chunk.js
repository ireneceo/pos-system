"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1291],{1291:(e,r,i)=>{i.r(r),i.d(r,{default:()=>L});var t=i(9950),n=i(4752),o=i(1367),s=i(4302),a=i(7455),d=i(4185),l=i(4414);const c=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=n.Ay.div`
  display: flex;
  gap: 12px;
`,g=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,y=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,m=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,j=n.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,f=n.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  font-weight: 500;
`,b=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,v=n.Ay.button`
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
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
`,A=n.Ay.div`
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
`,B=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,z=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,S=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,I=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,_=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,$=n.Ay.div`
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
`,T=n.Ay.div`
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
`,q=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,D=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,P=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,N=n.Ay.button`
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
`,R=n.Ay.div`
  padding: 24px;
`,O=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,M=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,U=n.Ay.div`
  margin-bottom: 20px;
`,Y=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,H=n.Ay.input`
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
`,W=n.Ay.select`
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
`,J=n.Ay.textarea`
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
`,L=()=>{const{user:e}=(0,o.As)(),[r,i]=(0,t.useState)([]),[n,L]=(0,t.useState)("all"),[G,K]=(0,t.useState)(!1),[Q,V]=(0,t.useState)(!1),[X,Z]=(0,t.useState)(null),[ee,re]=(0,t.useState)("open"),[ie,te]=(0,t.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ne,oe]=(0,t.useState)([]),[se,ae]=(0,t.useState)({}),de=(null===e||void 0===e?void 0:e.id)||"4",le=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Foodcourt User",ce=(null===e||void 0===e?void 0:e.email)||"foodcourt@example.com",pe=(null===e||void 0===e?void 0:e.role)||"Foodcourt General";(0,t.useEffect)(()=>{if(e){xe();const e=setInterval(xe,1e4);return()=>clearInterval(e)}},[e]);const xe=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/support-tickets?customerId=${de}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.success?e.data:Array.isArray(e)?e:[];i(t),he(t)}}catch(e){console.error("Error fetching support tickets:",e)}},he=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),i=e.map(e=>e.id).join(","),t=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${i}`,{headers:{Authorization:`Bearer ${r}`}});if(t.ok){const e=await t.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ae(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},ue=r.filter(e=>"all"===n||e.status===n),ge=r.length,ye=r.filter(e=>"open"===e.status).length,me=r.filter(e=>"in-progress"===e.status).length,je=r.filter(e=>"resolved"===e.status).length,fe=r.filter(e=>"closed"===e.status).length,be=e=>new Date(e).toLocaleString("en-MY");return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{children:"System Inquiry"}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{variant:"secondary",onClick:xe,children:"Refresh"}),(0,l.jsx)(g,{variant:"primary",onClick:()=>{K(!0)},children:"New Inquiry"})]})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(y,{children:[(0,l.jsxs)(m,{borderColor:"#635BFF",children:[(0,l.jsx)(j,{children:ge}),(0,l.jsx)(f,{children:"Total Tickets"})]}),(0,l.jsxs)(m,{borderColor:"#F59E0B",children:[(0,l.jsx)(j,{children:ye}),(0,l.jsx)(f,{children:"Open Tickets"})]}),(0,l.jsxs)(m,{borderColor:"#3B82F6",children:[(0,l.jsx)(j,{children:me}),(0,l.jsx)(f,{children:"In Progress"})]}),(0,l.jsxs)(m,{borderColor:"#10B981",children:[(0,l.jsx)(j,{children:je}),(0,l.jsx)(f,{children:"Resolved"})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(v,{active:"all"===n,onClick:()=>L("all"),children:["All (",ge,")"]}),(0,l.jsxs)(v,{active:"open"===n,onClick:()=>L("open"),children:["Open (",ye,")"]}),(0,l.jsxs)(v,{active:"in-progress"===n,onClick:()=>L("in-progress"),children:["In Progress (",me,")"]}),(0,l.jsxs)(v,{active:"resolved"===n,onClick:()=>L("resolved"),children:["Resolved (",je,")"]}),(0,l.jsxs)(v,{active:"closed"===n,onClick:()=>L("closed"),children:["Closed (",fe,")"]})]}),(0,l.jsxs)(w,{children:[ue.map(e=>(0,l.jsxs)(F,{style:{cursor:"pointer"},onClick:()=>(e=>{Z(e),re(e.status),V(!0)})(e),children:[(0,l.jsxs)(A,{children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(C,{children:e.ticketNumber}),(0,l.jsx)(B,{children:e.subject}),(0,l.jsx)(E,{children:(0,l.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,l.jsxs)(z,{children:[(0,l.jsx)(S,{status:e.status,children:e.status}),(0,l.jsx)(I,{priority:e.priority,children:e.priority})]})]}),(0,l.jsx)(_,{children:e.description}),(0,l.jsxs)($,{children:[(0,l.jsxs)("span",{children:["Created: ",be(e.createdAt)]}),se[e.id]&&(0,l.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",se[e.id].total_comments,se[e.id].unread_count>0&&(0,l.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[se[e.id].unread_count," new"]})]})]})]},e.id)),0===ue.length&&(0,l.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,l.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,l.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),G&&(0,l.jsx)(T,{onClick:()=>K(!1),children:(0,l.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(D,{children:[(0,l.jsx)(P,{children:"Create System Inquiry"}),(0,l.jsx)(N,{onClick:()=>K(!1),children:"\xd7"})]}),(0,l.jsxs)(R,{children:[(0,l.jsxs)(U,{children:[(0,l.jsx)(Y,{children:"Subject *"}),(0,l.jsx)(H,{type:"text",value:ie.subject,onChange:e=>te({...ie,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,l.jsxs)(U,{children:[(0,l.jsx)(Y,{children:"Description *"}),(0,l.jsx)(J,{value:ie.description,onChange:e=>te({...ie,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(Y,{children:"Attachments"}),(0,l.jsx)(a.A,{files:ne,onChange:oe,maxFiles:5})]}),(0,l.jsxs)(M,{children:[(0,l.jsxs)(U,{children:[(0,l.jsx)(Y,{children:"Priority"}),(0,l.jsxs)(W,{value:ie.priority,onChange:e=>te({...ie,priority:e.target.value}),children:[(0,l.jsx)("option",{value:"low",children:"Low"}),(0,l.jsx)("option",{value:"medium",children:"Medium"}),(0,l.jsx)("option",{value:"high",children:"High"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,l.jsxs)(U,{children:[(0,l.jsx)(Y,{children:"Category"}),(0,l.jsxs)(W,{value:ie.category,onChange:e=>te({...ie,category:e.target.value}),children:[(0,l.jsx)("option",{value:"technical",children:"Technical Issue"}),(0,l.jsx)("option",{value:"account",children:"Account Management"}),(0,l.jsx)("option",{value:"billing",children:"Billing"}),(0,l.jsx)("option",{value:"feature",children:"Feature Request"}),(0,l.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(g,{variant:"secondary",onClick:()=>K(!1),children:"Cancel"}),(0,l.jsx)(g,{variant:"primary",onClick:async()=>{if(ie.subject.trim()&&ie.description.trim())try{const e={customerId:de,customerName:le,customerEmail:ce,customerRole:pe,subject:ie.subject,description:ie.description,priority:ie.priority,category:ie.category,attachments:ne.length>0?ne:void 0},r=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(e)})).ok?(await xe(),te({subject:"",description:"",priority:"medium",category:"general"}),oe([]),K(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!ie.subject.trim()||!ie.description.trim(),children:"Submit Inquiry"})]})]})}),Q&&X&&(0,l.jsx)(T,{onClick:()=>V(!1),children:(0,l.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(D,{children:[(0,l.jsx)(P,{children:"Inquiry Details"}),(0,l.jsx)(N,{onClick:()=>V(!1),children:"\xd7"})]}),(0,l.jsxs)(R,{children:[(0,l.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,l.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(Y,{children:"Ticket Number"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:X.ticketNumber})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(Y,{children:"Status"}),(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,l.jsxs)(W,{value:ee,onChange:e=>re(e.target.value),style:{flex:1},children:[(0,l.jsx)("option",{value:"open",children:"Open"}),(0,l.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,l.jsx)("option",{value:"resolved",children:"Resolved"}),(0,l.jsx)("option",{value:"closed",children:"Closed"})]}),ee!==X.status&&(0,l.jsx)(g,{variant:"primary",onClick:async()=>{if(X)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${X.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ee})})).ok&&(i(e=>e.map(e=>e.id===X.id?{...e,status:ee}:e)),Z(e=>e?{...e,status:ee}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:"Save"})]})]})]}),(0,l.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(Y,{children:"Priority"}),(0,l.jsx)("div",{style:{padding:"8px 0"},children:(0,l.jsx)(I,{priority:X.priority,children:X.priority})})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(Y,{children:"Category"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:X.category.replace("-"," ")})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(Y,{children:"Subject"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:X.subject})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(Y,{children:"Description"}),(0,l.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:X.description})]}),(null===X||void 0===X?void 0:X.attachments)&&X.attachments.length>0&&(0,l.jsx)(d.A,{attachments:X.attachments}),(0,l.jsxs)("div",{children:[(0,l.jsx)(Y,{children:"Created"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:be(X.createdAt)})]})]}),(0,l.jsx)(s.A,{entityType:"support_ticket",entityId:X.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ae(e=>{const r={...e};return r[X.id]&&(r[X.id]={...r[X.id],unread_count:0}),r})})]}),(0,l.jsx)(O,{children:(0,l.jsx)(g,{variant:"secondary",onClick:()=>V(!1),children:"Close"})})]})})]})]})})}}}]);