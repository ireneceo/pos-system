"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4802],{4302:(e,r,i)=>{i.d(r,{A:()=>A});var t=i(9950),n=i(4752),o=i(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,a=n.Ay.h4`
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
`,y=n.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,j=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,m=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,f=n.Ay.textarea`
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
`,v=n.Ay.button`
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
`,b=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,A=e=>{let{entityType:r,entityId:i,currentUserId:n}=e;const[A,w]=(0,t.useState)([]),[F,k]=(0,t.useState)(""),[E,C]=(0,t.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/comments/${r}/${i}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&w(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,t.useEffect)(()=>{i&&B()},[r,i]);const S=async()=>{if(F.trim()&&!E){C(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:i,content:F.trim()})})).ok&&(k(""),B())}catch(e){console.error("Error adding comment:",e)}finally{C(!1)}}},z=e=>{const r=new Date(e),i=(new Date).getTime()-r.getTime(),t=Math.floor(i/6e4);if(t<1)return"Just now";if(t<60)return`${t}m ago`;const n=Math.floor(t/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,o.jsxs)(s,{children:[(0,o.jsxs)(a,{children:["Comments (",A.length,")"]}),A.length>0?(0,o.jsx)(d,{children:A.map(e=>{var r,i,t;return(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,o.jsxs)(p,{children:[(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(null===(i=e.author)||void 0===i?void 0:i.name)||e.author_name}),(0,o.jsx)(u,{children:(null===(t=e.author)||void 0===t?void 0:t.role)||e.author_role}),(0,o.jsx)(g,{children:z(e.createdAt)}),n&&e.author_id===n&&(0,o.jsx)(j,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&B()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,o.jsx)(y,{children:e.content})]})]},e.id)})}):(0,o.jsx)(b,{children:"No comments yet"}),(0,o.jsxs)(m,{children:[(0,o.jsx)(f,{value:F,onChange:e=>k(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),S())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,o.jsx)(v,{onClick:S,disabled:!F.trim()||E,children:"Send"})]})]})}},4802:(e,r,i)=>{i.r(r),i.d(r,{default:()=>ne});var t=i(9950),n=i(4752),o=i(1367),s=i(4302),a=i(4414);const d=n.Ay.div`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; border-color: #CBD5E1; }\n  "}
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
`,y=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,j=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,m=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,f=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,v=n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,A=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,w=n.Ay.div`
  display: grid;
  gap: 20px;
`,F=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
`,k=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=n.Ay.div`
  flex: 1;
`,C=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,S=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
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
`,T=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,q=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,R=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,N=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,O=n.Ay.span`
  color: #374151;
`,_=n.Ay.div`
  margin-top: 16px;
  padding: 12px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,P=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 6px;
