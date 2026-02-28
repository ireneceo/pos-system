"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2940],{2940:(e,r,i)=>{i.r(r),i.d(r,{default:()=>Z});var n=i(9950),t=i(4752),o=i(4414);const s=t.Ay.div`
  min-height: 100vh;
`,a=t.Ay.div`
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
`,l=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,d=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,c=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,x=t.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,h=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,u=t.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,g=t.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,y=t.Ay.select`
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
`,m=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,f=t.Ay.div`
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
`,j=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,b=t.Ay.div`
  flex: 1;
  min-width: 0;
`,v=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,w=t.Ay.div`
  font-size: 14px;
  color: #635BFF;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,F=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
`,A=t.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"in_progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"in_progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,k=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin-left: 8px;
`,E=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
  background: ${e=>{switch(e.type){case"free_trial":return"#ECFDF5";case"pricing":return"#FEF3C7";case"demo":return"#DBEAFE";case"support":return"#FEE2E2";case"partnership":return"#F3E8FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"free_trial":return"#059669";case"pricing":return"#D97706";case"demo":return"#1E40AF";case"support":return"#DC2626";case"partnership":return"#7C3AED";default:return"#6B7280"}}};
`,C=t.Ay.div`
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
`,B=t.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`,_=t.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: #ECFDF5;
  border-radius: 8px;
  border-left: 3px solid #10B981;
`,z=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  margin-bottom: 8px;
`,S=t.Ay.div`
  font-size: 14px;
  color: #065F46;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`,D=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`,q=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,P=t.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #059669;
  background: #ECFDF5;
  padding: 2px 8px;
  border-radius: 4px;
`,$=t.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`,I=t.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 700px;
  width: 90%;
  flex-shrink: 0;
`,R=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,T=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,L=t.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  &:hover { color: #0A2540; }
`,N=t.Ay.div`
  padding: 24px;
`,O=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,U=t.Ay.div`
  margin-bottom: 20px;
`,J=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,M=t.Ay.textarea`
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
`,H=t.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,W=(t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 13px;
  color: #6B7280;
`,t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`),G=t.Ay.div`
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
`,Z=()=>{const[e,r]=(0,n.useState)([]),[i,t]=(0,n.useState)({total:0,new:0,in_progress:0,resolved:0}),[Z,ee]=(0,n.useState)(!0),[re,ie]=(0,n.useState)(""),[ne,te]=(0,n.useState)("all"),[oe,se]=(0,n.useState)(!1),[ae,le]=(0,n.useState)(null),[de,pe]=(0,n.useState)(""),[ce,xe]=(0,n.useState)(!1),[he,ue]=(0,n.useState)(""),[ge,ye]=(0,n.useState)(!0),[me,fe]=(0,n.useState)(!1),[je,be]=(0,n.useState)(!1),ve=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||ee(!0);const i=localStorage.getItem("auth_token"),n=new URLSearchParams;"all"!==ne&&n.append("status",ne),re&&n.append("search",re);const[o,s]=await Promise.all([fetch(`/api/public/admin/inquiries?${n}`,{headers:{Authorization:`Bearer ${i}`}}),fetch("/api/public/admin/inquiries-stats",{headers:{Authorization:`Bearer ${i}`}})]);o.ok&&r(await o.json()),s.ok&&t(await s.json())}catch(i){console.error("Error loading data:",i)}finally{ee(!1)}},[re,ne]);(0,n.useEffect)(()=>{ve()},[ve]),(0,n.useEffect)(()=>{const e=setInterval(()=>ve(!0),1e4);return()=>clearInterval(e)},[ve]);const we=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Fe=e=>({free_trial:"Free Trial",pricing:"Pricing",demo:"Demo",support:"Support",partnership:"Partnership",other:"Other"}[e]||e);return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(s,{children:[(0,o.jsx)(a,{children:(0,o.jsx)(l,{children:"Contact Inquiries"})}),(0,o.jsxs)(d,{children:[(0,o.jsxs)(p,{children:[(0,o.jsxs)(c,{color:"#635BFF",children:[(0,o.jsx)(x,{children:i.total}),(0,o.jsx)(h,{children:"Total Inquiries"})]}),(0,o.jsxs)(c,{color:"#F59E0B",children:[(0,o.jsx)(x,{children:i.new}),(0,o.jsx)(h,{children:"New"})]}),(0,o.jsxs)(c,{color:"#3B82F6",children:[(0,o.jsx)(x,{children:i.in_progress}),(0,o.jsx)(h,{children:"In Progress"})]}),(0,o.jsxs)(c,{color:"#10B981",children:[(0,o.jsx)(x,{children:i.resolved}),(0,o.jsx)(h,{children:"Resolved"})]})]}),(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{placeholder:"Search by name, email, company...",value:re,onChange:e=>ie(e.target.value)}),(0,o.jsxs)(y,{value:ne,onChange:e=>te(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Status"}),(0,o.jsx)("option",{value:"new",children:"New"}),(0,o.jsx)("option",{value:"in_progress",children:"In Progress"}),(0,o.jsx)("option",{value:"resolved",children:"Resolved"}),(0,o.jsx)("option",{value:"closed",children:"Closed"})]})]}),Z?(0,o.jsx)(H,{children:"Loading..."}):0===e.length?(0,o.jsx)(H,{children:"No inquiries found"}):(0,o.jsx)(m,{children:e.map(e=>(0,o.jsxs)(f,{onClick:()=>(e=>{le(e),pe(e.status),se(!0)})(e),children:[(0,o.jsxs)(j,{children:[(0,o.jsxs)(b,{children:[(0,o.jsx)(v,{children:e.name}),(0,o.jsx)(w,{children:e.email}),e.company_name&&(0,o.jsx)(F,{children:e.company_name})]}),(0,o.jsx)(A,{status:e.status,children:e.status.replace("_"," ")})]}),(0,o.jsx)(B,{children:e.message}),(0,o.jsxs)(q,{children:[(0,o.jsx)("span",{children:we(e.createdAt)}),(0,o.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.inquiry_type&&(0,o.jsx)(E,{type:e.inquiry_type,style:{marginLeft:0},children:Fe(e.inquiry_type)}),e.reply_message&&(0,o.jsx)(P,{children:"Replied"})]})]})]},e.id))})]}),oe&&ae&&(0,o.jsx)($,{onClick:()=>se(!1),children:(0,o.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(R,{children:[(0,o.jsx)(T,{children:"Inquiry Details"}),(0,o.jsx)(L,{onClick:()=>se(!1),children:"\xd7"})]}),(0,o.jsxs)(N,{children:[(0,o.jsxs)(W,{children:[(0,o.jsxs)(G,{children:[(0,o.jsx)(K,{children:"Name"}),(0,o.jsx)(Q,{children:ae.name})]}),(0,o.jsxs)(G,{children:[(0,o.jsx)(K,{children:"Email"}),(0,o.jsx)(Q,{children:ae.email})]}),ae.company_name&&(0,o.jsxs)(G,{children:[(0,o.jsx)(K,{children:"Company"}),(0,o.jsx)(Q,{children:ae.company_name})]}),ae.phone&&(0,o.jsxs)(G,{children:[(0,o.jsx)(K,{children:"Phone"}),(0,o.jsx)(Q,{children:ae.phone})]}),ae.inquiry_type&&(0,o.jsxs)(G,{children:[(0,o.jsx)(K,{children:"Type"}),(0,o.jsx)(Q,{children:(0,o.jsx)(E,{type:ae.inquiry_type,style:{marginLeft:0},children:Fe(ae.inquiry_type)})})]}),ae.interested_plan&&(0,o.jsxs)(G,{children:[(0,o.jsx)(K,{children:"Interested Plan"}),(0,o.jsx)(Q,{children:(0,o.jsx)(k,{style:{marginLeft:0},children:(Ae=ae.interested_plan,Ae?Ae.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()):null)})})]}),ae.preferred_username&&(0,o.jsxs)(G,{children:[(0,o.jsx)(K,{children:"Preferred Username"}),(0,o.jsx)(Q,{children:(0,o.jsx)("strong",{children:ae.preferred_username})})]}),(0,o.jsxs)(G,{children:[(0,o.jsx)(K,{children:"Status"}),(0,o.jsx)(Q,{children:(0,o.jsxs)(V,{value:de,onChange:e=>(async e=>{if(ae){pe(e);try{const i=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${ae.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(r(r=>r.map(r=>r.id===ae.id?{...r,status:e}:r)),le(r=>r?{...r,status:e}:null))}catch(i){console.error("Error updating status:",i)}}})(e.target.value),children:[(0,o.jsx)("option",{value:"new",children:"New"}),(0,o.jsx)("option",{value:"in_progress",children:"In Progress"}),(0,o.jsx)("option",{value:"resolved",children:"Resolved"}),(0,o.jsx)("option",{value:"closed",children:"Closed"})]})})]}),(0,o.jsxs)(G,{children:[(0,o.jsx)(K,{children:"Received"}),(0,o.jsx)(Q,{children:we(ae.createdAt)})]})]}),(0,o.jsxs)(U,{children:[(0,o.jsx)(J,{children:"Message"}),(0,o.jsx)(C,{style:{margin:0},children:ae.message})]}),ae.reply_message&&(0,o.jsxs)(_,{children:[(0,o.jsxs)(z,{children:["Reply ",ae.email_sent&&"(Email Sent)"]}),(0,o.jsx)(S,{children:ae.reply_message}),(0,o.jsxs)(D,{children:["Replied by ",ae.replied_by_name," on ",we(ae.replied_at)]})]})]}),(0,o.jsxs)(O,{children:[(0,o.jsx)(X,{variant:"danger",onClick:()=>be(!0),children:"Delete"}),(0,o.jsx)("div",{style:{flex:1}}),!ae.reply_message&&(0,o.jsx)(X,{variant:"primary",onClick:()=>{ue(""),ye(!0),xe(!0)},children:"Reply"}),(0,o.jsx)(X,{onClick:()=>se(!1),children:"Close"})]})]})}),ce&&ae&&(0,o.jsx)($,{onClick:()=>xe(!1),children:(0,o.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(R,{children:[(0,o.jsxs)(T,{children:["Reply to ",ae.name]}),(0,o.jsx)(L,{onClick:()=>xe(!1),children:"\xd7"})]}),(0,o.jsxs)(N,{children:[(0,o.jsxs)(U,{children:[(0,o.jsx)(J,{children:"Original Message"}),(0,o.jsx)(C,{style:{margin:0},children:ae.message})]}),(0,o.jsxs)(U,{children:[(0,o.jsx)(J,{children:"Your Reply"}),(0,o.jsx)(M,{value:he,onChange:e=>ue(e.target.value),placeholder:"Type your reply here..."})]}),(0,o.jsxs)(Y,{children:[(0,o.jsx)("input",{type:"checkbox",checked:ge,onChange:e=>ye(e.target.checked)}),"Send reply via email to ",ae.email]})]}),(0,o.jsxs)(O,{children:[(0,o.jsx)(X,{onClick:()=>xe(!1),children:"Cancel"}),(0,o.jsx)(X,{variant:"primary",onClick:async()=>{if(ae&&he.trim()){fe(!0);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${ae.id}/reply`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({reply_message:he,send_email:ge})})).ok&&(xe(!1),se(!1),ve())}catch(e){console.error("Error sending reply:",e)}finally{fe(!1)}}},disabled:me||!he.trim(),children:me?"Sending...":ge?"Send Reply & Email":"Save Reply"})]})]})}),je&&(0,o.jsx)($,{onClick:()=>be(!1),children:(0,o.jsxs)(I,{onClick:e=>e.stopPropagation(),style:{maxWidth:"420px"},children:[(0,o.jsxs)(R,{children:[(0,o.jsx)(T,{children:"Confirm Delete"}),(0,o.jsx)(L,{onClick:()=>be(!1),children:"\xd7"})]}),(0,o.jsx)(N,{children:(0,o.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete this inquiry from ",(0,o.jsx)("strong",{children:null===ae||void 0===ae?void 0:ae.name}),"? This action cannot be undone."]})}),(0,o.jsxs)(O,{children:[(0,o.jsx)(X,{onClick:()=>be(!1),children:"Cancel"}),(0,o.jsx)(X,{variant:"danger",onClick:async()=>{if(ae)try{const e=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${ae.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),be(!1),se(!1),ve()}catch(e){console.error("Error deleting inquiry:",e)}},children:"Delete"})]})]})})]})});var Ae}}}]);