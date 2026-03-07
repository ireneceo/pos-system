"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8725],{2488:(e,t,i)=>{i.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,a=r.Ay.input`
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
`,s=r.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,l=r.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,d=r.Ay.select`
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
`,c=e=>{let{children:t,className:i,style:r,...a}=e;return(0,n.jsx)(o,{className:i,style:r,...a,children:t})},p=e=>{let{placeholder:t="Search...",value:i,onChange:r,style:o,...d}=e;return(0,n.jsxs)(s,{style:o,children:[(0,n.jsx)(a,{placeholder:t,value:i,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...d}),i&&(0,n.jsx)(l,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...i}=e;return(0,n.jsx)(d,{...i,children:t})}},2597:(e,t,i)=>{i.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,a=r.Ay.button`
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
`,s=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:i,style:r}=e;return(0,n.jsx)(o,{className:i,style:r,children:t})},d=e=>{let{active:t,onClick:i,children:r,className:o}=e;return(0,n.jsx)(a,{active:t,onClick:i,className:o,children:r})},c=e=>{let{count:t,variant:i="default",showZero:r=!1}=e;return 0!==t||r?(0,n.jsx)(s,{variant:i,children:t}):null}},2653:(e,t,i)=>{i.d(t,{M:()=>o});var r=i(9950),n=i(4492);function o(e){const[t,i]=(0,n.ok)(),o=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,r.useState)(o());return[a,(0,r.useCallback)(e=>{s(e),i({tab:e})},[i])]}},8725:(e,t,i)=>{i.r(t),i.d(t,{default:()=>q});var r=i(9950),n=i(4752),o=i(1367),a=i(4302),s=i(7455),l=i(4185),d=i(2488),c=i(2597),p=i(2653),x=i(8409),h=i(4414);const u=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,g=n.Ay.div`
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
`,m=n.Ay.div`
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
`,j=n.Ay.div`
  display: flex;
  gap: 12px;
`,b=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,v=n.Ay.div`
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
`,w=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=n.Ay.div`
  flex: 1;
`,k=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,C=n.Ay.div`
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
`,B=n.Ay.div`
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
`,z=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,S=n.Ay.div`
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
`,D=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,N=n.Ay.div`
  margin-bottom: 20px;
