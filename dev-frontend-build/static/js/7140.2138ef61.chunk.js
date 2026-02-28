"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7140],{2488:(e,t,n)=>{n.d(t,{DO:()=>s,Jt:()=>p,Qn:()=>d});n(9950);var i=n(4752),r=n(4414);const o=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,a=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,l=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,d=e=>{let{children:t,className:n,style:i,...a}=e;return(0,r.jsx)(o,{className:n,style:i,...a,children:t})},s=e=>{let{placeholder:t="Search...",...n}=e;return(0,r.jsx)(a,{placeholder:t,...n})},p=e=>{let{children:t,...n}=e;return(0,r.jsx)(l,{...n,children:t})}},4185:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var i=n(4752),r=n(4414);const o=i.Ay.div`
  margin-top: 12px;
`,a=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,d=i.Ay.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  text-decoration: none;
  color: #0A2540;
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }
`,s=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,p=i.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,c=i.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=i.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const n=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,r.jsxs)(o,{children:[(0,r.jsxs)(a,{children:["Attachments (",t.length,")"]}),n.length>0&&(0,r.jsx)(x,{children:n.map((e,t)=>(0,r.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,r.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,r.jsx)(l,{children:i.map((e,t)=>{return(0,r.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,r.jsx)(s,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,r.jsx)(p,{children:e.originalName}),(0,r.jsx)(c,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},t);var n,i})})]})}},4302:(e,t,n)=>{n.d(t,{A:()=>T});var i=n(9950),r=n(4752),o=n(4185),a=n(4414);const l=r.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,d=r.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,s=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,p=r.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,c=r.Ay.div`
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
`,x=r.Ay.div`
  flex: 1;
  min-width: 0;
`,h=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,u=r.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,g=r.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,m=r.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,f=r.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,y=r.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,w=r.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,b=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,v=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,j=r.Ay.textarea`
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
`,A=r.Ay.div`
  display: flex;
  gap: 4px;
`,F=r.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,k=r.Ay.button`
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
`,E=r.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,B=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,z=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,C=r.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,S=r.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,_=r.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,$=r.Ay.input`
  display: none;
`,I=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,D=r.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7280;
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: #D97706;
    cursor: pointer;
  }
`,T=e=>{let{entityType:t,entityId:n,currentUserId:r,onMarkRead:T}=e;const[N,U]=(0,i.useState)([]),[L,O]=(0,i.useState)(""),[M,P]=(0,i.useState)(!1),[J,R]=(0,i.useState)([]),[W,Y]=(0,i.useState)(!1),[K,H]=(0,i.useState)(""),[Q,q]=(0,i.useState)(!1),G=(0,i.useRef)(null),V=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&U(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{n&&(V(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n})}),T&&T()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,n]);const X=async()=>{if(W)return;const e=L.trim(),i=J.length>0;if((e||i)&&!Q){q(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n,content:L.trim(),attachments:i?J:void 0,is_internal:M||void 0})})).ok&&(O(""),R([]),P(!1),V())}catch(r){console.error("Error adding comment:",r)}finally{q(!1)}}},Z=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),i=Math.floor(n/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const r=Math.floor(i/60);if(r<24)return`${r}h ago`;const o=Math.floor(r/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(l,{children:[(0,a.jsxs)(d,{children:["Comments (",N.length,")"]}),N.length>0?(0,a.jsx)(s,{children:N.map(e=>{var t,n,i;return(0,a.jsxs)(p,{isInternal:e.is_internal,children:[(0,a.jsx)(c,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,a.jsx)(g,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),e.is_internal&&(0,a.jsx)(m,{children:"Internal"}),(0,a.jsx)(f,{children:Z(e.createdAt)}),r&&e.author_id===r&&(0,a.jsx)(w,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&V()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(y,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(E,{children:"No comments yet"}),(0,a.jsxs)(b,{children:[(0,a.jsxs)(v,{children:[(0,a.jsx)(j,{value:L,onChange:e=>O(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),X())},placeholder:M?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(A,{children:[(0,a.jsx)(F,{onClick:()=>{var e;return null===(e=G.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(k,{onClick:X,disabled:!L.trim()&&0===J.length||Q||W,children:"Send"})]})]}),(0,a.jsx)(I,{children:(0,a.jsxs)(D,{children:[(0,a.jsx)("input",{type:"checkbox",checked:M,onChange:e=>P(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(J.length>0||W||K)&&(0,a.jsxs)(B,{children:[W&&(0,a.jsx)(S,{children:"Uploading..."}),K&&(0,a.jsx)(_,{children:K}),J.map((e,t)=>(0,a.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(C,{onClick:()=>(e=>{const t=J[e],n=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),R(t=>t.filter((t,n)=>n!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)($,{ref:G,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;e.target.value="";const n=5-J.length,i=Array.from(t).slice(0,n);if(0!==i.length){Y(!0),H("");try{const e=new FormData;i.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),r=await n.json();r.success&&r.data?R(e=>[...e,...r.data]):H(r.message||"Upload failed")}catch(r){console.error("File upload error:",r),H("File upload failed. Please try again.")}finally{Y(!1)}}}})]})}},7140:(e,t,n)=>{n.r(t),n.d(t,{default:()=>G});var i=n(9950),r=n(4752),o=n(4492),a=n(3832),l=n(5665),d=n(2488),s=n(4185),p=n(4302),c=n(1367),x=n(4414);const h=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,u=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,g=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.isUnread&&"\n    border-left: 3px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,m=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,f=r.Ay.div`
  flex: 1;
  min-width: 0;
