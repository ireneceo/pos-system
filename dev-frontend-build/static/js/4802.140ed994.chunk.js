"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4802],{4302:(e,r,t)=>{t.d(r,{A:()=>w});var n=t(9950),i=t(4752),o=t(4414);const a=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,s=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,l=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,c=i.Ay.div`
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
`,p=i.Ay.div`
  flex: 1;
  min-width: 0;
`,x=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,h=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,g=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,m=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,y=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,f=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,j=i.Ay.textarea`
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
`,b=i.Ay.button`
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
`,v=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,w=e=>{let{entityType:r,entityId:t,currentUserId:i,onMarkRead:w}=e;const[A,F]=(0,n.useState)([]),[k,E]=(0,n.useState)(""),[C,S]=(0,n.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&F(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&(B(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),w&&w()}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const z=async()=>{if(k.trim()&&!C){S(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:k.trim()})})).ok&&(E(""),B())}catch(e){console.error("Error adding comment:",e)}finally{S(!1)}}},I=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),n=Math.floor(t/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const i=Math.floor(n/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,o.jsxs)(a,{children:[(0,o.jsxs)(s,{children:["Comments (",A.length,")"]}),A.length>0?(0,o.jsx)(d,{children:A.map(e=>{var r,t,n;return(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,o.jsxs)(p,{children:[(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,o.jsx)(u,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,o.jsx)(g,{children:I(e.createdAt)}),i&&e.author_id===i&&(0,o.jsx)(y,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&B()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,o.jsx)(m,{children:e.content})]})]},e.id)})}):(0,o.jsx)(v,{children:"No comments yet"}),(0,o.jsxs)(f,{children:[(0,o.jsx)(j,{value:k,onChange:e=>E(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),z())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,o.jsx)(b,{onClick:z,disabled:!k.trim()||C,children:"Send"})]})]})}},4802:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ie});var n=t(9950),i=t(4752),o=t(1367),a=t(4302),s=t(4414);const d=i.Ay.div`
  min-height: 100vh;
`,l=i.Ay.div`
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
`,c=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,x=i.Ay.div`
  display: flex;
  gap: 12px;
