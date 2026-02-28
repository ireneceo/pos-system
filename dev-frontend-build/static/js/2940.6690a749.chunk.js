"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2940],{2940:(e,r,i)=>{i.r(r),i.d(r,{default:()=>K});var n=i(9950),t=i(4752),o=i(4414);const a=t.Ay.div`
  min-height: 100vh;
`,s=t.Ay.div`
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
`,d=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,l=t.Ay.div`
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
  gap: 20px;
`,f=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,b=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,j=t.Ay.div`
  flex: 1;
`,F=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=t.Ay.div`
  font-size: 14px;
  color: #635BFF;
`,A=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
`,w=t.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
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
`,k=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
  background: ${e=>{switch(e.type){case"free_trial":return"#ECFDF5";case"pricing":return"#FEF3C7";case"demo":return"#DBEAFE";case"support":return"#FEE2E2";case"partnership":return"#F3E8FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"free_trial":return"#059669";case"pricing":return"#D97706";case"demo":return"#1E40AF";case"support":return"#DC2626";case"partnership":return"#7C3AED";default:return"#6B7280"}}};
`,B=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 13px;
  color: #6B7280;
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
`,$=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`,D=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,q=t.Ay.div`
  display: flex;
  gap: 8px;
`,P=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}
`,I=t.Ay.div`
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
`,R=t.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,T=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,N=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,O=t.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  &:hover { color: #0A2540; }
`,L=t.Ay.div`
  padding: 24px;
`,U=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,J=t.Ay.div`
  margin-bottom: 20px;
`,M=t.Ay.label`
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
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,K=()=>{const[e,r]=(0,n.useState)([]),[i,t]=(0,n.useState)({total:0,new:0,in_progress:0,resolved:0}),[K,Q]=(0,n.useState)(!0),[V,W]=(0,n.useState)(""),[X,Z]=(0,n.useState)("all"),[ee,re]=(0,n.useState)(!1),[ie,ne]=(0,n.useState)(null),[te,oe]=(0,n.useState)(""),[ae,se]=(0,n.useState)(!0),[de,le]=(0,n.useState)(!1),pe=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||Q(!0);const i=localStorage.getItem("auth_token"),n=new URLSearchParams;"all"!==X&&n.append("status",X),V&&n.append("search",V);const[o,a]=await Promise.all([fetch(`/api/public/admin/inquiries?${n}`,{headers:{Authorization:`Bearer ${i}`}}),fetch("/api/public/admin/inquiries-stats",{headers:{Authorization:`Bearer ${i}`}})]);o.ok&&r(await o.json()),a.ok&&t(await a.json())}catch(i){console.error("Error loading data:",i)}finally{Q(!1)}},[V,X]);(0,n.useEffect)(()=>{pe()},[pe]),(0,n.useEffect)(()=>{const e=setInterval(()=>pe(!0),1e4);return()=>clearInterval(e)},[pe]);const ce=async(e,r)=>{try{const i=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${e}`,{method:"PATCH",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({status:r})}),pe()}catch(i){console.error("Error updating status:",i)}},xe=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(a,{children:[(0,o.jsx)(s,{children:(0,o.jsx)(d,{children:"Contact Inquiries"})}),(0,o.jsxs)(l,{children:[(0,o.jsxs)(p,{children:[(0,o.jsxs)(c,{color:"#635BFF",children:[(0,o.jsx)(x,{children:i.total}),(0,o.jsx)(h,{children:"Total Inquiries"})]}),(0,o.jsxs)(c,{color:"#F59E0B",children:[(0,o.jsx)(x,{children:i.new}),(0,o.jsx)(h,{children:"New"})]}),(0,o.jsxs)(c,{color:"#3B82F6",children:[(0,o.jsx)(x,{children:i.in_progress}),(0,o.jsx)(h,{children:"In Progress"})]}),(0,o.jsxs)(c,{color:"#10B981",children:[(0,o.jsx)(x,{children:i.resolved}),(0,o.jsx)(h,{children:"Resolved"})]})]}),(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{placeholder:"Search by name, email, company...",value:V,onChange:e=>W(e.target.value)}),(0,o.jsxs)(y,{value:X,onChange:e=>Z(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Status"}),(0,o.jsx)("option",{value:"new",children:"New"}),(0,o.jsx)("option",{value:"in_progress",children:"In Progress"}),(0,o.jsx)("option",{value:"resolved",children:"Resolved"}),(0,o.jsx)("option",{value:"closed",children:"Closed"})]})]}),K?(0,o.jsx)(G,{children:"Loading..."}):0===e.length?(0,o.jsx)(G,{children:"No inquiries found"}):(0,o.jsx)(m,{children:e.map(e=>{return(0,o.jsxs)(f,{children:[(0,o.jsxs)(b,{children:[(0,o.jsxs)(j,{children:[(0,o.jsxs)(F,{children:[e.name,e.inquiry_type&&(0,o.jsx)(k,{type:e.inquiry_type,children:(i=e.inquiry_type,{free_trial:"Free Trial",pricing:"Pricing",demo:"Demo",support:"Support",partnership:"Partnership",other:"Other"}[i]||i)}),e.interested_plan&&(0,o.jsx)(E,{children:(r=e.interested_plan,r?r.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()):null)})]}),(0,o.jsx)(v,{children:e.email}),e.company_name&&(0,o.jsx)(A,{children:e.company_name}),e.phone&&(0,o.jsxs)(B,{children:["Phone: ",e.phone]}),e.preferred_username&&(0,o.jsxs)(B,{children:["Preferred Username: ",(0,o.jsx)("strong",{children:e.preferred_username})]})]}),(0,o.jsx)(w,{status:e.status,children:e.status.replace("_"," ")})]}),(0,o.jsx)(C,{children:e.message}),e.reply_message&&(0,o.jsxs)(_,{children:[(0,o.jsxs)(z,{children:["Reply ",e.email_sent&&"(Email Sent)"]}),(0,o.jsx)(S,{children:e.reply_message}),(0,o.jsxs)($,{children:["Replied by ",e.replied_by_name," on ",xe(e.replied_at)]})]}),(0,o.jsxs)(D,{children:[(0,o.jsxs)("span",{children:["Received: ",xe(e.createdAt)]}),(0,o.jsxs)(q,{children:["new"===e.status&&(0,o.jsx)(P,{onClick:()=>ce(e.id,"in_progress"),children:"Mark In Progress"}),!e.reply_message&&(0,o.jsx)(P,{variant:"primary",onClick:()=>(e=>{ne(e),oe(""),se(!0),re(!0)})(e),children:"Reply"}),"closed"!==e.status&&e.reply_message&&(0,o.jsx)(P,{onClick:()=>ce(e.id,"closed"),children:"Close"}),(0,o.jsx)(P,{variant:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this inquiry?"))try{const r=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}}),pe()}catch(r){console.error("Error deleting inquiry:",r)}})(e.id),children:"Delete"})]})]})]},e.id);var r,i})})]}),ee&&ie&&(0,o.jsx)(I,{onClick:()=>re(!1),children:(0,o.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(T,{children:[(0,o.jsxs)(N,{children:["Reply to ",ie.name]}),(0,o.jsx)(O,{onClick:()=>re(!1),children:"\xd7"})]}),(0,o.jsxs)(L,{children:[(0,o.jsxs)(J,{children:[(0,o.jsx)(M,{children:"Original Message"}),(0,o.jsx)(C,{style:{margin:0},children:ie.message})]}),(0,o.jsxs)(J,{children:[(0,o.jsx)(M,{children:"Your Reply"}),(0,o.jsx)(H,{value:te,onChange:e=>oe(e.target.value),placeholder:"Type your reply here..."})]}),(0,o.jsxs)(Y,{children:[(0,o.jsx)("input",{type:"checkbox",checked:ae,onChange:e=>se(e.target.checked)}),"Send reply via email to ",ie.email]})]}),(0,o.jsxs)(U,{children:[(0,o.jsx)(P,{onClick:()=>re(!1),children:"Cancel"}),(0,o.jsx)(P,{variant:"primary",onClick:async()=>{if(ie&&te.trim()){le(!0);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/public/admin/inquiries/${ie.id}/reply`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({reply_message:te,send_email:ae})});if(r.ok)re(!1),pe();else{const e=await r.json();alert(e.error||"Failed to send reply")}}catch(e){console.error("Error sending reply:",e),alert("Failed to send reply")}finally{le(!1)}}},disabled:de||!te.trim(),children:de?"Sending...":ae?"Send Reply & Email":"Save Reply"})]})]})})]})})}}}]);