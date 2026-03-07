"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2940],{2940:(e,r,i)=>{i.r(r),i.d(r,{default:()=>G});var n=i(9950),t=i(4752),s=i(2853),o=i(8409),a=i(4414);const l=t.Ay.div`
  min-height: 100vh;
`,d=t.Ay.div`
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
`,p=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,c=t.Ay.div`
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
  color: #0A2540;
`,g=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
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
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,f=t.Ay.select`
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
`,j=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,b=t.Ay.div`
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
`,v=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=t.Ay.div`
  flex: 1;
  min-width: 0;
`,F=t.Ay.div`
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
`,k=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
`,E=t.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"in_progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"in_progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,C=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin-left: 8px;
`,B=t.Ay.span`
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
`,q=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  margin-bottom: 8px;
`,D=t.Ay.div`
  font-size: 14px;
  color: #065F46;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`,I=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`,$=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,R=t.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #059669;
  background: #ECFDF5;
  padding: 2px 8px;
  border-radius: 4px;
`,P=t.Ay.div`
  margin-bottom: 20px;
`,T=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,O=t.Ay.textarea`
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
`,L=t.Ay.label`
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
`,N=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,U=t.Ay.div`
  font-size: 14px;
`,J=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,M=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,Y=t.Ay.select`
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
`,H=t.Ay.button`
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
`,G=()=>{const[e,r]=(0,n.useState)([]),[i,t]=(0,n.useState)({total:0,new:0,in_progress:0,resolved:0}),[G,K]=(0,n.useState)(!0),[Q,V]=(0,n.useState)(""),[W,X]=(0,n.useState)("all"),[Z,ee]=(0,n.useState)(!1),[re,ie]=(0,n.useState)(null),[ne,te]=(0,n.useState)(""),[se,oe]=(0,n.useState)(!1),[ae,le]=(0,n.useState)(""),[de,pe]=(0,n.useState)(!0),[ce,xe]=(0,n.useState)(!1),[he,ue]=(0,n.useState)(!1),ge=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||K(!0);const i=localStorage.getItem("auth_token"),n=new URLSearchParams;"all"!==W&&n.append("status",W),Q&&n.append("search",Q);const[s,o]=await Promise.all([fetch(`/api/public/admin/inquiries?${n}`,{headers:{Authorization:`Bearer ${i}`}}),fetch("/api/public/admin/inquiries-stats",{headers:{Authorization:`Bearer ${i}`}})]);s.ok&&r(await s.json()),o.ok&&t(await o.json())}catch(i){console.error("Error loading data:",i)}finally{K(!1)}},[Q,W]);(0,n.useEffect)(()=>{ge()},[ge]),(0,n.useEffect)(()=>{const e=setInterval(()=>ge(!0),1e4);return()=>clearInterval(e)},[ge]);const me=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),ye=e=>({free_trial:"Free Trial",pricing:"Pricing",demo:"Demo",support:"Support",partnership:"Partnership",other:"Other"}[e]||e);return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(l,{children:[(0,a.jsx)(d,{children:(0,a.jsx)(p,{children:"Contact Inquiries"})}),(0,a.jsxs)(c,{children:[(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{color:"#635BFF",children:[(0,a.jsx)(u,{children:i.total}),(0,a.jsx)(g,{children:"Total Inquiries"})]}),(0,a.jsxs)(h,{color:"#F59E0B",children:[(0,a.jsx)(u,{children:i.new}),(0,a.jsx)(g,{children:"New"})]}),(0,a.jsxs)(h,{color:"#3B82F6",children:[(0,a.jsx)(u,{children:i.in_progress}),(0,a.jsx)(g,{children:"In Progress"})]}),(0,a.jsxs)(h,{color:"#10B981",children:[(0,a.jsx)(u,{children:i.resolved}),(0,a.jsx)(g,{children:"Resolved"})]})]}),(0,a.jsxs)(m,{children:[(0,a.jsxs)(f,{value:W,onChange:e=>X(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"new",children:"New"}),(0,a.jsx)("option",{value:"in_progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]}),(0,a.jsx)(y,{placeholder:"Search by name, email, company...",value:Q,onChange:e=>V(e.target.value)})]}),G?(0,a.jsx)(s.pp,{children:"Loading..."}):0===e.length?(0,a.jsx)(s.pp,{children:"No inquiries found"}):(0,a.jsx)(j,{children:e.map(e=>(0,a.jsxs)(b,{onClick:()=>(e=>{ie(e),te(e.status),ee(!0)})(e),children:[(0,a.jsxs)(v,{children:[(0,a.jsxs)(w,{children:[(0,a.jsx)(F,{children:e.name}),(0,a.jsx)(A,{children:e.email}),e.company_name&&(0,a.jsx)(k,{children:e.company_name})]}),(0,a.jsx)(E,{status:e.status,children:e.status.replace("_"," ")})]}),(0,a.jsx)(z,{children:e.message}),(0,a.jsxs)($,{children:[(0,a.jsx)("span",{children:me(e.createdAt)}),(0,a.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.inquiry_type&&(0,a.jsx)(B,{type:e.inquiry_type,style:{marginLeft:0},children:ye(e.inquiry_type)}),e.reply_message&&(0,a.jsx)(R,{children:"Replied"})]})]})]},e.id))})]}),Z&&re&&(0,a.jsxs)(o.aF,{isOpen:!0,onClose:()=>ee(!1),title:"Inquiry Details",footer:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(H,{variant:"danger",onClick:()=>ue(!0),children:" Delete "}),(0,a.jsx)("div",{style:{flex:1}})," ",!re.reply_message&&(0,a.jsx)(H,{variant:"primary",onClick:()=>{le(""),pe(!0),oe(!0)},children:" Reply "})," ",(0,a.jsx)(H,{onClick:()=>ee(!1),children:" Close "})]}),children:[(0,a.jsxs)(N,{children:[(0,a.jsxs)(U,{children:[(0,a.jsx)(J,{children:"Name"}),(0,a.jsx)(M,{children:re.name})]}),(0,a.jsxs)(U,{children:[(0,a.jsx)(J,{children:"Email"}),(0,a.jsx)(M,{children:re.email})]}),re.company_name&&(0,a.jsxs)(U,{children:[(0,a.jsx)(J,{children:"Company"}),(0,a.jsx)(M,{children:re.company_name})]}),re.phone&&(0,a.jsxs)(U,{children:[(0,a.jsx)(J,{children:"Phone"}),(0,a.jsx)(M,{children:re.phone})]}),re.inquiry_type&&(0,a.jsxs)(U,{children:[(0,a.jsx)(J,{children:"Type"}),(0,a.jsx)(M,{children:(0,a.jsx)(B,{type:re.inquiry_type,style:{marginLeft:0},children:ye(re.inquiry_type)})})]}),re.interested_plan&&(0,a.jsxs)(U,{children:[(0,a.jsx)(J,{children:"Interested Plan"}),(0,a.jsx)(M,{children:(0,a.jsx)(C,{style:{marginLeft:0},children:(fe=re.interested_plan,fe?fe.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()):null)})})]}),re.preferred_username&&(0,a.jsxs)(U,{children:[(0,a.jsx)(J,{children:"Preferred Username"}),(0,a.jsx)(M,{children:(0,a.jsx)("strong",{children:re.preferred_username})})]}),(0,a.jsxs)(U,{children:[(0,a.jsx)(J,{children:"Status"}),(0,a.jsx)(M,{children:(0,a.jsxs)(Y,{value:ne,onChange:e=>(async e=>{if(re){te(e);try{const i=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${re.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(r(r=>r.map(r=>r.id===re.id?{...r,status:e}:r)),ie(r=>r?{...r,status:e}:null))}catch(i){console.error("Error updating status:",i)}}})(e.target.value),children:[(0,a.jsx)("option",{value:"new",children:"New"}),(0,a.jsx)("option",{value:"in_progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})})]}),(0,a.jsxs)(U,{children:[(0,a.jsx)(J,{children:"Received"}),(0,a.jsx)(M,{children:me(re.createdAt)})]})]}),(0,a.jsxs)(P,{children:[(0,a.jsx)(T,{children:"Message"}),(0,a.jsx)(_,{style:{margin:0},children:re.message})]}),re.reply_message&&(0,a.jsxs)(S,{children:[(0,a.jsxs)(q,{children:["Reply ",re.email_sent&&"(Email Sent)"]}),(0,a.jsx)(D,{children:re.reply_message}),(0,a.jsxs)(I,{children:["Replied by ",re.replied_by_name," on ",me(re.replied_at)]})]})]}),se&&re&&(0,a.jsxs)(o.aF,{isOpen:!0,onClose:()=>oe(!1),title:"Reply to {selectedInquiry.name}",footer:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(H,{onClick:()=>oe(!1),children:" Cancel "}),(0,a.jsxs)(H,{variant:"primary",onClick:async()=>{if(re&&ae.trim()){xe(!0);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${re.id}/reply`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({reply_message:ae,send_email:de})})).ok&&(oe(!1),ee(!1),ge())}catch(e){console.error("Error sending reply:",e)}finally{xe(!1)}}},disabled:ce||!ae.trim(),children:[" ",ce?"Sending...":de?"Send Reply & Email":"Save Reply"," "]})]}),children:[(0,a.jsxs)(P,{children:[(0,a.jsx)(T,{children:"Original Message"}),(0,a.jsx)(_,{style:{margin:0},children:re.message})]}),(0,a.jsxs)(P,{children:[(0,a.jsx)(T,{children:"Your Reply"}),(0,a.jsx)(O,{value:ae,onChange:e=>le(e.target.value),placeholder:"Type your reply here..."})]}),(0,a.jsxs)(L,{children:[(0,a.jsx)("input",{type:"checkbox",checked:de,onChange:e=>pe(e.target.checked)}),"Send reply via email to ",re.email]})]}),he&&(0,a.jsx)(o.aF,{isOpen:!0,onClose:()=>ue(!1),title:"Confirm Delete",footer:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(H,{onClick:()=>ue(!1),children:" Cancel "}),(0,a.jsx)(H,{variant:"danger",onClick:async()=>{if(re)try{const e=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${re.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),ue(!1),ee(!1),ge()}catch(e){console.error("Error deleting inquiry:",e)}},children:" Delete "})]}),children:(0,a.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete this inquiry from ",(0,a.jsx)("strong",{children:null===re||void 0===re?void 0:re.name}),"? This action cannot be undone."]})})]})});var fe}}}]);