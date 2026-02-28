"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,s=i.Ay.select`
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
`,l=e=>{let{children:t,className:r,style:i,...a}=e;return(0,n.jsx)(o,{className:r,style:i,...a,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(s,{...r,children:t})}},4185:(e,t,r)=>{r.d(t,{A:()=>u});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
  margin-top: 12px;
`,a=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=i.Ay.a`
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
`,d=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=i.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=i.Ay.span`
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
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,n.jsx)(x,{children:r.map((e,t)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,n.jsx)(s,{children:i.map((e,t)=>{return(0,n.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,i})})]})}},4302:(e,t,r)=>{r.d(t,{A:()=>D});var i=r(9950),n=r(4752),o=r(4185),a=r(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,l=n.Ay.h4`
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
`,c=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  flex: 1;
  min-width: 0;
`,h=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,u=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,g=n.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,m=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,f=n.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,y=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,j=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,v=n.Ay.textarea`
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
`,w=n.Ay.div`
  display: flex;
  gap: 4px;
`,A=n.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,F=n.Ay.button`
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
`,k=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,C=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,E=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,B=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=n.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,S=n.Ay.input`
  display: none;
`,D=e=>{let{entityType:t,entityId:r,currentUserId:n,onMarkRead:D}=e;const[$,T]=(0,i.useState)([]),[I,_]=(0,i.useState)(""),[N,L]=(0,i.useState)([]),[O,R]=(0,i.useState)(!1),[P,U]=(0,i.useState)(!1),M=(0,i.useRef)(null),q=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&T(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{r&&(q(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),D&&D()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const J=async()=>{const e=I.trim(),i=N.length>0;if((e||i)&&!P){U(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:I.trim(),attachments:i?N:void 0})})).ok&&(_(""),L([]),q())}catch(n){console.error("Error adding comment:",n)}finally{U(!1)}}},W=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",$.length,")"]}),$.length>0?(0,a.jsx)(d,{children:$.map(e=>{var t,r,i;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,a.jsx)(g,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,a.jsx)(m,{children:W(e.createdAt)}),n&&e.author_id===n&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&q()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(f,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(j,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(v,{value:I,onChange:e=>_(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),J())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(w,{children:[(0,a.jsx)(A,{onClick:()=>{var e;return null===(e=M.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(F,{onClick:J,disabled:!I.trim()&&0===N.length||P,children:"Send"})]})]}),(N.length>0||O)&&(0,a.jsxs)(C,{children:[O&&(0,a.jsx)(z,{children:"Uploading..."}),N.map((e,t)=>(0,a.jsxs)(E,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(B,{onClick:()=>(e=>{const t=N[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),L(t=>t.filter((t,r)=>r!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(S,{ref:M,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;e.target.value="";const r=5-N.length,i=Array.from(t).slice(0,r);if(0!==i.length){R(!0);try{const e=new FormData;i.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),n=await r.json();n.success&&n.data&&L(e=>[...e,...n.data])}catch(n){console.error("File upload error:",n)}finally{R(!1)}}}})]})}},5871:(e,t,r)=>{r.r(t),r.d(t,{default:()=>X});var i=r(9950),n=r(4752),o=r(2488),a=r(4302),s=r(7455),l=r(4185),d=r(1367),c=r(3832),p=r(5665),x=r(4414);const h=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,u=n.Ay.button`
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;

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
`,g=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    gap: 12px;
  }
`,m=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,f=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,y=n.Ay.div`
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
`,j=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,b=n.Ay.div`
  flex: 1;
`,v=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`,w=n.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,A=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,F=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,k=n.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"closed":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"closed":return"#059669";default:return"#6B7280"}}};
`,C=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,E=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
`,B=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,z=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,S=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,D=n.Ay.span`
  color: #374151;
`,$=n.Ay.div`
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
`,T=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,I=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,_=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,N=n.Ay.button`
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
`,L=n.Ay.div`
  padding: 24px;
`,O=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,R=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,P=n.Ay.div`
  margin-bottom: 20px;
`,U=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,M=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,q=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,J=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,W=(0,n.Ay)(M)`
  width: 100%;
`,G=n.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`,H=n.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,K=n.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Y=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Q=n.Ay.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 14px;
  color: #059669;

  strong {
    margin-left: 4px;
    color: #047857;
  }