`,_=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,$=n.Ay.input`
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
`,O=n.Ay.select`
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
`,T=n.Ay.textarea`
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
`,q=()=>{const{user:e}=(0,o.As)(),[t,i]=(0,r.useState)([]),[n,q]=(0,p.M)("all"),[P,R]=(0,r.useState)(!1),[L,M]=(0,r.useState)(!1),[U,W]=(0,r.useState)(null),[J,H]=(0,r.useState)("open"),[Y,Q]=(0,r.useState)({subject:"",description:"",priority:"medium",category:"general"}),[G,Z]=(0,r.useState)([]),[K,V]=(0,r.useState)({}),[X,ee]=(0,r.useState)(""),[te,ie]=(0,r.useState)("all"),[re,ne]=(0,r.useState)("all"),oe=(null===e||void 0===e?void 0:e.id)||"2";(0,r.useEffect)(()=>{if(e){ae();const e=setInterval(ae,1e4);return()=>clearInterval(e)}},[e]);const ae=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/support-tickets?customerId=${oe}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.success?e.data:Array.isArray(e)?e:[];i(r),se(r)}}catch(e){console.error("Error fetching support tickets:",e)}},se=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),i=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${i}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),V(t)}}}catch(t){console.error("Error fetching unread counts:",t)}},le=t.filter(e=>{const t=e.subject.toLowerCase().includes(X.toLowerCase())||e.ticketNumber.toLowerCase().includes(X.toLowerCase()),i="all"===n||e.status===n,r="all"===te||e.priority===te,o="all"===re||e.category===re;return t&&i&&r&&o}),de=t.length,ce=t.filter(e=>"open"===e.status).length,pe=t.filter(e=>"in-progress"===e.status).length,xe=t.filter(e=>"resolved"===e.status).length,he=t.filter(e=>"closed"===e.status).length,ue=e=>new Date(e).toLocaleString("en-MY");return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(u,{children:[(0,h.jsxs)(g,{children:[(0,h.jsx)(y,{children:"System Inquiry"}),(0,h.jsx)(j,{children:(0,h.jsx)(b,{variant:"primary",onClick:()=>{R(!0)},children:"New Inquiry"})})]}),(0,h.jsxs)(m,{children:[(0,h.jsxs)(x.MD,{children:[(0,h.jsxs)(x.hI,{color:"#635BFF",children:[(0,h.jsx)(x.Os,{children:de}),(0,h.jsx)(x.v0,{children:"Total Tickets"})]}),(0,h.jsxs)(x.hI,{color:"#F59E0B",children:[(0,h.jsx)(x.Os,{children:ce}),(0,h.jsx)(x.v0,{children:"Open Tickets"})]}),(0,h.jsxs)(x.hI,{color:"#3B82F6",children:[(0,h.jsx)(x.Os,{children:pe}),(0,h.jsx)(x.v0,{children:"In Progress"})]}),(0,h.jsxs)(x.hI,{color:"#10B981",children:[(0,h.jsx)(x.Os,{children:xe}),(0,h.jsx)(x.v0,{children:"Resolved"})]})]}),(0,h.jsxs)(c.tU,{children:[(0,h.jsxs)(c.oz,{active:"all"===n,onClick:()=>q("all"),children:["All (",de,")"]}),(0,h.jsxs)(c.oz,{active:"open"===n,onClick:()=>q("open"),children:["Open (",ce,")"]}),(0,h.jsxs)(c.oz,{active:"in-progress"===n,onClick:()=>q("in-progress"),children:["In Progress (",pe,")"]}),(0,h.jsxs)(c.oz,{active:"resolved"===n,onClick:()=>q("resolved"),children:["Resolved (",xe,")"]}),(0,h.jsxs)(c.oz,{active:"closed"===n,onClick:()=>q("closed"),children:["Closed (",he,")"]})]}),(0,h.jsxs)(d.Qn,{children:[(0,h.jsxs)(d.Jt,{value:te,onChange:e=>ie(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Priority"}),(0,h.jsx)("option",{value:"urgent",children:"Urgent"}),(0,h.jsx)("option",{value:"high",children:"High"}),(0,h.jsx)("option",{value:"medium",children:"Medium"}),(0,h.jsx)("option",{value:"low",children:"Low"})]}),(0,h.jsxs)(d.Jt,{value:re,onChange:e=>ne(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),(0,h.jsx)("option",{value:"technical",children:"Technical"}),(0,h.jsx)("option",{value:"billing",children:"Billing"}),(0,h.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,h.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,h.jsx)("option",{value:"general",children:"General"})]}),(0,h.jsx)(d.DO,{placeholder:"Search tickets...",value:X,onChange:e=>ee(e.target.value)})]}),(0,h.jsxs)(v,{children:[le.map(e=>(0,h.jsxs)(f,{style:{cursor:"pointer"},onClick:()=>(e=>{W(e),H(e.status),M(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)(k,{children:e.ticketNumber}),(0,h.jsx)(C,{children:e.subject}),(0,h.jsx)(A,{children:(0,h.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,h.jsxs)(B,{children:[(0,h.jsx)(E,{status:e.status,children:e.status}),(0,h.jsx)(z,{priority:e.priority,children:e.priority})]})]}),(0,h.jsx)(S,{children:e.description}),(0,h.jsxs)(I,{children:[(0,h.jsxs)("span",{children:["Created: ",ue(e.createdAt)]}),K[e.id]&&(0,h.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",K[e.id].total_comments,K[e.id].unread_count>0&&(0,h.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[K[e.id].unread_count," new"]})]})]})]},e.id)),0===le.length&&(0,h.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,h.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,h.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),P&&(0,h.jsxs)(x.aF,{isOpen:!0,onClose:()=>R(!1),title:"Create System Inquiry",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(b,{variant:"secondary",onClick:()=>R(!1),children:"Cancel"}),(0,h.jsx)(b,{variant:"primary",onClick:async()=>{if(Y.subject.trim()&&Y.description.trim())try{const e={subject:Y.subject,description:Y.description,priority:Y.priority,category:Y.category,attachments:G.length>0?G:void 0},t=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).ok?(await ae(),Q({subject:"",description:"",priority:"medium",category:"general"}),Z([]),R(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!Y.subject.trim()||!Y.description.trim(),children:"Submit Inquiry"})]}),children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(_,{children:"Subject *"}),(0,h.jsx)($,{type:"text",value:Y.subject,onChange:e=>Q({...Y,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(_,{children:"Description *"}),(0,h.jsx)(T,{value:Y.description,onChange:e=>Q({...Y,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(_,{children:"Attachments"}),(0,h.jsx)(s.A,{files:G,onChange:Z,maxFiles:5})]}),(0,h.jsxs)(D,{children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(_,{children:"Priority"}),(0,h.jsxs)(O,{value:Y.priority,onChange:e=>Q({...Y,priority:e.target.value}),children:[(0,h.jsx)("option",{value:"low",children:"Low"}),(0,h.jsx)("option",{value:"medium",children:"Medium"}),(0,h.jsx)("option",{value:"high",children:"High"}),(0,h.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(_,{children:"Category"}),(0,h.jsxs)(O,{value:Y.category,onChange:e=>Q({...Y,category:e.target.value}),children:[(0,h.jsx)("option",{value:"technical",children:"Technical Issue"}),(0,h.jsx)("option",{value:"account",children:"Account Management"}),(0,h.jsx)("option",{value:"billing",children:"Billing"}),(0,h.jsx)("option",{value:"feature",children:"Feature Request"}),(0,h.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),L&&U&&(0,h.jsxs)(x.aF,{isOpen:!0,onClose:()=>M(!1),title:"Inquiry Details",footer:(0,h.jsx)(b,{variant:"secondary",onClick:()=>M(!1),children:"Close"}),children:[(0,h.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(_,{children:"Ticket Number"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:U.ticketNumber})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(_,{children:"Status"}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,h.jsxs)(O,{value:J,onChange:e=>H(e.target.value),style:{flex:1},children:[(0,h.jsx)("option",{value:"open",children:"Open"}),(0,h.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,h.jsx)("option",{value:"resolved",children:"Resolved"}),(0,h.jsx)("option",{value:"closed",children:"Closed"})]}),J!==U.status&&(0,h.jsx)(b,{variant:"primary",onClick:async()=>{if(U)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${U.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:J})})).ok&&(i(e=>e.map(e=>e.id===U.id?{...e,status:J}:e)),W(e=>e?{...e,status:J}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:"Save"})]})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(_,{children:"Priority"}),(0,h.jsx)("div",{style:{padding:"8px 0"},children:(0,h.jsx)(z,{priority:U.priority,children:U.priority})})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(_,{children:"Category"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:U.category.replace("-"," ")})]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(_,{children:"Subject"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:U.subject})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(_,{children:"Description"}),(0,h.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:U.description})]}),(null===U||void 0===U?void 0:U.attachments)&&U.attachments.length>0&&(0,h.jsx)(l.A,{attachments:U.attachments}),(0,h.jsxs)("div",{children:[(0,h.jsx)(_,{children:"Created"}),(0,h.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ue(U.createdAt)})]})]}),(0,h.jsx)(a.A,{entityType:"support_ticket",entityId:U.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>V(e=>{const t={...e};return t[U.id]&&(t[U.id]={...t[U.id],unread_count:0}),t})})]})]})]})})}}}]);