"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8725],{2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var i=r(4752),n=r(4414);const s=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,o=i.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

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
`,a=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:r,style:i}=e;return(0,n.jsx)(s,{className:r,style:i,children:t})},d=e=>{let{active:t,onClick:r,children:i,className:s}=e;return(0,n.jsx)(o,{active:t,onClick:r,className:s,children:i})},c=e=>{let{count:t,variant:r="default",showZero:i=!1}=e;return 0!==t||i?(0,n.jsx)(a,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>s});var i=r(9950),n=r(4492);function s(e){const[t,r]=(0,n.ok)(),s=(0,i.useCallback)(()=>t.get("tab")||e,[t,e]),[o,a]=(0,i.useState)(s());return[o,(0,i.useCallback)(e=>{a(e),r({tab:e})},[r])]}},8725:(e,t,r)=>{r.r(t),r.d(t,{default:()=>W});var i=r(9950),n=r(4752),s=r(1367),o=r(4302),a=r(7455),l=r(4185),d=r(2597),c=r(2653),p=r(6649),x=r(4414);const h=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,u=n.Ay.div`
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
`,g=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,y=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,b=n.Ay.div`
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
`,v=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=n.Ay.div`
  flex: 1;
`,k=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,F=n.Ay.div`
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
`,C=n.Ay.div`
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
`,_=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,$=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,D=n.Ay.h2`
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
`,T=n.Ay.div`
  padding: 24px;
`,q=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,P=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,O=n.Ay.div`
  margin-bottom: 20px;
