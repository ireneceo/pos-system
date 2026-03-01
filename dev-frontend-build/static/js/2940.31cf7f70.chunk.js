"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2940],{2940:(e,r,i)=>{i.r(r),i.d(r,{default:()=>Q});var n=i(8819),s=i(9950),t=i(4752),o=i(2674),a=i(4414);const l=t.Ay.div`
  min-height: 100vh;
`,d=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${n.w.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,c=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,p=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,h=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,u=t.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: ${n.w.colors.secondary};
`,g=t.Ay.div`
  font-size: 13px;
  color: ${n.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,m=t.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,y=t.Ay.input`
  padding: 10px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
  }
`,j=t.Ay.select`
  padding: 10px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
  }
`,f=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,w=t.Ay.div`
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
`,b=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,v=t.Ay.div`
  flex: 1;
  min-width: 0;
`,k=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,A=t.Ay.div`
  font-size: 14px;
  color: #635BFF;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,F=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
`,C=t.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"in_progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"in_progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,E=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin-left: 8px;
`,_=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
  background: ${e=>{switch(e.type){case"free_trial":return"#ECFDF5";case"pricing":return"#FEF3C7";case"demo":return"#DBEAFE";case"support":return"#FEE2E2";case"partnership":return"#F3E8FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"free_trial":return"#059669";case"pricing":return"#D97706";case"demo":return"#1E40AF";case"support":return"#DC2626";case"partnership":return"#7C3AED";default:return"#6B7280"}}};
`,$=t.Ay.div`
  font-size: 14px;
  color: ${n.w.colors.text.dark};
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid ${n.w.colors.border};
  margin: 16px 0;
  white-space: pre-wrap;
  word-break: break-word;
`,S=t.Ay.div`
  font-size: 14px;
  color: ${n.w.colors.text.dark};
  line-height: 1.5;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`,z=t.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: ${n.w.colors.status.successLight};
  border-radius: 8px;
  border-left: 3px solid #10B981;
`,B=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${n.w.colors.status.successAlt};
  text-transform: uppercase;
  margin-bottom: 8px;
`,q=t.Ay.div`
  font-size: 14px;
  color: #065F46;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`,D=t.Ay.div`
  font-size: 12px;
  color: ${n.w.colors.text.muted};
  margin-top: 8px;
`,R=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: ${n.w.colors.text.muted};
  flex-wrap: wrap;
  gap: 12px;
`,P=t.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #059669;
  background: #ECFDF5;
  padding: 2px 8px;
  border-radius: 4px;
`,I=t.Ay.label`
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
`,T=t.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: ${n.w.colors.text.muted};
`,L=(t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 13px;
  color: ${n.w.colors.text.muted};
`,t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`),N=t.Ay.div`
  font-size: 14px;
`,J=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,O=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,H=t.Ay.select`
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
`,U=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?`\n    background: ${n.w.colors.primary};\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; }\n  `:"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Q=()=>{const[e,r]=(0,s.useState)([]),[i,n]=(0,s.useState)({total:0,new:0,in_progress:0,resolved:0}),[t,Q]=(0,s.useState)(!0),[M,Y]=(0,s.useState)(""),[W,G]=(0,s.useState)("all"),[K,V]=(0,s.useState)(!1),[X,Z]=(0,s.useState)(null),[ee,re]=(0,s.useState)(""),[ie,ne]=(0,s.useState)(!1),[se,te]=(0,s.useState)(""),[oe,ae]=(0,s.useState)(!0),[le,de]=(0,s.useState)(!1),[ce,pe]=(0,s.useState)(!1),xe=(0,s.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||Q(!0);const i=localStorage.getItem("auth_token"),s=new URLSearchParams;"all"!==W&&s.append("status",W),M&&s.append("search",M);const[t,o]=await Promise.all([fetch(`/api/public/admin/inquiries?${s}`,{headers:{Authorization:`Bearer ${i}`}}),fetch("/api/public/admin/inquiries-stats",{headers:{Authorization:`Bearer ${i}`}})]);t.ok&&r(await t.json()),o.ok&&n(await o.json())}catch(i){console.error("Error loading data:",i)}finally{Q(!1)}},[M,W]);(0,s.useEffect)(()=>{xe()},[xe]),(0,s.useEffect)(()=>{const e=setInterval(()=>xe(!0),1e4);return()=>clearInterval(e)},[xe]);const he=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),ue=e=>({free_trial:"Free Trial",pricing:"Pricing",demo:"Demo",support:"Support",partnership:"Partnership",other:"Other"}[e]||e);return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(l,{children:[(0,a.jsx)(d,{children:(0,a.jsx)(c,{children:"Contact Inquiries"})}),(0,a.jsxs)(p,{children:[(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{color:"#635BFF",children:[(0,a.jsx)(u,{children:i.total}),(0,a.jsx)(g,{children:"Total Inquiries"})]}),(0,a.jsxs)(h,{color:"#F59E0B",children:[(0,a.jsx)(u,{children:i.new}),(0,a.jsx)(g,{children:"New"})]}),(0,a.jsxs)(h,{color:"#3B82F6",children:[(0,a.jsx)(u,{children:i.in_progress}),(0,a.jsx)(g,{children:"In Progress"})]}),(0,a.jsxs)(h,{color:"#10B981",children:[(0,a.jsx)(u,{children:i.resolved}),(0,a.jsx)(g,{children:"Resolved"})]})]}),(0,a.jsxs)(m,{children:[(0,a.jsx)(y,{placeholder:"Search by name, email, company...",value:M,onChange:e=>Y(e.target.value)}),(0,a.jsxs)(j,{value:W,onChange:e=>G(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"new",children:"New"}),(0,a.jsx)("option",{value:"in_progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),t?(0,a.jsx)(T,{children:"Loading..."}):0===e.length?(0,a.jsx)(T,{children:"No inquiries found"}):(0,a.jsx)(f,{children:e.map(e=>(0,a.jsxs)(w,{onClick:()=>(e=>{Z(e),re(e.status),V(!0)})(e),children:[(0,a.jsxs)(b,{children:[(0,a.jsxs)(v,{children:[(0,a.jsx)(k,{children:e.name}),(0,a.jsx)(A,{children:e.email}),e.company_name&&(0,a.jsx)(F,{children:e.company_name})]}),(0,a.jsx)(C,{status:e.status,children:e.status.replace("_"," ")})]}),(0,a.jsx)(S,{children:e.message}),(0,a.jsxs)(R,{children:[(0,a.jsx)("span",{children:he(e.createdAt)}),(0,a.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.inquiry_type&&(0,a.jsx)(_,{type:e.inquiry_type,style:{marginLeft:0},children:ue(e.inquiry_type)}),e.reply_message&&(0,a.jsx)(P,{children:"Replied"})]})]})]},e.id))})]}),K&&X&&(0,a.jsx)(o.mH,{onClick:()=>V(!1),children:(0,a.jsxs)(o.$m,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(o.rQ,{children:[(0,a.jsx)(o.wt,{children:"Inquiry Details"}),(0,a.jsx)(o.Jn,{onClick:()=>V(!1),children:"\xd7"})]}),(0,a.jsxs)(o.cw,{children:[(0,a.jsxs)(L,{children:[(0,a.jsxs)(N,{children:[(0,a.jsx)(J,{children:"Name"}),(0,a.jsx)(O,{children:X.name})]}),(0,a.jsxs)(N,{children:[(0,a.jsx)(J,{children:"Email"}),(0,a.jsx)(O,{children:X.email})]}),X.company_name&&(0,a.jsxs)(N,{children:[(0,a.jsx)(J,{children:"Company"}),(0,a.jsx)(O,{children:X.company_name})]}),X.phone&&(0,a.jsxs)(N,{children:[(0,a.jsx)(J,{children:"Phone"}),(0,a.jsx)(O,{children:X.phone})]}),X.inquiry_type&&(0,a.jsxs)(N,{children:[(0,a.jsx)(J,{children:"Type"}),(0,a.jsx)(O,{children:(0,a.jsx)(_,{type:X.inquiry_type,style:{marginLeft:0},children:ue(X.inquiry_type)})})]}),X.interested_plan&&(0,a.jsxs)(N,{children:[(0,a.jsx)(J,{children:"Interested Plan"}),(0,a.jsx)(O,{children:(0,a.jsx)(E,{style:{marginLeft:0},children:(ge=X.interested_plan,ge?ge.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()):null)})})]}),X.preferred_username&&(0,a.jsxs)(N,{children:[(0,a.jsx)(J,{children:"Preferred Username"}),(0,a.jsx)(O,{children:(0,a.jsx)("strong",{children:X.preferred_username})})]}),(0,a.jsxs)(N,{children:[(0,a.jsx)(J,{children:"Status"}),(0,a.jsx)(O,{children:(0,a.jsxs)(H,{value:ee,onChange:e=>(async e=>{if(X){re(e);try{const i=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${X.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(r(r=>r.map(r=>r.id===X.id?{...r,status:e}:r)),Z(r=>r?{...r,status:e}:null))}catch(i){console.error("Error updating status:",i)}}})(e.target.value),children:[(0,a.jsx)("option",{value:"new",children:"New"}),(0,a.jsx)("option",{value:"in_progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})})]}),(0,a.jsxs)(N,{children:[(0,a.jsx)(J,{children:"Received"}),(0,a.jsx)(O,{children:he(X.createdAt)})]})]}),(0,a.jsxs)(o.gE,{children:[(0,a.jsx)(o.lR,{children:"Message"}),(0,a.jsx)($,{style:{margin:0},children:X.message})]}),X.reply_message&&(0,a.jsxs)(z,{children:[(0,a.jsxs)(B,{children:["Reply ",X.email_sent&&"(Email Sent)"]}),(0,a.jsx)(q,{children:X.reply_message}),(0,a.jsxs)(D,{children:["Replied by ",X.replied_by_name," on ",he(X.replied_at)]})]})]}),(0,a.jsxs)(o.jl,{children:[(0,a.jsx)(U,{variant:"danger",onClick:()=>pe(!0),children:"Delete"}),(0,a.jsx)("div",{style:{flex:1}}),!X.reply_message&&(0,a.jsx)(U,{variant:"primary",onClick:()=>{te(""),ae(!0),ne(!0)},children:"Reply"}),(0,a.jsx)(U,{onClick:()=>V(!1),children:"Close"})]})]})}),ie&&X&&(0,a.jsx)(o.mH,{onClick:()=>ne(!1),children:(0,a.jsxs)(o.$m,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(o.rQ,{children:[(0,a.jsxs)(o.wt,{children:["Reply to ",X.name]}),(0,a.jsx)(o.Jn,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,a.jsxs)(o.cw,{children:[(0,a.jsxs)(o.gE,{children:[(0,a.jsx)(o.lR,{children:"Original Message"}),(0,a.jsx)($,{style:{margin:0},children:X.message})]}),(0,a.jsxs)(o.gE,{children:[(0,a.jsx)(o.lR,{children:"Your Reply"}),(0,a.jsx)(o.Lz,{value:se,onChange:e=>te(e.target.value),placeholder:"Type your reply here..."})]}),(0,a.jsxs)(I,{children:[(0,a.jsx)("input",{type:"checkbox",checked:oe,onChange:e=>ae(e.target.checked)}),"Send reply via email to ",X.email]})]}),(0,a.jsxs)(o.jl,{children:[(0,a.jsx)(U,{onClick:()=>ne(!1),children:"Cancel"}),(0,a.jsx)(U,{variant:"primary",onClick:async()=>{if(X&&se.trim()){de(!0);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${X.id}/reply`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({reply_message:se,send_email:oe})})).ok&&(ne(!1),V(!1),xe())}catch(e){console.error("Error sending reply:",e)}finally{de(!1)}}},disabled:le||!se.trim(),children:le?"Sending...":oe?"Send Reply & Email":"Save Reply"})]})]})}),ce&&(0,a.jsx)(o.mH,{onClick:()=>pe(!1),children:(0,a.jsxs)(o.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"420px"},children:[(0,a.jsxs)(o.rQ,{children:[(0,a.jsx)(o.wt,{children:"Confirm Delete"}),(0,a.jsx)(o.Jn,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,a.jsx)(o.cw,{children:(0,a.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete this inquiry from ",(0,a.jsx)("strong",{children:null===X||void 0===X?void 0:X.name}),"? This action cannot be undone."]})}),(0,a.jsxs)(o.jl,{children:[(0,a.jsx)(U,{onClick:()=>pe(!1),children:"Cancel"}),(0,a.jsx)(U,{variant:"danger",onClick:async()=>{if(X)try{const e=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${X.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),pe(!1),V(!1),xe()}catch(e){console.error("Error deleting inquiry:",e)}},children:"Delete"})]})]})})]})});var ge}}}]);