"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2488:(e,t,i)=>{i.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,s=r.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
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
`,a=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
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
`,d=e=>{let{children:t,className:i,style:r,...s}=e;return(0,n.jsx)(o,{className:i,style:r,...s,children:t})},l=e=>{let{placeholder:t="Search...",...i}=e;return(0,n.jsx)(s,{placeholder:t,...i})},c=e=>{let{children:t,...i}=e;return(0,n.jsx)(a,{...i,children:t})}},5871:(e,t,i)=>{i.r(t),i.d(t,{default:()=>V});var r=i(9950),n=i(4752),o=i(2488),s=i(4302),a=i(7455),d=i(4185),l=i(1367),c=i(3832),p=i(5665),x=i(4414);const h=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,u=n.Ay.button`
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
`,m=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    gap: 12px;
  }
`,g=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,j=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,y=n.Ay.div`
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
`,b=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,f=n.Ay.div`
  flex: 1;
`,v=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`,w=n.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,C=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,A=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,k=n.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"closed":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"closed":return"#059669";default:return"#6B7280"}}};
`,F=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,E=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
`,B=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,S=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,z=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=n.Ay.span`
  color: #374151;
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
`,T=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,_=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,L=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,D=n.Ay.button`
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
`,$=n.Ay.div`
  padding: 24px;
`,O=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,R=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,q=n.Ay.div`
  margin-bottom: 20px;
`,P=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,U=n.Ay.input`
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
`,M=n.Ay.select`
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
`,W=n.Ay.textarea`
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
`,J=(0,n.Ay)(U)`
  width: 100%;
`,G=n.Ay.div`
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
`,H=n.Ay.div`
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
`,Y=n.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Q=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,K=n.Ay.div`
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
`,V=()=>{const{user:e}=(0,l.As)(),[t,i]=(0,r.useState)([]),[n,V]=(0,r.useState)("open"),[X,Z]=(0,r.useState)(""),[ee,te]=(0,r.useState)("all"),[ie,re]=(0,r.useState)("all"),[ne,oe]=(0,r.useState)("all"),[se,ae]=(0,r.useState)(!1),[de,le]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)(null),[xe,he]=(0,r.useState)(""),[ue,me]=(0,r.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[ge,je]=(0,r.useState)([]),[ye,be]=(0,r.useState)({}),[fe,ve]=(0,r.useState)([]),[we,Ce]=(0,r.useState)(""),[Ae,ke]=(0,r.useState)([]),[Fe,Ee]=(0,r.useState)(!1),[Be,Se]=(0,r.useState)(null);(0,r.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json(),r=t.data||t;i(r),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),i=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${i}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),be(t)}}}catch(t){console.error("Error fetching unread counts:",t)}})(r)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.data||e;ve(i)}}catch(e){}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const ze=t.filter(e=>{const t=e.subject.toLowerCase().includes(X.toLowerCase())||e.customerName.toLowerCase().includes(X.toLowerCase())||e.ticketNumber.toLowerCase().includes(X.toLowerCase()),i="all"===n||e.status===n,r="all"===ee||e.status===ee,o="all"===ie||e.priority===ie,s="all"===ne||e.category===ne;return t&&i&&r&&o&&s}),Ie=t.length,Ne=t.filter(e=>"open"===e.status).length,Te=t.filter(e=>"in-progress"===e.status).length,_e=t.filter(e=>"closed"===e.status).length,Le=e=>new Date(e).toLocaleString("en-MY");return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(c.mc,{children:[(0,x.jsxs)(c.Y9,{children:[(0,x.jsx)(c.hE,{children:"System Inquiry"}),(0,x.jsxs)(c.ex,{children:[(0,x.jsx)(c.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json();i(t.data||t)}}catch(e){}},children:"Refresh"}),(0,x.jsx)(c.$n,{variant:"secondary",onClick:()=>{const e=ze.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),i=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(i),n=document.createElement("a");n.href=r,n.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)},children:"Export"}),(0,x.jsx)(c.$n,{variant:"primary",onClick:()=>{ae(!0)},children:"Create Inquiry"})]})]}),(0,x.jsxs)(c.UC,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#059669",children:[(0,x.jsx)(p.Os,{children:Ie}),(0,x.jsx)(p.v0,{children:"Total Tickets"}),(0,x.jsx)(p.d1,{children:"All support requests"})]}),(0,x.jsxs)(p.hI,{color:"#D97706",children:[(0,x.jsx)(p.Os,{children:Ne}),(0,x.jsx)(p.v0,{children:"Open Tickets"}),(0,x.jsx)(p.d1,{children:"Awaiting response"})]}),(0,x.jsxs)(p.hI,{color:"#2563EB",children:[(0,x.jsx)(p.Os,{children:Te}),(0,x.jsx)(p.v0,{children:"In Progress"}),(0,x.jsx)(p.d1,{children:"Currently being handled"})]}),(0,x.jsxs)(p.hI,{color:"#7C3AED",children:[(0,x.jsx)(p.Os,{children:_e}),(0,x.jsx)(p.v0,{children:"Closed"}),(0,x.jsxs)(p.d1,{children:[Ie>0?Math.round(_e/Ie*100):0,"% completion rate"]})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{active:"open"===n,onClick:()=>V("open"),children:"Open"}),(0,x.jsx)(u,{active:"in-progress"===n,onClick:()=>V("in-progress"),children:"In Progress"}),(0,x.jsx)(u,{active:"all"===n,onClick:()=>V("all"),children:"All Tickets"})]}),(0,x.jsxs)(m,{children:[(0,x.jsx)(g,{children:(0,x.jsx)(o.DO,{placeholder:"Search tickets...",value:X,onChange:e=>Z(e.target.value)})}),"all"===n&&(0,x.jsx)(g,{children:(0,x.jsxs)(o.Jt,{value:ee,onChange:e=>te(e.target.value),style:{maxWidth:"180px"},children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"open",children:"Open"}),(0,x.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,x.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,x.jsx)(g,{children:(0,x.jsxs)(o.Jt,{value:ie,onChange:e=>re(e.target.value),style:{maxWidth:"180px"},children:[(0,x.jsx)("option",{value:"all",children:"All Priority"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"low",children:"Low"})]})}),(0,x.jsx)(g,{children:(0,x.jsxs)(o.Jt,{value:ne,onChange:e=>oe(e.target.value),style:{maxWidth:"180px"},children:[(0,x.jsx)("option",{value:"all",children:"All Categories"}),(0,x.jsx)("option",{value:"technical",children:"Technical"}),(0,x.jsx)("option",{value:"billing",children:"Billing"}),(0,x.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,x.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,x.jsx)("option",{value:"general",children:"General"})]})})]}),(0,x.jsx)(j,{children:ze.map(e=>(0,x.jsxs)(y,{onClick:()=>(e=>{pe(e),he(e.status),le(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,x.jsxs)(b,{children:[(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e.ticketNumber}),(0,x.jsx)(w,{children:e.subject}),(0,x.jsxs)(C,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(k,{status:e.status,children:e.status}),(0,x.jsx)(F,{priority:e.priority,children:e.priority})]})]}),(0,x.jsx)(E,{children:e.description}),(0,x.jsxs)(B,{children:[(0,x.jsxs)(S,{children:[(0,x.jsx)(z,{children:"Created"}),(0,x.jsx)(I,{children:Le(e.createdAt)})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)(z,{children:"Category"}),(0,x.jsx)(I,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),ye[e.id]&&(0,x.jsx)(S,{children:(0,x.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ye[e.id].total_comments,ye[e.id].unread_count>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ye[e.id].unread_count," new"]})]})})]})]},e.id))}),se&&(0,x.jsx)(N,{onClick:()=>ae(!1),children:(0,x.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(_,{children:[(0,x.jsx)(L,{children:"Create System Inquiry"}),(0,x.jsx)(D,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,x.jsxs)($,{children:[(0,x.jsxs)(q,{style:{position:"relative"},children:[(0,x.jsx)(P,{children:"Select User *"}),(0,x.jsx)(J,{type:"text",value:we,onChange:e=>(e=>{if(Ce(e),Ee(!0),e.length<1){const e=fe.slice(0,10);return void ke(e)}const t=fe.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase()));ke(t.slice(0,10))})(e.target.value),onFocus:()=>{Ee(!0),0===we.length&&ke(fe.slice(0,10))},onBlur:()=>setTimeout(()=>Ee(!1),200),placeholder:"Search by name, username, or email..."}),Fe&&Ae.length>0&&(0,x.jsx)(G,{children:Ae.map(e=>(0,x.jsxs)(H,{onClick:()=>(e=>{Se(e),Ce(e.full_name||e.username),Ee(!1),me(t=>({...t,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,x.jsx)(Y,{children:e.full_name||e.username}),(0,x.jsxs)(Q,{children:[e.email," \u2022 ",e.role]})]},e.id))}),Be&&(0,x.jsxs)(K,{children:["\u2713 Selected: ",(0,x.jsx)("strong",{children:Be.full_name||Be.username})," (",Be.email,")"]})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Subject *"}),(0,x.jsx)(U,{type:"text",value:ue.subject,onChange:e=>me({...ue,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Description *"}),(0,x.jsx)(W,{value:ue.description,onChange:e=>me({...ue,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(P,{children:"Attachments"}),(0,x.jsx)(a.A,{files:ge,onChange:je,maxFiles:5})]}),(0,x.jsxs)(R,{children:[(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Priority"}),(0,x.jsxs)(M,{value:ue.priority,onChange:e=>me({...ue,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"low",children:"Low"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Category"}),(0,x.jsxs)(M,{value:ue.category,onChange:e=>me({...ue,category:e.target.value}),children:[(0,x.jsx)("option",{value:"general",children:"General"}),(0,x.jsx)("option",{value:"technical",children:"Technical"}),(0,x.jsx)("option",{value:"billing",children:"Billing"}),(0,x.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,x.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(c.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,x.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(Be){try{const e={customerId:ue.customerId,customerName:ue.customerName,customerEmail:ue.customerEmail,customerRole:"System Admin"===Be.role?"admin":"Restaurant Admin"===Be.role?"restaurant":["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(Be.role)?"manager":"staff",subject:ue.subject,description:ue.description,status:"open",priority:ue.priority,category:ue.category,attachments:ge.length>0?ge:void 0},r=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok)return;{const e=await r.json(),n=e.data||e;i([n,...t])}}catch(e){return}ae(!1),me({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),je([]),Se(null),Ce(""),ke([])}},disabled:!ue.subject||!ue.description||!Be,children:"Create Inquiry"})]})]})}),de&&ce&&(0,x.jsx)(N,{onClick:()=>le(!1),children:(0,x.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(_,{children:[(0,x.jsx)(L,{children:"Inquiry Details"}),(0,x.jsx)(D,{onClick:()=>le(!1),children:"\xd7"})]}),(0,x.jsxs)($,{children:[(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(P,{children:"Ticket Number"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ce.ticketNumber})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(P,{children:"Status"}),(0,x.jsxs)(M,{value:xe,onChange:e=>(async e=>{if(ce){he(e);try{(await fetch(`/api/support-tickets/${ce.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(i(t=>t.map(t=>t.id===ce.id?{...t,status:e}:t)),pe(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,x.jsx)("option",{value:"open",children:"Open"}),(0,x.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,x.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(P,{children:"Priority"}),(0,x.jsx)("div",{style:{padding:"8px 0"},children:(0,x.jsx)(F,{priority:ce.priority,children:ce.priority})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(P,{children:"Category"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ce.category.replace("-"," ")})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(P,{children:"Customer Information"}),(0,x.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:ce.customerName}),(0,x.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:ce.customerEmail})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(P,{children:"Subject"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ce.subject})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(P,{children:"Description"}),(0,x.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ce.description})]}),(null===ce||void 0===ce?void 0:ce.attachments)&&ce.attachments.length>0&&(0,x.jsx)(d.A,{attachments:ce.attachments}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(P,{children:"Created At"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Le(ce.createdAt)})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(P,{children:"Last Updated"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Le(ce.updatedAt)})]})]})]}),(0,x.jsx)(s.A,{entityType:"support_ticket",entityId:ce.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>be(e=>{const t={...e};return t[ce.id]&&(t[ce.id]={...t[ce.id],unread_count:0}),t})})]}),(0,x.jsx)(O,{children:(0,x.jsx)(c.$n,{variant:"secondary",onClick:()=>le(!1),children:"Close"})})]})})]})]})})}}}]);