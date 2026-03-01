"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2488:(e,t,r)=>{r.d(t,{DO:()=>c,Jt:()=>p,Qn:()=>d});var i=r(8819),s=(r(9950),r(4752)),n=r(4414);const o=s.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,a=s.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${i.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,l=s.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  &:disabled {
    background: ${i.w.colors.surfaceHover};
    color: ${i.w.colors.text.muted};
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,d=e=>{let{children:t,className:r,style:i,...s}=e;return(0,n.jsx)(o,{className:r,style:i,...s,children:t})},c=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(a,{placeholder:t,...r})},p=e=>{let{children:t,...r}=e;return(0,n.jsx)(l,{...r,children:t})}},5871:(e,t,r)=>{r.r(t),r.d(t,{default:()=>q});var i=r(8819),s=r(9950),n=r(4752),o=r(2488),a=r(4302),l=r(7455),d=r(4185),c=r(1367),p=r(2674),x=r(3832),u=r(5665),h=r(4414);const m=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,g=n.Ay.button`
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
`,j=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid ${i.w.colors.border};

  @media (max-width: 768px) {
    gap: 12px;
  }
`,y=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,f=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,w=n.Ay.div`
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
`,v=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,b=n.Ay.div`
  flex: 1;
`,C=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: ${i.w.colors.text.muted};
  margin-bottom: 6px;
`,k=n.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,A=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,F=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,E=n.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"closed":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"closed":return"#059669";default:return"#6B7280"}}};
`,S=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,$=n.Ay.div`
  font-size: 14px;
  color: ${i.w.colors.text.muted};
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: ${i.w.colors.surfaceHover};
  border-radius: 8px;
  border-left: 3px solid ${i.w.colors.border};
  word-break: break-word;