`,M=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,R=n.Ay.input`
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
`,U=n.Ay.select`
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
`,H=n.Ay.textarea`
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
`,W=()=>{const{user:e}=(0,s.As)(),[t,r]=(0,i.useState)([]),[n,W]=(0,c.M)("all"),[Y,J]=(0,i.useState)(!1),[L,Z]=(0,i.useState)(!1),[G,K]=(0,i.useState)(null),[Q,V]=(0,i.useState)("open"),[X,ee]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[te,re]=(0,i.useState)([]),[ie,ne]=(0,i.useState)({}),se=(null===e||void 0===e?void 0:e.id)||"2";(null===e||void 0===e?void 0:e.name)||null===e||void 0===e||e.email,null===e||void 0===e||e.email,null===e||void 0===e||e.role;(0,i.useEffect)(()=>{if(e){oe();const e=setInterval(oe,1e4);return()=>clearInterval(e)}},[e]);const oe=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/support-tickets?customerId=${se}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.success?e.data:Array.isArray(e)?e:[];r(i),ae(i)}}catch(e){console.error("Error fetching support tickets:",e)}},ae=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ne(t)}}}catch(t){console.error("Error fetching unread counts:",t)}},le=t.filter(e=>"all"===n||e.status===n),de=t.length,ce=t.filter(e=>"open"===e.status).length,pe=t.filter(e=>"in-progress"===e.status).length,xe=t.filter(e=>"resolved"===e.status).length,he=t.filter(e=>"closed"===e.status).length,ue=e=>new Date(e).toLocaleString("en-MY");return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(y,{children:"System Inquiry"}),(0,x.jsx)(j,{children:(0,x.jsx)(m,{variant:"primary",onClick:()=>{J(!0)},children:"New Inquiry"})})]}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#635BFF",children:[(0,x.jsx)(p.Os,{children:de}),(0,x.jsx)(p.v0,{children:"Total Tickets"})]}),(0,x.jsxs)(p.hI,{color:"#F59E0B",children:[(0,x.jsx)(p.Os,{children:ce}),(0,x.jsx)(p.v0,{children:"Open Tickets"})]}),(0,x.jsxs)(p.hI,{color:"#3B82F6",children:[(0,x.jsx)(p.Os,{children:pe}),(0,x.jsx)(p.v0,{children:"In Progress"})]}),(0,x.jsxs)(p.hI,{color:"#10B981",children:[(0,x.jsx)(p.Os,{children:xe}),(0,x.jsx)(p.v0,{children:"Resolved"})]})]}),(0,x.jsxs)(d.tU,{children:[(0,x.jsxs)(d.oz,{active:"all"===n,onClick:()=>W("all"),children:["All (",de,")"]}),(0,x.jsxs)(d.oz,{active:"open"===n,onClick:()=>W("open"),children:["Open (",ce,")"]}),(0,x.jsxs)(d.oz,{active:"in-progress"===n,onClick:()=>W("in-progress"),children:["In Progress (",pe,")"]}),(0,x.jsxs)(d.oz,{active:"resolved"===n,onClick:()=>W("resolved"),children:["Resolved (",xe,")"]}),(0,x.jsxs)(d.oz,{active:"closed"===n,onClick:()=>W("closed"),children:["Closed (",he,")"]})]}),(0,x.jsxs)(f,{children:[le.map(e=>(0,x.jsxs)(b,{style:{cursor:"pointer"},onClick:()=>(e=>{K(e),V(e.status),Z(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:e.ticketNumber}),(0,x.jsx)(F,{children:e.subject}),(0,x.jsx)(A,{children:(0,x.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,x.jsxs)(C,{children:[(0,x.jsx)(E,{status:e.status,children:e.status}),(0,x.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,x.jsx)(z,{children:e.description}),(0,x.jsxs)(S,{children:[(0,x.jsxs)("span",{children:["Created: ",ue(e.createdAt)]}),ie[e.id]&&(0,x.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ie[e.id].total_comments,ie[e.id].unread_count>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ie[e.id].unread_count," new"]})]})]})]},e.id)),0===le.length&&(0,x.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,x.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,x.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),Y&&(0,x.jsx)(I,{onClick:()=>J(!1),children:(0,x.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)($,{children:[(0,x.jsx)(D,{children:"Create System Inquiry"}),(0,x.jsx)(N,{onClick:()=>J(!1),children:"\xd7"})]}),(0,x.jsxs)(T,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(M,{children:"Subject *"}),(0,x.jsx)(R,{type:"text",value:X.subject,onChange:e=>ee({...X,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(M,{children:"Description *"}),(0,x.jsx)(H,{value:X.description,onChange:e=>ee({...X,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(M,{children:"Attachments"}),(0,x.jsx)(a.A,{files:te,onChange:re,maxFiles:5})]}),(0,x.jsxs)(P,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(M,{children:"Priority"}),(0,x.jsxs)(U,{value:X.priority,onChange:e=>ee({...X,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"low",children:"Low"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(M,{children:"Category"}),(0,x.jsxs)(U,{value:X.category,onChange:e=>ee({...X,category:e.target.value}),children:[(0,x.jsx)("option",{value:"technical",children:"Technical Issue"}),(0,x.jsx)("option",{value:"account",children:"Account Management"}),(0,x.jsx)("option",{value:"billing",children:"Billing"}),(0,x.jsx)("option",{value:"feature",children:"Feature Request"}),(0,x.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(m,{variant:"secondary",onClick:()=>J(!1),children:"Cancel"}),(0,x.jsx)(m,{variant:"primary",onClick:async()=>{if(X.subject.trim()&&X.description.trim())try{const e={subject:X.subject,description:X.description,priority:X.priority,category:X.category,attachments:te.length>0?te:void 0},t=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).ok?(await oe(),ee({subject:"",description:"",priority:"medium",category:"general"}),re([]),J(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!X.subject.trim()||!X.description.trim(),children:"Submit Inquiry"})]})]})}),L&&G&&(0,x.jsx)(I,{onClick:()=>Z(!1),children:(0,x.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)($,{children:[(0,x.jsx)(D,{children:"Inquiry Details"}),(0,x.jsx)(N,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,x.jsxs)(T,{children:[(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(M,{children:"Ticket Number"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:G.ticketNumber})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(M,{children:"Status"}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,x.jsxs)(U,{value:Q,onChange:e=>V(e.target.value),style:{flex:1},children:[(0,x.jsx)("option",{value:"open",children:"Open"}),(0,x.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,x.jsx)("option",{value:"resolved",children:"Resolved"}),(0,x.jsx)("option",{value:"closed",children:"Closed"})]}),Q!==G.status&&(0,x.jsx)(m,{variant:"primary",onClick:async()=>{if(G)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${G.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:Q})})).ok&&(r(e=>e.map(e=>e.id===G.id?{...e,status:Q}:e)),K(e=>e?{...e,status:Q}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:"Save"})]})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(M,{children:"Priority"}),(0,x.jsx)("div",{style:{padding:"8px 0"},children:(0,x.jsx)(B,{priority:G.priority,children:G.priority})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(M,{children:"Category"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:G.category.replace("-"," ")})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(M,{children:"Subject"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:G.subject})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(M,{children:"Description"}),(0,x.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:G.description})]}),(null===G||void 0===G?void 0:G.attachments)&&G.attachments.length>0&&(0,x.jsx)(l.A,{attachments:G.attachments}),(0,x.jsxs)("div",{children:[(0,x.jsx)(M,{children:"Created"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ue(G.createdAt)})]})]}),(0,x.jsx)(o.A,{entityType:"support_ticket",entityId:G.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ne(e=>{const t={...e};return t[G.id]&&(t[G.id]={...t[G.id],unread_count:0}),t})})]}),(0,x.jsx)(q,{children:(0,x.jsx)(m,{variant:"secondary",onClick:()=>Z(!1),children:"Close"})})]})})]})]})})}}}]);