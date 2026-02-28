"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1291],{1291:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Y});var i=r(9950),n=r(4752),o=r(1367),a=r(4302),s=r(7455),l=r(4185),d=r(4414);const c=n.Ay.div`
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
`,g=n.Ay.div`
  display: flex;
  gap: 12px;
`,u=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=n.Ay.div`
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
`,y=n.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,b=n.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  font-weight: 500;
`,j=n.Ay.div`
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
`,A=n.Ay.div`
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
`,w=n.Ay.div`
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
`,E=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=n.Ay.div`
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
`,$=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,D=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,_=n.Ay.div`
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
`,I=n.Ay.div`
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
`,T=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,N=n.Ay.div`
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
`,O=n.Ay.button`
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
`,q=n.Ay.div`
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
`,L=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,J=n.Ay.input`
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
`,K=n.Ay.textarea`
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
`,Y=()=>{const{user:e}=(0,o.As)(),[t,r]=(0,i.useState)([]),[n,Y]=(0,i.useState)("all"),[H,G]=(0,i.useState)(!1),[X,Z]=(0,i.useState)(!1),[Q,V]=(0,i.useState)(null),[ee,te]=(0,i.useState)("open"),[re,ie]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ne,oe]=(0,i.useState)([]),[ae,se]=(0,i.useState)({}),le=(null===e||void 0===e?void 0:e.id)||"4",de=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Foodcourt User",ce=(null===e||void 0===e?void 0:e.email)||"foodcourt@example.com",pe=(null===e||void 0===e?void 0:e.role)||"Foodcourt General";(0,i.useEffect)(()=>{if(e){xe();const e=setInterval(xe,1e4);return()=>clearInterval(e)}},[e]);const xe=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/support-tickets?customerId=${le}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.success?e.data:Array.isArray(e)?e:[];r(i),he(i)}}catch(e){console.error("Error fetching support tickets:",e)}},he=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),se(t)}}}catch(t){console.error("Error fetching unread counts:",t)}},ge=t.filter(e=>"all"===n||e.status===n),ue=t.length,fe=t.filter(e=>"open"===e.status).length,me=t.filter(e=>"in-progress"===e.status).length,ye=t.filter(e=>"resolved"===e.status).length,be=t.filter(e=>"closed"===e.status).length,je=e=>new Date(e).toLocaleString("en-MY");return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:"System Inquiry"}),(0,d.jsxs)(g,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:xe,children:"Refresh"}),(0,d.jsx)(u,{variant:"primary",onClick:()=>{G(!0)},children:"New Inquiry"})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(f,{children:[(0,d.jsxs)(m,{borderColor:"#635BFF",children:[(0,d.jsx)(y,{children:ue}),(0,d.jsx)(b,{children:"Total Tickets"})]}),(0,d.jsxs)(m,{borderColor:"#F59E0B",children:[(0,d.jsx)(y,{children:fe}),(0,d.jsx)(b,{children:"Open Tickets"})]}),(0,d.jsxs)(m,{borderColor:"#3B82F6",children:[(0,d.jsx)(y,{children:me}),(0,d.jsx)(b,{children:"In Progress"})]}),(0,d.jsxs)(m,{borderColor:"#10B981",children:[(0,d.jsx)(y,{children:ye}),(0,d.jsx)(b,{children:"Resolved"})]})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(v,{active:"all"===n,onClick:()=>Y("all"),children:["All (",ue,")"]}),(0,d.jsxs)(v,{active:"open"===n,onClick:()=>Y("open"),children:["Open (",fe,")"]}),(0,d.jsxs)(v,{active:"in-progress"===n,onClick:()=>Y("in-progress"),children:["In Progress (",me,")"]}),(0,d.jsxs)(v,{active:"resolved"===n,onClick:()=>Y("resolved"),children:["Resolved (",ye,")"]}),(0,d.jsxs)(v,{active:"closed"===n,onClick:()=>Y("closed"),children:["Closed (",be,")"]})]}),(0,d.jsxs)(A,{children:[ge.map(e=>(0,d.jsxs)(F,{style:{cursor:"pointer"},onClick:()=>(e=>{V(e),te(e.status),Z(!0)})(e),children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(C,{children:e.ticketNumber}),(0,d.jsx)(E,{children:e.subject}),(0,d.jsx)(B,{children:(0,d.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(S,{status:e.status,children:e.status}),(0,d.jsx)($,{priority:e.priority,children:e.priority})]})]}),(0,d.jsx)(D,{children:e.description}),(0,d.jsxs)(_,{children:[(0,d.jsxs)("span",{children:["Created: ",je(e.createdAt)]}),ae[e.id]&&(0,d.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ae[e.id].total_comments,ae[e.id].unread_count>0&&(0,d.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ae[e.id].unread_count," new"]})]})]})]},e.id)),0===ge.length&&(0,d.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,d.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,d.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),H&&(0,d.jsx)(I,{onClick:()=>G(!1),children:(0,d.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(N,{children:[(0,d.jsx)(P,{children:"Create System Inquiry"}),(0,d.jsx)(O,{onClick:()=>G(!1),children:"\xd7"})]}),(0,d.jsxs)(R,{children:[(0,d.jsxs)(U,{children:[(0,d.jsx)(L,{children:"Subject *"}),(0,d.jsx)(J,{type:"text",value:re.subject,onChange:e=>ie({...re,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)(L,{children:"Description *"}),(0,d.jsx)(K,{value:re.description,onChange:e=>ie({...re,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(L,{children:"Attachments"}),(0,d.jsx)(s.A,{files:ne,onChange:oe,maxFiles:5})]}),(0,d.jsxs)(M,{children:[(0,d.jsxs)(U,{children:[(0,d.jsx)(L,{children:"Priority"}),(0,d.jsxs)(W,{value:re.priority,onChange:e=>ie({...re,priority:e.target.value}),children:[(0,d.jsx)("option",{value:"low",children:"Low"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)(L,{children:"Category"}),(0,d.jsxs)(W,{value:re.category,onChange:e=>ie({...re,category:e.target.value}),children:[(0,d.jsx)("option",{value:"technical",children:"Technical Issue"}),(0,d.jsx)("option",{value:"account",children:"Account Management"}),(0,d.jsx)("option",{value:"billing",children:"Billing"}),(0,d.jsx)("option",{value:"feature",children:"Feature Request"}),(0,d.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>G(!1),children:"Cancel"}),(0,d.jsx)(u,{variant:"primary",onClick:async()=>{if(re.subject.trim()&&re.description.trim())try{const e={customerId:le,customerName:de,customerEmail:ce,customerRole:pe,subject:re.subject,description:re.description,priority:re.priority,category:re.category,attachments:ne.length>0?ne:void 0},t=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).ok?(await xe(),ie({subject:"",description:"",priority:"medium",category:"general"}),oe([]),G(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!re.subject.trim()||!re.description.trim(),children:"Submit Inquiry"})]})]})}),X&&Q&&(0,d.jsx)(I,{onClick:()=>Z(!1),children:(0,d.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(N,{children:[(0,d.jsx)(P,{children:"Inquiry Details"}),(0,d.jsx)(O,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,d.jsxs)(R,{children:[(0,d.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(L,{children:"Ticket Number"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:Q.ticketNumber})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(L,{children:"Status"}),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,d.jsxs)(W,{value:ee,onChange:e=>te(e.target.value),style:{flex:1},children:[(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]}),ee!==Q.status&&(0,d.jsx)(u,{variant:"primary",onClick:async()=>{if(Q)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${Q.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ee})})).ok&&(r(e=>e.map(e=>e.id===Q.id?{...e,status:ee}:e)),V(e=>e?{...e,status:ee}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:"Save"})]})]})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(L,{children:"Priority"}),(0,d.jsx)("div",{style:{padding:"8px 0"},children:(0,d.jsx)($,{priority:Q.priority,children:Q.priority})})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(L,{children:"Category"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:Q.category.replace("-"," ")})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(L,{children:"Subject"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:Q.subject})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(L,{children:"Description"}),(0,d.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:Q.description})]}),(null===Q||void 0===Q?void 0:Q.attachments)&&Q.attachments.length>0&&(0,d.jsx)(l.A,{attachments:Q.attachments}),(0,d.jsxs)("div",{children:[(0,d.jsx)(L,{children:"Created"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:je(Q.createdAt)})]})]}),(0,d.jsx)(a.A,{entityType:"support_ticket",entityId:Q.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>se(e=>{const t={...e};return t[Q.id]&&(t[Q.id]={...t[Q.id],unread_count:0}),t})})]}),(0,d.jsx)(q,{children:(0,d.jsx)(u,{variant:"secondary",onClick:()=>Z(!1),children:"Close"})})]})})]})]})})}},4185:(e,t,r)=>{r.d(t,{A:()=>g});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
  margin-top: 12px;
