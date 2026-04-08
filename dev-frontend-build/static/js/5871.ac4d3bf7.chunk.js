"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2653:(e,t,i)=>{i.d(t,{M:()=>n});var r=i(9950),s=i(4492);function n(e){const[t,i]=(0,s.ok)(),n=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[a,o]=(0,r.useState)(n());return[a,(0,r.useCallback)(e=>{o(e),i({tab:e})},[i])]}},5871:(e,t,i)=>{i.r(t),i.d(t,{default:()=>H});var r=i(9950),s=i(4752),n=i(2597),a=i(2653),o=i(2488),d=i(4302),l=i(7455),c=i(4185),u=i(8409),p=i(1367),x=i(3832),h=i(5665),m=i(4414);const g=s.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,y=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,j=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,f=s.Ay.div`
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
`,b=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,v=s.Ay.div`
  flex: 1;
`,w=s.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`,C=s.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,I=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,k=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,A=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"closed":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"closed":return"#059669";default:return"#6B7280"}}};
`,q=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,F=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
`,P=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,E=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,S=s.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,B=s.Ay.span`
  color: #374151;
`,z=s.Ay.button`
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
`,_=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,T=s.Ay.div`
  margin-bottom: 20px;
`,$=s.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,D=s.Ay.input`
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
`,N=s.Ay.select`
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
`,L=s.Ay.textarea`
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
`,O=(0,s.Ay)(D)`
  width: 100%;
`,R=s.Ay.div`
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
`,U=s.Ay.div`
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
`,M=s.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,W=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,J=s.Ay.div`
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
`,H=()=>{const{t:e}=useTranslation("admin"),{user:t}=(0,p.As)(),[i,s]=(0,r.useState)([]),[H,Y]=(0,a.M)("active"),[G,K]=(0,r.useState)(""),[Q,V]=(0,r.useState)("all"),[X,Z]=(0,r.useState)("all"),[ee,te]=(0,r.useState)("all"),[ie,re]=(0,r.useState)(!1),[se,ne]=(0,r.useState)(!1),[ae,oe]=(0,r.useState)(null),[de,le]=(0,r.useState)(""),[ce,ue]=(0,r.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[pe,xe]=(0,r.useState)([]),[he,me]=(0,r.useState)({}),[ge,ye]=(0,r.useState)([]),[je,fe]=(0,r.useState)(""),[be,ve]=(0,r.useState)([]),[we,Ce]=(0,r.useState)(!1),[Ie,ke]=(0,r.useState)(null);(0,r.useEffect)(()=>{const e=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.data||e;s(i),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),i=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${i}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),me(t)}}}catch(t){console.error("Error fetching unread counts:",t)}})(i)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.data||e;ye(i)}}catch(e){}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const Ae=i.filter(e=>{const t=e.subject.toLowerCase().includes(G.toLowerCase())||e.customerName.toLowerCase().includes(G.toLowerCase())||e.ticketNumber.toLowerCase().includes(G.toLowerCase()),i="active"===H?"open"===e.status||"in-progress"===e.status:"closed"===e.status||"resolved"===e.status,r="all"===Q||e.status===Q,s="all"===X||e.priority===X,n="all"===ee||e.category===ee;return t&&i&&r&&s&&n}),qe=i.length,Fe=i.filter(e=>"open"===e.status).length,Pe=i.filter(e=>"in-progress"===e.status).length,Ee=i.filter(e=>"closed"===e.status).length,Se=e=>new Date(e).toLocaleString("en-MY");return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(x.mc,{children:[(0,m.jsxs)(x.Y9,{children:[(0,m.jsx)(x.hE,{children:e("admin:systemInquiryPage.systemInquiry")}),(0,m.jsxs)(x.ex,{children:[(0,m.jsx)(x.$n,{variant:"secondary",onClick:()=>{const e=Ae.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),i=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(i),s=document.createElement("a");s.href=r,s.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)},children:e("admin:systemInquiryPage.export")}),(0,m.jsx)(x.$n,{variant:"primary",onClick:()=>{re(!0)},children:e("admin:systemInquiryPage.createInquiry")})]})]}),(0,m.jsxs)(x.UC,{children:[(0,m.jsxs)(h.MD,{children:[(0,m.jsxs)(h.hI,{color:"#059669",children:[(0,m.jsx)(h.Os,{children:qe}),(0,m.jsx)(h.v0,{children:e("admin:systemInquiryPage.totalTickets")}),(0,m.jsx)(h.d1,{children:e("admin:systemInquiryPage.allSupportRequests")})]}),(0,m.jsxs)(h.hI,{color:"#D97706",children:[(0,m.jsx)(h.Os,{children:Fe}),(0,m.jsx)(h.v0,{children:e("admin:systemInquiryPage.openTickets")}),(0,m.jsx)(h.d1,{children:e("admin:systemInquiryPage.awaitingResponse")})]}),(0,m.jsxs)(h.hI,{color:"#2563EB",children:[(0,m.jsx)(h.Os,{children:Pe}),(0,m.jsx)(h.v0,{children:e("admin:systemInquiryPage.inProgress")}),(0,m.jsx)(h.d1,{children:e("admin:systemInquiryPage.currentlyBeingHandled")})]}),(0,m.jsxs)(h.hI,{color:"#7C3AED",children:[(0,m.jsx)(h.Os,{children:Ee}),(0,m.jsx)(h.v0,{children:e("admin:systemInquiryPage.closed")}),(0,m.jsxs)(h.d1,{children:[qe>0?Math.round(Ee/qe*100):0,"% completion rate"]})]})]}),(0,m.jsxs)(n.tU,{children:[(0,m.jsxs)(n.oz,{active:"active"===H,onClick:()=>Y("active"),children:["Active Tickets (",Fe+Pe,")"]}),(0,m.jsxs)(n.oz,{active:"closed"===H,onClick:()=>Y("closed"),children:["Closed Tickets (",Ee,")"]})]}),(0,m.jsxs)(g,{children:[(0,m.jsx)(y,{children:(0,m.jsxs)(o.Jt,{value:X,onChange:e=>Z(e.target.value),style:{maxWidth:"180px"},children:[(0,m.jsx)("option",{value:"all",children:e("admin:systemInquiryPage.allPriority")}),(0,m.jsx)("option",{value:"urgent",children:e("admin:systemInquiryPage.urgent")}),(0,m.jsx)("option",{value:"high",children:e("admin:systemInquiryPage.high")}),(0,m.jsx)("option",{value:"medium",children:e("admin:systemInquiryPage.medium")}),(0,m.jsx)("option",{value:"low",children:e("admin:systemInquiryPage.low")})]})}),(0,m.jsx)(y,{children:(0,m.jsxs)(o.Jt,{value:ee,onChange:e=>te(e.target.value),style:{maxWidth:"180px"},children:[(0,m.jsx)("option",{value:"all",children:e("admin:systemInquiryPage.allCategories")}),(0,m.jsx)("option",{value:"technical",children:e("admin:systemInquiryPage.technical")}),(0,m.jsx)("option",{value:"billing",children:e("admin:systemInquiryPage.billing")}),(0,m.jsx)("option",{value:"feature-request",children:e("admin:systemInquiryPage.featureRequest")}),(0,m.jsx)("option",{value:"bug-report",children:e("admin:systemInquiryPage.bugReport")}),(0,m.jsx)("option",{value:"general",children:e("admin:systemInquiryPage.general")})]})}),(0,m.jsx)(y,{children:(0,m.jsx)(o.DO,{placeholder:"Search tickets...",value:G,onChange:e=>K(e.target.value)})})]}),(0,m.jsxs)(j,{children:[Ae.map(t=>(0,m.jsxs)(f,{onClick:()=>(e=>{oe(e),le(e.status),ne(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(t),children:[(0,m.jsxs)(b,{children:[(0,m.jsxs)(v,{children:[(0,m.jsx)(w,{children:t.ticketNumber}),(0,m.jsx)(C,{children:t.subject}),(0,m.jsxs)(I,{children:[t.customerName," \u2022 ",t.customerEmail]})]}),(0,m.jsxs)(k,{children:[(0,m.jsx)(A,{status:t.status,children:t.status}),(0,m.jsx)(q,{priority:t.priority,children:t.priority})]})]}),(0,m.jsx)(F,{children:t.description}),(0,m.jsxs)(P,{children:[(0,m.jsxs)(E,{children:[(0,m.jsx)(S,{children:e("admin:systemInquiryPage.created")}),(0,m.jsx)(B,{children:Se(t.createdAt)})]}),(0,m.jsxs)(E,{children:[(0,m.jsx)(S,{children:e("admin:systemInquiryPage.category")}),(0,m.jsx)(B,{style:{textTransform:"capitalize"},children:t.category.replace("-"," ")})]}),he[t.id]&&(0,m.jsx)(E,{children:(0,m.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",he[t.id].total_comments,he[t.id].unread_count>0&&(0,m.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[he[t.id].unread_count," new"]})]})}),"active"===H&&(0,m.jsx)(E,{style:{marginLeft:"auto"},children:(0,m.jsx)(z,{onClick:e=>{e.stopPropagation(),(async()=>{try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"closed"})})).ok&&(s(e=>e.map(e=>e.id===t.id?{...e,status:"closed"}:e)),window.dispatchEvent(new Event("refreshBadgeCounts")))}catch(e){}})()},children:"Close"})})]})]},t.id)),0===Ae.length&&(0,m.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,m.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:e("admin:systemInquiryPage.noTicketsYet")}),(0,m.jsx)("p",{children:e("admin:systemInquiryPage.noSupportTicketsHaveBeenSubmitted")})]})]}),ie&&(0,m.jsxs)(u.aF,{isOpen:!0,onClose:()=>re(!1),title:"Create System Inquiry",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(x.$n,{variant:"secondary",onClick:()=>re(!1),children:"Cancel"}),(0,m.jsx)(x.$n,{variant:"primary",onClick:async()=>{if(Ie){try{const e={customerId:ce.customerId,subject:ce.subject,description:ce.description,status:"open",priority:ce.priority,category:ce.category,attachments:pe.length>0?pe:void 0},t=localStorage.getItem("auth_token"),r=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(!r.ok)return;{const e=await r.json(),t=e.data||e;s([t,...i])}}catch(e){return}re(!1),ue({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),xe([]),ke(null),fe(""),ve([])}},disabled:!ce.subject||!ce.description||!Ie,children:"Create Inquiry"})]}),children:[(0,m.jsxs)(T,{style:{position:"relative"},children:[(0,m.jsx)($,{children:"Select User *"}),(0,m.jsx)(O,{type:"text",value:je,onChange:e=>(e=>{if(fe(e),Ce(!0),e.length<1){const e=ge.slice(0,10);return void ve(e)}const t=ge.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase()));ve(t.slice(0,10))})(e.target.value),onFocus:()=>{Ce(!0),0===je.length&&ve(ge.slice(0,10))},onBlur:()=>setTimeout(()=>Ce(!1),200),placeholder:"Search by name, username, or email..."}),we&&be.length>0&&(0,m.jsx)(R,{children:be.map(e=>(0,m.jsxs)(U,{onClick:()=>(e=>{ke(e),fe(e.full_name||e.username),Ce(!1),ue(t=>({...t,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,m.jsx)(M,{children:e.full_name||e.username}),(0,m.jsxs)(W,{children:[e.email," \u2022 ",e.role]})]},e.id))}),Ie&&(0,m.jsxs)(J,{children:["\u2713 Selected: ",(0,m.jsx)("strong",{children:Ie.full_name||Ie.username})," (",Ie.email,")"]})]}),(0,m.jsxs)(T,{children:[(0,m.jsx)($,{children:"Subject *"}),(0,m.jsx)(D,{type:"text",value:ce.subject,onChange:e=>ue({...ce,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,m.jsxs)(T,{children:[(0,m.jsx)($,{children:"Description *"}),(0,m.jsx)(L,{value:ce.description,onChange:e=>ue({...ce,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.attachments")}),(0,m.jsx)(l.A,{files:pe,onChange:xe,maxFiles:5})]}),(0,m.jsxs)(_,{children:[(0,m.jsxs)(T,{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.priority")}),(0,m.jsxs)(N,{value:ce.priority,onChange:e=>ue({...ce,priority:e.target.value}),children:[(0,m.jsx)("option",{value:"low",children:e("admin:systemInquiryPage.low")}),(0,m.jsx)("option",{value:"medium",children:e("admin:systemInquiryPage.medium")}),(0,m.jsx)("option",{value:"high",children:e("admin:systemInquiryPage.high")}),(0,m.jsx)("option",{value:"urgent",children:e("admin:systemInquiryPage.urgent")})]})]}),(0,m.jsxs)(T,{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.category")}),(0,m.jsxs)(N,{value:ce.category,onChange:e=>ue({...ce,category:e.target.value}),children:[(0,m.jsx)("option",{value:"general",children:e("admin:systemInquiryPage.general")}),(0,m.jsx)("option",{value:"technical",children:e("admin:systemInquiryPage.technical")}),(0,m.jsx)("option",{value:"billing",children:e("admin:systemInquiryPage.billing")}),(0,m.jsx)("option",{value:"feature-request",children:e("admin:systemInquiryPage.featureRequest")}),(0,m.jsx)("option",{value:"bug-report",children:e("admin:systemInquiryPage.bugReport")})]})]})]})]}),se&&ae&&(0,m.jsxs)(u.aF,{isOpen:!0,onClose:()=>ne(!1),title:"Inquiry Details",footer:(0,m.jsx)(x.$n,{variant:"secondary",onClick:()=>ne(!1),children:"Close"}),children:[(0,m.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.ticketNumber")}),(0,m.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ae.ticketNumber})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.status")}),(0,m.jsxs)(N,{value:de,onChange:e=>(async e=>{if(ae){le(e);try{const t=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${ae.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})})).ok&&(s(t=>t.map(t=>t.id===ae.id?{...t,status:e}:t)),oe(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,m.jsx)("option",{value:"open",children:e("admin:systemInquiryPage.open")}),(0,m.jsx)("option",{value:"in-progress",children:e("admin:systemInquiryPage.inProgress")}),(0,m.jsx)("option",{value:"closed",children:e("admin:systemInquiryPage.closed")})]})]})]}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.priority")}),(0,m.jsx)("div",{style:{padding:"8px 0"},children:(0,m.jsx)(q,{priority:ae.priority,children:ae.priority})})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.category")}),(0,m.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ae.category.replace("-"," ")})]})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.customerInformation")}),(0,m.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,m.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:ae.customerName}),(0,m.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:ae.customerEmail})]})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.subject")}),(0,m.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ae.subject})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.description")}),(0,m.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ae.description})]}),(null===ae||void 0===ae?void 0:ae.attachments)&&ae.attachments.length>0&&(0,m.jsx)(c.A,{attachments:ae.attachments}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.createdAt")}),(0,m.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Se(ae.createdAt)})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)($,{children:e("admin:systemInquiryPage.lastUpdated")}),(0,m.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Se(ae.updatedAt)})]})]})]}),(0,m.jsx)(d.A,{entityType:"support_ticket",entityId:ae.id,currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>me(e=>{const t={...e};return t[ae.id]&&(t[ae.id]={...t[ae.id],unread_count:0}),t})})]})]})]})})}}}]);