`,y=r.Ay.div`
  font-size: 16px;
  font-weight: ${e=>e.isUnread?"700":"600"};
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 10px;
`,w=r.Ay.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #635BFF;
`,b=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,v=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6B7280;
`,j=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,A=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#E0F2FE":t.includes("brand")?"#F3E8FF":t.includes("foodcourt")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#0891B2":t.includes("brand")?"#7C3AED":t.includes("foodcourt")?"#D97706":"#6B7280"}};
`,F=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
`,k=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,E=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`,B=r.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,z=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #6B7280;
  }
`,C=r.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1100;
  overflow-y: auto;
  padding: 40px 0;
`,S=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 800px;
  width: 90%;
  flex-shrink: 0;
`,_=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,I=r.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    color: #0A2540;
  }
`,D=r.Ay.div`
  padding: 24px;
`,T=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,N=r.Ay.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,U=r.Ay.div`
  margin-bottom: 24px;
`,L=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,O=r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  min-height: 80px;
`,M=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,P=r.Ay.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
`,J=r.Ay.div`
  flex: 1;
`,R=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,W=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Y=r.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,K=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,H=r.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Q=r.Ay.span`
  font-size: 14px;
  color: #374151;
`,q=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 14px;
  color: #6B7280;
`,G=()=>{const{restaurantId:e}=(0,o.g)(),[t,n]=(0,i.useState)([]),[r,G]=(0,i.useState)(!0),[V,X]=(0,i.useState)(""),[Z,ee]=(0,i.useState)("all"),[te,ne]=(0,i.useState)(!1),[ie,re]=(0,i.useState)(null),[oe,ae]=(0,i.useState)(null),[le,de]=(0,i.useState)({}),{user:se}=(0,c.As)(),pe=localStorage.getItem("auth_token"),ce=async()=>{try{G(!0);const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${pe}`,"Content-Type":"application/json"}});if(e.ok){const t=await e.json(),i=t.data||t,r=Array.isArray(i)?i:[];n(r),(async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${pe}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),de(t)}}}catch(t){}})(r)}}catch(e){console.error("Failed to fetch notices:",e)}finally{G(!1)}};(0,i.useEffect)(()=>{ce()},[]);const xe=e=>{re(e),ae(null),ne(!0),(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:{Authorization:`Bearer ${pe}`,"Content-Type":"application/json"}});if(t.ok){const i=await t.json(),r=i.data||i;ae(r),n(t=>t.map(t=>t.id===e?{...t,read_at:(new Date).toISOString()}:t))}}catch(t){console.error("Failed to fetch notice detail:",t)}})(e.id)},he=()=>{ne(!1),re(null),ae(null)},ue=t.filter(e=>{const t=e.title.toLowerCase().includes(V.toLowerCase())||e.content.toLowerCase().includes(V.toLowerCase())||e.author_name.toLowerCase().includes(V.toLowerCase()),n="all"===Z||e.priority===Z;return t&&n}),ge=t.length,me=t.filter(e=>!e.read_at).length,fe=t.filter(e=>"important"===e.priority).length,ye=t.filter(e=>"urgent"===e.priority).length,we=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120;return e.length<=t?e:e.substring(0,t)+"..."};return(0,x.jsxs)(a.mc,{children:[(0,x.jsx)(a.Y9,{children:(0,x.jsx)(a.hE,{children:"Notices"})}),(0,x.jsxs)(a.UC,{children:[(0,x.jsxs)(l.MD,{children:[(0,x.jsxs)(l.hI,{color:"#635BFF",children:[(0,x.jsx)(l.Os,{children:ge}),(0,x.jsx)(l.v0,{children:"Total Received"})]}),(0,x.jsxs)(l.hI,{color:"#2563EB",children:[(0,x.jsx)(l.Os,{children:me}),(0,x.jsx)(l.v0,{children:"Unread"})]}),(0,x.jsxs)(l.hI,{color:"#D97706",children:[(0,x.jsx)(l.Os,{children:fe}),(0,x.jsx)(l.v0,{children:"Important"})]}),(0,x.jsxs)(l.hI,{color:"#DC2626",children:[(0,x.jsx)(l.Os,{children:ye}),(0,x.jsx)(l.v0,{children:"Urgent"})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:V,onChange:e=>X(e.target.value)}),(0,x.jsxs)(d.Jt,{value:Z,onChange:e=>ee(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Priorities"}),(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),r?(0,x.jsx)(q,{children:"Loading notices..."}):0===ue.length?(0,x.jsxs)(z,{children:[(0,x.jsx)("h3",{children:"No notices found"}),(0,x.jsx)("p",{children:V||"all"!==Z?"Try adjusting your search or filter criteria.":"You have no notices yet."})]}):(0,x.jsx)(u,{children:ue.map(e=>{var t;const n=!e.read_at;return(0,x.jsx)(g,{isUnread:n,onClick:()=>xe(e),children:(0,x.jsxs)(m,{children:[(0,x.jsxs)(f,{children:[(0,x.jsxs)(y,{isUnread:n,children:[n&&(0,x.jsx)(w,{}),e.title]}),(0,x.jsx)(b,{children:we(e.content)}),(0,x.jsxs)(v,{children:[(0,x.jsxs)(j,{children:[e.author_name,(0,x.jsx)(A,{role:e.author_role,children:e.author_role})]}),(0,x.jsx)(B,{children:(i=e.createdAt,new Date(i).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))}),e.commentCount>0&&(0,x.jsxs)(E,{children:[e.commentCount," ",1===e.commentCount?"comment":"comments",(null===(t=le[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[le[String(e.id)].unread_count," new"]})]})]})]}),(0,x.jsx)(F,{children:(0,x.jsx)(k,{priority:e.priority,children:e.priority})})]})},e.id);var i})}),te&&ie&&(0,x.jsx)(C,{onClick:he,children:(0,x.jsxs)(S,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(_,{children:[(0,x.jsx)($,{children:"Notice Details"}),(0,x.jsx)(I,{onClick:he,children:"\xd7"})]}),(0,x.jsxs)(D,{children:[(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",gap:"16px"},children:[(0,x.jsx)("div",{style:{fontSize:"18px",fontWeight:"700",color:"#0A2540",lineHeight:"1.4",flex:1},children:ie.title}),(0,x.jsx)(k,{priority:ie.priority,children:ie.priority})]}),(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"From"}),(0,x.jsxs)(M,{children:[(0,x.jsx)(P,{children:(ve=(null===oe||void 0===oe?void 0:oe.author_name)||ie.author_name,ve?ve.charAt(0).toUpperCase():"?")}),(0,x.jsxs)(J,{children:[(0,x.jsx)(R,{children:(null===oe||void 0===oe?void 0:oe.author_name)||ie.author_name}),(0,x.jsx)(W,{children:(null===oe||void 0===oe?void 0:oe.author_role)||ie.author_role})]})]})]}),(0,x.jsxs)(Y,{children:[(0,x.jsxs)(K,{children:[(0,x.jsx)(H,{children:"Date"}),(0,x.jsx)(Q,{children:(be=(null===oe||void 0===oe?void 0:oe.createdAt)||ie.createdAt,new Date(be).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,x.jsxs)(K,{children:[(0,x.jsx)(H,{children:"Priority"}),(0,x.jsx)(Q,{style:{textTransform:"capitalize"},children:(null===oe||void 0===oe?void 0:oe.priority)||ie.priority})]}),(0,x.jsxs)(K,{children:[(0,x.jsx)(H,{children:"Status"}),(0,x.jsx)(Q,{style:{textTransform:"capitalize"},children:(null===oe||void 0===oe?void 0:oe.status)||ie.status})]})]}),(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Content"}),(0,x.jsx)(O,{children:(null===oe||void 0===oe?void 0:oe.content)||ie.content})]}),((null===oe||void 0===oe?void 0:oe.attachments)||(null===ie||void 0===ie?void 0:ie.attachments))&&((null===oe||void 0===oe?void 0:oe.attachments)||(null===ie||void 0===ie?void 0:ie.attachments)||[]).length>0&&(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Attachments"}),(0,x.jsx)(s.A,{attachments:(null===oe||void 0===oe?void 0:oe.attachments)||(null===ie||void 0===ie?void 0:ie.attachments)||[]})]}),(0,x.jsx)(p.A,{entityType:"notice",entityId:String(ie.id),currentUserId:null===se||void 0===se?void 0:se.id,onMarkRead:()=>de(e=>{const t={...e},n=String(ie.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]}),(0,x.jsx)(T,{children:(0,x.jsx)(N,{variant:"secondary",onClick:he,children:"Close"})})]})})]})]});var be,ve}}}]);