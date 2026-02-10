"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2940],{2940:(e,r,i)=>{i.r(r),i.d(r,{default:()=>Q});var n=i(9950),t=i(4752),o=i(3310),a=i(4414);const s=t.Ay.div`
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
`,l=t.Ay.h1`
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
`,c=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,x=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,h=t.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,u=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,g=t.Ay.div`
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
`,m=t.Ay.select`
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
`,f=t.Ay.div`
  display: grid;
  gap: 20px;
`,b=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,j=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=t.Ay.div`
  flex: 1;
`,v=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=t.Ay.div`
  font-size: 14px;
  color: #635BFF;
`,w=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
`,E=t.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
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
`,B=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
  background: ${e=>{switch(e.type){case"free_trial":return"#ECFDF5";case"pricing":return"#FEF3C7";case"demo":return"#DBEAFE";case"support":return"#FEE2E2";case"partnership":return"#F3E8FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"free_trial":return"#059669";case"pricing":return"#D97706";case"demo":return"#1E40AF";case"support":return"#DC2626";case"partnership":return"#7C3AED";default:return"#6B7280"}}};
`,C=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 13px;
  color: #6B7280;
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
`,z=t.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: #ECFDF5;
  border-radius: 8px;
  border-left: 3px solid #10B981;
`,S=t.Ay.div`
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
`,P=t.Ay.div`
  display: flex;
  gap: 8px;
`,I=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}
`,R=t.Ay.div`
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
`,T=t.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,N=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,O=t.Ay.h2`
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
`,U=t.Ay.div`
  padding: 24px;
`,J=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,M=t.Ay.div`
  margin-bottom: 20px;
