"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1291],{1291:(e,r,t)=>{t.r(r),t.d(r,{default:()=>L});var i=t(9950),n=t(4752),o=t(1367),s=t(4302),a=t(7455),d=t(4185),l=t(2597),c=t(2653),p=t(4414);const x=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=n.Ay.div`
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
`,u=n.Ay.div`
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

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=n.Ay.div`
  display: flex;
  gap: 12px;
`,y=n.Ay.button`
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
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,j=n.Ay.div`
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
`,f=n.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,v=n.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  font-weight: 500;
`,w=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,k=n.Ay.div`
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
`,F=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,A=n.Ay.div`
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
`,I=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,$=n.Ay.div`
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
`,N=n.Ay.div`
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
`,D=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,T=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,q=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,P=n.Ay.button`
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
`,L=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,i.useState)([]),[n,L]=(0,c.M)("all"),[G,Z]=(0,i.useState)(!1),[K,Q]=(0,i.useState)(!1),[V,X]=(0,i.useState)(null),[ee,re]=(0,i.useState)("open"),[te,ie]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ne,oe]=(0,i.useState)([]),[se,ae]=(0,i.useState)({}),de=(null===e||void 0===e?void 0:e.id)||"4",le=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Foodcourt User",ce=(null===e||void 0===e?void 0:e.email)||"foodcourt@example.com",pe=(null===e||void 0===e?void 0:e.role)||"Foodcourt General";(0,i.useEffect)(()=>{if(e){xe();const e=setInterval(xe,1e4);return()=>clearInterval(e)}},[e]);const xe=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/support-tickets?customerId=${de}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),i=e.success?e.data:Array.isArray(e)?e:[];t(i),he(i)}}catch(e){console.error("Error fetching support tickets:",e)}},he=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ae(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},ue=r.filter(e=>"all"===n||e.status===n),ge=r.length,me=r.filter(e=>"open"===e.status).length,ye=r.filter(e=>"in-progress"===e.status).length,be=r.filter(e=>"resolved"===e.status).length,je=r.filter(e=>"closed"===e.status).length,fe=e=>new Date(e).toLocaleString("en-MY");return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(g,{children:"System Inquiry"}),(0,p.jsx)(m,{children:(0,p.jsx)(y,{variant:"primary",onClick:()=>{Z(!0)},children:"New Inquiry"})})]}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(b,{children:[(0,p.jsxs)(j,{borderColor:"#635BFF",children:[(0,p.jsx)(f,{children:ge}),(0,p.jsx)(v,{children:"Total Tickets"})]}),(0,p.jsxs)(j,{borderColor:"#F59E0B",children:[(0,p.jsx)(f,{children:me}),(0,p.jsx)(v,{children:"Open Tickets"})]}),(0,p.jsxs)(j,{borderColor:"#3B82F6",children:[(0,p.jsx)(f,{children:ye}),(0,p.jsx)(v,{children:"In Progress"})]}),(0,p.jsxs)(j,{borderColor:"#10B981",children:[(0,p.jsx)(f,{children:be}),(0,p.jsx)(v,{children:"Resolved"})]})]}),(0,p.jsxs)(l.tU,{children:[(0,p.jsxs)(l.oz,{active:"all"===n,onClick:()=>L("all"),children:["All (",ge,")"]}),(0,p.jsxs)(l.oz,{active:"open"===n,onClick:()=>L("open"),children:["Open (",me,")"]}),(0,p.jsxs)(l.oz,{active:"in-progress"===n,onClick:()=>L("in-progress"),children:["In Progress (",ye,")"]}),(0,p.jsxs)(l.oz,{active:"resolved"===n,onClick:()=>L("resolved"),children:["Resolved (",be,")"]}),(0,p.jsxs)(l.oz,{active:"closed"===n,onClick:()=>L("closed"),children:["Closed (",je,")"]})]}),(0,p.jsxs)(w,{children:[ue.map(e=>(0,p.jsxs)(k,{style:{cursor:"pointer"},onClick:()=>(e=>{X(e),re(e.status),Q(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(C,{children:e.ticketNumber}),(0,p.jsx)(E,{children:e.subject}),(0,p.jsx)(B,{children:(0,p.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,p.jsxs)(z,{children:[(0,p.jsx)(S,{status:e.status,children:e.status}),(0,p.jsx)(I,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)($,{children:e.description}),(0,p.jsxs)(_,{children:[(0,p.jsxs)("span",{children:["Created: ",fe(e.createdAt)]}),se[e.id]&&(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",se[e.id].total_comments,se[e.id].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[se[e.id].unread_count," new"]})]})]})]},e.id)),0===ue.length&&(0,p.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,p.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,p.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),G&&(0,p.jsx)(N,{onClick:()=>Z(!1),children:(0,p.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(q,{children:"Create System Inquiry"}),(0,p.jsx)(P,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,p.jsxs)(R,{children:[(0,p.jsxs)(U,{children:[(0,p.jsx)(Y,{children:"Subject *"}),(0,p.jsx)(H,{type:"text",value:te.subject,onChange:e=>ie({...te,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(Y,{children:"Description *"}),(0,p.jsx)(J,{value:te.description,onChange:e=>ie({...te,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(Y,{children:"Attachments"}),(0,p.jsx)(a.A,{files:ne,onChange:oe,maxFiles:5})]}),(0,p.jsxs)(M,{children:[(0,p.jsxs)(U,{children:[(0,p.jsx)(Y,{children:"Priority"}),(0,p.jsxs)(W,{value:te.priority,onChange:e=>ie({...te,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"low",children:"Low"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(Y,{children:"Category"}),(0,p.jsxs)(W,{value:te.category,onChange:e=>ie({...te,category:e.target.value}),children:[(0,p.jsx)("option",{value:"technical",children:"Technical Issue"}),(0,p.jsx)("option",{value:"account",children:"Account Management"}),(0,p.jsx)("option",{value:"billing",children:"Billing"}),(0,p.jsx)("option",{value:"feature",children:"Feature Request"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(y,{variant:"secondary",onClick:()=>Z(!1),children:"Cancel"}),(0,p.jsx)(y,{variant:"primary",onClick:async()=>{if(te.subject.trim()&&te.description.trim())try{const e={customerId:de,customerName:le,customerEmail:ce,customerRole:pe,subject:te.subject,description:te.description,priority:te.priority,category:te.category,attachments:ne.length>0?ne:void 0},r=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(e)})).ok?(await xe(),ie({subject:"",description:"",priority:"medium",category:"general"}),oe([]),Z(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!te.subject.trim()||!te.description.trim(),children:"Submit Inquiry"})]})]})}),K&&V&&(0,p.jsx)(N,{onClick:()=>Q(!1),children:(0,p.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(q,{children:"Inquiry Details"}),(0,p.jsx)(P,{onClick:()=>Q(!1),children:"\xd7"})]}),(0,p.jsxs)(R,{children:[(0,p.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(Y,{children:"Ticket Number"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:V.ticketNumber})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(Y,{children:"Status"}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,p.jsxs)(W,{value:ee,onChange:e=>re(e.target.value),style:{flex:1},children:[(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]}),ee!==V.status&&(0,p.jsx)(y,{variant:"primary",onClick:async()=>{if(V)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${V.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ee})})).ok&&(t(e=>e.map(e=>e.id===V.id?{...e,status:ee}:e)),X(e=>e?{...e,status:ee}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:"Save"})]})]})]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(Y,{children:"Priority"}),(0,p.jsx)("div",{style:{padding:"8px 0"},children:(0,p.jsx)(I,{priority:V.priority,children:V.priority})})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(Y,{children:"Category"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:V.category.replace("-"," ")})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(Y,{children:"Subject"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:V.subject})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(Y,{children:"Description"}),(0,p.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:V.description})]}),(null===V||void 0===V?void 0:V.attachments)&&V.attachments.length>0&&(0,p.jsx)(d.A,{attachments:V.attachments}),(0,p.jsxs)("div",{children:[(0,p.jsx)(Y,{children:"Created"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:fe(V.createdAt)})]})]}),(0,p.jsx)(s.A,{entityType:"support_ticket",entityId:V.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ae(e=>{const r={...e};return r[V.id]&&(r[V.id]={...r[V.id],unread_count:0}),r})})]}),(0,p.jsx)(O,{children:(0,p.jsx)(y,{variant:"secondary",onClick:()=>Q(!1),children:"Close"})})]})})]})]})})}},2597:(e,r,t)=>{t.d(r,{Ex:()=>c,oz:()=>l,tU:()=>d});t(9950);var i=t(4752),n=t(4414);const o=i.Ay.div`
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
`,s=i.Ay.button`
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
`,d=e=>{let{children:r,className:t,style:i}=e;return(0,n.jsx)(o,{className:t,style:i,children:r})},l=e=>{let{active:r,onClick:t,children:i,className:o}=e;return(0,n.jsx)(s,{active:r,onClick:t,className:o,children:i})},c=e=>{let{count:r,variant:t="default",showZero:i=!1}=e;return 0!==r||i?(0,n.jsx)(a,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>o});var i=t(9950),n=t(4492);function o(e){const[r,t]=(0,n.ok)(),o=(0,i.useCallback)(()=>r.get("tab")||e,[r,e]),[s,a]=(0,i.useState)(o());return[s,(0,i.useCallback)(e=>{a(e),t({tab:e})},[t])]}}}]);