"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,s=i.Ay.input`
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
`,a=i.Ay.select`
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
`,l=e=>{let{children:t,className:r,style:i,...s}=e;return(0,n.jsx)(o,{className:r,style:i,...s,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(s,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(a,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:i}=e;return(0,n.jsx)(o,{className:r,style:i,children:t})},d=e=>{let{active:t,onClick:r,children:i,className:o}=e;return(0,n.jsx)(s,{active:t,onClick:r,className:o,children:i})},c=e=>{let{count:t,variant:r="default",showZero:i=!1}=e;return 0!==t||i?(0,n.jsx)(a,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>o});var i=r(9950),n=r(4492);function o(e){const[t,r]=(0,n.ok)(),o=(0,i.useCallback)(()=>t.get("tab")||e,[t,e]),[s,a]=(0,i.useState)(o());return[s,(0,i.useCallback)(e=>{a(e),r({tab:e})},[r])]}},5871:(e,t,r)=>{r.r(t),r.d(t,{default:()=>K});var i=r(9950),n=r(4752),o=r(2597),s=r(2653),a=r(2488),l=r(4302),d=r(7455),c=r(4185),p=r(1367),x=r(3832),h=r(5665),u=r(4414);const g=n.Ay.div`
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
`,m=n.Ay.div`
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
`,b=n.Ay.div`
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
`,y=n.Ay.div`
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
`,k=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,A=n.Ay.span`
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
`,T=n.Ay.button`
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
`,L=n.Ay.div`
  padding: 24px;
`,O=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,U=n.Ay.div`
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
`,J=(0,n.Ay)(R)`
  width: 100%;
