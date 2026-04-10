"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2940],{2653:(e,r,i)=>{i.d(r,{M:()=>a});var n=i(9950),t=i(4492);function a(e){const[r,i]=(0,t.ok)(),a=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[s,o]=(0,n.useState)(a());return[s,(0,n.useCallback)(e=>{o(e),i({tab:e})},[i])]}},2940:(e,r,i)=>{i.r(r),i.d(r,{default:()=>Z});var n=i(9950),t=i(4752),a=i(2853),s=i(8409),o=i(2597),l=i(2653),d=i(5030),c=i(9955),p=i(4414);const x=t.Ay.div`
  min-height: 100vh;
`,u=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,h=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,g=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,f=t.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,j=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,b=t.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,v=t.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,w=t.Ay.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,F=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,A=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,k=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=t.Ay.div`
  flex: 1;
  min-width: 0;
`,q=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,C=t.Ay.div`
  font-size: 14px;
  color: #635BFF;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,B=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
`,P=t.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"in_progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"in_progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,z=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin-left: 8px;
`,I=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
  background: ${e=>{switch(e.type){case"free_trial":return"#ECFDF5";case"pricing":return"#FEF3C7";case"demo":return"#DBEAFE";case"support":return"#FEE2E2";case"partnership":return"#F3E8FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"free_trial":return"#059669";case"pricing":return"#D97706";case"demo":return"#1E40AF";case"support":return"#DC2626";case"partnership":return"#7C3AED";default:return"#6B7280"}}};
`,_=t.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin: 16px 0;
  white-space: pre-wrap;
  word-break: break-word;
`,S=t.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`,D=t.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: #ECFDF5;
  border-radius: 8px;
  border-left: 3px solid #10B981;
`,$=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  margin-bottom: 8px;
`,T=t.Ay.div`
  font-size: 14px;
  color: #065F46;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`,O=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`,R=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,L=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,U=t.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #059669;
  background: #ECFDF5;
  padding: 2px 8px;
  border-radius: 4px;
`,J=t.Ay.button`
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
`,M=t.Ay.div`
  margin-bottom: 20px;
`,N=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,H=t.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Y=t.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`,G=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,K=t.Ay.div`
  font-size: 14px;
`,Q=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,V=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,W=t.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,X=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Z=()=>{const{t:e}=(0,d.Bd)("admin"),[r,i]=(0,n.useState)([]),[t,Z]=(0,n.useState)({total:0,new:0,in_progress:0,resolved:0}),[ee,re]=(0,n.useState)(!0),[ie,ne]=(0,n.useState)(""),[te,ae]=(0,n.useState)("all"),[se,oe]=(0,l.M)("active"),[le,de]=(0,n.useState)(!1),[ce,pe]=(0,n.useState)(null),[xe,ue]=(0,n.useState)(""),[he,ge]=(0,n.useState)(!1),[me,ye]=(0,n.useState)(""),[fe,je]=(0,n.useState)(!0),[be,ve]=(0,n.useState)(!1),[we,Fe]=(0,n.useState)(!1),Ae=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||re(!0);const r=(0,c.c4)(),n=new URLSearchParams;ie&&n.append("search",ie);const[t,a]=await Promise.all([fetch(`/api/public/admin/inquiries?${n}`,{headers:{Authorization:`Bearer ${r}`}}),fetch("/api/public/admin/inquiries-stats",{headers:{Authorization:`Bearer ${r}`}})]);t.ok&&i(await t.json()),a.ok&&Z(await a.json())}catch(r){console.error("Error loading data:",r)}finally{re(!1)}},[ie]);(0,n.useEffect)(()=>{Ae()},[Ae]),(0,n.useEffect)(()=>{const e=setInterval(()=>Ae(!0),1e4);return()=>clearInterval(e)},[Ae]);const ke=r.filter(e=>"new"===e.status||"in_progress"===e.status).length,Ee=r.filter(e=>"resolved"===e.status||"closed"===e.status).length,qe=r.filter(e=>{const r="active"===se?"new"===e.status||"in_progress"===e.status:"resolved"===e.status||"closed"===e.status,i="all"===te||e.status===te;return r&&i}),Ce=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Be=e=>({free_trial:"Free Trial",pricing:"Pricing",demo:"Demo",support:"Support",partnership:"Partnership",other:"Other"}[e]||e);return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(u,{children:(0,p.jsx)(h,{children:e("admin:contactInquiriesPage.contactInquiries")})}),(0,p.jsxs)(g,{children:[(0,p.jsxs)(m,{children:[(0,p.jsxs)(y,{color:"#635BFF",children:[(0,p.jsx)(f,{children:t.total}),(0,p.jsx)(j,{children:e("admin:contactInquiriesPage.totalInquiries")})]}),(0,p.jsxs)(y,{color:"#F59E0B",children:[(0,p.jsx)(f,{children:t.new}),(0,p.jsx)(j,{children:e("admin:contactInquiriesPage.new")})]}),(0,p.jsxs)(y,{color:"#3B82F6",children:[(0,p.jsx)(f,{children:t.in_progress}),(0,p.jsx)(j,{children:e("admin:contactInquiriesPage.inProgress")})]}),(0,p.jsxs)(y,{color:"#10B981",children:[(0,p.jsx)(f,{children:t.resolved}),(0,p.jsx)(j,{children:e("admin:contactInquiriesPage.resolved")})]})]}),(0,p.jsxs)(o.tU,{children:[(0,p.jsxs)(o.oz,{active:"active"===se,onClick:()=>{oe("active"),ae("all")},children:["Active (",ke,")"]}),(0,p.jsxs)(o.oz,{active:"closed"===se,onClick:()=>{oe("closed"),ae("all")},children:["Closed (",Ee,")"]})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(w,{value:te,onChange:e=>ae(e.target.value),children:"active"===se?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("option",{value:"all",children:e("admin:contactInquiriesPage.allStatus")}),(0,p.jsx)("option",{value:"new",children:e("admin:contactInquiriesPage.new")}),(0,p.jsx)("option",{value:"in_progress",children:e("admin:contactInquiriesPage.inProgress")})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("option",{value:"all",children:e("admin:contactInquiriesPage.allStatus")}),(0,p.jsx)("option",{value:"resolved",children:e("admin:contactInquiriesPage.resolved")}),(0,p.jsx)("option",{value:"closed",children:e("admin:contactInquiriesPage.closed")})]})}),(0,p.jsx)(v,{placeholder:"Search by name, email, company...",value:ie,onChange:e=>ne(e.target.value)})]}),ee?(0,p.jsx)(a.pp,{children:e("admin:contactInquiriesPage.loading")}):0===qe.length?(0,p.jsx)(a.pp,{children:e("admin:contactInquiriesPage.noInquiriesFound")}):(0,p.jsx)(F,{children:qe.map(r=>(0,p.jsxs)(A,{onClick:()=>(e=>{pe(e),ue(e.status),de(!0)})(r),children:[(0,p.jsxs)(k,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(q,{children:r.name}),(0,p.jsx)(C,{children:r.email}),r.company_name&&(0,p.jsx)(B,{children:r.company_name})]}),(0,p.jsx)(P,{status:r.status,children:r.status.replace("_"," ")})]}),(0,p.jsx)(S,{children:r.message}),(0,p.jsx)(R,{}),(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:Ce(r.createdAt)}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[r.inquiry_type&&(0,p.jsx)(I,{type:r.inquiry_type,style:{marginLeft:0},children:Be(r.inquiry_type)}),r.reply_message&&(0,p.jsx)(U,{children:e("admin:contactInquiriesPage.replied")}),"active"===se&&(0,p.jsx)(J,{onClick:e=>(async(e,r)=>{r.stopPropagation();try{const r=(0,c.c4)();(await fetch(`/api/public/admin/inquiries/${e}`,{method:"PATCH",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({status:"closed"})})).ok&&i(r=>r.map(r=>r.id===e?{...r,status:"closed"}:r))}catch(n){console.error("Error closing inquiry:",n)}})(r.id,e),children:"Close"})]})]})]},r.id))})]}),le&&ce&&(0,p.jsxs)(s.aF,{isOpen:!0,onClose:()=>de(!1),title:"Inquiry Details",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(X,{variant:"danger",onClick:()=>Fe(!0),children:" Delete "}),(0,p.jsx)("div",{style:{flex:1}})," ",!ce.reply_message&&(0,p.jsx)(X,{variant:"primary",onClick:()=>{ye(""),je(!0),ge(!0)},children:" Reply "})," ",(0,p.jsx)(X,{onClick:()=>de(!1),children:" Close "})]}),children:[(0,p.jsxs)(G,{children:[(0,p.jsxs)(K,{children:[(0,p.jsx)(Q,{children:e("admin:contactInquiriesPage.name")}),(0,p.jsx)(V,{children:ce.name})]}),(0,p.jsxs)(K,{children:[(0,p.jsx)(Q,{children:e("admin:contactInquiriesPage.email")}),(0,p.jsx)(V,{children:ce.email})]}),ce.company_name&&(0,p.jsxs)(K,{children:[(0,p.jsx)(Q,{children:e("admin:contactInquiriesPage.company")}),(0,p.jsx)(V,{children:ce.company_name})]}),ce.phone&&(0,p.jsxs)(K,{children:[(0,p.jsx)(Q,{children:e("admin:contactInquiriesPage.phone")}),(0,p.jsx)(V,{children:ce.phone})]}),ce.inquiry_type&&(0,p.jsxs)(K,{children:[(0,p.jsx)(Q,{children:e("admin:contactInquiriesPage.type")}),(0,p.jsx)(V,{children:(0,p.jsx)(I,{type:ce.inquiry_type,style:{marginLeft:0},children:Be(ce.inquiry_type)})})]}),ce.interested_plan&&(0,p.jsxs)(K,{children:[(0,p.jsx)(Q,{children:e("admin:contactInquiriesPage.interestedPlan")}),(0,p.jsx)(V,{children:(0,p.jsx)(z,{style:{marginLeft:0},children:(Pe=ce.interested_plan,Pe?Pe.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()):null)})})]}),ce.preferred_username&&(0,p.jsxs)(K,{children:[(0,p.jsx)(Q,{children:e("admin:contactInquiriesPage.preferredUsername")}),(0,p.jsx)(V,{children:(0,p.jsx)("strong",{children:ce.preferred_username})})]}),(0,p.jsxs)(K,{children:[(0,p.jsx)(Q,{children:e("admin:contactInquiriesPage.status")}),(0,p.jsx)(V,{children:(0,p.jsxs)(W,{value:xe,onChange:e=>(async e=>{if(ce){ue(e);try{const r=(0,c.c4)();(await fetch(`/api/public/admin/inquiries/${ce.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(i(r=>r.map(r=>r.id===ce.id?{...r,status:e}:r)),pe(r=>r?{...r,status:e}:null))}catch(r){console.error("Error updating status:",r)}}})(e.target.value),children:[(0,p.jsx)("option",{value:"new",children:e("admin:contactInquiriesPage.new")}),(0,p.jsx)("option",{value:"in_progress",children:e("admin:contactInquiriesPage.inProgress")}),(0,p.jsx)("option",{value:"resolved",children:e("admin:contactInquiriesPage.resolved")}),(0,p.jsx)("option",{value:"closed",children:e("admin:contactInquiriesPage.closed")})]})})]}),(0,p.jsxs)(K,{children:[(0,p.jsx)(Q,{children:e("admin:contactInquiriesPage.received")}),(0,p.jsx)(V,{children:Ce(ce.createdAt)})]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(N,{children:e("admin:contactInquiriesPage.message")}),(0,p.jsx)(_,{style:{margin:0},children:ce.message})]}),ce.reply_message&&(0,p.jsxs)(D,{children:[(0,p.jsxs)($,{children:["Reply ",ce.email_sent&&"(Email Sent)"]}),(0,p.jsx)(T,{children:ce.reply_message}),(0,p.jsxs)(O,{children:["Replied by ",ce.replied_by_name," on ",Ce(ce.replied_at)]})]})]}),he&&ce&&(0,p.jsxs)(s.aF,{isOpen:!0,onClose:()=>ge(!1),title:`Reply to ${ce.name}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(X,{onClick:()=>ge(!1),children:" Cancel "}),(0,p.jsxs)(X,{variant:"primary",onClick:async()=>{if(ce&&me.trim()){ve(!0);try{const e=(0,c.c4)();(await fetch(`/api/public/admin/inquiries/${ce.id}/reply`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({reply_message:me,send_email:fe})})).ok&&(ge(!1),de(!1),Ae())}catch(e){console.error("Error sending reply:",e)}finally{ve(!1)}}},disabled:be||!me.trim(),children:[" ",be?"Sending...":fe?"Send Reply & Email":"Save Reply"," "]})]}),children:[(0,p.jsxs)(M,{children:[(0,p.jsx)(N,{children:e("admin:contactInquiriesPage.originalMessage")}),(0,p.jsx)(_,{style:{margin:0},children:ce.message})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(N,{children:e("admin:contactInquiriesPage.yourReply")}),(0,p.jsx)(H,{value:me,onChange:e=>ye(e.target.value),placeholder:"Type your reply here..."})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)("input",{type:"checkbox",checked:fe,onChange:e=>je(e.target.checked)}),"Send reply via email to ",ce.email]})]}),we&&(0,p.jsx)(s.aF,{isOpen:!0,onClose:()=>Fe(!1),title:"Confirm Delete",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(X,{onClick:()=>Fe(!1),children:" Cancel "}),(0,p.jsx)(X,{variant:"danger",onClick:async()=>{if(ce)try{const e=(0,c.c4)();await fetch(`/api/public/admin/inquiries/${ce.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),Fe(!1),de(!1),Ae()}catch(e){console.error("Error deleting inquiry:",e)}},children:" Delete "})]}),children:(0,p.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete this inquiry from ",(0,p.jsx)("strong",{children:null===ce||void 0===ce?void 0:ce.name}),"? This action cannot be undone."]})})]})});var Pe}}}]);