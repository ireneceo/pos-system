"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2940],{2653:(e,r,i)=>{i.d(r,{M:()=>a});var n=i(9950),t=i(4492);function a(e){const[r,i]=(0,t.ok)(),a=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[s,o]=(0,n.useState)(a());return[s,(0,n.useCallback)(e=>{o(e),i({tab:e})},[i])]}},2940:(e,r,i)=>{i.r(r),i.d(r,{default:()=>X});var n=i(9950),t=i(4752),a=i(2853),s=i(8409),o=i(2597),l=i(2653),d=i(5030),c=i(4414);const p=t.Ay.div`
  min-height: 100vh;
`,x=t.Ay.div`
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
`,u=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,h=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,y=t.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,f=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,j=t.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,b=t.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,v=t.Ay.select`
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
`,w=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,F=t.Ay.div`
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
`,A=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,k=t.Ay.div`
  flex: 1;
  min-width: 0;
`,E=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,q=t.Ay.div`
  font-size: 14px;
  color: #635BFF;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,C=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
`,B=t.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"in_progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"in_progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,I=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin-left: 8px;
`,P=t.Ay.span`
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
`,z=t.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`,S=t.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: #ECFDF5;
  border-radius: 8px;
  border-left: 3px solid #10B981;
`,D=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  margin-bottom: 8px;
`,$=t.Ay.div`
  font-size: 14px;
  color: #065F46;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`,T=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`,O=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,R=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,L=t.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #059669;
  background: #ECFDF5;
  padding: 2px 8px;
  border-radius: 4px;
`,U=t.Ay.button`
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
`,J=t.Ay.div`
  margin-bottom: 20px;
`,M=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,N=t.Ay.textarea`
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
`,H=t.Ay.label`
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
`,Y=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,G=t.Ay.div`
  font-size: 14px;
