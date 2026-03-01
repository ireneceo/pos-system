"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4802],{4802:(e,r,t)=>{t.r(r),t.d(r,{default:()=>W});var n=t(8819),i=t(9950),o=t(4752),s=t(1367),a=t(4302),l=t(7455),d=t(4185),c=t(2674),p=t(4414);const x=o.Ay.div`
  min-height: 100vh;
`,u=o.Ay.div`
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
`,h=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,j=o.Ay.div`
  display: flex;
  gap: 12px;
`,m=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":`\n    background: white;\n    color: #6B7280;\n    border: 1px solid ${n.w.colors.border};\n    &:hover { background: #F8FAFC; color: #0A2540; border-color: #CBD5E1; }\n  `}
`,y=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,f=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`,v=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${n.w.colors.secondary};
  margin-bottom: 4px;
`,w=o.Ay.div`
  font-size: 13px;
  color: ${n.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=o.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid ${n.w.colors.border};
`,A=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,k=o.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,C=o.Ay.input`
  padding: 8px 12px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus { outline: none; border-color: ${n.w.colors.primary}; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,F=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: ${n.w.colors.primary}; }
`,S=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,E=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
`,I=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,$=o.Ay.div`
  flex: 1;
  min-width: 0;
`,B=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,z=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,R=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,q=o.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,_=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,N=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,O=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,D=o.Ay.div`
  font-size: 14px;
  color: ${n.w.colors.text.muted};
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: ${n.w.colors.surfaceHover};
  border-radius: 8px;
  border-left: 3px solid ${n.w.colors.border};
  word-break: break-word;
  overflow-wrap: break-word;
`,P=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: ${n.w.colors.text.muted};
  flex-wrap: wrap;
  gap: 12px;
`,T=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,L=o.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,H=o.Ay.span`
  color: ${n.w.colors.text.dark};
`,M=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  h3 { color: ${n.w.colors.text.dark}; margin-bottom: 8px; }
`,J=o.Ay.div`
  background: ${n.w.colors.surfaceHover};
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,U=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,X=o.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,Y=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,Q=o.Ay.div`
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
`,W=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,i.useState)([]),[n,o]=(0,i.useState)([]),[W,Z]=(0,i.useState)(""),[G,K]=(0,i.useState)("all"),[V,ee]=(0,i.useState)("all"),[re,te]=(0,i.useState)("all"),[ne,ie]=(0,i.useState)("all"),[oe,se]=(0,i.useState)(!1),[ae,le]=(0,i.useState)(null),[de,ce]=(0,i.useState)("open"),[pe,xe]=(0,i.useState)({}),[ue,he]=(0,i.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),[ge,je]=(0,i.useState)([]);(0,i.useEffect)(()=>{e&&me()},[e]),(0,i.useEffect)(()=>{if(n.length>0){ye();const e=setInterval(ye,1e4);return()=>clearInterval(e)}},[n]);const me=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e;o(t.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},ye=async()=>{try{const r=localStorage.getItem("auth_token"),n=await fetch(`/api/operation-tickets?userId=${null===e||void 0===e?void 0:e.id}&userRole=Restaurant Owner`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json(),r=Array.isArray(e)?e:[];t(r),fe(r)}}catch(r){console.error("Error fetching operation tickets:",r)}},fe=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),xe(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},ve=r.filter(e=>{const r=e.subject.toLowerCase().includes(W.toLowerCase())||e.ticketNumber.toLowerCase().includes(W.toLowerCase()),t="all"===G||e.status===G,n="all"===V||e.priority===V,i="all"===re||e.category===re,o="all"===ne||String(e.restaurantId)===ne;return r&&t&&n&&i&&o}),we=r.filter(e=>"open"===e.status).length,be=r.filter(e=>"in-progress"===e.status).length,Ae=r.filter(e=>"resolved"===e.status).length,ke=e=>new Date(e).toLocaleString("en-MY");return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:"Operation Inquiry"}),(0,p.jsxs)(j,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:ye,children:"Refresh"}),(0,p.jsx)(m,{variant:"primary",onClick:()=>se(!0),children:"New Inquiry"})]})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(y,{children:[(0,p.jsxs)(f,{color:"#635BFF",children:[(0,p.jsx)(v,{children:r.length}),(0,p.jsx)(w,{children:"Total Inquiries"})]}),(0,p.jsxs)(f,{color:"#F59E0B",children:[(0,p.jsx)(v,{children:we}),(0,p.jsx)(w,{children:"Open"})]}),(0,p.jsxs)(f,{color:"#3B82F6",children:[(0,p.jsx)(v,{children:be}),(0,p.jsx)(w,{children:"In Progress"})]}),(0,p.jsxs)(f,{color:"#10B981",children:[(0,p.jsx)(v,{children:Ae}),(0,p.jsx)(w,{children:"Resolved"})]})]}),(0,p.jsxs)(b,{children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(k,{children:"Search"}),(0,p.jsx)(C,{placeholder:"Search inquiries...",value:W,onChange:e=>Z(e.target.value)})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(k,{children:"Restaurant"}),(0,p.jsxs)(F,{value:ne,onChange:e=>ie(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Restaurants"}),n.map(e=>(0,p.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(k,{children:"Status"}),(0,p.jsxs)(F,{value:G,onChange:e=>K(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(k,{children:"Priority"}),(0,p.jsxs)(F,{value:V,onChange:e=>ee(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priority"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"low",children:"Low"})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(k,{children:"Category"}),(0,p.jsxs)(F,{value:re,onChange:e=>te(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Categories"}),(0,p.jsx)("option",{value:"schedule",children:"Schedule"}),(0,p.jsx)("option",{value:"inventory",children:"Inventory"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"menu",children:"Menu"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,p.jsxs)(S,{children:[ve.map(e=>(0,p.jsxs)(E,{onClick:()=>(e=>{le(e),ce(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,p.jsxs)(I,{children:[(0,p.jsxs)($,{children:[(0,p.jsx)(B,{children:e.ticketNumber}),(0,p.jsx)(z,{children:e.subject}),(0,p.jsxs)(R,{children:[(0,p.jsxs)("span",{children:["From: ",e.requesterName," (",e.requesterRole,")"]}),(0,p.jsx)(q,{children:e.restaurantName})]})]}),(0,p.jsxs)(_,{children:[(0,p.jsx)(N,{status:e.status,children:e.status}),(0,p.jsx)(O,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)(D,{children:e.description}),(0,p.jsxs)(P,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:"Created"}),(0,p.jsx)(H,{children:ke(e.createdAt)})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:"Category"}),(0,p.jsx)(H,{style:{textTransform:"capitalize"},children:e.category})]}),pe[String(e.id)]&&(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",pe[String(e.id)].total_comments,pe[String(e.id)].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[pe[String(e.id)].unread_count," new"]})]})]})]},e.id)),0===ve.length&&(0,p.jsxs)(M,{children:[(0,p.jsx)("h3",{children:"No operation inquiries"}),(0,p.jsx)("p",{children:"Operation inquiries from your restaurants will appear here. You can also create new inquiries."})]})]}),oe&&(0,p.jsx)(c.mH,{onClick:()=>se(!1),children:(0,p.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:"Create Operation Inquiry"}),(0,p.jsx)(c.Jn,{onClick:()=>se(!1),children:"\xd7"})]}),(0,p.jsxs)(c.cw,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Restaurant *"}),(0,p.jsxs)(c.FX,{value:ue.restaurantId,onChange:e=>he({...ue,restaurantId:e.target.value}),required:!0,children:[(0,p.jsx)("option",{value:"",children:"Select Restaurant"}),n.map(e=>(0,p.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Subject *"}),(0,p.jsx)(c.ZQ,{type:"text",value:ue.subject,onChange:e=>he({...ue,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Description *"}),(0,p.jsx)(c.Lz,{value:ue.description,onChange:e=>he({...ue,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Attachments"}),(0,p.jsx)(l.A,{files:ge,onChange:je,maxFiles:5})]}),(0,p.jsxs)(c.fh,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Priority"}),(0,p.jsxs)(c.FX,{value:ue.priority,onChange:e=>he({...ue,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"low",children:"Low"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Category"}),(0,p.jsxs)(c.FX,{value:ue.category,onChange:e=>he({...ue,category:e.target.value}),children:[(0,p.jsx)("option",{value:"schedule",children:"Schedule"}),(0,p.jsx)("option",{value:"inventory",children:"Inventory"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"menu",children:"Menu"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,p.jsxs)(c.jl,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(!ue.restaurantId||!ue.subject.trim()||!ue.description.trim())return;const r=n.find(e=>e.id===parseInt(ue.restaurantId));try{const t=localStorage.getItem("auth_token"),n={restaurantId:parseInt(ue.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:ue.subject,description:ue.description,priority:ue.priority,category:ue.category,inquiryType:"owner",managerId:null===e||void 0===e?void 0:e.id,managerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner",attachments:ge.length>0?ge:void 0};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(n)})).ok&&(ye(),se(!1),he({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),je([]))}catch(t){console.error("Error creating ticket:",t)}},disabled:!ue.restaurantId||!ue.subject.trim()||!ue.description.trim(),children:"Submit Inquiry"})]})]})}),ae&&(0,p.jsx)(c.mH,{onClick:()=>le(null),children:(0,p.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:ae.ticketNumber}),(0,p.jsx)(c.Jn,{onClick:()=>le(null),children:"\xd7"})]}),(0,p.jsxs)(c.cw,{children:[(0,p.jsxs)(J,{children:[(0,p.jsxs)(U,{children:[(0,p.jsx)(X,{children:"Subject:"}),(0,p.jsx)(Y,{children:ae.subject})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(X,{children:"Restaurant:"}),(0,p.jsx)(Y,{children:ae.restaurantName})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(X,{children:"From:"}),(0,p.jsxs)(Y,{children:[ae.requesterName," (",ae.requesterRole,")"]})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(X,{children:"Priority:"}),(0,p.jsx)(Y,{children:(0,p.jsx)(O,{priority:ae.priority,children:ae.priority})})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(X,{children:"Category:"}),(0,p.jsx)(Y,{style:{textTransform:"capitalize"},children:ae.category})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(X,{children:"Created:"}),(0,p.jsx)(Y,{children:ke(ae.createdAt)})]})]}),(0,p.jsx)(c.lR,{children:"Description"}),(0,p.jsx)(Q,{children:ae.description}),(null===ae||void 0===ae?void 0:ae.attachments)&&ae.attachments.length>0&&(0,p.jsx)(d.A,{attachments:ae.attachments}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Status"}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,p.jsxs)(c.FX,{value:de,onChange:e=>ce(e.target.value),style:{flex:1},children:[(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]}),de!==ae.status&&(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(ae&&de!==ae.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${ae.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:de})});if(r.ok){const e=await r.json(),n=e.data||e;t(e=>e.map(e=>e.id===ae.id?{...e,...n}:e)),le(e=>e?{...e,...n}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,p.jsx)(a.A,{entityType:"operation_ticket",entityId:String(ae.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>xe(e=>{const r={...e},t=String(ae.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})})]})]})})}}}]);