"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8725],{2597:(e,r,t)=>{t.d(r,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var i=t(4752),n=t(4414);const s=i.Ay.div`
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
`,l=e=>{let{children:r,className:t,style:i}=e;return(0,n.jsx)(s,{className:t,style:i,children:r})},d=e=>{let{active:r,onClick:t,children:i,className:s}=e;return(0,n.jsx)(o,{active:r,onClick:t,className:s,children:i})},c=e=>{let{count:r,variant:t="default",showZero:i=!1}=e;return 0!==r||i?(0,n.jsx)(a,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>s});var i=t(9950),n=t(4492);function s(e){const[r,t]=(0,n.ok)(),s=(0,i.useCallback)(()=>r.get("tab")||e,[r,e]),[o,a]=(0,i.useState)(s());return[o,(0,i.useCallback)(e=>{a(e),t({tab:e})},[t])]}},8725:(e,r,t)=>{t.r(r),t.d(r,{default:()=>W});var i=t(9950),n=t(4752),s=t(1367),o=t(4302),a=t(7455),l=t(4185),d=t(2597),c=t(2653),p=t(6649),x=t(4414);const h=n.Ay.div`
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
`,m=n.Ay.div`
  display: flex;
  gap: 12px;
`,j=n.Ay.button`
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
`,f=n.Ay.div`
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
`,I=n.Ay.div`
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
`,S=n.Ay.div`
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
`,R=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,M=n.Ay.input`
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
`,W=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,i.useState)([]),[n,W]=(0,c.M)("all"),[Y,J]=(0,i.useState)(!1),[L,G]=(0,i.useState)(!1),[Z,K]=(0,i.useState)(null),[Q,V]=(0,i.useState)("open"),[X,ee]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[re,te]=(0,i.useState)([]),[ie,ne]=(0,i.useState)({}),se=(null===e||void 0===e?void 0:e.id)||"2",oe=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Brand User",ae=(null===e||void 0===e?void 0:e.email)||"brand@example.com",le=(null===e||void 0===e?void 0:e.role)||"Brand General";(0,i.useEffect)(()=>{if(e){de();const e=setInterval(de,1e4);return()=>clearInterval(e)}},[e]);const de=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/support-tickets?customerId=${se}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),i=e.success?e.data:Array.isArray(e)?e:[];t(i),ce(i)}}catch(e){console.error("Error fetching support tickets:",e)}},ce=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ne(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},pe=r.filter(e=>"all"===n||e.status===n),xe=r.length,he=r.filter(e=>"open"===e.status).length,ue=r.filter(e=>"in-progress"===e.status).length,ge=r.filter(e=>"resolved"===e.status).length,ye=r.filter(e=>"closed"===e.status).length,me=e=>new Date(e).toLocaleString("en-MY");return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(y,{children:"System Inquiry"}),(0,x.jsx)(m,{children:(0,x.jsx)(j,{variant:"primary",onClick:()=>{J(!0)},children:"New Inquiry"})})]}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#635BFF",children:[(0,x.jsx)(p.Os,{children:xe}),(0,x.jsx)(p.v0,{children:"Total Tickets"})]}),(0,x.jsxs)(p.hI,{color:"#F59E0B",children:[(0,x.jsx)(p.Os,{children:he}),(0,x.jsx)(p.v0,{children:"Open Tickets"})]}),(0,x.jsxs)(p.hI,{color:"#3B82F6",children:[(0,x.jsx)(p.Os,{children:ue}),(0,x.jsx)(p.v0,{children:"In Progress"})]}),(0,x.jsxs)(p.hI,{color:"#10B981",children:[(0,x.jsx)(p.Os,{children:ge}),(0,x.jsx)(p.v0,{children:"Resolved"})]})]}),(0,x.jsxs)(d.tU,{children:[(0,x.jsxs)(d.oz,{active:"all"===n,onClick:()=>W("all"),children:["All (",xe,")"]}),(0,x.jsxs)(d.oz,{active:"open"===n,onClick:()=>W("open"),children:["Open (",he,")"]}),(0,x.jsxs)(d.oz,{active:"in-progress"===n,onClick:()=>W("in-progress"),children:["In Progress (",ue,")"]}),(0,x.jsxs)(d.oz,{active:"resolved"===n,onClick:()=>W("resolved"),children:["Resolved (",ge,")"]}),(0,x.jsxs)(d.oz,{active:"closed"===n,onClick:()=>W("closed"),children:["Closed (",ye,")"]})]}),(0,x.jsxs)(b,{children:[pe.map(e=>(0,x.jsxs)(f,{style:{cursor:"pointer"},onClick:()=>(e=>{K(e),V(e.status),G(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:e.ticketNumber}),(0,x.jsx)(F,{children:e.subject}),(0,x.jsx)(A,{children:(0,x.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,x.jsxs)(C,{children:[(0,x.jsx)(E,{status:e.status,children:e.status}),(0,x.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,x.jsx)(z,{children:e.description}),(0,x.jsxs)(I,{children:[(0,x.jsxs)("span",{children:["Created: ",me(e.createdAt)]}),ie[e.id]&&(0,x.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ie[e.id].total_comments,ie[e.id].unread_count>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ie[e.id].unread_count," new"]})]})]})]},e.id)),0===pe.length&&(0,x.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,x.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,x.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),Y&&(0,x.jsx)(S,{onClick:()=>J(!1),children:(0,x.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)($,{children:[(0,x.jsx)(D,{children:"Create System Inquiry"}),(0,x.jsx)(N,{onClick:()=>J(!1),children:"\xd7"})]}),(0,x.jsxs)(T,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(R,{children:"Subject *"}),(0,x.jsx)(M,{type:"text",value:X.subject,onChange:e=>ee({...X,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(R,{children:"Description *"}),(0,x.jsx)(H,{value:X.description,onChange:e=>ee({...X,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(R,{children:"Attachments"}),(0,x.jsx)(a.A,{files:re,onChange:te,maxFiles:5})]}),(0,x.jsxs)(P,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(R,{children:"Priority"}),(0,x.jsxs)(U,{value:X.priority,onChange:e=>ee({...X,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"low",children:"Low"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(R,{children:"Category"}),(0,x.jsxs)(U,{value:X.category,onChange:e=>ee({...X,category:e.target.value}),children:[(0,x.jsx)("option",{value:"technical",children:"Technical Issue"}),(0,x.jsx)("option",{value:"account",children:"Account Management"}),(0,x.jsx)("option",{value:"billing",children:"Billing"}),(0,x.jsx)("option",{value:"feature",children:"Feature Request"}),(0,x.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>J(!1),children:"Cancel"}),(0,x.jsx)(j,{variant:"primary",onClick:async()=>{if(X.subject.trim()&&X.description.trim())try{const e={customerId:se,customerName:oe,customerEmail:ae,customerRole:le,subject:X.subject,description:X.description,priority:X.priority,category:X.category,attachments:re.length>0?re:void 0},r=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(e)})).ok?(await de(),ee({subject:"",description:"",priority:"medium",category:"general"}),te([]),J(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!X.subject.trim()||!X.description.trim(),children:"Submit Inquiry"})]})]})}),L&&Z&&(0,x.jsx)(S,{onClick:()=>G(!1),children:(0,x.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)($,{children:[(0,x.jsx)(D,{children:"Inquiry Details"}),(0,x.jsx)(N,{onClick:()=>G(!1),children:"\xd7"})]}),(0,x.jsxs)(T,{children:[(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(R,{children:"Ticket Number"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:Z.ticketNumber})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(R,{children:"Status"}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,x.jsxs)(U,{value:Q,onChange:e=>V(e.target.value),style:{flex:1},children:[(0,x.jsx)("option",{value:"open",children:"Open"}),(0,x.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,x.jsx)("option",{value:"resolved",children:"Resolved"}),(0,x.jsx)("option",{value:"closed",children:"Closed"})]}),Q!==Z.status&&(0,x.jsx)(j,{variant:"primary",onClick:async()=>{if(Z)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${Z.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:Q})})).ok&&(t(e=>e.map(e=>e.id===Z.id?{...e,status:Q}:e)),K(e=>e?{...e,status:Q}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:"Save"})]})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(R,{children:"Priority"}),(0,x.jsx)("div",{style:{padding:"8px 0"},children:(0,x.jsx)(B,{priority:Z.priority,children:Z.priority})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(R,{children:"Category"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:Z.category.replace("-"," ")})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(R,{children:"Subject"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:Z.subject})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(R,{children:"Description"}),(0,x.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:Z.description})]}),(null===Z||void 0===Z?void 0:Z.attachments)&&Z.attachments.length>0&&(0,x.jsx)(l.A,{attachments:Z.attachments}),(0,x.jsxs)("div",{children:[(0,x.jsx)(R,{children:"Created"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:me(Z.createdAt)})]})]}),(0,x.jsx)(o.A,{entityType:"support_ticket",entityId:Z.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ne(e=>{const r={...e};return r[Z.id]&&(r[Z.id]={...r[Z.id],unread_count:0}),r})})]}),(0,x.jsx)(q,{children:(0,x.jsx)(j,{variant:"secondary",onClick:()=>G(!1),children:"Close"})})]})})]})]})})}}}]);