`,H=n.Ay.div`
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
`,Y=n.Ay.div`
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
`,G=n.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Q=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Z=n.Ay.div`
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
`,K=()=>{const{user:e}=(0,p.As)(),[t,r]=(0,i.useState)([]),[n,K]=(0,s.M)("open"),[V,X]=(0,i.useState)(""),[ee,te]=(0,i.useState)("all"),[re,ie]=(0,i.useState)("all"),[ne,oe]=(0,i.useState)("all"),[se,ae]=(0,i.useState)(!1),[le,de]=(0,i.useState)(!1),[ce,pe]=(0,i.useState)(null),[xe,he]=(0,i.useState)(""),[ue,ge]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[me,je]=(0,i.useState)([]),[be,ye]=(0,i.useState)({}),[fe,ve]=(0,i.useState)([]),[we,Ce]=(0,i.useState)(""),[ke,Ae]=(0,i.useState)([]),[Fe,Ee]=(0,i.useState)(!1),[Be,Se]=(0,i.useState)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.data||e;r(i),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ye(t)}}}catch(t){console.error("Error fetching unread counts:",t)}})(i)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e;ve(r)}}catch(e){}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const ze=t.filter(e=>{const t=e.subject.toLowerCase().includes(V.toLowerCase())||e.customerName.toLowerCase().includes(V.toLowerCase())||e.ticketNumber.toLowerCase().includes(V.toLowerCase()),r="all"===n||e.status===n,i="all"===ee||e.status===ee,o="all"===re||e.priority===re,s="all"===ne||e.category===ne;return t&&r&&i&&o&&s}),Ie=t.length,Ne=t.filter(e=>"open"===e.status).length,_e=t.filter(e=>"in-progress"===e.status).length,$e=t.filter(e=>"closed"===e.status).length,De=e=>new Date(e).toLocaleString("en-MY");return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(x.mc,{children:[(0,u.jsxs)(x.Y9,{children:[(0,u.jsx)(x.hE,{children:"System Inquiry"}),(0,u.jsxs)(x.ex,{children:[(0,u.jsx)(x.$n,{variant:"secondary",onClick:()=>{const e=ze.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(r),n=document.createElement("a");n.href=i,n.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,u.jsx)(x.$n,{variant:"primary",onClick:()=>{ae(!0)},children:"Create Inquiry"})]})]}),(0,u.jsxs)(x.UC,{children:[(0,u.jsxs)(h.MD,{children:[(0,u.jsxs)(h.hI,{color:"#059669",children:[(0,u.jsx)(h.Os,{children:Ie}),(0,u.jsx)(h.v0,{children:"Total Tickets"}),(0,u.jsx)(h.d1,{children:"All support requests"})]}),(0,u.jsxs)(h.hI,{color:"#D97706",children:[(0,u.jsx)(h.Os,{children:Ne}),(0,u.jsx)(h.v0,{children:"Open Tickets"}),(0,u.jsx)(h.d1,{children:"Awaiting response"})]}),(0,u.jsxs)(h.hI,{color:"#2563EB",children:[(0,u.jsx)(h.Os,{children:_e}),(0,u.jsx)(h.v0,{children:"In Progress"}),(0,u.jsx)(h.d1,{children:"Currently being handled"})]}),(0,u.jsxs)(h.hI,{color:"#7C3AED",children:[(0,u.jsx)(h.Os,{children:$e}),(0,u.jsx)(h.v0,{children:"Closed"}),(0,u.jsxs)(h.d1,{children:[Ie>0?Math.round($e/Ie*100):0,"% completion rate"]})]})]}),(0,u.jsxs)(o.tU,{children:[(0,u.jsx)(o.oz,{active:"open"===n,onClick:()=>K("open"),children:"Open"}),(0,u.jsx)(o.oz,{active:"in-progress"===n,onClick:()=>K("in-progress"),children:"In Progress"}),(0,u.jsx)(o.oz,{active:"all"===n,onClick:()=>K("all"),children:"All Tickets"})]}),(0,u.jsxs)(g,{children:[(0,u.jsx)(m,{children:(0,u.jsx)(a.DO,{placeholder:"Search tickets...",value:V,onChange:e=>X(e.target.value)})}),"all"===n&&(0,u.jsx)(m,{children:(0,u.jsxs)(a.Jt,{value:ee,onChange:e=>te(e.target.value),style:{maxWidth:"180px"},children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"open",children:"Open"}),(0,u.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,u.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,u.jsx)(m,{children:(0,u.jsxs)(a.Jt,{value:re,onChange:e=>ie(e.target.value),style:{maxWidth:"180px"},children:[(0,u.jsx)("option",{value:"all",children:"All Priority"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"}),(0,u.jsx)("option",{value:"high",children:"High"}),(0,u.jsx)("option",{value:"medium",children:"Medium"}),(0,u.jsx)("option",{value:"low",children:"Low"})]})}),(0,u.jsx)(m,{children:(0,u.jsxs)(a.Jt,{value:ne,onChange:e=>oe(e.target.value),style:{maxWidth:"180px"},children:[(0,u.jsx)("option",{value:"all",children:"All Categories"}),(0,u.jsx)("option",{value:"technical",children:"Technical"}),(0,u.jsx)("option",{value:"billing",children:"Billing"}),(0,u.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,u.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,u.jsx)("option",{value:"general",children:"General"})]})})]}),(0,u.jsxs)(j,{children:[ze.map(e=>(0,u.jsxs)(b,{onClick:()=>(e=>{pe(e),he(e.status),de(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,u.jsxs)(y,{children:[(0,u.jsxs)(f,{children:[(0,u.jsx)(v,{children:e.ticketNumber}),(0,u.jsx)(w,{children:e.subject}),(0,u.jsxs)(C,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,u.jsxs)(k,{children:[(0,u.jsx)(A,{status:e.status,children:e.status}),(0,u.jsx)(F,{priority:e.priority,children:e.priority})]})]}),(0,u.jsx)(E,{children:e.description}),(0,u.jsxs)(B,{children:[(0,u.jsxs)(S,{children:[(0,u.jsx)(z,{children:"Created"}),(0,u.jsx)(I,{children:De(e.createdAt)})]}),(0,u.jsxs)(S,{children:[(0,u.jsx)(z,{children:"Category"}),(0,u.jsx)(I,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),be[e.id]&&(0,u.jsx)(S,{children:(0,u.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",be[e.id].total_comments,be[e.id].unread_count>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[be[e.id].unread_count," new"]})]})})]})]},e.id)),0===ze.length&&(0,u.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,u.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,u.jsx)("p",{children:"No support tickets have been submitted."})]})]}),se&&(0,u.jsx)(N,{onClick:()=>ae(!1),children:(0,u.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)($,{children:[(0,u.jsx)(D,{children:"Create System Inquiry"}),(0,u.jsx)(T,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,u.jsxs)(L,{children:[(0,u.jsxs)(q,{style:{position:"relative"},children:[(0,u.jsx)(P,{children:"Select User *"}),(0,u.jsx)(J,{type:"text",value:we,onChange:e=>(e=>{if(Ce(e),Ee(!0),e.length<1){const e=fe.slice(0,10);return void Ae(e)}const t=fe.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase()));Ae(t.slice(0,10))})(e.target.value),onFocus:()=>{Ee(!0),0===we.length&&Ae(fe.slice(0,10))},onBlur:()=>setTimeout(()=>Ee(!1),200),placeholder:"Search by name, username, or email..."}),Fe&&ke.length>0&&(0,u.jsx)(H,{children:ke.map(e=>(0,u.jsxs)(Y,{onClick:()=>(e=>{Se(e),Ce(e.full_name||e.username),Ee(!1),ge(t=>({...t,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,u.jsx)(G,{children:e.full_name||e.username}),(0,u.jsxs)(Q,{children:[e.email," \u2022 ",e.role]})]},e.id))}),Be&&(0,u.jsxs)(Z,{children:["\u2713 Selected: ",(0,u.jsx)("strong",{children:Be.full_name||Be.username})," (",Be.email,")"]})]}),(0,u.jsxs)(q,{children:[(0,u.jsx)(P,{children:"Subject *"}),(0,u.jsx)(R,{type:"text",value:ue.subject,onChange:e=>ge({...ue,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,u.jsxs)(q,{children:[(0,u.jsx)(P,{children:"Description *"}),(0,u.jsx)(W,{value:ue.description,onChange:e=>ge({...ue,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(P,{children:"Attachments"}),(0,u.jsx)(d.A,{files:me,onChange:je,maxFiles:5})]}),(0,u.jsxs)(U,{children:[(0,u.jsxs)(q,{children:[(0,u.jsx)(P,{children:"Priority"}),(0,u.jsxs)(M,{value:ue.priority,onChange:e=>ge({...ue,priority:e.target.value}),children:[(0,u.jsx)("option",{value:"low",children:"Low"}),(0,u.jsx)("option",{value:"medium",children:"Medium"}),(0,u.jsx)("option",{value:"high",children:"High"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,u.jsxs)(q,{children:[(0,u.jsx)(P,{children:"Category"}),(0,u.jsxs)(M,{value:ue.category,onChange:e=>ge({...ue,category:e.target.value}),children:[(0,u.jsx)("option",{value:"general",children:"General"}),(0,u.jsx)("option",{value:"technical",children:"Technical"}),(0,u.jsx)("option",{value:"billing",children:"Billing"}),(0,u.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,u.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,u.jsxs)(O,{children:[(0,u.jsx)(x.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,u.jsx)(x.$n,{variant:"primary",onClick:async()=>{if(Be){try{const e={customerId:ue.customerId,subject:ue.subject,description:ue.description,status:"open",priority:ue.priority,category:ue.category,attachments:me.length>0?me:void 0},i=localStorage.getItem("auth_token"),n=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(e)});if(!n.ok)return;{const e=await n.json(),i=e.data||e;r([i,...t])}}catch(e){return}ae(!1),ge({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),je([]),Se(null),Ce(""),Ae([])}},disabled:!ue.subject||!ue.description||!Be,children:"Create Inquiry"})]})]})}),le&&ce&&(0,u.jsx)(N,{onClick:()=>de(!1),children:(0,u.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)($,{children:[(0,u.jsx)(D,{children:"Inquiry Details"}),(0,u.jsx)(T,{onClick:()=>de(!1),children:"\xd7"})]}),(0,u.jsxs)(L,{children:[(0,u.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(P,{children:"Ticket Number"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ce.ticketNumber})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(P,{children:"Status"}),(0,u.jsxs)(M,{value:xe,onChange:e=>(async e=>{if(ce){he(e);try{const t=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${ce.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})})).ok&&(r(t=>t.map(t=>t.id===ce.id?{...t,status:e}:t)),pe(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,u.jsx)("option",{value:"open",children:"Open"}),(0,u.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,u.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(P,{children:"Priority"}),(0,u.jsx)("div",{style:{padding:"8px 0"},children:(0,u.jsx)(F,{priority:ce.priority,children:ce.priority})})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(P,{children:"Category"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ce.category.replace("-"," ")})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(P,{children:"Customer Information"}),(0,u.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,u.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:ce.customerName}),(0,u.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:ce.customerEmail})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(P,{children:"Subject"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ce.subject})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(P,{children:"Description"}),(0,u.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ce.description})]}),(null===ce||void 0===ce?void 0:ce.attachments)&&ce.attachments.length>0&&(0,u.jsx)(c.A,{attachments:ce.attachments}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(P,{children:"Created At"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:De(ce.createdAt)})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(P,{children:"Last Updated"}),(0,u.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:De(ce.updatedAt)})]})]})]}),(0,u.jsx)(l.A,{entityType:"support_ticket",entityId:ce.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ye(e=>{const t={...e};return t[ce.id]&&(t[ce.id]={...t[ce.id],unread_count:0}),t})})]}),(0,u.jsx)(O,{children:(0,u.jsx)(x.$n,{variant:"secondary",onClick:()=>de(!1),children:"Close"})})]})})]})]})})}}}]);