`,H=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,Y=t.Ay.textarea`
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
`,G=t.Ay.label`
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
`,K=t.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,Q=()=>{const[e,r]=(0,n.useState)([]),[i,t]=(0,n.useState)({total:0,new:0,in_progress:0,resolved:0}),[Q,V]=(0,n.useState)(!0),[W,X]=(0,n.useState)(""),[Z,ee]=(0,n.useState)("all"),[re,ie]=(0,n.useState)(!1),[ne,te]=(0,n.useState)(null),[oe,ae]=(0,n.useState)(""),[se,de]=(0,n.useState)(!0),[le,pe]=(0,n.useState)(!1),ce=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||V(!0);const i=localStorage.getItem("auth_token"),n=new URLSearchParams;"all"!==Z&&n.append("status",Z),W&&n.append("search",W);const[o,a]=await Promise.all([fetch(`/api/public/admin/inquiries?${n}`,{headers:{Authorization:`Bearer ${i}`}}),fetch("/api/public/admin/inquiries-stats",{headers:{Authorization:`Bearer ${i}`}})]);o.ok&&r(await o.json()),a.ok&&t(await a.json())}catch(i){console.error("Error loading data:",i)}finally{V(!1)}},[W,Z]);(0,n.useEffect)(()=>{ce()},[ce]),(0,n.useEffect)(()=>{const e=setInterval(()=>ce(!0),1e4);return()=>clearInterval(e)},[ce]);const xe=async(e,r)=>{try{const i=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${e}`,{method:"PATCH",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({status:r})}),ce()}catch(i){console.error("Error updating status:",i)}},he=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return(0,a.jsx)(o.A,{children:(0,a.jsxs)(s,{children:[(0,a.jsx)(d,{children:(0,a.jsx)(l,{children:"Contact Inquiries"})}),(0,a.jsxs)(p,{children:[(0,a.jsxs)(c,{children:[(0,a.jsxs)(x,{color:"#635BFF",children:[(0,a.jsx)(h,{children:i.total}),(0,a.jsx)(u,{children:"Total Inquiries"})]}),(0,a.jsxs)(x,{color:"#F59E0B",children:[(0,a.jsx)(h,{children:i.new}),(0,a.jsx)(u,{children:"New"})]}),(0,a.jsxs)(x,{color:"#3B82F6",children:[(0,a.jsx)(h,{children:i.in_progress}),(0,a.jsx)(u,{children:"In Progress"})]}),(0,a.jsxs)(x,{color:"#10B981",children:[(0,a.jsx)(h,{children:i.resolved}),(0,a.jsx)(u,{children:"Resolved"})]})]}),(0,a.jsxs)(g,{children:[(0,a.jsx)(y,{placeholder:"Search by name, email, company...",value:W,onChange:e=>X(e.target.value)}),(0,a.jsxs)(m,{value:Z,onChange:e=>ee(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"new",children:"New"}),(0,a.jsx)("option",{value:"in_progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),Q?(0,a.jsx)(K,{children:"Loading..."}):0===e.length?(0,a.jsx)(K,{children:"No inquiries found"}):(0,a.jsx)(f,{children:e.map(e=>{return(0,a.jsxs)(b,{children:[(0,a.jsxs)(j,{children:[(0,a.jsxs)(F,{children:[(0,a.jsxs)(v,{children:[e.name,e.inquiry_type&&(0,a.jsx)(B,{type:e.inquiry_type,children:(i=e.inquiry_type,{free_trial:"Free Trial",pricing:"Pricing",demo:"Demo",support:"Support",partnership:"Partnership",other:"Other"}[i]||i)}),e.interested_plan&&(0,a.jsx)(k,{children:(r=e.interested_plan,r?r.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()):null)})]}),(0,a.jsx)(A,{children:e.email}),e.company_name&&(0,a.jsx)(w,{children:e.company_name}),e.phone&&(0,a.jsxs)(C,{children:["Phone: ",e.phone]}),e.preferred_username&&(0,a.jsxs)(C,{children:["Preferred Username: ",(0,a.jsx)("strong",{children:e.preferred_username})]})]}),(0,a.jsx)(E,{status:e.status,children:e.status.replace("_"," ")})]}),(0,a.jsx)(_,{children:e.message}),e.reply_message&&(0,a.jsxs)(z,{children:[(0,a.jsxs)(S,{children:["Reply ",e.email_sent&&"(Email Sent)"]}),(0,a.jsx)($,{children:e.reply_message}),(0,a.jsxs)(D,{children:["Replied by ",e.replied_by_name," on ",he(e.replied_at)]})]}),(0,a.jsxs)(q,{children:[(0,a.jsxs)("span",{children:["Received: ",he(e.createdAt)]}),(0,a.jsxs)(P,{children:["new"===e.status&&(0,a.jsx)(I,{onClick:()=>xe(e.id,"in_progress"),children:"Mark In Progress"}),!e.reply_message&&(0,a.jsx)(I,{variant:"primary",onClick:()=>(e=>{te(e),ae(""),de(!0),ie(!0)})(e),children:"Reply"}),"closed"!==e.status&&e.reply_message&&(0,a.jsx)(I,{onClick:()=>xe(e.id,"closed"),children:"Close"}),(0,a.jsx)(I,{variant:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this inquiry?"))try{const r=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}}),ce()}catch(r){console.error("Error deleting inquiry:",r)}})(e.id),children:"Delete"})]})]})]},e.id);var r,i})})]}),re&&ne&&(0,a.jsx)(R,{onClick:()=>ie(!1),children:(0,a.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(N,{children:[(0,a.jsxs)(O,{children:["Reply to ",ne.name]}),(0,a.jsx)(L,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,a.jsxs)(U,{children:[(0,a.jsxs)(M,{children:[(0,a.jsx)(H,{children:"Original Message"}),(0,a.jsx)(_,{style:{margin:0},children:ne.message})]}),(0,a.jsxs)(M,{children:[(0,a.jsx)(H,{children:"Your Reply"}),(0,a.jsx)(Y,{value:oe,onChange:e=>ae(e.target.value),placeholder:"Type your reply here..."})]}),(0,a.jsxs)(G,{children:[(0,a.jsx)("input",{type:"checkbox",checked:se,onChange:e=>de(e.target.checked)}),"Send reply via email to ",ne.email]})]}),(0,a.jsxs)(J,{children:[(0,a.jsx)(I,{onClick:()=>ie(!1),children:"Cancel"}),(0,a.jsx)(I,{variant:"primary",onClick:async()=>{if(ne&&oe.trim()){pe(!0);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/public/admin/inquiries/${ne.id}/reply`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({reply_message:oe,send_email:se})});if(r.ok)ie(!1),ce();else{const e=await r.json();alert(e.error||"Failed to send reply")}}catch(e){console.error("Error sending reply:",e),alert("Failed to send reply")}finally{pe(!1)}}},disabled:le||!oe.trim(),children:le?"Sending...":se?"Send Reply & Email":"Save Reply"})]})]})})]})})}}}]);