`,h=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; border-color: #CBD5E1; }\n  "}
`,u=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`,m=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=i.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,j=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,b=i.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=i.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,w=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,A=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,F=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
`,k=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=i.Ay.div`
  flex: 1;
  min-width: 0;
`,C=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,S=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,B=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,z=i.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,I=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,_=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,$=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,D=i.Ay.div`
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
`,q=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,O=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,R=i.Ay.span`
  color: #374151;
`,T=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  h3 { color: #374151; margin-bottom: 8px; }
`,P=i.Ay.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,M=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,L=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,U=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,J=i.Ay.button`
  background: none; border: none; font-size: 24px; color: #6B7C93;
  cursor: pointer; padding: 0; width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  &:hover { color: #0A2540; }
`,Y=i.Ay.div`
  padding: 24px;
`,H=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,K=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,W=i.Ay.div`
  margin-bottom: 20px;
`,G=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,Q=i.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,V=i.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,X=i.Ay.textarea`
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
`,Z=i.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,ee=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,re=i.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,te=i.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,ne=i.Ay.div`
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
`,ie=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,n.useState)([]),[i,ie]=(0,n.useState)([]),[oe,ae]=(0,n.useState)(""),[se,de]=(0,n.useState)("all"),[le,ce]=(0,n.useState)("all"),[pe,xe]=(0,n.useState)("all"),[he,ue]=(0,n.useState)("all"),[ge,me]=(0,n.useState)(!1),[ye,fe]=(0,n.useState)(null),[je,be]=(0,n.useState)("open"),[ve,we]=(0,n.useState)({}),[Ae,Fe]=(0,n.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"});(0,n.useEffect)(()=>{e&&ke()},[e]),(0,n.useEffect)(()=>{if(i.length>0){Ee();const e=setInterval(Ee,1e4);return()=>clearInterval(e)}},[i]);const ke=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e;ie(t.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},Ee=async()=>{try{const r=localStorage.getItem("auth_token"),n=await fetch(`/api/operation-tickets?userId=${null===e||void 0===e?void 0:e.id}&userRole=Restaurant Owner`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json(),r=Array.isArray(e)?e:[];t(r),Ce(r)}}catch(r){console.error("Error fetching operation tickets:",r)}},Ce=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),we(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},Se=r.filter(e=>{const r=e.subject.toLowerCase().includes(oe.toLowerCase())||e.ticketNumber.toLowerCase().includes(oe.toLowerCase()),t="all"===se||e.status===se,n="all"===le||e.priority===le,i="all"===pe||e.category===pe,o="all"===he||String(e.restaurantId)===he;return r&&t&&n&&i&&o}),Be=r.filter(e=>"open"===e.status).length,ze=r.filter(e=>"in-progress"===e.status).length,Ie=r.filter(e=>"resolved"===e.status).length,_e=e=>new Date(e).toLocaleString("en-MY");return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(d,{children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsxs)(x,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:Ee,children:"Refresh"}),(0,s.jsx)(h,{variant:"primary",onClick:()=>me(!0),children:"New Inquiry"})]})]}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(u,{children:[(0,s.jsxs)(g,{color:"#635BFF",children:[(0,s.jsx)(m,{children:r.length}),(0,s.jsx)(y,{children:"Total Inquiries"})]}),(0,s.jsxs)(g,{color:"#F59E0B",children:[(0,s.jsx)(m,{children:Be}),(0,s.jsx)(y,{children:"Open"})]}),(0,s.jsxs)(g,{color:"#3B82F6",children:[(0,s.jsx)(m,{children:ze}),(0,s.jsx)(y,{children:"In Progress"})]}),(0,s.jsxs)(g,{color:"#10B981",children:[(0,s.jsx)(m,{children:Ie}),(0,s.jsx)(y,{children:"Resolved"})]})]}),(0,s.jsxs)(f,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Search"}),(0,s.jsx)(v,{placeholder:"Search inquiries...",value:oe,onChange:e=>ae(e.target.value)})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Restaurant"}),(0,s.jsxs)(w,{value:he,onChange:e=>ue(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Restaurants"}),i.map(e=>(0,s.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Status"}),(0,s.jsxs)(w,{value:se,onChange:e=>de(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Priority"}),(0,s.jsxs)(w,{value:le,onChange:e=>ce(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Priority"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"low",children:"Low"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:"Category"}),(0,s.jsxs)(w,{value:pe,onChange:e=>xe(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Categories"}),(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,s.jsxs)(A,{children:[Se.map(e=>(0,s.jsxs)(F,{onClick:()=>(e=>{fe(e),be(e.status)})(e),children:[(0,s.jsxs)(k,{children:[(0,s.jsxs)(E,{children:[(0,s.jsx)(C,{children:e.ticketNumber}),(0,s.jsx)(S,{children:e.subject}),(0,s.jsxs)(B,{children:[(0,s.jsxs)("span",{children:["From: ",e.requesterName," (",e.requesterRole,")"]}),(0,s.jsx)(z,{children:e.restaurantName})]})]}),(0,s.jsxs)(I,{children:[(0,s.jsx)(_,{status:e.status,children:e.status}),(0,s.jsx)($,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)(D,{children:e.description}),(0,s.jsxs)(q,{children:[(0,s.jsxs)(N,{children:[(0,s.jsx)(O,{children:"Created"}),(0,s.jsx)(R,{children:_e(e.createdAt)})]}),(0,s.jsxs)(N,{children:[(0,s.jsx)(O,{children:"Category"}),(0,s.jsx)(R,{style:{textTransform:"capitalize"},children:e.category})]}),ve[String(e.id)]&&(0,s.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ve[String(e.id)].total_comments,ve[String(e.id)].unread_count>0&&(0,s.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ve[String(e.id)].unread_count," new"]})]})]})]},e.id)),0===Se.length&&(0,s.jsxs)(T,{children:[(0,s.jsx)("h3",{children:"No operation inquiries"}),(0,s.jsx)("p",{children:"Operation inquiries from your restaurants will appear here. You can also create new inquiries."})]})]}),ge&&(0,s.jsx)(P,{onClick:()=>me(!1),children:(0,s.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(L,{children:[(0,s.jsx)(U,{children:"Create Operation Inquiry"}),(0,s.jsx)(J,{onClick:()=>me(!1),children:"\xd7"})]}),(0,s.jsxs)(Y,{children:[(0,s.jsxs)(W,{children:[(0,s.jsx)(G,{children:"Restaurant *"}),(0,s.jsxs)(V,{value:Ae.restaurantId,onChange:e=>Fe({...Ae,restaurantId:e.target.value}),required:!0,children:[(0,s.jsx)("option",{value:"",children:"Select Restaurant"}),i.map(e=>(0,s.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(G,{children:"Subject *"}),(0,s.jsx)(Q,{type:"text",value:Ae.subject,onChange:e=>Fe({...Ae,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(G,{children:"Description *"}),(0,s.jsx)(X,{value:Ae.description,onChange:e=>Fe({...Ae,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,s.jsxs)(K,{children:[(0,s.jsxs)(W,{children:[(0,s.jsx)(G,{children:"Priority"}),(0,s.jsxs)(V,{value:Ae.priority,onChange:e=>Fe({...Ae,priority:e.target.value}),children:[(0,s.jsx)("option",{value:"low",children:"Low"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(G,{children:"Category"}),(0,s.jsxs)(V,{value:Ae.category,onChange:e=>Fe({...Ae,category:e.target.value}),children:[(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,s.jsxs)(H,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:()=>me(!1),children:"Cancel"}),(0,s.jsx)(h,{variant:"primary",onClick:async()=>{if(!Ae.restaurantId||!Ae.subject.trim()||!Ae.description.trim())return;const r=i.find(e=>e.id===parseInt(Ae.restaurantId));try{const t=localStorage.getItem("auth_token"),n={restaurantId:parseInt(Ae.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:Ae.subject,description:Ae.description,priority:Ae.priority,category:Ae.category,inquiryType:"owner",managerId:null===e||void 0===e?void 0:e.id,managerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner"};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(n)})).ok&&(Ee(),me(!1),Fe({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}))}catch(t){console.error("Error creating ticket:",t)}},disabled:!Ae.restaurantId||!Ae.subject.trim()||!Ae.description.trim(),children:"Submit Inquiry"})]})]})}),ye&&(0,s.jsx)(P,{onClick:()=>fe(null),children:(0,s.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(L,{children:[(0,s.jsx)(U,{children:ye.ticketNumber}),(0,s.jsx)(J,{onClick:()=>fe(null),children:"\xd7"})]}),(0,s.jsxs)(Y,{children:[(0,s.jsxs)(Z,{children:[(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Subject:"}),(0,s.jsx)(te,{children:ye.subject})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Restaurant:"}),(0,s.jsx)(te,{children:ye.restaurantName})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"From:"}),(0,s.jsxs)(te,{children:[ye.requesterName," (",ye.requesterRole,")"]})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Priority:"}),(0,s.jsx)(te,{children:(0,s.jsx)($,{priority:ye.priority,children:ye.priority})})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Category:"}),(0,s.jsx)(te,{style:{textTransform:"capitalize"},children:ye.category})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Created:"}),(0,s.jsx)(te,{children:_e(ye.createdAt)})]})]}),(0,s.jsx)(G,{children:"Description"}),(0,s.jsx)(ne,{children:ye.description}),(0,s.jsxs)(W,{children:[(0,s.jsx)(G,{children:"Status"}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,s.jsxs)(V,{value:je,onChange:e=>be(e.target.value),style:{flex:1},children:[(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]}),je!==ye.status&&(0,s.jsx)(h,{variant:"primary",onClick:async()=>{if(ye&&je!==ye.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${ye.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:je})});if(r.ok){const e=await r.json(),n=e.data||e;t(e=>e.map(e=>e.id===ye.id?{...e,...n}:e)),fe(e=>e?{...e,...n}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,s.jsx)(a.A,{entityType:"operation_ticket",entityId:String(ye.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>we(e=>{const r={...e},t=String(ye.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})})]})]})})}}}]);