`,a=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=i.Ay.a`
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
`,d=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=i.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=i.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=i.Ay.a`
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
`;const g=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,n.jsx)(x,{children:r.map((e,t)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,n.jsx)(s,{children:i.map((e,t)=>{return(0,n.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,i})})]})}},4302:(e,t,r)=>{r.d(t,{A:()=>$});var i=r(9950),n=r(4752),o=r(4185),a=r(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,l=n.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,c=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  flex: 1;
  min-width: 0;
`,h=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,g=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=n.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,m=n.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,y=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,b=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,j=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,v=n.Ay.textarea`
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
`,A=n.Ay.div`
  display: flex;
  gap: 4px;
`,F=n.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,w=n.Ay.button`
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
`,k=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,C=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,E=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,B=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=n.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,S=n.Ay.input`
  display: none;
`,$=e=>{let{entityType:t,entityId:r,currentUserId:n,onMarkRead:$}=e;const[D,_]=(0,i.useState)([]),[I,T]=(0,i.useState)(""),[N,P]=(0,i.useState)([]),[O,R]=(0,i.useState)(!1),[q,M]=(0,i.useState)(!1),U=(0,i.useRef)(null),L=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&_(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{r&&(L(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),$&&$()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const J=async()=>{const e=I.trim(),i=N.length>0;if((e||i)&&!q){M(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:I.trim(),attachments:i?N:void 0})})).ok&&(T(""),P([]),L())}catch(n){console.error("Error adding comment:",n)}finally{M(!1)}}},W=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",D.length,")"]}),D.length>0?(0,a.jsx)(d,{children:D.map(e=>{var t,r,i;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(g,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,a.jsx)(u,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,a.jsx)(f,{children:W(e.createdAt)}),n&&e.author_id===n&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&L()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(m,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(b,{children:[(0,a.jsxs)(j,{children:[(0,a.jsx)(v,{value:I,onChange:e=>T(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),J())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(A,{children:[(0,a.jsx)(F,{onClick:()=>{var e;return null===(e=U.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(w,{onClick:J,disabled:!I.trim()&&0===N.length||q,children:"Send"})]})]}),(N.length>0||O)&&(0,a.jsxs)(C,{children:[O&&(0,a.jsx)(z,{children:"Uploading..."}),N.map((e,t)=>(0,a.jsxs)(E,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(B,{onClick:()=>(e=>{const t=N[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),P(t=>t.filter((t,r)=>r!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(S,{ref:U,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;e.target.value="";const r=5-N.length,i=Array.from(t).slice(0,r);if(0!==i.length){R(!0);try{const e=new FormData;i.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),n=await r.json();n.success&&n.data&&P(e=>[...e,...n.data])}catch(n){console.error("File upload error:",n)}finally{R(!1)}}}})]})}},7455:(e,t,r)=>{r.d(t,{A:()=>j});var i=r(9950),n=r(4752),o=r(4414);const a=n.Ay.div`
  margin-top: 8px;
