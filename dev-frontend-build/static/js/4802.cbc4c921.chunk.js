"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4802],{4302:(e,r,t)=>{t.d(r,{A:()=>w});var i=t(9950),n=t(4752),o=t(4414);const a=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,s=n.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,l=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,c=n.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`,p=n.Ay.div`
  flex: 1;
  min-width: 0;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,h=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=n.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,g=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,f=n.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,m=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,y=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,j=n.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`,b=n.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,v=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,w=e=>{let{entityType:r,entityId:t,currentUserId:n}=e;const[w,A]=(0,i.useState)([]),[F,k]=(0,i.useState)(""),[C,E]=(0,i.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&A(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{t&&B()},[r,t]);const S=async()=>{if(F.trim()&&!C){E(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:F.trim()})})).ok&&(k(""),B())}catch(e){console.error("Error adding comment:",e)}finally{E(!1)}}},z=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),i=Math.floor(t/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,o.jsxs)(a,{children:[(0,o.jsxs)(s,{children:["Comments (",w.length,")"]}),w.length>0?(0,o.jsx)(d,{children:w.map(e=>{var r,t,i;return(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,o.jsxs)(p,{children:[(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,o.jsx)(u,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,o.jsx)(g,{children:z(e.createdAt)}),n&&e.author_id===n&&(0,o.jsx)(m,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&B()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,o.jsx)(f,{children:e.content})]})]},e.id)})}):(0,o.jsx)(v,{children:"No comments yet"}),(0,o.jsxs)(y,{children:[(0,o.jsx)(j,{value:F,onChange:e=>k(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),S())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,o.jsx)(b,{onClick:S,disabled:!F.trim()||C,children:"Send"})]})]})}},4802:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ne});var i=t(9950),n=t(4752),o=t(1367),a=t(4302),s=t(4414);const d=n.Ay.div`
  min-height: 100vh;
`,l=n.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,c=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,x=n.Ay.div`
  display: flex;
  gap: 12px;
`,h=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; border-color: #CBD5E1; }\n  "}
`,u=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`,f=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,m=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,j=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,b=n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,w=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,A=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,F=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
`,k=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,C=n.Ay.div`
  flex: 1;
  min-width: 0;
`,E=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,B=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,S=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,z=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,I=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,$=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,D=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,q=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
  overflow-wrap: break-word;
`,N=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,O=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,T=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,R=n.Ay.span`
  color: #374151;
