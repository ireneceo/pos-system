"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2940],{2597:(e,r,i)=>{i.d(r,{Ex:()=>c,oz:()=>d,tU:()=>l});i(9950);var n=i(4752),t=i(4414);const o=n.Ay.div`
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
`,s=n.Ay.button`
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
`,a=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:r,className:i,style:n}=e;return(0,t.jsx)(o,{className:i,style:n,children:r})},d=e=>{let{active:r,onClick:i,children:n,className:o}=e;return(0,t.jsx)(s,{active:r,onClick:i,className:o,children:n})},c=e=>{let{count:r,variant:i="default",showZero:n=!1}=e;return 0!==r||n?(0,t.jsx)(a,{variant:i,children:r}):null}},2653:(e,r,i)=>{i.d(r,{M:()=>o});var n=i(9950),t=i(4492);function o(e){const[r,i]=(0,t.ok)(),o=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[s,a]=(0,n.useState)(o());return[s,(0,n.useCallback)(e=>{a(e),i({tab:e})},[i])]}},2940:(e,r,i)=>{i.r(r),i.d(r,{default:()=>V});var n=i(9950),t=i(4752),o=i(2853),s=i(8409),a=i(2597),l=i(2653),d=i(4414);const c=t.Ay.div`
  min-height: 100vh;
`,p=t.Ay.div`
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
`,x=t.Ay.h1`
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
`,u=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,m=t.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,f=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,y=t.Ay.div`
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
`,j=t.Ay.select`
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
`,v=t.Ay.div`
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
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,F=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,k=t.Ay.div`
  flex: 1;
  min-width: 0;
`,A=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,E=t.Ay.div`
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
`,_=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin-left: 8px;
`,z=t.Ay.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
  background: ${e=>{switch(e.type){case"free_trial":return"#ECFDF5";case"pricing":return"#FEF3C7";case"demo":return"#DBEAFE";case"support":return"#FEE2E2";case"partnership":return"#F3E8FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"free_trial":return"#059669";case"pricing":return"#D97706";case"demo":return"#1E40AF";case"support":return"#DC2626";case"partnership":return"#7C3AED";default:return"#6B7280"}}};
`,S=t.Ay.div`
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
`,D=t.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`,$=t.Ay.div`
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
`,I=t.Ay.div`
  font-size: 14px;
  color: #065F46;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`,P=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`,R=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,N=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,T=t.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #059669;
  background: #ECFDF5;
  padding: 2px 8px;
  border-radius: 4px;
`,O=t.Ay.button`
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
`,L=t.Ay.div`
  margin-bottom: 20px;
