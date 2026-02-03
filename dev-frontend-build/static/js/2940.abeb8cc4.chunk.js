"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2940],{2940:(e,r,i)=>{i.r(r),i.d(r,{default:()=>K});var n=i(9950),o=i(4752),t=i(3310),a=i(1367),s=i(4414);const d=o.Ay.div`
  min-height: 100vh;
`,l=o.Ay.div`
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
`,p=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,c=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,h=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,g=o.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,u=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,y=o.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,m=o.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,f=o.Ay.select`
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
`,b=o.Ay.div`
  display: grid;
  gap: 20px;
`,j=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,v=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,A=o.Ay.div`
  flex: 1;
`,F=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=o.Ay.div`
  font-size: 14px;
  color: #635BFF;
`,k=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
`,E=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"in_progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"in_progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,B=o.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin-left: 8px;
`,C=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin: 16px 0;
  white-space: pre-wrap;
`,z=o.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: #ECFDF5;
  border-radius: 8px;
  border-left: 3px solid #10B981;
`,S=o.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  margin-bottom: 8px;
`,_=o.Ay.div`
  font-size: 14px;
  color: #065F46;
  line-height: 1.6;
  white-space: pre-wrap;
`,$=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`,R=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,q=o.Ay.div`
  display: flex;
  gap: 8px;
