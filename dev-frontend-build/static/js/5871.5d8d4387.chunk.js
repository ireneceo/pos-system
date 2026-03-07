"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2488:(e,t,r)=>{r.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,a=i.Ay.div`
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
`,l=i.Ay.button`
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
`,d=i.Ay.select`
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
`,c=e=>{let{children:t,className:r,style:i,...s}=e;return(0,n.jsx)(o,{className:r,style:i,...s,children:t})},p=e=>{let{placeholder:t="Search...",value:r,onChange:i,style:o,...d}=e;return(0,n.jsxs)(a,{style:o,children:[(0,n.jsx)(s,{placeholder:t,value:r,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...d}),r&&(0,n.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...r}=e;return(0,n.jsx)(d,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:i}=e;return(0,n.jsx)(o,{className:r,style:i,children:t})},d=e=>{let{active:t,onClick:r,children:i,className:o}=e;return(0,n.jsx)(s,{active:t,onClick:r,className:o,children:i})},c=e=>{let{count:t,variant:r="default",showZero:i=!1}=e;return 0!==t||i?(0,n.jsx)(a,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>o});var i=r(9950),n=r(4492);function o(e){const[t,r]=(0,n.ok)(),o=(0,i.useCallback)(()=>t.get("tab")||e,[t,e]),[s,a]=(0,i.useState)(o());return[s,(0,i.useCallback)(e=>{a(e),r({tab:e})},[r])]}},5871:(e,t,r)=>{r.r(t),r.d(t,{default:()=>J});var i=r(9950),n=r(4752),o=r(2597),s=r(2653),a=r(2488),l=r(4302),d=r(7455),c=r(4185),p=r(8409),x=r(1367),h=r(3832),u=r(5665),g=r(4414);const m=n.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,j=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,y=n.Ay.div`
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
`,f=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,v=n.Ay.div`
  flex: 1;
`,w=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`,C=n.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,k=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,F=n.Ay.div`
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
`,E=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,B=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
`,S=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,z=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,I=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,N=n.Ay.span`
  color: #374151;
`,_=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,$=n.Ay.div`
  margin-bottom: 20px;
`,L=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,D=n.Ay.input`
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
`,T=n.Ay.select`
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
`,O=n.Ay.textarea`
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
`,U=(0,n.Ay)(D)`
  width: 100%;