`,B=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid ${i.w.colors.surfaceMuted};
  font-size: 12px;
  color: ${i.w.colors.text.muted};
`,R=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,I=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,L=n.Ay.span`
  color: #374151;
`,z=(0,n.Ay)(p.ZQ)`
  width: 100%;
`,N=n.Ay.div`
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
`,T=n.Ay.div`
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
`,_=n.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,D=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,O=n.Ay.div`
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
`,q=()=>{const{user:e}=(0,c.As)(),[t,r]=(0,s.useState)([]),[i,n]=(0,s.useState)("open"),[q,P]=(0,s.useState)(""),[U,M]=(0,s.useState)("all"),[H,J]=(0,s.useState)("all"),[W,Q]=(0,s.useState)("all"),[G,X]=(0,s.useState)(!1),[Y,Z]=(0,s.useState)(!1),[K,V]=(0,s.useState)(null),[ee,te]=(0,s.useState)(""),[re,ie]=(0,s.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[se,ne]=(0,s.useState)([]),[oe,ae]=(0,s.useState)({}),[le,de]=(0,s.useState)([]),[ce,pe]=(0,s.useState)(""),[xe,ue]=(0,s.useState)([]),[he,me]=(0,s.useState)(!1),[ge,je]=(0,s.useState)(null);(0,s.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json(),i=t.data||t;r(i),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ae(t)}}}catch(t){console.error("Error fetching unread counts:",t)}})(i)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e;de(r)}}catch(e){}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const ye=t.filter(e=>{const t=e.subject.toLowerCase().includes(q.toLowerCase())||e.customerName.toLowerCase().includes(q.toLowerCase())||e.ticketNumber.toLowerCase().includes(q.toLowerCase()),r="all"===i||e.status===i,s="all"===U||e.status===U,n="all"===H||e.priority===H,o="all"===W||e.category===W;return t&&r&&s&&n&&o}),fe=t.length,we=t.filter(e=>"open"===e.status).length,ve=t.filter(e=>"in-progress"===e.status).length,be=t.filter(e=>"closed"===e.status).length,Ce=e=>new Date(e).toLocaleString("en-MY");return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(x.mc,{children:[(0,h.jsxs)(x.Y9,{children:[(0,h.jsx)(x.hE,{children:"System Inquiry"}),(0,h.jsxs)(x.ex,{children:[(0,h.jsx)(x.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json();r(t.data||t)}}catch(e){}},children:"Refresh"}),(0,h.jsx)(x.$n,{variant:"secondary",onClick:()=>{const e=ye.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(r),s=document.createElement("a");s.href=i,s.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)},children:"Export"}),(0,h.jsx)(x.$n,{variant:"primary",onClick:()=>{X(!0)},children:"Create Inquiry"})]})]}),(0,h.jsxs)(x.UC,{children:[(0,h.jsxs)(u.MD,{children:[(0,h.jsxs)(u.hI,{color:"#059669",children:[(0,h.jsx)(u.Os,{children:fe}),(0,h.jsx)(u.v0,{children:"Total Tickets"}),(0,h.jsx)(u.d1,{children:"All support requests"})]}),(0,h.jsxs)(u.hI,{color:"#D97706",children:[(0,h.jsx)(u.Os,{children:we}),(0,h.jsx)(u.v0,{children:"Open Tickets"}),(0,h.jsx)(u.d1,{children:"Awaiting response"})]}),(0,h.jsxs)(u.hI,{color:"#2563EB",children:[(0,h.jsx)(u.Os,{children:ve}),(0,h.jsx)(u.v0,{children:"In Progress"}),(0,h.jsx)(u.d1,{children:"Currently being handled"})]}),(0,h.jsxs)(u.hI,{color:"#7C3AED",children:[(0,h.jsx)(u.Os,{children:be}),(0,h.jsx)(u.v0,{children:"Closed"}),(0,h.jsxs)(u.d1,{children:[fe>0?Math.round(be/fe*100):0,"% completion rate"]})]})]}),(0,h.jsxs)(m,{children:[(0,h.jsx)(g,{active:"open"===i,onClick:()=>n("open"),children:"Open"}),(0,h.jsx)(g,{active:"in-progress"===i,onClick:()=>n("in-progress"),children:"In Progress"}),(0,h.jsx)(g,{active:"all"===i,onClick:()=>n("all"),children:"All Tickets"})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(y,{children:(0,h.jsx)(o.DO,{placeholder:"Search tickets...",value:q,onChange:e=>P(e.target.value)})}),"all"===i&&(0,h.jsx)(y,{children:(0,h.jsxs)(o.Jt,{value:U,onChange:e=>M(e.target.value),style:{maxWidth:"180px"},children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"open",children:"Open"}),(0,h.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,h.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,h.jsx)(y,{children:(0,h.jsxs)(o.Jt,{value:H,onChange:e=>J(e.target.value),style:{maxWidth:"180px"},children:[(0,h.jsx)("option",{value:"all",children:"All Priority"}),(0,h.jsx)("option",{value:"urgent",children:"Urgent"}),(0,h.jsx)("option",{value:"high",children:"High"}),(0,h.jsx)("option",{value:"medium",children:"Medium"}),(0,h.jsx)("option",{value:"low",children:"Low"})]})}),(0,h.jsx)(y,{children:(0,h.jsxs)(o.Jt,{value:W,onChange:e=>Q(e.target.value),style:{maxWidth:"180px"},children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),(0,h.jsx)("option",{value:"technical",children:"Technical"}),(0,h.jsx)("option",{value:"billing",children:"Billing"}),(0,h.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,h.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,h.jsx)("option",{value:"general",children:"General"})]})})]}),(0,h.jsx)(f,{children:ye.map(e=>(0,h.jsxs)(w,{onClick:()=>(e=>{V(e),te(e.status),Z(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,h.jsxs)(v,{children:[(0,h.jsxs)(b,{children:[(0,h.jsx)(C,{children:e.ticketNumber}),(0,h.jsx)(k,{children:e.subject}),(0,h.jsxs)(A,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(E,{status:e.status,children:e.status}),(0,h.jsx)(S,{priority:e.priority,children:e.priority})]})]}),(0,h.jsx)($,{children:e.description}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(R,{children:[(0,h.jsx)(I,{children:"Created"}),(0,h.jsx)(L,{children:Ce(e.createdAt)})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(I,{children:"Category"}),(0,h.jsx)(L,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),oe[e.id]&&(0,h.jsx)(R,{children:(0,h.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",oe[e.id].total_comments,oe[e.id].unread_count>0&&(0,h.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[oe[e.id].unread_count," new"]})]})})]})]},e.id))}),G&&(0,h.jsx)(p.mH,{onClick:()=>X(!1),children:(0,h.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(p.rQ,{children:[(0,h.jsx)(p.wt,{children:"Create System Inquiry"}),(0,h.jsx)(p.Jn,{onClick:()=>X(!1),children:"\xd7"})]}),(0,h.jsxs)(p.cw,{children:[(0,h.jsxs)(p.gE,{style:{position:"relative"},children:[(0,h.jsx)(p.lR,{children:"Select User *"}),(0,h.jsx)(z,{type:"text",value:ce,onChange:e=>(e=>{if(pe(e),me(!0),e.length<1){const e=le.slice(0,10);return void ue(e)}const t=le.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase()));ue(t.slice(0,10))})(e.target.value),onFocus:()=>{me(!0),0===ce.length&&ue(le.slice(0,10))},onBlur:()=>setTimeout(()=>me(!1),200),placeholder:"Search by name, username, or email..."}),he&&xe.length>0&&(0,h.jsx)(N,{children:xe.map(e=>(0,h.jsxs)(T,{onClick:()=>(e=>{je(e),pe(e.full_name||e.username),me(!1),ie(t=>({...t,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,h.jsx)(_,{children:e.full_name||e.username}),(0,h.jsxs)(D,{children:[e.email," \u2022 ",e.role]})]},e.id))}),ge&&(0,h.jsxs)(O,{children:["\u2713 Selected: ",(0,h.jsx)("strong",{children:ge.full_name||ge.username})," (",ge.email,")"]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Subject *"}),(0,h.jsx)(p.ZQ,{type:"text",value:re.subject,onChange:e=>ie({...re,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description *"}),(0,h.jsx)(p.Lz,{value:re.description,onChange:e=>ie({...re,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(p.lR,{children:"Attachments"}),(0,h.jsx)(l.A,{files:se,onChange:ne,maxFiles:5})]}),(0,h.jsxs)(p.fh,{children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Priority"}),(0,h.jsxs)(p.FX,{value:re.priority,onChange:e=>ie({...re,priority:e.target.value}),children:[(0,h.jsx)("option",{value:"low",children:"Low"}),(0,h.jsx)("option",{value:"medium",children:"Medium"}),(0,h.jsx)("option",{value:"high",children:"High"}),(0,h.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category"}),(0,h.jsxs)(p.FX,{value:re.category,onChange:e=>ie({...re,category:e.target.value}),children:[(0,h.jsx)("option",{value:"general",children:"General"}),(0,h.jsx)("option",{value:"technical",children:"Technical"}),(0,h.jsx)("option",{value:"billing",children:"Billing"}),(0,h.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,h.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,h.jsxs)(p.jl,{children:[(0,h.jsx)(x.$n,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,h.jsx)(x.$n,{variant:"primary",onClick:async()=>{if(ge){try{const e={customerId:re.customerId,customerName:re.customerName,customerEmail:re.customerEmail,customerRole:"System Admin"===ge.role?"admin":"Restaurant Admin"===ge.role?"restaurant":["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(ge.role)?"manager":"staff",subject:re.subject,description:re.description,status:"open",priority:re.priority,category:re.category,attachments:se.length>0?se:void 0},i=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok)return;{const e=await i.json(),s=e.data||e;r([s,...t])}}catch(e){return}X(!1),ie({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),ne([]),je(null),pe(""),ue([])}},disabled:!re.subject||!re.description||!ge,children:"Create Inquiry"})]})]})}),Y&&K&&(0,h.jsx)(p.mH,{onClick:()=>Z(!1),children:(0,h.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(p.rQ,{children:[(0,h.jsx)(p.wt,{children:"Inquiry Details"}),(0,h.jsx)(p.Jn,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,h.jsxs)(p.cw,{children:[(0,h.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(p.lR,{children:"Ticket Number"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:K.ticketNumber})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(p.lR,{children:"Status"}),(0,h.jsxs)(p.FX,{value:ee,onChange:e=>(async e=>{if(K){te(e);try{(await fetch(`/api/support-tickets/${K.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(r(t=>t.map(t=>t.id===K.id?{...t,status:e}:t)),V(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,h.jsx)("option",{value:"open",children:"Open"}),(0,h.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,h.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(p.lR,{children:"Priority"}),(0,h.jsx)("div",{style:{padding:"8px 0"},children:(0,h.jsx)(S,{priority:K.priority,children:K.priority})})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(p.lR,{children:"Category"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:K.category.replace("-"," ")})]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(p.lR,{children:"Customer Information"}),(0,h.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,h.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:K.customerName}),(0,h.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:K.customerEmail})]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(p.lR,{children:"Subject"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:K.subject})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:K.description})]}),(null===K||void 0===K?void 0:K.attachments)&&K.attachments.length>0&&(0,h.jsx)(d.A,{attachments:K.attachments}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(p.lR,{children:"Created At"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Ce(K.createdAt)})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(p.lR,{children:"Last Updated"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Ce(K.updatedAt)})]})]})]}),(0,h.jsx)(a.A,{entityType:"support_ticket",entityId:K.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ae(e=>{const t={...e};return t[K.id]&&(t[K.id]={...t[K.id],unread_count:0}),t})})]}),(0,h.jsx)(p.jl,{children:(0,h.jsx)(x.$n,{variant:"secondary",onClick:()=>Z(!1),children:"Close"})})]})})]})]})})}}}]);