`,X=()=>{const{user:e}=(0,d.As)(),[t,r]=(0,i.useState)([]),[n,X]=(0,i.useState)("open"),[Z,V]=(0,i.useState)(""),[ee,te]=(0,i.useState)("all"),[re,ie]=(0,i.useState)("all"),[ne,oe]=(0,i.useState)("all"),[ae,se]=(0,i.useState)(!1),[le,de]=(0,i.useState)(!1),[ce,pe]=(0,i.useState)(null),[xe,he]=(0,i.useState)(""),[ue,ge]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[me,fe]=(0,i.useState)([]),[ye,je]=(0,i.useState)({}),[be,ve]=(0,i.useState)([]),[we,Ae]=(0,i.useState)(""),[Fe,ke]=(0,i.useState)([]),[Ce,Ee]=(0,i.useState)(!1),[Be,ze]=(0,i.useState)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json(),i=t.data||t;r(i),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),je(t)}}}catch(t){console.error("Error fetching unread counts:",t)}})(i)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e;ve(r)}}catch(e){}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const Se=t.filter(e=>{const t=e.subject.toLowerCase().includes(Z.toLowerCase())||e.customerName.toLowerCase().includes(Z.toLowerCase())||e.ticketNumber.toLowerCase().includes(Z.toLowerCase()),r="all"===n||e.status===n,i="all"===ee||e.status===ee,o="all"===re||e.priority===re,a="all"===ne||e.category===ne;return t&&r&&i&&o&&a}),De=t.length,$e=t.filter(e=>"open"===e.status).length,Te=t.filter(e=>"in-progress"===e.status).length,Ie=t.filter(e=>"closed"===e.status).length,_e=e=>new Date(e).toLocaleString("en-MY");return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(c.mc,{children:[(0,x.jsxs)(c.Y9,{children:[(0,x.jsx)(c.hE,{children:"System Inquiry"}),(0,x.jsxs)(c.ex,{children:[(0,x.jsx)(c.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json();r(t.data||t)}}catch(e){}},children:"Refresh"}),(0,x.jsx)(c.$n,{variant:"secondary",onClick:()=>{const e=Se.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(r),n=document.createElement("a");n.href=i,n.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,x.jsx)(c.$n,{variant:"primary",onClick:()=>{se(!0)},children:"Create Inquiry"})]})]}),(0,x.jsxs)(c.UC,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#059669",children:[(0,x.jsx)(p.Os,{children:De}),(0,x.jsx)(p.v0,{children:"Total Tickets"}),(0,x.jsx)(p.d1,{children:"All support requests"})]}),(0,x.jsxs)(p.hI,{color:"#D97706",children:[(0,x.jsx)(p.Os,{children:$e}),(0,x.jsx)(p.v0,{children:"Open Tickets"}),(0,x.jsx)(p.d1,{children:"Awaiting response"})]}),(0,x.jsxs)(p.hI,{color:"#2563EB",children:[(0,x.jsx)(p.Os,{children:Te}),(0,x.jsx)(p.v0,{children:"In Progress"}),(0,x.jsx)(p.d1,{children:"Currently being handled"})]}),(0,x.jsxs)(p.hI,{color:"#7C3AED",children:[(0,x.jsx)(p.Os,{children:Ie}),(0,x.jsx)(p.v0,{children:"Closed"}),(0,x.jsxs)(p.d1,{children:[De>0?Math.round(Ie/De*100):0,"% completion rate"]})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{active:"open"===n,onClick:()=>X("open"),children:"Open"}),(0,x.jsx)(u,{active:"in-progress"===n,onClick:()=>X("in-progress"),children:"In Progress"}),(0,x.jsx)(u,{active:"all"===n,onClick:()=>X("all"),children:"All Tickets"})]}),(0,x.jsxs)(g,{children:[(0,x.jsx)(m,{children:(0,x.jsx)(o.DO,{placeholder:"Search tickets...",value:Z,onChange:e=>V(e.target.value)})}),"all"===n&&(0,x.jsx)(m,{children:(0,x.jsxs)(o.Jt,{value:ee,onChange:e=>te(e.target.value),style:{maxWidth:"180px"},children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"open",children:"Open"}),(0,x.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,x.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,x.jsx)(m,{children:(0,x.jsxs)(o.Jt,{value:re,onChange:e=>ie(e.target.value),style:{maxWidth:"180px"},children:[(0,x.jsx)("option",{value:"all",children:"All Priority"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"low",children:"Low"})]})}),(0,x.jsx)(m,{children:(0,x.jsxs)(o.Jt,{value:ne,onChange:e=>oe(e.target.value),style:{maxWidth:"180px"},children:[(0,x.jsx)("option",{value:"all",children:"All Categories"}),(0,x.jsx)("option",{value:"technical",children:"Technical"}),(0,x.jsx)("option",{value:"billing",children:"Billing"}),(0,x.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,x.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,x.jsx)("option",{value:"general",children:"General"})]})})]}),(0,x.jsx)(f,{children:Se.map(e=>(0,x.jsxs)(y,{onClick:()=>(e=>{pe(e),he(e.status),de(!0)})(e),children:[(0,x.jsxs)(j,{children:[(0,x.jsxs)(b,{children:[(0,x.jsx)(v,{children:e.ticketNumber}),(0,x.jsx)(w,{children:e.subject}),(0,x.jsxs)(A,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(k,{status:e.status,children:e.status}),(0,x.jsx)(C,{priority:e.priority,children:e.priority})]})]}),(0,x.jsx)(E,{children:e.description}),(0,x.jsxs)(B,{children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(S,{children:"Created"}),(0,x.jsx)(D,{children:_e(e.createdAt)})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(S,{children:"Category"}),(0,x.jsx)(D,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),ye[e.id]&&(0,x.jsx)(z,{children:(0,x.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ye[e.id].total_comments,ye[e.id].unread_count>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ye[e.id].unread_count," new"]})]})})]})]},e.id))}),ae&&(0,x.jsx)($,{onClick:()=>se(!1),children:(0,x.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(I,{children:[(0,x.jsx)(_,{children:"Create System Inquiry"}),(0,x.jsx)(N,{onClick:()=>se(!1),children:"\xd7"})]}),(0,x.jsxs)(L,{children:[(0,x.jsxs)(P,{style:{position:"relative"},children:[(0,x.jsx)(U,{children:"Select User *"}),(0,x.jsx)(W,{type:"text",value:we,onChange:e=>(e=>{if(Ae(e),Ee(!0),e.length<1){const e=be.slice(0,10);return void ke(e)}const t=be.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase()));ke(t.slice(0,10))})(e.target.value),onFocus:()=>{Ee(!0),0===we.length&&ke(be.slice(0,10))},onBlur:()=>setTimeout(()=>Ee(!1),200),placeholder:"Search by name, username, or email..."}),Ce&&Fe.length>0&&(0,x.jsx)(G,{children:Fe.map(e=>(0,x.jsxs)(H,{onClick:()=>(e=>{ze(e),Ae(e.full_name||e.username),Ee(!1),ge(t=>({...t,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,x.jsx)(K,{children:e.full_name||e.username}),(0,x.jsxs)(Y,{children:[e.email," \u2022 ",e.role]})]},e.id))}),Be&&(0,x.jsxs)(Q,{children:["\u2713 Selected: ",(0,x.jsx)("strong",{children:Be.full_name||Be.username})," (",Be.email,")"]})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(U,{children:"Subject *"}),(0,x.jsx)(M,{type:"text",value:ue.subject,onChange:e=>ge({...ue,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(U,{children:"Description *"}),(0,x.jsx)(J,{value:ue.description,onChange:e=>ge({...ue,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(U,{children:"Attachments"}),(0,x.jsx)(s.A,{files:me,onChange:fe,maxFiles:5})]}),(0,x.jsxs)(R,{children:[(0,x.jsxs)(P,{children:[(0,x.jsx)(U,{children:"Priority"}),(0,x.jsxs)(q,{value:ue.priority,onChange:e=>ge({...ue,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"low",children:"Low"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(U,{children:"Category"}),(0,x.jsxs)(q,{value:ue.category,onChange:e=>ge({...ue,category:e.target.value}),children:[(0,x.jsx)("option",{value:"general",children:"General"}),(0,x.jsx)("option",{value:"technical",children:"Technical"}),(0,x.jsx)("option",{value:"billing",children:"Billing"}),(0,x.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,x.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(c.$n,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,x.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(Be){try{const e={customerId:ue.customerId,customerName:ue.customerName,customerEmail:ue.customerEmail,customerRole:"System Admin"===Be.role?"admin":"Restaurant Admin"===Be.role?"restaurant":["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(Be.role)?"manager":"staff",subject:ue.subject,description:ue.description,status:"open",priority:ue.priority,category:ue.category,attachments:me.length>0?me:void 0},i=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok)return;{const e=await i.json(),n=e.data||e;r([n,...t])}}catch(e){return}se(!1),ge({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),fe([]),ze(null),Ae(""),ke([])}},disabled:!ue.subject||!ue.description||!Be,children:"Create Inquiry"})]})]})}),le&&ce&&(0,x.jsx)($,{onClick:()=>de(!1),children:(0,x.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(I,{children:[(0,x.jsx)(_,{children:"Inquiry Details"}),(0,x.jsx)(N,{onClick:()=>de(!1),children:"\xd7"})]}),(0,x.jsxs)(L,{children:[(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(U,{children:"Ticket Number"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ce.ticketNumber})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(U,{children:"Status"}),(0,x.jsxs)(q,{value:xe,onChange:e=>(async e=>{if(ce){he(e);try{(await fetch(`/api/support-tickets/${ce.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(r(t=>t.map(t=>t.id===ce.id?{...t,status:e}:t)),pe(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,x.jsx)("option",{value:"open",children:"Open"}),(0,x.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,x.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(U,{children:"Priority"}),(0,x.jsx)("div",{style:{padding:"8px 0"},children:(0,x.jsx)(C,{priority:ce.priority,children:ce.priority})})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(U,{children:"Category"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ce.category.replace("-"," ")})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(U,{children:"Customer Information"}),(0,x.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:ce.customerName}),(0,x.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:ce.customerEmail})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(U,{children:"Subject"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ce.subject})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(U,{children:"Description"}),(0,x.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ce.description})]}),(null===ce||void 0===ce?void 0:ce.attachments)&&ce.attachments.length>0&&(0,x.jsx)(l.A,{attachments:ce.attachments}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(U,{children:"Created At"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:_e(ce.createdAt)})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(U,{children:"Last Updated"}),(0,x.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:_e(ce.updatedAt)})]})]})]}),(0,x.jsx)(a.A,{entityType:"support_ticket",entityId:ce.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>je(e=>{const t={...e};return t[ce.id]&&(t[ce.id]={...t[ce.id],unread_count:0}),t})})]}),(0,x.jsx)(O,{children:(0,x.jsx)(c.$n,{variant:"secondary",onClick:()=>de(!1),children:"Close"})})]})})]})]})})}},7455:(e,t,r)=>{r.d(t,{A:()=>b});var i=r(9950),n=r(4752),o=r(4414);const a=n.Ay.div`
  margin-top: 8px;
`,s=n.Ay.div`
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    border-color: ${e=>e.disabled?"#CBD5E1":"#635BFF"};
  }
`,l=n.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,d=n.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,c=n.Ay.input`
  display: none;
`,p=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,h=n.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,u=n.Ay.div`
  flex: 1;
  min-width: 0;
`,g=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,m=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
`,f=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,y=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,j=n.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const b=e=>{let{files:t,onChange:r,maxFiles:n=5,maxSizeMB:b=10,disabled:v=!1,compact:w=!1}=e;const[A,F]=(0,i.useState)(!1),[k,C]=(0,i.useState)(!1),E=(0,i.useRef)(null),B=!v&&!k&&t.length<n,z=async e=>{const i=n-t.length,o=Array.from(e).slice(0,i);if(0!==o.length){for(const e of o)e.size;C(!0);try{const e=new FormData;o.forEach(t=>e.append("files",t));const i=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${i}`},body:e}),a=await n.json();a.success&&a.data&&r([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{C(!1)}}};return(0,o.jsxs)(a,{children:[B&&(0,o.jsx)(s,{isDragging:A,disabled:!B,onClick:()=>{var e;return B&&(null===(e=E.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),B&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),B&&e.dataTransfer.files.length>0&&z(e.dataTransfer.files)},children:w?(0,o.jsxs)(l,{children:["Click or drag files to attach (",t.length,"/",n,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{children:A?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",b,"MB each, ",n-t.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:E,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&z(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(j,{}),"Uploading..."]}),t.map((e,i)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{children:e.originalName}),(0,o.jsx)(m,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]}),!v&&(0,o.jsx)(f,{onClick:()=>(async e=>{const i=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:i.url})})}catch(n){}r(t.filter((t,r)=>r!==e))})(i),title:"Remove",children:"\u2715"})]},e.url);var n,a})]})]})}}}]);