`,q=n.Ay.div`
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
`,R=n.Ay.div`
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
`,P=n.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,W=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,M=n.Ay.div`
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
`,J=()=>{const{user:e}=(0,x.As)(),[t,r]=(0,i.useState)([]),[n,J]=(0,s.M)("open"),[H,Y]=(0,i.useState)(""),[G,Q]=(0,i.useState)("all"),[Z,K]=(0,i.useState)("all"),[V,X]=(0,i.useState)("all"),[ee,te]=(0,i.useState)(!1),[re,ie]=(0,i.useState)(!1),[ne,oe]=(0,i.useState)(null),[se,ae]=(0,i.useState)(""),[le,de]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[ce,pe]=(0,i.useState)([]),[xe,he]=(0,i.useState)({}),[ue,ge]=(0,i.useState)([]),[me,je]=(0,i.useState)(""),[ye,be]=(0,i.useState)([]),[fe,ve]=(0,i.useState)(!1),[we,Ce]=(0,i.useState)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.data||e;r(i),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),he(t)}}}catch(t){console.error("Error fetching unread counts:",t)}})(i)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e;ge(r)}}catch(e){}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const ke=t.filter(e=>{const t=e.subject.toLowerCase().includes(H.toLowerCase())||e.customerName.toLowerCase().includes(H.toLowerCase())||e.ticketNumber.toLowerCase().includes(H.toLowerCase()),r="all"===n||e.status===n,i="all"===G||e.status===G,o="all"===Z||e.priority===Z,s="all"===V||e.category===V;return t&&r&&i&&o&&s}),Fe=t.length,Ae=t.filter(e=>"open"===e.status).length,Ee=t.filter(e=>"in-progress"===e.status).length,Be=t.filter(e=>"closed"===e.status).length,Se=e=>new Date(e).toLocaleString("en-MY");return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(h.mc,{children:[(0,g.jsxs)(h.Y9,{children:[(0,g.jsx)(h.hE,{children:"System Inquiry"}),(0,g.jsxs)(h.ex,{children:[(0,g.jsx)(h.$n,{variant:"secondary",onClick:()=>{const e=ke.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(r),n=document.createElement("a");n.href=i,n.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,g.jsx)(h.$n,{variant:"primary",onClick:()=>{te(!0)},children:"Create Inquiry"})]})]}),(0,g.jsxs)(h.UC,{children:[(0,g.jsxs)(u.MD,{children:[(0,g.jsxs)(u.hI,{color:"#059669",children:[(0,g.jsx)(u.Os,{children:Fe}),(0,g.jsx)(u.v0,{children:"Total Tickets"}),(0,g.jsx)(u.d1,{children:"All support requests"})]}),(0,g.jsxs)(u.hI,{color:"#D97706",children:[(0,g.jsx)(u.Os,{children:Ae}),(0,g.jsx)(u.v0,{children:"Open Tickets"}),(0,g.jsx)(u.d1,{children:"Awaiting response"})]}),(0,g.jsxs)(u.hI,{color:"#2563EB",children:[(0,g.jsx)(u.Os,{children:Ee}),(0,g.jsx)(u.v0,{children:"In Progress"}),(0,g.jsx)(u.d1,{children:"Currently being handled"})]}),(0,g.jsxs)(u.hI,{color:"#7C3AED",children:[(0,g.jsx)(u.Os,{children:Be}),(0,g.jsx)(u.v0,{children:"Closed"}),(0,g.jsxs)(u.d1,{children:[Fe>0?Math.round(Be/Fe*100):0,"% completion rate"]})]})]}),(0,g.jsxs)(o.tU,{children:[(0,g.jsx)(o.oz,{active:"open"===n,onClick:()=>J("open"),children:"Open"}),(0,g.jsx)(o.oz,{active:"in-progress"===n,onClick:()=>J("in-progress"),children:"In Progress"}),(0,g.jsx)(o.oz,{active:"all"===n,onClick:()=>J("all"),children:"All Tickets"})]}),(0,g.jsxs)(m,{children:["all"===n&&(0,g.jsx)(j,{children:(0,g.jsxs)(a.Jt,{value:G,onChange:e=>Q(e.target.value),style:{maxWidth:"180px"},children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"open",children:"Open"}),(0,g.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,g.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,g.jsx)(j,{children:(0,g.jsxs)(a.Jt,{value:Z,onChange:e=>K(e.target.value),style:{maxWidth:"180px"},children:[(0,g.jsx)("option",{value:"all",children:"All Priority"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"}),(0,g.jsx)("option",{value:"high",children:"High"}),(0,g.jsx)("option",{value:"medium",children:"Medium"}),(0,g.jsx)("option",{value:"low",children:"Low"})]})}),(0,g.jsx)(j,{children:(0,g.jsxs)(a.Jt,{value:V,onChange:e=>X(e.target.value),style:{maxWidth:"180px"},children:[(0,g.jsx)("option",{value:"all",children:"All Categories"}),(0,g.jsx)("option",{value:"technical",children:"Technical"}),(0,g.jsx)("option",{value:"billing",children:"Billing"}),(0,g.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,g.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,g.jsx)("option",{value:"general",children:"General"})]})}),(0,g.jsx)(j,{children:(0,g.jsx)(a.DO,{placeholder:"Search tickets...",value:H,onChange:e=>Y(e.target.value)})})]}),(0,g.jsxs)(y,{children:[ke.map(e=>(0,g.jsxs)(b,{onClick:()=>(e=>{oe(e),ae(e.status),ie(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,g.jsxs)(f,{children:[(0,g.jsxs)(v,{children:[(0,g.jsx)(w,{children:e.ticketNumber}),(0,g.jsx)(C,{children:e.subject}),(0,g.jsxs)(k,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,g.jsxs)(F,{children:[(0,g.jsx)(A,{status:e.status,children:e.status}),(0,g.jsx)(E,{priority:e.priority,children:e.priority})]})]}),(0,g.jsx)(B,{children:e.description}),(0,g.jsxs)(S,{children:[(0,g.jsxs)(z,{children:[(0,g.jsx)(I,{children:"Created"}),(0,g.jsx)(N,{children:Se(e.createdAt)})]}),(0,g.jsxs)(z,{children:[(0,g.jsx)(I,{children:"Category"}),(0,g.jsx)(N,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),xe[e.id]&&(0,g.jsx)(z,{children:(0,g.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",xe[e.id].total_comments,xe[e.id].unread_count>0&&(0,g.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[xe[e.id].unread_count," new"]})]})})]})]},e.id)),0===ke.length&&(0,g.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,g.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,g.jsx)("p",{children:"No support tickets have been submitted."})]})]}),ee&&(0,g.jsxs)(p.aF,{isOpen:!0,onClose:()=>te(!1),title:"Create System Inquiry",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(h.$n,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,g.jsx)(h.$n,{variant:"primary",onClick:async()=>{if(we){try{const e={customerId:le.customerId,subject:le.subject,description:le.description,status:"open",priority:le.priority,category:le.category,attachments:ce.length>0?ce:void 0},i=localStorage.getItem("auth_token"),n=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(e)});if(!n.ok)return;{const e=await n.json(),i=e.data||e;r([i,...t])}}catch(e){return}te(!1),de({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),pe([]),Ce(null),je(""),be([])}},disabled:!le.subject||!le.description||!we,children:"Create Inquiry"})]}),children:[(0,g.jsxs)($,{style:{position:"relative"},children:[(0,g.jsx)(L,{children:"Select User *"}),(0,g.jsx)(U,{type:"text",value:me,onChange:e=>(e=>{if(je(e),ve(!0),e.length<1){const e=ue.slice(0,10);return void be(e)}const t=ue.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase()));be(t.slice(0,10))})(e.target.value),onFocus:()=>{ve(!0),0===me.length&&be(ue.slice(0,10))},onBlur:()=>setTimeout(()=>ve(!1),200),placeholder:"Search by name, username, or email..."}),fe&&ye.length>0&&(0,g.jsx)(q,{children:ye.map(e=>(0,g.jsxs)(R,{onClick:()=>(e=>{Ce(e),je(e.full_name||e.username),ve(!1),de(t=>({...t,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,g.jsx)(P,{children:e.full_name||e.username}),(0,g.jsxs)(W,{children:[e.email," \u2022 ",e.role]})]},e.id))}),we&&(0,g.jsxs)(M,{children:["\u2713 Selected: ",(0,g.jsx)("strong",{children:we.full_name||we.username})," (",we.email,")"]})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(L,{children:"Subject *"}),(0,g.jsx)(D,{type:"text",value:le.subject,onChange:e=>de({...le,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(L,{children:"Description *"}),(0,g.jsx)(O,{value:le.description,onChange:e=>de({...le,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:"Attachments"}),(0,g.jsx)(d.A,{files:ce,onChange:pe,maxFiles:5})]}),(0,g.jsxs)(_,{children:[(0,g.jsxs)($,{children:[(0,g.jsx)(L,{children:"Priority"}),(0,g.jsxs)(T,{value:le.priority,onChange:e=>de({...le,priority:e.target.value}),children:[(0,g.jsx)("option",{value:"low",children:"Low"}),(0,g.jsx)("option",{value:"medium",children:"Medium"}),(0,g.jsx)("option",{value:"high",children:"High"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(L,{children:"Category"}),(0,g.jsxs)(T,{value:le.category,onChange:e=>de({...le,category:e.target.value}),children:[(0,g.jsx)("option",{value:"general",children:"General"}),(0,g.jsx)("option",{value:"technical",children:"Technical"}),(0,g.jsx)("option",{value:"billing",children:"Billing"}),(0,g.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,g.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),re&&ne&&(0,g.jsxs)(p.aF,{isOpen:!0,onClose:()=>ie(!1),title:"Inquiry Details",footer:(0,g.jsx)(h.$n,{variant:"secondary",onClick:()=>ie(!1),children:"Close"}),children:[(0,g.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:"Ticket Number"}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ne.ticketNumber})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:"Status"}),(0,g.jsxs)(T,{value:se,onChange:e=>(async e=>{if(ne){ae(e);try{const t=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${ne.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})})).ok&&(r(t=>t.map(t=>t.id===ne.id?{...t,status:e}:t)),oe(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,g.jsx)("option",{value:"open",children:"Open"}),(0,g.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,g.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:"Priority"}),(0,g.jsx)("div",{style:{padding:"8px 0"},children:(0,g.jsx)(E,{priority:ne.priority,children:ne.priority})})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:"Category"}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ne.category.replace("-"," ")})]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:"Customer Information"}),(0,g.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,g.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:ne.customerName}),(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:ne.customerEmail})]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:"Subject"}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ne.subject})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:"Description"}),(0,g.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ne.description})]}),(null===ne||void 0===ne?void 0:ne.attachments)&&ne.attachments.length>0&&(0,g.jsx)(c.A,{attachments:ne.attachments}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:"Created At"}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Se(ne.createdAt)})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(L,{children:"Last Updated"}),(0,g.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Se(ne.updatedAt)})]})]})]}),(0,g.jsx)(l.A,{entityType:"support_ticket",entityId:ne.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>he(e=>{const t={...e};return t[ne.id]&&(t[ne.id]={...t[ne.id],unread_count:0}),t})})]})]})]})})}}}]);