`,U=t.Ay.label`
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
`,J=t.Ay.label`
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,Y=t.Ay.div`
  font-size: 14px;
`,Z=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,G=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,K=t.Ay.select`
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
`,Q=t.Ay.button`
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
`,V=()=>{const[e,r]=(0,n.useState)([]),[i,t]=(0,n.useState)({total:0,new:0,in_progress:0,resolved:0}),[V,W]=(0,n.useState)(!0),[X,ee]=(0,n.useState)(""),[re,ie]=(0,n.useState)("all"),[ne,te]=(0,l.M)("active"),[oe,se]=(0,n.useState)(!1),[ae,le]=(0,n.useState)(null),[de,ce]=(0,n.useState)(""),[pe,xe]=(0,n.useState)(!1),[he,ue]=(0,n.useState)(""),[ge,me]=(0,n.useState)(!0),[fe,ye]=(0,n.useState)(!1),[be,je]=(0,n.useState)(!1),ve=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||W(!0);const i=localStorage.getItem("auth_token"),n=new URLSearchParams;X&&n.append("search",X);const[o,s]=await Promise.all([fetch(`/api/public/admin/inquiries?${n}`,{headers:{Authorization:`Bearer ${i}`}}),fetch("/api/public/admin/inquiries-stats",{headers:{Authorization:`Bearer ${i}`}})]);o.ok&&r(await o.json()),s.ok&&t(await s.json())}catch(i){console.error("Error loading data:",i)}finally{W(!1)}},[X]);(0,n.useEffect)(()=>{ve()},[ve]),(0,n.useEffect)(()=>{const e=setInterval(()=>ve(!0),1e4);return()=>clearInterval(e)},[ve]);const we=e.filter(e=>"new"===e.status||"in_progress"===e.status).length,Fe=e.filter(e=>"resolved"===e.status||"closed"===e.status).length,ke=e.filter(e=>{const r="active"===ne?"new"===e.status||"in_progress"===e.status:"resolved"===e.status||"closed"===e.status,i="all"===re||e.status===re;return r&&i}),Ae=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Ee=e=>({free_trial:"Free Trial",pricing:"Pricing",demo:"Demo",support:"Support",partnership:"Partnership",other:"Other"}[e]||e);return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Contact Inquiries"})}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(u,{children:[(0,d.jsxs)(g,{color:"#635BFF",children:[(0,d.jsx)(m,{children:i.total}),(0,d.jsx)(f,{children:"Total Inquiries"})]}),(0,d.jsxs)(g,{color:"#F59E0B",children:[(0,d.jsx)(m,{children:i.new}),(0,d.jsx)(f,{children:"New"})]}),(0,d.jsxs)(g,{color:"#3B82F6",children:[(0,d.jsx)(m,{children:i.in_progress}),(0,d.jsx)(f,{children:"In Progress"})]}),(0,d.jsxs)(g,{color:"#10B981",children:[(0,d.jsx)(m,{children:i.resolved}),(0,d.jsx)(f,{children:"Resolved"})]})]}),(0,d.jsxs)(a.tU,{children:[(0,d.jsxs)(a.oz,{active:"active"===ne,onClick:()=>{te("active"),ie("all")},children:["Active (",we,")"]}),(0,d.jsxs)(a.oz,{active:"closed"===ne,onClick:()=>{te("closed"),ie("all")},children:["Closed (",Fe,")"]})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(j,{value:re,onChange:e=>ie(e.target.value),children:"active"===ne?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"new",children:"New"}),(0,d.jsx)("option",{value:"in_progress",children:"In Progress"})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,d.jsx)(b,{placeholder:"Search by name, email, company...",value:X,onChange:e=>ee(e.target.value)})]}),V?(0,d.jsx)(o.pp,{children:"Loading..."}):0===ke.length?(0,d.jsx)(o.pp,{children:"No inquiries found"}):(0,d.jsx)(v,{children:ke.map(e=>(0,d.jsxs)(w,{onClick:()=>(e=>{le(e),ce(e.status),se(!0)})(e),children:[(0,d.jsxs)(F,{children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(A,{children:e.name}),(0,d.jsx)(E,{children:e.email}),e.company_name&&(0,d.jsx)(C,{children:e.company_name})]}),(0,d.jsx)(B,{status:e.status,children:e.status.replace("_"," ")})]}),(0,d.jsx)(D,{children:e.message}),(0,d.jsx)(R,{}),(0,d.jsxs)(N,{children:[(0,d.jsx)("span",{children:Ae(e.createdAt)}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.inquiry_type&&(0,d.jsx)(z,{type:e.inquiry_type,style:{marginLeft:0},children:Ee(e.inquiry_type)}),e.reply_message&&(0,d.jsx)(T,{children:"Replied"}),"active"===ne&&(0,d.jsx)(O,{onClick:i=>(async(e,i)=>{i.stopPropagation();try{const i=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${e}`,{method:"PATCH",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({status:"closed"})})).ok&&r(r=>r.map(r=>r.id===e?{...r,status:"closed"}:r))}catch(n){console.error("Error closing inquiry:",n)}})(e.id,i),children:"Close"})]})]})]},e.id))})]}),oe&&ae&&(0,d.jsxs)(s.aF,{isOpen:!0,onClose:()=>se(!1),title:"Inquiry Details",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(Q,{variant:"danger",onClick:()=>je(!0),children:" Delete "}),(0,d.jsx)("div",{style:{flex:1}})," ",!ae.reply_message&&(0,d.jsx)(Q,{variant:"primary",onClick:()=>{ue(""),me(!0),xe(!0)},children:" Reply "})," ",(0,d.jsx)(Q,{onClick:()=>se(!1),children:" Close "})]}),children:[(0,d.jsxs)(H,{children:[(0,d.jsxs)(Y,{children:[(0,d.jsx)(Z,{children:"Name"}),(0,d.jsx)(G,{children:ae.name})]}),(0,d.jsxs)(Y,{children:[(0,d.jsx)(Z,{children:"Email"}),(0,d.jsx)(G,{children:ae.email})]}),ae.company_name&&(0,d.jsxs)(Y,{children:[(0,d.jsx)(Z,{children:"Company"}),(0,d.jsx)(G,{children:ae.company_name})]}),ae.phone&&(0,d.jsxs)(Y,{children:[(0,d.jsx)(Z,{children:"Phone"}),(0,d.jsx)(G,{children:ae.phone})]}),ae.inquiry_type&&(0,d.jsxs)(Y,{children:[(0,d.jsx)(Z,{children:"Type"}),(0,d.jsx)(G,{children:(0,d.jsx)(z,{type:ae.inquiry_type,style:{marginLeft:0},children:Ee(ae.inquiry_type)})})]}),ae.interested_plan&&(0,d.jsxs)(Y,{children:[(0,d.jsx)(Z,{children:"Interested Plan"}),(0,d.jsx)(G,{children:(0,d.jsx)(_,{style:{marginLeft:0},children:(Ce=ae.interested_plan,Ce?Ce.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()):null)})})]}),ae.preferred_username&&(0,d.jsxs)(Y,{children:[(0,d.jsx)(Z,{children:"Preferred Username"}),(0,d.jsx)(G,{children:(0,d.jsx)("strong",{children:ae.preferred_username})})]}),(0,d.jsxs)(Y,{children:[(0,d.jsx)(Z,{children:"Status"}),(0,d.jsx)(G,{children:(0,d.jsxs)(K,{value:de,onChange:e=>(async e=>{if(ae){ce(e);try{const i=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${ae.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(r(r=>r.map(r=>r.id===ae.id?{...r,status:e}:r)),le(r=>r?{...r,status:e}:null))}catch(i){console.error("Error updating status:",i)}}})(e.target.value),children:[(0,d.jsx)("option",{value:"new",children:"New"}),(0,d.jsx)("option",{value:"in_progress",children:"In Progress"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]})})]}),(0,d.jsxs)(Y,{children:[(0,d.jsx)(Z,{children:"Received"}),(0,d.jsx)(G,{children:Ae(ae.createdAt)})]})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(U,{children:"Message"}),(0,d.jsx)(S,{style:{margin:0},children:ae.message})]}),ae.reply_message&&(0,d.jsxs)($,{children:[(0,d.jsxs)(q,{children:["Reply ",ae.email_sent&&"(Email Sent)"]}),(0,d.jsx)(I,{children:ae.reply_message}),(0,d.jsxs)(P,{children:["Replied by ",ae.replied_by_name," on ",Ae(ae.replied_at)]})]})]}),pe&&ae&&(0,d.jsxs)(s.aF,{isOpen:!0,onClose:()=>xe(!1),title:`Reply to ${ae.name}`,footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(Q,{onClick:()=>xe(!1),children:" Cancel "}),(0,d.jsxs)(Q,{variant:"primary",onClick:async()=>{if(ae&&he.trim()){ye(!0);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/public/admin/inquiries/${ae.id}/reply`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({reply_message:he,send_email:ge})})).ok&&(xe(!1),se(!1),ve())}catch(e){console.error("Error sending reply:",e)}finally{ye(!1)}}},disabled:fe||!he.trim(),children:[" ",fe?"Sending...":ge?"Send Reply & Email":"Save Reply"," "]})]}),children:[(0,d.jsxs)(L,{children:[(0,d.jsx)(U,{children:"Original Message"}),(0,d.jsx)(S,{style:{margin:0},children:ae.message})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(U,{children:"Your Reply"}),(0,d.jsx)(M,{value:he,onChange:e=>ue(e.target.value),placeholder:"Type your reply here..."})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)("input",{type:"checkbox",checked:ge,onChange:e=>me(e.target.checked)}),"Send reply via email to ",ae.email]})]}),be&&(0,d.jsx)(s.aF,{isOpen:!0,onClose:()=>je(!1),title:"Confirm Delete",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(Q,{onClick:()=>je(!1),children:" Cancel "}),(0,d.jsx)(Q,{variant:"danger",onClick:async()=>{if(ae)try{const e=localStorage.getItem("auth_token");await fetch(`/api/public/admin/inquiries/${ae.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),je(!1),se(!1),ve()}catch(e){console.error("Error deleting inquiry:",e)}},children:" Delete "})]}),children:(0,d.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete this inquiry from ",(0,d.jsx)("strong",{children:null===ae||void 0===ae?void 0:ae.name}),"? This action cannot be undone."]})})]})});var Ce}}}]);