`,M=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,L=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,U=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  ${e=>"primary"===e.variant?"\n    background: #635BFF; color: white; border-color: #635BFF;\n    &:hover { background: #5A51E6; }\n  ":"\n    background: transparent; color: #6B7280; border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}
`,H=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  h3 { color: #374151; margin-bottom: 8px; }
`,J=n.Ay.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,Y=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,K=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,W=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,V=n.Ay.button`
  background: none; border: none; font-size: 24px; color: #6B7C93;
  cursor: pointer; padding: 0; width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  &:hover { color: #0A2540; }
`,G=n.Ay.div`
  padding: 24px;
`,Q=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,X=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,Z=n.Ay.div`
  margin-bottom: 20px;
`,ee=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,re=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,ie=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,te=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,ne=()=>{const{user:e}=(0,o.As)(),[r,i]=(0,t.useState)([]),[n,ne]=(0,t.useState)([]),[oe,se]=(0,t.useState)(""),[ae,de]=(0,t.useState)("all"),[le,ce]=(0,t.useState)("all"),[pe,xe]=(0,t.useState)("all"),[he,ue]=(0,t.useState)("all"),[ge,ye]=(0,t.useState)(!1),[je,me]=(0,t.useState)(!1),[fe,ve]=(0,t.useState)(null),[be,Ae]=(0,t.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"});(0,t.useEffect)(()=>{e&&we()},[e]),(0,t.useEffect)(()=>{if(n.length>0){Fe();const e=setInterval(Fe,1e4);return()=>clearInterval(e)}},[n]);const we=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),i=e.data||e;ne(i.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},Fe=async()=>{try{const r=localStorage.getItem("auth_token"),t=await fetch(`/api/operation-tickets?userId=${null===e||void 0===e?void 0:e.id}&userRole=Restaurant Owner`,{headers:{Authorization:`Bearer ${r}`}});if(t.ok){const e=await t.json();i(Array.isArray(e)?e:[])}}catch(r){console.error("Error fetching operation tickets:",r)}},ke=r.filter(e=>{const r=e.subject.toLowerCase().includes(oe.toLowerCase())||e.ticketNumber.toLowerCase().includes(oe.toLowerCase()),i="all"===ae||e.status===ae,t="all"===le||e.priority===le,n="all"===pe||e.category===pe,o="all"===he||String(e.restaurantId)===he;return r&&i&&t&&n&&o}),Ee=r.filter(e=>"open"===e.status).length,Ce=r.filter(e=>"in-progress"===e.status).length,Be=r.filter(e=>"resolved"===e.status).length,Se=e=>new Date(e).toLocaleString("en-MY"),ze=e=>{if(!e||isNaN(e))return"0m";const r=Math.floor(e/60),i=e%60;return r>0?`${r}h ${i}m`:`${i}m`},Ie=async(e,r,i)=>{try{const t=localStorage.getItem("auth_token"),n={status:r};i&&(n.response=i);(await fetch(`/api/operation-tickets/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(n)})).ok&&(Fe(),me(!1))}catch(t){console.error("Error updating ticket:",t)}};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(p,{children:"Operation Inquiry"}),(0,a.jsxs)(x,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:Fe,children:"Refresh"}),(0,a.jsx)(h,{variant:"primary",onClick:()=>ye(!0),children:"New Inquiry"})]})]}),(0,a.jsxs)(c,{children:[(0,a.jsxs)(u,{children:[(0,a.jsxs)(g,{color:"#635BFF",children:[(0,a.jsx)(y,{children:r.length}),(0,a.jsx)(j,{children:"Total Inquiries"})]}),(0,a.jsxs)(g,{color:"#F59E0B",children:[(0,a.jsx)(y,{children:Ee}),(0,a.jsx)(j,{children:"Open"})]}),(0,a.jsxs)(g,{color:"#3B82F6",children:[(0,a.jsx)(y,{children:Ce}),(0,a.jsx)(j,{children:"In Progress"})]}),(0,a.jsxs)(g,{color:"#10B981",children:[(0,a.jsx)(y,{children:Be}),(0,a.jsx)(j,{children:"Resolved"})]})]}),(0,a.jsxs)(m,{children:[(0,a.jsxs)(f,{children:[(0,a.jsx)(v,{children:"Search"}),(0,a.jsx)(b,{placeholder:"Search inquiries...",value:oe,onChange:e=>se(e.target.value)})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(v,{children:"Restaurant"}),(0,a.jsxs)(A,{value:he,onChange:e=>ue(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Restaurants"}),n.map(e=>(0,a.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(v,{children:"Status"}),(0,a.jsxs)(A,{value:ae,onChange:e=>de(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(v,{children:"Priority"}),(0,a.jsxs)(A,{value:le,onChange:e=>ce(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(v,{children:"Category"}),(0,a.jsxs)(A,{value:pe,onChange:e=>xe(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Categories"}),(0,a.jsx)("option",{value:"schedule",children:"Schedule"}),(0,a.jsx)("option",{value:"inventory",children:"Inventory"}),(0,a.jsx)("option",{value:"staff",children:"Staff"}),(0,a.jsx)("option",{value:"menu",children:"Menu"}),(0,a.jsx)("option",{value:"customer",children:"Customer"}),(0,a.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,a.jsxs)(w,{children:[ke.map(e=>(0,a.jsxs)(F,{children:[(0,a.jsxs)(k,{children:[(0,a.jsxs)(E,{children:[(0,a.jsx)(C,{children:e.ticketNumber}),(0,a.jsx)(B,{children:e.subject}),(0,a.jsxs)(S,{children:["From: ",e.requesterName," (",e.requesterRole,")",(0,a.jsx)(z,{children:e.restaurantName})]})]}),(0,a.jsxs)(I,{children:[(0,a.jsx)($,{status:e.status,children:e.status}),(0,a.jsx)(D,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(T,{children:e.description}),e.response&&(0,a.jsxs)(_,{children:[(0,a.jsxs)(P,{children:["Response ",e.resolvedAt&&`\u2022 ${Se(e.resolvedAt)}`]}),(0,a.jsx)(M,{children:e.response})]}),(0,a.jsxs)(q,{children:[(0,a.jsxs)(R,{children:[(0,a.jsx)(N,{children:"Created"}),(0,a.jsx)(O,{children:Se(e.createdAt)})]}),(0,a.jsxs)(R,{children:[(0,a.jsx)(N,{children:"Category"}),(0,a.jsx)(O,{style:{textTransform:"capitalize"},children:e.category})]}),e.responseTime>0&&(0,a.jsxs)(R,{children:[(0,a.jsx)(N,{children:"Response Time"}),(0,a.jsx)(O,{children:ze(e.responseTime)})]})]}),(0,a.jsx)(L,{children:(0,a.jsx)(U,{variant:"primary",onClick:()=>{ve(e),me(!0)},children:"View Details"})})]},e.id)),0===ke.length&&(0,a.jsxs)(H,{children:[(0,a.jsx)("h3",{children:"No operation inquiries"}),(0,a.jsx)("p",{children:"Operation inquiries from your restaurants will appear here. You can also create new inquiries."})]})]}),ge&&(0,a.jsx)(J,{onClick:()=>ye(!1),children:(0,a.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(K,{children:[(0,a.jsx)(W,{children:"Create Operation Inquiry"}),(0,a.jsx)(V,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,a.jsxs)(G,{children:[(0,a.jsxs)(Z,{children:[(0,a.jsx)(ee,{children:"Restaurant *"}),(0,a.jsxs)(ie,{value:be.restaurantId,onChange:e=>Ae({...be,restaurantId:e.target.value}),required:!0,children:[(0,a.jsx)("option",{value:"",children:"Select Restaurant"}),n.map(e=>(0,a.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,a.jsxs)(Z,{children:[(0,a.jsx)(ee,{children:"Subject *"}),(0,a.jsx)(re,{type:"text",value:be.subject,onChange:e=>Ae({...be,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,a.jsxs)(Z,{children:[(0,a.jsx)(ee,{children:"Description *"}),(0,a.jsx)(te,{value:be.description,onChange:e=>Ae({...be,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,a.jsxs)(X,{children:[(0,a.jsxs)(Z,{children:[(0,a.jsx)(ee,{children:"Priority"}),(0,a.jsxs)(ie,{value:be.priority,onChange:e=>Ae({...be,priority:e.target.value}),children:[(0,a.jsx)("option",{value:"low",children:"Low"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(Z,{children:[(0,a.jsx)(ee,{children:"Category"}),(0,a.jsxs)(ie,{value:be.category,onChange:e=>Ae({...be,category:e.target.value}),children:[(0,a.jsx)("option",{value:"schedule",children:"Schedule"}),(0,a.jsx)("option",{value:"inventory",children:"Inventory"}),(0,a.jsx)("option",{value:"staff",children:"Staff"}),(0,a.jsx)("option",{value:"menu",children:"Menu"}),(0,a.jsx)("option",{value:"customer",children:"Customer"}),(0,a.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:()=>ye(!1),children:"Cancel"}),(0,a.jsx)(h,{variant:"primary",onClick:async()=>{if(!be.restaurantId||!be.subject.trim()||!be.description.trim())return;const r=n.find(e=>e.id===parseInt(be.restaurantId));try{const i=localStorage.getItem("auth_token"),t={restaurantId:parseInt(be.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:be.subject,description:be.description,priority:be.priority,category:be.category,inquiryType:"owner",managerId:null===e||void 0===e?void 0:e.id,managerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner"};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(t)})).ok&&(Fe(),ye(!1),Ae({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}))}catch(i){console.error("Error creating ticket:",i)}},disabled:!be.restaurantId||!be.subject.trim()||!be.description.trim(),children:"Submit Inquiry"})]})]})}),je&&fe&&(0,a.jsx)(J,{onClick:()=>me(!1),children:(0,a.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(K,{children:[(0,a.jsx)(W,{children:"Inquiry Details"}),(0,a.jsx)(V,{onClick:()=>me(!1),children:"\xd7"})]}),(0,a.jsxs)(G,{children:[(0,a.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(ee,{children:"Ticket Number"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:fe.ticketNumber})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(ee,{children:"Status"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)($,{status:fe.status,children:fe.status})})]})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(ee,{children:"Restaurant"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#374151"},children:fe.restaurantName})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(ee,{children:"Requester"}),(0,a.jsxs)("div",{style:{padding:"8px 0",color:"#374151"},children:[fe.requesterName," (",fe.requesterRole,")"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(ee,{children:"Subject"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:fe.subject})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(ee,{children:"Description"}),(0,a.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:fe.description})]}),fe.response&&(0,a.jsxs)(_,{children:[(0,a.jsx)(P,{children:"Response"}),(0,a.jsx)(M,{children:fe.response})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(ee,{children:"Priority"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)(D,{priority:fe.priority,children:fe.priority})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(ee,{children:"Category"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:fe.category})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(ee,{children:"Created"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#6B7280",fontSize:"13px"},children:Se(fe.createdAt)})]})]}),"resolved"!==fe.status&&"closed"!==fe.status&&(0,a.jsxs)(L,{children:["open"===fe.status&&(0,a.jsx)(U,{variant:"primary",onClick:()=>Ie(fe.id,"in-progress"),children:"Mark In Progress"}),(0,a.jsx)(U,{variant:"primary",onClick:()=>{const e=prompt("Enter your response:");e&&Ie(fe.id,"resolved",e)},children:"Resolve"})]})]}),(0,a.jsx)(s.A,{entityType:"operation_ticket",entityId:String(fe.id),currentUserId:null===e||void 0===e?void 0:e.id})]}),(0,a.jsx)(Q,{children:(0,a.jsx)(h,{variant:"secondary",onClick:()=>me(!1),children:"Close"})})]})})]})]})})}}}]);