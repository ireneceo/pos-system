"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1291],{1291:(e,r,t)=>{t.r(r),t.d(r,{default:()=>q});var i=t(8819),n=t(9950),s=t(4752),o=t(1367),a=t(4302),l=t(7455),d=t(4185),c=t(2674),p=t(4414);const x=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=s.Ay.div`
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
`,u=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,j=s.Ay.div`
  display: flex;
  gap: 12px;
`,m=s.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,y=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,v=s.Ay.div`
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
`,f=s.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,b=s.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  font-weight: 500;
`,w=s.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,F=s.Ay.button`
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
`,k=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,C=s.Ay.div`
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
`,A=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=s.Ay.div`
  flex: 1;
`,B=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,S=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,I=s.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,R=s.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,z=s.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,$=s.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,_=s.Ay.div`
  font-size: 14px;
  color: ${i.w.colors.text.muted};
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,T=s.Ay.div`
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
`,q=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,n.useState)([]),[i,s]=(0,n.useState)("all"),[q,D]=(0,n.useState)(!1),[P,N]=(0,n.useState)(!1),[O,H]=(0,n.useState)(null),[J,M]=(0,n.useState)("open"),[U,Y]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"general"}),[L,Q]=(0,n.useState)([]),[W,X]=(0,n.useState)({}),G=(null===e||void 0===e?void 0:e.id)||"4",Z=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Foodcourt User",K=(null===e||void 0===e?void 0:e.email)||"foodcourt@example.com",V=(null===e||void 0===e?void 0:e.role)||"Foodcourt General";(0,n.useEffect)(()=>{if(e){ee();const e=setInterval(ee,1e4);return()=>clearInterval(e)}},[e]);const ee=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/support-tickets?customerId=${G}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),i=e.success?e.data:Array.isArray(e)?e:[];t(i),re(i)}}catch(e){console.error("Error fetching support tickets:",e)}},re=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),X(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},te=r.filter(e=>"all"===i||e.status===i),ie=r.length,ne=r.filter(e=>"open"===e.status).length,se=r.filter(e=>"in-progress"===e.status).length,oe=r.filter(e=>"resolved"===e.status).length,ae=r.filter(e=>"closed"===e.status).length,le=e=>new Date(e).toLocaleString("en-MY");return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(g,{children:"System Inquiry"}),(0,p.jsxs)(j,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:ee,children:"Refresh"}),(0,p.jsx)(m,{variant:"primary",onClick:()=>{D(!0)},children:"New Inquiry"})]})]}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(y,{children:[(0,p.jsxs)(v,{borderColor:"#635BFF",children:[(0,p.jsx)(f,{children:ie}),(0,p.jsx)(b,{children:"Total Tickets"})]}),(0,p.jsxs)(v,{borderColor:"#F59E0B",children:[(0,p.jsx)(f,{children:ne}),(0,p.jsx)(b,{children:"Open Tickets"})]}),(0,p.jsxs)(v,{borderColor:"#3B82F6",children:[(0,p.jsx)(f,{children:se}),(0,p.jsx)(b,{children:"In Progress"})]}),(0,p.jsxs)(v,{borderColor:"#10B981",children:[(0,p.jsx)(f,{children:oe}),(0,p.jsx)(b,{children:"Resolved"})]})]}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(F,{active:"all"===i,onClick:()=>s("all"),children:["All (",ie,")"]}),(0,p.jsxs)(F,{active:"open"===i,onClick:()=>s("open"),children:["Open (",ne,")"]}),(0,p.jsxs)(F,{active:"in-progress"===i,onClick:()=>s("in-progress"),children:["In Progress (",se,")"]}),(0,p.jsxs)(F,{active:"resolved"===i,onClick:()=>s("resolved"),children:["Resolved (",oe,")"]}),(0,p.jsxs)(F,{active:"closed"===i,onClick:()=>s("closed"),children:["Closed (",ae,")"]})]}),(0,p.jsxs)(k,{children:[te.map(e=>(0,p.jsxs)(C,{style:{cursor:"pointer"},onClick:()=>(e=>{H(e),M(e.status),N(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:e.ticketNumber}),(0,p.jsx)(S,{children:e.subject}),(0,p.jsx)(I,{children:(0,p.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(z,{status:e.status,children:e.status}),(0,p.jsx)($,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)(_,{children:e.description}),(0,p.jsxs)(T,{children:[(0,p.jsxs)("span",{children:["Created: ",le(e.createdAt)]}),W[e.id]&&(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",W[e.id].total_comments,W[e.id].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[W[e.id].unread_count," new"]})]})]})]},e.id)),0===te.length&&(0,p.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,p.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,p.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),q&&(0,p.jsx)(c.mH,{onClick:()=>D(!1),children:(0,p.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:"Create System Inquiry"}),(0,p.jsx)(c.Jn,{onClick:()=>D(!1),children:"\xd7"})]}),(0,p.jsxs)(c.cw,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Subject *"}),(0,p.jsx)(c.ZQ,{type:"text",value:U.subject,onChange:e=>Y({...U,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Description *"}),(0,p.jsx)(c.Lz,{value:U.description,onChange:e=>Y({...U,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(c.lR,{children:"Attachments"}),(0,p.jsx)(l.A,{files:L,onChange:Q,maxFiles:5})]}),(0,p.jsxs)(c.fh,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Priority"}),(0,p.jsxs)(c.FX,{value:U.priority,onChange:e=>Y({...U,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"low",children:"Low"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Category"}),(0,p.jsxs)(c.FX,{value:U.category,onChange:e=>Y({...U,category:e.target.value}),children:[(0,p.jsx)("option",{value:"technical",children:"Technical Issue"}),(0,p.jsx)("option",{value:"account",children:"Account Management"}),(0,p.jsx)("option",{value:"billing",children:"Billing"}),(0,p.jsx)("option",{value:"feature",children:"Feature Request"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,p.jsxs)(c.jl,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>D(!1),children:"Cancel"}),(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(U.subject.trim()&&U.description.trim())try{const e={customerId:G,customerName:Z,customerEmail:K,customerRole:V,subject:U.subject,description:U.description,priority:U.priority,category:U.category,attachments:L.length>0?L:void 0},r=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(e)})).ok?(await ee(),Y({subject:"",description:"",priority:"medium",category:"general"}),Q([]),D(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!U.subject.trim()||!U.description.trim(),children:"Submit Inquiry"})]})]})}),P&&O&&(0,p.jsx)(c.mH,{onClick:()=>N(!1),children:(0,p.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:"Inquiry Details"}),(0,p.jsx)(c.Jn,{onClick:()=>N(!1),children:"\xd7"})]}),(0,p.jsxs)(c.cw,{children:[(0,p.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(c.lR,{children:"Ticket Number"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:O.ticketNumber})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(c.lR,{children:"Status"}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,p.jsxs)(c.FX,{value:J,onChange:e=>M(e.target.value),style:{flex:1},children:[(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]}),J!==O.status&&(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(O)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${O.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:J})})).ok&&(t(e=>e.map(e=>e.id===O.id?{...e,status:J}:e)),H(e=>e?{...e,status:J}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:"Save"})]})]})]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(c.lR,{children:"Priority"}),(0,p.jsx)("div",{style:{padding:"8px 0"},children:(0,p.jsx)($,{priority:O.priority,children:O.priority})})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(c.lR,{children:"Category"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:O.category.replace("-"," ")})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(c.lR,{children:"Subject"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:O.subject})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(c.lR,{children:"Description"}),(0,p.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:O.description})]}),(null===O||void 0===O?void 0:O.attachments)&&O.attachments.length>0&&(0,p.jsx)(d.A,{attachments:O.attachments}),(0,p.jsxs)("div",{children:[(0,p.jsx)(c.lR,{children:"Created"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:le(O.createdAt)})]})]}),(0,p.jsx)(a.A,{entityType:"support_ticket",entityId:O.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>X(e=>{const r={...e};return r[O.id]&&(r[O.id]={...r[O.id],unread_count:0}),r})})]}),(0,p.jsx)(c.jl,{children:(0,p.jsx)(m,{variant:"secondary",onClick:()=>N(!1),children:"Close"})})]})})]})]})})}}}]);