`,K=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,Q=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,V=t.Ay.select`
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
`,W=t.Ay.button`
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
`,X=()=>{const{t:e}=(0,d.Bd)("admin"),[r,i]=(0,n.useState)([]),[t,X]=(0,n.useState)({total:0,new:0,in_progress:0,resolved:0}),[Z,ee]=(0,n.useState)(!0),[re,ie]=(0,n.useState)(""),[ne,te]=(0,n.useState)("all"),[ae,se]=(0,l.M)("active"),[oe,le]=(0,n.useState)(!1),[de,ce]=(0,n.useState)(null),[pe,xe]=(0,n.useState)(""),[ue,he]=(0,n.useState)(!1),[ge,me]=(0,n.useState)(""),[ye,fe]=(0,n.useState)(!0),[je,be]=(0,n.useState)(!1),[ve,we]=(0,n.useState)(!1),Fe=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||ee(!0);const r=localStorage.getItem("auth_token"),n=new URLSearchParams;re&&n.append("search",re);const[t,a]=await Promise.all([fetch(`/api/public/admin/inquiries?${n}`,{headers:{Authorization:`Bearer ${r}`}}),fetch("/api/public/admin/inquiries-stats",{headers:{Authorization:`Bearer ${r}`}})]);t.ok&&i(await t.json()),a.ok&&X(await a.json())}catch(r){console.error("Error loading data:",r)}finally{ee(!1)}},[re]);(0,n.useEffect)(()=>{Fe()},[Fe]),(0,n.useEffect)(()=>{const e=setInterval(()=>Fe(!0),1e4);return()=>clearInterval(e)},[Fe]);const Ae=r.filter(e=>"new"===e.status||"in_progress"===e.status).length,ke=r.filter(e=>"resolved"===e.status||"closed"===e.status).length,Ee=r.filter(e=>{const r="active"===ae?"new"===e.status||"in_progress"===e.status:"resolved"===e.status||"closed"===e.status,i="all"===ne||e.status===ne;return r&&i}),qe=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Ce=e=>({free_trial:"Free Trial",pricing:"Pricing",demo:"Demo",support:"Support",partnership:"Partnership",other:"Other"}[e]||e);return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:(0,c.jsx)(u,{children:e("admin:contactInquiriesPage.contactInquiries")})}),(0,c.jsxs)(h,{children:[(0,c.jsxs)(g,{children:[(0,c.jsxs)(m,{color:"#635BFF",children:[(0,c.jsx)(y,{children:t.total}),(0,c.jsx)(f,{children:e("admin:contactInquiriesPage.totalInquiries")})]}),(0,c.jsxs)(m,{color:"#F59E0B",children:[(0,c.jsx)(y,{children:t.new}),(0,c.jsx)(f,{children:e("admin:contactInquiriesPage.new")})]}),(0,c.jsxs)(m,{color:"#3B82F6",children:[(0,c.jsx)(y,{children:t.in_progress}),(0,c.jsx)(f,{children:e("admin:contactInquiriesPage.inProgress")})]}),(0,c.jsxs)(m,{color:"#10B981",children:[(0,c.jsx)(y,{children:t.resolved}),(0,c.jsx)(f,{children:e("admin:contactInquiriesPage.resolved")})]})]}),(0,c.jsxs)(o.tU,{children:[(0,c.jsxs)(o.oz,{active:"active"===ae,onClick:()=>{se("active"),te("all")},children:["Active (",Ae,")"]}),(0,c.jsxs)(o.oz,{active:"closed"===ae,onClick:()=>{se("closed"),te("all")},children:["Closed (",ke,")"]})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(v,{value:ne,onChange:e=>te(e.target.value),children:"active"===ae?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("option",{value:"all",children:e("admin:contactInquiriesPage.allStatus")}),(0,c.jsx)("option",{value:"new",children:e("admin:contactInquiriesPage.new")}),(0,c.jsx)("option",{value:"in_progress",children:e("admin:contactInquiriesPage.inProgress")})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("option",{value:"all",children:e("admin:contactInquiriesPage.allStatus")}),(0,c.jsx)("option",{value:"resolved",children:e("admin:contactInquiriesPage.resolved")}),(0,c.jsx)("option",{value:"closed",children:e("admin:contactInquiriesPage.closed")})]})}),(0,c.jsx)(b,{placeholder:"Search by name, email, company...",value:re,onChange:e=>ie(e.target.value)})]}),Z?(0,c.jsx)(a.pp,{children:e("admin:contactInquiriesPage.loading")}):0===Ee.length?(0,c.jsx)(a.pp,{children:e("admin:contactInquiriesPage.noInquiriesFound")}):(0,c.jsx)(w,{children:Ee.map(r=>(0,c.jsxs)(F,{onClick:()=>(e=>{ce(e),xe(e.status),le(!0)})(r),children:[(0,c.jsxs)(A,{children:[(0,c.jsxs)(k,{children:[(0,c.jsx)(E,{children:r.name}),(0,c.jsx)(q,{children:r.email}),r.company_name&&(0,c.jsx)(C,{children:r.company_name})]}),(0,c.jsx)(B,{status:r.status,children:r.status.replace("_"," ")})]}),(0,c.jsx)(z,{children:r.message}),(0,c.jsx)(O,{}),(0,c.jsxs)(R,{children:[(0,c.jsx)("span",{children:qe(r.createdAt)}),(0,c.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[r.inquiry_type&&(0,c.jsx)(P,{type:r.inquiry_type,style:{marginLeft:0},children:Ce(r.inquiry_type)}),r.reply_message&&(0,c.jsx)(L,{children:e("admin:contactInquiriesPage.replied")}),"active"===ae&&(0,c.jsx)(U,{onClick:e=>(async(e,r)=>{r.stopPropagation();try{const r=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${e}`,{method:"PATCH",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({status:"closed"})})).ok&&i(r=>r.map(r=>r.id===e?{...r,status:"closed"}:r))}catch(n){console.error("Error closing inquiry:",n)}})(r.id,e),children:"Close"})]})]})]},r.id))})]}),oe&&de&&(0,c.jsxs)(s.aF,{isOpen:!0,onClose:()=>le(!1),title:"Inquiry Details",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(W,{variant:"danger",onClick:()=>we(!0),children:" Delete "}),(0,c.jsx)("div",{style:{flex:1}})," ",!de.reply_message&&(0,c.jsx)(W,{variant:"primary",onClick:()=>{me(""),fe(!0),he(!0)},children:" Reply "})," ",(0,c.jsx)(W,{onClick:()=>le(!1),children:" Close "})]}),children:[(0,c.jsxs)(Y,{children:[(0,c.jsxs)(G,{children:[(0,c.jsx)(K,{children:e("admin:contactInquiriesPage.name")}),(0,c.jsx)(Q,{children:de.name})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)(K,{children:e("admin:contactInquiriesPage.email")}),(0,c.jsx)(Q,{children:de.email})]}),de.company_name&&(0,c.jsxs)(G,{children:[(0,c.jsx)(K,{children:e("admin:contactInquiriesPage.company")}),(0,c.jsx)(Q,{children:de.company_name})]}),de.phone&&(0,c.jsxs)(G,{children:[(0,c.jsx)(K,{children:e("admin:contactInquiriesPage.phone")}),(0,c.jsx)(Q,{children:de.phone})]}),de.inquiry_type&&(0,c.jsxs)(G,{children:[(0,c.jsx)(K,{children:e("admin:contactInquiriesPage.type")}),(0,c.jsx)(Q,{children:(0,c.jsx)(P,{type:de.inquiry_type,style:{marginLeft:0},children:Ce(de.inquiry_type)})})]}),de.interested_plan&&(0,c.jsxs)(G,{children:[(0,c.jsx)(K,{children:e("admin:contactInquiriesPage.interestedPlan")}),(0,c.jsx)(Q,{children:(0,c.jsx)(I,{style:{marginLeft:0},children:(Be=de.interested_plan,Be?Be.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()):null)})})]}),de.preferred_username&&(0,c.jsxs)(G,{children:[(0,c.jsx)(K,{children:e("admin:contactInquiriesPage.preferredUsername")}),(0,c.jsx)(Q,{children:(0,c.jsx)("strong",{children:de.preferred_username})})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)(K,{children:e("admin:contactInquiriesPage.status")}),(0,c.jsx)(Q,{children:(0,c.jsxs)(V,{value:pe,onChange:e=>(async e=>{if(de){xe(e);try{const r=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${de.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(i(r=>r.map(r=>r.id===de.id?{...r,status:e}:r)),ce(r=>r?{...r,status:e}:null))}catch(r){console.error("Error updating status:",r)}}})(e.target.value),children:[(0,c.jsx)("option",{value:"new",children:e("admin:contactInquiriesPage.new")}),(0,c.jsx)("option",{value:"in_progress",children:e("admin:contactInquiriesPage.inProgress")}),(0,c.jsx)("option",{value:"resolved",children:e("admin:contactInquiriesPage.resolved")}),(0,c.jsx)("option",{value:"closed",children:e("admin:contactInquiriesPage.closed")})]})})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)(K,{children:e("admin:contactInquiriesPage.received")}),(0,c.jsx)(Q,{children:qe(de.createdAt)})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(M,{children:e("admin:contactInquiriesPage.message")}),(0,c.jsx)(_,{style:{margin:0},children:de.message})]}),de.reply_message&&(0,c.jsxs)(S,{children:[(0,c.jsxs)(D,{children:["Reply ",de.email_sent&&"(Email Sent)"]}),(0,c.jsx)($,{children:de.reply_message}),(0,c.jsxs)(T,{children:["Replied by ",de.replied_by_name," on ",qe(de.replied_at)]})]})]}),ue&&de&&(0,c.jsxs)(s.aF,{isOpen:!0,onClose:()=>he(!1),title:`Reply to ${de.name}`,footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(W,{onClick:()=>he(!1),children:" Cancel "}),(0,c.jsxs)(W,{variant:"primary",onClick:async()=>{if(de&&ge.trim()){be(!0);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${de.id}/reply`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({reply_message:ge,send_email:ye})})).ok&&(he(!1),le(!1),Fe())}catch(e){console.error("Error sending reply:",e)}finally{be(!1)}}},disabled:je||!ge.trim(),children:[" ",je?"Sending...":ye?"Send Reply & Email":"Save Reply"," "]})]}),children:[(0,c.jsxs)(J,{children:[(0,c.jsx)(M,{children:e("admin:contactInquiriesPage.originalMessage")}),(0,c.jsx)(_,{style:{margin:0},children:de.message})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(M,{children:e("admin:contactInquiriesPage.yourReply")}),(0,c.jsx)(N,{value:ge,onChange:e=>me(e.target.value),placeholder:"Type your reply here..."})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",checked:ye,onChange:e=>fe(e.target.checked)}),"Send reply via email to ",de.email]})]}),ve&&(0,c.jsx)(s.aF,{isOpen:!0,onClose:()=>we(!1),title:"Confirm Delete",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(W,{onClick:()=>we(!1),children:" Cancel "}),(0,c.jsx)(W,{variant:"danger",onClick:async()=>{if(de)try{const e=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${de.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),we(!1),le(!1),Fe()}catch(e){console.error("Error deleting inquiry:",e)}},children:" Delete "})]}),children:(0,c.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete this inquiry from ",(0,c.jsx)("strong",{children:null===de||void 0===de?void 0:de.name}),"? This action cannot be undone."]})})]})});var Be}}}]);