`,s=n.Ay.div`
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
`,l=n.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,d=n.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,c=n.Ay.input`
  display: none;
`,p=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,h=n.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,g=n.Ay.div`
  flex: 1;
  min-width: 0;
`,u=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,f=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
`,m=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,y=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,b=n.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const j=e=>{let{files:t,onChange:r,maxFiles:n=5,maxSizeMB:j=10,disabled:v=!1,compact:A=!1}=e;const[F,w]=(0,i.useState)(!1),[k,C]=(0,i.useState)(!1),E=(0,i.useRef)(null),B=!v&&!k&&t.length<n,z=async e=>{const i=n-t.length,o=Array.from(e).slice(0,i);if(0!==o.length){for(const e of o)e.size;C(!0);try{const e=new FormData;o.forEach(t=>e.append("files",t));const i=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${i}`},body:e}),a=await n.json();a.success&&a.data&&r([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{C(!1)}}};return(0,o.jsxs)(a,{children:[B&&(0,o.jsx)(s,{isDragging:F,disabled:!B,onClick:()=>{var e;return B&&(null===(e=E.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),B&&w(!0)},onDragLeave:e=>{e.preventDefault(),w(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),w(!1),B&&e.dataTransfer.files.length>0&&z(e.dataTransfer.files)},children:A?(0,o.jsxs)(l,{children:["Click or drag files to attach (",t.length,"/",n,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{children:F?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",j,"MB each, ",n-t.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:E,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&z(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(b,{}),"Uploading..."]}),t.map((e,i)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(g,{children:[(0,o.jsx)(u,{children:e.originalName}),(0,o.jsx)(f,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]}),!v&&(0,o.jsx)(m,{onClick:()=>(async e=>{const i=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:i.url})})}catch(n){}r(t.filter((t,r)=>r!==e))})(i),title:"Remove",children:"\u2715"})]},e.url);var n,a})]})]})}}}]);