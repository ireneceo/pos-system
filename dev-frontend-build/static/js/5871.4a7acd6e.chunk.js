"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2653:(e,t,i)=>{i.d(t,{M:()=>n});var r=i(9950),s=i(4492);function n(e){const[t,i]=(0,s.ok)(),n=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[a,o]=(0,r.useState)(n());return[a,(0,r.useCallback)(e=>{o(e),i({tab:e})},[i])]}},5871:(e,t,i)=>{i.r(t),i.d(t,{default:()=>Y});var r=i(9950),s=i(4752),n=i(2597),a=i(2653),o=i(2488),d=i(4302),l=i(7455),c=i(4185),u=i(8409),p=i(1367),x=i(9955),h=i(3832),m=i(5665),g=i(4414);const y=s.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,j=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,f=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,b=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,v=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=s.Ay.div`
  flex: 1;
`,C=s.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`,I=s.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,k=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,A=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,q=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"closed":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"closed":return"#059669";default:return"#6B7280"}}};
`,F=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,P=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
`,E=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,B=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,S=s.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,z=s.Ay.span`
  color: #374151;
`,T=s.Ay.button`
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
`,$=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,D=s.Ay.div`
  margin-bottom: 20px;
`,N=s.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,_=s.Ay.input`
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
`,L=s.Ay.select`
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
`,O=s.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,R=(0,s.Ay)(_)`
  width: 100%;
`,U=s.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`,M=s.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,W=s.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,J=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,H=s.Ay.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 14px;
  color: #059669;

  strong {
    margin-left: 4px;
    color: #047857;
  }
`,Y=()=>{const{t:e}=useTranslation("admin"),{user:t}=(0,p.As)(),[i,s]=(0,r.useState)([]),[Y,G]=(0,a.M)("active"),[K,Q]=(0,r.useState)(""),[V,X]=(0,r.useState)("all"),[Z,ee]=(0,r.useState)("all"),[te,ie]=(0,r.useState)("all"),[re,se]=(0,r.useState)(!1),[ne,ae]=(0,r.useState)(!1),[oe,de]=(0,r.useState)(null),[le,ce]=(0,r.useState)(""),[ue,pe]=(0,r.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[xe,he]=(0,r.useState)([]),[me,ge]=(0,r.useState)({}),[ye,je]=(0,r.useState)([]),[fe,be]=(0,r.useState)(""),[ve,we]=(0,r.useState)([]),[Ce,Ie]=(0,r.useState)(!1),[ke,Ae]=(0,r.useState)(null);(0,r.useEffect)(()=>{const e=async()=>{try{const e=(0,x.c4)(),t=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.data||e;s(i),(async e=>{if(0!==e.length)try{const t=(0,x.c4)(),i=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${i}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ge(t)}}}catch(t){console.error("Error fetching unread counts:",t)}})(i)}}catch(e){}};e(),(async()=>{try{const e=(0,x.c4)(),t=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.data||e;je(i)}}catch(e){}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const qe=i.filter(e=>{const t=e.subject.toLowerCase().includes(K.toLowerCase())||e.customerName.toLowerCase().includes(K.toLowerCase())||e.ticketNumber.toLowerCase().includes(K.toLowerCase()),i="active"===Y?"open"===e.status||"in-progress"===e.status:"closed"===e.status||"resolved"===e.status,r="all"===V||e.status===V,s="all"===Z||e.priority===Z,n="all"===te||e.category===te;return t&&i&&r&&s&&n}),Fe=i.length,Pe=i.filter(e=>"open"===e.status).length,Ee=i.filter(e=>"in-progress"===e.status).length,Be=i.filter(e=>"closed"===e.status).length,Se=e=>new Date(e).toLocaleString("en-MY");return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(h.mc,{children:[(0,g.jsxs)(h.Y9,{children:[(0,g.jsx)(h.hE,{children:e("admin:systemInquiryPage.systemInquiry")}),(0,g.jsxs)(h.ex,{children:[(0,g.jsx)(h.$n,{variant:"secondary",onClick:()=>{const e=qe.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),i=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(i),s=document.createElement("a");s.href=r,s.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)},children:e("admin:systemInquiryPage.export")}),(0,g.jsx)(h.$n,{variant:"primary",onClick:()=>{se(!0)},children:e("admin:systemInquiryPage.createInquiry")})]})]}),(0,g.jsxs)(h.UC,{children:[(0,g.jsxs)(m.MD,{children:[(0,g.jsxs)(m.hI,{color:"#059669",children:[(0,g.jsx)(m.Os,{children:Fe}),(0,g.jsx)(m.v0,{children:e("admin:systemInquiryPage.totalTickets")}),(0,g.jsx)(m.d1,{children:e("admin:systemInquiryPage.allSupportRequests")})]}),(0,g.jsxs)(m.hI,{color:"#D97706",children:[(0,g.jsx)(m.Os,{children:Pe}),(0,g.jsx)(m.v0,{children:e("admin:systemInquiryPage.openTickets")}),(0,g.jsx)(m.d1,{children:e("admin:systemInquiryPage.awaitingResponse")})]}),(0,g.jsxs)(m.hI,{color:"#2563EB",children:[(0,g.jsx)(m.Os,{children:Ee}),(0,g.jsx)(m.v0,{children:e("admin:systemInquiryPage.inProgress")}),(0,g.jsx)(m.d1,{children:e("admin:systemInquiryPage.currentlyBeingHandled")})]}),(0,g.jsxs)(m.hI,{color:"#7C3AED",children:[(0,g.jsx)(m.Os,{children:Be}),(0,g.jsx)(m.v0,{children:e("admin:systemInquiryPage.closed")}),(0,g.jsxs)(m.d1,{children:[Fe>0?Math.round(Be/Fe*100):0,"% completion rate"]})]})]}),(0,g.jsxs)(n.tU,{children:[(0,g.jsxs)(n.oz,{active:"active"===Y,onClick:()=>G("active"),children:["Active Tickets (",Pe+Ee,")"]}),(0,g.jsxs)(n.oz,{active:"closed"===Y,onClick:()=>G("closed"),children:["Closed Tickets (",Be,")"]})]}),(0,g.jsxs)(y,{children:[(0,g.jsx)(j,{children:(0,g.jsxs)(o.Jt,{value:Z,onChange:e=>ee(e.target.value),style:{maxWidth:"180px"},children:[(0,g.jsx)("option",{value:"all",children:e("admin:systemInquiryPage.allPriority")}),(0,g.jsx)("option",{value:"urgent",children:e("admin:systemInquiryPage.urgent")}),(0,g.jsx)("option",{value:"high",children:e("admin:systemInquiryPage.high")}),(0,g.jsx)("option",{value:"medium",children:e("admin:systemInquiryPage.medium")}),(0,g.jsx)("option",{value:"low",children:e("admin:systemInquiryPage.low")})]})}),(0,g.jsx)(j,{children:(0,g.jsxs)(o.Jt,{value:te,onChange:e=>ie(e.target.value),style:{maxWidth:"180px"},children:[(0,g.jsx)("option",{value:"all",children:e("admin:systemInquiryPage.allCategories")}),(0,g.jsx)("option",{value:"technical",children:e("admin:systemInquiryPage.technical")}),(0,g.jsx)("option",{value:"billing",children:e("admin:systemInquiryPage.billing")}),(0,g.jsx)("option",{value:"feature-request",children:e("admin:systemInquiryPage.featureRequest")}),(0,g.jsx)("option",{value:"bug-report",children:e("admin:systemInquiryPage.bugReport")}),(0,g.jsx)("option",{value:"general",children:e("admin:systemInquiryPage.general")})]})}),(0,g.jsx)(j,{children:(0,g.jsx)(o.DO,{placeholder:"Search tickets...",value:K,onChange:e=>Q(e.target.value)})})]}),(0,g.jsxs)(f,{children:[qe.map(t=>(0,g.jsxs)(b,{onClick:()=>(e=>{de(e),ce(e.status),ae(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(t),children:[(0,g.jsxs)(v,{children:[(0,g.jsxs)(w,{children:[(0,g.jsx)(C,{children:t.ticketNumber}),(0,g.jsx)(I,{children:t.subject}),(0,g.jsxs)(k,{children:[t.customerName," \u2022 ",t.customerEmail]})]}),(0,g.jsxs)(A,{children:[(0,g.jsx)(q,{status:t.status,children:t.status}),(0,g.jsx)(F,{priority:t.priority,children:t.priority})]})]}),(0,g.jsx)(P,{children:t.description}),(0,g.jsxs)(E,{children:[(0,g.jsxs)(B,{children:[(0,g.jsx)(S,{children:e("admin:systemInquiryPage.created")}),(0,g.jsx)(z,{children:Se(t.createdAt)})]}),(0,g.jsxs)(B,{children:[(0,g.jsx)(S,{children:e("admin:systemInquiryPage.category")}),(0,g.jsx)(z,{style:{textTransform:"capitalize"},children:t.category.replace("-"," ")})]}),me[t.id]&&(0,g.jsx)(B,{children:(0,g.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",me[t.id].total_comments,me[t.id].unread_count>0&&(0,g.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[me[t.id].unread_count," new"]})]})}),"active"===Y&&(0,g.jsx)(B,{style:{marginLeft:"auto"},children:(0,g.jsx)(T,{onClick:e=>{e.stopPropagation(),(async()=>{try{const e=(0,x.c4)();(await fetch(`/api/support-tickets/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"closed"})})).ok&&(s(e=>e.map(e=>e.id===t.id?{...e,status:"closed"}:e)),window.dispatchEvent(new Event("refreshBadgeCounts")))}catch(e){}})()},children:"Close"})})]})]},t.id)),0===qe.length&&(0,g.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,g.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:e("admin:systemInquiryPage.noTicketsYet")}),(0,g.jsx)("p",{children:e("admin:systemInquiryPage.noSupportTicketsHaveBeenSubmitted")})]})]}),re&&(0,g.jsxs)(u.aF,{isOpen:!0,onClose:()=>se(!1),title:"Create System Inquiry",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(h.$n,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,g.jsx)(h.$n,{variant:"primary",onClick:async()=>{if(ke){try{const e={customerId:ue.customerId,subject:ue.subject,description:ue.description,status:"open",priority:ue.priority,category:ue.category,attachments:xe.length>0?xe:void 0},t=(0,x.c4)(),r=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(!r.ok)return;{const e=await r.json(),t=e.data||e;s([t,...i])}}catch(e){return}se(!1),pe({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),he([]),Ae(null),be(""),we([])}},disabled:!ue.subject||!ue.description||!ke,children:"Create Inquiry"})]}),children:[(0,g.jsxs)(D,{style:{position:"relative"},children:[(0,g.jsx)(N,{children:"Select User *"}),(0,g.jsx)(R,{type:"text",value:fe,onChange:e=>(e=>{if(be(e),Ie(!0),e.length<1){const e=ye.slice(0,10);return void we(e)}const t=ye.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase()));we(t.slice(0,10))})(e.target.value),onFocus:()=>{Ie(!0),0===fe.length&&we(ye.slice(0,10))},onBlur:()=>setTimeout(()=>Ie(!1),200),placeholder:"Search by name, username, or email..."}),Ce&&ve.length>0&&(0,g.jsx)(U,{children:ve.map(e=>(0,g.jsxs)(M,{onClick:()=>(e=>{Ae(e),be(e.full_name||e.username),Ie(!1),pe(t=>({...t,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,g.jsx)(W,{children:e.full_name||e.username}),(0,g.jsxs)(J,{children:[e.email," \u2022 ",e.role]})]},e.id))}),ke&&(0,g.jsxs)(H,{children:["\u2713 Selected: ",(0,g.jsx)("strong",{children:ke.full_name||ke.username})," (",ke.email,")"]})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(N,{children:"Subject *"}),(0,g.jsx)(_,{type:"text",value:ue.subject,onChange:e=>pe({...ue,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(N,{children:"Description *"}),(0,g.jsx)(O,{value:ue.description,onChange:e=>pe({...ue,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.attachments")}),(0,g.jsx)(l.A,{files:xe,onChange:he,maxFiles:5})]}),(0,g.jsxs)($,{children:[(0,g.jsxs)(D,{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.priority")}),(0,g.jsxs)(L,{value:ue.priority,onChange:e=>pe({...ue,priority:e.target.value}),children:[(0,g.jsx)("option",{value:"low",children:e("admin:systemInquiryPage.low")}),(0,g.jsx)("option",{value:"medium",children:e("admin:systemInquiryPage.medium")}),(0,g.jsx)("option",{value:"high",children:e("admin:systemInquiryPage.high")}),(0,g.jsx)("option",{value:"urgent",children:e("admin:systemInquiryPage.urgent")})]})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.category")}),(0,g.jsxs)(L,{value:ue.category,onChange:e=>pe({...ue,category:e.target.value}),children:[(0,g.jsx)("option",{value:"general",children:e("admin:systemInquiryPage.general")}),(0,g.jsx)("option",{value:"technical",children:e("admin:systemInquiryPage.technical")}),(0,g.jsx)("option",{value:"billing",children:e("admin:systemInquiryPage.billing")}),(0,g.jsx)("option",{value:"feature-request",children:e("admin:systemInquiryPage.featureRequest")}),(0,g.jsx)("option",{value:"bug-report",children:e("admin:systemInquiryPage.bugReport")})]})]})]})]}),ne&&oe&&(0,g.jsxs)(u.aF,{isOpen:!0,onClose:()=>ae(!1),title:"Inquiry Details",footer:(0,g.jsx)(h.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Close"}),children:[(0,g.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.ticketNumber")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:oe.ticketNumber})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.status")}),(0,g.jsxs)(L,{value:le,onChange:e=>(async e=>{if(oe){ce(e);try{const t=(0,x.c4)();(await fetch(`/api/support-tickets/${oe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})})).ok&&(s(t=>t.map(t=>t.id===oe.id?{...t,status:e}:t)),de(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,g.jsx)("option",{value:"open",children:e("admin:systemInquiryPage.open")}),(0,g.jsx)("option",{value:"in-progress",children:e("admin:systemInquiryPage.inProgress")}),(0,g.jsx)("option",{value:"closed",children:e("admin:systemInquiryPage.closed")})]})]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.priority")}),(0,g.jsx)("div",{style:{padding:"8px 0"},children:(0,g.jsx)(F,{priority:oe.priority,children:oe.priority})})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.category")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:oe.category.replace("-"," ")})]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.customerInformation")}),(0,g.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,g.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:oe.customerName}),(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:oe.customerEmail})]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.subject")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:oe.subject})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.description")}),(0,g.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:oe.description})]}),(null===oe||void 0===oe?void 0:oe.attachments)&&oe.attachments.length>0&&(0,g.jsx)(c.A,{attachments:oe.attachments}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.createdAt")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Se(oe.createdAt)})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(N,{children:e("admin:systemInquiryPage.lastUpdated")}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Se(oe.updatedAt)})]})]})]}),(0,g.jsx)(d.A,{entityType:"support_ticket",entityId:oe.id,currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>ge(e=>{const t={...e};return t[oe.id]&&(t[oe.id]={...t[oe.id],unread_count:0}),t})})]})]})]})})}}}]);