`,I=o.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}
`,P=o.Ay.div`
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
`,D=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,T=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,N=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,L=o.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  &:hover { color: #0A2540; }
`,O=o.Ay.div`
  padding: 24px;
`,U=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,J=o.Ay.div`
  margin-bottom: 20px;
`,M=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,H=o.Ay.textarea`
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
`,Y=o.Ay.label`
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
`,G=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,K=()=>{const{user:e}=(0,a.As)(),[r,i]=(0,n.useState)([]),[o,K]=(0,n.useState)({total:0,new:0,in_progress:0,resolved:0}),[Q,V]=(0,n.useState)(!0),[W,X]=(0,n.useState)(""),[Z,ee]=(0,n.useState)("all"),[re,ie]=(0,n.useState)(!1),[ne,oe]=(0,n.useState)(null),[te,ae]=(0,n.useState)(""),[se,de]=(0,n.useState)(!0),[le,pe]=(0,n.useState)(!1);(0,n.useEffect)(()=>{ce()},[W,Z]);const ce=async()=>{try{const e=localStorage.getItem("auth_token"),r=new URLSearchParams;"all"!==Z&&r.append("status",Z),W&&r.append("search",W);const[n,o]=await Promise.all([fetch(`/api/public/admin/inquiries?${r}`,{headers:{Authorization:`Bearer ${e}`}}),fetch("/api/public/admin/inquiries-stats",{headers:{Authorization:`Bearer ${e}`}})]);n.ok&&i(await n.json()),o.ok&&K(await o.json())}catch(e){console.error("Error loading data:",e)}finally{V(!1)}},xe=async(e,r)=>{try{const i=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${e}`,{method:"PATCH",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({status:r})}),ce()}catch(i){console.error("Error updating status:",i)}},he=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return(0,s.jsx)(t.A,{children:(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{children:(0,s.jsx)(p,{children:"Contact Inquiries"})}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(x,{children:[(0,s.jsxs)(h,{color:"#635BFF",children:[(0,s.jsx)(g,{children:o.total}),(0,s.jsx)(u,{children:"Total Inquiries"})]}),(0,s.jsxs)(h,{color:"#F59E0B",children:[(0,s.jsx)(g,{children:o.new}),(0,s.jsx)(u,{children:"New"})]}),(0,s.jsxs)(h,{color:"#3B82F6",children:[(0,s.jsx)(g,{children:o.in_progress}),(0,s.jsx)(u,{children:"In Progress"})]}),(0,s.jsxs)(h,{color:"#10B981",children:[(0,s.jsx)(g,{children:o.resolved}),(0,s.jsx)(u,{children:"Resolved"})]})]}),(0,s.jsxs)(y,{children:[(0,s.jsx)(m,{placeholder:"Search by name, email, company...",value:W,onChange:e=>X(e.target.value)}),(0,s.jsxs)(f,{value:Z,onChange:e=>ee(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"new",children:"New"}),(0,s.jsx)("option",{value:"in_progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),Q?(0,s.jsx)(G,{children:"Loading..."}):0===r.length?(0,s.jsx)(G,{children:"No inquiries found"}):(0,s.jsx)(b,{children:r.map(e=>{return(0,s.jsxs)(j,{children:[(0,s.jsxs)(v,{children:[(0,s.jsxs)(A,{children:[(0,s.jsxs)(F,{children:[e.name,e.interested_plan&&(0,s.jsx)(B,{children:(r=e.interested_plan,r?r.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()):null)})]}),(0,s.jsx)(w,{children:e.email}),e.company_name&&(0,s.jsx)(k,{children:e.company_name}),e.phone&&(0,s.jsxs)(k,{children:["Phone: ",e.phone]})]}),(0,s.jsx)(E,{status:e.status,children:e.status.replace("_"," ")})]}),(0,s.jsx)(C,{children:e.message}),e.reply_message&&(0,s.jsxs)(z,{children:[(0,s.jsxs)(S,{children:["Reply ",e.email_sent&&"(Email Sent)"]}),(0,s.jsx)(_,{children:e.reply_message}),(0,s.jsxs)($,{children:["Replied by ",e.replied_by_name," on ",he(e.replied_at)]})]}),(0,s.jsxs)(R,{children:[(0,s.jsxs)("span",{children:["Received: ",he(e.createdAt)]}),(0,s.jsxs)(q,{children:["new"===e.status&&(0,s.jsx)(I,{onClick:()=>xe(e.id,"in_progress"),children:"Mark In Progress"}),!e.reply_message&&(0,s.jsx)(I,{variant:"primary",onClick:()=>(e=>{oe(e),ae(""),de(!0),ie(!0)})(e),children:"Reply"}),"closed"!==e.status&&e.reply_message&&(0,s.jsx)(I,{onClick:()=>xe(e.id,"closed"),children:"Close"}),(0,s.jsx)(I,{variant:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this inquiry?"))try{const r=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}}),ce()}catch(r){console.error("Error deleting inquiry:",r)}})(e.id),children:"Delete"})]})]})]},e.id);var r})})]}),re&&ne&&(0,s.jsx)(P,{onClick:()=>ie(!1),children:(0,s.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(T,{children:[(0,s.jsxs)(N,{children:["Reply to ",ne.name]}),(0,s.jsx)(L,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,s.jsxs)(O,{children:[(0,s.jsxs)(J,{children:[(0,s.jsx)(M,{children:"Original Message"}),(0,s.jsx)(C,{style:{margin:0},children:ne.message})]}),(0,s.jsxs)(J,{children:[(0,s.jsx)(M,{children:"Your Reply"}),(0,s.jsx)(H,{value:te,onChange:e=>ae(e.target.value),placeholder:"Type your reply here..."})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)("input",{type:"checkbox",checked:se,onChange:e=>de(e.target.checked)}),"Send reply via email to ",ne.email]})]}),(0,s.jsxs)(U,{children:[(0,s.jsx)(I,{onClick:()=>ie(!1),children:"Cancel"}),(0,s.jsx)(I,{variant:"primary",onClick:async()=>{if(ne&&te.trim()){pe(!0);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/public/admin/inquiries/${ne.id}/reply`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({reply_message:te,send_email:se})});if(r.ok)ie(!1),ce();else{const e=await r.json();alert(e.error||"Failed to send reply")}}catch(e){console.error("Error sending reply:",e),alert("Failed to send reply")}finally{pe(!1)}}},disabled:le||!te.trim(),children:le?"Sending...":se?"Send Reply & Email":"Save Reply"})]})]})})]})})}}}]);