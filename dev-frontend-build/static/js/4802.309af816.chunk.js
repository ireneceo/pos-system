"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4802],{4802:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ee});var i=t(9950),n=t(4752),o=t(2853),a=t(8409),s=t(1367),l=t(4302),d=t(7455),c=t(4185),p=t(4414);const x=n.Ay.div`
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
`,F=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,A=n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,k=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,C=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,E=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,S=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
`,B=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,z=n.Ay.div`
  flex: 1;
  min-width: 0;
`,I=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,q=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,_=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,N=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,O=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,R=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,$=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,D=n.Ay.div`
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
`,P=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,T=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,L=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,M=n.Ay.span`
  color: #374151;
`,U=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,Y=n.Ay.div`
  margin-bottom: 20px;
`,H=n.Ay.label`
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
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,W=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,G=n.Ay.textarea`
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
`,K=n.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,Q=n.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,V=n.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,X=n.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,Z=n.Ay.div`
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
`,ee=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,i.useState)([]),[n,ee]=(0,i.useState)([]),[re,te]=(0,i.useState)(""),[ie,ne]=(0,i.useState)("all"),[oe,ae]=(0,i.useState)("all"),[se,le]=(0,i.useState)("all"),[de,ce]=(0,i.useState)("all"),[pe,xe]=(0,i.useState)(!1),[ue,he]=(0,i.useState)(null),[ge,je]=(0,i.useState)("open"),[me,fe]=(0,i.useState)({}),[ye,be]=(0,i.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),[ve,we]=(0,i.useState)([]);(0,i.useEffect)(()=>{e&&Fe()},[e]),(0,i.useEffect)(()=>{if(n.length>0){Ae();const e=setInterval(Ae,1e4);return()=>clearInterval(e)}},[n]);const Fe=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e;ee(t.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},Ae=async()=>{try{const r=localStorage.getItem("auth_token"),i=await fetch(`/api/operation-tickets?userId=${null===e||void 0===e?void 0:e.id}&userRole=Restaurant Owner`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json(),r=Array.isArray(e)?e:[];t(r),ke(r)}}catch(r){console.error("Error fetching operation tickets:",r)}},ke=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),fe(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},Ce=r.filter(e=>{const r=e.subject.toLowerCase().includes(re.toLowerCase())||e.ticketNumber.toLowerCase().includes(re.toLowerCase()),t="all"===ie||e.status===ie,i="all"===oe||e.priority===oe,n="all"===se||e.category===se,o="all"===de||String(e.restaurantId)===de;return r&&t&&i&&n&&o}),Ee=r.filter(e=>"open"===e.status).length,Se=r.filter(e=>"in-progress"===e.status).length,Be=r.filter(e=>"resolved"===e.status).length,ze=e=>new Date(e).toLocaleString("en-MY");return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:"Operation Inquiry"}),(0,p.jsx)(j,{children:(0,p.jsx)(m,{variant:"primary",onClick:()=>xe(!0),children:"New Inquiry"})})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(f,{children:[(0,p.jsxs)(y,{color:"#635BFF",children:[(0,p.jsx)(b,{children:r.length}),(0,p.jsx)(v,{children:"Total Inquiries"})]}),(0,p.jsxs)(y,{color:"#F59E0B",children:[(0,p.jsx)(b,{children:Ee}),(0,p.jsx)(v,{children:"Open"})]}),(0,p.jsxs)(y,{color:"#3B82F6",children:[(0,p.jsx)(b,{children:Se}),(0,p.jsx)(v,{children:"In Progress"})]}),(0,p.jsxs)(y,{color:"#10B981",children:[(0,p.jsx)(b,{children:Be}),(0,p.jsx)(v,{children:"Resolved"})]})]}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(A,{children:"Restaurant"}),(0,p.jsxs)(C,{value:de,onChange:e=>ce(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Restaurants"}),n.map(e=>(0,p.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(A,{children:"Status"}),(0,p.jsxs)(C,{value:ie,onChange:e=>ne(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(A,{children:"Priority"}),(0,p.jsxs)(C,{value:oe,onChange:e=>ae(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priority"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"low",children:"Low"})]})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(A,{children:"Category"}),(0,p.jsxs)(C,{value:se,onChange:e=>le(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Categories"}),(0,p.jsx)("option",{value:"schedule",children:"Schedule"}),(0,p.jsx)("option",{value:"inventory",children:"Inventory"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"menu",children:"Menu"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(A,{children:"Search"}),(0,p.jsx)(k,{placeholder:"Search inquiries...",value:re,onChange:e=>te(e.target.value)})]})]}),(0,p.jsxs)(E,{children:[Ce.map(e=>(0,p.jsxs)(S,{onClick:()=>(e=>{he(e),je(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,p.jsxs)(B,{children:[(0,p.jsxs)(z,{children:[(0,p.jsx)(I,{children:e.ticketNumber}),(0,p.jsx)(q,{children:e.subject}),(0,p.jsxs)(_,{children:[(0,p.jsxs)("span",{children:["From: ",e.requesterName," (",e.requesterRole,")"]}),(0,p.jsx)(N,{children:e.restaurantName})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(R,{status:e.status,children:e.status}),(0,p.jsx)($,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)(D,{children:e.description}),(0,p.jsxs)(P,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:"Created"}),(0,p.jsx)(M,{children:ze(e.createdAt)})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:"Category"}),(0,p.jsx)(M,{style:{textTransform:"capitalize"},children:e.category})]}),me[String(e.id)]&&(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",me[String(e.id)].total_comments,me[String(e.id)].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[me[String(e.id)].unread_count," new"]})]})]})]},e.id)),0===Ce.length&&(0,p.jsxs)(o.pp,{children:[(0,p.jsx)("h3",{children:"No operation inquiries"}),(0,p.jsx)("p",{children:"Operation inquiries from your restaurants will appear here. You can also create new inquiries."})]})]}),pe&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>xe(!1),title:"Create Operation Inquiry",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>xe(!1),children:"Cancel"}),(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(!ye.restaurantId||!ye.subject.trim()||!ye.description.trim())return;const r=n.find(e=>e.id===parseInt(ye.restaurantId));try{const t=localStorage.getItem("auth_token"),i={restaurantId:parseInt(ye.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:ye.subject,description:ye.description,priority:ye.priority,category:ye.category,inquiryType:"owner",managerId:null===e||void 0===e?void 0:e.id,managerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner",attachments:ve.length>0?ve:void 0};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(i)})).ok&&(Ae(),xe(!1),be({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),we([]))}catch(t){console.error("Error creating ticket:",t)}},disabled:!ye.restaurantId||!ye.subject.trim()||!ye.description.trim(),children:"Submit Inquiry"})]}),children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)(H,{children:"Restaurant *"}),(0,p.jsxs)(W,{value:ye.restaurantId,onChange:e=>be({...ye,restaurantId:e.target.value}),required:!0,children:[(0,p.jsx)("option",{value:"",children:"Select Restaurant"}),n.map(e=>(0,p.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(H,{children:"Subject *"}),(0,p.jsx)(J,{type:"text",value:ye.subject,onChange:e=>be({...ye,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(H,{children:"Description *"}),(0,p.jsx)(G,{value:ye.description,onChange:e=>be({...ye,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(H,{children:"Attachments"}),(0,p.jsx)(d.A,{files:ve,onChange:we,maxFiles:5})]}),(0,p.jsxs)(U,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)(H,{children:"Priority"}),(0,p.jsxs)(W,{value:ye.priority,onChange:e=>be({...ye,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"low",children:"Low"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(H,{children:"Category"}),(0,p.jsxs)(W,{value:ye.category,onChange:e=>be({...ye,category:e.target.value}),children:[(0,p.jsx)("option",{value:"schedule",children:"Schedule"}),(0,p.jsx)("option",{value:"inventory",children:"Inventory"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"menu",children:"Menu"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),ue&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>he(null),title:ue.ticketNumber,size:"large",footer:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(m,{variant:"secondary",onClick:()=>he(null),children:"Close"})}),children:[(0,p.jsxs)(K,{children:[(0,p.jsxs)(Q,{children:[(0,p.jsx)(V,{children:"Subject:"}),(0,p.jsx)(X,{children:ue.subject})]}),(0,p.jsxs)(Q,{children:[(0,p.jsx)(V,{children:"Restaurant:"}),(0,p.jsx)(X,{children:ue.restaurantName})]}),(0,p.jsxs)(Q,{children:[(0,p.jsx)(V,{children:"From:"}),(0,p.jsxs)(X,{children:[ue.requesterName," (",ue.requesterRole,")"]})]}),(0,p.jsxs)(Q,{children:[(0,p.jsx)(V,{children:"Priority:"}),(0,p.jsx)(X,{children:(0,p.jsx)($,{priority:ue.priority,children:ue.priority})})]}),(0,p.jsxs)(Q,{children:[(0,p.jsx)(V,{children:"Category:"}),(0,p.jsx)(X,{style:{textTransform:"capitalize"},children:ue.category})]}),(0,p.jsxs)(Q,{children:[(0,p.jsx)(V,{children:"Created:"}),(0,p.jsx)(X,{children:ze(ue.createdAt)})]})]}),(0,p.jsx)(H,{children:"Description"}),(0,p.jsx)(Z,{children:ue.description}),(null===ue||void 0===ue?void 0:ue.attachments)&&ue.attachments.length>0&&(0,p.jsx)(c.A,{attachments:ue.attachments}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(H,{children:"Status"}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,p.jsxs)(W,{value:ge,onChange:e=>je(e.target.value),style:{flex:1},children:[(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]}),ge!==ue.status&&(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(ue&&ge!==ue.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${ue.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ge})});if(r.ok){const e=await r.json(),i=e.data||e;t(e=>e.map(e=>e.id===ue.id?{...e,...i}:e)),he(e=>e?{...e,...i}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,p.jsx)(l.A,{entityType:"operation_ticket",entityId:String(ue.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>fe(e=>{const r={...e},t=String(ue.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})]})})}}}]);