`,_=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  h3 { color: #374151; margin-bottom: 8px; }
`,P=n.Ay.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,L=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,M=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,U=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,J=n.Ay.button`
  background: none; border: none; font-size: 24px; color: #6B7C93;
  cursor: pointer; padding: 0; width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  &:hover { color: #0A2540; }
`,Y=n.Ay.div`
  padding: 24px;
`,H=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,K=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,G=n.Ay.div`
  margin-bottom: 20px;
`,Q=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,V=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,W=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,X=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,Z=n.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,ee=n.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,re=n.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,te=n.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,ie=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`,ne=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,i.useState)([]),[n,ne]=(0,i.useState)([]),[oe,ae]=(0,i.useState)(""),[se,de]=(0,i.useState)("all"),[le,ce]=(0,i.useState)("all"),[pe,xe]=(0,i.useState)("all"),[he,ue]=(0,i.useState)("all"),[ge,fe]=(0,i.useState)(!1),[me,ye]=(0,i.useState)(null),[je,be]=(0,i.useState)("open"),[ve,we]=(0,i.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"});(0,i.useEffect)(()=>{e&&Ae()},[e]),(0,i.useEffect)(()=>{if(n.length>0){Fe();const e=setInterval(Fe,1e4);return()=>clearInterval(e)}},[n]);const Ae=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e;ne(t.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},Fe=async()=>{try{const r=localStorage.getItem("auth_token"),i=await fetch(`/api/operation-tickets?userId=${null===e||void 0===e?void 0:e.id}&userRole=Restaurant Owner`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();t(Array.isArray(e)?e:[])}}catch(r){console.error("Error fetching operation tickets:",r)}},ke=r.filter(e=>{const r=e.subject.toLowerCase().includes(oe.toLowerCase())||e.ticketNumber.toLowerCase().includes(oe.toLowerCase()),t="all"===se||e.status===se,i="all"===le||e.priority===le,n="all"===pe||e.category===pe,o="all"===he||String(e.restaurantId)===he;return r&&t&&i&&n&&o}),Ce=r.filter(e=>"open"===e.status).length,Ee=r.filter(e=>"in-progress"===e.status).length,Be=r.filter(e=>"resolved"===e.status).length,Se=e=>new Date(e).toLocaleString("en-MY");return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(d,{children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsxs)(x,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:Fe,children:"Refresh"}),(0,s.jsx)(h,{variant:"primary",onClick:()=>fe(!0),children:"New Inquiry"})]})]}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(u,{children:[(0,s.jsxs)(g,{color:"#635BFF",children:[(0,s.jsx)(f,{children:r.length}),(0,s.jsx)(m,{children:"Total Inquiries"})]}),(0,s.jsxs)(g,{color:"#F59E0B",children:[(0,s.jsx)(f,{children:Ce}),(0,s.jsx)(m,{children:"Open"})]}),(0,s.jsxs)(g,{color:"#3B82F6",children:[(0,s.jsx)(f,{children:Ee}),(0,s.jsx)(m,{children:"In Progress"})]}),(0,s.jsxs)(g,{color:"#10B981",children:[(0,s.jsx)(f,{children:Be}),(0,s.jsx)(m,{children:"Resolved"})]})]}),(0,s.jsxs)(y,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Search"}),(0,s.jsx)(v,{placeholder:"Search inquiries...",value:oe,onChange:e=>ae(e.target.value)})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Restaurant"}),(0,s.jsxs)(w,{value:he,onChange:e=>ue(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Restaurants"}),n.map(e=>(0,s.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Status"}),(0,s.jsxs)(w,{value:se,onChange:e=>de(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Priority"}),(0,s.jsxs)(w,{value:le,onChange:e=>ce(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Priority"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"low",children:"Low"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Category"}),(0,s.jsxs)(w,{value:pe,onChange:e=>xe(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Categories"}),(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,s.jsxs)(A,{children:[ke.map(e=>(0,s.jsxs)(F,{onClick:()=>(e=>{ye(e),be(e.status)})(e),children:[(0,s.jsxs)(k,{children:[(0,s.jsxs)(C,{children:[(0,s.jsx)(E,{children:e.ticketNumber}),(0,s.jsx)(B,{children:e.subject}),(0,s.jsxs)(S,{children:[(0,s.jsxs)("span",{children:["From: ",e.requesterName," (",e.requesterRole,")"]}),(0,s.jsx)(z,{children:e.restaurantName})]})]}),(0,s.jsxs)(I,{children:[(0,s.jsx)($,{status:e.status,children:e.status}),(0,s.jsx)(D,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)(q,{children:e.description}),(0,s.jsxs)(N,{children:[(0,s.jsxs)(O,{children:[(0,s.jsx)(T,{children:"Created"}),(0,s.jsx)(R,{children:Se(e.createdAt)})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)(T,{children:"Category"}),(0,s.jsx)(R,{style:{textTransform:"capitalize"},children:e.category})]})]})]},e.id)),0===ke.length&&(0,s.jsxs)(_,{children:[(0,s.jsx)("h3",{children:"No operation inquiries"}),(0,s.jsx)("p",{children:"Operation inquiries from your restaurants will appear here. You can also create new inquiries."})]})]}),ge&&(0,s.jsx)(P,{onClick:()=>fe(!1),children:(0,s.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(M,{children:[(0,s.jsx)(U,{children:"Create Operation Inquiry"}),(0,s.jsx)(J,{onClick:()=>fe(!1),children:"\xd7"})]}),(0,s.jsxs)(Y,{children:[(0,s.jsxs)(G,{children:[(0,s.jsx)(Q,{children:"Restaurant *"}),(0,s.jsxs)(W,{value:ve.restaurantId,onChange:e=>we({...ve,restaurantId:e.target.value}),required:!0,children:[(0,s.jsx)("option",{value:"",children:"Select Restaurant"}),n.map(e=>(0,s.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,s.jsxs)(G,{children:[(0,s.jsx)(Q,{children:"Subject *"}),(0,s.jsx)(V,{type:"text",value:ve.subject,onChange:e=>we({...ve,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,s.jsxs)(G,{children:[(0,s.jsx)(Q,{children:"Description *"}),(0,s.jsx)(X,{value:ve.description,onChange:e=>we({...ve,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,s.jsxs)(K,{children:[(0,s.jsxs)(G,{children:[(0,s.jsx)(Q,{children:"Priority"}),(0,s.jsxs)(W,{value:ve.priority,onChange:e=>we({...ve,priority:e.target.value}),children:[(0,s.jsx)("option",{value:"low",children:"Low"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,s.jsxs)(G,{children:[(0,s.jsx)(Q,{children:"Category"}),(0,s.jsxs)(W,{value:ve.category,onChange:e=>we({...ve,category:e.target.value}),children:[(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,s.jsxs)(H,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:()=>fe(!1),children:"Cancel"}),(0,s.jsx)(h,{variant:"primary",onClick:async()=>{if(!ve.restaurantId||!ve.subject.trim()||!ve.description.trim())return;const r=n.find(e=>e.id===parseInt(ve.restaurantId));try{const t=localStorage.getItem("auth_token"),i={restaurantId:parseInt(ve.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:ve.subject,description:ve.description,priority:ve.priority,category:ve.category,inquiryType:"owner",managerId:null===e||void 0===e?void 0:e.id,managerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner"};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(i)})).ok&&(Fe(),fe(!1),we({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}))}catch(t){console.error("Error creating ticket:",t)}},disabled:!ve.restaurantId||!ve.subject.trim()||!ve.description.trim(),children:"Submit Inquiry"})]})]})}),me&&(0,s.jsx)(P,{onClick:()=>ye(null),children:(0,s.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(M,{children:[(0,s.jsx)(U,{children:me.ticketNumber}),(0,s.jsx)(J,{onClick:()=>ye(null),children:"\xd7"})]}),(0,s.jsxs)(Y,{children:[(0,s.jsxs)(Z,{children:[(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Subject:"}),(0,s.jsx)(te,{children:me.subject})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Restaurant:"}),(0,s.jsx)(te,{children:me.restaurantName})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"From:"}),(0,s.jsxs)(te,{children:[me.requesterName," (",me.requesterRole,")"]})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Priority:"}),(0,s.jsx)(te,{children:(0,s.jsx)(D,{priority:me.priority,children:me.priority})})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Category:"}),(0,s.jsx)(te,{style:{textTransform:"capitalize"},children:me.category})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Created:"}),(0,s.jsx)(te,{children:Se(me.createdAt)})]})]}),(0,s.jsx)(Q,{children:"Description"}),(0,s.jsx)(ie,{children:me.description}),(0,s.jsxs)(G,{children:[(0,s.jsx)(Q,{children:"Status"}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,s.jsxs)(W,{value:je,onChange:e=>be(e.target.value),style:{flex:1},children:[(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]}),je!==me.status&&(0,s.jsx)(h,{variant:"primary",onClick:async()=>{if(me&&je!==me.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${me.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:je})});if(r.ok){const e=await r.json(),i=e.data||e;t(e=>e.map(e=>e.id===me.id?{...e,...i}:e)),ye(e=>e?{...e,...i}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,s.jsx)(a.A,{entityType:"operation_ticket",entityId:String(me.id),currentUserId:null===e||void 0===e?void 0:e.id})]})]})})]})]})})}}}]);